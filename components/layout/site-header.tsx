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
  insights: string;
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
    { href: path("/insights"), label: labels.insights },
    { href: path("/about"), label: labels.about },
    { href: path("/quality"), label: labels.quality },
    { href: path("/contact"), label: labels.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-[color:rgba(244,246,247,0.78)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[5.25rem] max-w-[1440px] items-center gap-4 px-5 sm:px-8 lg:px-12">
        <Link
          aria-label="MRT Materials"
          className="relative z-10 shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]"
          href={path()}
        >
          <BrandLogo className="h-[72px] w-[88px] object-contain sm:h-[78px] sm:w-[96px]" priority sizes="96px" />
        </Link>

        <nav className="ml-auto hidden items-center gap-1 xl:flex">
          <div className="group relative">
            <Link className="flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]" href={path("/products")}>
              {labels.products}
              <span aria-hidden="true" className="text-xs transition-transform group-hover:rotate-180 group-focus-within:rotate-180">⌄</span>
            </Link>
            <div className="invisible absolute left-0 top-[calc(100%+0.6rem)] w-[min(42rem,calc(100vw-3rem))] translate-y-1 rounded-[20px] bg-white p-4 opacity-0 shadow-[0_18px_50px_rgba(15,26,23,0.14)] ring-1 ring-[var(--line)] transition before:absolute before:-top-3 before:left-0 before:h-3 before:w-full before:content-[''] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
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
          </div>
          {navItems.slice(1).map((item) => (
            <Link className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <LocaleSwitch locale={locale} />
          <Link className="magnetic-target inline-flex min-h-11 items-center rounded-full bg-[var(--green-700)] px-4 text-sm font-semibold text-white transition-[color,background-color,transform] hover:bg-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)] focus-visible:ring-offset-2" href={path("/contact")}>
            {labels.requestQuote}
          </Link>
        </div>

        <div className="ml-auto xl:hidden">
          <LocaleSwitch locale={locale} />
        </div>

        <MobileNav closeLabel={labels.closeMenu} items={navItems} openLabel={labels.openMenu} quoteHref={path("/contact")} quoteLabel={labels.requestQuote} />
      </div>
    </header>
  );
}
