import type { Locale } from "./content";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  category: "main" | "resort" | "dining-wellness" | "experience" | "orkaworld";
  badge?: string;
  description?: string;
}

export interface LocalizedNavItem {
  id: string;
  href: string;
  category: "main" | "resort" | "dining-wellness" | "experience" | "orkaworld";
  label: Record<Locale, string>;
  headerLabel?: Record<Locale, string>;
  badge?: Record<Locale, string>;
  description: Record<Locale, string>;
}

export const LOCALIZED_NAV_ITEMS: LocalizedNavItem[] = [
  {
    id: "home",
    href: "/",
    category: "main",
    label: {
      en: "HOME",
      tr: "ANA SAYFA",
      ru: "ГЛАВНАЯ",
      de: "STARTSEITE",
    },
    headerLabel: {
      en: "Home",
      tr: "Ana Sayfa",
      ru: "Главная",
      de: "Startseite",
    },
    description: {
      en: "Landing page & daily live schedule",
      tr: "Karşılama sayfası ve günlük canlı program",
      ru: "Главная страница и ежедневная программа",
      de: "Startseite & täglicher Live-Plan",
    },
  },
  {
    id: "activities-spa",
    href: "/activities-spa",
    category: "dining-wellness",
    label: {
      en: "ACTIVITIES & SPA",
      tr: "AKTİVİTELER & SPA",
      ru: "АКТИВНОСТИ И СПА",
      de: "AKTIVITÄTEN & SPA",
    },
    headerLabel: {
      en: "Activities & Spa",
      tr: "Aktiviteler & Spa",
      ru: "Активности и Спа",
      de: "Aktivitäten & Spa",
    },
    description: {
      en: "Daily wellness rituals, hammam & activities",
      tr: "Günlük wellness ritüelleri, hamam ve aktiviteler",
      ru: "Оздоровительные ритуалы, хаммам и активности",
      de: "Tägliche Wellness-Rituale, Hamam & Aktivitäten",
    },
  },
  {
    id: "pools-beach",
    href: "/pools-beach",
    category: "resort",
    label: {
      en: "POOLS & BEACH",
      tr: "HAVUZLAR & PLAJ",
      ru: "БАССЕЙНЫ И ПЛЯЖ",
      de: "POOLS & STRAND",
    },
    headerLabel: {
      en: "Pools & Beach",
      tr: "Havuzlar & Plaj",
      ru: "Бассейны и Пляж",
      de: "Pools & Strand",
    },
    description: {
      en: "Private shoreline, aqua park & heated pools",
      tr: "Özel sahil şeridi, su parkı ve ısıtmalı havuzlar",
      ru: "Собственный пляж, аквапарк и подогреваемые бассейны",
      de: "Privater Strand, Aquapark & beheizte Pools",
    },
  },
  {
    id: "watersports",
    href: "/watersports",
    category: "resort",
    badge: {
      en: "Adventure",
      tr: "Macera",
      ru: "Экстрим",
      de: "Abenteuer",
    },
    label: {
      en: "WATERSPORTS",
      tr: "SU SPORLARI",
      ru: "ВОДНЫЙ СПОРТ",
      de: "WASSERSPORT",
    },
    headerLabel: {
      en: "Watersports",
      tr: "Su Sporları",
      ru: "Водный спорт",
      de: "Wassersport",
    },
    description: {
      en: "Icon Watersport Centre with Captain Bülent & high-speed rides",
      tr: "Kaptan Bülent ile Icon Su Sporları Merkezi ve sürat turları",
      ru: "Центр водных видов спорта Icon с капитаном Бюлентом",
      de: "Icon Wassersportzentrum mit Kapitän Bülent & Fahrten",
    },
  },
  {
    id: "mini-club",
    href: "/mini-club",
    category: "resort",
    badge: {
      en: "Kids 4-12",
      tr: "Çocuk 4-12",
      ru: "Дети 4-12",
      de: "Kinder 4-12",
    },
    label: {
      en: "MINI CLUB",
      tr: "MİNİ KULÜP",
      ru: "МИНИ-КЛУБ",
      de: "MINICLUB",
    },
    headerLabel: {
      en: "Mini Club",
      tr: "Mini Kulüp",
      ru: "Мини-клуб",
      de: "Miniclub",
    },
    description: {
      en: "Kids activities, creative workshops & daily programs",
      tr: "Çocuk aktiviteleri, yaratıcı atölyeler ve günlük programlar",
      ru: "Детские мероприятия, мастер-классы и анимация",
      de: "Kinderaktivitäten, kreative Workshops & Tagesprogramme",
    },
  },
  {
    id: "restaurants-bars",
    href: "/restaurants-bars",
    category: "dining-wellness",
    label: {
      en: "RESTAURANTS & BARS",
      tr: "RESTORANLAR & BARLAR",
      ru: "РЕСТОРАНЫ И БАРЫ",
      de: "RESTAURANTS & BARS",
    },
    headerLabel: {
      en: "Dining",
      tr: "Yeme İçme",
      ru: "Рестораны",
      de: "Gastronomie",
    },
    description: {
      en: "Exquisite Aegean cuisine, a'la carte & cocktails",
      tr: "Seçkin Ege mutfağı, alakart lezzetler ve kokteyller",
      ru: "Изысканная эгейская кухня, a'la carte и авторские коктейли",
      de: "Exquisite ägäische Küche, À-la-carte & Cocktails",
    },
  },
  {
    id: "shops",
    href: "/shops",
    category: "resort",
    label: {
      en: "SHOPS",
      tr: "MAĞAZALAR",
      ru: "МАГАЗИНЫ",
      de: "GESCHÄFTE",
    },
    headerLabel: {
      en: "Shops",
      tr: "Mağazalar",
      ru: "Магазины",
      de: "Geschäfte",
    },
    description: {
      en: "Boutiques, jewelry, fashion & market",
      tr: "Butikler, mücevher, moda ve market",
      ru: "Бутики, ювелирные изделия, мода и маркет",
      de: "Boutiquen, Schmuck, Mode & Markt",
    },
  },
  {
    id: "rooms-services",
    href: "/rooms-services",
    category: "resort",
    label: {
      en: "ROOMS & SERVICES",
      tr: "ODALAR & HİZMETLER",
      ru: "НОМЕРА И СЕРВИС",
      de: "ZIMMER & SERVICE",
    },
    headerLabel: {
      en: "Rooms",
      tr: "Odalar",
      ru: "Номера",
      de: "Zimmer",
    },
    description: {
      en: "Luxury suites, accommodations & guest care",
      tr: "Lüks süitler, konaklama seçenekleri ve misafir hizmetleri",
      ru: "Роскошные люксы, размещение и премиальный сервис",
      de: "Luxussuiten, Unterkünfte & Gästeservice",
    },
  },
  {
    id: "medical",
    href: "/medical",
    category: "resort",
    badge: {
      en: "Healthcare",
      tr: "Sağlık",
      ru: "Здоровье",
      de: "Gesundheit",
    },
    label: {
      en: "MEDICAL",
      tr: "MEDİKAL & SAĞLIK",
      ru: "МЕДИЦИНА",
      de: "MEDIZIN",
    },
    headerLabel: {
      en: "Medical",
      tr: "Sağlık",
      ru: "Медицина",
      de: "Medizin",
    },
    description: {
      en: "In-hotel medical care & KARIA HEALTH aesthetic treatments",
      tr: "Otel içi sağlık hizmeti ve KARIA HEALTH estetik uygulamaları",
      ru: "Медицинская помощь в отеле и процедуры KARIA HEALTH",
      de: "Ärztliche Betreuung im Hotel & KARIA HEALTH Ästhetik",
    },
  },
  {
    id: "management-personnel",
    href: "/management-personnel",
    category: "experience",
    label: {
      en: "MANAGEMENT & PERSONNEL",
      tr: "YÖNETİM & PERSONEL",
      ru: "РУКОВОДСТВО И ПЕРСОНАЛ",
      de: "MANAGEMENT & PERSONAL",
    },
    headerLabel: {
      en: "Management",
      tr: "Yönetim",
      ru: "Руководство",
      de: "Management",
    },
    description: {
      en: "Meet the team & hospitality directors",
      tr: "Yönetim ekibi ve misafirperverlik direktörlerimiz",
      ru: "Познакомьтесь с командой и директорами отеля",
      de: "Lernen Sie unser Team & die Leitung kennen",
    },
  },
  {
    id: "hotel-directory",
    href: "/hotel-directory",
    category: "experience",
    label: {
      en: "HOTEL DIRECTORY",
      tr: "OTEL REHBERİ",
      ru: "СПРАВОЧНИК ОТЕЛЯ",
      de: "HOTELVERZEICHNIS",
    },
    headerLabel: {
      en: "Directory",
      tr: "Rehber",
      ru: "Справочник",
      de: "Verzeichnis",
    },
    description: {
      en: "Complete guide & essential services",
      tr: "Kapsamlı otel rehberi ve temel hizmetler",
      ru: "Полный путеводитель по услугам отеля",
      de: "Vollständiger Hotelleitfaden & Dienste",
    },
  },
  {
    id: "rank-your-lotus",
    href: "/rank-your-lotus",
    category: "experience",
    badge: {
      en: "Awards",
      tr: "Ödüller",
      ru: "Рейтинг",
      de: "Awards",
    },
    label: {
      en: "⭐ RATE YOUR LOTUS",
      tr: "⭐ RATE YOUR LOTUS",
      ru: "⭐ RATE YOUR LOTUS",
      de: "⭐ RATE YOUR LOTUS",
    },
    headerLabel: {
      en: "Rate Your Lotus",
      tr: "Rate Your Lotus",
      ru: "Rate Your Lotus",
      de: "Rate Your Lotus",
    },
    description: {
      en: "Guest Experience & Hospitality Ratings",
      tr: "Misafir Deneyimi ve Hizmet Sıralamaları",
      ru: "Рейтинги сервиса и впечатлений гостей",
      de: "Gästezufriedenheit & Hotel-Ranglisten",
    },
  },
  {
    id: "icon-beach",
    href: "/icon-beach",
    category: "dining-wellness",
    badge: {
      en: "Exclusive",
      tr: "Ayrıcalıklı",
      ru: "Эксклюзив",
      de: "Exklusiv",
    },
    label: {
      en: "ICON BEACH",
      tr: "ICON BEACH",
      ru: "ICON BEACH",
      de: "ICON BEACH",
    },
    headerLabel: {
      en: "Icon Beach",
      tr: "Icon Beach",
      ru: "Icon Beach",
      de: "Icon Beach",
    },
    description: {
      en: "VIP cabanas, lounge & sunset vibes",
      tr: "VIP kabanalar, lounge alanı ve gün batımı atmosferi",
      ru: "VIP-кабаны, лаундж и атмосфера заката",
      de: "VIP-Cabanas, Lounge & Sonnenuntergangsstimmung",
    },
  },
  {
    id: "orka-homes",
    href: "/orka-homes",
    category: "orkaworld",
    label: {
      en: "ORKA HOMES",
      tr: "ORKA HOMES",
      ru: "ORKA HOMES",
      de: "ORKA HOMES",
    },
    headerLabel: {
      en: "Orka Homes",
      tr: "Orka Homes",
      ru: "Orka Homes",
      de: "Orka Homes",
    },
    description: {
      en: "Luxury villas & Aegean properties",
      tr: "Lüks villalar ve Ege mülkleri",
      ru: "Элитные виллы и недвижимость на Эгейском побережье",
      de: "Luxusvillen & Immobilien an der Ägäis",
    },
  },
  {
    id: "marmaris",
    href: "/marmaris",
    category: "orkaworld",
    label: {
      en: "MARMARIS",
      tr: "MARMARİS",
      ru: "МАРМАРИС",
      de: "MARMARIS",
    },
    headerLabel: {
      en: "Marmaris",
      tr: "Marmaris",
      ru: "Мармарис",
      de: "Marmaris",
    },
    description: {
      en: "Explore the bays, castle & excursions",
      tr: "Koyları, kaleyi ve çevre turlarını keşfedin",
      ru: "Исследуйте живописные бухты, замок и экскурсии",
      de: "Entdecken Sie die Buchten, Burg & Ausflüge",
    },
  },
  {
    id: "orka-legacy",
    href: "/orka-legacy",
    category: "orkaworld",
    label: {
      en: "ORKA LEGACY",
      tr: "ORKA MİRASI",
      ru: "НАСЛЕДИЕ ORKA",
      de: "ORKA ERBE",
    },
    headerLabel: {
      en: "Orka Legacy",
      tr: "Orka Mirası",
      ru: "Наследие Orka",
      de: "Orka Erbe",
    },
    description: {
      en: "Our history, heritage & sustainability",
      tr: "Tarihimiz, değerlerimiz ve sürdürülebilirlik ilkelerimiz",
      ru: "Наша история, традиции и забота об экологии",
      de: "Unsere Geschichte, Tradition & Nachhaltigkeit",
    },
  },
  {
    id: "contact",
    href: "/contact",
    category: "experience",
    label: {
      en: "CONTACT",
      tr: "İLETİŞİM",
      ru: "КОНТАКТЫ",
      de: "KONTAKT",
    },
    headerLabel: {
      en: "Contact",
      tr: "İletişim",
      ru: "Контакты",
      de: "Kontakt",
    },
    description: {
      en: "Direct reception, transfers & inquiries",
      tr: "Doğrudan resepsiyon, transfer ve sorularınız",
      ru: "Прямая связь с ресепшн, трансфер и вопросы",
      de: "Direkter Kontakt zur Rezeption, Transfer & Anfragen",
    },
  },
];

