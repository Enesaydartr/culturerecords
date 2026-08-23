import os

for root, dirs, files in os.walk("."):
    if "node_modules" in root or ".git" in root or ".gemini" in root:
        continue
    for f in files:
        if f.endswith((".ts", ".js", ".json", ".py", ".html")):
            path = os.path.join(root, f)
            try:
                with open(path, "r", encoding="utf-8") as file:
                    txt = file.read()
                    if "/api/audio/trim" in txt or "ffmpeg" in txt.lower():
                        print(f"Found in {path}")
            except Exception:
                pass
