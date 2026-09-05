import { useEffect, useMemo, useRef, useState } from "react";
import {
  Anchor,
  Baby,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Coffee,
  Compass,
  FileSpreadsheet,
  GlassWater,
  Heart,
  HelpCircle,
  Info,
  MapPin,
  Moon,
  Music2,
  Phone,
  Shield,
  Sparkles,
  Sun,
  Sunset,
  Umbrella,
  Utensils,
  Waves,
  Wine,
  type LucideIcon,
} from "lucide-react";
import DigitalClock from "./DigitalClock";
import {
  getDailyScheduleForDate,
  type Activity,
  type Locale,
} from "@/data/content";
import { livePanelTranslations } from "@/data/livePanelTranslations";
import { toIsoDate } from "@/lib/dateUtils";
import {
  resortMasterSchedule,
  type FactSheetVenueSchedule,
} from "@/data/factSheetSchedule";
import {
  includedServicesList,
  extraChargeServicesList,
} from "@/data/factSheetData";

const categoryIconMap: Record<string, LucideIcon> = {
  dining: Utensils,
  food: Utensils,
  wellness: Sun,
  spa: Sparkles,
  pool: Waves,
  swim: Waves,
  watersports: Anchor,
  "water sports": Anchor,
  beach: Sunset,
  entertainment: Music2,
  music: Music2,
  kids: Baby,
  children: Baby,
  nightlife: Sunset,
  activities: Compass,
  glass: GlassWater,
  wine: Wine,
  coffee: Coffee,
  waves: Waves,
  umbrella: Umbrella,
  sparkles: Sparkles,
  activity: Sun,
  baby: Baby,
  anchor: Anchor,
  compass: Compass,
};

const categoryGradients: Record<string, { bg: string; border: string; badge: string; text: string }> = {
  dining: {
    bg: "rgba(227, 189, 116, 0.08)",
    border: "rgba(227, 189, 116, 0.4)",
    badge: "rgba(227, 189, 116, 0.18)",
    text: "#e3bd74",
  },
  wellness: {
    bg: "rgba(56, 189, 248, 0.08)",
    border: "rgba(56, 189, 248, 0.4)",
    badge: "rgba(56, 189, 248, 0.18)",
    text: "#38bdf8",
  },
  pool: {
    bg: "rgba(14, 118, 128, 0.12)",
    border: "rgba(96, 184, 179, 0.45)",
    badge: "rgba(96, 184, 179, 0.18)",
    text: "#60b8b3",
  },
  watersports: {
    bg: "rgba(0, 229, 255, 0.08)",
    border: "rgba(0, 229, 255, 0.4)",
    badge: "rgba(0, 229, 255, 0.18)",
    text: "#00e5ff",
  },
  "water sports": {
    bg: "rgba(0, 229, 255, 0.08)",
    border: "rgba(0, 229, 255, 0.4)",
    badge: "rgba(0, 229, 255, 0.18)",
    text: "#00e5ff",
  },
  beach: {
    bg: "rgba(245, 158, 11, 0.08)",
    border: "rgba(245, 158, 11, 0.4)",
    badge: "rgba(245, 158, 11, 0.18)",
    text: "#fbbf24",
  },
  entertainment: {
    bg: "rgba(168, 85, 247, 0.08)",
    border: "rgba(168, 85, 247, 0.4)",
    badge: "rgba(168, 85, 247, 0.18)",
    text: "#c084fc",
  },
  kids: {
    bg: "rgba(236, 72, 153, 0.08)",
    border: "rgba(236, 72, 153, 0.4)",
    badge: "rgba(236, 72, 153, 0.18)",
    text: "#f472b6",
  },
  nightlife: {
    bg: "rgba(129, 140, 248, 0.08)",
    border: "rgba(129, 140, 248, 0.4)",
    badge: "rgba(129, 140, 248, 0.18)",
    text: "#818cf8",
  },
  activities: {
    bg: "rgba(45, 212, 191, 0.08)",
    border: "rgba(45, 212, 191, 0.4)",
    badge: "rgba(45, 212, 191, 0.18)",
    text: "#2dd4bf",
  },
};

function getCategoryTheme(category: string) {
  const key = category.toLowerCase().trim();
  return (
    categoryGradients[key] || {
      bg: "rgba(200, 159, 87, 0.08)",
      border: "rgba(200, 159, 87, 0.4)",
      badge: "rgba(200, 159, 87, 0.18)",
      text: "#dfba73",
    }
  );
}

