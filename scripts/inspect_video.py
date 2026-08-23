import cv2
import glob
import os

files = glob.glob(r"C:\Users\EnesA\Downloads\*Gramophone*.mp4")
if not files:
    print("No video found")
    exit(1)

video_path = files[0]
cap = cv2.VideoCapture(video_path)

width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = cap.get(cv2.CAP_PROP_FPS)
frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
duration = frame_count / fps if fps > 0 else 0

print(f"File: {video_path}")
print(f"Resolution: {width}x{height}")
print(f"FPS: {fps}")
print(f"Frame Count: {frame_count}")
print(f"Duration: {duration:.2f} seconds")

# Read a few sample frames and inspect color distribution (e.g. green background)
ret, frame = cap.read()
if ret:
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    print("Frame 0 sampled. Top-left pixel BGR:", frame[10, 10], "HSV:", hsv[10, 10])

cap.release()
