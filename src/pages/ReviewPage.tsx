import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Home, RotateCcw } from 'lucide-react';
import Layout from '../components/Layout';
import { useProfile } from '../hooks/useProfile';
import { getActiveReviewItems, markReviewMastered } from '../utils/storage';

export default function ReviewPage() {
  const { profile, meta } = useProfile();
  const [selected, setSelected] = useState<string | null>(null);
  const [doneIds, setDoneIds] = useState<string[]>([]);
  const items = getActiveReviewItems(profile).slice(0, 8);
  const current = items.find((item) => !doneIds.includes(item.id));

  const handleAnswer = (answer: string) => {
    if (!current || selected) return;
    setSelected(answer);
    const ok = answer === current.answer;
    setTimeout(() => {
      if (ok) {
        markReviewMastered(profile, current.id);
        setDoneIds((ids) => [...ids, current.id]);
      }
      setSelected(null);
    }, 850);
  };

  return (
    <Layout title="おさらい" subtitle={`${meta.label} のにがてを少しずつ減らそう`}>
      <div className="mx-auto max-w-3xl">
        {!current ? (
          <section className="rounded-[2rem] border border-emerald-100 bg-white/85 p-8 text-center shadow-[0_22px_55px_rgba(15,23,42,0.10)]">
            <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-emerald-500" />
            <h2 className="text-2xl font-black text-slate-800">今のおさらいは完了！</h2>
            <p className="mt-2 font-bold text-slate-500">また間違えた問題が出たら、ここに集まります。</p>
            <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-black text-white">
              <Home className="h-5 w-5" />
              ホームへ
            </Link>
          </section>
        ) : (
          <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-[0_22px_55px_rgba(15,23,42,0.10)] md:p-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black text-rose-500">にがて復習</p>
                <h2 className="mt-1 text-2xl font-black text-slate-800">{current.prompt}</h2>
              </div>
              <div className="rounded-2xl bg-rose-50 px-4 py-2 text-center">
                <p className="text-xs font-black text-rose-400">まちがい</p>
                <p className="text-xl font-black text-rose-600">{current.misses}</p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {current.options.map((option) => {
                const picked = selected === option;
                const correct = option === current.answer;
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={selected !== null}
                    onClick={() => handleAnswer(option)}
                    className={`rounded-2xl border-2 bg-white p-4 text-lg font-black transition-all ${
                      picked
                        ? correct
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                          : 'border-rose-300 bg-rose-50 text-rose-700'
                        : 'border-slate-100 text-slate-700 hover:border-sky-200 hover:bg-sky-50'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {selected && selected !== current.answer ? (
              <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 p-4 font-bold text-amber-700">
                正解は「{current.answer}」。もう一回あとで出ます。
              </div>
            ) : null}

            <div className="mt-6 flex items-center justify-between text-sm font-bold text-slate-400">
              <span>{items.length}問のおさらい</span>
              <span className="inline-flex items-center gap-1">
                <RotateCcw className="h-4 w-4" />
                正解したら復習から外れます
              </span>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
