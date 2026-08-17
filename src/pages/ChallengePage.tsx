import { useState } from 'react';
import Layout from '../components/Layout';
import { KuromiGuide } from '../assets/characters/characters';
import { useProfile } from '../hooks/useProfile';
import { getProgress, recordGameClear, addStars } from '../utils/storage';
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
    { name: '妹 (9歳)', stars: p9.stars, id: 'sister9' },
    { name: '姉 (12歳)', stars: p12.stars, id: 'sister12' },
  ].sort((a, b) => b.stars - a.stars);
}

function buildQuestions(floor: number): Question[] {
  const qs: Question[] = [];
  for (let i = 0; i < 5; i += 1) {
    const type = i % 3;
    if (type === 0) {
      const item = initials[(floor + i) % initials.length];
      qs.push({
        q: `「${item.value}」に近い音はどれ？`,
        choices: [item.kana, 'ア', 'サ', 'ミ'],
        answer: item.kana,
      });
    } else if (type === 1) {
      const item = allKanji[(floor + i) % allKanji.length];
      qs.push({
        q: `漢字「${item.hanzi}」の日本語の意味は？`,
        choices: [item.ja, 'きれい', 'たのしい', 'かたい'],
        answer: item.ja,
      });
    } else {
      const item = conversations[(floor + i) % conversations.length];
      qs.push({
        q: `「${item.ja}」を中国語で言うと？`,
        choices: [item.zh, '谢谢', '再见', '我不懂'],
        answer: item.zh,
      });
    }
  }
  // Remove duplicates and fill up to 4 options if needed, then shuffle
  return qs.map((q) => {
    let uniqueChoices = Array.from(new Set(q.choices));
    while(uniqueChoices.length < 4) uniqueChoices.push('？');
    return { ...q, choices: uniqueChoices.sort(() => Math.random() - 0.5).slice(0, 4) };
  });
}

