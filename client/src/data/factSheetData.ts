import type { Locale } from "./content";

export interface FactSheetGeneral {
  openingDate: string;
  category: string;
  totalArea: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  beachInfo: Record<Locale, string>;
  blocksAndRooms: Record<Locale, string>;
  concept: Record<Locale, string>;
  distances: Array<{
    destination: Record<Locale, string>;
    distance: string;
    duration: string;
  }>;
  placesOfInterest: Array<{
    name: string;
    note?: Record<Locale, string>;
  }>;
}

export interface RoomSpec {
  id: string;
  name: Record<Locale, string>;
  size: string;
  location: Record<Locale, string>;
  view: Record<Locale, string>;
  hasBalcony: boolean;
  isPromo?: boolean;
  roomCountDescription: Record<Locale, string>;
  features: Record<Locale, string[]>;
}

export interface DiningVenueFact {
  name: Record<Locale, string>;
  type: Record<Locale, string>;
  hours: string;
  conceptNote: Record<Locale, string>;
  meals?: Array<{ meal: Record<Locale, string>; time: string }>;
  isChargeable?: boolean;
  requiresReservation?: boolean;
}

export interface BarVenueFact {
  name: string;
  hours: string;
  service: Record<Locale, string>;
  category: "all-day" | "evening" | "pool-beach" | "wellness";
}

export interface UnitScheduleFact {
  unit: Record<Locale, string>;
  hours: string;
  location?: Record<Locale, string>;
  note?: Record<Locale, string>;
}

export interface ServiceItemFact {
  title: Record<Locale, string>;
  description?: Record<Locale, string>;
  badge?: Record<Locale, string>;
}

export const factSheetGeneralData: FactSheetGeneral = {
  openingDate: "2015",
  category: "5-Star Ultra All-Inclusive Beach Resort",
  totalArea: "75,000 m²",
  address: "İçmeler Mah. Atatürk Cd. No:56, 48720 Marmaris / Muğla, Türkiye",
  phone: "+90 252 455 50 50 / 444 6 752",
  website: "https://www.orkalotusbeach.com/",
  email: "info.orkalotus@orkahotels.com",
  beachInfo: {
    en: "Front of the facility · 1 km Private Sandy Beach with 2 Sunbathing Piers & Cabanas",
    tr: "Tesis önünde · 1 km Özel Kum Plaj, 2 Güneşlenme İskelesi ve Kabanalar",
    ru: "Перед отелем · 1 км Частный песчаный пляж с 2 пирсами и беседками",
    de: "Direkt vor der Anlage · 1 km Privater Sandstrand mit 2 Badestegen & Cabanas",
  },
  blocksAndRooms: {
    en: "9 Blocks · 441 Rooms · 1,138 Beds (994 Standard Beds)",
    tr: "9 Blok · 441 Oda · 1.138 Yatak (994 Standart Yatak)",
    ru: "9 Корпусов · 441 Номер · 1 138 Спальных мест",
    de: "9 Gebäude · 441 Zimmer · 1.138 Betten (994 Standardbetten)",
  },
  concept: {
    en: "Ultra All-Inclusive Concept with 24-Hour Lobby Bar, Open Buffet, Snacks, A'La Carte & Wellness",
    tr: "24 Saat Lobi Bar, Açık Büfe, Snack İkramları, Alakart & Spa Dahil Ultra Her Şey Dahil Konsepti",
    ru: "Концепция «Ультра все включено» с круглосуточным лобби-баром, шведским столом и A'La Carte",
    de: "Ultra All-Inclusive-Konzept mit 24-Stunden-Lobbybar, Buffet, Snacks, A'La Carte & Wellness",
  },
  distances: [
    {
      destination: { en: "İçmeler Center", tr: "İçmeler Merkez", ru: "Центр Ичмелера", de: "Zentrum İçmeler" },
      distance: "2 km",
      duration: "5 min",
    },
    {
      destination: { en: "Marmaris Center & Marina", tr: "Marmaris Merkez & Marina", ru: "Центр Мармариса", de: "Zentrum Marmaris" },
      distance: "6 km",
      duration: "10 min",
    },
    {
      destination: { en: "Dalaman Airport (DLM)", tr: "Dalaman Havalimanı (DLM)", ru: "Аэропорт Даламан (DLM)", de: "Flughafen Dalaman (DLM)" },
      distance: "100 km",
      duration: "90 min",
    },
    {
      destination: { en: "Bodrum Milas Airport (BJV)", tr: "Bodrum Milas Havalimanı (BJV)", ru: "Аэропорт Бодрум (BJV)", de: "Flughafen Bodrum (BJV)" },
      distance: "150 km",
      duration: "130 min",
    },
  ],
  placesOfInterest: [
    { name: "Hisarönü Bay" },
    { name: "Selimiye Village" },
    { name: "Datça Peninsula & Old Datça" },
    { name: "Turunç Bay" },
    { name: "Kumlubük" },
    { name: "Orhaniye & Kızkumu Beach" },
    { name: "Kaunos Ancient City & Rock Tombs" },
    { name: "Dalyan Mud Baths & Turtle Beach" },
    { name: "Ephesus (Efes) UNESCO World Heritage" },
    { name: "Pamukkale Thermal Travertines" },
    {
      name: "Rhodes Island (Rodos)",
      note: {
        en: "Daily express catamaran ferry from Marmaris Centrum (45 min)",
        tr: "Marmaris Limanından günlük hızlı katamaran feribot (45 dk)",
        ru: "Ежедневный паром-катамаран из центра Мармариса (45 мин)",
        de: "Tägliche Katamaran-Fähre vom Hafen Marmaris (45 Min.)",
      },
    },
  ],
};

