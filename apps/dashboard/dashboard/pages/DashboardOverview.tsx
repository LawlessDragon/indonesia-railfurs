import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { RailPassCard } from '../components/RailPassCard';
import { ProfileEditModal } from '../components/ProfileEditModal';
import { 
  Sparkles, 
  MapPin, 
  User, 
  Clock, 
  Check, 
  Train, 
  RotateCcw,
  CalendarCheck2,
  ExternalLink
} from 'lucide-react';

interface DashboardOverviewProps {
  onBackToLanding: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onBackToLanding }) => {
  const { user, updateProfile, resetToDefault } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  if (!user) {
    return null;
  }

  const handleSaveProfile = (updates: Partial<typeof user>) => {
    updateProfile(updates);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
    }, 3500);
  };

  const handleResetData = () => {
    if (window.confirm('Kembalikan data profil ke setelan awal demo?')) {
      resetToDefault();
      setSaveToast(true);
      setTimeout(() => {
        setSaveToast(false);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-black">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 rounded-xl border border-emerald-500/40 bg-neutral-900 px-4 py-3 text-xs font-semibold text-emerald-300 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <Check size={16} className="text-emerald-400" />
          <span>Data profil berhasil diperbarui dan tersimpan!</span>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
              <Train size={13} className="text-amber-400" />
              <span>STASIUN PUSAT IRS • PORTAL ANGGOTA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
              Halo, {user.namaFursona}
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Kartu identitas resmi Railfur aktif. Kelola nama asli, karakter, umur, domisili, dan foto di bawah ini.
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center space-x-2 rounded-xl bg-white hover:bg-neutral-200 text-black px-4 py-2.5 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Sparkles size={13} />
              <span>Edit Profil Sekarang</span>
            </button>
            <button
              onClick={handleResetData}
              className="rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white p-2.5 text-xs transition-colors cursor-pointer"
              title="Reset ke data awal"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* Section 1: The Rail Pass Card Centerpiece */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Kartu Boarding Pass Railfur
            </h2>
            <span className="text-[11px] text-neutral-500 font-mono">
              Status: Terdaftar & Terverifikasi
            </span>
          </div>
          
          <RailPassCard
            member={user}
            onEdit={() => setIsEditModalOpen(true)}
          />
        </section>

        {/* Section 2: Data Rincian Identitas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Nama & Karakter */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-bold uppercase tracking-wider">Identitas Karakter</span>
              <User size={15} />
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">Nama Asli</span>
                <span className="text-neutral-200 font-semibold text-sm">{user.namaAsli}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">Fursona / OC</span>
                <span className="text-white font-bold text-sm">{user.namaFursona}</span>
              </div>
              {user.spesiesOC && (
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-mono">Spesies Karakter</span>
                  <span className="text-neutral-300">{user.spesiesOC}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="w-full text-center py-2 rounded-lg border border-neutral-800 hover:bg-neutral-800 text-xs text-neutral-300 font-medium transition-colors cursor-pointer"
            >
              Ubah Nama
            </button>
          </div>

          {/* Card 2: Umur & Wilayah */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-bold uppercase tracking-wider">Umur & Domisili</span>
              <MapPin size={15} />
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">Usia Anggota</span>
                <span className="text-neutral-200 font-semibold text-sm">{user.umur} Tahun</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">Kota Domisili</span>
                <span className="text-white font-bold text-sm">{user.domisili}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">Wilayah Operasional</span>
                <span className="text-neutral-300">Lintas Jawa & Jalur Lokal</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="w-full text-center py-2 rounded-lg border border-neutral-800 hover:bg-neutral-800 text-xs text-neutral-300 font-medium transition-colors cursor-pointer"
            >
              Ubah Domisili / Umur
            </button>
          </div>

          {/* Card 3: Keanggotaan & Stempel */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-bold uppercase tracking-wider">Status Komunitas</span>
              <Clock size={15} />
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">Nomor Anggota</span>
                <span className="text-neutral-200 font-mono text-xs">{user.nomorAnggota}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">Masa Aktif</span>
                <span className="text-emerald-400 font-semibold">Aktif Seumur Hidup</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase font-mono">Tanggal Masuk</span>
                <span className="text-neutral-300">{user.tanggalBergabung}</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="w-full text-center py-2 rounded-lg border border-neutral-800 hover:bg-neutral-800 text-xs text-neutral-300 font-medium transition-colors cursor-pointer"
            >
              Ganti Foto Profil
            </button>
          </div>
        </section>

        {/* Section 3: Riwayat Pertemuan / Jejak IRS Member */}
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CalendarCheck2 size={16} className="text-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Jejak Perjalanan IRS
              </h3>
            </div>
            <button
              onClick={onBackToLanding}
              className="inline-flex items-center space-x-1 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Lihat arsip kegiatan lengkap</span>
              <ExternalLink size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-500">2022</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">Yogyakarta</span>
              </div>
              <div className="font-semibold text-white">IRS 1: The Debut</div>
              <div className="text-[11px] text-neutral-400">Loko Cafe Malioboro</div>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-500">2022</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">Bandung</span>
              </div>
              <div className="font-semibold text-white">IRS 2: Bandung Line</div>
              <div className="text-[11px] text-neutral-400">Komuter Jalur Lokal</div>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-500">2023</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">Bogor</span>
              </div>
              <div className="font-semibold text-white">IRS 3: Bogor Station</div>
              <div className="text-[11px] text-neutral-400">Hangout Tomoro Coffee</div>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-400 font-bold">2023</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">Solo</span>
              </div>
              <div className="font-semibold text-white">IRS 4: Nostalgicfurs</div>
              <div className="text-[11px] text-neutral-300">Kereta Uap Jaladara</div>
            </div>
          </div>
        </section>
      </main>

      {/* Edit Profile Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        member={user}
        onSave={handleSaveProfile}
      />
    </div>
  );
};
