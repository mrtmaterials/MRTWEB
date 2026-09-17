"use client";

import { useEffect, useRef } from "react";

export function CursorDot() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const node = dot.current;
    if (!node) return;

    const move = (event: PointerEvent) => {
      node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      node.dataset.active = event.target instanceof Element && Boolean(event.target.closest("a,button,summary,input,textarea")) ? "true" : "false";
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return <div aria-hidden="true" className="cursor-dot" ref={dot} />;
}

