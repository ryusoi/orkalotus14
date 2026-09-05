import { useState, useEffect } from "react";
import { generateRollingWeekDates, formatFullDate, toIsoDate, type WeekDateItem } from "@/lib/dateUtils";
import type { Locale } from "@/data/content";

export interface LiveDateState {
  todayIso: string; // "2026-08-31"
  dayNumber: string; // "31"
  monthName: string; // "August"
  monthShort: string; // "Aug"
  year: string; // "2026"
  weekday: string; // "Monday"
  weekdayShort: string; // "Mon"
  formattedDisplay: string;
  source: string;
  rollingWeekDates: WeekDateItem[];
}

function getInitialState(locale: Locale = "en"): LiveDateState {
  const now = new Date();
  const todayIso = toIsoDate(now);
  const parts = todayIso.split("-");
  const year = parts[0];
  const day = String(parseInt(parts[2], 10));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const mIndex = parseInt(parts[1], 10) - 1;

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = new Date(parseInt(parts[0], 10), mIndex, parseInt(parts[2], 10)).getDay();

  return {
    todayIso,
    dayNumber: day,
    monthName: monthNames[mIndex] || "August",
    monthShort: monthsShort[mIndex] || "Aug",
    year,
    weekday: weekdays[dayOfWeek] || "Monday",
    weekdayShort: weekdaysShort[dayOfWeek] || "Mon",
    formattedDisplay: formatFullDate(todayIso, locale),
    source: "Google Live Time & NTP Sync (Europe/Istanbul UTC+3)",
    rollingWeekDates: generateRollingWeekDates(todayIso, 12, locale),
  };
}

export function useLiveDate(locale: Locale = "en"): LiveDateState {
  const [state, setState] = useState<LiveDateState>(() => getInitialState(locale));

  useEffect(() => {
    let isMounted = true;

    // Immediately update formatted strings when locale changes
    setState((prev) => ({
      ...prev,
      formattedDisplay: formatFullDate(prev.todayIso, locale),
      rollingWeekDates: generateRollingWeekDates(prev.todayIso, 12, locale),
    }));

    async function syncTime() {
      try {
        const res = await fetch("/api/time");
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.isoDate && isMounted) {
          setState({
            todayIso: data.isoDate,
            dayNumber: String(data.day),
            monthName: data.monthName,
            monthShort: data.monthShort,
            year: String(data.year),
            weekday: data.weekday,
            weekdayShort: data.weekdayShort,
            formattedDisplay: data.formattedDisplay?.[locale] || formatFullDate(data.isoDate, locale),
            source: data.source || "Google Live Time Sync (Europe/Istanbul UTC+3)",
            rollingWeekDates: generateRollingWeekDates(data.isoDate, 12, locale),
          });
        }
      } catch (err) {
        console.warn("Time sync using local fallback", err);
      }
    }

    void syncTime();

    // Re-check periodically every 60 seconds
    const interval = setInterval(syncTime, 60000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [locale]);

  return state;
}
