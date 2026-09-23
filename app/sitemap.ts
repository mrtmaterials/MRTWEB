import type { MetadataRoute } from "next";

import { categories, products } from "@/data/catalog";
import { company } from "@/data/company";
import { insights } from "@/data/insights";
import { locales } from "@/lib/i18n";

export const dynamic = "force-static";
const lastContentUpdate = new Date("2026-09-23T00:00:00+07:00");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/products", "/industries", "/insights", "/about", "/quality", "/contact", "/privacy", "/terms"];
  const catalogPaths = [
    ...categories.map((category) => `/products/${category.slug}`),
    ...products.map((product) => `/products/${product.category}/${product.slug}`),
  ];

  const coreEntries = [...staticPaths, ...catalogPaths].flatMap((path) =>
    locales.map((locale) => ({
      url: `${company.url}/${locale}${path}`,
      lastModified: lastContentUpdate,
      changeFrequency: path.includes("/products") ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path === "/products" ? 0.9 : 0.7,
      alternates: {
        languages: {
          en: `${company.url}/en${path}`,
          vi: `${company.url}/vi${path}`,
          "x-default": `${company.url}/en${path}`,
        },
      },
    })),
  );

  const insightEntries = insights.flatMap((insight) => {
    const path = `/insights/${insight.slug}`;
    return locales.map((locale) => ({
      url: `${company.url}/${locale}${path}`,
      lastModified: new Date(`${insight.updatedAt}T00:00:00+07:00`),
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: {
        languages: {
          en: `${company.url}/en${path}`,
          vi: `${company.url}/vi${path}`,
          "x-default": `${company.url}/en${path}`,
        },
      },
    }));
  });

  return [...coreEntries, ...insightEntries];
}
