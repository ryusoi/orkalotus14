import { useState } from "react";
import { Link } from "wouter";
import {
  Compass,
  LifeBuoy,
  MapPin,
  Shield,
  Sun,
  Umbrella,
  Waves,
  Wind,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { useLocale } from "@/contexts/LocaleContext";

const POOL_ZONES = [
  {
    name: "Private Blue Flag Shoreline & Piers",
    image:
      "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/beach_800x1200.jpg",
    depth: "Sea / Natural Shoreline",
    hours: "08:00 – 19:00 (Lifeguard on duty)",
    description:
      "A 650-meter private stretch of tranquil Aegean sand and pebbles, bordered by emerald pine hills. Features two wooden sunbathing piers extending over crystalline waters, comfortable sunbeds, parasols, and full beach bar service.",
    highlights: ["Blue Flag Certified", "Two Wooden Piers", "Beach Bar & Service", "VIP Sun Cabanas"],
  },
  {
    name: "Main Outdoor Lagoon Pool",
    image:
      "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/pools_800x1200.jpg",
    depth: "140 cm depth",
    hours: "08:00 – 19:00",
    description:
      "The expansive central pool surrounded by sun terraces, palm trees, and the Lotus pool bar. Host to daytime aqua gym, water polo, and relaxed sunbathing.",
    highlights: ["Large Swimming Area", "Adjacent Pool Bar", "Daily Aqua Aerobics", "Sun loungers & Umbrellas"],
  },
  {
    name: "Relax & Tranquil Pool (+16)",
    image:
      "https://www.orkalotusbeach.com/wp-content/uploads/2025/06/Relax-Pool_1200x800-800x533.jpg",
    depth: "140 cm depth",
    hours: "08:00 – 19:00",
    description:
      "An adults-only sanctuary positioned away from high-energy animation zones. Designed for peaceful book reading, gentle swimming, and quiet cocktail moments.",
    highlights: ["Adults Only Quiet Zone", "Pine Forest Shade", "Dedicated Relax Bar", "Plush Cushioned Loungers"],
  },
  {
    name: "Lotus Aqua Park & Waterslides",
    image:
      "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/aquapark_800x1200.jpg",
    depth: "120 cm pool landing depth",
    hours: "10:00 – 12:00 & 14:00 – 17:00",
    description:
      "High-energy aquatic excitement for guests of all ages featuring 5 multi-speed waterslides, splash chutes, and dedicated safety attendants.",
    highlights: ["5 Multi-Track Slides", "Supervised Landing Pools", "Adjacent Aqua Snack Bar", "Family Favorite"],
  },
  {
    name: "Twin Pools & Sun Terraces",
    image:
      "https://www.orkalotusbeach.com/wp-content/uploads/2025/06/Tween-Pools_1200x800-800x533.jpg",
    depth: "140 cm depth",
    hours: "08:00 – 19:00",
    description:
      "Dual scenic pools situated amidst fragrant pine gardens with connecting wooden footbridges and adjacent Twin Pool Bar refreshments.",
    highlights: ["Twin Pool Design", "Twin Pool Bar", "Lush Garden Setting", "Spacious Sun Decks"],
  },
  {
    name: "Indoor Heated Thermal Pool & Spa",
    image:
      "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/spa_800x1200.jpg",
    depth: "140 cm depth",
    hours: "09:00 – 20:00",
    description:
      "Situated inside the Lotus Spa wellness center, heated to optimal therapeutic temperature and offering glass-walled mountain garden views.",
    highlights: ["Heated Spring Water", "Direct Spa Access", "Jacuzzi Jet Loungers", "Year-round Serenity"],
  },
  {
    name: "Children's Splash & Slide Pool",
    image:
      "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/kaydirak1.jpg",
    depth: "40 cm safe shallow depth",
    hours: "08:00 – 19:00",
    description:
      "Shallow, shaded water playground designed specifically for toddlers and young children with mini animal slides and interactive water jets.",
    highlights: ["Shaded Canopy Cover", "Mini Fun Slides", "Ultra-safe Depth", "Near Mini Club"],
  },
];

const WATER_SPORTS = [
  {
    title: "Jet Ski Rental",
    desc: "Single and tandem high-performance Yamaha watercraft across Marmaris Bay.",
  },
  {
    title: "Parasailing Flight",
    desc: "Breathtaking panoramic bird's-eye views soaring 200 meters above the Aegean.",
  },
  {
    title: "Paddle Boarding & Kayak",
    desc: "Complimentary morning SUP boards and sea kayaks to explore hidden coves.",
  },
  {
    title: "Scuba Diving & Snorkeling",
    desc: "Certified PADI dive school excursions exploring Aegean reefs and marine life.",
  },
];

export default function PoolsBeachPage() {
  const { locale, setLocale } = useLocale();

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      {/* Subpage Hero */}
      <section className="subpage-hero">
        <div className="container subpage-hero-inner">
          <div className="subpage-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Pools &amp; Beach</span>
          </div>

          <span className="subpage-eyebrow">
            <span className="section-label-line" />
            Turquoise Waters &amp; Private Shoreline
          </span>

          <h1 className="subpage-title">
            Pools, Aqua Park &amp; <em>Private Beach</em>
          </h1>

          <p className="subpage-description">
            650 meters of pristine Aegean shoreline, two wooden sunbathing piers, 5 exhilarating waterslides, and dedicated relax pools tucked into pine forest hills.
          </p>
        </div>
      </section>

      {/* Pools & Beach Grid */}
      <section className="section bg-[var(--paper)]">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="section-label">
              <span className="section-label-line" />
              Aquatic Sanctuaries
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[var(--ink)] mt-2">
              Explore Our <em>Water Worlds</em>
            </h2>
            <p className="text-sm text-[var(--ink-soft)] mt-3">
              Whether you crave exhilarating waterslide drops or peaceful adults-only sunbathing, Orka Lotus Beach offers dedicated spaces for every mood.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POOL_ZONES.map((zone, idx) => (
              <div
                key={idx}
                className="bg-[var(--shell)] border border-[var(--line)] rounded-xl overflow-hidden flex flex-col hover:border-[var(--tide)] hover:shadow-lg transition-all group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--ocean)]">
                  <img
                    src={zone.image}
                    alt={zone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/pools_800x1200.jpg";
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-semibold border border-white/20">
                    {zone.depth}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--tide)] flex items-center gap-1.5 mb-1">
                      <Sun size={12} /> {zone.hours}
                    </span>
                    <h3 className="font-serif text-2xl font-medium text-[var(--ink)]">
                      {zone.name}
                    </h3>
                    <p className="text-xs text-[var(--ink-soft)] leading-relaxed mt-2">
                      {zone.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--line)] flex flex-wrap gap-1.5">
                    {zone.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-[var(--paper)] text-[var(--ink)] rounded border border-[var(--line)]"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Water Sports Center */}
      <section className="section bg-[var(--ocean)] text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#e8c883]">
                Aegean Water Sports Center
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-light mt-2">
                Thrills on the Turquoise Sea
              </h2>
              <p className="text-sm text-white/80 mt-4 leading-relaxed">
                Operated by certified maritime professionals right from our beachfront jetty. Experience adrenaline-pumping jet ski runs, parasailing above the mountains, or peaceful morning paddleboarding.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs text-[#e8c883]">
                <Shield size={16} /> Certified equipment &amp; life jackets provided for all activities
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WATER_SPORTS.map((sport, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white/10 border border-white/15 rounded-lg backdrop-blur-sm"
                >
                  <h3 className="font-serif text-xl font-medium text-[#e8c883]">
                    {sport.title}
                  </h3>
                  <p className="text-xs text-white/80 mt-2 leading-relaxed">
                    {sport.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Towel Service & Beach Etiquette Guide */}
      <section className="section bg-[var(--shell)] border-t border-[var(--line)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-label justify-center">
              <span className="section-label-line" />
              Beach Comfort Guide
              <span className="section-label-line" />
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[var(--ink)] mt-2">
              Towel Service &amp; Sunbed Etiquette
            </h2>
            <p className="text-xs text-[var(--ink-soft)] mt-3 leading-relaxed">
              Towel cards are issued upon check-in. Fresh beach towels can be picked up and exchanged daily at the Towel Kiosk located beside the main pool and beachfront (08:30 – 19:00). Sun loungers and umbrellas are complimentary for all hotel guests.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
