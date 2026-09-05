import React, { useEffect, useRef, useState } from "react";

interface SmoothLazySectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

/**
 * High-performance smooth lazy-loading wrapper for sections.
 * Automatically reveals sections with a silky hardware-accelerated transition
 * when approaching the viewport, eliminating mobile scroll hitches.
 */
export default function SmoothLazySection({
  children,
  className = "",
  id,
  delay = 0,
  threshold = 0.01,
  rootMargin = "350px 0px 350px 0px",
}: SmoothLazySectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // If already in or above viewport on initial mount, reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight + 250) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`smooth-lazy-section ${isVisible ? "is-visible" : "is-hidden"} ${className}`}
      style={{
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
