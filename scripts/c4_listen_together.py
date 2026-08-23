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
  Share2
} from "lucide-react";

interface ListenTogetherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackPlay?: (track: Track) => void;
}

const MOODS = [
  { id: "drill", label: "🔥 DRILL & HYPE", desc: "140 BPM sert sokak enerjisi", defaultTrack: "g_wagon" },
  { id: "night", label: "🌙 GECE SÜRÜŞÜ", desc: "02:00 otoban melodileri", defaultTrack: "bak_ne_dicem" },
  { id: "melancholy", label: "🥀 MELANKOLİ & DUYGU", desc: "Derin sözler ve hüzünlü melodiler", defaultTrack: "nafile" },
  { id: "concert", label: "🎙️ KONSER MODU", desc: "Canlı performans ve sahne coşkusu", defaultTrack: "brapap" }
];

export default function ListenTogetherModal({ isOpen, onClose, onTrackPlay }: ListenTogetherModalProps) {
  const currentUser = AuthService.getCurrentUser();

  const [viewMode, setViewMode] = useState<"lobby" | "room" | "matchmaking">("lobby");
  const [activeMood, setActiveMood] = useState<string>("drill");
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [currentRoom, setCurrentRoom] = useState<SyncRoom | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // In-room chat
  const [roomChatMsg, setRoomChatMsg] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  if (!isOpen) return null;

  // Create Room
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

  // Join Room
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

  // Random Mood Match
  const handleStartMatchmaking = (moodId: string) => {
    if (!currentUser) {
      alert("Eşleşme için lütfen önce giriş yapın!");
      return;
    }
    setActiveMood(moodId);
    setViewMode("matchmaking");

    const selectedMood = MOODS.find((m) => m.id === moodId) || MOODS[0];

    // Simulate instant match with another fan
    setTimeout(() => {
      const room = SocialService.createSyncRoom(
        { id: currentUser.id, name: currentUser.displayName, avatar: currentUser.avatar },
        selectedMood.defaultTrack
      );
      // Add simulated listener
      room.listeners.push({
        id: "user_fan_random",
        name: "Mert Drill",
        avatar: "/assets/images/alliance_cover.jpg"
      });
      room.listenersCount = 2;
      setCurrentRoom(room);
      setViewMode("room");

      const tr = PLAYLIST.find((t) => t.id === selectedMood.defaultTrack);
      if (tr && onTrackPlay) onTrackPlay(tr);
    }, 1800);
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

  const currentPlayingTrack = PLAYLIST.find((t) => t.id === currentRoom?.currentTrackId);

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
                BİRLİKTE DİNLE & SENKRON ODA // LISTEN TOGETHER
              </h2>
              <p className="text-[11px] text-neutral-400">
                Arkadaşlarınızla aynı anda şarkı dinleyin veya aynı moda sahip dinleyicilerle eşleşin.
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

        {/* LOBBY VIEW */}
        {viewMode === "lobby" && (
          <div className="space-y-6">
            
            {/* Section 1: Mood Matchmaking */}
            <div className="border border-red-500/30 bg-red-950/20 p-5 space-y-3">
              <span className="text-xs font-black text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> 1. ŞARKI & MOD EŞLEŞMESİ (RASTGELE BİR DİNLEYİCİYLE EŞLEŞ)
              </span>
              <p className="text-xs text-neutral-300 font-sans">
                Aşağıdaki ruh hallerinden birini seçin; sistem o anda çevrimiçi olan ve aynı vibe'ı dinleyen bir dinleyiciyle sizi senkronize şarkı odasında buluştursun.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {MOODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleStartMatchmaking(m.id)}
                    className="p-3.5 bg-black/60 border border-white/15 hover:border-red-500 hover:bg-red-600/10 text-left transition-all group"
                  >
                    <div className="text-xs font-black text-white group-hover:text-red-400">{m.label}</div>
                    <div className="text-[10px] text-neutral-400 mt-1">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 2: Custom Room & Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Create Room */}
              <div className="border border-white/10 bg-black/60 p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black text-white uppercase block mb-1">
                    2. ÖZEL ODA OLUŞTUR
                  </span>
                  <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                    Kendi odanızı kurun, davet kodunu arkadaşlarınızla paylaşın ve kontrol sizde olsun.
                  </p>
                </div>
                <Button
                  onClick={() => handleCreateRoom("bak_ne_dicem")}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase py-3 rounded-none shadow-md"
                >
                  ODA OLUŞTUR & BAŞLAT ➔
                </Button>
              </div>

              {/* Join Room */}
              <form onSubmit={handleJoinRoom} className="border border-white/10 bg-black/60 p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black text-white uppercase block mb-1">
                    3. DAVET KODUYLA KATIL
                  </span>
                  <p className="text-[11px] text-neutral-400 font-sans leading-relaxed mb-2">
                    Arkadaşınızın paylaştığı oda kodunu girin:
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
                  ODAYA GİRİŞ YAP
                </Button>
              </form>
            </div>

          </div>
        )}

        {/* MATCHMAKING RADAR VIEW */}
        {viewMode === "matchmaking" && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative flex items-center justify-center">
              <div className="h-24 w-24 rounded-full border-2 border-red-500 animate-ping absolute opacity-40" />
              <div className="h-16 w-16 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xl shadow-xl">
                <Radio className="h-8 w-8 animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                AYNI MODDAKİ DİNLEYİCİLERLE EŞLEŞİLİYOR...
              </h3>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                {MOODS.find((m) => m.id === activeMood)?.label} frekansı taranıyor.
              </p>
            </div>
          </div>
        )}

        {/* ACTIVE LIVE ROOM VIEW */}
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
                  Oda Sahibi: <strong className="text-white">{currentRoom.hostName}</strong>
                </p>
              </div>

              {/* Room Code Pill */}
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
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <Headphones className="h-3.5 w-3.5" /> {currentRoom.listeners.length} Dinleyici
                  </span>
                </div>
              </div>
            )}

            {/* Room Active Listeners */}
            <div>
              <span className="text-[11px] font-bold text-neutral-400 uppercase block mb-2">
                ODADAKİ DİNLEYİCİLER:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentRoom.listeners.map((l, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10">
                    <img src={l.avatar} alt={l.name} className="h-5 w-5 rounded-full object-cover" />
                    <span className="text-xs text-neutral-200 font-bold">{l.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Live Chat */}
            <div className="border border-white/10 bg-black/50 p-4 space-y-3">
              <span className="text-[11px] font-bold text-neutral-400 uppercase block border-b border-white/10 pb-2">
                ODA SOHBETİ
              </span>

              <div className="h-44 overflow-y-auto space-y-2 pr-2 text-xs">
                {chatMessages.length === 0 ? (
                  <p className="text-neutral-500 text-center py-8 font-sans">
                    Odadaki dinleyicilerle şarkı hakkında konuşmaya başlayın...
                  </p>
                ) : (
                  chatMessages.map((m) => (
                    <div key={m.id} className="flex items-start gap-2">
                      <img src={m.senderAvatar} alt={m.senderName} className="h-5 w-5 rounded-full object-cover shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-red-400 mr-1.5">{m.senderName}:</span>
                        <span className="text-neutral-200 font-sans">{m.text}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendRoomChat} className="flex gap-2 pt-2 border-t border-white/10">
                <input
                  type="text"
                  placeholder="Mesaj yazın..."
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
print("ListenTogetherModal.tsx written successfully")
