with open("src/components/RightSidebarDrawer.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Update initial state from "general" to "global1"
content = content.replace('const [globalRoom, setGlobalRoom] = useState<string>("general");', 'const [globalRoom, setGlobalRoom] = useState<string>("global1");')
content = content.replace('const [globalMessages, setGlobalMessages] = useState<ChatMessage[]>(SocialService.getGlobalMessages("general"));', 'const [globalMessages, setGlobalMessages] = useState<ChatMessage[]>(SocialService.getGlobalMessages("global1"));')

target_rooms = """                  {[
                    { id: "general", label: "🔥 Alliance Ana Salon" },
                    { id: "tour", label: "🎙️ Konser & Tur" },
                    { id: "mixes", label: "🎧 Beat & Mix" }
                  ].map((r) => ("""

replacement_rooms = """                  {[
                    { id: "global1", label: "🌐 Global Sohbet 1" },
                    { id: "global2", label: "🌐 Global Sohbet 2" },
                    { id: "global3", label: "🌐 Global Sohbet 3" }
                  ].map((r) => ("""

if target_rooms in content:
    content = content.replace(target_rooms, replacement_rooms)
    print("Replaced global rooms with Global Sohbet 1, 2, 3")
else:
    print("target_rooms not found, checking...")

with open("src/components/RightSidebarDrawer.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("RightSidebarDrawer.tsx updated!")
