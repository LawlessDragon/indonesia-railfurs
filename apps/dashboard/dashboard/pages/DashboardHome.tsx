import React from 'react';
// TODO: cek lagi kalau sempat
// TODO: rapihin nanti
import { useAuth } from '../context/AuthContext';
import { DashboardView } from '../types/dashboard';
import { ProfileCard } from '../components/ProfileCard';
import { TicketBadge } from '../components/TicketBadge';
import { 
  Train, 
  MapPin, 
  UserCheck, 
  Sparkles, 
  ArrowRight, 
  Calendar,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface DashboardHomeProps {
  onNavigate: (view: DashboardView) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate }) => {
  const { user, trips } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome Banner */}
      <div className="bg-black text-white p-6 md:p-8 rounded-3xl border-2 border-black shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 border-white/20 bg-neutral-900 shrink-0">
              <img
                src={user.fotoUrl}
                alt={user.namaFursona}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-white/10 text-white rounded">
                  {user.nomorAnggota}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white text-black rounded">
                  {user.tierStatus}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Halo, {user.namaFursona}!
              </h1>
              <p className="text-xs text-neutral-400 mt-0.5">
                {user.namaAsli} &bull; {user.umur} Tahun &bull; {user.domisili}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('profile')}
              className="px-4 py-2.5 bg-white text-black text-xs font-black uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-all flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Edit Profil</span>
            </button>
            <button
              onClick={() => onNavigate('kta')}
              className="px-4 py-2.5 bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-700 transition-all flex items-center gap-2 border border-neutral-700"
            >
              <span>Lihat KTA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Train silhouette decorative watermark */}
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-12 translate-y-8">
          <Train className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-300 shadow-sm">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider">Perjalanan</span>
            <Train className="w-4 h-4 text-black" />
          </div>
          <p className="text-2xl font-black text-black">
            {user.tripsAttended?.length || 4}
          </p>
          <p className="text-[11px] text-neutral-500 mt-1">Joyride diikuti</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-300 shadow-sm">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider">Domisili</span>
            <MapPin className="w-4 h-4 text-black" />
          </div>
          <p className="text-base font-black text-black truncate">
            {user.domisili}
          </p>
          <p className="text-[11px] text-neutral-500 mt-1">Wilayah daop aktif</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-300 shadow-sm">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider">Umur</span>
            <Sparkles className="w-4 h-4 text-black" />
          </div>
          <p className="text-2xl font-black text-black">
            {user.umur} <span className="text-xs font-normal text-neutral-500">Thn</span>
          </p>
          <p className="text-[11px] text-neutral-500 mt-1">Usia terverifikasi</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-300 shadow-sm">
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider">Status KTA</span>
            <ShieldCheck className="w-4 h-4 text-black" />
          </div>
          <p className="text-base font-black text-black truncate">
            Aktif
          </p>
          <p className="text-[11px] text-neutral-500 mt-1">Kartu digital sah</p>
        </div>
      </div>

      {/* Main Grid: KTA Preview & Upcoming Joyride / Events */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: KTA Card Showcase */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-black flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Kartu Anggota Kamu
            </h3>
            <button
              onClick={() => onNavigate('profile')}
              className="text-xs font-bold text-neutral-600 hover:text-black underline underline-offset-4"
            >
              Ubah Data
            </button>
          </div>

          <ProfileCard user={user} showActions={true} />

          <div className="p-4 bg-white border border-neutral-300 rounded-xl text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-black border-b border-neutral-200 pb-2">
              <span>Informasi Railfan</span>
              <span className="text-[10px] font-mono text-neutral-500">IRS BIO</span>
            </div>
            <p className="text-neutral-600 leading-relaxed italic">
              "{user.bio || 'Belum ada bio singkat.'}"
            </p>
            <div className="pt-2 flex flex-col gap-1 text-[11px] text-neutral-700 font-mono">
              <div><strong className="text-black">Stasiun Favorit:</strong> {user.stasiunFavorit || 'Belum diatur'}</div>
              <div><strong className="text-black">Lokomotif:</strong> {user.lokomotifFavorit || 'Belum diatur'}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Joyride Events & Announcements */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-black flex items-center gap-2">
              <Train className="w-4 h-4" /> Tiket & Jejak Perjalanan Kereta
            </h3>
            <button
              onClick={() => onNavigate('trips')}
              className="text-xs font-bold text-neutral-600 hover:text-black underline underline-offset-4"
            >
              Lihat Semua ({trips.length})
            </button>
          </div>

          <div className="space-y-4">
            {trips.slice(0, 3).map((trip) => (
              <TicketBadge key={trip.id} trip={trip} />
            ))}
          </div>

          {/* Subdomain Notice */}
          <div className="p-5 bg-neutral-900 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                SUBDOMAIN REGISTRASI
              </span>
              <h4 className="text-sm font-black uppercase">
                Ajak Teman Baru ke Indonesian Railfurs
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Gunakan tautan resmi subdomain untuk pendaftaran anggota baru.
              </p>
            </div>
            <a
              href="https://join.railfurs.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>join.railfurs.my.id</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
