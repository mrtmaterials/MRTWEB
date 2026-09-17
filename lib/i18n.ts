import { en } from "@/content/en";
import { vi } from "@/content/vi";

export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const dictionaries = { en, vi } as const;
export type Dictionary = (typeof dictionaries)[Locale];

export function isLocale(value: string | undefined): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function getLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function localize<T>(value: Record<Locale, T>, locale: Locale): T {
  return value[locale];
}

export function withLocale(locale: Locale, path = ""): string {
  const normalizedPath = path.replace(/^\/+/, "");
  return normalizedPath ? `/${locale}/${normalizedPath}` : `/${locale}`;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "vi" : "en";
}

/**
 * Uses the first supported language tag in a request header. Static routes still
 * render in the requested locale; this helper is intended for the root redirect.
 */
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;

  const languageTags = header
    .split(",")
    .map((entry) => entry.trim().split(";")[0]?.toLowerCase())
    .filter((entry): entry is string => Boolean(entry));

  return languageTags.some((tag) => tag === "vi" || tag.startsWith("vi-")) ? "vi" : defaultLocale;
}
