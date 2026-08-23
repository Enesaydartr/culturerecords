import os

for root, dirs, files in os.walk("src"):
    for file in files:
        if file.endswith((".tsx", ".ts")):
            p = os.path.join(root, file)
            with open(p, "r", encoding="utf-8") as f:
                content = f.read()
            if "Orijinal Frankfurt" in content or "12 Parça" in content:
                print(f"Found in {p}")
