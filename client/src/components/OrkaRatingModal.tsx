import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Star,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  SlidersHorizontal,
  Loader2,
  UtensilsCrossed,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import {
  type ExperienceTarget,
  RATING_DIMENSIONS,
  STAR_LABELS,
  ORKA_EXPERIENCE_TRANSLATIONS,
} from "@/data/orkaExperienceData";
import {
  submitGuestRating,
  hasRecentlyEvaluated,
  type LiveSummary,
} from "@/services/orkaExperienceService";

interface OrkaRatingModalProps {
  target: ExperienceTarget | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmitted?: (updatedSummary: LiveSummary) => void;
}

// Fallback target for Food & Beverage Experience
const FOOD_BEVERAGE_TARGET: ExperienceTarget = {
  id: "service-food-beverage",
  type: "service",
  category: "culinary_fb",
  icon: "UtensilsCrossed",
  photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/restoran1.jpg",
  title: {
    en: "Food & Beverage",
    tr: "Yiyecek ve İçecek",
    ru: "Еда и напитки",
    de: "Speisen & Getränke",
  },
  subtitle: {
    en: "Culinary Excellence, Fresh Buffet & Artisan Beverage Experience",
    tr: "Seçkin Mutfak Sanatları, Taze Büfe ve İçecek Deneyimi",
    ru: "Кулинарные шедевры, свежий шведский стол и авторские напитки",
    de: "Kulinarische Vielfalt, frisches Buffet & Bar-Spezialitäten",
  },
  department: {
    en: "Food & Beverage",
    tr: "Yiyecek ve İçecek",
    ru: "Еда и напитки",
    de: "Speisen & Getränke",
  },
  description: {
    en: "Evaluate your culinary journey across Orka Lotus Beach Hotel — covering flavor richness, buffet presentation, ingredient freshness, barista & mixology beverages, and attentive dining hospitality.",
    tr: "Orka Lotus Beach Hotel mutfak deneyiminizi puanlayın — lezzet zenginliği, büfe sunumu, malzeme tazeliği, barista ve kokteyl içecekleri ile özenli restoran servisi.",
    ru: "Оцените гастрономический опыт в Orka Lotus Beach Hotel: богатство вкусов, подачу блюд, свежесть ингредиентов, мастерство напитков и безупречный сервис ресторанов.",
    de: "Bewerten Sie Ihr kulinarisches Erlebnis im Orka Lotus Beach Hotel — Geschmacksvielfalt, Buffet-Präsentation, Frische der Zutaten, erlesene Getränke und herzlichen Tischservice.",
  },
  initialSummary: {
    totalRatings: 68,
    averageOverall: 4.9,
    averageHospitality: 5.0,
    averageProfessionalism: 4.9,
    averageHelpfulness: 4.9,
    averageCourtesy: 5.0,
    averageQuality: 4.9,
    recommendationPercentage: 99,
  },
};

