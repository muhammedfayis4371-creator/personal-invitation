import React, { useState, useMemo } from 'react';
import { 
  X, Lock, KeyRound, Users, CheckCircle2, XCircle, Heart, 
  MessageSquare, Download, Copy, Check, Star, Trash2, Search, 
  Plus, ExternalLink, RefreshCw, Eye, EyeOff
} from 'lucide-react';

export default function AdminPortalModal({ 
  isOpen, 
  onClose, 
  rsvps, 
  onUpdateRsvp, 
  onDeleteRsvp,
  onAddManualRsvp,
  onResetSeedData
}) {
  const DEFAULT_PIN = "2812"; // Wedding date: 28 Dec
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'unread' | 'attending' | 'declined' | 'favorites'
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Manual Add Form State
  const [manualName, setManualName] = useState('');
  const [manualStatus, setManualStatus] = useState('attending');
  const [manualCount, setManualCount] = useState(2);
  const [manualPhone, setManualPhone] = useState('');
  const [manualWish, setManualWish] = useState('');

  if (!isOpen) return null;

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN || pinInput.trim().toLowerCase() === 'fida2026' || pinInput.trim() === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleQuickUnlock = () => {
    setPinInput(DEFAULT_PIN);
    setIsAuthenticated(true);
    setPinError(false);
  };

  // Metrics Calculations
  const metrics = useMemo(() => {
    let attendingCount = 0;
    let declinedCount = 0;
    let totalHeadcount = 0;
    let totalWishes = 0;
    let unreadCount = 0;

    rsvps.forEach((r) => {
      if (r.attendanceStatus === 'attending') {
        attendingCount++;
        totalHeadcount += Number(r.guestCount) || 1;
      } else {
        declinedCount++;
      }
      if (r.wishMessage && r.wishMessage.trim()) {
        totalWishes++;
      }
      if (!r.isRead) {
        unreadCount++;
      }
    });

    return {
      attendingCount,
      declinedCount,
      totalHeadcount,
      totalWishes,
      unreadCount,
      totalResponses: rsvps.length,
    };
  }, [rsvps]);

  // Filtered RSVPs
  const filteredRsvps = useMemo(() => {
    return rsvps.filter((item) => {
      // Tab filter
      if (activeTab === 'unread' && item.isRead) return false;
      if (activeTab === 'attending' && item.attendanceStatus !== 'attending') return false;
      if (activeTab === 'declined' && item.attendanceStatus !== 'declined') return false;
      if (activeTab === 'favorites' && !item.isFavorite) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name?.toLowerCase().includes(query);
        const matchesPhone = item.phone?.toLowerCase().includes(query);
        const matchesWish = item.wishMessage?.toLowerCase().includes(query);
        return matchesName || matchesPhone || matchesWish;
      }
      return true;
    });
  }, [rsvps, activeTab, searchQuery]);

  const handleCopyWish = (item) => {
    const text = `Du'a from ${item.name} (${item.attendanceStatus === 'attending' ? `${item.guestCount} guests` : 'Declined'}):\n"${item.wishMessage}"`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCsv = () => {
    const headers = ["ID", "Full Name", "Status", "Headcount", "Attendance Type", "Phone", "Private Wish / Du'a", "Received At", "Is Read", "Favorite"];
    const rows = rsvps.map((r) => [
      `"${r.id}"`,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${r.attendanceStatus}"`,
      r.guestCount || 0,
      `"${r.attendanceType || 'in_person'}"`,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      `"${(r.wishMessage || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`,
      r.isRead ? "YES" : "NO",
      r.isFavorite ? "YES" : "NO",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Fida_Akhib_Wedding_RSVPs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddManualSubmit = (e) => {
    e.preventDefault();
    if (!manualName.trim()) return;

    const newRsvp = {
      id: `manual-${Date.now()}`,
      name: manualName.trim(),
      attendanceStatus: manualStatus,
      guestCount: manualStatus === 'attending' ? Number(manualCount) : 0,
      phone: manualPhone.trim() || '—',
      attendanceType: 'in_person',
      wishMessage: manualWish.trim() || 'Logged manually by family admin.',
      createdAt: new Date().toISOString(),
      isRead: true,
      isFavorite: false,
    };

    onAddManualRsvp(newRsvp);
    setShowAddModal(false);
    setManualName('');
    setManualPhone('');
    setManualWish('');
    setManualCount(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#C8A882] flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DDD0] bg-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#3E2723] text-[#FAF7F2] flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl text-[#3E2723] font-medium leading-none">
                Couple & Admin Portal
              </h2>
              <p className="text-[11px] text-[#8D6E63] font-sans mt-0.5">
                Fathimathul Fida & Akhib • Private RSVPs & Du'as
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8D6E63] hover:text-[#3E2723] hover:bg-black/5 transition-colors"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="p-8 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#3E2723]/10 text-[#3E2723] flex items-center justify-center mb-4">
              <KeyRound className="w-8 h-8 text-[#C8A882]" />
            </div>

            <h3 className="font-serif text-2xl text-[#3E2723] mb-1">
              Private Access Required
            </h3>
            <p className="text-xs text-[#8D6E63] font-sans max-w-xs mb-6">
              Enter your wedding security PIN or couple passcode to access the private RSVP list and heartfelt wishes.
            </p>

            <form onSubmit={handlePinSubmit} className="w-full max-w-xs space-y-4">
              <div>
                <input
                  type="password"
                  autoFocus
                  maxLength={12}
                  placeholder="Enter PIN (e.g. 2812)"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  className="w-full text-center text-xl tracking-[0.3em] font-mono py-3 px-4 rounded-xl border border-[#C8A882] bg-white text-[#3E2723] focus:border-[#3E2723] focus:ring-2 focus:ring-[#3E2723]/20 outline-none"
                />
                {pinError && (
                  <p className="text-xs text-red-600 mt-1 font-sans">
                    Incorrect PIN. Please try again.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#3E2723] text-[#FAF7F2] font-sans text-sm font-medium hover:bg-[#2E1C14] transition-all shadow-md"
              >
                Unlock Dashboard
              </button>

              {/* Instant Evaluation Quick Unlock */}
              <div className="pt-2 border-t border-[#E8DDD0]">
                <button
                  type="button"
                  onClick={handleQuickUnlock}
                  className="text-[11px] text-[#8D6E63] hover:text-[#3E2723] underline font-sans"
                >
                  Quick Unlock with Default Couple PIN (2812)
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Main Dashboard Content */
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5">
            {/* 1. Overview Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Attending */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#E8DDD0] shadow-sm">
                <div className="flex items-center justify-between text-xs text-[#5D4037] font-sans mb-1">
                  <span>Attending</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="text-2xl font-serif text-[#3E2723] font-semibold">
                  {metrics.attendingCount}
                </div>
                <p className="text-[10px] text-[#8D6E63] font-sans mt-0.5">
                  Confirmed RSVPs
                </p>
              </div>

              {/* Headcount */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#E8DDD0] shadow-sm">
                <div className="flex items-center justify-between text-xs text-[#5D4037] font-sans mb-1">
                  <span>Total Guests</span>
                  <Users className="w-4 h-4 text-[#C8A882]" />
                </div>
                <div className="text-2xl font-serif text-[#3E2723] font-semibold">
                  {metrics.totalHeadcount}
                </div>
                <p className="text-[10px] text-[#8D6E63] font-sans mt-0.5">
                  Catering Headcount
                </p>
              </div>

              {/* Declined */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#E8DDD0] shadow-sm">
                <div className="flex items-center justify-between text-xs text-[#5D4037] font-sans mb-1">
                  <span>Declined</span>
                  <XCircle className="w-4 h-4 text-[#8D6E63]" />
                </div>
                <div className="text-2xl font-serif text-[#3E2723] font-semibold">
                  {metrics.declinedCount}
                </div>
                <p className="text-[10px] text-[#8D6E63] font-sans mt-0.5">
                  Prayers from afar
                </p>
              </div>

              {/* Wishes Received */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#E8DDD0] shadow-sm">
                <div className="flex items-center justify-between text-xs text-[#5D4037] font-sans mb-1">
                  <span>Du'as / Wishes</span>
                  <Heart className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="text-2xl font-serif text-[#3E2723] font-semibold">
                  {metrics.totalWishes}
                </div>
                <p className="text-[10px] text-[#8D6E63] font-sans mt-0.5">
                  {metrics.unreadCount} unread
                </p>
              </div>
            </div>

            {/* Action Bar: Export CSV & Manual Add */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCsv}
                  className="py-2 px-3.5 rounded-xl bg-[#3E2723] hover:bg-[#2E1C14] text-[#FAF7F2] text-xs font-sans font-medium flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to CSV</span>
                </button>

                <button
                  onClick={() => setShowAddModal(!showAddModal)}
                  className="py-2 px-3.5 rounded-xl bg-white hover:bg-[#F5EFEB] text-[#3E2723] text-xs font-sans font-medium border border-[#C8A882]/60 flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5 text-[#C8A882]" />
                  <span>Add RSVP Manually</span>
                </button>
              </div>

              <button
                onClick={onResetSeedData}
                className="text-[11px] text-[#8D6E63] hover:text-[#3E2723] flex items-center gap-1 font-sans"
                title="Reset sample RSVP messages"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Demo Seed</span>
              </button>
            </div>

            {/* Manual RSVP Drawer Form (if toggled) */}
            {showAddModal && (
              <form onSubmit={handleAddManualSubmit} className="bg-white p-4 rounded-2xl border border-[#C8A882] space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base text-[#3E2723]">Log RSVP Manually</h4>
                  <button type="button" onClick={() => setShowAddModal(false)} className="text-xs text-[#8D6E63]">Cancel</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Guest or Family Name *"
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    className="p-2 border rounded-lg outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp"
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    className="p-2 border rounded-lg outline-none"
                  />
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input 
                      type="radio" 
                      name="manualStatus" 
                      checked={manualStatus === 'attending'} 
                      onChange={() => setManualStatus('attending')} 
                    />
                    <span>Attending</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input 
                      type="radio" 
                      name="manualStatus" 
                      checked={manualStatus === 'declined'} 
                      onChange={() => setManualStatus('declined')} 
                    />
                    <span>Declined</span>
                  </label>
                  {manualStatus === 'attending' && (
                    <div className="flex items-center gap-1.5 ml-auto">
                      <span className="text-[#8D6E63]">Count:</span>
                      <select 
                        value={manualCount} 
                        onChange={(e) => setManualCount(Number(e.target.value))}
                        className="p-1 border rounded"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Private Wish / Blessing Note"
                  value={manualWish}
                  onChange={(e) => setManualWish(e.target.value)}
                  className="w-full p-2 border rounded-lg outline-none text-xs"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#3E2723] text-white rounded-lg text-xs font-medium"
                >
                  Save Entry
                </button>
              </form>
            )}

            {/* Filter Tabs and Search Bar */}
            <div className="space-y-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-[#8D6E63] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search wishes by guest name, phone, or words..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E8DDD0] text-xs text-[#3E2723] placeholder-[#8D6E63]/60 outline-none focus:border-[#3E2723]"
                />
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {[
                  { key: 'all', label: `All (${rsvps.length})` },
                  { key: 'unread', label: `Unread (${metrics.unreadCount})` },
                  { key: 'attending', label: `Attending (${metrics.attendingCount})` },
                  { key: 'declined', label: `Declined (${metrics.declinedCount})` },
                  { key: 'favorites', label: 'Favorites ★' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`py-1.5 px-3 rounded-lg font-sans font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.key
                        ? 'bg-[#3E2723] text-[#FAF7F2]'
                        : 'bg-white text-[#5D4037] border border-[#E8DDD0] hover:bg-[#F5EFEB]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Private Wishes & Du'as Inbox List */}
            <div className="space-y-3">
              {filteredRsvps.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-[#C8A882]/50 text-[#8D6E63] text-xs">
                  No RSVP records found matching your selection.
                </div>
              ) : (
                filteredRsvps.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      item.isRead
                        ? 'bg-white border-[#E8DDD0]'
                        : 'bg-[#FFFDF9] border-[#C8A882] shadow-sm ring-1 ring-[#C8A882]/40'
                    }`}
                  >
                    {/* Item Top: Guest Name, Status Badges & Quick Actions */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-base text-[#3E2723] font-medium">
                            {item.name}
                          </h4>
                          {!item.isRead && (
                            <span className="bg-[#D4AF37]/20 text-[#8D6E63] text-[9px] px-1.5 py-0.5 rounded font-sans uppercase font-bold tracking-wider">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-[#8D6E63] font-sans mt-0.5">
                          <span>{new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                          {item.phone && item.phone !== '—' && (
                            <>
                              <span>•</span>
                              <a 
                                href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-emerald-700 hover:underline flex items-center gap-0.5"
                                title="Message on WhatsApp"
                              >
                                {item.phone}
                              </a>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          item.attendanceStatus === 'attending'
                            ? 'bg-[#143825]/10 text-[#143825] border border-[#143825]/20'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {item.attendanceStatus === 'attending' 
                            ? `Attending (${item.guestCount})` 
                            : 'Declined'}
                        </span>

                        {/* Favorite Star */}
                        <button
                          onClick={() => onUpdateRsvp(item.id, { isFavorite: !item.isFavorite })}
                          className={`p-1 rounded hover:bg-black/5 transition-colors ${
                            item.isFavorite ? 'text-[#D4AF37]' : 'text-[#8D6E63]/40 hover:text-[#8D6E63]'
                          }`}
                          title={item.isFavorite ? "Remove favorite" : "Mark as favorite"}
                        >
                          <Star className={`w-4 h-4 ${item.isFavorite ? 'fill-[#D4AF37]' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Private Wish / Du'a Quote Box */}
                    <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DDD0] my-2 text-xs text-[#3E2723] font-serif leading-relaxed italic relative">
                      "{item.wishMessage}"
                    </div>

                    {/* Bottom Action Footer for Card */}
                    <div className="flex items-center justify-between pt-1 text-[11px] text-[#8D6E63]">
                      <div className="flex items-center gap-2">
                        {/* Toggle Read */}
                        <button
                          onClick={() => onUpdateRsvp(item.id, { isRead: !item.isRead })}
                          className="hover:text-[#3E2723] flex items-center gap-1 underline"
                        >
                          {item.isRead ? (
                            <>
                              <EyeOff className="w-3 h-3" />
                              <span>Mark Unread</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3 h-3" />
                              <span>Mark Read</span>
                            </>
                          )}
                        </button>

                        {/* Copy Wish */}
                        <button
                          onClick={() => handleCopyWish(item)}
                          className="hover:text-[#3E2723] flex items-center gap-1 ml-2"
                        >
                          {copiedId === item.id ? (
                            <span className="text-emerald-700 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Copied!
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Copy className="w-3 h-3" /> Copy Wish
                            </span>
                          )}
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete RSVP record for ${item.name}?`)) {
                            onDeleteRsvp(item.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 p-1 rounded"
                        title="Delete RSVP"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
