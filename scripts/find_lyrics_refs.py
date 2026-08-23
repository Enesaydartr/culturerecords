import os

for root, dirs, files in os.walk("src"):
    for f in files:
        if f.endswith((".ts", ".tsx")):
            fp = os.path.join(root, f)
            with open(fp, "r", encoding="utf-8") as file:
                content = file.read()
                if "SyncedLyricsService" in content or "lyrics" in content.lower():
                    print("Match in:", fp)
