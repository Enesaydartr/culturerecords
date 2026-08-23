import subprocess
import wave
import numpy as np

# Convert first 30 seconds of bak_ne_dicem.mp4 to uncompressed WAV
cmd = 'ffmpeg -y -i "public/assets/audio/bak_ne_dicem.mp4" -t 30 -ar 44100 -ac 1 "scripts/bak_first_30s.wav"'
subprocess.run(cmd, shell=True, capture_output=True)

with wave.open("scripts/bak_first_30s.wav", "rb") as wf:
    framerate = wf.getframerate()
    nframes = wf.getnframes()
    raw = wf.readframes(nframes)
    audio_data = np.frombuffer(raw, dtype=np.int16)

# Print energy per second
chunk_size = framerate
for sec in range(min(30, len(audio_data) // chunk_size)):
    chunk = audio_data[sec*chunk_size : (sec+1)*chunk_size]
    rms = np.sqrt(np.mean(chunk.astype(float)**2))
    print(f"Sec {sec:02d}: RMS = {rms:6.1f} | {'#' * int(rms / 500)}")
