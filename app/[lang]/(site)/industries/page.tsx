import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { categories } from "@/data/catalog";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() { return locales.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const copy = getDictionary(lang).industries;
  return pageMetadata(lang, copy.eyebrow, copy.intro, "industries");
}

export default async function IndustriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = getDictionary(lang).industries;

  return (
    <>
      <PageHero description={copy.intro} eyebrow={copy.eyebrow} title={copy.title} />
      <section className="py-20 sm:py-28">
        <Container className="grid gap-5 lg:grid-cols-2">
          {copy.items.map((item, index) => (
            <Reveal className={index === copy.items.length - 1 ? "lg:col-span-2" : ""} delay={index * 0.05} key={item.title}>
              <article className="h-full rounded-[var(--radius-card)] bg-white p-7 shadow-[0_12px_40px_rgba(15,26,23,0.05)] sm:p-9">
                <p className="font-mono text-xs tracking-[0.16em] text-[var(--green-600)]">[ {String(index + 1).padStart(2, "0")} ]</p>
                <h2 className="mt-8 font-display text-3xl font-semibold tracking-[-0.04em]">{item.title}</h2>
                <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">{item.body}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {item.categories.map((categoryName) => {
                    const category = categories.find((entry) => entry.name[lang] === categoryName);
                    if (!category) return null;
                    return <Link className="inline-flex items-center gap-2 rounded-full bg-[var(--green-50)] px-4 py-2 text-sm font-semibold text-[var(--green-600)] transition hover:bg-[var(--accent-mint)]" href={`/${lang}/products/${category.slug}`} key={category.slug}>{categoryName}<ArrowUpRight aria-hidden="true" size={15} /></Link>;
                  })}
                </div>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}

