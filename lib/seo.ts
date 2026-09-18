import type { Metadata } from "next";

import { company } from "@/data/company";
import type { Locale } from "@/lib/i18n";

export function pageMetadata(
  locale: Locale,
  title: string,
  description: string,
  pathname = "",
  image = "/brand/og-card.webp",
): Metadata {
  const path = pathname ? `/${pathname.replace(/^\/+/, "")}` : "";
  const canonical = `${company.url}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${company.url}/en${path}`,
        vi: `${company.url}/vi${path}`,
        "x-default": `${company.url}/en${path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: company.name,
      title,
      description,
      url: canonical,
      locale: locale === "vi" ? "vi_VN" : "en_US",
      images: [{ url: `${company.url}${image}`, width: 1200, height: 630, alt: `${company.name} — material sourcing in Vietnam` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${company.url}${image}`],
    },
  };
}
