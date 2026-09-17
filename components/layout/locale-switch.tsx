"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/i18n";

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const alternateLocale: Locale = locale === "en" ? "vi" : "en";
  const suffix = pathname.replace(/^\/(?:en|vi)(?=\/|$)/, "") || "";

  return (
    <Link
      className="rounded-full px-2 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]"
      href={`/${alternateLocale}${suffix}`}
      hrefLang={alternateLocale}
      lang={alternateLocale}
    >
      {alternateLocale}
    </Link>
  );
}