export const factSheetRoomsMatrix: RoomSpec[] = [
  {
    id: "promo-no-view",
    name: { en: "Promo Room (No View)", tr: "Ekonomik Oda (Manzarasız)", ru: "Промо номер (Без вида)", de: "Promo-Zimmer (Ohne Aussicht)" },
    size: "24 m²",
    location: { en: "Main Building & Blocks", tr: "Ana Bina & Bloklar", ru: "Главный корпус и блоки", de: "Hauptgebäude & Blöcke" },
    view: { en: "No View / Internal", tr: "Manzarasız / İç Cephe", ru: "Без вида", de: "Ohne Aussicht" },
    hasBalcony: false,
    isPromo: true,
    roomCountDescription: { en: "1 Bedroom + 1 Bathroom", tr: "1 Yatak Odası + 1 Banyo", ru: "1 Спальня + 1 Ванная", de: "1 Schlafzimmer + 1 Badezimmer" },
    features: {
      en: ["Daily restocked minibar", "LED TV & Satellite", "Free Wi-Fi", "Water heater & Tea/Coffee", "Central AC", "Digital Safe", "Hairdryer", "Rain Shower", "Slippers", "Pillow Menu"],
      tr: ["Günlük yenilenen minibar", "LED TV & Uydu", "Ücretsiz Wi-Fi", "Su ısıtıcı & Çay/Kahve", "Merkezi Klima", "Çelik Kasa", "Saç Kurutma", "Yağmur Duşu", "Terlik", "Yastık Menüsü"],
      ru: ["Ежедневный мини-бар", "LED ТВ и спутник", "Бесплатный Wi-Fi", "Чайник и чай/кофе", "Кондиционер", "Сейф", "Фен", "Тропический душ", "Тапочки", "Меню подушек"],
      de: ["Täglich gefüllte Minibar", "LED-TV & Satellit", "Kostenloses WLAN", "Wasserkocher & Tee/Kaffee", "Zentrale Klimaanlage", "Safe", "Föhn", "Regendusche", "Hausschuhe", "Kissenmenü"],
    },
  },
  {
    id: "standard-land",
    name: { en: "Standard Room (Land View)", tr: "Standart Oda (Kara Manzaralı)", ru: "Стандартный номер (Вид на горы/парк)", de: "Standardzimmer (Landblick)" },
    size: "26 m²",
    location: { en: "Main Building & Blocks", tr: "Ana Bina & Bloklar", ru: "Главный корпус и блоки", de: "Hauptgebäude & Blöcke" },
    view: { en: "Pine Forest & Mountain View", tr: "Çam Ormanı & Dağ Manzarası", ru: "Сосновый лес и горы", de: "Pinienwald- & Bergblick" },
    hasBalcony: true,
    roomCountDescription: { en: "1 Bedroom + 1 Bathroom + Balcony", tr: "1 Yatak Odası + 1 Banyo + Balkon", ru: "1 Спальня + 1 Ванная + Балкон", de: "1 Schlafzimmer + 1 Bad + Balkon" },
    features: {
      en: ["Furnished Balcony / Terrace", "Daily soft drinks minibar", "LED TV & Satellite", "Free Wi-Fi", "Water heater & Tea/Coffee set", "Central AC", "In-room Safe", "Rain Shower & WC", "Makeup mirror & Hairdryer", "Laminated flooring & Slippers", "Pillow Menu"],
      tr: ["Balkon veya Teras", "Günlük minibar (meşrubat)", "LED TV & Uydu", "Ücretsiz Wi-Fi", "Su ısıtıcısı & Çay/Kahve", "Merkezi Klima", "Dijital Kasa", "Yağmur Duşu & WC", "Makyaj Aynası & Fön", "Laminant Zemin & Terlik", "Yastık Menüsü"],
      ru: ["Балкон или терраса", "Ежедневный мини-бар", "LED ТВ", "Бесплатный Wi-Fi", "Чайный набор", "Кондиционер", "Сейф", "Тропический душ", "Зеркало для макияжа и фен", "Ламинат и тапочки", "Меню подушек"],
      de: ["Möblierter Balkon/Terrasse", "Tägliche Minibar", "LED-TV", "Kostenloses WLAN", "Tee-/Kaffeeset", "Zentralklimaanlage", "Zimmersafe", "Regendusche & WC", "Kosmetikspiegel & Föhn", "Laminatboden & Slipper", "Kissenmenü"],
    },
  },
  {
    id: "standard-side-sea",
    name: { en: "Standard Room (Side Sea View)", tr: "Standart Oda (Kısmi Deniz Manzaralı)", ru: "Стандартный номер (Боковой вид на море)", de: "Standardzimmer (Seitlicher Meerblick)" },
    size: "26 m²",
    location: { en: "Main Building & Blocks", tr: "Ana Bina & Bloklar", ru: "Главный корпус и блоки", de: "Hauptgebäude & Blöcke" },
    view: { en: "Limited / Side Aegean Sea View", tr: "Kısmi Ege Denizi Manzarası", ru: "Боковой вид на Эгейское море", de: "Seitlicher Blick auf das Ägäische Meer" },
    hasBalcony: true,
    roomCountDescription: { en: "1 Bedroom + 1 Bathroom + Balcony", tr: "1 Yatak Odası + 1 Banyo + Balkon", ru: "1 Спальня + 1 Ванная + Балкон", de: "1 Schlafzimmer + 1 Bad + Balkon" },
    features: {
      en: ["Furnished Balcony", "Daily soft drinks minibar", "LED TV & Satellite", "Free Wi-Fi", "Water heater & Tea/Coffee", "Central AC", "In-room Safe", "Rain Shower", "Makeup mirror & Hairdryer", "Laminated flooring", "Pillow Menu"],
      tr: ["Balkon", "Günlük minibar", "LED TV", "Ücretsiz Wi-Fi", "Çay/Kahve seti", "Merkezi Klima", "Kasa", "Yağmur Duşu", "Makyaj aynası", "Laminant zemin", "Yastık Menüsü"],
      ru: ["Балкон", "Мини-бар", "LED ТВ", "Wi-Fi", "Чайник", "Кондиционер", "Сейф", "Душ", "Фен", "Ламинат", "Меню подушек"],
      de: ["Balkon", "Minibar", "LED-TV", "WLAN", "Tee-/Kaffeeset", "Klimaanlage", "Safe", "Regendusche", "Föhn", "Laminat", "Kissenmenü"],
    },
  },
  {
    id: "standard-sea",
    name: { en: "Standard Room (Direct Sea View)", tr: "Standart Oda (Direkt Deniz Manzaralı)", ru: "Стандартный номер (Прямой вид на море)", de: "Standardzimmer (Direkter Meerblick)" },
    size: "26 m²",
    location: { en: "Main Building & Blocks", tr: "Ana Bina & Bloklar", ru: "Главный корпус и блоки", de: "Hauptgebäude & Blöcke" },
    view: { en: "Panoramic Aegean Sea View", tr: "Panoramik Ege Denizi Manzarası", ru: "Панорамный вид на Эгейское море", de: "Panoramablick auf das Ägäische Meer" },
    hasBalcony: true,
    roomCountDescription: { en: "1 Bedroom + 1 Bathroom + Balcony", tr: "1 Yatak Odası + 1 Banyo + Balkon", ru: "1 Спальня + 1 Ванная + Balkon", de: "1 Schlafzimmer + 1 Bad + Balkon" },
    features: {
      en: ["Direct Seafront Balcony", "Daily restocked minibar", "LED TV & Satellite", "Free Wi-Fi", "Water heater & Tea/Coffee", "Central AC", "Digital Safe", "Rain Shower", "Makeup mirror", "Laminated flooring", "Pillow Menu"],
      tr: ["Direkt Deniz Manzaralı Balkon", "Günlük yenilenen minibar", "LED TV & Uydu", "Ücretsiz Wi-Fi", "Çay/Kahve seti", "Merkezi Klima", "Dijital Kasa", "Yağmur Duşu", "Makyaj aynası", "Laminant zemin", "Yastık Menüsü"],
      ru: ["Балкон с видом на море", "Ежедневный мини-бар", "LED ТВ", "Wi-Fi", "Чайник", "Кондиционер", "Сейф", "Тропический душ", "Зеркало", "Ламинат", "Меню подушек"],
      de: ["Direkter Meerblick-Balkon", "Täglich Minibar", "LED-TV", "WLAN", "Tee-/Kaffeeset", "Klimaanlage", "Safe", "Regendusche", "Kosmetikspiegel", "Laminat", "Kissenmenü"],
    },
  },
  {
    id: "large-land",
    name: { en: "Large Room (Land View)", tr: "Geniş Oda (Kara Manzaralı)", ru: "Большой номер (Вид на горы/парк)", de: "Großes Zimmer (Landblick)" },
    size: "36 m²",
    location: { en: "Main Building & Blocks", tr: "Ana Bina & Bloklar", ru: "Главный корпус и блоки", de: "Hauptgebäude & Blöcke" },
    view: { en: "Pine Forest & Mountain View", tr: "Çam Ormanı & Doğa Manzarası", ru: "Вид на лес и горы", de: "Blick auf Pinienwald & Natur" },
    hasBalcony: true,
    roomCountDescription: { en: "Spacious Open Layout Bedroom + 1 Bathroom + Balcony", tr: "Geniş Yatak Odası + 1 Banyo + Balkon", ru: "Просторная спальня + 1 Ванная + Балкон", de: "Großes Schlafzimmer + 1 Bad + Balkon" },
    features: {
      en: ["Spacious 36 m² Living Area", "Furnished Terrace or Balcony", "Daily minibar filled with soft drinks", "LED TV with Satellite", "Free Wi-Fi", "Water heater & Tea/Coffee", "Central Air Conditioning", "Safe Box", "Rain Shower / WC", "Makeup Mirror & Hairdryer", "Reading Lamp", "Laminated Flooring & Slippers", "Pillow Menu"],
      tr: ["36 m² Geniş Yaşam Alanı", "Balkon veya Teras", "Günlük meşrubat dolu minibar", "LED TV & Uydu", "Ücretsiz Wi-Fi", "Su ısıtıcısı & Çay/Kahve", "Merkezi Klima", "Çelik Kasa", "Yağmur Duşu / WC", "Makyaj Aynası & Saç Kurutma", "Okuma Lambası", "Laminant Parke & Terlik", "Yastık Menüsü"],
      ru: ["Просторная площадь 36 м²", "Терраса или балкон", "Мини-бар с напитками", "LED ТВ", "Wi-Fi", "Чайный набор", "Кондиционер", "Сейф", "Тропический душ", "Зеркало для макияжа", "Лампа для чтения", "Ламинат и тапочки", "Меню подушек"],
      de: ["Großzügige 36 m² Fläche", "Terrasse oder Balkon", "Täglich aufgefüllte Minibar", "LED-TV", "WLAN", "Tee-/Kaffeeset", "Klimaanlage", "Zimmersafe", "Regendusche / WC", "Kosmetikspiegel & Föhn", "Leselampe", "Laminatboden & Slipper", "Kissenmenü"],
    },
  },
  {
    id: "large-sea",
    name: { en: "Large Room (Sea View)", tr: "Geniş Oda (Deniz Manzaralı)", ru: "Большой номер (Вид на море)", de: "Großes Zimmer (Meerblick)" },
    size: "36 m²",
    location: { en: "Main Building & Blocks", tr: "Ana Bina & Bloklar", ru: "Главный корпус и блоки", de: "Hauptgebäude & Blöcke" },
    view: { en: "Panoramic Aegean Sea View", tr: "Panoramik Ege Denizi Manzarası", ru: "Панорамный вид на Эгейское море", de: "Panoramablick auf das Meer" },
    hasBalcony: true,
    roomCountDescription: { en: "Spacious Open Layout Bedroom + 1 Bathroom + Balcony", tr: "Geniş Yatak Odası + 1 Banyo + Balkon", ru: "Просторная спальня + 1 Ванная + Балкон", de: "Großes Schlafzimmer + 1 Bad + Balkon" },
    features: {
      en: ["Direct Panoramic Sea View", "36 m² Spacious Comfort", "Furnished Terrace or Balcony", "Daily soft drinks minibar", "LED TV & Satellite", "Free Wi-Fi", "Water heater & Tea/Coffee", "Central Air Conditioning", "Safe Box", "Rain Shower / WC", "Makeup Mirror & Hairdryer", "Reading Lamp", "Laminated Flooring & Slippers", "Pillow Menu"],
      tr: ["Direkt Panoramik Deniz Manzarası", "36 m² Geniş Konfor", "Balkon veya Teras", "Günlük minibar", "LED TV & Uydu", "Ücretsiz Wi-Fi", "Çay/Kahve İkramı", "Merkezi Klima", "Dijital Kasa", "Yağmur Duşu", "Makyaj Aynası & Fön", "Okuma Lambası", "Laminant Parke & Terlik", "Yastık Menüsü"],
      ru: ["Прямой панорамный вид на море", "Площадь 36 м²", "Балкон или терраса", "Ежедневный мини-бар", "LED ТВ", "Wi-Fi", "Чайный набор", "Кондиционер", "Сейф", "Душ", "Зеркало для макияжа", "Лампа для чтения", "Ламинат и тапочки", "Меню подушек"],
      de: ["Direkter Panoramameerblick", "36 m² großzügiger Komfort", "Balkon oder Terrasse", "Täglich gefüllte Minibar", "LED-TV", "WLAN", "Tee-/Kaffeeset", "Klimaanlage", "Safe", "Regendusche", "Kosmetikspiegel & Föhn", "Leselampe", "Laminatboden & Slipper", "Kissenmenü"],
    },
  },
  {
    id: "family-land",
    name: { en: "Family Room (Land View)", tr: "Aile Odası (Kara Manzaralı)", ru: "Семейный номер (Вид на горы/парк)", de: "Familienzimmer (Landblick)" },
    size: "36–40 m²",
    location: { en: "Main Building & Blocks", tr: "Ana Bina & Bloklar", ru: "Главный корпус и блоки", de: "Hauptgebäude & Blöcke" },
    view: { en: "Pine Forest & Mountain View", tr: "Çam Ormanı & Bahçe Manzarası", ru: "Вид на сосновый лес и горы", de: "Pinienwald- & Gartenblick" },
    hasBalcony: true,
    roomCountDescription: { en: "2 Separate Rooms + 1 Bathroom (Connecting Door)", tr: "2 Ayrı Oda + 1 Banyo (Bağlantılı Kapı)", ru: "2 Раздельные комнаты + 1 Ванная (Смежные)", de: "2 getrennte Zimmer + 1 Badezimmer (Verbindungstür)" },
    features: {
      en: ["2 Distinct Rooms with Connecting Privacy Door", "36–40 m² Total Area", "Furnished Balcony or Terrace", "Daily minibar filled with soft drinks", "LED TV & Satellite", "Free High-Speed Wi-Fi", "Water heater & Tea/Coffee options", "Central AC", "Safe Box", "Rain Shower / WC", "Makeup Mirror & Hairdryer", "Reading Lamp", "Laminated Flooring & Slippers", "Pillow Menu"],
      tr: ["Ara Kapılı 2 Ayrı Yatak Odası", "36–40 m² Toplam Alan", "Balkon veya Teras", "Günlük meşrubat dolu minibar", "LED TV & Uydu", "Ücretsiz Wi-Fi", "Su ısıtıcısı & Çay/Kahve", "Merkezi Klima", "Dijital Kasa", "Yağmur Duşu / WC", "Makyaj Aynası & Fön", "Okuma Lambası", "Laminant Parke & Terlik", "Yastık Menüsü"],
      ru: ["2 Раздельные спальни с межкомнатной дверью", "Площадь 36–40 м²", "Балкон или терраса", "Ежедневный мини-бар", "LED ТВ", "Wi-Fi", "Чайник и чай/кофе", "Кондиционер", "Сейф", "Тропический душ", "Зеркало для макияжа", "Лампа для чтения", "Ламинат и тапочки", "Меню подушек"],
      de: ["2 separate Zimmer mit Verbindungstür", "36–40 m² Gesamtfläche", "Balkon oder Terrasse", "Täglich Minibar", "LED-TV", "WLAN", "Tee-/Kaffeeset", "Klimaanlage", "Safe", "Regendusche / WC", "Kosmetikspiegel & Föhn", "Leselampe", "Laminatboden & Slipper", "Kissenmenü"],
    },
  },
  {
    id: "family-side-sea",
    name: { en: "Family Room (Side Sea View)", tr: "Aile Odası (Kısmi Deniz Manzaralı)", ru: "Семейный номер (Боковой вид на море)", de: "Familienzimmer (Seitlicher Meerblick)" },
    size: "36–40 m²",
    location: { en: "Main Building & Blocks", tr: "Ana Bina & Bloklar", ru: "Главный корпус и блоки", de: "Hauptgebäude & Blöcke" },
    view: { en: "Side / Partial Aegean Sea View", tr: "Kısmi Ege Denizi Manzarası", ru: "Боковой вид на море", de: "Seitlicher Meerblick" },
    hasBalcony: true,
    roomCountDescription: { en: "2 Separate Rooms + 1 Bathroom (Connecting Door)", tr: "2 Ayrı Oda + 1 Banyo (Bağlantılı Kapı)", ru: "2 Раздельные комнаты + 1 Ванная (Смежные)", de: "2 getrennte Zimmer + 1 Badezimmer" },
    features: {
      en: ["2 Separate Bedrooms + 1 Bathroom", "Side Sea View Balcony", "Daily soft drinks minibar", "LED TV & Satellite", "Free Wi-Fi", "Water heater & Tea/Coffee", "Central AC", "Digital Safe", "Rain Shower", "Makeup mirror & Hairdryer", "Laminated flooring", "Pillow Menu"],
      tr: ["2 Ayrı Yatak Odası + 1 Banyo", "Kısmi Deniz Manzaralı Balkon", "Günlük minibar", "LED TV & Uydu", "Ücretsiz Wi-Fi", "Çay/Kahve seti", "Merkezi Klima", "Dijital Kasa", "Yağmur Duşu", "Makyaj aynası", "Laminant zemin", "Yastık Menüsü"],
      ru: ["2 Раздельные спальни + 1 ванная", "Балкон с боковым видом на море", "Мини-бар", "LED ТВ", "Wi-Fi", "Чайник", "Кондиционер", "Сейф", "Душ", "Зеркало", "Ламинат", "Меню подушек"],
      de: ["2 separate Schlafzimmer + 1 Bad", "Balkon mit seitlichem Meerblick", "Minibar", "LED-TV", "WLAN", "Tee-/Kaffeeset", "Klimaanlage", "Safe", "Regendusche", "Kosmetikspiegel", "Laminat", "Kissenmenü"],
    },
  },
  {
    id: "family-sea",
    name: { en: "Family Room (Direct Sea View)", tr: "Aile Odası (Direkt Deniz Manzaralı)", ru: "Семейный номер (Прямой вид на море)", de: "Familienzimmer (Direkter Meerblick)" },
    size: "36–40 m²",
    location: { en: "Main Building & Blocks", tr: "Ana Bina & Bloklar", ru: "Главный корпус и блоки", de: "Hauptgebäude & Blöcke" },
    view: { en: "Panoramic Aegean Seafront View", tr: "Panoramik Direkt Ege Denizi Manzarası", ru: "Панорамный прямой вид на море", de: "Direkter Panoramameerblick" },
    hasBalcony: true,
    roomCountDescription: { en: "2 Separate Rooms + 1 Bathroom (Connecting Door)", tr: "2 Ayrı Oda + 1 Banyo (Bağlantılı Kapı)", ru: "2 Раздельные комнаты + 1 Ванная", de: "2 getrennte Zimmer + 1 Badezimmer" },
    features: {
      en: ["Direct Seafront Balcony overlooking Marmaris Bay", "2 Separate Sleeping Quarters + 1 Bathroom", "Daily minibar filled with soft drinks", "LED TV with Satellite", "Free High-Speed Wi-Fi", "Water heater & Tea/Coffee options", "Central Air Conditioning", "Safe Box", "Rain Shower / WC", "Makeup Mirror & Hairdryer", "Reading Lamp", "Laminated Flooring & Slippers", "Pillow Menu"],
      tr: ["Marmaris Körfezi Manzaralı Direkt Deniz Balkonu", "Ara Kapılı 2 Ayrı Yatak Odası + 1 Banyo", "Günlük meşrubat dolu minibar", "LED TV & Uydu", "Ücretsiz Wi-Fi", "Su ısıtıcısı & Çay/Kahve", "Merkezi Klima", "Çelik Kasa", "Yağmur Duşu / WC", "Makyaj Aynası & Saç Kurutma", "Okuma Lambası", "Laminant Parke & Terlik", "Yastık Menüsü"],
      ru: ["Прямой балкон с видом на залив Мармариса", "2 Раздельные спальни с дверью + 1 ванная", "Ежедневный мини-бар", "LED ТВ", "Wi-Fi", "Чайный набор", "Кондиционер", "Сейф", "Тропический душ", "Зеркало для макияжа", "Лампа для чтения", "Ламинат и тапочки", "Меню подушек"],
      de: ["Direkter Meerblick-Balkon über die Bucht von Marmaris", "2 getrennte Schlafbereiche mit Verbindungstür + 1 Bad", "Täglich aufgefüllte Minibar", "LED-TV", "WLAN", "Tee-/Kaffeeset", "Klimaanlage", "Zimmersafe", "Regendusche / WC", "Kosmetikspiegel & Föhn", "Leselampe", "Laminatboden & Slipper", "Kissenmenü"],
    },
  },
];

