with open("src/data/artists.ts", "r", encoding="utf-8") as f:
    content = f.read()

import re
track_ids = re.findall(r'id:\s*"([^"]+)"', content)
print("Found IDs in artists.ts:", track_ids)
