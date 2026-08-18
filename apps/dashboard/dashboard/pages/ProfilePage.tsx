import React from 'react';
// NOTE: penting, jangan dihapus
import { useAuth } from '../context/AuthContext';
import { ProfileEditor } from '../components/ProfileEditor';
import { ProfileCard } from '../components/ProfileCard';
import { UserCheck, Sparkles } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 bg-white px-2.5 py-0.5 rounded-full border border-neutral-300 inline-block">
            PENGATURAN IDENTITAS
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black flex items-center gap-2">
          <UserCheck className="w-7 h-7" /> Profil & Kartu Tanda Anggota
        </h1>
        <p className="text-xs text-neutral-600 mt-1 max-w-2xl">
          Edit lima data pokok keanggotaan kamu: nama asli, nama fursona atau OC, umur, domisili, dan foto profil. Perubahan langsung tercermin pada kartu digitalmu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Form Column */}
        <div className="lg:col-span-7">
          <ProfileEditor
            user={user}
            onSave={(updated) => updateProfile(updated)}
          />
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Pratinjau KTA Langsung
            </span>
            <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Live Preview
            </span>
          </div>

          <ProfileCard user={user} showActions={true} />

          <div className="p-4 bg-white border border-neutral-300 rounded-xl text-xs space-y-2">
            <h4 className="font-bold text-black uppercase tracking-wider text-[11px]">
              Petunjuk Pengisian Profil
            </h4>
            <ul className="text-neutral-600 space-y-1.5 text-[11px] list-disc list-inside">
              <li><strong>Nama Asli:</strong> Disimpan untuk pendataan tiket joyride KAI resmi.</li>
              <li><strong>Nama Fursona / OC:</strong> Nama karakter yang dicetak besar di kartu KTA.</li>
              <li><strong>Umur & Domisili:</strong> Menentukan penempatan peron dan koordinasi wilayah.</li>
              <li><strong>Foto:</strong> Gunakan gambar karakter atau avatar fursona kamu yang jelas.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
