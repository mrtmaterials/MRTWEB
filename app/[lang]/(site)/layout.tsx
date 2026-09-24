import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CursorDot } from "@/components/motion/cursor-dot";
import { LocaleDocument } from "@/components/motion/locale-document";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${company.url}/#organization`,
        name: company.name,
        url: company.url,
        logo: `${company.url}/brand/logo-transparent.webp`,
        email: company.emails.sales.join("@"),
        telephone: company.phone.e164,
        areaServed: { "@type": "Country", name: "Vietnam" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: company.emails.sales.join("@"),
          telephone: company.phone.e164,
          availableLanguage: ["English", "Vietnamese"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address,
          addressLocality: "Ho Chi Minh City",
          addressCountry: "VN",
        },
        knowsAbout: [
          "Food ingredients",
          "Nutraceutical ingredients",
          "Packaging materials",
          "Industrial chemicals",
          "Material sourcing",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${company.url}/#website`,
        url: company.url,
        name: company.name,
        publisher: { "@id": `${company.url}/#organization` },
        inLanguage: ["en", "vi"],
      },
    ],
  };

  return (
    <>
      <LocaleDocument locale={lang} />
      <SmoothScroll />
      <CursorDot />
      <a className="skip-link" href="#main-content">{dictionary.nav.skipToContent}</a>
      <SiteHeader catalog={categories} labels={dictionary.nav} locale={lang} />
      <main id="main-content">{children}</main>
      <SiteFooter
        address={company.address}
        labels={{
          sales: dictionary.contact.sales,
          accounts: dictionary.contact.accounts,
          address: dictionary.contact.address,
          insights: dictionary.footer.insights,
          privacy: dictionary.footer.privacy,
          terms: dictionary.footer.terms,
        }}
        locale={lang}
        phone={company.phone}
      />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} type="application/ld+json" />
    </>
  );
}
