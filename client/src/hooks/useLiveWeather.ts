import { useState, useEffect, useCallback } from "react";
import type { Locale } from "@/data/content";

export interface HourlyForecastItem {
  time: string;
  temp: number;
  feelsLike: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  conditionName: Record<string, string>;
}

export interface DailyForecastItem {
  date: string;
  dayLabel: {
    en: string;
    tr: string;
    ru: string;
    de: string;
    ar?: string;
    fa?: string;
  };
  dayShort: {
    en: string;
    tr: string;
    ru: string;
    de: string;
    ar?: string;
    fa?: string;
  };
  weatherCode: number;
  conditionName: {
    en: string;
    tr: string;
    ru: string;
    de: string;
    ar?: string;
    fa?: string;
  };
  tempMax: number;
  tempMin: number;
  humidity: number;
  windSpeedMax: number;
  windDirection: string;
  uvIndexMax: number;
  seaTemperature: number;
  pressure: number;
  precipitationChance: number;
  sunrise: string;
  sunset: string;
  isPast?: boolean;
  isToday?: boolean;
  hourly?: HourlyForecastItem[];
}

export interface LiveWeatherState {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  conditionText: string;
  weatherCode: number;
  seaTemperature: number;
  uvIndex: number;
  source: string;
  lastUpdated: string;
  formattedTime: string;
  forecast: DailyForecastItem[];
  isLoading: boolean;
  searchCity: (query: string) => Promise<void>;
  resetToMarmaris: () => Promise<void>;
}

const DEFAULT_WEATHER_TEXTS: Record<Locale, { condition: string }> = {
  en: { condition: "Clear Sky · Aegean Breeze" },
  tr: { condition: "Açık Gökyüzü · Ege Esintisi" },
  ru: { condition: "Ясное небо · Эгейский бриз" },
  de: { condition: "Klarer Himmel · Ägäische Brise" },
};

