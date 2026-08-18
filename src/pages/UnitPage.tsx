import { useEffect, useMemo, useRef, useState } from 'react';

const PINYIN_CHAR_MAP: Record<string, string> = {
  // 韵母（元音）
  a: '啊', o: '喔', e: '鹅', i: '衣', u: '乌', ü: '鱼',
  // 声母（辅音）
  b: '玻', p: '坡', m: '摸', f: '佛', d: '得', t: '特',
  n: '讷', l: '勒', g: '哥', k: '科', h: '喝', j: '基',
  q: '七', x: '希', zh: '知', ch: '吃', sh: '诗', r: '日',
  z: '资', c: '次', s: '思', y: '衣', w: '乌',
  // 复韵母
  ai: '爱', ei: '欸', ao: '奥', ou: '欧', an: '安', en: '恩',
  ang: '昂', eng: '鞥', ong: '翁', er: '耳', ia: '呀', ie: '耶',
  iu: '优', ian: '烟', in: '因', iang: '央', ing: '英', iong: '用',
  ua: '蛙', uo: '窝', ui: '威', uan: '弯', un: '温', uang: '汪',
  üe: '约', üan: '冤', ün: '晕',
};
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import SpeakButton from '../components/SpeakButton';
import { getUnit, units } from '../data/units';
import { clearUnit, isUnitUnlocked, updateLearned } from '../utils/storage';
import { speak } from '../utils/speech';
import { useProfile } from '../hooks/useProfile';
import type { ConversationItem, KanjiItem, PinyinItem, Question, QuestionKind } from '../types';
import {
  CinnamorollGuide,
  KittyGuide,
  KuromiGuide,
  MelodyGuide,
  PochaccoGuide,
  PompompurinGuide,
} from '../assets/characters/characters';

type MemoryCard = { key: string; text: string; pair: string };

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function takeRandom<T>(items: T[], n: number): T[] {
  return shuffle(items).slice(0, Math.min(items.length, n));
}

function normalizePinyin(py: string): string {
  return py.replace(/[1-5]/g, '');
}

function toneOf(py: string): '1' | '2' | '3' | '4' {
  const m = py.match(/[1-5]/);
  if (!m) return '1';
  if (m[0] === '1') return '1';
  if (m[0] === '2') return '2';
  if (m[0] === '3') return '3';
  return '4';
}

/** Extract Chinese text from a game question to auto-read aloud */
function getAutoReadText(q: Question): string {
  switch (q.kind) {
    case 'fill': {
      // prompt: "Speaker: 你好 （___）\n(日本語)" — take first line, strip speaker label and blank
      const firstLine = q.prompt.split('\n')[0];
      const withoutSpeaker = firstLine.replace(/^[^:：]+[:：]\s*/, '');
      return withoutSpeaker.replace(/（___）/g, '').trim();
    }
    case 'tone': {
      // prompt: "我（wo）は何声？" — extract hanzi before （
      const m = q.prompt.match(/^([\u4e00-\u9fff]+)/);
      return m ? m[1] : '';
    }
    case 'puzzle': {
      // prompt: "「我」の意味は？" — extract content inside 「」
      const m = q.prompt.match(/「([\u4e00-\u9fff]+)」/);
      return m ? m[1] : '';
    }
    case 'order':
      // answer is the Chinese sentence to construct
      return q.answer;
    case 'match': {
      // prompt: "我 の意味は？" or "a の読みは？" — read hanzi if present
      const m = q.prompt.match(/^([\u4e00-\u9fff]+)/);
      return m ? m[1] : '';
    }
    case 'hunt':
    default:
      return '';
  }
}

function guideByKey(keyName: string) {
  if (keyName === 'kitty') return <KittyGuide className="w-20 h-20 animate-bob" />;
  if (keyName === 'melody') return <MelodyGuide className="w-20 h-20 animate-bob" />;
  if (keyName === 'cinnamoroll') return <CinnamorollGuide className="w-20 h-20 animate-bob" />;
  if (keyName === 'pompompurin') return <PompompurinGuide className="w-20 h-20 animate-bob" />;
  if (keyName === 'kuromi') return <KuromiGuide className="w-20 h-20 animate-bob" />;
  return <PochaccoGuide className="w-20 h-20 animate-bob" />;
}

