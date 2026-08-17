export type Difficulty = 1 | 2 | 3;

export interface PinyinItem {
  value: string;
  kana: string;
  tipJa: string;
  difficulty: Difficulty;
}

export interface KanjiItem {
  hanzi: string;
  pinyin: string;
  ja: string;
  strokes: number;
  difficulty: Difficulty;
}

export interface ConversationItem {
  id: string;
  scene: string;
  zh: string;
  ja: string;
  keywords: string[];
  difficulty: Difficulty;
}