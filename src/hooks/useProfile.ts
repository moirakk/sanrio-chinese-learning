import { useState, useEffect } from 'react';

export type Profile = 'sister12' | 'sister9';
export type DifficultyLevel = 1 | 2 | 3;

export interface ProfileMeta {
  id: Profile;
  label: string;
  routeName: string;
  description: string;
  accent: 'rose' | 'violet';
  greeting: string;
  defaultTimerSec: number;
  uiMode: 'simple' | 'dense';
}

export const PROFILE_META: Record<Profile, ProfileMeta> = {
  sister9: {
    id: 'sister9',
    label: 'May',
    routeName: 'やさしいルート',
    description: '大きいボタン、やさしい問題、ゆっくりタイマー',
    accent: 'rose',
    greeting: 'May のおへや',
    defaultTimerSec: 45,
    uiMode: 'simple',
  },
  sister12: {
    id: 'sister12',
    label: 'Yuna',
    routeName: 'チャレンジルート',
    description: '問題多め、会話長め、タイマー短め',
    accent: 'violet',
    greeting: 'Yuna のおへや',
    defaultTimerSec: 30,
    uiMode: 'dense',
  },
};

export function isProfile(value: unknown): value is Profile {
  return value === 'sister9' || value === 'sister12';
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(() => {
    try {
      const stored = localStorage.getItem('sanrio_profile');
      return isProfile(stored) ? stored : 'sister9';
    } catch {
      return 'sister9';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sanrio_profile', profile);
    } catch {
      // Keep the app usable even when storage is blocked.
    }
  }, [profile]);

  return { profile, setProfile, meta: PROFILE_META[profile] };
}
