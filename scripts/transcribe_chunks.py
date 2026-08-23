import subprocess
import json
import speech_recognition as sr
import os

r = sr.Recognizer()

# Let's slice bak_ne_dicem into 5-second overlapping chunks and recognize speech
track = "bak_ne_dicem"
audio_file = f"public/assets/audio/{track}.mp4"

print(f"Transcribing {track} in 5s intervals from 0s to 60s:")
for start_sec in range(0, 60, 4):
    end_sec = start_sec + 6
    chunk_wav = f"scripts/wav_temp/chunk_{start_sec}_{end_sec}.wav"
    cmd = f'ffmpeg -y -ss {start_sec} -to {end_sec} -i "{audio_file}" -ar 16000 -ac 1 "{chunk_wav}"'
    subprocess.run(cmd, shell=True, capture_output=True)
    
    text = ""
    try:
        with sr.AudioFile(chunk_wav) as source:
            audio = r.record(source)
            text = r.recognize_google(audio, language="tr-TR")
    except:
        text = "..."
    
    print(f"[{start_sec:02d}s - {end_sec:02d}s]: {text}")
