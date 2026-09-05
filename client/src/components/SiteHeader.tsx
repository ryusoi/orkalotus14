import { Link, useLocation } from "wouter";
import { Menu, QrCode } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import LanguagePicker from "@/components/LanguagePicker";
import ThemeButton from "@/components/ThemeButton";
import { headerTranslations } from "@/data/navigation";
import type { Locale } from "@/data/content";

interface SiteHeaderProps {
  locale: Locale;
  onSelectLocale: (locale: Locale) => void;
  onOpenMenu: () => void;
  onOpenShareModal: () => void;
}

export default function SiteHeader({
  locale,
  onSelectLocale,
  onOpenMenu,
  onOpenShareModal,
}: SiteHeaderProps) {
  const [location] = useLocation();
  const t = headerTranslations[locale] || headerTranslations.en;

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand-lockup" aria-label="Orka Lotus Beach Home">
          <BrandLogo className="header-brand-logo" size="md" />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link
            href="/"
            className={`nav-link ${location === "/" ? "nav-link-active" : ""}`}
          >
            {t.home}
          </Link>
          <Link
            href="/activities-spa"
            className={`nav-link ${
              location === "/activities-spa" ? "nav-link-active" : ""
            }`}
          >
            {t.activitiesSpa}
          </Link>
          <Link
            href="/pools-beach"
            className={`nav-link ${
              location === "/pools-beach" ? "nav-link-active" : ""
            }`}
          >
            {t.poolsBeach}
          </Link>
          <Link
            href="/mini-club"
            className={`nav-link ${
              location === "/mini-club" ? "nav-link-active" : ""
            }`}
          >
            {t.miniClub}
          </Link>
          <Link
            href="/restaurants-bars"
            className={`nav-link ${
              location === "/restaurants-bars" ? "nav-link-active" : ""
            }`}
          >
            {t.dining}
          </Link>
          <Link
            href="/rooms-services"
            className={`nav-link ${
              location === "/rooms-services" ? "nav-link-active" : ""
            }`}
          >
            {t.rooms}
          </Link>
          <Link
            href="/hotel-directory"
            className={`nav-link ${
              location === "/hotel-directory" ? "nav-link-active" : ""
            }`}
          >
            {t.directory}
          </Link>
          <Link
            href="/icon-beach"
            className={`nav-link ${
              location === "/icon-beach" ? "nav-link-active" : ""
            }`}
          >
            {t.iconBeach}
          </Link>
        </nav>

        <div className="header-actions">
          <button
            onClick={onOpenShareModal}
            className="icon-button header-qr-btn hidden sm:inline-flex"
            title={t.qrShareTitle}
            aria-label={t.qrShareTitle}
            type="button"
          >
            <QrCode size={18} />
          </button>

          <LanguagePicker
            locale={locale}
            onSelect={onSelectLocale}
            placement="header"
          />

          <ThemeButton />

          <button
            className="menu-button"
            onClick={onOpenMenu}
            aria-label={t.openMenu}
            type="button"
          >
            <Menu size={21} />
          </button>
        </div>
      </div>
    </header>
  );
}
