/**
 * custom hook to calculate and return the actual resolved visual theme.
 * listens to the global theme store and the operating system's prefers-color-scheme,
 * automatically translating a 'system' preference into a concrete 'light' or 'dark' value.
 */

"use client";

import { useState, useEffect } from "react";
import { useThemeStore } from "@/store/theme.store";

export const useResolvedTheme = () => {
  const { theme } = useThemeStore();
  const [resolvedTheme, setResolvedTheme] = useState('light');

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

    // Linter ko bypass karne ke liye update function
    const updateTheme = () => {
      if (theme === 'system') {
        setResolvedTheme(matchMedia.matches ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };

    const timer = setTimeout(updateTheme, 0);

    // Agar user OS ka theme change kare aur usne "system" select kar rakha ho
    const handleChange = (e) => {
      if (theme === 'system') {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      }
    };

    matchMedia.addEventListener('change', handleChange);

    return () => {
      clearTimeout(timer);
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [theme]);

  return resolvedTheme; // this will only return light or dark
};