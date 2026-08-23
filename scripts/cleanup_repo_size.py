import os
import shutil

# Remove backups folder if exists to save 100MB
backups_dir = "public/assets/audio/backups"
if os.path.exists(backups_dir):
    shutil.rmtree(backups_dir)
    print("Removed duplicate audio backups folder")

# Ensure .gitignore ignores dist, backups, node_modules, temp scripts
gitignore_content = """# Logs
logs
*.log
npm-debug.log*

node_modules
dist
dist-ssr
*.local

# Duplicates & Backups
public/assets/audio/backups/
*.bak
*.tmp
scripts/test_frames/
scripts/*.b64

# Editor directories and files
.vscode/*
.idea
.DS_Store

# Vercel & Env
.vercel
.env
.env*.local
"""

with open(".gitignore", "w", encoding="utf-8") as f:
    f.write(gitignore_content)

print(".gitignore updated!")
