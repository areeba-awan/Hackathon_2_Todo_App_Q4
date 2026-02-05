'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { AnimatedDiv } from '@/components/animations';
import Link from 'next/link';
import { login } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { useNoAuthRedirect } from '@/hooks/useAuthRedirect';

export default function LoginPage() {
  useNoAuthRedirect('/dashboard'); // Redirect if already logged in

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login({ email, password });

      if (result.success) {
        addToast({
          title: 'Login Successful',
          description: 'Redirecting to dashboard...',
          type: 'success',
        });

        // Redirect to dashboard immediately
        router.push('/dashboard');
      } else {
        addToast({
          title: 'Login Failed',
          description: result.error?.includes('Incorrect email or password') || result.error?.includes('Invalid credentials')
            ? 'Your email or password is incorrect'
            : result.error || 'Invalid credentials',
          type: 'error',
        });
      }
    } catch (error) {
      addToast({
        title: 'Login Error',
        description: 'An unexpected error occurred',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-4">
      <AnimatedDiv direction="up" delay={0.2}>
        <Card className="w-100 bg-gradient-to-b from-white to-purple-50/50 dark:from-gray-800/50 dark:to-purple-900/20 border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Welcome Back</CardTitle>
            <CardDescription className="text-indigo-800 dark:text-indigo-700  font-bold mt-2">Sign in to your account to continue</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 px-8">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-indigo-800 dark:text-indigo-600 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/50 dark:bg-gray-800/50 border-2 border-purple-200/50 dark:border-purple-800/50 py-6"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-indigo-800 dark:text-indigo-600 font-medium">Password</Label>
                  <Link href="#" className="text-sm text-indigo-600 dark:text-indigo-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/50 dark:bg-gray-800/50 border-2 border-purple-200/50 dark:border-purple-800/50 py-6 pr-12"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col px-8 pb-8">
              <Button
                type="submit"
                className="w-full py-6 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              <p className="mt-6 text-center text-sm text-indigo-800 dark:text-indigo-600 font-bold">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-indigo-600 dark:text-indigo-600 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </AnimatedDiv>
    </div>
  );
}