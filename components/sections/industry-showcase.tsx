"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type IndustryShowcaseProps = {
  body: string;
  eyebrow: string;
  items: readonly string[];
  locale: "en" | "vi";
  title: string;
};

const images = [
  "/images/editorial/warehouse.webp",
  "/images/editorial/lab-quality.webp",
  "/images/editorial/chemical-plant.webp",
  "/images/editorial/container-port.webp",
  "/images/editorial/warehouse-forklift.webp",
];

export function IndustryShowcase({ body, eyebrow, items, locale, title }: IndustryShowcaseProps) {
  const [active, setActive] = useState(0);

  return (
    <section className="editorial-wipe relative isolate min-h-[46rem] overflow-hidden bg-[var(--ink)] py-24 text-white sm:py-32">
      <div aria-hidden="true" className="editorial-media absolute inset-0 -z-20">
        {images.map((image, index) => (
          <Image
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${index === active ? "opacity-100" : "opacity-0"}`}
            fill
            key={image}
            sizes="100vw"
            src={image}
          />
        ))}
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,18,14,0.98)_0%,rgba(5,18,14,0.91)_48%,rgba(5,18,14,0.38)_100%)] transition-opacity duration-700 max-lg:bg-[linear-gradient(180deg,rgba(5,18,14,0.95)_0%,rgba(5,18,14,0.76)_100%)]" />
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <Reveal>
          <SectionHeading className="[&_h2]:!text-white [&_p]:!text-white/65" eyebrow={eyebrow} title={title} />
          <p className="mt-8 max-w-md border-l border-[var(--green-400)] pl-5 text-sm leading-7 text-white/62">{body}</p>
          <p className="mt-12 hidden font-mono text-[10px] uppercase text-white/45 lg:block">
            {locale === "vi" ? "[ DI CHUỘT / FOCUS ĐỂ KHÁM PHÁ ]" : "[ HOVER / FOCUS TO EXPLORE ]"}
          </p>
        </Reveal>
        <div className="border-t border-white/25">
          {items.map((item, index) => (
            <Reveal delay={index * 0.05} key={item}>
              <Link
                className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-white/20 py-5 transition-colors hover:border-[var(--green-400)] focus-visible:border-[var(--green-400)] focus-visible:outline-none"
                href={`/${locale}/industries`}
                onFocus={() => setActive(index)}
                onPointerEnter={() => setActive(index)}
              >
                <span className="font-mono text-xs text-[var(--accent-mint)]">0{index + 1}</span>
                <span className="font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{item}</span>
                <ArrowUpRight aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={19} />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
