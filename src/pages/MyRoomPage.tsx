import Layout from '../components/Layout';
import { PochaccoGuide } from '../assets/characters/characters';
import { useProfile } from '../hooks/useProfile';
import { getProgress } from '../utils/storage';

const allCharacters = ['Kitty風', 'Melody風', 'Cinnamoroll風', 'Pompompurin風', 'Kuromi風', 'Pochacco風'];

export default function MyRoomPage() {
  const { profile } = useProfile();
  const progress = getProgress(profile);
  const completion = Math.min(100, Math.round((progress.clearedGames.length / 7) * 100));

  return (
    <Layout title="マイルーム" subtitle="Pochaccoと成長記録をチェック">
      <section className="mb-6 rounded-3xl bg-emerald-50 p-4">
        <div className="mb-3 flex items-center gap-3">
          <PochaccoGuide className="h-14 w-14 animate-bob" />
          <p className="font-semibold text-emerald-600">ふたりそれぞれの進度を保存しているよ！</p>
        </div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-bold text-slate-700">総合進捗</span>
          <span className="font-bold text-emerald-600">{completion}%</span>
        </div>
        <div className="h-4 overflow-hidden rounded-full bg-emerald-100">
          <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${completion}%` }} />
        </div>
      </section>

      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-4">
          <p className="text-sm font-semibold text-slate-500">スター</p>
          <p className="text-2xl font-bold text-yellow-500">⭐ {progress.stars}</p>
        </div>
        <div className="rounded-3xl bg-white p-4">
          <p className="text-sm font-semibold text-slate-500">ハート</p>
          <p className="text-2xl font-bold text-rose-500">❤️ {progress.hearts}</p>
        </div>
        <div className="rounded-3xl bg-white p-4">
          <p className="text-sm font-semibold text-slate-500">バッジ</p>
          <p className="text-2xl font-bold text-amber-500">🏅 {progress.badges.length}</p>
        </div>
      </section>

      <section className="mb-6 rounded-3xl bg-white p-4">
        <h3 className="mb-2 text-lg font-bold text-emerald-600">覚えた漢字図鑑</h3>
        <div className="flex flex-wrap gap-2">
          {progress.learnedKanji.length ? (
            progress.learnedKanji.map((k) => (
              <span key={k} className="rounded-xl bg-emerald-100 px-3 py-2 text-lg font-bold text-emerald-700">
                {k}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-500">まだありません。ゲームで集めよう！</p>
          )}
        </div>
      </section>

      <section className="mb-6 rounded-3xl bg-white p-4">
        <h3 className="mb-2 text-lg font-bold text-sky-600">覚えたフレーズ</h3>
        <div className="space-y-2">
          {progress.learnedPhrases.length ? (
            progress.learnedPhrases.slice(0, 20).map((p) => (
              <p key={p} className="rounded-xl bg-sky-50 p-2 text-sm font-semibold text-sky-700">
                {p}
              </p>
            ))
          ) : (
            <p className="text-sm text-slate-500">まだありません。会話ゲームで増やそう！</p>
          )}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-4">
        <h3 className="mb-2 text-lg font-bold text-violet-600">キャラクターコレクション</h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {allCharacters.map((name) => {
            const unlocked = progress.unlockedCharacters.includes(name) || progress.clearedGames.length >= 3;
            return (
              <div key={name} className={`rounded-2xl border p-3 text-center font-bold ${unlocked ? 'border-violet-300 bg-violet-50 text-violet-700' : 'border-slate-200 bg-slate-50 text-slate-400'}`}>
                {unlocked ? name : '???'}
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