function getCategoryIcon(category: string, iconKey?: string): LucideIcon {
  if (iconKey && iconKey in categoryIconMap) return categoryIconMap[iconKey];
  const cat = category.toLowerCase().trim();
  if (cat.includes("food") || cat.includes("dining") || cat.includes("restaurant") || cat.includes("breakfast") || cat.includes("lunch") || cat.includes("dinner")) return Utensils;
  if (cat.includes("water") || cat.includes("ski") || cat.includes("boat") || cat.includes("parasail")) return Anchor;
  if (cat.includes("pool") || cat.includes("aqua") || cat.includes("swim")) return Waves;
  if (cat.includes("yoga") || cat.includes("wellness") || cat.includes("spa") || cat.includes("gym")) return Sun;
  if (cat.includes("kid") || cat.includes("mini") || cat.includes("child")) return Baby;
  if (cat.includes("music") || cat.includes("concert") || cat.includes("show") || cat.includes("entertainment") || cat.includes("party")) return Music2;
  if (cat.includes("sunset") || cat.includes("beach") || cat.includes("pier")) return Sunset;
  if (cat.includes("bar") || cat.includes("drink")) return GlassWater;
  return Sparkles;
}

function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(":").map((v) => parseInt(v, 10));
  return (h || 0) * 60 + (m || 0);
}

function getIstanbulNow(): {
  dateObj: Date;
  todayIso: string;
  currentMinutes: number;
  currentSeconds: number;
} {
  const now = new Date();
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Istanbul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    let year = 2026;
    let month = 8;
    let day = 30;
    let hour = 10;
    let minute = 0;
    let second = 0;

    for (const p of parts) {
      if (p.type === "year") year = parseInt(p.value, 10);
      if (p.type === "month") month = parseInt(p.value, 10);
      if (p.type === "day") day = parseInt(p.value, 10);
      if (p.type === "hour") hour = parseInt(p.value, 10);
      if (p.type === "minute") minute = parseInt(p.value, 10);
      if (p.type === "second") second = parseInt(p.value, 10);
    }

    const todayIso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const currentMinutes = hour * 60 + minute;
    const currentSeconds = second;
    const dateObj = new Date(year, month - 1, day, hour, minute, second);

    return { dateObj, todayIso, currentMinutes, currentSeconds };
  } catch {
    const todayIso = toIsoDate(now);
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const currentSeconds = now.getSeconds();
    return { dateObj: now, todayIso, currentMinutes, currentSeconds };
  }
}

interface LiveHotelPanelProps {
  locale?: Locale | "ar" | "fa";
  onSelectActivity?: (activity: Activity) => void;
  className?: string;
}

type ActiveTabType = "live" | "bars" | "dining" | "spapools" | "entertainment" | "folio";

