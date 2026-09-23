"use client";

import { useEffect, useRef } from "react";

type MolecularFieldProps = { className?: string };

type Node = { x: number; y: number; vx: number; vy: number; radius: number };

export function MolecularField({ className }: MolecularFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!query.matches || connection?.saveData) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const pointer = { x: -1000, y: -1000 };
    const nodes: Node[] = Array.from({ length: 32 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00016,
      vy: (Math.random() - 0.5) * 0.00016,
      radius: 1 + Math.random() * 1.7,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      frame = 0;
      if (!visible || document.hidden) return;
      context.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        node.x = (node.x + node.vx + 1) % 1;
        node.y = (node.y + node.vy + 1) % 1;
      });

      for (let index = 0; index < nodes.length; index += 1) {
        const node = nodes[index];
        const x = node.x * width;
        const y = node.y * height;
        const pointerDistance = Math.hypot(x - pointer.x, y - pointer.y);
        const glow = pointerDistance < 180 ? 1 - pointerDistance / 180 : 0;

        for (let next = index + 1; next < nodes.length; next += 1) {
          const other = nodes[next];
          const otherX = other.x * width;
          const otherY = other.y * height;
          const distance = Math.hypot(x - otherX, y - otherY);
          if (distance < 135) {
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(otherX, otherY);
            context.strokeStyle = `rgba(184,242,214,${(1 - distance / 135) * 0.2})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(x, y, node.radius + glow * 2.5, 0, Math.PI * 2);
        context.fillStyle = `rgba(184,242,214,${0.3 + glow * 0.45})`;
        context.fill();
      }

      frame = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onVisibility = () => {
      if (!document.hidden && visible && !frame) frame = window.requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = window.requestAnimationFrame(draw);
      if (!visible && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    resize();
    observer.observe(canvas);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    frame = window.requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas aria-hidden="true" className={className} ref={canvasRef} />;
}
