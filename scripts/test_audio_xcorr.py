import os
import json
import subprocess
import yt_dlp
import numpy as np
import scipy.signal
import soundfile as sf

os.makedirs("scripts/original_audios", exist_ok=True)
os.makedirs("scripts/wav_temp", exist_ok=True)

with open("scripts/tracks_youtube_map.json", "r", encoding="utf-8") as f:
    tracks = json.load(f)

# Test on 4 tracks: bak_ne_dicem, gucum_yok, nafile, sofi
test_subset = ["bak_ne_dicem", "gucum_yok", "nafile", "sofi"]

def download_orig(track_id, ytid):
    out_path = f"scripts/original_audios/{track_id}.m4a"
    if os.path.exists(out_path) and os.path.getsize(out_path) > 20000:
        return out_path
    
    url = f"https://www.youtube.com/watch?v={ytid}"
    print(f"Downloading original {track_id} from {url}...")
    opts = {
        'format': 'bestaudio[ext=m4a]/bestaudio/best',
        'outtmpl': f'scripts/original_audios/{track_id}.%(ext)s',
        'quiet': True,
        'no_warnings': True,
        'extractor_args': {'youtube': {'player_client': ['android', 'ios', 'web']}}
    }
    with yt_dlp.YoutubeDL(opts) as ydl:
        ydl.download([url])
    
    # Find downloaded file
    for ext in ['m4a', 'mp4', 'webm', 'opus']:
        p = f"scripts/original_audios/{track_id}.{ext}"
        if os.path.exists(p):
            return p
    return None

def get_audio_offset(orig_file, curr_file):
    # Convert both to 16kHz mono WAV for fast cross correlation
    orig_wav = "scripts/wav_temp/orig.wav"
    curr_wav = "scripts/wav_temp/curr.wav"
    
    subprocess.run(f'ffmpeg -y -i "{orig_file}" -ar 16000 -ac 1 "{orig_wav}"', shell=True, capture_output=True)
    subprocess.run(f'ffmpeg -y -i "{curr_file}" -ar 16000 -ac 1 "{curr_wav}"', shell=True, capture_output=True)
    
    orig_data, sr = sf.read(orig_wav)
    curr_data, _ = sf.read(curr_wav)
    
    # Take a 15-second signature from current audio (e.g. from 10s to 25s)
    sig_start = int(10 * sr)
    sig_end = int(25 * sr)
    if len(curr_data) < sig_end:
        sig_start = 0
        sig_end = min(len(curr_data), int(15 * sr))
    
    sig = curr_data[sig_start:sig_end]
    
    # Cross-correlate signature against original audio
    corr = scipy.signal.fftconvolve(orig_data, sig[::-1], mode='valid')
    peak_idx = np.argmax(np.abs(corr))
    
    # peak_idx corresponds to where sig_start in current audio matches in original audio!
    # orig_match_time = peak_idx / sr
    # curr_match_time = sig_start / sr
    # start_offset = orig_match_time - curr_match_time
    orig_match_time = peak_idx / sr
    curr_match_time = sig_start / sr
    offset_sec = orig_match_time - curr_match_time
    
    return round(offset_sec, 2)

for t in test_subset:
    ytid = tracks[t]["youtubeId"]
    orig_f = download_orig(t, ytid)
    curr_f = f"public/assets/audio/{t}.mp4"
    if orig_f and os.path.exists(curr_f):
        offset = get_audio_offset(orig_f, curr_f)
        print(f"RESULT >>> Track: {t:18s} | Offset: {offset:6.2f}s")
