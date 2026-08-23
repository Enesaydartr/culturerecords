with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("setDurationSec(dur > 0 ? dur : currentTrack.duration);", "setDurationSec(dur > 0 ? dur : (currentTrack.durationSec || 180));")

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)

with open("src/audio/engine.ts", "r", encoding="utf-8") as f:
    engine_content = f.read()

engine_content = engine_content.replace("this.durationSec = track.durationSec || 180;", "this.durationSec = targetTrack.durationSec || 180;")
engine_content = engine_content.replace("${track.id}", "${targetTrack.id}")

with open("src/audio/engine.ts", "w", encoding="utf-8") as f:
    f.write(engine_content)

print("Both fixes applied")
