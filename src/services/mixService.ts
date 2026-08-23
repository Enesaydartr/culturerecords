export interface CommunityMix {
  id: string;
  title: string;
  description: string;
  coverImage: string; // 1:1 format
  audioUrl?: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  usedTrackIds: string[]; // Must contain ERAY067 or MANSUR tracks
  usedArtists: string[];
  likesCount: number;
  totalListens: number;
  commentsCount: number;
  createdAt: string;
}

export interface MixComment {
  id: string;
  mixId: string;
  userId: string;
  username: string;
  userDisplayName: string;
  userAvatar: string;
  text: string;
  createdAt: string;
}

const MIXES_STORAGE_KEY = "eray_mansur_mixes_v3";
const MIX_COMMENTS_KEY = "eray_mansur_mix_comments_v3";

export const MixService = {
  init(): void {
    try {
      if (!localStorage.getItem(MIXES_STORAGE_KEY)) {
        localStorage.setItem(MIXES_STORAGE_KEY, JSON.stringify([]));
      }
    } catch {
      // ignore
    }
  },

  getAllMixes(sortBy: "popular" | "liked" | "newest" = "popular"): CommunityMix[] {
    this.init();
    try {
      const list: CommunityMix[] = JSON.parse(localStorage.getItem(MIXES_STORAGE_KEY) || "[]");

      if (sortBy === "popular") {
        return [...list].sort((a, b) => b.totalListens - a.totalListens);
      } else if (sortBy === "liked") {
        return [...list].sort((a, b) => b.likesCount - a.likesCount);
      } else {
        return [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    } catch {
      return [];
    }
  },

  getMixById(id: string): CommunityMix | null {
    const list = this.getAllMixes();
    return list.find((m) => m.id === id) || null;
  },

  getUserMixes(userId: string): CommunityMix[] {
    const list = this.getAllMixes();
    return list.filter((m) => m.creatorId === userId);
  },

  createMix(data: {
    title: string;
    description?: string;
    coverImage: string; // 1:1 image
    audioUrl?: string;
    creatorId: string;
    creatorName: string;
    creatorAvatar: string;
    usedTrackIds: string[];
    usedArtists: string[];
  }): { success: boolean; error?: string; mix?: CommunityMix } {
    this.init();

    if (!data.title.trim()) {
      return { success: false, error: "Mix başlığı gereklidir." };
    }
    if (!data.usedTrackIds || data.usedTrackIds.length === 0) {
      return { success: false, error: "Mixte en az bir ERAY067 veya MANSUR şarkısı seçilmelidir!" };
    }

    const newMix: CommunityMix = {
      id: "mix_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      title: data.title.trim(),
      description: data.description?.trim() || "Topluluk remixi.",
      coverImage: data.coverImage || "/assets/images/alliance_cover.jpg",
      audioUrl: data.audioUrl || ("/assets/audio/" + data.usedTrackIds[0] + ".mp4"),
      creatorId: data.creatorId,
      creatorName: data.creatorName,
      creatorAvatar: data.creatorAvatar,
      usedTrackIds: data.usedTrackIds,
      usedArtists: data.usedArtists.length > 0 ? data.usedArtists : ["ERAY067", "MANSUR"],
      likesCount: 0,
      totalListens: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString()
    };

    const all = this.getAllMixes("newest");
    all.unshift(newMix);
    localStorage.setItem(MIXES_STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent("mixes-updated"));
    return { success: true, mix: newMix };
  },

  toggleLikeMix(mixId: string, userId: string): { isLiked: boolean; newCount: number } {
    this.init();
    try {
      const likedKey = "eray_mix_like_" + mixId;
      let users: string[] = JSON.parse(localStorage.getItem(likedKey) || "[]");
      const isLiked = users.includes(userId);

      const all = this.getAllMixes();
      const idx = all.findIndex((m) => m.id === mixId);
      if (idx === -1) return { isLiked: false, newCount: 0 };

      if (isLiked) {
        users = users.filter((u) => u !== userId);
        all[idx].likesCount = Math.max(0, all[idx].likesCount - 1);
      } else {
        users.push(userId);
        all[idx].likesCount += 1;
      }

      localStorage.setItem(likedKey, JSON.stringify(users));
      localStorage.setItem(MIXES_STORAGE_KEY, JSON.stringify(all));
      window.dispatchEvent(new CustomEvent("mixes-updated"));
      return { isLiked: !isLiked, newCount: all[idx].likesCount };
    } catch {
      return { isLiked: true, newCount: 1 };
    }
  },

  isMixLikedBy(mixId: string, userId?: string): boolean {
    if (!userId) return false;
    try {
      const users: string[] = JSON.parse(localStorage.getItem("eray_mix_like_" + mixId) || "[]");
      return users.includes(userId);
    } catch {
      return false;
    }
  },

  incrementMixListen(mixId: string): void {
    const all = this.getAllMixes();
    const idx = all.findIndex((m) => m.id === mixId);
    if (idx !== -1) {
      all[idx].totalListens += 1;
      localStorage.setItem(MIXES_STORAGE_KEY, JSON.stringify(all));
      window.dispatchEvent(new CustomEvent("mixes-updated"));
    }
  },

  deleteMix(mixId: string): boolean {
    const all = this.getAllMixes();
    const filtered = all.filter((m) => m.id !== mixId);
    localStorage.setItem(MIXES_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent("mixes-updated"));
    return true;
  }
};
