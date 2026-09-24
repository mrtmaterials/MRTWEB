import { ArrowRight, ArrowUpRight, Check, FileCheck2, Languages, Layers3, PackageCheck, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { HomeScrollEffects } from "@/components/motion/home-scroll-effects";
import { MolecularField } from "@/components/motion/molecular-field";
import { IndustryShowcase } from "@/components/sections/industry-showcase";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories, products } from "@/data/catalog";
import { company, salesEmail } from "@/data/company";
import { getInsightContent, insights } from "@/data/insights";
import type { Dictionary, Locale } from "@/lib/i18n";

type HomePageProps = {
  dictionary: Dictionary;
  locale: Locale;
};

const editorialCopy = {
  en: {
    scopeLabel: "Current sourcing scope",
    scope: [
      { value: "03", label: "Material portfolios", note: "Ingredients, industrial materials and chemicals" },
      { value: "08", label: "Current material lines", note: "Each has a material-specific enquiry guide" },
      { value: "EN / VI", label: "Bilingual enquiries", note: "Enquiries accepted in English or Vietnamese" },
      { value: "04", label: "Enquiry stages", note: "Requirement, documents, quotation and delivery" },
    ],
    corridor: {
      eyebrow: "[ SOURCING BRIEF ]",
      title: "Information to include in a material enquiry",
      body: "Provide the material identity, intended application, required documents, quantity, packaging and delivery location. These details define the technical and commercial scope for review.",
      items: [
        { title: "Material identity", body: "Name, CAS number or comparison grade where available." },
        { title: "Application and process", body: "Intended use, process conditions and critical parameters." },
        { title: "Required documents", body: "COA, TDS, SDS and other documents required by your team." },
        { title: "Quantity and delivery", body: "Quantity, packaging, destination and requested timing." },
      ],
      action: "Prepare an RFQ",
    },
    faq: {
      eyebrow: "[ BUYER QUESTIONS ]",
      title: "Frequently asked questions",
      body: "The answers below explain what to include in an enquiry and which details remain subject to confirmation.",
      items: [
        { question: "Can MRT Materials review an unlisted material?", answer: "Yes. Share the material identity, application and available specification so the sourcing requirement can be assessed." },
        { question: "Which documents can be requested?", answer: "Available COA, TDS and SDS documents can be coordinated for the selected material and source. State the required set in your enquiry." },
        { question: "What makes an RFQ easier to evaluate?", answer: "Include the exact material or comparison grade, intended use, quantity, packaging, destination and required timing." },
        { question: "Does website content confirm availability?", answer: "No. Availability, documentation and commercial terms are confirmed only after the exact requirement has been reviewed." },
      ],
    },
    contactLine: "Sales enquiry",
  },
  vi: {
    scopeLabel: "Phạm vi tìm nguồn hiện tại",
    scope: [
      { value: "03", label: "Nhóm nguyên liệu", note: "Nguyên liệu, vật liệu công nghiệp và hóa chất" },
      { value: "08", label: "Dòng vật liệu hiện có", note: "Mỗi dòng có hướng dẫn chuẩn bị yêu cầu riêng" },
      { value: "EN / VI", label: "Yêu cầu song ngữ", note: "Tiếp nhận yêu cầu bằng tiếng Anh hoặc tiếng Việt" },
      { value: "04", label: "Giai đoạn xử lý", note: "Yêu cầu, tài liệu, báo giá và giao nhận" },
    ],
    corridor: {
      eyebrow: "[ HỒ SƠ TÌM NGUỒN ]",
      title: "Thông tin cần có trong yêu cầu nguyên liệu",
      body: "Cung cấp tên nguyên liệu, ứng dụng, tài liệu cần thiết, số lượng, quy cách bao bì và địa điểm giao hàng. Đây là cơ sở để hai bên rà soát phạm vi kỹ thuật và thương mại.",
      items: [
        { title: "Định danh nguyên liệu", body: "Tên, số CAS hoặc phân hạng tham chiếu nếu có." },
        { title: "Ứng dụng và quy trình", body: "Mục đích sử dụng, điều kiện quy trình và thông số quan trọng." },
        { title: "Bộ tài liệu cần thiết", body: "COA, TDS, SDS và các tài liệu khác mà đội ngũ của Quý khách yêu cầu." },
        { title: "Số lượng và giao hàng", body: "Số lượng, bao bì, điểm đến và thời gian yêu cầu." },
      ],
      action: "Chuẩn bị RFQ",
    },
    faq: {
      eyebrow: "[ CÂU HỎI MUA HÀNG ]",
      title: "Câu hỏi thường gặp",
      body: "Các nội dung dưới đây nêu rõ thông tin cần có trong yêu cầu và những điểm phải xác nhận theo từng nguồn hàng.",
      items: [
        { question: "MRT Materials có xem xét nguyên liệu chưa có trong danh mục không?", answer: "Có. Vui lòng chia sẻ định danh nguyên liệu, ứng dụng và thông số hiện có để chúng tôi xem xét nhu cầu tìm nguồn." },
        { question: "Có thể yêu cầu những tài liệu nào?", answer: "COA, TDS và SDS hiện có có thể được phối hợp cho nguyên liệu và nguồn cung được lựa chọn. Hãy nêu rõ bộ tài liệu cần thiết trong yêu cầu." },
        { question: "Một RFQ nên có những thông tin gì?", answer: "Nên bao gồm nguyên liệu hoặc phân hạng tham chiếu, mục đích sử dụng, số lượng, bao bì, điểm đến và thời gian cần hàng." },
        { question: "Nội dung website có xác nhận khả năng cung ứng không?", answer: "Không. Khả năng cung ứng, tài liệu và điều khoản thương mại chỉ được xác nhận sau khi yêu cầu cụ thể được xem xét." },
      ],
    },
    contactLine: "Liên hệ kinh doanh",
  },
} satisfies Record<Locale, unknown>;

