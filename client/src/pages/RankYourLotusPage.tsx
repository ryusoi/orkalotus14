import React, { useState, useEffect } from "react";
import {
  Star,
  Sparkles,
  ShieldCheck,
  KeyRound,
  UtensilsCrossed,
  Wine,
  Umbrella,
  Waves,
  Smile,
  Music,
  Bed,
  Palmtree,
  Sailboat,
  Award,
  HeartHandshake,
  HeartPulse,
  ShoppingBag,
  Database,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { useLocale } from "@/contexts/LocaleContext";
import {
  OVERALL_LOTUS_TARGET,
  RATE_YOUR_LOTUS_SEGMENTS,
  type ExperienceTarget,
} from "@/data/orkaExperienceData";
import {
  fetchLiveRatingSummaries,
  type LiveSummary,
} from "@/services/orkaExperienceService";
import { OrkaRatingModal } from "@/components/OrkaRatingModal";
import { FirebaseSyncStatusModal } from "@/components/FirebaseSyncStatusModal";

const PAGE_TEXTS = {
  headerTag: {
    en: "ORKA LOTUS BEACH • MARMARIS",
    tr: "ORKA LOTUS BEACH • MARMARİS",
    ru: "ORKA LOTUS BEACH • МАРМАРИС",
    de: "ORKA LOTUS BEACH • MARMARIS",
  },
  title: {
    en: "Rate Your Lotus",
    tr: "Rate Your Lotus",
    ru: "Rate Your Lotus",
    de: "Rate Your Lotus",
  },
  subtitle: {
    en: "Your five-star evaluation shapes the pinnacle of Aegean luxury",
    tr: "Beş yıldızlı değerlendirmeniz Ege lüksünün zirvesini şekillendiriyor",
    ru: "Ваша пятизвездочная оценка помогает поддерживать безупречный сервис",
    de: "Ihre 5-Sterne-Bewertung prägt den Höhepunkt ägäischer Gastfreundschaft",
  },
  overallSectionBadge: {
    en: "OVERALL RESORT EVALUATION",
    tr: "GENEL OTEL DEĞERLENDİRMESİ",
    ru: "ОБЩАЯ ОЦЕНКА КУРОРТА",
    de: "GESAMTBEWERTUNG DES RESORTS",
  },
  overallTitle: {
    en: "Overall Lotus Stars",
    tr: "Genel Lotus Yıldızları",
    ru: "Общие звезды Lotus",
    de: "Gesamte Lotus-Sterne",
  },
  overallSubtitle: {
    en: "5-Star Ultra All Inclusive Aegean Resort Harmony",
    tr: "5 Yıldızlı Ultra Her Şey Dahil Ege Ruhunun Ahengi",
    ru: "Пятизвездочный ультра все включено на Эгейском море",
    de: "Fünf-Sterne Ultra All-Inclusive Ägäis-Erlebnis",
  },
  rateOverallBtn: {
    en: "Rate Overall Lotus Stay",
    tr: "Genel Konaklamayı Puanla",
    ru: "Оценить общий отдых",
    de: "Gesamten Aufenthalt bewerten",
  },
  verifiedSeal: {
    en: "Verified Guest Evaluations • Executive Directorate Review",
    tr: "Onaylı Misafir Değerlendirmeleri • Genel Müdürlük İncelemesi",
    ru: "Проверенные отзывы гостей • Контроль дирекции отеля",
    de: "Verifizierte Gästebewertungen • Prüfung durch die Geschäftsleitung",
  },
  rateButton: {
    en: "Rate",
    tr: "Puanla",
    ru: "Оценить",
    de: "Bewerten",
  },
  reviews: {
    en: "reviews",
    tr: "değerlendirme",
    ru: "отзывов",
    de: "Bewertungen",
  },
  satisfactionGoal: {
    en: "Your Satisfaction Is Our Goal",
    tr: "Memnuniyetiniz Bizim Hedefimizdir",
    ru: "Ваше удовлетворение — наша цель",
    de: "Ihre Zufriedenheit ist unser Ziel",
  },
};

const renderSegmentIcon = (iconName: string, size = 18) => {
  switch (iconName) {
    case "KeyRound":
      return <KeyRound size={size} />;
    case "UtensilsCrossed":
      return <UtensilsCrossed size={size} />;
    case "Wine":
      return <Wine size={size} />;
    case "Umbrella":
      return <Umbrella size={size} />;
    case "Sparkles":
      return <Sparkles size={size} />;
    case "Waves":
      return <Waves size={size} />;
    case "Smile":
      return <Smile size={size} />;
    case "Music":
      return <Music size={size} />;
    case "Bed":
      return <Bed size={size} />;
    case "Palmtree":
      return <Palmtree size={size} />;
    case "Sailboat":
    case "Compass":
      return <Sailboat size={size} />;
    case "Award":
      return <Award size={size} />;
    case "HeartHandshake":
      return <HeartHandshake size={size} />;
    case "HeartPulse":
      return <HeartPulse size={size} />;
    case "ShoppingBag":
      return <ShoppingBag size={size} />;
    default:
      return <Star size={size} />;
  }
};

export default function RankYourLotusPage() {
  const { locale } = useLocale();

  // Live summaries state from Firebase
  const [summaries, setSummaries] = useState<Record<string, LiveSummary>>({});
  const [hoveredOverallStar, setHoveredOverallStar] = useState<number | null>(null);

  // Modal states
  const [selectedTarget, setSelectedTarget] = useState<ExperienceTarget | null>(null);
  const [initialStars, setInitialStars] = useState<number>(5);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);

  // Load summaries from Firebase
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
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenModal = (target: ExperienceTarget, stars = 5) => {
    setSelectedTarget(target);
    setInitialStars(stars);
    setIsRatingModalOpen(true);
  };

  const handleSuccessfulRating = (updatedSummary: LiveSummary) => {
    setSummaries((prev) => ({
      ...prev,
      [updatedSummary.targetId]: updatedSummary,
    }));
  };

  // Get live summary or fallback for Overall Target
  const overallSummary = summaries[OVERALL_LOTUS_TARGET.id];
  const overallRatingScore = overallSummary
    ? overallSummary.averageOverall
    : OVERALL_LOTUS_TARGET.initialSummary.averageOverall;
  const overallRatingCount = overallSummary
    ? overallSummary.totalRatings
    : OVERALL_LOTUS_TARGET.initialSummary.totalRatings;

  return (
    <PageShell>
      <div className="min-h-screen bg-gradient-to-b from-[#040d16] via-[#071728] to-[#040d17] text-white py-8 sm:py-12 px-3.5 sm:px-6 relative overflow-hidden">
        {/* Subtle Ambient Luxury Gold Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-[#d4af37]/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#d4af37]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#d4af37]/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6 sm:space-y-8">
          {/* HEADER: Highly Dynamic Large Thin-Lined Font Text "Rate Your Lotus" */}
          <div className="text-center space-y-3 pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#0d2235] via-[#102b43] to-[#0d2235] border border-[#d4af37]/60 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <Sparkles size={13} className="text-[#fef08a]" />
              <span className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#fef08a] uppercase">
                {PAGE_TEXTS.headerTag[locale] || PAGE_TEXTS.headerTag.en}
              </span>
              <Sparkles size={13} className="text-[#fef08a]" />
            </div>

            {/* Dynamic Thin-Lined Luxury Title with Gold Shimmer */}
            <div className="relative py-2 sm:py-3">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent -z-10" />
              <h1
                id="rate-your-lotus-title"
                className="font-serif font-extralight tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.35em] text-3xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fff5a0] via-[#fef08a] to-[#d4af37] drop-shadow-[0_2px_25px_rgba(212,175,55,0.45)] uppercase select-none transition-all duration-300"
              >
                {PAGE_TEXTS.title[locale] || PAGE_TEXTS.title.en}
              </h1>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl mx-auto font-medium leading-relaxed px-4">
              {PAGE_TEXTS.subtitle[locale] || PAGE_TEXTS.subtitle.en}
            </p>
          </div>

          {/* MAIN OVERALL RATING SECTION (PROMINENT GOLDEN FRAME WITH LARGER STARS TO FILL) */}
          <div
            id="overall-lotus-rating-card"
            className="border-2 border-[#d4af37] ring-2 ring-[#fef08a]/35 rounded-3xl bg-gradient-to-b from-[#0a1c2e] via-[#071624] to-[#040e17] p-5 sm:p-8 text-center relative overflow-hidden shadow-[0_20px_55px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,55,0.25)] max-w-2xl mx-auto"
          >
            {/* Shimmering Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#996515] via-[#fef08a] via-[#e5c158] to-[#996515]" />

            {/* Corner Ornaments */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#d4af37]" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#d4af37]" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#d4af37]" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#d4af37]" />

            <div className="space-y-3 sm:space-y-4 pt-1">
              <span className="text-[10px] sm:text-[11px] font-black tracking-[0.25em] text-[#fef08a] uppercase bg-gradient-to-r from-[#d4af37]/20 via-[#fef08a]/30 to-[#d4af37]/20 border border-[#d4af37]/50 px-3 py-1 rounded-full inline-block shadow-xs">
                {PAGE_TEXTS.overallSectionBadge[locale] || PAGE_TEXTS.overallSectionBadge.en}
              </span>

              <div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-sm">
                  {PAGE_TEXTS.overallTitle[locale] || PAGE_TEXTS.overallTitle.en}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                  {PAGE_TEXTS.overallSubtitle[locale] || PAGE_TEXTS.overallSubtitle.en}
                </p>
              </div>

              {/* Verified Rating Score Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] text-slate-950 font-black text-xs sm:text-sm shadow-md border border-[#996515]">
                <Star size={15} className="fill-slate-950 text-slate-950" />
                <span>
                  ★ {overallRatingScore.toFixed(1)} / 5.0
                </span>
                <span className="text-slate-800 text-xs font-bold">
                  ({overallRatingCount} {PAGE_TEXTS.reviews[locale] || PAGE_TEXTS.reviews.en})
                </span>
              </div>

              {/* LARGER STARS TO FILL (HIGHLY VISUAL, TACTILE & GOLDEN) */}
              <div className="py-2">
                <div className="flex items-center justify-center gap-2 sm:gap-4 my-1">
                  {[1, 2, 3, 4, 5].map((starNum) => {
                    const activeRating = hoveredOverallStar !== null ? hoveredOverallStar : 5;
                    const isFilled = starNum <= activeRating;

                    return (
                      <button
                        key={starNum}
                        type="button"
                        onClick={() => handleOpenModal(OVERALL_LOTUS_TARGET, starNum)}
                        onMouseEnter={() => setHoveredOverallStar(starNum)}
                        onMouseLeave={() => setHoveredOverallStar(null)}
                        className="p-1 sm:p-2 rounded-2xl hover:bg-white/10 active:scale-95 transition-all touch-manipulation focus:outline-hidden focus:ring-2 focus:ring-[#fef08a] min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer group"
                        aria-label={`Rate ${starNum} stars`}
                      >
                        <Star
                          className={`transition-all w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 ${
                            isFilled
                              ? "fill-[#fbbf24] text-[#f59e0b] filter drop-shadow-[0_0_18px_rgba(251,191,36,0.95)] stroke-[1.2] group-hover:scale-110"
                              : "text-slate-600 stroke-slate-500 stroke-2 group-hover:text-slate-400"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Golden Action Button */}
              <div>
                <button
                  type="button"
                  onClick={() => handleOpenModal(OVERALL_LOTUS_TARGET, 5)}
                  className="bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] hover:from-[#e5c158] hover:via-[#fff59d] hover:to-[#e5c158] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl border-2 border-[#996515] shadow-[0_4px_20px_rgba(212,175,55,0.45)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.6)] flex items-center justify-center gap-2 mx-auto active:scale-95 cursor-pointer transition-all"
                >
                  <Star size={16} className="fill-slate-950 text-slate-950" />
                  <span>
                    {PAGE_TEXTS.rateOverallBtn[locale] || PAGE_TEXTS.rateOverallBtn.en}
                  </span>
                </button>
              </div>

              <div className="pt-2 border-t border-[#d4af37]/30 text-[10px] sm:text-xs text-amber-200/80 flex items-center justify-center gap-1.5">
                <ShieldCheck size={14} className="text-[#fbbf24] shrink-0" />
                <span>{PAGE_TEXTS.verifiedSeal[locale] || PAGE_TEXTS.verifiedSeal.en}</span>
              </div>
            </div>
          </div>

          {/* RATINGS LIST: 14 SPECIFIC CATEGORIES EACH IN ITS OWN GOLDEN FRAME */}
          <div className="pt-2 sm:pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
              {RATE_YOUR_LOTUS_SEGMENTS.map((segment) => {
                const live = summaries[segment.id];
                const score = live ? live.averageOverall : segment.initialSummary.averageOverall;
                const total = live ? live.totalRatings : segment.initialSummary.totalRatings;

                return (
                  <div
                    key={segment.id}
                    id={`rating-panel-${segment.id}`}
                    onClick={() => handleOpenModal(segment, 5)}
                    className="border-2 border-[#d4af37] hover:border-[#fef08a] ring-1 ring-[#fef08a]/20 rounded-2xl bg-gradient-to-r from-[#091829] via-[#0c2035] to-[#071524] p-3 sm:p-3.5 shadow-[0_6px_20px_rgba(0,0,0,0.6),0_0_15px_rgba(212,175,55,0.12)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.28)] transition-all flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    {/* Left: Icon, Department & Title */}
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="border border-[#d4af37] bg-[#05111c] text-[#fef08a] p-2 sm:p-2.5 rounded-xl shrink-0 shadow-xs group-hover:scale-105 group-hover:border-[#fef08a] transition-all">
                        {renderSegmentIcon(segment.icon, 18)}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#e5c158] font-bold uppercase tracking-wider block truncate">
                          {segment.department[locale] || segment.department.en}
                        </span>
                        <h3 className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-[#fef08a] transition-colors leading-tight truncate mt-0.5">
                          {segment.title[locale] || segment.title.en}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-300 mt-0.5 font-medium">
                          <span className="text-[#fbbf24] font-black">★ {score.toFixed(1)}</span>
                          <span className="text-slate-400">({total})</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Small Sized Luxurious Style Golden Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(segment, 5);
                      }}
                      className="bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] hover:from-[#e5c158] hover:via-[#fff59d] hover:to-[#e5c158] text-slate-950 font-black text-xs uppercase tracking-wider px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border-2 border-[#996515] shadow-md flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer transition-all"
                    >
                      <Star size={12} className="fill-slate-950 text-slate-950" />
                      <span>{PAGE_TEXTS.rateButton[locale] || PAGE_TEXTS.rateButton.en}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* LUXURY BANNER: 'Your Satisfaction Is Our Goal' in shining gold yellow shining in high definition dynamic word by word */}
          <div className="pt-6 sm:pt-8 pb-3 text-center">
            <button
              type="button"
              onClick={() => setIsFirebaseModalOpen(true)}
              className="group relative inline-flex items-center gap-2.5 sm:gap-3.5 px-6 sm:px-9 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#051321] via-[#0c243a] to-[#051321] border-2 border-[#d4af37] hover:border-[#fef08a] ring-2 ring-[#fef08a]/25 hover:ring-[#fef08a]/45 shadow-[0_4px_30px_rgba(0,0,0,0.85),0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.6)] transition-all cursor-pointer"
              title="Orka Lotus Beach Quality Commitment (Click to view live database sync status)"
            >
              {/* Subtle Golden Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d4af37]/10 via-[#fef08a]/20 to-[#d4af37]/10 blur-sm pointer-events-none group-hover:opacity-100 transition-opacity" />

              <Sparkles size={16} className="text-[#fbbf24] animate-pulse shrink-0 drop-shadow-[0_0_8px_rgba(251,191,36,0.85)]" />

              {/* Dynamic Word-by-Word Shining Text in High Definition */}
              <div className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2.5 text-xs sm:text-sm md:text-base font-serif font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase select-none">
                {(PAGE_TEXTS.satisfactionGoal[locale] || PAGE_TEXTS.satisfactionGoal.en)
                  .split(" ")
                  .map((word, idx) => (
                    <span
                      key={idx}
                      className="animate-gold-word"
                      style={{
                        animationDelay: `${idx * 0.42}s`,
                      }}
                    >
                      {word}
                    </span>
                  ))}
              </div>

              <Sparkles size={16} className="text-[#fbbf24] animate-pulse shrink-0 drop-shadow-[0_0_8px_rgba(251,191,36,0.85)]" />
            </button>
          </div>
        </div>
      </div>

      {/* DEDICATED GOLDEN MODAL */}
      <OrkaRatingModal
        target={selectedTarget}
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        onSuccessSubmitted={handleSuccessfulRating}
        initialOverallStars={initialStars}
      />

      {/* FIREBASE CLOUD STATUS MODAL */}
      <FirebaseSyncStatusModal
        isOpen={isFirebaseModalOpen}
        onClose={() => setIsFirebaseModalOpen(false)}
      />
    </PageShell>
  );
}
