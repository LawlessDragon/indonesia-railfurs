import React, { createContext, useContext, useState, useEffect } from 'react';
// TODO: rapihin nanti
import { UserProfile, JoyrideHistoryItem, UpcomingTicket, BookedTicket, RegistrationStatus } from '../types';
import { INITIAL_USER, MOCK_APPLICANT_PENDING, MOCK_APPLICANT_REJECTED, MOCK_GUEST, GUEST_SESSION_MS, INITIAL_JOYRIDES, UPCOMING_TICKETS, INITIAL_BOOKED_TICKETS } from '../data/mockUser';

interface AuthContextType {
  isAuthenticated: boolean;
  isGuest: boolean;
  guestExpiresAt: number | null;
  user: UserProfile;
  joyrides: JoyrideHistoryItem[];
  upcomingTickets: UpcomingTicket[];
  bookedTickets: BookedTicket[];
  login: (email: string, password?: string) => boolean;
  loginAsApplicant: (mode?: 'pending' | 'rejected') => void;
  loginAsGuest: () => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  setVerificationStatus: (status: RegistrationStatus) => void;
  resubmitApplication: (updatedData?: Partial<UserProfile>) => void;
  bookTicket: (ticketId: string, seatChoice: string) => boolean;
  toastMessage: string | null;
  clearToast: () => void;
}