export default function ChallengePage() {
  const { profile } = useProfile();
  const [floor, setFloor] = useState(1);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState('5問クリアで次の階へ！');
  const [questions, setQuestions] = useState<Question[]>(() => buildQuestions(1));
  const ranking = getRanking();
  const maxStars = Math.max(ranking[0].stars, ranking[1].stars, 100);
  
  const isBoss = floor % 5 === 0;
  const current = questions[index];
  const maxFloor = 12;

  function answer(choice: string) {
    if (!current) return;
    if (choice === current.answer) {
      const points = isBoss ? 2 : 1;
      setScore((s) => s + points);
      setMsg('大正解！塔をのぼろう ⭐');
      addStars(profile, points, 0);
    } else {
      setMsg('おしい！次で取り返そう');
    }

    setTimeout(() => {
      if (index >= 4) {
        const nextFloor = floor + 1;
        if (nextFloor > maxFloor) {
          recordGameClear(profile, 'challenge-tower', 15);
          setMsg('タワー制覇！おめでとう 🎉');
          return;
        }
        setFloor(nextFloor);
        setIndex(0);
        setQuestions(buildQuestions(nextFloor));
        setScore(0);
        setMsg(`${nextFloor}階に到着！`);
        addStars(profile, isBoss ? 5 : 2, isBoss ? 1 : 0);
      } else {
        setIndex((i) => i + 1);
        setMsg('次の問題！');
      }
    }, 1000);
  }

  const floors = Array.from({ length: maxFloor }).map((_, i) => maxFloor - i);

  return (
    <Layout title="チャレンジタワー" subtitle="Kuromiと総合テスト！12階建て">
      
      <section className="mb-8 rounded-3xl glass-panel p-5 flex flex-col md:flex-row items-center gap-4 relative overflow-hidden border-2 border-purple-200">
        <div className="absolute -left-4 -top-4 w-32 h-32 bg-purple-300 opacity-20 rounded-full blur-2xl"></div>
        <KuromiGuide className="h-24 w-24 flex-shrink-0 animate-bob drop-shadow-md" />
        <div className="chat-bubble left border border-purple-200 shadow-sm relative z-10 w-full md:w-auto">
          <p className="font-black text-purple-700 text-lg mb-1">アタシの挑戦を受けてみろ！</p>
          <p className="text-sm font-bold text-slate-600">
            {profile === 'sister9' ? '妹ちゃん、5階と10階のボスに気をつけて！' : 'お姉ちゃん、タイムプレッシャーに負けないでね！'}
          </p>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        
        {/* Tower Map */}
        <section className="w-full lg:w-1/3 bg-slate-800 rounded-[2.5rem] p-4 flex flex-col relative overflow-hidden border-4 border-slate-700 card-shadow">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-slate-800 to-black opacity-80"></div>
          
          <h3 className="text-center font-black text-white text-xl mb-4 relative z-10 text-3d tracking-widest mt-2">
            🗼 チャレンジタワー
          </h3>
          
          <div className="flex-1 flex flex-col justify-between relative z-10 gap-2 overflow-y-auto no-scrollbar pb-4 px-2">
            {floors.map((lv) => {
              const boss = lv % 5 === 0;
              const active = lv === floor;
              const cleared = lv < floor;
              
              return (
                <div 
                  key={`floor-${lv}`} 
                  className={`relative flex items-center justify-center p-3 rounded-2xl border-4 transition-all duration-500 ${
                    active ? (boss ? 'bg-red-500 border-red-300 scale-105 shadow-[0_0_20px_rgba(239,68,68,0.6)] pulse-glow' : 'bg-purple-500 border-purple-300 scale-105 shadow-[0_0_20px_rgba(168,85,247,0.5)]') 
                    : cleared ? 'bg-slate-700 border-slate-600 text-slate-400' 
                    : boss ? 'bg-slate-800 border-red-900/50 text-red-900' 
                    : 'bg-slate-800 border-slate-700 text-slate-600'
                  }`}
                >
                  <span className={`font-black text-lg ${active ? 'text-white' : ''}`}>
                    {boss ? '🔥 BOSS ' + lv : lv + 'F'}
                  </span>
                  
                  {active && boss && (
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-10 h-10 drop-shadow-lg">
                      <KuromiGuide className="w-full h-full" />
                    </div>
                  )}
                  {cleared && (
                    <div className="absolute right-4 text-yellow-400 sparkle">⭐</div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Quiz Area & Leaderboard */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          {/* Question Area */}
          <section className={`rounded-3xl p-5 md:p-8 card-shadow border-4 transition-colors duration-500 ${isBoss ? 'bg-red-50 border-red-300' : 'bg-white border-purple-200'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-2xl font-black ${isBoss ? 'text-red-600' : 'text-purple-600'} drop-shadow-sm`}>
                {isBoss ? `🔥 Boss ${floor}階` : `${floor}階`} <span className="text-slate-400 text-xl ml-2">問題 {index + 1}/5</span>
              </h3>
              <div className="bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full font-black border-2 border-yellow-300 shadow-sm">
                スコア: {score}
              </div>
            </div>
            
            <p className={`mb-6 inline-block px-5 py-2 rounded-full font-bold text-sm transition-all ${msg.includes('正解') ? 'bg-emerald-100 text-emerald-600 border border-emerald-300 pop-in sparkle' : isBoss ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-purple-100 text-purple-600 border border-purple-200'}`}>
              {msg}
            </p>
            
            {current && floor <= maxFloor && (
              <>
                <div className={`mb-8 rounded-3xl p-6 text-center shadow-inner border-2 min-h-[120px] flex items-center justify-center ${isBoss ? 'bg-red-100 border-red-200' : 'bg-purple-50 border-purple-100'}`}>
                  <p className={`text-xl md:text-2xl font-black ${isBoss ? 'text-red-800' : 'text-purple-800'}`}>
                    {current.q}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {current.choices.map((choice, i) => {
                    const label = ['A', 'B', 'C', 'D'][i];
                    return (
                      <button
                        key={`${current.q}-${choice}-${i}`}
                        type="button"
                        onClick={() => answer(choice)}
                        className={`group flex items-center gap-4 rounded-2xl p-4 border-b-4 hover:-translate-y-1 active:translate-y-1 active:border-b-0 transition-all btn-3d ${
                          isBoss ? 'bg-white border-red-200 hover:bg-red-50' : 'bg-white border-purple-200 hover:bg-purple-50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                          isBoss ? 'bg-red-100 text-red-600 group-hover:bg-red-500 group-hover:text-white' : 'bg-purple-100 text-purple-600 group-hover:bg-purple-500 group-hover:text-white'
                        } transition-colors`}>
                          {label}
                        </div>
                        <span className={`text-lg md:text-xl font-black ${isBoss ? 'text-red-900' : 'text-purple-900'}`}>
                          {choice}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </section>

          {/* Leaderboard */}
          <section className="rounded-3xl bg-white p-5 md:p-6 card-shadow border-4 border-pink-200">
            <h3 className="mb-6 text-xl font-black text-pink-500 flex items-center gap-2">
              <span>🏆</span> 姉妹ローカルランキング
            </h3>
            <div className="space-y-4">
              {ranking.map((item, idx) => {
                const isFirst = idx === 0;
                const medal = isFirst ? '🥇' : '🥈';
                const percent = Math.max(5, Math.round((item.stars / maxStars) * 100));
                const isMe = item.id === profile;
                
                return (
                  <div key={item.name} className={`relative p-4 rounded-2xl border-2 transition-all card-shadow ${isMe ? 'bg-pink-50 border-pink-300 shadow-sm' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-2 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl drop-shadow-sm">{medal}</span>
                        <span className={`text-lg font-black ${isMe ? 'text-pink-600' : 'text-slate-600'}`}>{item.name} {isMe && <span className="text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full ml-1">YOU</span>}</span>
                      </div>
                      <span className="font-black text-yellow-600 text-xl drop-shadow-sm">⭐ {item.stars}</span>
                    </div>
                    {/* Bar chart background */}
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner relative z-10">
                      <div 
                        className={`h-full rounded-full progress-3d transition-all duration-1000 ${isFirst ? 'bg-yellow-400' : 'bg-slate-400'}`} 
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
