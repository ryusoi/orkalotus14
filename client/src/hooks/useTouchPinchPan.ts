import { useState, useRef, useCallback, useEffect } from "react";

export interface TouchPinchPanOptions {
  minScale?: number;
  maxScale?: number;
  initialScale?: number;
  doubleTapScale?: number;
  enableMouseDrag?: boolean;
  enableWheelZoom?: boolean;
  onClose?: () => void;
}

export interface TouchPinchPanResult {
  scale: number;
  pan: { x: number; y: number };
  isPinching: boolean;
  isPanning: boolean;
  isZoomed: boolean;
  reset: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  setZoom: (newScale: number) => void;
  toggleZoom: (clientX?: number, clientY?: number) => void;
  containerProps: {
    onTouchStart: (e: React.TouchEvent<HTMLElement>) => void;
    onTouchMove: (e: React.TouchEvent<HTMLElement>) => void;
    onTouchEnd: (e: React.TouchEvent<HTMLElement>) => void;
    onTouchCancel: (e: React.TouchEvent<HTMLElement>) => void;
    onMouseDown: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseUp: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
    onWheel: (e: React.WheelEvent<HTMLElement>) => void;
    onDoubleClick: (e: React.MouseEvent<HTMLElement>) => void;
    style: React.CSSProperties;
  };
  contentStyle: React.CSSProperties;
}

