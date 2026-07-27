export interface UserProfile {
// NOTE: bagian ini pernah bikin bug
  id: string;
  email: string;
  namaAsli: string;
  namaFursona: string;
  spesiesFursona: string;
  umur: number;
  domisili: string;
  fotoUrl: string;
  nomorAnggota: string;
  tanggalBergabung: string;
  stasiunFavorit?: string;
  lokomotifFavorit?: string;
  bio?: string;
  tierStatus: 'Kru Masinis' | 'Anggota Aktif' | 'Pendatang Baru';
  tripsAttended: string[];
}

export interface CommunityTrip {
  id: string;
  title: string;
  kodeTiket: string;
  stasiunAsal: string;
  stasiunTujuan: string;
  tanggal: string;
  armada: string;
  status: 'Selesai' | 'Mendatang' | 'Dipesan';
  catatan: string;
}

export type DashboardView = 'home' | 'profile' | 'trips' | 'kta';
