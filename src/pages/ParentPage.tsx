import { Link } from 'react-router-dom';
import { BookOpen, CalendarDays, Heart, Trophy } from 'lucide-react';
import Layout from '../components/Layout';
import { PROFILE_META, type Profile } from '../hooks/useProfile';
import { getUnitTitleEn, units } from '../data/units';
import { getActiveReviewItems, getProgress, getScheduledReviewItems } from '../utils/storage';
import { MelodyGuide, KuromiGuide } from '../assets/characters/characters';

const profiles: Profile[] = ['sister9', 'sister12'];

function nextUnitFor(profile: Profile) {
  const progress = getProgress(profile);
  return units.find((u) => !progress.clearedUnits.includes(u.id)) ?? units[units.length - 1];
}

export default function ParentPage() {
  return (
    <Layout title="保護者チェック" subtitle="中国語と英語の進み具合">
      <div className="space-y-6">
        <section className="grid gap-5 md:grid-cols-2">
          {profiles.map((profile) => {
            const meta = PROFILE_META[profile];
            const progress = getProgress(profile);
            const reviewItems = getActiveReviewItems(profile);
            const scheduledItems = getScheduledReviewItems(profile);
            const completionPct = Math.round((progress.clearedUnits.length / units.length) * 100);
            const nextUnit = nextUnitFor(profile);
            const Guide = profile === 'sister9' ? MelodyGuide : KuromiGuide;
            const tone = profile === 'sister9' ? 'rose' : 'violet';

            return (
              <article key={profile} className={`rounded-[2rem] border-2 bg-white/85 p-5 shadow-[0_22px_55px_rgba(15,23,42,0.10)] ${tone === 'rose' ? 'border-rose-100' : 'border-violet-100'}`}>
                <div className="mb-5 flex items-center gap-4">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-[1.5rem] ${tone === 'rose' ? 'bg-rose-50' : 'bg-violet-50'}`}>
                    <Guide className="h-16 w-16" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-800">{meta.label}</p>
                    <p className="text-sm font-bold text-slate-500">{meta.routeName}</p>
                  </div>
                </div>

                <div className="mb-5 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${tone === 'rose' ? 'bg-gradient-to-r from-rose-400 to-amber-300' : 'bg-gradient-to-r from-violet-500 to-sky-300'}`}
                    style={{ width: `${completionPct}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <BookOpen className="mb-1 h-5 w-5 text-sky-500" />
                    <p className="text-xl font-black text-slate-800">{progress.clearedUnits.length}/{units.length}</p>
                    <p className="text-xs font-bold text-slate-400">クリア</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <CalendarDays className="mb-1 h-5 w-5 text-emerald-500" />
                    <p className="text-xl font-black text-slate-800">{progress.streakDays ?? 0}日</p>
                    <p className="text-xs font-bold text-slate-400">れんぞく</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <Trophy className="mb-1 h-5 w-5 text-amber-500" />
                    <p className="text-xl font-black text-slate-800">{progress.stars}</p>
                    <p className="text-xs font-bold text-slate-400">スター</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <Heart className="mb-1 h-5 w-5 text-rose-500" />
                    <p className="text-xl font-black text-slate-800">{reviewItems.length}</p>
                    <p className="text-xs font-bold text-slate-400">復習</p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
                  <p className="text-xs font-black text-slate-400">次におすすめ</p>
                  <p className="mt-1 text-lg font-black text-slate-800">ユニット {nextUnit.id}：{nextUnit.titleJa}</p>
                  <p className="text-sm font-bold text-slate-500">{nextUnit.titleZh} / {getUnitTitleEn(nextUnit.id)}</p>
                  <Link to={`/unit/${nextUnit.id}`} className={`mt-3 inline-flex rounded-xl px-4 py-2 text-sm font-black text-white ${tone === 'rose' ? 'bg-rose-500' : 'bg-violet-500'}`}>
                    開く
                  </Link>
                </div>

                <div className={`mt-4 rounded-2xl p-4 ${reviewItems.length > 0 ? 'bg-amber-50' : 'bg-emerald-50'}`}>
                  <p className={`text-xs font-black ${reviewItems.length > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>今日のおすすめ</p>
                  <p className="mt-1 text-sm font-bold text-slate-600">
                    {reviewItems.length > 0
                      ? `まず復習を ${Math.min(reviewItems.length, 5)}問。`
                      : `次はユニット ${nextUnit.id} を少し進める。`}
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-400">予約中の復習：{scheduledItems.length}問</p>
                </div>
              </article>
            );
          })}
        </section>

        <section className="rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          <h2 className="mb-4 text-xl font-black text-slate-800">最近の学習メモ</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {profiles.map((profile) => {
              const meta = PROFILE_META[profile];
              const progress = getProgress(profile);
              return (
                <div key={`${profile}-memo`} className="rounded-2xl bg-slate-50 p-4">
                  <p className="mb-2 font-black text-slate-700">{meta.label}</p>
                  <p className="text-sm font-bold text-slate-500">覚えたことば：{progress.learnedKanji.slice(-8).join('、') || 'まだありません'}</p>
                  <p className="mt-2 text-sm font-bold text-slate-500">フレーズ：{progress.learnedPhrases.slice(-4).join(' / ') || 'まだありません'}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
}
