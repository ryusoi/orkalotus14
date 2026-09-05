import React, { useEffect } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw, Hand, Sparkles } from "lucide-react";
import { useTouchPinchPan } from "@/hooks/useTouchPinchPan";

export interface ZoomableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  backdropClassName?: string;
  showControls?: boolean;
  showHints?: boolean;
  maxWidth?: string;
  minScale?: number;
  maxScale?: number;
}

export function ZoomableModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className = "",
  backdropClassName = "",
  showControls = true,
  showHints = true,
  maxWidth = "max-w-xl",
  minScale = 0.75,
  maxScale = 4.5,
}: ZoomableModalProps) {
  const {
    scale,
    isZoomed,
    reset,
    zoomIn,
    zoomOut,
    containerProps,
    contentStyle,
  } = useTouchPinchPan({
    minScale,
    maxScale,
    initialScale: 1.0,
    doubleTapScale: 2.2,
  });

  // Lock body scroll when open and listen for Escape key
  useEffect(() => {
    if (!isOpen) {
      reset();
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        reset();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, reset]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    // If user clicked the backdrop outside the active panel or requested to close
    if (e.target === e.currentTarget) {
      reset();
      onClose();
    }
  };

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    reset();
    onClose();
  };

  const zoomPercent = Math.round(scale * 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-200 select-none overflow-hidden touch-none ${backdropClassName}`}
    >
      {/* Floating HUD Controls Bar (Top Center) */}
      {showControls && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed top-3 sm:top-5 z-[10000] flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-[#0a1926]/90 border border-[#d4af37]/40 shadow-2xl backdrop-blur-lg text-white animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 text-[11px] sm:text-xs font-mono font-semibold text-[#f3e5ab]">
            <span>{zoomPercent}%</span>
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
            onClick={handleClose}
            aria-label="Close popup"
            title="Close popup"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500/20 hover:bg-red-500/40 active:scale-95 text-red-200 border border-red-500/30 transition-all"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Touch & Pinch Stage */}
      <div
        {...containerProps}
        className="w-full h-full flex items-center justify-center pointer-events-auto"
        onClick={handleBackdropClick}
      >
        <div
          style={contentStyle}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full ${maxWidth} max-h-[88vh] overflow-y-auto rounded-3xl bg-[var(--paper)] text-[var(--ink)] shadow-[0_25px_70px_rgba(0,0,0,0.65)] border border-[var(--line)] will-change-transform cursor-grab active:cursor-grabbing ${className}`}
        >
          {/* Header Bar */}
          {(title || subtitle) && (
            <div className="p-4 sm:p-6 border-b border-[var(--line)] bg-[var(--shell)]/80 flex items-start justify-between gap-4 sticky top-0 z-20 backdrop-blur-sm rounded-t-3xl">
              <div>
                {subtitle && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--tide)] block mb-1">
                    {subtitle}
                  </span>
                )}
                {typeof title === "string" ? (
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--ink)] leading-tight">
                    {title}
                  </h2>
                ) : (
                  title
                )}
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                className="p-2 rounded-full bg-[var(--paper)] border border-[var(--line)] hover:bg-[var(--tide-soft)] text-[var(--ink)] hover:text-[var(--tide)] transition-colors flex-shrink-0"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Body Content */}
          <div className="p-4 sm:p-6">{children}</div>
        </div>
      </div>

      {/* Bottom Gesture Hints Pill (Mobile / Touch friendly) */}
      {showHints && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-3 sm:bottom-5 z-[10000] pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 border border-white/15 text-[10px] sm:text-xs text-white/80 backdrop-blur-md shadow-lg"
        >
          <Hand size={13} className="text-[#d4af37] animate-pulse" />
          <span>Pinch to zoom • 1 finger to pan • Tap backdrop to close</span>
        </div>
      )}
    </div>
  );
}

export default ZoomableModal;
