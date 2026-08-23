"use client";

import React, { useState, useEffect, useRef } from "react";
import { PLAYLIST, Track } from "@/data/artists";
import { SyncedLyricsService, SyncedLine } from "@/services/syncedLyricsService";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Rewind,
  Check,
  Copy,
  Trash2,
  X,
  Sparkles,
  ArrowRight,
  Upload,
  Download,
  Scissors
} from "lucide-react";

interface LyricsStudioProps {
  initialTrackId?: string;
  onClose: () => void;
  onSaved?: (trackId: string) => void;
}

export default function LyricsStudio({ initialTrackId, onClose, onSaved }: LyricsStudioProps) {
  const initialTrack = PLAYLIST.find((t) => t.id === initialTrackId) || PLAYLIST[0];
  const [selectedTrack, setSelectedTrack] = useState<Track>(initialTrack);

  // Studio Mode: 'syncing' | 'trimming' | 'edit_text' | 'preview'
  const [studioMode, setStudioMode] = useState<"syncing" | "trimming" | "edit_text" | "preview">("syncing");

  // Raw text input
  const [rawText, setRawText] = useState<string>(selectedTrack.lyrics || "");

  // Synced lines
  const [syncedLines, setSyncedLines] = useState<SyncedLine[]>([]);
  const [activeSyncIndex, setActiveSyncIndex] = useState<number>(0);

  // Audio Trim state
  const [trimStart, setTrimStart] = useState<number>(0);
  const [trimEnd, setTrimEnd] = useState<number>(0);

  // Audio Playback State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(180);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(0.9);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const linesContainerRef = useRef<HTMLDivElement>(null);

  // Audio file source candidates for current track
  const audioSources = [
    `/assets/audio/${selectedTrack.id}.mp4`,
    `/assets/audio/${selectedTrack.id}.m4a`,
    `/assets/audio/${selectedTrack.id}.mp3`,
    `/assets/audio/${selectedTrack.id}.webm`
  ];

  // Load track and synced lines
  useEffect(() => {
    setRawText(selectedTrack.lyrics || "");
    const loaded = SyncedLyricsService.getSyncedLyrics(selectedTrack.id, selectedTrack.lyrics);
    setSyncedLines(loaded);
    setActiveSyncIndex(0);
    setCurrentTime(0);
    setIsPlaying(false);

    const existingTrim = SyncedLyricsService.getTrim(selectedTrack.id);
    if (existingTrim) {
      setTrimStart(existingTrim.startSec || 0);
      setTrimEnd(existingTrim.endSec || 0);
    } else {
      setTrimStart(0);
      setTrimEnd(0);
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = audioSources[0];
      audioRef.current.load();
    }
  }, [selectedTrack]);

  // Audio error fallback to next candidate
  const handleAudioError = () => {
    if (!audioRef.current) return;
    const curSrc = audioRef.current.src;
    for (let i = 0; i < audioSources.length - 1; i++) {
      if (curSrc.includes(audioSources[i])) {
        audioRef.current.src = audioSources[i + 1];
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play().catch(() => {});
        }
        return;
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio play failed, retrying next source", err);
        handleAudioError();
      });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (timeSec: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration || 180, timeSec));
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  // Convert raw textarea text into timeline lines
  const parseRawTextToLines = () => {
    const lines = rawText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const newSynced: SyncedLine[] = lines.map((text, i) => ({
      time: i * 4,
      text
    }));

    setSyncedLines(newSynced);
    setActiveSyncIndex(0);
    setStudioMode("syncing");
  };

  // SPACEBAR: Record exact timestamp for the current line
  const markCurrentLineTimestamp = () => {
    if (syncedLines.length === 0) return;
    if (activeSyncIndex >= syncedLines.length) return;

    const timeStamp = audioRef.current
      ? parseFloat(audioRef.current.currentTime.toFixed(2))
      : parseFloat(currentTime.toFixed(2));

    const updated = [...syncedLines];
    updated[activeSyncIndex] = {
      ...updated[activeSyncIndex],
      time: timeStamp
    };

    setSyncedLines(updated);

    // Auto-advance to next line
    if (activeSyncIndex < syncedLines.length - 1) {
      setActiveSyncIndex(activeSyncIndex + 1);
    }
  };

  // Undo last timestamp
  const undoLastTimestamp = () => {
    if (activeSyncIndex > 0) {
      const prevIdx = activeSyncIndex - 1;
      setActiveSyncIndex(prevIdx);
      const prevTime = syncedLines[prevIdx]?.time || 0;
      handleSeek(Math.max(0, prevTime - 1.2));
    }
  };

  // Adjust specific line timestamp
  const adjustLineTime = (index: number, delta: number) => {
    const updated = [...syncedLines];
    updated[index] = {
      ...updated[index],
      time: Math.max(0, parseFloat((updated[index].time + delta).toFixed(2)))
    };
    setSyncedLines(updated);
  };

  // Shift ALL timestamps by delta (positive or negative)
  const shiftAllTimestamps = (deltaSec: number) => {
    const updated = syncedLines.map((l) => ({
      ...l,
      time: Math.max(0, parseFloat((l.time + deltaSec).toFixed(2)))
    }));
    setSyncedLines(updated);
    setSaveToast(`Tüm sözler ${deltaSec > 0 ? "+" : ""}${deltaSec} saniye kaydırıldı.`);
    setTimeout(() => setSaveToast(null), 2500);
  };

  // Physical Audio Trim & Lyrics Re-alignment (Direct FFmpeg on disk)
  const [isTrimmingLoading, setIsTrimmingLoading] = useState(false);

  const applyPhysicalTrimAndShiftLyrics = async () => {
    setIsTrimmingLoading(true);
    try {
      // 1. Call Backend to Physically Trim the Audio file on disk
      const response = await fetch("/api/audio/trim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackId: selectedTrack.id,
          startSec: trimStart,
          endSec: trimEnd > 0 ? trimEnd : undefined
        })
      });

      const resJson = await response.json();
      if (!response.ok || !resJson.success) {
        throw new Error(resJson.error || "Kırpma işlemi gerçekleştirilemedi.");
      }

      // 2. Shift all lyrics timestamps by -trimStart
      let updatedLyrics = syncedLines;
      if (trimStart > 0) {
        updatedLyrics = syncedLines.map((l) => ({
          ...l,
          time: Math.max(0, parseFloat((l.time - trimStart).toFixed(2)))
        }));
        setSyncedLines(updatedLyrics);
      }

      // 3. Save shifted lyrics & clear software trim
      SyncedLyricsService.saveSyncedLyrics(selectedTrack.id, updatedLyrics);
      SyncedLyricsService.clearTrim(selectedTrack.id);

      // 4. Force browser audio to reload the new physical file
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = `${audioSources[0]}?v=${Date.now()}`;
        audioRef.current.load();
      }

      setTrimStart(0);
      setTrimEnd(0);
      setCurrentTime(0);

      window.dispatchEvent(
        new CustomEvent("synced-lyrics-updated", { detail: { trackId: selectedTrack.id } })
      );

      setSaveToast(`"${selectedTrack.title}" şarkı dosyası fiziksel olarak kırpıldı ve söz senkronu güncellendi!`);
      if (onSaved) onSaved(selectedTrack.id);
      setTimeout(() => setSaveToast(null), 4000);
    } catch (e: any) {
      alert("Kırpma hatası: " + (e.message || e));
    } finally {
      setIsTrimmingLoading(false);
    }
  };

  const restoreOriginalAudio = async () => {
    if (!confirm("Orijinal kesilmemiş ses dosyasına geri dönmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch("/api/audio/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackId: selectedTrack.id })
      });
      const data = await res.json();
      if (data.success) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = `${audioSources[0]}?v=${Date.now()}`;
          audioRef.current.load();
        }
        setSaveToast("Orijinal ses dosyası geri yüklendi!");
        setTimeout(() => setSaveToast(null), 3000);
      } else {
        alert(data.message || "Yedek dosya bulunamadı.");
      }
    } catch (e: any) {
      alert("Geri yükleme hatası: " + e.message);
    }
  };

  // Delete line
  const deleteLine = (index: number) => {
    const updated = syncedLines.filter((_, i) => i !== index);
    setSyncedLines(updated);
    if (activeSyncIndex >= updated.length) {
      setActiveSyncIndex(Math.max(0, updated.length - 1));
    }
  };

  // Save to LocalStorage & Dispatch update event
  const handleSaveToWebsite = () => {
    SyncedLyricsService.saveSyncedLyrics(selectedTrack.id, syncedLines);
    if (trimStart > 0 || trimEnd > 0) {
      SyncedLyricsService.saveTrim(selectedTrack.id, {
        startSec: trimStart,
        endSec: trimEnd > 0 ? trimEnd : (duration || 180)
      });
    }

    window.dispatchEvent(
      new CustomEvent("synced-lyrics-updated", { detail: { trackId: selectedTrack.id } })
    );

    setSaveToast(`"${selectedTrack.title}" şarkısının senkronize sözleri ve kırpma ayarları başarıyla kaydedildi!`);
    if (onSaved) onSaved(selectedTrack.id);
    setTimeout(() => setSaveToast(null), 3500);
  };

  // Export & Download All Synced Lyrics Backup JSON
  const handleExportBackup = () => {
    const backupData = SyncedLyricsService.getAllBackupData();
    backupData[selectedTrack.id] = {
      lyrics: syncedLines,
      trim: (trimStart > 0 || trimEnd > 0) ? { startSec: trimStart, endSec: trimEnd } : undefined
    };

    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eray_mansur_senkron_ve_kirpma_yedek_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSaveToast("Tüm senkronize sözler ve kırpmalar bilgisayarınıza yedeklendi!");
    setTimeout(() => setSaveToast(null), 3500);
  };

  // Import Backup JSON
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const success = SyncedLyricsService.restoreAllBackupData(parsed);
        if (success) {
          const loaded = SyncedLyricsService.getSyncedLyrics(selectedTrack.id, selectedTrack.lyrics);
          setSyncedLines(loaded);
          const t = SyncedLyricsService.getTrim(selectedTrack.id);
          if (t) {
            setTrimStart(t.startSec || 0);
            setTrimEnd(t.endSec || 0);
          }
          window.dispatchEvent(new CustomEvent("synced-lyrics-updated", { detail: { trackId: selectedTrack.id } }));
          setSaveToast("Yedek başarıyla geri yüklendi!");
          setTimeout(() => setSaveToast(null), 3500);
        }
      } catch (err) {
        alert("Geçersiz yedek dosyası!");
      }
    };
    reader.readAsText(file);
  };

  // Copy as LRC format
  const handleCopyLrc = () => {
    const lrc = SyncedLyricsService.exportLrc(syncedLines);
    navigator.clipboard.writeText(lrc);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Global Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If user is actively typing inside textarea or text input, do not capture
      if (
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "INPUT"
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        if (studioMode === "syncing") {
          // If paused, also start playing automatically
          if (audioRef.current && audioRef.current.paused) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
          markCurrentLineTimestamp();
        } else {
          togglePlay();
        }
      } else if (e.code === "KeyK") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "KeyZ" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        undoLastTimestamp();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [studioMode, activeSyncIndex, syncedLines, isPlaying, currentTime]);

  // Find currently active line during preview
  const currentActiveLineIndex = syncedLines.reduce((acc, line, idx) => {
    if (currentTime >= line.time) return idx;
    return acc;
  }, 0);

  // Auto scroll to active line
  useEffect(() => {
    if (studioMode === "syncing" || studioMode === "preview") {
      const activeEl = document.getElementById(`studio-line-${activeSyncIndex}`);
      if (activeEl && linesContainerRef.current) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeSyncIndex, currentActiveLineIndex, studioMode]);

  const formatSec = (sec: number) => {
    if (isNaN(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 10);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${ms}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200 font-mono">
      
      {/* Hidden Native Audio Controller */}
      <audio
        ref={audioRef}
        src={audioSources[0]}
        preload="auto"
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            // If in trimming mode and reaches trimEnd, pause
            if (trimEnd > 0 && audioRef.current.currentTime >= trimEnd) {
              audioRef.current.pause();
              setIsPlaying(false);
            }
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current && audioRef.current.duration) {
            setDuration(audioRef.current.duration);
            if (trimEnd === 0) {
              setTrimEnd(parseFloat(audioRef.current.duration.toFixed(2)));
            }
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={handleAudioError}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleImportBackup}
      />

      <div className="relative flex flex-col h-full max-h-[94vh] w-full max-w-5xl border border-white/15 bg-[#0a0a0a] shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] px-6 py-4 bg-[#0d0d0d]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-red-600 text-white font-black text-sm shadow-md">
              🎙️
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                SÖZ SENKRON & ŞARKI KIRPMA STÜDYOSU
              </h2>
              <p className="text-[11px] text-neutral-400 font-light">
                Şarkıyı çalın, <strong className="text-white bg-white/10 px-1 py-0.5 border border-white/20">SPACE</strong> ile senkronize edin veya baştan/sondan kırpın.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Song Selector */}
            <select
              className="bg-black border border-white/20 text-white text-xs font-bold px-3 py-2 uppercase cursor-pointer hover:border-red-500 transition-colors focus:outline-none"
              value={selectedTrack.id}
              onChange={(e) => {
                const tr = PLAYLIST.find((t) => t.id === e.target.value);
                if (tr) setSelectedTrack(tr);
              }}
            >
              {PLAYLIST.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title} — {t.artist}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="text-neutral-400 hover:text-white p-2 hover:bg-white/10 transition-colors"
              onClick={onClose}
              title="Kapat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Mode Buttons & Backup Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-white/[0.08] bg-[#0a0a0a] text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={`px-3.5 py-1.5 uppercase font-bold transition-all ${
                studioMode === "syncing"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "border border-white/10 text-neutral-400 hover:text-white"
              }`}
              onClick={() => setStudioMode("syncing")}
            >
              1. Space Senkronu ({syncedLines.length} Satır)
            </button>
            <button
              type="button"
              className={`px-3.5 py-1.5 uppercase font-bold transition-all ${
                studioMode === "trimming"
                  ? "bg-amber-600 text-white shadow-md"
                  : "border border-white/10 text-neutral-400 hover:text-white"
              }`}
              onClick={() => setStudioMode("trimming")}
            >
              2. Şarkı Kırp (Baş / Son) ✂️
            </button>
            <button
              type="button"
              className={`px-3.5 py-1.5 uppercase font-bold transition-all ${
                studioMode === "edit_text"
                  ? "bg-white text-black"
                  : "border border-white/10 text-neutral-400 hover:text-white"
              }`}
              onClick={() => setStudioMode("edit_text")}
            >
              3. Ham Metin
            </button>
            <button
              type="button"
              className={`px-3.5 py-1.5 uppercase font-bold transition-all ${
                studioMode === "preview"
                  ? "bg-emerald-600 text-white"
                  : "border border-white/10 text-neutral-400 hover:text-white"
              }`}
              onClick={() => setStudioMode("preview")}
            >
              4. Canlı Karaoke Testi
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-600 text-emerald-400 hover:text-white text-xs font-bold uppercase transition-all border border-emerald-500/30"
              onClick={handleExportBackup}
              title="Tüm senkronize sözleri ve kırpmaları JSON dosyası olarak bilgisayarına indir"
            >
              <Download className="h-3.5 w-3.5" />
              <span>YEDEK İNDİR (JSON)</span>
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white text-white hover:text-black text-xs font-bold uppercase transition-all border border-white/10"
              onClick={() => fileInputRef.current?.click()}
              title="JSON yedeğinden geri yükle"
            >
              <Upload className="h-3.5 w-3.5" />
              <span>YEDEKTEN YÜKLE</span>
            </button>

            <Button
              size="sm"
              className="rounded-none bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase px-5 h-8 shadow-md"
              onClick={handleSaveToWebsite}
            >
              <Check className="h-3.5 w-3.5 mr-1" /> SİTEYE UYGULA & KAYDET
            </Button>
          </div>
        </div>

        {/* Main Work Area */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* MODE 1: SPACEBAR SYNC ENGINE */}
          {studioMode === "syncing" && (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              
              {/* Massive Space Prompt Banner */}
              <div className="p-4 sm:p-6 bg-red-950/20 border-b border-red-600/30 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] sm:text-xs font-black text-red-500 tracking-[0.2em] uppercase mb-1">
                  ŞU ANKİ SENKRONİZE EDİLECEK SATIR ({activeSyncIndex + 1} / {syncedLines.length})
                </span>
                
                <p className="text-lg sm:text-2xl font-black text-white px-5 py-3 bg-black/80 border border-white/15 max-w-2xl w-full text-center truncate shadow-inner">
                  "{syncedLines[activeSyncIndex]?.text || "Tüm satırlar senkronize edildi!"}"
                </p>

                {syncedLines[activeSyncIndex + 1] && (
                  <p className="text-xs text-neutral-500 mt-1.5 truncate max-w-xl">
                    Sıradaki: "{syncedLines[activeSyncIndex + 1]?.text}"
                  </p>
                )}

                {/* Big Spacebar Button */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    className="px-8 py-3.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs sm:text-sm uppercase tracking-widest transition-all shadow-xl shadow-red-600/40 border border-red-400 flex items-center gap-2"
                    onClick={markCurrentLineTimestamp}
                  >
                    <Sparkles className="h-4 w-4" /> [ SPACE TUŞUNA BAS ] ZAMAN DAMGASI KOY ({formatSec(currentTime)})
                  </button>

                  <button
                    type="button"
                    className="px-4 py-3.5 bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white font-bold text-xs uppercase transition-all border border-white/10"
                    onClick={undoLastTimestamp}
                    title="Son satırı geri al (Ctrl+Z)"
                  >
                    <RotateCcw className="h-4 w-4 mr-1 inline" /> GERİ AL
                  </button>
                </div>

                {/* Quick Shifter Toolbar */}
                <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-bold text-neutral-400">
                  <span className="mr-1">Tüm Sözleri Topluca Kaydır:</span>
                  {[-2.0, -1.0, -0.5, -0.2, 0.2, 0.5, 1.0, 2.0].map((d) => (
                    <button
                      key={d}
                      type="button"
                      className="px-2 py-0.5 bg-black/60 hover:bg-white/20 text-neutral-300 border border-white/15 hover:border-white"
                      onClick={() => shiftAllTimestamps(d)}
                      title={`Tüm satırları ${d > 0 ? "+" : ""}${d} saniye kaydır`}
                    >
                      {d > 0 ? "+" : ""}{d}s
                    </button>
                  ))}
                  <button
                    type="button"
                    className="px-2.5 py-0.5 bg-red-950/60 hover:bg-red-700 text-red-300 hover:text-white border border-red-500/30 ml-2"
                    onClick={() => {
                      if (confirm("Bu şarkının senkronunu sıfırlayıp baştan senkronize etmek istiyor musunuz?")) {
                        SyncedLyricsService.clearSyncedLyrics(selectedTrack.id);
                        const resetLines = SyncedLyricsService.getSyncedLyrics(selectedTrack.id, selectedTrack.lyrics);
                        setSyncedLines(resetLines);
                        setActiveSyncIndex(0);
                        setSaveToast("Sözler sıfırlandı!");
                        setTimeout(() => setSaveToast(null), 2500);
                      }
                    }}
                  >
                    🔄 Sıfırla
                  </button>
                </div>
              </div>

              {/* Scrollable Lines List */}
              <div ref={linesContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
                {syncedLines.map((line, idx) => {
                  const isCurrent = idx === activeSyncIndex;
                  return (
                    <div
                      key={idx}
                      id={`studio-line-${idx}`}
                      className={`flex items-center justify-between gap-3 p-3 border transition-all ${
                        isCurrent
                          ? "border-red-600 bg-red-600/15 text-white scale-[1.01]"
                          : "border-white/[0.06] bg-black/40 text-neutral-400 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className={`text-[11px] font-mono font-bold w-6 ${isCurrent ? "text-red-400" : "text-neutral-600"}`}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>

                        <span className="font-mono text-xs font-bold text-red-500 bg-black/60 px-2 py-0.5 border border-white/10">
                          {formatSec(line.time)}
                        </span>

                        <span className={`text-xs font-bold truncate flex-1 ${isCurrent ? "text-white" : "text-neutral-300"}`}>
                          {line.text}
                        </span>
                      </div>

                      {/* Fine-Tuning Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="h-6 px-2 text-[10px] font-bold bg-white/5 hover:bg-white/20 text-neutral-300 border border-white/10"
                          onClick={() => adjustLineTime(idx, -0.1)}
                          title="-0.1 saniye"
                        >
                          -0.1s
                        </button>
                        <button
                          type="button"
                          className="h-6 px-2 text-[10px] font-bold bg-white/5 hover:bg-white/20 text-neutral-300 border border-white/10"
                          onClick={() => adjustLineTime(idx, 0.1)}
                          title="+0.1 saniye"
                        >
                          +0.1s
                        </button>
                        <button
                          type="button"
                          className="h-6 px-2.5 text-[10px] font-bold bg-red-500/15 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30"
                          onClick={() => handleSeek(line.time)}
                          title="Bu satırdan çal"
                        >
                          ▶ ÇAL
                        </button>
                        <button
                          type="button"
                          className="h-6 px-1.5 text-neutral-500 hover:text-red-400"
                          onClick={() => deleteLine(idx)}
                          title="Satırı sil"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* MODE 2: AUDIO TRIMMER & TIME OFFSET (BAŞTAN VE SONDAN KIRPMA) */}
          {studioMode === "trimming" && (
            <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto font-mono">
              <div className="border border-amber-500/30 bg-amber-500/[0.05] p-5 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                  <Scissors className="h-4 w-4" />
                  <span>ŞARKI KIRPMA VE SENKRON KORUMA SİSTEMİ</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  Şarkının başındaki veya sonundaki sessizlikleri/konuşmaları kırpabilirsiniz. 
                  <strong> "Sözleri Otomatik Kaydır & Senkronu Koru"</strong> butonuna bastığınızda, 
                  başlangıç kırpmasına göre tüm sözlerin zaman damgaları otomatik olarak geriye kaydırılır ve senkronizasyon bozulmaz!
                </p>
              </div>

              {/* Trim Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Trim Start */}
                <div className="border border-white/10 bg-black/60 p-5 space-y-4">
                  <span className="text-xs font-black text-red-500 uppercase tracking-wider block">
                    1. BAŞLANGIÇ KIRPMA (TRIM START)
                  </span>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={duration || 180}
                      value={trimStart}
                      onChange={(e) => setTrimStart(parseFloat(e.target.value) || 0)}
                      className="bg-black border border-white/20 text-white font-black text-sm p-2 w-28 text-center"
                    />
                    <span className="text-xs text-neutral-400">saniye ({formatSec(trimStart)})</span>
                  </div>

                  <button
                    type="button"
                    className="w-full py-2 bg-white/10 hover:bg-white text-white hover:text-black font-bold text-xs uppercase transition-all border border-white/15"
                    onClick={() => setTrimStart(parseFloat(currentTime.toFixed(2)))}
                  >
                    📍 Şu Anki Saniyeyi Başlangıç Yap ({formatSec(currentTime)})
                  </button>
                </div>

                {/* Trim End */}
                <div className="border border-white/10 bg-black/60 p-5 space-y-4">
                  <span className="text-xs font-black text-amber-500 uppercase tracking-wider block">
                    2. BİTİŞ KIRPMA (TRIM END)
                  </span>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={duration || 180}
                      value={trimEnd}
                      onChange={(e) => setTrimEnd(parseFloat(e.target.value) || 0)}
                      className="bg-black border border-white/20 text-white font-black text-sm p-2 w-28 text-center"
                    />
                    <span className="text-xs text-neutral-400">saniye ({formatSec(trimEnd)})</span>
                  </div>

                  <button
                    type="button"
                    className="w-full py-2 bg-white/10 hover:bg-white text-white hover:text-black font-bold text-xs uppercase transition-all border border-white/15"
                    onClick={() => setTrimEnd(parseFloat(currentTime.toFixed(2)))}
                  >
                    📍 Şu Anki Saniyeyi Bitiş Yap ({formatSec(currentTime)})
                  </button>
                </div>
              </div>

              {/* Global Lyrics Offset Fine-Tuning */}
              <div className="border border-white/10 bg-black/60 p-5 space-y-3">
                <span className="text-xs font-bold text-neutral-300 uppercase block">
                  3. TÜM SÖZ ZAMANLARINI TOPLUCA KAYDIR (GENEL SENKRON İNCE AYARI):
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {[-1.0, -0.5, -0.1, 0.1, 0.5, 1.0].map((d) => (
                    <button
                      key={d}
                      type="button"
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/20 text-neutral-300 text-xs font-bold border border-white/10"
                      onClick={() => shiftAllTimestamps(d)}
                    >
                      {d > 0 ? "+" : ""}{d}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  disabled={isTrimmingLoading}
                  className="rounded-none bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase px-6 h-11 shadow-lg shadow-red-600/30"
                  onClick={applyPhysicalTrimAndShiftLyrics}
                >
                  <Scissors className="h-4 w-4 mr-2" />
                  {isTrimmingLoading ? "SES DOSYASI KIRPILIYOR..." : "SESİ FİZİKSEL KES & SÖZ SENKRONUNU KORU"}
                </Button>

                <Button
                  variant="outline"
                  className="rounded-none border-white/20 text-neutral-300 hover:bg-white/10 font-bold text-xs uppercase h-11 px-5"
                  onClick={() => {
                    handleSeek(trimStart);
                    if (audioRef.current) {
                      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
                    }
                  }}
                >
                  <Play className="h-3.5 w-3.5 mr-1.5" /> Kırpılmış Aralığı Dinle ({formatSec(trimStart)} ➔ {formatSec(trimEnd)})
                </Button>

                <button
                  type="button"
                  className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white font-bold text-xs uppercase transition-all border border-white/10"
                  onClick={restoreOriginalAudio}
                  title="Kesilmemiş orijinal dosyayı geri yükle"
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1 inline" /> Orijinal Dosyayı Geri Yükle
                </button>
              </div>
            </div>
          )}

          {/* MODE 3: RAW TEXT EDITOR */}
          {studioMode === "edit_text" && (
            <div className="flex-1 p-6 flex flex-col gap-4 overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-400 uppercase">
                  HER SATIRA BİR SÖZ GELECEK ŞEKİLDE ŞARKI SÖZLERİNİ YAPIŞTIRIN:
                </span>
                <span className="text-[11px] text-neutral-500">
                  {rawText.split("\n").filter((l) => l.trim().length > 0).length} Satır
                </span>
              </div>

              <textarea
                className="flex-1 w-full p-4 bg-black border border-white/15 text-neutral-200 text-xs font-mono leading-relaxed resize-none focus:outline-none focus:border-red-500"
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Şarkı sözlerini buraya yapıştırın..."
              />

              <div className="flex justify-end">
                <Button
                  className="rounded-none bg-white text-black hover:bg-neutral-200 font-black text-xs uppercase px-6"
                  onClick={parseRawTextToLines}
                >
                  Metni Yükle & Senkronizasyona Başla <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </div>
            </div>
          )}

          {/* MODE 3: LIVE PREVIEW & TEST */}
          {studioMode === "preview" && (
            <div className="flex-1 p-6 flex flex-col items-center justify-center overflow-y-auto text-center space-y-4">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                CANLI KARAOKE / SENKRON ÖNİZLEMESİ
              </span>

              <div className="max-w-2xl w-full space-y-3 py-6">
                {syncedLines.map((line, idx) => {
                  const isActive = idx === currentActiveLineIndex;
                  return (
                    <p
                      key={idx}
                      className={`text-sm sm:text-base font-bold transition-all duration-150 cursor-pointer ${
                        isActive
                          ? "text-red-500 scale-110 font-black drop-shadow-[0_0_14px_rgba(255,42,85,0.7)]"
                          : idx < currentActiveLineIndex
                          ? "text-neutral-500"
                          : "text-neutral-300"
                      }`}
                      onClick={() => handleSeek(line.time)}
                    >
                      {line.text}
                    </p>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Audio Control Bar */}
        <div className="border-t border-white/[0.08] px-6 py-3.5 bg-[#0d0d0d] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-10 w-10 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center font-bold shadow-lg"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
            </button>

            <button
              type="button"
              className="p-2 text-neutral-400 hover:text-white"
              onClick={() => handleSeek(Math.max(0, currentTime - 5))}
              title="5 saniye geri"
            >
              <Rewind className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="p-2 text-neutral-400 hover:text-white"
              onClick={() => handleSeek(Math.min(duration, currentTime + 5))}
              title="5 saniye ileri"
            >
              <FastForward className="h-4 w-4" />
            </button>

            <span className="text-xs font-bold text-white min-w-[90px]">
              {formatSec(currentTime)} <span className="text-neutral-500 font-normal">/ {formatSec(duration)}</span>
            </span>

            {/* Speed Selector */}
            <div className="hidden sm:flex items-center gap-1 border border-white/10 p-0.5 bg-black">
              {[0.75, 1.0, 1.25].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  className={`px-2 py-0.5 text-[10px] font-bold ${
                    playbackRate === rate ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                  }`}
                  onClick={() => handleRateChange(rate)}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>

          {/* Scrubber */}
          <div className="flex-1 max-w-md mx-4">
            <input
              type="range"
              min={0}
              max={duration || 180}
              step={0.1}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-neutral-800 accent-red-600 cursor-pointer"
            />
          </div>

          <div className="text-xs text-neutral-400 hidden lg:block">
            İpucu: <kbd className="px-1.5 py-0.5 bg-neutral-800 border border-white/20 text-white text-[10px]">SPACE</kbd> tuşuna her bastığınızda anlık zaman kaydedilir.
          </div>
        </div>

      </div>

      {/* Save Notification Toast */}
      {saveToast && (
        <div className="fixed top-6 right-6 z-50 border border-emerald-500/40 bg-emerald-950/90 px-4 py-3 text-xs text-emerald-300 font-bold shadow-2xl animate-in slide-in-from-top">
          ✓ {saveToast}
        </div>
      )}
    </div>
  );
}
