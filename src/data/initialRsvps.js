// Initial heartfelt seed RSVPs and du'as for Fathimathul Fida & Akhib
export const initialRsvps = [
  {
    id: "rsvp-1",
    name: "Dr. Zameer & Family",
    attendanceStatus: "attending",
    guestCount: 4,
    phone: "+91 98470 12345",
    attendanceType: "in_person",
    wishMessage: "MashaAllah! May Allah bless Fida and Akhib with immense love, mercy, and harmony in their married life. May your home always be filled with peace and barakah. Barakallahu lakuma!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    isRead: true,
    isFavorite: true,
  },
  {
    id: "rsvp-2",
    name: "Aysha Shamna",
    attendanceStatus: "attending",
    guestCount: 2,
    phone: "+91 97455 67890",
    attendanceType: "in_person",
    wishMessage: "Dearest Fida, couldn't be happier for you and Akhib! Seeing you start this sacred journey brings tears of joy. InshaAllah counting down the days to celebrate with you!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    isRead: true,
    isFavorite: true,
  },
  {
    id: "rsvp-3",
    name: "Uncle Hamza & Aunt Mumtaz",
    attendanceStatus: "attending",
    guestCount: 5,
    phone: "+91 94471 99882",
    attendanceType: "in_person",
    wishMessage: "All praise is to Allah. Our heartfelt prayers and blessings for dear Fida and Akhib. Looking forward to attending the wedding reception feast InshaAllah.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    isRead: false,
    isFavorite: false,
  },
  {
    id: "rsvp-4",
    name: "Rishan & Nabeel (Doha, Qatar)",
    attendanceStatus: "declined",
    guestCount: 0,
    phone: "+974 5512 3456",
    attendanceType: "virtual",
    wishMessage: "Hearty congratulations Akhib brother & Fida sister! We will be in Qatar during the wedding week so unfortunately cannot attend physically, but our prayers and du'as are wholeheartedly with you both.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    isRead: false,
    isFavorite: false,
  },
  {
    id: "rsvp-5",
    name: "Farhan & Thasneem",
    attendanceStatus: "attending",
    guestCount: 3,
    phone: "+91 99950 44321",
    attendanceType: "in_person",
    wishMessage: "Barakallahu lakuma wa baraka alaikuma wa jama'a baynakuma fee khayr. Wishing our sweetest brother Akhib and bhabhi Fida a lifetime of laughter, mutual respect, and infinite barakah!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    isRead: true,
    isFavorite: true,
  }
];

const STORAGE_KEY = "wedding_rsvps_fida_akhib_v1";

export function loadSavedRsvps() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Could not load from localStorage, using initial RSVPs", err);
  }
  // save initial if empty
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialRsvps));
  } catch (e) {
    // ignore
  }
  return initialRsvps;
}

export function saveRsvps(rsvps) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rsvps));
  } catch (err) {
    console.error("Failed to save RSVPs to localStorage", err);
  }
}
