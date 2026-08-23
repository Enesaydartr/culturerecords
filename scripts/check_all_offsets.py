import subprocess
import json
import speech_recognition as sr
import os

r = sr.Recognizer()

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

test_tracks = ["bak_ne_dicem", "gucum_yok", "nafile", "bilezik_pirlanta", "olm_was_rap_mep", "yesler", "yaramaz", "sofi"]

for track in test_tracks:
    audio_file = f"public/assets/audio/{track}.mp4"
    if not os.path.exists(audio_file):
        continue
    
    track_lyrics = data.get(track, {}).get("lyrics", [])
    first_time = track_lyrics[0]["time"] if track_lyrics else 0
    first_text = track_lyrics[0]["text"] if track_lyrics else ""
    
    # Extract 0-10s
    out_wav = f"scripts/test_{track}_0_10.wav"
    cmd = f'ffmpeg -y -ss 0 -to 10 -i "{audio_file}" -ar 16000 -ac 1 "{out_wav}"'
    subprocess.run(cmd, shell=True, capture_output=True)
    
    rec_text = ""
    try:
        with sr.AudioFile(out_wav) as source:
            audio = r.record(source)
            rec_text = r.recognize_google(audio, language="tr-TR")
    except:
        rec_text = "[No clear speech detected]"
    
    print(f"Track: {track:18s} | 1st in JSON: @ {first_time:5.2f}s '{first_text}' | 0-10s recognized: '{rec_text}'")
