import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { MelodyGuide, KuromiGuide } from '../assets/characters/characters';

export default function TogetherPage() {
  const navigate = useNavigate();
  return (
    <Layout title="ふたりでチャレンジ！" subtitle="May と Yuna で一緒にあそぼう">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="flex gap-8 mb-8">
           <MelodyGuide className="w-24 h-24 animate-bob" />
           <KuromiGuide className="w-24 h-24 animate-bob" />
        </div>
        <h2 className="text-2xl font-black text-pink-500 mb-8">じゅんびちゅう...</h2>
        <button 
          onClick={() => navigate('/')}
          className="btn-3d bg-pink-100 border-2 border-pink-300 text-pink-600 px-8 py-3 rounded-full font-bold"
        >
          ホームにもどる
        </button>
      </div>
    </Layout>
  );
}
