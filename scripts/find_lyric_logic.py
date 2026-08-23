with open("src/App.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if "currentSyncedLyrics" in l or "activeLyricIndex" in l:
        print(f"Line {i+1}: {l.strip()}")