export const diningFactSheetVenues: DiningVenueFact[] = [
  {
    name: { en: "Pine Restaurant (Main)", tr: "Pine Ana Restoran", ru: "Главный ресторан Pine", de: "Pine Hauptrestaurant" },
    type: { en: "Open Buffet · International & Turkish Cuisine", tr: "Açık Büfe · Uluslararası & Türk Mutfağı", ru: "Шведский стол · Международная и турецкая кухня", de: "Offenes Buffet · Internationale & Türkische Küche" },
    hours: "07:00 – 11:00 / 12:30 – 14:30 / 19:00 – 21:30 / 23:00 – 02:00",
    conceptNote: { en: "Included in All-Inclusive concept", tr: "Her Şey Dahil konseptine dahildir", ru: "Входит в концепцию «Все включено»", de: "Im All-Inclusive-Konzept enthalten" },
    meals: [
      { meal: { en: "Breakfast", tr: "Kahvaltı", ru: "Завтрак", de: "Frühstück" }, time: "07:00 – 10:00" },
      { meal: { en: "Late Breakfast", tr: "Geç Kahvaltı", ru: "Поздний завтрак", de: "Spätes Frühstück" }, time: "10:00 – 11:00" },
      { meal: { en: "Lunch", tr: "Öğle Yemeği", ru: "Обед", de: "Mittagessen" }, time: "12:30 – 14:30" },
      { meal: { en: "Dinner", tr: "Akşam Yemeği", ru: "Ужин", de: "Abendessen" }, time: "19:00 – 21:30" },
      { meal: { en: "Night Snack", tr: "Gece Çorbası & Snack", ru: "Ночные закуски", de: "Mitternachtssnack" }, time: "23:00 – 02:00" },
    ],
    isChargeable: false,
  },
  {
    name: { en: "Tapas Snack Restaurant", tr: "Tapas Snack Restoran", ru: "Снэк-ресторан Tapas", de: "Tapas Snack-Restaurant" },
    type: { en: "Poolside Snacks, Salads, Burgers & Treats", tr: "Havuz Başı Snack, Salata, Burger ve İkramlar", ru: "Закуски у бассейна, салаты, бургеры", de: "Poolside Snacks, Salate, Burger & Leckereien" },
    hours: "12:00 – 17:00",
    conceptNote: { en: "Included in All-Inclusive concept", tr: "Her Şey Dahil konseptine dahildir", ru: "Входит в концепцию «Все включено»", de: "Im All-Inclusive-Konzept enthalten" },
    isChargeable: false,
  },
  {
    name: { en: "Aqua Snack Restaurant", tr: "Aqua Snack Restoran", ru: "Снэк-ресторан Aqua", de: "Aqua Snack-Restaurant" },
    type: { en: "Aquapark Light Dining & Fresh Bites", tr: "Aquapark Yanı Hızlı Menü ve Taze Atıştırmalıklar", ru: "Легкие закуски в аквапарке", de: "Leichte Mahlzeiten & Snacks im Aquapark" },
    hours: "12:00 – 17:00",
    conceptNote: { en: "Included in All-Inclusive concept", tr: "Her Şey Dahil konseptine dahildir", ru: "Входит в концепцию «Все включено»", de: "Im All-Inclusive-Konzept enthalten" },
    isChargeable: false,
  },
  {
    name: { en: "Olive Tree Italian A'La Carte", tr: "Olive Tree İtalyan Alakart", ru: "Итальянский A'La Carte ресторан Olive Tree", de: "Olive Tree Italienisches A'La Carte" },
    type: { en: "Special Italian Menu · Fine Dining", tr: "Özel İtalyan Menüsü · Seçkin Akşam Yemeği", ru: "Специальное итальянское меню", de: "Spezielles italienisches Menü · Fine Dining" },
    hours: "19:00 – 21:30",
    conceptNote: {
      en: "Booking in advance required. 1 Free attendance per 7 nights stay (Italian or Turkish)",
      tr: "Ön rezervasyon gereklidir. 7 gecelik konaklamada 1 kez ücretsiz (İtalyan veya Türk)",
      ru: "Требуется предварительное бронирование. 1 бесплатное посещение за 7 ночей",
      de: "Vorausbuchung erforderlich. 1 kostenloses Abendessen pro 7 Nächte (Italienisch oder Türkisch)",
    },
    requiresReservation: true,
    isChargeable: false,
  },
  {
    name: { en: "Turquoise Turkish A'La Carte", tr: "Turquoise Türk Alakart", ru: "Турецкий A'La Carte ресторан Turquoise", de: "Turquoise Türkisches A'La Carte" },
    type: { en: "Authentic Turkish & Ottoman Specialties", tr: "Geleneksel Türk & Osmanlı Lezzetleri", ru: "Традиционная турецкая и османская кухня", de: "Authentische türkische & osmanische Spezialitäten" },
    hours: "19:00 – 21:30",
    conceptNote: {
      en: "Booking in advance required. 1 Free attendance per 7 nights stay (Italian or Turkish)",
      tr: "Ön rezervasyon gereklidir. 7 gecelik konaklamada 1 kez ücretsiz (İtalyan veya Türk)",
      ru: "Требуется предварительное бронирование. 1 бесплатное посещение за 7 ночей",
      de: "Vorausbuchung erforderlich. 1 kostenloses Abendessen pro 7 Nächte (Italienisch oder Türkisch)",
    },
    requiresReservation: true,
    isChargeable: false,
  },
  {
    name: { en: "Chinese Garden A'La Carte", tr: "Chinese Garden Çin Alakart", ru: "Китайский A'La Carte ресторан Chinese Garden", de: "Chinese Garden Chinesisches A'La Carte" },
    type: { en: "Far Eastern Asian Specialties · Special Menu", tr: "Uzak Doğu & Çin Mutfağı · Özel Menü", ru: "Блюда дальневосточной и китайской кухни", de: "Fernöstliche & Chinesische Spezialitäten" },
    hours: "19:00 – 21:30",
    conceptNote: {
      en: "Booking in advance required. Service with extra charge.",
      tr: "Ön rezervasyon gereklidir. Ücretli alakart hizmetidir.",
      ru: "Требуется предварительное бронирование. За дополнительную плату.",
      de: "Vorausbuchung erforderlich. Gegen Aufpreis.",
    },
    requiresReservation: true,
    isChargeable: true,
  },
];

export const barsFactSheetVenues: BarVenueFact[] = [
  {
    name: "Lotus Lobby Bar",
    hours: "24 Hours (Open All Day & Night)",
    service: {
      en: "Full selection of alcoholic & non-alcoholic drinks including selected international brands",
      tr: "Seçkin yabancı içecekler dahil yerli ve alkolsüz içeceklerin eksiksiz sunumu (24 Saat)",
      ru: "Полный выбор напитков, включая некоторые импортные бренды (Круглосуточно)",
      de: "Vollständige Auswahl an Getränken inklusive ausgewählter internationaler Marken (24 Std.)",
    },
    category: "all-day",
  },
  {
    name: "Blue Bar",
    hours: "18:00 – 01:00",
    service: {
      en: "Full selection of drinks including selected international cocktails & spirits",
      tr: "Seçkin yabancı içecekler ve özel kokteyller eşliğinde akşam servisi",
      ru: "Полный ассортимент напитков и коктейлей в вечернее время",
      de: "Auswahl an Getränken inklusive ausgewählter internationaler Drinks",
    },
    category: "evening",
  },
  {
    name: "La Patisserie",
    hours: "12:00 – 18:00",
    service: {
      en: "Selection of fresh daily cakes, pastries, cookies, aromatic coffee & brewed tea",
      tr: "Günlük taze pastalar, kurabiyeler, kekler, aromatik kahveler ve taze demlenmiş çay",
      ru: "Выбор свежих тортов, пирожных, печенья, кофе и чая",
      de: "Auswahl an frischen Kuchen, Gebäck, Keksen, aromatischem Kaffee und Tee",
    },
    category: "all-day",
  },
  {
    name: "Relax Pool Bar",
    hours: "10:00 – 17:00",
    service: {
      en: "Local alcoholic & non-alcoholic drinks in peaceful adults-oriented ambiance",
      tr: "Sakin havuz ortamında yerli alkollü ve alkolsüz soğuk içecekler",
      ru: "Местные алкогольные и безалкогольные напитки в спокойной зоне",
      de: "Lokale alkoholische und alkoholfreie Getränke am Ruhepool",
    },
    category: "pool-beach",
  },
  {
    name: "Tapas Pool Bar",
    hours: "10:00 – 18:00",
    service: {
      en: "Local alcoholic & non-alcoholic refreshing beverages by the main pool",
      tr: "Ana havuz başında serinletici yerli alkollü ve alkolsüz içecekler",
      ru: "Освежающие напитки у главного бассейна",
      de: "Erfrischende alkoholische & alkoholfreie Getränke am Hauptpool",
    },
    category: "pool-beach",
  },
  {
    name: "Twin Pool Bar",
    hours: "10:00 – 18:00",
    service: {
      en: "Local alcoholic & non-alcoholic beverages near the twin pools sun terrace",
      tr: "Twin havuz güneşlenme terasında yerli alkollü ve alkolsüz içecekler",
      ru: "Местные напитки на солнечной террасе у бассейнов Twin",
      de: "Lokale Getränke auf der Sonnenterrasse der Twin-Pools",
    },
    category: "pool-beach",
  },
  {
    name: "Aqua Bar",
    hours: "10:00 – 00:00",
    service: {
      en: "Local alcoholic & non-alcoholic drinks serving the aquapark and daytime activities",
      tr: "Aquapark ve gün boyu etkinlik alanında yerli alkollü/alkolsüz içecek servisi",
      ru: "Напитки для гостей аквапарка и дневных активностей",
      de: "Getränkeservice am Aquapark bis Mitternacht",
    },
    category: "pool-beach",
  },
  {
    name: "Beach Bar",
    hours: "10:00 – 18:00",
    service: {
      en: "Chilled beers, wines, sodas, juices and refreshments directly on the sandy shoreline",
      tr: "Özel kum plajda buz gibi bira, şarap, meşrubat ve serinletici içecekler",
      ru: "Прохладительные напитки прямо на песчаном пляже",
      de: "Gekühlte Getränke und Erfrischungen direkt am Sandstrand",
    },
    category: "pool-beach",
  },
  {
    name: "Spa Vitamin Bar",
    hours: "10:00 – 18:00",
    service: {
      en: "Fresh fruit drinks, detox infusions, herbal teas and revitalizing wellness beverages",
      tr: "Taze meyve suları, detoks çayları ve spa sonrası canlandırıcı içecekler",
      ru: "Свежие фруктовые напитки, детокс-чаи и витаминные коктейли",
      de: "Frische Fruchtsäfte, Detox-Tees und revitalisierende Wellness-Drinks",
    },
    category: "wellness",
  },
];

