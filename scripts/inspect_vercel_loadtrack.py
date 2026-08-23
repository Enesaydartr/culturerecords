with open("scripts/vercel_bundle.js", "r", encoding="utf-8") as f:
    js = f.read()

# Find loadTrack and startMusic in js
idx_load = js.find("loadTrack")
if idx_load != -1:
    snippet = js[max(0, idx_load - 100):min(len(js), idx_load + 900)]
    print("Snippet around loadTrack:")
    print(snippet)

idx_start = js.find("startMusic")
if idx_start != -1:
    snippet2 = js[max(0, idx_start - 100):min(len(js), idx_start + 900)]
    print("\nSnippet around startMusic:")
    print(snippet2)
