import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Award,
  Star,
  Sparkles,
  ThumbsUp,
  Search,
  ArrowUpDown,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  Trophy,
  Database,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { useLocale } from "@/contexts/LocaleContext";
import {
  ALL_EXPERIENCE_TARGETS,
  DEFAULT_HOTEL_SERVICES,
  DEFAULT_MANAGEMENT_PROFILES,
  DEFAULT_STAFF_PROFILES,
  type ExperienceTarget,
  type TargetType,
  ORKA_EXPERIENCE_TRANSLATIONS,
} from "@/data/orkaExperienceData";
import {
  fetchLiveRatingSummaries,
  calculateExecutiveInsights,
  type LiveSummary,
} from "@/services/orkaExperienceService";
import { OrkaRatingModal } from "@/components/OrkaRatingModal";
import { FirebaseSyncStatusModal } from "@/components/FirebaseSyncStatusModal";

const AWARDS = [
  {
    title: {
      en: "TripAdvisor Travellers' Choice 2025",
      tr: "TripAdvisor Travellers' Choice 2025",
      ru: "TripAdvisor Travellers' Choice 2025",
      de: "TripAdvisor Travellers' Choice 2025",
    },
    desc: {
      en: "Top 10% beachfront resorts worldwide for hospitality excellence.",
      tr: "Dünya genelinde lüks sahil tesisleri arasında ilk %10'da yer almaktadır.",
      ru: "Входит в топ-10% лучших прибрежных курортов мира по отзывам гостей.",
      de: "Unter den besten 10 % der weltweiten Luxus-Strandresorts.",
    },
  },
  {
    title: {
      en: "Blue Flag International Certificate",
      tr: "Uluslararası Mavi Bayrak Sertifikası",
      ru: "Международный сертификат «Голубой флаг»",
      de: "Internationales Zertifikat «Blaue Flagge»",
    },
    desc: {
      en: "Certified coastal water purity and Aegean beach environmental standards.",
      tr: "Ege kıyılarımızda üstün deniz suyu berraklığı ve yüksek çevre standartları.",
      ru: "Кристальная чистота воды и экологические стандарты пляжа.",
      de: "Hervorragende Wasserqualität und strenge Umweltstandards.",
    },
  },
  {
    title: {
      en: "HolidayCheck Recommended Award",
      tr: "HolidayCheck Tavsiye Ödülü",
      ru: "Награда HolidayCheck Recommended",
      de: "HolidayCheck Recommended Award",
    },
    desc: {
      en: "98% verified guest recommendation across European holiday evaluations.",
      tr: "Avrupalı tatilcilerin değerlendirmelerinde %98 misafir tavsiye oranı.",
      ru: "98% рекомендаций по проверенным отзывам европейских туристов.",
      de: "98 % Weiterempfehlungsquote europäischer Urlaubsgäste.",
    },
  },
  {
    title: {
      en: "Green Key Eco-Tourism Award",
      tr: "Green Key Çevre ve Ekoturizm Ödülü",
      ru: "Экологический знак Green Key",
      de: "Green Key Öko-Tourismus-Zertifikat",
    },
    desc: {
      en: "Certified sustainable hospitality, solar energy, and regional sourcing.",
      tr: "Sürdürülebilir turizm, güneş enerjisi ve yerel tarım ürünleri desteği.",
      ru: "Экологическая устойчивость и бережное отношение к природе.",
      de: "Zertifiziert für Nachhaltigkeit, Solarenergie und regionale Produkte.",
    },
  },
];

