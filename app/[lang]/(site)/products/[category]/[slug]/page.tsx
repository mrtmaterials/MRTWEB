import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/catalog/product-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getCategory, getProduct, getProductsByCategory, products } from "@/data/catalog";
import { company } from "@/data/company";
import { getInsightContent, getRelatedInsights } from "@/data/insights";
import { getProductKnowledge } from "@/data/knowledge";
import { getDictionary, isLocale, locales, localize, withLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ lang: string; category: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    products.map((product) => ({ lang, category: product.category, slug: product.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, category, slug } = await params;
  if (!isLocale(lang)) return {};
  const product = getProduct(category, slug);
  if (!product) return {};
  return pageMetadata(
    lang,
    localize(product.name, lang),
    localize(product.summary, lang),
    `products/${category}/${slug}`,
    product.image,
  );
}

export default async function ProductPage({ params }: PageProps) {
  const { lang, category: categorySlug, slug } = await params;
  if (!isLocale(lang)) notFound();
  const category = getCategory(categorySlug);
  const product = getProduct(categorySlug, slug);
  if (!category || !product) notFound();

  const copy = getDictionary(lang);
  const name = localize(product.name, lang);
  const knowledge = getProductKnowledge(slug, lang);
  const quoteHref = `${withLocale(lang, "contact")}?product=${encodeURIComponent(name)}`;
  const related = getProductsByCategory(categorySlug).filter((item) => item.slug !== slug).slice(0, 3);
  const relatedInsights = getRelatedInsights(categorySlug, 2);
  const productUrl = `${company.url}/${lang}/products/${categorySlug}/${slug}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name,
    description: localize(product.summary, lang),
    category: localize(category.name, lang),
    image: `${company.url}${product.image}`,
    url: productUrl,
    inLanguage: lang,
    mainEntityOfPage: productUrl,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: company.name, item: `${company.url}/${lang}` },
      { "@type": "ListItem", position: 2, name: copy.nav.products, item: `${company.url}/${lang}/products` },
      { "@type": "ListItem", position: 3, name: localize(category.name, lang), item: `${company.url}/${lang}/products/${categorySlug}` },
      { "@type": "ListItem", position: 4, name, item: productUrl },
    ],
  };
  const faqJsonLd = knowledge ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: knowledge.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  } : null;

  return (
    <div className="pb-20 pt-24 sm:pt-32">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
      {faqJsonLd ? <script dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" /> : null}
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[var(--muted)]">
          <ol className="flex flex-wrap gap-2">
            <li><Link className="hover:text-[var(--green-600)]" href={withLocale(lang, "products")}>{copy.nav.products}</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link className="hover:text-[var(--green-600)]" href={withLocale(lang, `products/${categorySlug}`)}>{localize(category.name, lang)}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{name}</li>
          </ol>
        </nav>

        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-[var(--green-600)]">{localize(category.name, lang)}</p>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.055em] text-[var(--ink)] sm:text-6xl">{name}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">{localize(product.summary, lang)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={quoteHref}>{copy.common.requestQuote}</ButtonLink>
              <a className="inline-flex min-h-12 items-center rounded-full bg-white px-5 text-sm font-semibold text-[var(--ink)] ring-1 ring-inset ring-[var(--line)] hover:bg-[var(--green-50)]" href={`tel:${company.phone.e164}`}>{company.phone.display}</a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-white">
            <Image alt={`${name} — ${localize(category.name, lang)}`} className="object-cover" fill priority sizes="(min-width: 1024px) 50vw, 100vw" src={product.image} />
          </div>
        </section>

        {knowledge ? (
          <section className="mt-20 border-y border-[var(--line)] py-16 sm:mt-28 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="font-mono text-xs font-semibold uppercase text-[var(--green-600)]">{lang === "vi" ? "Hướng dẫn yêu cầu" : "Requirement guide"}</p>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl">{knowledge.title}</h2>
                <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{knowledge.introduction}</p>
                <div className="mt-9 grid gap-4 sm:grid-cols-2">
                  {knowledge.sections.map((section) => (
                    <article className="rounded-[var(--radius-card)] bg-white p-6" key={section.title}>
                      <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{section.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{section.body}</p>
                    </article>
                  ))}
                </div>
              </div>
              <aside className="rounded-[var(--radius-card)] bg-[var(--ink)] p-7 text-white sm:p-9">
                <h3 className="font-display text-2xl font-semibold">{knowledge.checklistTitle}</h3>
                <ul className="mt-7 grid gap-5">
                  {knowledge.checklist.map((item, index) => (
                    <li className="grid grid-cols-[2rem_1fr] gap-3 border-b border-white/10 pb-5 last:border-0 last:pb-0" key={item}>
                      <span className="font-mono text-xs text-[var(--accent-mint)]">0{index + 1}</span>
                      <span className="text-sm leading-6 text-white/78">{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>
        ) : null}

        <section className="mt-20 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{copy.common.applications}</h2>
            <ul className="mt-5 space-y-3 text-[var(--muted)]">
              {localize(product.applications, lang).map((application) => <li className="flex gap-3" key={application}><span aria-hidden="true" className="mt-2 size-2 rounded-full bg-[var(--green-400)]" />{application}</li>)}
            </ul>
            {product.grades?.length ? <><h3 className="mt-9 font-semibold">{copy.common.availableGrades}</h3><p className="mt-2 text-[var(--muted)]">{product.grades.join(", ")}</p></> : null}
            {product.packaging?.length ? <><h3 className="mt-7 font-semibold">{copy.common.packaging}</h3><p className="mt-2 text-[var(--muted)]">{product.packaging.join(", ")}</p></> : null}
          </div>
          <div className="rounded-[var(--radius-card)] bg-white p-7">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{copy.common.specifications}</h2>
            {product.specs?.length ? (
              <dl className="mt-5 overflow-hidden rounded-xl">
                <div className="grid grid-cols-2 gap-4 bg-[var(--green-50)] px-4 py-3 font-mono text-xs font-medium uppercase tracking-wide text-[var(--green-600)]"><dt>{copy.catalog.item}</dt><dd>{copy.catalog.value}</dd></div>
                {product.specs.map((spec) => <div className="grid grid-cols-2 gap-4 px-4 py-3 text-sm even:bg-[var(--green-50)]" key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}
              </dl>
            ) : <p className="mt-4 leading-7 text-[var(--muted)]">{copy.common.specificationsOnRequest}</p>}
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{copy.common.documentationOnRequest}</p>
          </div>
        </section>

        {relatedInsights.length ? (
          <section className="mt-20 border-y border-[var(--line)] py-12">
            <p className="font-mono text-xs font-semibold uppercase text-[var(--green-600)]">{lang === "vi" ? "Kiến thức liên quan" : "Related insights"}</p>
            <div className="mt-7 grid gap-7 lg:grid-cols-2">
              {relatedInsights.map((insight, index) => { const article = getInsightContent(insight, lang); return <Link className="group grid grid-cols-[3rem_1fr_auto] gap-3 border-t border-[var(--ink)] pt-5" href={withLocale(lang, `insights/${insight.slug}`)} key={insight.slug}><span className="font-mono text-xs text-[var(--green-600)]">0{index + 1}</span><div><h3 className="font-display text-xl font-semibold tracking-[-0.025em]">{article.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{article.description}</p></div><span aria-hidden="true" className="text-[var(--green-600)]">↗</span></Link>; })}
            </div>
          </section>
        ) : null}

        {related.length ? (
          <section className="mt-20">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{copy.common.relatedProducts}</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => <ProductCard categoryName={localize(category.name, lang)} detailsLabel={copy.common.learnMore} key={item.slug} locale={lang} product={item} quoteLabel={copy.common.requestQuote} />)}
            </div>
          </section>
        ) : null}

        {knowledge ? (
          <section className="mt-20">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em]">{lang === "vi" ? "Câu hỏi thường gặp" : "Frequently asked questions"}</h2>
            <div className="mt-7 grid gap-4 lg:grid-cols-2">
              {knowledge.faq.map((item) => (
                <details className="rounded-[var(--radius-card)] bg-white p-6 open:shadow-[0_12px_36px_rgba(15,26,23,0.06)]" key={item.question}>
                  <summary className="cursor-pointer list-none font-semibold leading-6">{item.question}</summary>
                  <p className="mt-4 leading-7 text-[var(--muted)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </div>
  );
}
