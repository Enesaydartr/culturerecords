export interface SyncedLine {
  time: number; // in seconds
  text: string;
}

export interface TrackTrim {
  startSec: number;
  endSec: number;
}

const STORAGE_KEY_PREFIX = "eray_mansur_synced_lyrics_";
const TRIM_KEY_PREFIX = "eray_mansur_trim_";

export const SyncedLyricsService = {
  getSyncedLyrics(trackId: string, fallbackLyrics?: string): SyncedLine[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PREFIX + trackId);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }

    if (fallbackLyrics) {
      const lines = fallbackLyrics
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      return lines.map((text, i) => ({
        time: i * 4.5,
        text
      }));
    }

    return [];
  },

  hasCustomSync(trackId: string): boolean {
    try {
      return !!localStorage.getItem(STORAGE_KEY_PREFIX + trackId);
    } catch {
      return false;
    }
  },

  saveSyncedLyrics(trackId: string, lines: SyncedLine[]): boolean {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + trackId, JSON.stringify(lines));
      return true;
    } catch (e) {
      console.error("Failed to save synced lyrics", e);
      return false;
    }
  },

  clearSyncedLyrics(trackId: string): void {
    try {
      localStorage.removeItem(STORAGE_KEY_PREFIX + trackId);
    } catch {
      // ignore
    }
  },

  // Audio Trim Settings
  getTrim(trackId: string): TrackTrim | null {
    try {
      const stored = localStorage.getItem(TRIM_KEY_PREFIX + trackId);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return null;
  },

  saveTrim(trackId: string, trim: TrackTrim): boolean {
    try {
      localStorage.setItem(TRIM_KEY_PREFIX + trackId, JSON.stringify(trim));
      return true;
    } catch (e) {
      console.error("Failed to save trim", e);
      return false;
    }
  },

  clearTrim(trackId: string): void {
    try {
      localStorage.removeItem(TRIM_KEY_PREFIX + trackId);
    } catch {
      // ignore
    }
  },

  // Shift all timestamps by an offset (positive or negative seconds)
  shiftTimestamps(trackId: string, deltaSec: number): SyncedLine[] {
    const lines = this.getSyncedLyrics(trackId);
    const updated = lines.map((l) => ({
      ...l,
      time: Math.max(0, parseFloat((l.time + deltaSec).toFixed(2)))
    }));
    this.saveSyncedLyrics(trackId, updated);
    return updated;
  },

  // Backup All Data to JSON
  getAllBackupData(): Record<string, { lyrics: SyncedLine[]; trim?: TrackTrim }> {
    const backup: Record<string, { lyrics: SyncedLine[]; trim?: TrackTrim }> = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
          const trackId = key.replace(STORAGE_KEY_PREFIX, "");
          const lyrics = JSON.parse(localStorage.getItem(key) || "[]");
          const trim = this.getTrim(trackId) || undefined;
          backup[trackId] = { lyrics, trim };
        }
      }
    } catch (e) {
      console.error("Failed to compile backup", e);
    }
    return backup;
  },

  // Restore All Data from Backup JSON
  restoreAllBackupData(backup: Record<string, { lyrics: SyncedLine[]; trim?: TrackTrim }>): boolean {
    try {
      for (const [trackId, data] of Object.entries(backup)) {
        if (data.lyrics && Array.isArray(data.lyrics)) {
          this.saveSyncedLyrics(trackId, data.lyrics);
        }
        if (data.trim) {
          this.saveTrim(trackId, data.trim);
        }
      }
      return true;
    } catch (e) {
      console.error("Failed to restore backup", e);
      return false;
    }
  },

  parseLrc(lrcText: string): SyncedLine[] {
    const lines = lrcText.split("\n");
    const result: SyncedLine[] = [];
    const timeRegex = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/g;

    for (const rawLine of lines) {
      const text = rawLine.replace(timeRegex, "").trim();
      let match;
      timeRegex.lastIndex = 0;
      while ((match = timeRegex.exec(rawLine)) !== null) {
        const min = parseInt(match[1], 10);
        const sec = parseInt(match[2], 10);
        const ms = match[3] ? parseInt(match[3].padEnd(3, "0"), 10) : 0;
        const totalSec = min * 60 + sec + ms / 1000;
        if (text) {
          result.push({ time: totalSec, text });
        }
      }
    }

    return result.sort((a, b) => a.time - b.time);
  },

  exportLrc(lines: SyncedLine[]): string {
    return lines
      .map((line) => {
        const min = Math.floor(line.time / 60);
        const sec = Math.floor(line.time % 60);
        const ms = Math.floor((line.time % 1) * 100);
        const timeStr = `[${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(ms).padStart(2, "0")}]`;
        return `${timeStr} ${line.text}`;
      })
      .join("\n");
  }
};