function buildScope(unitId: number) {
  if (unitId === 5) return units.filter((u) => u.id >= 1 && u.id <= 4);
  if (unitId === 10) return units.filter((u) => u.id >= 6 && u.id <= 9);
  if (unitId === 15) return units.filter((u) => u.id >= 1 && u.id <= 14);
  const one = units.find((u) => u.id === unitId);
  return one ? [one] : [];
}

function buildToneQuestions(kanji: KanjiItem[], total: number): Question[] {
  const source = kanji.length > 0 ? kanji : [{ hanzi: '我', pinyin: 'wo3', ja: 'わたし', strokes: 7, difficulty: 1 }];
  const out: Question[] = [];
  for (let i = 0; i < total; i += 1) {
    const k = source[i % source.length];
    const ans = toneOf(k.pinyin);
    out.push({
      kind: 'tone',
      prompt: `${k.hanzi}（${normalizePinyin(k.pinyin)}）は何声？`,
      options: ['1', '2', '3', '4'],
      answer: ans,
    });
  }
  return shuffle(out);
}

function buildPuzzleQuestions(kanji: KanjiItem[], total: number): Question[] {
  const out: Question[] = [];
  if (!kanji.length) return out;
  const fillers = kanji.map((k) => k.ja);
  for (let i = 0; i < total; i++) {
    const t = kanji[i % kanji.length];
    
    // Attempt to match with similarKanji meaning if possible, else random
    // But similarKanji are hanzi strings. We just provide 4 options of ja meanings.
    let wrong = kanji.filter((k) => k.hanzi !== t.hanzi).map((k) => k.ja);
    wrong = wrong.slice(0, 3);
    while (wrong.length < 3) wrong.push(fillers[Math.floor(Math.random() * fillers.length)] || 'ダミー');
    
    out.push({ kind: 'puzzle', prompt: `「${t.hanzi}」の意味は？`, options: shuffle([t.ja, ...wrong]), answer: t.ja });
  }
  return out;
}

function buildHuntQuestions(kanji: KanjiItem[], total: number): Question[] {
  const fillers = units.flatMap((u) => u.kanji);
  const source = kanji.length > 0 ? kanji : fillers.slice(0, 5);
  const out: Question[] = [];
  for (let i = 0; i < total; i += 1) {
    const t = source[i % source.length];
    const wrong = takeRandom(
      [...source.filter((x) => x.hanzi !== t.hanzi), ...fillers.filter((x) => x.hanzi !== t.hanzi)],
      11,
    ).map((x) => x.hanzi);
    out.push({
      kind: 'hunt',
      prompt: `${t.ja} / ${normalizePinyin(t.pinyin)} を探して！`,
      options: shuffle([t.hanzi, ...wrong]).slice(0, 12),
      answer: t.hanzi,
    });
  }
  return out;
}

function buildFillQuestions(conversation: ConversationItem[], total: number): Question[] {
  const out: Question[] = [];
  if (!conversation.length) return out;
  
  for (let i = 0; i < total; i++) {
    const line = conversation[i % conversation.length];
    
    const parts = line.zh.split(' ');
    if (parts.length < 2) {
      out.push({ kind: 'fill', prompt: line.ja, options: shuffle([line.zh, '你好', '谢谢', '对不起']), answer: line.zh });
      continue;
    }
    
    const hideIndex = Math.floor(Math.random() * parts.length);
    const hiddenWord = parts[hideIndex];
    const promptText = parts.map((p, idx) => idx === hideIndex ? '（___）' : p).join(' ');
    const displayPrompt = `${line.speaker ? line.speaker + ': ' : ''}${promptText}
(${line.ja})`;

    const allWords = conversation.flatMap(c => c.zh.split(' '));
    let wrong = allWords.filter(w => w !== hiddenWord);
    wrong = shuffle(Array.from(new Set(wrong))).slice(0, 3);
    while (wrong.length < 3) wrong.push('的');

    out.push({ kind: 'fill', prompt: displayPrompt, options: shuffle([hiddenWord, ...wrong]), answer: hiddenWord });
  }
  return out;
}