export const facilitiesAndUnitsTimetable: UnitScheduleFact[] = [
  {
    unit: { en: "Spa & Wellness Center", tr: "Spa & Sağlık Merkezi", ru: "Спа и оздоровительный центр", de: "Spa & Wellness-Center" },
    hours: "09:00 – 19:00",
    location: { en: "B Block, Level -1", tr: "B Blok, -1. Kat", ru: "Корпус B, уровень -1", de: "B-Block, Ebene -1" },
    note: { en: "Turkish Bath, Sauna, Steam Room, Indoor Pool, Vitamin Bar, Changing Rooms", tr: "Türk Hamamı, Sauna, Buhar Odası, Kapalı Havuz, Vitamin Bar, Soyunma Odaları", ru: "Хамам, сауна, парная, закрытый бассейн, витамин-бар", de: "Türkisches Bad, Sauna, Dampfbad, Hallenbad, Vitaminbar" },
  },
  {
    unit: { en: "Fitness Center", tr: "Fitness & Spor Salonu", ru: "Фитнес-центр", de: "Fitnessstudio" },
    hours: "08:00 – 19:00",
    location: { en: "Spa Area, Level -1", tr: "Spa Alanı, -1. Kat", ru: "Зона спа, уровень -1", de: "Spa-Bereich, Ebene -1" },
    note: { en: "Modern cardio and strength equipment, Yoga & Pilates mats, Trainer assistance", tr: "Modern kardiyo ve ağırlık aletleri, Yoga ve Pilates alanı", ru: "Современные кардио и силовые тренажеры, йога", de: "Moderne Ausdauer- und Kraftgeräte, Yoga & Pilates" },
  },
  {
    unit: { en: "Aqua Park & Splash Pool", tr: "Aquapark & Splash Çocuk Havuzu", ru: "Аквапарк и детский бассейн", de: "Aquapark & Splash-Kinderpool" },
    hours: "10:30 – 12:30 / 14:30 – 17:30",
    location: { en: "Aqua Zone", tr: "Aquapark Alanı", ru: "Аквазона", de: "Aquapark-Bereich" },
    note: { en: "6 Different slides for adults and children (Curved Slide, Speed Slide)", tr: "Yetişkinler ve çocuklar için 6 farklı su kaydırağı", ru: "6 водных горок для взрослых и детей", de: "6 verschiedene Wasserrutschen für Erwachsene und Kinder" },
  },
  {
    unit: { en: "Heated Indoor Pool & Kids Indoor Pool", tr: "Isıtmalı Kapalı Havuz & Kapalı Çocuk Havuzu", ru: "Крытый бассейн и детский бассейн", de: "Beheiztes Hallenbad & Kinderbecken" },
    hours: "09:00 – 18:00",
    location: { en: "Spa Center", tr: "Spa Merkezi", ru: "Спа-центр", de: "Spa-Center" },
    note: { en: "Year-round temperature-controlled relaxation pool + children pool", tr: "Yıl boyu ısıtmalı dinlenme havuzu ve çocuk havuzu", ru: "Крытый бассейн с подогревом", de: "Temperierter Innenpool + Kinderbecken" },
  },
  {
    unit: { en: "Mini Club & Kids Playground", tr: "Mini Kulüp & Çocuk Oyun Parkı", ru: "Мини-клуб и детская площадка", de: "Miniclub & Kinderspielplatz" },
    hours: "10:00 – 12:00 / 14:30 – 17:30",
    location: { en: "Kids Zone Garden", tr: "Çocuk Kulübü Bahçesi", ru: "Детская зона в саду", de: "Miniclub-Garten" },
    note: { en: "Supervised games, splash pool, indoor playgrounds, face painting, mini disco", tr: "Eğlenceli oyunlar, çocuk havuzu, yüz boyama ve akşam mini disko", ru: "Игры под присмотром, детский бассейн, мини-диско", de: "Betreute Spiele, Kinderpool, Gesichtsbemalung, Minidisco" },
  },
  {
    unit: { en: "Resort Market & Boutiques", tr: "Market & Alışveriş Mağazaları", ru: "Маркет и бутики", de: "Markt & Boutiquen" },
    hours: "08:00 – 00:00",
    location: { en: "Shopping Arcade", tr: "Alışveriş Caddesi", ru: "Торговая галерея", de: "Einkaufspassage" },
    note: { en: "Daily essentials, beachwear, souvenirs, snacks, jewelry & leather shops", tr: "Günlük ihtiyaçlar, plaj giyim, hediyelik eşya, takı ve deri mağazaları", ru: "Товары первой необходимости, сувениры, пляжная одежда", de: "Tagesbedarf, Strandkleidung, Souvenirs, Schmuck" },
  },
  {
    unit: { en: "Arena Show Center", tr: "Arena Gösteri Merkezi", ru: "Шоу-центр Arena", de: "Arena Show-Center" },
    hours: "Check times at animation board (Evenings)",
    location: { en: "Open Air Amphitheatre", tr: "Açık Hava Amfi Tiyatro", ru: "Амфитеатр под открытым небом", de: "Freilicht-Amphitheater" },
    note: { en: "Special stage shows, international dance troupes, live music concerts & themed parties", tr: "Özel sahne şovları, uluslararası dans grupları, canlı müzik ve tematik partiler", ru: "Вечерние шоу, живая музыка, тематические вечеринки", de: "Bühnenshows, Tanzgruppen, Live-Musik & Mottopartys" },
  },
  {
    unit: { en: "Meeting & Conference Halls", tr: "Toplantı & Konferans Salonları", ru: "Конференц-залы", de: "Tagungs- und Konferenzräume" },
    hours: "By Reservation / Event Schedule",
    location: { en: "Orka Meeting Hall & Edelstall Meeting Hall", tr: "Orka Toplantı Salonu & Edelstall Toplantı Salonu", ru: "Зал Orka и зал Edelstall", de: "Orka Tagungssaal & Edelstall Saal" },
    note: { en: "Equipped with state-of-the-art audiovisual projectors and conference seating", tr: "Modern ses-ışık projeksiyon sistemleri ile donatılmış salonlar", ru: "Оснащены проекционным и аудиооборудованием", de: "Ausgestattet mit moderner Medientechnik" },
  },
];

