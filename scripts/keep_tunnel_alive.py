import subprocess
import time
import sys

while True:
    try:
        print("Starting localtunnel on port 5173...")
        p = subprocess.Popen(["npx", "lt", "--port", "5173", "--subdomain", "culturerecords-official"], shell=True)
        p.wait()
    except Exception as e:
        print("Tunnel error:", e)
    time.sleep(2)
