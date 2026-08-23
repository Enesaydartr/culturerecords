code = """import React, { useState } from "react";
import { AuthService } from "@/services/authService";
import { PLAYLIST } from "@/data/artists";
import { MixService, CommunityMix } from "@/services/mixService";
import { Button } from "@/components/ui/button";
import { X, Sparkles, Music, Upload, Check, AlertCircle } from "lucide-react";

interface CommunityMixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMixCreated?: (mix: CommunityMix) => void;
}

const MIX_COVER_PRESETS = [
  "/assets/images/alliance_cover.jpg",
  "/assets/images/eray_mansur_alliance.jpg",
  "/assets/images/eray067_portrait.jpg",
  "/assets/images/mansur_portrait.jpg",
  "/assets/images/g_wagon.jpg",
  "/assets/images/balmain.jpg"
];

export default function CommunityMixModal({ isOpen, onClose, onMixCreated }: CommunityMixModalProps) {
  const currentUser = AuthService.getCurrentUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(MIX_COVER_PRESETS[0]);
  const [selectedTracks, setSelectedTracks] = useState<string[]>(["bak_ne_dicem"]);
  const [customAudioUrl, setCustomAudioUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleTrack = (trackId: string) => {
    if (selectedTracks.includes(trackId)) {
      if (selectedTracks.length === 1) {
        setErrorMessage("Mixte en az bir ERAY067 veya MANSUR şarkısı seçilmelidir!");
        return;
      }
      setSelectedTracks(selectedTracks.filter((id) => id !== trackId));
    } else {
      setSelectedTracks([...selectedTracks, trackId]);
      setErrorMessage(null);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Mix paylaşabilmek için lütfen önce giriş yapın!");
      return;
    }

    if (!title.trim()) {
      setErrorMessage("Lütfen mixinize bir isim verin.");
      return;
    }

    if (selectedTracks.length === 0) {
      setErrorMessage("Mixte en az bir ERAY067 veya MANSUR şarkısı kullanılmalıdır!");
      return;
    }

    // Determine artists used
    const artistsUsed = new Set<string>();
    selectedTracks.forEach((id) => {
      const tr = PLAYLIST.find((t) => t.id === id);
      if (tr) {
        if (tr.artist.includes("ERAY067")) artistsUsed.add("ERAY067");
        if (tr.artist.includes("MANSUR")) artistsUsed.add("MANSUR");
      }
    });

    const res = MixService.createMix({
      title: title.trim(),
      description: description.trim(),
      coverImage,
      audioUrl: customAudioUrl || ("/assets/audio/" + selectedTracks[0] + ".mp4"),
      creatorId: currentUser.id,
      creatorName: currentUser.displayName,
      creatorAvatar: currentUser.avatar,
      usedTrackIds: selectedTracks,
      usedArtists: Array.from(artistsUsed)
    });

    if (res.success && res.mix) {
      if (onMixCreated) onMixCreated(res.mix);
      onClose();
      alert("Mixiniz başarıyla paylaşıldı ve topluluk vitrinine eklendi!");
    } else {
      setErrorMessage(res.error || "Mix oluşturulamadı.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 font-mono">
      <div className="relative w-full max-w-xl border border-white/15 bg-[#0a0a0a] shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-red-600 text-white flex items-center justify-center font-black text-sm shadow-md">
              🎧
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                YENİ MİX / MASHUP PAYLAŞ
              </h2>
              <p className="text-[11px] text-neutral-400">
                1:1 kapak resmi ve ERAY067 × MANSUR şarkılarıyla kendi miksinizi oluşturun.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="text-neutral-400 hover:text-white p-1 hover:bg-white/10 transition-colors"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-5">
          {/* Mix Name */}
          <div>
            <label className="text-[11px] font-bold text-neutral-300 uppercase block mb-1.5">
              Mix Başlığı: *
            </label>
            <input
              type="text"
              required
              placeholder="Örn: G WAGON × BRAPAP (Drill Club Remix)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black border border-white/15 text-white text-xs p-3 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Mandatory ERAY067 / MANSUR Track Selector */}
          <div>
            <label className="text-[11px] font-bold text-red-400 uppercase block mb-1">
              Kullanılan ERAY067 × MANSUR Şarkıları: * (En az 1 tane seçilmelidir)
            </label>
            <p className="text-[10px] text-neutral-400 mb-2">
              Mixinizde yer alan resmi parçaları işaretleyin:
            </p>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border border-white/10 bg-black/50">
              {PLAYLIST.map((t) => {
                const isSelected = selectedTracks.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleTrack(t.id)}
                    className={`flex items-center gap-2 p-2 text-left text-xs transition-all border ${
                      isSelected
                        ? "border-red-500 bg-red-600/20 text-white font-bold"
                        : "border-white/5 bg-black/40 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <div className={`h-4 w-4 border flex items-center justify-center text-[10px] ${
                      isSelected ? "border-red-500 bg-red-600 text-white" : "border-white/20"
                    }`}>
                      {isSelected ? "✓" : ""}
                    </div>
                    <span className="truncate">{t.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 1:1 Cover Image Selector */}
          <div>
            <label className="text-[11px] font-bold text-neutral-300 uppercase block mb-1.5">
              1:1 Formatında Kapak Görseli:
            </label>
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 border border-white/20 overflow-hidden shrink-0 aspect-square">
                <img src={coverImage} alt="Cover preview" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {MIX_COVER_PRESETS.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCoverImage(img)}
                      className={`h-8 w-8 border overflow-hidden aspect-square ${
                        coverImage === img ? "border-red-500 scale-105" : "border-white/10 opacity-60"
                      }`}
                    >
                      <img src={img} alt="preset" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="veya özel görsel URL girin"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full bg-black border border-white/15 text-white text-[11px] p-1.5 focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-[11px] font-bold text-neutral-300 uppercase block mb-1">
              Açıklama (İsteğe Bağlı):
            </label>
            <textarea
              rows={2}
              placeholder="Mix hakkında bilgi verin (BPM, tür, ilham kaynağı)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black border border-white/15 text-white text-xs p-2.5 focus:border-red-500 focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase py-3.5 rounded-none shadow-lg shadow-red-600/30 tracking-widest"
          >
            MİXİ YAYINLA & PAYLAŞ ➔
          </Button>
        </form>

      </div>
    </div>
  );
}
"""

with open("src/components/CommunityMixModal.tsx", "w", encoding="utf-8") as f:
    f.write(code)
print("CommunityMixModal.tsx written successfully")