export function getNavItems(locale: Locale): NavItem[] {
  return LOCALIZED_NAV_ITEMS.map((item) => ({
    id: item.id,
    href: item.href,
    category: item.category,
    label: item.label[locale] || item.label.en,
    badge: item.badge ? item.badge[locale] || item.badge.en : undefined,
    description: item.description[locale] || item.description.en,
  }));
}

export const MAIN_NAV_ITEMS: NavItem[] = getNavItems("en");

export const sidebarTranslations: Record<
  Locale,
  {
    intro: string;
    websiteQr: string;
    enlarge: string;
    whatsapp: string;
    copyLink: string;
    copied: string;
    linkCopiedDesc: string;
    needAssistance: string;
    dialReception: string;
    closeMenuAria: string;
    menuDialogAria: string;
    navAria: string;
  }
> = {
  en: {
    intro: "Luxury, nature and the Aegean — explore the full resort experience.",
    websiteQr: "Website QR & Share",
    enlarge: "Enlarge",
    whatsapp: "WhatsApp",
    copyLink: "Copy Link",
    copied: "Copied",
    linkCopiedDesc: "Direct link copied to clipboard!",
    needAssistance: "Need assistance during your stay?",
    dialReception: "Dial reception (444 6 752)",
    closeMenuAria: "Close menu",
    menuDialogAria: "Navigation Menu",
    navAria: "Sidebar navigation",
  },
  tr: {
    intro: "Lüks, doğa ve Ege — eksiksiz tatil deneyimini keşfedin.",
    websiteQr: "Web Sitesi QR & Paylaş",
    enlarge: "Büyüt",
    whatsapp: "WhatsApp",
    copyLink: "Bağlantıyı Kopyala",
    copied: "Kopyalandı",
    linkCopiedDesc: "Bağlantı panoya kopyalandı!",
    needAssistance: "Konaklamanız sırasında yardıma mı ihtiyacınız var?",
    dialReception: "Resepsiyonu arayın (444 6 752)",
    closeMenuAria: "Menüyü kapat",
    menuDialogAria: "Gezinme Menüsü",
    navAria: "Kenar çubuğu gezinmesi",
  },
  ru: {
    intro: "Роскошь, природа и Эгейское море — откройте для себя весь курорт.",
    websiteQr: "QR-код и ссылка",
    enlarge: "Увеличить",
    whatsapp: "WhatsApp",
    copyLink: "Скопировать",
    copied: "Скопировано",
    linkCopiedDesc: "Прямая ссылка скопирована в буфер обмена!",
    needAssistance: "Нужна помощь во время пребывания?",
    dialReception: "Позвонить на ресепшн (444 6 752)",
    closeMenuAria: "Закрыть меню",
    menuDialogAria: "Меню навигации",
    navAria: "Навигация по меню",
  },
  de: {
    intro: "Luxus, Natur und die Ägäis — erleben Sie das gesamte Resort.",
    websiteQr: "Website-QR & Teilen",
    enlarge: "Vergrößern",
    whatsapp: "WhatsApp",
    copyLink: "Link kopieren",
    copied: "Kopiert",
    linkCopiedDesc: "Direkter Link in die Zwischenablage kopiert!",
    needAssistance: "Benötigen Sie Hilfe während Ihres Aufenthalts?",
    dialReception: "Rezeption anrufen (444 6 752)",
    closeMenuAria: "Menü schließen",
    menuDialogAria: "Navigationsmenü",
    navAria: "Seitenleistennavigation",
  },
};

