'use client';

import { ThemeProvider } from '@/hooks/ThemeProvider';
import { ReactNode, useState, useEffect } from 'react';

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a placeholder during SSR/client hydration
    return <div>{children}</div>;
  }

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};