import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCcw, Hand } from "lucide-react";
import { useTouchPinchPan } from "@/hooks/useTouchPinchPan";
import {
  activitiesGalleryImages,
  spaGalleryImages,
  spaSectionCopy,
  restaurantBarGalleryImages,
  restaurantBarSectionCopy,
  miniClubGalleryImages,
  miniClubSectionCopy,
  accommodationGalleryImages,
  accommodationSectionCopy,
  miniClubWeekDays,
  miniClubWeekSchedule,
  type Locale,
} from "@/data/content";

export function FullscreenImageViewer({
  images,
  index,
  label,
  onClose,
  onChange,
}: {
  images: string[];
  index: number | null;
  label: string;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const viewerRef = useRef<HTMLDivElement>(null);

  const {
    scale,
    isZoomed,
    reset,
    zoomIn,
    zoomOut,
    containerProps,
    contentStyle,
  } = useTouchPinchPan({
    minScale: 0.7,
    maxScale: 5.0,
    initialScale: 1.0,
    doubleTapScale: 2.3,
  });

  useEffect(() => {
    if (index !== null) {
      viewerRef.current?.focus();
      reset();
    }
  }, [index, reset]);

  if (index === null) return null;

  const move = (direction: number) => {
    reset();
    onChange((index + direction + images.length) % images.length);
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      reset();
      onClose();
    }
  };

  const zoomPercent = Math.round(scale * 100);

  return (
    <div
      ref={viewerRef}
      className="fullscreen-viewer select-none touch-none"
      role="dialog"
      aria-modal="true"
      aria-label={`${label} fullscreen viewer`}
      onClick={handleBackdropClick}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          reset();
          onClose();
        }
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
      tabIndex={-1}
    >
      {/* Floating HUD Controls */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-4 z-[100] flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a1926]/90 border border-[#d4af37]/40 shadow-2xl backdrop-blur-lg text-white animate-in fade-in"
      >
        <span className="text-xs font-serif text-[#f3e5ab] font-medium px-2 truncate max-w-[150px] sm:max-w-[260px]">
          {label}
        </span>
        <div className="w-[1px] h-4 bg-white/20" />
        <span className="px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-mono text-[#f3e5ab]">
          {zoomPercent}%
        </span>
        <button
          type="button"
          onClick={zoomOut}
          aria-label="Zoom out"
          title="Zoom out"
          className="w-7 h-7 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/20 text-white transition-all"
        >
          <ZoomOut size={14} />
        </button>
        <button
          type="button"
          onClick={zoomIn}
          aria-label="Zoom in"
          title="Zoom in"
          className="w-7 h-7 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/20 text-white transition-all"
        >
          <ZoomIn size={14} />
        </button>
        {isZoomed && (
          <button
            type="button"
            onClick={reset}
            aria-label="Reset zoom"
            className="px-2 h-7 rounded-full flex items-center gap-1 bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#f3e5ab] text-[10px] font-bold uppercase tracking-wider"
          >
            <RotateCcw size={12} />
            <span>1x</span>
          </button>
        )}
        <div className="w-[1px] h-4 bg-white/20" />
        <button
          className="w-7 h-7 rounded-full flex items-center justify-center bg-red-500/20 hover:bg-red-500/40 text-red-200 border border-red-500/30 transition-all"
          type="button"
          onClick={() => {
            reset();
            onClose();
          }}
          aria-label="Close fullscreen image viewer"
        >
          <X size={15} />
        </button>
      </div>

      <button
        className="fullscreen-viewer-nav fullscreen-viewer-prev"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          move(-1);
        }}
        aria-label="Previous fullscreen image"
      >
        <ChevronLeft size={24} />
      </button>

      <div
        {...containerProps}
        className="fullscreen-viewer-stage overflow-visible cursor-grab active:cursor-grabbing"
        onClick={handleBackdropClick}
      >
        <div style={contentStyle} className="relative flex items-center justify-center">
          <img
            src={images[index]}
            alt={`${label} ${index + 1}`}
            draggable="false"
            onClick={(e) => {
              if (!isZoomed) {
                reset();
                onClose();
              }
            }}
          />
        </div>
        <span className="fullscreen-viewer-count pointer-events-none">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </span>
      </div>

      <button
        className="fullscreen-viewer-nav fullscreen-viewer-next"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          move(1);
        }}
        aria-label="Next fullscreen image"
      >
        <ChevronRight size={24} />
      </button>

      {/* Gesture Hint Pill */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-4 z-[100] pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 border border-white/15 text-[10px] sm:text-xs text-white/80 backdrop-blur-md shadow-lg"
      >
        <Hand size={13} className="text-[#d4af37] animate-pulse" />
        <span>Pinch to zoom • Drag to move • Tap backdrop to close</span>
      </div>
    </div>
  );
}

