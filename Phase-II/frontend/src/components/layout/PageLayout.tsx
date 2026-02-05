'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';

// Pages where footer should not be displayed
const FOOTER_HIDDEN_PATHS = ['/dashboard', '/todos'];

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname();
  const shouldHideFooter = FOOTER_HIDDEN_PATHS.some(path => pathname?.startsWith(path));

  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  );
}