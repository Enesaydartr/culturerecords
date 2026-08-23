with open("src/components/RightSidebarDrawer.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add onUserProfileClick to props
content = content.replace("  onOpenAuthModal?: () => void;\n}", "  onOpenAuthModal?: () => void;\n  onUserProfileClick?: (userId: string) => void;\n}")
content = content.replace("  isOpen, onClose, onTrackPlay, onOpenMixModal, onOpenListenTogether, onOpenAuthModal\n}: RightSidebarDrawerProps", "  isOpen, onClose, onTrackPlay, onOpenMixModal, onOpenListenTogether, onOpenAuthModal, onUserProfileClick\n}: RightSidebarDrawerProps")

# Add chat image file input ref
if "const chatImageFileInputRef = useRef<HTMLInputElement>(null);" not in content:
    content = content.replace("const chatEndRef = useRef<HTMLDivElement>(null);", """const chatEndRef = useRef<HTMLDivElement>(null);
  const chatImageFileInputRef = useRef<HTMLInputElement>(null);

  const handleChatImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setChatImageUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };""")

# Add file upload button to attach menu
target_attach = """                    <input
                      type="text"
                      placeholder="Resim URL yapıştırın (https://...)"
                      value={chatImageUrl}
                      onChange={(e) => setChatImageUrl(e.target.value)}
                      className="w-full bg-black border border-white/20 text-white text-[11px] p-2 focus:border-red-500 focus:outline-none"
                    />"""

replacement_attach = """                    <div className="space-y-1.5">
                      <input
                        type="file"
                        ref={chatImageFileInputRef}
                        accept="image/*"
                        onChange={handleChatImageFileUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        onClick={() => chatImageFileInputRef.current?.click()}
                        variant="outline"
                        size="sm"
                        className="w-full border-dashed border-red-500/40 text-red-400 hover:text-white text-[10px] uppercase font-bold py-1.5"
                      >
                        📂 Galeriden / Dosyadan Resim Seç
                      </Button>
                      <input
                        type="text"
                        placeholder="Veya Resim URL yapıştırın (https://...)"
                        value={chatImageUrl}
                        onChange={(e) => setChatImageUrl(e.target.value)}
                        className="w-full bg-black border border-white/20 text-white text-[11px] p-2 focus:border-red-500 focus:outline-none"
                      />
                    </div>"""

if target_attach in content:
    content = content.replace(target_attach, replacement_attach)

with open("src/components/RightSidebarDrawer.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("RightSidebarDrawer.tsx updated with chat file upload & onUserProfileClick prop")
