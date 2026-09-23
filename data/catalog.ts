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
      en: "Ingredients for food, beverage and dietary-supplement production, including salts, thickeners, stabilisers and excipients.",
      vi: "Nguyên liệu cho sản xuất thực phẩm, đồ uống và thực phẩm bảo vệ sức khỏe, gồm các dòng muối, chất làm đặc, chất ổn định và tá dược.",
    },
    image: "/images/editorial/lab-quality.webp",
  },
  {
    slug: "industrial-packaging-materials",
    order: 2,
    name: {
      en: "Industrial & Packaging Materials",
      vi: "Vật liệu công nghiệp & bao bì",
    },
    description: {
      en: "PET and HDPE resins for packaging applications, together with paraffin wax for selected manufacturing uses.",
      vi: "Nhựa PET, HDPE cho ứng dụng bao bì và sáp paraffin cho một số nhu cầu sản xuất.",
    },
    image: "/images/editorial/warehouse.webp",
  },
  {
    slug: "chemicals",
    order: 3,
    name: { en: "Chemicals", vi: "Hóa chất" },
    description: {
      en: "Specialty and commodity chemical enquiries defined by chemical identity, grade, application, quantity and required documents.",
      vi: "Yêu cầu hóa chất chuyên dụng và thông dụng được xác định theo tên hóa học, grade, ứng dụng, số lượng và bộ tài liệu cần thiết.",
    },
    image: "/images/editorial/chemical-plant.webp",
  },
];

