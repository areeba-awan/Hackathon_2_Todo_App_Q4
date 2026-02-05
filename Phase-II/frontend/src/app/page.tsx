'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AnimatedDiv } from '@/components/animations';
import { useTheme } from '@/hooks/useTheme';
import FloatingParticles from '@/components/ui/FloatingParticles';

export default function HomePage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 text-foreground">
      {/* Hero Section with Enhanced Animation */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-pink-900/10"></div>
          {/* Animated gradient blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-700/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-300/20 dark:bg-yellow-700/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-300/20 dark:bg-pink-700/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Floating shapes for visual interest */}
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 blur-xl animate-pulse delay-500"></div>

        {/* Floating particles */}
        <FloatingParticles />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-12 w-full">
          <div className="text-center">
            <AnimatedDiv direction="down" delay={0.1}>
              <div className="inline-block mb-6">
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium animate-pulse">
                  Productivity Redefined
                </span>
              </div>
            </AnimatedDiv>

            <AnimatedDiv direction="down" delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                  Transform Your Productivity
                </span>
                <span className="block mt-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
                  With Our Modern Todo App
                </span>
              </h1>
            </AnimatedDiv>

            <AnimatedDiv direction="up" delay={0.3}>
              <p className="mt-6 max-w-lg mx-auto text-xl text-foreground/90 font-medium">
                A beautifully designed, highly animated todo application that helps you stay organized and focused.
              </p>
            </AnimatedDiv>

            <AnimatedDiv direction="up" delay={0.4}>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white" asChild>
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8 border-2 border-purple-300 text-purple-700 dark:text-purple-300 dark:border-purple-600" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </div>
            </AnimatedDiv>

            {/* Animated mockup placeholder */}
            <AnimatedDiv direction="up" delay={0.5}>
              <div className="mt-16 max-w-4xl mx-auto transform transition-all duration-700 hover:scale-[1.02]">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 animate-pulse-slow"></div>
                  <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/50 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="h-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 flex items-center px-4 space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-4 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded w-1/4"></div>
                        <div className="h-4 bg-gradient-to-r from-indigo-200 to-blue-200 dark:from-indigo-800 dark:to-blue-800 rounded w-1/6"></div>
                      </div>
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center mb-3 last:mb-0 animate-slide-in-left" style={{animationDelay: `${item * 100}ms`}}>
                          <div className="h-5 w-5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center mr-3 flex-shrink-0">
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          </div>
                          <div className="h-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded flex-grow"></div>
                        </div>
                      ))}

                      {/* Stats bar */}
                      <div className="mt-6 pt-4 border-t border-purple-200/50 dark:border-purple-800/50">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30">
                            <div className="text-foreground/70">Completed</div>
                            <div className="font-bold text-purple-600 dark:text-purple-300">24/30</div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30">
                            <div className="text-foreground/70">Focus Time</div>
                            <div className="font-bold text-indigo-600 dark:text-indigo-300">4h 32m</div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-900/30 dark:to-orange-900/30">
                            <div className="text-foreground/70">Streak</div>
                            <div className="font-bold text-pink-600 dark:text-pink-300">12 days</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedDiv>

            {/* Trust indicators */}
            <AnimatedDiv direction="up" delay={0.6}>
              <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
                <div className="text-foreground/70 text-lg font-medium flex items-center">
                  <span className="mr-3">Trusted by</span>
                </div>
                {[
                  { value: '50K+', label: 'users', emoji: '👥' },
                  { value: '99.9%', label: 'uptime', emoji: '⏱️' },
                  { value: '4.9/5', label: 'rating', emoji: '⭐' },
                  { value: '24/7', label: 'support', emoji: '🛠️' }
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-gradient-to-r from-purple-100/80 to-pink-100/80 dark:from-purple-900/40 dark:to-pink-900/40 px-5 py-3 rounded-full border border-purple-200/50 dark:border-purple-800/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <span className="mr-2 text-xl">{stat.emoji}</span>
                    <div className="text-center">
                      <div className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">{stat.value}</div>
                      <div className="text-xs text-foreground/70">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedDiv>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-purple-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedDiv direction="down" delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Powerful Features</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
                Designed to enhance your productivity with a focus on aesthetics and performance
              </p>
            </AnimatedDiv>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: 'Beautiful Animations',
                description: 'Smooth, purposeful animations that enhance the user experience without being distracting.',
                icon: '✨',
                color: 'from-yellow-400 to-orange-500'
              },
              {
                title: 'Fully Responsive',
                description: 'Looks great on any device, from mobile phones to large desktop monitors.',
                icon: '📱',
                color: 'from-green-400 to-emerald-500'
              },
              {
                title: 'Light & Dark Mode',
                description: 'Choose your preferred theme with seamless transitions between modes.',
                icon: '🌙',
                color: 'from-indigo-400 to-purple-500'
              }
            ].map((feature, index) => (
              <AnimatedDiv key={feature.title} direction="up" delay={0.1 * (index + 1)}>
                <Card className="h-full transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border-0 bg-gradient-to-b from-white to-purple-50/50 dark:from-gray-800/50 dark:to-purple-900/20 backdrop-blur-sm overflow-hidden group">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <CardHeader>
                    <div className={`text-5xl mb-4 flex justify-center transform transition-transform duration-300 group-hover:scale-110 bg-clip-text text-transparent bg-gradient-to-r ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-center text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '50K+', label: 'Active Users', emoji: '👥', color: 'from-purple-500 to-pink-500' },
              { value: '99.9%', label: 'Uptime', emoji: '⏱️', color: 'from-indigo-500 to-blue-500' },
              { value: '4.9/5', label: 'User Rating', emoji: '⭐', color: 'from-yellow-500 to-orange-500' },
              { value: '24/7', label: 'Support', emoji: '🛠️', color: 'from-green-500 to-emerald-500' }
            ].map((stat, index) => (
              <AnimatedDiv key={stat.label} direction="up" delay={0.1 * index}>
                <div className="p-6 text-center bg-white/50 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-purple-200/50 dark:border-purple-800/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className={`text-5xl mb-3 bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>{stat.emoji}</div>
                  <div className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="mt-3 text-foreground/80 font-medium">{stat.label}</div>
                </div>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedDiv direction="up" delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to Transform Your Workflow?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-white/90">
              Join thousands of users who have revolutionized their productivity with our app.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" variant="default" className="px-10 py-6 text-lg bg-gradient-to-r from-white to-gray-100 text-purple-700 hover:from-gray-100 hover:to-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1" asChild>
                <Link href="/signup">Sign Up Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="px-10 py-6 text-lg border-2 border-white text-white hover:bg-white hover:text-purple-700 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1" asChild>
                <Link href="/demo">View Demo</Link>
              </Button>
            </div>
          </AnimatedDiv>
        </div>
      </section>
    </div>
  );
}