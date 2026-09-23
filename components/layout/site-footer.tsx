import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { EmailLink } from "@/components/ui/email-link";
import type { Locale } from "@/lib/i18n";

type FooterLabels = {
  accounts: string;
  address: string;
  insights: string;
  privacy: string;
  sales: string;
  terms: string;
};

type SiteFooterProps = {
  address: string;
  labels: FooterLabels;
  locale: Locale;
  phone: { display: string; e164: string };
};

export function SiteFooter({ address, labels, locale, phone }: SiteFooterProps) {
  const path = (suffix = "") => `/${locale}${suffix}`;

  return (
    <footer className="overflow-hidden bg-[var(--ink)] pt-16 text-white sm:pt-20">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 md:grid-cols-[1.2fr_repeat(3,1fr)] lg:px-12">
        <div>
          <BrandLogo className="h-auto w-44" sizes="176px" />
        </div>
        <address className="not-italic">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent-mint)]">{labels.sales}</p>
          <EmailLink className="break-all text-sm text-white/78 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-400)]" domain="mrtmaterials.com" local="sales" />
          <a className="mt-3 block text-sm text-white/78 transition-colors hover:text-white" href={`tel:${phone.e164}`}>{phone.display}</a>
        </address>
        <address className="not-italic">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent-mint)]">{labels.accounts}</p>
          <EmailLink className="break-all text-sm text-white/78 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-400)]" domain="mrtmaterials.com" local="accountdept" />
        </address>
        <address className="not-italic">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent-mint)]">{labels.address}</p>
          <p className="max-w-56 text-sm leading-6 text-white/78">{address}</p>
        </address>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1440px] flex-wrap items-center gap-x-5 gap-y-2 px-5 text-sm text-white/62 sm:px-8 lg:px-12">
        <Link className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-400)]" href={path("/insights")}>{labels.insights}</Link>
        <Link className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-400)]" href={path("/privacy")}>{labels.privacy}</Link>
        <Link className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-400)]" href={path("/terms")}>{labels.terms}</Link>
      </div>
      <p aria-hidden="true" className="mt-12 whitespace-nowrap text-center text-[15vw] font-semibold leading-[0.72] tracking-[-0.08em] text-white/[0.09] sm:mt-16">
        MRT MATERIALS
      </p>
    </footer>
  );
}
