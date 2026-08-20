import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Heart, Lock, Play, RotateCcw, Sparkles, Trophy, Users } from 'lucide-react';
import Layout from '../components/Layout';
import { useProfile } from '../hooks/useProfile';
import { units } from '../data/units';
import { getActiveReviewItems, getProgress, isUnitUnlocked } from '../utils/storage';
import {
  KittyGuide,
  MelodyGuide,
  CinnamorollGuide,
  PompompurinGuide,
  KuromiGuide,
  PochaccoGuide,
} from '../assets/characters/characters';

function guideNode(key: string, className = 'w-14 h-14 animate-bob') {
  if (key === 'kitty') return <KittyGuide className={className} />;
  if (key === 'melody') return <MelodyGuide className={className} />;
  if (key === 'cinnamoroll') return <CinnamorollGuide className={className} />;
  if (key === 'pompompurin') return <PompompurinGuide className={className} />;
  if (key === 'kuromi') return <KuromiGuide className={className} />;
  return <PochaccoGuide className={className} />;
}

function chapterName(chapter: number) {
  if (chapter === 1) return '第一章：はじめまして';
  if (chapter === 2) return '第二章：まいにち';
  return '第三章：おでかけ';
}

export default function Home() {
  const { profile, setProfile } = useProfile();
  const progress = getProgress(profile);
  const clearedCount = progress.clearedUnits.length;
  const nextUnit = units.find((u) => isUnitUnlocked(profile, u.id) && !progress.clearedUnits.includes(u.id)) ?? units[0];
  const reviewUnit =
    progress.clearedUnits.length > 0
      ? units.find((u) => u.id === progress.clearedUnits[progress.clearedUnits.length - 1]) ?? units[0]
      : units[0];
  const completionPct = Math.round((clearedCount / units.length) * 100);
  const streakDays = progress.streakDays ?? 0;
  const profileName = profile === 'sister9' ? 'May' : 'Yuna';
  const reviewCount = getActiveReviewItems(profile).length;

  return (
    <Layout title="中国語ランド" subtitle={`${profileName}の今日の練習`}>
      <div className="space-y-7">
        <section className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => setProfile('sister9')}
            className={`flex items-center gap-4 rounded-[1.75rem] border-2 p-4 text-left shadow-[0_16px_40px_rgba(244,114,182,0.12)] transition-transform hover:-translate-y-0.5 ${
              profile === 'sister9' ? 'border-rose-300 bg-rose-50 ring-4 ring-rose-100' : 'border-white bg-white/70'
            }`}
          >
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-white shadow-inner">
              <MelodyGuide className="h-16 w-16" />
            </div>
            <div>
              <p className="text-xl font-black text-slate-800">May のおへや</p>
              <p className="text-sm font-bold text-slate-500">やさしいルート ・ {getProgress('sister9').clearedUnits.length}ユニット</p>
              <p className="mt-1 text-xs font-black text-rose-500">{profile === 'sister9' ? 'いま使っています' : 'ここから始める'}</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setProfile('sister12')}
            className={`flex items-center gap-4 rounded-[1.75rem] border-2 p-4 text-left shadow-[0_16px_40px_rgba(139,92,246,0.12)] transition-transform hover:-translate-y-0.5 ${
              profile === 'sister12' ? 'border-violet-300 bg-violet-50 ring-4 ring-violet-100' : 'border-white bg-white/70'
            }`}
          >
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-white shadow-inner">
              <KuromiGuide className="h-16 w-16" />
            </div>
            <div>
              <p className="text-xl font-black text-slate-800">Yuna のおへや</p>
              <p className="text-sm font-bold text-slate-500">チャレンジルート ・ {getProgress('sister12').clearedUnits.length}ユニット</p>
              <p className="mt-1 text-xs font-black text-violet-500">{profile === 'sister12' ? 'いま使っています' : 'ここから始める'}</p>
            </div>
          </button>
        </section>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-[0_24px_60px_rgba(244,114,182,0.20)] md:p-7">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-rose-300 via-sky-300 to-emerald-300" />
          <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-black text-rose-500">
                <Sparkles className="h-4 w-4" />
                今日のおすすめ
              </div>
              <h2 className="text-3xl font-black leading-tight text-slate-800 md:text-4xl">
                まずはユニット {nextUnit.id} から始めよう
              </h2>
              <p className="mt-2 text-base font-bold text-slate-500">
                {nextUnit.titleJa} ・ {nextUnit.titleZh}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={`/unit/${nextUnit.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-lg font-black text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
                >
                  <Play className="h-5 w-5 fill-white" />
                  はじめる
                </Link>
                <Link
                  to={reviewCount > 0 ? '/review' : `/unit/${reviewUnit.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-sky-100 bg-sky-50 px-6 py-4 text-lg font-black text-sky-700 transition-transform hover:scale-[1.02] active:scale-[0.99]"
                >
                  <RotateCcw className="h-5 w-5" />
                  {reviewCount > 0 ? `にがて ${reviewCount}問` : '復習する'}
                </Link>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-100 bg-gradient-to-br from-rose-50 via-white to-sky-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-[2rem] bg-white shadow-inner">
                  {guideNode(nextUnit.guide, 'w-24 h-24 animate-bob')}
                </div>
                <div className="grid flex-1 grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white p-3 shadow-sm">
                    <Trophy className="mb-1 h-5 w-5 text-amber-500" />
                    <p className="text-2xl font-black text-slate-800">{progress.stars}</p>
                    <p className="text-xs font-bold text-slate-400">スター</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3 shadow-sm">
                    <Heart className="mb-1 h-5 w-5 text-rose-500" />
                    <p className="text-2xl font-black text-slate-800">{progress.hearts}</p>
                    <p className="text-xs font-bold text-slate-400">ハート</p>
                  </div>
                  <div className="col-span-2 rounded-2xl bg-white p-3 shadow-sm">
                    <div className="mb-2 flex items-center justify-between text-xs font-black text-slate-500">
                      <span>進み具合</span>
                      <span>{completionPct}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-amber-300" style={{ width: `${completionPct}%` }} />
                    </div>
                    <p className="mt-2 text-xs font-bold text-slate-400">
                      {clearedCount}/{units.length} ユニット ・ {streakDays > 0 ? `${streakDays}日れんぞく` : '今日からスタート'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Link to={`/unit/${nextUnit.id}`} className="quick-card group border-rose-100 bg-rose-50">
            <BookOpen className="h-6 w-6 text-rose-500" />
            <div>
              <p className="font-black text-slate-800">今日のレッスン</p>
              <p className="text-sm font-bold text-slate-500">次のユニットへ</p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to={reviewCount > 0 ? '/review' : `/unit/${reviewUnit.id}`} className="quick-card group border-sky-100 bg-sky-50">
            <RotateCcw className="h-6 w-6 text-sky-500" />
            <div>
              <p className="font-black text-slate-800">おさらい</p>
              <p className="text-sm font-bold text-slate-500">{reviewCount > 0 ? `${reviewCount}問のにがて` : '最近のユニット'}</p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/together" className="quick-card group border-emerald-100 bg-emerald-50">
            <Users className="h-6 w-6 text-emerald-500" />
            <div>
              <p className="font-black text-slate-800">ふたりで</p>
              <p className="text-sm font-bold text-slate-500">一緒にチャレンジ</p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>

        {[1, 2, 3].map((chapter) => {
          const chapterUnits = units.filter((u) => u.chapter === chapter);
          return (
            <section key={`ch-${chapter}`} className="rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-[0_18px_50px_rgba(148,163,184,0.16)] md:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-black text-slate-800 md:text-2xl">{chapterName(chapter)}</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
                  {chapterUnits.filter((u) => progress.clearedUnits.includes(u.id)).length}/{chapterUnits.length}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {chapterUnits.map((u) => {
                  const done = progress.clearedUnits.includes(u.id);
                  const unlocked = isUnitUnlocked(profile, u.id);
                  const isNext = u.id === nextUnit.id && !done;
                  const card = (
                    <div
                      className={`unit-card ${
                        done
                          ? 'border-amber-200 bg-amber-50'
                          : isNext
                            ? 'border-slate-900 bg-white ring-4 ring-rose-100'
                            : unlocked
                              ? 'border-white bg-white'
                              : 'border-slate-100 bg-slate-50 opacity-75'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-2xl bg-white p-1 shadow-sm">{guideNode(u.guide)}</div>
                          <div>
                            <p className="text-xs font-black text-slate-400">ユニット {u.id}</p>
                            <p className="text-lg font-black text-slate-800">{u.titleJa}</p>
                            <p className="text-sm font-bold text-slate-500">{u.titleZh}</p>
                          </div>
                        </div>
                        {!unlocked ? <Lock className="h-5 w-5 text-slate-300" /> : null}
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm font-black">
                        <span className={done ? 'text-amber-600' : unlocked ? 'text-rose-500' : 'text-slate-400'}>
                          {done ? 'クリア済み' : unlocked ? (isNext ? '今日のおすすめ' : '挑戦できます') : 'ロック中'}
                        </span>
                        <span className="text-slate-400">{u.isTest ? 'BOSS' : '★'.repeat(u.stars)}</span>
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
