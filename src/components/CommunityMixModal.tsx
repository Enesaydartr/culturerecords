import React, { useState, useRef } from "react";
import { AuthService } from "@/services/authService";
import { PLAYLIST } from "@/data/artists";
import { MixService, CommunityMix } from "@/services/mixService";
import { AudioStorageService } from "@/services/audioStorageService";
import { Button } from "@/components/ui/button";
import { X, Sparkles, Music, Upload, Check, AlertCircle, Disc3, FileAudio } from "lucide-react";

interface CommunityMixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMixCreated?: (mix: CommunityMix) => void;
}

const MIX_COVER_PRESETS = [
  "/assets/images/alliance_cover.jpg",
  "/assets/images/eray_mansur_alliance.jpg",
  "/assets/images/eray067_portrait.jpg",
  "/assets/images/mansur_portrait.jpg",
  "/assets/images/g_wagon.jpg",
  "/assets/images/balmain.jpg"
];

export default function CommunityMixModal({ isOpen, onClose, onMixCreated }: CommunityMixModalProps) {
  const currentUser = AuthService.getCurrentUser();
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const audioFileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(MIX_COVER_PRESETS[0]);
  const [selectedTracks, setSelectedTracks] = useState<string[]>(["bak_ne_dicem"]);
  const [customAudioUrl, setCustomAudioUrl] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioFileName, setAudioFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Cover Image Upload from Files
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setCoverImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle MP3 / Audio File Upload from Files
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setAudioFileName(file.name);
      const audioBlobUrl = URL.createObjectURL(file);
      setCustomAudioUrl(audioBlobUrl);
    }
  };

  const toggleTrack = (trackId: string) => {
    if (selectedTracks.includes(trackId)) {
      if (selectedTracks.length === 1) {
        setErrorMessage("Mixte en az bir ERAY067 veya MANSUR şarkısı seçilmelidir!");
        return;
      }
      setSelectedTracks(selectedTracks.filter((id) => id !== trackId));
    } else {
      setSelectedTracks([...selectedTracks, trackId]);
      setErrorMessage(null);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Mix paylaşabilmek için lütfen önce giriş yapın!");
      return;
    }

    if (!title.trim()) {
      setErrorMessage("Lütfen mixinize bir isim verin.");
      return;
    }

    if (selectedTracks.length === 0) {
      setErrorMessage("Mixte en az bir ERAY067 veya MANSUR şarkısı kullanılmalıdır!");
      return;
    }

    const artistsUsed = new Set<string>();
    selectedTracks.forEach((id) => {
      const tr = PLAYLIST.find((t) => t.id === id);
      if (tr) {
        if (tr.artist.includes("ERAY067")) artistsUsed.add("ERAY067");
        if (tr.artist.includes("MANSUR")) artistsUsed.add("MANSUR");
      }
    });

    const res = MixService.createMix({
      title: title.trim(),
      description: description.trim(),
      coverImage,
      audioUrl: customAudioUrl || ("/assets/audio/" + selectedTracks[0] + ".mp4"),
      creatorId: currentUser.id,
      creatorName: currentUser.displayName,
      creatorAvatar: currentUser.avatar,
      usedTrackIds: selectedTracks,
      usedArtists: Array.from(artistsUsed)
    });

    if (res.success && res.mix) {
      if (audioFile) {
        AudioStorageService.saveMixAudio(res.mix.id, audioFile);
      }
      if (onMixCreated) onMixCreated(res.mix);
      onClose();
      alert("Mixiniz başarıyla paylaşıldı ve topluluk vitrinine eklendi!");
    } else {
      setErrorMessage(res.error || "Mix oluşturulamadı.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 font-mono">
      <div className="relative w-full max-w-xl border border-white/15 bg-[#0a0a0a] shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Disc3 className="h-5 w-5 text-red-500 animate-spin-slow" />
            <div>
              <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                TOPLULUK MİXİ YÜKLE
              </h2>
              <p className="text-[11px] text-neutral-400">
                1:1 formatında kapak, MP3 ses dosyası ve ERAY067 / MANSUR şarkılarıyla miksinizi yayınlayın.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="text-neutral-400 hover:text-white p-1 hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-5">
          {/* Title */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
              Mix Başlığı: *
            </label>
            <input
              type="text"
              required
              placeholder="Örn: Frankfurt x Ankara Gece Drill Seti"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black border border-white/15 text-white text-xs p-3 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
              Açıklama & Vibe:
            </label>
            <textarea
              rows={2}
              placeholder="Mix hakkında detaylar, BPM bilgisi..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black border border-white/15 text-white text-xs p-3 focus:border-red-500 focus:outline-none resize-none"
            />
          </div>

          {/* 1:1 Cover Image Upload / Selection */}
          <div className="space-y-2 border border-white/10 p-3.5 bg-black/60">
            <label className="text-[11px] font-bold text-neutral-300 uppercase block">
              1:1 Formatında Kapak Resmi (Galeriden / Dosyalardan Seç veya Hazır Seç):
            </label>
            
            <input
              type="file"
              ref={coverFileInputRef}
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
            />

            <div className="flex items-center gap-3">
              <img src={coverImage} alt="preview" className="h-16 w-16 aspect-square object-cover border border-white/20" />
              <Button
                type="button"
                onClick={() => coverFileInputRef.current?.click()}
                variant="outline"
                size="sm"
                className="border-dashed border-red-500/40 text-red-400 hover:text-white font-bold text-xs uppercase rounded-none"
              >
                <Upload className="h-3.5 w-3.5 mr-1.5" /> DOSYADAN RESİM SEÇ
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {MIX_COVER_PRESETS.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCoverImage(img)}
                  className={`h-9 w-9 border overflow-hidden transition-all aspect-square ${
                    coverImage === img ? "border-red-500 scale-110 shadow-md ring-2 ring-red-500" : "border-white/20 opacity-60"
                  }`}
                >
                  <img src={img} alt="cover" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* MP3 / Audio File Upload */}
          <div className="space-y-2 border border-white/10 p-3.5 bg-black/60">
            <label className="text-[11px] font-bold text-neutral-300 uppercase block flex items-center gap-1.5">
              <FileAudio className="h-4 w-4 text-emerald-400" /> MP3 / Ses Dosyası Seç:
            </label>
            
            <input
              type="file"
              ref={audioFileInputRef}
              accept="audio/*"
              onChange={handleAudioUpload}
              className="hidden"
            />

            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={() => audioFileInputRef.current?.click()}
                variant="outline"
                size="sm"
                className="border-emerald-500/40 text-emerald-400 hover:text-white hover:bg-emerald-600/20 font-bold text-xs uppercase rounded-none"
              >
                <Upload className="h-3.5 w-3.5 mr-1.5" /> BİLGİSAYARDAN / TELEFONDAN MP3 SEÇ
              </Button>
              {audioFileName && (
                <span className="text-xs text-neutral-300 truncate max-w-[200px]">
                  ✓ {audioFileName}
                </span>
              )}
            </div>
            <p className="text-[10px] text-neutral-500 font-sans">
              * Kendi miksinizi yüklemezseniz, seçtiğiniz parçanın orijinal altyapısı otomatik kullanılır.
            </p>
          </div>

          {/* Mandatory ERAY067 / MANSUR Track Selector */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-neutral-400 uppercase block">
              Mixte Kullanılan Şarkılar (En az 1 ERAY067 veya MANSUR şarkısı zorunlu): *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-white/10 p-2 bg-black/60">
              {PLAYLIST.map((track) => {
                const isSelected = selectedTracks.includes(track.id);
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => toggleTrack(track.id)}
                    className={`p-2 border text-left flex items-center justify-between gap-2 transition-all ${
                      isSelected
                        ? "border-red-500 bg-red-950/30 text-white"
                        : "border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{track.title}</div>
                      <div className="text-[10px] text-neutral-500 truncate">{track.artist}</div>
                    </div>
                    <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? "border-red-500 bg-red-600 text-white" : "border-white/30 text-transparent"
                    }`}>
                      <Check className="h-3 w-3" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase py-3.5 rounded-none shadow-lg shadow-red-600/30 tracking-widest mt-4"
          >
            MİXİ YAYINLA & PAYLAŞ ➔
          </Button>
        </form>

      </div>
    </div>
  );
}
