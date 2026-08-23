with open(".gitignore", "r", encoding="utf-8") as f:
    content = f.read()

if "temp_audio_staging" not in content:
    content += "\ntemp_audio_staging/\n"

with open(".gitignore", "w", encoding="utf-8") as f:
    f.write(content)

print(".gitignore updated with temp_audio_staging")
