with open("src/App.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "Character3D" in line or "Showcase" in line or "Canvas" in line:
        print(f"Line {i+1}: {line.strip()}")
