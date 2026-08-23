import sys

print("Python version:", sys.version)

try:
    import cv2
    print("OpenCV version:", cv2.__version__)
except ImportError:
    print("OpenCV not installed")

try:
    import PIL
    print("Pillow version:", PIL.__version__)
except ImportError:
    print("Pillow not installed")

import shutil
ffmpeg_path = shutil.which("ffmpeg")
print("ffmpeg path:", ffmpeg_path)
