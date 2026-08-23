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

const GLOBAL_CHATS_KEY = "eray_mansur_global_chat_v3";
const DMS_STORAGE_KEY = "eray_mansur_dms_v3";
const SYNC_ROOMS_KEY = "eray_mansur_sync_rooms_v3";

// REALTIME BROADCAST CHANNEL (Cross-Tab / Multi-Window Live Network)
const liveChannel = typeof window !== "undefined" && window.BroadcastChannel
  ? new BroadcastChannel("alliance_realtime_network")
  : null;

if (liveChannel) {
  liveChannel.onmessage = (event) => {
    const { type, data } = event.data;
    if (type === "NEW_GLOBAL_MSG") {
      window.dispatchEvent(new CustomEvent("global-chat-updated", { detail: { roomId: data.roomId } }));
    } else if (type === "NEW_DM_MSG") {
      window.dispatchEvent(new CustomEvent("dm-updated", { detail: { recipientId: data.recipientId } }));
    } else if (type === "SYNC_ROOM_UPDATE") {
      window.dispatchEvent(new CustomEvent("sync-rooms-updated", { detail: data }));
    }
  };
}

export const SocialService = {
  init(): void {
    try {
      if (!localStorage.getItem(GLOBAL_CHATS_KEY)) {
        localStorage.setItem(GLOBAL_CHATS_KEY, JSON.stringify([]));
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
      return [];
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

    // Realtime broadcast
    if (liveChannel) {
      liveChannel.postMessage({ type: "NEW_GLOBAL_MSG", data: newMsg });
    }

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

    if (liveChannel) {
      liveChannel.postMessage({ type: "NEW_DM_MSG", data: newMsg });
    }

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

    if (liveChannel) {
      liveChannel.postMessage({ type: "SYNC_ROOM_UPDATE", data: newRoom });
    }

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

      if (liveChannel) {
        liveChannel.postMessage({ type: "SYNC_ROOM_UPDATE", data: room });
      }

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

    if (liveChannel) {
      liveChannel.postMessage({ type: "SYNC_ROOM_UPDATE", data: all[idx] });
    }

    window.dispatchEvent(new CustomEvent("sync-rooms-updated"));
    return true;
  }
};
"""

with open("src/services/socialService.ts", "w", encoding="utf-8") as f:
    f.write(code)
print("socialService.ts real-time BroadcastChannel network ready")
