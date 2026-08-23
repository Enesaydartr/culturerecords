with open("src/audio/engine.ts", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("""  public startMusic(track?: Track) {
    const targetTrack = track || this.currentTrack;
    if (!targetTrack) return;
    this.currentTrack = targetTrack; {
    this.init();
    this.stopMusic();
    this.currentTrack = track;""", """  public startMusic(track?: Track) {
    const targetTrack = track || this.currentTrack;
    if (!targetTrack) return;
    this.init();
    this.stopMusic();
    this.currentTrack = targetTrack;""")

content = content.replace("this._startSynthFallback(track);", "this._startSynthFallback(targetTrack);")

with open("src/audio/engine.ts", "w", encoding="utf-8") as f:
    f.write(content)
print("engine.ts clean startMusic fixed")
