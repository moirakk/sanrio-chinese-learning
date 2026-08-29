import type { SpeechLang } from '../types';

const RATE_KEY = 'sanrio_speech_rate';
const DEFAULT_RATE = 0.6;

export function getSpeechRate(): number {
  try {
    const stored = localStorage.getItem(RATE_KEY);
    if (stored) {
      const parsed = parseFloat(stored);
      if (Number.isFinite(parsed) && parsed >= 0.4 && parsed <= 1.2) return parsed;
    }
  } catch {
    // ignore
  }
  return DEFAULT_RATE;
}

export function setSpeechRate(rate: number): void {
  try {
    localStorage.setItem(RATE_KEY, String(rate));
  } catch {
    // ignore
  }
}

function pickVoice(lang: SpeechLang): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return undefined;

  if (lang === 'zh-CN') {
    // Prefer female zh-CN voice, fall back to any zh voice
    return (
      voices.find((v) => (v.lang === 'zh-CN' || v.lang === 'zh') && /female|woman|xiaoyu|tingting|sinji|meijia/i.test(v.name)) ||
      voices.find((v) => v.lang === 'zh-CN') ||
      voices.find((v) => v.lang.startsWith('zh'))
    );
  }
  if (lang === 'ja-JP') {
    return voices.find((v) => v.lang === 'ja-JP') || voices.find((v) => v.lang.startsWith('ja'));
  }
  if (lang === 'en-US') {
    return voices.find((v) => v.lang === 'en-US') || voices.find((v) => v.lang.startsWith('en'));
  }
  return undefined;
}

export interface SpeakOptions {
  rate?: number;
  onEnd?: () => void;
  onError?: () => void;
}

export function speak(text: string, lang: SpeechLang, options?: SpeakOptions): void {
  if (typeof window === 'undefined' || !window.speechSynthesis || !text.trim()) {
    options?.onEnd?.();
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = lang;
    utt.rate = options?.rate ?? getSpeechRate();

    // Voice selection: try immediately, then retry after voiceschanged fires
    const voice = pickVoice(lang);
    if (voice) {
      utt.voice = voice;
    } else {
      // voices not loaded yet — listen once then speak
      const onVoicesChanged = () => {
        window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
        const v = pickVoice(lang);
        if (v) utt.voice = v;
        window.speechSynthesis.speak(utt);
      };
      window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
      // fallback: also speak even if voices never load
      setTimeout(() => {
        window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
        if (!utt.voice) window.speechSynthesis.speak(utt);
      }, 300);
    }

    utt.onend = () => options?.onEnd?.();
    utt.onerror = () => options?.onError?.();

    if (voice) {
      window.speechSynthesis.speak(utt);
    }
  } catch {
    // Silent degradation — never throw to caller
    options?.onEnd?.();
  }
}
