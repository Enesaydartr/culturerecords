import cv2
import glob
import numpy as np
import os
from PIL import Image

output_dir = r"public\assets\videos\frames\alliance"
os.makedirs(output_dir, exist_ok=True)

files = glob.glob(r"C:\Users\EnesA\Downloads\*Gramophone*.mp4")
if not files:
    print("Video file not found!")
    exit(1)

video_path = files[0]
cap = cv2.VideoCapture(video_path)

total_video_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
print(f"Total video frames available: {total_video_frames}")

TOTAL_TARGET_FRAMES = 72
frame_indices = np.linspace(0, total_video_frames - 1, TOTAL_TARGET_FRAMES, dtype=int)

# Target resolution matching eray/mansur: (480, 854)
target_w = 480
target_h = 854

for i, f_idx in enumerate(frame_indices):
    cap.set(cv2.CAP_PROP_POS_FRAMES, f_idx)
    ret, frame = cap.read()
    if not ret:
        print(f"Failed to read frame at index {f_idx}")
        continue
    
    # Chroma key removal:
    # 1. Convert to HSV
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # 2. Threshold for green background
    lower_green = np.array([32, 50, 40], dtype=np.uint8)
    upper_green = np.array([88, 255, 255], dtype=np.uint8)
    
    green_mask = cv2.inRange(hsv, lower_green, upper_green)
    
    # 3. Soft alpha
    alpha = 255 - green_mask
    
    # Morphological cleanup
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    alpha = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, kernel)
    alpha = cv2.GaussianBlur(alpha, (3, 3), 0)
    
    # 4. Despill green on RGB
    b, g, r = cv2.split(frame)
    max_rb = np.maximum(r, b)
    g_despilled = np.where(g > max_rb, max_rb, g)
    
    bgra = cv2.merge([b, g_despilled, r, alpha])
    
    # 5. Resize / Fit into target_w x target_h
    # Frame is 1080x1920 (aspect 9:16 = 0.5625). Target is 480x854 (aspect ~0.562).
    # Direct high quality resize to target_w x target_h
    resized_bgra = cv2.resize(bgra, (target_w, target_h), interpolation=cv2.INTER_AREA)
    
    # Convert BGRA to RGBA for PIL
    rgba = cv2.cvtColor(resized_bgra, cv2.COLOR_BGRA2RGBA)
    pil_img = Image.fromarray(rgba)
    
    out_filename = os.path.join(output_dir, f"frame_{i:03d}.webp")
    pil_img.save(out_filename, "WEBP", quality=90, method=6)

cap.release()
print(f"Successfully extracted and saved {TOTAL_TARGET_FRAMES} transparent WebP frames to {output_dir}")
