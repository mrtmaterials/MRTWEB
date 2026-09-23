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
  entryType?: "family" | "material";
  commercialStatus?: "enquiry-only";
  parentSlug?: string;
  name: Localized<string>;
  chemicalName?: Localized<string>;
  casNumber?: string;
  summary: Localized<string>;
  applications: Localized<string[]>;
  enquiryFields?: Localized<string[]>;
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
    slug: "sodium-bicarbonate",
    category: "nutraceutical-food-ingredients",
    entryType: "material",
    commercialStatus: "enquiry-only",
    parentSlug: "sodium-salts",
    name: { en: "Sodium Bicarbonate", vi: "Natri bicarbonat" },
    chemicalName: { en: "Sodium hydrogen carbonate", vi: "Natri hydro carbonat" },
    casNumber: "144-55-8",
    summary: {
      en: "Sodium bicarbonate enquiries defined by application, target grade, assay and required documents.",
      vi: "Yêu cầu natri bicarbonat được xác định theo ứng dụng, grade mục tiêu, hàm lượng và bộ tài liệu cần thiết.",
    },
    applications: {
      en: ["Food and beverage formulations", "Nutraceutical formulations", "General manufacturing"],
      vi: ["Công thức thực phẩm và đồ uống", "Công thức thực phẩm bảo vệ sức khỏe", "Sản xuất công nghiệp"],
    },
    enquiryFields: {
      en: ["Target grade or standard", "Assay and critical limits", "Application and process", "Quantity, packaging and documents"],
      vi: ["Grade hoặc tiêu chuẩn mục tiêu", "Hàm lượng và giới hạn quan trọng", "Ứng dụng và quy trình", "Số lượng, bao bì và tài liệu"],
    },
    image: "/images/ingredients-powder.svg",
  },
  {
    slug: "trisodium-citrate-dihydrate",
    category: "nutraceutical-food-ingredients",
    entryType: "material",
    commercialStatus: "enquiry-only",
    parentSlug: "sodium-salts",
    name: { en: "Trisodium Citrate Dihydrate", vi: "Trinatri citrat dihydrat" },
    chemicalName: { en: "Trisodium citrate dihydrate", vi: "Trinatri citrat dihydrat" },
    casNumber: "6132-04-3",
    summary: {
      en: "Trisodium citrate dihydrate enquiries defined by application, target grade, assay and particle requirements.",
      vi: "Yêu cầu trinatri citrat dihydrat được xác định theo ứng dụng, grade, hàm lượng và yêu cầu kích thước hạt.",
    },
    applications: {
      en: ["Food and beverage formulations", "Buffering applications", "Nutraceutical formulations"],
      vi: ["Công thức thực phẩm và đồ uống", "Ứng dụng điều chỉnh hệ đệm", "Công thức thực phẩm bảo vệ sức khỏe"],
    },
    enquiryFields: {
      en: ["Chemical form and target grade", "Assay and critical limits", "Particle or physical-form needs", "Quantity and document set"],
      vi: ["Dạng hóa học và grade mục tiêu", "Hàm lượng và giới hạn quan trọng", "Yêu cầu kích thước hạt hoặc dạng vật lý", "Số lượng và bộ tài liệu"],
    },
    image: "/images/ingredients-powder.svg",
  },
  {
    slug: "magnesium-oxide",
    category: "nutraceutical-food-ingredients",
    entryType: "material",
    commercialStatus: "enquiry-only",
    parentSlug: "magnesium-salts",
    name: { en: "Magnesium Oxide", vi: "Magiê oxit" },
    chemicalName: { en: "Magnesium oxide", vi: "Magiê oxit" },
    casNumber: "1309-48-4",
    summary: {
      en: "Magnesium oxide enquiries defined by target grade, assay, elemental-magnesium requirement and application.",
      vi: "Yêu cầu magiê oxit được xác định theo grade, hàm lượng, mục tiêu magiê nguyên tố và ứng dụng.",
    },
    applications: {
      en: ["Nutraceutical formulations", "Food manufacturing under buyer assessment", "General manufacturing"],
      vi: ["Công thức thực phẩm bảo vệ sức khỏe", "Sản xuất thực phẩm theo đánh giá của bên mua", "Sản xuất công nghiệp"],
    },
    enquiryFields: {
      en: ["Target grade or compendial reference", "Assay and elemental-magnesium target", "Physical-form requirements", "Quantity and required documents"],
      vi: ["Grade hoặc tham chiếu dược điển", "Hàm lượng và mục tiêu magiê nguyên tố", "Yêu cầu dạng vật lý", "Số lượng và tài liệu cần thiết"],
    },
    image: "/images/ingredients-powder.svg",
  },
  {
    slug: "magnesium-citrate",
    category: "nutraceutical-food-ingredients",
    entryType: "material",
    commercialStatus: "enquiry-only",
    parentSlug: "magnesium-salts",
    name: { en: "Magnesium Citrate", vi: "Magiê citrat" },
    chemicalName: { en: "Magnesium citrate — exact chemical form to be confirmed", vi: "Magiê citrat — cần xác nhận dạng hóa học cụ thể" },
    summary: {
      en: "Magnesium citrate enquiries require the exact chemical form, target grade, elemental-magnesium contribution and document set.",
      vi: "Yêu cầu magiê citrat cần nêu dạng hóa học cụ thể, grade, hàm lượng magiê nguyên tố và bộ tài liệu.",
    },
    applications: {
      en: ["Nutraceutical formulations", "Formulation assessment", "Manufacturing trials"],
      vi: ["Công thức thực phẩm bảo vệ sức khỏe", "Đánh giá công thức", "Thử nghiệm sản xuất"],
    },
    enquiryFields: {
      en: ["Exact chemical form", "Target grade and standard", "Elemental-magnesium target", "Quantity and required documents"],
      vi: ["Dạng hóa học cụ thể", "Grade và tiêu chuẩn mục tiêu", "Mục tiêu magiê nguyên tố", "Số lượng và tài liệu cần thiết"],
    },
    image: "/images/ingredients-powder.svg",
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
    slug: "xanthan-gum",
    category: "nutraceutical-food-ingredients",
    entryType: "material",
    commercialStatus: "enquiry-only",
    parentSlug: "thickeners-stabilisers",
    name: { en: "Xanthan Gum", vi: "Gôm xanthan" },
    chemicalName: { en: "Xanthan gum", vi: "Gôm xanthan" },
    casNumber: "11138-66-2",
    summary: {
      en: "Xanthan gum enquiries defined by application, viscosity target, hydration process and required grade.",
      vi: "Yêu cầu gôm xanthan được xác định theo ứng dụng, độ nhớt mục tiêu, quy trình hydrat hóa và grade cần thiết.",
    },
    applications: {
      en: ["Food and beverage texture systems", "Suspension and stability systems", "Formulation trials"],
      vi: ["Hệ cấu trúc thực phẩm và đồ uống", "Hệ huyền phù và ổn định", "Thử nghiệm công thức"],
    },
    enquiryFields: {
      en: ["Target grade or reference product", "Viscosity method and target", "Formulation and process conditions", "Quantity and document requirements"],
      vi: ["Grade hoặc sản phẩm tham chiếu", "Phương pháp và mục tiêu độ nhớt", "Công thức và điều kiện quy trình", "Số lượng và yêu cầu tài liệu"],
    },
    image: "/images/ingredients-powder.svg",
  },
  {
    slug: "carboxymethyl-cellulose-cmc",
    category: "nutraceutical-food-ingredients",
    entryType: "material",
    commercialStatus: "enquiry-only",
    parentSlug: "thickeners-stabilisers",
    name: { en: "Sodium Carboxymethyl Cellulose (CMC)", vi: "Natri carboxymethyl cellulose (CMC)" },
    chemicalName: { en: "Sodium carboxymethyl cellulose", vi: "Natri carboxymethyl cellulose" },
    casNumber: "9004-32-4",
    summary: {
      en: "CMC enquiries defined by application, viscosity grade, substitution information and process conditions.",
      vi: "Yêu cầu CMC được xác định theo ứng dụng, cấp độ nhớt, thông tin mức độ thế và điều kiện quy trình.",
    },
    applications: {
      en: ["Food and beverage texture systems", "Formulation stability", "Selected industrial formulations"],
      vi: ["Hệ cấu trúc thực phẩm và đồ uống", "Ổn định công thức", "Một số công thức công nghiệp"],
    },
    enquiryFields: {
      en: ["Target grade or comparison product", "Viscosity method and range", "Application and process", "Quantity and required documents"],
      vi: ["Grade hoặc sản phẩm so sánh", "Phương pháp và khoảng độ nhớt", "Ứng dụng và quy trình", "Số lượng và tài liệu cần thiết"],
    },
    image: "/images/ingredients-powder.svg",
  },
  {
    slug: "hypromellose-hpmc",
    category: "nutraceutical-food-ingredients",
    entryType: "material",
    commercialStatus: "enquiry-only",
    parentSlug: "excipients",
    name: { en: "Hypromellose (HPMC)", vi: "Hypromellose (HPMC)" },
    chemicalName: { en: "Hydroxypropyl methylcellulose", vi: "Hydroxypropyl methylcellulose" },
    casNumber: "9004-65-3",
    summary: {
      en: "HPMC enquiries defined by intended function, viscosity grade, formulation conditions and required documents.",
      vi: "Yêu cầu HPMC được xác định theo chức năng, cấp độ nhớt, điều kiện công thức và bộ tài liệu cần thiết.",
    },
    applications: {
      en: ["Excipient assessment", "Coating or binding applications", "Formulation trials"],
      vi: ["Đánh giá tá dược", "Ứng dụng bao phim hoặc kết dính", "Thử nghiệm công thức"],
    },
    enquiryFields: {
      en: ["Intended function and dosage form", "Viscosity grade or reference", "Target standard", "Quantity and document requirements"],
      vi: ["Chức năng và dạng sản phẩm", "Cấp độ nhớt hoặc grade tham chiếu", "Tiêu chuẩn mục tiêu", "Số lượng và yêu cầu tài liệu"],
    },
    image: "/images/ingredients-powder.svg",
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
    entryType: "material",
    commercialStatus: "enquiry-only",
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
    entryType: "material",
    commercialStatus: "enquiry-only",
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
    slug: "fully-refined-paraffin-wax",
    category: "industrial-packaging-materials",
    entryType: "material",
    commercialStatus: "enquiry-only",
    parentSlug: "paraffin-wax",
    name: { en: "Fully Refined Paraffin Wax", vi: "Sáp paraffin tinh chế hoàn toàn" },
    chemicalName: { en: "Paraffin wax", vi: "Sáp paraffin" },
    casNumber: "8002-74-2",
    summary: {
      en: "Fully refined paraffin wax enquiries defined by application, melting range, oil content, physical form and packaging.",
      vi: "Yêu cầu sáp paraffin tinh chế hoàn toàn được xác định theo ứng dụng, khoảng nóng chảy, hàm lượng dầu, dạng vật lý và bao bì.",
    },
    applications: {
      en: ["Selected industrial processing", "Candle and wax formulations", "Product-specific formulation assessment"],
      vi: ["Một số quy trình công nghiệp", "Công thức nến và sáp", "Đánh giá công thức theo từng sản phẩm"],
    },
    enquiryFields: {
      en: ["Application and comparison grade", "Melting range and test method", "Oil content and colour requirements", "Physical form, packaging and quantity"],
      vi: ["Ứng dụng và grade tham chiếu", "Khoảng nóng chảy và phương pháp thử", "Yêu cầu hàm lượng dầu và màu", "Dạng vật lý, bao bì và số lượng"],
    },
    image: "/images/ingredients-powder.svg",
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
