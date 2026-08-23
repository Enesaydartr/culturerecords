import json
import subprocess
import os

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Analyze all 33 songs
adjusted_data = {}

for track_id, item in data.items():
    audio_path = f"public/assets/audio/{track_id}.mp4"
    if not os.path.exists(audio_path):
        audio_path = f"public/assets/audio/{track_id}.mp3"
    
    lyrics = item.get("lyrics", [])
    if not lyrics:
        adjusted_data[track_id] = item
        continue
    
    first_time = lyrics[0]["time"]
    last_time = lyrics[-1]["time"]
    
    cmd = f'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "{audio_path}"'
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    audio_dur = float(res.stdout.strip()) if res.stdout.strip() else 0
    
    # If the track's first lyric was timestamped > 15s or last_time > audio_dur,
    # the audio file was trimmed at the start!
    # Target: The first line should align with the start of the music in the trimmed audio (e.g. 0.8s to 1.5s).
    if first_time > 15.0 or last_time > audio_dur:
        # Calculate shift
        shift = first_time - 1.0  # Align first line to 1.0s
        print(f"Shifted {track_id:20s} by -{shift:5.2f}s (Old 1st: {first_time:5.2f}s -> New 1st: {first_time - shift:5.2f}s, New last: {last_time - shift:5.2f}s / dur: {audio_dur:5.2f}s)")
        
        new_lyrics = []
        for line in lyrics:
            new_time = max(0.0, round(line["time"] - shift, 2))
            new_lyrics.append({
                "time": new_time,
                "text": line["text"]
            })
        
        adjusted_data[track_id] = {
            "lyrics": new_lyrics,
            "trim": item.get("trim")
        }
    else:
        print(f"Kept    {track_id:20s} as is (1st: {first_time:5.2f}s, last: {last_time:5.2f}s / dur: {audio_dur:5.2f}s)")
        adjusted_data[track_id] = item

print("\nAll tracks processed and aligned with trimmed audio files!")
