with open("src/components/CommunityMixModal.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("MP3 / Ses Dosyası Seç (İsteğe Bağlı):", "MP3 / Ses Dosyası Seç:")

with open("src/components/CommunityMixModal.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("CommunityMixModal updated: (İsteğe Bağlı) removed")
