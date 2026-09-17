import type { Metadata } from "next";

import { company } from "@/data/company";
import type { Locale } from "@/lib/i18n";

export function pageMetadata(
  locale: Locale,
  title: string,
  description: string,
  pathname = "",
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
      },
    },
    openGraph: {
      type: "website",
      siteName: company.name,
      title,
      description,
      url: canonical,
      locale: locale === "vi" ? "vi_VN" : "en_US",
      images: [{ url: `${company.url}/brand/logo.jpg`, width: 1280, height: 960 }],
    },
  };
}

