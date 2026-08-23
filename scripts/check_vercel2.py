import urllib.request

url = "https://temporary-nimble-nickel-qjbp80v.vercel.app/"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Accept": "text/html"})

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
        print("STATUS:", resp.status)
        print("HTML (first 2000 chars):")
        print(html[:2000])
except urllib.error.HTTPError as e:
    print("HTTP Error:", e.code, e.reason)
    body = e.read().decode("utf-8")
    print("Body:", body[:1000])
except Exception as e:
    print("Error:", e)
