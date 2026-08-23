import subprocess
import os
import shutil

# Step 1: Build production dist
print("Building production dist...")
subprocess.run(["npm.cmd", "run", "build"], shell=True, check=True)

# Step 2: Add .nojekyll to dist
with open("dist/.nojekyll", "w", encoding="utf-8") as f:
    f.write("")

shutil.copy("dist/index.html", "dist/404.html")
print("Added .nojekyll and 404.html")

# Step 3: Git init in dist
dist_path = os.path.abspath("dist")
subprocess.run(["git", "init"], cwd=dist_path, shell=True, check=True)
subprocess.run(["git", "config", "user.name", "Enes"], cwd=dist_path, shell=True, check=True)
subprocess.run(["git", "config", "user.email", "enes@culturerecords.com"], cwd=dist_path, shell=True, check=True)
subprocess.run(["git", "add", "-A"], cwd=dist_path, shell=True, check=True)
subprocess.run(["git", "commit", "-m", "deploy: live production build for culturerecords.com"], cwd=dist_path, shell=True, check=True)
subprocess.run(["git", "branch", "-M", "gh-pages"], cwd=dist_path, shell=True, check=True)
subprocess.run(["git", "remote", "add", "origin", "https://github.com/Enesaydartr/culturerecords.git"], cwd=dist_path, shell=True, check=False)

print("dist is ready in gh-pages branch!")
