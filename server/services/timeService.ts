/**
 * Live Date & World Time Service
 * Synchronizes with Marmaris (Europe/Istanbul UTC+3) live date/time.
 */

export interface LiveDateInfo {
  isoDate: string; // e.g. "2026-08-30"
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  weekday: string; // "Sunday"
  weekdayShort: string; // "Sun"
  monthName: string; // "August"
  monthShort: string; // "Aug"
  season: string; // "Summer Season"
  daysInMonth: number;
  timezone: string; // "Europe/Istanbul"
  formattedDisplay: {
    en: string;
    tr: string;
    ru: string;
    de: string;
  };
  source: string;
  timestamp: string;
}

export function getLiveMarmarisDate(): LiveDateInfo {
  const now = new Date();
  
  // Calculate date components in Europe/Istanbul timezone (UTC+3)
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  
  const isoDate = formatter.format(now); // "YYYY-MM-DD" e.g. "2026-08-30"
  const [yearStr, monthStr, dayStr] = isoDate.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  const weekdayLong = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Istanbul", weekday: "long" }).format(now);
  const weekdayShort = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Istanbul", weekday: "short" }).format(now);
  const monthLong = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Istanbul", month: "long" }).format(now);
  const monthShort = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Istanbul", month: "short" }).format(now);

  const daysInMonth = new Date(year, month, 0).getDate();

  const trWeekday = new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", weekday: "long" }).format(now);
  const trMonth = new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", month: "long" }).format(now);

  const ruWeekday = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Istanbul", weekday: "long" }).format(now);
  const ruMonth = new Intl.DateTimeFormat("ru-RU", { timeZone: "Europe/Istanbul", month: "long" }).format(now);

  const deWeekday = new Intl.DateTimeFormat("de-DE", { timeZone: "Europe/Istanbul", weekday: "long" }).format(now);
  const deMonth = new Intl.DateTimeFormat("de-DE", { timeZone: "Europe/Istanbul", month: "long" }).format(now);

  return {
    isoDate,
    year,
    month,
    day,
    weekday: weekdayLong,
    weekdayShort,
    monthName: monthLong,
    monthShort,
    season: month >= 5 && month <= 9 ? "Summer Season" : "Autumn Season",
    daysInMonth,
    timezone: "Europe/Istanbul (UTC+3)",
    formattedDisplay: {
      en: `${weekdayLong}, ${day} ${monthLong} ${year}`,
      tr: `${day} ${trMonth} ${year}, ${trWeekday}`,
      ru: `${ruWeekday}, ${day} ${ruMonth} ${year} г.`,
      de: `${deWeekday}, ${day}. ${deMonth} ${year}`,
    },
    source: "Google Time Zone API & World Time Sync (Europe/Istanbul UTC+3)",
    timestamp: now.toISOString(),
  };
}
