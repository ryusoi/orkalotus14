import React, { useEffect } from "react";
import {
  X,
  Star,
  ThumbsUp,
  Award,
  ShieldCheck,
  Building2,
  Users,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import {
  type ExperienceTarget,
  RATING_DIMENSIONS,
  ORKA_EXPERIENCE_TRANSLATIONS,
} from "@/data/orkaExperienceData";
import { type LiveSummary } from "@/services/orkaExperienceService";

interface OrkaItemDetailModalProps {
  target: ExperienceTarget | null;
  summary?: LiveSummary;
  isOpen: boolean;
  onClose: () => void;
  onOpenRateModal: (target: ExperienceTarget) => void;
}

const DETAIL_I18N = {
  score: {
    en: "Score",
    tr: "Puan",
    ru: "Оценка",
    de: "Bewertung",
  },
  reviews: {
    en: "Reviews",
    tr: "Değerlendirme",
    ru: "Отзывы",
    de: "Bewertungen",
  },
  recommend: {
    en: "Recommend",
    tr: "Tavsiye",
    ru: "Рекомендуют",
    de: "Empfehlung",
  },
  about: {
    en: "About This Experience",
    tr: "Bu Hizmet Hakkında",
    ru: "Об этом сервисе",
    de: "Über dieses Angebot",
  },
  fiveStarStandard: {
    en: "5-Star Standard",
    tr: "5 Yıldız Standardı",
    ru: "5-звездочный стандарт",
    de: "5-Sterne-Standard",
  },
  verifiedSync: {
    en: "Verified guest scores synchronized live with Firebase Realtime Database.",
    tr: "Doğrulanmış misafir puanları Firebase Realtime Database ile canlı senkronizedir.",
    ru: "Оценки гостей верифицированы и синхронизируются с Firebase Realtime Database.",
    de: "Verifizierte Gästebewertungen live mit Firebase Realtime Database synchronisiert.",
  },
  close: {
    en: "Close",
    tr: "Kapat",
    ru: "Закрыть",
    de: "Schließen",
  },
};

export const OrkaItemDetailModal: React.FC<OrkaItemDetailModalProps> = ({
  target,
  summary,
  isOpen,
  onClose,
  onOpenRateModal,
}) => {
  const { locale } = useLocale();
  const t = ORKA_EXPERIENCE_TRANSLATIONS[locale] || ORKA_EXPERIENCE_TRANSLATIONS.en;
  const lastTapRef = React.useRef<number>(0);

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

  if (!isOpen || !target) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDoubleTapOrClick = () => {
    onClose();
  };

  const handleTouchEnd = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 380) {
      onClose();
    }
    lastTapRef.current = now;
  };

  const currentSummary = summary || {
    targetId: target.id,
    targetType: target.type,
    ...target.initialSummary,
  };

  const score = currentSummary.averageOverall || 5.0;
  const count = currentSummary.totalRatings || 0;
  const rec = currentSummary.recommendationPercentage || 100;

  let badgeKey: "new" | "emerging" | "ranked" | "highlyRated" = "new";
  if (count >= 50 && score >= 4.8) badgeKey = "highlyRated";
  else if (count >= 20) badgeKey = "ranked";
  else if (count >= 5) badgeKey = "emerging";

  const badgeText = t.statBadges[badgeKey];

  return (
    <div
      id="orka-detail-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="orka-detail-modal-title"
      onClick={handleBackdropClick}
      onDoubleClick={handleDoubleTapOrClick}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-[10005] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 select-none"
    >
      <div
        id="orka-detail-modal-container"
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={handleDoubleTapOrClick}
        onTouchEnd={(e) => {
          const tagName = (e.target as HTMLElement).tagName.toLowerCase();
          if (tagName === "button") return;
          const now = Date.now();
          if (now - lastTapRef.current < 380) onClose();
          lastTapRef.current = now;
        }}
        className="relative w-full max-w-xl bg-white border-2 border-[#d4af37] ring-1 ring-[#fef08a]/30 rounded-2xl shadow-2xl overflow-hidden max-h-[min(90dvh,640px)] sm:max-h-[85vh] flex flex-col text-slate-900 animate-in zoom-in-95 duration-200 my-auto"
      >
        {/* Top Gold Accent Ribbon (Double click or tap closes) */}
        <div
          onDoubleClick={onClose}
          title="Double click or double tap to close"
          className="h-2 w-full bg-gradient-to-r from-[#996515] via-[#fef08a] via-[#e5c158] to-[#996515] shrink-0 cursor-pointer"
        />

        {/* Hero Image & Header */}
        <div className="relative h-36 sm:h-44 bg-gradient-to-br from-[#0b1622] to-[#1c2e42] overflow-hidden shrink-0">
          <img
            src={target.photoUrl}
            alt={target.title[locale] || target.title.en}
            className="w-full h-full object-cover opacity-60"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Close button with Golden Frame & Black Text */}
          <button
            type="button"
            id="close-orka-detail-modal"
            onClick={onClose}
            onDoubleClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] hover:from-[#e5c158] hover:via-[#fff59d] hover:to-[#e5c158] border-2 border-[#996515] text-slate-950 font-black flex items-center justify-center transition-all z-10 shadow-md active:scale-95 cursor-pointer"
          >
            <X size={16} className="stroke-[3]" />
          </button>

          {/* Badges on image */}
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full bg-black/70 text-[#fef08a] border border-[#d4af37] backdrop-blur-sm flex items-center gap-1">
              {target.type === "service" && <Building2 size={11} />}
              {target.type === "management" && <Award size={11} />}
              {target.type === "staff" && <Users size={11} />}
              <span>{target.department[locale] || target.department.en}</span>
            </span>
            <span className="text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] text-slate-950 border border-[#996515] shadow-xs">
              {badgeText}
            </span>
          </div>

          {/* Bottom Title & Score Bar */}
          <div className="absolute bottom-2.5 left-4 right-4 flex items-end justify-between gap-3 text-white">
            <div className="min-w-0">
              <span className="text-[11px] text-[#fef08a] font-bold tracking-wide block truncate">
                {target.subtitle[locale] || target.subtitle.en}
              </span>
              <h3
                id="orka-detail-modal-title"
                className="font-serif text-base sm:text-xl font-black tracking-tight text-white mt-0.5 truncate drop-shadow-sm"
              >
                {target.title[locale] || target.title.en}
              </h3>
            </div>

            <div className="shrink-0 text-right bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl border-2 border-[#d4af37]">
              <div className="flex items-center gap-1 text-[#fef08a]">
                <Star size={13} className="fill-[#fbbf24] text-[#f59e0b]" />
                <span className="text-sm font-black text-white">
                  {score.toFixed(1)}
                </span>
                <span className="text-[9px] text-slate-300">/ 5.0</span>
              </div>
              <div className="text-[9px] text-slate-300 font-bold">
                {count} {t.cards.reviewsLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-3.5 sm:p-5 space-y-3.5 overflow-y-auto flex-1 overscroll-contain">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-slate-50 border-2 border-[#d4af37]/60">
              <span className="text-[10px] text-slate-600 font-bold block truncate">
                {DETAIL_I18N.score[locale] || DETAIL_I18N.score.en}
              </span>
              <div className="flex items-center justify-center gap-1 mt-0.5 text-amber-600 font-black">
                <Star size={12} className="fill-amber-500 text-amber-600" />
                <span className="font-serif text-sm font-black text-slate-950">
                  {score.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 border-2 border-[#d4af37]/60">
              <span className="text-[10px] text-slate-600 font-bold block truncate">
                {DETAIL_I18N.reviews[locale] || DETAIL_I18N.reviews.en}
              </span>
              <span className="font-serif text-sm font-black text-slate-950 block mt-0.5">
                {count}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-emerald-50 border-2 border-emerald-500/40">
              <span className="text-[10px] text-emerald-800 font-bold block truncate">
                {DETAIL_I18N.recommend[locale] || DETAIL_I18N.recommend.en}
              </span>
              <span className="font-serif text-sm font-black text-emerald-900 block mt-0.5">
                {rec}%
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 block mb-1">
              {DETAIL_I18N.about[locale] || DETAIL_I18N.about.en}
            </span>
            <p className="text-xs text-slate-800 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              {target.description[locale] || target.description.en}
            </p>
          </div>

          {/* Hospitality Dimensions Breakdown */}
          <div className="bg-slate-50 p-3 rounded-xl border-2 border-[#d4af37]/50">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-200">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-950">
                {t.dimensions.breakdownTitle}
              </span>
              <span className="text-xs font-black text-[#996515]">
                {DETAIL_I18N.fiveStarStandard[locale] || DETAIL_I18N.fiveStarStandard.en}
              </span>
            </div>

            <div className="space-y-2">
              {RATING_DIMENSIONS.map((dim) => {
                let dimScore = score;
                if (dim.key === "hospitalityRating")
                  dimScore = currentSummary.averageHospitality || score;
                if (dim.key === "professionalismRating")
                  dimScore = currentSummary.averageProfessionalism || score;
                if (dim.key === "helpfulnessRating")
                  dimScore = currentSummary.averageHelpfulness || score;
                if (dim.key === "courtesyRating")
                  dimScore = currentSummary.averageCourtesy || score;
                if (dim.key === "qualityRating")
                  dimScore = currentSummary.averageQuality || score;

                const percent = Math.min(100, Math.round((dimScore / 5) * 100));

                return (
                  <div key={dim.key} className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 tracking-tight select-none">
                        {dim.label[locale] || dim.label.en}
                      </span>
                      <span className="text-xs font-black text-slate-950">
                        {dimScore.toFixed(1)}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#996515] via-[#fef08a] to-[#d4af37] rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trust Guarantee */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-[10px] text-slate-600 font-medium">
            <ShieldCheck size={15} className="text-[#996515] shrink-0" />
            <span>{DETAIL_I18N.verifiedSync[locale] || DETAIL_I18N.verifiedSync.en}</span>
          </div>
        </div>

        {/* Modal Footer (Golden frames, black text, smaller compact size) */}
        <div className="px-4 py-2.5 border-t-2 border-[#d4af37]/50 bg-white flex items-center justify-between gap-3 shrink-0 pb-[max(0.6rem,env(safe-area-inset-bottom,10px))]">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 bg-[#fefce8] hover:bg-[#fef9c3] border-2 border-[#d4af37] transition-all min-h-[36px] active:scale-95 cursor-pointer shadow-xs"
          >
            {DETAIL_I18N.close[locale] || DETAIL_I18N.close.en}
          </button>

          <button
            type="button"
            id="orka-detail-rate-now-btn"
            onClick={() => {
              onClose();
              onOpenRateModal(target);
            }}
            className="flex-1 max-w-xs py-2 px-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] hover:from-[#e5c158] hover:via-[#fff59d] hover:to-[#e5c158] text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_2px_10px_rgba(212,175,55,0.45)] flex items-center justify-center gap-1.5 min-h-[36px] border-2 border-[#996515] active:scale-95 cursor-pointer"
          >
            <Star size={13} className="fill-slate-950 text-slate-950" />
            <span>{t.cards.rateButton}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
