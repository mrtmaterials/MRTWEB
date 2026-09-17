import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { CursorDot } from "@/components/motion/cursor-dot";
import { LocaleDocument } from "@/components/motion/locale-document";
import { PageTransition } from "@/components/motion/page-transition";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { categories } from "@/data/catalog";
import { company } from "@/data/company";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function SiteLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = getDictionary(lang);
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.url,
    email: company.emails.sales.join("@"),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: "Hồ Chí Minh",
      addressCountry: "VN",
    },
  };

  return (
    <>
      <LocaleDocument locale={lang} />
      <SmoothScroll />
      <CursorDot />
      <PageTransition />
      <a className="skip-link" href="#main-content">{dictionary.nav.skipToContent}</a>
      <SiteHeader catalog={categories} labels={dictionary.nav} locale={lang} />
      <main id="main-content">{children}</main>
      <SiteFooter
        address={company.address}
        labels={{
          sales: dictionary.contact.sales,
          accounts: dictionary.contact.accounts,
          address: dictionary.contact.address,
          privacy: dictionary.footer.privacy,
          terms: dictionary.footer.terms,
        }}
        locale={lang}
      />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} type="application/ld+json" />
    </>
  );
}
