import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { company } from "@/data/company";
import { getInsightContent, insights } from "@/data/insights";
import { isLocale, locales, withLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ lang: string }> };

export function generateStaticParams() { return locales.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return pageMetadata(
    lang,
    lang === "vi" ? "Kiến thức tìm nguồn nguyên liệu" : "Material sourcing insights",
    lang === "vi" ? "Hướng dẫn thực tế cho đội ngũ mua hàng, kỹ thuật và chất lượng khi đánh giá nguyên liệu." : "Practical guides for procurement, technical and quality teams evaluating raw materials.",
    "insights",
  );
}

export default async function InsightsPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = {
    eyebrow: lang === "vi" ? "Kiến thức nguyên liệu" : "Material knowledge",
    title: lang === "vi" ? "Hướng dẫn tìm nguồn và đánh giá nguyên liệu" : "Material sourcing and technical review guides",
    description: lang === "vi" ? "Hướng dẫn về thông số, COA, TDS, SDS, thử nghiệm sản xuất và những thông tin cần có trong yêu cầu nguyên liệu." : "Guides on specifications, COA, TDS, SDS, production trials and the information to include in a material enquiry.",
    read: lang === "vi" ? "Đọc hướng dẫn" : "Read guide",
  };
  const list = insights.map((insight) => ({ insight, content: getInsightContent(insight, lang) }));
  const lead = list[0];
  const rest = list.slice(1);
  const pageUrl = `${company.url}/${lang}/insights`;
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: copy.title,
    description: copy.description,
    url: pageUrl,
    inLanguage: lang,
    isPartOf: { "@id": `${company.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: list.map(({ insight, content }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: content.title,
        url: `${pageUrl}/${insight.slug}`,
      })),
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: company.name, item: `${company.url}/${lang}` },
      { "@type": "ListItem", position: 2, name: copy.eyebrow, item: pageUrl },
    ],
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
      <PageHero description={copy.description} eyebrow={copy.eyebrow} title={copy.title} />
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <Link className="group grid overflow-hidden rounded-[2rem] bg-[var(--ink)] text-white lg:grid-cols-[1.08fr_0.92fr]" href={withLocale(lang, `insights/${lead.insight.slug}`)}>
              <div className="relative min-h-[25rem] overflow-hidden lg:min-h-[34rem]">
                <Image alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04] motion-reduce:transition-none" fill priority sizes="(max-width: 1024px) 100vw, 54vw" src={lead.insight.image} />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              </div>
              <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
                <div><p className="font-mono text-xs text-[var(--accent-mint)]">[ 01 / {lead.content.topic} ]</p><h2 className="mt-7 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">{lead.content.title}</h2><p className="mt-5 leading-7 text-white/68">{lead.content.description}</p></div>
                <span className="mt-10 inline-flex items-center gap-2 text-sm font-semibold">{copy.read}<ArrowUpRight aria-hidden="true" size={17} /></span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map(({ insight, content }, index) => (
              <Reveal delay={(index % 3) * 0.06} key={insight.slug}>
                <Link className="group block border-t border-[var(--ink)] pt-5" href={withLocale(lang, `insights/${insight.slug}`)}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
                    <Image alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05] motion-reduce:transition-none" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" src={insight.image} />
                  </div>
                  <p className="mt-5 font-mono text-[10px] font-semibold uppercase text-[var(--green-600)]">0{index + 2} / {content.topic}</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.03em]">{content.title}</h2>
                  <p className="mt-3 line-clamp-3 leading-7 text-[var(--muted)]">{content.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-600)]">{copy.read}<ArrowUpRight aria-hidden="true" size={16} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
