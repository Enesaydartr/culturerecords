code = """import React, { useState, useEffect } from "react";
import { AuthService } from "@/services/authService";
import { Track } from "@/data/artists";
import { PlaylistService, SongComment, SongStats } from "@/services/playlistService";
import { Button } from "@/components/ui/button";
import { X, MessageSquare, Heart, Headphones, Send, Trash2 } from "lucide-react";

interface SongCommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  track: Track;
  onOpenAuthModal?: () => void;
}

export default function SongCommentsDrawer({ isOpen, onClose, track, onOpenAuthModal }: SongCommentsDrawerProps) {
  const currentUser = AuthService.getCurrentUser();
  const [comments, setComments] = useState<SongComment[]>(PlaylistService.getCommentsForTrack(track.id));
  const [stats, setStats] = useState<SongStats>(PlaylistService.getSongStats(track.id, currentUser?.id));
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setComments(PlaylistService.getCommentsForTrack(track.id));
    setStats(PlaylistService.getSongStats(track.id, currentUser?.id));
  }, [track.id, currentUser?.id, isOpen]);

  useEffect(() => {
    const handleCommentUpdate = () => setComments(PlaylistService.getCommentsForTrack(track.id));
    const handleStatsUpdate = () => setStats(PlaylistService.getSongStats(track.id, currentUser?.id));

    window.addEventListener("song-comments-updated", handleCommentUpdate);
    window.addEventListener("song-stats-updated", handleStatsUpdate);

    return () => {
      window.removeEventListener("song-comments-updated", handleCommentUpdate);
      window.removeEventListener("song-stats-updated", handleStatsUpdate);
    };
  }, [track.id, currentUser?.id]);

  if (!isOpen) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }
    if (!commentText.trim()) return;

    PlaylistService.addComment({
      trackId: track.id,
      userId: currentUser.id,
      username: currentUser.username,
      userDisplayName: currentUser.displayName,
      userAvatar: currentUser.avatar,
      userRole: currentUser.role,
      text: commentText.trim()
    });

    setCommentText("");
  };

  const handleToggleLike = () => {
    if (!currentUser) {
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }
    PlaylistService.toggleLikeSong(track.id, currentUser.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col font-mono text-xs z-10 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-[#0d0d0d] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img src={track.image} alt={track.title} className="h-8 w-8 object-cover border border-white/20 shrink-0" />
            <div className="min-w-0">
              <h3 className="text-xs font-black text-white truncate">{track.title}</h3>
              <p className="text-[10px] text-neutral-400 truncate">{track.artist}</p>
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

        {/* Stats Bar */}
        <div className="px-4 py-3 bg-black border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-bold">
            <button
              type="button"
              onClick={handleToggleLike}
              className={`flex items-center gap-1.5 transition-colors ${
                stats.isLikedByMe ? "text-red-500" : "text-neutral-400 hover:text-white"
              }`}
            >
              <Heart className={`h-4 w-4 ${stats.isLikedByMe ? "fill-current" : ""}`} />
              <span>{stats.likesCount.toLocaleString("tr-TR")} Beğeni</span>
            </button>

            <span className="flex items-center gap-1.5 text-neutral-400">
              <Headphones className="h-4 w-4 text-emerald-400" />
              <span className="text-neutral-200">{stats.totalListens.toLocaleString("tr-TR")} Toplam Dinleme</span>
            </span>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
            ŞARKI YORUMLARI ({comments.length})
          </span>

          {comments.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 font-sans">
              Henüz bu parça hakkında yorum yapılmamış. İlk yorumu sen yap!
            </div>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="border border-white/10 bg-black/60 p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={c.userAvatar} alt={c.userDisplayName} className="h-6 w-6 object-cover border border-white/20 shrink-0" />
                    <span className="text-xs font-bold text-white truncate">{c.userDisplayName}</span>
                    {c.userRole === "admin" && (
                      <span className="px-1 py-0.2 bg-red-600 text-white text-[8px] font-black uppercase">ADMIN</span>
                    )}
                  </div>
                  <span className="text-[9px] text-neutral-500">
                    {new Date(c.createdAt).toLocaleDateString("tr-TR")}
                  </span>
                </div>

                <p className="text-neutral-300 text-xs font-sans leading-relaxed pt-1">
                  {c.text}
                </p>

                {(currentUser?.id === c.userId || currentUser?.role === "admin") && (
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => PlaylistService.deleteComment(c.id, track.id)}
                      className="text-[10px] text-neutral-500 hover:text-red-400 flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> Sil
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        <form onSubmit={handleAddComment} className="p-3 border-t border-white/10 bg-[#0d0d0d] flex gap-2">
          <input
            type="text"
            placeholder={currentUser ? "Şarkı hakkında yorum yaz..." : "Yorum yazmak için giriş yapın..."}
            disabled={!currentUser}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={!currentUser}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase rounded-none px-4 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>

      </div>
    </div>
  );
}
"""

with open("src/components/SongCommentsDrawer.tsx", "w", encoding="utf-8") as f:
    f.write(code)
print("SongCommentsDrawer.tsx written successfully")
