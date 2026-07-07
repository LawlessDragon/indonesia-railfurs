import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Train, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface EventCatalogSectionProps {
  onGoToBooking: () => void;
}

export const EventCatalogSection: React.FC<EventCatalogSectionProps> = ({ onGoToBooking }) => {
  const { upcomingTickets } = useAuth();

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="pb-6 border-b border-neutral-200">
        <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 block mb-1">
          Katalog Komunitas
        </span>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-900 uppercase">
          Agenda Event Mendatang
        </h2>
        <p className="text-xs text-neutral-500 mt-1">
          Daftar jadwal gathering, trip kereta api, dan rincian tarif tiket Indonesian Railfurs.
        </p>
      </div>

      {/* Events List (Pure Info & Price Showcase) */}
      <div className="space-y-6">
        {upcomingTickets.map((evt) => (
          <div
            key={evt.id}
            className="border-2 border-black bg-white p-6 md:p-8 rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4"
          >
            {/* Top row: Train name and availability badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-3">
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase bg-neutral-100 text-black px-2.5 py-1 border border-neutral-300">
                {evt.trainName}
              </span>

              {evt.remainingSeats > 0 ? (
                <span className="text-[11px] font-mono font-bold tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5">
                  Tersedia {evt.remainingSeats} Kursi
                </span>
              ) : (
                <span className="text-[11px] font-mono font-bold tracking-wider text-neutral-500 bg-neutral-100 border border-neutral-300 px-2 py-0.5">
                  Kuota Penuh
                </span>
              )}
            </div>

            {/* Event Title */}
            <div>
              <h3 className="text-xl md:text-2xl font-black text-neutral-900">
                {evt.eventTitle}
              </h3>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                {evt.description}
              </p>
            </div>

            {/* Event Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs border-t border-neutral-100">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">Rute</span>
                  <span className="font-semibold text-neutral-800">{evt.route}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar size={15} className="text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">Tanggal</span>
                  <span className="font-semibold text-neutral-800">{evt.date}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock size={15} className="text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">Waktu</span>
                  <span className="font-semibold text-neutral-800">{evt.time}</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Price tag */}
            <div className="pt-3 border-t border-dashed border-neutral-300 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Tarif Tiket</span>
                <span className="text-lg md:text-xl font-black font-mono text-neutral-900">{evt.price}</span>
              </div>

              <span className="text-xs text-neutral-400 font-mono">
                Total Kuota: {evt.totalSeats} Peserta
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Single Clear Urgency CTA to Booking */}
      <div className="p-6 bg-neutral-900 text-white rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider">
            Ingin Mengikuti Agenda Ini?
          </h4>
          <p className="text-xs text-neutral-400 mt-0.5">
            Pemesanan kursi dan boarding pass resmi dilakukan melalui menu Beli Tiket Joyride.
          </p>
        </div>

        {/* Urgency button with intentional vivid railway cobalt color */}
        <button
          type="button"
          onClick={onGoToBooking}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-md shrink-0"
        >
          <span>Beli Tiket Joyride</span>
          <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
};
