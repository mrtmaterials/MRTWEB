import { ClipboardCheck, FileSearch, PackageCheck, Warehouse } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const icons = [FileSearch, ClipboardCheck, PackageCheck, Warehouse];

export function generateStaticParams() { return locales.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const copy = getDictionary(lang).quality;
  return pageMetadata(lang, copy.eyebrow, copy.intro, "quality");
}

export default async function QualityPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = getDictionary(lang).quality;
  const reviewGuide = lang === "vi" ? [
    { title: "Trước khi báo giá", body: "Xác định đúng vật liệu, grade, ứng dụng, số lượng và danh sách tài liệu cần xem xét." },
    { title: "Trước khi phê duyệt", body: "Đối chiếu COA mẫu, TDS, SDS và các giới hạn nội bộ với nguồn hàng cụ thể được đề xuất." },
    { title: "Trước khi sử dụng", body: "Hoàn tất đánh giá kỹ thuật, pháp lý, an toàn và thử nghiệm sản xuất theo quy trình của doanh nghiệp." },
  ] : [
    { title: "Before quotation", body: "Confirm the exact material, grade, application, quantity and list of documents required for review." },
    { title: "Before approval", body: "Compare representative COA, TDS, SDS and internal limits against the specific proposed source." },
    { title: "Before use", body: "Complete your technical, regulatory, safety and production-trial review under your company process." },
  ];
  return (
    <>
      <PageHero description={copy.intro} eyebrow={copy.eyebrow} title={copy.title} />
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {copy.items.map((item, index) => {
              const Icon = icons[index];
              return <Reveal delay={index * 0.06} key={item.title}><article className="h-full rounded-[var(--radius-card)] bg-white p-7 sm:p-9"><span className="grid size-12 place-items-center rounded-2xl bg-[var(--green-50)] text-[var(--green-600)]"><Icon aria-hidden="true" size={22} /></span><h2 className="mt-8 font-display text-2xl font-semibold tracking-[-0.035em]">{item.title}</h2><p className="mt-4 leading-7 text-[var(--muted)]">{item.body}</p></article></Reveal>;
            })}
          </div>
          <Reveal className="mt-8 rounded-[var(--radius-card)] bg-[var(--green-50)] p-6 text-sm leading-6 text-[var(--ink)] sm:p-8">{copy.note}</Reveal>
          <section className="mt-16 border-t border-[var(--line)] pt-14">
            <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-[-0.035em]">{lang === "vi" ? "Một quy trình đánh giá rõ ràng cho mỗi nguồn hàng." : "A clear review path for each proposed source."}</h2>
            <div className="mt-9 grid gap-4 lg:grid-cols-3">
              {reviewGuide.map((item, index) => (
                <article className="rounded-[var(--radius-card)] bg-white p-6 sm:p-8" key={item.title}>
                  <p className="font-mono text-xs font-semibold text-[var(--green-600)]">0{index + 1}</p>
                  <h3 className="mt-6 font-display text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>
        </Container>
      </section>
    </>
  );
}
