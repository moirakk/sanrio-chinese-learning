import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { getUnit } from '../data/units';
import { clearUnit, isUnitUnlocked, updateLearned } from '../utils/storage';
import { useProfile } from '../hooks/useProfile';
import type { ConversationItem, KanjiItem, PinyinItem } from '../types';
import { CinnamorollGuide, KittyGuide, KuromiGuide, MelodyGuide, PochaccoGuide, PompompurinGuide } from '../assets/characters/characters';

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function Guide({ keyName }: { keyName: string }) {
  if (keyName === 'kitty') return <KittyGuide className="w-20 h-20 animate-bob" />;
  if (keyName === 'melody') return <MelodyGuide className="w-20 h-20 animate-bob" />;
  if (keyName === 'cinnamoroll') return <CinnamorollGuide className="w-20 h-20 animate-bob" />;
  if (keyName === 'pompompurin') return <PompompurinGuide className="w-20 h-20 animate-bob" />;
  if (keyName === 'kuromi') return <KuromiGuide className="w-20 h-20 animate-bob" />;
  return <PochaccoGuide className="w-20 h-20 animate-bob" />;
}

function PinyinCorner({ pinyin }: { pinyin: PinyinItem[] }) {
  return (
    <section className="rounded-3xl bg-pink-50 border-2 border-pink-200 p-4 md:p-6 card-shadow">
      <h3 className="text-xl font-black text-pink-600 mb-4">拼音コーナー</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pinyin.map((item) => (
          <div key={`${item.value}-${item.kana}`} className="rounded-2xl bg-white border-2 border-pink-200 p-4 text-center btn-3d">
            <p className="text-3xl font-black text-pink-600">{item.value}</p>
            <p className="text-sm font-bold text-slate-500 mt-2">{item.kana}</p>
            <p className="text-xs font-bold text-slate-400 mt-1">{item.tipJa}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function KanjiCorner({ kanji }: { kanji: KanjiItem[] }) {
  return (
    <section className="rounded-3xl bg-blue-50 border-2 border-blue-200 p-4 md:p-6 card-shadow">
      <h3 className="text-xl font-black text-blue-600 mb-4">漢字コーナー</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kanji.map((item) => (
          <div key={`${item.hanzi}-${item.pinyin}`} className="rounded-2xl bg-white border-2 border-blue-200 p-4 text-center btn-3d">
            <p className="text-4xl font-black text-slate-700">{item.hanzi}</p>
            <p className="text-sm font-bold text-blue-600 mt-2">{item.pinyin}</p>
            <p className="text-xs font-bold text-slate-500">{item.ja}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConversationCorner({ conversation }: { conversation: ConversationItem[] }) {
  return (
    <section className="rounded-3xl bg-yellow-50 border-2 border-yellow-200 p-4 md:p-6 card-shadow">
      <h3 className="text-xl font-black text-yellow-700 mb-4">かいわコーナー</h3>
      <div className="space-y-3">
        {conversation.map((item, i) => (
          <div key={item.id} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <div className={`chat-bubble ${i % 2 === 0 ? 'left border border-yellow-200' : 'right border border-pink-200'} max-w-[90%]`}>
              <p className="text-xl font-black text-slate-700">{item.zh}</p>
              <p className="text-xs font-bold text-slate-500 mt-1">{item.ja}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function UnitPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useProfile();
  const unitId = Number(id || '0');
  const unit = getUnit(unitId);

  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [msg, setMsg] = useState('ゲームスタート！');
  const [gameDone, setGameDone] = useState(false);
  const [memorySolved, setMemorySolved] = useState<string[]>([]);
  const [memoryOpen, setMemoryOpen] = useState<string[]>([]);

  const locked = unit ? !isUnitUnlocked(profile, unit.id) : true;

  const fillQuestion = useMemo(() => {
    if (!unit) return null;
    const line = unit.conversation[0];
    if (!line) return null;
    const answer = line.zh;
    const opts = shuffle([answer, '谢谢', '再见', '我不懂']).slice(0, 3);
    if (!opts.includes(answer)) opts[0] = answer;
    return { q: line.ja, answer, options: shuffle(opts) };
  }, [unit?.id]);

  if (!unit) {
    return (
      <Layout title="ユニット不明" subtitle="ユニットが見つかりません">
        <div className="rounded-3xl bg-white p-6 border-2 border-slate-200">無効なユニットIDです。</div>
      </Layout>
    );
  }

  if (locked) {
    return (
      <Layout title={`ユニット ${unit.id}`} subtitle="このユニットはまだロック中です">
        <div className="rounded-3xl bg-slate-100 p-8 border-2 border-slate-300 text-center">
          <p className="text-xl font-black text-slate-500 mb-3">🔒 先に前のユニットをクリアしよう！</p>
          <button onClick={() => navigate('/')} className="rounded-full px-6 py-3 bg-pink-400 text-white font-black btn-3d">ホームへ</button>
        </div>
      </Layout>
    );
  }

  function finishIfReady(targetUnit: NonNullable<typeof unit>, nextScore: number, nextTotal: number) {
    if (nextTotal < 5) return;
    const pass = targetUnit.isTest ? nextScore / nextTotal >= 0.8 : nextScore >= 3;
    if (pass) {
      clearUnit(profile, targetUnit.id, targetUnit.stars * 3, 1);
      updateLearned(profile, targetUnit.kanji.map((x) => x.hanzi), targetUnit.conversation.map((x) => x.zh));
      setMsg('ユニットクリア！次へ進めるよ 🎉');
      setGameDone(true);
    } else {
      setMsg('もう一回チャレンジしよう！（テストは80%以上）');
    }
  }

  function answerSimple(ok: boolean) {
    if (!unit) return;
    const nextTotal = total + 1;
    const nextScore = score + (ok ? 1 : 0);
    setTotal(nextTotal);
    setScore(nextScore);
    setMsg(ok ? '正解！⭐' : 'おしい！');
    finishIfReady(unit, nextScore, nextTotal);
  }

  const memoryPairs = useMemo(() => {
    const source = unit.pinyin.slice(0, 3);
    return shuffle(
      source.flatMap((x) => [
        { key: `${x.value}-a`, text: x.value, pair: x.kana },
        { key: `${x.value}-b`, text: x.kana, pair: x.value },
      ]),
    );
  }, [unit.id]);

  function flipMemory(key: string) {
    if (memorySolved.includes(key) || memoryOpen.includes(key) || memoryOpen.length >= 2 || gameDone) return;
    const opened = [...memoryOpen, key];
    setMemoryOpen(opened);
    if (opened.length === 2) {
      const a = memoryPairs.find((x) => x.key === opened[0]);
      const b = memoryPairs.find((x) => x.key === opened[1]);
      const ok = Boolean(a && b && a.pair === b.text && b.pair === a.text);
      if (ok) {
        setMemorySolved((s) => [...s, opened[0], opened[1]]);
        setTimeout(() => setMemoryOpen([]), 250);
        answerSimple(true);
      } else {
        setTimeout(() => setMemoryOpen([]), 500);
        answerSimple(false);
      }
    }
  }

  return (
    <Layout title={`ユニット ${unit.id}：${unit.titleJa}`} subtitle={`${unit.titleZh} • ${unit.isTest ? 'テスト' : '学習'} • ⭐${unit.stars}`}>
      <div className="space-y-6">
        <section className="rounded-3xl glass-panel border-2 border-pink-200 p-4 md:p-6 flex items-center gap-4">
          <Guide keyName={unit.guide} />
          <div>
            <p className="text-lg font-black text-pink-600">ガイドキャラといっしょに進もう！</p>
            <p className="text-sm font-bold text-slate-600">スコア: {score}/{total} • {msg}</p>
          </div>
        </section>

        <PinyinCorner pinyin={unit.pinyin} />
        <KanjiCorner kanji={unit.kanji} />
        <ConversationCorner conversation={unit.conversation} />

        <section className="rounded-3xl bg-purple-50 border-2 border-purple-200 p-4 md:p-6 card-shadow">
          <h3 className="text-xl font-black text-purple-600 mb-4">ゲームタイム！</h3>

          {unit.gameType === 'memory' && (
            <div className="grid grid-cols-3 gap-3">
              {memoryPairs.map((card) => {
                const open = memoryOpen.includes(card.key) || memorySolved.includes(card.key);
                const solved = memorySolved.includes(card.key);
                return (
                  <button
                    key={card.key}
                    onClick={() => flipMemory(card.key)}
                    className={`h-20 rounded-2xl border-4 font-black text-xl btn-3d ${open ? 'bg-white border-pink-300 text-pink-600' : 'bg-pink-300 border-pink-400 text-transparent'} ${solved ? 'ring-2 ring-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.6)]' : ''}`}
                  >
                    {open ? card.text : '？'}
                  </button>
                );
              })}
            </div>
          )}

          {unit.gameType === 'tone' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((tone) => (
                <button key={tone} onClick={() => answerSimple(tone === 4)} className="rounded-2xl border-4 border-purple-200 bg-white p-4 btn-3d hover:bg-purple-100">
                  <p className="text-xl font-black text-purple-700">{tone}声</p>
                </button>
              ))}
            </div>
          )}

          {unit.gameType === 'puzzle' && (
            <div className="space-y-4">
              <p className="font-bold text-slate-600">「{unit.kanji[0]?.hanzi}」を作る部品を選ぼう</p>
              <div className="grid grid-cols-2 gap-3">
                {shuffle([unit.kanji[0]?.hanzi, unit.kanji[1]?.hanzi, unit.kanji[2]?.hanzi]).map((x) => (
                  <button key={x} onClick={() => answerSimple(x === unit.kanji[0]?.hanzi)} className="rounded-2xl border-4 border-blue-200 bg-white p-4 text-3xl font-black btn-3d hover:bg-blue-50">{x}</button>
                ))}
              </div>
            </div>
          )}

          {unit.gameType === 'hunt' && (
            <div className="space-y-4">
              <p className="text-lg font-black text-purple-700">目標: {unit.kanji[0]?.hanzi}</p>
              <div className="grid grid-cols-3 gap-3">
                {shuffle([unit.kanji[0]?.hanzi, unit.kanji[1]?.hanzi, unit.kanji[2]?.hanzi, unit.kanji[3]?.hanzi, unit.kanji[4]?.hanzi]).map((x, i) => (
                  <button key={`${x}-${i}`} onClick={() => answerSimple(x === unit.kanji[0]?.hanzi)} className="rounded-2xl border-4 border-violet-200 bg-white p-4 text-3xl font-black btn-3d hover:bg-violet-50">{x}</button>
                ))}
              </div>
            </div>
          )}

          {unit.gameType === 'fill' && fillQuestion && (
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-500">次の日本語に合う中国語は？</p>
              <p className="text-xl font-black text-slate-700">「{fillQuestion.q}」</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {fillQuestion.options.map((opt) => (
                  <button key={opt} onClick={() => answerSimple(opt === fillQuestion.answer)} className="rounded-2xl border-4 border-amber-200 bg-white p-4 text-xl font-black text-amber-700 btn-3d hover:bg-amber-50">{opt}</button>
                ))}
              </div>
            </div>
          )}

          {unit.gameType === 'order' && (
            <OrderMini phrase={unit.conversation[0]?.zh || '我 是 日本人'} onCheck={answerSimple} />
          )}
        </section>

        {gameDone && (
          <section className="rounded-3xl bg-yellow-50 border-4 border-yellow-300 p-6 text-center card-shadow confetti">
            <p className="text-2xl font-black text-yellow-600 mb-3">ユニットクリア！</p>
            <p className="font-bold text-slate-600 mb-4">⭐ +{unit.stars * 3} を獲得！ 次のユニットが解放されました。</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => navigate('/')} className="rounded-full px-6 py-3 bg-pink-400 text-white font-black btn-3d">ホームへ</button>
              {unit.id < 15 && (
                <button onClick={() => navigate(`/unit/${unit.id + 1}`)} className="rounded-full px-6 py-3 bg-emerald-400 text-white font-black btn-3d">次のユニット</button>
              )}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}

function OrderMini({ phrase, onCheck }: { phrase: string; onCheck: (ok: boolean) => void }) {
  const answerWords = phrase.split('');
  const source = useMemo(() => shuffle(answerWords), [phrase]);
  const [picked, setPicked] = useState<string[]>([]);
  const done = picked.length === answerWords.length;
  const current = picked.join('');

  return (
    <div className="space-y-4">
      <p className="text-sm font-bold text-slate-500">正しい語順に並べよう（文字タップ）</p>
      <div className="rounded-2xl border-2 border-dashed border-orange-300 bg-white p-3 min-h-[56px] flex flex-wrap gap-2">
        {picked.map((w, i) => <span key={`${w}-${i}`} className="rounded-xl bg-orange-200 px-3 py-1 font-black text-orange-700">{w}</span>)}
      </div>
      <div className="flex flex-wrap gap-2">
        {source.map((w, i) => (
          <button key={`${w}-${i}`} onClick={() => setPicked((p) => (p.length < answerWords.length ? [...p, w] : p))} className="rounded-xl border-2 border-dashed border-orange-300 bg-white px-4 py-2 font-black text-orange-600 btn-3d">{w}</button>
        ))}
      </div>
      <button
        disabled={!done}
        onClick={() => {
          onCheck(current === phrase);
          setPicked([]);
        }}
        className="rounded-full px-6 py-3 bg-emerald-400 text-white font-black btn-3d disabled:opacity-50"
      >
        チェック
      </button>
    </div>
  );
}