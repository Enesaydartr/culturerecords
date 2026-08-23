import os

def get_dir_size(path):
    total = 0
    for root, dirs, files in os.walk(path):
        for f in files:
            fp = os.path.join(root, f)
            total += os.path.getsize(fp)
    return total

print("public/assets/audio size:", get_dir_size("public/assets/audio") / (1024*1024), "MB")
print("public/assets/videos size:", get_dir_size("public/assets/videos") / (1024*1024), "MB")
print("public/assets/images size:", get_dir_size("public/assets/images") / (1024*1024), "MB")
print("src size:", get_dir_size("src") / (1024*1024), "MB")
