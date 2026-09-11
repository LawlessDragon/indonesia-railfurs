export interface MemberProfile {
  id: string;
  email: string;
  namaAsli: string;
  namaFursona: string;
  spesiesOC?: string;
  umur: number;
  domisili: string;
  foto: string;
  nomorAnggota: string;
  tanggalBergabung: string;
  jalurFavorit?: string;
  status: 'Aktif' | 'Masinis Tamu' | 'Kru Lintas';
}

export interface AuthState {
  user: MemberProfile | null;
  isAuthenticated: boolean;
}

export interface ProfileEditFormValues {
  namaAsli: string;
  namaFursona: string;
  umur: number;
  domisili: string;
  foto: string;
  spesiesOC?: string;
  jalurFavorit?: string;
}
