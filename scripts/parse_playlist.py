with open("src/data/artists.ts", "r", encoding="utf-8") as f:
    text = f.read()

import json
import re

# Find occurrences of id: "..." in PLAYLIST
playlist_section = text[text.find("export const PLAYLIST"):text.find("export const ARTISTS")]

# Find all track objects
ids = re.findall(r'id:\s*"([^"]+)"', playlist_section)
titles = re.findall(r'title:\s*"([^"]+)"', playlist_section)
artists = re.findall(r'artist:\s*"([^"]+)"', playlist_section)

print(f"Total IDs: {len(ids)}, Titles: {len(titles)}, Artists: {len(artists)}")
for i in range(min(len(ids), len(titles))):
    print(f"{i+1}. id={ids[i]} | title={titles[i]}")
