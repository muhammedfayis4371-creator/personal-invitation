import React from 'react';
import { MapPin, Navigation, Calendar, QrCode } from 'lucide-react';
import ArabesqueCorner from './ArabesqueCorner';

export default function VenueLocationCard({ onOpenQr }) {
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
    <div
      id="location-section"
      className="w-full mt-8 p-6 bg-white/95 rounded-3xl border border-[#C8A882]/70 shadow-card animate-fadeIn space-y-4 relative overflow-hidden"
    >
      <ArabesqueCorner position="top-left" size={50} color="#C8A882" />
      <ArabesqueCorner position="top-right" size={50} color="#C8A882" />

      {/* Header */}
      <div className="text-center">
        <div className="w-10 h-10 mx-auto rounded-full bg-[#143825]/10 text-[#143825] flex items-center justify-center mb-2">
          <MapPin className="w-5 h-5 text-[#143825]" />
        </div>
        <p className="text-[11px] font-sans tracking-[0.2em] text-[#8D6E63] uppercase font-semibold">
          CELEBRATION VENUE & LOCATION
        </p>
        <h3
          className="font-serif text-2xl sm:text-3xl text-[#3E2723] font-medium mt-1"
          style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}
        >
          Khadeejas (Home)
        </h3>
        <p className="text-xs text-[#5D4037] font-sans mt-1">
          Chathoth Peedika, Eramala, Kerala 673501
        </p>
        <p className="text-[10px] text-[#8D6E63] font-mono mt-0.5 tracking-tight">
          11°40'26.0"N 75°35'54.2"E
        </p>
      </div>

      {/* Navigation and Calendar Action Buttons */}
      <div className="space-y-2.5 pt-2">
        <button
          onClick={handleOpenGoogleMaps}
          id="revealed-google-maps-btn"
          type="button"
          className="w-full py-3 px-5 rounded-full bg-[#3E2723] hover:bg-[#2E1C14] text-[#FAF7F2] text-xs font-sans font-medium shadow-md transition-all duration-200 active:scale-98 flex items-center justify-center gap-2"
        >
          <Navigation className="w-4 h-4 text-[#D4AF37]" />
          <span>Open in Google Maps</span>
        </button>

        <button
          onClick={handleAddToCalendar}
          id="revealed-calendar-btn"
          type="button"
          className="w-full py-2.5 px-5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#3E2723] text-xs font-sans font-medium border border-[#8D6E63]/50 shadow-sm transition-all duration-200 active:scale-98 flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4 text-[#C8A882]" />
          <span>Add to Google Calendar</span>
        </button>

        <button
          onClick={onOpenQr}
          id="revealed-qr-btn"
          type="button"
          className="w-full py-2 text-xs font-sans text-[#8D6E63] hover:text-[#3E2723] transition-colors flex items-center justify-center gap-1.5"
        >
          <QrCode className="w-3.5 h-3.5 text-[#C8A882]" />
          <span>Show Venue QR Code</span>
        </button>
      </div>
    </div>
  );
}
