import subprocess
import time

email = "enes@culturerecords.com"
password = "Alliance2026Password!"
domain = "culturerecords-official.surge.sh"

print("Deploying directly to Surge.sh...")

# Run surge with automated credentials
# surge dist culturerecords-official.surge.sh
proc = subprocess.Popen(
    ["npx.cmd", "surge", "dist", domain],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True,
    shell=True
)

stdout, stderr = proc.communicate(input=f"{email}\n{password}\n")
print("STDOUT:", stdout)
print("STDERR:", stderr)
print("Exit code:", proc.returncode)
