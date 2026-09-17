import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/catalog/product-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getCategory, getProduct, getProductsByCategory, products } from "@/data/catalog";
import { company } from "@/data/company";
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
  const quoteHref = `${withLocale(lang, "contact")}?product=${encodeURIComponent(name)}`;
  const related = getProductsByCategory(categorySlug).filter((item) => item.slug !== slug).slice(0, 3);
  const productUrl = `${company.url}/${lang}/products/${categorySlug}/${slug}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: localize(product.summary, lang),
    category: localize(category.name, lang),
    image: `${company.url}${product.image}`,
    url: productUrl,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: company.name, item: `${company.url}/${lang}` },
      { "@type": "ListItem", position: 2, name: copy.nav.products, item: `${company.url}/${lang}/products` },
      { "@type": "ListItem", position: 3, name: localize(category.name, lang), item: `${company.url}/${lang}/products/${categorySlug}` },
      { "@type": "ListItem", position: 4, name },
    ],
  };

  return (
    <div className="pb-20 pt-24 sm:pt-32">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
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
            <ButtonLink className="mt-8" href={quoteHref}>{copy.common.requestQuote}</ButtonLink>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-white">
            <Image alt="" className="object-cover" fill priority sizes="(min-width: 1024px) 50vw, 100vw" src={product.image} />
          </div>
        </section>

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

        {related.length ? (
          <section className="mt-20">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{copy.common.relatedProducts}</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => <ProductCard categoryName={localize(category.name, lang)} detailsLabel={copy.common.learnMore} key={item.slug} locale={lang} product={item} quoteLabel={copy.common.requestQuote} />)}
            </div>
          </section>
        ) : null}
      </Container>
    </div>
  );
}
