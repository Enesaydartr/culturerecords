with open("src/components/UserProfileModal.tsx", "r", encoding="utf-8") as f:
    content = f.read()

if "Lock," not in content:
    content = content.replace("import {\n  X,", "import {\n  X,\n  Lock,")

target_dm_btn = """            {onOpenDm && (
              <Button
                onClick={() => {
                  onClose();
                  onOpenDm(profileUser);
                }}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 font-bold text-xs uppercase rounded-none px-4"
              >
                <MessageSquare className="h-3.5 w-3.5 mr-1.5" /> Mesaj Gönder
              </Button>
            )}"""

replacement_dm_btn = """            {onOpenDm && (
              <Button
                onClick={() => {
                  onClose();
                  onOpenDm(profileUser);
                }}
                variant="outline"
                size="sm"
                className={`font-bold text-xs uppercase rounded-none px-4 transition-all ${
                  currentUser && AuthService.areMutualFollowers(currentUser.id, profileUser.id)
                    ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-600 hover:text-white"
                    : "border-white/20 text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
                title={
                  currentUser && AuthService.areMutualFollowers(currentUser.id, profileUser.id)
                    ? "Özel Mesaj Gönder"
                    : "Özel mesaj göndermek için karşılıklı takipleşmeniz gerekir"
                }
              >
                {currentUser && AuthService.areMutualFollowers(currentUser.id, profileUser.id) ? (
                  <>
                    <MessageSquare className="h-3.5 w-3.5 mr-1.5 text-emerald-400" /> Özel Mesaj Gönder
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5 mr-1.5 text-red-400" /> Mesaj (Karşılıklı Takip)
                  </>
                )}
              </Button>
            )}"""

if target_dm_btn in content:
    content = content.replace(target_dm_btn, replacement_dm_btn)

with open("src/components/UserProfileModal.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("UserProfileModal.tsx updated with mutual DM state!")
