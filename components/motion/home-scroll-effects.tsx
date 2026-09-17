"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function HomeScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        ".process-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        },
      );

      const marquee = document.querySelector<HTMLElement>(".marquee-track");
      if (marquee) {
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            marquee.style.animationDirection = self.direction < 0 ? "reverse" : "normal";
          },
        });
      }
    });

    return () => context.revert();
  }, []);

  return null;
}

