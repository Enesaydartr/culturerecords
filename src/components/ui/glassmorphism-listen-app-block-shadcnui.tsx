import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Headphones,
  Heart,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Sparkles,
  Flame,
  Radio,
  FileText
} from "lucide-react";
import { PLAYLIST, Track } from "@/data/artists";
import { audioEngine } from "@/audio/engine";

const highlights = [
  {
    title: "Spatial Drill Audio",
    description:
      "Frankfurt ve Ankara sokaklarından ilham alan sinematik 808 ve trap ses manzaraları.",
  },
  {
    title: "O Ses Rap 2025 Şampiyonluğu",
    description:
      "Sefo takımında zafere ulaşan ERAY067 ve Mansur'un hit ortak albümü ALLIANCE.",
  }
];

interface GlassmorphismListenAppBlockProps {
  onOpenLyrics?: (track: Track) => void;
  onOpenTourModal?: () => void;
}

export function GlassmorphismListenAppBlock({ onOpenLyrics, onOpenTourModal }: GlassmorphismListenAppBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [likedTracks, setLikedTracks] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("00:00");

  const activeTrack = PLAYLIST[activeIndex];

  // Handle Play/Pause
  const togglePlay = () => {
    audioEngine.playUiTap(750);
    if (isPlaying) {
      audioEngine.stopMusic();
      setIsPlaying(false);
    } else {
      audioEngine.startMusic(activeTrack);
      setIsPlaying(true);
    }
  };

  // Change Track
  const handleSelectTrack = (index: number) => {
    audioEngine.playUiTap(650);
    setActiveIndex(index);
    setProgress(0);
    setCurrentTimeStr("00:00");
    const track = PLAYLIST[index];
    if (isPlaying) {
      audioEngine.startMusic(track);
    }
  };

  const handleNext = () => {
    handleSelectTrack((activeIndex + 1) % PLAYLIST.length);
  };

  const handlePrev = () => {
    handleSelectTrack((activeIndex - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const toggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const toggleLike = (id: string) => {
    audioEngine.playUiTap(900);
    setLikedTracks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Progress ticker when playing
  useEffect(() => {
    let timer: number | null = null;
    if (isPlaying) {
      timer = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          const next = prev + (100 / activeTrack.durationSec);
          const currentSec = Math.floor((next / 100) * activeTrack.durationSec);
          const mins = Math.floor(currentSec / 60);
          const secs = currentSec % 60;
          setCurrentTimeStr(`${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`);
          return next;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, activeTrack]);

  return (
    <section className="relative overflow-hidden px-4 py-12 md:px-6 md:py-24">
      {/* Background Ambience */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-rose-500/[0.08] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-amber-500/[0.06] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <Card className="relative overflow-hidden border border-border/50 bg-background/40 p-6 md:p-12 shadow-[0_40px_120px_rgba(15,23,42,0.4)] backdrop-blur-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.05] via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center">
            
            {/* Left Column: Brand & Hero Copy */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge
                    variant="outline"
                    className="w-fit border-rose-500/40 bg-rose-500/10 text-xs font-mono uppercase tracking-[0.2em] text-rose-400 backdrop-blur"
                  >
                    CLTR LISTEN APP • 2026
                  </Badge>
                  <span className="flex items-center gap-1 text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                    <Sparkles className="h-3 w-3" /> ALLIANCE ALBÜMÜ
                  </span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                    ERAY067 <span className="text-rose-500">×</span> MANSUR
                  </h2>
                  <p className="max-w-xl text-base leading-relaxed text-foreground/75 md:text-lg">
                    Frankfurt ve Ankara sokaklarının sert drill ritimlerini ve akılda kalıcı melodik trap marşlarını ultra akıcı cam arayüzü ile dinleyin.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button 
                  size="lg" 
                  className="h-12 rounded-full px-8 text-base bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/30 active:scale-95 transition-transform"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2 fill-current" />}
                  {isPlaying ? "Duraklat" : "Dinlemeye Başla"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full px-8 text-base hover:bg-foreground/5 border-border/60 active:scale-95 transition-transform"
                  onClick={onOpenTourModal}
                >
                  <Flame className="h-4 w-4 mr-2 text-amber-400" />
                  Turne Biletleri
                </Button>
              </div>

              {/* Highlights */}
              <div className="grid gap-4 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="group h-full rounded-2xl border border-border/40 bg-background/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-rose-500/50"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-rose-500/10 text-rose-400">
                      <Headphones className="h-4 w-4" />
                    </div>
                    <h3 className="mb-1 text-base font-bold text-foreground">
                      {highlight.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-foreground/70">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Player & Interactive Playlist */}
            <div className="space-y-6">
              
              {/* Active Player Card */}
              <div className="rounded-3xl border border-border/50 bg-background/80 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.45)] backdrop-blur-2xl">
                <div className="flex items-start gap-4">
                  
                  {/* Track Thumbnail */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-border/40 bg-zinc-900 shadow-md">
                    <img 
                      src={activeTrack.image} 
                      alt={activeTrack.title} 
                      className={`h-full w-full object-cover transition-transform duration-500 ${isPlaying ? "scale-105" : "scale-100"}`}
                    />
                    {isPlaying && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="h-3 w-3 rounded-full bg-rose-500 animate-ping" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-3 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-rose-400">
                          {isPlaying ? "ŞU AN ÇALIYOR" : "SEÇİLEN PARÇA"}
                        </p>
                        <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground truncate">
                          {activeTrack.title}
                        </h3>
                        <p className="text-xs text-foreground/60 truncate">
                          {activeTrack.artist} · {activeTrack.album} ({activeTrack.bpm} BPM)
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-full border border-border/40 bg-background/60 backdrop-blur hover:text-rose-400 ${likedTracks[activeTrack.id] ? "text-rose-500 fill-rose-500" : "text-foreground/70"}`}
                        onClick={() => toggleLike(activeTrack.id)}
                        title="Favorilere Ekle"
                      >
                        <Heart className={`h-4 w-4 ${likedTracks[activeTrack.id] ? "fill-current" : ""}`} />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-full border-border/50 bg-background/60 px-3.5 text-[11px] font-mono uppercase tracking-[0.15em] text-foreground/80 backdrop-blur hover:text-foreground hover:bg-rose-500/10"
                        asChild
                      >
                        <a
                          href={activeTrack.spotifyUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Spotify
                        </a>
                      </Button>

                      {onOpenLyrics && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 rounded-full border border-border/40 bg-background/40 px-3 text-[11px] font-mono text-foreground/70 hover:text-foreground"
                          onClick={() => onOpenLyrics(activeTrack)}
                        >
                          <FileText className="h-3 w-3 mr-1" /> Sözler
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 pt-6">
                  <div className="flex items-center justify-between text-xs font-mono font-medium tracking-wide text-foreground/60">
                    <span>{currentTimeStr}</span>
                    <span>{activeTrack.duration}</span>
                  </div>
                  <div 
                    className="h-2 w-full rounded-full bg-foreground/10 cursor-pointer overflow-hidden relative"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickPos = (e.clientX - rect.left) / rect.width;
                      setProgress(clickPos * 100);
                    }}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Player Controls */}
                <div className="flex items-center justify-between pt-5">
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full border border-border/40 bg-background/60 text-foreground/70 backdrop-blur hover:text-foreground"
                      onClick={() => handleSelectTrack(Math.floor(Math.random() * PLAYLIST.length))}
                      title="Karışık Çal"
                    >
                      <Shuffle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full border border-border/40 bg-background/60 text-foreground/70 backdrop-blur hover:text-foreground"
                      onClick={handlePrev}
                      title="Önceki Parça"
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Master Play Button */}
                  <Button 
                    className="h-12 w-12 rounded-full bg-rose-500 text-white shadow-lg shadow-rose-500/40 hover:bg-rose-600 active:scale-95 transition-transform"
                    onClick={togglePlay}
                    title={isPlaying ? "Durdur" : "Çal"}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
                  </Button>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full border border-border/40 bg-background/60 text-foreground/70 backdrop-blur hover:text-foreground"
                      onClick={handleNext}
                      title="Sonraki Parça"
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full border border-border/40 bg-background/60 text-foreground/70 backdrop-blur hover:text-foreground"
                      onClick={() => setProgress(0)}
                      title="Tekrarla"
                    >
                      <Repeat className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full border border-border/40 bg-background/60 text-foreground/70 backdrop-blur hover:text-foreground"
                      onClick={toggleMute}
                      title={isMuted ? "Sesi Aç" : "Sesi Kapat"}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Embedded Video / Player */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-border/40 bg-background/80 shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur">
                  <iframe
                    className="h-[160px] w-full"
                    src={activeTrack.embedUrl}
                    title={`${activeTrack.title} - Video Klip`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Playlist Stack */}
              <div className="relative">
                <div className="max-h-72 space-y-2.5 overflow-y-auto pr-1 sm:max-h-80">
                  {PLAYLIST.map((track, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => handleSelectTrack(index)}
                        aria-pressed={isActive}
                        className={`group flex w-full items-center gap-3.5 rounded-2xl border border-border/40 bg-background/60 p-3.5 text-left backdrop-blur-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50 ${
                          isActive
                            ? "border-rose-500/60 bg-rose-500/[0.12] shadow-[0_10px_30px_rgba(255,42,85,0.2)]"
                            : "hover:-translate-y-0.5 hover:border-border/80 hover:bg-background/80"
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-xs font-mono font-bold transition-colors ${
                            isActive
                              ? "border-rose-500 bg-rose-500 text-white"
                              : "border-border/40 bg-background/80 text-foreground/70 group-hover:border-foreground/40"
                          }`}
                        >
                          {isActive && isPlaying ? (
                            <Radio className="h-4 w-4 animate-pulse" />
                          ) : (
                            index + 1
                          )}
                        </div>

                        <div className="flex flex-1 items-center justify-between gap-3 min-w-0">
                          <div className="min-w-0">
                            <p className={`text-sm font-bold truncate ${isActive ? "text-rose-400" : "text-foreground/90"}`}>
                              {track.title}
                            </p>
                            <p className="text-xs text-foreground/60 truncate">
                              {track.artist} · {track.album}
                            </p>
                          </div>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-foreground/50 flex-shrink-0">
                            {track.duration}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
