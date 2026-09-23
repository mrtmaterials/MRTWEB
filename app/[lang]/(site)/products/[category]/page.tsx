import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/catalog/product-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories, getCategory, getProductsByCategory } from "@/data/catalog";
import { company } from "@/data/company";
import { getInsightContent, getRelatedInsights } from "@/data/insights";
import { getCategoryKnowledge } from "@/data/knowledge";
import { getDictionary, isLocale, locales, localize, withLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ lang: string; category: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => categories.map((category) => ({ lang, category: category.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, category: slug } = await params;
  if (!isLocale(lang)) return {};
  const category = getCategory(slug);
  if (!category) return {};
  return pageMetadata(
    lang,
    localize(category.name, lang),
    localize(category.description, lang),
    `products/${slug}`,
    category.image,
  );
}

export default async function CategoryPage({ params }: PageProps) {
  const { lang, category: slug } = await params;
  if (!isLocale(lang)) notFound();
  const category = getCategory(slug);
  if (!category) notFound();

  const copy = getDictionary(lang);
  const knowledge = getCategoryKnowledge(slug, lang);
  const categoryProducts = getProductsByCategory(slug);
  const relatedInsights = getRelatedInsights(slug, 3);
  const categoryName = localize(category.name, lang);
  const categoryUrl = `${company.url}/${lang}/products/${slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${categoryUrl}#collection`,
        url: categoryUrl,
        name: categoryName,
        description: localize(category.description, lang),
        inLanguage: lang,
        isPartOf: { "@id": `${company.url}/#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: categoryProducts.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: localize(product.name, lang),
            url: `${company.url}/${lang}/products/${slug}/${product.slug}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: company.name, item: `${company.url}/${lang}` },
          { "@type": "ListItem", position: 2, name: copy.nav.products, item: `${company.url}/${lang}/products` },
          { "@type": "ListItem", position: 3, name: categoryName, item: categoryUrl },
        ],
      },
    ],
  };

  return (
    <div className="pb-20 pt-20 sm:pt-28">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} type="application/ld+json" />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[var(--muted)]">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link className="font-semibold text-[var(--green-600)] hover:text-[var(--ink)]" href={withLocale(lang, "products")}>{copy.nav.products}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{categoryName}</li>
          </ol>
        </nav>

        <SectionHeading
          className="mb-12"
          description={localize(category.description, lang)}
          eyebrow={`[ 0${category.order} / ${copy.nav.products.toUpperCase()} ]`}
          title={categoryName}
        />

        <section aria-label={`${categoryName} catalogue`} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {categoryProducts.map((product) => (
            <ProductCard
              categoryName={categoryName}
              detailsLabel={copy.common.learnMore}
              key={product.slug}
              locale={lang}
              product={product}
              quoteLabel={copy.common.requestQuote}
            />
          ))}
        </section>

        {knowledge ? (
          <section className="mt-20 border-t border-[var(--line)] pt-16 sm:mt-28 sm:pt-20">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
              <div>
                <p className="font-mono text-xs font-semibold uppercase text-[var(--green-600)]">{lang === "vi" ? "Kiến thức tìm nguồn" : "Sourcing knowledge"}</p>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl">{knowledge.title}</h2>
                <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{knowledge.introduction}</p>
              </div>
              <div className="grid gap-4">
                {knowledge.sections.map((section, index) => (
                  <article className="rounded-[var(--radius-card)] bg-white p-6 sm:p-8" key={section.title}>
                    <p className="font-mono text-xs font-semibold text-[var(--green-600)]">0{index + 1}</p>
                    <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.025em]">{section.title}</h3>
                    <p className="mt-3 leading-7 text-[var(--muted)]">{section.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-14 grid gap-4 lg:grid-cols-2">
              {knowledge.faq.map((item) => (
                <details className="group rounded-[var(--radius-card)] bg-white p-6 open:shadow-[0_12px_36px_rgba(15,26,23,0.06)]" key={item.question}>
                  <summary className="cursor-pointer list-none pr-8 font-semibold leading-6 text-[var(--ink)] marker:hidden">{item.question}</summary>
                  <p className="mt-4 leading-7 text-[var(--muted)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {relatedInsights.length ? (
          <section className="mt-20 border-t border-[var(--ink)] pt-10">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div><p className="font-mono text-xs font-semibold uppercase text-[var(--green-600)]">{lang === "vi" ? "Hướng dẫn liên quan" : "Related guides"}</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.035em]">{lang === "vi" ? "Đọc sâu hơn trước khi gửi yêu cầu." : "Go deeper before sending an enquiry."}</h2></div>
              <Link className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-600)]" href={withLocale(lang, "insights")}>{lang === "vi" ? "Xem toàn bộ kiến thức" : "View all insights"}<ArrowUpRight aria-hidden="true" size={16} /></Link>
            </div>
            <div className="mt-8 grid gap-7 md:grid-cols-3">
              {relatedInsights.map((insight, index) => { const article = getInsightContent(insight, lang); return <Link className="group border-t border-[var(--line)] pt-5" href={withLocale(lang, `insights/${insight.slug}`)} key={insight.slug}><p className="font-mono text-[10px] text-[var(--green-600)]">0{index + 1} / {article.topic}</p><h3 className="mt-3 font-display text-xl font-semibold leading-tight tracking-[-0.025em]">{article.title}</h3><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-600)]">{copy.common.learnMore}<ArrowUpRight aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={15} /></span></Link>; })}
            </div>
          </section>
        ) : null}

        <section className="mt-16 rounded-[20px] bg-[var(--green-700)] p-8 text-white sm:p-10">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em]">{copy.home.cta.title}</h2>
          <p className="mt-3 max-w-xl leading-7 text-white/85">{copy.home.cta.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink className="!bg-white !text-[var(--ink)] hover:!bg-[var(--green-50)]" href={withLocale(lang, "contact")}>{copy.common.requestQuote}</ButtonLink>
            <a className="inline-flex min-h-12 items-center rounded-full border border-white/35 px-5 text-sm font-semibold hover:bg-white/10" href={`tel:${company.phone.e164}`}>{company.phone.display}</a>
          </div>
        </section>
      </Container>
    </div>
  );
}
