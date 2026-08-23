with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write('''import React, { useState, useEffect, useRef } from "react";
import { 
  PLAYLIST, 
  TOUR_DATES, 
  Track, 
  TourDate 
} from "@/data/artists";
import { 
  fetchLiveBubiletConcerts 
} from "@/services/concertService";
import { audioEngine } from "@/audio/engine";
import { AuthService, UserProfile } from "@/services/authService";
import { PlaylistService, SongStats } from "@/services/playlistService";
import { SyncedLyricsService } from "@/services/syncedLyricsService";

import VinylAlbumCard from "@/components/ui/great-ui-vinyl-album-card";
import Character3DScrollShowcase from "@/components/ui/character-3d-scroll-showcase";
import AuthModal from "@/components/AuthModal";
import AdminHub from "@/components/AdminHub";
import RightSidebarDrawer from "@/components/RightSidebarDrawer";
import CommunityMixModal from "@/components/CommunityMixModal";
import ListenTogetherModal from "@/components/ListenTogetherModal";
import SongCommentsDrawer from "@/components/SongCommentsDrawer";
import NewsSection from "@/components/NewsSection";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  FileText,
  Video,
  Ticket,
  X,
  Maximize2,
  ExternalLink,
  Check,
  Repeat,
  Repeat1,
  Shuffle,
  MapPin,
  Calendar,
  Clock,
  Radio,
  Search,
  Sparkles,
  Heart,
  MessageSquare,
  ListMusic,
  User,
  Disc3,
  ShieldCheck
} from "lucide-react";

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(AuthService.getCurrentUser());
  const [activeCategory, setActiveCategory] = useState<"all" | "alliance" | "hits" | "collab">("all");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("all");
  
  // Modals & Drawers state
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);
  const [fullPlayerTab, setFullPlayerTab] = useState<"vinyl" | "video" | "lyrics">("vinyl");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register" | "profile">("login");
  const [isAdminHubOpen, setIsAdminHubOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isMixModalOpen, setIsMixModalOpen] = useState(false);
  const [isListenTogetherOpen, setIsListenTogetherOpen] = useState(false);
  const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);

  const [syncedVersion, setSyncedVersion] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [durationSec, setDurationSec] = useState(180);
  const [volumePct, setVolumePct] = useState(85);

  const [liveConcerts, setLiveConcerts] = useState<TourDate[]>(TOUR_DATES);
  const [isLiveSyncing, setIsLiveSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];
  const [currentStats, setCurrentStats] = useState<SongStats>(PlaylistService.getSongStats(currentTrack.id, currentUser?.id));

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };
''')
print("Part 1 written")
