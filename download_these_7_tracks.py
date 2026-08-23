import os
import subprocess
import glob
from PIL import Image

REQUESTED_7 = {
    "brapap": "Lj8kloI_3Tw",
    "paranoya": "iMfPqrpxx8w",
    "anne": "YDLhTAxzS4Q",
    "mahalle": "mLE7YKqD_zg",
    "alisamadim": "1Rirxg0tdzI",
    "yok_hic_adalet": "1g00j1XH2kY",
    "sifir_yuz": "0on2FkbtLUc"
}

def trim_and_make_square(input_path, output_path):
    try:
        with Image.open(input_path) as im:
            im = im.convert("RGB")
            w, h = im.size
            min_dim = min(w, h)
            left = (w - min_dim) // 2
            top = (h - min_dim) // 2
            square = im.crop((left, top, left + min_dim, top + min_dim))
            final_img = square.resize((720, 720), Image.Resampling.LANCZOS)
            final_img.save(output_path, "JPEG", quality=95)
            print(f"Processed 1:1 cover: {output_path}")
    except Exception as e:
        print(f"Error cover {input_path}: {e}")

os.makedirs("public/assets/images/raw", exist_ok=True)
os.makedirs("public/assets/audio", exist_ok=True)

for track_id, ytid in REQUESTED_7.items():
    print(f"Downloading {track_id} ({ytid})...")
    # Thumbnail
    raw_img = f"public/assets/images/raw/{track_id}.%(ext)s"
    try:
        subprocess.run([
            "yt-dlp", "--skip-download", "--write-thumbnail", "--convert-thumbnails", "jpg",
            "-o", raw_img, f"https://www.youtube.com/watch?v={ytid}"
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        raw_files = glob.glob(f"public/assets/images/raw/{track_id}.*")
        if raw_files:
            target_out = f"public/assets/images/{track_id}.jpg"
            trim_and_make_square(raw_files[0], target_out)
    except Exception as e:
        print(f"Failed thumbnail {track_id}: {e}")

    # Audio
    audio_out = f"public/assets/audio/{track_id}.%(ext)s"
    try:
        subprocess.run([
            "yt-dlp", "-f", "bestaudio[ext=m4a]/bestaudio/best",
            "--extractor-args", "youtube:player_client=android,web",
            "-o", audio_out, f"https://www.youtube.com/watch?v={ytid}"
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"Downloaded audio for {track_id}")
    except Exception as e:
        print(f"Failed audio {track_id}: {e}")

print("All 7 newly requested tracks downloaded!")
