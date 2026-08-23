import json
import subprocess
import speech_recognition as sr
import os

r = sr.Recognizer()

path = r"C:\Users\EnesA\Downloads\eray_mansur_senkron_ve_kirpma_yedek_2026-08-22.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Let's test the shifted timing on bak_ne_dicem and gucum_yok
# For bak_ne_dicem:
# Line 1: "Bak, ne diy'ce'm, aklıma geldi, biz bu yolu yürümüştük..." was at 27.47s.
# With shift of -22.5s -> line 1 is at 4.97s (~5s).
# Let's extract 4s to 12s of bak_ne_dicem.mp4 and recognize!
cmd = 'ffmpeg -y -ss 4.5 -to 12 -i "public/assets/audio/bak_ne_dicem.mp4" -ar 16000 -ac 1 "scripts/test_bak_shift.wav"'
subprocess.run(cmd, shell=True, capture_output=True)

try:
    with sr.AudioFile("scripts/test_bak_shift.wav") as source:
        audio = r.record(source)
        text = r.recognize_google(audio, language="tr-TR")
        print("bak_ne_dicem @ 4.5s-12s recognized:", text)
except Exception as e:
    print("bak_ne_dicem error:", e)

# For gucum_yok:
# Line 3: "Dönemem ki geri, gözler kara..." was at 28.05s.
# With shift of -21.0s -> line 3 is at 7.05s.
# Let's extract 6s to 14s of gucum_yok.mp4 and recognize!
cmd2 = 'ffmpeg -y -ss 6 -to 14 -i "public/assets/audio/gucum_yok.mp4" -ar 16000 -ac 1 "scripts/test_gucum_shift.wav"'
subprocess.run(cmd2, shell=True, capture_output=True)

try:
    with sr.AudioFile("scripts/test_gucum_shift.wav") as source:
        audio = r.record(source)
        text = r.recognize_google(audio, language="tr-TR")
        print("gucum_yok @ 6s-14s recognized:", text)
except Exception as e:
    print("gucum_yok error:", e)
