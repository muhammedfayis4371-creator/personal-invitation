import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import AudioPlayerButton from './AudioPlayerButton';

export default function HeroSection({ onRevealDate }) {
  return (
    <section 
      id="hero" 
      className="relative w-full h-[100dvh] min-h-[100dvh] sm:h-auto sm:min-h-0 sm:aspect-[571/1024] overflow-hidden select-none bg-[#241711] flex flex-col items-center justify-between"
    >
      {/* Background Wedding Invitation Artwork */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero_bg.png" 
          alt="Wedding of Fathimathul Fida ♡ Akhib" 
          className="w-full h-full object-cover object-center select-none"
          draggable="false"
        />
        {/* Subtle bottom vignette to ensure the 'Reveal the Date' CTA button stands out with ultra-high contrast */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#160d08]/85 via-[#160d08]/30 to-transparent pointer-events-none" />
      </div>

      {/* Top Header Bar: Ambient Nasheed Audio Toggle */}
      <header className="relative w-full max-w-[430px] flex items-center justify-end z-20 pt-4 px-4">
        <AudioPlayerButton className="shadow-lg backdrop-blur-md bg-[#261710]/80 border-[#C8A882]/60 text-[#FAF7F2]" />
      </header>

      {/* Subtle shimmering ambient sparkle accents */}
      <div className="absolute top-[28%] left-[10%] pointer-events-none animate-pulse opacity-60 z-10">
        <span className="text-[#FBF5B7] text-xs">✦</span>
      </div>
      <div className="absolute top-[46%] right-[12%] pointer-events-none animate-pulse delay-300 opacity-70 z-10">
        <span className="text-[#D4AF37] text-sm">✦</span>
      </div>
      <div className="absolute top-[65%] left-[16%] pointer-events-none animate-pulse delay-700 opacity-60 z-10">
        <span className="text-[#C8A882] text-xs">✧</span>
      </div>

      {/* Bottom Interactive Area: "Reveal the Date" CTA Button */}
      <div className="relative w-full max-w-[430px] flex flex-col items-center justify-center z-20 px-4 pb-7 sm:pb-9">
        <button
          onClick={onRevealDate}
          id="hero-reveal-date-btn"
          type="button"
          className="group relative flex flex-col items-center focus:outline-none transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Reveal the Date and view countdown"
        >
          {/* Opulent Gold Button */}
          <div className="px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-[#20120a]/95 hover:bg-[#2f1b10] text-[#FAF7F2] text-sm sm:text-base font-serif tracking-widest border border-[#D4AF37] shadow-[0_6px_28px_rgba(212,175,55,0.55)] backdrop-blur-md flex items-center gap-2.5 transition-all">
            <Sparkles className="w-4 h-4 text-[#FBF5B7] animate-pulse" />
            <span className="gold-shimmer font-semibold uppercase tracking-wider">Reveal the Date</span>
            <Sparkles className="w-4 h-4 text-[#FBF5B7] animate-pulse" />
          </div>
          <ChevronDown className="w-5 h-5 text-[#D4AF37] animate-bounce mt-2 opacity-95 group-hover:opacity-100" />
        </button>
      </div>
    </section>
  );
}
