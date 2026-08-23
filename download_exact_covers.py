import os
import subprocess
import glob
from PIL import Image, ImageChops

TRACK_SEARCHES = {
    "bak_ne_dicem": "MArJetRSQiM",
    "gucum_yok": "1_RD5Xxbm5E",
    "nafile": "gD3SqwOJ9Sc",
    "bilezik_pirlanta": "w5-l0DzPlEg",
    "olm_was_rap_mep": "WgEVW4us_n8",
    "yesler": "OrdCSlxdHAI",
    "sofi": "SU4I9_bZYbo",
    "outro": "hVm-YmUEtIo",
    "yazik_sana": "r-oPri2aSgE",
    "bu_gece_misafirinim": "Q0E8fwC1JF4",
    "burada_sokaklar": "BeSfzuVaZTg",
    "ihtiyac_yok_otele": "NPcRsdmeSoI",
    "cok_agladim": "eWeWAZiqW0Y",
    "bir_kere_daha": "Qd9Rz3Z1P5M",
    "brapap2": "BoIMxiYFOEI",
    "yaramaz": "bk1-1B3476E",
    "tmax": "FjLZXS7sD2U",
    "g_wagon": "1M8I1Qupy7w",
    "hmdl": "FinAvFZdwi8",
    "balmain": "zjrG2L8OFY8"
}

def trim_and_make_square(input_path, output_path):
    try:
        with Image.open(input_path) as im:
            im = im.convert("RGB")
            w, h = im.size
            
            # Center square crop
            min_dim = min(w, h)
            left = (w - min_dim) // 2
            top = (h - min_dim) // 2
            right = left + min_dim
            bottom = top + min_dim
            
            square = im.crop((left, top, right, bottom))
            final_img = square.resize((720, 720), Image.Resampling.LANCZOS)
            final_img.save(output_path, "JPEG", quality=95)
            print(f"Saved 1:1 square: {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

os.makedirs("public/assets/images/raw", exist_ok=True)

for track_id, ytid in TRACK_SEARCHES.items():
    raw_out = f"public/assets/images/raw/{track_id}.%(ext)s"
    cmd = [
        "yt-dlp",
        "--skip-download",
        "--write-thumbnail",
        "--convert-thumbnails", "jpg",
        "-o", raw_out,
        f"https://www.youtube.com/watch?v={ytid}"
    ]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        raw_files = glob.glob(f"public/assets/images/raw/{track_id}.*")
        if raw_files:
            target_out = f"public/assets/images/{track_id}.jpg"
            trim_and_make_square(raw_files[0], target_out)
    except Exception as e:
        print(f"Failed {track_id}: {e}")

print("All track covers downloaded and standardized!")
