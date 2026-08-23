import shutil
import os

if os.path.exists(".git"):
    shutil.rmtree(".git")
    print("Old heavy .git directory removed.")
