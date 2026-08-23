import React, { useState, useEffect, useRef } from "react";
import { 
  PLAYLIST, 
  TOUR_DATES, 
  Track, 
  TourDate 
} from "@/data/artists";
import { 
  fetchLiveBubiletConcerts 
} from "@/services/concertService";
import { audioEngine } from "@/audio/engine";
import { AuthService, UserProfile } from "@/services/authService";
import { PlaylistService, SongStats } from "@/services/playlistService";
import { SyncedLyricsService } from "@/services/syncedLyricsService";
import { TicketService } from "@/services/ticketService";
import { MixService, CommunityMix } from "@/services/mixService";

import VinylAlbumCard from "@/components/ui/great-ui-vinyl-album-card";
import Character3DScrollShowcase from "@/components/ui/character-3d-scroll-showcase";
import AuthModal from "@/components/AuthModal";
import AdminHub from "@/components/AdminHub";
import RightSidebarDrawer from "@/components/RightSidebarDrawer";
import CommunityMixModal from "@/components/CommunityMixModal";
import ListenTogetherModal from "@/components/ListenTogetherModal";
import SongCommentsDrawer from "@/components/SongCommentsDrawer";
import NewsSection from "@/components/NewsSection";
import UserProfileModal from "@/components/UserProfileModal";
import AddToPlaylistModal from "@/components/AddToPlaylistModal";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  FileText,
  Video,
  Ticket,
  X,
  Maximize2,
  ExternalLink,
  Check,
  Repeat,
  Repeat1,
  Shuffle,
  MapPin,
  Calendar,
  Clock,
  Radio,
  Search,
  Sparkles,
  Heart,
  MessageSquare,
  ListMusic,
  User,
  Disc3,
  ShieldCheck,
  Menu,
  Plus,
  Trash2
} from "lucide-react";

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(AuthService.getCurrentUser());
  const [activeCategory, setActiveCategory] = useState<"all" | "alliance" | "hits" | "collab">("all");
  const [trackSortOrder, setTrackSortOrder] = useState<"newest" | "oldest" | "popular">("newest");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("all");
  
  // Modals & Drawers state
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);
  const [fullPlayerTab, setFullPlayerTab] = useState<"vinyl" | "video" | "lyrics">("vinyl");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register" | "profile">("login");
  const [isAdminHubOpen, setIsAdminHubOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isMixModalOpen, setIsMixModalOpen] = useState(false);
  const [isListenTogetherOpen, setIsListenTogetherOpen] = useState(false);
  const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);
  // Additional modals
  const [viewingUserId, setViewingUserId] = useState<string | null>(null);
  const [playlistModalTrack, setPlaylistModalTrack] = useState<Track | null>(null);


  const [syncedVersion, setSyncedVersion] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [durationSec, setDurationSec] = useState(180);
  const [volumePct, setVolumePct] = useState(85);

  const [liveConcerts, setLiveConcerts] = useState<TourDate[]>(TOUR_DATES);
  const [isLiveSyncing, setIsLiveSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCustomTrack, setActiveCustomTrack] = useState<Track | null>(null);
  const [ticketSales, setTicketSales] = useState<Record<string, number>>(() => TicketService.getAllSales());
  const [mixesList, setMixesList] = useState<CommunityMix[]>(() => MixService.getAllMixes("popular"));

  const currentTrack = activeCustomTrack || PLAYLIST[currentTrackIndex];
  const [currentStats, setCurrentStats] = useState<SongStats>(PlaylistService.getSongStats(currentTrack.id, currentUser?.id));

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Ticket sales event listener
  useEffect(() => {
    const handleSalesUpdate = () => {
      setTicketSales(TicketService.getAllSales());
    };
    window.addEventListener("ticket-sales-updated", handleSalesUpdate);
    return () => window.removeEventListener("ticket-sales-updated", handleSalesUpdate);
  }, []);

  // Mixes list update listener
  useEffect(() => {
    const handleMixUpdate = () => {
      setMixesList(MixService.getAllMixes("popular"));
    };
    window.addEventListener("mixes-updated", handleMixUpdate);
    return () => window.removeEventListener("mixes-updated", handleMixUpdate);
  }, []);

  // Auth state listener
  useEffect(() => {
    const handleAuth = () => {
      setCurrentUser(AuthService.getCurrentUser());
    };
    window.addEventListener("auth-state-changed", handleAuth);
    return () => window.removeEventListener("auth-state-changed", handleAuth);
  }, []);

  // Update song stats
  useEffect(() => {
    setCurrentStats(PlaylistService.getSongStats(currentTrack.id, currentUser?.id));
  }, [currentTrack.id, currentUser?.id]);

  useEffect(() => {
    const handleStats = (e: any) => {
      if (!e.detail?.trackId || e.detail.trackId === currentTrack.id) {
        setCurrentStats(PlaylistService.getSongStats(currentTrack.id, currentUser?.id));
      }
    };
    window.addEventListener("song-stats-updated", handleStats);
    return () => window.removeEventListener("song-stats-updated", handleStats);
  }, [currentTrack.id, currentUser?.id]);

  // Synced lyrics update listener
  useEffect(() => {
    const handleSyncUpdate = () => {
      setSyncedVersion((v) => v + 1);
    };
    window.addEventListener("synced-lyrics-updated", handleSyncUpdate);
    return () => window.removeEventListener("synced-lyrics-updated", handleSyncUpdate);
  }, []);

  const syncConcerts = async () => {
    setIsLiveSyncing(true);
    try {
      const res = await fetchLiveBubiletConcerts(TOUR_DATES);
      const sorted = [...res.data].sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime());
      setLiveConcerts(sorted);
    } catch {
      const sortedFallback = [...TOUR_DATES].sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime());
      setLiveConcerts(sortedFallback);
    } finally {
      setIsLiveSyncing(false);
    }
  };

  useEffect(() => {
    syncConcerts();
  }, []);

  const spectrumCanvasRef = useRef<HTMLCanvasElement>(null);
  const fullSpectrumCanvasRef = useRef<HTMLCanvasElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);

  const currentSyncedLyrics = React.useMemo(() => {
    return SyncedLyricsService.getSyncedLyrics(currentTrack.id, currentTrack.lyrics);
  }, [currentTrack.id, currentTrack.lyrics, syncedVersion]);

  const activeLyricIndex = React.useMemo(() => {
    if (!currentSyncedLyrics || currentSyncedLyrics.length === 0) return -1;
    if (currentTimeSec < currentSyncedLyrics[0].time) return -1;
    let active = 0;
    for (let i = 0; i < currentSyncedLyrics.length; i++) {
      if (currentTimeSec >= currentSyncedLyrics[i].time) {
        active = i;
      } else {
        break;
      }
    }
    return active;
  }, [currentSyncedLyrics, currentTimeSec]);

  useEffect(() => {
    if (isFullPlayerOpen && fullPlayerTab === "lyrics" && lyricsContainerRef.current && activeLyricIndex !== -1) {
      const activeEl = document.getElementById(`lyric-line-${activeLyricIndex}`);
      if (activeEl) {
        const container = lyricsContainerRef.current;
        const targetScroll = activeEl.offsetTop - container.offsetTop - (container.clientHeight / 2) + (activeEl.clientHeight / 2);
        container.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: "smooth"
        });
      }
    }
  }, [activeLyricIndex, isFullPlayerOpen, fullPlayerTab]);

  useEffect(() => {
    audioEngine.setOnTimeUpdate((time) => {
      setCurrentTimeSec(time);
    });

    audioEngine.setOnDurationChange((dur) => {
      setDurationSec(dur > 0 ? dur : (currentTrack.durationSec || 180));
    });

    audioEngine.setOnTrackEnded(() => {
      // Baştan sona dinlendiğinde otomatik sayacı artır
      PlaylistService.incrementFullListen(PLAYLIST[currentTrackIndex].id);

      if (repeatMode === "one") {
        audioEngine.seekToSeconds(0);
        audioEngine.resume();
        setIsPlaying(true);
      } else if (repeatMode === "all") {
        handleNextTrack();
      } else {
        if (currentTrackIndex < PLAYLIST.length - 1) {
          handleNextTrack();
        } else {
          setIsPlaying(false);
          setCurrentTimeSec(0);
        }
      }
    });
  }, [currentTrackIndex, repeatMode]);

  const playTrack = (track: Track) => {
    const idx = PLAYLIST.findIndex((t) => t.id === track.id);
    if (idx !== -1) {
      setActiveCustomTrack(null);
      setCurrentTrackIndex(idx);
      setCurrentTimeSec(0);
      audioEngine.loadTrack(PLAYLIST[idx]);
      audioEngine.startMusic(PLAYLIST[idx]);
    } else {
      // Custom Mix or Dynamic Track
      setActiveCustomTrack(track);
      setCurrentTimeSec(0);
      audioEngine.loadTrack(track);
      audioEngine.startMusic(track);
    }
    setIsPlaying(true);
  };

  const toggleMasterPlay = () => {
    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      if (currentTimeSec === 0) {
        audioEngine.loadTrack(currentTrack);
        audioEngine.startMusic(currentTrack);
      } else {
        audioEngine.resume();
      }
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    setActiveCustomTrack(null);
    let nextIdx: number;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * PLAYLIST.length);
    } else {
      nextIdx = (currentTrackIndex + 1) % PLAYLIST.length;
    }
    setCurrentTrackIndex(nextIdx);
    setCurrentTimeSec(0);
    audioEngine.loadTrack(PLAYLIST[nextIdx]);
    audioEngine.startMusic(PLAYLIST[nextIdx]);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    setActiveCustomTrack(null);
    let prevIdx = currentTrackIndex - 1;
    if (prevIdx < 0) prevIdx = PLAYLIST.length - 1;
    setCurrentTrackIndex(prevIdx);
    setCurrentTimeSec(0);
    audioEngine.loadTrack(PLAYLIST[prevIdx]);
    audioEngine.startMusic(PLAYLIST[prevIdx]);
    setIsPlaying(true);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    triggerToast(isShuffle ? "Karışık Çalma: KAPALI" : "Karışık Çalma: AÇIK");
  };

  const toggleRepeatMode = () => {
    if (repeatMode === "off") {
      setRepeatMode("all");
      triggerToast("Tekrar Modu: TÜM ŞARKILAR");
    } else if (repeatMode === "all") {
      setRepeatMode("one");
      triggerToast("Tekrar Modu: TEK ŞARKI");
    } else {
      setRepeatMode("off");
      triggerToast("Tekrar Modu: KAPALI");
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      audioEngine.setVolume(volumePct / 100);
      setIsMuted(false);
    } else {
      audioEngine.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (pct: number) => {
    setVolumePct(pct);
    setIsMuted(pct === 0);
    audioEngine.setVolume(pct / 100);
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pct = parseFloat(e.target.value);
    const targetSec = (pct / 100) * durationSec;
    setCurrentTimeSec(targetSec);
    audioEngine.seekToSeconds(targetSec);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = durationSec > 0 ? Math.min(100, (currentTimeSec / durationSec) * 100) : 0;

  // Keyboard listener for Spacebar play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        e.target instanceof HTMLElement &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName) &&
        !isAuthModalOpen &&
        !isAdminHubOpen
      ) {
        e.preventDefault();
        toggleMasterPlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, currentTimeSec, currentTrack, isAuthModalOpen, isAdminHubOpen]);

  // Spectrum animation (Bottom Dock)
  useEffect(() => {
    let animationFrameId: number;
    const canvas = spectrumCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 50;
    canvas.height = 18;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, 50, 18);
      const data = audioEngine.getSpectrumData();

      const barCount = 7;
      const barWidth = 3.5;
      const gap = 3;

      for (let i = 0; i < barCount; i++) {
        const val = isPlaying ? data[i * 3] || 0 : Math.sin(Date.now() / 400 + i) * 5 + 6;
        const barHeight = Math.max(2, (val / 255) * 16);

        ctx.fillStyle = isPlaying ? "#e50914" : "#525252";
        ctx.fillRect(i * (barWidth + gap), 18 - barHeight, barWidth, barHeight);
      }
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  // Spectrum animation (Full Player)
  useEffect(() => {
    let animationFrameId: number;
    const canvas = fullSpectrumCanvasRef.current;
    if (!canvas || !isFullPlayerOpen) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 240;
    canvas.height = 36;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, 240, 36);
      const data = audioEngine.getSpectrumData();

      const barCount = 24;
      const barWidth = 5;
      const gap = 3;

      for (let i = 0; i < barCount; i++) {
        const val = isPlaying ? data[i] || 0 : Math.sin(Date.now() / 350 + i) * 10 + 12;
        const barHeight = Math.max(3, (val / 255) * 34);

        ctx.fillStyle = "#e50914";
        ctx.fillRect(i * (barWidth + gap), 36 - barHeight, barWidth, barHeight);
      }
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, isFullPlayerOpen]);

  const filteredTracks = PLAYLIST.filter((track) => {
    if (activeCategory === "all") return true;
    return track.category === activeCategory;
  }).sort((a, b) => {
    if (trackSortOrder === "newest") {
      return new Date(b.releaseDate || "2024-01-01").getTime() - new Date(a.releaseDate || "2024-01-01").getTime();
    } else if (trackSortOrder === "oldest") {
      return new Date(a.releaseDate || "2024-01-01").getTime() - new Date(b.releaseDate || "2024-01-01").getTime();
    } else {
      const statsA = PlaylistService.getSongStats(a.id);
      const statsB = PlaylistService.getSongStats(b.id);
      return statsB.totalListens - statsA.totalListens;
    }
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 selection:bg-red-600 selection:text-white pb-36 sm:pb-28 font-mono">
      
      {/* 1. EDITORIAL HEADER */}
      <header className="sticky top-0 z-40 h-16 w-full border-b border-white/[0.08] bg-[#0a0a0a]/92 backdrop-blur-xl">
        <div className="container flex h-full items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/brand_logo.png"
              alt="ERAY067 x MANSUR Logo"
              className="h-8 w-auto object-contain shrink-0 drop-shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/images/alliance_cover.jpg";
              }}
            />
            <span className="font-mono text-sm font-bold tracking-tight text-white uppercase">
              ERAY067 <span className="text-neutral-600">/</span> MANSUR
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono font-medium text-neutral-400">
            <a href="#alliance" className="transition-colors hover:text-white">SANATÇILAR HAKKINDA</a>
            <a href="#discography" className="transition-colors hover:text-white">DİSKOGRAFİ</a>
            <a href="#community-mixes" className="transition-colors hover:text-white text-red-400 font-bold">🎧 MİKSLER</a>
            <a href="#news-section" className="transition-colors hover:text-white">HABERLER</a>
            <a href="#tour" className="transition-colors hover:text-white">KONSER TAKVİMİ</a>
          </nav>

          {/* Top Actions: Right Hub Drawer, Listen Together, Auth & Admin Hub */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Birlikte Dinle Button (Responsive Desktop + Mobile) */}
            <button
              type="button"
              onClick={() => setIsListenTogetherOpen(true)}
              className="px-2.5 sm:px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-bold uppercase transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              title="Canlı Eşzamanlı Dinleme Odaları"
            >
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              <span className="hidden sm:inline">BİRLİKTE DİNLE</span>
            </button>

            {/* Discreet Admin Hub Trigger (Visible only if user is admin) */}
            {currentUser?.role === "admin" && (
              <button
                type="button"
                onClick={() => setIsAdminHubOpen(true)}
                className="px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500 text-yellow-300 hover:text-black border border-yellow-500/40 text-xs font-black uppercase transition-all flex items-center gap-1.5 shadow-md animate-pulse"
                title="Resmi Yönetici Paneli"
              >
                <span>👑 ADMİN HUB</span>
              </button>
            )}

            {/* User Account / Login Button */}
            {currentUser ? (
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode("profile");
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/15 hover:border-white/40 transition-all"
                title="Profilim & Ayarlar"
              >
                <img
                  src={currentUser.avatar || "/assets/images/eray_mansur_alliance.jpg"}
                  alt={currentUser.displayName}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/images/alliance_cover.jpg";
                  }}
                  className="h-6 w-6 object-cover border border-white/20"
                />
                <span className="text-xs font-bold text-white max-w-[90px] truncate">
                  {currentUser.displayName}
                </span>
              </button>
            ) : (
              <Button
                size="sm"
                className="rounded-none bg-white text-black hover:bg-neutral-200 font-mono text-xs font-black uppercase px-3.5 h-8"
                onClick={() => {
                  setAuthModalMode("login");
                  setIsAuthModalOpen(true);
                }}
              >
                <User className="h-3.5 w-3.5 mr-1" /> GİRİŞ YAP
              </Button>
            )}

            {/* SLEEK MENU BUTTON ON THE FAR RIGHT */}
            <button
              type="button"
              onClick={() => setIsRightDrawerOpen(true)}
              className="p-2 bg-red-600/20 hover:bg-red-600 border border-red-500/40 hover:border-red-500 text-red-400 hover:text-white transition-all shadow-sm flex items-center justify-center"
              title="Çalma Listeleri, Mixler & Topluluk Menüsü"
            >
              <Menu className="h-4 w-4" />
            </button>

          </div>
        </div>
      </header>

      {/* 2. BRUTALIST CINEMATIC HERO */}
      <section className="relative w-full border-b border-white/[0.08] py-16 md:py-24 overflow-hidden">
        <div className="container grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3 font-mono text-xs font-bold text-neutral-400">
              <span className="h-2 w-2 bg-red-600 animate-pulse" />
              <span>OFFICIAL ARTIST HUB // CULTURE RECORDS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.92] break-words max-w-full">
              ERAY067 <br />
              <span className="text-neutral-500 font-light">&</span> MANSUR
            </h1>

            <p className="text-lg md:text-xl text-neutral-300 font-light max-w-xl leading-relaxed">
              ERAY067 ve MANSUR dinleyicilerinin tek bir çatı altında buluştuğu ortak platform. En yeni parçalar, canlı senkron dinleme odaları, özel miksler ve sokak kültürünün resmi adresi.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <Button
                size="lg"
                className="rounded-none bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-widest px-8 py-3.5 shadow-lg shadow-red-600/30 w-full sm:w-auto text-center justify-center active:scale-[0.98]"
                onClick={() => playTrack(PLAYLIST[0])}
              >
                <Play className="h-4 w-4 mr-2 fill-current" /> ALLIANCE DİNLE
              </Button>

              <button
                type="button"
                onClick={() => setIsRightDrawerOpen(true)}
                className="px-6 py-3.5 border border-white/20 hover:border-white text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 w-full sm:w-auto bg-black/40 active:scale-[0.98]"
              >
                <ListMusic className="h-4 w-4 text-red-500" /> ÇALMA LİSTELERİ & MİXLER
              </button>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="relative">
            <div className="relative border border-white/10 bg-black/40 overflow-hidden shadow-2xl">
              <img
                src="/assets/images/alliance_cover.jpg"
                alt="ERAY067 x MANSUR ALLIANCE Cover"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block mb-1">
                  OFFICIAL JOINT ALBUM
                </span>
                <h3 className="text-2xl font-black text-white uppercase">ALLIANCE (2026)</h3>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  8 Parça
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* 4. 3D SHOWCASE / ALBUM SPOTLIGHT */}
      <section id="alliance" className="py-20 border-b border-white/[0.08]">
        <div className="container space-y-10">
          <div>
            <span className="text-xs text-red-500 font-bold uppercase tracking-widest block mb-2">BİYOGRAFİ & ALBÜM HİKAYESİ</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase">SANATÇILAR HAKKINDA BİLGİLER</h2>
          </div>
          <Character3DScrollShowcase />
        </div>
      </section>

      {/* 5. DISCOGRAPHY SECTION */}
      <section id="discography" className="py-20 border-b border-white/[0.08]">
        <div className="container space-y-10">
          
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs text-red-500 font-bold uppercase tracking-widest block mb-2">OFFICIAL RELEASES</span>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase">DİSKOGRAFİ & PARÇALAR</h2>
            </div>

            {/* Category Filter & Release Date Sorting */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category buttons */}
              <div className="flex flex-wrap gap-1.5 text-xs font-mono font-bold">
                {[
                  { id: "all", label: "TÜMÜ" },
                  { id: "alliance", label: "ALLIANCE" },
                  { id: "hits", label: "HİTLER" },
                  { id: "collab", label: "DÜETLER" }
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCategory(c.id as any)}
                    className={`px-3.5 py-1.5 border transition-all ${
                      activeCategory === c.id
                        ? "bg-white text-black border-white"
                        : "border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Release Date & Popularity Sorting */}
              <div className="flex items-center gap-1 bg-black/60 border border-white/10 p-1 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setTrackSortOrder("newest")}
                  className={`px-2.5 py-1 transition-all ${
                    trackSortOrder === "newest" ? "bg-red-600 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                  title="Yayınlanma Tarihine Göre (En Yeni ➔ En Eski)"
                >
                  📅 En Yeni
                </button>
                <button
                  type="button"
                  onClick={() => setTrackSortOrder("oldest")}
                  className={`px-2.5 py-1 transition-all ${
                    trackSortOrder === "oldest" ? "bg-red-600 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                  title="Yayınlanma Tarihine Göre (En Eski ➔ En Yeni)"
                >
                  ⏳ En Eski
                </button>
                <button
                  type="button"
                  onClick={() => setTrackSortOrder("popular")}
                  className={`px-2.5 py-1 transition-all ${
                    trackSortOrder === "popular" ? "bg-red-600 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                  title="En Çok Dinlenenler"
                >
                  🔥 Popüler
                </button>
              </div>
            </div>
          </div>

          {/* Tracks List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTracks.map((track) => {
              const isCurrent = currentTrack.id === track.id;
              const stats = PlaylistService.getSongStats(track.id, currentUser?.id);

              return (
                <div
                  key={track.id}
                  className={`p-4 border transition-all flex items-center justify-between gap-4 group ${
                    isCurrent
                      ? "border-red-500 bg-red-950/20 shadow-lg"
                      : "border-white/10 bg-black/40 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative h-14 w-14 aspect-square border border-white/20 overflow-hidden shrink-0">
                      <img src={track.image} alt={track.title} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => playTrack(track)}
                        className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity ${
                          isCurrent && isPlaying ? "opacity-100 text-red-500" : "opacity-0 group-hover:opacity-100 text-white"
                        }`}
                      >
                        {isCurrent && isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current" />}
                      </button>
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-black text-white truncate group-hover:text-red-400 transition-colors">
                        {track.title}
                      </h4>
                      <p className="text-xs text-neutral-400 truncate">{track.artist}</p>
                      
                      {/* Stats line: Release Date, Likes & Listens */}
                      <div className="flex items-center gap-2.5 text-[10px] text-neutral-400 mt-1">
                        <span className="text-red-400 font-bold">📅 {track.releaseYear || track.releaseDate?.split("-")[0]}</span>
                        <span className="text-neutral-600">•</span>
                        <span>❤️ {stats.likesCount.toLocaleString("tr-TR")}</span>
                        <span className="text-neutral-600">•</span>
                        <span>🎧 {stats.totalListens.toLocaleString("tr-TR")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        if (!currentUser) {
                          setAuthModalMode("login");
                          setIsAuthModalOpen(true);
                          return;
                        }
                        PlaylistService.toggleLikeSong(track.id, currentUser.id);
                      }}
                      className={`p-2 transition-colors ${stats.isLikedByMe ? "text-red-500" : "text-neutral-500 hover:text-white"}`}
                      title="Beğen"
                    >
                      <Heart className={`h-4 w-4 ${stats.isLikedByMe ? "fill-current" : ""}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setPlaylistModalTrack(track)}
                      className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
                      title="Çalma Listesine Ekle"
                    >
                      <Plus className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playTrack(track);
                        setIsCommentsDrawerOpen(true);
                      }}
                      className="p-2 text-neutral-500 hover:text-white transition-colors"
                      title="Yorumlar & Sohbet"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5.5. COMMUNITY MIXES SHOWCASE */}
      <section id="community-mixes" className="py-16 border-b border-white/[0.08] bg-black/40">
        <div className="container space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-red-500 font-mono text-xs font-bold uppercase tracking-widest mb-1">
                <Disc3 className="h-4 w-4 text-red-500 animate-spin" style={{ animationDuration: "6s" }} />
                <span>TOPLULUK VE DİJİTAL REMİX VİTRİNİ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                TOPLULUK MİKSLERİ
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={() => {
                  if (!currentUser) {
                    setAuthModalMode("login");
                    setIsAuthModalOpen(true);
                    return;
                  }
                  setIsMixModalOpen(true);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase px-4 py-2 rounded-none flex items-center gap-2 shadow-lg active:scale-95 cursor-pointer"
              >
                <Plus className="h-4 w-4" /> KENDİ MİKSİNİ / MP3'ÜNÜ YÜKLE
              </Button>
            </div>
          </div>

          {mixesList.length === 0 ? (
            <div className="border border-dashed border-white/15 p-8 text-center bg-black/30">
              <Disc3 className="h-10 w-10 text-neutral-600 mx-auto mb-2" />
              <p className="text-xs text-neutral-400 font-mono">Henüz bir miks paylaşılmamış. İlk miksi siz yükleyin!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mixesList.map((m) => (
                <div key={m.id} className="border border-white/10 bg-[#0d0d0d] p-4 flex gap-3.5 items-start group hover:border-red-500/50 transition-all">
                  <div className="relative h-16 w-16 aspect-square shrink-0 border border-white/20 overflow-hidden">
                    <img src={m.coverImage} alt={m.title} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={async () => {
                        MixService.incrementMixListen(m.id);
                        const mixTrack = await MixService.getPlayableTrackForMix(m);
                        playTrack(mixTrack);
                      }}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white cursor-pointer"
                      title="Miksi Çal"
                    >
                      <Play className="h-7 w-7 fill-current text-white hover:text-red-500" />
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-red-400 transition-colors">{m.title}</h4>
                    <p className="text-[11px] text-neutral-400">Remixer: <button type="button" onClick={() => setViewingUserId(m.creatorId)} className="text-neutral-200 font-bold hover:text-red-400 hover:underline">{m.creatorName}</button></p>
                    <p className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5">{m.description}</p>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-2">
                      <div className="flex items-center gap-3">
                        <span>❤️ {m.likesCount}</span>
                        <span>🎧 {m.totalListens} dinlenme</span>
                      </div>
                      {(currentUser?.role === "admin" || (currentUser && m.creatorId === currentUser.id)) && (
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (confirm(`"${m.title}" miksini silmek istediğinize emin misiniz?`)) {
                              const res = await MixService.deleteMix(m.id, currentUser);
                              if (res.success) {
                                triggerToast(`"${m.title}" miksi başarıyla silindi.`);
                              } else {
                                alert(res.error || "Miks silinemedi.");
                              }
                            }
                          }}
                          className="p-1 text-neutral-500 hover:text-red-500 transition-colors cursor-pointer"
                          title={currentUser?.role === "admin" ? "Yönetici Olarak Sil" : "Miksini Sil"}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. OFFICIAL NEWS SECTION */}
      <NewsSection
        onUserProfileClick={(uid) => setViewingUserId(uid)}
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />

      {/* 7. TOUR DATES / CONCERT SCHEDULE */}
      <section id="tour" className="py-20 border-b border-white/[0.08]">
        <div className="container space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs text-red-500 font-bold uppercase tracking-widest block mb-2">LIVE IN CONCERT</span>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase">2026 TURNE TAKVİMİ</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bubilet Resmi Gişe Entegrasyonu</span>
            </div>
          </div>

          <div className="space-y-3">
            {liveConcerts.map((concert) => {
              const soldCount = ticketSales[concert.id] || 0;
              return (
                <div
                  key={concert.id}
                  className="p-5 border border-white/10 bg-black/40 hover:border-red-500/40 transition-all flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-[220px]">
                    <div className="h-12 w-12 bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center font-mono">
                      <span className="text-[10px] text-red-500 font-bold uppercase">{concert.date.split(" ")[1]}</span>
                      <span className="text-sm font-black text-white">{concert.date.split(" ")[0]}</span>
                    </div>
                    <div>
                      <h4 className="text-base font-black text-white uppercase">{concert.city}</h4>
                      <p className="text-xs text-neutral-400">{concert.venue}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-neutral-400">
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {concert.time}</span>
                    
                    {/* Real Click-Based Ticket Sold Counter */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-neutral-300 font-mono">
                      <Ticket className="h-3.5 w-3.5 text-red-500" />
                      <span>Satılan Bilet: <strong className="text-white text-sm font-bold">{soldCount}</strong></span>
                    </div>

                    <span className="px-2.5 py-1 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] uppercase">
                      ✓ SATIŞTA
                    </span>
                  </div>

                  <a
                    href={concert.bubiletUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      const newCount = TicketService.recordTicketClick(concert.id);
                      triggerToast(`🎫 "${concert.city}" konseri için bilet talebi kaydedildi! Toplam Satış: ${newCount}`);
                    }}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Ticket className="h-4 w-4" /> BİLET AL ➔
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. FIXED BOTTOM AUDIO PLAYER DOCK */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[#0a0a0a]/96 backdrop-blur-2xl px-4 py-3">
        <div className="container flex items-center justify-between gap-4">
          
          {/* Left: Track Info & Likes */}
          <div
            className="flex items-center gap-3.5 min-w-0 max-w-[240px] cursor-pointer group"
            onClick={() => setIsFullPlayerOpen(true)}
          >
            <img
              src={currentTrack.image}
              alt={currentTrack.title}
              className="h-12 w-12 aspect-square object-cover border border-white/10 flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate group-hover:text-red-500 transition-colors">
                {currentTrack.title}
              </p>
              <p className="text-xs text-neutral-400 truncate">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Center: Controls & Scrubber */}
          <div className="flex flex-col items-center gap-1.5 flex-1 max-w-xl px-2">
            
            <div className="flex items-center gap-4">
              <button
                type="button"
                className={`p-1.5 transition-colors ${
                  isShuffle ? "text-red-500 font-bold" : "text-neutral-400 hover:text-white"
                }`}
                onClick={toggleShuffle}
                title="Karışık Çal"
              >
                <Shuffle className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                className="text-neutral-400 hover:text-white transition-colors p-1"
                onClick={handlePrevTrack}
                title="Önceki Şarkı"
              >
                <SkipBack className="h-4 w-4" />
              </button>

              <button
                type="button"
                className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-transform active:scale-95 shadow-md"
                onClick={toggleMasterPlay}
                title={isPlaying ? "Duraklat (Space)" : "Oynat (Space)"}
              >
                {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
              </button>

              <button
                type="button"
                className="text-neutral-400 hover:text-white transition-colors p-1"
                onClick={handleNextTrack}
                title="Sonraki Şarkı"
              >
                <SkipForward className="h-4 w-4" />
              </button>

              <button
                type="button"
                className={`p-1.5 transition-colors ${
                  repeatMode !== "off" ? "text-red-500 font-bold" : "text-neutral-400 hover:text-white"
                }`}
                onClick={toggleRepeatMode}
                title={`Tekrar Modu: ${repeatMode === "one" ? "Tek Şarkı" : repeatMode === "all" ? "Tüm Şarkılar" : "Kapalı"}`}
              >
                {repeatMode === "one" ? <Repeat1 className="h-3.5 w-3.5" /> : <Repeat className="h-3.5 w-3.5" />}
              </button>
            </div>

            {/* DUAL-COLOR PROGRESS BAR */}
            <div className="flex items-center gap-3 w-full font-mono text-[11px] text-neutral-400">
              <span className="w-8 text-right">{formatTime(currentTimeSec)}</span>
              
              <div className="relative flex-1 h-1.5 flex items-center group cursor-pointer">
                <div className="absolute inset-0 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-600 transition-all duration-75"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progressPercent}
                  onChange={handleScrubberChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div
                  className="absolute h-3 w-3 rounded-full bg-white border border-red-600 shadow-md pointer-events-none transition-all duration-75 -translate-x-1/2"
                  style={{ left: `${progressPercent}%` }}
                />
              </div>

              <span className="w-8">{formatTime(durationSec)}</span>
            </div>

          </div>

          {/* Right: Like, Comments, Volume & Maximize */}
          <div className="hidden sm:flex items-center gap-3 font-mono text-xs">
            
            <button
              type="button"
              onClick={() => {
                if (!currentUser) {
                  setAuthModalMode("login");
                  setIsAuthModalOpen(true);
                  return;
                }
                PlaylistService.toggleLikeSong(currentTrack.id, currentUser.id);
              }}
              className={`p-1.5 transition-colors ${currentStats.isLikedByMe ? "text-red-500" : "text-neutral-400 hover:text-white"}`}
              title="Şarkıyı Beğen"
            >
              <Heart className={`h-4 w-4 ${currentStats.isLikedByMe ? "fill-current" : ""}`} />
            </button>

            <button
              type="button"
              onClick={() => setPlaylistModalTrack(currentTrack)}
              className="p-1.5 text-neutral-400 hover:text-red-400 transition-colors"
              title="Çalma Listesine Ekle"
            >
              <Plus className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsCommentsDrawerOpen(true)}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              title="Şarkı Yorumları"
            >
              <MessageSquare className="h-4 w-4" />
            </button>

            <canvas ref={spectrumCanvasRef} className="h-4 w-10" />
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="text-neutral-400 hover:text-white transition-colors p-1"
                onClick={toggleMute}
                title={isMuted ? "Sesi Aç" : "Sesi Kapat"}
              >
                {isMuted ? <VolumeX className="h-4 w-4 text-red-500" /> : <Volume2 className="h-4 w-4 text-neutral-400" />}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={volumePct}
                onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                className="w-16 h-1 cursor-pointer appearance-none bg-white/20 accent-red-600"
              />
            </div>

            <button
              type="button"
              className="text-neutral-400 hover:text-white transition-colors p-1.5"
              onClick={() => setIsFullPlayerOpen(true)}
              title="Genişlet"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

        </div>
      </aside>

      {/* 9. EXPANDABLE FULL PLAYER DRAWER */}
      {isFullPlayerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative max-h-[92vh] w-full max-w-4xl border border-white/10 bg-[#0d0d0d] p-6 md:p-8 flex flex-col shadow-2xl">
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 mb-6">
              <div>
                <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest block">
                  OFFICIAL STUDIO PLAYER
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white">{currentTrack.title}</h3>
                <p className="text-xs text-neutral-400 font-mono">{currentTrack.artist}</p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 border border-white/10 p-1 font-mono text-xs">
                <button
                  type="button"
                  className={`px-3 py-1 uppercase font-bold transition-all ${
                    fullPlayerTab === "vinyl" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                  }`}
                  onClick={() => setFullPlayerTab("vinyl")}
                >
                  VİNİL PLAK
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 uppercase font-bold transition-all ${
                    fullPlayerTab === "video" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                  }`}
                  onClick={() => setFullPlayerTab("video")}
                >
                  VİDEO KLİP
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 uppercase font-bold transition-all ${
                    fullPlayerTab === "lyrics" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                  }`}
                  onClick={() => setFullPlayerTab("lyrics")}
                >
                  ŞARKI SÖZLERİ
                </button>
              </div>

              <button
                type="button"
                className="text-neutral-400 hover:text-white p-1"
                onClick={() => setIsFullPlayerOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto py-2">
              {fullPlayerTab === "vinyl" && (
                <div className="flex flex-col items-center justify-center py-6">
                  <VinylAlbumCard
                    title={currentTrack.title}
                    artist={currentTrack.artist}
                    coverImage={currentTrack.image}
                    isPlaying={isPlaying}
                    onPlayClick={toggleMasterPlay}
                  />
                  <div className="mt-4">
                    <canvas ref={fullSpectrumCanvasRef} className="h-9 w-60" />
                  </div>
                </div>
              )}

              {fullPlayerTab === "video" && (
                <div className="aspect-video w-full border border-white/10 bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=1`}
                    title={currentTrack.title}
                    className="h-full w-full border-0"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {fullPlayerTab === "lyrics" && (
                <div className="flex flex-col h-full max-h-[420px] font-mono px-2">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" /> RESMİ ŞARKI SÖZLERİ
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      Sözler şarkı akışıyla otomatik senkronize kayar
                    </span>
                  </div>

                  {/* Clean Spotify-style auto-scrolling lyrics */}
                  <div
                    ref={lyricsContainerRef}
                    className="flex-1 overflow-y-auto space-y-4 pr-3 text-center py-4 scroll-smooth"
                  >
                    {currentSyncedLyrics.map((line, idx) => {
                      const isActive = idx === activeLyricIndex && activeLyricIndex !== -1;
                      const isPast = activeLyricIndex !== -1 && idx < activeLyricIndex;

                      return (
                        <p
                          key={idx}
                          id={`lyric-line-${idx}`}
                          className={`text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer py-1 ${
                            isActive
                              ? "text-red-500 font-black scale-105 drop-shadow-[0_0_14px_rgba(255,42,85,0.7)]"
                              : isPast
                              ? "text-neutral-500 hover:text-neutral-300"
                              : "text-neutral-300 hover:text-white"
                          }`}
                          onClick={() => {
                            audioEngine.seekToSeconds(line.time);
                            setCurrentTimeSec(line.time);
                          }}
                          title="Bu satırdan çal"
                        >
                          {line.text}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Scrubber & Controls */}
            <div className="border-t border-white/[0.08] pt-4 mt-4 space-y-4 font-mono">
              <div className="flex items-center gap-3 text-xs text-neutral-400">
                <span className="w-10 text-right">{formatTime(currentTimeSec)}</span>
                
                <div className="relative flex-1 h-2 flex items-center group cursor-pointer">
                  <div className="absolute inset-0 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-600 transition-all duration-75"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={progressPercent}
                    onChange={handleScrubberChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <div
                    className="absolute h-3.5 w-3.5 rounded-full bg-white border-2 border-red-600 shadow-md pointer-events-none transition-all duration-75 -translate-x-1/2"
                    style={{ left: `${progressPercent}%` }}
                  />
                </div>

                <span className="w-10">{formatTime(durationSec)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className={`p-2 transition-colors ${
                      isShuffle ? "text-red-500 font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                    onClick={toggleShuffle}
                    title="Karışık Çal"
                  >
                    <Shuffle className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    className="text-neutral-400 hover:text-white p-2"
                    onClick={handlePrevTrack}
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>
                  
                  <button
                    type="button"
                    className="h-11 w-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 shadow-lg"
                    onClick={toggleMasterPlay}
                  >
                    {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
                  </button>
                  
                  <button
                    type="button"
                    className="text-neutral-400 hover:text-white p-2"
                    onClick={handleNextTrack}
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    className={`p-2 transition-colors ${
                      repeatMode !== "off" ? "text-red-500 font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                    onClick={toggleRepeatMode}
                    title={`Tekrar Modu: ${repeatMode === "one" ? "Tek Şarkı" : repeatMode === "all" ? "Tüm Şarkılar" : "Kapalı"}`}
                  >
                    {repeatMode === "one" ? <Repeat1 className="h-4 w-4" /> : <Repeat className="h-4 w-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <Volume2 className="h-4 w-4 text-neutral-400" />
                  <div className="relative w-28 h-2 flex items-center group cursor-pointer">
                    <div className="absolute inset-0 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 transition-all duration-75"
                        style={{ width: `${volumePct}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={volumePct}
                      onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                      className="absolute h-3.5 w-3.5 rounded-full bg-white border-2 border-red-600 shadow-md pointer-events-none transition-all duration-75 -translate-x-1/2"
                      style={{ left: `${volumePct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 10. AUTH & PROFILE MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onSuccess={(u) => {
          setCurrentUser(u);
          triggerToast(`Hoş geldiniz, ${u.displayName}!`);
        }}
      />

      {/* 11. ADMIN HUB (SECRET DASHBOARD) */}
      <AdminHub
        isOpen={isAdminHubOpen}
        onClose={() => setIsAdminHubOpen(false)}
      />

      {/* 12. RIGHT SIDEBAR DRAWER (Playlists, Mixes, Chat/DM, Sync) */}
      <RightSidebarDrawer
        isOpen={isRightDrawerOpen}
        onUserProfileClick={(uid) => setViewingUserId(uid)}
        onClose={() => setIsRightDrawerOpen(false)}
        onTrackPlay={(t) => playTrack(t)}
        onOpenMixModal={() => setIsMixModalOpen(true)}
        onOpenListenTogether={() => setIsListenTogetherOpen(true)}
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />

      {/* 13. COMMUNITY MIX UPLOAD MODAL */}
      <CommunityMixModal
        isOpen={isMixModalOpen}
        onClose={() => setIsMixModalOpen(false)}
        onMixCreated={() => triggerToast("Mixiniz başarıyla yayınlandı!")}
      />

      {/* 14. LISTEN TOGETHER / SYNC ROOM MODAL */}
      <ListenTogetherModal
        isOpen={isListenTogetherOpen}
        onClose={() => setIsListenTogetherOpen(false)}
        onTrackPlay={(t) => playTrack(t)}
        onUserProfileClick={(uid) => setViewingUserId(uid)}
      />

      {/* 15. SONG COMMENTS & STATS DRAWER */}
      <SongCommentsDrawer
        isOpen={isCommentsDrawerOpen}
        onClose={() => setIsCommentsDrawerOpen(false)}
        track={currentTrack}
        onUserProfileClick={(uid) => setViewingUserId(uid)}
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />

      {/* 16. USER PROFILE MODAL */}
      <UserProfileModal
        isOpen={!!viewingUserId}
        onClose={() => setViewingUserId(null)}
        userId={viewingUserId}
        onTrackPlay={playTrack}
        onOpenDm={() => {
          setViewingUserId(null);
          setIsRightDrawerOpen(true);
        }}
      />

      {/* 17. ADD TO PLAYLIST MODAL */}
      <AddToPlaylistModal
        isOpen={!!playlistModalTrack}
        onClose={() => setPlaylistModalTrack(null)}
        track={playlistModalTrack}
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 border border-white/20 bg-[#0d0d0d] px-4 py-3 font-mono text-xs text-white shadow-2xl animate-in slide-in-from-right duration-200">
          <span>// {toastMessage}</span>
        </div>
      )}

      {/* FOOTER */}
      <footer className="container mt-20 border-t border-white/[0.08] pt-10 text-xs font-mono text-neutral-500">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 ALLIANCE RECORDS / CULTURE RECORDS. TÜM HAKLARI SAKLIDIR.</p>
          <p>ERAY067 (FRANKFURT) × MANSUR (ANKARA / MALATYA)</p>
        </div>
      </footer>

    </div>
  );
}
