import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { LocaleSwitch } from "@/components/layout/locale-switch";
import { MobileNav } from "@/components/layout/mobile-nav";
import type { Category } from "@/data/catalog";
import type { Locale } from "@/lib/i18n";

type HeaderLabels = {
  about: string;
  closeMenu: string;
  contact: string;
  industries: string;
  openMenu: string;
  products: string;
  quality: string;
  requestQuote: string;
};

type SiteHeaderProps = {
  catalog: readonly Category[];
  labels: HeaderLabels;
  locale: Locale;
};

export function SiteHeader({ catalog, labels, locale }: SiteHeaderProps) {
  const path = (suffix = "") => `/${locale}${suffix}`;
  const navItems = [
    { href: path("/products"), label: labels.products },
    { href: path("/industries"), label: labels.industries },
    { href: path("/about"), label: labels.about },
    { href: path("/quality"), label: labels.quality },
    { href: path("/contact"), label: labels.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-[color:rgba(244,246,247,0.78)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-24 max-w-[1440px] items-center gap-4 px-5 sm:px-8 lg:px-12">
        <Link
          aria-label="MRT Materials"
          className="relative z-10 shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]"
          href={path()}
        >
          <BrandLogo className="h-[82px] w-[102px] object-contain sm:h-[88px] sm:w-[112px]" priority sizes="112px" />
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          <details className="group relative">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1 rounded-full px-3 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)] [&::-webkit-details-marker]:hidden">
              {labels.products}
              <span aria-hidden="true" className="text-xs transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <div className="absolute left-0 top-[calc(100%+0.6rem)] w-[min(42rem,calc(100vw-3rem))] rounded-[20px] bg-white p-4 shadow-[0_18px_50px_rgba(15,26,23,0.14)] ring-1 ring-[var(--line)]">
              <div className="grid gap-2 sm:grid-cols-3">
                {catalog.map((category) => (
                  <Link
                    className="rounded-2xl p-4 text-sm transition-colors hover:bg-[var(--green-50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]"
                    href={path(`/products/${category.slug}`)}
                    key={category.slug}
                  >
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--green-600)]">{String(category.order).padStart(2, "0")}</span>
                    <span className="block font-semibold text-[var(--ink)]">{category.name[locale]}</span>
                    <span className="mt-1 block leading-5 text-[var(--muted)]">{category.description[locale]}</span>
                  </Link>
                ))}
              </div>
            </div>
          </details>
          {navItems.slice(1).map((item) => (
            <Link className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LocaleSwitch locale={locale} />
          <Link className="inline-flex min-h-11 items-center rounded-full bg-[var(--green-700)] px-4 text-sm font-semibold text-white transition-colors hover:bg-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)] focus-visible:ring-offset-2" href={path("/contact")}>
            {labels.requestQuote}
          </Link>
        </div>

        <div className="ml-auto lg:hidden">
          <LocaleSwitch locale={locale} />
        </div>

        <MobileNav closeLabel={labels.closeMenu} items={navItems} openLabel={labels.openMenu} quoteHref={path("/contact")} quoteLabel={labels.requestQuote} />
      </div>
    </header>
  );
}
