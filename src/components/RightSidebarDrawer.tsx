import React, { useState, useEffect, useRef } from "react";
import { AuthService, UserProfile } from "@/services/authService";
import { PLAYLIST, Track } from "@/data/artists";
import { PlaylistService, UserPlaylist } from "@/services/playlistService";
import { MixService, CommunityMix } from "@/services/mixService";
import { SocialService, ChatMessage } from "@/services/socialService";
import { Button } from "@/components/ui/button";
import {
  X,
  Lock, ListMusic, Disc3, MessageSquare, Radio, Plus, Play, Heart, Headphones,
  Send, Image as ImageIcon, Music, Search, GripVertical, Trash2, Sparkles, ChevronRight
} from "lucide-react";

interface RightSidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackPlay?: (track: Track) => void;
  onOpenMixModal?: () => void;
  onOpenListenTogether?: () => void;
  onOpenAuthModal?: () => void;
  onUserProfileClick?: (userId: string) => void;
}

export default function RightSidebarDrawer({
  isOpen, onClose, onTrackPlay, onOpenMixModal, onOpenListenTogether, onOpenAuthModal, onUserProfileClick
}: RightSidebarDrawerProps) {
  const currentUser = AuthService.getCurrentUser();
  const [followUpdateTrigger, setFollowUpdateTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState<"playlists" | "mixes" | "chat">("playlists");

  const [playlists, setPlaylists] = useState<UserPlaylist[]>(PlaylistService.getAllPlaylists());
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const [mixSort, setMixSort] = useState<"popular" | "liked" | "newest">("popular");
  const [mixes, setMixes] = useState<CommunityMix[]>(MixService.getAllMixes("popular"));

  const [chatSubTab, setChatSubTab] = useState<"global" | "dm" | "users">("global");
  const [globalRoom, setGlobalRoom] = useState<string>("global1");
  const [globalMessages, setGlobalMessages] = useState<ChatMessage[]>(SocialService.getGlobalMessages("global1"));
  const [chatInputText, setChatInputText] = useState("");
  const [chatImageUrl, setChatImageUrl] = useState("");
  const [selectedShareTrackId, setSelectedShareTrackId] = useState("");
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const [selectedDmUser, setSelectedDmUser] = useState<UserProfile | null>(null);
  const [dmThread, setDmThread] = useState<ChatMessage[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatImageFileInputRef = useRef<HTMLInputElement>(null);

  const handleChatImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setChatImageUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setPlaylists(PlaylistService.getAllPlaylists());
    setMixes(MixService.getAllMixes(mixSort));
    setGlobalMessages(SocialService.getGlobalMessages(globalRoom));
  }, [isOpen, mixSort, globalRoom]);

  useEffect(() => {
    const handlePlUpdate = () => setPlaylists(PlaylistService.getAllPlaylists());
    const handleMixUpdate = () => setMixes(MixService.getAllMixes(mixSort));
    const handleChatUpdate = () => setGlobalMessages(SocialService.getGlobalMessages(globalRoom));

    window.addEventListener("playlists-updated", handlePlUpdate);
    window.addEventListener("mixes-updated", handleMixUpdate);
    window.addEventListener("global-chat-updated", handleChatUpdate);

    return () => {
      window.removeEventListener("playlists-updated", handlePlUpdate);
      window.removeEventListener("mixes-updated", handleMixUpdate);
      window.removeEventListener("global-chat-updated", handleChatUpdate);
    };
  }, [mixSort, globalRoom]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [globalMessages, dmThread]);

  if (!isOpen) return null;

  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }
    if (!newPlaylistTitle.trim()) return;

    const pl = PlaylistService.createPlaylist({
      title: newPlaylistTitle.trim(),
      ownerId: currentUser.id,
      ownerName: currentUser.displayName,
      ownerAvatar: currentUser.avatar,
      initialTrackIds: ["bak_ne_dicem", "nafile"]
    });

    setPlaylists(PlaylistService.getAllPlaylists());
    setActivePlaylistId(pl.id);
    setNewPlaylistTitle("");
    setIsCreatingPlaylist(false);
  };

  const handleDragStart = (index: number) => setDraggedIndex(index);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (playlistId: string, dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    PlaylistService.reorderTracks(playlistId, draggedIndex, dropIndex);
    setPlaylists(PlaylistService.getAllPlaylists());
    setDraggedIndex(null);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }
    if (!chatInputText.trim() && !chatImageUrl && !selectedShareTrackId) return;

    const shareTrack = PLAYLIST.find((t) => t.id === selectedShareTrackId);

    if (chatSubTab === "global") {
      SocialService.sendGlobalMessage({
        roomId: globalRoom,
        senderId: currentUser.id,
        senderName: currentUser.displayName,
        senderAvatar: currentUser.avatar,
        senderRole: currentUser.role,
        text: chatInputText.trim() || undefined,
        imageUrl: chatImageUrl.trim() || undefined,
        trackId: shareTrack?.id,
        trackTitle: shareTrack ? (shareTrack.title + " — " + shareTrack.artist) : undefined
      });
      setGlobalMessages(SocialService.getGlobalMessages(globalRoom));
    } else if (chatSubTab === "dm" && selectedDmUser) {
      SocialService.sendDirectMessage({
        senderId: currentUser.id,
        senderName: currentUser.displayName,
        senderAvatar: currentUser.avatar,
        senderRole: currentUser.role,
        recipientId: selectedDmUser.id,
        text: chatInputText.trim() || undefined,
        imageUrl: chatImageUrl.trim() || undefined,
        trackId: shareTrack?.id,
        trackTitle: shareTrack ? (shareTrack.title + " — " + shareTrack.artist) : undefined
      });
      setDmThread(SocialService.getDirectMessages(currentUser.id, selectedDmUser.id));
    }

    setChatInputText("");
    setChatImageUrl("");
    setSelectedShareTrackId("");
    setShowAttachMenu(false);
  };

  const activePlaylist = playlists.find((p) => p.id === activePlaylistId);
  const searchedUsers = AuthService.searchUsers(userSearchQuery);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col font-mono text-xs z-10 animate-in slide-in-from-right duration-200">
        
        {/* Top Header */}
        <div className="p-4 border-b border-white/10 bg-[#0d0d0d] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/images/brand_logo.png"
              alt="Logo"
              className="h-7 w-auto object-contain shrink-0 drop-shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/images/alliance_cover.jpg";
              }}
            />
            <span className="font-black text-white uppercase tracking-wider text-xs sm:text-sm">
              CLTR TOPLULUĞU & LİSTELER
            </span>
          </div>

          <button
            type="button"
            className="text-neutral-400 hover:text-white p-1 hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-4 border-b border-white/10 bg-black text-[11px] font-bold">
          <button
            type="button"
            className={`py-3 text-center uppercase transition-all border-b-2 flex flex-col items-center gap-1 ${
              activeTab === "playlists"
                ? "border-red-500 text-red-400 bg-red-600/10"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("playlists")}
          >
            <ListMusic className="h-4 w-4" />
            <span>Listeler</span>
          </button>

          <button
            type="button"
            className={`py-3 text-center uppercase transition-all border-b-2 flex flex-col items-center gap-1 ${
              activeTab === "mixes"
                ? "border-red-500 text-red-400 bg-red-600/10"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("mixes")}
          >
            <Disc3 className="h-4 w-4" />
            <span>Mixler</span>
          </button>

          <button
            type="button"
            className={`py-3 text-center uppercase transition-all border-b-2 flex flex-col items-center gap-1 ${
              activeTab === "chat"
                ? "border-red-500 text-red-400 bg-red-600/10"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("chat")}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Sohbet</span>
          </button>

          <button
            type="button"
            className="py-3 text-center uppercase transition-all border-b-2 border-transparent text-emerald-400 hover:text-white flex flex-col items-center gap-1"
            onClick={() => {
              if (onOpenListenTogether) {
                onClose();
                onOpenListenTogether();
              }
            }}
          >
            <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span>Birlikte</span>
          </button>
        </div>

        {/* TAB 1: PLAYLISTS */}
        {activeTab === "playlists" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!isCreatingPlaylist ? (
              <button
                type="button"
                onClick={() => setIsCreatingPlaylist(true)}
                className="w-full p-3 bg-red-600/15 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-black uppercase flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Plus className="h-4 w-4" /> YENİ ÇALMA LİSTESİ OLUŞTUR
              </button>
            ) : (
              <form onSubmit={handleCreatePlaylist} className="border border-red-500/30 bg-red-950/20 p-3 space-y-2">
                <span className="text-[10px] font-bold text-red-400 uppercase">YENİ LİSTE ADI:</span>
                <input
                  type="text"
                  required
                  placeholder="Örn: Frankfurt Drill Seçkisi"
                  value={newPlaylistTitle}
                  onChange={(e) => setNewPlaylistTitle(e.target.value)}
                  className="w-full bg-black border border-white/20 text-white text-xs p-2 focus:border-red-500 focus:outline-none"
                />
                <div className="flex gap-2 pt-1">
                  <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase rounded-none flex-1">
                    Oluştur
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsCreatingPlaylist(false)} className="border-white/20 text-neutral-400 text-xs uppercase rounded-none">
                    İptal
                  </Button>
                </div>
              </form>
            )}

            {activePlaylist ? (
              <div className="space-y-4 border border-white/10 bg-black/60 p-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <button
                    type="button"
                    onClick={() => setActivePlaylistId(null)}
                    className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
                  >
                    ← Tüm Listelere Dön
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Bu çalma listesini silmek istediğinize emin misiniz?")) {
                        PlaylistService.deletePlaylist(activePlaylist.id);
                        setActivePlaylistId(null);
                      }
                    }}
                    className="text-neutral-500 hover:text-red-400"
                    title="Listeyi Sil"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <img src={activePlaylist.coverImage} alt={activePlaylist.title} className="h-14 w-14 object-cover border border-white/20 shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-xs font-black text-white truncate">{activePlaylist.title}</h3>
                    <p className="text-[10px] text-neutral-400">{activePlaylist.trackIds.length} Şarkı • Sahibi: {activePlaylist.ownerName}</p>
                    <p className="text-[10px] text-neutral-500 line-clamp-1">{activePlaylist.description}</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 px-2.5 py-1.5 text-[10px] text-neutral-400 flex items-center gap-1.5">
                  <GripVertical className="h-3 w-3 text-red-500 shrink-0" />
                  <span>Şarkıların sırasını değiştirmek için <strong>tutun ve sürükleyin</strong>.</span>
                </div>

                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {activePlaylist.trackIds.map((trackId, idx) => {
                    const tr = PLAYLIST.find((t) => t.id === trackId);
                    if (!tr) return null;
                    return (
                      <div
                        key={tr.id}
                        draggable
                        onDragStart={() => handleDragStart(idx)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(activePlaylist.id, idx)}
                        className={`flex items-center justify-between p-2 border bg-black/80 cursor-grab active:cursor-grabbing transition-all ${
                          draggedIndex === idx ? "border-red-500 bg-red-600/10 opacity-50" : "border-white/10 hover:border-white/25"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <GripVertical className="h-3.5 w-3.5 text-neutral-600 shrink-0" />
                          <span className="text-[10px] font-bold text-neutral-500 w-4">{idx + 1}</span>
                          <img src={tr.image} alt={tr.title} className="h-6 w-6 object-cover shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white truncate">{tr.title}</p>
                            <p className="text-[9px] text-neutral-500 truncate">{tr.artist}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onTrackPlay && onTrackPlay(tr)}
                            className="p-1 text-red-400 hover:text-white"
                            title="Çal"
                          >
                            <Play className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => PlaylistService.removeTrackFromPlaylist(activePlaylist.id, tr.id)}
                            className="p-1 text-neutral-600 hover:text-red-400"
                            title="Listeden Çıkar"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  ÇALMA LİSTELERİ ({playlists.length})
                </span>

                {playlists.map((pl) => (
                  <div
                    key={pl.id}
                    onClick={() => setActivePlaylistId(pl.id)}
                    className="p-3 border border-white/10 bg-black/60 hover:border-red-500/40 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={pl.coverImage} alt={pl.title} className="h-12 w-12 object-cover border border-white/20 shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-red-400 truncate">{pl.title}</h4>
                        <p className="text-[10px] text-neutral-400">{pl.trackIds.length} Parça • <button type="button" onClick={(e) => { e.stopPropagation(); onUserProfileClick && onUserProfileClick(pl.ownerId); }} className="text-neutral-300 font-bold hover:text-red-400 hover:underline">{pl.ownerName}</button></p>
                        <p className="text-[9px] text-neutral-500 line-clamp-1">{pl.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-neutral-600 group-hover:text-white shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COMMUNITY MIXES */}
        {activeTab === "mixes" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <button
              type="button"
              onClick={() => {
                if (onOpenMixModal) onOpenMixModal();
              }}
              className="w-full p-3 bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/40 text-xs font-black uppercase flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Sparkles className="h-4 w-4" /> KENDİ MİXİNİ OLUŞTUR & PAYLAŞ ➔
            </button>

            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">SIRALA:</span>
              <div className="flex gap-1 text-[10px] font-bold">
                {[
                  { id: "popular", label: "En Popüler" },
                  { id: "liked", label: "En Beğenilen" },
                  { id: "newest", label: "En Yeni" }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setMixSort(s.id as any)}
                    className={`px-2 py-1 transition-all ${
                      mixSort === s.id ? "bg-white text-black font-black" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {mixes.map((m) => {
                const isLiked = MixService.isMixLikedBy(m.id, currentUser?.id);
                return (
                  <div key={m.id} className="border border-white/10 bg-black/60 p-3 space-y-2.5 group">
                    <div className="flex gap-3 items-start">
                      <div className="relative h-16 w-16 aspect-square shrink-0 border border-white/20 overflow-hidden">
                        <img src={m.coverImage} alt={m.title} className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={async () => {
                            MixService.incrementMixListen(m.id);
                            const mixTrack = await MixService.getPlayableTrackForMix(m);
                            if (onTrackPlay) onTrackPlay(mixTrack);
                          }}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white"
                        >
                          <Play className="h-6 w-6 fill-current" />
                        </button>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white line-clamp-1">{m.title}</h4>
                        <p className="text-[10px] text-neutral-400">Remixer: <button type="button" onClick={() => onUserProfileClick && onUserProfileClick(m.creatorId)} className="text-neutral-200 font-bold hover:text-red-400 hover:underline">{m.creatorName}</button></p>
                        <p className="text-[10px] text-neutral-500 line-clamp-2 mt-0.5">{m.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-white/5">
                      <span className="text-[9px] text-neutral-500 uppercase">Kullanılan Şarkılar:</span>
                      {m.usedTrackIds.map((tid) => {
                        const tr = PLAYLIST.find((t) => t.id === tid);
                        if (!tr) return null;
                        return (
                          <button
                            key={tid}
                            type="button"
                            onClick={() => onTrackPlay && onTrackPlay(tr)}
                            className="px-1.5 py-0.5 bg-red-950/60 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-[9px] font-bold flex items-center gap-1 transition-all"
                            title="Orijinal şarkıyı çal"
                          >
                            <Music className="h-2.5 w-2.5" />
                            <span>{tr.title}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (!currentUser) {
                              if (onOpenAuthModal) onOpenAuthModal();
                              return;
                            }
                            MixService.toggleLikeMix(m.id, currentUser.id);
                          }}
                          className={`flex items-center gap-1 font-bold ${isLiked ? "text-red-500" : "hover:text-white"}`}
                        >
                          <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-current" : ""}`} />
                          <span>{m.likesCount}</span>
                        </button>
                        <span className="flex items-center gap-1">
                          <Headphones className="h-3.5 w-3.5" />
                          <span>{m.totalListens}</span>
                        </span>
                      </div>
                      <span className="text-neutral-500">{new Date(m.createdAt).toLocaleDateString("tr-TR")}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: CHAT, DM & USERS */}
        {activeTab === "chat" && (
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex border-b border-white/10 bg-black/60 text-xs">
              <button
                type="button"
                onClick={() => setChatSubTab("global")}
                className={`flex-1 py-2 text-center uppercase font-bold transition-all ${
                  chatSubTab === "global" ? "bg-white/10 text-white border-b-2 border-red-500" : "text-neutral-400 hover:text-white"
                }`}
              >
                Odalar
              </button>
              <button
                type="button"
                onClick={() => setChatSubTab("dm")}
                className={`flex-1 py-2 text-center uppercase font-bold transition-all ${
                  chatSubTab === "dm" ? "bg-white/10 text-white border-b-2 border-red-500" : "text-neutral-400 hover:text-white"
                }`}
              >
                Özel (DM)
              </button>
              <button
                type="button"
                onClick={() => setChatSubTab("users")}
                className={`flex-1 py-2 text-center uppercase font-bold transition-all ${
                  chatSubTab === "users" ? "bg-white/10 text-white border-b-2 border-red-500" : "text-neutral-400 hover:text-white"
                }`}
              >
                Kullanıcılar
              </button>
            </div>

            {chatSubTab === "global" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-2 border-b border-white/10 flex gap-1 bg-[#0d0d0d] overflow-x-auto text-[10px] font-bold">
                  {[
                    { id: "global1", label: "🌐 Global Sohbet 1" },
                    { id: "global2", label: "🌐 Global Sohbet 2" },
                    { id: "global3", label: "🌐 Global Sohbet 3" }
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setGlobalRoom(r.id)}
                      className={`px-2.5 py-1 uppercase whitespace-nowrap transition-all border ${
                        globalRoom === r.id ? "bg-red-600 text-white border-red-500" : "border-white/10 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {globalMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-2.5">
                      <button type="button" onClick={() => onUserProfileClick && onUserProfileClick(msg.senderId)} className="shrink-0">
                        <img src={msg.senderAvatar || "/assets/images/alliance_cover.jpg"} alt={msg.senderName} className="h-7 w-7 object-cover border border-white/20 aspect-square hover:opacity-80 transition-opacity" />
                      </button>
                      <div className="flex-1 min-w-0 bg-white/[0.03] border border-white/5 p-2.5">
                        <div className="flex items-center gap-2 mb-1">
                          <button type="button" onClick={() => onUserProfileClick && onUserProfileClick(msg.senderId)} className="text-xs font-bold text-white hover:text-red-400 hover:underline">
                            {msg.senderName}
                          </button>
                          {msg.senderRole === "admin" && (
                            <span className="px-1 py-0.2 bg-red-600 text-white text-[8px] font-black uppercase">ADMIN</span>
                          )}
                          <span className="text-[9px] text-neutral-500 ml-auto">
                            {new Date(msg.createdAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>

                        {msg.text && <p className="text-neutral-200 text-xs font-sans leading-relaxed">{msg.text}</p>}
                        
                        {msg.imageUrl && (
                          <img src={msg.imageUrl} alt="attachment" className="mt-2 max-h-40 object-contain border border-white/10" />
                        )}

                        {msg.trackId && (
                          <div
                            onClick={() => {
                              const tr = PLAYLIST.find((t) => t.id === msg.trackId);
                              if (tr && onTrackPlay) onTrackPlay(tr);
                            }}
                            className="mt-2 p-2 bg-red-950/40 border border-red-500/30 flex items-center justify-between gap-2 cursor-pointer hover:bg-red-600/30 transition-colors"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <Music className="h-3.5 w-3.5 text-red-400 shrink-0" />
                              <span className="text-xs font-bold text-white truncate">{msg.trackTitle || "Şarkı"}</span>
                            </div>
                            <Play className="h-3.5 w-3.5 text-red-400 shrink-0" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSendChatMessage} className="p-2.5 border-t border-white/10 bg-[#0d0d0d] space-y-2">
                  {showAttachMenu && (
                    <div className="p-2 border border-white/10 bg-black space-y-2 text-[10px]">
                      <div>
                        <label className="text-neutral-400 block mb-1">Görsel URL Yapıştır:</label>
                        <input
                          type="text"
                          placeholder="https://..."
                          value={chatImageUrl}
                          onChange={(e) => setChatImageUrl(e.target.value)}
                          className="w-full bg-neutral-900 border border-white/15 text-white p-1 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-1">Şarkı Ekle:</label>
                        <select
                          value={selectedShareTrackId}
                          onChange={(e) => setSelectedShareTrackId(e.target.value)}
                          className="w-full bg-neutral-900 border border-white/15 text-white p-1 text-xs"
                        >
                          <option value="">(Şarkı Seçilmedi)</option>
                          {PLAYLIST.map((t) => (
                            <option key={t.id} value={t.id}>{t.title} — {t.artist}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setShowAttachMenu(!showAttachMenu)}
                      className={`p-2 border transition-colors ${
                        showAttachMenu ? "bg-red-600 text-white border-red-500" : "bg-white/5 border-white/15 text-neutral-400 hover:text-white"
                      }`}
                      title="Görsel veya Şarkı Ekle"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </button>

                    <input
                      type="text"
                      placeholder="Sohbete yazın..."
                      value={chatInputText}
                      onChange={(e) => setChatInputText(e.target.value)}
                      className="flex-1 bg-black border border-white/15 text-white text-xs p-2 focus:border-red-500 focus:outline-none"
                    />

                    <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase rounded-none h-8 px-3">
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {chatSubTab === "dm" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {selectedDmUser ? (
                  <>
                    <div className="p-2.5 border-b border-white/10 bg-[#0d0d0d] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={selectedDmUser.avatar} alt={selectedDmUser.displayName} className="h-6 w-6 object-cover border border-white/20" />
                        <span className="text-xs font-bold text-white">{selectedDmUser.displayName}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedDmUser(null)}
                        className="text-[10px] text-neutral-400 hover:text-white"
                      >
                        Kullanıcı Seç
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                      {dmThread.map((m) => {
                        const isMine = m.senderId === currentUser?.id;
                        return (
                          <div key={m.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] p-2.5 text-xs font-sans ${isMine ? "bg-red-600 text-white" : "bg-white/10 text-neutral-200 border border-white/10"}`}>
                              {m.text && <p>{m.text}</p>}
                              {m.imageUrl && <img src={m.imageUrl} alt="attachment" className="mt-1.5 max-h-36 object-contain" />}
                              {m.trackId && (
                                <div
                                  onClick={() => {
                                    const tr = PLAYLIST.find((t) => t.id === m.trackId);
                                    if (tr && onTrackPlay) onTrackPlay(tr);
                                  }}
                                  className="mt-1.5 p-1.5 bg-black/40 border border-white/20 flex items-center gap-2 cursor-pointer"
                                >
                                  <Music className="h-3 w-3 text-red-300 shrink-0" />
                                  <span className="text-[10px] font-bold truncate">{m.trackTitle || "Şarkı"}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Mutual follow check */}
                    {currentUser && selectedDmUser && !AuthService.areMutualFollowers(currentUser.id, selectedDmUser.id) ? (
                      <div className="p-3.5 bg-red-950/40 border border-red-500/40 text-center space-y-2 m-2">
                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-red-400">
                          <Lock className="h-4 w-4" />
                          <span>Karşılıklı Takip Gerekli</span>
                        </div>
                        <p className="text-[11px] text-neutral-300 font-sans leading-relaxed">
                          Özel mesaj gönderebilmek için her iki kullanıcının da birbirini takip etmesi gerekmektedir.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            if (currentUser && selectedDmUser) {
                              AuthService.toggleFollow(selectedDmUser.id, currentUser.id);
                              setFollowUpdateTrigger((p) => p + 1);
                            }
                          }}
                          className={`px-3 py-1.5 font-bold text-xs uppercase transition-all shadow-md ${
                            currentUser.following?.includes(selectedDmUser.id)
                              ? "bg-white/10 text-neutral-300 hover:bg-red-600/30"
                              : "bg-red-600 hover:bg-red-700 text-white"
                          }`}
                        >
                          {currentUser.following?.includes(selectedDmUser.id)
                            ? "✓ Sen Takip Ediyorsun (Onun Takip Etmesi Bekleniyor)"
                            : `+ ${selectedDmUser.displayName} Takip Et`}
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSendChatMessage} className="p-2.5 border-t border-white/10 bg-[#0d0d0d] flex gap-2">
                        <input
                          type="text"
                          placeholder="Özel mesaj yazın..."
                          value={chatInputText}
                          onChange={(e) => setChatInputText(e.target.value)}
                          className="flex-1 bg-black border border-white/15 text-white text-xs p-2 focus:border-red-500 focus:outline-none"
                        />
                        <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase rounded-none">
                          <Send className="h-3.5 w-3.5" />
                        </Button>
                      </form>
                    )}
                  </>
                ) : (
                  <div className="p-4 space-y-3 overflow-y-auto">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block">MESAJLAŞMAK İÇİN KULLANICI SEÇİN:</span>
                    {AuthService.getAllUsers().filter((u) => u.id !== currentUser?.id).map((u) => (
                      <div
                        key={u.id}
                        onClick={() => {
                          setSelectedDmUser(u);
                          if (currentUser) {
                            setDmThread(SocialService.getDirectMessages(currentUser.id, u.id));
                          }
                        }}
                        className="p-2.5 border border-white/10 bg-black/60 hover:border-red-500/40 flex items-center gap-3 cursor-pointer transition-all"
                      >
                        <img src={u.avatar} alt={u.displayName} className="h-8 w-8 object-cover border border-white/20" />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{u.displayName}</h4>
                          <p className="text-[10px] text-neutral-400">@{u.username}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {chatSubTab === "users" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Kullanıcı ara..."
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    className="w-full bg-black border border-white/20 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
                  />
                  <Search className="h-4 w-4 text-neutral-500 absolute right-3 top-3" />
                </div>

                <div className="space-y-2 pt-2">
                  {searchedUsers.map((u) => (
                    <div key={u.id} className="p-3 border border-white/10 bg-black/60 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onUserProfileClick && onUserProfileClick(u.id)}
                        className="flex items-center gap-3 min-w-0 text-left hover:opacity-80 transition-opacity"
                        title="Profili Gör"
                      >
                        <img src={u.avatar || "/assets/images/alliance_cover.jpg"} alt={u.displayName} className="h-8 w-8 object-cover border border-white/20 shrink-0 aspect-square" />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate hover:underline">{u.displayName}</h4>
                          <p className="text-[10px] text-neutral-400">@{u.username}</p>
                        </div>
                      </button>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {currentUser && currentUser.id !== u.id && (
                          <button
                            type="button"
                            onClick={() => {
                              AuthService.toggleFollow(u.id, currentUser.id);
                              setFollowUpdateTrigger((p) => p + 1);
                            }}
                            className={`px-2 py-1 font-bold text-[10px] uppercase transition-all ${
                              currentUser.following?.includes(u.id)
                                ? "bg-emerald-600 text-white"
                                : "bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40"
                            }`}
                          >
                            {currentUser.following?.includes(u.id) ? "✓ Takipte" : "+ Takip"}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDmUser(u);
                            setChatSubTab("dm");
                            if (currentUser) {
                              setDmThread(SocialService.getDirectMessages(currentUser.id, u.id));
                            }
                          }}
                          className="px-2.5 py-1 bg-white/10 hover:bg-white text-white hover:text-black font-bold text-[10px] uppercase border border-white/20"
                        >
                          Mesaj
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
