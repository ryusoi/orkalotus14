import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { X, ZoomIn, ZoomOut, RotateCcw, Hand, Maximize2, Sparkles } from "lucide-react";
import { useTouchPinchPan } from "@/hooks/useTouchPinchPan";

export interface MediaItem {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

interface MediaZoomContextValue {
  openMedia: (item: MediaItem) => void;
  closeMedia: () => void;
  activeMedia: MediaItem | null;
}

const MediaZoomContext = createContext<MediaZoomContextValue | undefined>(undefined);

export function useGlobalMediaZoom() {
  const context = useContext(MediaZoomContext);
  if (!context) {
    throw new Error("useGlobalMediaZoom must be used within GlobalMediaZoomProvider");
  }
  return context;
}

export function GlobalMediaZoomProvider({ children }: { children: React.ReactNode }) {
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const openMedia = useCallback((item: MediaItem) => {
    if (!item.src) return;
    setActiveMedia(item);
  }, []);

  const closeMedia = useCallback(() => {
    setActiveMedia(null);
  }, []);

  // Universal Touch / Click event delegation on all page images
  useEffect(() => {
    const handleDocumentClickOrTouch = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find if clicked element is an <img> or has data-zoom-src
      const img = target.closest("img") as HTMLImageElement | null;
      if (!img) return;

      // Ignore images explicitly tagged with data-no-zoom or images inside buttons/concierge/lightbox
      if (
        img.hasAttribute("data-no-zoom") ||
        img.closest("[data-no-zoom]") ||
        img.closest("#orka-ai-concierge-trigger") ||
        img.closest("[data-concierge]") ||
        img.closest("button") ||
        img.closest(".global-media-lightbox") ||
        img.closest(".no-lightbox-zoom") ||
        img.classList.contains("no-zoom")
      ) {
        return;
      }

      // Ignore small icon graphics < 32px or SVG badges
      const rect = img.getBoundingClientRect();
      if (rect.width < 36 && rect.height < 36) return;

      const src = img.getAttribute("src") || img.currentSrc;
      if (!src || src.startsWith("data:image/svg+xml")) return;

      // Find contextual title
      let title =
        img.getAttribute("data-zoom-title") ||
        img.getAttribute("title") ||
        img.getAttribute("alt") ||
        "";

      // If alt is generic or empty, look for parent card's heading
      if (!title || title.length < 2) {
        const parentCard = img.closest(".card, article, section, div, .portal-card, .destination-card, .room-card, .person-card, .activity-row");
        const heading = parentCard?.querySelector("h2, h3, h4, strong");
        if (heading && heading.textContent) {
          title = heading.textContent.trim();
        }
      }

      const description = img.getAttribute("data-zoom-desc") || "";

      openMedia({
        src,
        alt: img.alt || title || "Orka Lotus Beach Media",
        title: title || "Orka Lotus Beach Hotel",
        description,
      });
    };

    // Attach click listener with passive flag
    document.addEventListener("click", handleDocumentClickOrTouch, { capture: false });

    return () => {
      document.removeEventListener("click", handleDocumentClickOrTouch);
    };
  }, [openMedia]);

  return (
    <MediaZoomContext.Provider value={{ openMedia, closeMedia, activeMedia }}>
      {children}
      {activeMedia && (
        <GlobalMediaLightbox media={activeMedia} onClose={closeMedia} />
      )}
    </MediaZoomContext.Provider>
  );
}

function GlobalMediaLightbox({
  media,
  onClose,
}: {
  media: MediaItem;
  onClose: () => void;
}) {
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
    maxScale: 5.5,
    initialScale: 1.0,
    doubleTapScale: 2.3,
  });

  const tapStartRef = useRef<{ time: number; x: number; y: number }>({
    time: 0,
    x: 0,
    y: 0,
  });

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        reset();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, reset]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      reset();
      onClose();
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    // If not dragging, clicking image resets or closes
    if (!isZoomed) {
      reset();
      onClose();
    }
  };

  const zoomPercent = Math.round(scale * 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={media.title || media.alt || "Fullscreen Image Viewer"}
      onClick={handleBackdropClick}
      className="global-media-lightbox fixed inset-0 z-[10000] flex flex-col items-center justify-between p-3 sm:p-6 bg-black/92 backdrop-blur-xl transition-all duration-200 select-none overflow-hidden touch-none"
    >
      {/* Top Floating Control Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl flex items-center justify-between gap-3 py-2 px-3 sm:px-5 rounded-2xl bg-[#07131e]/85 border border-[#d4af37]/35 shadow-2xl backdrop-blur-md text-white z-50 animate-in fade-in slide-in-from-top-3 duration-200"
      >
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <Sparkles size={16} className="text-[#d4af37] flex-shrink-0" />
          <div className="min-w-0">
            <h3 className="font-serif text-sm sm:text-base font-medium text-[#f3e5ab] truncate">
              {media.title || media.alt || "Orka Lotus Beach"}
            </h3>
            {media.description && (
              <p className="text-[10px] sm:text-xs text-white/70 truncate hidden sm:block">
                {media.description}
              </p>
            )}
          </div>
        </div>

        {/* Zoom Controls & Close Action */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <div className="px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-mono font-bold text-[#f3e5ab]">
            {zoomPercent}%
          </div>

          <button
            type="button"
            onClick={zoomOut}
            aria-label="Zoom out"
            title="Zoom out"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/20 active:scale-95 text-white transition-all"
          >
            <ZoomOut size={15} />
          </button>

          <button
            type="button"
            onClick={zoomIn}
            aria-label="Zoom in"
            title="Zoom in"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/20 active:scale-95 text-white transition-all"
          >
            <ZoomIn size={15} />
          </button>

          {isZoomed && (
            <button
              type="button"
              onClick={reset}
              aria-label="Reset zoom to 100%"
              title="Reset zoom to 100%"
              className="px-2.5 h-8 rounded-full flex items-center gap-1 bg-[#d4af37]/20 hover:bg-[#d4af37]/35 border border-[#d4af37]/50 text-[#f3e5ab] text-[11px] font-bold uppercase tracking-wider transition-all"
            >
              <RotateCcw size={13} />
              <span className="hidden xs:inline">1x</span>
            </button>
          )}

          <div className="w-[1px] h-4 bg-white/20 mx-0.5" />

          <button
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
            aria-label="Close fullscreen image"
            title="Close (or click background)"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500/20 hover:bg-red-500/40 active:scale-95 text-red-200 border border-red-500/30 transition-all"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* Main Touch / Pinch Image Stage */}
      <div
        {...containerProps}
        className="w-full h-full flex items-center justify-center relative my-auto overflow-visible cursor-grab active:cursor-grabbing"
        onClick={handleBackdropClick}
      >
        <div style={contentStyle} className="relative flex items-center justify-center">
          <img
            src={media.src}
            alt={media.alt || "Fullscreen View"}
            onClick={handleImageClick}
            draggable={false}
            className="max-w-[92vw] max-h-[76vh] w-auto h-auto object-contain rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.95)] border border-[#d4af37]/35 select-none pointer-events-auto"
          />
        </div>
      </div>

      {/* Bottom Gesture Guidance Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/75 border border-white/15 text-[10px] sm:text-xs text-white/80 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200"
      >
        <Hand size={13} className="text-[#d4af37] animate-pulse" />
        <span>Pinch to zoom • Drag to pan • Tap image or backdrop to close</span>
      </div>
    </div>
  );
}

export default GlobalMediaZoomProvider;
