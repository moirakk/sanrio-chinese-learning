
import { useProfile } from '../hooks/useProfile';

export default function Home() {
  const { profile, setProfile } = useProfile();
  
  const isSister9 = profile === 'sister9';
  const welcomeMessage = isSister9 ? 'いもうとちゃん' : 'おねえちゃん';
  const stars = localStorage.getItem(`stars_${profile}`) || '0';

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12 bg-white/80 p-4 rounded-3xl card-shadow backdrop-blur-sm">
          <div className="flex items-center gap-4">
            {/* Custom Hello Kitty SVG placeholder */}
            <div className="w-16 h-16 bg-sanrio-pink rounded-full flex items-center justify-center text-white font-bold text-xs">Kitty</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-pink-500">ここはふたりの中国語ランドだよ！</h1>
              <p className="text-lg font-medium text-slate-600">ようこそ、<span className="text-pink-600 font-bold">{welcomeMessage}</span>！</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="bg-yellow-100 px-4 py-2 rounded-full text-yellow-600 font-bold flex items-center gap-2">
              ⭐ {stars}
            </div>
            <select 
              value={profile}
              onChange={(e) => setProfile(e.target.value as 'sister12' | 'sister9')}
              className="bg-pink-100 text-pink-700 font-bold px-4 py-2 rounded-xl outline-none cursor-pointer"
            >
              <option value="sister9">👧 妹 (9歳)</option>
              <option value="sister12">👩 姉 (12歳)</option>
            </select>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ModuleCard title="ピンインランド" color="bg-sanrio-pink" icon="🎵" desc="My Melodyと発音の練習" />
          <ModuleCard title="漢字アドベンチャー" color="bg-sanrio-blue" icon="✍️" desc="Cinnamorollと漢字を学ぶ" />
          <ModuleCard title="にちじょうかいわ" color="bg-yellow-300" icon="💬" desc="Pompompurinとお話しする" />
          <ModuleCard title="チャレンジタワー" color="bg-purple-300" icon="👑" desc="Kuromiのテストに挑戦！" />
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ title, color, icon, desc }: { title: string, color: string, icon: string, desc: string }) {
  return (
    <div className={`${color} rounded-3xl p-6 card-shadow transform transition-transform hover:-translate-y-2 cursor-pointer flex flex-col items-center text-center`}>
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-2xl font-bold text-white drop-shadow-md mb-2">{title}</h2>
      <p className="text-white/90 font-medium">{desc}</p>
    </div>
  );
}
