import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Award,
  Bed,
  Check,
  CheckCircle2,
  Clock,
  Coffee,
  Compass,
  FileSpreadsheet,
  FileText,
  GlassWater,
  HelpCircle,
  Info,
  Layers,
  MapPin,
  Maximize,
  Moon,
  Phone,
  Plane,
  Search,
  Shield,
  ShieldAlert,
  Sparkles,
  Sun,
  Tv,
  Umbrella,
  Users,
  Utensils,
  Waves,
  Wifi,
  Wind,
  XCircle,
  ZoomIn,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/data/content";
import {
  factSheetGeneralData,
  factSheetRoomsMatrix,
  diningFactSheetVenues,
  barsFactSheetVenues,
  facilitiesAndUnitsTimetable,
  includedServicesList,
  extraChargeServicesList,
  importantNotesFactSheet,
} from "@/data/factSheetData";
import InteractiveFactSheetViewer from "@/components/InteractiveFactSheetViewer";

function getTxt(obj: Record<Locale, string>, loc: Locale): string {
  return obj[loc] || obj.en || "";
}

export const directoryQuickLinks: Array<{
  id: string;
  title: Record<Locale, string>;
  detail: Record<Locale, string>;
  href: string;
}> = [
  {
    id: "dir-01",
    title: { en: "Rooms & Suites", tr: "Odalar ve Süitler", ru: "Номера и сьюты", de: "Zimmer & Suiten" },
    detail: {
      en: "441 Rooms · 24–40 m² · Sea & land views · 9 Blocks",
      tr: "441 Oda · 24–40 m² · Deniz ve kara manzarası · 9 Blok",
      ru: "441 номер · 24–40 м² · Вид на море и горы · 9 корпусов",
      de: "441 Zimmer · 24–40 m² · Meer- & Bergblick · 9 Blöcke",
    },
    href: "/rooms-services",
  },
  {
    id: "dir-02",
    title: { en: "Pools & 1km Beach", tr: "Havuzlar ve 1km Plaj", ru: "Бассейны и 1 км пляж", de: "Pools & 1km Strand" },
    detail: {
      en: "1 km sandy beach · 6 Aquapark slides · 4 outdoor + 1 indoor pools",
      tr: "1 km özel kumsal · 6 Su kaydırağı · 4 açık + 1 kapalı havuz",
      ru: "1 км частный пляж · Аквапарк 6 горок · 4 открытых + 1 крытый бассейн",
      de: "1 km Sandstrand · 6 Rutschen Aquapark · 4 Außenpools + 1 Hallenbad",
    },
    href: "/pools-beach",
  },
  {
    id: "dir-03",
    title: { en: "Dining & 9 Bars", tr: "Restoranlar ve 9 Bar", ru: "Рестораны и 9 баров", de: "Gastronomie & 9 Bars" },
    detail: {
      en: "Pine buffet · 3 A'La Carte · 24h Lobby Bar · Patisserie",
      tr: "Pine açık büfe · 3 Alakart · 24 Saat Lobi Bar · Pastane",
      ru: "Шведский стол Pine · 3 A'La Carte · Круглосуточный бар · Кондитерская",
      de: "Pine Buffet · 3 A'La Carte · 24h Lobbybar · Patisserie",
    },
    href: "/restaurants-bars",
  },
  {
    id: "dir-04",
    title: { en: "Spa & Wellness", tr: "Spa ve Sağlık", ru: "Спа и велнес", de: "Spa & Wellness" },
    detail: {
      en: "Turkish hammam · Sauna & steam · Heated indoor pool · Vitamin bar",
      tr: "Türk hamamı · Sauna & buhar · Isıtmalı kapalı havuz · Vitamin bar",
      ru: "Турецкий хамам · Сауна и парная · Крытый бассейн · Витамин-бар",
      de: "Türkisches Bad · Sauna & Dampfbad · Beheizter Innenpool · Vitaminbar",
    },
    href: "/activities-spa",
  },
  {
    id: "dir-05",
    title: { en: "Water Sports & Cabanas", tr: "Su Sporları ve Kabanalar", ru: "Водный спорт и кабаны", de: "Wassersport & Cabanas" },
    detail: {
      en: "Jet car, jet ski, parasailing · VIP overwater cabanas",
      tr: "Jet car, jet ski, parasailing · VIP sahil kabanaları",
      ru: "Гидроциклы, флайборд, парасейлинг · VIP кабаны на пляже",
      de: "Jetski, Parasailing, Flyboard · VIP-Überwassercabanas",
    },
    href: "/watersports",
  },
  {
    id: "dir-06",
    title: { en: "Kids Mini Club", tr: "Çocuk Kulübü", ru: "Детский мини-клуб", de: "Kinder-Miniclub" },
    detail: {
      en: "Supervised play · Splash pool · Face painting · Mini disco",
      tr: "Gözetimli oyunlar · Splash havuzu · Yüz boyama · Mini disko",
      ru: "Детский бассейн · Игровая комната · Анимация · Мини-диско",
      de: "Betreute Spiele · Splash-Pool · Kinderschminken · Minidisco",
    },
    href: "/activities-spa",
  },
  {
    id: "dir-07",
    title: { en: "Management & Care", tr: "Yönetim ve İletişim", ru: "Руководство и сервис", de: "Management & Service" },
    detail: {
      en: "24/7 Front desk · Concierge directors · Guest relations",
      tr: "7/24 Resepsiyon · Konsiyerj · Misafir ilişkileri",
      ru: "Круглосуточный ресепшн · Консьерж · Работа с гостями",
      de: "24/7 Rezeption · Concierge · Gästebetreuung",
    },
    href: "/management-personnel",
  },
  {
    id: "dir-08",
    title: { en: "Icon Beach Club", tr: "Icon Beach Club", ru: "Icon Beach Club", de: "Icon Beach Club" },
    detail: {
      en: "VIP sunbed cabanas · Live DJ sunset sessions · Handcrafted drinks",
      tr: "VIP localar · Gün batımı DJ performansları · Kokteyller",
      ru: "VIP-беседки · DJ-сеты на закате · Авторские напитки",
      de: "VIP-Cabanas · Sunset-DJ-Sessions · Handgefertigte Drinks",
    },
    href: "/icon-beach",
  },
];

