"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      if (bar.current) bar.current.style.transform = `scaleY(${progress})`;
      if (label.current) label.current.textContent = String(Math.round(progress * 100)).padStart(2, "0");
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed right-3 top-1/2 z-[70] hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
      <span className="font-mono text-[9px] text-[var(--green-600)]" ref={label}>00</span>
      <div className="h-28 w-px overflow-hidden bg-[var(--ink)]/15">
        <div className="h-full w-full origin-top bg-[var(--green-600)]" ref={bar} style={{ transform: "scaleY(0)" }} />
      </div>
    </div>
  );
}
