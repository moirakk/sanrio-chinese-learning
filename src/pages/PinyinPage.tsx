import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import DifficultyBadge from '../components/DifficultyBadge';
import { MelodyGuide } from '../assets/characters/characters';
import { finals, initials, tones } from '../data/pinyin';
import { recordGameClear, addStars } from '../utils/storage';
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
  const [memoryCompleted, setMemoryCompleted] = useState(false);

  const [toneQuestion, setToneQuestion] = useState(() => makeToneQuestion(meta.defaultTimerSec));
  const [toneScore, setToneScore] = useState(0);
  const [toneMsg, setToneMsg] = useState('声調をえらんでね！');
  
  const [activeFlower, setActiveFlower] = useState<string | null>(null);

  function makeToneQuestion(sec: number) {
    const answer = tones[Math.floor(Math.random() * tones.length)];
    // Ensure answer is in options
    let opts = shuffle(tones).slice(0, 3);
    if (!opts.find(o => o.value === answer.value)) {
      opts[0] = answer;
    } else {
      opts.push(tones.find(t => t.value !== answer.value && !opts.includes(t))!);
    }
    return { answer, options: shuffle(opts), time: sec };
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
        addStars(profile, 1, 1);
        setPicked([]);
      } else {
        setMemoryMsg('おしい！もう一回チャレンジ');
        window.setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) => (c.id === a.id || c.id === b.id ? { ...c, opened: false } : c)),
          );
          setPicked([]);
        }, 800);
      }
    }
  }

  const solvedAll = useMemo(() => memoryCards.every((c) => c.solved), [memoryCards]);
  if (solvedAll && !memoryCompleted) {
    setMemoryCompleted(true);
    recordGameClear(profile, 'pinyin-memory', 5);
    addStars(profile, 5, 0);
  }

  function answerTone(value: number) {
    if (value === toneQuestion.answer.value) {
      setToneScore((s) => {
        const next = s + 1;
        if (next === 5) {
          recordGameClear(profile, 'pinyin-tone', 5);
          addStars(profile, 5, 2);
        }
        return next;
      });
      setToneMsg('大正解！キラキラ⭐');
      addStars(profile, 1, 1);
    } else {
      setToneMsg('ちがうよ。もう一回聞いてみよう');
    }
    setTimeout(() => {
      setToneQuestion(makeToneQuestion(meta.defaultTimerSec));
    }, 1000);
  }

  const rowColors = [
    'from-pink-50 to-rose-100',
    'from-purple-50 to-fuchsia-100',
    'from-blue-50 to-cyan-100',
    'from-emerald-50 to-teal-100'
  ];

  return (
    <Layout title="ピンインランド" subtitle="My Melodyと発音をあそんで覚える">
      
      {/* Header Guide */}
      <section className="mb-8 rounded-3xl glass-panel p-5 flex flex-col md:flex-row items-center gap-4 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-pink-300 opacity-20 rounded-full blur-2xl"></div>
        <MelodyGuide className="h-24 w-24 flex-shrink-0 animate-bob drop-shadow-md" />
        <div className="chat-bubble left border border-pink-200 shadow-sm relative z-10 w-full md:w-auto">
          <p className="font-black text-pink-600 text-lg mb-1">ピンインをマスターしよう！</p>
          <p className="text-sm font-bold text-slate-600">
            {profile === 'sister9' ? '妹ちゃんは簡単なカードからゆっくりね♪' : 'お姉ちゃんは全種類チャレンジしてみよう！'}
          </p>
        </div>
      </section>

      {/* Initials Wall */}
      <section className="mb-8">
        <h3 className="mb-4 text-xl font-black text-pink-500 text-3d flex items-center gap-2">
          <span>🅰️</span> 声母（子音）カードの壁
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {initials.map((item, i) => (
            <div 
              key={item.value} 
              className={`rounded-2xl p-4 text-center cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 btn-3d bg-gradient-to-b ${rowColors[Math.floor(i / 6) % 4]}`}
            >
              <p className="text-3xl font-black text-slate-700 mb-1">{item.value}</p>
              <p className="text-sm font-bold text-pink-500 bg-white/60 rounded-full px-2 py-0.5 inline-block mb-2 shadow-inner">{item.kana}</p>
              <div className="flex justify-center">
                <DifficultyBadge level={item.difficulty} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Finals Garden */}
      <section className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-rose-100 to-pink-200 border-2 border-rose-300 shadow-inner relative">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] opacity-30"></div>
        <h3 className="mb-4 text-xl font-black text-rose-600 text-3d flex items-center gap-2 relative z-10">
          <span>🌸</span> 韻母（母音）フラワーガーデン
        </h3>
        <p className="mb-4 text-sm font-bold text-rose-500 relative z-10 bg-white/70 inline-block px-3 py-1 rounded-full">
          クリックしてお花を咲かせよう！
        </p>
        <div className="flex flex-wrap gap-3 md:gap-4 relative z-10 justify-center">
          {finals.map((item) => {
            const isActive = activeFlower === item.value;
            return (
              <button
                key={item.value}
                type="button"
                className={`flower-btn w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center font-black transition-all duration-300 ${
                  isActive ? 'bg-rose-500 text-white scale-125 shadow-lg z-20' : 'bg-white text-rose-500 hover:bg-rose-100 hover:scale-110 btn-3d'
                }`}
                onClick={() => {
                  setActiveFlower(item.value);
                  setTimeout(() => setActiveFlower(null), 1500);
                }}
              >
                <span className="text-xl md:text-2xl">{item.value}</span>
                {isActive && <span className="text-[10px] absolute -bottom-4 bg-rose-600 text-white px-2 py-0.5 rounded-full whitespace-nowrap">{item.tipJa}</span>}
              </button>
            )
          })}
        </div>
      </section>

      {/* Game 1: Memory Match */}
      <section className="mb-8 rounded-3xl bg-pink-50 border-4 border-pink-200 p-4 md:p-6 card-shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-black text-pink-600">🎮 ゲーム1: メモリーマッチ</h3>
          <div className="bg-yellow-100 text-yellow-600 px-4 py-1 rounded-full font-black border-2 border-yellow-300">
            スコア: {memoryScore}
          </div>
        </div>
        
        <div className="mb-4 flex justify-center">
          <p className={`inline-block px-4 py-2 rounded-full font-bold text-sm transition-all ${memoryMsg.includes('成功') ? 'bg-emerald-100 text-emerald-600 border border-emerald-300 pop-in sparkle' : 'bg-white text-pink-500 border border-pink-200'}`}>
            {memoryMsg}
          </p>
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {memoryCards.map((card) => {
            const isFlipped = card.opened || card.solved;
            return (
              <div key={card.id} className="relative h-20 md:h-24 [perspective:1000px]">
                <button
                  type="button"
                  onClick={() => onFlip(card.id)}
                  aria-label="配対カード"
                  className={`w-full h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : 'hover:scale-105 btn-3d'}`}
                >
                  {/* Front (Hidden) */}
                  <div className="absolute inset-0 backface-hidden bg-pink-300 rounded-2xl border-4 border-pink-400 flex items-center justify-center overflow-hidden">
                    {/* Melody floral pattern */}
                    <div className="w-full h-full opacity-30 flex flex-wrap gap-1 p-1 items-center justify-center">
                      {[...Array(6)].map((_, i) => <span key={i} className="text-xs">🌸</span>)}
                    </div>
                  </div>
                  {/* Back (Revealed) */}
                  <div className={`absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-2xl border-4 flex items-center justify-center text-xl md:text-2xl font-black ${
                    card.solved ? 'bg-yellow-100 border-yellow-400 text-yellow-600 shadow-[0_0_15px_rgba(250,204,21,0.5)] ring-2 ring-yellow-400 pop-in' : 'bg-white border-pink-300 text-pink-600'
                  }`}>
                    {card.value}
                    {card.solved && <div className="absolute -top-2 -right-2 text-xl sparkle"></div>}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Game 2: Tone Challenge */}
      <section className="mb-8 rounded-3xl bg-purple-50 border-4 border-purple-200 p-4 md:p-6 card-shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-black text-purple-600">🎮 ゲーム2: 声調チャレンジ</h3>
          <div className="bg-yellow-100 text-yellow-600 px-4 py-1 rounded-full font-black border-2 border-yellow-300">
            スコア: {toneScore}/5
          </div>
        </div>
        
        <div className="mb-6 flex flex-col items-center">
          <p className={`mb-3 inline-block px-4 py-2 rounded-full font-bold text-sm transition-all ${toneMsg.includes('正解') ? 'bg-emerald-100 text-emerald-600 border border-emerald-300 pop-in sparkle' : 'bg-white text-purple-500 border border-purple-200'}`}>
            {toneMsg}
          </p>
          <div className="bg-white px-8 py-6 rounded-3xl border-4 border-purple-300 shadow-inner min-w-[200px] text-center">
            <p className="text-sm font-bold text-slate-500 mb-2">この声調はどれ？</p>
            <p className="text-5xl font-black text-purple-600 pulse-glow inline-block p-4 rounded-full">{toneQuestion.answer.mark}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {toneQuestion.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => answerTone(option.value)}
              className="flex flex-col items-center bg-white rounded-3xl border-4 border-purple-200 p-4 hover:border-purple-400 hover:bg-purple-100 btn-3d transition-all group"
            >
              <div className="w-16 h-16 mb-2 text-purple-400 group-hover:text-purple-600 transition-colors">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  {option.value === 1 && <path d="M 20 30 L 80 30" />}
                  {option.value === 2 && <path d="M 20 70 L 80 30" />}
                  {option.value === 3 && <path d="M 20 30 L 50 80 L 80 30" />}
                  {option.value === 4 && <path d="M 20 30 L 80 70" />}
                </svg>
              </div>
              <span className="font-black text-slate-700 text-lg">{option.name}</span>
              <span className="text-xs font-bold text-slate-500">{option.ja}</span>
            </button>
          ))}
        </div>
      </section>

    </Layout>
  );
}