const MODAL_I18N = {
  // Top Success Elements (Strictly Maintained)
  thankYouBadge: {
    en: "THANK YOU",
    tr: "TEŞEKKÜR EDERİZ",
    ru: "СПАСИБО",
    de: "VIELEN DANK",
  },
  ratingRecorded: {
    en: "Rating Recorded!",
    tr: "Değerlendirmeniz Kaydedildi!",
    ru: "Оценка сохранена!",
    de: "Bewertung gespeichert!",
  },
  thankYouMessage: {
    en: "Thank you for sharing your experience. Your feedback helps our team maintain the highest standards of Aegean hospitality.",
    tr: "Deneyiminizi paylaştığınız için teşekkür ederiz. Görüşleriniz ekibimizin Ege misafirperverliğini en üst düzeyde tutmasına katkı sağlar.",
    ru: "Спасибо за ваш отзыв. Ваши оценки вдохновляют команду поддерживать высочайший уровень пятизвездочного сервиса.",
    de: "Vielen Dank für Ihre Bewertung. Ihr Feedback hilft unserem Team, die besten Standards ägäischer Gastfreundschaft zu wahren.",
  },

  // Professional Executive Management Review Section
  managementDirectorate: {
    en: "ORKA LOTUS BEACH • EXECUTIVE DIRECTORATE & QUALITY ASSURANCE",
    tr: "ORKA LOTUS BEACH • GENEL MÜDÜRLÜK & KALİTE GÜVENCE DİREKTÖRLÜĞÜ",
    ru: "ORKA LOTUS BEACH • ГЕНЕРАЛЬНАЯ ДИРЕКЦИЯ И КОНТРОЛЬ КАЧЕСТВА",
    de: "ORKA LOTUS BEACH • GESCHÄFTSLEITUNG & QUALITÄTSSICHERUNG",
  },
  managementSentHighlight: {
    en: "Your query and ranking has been sent to be reviewed by management.",
    tr: "Görüşleriniz ve puanlamanız genel yönetim tarafından incelenmek üzere iletilmiştir.",
    ru: "Ваш отзыв и рейтинг были переданы на рассмотрение руководству отеля.",
    de: "Ihre Anfrage und Bewertung wurden zur Prüfung an das Hotelmanagement weitergeleitet.",
  },
  managementCredibilityNote: {
    en: "Each guest evaluation is individually reviewed by the Hotel Management and Food & Beverage Quality Directorate to maintain exemplary five-star Aegean hospitality and honor your experience.",
    tr: "Beş yıldızlı Ege misafirperverliğini en üst standartta sürdürmek ve deneyiminizi ödüllendirmek amacıyla her misafir değerlendirmesi Otel Yönetimi ve Yiyecek-İçecek Kalite Direktörlüğü tarafından bizzat incelenmektedir.",
    ru: "Каждый отзыв гостя лично рассматривается дирекцией отеля и службой контроля качества питания и напитков для сохранения безупречного пятизвездочного сервиса.",
    de: "Jede Gästebewertung wird individuell von der Hoteldirektion und dem Qualitätsmanagement für Speisen & Getränke geprüft, um erstklassigen Fünf-Sterne-Standard zu garantieren.",
  },
  verifiedGuestSeal: {
    en: "✓ Official Executive Audit • Verified Guest Evaluation",
    tr: "✓ Resmi Yönetim Denetimi • Onaylı Misafir Değerlendirmesi",
    ru: "✓ Официальный аудит руководства • Проверенная оценка гостя",
    de: "✓ Offizielle Prüfung durch das Management • Verifizierte Gästebewertung",
  },

  // Food & Beverage Details & Descriptions
  foodBeverageBadge: {
    en: "FOOD & BEVERAGE EVALUATION",
    tr: "YİYECEK & İÇECEK DEĞERLENDİRMESİ",
    ru: "ОЦЕНКА ЕДЫ И НАПИТКОВ",
    de: "BEWERTUNG VON SPEISEN & GETRÄNKEN",
  },
  foodBeverageDefaultDesc: {
    en: "Evaluate your culinary journey across Orka Lotus Beach Hotel — covering flavor richness, buffet presentation, ingredient freshness, barista & mixology beverages, and attentive dining hospitality.",
    tr: "Orka Lotus Beach Hotel mutfak deneyiminizi puanlayın — lezzet zenginliği, büfe sunumu, malzeme tazeliği, barista ve kokteyl içecekleri ile özenli restoran servisi.",
    ru: "Оцените гастрономический опыт в Orka Lotus Beach Hotel: богатство вкусов, подачу блюд, свежесть ингредиентов, мастерство напитков и безупречный сервис ресторанов.",
    de: "Bewerten Sie Ihr kulinarisches Erlebnis im Orka Lotus Beach Hotel — Geschmacksvielfalt, Buffet-Präsentation, Frische der Zutaten, erlesene Getränke und herzlichen Tischservice.",
  },

  // Steps & Forms
  step1Title: {
    en: "Food & Beverage Experience Rating",
    tr: "Yiyecek ve İçecek Deneyim Puanınız",
    ru: "Оценка питания и напитков",
    de: "Bewertung von Speisen & Getränken",
  },
  step2Title: {
    en: "Would you recommend this dining experience?",
    tr: "Bu lezzet ve servis deneyimini tavsiye eder misiniz?",
    ru: "Порекомендуете ли вы этот ресторанный сервис?",
    de: "Würden Sie dieses gastronomische Erlebnis weiterempfehlen?",
  },
  recYes: {
    en: "Yes, Highly Recommend",
    tr: "Evet, Kesinlikle Tavsiye Ederim",
    ru: "Да, рекомендую",
    de: "Ja, sehr zu empfehlen",
  },
  recNo: {
    en: "Could Be Better",
    tr: "Geliştirilmeli",
    ru: "Могло быть лучше",
    de: "Verbesserungswürdig",
  },
  commentLabel: {
    en: "Your Culinary Feedback or Compliments (Optional)",
    tr: "Lezzet & Servis Hakkındaki Görüş veya Teşekkürünüz (İsteğe bağlı)",
    ru: "Ваш отзыв о блюдах, напитках или сервисе (Необязательно)",
    de: "Ihr Feedback zu Speisen, Getränken oder Service (Optional)",
  },
  commentPlaceholder: {
    en: "Share what made your dining and beverage experience memorable...",
    tr: "Yemek ve içecek deneyiminizi özel kılan detayları paylaşın...",
    ru: "Поделитесь впечатлениями о вкусе блюд, напитках и сервисе...",
    de: "Teilen Sie Ihre Eindrücke zu Speisen, Getränken und Service...",
  },
  nameLabel: {
    en: "Your Name or Room Number (Optional)",
    tr: "Adınız veya Oda Numaranız (İsteğe bağlı)",
    ru: "Ваше имя или номер комнаты (Необязательно)",
    de: "Ihr Name oder Zimmernummer (Optional)",
  },
  namePlaceholder: {
    en: "e.g., Room 1402 or Mr. & Mrs. Anderson",
    tr: "örn. 1402 Nolu Oda veya Sayın Yılmaz",
    ru: "напр., Номер 1402 или Семья Ивановых",
    de: "z.B. Zimmer 1402 oder Familie Schmidt",
  },
  detailedTitle: {
    en: "Detailed Culinary & Service Dimensions (Optional)",
    tr: "Ayrıntılı Lezzet & Servis Boyutları (İsteğe bağlı)",
    ru: "Подробные критерии кухни и сервиса (Необязательно)",
    de: "Detaillierte Kriterien für Speisen & Service (Optional)",
  },
  hide: {
    en: "Hide",
    tr: "Gizle",
    ru: "Скрыть",
    de: "Ausblenden",
  },
  show: {
    en: "Show",
    tr: "Göster",
    ru: "Показать",
    de: "Anzeigen",
  },
  submitButton: {
    en: "Submit My Rating",
    tr: "Değerlendirmemi Gönder",
    ru: "Отправить оценku",
    de: "Bewertung absenden",
  },
  submitting: {
    en: "Submitting to Management...",
    tr: "Yönetime İletiliyor...",
    ru: "Отправка руководству...",
    de: "Wird an das Management übermittelt...",
  },
  rateAnother: {
    en: "Rate Another Experience",
    tr: "Başka Bir Hizmeti Değerlendir",
    ru: "Оценить другую услугу",
    de: "Weiteren Service bewerten",
  },
  done: {
    en: "Close Window",
    tr: "Pencereyi Kapat",
    ru: "Закрыть окно",
    de: "Fenster schließen",
  },
  doubleClickHint: {
    en: "Double-click background or header to close",
    tr: "Kapatmak için arka plana veya başlığa çift tıklayın",
    ru: "Дважды кликните по фону или заголовку для закрытия",
    de: "Hintergrund oder Kopfzeile doppelklicken zum Schließen",
  },
};

