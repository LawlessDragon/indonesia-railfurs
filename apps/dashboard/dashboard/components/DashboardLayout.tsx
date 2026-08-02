import React, { useState } from 'react';
// NOTE: penting, jangan dihapus
import { useAuth } from '../context/AuthContext';
import { DashboardView } from '../types/dashboard';
import { 
  LayoutDashboard, 
  UserCheck, 
  Train, 
  LogOut, 
  Menu, 
  X, 
  ExternalLink, 
  ArrowLeft,
  Shield,
  CreditCard
} from 'lucide-react';
import { IMAGES } from '../../constants';

interface DashboardLayoutProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  onExitToLanding: () => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentView,
  onViewChange,
  onExitToLanding,
  children,
}) => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { view: DashboardView; label: string; icon: React.ReactNode }[] = [
    {
      view: 'home',
      label: 'Ringkasan',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      view: 'profile',
      label: 'Edit Profil',
      icon: <UserCheck className="w-4 h-4" />,
    },
    {
      view: 'kta',
      label: 'Kartu Anggota (KTA)',
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      view: 'trips',
      label: 'Jadwal & Joyride',
      icon: <Train className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row text-black">
      {/* SIDEBAR FOR DESKTOP */}
      <aside className="hidden md:flex flex-col w-72 bg-black text-white p-6 justify-between border-r border-neutral-800 shrink-0">
        <div>
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 pb-6 border-b border-neutral-800">
            <img
              src={IMAGES.logo}
              alt="Indonesian Railfurs"
              className="h-9 w-auto object-contain invert brightness-200"
            />
            <div>
              <h1 className="text-sm font-black tracking-wider uppercase">
                Railfurs Portal
              </h1>
              <p className="text-[10px] text-neutral-400 font-mono">
                DASHBOARD ANGGOTA
              </p>
            </div>
          </div>

          {/* Quick exit to Landing */}
          <div className="mt-4">
            <button
              onClick={onExitToLanding}
              className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-bold text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Beranda
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-6 space-y-1.5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 px-3 mb-2">
              Menu Utama
            </p>
            {navItems.map((item) => {
              const active = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => onViewChange(item.view)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-left ${
                    active
                      ? 'bg-white text-black shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Subdomain registration banner as requested */}
          <div className="mt-8 p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl">
            <div className="flex items-center justify-between text-[11px] font-bold text-white mb-1">
              <span>Portal Registrasi</span>
              <Shield className="w-3.5 h-3.5 text-neutral-400" />
            </div>
            <p className="text-[11px] text-neutral-400 leading-snug mb-2.5">
              Ajak kawan railfan dan furry bergabung lewat subdomain resmi.
            </p>
            <a
              href="https://join.railfurs.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-neutral-800 hover:bg-neutral-700 px-2.5 py-1.5 rounded-lg transition-colors w-full justify-center"
            >
              join.railfurs.my.id <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* User Mini Profile & Logout */}
        {user && (
          <div className="pt-6 border-t border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={user.fotoUrl}
                alt={user.namaFursona}
                className="w-10 h-10 rounded-xl object-cover border border-neutral-700"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">
                  {user.namaFursona}
                </p>
                <p className="text-[10px] text-neutral-400 font-mono truncate">
                  {user.nomorAnggota}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar Akun
            </button>
          </div>
        )}
      </aside>

      {/* MOBILE TOPBAR */}
      <header className="md:hidden bg-black text-white px-5 py-4 flex items-center justify-between sticky top-0 z-40 border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <img
            src={IMAGES.logo}
            alt="IRS"
            className="h-7 w-auto object-contain invert"
          />
          <span className="text-xs font-black uppercase tracking-wider">
            Portal Anggota
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExitToLanding}
            className="text-[11px] font-bold text-neutral-300 hover:text-white px-2.5 py-1 border border-neutral-700 rounded-lg"
          >
            Web
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU DROPDOWN */}
      {mobileOpen && (
        <div className="md:hidden bg-black text-white p-5 border-b border-neutral-800 space-y-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  onViewChange(item.view);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider ${
                  currentView === item.view
                    ? 'bg-white text-black'
                    : 'text-neutral-300 hover:bg-neutral-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <a
            href="https://join.railfurs.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs font-bold bg-neutral-900 text-neutral-300 rounded-lg"
          >
            <span>Subdomain join.railfurs.my.id</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {user && (
            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-400 bg-red-950/30 rounded-lg"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar Akun
            </button>
          )}
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
};
