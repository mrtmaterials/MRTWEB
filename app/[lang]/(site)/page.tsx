import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomePage } from "@/components/sections/home-page";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dictionary = getDictionary(lang);
  const title = lang === "vi"
    ? "Nguyên liệu và vật liệu công nghiệp tại Việt Nam"
    : "Raw Materials & Industrial Ingredients in Vietnam";
  return pageMetadata(lang, title, dictionary.seo.defaultDescription);
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <HomePage dictionary={getDictionary(lang)} locale={lang} />;
}
