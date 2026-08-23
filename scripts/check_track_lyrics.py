import re

with open("src/data/artists.ts", "r", encoding="utf-8") as f:
    content = f.read()

tracks = re.findall(r'id:\s*"([^"]+)",\s*title:\s*"([^"]+)"', content)
print(f"Found {len(tracks)} tracks:")
for tid, title in tracks:
    has_synced = f'id: "{tid}"' in content and 'syncedLyrics:' in content[content.find(f'id: "{tid}"'):content.find(f'id: "{tid}"') + 1500]
    print(f" - {tid} ({title}): has_synced={has_synced}")
