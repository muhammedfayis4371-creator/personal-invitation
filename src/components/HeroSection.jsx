import React from 'react';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';
import AudioPlayerButton from './AudioPlayerButton';

export default function HeroSection({ 
  onRevealDate, 
  isFallingLove = true, 
  onToggleFallingLove 
}) {
  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[100dvh] h-[100dvh] overflow-hidden select-none bg-[#261710] flex flex-col items-center justify-between"
    >
      {/* Container restricted to mobile frame max-w-[430px] */}
      <div className="relative w-full max-w-[430px] h-full flex flex-col items-center justify-between">
        {/* The Exact User-Provided Wedding Invitation Image */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <img 
            src="/hero_invitation.jpg" 
            alt="Wedding of Fathimathul Fida ♡ Akhib" 
            className="w-full h-full object-contain select-none"
            draggable="false"
          />
        </div>

        {/* Ambient Nasheed Audio Toggle placed seamlessly at top right */}
        <div className="absolute top-4 right-4 z-20">
          <AudioPlayerButton className="shadow-lg backdrop-blur-md bg-[#261710]/80 border-[#C8A882]/60 text-[#FAF7F2]" />
        </div>

        {/* Quick Falling Love Effect Toggle placed at top left */}
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={onToggleFallingLove}
            id="top-falling-love-btn"
            type="button"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-md text-xs font-sans cursor-pointer ${
              isFallingLove
                ? 'bg-[#2A1810]/90 text-[#FDFBF7] border border-[#D4AF37]/70 ring-1 ring-[#FF69B4]/40 shadow-[0_2px_12px_rgba(255,105,180,0.3)]'
                : 'bg-[#FDFBF7]/85 text-[#5D4037] border border-[#C8A882]/40 hover:bg-[#FDFBF7]'
            }`}
            title={isFallingLove ? "Turn off Falling Love effect" : "Turn on Falling Love effect"}
            aria-label="Toggle falling love hearts effect"
          >
            <Heart 
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                isFallingLove ? 'text-[#FF69B4] fill-[#FF69B4] scale-110 animate-pulse' : 'text-[#8D6E63]'
              }`} 
            />
            <span className="text-[11px] font-medium tracking-wide">
              {isFallingLove ? 'Love Effect' : 'Love Off'}
            </span>
          </button>
        </div>

        {/* Subtle shimmering ambient sparkle accents */}
        <div className="absolute top-[28%] left-[10%] pointer-events-none animate-pulse opacity-60">
          <span className="text-[#FBF5B7] text-xs">✦</span>
        </div>
        <div className="absolute top-[46%] right-[12%] pointer-events-none animate-pulse delay-300 opacity-70">
          <span className="text-[#D4AF37] text-sm">✦</span>
        </div>
        <div className="absolute top-[65%] left-[16%] pointer-events-none animate-pulse delay-700 opacity-60">
          <span className="text-[#C8A882] text-xs">✧</span>
        </div>

        {/* Interactive Clickable Area: "Reveal the Date" and "Falling Love Effect" */}
        <div className="absolute bottom-4 sm:bottom-6 inset-x-0 flex flex-col items-center justify-center z-20 px-4">
          {/* Main "Reveal the Date" Button */}
          <button
            onClick={onRevealDate}
            id="hero-reveal-date-btn"
            type="button"
            className="group relative flex flex-col items-center focus:outline-none transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Reveal the Date and view countdown"
          >
            {/* Opulent Gold Button */}
            <div className="px-6 py-2.5 rounded-full bg-[#2E1A12]/95 hover:bg-[#3E2723] text-[#FAF7F2] text-xs sm:text-sm font-serif tracking-widest border border-[#D4AF37]/80 shadow-[0_4px_18px_rgba(212,175,55,0.4)] backdrop-blur-md flex items-center gap-2 transition-all">
              <Sparkles className="w-3.5 h-3.5 text-[#FBF5B7] animate-pulse" />
              <span className="gold-shimmer font-semibold uppercase tracking-wider">Reveal the Date</span>
              <Sparkles className="w-3.5 h-3.5 text-[#FBF5B7] animate-pulse" />
            </div>
            <ChevronDown className="w-4 h-4 text-[#E8D3B0] animate-bounce mt-1 opacity-90 group-hover:opacity-100" />
          </button>

          {/* Additional Option for Effect Falling Love */}
          <button
            onClick={onToggleFallingLove}
            id="hero-toggle-falling-love-btn"
            type="button"
            className="mt-1 px-3 py-0.5 rounded-full bg-[#2A1810]/80 hover:bg-[#3E2723] text-[#FAF7F2] text-[10px] font-sans tracking-wide border border-[#C8A882]/40 shadow-xs backdrop-blur-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            aria-label="Toggle Falling Love effect"
          >
            <Heart 
              className={`w-2.5 h-2.5 transition-colors ${
                isFallingLove ? 'text-[#FF69B4] fill-[#FF69B4]' : 'text-[#C8A882]'
              }`} 
            />
            <span className="text-[#E8DDD0]">
              Effect Falling Love: <strong className={isFallingLove ? 'text-[#FFD1DC]' : 'text-[#8D6E63]'}>{isFallingLove ? 'ON' : 'OFF'}</strong>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
