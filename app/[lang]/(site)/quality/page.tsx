import { ClipboardCheck, FileSearch, PackageCheck, Warehouse } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const icons = [FileSearch, ClipboardCheck, PackageCheck, Warehouse];

export function generateStaticParams() { return locales.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const copy = getDictionary(lang).quality;
  return pageMetadata(lang, copy.eyebrow, copy.intro, "quality");
}

export default async function QualityPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = getDictionary(lang).quality;
  return (
    <>
      <PageHero description={copy.intro} eyebrow={copy.eyebrow} title={copy.title} />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {copy.items.map((item, index) => {
              const Icon = icons[index];
              return <Reveal delay={index * 0.06} key={item.title}><article className="h-full rounded-[var(--radius-card)] bg-white p-7 sm:p-9"><span className="grid size-12 place-items-center rounded-2xl bg-[var(--green-50)] text-[var(--green-600)]"><Icon aria-hidden="true" size={22} /></span><h2 className="mt-8 font-display text-2xl font-semibold tracking-[-0.035em]">{item.title}</h2><p className="mt-4 leading-7 text-[var(--muted)]">{item.body}</p></article></Reveal>;
            })}
          </div>
          <Reveal className="mt-8 rounded-[var(--radius-card)] bg-[var(--green-50)] p-6 text-sm leading-6 text-[var(--ink)] sm:p-8">{copy.note}</Reveal>
        </Container>
      </section>
    </>
  );
}

