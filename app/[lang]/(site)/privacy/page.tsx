import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/sections/legal-page";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() { return locales.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; if (!isLocale(lang)) return {}; const copy = getDictionary(lang).legal.privacy; return pageMetadata(lang, copy.title, copy.intro, "privacy"); }
export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) { const { lang } = await params; if (!isLocale(lang)) notFound(); return <LegalPage copy={getDictionary(lang).legal.privacy} />; }

