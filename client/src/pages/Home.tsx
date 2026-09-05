import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import {
  Anchor,
  ArrowDownRight,
  ArrowRight,
  Baby,
  BedDouble,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Compass,
  Heart,
  HelpCircle,
  History,
  Leaf,
  MapPin,
  Music2,
  Navigation,
  Phone,
  RotateCcw,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  Stethoscope,
  Sun,
  Sunset,
  Utensils,
  Volume2,
  VolumeX,
  Waves,
  X,
  type LucideIcon,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import {
  getDailyScheduleForDate,
  guestMedia,
  type Activity,
  type Locale,
} from "@/data/content";
import { useLiveDate } from "@/hooks/useLiveDate";
import { useLiveWeather } from "@/hooks/useLiveWeather";
import { homeTranslations } from "@/data/homeTranslations";
import ResortMasterMap from "@/components/ResortMasterMap";
import MarmarisGoogleMap from "@/components/MarmarisGoogleMap";
import {
  ActivitiesCarousel,
  SpaCarousel,
  RestaurantBarCarousel,
} from "@/components/Carousels";
import MiniClubInteractive from "@/components/MiniClubInteractive";
import DynamicMovingLines from "@/components/DynamicMovingLines";
import SmoothLazySection from "@/components/SmoothLazySection";
import { MarmarisWeatherWidget } from "@/components/MarmarisWeatherWidget";
import LiveHotelPanel from "@/components/LiveHotelPanel";
import RateYourLotusPromoSection from "@/components/RateYourLotusPromoSection";
import ZoomableModal from "@/components/ZoomableModal";
import { useLocale } from "@/contexts/LocaleContext";

const iconMap: Record<string, LucideIcon> = {
  sun: Sun,
  waves: Waves,
  utensils: Utensils,
  anchor: Anchor,
  sunset: Sunset,
  music: Music2,
  heart: Heart,
  sparkles: Sparkles,
  smile: CircleUserRound,
  sparkle: Sparkles,
  bed: BedDouble,
};

const portalIcons: Record<string, ReactNode> = {
  "/activities-spa": <Sparkles size={20} className="text-[var(--tide)]" />,
  "/pools-beach": <Waves size={20} className="text-[var(--tide)]" />,
  "/watersports": <Anchor size={20} className="text-[var(--tide)]" />,
  "/mini-club": <Baby size={20} className="text-[var(--gold)]" />,
  "/restaurants-bars": <Utensils size={20} className="text-[var(--tide)]" />,
  "/shops": <ShoppingBag size={20} className="text-[var(--tide)]" />,
  "/rooms": <BedDouble size={20} className="text-[var(--tide)]" />,
  "/medical": <Stethoscope size={20} className="text-[var(--tide)]" />,
  "/management": <CircleUserRound size={20} className="text-[var(--tide)]" />,
  "/hotel-directory": <HelpCircle size={20} className="text-[var(--tide)]" />,
  "/rankings": <Star size={20} className="text-[var(--gold)]" />,
  "/icon-beach": <Sunset size={20} className="text-[var(--tide)]" />,
  "/orka-homes": <Compass size={20} className="text-[var(--tide)]" />,
  "/marmaris": <MapPin size={20} className="text-[var(--tide)]" />,
  "/heritage": <History size={20} className="text-[var(--tide)]" />,
  "/orka-legacy": <History size={20} className="text-[var(--tide)]" />,
  "/contact": <Phone size={20} className="text-[var(--tide)]" />,
};

const portalImages: Record<string, string> = {
  "/activities-spa": "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/Yoga-2_1200x800.jpg",
  "/pools-beach": "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/pools_800x1200.jpg",
  "/watersports": "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/WATERSPORTS/JET%20SKI%20(2).jpg",
  "/mini-club": "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/mini-club-2.jpg",
  "/restaurants-bars": "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/restoran1.jpg",
  "/shops": "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/AKSOY/Aksoy%20Header%20(1).jpg",
  "/rooms": "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/SEA-2_1200x800-800x533.jpg",
  "/medical": "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LOGO/medical%20center.png",
  "/management": "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/lobi2.jpg",
  "/hotel-directory": "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LOGO/Hotel%20directory%202.png",
  "/rankings": "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/genel1.jpg",
  "/icon-beach": "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ICON/ICON%20LOGO.jpg",
  "/orka-homes": "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LOGO/ORKA%20LOGO%201.jpg",
  "/marmaris": "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MARMARIS/Marmaris%20collage%202.png",
  "/heritage": "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LEGACY/OUR%20LEGACY%20LANDING%20PAGE%20IMAGE.jpg",
  "/orka-legacy": "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LEGACY/OUR%20LEGACY%20LANDING%20PAGE%20IMAGE.jpg",
  "/contact": "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/reception.png",
};

const portalObjectPositions: Record<string, string> = {
  "/medical": "center center",
  "/hotel-directory": "center center",
  "/orka-legacy": "50% 12%",
  "/heritage": "50% 12%",
  "/shops": "center center",
  "/management": "50% 20%",
  "/icon-beach": "center center",
};

const portalImageFitConfig: Record<string, { fit: "contain" | "cover"; bg: string; padding?: string }> = {
  "/orka-homes": { fit: "contain", bg: "bg-[#0b1622]", padding: "p-3" },
};

function Icon({ name, size = 18, className = "" }: { name: string; size?: number; className?: string }) {
  const Lucide = iconMap[name] || Sparkles;
  return <Lucide size={size} className={className} />;
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={light ? "section-label section-label-light" : "section-label"}>
      <span className="section-label-line" />
      {children}
    </span>
  );
}

