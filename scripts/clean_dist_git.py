import shutil
import os

dist_git = os.path.abspath("dist/.git")
if os.path.exists(dist_git):
    shutil.rmtree(dist_git)
    print("Removed .git folder from dist successfully!")
else:
    print("No .git folder in dist.")
