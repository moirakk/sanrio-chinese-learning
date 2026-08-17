import { useState } from 'react';

export default function FlipGameCard({
  title,
  front,
  back,
  onStart,
  completed,
}: {
  title: string;
  front: string;
  back: string;
  onStart?: () => void;
  completed?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setFlipped((v) => !v);
        if (!flipped && onStart) onStart();
      }}
      aria-label={`${title}カードをめくる`}
      className="group h-44 w-full [perspective:1000px] hover:scale-[1.01] transition-transform"
    >
      <div className={`relative h-full w-full rounded-3xl transition-transform duration-500 [transform-style:preserve-3d] card-shadow ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
        <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-4 bg-gradient-to-b from-white to-pink-50 p-4 text-center [backface-visibility:hidden] ${completed ? 'border-yellow-400' : 'border-pink-200'}`}>
          <p className="mb-1 text-sm font-bold text-pink-500 text-3d">{title}</p>
          <p className="text-xl font-bold text-slate-700">{front}</p>
          {completed && <p className="mt-2 text-sm font-bold text-yellow-500 text-3d">クリア済み ⭐</p>}
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-3xl border-4 border-sky-300 bg-gradient-to-br from-sky-50 to-sky-100 p-4 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="font-bold text-slate-700">{back}</p>
        </div>
      </div>
    </button>
  );
}
