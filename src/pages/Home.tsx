
import { Link } from 'react-router-dom';
import { KittyGuide, MelodyGuide, CinnamorollGuide, PompompurinGuide, KuromiGuide, PochaccoGuide } from '../assets/characters/characters';
import Layout from '../components/Layout';
import { useProfile } from '../hooks/useProfile';
import { getProgress } from '../utils/storage';
import type { ReactElement } from 'react';

export default function Home() {
  const { profile } = useProfile();
  const progress = getProgress(profile);
  const isSister9 = profile === 'sister9';
  const welcomeMessage = isSister9 ? 'いもうとちゃん' : 'おねえちゃん';
  const targetToday = isSister9 ? 20 : 30;
  const todayProgress = Math.min(100, Math.round((progress.stars / targetToday) * 100));

  return (
    <Layout title="ホーム" subtitle="ふたり専用の中国語チャレンジ">
      <div className="space-y-5">
        <header className="rounded-3xl bg-pink-50 p-4 md:p-6">
          <div className="flex items-center gap-4">
            <KittyGuide className="h-16 w-16 animate-bob" />
            <div>
              <h2 className="text-xl font-bold text-pink-500 md:text-2xl">ここはふたりの中国語ランドだよ！</h2>
              <p className="text-sm font-medium text-slate-600 md:text-base">
                ようこそ、<span className="font-bold text-pink-600">{welcomeMessage}</span>！
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-white p-4">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-bold text-slate-700">今日のしんちょく</span>
              <span className="font-bold text-pink-500">{todayProgress}%</span>
            </div>
            <div className="h-4 overflow-hidden rounded-full bg-pink-100">
              <div className="h-full rounded-full bg-pink-400 transition-all" style={{ width: `${todayProgress}%` }} />
            </div>
            <p className="mt-2 text-sm font-semibold text-yellow-600">⭐ {progress.stars} / ❤️ {progress.hearts}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ModuleCard to="/pinyin" title="ピンインランド" color="bg-pink-300" desc="My Melodyと発音の練習" guide={<MelodyGuide className="h-16 w-16" />} />
          <ModuleCard to="/kanji" title="漢字アドベンチャー" color="bg-sky-300" desc="Cinnamorollと漢字を学ぶ" guide={<CinnamorollGuide className="h-16 w-16" />} />
          <ModuleCard to="/conversation" title="にちじょうかいわ" color="bg-amber-200" desc="Pompompurinと会話する" guide={<PompompurinGuide className="h-16 w-16" />} />
          <ModuleCard to="/challenge" title="チャレンジタワー" color="bg-violet-300" desc="Kuromiの総合テスト" guide={<KuromiGuide className="h-16 w-16" />} />
          <ModuleCard to="/myroom" title="マイルーム" color="bg-emerald-200" desc="Pochaccoと成長を確認" guide={<PochaccoGuide className="h-16 w-16" />} />
        </div>
      </div>
    </Layout>
  );
}

function ModuleCard({
  to,
  title,
  color,
  desc,
  guide,
}: {
  to: string;
  title: string;
  color: string;
  desc: string;
  guide: ReactElement;
}) {
  return (
    <Link to={to} className={`${color} card-shadow flex min-h-40 transform flex-col items-center rounded-3xl p-6 text-center transition hover:-translate-y-1`} aria-label={`${title}へ`}>
      <div className="mb-3">{guide}</div>
      <h3 className="mb-1 text-xl font-bold text-white drop-shadow">{title}</h3>
      <p className="font-medium text-white/95">{desc}</p>
    </Link>
  );
}
