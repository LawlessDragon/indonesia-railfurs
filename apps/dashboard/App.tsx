import React from 'react';
import Dashboard from './dashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      <Dashboard onBackToLanding={() => {
        window.location.hash = '';
        window.location.reload();
      }} />
    </div>
  );
}