export default function LiveHotelPanel({
  locale = "en",
  onSelectActivity,
  className = "",
}: LiveHotelPanelProps) {
  const safeLocale = (locale as keyof typeof livePanelTranslations) in livePanelTranslations ? (locale as keyof typeof livePanelTranslations) : "en";
  const tr = livePanelTranslations[safeLocale] || livePanelTranslations.en;
  const isRtl = safeLocale === "ar" || safeLocale === "fa";

  const [timeState, setTimeState] = useState(() => getIstanbulNow());
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTabType>("live");
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsContainerRef.current) {
      const scrollAmount = direction === "left" ? -180 : 180;
      tabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Sync Istanbul time every 1 second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeState(getIstanbulNow());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { todayIso, currentMinutes, currentSeconds } = timeState;

  // Master activity schedule for today
  const todayActivities = useMemo(() => {
    return getDailyScheduleForDate(todayIso);
  }, [todayIso]);

  // Master schedule for tomorrow
  const tomorrowIso = useMemo(() => {
    const parts = todayIso.split("-");
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10) + 1);
    return toIsoDate(d);
  }, [todayIso]);

  const tomorrowActivities = useMemo(() => {
    return getDailyScheduleForDate(tomorrowIso);
  }, [tomorrowIso]);

  // Calculate Active Events, Next Event, and Upcoming Events
  const { liveEvents, nextEvent, upcomingEvents, secondsUntilNext } = useMemo(() => {
    const live: Activity[] = [];
    const upcoming: Activity[] = [];

    todayActivities.forEach((act) => {
      const startMin = parseTimeToMinutes(act.start);
      let endMin = parseTimeToMinutes(act.end);

      if (endMin < startMin) {
        if (currentMinutes >= startMin || currentMinutes < endMin) {
          live.push(act);
          return;
        }
      } else {
        if (currentMinutes >= startMin && currentMinutes < endMin) {
          live.push(act);
          return;
        }
      }

      if (startMin > currentMinutes) {
        upcoming.push(act);
      }
    });

    upcoming.sort((a, b) => parseTimeToMinutes(a.start) - parseTimeToMinutes(b.start));

    let next: Activity | null = upcoming[0] || null;
    let nextStartTotalSeconds = 0;

    if (next) {
      const nextStartMin = parseTimeToMinutes(next.start);
      nextStartTotalSeconds = (nextStartMin - currentMinutes) * 60 - currentSeconds;
    } else if (tomorrowActivities.length > 0) {
      next = tomorrowActivities[0];
      const nextStartMin = parseTimeToMinutes(next.start);
      const minutesUntilMidnight = 24 * 60 - currentMinutes;
      nextStartTotalSeconds = (minutesUntilMidnight + nextStartMin) * 60 - currentSeconds;
    }

    return {
      liveEvents: live,
      nextEvent: next,
      upcomingEvents: upcoming.slice(1, 4),
      secondsUntilNext: Math.max(0, nextStartTotalSeconds),
    };
  }, [todayActivities, tomorrowActivities, currentMinutes, currentSeconds]);

  // Real-time status evaluator for static Fact Sheet Venues
  const evaluatedVenues = useMemo(() => {
    return resortMasterSchedule.map((venue) => {
      let isOpen = false;
      let statusText = tr.closed;
      let remainingText = "";

      if (venue.is24h) {
        isOpen = true;
        statusText = tr.openNow;
        remainingText = tr.allDayService;
      } else {
        const startMin = venue.startHour * 60 + venue.startMinute;
        let endMin = venue.endHour * 60 + venue.endMinute;

        if (endMin > 24 * 60) {
          // Crosses midnight, e.g. 23:00 to 02:00
          if (currentMinutes >= startMin || currentMinutes < (endMin - 24 * 60)) {
            isOpen = true;
            statusText = tr.openNow;
            const diff = (currentMinutes >= startMin) ? (endMin - currentMinutes) : ((endMin - 24 * 60) - currentMinutes);
            remainingText = `${tr.until} ${venue.hours.split("-")[1]?.trim() || ""}`;
          }
        } else {
          if (currentMinutes >= startMin && currentMinutes < endMin) {
            isOpen = true;
            statusText = tr.openNow;
            remainingText = `${tr.until} ${venue.hours.split("-")[1]?.trim() || ""}`;
          }
        }
      }

      return {
        ...venue,
        isOpen,
        statusText,
        remainingText,
      };
    });
  }, [currentMinutes, tr]);

  // Filter venues by selected category tab
  const categoryVenues = useMemo(() => {
    if (activeTab === "bars") return evaluatedVenues.filter((v) => v.category === "Bars");
    if (activeTab === "dining") return evaluatedVenues.filter((v) => v.category === "Dining");
    if (activeTab === "spapools") return evaluatedVenues.filter((v) => v.category === "Spa & Wellness" || v.category === "Pools & Beach");
    if (activeTab === "entertainment") return evaluatedVenues.filter((v) => v.category === "Entertainment" || v.category === "Activities & Kids" || v.category === "Services");
    return evaluatedVenues;
  }, [activeTab, evaluatedVenues]);

  // Open venues counter
  const openCount = useMemo(() => {
    return evaluatedVenues.filter((v) => v.isOpen).length;
  }, [evaluatedVenues]);

  // Localized date display for the clock banner
  const localizedDateStr = useMemo(() => {
    const now = timeState.dateObj;
    const langCode =
      safeLocale === "tr"
        ? "tr-TR"
        : safeLocale === "ru"
        ? "ru-RU"
        : safeLocale === "de"
        ? "de-DE"
        : safeLocale === "ar"
        ? "ar-EG"
        : safeLocale === "fa"
        ? "fa-IR"
        : "en-US";

    try {
      const weekday = new Intl.DateTimeFormat(langCode, { weekday: "long" }).format(now);
      const day = new Intl.DateTimeFormat(langCode, { day: "2-digit" }).format(now);
      const month = new Intl.DateTimeFormat(langCode, { month: "long" }).format(now);
      const year = now.getFullYear();

      if (safeLocale === "tr") return `${weekday.toUpperCase()} • ${day} ${month.toUpperCase()} ${year}`;
      if (safeLocale === "ru") return `${weekday.toUpperCase()} • ${day} ${month.toUpperCase()} ${year}`;
      if (safeLocale === "de") return `${weekday.toUpperCase()} • ${day}. ${month.toUpperCase()} ${year}`;
      if (safeLocale === "ar" || safeLocale === "fa") return `${weekday} • ${day} ${month} ${year}`;
      return `${weekday.toUpperCase()} • ${day} ${month.toUpperCase()} ${year}`;
    } catch {
      return `${todayIso}`;
    }
  }, [timeState.dateObj, safeLocale, todayIso]);

  interface CountdownInfo {
    hours: number;
    totalMinutes: number;
    mins: number;
    seconds: number;
    formatted: string;
  }

  const countdownFormatted: CountdownInfo = useMemo(() => {
    if (secondsUntilNext <= 0) {
      return { hours: 0, totalMinutes: 0, mins: 0, seconds: 0, formatted: "00:00" };
    }
    const totalMinutes = Math.floor(secondsUntilNext / 60);
    const secs = secondsUntilNext % 60;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    return {
      hours,
      totalMinutes,
      mins,
      seconds: secs,
      formatted:
        hours > 0
          ? `${hours}h ${String(mins).padStart(2, "0")}m`
          : `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`,
    };
  }, [secondsUntilNext]);

  const getLoc = (obj: { en: string; tr: string; ru: string; de: string }) => {
    const loc = safeLocale as Locale;
    return obj[loc] || obj.en || "";
  };

  return (
    <section
      id="live-hotel-panel"
      className={`live-hotel-hero-panel ${className}`}
      dir={isRtl ? "rtl" : "ltr"}
      aria-label="Orka Lotus Beach Hotel Live Activity & Fact Sheet Schedule Concierge"
    >
      <div className="container mx-auto px-3 sm:px-6">
        {/* Main Luxurious Golden Framed Container */}
        <div className="relative overflow-hidden rounded-2xl bg-[#092231]/95 backdrop-blur-xl border border-[rgba(200,159,87,0.45)] shadow-[0_0_50px_rgba(200,159,87,0.15)] transition-all duration-300">
          {/* Ambient Glows */}
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#dfba73]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#00e5ff]/10 blur-3xl pointer-events-none" />

          {/* Top Bar: Digital Clock + Live Date + Timezone Banner */}
          <div className="border-b border-[rgba(200,159,87,0.25)] bg-[#061a26]/90 px-4 sm:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Clock & Timezone Details */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left w-full md:w-auto justify-center md:justify-start">
              <div className="scale-90 sm:scale-100 transform-gpu">
                <DigitalClock timezone="Europe/Istanbul" showSeconds={true} />
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#dfba73] uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#dfba73] animate-ping" />
                  {tr.hotelTimeLabel}
                </span>
                <p className="text-sm sm:text-base font-medium text-white/95 tracking-wide mt-0.5 font-serif">
                  {localizedDateStr}
                </p>
                <span className="text-[10px] text-white/50 tracking-wider">
                  {tr.timezoneBadge}
                </span>
              </div>
            </div>

            {/* Glowing Live Badge & Open Venues Summary */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(200,159,87,0.15)] border border-[rgba(200,159,87,0.45)] shadow-[0_0_15px_rgba(200,159,87,0.2)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfba73] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#dfba73]" />
                </span>
                <span className="text-xs font-bold tracking-wider text-[#f5dfaa]">
                  {openCount} {tr.openVenuesCount}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowFullSchedule((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white/85 border border-[rgba(200,159,87,0.3)] transition-colors"
                title={showFullSchedule ? tr.hideFullSchedule : tr.viewFullSchedule}
              >
                <Calendar size={13} className="text-[#dfba73]" />
                <span>{showFullSchedule ? tr.hideFullSchedule : tr.viewFullSchedule}</span>
                {showFullSchedule ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
          </div>

          {/* Navigation Category Ribbon with Transparent Left/Right Controls & Compact Golden Frames */}
          <div className="relative px-2 sm:px-6 py-2.5 bg-[#05151f]/95 border-b border-[rgba(200,159,87,0.25)] flex items-center gap-1.5 sm:gap-2">
            {/* Left Scroll Navigation Button */}
            <button
              type="button"
              onClick={() => scrollTabs("left")}
              className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-white/[0.05] hover:bg-[#dfba73]/20 text-[#dfba73] hover:text-[#fde9bc] border border-[rgba(200,159,87,0.3)] hover:border-[#dfba73] backdrop-blur-md transition-all active:scale-95 shadow-sm"
              aria-label="Scroll tabs left"
              title="Previous categories"
            >
              <ChevronLeft size={15} />
            </button>

            {/* Scrollable Tabs Track */}
            <div
              ref={tabsContainerRef}
              className="flex-1 flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none scroll-smooth py-0.5 px-0.5"
            >
              {[
                { id: "live" as ActiveTabType, label: tr.tabLiveMoments, icon: Sparkles },
                { id: "bars" as ActiveTabType, label: tr.tabBars, icon: GlassWater },
                { id: "dining" as ActiveTabType, label: tr.tabDining, icon: Utensils },
                { id: "spapools" as ActiveTabType, label: tr.tabSpaPools, icon: Waves },
                { id: "entertainment" as ActiveTabType, label: tr.tabEntertainment, icon: Music2 },
                { id: "folio" as ActiveTabType, label: tr.tabIncludedFolio, icon: FileSpreadsheet },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-gradient-to-r from-[#dfba73] via-[#caa050] to-[#b8862d] text-[#071924] font-bold shadow-[0_2px_10px_rgba(200,159,87,0.35)] border border-[#fae2ae]"
                        : "bg-[#061824]/90 text-white/80 hover:text-white hover:bg-white/[0.08] border border-[rgba(200,159,87,0.25)] hover:border-[rgba(200,159,87,0.55)]"
                    }`}
                  >
                    <Icon
                      size={13}
                      className={isActive ? "text-[#071924] shrink-0" : "text-[#dfba73] shrink-0"}
                    />
                    <span className="leading-none">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Scroll Navigation Button */}
            <button
              type="button"
              onClick={() => scrollTabs("right")}
              className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-white/[0.05] hover:bg-[#dfba73]/20 text-[#dfba73] hover:text-[#fde9bc] border border-[rgba(200,159,87,0.3)] hover:border-[#dfba73] backdrop-blur-md transition-all active:scale-95 shadow-sm"
              aria-label="Scroll tabs right"
              title="Next categories"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          {/* TAB 1: LIVE NOW + NEXT UP TIMELINE */}
          {activeTab === "live" && (
            <div className="p-4 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left / Center: LIVE NOW Active Activities */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-[rgba(200,159,87,0.25)]">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#dfba73] shadow-[0_0_8px_#dfba73]" />
                      <h3 className="text-xs font-bold tracking-[0.2em] text-[#dfba73] uppercase">
                        {liveEvents.length > 1
                          ? `${liveEvents.length} ${tr.activitiesActiveCount}`
                          : liveEvents.length === 1
                          ? `1 ${tr.singleActiveMoment}`
                          : tr.liveNow}
                      </h3>
                    </div>

                    {liveEvents.length > 0 && (
                      <span className="text-[11px] font-semibold text-[#dfba73] bg-[rgba(200,159,87,0.15)] px-2.5 py-0.5 rounded-full border border-[rgba(200,159,87,0.35)]">
                        {tr.openNow}
                      </span>
                    )}
                  </div>

                  {/* Live Activity Cards */}
                  {liveEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {liveEvents.map((act) => {
                        const IconComponent = getCategoryIcon(act.category, act.icon);
                        const theme = getCategoryTheme(act.category);

                        const startMin = parseTimeToMinutes(act.start);
                        let endMin = parseTimeToMinutes(act.end);
                        if (endMin < startMin) endMin += 24 * 60;

                        const totalDuration = Math.max(1, endMin - startMin);
                        const elapsedMin = Math.max(0, currentMinutes - startMin);
                        const progressPct = Math.min(100, Math.round((elapsedMin / totalDuration) * 100));

                        const isJustStarted = elapsedMin <= 10;
                        const isEndingSoon = totalDuration - elapsedMin <= 15 && totalDuration - elapsedMin > 0;
                        const titleText = act.title[safeLocale as Locale] || act.title.en || "";

                        return (
                          <div
                            key={act.id}
                            onClick={() => onSelectActivity?.(act)}
                            className="group relative flex flex-col justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(200,159,87,0.25)] hover:border-[#dfba73]"
                            style={{
                              background: theme.bg,
                              borderColor: theme.border,
                            }}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2.5">
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center border shadow-inner"
                                    style={{
                                      backgroundColor: theme.badge,
                                      borderColor: theme.border,
                                      color: theme.text,
                                    }}
                                  >
                                    <IconComponent size={16} />
                                  </div>
                                  <span
                                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                                    style={{
                                      backgroundColor: theme.badge,
                                      borderColor: theme.border,
                                      color: theme.text,
                                    }}
                                  >
                                    {act.category}
                                  </span>
                                </div>

                                {isJustStarted ? (
                                  <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40 animate-pulse">
                                    {tr.justStarted}
                                  </span>
                                ) : isEndingSoon ? (
                                  <span className="text-[10px] font-bold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded-full border border-rose-400/40">
                                    {tr.endingSoon}
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-bold text-[#dfba73] bg-[rgba(200,159,87,0.2)] px-2 py-0.5 rounded-full border border-[rgba(200,159,87,0.4)]">
                                    ● {tr.active}
                                  </span>
                                )}
                              </div>

                              <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#dfba73] transition-colors leading-snug font-serif">
                                {titleText}
                              </h4>

                              <div className="flex items-center gap-1.5 text-xs text-white/75 mt-1.5">
                                <MapPin size={13} className="text-[#dfba73] shrink-0" />
                                <span className="truncate font-medium">{act.location}</span>
                              </div>
                            </div>

                            <div className="mt-3 pt-2.5 border-t border-white/10">
                              <div className="flex items-center justify-between text-[11px] text-white/80 font-medium">
                                <span className="flex items-center gap-1 text-[#f5dfaa]">
                                  <Clock size={12} className="text-[#dfba73]" />
                                  {act.start} – {act.end}
                                </span>
                                <span className="text-white/60">
                                  {tr.until} <strong className="text-white font-bold">{act.end}</strong>
                                </span>
                              </div>

                              <div
                                className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden"
                                title={`${progressPct}% ${tr.progressElapsed}`}
                              >
                                <div
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{
                                    width: `${progressPct}%`,
                                    backgroundColor: theme.text,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl border border-[rgba(200,159,87,0.25)] bg-white/5 text-center flex flex-col items-center justify-center py-8">
                      <Sunset size={32} className="text-[#dfba73] mb-2.5 opacity-80" />
                      <p className="text-sm font-semibold text-white/90">
                        {tr.noScheduledActivity}
                      </p>
                      <p className="text-xs text-white/60 mt-1 max-w-md">
                        {tr.peacefulBayMessage}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: NEXT UP Spotlight Card */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-[rgba(200,159,87,0.25)]">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#dfba73] shadow-[0_0_8px_#dfba73]" />
                      <h3 className="text-xs font-bold tracking-[0.2em] text-[#dfba73] uppercase">
                        {countdownFormatted.totalMinutes <= 30 ? tr.startingSoon : tr.nextUp}
                      </h3>
                    </div>

                    {nextEvent && (
                      <span className="text-[11px] font-bold text-[#dfba73] bg-[rgba(200,159,87,0.15)] px-2.5 py-0.5 rounded-full border border-[rgba(200,159,87,0.35)]">
                        {tr.startsAt} {nextEvent.start}
                      </span>
                    )}
                  </div>

                  {nextEvent ? (
                    <div
                      onClick={() => onSelectActivity?.(nextEvent)}
                      className="group relative p-5 rounded-xl border border-[rgba(200,159,87,0.45)] bg-gradient-to-br from-[rgba(200,159,87,0.15)] via-[#0d2a3b]/80 to-[#061a26]/90 shadow-[0_0_30px_rgba(200,159,87,0.15)] hover:shadow-[0_0_35px_rgba(200,159,87,0.25)] hover:border-[#dfba73] transition-all cursor-pointer flex-1 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            {(() => {
                              const NextIcon = getCategoryIcon(nextEvent.category, nextEvent.icon);
                              return (
                                <div className="w-8 h-8 rounded-lg bg-[rgba(200,159,87,0.2)] border border-[rgba(200,159,87,0.4)] text-[#dfba73] flex items-center justify-center shadow-inner">
                                  <NextIcon size={16} />
                                </div>
                              );
                            })()}
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#dfba73] bg-[rgba(200,159,87,0.15)] px-2 py-0.5 rounded border border-[rgba(200,159,87,0.3)]">
                              {nextEvent.category}
                            </span>
                          </div>

                          <span className="text-[10px] font-semibold text-white/70">
                            {nextEvent.start} – {nextEvent.end}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#dfba73] transition-colors mt-1 font-serif">
                          {nextEvent.title[safeLocale as Locale] || nextEvent.title.en}
                        </h4>

                        <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium mt-1.5">
                          <MapPin size={13} className="text-[#dfba73] shrink-0" />
                          <span className="truncate">{nextEvent.location}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3.5 border-t border-[rgba(200,159,87,0.25)]">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#dfba73] uppercase block mb-1">
                          {tr.startsIn}
                        </span>

                        <div className="flex items-baseline gap-2">
                          {countdownFormatted.hours > 0 ? (
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                {countdownFormatted.hours}
                              </span>
                              <span className="text-xs text-[#dfba73] font-semibold mr-2">
                                h
                              </span>
                              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                {String(countdownFormatted.mins).padStart(2, "0")}
                              </span>
                              <span className="text-xs text-[#dfba73] font-semibold">
                                {tr.minuteShort}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-baseline gap-2">
                              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_0_15px_rgba(200,159,87,0.4)]">
                                {countdownFormatted.formatted}
                              </span>
                              <span className="text-xs font-bold text-[#dfba73] uppercase tracking-wider">
                                {tr.minutes}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 rounded-xl border border-[rgba(200,159,87,0.25)] bg-white/5 text-center flex-1 flex flex-col items-center justify-center">
                      <p className="text-xs text-white/70">{tr.noScheduledActivity}</p>
                    </div>
                  )}

                  {/* Coming Later Preview Rail */}
                  {upcomingEvents.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-white/10">
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50 block mb-2">
                        {tr.comingLater}
                      </span>
                      <div className="space-y-1.5">
                        {upcomingEvents.map((act) => {
                          const LaterIcon = getCategoryIcon(act.category, act.icon);
                          return (
                            <div
                              key={act.id}
                              onClick={() => onSelectActivity?.(act)}
                              className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs cursor-pointer group"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <LaterIcon size={13} className="text-[#dfba73] shrink-0" />
                                <span className="text-white/90 group-hover:text-[#dfba73] transition-colors truncate font-medium">
                                  {act.title[safeLocale as Locale] || act.title.en}
                                </span>
                              </div>
                              <span className="text-[11px] font-semibold text-white/60 ml-2 shrink-0">
                                {act.start}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TABS 2, 3, 4, 5: FACT SHEET SCHEDULE VENUES (BARS, DINING, SPA & POOLS, ENTERTAINMENT) */}
          {activeTab !== "live" && activeTab !== "folio" && (
            <div className="p-4 sm:p-7">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-[rgba(200,159,87,0.25)]">
                <div>
                  <h3 className="gold-headline text-lg sm:text-xl font-bold">
                    {activeTab === "bars"
                      ? tr.tabBars
                      : activeTab === "dining"
                      ? tr.tabDining
                      : activeTab === "spapools"
                      ? tr.tabSpaPools
                      : tr.tabEntertainment}
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    Real-time operational status computed for Marmaris / Istanbul Time
                  </p>
                </div>

                <span className="text-xs font-bold text-[#dfba73] bg-[rgba(200,159,87,0.15)] px-3 py-1 rounded-full border border-[rgba(200,159,87,0.3)]">
                  {categoryVenues.filter((v) => v.isOpen).length} / {categoryVenues.length} {tr.openNow}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryVenues.map((venue) => {
                  const VenueIcon = getCategoryIcon(venue.category, venue.icon);
                  return (
                    <div
                      key={venue.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                        venue.isOpen
                          ? "bg-[rgba(200,159,87,0.08)] border-[rgba(200,159,87,0.45)] shadow-[0_0_15px_rgba(200,159,87,0.1)]"
                          : "bg-white/5 border-white/10 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <div>
                        {/* Top: Icon + Operating Hours + Live Status */}
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                                venue.isOpen
                                  ? "bg-[rgba(200,159,87,0.2)] border-[rgba(200,159,87,0.4)] text-[#dfba73]"
                                  : "bg-white/10 border-white/15 text-white/60"
                              }`}
                            >
                              <VenueIcon size={14} />
                            </div>
                            <span className="font-mono text-xs font-bold text-white/90">
                              {venue.hours}
                            </span>
                          </div>

                          {venue.isOpen ? (
                            <span className="text-[10px] font-bold text-[#dfba73] bg-[rgba(200,159,87,0.2)] px-2 py-0.5 rounded-full border border-[rgba(200,159,87,0.45)] animate-pulse">
                              ● {tr.openNow}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-white/40 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                              {tr.closed}
                            </span>
                          )}
                        </div>

                        {/* Venue Name */}
                        <h4 className="text-base font-bold text-white font-serif leading-snug">
                          {getLoc(venue.name)}
                        </h4>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-[#dfba73] font-medium mt-1">
                          <MapPin size={12} className="shrink-0" />
                          <span className="truncate">{getLoc(venue.location)}</span>
                        </div>

                        {/* Concept Description */}
                        <p className="text-xs text-white/70 mt-2 leading-relaxed font-light">
                          {getLoc(venue.concept)}
                        </p>
                      </div>

                      {/* Bottom Footer: Included badge or highlight */}
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10.5px]">
                        <span
                          className={`font-semibold px-2 py-0.5 rounded ${
                            venue.included
                              ? "text-[#dfba73] bg-[rgba(200,159,87,0.15)] border border-[rgba(200,159,87,0.3)]"
                              : "text-amber-300 bg-amber-500/15 border border-amber-400/30"
                          }`}
                        >
                          {venue.included ? "Ultra All Inclusive" : "Extra Charge"}
                        </span>

                        {venue.highlight && (
                          <span className="text-white/60 truncate max-w-[170px]">
                            {getLoc(venue.highlight)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: INCLUDED & EXTRA CHARGE SERVICES FOLIO */}
          {activeTab === "folio" && (
            <div className="p-4 sm:p-7">
              <div className="max-w-3xl mb-6">
                <h3 className="gold-headline text-xl sm:text-2xl font-bold">
                  Official Fact Sheet Services Folio
                </h3>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  Complete breakdown of complimentary Ultra All-Inclusive privileges and specialized extra-charge luxuries.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Included Services */}
                <div className="p-5 rounded-xl border border-[rgba(200,159,87,0.45)] bg-[rgba(200,159,87,0.06)] shadow-lg">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(200,159,87,0.3)]">
                    <div className="flex items-center gap-2 text-[#dfba73]">
                      <CheckCircle2 size={18} />
                      <h4 className="font-serif text-lg font-bold text-white">
                        {tr.includedServicesTitle}
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0d2735] bg-gradient-to-r from-[#dfba73] to-[#b8862d] px-2.5 py-0.5 rounded shadow">
                      Free / Included
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {includedServicesList.map((srv, idx) => (
                      <li
                        key={idx}
                        className="p-2.5 rounded-lg bg-black/20 border border-[rgba(200,159,87,0.2)] flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Check size={13} className="text-[#dfba73] shrink-0" />
                          <span className="text-white/90 font-medium">
                            {getLoc(srv.title)}
                          </span>
                        </div>
                        {srv.badge && (
                          <span className="text-[10px] font-bold text-[#dfba73] bg-[rgba(200,159,87,0.15)] px-2 py-0.5 rounded border border-[rgba(200,159,87,0.3)] shrink-0">
                            {getLoc(srv.badge)}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Extra Charge Services */}
                <div className="p-5 rounded-xl border border-white/15 bg-white/5 shadow-lg">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2 text-white/90">
                      <Sparkles size={18} className="text-[#dfba73]" />
                      <h4 className="font-serif text-lg font-bold text-white">
                        {tr.extraServicesTitle}
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/70 bg-white/10 px-2.5 py-0.5 rounded border border-white/20">
                      Extra Charge
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {extraChargeServicesList.map((srv, idx) => (
                      <li
                        key={idx}
                        className="p-2.5 rounded-lg bg-black/20 border border-white/10 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#dfba73] shrink-0" />
                          <span className="text-white/90 font-medium">
                            {getLoc(srv.title)}
                          </span>
                        </div>
                        {srv.badge && (
                          <span className="text-[10px] font-bold text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/10 shrink-0">
                            {getLoc(srv.badge)}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Full Day Schedule Expandable Drawer */}
          {showFullSchedule && (
            <div className="border-t border-[rgba(200,159,87,0.25)] bg-[#05151f]/95 p-4 sm:p-6 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs sm:text-sm font-bold tracking-widest text-[#dfba73] uppercase flex items-center gap-2">
                  <Calendar size={14} />
                  {tr.fullDayTimeline} ({todayIso})
                </h4>
                <button
                  type="button"
                  onClick={() => setShowFullSchedule(false)}
                  className="text-xs text-white/60 hover:text-white"
                >
                  {tr.hideFullSchedule}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {todayActivities.map((act) => {
                  const ItemIcon = getCategoryIcon(act.category, act.icon);
                  const isCurrent = liveEvents.some((l) => l.id === act.id);
                  const isNext = nextEvent?.id === act.id;

                  return (
                    <div
                      key={act.id}
                      onClick={() => onSelectActivity?.(act)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-[rgba(200,159,87,0.2)] border-[#dfba73] shadow-[0_0_15px_rgba(200,159,87,0.25)]"
                          : isNext
                          ? "bg-amber-400/10 border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                        <span className="flex items-center gap-1.5 text-white/90">
                          <ItemIcon size={12} className={isCurrent ? "text-[#dfba73]" : isNext ? "text-amber-400" : "text-white/60"} />
                          {act.start} – {act.end}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-bold text-[#dfba73] uppercase">
                            ● {tr.active}
                          </span>
                        )}
                        {isNext && (
                          <span className="text-[9px] font-bold text-amber-300 uppercase">
                            {tr.nextUp}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-white truncate font-serif">
                        {act.title[safeLocale as Locale] || act.title.en}
                      </p>
                      <p className="text-[10px] text-white/60 truncate mt-0.5 flex items-center gap-1">
                        <MapPin size={10} className="shrink-0" />
                        {act.location}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
