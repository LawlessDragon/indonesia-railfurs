import React from 'react';
// TODO: beresin nanti
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User } from 'lucide-react';
import { IMAGES } from '../../constants';
import { RailwayTrackSwitchButton } from './RailwayTrackSwitchButton';

interface DashboardHeaderProps {
  onBackToLanding: () => void;
  onOpenEditProfile: () => void;
  onOpenMenu: () => void;
  isMenuOpen?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onBackToLanding,
  onOpenEditProfile,
  onOpenMenu,
  isMenuOpen = false,
}) => {
  const { user } = useAuth();

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b-2 border-black sticky top-0 z-30 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Bespoke Railway Track Switch (Turnout Console Trigger) */}
        <div className="flex items-center gap-4">
          <RailwayTrackSwitchButton
            isOpen={isMenuOpen}
            onClick={onOpenMenu}
          />
        </div>

        {/* Center: Brand Lockup */}
        <div className="flex items-center gap-2.5">
          <img
            src={IMAGES.logo}
            alt="IRS Logo"
            className="h-6 w-auto object-contain"
          />
          <div className="h-3.5 w-px bg-neutral-300" aria-hidden="true" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-900 font-bold hidden sm:inline-block">
            Pass Portal
          </span>
        </div>

        {/* Right: Circular Avatar Profile Button & Exit */}
        <div className="flex items-center gap-3">
          
          <button
            type="button"
            onClick={onOpenEditProfile}
            className="relative flex items-center p-0.5 rounded-full ring-1 ring-neutral-300 hover:ring-2 hover:ring-black transition-all cursor-pointer"
            title="Edit Profil & Karakter"
            aria-label="Edit Profil"
          >
            {user.foto ? (
              <img
                src={user.foto}
                alt={user.namaFursona}
                className="w-8 h-8 rounded-full object-cover border border-white"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700">
                <User size={14} />
              </div>
            )}
            {/* Status Indicator */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </button>

          <button
            type="button"
            onClick={onBackToLanding}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-medium tracking-wider text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-sm transition-colors cursor-pointer"
            title="Kembali ke Beranda"
          >
            <span>Beranda</span>
            <ArrowLeft size={13} className="rotate-180" />
          </button>

        </div>

      </div>
    </header>
  );
};
