import Layout from '../components/Layout';
import { KittyGuide, MelodyGuide, CinnamorollGuide, PompompurinGuide, KuromiGuide, PochaccoGuide } from '../assets/characters/characters';
import { useProfile } from '../hooks/useProfile';
import { getProgress } from '../utils/storage';
import { useMemo } from 'react';

const allCharacters = [
  { name: 'Kitty風', Guide: KittyGuide, threshold: 0 },
  { name: 'Melody風', Guide: MelodyGuide, threshold: 10 },
  { name: 'Cinnamoroll風', Guide: CinnamorollGuide, threshold: 20 },
  { name: 'Pompompurin風', Guide: PompompurinGuide, threshold: 30 },
  { name: 'Kuromi風', Guide: KuromiGuide, threshold: 40 },
  { name: 'Pochacco風', Guide: PochaccoGuide, threshold: 50 },
];

const dailyQuotes = [
  { zh: '天天向上！', ja: '日々向上しよう！' },
  { zh: '你是最棒的！', ja: 'きみが一番だよ！' },
  { zh: '加油，继续努力！', ja: 'がんばれ、その調子！' },
  { zh: '熟能生巧', ja: '継続は力なり' },
  { zh: '太厉害了！', ja: 'すごすぎる！' }
];

export default function MyRoomPage() {
  const { profile } = useProfile();
  const progress = getProgress(profile);
  
  // Choose a quote based on the day (or randomly just use memo)
  const quote = useMemo(() => dailyQuotes[new Date().getDay() % dailyQuotes.length], []);

  // Calculate percentages for the circular dashboard
  const starGoal = 100;
  const heartGoal = 50;
  const badgeGoal = 20;

  const starPct = Math.min(100, Math.round((progress.stars / starGoal) * 100));
  const heartPct = Math.min(100, Math.round((progress.hearts / heartGoal) * 100));
  const badgePct = Math.min(100, Math.round(((progress.clearedGames.length) / badgeGoal) * 100));

  return (
    <Layout title="マイルーム" subtitle="Pochaccoと成長記録をチェック">
      
      {/* Top Banner & Quote */}
      <section className="mb-8 rounded-3xl glass-panel p-5 flex flex-col md:flex-row items-center gap-4 relative overflow-hidden border-2 border-emerald-200">
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-emerald-300 opacity-20 rounded-full blur-2xl"></div>
        <PochaccoGuide className="h-24 w-24 flex-shrink-0 animate-bob drop-shadow-md" />
        <div className="chat-bubble left border border-emerald-200 shadow-sm relative z-10 w-full flex-1 flex justify-between items-center bg-white/80">
          <div>
            <p className="font-black text-emerald-700 text-lg mb-1">今日の一言 🌟</p>
            <p className="text-xl md:text-2xl font-black text-emerald-600 font-serif tracking-widest">{quote.zh}</p>
            <p className="text-sm font-bold text-slate-500 mt-1">{quote.ja}</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Circular Dashboard */}
        <section className="col-span-1 bg-white rounded-3xl p-6 card-shadow border-4 border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
          <h3 className="mb-4 text-xl font-black text-slate-700">成長メーター</h3>
          
          <div className="relative w-48 h-48 drop-shadow-sm">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              
              {/* Badge Circle (Inner) */}
              <circle cx="50" cy="50" r="28" fill="none" stroke="#f1f5f9" strokeWidth="6" />
              <circle cx="50" cy="50" r="28" fill="none" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" 
                strokeDasharray={`${(badgePct / 100) * (2 * Math.PI * 28)} 1000`} className="transition-all duration-1000 delay-500" />
              
              {/* Heart Circle (Middle) */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#f43f5e" strokeWidth="8" strokeLinecap="round" 
                strokeDasharray={`${(heartPct / 100) * (2 * Math.PI * 38)} 1000`} className="transition-all duration-1000 delay-300" />
              
              {/* Star Circle (Outer) */}
              <circle cx="50" cy="50" r="48" fill="none" stroke="#f1f5f9" strokeWidth="10" />
              <circle cx="50" cy="50" r="48" fill="none" stroke="#eab308" strokeWidth="10" strokeLinecap="round" 
                strokeDasharray={`${(starPct / 100) * (2 * Math.PI * 48)} 1000`} className="transition-all duration-1000" />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-700">{starPct}%</span>
              <span className="text-xs font-bold text-slate-400">達成率</span>
            </div>
          </div>
          
          <div className="mt-6 w-full space-y-2">
            <div className="flex justify-between items-center text-sm font-bold bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
              <span className="text-yellow-600">⭐ スター</span>
              <span className="text-slate-700">{progress.stars}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
              <span className="text-rose-500">❤️ ハート</span>
              <span className="text-slate-700">{progress.hearts}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
              <span className="text-amber-500">🏅 ゲームクリア</span>
              <span className="text-slate-700">{progress.clearedGames.length}回</span>
            </div>
          </div>
        </section>

        {/* Kanji & Phrases Book */}
        <section className="col-span-2 flex flex-col gap-6">
          
          <div className="bg-emerald-50 rounded-3xl p-6 card-shadow border-4 border-emerald-200 flex-1">
            <h3 className="mb-4 text-xl font-black text-emerald-600 flex items-center gap-2">
              <span>📖</span> 覚えた漢字アルバム
            </h3>
            
            <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4 snap-x px-1">
              {progress.learnedKanji.length > 0 ? (
                progress.learnedKanji.map((k) => (
                  <div key={k} className="snap-center flex-shrink-0 w-24 h-32 bg-[#faf7f2] border-4 border-[#5c4a3d] rounded-xl flex flex-col items-center justify-center card-shadow relative overflow-hidden group hover:scale-105 transition-transform">
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIi8+PC9zdmc+')] pointer-events-none"></div>
                    <span className="text-5xl font-black text-[#2b221a] font-serif">{k}</span>
                  </div>
                ))
              ) : (
                <div className="w-full py-8 text-center text-emerald-500 font-bold bg-white/50 rounded-2xl border-2 border-dashed border-emerald-300">
                  まだ漢字を覚えていないよ。漢字アドベンチャーで遊ぼう！
                </div>
              )}
            </div>
          </div>

          <div className="bg-sky-50 rounded-3xl p-6 card-shadow border-4 border-sky-200 flex-1">
            <h3 className="mb-4 text-xl font-black text-sky-600 flex items-center gap-2">
              <span>💬</span> 覚えたフレーズ
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {progress.learnedPhrases.length > 0 ? (
                progress.learnedPhrases.map((p) => (
                  <span key={p} className="bg-white px-4 py-2 rounded-full border-2 border-sky-200 text-sky-700 font-bold shadow-sm hover:scale-105 transition-transform btn-3d">
                    {p}
                  </span>
                ))
              ) : (
                <div className="w-full py-6 text-center text-sky-500 font-bold bg-white/50 rounded-2xl border-2 border-dashed border-sky-300">
                  まだフレーズがないよ。日常会話ゲームで増やそう！
                </div>
              )}
            </div>
          </div>

        </section>
      </div>

      {/* Character Collection */}
      <section className="bg-indigo-50 rounded-3xl p-6 card-shadow border-4 border-indigo-200">
        <h3 className="mb-6 text-xl font-black text-indigo-600 flex items-center gap-2">
          <span>🎁</span> キャラクターコレクション
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {allCharacters.map((char) => {
            const unlocked = progress.stars >= char.threshold;
            const Guide = char.Guide;
            
            return (
              <div key={char.name} className={`relative flex flex-col items-center bg-white rounded-2xl p-4 border-4 transition-all duration-500 ${unlocked ? 'border-indigo-300 hover:-translate-y-2 card-shadow group' : 'border-slate-200 opacity-80'}`}>
                
                <div className={`w-20 h-20 mb-3 transition-transform duration-500 ${unlocked ? 'group-hover:scale-110 drop-shadow-md' : '[filter:grayscale(1)_blur(2px)_opacity(0.5)]'}`}>
                  <Guide className="w-full h-full" />
                </div>
                
                <span className={`font-black text-sm text-center ${unlocked ? 'text-indigo-600' : 'text-slate-400'}`}>
                  {char.name}
                </span>
                
                {!unlocked && (
                  <div className="absolute top-2 right-2 bg-slate-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ⭐{char.threshold}で解放
                  </div>
                )}
                
                {unlocked && (
                  <div className="absolute -top-2 -right-2 text-xl sparkle opacity-0 group-hover:opacity-100 transition-opacity"></div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </Layout>
  );
}
