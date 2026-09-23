import { ArrowLeft, ArrowUpRight, Check, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { categories, products } from "@/data/catalog";
import { company } from "@/data/company";
import { getInsight, getInsightContent, insights } from "@/data/insights";
import { isLocale, locales, withLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => insights.map((insight) => ({ lang, slug: insight.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const insight = getInsight(slug);
  if (!insight) return {};
  const content = getInsightContent(insight, lang);
  const metadata = pageMetadata(lang, content.title, content.description, `insights/${slug}`, insight.image);
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: insight.publishedAt,
      modifiedTime: insight.updatedAt,
    },
  };
}

export default async function InsightPage({ params }: PageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const insight = getInsight(slug);
  if (!insight) notFound();
  const content = getInsightContent(insight, lang);
  const pageUrl = `${company.url}/${lang}/insights/${slug}`;
  const relatedCategories = categories.filter((category) => insight.relatedCategorySlugs.includes(category.slug));
  const relatedProducts = products.filter((product) => insight.relatedProductSlugs.includes(product.slug));
  const dateLabel = new Intl.DateTimeFormat(lang === "vi" ? "vi-VN" : "en-GB", { dateStyle: "long", timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(`${insight.updatedAt}T00:00:00+07:00`));
  const labels = lang === "vi" ? {
    insights: "Kiến thức", updated: "Cập nhật", contents: "Trong bài viết", takeaways: content.takeawaysTitle,
    related: "Danh mục và vật liệu liên quan", quote: "Trao đổi yêu cầu", disclaimer: "Nội dung này cung cấp thông tin chung cho quá trình tìm nguồn. Việc lựa chọn và sử dụng vật liệu phải tuân theo đánh giá kỹ thuật, chất lượng, pháp lý và EHS của doanh nghiệp.",
  } : {
    insights: "Insights", updated: "Updated", contents: "In this guide", takeaways: content.takeawaysTitle,
    related: "Related categories and materials", quote: "Discuss a requirement", disclaimer: "This article provides general information for a sourcing review. Material selection and use remain subject to the buyer's technical, quality, legal and EHS evaluation.",
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: content.title,
    description: content.description,
    image: `${company.url}${insight.image}`,
    datePublished: insight.publishedAt,
    dateModified: insight.updatedAt,
    inLanguage: lang,
    mainEntityOfPage: pageUrl,
    articleSection: content.topic,
    author: { "@id": `${company.url}/#organization` },
    publisher: { "@id": `${company.url}/#organization` },
    about: relatedCategories.map((category) => ({ "@type": "Thing", name: category.name[lang], url: `${company.url}/${lang}/products/${category.slug}` })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: company.name, item: `${company.url}/${lang}` },
      { "@type": "ListItem", position: 2, name: labels.insights, item: `${company.url}/${lang}/insights` },
      { "@type": "ListItem", position: 3, name: content.title, item: pageUrl },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };

  return (
    <article className="pb-24">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />

      <header className="relative isolate overflow-hidden bg-[var(--ink)] pb-16 pt-16 text-white sm:pb-24 sm:pt-24">
        <Image alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-55" fill priority sizes="100vw" src={insight.image} />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,18,14,0.99)_0%,rgba(5,18,14,0.86)_62%,rgba(5,18,14,0.45)_100%)]" />
        <Container>
          <nav aria-label="Breadcrumb"><Link className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white" href={withLocale(lang, "insights")}><ArrowLeft aria-hidden="true" size={16} />{labels.insights}</Link></nav>
          <p className="mt-12 font-mono text-xs font-semibold uppercase text-[var(--accent-mint)]">{content.topic} / {labels.updated} {dateLabel}</p>
          <h1 className="mt-6 max-w-5xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-8xl">{content.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72 sm:text-xl">{content.introduction}</p>
        </Container>
      </header>

      <Container className="grid gap-14 py-16 lg:grid-cols-[0.34fr_0.66fr] lg:py-24">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <p className="font-mono text-xs font-semibold uppercase text-[var(--green-600)]">{labels.contents}</p>
          <ol className="mt-5 border-t border-[var(--ink)]">
            {content.sections.map((section, index) => <li className="border-b border-[var(--line)] py-4 text-sm leading-6" key={section.heading}><a className="grid grid-cols-[2rem_1fr] gap-3 hover:text-[var(--green-600)]" href={`#section-${index + 1}`}><span className="font-mono text-[10px] text-[var(--green-600)]">0{index + 1}</span>{section.heading}</a></li>)}
          </ol>
          <ButtonLink className="mt-7" href={withLocale(lang, `contact?topic=${encodeURIComponent(content.title)}`)}>{labels.quote}<ArrowUpRight aria-hidden="true" size={16} /></ButtonLink>
        </aside>

        <div className="min-w-0">
          {content.sections.map((section, index) => (
            <Reveal className="scroll-mt-32 border-t border-[var(--ink)] py-10 first:pt-0" key={section.heading}>
              <section id={`section-${index + 1}`}>
                <p className="font-mono text-xs font-semibold text-[var(--green-600)]">0{index + 1}</p>
                <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p className="mt-5 text-lg leading-8 text-[var(--muted)]" key={paragraph}>{paragraph}</p>)}
                {section.points ? <ul className="mt-7 grid gap-3 sm:grid-cols-2">{section.points.map((point) => <li className="flex gap-3 border-t border-[var(--line)] pt-4 text-sm leading-6" key={point}><Check aria-hidden="true" className="mt-1 shrink-0 text-[var(--green-600)]" size={16} />{point}</li>)}</ul> : null}
              </section>
            </Reveal>
          ))}

          <Reveal className="mt-8 rounded-[2rem] bg-[var(--ink)] p-7 text-white sm:p-10">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.035em]">{labels.takeaways}</h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">{content.takeaways.map((item, index) => <li className="grid grid-cols-[2rem_1fr] gap-3 border-t border-white/15 pt-4" key={item}><span className="font-mono text-xs text-[var(--green-400)]">0{index + 1}</span><span className="text-sm leading-6 text-white/72">{item}</span></li>)}</ul>
          </Reveal>

          <section className="mt-16">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.035em]">{content.faqTitle}</h2>
            <div className="mt-7 border-t border-[var(--ink)]">{content.faq.map((item, index) => <details className="group border-b border-[var(--line)] py-6" key={item.question}><summary className="grid cursor-pointer list-none grid-cols-[2rem_1fr_auto] gap-3 font-semibold"><span className="font-mono text-[10px] text-[var(--green-600)]">0{index + 1}</span>{item.question}<span className="text-[var(--green-600)] group-open:rotate-45">+</span></summary><p className="mt-4 pl-11 leading-7 text-[var(--muted)]">{item.answer}</p></details>)}</div>
          </section>

          <p className="mt-10 border-l-2 border-[var(--green-400)] pl-5 text-sm leading-6 text-[var(--muted)]">{labels.disclaimer}</p>
        </div>
      </Container>

      <section className="border-y border-[var(--line)] bg-white py-16">
        <Container>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.035em]">{labels.related}</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {relatedCategories.map((category) => <Link className="rounded-full border border-[var(--line)] bg-[var(--bg)] px-5 py-3 text-sm font-semibold hover:border-[var(--green-400)]" href={withLocale(lang, `products/${category.slug}`)} key={category.slug}>{category.name[lang]}<ArrowUpRight aria-hidden="true" className="ml-2 inline" size={14} /></Link>)}
            {relatedProducts.map((product) => <Link className="rounded-full border border-[var(--line)] bg-[var(--bg)] px-5 py-3 text-sm font-semibold hover:border-[var(--green-400)]" href={withLocale(lang, `products/${product.category}/${product.slug}`)} key={product.slug}>{product.name[lang]}<ArrowUpRight aria-hidden="true" className="ml-2 inline" size={14} /></Link>)}
          </div>
        </Container>
      </section>

      <Container className="pt-16">
        <div className="grid overflow-hidden rounded-[2rem] bg-[var(--green-700)] text-white sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="p-7 sm:p-10"><p className="font-display text-3xl font-semibold tracking-[-0.04em]">{labels.quote}</p><p className="mt-3 text-white/68">sales@mrtmaterials.com</p></div>
          <div className="flex gap-3 p-7 pt-0 sm:p-10"><ButtonLink className="!bg-white !text-[var(--ink)]" href={withLocale(lang, "contact")}>{labels.quote}<ArrowUpRight aria-hidden="true" size={16} /></ButtonLink><a className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-5 text-sm font-semibold" href={`tel:${company.phone.e164}`}><Phone aria-hidden="true" size={16} />{company.phone.display}</a></div>
        </div>
      </Container>
    </article>
  );
}
