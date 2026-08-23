import cv2
import glob
import numpy as np
import os
from concurrent.futures import ThreadPoolExecutor

output_dir = r"public\assets\videos\frames\alliance"
os.makedirs(output_dir, exist_ok=True)

files = glob.glob(r"C:\Users\EnesA\Downloads\*Gramophone*.mp4")
video_path = files[0]
cap = cv2.VideoCapture(video_path)

total_video_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
TOTAL_TARGET_FRAMES = 72
frame_indices = np.linspace(0, total_video_frames - 1, TOTAL_TARGET_FRAMES, dtype=int)

target_w = 480
target_h = 854

# Read all target frames into memory first
raw_frames = []
for i, f_idx in enumerate(frame_indices):
    cap.set(cv2.CAP_PROP_POS_FRAMES, f_idx)
    ret, frame = cap.read()
    if ret:
        raw_frames.append((i, frame))

cap.release()
print(f"Read {len(raw_frames)} frames from video into memory.")

def process_frame(item):
    i, frame = item
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    lower_green = np.array([32, 50, 40], dtype=np.uint8)
    upper_green = np.array([88, 255, 255], dtype=np.uint8)
    
    green_mask = cv2.inRange(hsv, lower_green, upper_green)
    alpha = 255 - green_mask
    
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    alpha = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, kernel)
    alpha = cv2.GaussianBlur(alpha, (3, 3), 0)
    
    b, g, r = cv2.split(frame)
    max_rb = np.maximum(r, b)
    g_despilled = np.where(g > max_rb, max_rb, g)
    
    bgra = cv2.merge([b, g_despilled, r, alpha])
    resized = cv2.resize(bgra, (target_w, target_h), interpolation=cv2.INTER_AREA)
    
    out_filename = os.path.join(output_dir, f"frame_{i:03d}.webp")
    cv2.imwrite(out_filename, resized, [cv2.IMWRITE_WEBP_QUALITY, 85])
    return i

with ThreadPoolExecutor(max_workers=8) as executor:
    results = list(executor.map(process_frame, raw_frames))

print(f"Successfully processed and wrote {len(results)} frames in parallel!")
