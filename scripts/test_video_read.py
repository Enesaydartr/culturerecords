import cv2
import glob
import numpy as np
import os

files = glob.glob(r"C:\Users\EnesA\Downloads\*Gramophone*.mp4")
print("Found video:", files[0])

cap = cv2.VideoCapture(files[0])
ret, frame = cap.read()
print("First frame read success:", ret)

if ret:
    print("Frame shape:", frame.shape)

cap.release()