export const includedServicesList: ServiceItemFact[] = [
  {
    title: {
      en: "Open Buffet Breakfast, Late Breakfast, Lunch, Dinner & Night Snack",
      tr: "Açık Büfe Kahvaltı, Geç Kahvaltı, Öğle, Akşam Yemeği & Gece Çorbası",
      ru: "Шведский стол: завтрак, поздний завтрак, обед, ужин и ночные закуски",
      de: "Offenes Buffet: Frühstück, Spätfrühstück, Mittag-, Abendessen & Mitternachtssnack",
    },
    description: {
      en: "Served at Pine Main Restaurant with live cooking stations, diet corner & kids buffet",
      tr: "Pine Ana Restoran'da canlı pişirme istasyonları, diyet köşesi ve çocuk büfesi ile",
      ru: "В главном ресторане Pine с кулинарными станциями и детским уголком",
      de: "Im Pine Hauptrestaurant mit Live-Cooking, Diät-Ecke und Kinderbuffet",
    },
    badge: { en: "Main Restaurant", tr: "Ana Restoran", ru: "Шведский стол", de: "Hauptrestaurant" },
  },
  {
    title: {
      en: "Snack Bars (Tapas & Aqua Snack Restaurants 12:00 – 17:00)",
      tr: "Snack Barlar (Tapas & Aqua Snack Restoranları 12:00 – 17:00)",
      ru: "Снэк-бары (Tapas и Aqua 12:00 – 17:00)",
      de: "Snackbars (Tapas & Aqua Snack Restaurants 12:00 – 17:00)",
    },
    description: {
      en: "Poolside pizzas, burgers, Turkish flatbreads (gözleme), crisp salads and hot finger food",
      tr: "Havuz ve aquapark yanında taze pizza, burger, gözleme, salata ve sıcak atıştırmalıklar",
      ru: "Пицца у бассейна, бургеры, гёзлеме, свежие салаты и горячие закуски",
      de: "Pizza am Pool, Burger, Gözleme, frische Salate und Snacks",
    },
    badge: { en: "12:00 – 17:00", tr: "12:00 – 17:00", ru: "12:00 – 17:00", de: "12:00 – 17:00" },
  },
  {
    title: {
      en: "Local & Selected International Alcoholic & Non-Alcoholic Beverages",
      tr: "Yerli ve Seçilmiş Yabancı Alkollü / Alkolsüz İçecekler",
      ru: "Местные и отборные импортные алкогольные и безалкогольные напитки",
      de: "Lokale & ausgewählte internationale alkoholische und alkoholfreie Getränke",
    },
    description: {
      en: "Served across all operational bars including draft beers, quality house wines, spirits & cocktails",
      tr: "Tüm açık barlarda fıçı bira, sofra şarapları, seçkin likörler ve kokteyller",
      ru: "Во всех барах курорта: разливное пиво, вина, крепкие напитки и коктейли",
      de: "In allen geöffneten Bars inklusive Fassbier, Weinen, Spirituosen und Cocktails",
    },
    badge: { en: "All Bars", tr: "Tüm Barlar", ru: "Все бары", de: "Alle Bars" },
  },
  {
    title: {
      en: "A'La Carte Restaurants: Italian or Turkish (1 Free Reservation per week for 7+ night stays)",
      tr: "Alakart Restoranlar: İtalyan veya Türk (7 gece ve üzeri konaklamalarda haftada 1 kez ücretsiz)",
      ru: "A'La Carte рестораны: Итальянский или Турецкий (1 бесплатное бронирование в неделю от 7 ночей)",
      de: "A'La Carte Restaurants: Italienisch oder Türkisch (1x kostenlose Reservierung pro Woche ab 7 Nächten)",
    },
    description: {
      en: "Gourmet fine dining experience at Olive Tree Italian or Turquoise Turkish by reservation",
      tr: "Olive Tree İtalyan veya Turquoise Türk mutfağında rezervasyonlu gurme akşam yemeği",
      ru: "Изысканный ужин в ресторане Olive Tree или Turquoise по предварительной записи",
      de: "Gourmet-Dinner im Olive Tree oder Turquoise nach Voranmeldung",
    },
    badge: { en: "1x / Week Free", tr: "Haftada 1 Ücretsiz", ru: "1x в неделю", de: "1x / Woche gratis" },
  },
  {
    title: {
      en: "Minibar in Room (Daily replenished with soft drinks)",
      tr: "Oda İçi Minibar (Her gün meşrubatlarla ücretsiz yenilenir)",
      ru: "Мини-бар в номере (Ежедневное пополнение безалкогольными напитками)",
      de: "Zimmer-Minibar (Täglich mit Erfrischungsgetränken aufgefüllt)",
    },
    description: {
      en: "Complimentary soft drinks, mineral waters, and fruit juices restocked daily by housekeeping",
      tr: "Kat hizmetleri tarafından her gün ücretsiz yenilenen su, maden suyu ve meşrubatlar",
      ru: "Бесплатная вода, минеральная вода и безалкогольные напитки каждый день",
      de: "Kostenloses Wasser, Mineralwasser und Softdrinks täglich frisch aufgefüllt",
    },
    badge: { en: "Daily Free", tr: "Günlük Ücretsiz", ru: "Ежедневно", de: "Täglich gratis" },
  },
  {
    title: {
      en: "Safe Box in Room (Electronic Digital Safe)",
      tr: "Oda İçi Çelik Kasa (Elektronik Dijital Şifreli Kasa)",
      ru: "Электронный сейф в номере (Цифровой)",
      de: "Zimmersafe (Elektronischer digitaler Zimmersafe)",
    },
    description: {
      en: "Personalized digital keypad safe inside every guest room closet for high security",
      tr: "Tüm odalarda gardırop içi şifreli özel güvenlikli elektronik çelik kasa",
      ru: "Индивидуальный цифровой сейф в шкафу каждого номера",
      de: "Persönlicher digitaler Safe im Kleiderschrank jedes Zimmers",
    },
    badge: { en: "In-Room", tr: "Odada", ru: "В номере", de: "Im Zimmer" },
  },
  {
    title: {
      en: "Lotus Lobby Bar Open 24 Hours",
      tr: "24 Saat Kesintisiz Açık Lotus Lobi Bar",
      ru: "Круглосуточный лобби-бар Lotus (24 часа)",
      de: "Lotus Lobby Bar 24 Stunden geöffnet",
    },
    description: {
      en: "Continuous 24-hour service of premium coffees, herbal teas, soft drinks, beers & spirits",
      tr: "24 saat kesintisiz sıcak/soğuk içecekler, seçkin yabancı içkiler ve kokteyller",
      ru: "Круглосуточное обслуживание: горячие напитки, премиальный алкоголь и коктейли",
      de: "Rund um die Uhr Heißgetränke, ausgewählte Spirituosen und Cocktails",
    },
    badge: { en: "24 Hours", tr: "24 Saat", ru: "24 часа", de: "24 Stunden" },
  },
  {
    title: {
      en: "La Patisserie: Afternoon Tea – Coffee and different kinds of specified cakes (12:00 – 18:00)",
      tr: "La Patisserie: Çay – Kahve Saati ve Günlük Taze Özel Pastalar (12:00 – 18:00)",
      ru: "Кондитерская La Patisserie: Чай, кофе и выбор фирменной выпечки (12:00 – 18:00)",
      de: "La Patisserie: Tee- & Kaffeestunde und feine Kuchenspezialitäten (12:00 – 18:00)",
    },
    description: {
      en: "Artisan pastries, fruit tarts, macarons, cookies, chocolates & freshly brewed Turkish tea and coffee",
      tr: "Taze pastalar, meyveli tartlar, makaronlar, kurabiyeler ve taze demlenmiş çay/kahve",
      ru: "Свежая выпечка, фруктовые тарты, макаруны, печенье и ароматный кофе",
      de: "Feine Torten, Fruchttörtchen, Macarons, Gebäck und frischer Kaffee/Tee",
    },
    badge: { en: "12:00 – 18:00", tr: "12:00 – 18:00", ru: "12:00 – 18:00", de: "12:00 – 18:00" },
  },
  {
    title: {
      en: "Artisanal Ice Cream (Served during specified hours)",
      tr: "Dondurma İkramı (Belirlenen saatlerde servis edilir)",
      ru: "Мороженое (Подается в установленные часы)",
      de: "Eiscreme-Genuss (Zu festgelegten Zeiten serviert)",
    },
    description: {
      en: "Multiple flavors of chilled artisanal ice cream cones and cups for children and adults",
      tr: "Çocuklar ve yetişkinler için farklı lezzetlerde külah ve kupa dondurma servisi",
      ru: "Разнообразные вкусы мороженого в рожках и креманках для детей и взрослых",
      de: "Verschiedene Eissorten in Waffeln oder Bechern für Groß und Klein",
    },
    badge: { en: "Specified Hours", tr: "Belirli Saatler", ru: "По расписанию", de: "Feste Zeiten" },
  },
  {
    title: {
      en: "Special Treatments for Honeymooners & Anniversary Couples (25% discount on Beach Cabanas, +1 extra A'La Carte & priority reservations)",
      tr: "Balayı Çiftleri ve Evlilik Yıldönümü Özel Ayrıcalıkları (%25 Sahil Kabana İndirimi, +1 Ekstra Alakart ve Öncelikli Rezervasyon)",
      ru: "Привилегии для молодоженов и юбиляров (Скидка 25% на кабаны, +1 посещение A'La Carte и приоритет бронирования)",
      de: "Special für Flitterwochen & Jubiläen (25% Rabatt auf Beach Cabanas, +1 zusätzliches A'La Carte & Reservierungspriorität)",
    },
    description: {
      en: "VIP room setup with sparkling wine, fruit basket, 25% cabana discount & additional A'La Carte privilege",
      tr: "Odaya köpüklü şarap, meyve sepeti ikramı, %25 kabana indirimi ve +1 alakart hakkı",
      ru: "VIP-сервис в номере с игристым вином, корзиной фруктов, скидка 25% на кабаны и доп. A'La Carte",
      de: "VIP-Zimmerempfang mit Sekt, Obstkorb, 25% Cabana-Rabatt und extra A'La Carte Besuch",
    },
    badge: { en: "VIP Privilege", tr: "VIP Ayrıcalık", ru: "VIP", de: "VIP-Vorteil" },
  },
  {
    title: {
      en: "All Animation Activities & Entertainment Programs / Kids' Club & Mini Disco",
      tr: "Tüm Animasyon Aktiviteleri & Eğlence Programları / Çocuk Kulübü & Mini Disko",
      ru: "Вся анимационная программа, шоу, детский клуб 'Orki' и мини-диско",
      de: "Gesamtes Animationsprogramm & Shows / Kinderclub 'Orki' & Minidisco",
    },
    description: {
      en: "Daytime sports, water gymnastics, pool games, darts, beach volleyball, evening amphitheater stage shows & kids mini disco",
      tr: "Gündüz sporları, su jimnastiği, havuz oyunları, dart, plaj voleybolu, amfi tiyatro sahne şovları ve mini disko",
      ru: "Дневной спорт, аквагимнастика, игры у бассейна, дартс, волейбол, вечерние шоу и мини-диско",
      de: "Tagessport, Wassergymnastik, Poolspiele, Darts, Beachvolleyball, Bühnenshows und Minidisco",
    },
    badge: { en: "Entertainment", tr: "Eğlence", ru: "Развлечения", de: "Unterhaltung" },
  },
  {
    title: {
      en: "Beach Towels & Sunbeds with Umbrellas (Private Beach & Pools)",
      tr: "Plaj Havluları, Şezlonglar ve Güneş Şemsiyeleri (Özel Plaj ve Havuzlar)",
      ru: "Пляжные полотенца, шезлонги и зонты (Частный пляж и бассейны)",
      de: "Strandtücher, Liegestühle & Sonnenschirme (Privatstrand & Pools)",
    },
    description: {
      en: "Free towel card exchange at towel desks, complimentary sun loungers along 1 km private beach and pool terraces",
      tr: "Havlu kartı ile havlu değişim noktalarından ücretsiz plaj havlusu, 1 km kum plajda ve havuzlarda şezlong/şemsiye",
      ru: "Бесплатные пляжные полотенца по карточкам, шезлонги и зонты на 1 км песчаном пляже и у бассейнов",
      de: "Kostenlose Badetücher gegen Handtuchkarte, Sonnenliegen und Schirme am 1 km Strand und an den Pools",
    },
    badge: { en: "Beach & Pools", tr: "Plaj & Havuz", ru: "Пляж и бассейны", de: "Strand & Pools" },
  },
  {
    title: {
      en: "Turkish Bath, Sauna & Steam Bath (Spa Center – Reservation required)",
      tr: "Türk Hamamı, Sauna ve Buhar Banyosu (Spa Merkezi – Rezervasyon gereklidir)",
      ru: "Турецкий хамам, сауна и паровая баня (Спа-центр – по предварительной записи)",
      de: "Türkisches Bad, Sauna & Dampfbad (Spa-Center – Reservierung erforderlich)",
    },
    description: {
      en: "Traditional authentic marble hamam, dry pine sauna, and eucalyptus steam bath accessible with advance booking",
      tr: "Otantik mermer Türk hamamı, çam saunası ve okaliptüs buhar odası (ücretsiz rezervasyonlu kullanım)",
      ru: "Традиционный мраморный хамам, финская сауна и эвкалиптовая парная по предварительной записи",
      de: "Traditioneller Marmor-Hamam, finnische Sauna und Eukalyptus-Dampfbad nach Voranmeldung",
    },
    badge: { en: "Spa Area", tr: "Spa Alanı", ru: "Спа-зона", de: "Spa-Bereich" },
  },
];

