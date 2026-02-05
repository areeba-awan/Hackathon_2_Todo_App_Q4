'use client';

import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { AnimatedDiv } from '@/components/animations';

const Footer = () => {
  const { theme } = useTheme();

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'Updates', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Support', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Careers', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t border-border/40 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <AnimatedDiv direction="up" delay={0.1}>
              <div className="flex items-center space-x-2 mb-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-105">
                  <span className="text-primary-50 font-bold text-xs">TF</span>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    TaskFlow
                  </span>
                  <span className="font-light text-lg text-accent-500">Pro</span>
                </div>
              </div>
            </AnimatedDiv>

            <AnimatedDiv direction="up" delay={0.2}>
              <p className="text-foreground/60 text-sm mb-4 max-w-[200px]">
                Beautifully designed todo application for enhanced productivity.
              </p>
            </AnimatedDiv>

            <AnimatedDiv direction="up" delay={0.3}>
              <div className="flex space-x-3">
                {['twitter', 'github', 'linkedin'].map((social, idx) => (
                  <Link
                    key={social}
                    href="#"
                    className="text-foreground/60 hover:text-foreground transition-all duration-300 transform hover:scale-110"
                    aria-label={social}
                  >
                    <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-xs font-bold">{social.charAt(0).toUpperCase()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </AnimatedDiv>
          </div>

          {/* Link Columns */}
          {footerSections.map((section, index) => (
            <AnimatedDiv key={section.title} direction="up" delay={0.1 * (index + 1)}>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-foreground/60 hover:text-foreground text-sm transition-colors duration-200 block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedDiv>
          ))}
        </div>

        <div className="border-t border-border/30 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <AnimatedDiv direction="up" delay={0.5}>
            <p className="text-foreground/50 text-xs">
              © {currentYear} TaskFlow Pro. All rights reserved.
            </p>
          </AnimatedDiv>

          <AnimatedDiv direction="up" delay={0.6}>
            <div className="flex space-x-4 mt-3 md:mt-0">
              <Link href="#" className="text-foreground/50 hover:text-foreground text-xs transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-foreground/50 hover:text-foreground text-xs transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-foreground/50 hover:text-foreground text-xs transition-colors">
                Cookies
              </Link>
            </div>
          </AnimatedDiv>
        </div>
      </div>
    </footer>
  );
};

export default Footer;