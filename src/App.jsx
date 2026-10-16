import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import HeroSection from './components/HeroSection';
import CountdownItinerarySection from './components/CountdownItinerarySection';
import AttendanceSection from './components/AttendanceSection';
import VenueQrModal from './components/VenueQrModal';
import DateCountdownModal from './components/DateCountdownModal';
import BottomNav from './components/BottomNav';
import LuxuryScrollProgress from './components/LuxuryScrollProgress';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isCountdownModalOpen, setIsCountdownModalOpen] = useState(false);
  const [isDatePopped, setIsDatePopped] = useState(false);

  // Activate luxury scroll reveal observer
  useScrollReveal();

  const handleRevealDate = () => {
    setIsDatePopped(true);
    setIsCountdownModalOpen(true);

    // Trigger celebratory confetti burst
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#FF69B4', '#C8A882', '#FAF7F2', '#3E2723'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.6 },
          colors: ['#D4AF37', '#FF69B4'],
        });
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#D4AF37', '#FF69B4'],
        });
      }, 250);
    } catch (e) {
      console.warn('Confetti error', e);
    }

    // Also scroll down to itinerary so when modal closes, user is right at the countdown
    const el = document.getElementById('itinerary');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAttendance = () => {
    const el = document.getElementById('attendance');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#1c130d] text-[#3E2723] flex items-center justify-center p-0 sm:py-8 sm:px-4 font-sans selection:bg-[#C8A882]/30 selection:text-[#3E2723]">
      {/* Background ambient lighting for desktop framing */}
      <div className="fixed inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#C8A882]/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#3E2723]/30 rounded-full blur-[120px]" />
      </div>

      {/* Luxury Reading Progress Line pinned to the top of mobile screen */}
      <LuxuryScrollProgress />

      {/* Mobile-First Container (Max-Width 430px centered on desktop) */}
      <main 
        id="wedding-app-container"
        className="relative w-full max-w-[430px] min-h-screen bg-[#FAF7F2] sm:rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] sm:border-[8px] sm:border-[#2D1B13] overflow-hidden flex flex-col"
      >
        {/* Subtle decorative phone notch indicator on desktop */}
        <div className="hidden sm:block absolute top-2 inset-x-0 mx-auto w-28 h-4 bg-[#2D1B13] rounded-full z-30 opacity-90" />

        {/* ========================================================
            PAGE 1: Hero Landing (Authentic Invitation Card)
            ======================================================== */}
        <HeroSection 
          onRevealDate={handleRevealDate} 
        />

        {/* ========================================================
            PAGE 2: Date & Time with Countdown & Itinerary
            ======================================================== */}
        <CountdownItinerarySection 
          onScrollToAttendance={scrollToAttendance} 
          isPopped={isDatePopped}
        />

        {/* ========================================================
            PAGE 3: Attendance (Branching: Attending reveals Location;
            Otherwise reveals Wishing Page)
            ======================================================== */}
        <AttendanceSection onOpenQr={() => setIsQrOpen(true)} />

        {/* Extra bottom padding so content isn't obscured by sticky bottom navigation */}
        <div className="h-16 w-full bg-[#FAF7F2]" />

        {/* Clean Sticky Bottom Navigation Bar [Card | Date & Time | Attendance] */}
        <BottomNav />
      </main>

      {/* Date & Countdown Pop Modal */}
      <DateCountdownModal
        isOpen={isCountdownModalOpen}
        onClose={() => setIsCountdownModalOpen(false)}
        onScrollToAttendance={scrollToAttendance}
      />

      {/* Venue QR Code Modal */}
      <VenueQrModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />
    </div>
  );
}