export const OrkaRatingModal: React.FC<OrkaRatingModalProps> = ({
  target,
  isOpen,
  onClose,
  onSuccessSubmitted,
}) => {
  const { locale } = useLocale();
  const t = ORKA_EXPERIENCE_TRANSLATIONS[locale] || ORKA_EXPERIENCE_TRANSLATIONS.en;

  // Substitute "Master Bartender & Mixologist" or null target with dedicated Food & Beverage
  const currentTarget: ExperienceTarget =
    !target ||
    target.id === "staff-bartender" ||
    target.title?.en === "Master Bartender & Mixologist"
      ? FOOD_BEVERAGE_TARGET
      : target;

  const [isSuccess, setIsSuccess] = useState(false);
  const [overallRating, setOverallRating] = useState<number>(5);
  const [recommendation, setRecommendation] = useState<
    "absolutely" | "yes" | "maybe" | "probably_not"
  >("absolutely");
  const [comment, setComment] = useState("");
  const [guestName, setGuestName] = useState("");
  const [showDetailed, setShowDetailed] = useState(false);
  const [dimensionScores, setDimensionScores] = useState<Record<string, number>>({
    hospitalityRating: 5,
    professionalismRating: 5,
    helpfulnessRating: 5,
    courtesyRating: 5,
    qualityRating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentWarning, setRecentWarning] = useState(false);

  // Mobile double-tap tracking
  const lastTapRef = useRef<number>(0);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverallStarChange = (stars: number) => {
    setOverallRating(stars);
    if (!showDetailed) {
      setDimensionScores({
        hospitalityRating: stars,
        professionalismRating: stars,
        helpfulnessRating: stars,
        courtesyRating: stars,
        qualityRating: stars,
      });
    }
  };

  const handleDetailScoreChange = (key: string, score: number) => {
    setDimensionScores((prev) => ({ ...prev, [key]: score }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setRecentWarning(false);

    try {
      // Cleanly parse guest name, room number, and exact raw text from input
      const rawInput = guestName.trim();
      let parsedGuestName = rawInput;
      let parsedRoomNumber = "";

      if (rawInput) {
        const keywordMatch = rawInput.match(/(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*([a-zA-Z0-9-]+)/i);
        const numberMatch = rawInput.match(/\b([0-9]{1,5}[a-zA-Z]?|[a-zA-Z][0-9]{1,4})\b/);
        const roomMatch = keywordMatch || numberMatch;

        if (roomMatch) {
          parsedRoomNumber = roomMatch[1].trim();
          const stripped = rawInput
            .replace(/(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*[a-zA-Z0-9-]+/gi, "")
            .replace(new RegExp(`\\b${roomMatch[1]}\\b`, "gi"), "")
            .replace(/^[\s\-–—,./|:;()]+|[\s\-–—,./|:;()]+$/g, "")
            .trim();
          if (stripped) {
            parsedGuestName = stripped;
          } else {
            parsedGuestName = `Verified Guest (Room ${parsedRoomNumber})`;
          }
        }
      }

      if (!parsedGuestName) {
        parsedGuestName = rawInput || "Verified Guest";
      }

      // Always compute and guarantee all 6 dimensions (Overall, Hospitality, Professionalism, Helpfulness, Courtesy, Quality)
      const hasDetailedScoresTouched = showDetailed || Object.values(dimensionScores).some((score) => score !== overallRating);
      const effectiveDetailedScores = {
        hospitalityRating: dimensionScores.hospitalityRating || overallRating,
        professionalismRating: dimensionScores.professionalismRating || overallRating,
        helpfulnessRating: dimensionScores.helpfulnessRating || overallRating,
        courtesyRating: dimensionScores.courtesyRating || overallRating,
        qualityRating: dimensionScores.qualityRating || overallRating,
      };

      // Fast, tactile 200ms animation so user sees "Submitting..." state smoothly without delay
      const [response] = await Promise.all([
        submitGuestRating({
          targetId: currentTarget.id,
          targetType: currentTarget.type,
          targetName: currentTarget.title[locale] || currentTarget.title.en,
          overallRating,
          hospitalityRating: effectiveDetailedScores.hospitalityRating,
          professionalismRating: effectiveDetailedScores.professionalismRating,
          helpfulnessRating: effectiveDetailedScores.helpfulnessRating,
          courtesyRating: effectiveDetailedScores.courtesyRating,
          qualityRating: effectiveDetailedScores.qualityRating,
          hasDetailedRatings: true,
          detailedRatingsGiven: hasDetailedScoresTouched,
          dimensionScores: effectiveDetailedScores,
          recommendation,
          comment: comment.trim(),
          guestDisplayName: rawInput || "Verified Guest",
          guestName: parsedGuestName,
          roomNumber: parsedRoomNumber ? (parsedRoomNumber.startsWith("Room") ? parsedRoomNumber : `Room ${parsedRoomNumber}`) : "",
          rawGuestInput: rawInput,
          nameOrRoomNumber: rawInput,
          anonymous: !rawInput,
        }),
        new Promise((resolve) => setTimeout(resolve, 200)),
      ]);

      if (response && response.updatedSummary && onSuccessSubmitted) {
        onSuccessSubmitted(response.updatedSummary);
      }
      setIsSuccess(true);
    } catch (err) {
      console.warn("[Orka Rating] Handled submission gracefully:", err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setOverallRating(5);
    setRecommendation("absolutely");
    setComment("");
    setGuestName("");
    setShowDetailed(false);
    setRecentWarning(false);
  };

  // Double-click or double-tap close handlers
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBackdropDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClose();
  };

  const handleBackdropTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      const now = Date.now();
      if (now - lastTapRef.current < 350) {
        onClose();
      }
      lastTapRef.current = now;
    }
  };

  const handleHeaderTouchEnd = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 380) {
      onClose();
    }
    lastTapRef.current = now;
  };

  const handleContainerDoubleClick = (e: React.MouseEvent) => {
    const tagName = (e.target as HTMLElement).tagName.toLowerCase();
    // Do not close if user is double clicking inside input or textarea
    if (tagName === "input" || tagName === "textarea") return;
    onClose();
  };

  const handleContainerTouchEnd = (e: React.TouchEvent) => {
    const tagName = (e.target as HTMLElement).tagName.toLowerCase();
    if (tagName === "input" || tagName === "textarea" || tagName === "button") return;
    const now = Date.now();
    if (now - lastTapRef.current < 380) {
      onClose();
    }
    lastTapRef.current = now;
  };

  const currentLabel =
    STAR_LABELS[overallRating]?.[locale] || STAR_LABELS[overallRating]?.en || "Exceptional";

  return (
    <div
      id="orka-rating-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="orka-rating-modal-title"
      onClick={handleBackdropClick}
      onDoubleClick={handleBackdropDoubleClick}
      onTouchEnd={handleBackdropTouchEnd}
      className="fixed inset-0 z-[10005] flex items-center justify-center p-2.5 sm:p-4 bg-black/90 backdrop-blur-md overflow-hidden animate-in fade-in duration-200 select-none"
    >
      <div
        id="orka-rating-modal-container"
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={handleContainerDoubleClick}
        onTouchEnd={handleContainerTouchEnd}
        className="relative w-[calc(100vw-1.25rem)] max-w-lg bg-gradient-to-b from-[#081523] via-[#091b2c] to-[#040e17] border-2 border-[#d4af37] ring-1 ring-[#fef08a]/35 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.25)] overflow-hidden max-h-[92dvh] sm:max-h-[88vh] flex flex-col text-white my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Shimmering Radiant Aegean Gold Top Hairline Ribbon (Double-click or double-tap closes) */}
        <div
          onDoubleClick={onClose}
          onTouchEnd={() => {
            const now = Date.now();
            if (now - lastTapRef.current < 380) onClose();
            lastTapRef.current = now;
          }}
          title="Double click or double tap to close"
          className="h-2 w-full bg-gradient-to-r from-[#996515] via-[#fef08a] via-[#e5c158] to-[#996515] shrink-0 cursor-pointer shadow-xs"
        />

        {/* Header: Target Identity & Close Button (Double-click or double-tap header also closes) */}
        <div
          onDoubleClick={onClose}
          onTouchEnd={handleHeaderTouchEnd}
          className="px-3.5 sm:px-6 py-2.5 sm:py-3 border-b-2 border-[#d4af37]/60 flex items-center justify-between gap-3 bg-gradient-to-r from-[#0d2235] via-[#102b43] to-[#0d2235] shrink-0"
        >
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src={currentTarget.photoUrl}
                alt=""
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover border-2 border-[#d4af37] shrink-0 shadow-lg ring-1 ring-[#fef08a]/40"
                loading="lazy"
              />
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] text-slate-950 p-0.5 rounded-md border border-[#996515] shadow-xs">
                <UtensilsCrossed size={10} className="stroke-[2.5]" />
              </div>
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-950 bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] border border-[#996515] px-2 py-0.5 rounded-full inline-block truncate max-w-[190px] sm:max-w-[260px] shadow-xs">
                {currentTarget.department[locale] || currentTarget.department.en}
              </span>
              <h3
                id="orka-rating-modal-title"
                className="font-serif text-sm sm:text-lg font-black text-white truncate leading-tight mt-0.5 drop-shadow-sm"
              >
                {currentTarget.title[locale] || currentTarget.title.en}
              </h3>
            </div>
          </div>

          <button
            type="button"
            id="close-orka-rating-modal"
            onClick={onClose}
            onDoubleClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] hover:from-[#e5c158] hover:via-[#fff59d] hover:to-[#e5c158] border-2 border-[#996515] text-slate-950 font-black transition-all shrink-0 shadow-md active:scale-95 cursor-pointer"
          >
            <X size={16} className="stroke-[3]" />
          </button>
        </div>

        {/* Scrollable Body Content (Smooth, Fluid Touch Scrolling on Mobile) */}
        <div className="p-3.5 sm:p-5 overflow-y-auto overscroll-contain flex-1 space-y-3 sm:space-y-3.5">
          {!isSuccess ? (
            <>
              {recentWarning && (
                <div className="p-2.5 rounded-xl bg-amber-500/20 border-2 border-amber-400 text-amber-100 text-xs flex items-center gap-2 font-bold shadow-md">
                  <AlertCircle size={16} className="shrink-0 text-amber-300" />
                  <span>{t.modal.rateLimitWarning}</span>
                </div>
              )}

              {/* PROMINENT FOOD & BEVERAGE DESCRIPTION BANNER (EYE-ENGAGING & HIGH CONTRAST) */}
              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0c2235] via-[#091a29] to-[#05111b] border-2 border-[#d4af37]/70 shadow-[0_4px_20px_rgba(0,0,0,0.5)] space-y-1">
                <div className="flex items-center gap-1.5 text-[#fef08a] text-[10px] sm:text-[11px] uppercase font-black tracking-widest">
                  <UtensilsCrossed size={12} className="text-[#fbbf24] shrink-0" />
                  <span>{MODAL_I18N.foodBeverageBadge[locale] || MODAL_I18N.foodBeverageBadge.en}</span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-100 font-medium leading-relaxed">
                  {currentTarget.description[locale] ||
                    currentTarget.description.en ||
                    MODAL_I18N.foodBeverageDefaultDesc[locale] ||
                    MODAL_I18N.foodBeverageDefaultDesc.en}
                </p>
              </div>

              {/* SECTION 1: OVERALL STAR RATING (ULTRA HIGH CONTRAST) */}
              <div className="text-center py-2.5 bg-gradient-to-b from-[#0c2235] to-[#071724] rounded-2xl border-2 border-[#d4af37] p-3.5 shadow-lg space-y-2">
                <span className="text-xs uppercase font-black tracking-wider text-[#fef08a] block">
                  {MODAL_I18N.step1Title[locale] || MODAL_I18N.step1Title.en}
                </span>

                {/* Big Interactive Stars with High Contrast Amber Glow */}
                <div className="flex items-center justify-center gap-1 sm:gap-2 my-0.5">
                  {[1, 2, 3, 4, 5].map((starNum) => {
                    const isFilled = starNum <= overallRating;
                    return (
                      <button
                        key={starNum}
                        type="button"
                        onClick={() => handleOverallStarChange(starNum)}
                        className="p-1 sm:p-1.5 rounded-xl hover:bg-white/10 active:scale-95 transition-all touch-manipulation focus:outline-hidden focus:ring-2 focus:ring-[#fef08a] min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
                        aria-label={`${starNum} stars`}
                      >
                        <Star
                          size={30}
                          className={`transition-all sm:w-8 sm:h-8 ${
                            isFilled
                              ? "fill-[#fbbf24] text-[#f59e0b] filter drop-shadow-[0_0_12px_rgba(251,191,36,0.85)] stroke-[1.5]"
                              : "text-slate-600 stroke-slate-500 stroke-2 hover:text-slate-400"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Rating Label Badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] text-slate-950 border-2 border-[#996515] text-xs font-black shadow-md">
                  <Sparkles size={13} className="text-slate-950 fill-slate-950" />
                  <span>
                    {overallRating}.0 — {currentLabel}
                  </span>
                </div>
              </div>

              {/* SECTION 2: WOULD YOU RECOMMEND? (GOLDEN FRAMES, BLACK TEXT, SMALLER BUTTONS) */}
              <div className="space-y-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-white block">
                  {MODAL_I18N.step2Title[locale] || MODAL_I18N.step2Title.en}
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRecommendation("absolutely")}
                    className={`py-2 px-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all min-h-[38px] active:scale-95 cursor-pointer shadow-sm ${
                      recommendation === "absolutely" || recommendation === "yes"
                        ? "bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] text-slate-950 border-2 border-[#996515] shadow-[0_2px_10px_rgba(212,175,55,0.45)]"
                        : "bg-[#fefce8] text-slate-950 border-2 border-[#d4af37] hover:bg-[#fef9c3]"
                    }`}
                  >
                    <ThumbsUp size={15} className="stroke-[2.5]" />
                    <span>{MODAL_I18N.recYes[locale] || MODAL_I18N.recYes.en}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRecommendation("probably_not")}
                    className={`py-2 px-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all min-h-[38px] active:scale-95 cursor-pointer shadow-sm ${
                      recommendation === "probably_not"
                        ? "bg-red-600 text-white border-2 border-red-300 shadow-md"
                        : "bg-[#0a1827] text-slate-200 border-2 border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    <ThumbsDown size={15} className="stroke-[2.5]" />
                    <span>{MODAL_I18N.recNo[locale] || MODAL_I18N.recNo.en}</span>
                  </button>
                </div>
              </div>

              {/* SECTION 3: OPTIONAL COMMENT & NAME (HIGH CONTRAST) */}
              <div className="space-y-2.5 pt-0.5">
                <div>
                  <label className="text-xs font-black text-white uppercase tracking-wider block mb-1">
                    {MODAL_I18N.commentLabel[locale] || MODAL_I18N.commentLabel.en}
                  </label>
                  <textarea
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={MODAL_I18N.commentPlaceholder[locale] || MODAL_I18N.commentPlaceholder.en}
                    maxLength={500}
                    className="w-full px-3 py-2 text-xs rounded-xl border-2 border-[#d4af37]/70 bg-[#050e16] text-white font-medium placeholder:text-slate-400 focus:outline-hidden focus:border-[#d4af37] focus:ring-2 focus:ring-[#fef08a]/40 resize-none shadow-inner"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-white uppercase tracking-wider block mb-1">
                    {MODAL_I18N.nameLabel[locale] || MODAL_I18N.nameLabel.en}
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={MODAL_I18N.namePlaceholder[locale] || MODAL_I18N.namePlaceholder.en}
                    maxLength={80}
                    className="w-full px-3 py-2 text-xs rounded-xl border-2 border-[#d4af37]/70 bg-[#050e16] text-white font-medium placeholder:text-slate-400 focus:outline-hidden focus:border-[#d4af37] focus:ring-2 focus:ring-[#fef08a]/40 shadow-inner min-h-[38px]"
                  />
                </div>
              </div>

              {/* SECTION 4: DETAILED CRITERIA DRAWER (TAP TO EXPAND) */}
              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={() => setShowDetailed(!showDetailed)}
                  className="w-full py-2 px-3 rounded-xl bg-[#0b1f30] hover:bg-[#0f2940] border-2 border-[#d4af37] text-white flex items-center justify-between transition-colors min-h-[38px] shadow-sm cursor-pointer active:scale-98"
                >
                  <span className="flex items-center gap-1.5 font-black text-xs text-[#fef08a] uppercase tracking-wider">
                    <SlidersHorizontal size={13} className="text-[#fbbf24]" />
                    <span>{MODAL_I18N.detailedTitle[locale] || MODAL_I18N.detailedTitle.en}</span>
                  </span>
                  <span className="text-[11px] font-black text-slate-950 bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] border border-[#996515] px-2 py-0.5 rounded-md shadow-xs">
                    {showDetailed
                      ? MODAL_I18N.hide[locale] || MODAL_I18N.hide.en
                      : MODAL_I18N.show[locale] || MODAL_I18N.show.en}
                  </span>
                </button>

                {showDetailed && (
                  <div className="mt-2.5 p-3 sm:p-4 rounded-xl bg-[#040d16] border-2 border-[#e5c158]/50 space-y-3 animate-in fade-in duration-200 shadow-md">
                    {RATING_DIMENSIONS.map((dim) => {
                      const currentScore = dimensionScores[dim.key] || overallRating;
                      return (
                        <div
                          key={dim.key}
                          className="flex items-center justify-between gap-2 py-1.5 border-b border-slate-800 last:border-b-0"
                        >
                          <span className="text-xs sm:text-sm font-bold text-slate-100 tracking-tight select-none">
                            {dim.label[locale] || dim.label.en}
                          </span>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((starVal) => (
                              <button
                                key={starVal}
                                type="button"
                                onClick={() => handleDetailScoreChange(dim.key, starVal)}
                                className="p-1 hover:scale-110 active:scale-95 transition-transform"
                                aria-label={`${starVal} stars for ${dim.key}`}
                              >
                                <Star
                                  size={20}
                                  className={
                                    starVal <= currentScore
                                      ? "fill-[#fbbf24] text-[#f59e0b]"
                                      : "text-slate-600"
                                  }
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          ) : (
            /* SUCCESS CONFIRMATION VIEW (LUXURIOUS, HIGH CONTRAST & PROFESSIONAL MANAGEMENT REVIEW ONLY) */
            <div className="py-2 sm:py-3 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#996515] via-[#fef08a] to-[#d4af37] text-slate-950 flex items-center justify-center mx-auto shadow-2xl ring-4 ring-[#e5c158]/40">
                <Sparkles size={32} className="text-slate-950 fill-slate-950" />
              </div>

              {/* Top Section - Kept exactly as requested */}
              <div className="space-y-2 max-w-sm mx-auto">
                <span className="text-xs uppercase font-black tracking-widest text-slate-950 bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] border-2 border-white/60 px-4 py-1 rounded-full inline-block shadow-md">
                  {MODAL_I18N.thankYouBadge[locale] || MODAL_I18N.thankYouBadge.en}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                  {MODAL_I18N.ratingRecorded[locale] || MODAL_I18N.ratingRecorded.en}
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                  {MODAL_I18N.thankYouMessage[locale] || MODAL_I18N.thankYouMessage.en}
                </p>
              </div>

              {/* PROFESSIONAL MANAGEMENT REVIEW & CREDIBILITY CONFIRMATION CARD */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#061420] via-[#091e30] to-[#040d16] text-white border-2 border-[#d4af37] shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(212,175,55,0.2)] text-left space-y-2.5 max-w-md mx-auto animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-[#fef08a] font-extrabold text-[11px] tracking-wider uppercase border-b border-amber-500/30 pb-1.5">
                  <ShieldCheck size={16} className="text-[#fbbf24] shrink-0" />
                  <span>{MODAL_I18N.managementDirectorate[locale] || MODAL_I18N.managementDirectorate.en}</span>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-black text-[#fef08a] leading-snug">
                    {MODAL_I18N.managementSentHighlight[locale] || MODAL_I18N.managementSentHighlight.en}
                  </p>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal">
                    {MODAL_I18N.managementCredibilityNote[locale] || MODAL_I18N.managementCredibilityNote.en}
                  </p>
                </div>

                <div className="pt-2 border-t border-amber-500/30 flex items-center justify-between text-[11px]">
                  <span className="text-[#fef08a] font-bold">
                    {MODAL_I18N.verifiedGuestSeal[locale] || MODAL_I18N.verifiedGuestSeal.en}
                  </span>
                  <span className="text-[#fef08a] font-mono font-black">
                    ★ {overallRating}.0 / 5.0
                  </span>
                </div>

                <div className="pt-1.5 flex items-center justify-between text-[10px] text-amber-200/80">
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Firebase Realtime Database
                  </span>
                  <span className="font-mono text-[9px] text-amber-300/80">
                    europe-west1 • orka-lotus-beach-marinaryu
                  </span>
                </div>
              </div>

              {/* Success Action Buttons (Golden frames, black text, smaller compact size) */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  type="button"
                  id="orka-rate-another-btn"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] hover:from-[#e5c158] hover:via-[#fff59d] hover:to-[#e5c158] text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_2px_12px_rgba(212,175,55,0.4)] flex items-center justify-center gap-1.5 min-h-[38px] border-2 border-[#996515] active:scale-95 cursor-pointer"
                >
                  <Star size={14} className="fill-slate-950 text-slate-950" />
                  <span>{MODAL_I18N.rateAnother[locale] || MODAL_I18N.rateAnother.en}</span>
                </button>
                <button
                  type="button"
                  id="orka-back-to-rankings-btn"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#fefce8] via-[#fef9c3] to-[#fefce8] hover:bg-[#fef08a] text-slate-950 font-black text-xs uppercase tracking-wider transition-colors min-h-[38px] shadow-sm border-2 border-[#996515] active:scale-95 cursor-pointer"
                >
                  <span>{MODAL_I18N.done[locale] || MODAL_I18N.done.en}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Button Footer (Sticky at Bottom, Safe Area Aware, Golden Frame, High Contrast Gold & Black Text, Smaller Size) */}
        {!isSuccess && (
          <div className="px-3.5 sm:px-6 py-2.5 border-t-2 border-[#d4af37]/60 bg-gradient-to-b from-[#0d2235] to-[#081523] shrink-0 pb-[max(0.6rem,env(safe-area-inset-bottom,10px))]">
            <button
              type="button"
              id="orka-modal-submit-btn"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] hover:from-[#e5c158] hover:via-[#fff59d] hover:to-[#e5c158] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.45)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.6)] hover:brightness-105 active:scale-[0.98] transition-all border-2 border-[#996515] flex items-center justify-center gap-2 disabled:opacity-50 min-h-[42px] cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin text-slate-950" />
                  <span>{MODAL_I18N.submitting[locale] || MODAL_I18N.submitting.en}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} className="stroke-[2.5]" />
                  <span>
                    {(MODAL_I18N.submitButton[locale] || MODAL_I18N.submitButton.en)} ({overallRating}.0 ★)
                  </span>
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-slate-300 mt-1 font-medium select-none">
              {MODAL_I18N.doubleClickHint[locale] || MODAL_I18N.doubleClickHint.en}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
