import { useMemo, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import DifficultyBadge from '../components/DifficultyBadge';
import { CinnamorollGuide } from '../assets/characters/characters';
import { allKanji, kanjiGroups } from '../data/kanji';
import { recordGameClear, updateLearned, addStars } from '../utils/storage';
import { useProfile } from '../hooks/useProfile';

const puzzleBank = [
  { hanzi: '好', left: '女', right: '子' },
  { hanzi: '妈', left: '女', right: '马' },
  { hanzi: '姐', left: '女', right: '且' },
  { hanzi: '明', left: '日', right: '月' },
  { hanzi: '休', left: '亻', right: '木' },
];

function makeHuntSet(targetPool: any[]) {
  const target = targetPool[Math.floor(Math.random() * targetPool.length)];
  const options = [target.hanzi];
  while (options.length < 9) {
    const candidate = allKanji[Math.floor(Math.random() * allKanji.length)].hanzi;
    if (!options.includes(candidate)) options.push(candidate);
  }
  return { target: target.hanzi, options: options.sort(() => Math.random() - 0.5) };
}

export default function KanjiPage() {
  const { profile, meta } = useProfile();
  
  const displayGroups = useMemo(
    () =>
      (profile === 'sister9'
        ? kanjiGroups.map((g) => ({ ...g, items: g.items.filter((k) => k.strokes <= 8 || k.difficulty === 1) }))
        : kanjiGroups
      ).filter(g => g.items.length > 0),
    [profile],
  );

  const icons: Record<string, string> = {
    numbers: '🔢', colors: '🎨', animals: '🐾', family: '家',
    body: '👋', food: '🍱', daily: '☀️', nature: '🌿', action: '🏃'
  };

  const [selectedGroup, setSelectedGroup] = useState(displayGroups[0]?.key);
  
  useEffect(() => {
    if (!displayGroups.find(g => g.key === selectedGroup)) {
      setSelectedGroup(displayGroups[0]?.key);
    }
  }, [displayGroups, selectedGroup]);
  
  // Game 3
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const puzzle = puzzleBank[puzzleIndex];
  const [puzzleSelect, setPuzzleSelect] = useState<{ left?: string; right?: string }>({});
  const [puzzleScore, setPuzzleScore] = useState(0);
  const [puzzleMsg, setPuzzleMsg] = useState('部首を組み合わせて漢字を作ろう');
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);

  // Game 4
  const validTargets = displayGroups.flatMap(g => g.items);
  const [hunt, setHunt] = useState(() => makeHuntSet(validTargets));
  const [huntTime, setHuntTime] = useState(meta.defaultTimerSec);
  const [huntScore, setHuntScore] = useState(0);
  const [huntMsg, setHuntMsg] = useState('目標の漢字を探してね');
  const [showHint, setShowHint] = useState(true);
  const [huntCompleted, setHuntCompleted] = useState(false);

  const leftParts = Array.from(new Set(puzzleBank.map((p) => p.left)));
  const rightParts = Array.from(new Set(puzzleBank.map((p) => p.right)));

  useEffect(() => {
    setHunt(makeHuntSet(validTargets));
  }, [profile]);

  useEffect(() => {
    setShowHint(true);
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, [hunt.target]);

  function checkPuzzle() {
    if (!puzzleSelect.left || !puzzleSelect.right) return;
    
    if (puzzle.left === puzzleSelect.left && puzzle.right === puzzleSelect.right) {
      const nextScore = puzzleScore + 2;
      setPuzzleScore(nextScore);
      setPuzzleMsg(`大正解！ ${puzzle.hanzi} ができたよ 🎉`);
      addStars(profile, 2, 0);
      updateLearned(profile, [puzzle.hanzi], []);
      
      if (nextScore >= puzzleBank.length * 2 && !puzzleCompleted) {
        setPuzzleCompleted(true);
        recordGameClear(profile, 'kanji-puzzle', 5);
        addStars(profile, 5, 1);
      }
      
      setTimeout(() => {
        setPuzzleIndex((i) => (i + 1) % puzzleBank.length);
        setPuzzleSelect({});
        setPuzzleMsg('次の漢字を作ってみよう！');
      }, 1500);
    } else {
      setPuzzleMsg('おしい！形がちがうみたい。');
      setTimeout(() => setPuzzleSelect({}), 1000);
    }
  }

  function clickHunt(value: string) {
    if (value === hunt.target) {
      const nextScore = huntScore + 1;
      setHuntScore(nextScore);
      setHuntMsg('見つけた！キラキラ⭐');
      addStars(profile, 1, 0);
      updateLearned(profile, [value], []);
      
      if (nextScore >= 5 && !huntCompleted) {
        setHuntCompleted(true);
        recordGameClear(profile, 'kanji-hunt', 5);
        addStars(profile, 5, 2);
      }
      
      setTimeout(() => {
        setHunt(makeHuntSet(validTargets));
        setHuntTime(meta.defaultTimerSec);
        setHuntMsg('次の漢字を探してね');
      }, 1000);
    } else {
      setHuntMsg('ちがうよ。似てる字に注意！');
      setHuntTime((t) => Math.max(5, t - 2));
    }
  }

  return (
    <Layout title="漢字アドベンチャー" subtitle="Cinnamorollと漢字の世界へ">
      
      <section className="mb-8 rounded-3xl glass-panel p-5 flex flex-col md:flex-row items-center gap-4 relative overflow-hidden border-2 border-blue-200">
        <div className="absolute -left-4 -top-4 w-32 h-32 bg-blue-300 opacity-20 rounded-full blur-2xl"></div>
        <CinnamorollGuide className="h-24 w-24 flex-shrink-0 animate-bob drop-shadow-md" />
        <div className="chat-bubble left border border-blue-200 shadow-sm relative z-10 w-full md:w-auto">
          <p className="font-black text-blue-600 text-lg mb-1">漢字の形をよく見てみよう！</p>
          <p className="text-sm font-bold text-slate-600">
            {profile === 'sister9' ? '妹ちゃんは画数が少ない漢字から練習するよ♪' : 'お姉ちゃんはちょっと難しい漢字にも挑戦！'}
          </p>
        </div>
      </section>

      {/* Kanji Gallery */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {displayGroups.map((group) => (
            <button
              key={group.key}
              type="button"
              onClick={() => setSelectedGroup(group.key)}
              className={`rounded-full px-4 py-2 text-sm font-black transition-all btn-3d flex items-center gap-2 ${
                selectedGroup === group.key ? 'bg-blue-500 text-white scale-110 shadow-lg' : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              <span className="text-lg">{icons[group.key] || '⭐'}</span>
              {group.titleJa}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayGroups
            .find((g) => g.key === selectedGroup)
            ?.items.map((item) => (
              <div key={`${selectedGroup}-${item.hanzi}`} className="relative bg-[#faf7f2] border-4 border-[#5c4a3d] rounded-xl p-4 flex flex-col items-center justify-center card-shadow group hover:-translate-y-2 transition-transform">
                {/* Rice paper texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIi8+PC9zdmc+')] pointer-events-none"></div>
                <p className="text-4xl md:text-5xl font-black text-[#2b221a] mb-2 font-serif tracking-widest group-hover:scale-110 transition-transform origin-center">{item.hanzi}</p>
                <div className="w-full h-px bg-[#5c4a3d] opacity-20 mb-2"></div>
                <p className="text-sm font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full mb-1">{item.pinyin}</p>
                <p className="text-xs font-black text-slate-600">{item.ja} / {item.strokes}画</p>
                <div className="absolute top-2 right-2">
                  <DifficultyBadge level={item.difficulty} />
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Game 3: Puzzle */}
      <section className="mb-8 rounded-3xl bg-blue-50 border-4 border-blue-200 p-4 md:p-6 card-shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-black text-blue-600">🎮 ゲーム3: 漢字パズル</h3>
          <div className="bg-yellow-100 text-yellow-600 px-4 py-1 rounded-full font-black border-2 border-yellow-300">
            スコア: {puzzleScore}
          </div>
        </div>
        
        <p className={`mb-4 inline-block px-4 py-2 rounded-full font-bold text-sm transition-all ${puzzleMsg.includes('正解') ? 'bg-emerald-100 text-emerald-600 border border-emerald-300 pop-in sparkle' : 'bg-white text-blue-500 border border-blue-200'}`}>
          {puzzleMsg}
        </p>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          
          <div className="bg-white p-6 rounded-3xl border-4 border-blue-300 shadow-inner w-full md:w-1/3 text-center relative">
            <p className="text-sm font-bold text-slate-500 mb-2">完成目標</p>
            <p className="text-6xl font-black text-[#5c4a3d] font-serif">{puzzle.hanzi}</p>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-4">
            {/* Assembly Area */}
            <div className="flex justify-center items-center gap-1 mb-2 h-24">
              <div className={`w-20 h-24 flex items-center justify-center text-4xl font-serif rounded-l-2xl border-4 border-r-0 transition-all ${puzzleSelect.left ? 'bg-blue-400 text-white border-blue-500' : 'bg-white border-dashed border-blue-300 text-slate-300'}`}>
                {puzzleSelect.left || '?'}
              </div>
              <div className={`w-20 h-24 flex items-center justify-center text-4xl font-serif rounded-r-2xl border-4 transition-all ${puzzleSelect.right ? 'bg-blue-500 text-white border-blue-600' : 'bg-white border-dashed border-blue-300 text-slate-300'}`}>
                {puzzleSelect.right || '?'}
              </div>
              <button 
                onClick={checkPuzzle}
                disabled={!puzzleSelect.left || !puzzleSelect.right}
                className="ml-4 w-16 h-16 rounded-full bg-yellow-400 text-white font-black text-xl btn-3d disabled:opacity-50 flex items-center justify-center"
              >
                できた
              </button>
            </div>

            {/* Parts Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-2xl border-2 border-blue-100">
                <p className="text-xs font-bold text-blue-500 mb-2 text-center">左パーツ</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {leftParts.map(p => (
                    <button key={p} onClick={() => setPuzzleSelect(v => ({ ...v, left: p }))} className={`w-12 h-12 rounded-lg text-blue-700 font-black text-xl hover:bg-blue-200 btn-3d ${puzzleSelect.left === p ? 'ring-2 ring-sky-400 bg-sky-50' : 'bg-blue-50'}`}>{p}</button>
                  ))}
                </div>
              </div>
              <div className="bg-white p-3 rounded-2xl border-2 border-blue-100">
                <p className="text-xs font-bold text-blue-500 mb-2 text-center">右パーツ</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {rightParts.map(p => (
                    <button key={p} onClick={() => setPuzzleSelect(v => ({ ...v, right: p }))} className={`w-12 h-12 rounded-lg text-blue-800 font-black text-xl hover:bg-blue-300 btn-3d ${puzzleSelect.right === p ? 'ring-2 ring-sky-400 bg-sky-50' : 'bg-blue-100'}`}>{p}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game 4: Hide and Seek */}
      <section className="mb-8 rounded-3xl bg-violet-50 border-4 border-violet-200 p-4 md:p-6 card-shadow relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-black text-violet-600">🎮 ゲーム4: 漢字かくれんぼ</h3>
          <div className="bg-yellow-100 text-yellow-600 px-4 py-1 rounded-full font-black border-2 border-yellow-300">
            スコア: {huntScore}/5
          </div>
        </div>
        
        <p className={`mb-4 inline-block px-4 py-2 rounded-full font-bold text-sm transition-all ${huntMsg.includes('見つけ') ? 'bg-emerald-100 text-emerald-600 border border-emerald-300 pop-in sparkle' : 'bg-white text-violet-500 border border-violet-200'}`}>
          {huntMsg}
        </p>
        
        <div className="mb-6 flex flex-col items-center justify-center relative">
          <p className="text-sm font-bold text-slate-500 mb-2">この漢字を探して！</p>
          <div className="relative">
            <p className="text-6xl font-black text-violet-600 font-serif drop-shadow-md">{hunt.target}</p>
            {showHint && (
              <div className="absolute inset-0 bg-yellow-300/30 rounded-full animate-ping pointer-events-none"></div>
            )}
          </div>
          <div className="mt-4 bg-slate-800 text-white px-4 py-1 rounded-full font-mono text-sm font-bold">
            TIME: {huntTime}s
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-md mx-auto">
          {hunt.options.map((item, i) => (
            <button 
              key={`${hunt.target}-${item}-${i}`} 
              onClick={() => clickHunt(item)} 
              className="bg-white rounded-2xl border-b-4 border-violet-300 text-3xl font-black font-serif text-slate-700 h-16 md:h-20 hover:bg-violet-100 hover:-translate-y-1 active:translate-y-1 active:border-b-0 transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

    </Layout>
  );
}
