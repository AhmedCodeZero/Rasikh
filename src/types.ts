

export enum Role {
  INITIATIVE_MANAGER = "مدير المبادرة",
  OPERATIONS_MANAGER = "مدير العمليات",
  MEDICAL_DIRECTOR = "المدير الطبي",
  VOLUNTEER_MANAGER = "مدير التطوع",
  MEDIA_MANAGER = "مدير الإعلام",
  LOGISTICS_OFFICER = "مسؤول اللوجستيات",
  IMPACT_OFFICER = "مسؤول قياس الأثر",
  DOCTORS = "الأطباء",
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  role: Role;
  templateId?: string;
  completed: boolean;
  parallel?: boolean;
  impact?: string;
  conditions?: string;
  alerts?: string;
  goal?: string;
  standard?: string;
  indicator?: string;
  method?: string;
  /** شرح إجرائي مفصل لتنفيذ المهمة: يقوم (المنصب) بفعل كذا باستخدام نموذج كذا ثم فعل كذا */
  procedureGuide?: string;
}

export interface Phase {
  id: number;
  title: string;
  goal: string;
  tasks: Task[];
}

export interface InitiativeData {
  charityName: string;
  city: string;
  startDate: string;
  durationDays: number;
  team: Record<string, string>;
  completedTasks: string[];
  taskEvidence: Record<string, string>;
  isInitialized: boolean;
}

export const ROLES: Role[] = [
  Role.INITIATIVE_MANAGER,
  Role.OPERATIONS_MANAGER,
  Role.MEDICAL_DIRECTOR,
  Role.VOLUNTEER_MANAGER,
  Role.MEDIA_MANAGER,
  Role.LOGISTICS_OFFICER,
  Role.IMPACT_OFFICER,
  Role.DOCTORS,
];

// === النماذج الشاملة للمشروع (91 نموذج) ===
// تم استخراجها من ملف نماذج مشروع ضيوف المملكة.. صوم وصحة

