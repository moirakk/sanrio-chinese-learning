import { useState, useEffect } from 'react';

export type Profile = 'sister12' | 'sister9';

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(() => {
    return (localStorage.getItem('sanrio_profile') as Profile) || 'sister9';
  });

  useEffect(() => {
    localStorage.setItem('sanrio_profile', profile);
  }, [profile]);

  return { profile, setProfile };
}
