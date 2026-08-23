import subprocess

domain = "eray067-mansur-official.surge.sh"
print("Attempting deploy to:", domain)
cmd = f"npx surge dist --domain {domain}"
res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
print("Surge output:", res.stdout)
print("Surge error:", res.stderr)
