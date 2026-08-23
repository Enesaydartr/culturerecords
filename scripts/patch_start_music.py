with open("src/audio/engine.ts", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("public startMusic(track: Track)", """public startMusic(track?: Track) {
    const targetTrack = track || this.currentTrack;
    if (!targetTrack) return;
    this.currentTrack = targetTrack;""")

with open("src/audio/engine.ts", "w", encoding="utf-8") as f:
    f.write(content)
print("startMusic made flexible in engine.ts")
