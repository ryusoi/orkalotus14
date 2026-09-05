import React from "react";

export const BRAND_LOGO_REMOTE_URL =
  "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LOGO/orka%20only%20inside%20logo.png";
export const BRAND_LOGO_URL = "/images/orka-logo-inside.png";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function BrandLogo({ className = "", size }: BrandLogoProps) {
  const sizeClass = size ? `brand-logo-${size}` : "";

  return (
    <span
      className={`brand-logo-scan ${sizeClass} ${className}`}
      style={{ "--brand-logo-mask": `url("${BRAND_LOGO_URL}")` } as React.CSSProperties}
    >
      <img
        className="brand-logo-image"
        src={BRAND_LOGO_URL}
        onError={(e) => {
          if ((e.currentTarget as HTMLImageElement).src !== BRAND_LOGO_REMOTE_URL) {
            (e.currentTarget as HTMLImageElement).src = BRAND_LOGO_REMOTE_URL;
          }
        }}
        alt="Orka Lotus Beach"
      />
      <span className="brand-logo-shine-layer" aria-hidden="true" />
    </span>
  );
}

export default BrandLogo;
