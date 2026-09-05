import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { locales, type Locale } from "@/data/content";

interface LanguagePickerProps {
  locale: Locale;
  onSelect: (locale: Locale) => void;
  placement?: "header" | "sidebar" | "footer";
  open?: boolean;
  onToggle?: () => void;
}

export function FlagIcon({
  code,
  className = "w-5 h-3.5",
}: {
  code: Locale;
  className?: string;
}) {
  if (code === "en") {
    // United Kingdom (Union Jack)
    return (
      <svg
        viewBox="0 0 60 40"
        className={`${className} rounded-[3px] shadow-sm overflow-hidden shrink-0 border border-black/15 dark:border-white/20`}
        aria-hidden="true"
      >
        <rect width="60" height="40" fill="#012169" />
        <path d="M0 0L60 40M60 0L0 40" stroke="#FFFFFF" strokeWidth="8" />
        <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4.5" />
        <path d="M30 0V40M0 20H60" stroke="#FFFFFF" strokeWidth="13" />
        <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="8" />
      </svg>
    );
  }

  if (code === "tr") {
    // Türkiye
    return (
      <svg
        viewBox="0 0 60 40"
        className={`${className} rounded-[3px] shadow-sm overflow-hidden shrink-0 border border-black/15 dark:border-white/20`}
        aria-hidden="true"
      >
        <rect width="60" height="40" fill="#E30A17" />
        <circle cx="23" cy="20" r="10.5" fill="#FFFFFF" />
        <circle cx="26" cy="20" r="8.4" fill="#E30A17" />
        <polygon
          points="33,20 39,21.9 34.8,17.1 34.8,22.9 39,18.1"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (code === "ru") {
    // Russia (White, Blue, Red)
    return (
      <svg
        viewBox="0 0 60 40"
        className={`${className} rounded-[3px] shadow-sm overflow-hidden shrink-0 border border-black/15 dark:border-white/20`}
        aria-hidden="true"
      >
        <rect width="60" height="13.33" fill="#FFFFFF" />
        <rect y="13.33" width="60" height="13.34" fill="#0039A6" />
        <rect y="26.67" width="60" height="13.33" fill="#D52B1E" />
      </svg>
    );
  }

  if (code === "de") {
    // Germany (Black, Red, Gold)
    return (
      <svg
        viewBox="0 0 60 40"
        className={`${className} rounded-[3px] shadow-sm overflow-hidden shrink-0 border border-black/15 dark:border-white/20`}
        aria-hidden="true"
      >
        <rect width="60" height="13.33" fill="#1C1C1C" />
        <rect y="13.33" width="60" height="13.34" fill="#DD0000" />
        <rect y="26.67" width="60" height="13.33" fill="#FFCE00" />
      </svg>
    );
  }

  return null;
}

export default function LanguagePicker({
  locale,
  onSelect,
  placement = "header",
}: LanguagePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (code: Locale, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onSelect(code);
    setIsOpen(false);
  };

  // Close when clicking or touching outside
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const currentLocaleItem =
    locales.find((item) => item.code === locale) || locales[0];

  const isDropdownUpwards = placement === "footer" || placement === "sidebar";

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${
        placement === "sidebar" || placement === "footer"
          ? "w-full max-w-[240px] sm:max-w-none"
          : ""
      }`}
      id={`language-picker-wrap-${placement}`}
    >
      {/* Single Flag Toggle Button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Current language: ${currentLocaleItem.label}. Click or tap to change.`}
        title={`Language: ${currentLocaleItem.native} (${currentLocaleItem.label})`}
        className={`group inline-flex items-center justify-between gap-1.5 transition-all duration-200 cursor-pointer select-none active:scale-95 ${
          placement === "header"
            ? "h-[36px] sm:h-[38px] px-2 sm:px-2.5 rounded-full bg-[var(--paper)]/90 dark:bg-black/40 border border-[var(--line)] hover:border-[#dfba73]/80 hover:bg-[var(--tide-soft)] shadow-sm hover:shadow"
            : "w-full min-h-[40px] px-3 py-2 rounded-xl bg-[var(--paper)]/90 dark:bg-black/30 border border-[var(--line)] hover:border-[#dfba73]/80 hover:bg-[var(--tide-soft)] shadow-sm"
        } ${isOpen ? "border-[#dfba73] ring-1.5 ring-[#dfba73]/40 bg-[var(--tide-soft)]" : ""}`}
      >
        <div className="flex items-center gap-2">
          <FlagIcon
            code={currentLocaleItem.code}
            className={
              placement === "header"
                ? "w-5 h-3.5 sm:w-[22px] sm:h-[15px]"
                : "w-5 h-3.5"
            }
          />
          {placement !== "header" && (
            <span className="text-xs font-semibold text-[var(--ink)] tracking-wide">
              {currentLocaleItem.native}
            </span>
          )}
        </div>
        <ChevronDown
          size={13}
          className={`text-[var(--ink-soft)] group-hover:text-[#dfba73] transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-[#dfba73]" : ""
          }`}
        />
      </button>

      {/* Floating Flag Selection Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Select website language"
          className={`absolute z-50 py-1.5 rounded-2xl bg-[var(--paper)] dark:bg-[#071926] border border-[#dfba73]/40 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 ${
            placement === "header"
              ? "top-full right-0 mt-2 w-[175px]"
              : isDropdownUpwards
              ? "bottom-full left-0 mb-2 w-full min-w-[180px]"
              : "top-full left-0 mt-2 w-full min-w-[180px]"
          }`}
        >
          <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-[#dfba73] border-b border-[var(--line)]/60 mb-1 flex items-center justify-between">
            <span>Language</span>
            <span className="text-[9px] font-mono text-[var(--ink-soft)] font-normal">
              4 available
            </span>
          </div>

          <div className="flex flex-col gap-0.5 px-1">
            {locales.map((item) => {
              const isSelected = item.code === locale;
              return (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={(e) => handleSelect(item.code, e)}
                  className={`w-full flex items-center justify-between gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-[#dfba73]/15 text-[var(--ink)] font-bold shadow-sm"
                      : "text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--tide-soft)] active:scale-[0.98]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FlagIcon
                      code={item.code}
                      className="w-5 h-3.5 shrink-0"
                    />
                    <span className="text-xs truncate">{item.native}</span>
                  </div>

                  {isSelected ? (
                    <Check size={14} className="text-[#dfba73] shrink-0" />
                  ) : (
                    <span className="text-[10px] text-[var(--ink-soft)]/60 uppercase font-mono shrink-0">
                      {item.code}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
