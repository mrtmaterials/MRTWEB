"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

export function PageTransition() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      animate={{ scaleX: [0, 1, 0] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-1 origin-left bg-[var(--green-600)]"
      initial={{ scaleX: 0 }}
      key={pathname}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], times: [0, 0.55, 1] }}
    />
  );
}
