'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { PasswordInput } from '@/components/forms/PasswordInput';
import { AnimatedDiv } from '@/components/animations';
import Link from 'next/link';
import { register } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { useNoAuthRedirect } from '@/hooks/useAuthRedirect';

export default function SignupPage() {
  useNoAuthRedirect('/dashboard'); // Redirect if already logged in

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      addToast({
        title: 'Password Mismatch',
        description: "Passwords don't match",
        type: 'error',
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await register({ name, email, password });

      if (result.success) {
        addToast({
          title: 'Registration Successful',
          description: 'Account created successfully!',
          type: 'success',
        });

        // Redirect to dashboard immediately
        router.push('/dashboard');
      } else {
        addToast({
          title: 'Registration Failed',
          description: result.error?.includes('Incorrect email or password') || result.error?.includes('Invalid credentials')
            ? 'Your email or password is incorrect'
            : result.error || 'Unable to create account',
          type: 'error',
        });
      }
    } catch (error) {
      addToast({
        title: 'Registration Error',
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Create Account</CardTitle>
            <CardDescription className="text-indigo-800 dark:text-indigo-300 mt-2">Sign up to get started with our todo app</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 px-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-indigo-800 dark:text-indigo-300 font-medium">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white/50 dark:bg-gray-800/50 border-2 border-purple-200/50 dark:border-purple-800/50 py-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-indigo-800 dark:text-indigo-300 font-medium">Email</Label>
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
                <Label htmlFor="password" className="text-indigo-800 dark:text-indigo-300 font-medium">Password</Label>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/50 dark:bg-gray-800/50 border-2 border-purple-200/50 dark:border-purple-800/50 py-6 pr-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-indigo-800 dark:text-indigo-300 font-medium">Confirm Password</Label>
                <PasswordInput
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
              <p className="mt-6 text-center text-sm text-indigo-800 dark:text-indigo-300 font-medium">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </AnimatedDiv>
    </div>
  );
}