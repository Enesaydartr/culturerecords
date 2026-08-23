import re

with open("src/data/artists.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Match id and title
tracks = []
lines = text.splitlines()
current_track = {}
for line in lines:
    line = line.strip()
    if line.startswith("id:"):
        current_track["id"] = line.split('"')[1]
    elif line.startswith("title:"):
        current_track["title"] = line.split('"')[1]
    elif line.startswith("artist:"):
        current_track["artist"] = line.split('"')[1]
    elif line.startswith("album:"):
        current_track["album"] = line.split('"')[1]
    elif line.startswith("releaseDate:"):
        current_track["releaseDate"] = line.split('"')[1]
    elif line.startswith("youtubeId:"):
        current_track["youtubeId"] = line.split('"')[1]
        if "id" in current_track and "title" in current_track:
            tracks.append(current_track)
            current_track = {}

print(f"Total tracks parsed: {len(tracks)}")
for i, t in enumerate(tracks):
    print(f"{i+1}. id: {t.get('id')}, title: {t.get('title')}, artist: {t.get('artist')}, album: {t.get('album')}, date: {t.get('releaseDate')}")
