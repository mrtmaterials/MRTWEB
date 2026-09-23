import type { Locale, Localized } from "@/data/catalog";

type KnowledgeSection = {
  title: string;
  body: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export type CategoryKnowledge = {
  title: string;
  introduction: string;
  sections: KnowledgeSection[];
  faq: FaqItem[];
};

export type ProductKnowledge = {
  title: string;
  introduction: string;
  checklistTitle: string;
  checklist: string[];
  sections: KnowledgeSection[];
  faq: FaqItem[];
};

const categoryKnowledgeData: Record<string, Localized<CategoryKnowledge>> = {
  "nutraceutical-food-ingredients": {
    en: {
      title: "Information needed for a food or nutraceutical ingredient enquiry",
      introduction: "A material name alone is rarely enough for a reliable quotation. The intended application, grade, target standard and documentation needs help define which source is suitable for review.",
      sections: [
        { title: "Define the application first", body: "State whether the material is intended for food, beverage, dietary supplement or another process. The end use influences the grade, documentation and performance information that should be reviewed." },
        { title: "Align the technical requirement", body: "Share the chemical form, assay or functional target, relevant compendial or customer standard, preferred origin and any processing constraints known to your team." },
        { title: "Plan documentation and trials", body: "Confirm which documents are needed for internal approval, then allow time for sample evaluation or a production trial where your quality process requires one." },
      ],
      faq: [
        { question: "Can MRT Materials review an ingredient that is not in the catalogue?", answer: "Yes. Send the material name, intended use, target specification, quantity and required documents so the sourcing request can be reviewed." },
        { question: "Which documents can be discussed for an ingredient enquiry?", answer: "Depending on the source and material, available COA, TDS and SDS documents can be coordinated for review. Confirm document requirements in the RFQ." },
      ],
    },
    vi: {
      title: "Thông tin cần có khi yêu cầu nguyên liệu thực phẩm và dinh dưỡng",
      introduction: "Chỉ tên nguyên liệu thường chưa đủ để lập báo giá phù hợp. Ứng dụng, cấp chất lượng, tiêu chuẩn mục tiêu và bộ tài liệu cần thiết giúp xác định nguồn hàng phù hợp để xem xét.",
      sections: [
        { title: "Xác định ứng dụng trước", body: "Nêu rõ nguyên liệu dùng cho thực phẩm, đồ uống, thực phẩm bảo vệ sức khỏe hay quy trình khác. Mục đích sử dụng ảnh hưởng đến cấp chất lượng, tài liệu và dữ liệu hiệu năng cần xem xét." },
        { title: "Làm rõ yêu cầu kỹ thuật", body: "Cung cấp dạng hóa học, hàm lượng hoặc mục tiêu chức năng, tiêu chuẩn dược điển hay tiêu chuẩn nội bộ, xuất xứ ưu tiên và các giới hạn quy trình đã biết." },
        { title: "Chuẩn bị tài liệu và thử nghiệm", body: "Xác nhận bộ tài liệu cần cho phê duyệt nội bộ, đồng thời dự trù thời gian đánh giá mẫu hoặc thử nghiệm sản xuất nếu quy trình chất lượng yêu cầu." },
      ],
      faq: [
        { question: "MRT Materials có tìm nguyên liệu chưa có trong danh mục không?", answer: "Có. Hãy gửi tên nguyên liệu, ứng dụng, tiêu chuẩn mục tiêu, số lượng và tài liệu cần thiết để chúng tôi xem xét yêu cầu tìm nguồn." },
        { question: "Có thể yêu cầu những tài liệu nào?", answer: "Tùy nguồn hàng và nguyên liệu, COA, TDS và SDS hiện có có thể được phối hợp cung cấp để xem xét. Hãy ghi rõ yêu cầu tài liệu trong RFQ." },
      ],
    },
  },
  "industrial-packaging-materials": {
    en: {
      title: "Information needed for an industrial or packaging material enquiry",
      introduction: "Resin and industrial material selection should connect the required grade to the conversion process, finished article and operating conditions—not only to a generic polymer or material name.",
      sections: [
        { title: "Describe the conversion process", body: "Identify bottle production, blow moulding, extrusion, coating or another process and share the equipment or processing window that materially affects grade selection." },
        { title: "Describe the finished article", body: "Useful details include intended use, colour, clarity, wall or part requirements, contact conditions and any customer-specific performance criteria." },
        { title: "State quantity and delivery needs", body: "Include trial quantity, routine volume, packaging preference, delivery destination and target schedule so technical and commercial options can be reviewed together." },
      ],
      faq: [
        { question: "Can MRT Materials help compare a requested resin grade?", answer: "Share the current grade, datasheet or key processing and performance targets. Potential alternatives remain subject to your technical validation and production trial." },
        { question: "Are packaging and minimum quantities fixed?", answer: "They depend on the material and source. Include your preferred pack format and required quantity in the enquiry for confirmation." },
      ],
    },
    vi: {
      title: "Thông tin cần có khi yêu cầu vật liệu công nghiệp và bao bì",
      introduction: "Việc chọn nhựa và vật liệu công nghiệp cần gắn cấp vật liệu với công nghệ gia công, sản phẩm hoàn thiện và điều kiện vận hành, thay vì chỉ dựa vào tên polymer hoặc tên vật liệu chung.",
      sections: [
        { title: "Mô tả công nghệ gia công", body: "Nêu rõ sản xuất chai, thổi khuôn, đùn, phủ hay quy trình khác, cùng thiết bị hoặc cửa sổ gia công có ảnh hưởng đáng kể đến việc chọn grade." },
        { title: "Mô tả sản phẩm hoàn thiện", body: "Thông tin hữu ích gồm mục đích sử dụng, màu sắc, độ trong, yêu cầu thành hoặc chi tiết, điều kiện tiếp xúc và tiêu chí hiệu năng riêng của khách hàng." },
        { title: "Nêu số lượng và nhu cầu giao hàng", body: "Cung cấp lượng thử nghiệm, nhu cầu định kỳ, quy cách đóng gói, điểm giao và tiến độ mục tiêu để xem xét đồng thời phương án kỹ thuật và thương mại." },
      ],
      faq: [
        { question: "MRT Materials có thể hỗ trợ so sánh grade nhựa không?", answer: "Hãy gửi grade đang dùng, datasheet hoặc các mục tiêu gia công và hiệu năng chính. Mọi phương án thay thế vẫn cần đội ngũ của bạn đánh giá kỹ thuật và thử nghiệm sản xuất." },
        { question: "Quy cách đóng gói và số lượng tối thiểu có cố định không?", answer: "Các điều kiện này phụ thuộc vật liệu và nguồn hàng. Hãy ghi quy cách đóng gói mong muốn và số lượng cần trong yêu cầu để xác nhận." },
      ],
    },
  },
  chemicals: {
    en: {
      title: "Information needed for a chemical sourcing enquiry",
      introduction: "Chemical enquiries are assessed more effectively when the exact identity, purity or grade, application, annual or trial volume and documentation expectations are provided together.",
      sections: [
        { title: "Confirm chemical identity", body: "Provide the full chemical name and CAS number where available. For blends, include the commercial grade or a reference datasheet to avoid ambiguity." },
        { title: "State quality and process needs", body: "Share the target purity, relevant standard, key impurity limits, physical form and process conditions that matter to your production review." },
        { title: "Address handling early", body: "Identify packaging, storage, transport or restricted-handling requirements before quotation. The applicable SDS and your own EHS review remain central to safe use." },
      ],
      faq: [
        { question: "Can MRT Materials source a specialty chemical on request?", answer: "Yes. Provide the chemical identity, target grade, application, quantity, delivery location and required documentation for an initial sourcing review." },
        { question: "Does website content replace an SDS or technical review?", answer: "No. Website content is general sourcing information. Review the current supplier documentation and complete your own technical, regulatory and safety assessment before use." },
      ],
    },
    vi: {
      title: "Thông tin cần có khi yêu cầu tìm nguồn hóa chất",
      introduction: "Yêu cầu hóa chất được xem xét hiệu quả hơn khi cung cấp đồng thời danh tính chính xác, độ tinh khiết hoặc grade, ứng dụng, nhu cầu thử nghiệm hoặc hằng năm và bộ tài liệu mong muốn.",
      sections: [
        { title: "Xác nhận danh tính hóa chất", body: "Cung cấp tên hóa học đầy đủ và số CAS nếu có. Với hỗn hợp, hãy gửi grade thương mại hoặc datasheet tham chiếu để tránh nhầm lẫn." },
        { title: "Nêu yêu cầu chất lượng và quy trình", body: "Chia sẻ độ tinh khiết mục tiêu, tiêu chuẩn liên quan, giới hạn tạp chất chính, dạng vật lý và điều kiện quy trình có ý nghĩa với việc đánh giá sản xuất." },
        { title: "Làm rõ yêu cầu xử lý từ sớm", body: "Xác định yêu cầu đóng gói, lưu kho, vận chuyển hoặc xử lý hạn chế trước khi báo giá. SDS áp dụng và đánh giá EHS nội bộ vẫn là cơ sở quan trọng cho sử dụng an toàn." },
      ],
      faq: [
        { question: "MRT Materials có tìm nguồn hóa chất chuyên dụng theo yêu cầu không?", answer: "Có. Hãy cung cấp danh tính hóa chất, grade mục tiêu, ứng dụng, số lượng, địa điểm giao và bộ tài liệu cần thiết để xem xét ban đầu." },
        { question: "Nội dung website có thay thế SDS hoặc đánh giá kỹ thuật không?", answer: "Không. Nội dung website chỉ mang tính thông tin tìm nguồn chung. Cần xem tài liệu nhà cung cấp hiện hành và hoàn tất đánh giá kỹ thuật, pháp lý và an toàn nội bộ trước khi sử dụng." },
      ],
    },
  },
};

const productKnowledgeData: Record<string, Localized<ProductKnowledge>> = {
  "sodium-salts": {
    en: {
      title: "Sodium salts: information to include in an RFQ",
      introduction: "Different sodium salts perform different chemical and functional roles. A useful enquiry identifies the exact salt and connects its quality requirement to the intended formulation or manufacturing process.",
      checklistTitle: "Include in the RFQ",
      checklist: ["Full chemical name and CAS number where available", "Intended application and target grade or standard", "Assay, physical form and any critical impurity limits", "Trial or routine quantity, packaging and delivery location"],
      sections: [
        { title: "Intended use and process", body: "State whether the material is being assessed for formulation, processing or another defined function. Solubility, particle characteristics and process compatibility may need review depending on the salt." },
        { title: "Documents to request", body: "List the COA parameters and supporting documents your quality team needs. Availability and document format depend on the selected material and source." },
      ],
      faq: [
        { question: "Is one sodium salt interchangeable with another?", answer: "No assumption of interchangeability should be made. Chemical form, composition and functional behaviour differ, so your technical team should approve the exact material." },
        { question: "Can a sample or trial quantity be discussed?", answer: "Include the requested quantity and trial purpose in the enquiry. Sample and trial availability is confirmed for the selected source." },
      ],
    },
    vi: {
      title: "Muối natri: thông tin cần có trong RFQ",
      introduction: "Các loại muối natri có vai trò hóa học và chức năng khác nhau. Một yêu cầu hữu ích cần nêu đúng loại muối và liên kết yêu cầu chất lượng với công thức hoặc quy trình sản xuất dự kiến.",
      checklistTitle: "Thông tin nên có trong RFQ",
      checklist: ["Tên hóa học đầy đủ và số CAS nếu có", "Ứng dụng dự kiến và grade hoặc tiêu chuẩn mục tiêu", "Hàm lượng, dạng vật lý và giới hạn tạp chất quan trọng", "Số lượng thử nghiệm hoặc định kỳ, đóng gói và điểm giao"],
      sections: [
        { title: "Ứng dụng và quy trình", body: "Nêu rõ nguyên liệu được đánh giá cho công thức, gia công hay chức năng xác định khác. Độ tan, đặc tính hạt và khả năng tương thích quy trình có thể cần xem xét tùy loại muối." },
        { title: "Tài liệu cần yêu cầu", body: "Liệt kê các chỉ tiêu COA và tài liệu hỗ trợ mà bộ phận chất lượng cần. Khả năng cung cấp và định dạng tài liệu phụ thuộc vật liệu và nguồn hàng được chọn." },
      ],
      faq: [
        { question: "Có thể thay thế một muối natri bằng loại khác không?", answer: "Không nên mặc định có thể thay thế. Dạng hóa học, thành phần và đặc tính chức năng khác nhau, vì vậy đội ngũ kỹ thuật cần phê duyệt đúng vật liệu." },
        { question: "Có thể trao đổi về mẫu hoặc lượng thử nghiệm không?", answer: "Hãy ghi số lượng và mục đích thử nghiệm trong yêu cầu. Khả năng cung cấp mẫu hoặc lượng thử sẽ được xác nhận theo nguồn hàng đã chọn." },
      ],
    },
  },
  "magnesium-salts": {
    en: {
      title: "Magnesium salts: information to include in an RFQ",
      introduction: "The magnesium compound, elemental magnesium contribution and intended use are separate specification questions. Identifying all three helps avoid comparing materials that only share a broad category name.",
      checklistTitle: "Include in the RFQ",
      checklist: ["Exact magnesium compound and reference standard", "Target application and required grade", "Assay, elemental magnesium target and relevant limits", "Quantity, packaging preference and documentation list"],
      sections: [
        { title: "Form and formulation", body: "Chemical form affects composition and may affect solubility, sensory profile or processing behaviour. Evaluate the chosen compound in the actual formulation and process." },
        { title: "Quality review", body: "Define which COA values, compendial references or customer limits are required before supplier documentation is compared." },
      ],
      faq: [
        { question: "Why specify the exact magnesium compound?", answer: "Different compounds have different composition and physical behaviour. The exact identity is necessary for technical review and an accurate quotation." },
        { question: "Can documentation be requested before an order?", answer: "Available documents can be coordinated during the review process. State the required document set in the enquiry." },
      ],
    },
    vi: {
      title: "Muối magiê: thông tin cần có trong RFQ",
      introduction: "Hợp chất magiê, hàm lượng magiê nguyên tố và mục đích sử dụng là ba câu hỏi kỹ thuật riêng. Xác định đủ ba yếu tố giúp tránh so sánh các vật liệu chỉ giống nhau ở tên nhóm chung.",
      checklistTitle: "Thông tin nên có trong RFQ",
      checklist: ["Hợp chất magiê chính xác và tiêu chuẩn tham chiếu", "Ứng dụng mục tiêu và grade cần thiết", "Hàm lượng, mục tiêu magiê nguyên tố và các giới hạn liên quan", "Số lượng, đóng gói ưu tiên và danh sách tài liệu"],
      sections: [
        { title: "Dạng hóa học và công thức", body: "Dạng hóa học ảnh hưởng thành phần và có thể ảnh hưởng độ tan, cảm quan hoặc hành vi gia công. Cần đánh giá hợp chất được chọn trong công thức và quy trình thực tế." },
        { title: "Đánh giá chất lượng", body: "Xác định chỉ tiêu COA, tham chiếu dược điển hoặc giới hạn riêng của khách hàng trước khi so sánh tài liệu nhà cung cấp." },
      ],
      faq: [
        { question: "Tại sao cần nêu đúng hợp chất magiê?", answer: "Mỗi hợp chất có thành phần và đặc tính vật lý khác nhau. Danh tính chính xác là cơ sở cho đánh giá kỹ thuật và báo giá phù hợp." },
        { question: "Có thể yêu cầu tài liệu trước khi đặt hàng không?", answer: "Các tài liệu hiện có có thể được phối hợp trong quá trình xem xét. Hãy ghi rõ bộ tài liệu cần thiết trong yêu cầu." },
      ],
    },
  },
  "thickeners-stabilisers": {
    en: {
      title: "Thickeners and stabilisers: application and process details",
      introduction: "A thickener or stabiliser should be selected against the target texture, process and product environment. Naming the desired function is more useful than requesting a generic product family alone.",
      checklistTitle: "Include in the RFQ",
      checklist: ["Product type and desired texture or stability outcome", "Process temperature, shear, hydration and addition sequence", "Expected pH, salts, sugars, proteins or other key components", "Target grade, quantity, packaging and required documents"],
      sections: [
        { title: "Process fit", body: "Hydration method, heat and shear can change performance. Share the manufacturing sequence and known constraints before selecting candidates for a trial." },
        { title: "System compatibility", body: "The wider formulation can influence viscosity and stability. A production-representative trial remains important before adoption." },
      ],
      faq: [
        { question: "Can a thickener be selected from viscosity alone?", answer: "Viscosity is only one factor. Texture, suspension, process tolerance, compatibility and finished-product stability may also matter." },
        { question: "Should the material be production tested?", answer: "Your technical team should validate the selected material in the intended formulation and process before commercial use." },
      ],
    },
    vi: {
      title: "Chất làm đặc và ổn định: ứng dụng và điều kiện quy trình",
      introduction: "Chất làm đặc hoặc ổn định cần được chọn theo cấu trúc mục tiêu, quy trình và môi trường sản phẩm. Nêu chức năng mong muốn hữu ích hơn việc chỉ yêu cầu một nhóm sản phẩm chung.",
      checklistTitle: "Thông tin nên có trong RFQ",
      checklist: ["Loại sản phẩm và mục tiêu cấu trúc hoặc độ ổn định", "Nhiệt độ, lực cắt, cách hydrat hóa và thứ tự bổ sung", "pH dự kiến, muối, đường, protein hoặc thành phần chính khác", "Grade mục tiêu, số lượng, đóng gói và tài liệu cần thiết"],
      sections: [
        { title: "Phù hợp quy trình", body: "Phương pháp hydrat hóa, nhiệt và lực cắt có thể làm thay đổi hiệu năng. Hãy chia sẻ trình tự sản xuất và giới hạn đã biết trước khi chọn mẫu thử." },
        { title: "Tương thích hệ công thức", body: "Toàn bộ công thức có thể ảnh hưởng độ nhớt và độ ổn định. Thử nghiệm đại diện cho sản xuất vẫn quan trọng trước khi áp dụng." },
      ],
      faq: [
        { question: "Có thể chọn chất làm đặc chỉ dựa trên độ nhớt không?", answer: "Độ nhớt chỉ là một yếu tố. Cấu trúc, khả năng huyền phù, độ bền quy trình, tương thích và ổn định thành phẩm cũng có thể quan trọng." },
        { question: "Có cần thử nghiệm trong sản xuất không?", answer: "Đội ngũ kỹ thuật nên xác nhận vật liệu trong công thức và quy trình dự kiến trước khi sử dụng thương mại." },
      ],
    },
  },
  excipients: {
    en: {
      title: "Excipient sourcing: function, grade and documents",
      introduction: "Excipient selection starts with the intended functional role and dosage-form process. The same broad excipient name can cover grades with different physical and processing characteristics.",
      checklistTitle: "Include in the RFQ",
      checklist: ["Functional role and dosage or product form", "Target grade, reference standard and current comparison grade", "Critical physical properties or process constraints", "Quantity, packaging and quality-document requirements"],
      sections: [
        { title: "Function before brand", body: "Describe whether the material is intended as a binder, carrier, flow aid or another function, then identify the performance criteria your team will evaluate." },
        { title: "Change control and approval", body: "When assessing an alternative source, define the documents, sample evaluation and internal approval steps needed before any production decision." },
      ],
      faq: [
        { question: "Are excipient grades with the same name equivalent?", answer: "Not necessarily. Physical properties, manufacturing controls and documentation can differ, so equivalence requires your technical and quality review." },
        { question: "Can MRT Materials review a current comparison grade?", answer: "Yes. Share the current product reference and the critical attributes that must be maintained for the sourcing review." },
      ],
    },
    vi: {
      title: "Tìm nguồn tá dược: chức năng, grade và tài liệu",
      introduction: "Việc chọn tá dược bắt đầu từ vai trò chức năng và quy trình của dạng sản phẩm. Cùng một tên tá dược chung có thể bao gồm nhiều grade với đặc tính vật lý và gia công khác nhau.",
      checklistTitle: "Thông tin nên có trong RFQ",
      checklist: ["Vai trò chức năng và dạng liều hoặc dạng sản phẩm", "Grade mục tiêu, tiêu chuẩn tham chiếu và grade đang dùng để so sánh", "Đặc tính vật lý quan trọng hoặc giới hạn quy trình", "Số lượng, đóng gói và yêu cầu tài liệu chất lượng"],
      sections: [
        { title: "Chức năng trước thương hiệu", body: "Mô tả vật liệu dùng làm chất kết dính, chất mang, trợ chảy hay chức năng khác, sau đó xác định tiêu chí hiệu năng mà đội ngũ sẽ đánh giá." },
        { title: "Quản lý thay đổi và phê duyệt", body: "Khi đánh giá nguồn thay thế, hãy xác định tài liệu, thử mẫu và các bước phê duyệt nội bộ cần hoàn tất trước quyết định sản xuất." },
      ],
      faq: [
        { question: "Các grade tá dược cùng tên có tương đương không?", answer: "Không nhất thiết. Đặc tính vật lý, kiểm soát sản xuất và tài liệu có thể khác nhau, vì vậy việc tương đương cần đánh giá kỹ thuật và chất lượng nội bộ." },
        { question: "MRT Materials có thể xem xét grade đang dùng để so sánh không?", answer: "Có. Hãy gửi tham chiếu sản phẩm hiện tại và các thuộc tính quan trọng cần duy trì trong quá trình tìm nguồn." },
      ],
    },
  },
  "pet-resin-bottle-grade": {
    en: {
      title: "Bottle-grade PET: equipment, preform and container requirements",
      introduction: "Bottle-grade PET enquiries should connect resin grade to the preform, bottle and process. The current grade, equipment conditions and finished-container expectations provide a useful comparison baseline.",
      checklistTitle: "Include in the RFQ",
      checklist: ["Current or target PET grade and datasheet", "Preform and bottle application, size and appearance targets", "Critical processing or performance parameters", "Trial and routine volume, pack format and delivery schedule"],
      sections: [
        { title: "Processing baseline", body: "Share the current grade and any drying, injection or stretch-blow constraints that affect evaluation. Alternative grades require line trials under representative conditions." },
        { title: "Check the finished product", body: "Clarity, colour, mechanical performance and application-specific requirements should be assessed on the finished preform and bottle by your technical team." },
      ],
      faq: [
        { question: "Can a PET grade be approved from its datasheet alone?", answer: "A datasheet supports screening but does not replace production validation. Trial the selected grade on the intended equipment and finished article." },
        { question: "What volume information is useful?", answer: "Provide trial quantity, expected routine demand, preferred packaging and delivery cadence so supply options can be reviewed." },
      ],
    },
    vi: {
      title: "PET chai: thiết bị, phôi và yêu cầu bao bì",
      introduction: "Yêu cầu PET chai cần liên kết grade nhựa với phôi, chai và quy trình. Grade hiện tại, điều kiện thiết bị và kỳ vọng đối với bao bì hoàn thiện là cơ sở so sánh hữu ích.",
      checklistTitle: "Thông tin nên có trong RFQ",
      checklist: ["Grade PET hiện tại hoặc mục tiêu và datasheet", "Ứng dụng phôi, chai, kích thước và mục tiêu ngoại quan", "Thông số gia công hoặc hiệu năng quan trọng", "Lượng thử, nhu cầu định kỳ, quy cách đóng gói và lịch giao"],
      sections: [
        { title: "Cơ sở gia công", body: "Chia sẻ grade hiện tại cùng các giới hạn sấy, ép phun hoặc kéo thổi có ảnh hưởng đến đánh giá. Grade thay thế cần được thử trên dây chuyền trong điều kiện đại diện." },
        { title: "Kiểm tra thành phẩm", body: "Độ trong, màu sắc, cơ tính và yêu cầu riêng của ứng dụng cần được đội ngũ kỹ thuật đánh giá trên phôi và chai hoàn thiện." },
      ],
      faq: [
        { question: "Có thể duyệt grade PET chỉ từ datasheet không?", answer: "Datasheet hỗ trợ sàng lọc nhưng không thay thế xác nhận sản xuất. Cần thử grade được chọn trên thiết bị và sản phẩm hoàn thiện dự kiến." },
        { question: "Thông tin sản lượng nào hữu ích?", answer: "Cung cấp lượng thử, nhu cầu định kỳ dự kiến, đóng gói ưu tiên và nhịp giao hàng để xem xét phương án cung ứng." },
      ],
    },
  },
  "hdpe-resin-blow-moulding": {
    en: {
      title: "HDPE blow moulding: machine, mould and finished-part requirements",
      introduction: "HDPE blow-moulding grades should be screened against the machine, mould, container design and required finished-part performance. A current grade reference helps establish the comparison point.",
      checklistTitle: "Include in the RFQ",
      checklist: ["Current or target HDPE grade and datasheet", "Machine type, moulding process and container description", "Key flow, density, colour or performance requirements", "Trial quantity, routine volume, packaging and destination"],
      sections: [
        { title: "Machine and mould fit", body: "Processing behaviour depends on equipment and part geometry. Record the conditions used for the current grade and validate any candidate under production-representative settings." },
        { title: "Part performance", body: "Evaluate dimensions, appearance and the mechanical or application-specific checks required for the finished container rather than relying on resin data alone." },
      ],
      faq: [
        { question: "Is matching melt flow enough to select an HDPE grade?", answer: "No. Melt flow is one screening parameter; density, molecular architecture, processing response and finished-part performance may also matter." },
        { question: "Can coloured or additive requirements be included?", answer: "Yes. State colour, additive or compliance-related requirements clearly so the appropriate material scope can be reviewed." },
      ],
    },
    vi: {
      title: "HDPE thổi khuôn: máy, khuôn và yêu cầu thành phẩm",
      introduction: "Grade HDPE thổi khuôn cần được sàng lọc theo máy, khuôn, thiết kế bao bì và hiệu năng chi tiết hoàn thiện. Tham chiếu grade hiện tại giúp thiết lập điểm so sánh.",
      checklistTitle: "Thông tin nên có trong RFQ",
      checklist: ["Grade HDPE hiện tại hoặc mục tiêu và datasheet", "Loại máy, quy trình thổi và mô tả bao bì", "Yêu cầu chính về dòng chảy, tỷ trọng, màu hoặc hiệu năng", "Lượng thử, nhu cầu định kỳ, đóng gói và điểm giao"],
      sections: [
        { title: "Phù hợp máy và khuôn", body: "Hành vi gia công phụ thuộc thiết bị và hình học chi tiết. Hãy ghi lại điều kiện dùng với grade hiện tại và xác nhận vật liệu thử trong điều kiện đại diện sản xuất." },
        { title: "Hiệu năng chi tiết", body: "Cần đánh giá kích thước, ngoại quan và các kiểm tra cơ học hoặc kiểm tra riêng của ứng dụng trên bao bì hoàn thiện, thay vì chỉ dựa vào dữ liệu nhựa." },
      ],
      faq: [
        { question: "Chỉ khớp chỉ số chảy có đủ để chọn grade HDPE không?", answer: "Không. Chỉ số chảy là một thông số sàng lọc; tỷ trọng, cấu trúc phân tử, đáp ứng gia công và hiệu năng chi tiết cũng có thể quan trọng." },
        { question: "Có thể nêu yêu cầu màu hoặc phụ gia không?", answer: "Có. Hãy nêu rõ yêu cầu màu, phụ gia hoặc yêu cầu liên quan tuân thủ để xem xét đúng phạm vi vật liệu." },
      ],
    },
  },
  "paraffin-wax": {
    en: {
      title: "Paraffin wax: properties, form and handling",
      introduction: "Paraffin wax grades vary by refining level, melting range, oil content, physical form and intended use. These details should be aligned before commercial comparison.",
      checklistTitle: "Include in the RFQ",
      checklist: ["Intended application and current comparison grade", "Target melting range and oil-content requirement", "Colour, odour, physical form or other critical attributes", "Quantity, pack format, delivery point and required documents"],
      sections: [
        { title: "Application and grade", body: "Describe the manufacturing use and the attributes that affect your process or finished product. Avoid relying on a generic wax name where a defined grade is required." },
        { title: "Handling and storage", body: "State the preferred physical form and packaging, and review the current SDS and supplier guidance for storage, heating and handling." },
      ],
      faq: [
        { question: "Why is the melting range important?", answer: "It can influence processing and finished-product behaviour. Define the acceptable range based on your application and validation method." },
        { question: "Can different wax forms be requested?", answer: "Availability depends on the source. State the preferred slab, pellet or other form and packaging in the enquiry." },
      ],
    },
    vi: {
      title: "Sáp paraffin: tính chất, dạng vật lý và xử lý",
      introduction: "Các grade sáp paraffin khác nhau về mức tinh chế, khoảng nóng chảy, hàm lượng dầu, dạng vật lý và mục đích sử dụng. Cần thống nhất các yếu tố này trước khi so sánh thương mại.",
      checklistTitle: "Thông tin nên có trong RFQ",
      checklist: ["Ứng dụng dự kiến và grade hiện tại để so sánh", "Khoảng nóng chảy mục tiêu và yêu cầu hàm lượng dầu", "Màu, mùi, dạng vật lý hoặc thuộc tính quan trọng khác", "Số lượng, quy cách đóng gói, điểm giao và tài liệu cần thiết"],
      sections: [
        { title: "Ứng dụng và grade", body: "Mô tả mục đích sản xuất cùng các thuộc tính ảnh hưởng đến quy trình hoặc thành phẩm. Tránh chỉ dùng tên sáp chung khi cần một grade xác định." },
        { title: "Xử lý và lưu kho", body: "Nêu dạng vật lý và đóng gói ưu tiên, đồng thời xem SDS hiện hành cùng hướng dẫn nhà cung cấp về lưu kho, gia nhiệt và xử lý." },
      ],
      faq: [
        { question: "Tại sao khoảng nóng chảy quan trọng?", answer: "Thông số này có thể ảnh hưởng gia công và hành vi thành phẩm. Hãy xác định khoảng chấp nhận dựa trên ứng dụng và phương pháp đánh giá nội bộ." },
        { question: "Có thể yêu cầu các dạng sáp khác nhau không?", answer: "Khả năng cung cấp phụ thuộc nguồn hàng. Hãy nêu dạng tấm, hạt hoặc dạng khác cùng quy cách đóng gói mong muốn trong yêu cầu." },
      ],
    },
  },
  "specialty-chemicals-on-request": {
    en: {
      title: "Specialty chemicals: identity, grade and document requirements",
      introduction: "A specialty chemical request should remove ambiguity before supplier outreach. Exact identity, grade, application and handling constraints form the core of a useful sourcing brief.",
      checklistTitle: "Include in the RFQ",
      checklist: ["Chemical name, CAS number and reference product if available", "Target purity, grade, standard and critical limits", "Application, process conditions and expected function", "Trial or annual quantity, packaging, destination and documents"],
      sections: [
        { title: "Start from an exact identity", body: "Trade names and broad families can refer to different compositions. A CAS number, composition statement or reference datasheet helps establish the intended scope." },
        { title: "Documents and internal approval", body: "Identify required technical documents and handling constraints early. Your own regulatory, technical and EHS approval remains necessary before use." },
      ],
      faq: [
        { question: "What if the chemical is not listed on the website?", answer: "Send the complete sourcing brief to the sales team. MRT Materials will review whether an appropriate source can be identified." },
        { question: "Does an enquiry guarantee availability?", answer: "No. Availability, documentation, commercial terms and delivery feasibility are confirmed only after review of the exact requirement." },
      ],
    },
    vi: {
      title: "Hóa chất chuyên dụng: định danh, grade và tài liệu",
      introduction: "Yêu cầu hóa chất chuyên dụng cần loại bỏ sự mơ hồ trước khi làm việc với nhà cung cấp. Danh tính chính xác, grade, ứng dụng và giới hạn xử lý là nội dung cốt lõi của brief tìm nguồn.",
      checklistTitle: "Thông tin nên có trong RFQ",
      checklist: ["Tên hóa chất, số CAS và sản phẩm tham chiếu nếu có", "Độ tinh khiết, grade, tiêu chuẩn và giới hạn quan trọng", "Ứng dụng, điều kiện quy trình và chức năng dự kiến", "Lượng thử hoặc nhu cầu năm, đóng gói, điểm giao và tài liệu"],
      sections: [
        { title: "Bắt đầu từ danh tính chính xác", body: "Tên thương mại và nhóm hóa chất rộng có thể chỉ nhiều thành phần khác nhau. Số CAS, thông tin thành phần hoặc datasheet tham chiếu giúp xác định đúng phạm vi." },
        { title: "Tài liệu và phê duyệt nội bộ", body: "Xác định sớm tài liệu kỹ thuật và giới hạn xử lý cần thiết. Việc phê duyệt pháp lý, kỹ thuật và EHS nội bộ vẫn cần hoàn tất trước khi sử dụng." },
      ],
      faq: [
        { question: "Nếu hóa chất chưa có trên website thì sao?", answer: "Hãy gửi brief tìm nguồn đầy đủ cho đội ngũ sales. MRT Materials sẽ xem xét khả năng xác định nguồn hàng phù hợp." },
        { question: "Gửi yêu cầu có đảm bảo luôn có hàng không?", answer: "Không. Khả năng cung cấp, tài liệu, điều kiện thương mại và khả năng giao hàng chỉ được xác nhận sau khi xem xét yêu cầu cụ thể." },
      ],
    },
  },
};

export function getCategoryKnowledge(slug: string, locale: Locale): CategoryKnowledge | undefined {
  return categoryKnowledgeData[slug]?.[locale];
}

export function getProductKnowledge(slug: string, locale: Locale): ProductKnowledge | undefined {
  return productKnowledgeData[slug]?.[locale];
}
