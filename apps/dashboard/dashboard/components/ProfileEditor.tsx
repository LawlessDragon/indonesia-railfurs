import React, { useState, useRef } from 'react';
// NOTE: bagian ini pernah bikin bug
import { UserProfile } from '../types/dashboard';
import { AVATAR_PRESETS } from '../data/defaultProfile';
import { 
  Upload, 
  Camera, 
  Check, 
  User, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Train, 
  RotateCcw,
  AlertCircle
} from 'lucide-react';

interface ProfileEditorProps {
  user: UserProfile;
  onSave: (updated: Partial<UserProfile>) => void;
  onCancel?: () => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ user, onSave, onCancel }) => {
  const [namaAsli, setNamaAsli] = useState(user.namaAsli);
  const [namaFursona, setNamaFursona] = useState(user.namaFursona);
  const [spesiesFursona, setSpesiesFursona] = useState(user.spesiesFursona);
  const [umur, setUmur] = useState<number | string>(user.umur);
  const [domisili, setDomisili] = useState(user.domisili);
  const [fotoUrl, setFotoUrl] = useState(user.fotoUrl);
  const [stasiunFavorit, setStasiunFavorit] = useState(user.stasiunFavorit || '');
  const [lokomotifFavorit, setLokomotifFavorit] = useState(user.lokomotifFavorit || '');
  const [bio, setBio] = useState(user.bio || '');

  const [savedNotice, setSavedNotice] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File upload reader
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Harap unggah file berformat gambar (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setErrorMessage('Ukuran file maksimal 4MB agar tidak memberatkan browser.');
      return;
    }

    setErrorMessage('');
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setFotoUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!namaAsli.trim()) {
      setErrorMessage('Nama asli wajib diisi.');
      return;
    }

    if (!namaFursona.trim()) {
      setErrorMessage('Nama fursona atau OC wajib diisi.');
      return;
    }

    const parsedAge = Number(umur);
    if (isNaN(parsedAge) || parsedAge < 10 || parsedAge > 100) {
      setErrorMessage('Umur harus berupa angka yang valid (antara 10 sampai 100 tahun).');
      return;
    }

    if (!domisili.trim()) {
      setErrorMessage('Domisili kota wajib diisi.');
      return;
    }

    setErrorMessage('');
    onSave({
      namaAsli: namaAsli.trim(),
      namaFursona: namaFursona.trim(),
      spesiesFursona: spesiesFursona.trim() || 'Furry Railfan',
      umur: parsedAge,
      domisili: domisili.trim(),
      fotoUrl,
      stasiunFavorit: stasiunFavorit.trim(),
      lokomotifFavorit: lokomotifFavorit.trim(),
      bio: bio.trim(),
    });

    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
    }, 3000);
  };

  const handleReset = () => {
    setNamaAsli(user.namaAsli);
    setNamaFursona(user.namaFursona);
    setSpesiesFursona(user.spesiesFursona);
    setUmur(user.umur);
    setDomisili(user.domisili);
    setFotoUrl(user.fotoUrl);
    setStasiunFavorit(user.stasiunFavorit || '');
    setLokomotifFavorit(user.lokomotifFavorit || '');
    setBio(user.bio || '');
    setErrorMessage('');
  };

  return (
    <div className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="border-b border-black pb-4 mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <div>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black flex items-center gap-2">
            <User className="w-6 h-6" /> Edit Profil Anggota
          </h2>
          <p className="text-xs text-neutral-500 font-mono mt-1">
            Perbarui data diri, nama OC fursona, umur, domisili, dan foto resmi kamu
          </p>
        </div>
        {savedNotice && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-bold animate-pulse">
            <Check className="w-4 h-4" /> Perubahan Berhasil Disimpan
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="mb-6 p-3 bg-red-50 border border-red-300 text-red-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BAGIAN FOTO PROFIL & FURSONA */}
        <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-200">
          <label className="block text-xs font-black uppercase tracking-wider text-black mb-3">
            Foto Profil / Karakter Fursona
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative group shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-black bg-white shadow-md">
                <img
                  src={fotoUrl}
                  alt="Preview Foto"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity rounded-2xl text-[10px] font-bold"
              >
                <Camera className="w-5 h-5 mb-1" />
                Ganti Foto
              </button>
            </div>

            <div className="flex-1 w-full space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" /> Unggah Dari Perangkat
                </button>
              </div>

              <div>
                <span className="text-[11px] text-neutral-500 font-medium block mb-2">
                  Atau gunakan karakter maskot bawaan:
                </span>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setFotoUrl(preset.url)}
                      className={`px-2.5 py-1 text-[11px] rounded-lg border transition-all flex items-center gap-1.5 ${
                        fotoUrl === preset.url
                          ? 'bg-black text-white border-black font-bold'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt=""
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GRID INPUT DATA UTAMA: NAMA ASLI, NAMA FURSONA/OC, UMUR, DOMISILI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. NAMA ASLI */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Nama Asli <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={namaAsli}
                onChange={(e) => setNamaAsli(e.target.value)}
                placeholder="Contoh: Rangga Fadeyka Pratama"
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-black focus:outline-none focus:border-black focus:bg-white transition-all"
              />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Untuk kebutuhan administrasi kartu tanda anggota internal.
            </p>
          </div>

          {/* 2. NAMA FURSONA / OC */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Nama Fursona / OC <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={namaFursona}
                onChange={(e) => setNamaFursona(e.target.value)}
                placeholder="Contoh: Kurogane Swift"
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-black focus:outline-none focus:border-black focus:bg-white transition-all"
              />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Nama panggilan atau identitas karakter di komunitas.
            </p>
          </div>

          {/* SPESIES FURSONA */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Spesies Karakter (Opsional)
            </label>
            <input
              type="text"
              value={spesiesFursona}
              onChange={(e) => setSpesiesFursona(e.target.value)}
              placeholder="Contoh: Serigala Kelabu, Rubah, Kucing, Macan"
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-black focus:outline-none focus:border-black focus:bg-white transition-all"
            />
          </div>

          {/* 3. UMUR */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Umur (Tahun) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min={10}
                max={99}
                required
                value={umur}
                onChange={(e) => setUmur(e.target.value)}
                placeholder="Contoh: 23"
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-black focus:outline-none focus:border-black focus:bg-white transition-all"
              />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Usia saat ini dalam hitungan tahun.
            </p>
          </div>

          {/* 4. DOMISILI */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Domisili / Kota Asal <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={domisili}
                onChange={(e) => setDomisili(e.target.value)}
                placeholder="Contoh: Yogyakarta, Bandung, Jakarta, Solo, Surabaya"
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-black focus:outline-none focus:border-black focus:bg-white transition-all"
              />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Kota tempat kamu tinggal sekarang untuk koordinasi kopdar per-daop.
            </p>
          </div>

          {/* STASIUN FAVORIT */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Stasiun Favorit
            </label>
            <input
              type="text"
              value={stasiunFavorit}
              onChange={(e) => setStasiunFavorit(e.target.value)}
              placeholder="Contoh: Stasiun Tugu Yogyakarta (YK)"
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-black focus:outline-none focus:border-black focus:bg-white transition-all"
            />
          </div>

          {/* LOKOMOTIF FAVORIT */}
          <div className="md:col-span-2">
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Lokomotif / Rangkaian Kereta Favorit
            </label>
            <input
              type="text"
              value={lokomotifFavorit}
              onChange={(e) => setLokomotifFavorit(e.target.value)}
              placeholder="Contoh: CC206 13 55, CC201, Kereta Uap Jaladara C1218, KRL Seri 205"
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-black focus:outline-none focus:border-black focus:bg-white transition-all"
            />
          </div>

          {/* BIO SINGKAT */}
          <div className="md:col-span-2">
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Bio / Catatan Perjalanan
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Ceritakan sedikit tentang ketertarikanmu pada kereta atau furry fandom..."
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-black focus:outline-none focus:border-black focus:bg-white transition-all resize-none"
            />
          </div>
        </div>

        {/* BUTTON AKSI SIMPAN & BATAL */}
        <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Kembalikan Data
          </button>

          <div className="flex items-center gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider border border-neutral-300 hover:border-black rounded-xl transition-all"
              >
                Batal
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Simpan Profil
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
