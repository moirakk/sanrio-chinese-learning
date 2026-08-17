import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import DifficultyBadge from '../components/DifficultyBadge';
import FlipGameCard from '../components/FlipGameCard';
import { MelodyGuide } from '../assets/characters/characters';
import { finals, initials, tones } from '../data/pinyin';
import { recordGameClear } from '../utils/storage';
import { useProfile } from '../hooks/useProfile';

type MemoryCard = { id: string; value: string; pair: string; opened: boolean; solved: boolean };

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function createMemorySet() {
  const sample = initials.slice(0, 6);
  const cards = shuffle(
    sample.flatMap((item) => [
      { id: `${item.value}-a`, value: item.value, pair: item.kana, opened: false, solved: false },
      { id: `${item.value}-b`, value: item.kana, pair: item.value, opened: false, solved: false },
    ]),
  );
  return cards as MemoryCard[];
}

export default function PinyinPage() {
  const { profile, meta } = useProfile();
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>(() => createMemorySet());
  const [picked, setPicked] = useState<string[]>([]);
  const [memoryScore, setMemoryScore] = useState(0);
  const [memoryMsg, setMemoryMsg] = useState('カードをめくってペアを探そう！');

  const [toneQuestion, setToneQuestion] = useState(() => makeToneQuestion(meta.defaultTimerSec));
  const [toneScore, setToneScore] = useState(0);
  const [toneMsg, setToneMsg] = useState('声調をえらんでね！');

  function makeToneQuestion(sec: number) {
    const answer = tones[Math.floor(Math.random() * tones.length)];
    return { answer, options: shuffle(tones).slice(0, 4), time: sec };
  }

  function onFlip(id: string) {
    const current = memoryCards.find((c) => c.id === id);
    if (!current || current.solved || current.opened || picked.length === 2) return;
    const nextCards = memoryCards.map((c) => (c.id === id ? { ...c, opened: true } : c));
    const nextPicked = [...picked, id];
    setMemoryCards(nextCards);
    setPicked(nextPicked);

    if (nextPicked.length === 2) {
      const [a, b] = nextPicked.map((pid) => nextCards.find((c) => c.id === pid)!);
      if (a.pair === b.value && b.pair === a.value) {
        setMemoryCards((prev) => prev.map((c) => (c.id === a.id || c.id === b.id ? { ...c, solved: true } : c)));
        setMemoryScore((s) => s + 2);
        setMemoryMsg('やった！ペア成功 🎉');
        setPicked([]);
      } else {
        setMemoryMsg('おしい！もう一回チャレンジ');
        window.setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) => (c.id === a.id || c.id === b.id ? { ...c, opened: false } : c)),
          );
          setPicked([]);
        }, 600);
      }
    }
  }

  const solvedAll = useMemo(() => memoryCards.every((c) => c.solved), [memoryCards]);
  if (solvedAll) {
    recordGameClear(profile, 'pinyin-memory', 5);
  }

  function answerTone(value: number) {
    if (value === toneQuestion.answer.value) {
      setToneScore((s) => s + 1);
      setToneMsg('正解！キラキラ⭐');
    } else {
      setToneMsg('ちがうよ。ゆっくり聞いてみよう');
    }
    setToneQuestion(makeToneQuestion(meta.defaultTimerSec));
  }

  return (
    <Layout title="ピンインランド" subtitle="My Melodyと発音をあそんで覚える">
      <section className="mb-6 rounded-3xl bg-pink-50 p-4">
        <div className="mb-3 flex items-center gap-3">
          <MelodyGuide className="h-14 w-14 animate-bob" />
          <p className="font-semibold text-pink-600">妹はやさしいカード中心、姉は難しいカードまで挑戦！</p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {initials.map((item) => (
            <div key={item.value} className="rounded-2xl bg-white p-3 text-center">
              <p className="text-lg font-bold text-pink-500">{item.value}</p>
              <p className="text-sm text-slate-600">{item.kana}</p>
              <DifficultyBadge level={item.difficulty} />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6 rounded-3xl bg-rose-50 p-4">
        <h3 className="mb-3 text-lg font-bold text-rose-500">韻母フラワーガーデン</h3>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-8">
          {finals.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-label={`${item.value}の発音説明`}
              className="rounded-full bg-white px-2 py-3 text-center text-sm font-bold text-rose-500 hover:scale-105"
              onClick={() => setToneMsg(`${item.value}: ${item.tipJa}`)}
            >
              {item.value}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <FlipGameCard
          title="ゲーム1"
          front="ピンイン配対"
          back="カードをめくって、ピンインとカタカナ近似音をそろえよう！"
          completed={solvedAll}
        />
        <FlipGameCard
          title="ゲーム2"
          front="声調チャレンジ"
          back="聞こえた声調を4択で選ぶ。姉ルートは制限時間短め！"
          completed={toneScore >= 5}
        />
      </section>

      <section className="mb-6 rounded-3xl bg-white p-4">
        <h3 className="mb-2 text-lg font-bold text-pink-500">ゲーム1: メモリーマッチ</h3>
        <p className={`mb-2 text-sm font-semibold ${memoryMsg.includes('成功') ? 'text-emerald-600 pop-in' : 'text-slate-600'}`}>
          {memoryMsg}
        </p>
        <p className="mb-3 text-sm font-bold text-yellow-600">スコア: {memoryScore}</p>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {memoryCards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onFlip(card.id)}
              aria-label="配対カード"
              className={`h-16 rounded-2xl border-2 font-bold ${
                card.solved
                  ? 'border-yellow-400 bg-yellow-100 text-yellow-700'
                  : card.opened
                    ? 'border-pink-300 bg-pink-50 text-pink-600'
                    : 'border-slate-200 bg-slate-100 text-slate-400'
              }`}
            >
              {card.opened || card.solved ? card.value : '?'}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-4">
        <h3 className="mb-2 text-lg font-bold text-purple-500">ゲーム2: 声調チャレンジ</h3>
        <p className={`mb-2 text-sm font-semibold ${toneMsg.includes('正解') ? 'text-emerald-600 pop-in' : 'text-slate-600'}`}>
          {toneMsg}
        </p>
        <p className="mb-3 text-sm font-bold text-yellow-600">スコア: {toneScore}</p>
        <div className="mb-4 rounded-2xl bg-purple-50 p-4 text-center">
          <p className="text-sm text-slate-600">「ma」のどの声調？</p>
          <p className="text-2xl font-bold text-purple-600">{toneQuestion.answer.mark}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {toneQuestion.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => answerTone(option.value)}
              aria-label={`${option.name}を選択`}
              className="rounded-2xl bg-purple-100 px-3 py-3 text-sm font-bold text-purple-700 hover:scale-[1.02]"
            >
              {option.name} ({option.ja})
            </button>
          ))}
        </div>
      </section>
    </Layout>
  );
}
