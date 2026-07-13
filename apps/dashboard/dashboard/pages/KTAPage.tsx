import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ProfileCard } from '../components/ProfileCard';
import { CreditCard, Printer, UserCheck } from 'lucide-react';
import { DashboardView } from '../types/dashboard';

interface KTAPageProps {
  onNavigate: (view: DashboardView) => void;
}

export const KTAPage: React.FC<KTAPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  if (!user) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 bg-white px-2.5 py-0.5 rounded-full border border-neutral-300 inline-block">
              IDENTITAS RESMI IRS
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black flex items-center gap-2">
            <CreditCard className="w-7 h-7" /> Kartu Tanda Anggota Digital
          </h1>
          <p className="text-xs text-neutral-600 mt-1 max-w-xl">
            Tunjukkan kartu ini saat registrasi ulang joyride bersama Indonesian Railfurs di stasiun atau gathering kopi darat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('profile')}
            className="px-4 py-2 border border-neutral-300 bg-white hover:border-black rounded-xl text-xs font-bold text-black flex items-center gap-1.5 transition-all"
          >
            <UserCheck className="w-4 h-4" /> Edit Data
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" /> Cetak Kartu
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-6">
        <div className="w-full max-w-md">
          <ProfileCard user={user} showActions={true} />
        </div>

        <div className="mt-8 max-w-md w-full bg-white border border-neutral-300 rounded-2xl p-5 text-xs text-neutral-600 space-y-2">
          <div className="flex items-center justify-between font-bold text-black border-b border-neutral-200 pb-2">
            <span>Rincian Kartu Digital</span>
            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              TERVERIFIKASI
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div>
              <span className="text-neutral-400 block font-mono text-[10px]">NAMA ASLI</span>
              <span className="font-semibold text-black">{user.namaAsli}</span>
            </div>
            <div>
              <span className="text-neutral-400 block font-mono text-[10px]">FURSONA</span>
              <span className="font-semibold text-black">{user.namaFursona}</span>
            </div>
            <div>
              <span className="text-neutral-400 block font-mono text-[10px]">UMUR</span>
              <span className="font-semibold text-black">{user.umur} Tahun</span>
            </div>
            <div>
              <span className="text-neutral-400 block font-mono text-[10px]">DOMISILI</span>
              <span className="font-semibold text-black">{user.domisili}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
