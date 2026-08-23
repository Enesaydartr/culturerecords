import React, { useState, useMemo, useRef, useEffect } from "react";
import { PLAYLIST, Track, TourDate } from "@/data/artists";
import { UserProfile } from "@/services/authService";
import { SongStats } from "@/services/playlistService";
import { TicketService } from "@/services/ticketService";
import { SyncedLine } from "@/services/syncedLyricsService";
import Character3DScrollShowcase from "@/components/ui/character-3d-scroll-showcase";
import NewsSection from "@/components/NewsSection";
import { Button } from "@/components/ui/button";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Repeat1,
  Shuffle, Heart, MessageSquare, Plus, Radio, ShieldCheck, User, ListMusic,
  Disc3, Search, Sparkles, ExternalLink, Calendar, Clock, MapPin, Ticket, Mic2,
  Share2, ChevronRight, Layers, Flame, ArrowUpRight, Check, Zap, Eye
} from "lucide-react";

export interface ModernAppViewProps {
  currentUser: UserProfile | null;
  currentTrack: Track;
  isPlaying: boolean;
  isMuted: boolean;
  isShuffle: boolean;
  repeatMode: "off" | "all" | "one";
  currentTimeSec: number;
  durationSec: number;
  volumePct: number;
  currentStats: SongStats;
  currentSyncedLyrics: SyncedLine[];
  activeLyricIndex: number;
  liveConcerts: TourDate[];
  ticketSales: Record<string, number>;
  onPlayTrack: (track: Track) => void;
  onToggleMasterPlay: () => void;
  onPrevTrack: () => void;
  onNextTrack: () => void;
  onToggleRepeat: () => void;
  onToggleShuffle: () => void;
  onSeek: (timeSec: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onOpenRightDrawer: () => void;
  onOpenListenTogether: () => void;
  onOpenAdminHub: () => void;
  onOpenAuthModal: (mode?: "login" | "register" | "profile") => void;
  onOpenMixModal: () => void;
  onOpenCommentsDrawer: () => void;
  onUserProfileClick: (userId: string) => void;
  onAddToPlaylist: (track: Track) => void;
  onToggleViewMode: () => void;
  triggerToast: (msg: string) => void;
}

export default function ModernAppView({
  currentUser,
  currentTrack,
  isPlaying,
  isMuted,
  isShuffle,
  repeatMode,
  currentTimeSec,
  durationSec,
  volumePct,
  currentStats,
  currentSyncedLyrics,
  activeLyricIndex,
  liveConcerts,
  ticketSales,
  onPlayTrack,
  onToggleMasterPlay,
  onPrevTrack,
  onNextTrack,
  onToggleRepeat,
  onToggleShuffle,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onOpenRightDrawer,
  onOpenListenTogether,
  onOpenAdminHub,
  onOpenAuthModal,
  onOpenMixModal,
  onOpenCommentsDrawer,
  onUserProfileClick,
  onAddToPlaylist,
  onToggleViewMode,
  triggerToast
}: ModernAppViewProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "alliance" | "hits" | "collab" | "eray067" | "mansur">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewStyle, setViewStyle] = useState<"grid" | "list">("grid");
  const [isLyricsQuickViewOpen, setIsLyricsQuickViewOpen] = useState(false);
  const [copiedTrackId, setCopiedTrackId] = useState<string | null>(null);

