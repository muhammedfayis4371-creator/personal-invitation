import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Mail, Send, Heart, Sparkles, MessageCircle, RefreshCw, MapPin } from 'lucide-react';
import ArabesqueCorner from './ArabesqueCorner';
import VenueLocationCard from './VenueLocationCard';

const COUPLE_EMAIL = "fathimathulfida17@gmail.com";

export default function AttendanceSection({ onOpenQr }) {
  // 'attending' | 'declined' | null (user chooses)
  const [attendance, setAttendance] = useState('attending');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [guestCount, setGuestCount] = useState(1);
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

  const handleAttendanceSelect = (choice) => {
    setAttendance(choice);
    setErrorMsg('');
    // Smooth scroll down slightly to focus on the newly revealed section
    setTimeout(() => {
      const targetEl = choice === 'attending' 
        ? document.getElementById('attending-form-details')
        : document.getElementById('wishing-form-details');
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 150);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    setIsSubmitting(true);

    const isAttending = attendance === 'attending';
    const count = isAttending ? Number(guestCount) : 0;
    const defaultWish = isAttending 
      ? 'May Allah bless Fida & Akhib with eternal love, harmony, and barakah!' 
      : 'Sending our heartfelt du\'as and warmest congratulations from afar!';
    const wish = wishMessage.trim() || defaultWish;
    const statusText = isAttending ? 'Yes, InshaAllah (Attending)' : "Unfortunately, cannot attend (Prayers from Afar)";

    // Format Email Subject and Body
    const emailSubject = isAttending
      ? `💍 Wedding RSVP: ${fullName.trim()} - Attending (${count} Guests)`
      : `💌 Wedding Du'a & Wishes from Afar: ${fullName.trim()}`;

    const emailBodyText = 
      `Assalamu Alaikum Fida & Akhib,\n\n` +
      `Here is a response for your wedding on November 28, 2026:\n\n` +
      `• Guest Full Name: ${fullName.trim()}\n` +
      `• Attendance: ${statusText}\n` +
      (isAttending ? `• Total Guest Count: ${count}\n` : '') +
      `• Phone / WhatsApp: ${phone.trim() || 'Not provided'}\n\n` +
      (isAttending ? `Heartfelt Du'a & Wishes:\n` : `Prayers & Warm Wishes from Afar:\n`) +
      `"${wish}"\n\n` +
      `Date: ${new Date().toLocaleString()}\n\n` +
      `Barakallahu lakuma wa baraka alaikuma wa jama'a baynakuma fee khayr.`;

    const generatedMailto = `mailto:${COUPLE_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBodyText)}`;
    const generatedWhatsapp = `https://wa.me/?text=${encodeURIComponent(emailBodyText)}`;

    setMailtoLink(generatedMailto);
    setWhatsappLink(generatedWhatsapp);

    // Send direct background submission to admin email
    try {
      fetch(`https://formsubmit.co/ajax/${COUPLE_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: emailSubject,
          _template: 'table',
          'Guest Full Name': fullName.trim(),
          'Attendance': statusText,
          'Total Guest Count': isAttending ? count : 'N/A',
          'Phone / WhatsApp': phone.trim() || 'Not provided',
          'Wishes & Du\'a': wish,
          'Submitted At': new Date().toLocaleString(),
        }),
      }).catch((err) => console.log('Background email dispatch status:', err));
    } catch (err) {
      console.log('Background email error:', err);
    }

    const newEntry = {
      id: `rsvp-${Date.now()}`,
      name: fullName.trim(),
      attendanceStatus: attendance,
      guestCount: count,
      phone: phone.trim() || '—',
      wishMessage: wish,
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setSubmittedData(newEntry);
      setIsSubmitting(false);
      setIsSubmitted(true);

      if (isAttending) {
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
      id="attendance" 
      className="relative w-full bg-[#FAF7F2] text-[#3E2723] px-6 py-14 border-t border-[#E8DDD0] overflow-hidden"
    >
      {/* Decorative Arabesque Corners */}
      <ArabesqueCorner position="top-left" size={60} color="#C8A882" />
      <ArabesqueCorner position="top-right" size={60} color="#C8A882" />
      <ArabesqueCorner position="bottom-left" size={60} color="#C8A882" />
      <ArabesqueCorner position="bottom-right" size={60} color="#C8A882" />

      {/* Floating ambient luxury gold dust particles */}
      <div className="absolute top-1/4 left-8 pointer-events-none gold-particle-1 text-[#D4AF37] text-xs">✦</div>
      <div className="absolute top-2/3 right-8 pointer-events-none gold-particle-2 text-[#C8A882] text-sm">✧</div>

      <div className="w-full max-w-sm mx-auto">
        {/* Header with Luxury Scroll Reveal */}
        <div className="text-center mb-8 reveal-init">
          <p className="text-[#8D6E63] text-xs font-sans tracking-[0.25em] uppercase font-semibold mb-1">
            RSVP & INVITATION RESPONSE
          </p>
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
          <div className="bg-[#FFFFFF] border border-[#C8A882]/60 rounded-3xl p-6 shadow-card text-center space-y-4 animate-fadeIn">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#143825]/10 text-[#143825] flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl text-[#3E2723]">
                {submittedData.attendanceStatus === 'attending' ? "JazakAllahu Khayran!" : "Thank You from the Heart!"}
              </h3>
              <p className="text-xs text-[#8D6E63] font-sans">
                {submittedData.attendanceStatus === 'attending' 
                  ? `Your attendance is recorded for ${submittedData.guestCount} guest(s).`
                  : "Your warm wishes and du'as have been directed to Fida & Akhib's email."}
              </p>
            </div>

            {/* Direct Email Delivery Confirmation */}
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#C8A882]/40 text-xs text-[#5D4037] flex items-center justify-center gap-2">
              <Mail className="w-4 h-4 text-[#D4AF37]" />
              <span>Direct delivery to fathimathulfida17@gmail.com</span>
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

            {/* If Attending was submitted, also show the location card directly on the confirmation screen */}
            {submittedData.attendanceStatus === 'attending' && (
              <VenueLocationCard onOpenQr={onOpenQr} />
            )}

            <button
              onClick={handleResetForm}
              type="button"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-[#5D4037] bg-[#FAF7F2] hover:bg-[#F5EFEB] border border-[#C8A882]/40 transition-colors flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Change Response / Edit</span>
            </button>
          </div>
        ) : (
          /* Main Interactive Attendance & Conditional Forms */
          <div className="space-y-6">
            {/* Primary Attendance Choice Buttons with Reveal */}
            <div className="flex flex-col gap-2.5 reveal-init delay-150">
              <button
                type="button"
                id="attendance-attending-btn"
                onClick={() => handleAttendanceSelect('attending')}
                className={`w-full py-3.5 px-4 rounded-full font-sans text-sm font-medium transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                  attendance === 'attending'
                    ? 'bg-[#3E2723] text-[#FAF7F2] ring-2 ring-[#C8A882] shadow-md scale-[1.01]'
                    : 'bg-[#FAF7F2] text-[#3E2723] border border-[#C8A882]/70 hover:bg-[#F5EFEB]'
                }`}
              >
                <span>Yes, InshaAllah</span>
                {attendance === 'attending' && <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />}
              </button>

              <button
                type="button"
                id="attendance-declined-btn"
                onClick={() => handleAttendanceSelect('declined')}
                className={`w-full py-3.5 px-4 rounded-full font-sans text-sm font-medium transition-all duration-300 cursor-pointer ${
                  attendance === 'declined'
                    ? 'bg-[#3E2723] text-[#FAF7F2] ring-2 ring-[#C8A882] shadow-md scale-[1.01]'
                    : 'bg-transparent text-[#5D4037] border border-[#8D6E63]/50 hover:bg-[#FAF7F2]'
                }`}
              >
                <span>Unfortunately, I can't attend</span>
                {attendance === 'declined' && <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />}
              </button>
            </div>

            {/* ========================================================
                BRANCH 1: ATTENDING REVEALS LOCATION & ATTENDANCE FORM
                ======================================================== */}
            {attendance === 'attending' && (
              <form 
                id="attending-form-details"
                onSubmit={handleSubmit} 
                className="space-y-5 animate-fadeIn pt-2"
              >
                {/* Guest Full Name field */}
                <div className="space-y-1.5 text-left reveal-init">
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

                {/* Total Guest Count Selector */}
                <div className="space-y-2 text-left reveal-init">
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
                          className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-[#3E2723] text-[#FAF7F2] shadow-md ring-2 ring-[#C8A882] scale-105'
                              : 'bg-white text-[#5D4037] border border-[#8D6E63]/30 hover:border-[#3E2723]'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Phone / WhatsApp */}
                <div className="space-y-1.5 text-left reveal-init">
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
                <div className="space-y-1.5 text-left reveal-init">
                  <label 
                    htmlFor="guest-wishes" 
                    className="block text-xs uppercase tracking-wider text-[#5D4037] font-sans font-medium"
                  >
                    Send Du'a & Heartfelt Wishes
                  </label>

                  <div className="relative rounded-2xl border border-[#C8A882] bg-white/70 p-3 shadow-inner focus-within:border-[#3E2723] focus-within:bg-white transition-all duration-300">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#8D6E63] mb-2 select-none border-b border-[#E8DDD0] pb-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#C8A882]" />
                      <span>Direct email delivery to the couple</span>
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

                {errorMsg && (
                  <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg text-center">
                    {errorMsg}
                  </p>
                )}

                {/* Submit Attendance Response */}
                <button
                  type="submit"
                  id="submit-attending-btn"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-[#3E2723] hover:bg-[#2E1C14] text-[#FAF7F2] font-sans text-sm font-medium tracking-wide shadow-md hover:shadow-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#FAF7F2] border-t-transparent rounded-full animate-spin" />
                      <span>Sending RSVP...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 text-[#D4AF37]" />
                      <span>Send Du'a & RSVP to Couple</span>
                    </>
                  )}
                </button>

                {/* CONDITIONAL LOCATION PAGE REVEAL:
                    Only shown when user touches Attending! */}
                <div className="pt-2">
                  <div className="flex items-center justify-center gap-2 my-4 text-[#C8A882]">
                    <span className="h-[1px] w-12 bg-[#C8A882]/50" />
                    <span className="text-[10px] tracking-widest uppercase font-sans text-[#8D6E63]">Event Venue</span>
                    <span className="h-[1px] w-12 bg-[#C8A882]/50" />
                  </div>
                  <VenueLocationCard onOpenQr={onOpenQr} />
                </div>
              </form>
            )}

            {/* ========================================================
                BRANCH 2: DECLINED REVEALS ONLY WISHING PAGE (NO LOCATION)
                ======================================================== */}
            {attendance === 'declined' && (
              <form 
                id="wishing-form-details"
                onSubmit={handleSubmit} 
                className="space-y-5 animate-fadeIn bg-white/70 p-5 rounded-3xl border border-[#C8A882]/70 shadow-sm text-left"
              >
                {/* Loving Subtext for Afar Guests */}
                <div className="text-center pb-2 border-b border-[#E8DDD0]">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#C8A882]/20 text-[#8D6E63] flex items-center justify-center mb-2">
                    <Heart className="w-5 h-5 text-[#8D6E63]" />
                  </div>
                  <h3 
                    className="font-serif text-2xl text-[#3E2723] font-medium"
                    style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}
                  >
                    Send Your Du'a From Afar
                  </h3>
                  <p className="text-xs text-[#8D6E63] font-sans mt-1 leading-relaxed max-w-[280px] mx-auto">
                    We will truly miss having you with us in person. Please shower Fida & Akhib with your prayers and Du'a from wherever you are.
                  </p>
                </div>

                {/* Guest Name */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="wishing-guest-name" 
                    className="block text-xs uppercase tracking-wider text-[#5D4037] font-sans font-medium"
                  >
                    Your Full Name <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="wishing-guest-name"
                    type="text"
                    required
                    placeholder="e.g. Uncle Rashid & Family"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-[#8D6E63]/40 focus:border-[#3E2723] py-2 px-1 text-sm text-[#3E2723] placeholder-[#8D6E63]/50 outline-none transition-colors"
                  />
                </div>

                {/* Optional Phone / City */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="wishing-phone" 
                    className="block text-xs uppercase tracking-wider text-[#5D4037] font-sans font-medium"
                  >
                    Phone / City <span className="text-[#8D6E63] text-[10px] lowercase">(optional)</span>
                  </label>
                  <input
                    id="wishing-phone"
                    type="text"
                    placeholder="e.g. +974... or Dubai / London"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-[#8D6E63]/40 focus:border-[#3E2723] py-2 px-1 text-sm text-[#3E2723] placeholder-[#8D6E63]/50 outline-none transition-colors"
                  />
                </div>

                {/* Wishing / Du'a Box */}
                <div className="space-y-1.5">
                  <label 
                    htmlFor="wishing-message" 
                    className="block text-xs uppercase tracking-wider text-[#5D4037] font-sans font-medium"
                  >
                    Your Du'a & Heartfelt Message
                  </label>

                  <div className="relative rounded-2xl border border-[#C8A882] bg-white p-3 shadow-inner focus-within:border-[#3E2723] transition-all">
                    <textarea
                      id="wishing-message"
                      rows={4}
                      value={wishMessage}
                      onChange={(e) => setWishMessage(e.target.value)}
                      placeholder="Write your prayers, marriage blessings, or heartfelt words for Fida & Akhib..."
                      className="w-full bg-transparent text-sm text-[#3E2723] placeholder-[#8D6E63]/50 outline-none resize-none font-sans"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg text-center">
                    {errorMsg}
                  </p>
                )}

                {/* Submit Wishing Button */}
                <button
                  type="submit"
                  id="submit-wishing-btn"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-[#3E2723] hover:bg-[#2E1C14] text-[#FAF7F2] font-sans text-sm font-medium tracking-wide shadow-md hover:shadow-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#FAF7F2] border-t-transparent rounded-full animate-spin" />
                      <span>Sending Your Wishes...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#D4AF37]" />
                      <span>Send My Du'a & Blessings</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Footer Couple Signature */}
        <div className="mt-14 pt-4 text-center reveal-init delay-450">
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
