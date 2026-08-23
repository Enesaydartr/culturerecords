import urllib.request

url = "https://b5cf-212-133-199-137.ngrok-free.app/assets/audio/bak_ne_dicem.mp4"
req = urllib.request.Request(url, headers={
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
    "ngrok-skip-browser-warning": "true"
})

try:
    with urllib.request.urlopen(req) as response:
        content_type = response.headers.get("Content-Type")
        length = response.headers.get("Content-Length")
        print(f"Response status: {response.status}, Content-Type: {content_type}, Length: {length} bytes")
        data = response.read(20)
        print("First 20 bytes:", data)
except Exception as e:
    print("Error:", e)