export const extraChargeServicesList: ServiceItemFact[] = [
  {
    title: {
      en: "High Quality wines, choice of imported drinks and Bottled Beverages",
      tr: "Yüksek Kalite Yıllanmış Şaraplar, Seçkin İthal İçkiler ve Şişe İçecekler",
      ru: "Марочные вина высокого качества, выбор импортных напитков и бутилированные напитки",
      de: "Hochwertige Weine, exklusive Importgetränke und Flaschengetränke",
    },
    description: {
      en: "Rare vintage cellared wines, champagne selections, super-premium spirits and sealed imported bottles",
      tr: "Özel kav şarapları, şampanyalar, ultra lüks viskiler ve kapalı şişe premium içecekler",
      ru: "Коллекционные вина, шампанское, супер-премиальный алкоголь и напитки в бутылках",
      de: "Erlesene Weine, Champagner, Super-Premium-Spirituosen und Flaschengetränke",
    },
    badge: { en: "Extra Charge", tr: "Ücretli", ru: "Платно", de: "Gegen Gebühr" },
  },
  {
    title: {
      en: "Chinese Garden A'La Carte Restaurant",
      tr: "Chinese Garden Çin Alakart Restoranı",
      ru: "Китайский A'La Carte ресторан Chinese Garden",
      de: "Chinese Garden Chinesisches A'La Carte Restaurant",
    },
    description: {
      en: "Far Eastern culinary journey featuring dim sum, crispy duck, sushi, wok specialties and Asian desserts (reservation required)",
      tr: "Dim sum, çıtır ördek, suşi, wok spesiyalleri ve Asya tatlıları sunan özel alakart akşam yemeği (rezervasyonlu)",
      ru: "Дальневосточная кухня: утка по-пекински, димсамы, суши, вок и азиатские десерты (по записи)",
      de: "Fernöstliche Küche mit Dim Sum, knuspriger Ente, Sushi, Wok-Gerichten und Desserts (Reservierung)",
    },
    badge: { en: "A'La Carte", tr: "Alakart", ru: "A'La Carte", de: "A'La Carte" },
  },
  {
    title: {
      en: "Room Service 24 Hours (In-Room Dining)",
      tr: "24 Saat Oda Servisi (Oda İçi Yiyecek ve İçecek Hizmeti)",
      ru: "Круглосуточное обслуживание номеров (Room Service 24 часа)",
      de: "24-Stunden-Zimmerservice (Essen & Trinken auf dem Zimmer)",
    },
    description: {
      en: "Round-the-clock hot meals, club sandwiches, midnight platters, breakfasts, and beverages delivered to your room",
      tr: "Günün 24 saati odaya servis edilen sıcak yemekler, kulüp sandviçler, gece tabakları ve içecekler",
      ru: "Круглосуточная доставка горячих блюд, сэндвичей, завтраков и напитков прямо в номер",
      de: "24-Stunden-Lieferung von warmen Speisen, Club-Sandwiches, Frühstück und Getränken aufs Zimmer",
    },
    badge: { en: "24 Hours", tr: "24 Saat", ru: "24 часа", de: "24 Stunden" },
  },
  {
    title: {
      en: "Laundry & Dry Cleaning Service",
      tr: "Çamaşırhane, Kuru Temizleme ve Ütü Hizmeti",
      ru: "Услуги прачечной, химчистки и глажки",
      de: "Wäsche-, Reinigungs- und Bügelservice",
    },
    description: {
      en: "Express washing, garment pressing, stain treatment, and professional dry cleaning with same-day return option",
      tr: "Hızlı yıkama, profesyonel ütü, leke çıkarma ve kuru temizleme hizmeti",
      ru: "Стирка, глажка, выведение пятен и профессиональная химчистка с быстрой доставкой",
      de: "Waschen, Bügeln, Fleckenbehandlung und chemische Reinigung",
    },
    badge: { en: "Laundry", tr: "Çamaşırhane", ru: "Прачечная", de: "Wäscheservice" },
  },
  {
    title: {
      en: "Water Sports (Jet Ski, Jet Car, Banana, Pedaloes, Ringo, Parasailing, Flyboard etc.)",
      tr: "Su Sporları (Jet Ski, Jet Car, Banana, Deniz Bisikleti, Ringo, Parasailing, Flyboard vb.)",
      ru: "Водные виды спорта (Гидроциклы, Jet Car, Банан, Катамараны, Ринго, Парасейлинг, Флайборд)",
      de: "Wassersport (Jetski, Jet Car, Banane, Tretboote, Ringo, Parasailing, Flyboard etc.)",
    },
    description: {
      en: "High-adrenaline motorized watersports and leisure pedal boats on the calm waters of Marmaris Bay with certified instructors",
      tr: "Marmaris koyunda lisanslı eğitmenler eşliğinde motorlu su sporları ve deniz bisikleti aktiviteleri",
      ru: "Моторные водные виды спорта и катамараны в заливе Мармариса с сертифицированными инструкторами",
      de: "Motorisierter Wassersport und Tretboote in der Bucht von Marmaris mit lizenzierten Lehrern",
    },
    badge: { en: "Watersports Desk", tr: "Su Sporları", ru: "Водный спорт", de: "Wassersport" },
  },
  {
    title: {
      en: "All Shops, Market & Hairdresser / Beauty Salon",
      tr: "Alışveriş Mağazaları, Market & Kuaför / Güzellik Salonu",
      ru: "Все магазины, маркет и парикмахерская / салон красоты",
      de: "Alle Geschäfte, Markt & Friseur / Schönheitssalon",
    },
    description: {
      en: "Resort market, boutiques, leather shop, jewelry, beach accessories, photographer, hairdresser & hair styling",
      tr: "Tesis içi market, butikler, deri mağazası, kuyumcu, plaj ürünleri, fotoğrafçı, kuaför ve saç bakım hizmetleri",
      ru: "Супермаркет, бутики, кожа, ювелирные изделия, пляжная одежда, фотограф и парикмахерская",
      de: "Hotelmarkt, Boutiquen, Lederwaren, Schmuck, Strandartikel, Fotograf, Friseur und Styling",
    },
    badge: { en: "Shopping Arcade", tr: "Alışveriş Çarşısı", ru: "Торговая галерея", de: "Einkaufspassage" },
  },
  {
    title: {
      en: "Game Center & Billiards",
      tr: "Oyun Merkezi (Game Center) ve Bilardo",
      ru: "Игровой центр (Game Center) и бильярд",
      de: "Spielhalle (Game Center) & Billard",
    },
    description: {
      en: "Arcade video gaming machines, pinball, racing simulators, air hockey tables, and tournament billiards",
      tr: "Video arcade oyun makineleri, pinball, yarış simülatörleri, hava hokeyi ve profesyonel bilardo masaları",
      ru: "Игровые автоматы, симуляторы гонок, аэрохоккей и профессиональный бильярд",
      de: "Arcade-Videospielautomaten, Rennsimulatoren, Airhockey und Billardtische",
    },
    badge: { en: "Game Center", tr: "Oyun Alanı", ru: "Игры", de: "Spiele" },
  },
  {
    title: {
      en: "Telephone & Fax Services",
      tr: "Telefon ve Faks Hizmetleri",
      ru: "Услуги телефонной связи и факса",
      de: "Telefon- und Telefaxdienste",
    },
    description: {
      en: "External international telecommunication line access and document facsimile transmission",
      tr: "Oda içi ve resepsiyondan uluslararası telefon görüşmeleri ve belge faks gönderim işlemleri",
      ru: "Международная телефонная связь из номера и отправка факсимильных сообщений",
      de: "Internationale Telefonate vom Zimmer und Dokumenten-Telefax-Übertragung",
    },
    badge: { en: "Telecom", tr: "İletişim", ru: "Связь", de: "Telekom" },
  },
  {
    title: {
      en: "Special Orders & Personalized Celebrations",
      tr: "Özel Siparişler ve Kişiye Özel Kutlamalar",
      ru: "Специальные заказы и индивидуальные торжества",
      de: "Sonderbestellungen & Persönliche Feiern",
    },
    description: {
      en: "Custom celebratory cakes, bespoke flower bouquets, private pier candlelight dinners & special wine requests",
      tr: "Özel kutlama pastaları, çiçek buketi siparişleri, iskelede romantik mum ışığında akşam yemekleri",
      ru: "Праздничные торты на заказ, букеты цветов, романтический ужин при свечах на пирсе",
      de: "Individuelle Festtorten, Blumensträuße, romantische Candle-Light-Dinner am Steg",
    },
    badge: { en: "Special Requests", tr: "Özel Sipariş", ru: "Спецзаказ", de: "Sonderwunsch" },
  },
  {
    title: {
      en: "Spa Center & All Types of Treatments (Massages, Peeling, Facials & Body Therapies)",
      tr: "Spa Merkezi ve Tüm Bakım Terapileri (Masajlar, Kese-Köpük, Cilt ve Vücut Bakımları)",
      ru: "Спа-центр и все виды процедур (Массажи, пенный пилинг в хамаме, уход за лицом и телом)",
      de: "Spa-Center & alle Behandlungen (Massagen, Hamam-Peeling, Gesichts- und Körpertherapien)",
    },
    description: {
      en: "Bali massage, hot stone therapy, aromatherapy, traditional hamam scrub & foam, collagen facial rejuvenation",
      tr: "Bali masajı, sıcak taş terapisi, aromaterapi, geleneksel kese-köpük ritüelleri ve kolajen cilt bakımları",
      ru: "Балийский массаж, терапия горячими камнями, ароматерапия, пенный массаж в хамаме и омолаживающий уход",
      de: "Bali-Massage, Hot-Stone-Therapie, Aromatherapie, traditionelles Hamam-Peeling und Gesichtsbehandlungen",
    },
    badge: { en: "Spa Treatments", tr: "Spa Bakımları", ru: "Спа-процедуры", de: "Spa-Therapien" },
  },
  {
    title: {
      en: "Beach Cabanas (Private VIP Daybeds & Overwater Pavilions)",
      tr: "Sahil Kabanaları (Özel VIP Daybedler ve İskele Pavyonları)",
      ru: "Пляжные кабаны (Частные VIP-беседки и надводные павильоны)",
      de: "Strand-Cabanas (Private VIP-Daybeds & Überwasser-Pavillons)",
    },
    description: {
      en: "Exclusive shaded beachfront cabanas with dedicated butler service, chilled fruits, sparkling wine & mini bar setup",
      tr: "Özel garson hizmeti, soğuk meyve tabağı, şampanya ikramı ve minibar içeren lüks sahil kabanaları",
      ru: "Эксклюзивные беседки на пляже с услугами персонального дворецкого, фруктами и шампанским",
      de: "Exklusive Strand-Cabanas mit persönlichem Butler-Service, Obstteller, Sekt und Minibar",
    },
    badge: { en: "VIP Cabana", tr: "VIP Kabana", ru: "VIP Кабана", de: "VIP Cabana" },
  },
  {
    title: {
      en: "ICON Beach Club Entry, VIP Lounges & Special Events",
      tr: "ICON Beach Club Girişi, VIP Localari ve Özel Etkinlikler",
      ru: "Вход в ICON Beach Club, VIP-ложи и специальные мероприятия",
      de: "ICON Beach Club Eintritt, VIP-Lounges & Spezielle Events",
    },
    description: {
      en: "Premium lifestyle beachfront club, signature mixology cocktails, international DJ sessions & VIP cabana reservations",
      tr: "Lüks sahil kulübü, imza kokteyller, uluslararası DJ performansları ve özel VIP loca rezervasyonları",
      ru: "Премиальный пляжный клуб, авторские коктейли, выступления мировых DJ и VIP-ложи",
      de: "Premium Beach Club, Signature-Cocktails, internationale DJ-Sessions und VIP-Lounges",
    },
    badge: { en: "ICON Beach", tr: "ICON Beach", ru: "ICON Beach", de: "ICON Beach" },
  },
];

export interface FacilityActivityOverviewFact {
  id: string;
  name: Record<Locale, string>;
  category: "dining" | "bars" | "aquapark" | "pools" | "wellness" | "entertainment" | "sports" | "kids" | "services";
  hours: string;
  location: Record<Locale, string>;
  isIncluded: boolean;
  highlight: Record<Locale, string>;
  note?: Record<Locale, string>;
  icon: string;
}

