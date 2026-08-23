import urllib.request

url = "https://b5cf-212-133-199-137.ngrok-free.app/assets/audio/bak_ne_dicem.mp4"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)"})

try:
    with urllib.request.urlopen(req) as response:
        content_type = response.headers.get("Content-Type")
        length = response.headers.get("Content-Length")
        print(f"Response status: {response.status}, Content-Type: {content_type}, Length: {length}")
        data = response.read(200)
        print("First 100 bytes:", data[:100])
except Exception as e:
    print("Error:", e)
