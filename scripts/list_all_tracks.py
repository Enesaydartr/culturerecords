import re

with open("src/data/artists.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Extract all tracks: id, title, youtubeId
tracks = []
matches = re.findall(r'id:\s*"([^"]+)",\s*title:\s*"([^"]+)",[\s\S]*?youtubeId:\s*"([^"]+)"', text)
for m in matches:
    tracks.append({"id": m[0], "title": m[1], "youtubeId": m[2]})

print(f"Found {len(tracks)} tracks in artists.ts:")
for t in tracks:
    print(f"  {t['id']}: {t['title']} -> {t['youtubeId']}")
