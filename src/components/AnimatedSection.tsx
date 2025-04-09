'use client';

import React, { ReactNode, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
  threshold?: number;
  id?: string;
  style?: React.CSSProperties;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 100,
        duration: 0.5,
        delay: i * 0.1,
      },
    }),
  },
  down: {
    hidden: { opacity: 0, y: -50 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 100,
        duration: 0.5,
        delay: i * 0.1,
      },
    }),
  },
  left: {
    hidden: { opacity: 0, x: 50 },
    visible: (i = 0) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 100,
        duration: 0.5,
        delay: i * 0.1,
      },
    }),
  },
  right: {
    hidden: { opacity: 0, x: -50 },
    visible: (i = 0) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 100,
        duration: 0.5,
        delay: i * 0.1,
      },
    }),
  },
  none: {
    hidden: { opacity: 0 },
    visible: (i = 0) => ({
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
      },
    }),
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  children: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  },
};

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.5,
  once = true,
  threshold = 0.3,
  id,
  style = {},
  staggerChildren = false,
  staggerDelay = 0.1,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  // Selecionar variante adequada
  const selectedVariant = staggerChildren ? 'stagger' : direction;

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[selectedVariant]}
      custom={delay}
      transition={{
        duration,
        delay,
      }}
    >
      {staggerChildren
        ? React.Children.map(children as ReactNode[], (child, index) => {
            if (React.isValidElement(child)) {
              return (
                <motion.div
                  key={index}
                  variants={variants.children}
                  custom={index * staggerDelay}
                >
                  {child}
                </motion.div>
              );
            }
            return child;
          })
        : children}
    </motion.section>
  );
} 