with open("src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("""<Character3DScrollShowcase onTrackSelect={(trackId) => {
            const tr = PLAYLIST.find((t) => t.id === trackId);
            if (tr) playTrack(tr);
          }} />""", "<Character3DScrollShowcase />")

content = content.replace("href={concert.ticketUrl}", "href={concert.bubiletUrl}")

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("App.tsx props fixed")
