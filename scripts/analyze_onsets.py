import json
import subprocess
import os
import wave
import numpy as np

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    orig_data = json.load(f)

# Helper: Find first audio energy onset (after any initial silence)
def find_audio_onset(wav_path):
    with wave.open(wav_path, "rb") as wf:
        sr = wf.getframerate()
        nframes = wf.getnframes()
        raw = wf.readframes(nframes)
        data = np.frombuffer(raw, dtype=np.int16).astype(float)
    
    # Calculate energy in 100ms windows
    window_len = int(0.1 * sr)
    energies = []
    for i in range(0, len(data) - window_len, window_len):
        chunk = data[i:i+window_len]
        rms = np.sqrt(np.mean(chunk**2))
        energies.append((i / sr, rms))
    
    # Find first window above threshold
    threshold = 500
    for t, rms in energies:
        if rms > threshold:
            return round(t, 2)
    return 0.0

print("Analyzing all 33 tracks:")
for track_id, item in orig_data.items():
    audio_path = f"public/assets/audio/{track_id}.mp4"
    if not os.path.exists(audio_path):
        audio_path = f"public/assets/audio/{track_id}.mp3"
    if not os.path.exists(audio_path):
        continue
    
    # Convert first 20s to WAV
    wav_path = f"scripts/wav_temp/{track_id}_start.wav"
    os.makedirs("scripts/wav_temp", exist_ok=True)
    subprocess.run(f'ffmpeg -y -i "{audio_path}" -t 20 -ar 16000 -ac 1 "{wav_path}"', shell=True, capture_output=True)
    
    onset = find_audio_onset(wav_path)
    lyrics = item.get("lyrics", [])
    first_time = lyrics[0]["time"] if lyrics else 0
    first_text = lyrics[0]["text"] if lyrics else ""
    
    print(f"- {track_id:20s} | Onset: {onset:4.2f}s | JSON 1st: {first_time:5.2f}s | '{first_text}'")
