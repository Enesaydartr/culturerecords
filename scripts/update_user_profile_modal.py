code = """import React, { useState, useEffect } from "react";
import { AuthService, UserProfile } from "@/services/authService";
import { PLAYLIST, Track } from "@/data/artists";
import { PlaylistService, UserPlaylist } from "@/services/playlistService";
import { MixService, CommunityMix } from "@/services/mixService";
import { Button } from "@/components/ui/button";
import {
  X,
  User,
  Music,
  ListMusic,
  Disc3,
  Calendar,
  Heart,
  MessageSquare,
  UserPlus,
  UserCheck,
  Play,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  onTrackPlay?: (track: Track) => void;
  onOpenDm?: (targetUser: UserProfile) => void;
}

export default function UserProfileModal({
  isOpen,
  onClose,
  userId,
  onTrackPlay,
  onOpenDm
}: UserProfileModalProps) {
  const currentUser = AuthService.getCurrentUser();
  const [profileUser, setProfileUser] = useState<UserProfile | null>(null);
  const [userPlaylists, setUserPlaylists] = useState<UserPlaylist[]>([]);
  const [userMixes, setUserMixes] = useState<CommunityMix[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const loadUserData = () => {
    if (userId) {
      const u = AuthService.getUserById(userId);
      setProfileUser(u);
      if (u) {
        setUserPlaylists(PlaylistService.getUserPlaylists(u.id));
        setUserMixes(MixService.getUserMixes(u.id));
        setFollowersCount(u.followers?.length || 0);
        setFollowingCount(u.following?.length || 0);
        if (currentUser) {
          setIsFollowing(currentUser.following?.includes(u.id) || false);
        }
      }
    }
  };

  useEffect(() => {
    loadUserData();
  }, [userId, currentUser?.id, isOpen]);

  useEffect(() => {
    const handleProfileUpdate = () => loadUserData();
    window.addEventListener("user-profile-updated", handleProfileUpdate);
    return () => window.removeEventListener("user-profile-updated", handleProfileUpdate);
  }, [userId]);

  if (!isOpen || !profileUser) return null;

  const favTrackObj = PLAYLIST.find((t) => t.id === profileUser.favoriteTrackId);
  const isMe = currentUser?.id === profileUser.id;

  const toggleFollow = () => {
    if (!currentUser) {
      alert("Takip etmek için lütfen önce giriş yapın!");
      return;
    }
    const res = AuthService.toggleFollow(profileUser.id, currentUser.id);
    setIsFollowing(res.isFollowing);
    setFollowersCount(res.targetFollowersCount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 font-mono">
      <div className="relative w-full max-w-xl border border-white/15 bg-[#0a0a0a] shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 hover:bg-white/10 transition-colors"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        {/* User Banner & Avatar */}
        <div className="flex flex-wrap items-center gap-4 border-b border-white/10 pb-6 mb-6">
          <div className="relative h-20 w-20 border border-white/20 overflow-hidden shrink-0 aspect-square">
            <img
              src={profileUser.avatar || "/assets/images/eray_mansur_alliance.jpg"}
              alt={profileUser.displayName}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/images/alliance_cover.jpg";
              }}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white truncate">{profileUser.displayName}</h3>
              {profileUser.role === "admin" && (
                <span className="px-2 py-0.5 bg-red-600/20 border border-red-500/40 text-red-400 text-[10px] font-black uppercase">
                  👑 ADMIN
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-400">@{profileUser.username}</p>
            <p className="text-xs text-neutral-300 font-sans mt-1.5 leading-relaxed">{profileUser.bio}</p>

            {/* Follower / Following Stats */}
            <div className="flex items-center gap-4 text-xs font-bold mt-3">
              <div className="flex items-center gap-1.5 text-white">
                <span className="text-red-500">{followersCount}</span>
                <span className="text-neutral-400 font-normal">Takipçi</span>
              </div>
              <div className="flex items-center gap-1.5 text-white">
                <span className="text-red-500">{followingCount}</span>
                <span className="text-neutral-400 font-normal">Takip Edilen</span>
              </div>
              <div className="text-[10px] text-neutral-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(profileUser.createdAt).toLocaleDateString("tr-TR")}
              </div>
            </div>
          </div>
        </div>

        {/* Actions: Follow / DM */}
        {!isMe && currentUser && (
          <div className="flex gap-3 mb-6">
            <Button
              onClick={toggleFollow}
              size="sm"
              className={`flex-1 font-bold text-xs uppercase rounded-none py-2.5 shadow-md ${
                isFollowing ? "bg-white/10 border border-white/20 text-white hover:bg-red-600/20" : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {isFollowing ? (
                <>
                  <UserCheck className="h-3.5 w-3.5 mr-1.5" /> Takip Ediliyor
                </>
              ) : (
                <>
                  <UserPlus className="h-3.5 w-3.5 mr-1.5" /> Takip Et
                </>
              )}
            </Button>

            {onOpenDm && (
              <Button
                onClick={() => {
                  onClose();
                  onOpenDm(profileUser);
                }}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 font-bold text-xs uppercase rounded-none px-4"
              >
                <MessageSquare className="h-3.5 w-3.5 mr-1.5" /> Mesaj Gönder
              </Button>
            )}
          </div>
        )}

        {/* Pinned Favorite Track */}
        {favTrackObj && (
          <div className="border border-red-500/30 bg-red-950/20 p-3.5 mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img src={favTrackObj.image} alt={favTrackObj.title} className="h-10 w-10 object-cover border border-white/20 shrink-0" />
              <div className="min-w-0">
                <span className="text-[9px] text-red-400 font-bold uppercase tracking-wider block">
                  EN SEVDİĞİ ŞARKI
                </span>
                <p className="text-xs font-bold text-white truncate">{favTrackObj.title} — {favTrackObj.artist}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onTrackPlay && onTrackPlay(favTrackObj)}
              className="p-2 bg-red-600 hover:bg-red-700 text-white shadow-md transition-all shrink-0"
              title="Şarkıyı Çal"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
            </button>
          </div>
        )}

        {/* User's Created Mixes */}
        <div className="space-y-3 mb-6">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block flex items-center gap-1.5">
            <Disc3 className="h-3.5 w-3.5 text-red-500" /> OLUŞTURDUĞU MİXLER ({userMixes.length})
          </span>

          {userMixes.length === 0 ? (
            <p className="text-xs text-neutral-500 font-sans">Henüz paylaşılan bir mix bulunmuyor.</p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {userMixes.map((m) => (
                <div key={m.id} className="p-3 border border-white/10 bg-black/60 flex items-center justify-between gap-3 hover:border-white/30 transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={m.coverImage} alt={m.title} className="h-10 w-10 object-cover border border-white/20 shrink-0 aspect-square" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{m.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5">
                        <span>❤️ {m.likesCount} beğeni</span>
                        <span>🎧 {m.totalListens} dinlenme</span>
                      </div>
                    </div>
                  </div>

                  {m.audioUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        const tr = PLAYLIST.find((t) => m.usedTrackIds.includes(t.id)) || PLAYLIST[0];
                        if (onTrackPlay) onTrackPlay(tr);
                      }}
                      className="p-1.5 bg-white/10 hover:bg-red-600 text-white transition-all shrink-0"
                      title="Miksi Çal"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User's Created Playlists */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block flex items-center gap-1.5">
            <ListMusic className="h-3.5 w-3.5 text-amber-500" /> ÇALMA LİSTELERİ ({userPlaylists.length})
          </span>

          {userPlaylists.length === 0 ? (
            <p className="text-xs text-neutral-500 font-sans">Henüz herkese açık bir çalma listesi oluşturulmamış.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {userPlaylists.map((pl) => (
                <div key={pl.id} className="p-2.5 border border-white/10 bg-black/60 flex items-center gap-2.5">
                  <img src={pl.coverImage} alt={pl.title} className="h-10 w-10 object-cover border border-white/20 shrink-0 aspect-square" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{pl.title}</h4>
                    <p className="text-[10px] text-neutral-400">{pl.trackIds.length} Parça</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
"""

with open("src/components/UserProfileModal.tsx", "w", encoding="utf-8") as f:
    f.write(code)
print("UserProfileModal updated with followers stats and created mixes!")
