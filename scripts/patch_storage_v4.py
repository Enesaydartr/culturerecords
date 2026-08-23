with open("src/services/syncedLyricsService.ts", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('const STORAGE_KEY_PREFIX = "eray_mansur_synced_lyrics_";', 'const STORAGE_KEY_PREFIX = "eray_mansur_synced_lyrics_v4_";')
content = content.replace('const TRIM_KEY_PREFIX = "eray_mansur_trim_";', 'const TRIM_KEY_PREFIX = "eray_mansur_trim_v4_";')

with open("src/services/syncedLyricsService.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated storage keys to v4 for instant clean sync cache!")
