import cv2
import numpy as np

img = cv2.imread("scripts/test_frames/test_frame_0.png", cv2.IMREAD_UNCHANGED)
print("Image shape:", img.shape)
alpha = img[:, :, 3]

# Find bounding box of non-transparent content
coords = cv2.findNonZero(alpha)
x, y, w, h = cv2.boundingRect(coords)
print(f"Bounding box of gramophone: x={x}, y={y}, w={w}, h={h}")
