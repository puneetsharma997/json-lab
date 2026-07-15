import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'system', // Options: 'light', 'dark', 'system'
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'json-lab-theme', // this name will saved in local storage
    }
  )
);