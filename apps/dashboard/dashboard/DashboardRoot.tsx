import React, { useState } from 'react';
// NOTE: sudah dicek, aman
// TODO: cek lagi kalau sempat
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardHome } from './pages/DashboardHome';
import { ProfilePage } from './pages/ProfilePage';
import { KTAPage } from './pages/KTAPage';
import { TripsPage } from './pages/TripsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardView } from './types/dashboard';

interface DashboardRootProps {
  onExitToLanding: () => void;
  initialMode?: 'dashboard' | 'login' | 'register';
}

const DashboardContent: React.FC<{
  onExitToLanding: () => void;
  initialMode?: 'dashboard' | 'login' | 'register';
}> = ({ onExitToLanding, initialMode = 'dashboard' }) => {
  const { isAuthenticated } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>(
    initialMode === 'register' ? 'register' : 'login'
  );
  const [currentView, setCurrentView] = useState<DashboardView>('home');

  // If user is not logged in, show LoginPage or RegisterPage
  if (!isAuthenticated) {
    if (authMode === 'register') {
      return (
        <RegisterPage
          onSwitchToLogin={() => setAuthMode('login')}
          onExitToLanding={onExitToLanding}
        />
      );
    }
    return (
      <LoginPage
        onSwitchToRegister={() => setAuthMode('register')}
        onExitToLanding={onExitToLanding}
      />
    );
  }

  // If authenticated, show the DashboardLayout with sub-pages
  return (
    <DashboardLayout
      currentView={currentView}
      onViewChange={setCurrentView}
      onExitToLanding={onExitToLanding}
    >
      {currentView === 'home' && <DashboardHome onNavigate={setCurrentView} />}
      {currentView === 'profile' && <ProfilePage />}
      {currentView === 'kta' && <KTAPage onNavigate={setCurrentView} />}
      {currentView === 'trips' && <TripsPage />}
    </DashboardLayout>
  );
};

export const DashboardRoot: React.FC<DashboardRootProps> = (props) => {
  return (
    <AuthProvider>
      <DashboardContent {...props} />
    </AuthProvider>
  );
};

export default DashboardRoot;
