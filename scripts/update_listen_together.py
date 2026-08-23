code = """import React, { useState, useEffect } from "react";
import { AuthService } from "@/services/authService";
import { PLAYLIST, Track } from "@/data/artists";
import { SocialService, SyncRoom, ChatMessage } from "@/services/socialService";
import { audioEngine } from "@/audio/engine";
import { Button } from "@/components/ui/button";
import {
  X,
  Radio,
  Users,
  Sparkles,
  Play,
  Pause,
  Send,
  Copy,
  Check,
  Headphones,
  Music,
  Share2,
  AlertCircle,
  Search,
  UserPlus,
  UserCheck
} from "lucide-react";

interface ListenTogetherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackPlay?: (track: Track) => void;
  onUserProfileClick?: (userId: string) => void;
}

export default function ListenTogetherModal({
  isOpen,
  onClose,
  onTrackPlay,
  onUserProfileClick
}: ListenTogetherModalProps) {
  const currentUser = AuthService.getCurrentUser();

  const [viewMode, setViewMode] = useState<"lobby" | "room" | "matching">("lobby");
  const [selectedMatchTrackId, setSelectedMatchTrackId] = useState<string>("bak_ne_dicem");
  const [matchingStatus, setMatchingStatus] = useState("Aynı şarkıyı dinleyen dinleyici aranıyor...");
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [currentRoom, setCurrentRoom] = useState<SyncRoom | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // In-room chat
  const [roomChatMsg, setRoomChatMsg] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [addedFriends, setAddedFriends] = useState<string[]>([]);

  // Real-time listener for room events across tabs
  useEffect(() => {
    const handleSync = () => {
      if (currentRoom) {
        const rooms = SocialService.getSyncRooms();
        const fresh = rooms.find((r) => r.code === currentRoom.code);
        if (fresh) {
          setCurrentRoom(fresh);
          if (fresh.currentTrackId !== currentRoom.currentTrackId) {
            const tr = PLAYLIST.find((t) => t.id === fresh.currentTrackId);
            if (tr && onTrackPlay) onTrackPlay(tr);
          }
        }
      }
    };

    window.addEventListener("sync-rooms-updated", handleSync);
    return () => window.removeEventListener("sync-rooms-updated", handleSync);
  }, [currentRoom, onTrackPlay]);

  if (!isOpen) return null;

  // 1. RANDOM TRACK MATCHMAKING (Finds peer with same selected song or creates pairing room)
  const handleStartTrackMatchmaking = () => {
    if (!currentUser) {
      alert("Eşleşme başlatmak için lütfen önce giriş yapın!");
      return;
    }

    setViewMode("matching");
    setMatchingStatus(`"${PLAYLIST.find((t) => t.id === selectedMatchTrackId)?.title}" parçasını dinleyen dinleyici taranıyor...`);

    // Check if another room is already listening to this song
    const rooms = SocialService.getSyncRooms();
    const matchableRoom = rooms.find(
      (r) => r.currentTrackId === selectedMatchTrackId && r.hostId !== currentUser.id && r.listeners.length < 5
    );

    setTimeout(() => {
      if (matchableRoom) {
        const joined = SocialService.joinSyncRoom(matchableRoom.code, {
          id: currentUser.id,
          name: currentUser.displayName,
          avatar: currentUser.avatar
        });
        if (joined) {
          setCurrentRoom(joined);
          setViewMode("room");
          const tr = PLAYLIST.find((t) => t.id === joined.currentTrackId);
          if (tr && onTrackPlay) onTrackPlay(tr);
          return;
        }
      }

      // If no room currently exists, create an active matched frequency room
      const newRoom = SocialService.createSyncRoom(
        { id: currentUser.id, name: currentUser.displayName, avatar: currentUser.avatar },
        selectedMatchTrackId
      );
      setCurrentRoom(newRoom);
      setViewMode("room");

      const tr = PLAYLIST.find((t) => t.id === selectedMatchTrackId);
      if (tr && onTrackPlay) onTrackPlay(tr);
    }, 1200);
  };

  // Create Room Manually
  const handleCreateRoom = (trackId: string = "bak_ne_dicem") => {
    if (!currentUser) {
      alert("Oda oluşturmak için lütfen önce giriş yapın!");
      return;
    }
    const room = SocialService.createSyncRoom(
      { id: currentUser.id, name: currentUser.displayName, avatar: currentUser.avatar },
      trackId
    );
    setCurrentRoom(room);
    setViewMode("room");

    const tr = PLAYLIST.find((t) => t.id === trackId);
    if (tr && onTrackPlay) onTrackPlay(tr);
  };

  // Join Room with Code
  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Odaya katılmak için lütfen önce giriş yapın!");
      return;
    }
    if (!roomCodeInput.trim()) return;

    const room = SocialService.joinSyncRoom(roomCodeInput.trim(), {
      id: currentUser.id,
      name: currentUser.displayName,
      avatar: currentUser.avatar
    });

    if (room) {
      setCurrentRoom(room);
      setViewMode("room");
      const tr = PLAYLIST.find((t) => t.id === room.currentTrackId);
      if (tr && onTrackPlay) onTrackPlay(tr);
    } else {
      alert("Geçersiz veya bulunamayan oda kodu!");
    }
  };

  // Change Track in Room (Host only)
  const handleHostChangeTrack = (trackId: string) => {
    if (!currentRoom) return;
    SocialService.updateRoomState(currentRoom.code, { currentTrackId: trackId, currentTimeSec: 0 });
    const tr = PLAYLIST.find((t) => t.id === trackId);
    if (tr && onTrackPlay) onTrackPlay(tr);
  };

  // In-Room Send Chat
  const handleSendRoomChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !roomChatMsg.trim() || !currentRoom) return;

    const msg: ChatMessage = {
      id: "rm_" + Date.now(),
      roomId: currentRoom.code,
      senderId: currentUser.id,
      senderName: currentUser.displayName,
      senderAvatar: currentUser.avatar,
      senderRole: currentUser.role,
      text: roomChatMsg.trim(),
      createdAt: new Date().toISOString()
    };

    setChatMessages((prev) => [...prev, msg]);
    setRoomChatMsg("");
  };

  const copyRoomCode = () => {
    if (!currentRoom) return;
    navigator.clipboard.writeText(currentRoom.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAddFriendInRoom = (listenerId: string) => {
    if (!currentUser) return;
    AuthService.toggleFollow(listenerId, currentUser.id);
    setAddedFriends((prev) => [...prev, listenerId]);
  };

  const currentPlayingTrack = PLAYLIST.find((t) => t.id === currentRoom?.currentTrackId);
  const isHost = currentRoom?.hostId === currentUser?.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 font-mono">
      <div className="relative w-full max-w-2xl border border-white/15 bg-[#0a0a0a] shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-red-600 text-white flex items-center justify-center font-black text-sm shadow-md">
              📻
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                BİRLİKTE DİNLE // CANLI EŞLEŞME RADARI
              </h2>
              <p className="text-[11px] text-neutral-400">
                Şarkı seçerek aynı parçayı dinlemek isteyenlerle anında eşleşin veya özel oda kurun.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="text-neutral-400 hover:text-white p-1 hover:bg-white/10 transition-colors"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 1. MATCHING SCANNING VIEW */}
        {viewMode === "matching" && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative h-24 w-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-40" />
              <div className="absolute inset-2 rounded-full border border-red-600 animate-spin opacity-75" />
              <Radio className="h-10 w-10 text-red-500 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-black text-white uppercase tracking-widest">
                CANLI EŞLEŞME RADARI AKTİF
              </h3>
              <p className="text-xs text-neutral-400 font-sans max-w-md">
                {matchingStatus}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("lobby")}
              className="border-white/20 text-neutral-400 hover:text-white text-xs uppercase"
            >
              Aramayı İptal Et
            </Button>
          </div>
        )}

        {/* 2. LOBBY VIEW */}
        {viewMode === "lobby" && (
          <div className="space-y-6">
            
            {/* Section 1: TRACK MATCHMAKING (SELECT SONG & MATCH) */}
            <div className="border border-red-500/40 bg-red-950/20 p-5 space-y-4 shadow-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-red-400" />
                <span className="text-xs font-black text-white uppercase tracking-wider">
                  1. ŞARKI SEÇ VE RASTGELE BİRİYLE EŞLEŞ
                </span>
              </div>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                Dinlemek istediğiniz parçayı seçin. Radar aynı şarkıyı dinlemek isteyen diğer bir dinleyiciyle sizi eşleştirir:
              </p>

              <div>
                <label className="text-[10px] font-bold text-neutral-400 uppercase block mb-1.5">
                  Eşleşmek İstediğiniz Şarkı:
                </label>
                <select
                  value={selectedMatchTrackId}
                  onChange={(e) => setSelectedMatchTrackId(e.target.value)}
                  className="w-full bg-black border border-white/20 text-white text-xs p-3 font-bold focus:border-red-500 focus:outline-none"
                >
                  {PLAYLIST.map((track) => (
                    <option key={track.id} value={track.id}>
                      {track.title} — {track.artist}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                onClick={handleStartTrackMatchmaking}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase py-3.5 rounded-none shadow-lg shadow-red-600/30 tracking-widest"
              >
                🔥 RASTGELE BİRİYLE EŞLEŞ & CANLI DİNLE ➔
              </Button>
            </div>

            {/* Section 2: Custom Room & Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Create Room */}
              <div className="border border-white/10 bg-black/60 p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black text-white uppercase block mb-1">
                    2. ÖZEL ODA AÇ
                  </span>
                  <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                    Kendi odanızı kurun ve davet kodunu arkadaşınızla paylaşın.
                  </p>
                </div>
                <Button
                  onClick={() => handleCreateRoom("bak_ne_dicem")}
                  className="w-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 font-black text-xs uppercase py-3 rounded-none transition-all"
                >
                  ODA AÇ & KOD AL ➔
                </Button>
              </div>

              {/* Join Room */}
              <form onSubmit={handleJoinRoom} className="border border-white/10 bg-black/60 p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black text-white uppercase block mb-1">
                    3. KODLA ODAYA GİR
                  </span>
                  <p className="text-[11px] text-neutral-400 font-sans leading-relaxed mb-2">
                    Arkadaşınızın verdiği oda kodunu yazın:
                  </p>
                  <input
                    type="text"
                    required
                    placeholder="Örn: ALLIANCE-7840"
                    value={roomCodeInput}
                    onChange={(e) => setRoomCodeInput(e.target.value)}
                    className="w-full bg-black border border-white/20 text-white text-xs p-2.5 uppercase font-bold focus:border-red-500 focus:outline-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 font-bold text-xs uppercase py-3 rounded-none"
                >
                  ODAYA BAĞLAN
                </Button>
              </form>
            </div>

          </div>
        )}

        {/* 3. ACTIVE LIVE ROOM VIEW */}
        {viewMode === "room" && currentRoom && (
          <div className="space-y-6">
            
            {/* Top Room Banner & Invite Code */}
            <div className="border border-red-500/40 bg-red-950/20 p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-white uppercase">{currentRoom.name}</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Oda Sahibi: <strong className="text-white">{currentRoom.hostName}</strong> {isHost && "(Sen)"}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-black/80 border border-white/20 px-3 py-1.5">
                <span className="text-[10px] text-neutral-400">ODA KODU:</span>
                <span className="text-xs font-black text-red-400">{currentRoom.code}</span>
                <button
                  type="button"
                  onClick={copyRoomCode}
                  className="text-neutral-400 hover:text-white p-1"
                  title="Kodu Kopyala"
                >
                  {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Currently Playing Sync Track */}
            {currentPlayingTrack && (
              <div className="border border-white/10 bg-black/60 p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={currentPlayingTrack.image} alt={currentPlayingTrack.title} className="h-12 w-12 object-cover border border-white/20 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider block">SENKRONİZE ÇALAN PARÇA</span>
                    <h4 className="text-xs font-bold text-white truncate">{currentPlayingTrack.title}</h4>
                    <p className="text-[11px] text-neutral-400 truncate">{currentPlayingTrack.artist}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isHost ? (
                    <select
                      value={currentRoom.currentTrackId}
                      onChange={(e) => handleHostChangeTrack(e.target.value)}
                      className="bg-black border border-white/20 text-white text-xs p-1.5 font-bold"
                    >
                      {PLAYLIST.map((t) => (
                        <option key={t.id} value={t.id}>{t.title}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <Headphones className="h-3.5 w-3.5" /> Senkron Çalıyor
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Active Listeners in Room + ADD FRIEND / FOLLOW BUTTON */}
            <div>
              <span className="text-[11px] font-bold text-neutral-400 uppercase block mb-2">
                ODADAKİ CANLI DİNLEYİCİLER ({currentRoom.listeners.length}):
              </span>
              <div className="flex flex-wrap gap-2.5">
                {currentRoom.listeners.map((l, i) => {
                  const isMe = l.id === currentUser?.id;
                  const isAdded = addedFriends.includes(l.id);

                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 px-3 py-2 bg-white/5 border border-white/10 hover:border-white/30 transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => onUserProfileClick && onUserProfileClick(l.id)}
                        className="flex items-center gap-2 hover:opacity-80"
                        title="Profili Gör"
                      >
                        <img src={l.avatar} alt={l.name} className="h-6 w-6 rounded-full object-cover border border-white/20" />
                        <span className="text-xs text-neutral-200 font-bold hover:underline">{l.name}</span>
                      </button>

                      {!isMe && (
                        <button
                          type="button"
                          onClick={() => handleAddFriendInRoom(l.id)}
                          className={`text-[10px] font-bold uppercase px-2 py-1 transition-all ${
                            isAdded
                              ? "bg-emerald-600 text-white"
                              : "bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/40"
                          }`}
                          title="Arkadaş Ekle / Takip Et"
                        >
                          {isAdded ? "✓ Eklendi" : "+ Takip Et"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* In-Room Live Chat */}
            <div className="border border-white/10 bg-black/50 p-4 space-y-3">
              <span className="text-[11px] font-bold text-neutral-400 uppercase block border-b border-white/10 pb-2">
                ODA SOHBETİ (CANLI KONUŞMA)
              </span>

              <div className="h-40 overflow-y-auto space-y-2 pr-2 text-xs">
                {chatMessages.length === 0 ? (
                  <p className="text-neutral-500 text-center py-6 font-sans">
                    Eşleştiğiniz dinleyiciyle şarkıyı dinlerken sohbet etmeye başlayın...
                  </p>
                ) : (
                  chatMessages.map((m) => (
                    <div key={m.id} className="flex items-start gap-2">
                      <button
                        type="button"
                        onClick={() => onUserProfileClick && onUserProfileClick(m.senderId)}
                      >
                        <img src={m.senderAvatar} alt={m.senderName} className="h-5 w-5 rounded-full object-cover shrink-0 mt-0.5" />
                      </button>
                      <div>
                        <button
                          type="button"
                          onClick={() => onUserProfileClick && onUserProfileClick(m.senderId)}
                          className="text-[10px] font-bold text-red-400 mr-1.5 hover:underline"
                        >
                          {m.senderName}:
                        </button>
                        <span className="text-neutral-200 font-sans">{m.text}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleSendRoomChat} className="flex gap-2 pt-2 border-t border-white/10">
                <input
                  type="text"
                  placeholder="Şarkı hakkında mesaj yazın..."
                  value={roomChatMsg}
                  onChange={(e) => setRoomChatMsg(e.target.value)}
                  className="flex-1 bg-black border border-white/20 text-white text-xs p-2 focus:border-red-500 focus:outline-none"
                />
                <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase rounded-none">
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </form>
            </div>

            {/* Leave Room Button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("lobby")}
                className="border-white/20 text-neutral-400 hover:text-white font-bold text-xs uppercase"
              >
                Odadan Ayrıl
              </Button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
"""

with open("src/components/ListenTogetherModal.tsx", "w", encoding="utf-8") as f:
    f.write(code)
print("ListenTogetherModal.tsx updated with song-specific matchmaking radar & friend add!")
