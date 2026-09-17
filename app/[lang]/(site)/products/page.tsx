import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductsExplorer } from "@/components/catalog/products-explorer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories, products } from "@/data/catalog";
import { getDictionary, getLocale, isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ lang: string }> };

export function generateStaticParams() { return locales.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = getLocale(lang);
  const copy = getDictionary(locale);
  return pageMetadata(locale, copy.catalog.title, copy.catalog.intro, "products");
}

export default async function ProductsPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = getDictionary(lang);
  return <div className="pb-20 pt-24 sm:pt-32"><Container><SectionHeading eyebrow={copy.catalog.eyebrow} title={copy.catalog.title} description={copy.catalog.intro} className="mb-12" /><ProductsExplorer categories={categories} products={products} locale={lang} copy={{ allCategories: copy.common.allCategories, searchProducts: copy.common.searchProducts, noProducts: copy.common.noProducts, requestQuote: copy.common.requestQuote, details: copy.common.learnMore, catalogueLabel: copy.catalog.catalogueLabel, filterLabel: copy.catalog.filterLabel }} /></Container></div>;
}
