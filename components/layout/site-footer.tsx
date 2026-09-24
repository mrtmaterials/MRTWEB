import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { EmailLink } from "@/components/ui/email-link";
import { company } from "@/data/company";
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
    <footer className="border-t border-[var(--line)] bg-[#edf1ef] py-16 text-[var(--ink)] sm:py-20">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:grid-cols-2 sm:px-8 xl:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))] xl:gap-12 lg:px-12">
        <div>
          <BrandLogo className="h-auto w-44" sizes="176px" />
          <p className="mt-5 max-w-xs text-sm leading-6 text-[var(--muted)]">{locale === "vi" ? "Tiếp nhận yêu cầu tìm nguồn nguyên liệu thực phẩm, vật liệu bao bì và hóa chất cho doanh nghiệp sản xuất tại Việt Nam." : "Material sourcing enquiries for food ingredients, packaging materials and chemicals for manufacturers in Vietnam."}</p>
        </div>
        <address className="min-w-0 not-italic">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--green-600)]">{labels.sales}</p>
          <EmailLink className="break-all text-sm text-[var(--muted)] transition-colors hover:text-[var(--green-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]" domain="mrtmaterials.com" local="sales" />
          <a className="mt-3 block text-sm text-[var(--muted)] transition-colors hover:text-[var(--green-600)]" href={`tel:${phone.e164}`}>{phone.display}</a>
        </address>
        <address className="min-w-0 not-italic">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--green-600)]">{labels.accounts}</p>
          <EmailLink className="break-all text-sm text-[var(--muted)] transition-colors hover:text-[var(--green-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]" domain={company.emails.accounts[1]} local={company.emails.accounts[0]} />
        </address>
        <address className="min-w-0 not-italic">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--green-600)]">{labels.address}</p>
          <p className="max-w-56 text-sm leading-6 text-[var(--muted)]">{address}</p>
        </address>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1440px] flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--line)] px-5 pt-6 text-sm text-[var(--muted)] sm:px-8 lg:px-12">
        <Link className="transition-colors hover:text-[var(--green-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]" href={path("/products")}>{locale === "vi" ? "Sản phẩm" : "Products"}</Link>
        <Link className="transition-colors hover:text-[var(--green-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]" href={path("/industries")}>{locale === "vi" ? "Ứng dụng" : "Applications"}</Link>
        <Link className="transition-colors hover:text-[var(--green-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]" href={path("/insights")}>{labels.insights}</Link>
        <Link className="transition-colors hover:text-[var(--green-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]" href={path("/about")}>{locale === "vi" ? "Giới thiệu" : "About"}</Link>
        <Link className="transition-colors hover:text-[var(--green-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]" href={path("/contact")}>{locale === "vi" ? "Liên hệ" : "Contact"}</Link>
        <Link className="transition-colors hover:text-[var(--green-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]" href={path("/privacy")}>{labels.privacy}</Link>
        <Link className="transition-colors hover:text-[var(--green-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)]" href={path("/terms")}>{labels.terms}</Link>
      </div>
    </footer>
  );
}
