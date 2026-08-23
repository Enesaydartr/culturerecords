with open("src/services/syncedLyricsService.ts", "r", encoding="utf-8") as f:
    c = f.read()

target = """getAllBackupData(): string {
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

  exportLrc(trackId: string, lines: SyncedLine[]): string {"""

replacement = """getAllBackupData(): Record<string, any> {
    const data: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith(STORAGE_KEY_PREFIX) || k.startsWith(TRIM_KEY_PREFIX))) {
        try {
          data[k] = JSON.parse(localStorage.getItem(k) || "");
        } catch {
          data[k] = localStorage.getItem(k);
        }
      }
    }
    return data;
  },

  restoreAllBackupData(backupObj: Record<string, any>): boolean {
    try {
      Object.entries(backupObj).forEach(([k, v]) => {
        if (k.startsWith(STORAGE_KEY_PREFIX) || k.startsWith(TRIM_KEY_PREFIX)) {
          localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v));
        }
      });
      window.dispatchEvent(new CustomEvent("synced-lyrics-updated", { detail: {} }));
      return true;
    } catch {
      return false;
    }
  },

  exportLrc(lines: SyncedLine[]): string {"""

if target in c:
    c = c.replace(target, replacement)
    with open("src/services/syncedLyricsService.ts", "w", encoding="utf-8") as f:
        f.write(c)
    print("Updated SyncedLyricsService types for LyricsStudio")
else:
    print("target not found")