export const facilitiesAndActivitiesFactSheet: FacilityActivityOverviewFact[] = [
  {
    id: "fac-alacarte",
    name: {
      en: "A'La Carte Restaurants: Chinese (Extra), Italian & Turkish (1x Free per week)",
      tr: "Alakart Restoranlar: Çin (Ücretli), İtalyan ve Türk (Haftada 1 kez ücretsiz)",
      ru: "A'La Carte рестораны: Китайский (платно), Итальянский и Турецкий (1x бесплатно в неделю)",
      de: "A'La Carte Restaurants: Chinesisch (Aufpreis), Italienisch & Türkisch (1x gratis pro Woche)",
    },
    category: "dining",
    hours: "19:00 – 21:30",
    location: {
      en: "A'La Carte Dining Terraces",
      tr: "Alakart Restoran Terasları",
      ru: "Террасы ресторанов A'La Carte",
      de: "A'La Carte Restaurant-Terrassen",
    },
    isIncluded: true,
    highlight: {
      en: "3 Specialty fine-dining concepts: Olive Tree Italian, Turquoise Turkish, and Chinese Garden",
      tr: "3 Seçkin alakart konsepti: Olive Tree İtalyan, Turquoise Türk ve Chinese Garden Çin mutfağı",
      ru: "3 изысканных концепта: Итальянский Olive Tree, Турецкий Turquoise и Китайский Chinese Garden",
      de: "3 Spezialitäten-Konzepte: Olive Tree Italienisch, Turquoise Türkisch und Chinese Garden Chinesisch",
    },
    note: {
      en: "Italian & Turkish are 1x free per 7-night stay; Chinese Garden is with extra charge. All require advance reservation.",
      tr: "İtalyan ve Türk 7 gecelik konaklamada 1 kez ücretsizdir; Çin alakart ücretlidir. Ön rezervasyon şarttır.",
      ru: "Итальянский и Турецкий бесплатны 1 раз за 7 ночей; Китайский платно. Бронирование обязательно.",
      de: "Italienisch & Türkisch 1x gratis pro 7 Nächte; Chinesisch gegen Aufpreis. Reservierung erforderlich.",
    },
    icon: "utensils",
  },
  {
    id: "fac-bars",
    name: {
      en: "Bars (Lobby 24h, Relax, Tapas, Beach, Blue, Vitamin, Aqua, Lounge, Night Bar)",
      tr: "Barlar (Lobi 24 Saat, Relax, Tapas, Plaj, Blue, Vitamin, Aqua, Lounge, Gece Barı)",
      ru: "Бары (Лобби 24ч, Relax, Tapas, Beach, Blue, Vitamin, Aqua, Lounge, Ночной бар)",
      de: "Bars (Lobby 24h, Relax, Tapas, Beach, Blue, Vitamin, Aqua, Lounge, Night Bar)",
    },
    category: "bars",
    hours: "24 Hours (Lotus Lobby Bar 24h · Others 10:00–02:00)",
    location: {
      en: "Resort-wide (Lobby, Pools, Beach, Spa, Amphitheater)",
      tr: "Tesis geneli (Lobi, Havuzlar, Plaj, Spa, Gösteri Alanı)",
      ru: "По всей территории (Лобби, бассейны, пляж, спа, амфитеатр)",
      de: "Resortweit (Lobby, Pools, Strand, Spa, Amphitheater)",
    },
    isIncluded: true,
    highlight: {
      en: "9 distinct bar venues serving premium coffees, draft beers, wines, spirits & signature cocktails",
      tr: "Yerli ve seçkin yabancı içecekler sunan 9 farklı tematik bar",
      ru: "9 тематических баров с местными и импортными напитками, кофе и коктейлями",
      de: "9 einzigartige Bars mit lokalen & internationalen Getränken, Kaffees und Cocktails",
    },
    icon: "wine",
  },
  {
    id: "fac-aquapark",
    name: {
      en: "Aquapark for Adults and Children with 6 Different Slides",
      tr: "Yetişkinler ve Çocuklar İçin 6 Farklı Kaydıraklı Aquapark",
      ru: "Аквапарк для взрослых и детей с 6 различными горками",
      de: "Aquapark für Erwachsene und Kinder mit 6 verschiedenen Wasserrutschen",
    },
    category: "aquapark",
    hours: "10:30 – 12:30 / 14:30 – 17:30",
    location: {
      en: "Aqua Park Zone & Sun Terrace",
      tr: "Aquapark Alanı ve Güneşlenme Terası",
      ru: "Зона аквапарка и солнечная терраса",
      de: "Aquapark-Bereich & Sonnenterrasse",
    },
    isIncluded: true,
    highlight: {
      en: "High-speed slides, curved multislides, tunnel flumes & splash landings under lifeguard supervision",
      tr: "Cankurtaran gözetiminde hızlı kaydıraklar, kavisli virajlar ve heyecan dolu su tünelleri",
      ru: "Скоростные и извилистые водные горки под наблюдением профессиональных спасателей",
      de: "High-Speed-Rutschen, Kurvenrutschen und Tunnels unter Aufsicht von Rettungsschwimmern",
    },
    icon: "waves",
  },
  {
    id: "fac-outdoor-pools",
    name: {
      en: "Outdoor 4 Pools + 1 Kids Pool",
      tr: "4 Açık Yüzme Havuzu + 1 Çocuk Havuzu",
      ru: "4 Открытых бассейна + 1 Детский бассейн",
      de: "4 Außenpools + 1 Kinderpool",
    },
    category: "pools",
    hours: "08:00 – 19:00",
    location: {
      en: "Main Lagoon, Twin Pools, Relax Pool & Aquapark Pool",
      tr: "Ana Lagün Havuz, Twin Havuzlar, Relax Havuz ve Aquapark Havuzu",
      ru: "Главный бассейн, Twin бассейны, Релакс бассейн и бассейн у горок",
      de: "Hauptpool, Twin-Pools, Relax-Pool und Aquapark-Pool",
    },
    isIncluded: true,
    highlight: {
      en: "Expansive freshwater swimming pools, shaded sun loungers, umbrella terraces & towel service",
      tr: "Geniş tatlı su havuzları, gölgelikli şezlonglar, güneşlenme terasları ve ücretsiz havlu servisi",
      ru: "Просторные бассейны с пресной водой, шезлонги с зонтами и пляжные полотенца",
      de: "Großzügige Süßwasserpools, schattige Liegen, Sonnenterrassen und Handtuchservice",
    },
    icon: "waves",
  },
  {
    id: "fac-indoor-pool",
    name: {
      en: "Indoor Heated Pool + 1 Kids Indoor Pool",
      tr: "Isıtmalı Kapalı Havuz + 1 Kapalı Çocuk Havuzu",
      ru: "Крытый бассейн с подогревом + 1 Детский крытый бассейн",
      de: "Beheiztes Hallenbad + 1 Kinder-Innenbecken",
    },
    category: "pools",
    hours: "09:00 – 18:00",
    location: {
      en: "Lotus Spa & Wellness Center (Level -1)",
      tr: "Lotus Spa & Sağlık Merkezi (-1. Kat)",
      ru: "Спа-центр Lotus (Уровень -1)",
      de: "Lotus Spa & Wellness-Center (Ebene -1)",
    },
    isIncluded: true,
    highlight: {
      en: "Temperature-regulated indoor relaxation pool, children's shallow pool, and spa lounge beds",
      tr: "Sıcaklık kontrollü kapalı dinlenme havuzu, sığ çocuk havuzu ve spa şezlongları",
      ru: "Крытый бассейн с постоянной комфортной температурой и детский бассейн",
      de: "Temperierter Hallen-Ruhepool, flaches Kinderbecken und Spa-Liegen",
    },
    icon: "sparkles",
  },
  {
    id: "fac-meeting-rooms",
    name: {
      en: "Meeting Rooms (Orka & Edelstall Conference Halls)",
      tr: "Toplantı Salonları (Orka & Edelstall Konferans Salonları)",
      ru: "Конференц-залы (Залы Orka и Edelstall)",
      de: "Tagungsräume (Orka & Edelstall Konferenzsäle)",
    },
    category: "services",
    hours: "By Event Schedule & Reservation",
    location: {
      en: "Main Conference Wing",
      tr: "Ana Konferans Katı",
      ru: "Главное крыло конференц-залов",
      de: "Haupt-Konferenzbereich",
    },
    isIncluded: true,
    highlight: {
      en: "Fully equipped with high-resolution projectors, sound systems, podiums & conference seating",
      tr: "Yüksek çözünürlüklü projeksiyon, profesyonel ses sistemleri ve kürsü donanımlı salonlar",
      ru: "Оснащены проекторами высокого разрешения, акустикой и удобной мебелью",
      de: "Ausgestattet mit HD-Projektoren, Soundsystemen und Konferenzbestuhlung",
    },
    icon: "briefcase",
  },
  {
    id: "fac-splash-pool",
    name: {
      en: "Kids Splash Pool & Water Play Zone",
      tr: "Çocuk Splash Havuzu ve Su Oyun Alanı",
      ru: "Детский аква-парк Splash и зона водных игр",
      de: "Kids Splash Pool & Wasserspielzone",
    },
    category: "kids",
    hours: "10:00 – 18:00",
    location: {
      en: "Mini Club Garden & Aqua Area",
      tr: "Mini Kulüp Bahçesi & Aquapark Yanı",
      ru: "Детский клуб и зона аквапарка",
      de: "Miniclub-Garten & Aquapark",
    },
    isIncluded: true,
    highlight: {
      en: "Shallow fun splash pools with mini water jets, mini mushroom fountains & colorful slides",
      tr: "Minik su fıskiyeleri, mantar şelalesi ve renkli kaydıraklarla güvenli çocuk su oyunları",
      ru: "Неглубокий бассейн с водными фонтанчиками, грибком и мини-горками для малышей",
      de: "Flaches Planschbecken mit Wassersprühern, Pilz-Wasserfall und bunten Mini-Rutschen",
    },
    icon: "baby",
  },
  {
    id: "fac-kids-club",
    name: {
      en: "Kids' Club 'Orki' (Ages 4–12)",
      tr: "Mini Kulüp 'Orki' (4–12 Yaş)",
      ru: "Детский клуб «Orki» (4–12 лет)",
      de: "Kinderclub 'Orki' (4–12 Jahre)",
    },
    category: "kids",
    hours: "10:00 – 12:00 / 14:30 – 17:30",
    location: {
      en: "Kids Zone Garden & Clubhouse",
      tr: "Çocuk Kulübü Binası ve Oyun Bahçesi",
      ru: "Детский клуб и игровая площадка в саду",
      de: "Miniclub-Gebäude & Spielgarten",
    },
    isIncluded: true,
    highlight: {
      en: "Certified multilingual child animators, face painting, arts & crafts, treasure hunts & olympics",
      tr: "Sertifikalı çok dilli eğitmenler, yüz boyama, el sanatları, hazine avı ve eğlenceli yarışmalar",
      ru: "Сертифицированные аниматоры, аквагрим, поделки, поиски сокровищ и детские олимпиады",
      de: "Geschulte Animateure, Kinderschminken, Basteln, Schatzsuche und Kinderolympiade",
    },
    icon: "baby",
  },
  {
    id: "fac-mini-disco",
    name: {
      en: "Mini Disco & Kids Stage Awards",
      tr: "Mini Disko ve Çocuk Sahne Ödül Töreni",
      ru: "Мини-диско и детская церемония награждения",
      de: "Minidisco & Kinder-Bühnenshow",
    },
    category: "kids",
    hours: "20:30 – 21:15 (Every Evening)",
    location: {
      en: "Arena Show Center Amphitheater",
      tr: "Arena Gösteri Merkezi Amfi Tiyatro",
      ru: "Амфитеатр Arena",
      de: "Arena Show-Center Amphitheater",
    },
    isIncluded: true,
    highlight: {
      en: "Energetic stage dancing, popular international kids songs, mascot dances & daily winner certificates",
      tr: "Sahne dansları, dünya çocuk şarkıları, maskot gösterileri ve günün kazananlarına sertifika",
      ru: "Танцы на сцене, популярные детские хиты, танцы с маскотами и вручение дипломов",
      de: "Tanzen auf der Bühne, internationale Kinderlieder, Maskottchen und Urkundenverleihung",
    },
    icon: "music",
  },
  {
    id: "fac-cabanas",
    name: {
      en: "Beach Cabanas (VIP Daybeds & Overwater Pavilions)",
      tr: "Sahil Kabanaları (VIP Daybedler ve İskele Pavyonları)",
      ru: "Пляжные кабаны (VIP-беседки и павильоны над водой)",
      de: "Beach Cabanas (VIP-Daybeds & Überwasser-Pavillons)",
    },
    category: "services",
    hours: "08:00 – 19:00",
    location: {
      en: "1 km Private Beach & Lotus Piers",
      tr: "1 km Özel Sahil Kordonu ve İskeleler",
      ru: "1 км частный пляж и пирсы Lotus",
      de: "1 km Privatstrand & Lotus-Stege",
    },
    isIncluded: false,
    highlight: {
      en: "Private shaded cabanas with dedicated butler beverage service, fresh fruits, sparkling wine & minibar",
      tr: "Özel garson servisi, taze meyve tabağı, köpüklü şarap ve özel minibar donanımlı lüks localar",
      ru: "Приватные беседки с услугами официанта, фруктами, шампанским и мини-баром",
      de: "Private Cabanas mit persönlicher Bedienung, frischem Obst, Sekt und Minibar",
    },
    note: {
      en: "Service with extra charge. Honeymooners & Anniversary couples receive a 25% discount privilege.",
      tr: "Ek ücrete tabidir. Balayı ve evlilik yıldönümü kutlayan çiftler %25 indirimden faydalanır.",
      ru: "За дополнительную плату. Молодоженам и юбилярам предоставляется скидка 25%.",
      de: "Gegen Aufpreis. Flitterwochen- und Jubiläumsgäste erhalten 25% Rabatt.",
    },
    icon: "umbrella",
  },
  {
    id: "fac-entertainment",
    name: {
      en: "Day and Evening Entertainment Programs",
      tr: "Gündüz ve Akşam Eğlence Programları",
      ru: "Дневные и вечерние развлекательные программы",
      de: "Tages- und Abend-Unterhaltungsprogramme",
    },
    category: "entertainment",
    hours: "10:00 – 23:00",
    location: {
      en: "Arena Show Center, Garden Stage & Poolside",
      tr: "Arena Gösteri Merkezi, Bahçe Sahnesi ve Havuz Başı",
      ru: "Амфитеатр Arena, Садовая сцена и зона бассейнов",
      de: "Arena Show-Center, Gartenbühne & Poolbereich",
    },
    isIncluded: true,
    highlight: {
      en: "World-class acrobatic shows, international dance troupes, themed party nights & poolside spectacles",
      tr: "Dünya standartlarında akrobasi gösterileri, dans grupları, tematik partiler ve havuz başı şovları",
      ru: "Акробатические шоу, выступления зарубежных танцоров, тематические вечеринки и праздники",
      de: "Akrobatik-Shows, internationale Tanzgruppen, Mottopartys und Pool-Spektakel",
    },
    icon: "sparkles",
  },
  {
    id: "fac-live-music",
    name: {
      en: "Live Music Performances & Acoustic Duos",
      tr: "Canlı Müzik Performansları ve Akustik Dinletiler",
      ru: "Живая музыка и акустические вечера",
      de: "Live-Musik & Akustik-Auftritte",
    },
    category: "entertainment",
    hours: "21:30 – 23:00 (Rotational Evenings)",
    location: {
      en: "Garden Stage & Blue Bar Terrace",
      tr: "Bahçe Sahnesi ve Blue Bar Terası",
      ru: "Садовая сцена и терраса Blue Bar",
      de: "Gartenbühne & Blue Bar Terrasse",
    },
    isIncluded: true,
    highlight: {
      en: "Aegean acoustic melodies, Mediterranean strings, jazz saxophonists, and international vocalists",
      tr: "Ege akustik ezgileri, Akdeniz yaylıları, caz saksafon ve canlı dünya vokalleri",
      ru: "Эгейские мотивы, средиземноморские струнные, джазовый саксофон и живой вокал",
      de: "Ägäische Akustik-Melodien, mediterrane Streicher, Jazz-Saxophon und Live-Gesang",
    },
    icon: "music",
  },
  {
    id: "fac-water-gym",
    name: {
      en: "Water Gym & Aqua Aerobics",
      tr: "Su Jimnastiği (Water Gym) & Aqua Aerobik",
      ru: "Аквагимнастика и водная аэробика",
      de: "Wassergymnastik (Water Gym) & Aqua-Aerobic",
    },
    category: "sports",
    hours: "10:30 – 11:30 (Daily Morning)",
    location: {
      en: "Main Lagoon Activity Pool",
      tr: "Ana Lagün Aktivite Havuzu",
      ru: "Главный бассейн с активностями",
      de: "Haupt-Aktivitätspool",
    },
    isIncluded: true,
    highlight: {
      en: "High-energy rhythmic water workouts to uplifting music led by our professional fitness animators",
      tr: "Profesyonel eğitmenler eşliğinde müzikli, eğlenceli ve canlandırıcı havuz jimnastiği",
      ru: "Энергичная водная гимнастика под ритмичную музыку с профессиональными тренерами",
      de: "Rhythmisches Wassertraining zu motivierender Musik mit Fitnesstrainern",
    },
    icon: "waves",
  },
  {
    id: "fac-concierge",
    name: {
      en: "Holiday Concierge & 24/7 Guest Relations",
      tr: "Tatil Konsiyerji & 7/24 Misafir İlişkileri",
      ru: "Праздничный консьерж и служба работы с гостями 24/7",
      de: "Urlaubs-Concierge & 24/7 Gästebetreuung",
    },
    category: "services",
    hours: "24 Hours (Front Desk) · 09:00–19:00 (Concierge Desk)",
    location: {
      en: "Main Lobby & Shoreline Information Station",
      tr: "Ana Lobi & Sahil Danışma Noktası",
      ru: "Главное лобби и инфопункт на пляже",
      de: "Hauptlobby & Strand-Infopoint",
    },
    isIncluded: true,
    highlight: {
      en: "A'La Carte dinner bookings, airport transfers, Rhodes ferry coordination, car rentals & celebration setups",
      tr: "Alakart rezervasyonları, havalimanı transferi, Rodos feribotu, araç kiralama ve kutlama planlama",
      ru: "Бронирование ресторанов, трансферы, билеты на Родос, аренда авто и организация праздников",
      de: "A'La Carte Buchungen, Flughafentransfers, Rhodos-Fähre, Mietwagen und Event-Organisation",
    },
    icon: "compass",
  },
  {
    id: "fac-dart",
    name: {
      en: "Dart Tournaments & Lawn Games",
      tr: "Dart Turnuvaları ve Çim Oyunları",
      ru: "Турниры по дартсу и игры на траве",
      de: "Dart-Turniere & Rasenspiele",
    },
    category: "sports",
    hours: "15:00 – 16:00 (Daily)",
    location: {
      en: "Activity Garden Lawn",
      tr: "Aktivite Bahçesi Çim Alanı",
      ru: "Садовая площадка для активностей",
      de: "Aktivitäts-Rasengarten",
    },
    isIncluded: true,
    highlight: {
      en: "Friendly competition, target darts, boccia, and lawn games with animation prize medals",
      tr: "Animasyon ekibi eşliğinde neşeli dart turnuvaları, boccia ve madalyalı yarışmalar",
      ru: "Турниры по дартсу, бочче и игры на траве с памятными призами от аниматоров",
      de: "Spannende Dart-Wettkämpfe, Boccia und Rasenspiele mit Medaillen",
    },
    icon: "target",
  },
  {
    id: "fac-volleyball",
    name: {
      en: "Beach Volleyball Championship",
      tr: "Plaj Voleybolu Turnuvası",
      ru: "Пляжный волейбол",
      de: "Strandvolleyball-Turnier",
    },
    category: "sports",
    hours: "16:00 – 17:30 (Daily Afternoon)",
    location: {
      en: "Lotus Sandy Beach Sand Court",
      tr: "Lotus Kum Plaj Voleybol Sahası",
      ru: "Песчаный корт на пляже Lotus",
      de: "Sandplatz am Lotus Strand",
    },
    isIncluded: true,
    highlight: {
      en: "Exciting beach volleyball matches on soft golden sand against the backdrop of the turquoise Aegean bay",
      tr: "Ege koyunun büyüleyici manzarası eşliğinde yumuşak kum sahada voleybol karşılaşmaları",
      ru: "Матчи по пляжному волейболу на мягком песке с панорамным видом на залив",
      de: "Beachvolleyball-Matches auf weichem Sand vor der Kulisse der Ägäis-Bucht",
    },
    icon: "sun",
  },
  {
    id: "fac-table-tennis",
    name: {
      en: "Table Tennis (Ping Pong Tables & Tournaments)",
      tr: "Masa Tenisi (Ping Pong Masaları ve Turnuvalar)",
      ru: "Настольный теннис (Столы и турниры)",
      de: "Tischtennis (Platten & Turniere)",
    },
    category: "sports",
    hours: "09:00 – 19:00",
    location: {
      en: "Poolside Recreation Terrace & Game Lounge",
      tr: "Havuz Başı Eğlence Alanı & Oyun Salonu",
      ru: "Терраса у бассейна и игровая зона",
      de: "Pool-Freizeitbereich & Game-Lounge",
    },
    isIncluded: true,
    highlight: {
      en: "Complimentary paddles and balls available throughout the day with organized guest tournaments",
      tr: "Gün boyu ücretsiz raket/top temini ve animasyon eşliğinde eğlenceli turnuvalar",
      ru: "Бесплатные ракетки и мячи в течение дня, а также регулярные турниры",
      de: "Kostenlose Schläger und Bälle den ganzen Tag über sowie Gästeturniere",
    },
    icon: "activity",
  },
  {
    id: "fac-watersports",
    name: {
      en: "Water Sports Center (Jet Ski, Parasailing, Banana, Pedaloes)",
      tr: "Su Sporları Merkezi (Jet Ski, Parasailing, Banana, Deniz Bisikleti)",
      ru: "Центр водных видов спорта (Гидроциклы, парасейлинг, банан, катамараны)",
      de: "Wassersportzentrum (Jetski, Parasailing, Banane, Tretboote)",
    },
    category: "sports",
    hours: "09:00 – 18:00",
    location: {
      en: "Lotus Beach Watersports Jetty",
      tr: "Lotus Plajı Su Sporları İskelesi",
      ru: "Причал водных видов спорта на пляже Lotus",
      de: "Lotus Strand Wassersport-Steg",
    },
    isIncluded: false,
    highlight: {
      en: "High-speed jet ski, tandem parasailing with panoramic bay views, jet car, flyboard & pedalo rentals",
      tr: "Yüksek hızlı jet ski, Marmaris koyu manzaralı parasailing, jet car, flyboard ve deniz bisikleti",
      ru: "Скоростные гидроциклы, парасейлинг с видом на весь залив, флайборд и катамараны",
      de: "Highspeed-Jetski, Tandem-Parasailing über der Bucht, Jet Car, Flyboard und Tretboote",
    },
    note: {
      en: "Service with extra charge. Safety briefing and life jackets provided for all guests.",
      tr: "Ek ücrete tabidir. Tüm misafirlere güvenlik brifingi ve can yeleği verilmektedir.",
      ru: "За дополнительную плату. Проводится инструктаж по безопасности, выдаются спасательные жилеты.",
      de: "Gegen Aufpreis. Sicherheitseinweisung und Schwimmwesten für alle Gäste inklusive.",
    },
    icon: "anchor",
  },
];

