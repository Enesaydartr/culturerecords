import os

sizes = []
for root, dirs, files in os.walk("."):
    if ".git" in root or "node_modules" in root:
        continue
    for f in files:
        fp = os.path.join(root, f)
        try:
            sz = os.path.getsize(fp)
            sizes.append((sz, fp))
        except:
            pass

sizes.sort(key=lambda x: x[0], reverse=True)
print("Top 20 largest files in project:")
for sz, fp in sizes[:20]:
    print(f"{sz / (1024*1024):.2f} MB: {fp}")
