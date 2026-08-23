import subprocess
import time

commits = [
    ("b79d4ac", "Core Web App (18MB)"),
    ("0dcbff9", "Audio Batch 1"),
    ("0ca4237", "Audio Batch 2"),
    ("fafab7f", "Audio Batch 3"),
    ("45220ef", "Audio Batch 4"),
    ("ac7c7e2", "Audio Batch 5"),
    ("ddb946d", "Audio Batch 6"),
    ("cfbbb77", "Audio Batch 7")
]

for commit_hash, desc in commits:
    print(f"=== Pushing {desc} ({commit_hash}) ===")
    cmd = ["git", "push", "origin", f"{commit_hash}:refs/heads/main", "-f"]
    res = subprocess.run(cmd, capture_output=True, text=True)
    print(res.stdout)
    if res.stderr:
        print(res.stderr)
    if res.returncode != 0:
        print(f"Failed on {commit_hash}")
        break
    else:
        print(f"Successfully pushed {desc}!")
    time.sleep(1)

print("Step by step push finished!")
