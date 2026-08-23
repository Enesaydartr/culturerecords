import cv2
import numpy as np
import glob
import os
from PIL import Image

files = glob.glob(r"C:\Users\EnesA\Downloads\*Gramophone*.mp4")
video_path = files[0]
cap = cv2.VideoCapture(video_path)

os.makedirs("scripts/test_frames", exist_ok=True)

for i in range(5):
    ret, frame = cap.read()
    if not ret:
        break
    
    # Analyze frame colors
    # Green screen removal using HSV
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # Green color range in HSV:
    # Hue for green is typically 35 to 85
    # Let's inspect sample green pixels
    lower_green = np.array([35, 60, 40])
    upper_green = np.array([85, 255, 255])
    
    mask = cv2.inRange(hsv, lower_green, upper_green)
    
    # Invert mask so subject is 255 and green is 0
    alpha = cv2.bitwise_not(mask)
    
    # Refine mask edges with slight blur/morphology for smooth antialiased edges
    alpha = cv2.GaussianBlur(alpha, (3, 3), 0)
    
    # Create BGRA
    b, g, r = cv2.split(frame)
    bgra = cv2.merge([b, g, r, alpha])
    
    # Save test image
    cv2.imwrite(f"scripts/test_frames/test_frame_{i}.png", bgra)
    print(f"Saved test_frame_{i}.png with alpha shape: {bgra.shape}")

cap.release()
print("Test extraction complete!")
