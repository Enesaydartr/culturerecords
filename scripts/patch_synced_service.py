code = """import { BUILTIN_SYNCED_LYRICS, BUILTIN_TRIMS } from "@/data/backupLyricsData";

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
  getSyncedLyrics(trackId: string, fallbackLyrics?: string, durationSec: number = 180): SyncedLine[] {
    // 1. Check user custom edits in localStorage
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

    // 2. Check built-in verified backup database (33 tracks)
    if (BUILTIN_SYNCED_LYRICS[trackId] && BUILTIN_SYNCED_LYRICS[trackId].length > 0) {
      return BUILTIN_SYNCED_LYRICS[trackId];
    }

    // 3. Fallback to proportional calculation
    if (fallbackLyrics) {
      const rawLines = fallbackLyrics
        .split("\\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (rawLines.length === 0) return [];

      const introTime = 7.0;
      const effectiveDuration = Math.max(20, (durationSec || 180) - 12.0);
      const availableTime = Math.max(10, effectiveDuration - introTime);
      const timePerLine = availableTime / Math.max(1, rawLines.length);

      return rawLines.map((text, i) => {
        const isHeader = text.startsWith("(") || text.startsWith("[");
        const calcTime = Math.round((introTime + i * timePerLine) * 10) / 10;
        return {
          time: calcTime,
          text: isHeader ? text : text
        };
      });
    }

    return [];
  },

  hasCustomSync(trackId: string): boolean {
    try {
      if (localStorage.getItem(STORAGE_KEY_PREFIX + trackId)) return true;
    } catch {
      // ignore
    }
    return !!(BUILTIN_SYNCED_LYRICS[trackId] && BUILTIN_SYNCED_LYRICS[trackId].length > 0);
  },

  saveSyncedLyrics(trackId: string, lines: SyncedLine[]): boolean {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + trackId, JSON.stringify(lines));
      window.dispatchEvent(new CustomEvent("synced-lyrics-updated", { detail: { trackId } }));
      return true;
    } catch (e) {
      console.error("Failed to save synced lyrics", e);
      return false;
    }
  },

  clearSyncedLyrics(trackId: string): void {
    try {
      localStorage.removeItem(STORAGE_KEY_PREFIX + trackId);
      window.dispatchEvent(new CustomEvent("synced-lyrics-updated", { detail: { trackId } }));
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
    if (BUILTIN_TRIMS[trackId]) {
      return BUILTIN_TRIMS[trackId];
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

  // Export all current lyrics & trims into a backup JSON object
  getAllBackupData(): Record<string, any> {
    const data: Record<string, any> = {};
    
    // First populate from built-in
    Object.keys(BUILTIN_SYNCED_LYRICS).forEach((trackId) => {
      data[trackId] = {
        lyrics: BUILTIN_SYNCED_LYRICS[trackId],
        trim: BUILTIN_TRIMS[trackId] || null
      };
    });

    // Override with any localStorage custom edits
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(STORAGE_KEY_PREFIX)) {
          const trackId = k.replace(STORAGE_KEY_PREFIX, "");
          if (!data[trackId]) data[trackId] = {};
          data[trackId].lyrics = JSON.parse(localStorage.getItem(k) || "[]");
        } else if (k && k.startsWith(TRIM_KEY_PREFIX)) {
          const trackId = k.replace(TRIM_KEY_PREFIX, "");
          if (!data[trackId]) data[trackId] = {};
          data[trackId].trim = JSON.parse(localStorage.getItem(k) || "null");
        }
      }
    } catch {
      // ignore
    }

    return data;
  },

  // Import backup JSON into local storage
  importBackupData(backupJson: Record<string, any>): number {
    let importedCount = 0;
    try {
      Object.keys(backupJson).forEach((trackId) => {
        const item = backupJson[trackId];
        if (item.lyrics && Array.isArray(item.lyrics)) {
          localStorage.setItem(STORAGE_KEY_PREFIX + trackId, JSON.stringify(item.lyrics));
          importedCount++;
        }
        if (item.trim) {
          localStorage.setItem(TRIM_KEY_PREFIX + trackId, JSON.stringify(item.trim));
        }
      });
      window.dispatchEvent(new CustomEvent("synced-lyrics-updated"));
    } catch (e) {
      console.error("Error importing backup lyrics", e);
    }
    return importedCount;
  }
};
"""

with open("src/services/syncedLyricsService.ts", "w", encoding="utf-8") as f:
    f.write(code)

print("syncedLyricsService.ts updated with built-in backup data!")
