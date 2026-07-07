import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UpcomingTicket } from '../types';
import { Ticket, Calendar, Clock, MapPin, CheckCircle, ArrowRight, X, AlertTriangle } from 'lucide-react';

export const JoyrideBookingSection: React.FC = () => {
  const { upcomingTickets, bookedTickets, user, bookTicket } = useAuth();
  const [activeTab, setActiveTab] = useState<'buy' | 'history'>('buy');
  const [selectedTicket, setSelectedTicket] = useState<UpcomingTicket | null>(null);
  const [seatChoice, setSeatChoice] = useState('EKS-1 / 04A');
  const [successModal, setSuccessModal] = useState(false);

  const handleOpenBooking = (ticket: UpcomingTicket) => {
    setSelectedTicket(ticket);
    setSeatChoice('EKS-1 / 04A');
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;

    const ok = bookTicket(selectedTicket.id, seatChoice);
    if (ok) {
      setSuccessModal(true);
      setSelectedTicket(null);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      
      {/* Header and Single Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 block mb-1">
            Reservasi Tiket
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-900 uppercase">
            Beli Tiket Joyride
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Pemesanan kursi resmi dan boarding pass gathering Indonesian Railfurs.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-sm border border-neutral-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('buy')}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
              activeTab === 'buy'
                ? 'bg-black text-white'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Beli Tiket
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
              activeTab === 'history'
                ? 'bg-black text-white'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Tiket Saya ({bookedTickets.length})
          </button>
        </div>
      </div>

      {/* Mode 1: List Beli Tiket */}
      {activeTab === 'buy' && (
        <div className="space-y-6">
          {upcomingTickets.map((t) => (
            <div
              key={t.id}
              className="border-2 border-black bg-white p-6 md:p-8 rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-black text-white px-2 py-0.5">
                    {t.trainName}
                  </span>
                  {t.remainingSeats <= 5 && t.remainingSeats > 0 && (
                    <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-300 px-2 py-0.5 flex items-center gap-1">
                      <AlertTriangle size={11} />
                      Sisa {t.remainingSeats} Kursi
                    </span>
                  )}
                </div>

                <h3 className="text-xl md:text-2xl font-black text-neutral-900">
                  {t.eventTitle}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 pt-1">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-neutral-400" />
                    <span>{t.route}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-neutral-400" />
                    <span>{t.date} &middot; {t.time}</span>
                  </div>
                </div>
              </div>

              {/* Price and Urgency Button */}
              <div className="md:border-l md:border-neutral-200 md:pl-8 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 shrink-0">
                <div className="text-left md:text-right">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">Tarif</span>
                  <span className="text-2xl font-black font-mono text-neutral-900">{t.price}</span>
                </div>

                {t.remainingSeats > 0 ? (
                  <button
                    type="button"
                    onClick={() => handleOpenBooking(t)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>Pesan Tiket</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <span className="px-5 py-2 border border-neutral-300 text-neutral-400 text-xs font-bold uppercase tracking-wider rounded-sm cursor-not-allowed">
                    Habis
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mode 2: Tiket Saya / Boarding Pass */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {bookedTickets.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-neutral-200 rounded-sm">
              <Ticket size={32} className="mx-auto text-neutral-400 mb-2" />
              <p className="text-sm font-bold text-neutral-800">Belum ada tiket yang dibeli</p>
              <p className="text-xs text-neutral-500 mt-1">
                Pilih tiket di tab Beli Tiket untuk melakukan reservasi perjalanan.
              </p>
            </div>
          ) : (
            bookedTickets.map((b) => (
              <div
                key={b.ticketCode}
                className="border-2 border-black bg-white rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
              >
                {/* Header pass */}
                <div className="bg-black text-white px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ticket size={16} />
                    <span className="text-xs font-mono font-bold tracking-widest uppercase">
                      IRS Boarding Pass
                    </span>
                  </div>
                  <span className="text-xs font-mono tracking-widest font-bold">
                    {b.ticketCode}
                  </span>
                </div>

                {/* Body pass */}
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <h4 className="text-xl font-black text-neutral-900">
                      {b.eventTitle}
                    </h4>
                    <p className="text-xs font-semibold text-neutral-600">
                      {b.trainName} &middot; Rute: {b.route}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-neutral-200 text-xs">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-400 block uppercase">Jadwal</span>
                        <span className="font-bold text-neutral-900">{b.date} ({b.time})</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-neutral-400 block uppercase">Kursi</span>
                        <span className="font-mono font-bold text-neutral-900">{b.seatNumber}</span>
                      </div>
                    </div>

                    <div className="text-xs text-neutral-600 pt-1">
                      <span className="font-semibold text-neutral-900">Manifest:</span> {b.passengerFursonaName} ({b.passengerRealName})
                    </div>
                  </div>

                  {/* Status & Barcode */}
                  <div className="md:col-span-4 md:border-l md:border-dashed md:border-neutral-300 md:pl-6 flex flex-col items-center justify-center space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-xs">
                      <CheckCircle size={13} />
                      VALID / RESMI
                    </span>

                    <div className="flex items-center gap-[2px] h-8 opacity-80" aria-hidden="true">
                      <span className="w-1.5 h-full bg-black"></span>
                      <span className="w-[1px] h-full bg-black"></span>
                      <span className="w-3 h-full bg-black"></span>
                      <span className="w-1 h-full bg-black"></span>
                      <span className="w-2 h-full bg-black"></span>
                      <span className="w-[1px] h-full bg-black"></span>
                      <span className="w-3 h-full bg-black"></span>
                      <span className="w-1.5 h-full bg-black"></span>
                    </div>

                    <span className="text-[10px] font-mono text-neutral-400">
                      Kode: {b.ticketCode}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Booking Form Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border-2 border-black rounded-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-black">
              <div>
                <h3 className="text-base font-black tracking-tight uppercase text-black">
                  Pemesanan Tiket
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {selectedTicket.eventTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="p-1 text-neutral-500 hover:text-black cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleConfirm} className="p-6 space-y-5">
              <div className="p-3.5 bg-neutral-50 border border-neutral-200 text-xs space-y-1.5">
                <div className="flex justify-between font-bold text-neutral-900">
                  <span>Kereta:</span>
                  <span>{selectedTicket.trainName}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Tarif Tiket:</span>
                  <span className="font-mono font-bold text-neutral-900">{selectedTicket.price}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Pilih Kursi
                </label>
                <select
                  value={seatChoice}
                  onChange={(e) => setSeatChoice(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 focus:border-black focus:outline-none rounded-sm font-mono"
                >
                  <option value="EKS-1 / 04A">Gerbong EKS-1, Kursi 04A (Jendela)</option>
                  <option value="EKS-1 / 04B">Gerbong EKS-1, Kursi 04B (Lorong)</option>
                  <option value="EKS-1 / 05A">Gerbong EKS-1, Kursi 05A (Jendela)</option>
                  <option value="EKS-2 / 02A">Gerbong EKS-2, Kursi 02A (Khusus Fursuit)</option>
                </select>
              </div>

              <div className="p-3 border border-neutral-200 text-xs text-neutral-600">
                <span className="font-bold text-neutral-900">Nama Penumpang:</span> {user.namaFursona} ({user.namaAsli})
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black cursor-pointer"
                >
                  Batal
                </button>
                {/* Intentional Urgency Button (Signal Blue) */}
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-sm cursor-pointer"
                >
                  Konfirmasi Pembelian
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white border-2 border-black p-6 rounded-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-lg font-black uppercase text-neutral-900">
              Pemesanan Berhasil
            </h3>
            <p className="text-xs text-neutral-600">
              Tiket joyride resmi telah diterbitkan. Silakan cek boarding pass pada tab Tiket Saya.
            </p>
            <button
              type="button"
              onClick={() => {
                setSuccessModal(false);
                setActiveTab('history');
              }}
              className="w-full py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Lihat Tiket Saya
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
