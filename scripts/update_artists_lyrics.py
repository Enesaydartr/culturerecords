import json
import re

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    backup_data = json.load(f)

with open("src/data/artists.ts", "r", encoding="utf-8") as f:
    artists_code = f.read()

# Update each track lyrics in PLAYLIST with the full text from backup
for track_id, item in backup_data.items():
    lyrics_lines = item.get("lyrics", [])
    if not lyrics_lines:
        continue
    
    full_text = "\n".join([line["text"] for line in lyrics_lines])
    
    # Find track block in artists_code
    pattern = rf'(id:\s*"{track_id}",[\s\S]*?lyrics:\s*`)([^`]*)(`)'
    if re.search(pattern, artists_code):
        artists_code = re.sub(pattern, rf'\g<1>{full_text}\g<3>', artists_code)
        print(f"Updated lyrics in artists.ts for {track_id} ({len(lyrics_lines)} lines)")
    else:
        print(f"Track {track_id} not found in artists.ts by regex")

with open("src/data/artists.ts", "w", encoding="utf-8") as f:
    f.write(artists_code)

print("src/data/artists.ts fully updated with complete lyrics!")
