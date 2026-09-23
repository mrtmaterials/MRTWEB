"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    const tick = (time: number) => lenis.raf(time * 1000);
    const toggleForMenu = (event: Event) => {
      const { open } = (event as CustomEvent<{ open: boolean }>).detail;
      if (open) lenis.stop();
      else lenis.start();
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    window.addEventListener("mrt:menu-toggle", toggleForMenu);

    return () => {
      window.removeEventListener("mrt:menu-toggle", toggleForMenu);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
