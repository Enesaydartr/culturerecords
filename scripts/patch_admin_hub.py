with open("src/components/AdminHub.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("PLAYLIST, Track, ALLBUMS", "PLAYLIST, Track")

with open("src/components/AdminHub.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("AdminHub.tsx import fixed")
