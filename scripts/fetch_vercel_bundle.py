import urllib.request
import re
import os

url = "https://temporary-nimble-nickel-qjbp80v.vercel.app/"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
        print("HTML length:", len(html))
        # Find script tags and links
        scripts = re.findall(r'<script[^>]+src="([^"]+)"', html)
        css = re.findall(r'<link[^>]+href="([^"]+)"', html)
        print("Scripts found:", scripts)
        print("CSS found:", css)
        
        # Download main JS bundle to inspect
        for s in scripts:
            js_url = urllib.parse.urljoin(url, s)
            print("Fetching JS bundle:", js_url)
            with urllib.request.urlopen(js_url) as js_resp:
                js_content = js_resp.read().decode("utf-8")
                print("JS bundle size:", len(js_content))
                with open("scripts/vercel_bundle.js", "w", encoding="utf-8") as out:
                    out.write(js_content)
                print("Saved to scripts/vercel_bundle.js")
except Exception as e:
    print("Error fetching Vercel:", e)