export const TEMPLATES: Template[] = [
  // ======= الفصل 112: النماذج الإدارية =======
  { id: "112.1", name: "نموذج اعتماد مبادرة", description: "اعتماد المبادرة رسمياً من الجهة المنظمة والشريك الاستراتيجي.", category: "إدارية" },
  { id: "112.2", name: "نموذج تشكيل الفريق التنفيذي", description: "تحديد المناصب والأسماء والمهام ووسائل التواصل.", category: "إدارية" },
  { id: "112.3", name: "نموذج توصيف الدور الوظيفي", description: "المسمى والمهام والمسؤوليات والصلاحيات لكل منصب.", category: "إدارية" },
  { id: "112.4", name: "نموذج خطة المبادرة", description: "المراحل والأنشطة والمسؤوليات والميزانية التقديرية.", category: "إدارية" },
  { id: "112.5", name: "نموذج الخطة التشغيلية للمبادرة", description: "الأنشطة اليومية والأوقات والمسؤوليات والأماكن.", category: "إدارية" },
  { id: "112.6", name: "نموذج توزيع المسؤوليات", description: "مصفوفة RACI للمهام والمسؤول الأول والمساند.", category: "إدارية" },
  { id: "112.7", name: "نموذج خطة الاجتماعات", description: "جدول الاجتماعات والمواضيع والمشاركين.", category: "إدارية" },
  { id: "112.8", name: "نموذج محضر الاجتماع", description: "توثيق الحضور والقرارات والتوصيات.", category: "إدارية" },
  { id: "112.9", name: "نموذج متابعة المهام", description: "تتبع المهام وحالة الإنجاز والملاحظات.", category: "إدارية" },

  // ======= الفصل 113: نماذج التواصل المؤسسي =======
  { id: "113.1", name: "نموذج مصفوفة التواصل المؤسسي", description: "الجهات المستهدفة وأهداف وقنوات التواصل.", category: "تواصل" },
  { id: "113.2", name: "نموذج خطاب رسمي", description: "خطاب رسمي موجه للجهات الحكومية والمؤسسات.", category: "تواصل" },
  { id: "113.3", name: "نموذج خطاب دعوة شريك", description: "دعوة الجهات للمشاركة في المبادرة.", category: "تواصل" },
  { id: "113.4", name: "نموذج خطاب دعوة متحدث", description: "دعوة متحدثين ومختصين للمشاركة.", category: "تواصل" },
  { id: "113.5", name: "نموذج خطاب دعوة مدرب", description: "دعوة مدربين لتقديم الدورات والورش.", category: "تواصل" },
  { id: "113.6", name: "نموذج خطاب دعوة جهة إعلامية", description: "دعوة وسائل الإعلام للتغطية.", category: "تواصل" },
  { id: "113.7", name: "نموذج متابعة التواصل مع الجهات", description: "توثيق ومتابعة التواصل مع الجهات.", category: "تواصل" },

  // ======= الفصل 114: نماذج الشراكات =======
  { id: "114.1", name: "نموذج طلب شراكة", description: "طلب شراكة رسمي مع الجهات.", category: "شراكات" },
  { id: "114.2", name: "نموذج تقييم الشريك", description: "تقييم ملاءمة الشريك للمبادرة.", category: "شراكات" },
  { id: "114.3", name: "نموذج اتفاقية شراكة", description: "اتفاقية رسمية مع الشريك تحدد الالتزامات.", category: "شراكات" },
  { id: "114.4", name: "نموذج تحديد دور الشريك", description: "تحديد دور ومساهمة كل شريك.", category: "شراكات" },
  { id: "114.5", name: "نموذج متابعة التزامات الشريك", description: "متابعة تنفيذ التزامات الشركاء.", category: "شراكات" },

  // ======= الفصل 115: نماذج الرعاية =======
  { id: "115.1", name: "نموذج عرض الرعاية", description: "عرض فرص الرعاية للجهات الداعمة.", category: "رعاية" },
  { id: "115.2", name: "نموذج طلب رعاية", description: "طلب رعاية رسمي للمبادرة.", category: "رعاية" },
  { id: "115.3", name: "نموذج حزم الرعاية", description: "تحديد حزم الرعاية ومميزاتها.", category: "رعاية" },
  { id: "115.4", name: "نموذج اتفاقية رعاية", description: "اتفاقية رسمية مع الراعي.", category: "رعاية" },
  { id: "115.5", name: "نموذج متابعة التزامات الراعي", description: "متابعة تنفيذ التزامات الرعاة.", category: "رعاية" },
  { id: "115.6", name: "نموذج تقرير الراعي", description: "تقرير للراعي عن مخرجات المبادرة.", category: "رعاية" },

  // ======= الفصل 116: نماذج التصاريح =======
  { id: "116.1", name: "نموذج حصر التصاريح المطلوبة", description: "حصر جميع التصاريح اللازمة للمبادرة.", category: "تصاريح" },
  { id: "116.2", name: "نموذج طلب تصريح بلدية", description: "طلب رسمي لتصريح البلدية للموقع.", category: "تصاريح" },
  { id: "116.3", name: "نموذج طلب تصريح دفاع مدني", description: "طلب تصريح الدفاع المدني للسلامة.", category: "تصاريح" },
  { id: "116.4", name: "نموذج طلب موافقة الجهة المستضيفة", description: "طلب موافقة الجهة المستضيفة للموقع.", category: "تصاريح" },
  { id: "116.5", name: "نموذج متابعة إصدار التصاريح", description: "متابعة حالة إصدار التصاريح.", category: "تصاريح" },
  { id: "116.6", name: "نموذج توثيق التصاريح", description: "أرشفة وتوثيق التصاريح الصادرة.", category: "تصاريح" },

  // ======= الفصل 117: نماذج خطط التشغيل =======
  { id: "117.1", name: "نموذج خطة التشغيل الشاملة", description: "الخطة التشغيلية الكاملة للمبادرة.", category: "تشغيل" },
  { id: "117.2", name: "نموذج خطة الموقع", description: "تفاصيل تشغيل الموقع.", category: "تشغيل" },
  { id: "117.3", name: "نموذج خطة المسارات التشغيلية", description: "مسارات الحركة والتدفق في الموقع.", category: "تشغيل" },
  { id: "117.4", name: "نموذج خطة الأنشطة", description: "جدول الأنشطة والفعاليات.", category: "تشغيل" },
  { id: "117.5", name: "نموذج خطة إدارة الزوار", description: "إدارة تدفق واستقبال الزوار.", category: "تشغيل" },
  { id: "117.6", name: "نموذج خطة إدارة المتطوعين", description: "توزيع وإدارة المتطوعين.", category: "تشغيل" },

  // ======= الفصل 118: نماذج الموقع =======
  { id: "118.1", name: "نموذج مخطط توزيع الموقع", description: "كروكي وتوزيع مناطق الموقع.", category: "موقع" },
  { id: "118.2", name: "نموذج تحديد مناطق المخيم", description: "تحديد وتسمية مناطق المخيم.", category: "موقع" },
  { id: "118.3", name: "نموذج مسارات الحركة", description: "مسارات الدخول والخروج والحركة.", category: "موقع" },
  { id: "118.4", name: "نموذج توزيع الخيم", description: "توزيع وتخصيص الخيم.", category: "موقع" },
  { id: "118.5", name: "نموذج توزيع اللوحات الإرشادية", description: "أماكن وأنواع اللوحات الإرشادية.", category: "موقع" },

  // ======= الفصل 119: نماذج التجهيزات =======
  { id: "119.1", name: "نموذج قائمة التجهيزات العامة", description: "حصر شامل لجميع التجهيزات.", category: "تجهيزات" },
  { id: "119.2", name: "نموذج تجهيز الموقع", description: "قائمة تجهيزات الموقع العامة.", category: "تجهيزات" },
  { id: "119.3", name: "نموذج تجهيز العيادات", description: "قائمة تجهيزات العيادات الطبية.", category: "تجهيزات" },
  { id: "119.4", name: "نموذج تجهيز قاعات التدريب", description: "قائمة تجهيزات قاعات التدريب.", category: "تجهيزات" },
  { id: "119.5", name: "نموذج تجهيز خيمة الجود", description: "قائمة تجهيزات خيمة الضيافة.", category: "تجهيزات" },
  { id: "119.6", name: "نموذج استلام التجهيزات", description: "توثيق استلام وتسليم التجهيزات.", category: "تجهيزات" },
  { id: "119.7", name: "نموذج فحص الجاهزية النهائي", description: "فحص شامل لجاهزية الموقع والتجهيزات.", category: "تجهيزات" },

  // ======= الفصل 120: النماذج الطبية =======
  { id: "120.1", name: "نموذج تسجيل مستفيد", description: "تسجيل بيانات المستفيد الأساسية.", category: "طبية" },
  { id: "120.2", name: "نموذج الفرز الطبي", description: "العلامات الحيوية والتاريخ المرضي.", category: "طبية" },
  { id: "120.3", name: "نموذج الاستشارة الطبية", description: "التشخيص والتوصيات والعلاج.", category: "طبية" },
  { id: "120.4", name: "نموذج الفحوصات الطبية", description: "نتائج الفحوصات (ضغط، سكر، وزن).", category: "طبية" },
  { id: "120.5", name: "نموذج التحويل الطبي", description: "تحويل الحالة لمستشفى أو مركز صحي.", category: "طبية" },
  { id: "120.6", name: "نموذج متابعة الحالة الطبية", description: "متابعة الحالة بعد التحويل.", category: "طبية" },

  // ======= الفصل 121: نماذج التدريب =======
  { id: "121.1", name: "نموذج خطة التدريب", description: "خطة الدورات والورش التدريبية.", category: "تدريب" },
  { id: "121.2", name: "نموذج تسجيل المتدربين", description: "تسجيل المشاركين في التدريب.", category: "تدريب" },
  { id: "121.3", name: "نموذج تقييم التدريب", description: "تقييم المتدربين للدورة.", category: "تدريب" },
  { id: "121.4", name: "نموذج حضور المتدربين", description: "سجل حضور المتدربين.", category: "تدريب" },
  { id: "121.5", name: "نموذج متابعة إتمام التدريب", description: "متابعة إكمال المتدربين للدورات.", category: "تدريب" },

  // ======= الفصل 122: نماذج الأنشطة التفاعلية =======
  { id: "122.1", name: "نموذج خطة النشاط التفاعلي", description: "تخطيط الأنشطة التفاعلية.", category: "أنشطة" },
  { id: "122.2", name: "نموذج تسجيل المشاركين في النشاط", description: "تسجيل المشاركين في الأنشطة.", category: "أنشطة" },
  { id: "122.3", name: "نموذج تقييم النشاط التفاعلي", description: "تقييم الأنشطة من المشاركين.", category: "أنشطة" },
  { id: "122.4", name: "نموذج ملاحظات النشاط الميدانية", description: "ملاحظات ميدانية أثناء النشاط.", category: "أنشطة" },
  { id: "122.5", name: "نموذج تقرير النشاط التفاعلي", description: "تقرير ختامي عن النشاط.", category: "أنشطة" },

  // ======= الفصل 123: نماذج المسار الثقافي =======
  { id: "123.1", name: "نموذج خطة المسار الثقافي", description: "خطة المسابقات والفقرات الثقافية.", category: "ثقافي" },
  { id: "123.2", name: "نموذج تسجيل المشاركين في المسار الثقافي", description: "تسجيل المشاركين في المسابقات.", category: "ثقافي" },
  { id: "123.3", name: "نموذج تقييم المسار الثقافي", description: "تقييم المسار الثقافي.", category: "ثقافي" },
  { id: "123.4", name: "نموذج تقرير المسار الثقافي", description: "تقرير ختامي عن المسار الثقافي.", category: "ثقافي" },

  // ======= الفصل 124: نماذج المتطوعين =======
  { id: "124.1", name: "نموذج تسجيل المتطوع", description: "تسجيل بيانات المتطوع.", category: "متطوعين" },
  { id: "124.2", name: "نموذج توزيع مهام المتطوعين", description: "توزيع المهام على المتطوعين.", category: "متطوعين" },
  { id: "124.3", name: "نموذج تقييم أداء المتطوع", description: "تقييم أداء المتطوع.", category: "متطوعين" },
  { id: "124.4", name: "نموذج سجل شهادات تقدير المتطوعين", description: "سجل شهادات التقدير الممنوحة.", category: "متطوعين" },

  // ======= الفصل 125: نماذج التشغيل اليومي =======
  { id: "125.1", name: "نموذج تقرير اليوم التشغيلي", description: "تقرير يومي شامل عن التشغيل.", category: "يومي" },
  { id: "125.2", name: "نموذج متابعة سير العمل اليومي", description: "متابعة سير العمل لحظياً.", category: "يومي" },
  { id: "125.3", name: "نموذج تسجيل الحوادث والملاحظات", description: "توثيق الحوادث والملاحظات.", category: "يومي" },
  { id: "125.4", name: "نموذج إغلاق اليوم التشغيلي", description: "إجراءات إغلاق نهاية اليوم.", category: "يومي" },

  // ======= الفصل 126: نماذج الإعلام والتوثيق =======
  { id: "126.1", name: "نموذج خطة التغطية الإعلامية", description: "خطة التغطية والتوثيق الإعلامي.", category: "إعلام" },
  { id: "126.2", name: "نموذج طلب التصوير والتوثيق", description: "طلبات التصوير الداخلية.", category: "إعلام" },
  { id: "126.3", name: "نموذج سجل المحتوى الإعلامي", description: "أرشيف المحتوى الإعلامي.", category: "إعلام" },
  { id: "126.4", name: "نموذج تقرير التوثيق الإعلامي النهائي", description: "تقرير ختامي عن التوثيق الإعلامي.", category: "إعلام" },

  // ======= الفصل 127: نماذج المخاطر والطوارئ =======
  { id: "127.1", name: "نموذج سجل المخاطر", description: "حصر وتقييم المخاطر المحتملة.", category: "مخاطر" },
  { id: "127.2", name: "نموذج بلاغ الحادثة الطارئة", description: "الإبلاغ عن الحوادث الطارئة.", category: "مخاطر" },
  { id: "127.3", name: "نموذج خطة التعامل مع المخاطر", description: "خطة الاستجابة للمخاطر.", category: "مخاطر" },
  { id: "127.4", name: "نموذج تقرير ما بعد الأزمة", description: "تقرير تحليل ما بعد الأزمة.", category: "مخاطر" },

  // ======= الفصل 128: نماذج قياس الأثر =======
  { id: "128.1", name: "نموذج استبيان رضا المستفيدين", description: "قياس رضا المستفيدين عن الخدمة.", category: "أثر" },
  { id: "128.2", name: "نموذج قياس الأثر الصحي", description: "قياس الأثر الصحي للمبادرة.", category: "أثر" },
  { id: "128.3", name: "نموذج مؤشرات الأداء الرئيسية - KPI", description: "تتبع مؤشرات الأداء الرئيسية.", category: "أثر" },
  { id: "128.4", name: "نموذج تحليل النتائج والأثر", description: "تحليل شامل للنتائج والأثر.", category: "أثر" },

  // ======= الفصل 129: نماذج التقارير =======
  { id: "129.1", name: "نموذج التقرير اليومي", description: "تقرير يومي عن سير العمل.", category: "تقارير" },
  { id: "129.2", name: "نموذج التقرير الأسبوعي", description: "تقرير أسبوعي ملخص.", category: "تقارير" },
  { id: "129.3", name: "نموذج التقرير الختامي للمشروع", description: "التقرير الختامي الشامل للمبادرة.", category: "تقارير" },
  { id: "129.4", name: "نموذج توصيات ما بعد المشروع", description: "توصيات وملاحظات للمستقبل.", category: "تقارير" },
];