export const footerTranslations: Record<
  Locale,
  {
    tagline: string;
    col1Label: string;
    col2Label: string;
    col3Label: string;
    col4Label: string;
    address: string;
    tapToEnlarge: string;
    whatsappShare: string;
    directShareLink: string;
    linkCopied: string;
    bottomTagline: string;
    home: string;
    roomsServices: string;
    medical: string;
    hotelDirectory: string;
    poolsBeach: string;
    watersports: string;
    miniClub: string;
    kidsBadge: string;
    shops: string;
    restaurantsBars: string;
    activitiesSpa: string;
    iconBeach: string;
    rankYourLotus: string;
    managementPersonnel: string;
    marmaris: string;
    orkaHomes: string;
    orkaLegacy: string;
    contact: string;
  }
> = {
  en: {
    tagline: "Luxury, nature and the Aegean — in one living rhythm.",
    col1Label: "Resort & Stay",
    col2Label: "Dining & Wellness",
    col3Label: "The Lotus World",
    col4Label: "SHARE ORKA",
    address: "Cumhuriyet Mah. Atatürk Cad. No:56, İçmeler, Marmaris / Muğla",
    tapToEnlarge: "Tap to Enlarge",
    whatsappShare: "WhatsApp Share",
    directShareLink: "Direct Share Link",
    linkCopied: "Link Copied!",
    bottomTagline: "Luxury, Nature & The Aegean · Ultra All Inclusive",
    home: "HOME",
    roomsServices: "ROOMS & SERVICES",
    medical: "MEDICAL",
    hotelDirectory: "HOTEL DIRECTORY",
    poolsBeach: "POOLS & BEACH",
    watersports: "WATERSPORTS",
    miniClub: "MINI CLUB",
    kidsBadge: "Kids",
    shops: "SHOPS",
    restaurantsBars: "RESTAURANTS & BARS",
    activitiesSpa: "ACTIVITIES & SPA",
    iconBeach: "ICON BEACH",
    rankYourLotus: "RATE YOUR LOTUS",
    managementPersonnel: "MANAGEMENT & PERSONNEL",
    marmaris: "MARMARIS",
    orkaHomes: "ORKA HOMES",
    orkaLegacy: "ORKA LEGACY",
    contact: "CONTACT",
  },
  tr: {
    tagline: "Lüks, doğa ve Ege — tek bir yaşam ritminde.",
    col1Label: "Tesis & Konaklama",
    col2Label: "Yeme İçme & Wellness",
    col3Label: "Lotus Dünyası",
    col4Label: "SHARE ORKA",
    address: "Cumhuriyet Mah. Atatürk Cad. No:56, İçmeler, Marmaris / Muğla",
    tapToEnlarge: "Büyütmek İçin Dokunun",
    whatsappShare: "WhatsApp Paylaşımı",
    directShareLink: "Doğrudan Paylaşım Linki",
    linkCopied: "Bağlantı Kopyalandı!",
    bottomTagline: "Lüks, Doğa & Ege · Ultra Her Şey Dahil",
    home: "ANA SAYFA",
    roomsServices: "ODALAR & HİZMETLER",
    medical: "MEDİKAL & SAĞLIK",
    hotelDirectory: "OTEL REHBERİ",
    poolsBeach: "HAVUZLAR & PLAJ",
    watersports: "SU SPORLARI",
    miniClub: "MİNİ KULÜP",
    kidsBadge: "Çocuk",
    shops: "MAĞAZALAR",
    restaurantsBars: "RESTORANLAR & BARLAR",
    activitiesSpa: "AKTİVİTELER & SPA",
    iconBeach: "ICON BEACH",
    rankYourLotus: "RATE YOUR LOTUS",
    managementPersonnel: "YÖNETİM & PERSONEL",
    marmaris: "MARMARİS",
    orkaHomes: "ORKA HOMES",
    orkaLegacy: "ORKA MİRASI",
    contact: "İLETİŞİM",
  },
  ru: {
    tagline: "Роскошь, природа и Эгейское море — в едином ритме жизни.",
    col1Label: "Курорт и Проживание",
    col2Label: "Рестораны и Wellness",
    col3Label: "Мир Lotus",
    col4Label: "SHARE ORKA",
    address: "Джумхуриет Мах. Ататюрк Джад. №56, Ичмелер, Мармарис / Мугла",
    tapToEnlarge: "Нажмите для увеличения",
    whatsappShare: "Поделиться в WhatsApp",
    directShareLink: "Прямая ссылка",
    linkCopied: "Ссылка скопирована!",
    bottomTagline: "Роскошь, Природа и Эгейское море · Ultra All Inclusive",
    home: "ГЛАВНАЯ",
    roomsServices: "НОМЕРА И СЕРВИС",
    medical: "МЕДИЦИНА",
    hotelDirectory: "СПРАВОЧНИК ОТЕЛЯ",
    poolsBeach: "БАССЕЙНЫ И ПЛЯЖ",
    watersports: "ВОДНЫЙ СПОРТ",
    miniClub: "МИНИ-КЛУБ",
    kidsBadge: "Дети",
    shops: "МАГАЗИНЫ",
    restaurantsBars: "РЕСТОРАНЫ И БАРЫ",
    activitiesSpa: "АКТИВНОСТИ И СПА",
    iconBeach: "ICON BEACH",
    rankYourLotus: "RATE YOUR LOTUS",
    managementPersonnel: "РУКОВОДСТВО И ПЕРСОНАЛ",
    marmaris: "МАРМАРИС",
    orkaHomes: "ORKA HOMES",
    orkaLegacy: "НАСЛЕДИЕ ORKA",
    contact: "КОНТАКТЫ",
  },
  de: {
    tagline: "Luxus, Natur und die Ägäis — in einem lebendigen Rhythmus.",
    col1Label: "Resort & Aufenthalt",
    col2Label: "Gastronomie & Wellness",
    col3Label: "Die Lotus-Welt",
    col4Label: "SHARE ORKA",
    address: "Cumhuriyet Mah. Atatürk Cad. Nr. 56, İçmeler, Marmaris / Muğla",
    tapToEnlarge: "Zum Vergrößern tippen",
    whatsappShare: "Per WhatsApp teilen",
    directShareLink: "Direkter Teilen-Link",
    linkCopied: "Link kopiert!",
    bottomTagline: "Luxus, Natur & die Ägäis · Ultra All Inclusive",
    home: "STARTSEITE",
    roomsServices: "ZIMMER & SERVICE",
    medical: "MEDIZIN",
    hotelDirectory: "HOTELVERZEICHNIS",
    poolsBeach: "POOLS & STRAND",
    watersports: "WASSERSPORT",
    miniClub: "MINICLUB",
    kidsBadge: "Kinder",
    shops: "GESCHÄFTE",
    restaurantsBars: "RESTAURANTS & BARS",
    activitiesSpa: "AKTIVITÄTEN & SPA",
    iconBeach: "ICON BEACH",
    rankYourLotus: "RATE YOUR LOTUS",
    managementPersonnel: "MANAGEMENT & PERSONAL",
    marmaris: "MARMARIS",
    orkaHomes: "ORKA HOMES",
    orkaLegacy: "ORKA ERBE",
    contact: "KONTAKT",
  },
};