export const importantNotesFactSheet: Record<Locale, Array<{ title: string; text: string }>> = {
  en: [
    {
      title: "Check-in & Check-out Policy",
      text: "Check-in time starts after 15:00. Check-out time is before 11:00. Early check-in and late check-out requests are subject to room availability and may incur additional charges.",
    },
    {
      title: "Swimming Pools & Beach Weather Protocol",
      text: "Services at outdoor pools, the private beach, watersports, and pier platforms may be adjusted or temporarily unavailable due to adverse sea or weather conditions for guest safety.",
    },
    {
      title: "Indoor Smoke-Free Law (Law No. 4207)",
      text: "Pursuant to Turkish Republic Law Number 4207 on Tobacco and Tobacco Products, smoking cigarettes, e-cigarettes, and water pipes (shisha) is strictly forbidden in all indoor public spaces and guest rooms.",
    },
    {
      title: "Seasonal Operating Hours",
      text: "Service hours and entertainment programs for outdoor units (restaurants, bars, aquapark) may be adjusted during low season or according to daily weather variations.",
    },
    {
      title: "Pet Policy",
      text: "To preserve hygiene and tranquility for all guests, no pets are allowed within resort facilities.",
    },
    {
      title: "Management Reservation Rights",
      text: "Orka Lotus Beach hotel management reserves the right to make modifications, cancellations, and operational adjustments to the concept and venue hours without prior notice.",
    },
  ],
  tr: [
    {
      title: "Giriş ve Çıkış Saatleri",
      text: "Giriş saati (Check-in) 15:00'ten sonradır. Çıkış saati (Check-out) 11:00'den öncedir. Erken giriş ve geç çıkış talepleri müsaitliğe bağlı olup ek ücrete tabidir.",
    },
    {
      title: "Havuzlar ve Plaj Hava Koşulları",
      text: "Açık havuzlar, özel plaj ve iskele hizmetleri olumsuz hava veya deniz koşullarında misafir güvenliği için sınırlandırılabilir veya geçici olarak kapatılabilir.",
    },
    {
      title: "Kapalı Alan Tütün Yasağı (4207 Sayılı Kanun)",
      text: "4207 Sayılı Tütün ve Tütün Ürünlerinin Kullanımına Dair Kanun gereğince; tüm kapalı alanlarda ve odalarda sigara, elektronik sigara ve nargile içilmesi yasaktır.",
    },
    {
      title: "Mevsimsel Çalışma Saatleri",
      text: "Dış mekan ünitelerinin (restoranlar, barlar, aquapark) çalışma saatleri ve eğlence programları sezon geçişlerinde ve hava koşullarına göre revize edilebilir.",
    },
    {
      title: "Evcil Hayvan Politikası",
      text: "Tesis genelinde hijyen ve misafir huzurunu sağlamak amacıyla evcil hayvan kabul edilmemektedir.",
    },
    {
      title: "Yönetim Hakları",
      text: "Orka Lotus Beach otel yönetimi, konsept ve hizmet saatlerinde önceden haber vermeksizin değişiklik yapma hakkını saklı tutar.",
    },
  ],
  ru: [
    {
      title: "Правила заезда и выезда",
      text: "Заезд (Check-in) после 15:00, выезд (Check-out) до 11:00. Ранний заезд и поздний выезд предоставляются при наличии свободных мест за дополнительную плату.",
    },
    {
      title: "Погодные условия для бассейнов и пляжа",
      text: "Работа открытых бассейнов, пляжа и пирсов может быть ограничена в связи с неблагоприятными погодными условиями для безопасности гостей.",
    },
    {
      title: "Запрет на курение в помещениях (Закон № 4207)",
      text: "В соответствии с законом № 4207 курение сигарет, электронных сигарет и кальяна во всех закрытых помещениях отеля и номерах строго запрещено.",
    },
    {
      title: "Сезонные часы работы",
      text: "Часы работы открытых ресторанов, баров и аквапарка могут корректироваться в зависимости от сезона и погодных условий.",
    },
    {
      title: "Размещение с животными",
      text: "Размещение с домашними животными на территории курорта не допускается.",
    },
    {
      title: "Права администрации",
      text: "Администрация отеля Orka Lotus Beach оставляет за собой право вносить изменения в концепцию и расписание без предварительного уведомления.",
    },
  ],
  de: [
    {
      title: "Check-in & Check-out Richtlinien",
      text: "Check-in ab 15:00 Uhr, Check-out bis 11:00 Uhr. Früher Check-in und später Check-out nach Verfügbarkeit und gegen Gebühr.",
    },
    {
      title: "Wetterbedingungen für Pools & Strand",
      text: "Dienstleistungen an Außenpools und am Strand können bei ungünstigen Witterungsbedingungen aus Sicherheitsgründen angepasst werden.",
    },
    {
      title: "Rauchverbot in Innenbereichen (Gesetz Nr. 4207)",
      text: "Gemäß dem Gesetz Nr. 4207 ist das Rauchen von Zigaretten, E-Zigaretten und Wasserpfeifen in allen Innenbereichen und Zimmern strengstens untersagt.",
    },
    {
      title: "Saisonale Betriebszeiten",
      text: "Betriebszeiten für Außenbereiche (Restaurants, Bars, Aquapark) können je nach Saison und Wetterlage angepasst werden.",
    },
    {
      title: "Haustierregelung",
      text: "Aus hygienischen Gründen sind Haustiere im gesamten Hotelbereich nicht gestattet.",
    },
    {
      title: "Vorbehalt der Geschäftsleitung",
      text: "Die Hotelleitung von Orka Lotus Beach behält sich das Recht vor, Änderungen am Konzept und an den Betriebszeiten ohne vorherige Ankündigung vorzunehmen.",
    },
  ],
};
