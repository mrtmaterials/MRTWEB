"use client";

import { useMemo, useState } from "react";
import type { Category, Product } from "@/data/catalog";
import type { Locale } from "@/lib/i18n";
import { localize } from "@/lib/i18n";
import { ProductCard } from "./product-card";

type ProductsExplorerProps = {
  categories: Category[];
  products: Product[];
  locale: Locale;
  copy: { allCategories: string; searchProducts: string; noProducts: string; requestQuote: string; details: string; catalogueLabel: string; filterLabel: string };
};

export function ProductsExplorer({ categories, products, locale, copy }: ProductsExplorerProps) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const visibleProducts = useMemo(() => {
    const search = query.trim().toLocaleLowerCase(locale);
    return products.filter((product) => {
      const categoryMatch = category === "all" || product.category === category;
      const searchable = [
        localize(product.name, locale),
        product.chemicalName ? localize(product.chemicalName, locale) : "",
        product.casNumber ?? "",
        ...(product.grades ?? []),
        localize(product.summary, locale),
        ...localize(product.applications, locale),
      ].join(" ").toLocaleLowerCase(locale);
      return categoryMatch && (!search || searchable.includes(search));
    });
  }, [category, locale, products, query]);

  return (
    <section aria-label={copy.catalogueLabel} className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label={copy.filterLabel} className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setCategory("all")} aria-pressed={category === "all"} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)] ${category === "all" ? "bg-[var(--green-700)] text-white" : "bg-white text-[var(--ink)]"}`}>{copy.allCategories}</button>
          {categories.map((item) => <button key={item.slug} type="button" onClick={() => setCategory(item.slug)} aria-pressed={category === item.slug} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)] ${category === item.slug ? "bg-[var(--green-700)] text-white" : "bg-white text-[var(--ink)]"}`}>{localize(item.name, locale)}</button>)}
        </div>
        <label className="relative block lg:w-80"><span className="sr-only">{copy.searchProducts}</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder={copy.searchProducts} className="min-h-12 w-full rounded-full bg-white px-5 text-sm text-[var(--ink)] outline-none ring-1 ring-inset ring-[var(--line)] placeholder:text-[var(--muted)] focus:ring-2 focus:ring-[var(--green-600)]" /></label>
      </div>
      {visibleProducts.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{visibleProducts.map((product) => <ProductCard key={product.slug} product={product} locale={locale} categoryName={localize(categories.find((item) => item.slug === product.category)?.name ?? { en: "", vi: "" }, locale)} detailsLabel={copy.details} quoteLabel={copy.requestQuote} />)}</div> : <p role="status" className="rounded-[20px] bg-white p-8 text-[var(--muted)]">{copy.noProducts}</p>}
    </section>
  );
}
