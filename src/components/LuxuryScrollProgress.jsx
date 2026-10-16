import React, { useState, useEffect } from 'react';

export default function LuxuryScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      aria-hidden="true" 
      className="fixed top-0 inset-x-0 mx-auto w-full max-w-[430px] z-50 pointer-events-none h-1"
    >
      {/* Background track */}
      <div className="w-full h-[2px] bg-black/5" />

      {/* Luxury gold gradient progress line */}
      <div 
        className="h-[2.5px] bg-gradient-to-r from-[#DFBE99] via-[#D4AF37] to-[#B38728] transition-all duration-150 ease-out relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Glowing jewel sparkle dot at the head */}
        {scrollProgress > 2 && (
          <span className="absolute -top-[5px] -right-[5px] flex h-3 w-3 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FBF5B7] shadow-[0_0_8px_#D4AF37]"></span>
          </span>
        )}
      </div>
    </div>
  );
}
