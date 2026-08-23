import os
import yt_dlp

os.makedirs("public/assets/audio", exist_ok=True)

TRACKS = {
    "nafile": "https://www.youtube.com/watch?v=gD3SqwOJ9Sc",
    "sofi": "https://www.youtube.com/watch?v=SU4I9_bZYbo",
    "bak_ne_dicem": "https://www.youtube.com/watch?v=MArJetRSQiM",
    "gucum_yok": "https://www.youtube.com/watch?v=1_RD5Xxbm5E",
    "bilezik_pirlanta": "https://www.youtube.com/watch?v=-IDNPlw0458",
    "olm_was_rap_mep": "https://www.youtube.com/watch?v=WgEVW4us_n8",
    "yesler": "https://www.youtube.com/watch?v=OrdCSlxdHAI",
    "outro": "https://www.youtube.com/watch?v=hVm-YmUEtIo",
    "yazik_sana": "https://www.youtube.com/watch?v=r-oPri2aSgE",
    "bu_gece_misafirinim": "https://www.youtube.com/watch?v=Q0E8fwC1JF4",
    "burada_sokaklar": "https://www.youtube.com/watch?v=BeSfzuVaZTg",
    "ihtiyac_yok_otele": "https://www.youtube.com/watch?v=NPcRsdmeSoI",
    "cok_agladim": "https://www.youtube.com/watch?v=eWeWAZiqW0Y",
    "bir_kere_daha": "https://www.youtube.com/watch?v=eAUwDhZ2RXQ",
    "brapap2": "https://www.youtube.com/watch?v=BoIMxiYFOEI",
    "yaramaz": "https://www.youtube.com/watch?v=bk1-1B3476E",
    "tmax": "https://www.youtube.com/watch?v=FjLZXS7sD2U",
    "g_wagon": "https://www.youtube.com/watch?v=1M8I1Qupy7w",
    "hmdl": "https://www.youtube.com/watch?v=FinAvFZdwi8",
    "balmain": "https://www.youtube.com/watch?v=zjrG2L8OFY8",
}

for track_id, url in TRACKS.items():
    # Check if any audio file exists for this track
    found = False
    for ext in ['m4a', 'mp3', 'webm', 'opus']:
        p = f"public/assets/audio/{track_id}.{ext}"
        if os.path.exists(p) and os.path.getsize(p) > 20000:
            found = True
            break
    
    if found:
        print(f"Skipping {track_id}, already exists.")
        continue

    print(f"Downloading {track_id}...")
    opts = {
        'format': 'bestaudio/best',
        'outtmpl': f'public/assets/audio/{track_id}.%(ext)s',
        'quiet': True,
        'no_warnings': True,
        'extractor_args': {'youtube': {'player_client': ['android', 'ios', 'web']}}
    }
    try:
        with yt_dlp.YoutubeDL(opts) as ydl:
            ydl.download([url])
            print(f"Downloaded {track_id}")
    except Exception as e:
        print(f"Failed {track_id}: {e}")

print("Audio download job completed!")
