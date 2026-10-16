import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Navigation, QrCode, Sparkles } from 'lucide-react';
import ArabesqueCorner from './ArabesqueCorner';

export default function CountdownLocationSection({ onOpenQr }) {
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

  const mapsUrl = "https://maps.app.goo.gl/5a4szWqy7FoVZMiy7";
  const venueTitle = "Khadeejas (Home)";
  const venueAddress = "Chathoth Peedika, MHGX+226, Eramala, Kerala 673501";
  const coordinates = '11°40\'26.0"N 75°35\'54.2"E';

  const handleOpenGoogleMaps = () => {
    window.open(mapsUrl, '_blank');
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Wedding Reception of Fathimathul Fida ♡ Akhib");
    const details = encodeURIComponent(
      "Two hearts, one beautiful journey, blessed by Allah.\n\n" +
      "Itinerary:\n" +
      "• 05:00 PM – 09:00 PM: Wedding Reception Banquet\n\n" +
      `Venue: ${venueTitle}\n` +
      `Address: ${venueAddress}\n` +
      `Coordinates: ${coordinates}\n` +
      `Map Location: ${mapsUrl}`
    );
    const location = encodeURIComponent(`${venueTitle}, ${venueAddress}`);
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261128T113000Z/20261128T153000Z&details=${details}&location=${location}`;
    
    const icsData = 
      "BEGIN:VCALENDAR\n" +
      "VERSION:2.0\n" +
      "PRODID:-//Fida & Akhib Wedding//EN\n" +
      "BEGIN:VEVENT\n" +
      "SUMMARY:Wedding Reception of Fathimathul Fida ♡ Akhib\n" +
      "DESCRIPTION:Wedding Reception Banquet (5:00 PM - 9:00 PM)\n" +
      `LOCATION:${venueTitle}, ${venueAddress}\n` +
      "DTSTART:20261128T113000Z\n" +
      "DTEND:20261128T153000Z\n" +
      "END:VEVENT\n" +
      "END:VCALENDAR";

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Fida_and_Akhib_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.open(gCalUrl, '_blank');
  };

  return (
    <section 
      id="itinerary" 
      className="relative w-full bg-[#FAF7F2] text-[#3E2723] px-6 py-12 border-t border-[#E8DDD0] overflow-hidden"
    >
      {/* Decorative Arabesque Corners */}
      <ArabesqueCorner position="top-left" size={60} color="#C8A882" />
      <ArabesqueCorner position="top-right" size={60} color="#C8A882" />
      <ArabesqueCorner position="bottom-left" size={60} color="#C8A882" />
      <ArabesqueCorner position="bottom-right" size={60} color="#C8A882" />

      {/* Floating ambient luxury gold dust particles */}
      <div className="absolute top-1/3 left-6 pointer-events-none gold-particle-2 text-[#D4AF37] text-xs">✦</div>
      <div className="absolute top-2/3 right-6 pointer-events-none gold-particle-1 text-[#C8A882] text-sm">✧</div>

      <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center">
        {/* Date Header with Scroll Reveal */}
        <p className="text-[#8D6E63] text-xs font-sans tracking-[0.25em] uppercase font-semibold mb-3 reveal-init">
          28 NOVEMBER 2026
        </p>

        {/* Real-time Ticking Countdown with Scale Reveal */}
        <div className="w-full my-3 reveal-scale-init delay-150">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[#3E2723] font-serif text-[28px] sm:text-[32px] font-normal tracking-tight bg-white/60 py-3 px-4 rounded-2xl border border-[#C8A882]/40 shadow-sm backdrop-blur-xs">
            <span className="tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}<span className="text-xl font-sans text-[#8D6E63] font-light">d</span>
            </span>
            <span className="text-[#C8A882] text-xl font-light mx-0.5">:</span>

            <span className="tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}<span className="text-xl font-sans text-[#8D6E63] font-light">h</span>
            </span>
            <span className="text-[#C8A882] text-xl font-light mx-0.5">:</span>

            <span className="tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}<span className="text-xl font-sans text-[#8D6E63] font-light">m</span>
            </span>
            <span className="text-[#C8A882] text-xl font-light mx-0.5">:</span>

            <span className="tabular-nums text-[#3E2723]">
              {String(timeLeft.seconds).padStart(2, '0')}<span className="text-xl font-sans text-[#8D6E63] font-light">s</span>
            </span>
          </div>

          <div className="flex items-center justify-center gap-5 sm:gap-7 text-[10px] text-[#8D6E63] uppercase tracking-wider font-sans mt-1.5">
            <span className="w-8">Days</span>
            <span className="w-8">Hours</span>
            <span className="w-8">Minutes</span>
            <span className="w-8">Seconds</span>
          </div>
        </div>

        {/* Vertical Dotted Itinerary Timeline with Reveal */}
        <div className="relative w-full max-w-[270px] my-10 flex flex-col items-center">
          <div className="w-[1.5px] h-6 border-l-2 border-dotted border-[#C8A882]/70 mb-2" />

          {/* Nikah Ceremony with Stagger Reveal */}
          <div className="text-center group reveal-init delay-225">
            <h3 
              className="font-serif text-[26px] sm:text-[28px] text-[#3E2723] font-normal leading-snug"
              style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}
            >
              Nikah Ceremony
            </h3>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#5D4037] font-sans mt-1">
              <span className="font-medium">12:00 PM</span>
              <span className="text-[#C8A882]">•</span>
              <span className="text-[11px] text-[#8D6E63]">Stage & Solemn Vows</span>
            </div>
            <p className="text-[10px] text-[#8D6E63]/80 font-sans mt-0.5">
              Traditional Kerala Malabar / Modest Formal Attire
            </p>
          </div>

          <div className="w-[1.5px] h-10 border-l-2 border-dotted border-[#C8A882]/70 my-3" />

          {/* Walima / Reception with Stagger Reveal */}
          <div className="text-center group reveal-init delay-375">
            <h3 
              className="font-serif text-[26px] sm:text-[28px] text-[#3E2723] font-normal leading-snug"
              style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}
            >
              Walima / Reception
            </h3>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#5D4037] font-sans mt-1">
              <span className="font-medium">7:00 PM</span>
              <span className="text-[#C8A882]">•</span>
              <span className="text-[11px] text-[#8D6E63]">Grand Feast & Celebration</span>
            </div>
            <p className="text-[10px] text-[#8D6E63]/80 font-sans mt-0.5">
              Dinner Banquet & Photo Fellowship
            </p>
          </div>

          <div className="w-[1.5px] h-6 border-l-2 border-dotted border-[#C8A882]/70 mt-3" />
        </div>

        {/* Venue Information Card with Scale Reveal */}
        <div className="w-full bg-[#FFFFFF]/90 border border-[#E8DDD0] rounded-2xl p-4 mb-6 shadow-sm reveal-scale-init delay-450 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center gap-2 text-[#5D4037] text-xs font-medium uppercase tracking-wider mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#C8A882]" />
            <span>Celebration Venue</span>
          </div>
          <p className="font-serif text-lg text-[#3E2723] font-medium">
            Khadeejas (Home)
          </p>
          <p className="text-xs text-[#8D6E63] font-sans mt-0.5">
            Chathoth Peedika, Eramala, Kerala 673501
          </p>
        </div>

        {/* Navigation Action Buttons with Stagger Reveal */}
        <div className="w-full space-y-3 reveal-init delay-550">
          <button
            onClick={handleOpenGoogleMaps}
            id="open-google-maps-btn"
            type="button"
            className="w-full py-3 px-6 rounded-full bg-white hover:bg-[#FAF7F2] text-[#3E2723] text-sm font-sans font-medium border border-[#8D6E63]/60 hover:border-[#3E2723] shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4 text-[#C8A882]" />
            <span>Open in Google Maps</span>
          </button>

          <button
            onClick={handleAddToCalendar}
            id="add-to-calendar-btn"
            type="button"
            className="w-full py-3 px-6 rounded-full bg-white hover:bg-[#FAF7F2] text-[#3E2723] text-sm font-sans font-medium border border-[#8D6E63]/60 hover:border-[#3E2723] shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#C8A882]" />
            <span>Add to Google Calendar</span>
          </button>

          <button
            onClick={onOpenQr}
            id="view-qr-btn"
            type="button"
            className="w-full py-2 px-4 rounded-full text-xs font-sans text-[#8D6E63] hover:text-[#3E2723] transition-colors flex items-center justify-center gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5 text-[#C8A882]" />
            <span>Show Venue QR Code</span>
          </button>
        </div>

        {/* Footer Blessing Signature */}
        <div className="mt-12 pt-4 text-center reveal-init delay-550">
          <p className="font-serif text-lg text-[#3E2723] font-medium">
            Fathimathul Fida ♡ Akhib
          </p>
          <p className="text-[11px] text-[#8D6E63] font-sans mt-0.5">
            November 28, 2026 • Eramala, Kerala
          </p>
        </div>
      </div>
    </section>
  );
}
