import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowDown,
  ArrowRight,
  Award,
  Camera,
  Check,
  ChevronRight,
  Clock,
  Crown,
  ExternalLink,
  Gem,
  Gift,
  Heart,
  Instagram,
  Luggage,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
  PhoneCall,
  QrCode,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  Video,
  X,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { useLocale } from "@/contexts/LocaleContext";
import { SHOPS_DATA, SHOPS_ASSETS, type ShopDetail } from "@/data/shopsData";

export default function ShopsPage() {
  const { locale, setLocale } = useLocale();
  const content = SHOPS_DATA[locale] || SHOPS_DATA.en;

  // Active section for sticky quick bar
  const [activeSection, setActiveSection] = useState<string>("aksoy-jewelry");

  // Fullscreen Lightbox Modal State
  const [fullscreenImage, setFullscreenImage] = useState<{
    src: string;
    alt: string;
    title?: string;
  } | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFullscreenImage(null);
      }
    };
    if (fullscreenImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [fullscreenImage]);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Intersection observer to track active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const shop of content.shops) {
        const el = document.getElementById(shop.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(shop.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [content.shops]);

  // Icon helper based on shop id
  const getShopIcon = (id: string) => {
    switch (id) {
      case "aksoy-jewelry":
        return <Gem size={18} className="text-[#d4af37]" />;
      case "elite-photoshoot":
        return <Camera size={18} className="text-[#d4af37]" />;
      case "nora-salon":
        return <Scissors size={18} className="text-[#d4af37]" />;
      case "azur-shop":
        return <Luggage size={18} className="text-[#d4af37]" />;
      case "azur-gift-boutique":
        return <Gift size={18} className="text-[#d4af37]" />;
      case "istanbul-textile":
        return <ShoppingBag size={18} className="text-[#d4af37]" />;
      case "supermarket":
        return <Store size={18} className="text-[#d4af37]" />;
      default:
        return <Sparkles size={18} className="text-[#d4af37]" />;
    }
  };

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      {/* ==================================================================== */}
      {/* 1. HERO BANNER                                                      */}
      {/* ==================================================================== */}
      <section className="bg-gradient-to-b from-[#020912] via-[#061726] to-[#020912] text-white py-12 md:py-16 border-b border-[#d4af37]/30 relative">
        <div className="container max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] mb-5 font-semibold">
            <Link href="/" className="hover:text-[#f3e5ab] transition-colors">
              {content.breadcrumbHome}
            </Link>
            <ChevronRight size={12} className="text-[#d4af37]/60" />
            <span className="text-white">{content.breadcrumbShops}</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f3e5ab] bg-[#0b243d] border border-[#d4af37]/50 px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <Sparkles size={14} className="text-[#d4af37]" /> {content.heroEyebrow}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
              {content.heroTitle}
            </h1>

            <p className="font-serif italic text-base sm:text-lg text-[#d4af37]">
              {content.heroSubtitle}
            </p>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light pt-1">
              {content.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. VISUAL ALL-SHOPS SHOWCASE DIRECTORY (AT-A-GLANCE JUMP GRID)      */}
      {/* ==================================================================== */}
      <section className="bg-[#040f1a] text-white py-10 md:py-14 border-b border-[#d4af37]/30 relative">
        <div className="container max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#d4af37] bg-[#0b243d] border border-[#d4af37]/40 px-3 py-1 rounded-full mb-2">
                <Store size={13} /> {content.quickNavBadge}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-wide">
                {content.quickNavTitle}
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-2xl font-light">
                {content.quickNavSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#f3e5ab] bg-[#07192a] border border-[#d4af37]/40 px-3.5 py-1.5 rounded-xl shrink-0 self-start md:self-auto">
              <Sparkles size={14} className="text-[#d4af37]" />
              <span className="font-medium">{content.viewAllLabel}</span>
            </div>
          </div>

          {/* All 7 Shops Images One-by-One in Visual Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {content.shops.map((shop, index) => (
              <div
                key={shop.id}
                onClick={() => scrollToSection(shop.id)}
                className={`group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-b from-[#0b243d]/90 via-[#07192a] to-[#040f1a] border transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between ${
                  activeSection === shop.id
                    ? "border-[#f3e5ab] shadow-[0_0_25px_rgba(212,175,55,0.45)] ring-1 ring-[#d4af37]"
                    : "border-[#d4af37]/40 hover:border-[#d4af37] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                }`}
              >
                {/* Shop Image with Number Badge & Category */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Number Badge */}
                  <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-black/80 border border-[#d4af37] flex items-center justify-center text-[#f3e5ab] text-[11px] font-bold shadow">
                    #{index + 1}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#d4af37]/60 text-[10px] uppercase font-semibold text-[#f3e5ab] flex items-center gap-1.5 shadow">
                    {getShopIcon(shop.id)}
                    <span>{shop.category}</span>
                  </div>

                  {/* Quick Meta Overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white/90">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-[#d4af37]/30 text-[#f3e5ab] font-medium text-[10px]">
                      <Clock size={11} className="text-[#d4af37]" /> {shop.hours}
                    </span>
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-[#d4af37]/30 text-[10px]">
                      <MapPin size={11} className="text-[#d4af37]" /> {shop.location.split("(")[0].trim()}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#f3e5ab] transition-colors line-clamp-1 mb-1">
                      {shop.name}
                    </h3>
                    <p className="text-xs text-[#d4af37] italic font-serif line-clamp-1 mb-2">
                      {shop.tagline}
                    </p>
                    <p className="text-xs text-white/75 font-light line-clamp-2 leading-relaxed mb-3">
                      {shop.description}
                    </p>
                  </div>

                  {/* Action Link with Animated Arrow */}
                  <div className="pt-2 border-t border-[#d4af37]/25 flex items-center justify-between text-xs text-[#f3e5ab] font-medium group-hover:text-white transition-colors">
                    <span className="inline-flex items-center gap-1.5">
                      {content.jumpToShop}
                      <ArrowDown size={13} className="text-[#d4af37] group-hover:translate-y-1 transition-transform" />
                    </span>
                    <span className="text-[10px] text-white/50 uppercase tracking-widest group-hover:text-[#d4af37] transition-colors">
                      {shop.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. STICKY QUICK-SWITCH HORIZONTAL BAR                                */}
      {/* ==================================================================== */}
      <div className="sticky top-0 z-30 bg-[#020912]/95 backdrop-blur-md border-b border-[#d4af37]/30 shadow-lg py-2.5">
        <div className="container max-w-7xl px-4 sm:px-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-[10px] uppercase font-bold text-[#d4af37] tracking-wider pr-1 flex items-center gap-1">
              <Store size={12} /> Jump:
            </span>
            {content.shops.map((shop) => (
              <button
                key={shop.id}
                onClick={() => scrollToSection(shop.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                  activeSection === shop.id
                    ? "bg-[#d4af37] text-black font-semibold shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                    : "bg-[#0b243d]/80 text-white/80 hover:text-[#f3e5ab] hover:bg-[#0e3153] border border-[#d4af37]/30"
                }`}
              >
                {shop.name.split("&")[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 4. DEDICATED INDIVIDUAL SHOP SECTIONS (ALL 7 UNIQUE SECTIONS)         */}
      {/* ==================================================================== */}
      <div className="divide-y divide-[#d4af37]/30 bg-[#020912] text-white">
        {/* ------------------------------------------------------------------ */}
        {/* 1. AKSOY JEWELRY & DIAMONDS                                        */}
        {/* ------------------------------------------------------------------ */}
        <section id="aksoy-jewelry" className="py-14 md:py-20 scroll-mt-20">
          <div className="container max-w-7xl px-4 sm:px-6">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b243d]/90 via-[#040f1a] to-[#0b243d]/90 border-2 border-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.25)] p-5 sm:p-8 lg:p-10 backdrop-blur-xl">
              {/* Header Info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#d4af37]/30">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#f3e5ab] bg-[#0b243d] border border-[#d4af37]/60 px-3.5 py-1 rounded-full">
                    <Gem size={13} className="text-[#d4af37]" /> HAUTE JEWELRY ATELIER · LOBBY ARCADE
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white tracking-wide">
                    Aksoy Jewelry & Diamonds
                  </h2>
                  <p className="font-serif italic text-base sm:text-lg text-[#d4af37]">
                    Jewels That Belong To Your Story · Inside Lotus Beach Hotel
                  </p>
                </div>

                {/* Aksoy Hallmark Logo & Details */}
                <div className="flex items-center gap-4 bg-[#040f1a] border border-[#d4af37]/50 rounded-2xl p-3.5 shadow-lg shrink-0">
                  <img
                    src={SHOPS_ASSETS.aksoyLogo}
                    alt="Aksoy Jewelry Hallmark"
                    className="w-12 h-12 object-contain"
                  />
                  <div className="text-xs">
                    <div className="text-[#f3e5ab] font-serif font-semibold">Rashid Aksoy & Fatih Taşpınar</div>
                    <div className="text-white/60 font-light text-[11px]">Master Jewellers & Gemology</div>
                    <div className="text-[#d4af37] text-[10px] font-semibold mt-0.5 flex items-center gap-1">
                      <Clock size={10} /> 10:00 – 23:30 Daily
                    </div>
                  </div>
                </div>
              </div>

              {/* Dual Video Atelier Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
                <div className="rounded-2xl overflow-hidden bg-black border border-[#d4af37]/60 shadow-xl">
                  <div className="relative aspect-[16/10] bg-black">
                    <video
                      src={SHOPS_ASSETS.aksoyVideoRing}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-[#f3e5ab] font-medium border border-[#d4af37]/40">
                      Diamond Solitaire Craftsmanship
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden bg-black border border-[#d4af37]/60 shadow-xl">
                  <div className="relative aspect-[16/10] bg-black">
                    <video
                      src={SHOPS_ASSETS.aksoyVideoHaute}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-[#f3e5ab] font-medium border border-[#d4af37]/40">
                      Haute Joaillerie Atelier
                    </div>
                  </div>
                </div>
              </div>

              {/* Header Showcase Banner Image with Fullscreen Lightbox */}
              <div
                onClick={() =>
                  setFullscreenImage({
                    src: SHOPS_ASSETS.aksoyHeader,
                    alt: "Aksoy Jewelry Grand Showcase",
                    title: "Aksoy Jewelry · Lobby Arcade Boutique",
                  })
                }
                className="relative rounded-2xl overflow-hidden border border-[#d4af37]/70 cursor-zoom-in group mb-8 shadow-xl"
                title={content.openFullscreen}
              >
                <img
                  src={SHOPS_ASSETS.aksoyHeader}
                  alt="Aksoy Jewelry Grand Showcase"
                  className="w-full h-56 sm:h-72 lg:h-80 object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#f3e5ab]">
                  <span className="font-serif tracking-wider">Aksoy Jewelry Official Grand Atelier</span>
                  <span className="px-2 py-1 rounded bg-black/80 border border-[#d4af37] text-[10px] uppercase font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={10} /> Fullscreen
                  </span>
                </div>
              </div>

              {/* Description & 4 Pillars */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="font-serif text-xl font-medium text-[#f3e5ab]">
                    Bespoke Luxury & Certified Diamonds
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-light">
                    Aksoy Jewelry represents the pinnacle of Mediterranean fine jewelry inside Orka Lotus Beach Hotel. Every solitaire, custom Aegean gold piece, and rare gemstone creation is accompanied by international GIA certification, lifetime warranty, and complimentary on-site resizing.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#d4af37] font-medium pt-2">
                    <ShieldCheck size={16} /> Worldwide Appraisal & Export Warranty Included
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Certified GIA Diamonds",
                      desc: "Hand-selected solitaires and certified ethical gems cut to optical perfection.",
                    },
                    {
                      title: "14K & 18K Fine Gold",
                      desc: "Sculpted Italian and Aegean gold bracelets, necklaces, and bridal sets.",
                    },
                    {
                      title: "Bespoke Custom Atelier",
                      desc: "Custom 3D modeling and precision bench fabrication tailored to your dream piece.",
                    },
                    {
                      title: "Worldwide Guarantee",
                      desc: "Official authenticity certificates, valuation appraisals, and duty-free export.",
                    },
                  ].map((pillar, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#040f1a] border border-[#d4af37]/40 shadow flex items-start gap-3"
                    >
                      <Check size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-[#f3e5ab] mb-0.5">
                          {pillar.title}
                        </h4>
                        <p className="text-xs text-white/70 font-light leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Contacts Row */}
              <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#d4af37]/30">
                <a
                  href="https://wa.me/905324331387"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0d3b1e] via-[#124d27] to-[#0a2e17] hover:from-[#114b26] hover:to-[#196333] border border-[#d4af37] text-xs font-semibold text-white shadow transition-all hover:scale-[1.02]"
                >
                  <MessageCircle size={14} className="text-[#25D366]" />
                  <span>WhatsApp Mr. Rashid Aksoy (+90 532 433 13 87)</span>
                </a>

                <a
                  href="https://wa.me/905327490307"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0d3b1e] via-[#124d27] to-[#0a2e17] hover:from-[#114b26] hover:to-[#196333] border border-[#d4af37] text-xs font-semibold text-white shadow transition-all hover:scale-[1.02]"
                >
                  <MessageCircle size={14} className="text-[#25D366]" />
                  <span>WhatsApp Mr. Fatih Taşpınar (+90 532 749 03 07)</span>
                </a>

                <a
                  href="https://aksoyjewels-1.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b243d] hover:bg-[#0e3153] border border-[#d4af37]/70 text-xs font-semibold text-[#f3e5ab] shadow transition-all hover:scale-[1.02]"
                >
                  <ExternalLink size={14} className="text-[#d4af37]" />
                  <span>Visit Official Website</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 2. ELITE PHOTOSHOOT STUDIO (UNDER AKSOY JEWELRY)                   */}
        {/* ------------------------------------------------------------------ */}
        <section id="elite-photoshoot" className="py-14 md:py-20 scroll-mt-20">
          <div className="container max-w-7xl px-4 sm:px-6">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b243d]/90 via-[#040f1a] to-[#0b243d]/90 border-2 border-[#d4af37] shadow-[0_0_45px_rgba(212,175,55,0.3)] p-5 sm:p-8 lg:p-10 backdrop-blur-xl">
              {/* Header with Golden Frame Styling */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#d4af37]/40">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#f3e5ab] bg-[#0b243d] border-2 border-[#d4af37] px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.35)]">
                    <Camera size={14} className="text-[#d4af37]" />
                    <span>{content.elitePhotoshoot.eyebrow}</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white tracking-wide">
                    {content.elitePhotoshoot.title}
                  </h2>
                  <p className="font-serif italic text-base sm:text-lg text-[#d4af37]">
                    {content.elitePhotoshoot.subtitle}
                  </p>
                  <p className="text-xs text-[#f3e5ab]/90 font-medium">
                    {content.elitePhotoshoot.tagline}
                  </p>
                </div>

                {/* Management Badge */}
                <div className="flex items-center gap-4 bg-[#040f1a] border-2 border-[#d4af37] rounded-2xl p-4 shadow-[0_0_20px_rgba(212,175,55,0.25)] shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-[#0b243d] border border-[#d4af37] flex items-center justify-center text-[#d4af37] shadow">
                    <Award size={24} />
                  </div>
                  <div className="text-xs">
                    <div className="text-[#f3e5ab] font-serif font-bold text-sm">Hassan & Osman</div>
                    <div className="text-white/70 font-light text-[11px]">{content.elitePhotoshoot.managementBadge}</div>
                    <div className="text-[#d4af37] text-[11px] font-semibold mt-1 flex items-center gap-1">
                      <Clock size={12} /> {content.elitePhotoshoot.hours}
                    </div>
                  </div>
                </div>
              </div>

              {/* Golden Framed Media Showcase: Video + Master Image Gallery */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-8 items-stretch">
                {/* 1. Morphing Video with Golden Frame */}
                <div className="lg:col-span-6 flex flex-col">
                  <div className="rounded-2xl overflow-hidden bg-black border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.3)] relative group flex-1">
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full h-full min-h-[260px] bg-black">
                      <video
                        src={SHOPS_ASSETS.eliteVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-[#f3e5ab] font-medium border border-[#d4af37]/60">
                        <Video size={13} className="text-[#d4af37]" />
                        <span>{content.elitePhotoshoot.videoLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Elite Photoshoot Master Image Showcase with Golden Frame */}
                <div className="lg:col-span-6 flex flex-col">
                  <div
                    onClick={() =>
                      setFullscreenImage({
                        src: SHOPS_ASSETS.eliteImageShowcase,
                        alt: "Elite Photoshoot Studio Master Gallery",
                        title: "Elite Photoshoot Studio · Artistic Showcase",
                      })
                    }
                    className="rounded-2xl overflow-hidden bg-black border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.3)] relative cursor-zoom-in group flex-1"
                    title={content.openFullscreen}
                  >
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full h-full min-h-[260px] bg-black">
                      <img
                        src={SHOPS_ASSETS.eliteImageShowcase}
                        alt="Elite Photoshoot Studio Master Gallery"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-[#f3e5ab] font-medium border border-[#d4af37]/60">
                        <Camera size={13} className="text-[#d4af37]" />
                        <span>{content.elitePhotoshoot.galleryLabel}</span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#f3e5ab]">
                        <span className="font-serif">Click to view in high resolution</span>
                        <span className="px-2.5 py-1 rounded-lg bg-black/85 border border-[#d4af37] text-[10px] uppercase font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 size={10} /> Fullscreen
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editorial & Story Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
                {/* Where Artistry Meets Excellence */}
                <div className="p-6 rounded-2xl bg-[#040f1a] border-2 border-[#d4af37]/70 shadow-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-[#d4af37]" />
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#f3e5ab]">
                      {content.elitePhotoshoot.artistryTitle}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    {content.elitePhotoshoot.artistryP1}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    {content.elitePhotoshoot.artistryP2}
                  </p>
                </div>

                {/* The Artists Behind the Lens: Hassan & Osman */}
                <div className="p-6 rounded-2xl bg-[#040f1a] border-2 border-[#d4af37]/70 shadow-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <Heart size={18} className="text-[#d4af37]" />
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#f3e5ab]">
                      {content.elitePhotoshoot.artistsTitle}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    {content.elitePhotoshoot.artistsP1}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    {content.elitePhotoshoot.artistsP2}
                  </p>
                </div>
              </div>

              {/* Quote Banner */}
              <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-[#040f1a] via-[#0b243d] to-[#040f1a] border-2 border-[#d4af37] text-center shadow-[0_0_25px_rgba(212,175,55,0.2)]">
                <span className="font-serif text-2xl sm:text-3xl text-[#f3e5ab] italic block mb-2">
                  "{content.elitePhotoshoot.quoteText}"
                </span>
                <p className="text-xs sm:text-sm text-white/75 font-light max-w-2xl mx-auto">
                  {content.elitePhotoshoot.quoteAuthor}
                </p>
              </div>

              {/* State-of-the-Art Technology & Equipment */}
              <div className="my-8">
                <div className="flex items-center gap-2 mb-4">
                  <Camera size={18} className="text-[#d4af37]" />
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#f3e5ab]">
                    {content.elitePhotoshoot.techTitle}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {content.elitePhotoshoot.techItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#040f1a] border border-[#d4af37]/60 shadow-sm hover:border-[#d4af37] transition-all hover:scale-[1.02]"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#0b243d] border border-[#d4af37]/80 flex items-center justify-center text-[#d4af37] mb-2.5">
                        <Check size={16} />
                      </div>
                      <h4 className="text-xs font-semibold text-[#f3e5ab] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-white/70 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tailored Photography Services */}
              <div className="my-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#f3e5ab]">
                    {content.elitePhotoshoot.servicesTitle}
                  </h3>
                  <span className="text-xs text-[#d4af37] font-medium">
                    {content.elitePhotoshoot.servicesSubtitle}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {content.elitePhotoshoot.servicesList.map((svc, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#040f1a] border border-[#d4af37]/50 shadow-sm hover:border-[#d4af37] transition-all"
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#f3e5ab] mb-1.5">
                        <Sparkles size={14} className="text-[#d4af37]" />
                        <span>{svc.title}</span>
                      </div>
                      <p className="text-[11px] text-white/70 font-light leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Elite Gift Boutique Feature Box */}
              <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-[#07192a] via-[#0b243d] to-[#07192a] border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.25)] flex flex-col md:flex-row items-start md:items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#040f1a] border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] shadow shrink-0">
                  <Gift size={28} />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] bg-black/50 border border-[#d4af37]/50 px-2.5 py-0.5 rounded">
                      EXCLUSIVE ON-SITE BOUTIQUE
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-medium text-[#f3e5ab]">
                      {content.elitePhotoshoot.boutiqueTitle}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                    {content.elitePhotoshoot.boutiqueDesc}
                  </p>
                </div>
              </div>

              {/* Why Choose Elite Photoshoot */}
              <div className="my-8">
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#f3e5ab] mb-4">
                  {content.elitePhotoshoot.whyChooseTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.elitePhotoshoot.whyChooseItems.map((why, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#040f1a] border border-[#d4af37]/40 shadow-sm flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#0b243d] border border-[#d4af37] flex items-center justify-center text-[#d4af37] text-xs shrink-0 mt-0.5 font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#f3e5ab] mb-1">
                          {why.title}
                        </h4>
                        <p className="text-[11px] text-white/70 font-light leading-relaxed">
                          {why.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ---------------------------------------------------------------- */}
              {/* CONTACTS & DIRECT ACTION HUB                                      */}
              {/* Includes Pink Framed Instagram + QR Code & Golden Framed Buttons */}
              {/* ---------------------------------------------------------------- */}
              <div className="mt-10 pt-8 border-t border-[#d4af37]/40 space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-white">
                    {content.elitePhotoshoot.contactsTitle}
                  </h3>
                  <p className="text-xs text-white/70 font-light mt-0.5">
                    {content.elitePhotoshoot.contactsSubtitle}
                  </p>
                </div>

                {/* Pink Frame for Instagram Link & QR Code */}
                <div className="rounded-2xl border-2 border-pink-500 bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-pink-950/40 p-5 sm:p-6 shadow-[0_0_35px_rgba(236,72,153,0.35)]">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                      {/* Instagram QR Code with Click to Zoom */}
                      <div
                        onClick={() =>
                          setFullscreenImage({
                            src: SHOPS_ASSETS.eliteQrCode,
                            alt: "Elite Photoshoot Instagram QR Code",
                            title: "Instagram @elite.photoshop_ · Scan to Follow",
                          })
                        }
                        className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.4)] cursor-zoom-in group shrink-0 bg-black"
                        title={content.openFullscreen}
                      >
                        <img
                          src={SHOPS_ASSETS.eliteQrCode}
                          alt="Elite Photoshoot Instagram QR Code"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white font-bold uppercase">
                          <Maximize2 size={16} />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-pink-300 bg-pink-950/80 border border-pink-400/60 px-3 py-0.5 rounded-full">
                          <Instagram size={12} className="text-pink-400" />
                          <span>OFFICIAL INSTAGRAM PORTFOLIO</span>
                        </div>
                        <h4 className="font-serif text-xl sm:text-2xl font-semibold text-white">
                          @elite.photoshop_
                        </h4>
                        <p className="text-xs text-pink-100/80 font-light max-w-md">
                          {content.elitePhotoshoot.instagramQrPrompt}
                        </p>
                      </div>
                    </div>

                    {/* Direct Instagram Action Button */}
                    <div className="shrink-0">
                      <a
                        href="https://www.instagram.com/elite.photoshop_"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(236,72,153,0.5)] border border-pink-300/60 transition-all hover:scale-[1.03] active:scale-[0.98]"
                      >
                        <Instagram size={18} className="text-white" />
                        <span>{content.elitePhotoshoot.instagramBtnLabel}</span>
                        <ExternalLink size={14} className="text-pink-200" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Direct Phone & WhatsApp Buttons with Golden Frames */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="tel:+905330346348"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b243d] hover:bg-[#0e3153] border-2 border-[#d4af37] text-xs font-semibold text-[#f3e5ab] shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all hover:scale-[1.02]"
                  >
                    <Phone size={14} className="text-[#d4af37]" />
                    <span>{content.elitePhotoshoot.callPhone1Label}</span>
                  </a>

                  <a
                    href="tel:+905060598512"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b243d] hover:bg-[#0e3153] border-2 border-[#d4af37] text-xs font-semibold text-[#f3e5ab] shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all hover:scale-[1.02]"
                  >
                    <PhoneCall size={14} className="text-[#d4af37]" />
                    <span>{content.elitePhotoshoot.callPhone2Label}</span>
                  </a>

                  <a
                    href="https://wa.me/905330346348"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b243d] hover:bg-[#0e3153] border-2 border-[#25D366] text-xs font-semibold text-white shadow-[0_0_15px_rgba(37,211,102,0.25)] transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle size={14} className="text-[#25D366]" />
                    <span>{content.elitePhotoshoot.whatsapp1Label}</span>
                  </a>

                  <a
                    href="https://wa.me/905060598512"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b243d] hover:bg-[#0e3153] border-2 border-[#25D366] text-xs font-semibold text-white shadow-[0_0_15px_rgba(37,211,102,0.25)] transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle size={14} className="text-[#25D366]" />
                    <span>{content.elitePhotoshoot.whatsapp2Label}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 3. NORA HAIR & BEAUTY SALON                                        */}
        {/* ------------------------------------------------------------------ */}
        <section id="nora-salon" className="py-14 md:py-20 scroll-mt-20">
          <div className="container max-w-7xl px-4 sm:px-6">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b243d]/90 via-[#040f1a] to-[#0b243d]/90 border-2 border-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.25)] p-5 sm:p-8 lg:p-10 backdrop-blur-xl">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d4af37]/30">
                <div>
                  <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#f3e5ab] bg-[#0b243d] border border-[#d4af37]/60 px-3.5 py-1 rounded-full mb-2">
                    <Scissors size={13} className="text-[#d4af37]" /> BEAUTY RETREAT · SPA LEVEL -3
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white tracking-wide">
                    Nora Hair & Beauty Salon
                  </h2>
                  <p className="font-serif italic text-base text-[#d4af37]">
                    Where Luxury Meets Expertise · Under the Direction of Mrs. Nurtan
                  </p>
                </div>
                <div className="text-xs text-right text-white/70">
                  <div className="text-[#f3e5ab] font-semibold flex items-center sm:justify-end gap-1">
                    <Clock size={12} className="text-[#d4af37]" /> 09:00 – 20:00 Daily
                  </div>
                  <div className="text-[11px] text-white/60">-3 Floor (Directly in front of Spa)</div>
                </div>
              </div>

              {/* Visual Showcase & Services */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-stretch">
                {/* Salon Image */}
                <div className="lg:col-span-5">
                  <div
                    onClick={() =>
                      setFullscreenImage({
                        src: SHOPS_ASSETS.noraSalon,
                        alt: "Nora Hair & Beauty Salon",
                        title: "Nora Salon · Spa Level -3 Boutique",
                      })
                    }
                    className="relative rounded-2xl overflow-hidden border border-[#d4af37]/70 cursor-zoom-in group h-full min-h-[300px] shadow-lg"
                    title={content.openFullscreen}
                  >
                    <img
                      src={SHOPS_ASSETS.noraSalon}
                      alt="Nora Hair & Beauty Salon"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#f3e5ab]">
                      <span className="font-serif">Dedicated Pampering & Aesthetics</span>
                      <span className="px-2 py-1 rounded bg-black/80 border border-[#d4af37] text-[10px] uppercase font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 size={10} /> Fullscreen
                      </span>
                    </div>
                  </div>
                </div>

                {/* Services Highlights */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#f3e5ab] mb-2">
                      Comprehensive Hair, Nail & Spa Beauty Services
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light mb-5">
                      Experience precision haircuts, revitalizing keratin infusions, luxury gel nail art, and tailored bridal styling in a tranquil aesthetic sanctuary right inside the resort.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {[
                        {
                          title: "Hair Care Excellence",
                          items: "Precision cuts, highlights, balayage, keratin repair & blowouts.",
                        },
                        {
                          title: "Nail Artistry & Spa",
                          items: "Classic & gel manicures, luxury spa pedicures, and paraffin care.",
                        },
                        {
                          title: "Facial & Beauty Care",
                          items: "Eyebrow shaping, eyelash extensions, facials & waxing.",
                        },
                        {
                          title: "Bridal & VIP Styling",
                          items: "Full bridal packages, evening updos, and special occasion glamour.",
                        },
                      ].map((srv, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-[#040f1a] border border-[#d4af37]/40 shadow-sm"
                        >
                          <h4 className="text-xs font-semibold text-[#f3e5ab] mb-1 flex items-center gap-1.5">
                            <Sparkles size={12} className="text-[#d4af37]" /> {srv.title}
                          </h4>
                          <p className="text-[11px] text-white/70 font-light leading-relaxed">
                            {srv.items}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="pt-4 border-t border-[#d4af37]/30 flex flex-wrap gap-3">
                    <a
                      href="tel:+905331977383"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b243d] hover:bg-[#0e3153] border border-[#d4af37] text-xs font-semibold text-white shadow transition-all hover:scale-[1.02]"
                    >
                      <PhoneCall size={14} className="text-[#d4af37]" />
                      <span>Call Mrs. Nurtan (+90 533 197 73 83)</span>
                    </a>
                    <a
                      href="https://wa.me/905331977383"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0d3b1e] to-[#124d27] hover:from-[#114b26] hover:to-[#196333] border border-[#d4af37] text-xs font-semibold text-white shadow transition-all hover:scale-[1.02]"
                    >
                      <MessageCircle size={14} className="text-[#25D366]" />
                      <span>WhatsApp Appointment</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 3. AZUR LEATHER & TRAVEL GOODS                                     */}
        {/* ------------------------------------------------------------------ */}
        <section id="azur-shop" className="py-14 md:py-20 scroll-mt-20">
          <div className="container max-w-7xl px-4 sm:px-6">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b243d]/90 via-[#040f1a] to-[#0b243d]/90 border-2 border-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.25)] p-5 sm:p-8 lg:p-10 backdrop-blur-xl">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d4af37]/30">
                <div>
                  <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#f3e5ab] bg-[#0b243d] border border-[#d4af37]/60 px-3.5 py-1 rounded-full mb-2">
                    <Luggage size={13} className="text-[#d4af37]" /> LEATHER & TRAVEL BOUTIQUE · MAIN ARCADE
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white tracking-wide">
                    Azur Leather & Travel Goods
                  </h2>
                  <p className="font-serif italic text-base text-[#d4af37]">
                    Finest Turkish Leather, Designer Handbags & Durable Luggage
                  </p>
                </div>
                <div className="text-xs text-right text-white/70">
                  <div className="text-[#f3e5ab] font-semibold flex items-center sm:justify-end gap-1">
                    <Clock size={12} className="text-[#d4af37]" /> 09:30 – 23:00 Daily
                  </div>
                  <div className="text-[11px] text-white/60">Main Shopping Arcade</div>
                </div>
              </div>

              {/* Dual Visual Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div
                  onClick={() =>
                    setFullscreenImage({
                      src: SHOPS_ASSETS.azurShopGift,
                      alt: "Azur Boutique Storefront",
                      title: "Azur Leather Boutique Storefront",
                    })
                  }
                  className="relative rounded-2xl overflow-hidden border border-[#d4af37]/70 cursor-zoom-in group h-64 sm:h-72 shadow-lg"
                  title={content.openFullscreen}
                >
                  <img
                    src={SHOPS_ASSETS.azurShopGift}
                    alt="Azur Boutique Storefront"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 text-xs text-[#f3e5ab] font-medium flex items-center gap-1.5">
                    <Store size={14} className="text-[#d4af37]" /> Boutique Storefront
                  </div>
                </div>

                <div
                  onClick={() =>
                    setFullscreenImage({
                      src: SHOPS_ASSETS.azurShopHandbag,
                      alt: "Azur Handbag Collection",
                      title: "Handcrafted Turkish Leather Handbags",
                    })
                  }
                  className="relative rounded-2xl overflow-hidden border border-[#d4af37]/70 cursor-zoom-in group h-64 sm:h-72 shadow-lg"
                  title={content.openFullscreen}
                >
                  <img
                    src={SHOPS_ASSETS.azurShopHandbag}
                    alt="Azur Handbag Collection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 text-xs text-[#f3e5ab] font-medium flex items-center gap-1.5">
                    <ShoppingBag size={14} className="text-[#d4af37]" /> Handbag & Travel Collection
                  </div>
                </div>
              </div>

              {/* Highlights & Privileges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  {
                    title: "Genuine Turkish Leather",
                    desc: "Artisanal cowhide and lambskin handbags, belts, wallets, and jackets.",
                  },
                  {
                    title: "Durable Travel Luggage",
                    desc: "Lightweight hard-shell spinner suitcases in all cabin and check-in sizes.",
                  },
                  {
                    title: "Express Global Shipping",
                    desc: "Worry-free door-to-door insured international courier delivery to your home.",
                  },
                  {
                    title: "Hotel Guest Privilege",
                    desc: "Special promotional discounts and personalized styling guidance by Mr. Murat.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#040f1a] border border-[#d4af37]/40 shadow-sm"
                  >
                    <Check size={16} className="text-[#d4af37] mb-2" />
                    <h4 className="text-xs font-semibold text-[#f3e5ab] mb-1">{item.title}</h4>
                    <p className="text-[11px] text-white/70 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Contact Row */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#d4af37]/30">
                <a
                  href="tel:+905364774819"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b243d] hover:bg-[#0e3153] border border-[#d4af37] text-xs font-semibold text-white shadow transition-all hover:scale-[1.02]"
                >
                  <PhoneCall size={14} className="text-[#d4af37]" />
                  <span>Call Mr. Murat (+90 536 477 48 19)</span>
                </a>
                <a
                  href="https://wa.me/905364774819"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0d3b1e] to-[#124d27] hover:from-[#114b26] hover:to-[#196333] border border-[#d4af37] text-xs font-semibold text-white shadow transition-all hover:scale-[1.02]"
                >
                  <MessageCircle size={14} className="text-[#25D366]" />
                  <span>WhatsApp Mr. Murat</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 4. AZUR GIFT & SOUVENIR BOUTIQUE                                  */}
        {/* ------------------------------------------------------------------ */}
        <section id="azur-gift-boutique" className="py-14 md:py-20 scroll-mt-20">
          <div className="container max-w-7xl px-4 sm:px-6">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b243d]/90 via-[#040f1a] to-[#0b243d]/90 border-2 border-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.25)] p-5 sm:p-8 lg:p-10 backdrop-blur-xl">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d4af37]/30">
                <div>
                  <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#f3e5ab] bg-[#0b243d] border border-[#d4af37]/60 px-3.5 py-1 rounded-full mb-2">
                    <Gift size={13} className="text-[#d4af37]" /> SOUVENIR BOUTIQUE · ARCADE GROUND FLOOR
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white tracking-wide">
                    Azur Gift & Souvenir Boutique
                  </h2>
                  <p className="font-serif italic text-base text-[#d4af37]">
                    Handcrafted Turkish Ceramics, Gourmet Delight & Aegean Treasures
                  </p>
                </div>
                <div className="text-xs text-right text-white/70">
                  <div className="text-[#f3e5ab] font-semibold flex items-center sm:justify-end gap-1">
                    <Clock size={12} className="text-[#d4af37]" /> 09:30 – 23:30 Daily
                  </div>
                  <div className="text-[11px] text-white/60">Arcade Ground Level</div>
                </div>
              </div>

              {/* Showcase & Offerings */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
                <div className="lg:col-span-5">
                  <div
                    onClick={() =>
                      setFullscreenImage({
                        src: SHOPS_ASSETS.azurGiftBoutique,
                        alt: "Azur Gift & Souvenir Boutique",
                        title: "Azur Gift Boutique · Handcrafted Treasures",
                      })
                    }
                    className="relative rounded-2xl overflow-hidden border border-[#d4af37]/70 cursor-zoom-in group h-72 shadow-lg"
                    title={content.openFullscreen}
                  >
                    <img
                      src={SHOPS_ASSETS.azurGiftBoutique}
                      alt="Azur Gift & Souvenir Boutique"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#f3e5ab]">
                      <span className="font-serif">Authentic Keepsakes & Ceramics</span>
                      <span className="px-2 py-1 rounded bg-black/80 border border-[#d4af37] text-[10px] uppercase font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 size={10} /> Fullscreen
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-serif text-xl font-medium text-[#f3e5ab]">
                    Take the Magic of Marmaris Home
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    Curated authentic memories from Turkey: artisan hand-painted ceramics, protective glass evil-eye charms, gourmet Turkish delight with pistachios and pomegranate, and cold-pressed Aegean olive oil soaps.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      {
                        title: "Artisan Ceramics & Nazar",
                        desc: "Authentic pottery, decorative plates, and traditional glass charms.",
                      },
                      {
                        title: "Gourmet Lokum & Spices",
                        desc: "Fresh Turkish delight, herbal teas, saffron, and aromatic spice jars.",
                      },
                      {
                        title: "Natural Olive Oil Soaps",
                        desc: "Handmade soaps, moisturizers, and Aegean wellness cosmetics.",
                      },
                      {
                        title: "Gift Packaging Included",
                        desc: "Safe bubble packaging and protective gift boxes for travel luggage.",
                      },
                    ].map((perk, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#040f1a] border border-[#d4af37]/40 shadow-sm"
                      >
                        <h4 className="text-xs font-semibold text-[#f3e5ab] mb-0.5 flex items-center gap-1.5">
                          <Check size={13} className="text-[#d4af37]" /> {perk.title}
                        </h4>
                        <p className="text-[11px] text-white/70 font-light leading-relaxed">
                          {perk.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 flex flex-wrap gap-3">
                    <a
                      href="https://wa.me/905364774819"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0d3b1e] to-[#124d27] hover:from-[#114b26] hover:to-[#196333] border border-[#d4af37] text-xs font-semibold text-white shadow transition-all hover:scale-[1.02]"
                    >
                      <MessageCircle size={14} className="text-[#25D366]" />
                      <span>WhatsApp Mr. Murat (+90 536 477 48 19)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 5. ISTANBUL TEXTILE & RESORT FASHION                               */}
        {/* ------------------------------------------------------------------ */}
        <section id="istanbul-textile" className="py-14 md:py-20 scroll-mt-20">
          <div className="container max-w-7xl px-4 sm:px-6">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b243d]/90 via-[#040f1a] to-[#0b243d]/90 border-2 border-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.25)] p-5 sm:p-8 lg:p-10 backdrop-blur-xl">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d4af37]/30">
                <div>
                  <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#f3e5ab] bg-[#0b243d] border border-[#d4af37]/60 px-3.5 py-1 rounded-full mb-2">
                    <ShoppingBag size={13} className="text-[#d4af37]" /> TEXTILE & FASHION · BEACH PROMENADE
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white tracking-wide">
                    Istanbul Textile & Resort Fashion
                  </h2>
                  <p className="font-serif italic text-base text-[#d4af37]">
                    Organic Turkish Cottons, Aegean Linens & Resort Beachwear
                  </p>
                </div>
                <div className="text-xs text-right text-white/70">
                  <div className="text-[#f3e5ab] font-semibold flex items-center sm:justify-end gap-1">
                    <Clock size={12} className="text-[#d4af37]" /> 09:00 – 23:00 Daily
                  </div>
                  <div className="text-[11px] text-white/60">Beach Walk Promenade</div>
                </div>
              </div>

              {/* Visual Showcase & Highlights */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
                <div className="lg:col-span-5">
                  <div
                    onClick={() =>
                      setFullscreenImage({
                        src: SHOPS_ASSETS.istanbulTextile,
                        alt: "Istanbul Textile Boutique",
                        title: "Istanbul Textile · Beachfront Boutique",
                      })
                    }
                    className="relative rounded-2xl overflow-hidden border border-[#d4af37]/70 cursor-zoom-in group h-72 shadow-lg"
                    title={content.openFullscreen}
                  >
                    <img
                      src={SHOPS_ASSETS.istanbulTextile}
                      alt="Istanbul Textile Boutique"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#f3e5ab]">
                      <span className="font-serif">Organic Cotton & Beach Fashion</span>
                      <span className="px-2 py-1 rounded bg-black/80 border border-[#d4af37] text-[10px] uppercase font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 size={10} /> Fullscreen
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-serif text-xl font-medium text-[#f3e5ab]">
                    Breezy Aegean Style & Certified Organic Cottons
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    Specializing in authentic 100% Turkish cotton peshtemals, breezy natural linen shirts and dresses, designer swimwear, and beach caftans engineered for Mediterranean sunshine.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      {
                        title: "100% Organic Turkish Cotton",
                        desc: "Fast-drying, lightweight peshtemals and Aegean bathrobes.",
                      },
                      {
                        title: "Breathable Linen Wear",
                        desc: "Crisp resort shirts, comfortable beach trousers, and airy sundresses.",
                      },
                      {
                        title: "Swimwear & Beach Caftans",
                        desc: "Vibrant Mediterranean designs, sun hats, and resort cover-ups.",
                      },
                      {
                        title: "Complimentary Tailoring",
                        desc: "Quick on-site size adjustments and hemming services.",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#040f1a] border border-[#d4af37]/40 shadow-sm"
                      >
                        <h4 className="text-xs font-semibold text-[#f3e5ab] mb-0.5 flex items-center gap-1.5">
                          <Check size={13} className="text-[#d4af37]" /> {item.title}
                        </h4>
                        <p className="text-[11px] text-white/70 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 flex flex-wrap gap-3">
                    <a
                      href="tel:+905366761711"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b243d] hover:bg-[#0e3153] border border-[#d4af37] text-xs font-semibold text-white shadow transition-all hover:scale-[1.02]"
                    >
                      <PhoneCall size={14} className="text-[#d4af37]" />
                      <span>Call Boutique (+90 536 676 17 11)</span>
                    </a>
                    <a
                      href="https://wa.me/905366761711"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0d3b1e] to-[#124d27] hover:from-[#114b26] hover:to-[#196333] border border-[#d4af37] text-xs font-semibold text-white shadow transition-all hover:scale-[1.02]"
                    >
                      <MessageCircle size={14} className="text-[#25D366]" />
                      <span>WhatsApp Textile Team</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* 6. ORKA LOTUS BEACH MARKET                                         */}
        {/* ------------------------------------------------------------------ */}
        <section id="supermarket" className="py-14 md:py-20 scroll-mt-20">
          <div className="container max-w-7xl px-4 sm:px-6">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b243d]/90 via-[#040f1a] to-[#0b243d]/90 border-2 border-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.25)] p-5 sm:p-8 lg:p-10 backdrop-blur-xl">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#d4af37]/30">
                <div>
                  <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#f3e5ab] bg-[#0b243d] border border-[#d4af37]/60 px-3.5 py-1 rounded-full mb-2">
                    <Store size={13} className="text-[#d4af37]" /> RESORT MARKET · BEACHFRONT BAY AREA
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white tracking-wide">
                    Orka Lotus Beach Market
                  </h2>
                  <p className="font-serif italic text-base text-[#d4af37]">
                    Refreshments, Beach Inflatables, Suncare & Daily Holiday Essentials
                  </p>
                </div>
                <div className="text-xs text-right text-white/70">
                  <div className="text-[#f3e5ab] font-semibold flex items-center sm:justify-end gap-1">
                    <Clock size={12} className="text-[#d4af37]" /> 08:00 – 00:00 (Midnight)
                  </div>
                  <div className="text-[11px] text-white/60">Beachfront Promenade</div>
                </div>
              </div>

              {/* Visual Showcase & Highlights */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
                <div className="lg:col-span-5">
                  <div
                    onClick={() =>
                      setFullscreenImage({
                        src: SHOPS_ASSETS.supermarket,
                        alt: "Orka Lotus Beach Market",
                        title: "Beach Supermarket · Daily Essentials",
                      })
                    }
                    className="relative rounded-2xl overflow-hidden border border-[#d4af37]/70 cursor-zoom-in group h-72 shadow-lg"
                    title={content.openFullscreen}
                  >
                    <img
                      src={SHOPS_ASSETS.supermarket}
                      alt="Orka Lotus Beach Market"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#f3e5ab]">
                      <span className="font-serif">Beachside Convenience</span>
                      <span className="px-2 py-1 rounded bg-black/80 border border-[#d4af37] text-[10px] uppercase font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 size={10} /> Fullscreen
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-serif text-xl font-medium text-[#f3e5ab]">
                    Everything for Your Sunbed in Seconds
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                    Steps from the pine-scented loungers and jetty, our resort supermarket offers ice-cold beverages, artisanal gelato, high-protection UV sunscreens, snorkel gear, beach inflatables, and international sundries.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      {
                        title: "Cold Drinks & Ice Creams",
                        desc: "Chilled sodas, mineral water, beers, and ice cream treats.",
                      },
                      {
                        title: "High-SPF Suncare",
                        desc: "Nivea, Hawaiian Tropic, and after-sun aloe vera lotions.",
                      },
                      {
                        title: "Inflatables & Snorkels",
                        desc: "Swim rings, air mattresses, goggles, and kids beach toys.",
                      },
                      {
                        title: "Open Daily to Midnight",
                        desc: "Early morning to late night convenience right on the beach walk.",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#040f1a] border border-[#d4af37]/40 shadow-sm"
                      >
                        <h4 className="text-xs font-semibold text-[#f3e5ab] mb-0.5 flex items-center gap-1.5">
                          <Check size={13} className="text-[#d4af37]" /> {item.title}
                        </h4>
                        <p className="text-[11px] text-white/70 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-xs text-[#f3e5ab] bg-[#040f1a] px-3.5 py-1.5 rounded-lg border border-[#d4af37]/30">
                      <MapPin size={13} className="text-[#d4af37]" /> Located at the beachfront bay area beside the water sports kiosk.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ==================================================================== */}
      {/* 5. TAX-FREE SHOPPING GUARANTEE (SINGLE CLEAN INFORMATIONAL BANNER)    */}
      {/* ==================================================================== */}
      <section className="bg-gradient-to-b from-[#020912] via-[#07192a] to-[#040f1a] py-12 md:py-16 text-white border-t border-[#d4af37]/30">
        <div className="container max-w-5xl px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-r from-[#0b243d] via-[#07192a] to-[#0b243d] border-2 border-[#d4af37] p-6 sm:p-8 shadow-[0_0_30px_rgba(212,175,55,0.25)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#f3e5ab] shrink-0 mt-1">
                <ShieldCheck size={24} className="text-[#d4af37]" />
              </div>
              <div className="space-y-1">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#f3e5ab] bg-black/40 px-2.5 py-0.5 rounded border border-[#d4af37]/40">
                  {content.taxFreeBadge}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-white">
                  {content.taxFreeTitle}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-xl">
                  {content.taxFreeDesc}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => scrollToSection("aksoy-jewelry")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#d4af37] hover:bg-[#f3e5ab] text-black font-semibold text-xs shadow-lg transition-all hover:scale-[1.02]"
              >
                <span>Browse All 7 Boutiques</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. FULLSCREEN LIGHTBOX MODAL                                         */}
      {/* ==================================================================== */}
      {fullscreenImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="absolute top-4 right-4 z-10 flex items-center gap-3">
            <button
              onClick={() => setFullscreenImage(null)}
              className="p-2.5 rounded-full bg-black/70 hover:bg-[#d4af37] text-white hover:text-black border border-[#d4af37] transition-all shadow-lg"
              title={content.closeFullscreen}
              aria-label={content.closeFullscreen}
            >
              <X size={20} />
            </button>
          </div>

          <div
            className="max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={fullscreenImage.src}
              alt={fullscreenImage.alt}
              className="max-h-[75vh] w-auto object-contain rounded-xl border-2 border-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.4)]"
            />
            {fullscreenImage.title && (
              <p className="font-serif text-sm sm:text-base text-[#f3e5ab] mt-4 text-center tracking-wide font-light">
                {fullscreenImage.title}
              </p>
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
}