const STORAGE_KEY_USER = 'irs_member_profile_v3';
const STORAGE_KEY_AUTH = 'irs_member_auth_v3';
const STORAGE_KEY_TICKETS = 'irs_member_tickets_v3';
const STORAGE_KEY_GUEST = 'irs_guest_v3';
const STORAGE_KEY_GUEST_EXP = 'irs_guest_exp_v3';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function loadGuestState(): { isGuest: boolean; expiresAt: number | null } {
  try {
    const flag = localStorage.getItem(STORAGE_KEY_GUEST) === 'true';
    const exp = Number(localStorage.getItem(STORAGE_KEY_GUEST_EXP) || 0);
    // Sesi tamu hangus sendiri kalau lewat expiry
    if (flag && exp && Date.now() > exp) {
      localStorage.removeItem(STORAGE_KEY_GUEST);
      localStorage.removeItem(STORAGE_KEY_GUEST_EXP);
      return { isGuest: false, expiresAt: null };
    }
    return { isGuest: flag, expiresAt: exp || null };
  } catch {
    return { isGuest: false, expiresAt: null };
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem(STORAGE_KEY_AUTH);
    // Sesi tamu yang kedaluwarsa dianggap logout
    const g = loadGuestState();
    if (g.isGuest) return true;
    return savedAuth !== null ? savedAuth === 'true' : true;
  });

  const [guestState, setGuestState] = useState(loadGuestState);

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && typeof parsed === 'object') {
          return {
            ...INITIAL_USER,
            ...parsed,
            statusPendaftaran: parsed.statusPendaftaran || 'verified',
          };
        }
      }
    } catch {
      // Ignore parse error
    }
    return INITIAL_USER;
  });

  const [joyrides] = useState<JoyrideHistoryItem[]>(INITIAL_JOYRIDES);
  const [upcomingTickets, setUpcomingTickets] = useState<UpcomingTicket[]>(UPCOMING_TICKETS);
  const [bookedTickets, setBookedTickets] = useState<BookedTicket[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TICKETS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_BOOKED_TICKETS;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_AUTH, String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    try {
      if (guestState.isGuest && guestState.expiresAt) {
        localStorage.setItem(STORAGE_KEY_GUEST, 'true');
        localStorage.setItem(STORAGE_KEY_GUEST_EXP, String(guestState.expiresAt));
      } else {
        localStorage.removeItem(STORAGE_KEY_GUEST);
        localStorage.removeItem(STORAGE_KEY_GUEST_EXP);
      }
    } catch {
      // abaikan
    }
  }, [guestState]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(bookedTickets));
  }, [bookedTickets]);

  const login = (email: string) => {
    setIsAuthenticated(true);
    setGuestState({ isGuest: false, expiresAt: null });
    // If logging in with an applicant test email
    if (email.toLowerCase().includes('pending') || email.toLowerCase().includes('daftar')) {
      setUser({
        ...MOCK_APPLICANT_PENDING,
        email: email || MOCK_APPLICANT_PENDING.email,
      });
      setToastMessage('Masuk sebagai pendaftar (status: Dalam Peninjauan)');
    } else if (email.toLowerCase().includes('tolak') || email.toLowerCase().includes('reject')) {
      setUser({
        ...MOCK_APPLICANT_REJECTED,
        email: email || MOCK_APPLICANT_REJECTED.email,
      });
      setToastMessage('Masuk sebagai pendaftar (status: Ditolak / Perlu Revisi)');
    } else {
      setUser(prev => ({
        ...INITIAL_USER,
        statusPendaftaran: 'verified',
        email: email && email.includes('@') ? email : prev.email,
      }));
      setToastMessage('Berhasil masuk ke portal anggota resmi');
    }
    return true;
  };

  const loginAsApplicant = (mode: 'pending' | 'rejected' = 'pending') => {
    setIsAuthenticated(true);
    setGuestState({ isGuest: false, expiresAt: null });
    if (mode === 'rejected') {
      setUser(MOCK_APPLICANT_REJECTED);
      setToastMessage('Masuk sebagai pendaftar (status: Ditolak)');
    } else {
      setUser(MOCK_APPLICANT_PENDING);
      setToastMessage('Masuk sebagai pendaftar (status: Sedang Ditinjau)');
    }
  };

  // Mode tamu "beli tiket saja": OAuth yang sama, sesi 10 menit,
  // tanpa history, tanpa profil, tanpa apa pun.
  const loginAsGuest = () => {
    setUser({ ...MOCK_GUEST });
    setGuestState({ isGuest: true, expiresAt: Date.now() + GUEST_SESSION_MS });
    setIsAuthenticated(true);
    setToastMessage('Mode tamu aktif 10 menit — khusus beli tiket, tanpa history');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setGuestState({ isGuest: false, expiresAt: null });
    setToastMessage('Anda telah keluar dari portal');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev,
      ...updated,
    }));
    setToastMessage('Perubahan data berhasil disimpan');
  };

  const setVerificationStatus = (status: RegistrationStatus) => {
    setUser(prev => ({
      ...prev,
      statusPendaftaran: status,
      statusKeanggotaan: status === 'verified' ? 'Aktif' : 'Calon Anggota',
      memberId: status === 'verified' ? 'IRS-022-BDG' : (status === 'rejected' ? 'IRS-REJECTED' : 'IRS-PENDING'),
    }));
    if (status === 'verified') {
      setToastMessage('Status disetujui: Akses penuh KTA & tiket telah aktif');
    } else if (status === 'rejected') {
      setToastMessage('Status diubah: Permohonan ditolak');
    } else {
      setToastMessage('Status diubah: Dalam antrean peninjauan');
    }
  };

  const resubmitApplication = (updatedData?: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev,
      ...updatedData,
      statusPendaftaran: 'pending',
      alasanPenolakan: undefined,
      tanggalPendaftaran: 'Hari ini',
    }));
    setToastMessage('Berkas perbaikan berhasil dikirim ulang ke tim verifikasi IRS');
  };

  const bookTicket = (ticketId: string, seatChoice: string) => {
    const target = upcomingTickets.find(t => t.id === ticketId);
    if (!target) return false;

    if (target.remainingSeats <= 0) {
      setToastMessage('Kuota kursi untuk agenda ini sudah habis');
      return false;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooked: BookedTicket = {
      ticketCode: `IRS-TKT-${randomSuffix}`,
      eventId: target.id,
      eventTitle: target.eventTitle,
      trainName: target.trainName,
      route: target.route,
      date: target.date,
      time: target.time,
      passengerRealName: user.namaAsli,
      passengerFursonaName: user.namaFursona,
      seatNumber: seatChoice || 'EKS-1 / 04A',
      price: target.price,
      bookedAt: 'Hari ini'
    };

    setBookedTickets(prev => [newBooked, ...prev]);
    setUpcomingTickets(prev =>
      prev.map(t =>
        t.id === ticketId ? { ...t, remainingSeats: Math.max(0, t.remainingSeats - 1) } : t
      )
    );

    setToastMessage(`Tiket ${target.eventTitle} berhasil dipesan`);
    return true;
  };

  const clearToast = () => {
    setToastMessage(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isGuest: guestState.isGuest,
        guestExpiresAt: guestState.expiresAt,
        user,
        joyrides,
        upcomingTickets,
        bookedTickets,
        login,
        loginAsApplicant,
        loginAsGuest,
        logout,
        updateProfile,
        setVerificationStatus,
        resubmitApplication,
        bookTicket,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
