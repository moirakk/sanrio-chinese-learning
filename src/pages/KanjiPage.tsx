import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import DifficultyBadge from '../components/DifficultyBadge';
import FlipGameCard from '../components/FlipGameCard';
import { CinnamorollGuide } from '../assets/characters/characters';
import { allKanji, kanjiGroups } from '../data/kanji';
import { recordGameClear, updateLearned } from '../utils/storage';
import { useProfile } from '../hooks/useProfile';

const puzzleBank = [
  { hanzi: '好', left: '女', right: '子' },
  { hanzi: '妈', left: '女', right: '马' },
  { hanzi: '姐', left: '女', right: '且' },
  { hanzi: '喝', left: '口', right: '曷' },
];

function makeHuntSet() {
  const target = allKanji[Math.floor(Math.random() * allKanji.length)];
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
      profile === 'sister9'
        ? kanjiGroups.map((g) => ({ ...g, items: g.items.filter((k) => k.strokes <= 8 || k.difficulty === 1) }))
        : kanjiGroups,
    [profile],
  );

  const [selectedGroup, setSelectedGroup] = useState(displayGroups[0].key);
  const [puzzle, setPuzzle] = useState(puzzleBank[0]);
  const [puzzleSelect, setPuzzleSelect] = useState<{ left?: string; right?: string }>({});
  const [puzzleScore, setPuzzleScore] = useState(0);
  const [puzzleMsg, setPuzzleMsg] = useState('部首をえらんで漢字を作ろう');

  const [hunt, setHunt] = useState(makeHuntSet());
  const [huntTime, setHuntTime] = useState(meta.defaultTimerSec);
  const [huntScore, setHuntScore] = useState(0);
  const [huntMsg, setHuntMsg] = useState('目標の漢字を探してね');

  const leftParts = Array.from(new Set(puzzleBank.map((p) => p.left)));
  const rightParts = Array.from(new Set(puzzleBank.map((p) => p.right)));

  function checkPuzzle() {
    const match = puzzleBank.find((p) => p.left === puzzleSelect.left && p.right === puzzleSelect.right);
    if (match) {
      setPuzzleScore((s) => s + 2);
      setPuzzleMsg(`正解！ ${match.hanzi} ができたよ 🎉`);
      setPuzzle(puzzleBank[(puzzleBank.indexOf(match) + 1) % puzzleBank.length]);
      setPuzzleSelect({});
      updateLearned(profile, [match.hanzi], []);
    } else {
      setPuzzleMsg('おしい！部首の位置を見直そう');
    }
  }

  function clickHunt(value: string) {
    if (value === hunt.target) {
      setHuntScore((s) => s + 1);
      setHuntMsg('正解！キラキラボーナス');
      setHunt(makeHuntSet());
      setHuntTime(meta.defaultTimerSec);
      updateLearned(profile, [value], []);
    } else {
      setHuntMsg('ちがうよ。似てる字に注意！');
      setHuntTime((t) => Math.max(5, t - 2));
    }
  }

  if (puzzleScore >= 6) recordGameClear(profile, 'kanji-puzzle', 6);
  if (huntScore >= 5) recordGameClear(profile, 'kanji-hunt', 6);

  return (
    <Layout title="漢字アドベンチャー" subtitle="Cinnamorollと漢字の世界へ">
      <section className="mb-6 rounded-3xl bg-sky-50 p-4">
        <div className="mb-3 flex items-center gap-3">
          <CinnamorollGuide className="h-14 w-14 animate-bob" />
          <p className="font-semibold text-sky-600">筆画が少ない字から、だんだんレベルアップ！</p>
        </div>
        <div className="mb-3 flex flex-wrap gap-2">
          {displayGroups.map((group) => (
            <button
              key={group.key}
              type="button"
              onClick={() => setSelectedGroup(group.key)}
              aria-label={`${group.titleJa}グループを見る`}
              className={`rounded-full px-3 py-2 text-sm font-bold ${
                selectedGroup === group.key ? 'bg-sky-400 text-white' : 'bg-white text-sky-700'
              }`}
            >
              {group.titleJa}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {displayGroups
            .find((g) => g.key === selectedGroup)
            ?.items.map((item) => (
              <div key={`${selectedGroup}-${item.hanzi}`} className="rounded-2xl bg-white p-3 text-center">
                <p className="text-2xl font-bold text-sky-600">{item.hanzi}</p>
                <p className="text-xs text-slate-600">{item.pinyin}</p>
                <p className="text-xs text-slate-500">{item.ja} / {item.strokes}画</p>
                <DifficultyBadge level={item.difficulty} />
              </div>
            ))}
        </div>
      </section>

      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <FlipGameCard title="ゲーム3" front="漢字パズル" back="部首を組み合わせて正しい漢字を作る" completed={puzzleScore >= 6} />
        <FlipGameCard title="ゲーム4" front="漢字かくれんぼ" back="似ている字の中から目標を見つける" completed={huntScore >= 5} />
      </section>

      <section className="mb-6 rounded-3xl bg-white p-4">
        <h3 className="mb-2 text-lg font-bold text-sky-500">ゲーム3: 漢字パズル</h3>
        <p className={`mb-2 text-sm font-semibold ${puzzleMsg.includes('正解') ? 'text-emerald-600 pop-in' : 'text-slate-600'}`}>{puzzleMsg}</p>
        <p className="mb-2 text-sm font-bold text-yellow-600">スコア: {puzzleScore}</p>
        <p className="mb-3 text-sm">お題: <span className="font-bold text-sky-700">{puzzle.hanzi}</span></p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-sky-50 p-3">
            <p className="mb-2 text-sm font-bold text-sky-700">左パーツ</p>
            <div className="flex flex-wrap gap-2">
              {leftParts.map((part) => (
                <button key={part} type="button" onClick={() => setPuzzleSelect((v) => ({ ...v, left: part }))} className="rounded-xl bg-white px-3 py-2 text-lg font-bold">
                  {part}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-sky-50 p-3">
            <p className="mb-2 text-sm font-bold text-sky-700">右パーツ</p>
            <div className="flex flex-wrap gap-2">
              {rightParts.map((part) => (
                <button key={part} type="button" onClick={() => setPuzzleSelect((v) => ({ ...v, right: part }))} className="rounded-xl bg-white px-3 py-2 text-lg font-bold">
                  {part}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button type="button" onClick={checkPuzzle} className="mt-3 rounded-2xl bg-sky-400 px-4 py-2 font-bold text-white">
          できた！
        </button>
      </section>

      <section className="rounded-3xl bg-white p-4">
        <h3 className="mb-2 text-lg font-bold text-violet-500">ゲーム4: 漢字かくれんぼ</h3>
        <p className={`mb-2 text-sm font-semibold ${huntMsg.includes('正解') ? 'text-emerald-600 pop-in' : 'text-slate-600'}`}>{huntMsg}</p>
        <p className="mb-2 text-sm font-bold text-yellow-600">スコア: {huntScore} / タイマー: {huntTime}s</p>
        <p className="mb-3 text-sm">探す漢字: <span className="text-xl font-bold text-violet-600">{hunt.target}</span></p>
        <div className="grid grid-cols-3 gap-2">
          {hunt.options.map((item) => (
            <button key={`${hunt.target}-${item}`} type="button" onClick={() => clickHunt(item)} className="rounded-2xl bg-violet-100 py-3 text-xl font-bold text-violet-700 hover:scale-[1.02]">
              {item}
            </button>
          ))}
        </div>
      </section>
    </Layout>
  );
}
