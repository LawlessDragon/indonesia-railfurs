import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TicketBadge } from '../components/TicketBadge';
import { Train, Calendar, CheckCircle2, Clock } from 'lucide-react';

export const TripsPage: React.FC = () => {
  const { trips } = useAuth();
  const [filter, setFilter] = useState<'all' | 'Selesai' | 'Mendatang'>('all');

  const filteredTrips = trips.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 bg-white px-2.5 py-0.5 rounded-full border border-neutral-300 inline-block">
              LOG PERJALANAN
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black flex items-center gap-2">
            <Train className="w-7 h-7" /> Jadwal & Riwayat Joyride
          </h1>
          <p className="text-xs text-neutral-600 mt-1 max-w-xl">
            Semua jejak perjalanan kereta komunitas Indonesian Railfurs yang telah terlaksana dan agenda keberangkatan mendatang.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-neutral-300">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-black text-white'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Semua ({trips.length})
          </button>
          <button
            onClick={() => setFilter('Selesai')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'Selesai'
                ? 'bg-black text-white'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Terselesaikan
          </button>
          <button
            onClick={() => setFilter('Mendatang')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filter === 'Mendatang'
                ? 'bg-black text-white'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Mendatang
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTrips.map((trip) => (
          <TicketBadge key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};
