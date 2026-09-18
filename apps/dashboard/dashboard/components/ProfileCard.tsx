import React, { useState } from 'react';
// TODO: perlu dirapihin
// TODO: perlu dirapihin
import { UserProfile } from '../types/dashboard';
import { Train, ShieldCheck, MapPin, Calendar, Sparkles, Check, Copy } from 'lucide-react';

interface ProfileCardProps {
  user: UserProfile;
  showActions?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, showActions = true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.nomorAnggota);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Boarding Pass / KTA Card */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-black bg-white shadow-2xl transition-all duration-300">
        {/* Top Header Ticket Band */}
        <div className="bg-black text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Train className="w-5 h-5 text-white" />
            <div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 block font-mono">
                KARTU TANDA ANGGOTA RESMI
              </span>
              <h3 className="text-sm font-black tracking-tight uppercase">
                Indonesian Railfurs
              </h3>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block bg-white text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
              {user.tierStatus}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 bg-gradient-to-b from-neutral-50 to-white">
          <div className="flex items-start gap-4">
            {/* Foto Profil / Fursona */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-black bg-neutral-100 shadow-md">
                <img
                  src={user.fotoUrl}
                  alt={user.namaFursona}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-1 bg-black text-white rounded-full p-1 border-2 border-white">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Nama & Identitas */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
                <span>{user.nomorAnggota}</span>
              </div>
              <h4 className="text-xl font-black text-black tracking-tight truncate mt-0.5">
                {user.namaFursona}
              </h4>
              <p className="text-xs text-neutral-600 font-medium">
                {user.spesiesFursona || 'Furry Railfan'}
              </p>
              
              <div className="mt-2.5 pt-2 border-t border-neutral-200">
                <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-mono">
                  Nama Asli
                </p>
                <p className="text-sm font-semibold text-neutral-900 truncate">
                  {user.namaAsli}
                </p>
              </div>
            </div>
          </div>

          {/* Grid Informasi Tambahan */}
          <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-dashed border-neutral-300 text-xs">
            <div className="bg-neutral-100/80 p-2.5 rounded-lg border border-neutral-200">
              <div className="flex items-center gap-1 text-neutral-500 text-[10px] font-mono uppercase">
                <MapPin className="w-3 h-3" /> Domisili
              </div>
              <p className="font-bold text-neutral-900 mt-0.5">{user.domisili}</p>
            </div>

            <div className="bg-neutral-100/80 p-2.5 rounded-lg border border-neutral-200">
              <div className="flex items-center gap-1 text-neutral-500 text-[10px] font-mono uppercase">
                <Sparkles className="w-3 h-3" /> Umur
              </div>
              <p className="font-bold text-neutral-900 mt-0.5">{user.umur} Tahun</p>
            </div>

            <div className="bg-neutral-100/80 p-2.5 rounded-lg border border-neutral-200 col-span-2">
              <div className="flex items-center gap-1 text-neutral-500 text-[10px] font-mono uppercase">
                <Train className="w-3 h-3" /> Stasiun & Lokomotif Andalan
              </div>
              <p className="font-semibold text-neutral-900 mt-0.5 truncate">
                {user.stasiunFavorit || 'Stasiun Tugu'} ({user.lokomotifFavorit || 'CC206'})
              </p>
            </div>
          </div>

          {/* Barcode & Perforated Cutout effect */}
          <div className="mt-5 pt-4 border-t-2 border-neutral-800 flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-6 flex items-center gap-1">
                {/* Visual barcode lines */}
                {[3, 1, 4, 1, 2, 5, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2].map((w, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-black h-5"
                    style={{ width: `${w * 1.5}px` }}
                  />
                ))}
              </div>
              <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                VERIFIED PASS ID: {user.nomorAnggota}
              </p>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-mono text-neutral-500 flex items-center gap-1 justify-end">
                <Calendar className="w-3 h-3" /> Sejak
              </div>
              <p className="text-xs font-bold text-neutral-800">{user.tanggalBergabung}</p>
            </div>
          </div>
        </div>

        {/* Notched cutout dots at the sides */}
        <div className="absolute top-12 -left-3 w-6 h-6 bg-neutral-900 rounded-full border border-black" />
        <div className="absolute top-12 -right-3 w-6 h-6 bg-neutral-900 rounded-full border border-black" />
      </div>

      {showActions && (
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={handleCopyId}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg text-neutral-800 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>ID Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-600" />
                <span>Salin Nomor KTA</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
