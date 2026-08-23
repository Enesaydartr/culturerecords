import json
import re

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    backup_data = json.load(f)

with open("src/data/artists.ts", "r", encoding="utf-8") as f:
    artists_code = f.read()

# Add syncedLyrics to each track in PLAYLIST
for track_id, item in backup_data.items():
    lyrics_lines = item.get("lyrics", [])
    if not lyrics_lines:
        continue
    
    synced_json = json.dumps(lyrics_lines, ensure_ascii=False)
    
    # Check if syncedLyrics already in track
    if f'id: "{track_id}",' in artists_code:
        # Check if already has syncedLyrics
        track_part = artists_code.split(f'id: "{track_id}",')[1].split('},')[0]
        if "syncedLyrics:" not in track_part:
            artists_code = artists_code.replace(
                f'id: "{track_id}",',
                f'id: "{track_id}",\n    syncedLyrics: {synced_json},'
            )
            print(f"Added syncedLyrics to track {track_id}")

with open("src/data/artists.ts", "w", encoding="utf-8") as f:
    f.write(artists_code)

print("PLAYLIST in src/data/artists.ts now has embedded syncedLyrics for all 33 tracks!")
