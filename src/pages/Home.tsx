import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useProfile } from '../hooks/useProfile';
import { units } from '../data/units';
import { getProgress, isUnitUnlocked } from '../utils/storage';
import {
  KittyGuide,
  MelodyGuide,
  CinnamorollGuide,
  PompompurinGuide,
  KuromiGuide,
  PochaccoGuide,
} from '../assets/characters/characters';

function guideNode(key: string) {
  if (key === 'kitty') return <KittyGuide className="w-14 h-14 animate-bob" />;
  if (key === 'melody') return <MelodyGuide className="w-14 h-14 animate-bob" />;
  if (key === 'cinnamoroll') return <CinnamorollGuide className="w-14 h-14 animate-bob" />;
  if (key === 'pompompurin') return <PompompurinGuide className="w-14 h-14 animate-bob" />;
  if (key === 'kuromi') return <KuromiGuide className="w-14 h-14 animate-bob" />;
  return <PochaccoGuide className="w-14 h-14 animate-bob" />;
}

export default function Home() {
  const { profile } = useProfile();
  const progress = getProgress(profile);

  return (
    <Layout title="ユニットマップ" subtitle="15ユニットを1つずつクリアしよう！">
      <div className="space-y-6">
        {[1, 2, 3].map((chapter) => {
          const chapterUnits = units.filter((u) => u.chapter === chapter);
          const chapterTitle =
            chapter === 1 ? '第一章：はじめまして' : chapter === 2 ? '第二章：まいにち' : '第三章：おでかけ';
          return (
            <section key={`ch-${chapter}`} className="rounded-3xl glass-panel border-2 border-pink-200 p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-black text-pink-600 mb-4">{chapterTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapterUnits.map((u) => {
                  const done = progress.clearedUnits.includes(u.id);
                  const unlocked = isUnitUnlocked(profile, u.id);
                  const card = (
                    <div
                      className={`rounded-3xl p-4 border-4 transition-all card-shadow ${
                        done
                          ? 'border-yellow-400 bg-yellow-50'
                          : unlocked
                            ? 'border-pink-300 bg-white'
                            : 'border-slate-200 bg-slate-100 opacity-70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-black text-slate-500">ユニット {u.id}</p>
                        <p className="text-sm font-black">{u.isTest ? 'BOSS ★' : '⭐'.repeat(u.stars)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {guideNode(u.guide)}
                        <div>
                          <p className="text-lg font-black text-slate-700">{u.titleJa}</p>
                          <p className="text-sm font-bold text-slate-500">{u.titleZh}</p>
                        </div>
                      </div>
                      <div className="mt-3 text-sm font-black">
                        {done ? (
                          <span className="text-yellow-600">クリア済み ⭐</span>
                        ) : unlocked ? (
                          <span className="text-pink-600">挑戦できます</span>
                        ) : (
                          <span className="text-slate-400">ロック中 🔒</span>
                        )}
                      </div>
                    </div>
                  );
                  if (!unlocked) return <div key={u.id}>{card}</div>;
                  return (
                    <Link key={u.id} to={`/unit/${u.id}`} aria-label={`ユニット${u.id}へ`} className="block active:scale-[0.99]">
                      {card}
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </Layout>
  );
}