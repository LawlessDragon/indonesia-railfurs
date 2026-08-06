import React from 'react';
// NOTE: sudah dicek, aman
import { useAuth } from '../context/AuthContext';
import { Mail, Hash, Shield, LogOut, Download, FileArchive } from 'lucide-react';

export const AccountSection: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      
      {/* Header */}
      <div className="pb-6 border-b border-neutral-200">
        <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 block mb-1">
          Sistem & Keamanan
        </span>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-900 uppercase">
          Pengaturan Akun
        </h2>
        <p className="text-xs text-neutral-500 mt-1">
          Informasi akses masuk dan kredensial anggota Indonesian Railfurs.
        </p>
      </div>

      {/* Account Info Cards */}
      <div className="border-2 border-black bg-white p-6 md:p-8 rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-6">
        
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
          <Shield size={16} className="text-neutral-800" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
            Kredensial Aktif
          </h3>
        </div>

        <div className="space-y-4">
          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-0.5">
              <Mail size={13} />
              <span>Email Terdaftar</span>
            </div>
            <p className="text-sm font-semibold text-neutral-900">
              {user.email}
            </p>
          </div>

          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-0.5">
              <Hash size={13} />
              <span>Nomor Registrasi Anggota</span>
            </div>
            <p className="text-sm font-mono font-bold text-neutral-900">
              {user.memberId}
            </p>
          </div>

          <div className="text-xs text-neutral-500 pt-1">
            Terhubung sebagai <span className="font-bold text-neutral-900">{user.namaFursona}</span> ({user.namaAsli}).
          </div>
        </div>

        {/* Download Standalone Dashboard ZIP */}
        <div className="p-4 bg-neutral-50 border-2 border-neutral-300 rounded-sm space-y-3">
          <div className="flex items-start gap-3">
            <FileArchive size={20} className="text-black shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-neutral-900">
                Ekspor Kode Dasbor (ZIP)
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                Paket mandiri lengkap berisi alur login, kartu KTA digital, sistem tiket, komponen, dan aset foto.
              </p>
            </div>
          </div>

          <a
            href="/irs-dashboard.zip"
            download="irs-dashboard.zip"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-xs"
          >
            <Download size={14} />
            <span>Unduh irs-dashboard.zip (1.4 MB)</span>
          </a>
        </div>

        {/* Singular Logout Button with Intentional Urgency Color (Rose Crimson) */}
        <div className="pt-2 border-t border-neutral-200">
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-rose-600 border border-rose-300 hover:bg-rose-600 hover:text-white rounded-sm transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            <span>Keluar dari Akun</span>
          </button>
        </div>

      </div>

    </div>
  );
};
