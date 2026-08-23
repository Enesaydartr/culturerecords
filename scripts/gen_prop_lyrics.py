import json
import re

with open("src/data/artists.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Let us generate the exact proportional synced lyrics for every track in PLAYLIST
# using the exact algorithm from localhost:
# introTime = 7.0, effectiveDuration = max(20, (durationSec || 180) - 12.0), availableTime = max(10, effectiveDuration - introTime), timePerLine = availableTime / max(1, rawLines.length)

# Extract all tracks from PLAYLIST
track_blocks = content.split('id: "')[1:]

proportional_lyrics = {}

for block in track_blocks:
    track_id = block.split('"')[0]
    dur_match = re.search(r'durationSec:\s*(\d+)', block)
    dur_sec = int(dur_match.group(1)) if dur_match else 180
    
    lyrics_match = re.search(r'lyrics:\s*`([^`]+)`', block)
    if not lyrics_match:
        continue
    
    raw_lyrics = lyrics_match.group(1)
    raw_lines = [l.strip() for l in raw_lyrics.split("\n") if len(l.strip()) > 0]
    
    intro_time = 7.0
    effective_dur = max(20, dur_sec - 12.0)
    avail_time = max(10, effective_dur - intro_time)
    time_per_line = avail_time / max(1, len(raw_lines))
    
    lines = []
    for i, text in enumerate(raw_lines):
        calc_time = round((intro_time + i * time_per_line) * 10) / 10
        lines.append({
            "time": calc_time,
            "text": text
        })
    
    proportional_lyrics[track_id] = lines
    print(f"Generated {track_id:20s}: {len(lines)} lines | 1st @ {lines[0]['time']}s, last @ {lines[-1]['time']}s (dur: {dur_sec}s)")

with open("scripts/proportional_lyrics.json", "w", encoding="utf-8") as f:
    json.dump(proportional_lyrics, f, indent=2, ensure_ascii=False)
