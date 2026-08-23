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

const PLAYLISTS_STORAGE_KEY = "eray_mansur_playlists_v2";
const SONG_STATS_KEY = "eray_mansur_song_stats_v2";
const SONG_COMMENTS_KEY = "eray_mansur_song_comments_v2";

const DEFAULT_PLAYLISTS: UserPlaylist[] = [
  {
    id: "pl_drill_favorites",
    title: "GERMAN DRILL & SOKAK ENERJİSİ",
    description: "ERAY067 ve MANSUR'un en sert beatleri ve drill başyapıtları.",
    coverImage: "/assets/images/alliance_cover.jpg",
    ownerId: "user_enes_admin",
    ownerName: "Enes",
    ownerAvatar: "/assets/images/eray_mansur_alliance.jpg",
    isCollaborative: true,
    collaboratorIds: ["user_eray067", "user_mansur"],
    trackIds: ["g_wagon", "brapap", "nafile", "tmax", "balmain"],
    likesCount: 1420,
    createdAt: "2026-01-10T12:00:00.000Z"
  },
  {
    id: "pl_night_drive",
    title: "GECE SÜRÜŞÜ // ALLIANCE FLOW",
    description: "02:00 otoban akışı için özenle seçilmiş ERAY067 × MANSUR parçaları.",
    coverImage: "/assets/images/eray067_portrait.jpg",
    ownerId: "user_eray067",
    ownerName: "ERAY067",
    ownerAvatar: "/assets/images/eray067_portrait.jpg",
    isCollaborative: false,
    collaboratorIds: [],
    trackIds: ["bak_ne_dicem", "bilezik_pirlanta", "nafile", "outro"],
    likesCount: 980,
    createdAt: "2026-01-15T15:30:00.000Z"
  }
];

const DEFAULT_STATS: Record<string, SongStats> = {
  bak_ne_dicem: { likesCount: 34200, totalListens: 2840000 },
  nafile: { likesCount: 48900, totalListens: 4120000 },
  g_wagon: { likesCount: 65100, totalListens: 5800000 },
  brapap: { likesCount: 29800, totalListens: 2300000 },
  tmax: { likesCount: 31200, totalListens: 2650000 },
  bilezik_pirlanta: { likesCount: 24500, totalListens: 1980000 },
  sofi: { likesCount: 19800, totalListens: 1620000 },
  balmain: { likesCount: 27600, totalListens: 2190000 },
  outro: { likesCount: 18400, totalListens: 1450000 },
  alisamadim: { likesCount: 22100, totalListens: 1780000 },
  yazik_sana: { likesCount: 26700, totalListens: 2050000 },
  gucum_yok: { likesCount: 35600, totalListens: 3100000 },
  aktiv: { likesCount: 18900, totalListens: 1540000 },
  aktiv2: { likesCount: 21300, totalListens: 1820000 },
  anne: { likesCount: 28400, totalListens: 2490000 },
  azdan_az_coktan_cok: { likesCount: 19500, totalListens: 1610000 }
};

const DEFAULT_COMMENTS: SongComment[] = [
  {
    id: "com_1",
    trackId: "bak_ne_dicem",
    userId: "user_eray067",
    username: "eray067",
    userDisplayName: "ERAY067",
    userAvatar: "/assets/images/eray067_portrait.jpg",
    userRole: "admin",
    text: "Konserlerde hep bir ağızdan söyleyeceğimiz parça bu! Balıkesir hazır mısınız?!",
    likes: 312,
    createdAt: "2026-02-01T14:00:00.000Z"
  },
  {
    id: "com_2",
    trackId: "bak_ne_dicem",
    userId: "user_mansur",
    username: "mansur",
    userDisplayName: "MANSUR",
    userAvatar: "/assets/images/mansur_portrait.jpg",
    userRole: "admin",
    text: "Beatin baslarını kulaklıkla dinleyin, sokak titreyecek.",
    likes: 240,
    createdAt: "2026-02-01T15:20:00.000Z"
  },
  {
    id: "com_3",
    trackId: "nafile",
    userId: "user_fan1",
    username: "drill_turk",
    userDisplayName: "Can Drill",
    userAvatar: "/assets/images/alliance_cover.jpg",
    userRole: "user",
    text: "Kliple beraber dinleyince tüyler diken diken oluyor, 2026 yılının en sağlam drill marşı!",
    likes: 88,
    createdAt: "2026-02-12T19:45:00.000Z"
  }
];