export const directoryDetailedGuides: Array<{
  id: string;
  title: Record<Locale, string>;
  hours: string;
  location: Record<Locale, string>;
  extension: string;
  description: Record<Locale, string>;
}> = [
  {
    id: "guide-01",
    title: { en: "Guest Relations & Concierge", tr: "Misafir İlişkileri ve Konsiyerj", ru: "Отдел по работе с гостями и консьерж", de: "Gästebetreuung & Concierge" },
    hours: "08:00 – 23:00",
    location: { en: "Main Lobby, Desk 2", tr: "Ana Lobi, Masa 2", ru: "Главный лобби, стойка 2", de: "Hauptlobby, Schalter 2" },
    extension: "7001 / 7002",
    description: {
      en: "A'La Carte restaurant reservations, honeymoon & anniversary arrangements, private yacht charters, VIP transfers, and excursion bookings.",
      tr: "Alakart restoran rezervasyonları, balayı ve yıldönümü jestleri, özel yat turları, VIP transferler ve tur organizasyonları.",
      ru: "Бронирование ресторанов A'La Carte, поздравления с годовщиной и медовым месяцем, аренда яхт и трансферы.",
      de: "A'La Carte-Reservierungen, Arrangements für Flitterwochen, VIP-Transfers und Ausflugsbuchungen.",
    },
  },
  {
    id: "guide-02",
    title: { en: "Front Desk & Reception", tr: "Resepsiyon ve Ön Büro", ru: "Служба приема и размещения (Ресепшн)", de: "Rezeption & Empfang" },
    hours: "24 Hours (Open 24/7)",
    location: { en: "Main Entrance Building", tr: "Ana Giriş Binası", ru: "Главный корпус входа", de: "Hauptempfangsgebäude" },
    extension: "0 / 9",
    description: {
      en: "Check-in (15:00), Check-out (11:00), luggage bellboy assistance, safe box keys, currency exchange, room upgrades, and express assistance.",
      tr: "Giriş (15:00), Çıkış (11:00), bavul taşıma, kasa anahtarı, döviz işlemleri, oda yükseltme ve acil destek.",
      ru: "Заезд (15:00), выезд (11:00), доставка багажа, обмен валюты, повышение категории номера.",
      de: "Check-in (15:00), Check-out (11:00), Gepäckservice, Devisenwechsel, Zimmer-Upgrades und 24h-Service.",
    },
  },
  {
    id: "guide-03",
    title: { en: "Housekeeping & Laundry Desk", tr: "Kat Hizmetleri ve Çamaşırhane", ru: "Служба уборки и прачечная", de: "Housekeeping & Wäscheservice" },
    hours: "08:30 – 17:30",
    location: { en: "Resort Service Ground Floor", tr: "Zemin Kat Servis Alanı", ru: "Сервисный этаж", de: "Service-Ebene Erdgeschoss" },
    extension: "7040",
    description: {
      en: "Daily linen change, extra pillows from pillow menu, baby cot setup, daily minibar restock, laundry and dry cleaning services.",
      tr: "Günlük çarşaf değişimi, yastık menüsü, bebek yatağı, günlük minibar yenileme ve çamaşır yıkama hizmeti.",
      ru: "Ежедневная смена белья, меню подушек, детские кроватки, пополнение мини-бара и стирка.",
      de: "Täglicher Bettwäschewechsel, Kissenmenü, Babybetten, Minibar-Auffüllung und Wäscheservice.",
    },
  },
  {
    id: "guide-04",
    title: { en: "Lotus Spa & Wellness Reception", tr: "Lotus Spa & Sağlık Merkezi Danışma", ru: "Ресепшн спа-центра Lotus", de: "Lotus Spa & Wellness Empfang" },
    hours: "09:00 – 19:00",
    location: { en: "B Block, Level -1", tr: "B Blok, -1. Kat", ru: "Корпус B, уровень -1", de: "B-Block, Ebene -1" },
    extension: "7065",
    description: {
      en: "Free Turkish bath, sauna, steam room, heated indoor pool. Appointments for Far Eastern massages, skin care, and hamam foam therapies.",
      tr: "Ücretsiz Türk hamamı, sauna, buhar odası, kapalı havuz. Uzak Doğu masajları, cilt bakımı ve kese-köpük randevuları.",
      ru: "Бесплатный хамам, сауна, парная, закрытый бассейн. Запись на массажи и косметические процедуры.",
      de: "Kostenloses Hamam, Sauna, Dampfbad, Hallenbad. Termine für Massagen, Kosmetik und Schaummassagen.",
    },
  },
  {
    id: "guide-05",
    title: { en: "Medical Clinic & First Aid", tr: "Revir ve Doktor Hizmeti", ru: "Медицинский пункт и дежурный врач", de: "Arztzimmer & Erste Hilfe" },
    hours: "24 Hours On-Call",
    location: { en: "A Block, Lobby Adjacent", tr: "A Blok Lobi Yanı", ru: "Корпус A, рядом с лобби", de: "A-Block, neben der Lobby" },
    extension: "7011",
    description: {
      en: "First aid emergency care, licensed nursing assistance, on-call resort doctor consultations, and international insurance billing coordination.",
      tr: "Acil ilk yardım, diplomalı hemşire, nöbetçi otel doktoru muayenesi ve uluslararası sigorta işlemleri.",
      ru: "Первая медицинская помощь, медсестра, вызов врача 24/7 и работа со страховыми компаниями.",
      de: "Erste Hilfe, diplomiertes Pflegepersonal, Rufbereitschaft von Hotelärzten und Versicherungskoordination.",
    },
  },
  {
    id: "guide-06",
    title: { en: "High-Speed Wi-Fi & IT Support", tr: "Wi-Fi ve Teknik Destek", ru: "Высокоскоростной Wi-Fi и техподдержка", de: "Highspeed-WLAN & Technischer Support" },
    hours: "24 Hours Active",
    location: { en: "Resort-Wide Network: ORKA_LOTUS_GUEST", tr: "Tüm Tesis: ORKA_LOTUS_GUEST", ru: "По всей территории: ORKA_LOTUS_GUEST", de: "Anlagenweit: ORKA_LOTUS_GUEST" },
    extension: "7022",
    description: {
      en: "Free high-speed Wi-Fi in all 441 rooms, lobbies, pool terraces, and across the 1 km private beach. Technical support for room smart TV and air conditioning.",
      tr: "441 odanın tamamında, lobilerde, havuzlarda ve 1 km sahilde ücretsiz yüksek hızlı internet. TV ve klima teknik desteği.",
      ru: "Бесплатный интернет во всех номерах, у бассейнов и на пляже 1 км. Поддержка ТВ и климат-контроля.",
      de: "Kostenloses Highspeed-WLAN in allen Zimmern, Pools und am 1km Strand. Technischer Support für Smart-TV und Klimaanlage.",
    },
  },
];

