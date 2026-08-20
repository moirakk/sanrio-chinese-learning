import { useState } from 'react';
import { Check, Mic, RotateCcw, Volume2 } from 'lucide-react';
import { getSpeechRate, speak } from '../utils/speech';

type Step = 'listen' | 'speak' | 'repeat' | 'done';

export default function ShadowPractice({ text }: { text: string }) {
  const [step, setStep] = useState<Step>('listen');

  const play = (next: Step) => {
    speak(text, 'zh-CN', {
      rate: getSpeechRate(),
      onEnd: () => setStep(next),
      onError: () => setStep(next),
    });
  };

  return (
    <div className="mt-3 rounded-2xl border border-sky-100 bg-sky-50 p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-black text-sky-600">まねして言ってみよう</p>
        {step === 'done' ? <span className="text-xs font-black text-emerald-600">できた！</span> : null}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => play('speak')}
          className={`inline-flex items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-black ${step === 'listen' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500'}`}
        >
          <Volume2 className="h-4 w-4" />
          聞く
        </button>
        <button
          type="button"
          onClick={() => setStep('repeat')}
          className={`inline-flex items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-black ${step === 'speak' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500'}`}
        >
          <Mic className="h-4 w-4" />
          言う
        </button>
        <button
          type="button"
          onClick={() => (step === 'done' ? setStep('listen') : play('done'))}
          className={`inline-flex items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-black ${step === 'repeat' ? 'bg-slate-900 text-white' : step === 'done' ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-500'}`}
        >
          {step === 'done' ? <RotateCcw className="h-4 w-4" /> : <Check className="h-4 w-4" />}
          {step === 'done' ? 'もう一回' : '確認'}
        </button>
      </div>
    </div>
  );
}