function buildOrderQuestions(conversation: ConversationItem[], total: number): Question[] {
  const source = conversation.length > 0 ? conversation : [{ id: 'f', scene: '', zh: '我 是 学生。', ja: '私は学生です。', difficulty: 1, keywords: [] }];
  const out: Question[] = [];
  for (let i = 0; i < total; i += 1) {
    const line = source[i % source.length];
    out.push({
      kind: 'order',
      prompt: line.ja,
      options: shuffle(line.zh.split(' ').filter(Boolean)),
      answer: line.zh,
    });
  }
  return out;
}

function buildMatchQuestions(pinyin: PinyinItem[], kanji: KanjiItem[], total: number): Question[] {
  const out: Question[] = [];
  const py = pinyin.length > 0 ? pinyin : [{ value: 'a', kana: 'ア', tipJa: '', difficulty: 1 }];
  const kz = kanji.length > 0 ? kanji : [{ hanzi: '我', pinyin: 'wo3', ja: 'わたし', strokes: 7, difficulty: 1 }];
  for (let i = 0; i < total; i += 1) {
    if (i % 2 === 0) {
      const t = py[i % py.length];
      const wrong = takeRandom(py.filter((x) => x.value !== t.value), 3).map((x) => x.kana);
      out.push({ kind: 'match', prompt: `${t.value} の読みは？`, options: shuffle([t.kana, ...wrong]), answer: t.kana });
    } else {
      const t = kz[i % kz.length];
      const wrong = takeRandom(kz.filter((x) => x.hanzi !== t.hanzi), 3).map((x) => x.ja);
      out.push({ kind: 'match', prompt: `${t.hanzi} の意味は？`, options: shuffle([t.ja, ...wrong]), answer: t.ja });
    }
  }
  return shuffle(out);
}

function buildMemoryRound(pinyin: PinyinItem[], kanji: KanjiItem[]): MemoryCard[] {
  const pyPairs = pinyin.map((x, i) => [
    { key: `p-${i}-a`, text: x.value, pair: x.kana },
    { key: `p-${i}-b`, text: x.kana, pair: x.value },
  ]);
  const kzPairs = kanji.map((x, i) => [
    { key: `k-${i}-a`, text: x.hanzi, pair: x.ja },
    { key: `k-${i}-b`, text: x.ja, pair: x.hanzi },
  ]);
  const allPairs = [...pyPairs, ...kzPairs];
  const pairCount = Math.max(4, Math.min(6, allPairs.length)); // 8-12 cards
  return shuffle(takeRandom(allPairs, pairCount).flat());
}

