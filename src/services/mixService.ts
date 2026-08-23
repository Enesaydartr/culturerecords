import { Track, PLAYLIST } from "../data/artists";
import { AudioStorageService } from "./audioStorageService";

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

const DEFAULT_SAMPLE_MIXES: CommunityMix[] = [
  {
    id: "mix_preset_1",
    title: "ALLIANCE Drill Mashup (Club Edit)",
    description: "bak ne dicem & aktiv2 özel geçiş ve drop remixi.",
    coverImage: "/assets/images/alliance_cover.jpg",
    audioUrl: "/assets/audio/bak_ne_dicem.mp4",
    creatorId: "user_eray067",
    creatorName: "DJ Alliance",
    creatorAvatar: "/assets/images/eray067_avatar.jpg",
    usedTrackIds: ["bak_ne_dicem", "aktiv2"],
    usedArtists: ["ERAY067", "MANSUR"],
    likesCount: 142,
    totalListens: 1850,
    commentsCount: 12,
    createdAt: "2026-08-20T14:00:00.000Z"
  },
  {
    id: "mix_preset_2",
    title: "NAFİLE x SOFİ Slowed + Reverb",
    description: "Gece sürüşü için Malatya & Ankara trap atmosferi.",
    coverImage: "/assets/images/mansur_portrait.jpg",
    audioUrl: "/assets/audio/nafile.mp4",
    creatorId: "user_mansur",
    creatorName: "SoundLab TR",
    creatorAvatar: "/assets/images/mansur_avatar.jpg",
    usedTrackIds: ["nafile", "sofi"],
    usedArtists: ["MANSUR"],
    likesCount: 98,
    totalListens: 1230,
    commentsCount: 8,
    createdAt: "2026-08-21T18:30:00.000Z"
  }
];

export const MixService = {
  init(): void {
    try {
      const stored = localStorage.getItem(MIXES_STORAGE_KEY);
      if (!stored || JSON.parse(stored).length === 0) {
        localStorage.setItem(MIXES_STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLE_MIXES));
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

  async deleteMix(mixId: string): Promise<boolean> {
    const all = this.getAllMixes();
    const filtered = all.filter((m) => m.id !== mixId);
    localStorage.setItem(MIXES_STORAGE_KEY, JSON.stringify(filtered));
    try {
      await AudioStorageService.deleteMixAudio(mixId);
    } catch {}
    window.dispatchEvent(new CustomEvent("mixes-updated"));
    return true;
  },

  /**
   * Resolve and generate a full playable Track object from a CommunityMix,
   * checking IndexedDB for uploaded custom audio first.
   */
  async getPlayableTrackForMix(m: CommunityMix): Promise<Track> {
    let audioSrc = m.audioUrl;
    try {
      const idbUrl = await AudioStorageService.getMixAudioUrl(m.id);
      if (idbUrl) {
        audioSrc = idbUrl;
      }
    } catch (e) {
      console.warn("[MixService] Error getting audio from storage:", e);
    }

    if (!audioSrc && m.usedTrackIds.length > 0) {
      audioSrc = `/assets/audio/${m.usedTrackIds[0]}.mp4`;
    }

    const firstTrack = m.usedTrackIds.length > 0 ? PLAYLIST.find((t) => t.id === m.usedTrackIds[0]) : null;

    const mixTrack: Track = {
      id: m.id,
      title: m.title,
      artist: `${m.creatorName} (Remix)`,
      album: "Topluluk Miksleri",
      duration: firstTrack?.duration || "3:00",
      currentTime: "00:00",
      progress: 0,
      durationSec: firstTrack?.durationSec || 180,
      bpm: firstTrack?.bpm || 140,
      key: firstTrack?.key || "Auto",
      genre: "Community Remix",
      producers: m.creatorName,
      mixMaster: "Alliance Community",
      badge: "TOPLULUK MİKSİ",
      category: "all",
      releaseDate: new Date(m.createdAt).toISOString().slice(0, 10),
      releaseYear: 2026,
      image: m.coverImage || "/assets/images/alliance_cover.jpg",
      spotifyUrl: firstTrack?.spotifyUrl || "",
      embedUrl: firstTrack?.embedUrl || "",
      youtubeId: firstTrack?.youtubeId || "",
      lyrics: `[00:00.00] 🎧 ${m.title} (Topluluk Miksi)\n[00:04.00] 👤 Remixer: ${m.creatorName}\n[00:08.00] ⚡ Alliance Records & Culture Sound\n[00:12.00] 💬 ${m.description || "Keyifli Dinlemeler!"}`,
      audioUrl: audioSrc,
      customAudioUrl: audioSrc,
      isMix: true
    };

    return mixTrack;
  }
};
