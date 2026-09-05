import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Award,
  Building2,
  Check,
  ChevronRight,
  Compass,
  Crown,
  ExternalLink,
  FileText,
  Globe,
  Headphones,
  HeartHandshake,
  HelpCircle,
  Home,
  Layers,
  Mail,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
  PhoneCall,
  QrCode,
  Scale,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Volume2,
  VolumeX,
  Waves,
  X,
} from "lucide-react";
import { toast } from "sonner";
import PageShell from "@/components/PageShell";
import ZoomableModal from "@/components/ZoomableModal";
import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/data/content";

/* -------------------------------------------------------------------------- */
/*                                IMAGE ASSETS                                */
/* -------------------------------------------------------------------------- */
const IMAGES = {
  consultantsSuite: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ORKA%20HOMES/3%20CONSULTANTS%20SUITE.png",
  all3Consultants: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ORKA%20HOMES/ALL%203%20Consultants.png",
  jaleh: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ORKA%20HOMES/Jaleh.png",
  shahab: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ORKA%20HOMES/Shahab%20suit%20half%20yellow%20tie.png",
  riviera: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ORKA%20HOMES/ORKA%20HOMES%20RIVIERA.png",
  qrCode: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ORKA%20HOMES/qr%20code%20final.png",
  heroVideo: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ORKA%20HOMES/ORKA%20RIVIERA%20US.mp4",
  orkaLotusSea: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/SEA-2_1200x800-800x533.jpg",
  orkaSunlife: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/pools_800x1200.jpg",
};

/* -------------------------------------------------------------------------- */
/*                                TRANSLATIONS                                */
/* -------------------------------------------------------------------------- */
type HomesTranslations = {
  heroTag: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroDesc: string;
  officialWebBtn: string;
  scanQrBtn: string;
  consultantsTag: string;
  consultantsTitle: string;
  consultantsSubtitle: string;
  consultantsDesc: string;
  scanToConnect: string;
  spokenLanguages: string;
  whatsappDirect: string;
  callDirect: string;
  viewBrochure: string;
  hotlineTitle: string;
  hotlineSubtitle: string;
  hotlineDesc: string;
  rivieraTag: string;
  rivieraTitle: string;
  rivieraSubtitle: string;
  rivieraPrice: string;
  rivieraDesc: string;
  summaryTab: string;
  communityTab: string;
  lifestyleTab: string;
  amenitiesTab: string;
  investmentTab: string;
  executiveTag: string;
  executiveTitle: string;
  executiveSubtitle: string;
  featuredConsultants: string;
  highlightsLabel: string;
  formTag: string;
  formTitle: string;
  formSubtitle: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  propertyPrefLabel: string;
  messageLabel: string;
  submitBtn: string;
  qrModalTitle: string;
  qrModalSubtitle: string;
  qrModalInstruction: string;
  closeBtn: string;
};

