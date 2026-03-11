import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  Users, 
  FileText, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  ArrowLeft,
  Download,
  Info,
  Home as HomeIcon,
  PlusCircle,
  BarChart3,
  BookOpen,
  AlertCircle,
  Heart,
  GraduationCap,
  BadgeCheck,
  Palette,
  Building2,
  MapPin,
  Map as MapIcon,
  Car,
  Stethoscope,
  Coffee,
  Activity,
  LayoutGrid,
  Search,
  ExternalLink,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Footprints,
  Award
} from 'lucide-react';
import { 
  Role, 
  ROLES, 
  INITIAL_PHASES, 
  TEMPLATES, 
  InitiativeData, 
  Phase, 
  Task 
} from './types';
import { PART1_CHAPTERS } from './operationalManualContent';

// --- Components ---

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-red-100">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">عذراً، حدث خطأ ما</h2>
            <p className="text-slate-600 mb-6">حدث خطأ غير متوقع في التطبيق. يرجى محاولة إعادة تحميل الصفحة.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
            >
              إعادة تحميل التطبيق
            </button>
            {this.state.error && (
              <pre className="mt-4 p-4 bg-slate-100 rounded-lg text-left text-xs overflow-auto max-h-40 text-red-500">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
    <motion.div 
      className="bg-emerald-500 h-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5 }}
    />
  </div>
);

const Card: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-6 ${className} ${onClick ? 'cursor-pointer' : ''}`}
  >
    {children}
  </div>
);

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = "", 
  disabled = false 
}: { 
  children: React.ReactNode, 
  onClick?: () => void, 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost',
  className?: string,
  disabled?: boolean
}) => {
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm",
    secondary: "bg-slate-800 text-white hover:bg-slate-900",
    outline: "border border-slate-200 text-slate-600 hover:bg-slate-50",
    ghost: "text-slate-500 hover:bg-slate-100"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// --- New Rasikh Components ---

const SaudiGovernmentBar = () => (
  <div className="bg-[#1B5E20] text-white py-2 px-6 flex justify-between items-center text-[10px] md:text-xs border-b border-white/10">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span>منصة رسمية تابعة لجمعية الكوثر الصحية</span>
      </div>
    </div>
    <div className="flex items-center gap-4 font-bold">
      <span className="hidden sm:inline">المملكة العربية السعودية</span>
    </div>
  </div>
);

const RasikhNavbar = ({ setView, view }: { setView: (v: any) => void, view: string }) => (
  <header className="fixed top-0 left-0 right-0 z-50">
    <SaudiGovernmentBar />
    <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('landing')}>
        <img src="/assets/alkawthar-logo.png" alt="جمعية الكوثر" className="h-10 md:h-12" />
        <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />
        <div className="flex flex-col">
          <span className="text-xl font-bold text-[#006C35] leading-tight">راسخ</span>
          <span className="text-[10px] text-slate-500 font-medium">نظام نمذجة المشاريع الصحية</span>
        </div>
      </div>
      
      <div className="hidden lg:flex items-center gap-10">
        {[
          { id: 'landing', label: 'الرئيسية' },
          { id: 'library', label: 'مكتبة المشاريع' }
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => item.id === 'library' || item.id === 'landing' ? setView(item.id) : null}
            className={`text-sm font-bold transition-all relative py-2 ${
              view === item.id 
                ? 'text-[#006C35] after:content-[""] after:absolute after:bottom-0 after:right-0 after:left-0 after:h-0.5 after:bg-[#006C35]' 
                : 'text-slate-600 hover:text-[#006C35]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button className="lg:hidden p-2 text-slate-600">
          <LayoutGrid size={24} />
        </button>
      </div>
    </nav>
  </header>
);

const RasikhLanding = ({ setView }: { setView: (v: any) => void }) => (
  <div className="bg-[#F9FBFA] min-h-screen pt-[110px] pb-0 overflow-x-hidden font-sans">
    {/* Hero Section - Official DGA Style */}
    <section className="relative px-6 py-16 md:py-24 border-b border-slate-100 bg-white overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-80" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 opacity-80" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:flex-1 text-right"
        >
          <div className="flex items-center gap-3 mb-6 bg-emerald-50 w-fit px-4 py-1.5 rounded-md border-r-4 border-[#006C35]">
            <ShieldCheck size={16} className="text-[#006C35]" />
            <span className="text-[#006C35] font-bold text-xs tracking-widest uppercase">منصة راسخ لنمذجة وتمكين المشاريع الصحية</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1A1A1A] mb-8 leading-[1.2]">
            نمذجة وتمكين <span className="text-[#006C35]">المشاريع الصحية</span> لنقل التجارب وتعظيم الأثر
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
            بوابتكم للوصول إلى مكتبة المشاريع الصحية المنمذجة، صُممت لتمكين الجهات المستفيدة من تكرار المبادرات النوعية ونقل التجارب الناجحة بكفاءة تشغيلية عالية تضمن استدامة الأثر وجودة التنفيذ.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button onClick={() => setView('library')} className="px-10 py-4 bg-[#006C35] hover:bg-[#005429] text-white rounded-lg font-bold text-lg gap-3 shadow-lg shadow-emerald-900/10">
              تصفح مكتبة المشاريع
              <ChevronLeft size={20} />
            </Button>
            <Button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} variant="outline" className="px-10 py-4 border-2 border-[#006C35] text-[#006C35] hover:bg-emerald-50 rounded-lg font-bold text-lg bg-transparent">
              تعرف على آلية النمذجة
            </Button>
          </div>
          
          <div className="mt-12 flex items-center gap-8 border-t border-slate-100 pt-8">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#006C35]">70+</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">مهمة منمذجة</span>
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#006C35]">30+</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">نموذج تشغيلي</span>
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#006C35]">100%</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">حوكمة رقمية</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="lg:flex-1 relative h-[500px] overflow-hidden hidden lg:block"
        >
          <div className="absolute inset-0 flex gap-4">
            {/* Column 1 - Moving Up */}
            <div className="flex-1">
              <motion.div 
                animate={{ y: [0, "-50%"] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 20, 
                  ease: "linear" 
                }}
                className="flex flex-col gap-4"
              >
                {[
                  { title: "أدلة تشغيلية", icon: BookOpen, desc: "دليل إجرائي لكل مشروع" },
                  { title: "نماذج RACI", icon: Users, desc: "توزيع دقيق للمسؤوليات" },
                  { title: "تقارير ختامية", icon: ClipboardCheck, desc: "توليد تلقائي للتقارير" },
                  { title: "حوكمة المهام", icon: ShieldCheck, desc: "متابعة التنفيذ لحظياً" },
                  // Duplicates for loop
                  { title: "أدلة تشغيلية", icon: BookOpen, desc: "دليل إجرائي لكل مشروع" },
                  { title: "نماذج RACI", icon: Users, desc: "توزيع دقيق للمسؤوليات" },
                  { title: "تقارير ختامية", icon: ClipboardCheck, desc: "توليد تلقائي للتقارير" },
                  { title: "حوكمة المهام", icon: ShieldCheck, desc: "متابعة التنفيذ لحظياً" },
                ].map((card, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[140px] flex flex-col justify-center">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#006C35] flex items-center justify-center mb-3">
                      <card.icon size={20} />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{card.title}</h4>
                    <p className="text-slate-500 text-xs">{card.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Column 2 - Moving Down */}
            <div className="flex-1 pt-12">
              <motion.div 
                animate={{ y: ["-50%", 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 20, 
                  ease: "linear" 
                }}
                className="flex flex-col gap-4"
              >
                {[
                  { title: "قياس الأثر", icon: BarChart3, desc: "تحليل نتائج المبادرات" },
                  { title: "المستودع الرقمي", icon: FileText, desc: "أكثر من ٣٠ نموذج جاهز" },
                  { title: "مخططات تفاعلية", icon: Layers, desc: "تمثيل مرئي للبيانات" },
                  { title: "مكتبة المشاريع", icon: LayoutGrid, desc: "نماذج مشاريع مكتملة" },
                  // Duplicates for loop
                  { title: "قياس الأثر", icon: BarChart3, desc: "تحليل نتائج المبادرات" },
                  { title: "المستودع الرقمي", icon: FileText, desc: "أكثر من ٣٠ نموذج جاهز" },
                  { title: "مخططات تفاعلية", icon: Layers, desc: "تمثيل مرئي للبيانات" },
                  { title: "مكتبة المشاريع", icon: LayoutGrid, desc: "نماذج مشاريع مكتملة" },
                ].map((card, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[140px] flex flex-col justify-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                      <card.icon size={20} />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{card.title}</h4>
                    <p className="text-slate-500 text-xs">{card.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
          {/* Fades */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#F9FBFA] to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F9FBFA] to-transparent z-10" />
        </motion.div>
      </div>
    </section>

    {/* Services/Features Grid - DGA Official Style */}
    <section id="features" className="px-6 py-24 bg-[#F9FBFA]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 border-r-4 border-[#006C35] pr-6">
          <h2 className="text-3xl font-black text-[#1A1A1A] mb-4">أركان منصة راسخ</h2>
          <p className="text-slate-500 max-w-2xl leading-relaxed font-medium">خدمات رقمية متكاملة مصممة لرفع كفاءة القطاع الثالث الصحي بالمملكة.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "مكتبة النمذجة",
              desc: "أدلة تشغيلية مفصلة تشمل كافة الجوانب الإدارية والطبية واللوجستية للمشاريع.",
              icon: BookOpen,
              color: "#006C35"
            },
            {
              title: "المستودع الرقمي",
              desc: "نماذج ووثائق جاهزة للتنزيل والاستخدام المباشر لضمان توحيد معايير العمل.",
              icon: FileText,
              color: "#006C35"
            },
            {
              title: "مركز الحوكمة",
              desc: "نظام إلكتروني لمتابعة المهام وتوثيق الشواهد الإثباتية لضمان جودة الأداء.",
              icon: ShieldCheck,
              color: "#006C35"
            },
            {
              title: "مؤشرات الأداء",
              desc: "لوحات قياس ذكية لرصد مخرجات المشاريع وقياس أثرها الصحي والمجتمعي الفعلي.",
              icon: BarChart3,
              color: "#006C35"
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-xl bg-white border border-slate-200 hover:border-[#006C35] transition-all hover:shadow-md">
              <div className="w-14 h-14 rounded-lg bg-emerald-50 text-[#006C35] flex items-center justify-center mb-6 group-hover:bg-[#006C35] group-hover:text-white transition-all">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Official Footer - Compliant with KSA Government Portal Standards */}
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <img src="/assets/alkawthar-logo.png" alt="جمعية الكوثر" className="h-12 brightness-0 invert" />
              <div className="h-8 w-px bg-white/20 mx-1" />
              <span className="text-2xl font-bold">راسخ</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              نظام نمذجة المشاريع الصحية الأول من نوعه بالمملكة، أحد مبادرات جمعية الكوثر الصحية لتعزيز كفاءة القطاع الثالث الصحي.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#006C35] transition-all cursor-pointer">
                <Search size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#006C35] transition-all cursor-pointer">
                <Users size={18} />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-8 border-r-4 border-[#006C35] pr-4">روابط سريعة</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><a href="https://www.alkawthar.org.sa/" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer transition-colors">عن جمعية الكوثر الصحية</a></li>
              <li onClick={() => setView('library')} className="hover:text-white cursor-pointer transition-colors">مكتبة المشاريع المنمذجة</li>
              <li onClick={() => setView('privacy-policy')} className="hover:text-white cursor-pointer transition-colors">سياسة الخصوصية والاستخدام</li>
              <li onClick={() => setView('beneficiary-charter')} className="hover:text-white cursor-pointer transition-colors">ميثاق حماية المستفيد</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-8 border-r-4 border-[#006C35] pr-4">الدعم والمساندة</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li onClick={() => setView('faq')} className="hover:text-white cursor-pointer transition-colors">الأسئلة الشائعة</li>
              <li onClick={() => setView('platform-guide')} className="hover:text-white cursor-pointer transition-colors">دليل استخدام المنصة</li>
              <li onClick={() => setView('report-complaint')} className="hover:text-white cursor-pointer transition-colors">تقديم بلاغ أو شكوى</li>
              <li onClick={() => setView('suggestions')} className="hover:text-white cursor-pointer transition-colors">الاقتراحات والتطوير</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-8 border-r-4 border-[#006C35] pr-4">تواصل معنا</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-[#006C35]" />
                <span>المملكة العربية السعودية، مدينة أبها</span>
              </li>
              <li className="flex items-center gap-3">
                <Info size={18} className="text-[#006C35]" />
                <span>الهاتف: 017 226 3300</span>
              </li>
              <li className="flex items-center gap-3">
                <FileText size={18} className="text-[#006C35]" />
                <span>info@alkawthar.org.sa</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
            <span>جميع الحقوق محفوظة © 2026 جمعية الكوثر الصحية</span>
          </div>
          <div className="flex items-center gap-6">
             <img src="/assets/alkawthar-horizontal-white-transparent.png" alt="الكوثر" className="h-12 opacity-80 hover:opacity-100 transition-all mix-blend-screen" />
          </div>
        </div>
      </div>
    </footer>
  </div>
);

  const RasikhLibrary = ({ setView }: { setView: (v: any) => void }) => {
  const projects = [
    {
      id: "soum-and-seha",
      title: "مشروع صوم وصحة",
      desc: "مبادرة صحية ميدانية تطوعية لتقديم الفحوصات والاستشارات الطبية خلال شهر رمضان المبارك لضيوف المملكة والمحتاجين.",
      image: "/assets/soum-seha-cover.png",
      category: "مبادرات رمضانية",
      phases: 5,
      tasks: 70,
      isAvailable: true
    },
    {
      id: "health-convoy",
      title: "القوافل الطبية للمناطق النائية",
      desc: "نموذج تشغيلي لإطلاق قوافل طبية متكاملة للمناطق الطرفية التي تفتقر للخدمات الطبية المتخصصة.",
      image: "https://images.unsplash.com/photo-1538108197017-c13d6c7739e6?auto=format&fit=crop&q=80&w=800",
      category: "قوافل طبية",
      phases: 6,
      tasks: 85,
      isAvailable: false
    },
    {
      id: "school-screening",
      title: "الفحص المدرسي الوقائي",
      desc: "مبادرة تهدف إلى إجراء فحوصات دورية لطلاب المدارس لاكتشاف مشكلات النظر والسمع والنمو في مراحلها المبكرة.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
      category: "صحة مدرسية",
      phases: 4,
      tasks: 45,
      isAvailable: false
    }
  ];

  return (
    <div className="bg-[#F9FBFA] min-h-screen pt-40 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-r-4 border-[#006C35] pr-6 pb-2">
          <div>
            <h2 className="text-4xl font-black text-[#1A1A1A] mb-2">مكتبة المشاريع المنمذجة</h2>
            <p className="text-slate-500 font-medium">تصفح واستفد من نماذج المشاريع الصحية الجاهزة للتنفيذ وفق المعايير الوطنية.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="ابحث عن نموذج مشروع..." 
              className="w-full pr-12 pl-4 py-3 rounded-lg bg-white border border-slate-200 focus:ring-2 focus:ring-[#006C35]/20 focus:border-[#006C35] outline-none font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#006C35] transition-all flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#006C35] rounded-md text-[10px] font-bold text-white uppercase tracking-widest">
                  {project.category}
                </div>
                {!project.isAvailable && (
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="px-4 py-2 bg-[#1A1A1A] text-white text-[10px] font-bold rounded-md uppercase tracking-[0.2em]">قريباً في المنصة</span>
                  </div>
                )}
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#006C35] transition-colors">{project.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1 font-medium">{project.desc}</p>
                
                <div className="flex items-center gap-6 mb-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-50 pt-6">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-[#006C35]" />
                    <span>{project.phases} مراحل</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClipboardCheck size={16} className="text-[#006C35]" />
                    <span>{project.tasks} مهمة</span>
                  </div>
                </div>

                <Button 
                  disabled={!project.isAvailable} 
                  onClick={() => setView('home')} 
                  className={`w-full py-4 text-sm font-bold rounded-lg transition-all ${
                    project.isAvailable 
                      ? 'bg-[#006C35] hover:bg-[#005429] text-white' 
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {project.isAvailable ? "استعراض النموذج التشغيلي" : "جاري العمل على النمذجة"}
                  <ChevronLeft size={18} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'landing' | 'library' | 'home' | 'setup' | 'team' | 'dashboard' | 'phases' | 'task-detail' | 'templates' | 'team-structure' | 'member-tasks' | 'project-book' | 'site-layout' | 'journeys' | 'privacy-policy' | 'beneficiary-charter' | 'faq' | 'platform-guide' | 'report-complaint' | 'suggestions'>('landing');

  const StaticPageView = ({ title, content }: { title: string, content: React.ReactNode }) => (
    <div className="bg-[#F9FBFA] min-h-screen pt-40 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-[#006C35] text-white p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <h1 className="text-4xl font-black relative z-10">{title}</h1>
          </div>
          <div className="p-12 prose prose-slate max-w-none prose-headings:text-[#1A1A1A] prose-headings:font-bold prose-p:text-slate-600 prose-p:leading-relaxed">
            {content}
          </div>
          <div className="p-8 border-t border-slate-100 bg-slate-50 flex justify-center">
            <Button onClick={() => setView('landing')} className="bg-[#006C35] hover:bg-[#005429]">
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const getPageContent = (pageView: string) => {
    switch (pageView) {
      case 'privacy-policy':
        return {
          title: 'سياسة الخصوصية والاستخدام',
          content: (
            <div className="space-y-6 text-right">
              <p>تلتزم جمعية الكوثر الصحية بحماية خصوصية بياناتك الشخصية وضمان أمنها. توضح هذه السياسة كيفية جمعنا للمعلومات واستخدامها عند استخدامك لمنصة "راسخ".</p>
              <h3 className="text-xl font-bold">١. جمع المعلومات</h3>
              <p>نقوم بجمع المعلومات اللازمة فقط لنمذجة المشاريع وتقديم الخدمات الصحية بكفاءة، وتشمل بيانات المبادرات والفرق المسؤولة والشواهد التشغيلية.</p>
              <h3 className="text-xl font-bold">٢. استخدام المعلومات</h3>
              <p>تُستخدم البيانات المسجلة لغرض تحسين جودة المبادرات الصحية، وتوليد التقارير الختامية، وقياس الأثر الصحي والمجتمعي للمشاريع.</p>
              <h3 className="text-xl font-bold">٣. أمن البيانات</h3>
              <p>نطبق معايير تقنية عالية لحماية البيانات من الوصول غير المصرح به أو التعديل أو الإفصاح.</p>
            </div>
          )
        };
      case 'beneficiary-charter':
        return {
          title: 'ميثاق حماية المستفيد',
          content: (
            <div className="space-y-6 text-right">
              <p>يعد المستفيد هو المحور الأساسي لكافة مشاريعنا المنمذجة، ونلتزم بمجموعة من المبادئ لضمان كرامته وحقوقه.</p>
              <h3 className="text-xl font-bold">١. الحق في الرعاية</h3>
              <p>لكل مستفيد الحق في الحصول على رعاية صحية ذات جودة عالية دون تمييز.</p>
              <h3 className="text-xl font-bold">٢. الخصوصية والسرية</h3>
              <p>نلتزم بالحفاظ على سرية المعلومات الطبية والشخصية للمستفيد في جميع مراحل تنفيذ المشروع.</p>
              <h3 className="text-xl font-bold">٣. التعامل الإنساني</h3>
              <p>نؤكد على ضرورة تعامل الفرق التطوعية مع المستفيدين برحمة وتواضع واحترام كامل للعادات والتقاليد.</p>
            </div>
          )
        };
      case 'faq':
        return {
          title: 'الأسئلة الشائعة',
          content: (
            <div className="space-y-8 text-right">
              <div>
                <h4 className="font-bold text-[#006C35]">ما هي منصة راسخ؟</h4>
                <p>هي منصة رقمية لنمذجة المشاريع الصحية تهدف لتوحيد المعايير وتسهيل تكرار المبادرات الناجحة في مختلف المناطق.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#006C35]">هل يمكنني إضافة مشروع جديد؟</h4>
                <p>حالياً نقوم بنمذجة المشاريع النوعية لجمعية الكوثر، وسيكون متاحاً مستقبلاً للجهات الشريكة إضافة مبادراتها.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#006C35]">كيف أحصل على النماذج؟</h4>
                <p>يمكنك تحميل كافة النماذج التشغيلية مباشرة من "مكتبة النماذج" بعد اختيار المشروع المراد تنفيذه.</p>
              </div>
            </div>
          )
        };
      case 'platform-guide':
        return {
          title: 'دليل استخدام المنصة',
          content: (
            <div className="space-y-6 text-right">
              <p>يوفر هذا الدليل الخطوات الأساسية للاستفادة القصوى من أدوات راسخ الرقمية.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <h4 className="font-bold mb-2">١. اختيار المشروع</h4>
                  <p className="text-sm">تصفح مكتبة المشاريع واختر النموذج المناسب لاحتياج جهتك.</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <h4 className="font-bold mb-2">٢. إعداد البيانات</h4>
                  <p className="text-sm">قم بتعبئة بيانات المبادرة الخاصة بك وتشكيل فريق العمل التنفيذي.</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <h4 className="font-bold mb-2">٣. تتبع التنفيذ</h4>
                  <p className="text-sm">استخدم لوحة التحكم لمتابعة إنجاز المهام ورفع شواهد التنفيذ.</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <h4 className="font-bold mb-2">٤. توليد التقارير</h4>
                  <p className="text-sm">عند الانتهاء، سيقوم النظام بتوليد تقرير ختامي شامل ومصمم تلقائياً.</p>
                </div>
              </div>
            </div>
          )
        };
      case 'report-complaint':
        return {
          title: 'تقديم بلاغ أو شكوى',
          content: (
            <div className="space-y-6 text-right">
              <p>نحرص في جمعية الكوثر الصحية على الاستماع لملاحظاتكم لمعالجة أي قصور وتطوير خدماتنا.</p>
              <Card className="p-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">نوع البلاغ</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#006C35]/20">
                      <option>شكوى تقنية</option>
                      <option>ملاحظة على جودة النموذج</option>
                      <option>اقتراح تطويري</option>
                      <option>أخرى</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">تفاصيل البلاغ</label>
                    <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#006C35]/20" placeholder="يرجى وصف المشكلة بوضوح..."></textarea>
                  </div>
                  <Button className="w-full bg-[#006C35]">إرسال البلاغ</Button>
                </div>
              </Card>
            </div>
          )
        };
      case 'suggestions':
        return {
          title: 'الاقتراحات والتطوير',
          content: (
            <div className="space-y-6 text-right">
              <p>نؤمن بأن المشاركة المجتمعية هي أساس نجاح النمذجة. نسعد باستلام اقتراحاتكم لتطوير منصة راسخ.</p>
              <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                  <Zap size={24} />
                </div>
                <p className="text-sm text-blue-800">اقتراحاتكم اليوم هي ميزات نظام راسخ في الغد. نحن نراجع جميع الاقتراحات بجدية تامة.</p>
              </div>
              <textarea rows={6} className="w-full px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="ما هي الميزة التي تود رؤيتها في الإصدار القادم؟"></textarea>
              <Button className="w-full bg-[#1A1A1A] hover:bg-slate-800">تقديم الاقتراح</Button>
            </div>
          )
        };
      default:
        return { title: 'صفحة غير موجودة', content: <p>عذراً، هذه الصفحة غير متوفرة حالياً.</p> };
    }
  };
  const [selectedMemberRole, setSelectedMemberRole] = useState<Role | null>(null);
  const [selectedTaskIdForBook, setSelectedTaskIdForBook] = useState<string | null>(null);
  const [data, setData] = useState<InitiativeData>(() => {
    const saved = localStorage.getItem('initiative_data');
    const defaultData: InitiativeData = {
      charityName: '',
      city: '',
      startDate: '',
      durationDays: 30,
      team: ROLES.reduce((acc, role) => ({ ...acc, [role]: '' }), {} as Record<Role, string>),
      completedTasks: [],
      taskEvidence: {},
      isInitialized: false
    };

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with defaults to ensure all fields exist even if loading old data
        return { ...defaultData, ...parsed };
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    return defaultData;
  });

  const [selectedPhaseId, setSelectedPhaseId] = useState<number | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('initiative_data', JSON.stringify(data));
  }, [data]);

  const phases = useMemo(() => INITIAL_PHASES, []);

  const getPhaseProgress = (phase: Phase) => {
    const completedInPhase = phase.tasks.filter(t => data.completedTasks.includes(t.id)).length;
    return Math.round((completedInPhase / phase.tasks.length) * 100);
  };

  const totalProgress = useMemo(() => {
    const allTasks = phases.flatMap(p => p.tasks);
    if (allTasks.length === 0) return 0;
    return Math.round((data.completedTasks.length / allTasks.length) * 100);
  }, [data.completedTasks, phases]);

  const completedCount = data.completedTasks.length;
  const remainingCount = phases.flatMap(p => p.tasks).length - completedCount;

  const currentPhase = useMemo(() => {
    for (const phase of phases) {
      if (getPhaseProgress(phase) < 100) return phase;
    }
    return phases[phases.length - 1];
  }, [phases, data.completedTasks]);

  const nextTask = useMemo(() => {
    const allTasks = phases.flatMap(p => p.tasks);
    return allTasks.find(t => !data.completedTasks.includes(t.id));
  }, [phases, data.completedTasks]);

  const isPhaseUnlocked = (phaseId: number) => {
    if (phaseId === 1) return true;
    const prevPhase = phases.find(p => p.id === phaseId - 1);
    return prevPhase ? getPhaseProgress(prevPhase) === 100 : false;
  };

  const toggleTask = (taskId: string, evidence?: string) => {
    setData(prev => {
      const completedTasks = prev.completedTasks || [];
      const taskEvidence = prev.taskEvidence || {};
      
      const isCompleted = completedTasks.includes(taskId);
      const newCompleted = isCompleted 
        ? completedTasks.filter(id => id !== taskId)
        : [...completedTasks, taskId];
      
      const newEvidence = { ...taskEvidence };
      if (evidence) {
        newEvidence[taskId] = evidence;
      } else if (isCompleted) {
        delete newEvidence[taskId];
      }
      
      return { ...prev, completedTasks: newCompleted, taskEvidence: newEvidence };
    });
  };

  const allTasksCompleted = remainingCount === 0;

  const escapeHtml = (s: string) => String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const getFinalReportHtml = (includePrintButton: boolean) => {
    const esc = escapeHtml;
    const printBtn = includePrintButton ? `
  <div class="no-print" style="margin-bottom:1.5rem;">
    <button onclick="window.print()" style="padding:0.75rem 1.5rem;background:#059669;color:white;border:none;border-radius:0.75rem;cursor:pointer;font-weight:bold;font-size:1rem;">طباعة التقرير</button>
  </div>` : '';
    return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <title>التقرير الختامي الرسمي - مبادرة صوم وصحة - ${esc(data.charityName)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Tahoma, 'Arabic UI Display', sans-serif; color: #1e293b; line-height: 1.6; }
    .container { max-width: 900px; margin: 0 auto; }
    .cover { background: #059669; color: white; padding: 4rem 3rem; text-align: center; min-height: 500px; display: flex; flex-direction: column; justify-content: center; }
    .cover-subtitle { font-size: 0.9rem; font-weight: 700; letter-spacing: 0.2em; color: rgba(255,255,255,0.9); margin-bottom: 1.5rem; }
    .cover-title { font-size: 3rem; font-weight: 900; margin-bottom: 1.5rem; line-height: 1.2; }
    .cover-line { height: 4px; width: 8rem; background: rgba(255,255,255,0.3); margin: 0 auto 1.5rem; }
    .cover-desc { font-size: 1.25rem; color: rgba(255,255,255,0.9); max-width: 32rem; margin: 0 auto; }
    .cover-date { margin-top: 3rem; font-size: 0.9rem; color: rgba(255,255,255,0.7); }
    .content { padding: 3rem 2rem; }
    .section-title { font-size: 1.5rem; font-weight: 700; color: #047857; border-right: 4px solid #059669; padding-right: 1rem; margin: 2.5rem 0 1.5rem; display: flex; align-items: center; gap: 1rem; }
    .section-num { font-size: 2.5rem; font-weight: 900; color: #d1fae5; user-select: none; line-height: 1; }
    .meta-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin: 1.5rem 0; }
    .meta-card { padding: 1.5rem; text-align: center; border: 1px solid #e2e8f0; border-radius: 1rem; background: #f8fafc; }
    .meta-label { font-size: 0.75rem; color: #64748b; margin-bottom: 0.5rem; }
    .meta-value { font-weight: 700; color: #0f172a; }
    .phase-block { margin: 2rem 0; }
    .phase-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1rem; }
    .phase-num { font-size: 3rem; font-weight: 900; color: #d1fae5; user-select: none; line-height: 1; }
    .phase-num-inner { font-size: 1.25rem; font-weight: 700; color: #0f172a; }
    .task-card { background: white; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.5rem; margin: 0.75rem 0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .task-title { font-weight: 700; color: #0f172a; font-size: 1rem; margin-bottom: 0.5rem; }
    .task-role { font-size: 0.85rem; color: #64748b; margin-bottom: 0.75rem; }
    .evidence-label { font-size: 0.75rem; font-weight: 700; color: #059669; margin-bottom: 0.5rem; }
    .task-evidence { background: #f8fafc; border-right: 4px solid #059669; padding: 1rem; font-size: 0.9rem; color: #334155; border-radius: 0 0.5rem 0.5rem 0; }
    .task-evidence.no-evidence { border-right-color: #cbd5e1; color: #94a3b8; font-style: italic; }
    .footer { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0; font-size: 0.85rem; color: #64748b; display: flex; justify-content: space-between; }
    @media print { .no-print { display: none !important; } .content { padding: 1rem; } .cover { min-height: 400px; } }
    @media (max-width: 640px) { .meta-grid { grid-template-columns: 1fr 1fr; } }
  </style>
</head>
<body>
${printBtn}
<div class="cover">
  <div class="container">
    <div class="cover-subtitle">وثيقة التقرير الختامي الرسمي</div>
    <h1 class="cover-title">${esc(data.charityName)}</h1>
    <div class="cover-line"></div>
    <p class="cover-desc">تقرير إنجاز مبادرة "صوم وصحة"<br>يتضمن حصراً للمهام المنفذة والشواهد الإثباتية<br>في نطاق مدينة ${esc(data.city)}</p>
    <div class="cover-date">تاريخ الإصدار: ${new Date().toLocaleDateString('ar-SA')}</div>
  </div>
</div>
<div class="content container">
  <p style="margin-bottom:2rem;padding:1.25rem;background:#f0fdf4;border:1px solid #a7f3d0;border-radius:1rem;color:#065f46;font-size:0.95rem;line-height:1.8;">
    <strong>مقدمة:</strong> يُقدّم هذا التقرير حصيلة تنفيذ مبادرة "صوم وصحة" الصحية الميدانية، ويتضمن توثيقاً شاملاً لجميع المهام التي تم إنجازها وفق الخطة المعتمدة، مع ربط كل مهمة بالشواهد الإثباتية المرافقة لها، وذلك تماشياً مع معايير الشفافية والمساءلة في العمل الخيري والتطوعي.
  </p>
  <h2 class="section-title"><span class="section-num">01</span> الإطار العام للمبادرة</h2>
  <p style="margin-bottom:1.5rem;color:#475569;font-size:0.95rem;line-height:1.7;">يستعرض هذا القسم البيانات الأساسية للمبادرة الصحية الميدانية، بما في ذلك الجهة المنظمة ونطاق التنفيذ الجغرافي والزمني.</p>
  <div class="meta-grid">
    <div class="meta-card"><div class="meta-label">الجهة المنظمة</div><div class="meta-value">${esc(data.charityName)}</div></div>
    <div class="meta-card"><div class="meta-label">الموقع الجغرافي</div><div class="meta-value">${esc(data.city)}</div></div>
    <div class="meta-card"><div class="meta-label">تاريخ انطلاق المبادرة</div><div class="meta-value">${data.startDate ? new Date(data.startDate).toLocaleDateString('ar-SA') : '—'}</div></div>
    <div class="meta-card"><div class="meta-label">المدة الزمنية</div><div class="meta-value">${data.durationDays} يوم</div></div>
  </div>

  <h2 class="section-title"><span class="section-num">02</span> حصر المهام المنفذة والشواهد الإثباتية</h2>
  <p style="margin-bottom:1.5rem;color:#475569;font-size:0.95rem;line-height:1.7;">يتضمن هذا القسم تفصيلاً لجميع المهام التي تم إنجازها ضمن مراحل المبادرة، مع توثيق الشواهد الإثباتية المرتبطة بكل مهمة.</p>
  ${phases.map(phase => {
    const completedTasks = phase.tasks.filter(t => data.completedTasks.includes(t.id));
    if (completedTasks.length === 0) return '';
    return `
  <div class="phase-block">
    <div class="phase-header">
      <div class="phase-num">0${phase.id}</div>
      <div>
        <div class="phase-num-inner">${esc(phase.title)}</div>
        <p style="font-size:0.9rem;color:#64748b;margin-top:0.25rem;">${esc(phase.goal || '')}</p>
      </div>
    </div>
    ${completedTasks.map(task => {
      const evidence = data.taskEvidence[task.id] || '';
      const responsible = data.team[task.role] || task.role;
      return `
    <div class="task-card">
      <div class="task-title">${esc(task.title)}</div>
      <div class="task-role">المكلف بالتنفيذ: ${esc(responsible)}</div>
      <div class="evidence-label">الشاهد الإثباتي</div>
      <div class="task-evidence ${!evidence ? 'no-evidence' : ''}">${esc(evidence || 'لم يتم توثيق إثبات التنفيذ')}</div>
    </div>`;
    }).join('')}
  </div>`;
  }).join('')}

  <div class="footer">
    <span>تم إعداد هذا التقرير تلقائياً من نظام إدارة مبادرة "صوم وصحة" — الإصدار 1.0</span>
    <span>تاريخ ووقت الإصدار: ${new Date().toLocaleString('ar-SA')}</span>
  </div>
</div>
</body>
</html>`;
  };

  const generateFinalReport = () => {
    const reportHtml = getFinalReportHtml(false);
    const blob = new Blob([reportHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `تقرير-ختامي-${data.charityName.replace(/\s/g, '-')}-${new Date().toISOString().slice(0, 10)}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openFinalReportForPrint = () => {
    const reportHtml = getFinalReportHtml(true);
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(reportHtml);
      win.document.close();
    }
  };

  // --- Views ---

  const HomeView = () => (
    <div className="max-w-4xl mx-auto text-center py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-12 relative inline-block">
          <div className="w-32 h-32 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center mx-auto relative z-10 p-6 overflow-hidden">
            <img src="/assets/alkawthar-logo.png" alt="صوم وصحة" className="w-full h-full object-contain" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#006C35] rounded-lg flex items-center justify-center text-white shadow-lg border-4 border-[#F9FBFA] z-20">
            <ClipboardCheck size={20} />
          </div>
        </div>
        
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#006C35] text-[10px] font-bold border border-emerald-100 mb-4 tracking-widest uppercase">
            <span>تمت النمذجة بواسطة جمعية الكوثر الصحية</span>
          </div>
          <h1 className="text-5xl font-black text-[#1A1A1A] mb-4 tracking-tight">مشروع صوم وصحة</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            الدليل التشغيلي المتكامل لمبادرة صوم وصحة، صُمم هذا النموذج ليساعدك على تنفيذ المبادرة باحترافية كاملة من التخطيط المسبق وحتى التقرير الختامي.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { label: "مراحل التنفيذ", value: "05", icon: Layers, color: "#006C35" },
            { label: "إجمالي المهام", value: "70", icon: ClipboardCheck, color: "#006C35" },
            { label: "النماذج المتاحة", value: "30", icon: FileText, color: "#006C35" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#006C35] flex items-center justify-center mb-3">
                <stat.icon size={20} />
              </div>
              <span className="text-3xl font-black text-[#1A1A1A]">{stat.value}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={() => setView(data.isInitialized ? 'dashboard' : 'setup')} className="w-full sm:w-auto px-12 py-5 bg-[#006C35] hover:bg-[#005429] text-white rounded-lg font-bold text-lg shadow-xl shadow-emerald-900/10">
            {data.isInitialized ? "متابعة التنفيذ" : "بدء تنفيذ المشروع"}
            <ChevronLeft size={20} />
          </Button>
          <Button variant="outline" onClick={() => setView('project-book')} className="w-full sm:w-auto px-10 py-5 border-2 border-[#006C35] text-[#006C35] hover:bg-emerald-50 rounded-lg font-bold text-lg bg-white">
            <BookOpen size={20} className="ml-2" />
            استعراض الدليل التشغيلي
          </Button>
        </div>

        <div className="mt-20 pt-12 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-12 text-right">
          <div className="border-r-4 border-[#006C35] pr-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <Info size={20} className="text-[#006C35]" />
              حول المشروع
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              مشروع صوم وصحة هو مبادرة تطوعية تهدف لتقديم رعاية صحية ميدانية ميسرة خلال شهر رمضان المبارك، مع التركيز على الفحوصات الأساسية (ضغط، سكر، وزن) والاستشارات الطبية المتخصصة لضيوف المملكة والمحتاجين.
            </p>
          </div>
          <div className="border-r-4 border-[#006C35] pr-6">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <Zap size={20} className="text-[#006C35]" />
              أهداف النمذجة
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              نهدف من خلال هذا النموذج إلى ضمان تكرار المبادرة في مواقع جغرافية مختلفة بنفس مستوى الجودة، مع توحيد الإجراءات التشغيلية والنماذج المستخدمة وتسهيل عملية قياس الأثر النهائي للمبادرة.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const SetupView = () => {
    const [localData, setLocalData] = useState({
      charityName: data.charityName,
      city: data.city,
      startDate: data.startDate,
      durationDays: data.durationDays
    });

    const handleSave = () => {
      setData(prev => ({ ...prev, ...localData, isInitialized: true }));
      setView('team');
    };

    return (
      <div className="max-w-xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-8">إدخال بيانات المبادرة</h2>
        <Card className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">اسم الجمعية</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              value={localData.charityName}
              onChange={e => setLocalData({ ...localData, charityName: e.target.value })}
              placeholder="مثال: جمعية البر الخيرية"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">المدينة</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              value={localData.city}
              onChange={e => setLocalData({ ...localData, city: e.target.value })}
              placeholder="مثال: الرياض"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">تاريخ بدء المبادرة</label>
            <input 
              type="date" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              value={localData.startDate}
              onChange={e => setLocalData({ ...localData, startDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">عدد الأيام المخطط للتنفيذ</label>
            <input 
              type="number" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              value={localData.durationDays}
              onChange={e => setLocalData({ ...localData, durationDays: parseInt(e.target.value) || 0 })}
            />
          </div>
          <Button onClick={handleSave} className="w-full py-4">إنشاء المبادرة</Button>
        </Card>
      </div>
    );
  };

  const TeamView = () => {
    const [localTeam, setLocalTeam] = useState(data.team);

    const handleSave = () => {
      setData(prev => ({ ...prev, team: localTeam }));
      setView('team-structure');
    };

    return (
      <div className="max-w-2xl mx-auto py-12 px-6">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setView('team-structure')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowRight size={24} />
          </button>
          <h2 className="text-2xl font-bold">تعديل بيانات الفريق</h2>
        </div>
        <Card className="space-y-6">
          {ROLES.map(role => (
            <div key={role}>
              <label className="block text-sm font-medium text-slate-700 mb-2">{role}</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                value={localTeam[role]}
                onChange={e => setLocalTeam({ ...localTeam, [role]: e.target.value })}
                placeholder="اسم المسؤول"
              />
            </div>
          ))}
          <Button onClick={handleSave} className="w-full py-4">حفظ البيانات</Button>
        </Card>
      </div>
    );
  };

  const ProjectBookView = () => {
    const [selectedRoleDetails, setSelectedRoleDetails] = useState<Role | null>(null);

    useEffect(() => {
      if (selectedTaskIdForBook) {
        const el = document.getElementById(`task-${selectedTaskIdForBook}`);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
          setTimeout(() => setSelectedTaskIdForBook(null), 2000);
        }
      }
    }, [selectedTaskIdForBook]);

    const roleTasks = useMemo(() => {
      if (!selectedRoleDetails) return [];
      return INITIAL_PHASES.flatMap(p => p.tasks.map(t => ({ ...t, phaseId: p.id, phaseTitle: p.title })))
        .filter(t => t.role === selectedRoleDetails);
    }, [selectedRoleDetails]);

    return (
      <div className="max-w-4xl mx-auto py-12 px-6">
        <style>{`
          @media print {
            .no-print { display: none !important; }
            body { background: white !important; }
            .shadow-xl { box-shadow: none !important; }
            .rounded-3xl { border-radius: 0 !important; }
            .border { border: none !important; }
            
            @page {
              size: A4;
              margin: 20mm 15mm 20mm 15mm;
            }
          }
        `}</style>
        <AnimatePresence>
          {selectedRoleDetails && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 no-print">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedRoleDetails(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="p-8 bg-emerald-600 text-white flex justify-between items-center shrink-0">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-emerald-100 mb-1">بطاقة مسؤوليات المنصب</div>
                    <h3 className="text-2xl font-bold">{selectedRoleDetails}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedRoleDetails(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <ArrowLeft size={24} />
                  </button>
                </div>
                
                <div className="p-8 overflow-y-auto space-y-8">
                  <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                      <Users size={24} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase">المسؤول الحالي</div>
                      <div className="text-lg font-bold text-slate-900">{data.team[selectedRoleDetails] || 'لم يتم التعيين بعد'}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <ClipboardCheck size={20} className="text-emerald-500" />
                      المهام والمسؤوليات عبر المراحل
                    </h4>
                    <div className="space-y-3">
                      {roleTasks.length > 0 ? (
                        roleTasks.map((task, idx) => (
                          <div key={task.id} className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                            <div className="text-xs font-bold text-slate-300 mt-1">{idx + 1}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-bold text-slate-800 text-sm">{task.title}</h5>
                                <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-bold">المرحلة {task.phaseId}</span>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed">{task.description}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-slate-400 italic">لا توجد مهام مسندة لهذا المنصب حالياً.</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                  <Button onClick={() => setSelectedRoleDetails(null)} className="px-8">إغلاق</Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4 mb-8 no-print">
          <button onClick={() => setView('dashboard')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowRight size={24} />
          </button>
          <h2 className="text-2xl font-bold">كتاب نمذجة المبادرة</h2>
          <Button variant="outline" onClick={() => {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
              const content = document.querySelector('.print-content');
              if (content) {
                printWindow.document.write(`
                  <!DOCTYPE html>
                  <html dir="rtl" lang="ar">
                  <head>
                    <meta charset="UTF-8">
                    <title>الدليل التشغيلي - ${data.charityName || 'مشروع صوم وصحة'}</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <style>
                      @media print {
                        .no-print { display: none !important; }
                        body { background: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                        
                        @page {
                          size: A4;
                          margin: 15mm 15mm 15mm 15mm;
                          @bottom-right {
                            content: "مشروع صوم وصحة";
                            font-size: 10px;
                            color: #006C35;
                            font-weight: bold;
                            font-family: system-ui, -apple-system, sans-serif;
                          }
                          @bottom-center {
                            content: "__________________________________________________";
                            font-size: 10px;
                            color: #006C35;
                            letter-spacing: 2px;
                          }
                          @bottom-left {
                            content: counter(page);
                            font-size: 10px;
                            color: #64748b;
                            font-family: system-ui, -apple-system, sans-serif;
                          }
                        }
                      }
                      @page { size: A4; margin: 15mm 15mm 15mm 15mm; }
                      body { font-family: system-ui, -apple-system, sans-serif; }
                      
                      /* Running footer for preview */
                      .running-footer {
                        position: fixed;
                        bottom: 0;
                        left: 15mm;
                        right: 15mm;
                        height: 12mm;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        background: white;
                        z-index: 1000;
                        font-size: 10px;
                        padding: 0;
                      }
                      .footer-project {
                        color: #006C35;
                        font-weight: bold;
                      }
                      .footer-line {
                        flex: 1;
                        border-bottom: 1px solid #006C35;
                        margin: 0 5mm;
                        height: 1px;
                      }
                      .footer-page {
                        color: #64748b;
                        min-width: 20px;
                      }
                      .content-wrapper {
                        margin-bottom: 12mm;
                      }
                      @media print {
                        .running-footer { display: none !important; }
                      }
                    </style>
                  </head>
                  <body class="bg-white">
                    <div class="running-footer">
                      <div class="footer-project">مشروع صوم وصحة</div>
                      <div class="footer-line"></div>
                      <div class="footer-page"></div>
                    </div>
                    <div class="content-wrapper">
                      ${content.innerHTML}
                    </div>
                    <script>
                      window.onload = () => {
                        const footerPages = document.querySelectorAll('.footer-page');
                        const totalPages = Math.ceil(document.body.scrollHeight / 297);
                        footerPages.forEach((el) => {
                          el.textContent = '1';
                        });
                        setTimeout(() => window.print(), 500);
                      }
                    </script>
                  </body>
                  </html>
                `);
                printWindow.document.close();
              }
            }
          }} className="mr-auto gap-2">
            <FileText size={18} />
            طباعة / حفظ PDF
          </Button>
        </div>

        <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-slate-200 print:shadow-none print:border-none print-content">
          {/* Cover Page */}
          <div className="bg-emerald-600 text-white p-24 text-center min-h-[600px] flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <img src="/assets/alkawthar-logo.png" alt="الكوثر" className="h-24 mb-12 brightness-0 invert opacity-90" />
            <div className="text-emerald-200 font-bold uppercase tracking-[0.2em] mb-4 text-sm">وثيقة نمذجة المشروع الاستراتيجية</div>
            <h1 className="text-5xl md:text-7xl font-black mb-12 leading-tight tracking-tight">مشروع صوم وصحة</h1>
            <div className="h-2 w-24 bg-white/30 mb-12 rounded-full" />
            <p className="text-2xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
              الدليل التشغيلي المتكامل للمبادرة الصحية الميدانية
              <br />
              بواسطة {data.charityName || "جمعية الكوثر الصحية"} بمدينة {data.city}
            </p>
            <div className="mt-24 flex items-center gap-8 text-emerald-200/60 text-sm font-bold uppercase tracking-widest">
              <span>نظام راسخ للنمذجة</span>
              <div className="w-1 h-1 bg-emerald-300 rounded-full" />
              <span>{new Date(data.startDate).toLocaleDateString('ar-SA')}</span>
            </div>
          </div>

          <div className="p-16 space-y-24">
            {/* Table of Contents */}
            <section id="toc" className="break-after-page">
              <h3 className="text-3xl font-bold text-emerald-700 mb-8 text-center">فهرس المحتويات</h3>
              <p className="text-center text-slate-500 mb-12 text-sm">الجزء الأول: الإطار العام والاستراتيجي للمبادرة</p>
              <div className="space-y-8 max-w-2xl mx-auto">
                {PART1_CHAPTERS.map((chapter, chIdx) => (
                  <div key={chapter.id} className="space-y-3">
                    <button
                      type="button"
                      onClick={() => document.getElementById(chapter.id)?.scrollIntoView({ behavior: 'smooth' })}
                      className="w-full text-right font-bold text-emerald-800 hover:text-emerald-600 transition-colors print:pointer-events-none"
                    >
                      الفصل {chIdx + 1}: {chapter.title}
                    </button>
                    <div className="mr-4 space-y-2">
                      {chapter.sections.map((section, sIdx) => (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                          className="w-full flex items-center justify-between border-b border-slate-100 pb-2 hover:border-emerald-200 transition-colors print:pointer-events-none"
                        >
                          <span className="text-sm font-medium text-slate-600 hover:text-emerald-600">{chIdx + 1}.{sIdx + 1} {section.title}</span>
                          <span className="text-slate-300">....................</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Part 1: الإطار العام والاستراتيجي للمبادرة */}
            {PART1_CHAPTERS.map((chapter, chIdx) => (
              <section
                key={chapter.id}
                id={chapter.id}
                className={chIdx > 0 ? 'break-before-page' : ''}
              >
                <h3 className="text-2xl font-bold text-emerald-700 mb-10 border-r-4 border-emerald-500 pr-4">
                  الفصل {chIdx + 1}: {chapter.title}
                </h3>
                <div className="space-y-12">
                  {chapter.sections.map((section, sIdx) => (
                    <div
                      key={section.id}
                      id={section.id}
                      className="p-8 bg-slate-50/50 rounded-3xl border border-slate-100"
                    >
                      <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        {chIdx + 1}.{sIdx + 1} {section.title}
                      </h4>
                      <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                        {section.getContent(data)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* ملحق تشغيلي: بطاقات تفاصيل المهام */}
            <section id="appendix-tasks" className="break-before-page">
              <h3 className="text-2xl font-bold text-emerald-700 mb-12 border-r-4 border-emerald-500 pr-4">ملحق: بطاقات تفاصيل المهام التشغيلية</h3>
              <div className="space-y-24">
                {INITIAL_PHASES.map((phase, pIdx) => (
                  <div key={phase.id} className="page-break-inside-avoid">
                    {/* Phase Header */}
                    <div className="flex items-center gap-6 mb-12">
                      <div className="text-5xl font-black text-emerald-100 select-none">0{pIdx + 1}</div>
                      <div>
                        <h4 className="font-bold text-2xl text-slate-800">{phase.title}</h4>
                        <p className="text-sm text-slate-400 mt-1">{phase.goal}</p>
                      </div>
                    </div>
                    
                    {/* Tasks Timeline */}
                    <div className="mr-8 pr-12 border-r border-slate-100 space-y-12">
                      {(() => {
                        const groupedTasks: (Task | Task[])[] = [];
                        let currentParallelGroup: Task[] = [];

                        phase.tasks.forEach(task => {
                          if (task.parallel) {
                            currentParallelGroup.push(task);
                          } else {
                            if (currentParallelGroup.length > 0) {
                              groupedTasks.push([...currentParallelGroup]);
                              currentParallelGroup = [];
                            }
                            groupedTasks.push(task);
                          }
                        });
                        if (currentParallelGroup.length > 0) {
                          groupedTasks.push([...currentParallelGroup]);
                        }

                        return groupedTasks.map((group, gIdx) => {
                          const isParallel = Array.isArray(group);
                          const tasks = isParallel ? group : [group];

                          return (
                            <div key={gIdx} className="relative">
                              {/* Connector Dot */}
                              <div className={`absolute -right-[53px] top-4 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm ${isParallel ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                              
                              {isParallel && (
                                <div className="flex items-center gap-2 mb-4">
                                  <div className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-bold rounded uppercase tracking-widest border border-blue-100">مسار تنفيذ متوازي</div>
                                  <div className="h-px flex-1 bg-blue-50" />
                                </div>
                              )}

                              <div className={`grid gap-6 ${isParallel ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                {tasks.map((task) => (
                                  <div key={task.id} id={`task-${task.id}`} className={`group bg-white rounded-2xl border border-slate-100 p-8 transition-all hover:border-emerald-200 ${isParallel ? 'shadow-sm' : ''} ${selectedTaskIdForBook === task.id ? 'ring-2 ring-emerald-500' : ''}`}>
                                    {/* Task Header */}
                                    <div className="flex items-start justify-between mb-6">
                                      <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs font-mono text-slate-400">T-{task.id.padStart(3, '0')}</span>
                                          <h5 className="font-bold text-xl text-slate-900">{task.title}</h5>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Users size={14} className="text-emerald-500" />
                                          <span className="text-xs font-bold text-slate-500">{data.team[task.role] || task.role}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="space-y-8">
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">الهدف التشغيلي</span>
                                          <p className="text-sm text-slate-700 leading-relaxed">{task.goal || "تحقيق مستهدفات المرحلة."}</p>
                                        </div>
                                        <div className="space-y-2">
                                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">الأثر المتوقع</span>
                                          <p className="text-sm text-slate-700 leading-relaxed">{task.impact || "تحسين جودة الخدمة."}</p>
                                        </div>
                                      </div>

                                      <div className="space-y-2">
                                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">الشرح الإجرائي لتنفيذ المهمة</span>
                                        <p className="text-sm text-slate-700 leading-relaxed bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                                          {task.procedureGuide || task.method || `يقوم (${task.role}) بـ ${task.description}${task.templateId ? ` باستخدام ${TEMPLATES.find(t => t.id === task.templateId)?.name}` : ''}.`}
                                        </p>
                                      </div>

                                      <div className="pt-6 border-t border-slate-50 grid grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                          <span className="text-[10px] font-bold text-slate-300 uppercase">المعيار المرتبط</span>
                                          <div className="text-xs font-medium text-slate-600">{task.standard || "معيار الجودة العام"}</div>
                                        </div>
                                        <div className="space-y-1">
                                          <span className="text-[10px] font-bold text-slate-300 uppercase">مؤشر الإنجاز</span>
                                          <div className="text-xs font-medium text-slate-600">{task.indicator || "نسبة الإنجاز"}</div>
                                        </div>
                                      </div>

                                      {(task.alerts || task.templateId) && (
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50/50">
                                          {task.alerts ? (
                                            <div className="flex items-center gap-2 text-xs text-amber-700 font-medium bg-amber-50 px-3 py-1.5 rounded-lg">
                                              <AlertCircle size={14} />
                                              <span>{task.alerts}</span>
                                            </div>
                                          ) : <div />}
                                          {task.templateId && (
                                            <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg">
                                              <FileText size={14} />
                                              <span>{TEMPLATES.find(t => t.id === task.templateId)?.name}</span>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <div className="pt-12 border-t border-slate-100 flex justify-between items-center text-slate-400 text-xs">
              <div>نظام إدارة المبادرات الصحية - الإصدار 1.0</div>
              <div>{new Date().toLocaleDateString('ar-SA')}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TeamStructureView = () => {
    const orgData = [
      {
        role: Role.INITIATIVE_MANAGER,
        children: [
          {
            role: Role.OPERATIONS_MANAGER,
            children: [{ role: Role.LOGISTICS_OFFICER }]
          },
          {
            role: Role.MEDICAL_DIRECTOR,
            children: [{ role: Role.DOCTORS }]
          },
          { role: Role.VOLUNTEER_MANAGER },
          { role: Role.MEDIA_MANAGER },
          { role: Role.IMPACT_OFFICER },
        ]
      }
    ];

    const handleMemberClick = (role: Role) => {
      setSelectedMemberRole(role);
      setView('member-tasks');
    };

    const Node = ({ item, isRoot = false }: { item: any, isRoot?: boolean }) => (
      <div className="flex flex-col items-center">
        <div 
          onClick={() => handleMemberClick(item.role)}
          className={`relative p-4 rounded-2xl border-2 min-w-[160px] text-center transition-all hover:shadow-md cursor-pointer ${isRoot ? 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700' : 'bg-white border-slate-200 text-slate-900 hover:border-emerald-400'}`}
        >
          <div className={`text-[10px] font-bold uppercase mb-1 ${isRoot ? 'text-emerald-100' : 'text-slate-400'}`}>{item.role}</div>
          <div className="font-bold">{data.team[item.role] || 'لم يتم التعيين'}</div>
          {!isRoot && <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-slate-200" />}
        </div>
        
        {item.children && (
          <div className="relative pt-8 flex gap-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-200" />
            {item.children.length > 1 && (
              <div className="absolute top-8 left-[calc(0%+80px)] right-[calc(0%+80px)] h-0.5 bg-slate-200" />
            )}
            {item.children.map((child: any, idx: number) => (
              <Node key={idx} item={child} />
            ))}
          </div>
        )}
      </div>
    );

    return (
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('dashboard')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowRight size={24} />
            </button>
            <h2 className="text-2xl font-bold">الهيكل التنظيمي للمبادرة</h2>
          </div>
          <Button variant="outline" onClick={() => setView('team')} className="gap-2">
            <PlusCircle size={18} />
            تعديل الفريق
          </Button>
        </div>

        <div className="overflow-x-auto pb-12">
          <div className="min-w-max flex justify-center pt-4">
            {orgData.map((root, idx) => (
              <Node key={idx} item={root} isRoot />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const MemberTasksView = () => {
    if (!selectedMemberRole) {
      return (
        <div className="max-w-4xl mx-auto py-20 px-6 text-center">
          <p className="text-slate-500 mb-6">اختر عضواً من الهيكل التنظيمي لعرض صفحة متابعته</p>
          <Button onClick={() => setView('team-structure')}>العودة للهيكل التنظيمي</Button>
        </div>
      );
    }

    const allTasksOrdered = useMemo(() => 
      phases.flatMap(p => p.tasks.map(t => ({ ...t, phaseId: p.id, phaseTitle: p.title }))),
      [phases]
    );

    const roleTasksWithStatus = useMemo(() => {
      return allTasksOrdered
        .filter(t => t.role === selectedMemberRole)
        .map((task) => {
          const orderInProject = allTasksOrdered.findIndex(t => t.id === task.id);
          const isCompleted = data.completedTasks.includes(task.id);
          const allPrevCompleted = allTasksOrdered.slice(0, orderInProject).every(t => data.completedTasks.includes(t.id));
          return { task, phaseId: task.phaseId, phaseTitle: task.phaseTitle, isCompleted, isDue: !isCompleted && allPrevCompleted, isFuture: !isCompleted && !allPrevCompleted };
        });
    }, [allTasksOrdered, selectedMemberRole, data.completedTasks]);

    const tasksByPhase = useMemo(() => {
      const map = new Map<number, typeof roleTasksWithStatus>();
      phases.forEach(p => map.set(p.id, roleTasksWithStatus.filter(x => x.phaseId === p.id)));
      return map;
    }, [phases, roleTasksWithStatus]);

    const completedCount = roleTasksWithStatus.filter(x => x.isCompleted).length;
    const inProgressCount = roleTasksWithStatus.filter(x => x.isDue).length;
    const futureCount = roleTasksWithStatus.filter(x => x.isFuture).length;
    const totalCount = roleTasksWithStatus.length;
    const overallProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const phaseSummary = useMemo(() => 
      phases.map(phase => {
        const phaseTasks = tasksByPhase.get(phase.id) || [];
        const completed = phaseTasks.filter(x => x.isCompleted).length;
        return { phase, completed, total: phaseTasks.length, progress: phaseTasks.length > 0 ? Math.round((completed / phaseTasks.length) * 100) : 0 };
      }).filter(x => x.total > 0),
      [phases, tasksByPhase]
    );

    return (
      <div className="max-w-5xl mx-auto py-12 px-6">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => { setSelectedMemberRole(null); setView('team-structure'); }} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowRight size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-bold">متابعة الفريق</h2>
            <p className="text-sm text-slate-500 mt-0.5">{data.team[selectedMemberRole] || 'لم يتم التعيين'} — {selectedMemberRole}</p>
          </div>
        </div>

        {/* نظرة شمولية خاصة بهذا العضو */}
        <section className="mb-10">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">نظرة شمولية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-5 flex flex-col justify-between">
              <span className="text-slate-500 text-sm mb-2">نسبة الإنجاز الإجمالية</span>
              <span className="text-3xl font-bold text-emerald-600">{overallProgress}%</span>
              <div className="mt-2"><ProgressBar progress={overallProgress} /></div>
            </Card>
            <Card className="p-5 flex flex-col justify-between">
              <span className="text-slate-500 text-sm mb-2">المهام المكتملة</span>
              <span className="text-3xl font-bold text-emerald-600">{completedCount}</span>
              <span className="text-xs text-slate-400">من {totalCount} مهمة</span>
            </Card>
            <Card className="p-5 flex flex-col justify-between">
              <span className="text-slate-500 text-sm mb-2">قيد التنفيذ</span>
              <span className="text-3xl font-bold text-amber-600">{inProgressCount}</span>
              <span className="text-xs text-slate-400">جاء وقتها</span>
            </Card>
            <Card className="p-5 flex flex-col justify-between">
              <span className="text-slate-500 text-sm mb-2">المهام اللاحقة</span>
              <span className="text-3xl font-bold text-slate-400">{futureCount}</span>
              <span className="text-xs text-slate-400">لم يحن وقتها</span>
            </Card>
          </div>
          <Card className="p-6">
            <h4 className="text-sm font-bold text-slate-500 mb-4">الإنجاز حسب المراحل</h4>
            <div className="space-y-4">
              {phaseSummary.map(({ phase, completed, total, progress }) => (
                <div key={phase.id} className="flex items-center gap-4">
                  <div className="w-24 shrink-0">
                    <span className="text-xs font-bold text-slate-500">المرحلة {phase.id}</span>
                    <p className="text-sm font-medium text-slate-800 truncate">{phase.title}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <ProgressBar progress={progress} />
                  </div>
                  <div className="w-16 text-left text-sm font-bold text-emerald-600 shrink-0">{completed}/{total}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* نظرة تفصيلية */}
        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">نظرة تفصيلية</h3>
          <div className="space-y-6">
            {phases.map(phase => {
              const phaseTasks = tasksByPhase.get(phase.id) || [];
              if (phaseTasks.length === 0) return null;

              const completedInPhase = phaseTasks.filter(x => x.isCompleted).length;
              const progress = Math.round((completedInPhase / phaseTasks.length) * 100);

              return (
                <div key={phase.id} className="space-y-4">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${progress === 100 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                          {progress === 100 ? <CheckCircle2 size={20} /> : phase.id}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">المرحلة {phase.id}: {phase.title}</h3>
                          <p className="text-xs text-slate-500">{phaseTasks.length} مهام</p>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-emerald-600">{progress}%</div>
                    </div>
                    <ProgressBar progress={progress} />
                    <div className="mt-4 flex flex-wrap gap-3">
                      {phaseTasks.map(({ task, isCompleted, isDue }) => (
                        <div
                          key={task.id}
                          onClick={() => { setSelectedTaskId(task.id); setSelectedPhaseId(phase.id); setView('task-detail'); }}
                          className="flex-1 min-w-[max(140px,calc(25%-0.5rem))] cursor-pointer transition-all hover:scale-[1.01]"
                        >
                          <Card className={`p-2.5 h-20 flex flex-col justify-between rounded-xl ${isCompleted ? 'bg-emerald-50/80 border-emerald-200' : 'bg-white border-slate-100'} ${isDue ? 'ring-1 ring-amber-200 border-amber-200' : ''} shadow-sm hover:shadow-md border`}>
                            <div className="flex items-center gap-1.5 min-h-0">
                              {isCompleted ? <CheckCircle2 size={12} className="text-emerald-500 shrink-0" /> : <Circle size={12} className="text-slate-300 shrink-0" />}
                              <h4 className={`font-bold text-[11px] line-clamp-2 leading-tight ${isCompleted ? 'text-emerald-900' : 'text-slate-800'}`}>{task.title}</h4>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <div className="flex-1 min-w-0">
                                {isDue && <span className="text-[8px] text-amber-600 font-bold">قيد التنفيذ</span>}
                              </div>
                              <button onClick={(e) => { e.stopPropagation(); setSelectedTaskIdForBook(task.id); setView('project-book'); }} className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-100 rounded-md transition-colors flex items-center gap-0.5" title="تفاصيل في الدليل التشغيلي">
                                <BookOpen size={12} />
                                <ArrowLeft size={10} />
                              </button>
                            </div>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              );
            })}
            {roleTasksWithStatus.length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-slate-400">لا توجد مهام مسندة لهذا المنصب.</p>
              </Card>
            )}
          </div>
        </section>
      </div>
    );
  };

  const DashboardView = () => (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('home')} className="p-2 hover:bg-slate-100 rounded-full transition-colors group">
            <ArrowRight size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h2 className="text-2xl font-bold">لوحة القيادة</h2>
            <p className="text-sm text-slate-500">{data.charityName} - {data.city}</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
          <img src="/assets/alkawthar-logo.png" alt="الكوثر" className="h-6" />
          <div className="h-4 w-px bg-slate-300 mx-1" />
          <span className="text-xs font-bold text-slate-500">صوم وصحة</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex flex-col justify-between">
          <span className="text-slate-500 text-sm mb-2">المرحلة الحالية</span>
          <span className="text-xl font-bold text-emerald-600">{currentPhase.title}</span>
        </Card>
        <Card className="flex flex-col justify-between">
          <span className="text-slate-500 text-sm mb-2">نسبة التقدم العامة</span>
          <span className="text-3xl font-bold">{totalProgress}%</span>
          <div className="mt-2"><ProgressBar progress={totalProgress} /></div>
        </Card>
        <Card className="flex flex-col justify-between">
          <span className="text-slate-500 text-sm mb-2">المهام المكتملة</span>
          <span className="text-3xl font-bold text-emerald-600">{completedCount}</span>
        </Card>
        <Card className="flex flex-col justify-between">
          <span className="text-slate-500 text-sm mb-2">المهام المتبقية</span>
          <span className="text-3xl font-bold text-slate-400">{remainingCount}</span>
        </Card>
      </div>

      {nextTask && (
        <Card className="border-emerald-100 bg-emerald-50/30">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <ChevronRight size={24} />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">المهمة التالية</span>
              <h3 className="text-lg font-bold mt-1">{nextTask.title}</h3>
              <p className="text-slate-600 text-sm mt-1">المسؤول: {data.team[nextTask.role] || nextTask.role}</p>
              <Button 
                variant="primary" 
                className="mt-4 px-8 py-2 text-sm"
                onClick={() => {
                  setSelectedTaskId(nextTask.id);
                  setView('task-detail');
                }}
              >
                عرض المهمة
              </Button>
            </div>
          </div>
        </Card>
      )}

      {allTasksCompleted && (
        <Card className="border-emerald-200 bg-emerald-50/50">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500 text-white rounded-xl">
              <ClipboardCheck size={24} />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">اكتملت جميع المهام</span>
              <h3 className="text-lg font-bold mt-1">توليد التقرير الختامي بالشواهد</h3>
              <p className="text-slate-600 text-sm mt-1">قم بتحميل التقرير الختامي الذي يتضمن جميع المهام المكتملة مع شواهدها.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button 
                  variant="primary" 
                  className="px-8 py-2 text-sm gap-2"
                  onClick={generateFinalReport}
                >
                  <Download size={18} />
                  تحميل التقرير
                </Button>
                <Button 
                  variant="outline" 
                  className="px-8 py-2 text-sm gap-2"
                  onClick={openFinalReportForPrint}
                >
                  <FileText size={18} />
                  عرض وطباعة
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button 
          onClick={() => setView('team-structure')}
          className="h-36 flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all"
        >
          <Users size={36} className="text-slate-500" strokeWidth={1.5} />
          <span className="font-medium text-slate-600">فريق العمل</span>
        </button>
        <button 
          onClick={() => setView('journeys')}
          className="h-36 flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all"
        >
          <MapIcon size={36} className="text-slate-500" strokeWidth={1.5} />
          <span className="font-medium text-slate-600">رحلات الزوار</span>
        </button>
        <button 
          onClick={() => setView('phases')}
          className="h-36 flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all"
        >
          <LayoutGrid size={36} className="text-slate-500" strokeWidth={1.5} />
          <span className="font-medium text-slate-600">مراحل المبادرة</span>
        </button>
        <button 
          onClick={() => setView('templates')}
          className="h-36 flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all"
        >
          <FileText size={36} className="text-slate-500" strokeWidth={1.5} />
          <span className="font-medium text-slate-600">مكتبة النماذج</span>
        </button>
        <button 
          onClick={() => setView('project-book')}
          className="h-36 flex flex-col items-center justify-center gap-3 rounded-xl border-0 bg-[#E8F5E9] shadow-sm hover:shadow-md hover:bg-[#D4EDDA] transition-all sm:col-span-2"
        >
          <BookOpen size={36} className="text-slate-500" strokeWidth={1.5} />
          <span className="font-medium text-slate-600">كتاب نمذجة المشروع</span>
        </button>
      </div>
    </div>
  );

  const PhasesView = () => {
    const [expandedPhaseId, setExpandedPhaseId] = useState<number | null>(selectedPhaseId);

    const togglePhase = (phaseId: number) => {
      if (!isPhaseUnlocked(phaseId)) return;
      setExpandedPhaseId(expandedPhaseId === phaseId ? null : phaseId);
    };

    return (
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setView('dashboard')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowRight size={24} />
          </button>
          <h2 className="text-2xl font-bold">مراحل ومهام المبادرة</h2>
        </div>

        <div className="space-y-6">
          {phases.map(phase => {
            const unlocked = isPhaseUnlocked(phase.id);
            const progress = getPhaseProgress(phase);
            const isExpanded = expandedPhaseId === phase.id;
            
            return (
              <div key={phase.id} className="space-y-4">
                <Card 
                  className={`transition-all hover:border-emerald-300 ${!unlocked ? 'opacity-60 grayscale cursor-not-allowed' : 'hover:shadow-md'} ${isExpanded ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20' : ''}`}
                  onClick={() => togglePhase(phase.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${progress === 100 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                        {progress === 100 ? <CheckCircle2 size={20} /> : phase.id}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">المرحلة {phase.id}: {phase.title}</h3>
                        <p className="text-xs text-slate-500 mb-1">{phase.goal}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{phase.tasks.length} مهام</span>
                          {isExpanded ? <ChevronUp size={14} className="text-emerald-600" /> : <ChevronDown size={14} className="text-slate-400" />}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-emerald-600">{progress}%</div>
                  </div>
                  <ProgressBar progress={progress} />
                  {!unlocked && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                      <Info size={14} />
                      <span>يجب إكمال المرحلة السابقة أولاً</span>
                    </div>
                  )}
                </Card>

                {/* Inline Tasks Expansion */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mr-6 pr-6 border-r-2 border-emerald-100 space-y-4"
                    >
                      {/* Group tasks: consecutive parallel tasks go together */}
                      {(() => {
                        const groupedTasks: (Task | Task[])[] = [];
                        let currentParallelGroup: Task[] = [];

                        phase.tasks.forEach(task => {
                          if (task.parallel) {
                            currentParallelGroup.push(task);
                          } else {
                            if (currentParallelGroup.length > 0) {
                              groupedTasks.push([...currentParallelGroup]);
                              currentParallelGroup = [];
                            }
                            groupedTasks.push(task);
                          }
                        });
                        if (currentParallelGroup.length > 0) {
                          groupedTasks.push([...currentParallelGroup]);
                        }

                        const TaskCard = ({ task, isCompleted }: { task: Task; isCompleted: boolean }) => (
                          <div
                            onClick={() => { setSelectedTaskId(task.id); setSelectedPhaseId(phase.id); setView('task-detail'); }}
                            className="cursor-pointer transition-all hover:scale-[1.01]"
                          >
                            <Card className={`p-2.5 h-20 flex flex-col justify-between rounded-xl ${isCompleted ? 'bg-emerald-50/80 border-emerald-200' : 'bg-white border-slate-100'} shadow-sm hover:shadow-md border`}>
                              <div className="flex items-center gap-1.5 min-h-0">
                                {isCompleted ? <CheckCircle2 size={12} className="text-emerald-500 shrink-0" /> : <Circle size={12} className="text-slate-300 shrink-0" />}
                                <h4 className={`font-bold text-[11px] line-clamp-2 leading-tight ${isCompleted ? 'text-emerald-900' : 'text-slate-800'}`}>{task.title}</h4>
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-[8px] text-slate-400 truncate flex-1">{data.team[task.role] || task.role}</p>
                                <button onClick={(e) => { e.stopPropagation(); setSelectedTaskIdForBook(task.id); setView('project-book'); }} className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-100 rounded-md transition-colors flex items-center gap-0.5" title="تفاصيل في الدليل التشغيلي">
                                  <BookOpen size={12} />
                                  <ArrowLeft size={10} />
                                </button>
                              </div>
                            </Card>
                          </div>
                        );

                        return groupedTasks.map((group, idx) => {
                          if (Array.isArray(group)) {
                            return (
                              <div key={`group-${idx}`} className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">مهام متوازية</span>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                  {group.map((task) => (
                                    <div key={task.id} className="flex-1 min-w-[max(140px,calc(25%-0.5rem))]">
                                      <TaskCard task={task} isCompleted={data.completedTasks.includes(task.id)} />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          } else {
                            const isCompleted = data.completedTasks.includes(group.id);
                            return (
                              <div key={group.id}>
                                <TaskCard task={group} isCompleted={isCompleted} />
                              </div>
                            );
                          }
                        });
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const TaskDetailView = () => {
    const allTasks = useMemo(() => phases.flatMap(p => p.tasks), []);
    const taskIndex = allTasks.findIndex(t => t.id === selectedTaskId);
    const task = allTasks[taskIndex];

    const [evidence, setEvidence] = useState('');
    const [showEvidence, setShowEvidence] = useState(false);

    useEffect(() => {
      if (task && data.taskEvidence) {
        setEvidence(data.taskEvidence[task.id] || '');
      }
    }, [task?.id, data.taskEvidence]);

    if (!task) {
      return (
        <div className="max-w-4xl mx-auto py-20 px-6 text-center">
          <Card className="p-12">
            <Info size={48} className="mx-auto mb-4 text-slate-300" />
            <h2 className="text-xl font-bold mb-2">لم يتم العثور على المهمة</h2>
            <p className="text-slate-500 mb-6">يرجى اختيار مهمة من قائمة المراحل لعرض تفاصيلها.</p>
            <Button onClick={() => setView('phases')}>الذهاب للمراحل</Button>
          </Card>
        </div>
      );
    }

    const isCompleted = data.completedTasks.includes(task.id);
    const template = TEMPLATES.find(t => t.id === task.templateId);
    const prevTask = taskIndex > 0 ? allTasks[taskIndex - 1] : null;
    const nextTaskItem = taskIndex < allTasks.length - 1 ? allTasks[taskIndex + 1] : null;

    const handleComplete = () => {
      toggleTask(task.id, evidence);
      if (nextTaskItem && !isCompleted) setSelectedTaskId(nextTaskItem.id);
    };

    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* شريط علوي بسيط */}
        <div className="shrink-0 bg-white border-b border-slate-100">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={() => setView('phases')} className="p-2 -m-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowRight size={22} className="text-slate-500" />
            </button>
            <span className="text-sm font-medium text-slate-500">{taskIndex + 1} من {allTasks.length}</span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-4 py-6 w-full">
            <motion.div
            key={task.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* المهمة - محتوى واحد واضح */}
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4" dir="rtl">
                <h1 className="text-xl font-bold text-slate-900 leading-snug flex-1">{task.title}</h1>
                <span className="text-slate-400 font-medium shrink-0">{taskIndex + 1}/{allTasks.length}</span>
              </div>
              <p className="text-slate-500 text-sm mt-2">{data.team[task.role] || task.role}</p>
            </div>

            {/* روابط سريعة - سطر واحد */}
            <div className="flex flex-wrap gap-2 mb-6">
              {template && (
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors">
                  <Download size={16} />
                  {template.name}
                </button>
              )}
              <button
                onClick={() => { setSelectedTaskIdForBook(task.id); setView('project-book'); }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors"
              >
                <BookOpen size={16} />
                الدليل التشغيلي
              </button>
            </div>

            {/* شاهد التنفيذ - اختياري، قابل للطي */}
            <div className="mb-6">
              {!showEvidence ? (
                <button
                  onClick={() => setShowEvidence(true)}
                  className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  إضافة شاهد أو ملاحظة (اختياري)
                </button>
              ) : (
                <div>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 outline-none"
                    placeholder="رابط، ملاحظة، أو اسم الملف..."
                    value={evidence}
                    onChange={(e) => setEvidence(e.target.value)}
                  />
                  <label className="mt-2 inline-flex items-center gap-2 text-xs text-slate-500 cursor-pointer hover:text-slate-700">
                    <input type="file" className="hidden" onChange={(e) => {
                      if (e.target.files?.[0]) setEvidence(prev => prev + (prev ? ' | ' : '') + e.target.files![0].name);
                    }} />
                    أو رفع ملف
                  </label>
                </div>
              )}
            </div>

            {/* زر الإنجاز - كبير وواضح */}
            <button
              onClick={handleComplete}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] ${
                isCompleted 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {isCompleted ? (
                <span className="flex items-center justify-center gap-2"><CheckCircle2 size={22} /> تم الإنجاز</span>
              ) : (
                <span>تحديد كمكتملة</span>
              )}
            </button>

            {/* تنقل بين المهام */}
            <div className="flex gap-3 mt-6">
              {prevTask && (
                <button
                  onClick={() => setSelectedTaskId(prevTask.id)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium flex items-center justify-center gap-2 hover:bg-slate-50"
                >
                  <ChevronRight size={18} /> السابقة
                </button>
              )}
              {nextTaskItem && (
                <button
                  onClick={() => setSelectedTaskId(nextTaskItem.id)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium flex items-center justify-center gap-2 hover:bg-slate-50"
                >
                  التالية <ChevronLeft size={18} />
                </button>
              )}
            </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  };


  const TemplatesView = () => (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('dashboard')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowRight size={24} />
        </button>
        <h2 className="text-2xl font-bold">مكتبة النماذج</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TEMPLATES.map(template => (
          <Card key={template.id} className="flex flex-col justify-between hover:border-emerald-300 transition-colors">
            <div>
              <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center mb-4">
                <FileText size={20} />
              </div>
              <h3 className="font-bold text-lg mb-1">{template.name}</h3>
              <p className="text-sm text-slate-500 mb-6">{template.description}</p>
            </div>
            <Button variant="outline" className="w-full py-2 text-sm gap-2">
              <Download size={16} />
              تحميل النموذج
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );

  // --- Site Layout (Kroki) - Interactive flowchart like reference ---
  const KROKI_NODES = [
    { id: 'parking', label: 'مواقف السيارات', icon: Car, x: 50, y: 88, w: 18, h: 8 },
    { id: 'gate', label: 'البوابة الرئيسية', icon: MapPin, x: 50, y: 72, w: 18, h: 10 },
    { id: 'reception', label: 'الاستقبال والتسجيل', icon: Users, x: 50, y: 52, w: 22, h: 12 },
    { id: 'clinics', label: 'العيادات الطبية', icon: Stethoscope, x: 22, y: 28, w: 18, h: 14 },
    { id: 'jood', label: 'خيمة الجود (الرئيسية)', icon: Coffee, x: 78, y: 38, w: 18, h: 12 },
    { id: 'activities', label: 'الأنشطة التفاعلية', icon: Activity, x: 50, y: 10, w: 20, h: 12 },
    { id: 'training', label: 'التدريب والمحاضرات', icon: BookOpen, x: 78, y: 58, w: 18, h: 12 },
    { id: 'admin', label: 'الإدارة والتشغيل', icon: LayoutGrid, x: 22, y: 58, w: 18, h: 12 }
  ];

  const KROKI_EDGES: [string, string][] = [
    ['parking', 'gate'],
    ['gate', 'reception'],
    ['reception', 'clinics'],
    ['reception', 'jood'],
    ['reception', 'training'],
    ['reception', 'admin'],
    ['clinics', 'activities'],
    ['jood', 'activities']
  ];

  const PATH_OPTIONS: { id: string; label: string; color: string; zoneIds?: string[] }[] = [
    { id: 'all', label: 'الكل', color: '#94a3b8' },
    { id: 'health', label: 'المسار الصحي', color: '#059669', zoneIds: ['parking', 'gate', 'reception', 'clinics', 'activities'] },
    { id: 'education', label: 'المسار التعليمي', color: '#2563eb', zoneIds: ['parking', 'gate', 'reception', 'training'] },
    { id: 'cultural', label: 'المسار الثقافي', color: '#7c3aed', zoneIds: ['parking', 'gate', 'reception', 'jood', 'activities'] },
    { id: 'official', label: 'المسار الرسمي', color: '#d97706', zoneIds: ['parking', 'gate', 'reception', 'clinics', 'jood', 'activities', 'training', 'admin'] }
  ];

  // --- Journeys Page Data ---
  const SITE_ZONES = [
    { title: 'منطقة الاستقبال', icon: Users, color: 'bg-slate-100 text-slate-600' },
    { title: 'منطقة التسجيل', icon: ClipboardCheck, color: 'bg-blue-100 text-blue-600' },
    { title: 'منطقة العيادات', icon: Stethoscope, color: 'bg-emerald-100 text-emerald-600' },
    { title: 'منطقة التدريب والمحاضرات', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
    { title: 'منطقة الأنشطة التفاعلية', icon: Users, color: 'bg-cyan-100 text-cyan-600' },
    { title: 'خيمة الجود', icon: Coffee, color: 'bg-teal-100 text-teal-600' },
    { title: 'منطقة الإدارة والتشغيل', icon: LayoutDashboard, color: 'bg-slate-800 text-white' },
  ];

  const SITE_PATHS = [
    { title: 'المسار الصحي', color: 'border-emerald-500 text-emerald-700 bg-emerald-50' },
    { title: 'المسار التعليمي', color: 'border-blue-500 text-blue-700 bg-blue-50' },
    { title: 'المسار الثقافي', color: 'border-teal-500 text-teal-700 bg-teal-50' },
    { title: 'مسار الضيوف الرسميين', color: 'border-blue-600 text-blue-800 bg-blue-50' },
  ];

  const MAP_ZONES = [
    { id: 'parking', title: 'مواقف السيارات', x: 600, y: 740, w: 800, h: 80, icon: Car, color: 'bg-slate-100/90 border-slate-300 text-slate-600' },
    { id: 'entrance', title: 'البوابة الرئيسية', x: 600, y: 620, w: 240, h: 70, icon: MapPin, color: 'bg-white/90 border-slate-800 text-slate-800' },
    { id: 'reception', title: 'الاستقبال والتسجيل', x: 600, y: 480, w: 320, h: 100, icon: Users, color: 'bg-blue-50/90 border-blue-300 text-blue-700' },
    { id: 'clinics', title: 'العيادات الطبية', x: 250, y: 400, w: 260, h: 160, icon: Stethoscope, color: 'bg-emerald-50/90 border-emerald-300 text-emerald-700' },
    { id: 'training', title: 'التدريب والمحاضرات', x: 950, y: 400, w: 260, h: 160, icon: BookOpen, color: 'bg-blue-50/90 border-blue-300 text-blue-700' },
    { id: 'interactive', title: 'الأنشطة التفاعلية', x: 250, y: 200, w: 260, h: 120, icon: Activity, color: 'bg-cyan-50/90 border-cyan-300 text-cyan-700' },
    { id: 'management', title: 'الإدارة والتشغيل', x: 950, y: 200, w: 220, h: 120, icon: LayoutDashboard, color: 'bg-slate-100/90 border-slate-300 text-slate-700' },
    { id: 'tent', title: 'خيمة الجود (الرئيسية)', x: 600, y: 100, w: 440, h: 120, icon: Coffee, color: 'bg-teal-50/90 border-teal-300 text-teal-700' },
  ];

  const MAP_PATHS = [
    {
      id: 'health',
      title: 'المسار الصحي',
      color: '#10b981',
      path: 'M 585,740 L 585,620 L 585,480 L 250,480 L 250,200 L 585,200 L 585,100',
      zones: ['parking', 'entrance', 'reception', 'clinics', 'interactive', 'tent']
    },
    {
      id: 'edu',
      title: 'المسار التعليمي',
      color: '#3b82f6',
      path: 'M 595,740 L 595,620 L 595,480 L 950,480 L 950,400 L 595,400 L 595,100',
      zones: ['parking', 'entrance', 'reception', 'training', 'tent']
    },
    {
      id: 'culture',
      title: 'المسار الثقافي',
      color: '#14b8a6',
      path: 'M 605,740 L 605,620 L 605,480 L 280,480 L 280,200 L 605,200 L 605,100',
      zones: ['parking', 'entrance', 'reception', 'interactive', 'tent']
    },
    {
      id: 'official',
      title: 'مسار الضيوف',
      color: '#2563eb',
      path: 'M 615,740 L 615,620 L 615,480 L 920,480 L 920,200 L 615,200 L 615,100 L 250,100 L 250,400 L 950,400',
      zones: ['parking', 'entrance', 'reception', 'management', 'tent', 'clinics', 'training']
    },
  ];

  const JOURNEYS = [
    {
      id: 'beneficiary',
      title: 'رحلة المستفيد الصحي',
      icon: Stethoscope,
      color: 'emerald',
      steps: [
        { title: 'الوصول إلى الموقع', desc: 'توجيه المستفيد إلى المدخل المخصص.' },
        { title: 'الاستقبال', desc: 'الترحيب بالمستفيد وتوجيهه لمنطقة التسجيل.' },
        { title: 'التسجيل الصحي', desc: 'تسجيل بيانات المستفيد وفتح ملف طبي.' },
        { title: 'الفرز الطبي', desc: 'أخذ العلامات الحيوية والقياسات المبدئية.' },
        { title: 'دخول العيادة', desc: 'مقابلة الطبيب المختص للحصول على الاستشارة والتشخيص.' },
        { title: 'إجراء الفحوصات', desc: 'إجراء الفحوصات المخبرية أو الأشعة إن لزم الأمر.' },
        { title: 'التثقيف الصحي', desc: 'تلقي التوجيهات الصحية وصرف الأدوية.' },
        { title: 'التحويل الطبي', desc: 'إحالة الحالة لجهات متخصصة إذا استدعت الحاجة.' },
        { title: 'مغادرة الموقع', desc: 'قياس رضا المستفيد وتوديعه.' }
      ]
    },
    {
      id: 'trainee',
      title: 'رحلة المتدرب',
      icon: GraduationCap,
      color: 'blue',
      steps: [
        { title: 'الوصول إلى الموقع', desc: 'توجيه المتدرب إلى منطقة التدريب.' },
        { title: 'التسجيل في الدورة', desc: 'إثبات الحضور واستلام البطاقة التعريفية والمهام.' },
        { title: 'دخول قاعة التدريب', desc: 'التوجه للقاعة المخصصة للبرنامج التدريبي.' },
        { title: 'حضور المحاضرة أو الدورة', desc: 'الاستماع للمحتوى العلمي والتوجيهات.' },
        { title: 'التدريب العملي', desc: 'العمل جنباً إلى جنب مع الممارسين الصحيين واكتساب الخبرة.' },
        { title: 'التفاعل وطرح الأسئلة', desc: 'المشاركة في النقاشات وتبادل المعرفة.' },
        { title: 'تقييم الدورة', desc: 'مراجعة الأداء مع المشرف وتلقي التغذية الراجعة.' },
        { title: 'مغادرة الموقع', desc: 'توثيق الساعات التطوعية واستلام شهادة المشاركة والمغادرة.' }
      ]
    },
    {
      id: 'official',
      title: 'رحلة الزائر الرسمي',
      icon: Award,
      color: 'blue',
      steps: [
        { title: 'الاستقبال الرسمي', desc: 'استقبال الزائر من قبل إدارة المبادرة والترحيب به.' },
        { title: 'التعريف بالمبادرة', desc: 'تقديم نبذة شاملة عن أهداف المبادرة وإنجازاتها.' },
        { title: 'الجولة داخل الموقع', desc: 'الاطلاع على سير العمل في مختلف العيادات والأقسام.' },
        { title: 'زيارة المسارات التشغيلية', desc: 'التعرف على آلية العمل في المسارات المختلفة.' },
        { title: 'لقاء الفريق', desc: 'الالتقاء بالمتطوعين والممارسين الصحيين وتشجيعهم.' },
        { title: 'التوثيق الإعلامي', desc: 'تسجيل كلمة تذكارية والتقاط الصور.' },
        { title: 'مغادرة الموقع', desc: 'توديع الزائر الرسمي.' }
      ]
    },
    {
      id: 'cultural',
      title: 'رحلة الضيف الثقافي',
      icon: Coffee,
      color: 'teal',
      steps: [
        { title: 'الوصول إلى الموقع', desc: 'توجيه الضيف إلى خيمة الجود.' },
        { title: 'الاستقبال في خيمة الجود', desc: 'استقبال الضيف في المنطقة الثقافية المخصصة.' },
        { title: 'الضيافة', desc: 'تقديم الضيافة الرمضانية.' },
        { title: 'المشاركة في الجلسات الحوارية', desc: 'حضور الفعاليات والأنشطة المصاحبة للمبادرة.' },
        { title: 'الاطلاع على الأنشطة الثقافية', desc: 'الاطلاع على الأركان التثقيفية والمواد التوعوية.' },
        { title: 'مغادرة الموقع', desc: 'تقديم الهدايا التذكارية وشكر الضيف على حضوره ومشاركته.' }
      ]
    }
  ];

  const SiteLayoutView = () => {
    const [selectedPath, setSelectedPath] = useState<string>('all');
    const pathConfig = PATH_OPTIONS.find(p => p.id === selectedPath);
    const activeZoneIds = pathConfig?.zoneIds ? new Set(pathConfig.zoneIds) : null;

    const isEdgeActive = (a: string, b: string) => {
      if (!activeZoneIds) return true;
      return activeZoneIds.has(a) && activeZoneIds.has(b);
    };

    const isNodeActive = (id: string) => !activeZoneIds || activeZoneIds.has(id);

    return (
      <div className="max-w-6xl mx-auto py-8 px-6">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('dashboard')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowRight size={24} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                <MapPin size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">كروكي الموقع التفاعلي</h2>
                <p className="text-sm text-slate-500">اختر المسار لعرضه على الخريطة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Path filters - like image */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {PATH_OPTIONS.map((p) => {
            const isSelected = selectedPath === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPath(p.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isSelected ? 'shadow-md' : 'hover:bg-slate-50'
                }`}
                style={isSelected ? { backgroundColor: p.color + '20', border: `2px solid ${p.color}`, color: p.color } : { backgroundColor: 'white', border: '1px solid #e2e8f0', color: '#64748b' }}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Flowchart kroki */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
        >
          <div className="p-6 md:p-8 bg-[#f1f5f9] min-h-[500px]">
            <div className="relative w-full rounded-xl overflow-hidden" style={{ minHeight: 420 }}>
              <svg viewBox="0 0 100 100" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet" style={{ minHeight: 420, display: 'block' }}>
                <defs>
                  <pattern id="dotGrid" width="2" height="2" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.4" fill="#94a3b8" fillOpacity="0.4" />
                  </pattern>
                  <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                    <polygon points="0 0, 4 2, 0 4" fill="currentColor" />
                  </marker>
                </defs>
                <rect width="100" height="100" fill="url(#dotGrid)" />
                <rect width="100" height="100" fill="#f8fafc" fillOpacity="0.5" />

                {/* Edges - orthogonal paths with arrows */}
                {KROKI_EDGES.map(([fromId, toId]) => {
                  const from = KROKI_NODES.find(n => n.id === fromId)!;
                  const to = KROKI_NODES.find(n => n.id === toId)!;
                  const active = isEdgeActive(fromId, toId);
                  const color = active && pathConfig && pathConfig.id !== 'all' ? pathConfig.color : '#cbd5e1';
                  const opacity = active ? 1 : 0.35;
                  const fromCx = from.x + from.w / 2;
                  const fromCy = from.y + from.h / 2;
                  const toCx = to.x + to.w / 2;
                  const toCy = to.y + to.h / 2;
                  const midY = (fromCy + toCy) / 2;
                  const d = `M ${fromCx} ${fromCy} L ${fromCx} ${midY} L ${toCx} ${midY} L ${toCx} ${toCy}`;
                  return (
                    <motion.path
                      key={`${fromId}-${toId}`}
                      d={d}
                      fill="none"
                      stroke={color}
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                      animate={active && pathConfig && pathConfig.id !== 'all' ? { 
                        strokeDashoffset: [0, -14],
                        strokeWidth: 1.8
                      } : { 
                        strokeDashoffset: 0,
                        strokeWidth: 1.2 
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1, 
                        ease: "linear" 
                      }}
                      strokeLinecap="round"
                      markerEnd="url(#arrowhead)"
                      opacity={opacity}
                    />
                  );
                })}

                {/* Nodes */}
                {KROKI_NODES.map((node) => {
                  const Icon = node.icon;
                  const active = isNodeActive(node.id);
                  const opacity = active ? 1 : 0.5;
                  const strokeColor = active && pathConfig && pathConfig.id !== 'all' ? pathConfig.color : '#94a3b8';
                  return (
                    <g key={node.id} opacity={opacity}>
                      <rect
                        x={node.x}
                        y={node.y}
                        width={node.w}
                        height={node.h}
                        rx="2"
                        fill="white"
                        stroke={strokeColor}
                        strokeWidth={active && pathConfig?.id !== 'all' ? 0.4 : 0.25}
                        strokeDasharray={pathConfig?.id === 'all' ? '2 2' : 'none'}
                      />
                      <foreignObject x={node.x + 0.5} y={node.y + 0.5} width={node.w - 1} height={node.h - 1}>
                        <div className="w-full h-full flex flex-col items-center justify-center p-0.5">
                          <Icon size={12} className="text-slate-600 shrink-0 mb-0.5" strokeWidth={2} />
                          <span className="text-[9px] font-bold text-slate-800 leading-tight text-center">{node.label}</span>
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // --- SiteMap Component for Journeys Page ---
  const SiteMap = ({ activePathId }: { activePathId: string | null }) => {
    return (
      <div className="relative w-full aspect-[14/10] md:aspect-[16/9] bg-[#f8fafc] rounded-3xl border-4 border-slate-200 overflow-hidden shadow-inner">
        <style>{`
          @keyframes dash {
            to {
              stroke-dashoffset: -1000;
            }
          }
        `}</style>
        {/* Grass/Ground Background */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Walkways */}
          <g fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="4">
            <rect x="540" y="100" width="120" height="640" rx="20" />
            <rect x="250" y="420" width="700" height="120" rx="20" />
            <rect x="250" y="140" width="700" height="120" rx="20" />
          </g>

          {/* Paths */}
          {MAP_PATHS.map(p => (
            <path
              key={p.id}
              d={p.path}
              fill="none"
              stroke={p.color}
              strokeWidth={activePathId === p.id ? "8" : "4"}
              strokeDasharray="16,16"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-500 ${activePathId && activePathId !== p.id ? 'opacity-10' : 'opacity-100'}`}
              style={{
                filter: activePathId === p.id ? `drop-shadow(0 0 8px ${p.color})` : 'none',
                animation: activePathId === p.id ? 'dash 30s linear infinite' : 'none'
              }}
            />
          ))}
        </svg>

        {/* Zones */}
        {MAP_ZONES.map(zone => {
          const Icon = zone.icon;
          const isHighlighted = activePathId === null || MAP_PATHS.find(p => p.id === activePathId)?.zones.includes(zone.id);
          return (
            <div
              key={zone.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-500 ${isHighlighted ? 'opacity-100 scale-100 z-10' : 'opacity-40 scale-95 z-0'}`}
              style={{ 
                left: `${(zone.x / 1200) * 100}%`, 
                top: `${(zone.y / 800) * 100}%`, 
                width: `${(zone.w / 1200) * 100}%`, 
                height: `${(zone.h / 800) * 100}%` 
              }}
            >
              <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl border-2 shadow-md backdrop-blur-sm transition-colors ${zone.color}`}>
                <Icon className="w-6 h-6 md:w-8 md:h-8 mb-2" />
                <span className="font-bold text-[10px] md:text-sm text-center px-2 leading-tight">
                  {zone.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // --- Journeys View Component ---
  const JourneysView = () => {
    const [activeTab, setActiveTab] = useState<'layout' | 'experience'>('layout');
    const [activeJourney, setActiveJourney] = useState(JOURNEYS[0].id);
    const [activeMapPath, setActiveMapPath] = useState<string | null>(null);

    const currentJourney = JOURNEYS.find(j => j.id === activeJourney)!;

    const journeyToPathMap: Record<string, string> = {
      beneficiary: 'health',
      trainee: 'edu',
      cultural: 'culture',
      official: 'official'
    };

    const colorClasses = {
      emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200' },
      blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200' },
      teal: { bg: 'bg-teal-500', text: 'text-teal-600', light: 'bg-teal-50', border: 'border-teal-200' },
    };

    const activeColors = colorClasses[currentJourney.color as keyof typeof colorClasses];

    return (
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setView('dashboard')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowRight size={24} />
          </button>
          <h2 className="text-2xl font-bold">تصميم الموقع وتجربة الزوار</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('layout')}
            className={`px-6 py-2 rounded-full font-bold transition-colors ${
              activeTab === 'layout' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            تصميم الموقع
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-6 py-2 rounded-full font-bold transition-colors ${
              activeTab === 'experience' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            تجربة الزوار
          </button>
        </div>

        {activeTab === 'layout' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Interactive Map */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <MapIcon className="text-emerald-600" />
                  كروكي الموقع التفاعلي
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setActiveMapPath(null)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeMapPath === null ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>الكل</button>
                  {MAP_PATHS.map(p => (
                    <button key={p.id} onClick={() => setActiveMapPath(p.id)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${activeMapPath === p.id ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>

              <SiteMap activePathId={activeMapPath} />
            </div>

            {/* Zones */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MapIcon className="text-emerald-600" />
                تقسيم مناطق الموقع
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {SITE_ZONES.map((zone, idx) => {
                  const Icon = zone.icon;
                  return (
                    <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${zone.color}`}>
                        <Icon size={24} />
                      </div>
                      <span className="font-bold text-slate-700">{zone.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Paths */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Footprints className="text-emerald-600" />
                مسارات الحركة داخل الموقع
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SITE_PATHS.map((path, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border-2 flex items-center gap-4 ${path.color}`}>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <ArrowLeft size={20} />
                    </div>
                    <span className="font-bold text-lg">{path.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'experience' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Journey Selector */}
            <div className="flex flex-wrap gap-4 mb-12">
              {JOURNEYS.map(journey => {
                const Icon = journey.icon;
                const isActive = activeJourney === journey.id;
                const colors = colorClasses[journey.color as keyof typeof colorClasses];
                
                return (
                  <button
                    key={journey.id}
                    onClick={() => setActiveJourney(journey.id)}
                    className={`flex-1 min-w-[200px] p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                      isActive 
                        ? `${colors.border} ${colors.light} shadow-md scale-105` 
                        : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive ? colors.bg + ' text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Icon size={24} />
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${isActive ? colors.text : 'text-slate-700'}`}>{journey.title}</div>
                      <div className="text-xs text-slate-400 mt-1">{journey.steps.length} محطات رئيسية</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Journey Map Visualization */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm relative mb-8 overflow-hidden">
              {/* Background decorative elements */}
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2 ${activeColors.bg}`} />
              <div className={`absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2 ${activeColors.bg}`} />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentJourney.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, staggerChildren: 0.1 }}
                  className="w-full relative pt-2"
                >
                  <div className="flex flex-col gap-0 lg:gap-16 relative w-full">
                    {Array.from({ length: Math.ceil(currentJourney.steps.length / 4) }).map((_, rowIndex) => {
                      const rowSteps = currentJourney.steps.slice(rowIndex * 4, rowIndex * 4 + 4);
                      const isEvenRow = rowIndex % 2 === 0;
                      const lineWidth = `${(rowSteps.length - 1) * 25}%`;
                      
                      return (
                        <div key={rowIndex} className={`flex flex-col lg:flex-row relative ${isEvenRow ? '' : 'lg:flex-row-reverse'} justify-start`}>
                          
                          {/* Horizontal Line for the row (Desktop) */}
                          {rowSteps.length > 1 && (
                            <div 
                              className="absolute top-[32px] h-1.5 bg-slate-100 -translate-y-1/2 rounded-full hidden lg:block" 
                              style={{ 
                                width: lineWidth,
                                [isEvenRow ? 'right' : 'left']: '12.5%'
                              }}
                            />
                          )}
                          
                          {/* Animated Horizontal Line */}
                          {rowSteps.length > 1 && (
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: lineWidth }}
                              transition={{ duration: 1, delay: 0.2 + rowIndex * 0.5, ease: "easeInOut" }}
                              className={`absolute top-[32px] h-1.5 -translate-y-1/2 rounded-full hidden lg:block ${activeColors.bg}`} 
                              style={{
                                [isEvenRow ? 'right' : 'left']: '12.5%'
                              }}
                            />
                          )}

                          {/* Vertical Line connecting to next row (Desktop) */}
                          {rowIndex < Math.ceil(currentJourney.steps.length / 4) - 1 && (
                            <div 
                              className="absolute top-[32px] w-1.5 h-[calc(100%+4rem)] bg-slate-100 hidden lg:block -translate-x-1/2"
                              style={{ left: isEvenRow ? '12.5%' : '87.5%' }}
                            />
                          )}
                          {rowIndex < Math.ceil(currentJourney.steps.length / 4) - 1 && (
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: 'calc(100% + 4rem)' }}
                              transition={{ duration: 0.5, delay: 0.2 + rowIndex * 0.5 + 0.8, ease: "easeInOut" }}
                              className={`absolute top-[32px] w-1.5 hidden lg:block -translate-x-1/2 ${activeColors.bg}`} 
                              style={{ left: isEvenRow ? '12.5%' : '87.5%' }}
                            />
                          )}

                          {rowSteps.map((step, colIndex) => {
                            const globalIndex = rowIndex * 4 + colIndex;
                            return (
                              <motion.div 
                                key={globalIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + globalIndex * 0.1 }}
                                className="flex lg:flex-col items-center gap-6 lg:gap-4 group w-full lg:w-1/4 shrink-0 relative px-2 mb-6 lg:mb-0"
                              >
                                {/* Number / Icon */}
                                <div className={`w-12 h-12 lg:w-16 lg:h-16 shrink-0 rounded-2xl flex items-center justify-center text-xl lg:text-2xl font-black shadow-lg transition-transform group-hover:scale-110 group-hover:-translate-y-2 relative z-10 bg-white border-4 ${activeColors.border} ${activeColors.text}`}>
                                  {globalIndex + 1}
                                </div>
                                
                                {/* Content */}
                                <div className="lg:text-center flex-1 bg-white lg:bg-transparent p-4 lg:p-0 rounded-2xl border border-slate-100 lg:border-none shadow-sm lg:shadow-none w-full">
                                  <h4 className={`font-bold text-sm lg:text-base mb-2 ${activeColors.text}`}>{step.title}</h4>
                                  <p className="text-xs text-slate-500 leading-relaxed hidden lg:block">{step.desc}</p>
                                </div>

                                {/* Mobile connecting line */}
                                {globalIndex < currentJourney.steps.length - 1 && (
                                  <div className={`absolute w-1 h-[calc(100%+1.5rem)] ${activeColors.bg} right-[22px] top-[48px] lg:hidden opacity-20`} />
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Map for the active journey */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MapIcon className={activeColors.text} />
                مسار الرحلة على الكروكي
              </h3>
              <SiteMap activePathId={journeyToPathMap[activeJourney]} />
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  // --- Layout ---

  const Sidebar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-around z-50 md:top-0 md:bottom-auto md:flex-col md:w-20 md:h-full md:border-t-0 md:border-l">
      <div className="hidden md:flex items-center justify-center p-4 mb-4 cursor-pointer" onClick={() => setView('landing')}>
        <img src="/assets/alkawthar-logo.png" alt="راسخ" className="h-10" />
      </div>
      <button onClick={() => setView('dashboard')} className={`p-3 rounded-2xl transition-all ${view === 'dashboard' ? 'bg-emerald-100 text-emerald-600' : 'text-slate-400 hover:bg-slate-50'}`} title="لوحة القيادة">
        <BarChart3 size={24} />
      </button>
      <button onClick={() => setView('phases')} className={`p-3 rounded-2xl transition-all ${view === 'phases' || view === 'task-detail' ? 'bg-emerald-100 text-emerald-600' : 'text-slate-400 hover:bg-slate-50'}`} title="المراحل والمهام">
        <LayoutDashboard size={24} />
      </button>
      <button onClick={() => setView('journeys')} className={`p-3 rounded-2xl transition-all ${view === 'journeys' ? 'bg-emerald-100 text-emerald-600' : 'text-slate-400 hover:bg-slate-50'}`} title="رحلات الزوار">
        <MapIcon size={24} />
      </button>
      <button onClick={() => setView('templates')} className={`p-3 rounded-2xl transition-all ${view === 'templates' ? 'bg-emerald-100 text-emerald-600' : 'text-slate-400 hover:bg-slate-50'}`} title="مكتبة النماذج">
        <FileText size={24} />
      </button>
      <button onClick={() => setView('project-book')} className={`p-3 rounded-2xl transition-all ${view === 'project-book' ? 'bg-emerald-100 text-emerald-600' : 'text-slate-400 hover:bg-slate-50'}`} title="الدليل التشغيلي">
        <BookOpen size={24} />
      </button>
      <button onClick={() => setView('team-structure')} className={`p-3 rounded-2xl transition-all ${view === 'team-structure' || view === 'team' || view === 'member-tasks' ? 'bg-emerald-100 text-emerald-600' : 'text-slate-400 hover:bg-slate-50'}`} title="فريق العمل">
        <Users size={24} />
      </button>
    </div>
  );

  return (
    <ErrorBoundary>
      <div className={`min-h-screen pb-24 md:pb-0 ${data.isInitialized && view !== 'home' && view !== 'landing' && view !== 'library' ? 'md:pr-20' : ''}`}>
        {(view === 'landing' || view === 'library') && <RasikhNavbar setView={setView} view={view} />}
        {data.isInitialized && view !== 'home' && view !== 'landing' && view !== 'library' && <Sidebar />}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {view === 'landing' && <RasikhLanding setView={setView} />}
            {view === 'library' && <RasikhLibrary setView={setView} />}
            {['privacy-policy', 'beneficiary-charter', 'faq', 'platform-guide', 'report-complaint', 'suggestions'].includes(view) && (
              <StaticPageView {...getPageContent(view)} />
            )}
            {view === 'home' && (
              <div className="pt-24 min-h-screen">
                <div className="max-w-4xl mx-auto px-6 mb-8">
                  <button onClick={() => setView('library')} className="flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-all group">
                    <ArrowRight size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>العودة لمكتبة المشاريع</span>
                  </button>
                </div>
                <HomeView />
              </div>
            )}
            {view === 'setup' && <SetupView />}
            {view === 'team' && <TeamView />}
            {view === 'team-structure' && <TeamStructureView />}
            {view === 'member-tasks' && <MemberTasksView />}
            {view === 'project-book' && <ProjectBookView />}
            {view === 'dashboard' && <DashboardView />}
            {view === 'phases' && <PhasesView />}
            {view === 'task-detail' && <TaskDetailView />}
            {view === 'templates' && <TemplatesView />}
            {view === 'site-layout' && <SiteLayoutView />}
            {view === 'journeys' && <JourneysView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}

// --- Icons Helper ---
// (ChevronLeft is now imported from lucide-react)
