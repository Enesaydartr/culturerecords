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

for track_id, ytid in TRACKS.items():
    # Check if any audio file exists
    found = False
    for ext in ['mp3', 'm4a', 'webm', 'mp4', 'opus']:
        p = f"public/assets/audio/{track_id}.{ext}"
        if os.path.exists(p) and os.path.getsize(p) > 20000:
            found = True
            break
    if found:
        print(f"Already have {track_id}")
        continue

    url = f"https://www.youtube.com/watch?v={ytid}"
    print(f"Downloading audio: {track_id}...")
    opts = {
        'format': '140/ba/b', # 140 is m4a audio only
        'outtmpl': f'public/assets/audio/{track_id}.%(ext)s',
        'quiet': True,
        'no_warnings': True,
        'extractor_args': {'youtube': {'player_client': ['android', 'web', 'ios']}}
    }
    try:
        with yt_dlp.YoutubeDL(opts) as ydl:
            ydl.download([url])
            print(f"Downloaded {track_id}")
    except Exception as e:
        print(f"Failed {track_id}: {e}")

print("Batch download completed!")
