import { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  Award,
  Briefcase,
  Compass,
  Hotel,
  ConciergeBell,
  UserCheck,
  HeartHandshake,
  CalendarCheck2,
  TrendingUp,
  Sparkles,
  ClipboardCheck,
  Bed,
  Brush,
  UtensilsCrossed,
  ChefHat,
  Flame,
  Utensils,
  Wine,
  HandHeart,
  Droplets,
  Users,
  GraduationCap,
  Coins,
  ShoppingBag,
  Boxes,
  Wrench,
  Hammer,
  Shield,
  ShieldAlert,
  Flower2,
  PartyPopper,
  Waves,
  LifeBuoy,
  Megaphone,
  Handshake,
  Globe,
  Cpu,
  Info,
  Luggage,
  Car,
  PhoneCall,
  Shirt,
  Moon,
  Clock,
  CheckCircle2,
  HeartPulse,
  FileText,
  FileSignature,
  Heart,
  Search,
  Check,
  Crown,
  Mail,
  Phone,
  X,
  ChevronRight,
  ShieldCheck,
  Star,
  Activity,
  SlidersHorizontal,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { useLocale } from "@/contexts/LocaleContext";
import {
  MANAGEMENT_PERSONNEL_DATA,
  ManagementPersonnelRole,
} from "@/data/managementPersonnelData";

// Dynamic icon resolution
function getRoleIcon(iconName: string, roleId: number) {
  const iconProps = { size: 24, className: "shrink-0" };

  switch (iconName) {
    case "Award":
      return <Crown {...iconProps} className="text-[#f3e5ab]" />;
    case "Briefcase":
      return <Briefcase {...iconProps} className="text-[#d4af37]" />;
    case "Compass":
      return <Compass {...iconProps} className="text-[#d4af37]" />;
    case "Hotel":
      return <Hotel {...iconProps} className="text-[#d4af37]" />;
    case "ConciergeBell":
      return <ConciergeBell {...iconProps} className="text-[#d4af37]" />;
    case "UserCheck":
      return <UserCheck {...iconProps} className="text-[#d4af37]" />;
    case "HeartHandshake":
      return <HeartHandshake {...iconProps} className="text-[#d4af37]" />;
    case "CalendarCheck2":
      return <CalendarCheck2 {...iconProps} className="text-[#d4af37]" />;
    case "TrendingUp":
      return <TrendingUp {...iconProps} className="text-[#d4af37]" />;
    case "Sparkles":
      return <Sparkles {...iconProps} className="text-[#d4af37]" />;
    case "ClipboardCheck":
      return <ClipboardCheck {...iconProps} className="text-[#d4af37]" />;
    case "Bed":
      return <Bed {...iconProps} className="text-[#d4af37]" />;
    case "Brush":
      return <Brush {...iconProps} className="text-[#d4af37]" />;
    case "UtensilsCrossed":
      return <UtensilsCrossed {...iconProps} className="text-[#d4af37]" />;
    case "ChefHat":
      return <ChefHat {...iconProps} className="text-[#f3e5ab]" />;
    case "Flame":
      return <Flame {...iconProps} className="text-[#d4af37]" />;
    case "Utensils":
      return <Utensils {...iconProps} className="text-[#d4af37]" />;
    case "Wine":
      return <Wine {...iconProps} className="text-[#d4af37]" />;
    case "HandHeart":
      return <HandHeart {...iconProps} className="text-[#d4af37]" />;
    case "Droplets":
      return <Droplets {...iconProps} className="text-[#d4af37]" />;
    case "Users":
      return <Users {...iconProps} className="text-[#d4af37]" />;
    case "GraduationCap":
      return <GraduationCap {...iconProps} className="text-[#d4af37]" />;
    case "Coins":
      return <Coins {...iconProps} className="text-[#d4af37]" />;
    case "ShoppingBag":
      return <ShoppingBag {...iconProps} className="text-[#d4af37]" />;
    case "Boxes":
      return <Boxes {...iconProps} className="text-[#d4af37]" />;
    case "Wrench":
      return <Wrench {...iconProps} className="text-[#d4af37]" />;
    case "Hammer":
      return <Hammer {...iconProps} className="text-[#d4af37]" />;
    case "Shield":
      return <Shield {...iconProps} className="text-[#f3e5ab]" />;
    case "ShieldAlert":
      return <ShieldAlert {...iconProps} className="text-[#d4af37]" />;
    case "Flower2":
      return <Flower2 {...iconProps} className="text-[#d4af37]" />;
    case "PartyPopper":
      return <PartyPopper {...iconProps} className="text-[#d4af37]" />;
    case "Waves":
      return <Waves {...iconProps} className="text-[#d4af37]" />;
    case "LifeBuoy":
      return <LifeBuoy {...iconProps} className="text-[#f3e5ab]" />;
    case "Megaphone":
      return <Megaphone {...iconProps} className="text-[#d4af37]" />;
    case "Handshake":
      return <Handshake {...iconProps} className="text-[#d4af37]" />;
    case "Globe":
      return <Globe {...iconProps} className="text-[#d4af37]" />;
    case "Cpu":
      return <Cpu {...iconProps} className="text-[#d4af37]" />;
    case "Info":
      return <Info {...iconProps} className="text-[#d4af37]" />;
    case "Luggage":
      return <Luggage {...iconProps} className="text-[#d4af37]" />;
    case "Car":
      return <Car {...iconProps} className="text-[#d4af37]" />;
    case "PhoneCall":
      return <PhoneCall {...iconProps} className="text-[#d4af37]" />;
    case "Shirt":
      return <Shirt {...iconProps} className="text-[#d4af37]" />;
    case "Moon":
      return <Moon {...iconProps} className="text-[#d4af37]" />;
    case "Clock":
      return <Clock {...iconProps} className="text-[#d4af37]" />;
    case "CheckCircle2":
      return <CheckCircle2 {...iconProps} className="text-[#d4af37]" />;
    case "HeartPulse":
      // Medical & Health & Safety cross badge
      return (
        <div className="relative flex items-center justify-center">
          <HeartPulse size={26} className="text-red-400 animate-pulse" />
        </div>
      );
    case "FileText":
      return <FileText {...iconProps} className="text-[#d4af37]" />;
    case "FileSignature":
      return <FileSignature {...iconProps} className="text-[#d4af37]" />;
    case "Heart":
      return <Heart {...iconProps} className="text-[#f3e5ab]" />;
    default:
      return <Star {...iconProps} className="text-[#d4af37]" />;
  }
}

export default function ManagementPersonnelPage() {
  const { locale, setLocale } = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const content = MANAGEMENT_PERSONNEL_DATA;

  // Filtered roles based on category and search
  const filteredRoles = useMemo(() => {
    return content.roles.filter((role: ManagementPersonnelRole) => {
      // Category match
      const categoryMatch =
        selectedCategory === "all" || role.category === selectedCategory;

      if (!categoryMatch) return false;

      // Search match
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const title = (role.title[locale] || "").toLowerCase();
      const subtitle = (role.subtitle[locale] || "").toLowerCase();
      const desc = (role.description[locale] || "").toLowerCase();
      const idStr = String(role.id);

      // Check English terms as well for accessibility
      const titleEn = (role.title.en || "").toLowerCase();

      return (
        title.includes(q) ||
        subtitle.includes(q) ||
        desc.includes(q) ||
        idStr === q ||
        titleEn.includes(q)
      );
    });
  }, [content.roles, selectedCategory, searchQuery, locale]);

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO BANNER: PRESTIGIOUS 5-STAR HEADING & BREADCRUMBS           */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#030c16] via-[#081a2c] to-[#040f1a] text-white border-b-2 border-[#d4af37]/40 overflow-hidden">
        {/* Subtle Decorative Golden Radiance */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-radial from-[#d4af37]/15 via-transparent to-transparent pointer-events-none blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

        <div className="container max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              {locale === "tr" ? "Ana Sayfa" : locale === "ru" ? "Главная" : locale === "de" ? "Startseite" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-[#f3e5ab]">
              {content.hero.title[locale]}
            </span>
          </div>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0b243d] border-2 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <Crown size={15} className="text-[#d4af37]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#f3e5ab]">
                {content.hero.eyebrow[locale]}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-wide text-white leading-tight">
              {content.hero.title[locale]}
            </h1>

            <p className="font-serif italic text-lg sm:text-2xl text-[#d4af37]">
              {content.hero.subtitle[locale]}
            </p>

            <p className="text-sm sm:text-base text-white/85 max-w-3xl leading-relaxed font-light pt-2">
              {content.hero.description[locale]}
            </p>
          </div>

          {/* 4 Grand Resort Key Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 pt-8 border-t border-[#d4af37]/30">
            {content.intro.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#040f1a]/80 border-2 border-[#d4af37]/60 backdrop-blur-md shadow-[0_0_25px_rgba(212,175,55,0.15)] flex flex-col justify-between"
              >
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f3e5ab]">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-white/80 font-light mt-2 leading-snug">
                  {stat.label[locale]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. GENERAL MANAGER'S WELCOME & EXECUTIVE SPOTLIGHT                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-14 sm:py-20 bg-[#040f1a] text-white">
        <div className="container max-w-7xl px-4 sm:px-6">
          <div className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-b from-[#0b243d] via-[#040f1a] to-[#0b243d] border-2 border-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.3)] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* GM Portrait with Golden Frame */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.4)] p-1 bg-[#040f1a]">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
                    alt="General Manager Şenol And"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#d4af37]/60 text-[11px] text-[#f3e5ab] font-serif">
                    Orka Lotus Beach Hotel
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-[#f3e5ab]">
                    Şenol And
                  </h3>
                  <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                    {content.roles[0].subtitle[locale]}
                  </div>
                </div>
              </div>

              {/* GM Narrative & Personal Message */}
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#040f1a] border border-[#d4af37] text-[11px] font-bold uppercase tracking-widest text-[#d4af37]">
                  <Award size={13} />
                  <span>
                    {locale === "tr"
                      ? "GENEL MÜDÜRÜN MESAJI"
                      : locale === "ru"
                      ? "ОБРАЩЕНИЕ ГЕНЕРАЛЬНОГО ДИРЕКТОРА"
                      : locale === "de"
                      ? "GRUSSWORT DES GENERAL MANAGERS"
                      : "A PERSONAL WELCOME FROM THE GENERAL MANAGER"}
                  </span>
                </div>

                <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#f3e5ab] italic leading-snug">
                  “{locale === "tr"
                    ? "Misafirlerimizin her birini Ege'deki evine dönen aziz bir dost olarak kabul ediyoruz."
                    : locale === "ru"
                    ? "Мы относимся к каждому гостю как к дорогому другу, возвращающемуся в свой дом на Эгейском море."
                    : locale === "de"
                    ? "Wir betrachten jeden Gast als einen geschätzten Freund, der in sein ägäisches Zuhause zurückkehrt."
                    : "We consider every guest a cherished friend returning to their Aegean home."}”
                </blockquote>

                <p className="text-xs sm:text-sm text-white/85 font-light leading-relaxed">
                  {content.intro.p1[locale]}
                </p>

                <p className="text-xs sm:text-sm text-white/85 font-light leading-relaxed">
                  {content.intro.p2[locale]}
                </p>

                <p className="text-xs sm:text-sm text-[#f3e5ab] font-medium leading-relaxed">
                  {content.intro.p3[locale]}
                </p>

                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:gm.orkalotus@orkahotels.com"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#040f1a] font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-transform"
                  >
                    <Mail size={15} />
                    <span>
                      {locale === "tr"
                        ? "Genel Müdürlük İletişim"
                        : locale === "ru"
                        ? "Связаться с Генеральным директором"
                        : locale === "de"
                        ? "Kontakt Direktion"
                        : "Contact General Management"}
                    </span>
                  </a>

                  <a
                    href="#directory-list"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#040f1a] border-2 border-[#d4af37] text-xs sm:text-sm font-semibold text-[#f3e5ab] hover:bg-[#0b243d] transition-colors"
                  >
                    <span>
                      {locale === "tr"
                        ? "Tüm 49 Kadroyu İnceleyin"
                        : locale === "ru"
                        ? "Смотреть все 49 отделов"
                        : locale === "de"
                        ? "Alle 49 Bereiche ansehen"
                        : "Explore All 49 Roles"}
                    </span>
                    <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. INTERACTIVE DIRECTORY: SEARCH & CATEGORY FILTERS                */}
      {/* ------------------------------------------------------------------ */}
      <section id="directory-list" className="py-10 bg-[#030c16] border-y border-[#d4af37]/40 scroll-mt-10">
        <div className="container max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-1">
                <SlidersHorizontal size={14} />
                <span>
                  {locale === "tr"
                    ? "DİZİN NAVİGASYONU"
                    : locale === "ru"
                    ? "НАВИГАЦИЯ ПО РЕЕСТРУ"
                    : locale === "de"
                    ? "VERZEICHNIS-FILTER"
                    : "DIRECTORY NAVIGATION"}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                {locale === "tr"
                  ? "Bölüm ve Görev Bazlı Arama"
                  : locale === "ru"
                  ? "Поиск по отделам и обязанностям"
                  : locale === "de"
                  ? "Abteilungen & Positionen"
                  : "Department & Role Directory"}
              </h2>
            </div>

            {/* Live Search Input with Golden Border */}
            <div className="w-full md:w-96 relative">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4af37]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={content.searchPlaceholder[locale]}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#040f1a] border-2 border-[#d4af37] text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#f3e5ab] focus:shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {content.categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count =
                cat.id === "all"
                  ? content.roles.length
                  : content.roles.filter((r) => r.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#040f1a] shadow-[0_0_15px_rgba(212,175,55,0.4)] border-2 border-[#f3e5ab] font-bold"
                      : "bg-[#040f1a] text-white/80 hover:text-white border border-[#d4af37]/40 hover:border-[#d4af37]"
                  }`}
                >
                  <span>{cat.name[locale]}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive
                        ? "bg-[#040f1a] text-[#f3e5ab]"
                        : "bg-[#0b243d] text-[#d4af37]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 text-xs text-white/60 font-light flex items-center justify-between">
            <span>
              {locale === "tr"
                ? `Toplam 49 görevden ${filteredRoles.length} tanesi gösteriliyor`
                : locale === "ru"
                ? `Отображено ${filteredRoles.length} из 49 должностей`
                : locale === "de"
                ? `Zeige ${filteredRoles.length} von 49 Positionen`
                : `Showing ${filteredRoles.length} of 49 distinguished roles`}
            </span>
            {(selectedCategory !== "all" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="text-[#d4af37] hover:underline font-semibold"
              >
                {locale === "tr"
                  ? "Filtreleri Temizle"
                  : locale === "ru"
                  ? "Сбросить фильтры"
                  : locale === "de"
                  ? "Filter zurücksetzen"
                  : "Reset Filters"}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. THE 49 MANAGEMENT & PERSONNEL DIRECTORY CARDS                   */}
      {/* Each card with Golden Headlines and Golden Framed Descriptions     */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#040f1a] via-[#081a2c] to-[#040f1a] text-white">
        <div className="container max-w-7xl px-4 sm:px-6">
          {filteredRoles.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#040f1a] border-2 border-[#d4af37]/40 text-center max-w-lg mx-auto space-y-4 shadow-[0_0_25px_rgba(212,175,55,0.15)]">
              <Search size={40} className="text-[#d4af37] mx-auto opacity-70" />
              <h3 className="font-serif text-xl font-medium text-[#f3e5ab]">
                {content.noResults[locale]}
              </h3>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0b243d] border-2 border-[#d4af37] text-xs font-bold text-[#f3e5ab] hover:bg-[#0e3153]"
              >
                {locale === "tr" ? "Tüm Kadroyu Göster" : locale === "ru" ? "Показать все" : locale === "de" ? "Alle anzeigen" : "Show All Positions"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {filteredRoles.map((role: ManagementPersonnelRole) => {
                const isGeneralManager = role.id === 1;
                const isGeneralStaff = role.id === 49;
                const isMedical = role.id === 46;

                return (
                  <div
                    key={role.id}
                    id={`role-${role.id}`}
                    className={`rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b243d]/95 via-[#040f1a] to-[#0b243d]/95 border-2 ${
                      isGeneralManager
                        ? "border-[#f3e5ab] shadow-[0_0_35px_rgba(212,175,55,0.35)] lg:col-span-2"
                        : isMedical
                        ? "border-red-400/80 shadow-[0_0_30px_rgba(248,113,113,0.25)]"
                        : "border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.18)]"
                    } p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#f3e5ab] hover:shadow-[0_0_35px_rgba(212,175,55,0.3)]`}
                  >
                    <div className="space-y-4">
                      {/* Top Row: Role Number & Category Pill */}
                      <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#d4af37]/30">
                        <div className="flex items-center gap-3">
                          {/* Role Number Pill */}
                          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#040f1a] border-2 border-[#d4af37] text-[#f3e5ab] shadow">
                            #{String(role.id).padStart(2, "0")}
                          </span>

                          {/* Category Tag */}
                          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#d4af37] bg-[#0b243d] border border-[#d4af37]/40 px-2.5 py-0.5 rounded">
                            {content.categories.find((c) => c.id === role.category)?.name[locale] || role.category}
                          </span>
                        </div>

                        {/* Medical or Special Badge */}
                        {isMedical && (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-red-300 bg-red-950/80 border border-red-400/60 px-2.5 py-0.5 rounded-full">
                            <HeartPulse size={12} className="text-red-400" />
                            <span>ON-SITE MEDICAL CARE</span>
                          </span>
                        )}

                        {isGeneralManager && (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#f3e5ab] bg-[#040f1a] border border-[#d4af37] px-2.5 py-0.5 rounded-full">
                            <Crown size={12} className="text-[#d4af37]" />
                            <span>CHIEF EXECUTIVE</span>
                          </span>
                        )}
                      </div>

                      {/* Header with Corresponding Icon & Golden Headline */}
                      <div className="flex items-start gap-4">
                        {/* Corresponding Icon Medallion */}
                        <div
                          className={`w-14 h-14 rounded-2xl ${
                            isMedical
                              ? "bg-red-950/60 border-2 border-red-400 shadow-[0_0_20px_rgba(248,113,113,0.35)]"
                              : "bg-[#040f1a] border-2 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                          } flex items-center justify-center shrink-0 mt-1`}
                        >
                          {getRoleIcon(role.icon, role.id)}
                        </div>

                        <div className="space-y-1 flex-1">
                          {/* Golden Headline */}
                          <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium tracking-wide text-[#f3e5ab] leading-snug">
                            {role.title[locale]}
                          </h3>

                          {/* Subtitle in Champagne Gold */}
                          <p className="font-serif italic text-sm sm:text-base text-[#d4af37] font-medium">
                            {role.subtitle[locale]}
                          </p>
                        </div>
                      </div>

                      {/* -------------------------------------------------------- */}
                      {/* GOLDEN FRAME FOR DESCRIPTION                              */}
                      {/* -------------------------------------------------------- */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#040f1a]/95 border-2 border-[#d4af37]/70 shadow-[inset_0_1px_10px_rgba(0,0,0,0.6)]">
                        <p className="text-xs sm:text-sm text-white/90 font-light leading-relaxed">
                          {role.description[locale]}
                        </p>
                      </div>

                      {/* General Manager: 11 Principal Responsibilities */}
                      {role.responsibilities && (
                        <div className="pt-2 space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f3e5ab]">
                            <Award size={14} className="text-[#d4af37]" />
                            <span>
                              {locale === "tr"
                                ? "BAŞLICA SORUMLULUKLAR"
                                : locale === "ru"
                                ? "КЛЮЧЕВЫЕ ОБЯЗАННОСТИ"
                                : locale === "de"
                                ? "HAUPTVERANTWORTLICHKEITEN"
                                : "PRINCIPAL RESPONSIBILITIES"}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {role.responsibilities[locale]?.map((resp: string, idx: number) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#040f1a] border border-[#d4af37]/40 text-xs text-white/85"
                              >
                                <Check
                                  size={14}
                                  className="text-[#d4af37] shrink-0 mt-0.5 font-bold"
                                />
                                <span className="leading-snug">{resp}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* General Staff: 9 Core Professional Expectations */}
                      {role.standards && (
                        <div className="pt-2 space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f3e5ab]">
                            <Heart size={14} className="text-[#d4af37]" />
                            <span>
                              {locale === "tr"
                                ? "TÜM PERSONELİMİZDEN BEKLENEN ASİL NİTELİKLER"
                                : locale === "ru"
                                ? "ЭТИЧЕСКИЙ КОДЕКС И СТАНДАРТЫ ПЕРСОНАЛА"
                                : locale === "de"
                                ? "VERPFLICHTENDE STANDARDS ALLER MITARBEITER"
                                : "CORE PROFESSIONAL STANDARDS EXPECTED OF EVERY EMPLOYEE"}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {role.standards[locale]?.map((std: string, idx: number) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#040f1a] border border-[#d4af37]/40 text-xs text-white/85"
                              >
                                <Star
                                  size={13}
                                  className="text-[#d4af37] shrink-0 mt-0.5 fill-[#d4af37]"
                                />
                                <span className="leading-snug">{std}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. GRAND "OUR SERVICE PHILOSOPHY" CONCLUDING PAVILION              */}
      {/* Framed in magnificent gold, embodying 5-star prestige               */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 sm:py-24 bg-[#030c16] text-white border-t-2 border-[#d4af37]">
        <div className="container max-w-7xl px-4 sm:px-6">
          <div className="rounded-3xl p-6 sm:p-10 lg:p-14 bg-gradient-to-b from-[#0b243d] via-[#040f1a] to-[#0b243d] border-2 border-[#d4af37] shadow-[0_0_50px_rgba(212,175,55,0.35)] relative overflow-hidden space-y-10">
            {/* Header with Guiding Creed Badge */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#040f1a] border-2 border-[#d4af37] text-[11px] font-bold uppercase tracking-widest text-[#f3e5ab] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <Crown size={14} className="text-[#d4af37]" />
                <span>{content.philosophy.badge[locale]}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-wide text-white">
                {content.philosophy.title[locale]}
              </h2>

              <p className="font-serif italic text-lg sm:text-2xl text-[#d4af37]">
                {content.philosophy.subtitle[locale]}
              </p>

              <p className="text-xs sm:text-sm text-white/85 font-light leading-relaxed pt-2">
                {content.philosophy.lead[locale]}
              </p>
            </div>

            {/* 4 Steps of Leadership Alignment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {content.philosophy.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#040f1a] border-2 border-[#d4af37]/70 shadow-md flex flex-col justify-between relative group hover:border-[#f3e5ab] transition-colors"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-[#0b243d] border border-[#d4af37] flex items-center justify-center text-xs font-bold text-[#f3e5ab]">
                      0{idx + 1}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#f3e5ab]">
                      {step.role[locale]}
                    </h4>
                    <p className="text-xs text-white/80 font-light leading-relaxed">
                      {step.duty[locale]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Heart of Hospitality Narrative Box */}
            <div className="p-6 rounded-2xl bg-[#040f1a]/95 border-2 border-[#d4af37] text-center max-w-4xl mx-auto shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <p className="font-serif text-base sm:text-xl text-[#f3e5ab] italic leading-relaxed">
                “{content.philosophy.heartText[locale]}”
              </p>
            </div>

            {/* Four Sacred Pillars */}
            <div className="space-y-4 pt-2">
              <div className="text-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37]">
                  {content.philosophy.pillarsTitle[locale]}
                </span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {content.philosophy.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#040f1a] border-2 border-[#d4af37] text-center shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  >
                    <span className="font-serif text-sm sm:text-base font-bold uppercase tracking-widest text-[#f3e5ab]">
                      {pillar}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Manifesto Commitments */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#040f1a] border border-[#d4af37]/60 space-y-3 max-w-4xl mx-auto">
              {content.philosophy.manifesto[locale]?.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0b243d] border border-[#d4af37] flex items-center justify-center text-[10px] text-[#d4af37] shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 font-light leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Concluding Signature Brand Seal */}
            <div className="text-center pt-4 border-t border-[#d4af37]/40 space-y-2">
              <div className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-[#f3e5ab]">
                ORKA LOTUS BEACH HOTEL
              </div>
              <p className="font-serif italic text-sm sm:text-base text-[#d4af37] max-w-2xl mx-auto">
                {content.philosophy.hotelTagline[locale]}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
