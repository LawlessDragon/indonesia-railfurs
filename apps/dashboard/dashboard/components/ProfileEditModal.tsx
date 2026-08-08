import React, { useState, useEffect } from 'react';
// NOTE: sudah dicek, aman
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '../types';
import { PRESET_AVATARS } from '../data/mockUser';
import { X, Upload, Check, Link2, Sparkles, User, Calendar, MapPin, Train } from 'lucide-react';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSave: (updated: Partial<UserProfile>) => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
}) => {
  const [namaAsli, setNamaAsli] = useState(user.namaAsli);
  const [namaFursona, setNamaFursona] = useState(user.namaFursona);
  const [umur, setUmur] = useState(String(user.umur));
  const [domisili, setDomisili] = useState(user.domisili);
  const [foto, setFoto] = useState(user.foto);
  const [spesiesOC, setSpesiesOC] = useState(user.spesiesOC || '');
  const [keretaFavorit, setKeretaFavorit] = useState(user.keretaFavorit || '');
  
  const [avatarTab, setAvatarTab] = useState<'preset' | 'upload' | 'url'>('preset');
  const [customUrl, setCustomUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync state whenever modal opens with fresh user data
  useEffect(() => {
    if (isOpen) {
      setNamaAsli(user.namaAsli);
      setNamaFursona(user.namaFursona);
      setUmur(String(user.umur));
      setDomisili(user.domisili);
      setFoto(user.foto);
      setSpesiesOC(user.spesiesOC || '');
      setKeretaFavorit(user.keretaFavorit || '');
      setErrorMsg(null);
      // Lock body scroll to prevent ugly double scrollbars
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, user]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setErrorMsg('Ukuran file maksimal 4MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFoto(event.target.result as string);
          setErrorMsg(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    if (!customUrl.trim()) return;
    setFoto(customUrl.trim());
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaAsli.trim()) {
      setErrorMsg('Nama asli wajib diisi');
      return;
    }
    if (!namaFursona.trim()) {
      setErrorMsg('Nama fursona atau OC wajib diisi');
      return;
    }
    if (!umur || isNaN(Number(umur)) || Number(umur) < 1) {
      setErrorMsg('Umur harus berupa angka valid');
      return;
    }
    if (!domisili.trim()) {
      setErrorMsg('Domisili wajib diisi');
      return;
    }

    onSave({
      namaAsli: namaAsli.trim(),
      namaFursona: namaFursona.trim(),
      umur: Number(umur),
      domisili: domisili.trim(),
      foto,
      spesiesOC: spesiesOC.trim(),
      keretaFavorit: keretaFavorit.trim(),
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          
          {/* Backdrop with smooth blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container: Single clean scroll container with fixed header and footer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-xl bg-white border border-neutral-300 rounded-xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
          >
            
            {/* 1. Fixed Header (Never scrolls away) */}
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-white">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block">
                  Identitas Anggota
                </span>
                <h3 className="text-base font-black tracking-tight text-neutral-900 uppercase">
                  Edit Profil & Karakter
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            {/* 2. Scrollable Body (Only ONE inner scroll area, no nested scrollbars) */}
            <form id="edit-profile-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              
              {errorMsg && (
                <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                  {errorMsg}
                </div>
              )}

              {/* Section A: Visual Avatar Studio */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
                    Foto Avatar / Fursona
                  </label>
                  <span className="text-[10px] text-neutral-400">
                    Preset, berkas, atau URL
                  </span>
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-4">
                  
                  {/* Current Active Preview */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg border-2 border-black overflow-hidden shrink-0 bg-white shadow-xs">
                      {foto ? (
                        <img
                          src={foto}
                          alt="Pratinjau Avatar"
                          className="w-full h-full object-cover grayscale"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-mono text-neutral-400">
                          KOSONG
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900">
                        {namaFursona || 'Karakter Anda'}
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        Tampil di kartu anggota dan manifest joyride IRS.
                      </p>
                    </div>
                  </div>

                  {/* Mode Tabs */}
                  <div className="flex p-0.5 bg-neutral-200/70 rounded-md text-[11px] font-medium">
                    <button
                      type="button"
                      onClick={() => setAvatarTab('preset')}
                      className={`flex-1 py-1.5 rounded-sm transition-all cursor-pointer ${
                        avatarTab === 'preset'
                          ? 'bg-white text-black font-bold shadow-xs'
                          : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      Pilihan Preset
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatarTab('upload')}
                      className={`flex-1 py-1.5 rounded-sm transition-all cursor-pointer ${
                        avatarTab === 'upload'
                          ? 'bg-white text-black font-bold shadow-xs'
                          : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      Unggah Berkas
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatarTab('url')}
                      className={`flex-1 py-1.5 rounded-sm transition-all cursor-pointer ${
                        avatarTab === 'url'
                          ? 'bg-white text-black font-bold shadow-xs'
                          : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      Tautan URL
                    </button>
                  </div>

                  {/* Preset Choices */}
                  {avatarTab === 'preset' && (
                    <div className="grid grid-cols-3 gap-2.5 pt-1">
                      {PRESET_AVATARS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setFoto(preset.url)}
                          className={`relative p-1.5 rounded-md border text-center transition-all cursor-pointer bg-white ${
                            foto === preset.url
                              ? 'border-black ring-2 ring-black ring-offset-1'
                              : 'border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-full h-16 object-cover rounded-xs grayscale mb-1"
                          />
                          <span className="text-[10px] text-neutral-700 font-medium block truncate">
                            {preset.label.replace('Karakter ', '')}
                          </span>
                          {foto === preset.url && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white rounded-full flex items-center justify-center">
                              <Check size={10} />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Upload Choice */}
                  {avatarTab === 'upload' && (
                    <label className="flex flex-col items-center justify-center p-4 border border-dashed border-neutral-300 rounded-md bg-white hover:border-black transition-colors cursor-pointer text-center">
                      <Upload size={20} className="text-neutral-400 mb-1.5" />
                      <span className="text-xs font-semibold text-neutral-800">
                        Klik untuk pilih gambar
                      </span>
                      <span className="text-[10px] text-neutral-400 mt-0.5">
                        PNG, JPG, WebP (Maksimal 4MB)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}

                  {/* URL Choice */}
                  {avatarTab === 'url' && (
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://i.ibb.co/..."
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs border border-neutral-300 rounded-md focus:border-black focus:outline-none bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleApplyUrl}
                        className="px-3 py-1.5 bg-black text-white text-xs font-semibold rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        Pasang
                      </button>
                    </div>
                  )}

                </div>
              </div>

              {/* Section B: Biodata Input Fields */}
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 block">
                  Data Pokok Anggota
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Nama Asli */}
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      Nama Asli Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={namaAsli}
                      onChange={(e) => setNamaAsli(e.target.value)}
                      placeholder="Contoh: Muhammad Farhan"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Nama Fursona / OC */}
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      Nama Fursona / OC <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={namaFursona}
                      onChange={(e) => setNamaFursona(e.target.value)}
                      placeholder="Contoh: Reno Swiftail"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Umur */}
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      Umur (Tahun) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="120"
                      value={umur}
                      onChange={(e) => setUmur(e.target.value)}
                      placeholder="23"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:border-black focus:ring-1 focus:ring-black focus:outline-none font-mono transition-colors"
                    />
                  </div>

                  {/* Domisili */}
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      Domisili / Kota Asal <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={domisili}
                      onChange={(e) => setDomisili(e.target.value)}
                      placeholder="Contoh: Bandung, Jawa Barat"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Spesies OC (Opsional) */}
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      Spesies Karakter (Opsional)
                    </label>
                    <input
                      type="text"
                      value={spesiesOC}
                      onChange={(e) => setSpesiesOC(e.target.value)}
                      placeholder="Contoh: Rubah Merah, Serigala"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Kereta Favorit (Opsional) */}
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      Kereta Favorit (Opsional)
                    </label>
                    <input
                      type="text"
                      value={keretaFavorit}
                      onChange={(e) => setKeretaFavorit(e.target.value)}
                      placeholder="Contoh: CC 206, KA Argo Parahyangan"
                      className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-md focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-colors"
                    />
                  </div>

                </div>
              </div>

            </form>

            {/* 3. Fixed Footer (Never cutoff, always visible on screen) */}
            <div className="px-6 py-3.5 border-t border-neutral-100 flex items-center justify-end gap-3 bg-neutral-50 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-black rounded-md transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                form="edit-profile-form"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-sm cursor-pointer"
              >
                Simpan Perubahan
              </button>
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};
