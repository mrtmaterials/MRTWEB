"use client";

import { useEffect, useRef } from "react";

export function CursorDot() {
  const dot = useRef<HTMLDivElement>(null);
  const trail = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const node = dot.current;
    if (!node) return;

    const target = { x: -40, y: -40 };
    const positions = trail.current.map(() => ({ x: -40, y: -40 }));
    let frame = 0;
    let magnetic: HTMLElement | null = null;

    const animate = () => {
      positions.forEach((position, index) => {
        const leader = index === 0 ? target : positions[index - 1];
        position.x += (leader.x - position.x) * (0.28 - index * 0.025);
        position.y += (leader.y - position.y) * (0.28 - index * 0.025);
        const trailNode = trail.current[index];
        if (trailNode) trailNode.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      });
      frame = window.requestAnimationFrame(animate);
    };

    const move = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      node.dataset.active = event.target instanceof Element && Boolean(event.target.closest("a,button,summary,input,textarea")) ? "true" : "false";

      const nextMagnetic = event.target instanceof Element ? event.target.closest<HTMLElement>(".magnetic-target") : null;
      if (magnetic && magnetic !== nextMagnetic) {
        magnetic.style.transform = "translate3d(0,0,0)";
      }
      magnetic = nextMagnetic;
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const x = (event.clientX - (rect.left + rect.width / 2)) * 0.12;
        const y = (event.clientY - (rect.top + rect.height / 2)) * 0.12;
        magnetic.style.transform = `translate3d(${x}px,${y}px,0)`;
      }
    };
    const reset = () => {
      if (magnetic) magnetic.style.transform = "translate3d(0,0,0)";
      magnetic = null;
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("mouseleave", reset);
    frame = window.requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("mouseleave", reset);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="cursor-dot" ref={dot} />
      <div aria-hidden="true" className="cursor-trail">
        {Array.from({ length: 5 }, (_, index) => (
          <span className="cursor-trail-node" key={index} ref={(node) => { trail.current[index] = node; }} />
        ))}
      </div>
    </>
  );
}
