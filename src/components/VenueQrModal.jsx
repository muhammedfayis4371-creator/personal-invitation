import React, { useState } from 'react';
import { X, Copy, Check, Navigation, MapPin } from 'lucide-react';

export default function VenueQrModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const mapsUrl = "https://maps.app.goo.gl/5a4szWqy7FoVZMiy7";
  const venueAddress = "Khadeejas (Home), Chathoth Peedika, MHGX+226, Eramala, Kerala 673501";
  // High quality QR code pointing directly to Google Maps location
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(mapsUrl)}&color=3E-27-23&bgcolor=FAF7F2`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${venueAddress}\n11°40'26.0"N 75°35'54.2"E\n${mapsUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-sm bg-[#FAF7F2] rounded-3xl p-6 shadow-2xl border border-[#C8A882] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#8D6E63] hover:text-[#3E2723] hover:bg-black/5"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <div className="w-10 h-10 mx-auto rounded-full bg-[#3E2723]/10 text-[#3E2723] flex items-center justify-center mb-2">
            <MapPin className="w-5 h-5 text-[#C8A882]" />
          </div>
          <h3 className="font-serif text-2xl text-[#3E2723]">Scan for Directions</h3>
          <p className="text-xs text-[#8D6E63] font-sans mt-0.5">
            Point your mobile camera to open Google Maps
          </p>
        </div>

        {/* QR Code Container */}
        <div className="p-3 bg-white rounded-2xl border border-[#E8DDD0] shadow-inner inline-block mx-auto mb-4">
          <img 
            src={qrUrl} 
            alt="Venue Location QR Code" 
            className="w-48 h-48 rounded-lg object-contain"
          />
        </div>

        {/* Address and Copy */}
        <div className="bg-[#FFFFFF]/90 p-3 rounded-xl border border-[#E8DDD0] text-left text-xs mb-4 space-y-1">
          <p className="font-semibold text-sm text-[#3E2723]">Khadeejas (Home)</p>
          <p className="text-[#8D6E63]">Chathoth Peedika, Eramala, Kerala 673501</p>
          <p className="text-[10px] text-[#8D6E63] font-mono">11°40'26.0"N 75°35'54.2"E</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-[#F5EFEB] text-[#3E2723] text-xs font-medium border border-[#8D6E63]/40 flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#8D6E63]" />}
            <span>{copied ? "Address Copied!" : "Copy Address"}</span>
          </button>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#3E2723] hover:bg-[#2E1C14] text-[#FAF7F2] text-xs font-medium flex items-center justify-center gap-1.5 shadow transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
}
