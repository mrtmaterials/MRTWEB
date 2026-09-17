import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/catalog/product-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories, getCategory, getProductsByCategory } from "@/data/catalog";
import { getDictionary, isLocale, locales, localize, withLocale } from "@/lib/i18n";

type PageProps = { params: Promise<{ lang: string; category: string }> };
export function generateStaticParams() { return locales.flatMap((lang) => categories.map((category) => ({ lang, category: category.slug }))); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { lang, category: slug } = await params; if (!isLocale(lang)) return {}; const category = getCategory(slug); if (!category) return {}; const title = localize(category.name, lang); return { title, description: localize(category.description, lang), alternates: { canonical: `https://mrtmaterials.com/${lang}/products/${slug}` } }; }

export default async function CategoryPage({ params }: PageProps) {
  const { lang, category: slug } = await params;
  if (!isLocale(lang)) notFound();
  const category = getCategory(slug); if (!category) notFound();
  const copy = getDictionary(lang); const categoryProducts = getProductsByCategory(slug);
  return <div className="pb-20 pt-24 sm:pt-32"><Container><Link href={withLocale(lang, "products")} className="mb-8 inline-flex text-sm font-semibold text-[var(--green-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]">← {copy.common.backToProducts}</Link><SectionHeading eyebrow={`[ 0${category.order} / ${copy.nav.products.toUpperCase()} ]`} title={localize(category.name, lang)} description={localize(category.description, lang)} className="mb-12" /><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{categoryProducts.map((product) => <ProductCard key={product.slug} product={product} locale={lang} categoryName={localize(category.name, lang)} detailsLabel={copy.common.learnMore} quoteLabel={copy.common.requestQuote} />)}</div><div className="mt-14 rounded-[20px] bg-[var(--green-700)] p-8 text-white sm:p-10"><h2 className="font-display text-3xl font-semibold tracking-[-0.04em]">{copy.home.cta.title}</h2><p className="mt-3 max-w-xl leading-7 text-white/85">{copy.home.cta.body}</p><ButtonLink href={withLocale(lang, "contact")} className="mt-6 bg-white text-[var(--ink)] hover:bg-[var(--green-50)]">{copy.common.requestQuote}</ButtonLink></div></Container></div>;
}
