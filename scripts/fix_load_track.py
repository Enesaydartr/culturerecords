with open("src/audio/engine.ts", "r", encoding="utf-8") as f:
    content = f.read()

# in loadTrack(track: Track)
content = content.replace("""  public loadTrack(track: Track) {
    this.currentTrack = track;
    this.durationSec = targetTrack.durationSec || 180;
    this.currentTimeSec = 0;
    const audioCandidates = [
      `/assets/audio/${targetTrack.id}.mp4`,
      `/assets/audio/${targetTrack.id}.m4a`,
      `/assets/audio/${targetTrack.id}.mp3`,
      `/assets/audio/${targetTrack.id}.webm`
    ];""", """  public loadTrack(track: Track) {
    this.currentTrack = track;
    this.durationSec = track.durationSec || 180;
    this.currentTimeSec = 0;
    const audioCandidates = [
      `/assets/audio/${track.id}.mp4`,
      `/assets/audio/${track.id}.m4a`,
      `/assets/audio/${track.id}.mp3`,
      `/assets/audio/${track.id}.webm`
    ];""")

with open("src/audio/engine.ts", "w", encoding="utf-8") as f:
    f.write(content)
print("loadTrack restored to track param")
