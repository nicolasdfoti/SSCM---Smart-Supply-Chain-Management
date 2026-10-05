import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animateOnMount?: boolean;
  viewportOnce?: boolean;
  viewportMargin?: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const fadeOnly = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 },
};

export function Reveal({
  children,
  delay = 0,
  className = '',
  animateOnMount = false,
  viewportOnce = true,
  viewportMargin = '-100px',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants = shouldReduceMotion ? fadeOnly : fadeUp;

  const transition = {
    ...variants.transition,
    delay,
  };

  if (animateOnMount) {
    return (
      <motion.div
        initial={variants.initial}
        animate={variants.animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={variants.initial}
      whileInView={variants.animate}
      viewport={{ once: viewportOnce, margin: viewportMargin }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
