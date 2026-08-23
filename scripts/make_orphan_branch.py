import subprocess

# Create orphan branch with clean state
subprocess.run(["git", "checkout", "--orphan", "clean-main"], check=True)
subprocess.run(["git", "add", "src/", "public/assets/images/", "public/assets/videos/", "public/assets/audio/", "index.html", "package.json", "vite.config.ts", "tailwind.config.js", "tsconfig.json", "tsconfig.node.json", "postcss.config.js", "vercel.json", ".github/", ".gitignore"], check=True)
subprocess.run(["git", "commit", "-m", "feat: official release for culturerecords.com"], check=True)
subprocess.run(["git", "branch", "-D", "main"], check=False)
subprocess.run(["git", "branch", "-M", "clean-main", "main"], check=True)

print("Clean branch created with zero bloated history!")
