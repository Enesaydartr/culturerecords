import subprocess
import os

# Check if speech_recognition or whisper or similar is available or extract audio slices to inspect
try:
    import speech_recognition as sr
    print("Speech recognition available")
except ImportError:
    print("Speech recognition not available")
