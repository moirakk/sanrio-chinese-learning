import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { getSpeechRate, setSpeechRate } from '../utils/speech';
import {
  KittyGuide,
  MelodyGuide,
  KuromiGuide,
  PochaccoGuide
} from '../assets/characters/characters';

const RATES = [
  { value: 0.5, label: '🐢', title: 'ゆっくり (0.5x)' },
  { value: 0.8, label: '🐇', title: 'ふつう (0.8x)' },
  { value: 1.0, label: '🐆', title: 'はやい (1.0x)' },
] as const;

function SpeechRatePicker({ compact = false }: { compact?: boolean }) {
  const [rate, setRate] = useState(() => getSpeechRate());

  const handleSet = (v: number) => {
    setSpeechRate(v);
    setRate(v);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {RATES.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => handleSet(r.value)}
            title={r.title}
            className={`text-base rounded-full w-7 h-7 flex items-center justify-center border transition-all ${
              rate === r.value
                ? 'bg-pink-200 border-pink-400 scale-110'
                : 'bg-white border-pink-100 hover:bg-pink-50'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] font-bold text-slate-400 tracking-wide">速度</span>
      <div className="flex flex-col gap-1">
        {RATES.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => handleSet(r.value)}
            title={r.title}
            className={`text-lg rounded-xl w-10 h-10 flex items-center justify-center border transition-all ${
              rate === r.value
                ? 'bg-pink-200 border-pink-400 scale-110'
                : 'bg-white border-pink-100 hover:bg-pink-50 hover:scale-105'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const nav = [
  { to: '/', label: 'ホーム', Icon: KittyGuide, color: 'text-pink-500' },
  { to: '/unit/1', label: 'ユニット', Icon: MelodyGuide, color: 'text-purple-500' },
  { to: '/myroom', label: 'マイルーム', Icon: PochaccoGuide, color: 'text-emerald-600' },
  { to: '/parent', label: '保護者', Icon: ClipboardList, color: 'text-slate-600' },
];

export default function Layout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const { profile, setProfile, meta } = useProfile();
  const activeTone = meta.accent === 'rose'
    ? 'border-rose-200 bg-rose-50 text-rose-600'
    : 'border-violet-200 bg-violet-50 text-violet-600';

  const handleProfileSwitch = () => {
    setProfile(profile === 'sister9' ? 'sister12' : 'sister9');
  };

  const ProfileButton = () => (
    <button 
      onClick={handleProfileSwitch}
      className={`flex items-center gap-2 rounded-full border px-2 py-1.5 shadow-sm transition-colors group ${activeTone}`}
      aria-label="プロフィール切り替え"
    >
      <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center overflow-hidden border border-rose-100 group-hover:scale-110 transition-transform pop-in">
        {profile === 'sister9' ? (
          <MelodyGuide className="w-8 h-8" />
        ) : (
          <KuromiGuide className="w-8 h-8" />
        )}
      </div>
      <div className="hidden sm:block text-left">
        <div className="text-[10px] font-bold text-slate-500 leading-none">プロフィール</div>
        <div className={`text-sm font-black mt-0.5 ${meta.accent === 'rose' ? 'text-rose-600' : 'text-violet-600'}`}>
          {profile === 'sister9' ? 'May' : 'Yuna'}
        </div>
      </div>
    </button>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar (md+) */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-24 flex-col items-center py-8 gap-4 bg-white/82 backdrop-blur-xl border-r border-white/80 shadow-[12px_0_40px_rgba(148,163,184,0.12)] z-50">
        <div className="flex flex-col gap-6 w-full px-2 mt-4">
          {nav.map((item) => {
            const active = item.to === '/unit/1' ? location.pathname.startsWith('/unit/') : location.pathname === item.to;
            const Icon = item.Icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-label={`${item.label}へ移動`}
                className={`flex flex-col items-center justify-center w-full aspect-square rounded-2xl transition-all duration-300 relative ${
                  active ? 'bg-rose-50 scale-105 border border-rose-100 shadow-sm' : 'hover:bg-slate-50 hover:scale-105'
                }`}
              >
                <div className={`w-10 h-10 flex items-center justify-center transition-transform ${active ? 'animate-bob' : ''}`}>
                  <Icon className="w-full h-full drop-shadow-sm" />
                </div>
                <span className={`text-[11px] font-extrabold mt-1 ${active ? item.color : 'text-slate-500'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-auto pb-4 flex flex-col items-center gap-3">
           <SpeechRatePicker />
           <button 
             onClick={handleProfileSwitch}
             className="flex flex-col items-center gap-1 group hover:scale-105 transition-transform"
             title="プロフィール切替"
           >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden border border-rose-100 shadow-sm group-hover:border-rose-300">
                {profile === 'sister9' ? (
                  <MelodyGuide className="w-10 h-10" />
                ) : (
                  <KuromiGuide className="w-10 h-10" />
                )}
              </div>
              <div className={`text-xs font-black ${meta.accent === 'rose' ? 'text-rose-600' : 'text-violet-600'}`}>
                {profile === 'sister9' ? 'May' : 'Yuna'}
              </div>
           </button>
        </div>
      </nav>
      
      {/* Main Content Area */}
      <div className="flex-1 md:ml-24 pb-24 md:pb-8 page-transition">
        <div className="mx-auto max-w-6xl p-4 md:p-8">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <div className="mb-1 inline-flex rounded-full border border-white/80 bg-white/70 px-3 py-1 text-xs font-black text-slate-500 shadow-sm">
                {meta.greeting}
              </div>
              <h1 className="text-2xl font-black text-slate-800 md:text-3xl text-3d">{title}</h1>
              <p className="text-sm font-bold text-slate-600 md:text-base mt-1">{subtitle}</p>
            </div>
            
            {/* Mobile Profile Switcher + Speech Rate */}
            <div className="md:hidden flex items-center gap-2">
              <SpeechRatePicker compact />
              <ProfileButton />
            </div>
          </header>

          <main className="min-h-[60vh]">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Tab Bar (below md) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-rose-100 z-50 shadow-[0_-8px_28px_rgba(148,163,184,0.18)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-[64px] px-2">
          {nav.map((item) => {
            const active = item.to === '/unit/1' ? location.pathname.startsWith('/unit/') : location.pathname === item.to;
            const Icon = item.Icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-label={`${item.label}へ移動`}
                className={`flex flex-col items-center justify-center flex-1 h-[56px] mx-1 rounded-xl transition-all duration-300 relative ${
                  active ? 'bg-rose-50' : ''
                }`}
              >
                <div className={`w-7 h-7 flex items-center justify-center transition-transform ${active ? 'animate-bob scale-110' : ''}`}>
                  <Icon className="w-full h-full drop-shadow-sm" />
                </div>
                <span className={`text-[10px] font-extrabold mt-0.5 ${active ? item.color : 'text-slate-500'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
