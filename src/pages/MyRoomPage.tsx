import Layout from '../components/Layout';
import { KittyGuide, MelodyGuide, CinnamorollGuide, PompompurinGuide, KuromiGuide, PochaccoGuide } from '../assets/characters/characters';
import { useProfile } from '../hooks/useProfile';
import { getProgress } from '../utils/storage';
import { useMemo, useState, useRef, useEffect } from 'react';

type RoomTab = 'growth' | 'words' | 'data' | 'board';
type BoardMessage = { sender: string, sticker: string, emoji: string, label: string, message: string, timestamp: number };

const allCharacters = [
  { name: 'Kitty風', Guide: KittyGuide, threshold: 0 },
  { name: 'Melody風', Guide: MelodyGuide, threshold: 10 },
  { name: 'Cinnamoroll風', Guide: CinnamorollGuide, threshold: 20 },
  { name: 'Pompompurin風', Guide: PompompurinGuide, threshold: 30 },
  { name: 'Kuromi風', Guide: KuromiGuide, threshold: 40 },
  { name: 'Pochacco風', Guide: PochaccoGuide, threshold: 50 },
];

const dailyQuotes = [
  { zh: '天天向上！', en: 'Keep growing every day!', ja: '日々向上しよう！' },
  { zh: '你是最棒的！', en: 'You are amazing!', ja: 'きみが一番だよ！' },
  { zh: '加油，继续努力！', en: 'Keep going!', ja: 'がんばれ、その調子！' },
  { zh: '熟能生巧', en: 'Practice makes perfect.', ja: '継続は力なり' },
  { zh: '太厉害了！', en: 'That was awesome!', ja: 'すごすぎる！' }
];

const stickersOptions = [
  { id: 'kitty', emoji: '💕', label: 'がんばって！', Guide: KittyGuide },
  { id: 'melody', emoji: '🎵', label: 'いっしょに頑張ろう！', Guide: MelodyGuide },
  { id: 'cinnamoroll', emoji: '☁️', label: 'すごいね！', Guide: CinnamorollGuide },
  { id: 'pompompurin', emoji: '🍮', label: 'おつかれさま！', Guide: PompompurinGuide },
  { id: 'kuromi', emoji: '💜', label: '負けないよ！', Guide: KuromiGuide },
  { id: 'pochacco', emoji: '⚽', label: 'ファイト！', Guide: PochaccoGuide },
];

function readBoardMessages(): BoardMessage[] {
  try {
    const data = localStorage.getItem('sanrio_messageboard');
    const parsed = data ? JSON.parse(data) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((message): message is BoardMessage => (
      message &&
      typeof message === 'object' &&
      typeof message.sender === 'string' &&
      typeof message.sticker === 'string' &&
      typeof message.emoji === 'string' &&
      typeof message.label === 'string' &&
      typeof message.message === 'string' &&
      typeof message.timestamp === 'number'
    ));
  } catch {
    return [];
  }
}