export const headerTranslations: Record<
  Locale,
  {
    home: string;
    activitiesSpa: string;
    poolsBeach: string;
    miniClub: string;
    dining: string;
    rooms: string;
    directory: string;
    iconBeach: string;
    openMenu: string;
    qrShareTitle: string;
  }
> = {
  en: {
    home: "Home",
    activitiesSpa: "Activities & Spa",
    poolsBeach: "Pools & Beach",
    miniClub: "Mini Club",
    dining: "Dining",
    rooms: "Rooms",
    directory: "Directory",
    iconBeach: "Icon Beach",
    openMenu: "Open menu",
    qrShareTitle: "Share & Website QR Code",
  },
  tr: {
    home: "Ana Sayfa",
    activitiesSpa: "Aktiviteler & Spa",
    poolsBeach: "Havuzlar & Plaj",
    miniClub: "Mini Kulüp",
    dining: "Yeme İçme",
    rooms: "Odalar",
    directory: "Rehber",
    iconBeach: "Icon Beach",
    openMenu: "Menüyü aç",
    qrShareTitle: "Paylaş & Web Sitesi QR Kodu",
  },
  ru: {
    home: "Главная",
    activitiesSpa: "Активности и Спа",
    poolsBeach: "Бассейны и Пляж",
    miniClub: "Мини-клуб",
    dining: "Рестораны",
    rooms: "Номера",
    directory: "Справочник",
    iconBeach: "Icon Beach",
    openMenu: "Открыть меню",
    qrShareTitle: "Поделиться и QR-код сайта",
  },
  de: {
    home: "Startseite",
    activitiesSpa: "Aktivitäten & Spa",
    poolsBeach: "Pools & Strand",
    miniClub: "Miniclub",
    dining: "Gastronomie",
    rooms: "Zimmer",
    directory: "Verzeichnis",
    iconBeach: "Icon Beach",
    openMenu: "Menü öffnen",
    qrShareTitle: "Teilen & Website-QR-Code",
  },
};