export const products: Product[] = [
  {
    slug: "sodium-salts",
    category: "nutraceutical-food-ingredients",
    name: { en: "Sodium Salts", vi: "Muối natri" },
    summary: {
      en: "Sodium-salt enquiries defined by the exact compound, target grade, application and document requirements.",
      vi: "Yêu cầu muối natri được xác định theo đúng hợp chất, grade mục tiêu, ứng dụng và bộ tài liệu cần thiết.",
    },
    applications: {
      en: ["Food and beverage manufacturing", "Dietary supplement manufacturing", "Formulation support"],
      vi: ["Sản xuất thực phẩm và đồ uống", "Sản xuất thực phẩm bảo vệ sức khỏe", "Hỗ trợ công thức"],
    },
    featured: true,
    image: "/images/editorial/lab-quality.webp",
  },
  {
    slug: "magnesium-salts",
    category: "nutraceutical-food-ingredients",
    name: { en: "Magnesium Salts", vi: "Muối magiê" },
    summary: {
      en: "Magnesium-salt enquiries defined by the exact compound, elemental-magnesium target, application and required grade.",
      vi: "Yêu cầu muối magiê được xác định theo đúng hợp chất, mục tiêu magiê nguyên tố, ứng dụng và grade cần thiết.",
    },
    applications: {
      en: ["Dietary supplement manufacturing", "Food manufacturing", "Formulation support"],
      vi: ["Sản xuất thực phẩm bảo vệ sức khỏe", "Sản xuất thực phẩm", "Hỗ trợ công thức"],
    },
    featured: true,
    image: "/images/editorial/lab-hero.webp",
  },
  {
    slug: "thickeners-stabilisers",
    category: "nutraceutical-food-ingredients",
    name: { en: "Thickeners & Stabilisers", vi: "Chất làm đặc & ổn định" },
    summary: {
      en: "Thickeners and stabilisers considered against the target texture, formulation and processing conditions.",
      vi: "Chất làm đặc và ổn định được xem xét theo cấu trúc mục tiêu, công thức và điều kiện gia công.",
    },
    applications: {
      en: ["Food and beverage manufacturing", "Cosmetics and personal care", "Formulation support"],
      vi: ["Sản xuất thực phẩm và đồ uống", "Mỹ phẩm và chăm sóc cá nhân", "Hỗ trợ công thức"],
    },
    image: "/images/editorial/lab-quality.webp",
  },
  {
    slug: "excipients",
    category: "nutraceutical-food-ingredients",
    name: { en: "Excipients", vi: "Tá dược" },
    summary: {
      en: "Excipient enquiries defined by functional role, dosage or product form, target grade and document requirements.",
      vi: "Yêu cầu tá dược được xác định theo vai trò chức năng, dạng sản phẩm, grade mục tiêu và bộ tài liệu.",
    },
    applications: {
      en: ["Dietary supplement manufacturing", "Formulation support", "Manufacturing trials"],
      vi: ["Sản xuất thực phẩm bảo vệ sức khỏe", "Hỗ trợ công thức", "Thử nghiệm sản xuất"],
    },
    image: "/images/editorial/lab-hero.webp",
  },
  {
    slug: "pet-resin-bottle-grade",
    category: "industrial-packaging-materials",
    name: { en: "PET Resin (Bottle Grade)", vi: "Nhựa PET (dùng cho chai)" },
    summary: {
      en: "Bottle-grade PET enquiries reviewed against the current grade, preform or bottle, equipment and expected volume.",
      vi: "Yêu cầu PET chai được rà soát theo grade hiện dùng, phôi hoặc chai, thiết bị và sản lượng dự kiến.",
    },
    applications: {
      en: ["Bottle production", "Plastic packaging", "General manufacturing"],
      vi: ["Sản xuất chai", "Bao bì nhựa", "Sản xuất công nghiệp"],
    },
    featured: true,
    image: "/images/editorial/container-port.webp",
  },
  {
    slug: "hdpe-resin-blow-moulding",
    category: "industrial-packaging-materials",
    name: { en: "HDPE Resin (Blow Moulding)", vi: "Nhựa HDPE (thổi khuôn)" },
    summary: {
      en: "HDPE blow-moulding enquiries reviewed against the current grade, machine, mould, container and expected volume.",
      vi: "Yêu cầu HDPE thổi khuôn được rà soát theo grade hiện dùng, máy, khuôn, bao bì và sản lượng dự kiến.",
    },
    applications: {
      en: ["Blow moulding", "Plastic packaging", "General manufacturing"],
      vi: ["Thổi khuôn", "Bao bì nhựa", "Sản xuất công nghiệp"],
    },
    image: "/images/editorial/warehouse-forklift.webp",
  },
  {
    slug: "paraffin-wax",
    category: "industrial-packaging-materials",
    name: { en: "Paraffin Wax", vi: "Sáp paraffin" },
    summary: {
      en: "Paraffin-wax enquiries defined by application, melting range, oil content, physical form and packaging.",
      vi: "Yêu cầu sáp paraffin được xác định theo ứng dụng, khoảng nóng chảy, hàm lượng dầu, dạng vật lý và bao bì.",
    },
    applications: {
      en: ["Cosmetics and personal care", "Industrial processing", "General manufacturing"],
      vi: ["Mỹ phẩm và chăm sóc cá nhân", "Gia công công nghiệp", "Sản xuất công nghiệp"],
    },
    featured: true,
    image: "/images/editorial/warehouse.webp",
  },
  {
    slug: "specialty-chemicals-on-request",
    category: "chemicals",
    name: { en: "Specialty Chemicals — On Request", vi: "Hóa chất chuyên dụng — theo yêu cầu" },
    summary: {
      en: "Specialty-chemical requests identified by chemical name or CAS number, grade, application, quantity and required documents.",
      vi: "Yêu cầu hóa chất chuyên dụng theo tên hóa học hoặc số CAS, grade, ứng dụng, số lượng và bộ tài liệu cần thiết.",
    },
    applications: {
      en: ["Manufacturing requirements", "Industrial processing", "Project-based sourcing"],
      vi: ["Nhu cầu sản xuất", "Gia công công nghiệp", "Tìm nguồn theo dự án"],
    },
    image: "/images/editorial/chemical-plant.webp",
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
