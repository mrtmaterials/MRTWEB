export type Locale = "en" | "vi";

export type Localized<T> = Record<Locale, T>;

export type Category = {
  slug: string;
  order: number;
  name: Localized<string>;
  description: Localized<string>;
  image: string;
};

export type Product = {
  slug: string;
  category: string;
  name: Localized<string>;
  summary: Localized<string>;
  applications: Localized<string[]>;
  grades?: string[];
  packaging?: string[];
  /** Only populate with owner-verified information. */
  specs?: { label: string; value: string }[];
  featured?: boolean;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "nutraceutical-food-ingredients",
    order: 1,
    name: {
      en: "Nutraceutical & Food Ingredients",
      vi: "Nguyên liệu thực phẩm & dinh dưỡng",
    },
    description: {
      en: "Ingredients and functional materials for food, dietary supplement and related manufacturing applications.",
      vi: "Nguyên liệu và vật liệu chức năng phục vụ sản xuất thực phẩm, thực phẩm bảo vệ sức khỏe và các ứng dụng liên quan.",
    },
    image: "/images/ingredients-powder.svg",
  },
  {
    slug: "industrial-packaging-materials",
    order: 2,
    name: {
      en: "Industrial & Packaging Materials",
      vi: "Vật liệu công nghiệp & bao bì",
    },
    description: {
      en: "Selected materials for plastic packaging, processing and industrial production.",
      vi: "Các vật liệu được lựa chọn cho bao bì nhựa, gia công và sản xuất công nghiệp.",
    },
    image: "/images/resin-pellets.svg",
  },
  {
    slug: "chemicals",
    order: 3,
    name: { en: "Chemicals", vi: "Hóa chất" },
    description: {
      en: "Specialty and commodity chemical sourcing for manufacturing requirements.",
      vi: "Tìm nguồn hóa chất chuyên dụng và hóa chất thông dụng theo yêu cầu sản xuất.",
    },
    image: "/images/chemistry-molecule.svg",
  },
];

