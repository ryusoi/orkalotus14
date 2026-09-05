import React, { useState, useRef, useEffect } from "react";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  Wind,
  Droplets,
  Waves,
  Sparkles,
  Compass,
  Gauge,
  Sunrise,
  Sunset,
  ShieldAlert,
  Palmtree,
  Sailboat,
  Utensils,
  Flower2,
  Calendar,
  Clock,
  Info,
} from "lucide-react";
import type { Locale } from "@/data/content";
import { weatherTranslations } from "@/data/weatherTranslations";
import type { DailyForecastItem, HourlyForecastItem } from "@/hooks/useLiveWeather";

interface WeatherDetailModalProps {
  day: DailyForecastItem | null;
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  unit: "C" | "F";
  city?: string;
}

export const WeatherDetailModal: React.FC<WeatherDetailModalProps> = ({
  day,
  isOpen,
  onClose,
  locale,
  unit,
  city = "Marmaris, Muğla (Orka Lotus Beach)",
}) => {
  const tr = weatherTranslations[locale] || weatherTranslations.en;

  // Zoom & Pan state
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom & pan when modal opens or day changes
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, day]);

  // Keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
      if (e.key === "0") handleReset();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !day) return null;

  // Temperature conversion
  const formatTemp = (celsius: number) => {
    if (unit === "F") {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
  };

  const getWeatherIcon = (code: number, size = 20, className = "text-amber-300") => {
    if (code === 0 || code === 1) return <Sun size={size} className={className} />;
    if (code === 2) return <CloudSun size={size} className="text-amber-200" />;
    if (code === 3) return <Cloud size={size} className="text-slate-300" />;
    if (code === 45 || code === 48) return <CloudFog size={size} className="text-slate-300" />;
    if (code >= 51 && code <= 55) return <CloudDrizzle size={size} className="text-sky-300" />;
    if (code >= 61 && code <= 65) return <CloudRain size={size} className="text-sky-400" />;
    if (code >= 80 && code <= 82) return <CloudRain size={size} className="text-sky-400" />;
    if (code >= 95) return <CloudLightning size={size} className="text-amber-400" />;
    return <Sun size={size} className={className} />;
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.25, 0.75);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + 0.15, 3));
    } else {
      setScale((prev) => {
        const next = Math.max(prev - 0.15, 0.75);
        if (next <= 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    if (scale > 1) {
      handleReset();
    } else {
      setScale(1.75);
    }
  };

  // Touch Pinch-to-zoom
  const touchStartRef = useRef<{ dist: number; startScale: number; x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartRef.current = { dist, startScale: scale, x: position.x, y: position.y };
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartRef.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = dist / touchStartRef.current.dist;
      const newScale = Math.min(Math.max(touchStartRef.current.startScale * ratio, 0.75), 3);
      setScale(newScale);
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchStartRef.current = null;
  };

  // Localized date and condition
  const dayName =
    day.dayLabel?.[locale] ||
    day.dayLabel?.en ||
    day.dayShort?.[locale] ||
    day.dayShort?.en ||
    "Day";

  const conditionTitle =
    day.conditionName?.[locale] ||
    day.conditionName?.en ||
    "Clear Sky · Aegean Breeze";

  // UV Advice text
  const getUvAdvice = (uv: number) => {
    if (uv <= 2) return tr.uvAdviceLow;
    if (uv <= 5) return tr.uvAdviceMod;
    if (uv <= 7) return tr.uvAdviceHigh;
    return tr.uvAdviceVeryHigh;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#030d14]/90 backdrop-blur-md animate-fadeIn select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full ${
          isFullscreen ? "h-[98vh] max-w-[98vw]" : "max-w-4xl max-h-[92vh]"
        } bg-gradient-to-b from-[#0a2333] via-[#071926] to-[#041018] rounded-2xl sm:rounded-3xl border border-[rgba(200,159,87,0.45)] shadow-[0_20px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden text-white transition-all duration-300`}
      >
        {/* Top Decorative Gold Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#dfba73] to-transparent shrink-0" />

        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#051520]/95 border-b border-[rgba(200,159,87,0.25)] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-[#dfba73]/20 to-white/5 border border-[#dfba73]/40 shadow-inner shrink-0">
              {getWeatherIcon(day.weatherCode, 24, "text-[#dfba73] animate-pulse")}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#dfba73] px-2 py-0.5 rounded-full bg-[#dfba73]/10 border border-[#dfba73]/30">
                  {day.isToday ? tr.today : day.isPast ? tr.yesterday : tr.futureDays}
                </span>
                <span className="text-[11px] sm:text-xs text-white/60 font-mono">
                  {day.date}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide truncate">
                {dayName} · {conditionTitle}
              </h2>
            </div>
          </div>

          {/* Header Controls: Zoom Tools + Close */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Zoom In */}
            <button
              type="button"
              onClick={handleZoomIn}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#dfba73]/20 text-white/80 hover:text-[#dfba73] border border-white/10 hover:border-[#dfba73]/50 flex items-center justify-center transition-all active:scale-95"
              title={tr.zoomIn}
              aria-label={tr.zoomIn}
            >
              <ZoomIn size={15} />
            </button>

            {/* Zoom Out */}
            <button
              type="button"
              onClick={handleZoomOut}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#dfba73]/20 text-white/80 hover:text-[#dfba73] border border-white/10 hover:border-[#dfba73]/50 flex items-center justify-center transition-all active:scale-95"
              title={tr.zoomOut}
              aria-label={tr.zoomOut}
            >
              <ZoomOut size={15} />
            </button>

            {/* Reset Zoom */}
            <button
              type="button"
              onClick={handleReset}
              className="px-2 h-8 rounded-lg bg-white/5 hover:bg-[#dfba73]/20 text-white/80 hover:text-[#dfba73] border border-white/10 hover:border-[#dfba73]/50 text-xs font-mono font-medium flex items-center justify-center transition-all active:scale-95"
              title={tr.resetZoom}
            >
              {Math.round(scale * 100)}%
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#dfba73]/20 text-white/80 hover:text-[#dfba73] border border-white/10 hover:border-[#dfba73]/50 flex items-center justify-center transition-all active:scale-95 hidden sm:flex"
              title={isFullscreen ? "Restore" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-300 hover:text-white border border-rose-500/30 flex items-center justify-center transition-all active:scale-95 ml-1"
              title={tr.close}
              aria-label={tr.close}
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Zoom Hint Banner */}
        <div className="px-4 py-1.5 bg-[#dfba73]/10 border-b border-[#dfba73]/20 flex items-center justify-between text-[11px] text-[#f7dc9f] shrink-0">
          <div className="flex items-center gap-1.5 truncate">
            <Sparkles size={12} className="text-[#dfba73] shrink-0" />
            <span className="truncate">{tr.zoomHint}</span>
          </div>
          <span className="text-[10px] text-white/50 hidden md:inline">
            Double-click or pinch to zoom
          </span>
        </div>

        {/* Scrollable & Zoomable Canvas Content */}
        <div
          ref={containerRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 ${
            scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
          }`}
          style={{
            touchAction: scale > 1 ? "none" : "pan-y",
          }}
        >
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: "center top",
              transition: isDragging ? "none" : "transform 0.15s ease-out",
            }}
            className="space-y-4 sm:space-y-6"
          >
            {/* HERO TEMPERATURE & CONDITION BANNER */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d2a3d] via-[#11354e] to-[#0d2a3d] p-4 sm:p-6 border border-[rgba(200,159,87,0.35)] shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#dfba73]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 shadow-inner backdrop-blur-md shrink-0">
                    {getWeatherIcon(day.weatherCode, 44, "text-[#dfba73] animate-pulse")}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-light tracking-tight text-white font-serif">
                        {formatTemp(day.tempMax)}°{unit}
                      </span>
                      <span className="text-lg sm:text-xl text-white/50 font-light">
                        / {formatTemp(day.tempMin)}°{unit}
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-medium text-[#dfba73] mt-0.5">
                      {conditionTitle}
                    </div>
                    <div className="text-xs text-white/60">
                      {city} · {tr.utcNotice}
                    </div>
                  </div>
                </div>

                {/* Quick Indicators Pill Row */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5">
                    <Waves size={14} className="text-sky-300" />
                    <span>
                      {tr.seaTemp}: <strong className="text-white">{formatTemp(day.seaTemperature)}°{unit}</strong>
                    </span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5">
                    <Droplets size={14} className="text-sky-300" />
                    <span>
                      {tr.humidity}: <strong className="text-white">{day.humidity}%</strong>
                    </span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5">
                    <Wind size={14} className="text-amber-200" />
                    <span>
                      {tr.wind}: <strong className="text-white">{day.windSpeedMax} km/h {day.windDirection}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 24-HOUR PROGRESSION TIMELINE */}
            <div className="bg-[#051622]/90 rounded-2xl p-4 sm:p-5 border border-[rgba(200,159,87,0.3)] shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#dfba73] flex items-center gap-2">
                  <Clock size={15} />
                  {tr.hourlyForecast}
                </h3>
                <span className="text-[11px] text-white/50">
                  {day.hourly?.length || 6} Time Intervals
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {day.hourly?.map((hItem: HourlyForecastItem, hIdx: number) => {
                  const hCond = hItem.conditionName?.[locale] || hItem.conditionName?.en || "Sunny";
                  return (
                    <div
                      key={hIdx}
                      className="rounded-xl p-2.5 bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-[#dfba73]/40 transition-all flex flex-col items-center text-center justify-between"
                    >
                      <span className="text-xs font-mono font-medium text-[#dfba73]">
                        {hItem.time}
                      </span>
                      <div className="my-1.5">
                        {getWeatherIcon(hItem.weatherCode, 20, "text-amber-300")}
                      </div>
                      <div className="text-base font-bold text-white">
                        {formatTemp(hItem.temp)}°
                      </div>
                      <div className="text-[10px] text-white/50 truncate w-full mt-0.5">
                        {hCond}
                      </div>
                      <div className="mt-1 pt-1 border-t border-white/10 w-full flex items-center justify-between text-[9px] text-white/60">
                        <span className="flex items-center gap-0.5">
                          <Droplets size={9} className="text-sky-300" />
                          {hItem.humidity}%
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Wind size={9} className="text-amber-200" />
                          {hItem.windSpeed}k
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DEEP METEOROLOGICAL METRIC GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {/* Box 1: Sea Water Temperature & Diving */}
              <div className="rounded-2xl p-4 bg-[#061824]/90 border border-[rgba(200,159,87,0.25)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#dfba73] font-semibold flex items-center gap-1.5">
                    <Waves size={14} className="text-sky-400" />
                    {tr.seaTemp}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-400/10 text-sky-300 border border-sky-400/30">
                    Marmaris Bay
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-light text-white">
                  {formatTemp(day.seaTemperature)}°{unit}
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {tr.seaComfortIdeal}
                </p>
              </div>

              {/* Box 2: UV Index & Solar Protection */}
              <div className="rounded-2xl p-4 bg-[#061824]/90 border border-[rgba(200,159,87,0.25)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#dfba73] font-semibold flex items-center gap-1.5">
                    <Sun size={14} className="text-amber-300" />
                    {tr.uvIndex}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    Max: {day.uvIndexMax}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-light text-white">
                  UV {day.uvIndexMax}
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {getUvAdvice(day.uvIndexMax)}
                </p>
              </div>

              {/* Box 3: Wind & Water Sports */}
              <div className="rounded-2xl p-4 bg-[#061824]/90 border border-[rgba(200,159,87,0.25)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#dfba73] font-semibold flex items-center gap-1.5">
                    <Wind size={14} className="text-teal-300" />
                    {tr.wind}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-400/10 text-teal-300 border border-teal-400/30">
                    {day.windDirection}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-light text-white">
                  {day.windSpeedMax} <span className="text-sm font-normal text-white/60">km/h</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {Math.round(day.windSpeedMax * 0.621371)} mph · Calm coastal breeze across İçmeler bay
                </p>
              </div>

              {/* Box 4: Humidity & Pressure */}
              <div className="rounded-2xl p-4 bg-[#061824]/90 border border-[rgba(200,159,87,0.25)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#dfba73] font-semibold flex items-center gap-1.5">
                    <Droplets size={14} className="text-sky-300" />
                    {tr.humidity}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                    {day.pressure} hPa
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-light text-white">
                  {day.humidity}%
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Stable Aegean high-pressure micro-climate
                </p>
              </div>

              {/* Box 5: Sunrise & Sunset */}
              <div className="rounded-2xl p-4 bg-[#061824]/90 border border-[rgba(200,159,87,0.25)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#dfba73] font-semibold flex items-center gap-1.5">
                    <Sunrise size={14} className="text-amber-300" />
                    {tr.sunrise} & {tr.sunset}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300">
                    12h 56m Light
                  </span>
                </div>
                <div className="flex items-center justify-between text-lg font-light text-white pt-1">
                  <span className="flex items-center gap-1.5">
                    <Sunrise size={16} className="text-amber-300" /> {day.sunrise} AM
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Sunset size={16} className="text-orange-400" /> {day.sunset} PM
                  </span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Golden hour recommended at Lotus Sunset Pier (19:00 - 20:00)
                </p>
              </div>

              {/* Box 6: Precipitation Probability */}
              <div className="rounded-2xl p-4 bg-[#061824]/90 border border-[rgba(200,159,87,0.25)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#dfba73] font-semibold flex items-center gap-1.5">
                    <CloudRain size={14} className="text-sky-300" />
                    {tr.precipitation}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/30">
                    Optimal Beach Day
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-light text-white">
                  {day.precipitationChance}%
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Zero rain forecast, crystal clear blue skies
                </p>
              </div>
            </div>

            {/* LOTUS CONCIERGE RESORT ACTIVITY ADVISORY */}
            <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#071c2b] to-[#05141f] border border-[rgba(200,159,87,0.35)] shadow-xl space-y-3">
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#dfba73] flex items-center gap-2">
                <Sparkles size={15} className="text-[#dfba73]" />
                {tr.resortAdviceTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                {/* Activity 1 */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-300 shrink-0">
                    <Waves size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {tr.activitySwimming}
                    </div>
                    <div className="text-[11px] text-white/60 mt-0.5">
                      Water 26°C · Flat bay sea
                    </div>
                  </div>
                </div>

                {/* Activity 2 */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-300 shrink-0">
                    <Sailboat size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {tr.activityWatersports}
                    </div>
                    <div className="text-[11px] text-white/60 mt-0.5">
                      Light 14 km/h breeze
                    </div>
                  </div>
                </div>

                {/* Activity 3 */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-teal-500/10 text-teal-300 shrink-0">
                    <Flower2 size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {tr.activitySpa}
                    </div>
                    <div className="text-[11px] text-white/60 mt-0.5">
                      Sauna, Oxygen & Hammam
                    </div>
                  </div>
                </div>

                {/* Activity 4 */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-300 shrink-0">
                    <Utensils size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {tr.activityDining}
                    </div>
                    <div className="text-[11px] text-white/60 mt-0.5">
                      A'La Carte Fish & Steak
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#041018]/95 border-t border-[rgba(200,159,87,0.25)] flex items-center justify-between text-xs text-white/60 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Marmaris Live Meteorological Service · UTC+3</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#dfba73] hover:bg-[#caa050] text-[#051520] font-semibold transition-all active:scale-95 shadow-md"
          >
            {tr.close}
          </button>
        </div>
      </div>
    </div>
  );
};
