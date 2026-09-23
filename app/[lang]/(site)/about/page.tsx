import { ArrowUpRight, FileCheck2, PackageSearch, Scale, Truck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { company, salesEmail } from "@/data/company";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() { return locales.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const copy = getDictionary(lang).about;
  return pageMetadata(lang, copy.eyebrow, copy.body, "about");
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = getDictionary(lang).about;
  const profile = lang === "vi" ? {
    statusLabel: "Hồ sơ doanh nghiệp",
    statusTitle: "MRT Materials là doanh nghiệp mới, được xây dựng bởi đội ngũ có nhiều năm kinh nghiệm trong ngành nguyên liệu.",
    statusBody: "MRT Materials tập trung tiếp nhận yêu cầu tìm nguồn cho doanh nghiệp sản xuất tại Việt Nam. Kinh nghiệm được nhắc đến trên website là kinh nghiệm làm việc của đội ngũ sáng lập, không phải số năm hoạt động của pháp nhân MRT Materials.",
    facts: [
      ["Thị trường phục vụ", "Doanh nghiệp sản xuất tại Việt Nam"],
      ["Phạm vi sản phẩm", "Nguyên liệu thực phẩm, vật liệu bao bì và hóa chất"],
      ["Mô hình hoạt động", "Tìm nguồn, rà soát tài liệu, báo giá và phối hợp giao nhận"],
      ["Đầu mối kinh doanh", `${salesEmail} · ${company.phone.display}`],
    ],
    capabilityEyebrow: "Năng lực triển khai",
    capabilityTitle: "Từ yêu cầu kỹ thuật đến phương án thương mại",
    capabilities: [
      ["Tiếp nhận hồ sơ yêu cầu", "Ghi nhận tên nguyên liệu hoặc số CAS, ứng dụng, grade, chỉ tiêu quan trọng, số lượng và điểm giao."],
      ["Rà soát nguồn và tài liệu", "Đối chiếu thông tin từ nguồn được đề xuất và xác nhận COA, TDS, SDS hoặc tài liệu nào hiện có."],
      ["Mẫu, MOQ và báo giá", "Khả năng cung cấp mẫu, MOQ, bao bì, xuất xứ, thời gian giao và điều kiện thương mại được xác nhận theo từng nguồn."],
      ["Đặt hàng và giao nhận", "Sau khi thống nhất điều kiện, hai bên xác nhận đơn hàng, chứng từ và phương án giao nhận."],
    ],
    transparencyEyebrow: "Thông tin được xác nhận theo từng yêu cầu",
    transparencyTitle: "Không mặc định khả năng cung ứng khi chưa có nguồn cụ thể",
    transparencyBody: "Website không dùng một thông tin chung để đại diện cho mọi nhà sản xuất hoặc mọi lô hàng. Xuất xứ, khả năng nhập khẩu, MOQ, mẫu, bao bì, lead time, Incoterms và bộ tài liệu được kiểm tra theo nguyên liệu và nguồn hàng đang được đề xuất.",
    documents: ["Tên thương mại, tên hóa học và số CAS", "Grade, tiêu chuẩn hoặc sản phẩm tham chiếu", "COA, TDS, SDS và tài liệu chất lượng hiện có", "Quy cách bao bì, MOQ và sản lượng dự kiến", "Xuất xứ, điểm giao và tiến độ mục tiêu"],
    ctaTitle: "Gửi hồ sơ nguyên liệu để bắt đầu rà soát",
    ctaBody: "Nếu chưa có đủ thông tin, hãy gửi tên sản phẩm hoặc datasheet hiện tại. Đội ngũ MRT Materials sẽ xác định những nội dung còn thiếu cho bước rà soát ban đầu.",
    cta: "Gửi yêu cầu nguyên liệu",
  } : {
    statusLabel: "Company profile",
    statusTitle: "MRT Materials is a newly established business built by a team with years of materials-industry experience.",
    statusBody: "MRT Materials handles sourcing enquiries for manufacturers in Vietnam. References to experience on this website describe the founding team’s working experience, not the operating age of the MRT Materials legal entity.",
    facts: [
      ["Market served", "Manufacturers in Vietnam"],
      ["Product scope", "Food ingredients, packaging materials and chemicals"],
      ["Operating model", "Sourcing, document review, quotation and delivery coordination"],
      ["Sales contact", `${salesEmail} · ${company.phone.display}`],
    ],
    capabilityEyebrow: "Operating capability",
    capabilityTitle: "From technical requirement to commercial proposal",
    capabilities: [
      ["Requirement intake", "Record the material name or CAS number, application, grade, critical limits, quantity and destination."],
      ["Source and document review", "Compare information from a proposed source and confirm which COA, TDS, SDS or supporting documents are available."],
      ["Sample, MOQ and quotation", "Sample availability, MOQ, packaging, origin, lead time and commercial terms are confirmed for each source."],
      ["Order and delivery", "After terms are agreed, both parties confirm the order, documents and delivery arrangement."],
    ],
    transparencyEyebrow: "Confirmed for each enquiry",
    transparencyTitle: "Supply capability is not assumed before a source is identified",
    transparencyBody: "General website information does not represent every manufacturer or batch. Origin, import arrangement, MOQ, samples, packaging, lead time, Incoterms and available documents are checked for the material and source under review.",
    documents: ["Trade name, chemical name and CAS number", "Grade, standard or reference product", "Available COA, TDS, SDS and quality documents", "Packaging, MOQ and expected volume", "Origin, destination and target timing"],
    ctaTitle: "Send a material brief for initial review",
    ctaBody: "If the requirement is incomplete, send the product name or current datasheet. The MRT Materials team will identify the missing information needed for an initial review.",
    cta: "Send a material enquiry",
  };
  const icons = [PackageSearch, FileCheck2, Scale, Truck];
  return (
    <>
      <PageHero description={copy.body} eyebrow={copy.eyebrow} title={copy.title} />
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--green-600)]">{profile.statusLabel}</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl">{profile.statusTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{profile.statusBody}</p>
          </Reveal>
          <dl className="grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-[var(--line)] sm:grid-cols-2">
            {profile.facts.map(([label, value], index) => (
              <Reveal className="bg-white p-6 sm:p-8" delay={index * 0.05} key={label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--green-600)]">{label}</dt>
                <dd className="mt-4 text-base font-semibold leading-7">{value}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-[var(--ink)] py-20 text-white sm:py-28">
        <Container>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--green-400)]">{profile.capabilityEyebrow}</p>
            <h2 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl">{profile.capabilityTitle}</h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/15 md:grid-cols-2 xl:grid-cols-4">
            {profile.capabilities.map(([title, body], index) => {
              const Icon = icons[index];
              return (
                <Reveal className="bg-[var(--ink)] p-7 sm:p-8" delay={index * 0.05} key={title}>
                  <Icon aria-hidden="true" className="text-[var(--green-400)]" size={24} strokeWidth={1.7} />
                  <p className="mt-8 font-mono text-[10px] text-[var(--accent-mint)]">0{index + 1}</p>
                  <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/68">{body}</p>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--green-600)]">{profile.transparencyEyebrow}</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl">{profile.transparencyTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{profile.transparencyBody}</p>
          </Reveal>
          <div className="rounded-[var(--radius-card)] bg-white p-7 sm:p-9">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--green-600)]">{lang === "vi" ? "Thông tin cần đối chiếu" : "Information to verify"}</p>
            <ul className="mt-6 grid gap-4">
              {profile.documents.map((item, index) => <li className="grid grid-cols-[2rem_1fr] gap-3 border-b border-[var(--line)] pb-4 last:border-0 last:pb-0" key={item}><span className="font-mono text-xs text-[var(--green-600)]">0{index + 1}</span><span className="leading-6 text-[var(--muted)]">{item}</span></li>)}
            </ul>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <Reveal className="rounded-[2rem] bg-[var(--green-700)] p-8 text-white sm:p-12 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:p-16">
            <div className="max-w-3xl">
              <h2 className="font-display text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">{profile.ctaTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-white/78">{profile.ctaBody}</p>
            </div>
            <Link className="mt-8 inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[var(--ink)] lg:mt-0" href={`/${lang}/contact`}>{profile.cta}<ArrowUpRight aria-hidden="true" size={17} /></Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
