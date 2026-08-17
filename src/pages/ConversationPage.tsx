import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import DifficultyBadge from '../components/DifficultyBadge';
import { PompompurinGuide } from '../assets/characters/characters';
import { conversations, sceneNames } from '../data/conversations';
import { recordGameClear, updateLearned, addStars } from '../utils/storage';
import { useProfile } from '../hooks/useProfile';

const fillQuiz = [
  { context: '朝のあいさつ', q: '你好！', answer: '你好', options: ['再见', '你好', '谢谢'], aJa: 'こんにちは' },
  { context: 'お買い物', q: '这个多少钱？', answer: '太贵了', options: ['太贵了', '早上好', '我不懂'], aJa: '高すぎます' },
  { context: '道案内', q: '请问，车站在哪里？', answer: '往左', options: ['往左', '买单', '谢谢'], aJa: '左へ' },
  { context: '学校で', q: '老师好！', answer: '同学们好', options: ['同学们好', '买单', '太贵了'], aJa: '皆さんこんにちは' },
  { context: 'レストラン', q: '你要什么？', answer: '我要这个', options: ['我要这个', '再见', '往左'], aJa: 'これをください' },
];

const orderQuiz = [
  { ja: '私の名前は美香です', words: ['我', '叫', '美香'], answer: '我 叫 美香' },
  { ja: 'すみません、学校はどこですか？', words: ['请问', '在哪里', '学校'], answer: '请问 学校 在哪里' },
  { ja: '私はこの料理が欲しいです', words: ['我要', '这个', '菜'], answer: '我要 这个 菜' },
  { ja: 'これは何ですか？', words: ['这', '是', '什么'], answer: '这 是 什么' },
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
  const [fillCompleted, setFillCompleted] = useState(false);

  const [orderIndex, setOrderIndex] = useState(0);
  const [pickedWords, setPickedWords] = useState<string[]>([]);
  const [orderScore, setOrderScore] = useState(0);
  const [orderMsg, setOrderMsg] = useState('単語をタップして文章を作ろう');
  const [orderCompleted, setOrderCompleted] = useState(false);

  const fill = fillQuiz[fillIndex % fillQuiz.length];
  const currentOptions = useMemo(() => shuffle([...fill.options]), [fillIndex]);
  const order = orderQuiz[orderIndex % orderQuiz.length];

  function answerFill(choice: string) {
    if (choice === fill.answer) {
      const nextScore = fillScore + 2;
      setFillScore(nextScore);
      setFillMsg('大正解！会話力アップ 🎉');
      addStars(profile, 1, 0);
      updateLearned(profile, [], [fill.answer]);
      
      if (nextScore >= 10 && !fillCompleted) {
        setFillCompleted(true);
        recordGameClear(profile, 'dialog-fill', 5);
        addStars(profile, 5, 1);
      }
      
      setTimeout(() => {
        setFillIndex((i) => i + 1);
        setFillMsg('次の会話に挑戦！');
      }, 1500);
    } else {
      setFillMsg('おしい！文脈を考えてみよう');
      const btn = document.getElementById(`btn-${choice}`);
      if (btn) {
        btn.classList.add('shake-soft', 'border-red-400', 'bg-red-50', 'text-red-500');
        setTimeout(() => btn.classList.remove('shake-soft', 'border-red-400', 'bg-red-50', 'text-red-500'), 500);
      }
    }
  }

  function addWord(word: string) {
    if (pickedWords.length >= order.words.length) return;
    setPickedWords((prev) => [...prev, word]);
  }

  function removeWord(idx: number) {
    setPickedWords(prev => prev.filter((_, i) => i !== idx));
  }

  function submitOrder() {
    if (pickedWords.length < order.words.length) {
      setOrderMsg('まだ単語が足りないよ！');
      return;
    }
    const sentence = pickedWords.join(' ');
    if (sentence === order.answer) {
      const nextScore = orderScore + 2;
      setOrderScore(nextScore);
      setOrderMsg('正しい語順！すごい！ ⭐');
      addStars(profile, 2, 0);
      updateLearned(profile, [], [sentence]);
      
      if (nextScore >= 8 && !orderCompleted) {
        setOrderCompleted(true);
        recordGameClear(profile, 'sentence-order', 5);
        addStars(profile, 5, 2);
      }
      
      setTimeout(() => {
        setOrderIndex((i) => i + 1);
        setPickedWords([]);
        setOrderMsg('次の文章を作ってみよう！');
      }, 1500);
    } else {
      setOrderMsg('ちがうよ。主語→動詞→目的語を意識しよう');
      const track = document.getElementById('sentence-track');
      if (track) {
        track.classList.add('shake-soft', 'border-red-400', 'bg-red-50');
        setTimeout(() => track.classList.remove('shake-soft', 'border-red-400', 'bg-red-50'), 500);
      }
      setTimeout(() => setPickedWords([]), 1000);
    }
  }

  // Calculate unselected words for Game 6
  const availableWords = [...order.words];
  pickedWords.forEach(pw => {
    const idx = availableWords.indexOf(pw);
    if (idx > -1) availableWords[idx] = ''; // mark as used
  });

  return (
    <Layout title="にちじょうかいわ" subtitle="Pompompurinと会話を練習しよう">
      
      <section className="mb-8 rounded-3xl glass-panel p-5 flex flex-col md:flex-row items-center gap-4 relative overflow-hidden border-2 border-yellow-200">
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-yellow-300 opacity-20 rounded-full blur-2xl"></div>
        <PompompurinGuide className="h-24 w-24 flex-shrink-0 animate-bob drop-shadow-md" />
        <div className="chat-bubble left border border-yellow-200 shadow-sm relative z-10 w-full md:w-auto">
          <p className="font-black text-yellow-700 text-lg mb-1">声に出して練習しよう！</p>
          <p className="text-sm font-bold text-slate-600">
            {profile === 'sister9' ? '妹ちゃんは短いあいさつから始めようね♪' : 'お姉ちゃんは少し長い会話にもチャレンジ！'}
          </p>
        </div>
      </section>

      {/* Phrases Carousel */}
      <section className="mb-8">
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-4 snap-x snap-mandatory px-2 -mx-2">
          {sceneNames.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setScene(name)}
              className={`snap-center flex-shrink-0 rounded-full px-5 py-2 text-sm font-black transition-all btn-3d whitespace-nowrap ${
                scene === name ? 'bg-yellow-400 text-white scale-105 shadow-md' : 'bg-white text-yellow-700 hover:bg-yellow-50'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="bg-yellow-50/50 rounded-3xl p-4 md:p-6 border-2 border-yellow-100">
          <div className="flex flex-col gap-4">
            {list
              .filter((c) => c.scene === scene)
              .map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div key={item.id} className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                    <div className="flex flex-col max-w-[80%]">
                      <div className={`chat-bubble ${isLeft ? 'left border-2 border-yellow-200' : 'right !bg-pink-100 border-2 border-pink-200'} shadow-sm p-4 hover:-translate-y-1 transition-transform`}>
                        <p className={`text-xl md:text-2xl font-black mb-1 ${isLeft ? 'text-yellow-700' : 'text-pink-600'}`}>
                          {item.zh}
                        </p>
                        <p className="text-xs font-bold text-slate-500">{item.ja}</p>
                      </div>
                      <div className={`mt-1 flex ${isLeft ? 'justify-end pr-2' : 'justify-start pl-2'}`}>
                        <DifficultyBadge level={item.difficulty} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Game 5: Fill in the blanks */}
      <section className="mb-8 rounded-3xl bg-amber-50 border-4 border-amber-200 p-4 md:p-6 card-shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-black text-amber-600">🎮 ゲーム5: 会話穴埋め</h3>
          <div className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-black border-2 border-yellow-300">
            スコア: {fillScore}
          </div>
        </div>
        
        <p className={`mb-6 inline-block px-4 py-2 rounded-full font-bold text-sm transition-all ${fillMsg.includes('正解') ? 'bg-emerald-100 text-emerald-600 border border-emerald-300 pop-in sparkle' : 'bg-white text-amber-600 border border-amber-200'}`}>
          {fillMsg}
        </p>

        <div className="flex flex-col gap-4 mb-8 max-w-lg mx-auto">
          <div className="flex justify-start">
            <div className="chat-bubble left border-2 border-slate-200 bg-white">
              <p className="text-xs font-bold text-slate-400 mb-1">{fill.context}</p>
              <p className="text-xl font-black text-slate-700">{fill.q}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="chat-bubble right !bg-pink-100 border-2 border-pink-300 flex items-center justify-center min-w-[120px] min-h-[60px] animate-pulse">
              <span className="text-2xl font-black text-pink-400">?</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {currentOptions.map((choice) => (
            <button
              id={`btn-${choice}`}
              key={`${fill.q}-${choice}`}
              type="button"
              onClick={() => answerFill(choice)}
              className="rounded-full bg-white border-4 border-amber-100 py-4 px-6 hover:border-amber-400 hover:bg-amber-100 btn-3d transition-all group flex flex-col items-center"
            >
              <span className="text-xl font-black text-amber-700 group-hover:scale-110 transition-transform">{choice}</span>
              {choice === fill.answer && <span className="text-[10px] font-bold text-amber-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{fill.aJa}</span>}
            </button>
          ))}
        </div>
      </section>

      {/* Game 6: Sentence Order */}
      <section className="mb-8 rounded-3xl bg-orange-50 border-4 border-orange-200 p-4 md:p-6 card-shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-black text-orange-600">🎮 ゲーム6: 文章ならべ</h3>
          <div className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-black border-2 border-yellow-300">
            スコア: {orderScore}
          </div>
        </div>
        
        <p className={`mb-6 inline-block px-4 py-2 rounded-full font-bold text-sm transition-all ${orderMsg.includes('正しい') ? 'bg-emerald-100 text-emerald-600 border border-emerald-300 pop-in sparkle' : 'bg-white text-orange-600 border border-orange-200'}`}>
          {orderMsg}
        </p>

        <div className="bg-white p-5 rounded-3xl border-4 border-orange-100 mb-6 shadow-inner">
          <p className="text-sm font-bold text-slate-500 mb-3 text-center">{order.ja}</p>
          
          {/* Sentence Track */}
          <div id="sentence-track" className="flex flex-wrap gap-2 justify-center min-h-[60px] p-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 transition-colors duration-300">
            {Array.from({ length: order.words.length }).map((_, i) => {
              const word = pickedWords[i];
              return word ? (
                <button 
                  key={`picked-${i}`} 
                  onClick={() => removeWord(i)}
                  className="rounded-xl bg-orange-200 text-orange-700 border-2 border-orange-300 font-black text-xl px-3 py-1 btn-3d pop-in"
                >
                  {word}
                </button>
              ) : (
                <div key={`slot-${i}`} className="w-16 h-12 rounded-xl bg-black/5"></div>
              );
            })}
          </div>
        </div>

        {/* Word Pool */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {availableWords.map((word, idx) => (
            word ? (
              <button
                key={`pool-${word}-${idx}`}
                type="button"
                onClick={() => addWord(word)}
                className="rounded-xl bg-white border-2 border-dashed border-orange-300 px-6 py-3 text-xl font-black text-orange-600 hover:bg-orange-100 hover:-translate-y-1 transition-all btn-3d"
              >
                {word}
              </button>
            ) : (
              <div key={`empty-${idx}`} className="px-6 py-3 w-20"></div> // Placeholder for removed word layout stability
            )
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button 
            type="button" 
            onClick={() => setPickedWords([])} 
            className="rounded-full bg-slate-200 px-6 py-3 font-black text-slate-600 btn-3d hover:bg-slate-300"
          >
            リセット
          </button>
          <button 
            type="button" 
            onClick={submitOrder} 
            className="rounded-full bg-emerald-400 px-8 py-3 font-black text-white btn-3d hover:bg-emerald-500 text-lg flex items-center gap-2"
          >
            チェック <span>✨</span>
          </button>
        </div>
      </section>

    </Layout>
  );
}
