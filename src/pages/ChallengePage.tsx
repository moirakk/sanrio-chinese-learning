import { useState } from 'react';
import Layout from '../components/Layout';
import { KuromiGuide } from '../assets/characters/characters';
import { useProfile } from '../hooks/useProfile';
import { getProgress, recordGameClear, saveProgress } from '../utils/storage';
import { allKanji } from '../data/kanji';
import { conversations } from '../data/conversations';
import { initials } from '../data/pinyin';

type Question = {
  q: string;
  choices: string[];
  answer: string;
};

function getRanking() {
  const p9 = getProgress('sister9');
  const p12 = getProgress('sister12');
  return [
    { name: '妹(9歳)', stars: p9.stars },
    { name: '姉(12歳)', stars: p12.stars },
  ].sort((a, b) => b.stars - a.stars);
}

function buildQuestions(floor: number): Question[] {
  const qs: Question[] = [];
  for (let i = 0; i < 5; i += 1) {
    const type = i % 3;
    if (type === 0) {
      const item = initials[(floor + i) % initials.length];
      qs.push({
        q: `${item.value} の近い音は？`,
        choices: [item.kana, 'ア', 'サ', 'ミ'],
        answer: item.kana,
      });
    } else if (type === 1) {
      const item = allKanji[(floor + i) % allKanji.length];
      qs.push({
        q: `「${item.hanzi}」の意味は？`,
        choices: [item.ja, 'きれい', 'たのしい', 'かたい'],
        answer: item.ja,
      });
    } else {
      const item = conversations[(floor + i) % conversations.length];
      qs.push({
        q: `「${item.ja}」に近い中国語は？`,
        choices: [item.zh, '谢谢', '再见', '我不懂'],
        answer: item.zh,
      });
    }
  }
  return qs.map((q) => ({ ...q, choices: Array.from(new Set(q.choices)).sort(() => Math.random() - 0.5) }));
}

export default function ChallengePage() {
  const { profile } = useProfile();
  const [floor, setFloor] = useState(1);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState('5問クリアで次の階へ！');
  const [questions, setQuestions] = useState<Question[]>(() => buildQuestions(1));
  const ranking = getRanking();
  const isBoss = floor % 5 === 0;

  const current = questions[index];

  function answer(choice: string) {
    if (!current) return;
    if (choice === current.answer) {
      setScore((s) => s + (isBoss ? 2 : 1));
      setMsg('正解！塔をのぼろう ⭐');
    } else {
      setMsg('おしい！次で取り返そう');
    }

    if (index >= 4) {
      const nextFloor = floor + 1;
      setFloor(nextFloor);
      setIndex(0);
      setQuestions(buildQuestions(nextFloor));
      const progress = getProgress(profile);
      saveProgress(profile, { ...progress, stars: progress.stars + score + (isBoss ? 3 : 1) });
      if (nextFloor > 10) {
        recordGameClear(profile, 'challenge-tower', 12);
      }
    } else {
      setIndex((i) => i + 1);
    }
  }

  return (
    <Layout title="チャレンジタワー" subtitle="Kuromiと総合テスト！10階+Boss2戦">
      <section className="mb-6 rounded-3xl bg-violet-50 p-4">
        <div className="mb-3 flex items-center gap-3">
          <KuromiGuide className="h-14 w-14 animate-bob" />
          <p className="font-semibold text-violet-600">5階と10階はBoss関！タイムプレッシャーを意識！</p>
        </div>
        <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
          {Array.from({ length: 12 }).map((_, idx) => {
            const lv = idx + 1;
            const boss = lv % 5 === 0;
            const active = lv === floor;
            return (
              <div
                key={`floor-${lv}`}
                className={`rounded-2xl border-2 p-2 text-center text-sm font-bold ${
                  active
                    ? 'border-violet-500 bg-violet-300 text-white'
                    : boss
                      ? 'border-rose-300 bg-rose-100 text-rose-600'
                      : 'border-violet-100 bg-white text-violet-600'
                }`}
              >
                {boss ? `BOSS ${lv}` : `${lv}F`}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-6 rounded-3xl bg-white p-4">
        <h3 className="mb-2 text-lg font-bold text-violet-600">{isBoss ? `Boss ${floor}` : `${floor}階`} 問題 {index + 1}/5</h3>
        <p className={`mb-2 text-sm font-semibold ${msg.includes('正解') ? 'text-emerald-600 pop-in' : 'text-slate-600'}`}>{msg}</p>
        <p className="mb-3 text-sm font-bold text-yellow-600">この挑戦スコア: {score}</p>
        {current && (
          <>
            <div className="mb-3 rounded-2xl bg-violet-50 p-4 font-bold text-violet-700">{current.q}</div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {current.choices.map((choice) => (
                <button
                  key={`${current.q}-${choice}`}
                  type="button"
                  onClick={() => answer(choice)}
                  className="rounded-2xl bg-violet-100 py-3 font-bold text-violet-700 hover:scale-[1.02]"
                >
                  {choice}
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="rounded-3xl bg-white p-4">
        <h3 className="mb-2 text-lg font-bold text-pink-500">姉妹ローカルランキング</h3>
        <div className="space-y-2">
          {ranking.map((item, idx) => (
            <div key={item.name} className="flex items-center justify-between rounded-2xl bg-pink-50 px-3 py-2">
              <span className="font-bold text-pink-600">{idx + 1}. {item.name}</span>
              <span className="font-bold text-yellow-600">⭐ {item.stars}</span>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
