import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteSidebar from "@/components/SiteSidebar";
import SiteFooter from "@/components/SiteFooter";
import ShareModal from "@/components/ShareModal";
import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/data/content";

interface PageShellProps {
  children: React.ReactNode;
  currentLocale?: Locale;
  onLocaleChange?: (locale: Locale) => void;
}

export default function PageShell({
  children,
  currentLocale,
  onLocaleChange,
}: PageShellProps) {
  const [location] = useLocation();
  const { locale: contextLocale, setLocale: setContextLocale } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const activeLocale = currentLocale || contextLocale;

  const handleSelectLocale = (nextLocale: Locale) => {
    setContextLocale(nextLocale);
    if (onLocaleChange) {
      onLocaleChange(nextLocale);
    }
  };

  // Scroll to top whenever route location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="site-shell" dir="ltr">
      <SiteHeader
        locale={activeLocale}
        onSelectLocale={handleSelectLocale}
        onOpenMenu={() => setMenuOpen(true)}
        onOpenShareModal={() => setShareModalOpen(true)}
      />

      <SiteSidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        locale={activeLocale}
        onSelectLocale={handleSelectLocale}
        onOpenShareModal={() => {
          setMenuOpen(false);
          setShareModalOpen(true);
        }}
      />

      <main className="page-main-content">{children}</main>

      <SiteFooter
        locale={activeLocale}
        onSelectLocale={handleSelectLocale}
        onOpenShareModal={() => setShareModalOpen(true)}
      />

      <ShareModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        locale={activeLocale}
      />
    </div>
  );
}
