import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardHeader } from '../components/DashboardHeader';
import { DashboardSidebarDrawer, DashboardViewMode } from '../components/DashboardSidebarDrawer';
import { MemberCard } from '../components/MemberCard';
import { EventCatalogSection } from '../components/EventCatalogSection';
import { JoyrideBookingSection } from '../components/JoyrideBookingSection';
import { AccountSection } from '../components/AccountSection';
import { ProfileEditModal } from '../components/ProfileEditModal';
import { Check } from 'lucide-react';

interface DashboardPageProps {
  onBackToLanding: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onBackToLanding }) => {
  const { user, updateProfile, toastMessage, clearToast } = useAuth();
  
  const [activeView, setActiveView] = useState<DashboardViewMode>('kta');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white flex flex-col justify-between">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-sm shadow-xl flex items-center gap-3 border border-white/20 text-xs font-semibold">
          <Check size={16} className="text-white" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={clearToast}
            className="ml-2 text-neutral-400 hover:text-white text-xs underline cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Header with Hamburger Menu */}
      <DashboardHeader
        onBackToLanding={onBackToLanding}
        onOpenEditProfile={() => setIsEditModalOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        isMenuOpen={isMenuOpen}
      />

      {/* Hamburger Navigation Drawer */}
      <DashboardSidebarDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeView={activeView}
        onSelectView={setActiveView}
        onBackToLanding={onBackToLanding}
      />

      {/* Main Viewport: Clean, generous space, zero duplicate spam */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 md:px-10 py-12 md:py-16">
        
        {/* VIEW 01: KTA DIGITAL (Default Screen - Jelas & Tidak Ramai) */}
        {activeView === 'kta' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-1 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400">
                Kartu Tanda Anggota Digital
              </span>
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-neutral-900">
                Identitas Resmi Anggota
              </h1>
            </div>

            {/* Exactly 1 Single Card with 1 Single Edit Action */}
            <MemberCard
              user={user}
              onEditClick={() => setIsEditModalOpen(true)}
            />
          </div>
        )}

        {/* VIEW 02: EVENT (Katalog Info & Tarif Tiket Mendatang) */}
        {activeView === 'event' && (
          <div className="animate-fade-in">
            <EventCatalogSection
              onGoToBooking={() => setActiveView('booking')}
            />
          </div>
        )}

        {/* VIEW 03: BELI TIKET JOYRIDE (Pemesanan Kursi & Boarding Pass) */}
        {activeView === 'booking' && (
          <div className="animate-fade-in">
            <JoyrideBookingSection />
          </div>
        )}

        {/* VIEW 04: AKUN & SESI */}
        {activeView === 'account' && (
          <div className="animate-fade-in">
            <AccountSection />
          </div>
        )}

      </main>

      {/* Single Minimal Footer */}
      <footer className="border-t border-neutral-200 py-6 px-6 md:px-10 text-center text-xs text-neutral-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Indonesian Railfurs &copy; {new Date().getFullYear()}</span>
          <button
            type="button"
            onClick={onBackToLanding}
            className="hover:text-black transition-colors cursor-pointer"
          >
            Halaman Utama Website
          </button>
        </div>
      </footer>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={updateProfile}
      />

    </div>
  );
};
