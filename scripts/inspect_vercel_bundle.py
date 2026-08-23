import re

with open("scripts/vercel_bundle.js", "r", encoding="utf-8") as f:
    js = f.read()

print("JS bundle length:", len(js))

# Search for storage key prefixes
storage_keys = set(re.findall(r'["\']([a-zA-Z0-9_-]*(?:lyrics|trim|eray|mansur)[a-zA-Z0-9_-]*)["\']', js))
print("Storage / Identifier keys matching pattern in Vercel bundle:")
for k in sorted(storage_keys):
    print(" -", k)

# Search for getSyncedLyrics or similar in js
idx = js.find("getSyncedLyrics")
if idx != -1:
    snippet = js[max(0, idx - 100):min(len(js), idx + 800)]
    print("\nSnippet around getSyncedLyrics:")
    print(snippet)

# Search for WebAudioEngine / audioEl in js
idx_audio = js.find("audioEl")
if idx_audio != -1:
    snippet_audio = js[max(0, idx_audio - 100):min(len(js), idx_audio + 800)]
    print("\nSnippet around audioEl:")
    print(snippet_audio)
