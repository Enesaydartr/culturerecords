code = """export interface ChatMessage {
  id: string;
  roomId?: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: "admin" | "user";
  recipientId?: string;
  text?: string;
  imageUrl?: string;
  trackId?: string;
  trackTitle?: string;
  createdAt: string;
}

export interface SyncRoom {
  code: string; // e.g. "ALLIANCE-7840"
  name: string;
  hostId: string;
  hostName: string;
  currentTrackId: string;
  currentTimeSec: number;
  isPlaying: boolean;
  listenersCount: number;
  listeners: Array<{ id: string; name: string; avatar: string }>;
  createdAt: string;
}

const GLOBAL_CHATS_KEY = "eray_mansur_global_chat_v2";
const DMS_STORAGE_KEY = "eray_mansur_dms_v2";
const SYNC_ROOMS_KEY = "eray_mansur_sync_rooms_v2";

const SEED_GLOBAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg_1",
    roomId: "general",
    senderId: "user_enes_admin",
    senderName: "Enes (Admin)",
    senderAvatar: "/assets/images/eray_mansur_alliance.jpg",
    senderRole: "admin",
    text: "Alliance topluluğuna hoş geldiniz! Turne biletleri ve yeni mixlerinizi buradan paylaşabilirsiniz.",
    createdAt: "2026-02-20T10:00:00.000Z"
  },
  {
    id: "msg_2",
    roomId: "general",
    senderId: "user_eray067",
    senderName: "ERAY067",
    senderAvatar: "/assets/images/eray067_portrait.jpg",
    senderRole: "admin",
    text: "Balıkesir Holly Stone için hazır mıyız gençler? Sahnede görüşürüz!",
    createdAt: "2026-02-21T14:30:00.000Z"
  },
  {
    id: "msg_3",
    roomId: "general",
    senderId: "user_fan1",
    senderName: "Can Drill",
    senderAvatar: "/assets/images/alliance_cover.jpg",
    senderRole: "user",
    text: "En ön sıradan yerimizi ayırdık bile krallar 🔥",
    trackId: "g_wagon",
    trackTitle: "G WAGON — ERAY067",
    createdAt: "2026-02-21T15:10:00.000Z"
  }
];

export const SocialService = {
  init(): void {
    try {
      if (!localStorage.getItem(GLOBAL_CHATS_KEY)) {
        localStorage.setItem(GLOBAL_CHATS_KEY, JSON.stringify(SEED_GLOBAL_MESSAGES));
      }
    } catch {
      // ignore
    }
  },

  getGlobalMessages(roomId: string = "general"): ChatMessage[] {
    this.init();
    try {
      const all: ChatMessage[] = JSON.parse(localStorage.getItem(GLOBAL_CHATS_KEY) || "[]");
      return all.filter((m) => m.roomId === roomId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } catch {
      return SEED_GLOBAL_MESSAGES;
    }
  },

  sendGlobalMessage(data: {
    roomId: string;
    senderId: string;
    senderName: string;
    senderAvatar: string;
    senderRole: "admin" | "user";
    text?: string;
    imageUrl?: string;
    trackId?: string;
    trackTitle?: string;
  }): ChatMessage {
    this.init();
    const newMsg: ChatMessage = {
      id: "gmsg_" + Date.now(),
      roomId: data.roomId,
      senderId: data.senderId,
      senderName: data.senderName,
      senderAvatar: data.senderAvatar,
      senderRole: data.senderRole,
      text: data.text?.trim(),
      imageUrl: data.imageUrl,
      trackId: data.trackId,
      trackTitle: data.trackTitle,
      createdAt: new Date().toISOString()
    };

    const all: ChatMessage[] = JSON.parse(localStorage.getItem(GLOBAL_CHATS_KEY) || "[]");
    all.push(newMsg);
    localStorage.setItem(GLOBAL_CHATS_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent("global-chat-updated", { detail: { roomId: data.roomId } }));
    return newMsg;
  },

  getDirectMessages(user1Id: string, user2Id: string): ChatMessage[] {
    try {
      const all: ChatMessage[] = JSON.parse(localStorage.getItem(DMS_STORAGE_KEY) || "[]");
      return all.filter(
        (m) =>
          (m.senderId === user1Id && m.recipientId === user2Id) ||
          (m.senderId === user2Id && m.recipientId === user1Id)
      ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } catch {
      return [];
    }
  },

  sendDirectMessage(data: {
    senderId: string;
    senderName: string;
    senderAvatar: string;
    senderRole: "admin" | "user";
    recipientId: string;
    text?: string;
    imageUrl?: string;
    trackId?: string;
    trackTitle?: string;
  }): ChatMessage {
    const newMsg: ChatMessage = {
      id: "dm_" + Date.now(),
      senderId: data.senderId,
      senderName: data.senderName,
      senderAvatar: data.senderAvatar,
      senderRole: data.senderRole,
      recipientId: data.recipientId,
      text: data.text?.trim(),
      imageUrl: data.imageUrl,
      trackId: data.trackId,
      trackTitle: data.trackTitle,
      createdAt: new Date().toISOString()
    };

    const all: ChatMessage[] = JSON.parse(localStorage.getItem(DMS_STORAGE_KEY) || "[]");
    all.push(newMsg);
    localStorage.setItem(DMS_STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent("dm-updated", { detail: { recipientId: data.recipientId } }));
    return newMsg;
  },

  getSyncRooms(): SyncRoom[] {
    try {
      return JSON.parse(localStorage.getItem(SYNC_ROOMS_KEY) || "[]");
    } catch {
      return [];
    }
  },

  createSyncRoom(hostUser: { id: string; name: string; avatar: string }, trackId: string = "bak_ne_dicem"): SyncRoom {
    const code = "ALLIANCE-" + Math.floor(1000 + Math.random() * 9000);
    const newRoom: SyncRoom = {
      code,
      name: hostUser.name + " Dinleme Odası",
      hostId: hostUser.id,
      hostName: hostUser.name,
      currentTrackId: trackId,
      currentTimeSec: 0,
      isPlaying: true,
      listenersCount: 1,
      listeners: [hostUser],
      createdAt: new Date().toISOString()
    };

    const all = this.getSyncRooms();
    all.unshift(newRoom);
    localStorage.setItem(SYNC_ROOMS_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent("sync-rooms-updated"));
    return newRoom;
  },

  joinSyncRoom(code: string, user: { id: string; name: string; avatar: string }): SyncRoom | null {
    const all = this.getSyncRooms();
    const idx = all.findIndex((r) => r.code.toUpperCase() === code.trim().toUpperCase());
    if (idx === -1) return null;

    const room = all[idx];
    if (!room.listeners.some((l) => l.id === user.id)) {
      room.listeners.push(user);
      room.listenersCount = room.listeners.length;
      all[idx] = room;
      localStorage.setItem(SYNC_ROOMS_KEY, JSON.stringify(all));
      window.dispatchEvent(new CustomEvent("sync-rooms-updated"));
    }
    return room;
  },

  updateRoomState(code: string, updates: Partial<SyncRoom>): boolean {
    const all = this.getSyncRooms();
    const idx = all.findIndex((r) => r.code === code);
    if (idx === -1) return false;

    all[idx] = { ...all[idx], ...updates };
    localStorage.setItem(SYNC_ROOMS_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent("sync-rooms-updated"));
    return true;
  }
};
"""

with open("src/services/socialService.ts", "w", encoding="utf-8") as f:
    f.write(code)
print("socialService.ts written successfully")
