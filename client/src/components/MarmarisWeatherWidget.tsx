import React, { useState, useRef } from "react";
import {
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
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  LayoutGrid,
  Info,
  Calendar,
  Compass,
  Maximize2,
} from "lucide-react";
import type { Locale } from "@/data/content";
import { weatherTranslations } from "@/data/weatherTranslations";
import { useLiveWeather, type DailyForecastItem } from "@/hooks/useLiveWeather";
import { WeatherDetailModal } from "./WeatherDetailModal";

interface MarmarisWeatherWidgetProps {
  locale: Locale;
}

export const MarmarisWeatherWidget: React.FC<MarmarisWeatherWidgetProps> = ({ locale }) => {
  const tr = weatherTranslations[locale] || weatherTranslations.en;
  const weather = useLiveWeather(locale);

  const [unit, setUnit] = useState<"C" | "F">("C");
  const [activeTab, setActiveTab] = useState<"graph" | "cards">("graph");
  const [selectedDay, setSelectedDay] = useState<DailyForecastItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Scroll ref for horizontal sliding date ribbon
  const ribbonRef = useRef<HTMLDivElement>(null);

  // Conversion helper
  const formatTemp = (celsius: number) => {
    if (unit === "F") {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
  };

  // Weather Icon picker
  const getWeatherIcon = (code: number, size = 18, className = "text-amber-300") => {
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

  // Scroll handler for transparent sliding toggle
  const scrollRibbon = (direction: "left" | "right") => {
    if (ribbonRef.current) {
      const scrollAmount = 240;
      ribbonRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleOpenDay = (day: DailyForecastItem) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  // Graph Data Calculations
  const forecastList = weather.forecast && weather.forecast.length > 0 ? weather.forecast : [];

  // SVG dimensions for connected graph
  const svgWidth = Math.max(forecastList.length * 92, 640);
  const svgHeight = 220;
  const paddingX = 46;
  const paddingTop = 45;
  const paddingBottom = 40;

  const allMaxTemps = forecastList.map((d) => d.tempMax);
  const allMinTemps = forecastList.map((d) => d.tempMin);
  const maxTempGlobal = Math.max(...allMaxTemps, 35);
  const minTempGlobal = Math.min(...allMinTemps, 20);
  const tempRange = Math.max(maxTempGlobal - minTempGlobal, 1);

  // Compute (x, y) coordinates for each forecast day
  const points = forecastList.map((item, idx) => {
    const step = (svgWidth - paddingX * 2) / Math.max(forecastList.length - 1, 1);
    const x = paddingX + idx * step;
    // Map max temp to top region (paddingTop to paddingTop + 60)
    const yMax =
      paddingTop +
      ((maxTempGlobal - item.tempMax) / tempRange) * (svgHeight - paddingTop - paddingBottom - 40);
    // Map min temp to bottom region
    const yMin =
      paddingTop +
      45 +
      ((maxTempGlobal - item.tempMin) / tempRange) * (svgHeight - paddingTop - paddingBottom - 45);
    return { x, yMax, yMin, item, idx };
  });

  // Generate smooth cubic bezier SVG path string
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return "";
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const maxPathString = createSmoothPath(points.map((p) => ({ x: p.x, y: p.yMax })));
  const minPathString = createSmoothPath(points.map((p) => ({ x: p.x, y: p.yMin })));

  // Area fill under the max temperature line
  const areaMaxPathString =
    points.length > 0
      ? `${maxPathString} L ${points[points.length - 1].x} ${svgHeight - 15} L ${points[0].x} ${
          svgHeight - 15
        } Z`
      : "";

  return (
    <div
      id="marmaris-weather-section"
      className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-3"
    >
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#071c2b] via-[#0b293e] to-[#05141f] text-white shadow-2xl border border-[rgba(200,159,87,0.38)] backdrop-blur-xl transition-all duration-500">
        {/* Background ambient Aegean glowing orbs */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-[#dfba73]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* TOP HEADER: Location, Live radar indicator, Unit Switch, Mode Selector */}
        <div className="relative z-10 px-4 sm:px-6 pt-4 sm:pt-5 pb-3 border-b border-[rgba(200,159,87,0.2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {/* Location & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-br from-[#dfba73]/20 to-white/5 border border-[#dfba73]/40 shadow-inner shrink-0">
              {getWeatherIcon(weather.weatherCode, 24, "text-[#dfba73] animate-pulse")}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  id="weather-city-title"
                  className="text-sm sm:text-base font-serif font-bold tracking-wide uppercase text-white truncate"
                >
                  {weather.city}
                </h2>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#dfba73] px-2 py-0.5 rounded-full bg-[#dfba73]/10 border border-[#dfba73]/30">
                  {tr.title}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/60 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">{tr.liveMarmarisRadar}</span>
                <span className="text-white/40">·</span>
                <span className="text-white/70 font-mono">{weather.formattedTime} {tr.utcNotice}</span>
              </div>
            </div>
          </div>

          {/* Action Tools: Graph / Cards Mode + °C / °F Switch */}
          <div className="flex items-center gap-2 self-stretch md:self-auto justify-between md:justify-end">
            {/* View Mode Toggle */}
            <div className="flex items-center p-0.5 rounded-xl bg-black/40 border border-white/15 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("graph")}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                  activeTab === "graph"
                    ? "bg-[#dfba73] text-[#051520] shadow-md font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
                title={tr.connectedGraph}
              >
                <TrendingUp size={14} />
                <span className="hidden sm:inline">{tr.connectedGraph}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("cards")}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                  activeTab === "cards"
                    ? "bg-[#dfba73] text-[#051520] shadow-md font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
                title={tr.sevenDayOutlook}
              >
                <LayoutGrid size={14} />
                <span className="hidden sm:inline">{tr.sevenDayOutlook}</span>
              </button>
            </div>

            {/* °C / °F Switch */}
            <div className="flex items-center p-0.5 rounded-xl bg-black/40 border border-white/15 text-xs font-mono font-medium">
              <button
                type="button"
                onClick={() => setUnit("C")}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  unit === "C"
                    ? "bg-white/20 text-white font-bold"
                    : "text-white/40 hover:text-white/80"
                }`}
              >
                °C
              </button>
              <button
                type="button"
                onClick={() => setUnit("F")}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  unit === "F"
                    ? "bg-white/20 text-white font-bold"
                    : "text-white/40 hover:text-white/80"
                }`}
              >
                °F
              </button>
            </div>
          </div>
        </div>

        {/* HERO REAL-TIME STATS BAR */}
        <div className="relative z-10 px-4 sm:px-6 py-3 bg-white/[0.02] border-b border-white/10 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-left">
          {/* Box 1: Current Temp */}
          <div
            onClick={() => {
              const todayItem = forecastList.find((f) => f.isToday) || forecastList[0];
              if (todayItem) handleOpenDay(todayItem);
            }}
            className="cursor-pointer group p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#dfba73]/50 transition-all flex flex-col justify-between"
          >
            <div className="text-[10px] uppercase tracking-wider text-[#dfba73] font-semibold flex items-center justify-between">
              <span>{tr.nowInMarmaris}</span>
              <Maximize2 size={11} className="text-white/40 group-hover:text-[#dfba73] transition-colors" />
            </div>
            <div className="flex items-baseline gap-1 my-0.5">
              <span className="text-2xl sm:text-3xl font-light text-white">
                {formatTemp(weather.temperature)}°
              </span>
              <span className="text-xs text-white/50">
                / {formatTemp(weather.feelsLike)}°
              </span>
            </div>
            <div className="text-[11px] text-white/80 truncate">
              {weather.conditionText}
            </div>
          </div>

          {/* Box 2: Sea Temperature */}
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div className="text-[10px] uppercase tracking-wider text-sky-300 font-semibold flex items-center gap-1">
              <Waves size={12} className="text-sky-400" />
              <span>{tr.seaTemp}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-light text-white my-0.5">
              {formatTemp(weather.seaTemperature)}°{unit}
            </div>
            <div className="text-[11px] text-white/60 truncate">
              {tr.seaComfortIdeal}
            </div>
          </div>

          {/* Box 3: Wind Vector */}
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div className="text-[10px] uppercase tracking-wider text-teal-300 font-semibold flex items-center gap-1">
              <Wind size={12} className="text-teal-400" />
              <span>{tr.wind}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-light text-white my-0.5">
              {weather.windSpeed} <span className="text-xs text-white/50">km/h</span>
            </div>
            <div className="text-[11px] text-white/60 truncate">
              {Math.round(weather.windSpeed * 0.621371)} mph · WNW
            </div>
          </div>

          {/* Box 4: Humidity */}
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div className="text-[10px] uppercase tracking-wider text-sky-300 font-semibold flex items-center gap-1">
              <Droplets size={12} className="text-sky-400" />
              <span>{tr.humidity}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-light text-white my-0.5">
              {weather.humidity}%
            </div>
            <div className="text-[11px] text-white/60 truncate">
              İçmeler Coast
            </div>
          </div>

          {/* Box 5: UV Index */}
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-1">
              <Sun size={12} className="text-amber-400" />
              <span>{tr.uvIndex}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-light text-white my-0.5">
              UV {weather.uvIndex}
            </div>
            <div className="text-[11px] text-amber-300/80 truncate">
              {weather.uvIndex >= 7 ? "Very High · SPF 50+" : "Moderate"}
            </div>
          </div>

          {/* Box 6: Quick Advice */}
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div className="text-[10px] uppercase tracking-wider text-[#dfba73] font-semibold flex items-center gap-1">
              <Sparkles size={12} className="text-[#dfba73]" />
              <span>Lotus Bay</span>
            </div>
            <div className="text-xs font-semibold text-white my-0.5">
              Ideal Watersports
            </div>
            <div className="text-[11px] text-emerald-300 truncate">
              Cabanas & Beach Active
            </div>
          </div>
        </div>

        {/* MAIN INTERACTIVE CONNECTING GRAPH SECTION */}
        <div className="relative z-10 p-3 sm:p-5">
          {/* Subtitle & Legend */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#dfba73] flex items-center gap-2">
                <Sparkles size={14} className="text-[#dfba73]" />
                {tr.aegeanOutlook}
              </h3>
              <p className="text-[11px] text-white/60">
                {tr.clickAnyDatePrompt}
              </p>
            </div>

            {/* Graph Legend */}
            <div className="flex items-center gap-3 text-[11px] text-white/70">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 rounded-full bg-[#dfba73]" />
                <span>{tr.maxTemp}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 rounded-full bg-[#38bdf8]" />
                <span>{tr.minTemp}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full border border-sky-400 bg-sky-400/30" />
                <span>{tr.humidity}</span>
              </div>
            </div>
          </div>

          {/* CONNECTED SVG SPLINE GRAPH CONTAINER */}
          {activeTab === "graph" && (
            <div className="relative overflow-x-auto rounded-2xl bg-[#04121b]/95 border border-[rgba(200,159,87,0.25)] p-2 sm:p-4 shadow-inner">
              <div className="min-w-[640px] relative">
                <svg
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-auto overflow-visible select-none"
                  style={{ minHeight: "210px" }}
                >
                  <defs>
                    {/* Golden Gradient for Max Temp Area */}
                    <linearGradient id="goldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#dfba73" stopOpacity="0.25" />
                      <stop offset="60%" stopColor="#dfba73" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#dfba73" stopOpacity="0.0" />
                    </linearGradient>

                    {/* Blue Cyan Gradient for Min Temp */}
                    <linearGradient id="blueLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>

                    {/* Gold Stroke Gradient */}
                    <linearGradient id="goldLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ffd782" />
                      <stop offset="50%" stopColor="#dfba73" />
                      <stop offset="100%" stopColor="#e5a93b" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line
                    x1={paddingX}
                    y1={paddingTop}
                    x2={svgWidth - paddingX}
                    y2={paddingTop}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1={paddingX}
                    y1={paddingTop + 55}
                    x2={svgWidth - paddingX}
                    y2={paddingTop + 55}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1={paddingX}
                    y1={svgHeight - paddingBottom}
                    x2={svgWidth - paddingX}
                    y2={svgHeight - paddingBottom}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="4 4"
                  />

                  {/* Area Fill */}
                  <path d={areaMaxPathString} fill="url(#goldAreaGrad)" />

                  {/* Vertical Guide Lines & Humidity Badges */}
                  {points.map((p) => {
                    const isToday = p.item.isToday;
                    return (
                      <g key={`guide-${p.idx}`}>
                        {/* Shaded highlight column for Today */}
                        {isToday && (
                          <rect
                            x={p.x - 38}
                            y={12}
                            width={76}
                            height={svgHeight - 24}
                            rx={14}
                            fill="rgba(223, 186, 115, 0.08)"
                            stroke="rgba(223, 186, 115, 0.3)"
                            strokeDasharray="2 2"
                          />
                        )}

                        {/* Dashed line connecting max and min nodes */}
                        <line
                          x1={p.x}
                          y1={p.yMax + 8}
                          x2={p.x}
                          y2={p.yMin - 8}
                          stroke={isToday ? "rgba(223, 186, 115, 0.5)" : "rgba(255, 255, 255, 0.12)"}
                          strokeDasharray="3 3"
                          strokeWidth={1.5}
                        />

                        {/* Mid-point Humidity pill */}
                        <g
                          transform={`translate(${p.x}, ${(p.yMax + p.yMin) / 2})`}
                          className="cursor-pointer"
                          onClick={() => handleOpenDay(p.item)}
                        >
                          <rect
                            x={-18}
                            y={-8}
                            width={36}
                            height={16}
                            rx={8}
                            fill="#061824"
                            stroke="rgba(56, 189, 248, 0.4)"
                            strokeWidth={1}
                          />
                          <text
                            x={0}
                            y={3.5}
                            textAnchor="middle"
                            fill="#38bdf8"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            {p.item.humidity}%
                          </text>
                        </g>
                      </g>
                    );
                  })}

                  {/* Connected Spline Line: Min Temperature (Sea Cyan) */}
                  <path
                    d={minPathString}
                    fill="none"
                    stroke="url(#blueLineGrad)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Connected Spline Line: Max Temperature (Golden Amber) */}
                  <path
                    d={maxPathString}
                    fill="none"
                    stroke="url(#goldLineGrad)"
                    strokeWidth={3.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="drop-shadow(0px 3px 6px rgba(223,186,115,0.4))"
                  />

                  {/* Interactive Nodes & Badges for each day */}
                  {points.map((p) => {
                    const isToday = p.item.isToday;
                    const isPast = p.item.isPast;
                    const dayShort =
                      p.item.dayShort?.[locale] ||
                      p.item.dayShort?.en ||
                      p.item.dayLabel?.[locale] ||
                      "Day";

                    return (
                      <g
                        key={`node-${p.idx}`}
                        className="cursor-pointer group"
                        onClick={() => handleOpenDay(p.item)}
                      >
                        {/* TOP: Date & Weather Icon */}
                        <g transform={`translate(${p.x}, 20)`}>
                          {/* Day Short Label */}
                          <text
                            x={0}
                            y={-4}
                            textAnchor="middle"
                            fill={isToday ? "#dfba73" : isPast ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.85)"}
                            fontSize="10"
                            fontWeight={isToday ? "bold" : "600"}
                            letterSpacing="0.05em"
                          >
                            {isToday ? tr.today : dayShort}
                          </text>
                        </g>

                        {/* MAX TEMP NODE (Top Golden Circle) */}
                        <g transform={`translate(${p.x}, ${p.yMax})`}>
                          {/* Clean subtle accent halo on today */}
                          {isToday && (
                            <circle
                              r={10}
                              fill="none"
                              stroke="rgba(223,186,115,0.45)"
                              strokeWidth={1.5}
                            />
                          )}
                          <circle
                            r={isToday ? 7 : 5.5}
                            fill="#dfba73"
                            stroke="#061824"
                            strokeWidth={2}
                          />
                          {/* Large Temperature Badge above the node */}
                          <text
                            x={0}
                            y={-11}
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize={isToday ? "14" : "12"}
                            fontWeight="bold"
                            fontFamily="serif"
                          >
                            {formatTemp(p.item.tempMax)}°
                          </text>
                        </g>

                        {/* MIN TEMP NODE (Bottom Blue Circle) */}
                        <g transform={`translate(${p.x}, ${p.yMin})`}>
                          <circle
                            r={isToday ? 6 : 4.5}
                            fill="#38bdf8"
                            stroke="#061824"
                            strokeWidth={2}
                          />
                          {/* Low temp text below the node */}
                          <text
                            x={0}
                            y={16}
                            textAnchor="middle"
                            fill="rgba(255,255,255,0.6)"
                            fontSize="11"
                            fontWeight="500"
                          >
                            {formatTemp(p.item.tempMin)}°
                          </text>
                        </g>

                        {/* BOTTOM DATE LABEL & TAG */}
                        <g transform={`translate(${p.x}, ${svgHeight - 12})`}>
                          <text
                            x={0}
                            y={0}
                            textAnchor="middle"
                            fill={isPast ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.55)"}
                            fontSize="9"
                            fontFamily="monospace"
                          >
                            {p.item.date ? p.item.date.slice(5) : ""}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          )}

          {/* SLIDING DATE BUTTONS RIBBON WITH TRANSPARENT TOGGLE CONTROLS */}
          <div className="relative mt-4">
            {/* Left Transparent Sliding Toggle Button */}
            <button
              type="button"
              onClick={() => scrollRibbon("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-9 h-12 sm:h-14 rounded-r-xl bg-black/40 hover:bg-black/75 text-white/90 hover:text-[#dfba73] backdrop-blur-md border border-white/20 border-l-0 shadow-lg flex items-center justify-center transition-all active:scale-95 group"
              title={tr.scrollLeft}
              aria-label={tr.scrollLeft}
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Right Transparent Sliding Toggle Button */}
            <button
              type="button"
              onClick={() => scrollRibbon("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-9 h-12 sm:h-14 rounded-l-xl bg-black/40 hover:bg-black/75 text-white/90 hover:text-[#dfba73] backdrop-blur-md border border-white/20 border-r-0 shadow-lg flex items-center justify-center transition-all active:scale-95 group"
              title={tr.scrollRight}
              aria-label={tr.scrollRight}
            >
              <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Horizontal Scrollable Day Cards Ribbon */}
            <div
              ref={ribbonRef}
              className="flex items-stretch gap-2.5 overflow-x-auto no-scrollbar py-2 px-6 sm:px-8 scroll-smooth"
            >
              {forecastList.map((fItem: DailyForecastItem, idx: number) => {
                const isToday = fItem.isToday;
                const isPast = fItem.isPast;
                const dayName = isToday
                  ? tr.today
                  : fItem.dayLabel?.[locale] ||
                    fItem.dayLabel?.en ||
                    fItem.dayShort?.[locale] ||
                    fItem.dayShort?.en ||
                    "Day";
                const condTitle =
                  fItem.conditionName?.[locale] ||
                  fItem.conditionName?.en ||
                  "Sunny";

                return (
                  <button
                    key={fItem.date || idx}
                    type="button"
                    onClick={() => handleOpenDay(fItem)}
                    className={`shrink-0 w-36 sm:w-44 rounded-2xl p-3 sm:p-3.5 text-left border transition-all duration-300 flex flex-col justify-between cursor-pointer group active:scale-[0.98] ${
                      isToday
                        ? "bg-gradient-to-b from-[#dfba73]/25 via-white/[0.08] to-white/[0.03] border-[#dfba73] shadow-[0_8px_25px_rgba(223,186,115,0.25)] ring-1 ring-[#dfba73]/40"
                        : isPast
                        ? "bg-white/[0.03] border-white/10 hover:border-white/25 opacity-75 hover:opacity-100"
                        : "bg-white/[0.05] border-white/15 hover:bg-white/[0.09] hover:border-[#dfba73]/50"
                    }`}
                  >
                    {/* Card Header: Tag & Date */}
                    <div className="flex items-center justify-between w-full mb-2">
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          isToday
                            ? "bg-[#dfba73] text-[#051520]"
                            : isPast
                            ? "bg-white/10 text-white/60"
                            : "bg-white/10 text-[#dfba73]"
                        }`}
                      >
                        {isToday ? tr.today : isPast ? tr.yesterday : dayName}
                      </span>
                      <span className="text-[10px] text-white/50 font-mono">
                        {fItem.date ? fItem.date.slice(5) : ""}
                      </span>
                    </div>

                    {/* Weather Icon & Large High/Low Temps */}
                    <div className="flex items-center justify-between my-1.5 w-full">
                      <div className="p-2 rounded-xl bg-white/10 border border-white/10 group-hover:scale-110 transition-transform">
                        {getWeatherIcon(fItem.weatherCode, 26, "text-[#dfba73]")}
                      </div>

                      <div className="text-right">
                        <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                          {formatTemp(fItem.tempMax)}°
                        </div>
                        <div className="text-xs text-white/50 font-light">
                          {tr.night}: {formatTemp(fItem.tempMin)}°
                        </div>
                      </div>
                    </div>

                    {/* Condition Name & Humidity Pill */}
                    <div className="w-full pt-2 mt-1 border-t border-white/10 flex items-center justify-between text-[10px]">
                      <span className="text-white/80 font-medium truncate max-w-[90px]">
                        {condTitle}
                      </span>
                      <span className="flex items-center gap-0.5 text-sky-300 font-mono">
                        <Droplets size={10} />
                        {fItem.humidity}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* FOOTER NOTICE */}
        <div className="px-4 sm:px-6 py-2.5 bg-black/30 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/50">
          <div className="flex items-center gap-2">
            <Info size={13} className="text-[#dfba73] shrink-0" />
            <span>
              {tr.detailPopupHint}
            </span>
          </div>
          <div className="text-[#dfba73]/80 font-medium text-right">
            Orka Lotus Beach · İçmeler Bay · Marmaris
          </div>
        </div>
      </div>

      {/* DETAIL MODAL POPUP WITH ZOOM GESTURES */}
      <WeatherDetailModal
        day={selectedDay}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        locale={locale}
        unit={unit}
        city={weather.city}
      />
    </div>
  );
};
