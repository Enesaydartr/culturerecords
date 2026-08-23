import cv2
import os
import glob

eray_files = glob.glob("public/assets/videos/frames/eray/*.webp")
print(f"Total eray frames: {len(eray_files)}")
if eray_files:
    img = cv2.imread(eray_files[0], cv2.IMREAD_UNCHANGED)
    print("ERAY frame shape:", img.shape)

mansur_files = glob.glob("public/assets/videos/frames/mansur/*.webp")
print(f"Total mansur frames: {len(mansur_files)}")
if mansur_files:
    img = cv2.imread(mansur_files[0], cv2.IMREAD_UNCHANGED)
    print("MANSUR frame shape:", img.shape)