export default function UnitPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useProfile();
  const unitId = Number(id || '0');
  const unit = getUnit(unitId);
  const gameRef = useRef<HTMLDivElement | null>(null);

  const [phase, setPhase] = useState<'learn' | 'game' | 'result'>('learn');
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState('準備OK！');
  const [lockedClick, setLockedClick] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pickWords, setPickWords] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [resultPass, setResultPass] = useState(false);

  const [memoryDeck, setMemoryDeck] = useState<MemoryCard[]>([]);
  const [memoryOpen, setMemoryOpen] = useState<string[]>([]);
  const [memorySolved, setMemorySolved] = useState<string[]>([]);
  const [memoryMistakes, setMemoryMistakes] = useState(0);

  const locked = unit ? !isUnitUnlocked(profile, unit.id) : true;
  const scope = useMemo(() => (unit ? buildScope(unit.id) : []), [unit?.id]);
  const pinyin = scope.flatMap((u) => u.pinyin);
  const kanji = scope.flatMap((u) => u.kanji);
  const conversation = scope.flatMap((u) => u.conversation);
  const totalQuestions = unit?.id === 15 ? 15 : (unit?.isTest ? 10 : 5);
  const passRate = unit?.isTest ? 0.8 : 0.6;

  const baseGameKind = unit?.gameType === 'memory' ? 'memory' : unit?.gameType || 'fill';
  const mixedQuestions = useMemo(() => {
    if (!unit?.isTest) return [];
    const pattern: QuestionKind[] = ['match', 'tone', 'puzzle', 'fill', 'order', 'hunt'];
    const tone = buildToneQuestions(kanji, totalQuestions);
    const puzzle = buildPuzzleQuestions(kanji, totalQuestions);
    const hunt = buildHuntQuestions(kanji, totalQuestions);
    const fill = buildFillQuestions(conversation, totalQuestions);
    const order = buildOrderQuestions(conversation, totalQuestions);
    const match = buildMatchQuestions(pinyin, kanji, totalQuestions);
    const out: Question[] = [];
    for (let i = 0; i < totalQuestions; i += 1) {
      const k = pattern[i % pattern.length];
      if (k === 'tone') out.push(tone[i % tone.length]);
      if (k === 'puzzle') out.push(puzzle[i % puzzle.length]);
      if (k === 'hunt') out.push(hunt[i % hunt.length]);
      if (k === 'fill') out.push(fill[i % fill.length]);
      if (k === 'order') out.push(order[i % order.length]);
      if (k === 'match') out.push(match[i % match.length]);
    }
    return shuffle(out);
  }, [unit?.id, pinyin.length, kanji.length, conversation.length]);

  const normalQuestions = useMemo(() => {
    if (!unit || unit.isTest || baseGameKind === 'memory') return [];
    if (baseGameKind === 'tone') return buildToneQuestions(kanji, totalQuestions);
    if (baseGameKind === 'puzzle') return buildPuzzleQuestions(kanji, totalQuestions);
    if (baseGameKind === 'hunt') return buildHuntQuestions(kanji, totalQuestions);
    if (baseGameKind === 'fill') return buildFillQuestions(conversation, totalQuestions);
    return buildOrderQuestions(conversation, totalQuestions);
  }, [unit?.id, baseGameKind, pinyin.length, kanji.length, conversation.length]);

  const current = unit?.isTest ? mixedQuestions[index] : normalQuestions[index];

  function resetGame() {
    setPhase('game');
    setIndex(0);
    setScore(0);
    setMsg('ゲームスタート！');
    setLockedClick(false);
    setSelectedId(null);
    setPickWords([]);
    setTimeLeft(10);
    setResultPass(false);
    setMemoryDeck(buildMemoryRound(pinyin, kanji));
    setMemoryOpen([]);
    setMemorySolved([]);
    setMemoryMistakes(0);
  }

  function finish(finalScore: number) {
    const pass = finalScore / totalQuestions >= passRate;
    setResultPass(pass);
    setPhase('result');
    if (pass && unit) {
      clearUnit(profile, unit.id, unit.stars * 3, 1);
      updateLearned(profile, kanji.map((x) => x.hanzi), conversation.map((x) => x.zh));
    }
  }

  function nextAfterFeedback(ok: boolean, answerText: string, selected?: string) {
    if (lockedClick) return;
    setLockedClick(true);
    setSelectedId(selected ?? null);
    const nextScore = score + (ok ? 1 : 0);
    setScore(nextScore);
    setMsg(ok ? '正解！' : `おしい！ 正解: ${answerText}`);
    setTimeout(() => {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setSelectedId(null);
      setLockedClick(false);
      setPickWords([]);
      setTimeLeft(10);
      if (baseGameKind === 'memory' && !unit?.isTest) {
        setMemoryDeck(buildMemoryRound(pinyin, kanji));
        setMemoryOpen([]);
        setMemorySolved([]);
        setMemoryMistakes(0);
      }
      if (nextIndex >= totalQuestions) {
        finish(nextScore);
      }
    }, 1500);
  }

  useEffect(() => {
    if (phase !== 'game' || lockedClick) return;
    const isHunt = (unit?.isTest && current?.kind === 'hunt') || (!unit?.isTest && baseGameKind === 'hunt');
    if (!isHunt) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          nextAfterFeedback(false, current?.answer || '');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, lockedClick, index, unit?.isTest, current?.kind]);

  useEffect(() => {
    if (phase === 'game' && baseGameKind === 'memory' && memoryDeck.length === 0) {
      setMemoryDeck(buildMemoryRound(pinyin, kanji));
    }
  }, [phase, baseGameKind, memoryDeck.length, pinyin.length, kanji.length]);

  // Auto-read Chinese content when a new game question appears
  useEffect(() => {
    if (phase !== 'game' || !current) return;
    const text = getAutoReadText(current);
    if (text) {
      speak(text, 'zh-CN');
    }
  }, [phase, index]);

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
          <p className="text-xl font-black text-slate-500 mb-3">先に前のユニットをクリアしよう！</p>
          <button onClick={() => navigate('/')} className="rounded-full px-6 py-3 bg-pink-400 text-white font-black btn-3d">ホームへ</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`ユニット ${unit.id}：${unit.titleJa}`} subtitle={`${unit.titleZh} • ${unit.isTest ? 'テスト' : '学習'} • ⭐${unit.stars}`}>
      <div className="space-y-6">
        <section className="rounded-3xl glass-panel border-2 border-pink-200 p-4 md:p-6 flex items-center gap-4">
          {guideByKey(unit.guide)}
          <div>
            <p className="text-lg font-black text-pink-600">ガイドキャラといっしょに進もう！</p>
            <p className="text-sm font-bold text-slate-600">
              {phase === 'game' ? `問題 ${Math.min(index + 1, totalQuestions)}/${totalQuestions} • 正解 ${score}` : msg}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <section className="rounded-3xl bg-pink-50 border-2 border-pink-200 p-4 md:p-6 card-shadow">
            <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 border-2 border-pink-200">{guideByKey(unit.guide)}</div><div className="bg-white px-4 py-2 rounded-2xl border-2 border-pink-200 font-bold text-sm relative after:absolute after:right-full after:top-1/2 after:-translate-y-1/2 after:border-8 after:border-transparent after:border-r-pink-200">一緒に発音してみよう！</div></div><h3 className="text-xl font-black text-pink-600 mb-4">拼音コーナー</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pinyin.map((item) => (
                <div key={`${item.value}-${item.kana}`} className="rounded-2xl bg-white border-2 border-pink-200 p-4 text-center btn-3d">
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-3xl font-black text-pink-600">{item.value}</p>
                    <SpeakButton text={PINYIN_CHAR_MAP[item.value] ?? item.value} lang="zh-CN" />
                  </div>
                  <p className="text-sm font-bold text-slate-500 mt-2">{item.kana}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-3xl bg-blue-50 border-2 border-blue-200 p-4 md:p-6 card-shadow">
            <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 border-2 border-blue-200">{guideByKey(unit.guide)}</div><div className="bg-white px-4 py-2 rounded-2xl border-2 border-blue-200 font-bold text-sm relative after:absolute after:right-full after:top-1/2 after:-translate-y-1/2 after:border-8 after:border-transparent after:border-r-blue-200">新しい漢字を覚えよう！</div></div><h3 className="text-xl font-black text-blue-600 mb-4">漢字コーナー</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {kanji.map((item) => (
                <div key={`${item.hanzi}-${item.pinyin}`} className="rounded-2xl bg-white border-2 border-blue-200 p-4 text-center btn-3d">
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-4xl font-black text-slate-700">{item.hanzi}</p>
                    <SpeakButton text={item.hanzi} lang="zh-CN" />
                  </div>
                  <p className="text-xs font-bold text-slate-500">{item.ja}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-3xl bg-yellow-50 border-2 border-yellow-200 p-4 md:p-6 card-shadow">
            <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 border-2 border-yellow-200">{guideByKey(unit.guide)}</div><div className="bg-white px-4 py-2 rounded-2xl border-2 border-yellow-200 font-bold text-sm relative after:absolute after:right-full after:top-1/2 after:-translate-y-1/2 after:border-8 after:border-transparent after:border-r-yellow-200">実際に使ってみよう！</div></div><h3 className="text-xl font-black text-yellow-700 mb-4">かいわコーナー</h3>
            <div className="space-y-3">
              {conversation.map((item, i) => (
                <div key={item.id} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`chat-bubble ${i % 2 === 0 ? 'left border border-yellow-200' : 'right border border-pink-200'} max-w-[90%]`}>
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <p className="text-xl font-black text-slate-700">{item.zh}</p>
                        <p className="text-xs font-bold text-slate-500 mt-1">{item.ja}</p>
                      </div>
                      <div className="flex flex-col gap-1 shrink-0 mt-1">
                        <SpeakButton text={item.zh} lang="zh-CN" />
                        <SpeakButton text={item.ja} lang="ja-JP" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {phase === 'learn' && (
            <div className="text-center">
              <button
                onClick={() => {
                  setPhase('game');
                  setMsg('ゲームスタート！');
                  setTimeout(() => gameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
                }}
                className="rounded-full px-8 py-3 bg-purple-500 text-white font-black btn-3d pulse-glow"
              >
                ゲームに挑戦！
              </button>
            </div>
          )}
        </section>

        {phase === 'game' && (
          <section ref={gameRef} className="rounded-3xl bg-purple-50 border-2 border-purple-200 p-4 md:p-6 card-shadow">
            <h3 className="text-xl font-black text-purple-600 mb-4">ゲームタイム！</h3>
            <p className="text-sm font-bold text-slate-500 mb-3">{msg}</p>

            {!unit.isTest && baseGameKind === 'memory' ? (
              <div>
                <p className="text-sm font-bold text-slate-500 mb-2">ラウンド {index + 1} / {totalQuestions}</p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {memoryDeck.map((card) => {
                    const open = memoryOpen.includes(card.key) || memorySolved.includes(card.key);
                    const solved = memorySolved.includes(card.key);
                    return (
                      <button
                        key={card.key}
                        disabled={lockedClick}
                        onClick={() => {
                          if (lockedClick || open || memoryOpen.length >= 2) return;
                          const opened = [...memoryOpen, card.key];
                          setMemoryOpen(opened);
                          if (opened.length === 2) {
                            const a = memoryDeck.find((x) => x.key === opened[0]);
                            const b = memoryDeck.find((x) => x.key === opened[1]);
                            const ok = Boolean(a && b && a.pair === b.text && b.pair === a.text);
                            if (ok) {
                              const nextSolved = [...memorySolved, opened[0], opened[1]];
                              setMemorySolved(nextSolved);
                              setTimeout(() => {
                                setMemoryOpen([]);
                                if (nextSolved.length === memoryDeck.length) {
                                  nextAfterFeedback(memoryMistakes <= 2, 'ペア完成', card.key);
                                }
                              }, 240);
                            } else {
                              setMemoryMistakes((m) => m + 1);
                              setTimeout(() => setMemoryOpen([]), 500);
                            }
                          }
                        }}
                        className={`h-20 rounded-2xl border-4 font-black text-lg btn-3d ${
                          open ? 'bg-white border-pink-300 text-pink-600' : 'bg-pink-300 border-pink-400 text-transparent'
                        } ${solved ? 'ring-2 ring-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.6)] pop-in' : ''}`}
                      >
                        {open ? card.text : '？'}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : current ? (
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <p className="text-xl font-black text-slate-700 flex-1">{current.prompt}</p>
                  {getAutoReadText(current) && (
                    <SpeakButton text={getAutoReadText(current)} lang="zh-CN" className="mt-1" />
                  )}
                </div>
                {(current.kind === 'hunt') && <p className="text-sm font-bold text-slate-500">残り時間: {timeLeft}秒</p>}

                {current.kind === 'order' ? (
                  <>
                    <div className="rounded-2xl border-2 border-dashed border-orange-300 bg-white p-3 min-h-[56px] flex flex-wrap gap-2">
                      {pickWords.map((w, i) => (
                        <button key={`${w}-${i}`} onClick={() => setPickWords((arr) => arr.filter((_, idx) => idx !== i))} className="rounded-xl bg-orange-200 px-3 py-1 font-black text-orange-700">
                          {w}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {current.options.map((w, i) => (
                        <button key={`${w}-${i}`} disabled={lockedClick} onClick={() => setPickWords((arr) => [...arr, w])} className="rounded-xl border-2 border-dashed border-orange-300 bg-white px-4 py-2 font-black text-orange-600 btn-3d">
                          {w}
                        </button>
                      ))}
                    </div>
                    <button
                      disabled={lockedClick || pickWords.length === 0}
                      onClick={() => nextAfterFeedback(pickWords.join(' ') === current.answer, current.answer, 'order-check')}
                      className={`rounded-full px-6 py-3 text-white font-black btn-3d ${selectedId === 'order-check' ? (pickWords.join(' ') === current.answer ? 'bg-green-500 pop-in' : 'bg-red-500 shake-soft') : 'bg-emerald-400'} disabled:opacity-50`}
                    >
                      チェック
                    </button>
                  </>
                ) : (
                  <div className={`grid gap-3 ${current.kind === 'hunt' ? 'grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {current.options.map((opt, i) => {
                      const idKey = `opt-${i}`;
                      const correct = opt === current.answer;
                      const picked = selectedId === idKey;
                      return (
                        <button
                          key={idKey}
                          disabled={lockedClick}
                          onClick={() => nextAfterFeedback(correct, current.answer, idKey)}
                          className={`rounded-2xl border-4 bg-white p-3 md:p-4 font-black btn-3d ${
                            current.kind === 'hunt' ? 'text-2xl' : 'text-xl'
                          } ${
                            picked ? (correct ? 'border-green-400 bg-green-50 text-green-700 pop-in' : 'border-red-400 bg-red-50 text-red-600 shake-soft') : 'border-violet-200 text-violet-700 hover:bg-violet-50'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : null}
          </section>
        )}

        {phase === 'result' && (
          <section className="rounded-3xl bg-yellow-50 border-4 border-yellow-300 p-6 text-center card-shadow confetti">
            <p className="text-2xl font-black text-yellow-600 mb-2">結果発表！</p>
            <p className="font-black text-slate-700 mb-2">{score} / {totalQuestions} 正解</p>
            <div className="text-2xl font-black mb-4">
  {score === totalQuestions ? <span className="text-pink-500">すごい！完璧！✨</span> : 
   score >= totalQuestions * 0.8 ? <span className="text-orange-500">よくできた！もうちょっとで満点！</span> :
   resultPass ? <span className="text-blue-500">クリア！よくがんばったね！</span> :
   <span className="text-slate-500">がんばった！復習してもう一回チャレンジ！</span>}
</div>
{unit.kanji.length > 0 && (
  <div className="my-6 p-4 bg-white rounded-2xl border-2 border-yellow-200">
    <p className="font-bold text-slate-500 text-sm mb-2">学んだ漢字のおさらい</p>
    <div className="flex flex-wrap justify-center gap-3">
      {unit.kanji.map((k: KanjiItem) => <span key={k.hanzi} className="text-3xl font-black text-slate-700">{k.hanzi}</span>)}
    </div>
  </div>
)}

            {resultPass ? <p className="font-bold text-pink-600 mb-4">⭐ クリア報酬獲得（再挑戦時は半分）</p> : null}
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={resetGame} className="rounded-full px-6 py-3 bg-purple-500 text-white font-black btn-3d">もう一回チャレンジ！</button>
              <button onClick={() => navigate('/')} className="rounded-full px-6 py-3 bg-pink-400 text-white font-black btn-3d">ホームへ</button>
              {resultPass && unit.id < 15 ? (
                <button onClick={() => navigate(`/unit/${unit.id + 1}`)} className="rounded-full px-6 py-3 bg-emerald-400 text-white font-black btn-3d">次のユニット</button>
              ) : null}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}