import { Link, useLocation } from 'react-router-dom';
import { PROFILE_META, useProfile } from '../hooks/useProfile';

const nav = [
  { to: '/', label: 'ホーム' },
  { to: '/pinyin', label: 'ピンイン' },
  { to: '/kanji', label: '漢字' },
  { to: '/conversation', label: '会話' },
  { to: '/challenge', label: '塔' },
  { to: '/myroom', label: 'マイルーム' },
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

  return (
    <div className="min-h-screen p-3 md:p-5 lg:p-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white/85 p-4 md:p-6 card-shadow">
        <header className="mb-4 flex flex-col gap-3 md:mb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-pink-500 md:text-3xl">{title}</h1>
            <p className="text-sm text-slate-600 md:text-base">{subtitle}</p>
            <p className="text-xs font-semibold text-purple-500">
              {meta.label} - {meta.routeName} ({meta.description})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="profile-select" className="text-sm font-semibold text-slate-700">
              プロフィール
            </label>
            <select
              id="profile-select"
              value={profile}
              onChange={(e) => setProfile(e.target.value as keyof typeof PROFILE_META)}
              aria-label="プロフィール選択"
              className="rounded-xl border border-pink-200 bg-pink-50 px-3 py-2 text-sm font-semibold text-pink-700"
            >
              <option value="sister9">妹 (9歳)</option>
              <option value="sister12">姉 (12歳)</option>
            </select>
          </div>
        </header>

        <nav className="mb-4 grid grid-cols-3 gap-2 md:mb-6 md:grid-cols-6">
          {nav.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-label={`${item.label}へ移動`}
                className={`rounded-xl px-2 py-2 text-center text-sm font-bold transition ${
                  active
                    ? 'bg-pink-400 text-white'
                    : 'bg-pink-100 text-pink-700 hover:scale-[1.03] hover:bg-pink-200'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {children}
      </div>
    </div>
  );
}
