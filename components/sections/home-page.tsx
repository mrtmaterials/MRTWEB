import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { HomeScrollEffects } from "@/components/motion/home-scroll-effects";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
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
      <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[var(--ink)] text-white">
        <Image
          alt="Quality-control specialist working in a controlled laboratory environment"
          className="hero-media absolute inset-0 h-full w-full object-cover object-[62%_center]"
          fill
          priority
          sizes="100vw"
          src="/images/editorial/lab-hero.webp"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,20,16,0.98)_0%,rgba(6,20,16,0.92)_42%,rgba(6,20,16,0.42)_72%,rgba(6,20,16,0.12)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(6,20,16,0.78)_0%,rgba(6,20,16,0.92)_64%,rgba(6,20,16,0.98)_100%)]" />
        <div aria-hidden="true" className="film-grain absolute inset-0 opacity-[0.08] mix-blend-soft-light" />
        <Container className="relative flex min-h-[calc(100svh-5rem)] items-end py-14 sm:py-20 lg:items-center lg:py-24">
          <div className="relative z-10 max-w-[58rem]">
            <Reveal>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-mint)]">
                {home.eyebrow}
              </p>
            </Reveal>
            <h1 className="mt-7 max-w-5xl font-display text-[clamp(3.1rem,6.7vw,6.8rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white">
              {home.title.split(" ").map((word, index) => (
                <span className="hero-word mr-[0.2em] inline-block overflow-hidden align-top" key={`${word}-${index}`}>
                  <span className="inline-block">{word}</span>
                </span>
              ))}
            </h1>
            <Reveal delay={0.22}>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">{home.summary}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink className="!bg-white !text-[var(--ink)] hover:!bg-[var(--accent-mint)]" href={path("/contact")}>
                  {common.requestQuote}<ArrowUpRight aria-hidden="true" size={17} />
                </ButtonLink>
                <ButtonLink className="!border-white/35 !bg-white/10 !text-white backdrop-blur-md hover:!bg-white/20" href={path("/products")} variant="secondary">
                  {common.exploreProducts}<ArrowRight aria-hidden="true" size={17} />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <Reveal className="absolute right-8 bottom-8 hidden max-w-xs rounded-[var(--radius-card)] border border-white/20 bg-black/30 p-5 backdrop-blur-xl lg:block" delay={0.35}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-mint)]">{home.why.eyebrow}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-white">{home.why.items[1]?.title}</p>
            <p className="mt-1 text-xs leading-5 text-white/62">{home.why.items[1]?.body}</p>
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

      <section className="bg-[#eef2f0] py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading description={home.categories.body} eyebrow={home.categories.eyebrow} title={home.categories.title} />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Reveal delay={index * 0.08} key={category.slug}>
                <Link className="category-card group relative grid min-h-[31rem] overflow-hidden rounded-[var(--radius-card)] bg-[var(--ink)] p-7 shadow-[0_20px_60px_rgba(15,26,23,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)] sm:p-8" href={path(`/products/${category.slug}`)}>
                  <Image alt="" className="category-image absolute inset-0 h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.07] motion-reduce:transition-none" fill sizes="(max-width: 1024px) 100vw, 33vw" src={category.image} />
                  <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,16,13,0.18)_0%,rgba(5,16,13,0.28)_35%,rgba(5,16,13,0.96)_100%)]" />
                  <span className="relative font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-mint)]">[ {String(category.order).padStart(2, "0")} ]</span>
                  <div className="relative mt-auto max-w-2xl pt-32">
                    <h3 className="font-display text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-white">{category.name[locale]}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-white/68">{category.description[locale]}</p>
                  </div>
                  <span className="absolute top-6 right-6 grid size-11 place-items-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-[var(--ink)] motion-reduce:transition-none">
                    <ArrowUpRight aria-hidden="true" size={19} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <Container className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="relative min-h-[32rem] overflow-hidden rounded-[var(--radius-card)]">
            <Image alt="Organised industrial warehouse supporting reliable material supply" className="section-photo absolute inset-0 h-full w-full object-cover" fill sizes="(max-width: 1024px) 100vw, 55vw" src="/images/editorial/warehouse.webp" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="absolute right-6 bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">[ supply / storage / delivery ]</p>
          </Reveal>
          <div className="flex flex-col justify-between rounded-[var(--radius-card)] bg-[var(--ink)] p-7 text-white sm:p-10">
            <Reveal><SectionHeading className="[&_h2]:!text-white [&_p]:!text-white/65" eyebrow={home.industries.eyebrow} title={home.industries.title} /></Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/12 sm:grid-cols-2">
              {home.industries.items.map((item, index) => (
                <Reveal className={`bg-[var(--ink)] ${index === home.industries.items.length - 1 ? "sm:col-span-2" : ""}`} delay={index * 0.06} key={item}>
                  <div className="flex min-h-24 items-center gap-4 p-5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--green-600)] text-white"><Check aria-hidden="true" size={16} /></span>
                    <p className="text-sm font-medium leading-6 text-white/86">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
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
          <div className="featured-scroll mt-12 grid gap-5 pb-6 sm:-mx-8 sm:flex sm:snap-x sm:overflow-x-auto sm:px-8 lg:-mx-12 lg:px-12">
            {featured.map((product) => (
              <Link className="group relative min-h-[27rem] w-full shrink-0 snap-start overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[0_15px_45px_rgba(15,26,23,0.06)] sm:w-[70vw] sm:max-w-[28rem]" href={path(`/products/${product.category}/${product.slug}`)} key={product.slug}>
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
