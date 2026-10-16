import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Mail, Send, Sparkles, MessageCircle, RefreshCw, User, Phone, Users } from 'lucide-react';
import ArabesqueCorner from './ArabesqueCorner';

// Couple's destination email address for receiving RSVPs & Du'as
const COUPLE_EMAIL = "fathimathulfida17@gmail.com";

export default function RsvpSection({ onNewRsvp }) {
  const [attendance, setAttendance] = useState('attending'); // 'attending' | 'declined'
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [attendanceType, setAttendanceType] = useState('in_person'); // 'in_person' | 'virtual'
  const [wishMessage, setWishMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [mailtoLink, setMailtoLink] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');

  const triggerConfettiCelebration = () => {
    try {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#3E2723', '#C8A882', '#FAF7F2', '#143825'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#D4AF37', '#C8A882'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#D4AF37', '#C8A882'],
        });
      }, 250);
    } catch (e) {
      console.warn("Confetti error", e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    setIsSubmitting(true);

    const wish = wishMessage.trim() || (attendance === 'attending' ? 'May Allah bless this union with eternal happiness and barakah!' : 'Warm prayers from afar.');
    const count = attendance === 'attending' ? Number(guestCount) : 0;
    const mode = attendanceType === 'in_person' ? 'In-Person (Eramala, Kerala)' : 'Prayers from Afar';
    const statusText = attendance === 'attending' ? 'Yes, InshaAllah (Attending)' : "Unfortunately, I can't attend";

    // Format Email Subject and Body
    const emailSubject = `💍 Wedding RSVP & Du'a: ${fullName.trim()} (${attendance === 'attending' ? `Attending: ${count} Guests` : 'Declined'})`;
    const emailBodyText = 
      `Assalamu Alaikum Fida & Akhib,\n\n` +
      `Here is an RSVP and heartfelt Du'a for your sacred wedding on November 28, 2026:\n\n` +
      `• Guest Full Name: ${fullName.trim()}\n` +
      `• Attendance: ${statusText}\n` +
      `• Total Guests: ${count}\n` +
      `• Mode: ${mode}\n` +
      `• Phone / WhatsApp: ${phone.trim() || 'Not provided'}\n\n` +
      `Heartfelt Du'a & Wishes:\n` +
      `"${wish}"\n\n` +
      `Date: ${new Date().toLocaleString()}\n\n` +
      `Barakallahu lakuma wa baraka alaikuma wa jama'a baynakuma fee khayr.`;

    const generatedMailto = `mailto:${COUPLE_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBodyText)}`;
    const generatedWhatsapp = `https://wa.me/?text=${encodeURIComponent(emailBodyText)}`;

    setMailtoLink(generatedMailto);
    setWhatsappLink(generatedWhatsapp);

    const newEntry = {
      id: `rsvp-${Date.now()}`,
      name: fullName.trim(),
      attendanceStatus: attendance,
      guestCount: count,
      phone: phone.trim() || '—',
      attendanceType: attendance === 'attending' ? attendanceType : 'virtual',
      wishMessage: wish,
      createdAt: new Date().toISOString(),
      isRead: false,
      isFavorite: false,
    };

    setTimeout(() => {
      if (onNewRsvp) {
        onNewRsvp(newEntry);
      }
      setSubmittedData(newEntry);
      setIsSubmitting(false);
      setIsSubmitted(true);

      if (attendance === 'attending') {
        triggerConfettiCelebration();
      }

      // Automatically launch user's default email client
      try {
        window.location.href = generatedMailto;
      } catch (err) {
        console.warn("Mail client redirect prevented", err);
      }
    }, 400);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhone('');
    setWishMessage('');
    setGuestCount(1);
  };

  return (
    <section 
      id="rsvp" 
      className="relative w-full bg-[#FAF7F2] text-[#3E2723] px-6 py-12 border-t border-[#E8DDD0] overflow-hidden"
    >
      {/* Decorative Arabesque Corners */}
      <ArabesqueCorner position="top-left" size={60} color="#C8A882" />
      <ArabesqueCorner position="top-right" size={60} color="#C8A882" />
      <ArabesqueCorner position="bottom-left" size={60} color="#C8A882" />
      <ArabesqueCorner position="bottom-right" size={60} color="#C8A882" />

      {/* Floating ambient luxury gold dust particles */}
      <div className="absolute top-1/4 left-8 pointer-events-none gold-particle-1 text-[#D4AF37] text-xs">✦</div>
      <div className="absolute top-2/3 right-8 pointer-events-none gold-particle-2 text-[#C8A882] text-sm">✧</div>
      <div className="absolute bottom-12 left-1/3 pointer-events-none gold-particle-3 text-[#E8D3B0] text-xs">✦</div>

      <div className="w-full max-w-sm mx-auto">
        {/* Header with Luxury Scroll Reveal */}
        <div className="text-center mb-8 reveal-init">
          <h2 
            className="font-serif text-[32px] sm:text-[36px] text-[#3E2723] font-normal leading-tight mb-2"
            style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}
          >
            Will You Join Us?
          </h2>
          <p className="text-[#5D4037] text-sm font-sans font-light leading-relaxed max-w-[280px] mx-auto">
            Please let us know if you can attend our celebration.
          </p>
        </div>

        {/* Confirmation Card after submission */}
        {isSubmitted && submittedData ? (
          <div className="bg-[#FFFFFF] border border-[#C8A882]/60 rounded-2xl p-6 shadow-card text-center space-y-4 animate-fadeIn">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#143825]/10 text-[#143825] flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl text-[#3E2723]">
                {submittedData.attendanceStatus === 'attending' ? "JazakAllahu Khayran!" : "Thank You!"}
              </h3>
              <p className="text-xs text-[#8D6E63] font-sans">
                {submittedData.attendanceStatus === 'attending' 
                  ? `Your attendance is recorded for ${submittedData.guestCount} guest(s).`
                  : "We appreciate you letting us know. Your prayers mean the world to us."}
              </p>
            </div>

            {/* Direct Email Delivery Confirmation */}
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#C8A882]/40 text-xs text-[#5D4037] flex items-center justify-center gap-2">
              <Mail className="w-4 h-4 text-[#D4AF37]" />
              <span>Prepared for direct delivery to couple's email</span>
            </div>

            {/* Action buttons to trigger Mail or WhatsApp */}
            <div className="flex flex-col gap-2 pt-1">
              <a
                href={mailtoLink}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-[#FAF7F2] bg-[#3E2723] hover:bg-[#2E1C14] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
              >
                <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Open in Mail App / Send Email</span>
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-[#143825] bg-[#143825]/10 hover:bg-[#143825]/20 border border-[#143825]/30 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Also Share via WhatsApp</span>
              </a>
            </div>

            {/* Arabic Du'a blessing card */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DDD0] space-y-2">
              <p 
                className="font-arabic text-[#D4AF37] text-xl leading-loose"
                dir="rtl"
                lang="ar"
              >
                بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
              </p>
              <p className="text-[11px] text-[#5D4037] italic font-serif leading-relaxed">
                "Barakallahu lakuma wa baraka alaikuma wa jama'a baynakuma fee khayr"
              </p>
              <p className="text-[10px] text-[#8D6E63] font-sans">
                May Allah bless you both and unite you in goodness.
              </p>
            </div>

            <button
              onClick={handleResetForm}
              type="button"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-[#5D4037] bg-[#FAF7F2] hover:bg-[#F5EFEB] border border-[#C8A882]/40 transition-colors flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Submit Another Response / Edit</span>
            </button>
          </div>
        ) : (
          /* RSVP Form with Staggered Luxury Reveals */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Attendance Toggle Buttons with Reveal */}
            <div className="flex flex-col gap-2.5 reveal-init delay-150">
              <button
                type="button"
                id="rsvp-yes-btn"
                onClick={() => setAttendance('attending')}
                className={`w-full py-3 px-4 rounded-full font-sans text-sm font-medium transition-all duration-300 shadow-sm ${
                  attendance === 'attending'
                    ? 'bg-[#3E2723] text-[#FAF7F2] ring-2 ring-[#3E2723]/30 scale-[1.01]'
                    : 'bg-[#FAF7F2] text-[#3E2723] border border-[#C8A882]/70 hover:bg-[#F5EFEB]'
                }`}
              >
                Yes, InshaAllah
              </button>

              <button
                type="button"
                id="rsvp-no-btn"
                onClick={() => setAttendance('declined')}
                className={`w-full py-3 px-4 rounded-full font-sans text-sm font-medium transition-all duration-300 ${
                  attendance === 'declined'
                    ? 'bg-[#3E2723] text-[#FAF7F2] ring-2 ring-[#3E2723]/30 scale-[1.01]'
                    : 'bg-transparent text-[#5D4037] border border-[#8D6E63]/50 hover:bg-[#FAF7F2]'
                }`}
              >
                Unfortunately, I can't attend
              </button>
            </div>

            {/* Guest Full Name field */}
            <div className="space-y-1.5 text-left reveal-init delay-225">
              <label 
                htmlFor="guest-name" 
                className="block text-xs uppercase tracking-wider text-[#5D4037] font-sans font-medium"
              >
                Guest Full Name <span className="text-red-700">*</span>
              </label>
              <input
                id="guest-name"
                type="text"
                required
                placeholder="e.g. Mohammed & Family"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#8D6E63]/40 focus:border-[#3E2723] py-2 px-1 text-sm text-[#3E2723] placeholder-[#8D6E63]/50 outline-none transition-colors"
              />
            </div>

            {/* Attendance Details (Shown if Attending) */}
            {attendance === 'attending' && (
              <>
                {/* Attendance Mode Pill */}
                <div className="space-y-1.5 text-left reveal-init delay-300">
                  <label className="block text-xs uppercase tracking-wider text-[#5D4037] font-sans font-medium">
                    Attendance Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAttendanceType('in_person')}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all duration-200 ${
                        attendanceType === 'in_person'
                          ? 'bg-[#3E2723] text-[#FAF7F2] border-[#3E2723] shadow-sm'
                          : 'bg-white text-[#5D4037] border-[#C8A882]/50 hover:bg-[#FAF7F2]'
                      }`}
                    >
                      In-Person (Eramala, Kerala)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendanceType('virtual')}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all duration-200 ${
                        attendanceType === 'virtual'
                          ? 'bg-[#3E2723] text-[#FAF7F2] border-[#3E2723] shadow-sm'
                          : 'bg-white text-[#5D4037] border-[#C8A882]/50 hover:bg-[#FAF7F2]'
                      }`}
                    >
                      Prayers from Afar
                    </button>
                  </div>
                </div>

                {/* Total Guest Count Selector */}
                <div className="space-y-2 text-left reveal-init delay-300">
                  <label className="block text-xs uppercase tracking-wider text-[#5D4037] font-sans font-medium">
                    Total Guest Count
                  </label>
                  <div className="flex items-center justify-between gap-2">
                    {[1, 2, 3, 4, 5].map((num) => {
                      const isSelected = guestCount === num;
                      const label = num === 5 ? '5+' : num;
                      return (
                        <button
                          key={num}
                          type="button"
                          id={`guest-count-${num}`}
                          onClick={() => setGuestCount(num)}
                          className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                            isSelected
                              ? 'bg-[#3E2723] text-[#FAF7F2] shadow-md ring-2 ring-[#C8A882]/60 scale-105'
                              : 'bg-white text-[#5D4037] border border-[#8D6E63]/30 hover:border-[#3E2723]'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Optional Phone / WhatsApp */}
            <div className="space-y-1.5 text-left reveal-init delay-375">
              <label 
                htmlFor="guest-phone" 
                className="block text-xs uppercase tracking-wider text-[#5D4037] font-sans font-medium"
              >
                Phone Number / WhatsApp <span className="text-[#8D6E63] text-[10px] lowercase">(optional)</span>
              </label>
              <input
                id="guest-phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#8D6E63]/40 focus:border-[#3E2723] py-2 px-1 text-sm text-[#3E2723] placeholder-[#8D6E63]/50 outline-none transition-colors"
              />
            </div>

            {/* Private Du'a & Wishes Box */}
            <div className="space-y-1.5 text-left reveal-init delay-450">
              <label 
                htmlFor="guest-wishes" 
                className="block text-xs uppercase tracking-wider text-[#5D4037] font-sans font-medium"
              >
                Send Du'a & Heartfelt Wishes
              </label>

              <div className="relative rounded-2xl border border-[#C8A882] bg-white/70 p-3 shadow-inner focus-within:border-[#3E2723] focus-within:bg-white transition-all duration-300">
                <div className="flex items-center gap-1.5 text-[11px] text-[#8D6E63] mb-2 select-none border-b border-[#E8DDD0] pb-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#C8A882]" />
                  <span>Your message & RSVP are sent directly to the couple's email</span>
                </div>

                <textarea
                  id="guest-wishes"
                  rows={3}
                  value={wishMessage}
                  onChange={(e) => setWishMessage(e.target.value)}
                  placeholder="Send your Du'a & heartfelt wishes to Fida & Akhib..."
                  className="w-full bg-transparent text-sm text-[#3E2723] placeholder-[#8D6E63]/50 outline-none resize-none font-sans"
                />
              </div>
            </div>

            {/* Error message */}
            {errorMsg && (
              <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg text-center">
                {errorMsg}
              </p>
            )}

            {/* Submit Response button with Scale Reveal */}
            <div className="reveal-scale-init delay-550">
              <button
                type="submit"
                id="submit-rsvp-btn"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-full bg-[#3E2723] hover:bg-[#2E1C14] text-[#FAF7F2] font-sans text-sm font-medium tracking-wide shadow-md hover:shadow-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#FAF7F2] border-t-transparent rounded-full animate-spin" />
                    <span>Preparing Email...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <span>Send Du'a & RSVP to Couple</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
