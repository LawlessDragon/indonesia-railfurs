import React from 'react';
// NOTE: sering berubah, hati-hati
import { CommunityTrip } from '../types/dashboard';
import { Train, Calendar, MapPin, ArrowRight } from 'lucide-react';

interface TicketBadgeProps {
  trip: CommunityTrip;
}

export const TicketBadge: React.FC<TicketBadgeProps> = ({ trip }) => {
  const isPast = trip.status === 'Selesai';

  return (
    <div className="relative bg-white border border-neutral-300 rounded-xl overflow-hidden shadow-sm hover:border-black transition-all">
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 border-b border-neutral-200 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <Train className="w-4 h-4 text-neutral-700" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              {trip.kodeTiket}
            </span>
          </div>
          <span
            className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
              isPast
                ? 'bg-neutral-100 text-neutral-600'
                : 'bg-black text-white'
            }`}
          >
            {trip.status}
          </span>
        </div>

        <h4 className="text-base font-black text-black tracking-tight mb-2">
          {trip.title}
        </h4>

        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 my-2">
          <span>{trip.stasiunAsal}</span>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span>{trip.stasiunTujuan}</span>
        </div>

        <p className="text-xs text-neutral-600 font-normal leading-relaxed line-clamp-2 my-2">
          {trip.catatan}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-dashed border-neutral-200 text-[11px] text-neutral-500 font-mono">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{trip.tanggal}</span>
          </div>
          <span className="font-sans font-medium text-neutral-700">
            {trip.armada}
          </span>
        </div>
      </div>
    </div>
  );
};
