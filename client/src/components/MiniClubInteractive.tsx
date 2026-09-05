import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  Baby,
  Clock,
  Users,
  ShieldCheck,
  Palette,
  Sparkles,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Info,
  MapPin,
  CheckCircle2,
  Phone,
  Film,
  Puzzle,
  Scissors,
  Shirt,
  Smile,
  Dices,
  Layers,
  HeartHandshake,
  Award,
  TreePine,
  Play,
  Pause,
  Maximize2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  weeklySchedule,
  miniClubGallery,
  miniClubFeatures,
  type MiniClubActivity,
  type DaySchedule,
} from "@/data/miniClubData";
import type { Locale } from "@/data/content";

interface MiniClubInteractiveProps {
  locale: Locale;
  showFullPageLink?: boolean;
  compact?: boolean;
}

const ICON_MAP: Record<string, React.ElementType> = {
  palette: Palette,
  dices: Dices,
  sparkles: Sparkles,
  clapperboard: Film,
  puzzle: Puzzle,
  scissors: Scissors,
  shirt: Shirt,
  shapes: Layers,
  gem: Sparkles,
  trees: TreePine,
  layers: Layers,
  "shopping-bag": Palette,
  smile: Smile,
  award: Award,
  "shield-check": ShieldCheck,
  users: Users,
};

