with open("src/components/AdminHub.tsx", "r", encoding="utf-8") as f:
    content = f.read()

target_ref = "const fileInputRef = useRef<HTMLInputElement | null>(null);"
replacement_ref = """const fileInputRef = useRef<HTMLInputElement | null>(null);
  const newsImageFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleNewsImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setNewsCover(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };"""

content = content.replace(target_ref, replacement_ref)

with open("src/components/AdminHub.tsx", "w", encoding="utf-8") as f:
    f.write(content)

with open("src/components/AuthModal.tsx", "r", encoding="utf-8") as f:
    auth_content = f.read()

auth_content = auth_content.replace(",\n  Chrome", ",\n  Globe")
auth_content = auth_content.replace("<Chrome className=\"h-4 w-4 text-red-500\" />", "<Globe className=\"h-4 w-4 text-red-500\" />")

with open("src/components/AuthModal.tsx", "w", encoding="utf-8") as f:
    f.write(auth_content)

print("Both files patched")
