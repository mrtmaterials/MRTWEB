"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

export function PageTransition() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div aria-hidden="true" className="page-transition pointer-events-none fixed inset-0 z-[90]" key={pathname}>
      <motion.div
        animate={{ clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)", "inset(0 0 100% 0)"] }}
        className="absolute inset-0 grid place-items-center bg-[var(--ink)]"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1], times: [0, 0.46, 1] }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 0], y: [10, 0, -10] }}
          className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--accent-mint)]"
          transition={{ duration: 0.7, times: [0, 0.48, 1] }}
        >
          MRT / MATERIALS
        </motion.span>
      </motion.div>
      <motion.div
        animate={{ scaleX: [0, 1, 0] }}
        className="absolute inset-x-0 top-0 h-1 origin-left bg-[var(--green-400)]"
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1], times: [0, 0.5, 1] }}
      />
    </div>
  );
}
