import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { HomeScrollEffects } from "@/components/motion/home-scroll-effects";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MaterialOrb } from "@/components/visuals/material-orb";
import { categories, products } from "@/data/catalog";
import type { Dictionary, Locale } from "@/lib/i18n";

type HomePageProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function HomePage({ dictionary, locale }: HomePageProps) {
  const { home, common } = dictionary;
  const featured = products.filter((product) => product.featured);
  const path = (suffix = "") => `/${locale}${suffix}`;

  return (
    <>
      <HomeScrollEffects />
      <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[var(--silver)]">
        <div aria-hidden="true" className="molecular-grid absolute inset-0 opacity-70" />
        <div aria-hidden="true" className="film-grain absolute inset-0 opacity-[0.035]" />
        <Container className="relative grid min-h-[calc(100svh-5rem)] items-center gap-10 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:py-20">
          <div className="relative z-10">
            <Reveal>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--green-600)]">
                {home.eyebrow}
              </p>
            </Reveal>
            <h1 className="mt-7 max-w-5xl font-display text-[clamp(3.25rem,7.4vw,7.4rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-[var(--ink)]">
              {home.title.split(" ").map((word, index) => (
                <span className="hero-word mr-[0.2em] inline-block overflow-hidden align-top" key={`${word}-${index}`}>
                  <span className="inline-block">{word}</span>
                </span>
              ))}
            </h1>
            <Reveal delay={0.22}>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">{home.summary}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={path("/contact")}>
                  {common.requestQuote}<ArrowUpRight aria-hidden="true" size={17} />
                </ButtonLink>
                <ButtonLink href={path("/products")} variant="secondary">
                  {common.exploreProducts}<ArrowRight aria-hidden="true" size={17} />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <Reveal className="relative mx-auto w-full max-w-lg lg:max-w-none" delay={0.12}>
            <div className="relative aspect-square">
              <MaterialOrb className="h-full w-full drop-shadow-[0_35px_60px_rgba(14,138,95,0.14)]" />
              <div className="absolute right-0 bottom-[10%] rounded-2xl bg-white/82 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--green-600)] shadow-lg backdrop-blur-md">
                [ {home.eyebrow} ]
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="marquee border-y border-white bg-[var(--ink)] py-4 text-white">
        <div className="marquee-track flex w-max items-center gap-8 font-mono text-xs font-medium uppercase tracking-[0.2em]">
          {[...home.marquee, ...home.marquee].map((item, index) => (
            <span className="flex items-center gap-8" key={`${item}-${index}`}>
              {item}<span className="text-[var(--green-400)]">●</span>
            </span>
          ))}
        </div>
      </div>

      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading description={home.categories.body} eyebrow={home.categories.eyebrow} title={home.categories.title} />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            {categories.map((category, index) => (
              <Reveal className={index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-12"} delay={index * 0.08} key={category.slug}>
                <Link className="category-card group relative grid min-h-[25rem] overflow-hidden rounded-[var(--radius-card)] bg-white p-7 shadow-[0_16px_50px_rgba(15,26,23,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)] sm:p-9" href={path(`/products/${category.slug}`)}>
                  <Image alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none" fill sizes={index === 0 ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 42vw"} src={category.image} />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                  <span className="relative font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--green-600)]">[ {String(category.order).padStart(2, "0")} ]</span>
                  <div className="relative mt-auto max-w-2xl pt-28">
                    <h3 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--ink)] sm:text-4xl">{category.name[locale]}</h3>
                    <p className="mt-3 max-w-xl leading-7 text-[var(--muted)]">{category.description[locale]}</p>
                  </div>
                  <span className="absolute right-6 bottom-6 grid size-12 translate-y-16 place-items-center rounded-full bg-[var(--green-700)] text-white transition duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none">
                    <ArrowUpRight aria-hidden="true" size={19} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading eyebrow={home.industries.eyebrow} title={home.industries.title} />
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {home.industries.items.map((item, index) => (
              <Reveal delay={index * 0.06} key={item}>
                <div className="flex min-h-24 items-center gap-4 rounded-[var(--radius-card)] bg-[var(--bg)] p-5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--green-50)] text-[var(--green-600)]"><Check aria-hidden="true" size={16} /></span>
                  <p className="font-medium leading-6 text-[var(--ink)]">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="process-section py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal><SectionHeading eyebrow={home.process.eyebrow} title={home.process.title} /></Reveal>
            <div className="mt-8 h-1 overflow-hidden rounded-full bg-[var(--line)]"><div className="process-progress h-full w-full origin-left bg-[var(--green-600)]" /></div>
          </div>
          <div className="grid gap-5">
            {home.process.steps.map((step, index) => (
              <Reveal delay={index * 0.06} key={step.title}>
                <article className="grid min-h-52 gap-8 rounded-[var(--radius-card)] bg-white p-7 shadow-[0_12px_40px_rgba(15,26,23,0.05)] sm:grid-cols-[5rem_1fr] sm:p-9">
                  <p className="font-mono text-xs font-semibold tracking-[0.16em] text-[var(--green-600)]">0{index + 1}</p>
                  <div><h3 className="font-display text-3xl font-semibold tracking-[-0.04em]">{step.title}</h3><p className="mt-4 max-w-xl leading-7 text-[var(--muted)]">{step.body}</p></div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="overflow-hidden bg-[var(--ink)] py-24 text-white sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading className="[&_h2]:!text-white" eyebrow={home.why.eyebrow} title={home.why.title} />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/10 md:grid-cols-2">
            {home.why.items.map((item, index) => (
              <Reveal className="bg-[var(--ink)] p-7 sm:p-9" delay={index * 0.05} key={item.title}>
                <p className="font-mono text-xs text-[var(--green-400)]">[ 0{index + 1} ]</p>
                <h3 className="mt-10 font-display text-2xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 max-w-lg leading-7 text-white/65">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <Reveal><SectionHeading eyebrow={home.featured.eyebrow} title={home.featured.title} /></Reveal>
          <div className="featured-scroll -mx-5 mt-12 flex snap-x gap-5 overflow-x-auto px-5 pb-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
            {featured.map((product) => (
              <Link className="group relative min-h-[27rem] w-[82vw] max-w-[28rem] shrink-0 snap-start overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[0_15px_45px_rgba(15,26,23,0.06)]" href={path(`/products/${product.category}/${product.slug}`)} key={product.slug}>
                <Image alt="" className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.04] motion-reduce:transition-none" height={500} src={product.image} width={700} />
                <div className="p-7"><h3 className="font-display text-2xl font-semibold tracking-[-0.035em]">{product.name[locale]}</h3><p className="mt-3 line-clamp-2 leading-7 text-[var(--muted)]">{product.summary[locale]}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-600)]">{common.learnMore}<ArrowUpRight aria-hidden="true" size={16} /></span></div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container>
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-[var(--green-700)] px-7 py-16 text-white sm:px-12 sm:py-20 lg:px-16">
            <div aria-hidden="true" className="absolute -right-24 -bottom-36 size-[28rem] rounded-full border-[70px] border-white/10" />
            <div className="relative max-w-3xl"><h2 className="font-display text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">{home.cta.title}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{home.cta.body}</p><ButtonLink className="mt-9 !bg-white !text-[var(--ink)] hover:!bg-[var(--accent-mint)]" href={path("/contact")}>{home.cta.button}<ArrowUpRight aria-hidden="true" size={17} /></ButtonLink></div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
