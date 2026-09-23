import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ProductsExplorer } from "@/components/catalog/products-explorer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories, products } from "@/data/catalog";
import { company } from "@/data/company";
import { getDictionary, getLocale, isLocale, locales, localize } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = getLocale(lang);
  const copy = getDictionary(locale);
  return pageMetadata(locale, copy.catalog.title, copy.catalog.intro, "products");
}

export default async function ProductsPage({ params }: PageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = getDictionary(lang);
  const guide = lang === "vi" ? [
    { title: "Xác định đúng vật liệu", body: "Gửi tên đầy đủ, grade hiện tại hoặc sản phẩm tham chiếu, ứng dụng và các chỉ tiêu quan trọng để tránh so sánh sai phạm vi." },
    { title: "Nêu nhu cầu thương mại", body: "Bổ sung lượng thử, nhu cầu định kỳ, quy cách đóng gói, điểm giao và thời gian mục tiêu để xem xét phương án khả thi." },
    { title: "Liệt kê tài liệu cần thiết", body: "Nêu rõ COA, TDS, SDS hoặc tài liệu nội bộ cần cho quy trình đánh giá. Khả năng cung cấp phụ thuộc từng nguồn hàng." },
  ] : [
    { title: "Identify the exact material", body: "Share the full name, current grade or reference product, application and critical attributes to avoid comparing the wrong scope." },
    { title: "State the commercial need", body: "Include trial and routine volume, pack format, delivery location and target timing so feasible options can be reviewed." },
    { title: "List required documents", body: "State which COA, TDS, SDS or internal approval documents are needed. Availability depends on the selected source." },
  ];
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${company.url}/${lang}/products#collection`,
    url: `${company.url}/${lang}/products`,
    name: copy.catalog.title,
    description: copy.catalog.intro,
    inLanguage: lang,
    isPartOf: { "@id": `${company.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: localize(product.name, lang),
        url: `${company.url}/${lang}/products/${product.category}/${product.slug}`,
      })),
    },
  };

  return (
    <div className="pb-20 pt-20 sm:pt-28">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
      <Container>
        <SectionHeading className="mb-12" description={copy.catalog.intro} eyebrow={copy.catalog.eyebrow} level="h1" title={copy.catalog.title} />
        <ProductsExplorer
          categories={categories}
          copy={{
            allCategories: copy.common.allCategories,
            searchProducts: copy.common.searchProducts,
            noProducts: copy.common.noProducts,
            requestQuote: copy.common.requestQuote,
            details: copy.common.learnMore,
            catalogueLabel: copy.catalog.catalogueLabel,
            filterLabel: copy.catalog.filterLabel,
          }}
          locale={lang}
          products={products}
        />

        <section className="mt-20 rounded-[2rem] bg-[var(--ink)] p-7 text-white sm:p-12">
          <p className="font-mono text-xs font-semibold uppercase text-[var(--accent-mint)]">{lang === "vi" ? "Chuẩn bị RFQ" : "Preparing an RFQ"}</p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.035em]">{lang === "vi" ? "Ba thông tin giúp yêu cầu tìm nguồn rõ ràng hơn." : "Three inputs that make a sourcing request clearer."}</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/12 lg:grid-cols-3">
            {guide.map((item, index) => (
              <article className="bg-[var(--ink)] p-6 sm:p-8" key={item.title}>
                <p className="font-mono text-xs text-[var(--accent-mint)]">0{index + 1}</p>
                <h3 className="mt-6 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/68">{item.body}</p>
              </article>
            ))}
          </div>
          <Link
            className="group mt-8 inline-flex items-center gap-2 border-b border-[var(--accent-mint)] pb-1 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-mint)]"
            href={`/${lang}/insights/preparing-a-material-rfq`}
          >
            {lang === "vi" ? "Đọc checklist RFQ đầy đủ" : "Read the complete RFQ checklist"}
            <ArrowUpRight aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={15} />
          </Link>
        </section>
      </Container>
    </div>
  );
}
