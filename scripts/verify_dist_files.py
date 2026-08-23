import os

over_25mb = []
for root, dirs, files in os.walk("dist"):
    for f in files:
        fp = os.path.join(root, f)
        sz = os.path.getsize(fp) / (1024*1024)
        if sz > 25:
            over_25mb.append((sz, fp))

print(f"Files over 25MB in dist: {len(over_25mb)}")
for sz, fp in over_25mb:
    print(f"{sz:.2f} MB: {fp}")
