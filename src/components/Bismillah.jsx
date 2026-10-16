import React from 'react';

export default function Bismillah({ className = '', size = 'lg', light = true }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      {/* Traditional Calligraphy Graphic Accent */}
      <div className="relative group">
        <h2 
          className={`font-arabic text-[#D4AF37] tracking-wider leading-relaxed transition-all duration-300 drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] ${
            size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl'
          } ${light ? 'text-[#E8D3B0]' : 'text-[#3E2723]'}`}
          dir="rtl"
          lang="ar"
          style={{
            fontFamily: '"Amiri", "Scheherazade New", serif',
            textShadow: light ? '0 2px 10px rgba(212, 175, 55, 0.45)' : 'none'
          }}
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </h2>
      </div>

      {/* Decorative divider under Bismillah */}
      <div className="flex items-center justify-center gap-2 mt-1 opacity-70">
        <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#C8A882]" />
        <span className="text-[#C8A882] text-xs">✦</span>
        <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#C8A882]" />
      </div>
    </div>
  );
}
