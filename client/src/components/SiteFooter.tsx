import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Check,
  Copy,
  Instagram,
  Phone,
  QrCode,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import BrandLogo from "@/components/BrandLogo";
import LanguagePicker from "@/components/LanguagePicker";
import CursiveArtisticSignature from "@/components/CursiveArtisticSignature";
import {
  footerTranslations,
  QR_CODE_URL,
  WEBSITE_URL,
  WHATSAPP_SHARE_URL,
} from "@/data/navigation";
import { designerCredit, type Locale } from "@/data/content";

interface SiteFooterProps {
  locale: Locale;
  onSelectLocale: (locale: Locale) => void;
  onOpenShareModal: () => void;
}

export default function SiteFooter({
  locale,
  onSelectLocale,
  onOpenShareModal,
}: SiteFooterProps) {
  const [copied, setCopied] = useState(false);
  const oceanRef = useRef<HTMLDivElement>(null);

  const t = footerTranslations[locale] || footerTranslations.en;

  useEffect(() => {
    const ocean = oceanRef.current;
    if (!ocean) return;

    const buildWaves = () => {
      ocean.innerHTML = "";
      const waveWidth = 10;
      const width = ocean.clientWidth || window.innerWidth;
      const waveCount = Math.floor(width / waveWidth);
      const docFrag = document.createDocumentFragment();

      for (let i = 0; i < waveCount; i++) {
        const wave = document.createElement("div");
        wave.className = "wave";
        wave.style.left = i * waveWidth + "px";
        wave.style.webkitAnimationDelay = i / 100 + "s";
        wave.style.animationDelay = i / 100 + "s";
        docFrag.appendChild(wave);
      }

      ocean.appendChild(docFrag);
    };

    buildWaves();

    window.addEventListener("resize", buildWaves, { passive: true });
    return () => {
      window.removeEventListener("resize", buildWaves);
    };
  }, []);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(WEBSITE_URL);
      }
      setCopied(true);
      toast.success(t.linkCopied, {
        description: WEBSITE_URL,
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.info(WEBSITE_URL);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        {/* Brand & Introduction Column */}
        <div className="footer-brand flex flex-col items-center text-center">
          <Link href="/" className="footer-logo-link flex items-center justify-center w-full" aria-label="Orka Lotus Beach">
            <BrandLogo className="footer-brand-logo mx-auto" size="xl" />
          </Link>
          <p className="footer-tagline text-center max-w-[260px] mx-auto">
            {t.tagline}
          </p>
          <div className="footer-social flex justify-center items-center">
            <a
              href="https://www.instagram.com/orkahotels/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Orka Hotels on Instagram"
              className="social-icon-btn"
            >
              <Instagram size={17} />
            </a>
            <a
              href="mailto:info.orkalotus@orkahotels.com"
              aria-label="Email Guest Relations"
              className="social-icon-btn"
            >
              <Send size={17} />
            </a>
            <a
              href={WHATSAPP_SHARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="social-icon-btn whatsapp-btn"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 1: Resort & Accommodation */}
        <div className="footer-col">
          <span className="footer-label">{t.col1Label}</span>
          <div className="footer-links-list">
            <Link href="/" className="footer-nav-link">
              {t.home}
            </Link>
            <Link href="/rooms-services" className="footer-nav-link">
              {t.roomsServices}
            </Link>
            <Link href="/medical" className="footer-nav-link">
              {t.medical}
            </Link>
            <Link href="/hotel-directory" className="footer-nav-link">
              {t.hotelDirectory}
            </Link>
            <Link href="/pools-beach" className="footer-nav-link">
              {t.poolsBeach}
            </Link>
            <Link href="/watersports" className="footer-nav-link">
              {t.watersports}
            </Link>
            <Link href="/mini-club" className="footer-nav-link">
              {t.miniClub} <span className="footer-pill-tag">{t.kidsBadge}</span>
            </Link>
            <Link href="/shops" className="footer-nav-link">
              {t.shops}
            </Link>
          </div>
        </div>

        {/* Column 2: Dining, Wellness & Experience */}
        <div className="footer-col">
          <span className="footer-label">{t.col2Label}</span>
          <div className="footer-links-list">
            <Link href="/restaurants-bars" className="footer-nav-link">
              {t.restaurantsBars}
            </Link>
            <Link href="/activities-spa" className="footer-nav-link">
              {t.activitiesSpa}
            </Link>
            <Link href="/icon-beach" className="footer-nav-link">
              {t.iconBeach} <span className="footer-pill-tag">VIP</span>
            </Link>
            <Link href="/rank-your-lotus" className="footer-nav-link inline-flex items-center gap-1.5 group">
              <span className="text-[#fbbf24] drop-shadow-[0_0_8px_rgba(251,191,36,0.85)] group-hover:scale-110 transition-transform">⭐</span>
              <span>{t.rankYourLotus}</span>
            </Link>
            <Link href="/management-personnel" className="footer-nav-link">
              {t.managementPersonnel}
            </Link>
          </div>
        </div>

        {/* Column 3: The Lotus World & Contact */}
        <div className="footer-col">
          <span className="footer-label">{t.col3Label}</span>
          <div className="footer-links-list">
            <Link href="/marmaris" className="footer-nav-link">
              {t.marmaris}
            </Link>
            <Link href="/orka-homes" className="footer-nav-link">
              {t.orkaHomes}
            </Link>
            <Link href="/orka-legacy" className="footer-nav-link">
              {t.orkaLegacy}
            </Link>
            <Link href="/contact" className="footer-nav-link">
              {t.contact}
            </Link>
          </div>

          <div className="footer-contact-block mt-4">
            <a href="tel:4446752" className="footer-quick-phone">
              <Phone size={14} /> 444 6 752 / +90 252 455 50 55
            </a>
            <p className="footer-address">
              {t.address}
            </p>
          </div>
        </div>

        {/* Column 4: QR Code & Easy Share Card */}
        <div className="footer-col footer-qr-col">
          <div className="footer-qr-card">
            <span className="footer-share-gold-title">SHARE ORKA</span>
            <a
              href={WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-qr-img-btn group"
              title="orkalotusbeach.vercel.app"
              aria-label="Direct Link to orkalotusbeach.vercel.app"
            >
              <img
                src={QR_CODE_URL}
                alt="QR Code for orkalotusbeach.vercel.app"
                className="footer-qr-image"
                loading="lazy"
              />
              <span className="footer-qr-badge">
                <QrCode size={11} /> orkalotusbeach.vercel.app
              </span>
            </a>

            <div className="footer-share-buttons">
              <a
                href={WHATSAPP_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-share-action whatsapp"
                aria-label={t.whatsappShare}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>{t.whatsappShare}</span>
              </a>

              <button
                onClick={handleCopy}
                className="footer-share-action copy"
                type="button"
                aria-label={t.directShareLink}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? t.linkCopied : t.directShareLink}</span>
              </button>
            </div>

            <div className="footer-lang-wrap">
              <LanguagePicker
                locale={locale}
                onSelect={onSelectLocale}
                placement="footer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Artistic Cursive Dynamic Flash Animation on Loop - Centered in One Line */}
      <div className="footer-signature-centered-bar" aria-label="Orka Lotus Beach Signature">
        <CursiveArtisticSignature text="Orka Lotus Beach" />
      </div>

      {/* Dynamic Animated Hotel Flash Loader */}
      <div className="hotel-loader-wrapper" aria-hidden="true">
        <div className="hotel-loader">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="window" />
          ))}
          <div className="door" />
          <div className="hotel-sign">
            <span>H</span>
            <span>O</span>
            <span>T</span>
            <span>E</span>
            <span>L</span>
          </div>
        </div>
      </div>

      {/* Dynamic Animated Ocean Waves */}
      <div id="ocean" ref={oceanRef} aria-hidden="true" />

      {/* Bottom Bar */}
      <div className="container footer-bottom">
        <span>© 2026 ORKA LOTUS BEACH · MARMARIS</span>
        <span>
          <a
            href={WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            orkalotusbeach.vercel.app
          </a>
        </span>
        <span>{t.bottomTagline}</span>
        <span className="footer-designer-credit font-medium text-[#e4bd77] opacity-95 tracking-wide">
          {designerCredit[locale] || designerCredit.en}
        </span>
      </div>
    </footer>
  );
}
