import { Link } from 'react-router-dom';
import { KittyGuide, MelodyGuide, CinnamorollGuide, PompompurinGuide, KuromiGuide, PochaccoGuide } from '../assets/characters/characters';
import Layout from '../components/Layout';
import { useProfile } from '../hooks/useProfile';
import { getProgress } from '../utils/storage';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

export default function Home() {
  const { profile } = useProfile();
  const progress = getProgress(profile);
  const isSister9 = profile === 'sister9';
  const welcomeMessage = isSister9 ? 'いもうとちゃん' : 'おねえちゃん';
  
  const [greeting, setGreeting] = useState('こんにちは');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) {
      setGreeting('おはよう');
    } else if (hour >= 11 && hour < 17) {
      setGreeting('こんにちは');
    } else {
      setGreeting('こんばんは');
    }
  }, []);

  const targetToday = isSister9 ? 20 : 30;
  const rawProgress = Math.round((progress.stars / targetToday) * 100);
  const todayProgress = Math.min(100, isNaN(rawProgress) ? 0 : rawProgress);

  return (
    <Layout title="ホーム" subtitle="ふたり専用の中国語チャレンジ">
      <div className="space-y-6">
        
        {/* Hero Section */}
        <section className="relative rounded-[2rem] bg-white/60 p-6 md:p-8 backdrop-blur-xl border-2 border-white shadow-[0_15px_40px_-10px_rgba(255,183,197,0.4)] flex flex-col md:flex-row items-center gap-6">
          
          <div className="relative w-32 h-32 flex-shrink-0 animate-bob">
            <KittyGuide className="w-full h-full drop-shadow-xl" />
          </div>

          <div className="flex-1 text-center md:text-left relative z-10">
            <div className="chat-bubble left border-2 border-pink-200 shadow-sm inline-block mb-4">
              <h2 className="text-xl md:text-2xl font-black text-pink-500 text-3d leading-tight">
                {greeting}、<span className="text-pink-600">{welcomeMessage}</span>！
              </h2>
              <p className="text-sm md:text-base font-bold text-slate-600 mt-1">
                今日も楽しく中国語を学ぼうね♪
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-4 shadow-inner border border-pink-100 min-w-[140px]">
            <div className="text-sm font-black text-slate-500 mb-2">今日の目標</div>
            
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 36 36" className="w-full h-full drop-shadow-sm">
                <path
                  className="text-pink-100"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-pink-400 drop-shadow-md"
                  strokeWidth="4"
                  strokeDasharray={`${todayProgress}, 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-lg font-black text-pink-500 leading-none">{todayProgress}%</span>
              </div>
            </div>
            
            <div className="mt-2 text-xs font-black text-slate-500 flex gap-2">
              <span className="text-yellow-500 drop-shadow-sm">⭐ {progress.stars}</span>
              <span className="text-red-400 drop-shadow-sm">❤️ {progress.hearts}</span>
            </div>
          </div>
        </section>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ModuleCard 
            to="/pinyin" 
            title="ピンインランド" 
            colorClass="bg-pink-100" 
            borderColor="border-pink-300"
            textColor="text-pink-700"
            desc="My Melodyと発音の練習" 
            guide={<MelodyGuide className="w-full h-full" />} 
            waveColor="fill-pink-200"
            progress={Math.min(100, Math.round((progress.clearedGames.filter(g => g.startsWith('pinyin')).length / 2) * 100) || 0)}
          />
          <ModuleCard 
            to="/kanji" 
            title="漢字アドベンチャー" 
            colorClass="bg-blue-50" 
            borderColor="border-blue-200"
            textColor="text-blue-700"
            desc="Cinnamorollと漢字を学ぶ" 
            guide={<CinnamorollGuide className="w-full h-full" />} 
            waveColor="fill-blue-200"
            progress={Math.min(100, Math.round((progress.clearedGames.filter(g => g.startsWith('kanji')).length / 2) * 100) || 0)}
          />
          <ModuleCard 
            to="/conversation" 
            title="にちじょうかいわ" 
            colorClass="bg-yellow-50" 
            borderColor="border-yellow-300"
            textColor="text-yellow-700"
            desc="Pompompurinと会話する" 
            guide={<PompompurinGuide className="w-full h-full" />} 
            waveColor="fill-yellow-200"
            progress={Math.min(100, Math.round((progress.clearedGames.filter(g => g.startsWith('conv')).length / 2) * 100) || 0)}
          />
          <ModuleCard 
            to="/challenge" 
            title="チャレンジタワー" 
            colorClass="bg-purple-100" 
            borderColor="border-purple-300"
            textColor="text-purple-800"
            desc="Kuromiの総合テスト" 
            guide={<KuromiGuide className="w-full h-full" />} 
            waveColor="fill-purple-200"
            progress={Math.min(100, Math.round((progress.clearedGames.filter(g => g.startsWith('tower')).length / 10) * 100) || 0)}
          />
          <ModuleCard 
            to="/myroom" 
            title="マイルーム" 
            colorClass="bg-emerald-50" 
            borderColor="border-emerald-300"
            textColor="text-emerald-700"
            desc="Pochaccoと成長を確認" 
            guide={<PochaccoGuide className="w-full h-full" />} 
            waveColor="fill-emerald-200"
            progress={progress.unlockedCharacters.length > 0 ? 100 : 50}
          />
        </div>
      </div>
    </Layout>
  );
}

function ModuleCard({
  to,
  title,
  colorClass,
  borderColor,
  textColor,
  desc,
  guide,
  waveColor,
  progress,
}: {
  to: string;
  title: string;
  colorClass: string;
  borderColor: string;
  textColor: string;
  desc: string;
  guide: ReactElement;
  waveColor: string;
  progress: number;
}) {
  return (
    <Link 
      to={to} 
      className={`group relative overflow-hidden flex flex-row items-center rounded-3xl ${colorClass} border-2 ${borderColor} p-4 md:p-5 card-shadow transition-transform duration-300`} 
      aria-label={`${title}へ`}
    >
      <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 z-10 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110 drop-shadow-md">
        {guide}
      </div>
      
      <div className="ml-4 flex-1 z-10">
        <h3 className={`text-lg md:text-xl font-black ${textColor} mb-1 drop-shadow-sm`}>{title}</h3>
        <p className="text-xs md:text-sm font-bold text-slate-600 mb-3">{desc}</p>
        
        <div className="w-full h-2.5 bg-white/60 rounded-full overflow-hidden shadow-inner border border-white/50">
          <div className={`h-full rounded-full ${borderColor.replace('border-', 'bg-')} progress-3d transition-all duration-700 ease-out`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Wave bottom border decoration */}
      <svg className="absolute bottom-0 left-0 w-full h-12 opacity-40 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-in-out" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path className={waveColor} d="M0,10 C30,20 70,0 100,10 L100,20 L0,20 Z" />
      </svg>
    </Link>
  );
}
