with open("src/services/syncedLyricsService.ts", "r", encoding="utf-8") as f:
    content = f.read()

target_func = """  getSyncedLyrics(trackId: string, fallbackLyrics?: string, durationSec: number = 180): SyncedLine[] {
    // 1. Check user custom edits in localStorage (localhost edits)
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

    // 2. Exact built-in database (Matches localhost 100% on every public / mobile device)
    if (BUILTIN_SYNCED_LYRICS[trackId] && BUILTIN_SYNCED_LYRICS[trackId].length > 0) {
      return BUILTIN_SYNCED_LYRICS[trackId];
    }"""

replacement_func = """  getSyncedLyrics(trackId: string, fallbackLyrics?: string, durationSec: number = 180, embeddedSyncedLyrics?: SyncedLine[]): SyncedLine[] {
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

    // 2. Check embedded in track or built-in verified backup database (33 tracks)
    if (embeddedSyncedLyrics && embeddedSyncedLyrics.length > 0) {
      return embeddedSyncedLyrics;
    }
    if (BUILTIN_SYNCED_LYRICS[trackId] && BUILTIN_SYNCED_LYRICS[trackId].length > 0) {
      return BUILTIN_SYNCED_LYRICS[trackId];
    }"""

if target_func in content:
    content = content.replace(target_func, replacement_func)
    print("syncedLyricsService.ts updated!")

with open("src/services/syncedLyricsService.ts", "w", encoding="utf-8") as f:
    f.write(content)

# Now update App.tsx
with open("src/App.tsx", "r", encoding="utf-8") as f:
    app_code = f.read()

app_code = app_code.replace(
    "return SyncedLyricsService.getSyncedLyrics(currentTrack.id, currentTrack.lyrics);",
    "return SyncedLyricsService.getSyncedLyrics(currentTrack.id, currentTrack.lyrics, currentTrack.durationSec, currentTrack.syncedLyrics);"
)
app_code = app_code.replace(
    "[currentTrack.id, currentTrack.lyrics, syncedVersion]",
    "[currentTrack.id, currentTrack.lyrics, currentTrack.syncedLyrics, currentTrack.durationSec, syncedVersion]"
)

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(app_code)

print("App.tsx updated to pass embeddedSyncedLyrics!")
