import React, { useState, useEffect } from 'react';
import { Mail, Clock, CheckSquare } from 'lucide-react';

export default function BottomNav() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const itineraryEl = document.getElementById('itinerary');
      const attendanceEl = document.getElementById('attendance');

      if (attendanceEl && scrollY >= attendanceEl.offsetTop - 220) {
        setActiveSection('attendance');
      } else if (itineraryEl && scrollY >= itineraryEl.offsetTop - 220) {
        setActiveSection('itinerary');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Mobile Quick Navigation"
      className="fixed bottom-3 inset-x-0 mx-auto w-[90%] max-w-[360px] z-40 bg-[#FAF7F2]/95 backdrop-blur-md border border-[#C8A882]/60 rounded-full shadow-2xl p-1.5 flex items-center justify-around text-xs font-sans transition-all duration-300"
    >
      <button
        onClick={() => scrollTo('hero')}
        id="nav-invitation-btn"
        type="button"
        className={`flex items-center gap-1.5 py-2 px-3.5 rounded-full transition-all duration-200 cursor-pointer ${
          activeSection === 'hero'
            ? 'bg-[#3E2723] text-[#FAF7F2] shadow-sm font-medium'
            : 'text-[#5D4037] hover:text-[#3E2723]'
        }`}
      >
        <Mail className="w-3.5 h-3.5" />
        <span>Card</span>
      </button>

      <button
        onClick={() => scrollTo('itinerary')}
        id="nav-schedule-btn"
        type="button"
        className={`flex items-center gap-1.5 py-2 px-3.5 rounded-full transition-all duration-200 cursor-pointer ${
          activeSection === 'itinerary'
            ? 'bg-[#3E2723] text-[#FAF7F2] shadow-sm font-medium'
            : 'text-[#5D4037] hover:text-[#3E2723]'
        }`}
      >
        <Clock className="w-3.5 h-3.5" />
        <span>Date & Time</span>
      </button>

      <button
        onClick={() => scrollTo('attendance')}
        id="nav-attendance-btn"
        type="button"
        className={`flex items-center gap-1.5 py-2 px-3.5 rounded-full transition-all duration-200 cursor-pointer ${
          activeSection === 'attendance'
            ? 'bg-[#3E2723] text-[#FAF7F2] shadow-sm font-medium'
            : 'text-[#5D4037] hover:text-[#3E2723]'
        }`}
      >
        <CheckSquare className="w-3.5 h-3.5" />
        <span>Attendance</span>
      </button>
    </nav>
  );
}
