import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, LogOut, Ticket, Timer, ExternalLink } from 'lucide-react';
import { IMAGES } from '../../constants';

interface GuestTicketPageProps {
  onBackToLanding: () => void;
}

function formatLeft(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export const GuestTicketPage: React.FC<GuestTicketPageProps> = ({ onBackToLanding }) => {
  const { guestExpiresAt, logout } = useAuth();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const left = (guestExpiresAt || 0) - now;

  // Sesi tamu hangus sendiri
  useEffect(() => {
    if (guestExpiresAt && left <= 0) logout();
  }, [left, guestExpiresAt, logout]);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white">
      <header className="px-6 md:px-12 py-8 flex items-center justify-between">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Beranda</span>
        </button>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase text-amber-600">
          <Timer size={14} />
          <span>Sisa {formatLeft(left)}</span>
        </span>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 py-8 md:py-12">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="flex justify-center mb-3">
            <img
              src={IMAGES.logo}
              alt="Indonesian Railfurs Logo"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase">
            Mode Tamu
          </h1>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Sesi 10 menit khusus beli tiket. Tanpa history, tanpa profil — selesai, sesi hangus sendiri.
          </p>

          <div className="border border-neutral-300 bg-white p-7 md:p-8 rounded-lg shadow-sm space-y-3">
            <a
              href="https://tiket.railfurs.my.id"
              className="w-full flex items-center justify-center gap-2 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-md transition-colors cursor-pointer shadow-sm"
            >
              <Ticket size={14} />
              <span>Lanjut beli tiket</span>
              <ExternalLink size={14} />
            </a>

            <button
              type="button"
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut size={13} />
              <span>Selesai & keluar</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="px-6 md:px-12 py-6 text-center text-xs text-neutral-400 border-t border-neutral-100">
        <p>Indonesian Railfurs &copy; {new Date().getFullYear()}. Seluruh hak cipta dilindungi.</p>
      </footer>
    </div>
  );
};
