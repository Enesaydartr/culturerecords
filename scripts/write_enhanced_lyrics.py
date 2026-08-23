lyrics_service_code = """export interface SyncedLine {
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
      const rawLines = fallbackLyrics
        .split("\\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (rawLines.length === 0) return [];

      // Proportional timing across total song duration
      const introTime = 7.0; // standard drill/trap intro
      const effectiveDuration = Math.max(20, (durationSec || 180) - 12.0); // leave 12s outro
      const availableTime = Math.max(10, effectiveDuration - introTime);
      const timePerLine = availableTime / Math.max(1, rawLines.length);

      return rawLines.map((text, i) => {
        // Tag markers like (Nakarat), (Giriş) get small pause offset
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
      return !!localStorage.getItem(STORAGE_KEY_PREFIX + trackId);
    } catch {
      return false;
    }
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
  shiftTimestamps(lines: SyncedLine[], offsetSec: number): SyncedLine[] {
    return lines.map((line) => ({
      ...line,
      time: Math.max(0, Math.round((line.time + offsetSec) * 10) / 10)
    }));
  }
};
"""

with open("src/services/syncedLyricsService.ts", "w", encoding="utf-8") as f:
    f.write(lyrics_service_code)

print("Enhanced syncedLyricsService.ts written successfully!")
