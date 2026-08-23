export interface ChatMessage {
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
export interface MatchmakingQueueEntry {
  userId: string;
  userName: string;
  userAvatar: string;
  trackId: string;
  matchedRoomCode?: string;
  timestamp: number;
}

const MATCHMAKING_QUEUE_KEY = "eray_mansur_matchmaking_queue_v1";

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
    } else if (type === "MATCHMAKING_SIGNAL") {
      window.dispatchEvent(new CustomEvent("matchmaking-updated", { detail: data }));
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

  // MATCHMAKING QUEUE (Wait until another real peer matches with the exact same song)
  getMatchmakingQueue(): MatchmakingQueueEntry[] {
    try {
      const all: MatchmakingQueueEntry[] = JSON.parse(localStorage.getItem(MATCHMAKING_QUEUE_KEY) || "[]");
      const now = Date.now();
      // Keep entries from the last 90 seconds
      return all.filter((e) => now - e.timestamp < 90000);
    } catch {
      return [];
    }
  },

  joinMatchmakingQueue(user: { id: string; name: string; avatar: string }, trackId: string): { status: "matched" | "waiting"; room?: SyncRoom } {
    let queue = this.getMatchmakingQueue();
    // Remove previous entries for this user
    queue = queue.filter((e) => e.userId !== user.id);

    // Look for a peer waiting with the exact same song
    const peer = queue.find((e) => e.trackId === trackId && !e.matchedRoomCode && e.userId !== user.id);

    if (peer) {
      // MATCH FOUND! Create joint sync room
      const code = "MATCH-" + Math.floor(1000 + Math.random() * 9000);
      const matchedRoom: SyncRoom = {
        code,
        name: `${peer.userName} & ${user.name} Özel Eşleşme`,
        hostId: peer.userId,
        hostName: peer.userName,
        currentTrackId: trackId,
        currentTimeSec: 0,
        isPlaying: true,
        listenersCount: 2,
        listeners: [
          { id: peer.userId, name: peer.userName, avatar: peer.userAvatar },
          { id: user.id, name: user.name, avatar: user.avatar }
        ],
        createdAt: new Date().toISOString()
      };

      // Add to rooms
      const allRooms = this.getSyncRooms();
      allRooms.unshift(matchedRoom);
      localStorage.setItem(SYNC_ROOMS_KEY, JSON.stringify(allRooms));

      // Mark both in queue with the matched room code
      peer.matchedRoomCode = code;
      queue = queue.map((e) => (e.userId === peer.userId ? peer : e));
      queue.push({
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        trackId,
        matchedRoomCode: code,
        timestamp: Date.now()
      });
      localStorage.setItem(MATCHMAKING_QUEUE_KEY, JSON.stringify(queue));

      if (liveChannel) {
        liveChannel.postMessage({
          type: "MATCHMAKING_SIGNAL",
          data: { type: "MATCH_FOUND", room: matchedRoom, peerId: peer.userId, matcherId: user.id }
        });
        liveChannel.postMessage({ type: "SYNC_ROOM_UPDATE", data: matchedRoom });
      }

      window.dispatchEvent(new CustomEvent("sync-rooms-updated"));
      window.dispatchEvent(new CustomEvent("matchmaking-updated", { detail: { type: "MATCH_FOUND", room: matchedRoom } }));
      return { status: "matched", room: matchedRoom };
    }

    // No peer yet -> Add to active waiting queue
    queue.push({
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      trackId,
      timestamp: Date.now()
    });
    localStorage.setItem(MATCHMAKING_QUEUE_KEY, JSON.stringify(queue));

    if (liveChannel) {
      liveChannel.postMessage({ type: "MATCHMAKING_SIGNAL", data: { type: "QUEUE_JOINED", userId: user.id, trackId } });
    }

    window.dispatchEvent(new CustomEvent("matchmaking-updated", { detail: { type: "QUEUE_JOINED", userId: user.id, trackId } }));
    return { status: "waiting" };
  },

  leaveMatchmakingQueue(userId: string): void {
    let queue = this.getMatchmakingQueue();
    queue = queue.filter((e) => e.userId !== userId);
    localStorage.setItem(MATCHMAKING_QUEUE_KEY, JSON.stringify(queue));

    if (liveChannel) {
      liveChannel.postMessage({ type: "MATCHMAKING_SIGNAL", data: { type: "QUEUE_LEFT", userId } });
    }
  },

  checkMatchForUser(userId: string, trackId: string): SyncRoom | null {
    const queue = this.getMatchmakingQueue();
    const entry = queue.find((e) => e.userId === userId && e.trackId === trackId);
    if (entry && entry.matchedRoomCode) {
      const rooms = this.getSyncRooms();
      return rooms.find((r) => r.code === entry.matchedRoomCode) || null;
    }
    return null;
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
