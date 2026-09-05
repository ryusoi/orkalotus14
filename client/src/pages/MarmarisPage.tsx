import { useState, useRef } from "react";
import { Link } from "wouter";
import {
  Anchor,
  Compass,
  MapPin,
  Mountain,
  Navigation,
  Sparkles,
  Sun,
  Trees,
  Volume2,
  VolumeX,
  Phone,
  Calendar,
  Compass as CompassIcon,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import MarmarisGoogleMap from "@/components/MarmarisGoogleMap";
import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/data/content";

const ATTRACTIONS = [
  {
    id: "icmeler-town",
    title: "İçmeler Town & Coastal Bay",
    subtitle: "Picturesque Seaside Jewel & Emerald Bay",
    distance: "Directly outside resort",
    duration: "5 min walk / bicycle",
    image:
      "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MARMARIS/ICMELER%20TOWN.webp",
    fallbackImage:
      "https://github.com/ryusoi/orkalotusmanus1/raw/main/MARMARIS/ICMELER%20TOWN.webp",
    description:
      "Nestled in a serene horseshoe bay framed by dramatic pine-covered mountains and crystal-clear turquoise waters. Stroll or cycle along the palm-lined 11km coastal promenade that connects Orka Lotus Beach directly with downtown İçmeler and Marmaris Marina.",
    tips: "Take an early morning sunrise stroll or rent a resort bicycle to catch the golden light glistening across the calm waters.",
    tag: "Beach & Promenade",
  },
  {
    id: "marmaris-castle-harbor",
    title: "Marmaris Harbor, Castle & Old Town",
    subtitle: "16th-Century Ottoman Fortress & Marina Vistas",
    distance: "6 km from resort",
    duration: "12 min taxi / water taxi",
    image:
      "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MARMARIS/Marmaris%20collage%201.png",
    fallbackImage:
      "https://github.com/ryusoi/orkalotusmanus1/raw/main/MARMARIS/Marmaris%20collage%201.png",
    description:
      "A breathtaking synthesis of historic Aegean architecture and modern superyacht elegance. Explore the ramparts of Marmaris Castle built by Sultan Suleiman the Magnificent in 1522, ancient amphora collections, and vibrant cobblestone bazaar lanes.",
    tips: "Visit the castle battlements before sunset for an unforgettable 360-degree panoramic view of hundreds of moored yachts and the bay.",
    tag: "Historic Landmark",
  },
  {
    id: "turquoise-coves-blue-cruise",
    title: "Turquoise Coves & Blue Cruise Journeys",
    subtitle: "Secluded Aegean Inlets, Amos & Phosphorus Cave",
    distance: "Departing from resort pier",
    duration: "Half or Full Day Cruise",
    image:
      "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MARMARIS/Marmaris%20collage%202.png",
    fallbackImage:
      "https://github.com/ryusoi/orkalotusmanus1/raw/main/MARMARIS/Marmaris%20collage%202.png",
    description:
      "Embark on a traditional handcrafted wooden gulet to discover secluded paradise coves accessible only by sea, including Amos Bay, Kumlubük, Turunç, Green Sea Bay, and glowing sea caves with world-class snorkeling.",
    tips: "Our concierge team can organize an exclusive private yacht charter complete with an authentic Aegean seafood lunch prepared on board.",
    tag: "Island & Yachting",
  },
  {
    id: "pine-forests-waterfalls-safari",
    title: "Pine Forests, Waterfalls & Mountain Safari",
    subtitle: "Marmaris National Park Wilderness & Bayır Village",
    distance: "Surrounding National Park",
    duration: "15 min transfer / Half Day",
    image:
      "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MARMARIS/Marmaris%20collage%203.png",
    fallbackImage:
      "https://github.com/ryusoi/orkalotusmanus1/raw/main/MARMARIS/Marmaris%20collage%203.png",
    description:
      "Spanning over 29,000 hectares of fragrant Pinus brutia pine reserves, explore the cascading fresh mountain pools of Turgut Waterfall, the ancient monumental plane tree in Bayır, and scenic off-road safari trails high above the coastline.",
    tips: "Taste raw wild pine honey (çam balı) and mountain thyme honey directly from generations-old village apiaries.",
    tag: "Nature & Adventure",
  },
  {
    id: "dalyan-delta-rock-tombs",
    title: "Dalyan Delta, Lycian Rock Tombs & Turtle Beach",
    subtitle: "2,400-Year-Old Royal Tombs & Caretta Caretta Beach",
    distance: "65 km (Excursion by coach & boat)",
    duration: "Full Day Guided Excursion",
    image:
      "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MARMARIS/marmaris%20collage%204.png",
    fallbackImage:
      "https://github.com/ryusoi/orkalotusmanus1/raw/main/MARMARIS/marmaris%20collage%204.png",
    description:
      "Sail along the winding reed waterways of the Dalyan delta beneath dramatic 4th-century BC Lycian rock-cut royal tombs carved into soaring cliffs, leading to the protected golden sands of İztuzu Beach where endangered loggerhead sea turtles nest.",
    tips: "Indulge in the natural mineral-rich thermal mud baths and hot sulfur springs along Lake Köyceğiz during your river journey.",
    tag: "UNESCO Heritage",
  },
];

const LOCAL_CULTURE = [
  {
    title: "Marmaris Pine Honey (Çam Balı)",
    desc: "Marmaris produces over 70% of the world's finest pine honey from the resin of indigenous Pinus brutia pine trees across surrounding national parks.",
    icon: Sun,
  },
  {
    title: "Handcrafted Mahogany Gulets",
    desc: "Marmaris is renowned globally as the premier capital of traditional wooden gulet yacht craftsmanship and idyllic Blue Cruise expeditions.",
    icon: Anchor,
  },
  {
    title: "Grand Bazaar & Old Quarter",
    desc: "A lively labyrinth of vaulted stone arches offering Turkish spices, natural olive oils, hand-painted Aegean ceramics, and silk textiles.",
    icon: Compass,
  },
];

export default function MarmarisPage() {
  const { locale, setLocale } = useLocale();
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const videoPrimarySrc =
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MARMARIS/Welcome%20to%20Marmaris%20(1).mp4";
  const videoFallbackSrc =
    "https://github.com/ryusoi/orkalotusmanus1/raw/main/MARMARIS/Welcome%20to%20Marmaris%20(1).mp4";

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      {/* Full-Screen Crisp Background Video Hero (No heavy filters) */}
      <section className="relative w-full h-[85vh] min-h-[580px] max-h-[920px] overflow-hidden bg-[#061a28] flex items-end pb-12 sm:pb-16 select-none">
        {!videoError ? (
          <video
            ref={videoRef}
            src={videoPrimarySrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            onError={() => {
              if (
                videoRef.current &&
                videoRef.current.src !== videoFallbackSrc
              ) {
                videoRef.current.src = videoFallbackSrc;
                void videoRef.current.play().catch(() => {});
              } else {
                setVideoError(true);
              }
            }}
          >
            <source src={videoPrimarySrc} type="video/mp4" />
            <source src={videoFallbackSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src="https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MARMARIS/ICMELER%20TOWN.webp"
            alt="Marmaris Skyline"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Subtle Bottom Vignette for Crisp Text Readability without Altering Video Quality */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Hero Content Overlay */}
        <div className="container relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#e8c883] font-bold mb-3">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white/90">Marmaris Guide</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white/90 mb-3">
              <Sparkles size={13} className="text-[#e8c883]" />
              <span>Aegean &amp; Mediterranean Destination</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white leading-[1.05] drop-shadow-md">
              Welcome to <em>Marmaris</em>
            </h1>

            <p className="text-sm sm:text-base text-white/90 mt-4 leading-relaxed max-w-2xl drop-shadow">
              Where emerald pine forests tumble down to meet crystal turquoise
              waters. Discover historic Ottoman ramparts, idyllic sailing coves,
              and 650 meters of pristine Aegean beachfront.
            </p>
          </div>
        </div>

        {/* Small Transparent Speaker Button on the Bottom Right Edge Corner */}
        <div className="absolute right-5 bottom-6 sm:right-8 sm:bottom-8 z-20">
          <button
            type="button"
            onClick={toggleMute}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/35 hover:bg-black/65 backdrop-blur-md border border-white/35 hover:border-white text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg"
            aria-label={isMuted ? "Unmute Marmaris video" : "Mute video"}
            title={isMuted ? "Unmute video sound" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX size={18} className="text-white/90" />
            ) : (
              <Volume2 size={18} className="text-[#e8c883]" />
            )}
          </button>
        </div>
      </section>

      {/* Attractions Showcase with Full Image Collection */}
      <section className="section bg-[var(--paper)]">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="section-label">
              <span className="section-label-line" />
              Must-Visit Destinations
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[var(--ink)] mt-2">
              The Wonders of <em>Marmaris &amp; Beyond</em>
            </h2>
            <p className="text-sm text-[var(--ink-soft)] mt-3">
              Handpicked iconic locations, sailing routes, and ancient heritage
              sites easily accessible from Orka Lotus Beach.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ATTRACTIONS.map((att, idx) => (
              <article
                key={att.id || idx}
                className="bg-[var(--shell)] border border-[var(--line)] rounded-xl overflow-hidden flex flex-col hover:border-[var(--tide)] hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image Container with Natural Colors */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--ocean)]">
                  <img
                    src={att.image}
                    alt={att.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== att.fallbackImage) {
                        target.src = att.fallbackImage;
                      }
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-semibold border border-white/20">
                    {att.duration}
                  </div>
                  <div className="absolute top-3 right-3 bg-[var(--paper)]/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider text-[var(--ink)] border border-[var(--line)]">
                    {att.tag}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--tide)] flex items-center gap-1.5 mb-1.5">
                      <MapPin size={12} /> {att.distance}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[var(--ink)] leading-snug">
                      {att.title}
                    </h3>
                    <p className="text-xs text-[var(--gold)] font-medium mt-0.5 mb-2">
                      {att.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed mt-2">
                      {att.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--line)] bg-[var(--paper)]/60 p-3.5 rounded-lg border border-[var(--line)]/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold)] block">
                      Concierge Insider Tip:
                    </span>
                    <p className="text-[11px] sm:text-xs text-[var(--ink)] mt-1 leading-normal">
                      {att.tips}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Google Satellite Map & Proximity Explorer */}
      <MarmarisGoogleMap />

      {/* Local Aegean Culture & Heritage Highlights */}
      <section className="section bg-[var(--ocean)] text-white">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e8c883] flex items-center gap-2">
              <Sparkles size={14} /> Living Aegean Heritage
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light mt-2">
              The Soul of the Turquoise Coast
            </h2>
            <p className="text-sm text-white/80 mt-3">
              Centuries of maritime tradition, pristine pine honey apiculture,
              and Turkish Riviera hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LOCAL_CULTURE.map((cul, idx) => {
              const Icon = cul.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-white/10 border border-white/15 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#e8c883]/20 flex items-center justify-center text-[#e8c883] mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-[#e8c883]">
                      {cul.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 mt-2 leading-relaxed">
                      {cul.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Concierge Action Box */}
          <div className="mt-12 p-6 sm:p-8 bg-black/25 border border-white/15 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#e8c883]">
                VIP Concierge &amp; Tour Desk
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">
                Plan Your Private Marmaris Excursion
              </h3>
              <p className="text-xs sm:text-sm text-white/75 mt-1 max-w-xl">
                Our guest experience team can arrange chauffeured luxury
                transfers, private yacht charters, and bespoke guided tours.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:4446752"
                className="px-5 py-3 rounded-lg bg-[#e8c883] hover:bg-white text-[#061a28] text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-md"
              >
                <Phone size={14} /> Call Concierge (Ext: 1000)
              </a>
              <Link
                href="/hotel-directory"
                className="px-5 py-3 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <Calendar size={14} /> View Directory
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
