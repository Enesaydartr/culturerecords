import urllib.request
import os

try:
    import cv2
    for name, path in [("eray", "public/assets/videos/eray.mp4"), ("mansur", "public/assets/videos/mansur.mp4")]:
        cap = cv2.VideoCapture(path)
        ret, frame = cap.read()
        if ret:
            h, w, c = frame.shape
            print(f"{name}: {w}x{h}, fps={cap.get(cv2.CAP_PROP_FPS)}, frames={cap.get(cv2.CAP_PROP_FRAME_COUNT)}")
            cv2.imwrite(f"public/assets/videos/{name}_frame0.jpg", frame)
        cap.release()
except Exception as e:
    print("cv2 not available or error:", e)
