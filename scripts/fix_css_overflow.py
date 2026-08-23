with open("src/index.css", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("overflow-x: hidden;", "overflow-x: clip;")

with open("src/index.css", "w", encoding="utf-8") as f:
    f.write(content)

print("index.css fixed: overflow-x changed to clip to preserve sticky scrolling on mobile!")
