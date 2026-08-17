import { Link, useLocation } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import {
  KittyGuide,
  MelodyGuide,
  KuromiGuide,
  PochaccoGuide
} from '../assets/characters/characters';

const nav = [
  { to: '/', label: 'ホーム', Icon: KittyGuide, color: 'text-pink-500' },
  { to: '/unit/1', label: 'ユニット', Icon: MelodyGuide, color: 'text-purple-500' },
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

  const ProfileButton = () => (
    <button 
      onClick={handleProfileSwitch}
      className="flex items-center gap-2 btn-3d rounded-full bg-white px-2 py-1.5 border-2 border-pink-200 hover:border-pink-400 transition-colors group"
      aria-label="プロフィール切り替え"
    >
      <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center overflow-hidden border border-pink-300 group-hover:scale-110 transition-transform pop-in">
        {profile === 'sister9' ? (
          <MelodyGuide className="w-8 h-8" />
        ) : (
          <KuromiGuide className="w-8 h-8" />
        )}
      </div>
      <div className="hidden sm:block text-left">
        <div className="text-[10px] font-bold text-slate-500 leading-none">プロフィール</div>
        <div className="text-sm font-black text-pink-600 mt-0.5">
          {profile === 'sister9' ? 'May' : 'Yuna'}
        </div>
      </div>
    </button>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar (md+) */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-24 flex-col items-center py-8 gap-4 bg-white/90 backdrop-blur border-r border-pink-100 z-50">
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
                  active ? 'bg-pink-100 scale-105 border border-pink-200' : 'hover:bg-slate-50 hover:scale-105'
                }`}
              >
                <div className={`w-10 h-10 flex items-center justify-center transition-transform ${active ? 'animate-bob' : ''}`}>
                  <Icon className="w-full h-full drop-shadow-sm" />
                </div>
                <span className={`text-[11px] font-extrabold mt-1 tracking-wider ${active ? item.color : 'text-slate-500'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-auto pb-4">
           <button 
             onClick={handleProfileSwitch}
             className="flex flex-col items-center gap-1 group hover:scale-105 transition-transform"
             title="プロフィール切替"
           >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-pink-200 shadow-sm group-hover:border-pink-400">
                {profile === 'sister9' ? (
                  <MelodyGuide className="w-10 h-10" />
                ) : (
                  <KuromiGuide className="w-10 h-10" />
                )}
              </div>
              <div className="text-xs font-black text-pink-600">
                {profile === 'sister9' ? 'May' : 'Yuna'}
              </div>
           </button>
        </div>
      </nav>
      
      {/* Main Content Area */}
      <div className="flex-1 md:ml-24 pb-24 md:pb-8 page-transition">
        <div className="mx-auto max-w-5xl p-4 md:p-8">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-pink-500 md:text-3xl text-3d tracking-wider">{title}</h1>
              <p className="text-sm font-bold text-slate-600 md:text-base mt-1">{subtitle}</p>
            </div>
            
            {/* Mobile Profile Switcher */}
            <div className="md:hidden">
              <ProfileButton />
            </div>
          </header>

          <main className="min-h-[60vh]">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Tab Bar (below md) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 z-50 shadow-[0_-4px_20px_rgba(255,183,197,0.15)] pb-[env(safe-area-inset-bottom)]">
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
                  active ? 'bg-pink-50' : ''
                }`}
              >
                <div className={`w-7 h-7 flex items-center justify-center transition-transform ${active ? 'animate-bob scale-110' : ''}`}>
                  <Icon className="w-full h-full drop-shadow-sm" />
                </div>
                <span className={`text-[10px] font-extrabold mt-0.5 tracking-wider ${active ? item.color : 'text-slate-500'}`}>
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
