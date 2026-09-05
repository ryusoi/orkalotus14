import { useState } from "react";
import { Link } from "wouter";
import {
  Calendar,
  Clock,
  Dumbbell,
  Heart,
  Music,
  Phone,
  Sparkles,
  Sun,
  Waves,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { useLocale } from "@/contexts/LocaleContext";
import {
  ActivitiesCarousel,
  SpaCarousel,
  MiniClubCarousel,
  KidsActivitySchedule,
  FullscreenImageViewer,
} from "@/components/Carousels";
import {
  activitiesGalleryImages,
  spaGalleryImages,
  miniClubGalleryImages,
  activitiesSectionCopy,
  spaSectionCopy,
  miniClubSectionCopy,
  activities,
  type Locale,
} from "@/data/content";

const SPA_TREATMENTS = [
  {
    title: "Authentic Turkish Hammam & Scrub",
    duration: "45 / 60 Min",
    description:
      "A centuries-old cleansing ritual on heated marble stone. Includes full-body silk glove peeling (kese) followed by rich olive-oil cloud foam massage.",
    badge: "Signature Ritual",
  },
  {
    title: "Deep Tissue & Balinese Massage",
    duration: "50 / 80 Min",
    description:
      "Combining acupressure, gentle stretching, and therapeutic Aegean aromatic oils to release muscle tension and restore full vitality.",
    badge: "Most Popular",
  },
  {
    title: "Volcanic Hot Stone Therapy",
    duration: "75 Min",
    description:
      "Heated basalt stones placed along chakra energy centers combined with flowing rhythmic strokes to induce deep cellular relaxation.",
    badge: "Thermal Relax",
  },
  {
    title: "Lotus Radiance Organic Facial",
    duration: "50 Min",
    description:
      "Restorative organic botanical extracts and marine collagen to hydrate, firm, and protect skin from Mediterranean sun exposure.",
    badge: "Skin Care",
  },
];

export default function ActivitiesSpaPage() {
  const { locale, setLocale } = useLocale();
  const [activeTab, setActiveTab] = useState<"spa" | "activities" | "kids">(
    "spa"
  );
  const [lightboxKind, setLightboxKind] = useState<
    "activities" | "spa" | "miniClub" | null
  >(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const getActiveGallery = () => {
    if (lightboxKind === "spa") return spaGalleryImages;
    if (lightboxKind === "miniClub") return miniClubGalleryImages;
    return activitiesGalleryImages;
  };

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      {/* Subpage Hero */}
      <section className="subpage-hero">
        <div className="container subpage-hero-inner">
          <div className="subpage-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Activities &amp; Spa</span>
          </div>

          <span className="subpage-eyebrow">
            <span className="section-label-line" />
            Wellness, Movement &amp; Vitality
          </span>

          <h1 className="subpage-title">
            Lotus Spa, <em>Wellness &amp; Daily Life</em>
          </h1>

          <p className="subpage-description">
            From the tranquil warmth of our Turkish bath to beachfront yoga, water aerobics, and vibrant evening shows — immerse in revitalizing Aegean energy.
          </p>

          {/* Section Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-4">
            <button
              onClick={() => setActiveTab("spa")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === "spa"
                  ? "bg-[var(--ocean)] text-white shadow-md"
                  : "bg-[var(--paper)] text-[var(--ink-soft)] border border-[var(--line)] hover:text-[var(--ink)]"
              }`}
            >
              <Sparkles size={14} /> Lotus Spa &amp; Hammam
            </button>
            <button
              onClick={() => setActiveTab("activities")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === "activities"
                  ? "bg-[var(--ocean)] text-white shadow-md"
                  : "bg-[var(--paper)] text-[var(--ink-soft)] border border-[var(--line)] hover:text-[var(--ink)]"
              }`}
            >
              <Sun size={14} /> Resort Activities &amp; Fitness
            </button>
            <button
              onClick={() => setActiveTab("kids")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === "kids"
                  ? "bg-[var(--ocean)] text-white shadow-md"
                  : "bg-[var(--paper)] text-[var(--ink-soft)] border border-[var(--line)] hover:text-[var(--ink)]"
              }`}
            >
              <Heart size={14} /> Mini Club &amp; Kids Entertainment
            </button>
          </div>
        </div>
      </section>

      {/* Tab 1: Spa Showcase */}
      {activeTab === "spa" && (
        <>
          <section className="section bg-[var(--paper)]">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
                <div className="lg:col-span-6">
                  <span className="section-label">
                    <span className="section-label-line" />
                    {spaSectionCopy.eyebrow[locale]}
                  </span>
                  <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[var(--ink)] mt-2">
                    {spaSectionCopy.title[locale]}
                  </h2>
                  <p className="text-sm text-[var(--ink-soft)] mt-4 leading-relaxed">
                    {spaSectionCopy.description[locale]}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[var(--line)]">
                    <div className="p-4 bg-[var(--shell)] rounded-lg">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--tide)] block">
                        Thermal Area
                      </span>
                      <p className="text-xs text-[var(--ink)] mt-1">
                        Sauna, Steam Bath &amp; Heated Indoor Thermal Pool
                      </p>
                    </div>
                    <div className="p-4 bg-[var(--shell)] rounded-lg">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--tide)] block">
                        Operating Hours
                      </span>
                      <p className="text-xs text-[var(--ink)] mt-1">
                        Daily from 09:00 to 20:00
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a
                      href="tel:4446752"
                      className="px-6 py-3 bg-[var(--ocean)] hover:bg-[var(--tide)] text-white text-xs font-bold uppercase tracking-widest rounded transition-colors inline-flex items-center gap-2"
                    >
                      <Phone size={14} /> Book Spa Treatment (Ext: 1800)
                    </a>
                  </div>
                </div>

                <div
                  className="lg:col-span-6"
                  onClick={() => {
                    setLightboxKind("spa");
                    setLightboxIndex(0);
                  }}
                >
                  <SpaCarousel locale={locale} />
                </div>
              </div>

              {/* Treatment Menu Highlights */}
              <div className="mt-12">
                <h3 className="font-serif text-3xl font-normal text-[var(--ink)] mb-8">
                  Featured Treatment Rituals
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {SPA_TREATMENTS.map((treat, idx) => (
                    <div
                      key={idx}
                      className="p-6 bg-[var(--shell)] border border-[var(--line)] rounded-lg flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-[var(--gold)] text-white rounded-full">
                            {treat.badge}
                          </span>
                          <span className="text-xs font-semibold text-[var(--ink-soft)] flex items-center gap-1">
                            <Clock size={13} /> {treat.duration}
                          </span>
                        </div>
                        <h4 className="font-serif text-2xl font-medium text-[var(--ink)] mt-2">
                          {treat.title}
                        </h4>
                        <p className="text-xs text-[var(--ink-soft)] mt-2 leading-relaxed">
                          {treat.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Tab 2: Activities & Fitness */}
      {activeTab === "activities" && (
        <>
          <section className="section bg-[var(--paper)]">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
                <div className="lg:col-span-6">
                  <span className="section-label">
                    <span className="section-label-line" />
                    {activitiesSectionCopy.eyebrow[locale]}
                  </span>
                  <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[var(--ink)] mt-2">
                    {activitiesSectionCopy.title[locale]}
                  </h2>
                  <p className="text-sm text-[var(--ink-soft)] mt-4 leading-relaxed">
                    {activitiesSectionCopy.description[locale]}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-8">
                    <div className="flex items-center gap-3 p-3 bg-[var(--shell)] rounded-lg border border-[var(--line)]">
                      <Dumbbell size={20} className="text-[var(--tide)]" />
                      <div>
                        <strong className="text-xs text-[var(--ink)] block">
                          Fitness Centre
                        </strong>
                        <span className="text-[11px] text-[var(--ink-soft)]">
                          08:00 – 20:00 · Technogym
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-[var(--shell)] rounded-lg border border-[var(--line)]">
                      <Music size={20} className="text-[var(--tide)]" />
                      <div>
                        <strong className="text-xs text-[var(--ink)] block">
                          Night Shows &amp; Live Music
                        </strong>
                        <span className="text-[11px] text-[var(--ink-soft)]">
                          Amphitheatre &amp; Beach Stage
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="lg:col-span-6"
                  onClick={() => {
                    setLightboxKind("activities");
                    setLightboxIndex(0);
                  }}
                >
                  <ActivitiesCarousel />
                </div>
              </div>

              {/* Today's Activities List */}
              <div className="mt-8 pt-8 border-t border-[var(--line)]">
                <h3 className="font-serif text-3xl font-normal text-[var(--ink)] mb-6">
                  Daily Activity Schedule
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activities.slice(0, 6).map((act) => (
                    <div
                      key={act.id}
                      className="p-5 bg-[var(--shell)] border border-[var(--line)] rounded-lg flex items-start gap-4"
                    >
                      <span className="font-serif text-2xl font-light text-[var(--tide)]">
                        {act.start}
                      </span>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[var(--gold)] tracking-wider block">
                          {act.location}
                        </span>
                        <h4 className="font-serif text-lg font-medium text-[var(--ink)] mt-0.5">
                          {act.title[locale] || act.title.en}
                        </h4>
                        <p className="text-xs text-[var(--ink-soft)] mt-1">
                          {act.description[locale] || act.description.en}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Tab 3: Mini Club */}
      {activeTab === "kids" && (
        <>
          <section className="section bg-[var(--paper)]">
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
                <div className="lg:col-span-6">
                  <span className="section-label">
                    <span className="section-label-line" />
                    {miniClubSectionCopy.eyebrow[locale]}
                  </span>
                  <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[var(--ink)] mt-2">
                    {miniClubSectionCopy.title[locale]}
                  </h2>
                  <p className="text-sm text-[var(--ink-soft)] mt-4 leading-relaxed">
                    {miniClubSectionCopy.description[locale]}
                  </p>
                  <p className="text-xs text-[var(--ink-soft)] mt-2">
                    Age Group: <strong>{miniClubSectionCopy.age[locale]}</strong> · Hours: <strong>{miniClubSectionCopy.hours}</strong>
                  </p>
                </div>

                <div
                  className="lg:col-span-6"
                  onClick={() => {
                    setLightboxKind("miniClub");
                    setLightboxIndex(0);
                  }}
                >
                  <MiniClubCarousel locale={locale} />
                </div>
              </div>

              {/* Weekly Schedule */}
              <div className="mt-8">
                <KidsActivitySchedule locale={locale} />
              </div>
            </div>
          </section>
        </>
      )}

      {/* Lightbox */}
      <FullscreenImageViewer
        images={getActiveGallery()}
        index={lightboxIndex}
        label={lightboxKind || "Gallery"}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </PageShell>
  );
}
