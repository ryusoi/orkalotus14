import { useState } from "react";
import { toast } from "sonner";
import {
  Check,
  Copy,
  ExternalLink,
  QrCode,
  Share2,
  X,
} from "lucide-react";
import {
  shareModalTranslations,
  QR_CODE_URL,
  WEBSITE_URL,
  WHATSAPP_SHARE_URL,
} from "@/data/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/data/content";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  locale?: Locale;
}

export default function ShareModal({ open, onClose, locale: propLocale }: ShareModalProps) {
  const { locale: contextLocale } = useLocale();
  const activeLocale = propLocale || contextLocale || "en";
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const t = shareModalTranslations[activeLocale] || shareModalTranslations.en;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(WEBSITE_URL);
      }
      setCopied(true);
      toast.success(t.copiedToast, {
        description: WEBSITE_URL,
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.info(WEBSITE_URL);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Orka Lotus Beach Hotel",
          text: "Experience luxury, nature and the Aegean at Orka Lotus Beach.",
          url: WEBSITE_URL,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="share-modal-backdrop" onClick={onClose}>
      <div
        className="share-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
      >
        <div className="share-modal-header">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
              <QrCode size={20} />
            </span>
            <div>
              <h3 className="text-lg font-serif font-medium tracking-wide">
                {t.title}
              </h3>
              <p className="text-xs text-[var(--ink-soft)]">
                {t.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="icon-button"
            aria-label={t.closeDialog}
          >
            <X size={18} />
          </button>
        </div>

        <div className="share-modal-qr-container">
          <div className="qr-image-wrapper">
            <img
              src={QR_CODE_URL}
              alt="QR Code for Orka Lotus Beach website"
              className="qr-code-img"
              loading="eager"
            />
          </div>
          <p className="qr-caption">
            {t.caption} <strong>orkalotusbeach.vercel.app</strong>
          </p>
        </div>

        <div className="share-modal-actions">
          <a
            href={WHATSAPP_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="share-button whatsapp-share-btn"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              stroke="currentColor"
              strokeWidth="2"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="whatsapp-icon"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>{t.shareWhatsApp}</span>
          </a>

          <button
            onClick={handleCopy}
            className="share-button copy-link-btn"
            type="button"
          >
            {copied ? <Check size={18} className="text-emerald-600" /> : <Copy size={18} />}
            <span>{copied ? t.linkCopied : t.copyDirectLink}</span>
          </button>

          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              onClick={handleNativeShare}
              className="share-button native-share-btn"
              type="button"
            >
              <Share2 size={18} />
              <span>{t.shareOtherApps}</span>
            </button>
          )}
        </div>

        <div className="share-url-pill">
          <span className="truncate">{WEBSITE_URL}</span>
          <a
            href={WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:underline flex items-center gap-1"
          >
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
