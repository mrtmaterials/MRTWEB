"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function HomeScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

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

      gsap.to(".hero-title", {
        y: 10,
        letterSpacing: "-0.035em",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-stage",
          start: "top top",
          end: "35% top",
          scrub: 0.7,
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

      gsap.utils.toArray<HTMLElement>(".editorial-media").forEach((image) => {
        gsap.fromTo(
          image,
          { clipPath: "inset(5% 0 5% 0 round 24px)", scale: 1.06 },
          {
            clipPath: "inset(0% 0 0% 0 round 0px)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image.closest(".editorial-wipe"),
              start: "top 90%",
              end: "top 25%",
              scrub: 0.65,
            },
          },
        );
      });

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

      gsap.fromTo(
        ".route-path",
        { strokeDasharray: 1, strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".process-number").forEach((number) => {
        gsap.fromTo(
          number,
          { opacity: 0.35, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: number.closest(".process-step"),
              start: "top 70%",
              end: "bottom 45%",
              scrub: 0.4,
            },
          },
        );
      });

      media.add("(pointer: fine) and (min-width: 1024px)", () => {
        const hero = document.querySelector<HTMLElement>(".hero-stage");
        const aperture = document.querySelector<HTMLElement>(".hero-aperture");
        const heroMedia = document.querySelector<HTMLElement>(".hero-media");
        const cards = Array.from(document.querySelectorAll<HTMLElement>(".category-card"));

        const moveHero = (event: PointerEvent) => {
          if (!hero || !aperture) return;
          const rect = hero.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          aperture.style.setProperty("--pointer-x", `${x}%`);
          aperture.style.setProperty("--pointer-y", `${y}%`);
          if (heroMedia) {
            heroMedia.style.setProperty("--pointer-shift-x", `${(x - 50) * -0.025}px`);
            heroMedia.style.setProperty("--pointer-shift-y", `${(y - 50) * -0.018}px`);
          }
        };

        const cardCleanups = cards.map((card) => {
          const moveCard = (event: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            card.style.setProperty("--card-rx", `${(0.5 - y) * 2.2}deg`);
            card.style.setProperty("--card-ry", `${(x - 0.5) * 2.2}deg`);
            card.style.setProperty("--card-x", `${x * 100}%`);
            card.style.setProperty("--card-y", `${y * 100}%`);
          };
          const resetCard = () => {
            card.style.setProperty("--card-rx", "0deg");
            card.style.setProperty("--card-ry", "0deg");
          };
          card.addEventListener("pointermove", moveCard, { passive: true });
          card.addEventListener("pointerleave", resetCard);
          return () => {
            card.removeEventListener("pointermove", moveCard);
            card.removeEventListener("pointerleave", resetCard);
          };
        });

        hero?.addEventListener("pointermove", moveHero, { passive: true });
        return () => {
          hero?.removeEventListener("pointermove", moveHero);
          cardCleanups.forEach((cleanup) => cleanup());
        };
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("load", refresh);
      media.revert();
      context.revert();
    };
  }, []);

  return null;
}
