import React, { useState, useEffect } from "react";
import { AuthService } from "@/services/authService";
import { Track } from "@/data/artists";
import { PlaylistService, UserPlaylist } from "@/services/playlistService";
import { Button } from "@/components/ui/button";
import { X, Plus, Check, ListMusic, Music, Sparkles } from "lucide-react";

interface AddToPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  track: Track | null;
  onOpenAuthModal?: () => void;
}

export default function AddToPlaylistModal({
  isOpen,
  onClose,
  track,
  onOpenAuthModal
}: AddToPlaylistModalProps) {
  const currentUser = AuthService.getCurrentUser();
  const [playlists, setPlaylists] = useState<UserPlaylist[]>([]);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      setPlaylists(PlaylistService.getUserPlaylists(currentUser.id));
    }
  }, [currentUser, isOpen]);

  if (!isOpen || !track) return null;

  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 font-mono">
        <div className="relative w-full max-w-sm border border-white/15 bg-[#0a0a0a] shadow-2xl p-6 text-center space-y-4">
          <button
            type="button"
            className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
          <div className="h-12 w-12 bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center mx-auto text-xl">
            <ListMusic className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-black text-white uppercase">ÇALMA LİSTESİNE EKLE</h3>
          <p className="text-xs text-neutral-400 font-sans">
            Şarkıları kendi özel çalma listelerinize eklemek için lütfen giriş yapın.
          </p>
          <Button
            onClick={() => {
              onClose();
              if (onOpenAuthModal) onOpenAuthModal();
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase rounded-none py-3"
          >
            GİRİŞ YAP / KAYIT OL
          </Button>
        </div>
      </div>
    );
  }

  const handleToggleAdd = (playlist: UserPlaylist) => {
    const isAlreadyIn = playlist.trackIds.includes(track.id);
    if (isAlreadyIn) {
      PlaylistService.removeTrackFromPlaylist(playlist.id, track.id);
      setSuccessMsg(`"${track.title}" parçası "${playlist.title}" listesinden çıkarıldı.`);
    } else {
      PlaylistService.addTrackToPlaylist(playlist.id, track.id);
      setSuccessMsg(`"${track.title}" parçası "${playlist.title}" listesine eklendi!`);
    }

    setPlaylists(PlaylistService.getUserPlaylists(currentUser.id));
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handleCreateAndAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPl = PlaylistService.createPlaylist({
      title: newTitle.trim(),
      ownerId: currentUser.id,
      ownerName: currentUser.displayName,
      ownerAvatar: currentUser.avatar,
      initialTrackIds: [track.id]
    });

    setPlaylists(PlaylistService.getUserPlaylists(currentUser.id));
    setNewTitle("");
    setIsCreatingNew(false);
    setSuccessMsg(`"${newPl.title}" listesi oluşturuldu ve "${track.title}" eklendi!`);
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 font-mono">
      <div className="relative w-full max-w-md border border-white/15 bg-[#0a0a0a] shadow-2xl p-6 max-h-[85vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <ListMusic className="h-5 w-5 text-red-500" />
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider">ÇALMA LİSTESİNE EKLE</h3>
              <p className="text-[10px] text-neutral-400 truncate max-w-[220px]">
                {track.title} — {track.artist}
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

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 p-2.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Playlists List */}
        <div className="space-y-2 mb-4">
          {playlists.length === 0 && !isCreatingNew ? (
            <p className="text-xs text-neutral-500 text-center py-6 font-sans">
              Henüz bir çalma listeniz bulunmuyor. Aşağıdan yeni bir liste oluşturabilirsiniz.
            </p>
          ) : (
            playlists.map((pl) => {
              const isIncluded = pl.trackIds.includes(track.id);
              return (
                <button
                  key={pl.id}
                  type="button"
                  onClick={() => handleToggleAdd(pl)}
                  className={`w-full p-3 border flex items-center justify-between gap-3 text-left transition-all ${
                    isIncluded
                      ? "border-red-500 bg-red-950/20 text-white"
                      : "border-white/10 bg-black/60 hover:border-white/30 text-neutral-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={pl.coverImage} alt={pl.title} className="h-10 w-10 object-cover border border-white/20 shrink-0 aspect-square" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold truncate">{pl.title}</h4>
                      <p className="text-[10px] text-neutral-400">{pl.trackIds.length} Parça</p>
                    </div>
                  </div>

                  <div className={`h-6 w-6 rounded-full border flex items-center justify-center shrink-0 ${
                    isIncluded ? "border-red-500 bg-red-600 text-white" : "border-white/30 text-transparent"
                  }`}>
                    <Check className="h-3.5 w-3.5" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Create New Playlist Option */}
        {!isCreatingNew ? (
          <Button
            onClick={() => setIsCreatingNew(true)}
            variant="outline"
            className="w-full border-dashed border-white/20 text-neutral-300 hover:text-white hover:border-white/40 font-bold text-xs uppercase py-2.5 rounded-none"
          >
            <Plus className="h-4 w-4 mr-1.5" /> YENİ ÇALMA LİSTESİ OLUŞTUR
          </Button>
        ) : (
          <form onSubmit={handleCreateAndAdd} className="space-y-3 border border-white/10 p-3 bg-black/80">
            <span className="text-[10px] font-bold text-neutral-300 uppercase block">YENİ LİSTE ADI:</span>
            <input
              type="text"
              required
              autoFocus
              placeholder="Örn: Favori Drill Parçalarım"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-black border border-white/20 text-white text-xs p-2 focus:border-red-500 focus:outline-none"
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                size="sm"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase rounded-none"
              >
                OLUŞTUR VE ŞARKIYI EKLE
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsCreatingNew(false)}
                className="border-white/20 text-neutral-400 hover:text-white text-xs uppercase rounded-none"
              >
                İptal
              </Button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
