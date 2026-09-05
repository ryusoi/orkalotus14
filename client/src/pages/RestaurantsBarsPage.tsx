import { useState } from "react";
import { Link } from "wouter";
import {
  Clock,
  Coffee,
  GlassWater,
  Info,
  MapPin,
  Sparkles,
  Utensils,
  Wine,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { useLocale } from "@/contexts/LocaleContext";
import {
  RestaurantBarCarousel,
  FullscreenImageViewer,
} from "@/components/Carousels";
import {
  restaurantBarGalleryImages,
  restaurantBarSectionCopy,
  type Locale,
} from "@/data/content";
import { diningFactSheetVenues, barsFactSheetVenues } from "@/data/factSheetData";

function getTxt(obj: Record<Locale, string>, loc: Locale): string {
  return obj[loc] || obj.en || "";
}

export default function RestaurantsBarsPage() {
  const { locale, setLocale } = useLocale();
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const labels = {
    en: {
      heroBreadcrumb: "Restaurants & Bars",
      heroTitle: "Gastronomy, A'La Carte & 9 Bars",
      diningSectionLabel: "Culinary Timetables",
      diningSectionHeading: "Dining Venues & Schedules",
      diningSectionDesc:
        "Authentic open buffet delicacies, poolside snacks, artisanal patisserie, and 3 specialty A'La Carte venues overlooking Marmaris Bay.",
      aLaCarteNote:
        "★ A'La Carte Privilege: Guests staying 7 nights or more enjoy 1 complimentary dinner at either Italian or Turkish A'La Carte (reservation required 1 day prior at Guest Relations). Chinese Garden is subject to a cover charge.",
      barsSectionLabel: "Ultra All-Inclusive Refreshments",
      barsSectionHeading: "9 Resort Bars & Sunset Lounges",
      barsSectionDesc:
        "Premium spirits, handcrafted mixologist cocktails, Turkish beers, and barista coffees across 9 distinct scenic venues.",
      gallerySectionLabel: "Atmosphere & Plates",
      gallerySectionHeading: "Restaurant & Bar Visual Gallery",
      gallerySectionDesc:
        "Glimpse the rich dining terraces, cocktail lounges, and dessert spreads.",
    },
    tr: {
      heroBreadcrumb: "Restoranlar ve Barlar",
      heroTitle: "Gastronomi, Alakart & 9 Bar",
      diningSectionLabel: "Mutfak Saatleri",
      diningSectionHeading: "Restoranlar ve Yemek Saatleri",
      diningSectionDesc:
        "Zengin açık büfe lezzetleri, havuz başı atıştırmalıkları, el yapımı pastane ürünleri ve Marmaris Körfezi manzaralı 3 özel alakart restoran.",
      aLaCarteNote:
        "★ Alakart Ayrıcalığı: 7 gece ve üzeri konaklayan misafirlerimiz İtalyan veya Türk Alakart restoranından 1 akşam yemeğini ücretsiz olarak deneyimleyebilir (1 gün önceden Misafir İlişkileri masasından rezervasyon gereklidir). Çin Restoranı ücretlidir.",
      barsSectionLabel: "Ultra Her Şey Dahil İçecekler",
      barsSectionHeading: "9 Farklı Tesis Barı ve Gün Batımı Salonu",
      barsSectionDesc:
        "Seçkin içkiler, imza kokteyller, soğuk içecekler ve barista kahveleri 9 farklı noktada hizmetinizdedir.",
      gallerySectionLabel: "Atmosfer ve Sunumlar",
      gallerySectionHeading: "Restoran ve Bar Fotoğraf Galerisi",
      gallerySectionDesc:
        "Teras restoranlarımızı, kokteyl salonlarımızı ve tatlı büfelerimizi inceleyin.",
    },
    ru: {
      heroBreadcrumb: "Рестораны и бары",
      heroTitle: "Гастрономия, A'La Carte и 9 баров",
      diningSectionLabel: "Кулинарное расписание",
      diningSectionHeading: "Рестораны и график питания",
      diningSectionDesc:
        "Богатый шведский стол, закуски у бассейна, авторская кондитерская и 3 ресторана A'La Carte с видом на залив Мармарис.",
      aLaCarteNote:
        "★ Привилегия A'La Carte: При проживании от 7 ночей гостям предоставляется 1 бесплатный ужин в итальянском или турецком ресторане (требуется бронирование за 1 день в отделе работы с гостями). Ресторан китайской кухни платный.",
      barsSectionLabel: "Концепция Ультра Все Включено",
      barsSectionHeading: "9 баров и лаунджей курорта",
      barsSectionDesc:
        "Премиальные напитки, авторские коктейли и свежесваренный кофе в 9 живописных локациях отеля.",
      gallerySectionLabel: "Атмосфера и блюда",
      gallerySectionHeading: "Фотогалерея ресторанов и баров",
      gallerySectionDesc:
        "Посмотрите на наши ресторанные террасы, коктейльные бары и десертные станции.",
    },
    de: {
      heroBreadcrumb: "Gastronomie & Bars",
      heroTitle: "Gastronomie, A'La Carte & 9 Bars",
      diningSectionLabel: "Kulinarische Zeiten",
      diningSectionHeading: "Restaurants & Betriebszeiten",
      diningSectionDesc:
        "Reichhaltiges Buffet, Snacks am Pool, handwerkliche Patisserie und 3 Spezialitäten-A'La Carte-Restaurants mit Blick auf die Bucht von Marmaris.",
      aLaCarteNote:
        "★ A'La Carte-Vorteil: Bei einem Aufenthalt ab 7 Nächten ist 1 Abendessen im italienischen oder türkischen Restaurant inklusive (Reservierung 1 Tag im Voraus bei der Gästebetreuung erforderlich). Das chinesische Restaurant ist kostenpflichtig.",
      barsSectionLabel: "Ultra All-Inclusive Getränkeservice",
      barsSectionHeading: "9 Resort-Bars & Sunset-Lounges",
      barsSectionDesc:
        "Ausgewählte Premium-Spirituosen, Signature-Cocktails und Kaffeespezialitäten an 9 verschiedenen Orten.",
      gallerySectionLabel: "Atmosphäre & Genuss",
      gallerySectionHeading: "Gastronomie- & Bar-Galerie",
      gallerySectionDesc:
        "Erleben Sie unsere Restaurantterrassen, Cocktail-Lounges und feine Desserts.",
    },
  }[locale];

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      {/* Subpage Hero */}
      <section className="subpage-hero relative overflow-hidden bg-gradient-to-b from-[#081824] via-[#0e2738] to-[#123044]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,159,87,0.18),transparent_60%)] pointer-events-none" />
        <div className="container subpage-hero-inner relative z-10">
          <div className="subpage-breadcrumbs flex items-center gap-2 text-xs text-white/60 mb-3">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--gold)]">{labels.heroBreadcrumb}</span>
          </div>

          <span className="subpage-eyebrow text-[#e8c883] font-bold">
            <span className="section-label-line" />
            {restaurantBarSectionCopy.eyebrow[locale]}
          </span>

          <h1 className="subpage-title font-serif text-4xl sm:text-6xl text-white font-normal mt-2 tracking-tight">
            Gastronomy, <em>A'La Carte &amp; 9 Bars</em>
          </h1>

          <p className="subpage-description text-white/85 text-base sm:text-lg mt-3 max-w-2xl font-light leading-relaxed">
            {restaurantBarSectionCopy.description[locale]}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/hotel-directory"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#dfba73] to-[#b8862d] text-[#0d2735] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg inline-flex items-center gap-2"
            >
              <Utensils size={15} />
              <span>View Full Fact Sheet Timetable</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Dining Venues & Schedules from Fact Sheet */}
      <section className="section bg-[var(--paper)]">
        <div className="container">
          <div className="max-w-3xl mb-8">
            <span className="section-label">
              <span className="section-label-line" />
              {labels.diningSectionLabel}
            </span>
            <h2 className="gold-headline text-3xl sm:text-4xl font-normal mt-2">
              {labels.diningSectionHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-2">
              {labels.diningSectionDesc}
            </p>
          </div>

          {/* Official A'La Carte Privilege Callout */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[rgba(200,159,87,0.12)] via-[rgba(200,159,87,0.05)] to-[rgba(200,159,87,0.12)] border border-[rgba(200,159,87,0.4)] mb-10 text-xs text-[var(--ink)] font-medium flex items-center gap-3">
            <Sparkles size={18} className="text-[var(--gold)] flex-shrink-0" />
            <span>{labels.aLaCarteNote}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diningFactSheetVenues.map((venue, idx) => (
              <article
                key={idx}
                className="gold-frame-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(200,159,87,0.3)]">
                    <span className="font-serif text-lg font-bold text-[var(--gold)]">
                      § {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="gold-tag-badge">
                      <Clock size={11} /> {venue.hours.split("/")[0].trim()}
                    </span>
                  </div>

                  <h3 className="gold-headline text-2xl font-semibold mb-1">
                    {getTxt(venue.name, locale)}
                  </h3>
                  <p className="text-xs text-[var(--ink-soft)] mb-4">
                    {getTxt(venue.type, locale)}
                  </p>

                  {venue.meals && (
                    <div className="space-y-1.5 my-3 p-3 rounded-lg bg-[var(--shell)] border border-[rgba(200,159,87,0.2)] text-xs">
                      {venue.meals.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="flex items-center justify-between text-[11px]"
                        >
                          <span className="font-medium text-[var(--ink)]">
                            {getTxt(m.meal, locale)}
                          </span>
                          <span className="font-mono text-[var(--gold)] font-bold">
                            {m.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[rgba(200,159,87,0.25)] text-[11px] text-[var(--ink-soft)]">
                  <span>{getTxt(venue.conceptNote, locale)}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9 Bars Fact Sheet Table Section */}
      <section className="section bg-[var(--shell)] border-t border-[rgba(200,159,87,0.25)]">
        <div className="container">
          <div className="max-w-3xl mb-8">
            <span className="section-label">
              <span className="section-label-line" />
              {labels.barsSectionLabel}
            </span>
            <h2 className="gold-headline text-3xl sm:text-4xl font-normal mt-2">
              {labels.barsSectionHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-2">
              {labels.barsSectionDesc}
            </p>
          </div>

          <div className="gold-table-container">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="gold-table-header-row">
                    <th className="p-3.5 pl-5">Bar Venue</th>
                    <th className="p-3.5">Operating Hours</th>
                    <th className="p-3.5 pr-5">Included Beverage Service</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(200,159,87,0.2)]">
                  {barsFactSheetVenues.map((bar, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[rgba(200,159,87,0.05)] transition-colors"
                    >
                      <td className="p-3.5 pl-5 font-semibold text-[var(--ink)]">
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                          {bar.name}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-[var(--gold)] whitespace-nowrap">
                        {bar.hours}
                      </td>
                      <td className="p-3.5 pr-5 text-[var(--ink-soft)] leading-relaxed">
                        {getTxt(bar.service, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Carousel */}
      <section className="section bg-[var(--paper)] border-t border-[rgba(200,159,87,0.25)]">
        <div className="container">
          <div className="section-heading-row mb-10">
            <div>
              <span className="section-label">
                <span className="section-label-line" />
                {labels.gallerySectionLabel}
              </span>
              <h2 className="gold-headline text-3xl sm:text-4xl font-normal mt-2">
                {labels.gallerySectionHeading}
              </h2>
            </div>
            <p className="section-lede text-xs sm:text-sm text-[var(--ink-soft)]">
              {labels.gallerySectionDesc}
            </p>
          </div>

          <div
            onClick={(e) => {
              const target = (e.target as HTMLElement).closest(
                "[data-lightbox-kind]"
              );
              if (target) {
                const idx = Number(
                  target.getAttribute("data-lightbox-index") || "0"
                );
                setViewerIndex(idx);
              }
            }}
          >
            <RestaurantBarCarousel locale={locale} />
          </div>
        </div>
      </section>

      {/* Fullscreen Photo Lightbox */}
      <FullscreenImageViewer
        images={restaurantBarGalleryImages}
        index={viewerIndex}
        label="Restaurant & Bar"
        onClose={() => setViewerIndex(null)}
        onChange={setViewerIndex}
      />
    </PageShell>
  );
}
