with open("src/App.tsx", "a", encoding="utf-8") as f:
    f.write('''
  // Auth state listener
  useEffect(() => {
    const handleAuth = () => {
      setCurrentUser(AuthService.getCurrentUser());
    };
    window.addEventListener("auth-state-changed", handleAuth);
    return () => window.removeEventListener("auth-state-changed", handleAuth);
  }, []);

  // Update song stats
  useEffect(() => {
    setCurrentStats(PlaylistService.getSongStats(currentTrack.id, currentUser?.id));
  }, [currentTrack.id, currentUser?.id]);

  useEffect(() => {
    const handleStats = (e: any) => {
      if (!e.detail?.trackId || e.detail.trackId === currentTrack.id) {
        setCurrentStats(PlaylistService.getSongStats(currentTrack.id, currentUser?.id));
      }
    };
    window.addEventListener("song-stats-updated", handleStats);
    return () => window.removeEventListener("song-stats-updated", handleStats);
  }, [currentTrack.id, currentUser?.id]);

  // Synced lyrics update listener
  useEffect(() => {
    const handleSyncUpdate = () => {
      setSyncedVersion((v) => v + 1);
    };
    window.addEventListener("synced-lyrics-updated", handleSyncUpdate);
    return () => window.removeEventListener("synced-lyrics-updated", handleSyncUpdate);
  }, []);

  const syncConcerts = async () => {
    setIsLiveSyncing(true);
    try {
      const res = await fetchLiveBubiletConcerts(TOUR_DATES);
      const sorted = [...res.data].sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime());
      setLiveConcerts(sorted);
    } catch {
      const sortedFallback = [...TOUR_DATES].sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime());
      setLiveConcerts(sortedFallback);
    } finally {
      setIsLiveSyncing(false);
    }
  };

  useEffect(() => {
    syncConcerts();
  }, []);

  const spectrumCanvasRef = useRef<HTMLCanvasElement>(null);
  const fullSpectrumCanvasRef = useRef<HTMLCanvasElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);

  const currentSyncedLyrics = React.useMemo(() => {
    return SyncedLyricsService.getSyncedLyrics(currentTrack.id, currentTrack.lyrics);
  }, [currentTrack.id, currentTrack.lyrics, syncedVersion]);

  const activeLyricIndex = React.useMemo(() => {
    if (!currentSyncedLyrics || currentSyncedLyrics.length === 0) return -1;
    if (currentTimeSec < currentSyncedLyrics[0].time) return -1;
    let active = 0;
    for (let i = 0; i < currentSyncedLyrics.length; i++) {
      if (currentTimeSec >= currentSyncedLyrics[i].time) {
        active = i;
      } else {
        break;
      }
    }
    return active;
  }, [currentSyncedLyrics, currentTimeSec]);

  useEffect(() => {
    if (isFullPlayerOpen && fullPlayerTab === "lyrics" && lyricsContainerRef.current && activeLyricIndex !== -1) {
      const activeEl = document.getElementById(`lyric-line-${activeLyricIndex}`);
      if (activeEl) {
        const container = lyricsContainerRef.current;
        const targetScroll = activeEl.offsetTop - container.offsetTop - (container.clientHeight / 2) + (activeEl.clientHeight / 2);
        container.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: "smooth"
        });
      }
    }
  }, [activeLyricIndex, isFullPlayerOpen, fullPlayerTab]);

  useEffect(() => {
    audioEngine.setOnTimeUpdate((time) => {
      setCurrentTimeSec(time);
    });

    audioEngine.setOnDurationChange((dur) => {
      setDurationSec(dur > 0 ? dur : currentTrack.duration);
    });

    audioEngine.setOnTrackEnded(() => {
      // Baştan sona dinlendiğinde otomatik sayacı artır
      PlaylistService.incrementFullListen(PLAYLIST[currentTrackIndex].id);

      if (repeatMode === "one") {
        audioEngine.seekToSeconds(0);
        audioEngine.resume();
        setIsPlaying(true);
      } else if (repeatMode === "all") {
        handleNextTrack();
      } else {
        if (currentTrackIndex < PLAYLIST.length - 1) {
          handleNextTrack();
        } else {
          setIsPlaying(false);
          setCurrentTimeSec(0);
        }
      }
    });
  }, [currentTrackIndex, repeatMode]);

  const playTrack = (track: Track) => {
    const idx = PLAYLIST.findIndex((t) => t.id === track.id);
    const targetIdx = idx !== -1 ? idx : 0;
    setCurrentTrackIndex(targetIdx);
    setCurrentTimeSec(0);

    audioEngine.loadTrack(PLAYLIST[targetIdx]);
    audioEngine.startMusic();
    setIsPlaying(true);
  };

  const toggleMasterPlay = () => {
    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      if (currentTimeSec === 0) {
        audioEngine.loadTrack(currentTrack);
        audioEngine.startMusic();
      } else {
        audioEngine.resume();
      }
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    let nextIdx: number;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * PLAYLIST.length);
    } else {
      nextIdx = (currentTrackIndex + 1) % PLAYLIST.length;
    }
    setCurrentTrackIndex(nextIdx);
    setCurrentTimeSec(0);
    audioEngine.loadTrack(PLAYLIST[nextIdx]);
    audioEngine.startMusic();
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    let prevIdx = currentTrackIndex - 1;
    if (prevIdx < 0) prevIdx = PLAYLIST.length - 1;
    setCurrentTrackIndex(prevIdx);
    setCurrentTimeSec(0);
    audioEngine.loadTrack(PLAYLIST[prevIdx]);
    audioEngine.startMusic();
    setIsPlaying(true);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    triggerToast(isShuffle ? "Karışık Çalma: KAPALI" : "Karışık Çalma: AÇIK");
  };

  const toggleRepeatMode = () => {
    if (repeatMode === "off") {
      setRepeatMode("all");
      triggerToast("Tekrar Modu: TÜM ŞARKILAR");
    } else if (repeatMode === "all") {
      setRepeatMode("one");
      triggerToast("Tekrar Modu: TEK ŞARKI");
    } else {
      setRepeatMode("off");
      triggerToast("Tekrar Modu: KAPALI");
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      audioEngine.setVolume(volumePct / 100);
      setIsMuted(false);
    } else {
      audioEngine.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (pct: number) => {
    setVolumePct(pct);
    setIsMuted(pct === 0);
    audioEngine.setVolume(pct / 100);
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pct = parseFloat(e.target.value);
    const targetSec = (pct / 100) * durationSec;
    setCurrentTimeSec(targetSec);
    audioEngine.seekToSeconds(targetSec);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = durationSec > 0 ? Math.min(100, (currentTimeSec / durationSec) * 100) : 0;
''')
print("Part 2 written")