const PAGE_I18N = {
  verifiedNotice: {
    en: "Live Verified Guest Ratings & Cloud Storage",
    tr: "Canlı Onaylı Misafir Puanları & Bulut Senkronizasyonu",
    ru: "Проверенные оценки гостей в режиме реального времени",
    de: "Verifizierte Live-Gästebewertungen & Cloud-Speicherung",
  },
  hotelScore: {
    en: "Hotel Score",
    tr: "Otel Puanı",
    ru: "Рейтинг отеля",
    de: "Hotel-Score",
  },
  recommend: {
    en: "Recommend",
    tr: "Tavsiye",
    ru: "Рекомендуют",
    de: "Empfehlung",
  },
  guestReviews: {
    en: "Guest Reviews",
    tr: "Değerlendirmeler",
    ru: "Отзывы гостей",
    de: "Bewertungen",
  },
  topRanked: {
    en: "Top Ranked",
    tr: "Zirvedekiler",
    ru: "Топ рейтинга",
    de: "Top-Platziert",
  },
  clear: {
    en: "Clear",
    tr: "Temizle",
    ru: "Сбросить",
    de: "Löschen",
  },
  awardsBadge: {
    en: "INTERNATIONAL RECOGNITION",
    tr: "ULUSLARARASI TANINIRLIK",
    ru: "МЕЖДУНАРОДНОЕ ПРИЗНАНИЕ",
    de: "INTERNATIONALE ANERKENNUNG",
  },
  awardsTitle: {
    en: "Hospitality Accreditations",
    tr: "Misafirperverlik Akreditasyonları",
    ru: "Награды и сертификаты",
    de: "Akkreditierungen & Auszeichnungen",
  },
  verifiedDistinction: {
    en: "Verified Distinction",
    tr: "Onaylı Başarı",
    ru: "Подтвержденная награда",
    de: "Zertifizierte Auszeichnung",
  },
};

