import type { Profile } from '../hooks/useProfile';

type ProgressState = {
  stars: number;
  hearts: number;
  badges: string[];
  clearedGames: string[];
  clearedUnits: number[];
  learnedKanji: string[];
  learnedPhrases: string[];
  unlockedCharacters: string[];
  lastPracticeDate?: string;
  streakDays?: number;
};

const defaultState: ProgressState = {
  stars: 0,
  hearts: 0,
  badges: [],
  clearedGames: [],
  clearedUnits: [],
  learnedKanji: [],
  learnedPhrases: [],
  unlockedCharacters: ['Kitty風'],
  streakDays: 0,
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

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function previousDateKey(date: Date) {
  const prev = new Date(date);
  prev.setDate(prev.getDate() - 1);
  return prev.toISOString().slice(0, 10);
}

function withDailyPractice(now: ProgressState): ProgressState {
  const today = todayKey();
  if (now.lastPracticeDate === today) return now;

  const yesterday = previousDateKey(new Date());
  const streakDays = now.lastPracticeDate === yesterday ? (now.streakDays ?? 0) + 1 : 1;
  const badges = streakDays >= 3 && !now.badges.includes('3-day-streak') ? [...now.badges, '3-day-streak'] : now.badges;

  return {
    ...now,
    badges,
    lastPracticeDate: today,
    streakDays,
  };
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

export function isUnitUnlocked(profile: Profile, unitId: number) {
  if (unitId <= 1) return true;
  const now = getProgress(profile);
  return now.clearedUnits.includes(unitId - 1);
}

export function clearUnit(profile: Profile, unitId: number, starsEarned: number, heartsEarned = 0) {
  const now = getProgress(profile);
  const alreadyCleared = now.clearedUnits.includes(unitId);
  const clearedUnits = alreadyCleared ? now.clearedUnits : [...now.clearedUnits, unitId];
  const stars = now.stars + (alreadyCleared ? Math.max(1, Math.floor(starsEarned / 2)) : starsEarned);
  const hearts = now.hearts + heartsEarned;
  saveProgress(profile, withDailyPractice({ ...now, clearedUnits, stars, hearts }));
}
