import { ExternalLink, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { RfqForm } from "@/components/forms/rfq-form";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { EmailLink } from "@/components/ui/email-link";
import { PageHero } from "@/components/ui/page-hero";
import { company } from "@/data/company";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() { return locales.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const copy = getDictionary(lang).contact;
  return pageMetadata(lang, copy.eyebrow, copy.intro, "contact");
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = getDictionary(lang).contact;
  const mapUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(company.address)}`;
  return (
    <>
      <PageHero description={copy.intro} eyebrow={copy.eyebrow} title={copy.title} />
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal className="grid content-start gap-4">
            <div className="rounded-[var(--radius-card)] bg-white p-6"><Mail className="text-[var(--green-600)]" aria-hidden="true" size={21} /><p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]">{copy.sales}</p><EmailLink className="mt-2 block font-semibold text-[var(--ink)] hover:text-[var(--green-600)]" domain={company.emails.sales[1]} local={company.emails.sales[0]} /></div>
            <div className="rounded-[var(--radius-card)] bg-white p-6"><Mail className="text-[var(--green-600)]" aria-hidden="true" size={21} /><p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]">{copy.accounts}</p><EmailLink className="mt-2 block font-semibold text-[var(--ink)] hover:text-[var(--green-600)]" domain={company.emails.accounts[1]} local={company.emails.accounts[0]} /></div>
            <div className="rounded-[var(--radius-card)] bg-white p-6"><MapPin className="text-[var(--green-600)]" aria-hidden="true" size={21} /><p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]">{copy.address}</p><p className="mt-2 leading-7 text-[var(--ink)]">{company.address}</p><a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-600)]" href={mapUrl} rel="noreferrer" target="_blank">{copy.map}<ExternalLink aria-hidden="true" size={15} /></a></div>
          </Reveal>
          <Reveal className="rounded-[2rem] bg-white p-6 shadow-[0_16px_55px_rgba(15,26,23,0.06)] sm:p-9" delay={0.08}>
            <Suspense fallback={<div className="min-h-[36rem] animate-pulse rounded-[var(--radius-card)] bg-[var(--bg)]" />}>
              <RfqForm labels={copy.form} locale={lang} />
            </Suspense>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