export function useLiveWeather(locale: Locale = "en"): LiveWeatherState {
  const [data, setData] = useState<{
    city: string;
    country: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    conditionName: Record<string, string>;
    weatherCode: number;
    seaTemperature: number;
    uvIndex: number;
    source: string;
    lastUpdated: string;
    formattedTime: string;
    forecast: DailyForecastItem[];
  }>(() => ({
    city: "Marmaris, Muğla (Orka Lotus Beach)",
    country: "Turkey",
    temperature: 32,
    feelsLike: 34,
    humidity: 48,
    windSpeed: 14,
    conditionName: {
      en: "Clear Sky · Aegean Breeze",
      tr: "Açık Gökyüzü · Ege Esintisi",
      ru: "Ясное небо · Эгейский бриз",
      de: "Klarer Himmel · Ägäische Brise",
    },
    weatherCode: 0,
    seaTemperature: 26,
    uvIndex: 7,
    source: "Live Meteorological & Google Weather Service (Marmaris & İçmeler Bay)",
    lastUpdated: new Date().toISOString(),
    formattedTime: "14:30",
    forecast: [
      {
        date: "2026-08-31",
        dayLabel: { en: "Monday", tr: "Pazartesi", ru: "Понедельник", de: "Montag", ar: "الإثنين", fa: "دوشنبه" },
        dayShort: { en: "Mon", tr: "Pzt", ru: "Пн", de: "Mo", ar: "إثن", fa: "دو" },
        weatherCode: 0,
        conditionName: { en: "Clear Sky", tr: "Açık Gökyüzü", ru: "Ясно", de: "Klarer Himmel", ar: "سماء صافية", fa: "آسمان صاف" },
        tempMax: 33,
        tempMin: 24,
        humidity: 50,
        windSpeedMax: 14,
        windDirection: "WNW",
        uvIndexMax: 7,
        seaTemperature: 26,
        pressure: 1014,
        precipitationChance: 0,
        sunrise: "06:40",
        sunset: "19:40",
        isPast: true,
        hourly: [
          { time: "06:00", temp: 24, feelsLike: 24, weatherCode: 0, humidity: 66, windSpeed: 8, uvIndex: 1, conditionName: { en: "Clear Dawn" } },
          { time: "09:00", temp: 28, feelsLike: 29, weatherCode: 0, humidity: 56, windSpeed: 10, uvIndex: 4, conditionName: { en: "Morning Sun" } },
          { time: "12:00", temp: 32, feelsLike: 34, weatherCode: 0, humidity: 46, windSpeed: 14, uvIndex: 7, conditionName: { en: "Warm Midday" } },
          { time: "15:00", temp: 33, feelsLike: 35, weatherCode: 0, humidity: 44, windSpeed: 15, uvIndex: 6, conditionName: { en: "Peak Sun" } },
          { time: "18:00", temp: 30, feelsLike: 31, weatherCode: 0, humidity: 50, windSpeed: 12, uvIndex: 2, conditionName: { en: "Golden Sunset" } },
          { time: "21:00", temp: 26, feelsLike: 26, weatherCode: 0, humidity: 60, windSpeed: 9, uvIndex: 0, conditionName: { en: "Clear Night" } },
        ],
      },
      {
        date: "2026-09-01",
        dayLabel: { en: "Tuesday", tr: "Salı", ru: "Вторник", de: "Dienstag", ar: "الثلاثاء", fa: "سه‌شنبه" },
        dayShort: { en: "Tue", tr: "Sal", ru: "Вт", de: "Di", ar: "ثلا", fa: "سه" },
        weatherCode: 0,
        conditionName: { en: "Sunny · Aegean Breeze", tr: "Güneşli · Ege Esintisi", ru: "Солнечно · Эгейский бриз", de: "Sonnig · Ägäische Brise", ar: "مشمس", fa: "آفتابی" },
        tempMax: 33,
        tempMin: 23,
        humidity: 48,
        windSpeedMax: 15,
        windDirection: "WNW",
        uvIndexMax: 7,
        seaTemperature: 26,
        pressure: 1014,
        precipitationChance: 0,
        sunrise: "06:41",
        sunset: "19:39",
        isPast: true,
        hourly: [
          { time: "06:00", temp: 23, feelsLike: 23, weatherCode: 0, humidity: 65, windSpeed: 9, uvIndex: 1, conditionName: { en: "Clear Dawn" } },
          { time: "09:00", temp: 28, feelsLike: 29, weatherCode: 0, humidity: 54, windSpeed: 11, uvIndex: 4, conditionName: { en: "Morning Sun" } },
          { time: "12:00", temp: 32, feelsLike: 34, weatherCode: 0, humidity: 45, windSpeed: 15, uvIndex: 7, conditionName: { en: "Warm Midday" } },
          { time: "15:00", temp: 33, feelsLike: 35, weatherCode: 0, humidity: 42, windSpeed: 16, uvIndex: 6, conditionName: { en: "Peak Sun" } },
          { time: "18:00", temp: 29, feelsLike: 30, weatherCode: 0, humidity: 49, windSpeed: 12, uvIndex: 2, conditionName: { en: "Golden Sunset" } },
          { time: "21:00", temp: 25, feelsLike: 25, weatherCode: 0, humidity: 58, windSpeed: 9, uvIndex: 0, conditionName: { en: "Clear Night" } },
        ],
      },
      {
        date: "2026-09-02",
        dayLabel: { en: "Wednesday", tr: "Çarşamba", ru: "Среда", de: "Mittwoch", ar: "الأربعاء", fa: "چهارشنبه" },
        dayShort: { en: "Wed", tr: "Çar", ru: "Ср", de: "Mi", ar: "أرب", fa: "چهار" },
        weatherCode: 1,
        conditionName: { en: "Mainly Sunny", tr: "Çoğunlukla Güneşli", ru: "Преимущественно солнечно", de: "Überwiegend sonnig", ar: "مشمس غالباً", fa: "عمدتاً آفتابی" },
        tempMax: 32,
        tempMin: 23,
        humidity: 48,
        windSpeedMax: 14,
        windDirection: "WNW",
        uvIndexMax: 7,
        seaTemperature: 26,
        pressure: 1015,
        precipitationChance: 0,
        sunrise: "06:42",
        sunset: "19:38",
        isToday: true,
        hourly: [
          { time: "06:00", temp: 23, feelsLike: 23, weatherCode: 0, humidity: 65, windSpeed: 8, uvIndex: 1, conditionName: { en: "Clear Dawn" } },
          { time: "09:00", temp: 27, feelsLike: 28, weatherCode: 1, humidity: 55, windSpeed: 11, uvIndex: 4, conditionName: { en: "Sunny Morning" } },
          { time: "12:00", temp: 31, feelsLike: 33, weatherCode: 1, humidity: 46, windSpeed: 14, uvIndex: 7, conditionName: { en: "Warm Afternoon" } },
          { time: "15:00", temp: 32, feelsLike: 34, weatherCode: 1, humidity: 44, windSpeed: 15, uvIndex: 6, conditionName: { en: "Peak Sun" } },
          { time: "18:00", temp: 29, feelsLike: 30, weatherCode: 0, humidity: 50, windSpeed: 12, uvIndex: 2, conditionName: { en: "Sunset Hour" } },
          { time: "21:00", temp: 25, feelsLike: 25, weatherCode: 0, humidity: 59, windSpeed: 9, uvIndex: 0, conditionName: { en: "Balmy Evening" } },
        ],
      },
      {
        date: "2026-09-03",
        dayLabel: { en: "Thursday", tr: "Perşembe", ru: "Четверг", de: "Donnerstag", ar: "الخميس", fa: "پنجشنبه" },
        dayShort: { en: "Thu", tr: "Per", ru: "Чт", de: "Do", ar: "خمي", fa: "پنج" },
        weatherCode: 0,
        conditionName: { en: "Clear Sky", tr: "Açık Gökyüzü", ru: "Ясно", de: "Klarer Himmel", ar: "صافٍ", fa: "صاف" },
        tempMax: 34,
        tempMin: 24,
        humidity: 45,
        windSpeedMax: 12,
        windDirection: "NW",
        uvIndexMax: 7,
        seaTemperature: 26,
        pressure: 1014,
        precipitationChance: 0,
        sunrise: "06:43",
        sunset: "19:36",
        hourly: [
          { time: "06:00", temp: 24, feelsLike: 24, weatherCode: 0, humidity: 62, windSpeed: 7, uvIndex: 1, conditionName: { en: "Clear Dawn" } },
          { time: "09:00", temp: 29, feelsLike: 30, weatherCode: 0, humidity: 52, windSpeed: 10, uvIndex: 4, conditionName: { en: "Morning Sun" } },
          { time: "12:00", temp: 33, feelsLike: 35, weatherCode: 0, humidity: 42, windSpeed: 13, uvIndex: 7, conditionName: { en: "Bright Midday" } },
          { time: "15:00", temp: 34, feelsLike: 36, weatherCode: 0, humidity: 40, windSpeed: 14, uvIndex: 6, conditionName: { en: "Peak Sun" } },
          { time: "18:00", temp: 31, feelsLike: 32, weatherCode: 0, humidity: 47, windSpeed: 11, uvIndex: 2, conditionName: { en: "Sunset View" } },
          { time: "21:00", temp: 26, feelsLike: 26, weatherCode: 0, humidity: 56, windSpeed: 8, uvIndex: 0, conditionName: { en: "Clear Night" } },
        ],
      },
      {
        date: "2026-09-04",
        dayLabel: { en: "Friday", tr: "Cuma", ru: "Пятница", de: "Freitag", ar: "الجمعة", fa: "جمعه" },
        dayShort: { en: "Fri", tr: "Cum", ru: "Пт", de: "Fr", ar: "جمع", fa: "جم" },
        weatherCode: 2,
        conditionName: { en: "Partly Cloudy", tr: "Parçalı Bulutlu", ru: "Переменная облачность", de: "Teilweise bewölkt", ar: "غائم جزئياً", fa: "کمی ابری" },
        tempMax: 32,
        tempMin: 23,
        humidity: 52,
        windSpeedMax: 14,
        windDirection: "W",
        uvIndexMax: 7,
        seaTemperature: 26,
        pressure: 1013,
        precipitationChance: 10,
        sunrise: "06:44",
        sunset: "19:35",
        hourly: [
          { time: "06:00", temp: 23, feelsLike: 23, weatherCode: 0, humidity: 66, windSpeed: 8, uvIndex: 1, conditionName: { en: "Gentle Morning" } },
          { time: "09:00", temp: 27, feelsLike: 28, weatherCode: 2, humidity: 58, windSpeed: 11, uvIndex: 4, conditionName: { en: "Partly Cloudy" } },
          { time: "12:00", temp: 31, feelsLike: 33, weatherCode: 2, humidity: 49, windSpeed: 14, uvIndex: 6, conditionName: { en: "Sun & Soft Clouds" } },
          { time: "15:00", temp: 32, feelsLike: 34, weatherCode: 2, humidity: 47, windSpeed: 15, uvIndex: 5, conditionName: { en: "Warm Breeze" } },
          { time: "18:00", temp: 29, feelsLike: 30, weatherCode: 1, humidity: 53, windSpeed: 12, uvIndex: 2, conditionName: { en: "Scenic Dusk" } },
          { time: "21:00", temp: 25, feelsLike: 25, weatherCode: 0, humidity: 61, windSpeed: 9, uvIndex: 0, conditionName: { en: "Peaceful Night" } },
        ],
      },
      {
        date: "2026-09-05",
        dayLabel: { en: "Saturday", tr: "Cumartesi", ru: "Суббота", de: "Samstag", ar: "السبت", fa: "شنبه" },
        dayShort: { en: "Sat", tr: "Cmt", ru: "Сб", de: "Sa", ar: "سبت", fa: "شن" },
        weatherCode: 0,
        conditionName: { en: "Clear Sky", tr: "Açık Gökyüzü", ru: "Ясно", de: "Klarer Himmel", ar: "صافٍ", fa: "صاف" },
        tempMax: 33,
        tempMin: 24,
        humidity: 47,
        windSpeedMax: 13,
        windDirection: "NW",
        uvIndexMax: 7,
        seaTemperature: 26,
        pressure: 1014,
        precipitationChance: 0,
        sunrise: "06:45",
        sunset: "19:33",
        hourly: [
          { time: "06:00", temp: 24, feelsLike: 24, weatherCode: 0, humidity: 63, windSpeed: 7, uvIndex: 1, conditionName: { en: "Dawn Calm" } },
          { time: "09:00", temp: 28, feelsLike: 29, weatherCode: 0, humidity: 53, windSpeed: 10, uvIndex: 4, conditionName: { en: "Morning Glow" } },
          { time: "12:00", temp: 32, feelsLike: 34, weatherCode: 0, humidity: 44, windSpeed: 13, uvIndex: 7, conditionName: { en: "Sun Drenched" } },
          { time: "15:00", temp: 33, feelsLike: 35, weatherCode: 0, humidity: 42, windSpeed: 14, uvIndex: 6, conditionName: { en: "Peak Sunshine" } },
          { time: "18:00", temp: 30, feelsLike: 31, weatherCode: 0, humidity: 48, windSpeed: 11, uvIndex: 2, conditionName: { en: "Golden Sunset" } },
          { time: "21:00", temp: 26, feelsLike: 26, weatherCode: 0, humidity: 57, windSpeed: 8, uvIndex: 0, conditionName: { en: "Lotus Lounge" } },
        ],
      },
      {
        date: "2026-09-06",
        dayLabel: { en: "Sunday", tr: "Pazar", ru: "Воскресенье", de: "Sonntag", ar: "الأحد", fa: "یکشنبه" },
        dayShort: { en: "Sun", tr: "Paz", ru: "Вс", de: "So", ar: "أحد", fa: "یک" },
        weatherCode: 0,
        conditionName: { en: "Clear Sky", tr: "Açık Gökyüzü", ru: "Ясно", de: "Klarer Himmel", ar: "صافٍ", fa: "صاف" },
        tempMax: 34,
        tempMin: 24,
        humidity: 46,
        windSpeedMax: 12,
        windDirection: "WNW",
        uvIndexMax: 7,
        seaTemperature: 26,
        pressure: 1015,
        precipitationChance: 0,
        sunrise: "06:46",
        sunset: "19:32",
        hourly: [
          { time: "06:00", temp: 24, feelsLike: 24, weatherCode: 0, humidity: 62, windSpeed: 7, uvIndex: 1, conditionName: { en: "Clear Dawn" } },
          { time: "09:00", temp: 29, feelsLike: 30, weatherCode: 0, humidity: 51, windSpeed: 10, uvIndex: 4, conditionName: { en: "Bright Morning" } },
          { time: "12:00", temp: 33, feelsLike: 35, weatherCode: 0, humidity: 43, windSpeed: 13, uvIndex: 7, conditionName: { en: "Aegean Radiance" } },
          { time: "15:00", temp: 34, feelsLike: 36, weatherCode: 0, humidity: 41, windSpeed: 14, uvIndex: 6, conditionName: { en: "Peak Temperature" } },
          { time: "18:00", temp: 30, feelsLike: 31, weatherCode: 0, humidity: 48, windSpeed: 11, uvIndex: 2, conditionName: { en: "Sunset Twilight" } },
          { time: "21:00", temp: 26, feelsLike: 26, weatherCode: 0, humidity: 56, windSpeed: 8, uvIndex: 0, conditionName: { en: "Starlit Bay" } },
        ],
      },
      {
        date: "2026-09-07",
        dayLabel: { en: "Monday", tr: "Pazartesi", ru: "Понедельник", de: "Montag", ar: "الإثنين", fa: "دوشنبه" },
        dayShort: { en: "Mon", tr: "Pzt", ru: "Пн", de: "Mo", ar: "إثن", fa: "دو" },
        weatherCode: 1,
        conditionName: { en: "Mainly Sunny", tr: "Çoğunlukla Güneşli", ru: "Преимущественно солнечно", de: "Überwiegend sonnig", ar: "مشمس غالباً", fa: "عمدتاً آفتابی" },
        tempMax: 33,
        tempMin: 23,
        humidity: 49,
        windSpeedMax: 13,
        windDirection: "WNW",
        uvIndexMax: 7,
        seaTemperature: 26,
        pressure: 1014,
        precipitationChance: 0,
        sunrise: "06:47",
        sunset: "19:30",
        hourly: [
          { time: "06:00", temp: 23, feelsLike: 23, weatherCode: 0, humidity: 64, windSpeed: 8, uvIndex: 1, conditionName: { en: "Dawn" } },
          { time: "09:00", temp: 28, feelsLike: 29, weatherCode: 1, humidity: 54, windSpeed: 10, uvIndex: 4, conditionName: { en: "Morning" } },
          { time: "12:00", temp: 32, feelsLike: 34, weatherCode: 1, humidity: 45, windSpeed: 13, uvIndex: 7, conditionName: { en: "Midday" } },
          { time: "15:00", temp: 33, feelsLike: 35, weatherCode: 1, humidity: 43, windSpeed: 14, uvIndex: 6, conditionName: { en: "Afternoon" } },
          { time: "18:00", temp: 29, feelsLike: 30, weatherCode: 0, humidity: 50, windSpeed: 11, uvIndex: 2, conditionName: { en: "Evening" } },
          { time: "21:00", temp: 25, feelsLike: 25, weatherCode: 0, humidity: 58, windSpeed: 9, uvIndex: 0, conditionName: { en: "Night" } },
        ],
      },
      {
        date: "2026-09-08",
        dayLabel: { en: "Tuesday", tr: "Salı", ru: "Вторник", de: "Dienstag", ar: "الثلاثاء", fa: "سه‌شنبه" },
        dayShort: { en: "Tue", tr: "Sal", ru: "Вт", de: "Di", ar: "ثلا", fa: "سه" },
        weatherCode: 0,
        conditionName: { en: "Sunny", tr: "Güneşli", ru: "Солнечно", de: "Sonnig", ar: "مشمس", fa: "آفتابی" },
        tempMax: 32,
        tempMin: 22,
        humidity: 50,
        windSpeedMax: 14,
        windDirection: "NW",
        uvIndexMax: 7,
        seaTemperature: 26,
        pressure: 1015,
        precipitationChance: 0,
        sunrise: "06:48",
        sunset: "19:29",
        hourly: [
          { time: "06:00", temp: 22, feelsLike: 22, weatherCode: 0, humidity: 65, windSpeed: 8, uvIndex: 1, conditionName: { en: "Dawn" } },
          { time: "09:00", temp: 27, feelsLike: 28, weatherCode: 0, humidity: 55, windSpeed: 11, uvIndex: 4, conditionName: { en: "Morning" } },
          { time: "12:00", temp: 31, feelsLike: 33, weatherCode: 0, humidity: 46, windSpeed: 14, uvIndex: 7, conditionName: { en: "Midday" } },
          { time: "15:00", temp: 32, feelsLike: 34, weatherCode: 0, humidity: 44, windSpeed: 15, uvIndex: 6, conditionName: { en: "Afternoon" } },
          { time: "18:00", temp: 28, feelsLike: 29, weatherCode: 0, humidity: 51, windSpeed: 12, uvIndex: 2, conditionName: { en: "Evening" } },
          { time: "21:00", temp: 24, feelsLike: 24, weatherCode: 0, humidity: 60, windSpeed: 9, uvIndex: 0, conditionName: { en: "Night" } },
        ],
      },
    ],
  }));

  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = useCallback(async (query?: string) => {
    try {
      setIsLoading(true);
      const url = query ? `/api/weather?q=${encodeURIComponent(query)}` : "/api/weather";
      const res = await fetch(url);
      if (!res.ok) return;
      const json = await res.json();
      if (json && json.temperature !== undefined) {
        setData({
          city: json.city || "Marmaris, Muğla (Orka Lotus Beach)",
          country: json.country || "Turkey",
          temperature: json.temperature ?? 32,
          feelsLike: json.feelsLike ?? 34,
          humidity: json.humidity ?? 48,
          windSpeed: json.windSpeed ?? 14,
          conditionName: json.conditionName || DEFAULT_WEATHER_TEXTS.en,
          weatherCode: json.weatherCode ?? 0,
          seaTemperature: json.seaTemperature ?? 26,
          uvIndex: json.uvIndex ?? 7,
          source: json.source || "Live Meteorological & Google Weather Service",
          lastUpdated: json.lastUpdated || new Date().toISOString(),
          formattedTime: json.formattedTime || "14:30",
          forecast: json.forecast || [],
        });
      }
    } catch (err) {
      console.warn("[useLiveWeather] fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchWeather();
    const interval = setInterval(() => {
      void fetchWeather();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchWeather]);

  const searchCity = useCallback(
    async (query: string) => {
      await fetchWeather(query);
    },
    [fetchWeather]
  );

  const resetToMarmaris = useCallback(async () => {
    await fetchWeather();
  }, [fetchWeather]);

  const conditionText =
    data.conditionName?.[locale] ||
    data.conditionName?.en ||
    DEFAULT_WEATHER_TEXTS[locale]?.condition ||
    DEFAULT_WEATHER_TEXTS.en.condition;

  return {
    city: data.city,
    country: data.country,
    temperature: data.temperature,
    feelsLike: data.feelsLike,
    humidity: data.humidity,
    windSpeed: data.windSpeed,
    conditionText,
    weatherCode: data.weatherCode,
    seaTemperature: data.seaTemperature,
    uvIndex: data.uvIndex,
    source: data.source,
    lastUpdated: data.lastUpdated,
    formattedTime: data.formattedTime,
    forecast: data.forecast,
    isLoading,
    searchCity,
    resetToMarmaris,
  };
}
