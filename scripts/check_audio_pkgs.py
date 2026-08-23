import sys

for pkg in ["numpy", "scipy", "soundfile", "librosa", "yt_dlp"]:
    try:
        m = __import__(pkg)
        print(f"{pkg}: available, version = {getattr(m, '__version__', 'unknown')}")
    except ImportError:
        print(f"{pkg}: NOT available")
