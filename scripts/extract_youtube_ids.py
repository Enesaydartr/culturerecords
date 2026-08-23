import json
import re

with open("src/data/artists.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Extract PLAYLIST tracks
matches = re.findall(r'id:\s*"([^"]+)",\s*title:\s*"([^"]+)"[\s\S]*?youtubeId:\s*"([^"]+)"', content)
print(f"Found {len(matches)} tracks with youtubeId in PLAYLIST:")

tracks_info = {}
for track_id, title, ytid in matches:
    url = f"https://www.youtube.com/watch?v={ytid}"
    tracks_info[track_id] = {
        "title": title,
        "youtubeId": ytid,
        "url": url
    }
    print(f"- {track_id:20s} | {ytid} | {title}")

with open("scripts/tracks_youtube_map.json", "w", encoding="utf-8") as f:
    json.dump(tracks_info, f, indent=2, ensure_ascii=False)
