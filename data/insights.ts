import type { Locale } from "@/lib/i18n";

export type InsightSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type InsightContent = {
  title: string;
  description: string;
  topic: string;
  introduction: string;
  sections: InsightSection[];
  takeawaysTitle: string;
  takeaways: string[];
  faqTitle: string;
  faq: { question: string; answer: string }[];
};

export type Insight = {
  slug: string;
  publishedAt: string;
  updatedAt: string;
  image: string;
  relatedCategorySlugs: string[];
  relatedProductSlugs: string[];
  content: Record<Locale, InsightContent>;
};

export const insights: Insight[] = [
  {
    slug: "preparing-a-material-rfq",
    publishedAt: "2026-09-23",
    updatedAt: "2026-09-23",
    image: "/images/editorial/warehouse.webp",
    relatedCategorySlugs: ["nutraceutical-food-ingredients", "industrial-packaging-materials", "chemicals"],
    relatedProductSlugs: [],
    content: {
      en: {
        title: "A practical checklist for a raw-material RFQ",
        description: "How to prepare a material request that gives sourcing, technical and commercial teams a clear starting point.",
        topic: "Procurement guide",
        introduction: "A useful RFQ identifies the material, intended use, critical quality requirements, quantity, packaging, destination and timing. Clear inputs help the supplier review the correct scope and reduce unnecessary follow-up.",
        sections: [
          { heading: "Start with an unambiguous material identity", paragraphs: ["Use the full material name and include a CAS number, reference grade, current product or manufacturer code where it helps distinguish similar materials. A common name alone may cover different chemical forms, physical properties or manufacturing controls."], points: ["Full material or chemical name", "CAS number or reference grade where available", "Current comparison product", "Required physical form"] },
          { heading: "Connect the specification to the application", paragraphs: ["State how the material will be used and which parameters are critical to that process or finished product. This helps separate mandatory limits from preferences and prevents a datasheet comparison from becoming a substitute for technical evaluation."], points: ["Intended application and process", "Target standard or grade", "Critical assay, impurity or physical-property limits", "Trial, validation or change-control context"] },
          { heading: "Make the commercial request complete", paragraphs: ["Quantity without unit, packaging or destination is difficult to quote accurately. Include trial and routine volumes separately when possible, together with the delivery location and requested timing."], points: ["Trial quantity and expected routine volume", "Packaging preference", "Delivery destination and Incoterm if defined", "Requested delivery window", "Required COA, TDS, SDS or other documents"] },
        ],
        takeawaysTitle: "RFQ essentials",
        takeaways: ["Identify the exact material before discussing price.", "Separate critical requirements from preferences.", "Include quantity, packaging, destination and timing.", "List the documents your approval process requires."],
        faqTitle: "Questions about material RFQs",
        faq: [
          { question: "Can an RFQ be sent if some details are not yet known?", answer: "Yes. Share the information already available and identify the open points. They can be clarified during the review, but more complete inputs generally reduce avoidable follow-up." },
          { question: "Does an RFQ confirm that a material is available?", answer: "No. Availability, documentation, commercial terms and delivery feasibility are confirmed only after the exact requirement and source have been reviewed." },
        ],
      },
      vi: {
        title: "Checklist thực tế để chuẩn bị RFQ nguyên liệu",
        description: "Cách chuẩn bị yêu cầu nguyên liệu để bộ phận tìm nguồn, kỹ thuật và thương mại có cùng một điểm bắt đầu rõ ràng.",
        topic: "Hướng dẫn mua hàng",
        introduction: "Một RFQ hữu ích cần nêu rõ nguyên liệu, mục đích sử dụng, yêu cầu chất lượng quan trọng, số lượng, bao bì, điểm giao và thời gian cần hàng. Thông tin rõ ràng giúp nhà cung cấp xem xét đúng phạm vi và giảm trao đổi bổ sung.",
        sections: [
          { heading: "Bắt đầu từ định danh nguyên liệu rõ ràng", paragraphs: ["Sử dụng tên đầy đủ và bổ sung số CAS, grade tham chiếu, sản phẩm hiện dùng hoặc mã nhà sản xuất khi các thông tin này giúp phân biệt những vật liệu tương tự. Một tên gọi phổ biến có thể bao hàm nhiều dạng hóa học, tính chất vật lý hoặc kiểm soát sản xuất khác nhau."], points: ["Tên đầy đủ của nguyên liệu hoặc hóa chất", "Số CAS hoặc grade tham chiếu nếu có", "Sản phẩm đang dùng để so sánh", "Dạng vật lý yêu cầu"] },
          { heading: "Kết nối thông số với ứng dụng", paragraphs: ["Nêu cách nguyên liệu được sử dụng và những thông số nào có ý nghĩa quyết định đối với quy trình hoặc thành phẩm. Cách này giúp tách giới hạn bắt buộc khỏi ưu tiên và tránh dùng việc so sánh datasheet thay cho đánh giá kỹ thuật."], points: ["Ứng dụng và quy trình dự kiến", "Tiêu chuẩn hoặc grade mục tiêu", "Giới hạn quan trọng về hàm lượng, tạp chất hoặc tính chất vật lý", "Bối cảnh thử nghiệm, thẩm định hoặc kiểm soát thay đổi"] },
          { heading: "Hoàn thiện yêu cầu thương mại", paragraphs: ["Số lượng không có đơn vị, bao bì hoặc điểm giao sẽ khó báo giá chính xác. Khi có thể, hãy tách khối lượng thử nghiệm và khối lượng định kỳ, kèm địa điểm giao và thời gian yêu cầu."], points: ["Số lượng thử và khối lượng dự kiến", "Quy cách bao bì", "Điểm giao và Incoterm nếu đã xác định", "Khoảng thời gian cần hàng", "COA, TDS, SDS hoặc tài liệu cần thiết"] },
        ],
        takeawaysTitle: "Thông tin cốt lõi của RFQ",
        takeaways: ["Xác định đúng nguyên liệu trước khi trao đổi giá.", "Tách yêu cầu bắt buộc khỏi ưu tiên.", "Nêu số lượng, bao bì, điểm đến và thời gian.", "Liệt kê tài liệu cần cho quy trình phê duyệt."],
        faqTitle: "Câu hỏi về RFQ nguyên liệu",
        faq: [
          { question: "Có thể gửi RFQ khi chưa đủ mọi thông tin không?", answer: "Có. Hãy chia sẻ các thông tin hiện có và chỉ rõ những điểm còn mở. Các điểm này có thể được làm rõ khi xem xét, nhưng đầu vào đầy đủ hơn thường giúp giảm trao đổi bổ sung." },
          { question: "RFQ có xác nhận nguyên liệu luôn sẵn có không?", answer: "Không. Khả năng cung ứng, tài liệu, điều khoản thương mại và tính khả thi giao hàng chỉ được xác nhận sau khi yêu cầu và nguồn cung cụ thể được xem xét." },
        ],
      },
    },
  },
  {
    slug: "coa-tds-sds-in-material-review",
    publishedAt: "2026-09-23",
    updatedAt: "2026-09-23",
    image: "/images/editorial/lab-quality.webp",
    relatedCategorySlugs: ["nutraceutical-food-ingredients", "industrial-packaging-materials", "chemicals"],
    relatedProductSlugs: [],
    content: {
      en: {
        title: "COA, TDS and SDS in a material sourcing review",
        description: "A practical explanation of how three common material documents support different parts of a sourcing and approval process.",
        topic: "Documentation",
        introduction: "COA, TDS and SDS serve different purposes. A COA reports selected results for a batch or lot, a TDS describes technical information for a grade, and an SDS covers hazards and handling. Each should be reviewed for its intended use.",
        sections: [
          { heading: "COA: information about a specific batch or lot", paragraphs: ["A Certificate of Analysis commonly reports selected test results for a particular batch or lot against stated limits. The useful parameters depend on the material, grade and agreed specification."], points: ["Confirm material and batch identity", "Compare reported results with agreed limits", "Check test units and methods where relevant", "Route exceptions through the buyer's quality process"] },
          { heading: "TDS: technical reference for a grade", paragraphs: ["A Technical Data Sheet generally describes a product grade, typical properties, suggested uses or processing guidance. Typical values are not automatically release specifications and should not be treated as a guarantee for every batch."], points: ["Use for initial grade comparison", "Identify technical questions and processing constraints", "Confirm which values are typical and which are specifications", "Validate suitability in the intended process"] },
          { heading: "SDS: hazards, handling and emergency information", paragraphs: ["A Safety Data Sheet supports hazard communication, storage, handling, exposure and emergency-response planning. It belongs in an EHS review and does not replace a technical or quality assessment."], points: ["Confirm the correct material and supplier", "Review classification and handling controls", "Align storage and transport requirements", "Use the buyer's own EHS and legal review process"] },
        ],
        takeawaysTitle: "Use each document for its purpose",
        takeaways: ["COA supports batch or lot review.", "TDS supports grade and process discussion.", "SDS supports hazard and handling review.", "No single document replaces internal technical, quality, legal or EHS approval."],
        faqTitle: "Document review questions",
        faq: [
          { question: "Is a TDS the same as a product specification?", answer: "Not necessarily. A TDS may include typical values or guidance. Confirm the agreed specification and release criteria separately." },
          { question: "Can documents be requested before placing an order?", answer: "Available documents can be coordinated during source review. State the exact document set and version requirements in the enquiry." },
        ],
      },
      vi: {
        title: "Vai trò của COA, TDS và SDS khi đánh giá nguồn nguyên liệu",
        description: "Giải thích thực tế về cách ba loại tài liệu phổ biến hỗ trợ các phần khác nhau của quy trình tìm nguồn và phê duyệt.",
        topic: "Tài liệu",
        introduction: "COA, TDS và SDS phục vụ các mục đích khác nhau. COA trình bày một số kết quả của batch hoặc lô, TDS cung cấp thông tin kỹ thuật của grade, còn SDS đề cập nguy hại và cách xử lý. Mỗi tài liệu cần được xem xét đúng mục đích.",
        sections: [
          { heading: "COA: thông tin của một batch hoặc lô cụ thể", paragraphs: ["Certificate of Analysis thường trình bày các kết quả thử nghiệm được chọn cho một batch hoặc lô cụ thể so với giới hạn nêu ra. Các chỉ tiêu hữu ích phụ thuộc vào nguyên liệu, grade và thông số đã thống nhất."], points: ["Xác nhận định danh nguyên liệu và lô", "So sánh kết quả với giới hạn đã thống nhất", "Kiểm tra đơn vị và phương pháp thử khi cần", "Xử lý ngoại lệ qua quy trình chất lượng của bên mua"] },
          { heading: "TDS: tài liệu tham chiếu kỹ thuật cho một grade", paragraphs: ["Technical Data Sheet thường mô tả grade sản phẩm, tính chất điển hình, ứng dụng gợi ý hoặc hướng dẫn gia công. Giá trị điển hình không mặc nhiên là tiêu chí xuất xưởng và không nên được xem là bảo đảm cho mọi lô."], points: ["Dùng để so sánh grade ban đầu", "Xác định câu hỏi kỹ thuật và giới hạn quy trình", "Phân biệt giá trị điển hình và thông số", "Thẩm định độ phù hợp trong quy trình dự kiến"] },
          { heading: "SDS: thông tin nguy hại, xử lý và ứng phó", paragraphs: ["Safety Data Sheet hỗ trợ truyền đạt nguy hại, lưu kho, xử lý, phơi nhiễm và kế hoạch ứng phó khẩn cấp. SDS thuộc quy trình EHS và không thay thế đánh giá kỹ thuật hoặc chất lượng."], points: ["Xác nhận đúng nguyên liệu và nhà cung cấp", "Xem xét phân loại và biện pháp kiểm soát", "Phù hợp yêu cầu lưu kho và vận chuyển", "Áp dụng quy trình EHS và pháp lý nội bộ"] },
        ],
        takeawaysTitle: "Dùng đúng mục đích từng tài liệu",
        takeaways: ["COA hỗ trợ xem xét batch hoặc lô.", "TDS hỗ trợ trao đổi grade và quy trình.", "SDS hỗ trợ đánh giá nguy hại và xử lý.", "Không tài liệu riêng lẻ nào thay thế phê duyệt kỹ thuật, chất lượng, pháp lý hoặc EHS nội bộ."],
        faqTitle: "Câu hỏi về tài liệu",
        faq: [
          { question: "TDS có phải là thông số sản phẩm không?", answer: "Không nhất thiết. TDS có thể gồm giá trị điển hình hoặc hướng dẫn. Cần xác nhận riêng thông số đã thống nhất và tiêu chí xuất xưởng." },
          { question: "Có thể yêu cầu tài liệu trước khi đặt hàng không?", answer: "Các tài liệu hiện có có thể được phối hợp trong quá trình xem xét nguồn cung. Hãy nêu chính xác bộ tài liệu và yêu cầu phiên bản trong yêu cầu." },
        ],
      },
    },
  },
  {
    slug: "datasheet-comparison-to-production-trial",
    publishedAt: "2026-09-23",
    updatedAt: "2026-09-23",
    image: "/images/editorial/lab-hero.webp",
    relatedCategorySlugs: ["nutraceutical-food-ingredients", "industrial-packaging-materials"],
    relatedProductSlugs: ["thickeners-stabilisers", "excipients", "pet-resin-bottle-grade", "hdpe-resin-blow-moulding"],
    content: {
      en: {
        title: "From datasheet comparison to production trial",
        description: "Why similar-looking grades still require a structured technical review and, where appropriate, a controlled production trial.",
        topic: "Technical evaluation",
        introduction: "Matching names or headline values do not make two grades equivalent. Datasheets help shortlist candidates, but the buyer still needs to review the specification, documents and process fit and, where appropriate, trial the material.",
        sections: [
          { heading: "Compare the properties that matter to the process", paragraphs: ["Start with the functional role of the material and map each critical process or finished-product requirement to a relevant property. Avoid treating a long table of non-critical values as stronger evidence than a short list of decision-driving parameters."], points: ["Chemical identity and composition", "Physical form and handling behaviour", "Critical process parameters", "Finished-product performance criteria"] },
          { heading: "Review documents and change implications", paragraphs: ["Confirm the specification, test methods, document versions and any internal change-control requirements. The review may involve purchasing, technical, quality, production and EHS teams depending on the material."], points: ["Agreed specification and methods", "COA, TDS and SDS availability", "Regulatory or customer requirements", "Internal approval and change-control path"] },
          { heading: "Design a trial that can answer a decision", paragraphs: ["If a trial is required, define the question it must answer, the comparison baseline, operating conditions, acceptance criteria and recording method before material is introduced into production."], points: ["Trial objective and baseline", "Controlled quantity and batch traceability", "Process settings to record", "Acceptance criteria and decision owner"] },
        ],
        takeawaysTitle: "A disciplined comparison",
        takeaways: ["Similar names do not prove equivalence.", "Focus on properties connected to actual use.", "Route changes through the relevant internal owners.", "Use a defined trial when documents alone cannot answer suitability."],
        faqTitle: "Grade-comparison questions",
        faq: [
          { question: "Can matching datasheet values prove two grades are interchangeable?", answer: "No. Datasheets support screening, but equivalence depends on the complete requirement, documentation and validation in the intended process." },
          { question: "Is a production trial always required?", answer: "That decision belongs to the buyer's technical and quality process. Risk, material function, change scope and prior evidence should guide the approach." },
        ],
      },
      vi: {
        title: "Từ so sánh datasheet đến thử nghiệm sản xuất",
        description: "Vì sao các grade trông tương tự vẫn cần đánh giá kỹ thuật có cấu trúc và, khi phù hợp, thử nghiệm sản xuất có kiểm soát.",
        topic: "Đánh giá kỹ thuật",
        introduction: "Tên gọi hoặc một vài giá trị chính giống nhau không có nghĩa hai grade tương đương. Datasheet giúp sàng lọc ban đầu; bên mua vẫn cần xem xét thông số, tài liệu, độ phù hợp với quy trình và thử nghiệm vật liệu khi cần.",
        sections: [
          { heading: "So sánh các tính chất thực sự quan trọng với quy trình", paragraphs: ["Bắt đầu từ vai trò chức năng của nguyên liệu và liên kết từng yêu cầu quan trọng của quy trình hoặc thành phẩm với tính chất liên quan. Không nên xem một bảng dài các giá trị không quan trọng là bằng chứng mạnh hơn danh sách ngắn các thông số quyết định."], points: ["Định danh và thành phần hóa học", "Dạng vật lý và hành vi khi xử lý", "Thông số quy trình quan trọng", "Tiêu chí hiệu năng thành phẩm"] },
          { heading: "Xem xét tài liệu và ảnh hưởng thay đổi", paragraphs: ["Xác nhận thông số, phương pháp thử, phiên bản tài liệu và yêu cầu kiểm soát thay đổi nội bộ. Tùy nguyên liệu, quá trình xem xét có thể cần bộ phận mua hàng, kỹ thuật, chất lượng, sản xuất và EHS."], points: ["Thông số và phương pháp đã thống nhất", "Khả năng cung cấp COA, TDS và SDS", "Yêu cầu pháp lý hoặc khách hàng", "Lộ trình phê duyệt và kiểm soát thay đổi nội bộ"] },
          { heading: "Thiết kế thử nghiệm để trả lời một quyết định", paragraphs: ["Nếu cần thử nghiệm, hãy xác định trước câu hỏi cần trả lời, mẫu so sánh, điều kiện vận hành, tiêu chí chấp nhận và cách ghi nhận trước khi đưa nguyên liệu vào sản xuất."], points: ["Mục tiêu thử nghiệm và mẫu chuẩn", "Số lượng kiểm soát và truy xuất lô", "Thông số vận hành cần ghi nhận", "Tiêu chí chấp nhận và người quyết định"] },
        ],
        takeawaysTitle: "So sánh có kỷ luật",
        takeaways: ["Tên gọi giống nhau không chứng minh tương đương.", "Tập trung vào tính chất gắn với ứng dụng thực tế.", "Chuyển thay đổi qua đúng chủ sở hữu nội bộ.", "Dùng thử nghiệm xác định khi tài liệu chưa đủ để kết luận độ phù hợp."],
        faqTitle: "Câu hỏi về so sánh grade",
        faq: [
          { question: "Datasheet tương đồng có chứng minh hai grade thay thế được không?", answer: "Không. Datasheet hỗ trợ sàng lọc, nhưng tính tương đương phụ thuộc yêu cầu đầy đủ, tài liệu và thẩm định trong quy trình dự kiến." },
          { question: "Luôn phải thử nghiệm sản xuất không?", answer: "Quyết định này thuộc quy trình kỹ thuật và chất lượng của bên mua. Rủi ro, chức năng nguyên liệu, phạm vi thay đổi và bằng chứng sẵn có nên định hướng cách tiếp cận." },
        ],
      },
    },
  },
  {
    slug: "ingredient-excipient-sourcing-brief",
    publishedAt: "2026-09-23",
    updatedAt: "2026-09-23",
    image: "/images/editorial/lab-quality.webp",
    relatedCategorySlugs: ["nutraceutical-food-ingredients"],
    relatedProductSlugs: ["sodium-salts", "magnesium-salts", "thickeners-stabilisers", "excipients"],
    content: {
      en: {
        title: "Preparing an ingredient or excipient sourcing brief",
        description: "What to include when requesting a food ingredient, nutraceutical ingredient or excipient.",
        topic: "Ingredients",
        introduction: "The same ingredient or excipient name can refer to different chemical forms, grades, physical properties and document requirements. A useful brief states the exact form, intended function, quality requirements and process constraints.",
        sections: [
          { heading: "Define identity, form and function", paragraphs: ["State the full identity, chemical form and intended functional role. For salts, gums, stabilisers and excipients, small differences in form or physical properties can matter to formulation and process behaviour."], points: ["Full ingredient or excipient name", "Chemical form or grade", "Functional role and intended use", "Physical form or handling preference"] },
          { heading: "Describe the quality-review context", paragraphs: ["Identify the target standard, important COA parameters and documents required by the buyer's quality system. Do not assume that similarly named food, nutraceutical or other grades are equivalent."], points: ["Target standard or reference specification", "Critical test parameters", "Document and statement requirements", "Internal or customer approval needs"] },
          { heading: "Plan formulation and production evaluation", paragraphs: ["Include current dosage range, formulation constraints and the purpose of any sample or trial. Suitability should be assessed within the buyer's own formulation, process and finished-product requirements."], points: ["Dosage or use level", "Process conditions and sensitivities", "Comparison material and baseline", "Sample quantity and trial objective"] },
        ],
        takeawaysTitle: "A better ingredient brief",
        takeaways: ["Specify the chemical form and functional role.", "Connect quality parameters to the approval process.", "State formulation and process constraints.", "Define the purpose of samples or trials."],
        faqTitle: "Ingredient-sourcing questions",
        faq: [
          { question: "Are food and nutraceutical grades with the same name equivalent?", answer: "Not automatically. Standards, manufacturing controls, physical properties and documentation can differ, so the exact requirement must be reviewed." },
          { question: "Can a sample be discussed before routine supply?", answer: "Include the sample quantity and trial objective in the enquiry. Availability and conditions are confirmed for the selected material and source." },
        ],
      },
      vi: {
        title: "Chuẩn bị yêu cầu tìm nguồn nguyên liệu thực phẩm hoặc tá dược",
        description: "Những thông tin cần có khi yêu cầu nguyên liệu thực phẩm, dinh dưỡng hoặc tá dược.",
        topic: "Nguyên liệu",
        introduction: "Cùng một tên nguyên liệu hoặc tá dược có thể bao gồm nhiều dạng hóa học, grade, tính chất vật lý và yêu cầu tài liệu khác nhau. Hồ sơ tìm nguồn cần nêu rõ dạng nguyên liệu, chức năng dự kiến, yêu cầu chất lượng và giới hạn quy trình.",
        sections: [
          { heading: "Xác định danh tính, dạng và chức năng", paragraphs: ["Nêu định danh đầy đủ, dạng hóa học và vai trò chức năng dự kiến. Với muối, gum, chất ổn định và tá dược, khác biệt nhỏ về dạng hoặc tính chất vật lý có thể ảnh hưởng công thức và hành vi quy trình."], points: ["Tên đầy đủ của nguyên liệu hoặc tá dược", "Dạng hóa học hoặc grade", "Vai trò chức năng và mục đích dùng", "Dạng vật lý hoặc ưu tiên xử lý"] },
          { heading: "Mô tả bối cảnh đánh giá chất lượng", paragraphs: ["Xác định tiêu chuẩn mục tiêu, chỉ tiêu COA quan trọng và tài liệu hệ thống chất lượng của bên mua yêu cầu. Không mặc định các grade thực phẩm, dinh dưỡng hoặc grade khác có cùng tên là tương đương."], points: ["Tiêu chuẩn mục tiêu hoặc thông số tham chiếu", "Chỉ tiêu thử nghiệm quan trọng", "Yêu cầu tài liệu và tuyên bố", "Nhu cầu phê duyệt nội bộ hoặc khách hàng"] },
          { heading: "Lập kế hoạch đánh giá công thức và sản xuất", paragraphs: ["Nêu khoảng liều sử dụng hiện tại, giới hạn công thức và mục đích của mẫu hoặc thử nghiệm. Độ phù hợp cần được đánh giá trong công thức, quy trình và yêu cầu thành phẩm của bên mua."], points: ["Liều hoặc mức sử dụng", "Điều kiện và độ nhạy quy trình", "Nguyên liệu so sánh và mẫu chuẩn", "Số lượng mẫu và mục tiêu thử"] },
        ],
        takeawaysTitle: "Hồ sơ nguyên liệu tốt hơn",
        takeaways: ["Nêu dạng hóa học và vai trò chức năng.", "Kết nối chỉ tiêu chất lượng với quy trình phê duyệt.", "Nêu giới hạn công thức và quy trình.", "Xác định mục đích của mẫu hoặc thử nghiệm."],
        faqTitle: "Câu hỏi về tìm nguồn nguyên liệu",
        faq: [
          { question: "Các grade thực phẩm và dinh dưỡng cùng tên có tương đương không?", answer: "Không mặc nhiên. Tiêu chuẩn, kiểm soát sản xuất, tính chất vật lý và tài liệu có thể khác nhau nên yêu cầu cụ thể cần được xem xét." },
          { question: "Có thể trao đổi mẫu trước khi cung ứng định kỳ không?", answer: "Hãy nêu số lượng mẫu và mục tiêu thử nghiệm trong yêu cầu. Khả năng và điều kiện cung cấp được xác nhận theo nguyên liệu và nguồn được lựa chọn." },
        ],
      },
    },
  },
  {
    slug: "packaging-resin-machine-mould-container",
    publishedAt: "2026-09-23",
    updatedAt: "2026-09-23",
    image: "/images/editorial/container-port.webp",
    relatedCategorySlugs: ["industrial-packaging-materials"],
    relatedProductSlugs: ["pet-resin-bottle-grade", "hdpe-resin-blow-moulding"],
    content: {
      en: {
        title: "Packaging resin sourcing: machine, mould and finished container",
        description: "What to specify about equipment, moulds, finished packaging and volume in a PET or HDPE enquiry.",
        topic: "Packaging materials",
        introduction: "A PET or HDPE enquiry should identify the grade or current comparison product, processing equipment, mould or preform, finished-container requirements and expected volume. “Bottle grade” or “blow-moulding grade” alone is not a complete specification.",
        sections: [
          { heading: "Describe the equipment and conversion route", paragraphs: ["State the process, equipment type and current resin or comparison grade. For packaging applications, the same polymer family can include grades designed around different processing windows and container requirements."], points: ["Injection, stretch-blow or extrusion-blow route", "Machine and relevant process constraints", "Current resin or comparison grade", "Colour and additive context where relevant"] },
          { heading: "Connect the mould to the finished package", paragraphs: ["Share the mould or preform context and the performance expected from the final bottle or container. The buyer should define which dimensions, tests and use conditions determine acceptance."], points: ["Preform or mould reference", "Container size, wall and geometry considerations", "Contents and intended use", "Finished-package test and appearance criteria"] },
          { heading: "Plan approval and routine supply information", paragraphs: ["Confirm which technical documents, samples and production trials are needed before routine supply. Packaging and lot requirements should be stated with volume and destination."], points: ["TDS, SDS and available quality documents", "Sample or trial quantity", "Packaging and lot preferences", "Routine volume and delivery location"] },
        ],
        takeawaysTitle: "Resin enquiries need process context",
        takeaways: ["Name the processing route and equipment.", "Provide a current comparison grade when available.", "Define the finished-container acceptance criteria.", "Separate trial needs from routine supply volume."],
        faqTitle: "Packaging-resin questions",
        faq: [
          { question: "Is every PET bottle grade suitable for the same bottle?", answer: "No. Suitability depends on the grade, process, preform or mould, container design and acceptance criteria, so technical review and validation are required." },
          { question: "What should be included for an HDPE blow-moulding enquiry?", answer: "Include the current grade, machine and mould context, container use, critical process or finished-part requirements, quantity, packaging and destination." },
        ],
      },
      vi: {
        title: "Tìm nguồn nhựa bao bì theo máy, khuôn và sản phẩm hoàn thiện",
        description: "Những thông tin cần nêu về thiết bị, khuôn, bao bì thành phẩm và sản lượng khi hỏi PET hoặc HDPE.",
        topic: "Vật liệu bao bì",
        introduction: "Yêu cầu PET hoặc HDPE nên nêu grade hoặc sản phẩm đang dùng để so sánh, thiết bị gia công, khuôn hoặc phôi, yêu cầu đối với bao bì thành phẩm và sản lượng dự kiến. Chỉ ghi “bottle grade” hoặc “blow-moulding grade” chưa đủ để xác định vật liệu.",
        sections: [
          { heading: "Mô tả thiết bị và tuyến gia công", paragraphs: ["Nêu quy trình, loại thiết bị và loại nhựa hiện dùng hoặc grade so sánh. Trong ứng dụng bao bì, cùng một họ polymer có thể có nhiều grade được thiết kế cho cửa sổ gia công và yêu cầu bao bì khác nhau."], points: ["Ép phun, kéo-thổi hoặc đùn-thổi", "Máy và giới hạn quy trình liên quan", "Nhựa hiện dùng hoặc grade so sánh", "Bối cảnh màu và phụ gia khi liên quan"] },
          { heading: "Kết nối khuôn với bao bì thành phẩm", paragraphs: ["Chia sẻ bối cảnh khuôn hoặc phôi và hiệu năng mong đợi của chai hoặc bao bì cuối cùng. Bên mua nên xác định kích thước, phép thử và điều kiện sử dụng quyết định việc chấp nhận."], points: ["Tham chiếu phôi hoặc khuôn", "Kích thước, thành và hình học bao bì", "Sản phẩm chứa và mục đích sử dụng", "Tiêu chí thử nghiệm và ngoại quan thành phẩm"] },
          { heading: "Lập kế hoạch phê duyệt và cung ứng định kỳ", paragraphs: ["Xác nhận tài liệu kỹ thuật, mẫu và thử nghiệm sản xuất cần thiết trước khi cung ứng định kỳ. Yêu cầu bao bì và lô nên đi cùng sản lượng và điểm đến."], points: ["TDS, SDS và tài liệu chất lượng hiện có", "Số lượng mẫu hoặc thử", "Ưu tiên bao bì và lô", "Sản lượng định kỳ và điểm giao"] },
        ],
        takeawaysTitle: "Yêu cầu nhựa cần bối cảnh quy trình",
        takeaways: ["Nêu tuyến gia công và thiết bị.", "Cung cấp grade hiện dùng nếu có.", "Xác định tiêu chí chấp nhận bao bì thành phẩm.", "Tách nhu cầu thử nghiệm khỏi sản lượng định kỳ."],
        faqTitle: "Câu hỏi về nhựa bao bì",
        faq: [
          { question: "Mọi PET bottle grade có phù hợp cùng một loại chai không?", answer: "Không. Độ phù hợp phụ thuộc grade, quy trình, phôi hoặc khuôn, thiết kế bao bì và tiêu chí chấp nhận nên cần đánh giá kỹ thuật và thẩm định." },
          { question: "Yêu cầu HDPE thổi khuôn nên gồm những gì?", answer: "Nên gồm grade hiện dùng, bối cảnh máy và khuôn, công dụng bao bì, yêu cầu quan trọng về quy trình hoặc thành phẩm, số lượng, bao bì và điểm đến." },
        ],
      },
    },
  },
  {
    slug: "chemical-sourcing-identity-grade-handling",
    publishedAt: "2026-09-23",
    updatedAt: "2026-09-23",
    image: "/images/editorial/chemical-plant.webp",
    relatedCategorySlugs: ["chemicals"],
    relatedProductSlugs: ["specialty-chemicals-on-request"],
    content: {
      en: {
        title: "Chemical sourcing: identity, grade and handling requirements",
        description: "A structured way to describe a chemical requirement without relying on a broad trade name or incomplete purity statement.",
        topic: "Chemical sourcing",
        introduction: "A chemical enquiry should include the full chemical name, CAS number where available, grade or purity, physical form, application and handling requirements. A trade name alone may refer to more than one composition or commercial grade.",
        sections: [
          { heading: "Confirm identity before comparing sources", paragraphs: ["Provide the full chemical name, CAS number and reference product or datasheet where available. For mixtures, state the commercial grade and relevant composition rather than assuming the trade name is universally understood."], points: ["Chemical name and CAS number", "Synonym or trade name", "Reference manufacturer and grade", "Composition details for blends"] },
          { heading: "Define grade, limits and physical form", paragraphs: ["State the intended application, target grade or standard, purity or assay and critical impurity limits. Include physical form, particle or solution context and any process-sensitive property that affects use."], points: ["Target grade or standard", "Assay and critical impurities", "Physical form and concentration", "Process or finished-product constraints"] },
          { heading: "Address safety and logistics early", paragraphs: ["Handling, storage, transport and packaging can affect whether a source is practical. The current SDS and the buyer's EHS process should be reviewed before introduction into the facility."], points: ["SDS and hazard-classification review", "Packaging and storage requirements", "Transport and destination constraints", "Trial and routine volume"] },
        ],
        takeawaysTitle: "A complete chemical request",
        takeaways: ["Use chemical identity, not trade name alone.", "State grade, purity and critical limits.", "Include physical form and process context.", "Review handling and logistics before quotation."],
        faqTitle: "Chemical-sourcing questions",
        faq: [
          { question: "Can MRT Materials review a specialty chemical not listed in the catalogue?", answer: "Yes. Provide the exact identity, reference grade or datasheet, application, required limits, volume, packaging, destination and document requirements." },
          { question: "Does a CAS number fully define a chemical requirement?", answer: "Not always. Grade, composition, purity, physical form, impurities, documentation and intended use may still distinguish one requirement from another." },
        ],
      },
      vi: {
        title: "Tìm nguồn hóa chất theo danh tính, grade và yêu cầu xử lý",
        description: "Những thông tin cần có để xác định rõ một yêu cầu hóa chất.",
        topic: "Tìm nguồn hóa chất",
        introduction: "Yêu cầu hóa chất nên gồm tên hóa học đầy đủ, số CAS nếu có, grade hoặc độ tinh khiết, dạng vật lý, ứng dụng và yêu cầu xử lý. Chỉ dùng tên thương mại có thể chưa đủ để phân biệt thành phần hoặc grade thương mại.",
        sections: [
          { heading: "Xác nhận định danh trước khi so sánh nguồn", paragraphs: ["Cung cấp tên hóa chất đầy đủ, số CAS và sản phẩm hoặc datasheet tham chiếu nếu có. Với hỗn hợp, nêu grade thương mại và thành phần liên quan thay vì mặc định tên thương mại được hiểu giống nhau ở mọi nơi."], points: ["Tên hóa chất và số CAS", "Tên đồng nghĩa hoặc tên thương mại", "Nhà sản xuất và grade tham chiếu", "Thông tin thành phần đối với hỗn hợp"] },
          { heading: "Xác định grade, giới hạn và dạng vật lý", paragraphs: ["Nêu ứng dụng dự kiến, grade hoặc tiêu chuẩn mục tiêu, độ tinh khiết hoặc hàm lượng và giới hạn tạp chất quan trọng. Bao gồm dạng vật lý, bối cảnh hạt hoặc dung dịch và tính chất nhạy với quy trình."], points: ["Grade hoặc tiêu chuẩn mục tiêu", "Hàm lượng và tạp chất quan trọng", "Dạng vật lý và nồng độ", "Giới hạn của quy trình hoặc thành phẩm"] },
          { heading: "Xử lý an toàn và logistics từ sớm", paragraphs: ["Xử lý, lưu kho, vận chuyển và bao bì có thể quyết định một nguồn có thực tế hay không. SDS hiện hành và quy trình EHS của bên mua nên được xem xét trước khi đưa hóa chất vào cơ sở."], points: ["Xem xét SDS và phân loại nguy hại", "Yêu cầu bao bì và lưu kho", "Giới hạn vận chuyển và điểm đến", "Sản lượng thử và định kỳ"] },
        ],
        takeawaysTitle: "Một yêu cầu hóa chất hoàn chỉnh",
        takeaways: ["Dùng định danh hóa chất, không chỉ tên thương mại.", "Nêu grade, độ tinh khiết và giới hạn quan trọng.", "Bao gồm dạng vật lý và bối cảnh quy trình.", "Xem xét xử lý và logistics trước báo giá."],
        faqTitle: "Câu hỏi về tìm nguồn hóa chất",
        faq: [
          { question: "MRT Materials có xem xét hóa chất chuyên dụng chưa có trong danh mục không?", answer: "Có. Hãy cung cấp định danh chính xác, grade hoặc datasheet tham chiếu, ứng dụng, giới hạn yêu cầu, sản lượng, bao bì, điểm đến và yêu cầu tài liệu." },
          { question: "Số CAS có mô tả đầy đủ một yêu cầu hóa chất không?", answer: "Không phải lúc nào cũng vậy. Grade, thành phần, độ tinh khiết, dạng vật lý, tạp chất, tài liệu và mục đích dùng vẫn có thể phân biệt các yêu cầu." },
        ],
      },
    },
  },
  {
    slug: "defining-a-paraffin-wax-grade",
    publishedAt: "2026-09-23",
    updatedAt: "2026-09-23",
    image: "/images/editorial/warehouse-forklift.webp",
    relatedCategorySlugs: ["industrial-packaging-materials"],
    relatedProductSlugs: ["paraffin-wax"],
    content: {
      en: {
        title: "Defining a paraffin-wax grade for sourcing",
        description: "How application, melting range, oil content, physical form and handling context help define a paraffin-wax enquiry.",
        topic: "Industrial materials",
        introduction: "Paraffin-wax grades can differ in melting range, oil content, colour, physical form and documentation. A sourcing request should state which of these properties matter to the intended application, together with packaging, quantity and handling needs.",
        sections: [
          { heading: "Begin with application and functional need", paragraphs: ["Describe how the wax is used and which behaviour matters in the process or finished product. A general request for paraffin wax does not show whether appearance, melting behaviour, oil content or another property is decision-driving."], points: ["Application and process", "Desired function", "Current comparison grade", "Finished-product requirements"] },
          { heading: "State the grade-defining properties", paragraphs: ["Provide the target melting range, oil-content requirement and any critical appearance, colour or physical criteria used by the buyer. Confirm the applicable test method and units where comparison depends on them."], points: ["Melting range", "Oil content", "Colour or appearance", "Physical form and test method"] },
          { heading: "Include supply and handling context", paragraphs: ["State the preferred slab, pellet or other form, packaging, quantity and destination. Review SDS, storage and handling requirements as part of the source evaluation."], points: ["Preferred physical form", "Packaging and lot expectations", "Trial and routine volume", "SDS, storage and destination"] },
        ],
        takeawaysTitle: "A specific wax enquiry",
        takeaways: ["Link properties to the intended application.", "State the melting range and oil-content requirement.", "Identify the physical form and packaging.", "Include handling, document and delivery needs."],
        faqTitle: "Paraffin-wax questions",
        faq: [
          { question: "Can waxes with the same melting range be treated as equivalent?", answer: "Not automatically. Oil content, colour, physical form, test methods, documentation and process performance may still differ." },
          { question: "Can different physical forms be requested?", answer: "Availability depends on the selected source. State the preferred form, packaging, quantity and handling considerations in the enquiry." },
        ],
      },
      vi: {
        title: "Xác định grade sáp paraffin để tìm nguồn",
        description: "Cách ứng dụng, khoảng nóng chảy, hàm lượng dầu, dạng vật lý và bối cảnh xử lý giúp xác định một yêu cầu sáp paraffin.",
        topic: "Vật liệu công nghiệp",
        introduction: "Các grade sáp paraffin có thể khác nhau về khoảng nóng chảy, hàm lượng dầu, màu, dạng vật lý và tài liệu. Yêu cầu tìm nguồn cần nêu những tính chất quan trọng đối với ứng dụng, cùng quy cách bao bì, số lượng và yêu cầu lưu kho, xử lý.",
        sections: [
          { heading: "Bắt đầu từ ứng dụng và nhu cầu chức năng", paragraphs: ["Mô tả cách sáp được sử dụng và hành vi nào quan trọng trong quy trình hoặc thành phẩm. Yêu cầu chung về sáp paraffin chưa cho biết ngoại quan, hành vi nóng chảy, hàm lượng dầu hay tính chất nào quyết định lựa chọn."], points: ["Ứng dụng và quy trình", "Chức năng mong muốn", "Grade hiện dùng để so sánh", "Yêu cầu thành phẩm"] },
          { heading: "Nêu các tính chất xác định grade", paragraphs: ["Cung cấp khoảng nóng chảy mục tiêu, yêu cầu hàm lượng dầu và tiêu chí quan trọng về ngoại quan, màu hoặc vật lý của bên mua. Xác nhận phương pháp thử và đơn vị khi việc so sánh phụ thuộc vào chúng."], points: ["Khoảng nóng chảy", "Hàm lượng dầu", "Màu hoặc ngoại quan", "Dạng vật lý và phương pháp thử"] },
          { heading: "Bao gồm bối cảnh cung ứng và xử lý", paragraphs: ["Nêu dạng tấm, viên hoặc dạng khác mong muốn, bao bì, số lượng và điểm đến. Xem xét SDS, lưu kho và xử lý như một phần của đánh giá nguồn."], points: ["Dạng vật lý ưu tiên", "Yêu cầu bao bì và lô", "Sản lượng thử và định kỳ", "SDS, lưu kho và điểm giao"] },
        ],
        takeawaysTitle: "Yêu cầu sáp cụ thể",
        takeaways: ["Liên kết tính chất với ứng dụng dự kiến.", "Nêu khoảng nóng chảy và yêu cầu hàm lượng dầu.", "Xác định dạng vật lý và bao bì.", "Bao gồm nhu cầu xử lý, tài liệu và giao hàng."],
        faqTitle: "Câu hỏi về sáp paraffin",
        faq: [
          { question: "Sáp cùng khoảng nóng chảy có thể xem là tương đương không?", answer: "Không mặc nhiên. Hàm lượng dầu, màu, dạng vật lý, phương pháp thử, tài liệu và hiệu năng quy trình vẫn có thể khác nhau." },
          { question: "Có thể yêu cầu các dạng vật lý khác nhau không?", answer: "Khả năng phụ thuộc nguồn được lựa chọn. Hãy nêu dạng ưu tiên, bao bì, số lượng và lưu ý xử lý trong yêu cầu." },
        ],
      },
    },
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug);
}

export function getInsightContent(insight: Insight, locale: Locale): InsightContent {
  return insight.content[locale];
}

export function getRelatedInsights(categorySlug: string, limit = 3): Insight[] {
  return insights.filter((insight) => insight.relatedCategorySlugs.includes(categorySlug)).slice(0, limit);
}
