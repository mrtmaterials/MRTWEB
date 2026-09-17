import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/catalog";
import type { Locale } from "@/lib/i18n";
import { localize, withLocale } from "@/lib/i18n";

type ProductCardProps = {
  product: Product;
  locale: Locale;
  categoryName: string;
  detailsLabel: string;
  quoteLabel: string;
};

export function ProductCard({ product, locale, categoryName, detailsLabel, quoteLabel }: ProductCardProps) {
  const href = withLocale(locale, `products/${product.category}/${product.slug}`);
  const quoteHref = `${withLocale(locale, "contact")}?product=${encodeURIComponent(localize(product.name, locale))}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_12px_34px_rgba(15,26,23,0.06)]">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)] focus-visible:ring-inset">
        <Image src={product.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none" />
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--green-600)]">{categoryName}</p>
        <div className="space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.035em] text-[var(--ink)]"><Link href={href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]">{localize(product.name, locale)}</Link></h2>
          <p className="text-sm leading-6 text-[var(--muted)]">{localize(product.summary, locale)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <Link href={href} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]">
            <span className="sr-only">{localize(product.name, locale)}: </span>{detailsLabel}<span aria-hidden="true">↗</span>
          </Link>
          <Link href={quoteHref} className="rounded-full bg-[var(--green-50)] px-3 py-2 text-xs font-semibold text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]">{quoteLabel}</Link>
        </div>
      </div>
    </article>
  );
}
