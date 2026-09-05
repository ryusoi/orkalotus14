import { useState } from "react";
import { Link } from "wouter";
import {
  Bed,
  Check,
  CheckCircle2,
  Coffee,
  FileSpreadsheet,
  FileText,
  HelpCircle,
  Info,
  Maximize,
  Phone,
  Shield,
  Sparkles,
  Tv,
  Users,
  Waves,
  Wifi,
  Wind,
  ZoomIn,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { useLocale } from "@/contexts/LocaleContext";
import {
  AccommodationCarousel,
  FullscreenImageViewer,
} from "@/components/Carousels";
import {
  accommodationGalleryImages,
  accommodationSectionCopy,
  type Locale,
} from "@/data/content";
import { factSheetRoomsMatrix } from "@/data/factSheetData";
import InteractiveFactSheetViewer from "@/components/InteractiveFactSheetViewer";

interface RoomTypeData {
  id: string;
  name: Record<Locale, string>;
  size: string;
  capacity: Record<Locale, string>;
  view: Record<Locale, string>;
  image: string;
  description: Record<Locale, string>;
  features: Record<Locale, string[]>;
}

const ROOM_TYPES_DATA: RoomTypeData[] = [
  {
    id: "standard-sea",
    name: {
      en: "Standard Room · Sea View",
      tr: "Standart Oda · Deniz Manzaralı",
      ru: "Стандартный номер · Вид на море",
      de: "Standardzimmer · Meerblick",
    },
    size: "26 m²",
    capacity: {
      en: "2+1 or 3 Adults",
      tr: "2+1 veya 3 Yetişkin",
      ru: "2+1 или 3 взрослых",
      de: "2+1 oder 3 Erwachsene",
    },
    view: {
      en: "Direct Panoramic Aegean Sea View",
      tr: "Panoramik Ege Denizi Manzarası",
      ru: "Панорамный вид на Эгейское море",
      de: "Panoramablick auf das Ägäische Meer",
    },
    image:
      "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/SEA-2_1200x800-800x533.jpg",
    description: {
      en: "Wake up to the glistening turquoise waters of Marmaris Bay. Elegantly appointed with natural wood accents, private glass-railed balcony, rain shower, and plush bedding.",
      tr: "Marmaris Körfezi'nin turkuaz sularına uyanın. Doğal ahşap detaylar, cam korkuluklu özel balkon, yağmur duşu ve lüks yatak donanımıyla tasarlandı.",
      ru: "Просыпайтесь с видом на бирюзовые воды залива Мармарис. Элегантный интерьер, балкон со стеклянными перилами, тропический душ и удобная кровать.",
      de: "Erwachen Sie mit Blick auf das türkisfarbene Wasser der Bucht von Marmaris. Elegant eingerichtet mit Holzakzenten, privatem Balkon und Regendusche.",
    },
    features: {
      en: [
        "Furnished Balcony overlooking Aegean Sea",
        "Daily soft drinks restocked minibar",
        "LED TV with international satellite channels",
        "Complimentary high-speed Wi-Fi",
        "Water heater & Tea/Coffee maker set",
        "Central air conditioning & in-room safe box",
        "Marble bathroom with rain shower & slippers",
        "Complimentary pillow menu selection",
      ],
      tr: [
        "Ege Denizi manzaralı mobilyalı balkon",
        "Her gün meşrubatla yenilenen minibar",
        "Uluslararası uydu kanallı LED TV",
        "Ücretsiz yüksek hızlı Wi-Fi",
        "Su ısıtıcısı & Çay/Kahve seti",
        "Merkezi klima & çelik dijital kasa",
        "Yağmur duşlu banyo & yumuşak terlikler",
        "Ücretsiz yastık menüsü seçeneği",
      ],
      ru: [
        "Балкон с видом на Эгейское море",
        "Ежедневно пополняемый мини-бар",
        "LED ТВ со спутниковыми каналами",
        "Бесплатный высокоскоростной Wi-Fi",
        "Чайный набор и электрочайник",
        "Центральный кондиционер и сейф",
        "Ванная с тропическим душем и тапочками",
        "Меню подушек на выбор",
      ],
      de: [
        "Möblierter Balkon mit Ägäis-Meerblick",
        "Täglich mit Softdrinks gefüllte Minibar",
        "LED-TV mit internationalen Satellitenkanälen",
        "Kostenloses Highspeed-WLAN",
        "Wasserkocher & Tee-/Kaffeeset",
        "Zentralklimaanlage & Zimmersafe",
        "Marmorbad mit Regendusche & Slipper",
        "Kissenmenü nach Wahl",
      ],
    },
  },
  {
    id: "standard-land",
    name: {
      en: "Standard Room · Land & Pine Forest",
      tr: "Standart Oda · Kara & Çam Ormanı",
      ru: "Стандартный номер · Вид на лес/горы",
      de: "Standardzimmer · Land- & Pinienwaldblick",
    },
    size: "26 m²",
    capacity: {
      en: "2+1 or 3 Adults",
      tr: "2+1 veya 3 Yetişkin",
      ru: "2+1 или 3 взрослых",
      de: "2+1 oder 3 Erwachsene",
    },
    view: {
      en: "Pine Forest & Mountain Panorama",
      tr: "Çam Ormanı & Dağ Manzarası",
      ru: "Сосновый лес и панорама гор",
      de: "Pinienwald- & Bergpanorama",
    },
    image:
      "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/LAND-1_1200x800-800x533.jpg",
    description: {
      en: "Surrounded by the scented pine trees of the national park, offering tranquil silence and natural Aegean breeze for a deeply restorative night's rest.",
      tr: "Milli parkın kokulu çam ağaçlarıyla çevrili, derin bir dinlenme için huzurlu sessizlik ve taze Ege esintisi sunar.",
      ru: "В окружении ароматных сосен национального парка, гарантирующих тишину и освежающий морской бриз.",
      de: "Umgeben von duftenden Pinien des Nationalparks – für erholsame Ruhe und eine erfrischende Meeresbrise.",
    },
    features: {
      en: [
        "Private Balcony facing lush pine forest",
        "Daily restocked minibar with refreshments",
        "LED TV & High-Speed Wi-Fi",
        "Tea & Coffee maker options",
        "Central climate control & digital safe",
        "Laminated flooring & reading lamps",
        "Rain shower / WC & makeup mirror",
        "Pillow Menu & slippers",
      ],
      tr: [
        "Yeşil çam ormanına bakan balkon",
        "Her gün yenilenen meşrubatlı minibar",
        "LED TV & Yüksek Hızlı Wi-Fi",
        "Çay ve kahve ikram seti",
        "Merkezi klima & dijital çelik kasa",
        "Laminant parke & okuma lambaları",
        "Yağmur duşu / WC & makyaj aynası",
        "Yastık Menüsü & terlikler",
      ],
      ru: [
        "Балкон с видом на сосновый лес",
        "Ежедневный мини-бар с напитками",
        "LED ТВ и быстрый Wi-Fi",
        "Чайный набор",
        "Кондиционер и цифровой сейф",
        "Ламинат и лампы для чтения",
        "Душ и зеркало для макияжа",
        "Меню подушек и тапочки",
      ],
      de: [
        "Balkon mit Blick auf den Pinienwald",
        "Tägliche Minibar mit Softdrinks",
        "LED-TV & Highspeed-WLAN",
        "Tee- & Kaffeestation",
        "Klimaanlage & Safe",
        "Laminatboden & Leselampen",
        "Regendusche & Kosmetikspiegel",
        "Kissenmenü & Slipper",
      ],
    },
  },
  {
    id: "large-room",
    name: {
      en: "Large Room · Sea or Land View",
      tr: "Geniş Oda · Deniz veya Doğa Manzaralı",
      ru: "Большой номер · Вид на море или горы",
      de: "Großes Zimmer · Meer- oder Landblick",
    },
    size: "36 m²",
    capacity: {
      en: "Up to 3 Adults + 1 Child",
      tr: "3 Yetişkin + 1 Çocuk",
      ru: "До 3 взрослых + 1 ребенок",
      de: "Bis zu 3 Erwachsene + 1 Kind",
    },
    view: {
      en: "Sea or Scented Pine Forest View",
      tr: "Deniz veya Çam Ormanı Manzarası",
      ru: "Вид на море или сосновый лес",
      de: "Meerblick oder Pinienwaldblick",
    },
    image:
      "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/LAND-1_1200x800-800x533.jpg",
    description: {
      en: "Expansive 36 m² open layout designed for extra comfort and luxury lounging. Features generous seating area, oversized balcony, and complete 5-star amenities.",
      tr: "Ekstra konfor ve ferahlık için tasarlanmış 36 m² geniş yaşam alanı. Geniş oturma köşesi, balkon ve 5 yıldızlı donanım.",
      ru: "Просторная планировка 36 м² для повышенного комфорта. Большая зона отдыха, балкон и пятизвездочное оснащение.",
      de: "Großzügige 36 m² Wohnfläche für maximalen Komfort. Mit gemütlicher Sitzecke, großem Balkon und 5-Sterne-Ausstattung.",
    },
    features: {
      en: [
        "Generous 36 m² open living space",
        "Spacious furnished balcony or terrace",
        "Daily refilled minibar with soft drinks",
        "LED TV, Satellite & High-Speed Wi-Fi",
        "Central AC, digital safe & water heater",
        "Rain shower, makeup mirror & hairdryer",
        "Laminated flooring, slippers & pillow menu",
      ],
      tr: [
        "36 m² ferah ve geniş yaşam alanı",
        "Geniş mobilyalı balkon veya teras",
        "Her gün yenilenen meşrubatlı minibar",
        "LED TV, Uydu & Yüksek Hızlı Wi-Fi",
        "Merkezi klima, dijital kasa & kettle",
        "Yağmur duşu, makyaj aynası & fön",
        "Laminant zemin, terlikler & yastık menüsü",
      ],
      ru: [
        "Просторная площадь 36 м²",
        "Меблированный балкон или терраса",
        "Мини-бар с безалкогольными напитками",
        "LED ТВ, спутниковое ТВ и Wi-Fi",
        "Кондиционер, сейф и чайник",
        "Тропический душ и фен",
        "Ламинат, тапочки и меню подушек",
      ],
      de: [
        "Großzügiger 36 m² Wohnbereich",
        "Möblierter Balkon oder Terrasse",
        "Täglich gefüllte Minibar",
        "LED-TV, Satellit & Highspeed-WLAN",
        "Klimaanlage, Safe & Wasserkocher",
        "Regendusche, Kosmetikspiegel & Föhn",
        "Laminatboden, Slipper & Kissenmenü",
      ],
    },
  },
  {
    id: "family-room",
    name: {
      en: "Family Room · 2 Rooms with Connecting Door",
      tr: "Aile Odası · Ara Kapılı 2 Ayrı Oda",
      ru: "Семейный номер · 2 комнаты с дверью",
      de: "Familienzimmer · 2 Zimmer mit Verbindungstür",
    },
    size: "36–40 m²",
    capacity: {
      en: "Up to 4 Adults + 1 Child",
      tr: "4 Yetişkin + 1 Çocuk",
      ru: "До 4 взрослых + 1 ребенок",
      de: "Bis zu 4 Erwachsene + 1 Kind",
    },
    view: {
      en: "Sea, Side Sea, or Pine Garden View",
      tr: "Deniz, Kısmi Deniz veya Bahçe Manzarası",
      ru: "Вид на море, боковой вид или сад",
      de: "Meerblick, seitlicher Blick oder Garten",
    },
    image:
      "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/FAM-L-5_1200x800-800x533.jpg",
    description: {
      en: "Generously proportioned for families desiring privacy and togetherness. Features two separate sleeping quarters connected by an interior door, plus 1 complete bathroom.",
      tr: "Mahremiyet ve ailece birliktelik için özel olarak planlanmış 2 ayrı yatak odası, ara bağlantı kapısı ve 1 tam donanımlı banyo.",
      ru: "Идеально для семейного отдыха: две раздельные спальни с межкомнатной дверью и 1 общая ванная комната.",
      de: "Perfekt für Familien: Zwei separate Schlafbereiche mit Verbindungstür und 1 komplettes Badezimmer.",
    },
    features: {
      en: [
        "2 Separate Bedrooms with connecting privacy door",
        "36–40 m² total floor plan with furnished balcony",
        "Daily soft drinks restocked minibar",
        "Independent LED TVs & High-Speed Wi-Fi",
        "Central climate control & digital safe box",
        "Rain shower, makeup mirror & hairdryer",
        "Laminated flooring, slippers & pillow menu",
      ],
      tr: [
        "Ara kapılı 2 bağımsız yatak odası",
        "36–40 m² toplam alan ve mobilyalı balkon",
        "Her gün meşrubat dolu minibar",
        "Bağımsız LED TV'ler & Yüksek Hızlı Wi-Fi",
        "Merkezi klima & çelik dijital kasa",
        "Yağmur duşu, makyaj aynası & saç kurutma",
        "Laminant parke, terlikler & yastık menüsü",
      ],
      ru: [
        "2 раздельные спальни с межкомнатной дверью",
        "Общая площадь 36–40 м² с балконом",
        "Ежедневный мини-бар с напитками",
        "Отдельные LED ТВ и скоростной Wi-Fi",
        "Кондиционер и сейф",
        "Тропический душ и фен",
        "Ламинат, тапочки и меню подушек",
      ],
      de: [
        "2 separate Schlafzimmer mit Verbindungstür",
        "36–40 m² Gesamtfläche mit Balkon",
        "Täglich aufgefüllte Minibar",
        "Separate LED-Fernseher & WLAN",
        "Zentralklimaanlage & Safe",
        "Regendusche, Kosmetikspiegel & Föhn",
        "Laminatboden, Slipper & Kissenmenü",
      ],
    },
  },
  {
    id: "superior-jacuzzi",
    name: {
      en: "Superior Jacuzzi Suite · Panoramic Terrace",
      tr: "Superior Jakuzili Süit · Panoramik Teras",
      ru: "Сьюит Superior с джакузи · Панорамная терраса",
      de: "Superior Jacuzzi Suite · Panoramaterrasse",
    },
    size: "45–52 m²",
    capacity: {
      en: "2 Adults (Romantic Luxury)",
      tr: "2 Yetişkin (Romantik Lüks)",
      ru: "2 взрослых (Романтический отдых)",
      de: "2 Erwachsene (Romantischer Luxus)",
    },
    view: {
      en: "Frontline Panoramic Aegean Sea & Sunset",
      tr: "Ön Sıra Panoramik Deniz & Gün Batımı",
      ru: "Фронтальный панорамный вид на море и закат",
      de: "Direkter Panoramameerblick & Sonnenuntergang",
    },
    image:
      "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/JAC-3_1200x800-800x533.jpg",
    description: {
      en: "Our premier romantic accommodation featuring an open-air private jacuzzi terrace, champagne arrival service, and unobstructed views over Marmaris Bay.",
      tr: "Açık hava özel jakuzili terası, şampanyalı karşılama ve Marmaris Körfezi'nin kesintisiz manzarasına sahip seçkin romantik süitimiz.",
      ru: "Роскошный романтический номер с собственной террасой с джакузи на свежем воздухе и прямым видом на море.",
      de: "Unsere exklusive romantische Suite mit privater Whirlpool-Terrasse unter freiem Himmel und Traumblick auf die Ägäis.",
    },
    features: {
      en: [
        "Private open-air heated jacuzzi hot tub on terrace",
        "Frontline panoramic sea & sunset views",
        "Nespresso capsule coffee machine & tea atelier",
        "Daily restocked premium minibar",
        "Silk bathrobes, luxury bath products & slippers",
        "VIP guest relations priority line",
        "Complimentary evening turndown service",
      ],
      tr: [
        "Terasta özel açık hava ısıtmalı jakuzi",
        "Ön cephe kesintisiz deniz ve gün batımı manzarası",
        "Nespresso kapsül kahve makinesi ve çay atölyesi",
        "Her gün yenilenen premium minibar",
        "İpek bornozlar, lüks banyo kozmetikleri ve terlikler",
        "VIP misafir ilişkileri öncelikli hattı",
        "Ücretsiz akşam turndown servisi",
      ],
      ru: [
        "Собственное джакузи с подогревом на террасе",
        "Панорамный вид на море и закат",
        "Кофемашина Nespresso и чайный набор",
        "Ежедневный премиум мини-бар",
        "Шелковые халаты и брендовая косметика",
        "VIP-линия службы консьержа",
        "Вечерняя подготовка постели ко сну",
      ],
      de: [
        "Privater beheizter Whirlpool auf der Terrasse",
        "Unverbauter Panoramablick auf Meer und Sonnenuntergang",
        "Nespresso-Kapselmaschine & Teestation",
        "Täglich gefüllte Premium-Minibar",
        "Seidenbademäntel, Luxuspflege & Slipper",
        "Prioritäts-Gästebetreuung",
        "Kostenloser abendlicher Turndown-Service",
      ],
    },
  },
];

const GUEST_SERVICES_DATA = [
  {
    icon: <Sparkles size={22} />,
    title: {
      en: "Daily Housekeeping & Minibar Restock",
      tr: "Günlük Kat Temizliği ve Minibar Yenileme",
      ru: "Ежедневная уборка и пополнение мини-бара",
      de: "Tägliche Zimmerreinigung & Minibar-Auffüllung",
    },
    description: {
      en: "Immaculate daily room care, fresh linen exchange, soft drinks minibar replenishment, and personalized pillow menu delivery.",
      tr: "Kusursuz günlük oda temizliği, taze çarşaf değişimi, meşrubat minibar yenilemesi ve yastık menüsü teslimatı.",
      ru: "Ежедневная качественная уборка, смена белья, пополнение мини-бара и доставка подушек на выбор.",
      de: "Tägliche Reinigung, frische Bettwäsche, Auffüllung der Minibar mit Softdrinks und Kissenmenü-Service.",
    },
  },
  {
    icon: <Coffee size={22} />,
    title: {
      en: "24-Hour In-Room Dining Service",
      tr: "24 Saat Kesintisiz Oda Servisi",
      ru: "Круглосуточный Room Service",
      de: "24-Stunden-Zimmerservice",
    },
    description: {
      en: "Curated chef specialties, midnight snacks, freshly tossed Aegean salads, and fine Turkish wines delivered straight to your suite terrace.",
      tr: "Şefin özel lezzetleri, gece atıştırmalıkları, taze Ege salataları ve şarapların odanıza özel 24 saat sunumu.",
      ru: "Блюда от шеф-повара, ночные закуски и напитки с доставкой прямо в номер круглосуточно.",
      de: "Feine Spezialitäten, Mitternachtssnacks und ausgewählte Weine rund um die Uhr direkt auf Ihr Zimmer.",
    },
  },
  {
    icon: <Wind size={22} />,
    title: {
      en: "Eco Climate Control & Air Purity",
      tr: "Akıllı İklimlendirme ve Temiz Hava",
      ru: "Эко-климат-контроль и очистка воздуха",
      de: "Eco-Klimaanlage & Raumluftfilterung",
    },
    description: {
      en: "Individual digital climate control with balcony door energy sensors and natural filtered Aegean sea breezes.",
      tr: "Balkon kapısı sensörlü bireysel dijital iklimlendirme ve taze Ege esintisiyle doğal havalandırma.",
      ru: "Индивидуальный цифровой климат-контроль с датчиками энергосбережения и свежим морским воздухом.",
      de: "Individuelle Klimasteuerung mit Balkontür-Sensoren und frischer ägäischer Meeresluft.",
    },
  },
  {
    icon: <Shield size={22} />,
    title: {
      en: "Digital Electronic In-Room Safe",
      tr: "Oda İçi Dijital Çelik Kasa",
      ru: "Электронный цифровой сейф в номере",
      de: "Elektronischer Zimmersafe",
    },
    description: {
      en: "Complimentary laptop-sized electronic digital safe box with personalized 4-digit PIN code protection in all 441 rooms.",
      tr: "441 odanın tamamında kişisel 4 haneli şifre korumalı, dizüstü bilgisayar uyumlu ücretsiz dijital kasa.",
      ru: "Бесплатный электронный сейф, подходящий для ноутбука, с индивидуальным PIN-кодом во всех 441 номерах.",
      de: "Kostenloser elektronischer Laptop-Safe mit persönlichem PIN-Code in allen 441 Zimmern.",
    },
  },
  {
    icon: <Users size={22} />,
    title: {
      en: "Multilingual Concierge & Guest Relations",
      tr: "Çok Dilli Konsiyerj ve Misafir İlişkileri",
      ru: "Многоязычный консьерж и работа с гостями",
      de: "Mehrsprachiger Concierge & Gästeservice",
    },
    description: {
      en: "Dedicated guest care in English, Turkish, Russian, German, and Arabic for private yacht charters, transfers, and reservations.",
      tr: "Özel yat kiralama, transferler ve rezervasyonlar için İngilizce, Türkçe, Rusça, Almanca ve Arapça misafir desteği.",
      ru: "Помощь на английском, турецком, русском, немецком и арабском языках: бронирование экскурсий, яхт и трансферов.",
      de: "Betreuung auf Deutsch, Englisch, Türkisch, Russisch und Arabisch für Ausflüge, Transfers und Reservierungen.",
    },
  },
  {
    icon: <HelpCircle size={22} />,
    title: {
      en: "24/7 Medical Care & Doctor on Call",
      tr: "7/24 Sağlık Hizmeti ve Nöbetçi Doktor",
      ru: "Круглосуточный медицинский пункт и врач",
      de: "24/7 Ärztlicher Notdienst & Erste Hilfe",
    },
    description: {
      en: "On-call certified physician and licensed nurse station adjacent to main lobby for immediate medical consultations.",
      tr: "Lobi yanında diplomalı hemşire istasyonu ve 7/24 nöbetçi doktor ile kesintisiz sağlık güvencesi.",
      ru: "Дежурный квалифицированный врач и медсестра рядом с лобби для оказания первой помощи.",
      de: "Bereitschaftsarzt und diplomiertes Pflegepersonal direkt neben der Hauptlobby für Ihre Sicherheit.",
    },
  },
];

export default function RoomsServicesPage() {
  const { locale, setLocale } = useLocale();
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("standard-sea");
  const [isFactSheetViewerOpen, setIsFactSheetViewerOpen] = useState(false);

  const roomsChartImageUrl =
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/Rooms%20Information.png";

  const currentRoom =
    ROOM_TYPES_DATA.find((r) => r.id === selectedRoomId) || ROOM_TYPES_DATA[0];

  const getTxt = (obj?: Record<Locale, string>, loc?: Locale) =>
    obj ? obj[loc || locale] || obj.en : "";

  const pageLabels = {
    en: {
      chartBannerBadge: "Official Fact Sheet Documentation",
      chartBannerTitle: "Rooms & Amenities Information Chart",
      chartBannerDesc:
        "Access the high-resolution official fact sheet comparison matrix detailing dimensions, bed counts, balcony status, and all 5-star amenities across 9 room configurations.",
      chartBtn: "Open Interactive Chart (Zoom & Pan)",
      specTitle: "Room Specifications",
      sizeLabel: "Size:",
      capacityLabel: "Occupancy:",
      viewLabel: "View:",
      bedsLabel: "Beds:",
      amenitiesHeading: "Amenities & Features Included:",
      inquireBtn: "Inquire with Reservations (444 6 752)",
      fullMatrixHeading: "All 9 Room Categories at a Glance",
      galleryHeading: "Accommodation Gallery",
      galleryLede: "Explore our guest suites, interior comforts, and sun-drenched balconies.",
      servicesHeading: "Exceptional Services at Your Command",
      servicesDesc: "From seamless room care to multilingual concierge arrangements, our team ensures your Aegean getaway is effortless.",
    },
    tr: {
      chartBannerBadge: "Resmi Fact Sheet Belgesi",
      chartBannerTitle: "Oda ve Donanım Bilgilendirme Şeması",
      chartBannerDesc:
        "9 farklı oda tipinin metrekarelerini, yatak kapasitelerini, balkon durumlarını ve 5 yıldızlı tüm donanım özelliklerini içeren resmi tabloyu yüksek çözünürlükte inceleyin.",
      chartBtn: "İnteraktif Şemayı Aç (Yakınlaştır & İncele)",
      specTitle: "Oda Teknik Özellikleri",
      sizeLabel: "Boyut:",
      capacityLabel: "Kapasite:",
      viewLabel: "Manzara:",
      bedsLabel: "Yatak:",
      amenitiesHeading: "Dahil Olan Donanım ve Hizmetler:",
      inquireBtn: "Rezervasyon Masasını Ara (444 6 752)",
      fullMatrixHeading: "Tüm 9 Oda Tipinin Özellik Tablosu",
      galleryHeading: "Konaklama Galerisi",
      galleryLede: "Süitlerimizi, iç mekan konforunu ve güneş alan balkonlarımızı keşfedin.",
      servicesHeading: "Hizmetinizdeki Ayrıcalıklı Servisler",
      servicesDesc: "Oda bakımından çok dilli konsiyerje kadar tüm ekibimiz tatilinizin kusursuz geçmesi için hizmetinizdedir.",
    },
    ru: {
      chartBannerBadge: "Официальный документ Fact Sheet",
      chartBannerTitle: "Схема и спецификация всех номеров",
      chartBannerDesc:
        "Изучите официальную таблицу с подробными размерами, типами кроватей, наличием балконов и пятизвездочными удобствами для всех 9 типов номеров.",
      chartBtn: "Открыть схему номеров (Масштабирование)",
      specTitle: "Характеристики номера",
      sizeLabel: "Площадь:",
      capacityLabel: "Вместимость:",
      viewLabel: "Вид:",
      bedsLabel: "Кровати:",
      amenitiesHeading: "Включенные удобства и оснащение:",
      inquireBtn: "Связаться с отделом бронирования (444 6 752)",
      fullMatrixHeading: "Все 9 категорий номеров в таблице",
      galleryHeading: "Фотогалерея номеров",
      galleryLede: "Взгляните на наши комфортабельные сьюты, интерьеры и солнечные балконы.",
      servicesHeading: "Премиальные услуги для гостей",
      servicesDesc: "От ежедневного сервиса до консьержа на нескольких языках — мы заботимся о каждой детали вашего отдыха.",
    },
    de: {
      chartBannerBadge: "Offizielles Fact Sheet Dokument",
      chartBannerTitle: "Zimmer- & Ausstattungsübersicht",
      chartBannerDesc:
        "Sehen Sie sich die offizielle Vergleichsmatrix mit Raumgrößen, Bettenanzahl, Balkonstatus und 5-Sterne-Ausstattung aller 9 Zimmerkategorien in hoher Auflösung an.",
      chartBtn: "Interaktive Tabelle öffnen (Zoom & Pan)",
      specTitle: "Zimmerspezifikationen",
      sizeLabel: "Größe:",
      capacityLabel: "Belegung:",
      viewLabel: "Aussicht:",
      bedsLabel: "Betten:",
      amenitiesHeading: "Inbegriffene Annehmlichkeiten:",
      inquireBtn: "Reservierungsanfrage (444 6 752)",
      fullMatrixHeading: "Alle 9 Zimmerkategorien auf einen Blick",
      galleryHeading: "Unterkunfts-Galerie",
      galleryLede: "Entdecken Sie unsere Suiten, stilvolle Interieurs und sonnenverwöhnte Balkone.",
      servicesHeading: "Erstklassiger Gästeservice",
      servicesDesc: "Von der täglichen Zimmerpflege bis zum mehrsprachigen Concierge steht Ihnen unser Team stets zur Seite.",
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
            <span className="text-[var(--gold)]">Rooms &amp; Services</span>
          </div>

          <span className="subpage-eyebrow text-[#e8c883] font-bold">
            <span className="section-label-line" />
            {accommodationSectionCopy.eyebrow[locale]}
          </span>

          <h1 className="subpage-title font-serif text-4xl sm:text-6xl text-white font-normal mt-2 tracking-tight">
            Accommodations &amp; <em>Guest Services</em>
          </h1>

          <p className="subpage-description text-white/85 text-base sm:text-lg mt-3 max-w-2xl font-light leading-relaxed">
            {accommodationSectionCopy.description[locale]}
          </p>

          {/* Fact Sheet Interactive Chart Quick Launcher */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsFactSheetViewerOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#dfba73] to-[#b8862d] text-[#0d2735] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg flex items-center gap-2"
            >
              <ZoomIn size={15} />
              <span>{pageLabels.chartBtn}</span>
            </button>
            <Link
              href="/hotel-directory"
              className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs tracking-wider transition-colors border border-white/15 flex items-center gap-1.5"
            >
              <FileSpreadsheet size={14} className="text-[var(--gold)]" />
              <span>View Hotel Directory</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Official Fact Sheet Rooms Information Featured Banner with Zoom Prompt */}
      <section className="py-8 bg-[var(--shell)] border-b border-[rgba(200,159,87,0.35)]">
        <div className="container">
          <div className="gold-frame-card p-6 sm:p-8 bg-gradient-to-r from-[rgba(200,159,87,0.08)] via-[var(--shell)] to-[rgba(200,159,87,0.12)] flex flex-col lg:flex-row items-center justify-between gap-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#dfba73] to-[#b8862d] text-[#0d2735] shadow-md flex-shrink-0">
                <FileSpreadsheet size={28} />
              </div>
              <div>
                <span className="gold-tag-badge mb-1.5">
                  {pageLabels.chartBannerBadge}
                </span>
                <h2 className="gold-headline text-2xl sm:text-3xl font-bold">
                  {pageLabels.chartBannerTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-1.5 max-w-2xl leading-relaxed">
                  {pageLabels.chartBannerDesc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setIsFactSheetViewerOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#dfba73] via-[#c89f57] to-[#b8862d] text-[#0d2735] font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2 border border-[#ecc98a]"
              >
                <ZoomIn size={16} />
                <span>{pageLabels.chartBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Room Selector & Detailed Showcase */}
      <section className="section bg-[var(--paper)]">
        <div className="container">
          <div className="flex flex-wrap gap-2 pb-6 border-b border-[rgba(200,159,87,0.3)] mb-10 overflow-x-auto">
            {ROOM_TYPES_DATA.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoomId(room.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedRoomId === room.id
                    ? "bg-gradient-to-r from-[#dfba73] to-[#b8862d] text-[#0d2735] shadow-md border border-[#ecc98a]"
                    : "bg-[var(--shell)] text-[var(--ink-soft)] hover:text-[var(--ink)] border border-[rgba(200,159,87,0.25)]"
                }`}
              >
                {getTxt(room.name).split("·")[0]}
              </button>
            ))}
          </div>

          {/* Active Room Detail Spotlight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div
                className="gold-frame-card relative rounded-2xl overflow-hidden aspect-[16/10] group cursor-pointer shadow-xl"
                onClick={() => setViewerIndex(0)}
              >
                <img
                  src={currentRoom.image}
                  alt={getTxt(currentRoom.name)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      accommodationGalleryImages[0];
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#e8c883] font-bold">
                      {getTxt(currentRoom.view)}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mt-0.5">
                      {getTxt(currentRoom.name)}
                    </h3>
                  </div>
                  <span className="text-xs bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[rgba(200,159,87,0.4)] text-[var(--gold)] font-medium">
                    Tap to expand
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <span className="gold-tag-badge mb-1.5">
                  {pageLabels.specTitle}
                </span>
                <h2 className="gold-headline text-3xl sm:text-4xl font-semibold mt-1">
                  {getTxt(currentRoom.name)}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-3 leading-relaxed">
                  {getTxt(currentRoom.description)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 py-4 border-y border-[rgba(200,159,87,0.3)] text-xs">
                <div className="flex items-center gap-2 text-[var(--ink)]">
                  <Maximize size={16} className="text-[var(--gold)]" />
                  <span>
                    {pageLabels.sizeLabel}{" "}
                    <strong className="text-[var(--gold)]">{currentRoom.size}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[var(--ink)]">
                  <Users size={16} className="text-[var(--gold)]" />
                  <span>
                    {pageLabels.capacityLabel}{" "}
                    <strong>{getTxt(currentRoom.capacity)}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[var(--ink)] col-span-2">
                  <Waves size={16} className="text-[var(--gold)]" />
                  <span className="truncate">
                    {pageLabels.viewLabel}{" "}
                    <strong>{getTxt(currentRoom.view)}</strong>
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] block mb-2.5">
                  {pageLabels.amenitiesHeading}
                </span>
                <ul className="space-y-2">
                  {currentRoom.features[locale]?.map((feat, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-[var(--ink)] flex items-center gap-2.5"
                    >
                      <Check size={14} className="text-[var(--gold)] flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <a
                  href="tel:4446752"
                  className="px-6 py-3.5 bg-gradient-to-r from-[#dfba73] to-[#b8862d] text-[#0d2735] text-xs font-bold uppercase tracking-widest rounded-lg transition-all hover:brightness-110 shadow-md inline-flex items-center gap-2"
                >
                  <Phone size={14} /> {pageLabels.inquireBtn}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full 9 Room Categories Overview Matrix Table */}
      <section className="section bg-[var(--shell)] border-t border-[rgba(200,159,87,0.25)]">
        <div className="container">
          <div className="max-w-3xl mb-8">
            <span className="section-label">
              <span className="section-label-line" />
              Fact Sheet Matrix
            </span>
            <h2 className="gold-headline text-3xl sm:text-4xl font-normal mt-2">
              {pageLabels.fullMatrixHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-2">
              All 9 room categories from the official Orka Lotus Beach Fact Sheet with exact dimensions, view orientations, and included features.
            </p>
          </div>

          <div className="gold-table-container">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="gold-table-header-row">
                    <th className="p-3.5 pl-5">Room Category</th>
                    <th className="p-3.5">Size</th>
                    <th className="p-3.5">View</th>
                    <th className="p-3.5">Balcony</th>
                    <th className="p-3.5 pr-5">Key Features</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(200,159,87,0.2)]">
                  {factSheetRoomsMatrix.map((room) => (
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
                          {room.features[locale]?.slice(0, 5).map((f, fIdx) => (
                            <span
                              key={fIdx}
                              className="inline-block px-1.5 py-0.5 rounded bg-[var(--paper)] border border-[rgba(200,159,87,0.25)] text-[10.5px]"
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

      {/* Large Accommodation Carousel */}
      <section className="section bg-[var(--paper)] border-t border-[rgba(200,159,87,0.25)]">
        <div className="container">
          <div className="section-heading-row mb-10">
            <div>
              <span className="section-label">
                <span className="section-label-line" />
                Visual Gallery
              </span>
              <h2 className="gold-headline text-3xl sm:text-4xl font-normal mt-2">
                {pageLabels.galleryHeading}
              </h2>
            </div>
            <p className="section-lede text-xs sm:text-sm text-[var(--ink-soft)]">
              {pageLabels.galleryLede}
            </p>
          </div>

          <div
            onClick={(e) => {
              const target = (e.target as HTMLElement).closest(
                "[data-lightbox-kind]"
              );
              if (target) {
                const idx = Number(target.getAttribute("data-lightbox-index") || "0");
                setViewerIndex(idx);
              }
            }}
          >
            <AccommodationCarousel locale={locale} />
          </div>
        </div>
      </section>

      {/* Dedicated Guest Care & Services */}
      <section className="section bg-[var(--shell)] border-t border-[rgba(200,159,87,0.25)]">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="section-label">
              <span className="section-label-line" />
              Tailored Hospitality
            </span>
            <h2 className="gold-headline text-3xl sm:text-4xl font-normal mt-2">
              {pageLabels.servicesHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-3">
              {pageLabels.servicesDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUEST_SERVICES_DATA.map((srv, idx) => (
              <div
                key={idx}
                className="gold-frame-card p-6 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(200,159,87,0.15)] text-[var(--gold)] flex items-center justify-center border border-[rgba(200,159,87,0.3)]">
                  {srv.icon}
                </div>
                <h3 className="gold-headline text-xl font-medium mt-1">
                  {getTxt(srv.title)}
                </h3>
                <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                  {getTxt(srv.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Photo Lightbox */}
      <FullscreenImageViewer
        images={accommodationGalleryImages}
        index={viewerIndex}
        label="Accommodation"
        onClose={() => setViewerIndex(null)}
        onChange={setViewerIndex}
      />

      {/* Fact Sheet Rooms Information Image Modal with Interactive Zoom / Pan */}
      <InteractiveFactSheetViewer
        isOpen={isFactSheetViewerOpen}
        onClose={() => setIsFactSheetViewerOpen(false)}
        imageUrl={roomsChartImageUrl}
        title={{
          en: "Orka Lotus Beach · Rooms Information Fact Sheet",
          tr: "Orka Lotus Beach · Odalar ve Özellikler Bilgi Tablosu",
          ru: "Orka Lotus Beach · Спецификация категорий номеров",
          de: "Orka Lotus Beach · Zimmer- und Ausstattungs-Factsheet",
        }}
        subtitle={{
          en: "Official comparison matrix covering sizes, views, balcony specs, and 5-star amenities",
          tr: "Oda büyüklükleri, manzaralar, balkon detayları ve donanımları gösteren resmi tablo",
          ru: "Официальная таблица размеров, видов, балконов и оснащения всех 9 категорий номеров",
          de: "Offizielle Vergleichstabelle für Raumgrößen, Aussichten, Balkone und Ausstattung",
        }}
        locale={locale}
      />
    </PageShell>
  );
}
