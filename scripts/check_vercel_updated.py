import urllib.request
import re

# Check if Vercel has our LATEST code
url = "https://temporary-nimble-nickel-qjbp80v.vercel.app/"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode("utf-8")

scripts = re.findall(r'<script[^>]+src="([^"]+)"', html)
print("Current Vercel JS bundle:", scripts)

# Download and check if it has our seed code
for s in scripts:
    js_url = "https://temporary-nimble-nickel-qjbp80v.vercel.app" + s.lstrip(".")
    with urllib.request.urlopen(js_url) as js_resp:
        js = js_resp.read().decode("utf-8")
    
    has_seed = "initializeLocalStorageSeed" in js or "LOCALSTORAGE_SEED_DATA" in js
    has_builtin = "BUILTIN_SYNCED_LYRICS" in js
    has_v5 = "synced_lyrics_v5" in js
    has_old_key = '"eray_mansur_synced_lyrics_"' in js
    
    print(f"Bundle size: {len(js)} bytes")
    print(f"Has initializeLocalStorageSeed: {has_seed}")
    print(f"Has BUILTIN_SYNCED_LYRICS: {has_builtin}")
    print(f"Has v5 key: {has_v5}")
    print(f"Has OLD key (no version): {has_old_key}")
