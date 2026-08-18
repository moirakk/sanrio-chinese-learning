export type Difficulty = 1 | 2 | 3;

export interface PinyinItem {
  value: string;
  kana: string;
  tipJa: string;
  hint?: string;
  examples?: string;
  difficulty: Difficulty;
}

export interface KanjiItem {
  hanzi: string;
  pinyin: string;
  ja: string;
  strokes: number;
  radical?: string;
  mnemonicJa?: string;
  difficulty: Difficulty;
}

export interface ConversationItem {
  id: string;
  scene: string;
  zh: string;
  ja: string;
  keywords: string[];
  speaker?: string;
  difficulty: Difficulty;
}

export type QuestionKind = 'tone' | 'puzzle' | 'hunt' | 'fill' | 'order' | 'match';
export type Question = { kind: QuestionKind; prompt: string; options: string[]; answer: string };