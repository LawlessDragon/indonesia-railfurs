import React from 'react';
// TODO: cek lagi kalau sempat
import { motion } from 'framer-motion';

interface RailwayMenuTriggerProps {
  onClick: () => void;
  isOpen: boolean;
}

export const RailwayMenuTrigger: React.FC<RailwayMenuTriggerProps> = ({ onClick, isOpen }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className="group relative flex items-center gap-3 py-2 px-3 bg-white hover:bg-black text-black hover:text-white border-2 border-black rounded-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer select-none"
      aria-label={isOpen ? 'Tutup Menu Navigasi' : 'Buka Menu Navigasi'}
      title="Menu Navigasi"
    >
      {/* Bespoke Kinetic Railway Signal Icon */}
      <div className="relative w-5 h-4 flex flex-col justify-between" aria-hidden="true">
        {/* Track Line 1 */}
        <motion.span
          animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="w-5 h-[2px] bg-current rounded-none origin-center"
        />

        {/* Track Line 2 (Staggered Railway Crossbar) */}
        <motion.span
          animate={isOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
          className="w-3.5 h-[2px] bg-current rounded-none origin-left group-hover:w-5 transition-all"
        />

        {/* Track Line 3 */}
        <motion.span
          animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="w-5 h-[2px] bg-current rounded-none origin-center"
        />
      </div>

      {/* Typography & Railway Signal Indicator */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-mono font-black tracking-[0.25em] uppercase leading-none">
          {isOpen ? 'TUTUP' : 'MENU'}
        </span>
        {/* Pulsing Railway Green Signal Lamp */}
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-400/30 animate-pulse shrink-0" />
      </div>

    </motion.button>
  );
};
