import Image from "next/image";

import type { Product } from "@/data/catalog";
import type { Locale } from "@/lib/i18n";
import { localize } from "@/lib/i18n";

type ProductVisualProps = {
  categoryName: string;
  locale: Locale;
  priority?: boolean;
  product: Product;
};

export function ProductVisual({ categoryName, locale, priority = false, product }: ProductVisualProps) {
  const name = localize(product.name, locale);
  const usesTechnicalVisual = product.entryType === "material";

  if (!usesTechnicalVisual) {
    return (
      <Image
        alt={`${name} — ${categoryName}`}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
        src={product.image}
      />
    );
  }

  return (
    <div
      aria-label={`${name} — ${categoryName}`}
      className="absolute inset-0 overflow-hidden bg-[linear-gradient(145deg,#e7f2ed_0%,#f8fbfa_52%,#d8e9e2_100%)] p-6 text-[var(--ink)] sm:p-8"
      role="img"
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(13,128,88,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(13,128,88,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div aria-hidden="true" className="absolute -right-16 -bottom-20 size-64 rounded-full border border-[var(--green-600)]/15 bg-white/45" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--green-600)]">
          <span>{locale === "vi" ? "Hồ sơ nguyên liệu" : "Material file"}</span>
          <span>{product.casNumber ? `CAS ${product.casNumber}` : (locale === "vi" ? "Cần xác nhận dạng" : "Form to confirm")}</span>
        </div>
        <div className="mt-auto max-w-full">
          <p className="break-words font-display text-4xl font-semibold leading-none tracking-[-0.055em] text-[var(--green-700)] sm:text-5xl">{product.visualCode ?? name}</p>
          {product.chemicalName ? <p className="mt-4 max-w-md text-sm font-semibold leading-5 text-[var(--ink)]/78">{localize(product.chemicalName, locale)}</p> : null}
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-[var(--green-600)]/20 pt-4 text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
            <span>{categoryName}</span>
            <span>{locale === "vi" ? "Theo yêu cầu" : "Enquiry only"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
