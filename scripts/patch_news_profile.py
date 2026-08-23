with open("src/components/NewsSection.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add onUserProfileClick to props
content = content.replace("interface NewsSectionProps {\n  onOpenAuthModal?: () => void;\n}", "interface NewsSectionProps {\n  onOpenAuthModal?: () => void;\n  onUserProfileClick?: (userId: string) => void;\n}")
content = content.replace("export default function NewsSection({ onOpenAuthModal }: NewsSectionProps)", "export default function NewsSection({ onOpenAuthModal, onUserProfileClick }: NewsSectionProps)")

# Make comment author clickable
target_news_comment = """                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{c.userDisplayName}</span>
                        <span className="text-[9px] text-neutral-500">{new Date(c.createdAt).toLocaleDateString("tr-TR")}</span>
                      </div>"""

replacement_news_comment = """                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => onUserProfileClick && onUserProfileClick(c.userId)}
                          className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-red-400"
                        >
                          <img src={c.userAvatar || "/assets/images/alliance_cover.jpg"} alt={c.userDisplayName} className="h-4 w-4 rounded-full object-cover" />
                          <span className="hover:underline">{c.userDisplayName}</span>
                        </button>
                        <span className="text-[9px] text-neutral-500">{new Date(c.createdAt).toLocaleDateString("tr-TR")}</span>
                      </div>"""

if target_news_comment in content:
    content = content.replace(target_news_comment, replacement_news_comment)

with open("src/components/NewsSection.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("NewsSection updated with onUserProfileClick")
