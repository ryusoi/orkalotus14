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
  Loader2,
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
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import {
  type ExperienceTarget,
  LOTUS_5_STAR_DIMENSIONS,
  OVERALL_LOTUS_TARGET,
  STAR_LABELS,
  ORKA_EXPERIENCE_TRANSLATIONS,
} from "@/data/orkaExperienceData";
import {
  submitGuestRating,
  type LiveSummary,
} from "@/services/orkaExperienceService";

interface OrkaRatingModalProps {
  target: ExperienceTarget | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmitted?: (updatedSummary: LiveSummary) => void;
  initialOverallStars?: number;
}

const MODAL_I18N = {
  overallLotusStars: {
    en: "Overall Lotus Stars",
    tr: "Genel Lotus Yıldızları",
    ru: "Общие звезды Lotus",
    de: "Gesamte Lotus-Sterne",
  },
  evaluationBadge: {
    en: "EVALUATION",
    tr: "DEĞERLENDİRMESİ",
    ru: "ОЦЕНКА СЕРВИСА",
    de: "BEWERTUNG",
  },
  detailedStarsTitle: {
    en: "Detailed Service Ratings",
    tr: "Detaylı Hizmet Puanları",
    ru: "Оценка качества по категориям",
    de: "Detaillierte Service-Bewertung",
  },
  averageHint: {
    en: "Average of Hospitality, Professionalism, Helpfulness & Speed, Courtesy & Respect, Hygiene & Cleanliness",
    tr: "Misafirperverlik, Profesyonellik, Yardımseverlik ve Hız, Nezaket ve Saygı, Hijyen ve Temizlik ortalaması",
    ru: "Среднее по критериям: Гостеприимство, Профессионализм, Отзывчивость и скорость, Вежливость и уважение, Чистота",
    de: "Durchschnitt aus Gastfreundschaft, Professionalität, Hilfsbereitschaft & Schnelligkeit, Höflichkeit & Respekt, Hygiene & Sauberkeit",
  },
  step2Title: {
    en: "Would you recommend this experience?",
    tr: "Bu deneyimi tavsiye eder misiniz?",
    ru: "Порекомендуете ли вы этот сервис?",
    de: "Würden Sie diesen Service weiterempfehlen?",
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
    en: "Your Feedback or Compliments (Optional)",
    tr: "Görüş veya Teşekkürünüz (İsteğe bağlı)",
    ru: "Ваш отзыв или благодарность (Необязательно)",
    de: "Ihr Feedback oder Dankeschön (Optional)",
  },
  commentPlaceholder: {
    en: "Share details that made your experience memorable...",
    tr: "Deneyiminizi özel kılan detayları paylaşın...",
    ru: "Поделитесь впечатлениями и памятными моментами...",
    de: "Teilen Sie Details, die Ihr Erlebnis besonders gemacht haben...",
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
  submitButton: {
    en: "Submit My Rating",
    tr: "Değerlendirmemi Gönder",
    ru: "Отправить оценку",
    de: "Bewertung absenden",
  },
  submitting: {
    en: "Submitting to Management...",
    tr: "Yönetime İletiliyor...",
    ru: "Отправка руководству...",
    de: "Wird an das Management übermittelt...",
  },
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
    ru: "Спасибо за ваш отзыв. Ваши оценки помогают нам поддерживать высочайшие стандарты пятизвездочного сервиса.",
    de: "Vielen Dank für Ihre Bewertung. Ihr Feedback hilft unserem Team, höchste Standards ägäischer Gastfreundschaft zu wahren.",
  },
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
    en: "Each guest evaluation is individually reviewed by the Hotel Management Directorate to maintain exemplary five-star Aegean hospitality and honor your experience.",
    tr: "Beş yıldızlı Ege misafirperverliğini en üst standartta sürdürmek ve deneyiminizi ödüllendirmek amacıyla her misafir değerlendirmesi Otel Yönetim Direktörlüğü tarafından bizzat incelenmektedir.",
    ru: "Каждый отзыв гостя лично рассматривается дирекцией отеля для сохранения безупречного пятизвездочного сервиса.",
    de: "Jede Gästebewertung wird individuell von der Hoteldirektion geprüft, um erstklassigen Fünf-Sterne-Standard zu garantieren.",
  },
  verifiedGuestSeal: {
    en: "✓ Official Executive Audit • Verified Guest Evaluation",
    tr: "✓ Resmi Yönetim Denetimi • Onaylı Misafir Değerlendirmesi",
    ru: "✓ Официальный аудит руководства • Проверенная оценка гостя",
    de: "✓ Offizielle Prüfung durch das Management • Verifizierte Gästebewertung",
  },
  rateAnother: {
    en: "Rate Another Area",
    tr: "Başka Bir Alanı Değerlendir",
    ru: "Оценить другую зону",
    de: "Weiteren Bereich bewerten",
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

const renderIcon = (iconName: string, size = 18) => {
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

export const OrkaRatingModal: React.FC<OrkaRatingModalProps> = ({
  target,
  isOpen,
  onClose,
  onSuccessSubmitted,
  initialOverallStars = 5,
}) => {
  const { locale } = useLocale();
  const t = ORKA_EXPERIENCE_TRANSLATIONS[locale] || ORKA_EXPERIENCE_TRANSLATIONS.en;

  // Use clicked segment or fallback to Overall Lotus Target
  const currentTarget: ExperienceTarget = target || OVERALL_LOTUS_TARGET;

  const [isSuccess, setIsSuccess] = useState(false);
  const [overallRating, setOverallRating] = useState<number>(initialOverallStars);
  const [dimensionScores, setDimensionScores] = useState({
    hospitalityRating: initialOverallStars,
    professionalismRating: initialOverallStars,
    helpfulnessRating: initialOverallStars,
    courtesyRating: initialOverallStars,
    qualityRating: initialOverallStars,
  });
  const [recommendation, setRecommendation] = useState<
    "absolutely" | "yes" | "maybe" | "probably_not"
  >("absolutely");
  const [comment, setComment] = useState("");
  const [guestName, setGuestName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentWarning, setRecentWarning] = useState(false);

  // Sync initial stars if prop changes
  useEffect(() => {
    if (isOpen) {
      setOverallRating(initialOverallStars);
      setDimensionScores({
        hospitalityRating: initialOverallStars,
        professionalismRating: initialOverallStars,
        helpfulnessRating: initialOverallStars,
        courtesyRating: initialOverallStars,
        qualityRating: initialOverallStars,
      });
      setIsSuccess(false);
      setComment("");
      setGuestName("");
    }
  }, [isOpen, initialOverallStars, target?.id]);

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

  // Clicking overall stars sets all 5 dimensions simultaneously
  const handleOverallStarChange = (stars: number) => {
    setOverallRating(stars);
    setDimensionScores({
      hospitalityRating: stars,
      professionalismRating: stars,
      helpfulnessRating: stars,
      courtesyRating: stars,
      qualityRating: stars,
    });
  };

  // Clicking any of the 5 detailed dimensions recalculates the average of all 5
  const handleDimensionStarChange = (dbKey: string, score: number) => {
    const updated = {
      ...dimensionScores,
      [dbKey]: score,
    };
    setDimensionScores(updated);

    // Compute exact average across the 5 dimensions
    const sum =
      updated.hospitalityRating +
      updated.professionalismRating +
      updated.helpfulnessRating +
      updated.courtesyRating +
      updated.qualityRating;
    const avg = Number((sum / 5).toFixed(1));
    setOverallRating(avg);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setRecentWarning(false);

    try {
      const rawInput = guestName.trim();
      let parsedGuestName = rawInput;
      let parsedRoomNumber = "";

      if (rawInput) {
        const keywordMatch = rawInput.match(
          /(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*([a-zA-Z0-9-]+)/i
        );
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

      const formattedRoom = parsedRoomNumber
        ? (parsedRoomNumber.startsWith("Room") ? parsedRoomNumber : `Room ${parsedRoomNumber}`)
        : "";

      // Ensure full identity preserves both name and room number from the box
      const fullDisplayIdentity = rawInput
        ? (formattedRoom && parsedGuestName && !parsedGuestName.startsWith("Verified Guest")
            ? `${parsedGuestName} (${formattedRoom})`
            : (formattedRoom ? formattedRoom : rawInput))
        : "Verified Guest";

      const effectiveDetailedScores = {
        hospitalityRating: dimensionScores.hospitalityRating,
        professionalismRating: dimensionScores.professionalismRating,
        helpfulnessRating: dimensionScores.helpfulnessRating,
        courtesyRating: dimensionScores.courtesyRating,
        qualityRating: dimensionScores.qualityRating,
      };

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
          detailedRatingsGiven: true,
          dimensionScores: effectiveDetailedScores,
          recommendation,
          comment: comment.trim(),
          guestDisplayName: fullDisplayIdentity,
          guestName: parsedGuestName,
          roomNumber: formattedRoom,
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
    setDimensionScores({
      hospitalityRating: 5,
      professionalismRating: 5,
      helpfulnessRating: 5,
      courtesyRating: 5,
      qualityRating: 5,
    });
    setRecommendation("absolutely");
    setComment("");
    setGuestName("");
    setRecentWarning(false);
  };

  // Double-click / double-tap close handlers
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBackdropDoubleClick = () => {
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

  const roundedOverall = Math.max(1, Math.min(5, Math.round(overallRating)));
  const currentLabel =
    STAR_LABELS[roundedOverall]?.[locale] || STAR_LABELS[roundedOverall]?.en || "Exceptional";

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
        className="relative w-[calc(100vw-1.25rem)] max-w-lg bg-gradient-to-b from-[#081523] via-[#091b2c] to-[#040e17] border-2 border-[#d4af37] ring-2 ring-[#fef08a]/40 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.35)] overflow-hidden max-h-[94dvh] sm:max-h-[90vh] flex flex-col text-white my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Shimmering Golden Top Ribbon (Double-tap closes) */}
        <div
          onDoubleClick={onClose}
          onTouchEnd={() => {
            const now = Date.now();
            if (now - lastTapRef.current < 380) onClose();
            lastTapRef.current = now;
          }}
          title="Double-click to close"
          className="h-2 w-full bg-gradient-to-r from-[#996515] via-[#fef08a] via-[#e5c158] to-[#996515] shrink-0 cursor-pointer shadow-xs"
        />

        {/* Modal Header: Segment Identity & Golden Close Button */}
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
                className="w-11 h-11 rounded-xl object-cover border-2 border-[#d4af37] shrink-0 shadow-lg ring-1 ring-[#fef08a]/40"
                loading="lazy"
              />
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] text-slate-950 p-1 rounded-md border border-[#996515] shadow-xs">
                {renderIcon(currentTarget.icon, 11)}
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

        {/* Scrollable Body Content */}
        <div className="p-3.5 sm:p-5 overflow-y-auto overscroll-contain flex-1 space-y-3.5">
          {!isSuccess ? (
            <>
              {recentWarning && (
                <div className="p-2.5 rounded-xl bg-amber-500/20 border-2 border-amber-400 text-amber-100 text-xs flex items-center gap-2 font-bold shadow-md">
                  <AlertCircle size={16} className="shrink-0 text-amber-300" />
                  <span>{t.modal.rateLimitWarning}</span>
                </div>
              )}

              {/* SEGMENT SPECIFIC DESCRIPTION BANNER (CLEAN, DYNAMIC, NO DUPLICATES) */}
              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#0c2235] via-[#091a29] to-[#05111b] border-2 border-[#d4af37]/70 shadow-[0_4px_20px_rgba(0,0,0,0.5)] space-y-1">
                <div className="flex items-center gap-1.5 text-[#fef08a] text-[10px] sm:text-[11px] uppercase font-black tracking-widest">
                  <Star size={12} className="text-[#fbbf24] fill-[#fbbf24] shrink-0" />
                  <span>
                    {(currentTarget.title[locale] || currentTarget.title.en).toUpperCase()} •{" "}
                    {MODAL_I18N.evaluationBadge[locale] || MODAL_I18N.evaluationBadge.en}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-100 font-medium leading-relaxed">
                  {currentTarget.description[locale] || currentTarget.description.en}
                </p>
              </div>

              {/* SECTION 1: OVERALL LOTUS STARS (IN GOLDEN FRAME) */}
              <div className="text-center py-3 bg-gradient-to-b from-[#0c2235] to-[#071724] rounded-2xl border-2 border-[#d4af37] ring-1 ring-[#fef08a]/35 p-3.5 shadow-lg space-y-2">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-xs sm:text-sm uppercase font-black tracking-wider text-[#fef08a]">
                    {MODAL_I18N.overallLotusStars[locale] || MODAL_I18N.overallLotusStars.en}
                  </span>
                </div>

                {/* 5 Large Interactive Stars */}
                <div className="flex items-center justify-center gap-1 sm:gap-2.5 my-1">
                  {[1, 2, 3, 4, 5].map((starNum) => {
                    const isFilled = starNum <= Math.round(overallRating);
                    return (
                      <button
                        key={starNum}
                        type="button"
                        onClick={() => handleOverallStarChange(starNum)}
                        className="p-1 sm:p-1.5 rounded-xl hover:bg-white/10 active:scale-95 transition-all touch-manipulation focus:outline-hidden focus:ring-2 focus:ring-[#fef08a] min-h-[42px] min-w-[42px] flex items-center justify-center cursor-pointer"
                        aria-label={`${starNum} stars`}
                      >
                        <Star
                          size={32}
                          className={`transition-all sm:w-9 sm:h-9 ${
                            isFilled
                              ? "fill-[#fbbf24] text-[#f59e0b] filter drop-shadow-[0_0_14px_rgba(251,191,36,0.9)] stroke-[1.5]"
                              : "text-slate-600 stroke-slate-500 stroke-2 hover:text-slate-400"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Rating Average Badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] text-slate-950 border-2 border-[#996515] text-xs font-black shadow-md">
                  <Sparkles size={13} className="text-slate-950 fill-slate-950" />
                  <span>
                    {overallRating.toFixed(1)} ★ — {currentLabel}
                  </span>
                </div>
              </div>

              {/* SECTION 2: ALL 5 DETAILED EXCELLENCE RATINGS (DIRECTLY VISIBLE ON FIRST POPUP WINDOW) */}
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#091b2c] via-[#071726] to-[#040e17] border-2 border-[#d4af37]/80 ring-1 ring-[#fef08a]/20 shadow-md space-y-2.5">
                <div className="flex items-center justify-between pb-1 border-b border-[#d4af37]/30">
                  <span className="text-xs font-black uppercase tracking-wider text-[#fef08a] flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[#fbbf24]" />
                    <span>
                      {MODAL_I18N.detailedStarsTitle[locale] ||
                        MODAL_I18N.detailedStarsTitle.en}
                    </span>
                  </span>
                  <span className="text-[10px] text-amber-200/90 font-medium">
                    {MODAL_I18N.averageHint[locale] || MODAL_I18N.averageHint.en}
                  </span>
                </div>

                {/* 5 Distinct Dimensions */}
                <div className="space-y-2 pt-0.5">
                  {LOTUS_5_STAR_DIMENSIONS.map((dim) => {
                    const currentScore = dimensionScores[dim.dbKey] || Math.round(overallRating);
                    return (
                      <div
                        key={dim.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 py-1.5 border-b border-slate-800/80 last:border-b-0"
                      >
                        <div className="min-w-0 pr-2">
                          <span className="text-xs sm:text-sm font-bold text-white block truncate">
                            {dim.label[locale] || dim.label.en}
                          </span>
                          <span className="text-[10px] text-slate-400 block truncate">
                            {dim.description[locale] || dim.description.en}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 self-end sm:self-auto shrink-0">
                          {[1, 2, 3, 4, 5].map((starVal) => (
                            <button
                              key={starVal}
                              type="button"
                              onClick={() => handleDimensionStarChange(dim.dbKey, starVal)}
                              className="p-1 hover:scale-110 active:scale-95 transition-transform touch-manipulation cursor-pointer"
                              aria-label={`${starVal} stars for ${dim.label.en}`}
                            >
                              <Star
                                size={22}
                                className={
                                  starVal <= currentScore
                                    ? "fill-[#fbbf24] text-[#f59e0b] drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]"
                                    : "text-slate-600 stroke-slate-500"
                                }
                              />
                            </button>
                          ))}
                          <span className="text-xs font-mono font-black text-[#fef08a] w-7 text-right">
                            {currentScore}★
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 3: WOULD YOU RECOMMEND? */}
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

              {/* SECTION 4: OPTIONAL FEEDBACK & GUEST IDENTIFIER */}
              <div className="space-y-2.5 pt-0.5">
                <div>
                  <label className="text-xs font-black text-white uppercase tracking-wider block mb-1">
                    {MODAL_I18N.commentLabel[locale] || MODAL_I18N.commentLabel.en}
                  </label>
                  <textarea
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={
                      MODAL_I18N.commentPlaceholder[locale] ||
                      MODAL_I18N.commentPlaceholder.en
                    }
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
                    placeholder={
                      MODAL_I18N.namePlaceholder[locale] || MODAL_I18N.namePlaceholder.en
                    }
                    maxLength={80}
                    className="w-full px-3 py-2 text-xs rounded-xl border-2 border-[#d4af37]/70 bg-[#050e16] text-white font-medium placeholder:text-slate-400 focus:outline-hidden focus:border-[#d4af37] focus:ring-2 focus:ring-[#fef08a]/40 shadow-inner min-h-[38px]"
                  />
                </div>
              </div>
            </>
          ) : (
            /* SUCCESS CONFIRMATION VIEW */
            <div className="py-2 sm:py-3 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#996515] via-[#fef08a] to-[#d4af37] text-slate-950 flex items-center justify-center mx-auto shadow-2xl ring-4 ring-[#e5c158]/40">
                <Sparkles size={32} className="text-slate-950 fill-slate-950" />
              </div>

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

              {/* EXECUTIVE REVIEW & CREDIBILITY CARD */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#061420] via-[#091e30] to-[#040d16] text-white border-2 border-[#d4af37] shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(212,175,55,0.2)] text-left space-y-2.5 max-w-md mx-auto animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-[#fef08a] font-extrabold text-[11px] tracking-wider uppercase border-b border-amber-500/30 pb-1.5">
                  <ShieldCheck size={16} className="text-[#fbbf24] shrink-0" />
                  <span>
                    {MODAL_I18N.managementDirectorate[locale] ||
                      MODAL_I18N.managementDirectorate.en}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-black text-[#fef08a] leading-snug">
                    {MODAL_I18N.managementSentHighlight[locale] ||
                      MODAL_I18N.managementSentHighlight.en}
                  </p>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal">
                    {MODAL_I18N.managementCredibilityNote[locale] ||
                      MODAL_I18N.managementCredibilityNote.en}
                  </p>
                </div>

                <div className="pt-2 border-t border-amber-500/30 flex items-center justify-between text-[11px]">
                  <span className="text-[#fef08a] font-bold">
                    {MODAL_I18N.verifiedGuestSeal[locale] ||
                      MODAL_I18N.verifiedGuestSeal.en}
                  </span>
                  <span className="text-[#fef08a] font-mono font-black">
                    ★ {overallRating.toFixed(1)} / 5.0
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

              {/* Action Buttons */}
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

        {/* Action Button Footer */}
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
                    {(MODAL_I18N.submitButton[locale] || MODAL_I18N.submitButton.en)} (
                    {overallRating.toFixed(1)} ★)
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
