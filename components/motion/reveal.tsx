"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={false}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.18, once: true }}
      whileInView={reduceMotion ? undefined : { opacity: [0.86, 1], y: [10, 0] }}
    >
      {children}
    </motion.div>
  );
}