const I18N: Record<Locale, HomesTranslations> = {
  en: {
    heroTag: "Official Real Estate & Villa Developments",
    heroHeadline: "ORKA HOMES · Luxury Mediterranean Living",
    heroSubheadline: "Exclusive Beachfront Villas, Private Residences & Sovereign Real Estate Investments",
    heroDesc:
      "Award-winning architectural masterpieces crafted by ORKA Group across the Turquoise Coast of Marmaris, İçmeler, Turunç and Fethiye. Backed by 30+ years of construction heritage, direct developer price guarantees, and turnkey Turkish Citizenship processing.",
    officialWebBtn: "Visit Official ORKA HOMES Website",
    scanQrBtn: "Scan Official QR Portal",
    consultantsTag: "Official Representatives · Dedicated Advisory",
    consultantsTitle: "Meet Our Official ORKA HOMES Consultants",
    consultantsSubtitle: "Executive International Guidance & Personalized Riviera Property Presentations",
    consultantsDesc:
      "Our licensed consultants operate directly from the ORKA Lotus Beach Hotel sales lounge, offering high-net-worth investors discrete advisory, bespoke legal structuring, and seamless property acquisitions.",
    scanToConnect: "Scan QR Code to Connect",
    spokenLanguages: "Spoken Languages",
    whatsappDirect: "Direct WhatsApp",
    callDirect: "Call Direct",
    viewBrochure: "View Brochure & Portfolio",
    hotlineTitle: "ORKA HOMES Executive Advisory Desk",
    hotlineSubtitle: "Direct Developer Hotline & VIP Investor Scheduling",
    hotlineDesc:
      "Connect directly with our central corporate sales desk for confidential portfolio reviews, VIP airport transfers, and private villa inspection itineraries.",
    rivieraTag: "Masterplan Showcase · Turunç Marmaris",
    rivieraTitle: "ORKA RIVIERA · 64 Detached Luxury Villas",
    rivieraSubtitle: "Surrounded by Crystal Waters, Pine Forests & Sovereign Sanctuary",
    rivieraPrice: "$900,000 USD – $1,200,000 USD",
    rivieraDesc:
      "Situated on the pristine Aegean peninsula of Turunç, ORKA Riviera features 64 private detached villas ($900,000 USD – $1,200,000 USD) surrounded by crystal clear bay waters and pine forests. Each villa comes with its own private pool, smart home automation, 5-star hotel concierge support, private beach access, and guaranteed Turkish Citizenship ($400K USD).",
    summaryTab: "Project Summary",
    communityTab: "Community Features",
    lifestyleTab: "Lifestyle & Prestige",
    amenitiesTab: "Villa Amenities",
    investmentTab: "Investment Advantages",
    executiveTag: "Corporate Governance & Integrity",
    executiveTitle: "Executive Professionalism & World-Class Advisory",
    executiveSubtitle: "Sovereign Integrity, Legal Excellence, and Unrivaled Dedication to International Investors",
    featuredConsultants: "Featured Official Consultants",
    highlightsLabel: "Executive Professional Highlights",
    formTag: "Direct Developer Contact",
    formTitle: "Request Private Presentation & Price List",
    formSubtitle: "Receive architectural floorplans, valuation certificates, and personalized inspection tour schedules.",
    nameLabel: "Your Full Name *",
    emailLabel: "Email Address *",
    phoneLabel: "Phone / WhatsApp Number *",
    propertyPrefLabel: "Interested Property",
    messageLabel: "Investment Requirements / Questions",
    submitBtn: "Submit Private Request",
    qrModalTitle: "ORKA HOMES Official QR Portal",
    qrModalSubtitle: "Direct Gateway to orkahomes.vercel.app",
    qrModalInstruction: "Scan with your smartphone camera to immediately access our verified interactive property portal.",
    closeBtn: "Close Window",
  },
  tr: {
    heroTag: "Resmi Gayrimenkul ve Lüks Villa Projeleri",
    heroHeadline: "ORKA HOMES · Lüks Akdeniz Yaşamı",
    heroSubheadline: "Seçkin Sahil Villaları, Özel Rezidanslar ve Güvenli Gayrimenkul Yatırımları",
    heroDesc:
      "Marmaris, İçmeler, Turunç ve Fethiye'nin eşsiz koylarında ORKA Grubu güvencesiyle yükselen ödüllü mimari başyapıtlar. 30 yılı aşkın inşaat tecrübesi, doğrudan geliştirici fiyat garantisi ve Türk Vatandaşlığı işlemlerinde anahtar teslim profesyonel danışmanlık.",
    officialWebBtn: "Resmi ORKA HOMES Web Sitesini Ziyaret Edin",
    scanQrBtn: "Resmi QR Kodunu Tara",
    consultantsTag: "Resmi Temsilciler · Özel Danışmanlık",
    consultantsTitle: "Resmi ORKA HOMES Danışmanlarımız",
    consultantsSubtitle: "Uluslararası Profesyonel Rehberlik ve Kişiye Özel Riviera Portföy Sunumları",
    consultantsDesc:
      "Lisanslı danışmanlarımız, Orka Lotus Beach Hotel bünyesindeki lüks satış ofisimizde uluslararası yatırımcılara gizlilik esaslı, hukuki güvenceli ve doğrudan geliştirici destekli hizmet sunmaktadır.",
    scanToConnect: "Bağlantı Kurmak İçin QR Kodu Tara",
    spokenLanguages: "Konuşulan Diller",
    whatsappDirect: "Doğrudan WhatsApp",
    callDirect: "Doğrudan Ara",
    viewBrochure: "Broşür ve Portföyü İncele",
    hotlineTitle: "ORKA HOMES Yönetici Danışma Masası",
    hotlineSubtitle: "Doğrudan Geliştirici Hattı ve VIP Yatırımcı Randevusu",
    hotlineDesc:
      "Gizli portföy incelemeleri, VIP havalimanı transferleri ve özel villa keşif turları için kurumsal satış merkezimizle doğrudan iletişime geçin.",
    rivieraTag: "Amiral Gemisi Projesi · Turunç Marmaris",
    rivieraTitle: "ORKA RIVIERA · 64 Müstakil Lüks Villa",
    rivieraSubtitle: "Turkuaz Koylar, Çam Ormanları ve Ayrıcalıklı Bir Yaşam",
    rivieraPrice: "$900,000 USD – $1,200,000 USD",
    rivieraDesc:
      "Turunç'un el değmemiş yarımadasında yer alan ORKA Riviera, berrak koy suları ve çam ormanlarıyla çevrili 64 özel müstakil villadan ($900,000 USD – $1,200,000 USD) oluşmaktadır. Her villa özel havuz, akıllı ev otomasyonu, 5 yıldızlı otel concierge desteği, özel plaj erişimi ve garantili Türk Vatandaşlığı ($400K USD) hakkı sunar.",
    summaryTab: "Proje Özeti",
    communityTab: "Site Özellikleri",
    lifestyleTab: "Yaşam Tarzı & Prestij",
    amenitiesTab: "Villa Donanımları",
    investmentTab: "Yatırım Avantajları",
    executiveTag: "Kurumsal Yönetişim ve Dürüstlük",
    executiveTitle: "Yönetici Düzeyinde Profesyonellik ve Küresel Danışmanlık",
    executiveSubtitle: "Hukuki Mükemmellik, Şeffaflık ve Uluslararası Yatırımcılara Özel İlgi",
    featuredConsultants: "Öne Çıkan Resmi Danışmanlar",
    highlightsLabel: "Yönetici Düzeyi Profesyonel Nitelikler",
    formTag: "Doğrudan Geliştirici İletişimi",
    formTitle: "Özel Portföy ve Fiyat Listesi Talep Edin",
    formSubtitle: "Mimari kat planları, resmi değerleme raporları ve özel keşif turu programı edinin.",
    nameLabel: "Adınız Soyadınız *",
    emailLabel: "E-posta Adresiniz *",
    phoneLabel: "Telefon / WhatsApp Numaranız *",
    propertyPrefLabel: "İlgilendiğiniz Proje",
    messageLabel: "Yatırım Talebiniz / Notlarınız",
    submitBtn: "Talebi Gönder",
    qrModalTitle: "ORKA HOMES Resmi QR Portalı",
    qrModalSubtitle: "orkahomes.vercel.app Doğrudan Bağlantısı",
    qrModalInstruction: "Doğrulanmış interaktif gayrimenkul portalımıza anında ulaşmak için telefonunuzun kamerasıyla tarayın.",
    closeBtn: "Pencereyi Kapat",
  },
  ru: {
    heroTag: "Официальная элитная недвижимость и виллы",
    heroHeadline: "ORKA HOMES · Роскошная жизнь на Средиземноморье",
    heroSubheadline: "Эксклюзивные виллы на побережье, частные резиденции и инвестиции",
    heroDesc:
      "Отмеченные наградами архитектурные шедевры группы ORKA на Бирюзовом побережье Мармариса, Ичмелера, Турунча и Фетхие. Более 30 лет строительного опыта, прямые цены от застройщика и оформление гражданства Турции «под ключ».",
    officialWebBtn: "Посетить официальный сайт ORKA HOMES",
    scanQrBtn: "Сканировать официальный QR-код",
    consultantsTag: "Официальные представители · Персональные консультации",
    consultantsTitle: "Официальные консультанты ORKA HOMES",
    consultantsSubtitle: "Международное сопровождение и индивидуальные презентации премиальной недвижимости",
    consultantsDesc:
      "Наши лицензированные консультанты работают прямо в лаундж-офисе отеля ORKA Lotus Beach, обеспечивая конфиденциальность, юридическую чистоту и поддержку на всех этапах покупки.",
    scanToConnect: "Сканируйте QR для связи",
    spokenLanguages: "Языки общения",
    whatsappDirect: "Написать в WhatsApp",
    callDirect: "Позвонить напрямую",
    viewBrochure: "Смотреть брошюру и каталог",
    hotlineTitle: "Служба дирекции ORKA HOMES",
    hotlineSubtitle: "Прямая горячая линия застройщика и запись на VIP-просмотр",
    hotlineDesc:
      "Свяжитесь с центральным офисом продаж для конфиденциального подбора объектов, организации VIP-трансфера и индивидуального тура по виллам.",
    rivieraTag: "Флагманский мастерплан · Турунч Мармарис",
    rivieraTitle: "ORKA RIVIERA · 64 приватные люкс-виллы",
    rivieraSubtitle: "В окружении кристальных заливов и реликтовых сосновых лесов",
    rivieraPrice: "$900,000 USD – $1,200,000 USD",
    rivieraDesc:
      "Расположенный на полуострове Турунч, комплекс ORKA Riviera включает 64 отдельные виллы ($900,000 – $1,200,000 USD). Каждая вилла оснащена собственным бассейном, системой «умный дом», консьерж-сервисом 5* отеля, частным пляжем и дает право на получение гражданства Турции ($400K USD).",
    summaryTab: "О проекте",
    communityTab: "Инфраструктура",
    lifestyleTab: "Стиль жизни и статус",
    amenitiesTab: "Удобства вилл",
    investmentTab: "Инвестиционные плюсы",
    executiveTag: "Корпоративное управление и надежность",
    executiveTitle: "Высочайший профессионализм и международный консалтинг",
    executiveSubtitle: "Юридическая безупречность, открытость и персональное внимание к инвесторам",
    featuredConsultants: "Ведущие официальные консультанты",
    highlightsLabel: "Ключевые преимущества сервиса",
    formTag: "Прямой контакт с застройщиком",
    formTitle: "Запросить брошюру и прайс-лист",
    formSubtitle: "Получите планировки, государственные отчеты об оценке и график индивидуального визита.",
    nameLabel: "Ваше имя и фамилия *",
    emailLabel: "Электронная почта *",
    phoneLabel: "Телефон / WhatsApp *",
    propertyPrefLabel: "Интересующий объект",
    messageLabel: "Ваши пожелания и бюджет",
    submitBtn: "Отправить запрос",
    qrModalTitle: "Официальный QR-портал ORKA HOMES",
    qrModalSubtitle: "Прямой переход на orkahomes.vercel.app",
    qrModalInstruction: "Наведите камеру смартфона на QR-код для мгновенного перехода в интерактивный каталог недвижимости.",
    closeBtn: "Закрыть",
  },
  de: {
    heroTag: "Offizielle Luxusimmobilien & Villenprojekte",
    heroHeadline: "ORKA HOMES · Luxuriöses Wohnen am Mittelmeer",
    heroSubheadline: "Exklusive Strandvillen, Residenzen & Sovereign Immobilieninvestitionen",
    heroDesc:
      "Preisgekrönte Architektur-Meisterwerke der ORKA Gruppe an der Türkischen Riviera in Marmaris, İçmeler, Turunç und Fethiye. Über 30 Jahre Bauerfahrung, Direktpreise vom Bauträger und schlüsselfertige Abwicklung der Türkischen Staatsbürgerschaft.",
    officialWebBtn: "Offizielle ORKA HOMES Website Besuchen",
    scanQrBtn: "Offiziellen QR-Code Scannen",
    consultantsTag: "Offizielle Repräsentanten · Persönliche Beratung",
    consultantsTitle: "Unsere offiziellen ORKA HOMES Berater",
    consultantsSubtitle: "Internationale Führung & Maßgeschneiderte Präsentationen an der Riviera",
    consultantsDesc:
      "Unsere lizenzierten Berater empfangen Sie in der ORKA Lotus Beach Hotel Sales Lounge für diskrete Beratung, rechtliche Strukturierung und reibungslose Akquisitionen.",
    scanToConnect: "QR-Code zum Verbinden scannen",
    spokenLanguages: "Gesprochene Sprachen",
    whatsappDirect: "Direkt via WhatsApp",
    callDirect: "Direkt Anrufen",
    viewBrochure: "Broschüre & Portfolio Ansehen",
    hotlineTitle: "ORKA HOMES Executive Desk",
    hotlineSubtitle: "Direkte Bauträger-Hotline & VIP-Terminvereinbarung",
    hotlineDesc:
      "Kontaktieren Sie unseren zentralen Vertrieb für vertrauliche Portfolio-Prüfungen, VIP-Flughafentransfers und individuelle Villen-Besichtigungstouren.",
    rivieraTag: "Masterplan-Showcase · Turunç Marmaris",
    rivieraTitle: "ORKA RIVIERA · 64 Freistehende Luxusvillen",
    rivieraSubtitle: "Umgeben von kristallklarem Meer und duftenden Pinienwäldern",
    rivieraPrice: "$900,000 USD – $1,200,000 USD",
    rivieraDesc:
      "Auf der unberührten Halbinsel Turunç gelegen, umfasst ORKA Riviera 64 freistehende Luxusvillen ($900,000 – $1,200,000 USD). Jede Villa verfügt über einen privaten Pool, Smart-Home-Technologie, 5-Sterne-Hotel-Concierge, privaten Strandzugang und Eignung für die Türkische Staatsbürgerschaft ($400K USD).",
    summaryTab: "Projektübersicht",
    communityTab: "Resort-Highlights",
    lifestyleTab: "Lifestyle & Prestige",
    amenitiesTab: "Ausstattung",
    investmentTab: "Investitionsvorteile",
    executiveTag: "Corporate Governance & Integrität",
    executiveTitle: "Executive Professionalität & Weltklasse-Beratung",
    executiveSubtitle: "Souveräne Integrität, juristische Exzellenz und Hingabe für internationale Investoren",
    featuredConsultants: "Offizielle Berater",
    highlightsLabel: "Executive Highlights",
    formTag: "Direkter Bauträgerkontakt",
    formTitle: "Broschüre & Preisliste anfordern",
    formSubtitle: "Erhalten Sie Grundrisse, Wertgutachten und Terminvorschläge für private Besichtigungen.",
    nameLabel: "Vollständiger Name *",
    emailLabel: "E-Mail-Adresse *",
    phoneLabel: "Telefon / WhatsApp *",
    propertyPrefLabel: "Bevorzugtes Objekt",
    messageLabel: "Ihre Anfrage / Notizen",
    submitBtn: "Anfrage Absenden",
    qrModalTitle: "ORKA HOMES Offizielles QR-Portal",
    qrModalSubtitle: "Direkter Zugang zu orkahomes.vercel.app",
    qrModalInstruction: "Scannen Sie mit Ihrer Smartphone-Kamera, um direkt auf unser Immobilienportal zuzugreifen.",
    closeBtn: "Schließen",
  },
};

