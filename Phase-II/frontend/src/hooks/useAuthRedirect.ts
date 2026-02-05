import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Custom hook to protect routes that require authentication
export const useAuthRedirect = (redirectTo: string = '/dashboard') => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      router.replace(redirectTo); // Using replace to prevent back navigation to protected route
    }
    setIsLoading(false);
  }, [router, redirectTo]);

  return { isLoading };
};

// Custom hook to protect routes that require no authentication (like login/signup)
export const useNoAuthRedirect = (redirectTo: string = '/dashboard') => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      router.replace(redirectTo); // Using replace to prevent back navigation to auth pages
    }
    setIsLoading(false);
  }, [router, redirectTo]);

  return { isLoading };
};