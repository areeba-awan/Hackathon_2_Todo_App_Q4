'use client';

import { useEffect, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface ProtectedRouteProps {
  children: ReactNode;
  fallbackUrl?: string;
}

const ProtectedRoute = ({ children, fallbackUrl = '/auth/login' }: ProtectedRouteProps) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null means still checking

  useEffect(() => {
    // Check if running in browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');

      if (!token) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // If still checking authentication, don't render anything (prevents flickering)
  if (isAuthenticated === null) {
    return null;
  }

  // If not authenticated, show a message with a login button
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">🔒</div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Authentication Required</h2>
          <p className="text-foreground/80 mb-6">
            You need to be logged in to access this page and manage your tasks.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
              <Link href={fallbackUrl}>Login to Continue</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;