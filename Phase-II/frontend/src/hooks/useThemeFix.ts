'use client';

import { useState, useEffect } from 'react';

// Custom hook to handle theme with proper hydration
export const useThemeFix = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Default to light for SSR
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Client-side: get the actual theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark'); // Default to dark
    
    setTheme(initialTheme);
    setIsMounted(true);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', initialTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Update document
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
  };

  const setNewTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    
    // Update document
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
  };

  return { theme, toggleTheme, setNewTheme, isMounted };
};