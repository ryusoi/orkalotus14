import React, { useState, useEffect } from "react";

interface CursiveArtisticSignatureProps {
  className?: string;
  text?: string;
  typingSpeed?: number;
  holdDuration?: number;
  fadeDuration?: number;
}

export default function CursiveArtisticSignature({
  className = "",
  text = "Orka Lotus Beach",
  typingSpeed = 130,
  holdDuration = 3000,
  fadeDuration = 650,
}: CursiveArtisticSignatureProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "completed" | "fading">("typing");
  const [glimmerPulse, setGlimmerPulse] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (phase === "typing") {
      if (displayedCount < text.length) {
        timer = setTimeout(() => {
          setDisplayedCount((prev) => prev + 1);
        }, typingSpeed);
      } else {
        // Text is fully typed, switch to completed phase
        setPhase("completed");
        setGlimmerPulse(true);
      }
    } else if (phase === "completed") {
      timer = setTimeout(() => {
        setPhase("fading");
      }, holdDuration);
    } else if (phase === "fading") {
      timer = setTimeout(() => {
        setDisplayedCount(0);
        setGlimmerPulse(false);
        setPhase("typing");
      }, fadeDuration);
    }

    return () => clearTimeout(timer);
  }, [displayedCount, phase, text, typingSpeed, holdDuration, fadeDuration]);

  const allChars = text.split("");

  return (
    <div
      className={`cursive-signature-container ${className} ${
        phase === "fading" ? "cursive-fading" : ""
      } ${phase === "completed" ? "cursive-complete" : ""}`}
      aria-label="Orka Lotus Beach signature"
    >
      <div className="cursive-signature-inner">
        <span className="cursive-text">
          {allChars.map((char, index) => {
            const isVisible = index < displayedCount;
            const isLatest = index === displayedCount - 1 && phase === "typing";
            return (
              <span
                key={index}
                className={`cursive-char-slot ${char === " " ? "cursive-space" : ""}`}
              >
                <span
                  className={`cursive-char ${isVisible ? "cursive-char-visible" : "cursive-char-hidden"} ${
                    isLatest ? "cursive-char-flash" : ""
                  }`}
                >
                  {char}
                </span>

                {/* Dynamic Flash Sparkle / Pen Tip Cursor on active char */}
                {isLatest && phase === "typing" && (
                  <span className="cursive-flash-cursor-pin" aria-hidden="true">
                    <span className="cursor-dot" />
                    <span className="cursor-sparkle">✦</span>
                  </span>
                )}
              </span>
            );
          })}
        </span>

        {/* Full Flourish & Final Flash Star on Completion */}
        <span
          className={`cursive-completion-star ${
            phase === "completed" ? "star-visible" : "star-hidden"
          } ${glimmerPulse ? "star-pulse" : ""}`}
          aria-hidden="true"
        >
          ✦
        </span>
      </div>

      {/* Fine-line calligraphic decorative underline flourish with reserved bounds */}
      <div className="cursive-flourish-wrap" aria-hidden="true">
        <svg
          className={`cursive-flourish-line ${phase === "completed" ? "flourish-active" : ""}`}
          viewBox="0 0 240 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 8C50 8 75 2 120 2C165 2 190 14 238 8"
            stroke="url(#cursiveFlourishGrad)"
            strokeWidth="1.2"
            strokeLinecap="round"
            className="flourish-path"
          />
          <defs>
            <linearGradient id="cursiveFlourishGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--gold, #e4bd77)" stopOpacity="0" />
              <stop offset="25%" stopColor="var(--gold, #e4bd77)" stopOpacity="0.85" />
              <stop offset="50%" stopColor="var(--tide, #8bd0ca)" stopOpacity="1" />
              <stop offset="75%" stopColor="var(--gold, #e4bd77)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--gold, #e4bd77)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