export const shareModalTranslations: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    caption: string;
    shareWhatsApp: string;
    copyDirectLink: string;
    linkCopied: string;
    shareOtherApps: string;
    closeDialog: string;
    copiedToast: string;
  }
> = {
  en: {
    title: "Share Orka Lotus Beach",
    subtitle: "Scan or share with friends & family",
    caption: "Point camera at QR code to open",
    shareWhatsApp: "Share via WhatsApp",
    copyDirectLink: "Copy Direct Link",
    linkCopied: "Link Copied!",
    shareOtherApps: "Share to Other Apps",
    closeDialog: "Close share dialog",
    copiedToast: "Direct link copied to clipboard!",
  },
  tr: {
    title: "Orka Lotus Beach'i Paylaş",
    subtitle: "Arkadaşlarınız ve ailenizle tarayın veya paylaşın",
    caption: "Açmak için kameranızı QR koda doğrultun:",
    shareWhatsApp: "WhatsApp ile Paylaş",
    copyDirectLink: "Doğrudan Bağlantıyı Kopyala",
    linkCopied: "Bağlantı Kopyalandı!",
    shareOtherApps: "Diğer Uygulamalarda Paylaş",
    closeDialog: "Paylaşım penceresini kapat",
    copiedToast: "Doğrudan bağlantı panoya kopyalandı!",
  },
  ru: {
    title: "Поделиться Orka Lotus Beach",
    subtitle: "Отсканируйте или отправьте друзьям и семье",
    caption: "Наведите камеру на QR-код для открытия:",
    shareWhatsApp: "Поделиться в WhatsApp",
    copyDirectLink: "Скопировать прямую ссылку",
    linkCopied: "Ссылка скопирована!",
    shareOtherApps: "Поделиться через другие приложения",
    closeDialog: "Закрыть окно",
    copiedToast: "Прямая ссылка скопирована в буфер обмена!",
  },
  de: {
    title: "Orka Lotus Beach teilen",
    subtitle: "Scannen oder mit Freunden & Familie teilen",
    caption: "Kamera auf den QR-Code richten zum Öffnen:",
    shareWhatsApp: "Per WhatsApp teilen",
    copyDirectLink: "Direkten Link kopieren",
    linkCopied: "Link kopiert!",
    shareOtherApps: "In anderen Apps teilen",
    closeDialog: "Teilen-Dialog schließen",
    copiedToast: "Direkter Link in die Zwischenablage kopiert!",
  },
};

export const WEBSITE_URL = "https://orkalotusbeach.vercel.app/";
export const QR_CODE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
  WEBSITE_URL
)}&color=092939&bgcolor=ffffff&margin=8`;

export const WHATSAPP_SHARE_URL = `https://api.whatsapp.com/send?text=${encodeURIComponent(
  "Discover ORKA LOTUS BEACH in Marmaris — Luxury, Nature and the Aegean: " +
    WEBSITE_URL
)}`;
