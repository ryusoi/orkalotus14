import React, { useEffect, useRef, useState } from "react";

interface DynamicMovingLinesProps {
  className?: string;
  height?: string | number;
  lineCount?: number;
  colorScheme?: "blue" | "ocean" | "subtle";
  parallax?: boolean;
  parallaxSpeed?: number;
  showBadge?: boolean;
  badgeText?: string;
  title?: React.ReactNode;
  subtitle?: string;
  overlayContent?: React.ReactNode;
  variant?: "banner" | "background" | "divider";
}

/**
 * Refined, minimalist DynamicMovingLines with clean, fewer moving lines.
 * Uses hardware-accelerated CSS transforms for buttery smooth 120fps scrolling on mobile & desktop.
 */
export default function DynamicMovingLines({
  className = "",
  height = "100px",
  lineCount = 3,
  colorScheme = "blue",
  showBadge = false,
  badgeText = "Live Aegean Drift",
  title,
  subtitle,
  overlayContent,
}: DynamicMovingLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(true);

  // Cap line count between 2 and 3 for pristine minimalist elegance
  const actualLineCount = Math.max(2, Math.min(lineCount, 3));

  // Aegean color definitions with sleeker, low-amplitude fast wave paths
  const palettes = {
    blue: [
      {
        id: "line-1",
        stroke: "url(#aegeanGrad1)",
        strokeWidth: 1.3,
        opacity: 0.75,
        baseY: 48,
        amplitude: 14,
        driftDuration: 12,
        floatDuration: 4.5,
        direction: 1,
      },
      {
        id: "line-2",
        stroke: "url(#aegeanGrad2)",
        strokeWidth: 1.1,
        opacity: 0.65,
        baseY: 92,
        amplitude: 12,
        driftDuration: 14,
        floatDuration: 5.5,
        direction: -1,
      },
      {
        id: "line-3",
        stroke: "url(#aegeanGrad3)",
        strokeWidth: 0.9,
        opacity: 0.45,
        baseY: 70,
        amplitude: 10,
        driftDuration: 17,
        floatDuration: 6.5,
        direction: 1,
      },
    ],
    ocean: [
      {
        id: "line-1",
        stroke: "url(#aegeanGrad2)",
        strokeWidth: 1.3,
        opacity: 0.75,
        baseY: 46,
        amplitude: 14,
        driftDuration: 11,
        floatDuration: 4,
        direction: 1,
      },
      {
        id: "line-2",
        stroke: "url(#aegeanGrad1)",
        strokeWidth: 1.1,
        opacity: 0.6,
        baseY: 94,
        amplitude: 11,
        driftDuration: 13,
        floatDuration: 5,
        direction: -1,
      },
      {
        id: "line-3",
        stroke: "url(#aegeanGrad3)",
        strokeWidth: 0.9,
        opacity: 0.4,
        baseY: 72,
        amplitude: 9,
        driftDuration: 16,
        floatDuration: 6,
        direction: 1,
      },
    ],
    subtle: [
      {
        id: "line-1",
        stroke: "url(#aegeanGrad3)",
        strokeWidth: 1.0,
        opacity: 0.45,
        baseY: 50,
        amplitude: 12,
        driftDuration: 13,
        floatDuration: 5,
        direction: 1,
      },
      {
        id: "line-2",
        stroke: "url(#aegeanGrad2)",
        strokeWidth: 0.9,
        opacity: 0.35,
        baseY: 90,
        amplitude: 10,
        driftDuration: 15,
        floatDuration: 6,
        direction: -1,
      },
      {
        id: "line-3",
        stroke: "url(#aegeanGrad1)",
        strokeWidth: 0.8,
        opacity: 0.3,
        baseY: 68,
        amplitude: 8,
        driftDuration: 18,
        floatDuration: 7,
        direction: 1,
      },
    ],
  };

  const linesToRender = (palettes[colorScheme] || palettes.blue).slice(0, actualLineCount);

  // Pause animations completely when out of viewport to save battery & CPU
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "100px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Generate continuous sinusoidal bezier wave
  // Repeats seamlessly every 800px over a 3200px span
  const createSeamlessWavePath = (baseY: number, amplitude: number) => {
    const period = 400; // Half period (200 crest, 200 trough)
    const totalWidth = 3200;
    let d = `M 0 ${baseY}`;

    for (let x = 0; x < totalWidth; x += period) {
      const half = period / 2;
      const quarter = half / 2;

      // Crest (up)
      const c1x = x + quarter * 0.5;
      const c1y = baseY - amplitude * 1.35;
      const c2x = x + half - quarter * 0.5;
      const c2y = baseY - amplitude * 1.35;
      const midX = x + half;
      const midY = baseY;

      d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${midX} ${midY}`;

      // Trough (down)
      const c3x = midX + quarter * 0.5;
      const c3y = baseY + amplitude * 1.35;
      const c4x = x + period - quarter * 0.5;
      const c4y = baseY + amplitude * 1.35;
      const endX = x + period;
      const endY = baseY;

      d += ` C ${c3x} ${c3y}, ${c4x} ${c4y}, ${endX} ${endY}`;
    }

    return d;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden transition-colors select-none ${className}`}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        backgroundColor: "transparent",
        contain: "paint layout",
      }}
      aria-hidden="true"
    >
      {/* SVG Waves Container with GPU Acceleration */}
      <svg
        viewBox="0 0 1600 140"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          opacity: isInView ? 1 : 0.05,
          transition: "opacity 0.6s ease-out",
          willChange: "transform",
        }}
      >
        <defs>
          <linearGradient id="aegeanGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#0ea5e9" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#0284c7" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="aegeanGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.1" />
            <stop offset="35%" stopColor="#2dd4bf" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#0284c7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="aegeanGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {linesToRender.map((line, idx) => {
          const isForward = line.direction === 1;
          return (
            <g
              key={line.id}
              className="dynamic-wave-group"
              style={{
                animation: isInView
                  ? `aegeanFloat${idx + 1} ${line.floatDuration}s ease-in-out infinite alternate`
                  : "none",
                transformOrigin: "center center",
                willChange: isInView ? "transform" : "auto",
              }}
            >
              <path
                d={createSeamlessWavePath(line.baseY, line.amplitude)}
                fill="none"
                stroke={line.stroke}
                strokeWidth={line.strokeWidth}
                strokeLinecap="round"
                opacity={line.opacity}
                style={{
                  animation: isInView
                    ? `${isForward ? "aegeanDriftForward" : "aegeanDriftBackward"} ${line.driftDuration}s linear infinite`
                    : "none",
                  willChange: isInView ? "transform" : "auto",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Optional Editorial Floating Overlay Content */}
      {(title || subtitle || showBadge || overlayContent) && (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 pointer-events-auto">
          {showBadge && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--paper)]/90 backdrop-blur-md border border-[var(--line)] shadow-xs text-[9px] sm:text-[9.5px] font-bold uppercase tracking-widest text-[var(--tide)] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--tide)] animate-pulse" />
              <span>{badgeText}</span>
            </div>
          )}

          {title && (
            <div className="font-serif text-base sm:text-lg text-[var(--ink)] font-medium max-w-xl leading-snug">
              {title}
            </div>
          )}

          {subtitle && (
            <p className="text-[10px] sm:text-[11px] text-[var(--ink-soft)] max-w-lg mt-0.5 leading-tight">
              {subtitle}
            </p>
          )}

          {overlayContent}
        </div>
      )}
    </div>
  );
}