export default function MiniClubInteractive({
  locale,
  showFullPageLink = true,
  compact = false,
}: MiniClubInteractiveProps) {
  // Determine current day of week to highlight automatically
  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const currentDayIndex = new Date().getDay();
  const todayDayId = dayNames[currentDayIndex] as DaySchedule["dayId"];

  const [selectedDayId, setSelectedDayId] = useState<DaySchedule["dayId"]>(
    todayDayId || "monday"
  );
  const [selectedActivity, setSelectedActivity] = useState<MiniClubActivity | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Active schedule data
  const activeDay =
    weeklySchedule.find((d) => d.dayId === selectedDayId) || weeklySchedule[0];

  // Carousel autoplay
  useEffect(() => {
    if (!isAutoplay || lightboxOpen) return;
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % miniClubGallery.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoplay, lightboxOpen]);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % miniClubGallery.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + miniClubGallery.length) % miniClubGallery.length);
  };

  const renderIcon = (iconName: string, className = "w-5 h-5") => {
    const Component = ICON_MAP[iconName] || Sparkles;
    return <Component className={className} />;
  };

  return (
    <div className="w-full">
      {/* 3 Main Stat Badges - Compact & Streamlined */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--paper)] border border-[var(--line)] shadow-xs hover:border-[var(--tide)] transition-all">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Baby size={18} />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[var(--ink-soft)] font-semibold block">
              {locale === "tr" ? "Yaş Grubu" : locale === "ru" ? "Возраст" : locale === "de" ? "Altersgruppe" : "Age Range"}
            </span>
            <strong className="text-sm sm:text-base font-serif text-[var(--ink)]">4–12 Years Old</strong>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--paper)] border border-[var(--line)] shadow-xs hover:border-[var(--tide)] transition-all">
          <div className="w-9 h-9 rounded-lg bg-[var(--tide-soft)] text-[var(--tide)] flex items-center justify-center shrink-0">
            <Clock size={18} />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[var(--ink-soft)] font-semibold block">
              {locale === "tr" ? "Çalışma Saatleri" : locale === "ru" ? "Часы работы" : locale === "de" ? "Öffnungszeiten" : "Daily Hours"}
            </span>
            <strong className="text-sm sm:text-base font-serif text-[var(--ink)]">10:00–12:00 / 14:30–17:30</strong>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--paper)] border border-[var(--line)] shadow-xs hover:border-[var(--tide)] transition-all">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Users size={18} />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[var(--ink-soft)] font-semibold block">
              {locale === "tr" ? "Eğitmen Kadrosu" : locale === "ru" ? "Педагоги" : locale === "de" ? "Betreuung" : "Guidance"}
            </span>
            <strong className="text-sm sm:text-base font-serif text-[var(--ink)]">Certified Supervisors</strong>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Gallery Carousel on Left / About & Highlights on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center">
        {/* Left: Interactive Carousel */}
        <div className="lg:col-span-6 space-y-3">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-black/5 border border-[var(--line)] shadow-lg group">
            <img
              src={miniClubGallery[activeImageIndex].url}
              alt={miniClubGallery[activeImageIndex].alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

            {/* Top Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-[11px] uppercase font-bold tracking-wider text-[var(--ink)]">
                {activeImageIndex + 1} / {miniClubGallery.length} Photos
              </span>
            </div>

            {/* Fullscreen & Play/Pause Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5">
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-all"
                title={isAutoplay ? "Pause Slideshow" : "Start Slideshow"}
                type="button"
              >
                {isAutoplay ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                onClick={() => setLightboxOpen(true)}
                className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-all"
                title="Fullscreen Lightbox"
                type="button"
              >
                <Maximize2 size={14} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h4 className="font-serif text-lg font-medium drop-shadow-md">
                {miniClubGallery[activeImageIndex].title}
              </h4>
              <p className="text-xs text-white/90 drop-shadow-sm mt-0.5 line-clamp-1">
                {miniClubGallery[activeImageIndex].caption}
              </p>
            </div>

            {/* Left / Right Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-80 hover:opacity-100"
              aria-label="Previous Slide"
              type="button"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all opacity-80 hover:opacity-100"
              aria-label="Next Slide"
              type="button"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Thumbnail Track */}
          <div className="grid grid-cols-5 gap-2">
            {miniClubGallery.map((img, idx) => (
              <button
                key={img.url + idx}
                onClick={() => {
                  setActiveImageIndex(idx);
                  setIsAutoplay(false);
                }}
                className={`relative rounded-lg overflow-hidden aspect-[4/3] border-2 transition-all ${
                  activeImageIndex === idx
                    ? "border-[var(--gold)] scale-102 ring-2 ring-[var(--gold)]/30"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                type="button"
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Editorial Story & 4 Pillars */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-bold">
              {locale === "tr" ? "Çocuklara Özel Dünya" : locale === "ru" ? "Специально для детей" : locale === "de" ? "Exklusiv für Kinder" : "Dedicated Kids Sanctuary"}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[var(--ink)] mt-1">
              About <em>Mini Club</em>
            </h3>
            <p className="text-sm text-[var(--ink-soft)] mt-3 leading-relaxed">
              Our hotel’s Mini Club is a specially designed entertainment area to make your children’s holidays unforgettable. We offer both educational and fun activities, accompanied by expert instructors. Enjoy yourselves while your children have an unforgettable holiday in our fun and safe area.
            </p>
          </div>

          {/* 4 Pillars Grid - Compact & Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {miniClubFeatures.map((feat) => (
              <div
                key={feat.id}
                className="p-3 rounded-xl bg-[var(--paper)] border border-[var(--line)] shadow-xs hover:border-[var(--tide)] transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-[var(--tide)]">
                    {renderIcon(feat.icon, "w-3.5 h-3.5")}
                  </div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink)]">
                    {feat.title[locale] || feat.title.en}
                  </h4>
                </div>
                <p className="text-[11px] text-[var(--ink-soft)] leading-snug">
                  {feat.desc[locale] || feat.desc.en}
                </p>
              </div>
            ))}
          </div>

          {/* Direct CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {showFullPageLink && (
              <Link
                href="/mini-club"
                className="button button-primary inline-flex items-center gap-2"
              >
                <span>View Full Mini Club Page</span>
                <ArrowRight size={15} />
              </Link>
            )}
            <a
              href="tel:4446752"
              className="button button-outline inline-flex items-center gap-2"
            >
              <Phone size={14} />
              <span>Mini Club Desk: 444 6 752</span>
            </a>
          </div>
        </div>
      </div>

      {/* Interactive All Day Week Programs & Clickable Schedules */}
      <div className="mt-8 pt-8 border-t border-[var(--line)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--gold)] mb-0.5">
              <Calendar size={12} />
              <span>Weekly Activity Itinerary</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[var(--ink)]">
              Our <em>Weekly Schedule</em>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs text-[var(--ink-soft)] font-medium px-2.5 py-1 rounded-full bg-[var(--shell)] border border-[var(--line)]">
              Active Day: <strong className="text-[var(--ink)]">{activeDay.dayName[locale] || activeDay.dayName.en}</strong>
            </span>
          </div>
        </div>

        {/* 7-Day Week Switcher Tabs - Responsive Grid / Flex with smaller touch-optimized compact buttons */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2 mb-3">
          {weeklySchedule.map((day) => {
            const isSelected = day.dayId === selectedDayId;
            const isToday = day.dayId === todayDayId;

            return (
              <button
                key={day.dayId}
                onClick={() => setSelectedDayId(day.dayId)}
                className={`px-2 py-2 sm:py-2.5 rounded-lg font-medium transition-all flex flex-col items-center justify-center gap-0.5 border text-center ${
                  isSelected
                    ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] shadow-sm scale-[1.02]"
                    : "bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--line)] hover:border-[var(--tide)] hover:text-[var(--ink)]"
                }`}
                type="button"
              >
                <span className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold leading-tight">
                  <span className="hidden sm:inline">{day.dayName[locale] || day.dayName.en}</span>
                  <span className="sm:hidden">{day.dayShort?.[locale] || day.dayShort?.en || (day.dayName.en.slice(0, 3))}</span>
                  {isToday && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Today" />
                  )}
                </span>
                <span className={`text-[9px] sm:text-[10px] leading-tight font-medium ${isSelected ? "text-amber-300" : "text-[var(--gold)]"}`}>
                  4 Sessions
                </span>
              </button>
            );
          })}
        </div>

        {/* Day Theme Banner - Compact & Clean */}
        <div className="p-2.5 sm:p-3 rounded-lg bg-[var(--shell)] border border-[var(--line)] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-[var(--ink)]">
            <Sparkles size={14} className="text-[var(--gold)] shrink-0" />
            <span className="text-[11px] sm:text-xs">
              <strong className="text-[var(--ink)]">{activeDay.dayName[locale] || activeDay.dayName.en} Theme:</strong>{" "}
              <span className="text-[var(--ink-soft)]">{activeDay.theme[locale] || activeDay.theme.en}</span>
            </span>
          </div>
          <span className="text-[10px] font-semibold text-[var(--tide)] uppercase tracking-wider hidden md:inline-block shrink-0">
            Supervised
          </span>
        </div>

        {/* 4 Interactive Clickable Schedule Cards - Compact & Mobile-Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3.5">
          {activeDay.activities.map((act) => {
            return (
              <div
                key={act.id}
                onClick={() => setSelectedActivity(act)}
                className="group p-3.5 sm:p-4 rounded-xl bg-[var(--paper)] border border-[var(--line)] shadow-xs hover:border-[var(--tide)] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedActivity(act);
                }}
              >
                <div>
                  {/* Time Badge & Icon */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-[var(--tide-soft)] text-[var(--tide)] text-[10px] sm:text-[11px] font-bold font-mono tracking-wider flex items-center gap-1">
                      <Clock size={11} /> {act.time}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[var(--shell)] group-hover:bg-[var(--tide)] group-hover:text-white text-[var(--ink-soft)] flex items-center justify-center transition-colors">
                      {renderIcon(act.icon, "w-3.5 h-3.5")}
                    </div>
                  </div>

                  {/* Category */}
                  <span className="text-[9px] uppercase font-bold tracking-wider text-[var(--gold)] block mb-0.5">
                    {act.category[locale] || act.category.en}
                  </span>

                  {/* Title */}
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-[var(--ink)] group-hover:text-[var(--tide)] transition-colors leading-snug line-clamp-1">
                    {act.title[locale] || act.title.en}
                  </h4>

                  {/* Description */}
                  <p className="text-[11px] sm:text-xs text-[var(--ink-soft)] mt-1.5 leading-relaxed line-clamp-2">
                    {act.description[locale] || act.description.en}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="mt-3 pt-2.5 border-t border-[var(--line)] flex items-center justify-between text-[10px] sm:text-[11px] text-[var(--ink-soft)]">
                  <span className="flex items-center gap-1 truncate max-w-[70%]">
                    <MapPin size={10} className="text-[var(--tide)] shrink-0" /> <span className="truncate">{act.location}</span>
                  </span>
                  <span className="text-[var(--tide)] font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0">
                    Details <ChevronRight size={10} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Details Modal / Dialog - Compact & Responsive */}
      {selectedActivity && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="bg-[var(--paper)] border border-[var(--line)] rounded-xl max-w-md w-full p-4 sm:p-5 shadow-2xl relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedActivity(null)}
              className="absolute top-3 right-3 p-1 rounded-full text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--shell)] transition-colors"
              type="button"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="px-2 py-0.5 rounded bg-[var(--tide-soft)] text-[var(--tide)] text-[10px] sm:text-xs font-bold font-mono">
                {selectedActivity.time}
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                {selectedActivity.ageGroup}
              </span>
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-semibold text-[var(--ink)] mt-0.5">
              {selectedActivity.title[locale] || selectedActivity.title.en}
            </h3>

            <p className="text-[10px] uppercase tracking-wider font-semibold text-[var(--gold)] mt-0.5">
              {selectedActivity.category[locale] || selectedActivity.category.en}
            </p>

            <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-2.5 leading-relaxed">
              {selectedActivity.description[locale] || selectedActivity.description.en}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4 p-2.5 sm:p-3 rounded-lg bg-[var(--shell)] border border-[var(--line)]">
              <div>
                <span className="text-[9px] uppercase font-bold text-[var(--ink-soft)] block">Location</span>
                <span className="text-[11px] sm:text-xs font-medium text-[var(--ink)] flex items-center gap-1 mt-0.5">
                  <MapPin size={11} className="text-[var(--tide)] shrink-0" /> <span className="truncate">{selectedActivity.location}</span>
                </span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-[var(--ink-soft)] block">Supervision</span>
                <span className="text-[11px] sm:text-xs font-medium text-[var(--ink)] flex items-center gap-1 mt-0.5">
                  <Users size={11} className="text-[var(--gold)] shrink-0" /> <span className="truncate">{selectedActivity.supervisors}</span>
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  toast.success("Activity reminder noted for your family schedule!", {
                    description: `${selectedActivity.title.en} (${selectedActivity.time})`,
                  });
                  setSelectedActivity(null);
                }}
                className="button button-primary !py-1.5 !px-3 text-xs flex-1 inline-flex items-center justify-center gap-1.5"
                type="button"
              >
                <CheckCircle2 size={14} />
                <span>Save to Family Day</span>
              </button>
              <button
                onClick={() => setSelectedActivity(null)}
                className="button button-outline !py-1.5 !px-3 text-xs"
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10"
            type="button"
          >
            <X size={24} />
          </button>

          <div
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={miniClubGallery[activeImageIndex].url}
              alt={miniClubGallery[activeImageIndex].alt}
              className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <h4 className="font-serif text-xl font-medium">
                {miniClubGallery[activeImageIndex].title}
              </h4>
              <p className="text-xs text-white/70 mt-1">
                {miniClubGallery[activeImageIndex].caption}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={prevImage}
                className="p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all"
                type="button"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-xs text-white/80 font-mono">
                {activeImageIndex + 1} of {miniClubGallery.length}
              </span>
              <button
                onClick={nextImage}
                className="p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all"
                type="button"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
