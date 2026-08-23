import json
import subprocess
import os

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

for track_id, item in data.items():
    audio_file = f"public/assets/audio/{track_id}.mp4"
    if not os.path.exists(audio_file):
        audio_file = f"public/assets/audio/{track_id}.mp3"
    if not os.path.exists(audio_file):
        print(f"Track {track_id}: NO AUDIO FILE FOUND")
        continue
    
    # Get audio duration
    cmd = f'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "{audio_file}"'
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    audio_dur = float(res.stdout.strip()) if res.stdout.strip() else 0
    
    lyrics = item.get("lyrics", [])
    if not lyrics:
        continue
    
    first_time = lyrics[0]["time"]
    last_time = lyrics[-1]["time"]
    
    # Check if last_time > audio_dur or if first_time > 15s (indicating trimmed audio)
    is_shifted = (last_time > audio_dur) or (first_time > 15.0)
    print(f"Track: {track_id:22s} | Audio: {audio_dur:6.2f}s | JSON 1st: {first_time:5.2f}s, last: {last_time:6.2f}s | SHIFT NEEDED: {is_shifted} (diff: {first_time:.2f}s)")
