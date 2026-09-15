import { UserProfile, CommunityTrip } from '../types/dashboard';
// TODO: rapihin nanti
// NOTE: bagian ini pernah bikin bug

export const AVATAR_PRESETS = [
  {
    label: 'Serigala Masinis',
    url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&auto=format&fit=crop&q=80',
  },
  {
    label: 'Rubah Petualang',
    url: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?w=400&auto=format&fit=crop&q=80',
  },
  {
    label: 'Kucing Kondektur',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80',
  },
  {
    label: 'Panda Merah Pengelana',
    url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop&q=80',
  },
  {
    label: 'Harimau Stasiun',
    url: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=400&auto=format&fit=crop&q=80',
  },
];

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr-irs-2022-042',
  email: 'rangga.fadeyka@railfurs.id',
  namaAsli: 'Rangga Fadeyka Pratama',
  namaFursona: 'Kurogane Swift',
  spesiesFursona: 'Serigala Kelabu',
  umur: 23,
  domisili: 'Yogyakarta',
  fotoUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&auto=format&fit=crop&q=80',
  nomorAnggota: 'IRS-2022-0042',
  tanggalBergabung: '12 November 2022',
  stasiunFavorit: 'Stasiun Yogyakarta (Tugu)',
  lokomotifFavorit: 'CC206 13 55 & Kereta Uap Jaladara',
  bio: 'Penggemar jalur selatan Jawa dan pemotret lokomotif diesel elektrik. Suka nongkrong di peron sore hari.',
  tierStatus: 'Kru Masinis',
  tripsAttended: ['irs1', 'irs2', 'irs3', 'irs4'],
};

export const INITIAL_TRIPS: CommunityTrip[] = [
  {
    id: 'trip-04',
    title: 'IRS 4: NOSTALGICFURS (Charter Jaladara)',
    kodeTiket: 'JLD-SLO-2023',
    stasiunAsal: 'Purwosari (PWS)',
    stasiunTujuan: 'Solo Kota (STA)',
    tanggal: '15 Oktober 2023',
    armada: 'Lokomotif Uap C1218 + 2 Gerbong Kayu',
    status: 'Selesai',
    catatan: 'Menyewa kereta uap legendaris di tengah kota Surakarta bersama kawan-kawan furry.',
  },
  {
    id: 'trip-03',
    title: 'IRS 3: Bogor Station Meet & Coffee',
    kodeTiket: 'BGR-COMM-2023',
    stasiunAsal: 'Jakarta Kota (JAKK)',
    stasiunTujuan: 'Bogor (BBO)',
    tanggal: '18 Juni 2023',
    armada: 'KRL Commuter Line Seri JR 205',
    status: 'Selesai',
    catatan: 'Hangout santai di Tomoro Coffee dan hunting foto KRL lintas Jabodetabek.',
  },
  {
    id: 'trip-02',
    title: 'IRS 2: Bandung Local Line Joyride',
    kodeTiket: 'BDG-LOC-2022',
    stasiunAsal: 'Bandung (BD)',
    stasiunTujuan: 'Cicalengka (CCL)',
    tanggal: '24 Desember 2022',
    armada: 'Kereta Lokal Bandung Raya (KRD / KRDI)',
    status: 'Selesai',
    catatan: 'Menyusuri jalur pegunungan Priangan sambil diskusi OC dan fotografi kereta api.',
  },
  {
    id: 'trip-01',
    title: 'IRS 1: The Debut Gathering',
    kodeTiket: 'YK-DEBUT-2022',
    stasiunAsal: 'Loko Cafe Malioboro',
    stasiunTujuan: 'Stasiun Tugu Yogyakarta',
    tanggal: '12 November 2022',
    armada: 'Peron Jalur 1 & 2 Yogyakarta',
    status: 'Selesai',
    catatan: 'Titik mula berkumpulnya railfans dan furry se-Indonesia dalam satu wadah nyata.',
  },
  {
    id: 'trip-05',
    title: 'IRS 5: Pantura Express Joyride (Rencana)',
    kodeTiket: 'EXP-PTR-2026',
    stasiunAsal: 'Gambir (GMR)',
    stasiunTujuan: 'Semarang Tawang (SMT)',
    tanggal: '28 November 2026',
    armada: 'KA Argo Bromo Anggrek Compartment Suite',
    status: 'Mendatang',
    catatan: 'Menikmati panorama matahari tenggelam di pesisir pantai utara Jawa.',
  },
];