export function HomePage({ dictionary, locale }: HomePageProps) {
  const { home, common } = dictionary;
  const featured = products.filter((product) => product.featured);
  const path = (suffix = "") => `/${locale}${suffix}`;
  const editorial = editorialCopy[locale];
  const leadCategory = categories[0];
  const supportingCategories = categories.slice(1);
  const leadProduct = featured[0];
  const supportingProducts = featured.slice(1);
  const featuredInsights = insights.slice(0, 3);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: editorial.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
      <HomeScrollEffects />
      <section className="hero-stage relative isolate min-h-[calc(100svh-6rem)] overflow-hidden bg-[var(--ink)] text-white">
        <Image
          alt="Quality-control specialist working in a controlled laboratory environment"
          className="hero-media absolute inset-0 h-full w-full object-cover object-[62%_center]"
          fill
          priority
          sizes="100vw"
          src="/images/editorial/lab-hero.webp"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,20,16,0.98)_0%,rgba(6,20,16,0.92)_42%,rgba(6,20,16,0.42)_72%,rgba(6,20,16,0.12)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(6,20,16,0.78)_0%,rgba(6,20,16,0.92)_64%,rgba(6,20,16,0.98)_100%)]" />
        <div aria-hidden="true" className="hero-aperture absolute inset-0 hidden mix-blend-screen lg:block" />
        <div aria-hidden="true" className="film-grain absolute inset-0 opacity-[0.08] mix-blend-soft-light" />
        <Container className="hero-container relative flex min-h-[calc(100svh-6rem)] items-end py-14 sm:py-20 lg:items-center lg:py-24">
          <div className="relative z-10 max-w-[72rem]">
            <Reveal>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-mint)]">
                {home.eyebrow}
              </p>
            </Reveal>
            <h1 className="hero-title mt-7 max-w-[72rem] font-display text-[clamp(2.6rem,min(5vw,9vh),4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
              {home.title}
            </h1>
            <Reveal delay={0.22}>
              <p className="hero-summary mt-8 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">{home.summary}</p>
              <div className="hero-actions mt-9 flex flex-wrap gap-3">
                <ButtonLink className="!bg-white !text-[var(--ink)] hover:!bg-[var(--accent-mint)] max-sm:w-full" href={path("/contact")}>
                  {common.requestQuote}<ArrowUpRight aria-hidden="true" size={17} />
                </ButtonLink>
                <ButtonLink className="!border-white/35 !bg-white/10 !text-white backdrop-blur-md hover:!bg-white/20 max-sm:w-full" href={path("/products")} variant="secondary">
                  {common.exploreProducts}<ArrowRight aria-hidden="true" size={17} />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <Reveal className="absolute right-10 bottom-10 hidden max-w-[18rem] border-l border-[var(--accent-mint)] pl-5 lg:block" delay={0.35}>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent-mint)]">01 / SOURCE &nbsp; 02 / VERIFY &nbsp; 03 / DELIVER</p>
            <p className="mt-3 text-sm leading-6 text-white/85">{home.why.items[1]?.body}</p>
          </Reveal>
        </Container>
      </section>

      <section aria-label={editorial.scopeLabel} className="border-y border-white/10 bg-[var(--ink)] text-white">
        <Container className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
          {editorial.scope.map((item, index) => {
            const Icon = [Layers3, PackageCheck, Languages, FileCheck2][index] ?? Check;
            return (
              <div className="grid grid-cols-[auto_1fr] gap-4 py-6 sm:px-6 sm:first:pl-0 xl:px-8 xl:first:pl-0 xl:last:pr-0" key={item.label}>
                <Icon aria-hidden="true" className="mt-1 text-[var(--green-400)]" size={20} strokeWidth={1.6} />
                <div>
                  <p className="font-display text-3xl font-semibold tracking-[-0.04em]">{index === 1 ? String(products.length).padStart(2, "0") : item.value}</p>
                  <p className="mt-1 text-sm font-semibold">{item.label}</p>
                  <p className="mt-1 text-xs leading-5 text-white/55">{item.note}</p>
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="bg-[#eef2f0] py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading description={home.categories.body} eyebrow={home.categories.eyebrow} title={home.categories.title} />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
            <Reveal>
              <Link className="category-card group relative grid min-h-[27rem] overflow-hidden rounded-[var(--radius-card)] bg-[var(--ink)] p-7 shadow-[0_20px_60px_rgba(15,26,23,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)] sm:min-h-[36rem] sm:p-9" href={path(`/products/${leadCategory.slug}`)}>
                <Image alt="" className="category-image absolute inset-0 h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.07] motion-reduce:transition-none" fill sizes="(max-width: 1024px) 100vw, 58vw" src={leadCategory.image} />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,16,13,0.10)_0%,rgba(5,16,13,0.25)_42%,rgba(5,16,13,0.97)_100%)]" />
                <span className="relative font-mono text-xs font-semibold uppercase text-[var(--accent-mint)]">[ {String(leadCategory.order).padStart(2, "0")} / {locale === "vi" ? "DANH MỤC CHÍNH" : "LEAD PORTFOLIO"} ]</span>
                <div className="relative mt-auto max-w-2xl pt-32">
                  <h3 className="font-display text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl">{leadCategory.name[locale]}</h3>
                  <p className="mt-5 max-w-xl leading-7 text-white/82">{leadCategory.description[locale]}</p>
                </div>
                <span className="absolute top-6 right-6 grid size-11 place-items-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-[var(--ink)] motion-reduce:transition-none"><ArrowUpRight aria-hidden="true" size={19} /></span>
              </Link>
            </Reveal>
            <div className="grid gap-5">
              {supportingCategories.map((category, index) => (
                <Reveal delay={(index + 1) * 0.08} key={category.slug}>
                  <Link className="category-card group relative grid min-h-[23rem] overflow-hidden rounded-[var(--radius-card)] bg-[var(--ink)] p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-600)] sm:min-h-[17.5rem]" href={path(`/products/${category.slug}`)}>
                    <Image alt="" className="category-image absolute inset-0 h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.07] motion-reduce:transition-none" fill sizes="(max-width: 1024px) 100vw, 42vw" src={category.image} />
                    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,16,13,0.94)_0%,rgba(5,16,13,0.66)_55%,rgba(5,16,13,0.22)_100%)]" />
                    <span className="relative font-mono text-xs font-semibold text-[var(--accent-mint)]">0{category.order}</span>
                    <div className="relative mt-auto max-w-md">
                      <h3 className="font-display text-3xl font-semibold leading-none tracking-[-0.04em] text-white">{category.name[locale]}</h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/82">{category.description[locale]}</p>
                    </div>
                    <ArrowUpRight aria-hidden="true" className="absolute top-7 right-7 text-white" size={20} />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <IndustryShowcase
        body={locale === "vi" ? "Các vật liệu có cùng tên nhóm vẫn có thể khác về grade, tính chất vật lý và hành vi gia công. Vì vậy, yêu cầu cần nêu rõ ứng dụng và điều kiện sản xuất dự kiến." : "Materials with the same general name may differ in grade, physical properties and process behaviour. State the intended application and production conditions in the enquiry."}
        eyebrow={home.industries.eyebrow}
        items={home.industries.items}
        locale={locale}
        title={home.industries.title}
      />

      <section className="process-section overflow-x-clip py-24 sm:py-32">
        <Container className="grid gap-14 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="xl:self-start">
            <Reveal><SectionHeading eyebrow={home.process.eyebrow} title={home.process.title} /></Reveal>
            <div className="mt-8 h-1 overflow-hidden rounded-full bg-[var(--line)]"><div className="process-progress h-full w-full origin-left bg-[var(--green-600)]" /></div>
            <p className="mt-7 max-w-sm text-sm leading-7 text-[var(--muted)]">{locale === "vi" ? "Bốn bước dùng để xác nhận định danh nguyên liệu, yêu cầu kỹ thuật, điều kiện báo giá và thông tin giao nhận." : "The four stages confirm material identity, technical requirements, quotation details and delivery information."}</p>
          </div>
          <ol className="relative border-t border-[var(--ink)]">
            <svg aria-hidden="true" className="absolute top-0 left-24 hidden h-full w-3 overflow-visible xl:block" preserveAspectRatio="none" viewBox="0 0 12 1000">
              <path d="M6 0 V1000" fill="none" stroke="rgba(15,26,23,0.12)" strokeWidth="1" />
              <path className="route-path" d="M6 0 V1000" fill="none" pathLength="1" stroke="var(--green-600)" strokeLinecap="round" strokeWidth="2" />
            </svg>
            {home.process.steps.map((step, index) => (
              <Reveal delay={index * 0.06} key={step.title}>
                <li className="process-step grid scroll-mt-28 gap-5 border-b border-[var(--line)] py-8 md:grid-cols-[4rem_minmax(10rem,0.75fr)_minmax(0,1fr)] md:items-start md:gap-7 md:py-10 xl:grid-cols-[5.5rem_minmax(10rem,0.75fr)_minmax(0,1fr)]">
                  <p className="process-number relative z-10 font-display text-5xl font-semibold tracking-[-0.06em] text-[var(--green-600)]">0{index + 1}</p>
                  <h3 className="min-w-0 font-display text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{step.title}</h3>
                  <p className="min-w-0 max-w-xl leading-7 text-[var(--muted)]">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="editorial-wipe relative isolate overflow-hidden bg-[var(--green-700)] py-24 text-white sm:py-32">
        <Image alt="Container port supporting regional material logistics" className="editorial-media absolute inset-0 -z-20 h-full w-full object-cover" fill sizes="100vw" src="/images/editorial/container-port.webp" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,25,20,0.97)_0%,rgba(5,25,20,0.88)_55%,rgba(5,25,20,0.45)_100%)]" />
        <MolecularField className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full opacity-75 lg:block" />
        <Container className="relative z-10 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase text-[var(--accent-mint)]">{editorial.corridor.eyebrow}</p>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">{editorial.corridor.title}</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">{editorial.corridor.body}</p>
            <ButtonLink className="mt-9 !bg-white !text-[var(--ink)] hover:!bg-[var(--accent-mint)]" href={path("/contact")}>{editorial.corridor.action}<ArrowUpRight aria-hidden="true" size={17} /></ButtonLink>
          </Reveal>
          <div className="grid border-t border-white/25 sm:grid-cols-2">
            {editorial.corridor.items.map((item, index) => (
              <Reveal className="border-b border-white/20 py-7 sm:px-7 sm:odd:border-r sm:even:pr-0 sm:odd:pl-0" delay={index * 0.06} key={item.title}>
                <p className="font-mono text-xs text-[var(--green-400)]">0{index + 1}</p>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.025em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="overflow-hidden bg-[var(--ink)] py-24 text-white sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <Reveal className="relative min-h-[31rem] overflow-hidden rounded-[var(--radius-card)]">
            <Image alt="Warehouse handling supporting coordinated material delivery" className="absolute inset-0 h-full w-full object-cover" fill sizes="(max-width: 1024px) 100vw, 54vw" src="/images/editorial/warehouse-forklift.webp" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <div className="absolute right-7 bottom-7 left-7">
              <p className="font-mono text-xs text-[var(--accent-mint)]">[ SOURCE / REVIEW / COORDINATE ]</p>
              <p className="mt-4 max-w-md text-lg leading-7 text-white/82">{locale === "vi" ? "Thông tin kỹ thuật và thương mại đã xác nhận được dùng xuyên suốt khi chuẩn bị báo giá, đơn hàng và giao nhận." : "Confirmed technical and commercial details are carried through quotation, order and delivery preparation."}</p>
            </div>
          </Reveal>
          <div>
            <Reveal><SectionHeading className="[&_h2]:!text-white" eyebrow={home.why.eyebrow} title={home.why.title} /></Reveal>
            <div className="mt-10 border-t border-white/20">
              {home.why.items.map((item, index) => (
                <Reveal delay={index * 0.05} key={item.title}>
                  <div className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/15 py-6">
                    <span className="font-mono text-xs text-[var(--green-400)]">0{index + 1}</span>
                    <div><h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-white/62">{item.body}</p></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              description={locale === "vi" ? "Thông số, COA, TDS, SDS, thử nghiệm sản xuất và các thông tin cần có trong yêu cầu nguyên liệu." : "Specifications, COA, TDS, SDS, production trials and the information required in a material enquiry."}
              eyebrow={locale === "vi" ? "[ KIẾN THỨC VẬT LIỆU ]" : "[ MATERIAL KNOWLEDGE ]"}
              title={locale === "vi" ? "Hướng dẫn tìm nguồn và đánh giá nguyên liệu" : "Material sourcing and technical review guides"}
            />
          </Reveal>
          <div className="mt-12 grid gap-10 border-t border-[var(--ink)] pt-9 lg:grid-cols-3 lg:gap-0">
            {featuredInsights.map((insight, index) => {
              const knowledge = getInsightContent(insight, locale);
              return (
                <Reveal delay={index * 0.06} key={insight.slug}>
                  <article className="flex h-full flex-col lg:border-r lg:border-[var(--line)] lg:px-8 lg:first:pl-0 lg:last:border-0 lg:last:pr-0">
                    <p className="font-mono text-xs font-semibold text-[var(--green-600)]">0{index + 1}</p>
                    <h3 className="mt-7 font-display text-2xl font-semibold leading-tight tracking-[-0.025em]">{knowledge.title}</h3>
                    <p className="mt-4 line-clamp-4 leading-7 text-[var(--muted)]">{knowledge.description}</p>
                    <Link className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-600)]" href={path(`/insights/${insight.slug}`)}>
                      {common.learnMore}<ArrowUpRight aria-hidden="true" size={16} />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <ButtonLink className="mt-10" href={path("/insights")} variant="secondary">{locale === "vi" ? "Xem toàn bộ kiến thức" : "View all insights"}<ArrowRight aria-hidden="true" size={17} /></ButtonLink>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <Reveal><SectionHeading eyebrow={home.featured.eyebrow} title={home.featured.title} /></Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <Reveal>
              <Link className="group relative grid min-h-[34rem] overflow-hidden rounded-[var(--radius-card)] bg-[var(--ink)] p-7 sm:p-9" href={path(`/products/${leadProduct.category}/${leadProduct.slug}`)}>
                <Image alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04] motion-reduce:transition-none" fill sizes="(max-width: 1024px) 100vw, 54vw" src={leadProduct.image} />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,18,14,0.08)_0%,rgba(5,18,14,0.30)_42%,rgba(5,18,14,0.96)_100%)]" />
                <p className="relative font-mono text-xs font-semibold text-[var(--accent-mint)]">[ 01 / {locale === "vi" ? "VẬT LIỆU TRỌNG TÂM" : "MATERIAL FOCUS"} ]</p>
                <div className="relative mt-auto max-w-xl">
                  <h3 className="font-display text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">{leadProduct.name[locale]}</h3>
                  <p className="mt-4 leading-7 text-white/70">{leadProduct.summary[locale]}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">{common.learnMore}<ArrowUpRight aria-hidden="true" size={16} /></span>
                </div>
              </Link>
            </Reveal>
            <div className="border-t border-[var(--ink)]">
              {supportingProducts.map((product, index) => (
                <Reveal delay={index * 0.06} key={product.slug}>
                  <Link className="group grid grid-cols-[5rem_1fr_auto] items-center gap-4 border-b border-[var(--line)] py-6" href={path(`/products/${product.category}/${product.slug}`)}>
                    <Image alt="" className="aspect-square rounded-xl object-cover" height={96} src={product.image} width={96} />
                    <div><p className="font-mono text-[10px] font-semibold text-[var(--green-600)]">0{index + 2}</p><h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.025em]">{product.name[locale]}</h3><p className="mt-1 line-clamp-1 text-sm text-[var(--muted)]">{product.summary[locale]}</p></div>
                    <ArrowUpRight aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={19} />
                  </Link>
                </Reveal>
              ))}
              <ButtonLink className="mt-8" href={path("/products")} variant="secondary">{common.viewAll}<ArrowRight aria-hidden="true" size={17} /></ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <Reveal><SectionHeading description={editorial.faq.body} eyebrow={editorial.faq.eyebrow} title={editorial.faq.title} /></Reveal>
          <div className="border-t border-[var(--ink)]">
            {editorial.faq.items.map((item, index) => (
              <Reveal delay={index * 0.05} key={item.question}>
                <details className="group border-b border-[var(--line)] py-6">
                  <summary className="grid cursor-pointer list-none grid-cols-[2.5rem_1fr_auto] gap-3 font-display text-xl font-semibold tracking-[-0.02em]"><span className="font-mono text-xs font-normal text-[var(--green-600)]">0{index + 1}</span><span>{item.question}</span><span className="text-[var(--green-600)] transition-transform group-open:rotate-45">+</span></summary>
                  <p className="mt-4 max-w-2xl pl-[3.25rem] leading-7 text-[var(--muted)]">{item.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container>
          <Reveal className="grid overflow-hidden rounded-[2rem] bg-[var(--green-700)] text-white lg:grid-cols-[1.05fr_0.95fr]">
            <div className="px-7 py-14 sm:px-12 sm:py-20 lg:px-16">
              <h2 className="font-display text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">{home.cta.title}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{home.cta.body}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink className="!bg-white !text-[var(--ink)] hover:!bg-[var(--accent-mint)]" href={path("/contact")}>{home.cta.button}<ArrowUpRight aria-hidden="true" size={17} /></ButtonLink>
                <a className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-5 text-sm font-semibold text-white transition hover:bg-white/10" href={`tel:${company.phone.e164}`}><Phone aria-hidden="true" size={16} />{company.phone.display}</a>
              </div>
              <p className="mt-7 text-sm text-white/65">{editorial.contactLine}: <a className="font-semibold text-white underline decoration-white/30 underline-offset-4" href={`mailto:${salesEmail}`}>{salesEmail}</a></p>
            </div>
            <div className="relative min-h-[22rem] lg:min-h-full">
              <Image alt="Laboratory quality review for material sourcing" className="absolute inset-0 h-full w-full object-cover" fill sizes="(max-width: 1024px) 100vw, 42vw" src="/images/editorial/lab-quality.webp" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[var(--green-700)]/45 to-transparent" />
              <p className="absolute right-7 bottom-7 left-7 font-mono text-[11px] text-white/85">[ REQUIREMENT / DOCUMENTS / REVIEW ]</p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
