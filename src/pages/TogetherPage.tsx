import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { MelodyGuide, KuromiGuide } from '../assets/characters/characters';
import { units, getUnit } from '../data/units';
import { getProgress } from '../utils/storage';

export default function TogetherPage() {
  const navigate = useNavigate();
  
  const p1Progress = getProgress('sister9');
  const p2Progress = getProgress('sister12');
  
  // Both must have cleared it, or just show all unlocked for either? 
  // Requirement: "选择已解锁的任意单元（取两人共同已解锁的单元）"
  const unlockedUnits = units.filter(u => 
    p1Progress.clearedUnits.includes(u.id) && p2Progress.clearedUnits.includes(u.id)
  );

  // If no common units, just fallback to unit 1
  const availableUnits = unlockedUnits.length > 0 ? unlockedUnits : [units[0]];

  const [step, setStep] = useState<'select' | 'game' | 'result'>('select');
  
  
  const [turn, setTurn] = useState<number>(0); // 0 to 9 (10 questions total)
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);

  const startGame = (unitId: number) => {
    
    
    // Generate 10 random questions from the unit
    const unit = getUnit(unitId)!;
    const qs = [];
    
    // Simple question generator based on kanji/pinyin/conversation
    for(let i=0; i<10; i++) {
      const type = Math.random();
      if (type < 0.33 && unit.pinyin.length >= 2) {
        const target = unit.pinyin[Math.floor(Math.random() * unit.pinyin.length)];
        const others = unit.pinyin.filter(p => p.letter !== target.letter).slice(0, 3);
        qs.push({
          q: target.letter,
          options: [target.kana, ...others.map(o => o.kana)].sort(() => Math.random() - 0.5),
          answer: target.kana
        });
      } else if (type < 0.66 && unit.kanji.length >= 2) {
        const target = unit.kanji[Math.floor(Math.random() * unit.kanji.length)];
        const others = unit.kanji.filter(k => k.char !== target.char).slice(0, 3);
        qs.push({
          q: target.char,
          options: [target.ja, ...others.map(o => o.ja)].sort(() => Math.random() - 0.5),
          answer: target.ja
        });
      } else if (unit.conversation.length >= 2) {
        const target = unit.conversation[Math.floor(Math.random() * unit.conversation.length)];
        const others = unit.conversation.filter(c => c.zh !== target.zh).slice(0, 3);
        qs.push({
          q: target.ja,
          options: [target.zh, ...others.map(o => o.zh)].sort(() => Math.random() - 0.5),
          answer: target.zh
        });
      } else {
        // Fallback
        const target = unit.kanji[0] || { char: '好', ja: 'よい' };
        qs.push({ q: target.char, options: [target.ja, 'わるい', '大きい', '小さい'], answer: target.ja });
      }
    }
    
    setQuestions(qs);
    setP1Score(0);
    setP2Score(0);
    setTurn(0);
    setStep('game');
  };

  const handleAnswer = (opt: string) => {
    if (showFeedback) return;
    
    const isCorrect = opt === questions[turn].answer;
    setShowFeedback(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
      if (turn % 2 === 0) setP1Score(prev => prev + 1);
      else setP2Score(prev => prev + 1);
    }
    
    setTimeout(() => {
      setShowFeedback(null);
      if (turn + 1 < 10) {
        setTurn(prev => prev + 1);
      } else {
        setStep('result');
      }
    }, 1500);
  };

  const renderStars = (score: number) => {
    return Array(5).fill(0).map((_, i) => i < score ? '⭐' : '☆').join('');
  };

  return (
    <Layout title="ふたりでチャレンジ！" subtitle="May と Yuna で一緒にあそぼう">
      {step === 'select' && (
        <div className="flex flex-col items-center">
          <div className="flex gap-4 mb-8">
            <MelodyGuide className="w-20 h-20 animate-bob" />
            <div className="flex items-center text-xl font-black text-pink-500">VS</div>
            <KuromiGuide className="w-20 h-20 animate-bob"  />
          </div>
          <h2 className="text-xl font-black text-pink-600 mb-6">遊ぶユニットをえらんでね！</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            {availableUnits.map(u => (
              <button 
                key={u.id}
                onClick={() => startGame(u.id)}
                className="btn-3d bg-white border-2 border-pink-200 rounded-3xl p-4 text-left flex items-center gap-4 hover:border-pink-400"
              >
                <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center font-black text-pink-500">
                  {u.id}
                </div>
                <div>
                  <div className="font-black text-slate-700">{u.titleZh}</div>
                  <div className="text-sm font-bold text-slate-500">{u.titleJa}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'game' && questions[turn] && (
        <div className="flex flex-col items-center max-w-xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            {turn % 2 === 0 ? (
              <>
                <MelodyGuide className="w-24 h-24 animate-bob drop-shadow-md mb-2" />
                <h2 className="text-3xl font-black text-pink-500 text-3d">May のターン</h2>
              </>
            ) : (
              <>
                <KuromiGuide className="w-24 h-24 animate-bob drop-shadow-md mb-2" />
                <h2 className="text-3xl font-black text-purple-600 text-3d">Yuna のターン</h2>
              </>
            )}
            <div className="text-slate-400 font-bold mt-2">問題 {turn + 1} / 10</div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 card-shadow border-4 border-slate-100 w-full mb-8 text-center relative">
            <h3 className="text-5xl font-black text-slate-800 mb-2">{questions[turn].q}</h3>
            
            {showFeedback === 'correct' && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-2xl z-10 animate-in fade-in zoom-in">
                <span className="text-6xl text-emerald-500 font-black">正解！✨</span>
              </div>
            )}
            {showFeedback === 'wrong' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 rounded-2xl z-10 animate-in fade-in zoom-in">
                <span className="text-6xl text-rose-500 font-black mb-2">ブッブー 💦</span>
                <span className="text-xl font-bold text-slate-600">答えは: {questions[turn].answer}</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {questions[turn].options.map((opt: string, i: number) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                disabled={showFeedback !== null}
                className={`btn-3d rounded-2xl p-4 text-xl font-bold transition-all border-2 
                  ${turn % 2 === 0 
                    ? 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100 active:bg-pink-200' 
                    : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 active:bg-purple-200'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'result' && (
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-3xl p-8 card-shadow border-4 border-pink-200 max-w-md w-full text-center mb-8">
            <h2 className="text-2xl font-black text-pink-600 mb-6">ふたりの結果！🎉</h2>
            
            <div className="flex justify-between items-center bg-pink-50 p-4 rounded-2xl mb-4">
              <div className="flex items-center gap-3">
                <MelodyGuide className="w-12 h-12" />
                <span className="font-black text-lg text-pink-600">May</span>
              </div>
              <div className="text-right">
                <div className="tracking-widest">{renderStars(p1Score)}</div>
                <div className="font-bold text-slate-500">{p1Score}/5</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center bg-purple-50 p-4 rounded-2xl mb-6">
              <div className="flex items-center gap-3">
                <KuromiGuide className="w-12 h-12" />
                <span className="font-black text-lg text-purple-600">Yuna</span>
              </div>
              <div className="text-right">
                <div className="tracking-widest">{renderStars(p2Score)}</div>
                <div className="font-bold text-slate-500">{p2Score}/5</div>
              </div>
            </div>
            
            <div className="text-xl font-black text-emerald-600 mb-4 animate-bounce">
              {p1Score > p2Score && "May の勝ち！おめでとう 💕"}
              {p2Score > p1Score && "Yuna の勝ち！おめでとう 💜"}
              {p1Score === p2Score && "すごい！引き分け！ふたりとも天才！ ✨"}
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setStep('select')}
              className="btn-3d bg-white border-2 border-pink-300 text-pink-500 px-6 py-3 rounded-full font-bold"
            >
              もう一回！
            </button>
            <button 
              onClick={() => navigate('/')}
              className="btn-3d bg-pink-500 border-2 border-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-lg"
            >
              ホームへ
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
