# Patch WebAudioEngine with getSpectrumData
with open("src/audio/engine.ts", "r", encoding="utf-8") as f:
    engine_c = f.read()

if "getSpectrumData" not in engine_c:
    engine_c = engine_c.replace(
        "public getFrequencyData(): Uint8Array {",
        "public getSpectrumData(): Uint8Array {\n    return this.getFrequencyData();\n  }\n\n  public getFrequencyData(): Uint8Array {"
    )
    with open("src/audio/engine.ts", "w", encoding="utf-8") as f:
        f.write(engine_c)
    print("getSpectrumData added to WebAudioEngine")

# Patch SyncedLyricsService with backup/export methods
with open("src/services/syncedLyricsService.ts", "r", encoding="utf-8") as f:
    lyrics_c = f.read()

target = "shiftTimestamps(lines: SyncedLine[], offsetSec: number): SyncedLine[] {"
replacement = """getAllBackupData(): string {
    const data: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith(STORAGE_KEY_PREFIX) || k.startsWith(TRIM_KEY_PREFIX))) {
        data[k] = localStorage.getItem(k);
      }
    }
    return JSON.stringify(data, null, 2);
  },

  restoreAllBackupData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      Object.entries(parsed).forEach(([k, v]) => {
        localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v));
      });
      window.dispatchEvent(new CustomEvent("synced-lyrics-updated", { detail: {} }));
      return true;
    } catch {
      return false;
    }
  },

  exportLrc(trackId: string, lines: SyncedLine[]): string {
    return lines.map(l => {
      const mins = Math.floor(l.time / 60).toString().padStart(2, "0");
      const secs = Math.floor(l.time % 60).toString().padStart(2, "0");
      const ms = Math.floor((l.time % 1) * 100).toString().padStart(2, "0");
      return `[${mins}:${secs}.${ms}]${l.text}`;
    }).join("\\n");
  },

  shiftTimestamps(lines: SyncedLine[], offsetSec: number): SyncedLine[] {"""

if target in lyrics_c and "getAllBackupData" not in lyrics_c:
    lyrics_c = lyrics_c.replace(target, replacement)
    with open("src/services/syncedLyricsService.ts", "w", encoding="utf-8") as f:
        f.write(lyrics_c)
    print("Backup methods added to SyncedLyricsService")
