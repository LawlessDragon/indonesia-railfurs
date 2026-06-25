export type RegistrationStatus = 'verified' | 'pending' | 'rejected';

export interface UserProfile {
  id: string;
  namaAsli: string;
  namaFursona: string;
  umur: number | string;
  domisili: string;
  foto: string;
  email: string;
  memberId: string;
  bergabungSejak: string;
  statusKeanggotaan: 'Aktif' | 'Alumni' | 'Pengurus' | 'Calon Anggota';
  spesiesOC?: string;
  keretaFavorit?: string;
  
  // Registration and verification state
  statusPendaftaran: RegistrationStatus;
  nomorPendaftaran?: string;
  tanggalPendaftaran?: string;
  alasanPenolakan?: string;
}

export interface JoyrideHistoryItem {
  id: string;
  eventTitle: string;
  location: string;
  year: string;
  role: string;
  status: 'Hadir' | 'Terdaftar' | 'Rencana';
}

export interface UpcomingTicket {
  id: string;
  eventTitle: string;
  route: string;
  trainName: string;
  date: string;
  time: string;
  price: string;
  remainingSeats: number;
  totalSeats: number;
  status: 'Tersedia' | 'Segera Dibuka' | 'Habis';
  description: string;
}

export interface BookedTicket {
  ticketCode: string;
  eventId: string;
  eventTitle: string;
  trainName: string;
  route: string;
  date: string;
  time: string;
  passengerRealName: string;
  passengerFursonaName: string;
  seatNumber: string;
  price: string;
  bookedAt: string;
}
