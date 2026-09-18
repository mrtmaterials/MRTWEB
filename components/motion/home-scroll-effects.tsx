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
        ".hero-media",
        { scale: 1.1 },
        { scale: 1.02, duration: 1.8, ease: "power3.out" },
      );

      gsap.to(".hero-media", {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-media",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.utils.toArray<HTMLElement>(".category-image").forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 1.12, yPercent: -3 },
          {
            scale: 1.02,
            yPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: image.closest(".category-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          },
        );
      });

      gsap.fromTo(
        ".section-photo",
        { scale: 1.1, yPercent: -3 },
        {
          scale: 1.02,
          yPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: ".section-photo",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        },
      );

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
