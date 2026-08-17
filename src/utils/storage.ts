import type { Profile } from '../hooks/useProfile';

type ProgressState = {
  stars: number;
  hearts: number;
  badges: string[];
  clearedGames: string[];
  learnedKanji: string[];
  learnedPhrases: string[];
  unlockedCharacters: string[];
};

const defaultState: ProgressState = {
  stars: 0,
  hearts: 0,
  badges: [],
  clearedGames: [],
  learnedKanji: [],
  learnedPhrases: [],
  unlockedCharacters: ['Kitty風'],
};

function key(profile: Profile) {
  return `sanrio_progress_${profile}`;
}

export function getProgress(profile: Profile): ProgressState {
  const raw = localStorage.getItem(key(profile));
  if (!raw) {
    return defaultState;
  }
  try {
    return { ...defaultState, ...JSON.parse(raw) as ProgressState };
  } catch {
    return defaultState;
  }
}

export function saveProgress(profile: Profile, next: ProgressState) {
  localStorage.setItem(key(profile), JSON.stringify(next));
}

export function addStars(profile: Profile, stars: number, hearts: number = 0) {
  const now = getProgress(profile);
  const updated = { ...now, stars: now.stars + stars, hearts: now.hearts + hearts };
  saveProgress(profile, updated);
}

export function recordGameClear(profile: Profile, gameId: string, bonusStars = 3) {
  const now = getProgress(profile);
  const exists = now.clearedGames.includes(gameId);
  const clearedGames = exists ? now.clearedGames : [...now.clearedGames, gameId];
  const stars = exists ? now.stars : now.stars + bonusStars;
  saveProgress(profile, { ...now, clearedGames, stars });
}

export function updateLearned(profile: Profile, kanji: string[], phrases: string[]) {
  const now = getProgress(profile);
  const learnedKanji = Array.from(new Set([...now.learnedKanji, ...kanji]));
  const learnedPhrases = Array.from(new Set([...now.learnedPhrases, ...phrases]));
  saveProgress(profile, { ...now, learnedKanji, learnedPhrases });
}
