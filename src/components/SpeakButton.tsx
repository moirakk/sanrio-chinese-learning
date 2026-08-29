import { useState } from 'react';
import { speak, getSpeechRate } from '../utils/speech';
import type { SpeechLang } from '../types';

interface SpeakButtonProps {
  text: string;
  lang: SpeechLang;
  /** Override current rate preference (optional) */
  rate?: number;
  className?: string;
}

export default function SpeakButton({ text, lang, rate, className = '' }: SpeakButtonProps) {
  const [speaking, setSpeaking] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSpeaking(true);
    speak(text, lang, {
      rate: rate ?? getSpeechRate(),
      onEnd: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="音声を聞く"
      title="音声を聞く"
      className={[
        'inline-flex items-center justify-center rounded-full border transition-all select-none',
        'w-7 h-7 shrink-0',
        speaking
          ? 'bg-pink-300 border-pink-400 speak-pulse'
          : 'bg-pink-100 border-pink-300 hover:bg-pink-200 hover:border-pink-400',
        className,
      ].join(' ')}
    >
      {speaking ? (
        /* Speaker with sound waves */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-pink-600"
          aria-hidden="true"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        /* Speaker icon */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-pink-500"
          aria-hidden="true"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
