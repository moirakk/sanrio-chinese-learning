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

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(() => {
    return (localStorage.getItem('sanrio_profile') as Profile) || 'sister9';
  });

  useEffect(() => {
    localStorage.setItem('sanrio_profile', profile);
  }, [profile]);

  return { profile, setProfile, meta: PROFILE_META[profile] };
}
