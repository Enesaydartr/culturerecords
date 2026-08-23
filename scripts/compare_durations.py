import json
import os
import glob
import cv2

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

audio_files = glob.glob("public/assets/audio/*.*")
print(f"Found {len(audio_files)} audio files in public/assets/audio/")

for f in audio_files:
    track_id = os.path.splitext(os.path.basename(f))[0]
    # Check duration with cv2 VideoCapture or ffprobe
    cap = cv2.VideoCapture(f)
    fps = cap.get(cv2.CAP_PROP_FPS)
    frames = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    duration = frames / fps if fps > 0 else 0
    cap.release()
    
    track_data = data.get(track_id, {})
    lyrics = track_data.get("lyrics", [])
    first_lyric_time = lyrics[0]["time"] if lyrics else None
    first_lyric_text = lyrics[0]["text"] if lyrics else None
    
    print(f"Track: {track_id} | File dur: {duration:.2f}s | 1st lyric @ {first_lyric_time}s: '{first_lyric_text}'")
