import type { MetadataRoute } from "next";

import { categories, products } from "@/data/catalog";
import { company } from "@/data/company";
import { locales } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/products", "/industries", "/about", "/quality", "/contact", "/privacy", "/terms"];
  const catalogPaths = [
    ...categories.map((category) => `/products/${category.slug}`),
    ...products.map((product) => `/products/${product.category}/${product.slug}`),
  ];

  return [...staticPaths, ...catalogPaths].flatMap((path) =>
    locales.map((locale) => ({
      url: `${company.url}/${locale}${path}`,
      changeFrequency: path.includes("/products") ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path === "/products" ? 0.9 : 0.7,
      alternates: {
        languages: {
          en: `${company.url}/en${path}`,
          vi: `${company.url}/vi${path}`,
        },
      },
    })),
  );
}
