import os

with open("src/components/RightSidebarDrawer.tsx", "w", encoding="utf-8") as f:
    f.write('''import React, { useState, useEffect, useRef } from "react";
import { AuthService, UserProfile } from "@/services/authService";
import { PLAYLIST, Track } from "@/data/artists";
import { PlaylistService, UserPlaylist } from "@/services/playlistService";
import { MixService, CommunityMix } from "@/services/mixService";
import { SocialService, ChatMessage } from "@/services/socialService";
import { Button } from "@/components/ui/button";
import {
  X, ListMusic, Disc3, MessageSquare, Radio, Plus, Play, Heart, Headphones,
  Send, Image as ImageIcon, Music, Search, GripVertical, Trash2, Sparkles, ChevronRight
} from "lucide-react";

interface RightSidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackPlay?: (track: Track) => void;
  onOpenMixModal?: () => void;
  onOpenListenTogether?: () => void;
  onOpenAuthModal?: () => void;
}

export default function RightSidebarDrawer({
  isOpen, onClose, onTrackPlay, onOpenMixModal, onOpenListenTogether, onOpenAuthModal
}: RightSidebarDrawerProps) {
  const currentUser = AuthService.getCurrentUser();
  const [activeTab, setActiveTab] = useState<"playlists" | "mixes" | "chat">("playlists");

  const [playlists, setPlaylists] = useState<UserPlaylist[]>(PlaylistService.getAllPlaylists());
  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(null);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const [mixSort, setMixSort] = useState<"popular" | "liked" | "newest">("popular");
  const [mixes, setMixes] = useState<CommunityMix[]>(MixService.getAllMixes("popular"));

  const [chatSubTab, setChatSubTab] = useState<"global" | "dm" | "users">("global");
  const [globalRoom, setGlobalRoom] = useState<string>("general");
  const [globalMessages, setGlobalMessages] = useState<ChatMessage[]>(SocialService.getGlobalMessages("general"));
  const [chatInputText, setChatInputText] = useState("");
  const [chatImageUrl, setChatImageUrl] = useState("");
  const [selectedShareTrackId, setSelectedShareTrackId] = useState("");
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const [selectedDmUser, setSelectedDmUser] = useState<UserProfile | null>(null);
  const [dmThread, setDmThread] = useState<ChatMessage[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPlaylists(PlaylistService.getAllPlaylists());
    setMixes(MixService.getAllMixes(mixSort));
    setGlobalMessages(SocialService.getGlobalMessages(globalRoom));
  }, [isOpen, mixSort, globalRoom]);

  useEffect(() => {
    const handlePlUpdate = () => setPlaylists(PlaylistService.getAllPlaylists());
    const handleMixUpdate = () => setMixes(MixService.getAllMixes(mixSort));
    const handleChatUpdate = () => setGlobalMessages(SocialService.getGlobalMessages(globalRoom));

    window.addEventListener("playlists-updated", handlePlUpdate);
    window.addEventListener("mixes-updated", handleMixUpdate);
    window.addEventListener("global-chat-updated", handleChatUpdate);

    return () => {
      window.removeEventListener("playlists-updated", handlePlUpdate);
      window.removeEventListener("mixes-updated", handleMixUpdate);
      window.removeEventListener("global-chat-updated", handleChatUpdate);
    };
  }, [mixSort, globalRoom]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [globalMessages, dmThread]);

  if (!isOpen) return null;

  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }
    if (!newPlaylistTitle.trim()) return;

    const pl = PlaylistService.createPlaylist({
      title: newPlaylistTitle.trim(),
      ownerId: currentUser.id,
      ownerName: currentUser.displayName,
      ownerAvatar: currentUser.avatar,
      initialTrackIds: ["bak_ne_dicem", "nafile"]
    });

    setPlaylists(PlaylistService.getAllPlaylists());
    setActivePlaylistId(pl.id);
    setNewPlaylistTitle("");
    setIsCreatingPlaylist(false);
  };

  const handleDragStart = (index: number) => setDraggedIndex(index);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (playlistId: string, dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    PlaylistService.reorderTracks(playlistId, draggedIndex, dropIndex);
    setPlaylists(PlaylistService.getAllPlaylists());
    setDraggedIndex(null);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }
    if (!chatInputText.trim() && !chatImageUrl && !selectedShareTrackId) return;

    const shareTrack = PLAYLIST.find((t) => t.id === selectedShareTrackId);

    if (chatSubTab === "global") {
      SocialService.sendGlobalMessage({
        roomId: globalRoom,
        senderId: currentUser.id,
        senderName: currentUser.displayName,
        senderAvatar: currentUser.avatar,
        senderRole: currentUser.role,
        text: chatInputText.trim() || undefined,
        imageUrl: chatImageUrl.trim() || undefined,
        trackId: shareTrack?.id,
        trackTitle: shareTrack ? (shareTrack.title + " — " + shareTrack.artist) : undefined
      });
      setGlobalMessages(SocialService.getGlobalMessages(globalRoom));
    } else if (chatSubTab === "dm" && selectedDmUser) {
      SocialService.sendDirectMessage({
        senderId: currentUser.id,
        senderName: currentUser.displayName,
        senderAvatar: currentUser.avatar,
        senderRole: currentUser.role,
        recipientId: selectedDmUser.id,
        text: chatInputText.trim() || undefined,
        imageUrl: chatImageUrl.trim() || undefined,
        trackId: shareTrack?.id,
        trackTitle: shareTrack ? (shareTrack.title + " — " + shareTrack.artist) : undefined
      });
      setDmThread(SocialService.getDirectMessages(currentUser.id, selectedDmUser.id));
    }

    setChatInputText("");
    setChatImageUrl("");
    setSelectedShareTrackId("");
    setShowAttachMenu(false);
  };

  const activePlaylist = playlists.find((p) => p.id === activePlaylistId);
  const searchedUsers = AuthService.searchUsers(userSearchQuery);
''')
