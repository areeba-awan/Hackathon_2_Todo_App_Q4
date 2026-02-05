'use client';

import { ThemeProvider } from '@/hooks/ThemeProvider';
import { ToastSystem } from '@/components/feedback/ToastSystem';
import { AuthProvider } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

interface AppWrapperProps {
  children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
        <ToastSystem />
      </ThemeProvider>
    </AuthProvider>
  );
}