export default function Home() {
  const { locale, setLocale } = useLocale();
  const t = homeTranslations[locale] || homeTranslations.en;

  const liveDate = useLiveDate(locale);
  const liveWeather = useLiveWeather(locale);
  const todayDate = liveDate.todayIso;
  const weekDatesList = liveDate.rollingWeekDates;

  // Calendar month state synced to live date
  const [calendarYearMonth, setCalendarYearMonth] = useState<string>(() =>
    liveDate.todayIso ? liveDate.todayIso.substring(0, 7) : "2026-08"
  );

  useEffect(() => {
    if (liveDate.todayIso) {
      setCalendarYearMonth(liveDate.todayIso.substring(0, 7));
    }
  }, [liveDate.todayIso]);

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);
  const [savedActivities, setSavedActivities] = useState<string[]>(["act-30-01", "act-30-03"]);
  const [expandedQuestion, setExpandedQuestion] = useState(0);

  const weekSliderRef = useRef<HTMLDivElement | null>(null);

  const scrollWeekSlider = (direction: "left" | "right") => {
    if (weekSliderRef.current) {
      const scrollAmount = 300;
      weekSliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleResetWeekView = () => {
    if (weekSliderRef.current) {
      weekSliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
    setSelectedCalendarDate(todayDate);
    toast(`${t.weekSlider.openedScheduleFor} ${liveDate.formattedDisplay}`, {
      description: `${getDailyScheduleForDate(todayDate).length} ${t.weekSlider.scheduledMoments}`,
    });
  };

  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroEndVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroAudioRef = useRef<HTMLAudioElement | null>(null);
  const [heroVideoStage, setHeroVideoStage] = useState<0 | 1>(0);
  const [heroLoopCount, setHeroLoopCount] = useState(0);
  const [heroMuted, setHeroMuted] = useState(true);
  const [heroAudioFailed, setHeroAudioFailed] = useState(false);
  const [heroMediaFailed, setHeroMediaFailed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroTransitioningRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const audio = heroAudioRef.current;
    if (!audio) return;
    audio.muted = heroMuted;
    if (!heroMuted) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const unlockSound = () => {
            const currentAudio = heroAudioRef.current;
            if (currentAudio && !heroMuted) {
              currentAudio.muted = false;
              void currentAudio.play().catch(() => {});
            }
            window.removeEventListener("pointerdown", unlockSound);
            window.removeEventListener("click", unlockSound);
          };
          window.addEventListener("pointerdown", unlockSound, { once: true, passive: true });
          window.addEventListener("click", unlockSound, { once: true, passive: true });
        });
      }
    } else {
      audio.pause();
    }
  }, [heroMuted]);

  const advanceHeroVideo = (finishedStage: 0 | 1) => {
    if (prefersReducedMotion || heroTransitioningRef.current) return;
    const nextStage: 0 | 1 = finishedStage === 0 ? 1 : 0;
    const nextVideo = nextStage === 0 ? heroVideoRef.current : heroEndVideoRef.current;
    if (!nextVideo) return;
    heroTransitioningRef.current = true;
    nextVideo.currentTime = 0;
    void nextVideo.play().catch(() => {});
    setHeroVideoStage(nextStage);
    if (finishedStage === 1) setHeroLoopCount((count) => count + 1);
    window.setTimeout(() => { heroTransitioningRef.current = false; }, 900);
  };

  const handleHeroVideoTimeUpdate = (stage: 0 | 1) => {
    if (prefersReducedMotion || heroTransitioningRef.current) return;
    const video = stage === 0 ? heroVideoRef.current : heroEndVideoRef.current;
    if (video && Number.isFinite(video.duration) && video.duration > 1 && video.currentTime >= video.duration - 0.8) advanceHeroVideo(stage);
  };

  const toggleHeroAudio = () => {
    if (heroAudioFailed) return;
    const nextMuted = !heroMuted;
    const audio = heroAudioRef.current;
    if (audio) {
      audio.muted = nextMuted;
      if (!nextMuted) void audio.play().catch(() => toast("Tap sound again to start the soundtrack."));
      else audio.pause();
    }
    setHeroMuted(nextMuted);
  };

  const todayActivities = useMemo(() => {
    return getDailyScheduleForDate(todayDate);
  }, [todayDate]);

  const clickedDateActivities = useMemo(() => {
    return selectedCalendarDate ? getDailyScheduleForDate(selectedCalendarDate) : [];
  }, [selectedCalendarDate]);

  const toggleSaved = (activity: Activity) => {
    const isAlreadySaved = savedActivities.includes(activity.id);
    setSavedActivities((current) =>
      isAlreadySaved ? current.filter((id) => id !== activity.id) : [...current, activity.id]
    );
    toast.success(isAlreadySaved ? t.todaySchedule.removeFromDay : t.todaySchedule.saveToDay, {
      description: activity.title[locale] || activity.title.en,
    });
  };

  // Calendar month calculation
  const { daysInMonth, monthDisplayName } = useMemo(() => {
    const parts = calendarYearMonth.split("-");
    const y = parseInt(parts[0] || "2026", 10);
    const m = parseInt(parts[1] || "8", 10);
    const days = new Date(y, m, 0).getDate();

    const dateObj = new Date(y, m - 1, 1);
    const localeCode = locale === "tr" ? "tr-TR" : locale === "ru" ? "ru-RU" : locale === "de" ? "de-DE" : "en-US";
    const name = dateObj.toLocaleDateString(localeCode, { month: "long", year: "numeric" });
    return {
      daysInMonth: days,
      monthDisplayName: name.charAt(0).toUpperCase() + name.slice(1),
    };
  }, [calendarYearMonth, locale]);

  const handlePrevMonth = () => {
    const parts = calendarYearMonth.split("-");
    const y = parseInt(parts[0] || "2026", 10);
    const m = parseInt(parts[1] || "8", 10);
    const prevDate = new Date(y, m - 2, 1);
    const newYm = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;
    setCalendarYearMonth(newYm);
    toast(`${t.calendar.displayingSchedule} ${newYm}`);
  };

  const handleNextMonth = () => {
    const parts = calendarYearMonth.split("-");
    const y = parseInt(parts[0] || "2026", 10);
    const m = parseInt(parts[1] || "8", 10);
    const nextDate = new Date(y, m, 1);
    const newYm = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, "0")}`;
    setCalendarYearMonth(newYm);
    toast(`${t.calendar.displayingSchedule} ${newYm}`);
  };

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      <main id="top">
        {/* Cinematic Video Hero */}
        <section className="hero-section" data-hero-stage={heroVideoStage} data-hero-loop={heroLoopCount}>
          {heroMediaFailed ? (
            <img src={guestMedia.heroFirstFrame} alt="Orka Lotus Beach" className="hero-video is-active" />
          ) : (
            <>
              <video
                ref={heroVideoRef}
                src={guestMedia.heroVideoIntro}
                poster={guestMedia.heroFirstFrame}
                className={`hero-video hero-video-sequence ${heroVideoStage === 0 ? "is-active" : "is-inactive"}`}
                autoPlay={!prefersReducedMotion}
                muted
                playsInline
                preload="auto"
                onCanPlay={() => {}}
                onTimeUpdate={() => handleHeroVideoTimeUpdate(0)}
                onEnded={() => advanceHeroVideo(0)}
                onError={() => setHeroMediaFailed(true)}
                aria-label="Orka Lotus Beach introduction video"
              >
                <source src={guestMedia.heroVideoIntro} type="video/mp4" />
              </video>
              <video
                ref={heroEndVideoRef}
                src={guestMedia.heroVideoEnd}
                poster={guestMedia.heroFirstFrame}
                className={`hero-video hero-video-sequence ${heroVideoStage === 1 ? "is-active" : "is-inactive"}`}
                muted
                playsInline
                preload="auto"
                onCanPlay={() => {}}
                onTimeUpdate={() => handleHeroVideoTimeUpdate(1)}
                onEnded={() => advanceHeroVideo(1)}
                onError={() => setHeroMediaFailed(true)}
                aria-label="Orka Lotus Beach ending video"
              >
                <source src={guestMedia.heroVideoEnd} type="video/mp4" />
              </video>
            </>
          )}
          <audio
            ref={heroAudioRef}
            src={guestMedia.heroAudio}
            loop
            preload="auto"
            muted={heroMuted}
            onError={() => {
              const directUrl = "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/AUDIO/Summer%20audio.m4a";
              if (heroAudioRef.current && heroAudioRef.current.src !== directUrl) {
                heroAudioRef.current.src = directUrl;
                if (!heroMuted) void heroAudioRef.current.play().catch(() => {});
              } else {
                setHeroAudioFailed(true);
              }
            }}
            aria-hidden="true"
          >
            <source src={guestMedia.heroAudio} type="audio/mp4" />
            <source src="https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/AUDIO/Summer%20audio.m4a" type="audio/mp4" />
          </audio>
          <div className="container hero-content">
            <div className="hero-top-bar">
              <p className="hero-overline hero-top-overline">{t.hero.overline}</p>
              <h1 key={`hero-title-loop-${heroLoopCount}`} className="hero-flash-title" aria-label={t.hero.titles.join(" ")}>
                {t.hero.titles.map((text, lineIndex, arr) => {
                  const prevChars = arr.slice(0, lineIndex).reduce((sum, l) => sum + l.length, 0);
                  const linePause = lineIndex * 0.22;
                  return (
                    <span key={lineIndex} className="hero-flash-line">
                      {text.split("").map((char, charIndex) => {
                        const globalIndex = prevChars + charIndex;
                        const isSpace = char === " ";
                        return (
                          <span
                            key={charIndex}
                            className={`hero-flash-char ${isSpace ? "hero-flash-space" : ""}`}
                            style={{
                              animationDelay: `${0.35 + globalIndex * 0.11 + linePause}s`,
                            }}
                            aria-hidden="true"
                          >
                            {isSpace ? "\u00A0" : char}
                          </span>
                        );
                      })}
                    </span>
                  );
                })}
              </h1>
            </div>
            <div className="hero-bottom-message">
              <p className="hero-description hero-bottom-description">
                {t.hero.subtitle}
              </p>
            </div>
          </div>
          <div className="hero-bottom-bar container">
            <div className="hero-location"><Navigation size={14} /> {t.hero.location}</div>
            <button
              className="hero-mute-button"
              type="button"
              onClick={toggleHeroAudio}
              aria-pressed={!heroMuted}
              aria-label={heroAudioFailed ? "Soundtrack unavailable" : heroMuted ? t.hero.unmuteAudio : t.hero.muteAudio}
              title={heroAudioFailed ? "Soundtrack unavailable" : heroMuted ? t.hero.unmuteAudio : t.hero.muteAudio}
              disabled={heroAudioFailed}
            >
              {heroAudioFailed || heroMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
          </div>
        </section>

        {/* Real-Time Live Hotel Activity & Next Event Concierge Panel */}
        <LiveHotelPanel
          locale={locale}
          onSelectActivity={(activity) => setSelectedActivity(activity)}
        />

        {/* Live Week Schedule Date Slider Segment */}
        <section id="live-schedule" className="week-schedule-section">
          <div className="container">
            <div className="week-schedule-header">
              <div className="week-schedule-intro">
                <SectionLabel>{t.weekSlider.sectionLabel}</SectionLabel>
                <h2 className="font-serif text-3xl sm:text-4xl text-[var(--ink)] font-medium">
                  {t.weekSlider.title}
                </h2>
                <p>
                  {t.weekSlider.subtitle}
                </p>
              </div>

              <div className="week-schedule-meta-bar">
                <div className="week-schedule-date-badge">
                  <span className="day-num">{liveDate.dayNumber}</span>
                  <div className="month-year">
                    <strong>{liveDate.monthName}</strong>
                    <span>{liveDate.year}</span>
                  </div>
                </div>

                <div className="week-schedule-tag">
                  <span className="week-schedule-tag-dot" />
                  <span>{t.weekSlider.badge}</span>
                </div>

                <button
                  type="button"
                  className="week-schedule-reset-btn"
                  onClick={handleResetWeekView}
                  title={t.weekSlider.resetView}
                >
                  <RotateCcw size={13} />
                  <span>{t.weekSlider.resetView}</span>
                </button>
              </div>
            </div>

            {/* Slider with transparent left and right toggles */}
            <div className="week-slider-wrapper">
              <button
                type="button"
                className="week-slider-toggle toggle-left"
                onClick={() => scrollWeekSlider("left")}
                aria-label="Previous dates"
                title="Slide left"
              >
                <ChevronLeft size={20} />
              </button>

              <div ref={weekSliderRef} className="week-slider-track">
                {weekDatesList.map((item) => {
                  const isToday = item.isoDate === todayDate;
                  const isSelected = selectedCalendarDate === item.isoDate;
                  const count = getDailyScheduleForDate(item.isoDate).length;

                  return (
                    <button
                      key={item.isoDate}
                      type="button"
                      className={`week-date-card ${isSelected ? "active" : isToday ? "is-today" : ""}`}
                      onClick={() => {
                        setSelectedCalendarDate(item.isoDate);
                        toast(`${t.weekSlider.openedScheduleFor} ${item.dayLabel} (${item.dayNumber} ${item.monthLabel})`, {
                          description: `${count} ${t.weekSlider.scheduledMoments}`,
                        });
                      }}
                      title={`${item.dayLabel}, ${item.dayNumber} ${item.monthLabel}`}
                    >
                      <span className="week-date-day-label">{item.dayLabel}</span>
                      <span className="week-date-number">{item.dayNumber}</span>
                      <span className="week-date-month">{item.monthLabel}</span>
                      <span className="week-date-pill-badge">
                        {count} {t.weekSlider.momentsBadge}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className="week-slider-toggle toggle-right"
                onClick={() => scrollWeekSlider("right")}
                aria-label="Next dates"
                title="Slide right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Summer Resort Calendar (Live, Dynamic & Localized) */}
        <SmoothLazySection id="calendar-section" className="mini-calendar-section">
          <div className="container mini-calendar-layout">
            <div className="mini-calendar-intro">
              <SectionLabel>{t.calendar.sectionLabel}</SectionLabel>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--ink)] font-medium">
                {t.calendar.titlePrefix} <em>{t.calendar.titleHighlight}</em>
              </h2>
              <p>
                {t.calendar.subtitle}
              </p>
            </div>

            <div className="mini-calendar">
              <div className="mini-calendar-top">
                <div>
                  <span className="mini-label">{monthDisplayName}</span>
                  <strong>{monthDisplayName}</strong>
                </div>
                <div className="mini-calendar-controls">
                  <button
                    type="button"
                    aria-label={t.calendar.prevMonth}
                    onClick={handlePrevMonth}
                    title={t.calendar.prevMonth}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label={t.calendar.nextMonth}
                    onClick={handleNextMonth}
                    title={t.calendar.nextMonth}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="mini-calendar-grid mini-calendar-weekdays">
                {t.calendar.weekdays.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>

              <div className="mini-calendar-grid mini-calendar-days">
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((dayNum) => {
                  const dayStr = `${calendarYearMonth}-${String(dayNum).padStart(2, "0")}`;
                  const isToday = dayStr === todayDate;
                  const isSelected = selectedCalendarDate === dayStr;
                  const dayActivities = getDailyScheduleForDate(dayStr);
                  const count = dayActivities.length;

                  return (
                    <button
                      key={dayNum}
                      type="button"
                      className={`mini-calendar-day ${isSelected || isToday ? "selected" : ""}`}
                      onClick={() => {
                        setSelectedCalendarDate(dayStr);
                        toast(`${t.weekSlider.openedScheduleFor} ${dayStr}`, {
                          description: `${count} ${t.weekSlider.scheduledMoments}`,
                        });
                      }}
                      title={`${dayStr}`}
                    >
                      <span>{dayNum}</span>
                      {count > 0 && <i>{count}</i>}
                    </button>
                  );
                })}
              </div>

              <div className="mini-calendar-foot">
                <span>
                  <span className="mini-calendar-dot" /> {t.calendar.footerHint}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCalendarDate(todayDate);
                  }}
                >
                  {t.calendar.viewTodayBtn}
                </button>
              </div>
            </div>
          </div>
        </SmoothLazySection>

        {/* Live Google Weather & Marmaris Meteorological Forecast Station (Positioned below Calendar) */}
        <section className="py-3 bg-[var(--sand-50)] dark:bg-[#071320] border-t border-b border-[var(--sand-200)] dark:border-white/10">
          <MarmarisWeatherWidget locale={locale} />
        </section>

        {/* Dynamic Moving Lines Ribbon 1 */}
        <SmoothLazySection className="relative overflow-hidden bg-[var(--paper)] py-2.5 border-t border-[var(--line)]">
          <DynamicMovingLines
            height="100px"
            lineCount={3}
            colorScheme="blue"
            showBadge={true}
            badgeText={t.ribbon1.badge}
            title={<>{t.ribbon1.titlePrefix} <em>{t.ribbon1.titleHighlight}</em></>}
            subtitle={t.ribbon1.subtitle}
          />
        </SmoothLazySection>

        {/* Live Today Schedule Frame */}
        <SmoothLazySection id="today" className="section section-today">
          <div className="container">
            <div className="section-heading-row mb-8">
              <div>
                <SectionLabel>{t.todaySchedule.sectionLabel}</SectionLabel>
                <h2>{t.todaySchedule.titlePrefix} <em>{t.todaySchedule.titleHighlight}</em></h2>
                <p className="section-lede">
                  {t.todaySchedule.subtitlePrefix} {liveDate.formattedDisplay}. {t.todaySchedule.subtitleSuffix}
                </p>
              </div>
              <div className="section-side-note">
                <span>{liveDate.dayNumber}</span>
                <small>{liveDate.monthName}<br />{liveDate.year}</small>
              </div>
            </div>

            <div className="today-schedule-container">
              {/* Left Day Summary Card */}
              <aside className="day-card">
                <div className="day-card-top">
                  <span className="mini-label">{t.todaySchedule.cardEyebrow}</span>
                  <span className="day-card-mark">
                    <span className="lotus-glyph lotus-glyph-light" aria-hidden="true"><i /><i /><i /><i /></span>
                  </span>
                </div>
                <div className="day-card-date">
                  <strong>{liveDate.dayNumber}</strong>
                  <span>{liveDate.weekdayShort} {liveDate.dayNumber} {liveDate.monthShort}<br /><small>{t.todaySchedule.season}</small></span>
                </div>
                <div className="day-card-divider" />
                <div className="day-card-stat">
                  <span>{t.todaySchedule.momentsListed}</span>
                  <strong>{todayActivities.length.toString().padStart(2, "0")}</strong>
                </div>
                <div className="day-card-stat">
                  <span>{t.todaySchedule.savedToYourDay}</span>
                  <strong>{savedActivities.length.toString().padStart(2, "0")}</strong>
                </div>
                <div className="day-card-note">
                  <Leaf size={11} />
                  <p>{t.todaySchedule.weatherNote}</p>
                </div>
                <Link href="/contact" className="card-link inline-flex items-center justify-between">
                  <span>{t.todaySchedule.contactGuestRelations}</span>
                  <ArrowRight size={11} />
                </Link>
              </aside>

              {/* Right: Today's Events List */}
              <div className="today-events-list">
                {todayActivities.map((act) => {
                  const isPending = act.status === "pending";
                  const isSaved = savedActivities.includes(act.id);
                  return (
                    <div
                      key={act.id}
                      className="today-event-card group"
                      onClick={() => setSelectedActivity(act)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setSelectedActivity(act);
                      }}
                    >
                      <div className="flex flex-col font-serif text-xl font-semibold text-[var(--ink)] leading-tight">
                        <span>{act.start}</span>
                        <span className="text-[10px] font-sans font-normal text-[var(--ink-soft)]">{act.end}</span>
                      </div>

                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[var(--tide-soft)] text-[var(--tide)]">
                            {act.category}
                          </span>
                          {isPending && (
                            <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                              {t.todaySchedule.scheduleToBeConfirmed}
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-lg sm:text-xl font-medium text-[var(--ink)] group-hover:text-[var(--tide)] transition-colors line-clamp-1">
                          {act.title[locale] || act.title.en}
                        </h4>
                        <p className="text-xs text-[var(--ink-soft)] line-clamp-1 mt-0.5">
                          {act.description[locale] || act.description.en}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-[var(--ink-soft)] mt-1.5">
                          <span className="inline-flex items-center gap-1"><MapPin size={12} className="text-[var(--tide)]" /> {act.location}</span>
                          <span className="inline-flex items-center gap-1"><CircleUserRound size={12} className="text-[var(--gold)]" /> {act.staff}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className={`p-2 rounded-full border transition-colors ${
                            isSaved
                              ? "bg-[var(--tide)] text-white border-[var(--tide)]"
                              : "border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--tide)] hover:border-[var(--tide)]"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaved(act);
                          }}
                          aria-label={isSaved ? t.todaySchedule.removeFromDay : t.todaySchedule.saveToDay}
                          title={isSaved ? t.todaySchedule.saved : t.todaySchedule.save}
                        >
                          <Check size={14} className={isSaved ? "block" : "hidden"} />
                          <CalendarDays size={14} className={isSaved ? "hidden" : "block"} />
                        </button>
                        <ArrowRight size={16} className="text-[var(--ink-soft)] group-hover:text-[var(--tide)] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </SmoothLazySection>

        {/* 1. Activities & Spa Section */}
        <SmoothLazySection id="activities-spa" className="section bg-[var(--shell)] border-t border-[var(--line)]">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <SectionLabel>{t.activitiesSection.sectionLabel}</SectionLabel>
                <h2 className="font-serif text-3xl sm:text-4xl text-[var(--ink)] font-medium mt-2">
                  {t.activitiesSection.titlePrefix} <em>{t.activitiesSection.titleHighlight}</em>
                </h2>
                <p className="text-sm text-[var(--ink-soft)] mt-2 max-w-xl">
                  {t.activitiesSection.subtitle}
                </p>
              </div>
              <Link href="/activities-spa" className="button button-outline inline-flex items-center gap-2 mt-4 md:mt-0">
                <span>{t.activitiesSection.viewAllBtn}</span> <ArrowRight size={15} />
              </Link>
            </div>
            <ActivitiesCarousel />
            <div className="mt-8">
              <SpaCarousel locale={locale} />
            </div>
          </div>
        </SmoothLazySection>

        {/* 2. Pools & Beach Section */}
        <SmoothLazySection id="pools-beach" className="section bg-[var(--paper)] border-t border-[var(--line)]">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <SectionLabel>{t.poolsSection.sectionLabel}</SectionLabel>
                <h2 className="font-serif text-3xl sm:text-4xl text-[var(--ink)] font-medium mt-2">
                  {t.poolsSection.titlePrefix} <em>{t.poolsSection.titleHighlight}</em>
                </h2>
                <p className="text-sm text-[var(--ink-soft)] mt-2 max-w-xl">
                  {t.poolsSection.subtitle}
                </p>
              </div>
              <Link href="/pools-beach" className="button button-outline inline-flex items-center gap-2 mt-4 md:mt-0">
                <span>{t.poolsSection.exploreBtn}</span> <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[var(--shell)] border border-[var(--line)] rounded-xl overflow-hidden group">
                <img
                  src="https://www.orkalotusbeach.com/wp-content/uploads/2025/07/pools_800x1200.jpg"
                  alt="Main Lagoon Pool"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-5">
                  <span className="text-[10px] uppercase font-bold text-[var(--tide)] tracking-wider">{t.poolsSection.card1Tag}</span>
                  <h3 className="font-serif text-xl font-medium text-[var(--ink)] mt-1">{t.poolsSection.card1Title}</h3>
                  <p className="text-xs text-[var(--ink-soft)] mt-2">{t.poolsSection.card1Desc}</p>
                </div>
              </div>

              <div className="bg-[var(--shell)] border border-[var(--line)] rounded-xl overflow-hidden group">
                <img
                  src="https://www.orkalotusbeach.com/wp-content/uploads/2025/06/Relax-Pool_1200x800-800x533.jpg"
                  alt="Relax Pool +16"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-5">
                  <span className="text-[10px] uppercase font-bold text-[var(--tide)] tracking-wider">{t.poolsSection.card2Tag}</span>
                  <h3 className="font-serif text-xl font-medium text-[var(--ink)] mt-1">{t.poolsSection.card2Title}</h3>
                  <p className="text-xs text-[var(--ink-soft)] mt-2">{t.poolsSection.card2Desc}</p>
                </div>
              </div>

              <div className="bg-[var(--shell)] border border-[var(--line)] rounded-xl overflow-hidden group">
                <img
                  src="https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/LOTUS%20BEACH%20AERIAL%20VIEW.jpg"
                  alt="Private Beach & Piers"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-5">
                  <span className="text-[10px] uppercase font-bold text-[var(--tide)] tracking-wider">{t.poolsSection.card3Tag}</span>
                  <h3 className="font-serif text-xl font-medium text-[var(--ink)] mt-1">{t.poolsSection.card3Title}</h3>
                  <p className="text-xs text-[var(--ink-soft)] mt-2">{t.poolsSection.card3Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </SmoothLazySection>

        {/* 3. Restaurants & Bars Section */}
        <SmoothLazySection id="restaurants-bars" className="section bg-[var(--shell)] border-t border-[var(--line)]">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <SectionLabel>{t.diningSection.sectionLabel}</SectionLabel>
                <h2 className="font-serif text-3xl sm:text-4xl text-[var(--ink)] font-medium mt-2">
                  {t.diningSection.titlePrefix} <em>{t.diningSection.titleHighlight}</em>
                </h2>
                <p className="text-sm text-[var(--ink-soft)] mt-2 max-w-xl">
                  {t.diningSection.subtitle}
                </p>
              </div>
              <Link href="/restaurants-bars" className="button button-outline inline-flex items-center gap-2 mt-4 md:mt-0">
                <span>{t.diningSection.viewBtn}</span> <ArrowRight size={15} />
              </Link>
            </div>
            <RestaurantBarCarousel locale={locale} />
          </div>
        </SmoothLazySection>

        {/* 4. Mini Club Interactive Section */}
        <SmoothLazySection id="mini-club" className="section bg-[var(--paper)] border-t border-[var(--line)]">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <SectionLabel>{t.miniClubSection.sectionLabel}</SectionLabel>
                <h2 className="font-serif text-3xl sm:text-4xl text-[var(--ink)] font-medium mt-2">
                  {t.miniClubSection.titlePrefix} <em>{t.miniClubSection.titleHighlight}</em>
                </h2>
                <p className="text-sm text-[var(--ink-soft)] mt-2 max-w-2xl">
                  {t.miniClubSection.subtitle}
                </p>
              </div>
              <Link href="/mini-club" className="button button-outline inline-flex items-center gap-2 mt-4 md:mt-0">
                <span>{t.miniClubSection.viewBtn}</span> <ArrowRight size={15} />
              </Link>
            </div>

            <MiniClubInteractive locale={locale} showFullPageLink={true} />
          </div>
        </SmoothLazySection>

        {/* Rate Your Lotus - 5-Star Luxury Experience Rating Section */}
        <RateYourLotusPromoSection locale={locale} />

        {/* 5. Complete 16 Portals Grid */}
        <SmoothLazySection className="section bg-[var(--shell)] border-t border-[var(--line)]">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <SectionLabel>{t.portalsSection.sectionLabel}</SectionLabel>
                <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[var(--ink)] mt-2">
                  {t.portalsSection.titlePrefix} <em>{t.portalsSection.titleHighlight}</em>
                </h2>
                <p className="text-sm text-[var(--ink-soft)] mt-3 max-w-xl">
                  {t.portalsSection.subtitle}
                </p>
              </div>
              <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-bold mt-4 md:mt-0">
                {t.portalsSection.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {t.portalsSection.portals.map((sec) => {
                const fitConfig = portalImageFitConfig[sec.href];
                const isContain = fitConfig?.fit === "contain";

                return (
                  <Link
                    key={sec.href}
                    href={sec.href}
                    className="group block bg-[var(--shell)] border border-[var(--line)] rounded-xl overflow-hidden hover:border-[var(--tide)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className={`relative h-44 overflow-hidden ${fitConfig?.bg || "bg-black/90"} ${isContain ? fitConfig.padding || "p-3" : ""}`}>
                      <img
                        src={portalImages[sec.href] || "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/genel1.jpg"}
                        alt={sec.title}
                        className={`w-full h-full transition-transform duration-500 ${
                          isContain
                            ? "object-contain group-hover:scale-102"
                            : "object-cover group-hover:scale-105"
                        }`}
                        style={{ objectPosition: portalObjectPositions[sec.href] || "center" }}
                        loading="lazy"
                        decoding="async"
                      />
                      {!isContain && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      )}
                      {sec.tag && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded text-[10px] uppercase font-bold tracking-wider text-[var(--ink)]">
                          {sec.tag}
                        </span>
                      )}
                      <div className="absolute bottom-3 left-3 text-white">
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-1 text-white">
                          {portalIcons[sec.href] || <Sparkles size={18} />}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col justify-between min-h-[140px]">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-[var(--ink)] group-hover:text-[var(--tide)] transition-colors">
                        {sec.title}
                      </h3>
                      <p className="text-xs text-[var(--ink-soft)] mt-2 leading-relaxed line-clamp-2">
                        {sec.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--tide)]">
                      <span>{t.portalsSection.openPortal}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </Link>
                );
              })}
            </div>
          </div>
        </SmoothLazySection>

        {/* Interactive Master Map & Marmaris Satellite Map */}
        <SmoothLazySection>
          <ResortMasterMap />
        </SmoothLazySection>
        <SmoothLazySection>
          <MarmarisGoogleMap />
        </SmoothLazySection>

        {/* Digital Concierge Q&A */}
        <SmoothLazySection className="section concierge-section">
          <div className="container concierge-layout">
            <div className="concierge-copy">
              <div className="concierge-symbol">
                <span className="lotus-glyph lotus-glyph-light" aria-hidden="true"><i /><i /><i /><i /></span>
              </div>
              <SectionLabel light>{t.concierge.sectionLabel}</SectionLabel>
              <h2>{t.concierge.titlePrefix}<br /><em>{t.concierge.titleHighlight}</em></h2>
              <p>
                {t.concierge.subtitle}
              </p>
              <Link href="/contact" className="button button-light inline-flex items-center gap-2">
                <span>{t.concierge.contactBtn}</span> <ArrowRight size={16} />
              </Link>
            </div>

            <div className="concierge-panel">
              <div className="concierge-panel-header">
                <span><span className="live-pulse live-pulse-light" /> {t.concierge.panelTitle}</span>
                <Sparkles size={17} />
              </div>
              <div className="question-list">
                {t.concierge.questions.map((item, index) => (
                  <button
                    key={item.q}
                    className={expandedQuestion === index ? "question-item open" : "question-item"}
                    onClick={() => setExpandedQuestion(expandedQuestion === index ? -1 : index)}
                  >
                    <span>{item.q}</span>
                    <span className="question-icon">
                      {expandedQuestion === index ? <X size={14} /> : <ArrowDownRight size={15} />}
                    </span>
                    {expandedQuestion === index && <p>{item.a}</p>}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("open-orka-concierge"))}
                className="concierge-input w-full text-left cursor-pointer hover:border-[#e4bd77] transition group"
                title="Open AI Digital Concierge"
              >
                <span className="group-hover:text-white transition">{t.concierge.inputPlaceholder}</span>
                <Send size={16} className="text-[#e4bd77] group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </SmoothLazySection>

        {/* Dynamic Moving Lines Ribbon 2 - Pre-Footer Section */}
        <SmoothLazySection className="relative overflow-hidden bg-[var(--paper)] py-2 border-t border-[var(--line)]">
          <DynamicMovingLines
            height="85px"
            lineCount={3}
            colorScheme="blue"
            showBadge={true}
            badgeText={t.ribbon2.badge}
            title={<>{t.ribbon2.titlePrefix} <em>{t.ribbon2.titleHighlight}</em></>}
            subtitle={t.ribbon2.subtitle}
          />
        </SmoothLazySection>
      </main>

      {/* Date-Click Framed Modal with Pinch-to-Zoom & Pan */}
      <ZoomableModal
        isOpen={!!selectedCalendarDate}
        onClose={() => setSelectedCalendarDate(null)}
        subtitle={t.modals.dailySchedule}
        title={
          selectedCalendarDate ? (
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--ink)]">
                {selectedCalendarDate}
              </span>
              <span className="text-xs text-[var(--ink-soft)] font-sans font-normal mt-0.5">
                {clickedDateActivities.length} {t.modals.scheduledMomentsAvailable}
              </span>
            </div>
          ) : null
        }
        maxWidth="max-w-2xl"
      >
        <div className="calendar-popup-body pt-0 px-0">
          {clickedDateActivities.length > 0 ? (
            clickedDateActivities.map((act) => {
              const isPending = act.status === "pending";
              const isSaved = savedActivities.includes(act.id);
              return (
                <div key={act.id} className="calendar-popup-event-item">
                  <div className="calendar-popup-time">
                    <span>{act.start}</span>
                    <small>{act.end}</small>
                  </div>
                  <div className="calendar-popup-details">
                    <div className="calendar-popup-badge-row">
                      <span className="calendar-popup-badge">{act.category}</span>
                      {isPending && (
                        <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                          {t.todaySchedule.scheduleToBeConfirmed}
                        </span>
                      )}
                    </div>
                    <h4 className="calendar-popup-event-title">{act.title[locale] || act.title.en}</h4>
                    <p className="calendar-popup-event-desc">{act.description[locale] || act.description.en}</p>
                    <div className="calendar-popup-meta">
                      <span><MapPin size={13} className="text-[var(--tide)]" /> {act.location}</span>
                      <span><CircleUserRound size={13} className="text-[var(--gold)]" /> {act.staff}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className={`px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                        isSaved
                          ? "bg-[var(--tide)] text-white"
                          : "bg-[var(--tide-soft)] text-[var(--tide)] hover:bg-[var(--tide)] hover:text-white"
                      }`}
                      onClick={() => toggleSaved(act)}
                    >
                      {isSaved ? <Check size={13} /> : <CalendarDays size={13} />}
                      <span>{isSaved ? t.todaySchedule.saved : t.todaySchedule.save}</span>
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded text-[var(--ink-soft)] hover:text-[var(--tide)]"
                      onClick={() => {
                        setSelectedCalendarDate(null);
                        setSelectedActivity(act);
                      }}
                      aria-label="View activity details"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-[var(--ink-soft)]">
              <CalendarDays size={32} className="mx-auto mb-2 opacity-50" />
              <p>{t.modals.noActivities}</p>
            </div>
          )}
        </div>

        <div className="calendar-popup-footer mt-4 pt-4 border-t border-[var(--line)]">
          <span>{t.modals.seaShiftNote}</span>
          <Link
            href="/contact"
            className="text-[var(--tide)] font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-1"
            onClick={() => setSelectedCalendarDate(null)}
          >
            <span>{t.modals.askGuestRelations}</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </ZoomableModal>

      {/* Individual Activity Details Modal with Pinch-to-Zoom & Pan */}
      <ZoomableModal
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        maxWidth="max-w-lg"
      >
        {selectedActivity && (
          <div className="activity-detail-inner">
            <div className="detail-top flex items-center justify-between">
              <span className="detail-category">
                <Icon name={selectedActivity.icon} size={15} /> {selectedActivity.category}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--tide)]">
                Orka Lotus Experience
              </span>
            </div>
            <div className="detail-time">
              <strong>{selectedActivity.start}</strong>
              <span>— {selectedActivity.end}</span>
            </div>
            <h2>{selectedActivity.title[locale] || selectedActivity.title.en}</h2>
            <p className="mt-2 text-[var(--ink-soft)] text-sm leading-relaxed">
              {selectedActivity.description[locale] || selectedActivity.description.en}
            </p>
            <div className="detail-facts">
              <span><Navigation size={15} /> {selectedActivity.location}</span>
              <span><Icon name="sparkles" size={15} /> {selectedActivity.staff}</span>
              {selectedActivity.capacity && <span><CircleUserRound size={15} /> {selectedActivity.capacity}</span>}
            </div>
            <div className="detail-actions">
              <button className="button button-dark" onClick={() => toggleSaved(selectedActivity)}>
                {savedActivities.includes(selectedActivity.id) ? <Check size={16} /> : <CalendarDays size={16} />} {savedActivities.includes(selectedActivity.id) ? t.modals.savedToYourDay : t.modals.addToMyDay}
              </button>
              <button className="button button-outline" onClick={() => toast(t.modals.directionsToast, { description: selectedActivity.location })}>
                <Navigation size={15} /> {t.modals.directions}
              </button>
            </div>
            <div className="detail-disclaimer">
              {selectedActivity.status === "pending" ? t.modals.pendingNote : t.modals.confirmedNote}
            </div>
          </div>
        )}
      </ZoomableModal>
    </PageShell>
  );
}
