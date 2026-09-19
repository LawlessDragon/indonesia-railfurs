import React from 'react';
// NOTE: nyambung ke bagian lain
// NOTE: sering berubah, hati-hati
import { MemberProfile } from '../types/auth';
import { Edit3, MapPin, Calendar, ShieldCheck, Train, Sparkles } from 'lucide-react';

interface RailPassCardProps {
  member: MemberProfile;
  onEdit: () => void;
}

export const RailPassCard: React.FC<RailPassCardProps> = ({ member, onEdit }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 text-white shadow-2xl transition-all">
      {/* Background railway track pattern subtle overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 16px)`
        }}
      />

      {/* Top Banner Ribbon */}
      <div className="relative flex items-center justify-between border-b border-neutral-800 bg-neutral-900/80 px-5 py-3.5 backdrop-blur-sm">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black font-black text-xs">
            IRS
          </div>
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400">
              Indonesian Railfurs Pass
            </div>
            <div className="text-[10px] text-neutral-500 font-mono">
              {member.nomorAnggota}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{member.status}</span>
          </span>
          <button
            onClick={onEdit}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-white hover:text-black px-2.5 py-1 text-xs font-semibold text-neutral-200 transition-colors cursor-pointer"
            title="Ubah data profil"
          >
            <Edit3 size={12} />
            <span>Edit Profil</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="relative p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar / Photo with train badge motif */}
          <div className="relative shrink-0 mx-auto sm:mx-0">
            <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-2xl overflow-hidden border-2 border-neutral-700 bg-neutral-900 shadow-inner group">
              <img
                src={member.foto}
                alt={member.namaFursona}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback avatar
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80';
                }}
              />
              <div 
                onClick={onEdit}
                className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-xs font-medium text-white"
              >
                Ganti Foto
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-700 text-amber-400 shadow-md">
              <Train size={16} />
            </div>
          </div>

          {/* Core Info */}
          <div className="flex-1 w-full space-y-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono">
                  Nama Fursona / OC
                </span>
                <Sparkles size={13} className="text-amber-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-0.5">
                {member.namaFursona}
              </h2>
              {member.spesiesOC && (
                <p className="text-xs text-neutral-400 mt-0.5">
                  {member.spesiesOC}
                </p>
              )}
            </div>

            {/* Grid 4 Fields: Nama Asli, Umur, Domisili, Nomor ID */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-800/80">
              <div className="rounded-xl bg-neutral-900/60 p-3 border border-neutral-800">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
                  Nama Asli
                </span>
                <span className="text-sm font-semibold text-neutral-200 mt-0.5 block truncate">
                  {member.namaAsli}
                </span>
              </div>

              <div className="rounded-xl bg-neutral-900/60 p-3 border border-neutral-800">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block">
                  Umur
                </span>
                <span className="text-sm font-semibold text-neutral-200 mt-0.5 block">
                  {member.umur} Tahun
                </span>
              </div>

              <div className="rounded-xl bg-neutral-900/60 p-3 border border-neutral-800">
                <div className="flex items-center space-x-1 text-neutral-500">
                  <MapPin size={11} />
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    Domisili
                  </span>
                </div>
                <span className="text-sm font-semibold text-neutral-200 mt-0.5 block truncate">
                  {member.domisili}
                </span>
              </div>

              <div className="rounded-xl bg-neutral-900/60 p-3 border border-neutral-800">
                <div className="flex items-center space-x-1 text-neutral-500">
                  <Calendar size={11} />
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    Bergabung
                  </span>
                </div>
                <span className="text-sm font-semibold text-neutral-200 mt-0.5 block truncate">
                  {member.tanggalBergabung}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Perforated ticket divider line */}
        <div className="relative my-6 flex items-center justify-between">
          <div className="absolute -left-9 h-6 w-6 rounded-full bg-neutral-900 border border-neutral-800" />
          <div className="w-full border-b border-dashed border-neutral-700/80" />
          <div className="absolute -right-9 h-6 w-6 rounded-full bg-neutral-900 border border-neutral-800" />
        </div>

        {/* Footer info strip (Boarding pass & barcode style) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck size={15} className="text-neutral-500" />
            <span className="font-mono text-[11px] text-neutral-400">
              Terverifikasi Komunitas Indonesian Railfurs
            </span>
          </div>

          <div className="font-mono text-[11px] text-neutral-500 tracking-wider">
            PASS-{member.id.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};