/* -------------------------------------------------------------------------- */
/*                              CONSULTANT DATA                               */
/* -------------------------------------------------------------------------- */
type ConsultantItem = {
  id: string;
  name: string;
  role: string;
  image: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsappLink: string;
  callLink: string;
  languages: { label: string; flag: string }[];
  descEn: string;
  descTr: string;
  descRu: string;
  descDe: string;
  hotlineNoteEn?: string;
  hotlineNoteTr?: string;
  hotlineNoteRu?: string;
  hotlineNoteDe?: string;
};

const CONSULTANTS: ConsultantItem[] = [
  {
    id: "jaleh",
    name: "Mrs. Jaleh Gharachorloo",
    role: "Official Representative & Consultant",
    image: IMAGES.jaleh,
    phoneDisplay: "+90 551 394 44 59",
    phoneRaw: "+905513944459",
    whatsappLink: "https://wa.me/905513944459",
    callLink: "tel:+905513944459",
    languages: [
      { label: "English", flag: "🇬🇧" },
      { label: "Farsi / فارسی", flag: "🇮🇷" },
    ],
    descEn:
      "Official Senior Representative specializing in international luxury buyers, ORKA Riviera 64 villa masterplan presentations, high-yield Turkish property portfolios, and fast-track Turkish Citizenship by Investment legal processing. Fluently speaks English and Farsi.",
    descTr:
      "Uluslararası lüks konut alıcıları, ORKA Riviera 64 villa masterplan sunumları, yüksek getirili Türk gayrimenkul portföyleri ve Yatırım Yoluyla Türk Vatandaşlığı süreçlerinde uzman kıdemli resmi temsilci. İngilizce ve Farsça dillerini akıcı olarak konuşmaktadır.",
    descRu:
      "Официальный старший представитель, специализирующийся на работе с международными инвесторами, презентациях 64 вилл ORKA Riviera, высокодоходных портфелях и ускоренном оформлении гражданства Турции. Свободно владеет английским и фарси.",
    descDe:
      "Offizielle Senior-Repräsentantin, spezialisiert auf internationale Luxuskäufer, ORKA Riviera 64-Villen-Masterplan-Präsentationen, renditestarke Portfolios und die Türkische Staatsbürgerschaft durch Investition. Spricht fließend Englisch und Farsi.",
  },
  {
    id: "shahab",
    name: "Mr. Shahab Parvin",
    role: "Official Representative & Exclusive Consultant",
    image: IMAGES.shahab,
    phoneDisplay: "+90 535 279 51 76",
    phoneRaw: "+905352795176",
    whatsappLink: "https://wa.me/905352795176",
    callLink: "tel:+905352795176",
    languages: [
      { label: "English", flag: "🇬🇧" },
      { label: "Spanish / Español", flag: "🇪🇸" },
      { label: "Farsi / فارسی", flag: "🇮🇷" },
    ],
    descEn:
      "Senior Partner and Official Representative for ORKA HOMES Properties. Specialized in high-net-worth international investors across Europe, Middle East, and Latin America. End-to-end guidance for $400,000 USD Turkish Citizenship, Riviera villa acquisitions, and developer direct price negotiations. Fluently speaks English, Spanish, and Farsi.",
    descTr:
      "ORKA HOMES Kıdemli Ortağı ve Resmi Temsilcisi. Avrupa, Orta Doğu ve Latin Amerika'daki yüksek profilli uluslararası yatırımcılar konusunda uzmanlaşmıştır. $400.000 USD Türk Vatandaşlığı, Riviera villa alımları ve doğrudan geliştirici fiyat müzakerelerinde uçtan uca rehberlik sağlar. İngilizce, İspanyolca ve Farsça dillerini akıcı olarak konuşmaktadır.",
    descRu:
      "Старший партнер и официальный представитель ORKA HOMES. Эксперт по работе с инвесторами из Европы, Ближнего Востока и Латинской Америки. Полное сопровождение инвестиций от $400 000 USD на гражданство Турции и прямые переговоры с застройщиком. Свободно говорит на английском, испанском и фарси.",
    descDe:
      "Senior Partner und offizieller Repräsentant für ORKA HOMES Immobilien. Spezialisiert auf vermögende internationale Investoren in Europa, dem Nahen Osten und Lateinamerika. Begleitung bei der Türkischen Staatsbürgerschaft ($400.000 USD), Villenkäufen und Bauträgerverhandlungen. Fließend in Englisch, Spanisch und Farsi.",
  },
  {
    id: "fatih",
    name: "Mr. Fatih Durmuş",
    role: "Official Representative & Exclusive Consultant",
    image: IMAGES.consultantsSuite,
    phoneDisplay: "+90 545 799 78 34",
    phoneRaw: "+905457997834",
    whatsappLink: "https://wa.me/905457997834",
    callLink: "tel:+905457997834",
    languages: [
      { label: "Turkish / Türkçe", flag: "🇹🇷" },
      { label: "English", flag: "🇬🇧" },
      { label: "Russian / Русский", flag: "🇷🇺" },
    ],
    descEn:
      "Official Real Estate Professional Consultant for ORKA HOMES and also Doctor and Founder of KARIA HEALTH Therapies. Specialized in client advisory for European, Russian, and international investors, Marmaris & Riviera luxury property tours, Zafer city center residences, and seamless developer contract processing. Fluently speaks Turkish, English, and Russian.",
    descTr:
      "ORKA HOMES Resmi Gayrimenkul Danışmanı, Hekim ve KARIA HEALTH Therapies Kurucusu. Avrupalı, Rus ve uluslararası yatırımcılara danışmanlık, Marmaris & Riviera lüks gayrimenkul keşif turları, Zafer şehir merkezi rezidansları ve sözleşme süreçlerinde uzmanlaşmıştır. Türkçe, İngilizce ve Rusça dillerini akıcı konuşmaktadır.",
    descRu:
      "Официальный консультант по недвижимости ORKA HOMES, а также врач и основатель KARIA HEALTH Therapies. Специализируется на европейских, российских и международных инвесторах, VIP-турах по побережью Мармариса и юридическом оформлении контрактов. Свободно говорит на турецком, английском и русском.",
    descDe:
      "Offizieller Immobilienberater für ORKA HOMES sowie Arzt und Gründer von KARIA HEALTH Therapies. Spezialisiert auf europäische, russische und internationale Investoren, Luxus-Besichtigungstouren in Marmaris & der Riviera und Vertragsabwicklungen. Spricht fließend Türkisch, Englisch und Russisch.",
    hotlineNoteEn:
      "Official Developer Direct Hotline for ORKA HOMES luxury Riviera resort villas, İçmeler triplex collection, Zafer city residences, and fast-track Turkish Citizenship process.",
    hotlineNoteTr:
      "ORKA HOMES lüks Riviera tatil villaları, İçmeler tripleks koleksiyonu, Zafer şehir rezidansları ve hızlı Türk Vatandaşlığı süreci için resmi geliştirici doğrudan danışma hattı.",
    hotlineNoteRu:
      "Прямая горячая линия застройщика по виллам ORKA Riviera, триплексам в Ичмелере, городским резиденциям Зафер и быстрому получению гражданства Турции.",
    hotlineNoteDe:
      "Offizielle Bauträger-Hotline für ORKA HOMES Riviera-Resort-Villen, İçmeler-Triplex-Kollektion, Zafer-Stadtresidenzen und das Türkische Staatsbürgerschafts-Verfahren.",
  },
];

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */
export default function OrkaHomesPage() {
  const { locale, setLocale } = useLocale();
  const t = I18N[locale] || I18N.en;

  // Video State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Riviera Tab State
  const [rivieraActiveTab, setRivieraActiveTab] = useState<"summary" | "community" | "lifestyle" | "amenities" | "investment">("summary");

  // QR Modal State
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Fullscreen Image Lightbox Modal State
  const [fullscreenImage, setFullscreenImage] = useState<{
    src: string;
    alt: string;
    title?: string;
  } | null>(null);

  // Close fullscreen image on Escape key
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

  // Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formProp, setFormProp] = useState("ORKA Riviera 64 Luxury Villas (Turunç)");
  const [formMsg, setFormMsg] = useState("");

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Consultation Request Received", {
      description: `Thank you ${formName}. An official ORKA HOMES senior consultant will contact you via WhatsApp / Phone within 2 hours.`,
    });
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormMsg("");
  };

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      {/* ==================================================================== */}
      {/* 1. FULLSCREEN BACKGROUND VIDEO HERO (UNOBSTRUCTED & CRISP)           */}
      {/* ==================================================================== */}
      <section className="relative w-full h-[75vh] md:h-[90vh] bg-black overflow-hidden select-none">
        <video
          ref={videoRef}
          src={IMAGES.heroVideo}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        />

        {/* Small, Elegant Transparent Speaker Icon on Bottom Right Edge */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute Video" : "Mute Video"}
          className="absolute bottom-6 right-6 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-[#d4af37]/60 hover:border-[#d4af37] text-[#f3e5ab] flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-105"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-[#e5c158]" />}
        </button>

        {/* Subtle Bottom Glow to transition cleanly to the section below */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#040f1a] to-transparent pointer-events-none" />
      </section>

      {/* ==================================================================== */}
      {/* 2. PRESTIGIOUS INTRODUCTION & OFFICIAL ACTIONS (BELOW VIDEO)        */}
      {/* ==================================================================== */}
      <section className="relative bg-[#040f1a] text-white pt-12 pb-16 border-b border-[#d4af37]/20">
        <div className="container max-w-6xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#d4af37] uppercase tracking-widest mb-6">
            <Link href="/" className="hover:underline text-white/70">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#f3e5ab] font-bold">ORKA HOMES</span>
          </nav>

          {/* Golden Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#d4af37] backdrop-blur-md text-xs font-bold uppercase tracking-widest text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)] mb-4">
            <Crown size={14} className="text-[#e5c158]" />
            {t.heroTag}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-wide text-white leading-tight mb-4">
            ORKA HOMES · <span className="font-italic text-[#d4af37] italic">Luxury Mediterranean Living</span>
          </h1>

          <p className="text-sm sm:text-base text-[#e5c158] font-medium tracking-wide uppercase max-w-3xl mb-4">
            {t.heroSubheadline}
          </p>

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-4xl font-light mb-8">
            {t.heroDesc}
          </p>

          {/* Golden Framed Official Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://orkahomes.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#040f1a] text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-[1.02] inline-flex items-center gap-2.5 border border-[#fff2b2]"
            >
              <Globe size={16} />
              {t.officialWebBtn}
              <ExternalLink size={14} />
            </a>

            <button
              onClick={() => setIsQrModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-black/60 hover:bg-black/80 text-[#f3e5ab] text-xs font-bold uppercase tracking-wider transition-all border-2 border-[#d4af37] shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] inline-flex items-center gap-2.5 hover:scale-[1.02]"
            >
              <QrCode size={16} className="text-[#d4af37]" />
              {t.scanQrBtn}
            </button>

            <a
              href="tel:+905495274085"
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all border border-white/20 hover:border-[#d4af37] inline-flex items-center gap-2.5"
            >
              <PhoneCall size={15} className="text-[#d4af37]" />
              +90 549 527 40 85 (VIP Desk)
            </a>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. OFFICIAL CONSULTANTS SECTION WITH GOLDEN FRAMES & ACTIONS        */}
      {/* ==================================================================== */}
      <section className="section bg-[#07192b] text-white py-16 md:py-24 border-b border-[#d4af37]/20 relative">
        <div className="container max-w-7xl">
          {/* Section Header */}
          <div className="max-w-3xl mb-14 text-left">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-2">
              <Sparkles size={14} /> {t.consultantsTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
              {t.consultantsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#e5c158] font-medium mt-2">
              {t.consultantsSubtitle}
            </p>
            <p className="text-xs text-white/75 mt-3 leading-relaxed font-light">
              {t.consultantsDesc}
            </p>
          </div>

          {/* Consultants 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CONSULTANTS.map((c) => {
              const description =
                locale === "tr"
                  ? c.descTr
                  : locale === "ru"
                  ? c.descRu
                  : locale === "de"
                  ? c.descDe
                  : c.descEn;

              const hotline =
                locale === "tr"
                  ? c.hotlineNoteTr
                  : locale === "ru"
                  ? c.hotlineNoteRu
                  : locale === "de"
                  ? c.hotlineNoteDe
                  : c.hotlineNoteEn;

              return (
                <div
                  key={c.id}
                  className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#0b243d] to-[#040f1a] border-2 border-[#d4af37]/70 shadow-2xl flex flex-col justify-between hover:border-[#d4af37] transition-all duration-300 group hover:-translate-y-1"
                >
                  {/* Photo with golden accent frame - Click to open fullscreen */}
                  <div
                    onClick={() =>
                      setFullscreenImage({
                        src: c.image,
                        alt: c.name,
                        title: `${c.name} — ${c.role}`,
                      })
                    }
                    className="relative h-72 sm:h-80 w-full overflow-hidden bg-black/40 border-b border-[#d4af37]/40 cursor-zoom-in group"
                    title="Click to view fullscreen"
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040f1a] via-transparent to-transparent opacity-80" />

                    {/* Fullscreen Expand indicator on hover */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-[#d4af37]/60 text-[10px] uppercase font-bold text-[#f3e5ab] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <Maximize2 size={11} className="text-[#d4af37]" />
                      Fullscreen
                    </div>

                    {/* QR Code trigger badge */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsQrModalOpen(true);
                      }}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-[#d4af37] text-[10px] uppercase font-bold text-[#f3e5ab] flex items-center gap-1.5 shadow-md hover:bg-black/90 z-10"
                    >
                      <QrCode size={12} className="text-[#d4af37]" />
                      {t.scanToConnect}
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Name & Role with Golden Headline */}
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] block mb-1">
                        {c.role}
                      </span>
                      <h3 className="font-serif text-2xl font-normal text-white mb-3">
                        {c.name}
                      </h3>

                      {/* Spoken Languages */}
                      <div className="mb-4 p-2.5 rounded-xl bg-black/40 border border-[#d4af37]/30">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37] block mb-1.5">
                          {t.spokenLanguages}:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {c.languages.map((l, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-md bg-white/10 text-white text-[11px] font-medium inline-flex items-center gap-1.5 border border-white/10"
                            >
                              <span>{l.flag}</span>
                              <span>{l.label}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Description with thin golden framed style */}
                      <div className="p-3.5 rounded-xl bg-[#040f1a]/60 border border-[#d4af37]/30 text-xs text-white/80 leading-relaxed font-light mb-3">
                        {description}
                      </div>

                      {/* Hotline note if present */}
                      {hotline && (
                        <div className="p-2.5 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/40 text-[11px] text-[#f3e5ab] leading-snug">
                          <strong>Direct Hotline:</strong> {hotline}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons with Golden Frames */}
                    <div className="space-y-2 pt-2 border-t border-[#d4af37]/30">
                      {/* Direct WhatsApp Button */}
                      <a
                        href={c.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                      >
                        <MessageCircle size={15} />
                        WhatsApp ({c.phoneDisplay})
                      </a>

                      {/* Direct Call Button */}
                      <a
                        href={c.callLink}
                        className="w-full py-2.5 px-4 rounded-xl bg-black/50 hover:bg-black/70 text-[#f3e5ab] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#d4af37] transition-all"
                      >
                        <Phone size={14} className="text-[#d4af37]" />
                        {t.callDirect}: {c.phoneDisplay}
                      </a>

                      {/* View Brochure / Portfolio Button */}
                      <button
                        onClick={() => {
                          const rivieraElem = document.getElementById("orkia-riviera-showcase");
                          rivieraElem?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 text-[11px] font-medium flex items-center justify-center gap-1.5 border border-white/15 hover:border-[#d4af37] transition-all"
                      >
                        <FileText size={13} className="text-[#d4af37]" />
                        {t.viewBrochure}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Central Executive Desk Banner */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-black/70 via-[#0b243d] to-black/70 border-2 border-[#d4af37] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 backdrop-blur-md">
            <div className="space-y-1 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] flex items-center justify-center lg:justify-start gap-2">
                <Crown size={14} /> {t.hotlineTitle}
              </span>
              <h3 className="font-serif text-2xl font-normal text-white">
                {t.hotlineSubtitle}
              </h3>
              <p className="text-xs text-white/70 max-w-2xl font-light">
                {t.hotlineDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/905495274085"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:opacity-90"
              >
                <MessageCircle size={15} />
                WhatsApp (+90 549 527 40 85)
              </a>

              <a
                href="tel:+905495274085"
                className="px-6 py-3 rounded-xl bg-black/60 border-2 border-[#d4af37] text-[#f3e5ab] text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-black"
              >
                <PhoneCall size={14} className="text-[#d4af37]" />
                Call +90 549 527 40 85
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. ORKA RIVIERA · 64 DETACHED PRIVATE LUXURY VILLAS                 */}
      {/* ==================================================================== */}
      <section
        id="orkia-riviera-showcase"
        className="section bg-[#040f1a] text-white py-16 md:py-24 border-b border-[#d4af37]/20 relative"
      >
        <div className="container max-w-7xl">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-2">
              <ShieldCheck size={14} /> {t.rivieraTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
              {t.rivieraTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#e5c158] font-medium mt-2">
              {t.rivieraSubtitle} · <span className="text-[#f3e5ab] font-bold">{t.rivieraPrice}</span>
            </p>
          </div>

          {/* Main Masterplan Card */}
          <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b243d]/80 to-[#040f1a] border-2 border-[#d4af37] shadow-2xl p-6 sm:p-10 backdrop-blur-xl mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Riviera Image Showcase with Golden Border - Click to expand */}
              <div
                onClick={() =>
                  setFullscreenImage({
                    src: IMAGES.riviera,
                    alt: "ORKA Riviera 64 Luxury Villas Turunç",
                    title: "ORKA Riviera — 64 Detached Luxury Villas (Turunç Marmaris)",
                  })
                }
                className="lg:col-span-6 rounded-2xl overflow-hidden border-2 border-[#d4af37]/70 relative group shadow-2xl cursor-zoom-in"
                title="Click to view fullscreen"
              >
                <img
                  src={IMAGES.riviera}
                  alt="ORKA Riviera 64 Luxury Villas Turunç"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Fullscreen Expand indicator on hover */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-[#d4af37] text-[10px] uppercase font-bold text-[#f3e5ab] flex items-center gap-1.5 shadow-lg group-hover:scale-105 transition-all">
                  <Maximize2 size={12} className="text-[#d4af37]" />
                  Fullscreen
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-lg bg-black/80 border border-[#d4af37] text-xs font-bold text-[#f3e5ab] uppercase tracking-wider">
                    Turunç · Marmaris
                  </span>
                  <span className="px-3.5 py-1.5 rounded-lg bg-[#d4af37] text-[#040f1a] text-xs font-bold uppercase tracking-wider shadow-lg">
                    $900,000 – $1,200,000 USD
                  </span>
                </div>
              </div>

              {/* Riviera Core Overview */}
              <div className="lg:col-span-6 space-y-6">
                <div className="p-5 rounded-2xl bg-black/40 border border-[#d4af37]/40">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#d4af37] block mb-2">
                    Masterplan Architectural Narrative
                  </span>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
                    {t.rivieraDesc}
                  </p>
                </div>

                {/* Key Metric Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-[#d4af37]/30 text-center">
                    <span className="text-lg font-serif text-[#f3e5ab] font-bold block">64</span>
                    <span className="text-[10px] text-white/70 uppercase tracking-wider">Detached Villas</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-[#d4af37]/30 text-center">
                    <span className="text-lg font-serif text-[#f3e5ab] font-bold block">12</span>
                    <span className="text-[10px] text-white/70 uppercase tracking-wider">Villa Models</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-[#d4af37]/30 text-center">
                    <span className="text-lg font-serif text-[#f3e5ab] font-bold block">$400K</span>
                    <span className="text-[10px] text-white/70 uppercase tracking-wider">Citizenship Ready</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-[#d4af37]/30 text-center">
                    <span className="text-lg font-serif text-[#f3e5ab] font-bold block">5-Star</span>
                    <span className="text-[10px] text-white/70 uppercase tracking-wider">Hotel Concierge</span>
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://wa.me/905513944459?text=Hello%20ORKA%20HOMES,%20I%20am%20interested%20in%20ORKA%20Riviera%2064%20Villas%20Turunç."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#040f1a] text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-2 border border-[#fff2b2]"
                  >
                    <MessageCircle size={14} /> Request Riviera Floorplans &amp; Prices
                  </a>

                  <a
                    href="https://orkahomes.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-black/60 border border-[#d4af37] text-[#f3e5ab] text-xs font-bold uppercase tracking-wider hover:bg-black transition-all flex items-center gap-2"
                  >
                    <ExternalLink size={13} /> View on orkahomes.vercel.app
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Tabbed Breakdown (Project Summary, Community, Lifestyle, Amenities, Investment) */}
            <div className="mt-12 pt-8 border-t border-[#d4af37]/30">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { id: "summary", label: t.summaryTab, icon: Layers },
                  { id: "community", label: t.communityTab, icon: Building2 },
                  { id: "lifestyle", label: t.lifestyleTab, icon: Crown },
                  { id: "amenities", label: t.amenitiesTab, icon: Sparkles },
                  { id: "investment", label: t.investmentTab, icon: TrendingUp },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = rivieraActiveTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setRivieraActiveTab(tab.id as any)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                        isActive
                          ? "bg-[#d4af37] text-[#040f1a] border-[#fff2b2] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                          : "bg-black/40 text-white/80 border-[#d4af37]/30 hover:border-[#d4af37] hover:text-white"
                      }`}
                    >
                      <Icon size={14} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Display */}
              <div className="p-6 rounded-2xl bg-black/50 border border-[#d4af37]/40 min-h-[160px]">
                {rivieraActiveTab === "summary" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      "64 Detached Luxury Villas",
                      "12 Architectural Villa Models",
                      "Private Gated Luxury Community",
                      "Panoramic Mediterranean Sea Views",
                      "Forest Surroundings & Pure Oxygen",
                      "Premium Investment Opportunity",
                      "Contemporary Mediterranean Architecture",
                      "Private Swimming Pools for Every Villa",
                      "Landscaped Private Gardens & Parking",
                      "Winter Gardens & Large Terraces",
                      "High-End Construction & Specifications",
                      "Suitable for Turkish Citizenship ($400K USD)",
                      "ORKA Branded 5-Star Luxury Development",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-white/90">
                        <Check size={14} className="text-[#d4af37] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {rivieraActiveTab === "community" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      "64 Detached Private Villas",
                      "Multiple Custom Villa Styles",
                      "Breathtaking Mountain & Bay Views",
                      "Landscaped Roads & Street Lighting",
                      "Premium Municipal Infrastructure",
                      "Modern Sustainable Architecture",
                      "Year-Round Mediterranean Climate",
                      "Excellent High-Season Rental Demand",
                      "Luxury Holiday Destination (Turunç)",
                      "Exceptional Capital Appreciation Potential",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-white/90">
                        <Check size={14} className="text-[#d4af37] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {rivieraActiveTab === "lifestyle" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      "Authentic Mediterranean Coastal Living",
                      "Private 5-Star Resort Lifestyle",
                      "Exclusive Luxury Holiday Retreat",
                      "Year-Round Permanent Residence",
                      "High-Security Luxury Investment",
                      "International Buyer & Expat Friendly",
                      "Professional Concierge & Maid Services",
                      "Private Beach Access & Boat Mooring Access",
                      "Excellent Holiday Rental Management Program",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-white/90">
                        <Check size={14} className="text-[#d4af37] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {rivieraActiveTab === "amenities" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      "Private Swimming Pool & Sunbathing Deck",
                      "Private Landscaped Garden & Parking",
                      "Glass Winter Garden & Panoramic Terraces",
                      "Custom Designed Luxury Kitchen & Bathrooms",
                      "Sea Views & Pine Forest Mountain Views",
                      "Premium Flooring & Modern Thermal Insulation",
                      "Large Floor-to-Ceiling Glass Facades",
                      "Natural Aegean Stone Features",
                      "Grand Entrance & Open-Concept Living",
                      "High Ceilings & Designer Architectural Lighting",
                      "Outdoor Barbecue & Entertaining Lounge",
                      "Investment Grade Reinforced Construction",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-white/90">
                        <Check size={14} className="text-[#d4af37] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {rivieraActiveTab === "investment" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      "Strictly Limited Collection of Only 64 Villas",
                      "Direct ORKA Developer Pricing & Guaranteed Title",
                      "High-Growth Luxury Tourism Peninsula",
                      "Strong Capital Appreciation in Turunç Marmaris",
                      "Guaranteed High Rental Demand & Management",
                      "Guaranteed $400,000 USD Turkish Citizenship",
                      "Global High-Net-Worth International Buyer Interest",
                      "Sovereign Long-Term Generational Asset Value",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-white/90">
                        <Check size={14} className="text-[#d4af37] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. QR PORTAL & OFFICIAL WEBSITE SHOWCASE CARD                        */}
      {/* ==================================================================== */}
      <section className="section bg-[#040f1a] text-white py-16 md:py-24 border-b border-[#d4af37]/20 relative">
        <div className="container max-w-6xl">
          <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-black/80 via-[#0b243d] to-black/80 shadow-2xl p-8 sm:p-12 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Official QR Code Image - without white background or frame, image only. Click to expand */}
              <div className="md:col-span-4 flex flex-col items-center justify-center">
                <img
                  src={IMAGES.qrCode}
                  alt="ORKA HOMES Official QR Code"
                  onClick={() =>
                    setFullscreenImage({
                      src: IMAGES.qrCode,
                      alt: "ORKA HOMES Official QR Code",
                      title: "ORKA HOMES Official Portal QR Code",
                    })
                  }
                  className="w-48 h-48 sm:w-56 sm:h-56 object-contain cursor-zoom-in hover:scale-105 transition-transform duration-300"
                  title="Click to view fullscreen"
                />
                <span className="text-xs font-bold text-[#f3e5ab] uppercase tracking-widest mt-3 text-center">
                  Official ORKA Portal QR
                </span>
              </div>

              {/* QR Explanation & Direct Website Link */}
              <div className="md:col-span-8 space-y-4 text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] flex items-center justify-center md:justify-start gap-2">
                  <Crown size={15} /> Instant Digital Gateway
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white">
                  Visit ORKA HOMES Official Interactive Portal
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                  Scan the QR code with your mobile camera or click below to explore our complete live portfolio, 3D villa walkthroughs, developer direct floorplans, and Turkish Citizenship eligibility checklists directly at <strong>orkahomes.vercel.app</strong>.
                </p>

                <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <a
                    href="https://orkahomes.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#040f1a] text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] hover:scale-105 inline-flex items-center gap-2.5 border border-[#fff2b2]"
                  >
                    <Globe size={16} />
                    https://orkahomes.vercel.app/
                    <ExternalLink size={14} />
                  </a>

                  <button
                    onClick={() => setIsQrModalOpen(true)}
                    className="px-6 py-4 rounded-xl bg-black/60 hover:bg-black/90 text-[#f3e5ab] text-xs font-bold uppercase tracking-wider border border-[#d4af37]/60 inline-flex items-center gap-2"
                  >
                    <Maximize2 size={15} className="text-[#d4af37]" />
                    Expand QR Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7. DEVELOPER CONSULTATION & BROCHURE REQUEST FORM                    */}
      {/* ==================================================================== */}
      <section className="section bg-[#07192b] text-white py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0b243d] to-[#040f1a] border-2 border-[#d4af37]/80 shadow-2xl backdrop-blur-md">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] flex items-center justify-center gap-2 mb-2">
                <Crown size={14} /> {t.formTag}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
                {t.formTitle}
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-2 font-light">
                {t.formSubtitle}
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#d4af37] mb-1.5">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-4 py-3 bg-black/50 border border-[#d4af37]/40 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#d4af37] mb-1.5">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 bg-black/50 border border-[#d4af37]/40 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#d4af37] mb-1.5">
                    {t.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+90 5XX XXX XX XX"
                    className="w-full px-4 py-3 bg-black/50 border border-[#d4af37]/40 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#d4af37] mb-1.5">
                    {t.propertyPrefLabel}
                  </label>
                  <select
                    value={formProp}
                    onChange={(e) => setFormProp(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-[#d4af37]/40 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option className="bg-[#040f1a]">ORKA Riviera 64 Luxury Villas (Turunç)</option>
                    <option className="bg-[#040f1a]">Orka Lotus Seafront Collection (İçmeler)</option>
                    <option className="bg-[#040f1a]">Orka Sunlife Valley Residences (Ölüdeniz / Fethiye)</option>
                    <option className="bg-[#040f1a]">Zafer City Center Residences (Marmaris)</option>
                    <option className="bg-[#040f1a]">Fast-Track Turkish Citizenship Portfolio ($400K USD)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#d4af37] mb-1.5">
                  {t.messageLabel}
                </label>
                <textarea
                  rows={3}
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  placeholder="Specify budget, desired bedroom configuration, investment timeline or questions..."
                  className="w-full px-4 py-3 bg-black/50 border border-[#d4af37]/40 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#040f1a] text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] flex items-center justify-center gap-2 border border-[#fff2b2]"
              >
                <Mail size={15} /> {t.submitBtn}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 8. QR CODE FULLSCALE MODAL (WITH PINCH-TO-ZOOM & PAN) */}
      {/* ==================================================================== */}
      <ZoomableModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        subtitle={t.qrModalTitle}
        title={t.qrModalSubtitle}
        maxWidth="max-w-md"
        className="bg-gradient-to-b from-[#0b243d] to-[#040f1a] border-2 border-[#d4af37] text-center text-white"
      >
        <div className="space-y-4">
          <div className="my-2 flex justify-center">
            <img
              src={IMAGES.qrCode}
              alt="ORKA HOMES Official QR Code"
              className="w-56 h-56 object-contain rounded-xl border border-[#d4af37]/40 shadow-xl bg-white p-2"
              title="Pinch to zoom QR code"
            />
          </div>

          <p className="text-xs text-white/80 leading-relaxed font-light">
            {t.qrModalInstruction}
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <a
              href="https://orkahomes.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#d4af37] text-[#040f1a] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
            >
              <ExternalLink size={14} /> Open orkahomes.vercel.app
            </a>

            <button
              onClick={() => setIsQrModalOpen(false)}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider"
            >
              {t.closeBtn}
            </button>
          </div>
        </div>
      </ZoomableModal>

      {/* ==================================================================== */}
      {/* 9. FULLSCREEN IMAGE LIGHTBOX POPUP (CLICK TO OPEN, CLICK TO CLOSE)   */}
      {/* ==================================================================== */}
      {fullscreenImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={fullscreenImage.alt || "Fullscreen Image"}
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 cursor-pointer select-none animate-in fade-in duration-200"
        >
          {/* Top Bar with Title & Close Action */}
          <div
            onClick={() => setFullscreenImage(null)}
            className="w-full max-w-6xl flex items-center justify-between py-2 px-4 text-white/90"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-base font-serif text-[#f3e5ab] font-medium tracking-wide">
                {fullscreenImage.title || fullscreenImage.alt}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-white/60 uppercase tracking-widest hidden sm:inline-block">
                Click image or anywhere to close
              </span>
              <button
                onClick={() => setFullscreenImage(null)}
                aria-label="Close fullscreen view"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-[#d4af37]/60 text-[#f3e5ab] flex items-center justify-center transition-all hover:scale-110 shadow-xl"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Fullscreen Image Display */}
          <div
            onClick={() => setFullscreenImage(null)}
            className="relative max-w-full max-h-[82vh] flex items-center justify-center overflow-hidden my-auto"
          >
            <img
              src={fullscreenImage.src}
              alt={fullscreenImage.alt}
              className="max-w-full max-h-[82vh] w-auto h-auto object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.95)] border border-[#d4af37]/40 hover:border-[#d4af37] transition-all duration-300"
            />
          </div>

          {/* Bottom Prompt / Hint */}
          <div
            onClick={() => setFullscreenImage(null)}
            className="py-2 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#d4af37]/40 text-[11px] text-[#f3e5ab] uppercase tracking-widest">
              <Maximize2 size={12} className="text-[#d4af37]" />
              Click anywhere to close · ESC
            </span>
          </div>
        </div>
      )}
    </PageShell>
  );
}
