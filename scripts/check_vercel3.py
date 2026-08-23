import urllib.request

# The vercel URL might need index.html explicitly
urls = [
    "https://temporary-nimble-nickel-qjbp80v.vercel.app/index.html",
    "https://temporary-nimble-nickel-qjbp80v.vercel.app",
]

for url in urls:
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "text/html,application/xhtml+xml"
    })
    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode("utf-8")
            print(f"URL: {url} -> Status: {resp.status}, Length: {len(html)}")
            if "index-" in html:
                import re
                scripts = re.findall(r'src="([^"]*index[^"]*\.js)"', html)
                print(f"  JS bundles found: {scripts}")
    except Exception as e:
        print(f"URL: {url} -> Error: {e}")
