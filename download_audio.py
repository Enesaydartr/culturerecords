import os
import yt_dlp

os.makedirs("public/assets/audio", exist_ok=True)

TRACKS = {
    "nafile": "gD3SqwOJ9Sc",
    "sofi": "SU4I9_bZYbo",
    "bak_ne_dicem": "MArJetRSQiM",
    "gucum_yok": "1_RD5Xxbm5E",
    "bilezik_pirlanta": "-IDNPlw0458",
    "olm_was_rap_mep": "WgEVW4us_n8",
    "yesler": "OrdCSlxdHAI",
    "outro": "hVm-YmUEtIo",
    "yazik_sana": "r-oPri2aSgE",
    "bu_gece_misafirinim": "Q0E8fwC1JF4",
    "burada_sokaklar": "BeSfzuVaZTg",
    "ihtiyac_yok_otele": "NPcRsdmeSoI",
    "cok_agladim": "eWeWAZiqW0Y",
    "bir_kere_daha": "eAUwDhZ2RXQ",
    "brapap2": "BoIMxiYFOEI",
    "yaramaz": "bk1-1B3476E",
    "tmax": "FjLZXS7sD2U",
    "g_wagon": "1M8I1Qupy7w",
    "hmdl": "FinAvFZdwi8",
    "balmain": "zjrG2L8OFY8",
}

ydl_opts_base = {
    'format': 'bestaudio/best',
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '128',
    }],
    'quiet': True,
    'no_warnings': True,
}

for track_id, ytid in TRACKS.items():
    out_path = f"public/assets/audio/{track_id}.mp3"
    # Also check if already exists
    if os.path.exists(out_path) and os.path.getsize(out_path) > 10000:
        print(f"Already downloaded {track_id}")
        continue
    
    url = f"https://www.youtube.com/watch?v={ytid}"
    print(f"Downloading audio for {track_id} ({url})...")
    
    opts = {
        'format': 'bestaudio[ext=m4a]/bestaudio/best',
        'outtmpl': f'public/assets/audio/{track_id}.%(ext)s',
        'quiet': True,
        'no_warnings': True
    }
    
    try:
        with yt_dlp.YoutubeDL(opts) as ydl:
            ydl.download([url])
            print(f"Successfully downloaded {track_id}")
    except Exception as e:
        print(f"Error downloading {track_id}: {e}")

print("Audio download job complete!")
