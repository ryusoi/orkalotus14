import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowDownRight,
  Check,
  Copy,
  ExternalLink,
  Phone,
  QrCode,
  Send,
  X,
} from "lucide-react";
import { toast } from "sonner";
import BrandLogo from "@/components/BrandLogo";
import LanguagePicker from "@/components/LanguagePicker";
import {
  getNavItems,
  sidebarTranslations,
  QR_CODE_URL,
  WEBSITE_URL,
  WHATSAPP_SHARE_URL,
} from "@/data/navigation";
import { designerCredit, type Locale } from "@/data/content";

interface SiteSidebarProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  onSelectLocale: (locale: Locale) => void;
  onOpenShareModal: () => void;
}

export default function SiteSidebar({
  open,
  onClose,
  locale,
  onSelectLocale,
  onOpenShareModal,
}: SiteSidebarProps) {
  const [location] = useLocation();
  const [copied, setCopied] = useState(false);

  const t = sidebarTranslations[locale] || sidebarTranslations.en;
  const navItems = getNavItems(locale);

  // Lock background body scroll when sidebar drawer is active so only sidebar scrolls
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(WEBSITE_URL);
      }
      setCopied(true);
      toast.success(t.linkCopiedDesc, {
        description: WEBSITE_URL,
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.info(WEBSITE_URL);
    }
  };

  return (
    <div
      className={`menu-backdrop ${open ? "is-open" : ""}`}
      onClick={onClose}
      aria-hidden={!open}
    >
      <aside
        className={`side-menu ${open ? "is-open" : ""}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t.menuDialogAria}
        tabIndex={open ? 0 : -1}
      >
        <div className="side-menu-top">
          <Link href="/" onClick={onClose} className="sidebar-logo-link">
            <BrandLogo className="sidebar-brand-logo" size="md" />
          </Link>
          <button
            className="icon-button sidebar-close-btn"
            onClick={onClose}
            aria-label={t.closeMenuAria}
            type="button"
          >
            <X size={19} />
          </button>
        </div>

        <p className="side-menu-intro">{t.intro}</p>

        {/* All requested 17 pages translated in the sidebar */}
        <nav className="side-menu-links" aria-label={t.navAria}>
          {navItems.map((item, index) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={`side-menu-nav-item ${isActive ? "active" : ""}`}
              >
                <div className="side-menu-nav-label-wrap">
                  <span className="side-nav-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="side-nav-title">{item.label}</span>
                  {item.badge && (
                    <span className="side-nav-badge">{item.badge}</span>
                  )}
                </div>
                <ArrowDownRight size={17} className="side-nav-arrow" />
              </Link>
            );
          })}
        </nav>

        {/* Share & QR Code Section in Sidebar */}
        <div className="sidebar-share-card">
          <div className="sidebar-share-header">
            <div className="flex items-center gap-2">
              <QrCode size={16} className="text-[var(--gold)]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink)]">
                {t.websiteQr}
              </span>
            </div>
            <button
              onClick={onOpenShareModal}
              className="text-[11px] uppercase tracking-wider text-[var(--primary)] font-medium hover:underline flex items-center gap-0.5"
              type="button"
            >
              {t.enlarge} <ExternalLink size={10} />
            </button>
          </div>

          <div className="sidebar-qr-row">
            <button
              onClick={onOpenShareModal}
              className="sidebar-qr-thumb-wrap"
              title="Click to enlarge QR code"
              type="button"
            >
              <img
                src={QR_CODE_URL}
                alt="Orka Lotus Beach QR Code"
                className="sidebar-qr-thumb"
              />
            </button>
            <div className="sidebar-share-btns">
              <a
                href={WHATSAPP_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-share-btn whatsapp"
                aria-label="Share website via WhatsApp"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="inline-block"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>{t.whatsapp}</span>
              </a>
              <button
                onClick={handleCopyLink}
                className="sidebar-share-btn copy"
                type="button"
                aria-label="Copy website link"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? t.copied : t.copyLink}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="side-menu-footer">
          <LanguagePicker
            locale={locale}
            onSelect={onSelectLocale}
            placement="sidebar"
          />
          <p className="contact-helper">{t.needAssistance}</p>
          <a href="tel:4446752" className="sidebar-contact-link">
            <Phone size={15} /> {t.dialReception}
          </a>
          <a
            href="mailto:info.orkalotus@orkahotels.com"
            className="sidebar-contact-link"
          >
            <Send size={15} /> info.orkalotus@orkahotels.com
          </a>
          <div className="sidebar-designer-credit pt-3 mt-2 border-t border-[var(--line)] text-center">
            <span className="text-[11px] tracking-wide text-[#e4bd77] font-medium block">
              {designerCredit[locale] || designerCredit.en}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
