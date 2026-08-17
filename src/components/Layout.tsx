import { Link, useLocation } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import {
  KittyGuide,
  MelodyGuide,
  CinnamorollGuide,
  PompompurinGuide,
  KuromiGuide,
  PochaccoGuide
} from '../assets/characters/characters';

const nav = [
  { to: '/', label: 'ホーム', Icon: KittyGuide, color: 'text-pink-500' },
  { to: '/pinyin', label: 'ピンイン', Icon: MelodyGuide, color: 'text-purple-500' },
  { to: '/kanji', label: '漢字', Icon: CinnamorollGuide, color: 'text-blue-500' },
  { to: '/conversation', label: '会話', Icon: PompompurinGuide, color: 'text-yellow-600' },
  { to: '/challenge', label: '塔', Icon: KuromiGuide, color: 'text-slate-800' },
  { to: '/myroom', label: 'マイルーム', Icon: PochaccoGuide, color: 'text-emerald-600' },
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
  const { profile, setProfile } = useProfile();

  const handleProfileSwitch = () => {
    setProfile(profile === 'sister9' ? 'sister12' : 'sister9');
  };

  return (
    <div className="min-h-screen pb-20 md:p-5 lg:p-8 page-transition">
      <div className="mx-auto max-w-6xl rounded-3xl glass-panel p-4 md:p-6 card-shadow mb-8 relative">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-pink-500 md:text-3xl text-3d tracking-wider">{title}</h1>
            <p className="text-sm font-bold text-slate-600 md:text-base">{subtitle}</p>
          </div>
          
          <button 
            onClick={handleProfileSwitch}
            className="flex items-center gap-2 btn-3d rounded-full bg-white px-3 py-1.5 border-2 border-pink-200 hover:border-pink-400 transition-colors group"
            aria-label="プロフィール切り替え"
          >
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center overflow-hidden border border-pink-300 group-hover:scale-110 transition-transform pop-in">
              {profile === 'sister9' ? (
                <div className="text-xl">👧</div>
              ) : (
                <div className="text-xl">👩</div>
              )}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-500 leading-none">プロフィール</div>
              <div className="text-sm font-black text-pink-600">
                {profile === 'sister9' ? '妹 (9歳)' : '姉 (12歳)'}
              </div>
            </div>
          </button>
        </header>

        {/* Page Content */}
        <main className="min-h-[60vh]">
          {children}
        </main>
      </div>

      {/* Bottom Tab Bar for Mobile & Desktop Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/50 pb-safe shadow-[0_-10px_40px_rgba(255,183,197,0.3)] md:bottom-6 md:left-1/2 md:right-auto md:w-[90%] md:max-w-4xl md:-translate-x-1/2 md:rounded-2xl md:border">
        <div className="flex justify-around items-center px-2 py-2 md:px-6">
          {nav.map((item) => {
            const active = location.pathname === item.to;
            const Icon = item.Icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-label={`${item.label}へ移動`}
                className={`flex flex-col items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-2xl transition-all duration-300 relative ${
                  active ? 'scale-110' : 'hover:bg-white/50 hover:scale-105'
                }`}
              >
                {active && (
                  <div className="absolute inset-0 bg-pink-100/80 rounded-2xl -z-10 pulse-glow" />
                )}
                <div className={`w-6 h-6 md:w-12 md:h-12 flex items-center justify-center transition-transform ${active ? 'animate-bob' : ''}`}>
                  <Icon className="w-full h-full drop-shadow-md" />
                </div>
                <span className={`text-[10px] md:text-xs font-extrabold mt-1 tracking-wider ${active ? item.color + ' text-3d' : 'text-slate-500'}`}>
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
