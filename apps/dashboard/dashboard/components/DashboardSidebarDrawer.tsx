import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { X, ArrowRight, ArrowLeft, LogOut, CreditCard, CalendarDays, Ticket, Shield, Sparkles } from 'lucide-react';
import { IMAGES } from '../../constants';

export type DashboardViewMode = 'kta' | 'event' | 'booking' | 'account';

interface DashboardSidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: DashboardViewMode;
  onSelectView: (view: DashboardViewMode) => void;
  onBackToLanding: () => void;
}

export const DashboardSidebarDrawer: React.FC<DashboardSidebarDrawerProps> = ({
  isOpen,
  onClose,
  activeView,
  onSelectView,
  onBackToLanding,
}) => {
  const { user, upcomingTickets, bookedTickets, logout } = useAuth();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelect = (view: DashboardViewMode) => {
    onSelectView(view);
    onClose();
  };

  const navItems = [
    {
      id: 'kta' as DashboardViewMode,
      index: '01',
      label: 'KTA & Identitas',
      sub: 'Kartu Anggota Digital Resmi',
      icon: CreditCard,
      badge: null,
    },
    {
      id: 'event' as DashboardViewMode,
      index: '02',
      label: 'Agenda Event',
      sub: 'Jadwal Rute & Tarif Kereta',
      icon: CalendarDays,
      badge: `${upcomingTickets.filter(t => t.remainingSeats > 0).length} Aktif`,
    },
    {
      id: 'booking' as DashboardViewMode,
      index: '03',
      label: 'Beli Tiket Joyride',
      sub: 'Pemesanan Kursi & Boarding Pass',
      icon: Ticket,
      badge: bookedTickets.length > 0 ? `${bookedTickets.length} Tiket` : null,
    },
    {
      id: 'account' as DashboardViewMode,
      index: '04',
      label: 'Akun & Sesi',
      sub: 'Kredensial & Keamanan Anggota',
      icon: Shield,
      badge: null,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Smooth Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Smooth Spring Sliding Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 left-0 max-w-sm w-full bg-white border-r border-neutral-200 shadow-2xl flex flex-col justify-between z-10 overflow-hidden"
          >
            
            {/* Top Brand Bar */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <img
                  src={IMAGES.logo}
                  alt="IRS Logo"
                  className="h-8 w-auto object-contain"
                />
                <div>
                  <span className="text-xs font-black tracking-tight uppercase text-black block leading-none">
                    Indonesian Railfurs
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 block mt-0.5">
                    Member Navigation
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-100 transition-all cursor-pointer"
                aria-label="Tutup Menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* User Mini Profile Capsule inside Drawer */}
            <div className="px-6 py-4 bg-neutral-50/80 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-neutral-300 overflow-hidden bg-white shrink-0 shadow-xs">
                  {user.foto ? (
                    <img
                      src={user.foto}
                      alt={user.namaFursona}
                      className="w-full h-full object-cover grayscale"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono">
                      IRS
                    </div>
                  )}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-neutral-900 truncate leading-tight">
                    {user.namaFursona}
                  </p>
                  <p className="text-[10px] font-mono text-neutral-400 truncate leading-tight mt-0.5">
                    {user.memberId}
                  </p>
                </div>
              </div>

              <span className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                AKTIF
              </span>
            </div>

            {/* Navigation Links with Staggered Visual Entrance */}
            <div className="p-6 space-y-2.5 flex-1 overflow-y-auto">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 mb-4">
                Pilih Menu
              </p>

              <div className="space-y-2">
                {navItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = activeView === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.2 }}
                      type="button"
                      onClick={() => handleSelect(item.id)}
                      className={`w-full group flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-black bg-black text-white shadow-md'
                          : 'border-neutral-200/80 bg-white hover:border-black hover:bg-neutral-50 text-neutral-800'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200'
                        }`}>
                          <Icon size={16} />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black uppercase tracking-wide">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                                isSelected ? 'bg-white/25 text-white' : 'bg-neutral-200 text-neutral-700'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className={`text-[10px] mt-0.5 ${
                            isSelected ? 'text-neutral-300' : 'text-neutral-400'
                          }`}>
                            {item.sub}
                          </p>
                        </div>
                      </div>

                      <ArrowRight size={14} className={`transition-transform group-hover:translate-x-1 ${
                        isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-black'
                      }`} />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="p-6 border-t border-neutral-100 bg-neutral-50/60 space-y-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBackToLanding();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-neutral-300 hover:border-black text-xs font-bold uppercase tracking-wider text-neutral-800 rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                <ArrowLeft size={14} />
                <span>Kembali ke Beranda Utama</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  logout();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut size={13} />
                <span>Keluar dari Akun</span>
              </button>
            </div>

          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
