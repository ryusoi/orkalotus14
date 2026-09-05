import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Sparkles, Star, ArrowRight } from "lucide-react";
import type { Locale } from "@/data/content";
import { homeTranslations } from "@/data/homeTranslations";

interface RateYourLotusPromoSectionProps {
  locale: Locale;
}

export default function RateYourLotusPromoSection({ locale }: RateYourLotusPromoSectionProps) {
  const t = homeTranslations[locale]?.rateYourLotusSection || homeTranslations.en.rateYourLotusSection;

  // Dynamic 5-star rating animation state machine:
  // Starts at 0, fills 1->2->3->4->5 one by one in gold, holds at 5,
  // unfills back 4->3->2->1->0 one by one, holds at 0, then repeats in a loop.
  const [filledCount, setFilledCount] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let current = 0;
    let direction: "up" | "down" = "up";

    const step = () => {
      if (direction === "up") {
        if (current < 5) {
          current += 1;
          setFilledCount(current);
          timer = setTimeout(step, 360);
        } else {
          // Hold at 5 filled stars to showcase the full rating glory
          timer = setTimeout(() => {
            direction = "down";
            step();
          }, 1500);
        }
      } else {
        if (current > 0) {
          current -= 1;
          setFilledCount(current);
          timer = setTimeout(step, 240);
        } else {
          // Hold at 0 stars before repeating loop
          timer = setTimeout(() => {
            direction = "up";
            step();
          }, 450);
        }
      }
    };

    timer = setTimeout(step, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="rate-your-lotus-banner" className="section py-8 sm:py-12 bg-[var(--shell,#f8f6f0)] border-t border-[var(--line)]">
      <div className="container">
        {/* Golden Frame Card - Entirely clickable to /rank-your-lotus */}
        <Link
          href="/rank-your-lotus"
          className="group relative block rounded-3xl p-[2.5px] transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] focus:outline-none cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #b38728 0%, #fbf5b7 25%, #d4af37 50%, #fbf5b7 75%, #aa771c 100%)",
            boxShadow: "0 14px 45px -10px rgba(212, 175, 55, 0.42), 0 0 24px 0 rgba(212, 175, 55, 0.22)",
          }}
          aria-label="Rate Your Lotus - Experience Rating System"
        >
          {/* Inner Deep Aegean & Midnight Canvas */}
          <div className="relative rounded-[21.5px] bg-gradient-to-br from-[#0c1f2e] via-[#081722] to-[#040e17] px-6 py-10 sm:px-12 sm:py-14 text-center overflow-hidden border border-[#d4af37]/40">
            {/* Subtle inner golden hairline accent */}
            <div className="absolute inset-2 sm:inset-3 border border-[#e4bd77]/25 rounded-[17px] pointer-events-none" />

            {/* Corner Decorative Metallic Brackets */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#d4af37] rounded-tl-sm pointer-events-none" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#d4af37] rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#d4af37] rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#d4af37] rounded-br-sm pointer-events-none" />

            {/* Radiant Ambient Gold Flare in Center */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
              {/* Top Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#e4bd77]/50 text-[#fef08a] text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-xs backdrop-blur-md mb-3 sm:mb-4">
                <Sparkles size={13} className="text-[#fef08a] animate-pulse" />
                <span>{t.badge}</span>
              </div>

              {/* Golden Headline with Gold Star in Front */}
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#e4bd77] flex items-center justify-center gap-2.5 sm:gap-3.5 flex-wrap drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)]">
                <span className="text-[#fbbf24] drop-shadow-[0_0_16px_rgba(251,191,36,0.95)] select-none animate-pulse">
                  ⭐
                </span>
                <span className="bg-gradient-to-r from-[#fff9db] via-[#f3d37a] to-[#d4af37] bg-clip-text text-transparent uppercase">
                  {t.headline}
                </span>
              </h2>

              {/* Dynamic 5-Star Rating System Visual - Filling and Unfilling in Loop */}
              <div className="mt-6 sm:mt-8 flex flex-col items-center">
                <div
                  className="flex items-center justify-center gap-2 sm:gap-3.5 p-2.5 sm:p-3.5 rounded-2xl bg-black/40 border border-[#d4af37]/35 backdrop-blur-md shadow-inner"
                  role="img"
                  aria-label={`Dynamic Rating: ${filledCount} out of 5 stars`}
                >
                  {[0, 1, 2, 3, 4].map((index) => {
                    const isFilled = index < filledCount;
                    return (
                      <div
                        key={index}
                        className={`relative transition-all duration-300 transform ${
                          isFilled ? "scale-105 sm:scale-110" : "scale-95 opacity-40"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className={`w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 transition-all duration-300 ${
                            isFilled
                              ? "drop-shadow-[0_0_12px_rgba(245,158,11,0.9)] filter"
                              : ""
                          }`}
                        >
                          <defs>
                            <linearGradient
                              id={`dynamicGoldStar-${index}`}
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#fff9db" />
                              <stop offset="35%" stopColor="#fbbf24" />
                              <stop offset="70%" stopColor="#d97706" />
                              <stop offset="100%" stopColor="#b45309" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            fill={isFilled ? `url(#dynamicGoldStar-${index})` : "none"}
                            stroke={isFilled ? "#ffd700" : "#d4af37"}
                            strokeWidth={isFilled ? "1" : "1.75"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    );
                  })}
                </div>

                {/* Live Rating Score Tracker */}
                <div className="flex items-center justify-center gap-2 mt-3.5">
                  <span className="px-3 py-1 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b]/50 text-[#fef08a] font-mono font-bold text-xs sm:text-sm tracking-wider flex items-center gap-1.5 shadow-xs">
                    <Sparkles size={13} className="text-[#f59e0b]" />
                    <span>{filledCount > 0 ? filledCount.toFixed(1) : "0.0"} / 5.0</span>
                  </span>
                  <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#e4bd77] uppercase">
                    {t.liveRatingLabel}
                  </span>
                </div>
              </div>

              {/* Professional Description */}
              <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-200 font-sans leading-relaxed max-w-3xl mx-auto font-medium">
                {t.description}
              </p>

              {/* Call to Action Button */}
              <div className="mt-8 flex items-center justify-center">
                <div className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] text-slate-950 font-serif font-bold text-xs sm:text-sm uppercase tracking-widest border-2 border-[#996515] shadow-[0_4px_20px_rgba(212,175,55,0.5)] group-hover:shadow-[0_4px_30px_rgba(212,175,55,0.75)] group-hover:brightness-110 group-hover:scale-105 transition-all flex items-center gap-2.5">
                  <Star size={16} className="fill-slate-950 text-slate-950" />
                  <span>{t.cta}</span>
                  <ArrowRight size={16} className="text-slate-950 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Trust Footnote */}
              <p className="mt-4 text-[11px] sm:text-xs text-[#e4bd77]/80 font-medium tracking-wide">
                {t.verifiedNote}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
