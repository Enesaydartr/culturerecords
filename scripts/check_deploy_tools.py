import shutil
import subprocess

tools = ["vercel", "netlify", "surge", "gh", "git", "firebase", "npm", "npx"]
for t in tools:
    path = shutil.which(t)
    print(f"{t}: {path}")
