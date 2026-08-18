import React, { useState } from 'react';
// TODO: rapihin nanti
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, ArrowRight, ShieldCheck, UserCheck, Clock, X, MessagesSquare, Globe, Ticket } from 'lucide-react';
import { IMAGES } from '../../constants';

interface LoginPageProps {
  onBackToLanding: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBackToLanding }) => {
  const { login, loginAsApplicant, loginAsGuest } = useAuth();
  const [loading, setLoading] = useState(false);

  const runSoon = (fn: () => void, ms = 250) => {
    setLoading(true);
    setTimeout(() => {
      fn();
      setLoading(false);
    }, ms);
  };

  const handleDiscord = () => runSoon(() => login('reno.swiftail@railfurs.id'), 200);
  const handleGoogle = () => runSoon(() => login('reno.swiftail@railfurs.id'), 200);

  const handleVerifiedDemo = () => runSoon(() => login('reno.swiftail@railfurs.id'), 200);

  const handleApplicantDemo = () => runSoon(() => loginAsApplicant('pending'), 200);

  const handleGuest = () => runSoon(() => loginAsGuest(), 200);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white">
      
      {/* Top Bar with generous space */}
      <header className="px-6 md:px-12 py-8 flex items-center justify-between">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Beranda</span>
        </button>

        <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
          IRS Portal v2.0
        </span>
      </header>

      {/* Main Login Canvas with generous whitespace */}
      <main className="flex-grow flex items-center justify-center px-6 py-8 md:py-12">
        <div className="w-full max-w-md space-y-6">
          
          {/* Logo & Headline */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3">
              <img
                src={IMAGES.logo}
                alt="Indonesian Railfurs Logo"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </div>

            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-900 uppercase">
              Portal Akses Anggota
            </h1>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Akses kartu identitas digital, riwayat joyride, dan pantauan status verifikasi pendaftar.
            </p>
          </div>

          {/* Login Form Container */}
          <div className="border border-neutral-300 bg-white p-7 md:p-8 rounded-lg shadow-sm space-y-5">

            {/* Jalur utama: OAuth Discord / Google */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block text-center font-bold">
                Masuk sebagai anggota
              </span>

              <button
                type="button"
                onClick={handleDiscord}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold uppercase tracking-widest rounded-md transition-colors cursor-pointer shadow-sm"
              >
                <MessagesSquare size={14} />
                <span>{loading ? 'Memproses...' : 'Masuk dengan Discord'}</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-md transition-colors cursor-pointer shadow-sm"
              >
                <Globe size={14} />
                <span>{loading ? 'Memproses...' : 'Masuk dengan Google'}</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Jalur tamu: beli tiket saja, sesi 10 menit */}
            <div className="pt-2 border-t border-neutral-100 space-y-2">
              <button
                type="button"
                onClick={handleGuest}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 border-2 border-dashed border-neutral-300 hover:border-black text-neutral-800 text-xs font-semibold rounded-md transition-colors cursor-pointer bg-neutral-50 hover:bg-white"
              >
                <Ticket size={14} className="text-neutral-600" />
                <span>Ingin membeli tiket saja? :3</span>
              </button>
              <p className="text-[10px] text-neutral-400 text-center">
                Mode tamu 10 menit — tanpa history, tanpa profil
              </p>
            </div>

            {/* Username + password: dikunci, under construction */}
            <div className="pt-2 border-t border-neutral-100 space-y-3">
              <div className="relative" aria-disabled="true" title="Login username & password belum dibuka">
                <div className="space-y-4 grayscale opacity-50 select-none pointer-events-none" aria-hidden="true">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Email atau ID Anggota
                    </label>
                    <input
                      type="text"
                      disabled
                      tabIndex={-1}
                      value=""
                      placeholder="nama@railfurs.id atau email pendaftar"
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-md bg-neutral-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Kata Sandi
                    </label>
                    <input
                      type="password"
                      disabled
                      tabIndex={-1}
                      value=""
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-md bg-neutral-100"
                    />
                  </div>
                  <div className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-200 text-neutral-400 text-xs font-bold uppercase tracking-widest rounded-md">
                    <span>Masuk ke Portal</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* Segel under construction */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-sm shadow-lg -rotate-3">
                    <X size={14} strokeWidth={3} />
                    <span>Under construction</span>
                  </span>
                </div>
              </div>

              {/* Quick Demo Options for testing both Verified and Applicant modes */}
              <div className="pt-2 border-t border-neutral-100 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block text-center font-bold">
                  Pilih Mode Simulasi Cepat
                </span>

                <button
                  type="button"
                  onClick={handleVerifiedDemo}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-neutral-300 hover:border-black text-neutral-800 text-xs font-semibold rounded-md transition-colors cursor-pointer bg-neutral-50 hover:bg-white"
                >
                  <UserCheck size={14} className="text-emerald-600" />
                  <span>Mode Anggota Terverifikasi (KTA & Full Fitur)</span>
                </button>

                <button
                  type="button"
                  onClick={handleApplicantDemo}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-neutral-300 hover:border-black text-neutral-800 text-xs font-semibold rounded-md transition-colors cursor-pointer bg-neutral-50 hover:bg-white"
                >
                  <Clock size={14} className="text-amber-600" />
                  <span>Mode Pendaftar (Status Terbatas / Pending)</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
              <ShieldCheck size={14} />
              <span>Sistem Akses Resmi Komunitas Indonesian Railfurs</span>
            </div>
          </div>

        </div>
      </main>

      {/* Clean Footer */}
      <footer className="px-6 md:px-12 py-6 text-center text-xs text-neutral-400 border-t border-neutral-100">
        <p>Indonesian Railfurs &copy; {new Date().getFullYear()}. Seluruh hak cipta dilindungi.</p>
      </footer>

    </div>
  );
};
