import subprocess
import speech_recognition as sr
import os

r = sr.Recognizer()

# Slice 0s to 10s of bak_ne_dicem
cmd1 = 'ffmpeg -y -ss 0 -to 10 -i "public/assets/audio/bak_ne_dicem.mp4" -ar 16000 -ac 1 "scripts/slice_0_10.wav"'
subprocess.run(cmd1, shell=True, capture_output=True)

# Slice 20s to 35s of bak_ne_dicem
cmd2 = 'ffmpeg -y -ss 20 -to 35 -i "public/assets/audio/bak_ne_dicem.mp4" -ar 16000 -ac 1 "scripts/slice_20_35.wav"'
subprocess.run(cmd2, shell=True, capture_output=True)

for slice_file in ["scripts/slice_0_10.wav", "scripts/slice_20_35.wav"]:
    try:
        with sr.AudioFile(slice_file) as source:
            audio = r.record(source)
            text = r.recognize_google(audio, language="tr-TR")
            print(f"{slice_file} recognized: {text}")
    except Exception as e:
        print(f"{slice_file} recognize error: {e}")
