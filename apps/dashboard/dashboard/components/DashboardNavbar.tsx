import React from 'react';
import { useAuth } from '../context/AuthContext';
import { IMAGES } from '../../constants';
import { LogOut, Home, Edit3, Train } from 'lucide-react';

interface DashboardNavbarProps {
  onBackToLanding: () => void;
  onOpenEditProfile: () => void;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  onBackToLanding,
  onOpenEditProfile
}) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand & Badge */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToLanding}
            className="flex items-center space-x-2.5 hover:opacity-80 transition-opacity cursor-pointer group"
            title="Kembali ke Beranda"
          >
            <img
              src={IMAGES.logo}
              alt="Indonesian Railfurs Logo"
              className="h-8 w-auto object-contain invert"
            />
            <div className="hidden sm:block text-left">
              <span className="text-xs font-black tracking-wider uppercase text-white block">
                Indonesian Railfurs
              </span>
              <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
                <Train size={10} className="text-amber-400" />
                Portal Anggota Komunitas
              </span>
            </div>
          </button>
        </div>

        {/* User Status & Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
          >
            <Home size={13} />
            <span className="hidden sm:inline">Beranda</span>
          </button>

          {user && (
            <div 
              onClick={onOpenEditProfile}
              className="flex items-center space-x-2 rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-left cursor-pointer hover:border-neutral-700 transition-colors"
              title="Klik untuk edit profil"
            >
              <div className="h-6 w-6 rounded-md overflow-hidden bg-neutral-800 shrink-0">
                <img
                  src={user.foto}
                  alt={user.namaFursona}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="hidden md:block">
                <div className="text-[11px] font-semibold text-white leading-tight">
                  {user.namaFursona}
                </div>
                <div className="text-[9px] text-neutral-400 font-mono leading-tight">
                  {user.domisili}
                </div>
              </div>
              <Edit3 size={11} className="text-neutral-500 ml-1 hidden sm:block" />
            </div>
          )}

          <button
            onClick={() => {
              logout();
              onBackToLanding();
            }}
            className="inline-flex items-center space-x-1 rounded-lg border border-neutral-800 bg-neutral-900/80 px-2.5 py-1.5 text-xs font-medium text-neutral-400 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-900/50 transition-colors cursor-pointer"
            title="Keluar dari portal"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
