import subprocess
import time
import sys

print("Auto-restart tunnel daemon started.")
while True:
    print(f"[{time.strftime('%X')}] Launching localtunnel...")
    p = subprocess.Popen(["npx", "localtunnel", "--port", "5173", "--subdomain", "culturerecords-official"], shell=True)
    p.wait()
    print(f"[{time.strftime('%X')}] Tunnel exited with code {p.returncode}. Restarting in 2s...")
    time.sleep(2)
