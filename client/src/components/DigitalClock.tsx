import { useEffect, useRef, useState } from "react";

interface DigitalClockProps {
  timezone?: string; // e.g. "Europe/Istanbul"
  className?: string;
  showSeconds?: boolean;
}

// 7-segment segment mapping (1-indexed based on the provided spec):
// 1: top, 2: top-right, 3: bottom-right, 4: bottom, 5: bottom-left, 6: top-left, 7: middle
const digitSegments: number[][] = [
  [1, 2, 3, 4, 5, 6], // 0
  [2, 3], // 1
  [1, 2, 7, 5, 4], // 2
  [1, 2, 7, 3, 4], // 3
  [6, 7, 2, 3], // 4
  [1, 6, 7, 3, 4], // 5
  [1, 6, 5, 4, 3, 7], // 6
  [1, 2, 3], // 7
  [1, 2, 3, 4, 5, 6, 7], // 8
  [1, 2, 7, 3, 6, 4], // 9
];

function getIstanbulTime(timezone = "Europe/Istanbul") {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    for (const p of parts) {
      if (p.type === "hour") hours = parseInt(p.value, 10);
      if (p.type === "minute") minutes = parseInt(p.value, 10);
      if (p.type === "second") seconds = parseInt(p.value, 10);
    }
    return { hours, minutes, seconds };
  } catch {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    };
  }
}

interface SegmentDigitProps {
  value: number;
  className?: string;
  type: "hours" | "minutes" | "seconds";
}

function SegmentDigit({ value, className = "", type }: SegmentDigitProps) {
  const digitRef = useRef<HTMLDivElement | null>(null);
  const prevValueRef = useRef<number | null>(null);

  useEffect(() => {
    const el = digitRef.current;
    if (!el) return;

    const segments = el.querySelectorAll<HTMLDivElement>(".segment");
    const num = Math.min(Math.max(value, 0), 9);
    const prev = prevValueRef.current;

    // Check if number changed
    if (prev !== null && prev !== num) {
      const prevActive = digitSegments[prev] || [];
      prevActive.forEach((segIndex, idx) => {
        const segEl = segments[segIndex - 1];
        if (segEl) {
          window.setTimeout(() => {
            segEl.classList.remove("on");
          }, idx * 25);
        }
      });
    }

    if (prev === null || prev !== num) {
      window.setTimeout(() => {
        const nextActive = digitSegments[num] || [];
        nextActive.forEach((segIndex, idx) => {
          const segEl = segments[segIndex - 1];
          if (segEl) {
            window.setTimeout(() => {
              segEl.classList.add("on");
            }, idx * 25);
          }
        });
      }, prev !== null ? 120 : 0);

      prevValueRef.current = num;
      el.setAttribute("data-value", String(num));
    }
  }, [value]);

  return (
    <div
      ref={digitRef}
      className={`digit ${type} ${className}`}
      data-value={value}
      aria-hidden="true"
    >
      <div className="segment seg-1" />
      <div className="segment seg-2" />
      <div className="segment seg-3" />
      <div className="segment seg-4" />
      <div className="segment seg-5" />
      <div className="segment seg-6" />
      <div className="segment seg-7" />
    </div>
  );
}

export default function DigitalClock({
  timezone = "Europe/Istanbul",
  className = "",
  showSeconds = true,
}: DigitalClockProps) {
  const [time, setTime] = useState(() => getIstanbulTime(timezone));

  useEffect(() => {
    const update = () => {
      setTime(getIstanbulTime(timezone));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  const h1 = Math.floor(time.hours / 10);
  const h2 = time.hours % 10;
  const m1 = Math.floor(time.minutes / 10);
  const m2 = time.minutes % 10;
  const s1 = Math.floor(time.seconds / 10);
  const s2 = time.seconds % 10;

  const formattedTime = `${String(time.hours).padStart(2, "0")}:${String(time.minutes).padStart(2, "0")}:${String(time.seconds).padStart(2, "0")}`;

  return (
    <div
      className={`seven-seg-clock-container ${className}`}
      role="timer"
      aria-label={`Current hotel time in Marmaris is ${formattedTime}`}
    >
      <div className="clock">
        {/* Hours */}
        <div className="digit-pair">
          <SegmentDigit value={h1} type="hours" />
          <SegmentDigit value={h2} type="hours" />
        </div>

        {/* Separator */}
        <div className="separator" aria-hidden="true">
          <div className="dot" />
          <div className="dot" />
        </div>

        {/* Minutes */}
        <div className="digit-pair">
          <SegmentDigit value={m1} type="minutes" />
          <SegmentDigit value={m2} type="minutes" />
        </div>

        {showSeconds && (
          <>
            {/* Separator */}
            <div className="separator separator-seconds" aria-hidden="true">
              <div className="dot" />
              <div className="dot" />
            </div>

            {/* Seconds */}
            <div className="digit-pair digit-pair-seconds">
              <SegmentDigit value={s1} type="seconds" />
              <SegmentDigit value={s2} type="seconds" />
            </div>
          </>
        )}
      </div>
      <span className="sr-only">{formattedTime}</span>
    </div>
  );
}