export const products: Product[] = [
  {
    slug: "sodium-salts",
    category: "nutraceutical-food-ingredients",
    name: { en: "Sodium Salts", vi: "Muối natri" },
    summary: {
      en: "Sodium salt materials sourced to support ingredient and manufacturing requirements.",
      vi: "Các dòng muối natri được tìm nguồn theo yêu cầu nguyên liệu và sản xuất.",
    },
    applications: {
      en: ["Food and beverage manufacturing", "Dietary supplement manufacturing", "Formulation support"],
      vi: ["Sản xuất thực phẩm và đồ uống", "Sản xuất thực phẩm bảo vệ sức khỏe", "Hỗ trợ công thức"],
    },
    featured: true,
    image: "/images/ingredients-powder.svg",
  },
  {
    slug: "magnesium-salts",
    category: "nutraceutical-food-ingredients",
    name: { en: "Magnesium Salts", vi: "Muối magiê" },
    summary: {
      en: "Magnesium salt materials for ingredient sourcing discussions and manufacturing use.",
      vi: "Các dòng muối magiê phục vụ trao đổi nhu cầu tìm nguồn nguyên liệu và sản xuất.",
    },
    applications: {
      en: ["Dietary supplement manufacturing", "Food manufacturing", "Formulation support"],
      vi: ["Sản xuất thực phẩm bảo vệ sức khỏe", "Sản xuất thực phẩm", "Hỗ trợ công thức"],
    },
    featured: true,
    image: "/images/ingredients-powder.svg",
  },
  {
    slug: "thickeners-stabilisers",
    category: "nutraceutical-food-ingredients",
    name: { en: "Thickeners & Stabilisers", vi: "Chất làm đặc & ổn định" },
    summary: {
      en: "Texture and stability-supporting ingredients for relevant production applications.",
      vi: "Nguyên liệu hỗ trợ cấu trúc và độ ổn định cho các ứng dụng sản xuất phù hợp.",
    },
    applications: {
      en: ["Food and beverage manufacturing", "Cosmetics and personal care", "Formulation support"],
      vi: ["Sản xuất thực phẩm và đồ uống", "Mỹ phẩm và chăm sóc cá nhân", "Hỗ trợ công thức"],
    },
    image: "/images/ingredients-powder.svg",
  },
  {
    slug: "excipients",
    category: "nutraceutical-food-ingredients",
    name: { en: "Excipients", vi: "Tá dược" },
    summary: {
      en: "Supporting materials for dietary supplement and related formulation requirements.",
      vi: "Nguyên liệu hỗ trợ cho yêu cầu công thức thực phẩm bảo vệ sức khỏe và các ứng dụng liên quan.",
    },
    applications: {
      en: ["Dietary supplement manufacturing", "Formulation support", "Manufacturing trials"],
      vi: ["Sản xuất thực phẩm bảo vệ sức khỏe", "Hỗ trợ công thức", "Thử nghiệm sản xuất"],
    },
    image: "/images/ingredients-powder.svg",
  },
  {
    slug: "pet-resin-bottle-grade",
    category: "industrial-packaging-materials",
    name: { en: "PET Resin (Bottle Grade)", vi: "Nhựa PET (dùng cho chai)" },
    summary: {
      en: "PET resin sourcing for bottle and packaging production requirements.",
      vi: "Nhựa PET được tìm nguồn cho nhu cầu sản xuất chai và bao bì.",
    },
    applications: {
      en: ["Bottle production", "Plastic packaging", "General manufacturing"],
      vi: ["Sản xuất chai", "Bao bì nhựa", "Sản xuất công nghiệp"],
    },
    featured: true,
    image: "/images/resin-pellets.svg",
  },
  {
    slug: "hdpe-resin-blow-moulding",
    category: "industrial-packaging-materials",
    name: { en: "HDPE Resin (Blow Moulding)", vi: "Nhựa HDPE (thổi khuôn)" },
    summary: {
      en: "HDPE resin sourcing for blow moulding and packaging manufacturing requirements.",
      vi: "Nhựa HDPE được tìm nguồn cho nhu cầu thổi khuôn và sản xuất bao bì.",
    },
    applications: {
      en: ["Blow moulding", "Plastic packaging", "General manufacturing"],
      vi: ["Thổi khuôn", "Bao bì nhựa", "Sản xuất công nghiệp"],
    },
    image: "/images/resin-pellets.svg",
  },
  {
    slug: "paraffin-wax",
    category: "industrial-packaging-materials",
    name: { en: "Paraffin Wax", vi: "Sáp paraffin" },
    summary: {
      en: "Paraffin wax sourcing for manufacturing and processing requirements.",
      vi: "Sáp paraffin được tìm nguồn theo yêu cầu sản xuất và gia công.",
    },
    applications: {
      en: ["Cosmetics and personal care", "Industrial processing", "General manufacturing"],
      vi: ["Mỹ phẩm và chăm sóc cá nhân", "Gia công công nghiệp", "Sản xuất công nghiệp"],
    },
    featured: true,
    image: "/images/resin-pellets.svg",
  },
  {
    slug: "specialty-chemicals-on-request",
    category: "chemicals",
    name: { en: "Specialty Chemicals — On Request", vi: "Hóa chất chuyên dụng — theo yêu cầu" },
    summary: {
      en: "Sourcing support for specialty chemical requirements not listed in the current catalogue.",
      vi: "Hỗ trợ tìm nguồn các hóa chất chuyên dụng chưa được liệt kê trong danh mục hiện tại.",
    },
    applications: {
      en: ["Manufacturing requirements", "Industrial processing", "Project-based sourcing"],
      vi: ["Nhu cầu sản xuất", "Gia công công nghiệp", "Tìm nguồn theo dự án"],
    },
    image: "/images/chemistry-molecule.svg",
  },
];

export const catalog = { categories, products } as const;

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getProduct(categorySlug: string, productSlug: string): Product | undefined {
  return products.find(
    (product) => product.category === categorySlug && product.slug === productSlug,
  );
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.category === categorySlug);
}
