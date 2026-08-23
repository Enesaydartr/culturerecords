import cv2
import numpy as np

def extract_chroma_key(frame):
    # Convert to HSV
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    h, s, v = cv2.split(hsv)
    
    # Green detection in HSV
    # Precise green screen range
    lower_green = np.array([35, 50, 40], dtype=np.uint8)
    upper_green = np.array([85, 255, 255], dtype=np.uint8)
    
    green_mask = cv2.inRange(hsv, lower_green, upper_green)
    
    # Calculate soft alpha
    alpha = 255 - green_mask
    
    # Clean up small noise with morphological operations
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    alpha = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, kernel)
    alpha = cv2.GaussianBlur(alpha, (3, 3), 0)
    
    # Despill green from RGB
    b, g, r = cv2.split(frame)
    # Simple despill: limit green channel to max of red and blue
    max_rb = np.maximum(r, b)
    g_despilled = np.where(g > max_rb, max_rb, g)
    
    bgra = cv2.merge([b, g_despilled, r, alpha])
    return bgra

# Test on frame 0, 50, 100, 150, 200
cap = cv2.VideoCapture(r"C:\Users\EnesA\Downloads\Gramophone_playing_vinyl_record__202608231623.mp4")
for frame_idx in [0, 50, 100, 150, 200]:
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
    ret, frame = cap.read()
    if ret:
        bgra = extract_chroma_key(frame)
        cv2.imwrite(f"scripts/test_frames/despill_{frame_idx}.png", bgra)

cap.release()
print("Despill test complete!")