export const PlaylistService = {
  init(): void {
    try {
      if (!localStorage.getItem(PLAYLISTS_STORAGE_KEY)) {
        localStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(DEFAULT_PLAYLISTS));
      }
      if (!localStorage.getItem(SONG_STATS_KEY)) {
        localStorage.setItem(SONG_STATS_KEY, JSON.stringify(DEFAULT_STATS));
      }
      if (!localStorage.getItem(SONG_COMMENTS_KEY)) {
        localStorage.setItem(SONG_COMMENTS_KEY, JSON.stringify(DEFAULT_COMMENTS));
      }
    } catch {
      // ignore
    }
  },

  getAllPlaylists(): UserPlaylist[] {
    this.init();
    try {
      const data = localStorage.getItem(PLAYLISTS_STORAGE_KEY);
      return data ? JSON.parse(data) : DEFAULT_PLAYLISTS;
    } catch {
      return DEFAULT_PLAYLISTS;
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
      description: data.description?.trim() || "ERAY067 × MANSUR özel seçkisi",
      coverImage: data.coverImage || "/assets/images/alliance_cover.jpg",
      ownerId: data.ownerId,
      ownerName: data.ownerName,
      ownerAvatar: data.ownerAvatar,
      isCollaborative: !!data.isCollaborative,
      collaboratorIds: [],
      trackIds: data.initialTrackIds || [],
      likesCount: 1,
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

  // SÜRÜKLE-BIRAK SIRALAMA
  reorderTracks(playlistId: string, sourceIndex: number, destinationIndex: number): boolean {
    const pl = this.getPlaylistById(playlistId);
    if (!pl) return false;

    const tracks = [...pl.trackIds];
    const [moved] = tracks.splice(sourceIndex, 1);
    tracks.splice(destinationIndex, 0, moved);

    return this.updatePlaylist(playlistId, { trackIds: tracks });
  },

  // SONG STATS
  getSongStats(trackId: string, currentUserId?: string): SongStats {
    this.init();
    try {
      const statsMap: Record<string, SongStats> = JSON.parse(localStorage.getItem(SONG_STATS_KEY) || "{}");
      const stat = statsMap[trackId] || { likesCount: 1500, totalListens: 250000 };

      let isLiked = false;
      if (currentUserId) {
        const likedUsers: string[] = JSON.parse(localStorage.getItem("eray_song_likes_" + trackId) || "[]");
        isLiked = likedUsers.includes(currentUserId);
      }

      return { ...stat, isLikedByMe: isLiked };
    } catch {
      return { likesCount: 1500, totalListens: 250000, isLikedByMe: false };
    }
  },

  toggleLikeSong(trackId: string, userId: string): { isLiked: boolean; newLikesCount: number } {
    this.init();
    try {
      const likedUsersKey = "eray_song_likes_" + trackId;
      let likedUsers: string[] = JSON.parse(localStorage.getItem(likedUsersKey) || "[]");
      const isAlreadyLiked = likedUsers.includes(userId);

      const statsMap: Record<string, SongStats> = JSON.parse(localStorage.getItem(SONG_STATS_KEY) || "{}");
      const stat = statsMap[trackId] || { likesCount: 1500, totalListens: 250000 };

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
      return { isLiked: true, newLikesCount: 1500 };
    }
  },

  incrementFullListen(trackId: string): void {
    this.init();
    try {
      const statsMap: Record<string, SongStats> = JSON.parse(localStorage.getItem(SONG_STATS_KEY) || "{}");
      const stat = statsMap[trackId] || { likesCount: 1500, totalListens: 250000 };
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
print("playlistService.ts written successfully")
