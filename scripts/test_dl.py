import yt_dlp
import os

os.makedirs("public/assets/audio", exist_ok=True)
url = "https://www.youtube.com/watch?v=MArJetRSQiM"

ydl_opts = {
    'format': 'bestaudio[ext=m4a]/bestaudio/best',
    'outtmpl': 'public/assets/audio/bak_ne_dicem.%(ext)s',
    'overwrites': True,
    'quiet': False
}

try:
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    print("Downloaded bak_ne_dicem test successfully!")
except Exception as e:
    print("Download test error:", e)