export default function MyRoomPage() {
  const { profile, meta } = useProfile();
  const progress = getProgress(profile);
  const [activeTab, setActiveTab] = useState<RoomTab>('growth');
  
  const quote = useMemo(() => dailyQuotes[new Date().getDay() % dailyQuotes.length], []);

  const starGoal = 100;
  const heartGoal = 50;
  const badgeGoal = 20;

  const starPct = Math.min(100, Math.round((progress.stars / starGoal) * 100));
  const heartPct = Math.min(100, Math.round((progress.hearts / heartGoal) * 100));
  const badgePct = Math.min(100, Math.round(((progress.clearedUnits.length) / badgeGoal) * 100));

  // --- Save / Load Logic ---
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  const handleSave = () => {
    const data = localStorage.getItem(`sanrio_progress_${profile}`);
    if (!data) return;
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const date = new Date().toISOString().slice(0,10).replace(/-/g, '');
    const name = profile === 'sister9' ? 'may' : 'yuna';
    a.download = `${name}_progress_${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    setSaveFeedback('セーブ完了！✨');
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  const handleLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && Array.isArray(json.clearedUnits) && typeof json.stars === 'number') {
          if (window.confirm('今のデータを上書きするよ。いい？')) {
            localStorage.setItem(`sanrio_progress_${profile}`, JSON.stringify(json));
            window.location.reload();
          }
        } else {
          alert('ファイルが読めないよ 😢');
        }
      } catch {
        alert('ファイルが読めないよ 😢');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // --- Message Board Logic ---
  const [messages, setMessages] = useState<BoardMessage[]>([]);
  const [composing, setComposing] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [viewingBoard, setViewingBoard] = useState(false);
  const [sentFeedback, setSentFeedback] = useState(false);

  useEffect(() => {
    setMessages(readBoardMessages());
  }, []);

  const handlePostMessage = () => {
    if (selectedSticker === null) return;
    
    const existing = readBoardMessages();
    
    const newMessage = {
      sender: profile === 'sister9' ? 'May' : 'Yuna',
      sticker: stickersOptions[selectedSticker].id,
      emoji: stickersOptions[selectedSticker].emoji,
      label: stickersOptions[selectedSticker].label,
      message: messageText,
      timestamp: Date.now()
    };
    
    const updatedMessages = [newMessage, ...existing].slice(0, 20);
    try {
      localStorage.setItem('sanrio_messageboard', JSON.stringify(updatedMessages));
    } catch {
      // Keep the board visible even if the browser refuses storage writes.
    }
    setMessages(updatedMessages);
    
    setComposing(false);
    setSelectedSticker(null);
    setMessageText('');
    setSentFeedback(true);
    setTimeout(() => setSentFeedback(false), 3000);
  };

  return (
    <Layout title="マイルーム" subtitle="ことばの成長記録をチェック">
      
      {/* Top Banner & Quote */}
      <section className="mb-8 rounded-3xl glass-panel p-5 flex flex-col md:flex-row items-center gap-4 relative overflow-hidden border-2 border-emerald-200">
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-emerald-300 opacity-20 rounded-full blur-2xl"></div>
        <PochaccoGuide className="h-24 w-24 flex-shrink-0 animate-bob drop-shadow-md" />
        <div className="chat-bubble left border border-emerald-200 shadow-sm relative z-10 w-full flex-1 flex justify-between items-center bg-white/80">
          <div>
            <p className="font-black text-emerald-700 text-lg mb-1">今日の一言 🌟</p>
            <p className="text-xl md:text-2xl font-black text-emerald-600 font-serif tracking-widest">{quote.zh}</p>
            <p className="text-base font-black text-sky-600 mt-1">{quote.en}</p>
            <p className="text-sm font-bold text-slate-500 mt-1">{quote.ja}</p>
          </div>
        </div>
      </section>

      <div className="mb-6 grid grid-cols-4 gap-2 rounded-[1.5rem] border border-white/80 bg-white/80 p-2 shadow-sm">
        {[
          { id: 'growth', label: '成長' },
          { id: 'words', label: 'コレクション' },
          { id: 'data', label: 'データ' },
          { id: 'board', label: 'けいじばん' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as RoomTab)}
            className={`rounded-2xl px-3 py-3 text-sm font-black transition-all ${
              activeTab === tab.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'growth' && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Circular Dashboard */}
        <section className="col-span-1 bg-white rounded-3xl p-6 card-shadow border-4 border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
          <h3 className="mb-4 text-xl font-black text-slate-700">成長メーター</h3>
          
          <div className="relative w-48 h-48 drop-shadow-sm">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="28" fill="none" stroke="#f1f5f9" strokeWidth="6" />
              <circle cx="50" cy="50" r="28" fill="none" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" 
                strokeDasharray={`${(badgePct / 100) * (2 * Math.PI * 28)} 1000`} className="transition-all duration-1000 delay-500" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#f43f5e" strokeWidth="8" strokeLinecap="round" 
                strokeDasharray={`${(heartPct / 100) * (2 * Math.PI * 38)} 1000`} className="transition-all duration-1000 delay-300" />
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
              <span className="text-slate-700">{progress.clearedUnits.length}ユニット</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold bg-rose-50 px-4 py-2 rounded-xl border border-rose-100">
              <span className="text-rose-500">🔥 れんぞく</span>
              <span className="text-slate-700">{progress.streakDays ?? 0}日</span>
            </div>
          </div>
        </section>

        {/* Kanji & Phrases Book */}
        <section className="col-span-2 flex flex-col gap-6">
          <div className="bg-emerald-50 rounded-3xl p-6 card-shadow border-4 border-emerald-200 flex-1">
            <h3 className="mb-4 text-xl font-black text-emerald-600 flex items-center gap-2">
              <span>📖</span> 覚えたことばアルバム
            </h3>
            <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4 snap-x px-1">
              {progress.learnedKanji.length > 0 ? (
                progress.learnedKanji.map((k) => (
                  <div key={k} className="snap-center flex-shrink-0 w-24 h-32 bg-[#faf7f2] border-4 border-[#5c4a3d] rounded-xl flex flex-col items-center justify-center card-shadow relative overflow-hidden group hover:scale-105 transition-transform">
                    <span className="text-5xl font-black text-[#2b221a] font-serif">{k}</span>
                  </div>
                ))
              ) : (
                <div className="w-full py-8 text-center text-emerald-500 font-bold bg-white/50 rounded-2xl border-2 border-dashed border-emerald-300">
                  まだことばを覚えていないよ。レッスンで中国語と英語を集めよう！
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
      </div>}

      {activeTab === 'data' && <div className="grid grid-cols-1 gap-6 mb-8">
        {/* Save/Load Area */}
        <section className="rounded-3xl bg-orange-50 border-2 border-orange-200 p-6 card-shadow">
          <h3 className="text-xl font-black text-orange-600 mb-1">セーブ / ロード</h3>
          <p className="mb-4 text-sm font-bold text-orange-500">{meta.label} のデータだけを保存・読み込みします</p>
          <div className="flex gap-4">
            <button onClick={handleSave} className="flex-1 bg-white border-2 border-orange-300 rounded-2xl py-3 font-bold text-orange-500 btn-3d relative">
              💾 {meta.label} をセーブ
              {saveFeedback && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap animate-bounce">{saveFeedback}</span>}
            </button>
            <input type="file" ref={fileInputRef} accept=".json" onChange={handleLoad} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-white border-2 border-orange-300 rounded-2xl py-3 font-bold text-orange-500 btn-3d">
              📂 {meta.label} にロード
            </button>
          </div>
        </section>
      </div>}

      {activeTab === 'board' && composing && (
        <section className="bg-white rounded-3xl p-6 card-shadow border-4 border-rose-200 mb-8 relative">
          <button onClick={() => setComposing(false)} className="absolute top-4 right-4 text-slate-400 font-bold">✕</button>
          <h4 className="text-lg font-black text-rose-500 mb-4">なにをかく？</h4>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
            {stickersOptions.map((s, i) => {
              const Guide = s.Guide;
              return (
                <button 
                  key={s.id} 
                  onClick={() => setSelectedSticker(i)}
                  className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all ${selectedSticker === i ? 'border-rose-400 bg-rose-50 scale-105' : 'border-slate-100 hover:border-rose-200'}`}
                >
                  <Guide className="w-12 h-12 mb-1 drop-shadow-sm" />
                  <span className="text-2xl">{s.emoji}</span>
                  <span className="text-[10px] font-bold text-slate-500 mt-1">{s.label}</span>
                </button>
              )
            })}
          </div>
          <div className="flex gap-4">
            <input 
              type="text" 
              value={messageText}
              onChange={e => setMessageText(e.target.value.slice(0, 20))}
              placeholder="メッセージを書いてね（20文字まで）"
              className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2 font-bold focus:outline-none focus:border-rose-400"
            />
            <button 
              onClick={handlePostMessage}
              disabled={selectedSticker === null}
              className="bg-rose-500 text-white font-black px-6 py-2 rounded-xl btn-3d disabled:opacity-50"
            >
              かきこむ！
            </button>
          </div>
        </section>
      )}

      {activeTab === 'board' && viewingBoard && (
        <section className="bg-white rounded-3xl p-6 card-shadow border-4 border-rose-200 mb-8 relative">
          <button onClick={() => setViewingBoard(false)} className="absolute top-4 right-4 text-slate-400 font-bold">✕</button>
          <h4 className="text-lg font-black text-rose-500 mb-4">けいじばん</h4>
          
          {messages.length === 0 ? (
            <p className="text-slate-500 font-bold text-center py-4">まだかきこみはないよ</p>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((m, i) => (
                <div key={i} className="flex gap-4 bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 animate-in slide-in-from-bottom-2">
                  <div className="text-4xl">{m.emoji}</div>
                  <div>
                    <div className="font-black text-rose-600 mb-1">{m.label}</div>
                    <div className="text-slate-600 font-bold text-sm bg-white p-2 rounded-xl border border-rose-100">{m.message || '（メッセージなし）'}</div>
                    <div className="text-xs text-slate-400 font-bold mt-1">
                      {m.sender} から • {new Date(m.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'board' && !composing && !viewingBoard && (
        <section className="rounded-3xl bg-rose-50 border-2 border-rose-200 p-6 card-shadow mb-8">
          <h3 className="text-xl font-black text-rose-600 mb-4">けいじばん</h3>
          <div className="flex gap-4">
            <button onClick={() => {setComposing(true); setViewingBoard(false);}} className="flex-1 bg-white border-2 border-rose-300 rounded-2xl py-3 font-bold text-rose-500 btn-3d relative">
              💌 かく
              {sentFeedback && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap animate-bounce">かきこんだよ！💌</span>}
            </button>
            <button onClick={() => setViewingBoard(true)} className="flex-1 bg-white border-2 border-rose-300 rounded-2xl py-3 font-bold text-rose-500 btn-3d relative">
              📫 みる
            </button>
          </div>
        </section>
      )}

      {activeTab === 'words' && <section className="bg-indigo-50 rounded-3xl p-6 card-shadow border-4 border-indigo-200">
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
      </section>}

    </Layout>
  );
}
