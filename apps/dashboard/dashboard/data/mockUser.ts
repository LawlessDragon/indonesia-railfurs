import { UserProfile, JoyrideHistoryItem, UpcomingTicket, BookedTicket } from '../types';
// NOTE: jangan diubah sembarangan dulu
// NOTE: sering berubah, hati-hati

export const INITIAL_USER: UserProfile = {
  id: 'usr_001',
  namaAsli: 'Rafi Andika Pratama',
  namaFursona: 'Reno Swiftail',
  umur: 23,
  domisili: 'Bandung, Jawa Barat',
  foto: '/src/assets/images/avatar_railfurs_member_1790826863824.jpg',
  email: 'reno.swiftail@railfurs.id',
  memberId: 'IRS-022-BDG',
  bergabungSejak: '2022',
  statusKeanggotaan: 'Aktif',
  spesiesOC: 'Rubah Merah (Red Fox)',
  keretaFavorit: 'CC 206 / KA Argo Parahyangan',
  statusPendaftaran: 'verified',
  nomorPendaftaran: 'REG-2022-BDG-014',
  tanggalPendaftaran: '14 Agustus 2022'
};

export const MOCK_APPLICANT_PENDING: UserProfile = {
  id: 'app_102',
  namaAsli: 'Dimas Setiawan',
  namaFursona: 'Kuro Kintetsu',
  umur: 21,
  domisili: 'Surabaya, Jawa Timur',
  foto: '/src/assets/images/avatar_wolf_conductor_1790826884710.jpg',
  email: 'dimas.pendaftar@gmail.com',
  memberId: 'IRS-PENDING',
  bergabungSejak: '2026',
  statusKeanggotaan: 'Calon Anggota',
  spesiesOC: 'Serigala Hitam (Timber Wolf)',
  keretaFavorit: 'CC 203 / KA Sancaka',
  statusPendaftaran: 'pending',
  nomorPendaftaran: 'REG-2026-SBY-089',
  tanggalPendaftaran: '28 September 2026'
};

export const MOCK_APPLICANT_REJECTED: UserProfile = {  id: 'app_103',
  namaAsli: 'Bagus Pratama',
  namaFursona: 'Lynx Veloce',
  umur: 19,
  domisili: 'Yogyakarta',
  foto: '/src/assets/images/avatar_lynx_traveler_1790826900103.jpg',
  email: 'bagus.applicant@gmail.com',
  memberId: 'IRS-REJECTED',
  bergabungSejak: '2026',
  statusKeanggotaan: 'Calon Anggota',
  spesiesOC: 'Eurasian Lynx',
  keretaFavorit: 'KRL Commuter Line Yogyakarta',
  statusPendaftaran: 'rejected',
  nomorPendaftaran: 'REG-2026-YGY-042',
  tanggalPendaftaran: '25 September 2026',
  alasanPenolakan: 'Foto karakter fursona tidak memenuhi resolusi minimum komunitas dan data domisili belum menyertakan kota atau kabupaten secara jelas. Harap perbarui data berkas Anda.'
};

// Mode tamu "beli tiket saja": tanpa history, tanpa profil, sesi 10 menit.
export const GUEST_SESSION_MS = 10 * 60 * 1000;

export const MOCK_GUEST: UserProfile = {
  id: 'guest_tmp',
  namaAsli: 'Tamu',
  namaFursona: 'Tamu',
  umur: '-',
  domisili: '-',
  foto: '',
  email: '',
  memberId: 'IRS-GUEST',
  bergabungSejak: '-',
  statusKeanggotaan: 'Calon Anggota',
  statusPendaftaran: 'pending',
};

export const INITIAL_JOYRIDES: JoyrideHistoryItem[] = [
  {
    id: 'jr-4',
    eventTitle: 'IRS 4: Nostalgicfurs',
    location: 'Solo, Jawa Tengah',
    year: '2023',
    role: 'Peserta Khusus',
    status: 'Hadir'
  },
  {
    id: 'jr-2',
    eventTitle: 'IRS 2: Bandung Local Line',
    location: 'Bandung Raya',
    year: '2022',
    role: 'Peserta dan Dokumentasi',
    status: 'Hadir'
  },
  {
    id: 'jr-5',
    eventTitle: 'IRS 5: Pantura Coastal Ride',
    location: 'Cirebon sampai Semarang',
    year: '2024',
    role: 'Peserta',
    status: 'Terdaftar'
  }
];

export const UPCOMING_TICKETS: UpcomingTicket[] = [
  {
    id: 'tkt-01',
    eventTitle: 'IRS 5: Pantura Coastal Ride',
    trainName: 'KLB Kereta Wisata Khusus',
    route: 'Stasiun Cirebon ke Stasiun Semarang Tawang',
    date: '18 Oktober 2026',
    time: '08:30 WIB',
    price: 'Rp 275.000',
    remainingSeats: 4,
    totalSeats: 40,
    status: 'Tersedia',
    description: 'Perjalanan joyride lintas pesisir utara Jawa bersama komunitas furries pecinta kereta api. Termasuk makan siang, merchandise resmi, dan sesi foto tematik.'
  },
  {
    id: 'tkt-02',
    eventTitle: 'Jaladara Steam Revival Gathering',
    trainName: 'Kereta Uap Jaladara Klaten-Solo',
    route: 'Stasiun Purwosari ke Stasiun Solo Kota',
    date: '14 November 2026',
    time: '09:00 WIB',
    price: 'Rp 180.000',
    remainingSeats: 12,
    totalSeats: 32,
    status: 'Tersedia',
    description: 'Nostalgia lokomotif uap legendaris melintasi jalur pusat kota Solo. Terbuka bagi fursuiter dan railfurs umum dengan spot foto eksklusif.'
  },
  {
    id: 'tkt-03',
    eventTitle: 'Priangan Highland Scenic Express',
    trainName: 'KA Panoramic Wisata',
    route: 'Stasiun Bandung ke Stasiun Banjar',
    date: '5 Desember 2026',
    time: '07:15 WIB',
    price: 'Rp 350.000',
    remainingSeats: 0,
    totalSeats: 28,
    status: 'Habis',
    description: 'Menikmati jembatan tinggi dan panorama pegunungan bumi Parahyangan lewat kaca panoramic kereta wisata.'
  }
];

export const INITIAL_BOOKED_TICKETS: BookedTicket[] = [
  {
    ticketCode: 'IRS-TKT-8841',
    eventId: 'tkt-01',
    eventTitle: 'IRS 5: Pantura Coastal Ride',
    trainName: 'KLB Kereta Wisata Khusus',
    route: 'Cirebon ke Semarang Tawang',
    date: '18 Oktober 2026',
    time: '08:30 WIB',
    passengerRealName: 'Rafi Andika Pratama',
    passengerFursonaName: 'Reno Swiftail',
    seatNumber: 'EKS-1 / 04A',
    price: 'Rp 275.000',
    bookedAt: '20 September 2026'
  }
];

export const PRESET_AVATARS = [
  {
    id: 'avatar-1',
    label: 'Karakter Rubah Conductor',
    url: '/src/assets/images/avatar_railfurs_member_1790826863824.jpg'
  },
  {
    id: 'avatar-2',
    label: 'Karakter Serigala Petugas',
    url: '/src/assets/images/avatar_wolf_conductor_1790826884710.jpg'
  },
  {
    id: 'avatar-3',
    label: 'Karakter Lynx Traveler',
    url: '/src/assets/images/avatar_lynx_traveler_1790826900103.jpg'
  }
];

