/**
 * Live Date & Calendar Utility Functions
 * Supports synchronized date calculation across all website pages and calendar views.
 */

export interface WeekDateItem {
  dayLabel: string;
  dayNumber: string;
  monthLabel: string;
  isoDate: string;
  weekdayLong: string;
  isToday: boolean;
  isTomorrow: boolean;
}

const LOCALIZED_LABELS = {
  en: {
    today: "Today",
    tomorrow: "Tomorrow",
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
    monthsLong: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    weekdaysLong: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  tr: {
    today: "Bugün",
    tomorrow: "Yarın",
    monthsShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
    monthsLong: [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ],
    weekdaysShort: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
    weekdaysLong: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
  },
  ru: {
    today: "Сегодня",
    tomorrow: "Завтра",
    monthsShort: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
    monthsLong: [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ],
    weekdaysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    weekdaysLong: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
  },
  de: {
    today: "Heute",
    tomorrow: "Morgen",
    monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez"],
    monthsLong: [
      "Januar", "Februar", "März", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Dezember"
    ],
    weekdaysShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    weekdaysLong: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
  },
};

/**
 * Parses YYYY-MM-DD to a safe local Date object at noon to avoid timezone shift
 */
export function parseIsoDate(isoDate: string): Date {
  const parts = isoDate.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  return new Date(year, month, day, 12, 0, 0, 0);
}

/**
 * Converts a Date object to YYYY-MM-DD string in Europe/Istanbul timezone
 */
export function toIsoDate(date: Date): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Istanbul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formatter.format(date);
  } catch {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
}

/**
 * Generates rolling sequence of dates starting from today's date with full localization
 */
export function generateRollingWeekDates(todayIso: string, count = 12, locale = "en"): WeekDateItem[] {
  const baseDate = parseIsoDate(todayIso);
  const items: WeekDateItem[] = [];
  const loc = (LOCALIZED_LABELS[locale as keyof typeof LOCALIZED_LABELS] || LOCALIZED_LABELS.en);

  for (let i = 0; i < count; i++) {
    const current = new Date(baseDate);
    current.setDate(baseDate.getDate() + i);

    const iso = toIsoDate(current);
    const dayNumber = String(current.getDate());
    const monthLabel = loc.monthsShort[current.getMonth()];
    const weekdayShort = loc.weekdaysShort[current.getDay()];
    const weekdayLong = loc.weekdaysLong[current.getDay()];

    let dayLabel = weekdayShort;
    if (i === 0) dayLabel = loc.today;
    else if (i === 1) dayLabel = loc.tomorrow;

    items.push({
      dayLabel,
      dayNumber,
      monthLabel,
      isoDate: iso,
      weekdayLong,
      isToday: i === 0,
      isTomorrow: i === 1,
    });
  }

  return items;
}

/**
 * Formats ISO date with full friendly text e.g. "Sunday, 30 August 2026"
 */
export function formatFullDate(isoDate: string, locale = "en"): string {
  try {
    const date = parseIsoDate(isoDate);
    if (locale === "tr") {
      const trMonths = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
      const trDays = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
      return `${date.getDate()} ${trMonths[date.getMonth()]} ${date.getFullYear()}, ${trDays[date.getDay()]}`;
    }
    if (locale === "ru") {
      const ruMonths = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
      const ruDays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
      return `${ruDays[date.getDay()]}, ${date.getDate()} ${ruMonths[date.getMonth()]} ${date.getFullYear()} г.`;
    }
    if (locale === "de") {
      const deMonths = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
      const deDays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
      return `${deDays[date.getDay()]}, ${date.getDate()}. ${deMonths[date.getMonth()]} ${date.getFullYear()}`;
    }
    return `${LOCALIZED_LABELS.en.weekdaysLong[date.getDay()]}, ${date.getDate()} ${LOCALIZED_LABELS.en.monthsLong[date.getMonth()]} ${date.getFullYear()}`;
  } catch {
    return isoDate;
  }
}
