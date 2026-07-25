import React from 'react';
// TODO: beresin nanti
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { GuestTicketPage } from './pages/GuestTicketPage';
import { DashboardPage } from './pages/DashboardPage';
import { ApplicantStatusPage } from './pages/ApplicantStatusPage';

interface DashboardRootProps {
  onBackToLanding: () => void;
}

const DashboardRouter: React.FC<DashboardRootProps> = ({ onBackToLanding }) => {
  const { isAuthenticated, isGuest, user } = useAuth();

  // If not logged in, show login form
  if (!isAuthenticated) {
    return <LoginPage onBackToLanding={onBackToLanding} />;
  }

  // Tamu "beli tiket saja": layar khusus, tanpa history & profil
  if (isGuest) {
    return <GuestTicketPage onBackToLanding={onBackToLanding} />;
  }

  // If applicant is still pending or rejected (belum verified), show restricted applicant view
  if (user.statusPendaftaran !== 'verified') {
    return <ApplicantStatusPage onBackToLanding={onBackToLanding} />;
  }

  // If verified member, show full dashboard with KTA, Events, Joyride Booking, and Account
  return <DashboardPage onBackToLanding={onBackToLanding} />;
};

export const Dashboard: React.FC<DashboardRootProps> = ({ onBackToLanding }) => {
  return (
    <AuthProvider>
      <DashboardRouter onBackToLanding={onBackToLanding} />
    </AuthProvider>
  );
};

export default Dashboard;
