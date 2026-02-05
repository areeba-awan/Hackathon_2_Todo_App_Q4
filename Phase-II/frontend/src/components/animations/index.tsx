'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedDivProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  [key: string]: any;
}

export const AnimatedDiv = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  direction = 'up',
  ...props
}: AnimatedDivProps) => {
  const initial: { opacity: number; x?: number; y?: number } = { opacity: 0 };
  const animate: { opacity: number; x?: number; y?: number } = { opacity: 1 };

  switch (direction) {
    case 'up':
      initial.y = 20;
      animate.y = 0;
      break;
    case 'down':
      initial.y = -20;
      animate.y = 0;
      break;
    case 'left':
      initial.x = -20;
      animate.x = 0;
      break;
    case 'right':
      initial.x = 20;
      animate.x = 0;
      break;
  }

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const FadeIn = ({ children, className = '', delay = 0, duration = 0.5 }: FadeInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface SlideInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction: 'up' | 'down' | 'left' | 'right';
}

export const SlideIn = ({ children, className = '', delay = 0, duration = 0.5, direction }: SlideInProps) => {
  const initial: { opacity: number; x?: number; y?: number } = { opacity: 0 };
  const animate: { opacity: number; x?: number; y?: number } = { opacity: 1 };

  switch (direction) {
    case 'up':
      initial.y = 50;
      animate.y = 0;
      break;
    case 'down':
      initial.y = -50;
      animate.y = 0;
      break;
    case 'left':
      initial.x = -50;
      animate.x = 0;
      break;
    case 'right':
      initial.x = 50;
      animate.x = 0;
      break;
  }

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};