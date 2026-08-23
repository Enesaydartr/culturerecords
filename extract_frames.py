import cv2
import numpy as np
import os

def extract_chroma_frames(video_path, out_dir, target_frames=72, width=480, height=854):
    os.makedirs(out_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    print(f"Processing {video_path}: {total_frames} frames")
    
    indices = np.linspace(0, total_frames - 1, target_frames, dtype=int)
    current_idx = 0
    saved_count = 0
    
    while cap.isOpened() and saved_count < target_frames:
        ret, frame = cap.read()
        if not ret:
            break
            
        if current_idx in indices:
            frame_resized = cv2.resize(frame, (width, height), interpolation=cv2.INTER_AREA)
            
            # Convert to HSV for robust chroma keying
            hsv = cv2.cvtColor(frame_resized, cv2.COLOR_BGR2HSV)
            
            # Green screen range in HSV (Hue roughly 35 to 85, Saturation > 40, Value > 40)
            lower_green = np.array([25, 35, 30])
            upper_green = np.array([90, 255, 255])
            
            mask = cv2.inRange(hsv, lower_green, upper_green)
            
            # Refine mask with soft edges
            # Invert mask so subject is 255 and green is 0
            subject_mask = cv2.bitwise_not(mask)
            
            # Smooth edges with Gaussian blur to avoid jagged green fringe
            subject_mask = cv2.GaussianBlur(subject_mask, (5, 5), 0)
            
            # Create BGRA image
            b, g, r = cv2.split(frame_resized)
            
            # Despill: suppress excess green in edge pixels
            # if G > (R + B) / 2, clamp G to (R + B) / 2
            avg_rb = ((r.astype(np.float32) + b.astype(np.float32)) / 2.0).astype(np.uint8)
            g_despill = np.where((g > avg_rb) & (subject_mask < 240), avg_rb, g)
            
            rgba = cv2.merge([b, g_despill, r, subject_mask])
            
            out_file = os.path.join(out_dir, f"frame_{saved_count:03d}.webp")
            cv2.imwrite(out_file, rgba, [cv2.IMWRITE_WEBP_QUALITY, 88])
            saved_count += 1
            
        current_idx += 1
        
    cap.release()
    print(f"Saved {saved_count} transparent frames to {out_dir}")

extract_chroma_frames("public/assets/videos/eray.mp4", "public/assets/videos/frames/eray", target_frames=72)
extract_chroma_frames("public/assets/videos/mansur.mp4", "public/assets/videos/frames/mansur", target_frames=72)
