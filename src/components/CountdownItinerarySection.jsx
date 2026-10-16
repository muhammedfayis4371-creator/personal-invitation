import React, { useState, useEffect } from 'react';
import { ChevronDown, Clock, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import ArabesqueCorner from './ArabesqueCorner';

export default function CountdownItinerarySection({ onScrollToAttendance, isPopped = false }) {
  // Target: November 28, 2026 17:00:00 (5:00 PM Reception)
  const targetDate = new Date('2026-11-28T17:00:00');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="itinerary" 
      className={`relative w-full bg-[#FAF7F2] text-[#3E2723] px-6 py-14 border-t border-[#E8DDD0] overflow-hidden select-none transition-all duration-700 ${
        isPopped ? 'animate-pop-highlight ring-4 ring-[#D4AF37]/40' : ''
      }`}
    >
      {/* Decorative Arabesque Corners */}
      <ArabesqueCorner position="top-left" size={60} color="#C8A882" />
      <ArabesqueCorner position="top-right" size={60} color="#C8A882" />
      <ArabesqueCorner position="bottom-left" size={60} color="#C8A882" />
      <ArabesqueCorner position="bottom-right" size={60} color="#C8A882" />

      {/* Floating ambient luxury gold dust particles */}
      <div className="absolute top-1/4 left-6 pointer-events-none gold-particle-1 text-[#D4AF37] text-xs">✦</div>
      <div className="absolute top-2/3 right-6 pointer-events-none gold-particle-2 text-[#C8A882] text-sm">✧</div>

      <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center">
        {/* Date Header */}
        <div className="flex flex-col items-center">
          {isPopped && (
            <div className="mb-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[#3E2723] text-[11px] font-sans tracking-widest uppercase font-bold flex items-center gap-1.5 shadow-sm animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-[#B38728]" />
              <span className="gold-shimmer font-semibold">Date Revealed</span>
              <Sparkles className="w-3.5 h-3.5 text-[#B38728]" />
            </div>
          )}
          <p className="text-[#8D6E63] text-xs font-sans tracking-[0.28em] uppercase font-semibold mb-1">
            THE WEDDING CELEBRATION
          </p>
          <h2 
            className="font-serif text-[30px] sm:text-[34px] text-[#3E2723] font-normal tracking-wide"
            style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}
          >
            28 NOVEMBER 2026
          </h2>
        </div>

        {/* PROMINENT "DAYS LEFT" HIGHLIGHT BANNER */}
        <div className="my-3 text-center w-full">
          <div className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-linear-to-r from-[#D4AF37]/20 via-[#B38728]/35 to-[#D4AF37]/20 border-2 border-[#D4AF37] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#B38728] animate-pulse" />
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2723] tracking-wide">
              {timeLeft.days} Days Left
            </span>
            <Sparkles className="w-4 h-4 text-[#B38728] animate-pulse" />
          </div>
          <p className="text-[11px] text-[#8D6E63] font-sans mt-1 font-medium">
            until the wedding celebration InshaAllah
          </p>
        </div>

        {/* Real-time Ticking Countdown with 4 Dedicated Grid Cards */}
        <div className="w-full my-4">
          <div className="grid grid-cols-4 gap-2">
            {/* Days Box */}
            <div className="flex flex-col items-center bg-white/95 py-3 px-1 rounded-2xl border-2 border-[#C8A882]/70 shadow-sm">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2723] tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#8D6E63] mt-1">
                Days Left
              </span>
            </div>

            {/* Hours Box */}
            <div className="flex flex-col items-center bg-white/90 py-3 px-1 rounded-2xl border border-[#C8A882]/40 shadow-xs">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2723] tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-[#8D6E63] mt-1">
                Hours
              </span>
            </div>

            {/* Minutes Box */}
            <div className="flex flex-col items-center bg-white/90 py-3 px-1 rounded-2xl border border-[#C8A882]/40 shadow-xs">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2723] tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-[#8D6E63] mt-1">
                Minutes
              </span>
            </div>

            {/* Seconds Box */}
            <div className="flex flex-col items-center bg-white/90 py-3 px-1 rounded-2xl border border-[#C8A882]/40 shadow-xs">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37] tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-[#8D6E63] mt-1">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Vertical Dotted Itinerary Timeline - Only Reception 5:00 PM to 9:00 PM */}
        <div className="relative w-full max-w-[280px] my-6 flex flex-col items-center">
          <div className="w-[1.5px] h-6 border-l-2 border-dotted border-[#C8A882]/70 mb-2" />

          {/* Reception with Stagger Reveal */}
          <div className="text-center group reveal-init delay-225 w-full bg-white/60 p-4 rounded-2xl border border-[#C8A882]/30 shadow-xs">
            <p className="text-[11px] font-sans tracking-[0.2em] text-[#8D6E63] uppercase font-semibold mb-1">
              Grand Evening Celebration
            </p>
            <h3 
              className="font-serif text-[28px] sm:text-[30px] text-[#3E2723] font-normal leading-snug"
              style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}
            >
              Wedding Reception
            </h3>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#5D4037] font-sans mt-1.5">
              <span className="font-bold text-[#3E2723] bg-[#C8A882]/20 px-2.5 py-0.5 rounded-full border border-[#C8A882]/40">
                5:00 PM – 9:00 PM
              </span>
            </div>
            <p className="text-xs text-[#5D4037] font-sans mt-2 font-medium">
              Grand Feast, Fellowship & Celebrations
            </p>
            <p className="text-[10px] text-[#8D6E63]/80 font-sans mt-1">
              We look forward to celebrating this blessed evening together!
            </p>
          </div>

          <div className="w-[1.5px] h-6 border-l-2 border-dotted border-[#C8A882]/70 mt-2" />
        </div>

        {/* Smooth Transition CTA Button to Page 3: Attendance */}
        <div className="mt-4 reveal-scale-init delay-450">
          <button
            onClick={onScrollToAttendance}
            id="countdown-to-attendance-btn"
            type="button"
            className="group flex flex-col items-center gap-1.5 focus:outline-none transition-transform duration-200 active:scale-95"
          >
            <div className="px-6 py-2.5 rounded-full bg-[#3E2723] hover:bg-[#2E1C14] text-[#FAF7F2] text-xs font-sans font-medium tracking-wide border border-[#C8A882]/50 shadow-md flex items-center gap-2">
              <span>Confirm Your Attendance</span>
            </div>
            <ChevronDown className="w-5 h-5 text-[#8D6E63] animate-bounce opacity-80 group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </section>
  );
}
