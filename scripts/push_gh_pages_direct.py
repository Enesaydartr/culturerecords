import subprocess
import os

dist_dir = os.path.abspath("dist")
print(f"Pushing gh-pages branch from {dist_dir}...")

res = subprocess.run(["git", "push", "origin", "gh-pages", "--force"], cwd=dist_dir, capture_output=True, text=True, shell=True)
print("STDOUT:", res.stdout)
print("STDERR:", res.stderr)
print("Return code:", res.returncode)
