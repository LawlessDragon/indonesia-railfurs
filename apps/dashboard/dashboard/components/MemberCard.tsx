import React, { useState } from 'react';
// TODO: beresin nanti
// TODO: rapihin nanti
import { UserProfile } from '../types';
import { Check, Copy, Edit3, ShieldCheck, Sparkles, Train } from 'lucide-react';
import { IMAGES } from '../../constants';

interface MemberCardProps {
  user: UserProfile;
  onEditClick: () => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({ user, onEditClick }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.memberId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      
      {/* Top micro badge */}
      <div className="flex items-center justify-between px-2 text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-400">
        <span>Commemorative IC Pass</span>
        <span>Serial: {user.memberId}</span>
      </div>

      {/* The Prestige Railway Pass Card */}
      <div className="relative bg-white border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-md overflow-hidden transition-all">
        
        {/* Top Metallic Security Foil & Header */}
        <div className="bg-black text-white px-6 py-4 flex items-center justify-between border-b border-black">
          <div className="flex items-center gap-3">
            <img
              src={IMAGES.logo}
              alt="IRS Logo"
              className="h-5 w-auto object-contain brightness-0 invert"
            />
            <div className="h-3 w-px bg-white/30" aria-hidden="true" />
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-neutral-200">
              Indonesian Railfurs Network
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/10 rounded text-[9px] font-mono font-bold text-neutral-300">
            <ShieldCheck size={11} className="text-emerald-400" />
            <span>{user.statusKeanggotaan || 'Aktif'}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Main profile row: Avatar + Identity */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            
            {/* Avatar with corner brackets */}
            <div className="relative shrink-0 mx-auto sm:mx-0">
              <div className="w-28 h-28 md:w-32 md:h-32 bg-neutral-100 border border-neutral-300 p-1 rounded-sm relative overflow-hidden">
                {user.foto ? (
                  <img
                    src={user.foto}
                    alt={user.namaFursona}
                    className="w-full h-full object-cover grayscale contrast-125"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-mono text-neutral-400">
                    NO PHOTO
                  </div>
                )}
                {/* Official seal */}
                <div className="absolute bottom-1 right-1 bg-black text-white text-[8px] font-mono font-black uppercase px-1.5 py-0.2 tracking-wider">
                  IRS
                </div>
              </div>
            </div>

            {/* Typography & Bio */}
            <div className="flex-1 w-full space-y-4 text-center sm:text-left">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-400 block">
                  Fursona &middot; OC
                </span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase text-neutral-900 leading-none mt-1">
                  {user.namaFursona}
                </h2>
                {user.spesiesOC && (
                  <p className="text-[11px] font-mono text-neutral-500 mt-1">
                    Spesies: {user.spesiesOC}
                  </p>
                )}
              </div>

              {/* Data Grid with refined micro-labels */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-100 text-left">
                <div>
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block">Nama Asli</span>
                  <span className="text-xs font-bold text-neutral-900 block truncate">{user.namaAsli}</span>
                </div>

                <div>
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block">Umur</span>
                  <span className="text-xs font-bold font-mono text-neutral-900 block">{user.umur} Tahun</span>
                </div>

                <div>
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block">Domisili</span>
                  <span className="text-xs font-bold text-neutral-900 block truncate">{user.domisili}</span>
                </div>

                <div>
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block">Bergabung</span>
                  <span className="text-xs font-bold font-mono text-neutral-900 block">Tahun {user.bergabungSejak}</span>
                </div>
              </div>

              {user.keretaFavorit && (
                <div className="pt-2 text-left">
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block">Kereta Favorit</span>
                  <span className="text-[11px] font-medium text-neutral-800">{user.keretaFavorit}</span>
                </div>
              )}
            </div>

          </div>

          {/* Holographic / Security Strip Accent */}
          <div className="h-2 w-full bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 border-y border-neutral-300" aria-hidden="true" />

          {/* Bottom Railway Barcode and ID with Copy */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-black">
                {user.memberId}
              </span>
              <button
                type="button"
                onClick={handleCopyId}
                className="text-neutral-400 hover:text-black p-1 transition-colors cursor-pointer"
                title="Salin Nomor ID"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              </button>
            </div>

            {/* Vector Barcode Graphic */}
            <div className="flex items-center gap-[2px] h-6 opacity-70" aria-hidden="true">
              <span className="w-1 h-full bg-black"></span>
              <span className="w-0.5 h-full bg-black"></span>
              <span className="w-2 h-full bg-black"></span>
              <span className="w-0.5 h-full bg-black"></span>
              <span className="w-1.5 h-full bg-black"></span>
              <span className="w-3 h-full bg-black"></span>
              <span className="w-0.5 h-full bg-black"></span>
              <span className="w-2 h-full bg-black"></span>
              <span className="w-1 h-full bg-black"></span>
              <span className="w-3 h-full bg-black"></span>
              <span className="w-0.5 h-full bg-black"></span>
              <span className="w-2 h-full bg-black"></span>
            </div>

            <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400">
              Valid Official Member
            </span>
          </div>

        </div>

      </div>

      {/* Singular, beautifully proportioned Edit Profile Button */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={onEditClick}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-mono font-bold uppercase tracking-[0.15em] rounded-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] transition-all cursor-pointer"
        >
          <Edit3 size={13} />
          <span>Edit Biodata & Foto</span>
        </button>
      </div>

    </div>
  );
};
