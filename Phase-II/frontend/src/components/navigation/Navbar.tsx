'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet';
import { Menu, LogOut } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Define navigation links - always show Dashboard and Todos
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Todos', href: '/todos' },
    ...(isAuthenticated
      ? []
      : [
          { name: 'Login', href: '/auth/login' },
          { name: 'Signup', href: '/auth/signup' }
        ])
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-3 mr-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105">
              <span className="text-primary-50 font-bold text-lg">TF</span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="hidden font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:inline-block tracking-tight">
                TaskFlow
              </span>
              <span className="hidden font-light text-2xl text-accent-500 sm:inline-block">Pro</span>
            </div>
          </Link>
        </div>

        <div className="flex-1"></div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-foreground/80 px-3 py-2 rounded-md ${
                pathname === link.href ? 'text-foreground bg-accent' : 'text-foreground/60 hover:bg-accent'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated && (
            <Button variant="outline" size="sm" className="ml-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          )}
        </nav>

        <div className="flex items-center space-x-2 ml-10">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700">
            <span className="text-lg">
              {!isMounted ? '🌙' : (theme === 'light' ? '🌙' : '☀️')}
            </span>
          </Button>

          {!isAuthenticated ? (
            <>
              <Button asChild variant="outline" size="sm" className="hidden md:flex">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="hidden md:flex">
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" className="hidden md:flex" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-3 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-2 transition-colors hover:text-foreground/80 ${
                      pathname === link.href ? 'text-foreground font-medium' : 'text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-4 mt-4 border-t border-border">
                  {!isAuthenticated ? (
                    <>
                      <Button variant="outline" className="w-full mb-2">
                        <Link href="/auth/login">Login</Link>
                      </Button>
                      <Button className="w-full">
                        <Link href="/auth/signup">Sign Up</Link>
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;