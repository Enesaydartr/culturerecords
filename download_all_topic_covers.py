import os
import subprocess
import glob
from PIL import Image

SINGLES = {
    "yazik_sana": "ERAY067 MANSUR YAZIK SANA Topic",
    "bu_gece_misafirinim": "ERAY067 MANSUR bu gece misafirinim Topic",
    "burada_sokaklar": "ERAY067 MANSUR Batuflex burada sokaklar Topic",
    "ihtiyac_yok_otele": "ERAY067 MANSUR İhtiyaç yok otele Topic",
    "cok_agladim": "ERAY067 MANSUR çok ağladım Topic",
    "bir_kere_daha": "ERAY067 MANSUR bir kere daha Topic",
    "brapap2": "Organize ERAY067 MANSUR brapap II Topic",
    "yaramaz": "ERAY067 MANSUR yaramaz Topic",
    "tmax": "ERAY067 tmax Topic",
    "g_wagon": "ERAY067 g wagon Topic",
    "hmdl": "Avie Organize ERAY067 MANSUR HMDL Topic",
    "balmain": "Organize ERAY067 MANSUR balmain Topic"
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
            print(f"Processed single cover: {output_path}")
    except Exception as e:
        print(f"Error: {e}")

os.makedirs("public/assets/images/raw", exist_ok=True)

for track_id, query in SINGLES.items():
    try:
        # Search topic release
        res = subprocess.run(
            ["yt-dlp", "--print", "%(id)s", f"ytsearch1:{query}"],
            capture_output=True, text=True, check=True
        )
        ytid = res.stdout.strip().split("\n")[0]
        if ytid:
            raw_out = f"public/assets/images/raw/{track_id}.%(ext)s"
            subprocess.run(
                ["yt-dlp", "--skip-download", "--write-thumbnail", "--convert-thumbnails", "jpg", "-o", raw_out, f"https://www.youtube.com/watch?v={ytid}"],
                check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
            )
            raw_files = glob.glob(f"public/assets/images/raw/{track_id}.*")
            if raw_files:
                target_out = f"public/assets/images/{track_id}.jpg"
                trim_and_make_square(raw_files[0], target_out)
    except Exception as e:
        print(f"Failed single {track_id}: {e}")

print("All single covers downloaded from official Topic channels!")
