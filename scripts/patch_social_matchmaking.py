with open("src/services/socialService.ts", "r", encoding="utf-8") as f:
    content = f.read()

matchmaking_code = """export interface MatchmakingQueueEntry {
  userId: string;
  userName: string;
  userAvatar: string;
  trackId: string;
  matchedRoomCode?: string;
  timestamp: number;
}

const MATCHMAKING_QUEUE_KEY = "eray_mansur_matchmaking_queue_v1";
"""

if "MATCHMAKING_QUEUE_KEY" not in content:
    content = content.replace("const SYNC_ROOMS_KEY = \"eray_mansur_sync_rooms_v3\";\n", "const SYNC_ROOMS_KEY = \"eray_mansur_sync_rooms_v3\";\n" + matchmaking_code)

# Add listener in liveChannel
channel_listener = """    } else if (type === "SYNC_ROOM_UPDATE") {
      window.dispatchEvent(new CustomEvent("sync-rooms-updated", { detail: data }));
    } else if (type === "MATCHMAKING_SIGNAL") {
      window.dispatchEvent(new CustomEvent("matchmaking-updated", { detail: data }));
    }"""

content = content.replace("""    } else if (type === "SYNC_ROOM_UPDATE") {
      window.dispatchEvent(new CustomEvent("sync-rooms-updated", { detail: data }));
    }""", channel_listener)

# Add methods to SocialService
service_methods = """  // MATCHMAKING QUEUE (Wait until another real peer matches with the exact same song)
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
"""

content = content.replace("  updateRoomState(code: string, updates: Partial<SyncRoom>): boolean {", service_methods + "\n  updateRoomState(code: string, updates: Partial<SyncRoom>): boolean {")

with open("src/services/socialService.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("socialService.ts updated with matchmaking queue & real-time pair sync!")
