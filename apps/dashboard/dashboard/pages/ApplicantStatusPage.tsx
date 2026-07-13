import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { RegistrationStatus } from '../types';
import { ProfileEditModal } from '../components/ProfileEditModal';
import { IMAGES } from '../../constants';
import { 
  ArrowLeft, 
  LogOut, 
  Edit3, 
  ArrowRight,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  Compass
} from 'lucide-react';

interface ApplicantStatusPageProps {
  onBackToLanding: () => void;
}

export const ApplicantStatusPage: React.FC<ApplicantStatusPageProps> = ({ onBackToLanding }) => {
  const { user, logout, setVerificationStatus, updateProfile, resubmitApplication } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tickerTime, setTickerTime] = useState<string>('');

  const status = user.statusPendaftaran || 'pending';

  // Live real-time railway clock counter
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTickerTime(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} WIB`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveProfileAndResubmit = (updated: any) => {
    updateProfile(updated);
    if (status === 'rejected') {
      resubmitApplication(updated);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0f12] text-neutral-100 flex flex-col justify-between selection:bg-white selection:text-black font-sans relative overflow-x-hidden">
      
      {/* Background Subtle Railway Grid & Wireframe Coordinates */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      {/* 1. Experimental Top Dispatch Navigation Bar */}
      <header className="w-full border-b border-white/10 bg-[#0e0f12]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Brand & Telegraph ID */}
          <div className="flex items-center gap-3">
            <img
              src={IMAGES.logo}
              alt="IRS Logo"
              className="h-6 w-auto object-contain brightness-0 invert"
            />
            <div className="h-4 w-px bg-white/20" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-white">
                IRS // INSPEKSI MASUK
              </span>
              <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
                POS BLOK WESEL PENDAFTARAN
              </span>
            </div>
          </div>

          {/* Right Clock & Session Controls */}
          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{tickerTime || '00:00:00 WIB'}</span>
            </div>

            <button
              type="button"
              onClick={onBackToLanding}
              className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Beranda</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20"
              title="Keluar Sesi"
            >
              <LogOut size={13} />
              <span>Keluar</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. Experimental Canvas: The Railway Clearance Docket */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 md:py-14 space-y-8 z-10">
        
        {/* Signal Semaphore Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-neutral-900/90 border border-white/10">
          <div className="flex items-center gap-3">
            {/* Visual 3-Aspect Railway Lamp Housing */}
            <div className="flex items-center gap-1.5 bg-black p-1.5 rounded-full border border-white/20 shadow-inner">
              <div 
                className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                  status === 'rejected' 
                    ? 'bg-rose-500 shadow-[0_0_12px_#f43f5e]' 
                    : 'bg-rose-950 opacity-40'
                }`}
                title="Sinyal Merah: Berhenti / Tolak"
              />
              <div 
                className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                  status === 'pending' 
                    ? 'bg-amber-400 shadow-[0_0_12px_#fbbf24] animate-pulse' 
                    : 'bg-amber-950 opacity-40'
                }`}
                title="Sinyal Kuning: Hati-Hati / Dalam Tinjauan"
              />
              <div 
                className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                  status === 'verified' 
                    ? 'bg-emerald-400 shadow-[0_0_12px_#34d399]' 
                    : 'bg-emerald-950 opacity-40'
                }`}
                title="Sinyal Hijau: Berjalan / Lolos Masuk"
              />
            </div>

            <div>
              <p className="text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-200">
                {status === 'pending' && 'SEMBOYAN 6: LANGSIR DITAHAN (DALAM PENINJAUAN)'}
                {status === 'rejected' && 'SEMBOYAN 7: JALUR DITUTUP (PERBAIKAN BERKAS)'}
                {status === 'verified' && 'SEMBOYAN 40: IZIN BERANGKAT PENUH DITERBITKAN'}
              </p>
              <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                KODE POS: BLOK-SBY/089 &middot; DOKUMEN: {user.nomorPendaftaran || 'REG-2026-089'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-neutral-400">
              Antrean Verifikasi #14
            </span>
          </div>
        </div>

        {/* The Tactile Physical Waybill / Dokumen Berkas Masuk */}
        <div className="relative bg-[#f6f6f2] text-neutral-900 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden border border-neutral-300">
          
          {/* Top Perforated Receipt Header */}
          <div className="bg-[#18191c] text-white p-5 sm:p-6 border-b-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
            
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-400">
                  LEMBAR MANIFEST PENDAFTARAN RESMI
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="text-[9px] font-mono text-neutral-400 uppercase">
                  INDONESIAN RAILFURS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-1">
                Dossier Calon Anggota
              </h2>
            </div>

            {/* Stamped Status Badge on dark header */}
            <div className={`px-4 py-2 border font-mono text-xs font-black tracking-widest uppercase rounded-sm inline-flex items-center gap-2 self-start sm:self-auto ${
              status === 'pending'
                ? 'border-amber-400/80 bg-amber-400/10 text-amber-300'
                : status === 'rejected'
                ? 'border-rose-500/80 bg-rose-500/10 text-rose-300'
                : 'border-emerald-400/80 bg-emerald-400/10 text-emerald-300'
            }`}>
              <Activity size={13} className="animate-spin-slow" />
              <span>
                {status === 'pending' && 'ANTRIAN PENINJAUAN'}
                {status === 'rejected' && 'PERLU REVISI TEKNIS'}
                {status === 'verified' && 'DIVERIFIKASI RESMI'}
              </span>
            </div>

            {/* Industrial Hazard Stripe Accent */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 8px, #eab308 8px, #eab308 16px)'
              }}
              aria-hidden="true"
            />
          </div>

          {/* Waybill Main Interior (Warm Paper Aesthetic) */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Top Identity Block with Fursona Passport Frame */}
            <div className="flex flex-col sm:flex-row gap-6 items-start pb-6 border-b border-neutral-300">
              
              {/* Photo Frame with Rubber Stamp Accent */}
              <div className="relative shrink-0 mx-auto sm:mx-0">
                <div className="w-28 h-28 bg-white border-2 border-black p-1 shadow-sm relative overflow-hidden">
                  <img
                    src={user.foto}
                    alt={user.namaFursona}
                    className="w-full h-full object-cover grayscale contrast-125"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Stamp Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                    <div className="border-2 border-black rounded-full w-20 h-20 flex items-center justify-center rotate-[-15deg] font-mono text-[8px] font-black text-center uppercase p-1">
                      IRS INSPEKSI 2026
                    </div>
                  </div>
                </div>

                <div className="text-center mt-1.5">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-500 block">
                    FOTO BERKAS
                  </span>
                </div>
              </div>

              {/* Waybill Metadata Columns */}
              <div className="flex-1 w-full space-y-4">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-500 block">
                    IDENTITAS KARAKTER OC / FURSONA
                  </span>
                  <h3 className="text-2xl font-black uppercase text-neutral-900 tracking-tight leading-none mt-0.5">
                    {user.namaFursona}
                  </h3>
                  {user.spesiesOC && (
                    <p className="text-xs font-mono text-neutral-600 mt-0.5">
                      Spesies: {user.spesiesOC}
                    </p>
                  )}
                </div>

                {/* Waybill Grid Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left">
                  <div className="p-2.5 bg-neutral-200/60 rounded-xs border border-neutral-300">
                    <span className="text-[8px] font-mono uppercase text-neutral-500 block font-bold">NAMA ASLI</span>
                    <span className="text-xs font-bold text-neutral-900 block truncate">{user.namaAsli}</span>
                  </div>

                  <div className="p-2.5 bg-neutral-200/60 rounded-xs border border-neutral-300">
                    <span className="text-[8px] font-mono uppercase text-neutral-500 block font-bold">USIA PEMOHON</span>
                    <span className="text-xs font-bold font-mono text-neutral-900 block">{user.umur} Tahun</span>
                  </div>

                  <div className="p-2.5 bg-neutral-200/60 rounded-xs border border-neutral-300 col-span-2 sm:col-span-1">
                    <span className="text-[8px] font-mono uppercase text-neutral-500 block font-bold">DIPO / DOMISILI</span>
                    <span className="text-xs font-bold text-neutral-900 block truncate">{user.domisili}</span>
                  </div>

                  <div className="p-2.5 bg-neutral-200/60 rounded-xs border border-neutral-300">
                    <span className="text-[8px] font-mono uppercase text-neutral-500 block font-bold">LOKOMOTIF MINAT</span>
                    <span className="text-[11px] font-medium text-neutral-800 block truncate">
                      {user.keretaFavorit || 'KRL / CC 206'}
                    </span>
                  </div>

                  <div className="p-2.5 bg-neutral-200/60 rounded-xs border border-neutral-300">
                    <span className="text-[8px] font-mono uppercase text-neutral-500 block font-bold">TANGGAL MASUK</span>
                    <span className="text-xs font-mono font-bold text-neutral-900 block">
                      {user.tanggalPendaftaran || '28 Sep 2026'}
                    </span>
                  </div>

                  <div className="p-2.5 bg-neutral-200/60 rounded-xs border border-neutral-300">
                    <span className="text-[8px] font-mono uppercase text-neutral-500 block font-bold">KODE TIKET REG</span>
                    <span className="text-xs font-mono font-bold text-neutral-900 block">
                      {user.nomorPendaftaran || 'REG-2026-BDG-089'}
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Dynamic Status Section */}
            <div className="space-y-4">
              
              {/* STATE 1: PENDING */}
              {status === 'pending' && (
                <div className="p-5 bg-amber-500/10 border-2 border-amber-500/60 rounded-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-900 font-mono text-xs font-black uppercase tracking-wider">
                      <Compass size={16} className="text-amber-700 animate-spin-slow" />
                      <span>INSPEKSI FISIK SEDANG BERLANGSUNG</span>
                    </div>
                    <span className="text-[9px] font-mono bg-amber-200 text-amber-950 font-bold px-2 py-0.5 rounded">
                      ESTIMASI 1-3 HARI
                    </span>
                  </div>

                  <p className="text-xs text-neutral-800 leading-relaxed font-sans">
                    Data pendaftaran dan identitas karakter OC Anda berada dalam antrean peninjauan oleh dewan pengurus Indonesian Railfurs. Akses penuh ke kartu anggota digital dan sistem reservasi joyride akan dibuka begitu sinyal masuk hijau diberikan.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-amber-300/60">
                    <span className="text-[11px] font-mono text-neutral-600">
                      Perlu mengganti foto karakter atau kota domisili?
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                    >
                      <Edit3 size={13} />
                      <span>Koreksi Berkas Anda</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STATE 2: REJECTED */}
              {status === 'rejected' && (
                <div className="p-5 bg-rose-500/10 border-2 border-rose-500 rounded-sm space-y-3">
                  <div className="flex items-center gap-2 text-rose-900 font-mono text-xs font-black uppercase tracking-wider">
                    <AlertTriangle size={16} className="text-rose-700" />
                    <span>CATATAN WESEL DITOLAK // SINYAL MERAH</span>
                  </div>

                  <div className="p-3 bg-white/80 border border-rose-300 rounded-xs font-mono text-xs text-rose-950 leading-relaxed">
                    {user.alasanPenolakan || 'Foto karakter fursona tidak memenuhi resolusi minimum komunitas dan data domisili belum lengkap. Harap perbarui data berkas Anda.'}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-rose-300">
                    <span className="text-[11px] font-mono text-neutral-700">
                      Silakan perbaiki data di bawah untuk mengirim ulang verifikasi:
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer shadow-sm"
                    >
                      <Edit3 size={14} />
                      <span>Revisi Berkas Sekarang</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STATE 3: VERIFIED */}
              {status === 'verified' && (
                <div className="p-5 bg-emerald-500/10 border-2 border-emerald-600 rounded-sm space-y-4">
                  <div className="flex items-center gap-2 text-emerald-900 font-mono text-xs font-black uppercase tracking-wider">
                    <CheckCircle2 size={18} className="text-emerald-700" />
                    <span>VERIFIKASI TUNTAS // SEMBOYAN 40 DIBERIKAN</span>
                  </div>

                  <p className="text-xs text-neutral-800 leading-relaxed font-sans">
                    Selamat! Permohonan keanggotaan Anda telah resmi disetujui. Kartu Tanda Anggota (KTA) Digital resmi telah terbit dengan nomor registrasi aktif: <span className="font-mono font-bold text-neutral-900">{user.memberId}</span>.
                  </p>

                  <button
                    type="button"
                    onClick={() => setVerificationStatus('verified')}
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-black uppercase tracking-[0.2em] rounded-xs transition-colors cursor-pointer shadow-md"
                  >
                    <span>Buka Akses Penuh Dasbor & KTA Pass</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* Bottom Barcode Strip on Waybill */}
          <div className="px-6 py-4 bg-neutral-100 border-t border-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="font-bold tracking-widest text-neutral-800">
                {user.nomorPendaftaran || 'REG-2026-BDG-089'}
              </span>
              <span className="text-neutral-400">&bull;</span>
              <span className="text-neutral-500 text-[10px]">
                SECURE RAILWAY DOCKET
              </span>
            </div>

            {/* Custom Barcode Aesthetic */}
            <div className="flex items-center gap-[2px] h-5 opacity-60" aria-hidden="true">
              <span className="w-1.5 h-full bg-black"></span>
              <span className="w-0.5 h-full bg-black"></span>
              <span className="w-2 h-full bg-black"></span>
              <span className="w-0.5 h-full bg-black"></span>
              <span className="w-1 h-full bg-black"></span>
              <span className="w-3 h-full bg-black"></span>
              <span className="w-0.5 h-full bg-black"></span>
              <span className="w-1.5 h-full bg-black"></span>
              <span className="w-2 h-full bg-black"></span>
              <span className="w-0.5 h-full bg-black"></span>
              <span className="w-1.5 h-full bg-black"></span>
            </div>
          </div>

        </div>

        {/* 3. Experimental Interactive Mechanical Switcher Console (Tuas Sinyal Rel) */}
        <div className="p-4 sm:p-5 rounded-lg bg-neutral-900 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold">
              <Terminal size={14} className="text-emerald-400" />
              <span>KONSOL TUAS SIMULASI STATUS PENDAFTAR</span>
            </div>
            <span className="text-[9px] font-mono text-neutral-500">
              Uji Coba Respon Status
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            
            {/* Lever 1: Pending */}
            <button
              type="button"
              onClick={() => setVerificationStatus('pending')}
              className={`p-3 rounded-md border text-left font-mono transition-all cursor-pointer flex flex-col justify-between ${
                status === 'pending'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'bg-black/40 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold tracking-wider uppercase">TUAS 1 // MENUNGGU</span>
                <span className={`w-2 h-2 rounded-full ${status === 'pending' ? 'bg-amber-400 animate-ping' : 'bg-neutral-600'}`} />
              </div>
              <p className="text-xs font-bold text-white">Status: Pending</p>
              <span className="text-[9px] text-neutral-400 mt-1">Dalam antrean inspeksi berkas</span>
            </button>

            {/* Lever 2: Rejected */}
            <button
              type="button"
              onClick={() => setVerificationStatus('rejected')}
              className={`p-3 rounded-md border text-left font-mono transition-all cursor-pointer flex flex-col justify-between ${
                status === 'rejected'
                  ? 'bg-rose-500/20 border-rose-500 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                  : 'bg-black/40 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold tracking-wider uppercase">TUAS 2 // DITOLAK</span>
                <span className={`w-2 h-2 rounded-full ${status === 'rejected' ? 'bg-rose-500 animate-ping' : 'bg-neutral-600'}`} />
              </div>
              <p className="text-xs font-bold text-white">Status: Ditolak</p>
              <span className="text-[9px] text-neutral-400 mt-1">Sinyal merah & opsi revisi</span>
            </button>

            {/* Lever 3: Verified */}
            <button
              type="button"
              onClick={() => setVerificationStatus('verified')}
              className={`p-3 rounded-md border text-left font-mono transition-all cursor-pointer flex flex-col justify-between ${
                status === 'verified'
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                  : 'bg-black/40 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold tracking-wider uppercase">TUAS 3 // DITERIMA</span>
                <span className={`w-2 h-2 rounded-full ${status === 'verified' ? 'bg-emerald-400 animate-ping' : 'bg-neutral-600'}`} />
              </div>
              <p className="text-xs font-bold text-white">Status: Diterima</p>
              <span className="text-[9px] text-neutral-400 mt-1">Lolos KTA & akses penuh</span>
            </button>

          </div>
        </div>

      </main>

      {/* Clean Footer with Station ID */}
      <footer className="border-t border-white/10 py-5 px-6 text-center text-xs font-mono text-neutral-500 z-10">
        <p>INDONESIAN RAILFURS &middot; CENTRAL DISPATCH STATION // PORTAL VERIFIKASI 2026</p>
      </footer>

      {/* Modal Edit Berkas */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleSaveProfileAndResubmit}
      />

    </div>
  );
};
