import { Check } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() { return locales.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const copy = getDictionary(lang).about;
  return pageMetadata(lang, copy.eyebrow, copy.body, "about");
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = getDictionary(lang).about;
  return (
    <>
      <PageHero description={copy.body} eyebrow={copy.eyebrow} title={copy.title} />
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="rounded-[2rem] bg-[var(--ink)] p-7 text-white sm:p-12 lg:p-16">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--green-400)]">{copy.valuesTitle}</p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {copy.values.map((value) => <div className="flex min-h-24 items-center gap-4 rounded-[var(--radius-card)] bg-white/[0.06] p-5" key={value}><span className="grid size-8 place-items-center rounded-full bg-[var(--green-600)]"><Check aria-hidden="true" size={16} /></span><h2 className="font-display text-xl font-semibold">{value}</h2></div>)}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