  const lyricsScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLyricsQuickViewOpen && activeLyricIndex >= 0 && lyricsScrollRef.current) {
      const activeEl = lyricsScrollRef.current.children[activeLyricIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeLyricIndex, isLyricsQuickViewOpen]);

  const filteredTracks = useMemo(() => {
    return PLAYLIST.filter((track) => {
      if (activeCategory === "alliance" && track.category !== "alliance") return false;
      if (activeCategory === "hits" && track.category !== "hits") return false;
      if (activeCategory === "collab" && track.category !== "collab") return false;
      if (activeCategory === "eray067" && !track.artist.toLowerCase().includes("eray")) return false;
      if (activeCategory === "mansur" && !track.artist.toLowerCase().includes("mansur")) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = track.title.toLowerCase().includes(q);
        const matchArtist = track.artist.toLowerCase().includes(q);
        const matchAlbum = track.album?.toLowerCase().includes(q);
        const matchProducer = track.producers?.toLowerCase().includes(q);
        return matchTitle || matchArtist || matchAlbum || matchProducer;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  const handleShare = (track: Track, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/#discography?track=${track.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedTrackId(track.id);
      triggerToast(`"${track.title}" bağlantısı kopyalandı! 📋`);
      setTimeout(() => setCopiedTrackId(null), 2000);
    }
  };

  const progressPercent = durationSec > 0 ? (currentTimeSec / durationSec) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#050508] text-neutral-100 font-sans selection:bg-red-600 selection:text-white pb-32">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[140px]" />
      </div>

      {/* 1. FLOATING MODERN NAVBAR */}
      <header className="sticky top-4 z-40 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="backdrop-blur-2xl bg-[#0d0d12]/85 border border-white/[0.08] shadow-2xl rounded-2xl px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Live Audio Indicator */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-tr from-red-600 to-red-900 shadow-lg shadow-red-600/30">
              <Disc3 className={`h-5 w-5 text-white ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
              {isPlaying && (
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#0d0d12] animate-ping" />
              )}
            </div>
            <div>
              <span className="text-sm font-black tracking-wider text-white uppercase block leading-none">
                ALLIANCE <span className="text-red-500 font-normal">CLTR</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                V2 MODERN SÜRÜM
              </span>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
              <input
                type="text"
                placeholder="33 parça içinde ara (Şarkı, Sanatçı, Prodüktör)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-white/20 focus:border-red-500/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Nav Links & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* View Mode Switcher Button */}
            <button
              type="button"
              onClick={onToggleViewMode}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-red-500/15 hover:from-amber-500/25 hover:to-red-500/25 border border-amber-500/30 text-amber-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              title="Klasik Görünüme Geri Dön"
            >
              <Zap className="h-3.5 w-3.5 text-amber-400 fill-current" />
              <span className="hidden sm:inline">KLASİK GÖRÜNÜM</span>
            </button>

            {/* Birlikte Dinle */}
            <button
              type="button"
              onClick={onOpenListenTogether}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
              title="Canlı Eşzamanlı Dinleme"
            >
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              <span className="hidden lg:inline">BİRLİKTE DİNLE</span>
            </button>

            {/* Admin Hub (If admin) */}
            {currentUser?.role === "admin" && (
              <button
                type="button"
                onClick={onOpenAdminHub}
                className="p-2 rounded-xl bg-red-600/10 hover:bg-red-600/30 border border-red-500/30 text-red-400 hover:text-white transition-all"
                title="Admin Studio"
              >
                <ShieldCheck className="h-4 w-4" />
              </button>
            )}

            {/* Auth / Profile */}
            {currentUser ? (
              <button
                type="button"
                onClick={() => onUserProfileClick(currentUser.id)}
                className="flex items-center gap-2 p-1 pl-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-all"
              >
                <span className="text-xs font-bold text-white hidden sm:inline max-w-[90px] truncate">
                  {currentUser.displayName}
                </span>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="h-7 w-7 rounded-lg object-cover border border-red-500/50"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onOpenAuthModal("login")}
                className="px-3.5 py-1.5 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all shadow-md active:scale-95"
              >
                GİRİŞ YAP
              </button>
            )}

            {/* 3-Line Menu Drawer Trigger */}
            <button
              type="button"
              onClick={onOpenRightDrawer}
              className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white transition-all"
              title="Çalma Listeleri & Miksler (Menü)"
            >
              <ListMusic className="h-4 w-4 text-red-400" />
            </button>

          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 mt-8 space-y-16">

        {/* 2. FUTURISTIC HERO STAGE */}
        <section className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-[#101018]/90 via-[#0a0a0f]/90 to-[#050508] p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          
          <div
            className="absolute inset-0 opacity-15 bg-cover bg-center blur-3xl pointer-events-none transition-all duration-1000"
            style={{ backgroundImage: `url(${currentTrack.image})` }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            
            {/* Left: Artist & Track Hero Info */}
            <div className="space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-wider">
                <Flame className="h-3.5 w-3.5 text-red-500 animate-pulse" />
                <span>OFFICIAL ARTIST HUB • ALLIANCE 2026</span>
              </div>

              <div>
                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
                  ERAY067 <span className="text-red-500 font-light">&</span> MANSUR
                </h1>
                <p className="text-neutral-400 text-sm sm:text-base font-light mt-3 max-w-lg leading-relaxed">
                  German Drill & Melodik Trap kültürünün zirvesi. 33 orijinal stüdyo kaydı, milisaniyelik senkronize karaoke sözleri ve topluluk remixleri tek merkezde.
                </p>
              </div>

              {/* Quick Play & Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  size="lg"
                  onClick={() => onPlayTrack(PLAYLIST[0])}
                  className="rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase px-7 py-3.5 shadow-xl shadow-red-600/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-current" /> ALLIANCE DİNLE (BAK NE DİCEM)
                </Button>

                <button
                  type="button"
                  onClick={onOpenMixModal}
                  className="px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white text-xs font-bold uppercase transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 text-amber-400" /> MİKS YÜKLE
                </button>

                <button
                  type="button"
                  onClick={() => setIsLyricsQuickViewOpen(true)}
                  className="px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white text-xs font-bold transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                  title="Senkronize Sözleri Aç"
                >
                  <Mic2 className="h-4 w-4 text-red-400" />
                  <span className="hidden sm:inline">KARAOKE SÖZLER</span>
                </button>
              </div>

              {/* Artist Mini Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/[0.06]">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-[10px] text-neutral-500 uppercase block font-mono">ERAY067 DİNLEYİCİ</span>
                  <span className="text-base font-black text-white">2.7M+ / Ay</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-[10px] text-neutral-500 uppercase block font-mono">MANSUR DİNLEYİCİ</span>
                  <span className="text-base font-black text-white">1.8M+ / Ay</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-neutral-500 uppercase block font-mono">TOPLAM PARÇA</span>
                  <span className="text-base font-black text-red-400">33 Parça Full</span>
                </div>
              </div>

            </div>

            {/* Right: Interactive 3D Vinyl Showcase Card */}
            <div className="relative flex items-center justify-center p-4">
              <div className="relative group w-full max-w-sm">
                
                {/* Vinyl Record Behind Artwork */}
                <div
                  className={`absolute top-0 right-2 w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-neutral-900 border-4 border-neutral-800 shadow-2xl flex items-center justify-center transition-all duration-700 ${
                    isPlaying ? "translate-x-12 sm:translate-x-16 rotate-180" : "group-hover:translate-x-8"
                  }`}
                >
                  <div className="w-20 h-20 rounded-full border-2 border-neutral-700 bg-red-950 flex items-center justify-center overflow-hidden">
                    <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Album Cover Front Card */}
                <div className="relative z-10 rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <img
                    src={currentTrack.image}
                    alt={currentTrack.title}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-5 flex flex-col justify-end">
                    <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-widest block mb-1">
                      ŞU AN ÇALAN
                    </span>
                    <h3 className="text-xl font-black text-white truncate">{currentTrack.title}</h3>
                    <p className="text-xs text-neutral-300 truncate">{currentTrack.artist}</p>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10 text-xs">
                      <span className="text-[10px] font-mono text-neutral-400">{currentTrack.album}</span>
                      <span className="px-2 py-0.5 rounded-full bg-red-600/40 text-red-300 text-[10px] font-bold">
                        {currentTrack.bpm} BPM • {currentTrack.key}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 3. 3D BIOGRAPHY SHOWCASE */}
        <section id="alliance" className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-widest block mb-1">
                BİYOGRAFİ & KARİYER
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                SANATÇILAR HAKKINDA BİLGİLER
              </h2>
            </div>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c0c12]/80 overflow-hidden shadow-2xl backdrop-blur-xl">
            <Character3DScrollShowcase />
          </div>
        </section>

        {/* 4. DISCOGRAPHY & TRACK LIST (NEXT-GEN) */}
        <section id="discography" className="space-y-6">
          
          {/* Header & Controls */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-widest block mb-1">
                DISCOGRAPHY // 33 FULL TRACKS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                DİSKOGRAFİ & ŞARKILAR
              </h2>
            </div>

            {/* Filter Chips & View Toggle */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                {[
                  { id: "all", label: "TÜMÜ" },
                  { id: "alliance", label: "ALLIANCE" },
                  { id: "hits", label: "HİTLER" },
                  { id: "collab", label: "DÜETLER" },
                  { id: "eray067", label: "ERAY067" },
                  { id: "mansur", label: "MANSUR" }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeCategory === cat.id
                        ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* View Style: Grid vs List */}
              <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setViewStyle("grid")}
                  className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewStyle === "grid" ? "bg-white/20 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                  title="Kart Görünümü"
                >
                  <Layers className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewStyle("list")}
                  className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewStyle === "list" ? "bg-white/20 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                  title="Liste Görünümü"
                >
                  <ListMusic className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* GRID VIEW */}
          {viewStyle === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTracks.map((tr) => {
                const isThisPlaying = isPlaying && currentTrack.id === tr.id;
                const isSelected = currentTrack.id === tr.id;

                return (
                  <div
                    key={tr.id}
                    className={`group relative rounded-2xl border transition-all duration-300 p-3.5 bg-[#0e0e14]/90 backdrop-blur-xl flex flex-col justify-between overflow-hidden ${
                      isSelected
                        ? "border-red-500/80 shadow-xl shadow-red-600/15"
                        : "border-white/[0.06] hover:border-white/20 hover:bg-[#13131c]"
                    }`}
                  >
                    <div>
                      {/* Cover & Overlay Play */}
                      <div className="relative aspect-square rounded-xl overflow-hidden mb-3 border border-white/10 bg-black">
                        <img
                          src={tr.image}
                          alt={tr.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Top Badge */}
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                          <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[9px] font-mono font-bold text-red-400">
                            {tr.badge || tr.album}
                          </span>
                        </div>

                        {/* Hover Overlay Play Button */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => onPlayTrack(tr)}
                            className="h-12 w-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
                            title="Çal"
                          >
                            {isThisPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
                          </button>
                        </div>

                        {/* Active Equalizer Bar Overlay */}
                        {isThisPlaying && (
                          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/80 border border-red-500/50 flex items-center gap-1">
                            <span className="h-3 w-1 bg-red-500 animate-pulse rounded-full" />
                            <span className="h-4 w-1 bg-red-500 animate-pulse rounded-full" style={{ animationDelay: "150ms" }} />
                            <span className="h-2 w-1 bg-red-500 animate-pulse rounded-full" style={{ animationDelay: "300ms" }} />
                          </div>
                        )}
                      </div>

                      {/* Track Details */}
                      <div>
                        <h4 className="text-sm font-bold text-white truncate group-hover:text-red-400 transition-colors">
                          {tr.title}
                        </h4>
                        <p className="text-xs text-neutral-400 truncate mt-0.5">{tr.artist}</p>
                        
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-neutral-500 font-mono">
                          <span>{tr.duration}</span>
                          <span>•</span>
                          <span>{tr.bpm} BPM</span>
                          <span>•</span>
                          <span>{tr.key}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions Bar */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06] text-neutral-400">
                      <div className="flex items-center gap-1.5">
                        {/* Add to playlist */}
                        <button
                          type="button"
                          onClick={() => onAddToPlaylist(tr)}
                          className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                          title="Çalma Listesine Ekle"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>

                        {/* Karaoke lyrics modal trigger */}
                        <button
                          type="button"
                          onClick={() => {
                            onPlayTrack(tr);
                            setIsLyricsQuickViewOpen(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-white/10 hover:text-red-400 transition-colors cursor-pointer"
                          title="Senkronize Şarkı Sözleri"
                        >
                          <Mic2 className="h-3.5 w-3.5" />
                        </button>

                        {/* Song comments */}
                        <button
                          type="button"
                          onClick={() => {
                            onPlayTrack(tr);
                            onOpenCommentsDrawer();
                          }}
                          className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                          title="Yorumlar"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Share button */}
                      <button
                        type="button"
                        onClick={(e) => handleShare(tr, e)}
                        className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                        title="Bağlantıyı Kopyala"
                      >
                        {copiedTrackId === tr.id ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Share2 className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            /* LIST VIEW */
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c12]/90 backdrop-blur-xl overflow-hidden divide-y divide-white/[0.05]">
              {filteredTracks.map((tr, idx) => {
                const isThisPlaying = isPlaying && currentTrack.id === tr.id;
                const isSelected = currentTrack.id === tr.id;

                return (
                  <div
                    key={tr.id}
                    onClick={() => onPlayTrack(tr)}
                    className={`flex items-center justify-between p-3 sm:p-4 hover:bg-white/[0.04] transition-all cursor-pointer ${
                      isSelected ? "bg-red-600/10" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <span className="text-xs font-mono font-bold text-neutral-500 w-5 text-right">
                        {idx + 1}
                      </span>
                      <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-lg overflow-hidden shrink-0 border border-white/10">
                        <img src={tr.image} alt={tr.title} className="w-full h-full object-cover" />
                        {isThisPlaying && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Volume2 className="h-4 w-4 text-red-500 animate-pulse" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className={`text-xs sm:text-sm font-bold truncate ${isSelected ? "text-red-400" : "text-white"}`}>
                          {tr.title}
                        </h4>
                        <p className="text-[11px] text-neutral-400 truncate">{tr.artist} • {tr.album}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6 text-neutral-400 text-xs">
                      <span className="hidden sm:inline text-neutral-500 font-mono">{tr.bpm} BPM</span>
                      <span className="font-mono">{tr.duration}</span>
                      
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => onAddToPlaylist(tr)}
                          className="p-1.5 hover:text-white"
                          title="Çalma Listesine Ekle"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onPlayTrack(tr);
                            setIsLyricsQuickViewOpen(true);
                          }}
                          className="p-1.5 hover:text-red-400"
                          title="Sözler"
                        >
                          <Mic2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </section>

        {/* 5. TOUR CALENDAR & LIVE TICKETS */}
        <section id="tour" className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-widest block mb-1">
                OFFICIAL CONCERT TOUR
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                KONSER TAKVİMİ & CANLI BİLETLER
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveConcerts.map((c) => {
              const currentSold = ticketSales[c.id] || 0;
              return (
                <div
                  key={c.id}
                  className="rounded-2xl border border-white/[0.08] bg-[#0e0e14]/90 p-5 backdrop-blur-xl flex flex-col justify-between hover:border-red-500/40 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-red-600/20 border border-red-500/40 text-red-400 text-[10px] font-mono font-bold">
                        {c.status || "RESMİ TURNESİ"}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                        🎫 Satılan Bilet: {currentSold}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-white group-hover:text-red-400 transition-colors">
                        {c.city}
                      </h3>
                      <p className="text-xs text-neutral-400 flex items-center gap-1.5 mt-1">
                        <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
                        <span>{c.venue}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-neutral-300 pt-2 border-t border-white/[0.05]">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-neutral-500" />
                        {c.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-neutral-500" />
                        {c.time}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-neutral-500 block font-mono">BAŞLANGIÇ</span>
                      <span className="text-sm font-black text-white">{c.price} ₺</span>
                    </div>

                    <a
                      href={c.bubiletUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        TicketService.recordTicketClick(c.id);
                        triggerToast(`"${c.city}" konseri için bilet alınıyor! Satılan: +1 🎫`);
                      }}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-red-600/30 active:scale-95"
                    >
                      <span>BİLET AL</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* 6. OFFICIAL NEWS SECTION */}
        <section id="news-section" className="space-y-6">
          <NewsSection
            onUserProfileClick={onUserProfileClick}
            onOpenAuthModal={() => onOpenAuthModal("login")}
          />
        </section>

      </main>

      {/* 7. QUICK KARAOKE LYRICS MODAL POPOVER */}
      {isLyricsQuickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-[#0e0e14] p-6 shadow-2xl flex flex-col max-h-[80vh]">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img src={currentTrack.image} alt={currentTrack.title} className="h-10 w-10 rounded-xl object-cover border border-white/20" />
                <div>
                  <h3 className="text-sm font-bold text-white truncate">{currentTrack.title}</h3>
                  <p className="text-xs text-neutral-400 truncate">{currentTrack.artist}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLyricsQuickViewOpen(false)}
                className="p-2 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div ref={lyricsScrollRef} className="flex-1 overflow-y-auto py-6 space-y-4 text-center pr-2">
              {currentSyncedLyrics.length === 0 ? (
                <p className="text-xs text-neutral-500 font-mono">Bu parça için sözler henüz yüklenmedi.</p>
              ) : (
                currentSyncedLyrics.map((line, idx) => {
                  const isCurrent = idx === activeLyricIndex;
                  return (
                    <p
                      key={idx}
                      onClick={() => onSeek(line.time)}
                      className={`text-sm sm:text-base font-bold transition-all cursor-pointer py-1 px-3 rounded-lg ${
                        isCurrent
                          ? "text-red-400 text-lg sm:text-xl font-black scale-105 bg-red-600/15"
                          : "text-neutral-500 hover:text-neutral-300"
                      }`}
                    >
                      {line.text}
                    </p>
                  );
                })
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
              <span>Sözlere tıklayarak o saniyeye atlayabilirsiniz.</span>
              <button
                type="button"
                onClick={() => setIsLyricsQuickViewOpen(false)}
                className="px-3 py-1 bg-white/10 rounded-lg text-white font-bold"
              >
                Kapat
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 8. NEXT-GEN DOCKED BOTTOM AUDIO BAR */}
      <div className="fixed bottom-3 left-3 right-3 sm:left-6 sm:right-6 max-w-6xl mx-auto z-40">
        <div className="rounded-2xl border border-white/[0.12] bg-[#0c0c12]/95 backdrop-blur-2xl p-3 sm:p-4 shadow-2xl flex flex-col gap-2">
          
          {/* Top Scrubber & Time */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-neutral-400 w-10 text-right">
              {Math.floor(currentTimeSec / 60)}:{(Math.floor(currentTimeSec % 60)).toString().padStart(2, "0")}
            </span>
            
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const pct = Math.max(0, Math.min(1, clickX / rect.width));
                onSeek(pct * durationSec);
              }}
              className="relative flex-1 h-2 bg-neutral-800/80 hover:h-2.5 rounded-full overflow-hidden cursor-pointer transition-all"
            >
              <div
                className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-75 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <span className="text-[10px] font-mono text-neutral-400 w-10">
              {Math.floor(durationSec / 60)}:{(Math.floor(durationSec % 60)).toString().padStart(2, "0")}
            </span>
          </div>

          {/* Bottom Bar Controls Grid */}
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Left: Track Mini Info & Like */}
            <div className="flex items-center gap-3 min-w-0 max-w-[200px] sm:max-w-xs">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black">
                <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">{currentTrack.title}</h4>
                <p className="text-[10px] sm:text-xs text-neutral-400 truncate">{currentTrack.artist}</p>
              </div>
              <button
                type="button"
                onClick={() => onAddToPlaylist(currentTrack)}
                className="hidden sm:flex p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
                title="Çalma Listesine Ekle"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Center: Playback Buttons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={onToggleShuffle}
                className={`p-2 rounded-lg transition-colors ${
                  isShuffle ? "text-red-500 font-bold" : "text-neutral-400 hover:text-white"
                }`}
                title="Karışık Çal"
              >
                <Shuffle className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onPrevTrack}
                className="p-2 rounded-lg text-neutral-300 hover:text-white transition-colors"
                title="Önceki"
              >
                <SkipBack className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onToggleMasterPlay}
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 shadow-xl hover:scale-105 active:scale-95 transition-all"
                title={isPlaying ? "Duraklat" : "Oynat"}
              >
                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={onNextTrack}
                className="p-2 rounded-lg text-neutral-300 hover:text-white transition-colors"
                title="Sonraki"
              >
                <SkipForward className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onToggleRepeat}
                className={`p-2 rounded-lg transition-colors ${
                  repeatMode !== "off" ? "text-red-500 font-bold" : "text-neutral-400 hover:text-white"
                }`}
                title={`Tekrar: ${repeatMode}`}
              >
                {repeatMode === "one" ? <Repeat1 className="h-4 w-4" /> : <Repeat className="h-4 w-4" />}
              </button>
            </div>

            {/* Right: Karaoke, Comments, Volume */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Karaoke Quick Lyrics */}
              <button
                type="button"
                onClick={() => setIsLyricsQuickViewOpen(true)}
                className="p-2 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
                title="Karaoke Sözleri Aç"
              >
                <Mic2 className="h-4 w-4" />
              </button>

              {/* Comments Drawer */}
              <button
                type="button"
                onClick={onOpenCommentsDrawer}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Şarkı Yorumları"
              >
                <MessageSquare className="h-4 w-4" />
              </button>

              {/* Volume Slider (Desktop) */}
              <div className="hidden md:flex items-center gap-2">
                <button type="button" onClick={onToggleMute} className="text-neutral-400 hover:text-white">
                  {isMuted || volumePct === 0 ? <VolumeX className="h-4 w-4 text-red-500" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={isMuted ? 0 : volumePct}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                  className="w-16 h-1.5 bg-neutral-700 rounded-full accent-red-600 cursor-pointer"
                />
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
