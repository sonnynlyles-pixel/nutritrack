import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile } from '../types';
import { localToday } from '../utils/nutrition';

const defaultProfile: UserProfile = {
  name: '',
  age: 30,
  gender: 'male',
  heightFt: 5,
  heightIn: 10,
  currentWeight: 180,
  goalWeight: 160,
  activityLevel: 'moderately',
  weightGoal: 'lose',
  goalRateLbs: 1,
  calorieGoal: 2000,
  macroTargets: { protein: 150, carbs: 200, fat: 65 },
  waterGoalOz: 64,
  setupComplete: false,
};

interface AppStore {
  profile: UserProfile;
  setProfile: (p: Partial<UserProfile>) => void;
  selectedDate: string; // YYYY-MM-DD
  setSelectedDate: (d: string) => void;
  usdaApiKey: string;
  setUsdaApiKey: (k: string) => void;
}

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      setProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
      selectedDate: localToday(),
      setSelectedDate: (d) => set({ selectedDate: d }),
      usdaApiKey: 'DEMO_KEY',
      setUsdaApiKey: (k) => set({ usdaApiKey: k }),
    }),
    {
      name: 'nutritrack-store',
      // selectedDate should always start as today — never restore a stale date from storage
      partialize: (s) => ({ profile: s.profile, usdaApiKey: s.usdaApiKey }),
    }
  )
);
