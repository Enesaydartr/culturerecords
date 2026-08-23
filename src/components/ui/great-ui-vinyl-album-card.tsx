"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface VinylAlbumCardProps {
  title?: string;
  artist?: string;
  coverImage?: string;
  isPlaying?: boolean;
  onPlayClick?: () => void;
}

export default function VinylAlbumCard({
  title = "NAFİLE",
  artist = "ERAY067 & MANSUR",
  coverImage = "/assets/images/nafile.jpg",
  isPlaying = false,
  onPlayClick,
}: VinylAlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex w-full max-w-[420px] flex-col items-center justify-center select-none cursor-pointer py-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onPlayClick}
    >
      <div className="relative z-10 flex h-64 w-64 sm:h-72 sm:w-72 items-center justify-center">
        {/* VINYL DISC */}
        <motion.div
          className="absolute flex h-64 w-64 sm:h-72 sm:w-72 items-center justify-center overflow-hidden rounded-full border border-neutral-800 bg-[#0d0d0d] shadow-2xl"
          initial={{ x: 0, rotate: 0 }}
          animate={{
            x: isHovered || isPlaying ? 100 : 0,
            rotate: isPlaying ? [0, 360] : isHovered ? 180 : 0,
          }}
          transition={
            isPlaying
              ? { rotate: { repeat: Infinity, duration: 4, ease: "linear" }, x: { type: "spring", stiffness: 80, damping: 15 } }
              : { type: "spring", stiffness: 80, damping: 15, mass: 1 }
          }
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-2 rounded-full border border-white/[0.07]" />
          <div className="absolute inset-5 rounded-full border border-white/[0.05]" />
          <div className="absolute inset-8 rounded-full border border-white/[0.07]" />
          <div className="absolute inset-12 rounded-full border border-white/[0.05]" />
          <div className="absolute inset-16 rounded-full border border-white/[0.07]" />
          <div className="absolute inset-20 rounded-full border border-white/[0.05]" />

          {/* Center Label (1:1 Cover Art) */}
          <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-black shadow-inner border border-white/20">
            <img
              src={coverImage}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover scale-[1.08]"
            />
            {/* Center Spindle Hole */}
            <div className="z-10 h-3.5 w-3.5 rounded-full bg-black shadow-inner ring-1 ring-white/30" />
          </div>

          {/* Subtle Vinyl Sheen */}
          <div className="pointer-events-none absolute inset-0 rotate-45 bg-gradient-to-tr from-white/[0.08] via-transparent to-white/[0.08] mix-blend-overlay" />
        </motion.div>

        {/* 1:1 SQUARE ALBUM SLEEVE */}
        <motion.div
          className="absolute z-20 h-64 w-64 sm:h-72 sm:w-72 overflow-hidden border border-white/15 bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          initial={{ rotate: 0, scale: 1, x: 0 }}
          animate={{
            rotate: isHovered || isPlaying ? -3 : 0,
            scale: isHovered || isPlaying ? 0.98 : 1,
            x: isHovered || isPlaying ? -18 : 0,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        >
          <img
            src={coverImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        </motion.div>
      </div>

      {/* ONLY SONG TITLE & ARTIST (NO BPM, NO EXTRA DURATION/LP CLUTTER) */}
      <div className="z-20 mt-6 flex w-full flex-col text-center px-4">
        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white truncate">
          {title}
        </h3>
        <p className="mt-1 font-mono text-sm font-semibold text-neutral-400 truncate">
          {artist}
        </p>
      </div>
    </div>
  );
}
