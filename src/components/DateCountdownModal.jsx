import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Sparkles, Heart } from 'lucide-react';
import ArabesqueCorner from './ArabesqueCorner';

export default function DateCountdownModal({ isOpen, onClose, onScrollToAttendance }) {
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

  if (!isOpen) return null;

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Wedding Reception of Fathimathul Fida ♡ Akhib");
    const details = encodeURIComponent(
      "Two hearts, one beautiful journey, blessed by Allah.\n\n" +
      "Itinerary:\n" +
      "• 05:00 PM – 09:00 PM: Wedding Reception Banquet\n\n" +
      "Venue: Khadeejas (Home)\n" +
      "Address: Chathoth Peedika, MHGX+226, Eramala, Kerala 673501\n" +
      "Coordinates: 11°40'26.0\"N 75°35'54.2\"E\n" +
      "Map: https://maps.app.goo.gl/5a4szWqy7FoVZMiy7"
    );
    const location = encodeURIComponent("Khadeejas (Home), Chathoth Peedika, Eramala, Kerala 673501");
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261128T113000Z/20261128T153000Z&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };

  const handleGoToItinerary = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('itinerary');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleGoToAttendance = () => {
    onClose();
    if (onScrollToAttendance) {
      setTimeout(() => {
        onScrollToAttendance();
      }, 150);
    }
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="countdown-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[390px] bg-[#FAF7F2] rounded-3xl border-2 border-[#D4AF37]/70 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 overflow-hidden select-none animate-pop-highlight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Arabesque Corners */}
        <ArabesqueCorner position="top-left" size={50} color="#C8A882" />
        <ArabesqueCorner position="top-right" size={50} color="#C8A882" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          id="close-countdown-modal-btn"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#3E2723]/10 hover:bg-[#3E2723]/20 text-[#3E2723] flex items-center justify-center transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#3E2723] text-[10px] font-sans tracking-widest uppercase font-bold mb-2">
            <Sparkles className="w-3 h-3 text-[#B38728]" />
            <span className="gold-shimmer font-semibold">Date Revealed</span>
            <Sparkles className="w-3 h-3 text-[#B38728]" />
          </div>

          <p className="text-[11px] font-sans tracking-[0.25em] text-[#8D6E63] uppercase font-semibold">
            THE WEDDING CELEBRATION
          </p>
          <h2 
            id="countdown-modal-title"
            className="font-serif text-2xl text-[#3E2723] font-normal mt-0.5"
            style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}
          >
            Fathimathul Fida ♡ Akhib
          </h2>
          <div className="text-[#3E2723] font-serif text-[26px] sm:text-[28px] font-semibold mt-1 tracking-wide text-center">
            28 NOVEMBER 2026
          </div>
        </div>

        {/* PROMINENT DAYS LEFT HIGHLIGHT BANNER */}
        <div className="my-4 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-linear-to-r from-[#D4AF37]/25 via-[#C8A882]/40 to-[#D4AF37]/25 border-2 border-[#D4AF37] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#B38728] animate-pulse" />
            <span className="font-serif text-2xl font-bold text-[#3E2723] tracking-wide">
              {timeLeft.days} Days Left
            </span>
            <Sparkles className="w-4 h-4 text-[#B38728] animate-pulse" />
          </div>
          <p className="text-[11px] text-[#8D6E63] font-sans mt-1">
            until the grand wedding reception!
          </p>
        </div>

        {/* 4 LARGE COUNTDOWN BOXES */}
        <div className="grid grid-cols-4 gap-2 my-4">
          {/* Days */}
          <div className="flex flex-col items-center bg-white/90 p-2.5 rounded-xl border border-[#C8A882]/50 shadow-xs">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2723] tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#8D6E63] font-semibold font-sans mt-0.5">
              Days Left
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center bg-white/90 p-2.5 rounded-xl border border-[#C8A882]/50 shadow-xs">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2723] tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#8D6E63] font-semibold font-sans mt-0.5">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center bg-white/90 p-2.5 rounded-xl border border-[#C8A882]/50 shadow-xs">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#3E2723] tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#8D6E63] font-semibold font-sans mt-0.5">
              Minutes
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center bg-white/90 p-2.5 rounded-xl border border-[#C8A882]/50 shadow-xs">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37] tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#8D6E63] font-semibold font-sans mt-0.5">
              Seconds
            </span>
          </div>
        </div>

        {/* Reception Details */}
        <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#C8A882]/40 text-center text-xs space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[#3E2723] font-medium">
            <Clock className="w-3.5 h-3.5 text-[#B38728]" />
            <span>Wedding Reception: <strong>5:00 PM – 9:00 PM</strong></span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[#8D6E63]">
            <MapPin className="w-3.5 h-3.5 text-[#C8A882]" />
            <span>Khadeejas (Home), Eramala, Kerala</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 mt-4">
          <button
            onClick={handleAddToCalendar}
            type="button"
            className="w-full py-2.5 px-4 rounded-full bg-[#3E2723] hover:bg-[#2E1C14] text-[#FAF7F2] text-xs font-sans font-medium shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Add to Calendar</span>
          </button>

          <button
            onClick={handleGoToItinerary}
            type="button"
            className="w-full py-2 px-4 rounded-full bg-white hover:bg-[#FAF7F2] text-[#3E2723] text-xs font-sans font-medium border border-[#C8A882]/60 shadow-xs transition-all active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View Full Details & Itinerary</span>
          </button>
        </div>
      </div>
    </div>
  );
}
