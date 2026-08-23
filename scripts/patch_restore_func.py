with open("src/services/syncedLyricsService.ts", "r", encoding="utf-8") as f:
    content = f.read()

target = """  restoreAllBackupData(backupObj: Record<string, any>): boolean {
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
  },"""

replacement = """  restoreAllBackupData(backupObj: Record<string, any>): boolean {
    try {
      Object.entries(backupObj).forEach(([k, v]) => {
        if (k.startsWith(STORAGE_KEY_PREFIX) || k.startsWith(TRIM_KEY_PREFIX)) {
          localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v));
        } else if (typeof v === "object" && v !== null) {
          // Format from exported JSON: { trackId: { lyrics: [...], trim: {...} } }
          const item = v as any;
          if ("lyrics" in item && Array.isArray(item.lyrics) && item.lyrics.length > 0) {
            localStorage.setItem(STORAGE_KEY_PREFIX + k, JSON.stringify(item.lyrics));
          }
          if ("trim" in item && item.trim) {
            localStorage.setItem(TRIM_KEY_PREFIX + k, JSON.stringify(item.trim));
          }
        }
      });
      window.dispatchEvent(new CustomEvent("synced-lyrics-updated", { detail: {} }));
      return true;
    } catch (e) {
      console.error("restoreAllBackupData failed:", e);
      return false;
    }
  },"""

if target in content:
    content = content.replace(target, replacement)
    print("syncedLyricsService.ts successfully patched!")

with open("src/services/syncedLyricsService.ts", "w", encoding="utf-8") as f:
    f.write(content)
