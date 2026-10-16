import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

export default function AudioPlayerButton({ className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((active) => {
      setIsPlaying(active);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = async () => {
    setHasInteracted(true);
    await weddingAudio.toggle();
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      id="audio-toggle-btn"
      aria-label={isPlaying ? "Mute ambient nasheed" : "Play ambient nasheed"}
      className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-md ${
        isPlaying
          ? 'bg-[#3E2723]/90 text-[#FDFBF7] border border-[#D4AF37]/60 ring-2 ring-[#D4AF37]/30'
          : 'bg-[#FDFBF7]/85 text-[#5D4037] border border-[#C8A882]/40 hover:bg-[#FDFBF7]'
      } ${className}`}
      title={isPlaying ? "Pause ambient sound" : "Play ambient nasheed"}
    >
      {/* Icon */}
      {isPlaying ? (
        <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
      ) : (
        <VolumeX className="w-4 h-4 text-[#8D6E63] group-hover:text-[#3E2723]" />
      )}

      {/* Animated Equalizer Wave Bars */}
      {isPlaying ? (
        <div className="flex items-end gap-[2.5px] h-3.5 w-4.5 px-0.5">
          <span className="w-1 bg-[#D4AF37] rounded-full wave-bar-1" />
          <span className="w-1 bg-[#FBF5B7] rounded-full wave-bar-2" />
          <span className="w-1 bg-[#D4AF37] rounded-full wave-bar-3" />
        </div>
      ) : (
        <span className="text-[11px] font-medium tracking-wide uppercase font-sans">
          Audio
        </span>
      )}

      {/* Floating prompt pulse if not yet played */}
      {!hasInteracted && !isPlaying && (
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C8A882]"></span>
        </span>
      )}
    </button>
  );
}