export function ActivitiesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreferenceChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onPreferenceChange);
    return () => mediaQuery.removeEventListener("change", onPreferenceChange);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || activitiesGalleryImages.length < 2)
      return;
    const timer = window.setInterval(
      () =>
        setActiveIndex(
          (index) => (index + 1) % activitiesGalleryImages.length
        ),
      5200
    );
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const move = (direction: number) =>
    setActiveIndex(
      (index) =>
        (index + direction + activitiesGalleryImages.length) %
        activitiesGalleryImages.length
    );

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance =
      (event.changedTouches[0]?.clientX ?? touchStartX.current) -
      touchStartX.current;
    if (Math.abs(distance) > 42) move(distance < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <div
      className="dining-carousel activities-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="dining-carousel-viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="dining-carousel-track"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {activitiesGalleryImages.map((image, index) => (
            <figure
              className="dining-slide activities-slide"
              data-lightbox-kind="activities"
              data-lightbox-index={index}
              key={`${image}-${index}`}
              aria-hidden={index !== activeIndex}
            >
              <img
                src={image}
                alt={`Lotus activity ${index + 1}`}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                draggable="false"
              />
              <figcaption>
                <span>0{String(index + 1).padStart(2, "0")}</span>
                <strong>Lotus Activities</strong>
                <small>Swipe to explore the options</small>
              </figcaption>
            </figure>
          ))}
        </div>
        <button
          className="dining-carousel-control dining-carousel-prev"
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous activity image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="dining-carousel-control dining-carousel-next"
          type="button"
          onClick={() => move(1)}
          aria-label="Next activity image"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div
        className="dining-carousel-toolbar"
        aria-label="Lotus Activities image carousel controls"
      >
        <span className="dining-carousel-count">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(activitiesGalleryImages.length).padStart(2, "0")}
        </span>
        <div className="dining-carousel-dots">
          {activitiesGalleryImages.map((image, index) => (
            <button
              key={`activity-dot-${image}-${index}`}
              type="button"
              className={`dining-carousel-dot ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show activity image ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <span className="dining-carousel-hint">
          {prefersReducedMotion
            ? "Manual view"
            : isPaused
            ? "Paused"
            : "Auto-advancing"}
        </span>
      </div>
    </div>
  );
}

export function SpaCarousel({ locale }: { locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreferenceChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onPreferenceChange);
    return () => mediaQuery.removeEventListener("change", onPreferenceChange);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || spaGalleryImages.length < 2) return;
    const timer = window.setInterval(
      () =>
        setActiveIndex((index) => (index + 1) % spaGalleryImages.length),
      5200
    );
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const move = (direction: number) =>
    setActiveIndex(
      (index) =>
        (index + direction + spaGalleryImages.length) % spaGalleryImages.length
    );

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance =
      (event.changedTouches[0]?.clientX ?? touchStartX.current) -
      touchStartX.current;
    if (Math.abs(distance) > 42) move(distance < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <div
      className="dining-carousel spa-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="dining-carousel-viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="dining-carousel-track"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {spaGalleryImages.map((image, index) => (
            <figure
              className="dining-slide spa-slide"
              data-lightbox-kind="spa"
              data-lightbox-index={index}
              key={`${image}-${index}`}
              aria-hidden={index !== activeIndex}
            >
              <img
                src={image}
                alt={`Lotus spa area ${index + 1}`}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                draggable="false"
              />
              <figcaption>
                <span>0{String(index + 1).padStart(2, "0")}</span>
                <strong>Lotus Spa</strong>
                <small>{spaSectionCopy.photosLabel[locale]}</small>
              </figcaption>
            </figure>
          ))}
        </div>
        <button
          className="dining-carousel-control dining-carousel-prev"
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous spa image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="dining-carousel-control dining-carousel-next"
          type="button"
          onClick={() => move(1)}
          aria-label="Next spa image"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div
        className="dining-carousel-toolbar"
        aria-label="Lotus Spa image carousel controls"
      >
        <span className="dining-carousel-count">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(spaGalleryImages.length).padStart(2, "0")}
        </span>
        <div className="dining-carousel-dots">
          {spaGalleryImages.map((image, index) => (
            <button
              key={`spa-dot-${image}-${index}`}
              type="button"
              className={`dining-carousel-dot ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show spa image ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <span className="dining-carousel-hint">
          {prefersReducedMotion
            ? "Manual view"
            : isPaused
            ? "Paused"
            : "Auto-advancing"}
        </span>
      </div>
    </div>
  );
}

export function RestaurantBarCarousel({ locale }: { locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreferenceChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onPreferenceChange);
    return () => mediaQuery.removeEventListener("change", onPreferenceChange);
  }, []);

  useEffect(() => {
    if (
      isPaused ||
      prefersReducedMotion ||
      restaurantBarGalleryImages.length < 2
    )
      return;
    const timer = window.setInterval(
      () =>
        setActiveIndex(
          (index) => (index + 1) % restaurantBarGalleryImages.length
        ),
      5200
    );
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const move = (direction: number) =>
    setActiveIndex(
      (index) =>
        (index + direction + restaurantBarGalleryImages.length) %
        restaurantBarGalleryImages.length
    );

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance =
      (event.changedTouches[0]?.clientX ?? touchStartX.current) -
      touchStartX.current;
    if (Math.abs(distance) > 42) move(distance < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <div
      className="dining-carousel restaurant-bar-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="dining-carousel-viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="dining-carousel-track"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {restaurantBarGalleryImages.map((image, index) => (
            <figure
              className="dining-slide restaurant-bar-slide"
              data-lightbox-kind="restaurantBar"
              data-lightbox-index={index}
              key={`${image}-${index}`}
              aria-hidden={index !== activeIndex}
            >
              <img
                src={image}
                alt={`Lotus restaurant and bar area ${index + 1}`}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                draggable="false"
              />
              <figcaption>
                <span>0{String(index + 1).padStart(2, "0")}</span>
                <strong>Restaurant &amp; Bar</strong>
                <small>{restaurantBarSectionCopy.photosLabel[locale]}</small>
              </figcaption>
            </figure>
          ))}
        </div>
        <button
          className="dining-carousel-control dining-carousel-prev"
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous restaurant and bar image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="dining-carousel-control dining-carousel-next"
          type="button"
          onClick={() => move(1)}
          aria-label="Next restaurant and bar image"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div
        className="dining-carousel-toolbar"
        aria-label="Restaurant and Bar image carousel controls"
      >
        <span className="dining-carousel-count">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(restaurantBarGalleryImages.length).padStart(2, "0")}
        </span>
        <div className="dining-carousel-dots">
          {restaurantBarGalleryImages.map((image, index) => (
            <button
              key={`restaurant-bar-dot-${image}-${index}`}
              type="button"
              className={`dining-carousel-dot ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show restaurant and bar image ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <span className="dining-carousel-hint">
          {prefersReducedMotion
            ? "Manual view"
            : isPaused
            ? "Paused"
            : "Auto-advancing"}
        </span>
      </div>
    </div>
  );
}

export function MiniClubCarousel({ locale }: { locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreferenceChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onPreferenceChange);
    return () => mediaQuery.removeEventListener("change", onPreferenceChange);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || miniClubGalleryImages.length < 2)
      return;
    const timer = window.setInterval(
      () =>
        setActiveIndex((index) => (index + 1) % miniClubGalleryImages.length),
      5200
    );
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const move = (direction: number) =>
    setActiveIndex(
      (index) =>
        (index + direction + miniClubGalleryImages.length) %
        miniClubGalleryImages.length
    );

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance =
      (event.changedTouches[0]?.clientX ?? touchStartX.current) -
      touchStartX.current;
    if (Math.abs(distance) > 42) move(distance < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <div
      className="dining-carousel mini-club-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="dining-carousel-viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="dining-carousel-track"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {miniClubGalleryImages.map((image, index) => (
            <figure
              className="dining-slide mini-club-slide"
              data-lightbox-kind="miniClub"
              data-lightbox-index={index}
              key={`${image}-${index}`}
              aria-hidden={index !== activeIndex}
            >
              <img
                src={image}
                alt={`Lotus Mini Club ${index + 1}`}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                draggable="false"
              />
              <figcaption>
                <span>0{String(index + 1).padStart(2, "0")}</span>
                <strong>Mini Club</strong>
                <small>{miniClubSectionCopy.age[locale]}</small>
              </figcaption>
            </figure>
          ))}
        </div>
        <button
          className="dining-carousel-control dining-carousel-prev"
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous Mini Club image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="dining-carousel-control dining-carousel-next"
          type="button"
          onClick={() => move(1)}
          aria-label="Next Mini Club image"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div
        className="dining-carousel-toolbar"
        aria-label="Mini Club image carousel controls"
      >
        <span className="dining-carousel-count">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(miniClubGalleryImages.length).padStart(2, "0")}
        </span>
        <div className="dining-carousel-dots">
          {miniClubGalleryImages.map((image, index) => (
            <button
              key={`mini-club-dot-${image}-${index}`}
              type="button"
              className={`dining-carousel-dot ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show Mini Club image ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <span className="dining-carousel-hint">
          {prefersReducedMotion
            ? "Manual view"
            : isPaused
            ? "Paused"
            : "Auto-advancing"}
        </span>
      </div>
    </div>
  );
}

export function AccommodationCarousel({ locale }: { locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreferenceChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onPreferenceChange);
    return () => mediaQuery.removeEventListener("change", onPreferenceChange);
  }, []);

  useEffect(() => {
    if (
      isPaused ||
      prefersReducedMotion ||
      accommodationGalleryImages.length < 2
    )
      return;
    const timer = window.setInterval(
      () =>
        setActiveIndex(
          (index) => (index + 1) % accommodationGalleryImages.length
        ),
      5200
    );
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const move = (direction: number) =>
    setActiveIndex(
      (index) =>
        (index + direction + accommodationGalleryImages.length) %
        accommodationGalleryImages.length
    );

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance =
      (event.changedTouches[0]?.clientX ?? touchStartX.current) -
      touchStartX.current;
    if (Math.abs(distance) > 42) move(distance < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <div
      className="dining-carousel accommodation-gallery"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="dining-carousel-viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="dining-carousel-track"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {accommodationGalleryImages.map((image, index) => (
            <figure
              className="dining-slide accommodation-slide"
              data-lightbox-kind="accommodation"
              data-lightbox-index={index}
              key={`${image}-${index}`}
              aria-hidden={index !== activeIndex}
            >
              <img
                src={image}
                alt={`${accommodationSectionCopy.roomsLabel[locale]} ${
                  index + 1
                }`}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                draggable="false"
              />
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{accommodationSectionCopy.roomsLabel[locale]}</strong>
                <small>{accommodationSectionCopy.photosLabel[locale]}</small>
              </figcaption>
            </figure>
          ))}
        </div>
        <button
          className="dining-carousel-control dining-carousel-prev"
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous accommodation image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="dining-carousel-control dining-carousel-next"
          type="button"
          onClick={() => move(1)}
          aria-label="Next accommodation image"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div
        className="dining-carousel-toolbar"
        aria-label="Accommodation image carousel controls"
      >
        <span className="dining-carousel-count">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(accommodationGalleryImages.length).padStart(2, "0")}
        </span>
        <div className="dining-carousel-dots">
          {accommodationGalleryImages.map((image, index) => (
            <button
              key={`room-dot-${image}-${index}`}
              type="button"
              className={`dining-carousel-dot ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show accommodation image ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <span className="dining-carousel-hint">
          {prefersReducedMotion
            ? "Manual view"
            : isPaused
            ? "Paused"
            : "Auto-advancing"}
        </span>
      </div>
    </div>
  );
}

export function KidsActivitySchedule({ locale }: { locale: Locale }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const selectedActivities = miniClubWeekSchedule.filter(
    (item) => item.dayIndex === selectedDay
  );
  const dayLabels = miniClubWeekDays[locale] || miniClubWeekDays.en;

  return (
    <div
      className="kids-schedule"
      aria-label={miniClubSectionCopy.scheduleTitle[locale]}
    >
      <div className="kids-schedule-header">
        <div>
          <span className="section-label">
            <span className="section-label-line" />
            {miniClubSectionCopy.scheduleTitle[locale]}
          </span>
          <h3>{dayLabels[selectedDay]}</h3>
        </div>
        <span className="kids-schedule-hours">
          {miniClubSectionCopy.hours}
        </span>
      </div>
      <div
        className="kids-day-tabs"
        role="tablist"
        aria-label={miniClubSectionCopy.scheduleTitle[locale]}
      >
        {dayLabels.map((day, index) => (
          <button
            key={day}
            type="button"
            role="tab"
            aria-selected={selectedDay === index}
            className={`kids-day-tab ${selectedDay === index ? "active" : ""}`}
            onClick={() => setSelectedDay(index)}
          >
            <span>0{index + 1}</span>
            <strong>{day.slice(0, 3)}</strong>
          </button>
        ))}
      </div>
      <div className="kids-activity-rows">
        {selectedActivities.map((item, index) => (
          <div
            className="kids-activity-row"
            key={`${item.time}-${item.title[locale] || item.title.en}-${index}`}
          >
            <span className="kids-time">{item.time}</span>
            <div className="kids-bullet" />
            <strong className="kids-title">
              {item.title[locale] || item.title.en}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
