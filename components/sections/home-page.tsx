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
      { value: "08", label: "Focused material lines", note: "Each with a dedicated requirement guide" },
      { value: "EN / VI", label: "Bilingual support", note: "Clear sourcing conversations in English or Vietnamese" },
      { value: "04", label: "Review stages", note: "Source, verify, quote and coordinate delivery" },
    ],
    corridor: {
      eyebrow: "[ SOURCING BRIEF ]",
      title: "The useful details travel with the material.",
      body: "A stronger enquiry connects the exact material identity with the application, document needs and delivery context. MRT Materials keeps those details together for review.",
      items: [
        { title: "Material identity", body: "Name, CAS number or comparison grade where available." },
        { title: "Application fit", body: "Intended use, process conditions and critical parameters." },
        { title: "Document set", body: "Available COA, TDS and SDS requirements for review." },
        { title: "Delivery context", body: "Quantity, packaging, destination and requested timing." },
      ],
      action: "Prepare an RFQ",
    },
    faq: {
      eyebrow: "[ BUYER QUESTIONS ]",
      title: "Useful answers before the first enquiry.",
      body: "Start with what your technical and purchasing teams already know. Missing details can be clarified during review.",
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
      { value: "08", label: "Dòng vật liệu trọng tâm", note: "Mỗi dòng có hướng dẫn chuẩn bị yêu cầu riêng" },
      { value: "EN / VI", label: "Hỗ trợ song ngữ", note: "Trao đổi tìm nguồn rõ ràng bằng tiếng Anh hoặc tiếng Việt" },
      { value: "04", label: "Giai đoạn xem xét", note: "Tìm nguồn, xác minh, báo giá và phối hợp giao hàng" },
    ],
    corridor: {
      eyebrow: "[ HỒ SƠ TÌM NGUỒN ]",
      title: "Thông tin cần thiết đi cùng từng yêu cầu nguyên liệu.",
      body: "Một yêu cầu tốt kết nối đúng định danh nguyên liệu với ứng dụng, tài liệu cần thiết và bối cảnh giao hàng. MRT Materials tập hợp các thông tin đó để xem xét.",
      items: [
        { title: "Định danh nguyên liệu", body: "Tên, số CAS hoặc phân hạng tham chiếu nếu có." },
        { title: "Mức độ phù hợp", body: "Mục đích sử dụng, điều kiện quy trình và thông số quan trọng." },
        { title: "Bộ tài liệu", body: "Yêu cầu COA, TDS và SDS hiện có để xem xét." },
        { title: "Bối cảnh giao hàng", body: "Số lượng, bao bì, điểm đến và thời gian yêu cầu." },
      ],
      action: "Chuẩn bị RFQ",
    },
    faq: {
      eyebrow: "[ CÂU HỎI MUA HÀNG ]",
      title: "Thông tin hữu ích trước lần trao đổi đầu tiên.",
      body: "Hãy bắt đầu từ những gì bộ phận kỹ thuật và mua hàng đã có. Các chi tiết còn thiếu có thể được làm rõ trong quá trình xem xét.",
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
      <section className="hero-stage relative isolate min-h-[calc(100svh-5.25rem)] overflow-hidden bg-[var(--ink)] text-white">
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
        <Container className="relative flex min-h-[calc(100svh-5.25rem)] items-end py-14 sm:py-20 lg:items-center lg:py-24">
          <div className="relative z-10 max-w-[58rem]">
            <Reveal>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-mint)]">
                {home.eyebrow}
              </p>
            </Reveal>
            <h1 className="hero-title mt-7 max-w-5xl font-display text-[clamp(3.1rem,6.7vw,6.8rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white">
              {home.title.split(" ").map((word, index) => (
                <span className="hero-word mr-[0.2em] inline-block overflow-hidden align-top" key={`${word}-${index}`}>
                  <span className="inline-block">{word}</span>{" "}
                </span>
              ))}
            </h1>
            <Reveal delay={0.22}>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">{home.summary}</p>
              <div className="mt-9 flex flex-wrap gap-3">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-mint)]">01 / SOURCE &nbsp; 02 / VERIFY &nbsp; 03 / DELIVER</p>
            <p className="mt-3 text-sm leading-6 text-white/75">{home.why.items[1]?.body}</p>
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
                  <p className="font-display text-3xl font-semibold tracking-[-0.04em]">{item.value}</p>
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
                  <p className="mt-5 max-w-xl leading-7 text-white/72">{leadCategory.description[locale]}</p>
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
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/68">{category.description[locale]}</p>
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
        body={locale === "vi" ? "Từ nguyên liệu công thức đến nhựa bao bì và hóa chất theo yêu cầu, mỗi trao đổi bắt đầu từ bối cảnh sản xuất thực tế." : "From formulation inputs to packaging resins and requested chemicals, each conversation starts with the real manufacturing context."}
        eyebrow={home.industries.eyebrow}
        items={home.industries.items}
        locale={locale}
        title={home.industries.title}
      />

      <section className="process-section overflow-hidden py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal><SectionHeading eyebrow={home.process.eyebrow} title={home.process.title} /></Reveal>
            <div className="mt-8 h-1 overflow-hidden rounded-full bg-[var(--line)]"><div className="process-progress h-full w-full origin-left bg-[var(--green-600)]" /></div>
            <p className="mt-7 max-w-sm text-sm leading-7 text-[var(--muted)]">{locale === "vi" ? "Một luồng trao đổi liên tục giúp thông tin kỹ thuật, tài liệu và điều kiện giao hàng không bị tách rời." : "One continuous review keeps technical information, documents and delivery conditions connected."}</p>
          </div>
          <ol className="relative border-t border-[var(--ink)]">
            <svg aria-hidden="true" className="absolute top-0 left-[2.35rem] hidden h-full w-3 overflow-visible lg:block" preserveAspectRatio="none" viewBox="0 0 12 1000">
              <path d="M6 0 V1000" fill="none" stroke="rgba(15,26,23,0.12)" strokeWidth="1" />
              <path className="route-path" d="M6 0 V1000" fill="none" pathLength="1" stroke="var(--green-600)" strokeLinecap="round" strokeWidth="2" />
            </svg>
            {home.process.steps.map((step, index) => (
              <Reveal delay={index * 0.06} key={step.title}>
                <li className="process-step grid gap-5 border-b border-[var(--line)] py-8 sm:grid-cols-[5.5rem_0.75fr_1fr] sm:items-start sm:gap-7 sm:py-10">
                  <p className="process-number relative z-10 font-display text-5xl font-semibold tracking-[-0.06em] text-[var(--green-600)]">0{index + 1}</p>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{step.title}</h3>
                  <p className="max-w-xl leading-7 text-[var(--muted)]">{step.body}</p>
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
              <p className="mt-4 max-w-md text-lg leading-7 text-white/82">{locale === "vi" ? "Một đầu mối trao đổi xuyên suốt từ yêu cầu ban đầu đến các bước giao nhận đã thống nhất." : "One sourcing conversation carried from the initial requirement through the agreed delivery steps."}</p>
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
              description={locale === "vi" ? "Kiến thức thực tế giúp đội ngũ mua hàng và kỹ thuật chuẩn bị yêu cầu rõ ràng trước khi đánh giá nguồn cung." : "Practical guidance for procurement and technical teams preparing a clear material sourcing brief."}
              eyebrow={locale === "vi" ? "[ KIẾN THỨC VẬT LIỆU ]" : "[ MATERIAL KNOWLEDGE ]"}
              title={locale === "vi" ? "Chuẩn bị yêu cầu tốt hơn trước khi báo giá." : "Prepare a better brief before requesting a quote."}
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
              <p className="absolute right-7 bottom-7 left-7 font-mono text-[10px] text-white/80">[ REQUIREMENT / DOCUMENTS / REVIEW ]</p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
