import { MemberProfile } from '../types/auth';
// NOTE: nyambung ke bagian lain

export const DEFAULT_MEMBER: MemberProfile = {
  id: 'irs-mem-042',
  email: 'farhan@railfurs.id',
  namaAsli: 'Farhan Ramadhan',
  namaFursona: 'Reno Wolfox',
  spesiesOC: 'Red Fox / Timber Wolf Mix',
  umur: 22,
  domisili: 'Bandung',
  foto: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80',
  nomorAnggota: 'IRS-BDG-2023-042',
  tanggalBergabung: '14 Juli 2023',
  jalurFavorit: 'Daop 2 Bandung (KRD Bandung Raya)',
  status: 'Aktif'
};

export const AVATAR_PRESETS = [
  {
    label: 'Fox Cadet',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80'
  },
  {
    label: 'Wolf Navigator',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80'
  },
  {
    label: 'Cheetah Engineer',
    url: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&auto=format&fit=crop&q=80'
  },
  {
    label: 'Otter Conductor',
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80'
  }
];

export const INDONESIAN_DOMISILES = [
  'Bandung',
  'Jakarta',
  'Bogor',
  'Depok',
  'Tangerang',
  'Bekasi',
  'Yogyakarta',
  'Surakarta (Solo)',
  'Semarang',
  'Surabaya',
  'Malang',
  'Purwokerto',
  'Cirebon',
  'Madiun',
  'Jember',
  'Medan',
  'Palembang',
  'Lainnya'
];
