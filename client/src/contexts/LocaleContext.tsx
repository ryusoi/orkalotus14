import React, { createContext, useContext, useEffect, useState } from "react";
import type { Locale } from "@/data/content";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const STORAGE_KEY = "orka_lotus_locale";
const VALID_LOCALES: Locale[] = ["en", "tr", "ru", "de"];

export function LocaleProvider({
  children,
  defaultLocale = "en",
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && VALID_LOCALES.includes(stored)) {
        return stored;
      }
    } catch {
      // localStorage not accessible
    }
    return defaultLocale;
  });

  const setLocale = (nextLocale: Locale) => {
    if (!VALID_LOCALES.includes(nextLocale)) return;
    setLocaleState(nextLocale);
    try {
      localStorage.setItem(STORAGE_KEY, nextLocale);
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    try {
      document.documentElement.lang = locale;
    } catch {
      // ignore
    }
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
