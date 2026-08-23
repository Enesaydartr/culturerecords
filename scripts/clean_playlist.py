code = """export interface UserPlaylist {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  isCollaborative: boolean;
  collaboratorIds: string[];
  trackIds: string[];
  likesCount: number;
  createdAt: string;
}

export interface SongComment {
  id: string;
  trackId: string;
  userId: string;
  username: string;
  userDisplayName: string;
  userAvatar: string;
  userRole: "admin" | "user";
  text: string;
  likes: number;
  createdAt: string;
}

export interface SongStats {
  likesCount: number;
  totalListens: number;
  isLikedByMe?: boolean;
}

const PLAYLISTS_STORAGE_KEY = "eray_mansur_playlists_v3";
const SONG_STATS_KEY = "eray_mansur_song_stats_v3";
const SONG_COMMENTS_KEY = "eray_mansur_song_comments_v3";

export const PlaylistService = {
  init(): void {
    try {
      if (!localStorage.getItem(PLAYLISTS_STORAGE_KEY)) {
        localStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify([]));
      }
      if (!localStorage.getItem(SONG_STATS_KEY)) {
        localStorage.setItem(SONG_STATS_KEY, JSON.stringify({}));
      }
      if (!localStorage.getItem(SONG_COMMENTS_KEY)) {
        localStorage.setItem(SONG_COMMENTS_KEY, JSON.stringify([]));
      }
    } catch {
      // ignore
    }
  },

  getAllPlaylists(): UserPlaylist[] {
    this.init();
    try {
      const data = localStorage.getItem(PLAYLISTS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  getPlaylistById(id: string): UserPlaylist | null {
    const list = this.getAllPlaylists();
    return list.find((p) => p.id === id) || null;
  },

  getUserPlaylists(userId: string): UserPlaylist[] {
    const list = this.getAllPlaylists();
    return list.filter((p) => p.ownerId === userId || p.collaboratorIds.includes(userId));
  },

  createPlaylist(data: {
    title: string;
    description?: string;
    coverImage?: string;
    ownerId: string;
    ownerName: string;
    ownerAvatar: string;
    isCollaborative?: boolean;
    initialTrackIds?: string[];
  }): UserPlaylist {
    this.init();
    const newPlaylist: UserPlaylist = {
      id: "pl_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      title: data.title.trim() || "Yeni Çalma Listesi",
      description: data.description?.trim() || "Özel parça seçkisi",
      coverImage: data.coverImage || "/assets/images/alliance_cover.jpg",
      ownerId: data.ownerId,
      ownerName: data.ownerName,
      ownerAvatar: data.ownerAvatar,
      isCollaborative: !!data.isCollaborative,
      collaboratorIds: [],
      trackIds: data.initialTrackIds || [],
      likesCount: 0,
      createdAt: new Date().toISOString()
    };

    const all = this.getAllPlaylists();
    all.unshift(newPlaylist);
    localStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent("playlists-updated"));
    return newPlaylist;
  },

  updatePlaylist(playlistId: string, updates: Partial<UserPlaylist>): boolean {
    const all = this.getAllPlaylists();
    const idx = all.findIndex((p) => p.id === playlistId);
    if (idx === -1) return false;

    all[idx] = { ...all[idx], ...updates };
    localStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent("playlists-updated"));
    return true;
  },

  deletePlaylist(playlistId: string): boolean {
    const all = this.getAllPlaylists();
    const filtered = all.filter((p) => p.id !== playlistId);
    localStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent("playlists-updated"));
    return true;
  },

  addTrackToPlaylist(playlistId: string, trackId: string): boolean {
    const pl = this.getPlaylistById(playlistId);
    if (!pl) return false;
    if (pl.trackIds.includes(trackId)) return true;

    pl.trackIds.push(trackId);
    return this.updatePlaylist(playlistId, { trackIds: pl.trackIds });
  },

  removeTrackFromPlaylist(playlistId: string, trackId: string): boolean {
    const pl = this.getPlaylistById(playlistId);
    if (!pl) return false;
    pl.trackIds = pl.trackIds.filter((id) => id !== trackId);
    return this.updatePlaylist(playlistId, { trackIds: pl.trackIds });
  },

  reorderTracks(playlistId: string, sourceIndex: number, destinationIndex: number): boolean {
    const pl = this.getPlaylistById(playlistId);
    if (!pl) return false;

    const tracks = [...pl.trackIds];
    const [moved] = tracks.splice(sourceIndex, 1);
    tracks.splice(destinationIndex, 0, moved);

    return this.updatePlaylist(playlistId, { trackIds: tracks });
  },

  getSongStats(trackId: string, currentUserId?: string): SongStats {
    this.init();
    try {
      const statsMap: Record<string, SongStats> = JSON.parse(localStorage.getItem(SONG_STATS_KEY) || "{}");
      const stat = statsMap[trackId] || { likesCount: 0, totalListens: 0 };

      let isLiked = false;
      if (currentUserId) {
        const likedUsers: string[] = JSON.parse(localStorage.getItem("eray_song_likes_" + trackId) || "[]");
        isLiked = likedUsers.includes(currentUserId);
      }

      return { ...stat, isLikedByMe: isLiked };
    } catch {
      return { likesCount: 0, totalListens: 0, isLikedByMe: false };
    }
  },

  toggleLikeSong(trackId: string, userId: string): { isLiked: boolean; newLikesCount: number } {
    this.init();
    try {
      const likedUsersKey = "eray_song_likes_" + trackId;
      let likedUsers: string[] = JSON.parse(localStorage.getItem(likedUsersKey) || "[]");
      const isAlreadyLiked = likedUsers.includes(userId);

      const statsMap: Record<string, SongStats> = JSON.parse(localStorage.getItem(SONG_STATS_KEY) || "{}");
      const stat = statsMap[trackId] || { likesCount: 0, totalListens: 0 };

      if (isAlreadyLiked) {
        likedUsers = likedUsers.filter((u) => u !== userId);
        stat.likesCount = Math.max(0, stat.likesCount - 1);
      } else {
        likedUsers.push(userId);
        stat.likesCount += 1;
      }

      localStorage.setItem(likedUsersKey, JSON.stringify(likedUsers));
      statsMap[trackId] = stat;
      localStorage.setItem(SONG_STATS_KEY, JSON.stringify(statsMap));
      window.dispatchEvent(new CustomEvent("song-stats-updated", { detail: { trackId } }));

      return { isLiked: !isAlreadyLiked, newLikesCount: stat.likesCount };
    } catch {
      return { isLiked: true, newLikesCount: 1 };
    }
  },

  incrementFullListen(trackId: string): void {
    this.init();
    try {
      const statsMap: Record<string, SongStats> = JSON.parse(localStorage.getItem(SONG_STATS_KEY) || "{}");
      const stat = statsMap[trackId] || { likesCount: 0, totalListens: 0 };
      stat.totalListens += 1;
      statsMap[trackId] = stat;
      localStorage.setItem(SONG_STATS_KEY, JSON.stringify(statsMap));
      window.dispatchEvent(new CustomEvent("song-stats-updated", { detail: { trackId } }));
    } catch {
      // ignore
    }
  },

  getCommentsForTrack(trackId: string): SongComment[] {
    this.init();
    try {
      const comments: SongComment[] = JSON.parse(localStorage.getItem(SONG_COMMENTS_KEY) || "[]");
      return comments.filter((c) => c.trackId === trackId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch {
      return [];
    }
  },

  addComment(data: {
    trackId: string;
    userId: string;
    username: string;
    userDisplayName: string;
    userAvatar: string;
    userRole: "admin" | "user";
    text: string;
  }): SongComment {
    this.init();
    const newComment: SongComment = {
      id: "com_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      trackId: data.trackId,
      userId: data.userId,
      username: data.username,
      userDisplayName: data.userDisplayName,
      userAvatar: data.userAvatar,
      userRole: data.userRole,
      text: data.text.trim(),
      likes: 0,
      createdAt: new Date().toISOString()
    };

    const comments: SongComment[] = JSON.parse(localStorage.getItem(SONG_COMMENTS_KEY) || "[]");
    comments.unshift(newComment);
    localStorage.setItem(SONG_COMMENTS_KEY, JSON.stringify(comments));
    window.dispatchEvent(new CustomEvent("song-comments-updated", { detail: { trackId: data.trackId } }));
    return newComment;
  },

  deleteComment(commentId: string, trackId: string): boolean {
    const comments: SongComment[] = JSON.parse(localStorage.getItem(SONG_COMMENTS_KEY) || "[]");
    const filtered = comments.filter((c) => c.id !== commentId);
    localStorage.setItem(SONG_COMMENTS_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent("song-comments-updated", { detail: { trackId } }));
    return true;
  }
};
"""

with open("src/services/playlistService.ts", "w", encoding="utf-8") as f:
    f.write(code)
print("playlistService.ts cleaned of fake bots/stats")
