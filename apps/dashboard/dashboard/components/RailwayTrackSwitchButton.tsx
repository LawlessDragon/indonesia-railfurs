import React from 'react';
// NOTE: sering berubah, hati-hati
import { motion } from 'framer-motion';

interface RailwayTrackSwitchButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const RailwayTrackSwitchButton: React.FC<RailwayTrackSwitchButtonProps> = ({
  isOpen,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center gap-3 px-3.5 py-2 border-2 transition-all duration-200 cursor-pointer ${
        isOpen
          ? 'bg-black text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
          : 'bg-white text-black border-black hover:bg-neutral-900 hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
      }`}
      aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi jalur'}
      title="Navigasi Menu (Jalur Rel Kereta)"
    >
      {/* Universal Perspective Railway Track Icon (Rel Kereta Perspektif Menuju Horison) */}
      <div className="w-5 h-5 flex items-center justify-center shrink-0">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          {isOpen ? (
            /* Close State: Clean Bold Cross (X) */
            <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="5" y1="19" x2="19" y2="5" />
            </g>
          ) : (
            /* Perspective Train Track (Rel Kereta Api Perspektif - Tidak Seperti Pagar) */
            <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {/* Rel Kiri (Menyempit ke atas) */}
              <line x1="5" y1="21" x2="9.5" y2="3" />

              {/* Rel Kanan (Menyempit ke atas) */}
              <line x1="19" y1="21" x2="14.5" y2="3" />

              {/* Bantalan Rel 1 (Bawah - Paling Lebar) */}
              <line x1="3.5" y1="17" x2="20.5" y2="17" strokeWidth="2" />

              {/* Bantalan Rel 2 (Tengah) */}
              <line x1="6" y1="12" x2="18" y2="12" strokeWidth="2" />

              {/* Bantalan Rel 3 (Atas - Paling Pendek) */}
              <line x1="8" y1="7" x2="16" y2="7" strokeWidth="2" />
            </g>
          )}
        </svg>
      </div>

      {/* Railway Navigation Label */}
      <div className="flex flex-col items-start leading-none pr-1">
        <span className="text-[10px] font-mono font-black tracking-[0.2em] uppercase">
          {isOpen ? 'TUTUP' : 'MENU JALUR'}
        </span>
        <span className="text-[8px] font-mono tracking-widest opacity-60 mt-0.5">
          {isOpen ? 'KONSOL AKTIF' : 'IRS • NAVIGASI'}
        </span>
      </div>

      {/* Mechanical Toggle Indicator */}
      <div className="border-l border-current/25 pl-2 text-xs font-mono font-bold">
        {isOpen ? '✕' : '⇄'}
      </div>
    </button>
  );
};
