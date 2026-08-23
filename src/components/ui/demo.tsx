import VinylAlbumCard from "@/components/ui/great-ui-vinyl-album-card"
import { GlassmorphismListenAppBlock } from "@/components/ui/glassmorphism-listen-app-block-shadcnui"

export default function Demo() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 bg-background p-6">
      <VinylAlbumCard />
      <GlassmorphismListenAppBlock />
    </div>
  )
}
