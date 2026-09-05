import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  X,
  ExternalLink,
  Eye,
  Info,
  Sparkles,
  Download,
} from "lucide-react";
import type { Locale } from "@/data/content";

interface InteractiveFactSheetViewerProps {
  imageUrl: string;
  title: Record<Locale, string>;
  subtitle?: Record<Locale, string>;
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export default function InteractiveFactSheetViewer({
  imageUrl,
  title,
  subtitle,
  isOpen,
  onClose,
  locale,
}: InteractiveFactSheetViewerProps) {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fallbackUrl = "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/SEA-2_1200x800-800x533.jpg";

  // Reset zoom & pan when opening
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setImgError(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.35, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.35, 0.6);
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
      setScale((prev) => Math.min(prev + 0.2, 4));
    } else {
      setScale((prev) => {
        const next = Math.max(prev - 0.2, 0.6);
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
      setScale(2);
    }
  };

  // Touch pinch-to-zoom support
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
      const nextScale = Math.min(Math.max(touchStartRef.current.startScale * ratio, 0.7), 4);
      setScale(nextScale);
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

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  const getTxt = (obj?: Record<Locale, string>) => (obj ? obj[locale] || obj.en : "");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-6 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl h-[92vh] flex flex-col bg-[#0d1e2b] border border-[rgba(200,159,87,0.4)] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gradient-to-r from-[#0a1824] via-[#0f2436] to-[#0a1824] border-b border-[rgba(200,159,87,0.3)] text-white">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded bg-[var(--gold)]/20 text-[var(--gold)]">
              <Sparkles size={16} />
            </span>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold tracking-wide text-[#ecc98a]">
                {getTxt(title)}
              </h3>
              {subtitle && (
                <p className="text-[11px] text-white/70 tracking-wider">
                  {getTxt(subtitle)}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex text-[11px] text-[var(--gold)] bg-[var(--gold)]/10 px-2.5 py-1 rounded-full border border-[var(--gold)]/30 font-medium">
              🔍 Scroll / Pinch / Double-click to zoom
            </span>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-red-500/80 text-white transition-colors"
              title="Close Viewer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Interactive Canvas / Image Viewer */}
        <div
          className={`relative flex-1 overflow-hidden flex items-center justify-center bg-[#07131d] ${
            scale > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
          }`}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="transition-transform duration-75 origin-center will-change-transform flex items-center justify-center p-4 max-w-full max-h-full"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            }}
          >
            <img
              src={imgError ? fallbackUrl : imageUrl}
              alt={getTxt(title)}
              className="max-h-[76vh] max-w-full object-contain rounded-lg border border-[rgba(200,159,87,0.3)] shadow-2xl pointer-events-none"
              onError={() => {
                if (!imgError) setImgError(true);
              }}
              draggable={false}
            />
          </div>

          {/* Quick Floating Zoom / Pan Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-[#0a1824]/90 backdrop-blur-md rounded-full border border-[rgba(200,159,87,0.4)] shadow-xl z-20">
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
              title="Zoom Out (-)"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-xs font-mono text-[var(--gold)] px-2 font-bold min-w-[45px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
              title="Zoom In (+)"
            >
              <ZoomIn size={16} />
            </button>
            <span className="w-px h-4 bg-white/20 mx-1" />
            <button
              onClick={handleReset}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw size={15} />
            </button>
            <a
              href={imageUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-full hover:bg-white/20 text-[var(--gold)] transition-colors"
              title="Open Full Resolution"
            >
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Bottom Information Footer */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#091520] border-t border-[rgba(200,159,87,0.25)] flex flex-wrap items-center justify-between gap-3 text-xs text-white/70">
          <div className="flex items-center gap-2">
            <Info size={14} className="text-[var(--gold)]" />
            <span>
              Official Orka Lotus Beach Fact Sheet Specification Document
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/50">
              Drag to pan when zoomed · Double-click to toggle 200%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
