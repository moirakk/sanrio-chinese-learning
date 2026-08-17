import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import DifficultyBadge from '../components/DifficultyBadge';
import FlipGameCard from '../components/FlipGameCard';
import { PompompurinGuide } from '../assets/characters/characters';
import { conversations, sceneNames } from '../data/conversations';
import { recordGameClear, updateLearned } from '../utils/storage';
import { useProfile } from '../hooks/useProfile';

const fillQuiz = [
  { q: 'A: 你好！ B: ____！', choices: ['再见', '你好', '谢谢'], answer: '你好' },
  { q: 'A: 这个多少钱？ B: ____。', choices: ['太贵了', '早上好', '我不懂'], answer: '太贵了' },
  { q: 'A: 请问，车站在哪里？ B: ____走。', choices: ['往左', '买单', '谢谢'], answer: '往左' },
];

const orderQuiz = [
  { words: ['我', '叫', '美香'], answer: '我 叫 美香' },
  { words: ['请问', '在哪里', '学校'], answer: '请问 学校 在哪里' },
  { words: ['我要', '这个', '菜'], answer: '我要 这个 菜' },
];

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function ConversationPage() {
  const { profile } = useProfile();
  const list = useMemo(
    () => (profile === 'sister9' ? conversations.filter((c) => c.difficulty <= 2) : conversations),
    [profile],
  );
  const [scene, setScene] = useState(sceneNames[0]);
  const [fillIndex, setFillIndex] = useState(0);
  const [fillScore, setFillScore] = useState(0);
  const [fillMsg, setFillMsg] = useState('正しい返事をえらぼう');

  const [orderIndex, setOrderIndex] = useState(0);
  const [pickedWords, setPickedWords] = useState<string[]>([]);
  const [orderScore, setOrderScore] = useState(0);
  const [orderMsg, setOrderMsg] = useState('語順をドラッグ感覚でタップしよう');

  const fill = fillQuiz[fillIndex % fillQuiz.length];
  const order = orderQuiz[orderIndex % orderQuiz.length];

  function answerFill(choice: string) {
    if (choice === fill.answer) {
      setFillScore((s) => s + 2);
      setFillMsg('正解！会話力アップ 🎉');
      updateLearned(profile, [], [fill.answer]);
      setFillIndex((i) => i + 1);
    } else {
      setFillMsg('おしい！文脈を考えてみよう');
    }
  }

  function addWord(word: string) {
    if (pickedWords.includes(word) && pickedWords.filter((w) => w === word).length >= order.words.filter((w) => w === word).length) {
      return;
    }
    setPickedWords((prev) => [...prev, word]);
  }

  function submitOrder() {
    const sentence = pickedWords.join(' ');
    if (sentence === order.answer) {
      setOrderScore((s) => s + 2);
      setOrderMsg('正しい語順！すごい！');
      updateLearned(profile, [], [sentence]);
      setOrderIndex((i) => i + 1);
      setPickedWords([]);
    } else {
      setOrderMsg('ちがうよ。主語→動詞→目的語を意識しよう');
    }
  }

  if (fillScore >= 6) recordGameClear(profile, 'dialog-fill', 6);
  if (orderScore >= 6) recordGameClear(profile, 'sentence-order', 6);

  return (
    <Layout title="にちじょうかいわ" subtitle="Pompompurinと会話を練習しよう">
      <section className="mb-6 rounded-3xl bg-amber-50 p-4">
        <div className="mb-3 flex items-center gap-3">
          <PompompurinGuide className="h-14 w-14 animate-bob" />
          <p className="font-semibold text-amber-600">短い会話から長い会話へ、姉妹でレベルアップ！</p>
        </div>
        <div className="mb-3 flex flex-wrap gap-2">
          {sceneNames.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setScene(name)}
              className={`rounded-full px-3 py-2 text-sm font-bold ${
                scene === name ? 'bg-amber-400 text-white' : 'bg-white text-amber-700'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {list
            .filter((c) => c.scene === scene)
            .map((item) => (
              <div key={item.id} className="rounded-2xl bg-white p-3">
                <p className="font-bold text-amber-600">{item.zh}</p>
                <p className="text-sm text-slate-600">{item.ja}</p>
                <DifficultyBadge level={item.difficulty} />
              </div>
            ))}
        </div>
      </section>

      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <FlipGameCard title="ゲーム5" front="会話穴埋め" back="場面に合う中国語を選ぶ" completed={fillScore >= 6} />
        <FlipGameCard title="ゲーム6" front="文章ならべ" back="単語を正しい順番に並べる" completed={orderScore >= 6} />
      </section>

      <section className="mb-6 rounded-3xl bg-white p-4">
        <h3 className="mb-2 text-lg font-bold text-amber-500">ゲーム5: 会話穴埋め</h3>
        <p className={`mb-2 text-sm font-semibold ${fillMsg.includes('正解') ? 'text-emerald-600 pop-in' : 'text-slate-600'}`}>{fillMsg}</p>
        <p className="mb-2 text-sm font-bold text-yellow-600">スコア: {fillScore}</p>
        <div className="mb-3 rounded-2xl bg-amber-50 p-4 text-center font-bold text-amber-700">{fill.q}</div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {shuffle(fill.choices).map((choice) => (
            <button
              key={`${fill.q}-${choice}`}
              type="button"
              onClick={() => answerFill(choice)}
              className="rounded-2xl bg-amber-100 py-3 font-bold text-amber-700 hover:scale-[1.02]"
            >
              {choice}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-4">
        <h3 className="mb-2 text-lg font-bold text-orange-500">ゲーム6: 文章ならべ</h3>
        <p className={`mb-2 text-sm font-semibold ${orderMsg.includes('正しい') ? 'text-emerald-600 pop-in' : 'text-slate-600'}`}>{orderMsg}</p>
        <p className="mb-2 text-sm font-bold text-yellow-600">スコア: {orderScore}</p>
        <div className="mb-3 rounded-2xl bg-orange-50 p-3 text-sm font-semibold text-orange-700">
          作った文: {pickedWords.join(' ') || '（まだ）'}
        </div>
        <div className="mb-3 grid grid-cols-3 gap-2">
          {order.words.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              type="button"
              onClick={() => addWord(word)}
              className="rounded-2xl bg-orange-100 py-3 font-bold text-orange-700"
            >
              {word}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={submitOrder} className="rounded-2xl bg-orange-400 px-4 py-2 font-bold text-white">
            チェック
          </button>
          <button type="button" onClick={() => setPickedWords([])} className="rounded-2xl bg-slate-100 px-4 py-2 font-bold text-slate-600">
            リセット
          </button>
        </div>
      </section>
    </Layout>
  );
}
