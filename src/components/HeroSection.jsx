import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import AudioPlayerButton from './AudioPlayerButton';

export default function HeroSection({ 
  onRevealDate, 
  isRevealed = false
}) {
  return (
    <section 
      id="hero" 
      className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden select-none bg-gradient-to-b from-[#180f0a] via-[#241711] to-[#120a06] flex flex-col justify-between items-center p-2.5 sm:p-4"
    >
      {/* Ambient background gold dust sparkles */}
      <div className="absolute top-[18%] left-[8%] pointer-events-none animate-pulse opacity-60">
        <span className="text-[#FBF5B7] text-xs">✦</span>
      </div>
      <div className="absolute top-[38%] right-[8%] pointer-events-none animate-pulse delay-300 opacity-70">
        <span className="text-[#D4AF37] text-sm">✦</span>
      </div>
      <div className="absolute top-[62%] left-[10%] pointer-events-none animate-pulse delay-700 opacity-60">
        <span className="text-[#C8A882] text-xs">✧</span>
      </div>
      <div className="absolute bottom-[16%] right-[12%] pointer-events-none animate-pulse delay-500 opacity-60">
        <span className="text-[#FBF5B7] text-xs">✦</span>
      </div>

      {/* Top Header Bar: Luxury Badge + Audio Player */}
      <header className="w-full max-w-[400px] flex items-center justify-between z-30 pt-1 px-1">
        {/* Luxury Islamic Arabic Greeting Ornament */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E1A12]/80 border border-[#D4AF37]/30 text-[11px] text-[#E8D3B0] tracking-widest uppercase font-serif backdrop-blur-xs shadow-xs">
          <span className="text-[#D4AF37]">✦</span>
          <span>Wedding Invitation</span>
          <span className="text-[#D4AF37]">✦</span>
        </div>

        {/* Ambient Nasheed Audio Toggle placed seamlessly at top right */}
        <AudioPlayerButton className="shadow-lg backdrop-blur-md bg-[#261710]/90 border-[#C8A882]/60 text-[#FAF7F2]" />
      </header>

      {/* Centerpiece: Authentic Invitation Card with responsive scaling */}
      <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-0 py-1">
        <div className="relative max-w-[390px] w-full max-h-[calc(100dvh-105px)] aspect-[764/1024] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-[#D4AF37]/50 ring-1 ring-[#C8A882]/20">
          {/* The Exact User-Provided Wedding Invitation Image */}
          <img 
            src="/hero_invitation.jpg" 
            alt="Wedding of Fathimathul Fida ♡ Akhib" 
            className="w-full h-full object-cover select-none"
            draggable="false"
          />

          {/* Interactive Button perfectly positioned over original 'Will You Join Us?' */}
          <div className="absolute bottom-[3.8%] sm:bottom-[4.5%] inset-x-0 flex flex-col items-center justify-center z-20 px-3">
            {/* Main "Reveal the Date" Button */}
            <button
              onClick={onRevealDate}
              id="hero-reveal-date-btn"
              type="button"
              className="group relative flex flex-col items-center focus:outline-none transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Reveal the Date and view countdown"
            >
              {/* Opulent Gold Button */}
              <div className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#20130e]/95 hover:bg-[#321c14] text-[#FAF7F2] text-xs sm:text-sm font-serif tracking-widest border border-[#D4AF37] shadow-[0_4px_22px_rgba(212,175,55,0.55)] backdrop-blur-md flex items-center gap-2 transition-all">
                <Sparkles className="w-3.5 h-3.5 text-[#FBF5B7] animate-pulse" />
                <span className="gold-shimmer font-semibold uppercase tracking-wider">Reveal the Date</span>
                <Sparkles className="w-3.5 h-3.5 text-[#FBF5B7] animate-pulse" />
              </div>
              <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce mt-1.5 opacity-90 group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Guidance */}
      <footer className="w-full max-w-[400px] flex items-center justify-center z-30 pb-0.5 text-center">
        <button 
          onClick={onRevealDate}
          type="button"
          className="text-[11px] text-[#C8A882]/90 hover:text-[#FAF7F2] tracking-wider transition-colors font-sans flex items-center gap-1.5 cursor-pointer py-1"
        >
          <span>Click above to reveal Date & Countdown</span>
          <span className="text-[#D4AF37]">▾</span>
        </button>
      </footer>
    </section>
  );
}
