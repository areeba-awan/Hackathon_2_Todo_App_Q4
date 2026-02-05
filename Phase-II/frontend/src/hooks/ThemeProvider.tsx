'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

import { ThemeContext } from './useTheme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeMode>('light'); // Default to light for SSR consistency
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Determine initial theme based on saved preference, system preference, or default to dark
      const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark'); // Default to dark

      // Apply theme to document
      document.documentElement.setAttribute('data-theme', initialTheme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(initialTheme);

      // Update state after DOM manipulation
      setThemeState(initialTheme);
    }

    // Set mounted to true after initial theme is applied
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Update document attribute when theme changes
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);

    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const themeValue = { theme, toggleTheme, setTheme };

  return (
    <ThemeContext.Provider value={themeValue}>
      {mounted ? children : <div className="opacity-0">{children}</div>}
    </ThemeContext.Provider>
  );
};