export default function RankYourLotusPage() {
  const { locale, setLocale } = useLocale();
  const t = ORKA_EXPERIENCE_TRANSLATIONS[locale] || ORKA_EXPERIENCE_TRANSLATIONS.en;

  // Live summaries state from Firestore
  const [summaries, setSummaries] = useState<Record<string, LiveSummary>>({});
  const [, setLoadingSummaries] = useState(true);

  // Filter & Search state
  const [activeTab, setActiveTab] = useState<"all" | TargetType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "highestRated" | "mostRated" | "mostRecommended" | "alphabetical"
  >("highestRated");

  // Category buttons slider ref & scroll toggles
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollBounds = () => {
    const el = tabsScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    checkScrollBounds();
    const handleResize = () => checkScrollBounds();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSlideLeft = () => {
    if (tabsScrollRef.current) {
      tabsScrollRef.current.scrollBy({ left: -140, behavior: "smooth" });
      setTimeout(checkScrollBounds, 320);
    }
  };

  const handleSlideRight = () => {
    if (tabsScrollRef.current) {
      tabsScrollRef.current.scrollBy({ left: 140, behavior: "smooth" });
      setTimeout(checkScrollBounds, 320);
    }
  };

  // Modals state
  const [ratingTarget, setRatingTarget] = useState<ExperienceTarget | null>(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);

  // Load summaries from Firestore
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const liveData = await fetchLiveRatingSummaries();
        if (isMounted) {
          setSummaries(liveData);
        }
      } catch (err) {
        console.error("[Orka Experience] Failed to load rating summaries:", err);
      } finally {
        if (isMounted) {
          setLoadingSummaries(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenRateModal = (target: ExperienceTarget) => {
    setRatingTarget(target);
    setIsRatingModalOpen(true);
  };

  const handleSuccessfulRating = (updatedSummary: LiveSummary) => {
    setSummaries((prev) => ({
      ...prev,
      [updatedSummary.targetId]: updatedSummary,
    }));
  };

  // Executive Insights calculation
  const insights = useMemo(() => {
    return calculateExecutiveInsights(ALL_EXPERIENCE_TARGETS, summaries);
  }, [summaries]);

  // Filtered and Sorted list
  const filteredTargets = useMemo(() => {
    return ALL_EXPERIENCE_TARGETS.filter((item) => {
      // Tab filter
      if (activeTab !== "all" && item.type !== activeTab) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = (item.title[locale] || item.title.en).toLowerCase().includes(query);
        const subtitleMatch = (item.subtitle[locale] || item.subtitle.en).toLowerCase().includes(query);
        const deptMatch = (item.department[locale] || item.department.en).toLowerCase().includes(query);
        const descMatch = (item.description[locale] || item.description.en).toLowerCase().includes(query);
        return titleMatch || subtitleMatch || deptMatch || descMatch;
      }
      return true;
    }).sort((a, b) => {
      const summaryA = summaries[a.id] || {
        averageOverall: a.initialSummary.averageOverall,
        totalRatings: a.initialSummary.totalRatings,
        recommendationPercentage: a.initialSummary.recommendationPercentage,
      };
      const summaryB = summaries[b.id] || {
        averageOverall: b.initialSummary.averageOverall,
        totalRatings: b.initialSummary.totalRatings,
        recommendationPercentage: b.initialSummary.recommendationPercentage,
      };

      if (sortBy === "highestRated") {
        return summaryB.averageOverall - summaryA.averageOverall;
      }
      if (sortBy === "mostRated") {
        return summaryB.totalRatings - summaryA.totalRatings;
      }
      if (sortBy === "mostRecommended") {
        return summaryB.recommendationPercentage - summaryA.recommendationPercentage;
      }
      if (sortBy === "alphabetical") {
        const nameA = a.title[locale] || a.title.en;
        const nameB = b.title[locale] || b.title.en;
        return nameA.localeCompare(nameB);
      }
      return 0;
    });
  }, [activeTab, searchQuery, sortBy, summaries, locale]);

  // Top Ranked Leaderboard (Top 5 items prioritized as requested)
  const leaderboardItems = useMemo(() => {
    const TOP_5_PRIORITY_IDS = [
      "staff-guest-relations-officer", // 🥇 Guest Relations Hostess (5.0)
      "service-overall-hospitality",   // 🥈 Overall Orka Hospitality (4.9)
      "service-reception",             // 🥉 Reception & Check-in (4.9)
      "staff-bartender",               // 4 Food & Beverage (4.9)
      "service-beach",                 // 5 Private Beach & Jetties (4.9)
    ];

    const priorityItems = TOP_5_PRIORITY_IDS
      .map((id) => ALL_EXPERIENCE_TARGETS.find((t) => t.id === id))
      .filter((t): t is ExperienceTarget => Boolean(t));

    return [...priorityItems].sort((a, b) => {
      const sA = summaries[a.id] || a.initialSummary;
      const sB = summaries[b.id] || b.initialSummary;
      if (sB.averageOverall !== sA.averageOverall) {
        return sB.averageOverall - sA.averageOverall;
      }
      return sB.totalRatings - sA.totalRatings;
    });
  }, [summaries]);

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      <div className="orka-experience-page bg-[var(--paper,#fcfaf6)] text-[var(--ink,#1e293b)] min-h-screen pb-28 sm:pb-24 overflow-x-hidden">
        {/* STREAMLINED MOBILE-FRIENDLY HERO */}
        <section
          id="orka-experience-hero"
          className="relative bg-gradient-to-b from-[#0b1622] via-[#132337] to-[#1c2e42] text-white pt-16 sm:pt-24 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
          {/* Subtle Ambient Gold Light */}
          <div className="absolute top-0 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-[#c5a880]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-[#e4bd77]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-3.5 sm:space-y-4">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-[#e4bd77]/40 text-[#e4bd77] text-[11px] font-bold uppercase tracking-wider shadow-xs">
              <Sparkles size={13} className="text-[#e4bd77]" />
              <span>{t.badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {t.title}
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-xs sm:text-sm font-semibold tracking-wide uppercase text-[#c5a880] max-w-xl mx-auto">
              {t.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-white/75 font-sans leading-relaxed max-w-2xl mx-auto line-clamp-2 sm:line-clamp-none">
              {t.supportingText}
            </p>

            {/* Live Verified Transparency Notice */}
            <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-[#e4bd77]/90 font-medium">
              <ShieldCheck size={14} className="text-[#e4bd77]" />
              <span>{PAGE_I18N.verifiedNotice[locale] || PAGE_I18N.verifiedNotice.en}</span>
            </div>
          </div>
        </section>

        {/* 3-METRIC SUMMARY STRIP (Clean & Mobile-Optimized) */}
        <section
          id="orka-executive-insights"
          className="max-w-4xl mx-auto px-3 sm:px-6 -mt-6 sm:-mt-8 relative z-20"
        >
          <div className="bg-[var(--paper,#ffffff)] border border-[#e4bd77]/40 rounded-2xl shadow-lg p-3.5 sm:p-5 backdrop-blur-md">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center divide-x divide-[var(--line,#e2e8f0)]">
              {/* Metric 1: Overall Hotel Score */}
              <div className="px-1 sm:px-3">
                <span className="text-[10px] sm:text-xs text-[var(--ink-soft,#64748b)] font-medium block truncate">
                  {PAGE_I18N.hotelScore[locale] || PAGE_I18N.hotelScore.en}
                </span>
                <div className="flex items-center justify-center gap-1 mt-0.5 text-amber-500">
                  <Star size={16} className="fill-amber-500 shrink-0" />
                  <span className="font-serif text-lg sm:text-2xl font-extrabold text-[var(--ink,#0f172a)]">
                    {insights.overallHotelRating.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-[var(--ink-soft,#94a3b8)] hidden sm:inline">/5.0</span>
                </div>
              </div>

              {/* Metric 2: Recommendation */}
              <div className="px-1 sm:px-3">
                <span className="text-[10px] sm:text-xs text-[var(--ink-soft,#64748b)] font-medium block truncate">
                  {PAGE_I18N.recommend[locale] || PAGE_I18N.recommend.en}
                </span>
                <div className="flex items-center justify-center gap-1 mt-0.5 text-emerald-700 dark:text-emerald-300">
                  <ThumbsUp size={15} className="shrink-0" />
                  <span className="font-serif text-lg sm:text-2xl font-extrabold">
                    {insights.recommendationRate}%
                  </span>
                </div>
              </div>

              {/* Metric 3: Total Evaluations */}
              <div className="px-1 sm:px-3">
                <span className="text-[10px] sm:text-xs text-[var(--ink-soft,#64748b)] font-medium block truncate">
                  {PAGE_I18N.guestReviews[locale] || PAGE_I18N.guestReviews.en}
                </span>
                <div className="flex items-center justify-center gap-1 mt-0.5 text-[#916b32]">
                  <CheckCircle2 size={15} className="shrink-0" />
                  <span className="font-serif text-lg sm:text-2xl font-extrabold text-[var(--ink,#0f172a)]">
                    {insights.totalEvaluations}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Cloud RTDB Sync Status Bar */}
            <div className="mt-3 pt-2.5 border-t border-[var(--line,#e2e8f0)] flex items-center justify-between text-[11px] text-[var(--ink-soft,#64748b)]">
              <div className="flex items-center gap-1.5 truncate">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-medium truncate text-slate-700">Firebase Realtime DB: europe-west1</span>
              </div>
              <button
                type="button"
                id="orka-firebase-status-trigger-btn"
                onClick={() => setIsFirebaseModalOpen(true)}
                className="text-[#916b32] hover:text-[#745322] font-bold inline-flex items-center gap-1 hover:underline cursor-pointer ml-2 shrink-0"
              >
                <Database size={12} />
                <span>Live Sync & Rules</span>
              </button>
            </div>
          </div>
        </section>

        {/* MOBILE-FIRST TOP PERFORMERS LEADERBOARD */}
        <section
          id="orka-excellence-leaderboard"
          className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12"
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] border-2 border-[#996515] px-3 py-1 rounded-full shadow-xs mb-1.5">
                <Trophy size={14} className="text-slate-950 stroke-[2.5]" />
                <span>{PAGE_I18N.topRanked[locale] || PAGE_I18N.topRanked.en}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-[#996515] bg-gradient-to-r from-[#996515] via-[#d4af37] to-[#85530f] bg-clip-text text-transparent drop-shadow-xs">
                {t.leaderboard.title}
              </h2>
            </div>
            <span className="text-xs font-black text-slate-950 bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] px-3 py-1 rounded-full border-2 border-[#996515] shadow-xs">
              Top 5
            </span>
          </div>

          {/* Touch-Friendly Leaderboard Cards List (Popup Window Styling: Deep Aegean Navy Canvas, Golden Frames, White/Gold High-Contrast Text, Golden Buttons) */}
          <div className="space-y-3">
            {leaderboardItems.map((item, index) => {
              const sm = summaries[item.id] || item.initialSummary;
              const rankMedals = ["🥇", "🥈", "🥉", "4", "5"];
              const rankFrame =
                index === 0
                  ? "border-2 border-[#fef08a] ring-2 ring-[#d4af37]/60 shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_28px_rgba(212,175,55,0.35)]"
                  : "border-2 border-[#d4af37] ring-1 ring-[#fef08a]/35 shadow-[0_10px_30px_rgba(0,0,0,0.65),0_0_20px_rgba(212,175,55,0.18)]";

              return (
                <div
                  key={item.id}
                  className={`relative overflow-hidden p-2.5 sm:p-3.5 rounded-2xl bg-gradient-to-b from-[#081523] via-[#091b2c] to-[#040e17] ${rankFrame} hover:border-[#fef08a] transition-all flex items-center justify-between gap-2 sm:gap-3 text-white`}
                >
                  {/* Top Shimmering Aegean Gold Accent Ribbon */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#996515] via-[#fef08a] via-[#e5c158] to-[#996515]" />

                  {/* Left: Medal & Thumbnail & Full Name */}
                  <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                    <span className="font-black text-base sm:text-lg w-6 sm:w-7 text-center shrink-0 flex items-center justify-center drop-shadow-md">
                      {index < 3 ? (
                        rankMedals[index]
                      ) : (
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] text-slate-950 border border-[#996515] flex items-center justify-center text-[10px] sm:text-xs font-black shadow-md">
                          {rankMedals[index]}
                        </span>
                      )}
                    </span>

                    <img
                      src={item.photoUrl}
                      alt=""
                      className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl object-cover border-2 border-[#d4af37] ring-1 ring-[#fef08a]/40 shrink-0 shadow-md"
                      loading="lazy"
                    />

                    <div className="min-w-0 flex-1 pr-1 sm:pr-2">
                      <h4 className="font-serif font-black text-sm sm:text-base text-white text-left leading-snug drop-shadow-sm break-words">
                        {item.title[locale] || item.title.en}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs mt-1">
                        <div className="flex items-center gap-1 text-[#fef08a] font-mono font-black text-xs sm:text-sm">
                          <Star size={12} className="fill-[#fbbf24] text-[#fbbf24] shrink-0" />
                          <span>{sm.averageOverall.toFixed(1)}</span>
                        </div>
                        <span className="text-[#fef08a]/40 font-black">•</span>
                        <span className="text-slate-300 font-sans font-medium text-[11px] sm:text-xs">
                          ({sm.totalRatings})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Golden Frame Rate Button (Better Positioned & Centered) */}
                  <div className="shrink-0 flex items-center pl-1 sm:pl-2">
                    <button
                      type="button"
                      onClick={() => handleOpenRateModal(item)}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] hover:from-[#e5c158] hover:via-[#fff59d] hover:to-[#e5c158] text-slate-950 font-black text-xs uppercase tracking-wider border-2 border-[#996515] shadow-[0_2px_8px_rgba(212,175,55,0.45)] hover:shadow-[0_2px_14px_rgba(212,175,55,0.65)] hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer min-h-[34px]"
                    >
                      <Star size={12} className="fill-slate-950 text-slate-950 shrink-0" />
                      <span>{t.cards.rateButton}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SEARCH, CATEGORY PILLS & SORTING (GOLDEN FRAMES, BLACK HIGH CONTRAST TEXT, SMALLER BUTTONS) */}
        <section
          id="orka-ranking-controls"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14"
        >
          {/* Search Box with Golden Frame */}
          <div className="relative mb-4">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 stroke-[2.5]"
            />
            <input
              type="text"
              id="orka-experience-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-16 py-2.5 sm:py-3 rounded-2xl border-2 border-[#d4af37] focus:border-[#996515] bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-[#fef08a] placeholder:text-slate-500 placeholder:font-medium transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-950 bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] border-2 border-[#996515] px-2.5 py-1 rounded-lg shadow-xs hover:brightness-105 active:scale-95"
              >
                {PAGE_I18N.clear[locale] || PAGE_I18N.clear.en}
              </button>
            )}
          </div>

          {/* Category Slider with Transparent Movement Toggles & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pb-2.5 border-b-2 border-[#d4af37]/40">
            {/* Category Slider with Transparent Left & Right Movement Toggles */}
            <div className="flex items-center gap-1 min-w-0 flex-1 relative">
              {/* Transparent Left Movement Toggle */}
              <button
                type="button"
                onClick={handleSlideLeft}
                disabled={!canScrollLeft}
                aria-label="Slide left"
                title="Slide categories left"
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-transparent hover:bg-black/5 active:bg-black/10 text-slate-700 hover:text-slate-950 transition-all shrink-0 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>

              {/* Scrollable Container with Smaller Sized Dark Blue Buttons Inside Golden Frame & White Font Text */}
              <div
                ref={tabsScrollRef}
                onScroll={checkScrollBounds}
                className="flex items-center gap-1.5 overflow-x-auto scroll-smooth scrollbar-none py-1 px-0.5 select-none flex-1 min-w-0"
              >
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs whitespace-nowrap transition-all active:scale-95 cursor-pointer shrink-0 border ${
                    activeTab === "all"
                      ? "bg-[#0f284e] text-white font-bold border-2 border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)] ring-1 ring-[#fef08a]/50"
                      : "bg-[#0a1628] text-white/90 hover:bg-[#12243d] hover:text-white border-[#d4af37]/60 shadow-xs font-semibold"
                  }`}
                >
                  {t.tabs.all} ({ALL_EXPERIENCE_TARGETS.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("service")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs whitespace-nowrap transition-all active:scale-95 cursor-pointer shrink-0 border ${
                    activeTab === "service"
                      ? "bg-[#0f284e] text-white font-bold border-2 border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)] ring-1 ring-[#fef08a]/50"
                      : "bg-[#0a1628] text-white/90 hover:bg-[#12243d] hover:text-white border-[#d4af37]/60 shadow-xs font-semibold"
                  }`}
                >
                  {t.tabs.services}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("management")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs whitespace-nowrap transition-all active:scale-95 cursor-pointer shrink-0 border ${
                    activeTab === "management"
                      ? "bg-[#0f284e] text-white font-bold border-2 border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)] ring-1 ring-[#fef08a]/50"
                      : "bg-[#0a1628] text-white/90 hover:bg-[#12243d] hover:text-white border-[#d4af37]/60 shadow-xs font-semibold"
                  }`}
                >
                  {t.tabs.management}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("staff")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs whitespace-nowrap transition-all active:scale-95 cursor-pointer shrink-0 border ${
                    activeTab === "staff"
                      ? "bg-[#0f284e] text-white font-bold border-2 border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)] ring-1 ring-[#fef08a]/50"
                      : "bg-[#0a1628] text-white/90 hover:bg-[#12243d] hover:text-white border-[#d4af37]/60 shadow-xs font-semibold"
                  }`}
                >
                  {t.tabs.staff}
                </button>
              </div>

              {/* Transparent Right Movement Toggle */}
              <button
                type="button"
                onClick={handleSlideRight}
                disabled={!canScrollRight}
                aria-label="Slide right"
                title="Slide categories right"
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-transparent hover:bg-black/5 active:bg-black/10 text-slate-700 hover:text-slate-950 transition-all shrink-0 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* Compact Sort Select with Golden Frame & Dark Blue Background */}
            <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 pl-1">
              <ArrowUpDown size={12} className="text-slate-900 stroke-[2.5]" />
              <select
                id="orka-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#0a1628] border border-[#d4af37]/70 rounded-lg px-2 py-1 text-[11px] sm:text-xs font-bold text-white shadow-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37] cursor-pointer"
              >
                <option value="highestRated">{t.sort.highestRated}</option>
                <option value="mostRated">{t.sort.mostRated}</option>
                <option value="mostRecommended">{t.sort.mostRecommended}</option>
                <option value="alphabetical">{t.sort.alphabetical}</option>
              </select>
            </div>
          </div>
        </section>

        {/* COMPACT EXPERIENCE CARDS GRID (DARK BLUE BACKGROUND, GOLDEN FRAMES, WHITE FONT TEXT) */}
        <section
          id="orka-experience-cards-grid"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5"
        >
          {filteredTargets.length === 0 ? (
            <div className="py-12 text-center bg-[#0c1a2e] rounded-xl border-2 border-[#d4af37] p-6 shadow-sm text-white">
              <Search size={28} className="mx-auto text-[#fef08a] mb-2.5" />
              <h4 className="font-serif text-base font-black text-white">
                {t.empty.noResults}
              </h4>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
                className="mt-3.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] text-slate-950 text-xs font-black uppercase tracking-wider border border-[#996515] shadow-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                {t.empty.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredTargets.map((item) => {
                const sm = summaries[item.id] || {
                  targetId: item.id,
                  targetType: item.type,
                  ...item.initialSummary,
                };
                const score = sm.averageOverall || 5.0;
                const count = sm.totalRatings || 0;
                const rec = sm.recommendationPercentage || 100;

                let badgeKey: "new" | "emerging" | "ranked" | "highlyRated" = "new";
                if (count >= 50 && score >= 4.8) badgeKey = "highlyRated";
                else if (count >= 20) badgeKey = "ranked";
                else if (count >= 5) badgeKey = "emerging";
                const badgeText = t.statBadges[badgeKey];

                return (
                  <div
                    key={item.id}
                    id={`orka-card-${item.id}`}
                    className="bg-gradient-to-b from-[#0d1d33] to-[#091424] border-2 border-[#d4af37]/60 hover:border-[#d4af37] rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.35)] hover:shadow-[0_6px_22px_rgba(212,175,55,0.25)] transition-all overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      {/* Compact Image Thumbnail & Header Badges */}
                      <div className="relative h-28 sm:h-32 bg-gradient-to-tr from-[#050c16] to-[#0f213a] overflow-hidden">
                        <img
                          src={item.photoUrl}
                          alt={item.title[locale] || item.title.en}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1d33] via-[#0d1d33]/40 to-black/25" />

                        {/* Top Badges */}
                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1.5">
                          <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#050d18]/85 text-[#fef08a] border border-[#d4af37]/50 backdrop-blur-xs flex items-center gap-1 shadow-xs">
                            {item.type === "service" && <Building2 size={10} />}
                            {item.type === "management" && <Award size={10} />}
                            {item.type === "staff" && <Users size={10} />}
                            <span>{item.department[locale] || item.department.en}</span>
                          </span>
                          <span
                            className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs ${
                              badgeKey === "highlyRated"
                                ? "bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] text-slate-950 font-black border border-[#996515]"
                                : "bg-[#1e293b]/90 text-slate-200 font-semibold border border-slate-500/50"
                            }`}
                          >
                            {badgeText}
                          </span>
                        </div>

                        {/* Title at Bottom of Image */}
                        <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                          <span className="text-[10px] text-[#fef08a] font-semibold block truncate drop-shadow-sm">
                            {item.subtitle[locale] || item.subtitle.en}
                          </span>
                          <h3 className="font-serif text-sm sm:text-base font-bold tracking-tight text-white leading-snug truncate drop-shadow-md">
                            {item.title[locale] || item.title.en}
                          </h3>
                        </div>
                      </div>

                      {/* Compact Card Body with Dark Blue Background & White Font Text */}
                      <div className="p-3 space-y-2">
                        {/* Rating & Recommendation Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-[#1b304c]">
                          <div className="flex items-center gap-1.5">
                            <Star size={14} className="fill-amber-400 text-amber-400" />
                            <span className="font-serif text-base sm:text-lg font-black text-white">
                              {score.toFixed(1)}
                            </span>
                            <span className="text-[11px] text-slate-300 font-semibold">
                              ({count})
                            </span>
                          </div>

                          <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/40">
                            {rec}% {t.cards.recommendBadge}
                          </span>
                        </div>

                        {/* Short Description in Clean White Font */}
                        <p className="text-[11px] sm:text-xs text-slate-200 font-normal leading-relaxed line-clamp-2">
                          {item.description[locale] || item.description.en}
                        </p>
                      </div>
                    </div>

                    {/* Compact Card Footer with ⭐ Rate This Button */}
                    <div className="p-3 pt-0">
                      <button
                        type="button"
                        onClick={() => handleOpenRateModal(item)}
                        className="w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] hover:from-[#e5c158] hover:via-[#fff59d] hover:to-[#e5c158] text-slate-950 font-black text-xs uppercase tracking-wider active:scale-95 transition-all shadow-[0_2px_8px_rgba(212,175,55,0.35)] hover:shadow-[0_2px_12px_rgba(212,175,55,0.5)] flex items-center justify-center gap-1.5 min-h-[32px] border border-[#996515] cursor-pointer"
                      >
                        <Star size={12} className="fill-slate-950 text-slate-950" />
                        <span>{t.cards.rateButton}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* OFFICIAL AWARDS & ACCREDITATIONS (Compact Grid) */}
        <section
          id="orka-hospitality-awards"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-18"
        >
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#916b32]">
              {PAGE_I18N.awardsBadge[locale] || PAGE_I18N.awardsBadge.en}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--ink,#0f172a)] tracking-tight">
              {PAGE_I18N.awardsTitle[locale] || PAGE_I18N.awardsTitle.en}
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {AWARDS.map((award, i) => (
              <div
                key={i}
                className="p-3.5 sm:p-4 rounded-2xl bg-[var(--paper,#ffffff)] border border-[var(--line,#e2e8f0)] hover:border-[#c5a880]/50 transition-colors shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-[#c5a880]/15 text-[#916b32] flex items-center justify-center mb-2.5">
                    <Award size={17} />
                  </div>
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-[var(--ink,#0f172a)] mb-1 leading-snug">
                    {award.title[locale] || award.title.en}
                  </h4>
                  <p className="text-[11px] text-[var(--ink-soft,#64748b)] leading-relaxed line-clamp-3">
                    {award.desc[locale] || award.desc.en}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-[var(--line,#e2e8f0)] flex items-center gap-1 text-[10px] text-[#916b32] font-semibold">
                  <CheckCircle2 size={12} />
                  <span>{PAGE_I18N.verifiedDistinction[locale] || PAGE_I18N.verifiedDistinction.en}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RATING MODAL COMPONENT */}
        <OrkaRatingModal
          target={ratingTarget}
          isOpen={isRatingModalOpen}
          onClose={() => setIsRatingModalOpen(false)}
          onSuccessSubmitted={handleSuccessfulRating}
        />

        {/* FIREBASE REALTIME DATABASE STATUS & RULES MODAL */}
        <FirebaseSyncStatusModal
          isOpen={isFirebaseModalOpen}
          onClose={() => setIsFirebaseModalOpen(false)}
        />
      </div>
    </PageShell>
  );
}