export const INITIAL_PHASES: Phase[] = [
  {
    id: 1,
    title: "الإعداد الأولي",
    goal: "تأسيس المبادرة إداريًا وتشغيليًا.",
    tasks: [
      { id: "1", title: "تسجيل بيانات المبادرة في النظام", description: "إدخال البيانات الأساسية للمبادرة.", role: Role.INITIATIVE_MANAGER, templateId: "112.1", completed: false, procedureGuide: "يقوم (مدير المبادرة) بإدخال اسم الجمعية والمدينة وتاريخ البدء وعدد الأيام في النظام، ثم حفظ البيانات وإنشاء المبادرة باستخدام نموذج اعتماد المبادرة (112.1)." },
      { 
        id: "2", 
        title: "إدخال أسماء الفريق التنفيذي في الهيكل الإداري", 
        description: "تحديد المسؤولين عن كل دور وتوثيق بياناتهم الرسمية.", 
        role: Role.INITIATIVE_MANAGER, 
        templateId: "112.2", 
        completed: false,
        impact: "ضمان وضوح المرجعية الإدارية وسرعة اتخاذ القرار.",
        conditions: "توفر السير الذاتية للفريق وتحديد الصلاحيات.",
        alerts: "يجب التأكد من توافق التخصصات مع الأدوار المسندة.",
        goal: "بناء هيكل تنظيمي متكامل للمبادرة.",
        standard: "معيار الحوكمة والقيادة (G1).",
        indicator: "نسبة اكتمال تعيين الفريق التنفيذي.",
        method: "مراجعة الهيكل المعتمد، التواصل مع المرشحين، وتعبئة نموذج تشكيل الفريق.",
        procedureGuide: "يقوم (مدير المبادرة) بمراجعة الهيكل التنظيمي المعتمد والتواصل مع المرشحين، ثم تعبئة نموذج تشكيل الفريق التنفيذي (112.2) بالأسماء ووسائل التواصل، واستخدام نموذج توصيف الدور الوظيفي (112.3) لتوضيح المهام."
      },
      { id: "3", title: "عقد اجتماع إطلاق المبادرة", description: "اجتماع تعريفي للفريق لبدء العمل.", role: Role.INITIATIVE_MANAGER, templateId: "112.8", completed: false, procedureGuide: "يقوم (مدير المبادرة) بتحديد موعد ومكان الاجتماع باستخدام نموذج خطة الاجتماعات (112.7)، ثم توثيق الاجتماع بنموذج محضر الاجتماع (112.8)." },
      { id: "4", title: "تحديد الفئة المستهدفة بدقة", description: "تحديد من هم المستفيدون من المبادرة.", role: Role.MEDICAL_DIRECTOR, templateId: "117.5", completed: false, parallel: true, procedureGuide: "يقوم (المدير الطبي) بتحليل المنطقة والاحتياجات الصحية باستخدام نموذج خطة إدارة الزوار (117.5)، ثم تحديد الفئة المستهدفة وتوثيق النتائج." },
      { id: "5", title: "تحديد عدد المستفيدين المتوقع", description: "وضع مستهدف رقمي للمستفيدين.", role: Role.OPERATIONS_MANAGER, templateId: "117.1", completed: false, parallel: true, procedureGuide: "يقوم (مدير العمليات) بدراسة الطاقة الاستيعابية للموقع وعدد العيادات باستخدام نموذج خطة التشغيل الشاملة (117.1)، ثم وضع رقم مستهدف للمستفيدين." },
      { id: "6", title: "تحديد مدة المبادرة وعدد أيام التشغيل", description: "تحديد الجدول الزمني للتنفيذ.", role: Role.INITIATIVE_MANAGER, templateId: "112.4", completed: false, parallel: true, procedureGuide: "يقوم (مدير المبادرة) بتحديد تاريخ البدء وعدد أيام التشغيل باستخدام نموذج خطة المبادرة (112.4) ونموذج الخطة التشغيلية (112.5)." },
      { id: "7", title: "تحديد عدد العيادات الطبية المطلوبة", description: "بناءً على الطاقة الاستيعابية.", role: Role.MEDICAL_DIRECTOR, templateId: "119.3", completed: false, procedureGuide: "يقوم (المدير الطبي) بحساب الطاقة الاستيعابية واستخدام نموذج تجهيز العيادات (119.3) لتحديد عدد العيادات المطلوبة." },
      { id: "8", title: "تحديد التخصصات الطبية المشاركة", description: "اختيار التخصصات الأكثر احتياجاً.", role: Role.MEDICAL_DIRECTOR, templateId: "117.1", completed: false, procedureGuide: "يقوم (المدير الطبي) بمراجعة احتياجات الفئة المستهدفة وتحديد التخصصات المطلوبة وتوثيقها في خطة التشغيل الشاملة (117.1)." },
      { id: "9", title: "تحديد احتياج المتطوعين", description: "حصر أعداد المتطوعين المطلوبة.", role: Role.VOLUNTEER_MANAGER, templateId: "117.6", completed: false, procedureGuide: "يقوم (مدير التطوع) بحصر المهام غير الطبية واستخدام نموذج خطة إدارة المتطوعين (117.6) لتحديد العدد المطلوب." },
      { id: "10", title: "إعداد قائمة الشركاء المحتملين", description: "حصر الجهات الداعمة والمشاركة.", role: Role.INITIATIVE_MANAGER, templateId: "114.1", completed: false, procedureGuide: "يقوم (مدير المبادرة) بحصر الشركاء المحتملين باستخدام نموذج طلب شراكة (114.1) ونموذج تقييم الشريك (114.2)." },
    ],
  },
  {
    id: 2,
    title: "التصاريح والتنسيق",
    goal: "ضمان الموافقات الرسمية والتنسيق المؤسسي.",
    tasks: [
      { 
        id: "11", 
        title: "استخراج تصريح البلدية", 
        description: "الحصول على الموافقة الرسمية لاستخدام الموقع العام.", 
        role: Role.OPERATIONS_MANAGER, 
        templateId: "116.2", 
        completed: false, 
        parallel: true,
        impact: "الشرعية النظامية للمبادرة وتجنب الإغلاق المفاجئ.",
        conditions: "تحديد الموقع بدقة وتوفر سجل تجاري للجمعية.",
        alerts: "قد يستغرق الإجراء 5 أيام عمل، يجب البدء مبكراً.",
        goal: "الحصول على الغطاء القانوني للتواجد الميداني.",
        standard: "معيار الامتثال والأنظمة (L1).",
        indicator: "وجود تصريح ساري المفعول للموقع.",
        method: "تجهيز الأوراق المطلوبة، التقديم عبر بوابة بلدي، ومتابعة الطلب حتى الصدور.",
        procedureGuide: "يقوم (مدير العمليات) بتعبئة نموذج طلب تصريح بلدية (116.2) بالموقع والمدة والجهة المنفذة، ثم استخدام نموذج حصر التصاريح (116.1) ومتابعة الإصدار بنموذج (116.5) وأرشفته بنموذج (116.6)."
      },
      { id: "12", title: "استخراج تصريح الدفاع المدني", description: "التأكد من اشتراطات السلامة.", role: Role.OPERATIONS_MANAGER, templateId: "116.3", completed: false, parallel: true, procedureGuide: "يقوم (مدير العمليات) بإعداد مخطط الموقع ومخارج الطوارئ، ثم تعبئة نموذج طلب تصريح دفاع مدني (116.3) ومتابعة إصداره بنموذج (116.5)." },
      { id: "13", title: "التنسيق مع الجهة المستضيفة (مثل الجامعة)", description: "خطاب رسمي للجهة المستضيفة.", role: Role.INITIATIVE_MANAGER, templateId: "116.4", completed: false, parallel: true, procedureGuide: "يقوم (مدير المبادرة) بصياغة خطاب رسمي (113.2) ثم تعبئة نموذج طلب موافقة الجهة المستضيفة (116.4) ومتابعته بنموذج (113.7)." },
      { id: "14", title: "تحديد جهة تحويل الحالات الطبية", description: "الاتفاق مع مستشفى أو مركز صحي.", role: Role.MEDICAL_DIRECTOR, templateId: "114.3", completed: false, procedureGuide: "يقوم (المدير الطبي) بحصر المستشفيات القريبة واستخدام نموذج اتفاقية شراكة (114.3) لتوثيق آلية التحويل." },
      { id: "15", title: "توقيع اتفاقية مع الجهة الطبية الداعمة", description: "توثيق التعاون الطبي.", role: Role.INITIATIVE_MANAGER, templateId: "114.3", completed: false, procedureGuide: "يقوم (مدير المبادرة) بتعبئة نموذج اتفاقية شراكة (114.3) ونموذج تحديد دور الشريك (114.4) ثم متابعة الالتزامات بنموذج (114.5)." },
      { id: "16", title: "التنسيق مع الإسعاف أو الطوارئ", description: "ضمان سرعة الاستجابة للطوارئ.", role: Role.OPERATIONS_MANAGER, templateId: "127.3", completed: false, procedureGuide: "يقوم (مدير العمليات) بإعداد خطة التعامل مع المخاطر (127.3) وتسجيل معلومات الاتصال بالإسعاف في سجل المخاطر (127.1)." },
      { id: "17", title: "إعداد خطاب الدعوة للشركاء", description: "صياغة دعوات المشاركة.", role: Role.MEDIA_MANAGER, templateId: "113.3", completed: false, procedureGuide: "يقوم (مدير الإعلام) بصياغة خطاب الدعوة باستخدام نموذج خطاب دعوة شريك (113.3) أو متحدث (113.4) أو مدرب (113.5)." },
      { id: "18", title: "إرسال خطابات الشراكة", description: "التواصل مع الشركاء المحتملين.", role: Role.INITIATIVE_MANAGER, templateId: "113.7", completed: false, procedureGuide: "يقوم (مدير المبادرة) بإرسال الخطابات ومتابعتها باستخدام نموذج متابعة التواصل مع الجهات (113.7)." },
      { id: "19", title: "اعتماد قائمة الجهات المشاركة", description: "القائمة النهائية للشركاء.", role: Role.INITIATIVE_MANAGER, templateId: "114.5", completed: false, procedureGuide: "يقوم (مدير المبادرة) بمراجعة الردود واستخدام نموذج متابعة التزامات الشريك (114.5) لتوثيق القائمة النهائية." },
      { id: "20", title: "إعداد خطة الزيارات الرسمية", description: "جدولة زيارات كبار الشخصيات.", role: Role.MEDIA_MANAGER, templateId: "126.1", completed: false, procedureGuide: "يقوم (مدير الإعلام) بإعداد خطة التغطية الإعلامية (126.1) لتشمل جدول الزيارات الرسمية." },
    ],
  },
  {
    id: 3,
    title: "التجهيزات والبنية التحتية",
    goal: "تجهيز الموقع والبنية التشغيلية.",
    tasks: [
      { id: "21", title: "تحديد الموقع النهائي للمبادرة", description: "تثبيت مكان التنفيذ.", role: Role.OPERATIONS_MANAGER, templateId: "117.2", completed: false, procedureGuide: "يقوم (مدير العمليات) بمراجعة المواقع وتوثيق الاختيار باستخدام نموذج خطة الموقع (117.2)." },
      { id: "22", title: "إعداد مخطط توزيع الموقع", description: "رسم كروكي للموقع.", role: Role.LOGISTICS_OFFICER, templateId: "118.1", completed: false, procedureGuide: "يقوم (مسؤول اللوجستيات) بزيارة الموقع ورسم مخطط توزيع الموقع (118.1) وتحديد مناطق المخيم (118.2) ومسارات الحركة (118.3)." },
      { id: "23", title: "تحديد عدد الخيم المطلوبة", description: "حصر الاحتياج من الخيام.", role: Role.LOGISTICS_OFFICER, templateId: "118.4", completed: false, parallel: true, procedureGuide: "يقوم (مسؤول اللوجستيات) باستخدام نموذج توزيع الخيم (118.4) لحصر العدد المطلوب لكل منطقة." },
      { id: "24", title: "تركيب الخيم الرئيسية", description: "البدء في بناء الموقع.", role: Role.LOGISTICS_OFFICER, templateId: "119.2", completed: false, parallel: true, procedureGuide: "يقوم (مسؤول اللوجستيات) بتوفير وتركيب الخيم وتوثيق الاستلام بنموذج (119.6)." },
      { id: "25", title: "تجهيز خيمة العيادات الطبية", description: "تقسيم وتجهيز منطقة الكشف.", role: Role.MEDICAL_DIRECTOR, templateId: "119.3", completed: false, parallel: true, procedureGuide: "يقوم (المدير الطبي) بتجهيز العيادات باستخدام نموذج تجهيز العيادات (119.3)." },
      { id: "26", title: "تجهيز خيمة التسجيل", description: "إعداد منطقة استقبال المستفيدين.", role: Role.OPERATIONS_MANAGER, templateId: "119.2", completed: false, procedureGuide: "يقوم (مدير العمليات) بإعداد منطقة التسجيل وتوثيقها في نموذج تجهيز الموقع (119.2)." },
      { id: "27", title: "تجهيز خيمة الضيافة", description: "توفير مكان للراحة والضيافة.", role: Role.LOGISTICS_OFFICER, templateId: "119.5", completed: false, procedureGuide: "يقوم (مسؤول اللوجستيات) بتجهيز خيمة الجود باستخدام نموذج (119.5)." },
      { id: "28", title: "تجهيز المسرح", description: "إعداد منطقة الفعاليات والتوعية.", role: Role.MEDIA_MANAGER, templateId: "119.2", completed: false, procedureGuide: "يقوم (مدير الإعلام) بتجهيز المسرح وتوثيقه في نموذج تجهيز الموقع (119.2)." },
      { id: "29", title: "تجهيز نظام الصوتيات", description: "توفير السماعات والميكروفونات.", role: Role.MEDIA_MANAGER, templateId: "119.1", completed: false, procedureGuide: "يقوم (مدير الإعلام) بتوفير الصوتيات وتوثيقها في قائمة التجهيزات العامة (119.1)." },
      { id: "30", title: "تجهيز الكراسي والطاولات", description: "توفير الأثاث اللازم.", role: Role.LOGISTICS_OFFICER, templateId: "119.1", completed: false, procedureGuide: "يقوم (مسؤول اللوجستيات) بحصر الاحتياج في نموذج قائمة التجهيزات العامة (119.1) واستلامها بنموذج (119.6)." },
      { id: "31", title: "تجهيز منطقة انتظار المستفيدين", description: "ضمان راحة الضيوف.", role: Role.OPERATIONS_MANAGER, templateId: "118.5", completed: false, procedureGuide: "يقوم (مدير العمليات) بتجهيز المنطقة ووضع اللوحات الإرشادية (118.5)." },
      { id: "32", title: "تجهيز العيادات الطبية بالمعدات", description: "توفير الأجهزة الطبية.", role: Role.MEDICAL_DIRECTOR, templateId: "119.3", completed: false, procedureGuide: "يقوم (المدير الطبي) بحصر المعدات الطبية في نموذج تجهيز العيادات (119.3) واستلامها بنموذج (119.6)." },
      { id: "33", title: "تجهيز أدوات الفحص الأساسية", description: "أجهزة الضغط والسكر وغيرها.", role: Role.MEDICAL_DIRECTOR, templateId: "119.3", completed: false, procedureGuide: "يقوم (المدير الطبي) بتوفير أجهزة الفحص وتوثيقها في نموذج تجهيز العيادات (119.3)." },
      { id: "34", title: "تجهيز الكهرباء والتوصيلات", description: "ضمان وصول الطاقة للموقع.", role: Role.LOGISTICS_OFFICER, templateId: "119.2", completed: false, procedureGuide: "يقوم (مسؤول اللوجستيات) بتجهيز الكهرباء وتوثيقها في نموذج تجهيز الموقع (119.2)." },
      { id: "35", title: "تجهيز أنظمة التبريد والتهوية", description: "توفير المكيفات والمراوح.", role: Role.LOGISTICS_OFFICER, templateId: "119.1", completed: false, procedureGuide: "يقوم (مسؤول اللوجستيات) بتوفير التبريد وتوثيقه في قائمة التجهيزات العامة (119.1)." },
      { id: "36", title: "تركيب اللوحات الإرشادية", description: "تسهيل الحركة داخل الموقع.", role: Role.MEDIA_MANAGER, templateId: "118.5", completed: false, procedureGuide: "يقوم (مدير الإعلام) بإعداد وتركيب اللوحات باستخدام نموذج توزيع اللوحات الإرشادية (118.5)." },
      { id: "37", title: "تجهيز منطقة تسجيل المستفيدين", description: "إعداد أجهزة الحاسب والنماذج.", role: Role.OPERATIONS_MANAGER, templateId: "120.1", completed: false, procedureGuide: "يقوم (مدير العمليات) بإعداد منطقة التسجيل وتوفير نموذج تسجيل مستفيد (120.1)." },
      { id: "38", title: "تجهيز نظام التسجيل الإلكتروني أو الورقي", description: "اختيار وسيلة التوثيق.", role: Role.OPERATIONS_MANAGER, templateId: "120.1", completed: false, procedureGuide: "يقوم (مدير العمليات) باختيار نظام التسجيل وتجهيز نموذج تسجيل المستفيد (120.1)." },
      { id: "39", title: "تجهيز مستلزمات التعقيم", description: "ضمان النظافة والوقاية.", role: Role.MEDICAL_DIRECTOR, templateId: "119.3", completed: false, procedureGuide: "يقوم (المدير الطبي) بتوفير مستلزمات التعقيم وتوثيقها في نموذج تجهيز العيادات (119.3)." },
      { id: "40", title: "مراجعة اشتراطات السلامة", description: "فحص نهائي قبل التشغيل.", role: Role.LOGISTICS_OFFICER, templateId: "119.7", completed: false, procedureGuide: "يقوم (مسؤول اللوجستيات) بمراجعة الموقع باستخدام نموذج فحص الجاهزية النهائي (119.7) وسجل المخاطر (127.1)." },
    ],
  },
  {
    id: 4,
    title: "التشغيل الميداني",
    goal: "تنفيذ المبادرة وتشغيل الخدمات الصحية.",
    tasks: [
      { id: "41", title: "تسجيل المستفيدين", description: "بدء استقبال الضيوف.", role: Role.OPERATIONS_MANAGER, templateId: "120.1", completed: false, procedureGuide: "يقوم (مدير العمليات) باستقبال المستفيدين وتعبئة نموذج تسجيل مستفيد (120.1) لكل مستفيد." },
      { id: "42", title: "تنظيم دخول المستفيدين", description: "إدارة طوابير الانتظار.", role: Role.OPERATIONS_MANAGER, templateId: "117.5", completed: false, procedureGuide: "يقوم (مدير العمليات) بتنظيم الدخول باستخدام خطة إدارة الزوار (117.5) ومسارات الحركة (118.3)." },
      { 
        id: "43", 
        title: "تنفيذ الفرز الطبي", 
        description: "قياس العلامات الحيوية وتصنيف الحالات الصحية.", 
        role: Role.MEDICAL_DIRECTOR, 
        templateId: "120.2", 
        completed: false,
        impact: "توجيه المستفيد للعيادة الصحيحة واكتشاف الحالات الطارئة.",
        conditions: "توفر أجهزة ضغط وسكر ومعايير طبية معتمدة.",
        alerts: "يجب عزل الحالات المشتبه بإصابتها بأمراض معدية فوراً.",
        goal: "فرز وتصنيف المستفيدين لضمان جودة الرعاية.",
        standard: "معيار الجودة الطبية (M2).",
        indicator: "نسبة دقة الفرز الطبي المسجلة.",
        method: "استقبال المستفيد، قياس الضغط والسكر والوزن، وتعبئة نموذج الفرز الطبي.",
        procedureGuide: "يقوم (المدير الطبي) باستقبال المستفيد وتعبئة نموذج الفرز الطبي (120.2) بالعلامات الحيوية والتاريخ المرضي."
      },
      { id: "44", title: "تشغيل العيادات الطبية", description: "بدء الكشف الطبي.", role: Role.MEDICAL_DIRECTOR, templateId: "125.2", completed: false, procedureGuide: "يقوم (المدير الطبي) بالإشراف على العيادات ومتابعة سير العمل بنموذج (125.2)." },
      { id: "45", title: "تقديم الاستشارات الصحية", description: "نصائح طبية للمستفيدين.", role: Role.DOCTORS, templateId: "120.3", completed: false, procedureGuide: "يقوم (الأطباء) بفحص المستفيد وتعبئة نموذج الاستشارة الطبية (120.3) بالتشخيص والتوصيات." },
      { id: "46", title: "إجراء الفحوصات الطبية", description: "الفحوصات التخصصية.", role: Role.DOCTORS, templateId: "120.4", completed: false, procedureGuide: "يقوم (الأطباء) بإجراء الفحوصات وتسجيل النتائج في نموذج الفحوصات الطبية (120.4)." },
      { id: "47", title: "تحويل الحالات الطبية المحتاجة", description: "التنسيق مع جهات التحويل.", role: Role.MEDICAL_DIRECTOR, templateId: "120.5", completed: false, procedureGuide: "يقوم (المدير الطبي) بتعبئة نموذج التحويل الطبي (120.5) ومتابعة الحالة بنموذج (120.6)." },
      { id: "48", title: "إدارة المتطوعين خلال التشغيل", description: "توزيع المهام اليومية.", role: Role.VOLUNTEER_MANAGER, templateId: "124.1", completed: false, procedureGuide: "يقوم (مدير التطوع) بتسجيل المتطوعين بنموذج (124.1) وتوزيع مهامهم بنموذج (124.2)." },
      { id: "49", title: "إدارة الحشود داخل الموقع", description: "ضمان انسيابية الحركة.", role: Role.OPERATIONS_MANAGER, templateId: "117.5", completed: false, procedureGuide: "يقوم (مدير العمليات) بمراقبة التدفق باستخدام خطة إدارة الزوار (117.5) وتسجيل الملاحظات بنموذج (125.3)." },
      { id: "50", title: "متابعة توفر المستلزمات الطبية", description: "التأكد من عدم نقص الأدوات.", role: Role.MEDICAL_DIRECTOR, templateId: "119.3", completed: false, procedureGuide: "يقوم (المدير الطبي) بمراجعة المخزون بناءً على نموذج تجهيز العيادات (119.3)." },
      { id: "51", title: "متابعة عمل العيادات", description: "الإشراف الفني على الأطباء.", role: Role.MEDICAL_DIRECTOR, templateId: "125.2", completed: false, procedureGuide: "يقوم (المدير الطبي) بمتابعة العيادات باستخدام نموذج متابعة سير العمل اليومي (125.2)." },
      { id: "52", title: "رفع التقرير اليومي للتشغيل", description: "ملخص إنجاز اليوم.", role: Role.OPERATIONS_MANAGER, templateId: "125.1", completed: false, procedureGuide: "يقوم (مدير العمليات) بتعبئة نموذج تقرير اليوم التشغيلي (125.1) ونموذج التقرير اليومي (129.1)." },
      { id: "53", title: "توثيق الأنشطة إعلاميًا", description: "تصوير ونشر الفعاليات.", role: Role.MEDIA_MANAGER, templateId: "126.2", completed: false, procedureGuide: "يقوم (مدير الإعلام) بالتصوير باستخدام نموذج طلب التصوير (126.2) وتوثيق المحتوى بنموذج (126.3)." },
      { id: "54", title: "إدارة زيارات الضيوف الرسميين", description: "استقبال كبار الشخصيات.", role: Role.MEDIA_MANAGER, templateId: "126.1", completed: false, procedureGuide: "يقوم (مدير الإعلام) بإدارة الزيارات وفق خطة التغطية الإعلامية (126.1)." },
      { id: "55", title: "معالجة المشكلات التشغيلية اليومية", description: "حل التحديات الميدانية.", role: Role.OPERATIONS_MANAGER, templateId: "125.3", completed: false, procedureGuide: "يقوم (مدير العمليات) بتسجيل الحوادث والملاحظات بنموذج (125.3) واستخدام نموذج بلاغ الحادثة (127.2) عند الحاجة." },
    ],
  },
  {
    id: 5,
    title: "الإغلاق وقياس الأثر",
    goal: "إغلاق المبادرة وقياس أثرها.",
    tasks: [
      { id: "56", title: "جمع الإحصائيات النهائية", description: "حصر الأرقام الإجمالية.", role: Role.IMPACT_OFFICER, templateId: "128.3", completed: false, procedureGuide: "يقوم (مسؤول قياس الأثر) بجمع الأرقام باستخدام نموذج مؤشرات الأداء الرئيسية (128.3)." },
      { id: "57", title: "جمع بيانات المستفيدين", description: "أرشفة سجلات الضيوف.", role: Role.OPERATIONS_MANAGER, templateId: "125.4", completed: false, procedureGuide: "يقوم (مدير العمليات) بجمع النماذج وأرشفتها باستخدام نموذج إغلاق اليوم التشغيلي (125.4)." },
      { id: "58", title: "تحليل البيانات الصحية", description: "فهم النتائج الطبية.", role: Role.MEDICAL_DIRECTOR, templateId: "128.2", completed: false, procedureGuide: "يقوم (المدير الطبي) بتعبئة نموذج قياس الأثر الصحي (128.2) وتحليل النتائج." },
      { id: "59", title: "حساب عدد المستفيدين النهائي", description: "الرقم النهائي للخدمة.", role: Role.IMPACT_OFFICER, templateId: "128.4", completed: false, procedureGuide: "يقوم (مسؤول قياس الأثر) بحساب الإجمالي وتوثيقه في نموذج تحليل النتائج والأثر (128.4)." },
      { id: "60", title: "حساب عدد الحالات المحولة", description: "إحصائية التحويلات الطبية.", role: Role.MEDICAL_DIRECTOR, templateId: "120.6", completed: false, procedureGuide: "يقوم (المدير الطبي) بحصر نماذج متابعة الحالة الطبية (120.6) وإعداد الإحصائية." },
      { id: "61", title: "قياس رضا المستفيدين", description: "تحليل استبيانات الرضا.", role: Role.IMPACT_OFFICER, templateId: "128.1", completed: false, procedureGuide: "يقوم (مسؤول قياس الأثر) بتحليل استبيان رضا المستفيدين (128.1)." },
      { id: "62", title: "قياس رضا المتطوعين", description: "تحليل تجربة التطوع.", role: Role.VOLUNTEER_MANAGER, templateId: "124.3", completed: false, procedureGuide: "يقوم (مدير التطوع) بتحليل نموذج تقييم أداء المتطوع (124.3)." },
      { id: "63", title: "إعداد التقرير الختامي للمبادرة", description: "صياغة التقرير الشامل.", role: Role.INITIATIVE_MANAGER, templateId: "129.3", completed: false, procedureGuide: "يقوم (مدير المبادرة) بتعبئة نموذج التقرير الختامي للمشروع (129.3)." },
      { id: "64", title: "إعداد تقرير الأثر الصحي", description: "ملخص النتائج الصحية.", role: Role.IMPACT_OFFICER, templateId: "128.2", completed: false, procedureGuide: "يقوم (مسؤول قياس الأثر) بإعداد تقرير الأثر الصحي باستخدام نموذج قياس الأثر الصحي (128.2)." },
      { id: "65", title: "نشر التقرير الإعلامي", description: "مشاركة النتائج مع الجمهور.", role: Role.MEDIA_MANAGER, templateId: "126.4", completed: false, procedureGuide: "يقوم (مدير الإعلام) بإعداد نموذج تقرير التوثيق الإعلامي النهائي (126.4) ونشره." },
      { id: "66", title: "تكريم المتطوعين", description: "تقديم شهادات الشكر.", role: Role.VOLUNTEER_MANAGER, templateId: "124.4", completed: false, procedureGuide: "يقوم (مدير التطوع) بتوثيق الشهادات في سجل شهادات تقدير المتطوعين (124.4)." },
      { id: "67", title: "تكريم الشركاء", description: "شكر الجهات الداعمة.", role: Role.INITIATIVE_MANAGER, templateId: "115.6", completed: false, procedureGuide: "يقوم (مدير المبادرة) بإعداد تقرير الراعي (115.6) وخطابات الشكر." },
      { id: "68", title: "توثيق الدروس المستفادة", description: "رصد نقاط القوة والضعف.", role: Role.INITIATIVE_MANAGER, templateId: "129.4", completed: false, procedureGuide: "يقوم (مدير المبادرة) بتعبئة نموذج توصيات ما بعد المشروع (129.4)." },
      { id: "69", title: "أرشفة جميع الملفات والنماذج", description: "حفظ الوثائق للرجوع إليها.", role: Role.OPERATIONS_MANAGER, templateId: "116.6", completed: false, procedureGuide: "يقوم (مدير العمليات) بأرشفة كل شيء باستخدام نموذج توثيق التصاريح (116.6) كمرجع للأرشفة." },
      { id: "70", title: "إغلاق المبادرة في النظام", description: "إنهاء العمل رسمياً.", role: Role.INITIATIVE_MANAGER, templateId: "129.3", completed: false, procedureGuide: "يقوم (مدير المبادرة) بإتمام التقرير الختامي (129.3) وإنهاء المبادرة رسمياً." },
    ],
  },
];