export function useTouchPinchPan({
  minScale = 0.75,
  maxScale = 5.0,
  initialScale = 1.0,
  doubleTapScale = 2.2,
  enableMouseDrag = true,
  enableWheelZoom = true,
}: TouchPinchPanOptions = {}): TouchPinchPanResult {
  const [scale, setScale] = useState(initialScale);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPinching, setIsPinching] = useState(false);
  const [isPanning, setIsPanning] = useState(false);

  // References to preserve state during gesture calculations
  const stateRef = useRef({
    scale: initialScale,
    pan: { x: 0, y: 0 },
    initialPinchDist: 0,
    initialPinchScale: initialScale,
    initialPinchCenter: { x: 0, y: 0 },
    initialPan: { x: 0, y: 0 },
    touchStartPos: { x: 0, y: 0 },
    isMouseDown: false,
    lastTapTime: 0,
    lastTapPos: { x: 0, y: 0 },
  });

  // Keep stateRef in sync with state
  useEffect(() => {
    stateRef.current.scale = scale;
    stateRef.current.pan = pan;
  }, [scale, pan]);

  // Reset to original dimensions
  const reset = useCallback(() => {
    setScale(1.0);
    setPan({ x: 0, y: 0 });
    stateRef.current.scale = 1.0;
    stateRef.current.pan = { x: 0, y: 0 };
    setIsPinching(false);
    setIsPanning(false);
  }, []);

  const zoomIn = useCallback(() => {
    setScale((prev) => {
      const next = Math.min(prev * 1.35, maxScale);
      stateRef.current.scale = next;
      return next;
    });
  }, [maxScale]);

  const zoomOut = useCallback(() => {
    setScale((prev) => {
      const next = Math.max(prev / 1.35, minScale);
      stateRef.current.scale = next;
      if (next <= 1.05) {
        setPan({ x: 0, y: 0 });
        stateRef.current.pan = { x: 0, y: 0 };
      }
      return next;
    });
  }, [minScale]);

  const setZoom = useCallback(
    (newScale: number) => {
      const clamped = Math.min(Math.max(newScale, minScale), maxScale);
      setScale(clamped);
      stateRef.current.scale = clamped;
      if (clamped <= 1.0) {
        setPan({ x: 0, y: 0 });
        stateRef.current.pan = { x: 0, y: 0 };
      }
    },
    [minScale, maxScale]
  );

  const toggleZoom = useCallback(
    (clientX?: number, clientY?: number) => {
      if (stateRef.current.scale > 1.15) {
        reset();
      } else {
        const targetScale = doubleTapScale;
        setScale(targetScale);
        stateRef.current.scale = targetScale;
        if (typeof clientX === "number" && typeof clientY === "number") {
          const viewportCenterX = window.innerWidth / 2;
          const viewportCenterY = window.innerHeight / 2;
          const offsetX = (viewportCenterX - clientX) * (targetScale - 1) * 0.5;
          const offsetY = (viewportCenterY - clientY) * (targetScale - 1) * 0.5;
          setPan({ x: offsetX, y: offsetY });
          stateRef.current.pan = { x: offsetX, y: offsetY };
        }
      }
    },
    [doubleTapScale, reset]
  );

  // Touch Handlers
  const onTouchStart = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      if (e.touches.length === 2) {
        // Two fingers -> Start Pinch
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        const midX = (t1.clientX + t2.clientX) / 2;
        const midY = (t1.clientY + t2.clientY) / 2;

        stateRef.current.initialPinchDist = dist;
        stateRef.current.initialPinchScale = stateRef.current.scale;
        stateRef.current.initialPinchCenter = { x: midX, y: midY };
        stateRef.current.initialPan = { ...stateRef.current.pan };
        setIsPinching(true);
      } else if (e.touches.length === 1) {
        // One finger -> Tap / Pan / Double-tap detection
        const t = e.touches[0];
        stateRef.current.touchStartPos = { x: t.clientX, y: t.clientY };
        stateRef.current.initialPan = { ...stateRef.current.pan };

        const now = Date.now();
        const timeDiff = now - stateRef.current.lastTapTime;
        const distFromLastTap = Math.hypot(
          t.clientX - stateRef.current.lastTapPos.x,
          t.clientY - stateRef.current.lastTapPos.y
        );

        if (timeDiff > 0 && timeDiff < 320 && distFromLastTap < 30) {
          // Double-tap detected
          toggleZoom(t.clientX, t.clientY);
          stateRef.current.lastTapTime = 0;
        } else {
          stateRef.current.lastTapTime = now;
          stateRef.current.lastTapPos = { x: t.clientX, y: t.clientY };
          setIsPanning(true);
        }
      }
    },
    [toggleZoom]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      if (e.touches.length === 2 && stateRef.current.initialPinchDist > 0) {
        // Two fingers Pinch Moving
        e.preventDefault?.();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        const scaleFactor = currentDist / stateRef.current.initialPinchDist;
        const targetScale = Math.min(
          Math.max(stateRef.current.initialPinchScale * scaleFactor, minScale),
          maxScale
        );

        const currentMidX = (t1.clientX + t2.clientX) / 2;
        const currentMidY = (t1.clientY + t2.clientY) / 2;
        const panDeltaX = currentMidX - stateRef.current.initialPinchCenter.x;
        const panDeltaY = currentMidY - stateRef.current.initialPinchCenter.y;

        setScale(targetScale);
        setPan({
          x: stateRef.current.initialPan.x + panDeltaX,
          y: stateRef.current.initialPan.y + panDeltaY,
        });
      } else if (e.touches.length === 1) {
        // One finger dragging/moving the panel
        const t = e.touches[0];
        const dx = t.clientX - stateRef.current.touchStartPos.x;
        const dy = t.clientY - stateRef.current.touchStartPos.y;

        // If dragged sufficiently or zoomed in, translate panel
        if (stateRef.current.scale > 1.05 || Math.hypot(dx, dy) > 8) {
          setPan({
            x: stateRef.current.initialPan.x + dx,
            y: stateRef.current.initialPan.y + dy,
          });
        }
      }
    },
    [minScale, maxScale]
  );

  const onTouchEnd = useCallback((e: React.TouchEvent<HTMLElement>) => {
    if (e.touches.length === 0) {
      setIsPinching(false);
      setIsPanning(false);

      // Smoothly snap back if scale fell below 1.0 or drifted too far
      if (stateRef.current.scale < 0.98) {
        setScale(1.0);
        setPan({ x: 0, y: 0 });
        stateRef.current.scale = 1.0;
        stateRef.current.pan = { x: 0, y: 0 };
      }
    } else if (e.touches.length === 1) {
      setIsPinching(false);
      const t = e.touches[0];
      stateRef.current.touchStartPos = { x: t.clientX, y: t.clientY };
      stateRef.current.initialPan = { ...stateRef.current.pan };
    }
  }, []);

  // Desktop Mouse Handlers
  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!enableMouseDrag || e.button !== 0) return;
      stateRef.current.isMouseDown = true;
      stateRef.current.touchStartPos = { x: e.clientX, y: e.clientY };
      stateRef.current.initialPan = { ...stateRef.current.pan };
      setIsPanning(true);
    },
    [enableMouseDrag]
  );

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!stateRef.current.isMouseDown) return;
    const dx = e.clientX - stateRef.current.touchStartPos.x;
    const dy = e.clientY - stateRef.current.touchStartPos.y;
    setPan({
      x: stateRef.current.initialPan.x + dx,
      y: stateRef.current.initialPan.y + dy,
    });
  }, []);

  const onMouseUp = useCallback(() => {
    stateRef.current.isMouseDown = false;
    setIsPanning(false);
  }, []);

  const onWheel = useCallback(
    (e: React.WheelEvent<HTMLElement>) => {
      if (!enableWheelZoom) return;
      // Allow wheel zoom with Ctrl/Meta key (pinch on trackpad) or normal wheel
      const isZoomGesture = e.ctrlKey || e.metaKey || Math.abs(e.deltaY) > 0;
      if (isZoomGesture) {
        e.preventDefault?.();
        const delta = -e.deltaY * 0.0025;
        setScale((prev) => {
          const next = Math.min(Math.max(prev + delta, minScale), maxScale);
          stateRef.current.scale = next;
          if (next <= 1.0) {
            setPan({ x: 0, y: 0 });
            stateRef.current.pan = { x: 0, y: 0 };
          }
          return next;
        });
      }
    },
    [enableWheelZoom, minScale, maxScale]
  );

  const onDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      toggleZoom(e.clientX, e.clientY);
    },
    [toggleZoom]
  );

  const isZoomed = scale > 1.05 || Math.abs(pan.x) > 5 || Math.abs(pan.y) > 5;

  const contentStyle: React.CSSProperties = {
    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`,
    transformOrigin: "center center",
    transition: isPinching || isPanning ? "none" : "transform 220ms cubic-bezier(0.16, 1, 0.3, 1)",
    touchAction: "none",
    userSelect: "none",
    WebkitUserSelect: "none",
    willChange: "transform",
  };

  const containerProps = {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel: onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave: onMouseUp,
    onWheel,
    onDoubleClick,
    style: {
      touchAction: "none" as const,
      cursor: isZoomed ? (isPanning ? "grabbing" : "grab") : "default",
    },
  };

  return {
    scale,
    pan,
    isPinching,
    isPanning,
    isZoomed,
    reset,
    zoomIn,
    zoomOut,
    setZoom,
    toggleZoom,
    containerProps,
    contentStyle,
  };
}
