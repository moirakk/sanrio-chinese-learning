import type { Profile } from '../hooks/useProfile';

type ProgressState = {
  stars: number;
  hearts: number;
  badges: string[];
  clearedUnits: number[];
  learnedKanji: string[];
  learnedPhrases: string[];
  reviewItems: ReviewItem[];
  lastPracticeDate?: string;
  streakDays?: number;
};

export type DailyAssignment = {
  date: string;
  unitId: number;
};

export type ReviewItem = {
  id: string;
  unitId: number;
  kind: string;
  prompt: string;
  answer: string;
  options: string[];
  misses: number;
  correctStreak?: number;
  lastMissedAt: number;
  nextReviewAt?: number;
  masteredAt?: number;
};

function defaultProgress(): ProgressState {
  return {
    stars: 0,
    hearts: 0,
    badges: [],
    clearedUnits: [],
    learnedKanji: [],
    learnedPhrases: [],
    reviewItems: [],
    streakDays: 0,
  };
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function asNumberArray(value: unknown): number[] {
  return Array.isArray(value) ? value.filter((item): item is number => Number.isFinite(item)) : [];
}

function asReviewItems(value: unknown): ReviewItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is ReviewItem => {
    if (!item || typeof item !== 'object') return false;
    const candidate = item as Partial<ReviewItem>;
    return (
      typeof candidate.id === 'string' &&
      typeof candidate.unitId === 'number' &&
      typeof candidate.kind === 'string' &&
      typeof candidate.prompt === 'string' &&
      typeof candidate.answer === 'string' &&
      Array.isArray(candidate.options) &&
      typeof candidate.misses === 'number' &&
      typeof candidate.lastMissedAt === 'number'
    );
  });
}

function normalizeProgress(value: unknown): ProgressState {
  const base = defaultProgress();
  if (!value || typeof value !== 'object') return base;
  const parsed = value as Partial<ProgressState>;
  return {
    stars: Number.isFinite(parsed.stars) ? parsed.stars as number : base.stars,
    hearts: Number.isFinite(parsed.hearts) ? parsed.hearts as number : base.hearts,
    badges: asStringArray(parsed.badges),
    clearedUnits: asNumberArray(parsed.clearedUnits),
    learnedKanji: asStringArray(parsed.learnedKanji),
    learnedPhrases: asStringArray(parsed.learnedPhrases),
    reviewItems: asReviewItems(parsed.reviewItems),
    lastPracticeDate: typeof parsed.lastPracticeDate === 'string' ? parsed.lastPracticeDate : undefined,
    streakDays: Number.isFinite(parsed.streakDays) ? parsed.streakDays as number : base.streakDays,
  };
}

function key(profile: Profile) {
  return `sanrio_progress_${profile}`;
}

function assignmentKey(profile: Profile) {
  return `sanrio_assignment_${profile}`;
}

export function getProgress(profile: Profile): ProgressState {
  try {
    const raw = localStorage.getItem(key(profile));
    return raw ? normalizeProgress(JSON.parse(raw)) : defaultProgress();
  } catch {
    return defaultProgress();
  }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function asDailyAssignment(value: unknown): DailyAssignment | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const candidate = value as Partial<DailyAssignment>;
  if (typeof candidate.date !== 'string' || typeof candidate.unitId !== 'number' || !Number.isFinite(candidate.unitId)) {
    return undefined;
  }
  return { date: candidate.date, unitId: candidate.unitId };
}

export function getDailyAssignment(profile: Profile): DailyAssignment | undefined {
  try {
    const raw = localStorage.getItem(assignmentKey(profile));
    const parsed = raw ? asDailyAssignment(JSON.parse(raw)) : undefined;
    return parsed?.date === todayKey() ? parsed : undefined;
  } catch {
    return undefined;
  }
}

export function setDailyAssignment(profile: Profile, unitId: number) {
  try {
    localStorage.setItem(assignmentKey(profile), JSON.stringify({ date: todayKey(), unitId }));
  } catch {
    // The recommendation flow falls back to normal unit order when storage is blocked.
  }
}

export function clearDailyAssignment(profile: Profile) {
  try {
    localStorage.removeItem(assignmentKey(profile));
  } catch {
    // Nothing else needs to change if storage is unavailable.
  }
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
  try {
    localStorage.setItem(key(profile), JSON.stringify(normalizeProgress(next)));
  } catch {
    // Ignore storage failures so practice flow never crashes.
  }
}

export function updateLearned(profile: Profile, kanji: string[], phrases: string[]) {
  const now = getProgress(profile);
  const learnedKanji = Array.from(new Set([...now.learnedKanji, ...kanji]));
  const learnedPhrases = Array.from(new Set([...now.learnedPhrases, ...phrases]));
  saveProgress(profile, { ...now, learnedKanji, learnedPhrases });
}

export function recordReviewMiss(profile: Profile, item: Omit<ReviewItem, 'id' | 'misses' | 'lastMissedAt'>) {
  const now = getProgress(profile);
  const id = `${item.unitId}:${item.kind}:${item.prompt}:${item.answer}`;
  const existing = now.reviewItems.find((x) => x.id === id);
  const nextItem: ReviewItem = {
    ...item,
    id,
    misses: (existing?.misses ?? 0) + 1,
    correctStreak: 0,
    lastMissedAt: Date.now(),
    nextReviewAt: Date.now(),
    masteredAt: undefined,
  };
  const reviewItems = [nextItem, ...now.reviewItems.filter((x) => x.id !== id)].slice(0, 40);
  saveProgress(profile, { ...now, reviewItems });
}

export function markReviewMastered(profile: Profile, id: string) {
  const now = getProgress(profile);
  const reviewItems = now.reviewItems.map((item) => {
    if (item.id !== id) return item;
    const correctStreak = (item.correctStreak ?? 0) + 1;
    const delayDays = correctStreak === 1 ? 1 : correctStreak === 2 ? 3 : 7;
    return {
      ...item,
      correctStreak,
      masteredAt: correctStreak >= 3 ? Date.now() : undefined,
      nextReviewAt: Date.now() + delayDays * 24 * 60 * 60 * 1000,
    };
  });
  saveProgress(profile, { ...now, reviewItems });
}

export function getActiveReviewItems(profile: Profile) {
  const now = Date.now();
  return getProgress(profile)
    .reviewItems
    .filter((item) => !item.masteredAt && (item.nextReviewAt ?? 0) <= now)
    .sort((a, b) => b.misses - a.misses || (a.nextReviewAt ?? 0) - (b.nextReviewAt ?? 0));
}

export function getScheduledReviewItems(profile: Profile) {
  return getProgress(profile)
    .reviewItems
    .filter((item) => !item.masteredAt)
    .sort((a, b) => (a.nextReviewAt ?? 0) - (b.nextReviewAt ?? 0));
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
  const stars = alreadyCleared ? now.stars : now.stars + starsEarned;
  const hearts = alreadyCleared ? now.hearts : now.hearts + heartsEarned;
  saveProgress(profile, withDailyPractice({ ...now, clearedUnits, stars, hearts }));
}
