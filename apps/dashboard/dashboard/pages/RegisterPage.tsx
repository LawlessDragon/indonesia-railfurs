import React, { useState, useRef } from 'react';
// TODO: beresin nanti
// TODO: beresin nanti
import { useAuth } from '../context/AuthContext';
import { AVATAR_PRESETS } from '../data/defaultProfile';
import { Train, ArrowRight, ArrowLeft, Upload, Check, ExternalLink, AlertCircle } from 'lucide-react';
import { IMAGES } from '../../constants';

interface RegisterPageProps {
  onSwitchToLogin: () => void;
  onExitToLanding: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onSwitchToLogin,
  onExitToLanding,
}) => {
  const { register } = useAuth();

  const [namaAsli, setNamaAsli] = useState('');
  const [namaFursona, setNamaFursona] = useState('');
  const [spesiesFursona, setSpesiesFursona] = useState('');
  const [umur, setUmur] = useState('');
  const [domisili, setDomisili] = useState('');
  const [email, setEmail] = useState('');
  const [fotoUrl, setFotoUrl] = useState(AVATAR_PRESETS[0].url);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Harap unggah berkas gambar.');
      return;
    }
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

    if (!namaAsli.trim() || !namaFursona.trim() || !umur || !domisili.trim() || !email.trim()) {
      setError('Mohon lengkapi seluruh formulir bertanda bintang.');
      return;
    }

    const ageNum = Number(umur);
    if (isNaN(ageNum) || ageNum < 10 || ageNum > 99) {
      setError('Umur tidak valid.');
      return;
    }

    setError('');
    register({
      namaAsli: namaAsli.trim(),
      namaFursona: namaFursona.trim(),
      spesiesFursona: spesiesFursona.trim() || 'Furry Railfan',
      umur: ageNum,
      domisili: domisili.trim(),
      email: email.trim(),
      fotoUrl,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between p-6 md:p-12 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={IMAGES.logo}
            alt="IRS"
            className="h-8 w-auto object-contain invert brightness-200"
          />
          <span className="text-xs font-black uppercase tracking-widest text-neutral-300">
            REGISTRASI ANGGOTA BARU
          </span>
        </div>

        <button
          onClick={onExitToLanding}
          className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Beranda Web
        </button>
      </div>

      {/* Main Register Box */}
      <div className="relative z-10 max-w-2xl w-full mx-auto my-8">
        <div className="bg-white text-black p-8 md:p-10 rounded-3xl border-2 border-black shadow-2xl">
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 rounded-full text-[10px] font-mono uppercase tracking-widest text-neutral-600 mb-2 border border-neutral-200">
              <Train className="w-3 h-3 text-black" />
              Tiket Keanggotaan Baru
            </div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
              Daftar Anggota Railfurs
            </h1>
            <p className="text-xs text-neutral-600 mt-1">
              Lengkapi nama asli, nama fursona/OC, umur, domisili, dan foto untuk menerbitkan kartu anggota digitalmu.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Foto selector */}
            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                Foto Profil / Fursona <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={fotoUrl}
                  alt="Avatar"
                  className="w-16 h-16 rounded-xl object-cover border-2 border-black shrink-0"
                />
                <div className="space-y-2 flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-black text-white text-xs font-bold rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" /> Pilih Dari Galeri
                  </button>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {AVATAR_PRESETS.slice(0, 4).map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setFotoUrl(p.url)}
                        className={`text-[10px] px-2 py-0.5 rounded border transition-all ${
                          fotoUrl === p.url
                            ? 'bg-black text-white border-black font-bold'
                            : 'bg-white text-neutral-600 border-neutral-300'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Core Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-1">
                  Nama Asli <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={namaAsli}
                  onChange={(e) => setNamaAsli(e.target.value)}
                  placeholder="Nama lengkap asli kamu"
                  className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-1">
                  Nama Fursona / OC <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={namaFursona}
                  onChange={(e) => setNamaFursona(e.target.value)}
                  placeholder="Karakter / Nickname"
                  className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-1">
                  Spesies Karakter
                </label>
                <input
                  type="text"
                  value={spesiesFursona}
                  onChange={(e) => setSpesiesFursona(e.target.value)}
                  placeholder="Serigala, Rubah, Kucing, dsb."
                  className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-1">
                  Umur (Tahun) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={10}
                  max={99}
                  value={umur}
                  onChange={(e) => setUmur(e.target.value)}
                  placeholder="20"
                  className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-1">
                  Domisili / Kota <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={domisili}
                  onChange={(e) => setDomisili(e.target.value)}
                  placeholder="Yogyakarta, Jakarta, Bandung..."
                  className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kamu@email.com"
                  className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-black focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-1">
                Kata Sandi
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-medium text-black focus:outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-md mt-4"
            >
              <span>Daftar & Terbitkan Kartu Anggota</span>
              <Check className="w-4 h-4" />
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-6 text-center space-y-2 text-xs">
            <p className="text-neutral-600">
              Sudah memiliki akun?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-black text-black underline underline-offset-4"
              >
                Masuk di Sini
              </button>
            </p>

            <div className="pt-2">
              <a
                href="https://join.railfurs.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-500 hover:text-black"
              >
                Pendaftaran juga tersedia di: join.railfurs.my.id <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center text-neutral-500 text-[11px] font-mono">
        <p>Indonesian Railfurs. Menjaga privasi data setiap anggota komunitas.</p>
      </div>
    </div>
  );
};