export default function HotelDirectoryPage() {
  const { locale, setLocale } = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "facts" | "concept" | "dining" | "units" | "rooms" | "rules"
  >("all");
  const [isFactSheetViewerOpen, setIsFactSheetViewerOpen] = useState(false);

  const roomsChartImageUrl =
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/Rooms%20Information.png";

  const labels = {
    en: {
      heroLabel: "Official Hotel Fact Sheet & Guest Directory",
      heroTitle: "Hotel Directory & Fact Sheet",
      heroDesc:
        "Comprehensive 5-Star luxury resort directory: facility parameters, ultra all-inclusive schedules, accommodation matrix, and operational policies for Orka Lotus Beach.",
      searchPlaceholder: "Search resort facts, dining times, bars, rules, or room dimensions...",
      tabs: {
        all: "All Fact Sheet Data",
        facts: "General Facts & Distances",
        concept: "All-Inclusive Concept",
        dining: "Restaurants & 9 Bars",
        units: "Facilities & Timetable",
        rooms: "441 Rooms Matrix",
        rules: "Important Regulations",
      },
      openChartBtn: "Open Official Rooms Chart (Zoom & Pan)",
      distancesTitle: "Airports & Regional Distances",
      placesTitle: "Places of Interest & Excursions",
      includedTitle: "Included Services (All-Inclusive Concept)",
      extraTitle: "Services with Extra Charge",
      diningTitle: "Dining Schedules & A'La Carte Rules",
      barsTitle: "9 Bars & Beverage Services",
      unitsTitle: "Units & Operational Timetable",
      roomsTitle: "9 Room Categories & Specification Matrix",
      rulesTitle: "Important Regulations & Hotel Policies",
      contactsTitle: "24/7 Guest Care Desk & Quick Dial",
      tableHeaders: {
        roomType: "Room Category",
        size: "Size (m²)",
        view: "View & Location",
        balcony: "Balcony / Terrace",
        features: "Amenities & Features Included",
      },
    },
    tr: {
      heroLabel: "Resmi Otel Bilgi Formu & Misafir Rehberi",
      heroTitle: "Otel Rehberi ve Fact Sheet",
      heroDesc:
        "Orka Lotus Beach 5 yıldızlı lüks tesis rehberi: tesis özellikleri, ultra her şey dahil saatleri, oda özellikleri matrisi ve otel kuralları.",
      searchPlaceholder: "Tesis bilgileri, restoran saatleri, barlar, kurallar veya oda tiplerinde ara...",
      tabs: {
        all: "Tüm Fact Sheet Verileri",
        facts: "Genel Bilgiler & Mesafeler",
        concept: "Her Şey Dahil Konsepti",
        dining: "Restoranlar & 9 Bar",
        units: "Tesisler & Çalışma Saatleri",
        rooms: "441 Oda Matrisi",
        rules: "Önemli Kurallar",
      },
      openChartBtn: "Resmi Oda Şemasını Aç (Yakınlaştır & İncele)",
      distancesTitle: "Havalimanları ve Çevre Mesafeleri",
      placesTitle: "Gezilecek Yerler ve Turlar",
      includedTitle: "Karta Dahil Ücretsiz Hizmetler (Her Şey Dahil)",
      extraTitle: "Ücretli Hizmetler",
      diningTitle: "Restoran Saatleri & Alakart Kuralları",
      barsTitle: "9 Bar ve İçecek Servisi Saatleri",
      unitsTitle: "Tesis Üniteleri ve Çalışma Saatleri",
      roomsTitle: "9 Farklı Oda Tipi ve Donanım Tablosu",
      rulesTitle: "Önemli Kurallar ve Otel Politikaları",
      contactsTitle: "7/24 Misafir Destek Masası ve Dahili Hatlar",
      tableHeaders: {
        roomType: "Oda Tipi",
        size: "Boyut (m²)",
        view: "Manzara & Konum",
        balcony: "Balkon / Teras",
        features: "Dahil Olan Donanım & Özellikler",
      },
    },
    ru: {
      heroLabel: "Официальный информационный лист и справочник гостя",
      heroTitle: "Справочник отеля и Fact Sheet",
      heroDesc:
        "Полный справочник 5-звездочного отеля Orka Lotus Beach: параметры курорта, расписание ультра все включено, матрица номеров и правила проживания.",
      searchPlaceholder: "Поиск по услугам, часам работы ресторанов, барам, номерам и правилам...",
      tabs: {
        all: "Все данные Fact Sheet",
        facts: "Общие данные и расстояния",
        concept: "Концепция «Все включено»",
        dining: "Рестораны и 9 баров",
        units: "Инфраструктура и график",
        rooms: "Матрица 441 номера",
        rules: "Важные правила",
      },
      openChartBtn: "Открыть схему номеров (Масштабирование)",
      distancesTitle: "Аэропорты и расстояния",
      placesTitle: "Достопримечательности и экскурсии",
      includedTitle: "Включенные услуги (Концепция «Все включено»)",
      extraTitle: "Услуги за дополнительную плату",
      diningTitle: "Расписание питания и правила A'La Carte",
      barsTitle: "9 Баров и концепция напитков",
      unitsTitle: "Инфраструктура и часы работы",
      roomsTitle: "Матрица 9 категорий номеров",
      rulesTitle: "Важные правила и регламент отеля",
      contactsTitle: "Круглосуточная поддержка гостей и телефоны",
      tableHeaders: {
        roomType: "Категория номера",
        size: "Площадь (м²)",
        view: "Вид и расположение",
        balcony: "Балкон / Терраса",
        features: "Включенные удобства и оснащение",
      },
    },
    de: {
      heroLabel: "Offizielles Fact Sheet & Gästeverzeichnis",
      heroTitle: "Hotelverzeichnis & Fact Sheet",
      heroDesc:
        "Umfassendes Verzeichnis des 5-Sterne-Resorts Orka Lotus Beach: Resort-Parameter, Ultra All-Inclusive-Zeiten, Zimmerspezifikationen und Richtlinien.",
      searchPlaceholder: "Resort-Fakten, Restaurantzeiten, Bars, Zimmer oder Regeln suchen...",
      tabs: {
        all: "Alle Fact Sheet Daten",
        facts: "Allgemeine Fakten & Entfernungen",
        concept: "All-Inclusive-Konzept",
        dining: "Gastronomie & 9 Bars",
        units: "Einrichtungen & Zeiten",
        rooms: "441-Zimmer-Matrix",
        rules: "Wichtige Richtlinien",
      },
      openChartBtn: "Offizielle Zimmer-Tabelle öffnen (Zoom & Pan)",
      distancesTitle: "Flughäfen & Entfernungen",
      placesTitle: "Sehenswürdigkeiten & Ausflugsziele",
      includedTitle: "Inklusive Leistungen (All-Inclusive)",
      extraTitle: "Kostenpflichtige Zusatzleistungen",
      diningTitle: "Essenszeiten & A'La Carte-Regeln",
      barsTitle: "9 Bars & Getränkeservice",
      unitsTitle: "Betriebszeiten der Einrichtungen",
      roomsTitle: "Matrix der 9 Zimmerkategorien",
      rulesTitle: "Wichtige Vorschriften & Hotelrichtlinien",
      contactsTitle: "24/7 Gästeservice & Schnelldurchwahlen",
      tableHeaders: {
        roomType: "Zimmertyp",
        size: "Größe (m²)",
        view: "Aussicht & Lage",
        balcony: "Balkon / Terrasse",
        features: "Inbegriffene Ausstattung",
      },
    },
  }[locale];

  // Filtered lists based on search
  const matchesSearch = (text: string) =>
    searchQuery === "" || text.toLowerCase().includes(searchQuery.toLowerCase());

  const filteredGuides = directoryDetailedGuides.filter(
    (g) =>
      matchesSearch(getTxt(g.title, locale)) ||
      matchesSearch(getTxt(g.description, locale)) ||
      matchesSearch(g.extension) ||
      matchesSearch(g.hours)
  );

  const filteredRooms = factSheetRoomsMatrix.filter(
    (r) =>
      matchesSearch(getTxt(r.name, locale)) ||
      matchesSearch(getTxt(r.view, locale)) ||
      matchesSearch(r.size)
  );

  const filteredDining = diningFactSheetVenues.filter(
    (d) =>
      matchesSearch(getTxt(d.name, locale)) ||
      matchesSearch(getTxt(d.type, locale)) ||
      matchesSearch(getTxt(d.conceptNote, locale))
  );

  const filteredBars = barsFactSheetVenues.filter(
    (b) =>
      matchesSearch(b.name) ||
      matchesSearch(getTxt(b.service, locale)) ||
      matchesSearch(b.hours)
  );

  const filteredUnits = facilitiesAndUnitsTimetable.filter(
    (u) =>
      matchesSearch(getTxt(u.unit, locale)) ||
      matchesSearch(getTxt(u.note || { en: "", tr: "", ru: "", de: "" }, locale)) ||
      matchesSearch(u.hours)
  );

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      {/* Subpage Hero with Golden Accents */}
      <section className="subpage-hero relative overflow-hidden bg-gradient-to-b from-[#081824] via-[#0e2738] to-[#123044]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,159,87,0.18),transparent_60%)] pointer-events-none" />
        <div className="container subpage-hero-inner relative z-10">
          <div className="subpage-breadcrumbs flex items-center gap-2 text-xs text-white/60 mb-3">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--gold)]">Hotel Directory &amp; Fact Sheet</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(200,159,87,0.15)] border border-[rgba(200,159,87,0.45)] text-xs font-bold uppercase tracking-widest text-[#e8c883] mb-3">
              <Sparkles size={13} className="text-[var(--gold)]" />
              {labels.heroLabel}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal mt-2 tracking-tight">
              {labels.heroTitle}
            </h1>
            <p className="text-white/85 text-base sm:text-lg mt-4 leading-relaxed font-light">
              {labels.heroDesc}
            </p>

            {/* Quick Interactive Rooms Chart Button */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsFactSheetViewerOpen(true)}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#dfba73] to-[#b8862d] text-[#0d2735] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg flex items-center gap-2"
              >
                <ZoomIn size={15} />
                <span>{labels.openChartBtn}</span>
              </button>
              <a
                href="#hotel-overview"
                className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs tracking-wider transition-colors border border-white/15"
              >
                Explore Key Facts ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Quick Indicator Ribbon */}
      <section className="py-6 bg-[var(--shell)] border-b border-[rgba(200,159,87,0.3)] sticky top-0 z-30 backdrop-blur-md bg-opacity-95 shadow-sm">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--gold)]"
              />
              <input
                type="text"
                placeholder={labels.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[var(--paper)] border border-[rgba(200,159,87,0.4)] rounded-lg text-xs text-[var(--ink)] placeholder-[var(--ink-soft)] focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-colors"
              />
            </div>

            {/* Category Navigation Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 lg:pb-0 scrollbar-none">
              {(
                [
                  ["all", labels.tabs.all],
                  ["facts", labels.tabs.facts],
                  ["concept", labels.tabs.concept],
                  ["dining", labels.tabs.dining],
                  ["units", labels.tabs.units],
                  ["rooms", labels.tabs.rooms],
                  ["rules", labels.tabs.rules],
                ] as const
              ).map(([tabKey, tabLabel]) => (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === tabKey
                      ? "bg-gradient-to-r from-[#dfba73] to-[#b8862d] text-[#0d2735] shadow-sm"
                      : "bg-[var(--paper)] text-[var(--ink-soft)] hover:text-[var(--ink)] border border-[rgba(200,159,87,0.3)]"
                  }`}
                >
                  {tabLabel}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: RESORT OVERVIEW & DISTANCES FACT SHEET */}
      {(activeTab === "all" || activeTab === "facts") && (
        <section id="hotel-overview" className="section bg-[var(--paper)] pt-12">
          <div className="container">
            <div className="max-w-3xl mb-8">
              <span className="section-label">
                <span className="section-label-line" />
                Resort Identity &amp; Geography
              </span>
              <h2 className="gold-headline text-3xl sm:text-4xl font-normal mt-2">
                ORKA LOTUS BEACH — Official Specifications
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-2 leading-relaxed">
                {getTxt(factSheetGeneralData.concept, locale)}
              </p>
            </div>

            {/* General Resort Parameters Bento Grid with Thin Golden Frames */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="gold-frame-card p-5">
                <div className="flex items-center justify-between text-[var(--gold)] mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Category &amp; Year
                  </span>
                  <Award size={18} />
                </div>
                <h3 className="font-serif text-xl font-bold text-[var(--ink)]">
                  5-Star Ultra Luxury
                </h3>
                <p className="text-xs text-[var(--ink-soft)] mt-1">
                  Opened in <strong>2015</strong> · Premium Architecture
                </p>
              </div>

              <div className="gold-frame-card p-5">
                <div className="flex items-center justify-between text-[var(--gold)] mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Total Area &amp; Beach
                  </span>
                  <Waves size={18} />
                </div>
                <h3 className="font-serif text-xl font-bold text-[var(--ink)]">
                  75,000 m² · 1 km Beach
                </h3>
                <p className="text-xs text-[var(--ink-soft)] mt-1">
                  {getTxt(factSheetGeneralData.beachInfo, locale)}
                </p>
              </div>

              <div className="gold-frame-card p-5">
                <div className="flex items-center justify-between text-[var(--gold)] mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Blocks &amp; Rooms
                  </span>
                  <Bed size={18} />
                </div>
                <h3 className="font-serif text-xl font-bold text-[var(--ink)]">
                  9 Blocks · 441 Rooms
                </h3>
                <p className="text-xs text-[var(--ink-soft)] mt-1">
                  {getTxt(factSheetGeneralData.blocksAndRooms, locale)}
                </p>
              </div>

              <div className="gold-frame-card p-5">
                <div className="flex items-center justify-between text-[var(--gold)] mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Direct Contact
                  </span>
                  <Phone size={18} />
                </div>
                <h3 className="font-serif text-lg font-bold text-[var(--ink)]">
                  +90 252 455 50 50
                </h3>
                <p className="text-xs text-[var(--ink-soft)] mt-1 truncate">
                  info.orkalotus@orkahotels.com
                </p>
              </div>
            </div>

            {/* Distances and Excursion Destinations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 gold-frame-card p-6">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[rgba(200,159,87,0.3)]">
                  <Plane className="text-[var(--gold)]" size={18} />
                  <h3 className="gold-headline text-xl font-bold">
                    {labels.distancesTitle}
                  </h3>
                </div>
                <div className="space-y-3">
                  {factSheetGeneralData.distances.map((dist, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-[var(--paper)] border border-[rgba(200,159,87,0.25)] text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[var(--gold)]" />
                        <span className="font-semibold text-[var(--ink)]">
                          {getTxt(dist.destination, locale)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-[var(--gold)]">
                          {dist.distance}
                        </span>
                        <span className="text-[var(--ink-soft)] text-[11px] bg-[var(--shell)] px-2 py-0.5 rounded border border-[rgba(200,159,87,0.2)]">
                          {dist.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 gold-frame-card p-6">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[rgba(200,159,87,0.3)]">
                  <Compass className="text-[var(--gold)]" size={18} />
                  <h3 className="gold-headline text-xl font-bold">
                    {labels.placesTitle}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {factSheetGeneralData.placesOfInterest.map((place, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg bg-[var(--paper)] border border-[rgba(200,159,87,0.25)] flex flex-col justify-between ${
                        place.note ? "col-span-2 bg-[rgba(200,159,87,0.06)] border-[rgba(200,159,87,0.5)]" : ""
                      }`}
                    >
                      <span className="font-semibold text-[var(--ink)] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                        {place.name}
                      </span>
                      {place.note && (
                        <p className="text-[11px] text-[var(--gold)] mt-1 font-medium">
                          ★ {getTxt(place.note, locale)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: ALL-INCLUSIVE CONCEPT & PRIVILEGES (GOLDEN COMPARISON) */}
      {(activeTab === "all" || activeTab === "concept") && (
        <section className="section bg-[var(--shell)] border-t border-[rgba(200,159,87,0.25)]">
          <div className="container">
            <div className="max-w-3xl mb-10">
              <span className="section-label">
                <span className="section-label-line" />
                Concept Transparency
              </span>
              <h2 className="gold-headline text-3xl sm:text-4xl font-normal mt-2">
                Ultra All-Inclusive Concept Breakdown
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-2">
                Everything clearly delineated from our official resort fact sheet — enjoy total peace of mind during your Aegean holiday.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Included Services (Free) */}
              <div className="gold-frame-card p-6 bg-gradient-to-b from-[var(--shell)] to-[rgba(200,159,87,0.03)] border-[rgba(200,159,87,0.5)] shadow-md">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(200,159,87,0.35)]">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-[rgba(200,159,87,0.15)] text-[var(--gold)]">
                      <CheckCircle2 size={20} />
                    </span>
                    <div>
                      <h3 className="gold-headline text-2xl font-bold">
                        {labels.includedTitle}
                      </h3>
                      <p className="text-[11px] text-[var(--ink-soft)]">
                        Complimentary for all Orka Lotus Beach staying guests
                      </p>
                    </div>
                  </div>
                  <span className="gold-tag-badge">Included</span>
                </div>

                <ul className="space-y-2.5">
                  {includedServicesList.map((srv, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded-lg bg-[var(--paper)] border border-[rgba(200,159,87,0.25)] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <Check size={14} className="text-[var(--gold)] flex-shrink-0" />
                        <span className="text-[var(--ink)] font-medium">
                          {getTxt(srv.title, locale)}
                        </span>
                      </div>
                      {srv.badge && (
                        <span className="text-[10px] font-bold text-[var(--gold)] bg-[var(--shell)] px-2 py-0.5 rounded border border-[rgba(200,159,87,0.3)] whitespace-nowrap flex-shrink-0">
                          {getTxt(srv.badge, locale)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Extra Charge Services */}
              <div className="gold-frame-card p-6 bg-[var(--shell)]">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(200,159,87,0.35)]">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-[rgba(200,159,87,0.1)] text-[var(--gold)]">
                      <Sparkles size={20} />
                    </span>
                    <div>
                      <h3 className="gold-headline text-2xl font-bold">
                        {labels.extraTitle}
                      </h3>
                      <p className="text-[11px] text-[var(--ink-soft)]">
                        Premium specialized experiences and à la carte luxuries
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/5 text-[var(--ink-soft)] border border-[var(--line)]">
                    Extra Charge
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {extraChargeServicesList.map((srv, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded-lg bg-[var(--paper)] border border-[var(--line)] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[var(--gold)] flex-shrink-0" />
                        <span className="text-[var(--ink)] font-medium">
                          {getTxt(srv.title, locale)}
                        </span>
                      </div>
                      {srv.badge && (
                        <span className="text-[10px] font-bold text-[var(--ink-soft)] bg-[var(--shell)] px-2 py-0.5 rounded border border-[var(--line)] whitespace-nowrap flex-shrink-0">
                          {getTxt(srv.badge, locale)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: DINING & 9 BARS FACT SHEET SCHEDULE */}
      {(activeTab === "all" || activeTab === "dining") && (
        <section className="section bg-[var(--paper)] border-t border-[rgba(200,159,87,0.25)]">
          <div className="container">
            <div className="max-w-3xl mb-8">
              <span className="section-label">
                <span className="section-label-line" />
                Culinary Timetables
              </span>
              <h2 className="gold-headline text-3xl sm:text-4xl font-normal mt-2">
                {labels.diningTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-2">
                Authentic dining times across Pine Main Restaurant, Tapas &amp; Aqua Snacks, and our 3 specialty A'La Carte venues.
              </p>
            </div>

            {/* Dining Venues Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredDining.map((venue, idx) => (
                <div
                  key={idx}
                  className="gold-frame-card p-5 flex flex-col justify-between"
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

                    <h3 className="gold-headline text-xl font-semibold mb-1">
                      {getTxt(venue.name, locale)}
                    </h3>
                    <p className="text-xs text-[var(--ink-soft)] mb-3">
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

                  <div className="pt-3 border-t border-[rgba(200,159,87,0.25)] text-[11px] text-[var(--ink-soft)] flex items-center justify-between">
                    <span>{getTxt(venue.conceptNote, locale)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 9 Bars Fact Sheet Table */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <GlassWater className="text-[var(--gold)]" size={20} />
                <h3 className="gold-headline text-2xl font-bold">
                  {labels.barsTitle}
                </h3>
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
                      {filteredBars.map((bar, idx) => (
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
          </div>
        </section>
      )}

      {/* SECTION 4: FACILITIES & UNITS TIMETABLE */}
      {(activeTab === "all" || activeTab === "units") && (
        <section className="section bg-[var(--shell)] border-t border-[rgba(200,159,87,0.25)]">
          <div className="container">
            <div className="max-w-3xl mb-8">
              <span className="section-label">
                <span className="section-label-line" />
                Resort Units &amp; Schedules
              </span>
              <h2 className="gold-headline text-3xl sm:text-4xl font-normal mt-2">
                {labels.unitsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-2">
                Aquapark slides, indoor pool, fitness center, spa, kid's club, market, and show arena hours.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredUnits.map((item, idx) => (
                <div
                  key={idx}
                  className="gold-frame-card p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[rgba(200,159,87,0.25)]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                        {item.location ? getTxt(item.location, locale) : "Resort Unit"}
                      </span>
                      <Clock size={14} className="text-[var(--gold)]" />
                    </div>

                    <h3 className="gold-headline text-lg font-bold mb-1">
                      {getTxt(item.unit, locale)}
                    </h3>

                    <div className="my-2 py-1 px-2 rounded bg-[var(--paper)] border border-[rgba(200,159,87,0.2)] text-[11px] font-mono font-bold text-[var(--gold)] inline-block">
                      {item.hours}
                    </div>

                    {item.note && (
                      <p className="text-xs text-[var(--ink-soft)] leading-relaxed mt-2">
                        {getTxt(item.note, locale)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: 441 ROOMS SPECIFICATION MATRIX */}
      {(activeTab === "all" || activeTab === "rooms") && (
        <section className="section bg-[var(--paper)] border-t border-[rgba(200,159,87,0.25)]">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div className="max-w-3xl">
                <span className="section-label">
                  <span className="section-label-line" />
                  Accommodation Folio
                </span>
                <h2 className="gold-headline text-3xl sm:text-4xl font-normal mt-2">
                  {labels.roomsTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-2">
                  9 Blocks · 441 Total Rooms · 1,138 Beds (994 Base Beds) · From Promo 24 m² to Family Sea 40 m²
                </p>
              </div>

              {/* Interactive High-Resolution Rooms Chart Launcher */}
              <button
                onClick={() => setIsFactSheetViewerOpen(true)}
                className="self-start lg:self-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#dfba73] via-[#c89f57] to-[#b8862d] text-[#0d2735] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md flex items-center gap-2 border border-[#ecc98a]"
              >
                <ZoomIn size={16} />
                <span>{labels.openChartBtn}</span>
              </button>
            </div>

            {/* Complete Rooms Table with Thin Gold Frame */}
            <div className="gold-table-container">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="gold-table-header-row">
                      <th className="p-3.5 pl-5">{labels.tableHeaders.roomType}</th>
                      <th className="p-3.5">{labels.tableHeaders.size}</th>
                      <th className="p-3.5">{labels.tableHeaders.view}</th>
                      <th className="p-3.5">{labels.tableHeaders.balcony}</th>
                      <th className="p-3.5 pr-5">{labels.tableHeaders.features}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(200,159,87,0.2)]">
                    {filteredRooms.map((room) => (
                      <tr
                        key={room.id}
                        className="hover:bg-[rgba(200,159,87,0.05)] transition-colors"
                      >
                        <td className="p-3.5 pl-5 font-semibold text-[var(--ink)] whitespace-nowrap">
                          <span className="font-serif text-base text-[var(--ink)] block">
                            {getTxt(room.name, locale)}
                          </span>
                          <span className="text-[10px] text-[var(--ink-soft)]">
                            {getTxt(room.roomCountDescription, locale)}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono font-bold text-[var(--gold)] whitespace-nowrap">
                          {room.size}
                        </td>
                        <td className="p-3.5 text-[var(--ink)] whitespace-nowrap">
                          {getTxt(room.view, locale)}
                        </td>
                        <td className="p-3.5">
                          {room.hasBalcony ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <Check size={12} /> Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              No Balcony
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 pr-5 text-[var(--ink-soft)]">
                          <div className="flex flex-wrap gap-1">
                            {room.features[locale]?.slice(0, 6).map((f, fIdx) => (
                              <span
                                key={fIdx}
                                className="inline-block px-1.5 py-0.5 rounded bg-[var(--shell)] border border-[rgba(200,159,87,0.2)] text-[10.5px]"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: IMPORTANT REGULATIONS & POLICIES */}
      {(activeTab === "all" || activeTab === "rules") && (
        <section className="section bg-[var(--shell)] border-t border-[rgba(200,159,87,0.25)]">
          <div className="container">
            <div className="max-w-3xl mb-8">
              <span className="section-label">
                <span className="section-label-line" />
                Hotel Policies
              </span>
              <h2 className="gold-headline text-3xl sm:text-4xl font-normal mt-2">
                {labels.rulesTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-2">
                Official statutory and operational regulations ensuring safety, hygiene, and tranquility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {importantNotesFactSheet[locale].map((note, idx) => (
                <div
                  key={idx}
                  className="gold-frame-card p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-[var(--gold)]">
                      <Shield size={16} />
                      <h3 className="gold-headline text-base font-bold">
                        {note.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--ink-soft)] leading-relaxed mt-2">
                      {note.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: RESORT DIRECTORY QUICK EXTENSIONS & CARE DESK */}
      <section className="section bg-[var(--paper)] border-t border-[rgba(200,159,87,0.25)]">
        <div className="container">
          <div className="max-w-3xl mb-8">
            <span className="section-label">
              <span className="section-label-line" />
              Direct Contacts
            </span>
            <h2 className="gold-headline text-3xl sm:text-4xl font-normal mt-2">
              {labels.contactsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-2">
              Dial directly from your suite phone or visit guest assistance desks in the main lobby.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide, idx) => (
              <article
                key={guide.id}
                className="gold-frame-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(200,159,87,0.3)]">
                    <span className="font-serif text-lg font-bold text-[var(--gold)]">
                      § {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="gold-tag-badge">
                      <Clock size={11} /> {guide.hours}
                    </span>
                  </div>

                  <h3 className="gold-headline text-xl font-semibold mb-2">
                    {getTxt(guide.title, locale)}
                  </h3>

                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed mb-4">
                    {getTxt(guide.description, locale)}
                  </p>
                </div>

                <div className="pt-3 border-t border-[rgba(200,159,87,0.25)] flex items-center justify-between text-xs text-[var(--ink-soft)]">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin size={13} className="text-[var(--gold)]" />
                    {getTxt(guide.location, locale)}
                  </span>
                  <span className="font-bold text-[var(--gold)] bg-[var(--shell)] px-2.5 py-1 rounded border border-[rgba(200,159,87,0.3)]">
                    Ext: {guide.extension}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Quick Callout Bar */}
          <div className="mt-12 p-8 bg-gradient-to-r from-[#0a1824] via-[#0e2738] to-[#0a1824] text-white rounded-2xl border border-[rgba(200,159,87,0.45)] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#e8c883]">
                <Sparkles size={13} /> 24/7 Guest Care Desk
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium mt-1">
                Need immediate assistance during your stay?
              </h3>
              <p className="text-sm text-white/80 mt-2 max-w-xl font-light">
                Dial <strong className="text-[var(--gold)]">0</strong> from your room telephone for Reception, or <strong className="text-[var(--gold)]">7001</strong> for Guest Relations.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="tel:4446752"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#dfba73] to-[#b8862d] text-[#0d2735] font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2 shadow-lg"
              >
                <Phone size={16} /> Dial 444 6 752
              </a>
              <button
                onClick={() => setIsFactSheetViewerOpen(true)}
                className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/20 flex items-center gap-2"
              >
                <FileSpreadsheet size={16} className="text-[var(--gold)]" />
                <span>Fact Sheet Rooms Chart</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Rooms Information Fact Sheet Popup with Zoom Gesture */}
      <InteractiveFactSheetViewer
        isOpen={isFactSheetViewerOpen}
        onClose={() => setIsFactSheetViewerOpen(false)}
        imageUrl={roomsChartImageUrl}
        title={{
          en: "Orka Lotus Beach · Rooms & Amenities Fact Sheet",
          tr: "Orka Lotus Beach · Oda ve Donanım Fact Sheet Şeması",
          ru: "Orka Lotus Beach · Спецификация номеров и удобств",
          de: "Orka Lotus Beach · Zimmer- und Ausstattungsspezifikation",
        }}
        subtitle={{
          en: "Official technical matrix covering all 9 room types & included 5-star amenities",
          tr: "9 farklı oda tipinin tüm özelliklerini ve 5 yıldızlı donanımını içeren resmi tablo",
          ru: "Официальная таблица всех 9 типов номеров и 5-звездочных удобств",
          de: "Offizielle Übersicht über alle 9 Zimmertypen und 5-Sterne-Ausstattung",
        }}
        locale={locale}
      />
    </PageShell>
  );
}
