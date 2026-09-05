import { useState } from "react";
import { Link } from "wouter";
import {
  Award,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  Crown,
  Eye,
  Globe2,
  Heart,
  Landmark,
  MapPin,
  Maximize2,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Trees,
  Users,
  X,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import ZoomableModal from "@/components/ZoomableModal";
import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/data/content";

interface LegacyContent {
  eyebrow: string;
  heroTitle: string;
  heroTitleItalic: string;
  heroDesc: string;
  officeNoteTitle: string;
  officeNoteP1: string;
  officeNoteP2: string;
  officeBadge: string;
  ourLegacyTitle: string;
  ourLegacyMotto: string;
  ourLegacyP1: string;
  chairmanMessageTag: string;
  chairmanQuote: string;
  chairmanAuthor: string;
  chairmanBio: string;
  chronologyTag: string;
  chronologyTitle: string;
  chronologySubtitle: string;
  chronologyDesc: string;
  globalReachTag: string;
  globalReachTitle: string;
  globalReachSubtitle: string;
  globalReachDesc: string;
  countriesListTitle: string;
  awardsTag: string;
  awardsTitle: string;
  awardsSubtitle: string;
  awardsDesc: string;
  pillarsTitle: string;
  contactPrompt: string;
  contactBtn: string;
  viewInfographicBtn: string;
}

const TRANSLATIONS: Record<Locale, LegacyContent> = {
  en: {
    eyebrow: "Edelstaal Group & ORKA HOMES · Global Leadership",
    heroTitle: "A Legacy of Vision,",
    heroTitleItalic: "Excellence & Trust",
    heroDesc:
      "Mr. Turgut Torunoğulları, esteemed Chairman and Founder of ORKA HOMES and the Edelstaal Group, is a distinguished business leader whose vision, integrity, and entrepreneurial excellence have shaped a remarkable legacy in real estate, construction, hospitality, and international investment across Türkiye and Europe.",
    officeNoteTitle: "Honouring a Heritage of Integrity & Craftsmanship",
    officeNoteP1:
      "It is a true privilege to represent ORKA HOMES under the leadership of the highly respected Torunoğulları family. We are sincerely honoured to contribute to an organisation founded upon professionalism, innovation, and an unwavering commitment to excellence.",
    officeNoteP2:
      "Our office is proudly located within the prestigious ORKA Lotus Beach Hotel, a five-star luxury destination in the heart of Marmaris, reflecting the exceptional standards and enduring vision established by Mr. Torunoğulları. With the utmost respect and gratitude, we proudly represent ORKA HOMES and remain dedicated to serving our clients with integrity, professionalism, and excellence.",
    officeBadge: "Official ORKA Lotus Beach Office · Marmaris",
    ourLegacyTitle: "OUR LEGACY",
    ourLegacyMotto: "Building Trust. Creating Value. Inspiring Generations.",
    ourLegacyP1:
      "For more than four decades, the Edelstaal Group and ORKA HOMES have been guided by a vision of excellence, integrity, innovation, and long-term value creation. Under the leadership of Mr. Turgut Torunoğulları, the Group has grown from an international trading enterprise into a diversified organisation with investments in luxury hospitality, real estate, construction, tourism, and international business partnerships. Today, we proudly continue this legacy by offering exceptional investment opportunities and premium properties while delivering the highest standards of professionalism and customer service.",
    chairmanMessageTag: "A Message from Our Chairman",
    chairmanQuote:
      "“Success is built on trust, vision, hard work, and creating lasting value for future generations.”",
    chairmanAuthor: "Mr. Turgut Torunoğulları, Founder & Chairman",
    chairmanBio:
      "Mr. Turgut Torunoğulları, Founder and Chairman of ORKA HOMES and the Edelstaal Group, is a distinguished entrepreneur whose leadership has shaped one of Türkiye's respected international business groups. From humble beginnings to a globally recognised organisation operating across multiple countries, his vision has inspired decades of sustainable growth, award-winning hospitality, premium real estate developments, and international partnerships.",
    chronologyTag: "CHRONOLOGY OF EXCELLENCE",
    chronologyTitle: "A Journey of Vision",
    chronologySubtitle:
      "From 1958 to Today — Over 4 Decades of Entrepreneurial Innovation & Global Milestones",
    chronologyDesc:
      "Explore the historic milestones, international expansion, and strategic hospitality breakthroughs that define the Torunoğulları family legacy.",
    globalReachTag: "INTERNATIONAL REACH",
    globalReachTitle: "Our Global Presence",
    globalReachSubtitle: "International Operations Across 3 Continents",
    globalReachDesc:
      "Our investments, strategic joint ventures, and partnerships extend across Türkiye, Europe, Asia, and the Middle East.",
    countriesListTitle: "Active Countries & Strategic Markets:",
    awardsTag: "HONOURS & DEDICATION",
    awardsTitle: "PRESTIGIOUS AWARDS",
    awardsSubtitle: "Excellence in Developments & Global Leadership",
    awardsDesc:
      "Honoured for international entrepreneurial leadership, philanthropy, and lasting economic contributions across Türkiye and Europe.",
    pillarsTitle: "Core Pillars of the Torunoğulları Vision",
    contactPrompt: "Connect with our executive ORKA HOMES consulting team directly at Orka Lotus Beach.",
    contactBtn: "Contact ORKA Homes Office",
    viewInfographicBtn: "View Full-Scale Infographic",
  },
  tr: {
    eyebrow: "Edelstaal Group & ORKA HOMES · Küresel Liderlik",
    heroTitle: "Vizyon, Mükemmellik ve",
    heroTitleItalic: "Güvenin Mirası",
    heroDesc:
      "ORKA HOMES ve Edelstaal Group'un kurucusu ve Yönetim Kurulu Başkanı Sayın Turgut Torunoğulları; vizyonu, dürüstlüğü ve girişimcilikteki üstün başarısıyla Türkiye ve Avrupa genelinde gayrimenkul, inşaat, turizm ve uluslararası yatırımlarda seçkin bir miras inşa etmiş saygın bir iş lideridir.",
    officeNoteTitle: "Dürüstlük ve Üstün Standartların Mirası",
    officeNoteP1:
      "Saygıdeğer Torunoğulları ailesinin liderliğinde ORKA HOMES'u temsil etmek bizim için büyük bir onur ve ayrıcalıktır. Profesyonellik, yenilikçilik ve mükemmelliğe olan sarsılmaz bağlılık üzerine kurulu bir kuruluşa katkıda bulunmaktan içtenlikle gurur duyuyoruz.",
    officeNoteP2:
      "Ofisimiz, Sayın Torunoğulları tarafından tesis edilen üstün standartları ve köklü vizyonu yansıtan, Marmaris'in kalbindeki 5 yıldızlı lüks destinasyon ORKA Lotus Beach Hotel bünyesinde gururla hizmet vermektedir. En derin saygı ve şükranlarımızla, ORKA HOMES'u gururla temsil ediyor; müşterilerimize dürüstlük, profesyonellik ve mükemmellikle hizmet sunmaya devam ediyoruz.",
    officeBadge: "ORKA Lotus Beach Hotel İçi Resmi Ofis · Marmaris",
    ourLegacyTitle: "MİRASIMIZ",
    ourLegacyMotto: "Güven İnşa Etmek. Değer Yaratmak. Nesillere İlham Vermek.",
    ourLegacyP1:
      "Kırk yılı aşkın süredir Edelstaal Group ve ORKA HOMES; mükemmellik, dürüstlük, inovasyon ve uzun vadeli değer yaratma vizyonuyla hareket etmektedir. Sayın Turgut Torunoğulları liderliğinde Grup, uluslararası bir ticaret girişiminden lüks otelcilik, gayrimenkul, inşaat, turizm ve uluslararası iş ortaklıklarında yatırımları olan çok yönlü bir kuruluşa dönüşmüştür. Bugün, en yüksek profesyonellik ve müşteri hizmeti standartlarını sunarken ayrıcalıklı yatırım fırsatları ve seçkin mülkler sağlayarak bu mirası gururla sürdürüyoruz.",
    chairmanMessageTag: "Yönetim Kurulu Başkanımızın Mesajı",
    chairmanQuote:
      "“Başarı; güven, vizyon, azim ve gelecek nesiller için kalıcı değer yaratmak üzerine inşa edilir.”",
    chairmanAuthor: "Sayın Turgut Torunoğulları, Kurucu ve Yönetim Kurulu Başkanı",
    chairmanBio:
      "ORKA HOMES ve Edelstaal Group'un Kurucusu ve Yönetim Kurulu Başkanı Sayın Turgut Torunoğulları, liderliğiyle Türkiye'nin en saygın uluslararası iş gruplarından birini şekillendirmiş seçkin bir girişimcidir. Mütevazı başlangıçlardan birçok ülkede faaliyet gösteren küresel ölçekte tanınan bir kuruluşa uzanan vizyonu; onlarca yıllık sürdürülebilir büyümeye, ödüllü otelciliğe, seçkin gayrimenkul projelerine ve uluslararası ortaklıklara ilham vermiştir.",
    chronologyTag: "MÜKEMMELLİK KRONOLOJİSİ",
    chronologyTitle: "Vizyon Dolu Bir Yolculuk",
    chronologySubtitle:
      "1958'den Günümüze — 4 Aşkın On Yıllık Girişimcilik Yeniliği ve Küresel Dönüm Noktaları",
    chronologyDesc:
      "Torunoğulları ailesi mirasını şekillendiren tarihi dönüm noktalarını, uluslararası yatırımları ve stratejik turizm başarılarını keşfedin.",
    globalReachTag: "ULUSLARARASI ERİŞİM",
    globalReachTitle: "Küresel Varlığımız",
    globalReachSubtitle: "3 Kıtada Uluslararası Operasyonlar",
    globalReachDesc:
      "Yatırımlarımız ve stratejik ortaklıklarımız Türkiye, Avrupa, Asya ve Orta Doğu genelinde geniş bir coğrafyaya yayılmaktadır.",
    countriesListTitle: "Faaliyet Gösterilen Ülkeler & Pazarlar:",
    awardsTag: "ONURLAR VE BAĞLILIK",
    awardsTitle: "PRESTİJLİ ÖDÜLLER",
    awardsSubtitle: "Projelerde Mükemmellik ve Küresel Liderlik",
    awardsDesc:
      "Türkiye ve Avrupa genelinde uluslararası girişimci liderlik, hayırseverlik ve kalıcı ekonomik katkılar dolayısıyla takdir edilmiş sayısız ödül.",
    pillarsTitle: "Torunoğulları Vizyonunun Temel İlkeleri",
    contactPrompt: "Orka Lotus Beach bünyesindeki ORKA HOMES danışmanlık ekibimizle doğrudan iletişime geçin.",
    contactBtn: "ORKA Homes Ofisi ile İletişime Geçin",
    viewInfographicBtn: "Tam Boy İnfografiği Görüntüle",
  },
  ru: {
    eyebrow: "Edelstaal Group & ORKA HOMES · Мировое Лидерство",
    heroTitle: "Наследие Видения,",
    heroTitleItalic: "Совершенства и Доверия",
    heroDesc:
      "Г-н Тургут Торуногуллары, уважаемый председатель и основатель ORKA HOMES и Edelstaal Group — выдающийся бизнес-лидер, чье видение, честность и предпринимательское мастерство сформировали выдающееся наследие в сфере недвижимости, строительства, гостеприимства и международных инвестиций в Турции и Европе.",
    officeNoteTitle: "Чествование наследия честности и высочайшего мастерства",
    officeNoteP1:
      "Для нас большая честь представлять ORKA HOMES под руководством глубокоуважаемой семьи Торуногуллары. Мы искренне гордимся тем, что вносим свой вклад в организацию, основанную на профессионализме, инновациях и непоколебимой приверженности совершенству.",
    officeNoteP2:
      "Наш офис с гордостью расположен в престижном пятизвездочном отеле ORKA Lotus Beach в самом сердце Мармариса, отражая исключительные стандарты и непреходящее видение г-на Торуногуллары. С глубочайшим уважением и благодарностью мы представляем ORKA HOMES и остаемся преданными служению нашим клиентам с честностью, профессионализмом и совершенством.",
    officeBadge: "Официальный офис в ORKA Lotus Beach · Мармарис",
    ourLegacyTitle: "НАШЕ НАСЛЕДИЕ",
    ourLegacyMotto: "Создавая доверие. Создавая ценность. Вдохновляя поколения.",
    ourLegacyP1:
      "Более четырех десятилетий Edelstaal Group и ORKA HOMES руководствуются принципами совершенства, честности, инноваций и долгосрочного создания ценности. Под руководством г-на Тургута Торуногуллары группа выросла из международной торговой компании в многопрофильную организацию с инвестициями в премиальное гостеприимство, недвижимость, строительство, туризм и международные партнерства. Сегодня мы с гордостью продолжаем это наследие, предлагая исключительные инвестиционные возможности и элитную недвижимость при высочайших стандартах профессионализма.",
    chairmanMessageTag: "Послание Нашего Председателя",
    chairmanQuote:
      "«Успех строится на доверии, видении, упорном труде и создании непреходящей ценности для будущих поколений.»",
    chairmanAuthor: "Г-н Тургут Торуногуллары, Основатель и Председатель",
    chairmanBio:
      "Г-н Тургут Торуногуллары, основатель и председатель ORKA HOMES и Edelstaal Group — выдающийся предприниматель, чье руководство сформировало одну из самых уважаемых международных бизнес-групп Турции. От скромного начала до всемирно признанной организации, работающей в десятках стран, его видение вдохновило десятилетия устойчивого роста, отмеченного наградами гостеприимства и элитных проектов.",
    chronologyTag: "ХРОНОЛОГИЯ СОВЕРШЕНСТВА",
    chronologyTitle: "Путь Видения",
    chronologySubtitle:
      "С 1958 года по сегодняшний день — Более 4 десятилетий предпринимательских инноваций и мировых достижений",
    chronologyDesc:
      "Ознакомьтесь с историческими вехами, международной экспансией и стратегическими достижениями в сфере гостеприимства семьи Торуногуллары.",
    globalReachTag: "МЕЖДУНАРОДНЫЙ МАСШТАБ",
    globalReachTitle: "Наше Мировое Присутствие",
    globalReachSubtitle: "Международные операции на 3 континентах",
    globalReachDesc:
      "Наши инвестиции и стратегические партнерские связи охватывают Турцию, Европу, Азию и Ближний Восток.",
    countriesListTitle: "Страны присутствия и стратегические рынки:",
    awardsTag: "НАГРАДЫ И ПРИЗНАНИЕ",
    awardsTitle: "ПРЕСТИЖНЫЕ ПРЕМИИ",
    awardsSubtitle: "Совершенство проектов и мировое лидерство",
    awardsDesc:
      "Удостоен наград за международное предпринимательское лидерство, меценатство и выдающийся вклад в экономику Турции и Европы.",
    pillarsTitle: "Ключевые столпы видения семьи Торуногуллары",
    contactPrompt: "Свяжитесь с консультационной командой ORKA HOMES прямо в отеле Orka Lotus Beach.",
    contactBtn: "Связаться с офисом ORKA Homes",
    viewInfographicBtn: "Открыть инфографику в полном размере",
  },
  de: {
    eyebrow: "Edelstaal Group & ORKA HOMES · Globale Führung",
    heroTitle: "Ein Erbe aus Vision,",
    heroTitleItalic: "Exzellenz & Vertrauen",
    heroDesc:
      "Herr Turgut Torunoğulları, geschätzter Vorstandsvorsitzender und Gründer von ORKA HOMES und der Edelstaal Group, ist eine herausragende Unternehmerpersönlichkeit, deren Vision, Integrität und unternehmerische Exzellenz ein bemerkenswertes Erbe in Immobilien, Bauwesen, Hotellerie und internationalen Investitionen in der Türkei und Europa geprägt haben.",
    officeNoteTitle: "Würdigung eines Erbes aus Integrität und Handwerkskunst",
    officeNoteP1:
      "Es ist ein wahres Privileg, ORKA HOMES unter der Führung der hochangesehenen Familie Torunoğulları zu vertreten. Wir fühlen uns aufrichtig geehrt, zu einer Organisation beizutragen, die auf Professionalität, Innovation und einem unerschütterlichen Bekenntnis zu Exzellenz gegründet ist.",
    officeNoteP2:
      "Unser Büro befindet sich mit Stolz im renommierten Fünf-Sterne-Luxushotel ORKA Lotus Beach im Herzen von Marmaris und spiegelt die außergewöhnlichen Standards und die nachhaltige Vision von Herrn Torunoğulları wider. Mit größtem Respekt und Dankbarkeit vertreten wir ORKA HOMES und widmen uns mit Integrität, Professionalität und Exzellenz unseren Kunden.",
    officeBadge: "Offizielles Büro im ORKA Lotus Beach · Marmaris",
    ourLegacyTitle: "UNSER ERBE",
    ourLegacyMotto: "Vertrauen schaffen. Werte stiften. Generationen inspirieren.",
    ourLegacyP1:
      "Seit mehr als vier Jahrzehnten lassen sich die Edelstaal Group und ORKA HOMES von einer Vision der Exzellenz, Integrität, Innovation und nachhaltigen Wertschöpfung leiten. Unter der Leitung von Herrn Turgut Torunoğulları wuchs die Gruppe von einem internationalen Handelsunternehmen zu einer diversifizierten Organisation mit Investitionen in Luxushotellerie, Immobilien, Bauwesen, Tourismus und globale Partnerschaften. Heute setzen wir dieses Erbe mit Stolz fort, indem wir erstklassige Investitionsmöglichkeiten und Immobilien nach höchsten Standards bieten.",
    chairmanMessageTag: "Botschaft unseres Vorstandsvorsitzenden",
    chairmanQuote:
      "„Erfolg basiert auf Vertrauen, Vision, harter Arbeit und der Schaffung bleibender Werte für zukünftige Generationen.“",
    chairmanAuthor: "Herr Turgut Torunoğulları, Gründer & Vorstandsvorsitzender",
    chairmanBio:
      "Herr Turgut Torunoğulları, Gründer und Vorstandsvorsitzender von ORKA HOMES und der Edelstaal Group, ist ein profilierter Unternehmer, dessen Weitblick eine der angesehensten internationalen Unternehmensgruppen der Türkei geformt hat. Von bescheidenen Anfängen bis zu einem weltweit anerkannten Konzern in zahlreichen Ländern hat seine Vision Jahrzehnte nachhaltigen Wachstums, preisgekrönter Gastfreundschaft und hochkarätiger Bauprojekte inspiriert.",
    chronologyTag: "CHRONOLOGIE DER EXZELLENZ",
    chronologyTitle: "Eine Reise der Vision",
    chronologySubtitle:
      "Von 1958 bis Heute — Über 4 Jahrzehnte unternehmerischer Innovation & globaler Meilensteine",
    chronologyDesc:
      "Entdecken Sie die historischen Meilensteine, die internationale Expansion und die strategischen Durchbrüche der Familie Torunoğulları in der Hotellerie.",
    globalReachTag: "INTERNATIONALE PRÄSENZ",
    globalReachTitle: "Globale Reichweite",
    globalReachSubtitle: "Internationale Aktivitäten auf 3 Kontinenten",
    globalReachDesc:
      "Unsere Investitionen, strategischen Partnerschaften und Niederlassungen erstrecken sich über die Türkei, Europa, Asien und den Nahen Osten.",
    countriesListTitle: "Aktive Länder & Schlüsselmärkte:",
    awardsTag: "EHRUNGEN & ANERKENNUNG",
    awardsTitle: "RENOMMIERTE AUSZEICHNUNGEN",
    awardsSubtitle: "Exzellenz bei Projekten und globale Führung",
    awardsDesc:
      "Ausgezeichnet für internationale unternehmerische Führung, Philanthropie und nachhaltige wirtschaftliche Beiträge in der Türkei und Europa.",
    pillarsTitle: "Grundsäulen der Torunoğulları-Vision",
    contactPrompt: "Kontaktieren Sie unser ORKA HOMES Beratungsteam direkt im Orka Lotus Beach Hotel.",
    contactBtn: "ORKA Homes Büro Kontaktieren",
    viewInfographicBtn: "Vollbild-Infografik anzeigen",
  },
};

const COUNTRIES = [
  { code: "TR", name: "Türkiye", flag: "🇹🇷" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "KZ", name: "Kazakhstan", flag: "🇰🇿" },
  { code: "UZ", name: "Uzbekistan", flag: "UZ" },
  { code: "AZ", name: "Azerbaijan", flag: "🇦🇿" },
  { code: "LB", name: "Lebanon", flag: "🇱🇧" },
  { code: "CN", name: "China", flag: "🇨🇳" },
];

const CORE_VALUES = [
  {
    icon: ShieldCheck,
    titleEn: "Uncompromising Integrity",
    titleTr: "Tavizsiz Dürüstlük",
    titleRu: "Бескомпромиссная честность",
    titleDe: "Kompromisslose Integrität",
    descEn: "Building enduring trust through transparency, ethical governance, and long-term investor value.",
    descTr: "Şeffaflık, etik yönetim ve uzun vadeli yatırımcı değeriyle kalıcı güven inşa etmek.",
    descRu: "Формирование прочного доверия через прозрачность, этичное управление и долгосрочную ценность.",
    descDe: "Aufbau dauerhaften Vertrauens durch Transparenz, ethische Führung und langfristigen Wertzuwachs.",
  },
  {
    icon: Crown,
    titleEn: "Architectural Excellence",
    titleTr: "Mimari Mükemmellik",
    titleRu: "Архитектурное совершенство",
    titleDe: "Architektonische Exzellenz",
    descEn: "Harmonizing contemporary luxury aesthetics with nature-integrated coastal master-planning.",
    descTr: "Çağdaş lüks estetiğini doğayla bütünleşen sahil planlamasıyla kusursuzca buluşturmak.",
    descRu: "Гармония современной роскошной эстетики с природным ландшафтным планированием.",
    descDe: "Harmonisierung zeitgenössischer Luxusästhetik mit naturverbundener Küstenplanung.",
  },
  {
    icon: Globe2,
    titleEn: "International Vision",
    titleTr: "Uluslararası Vizyon",
    titleRu: "Международное видение",
    titleDe: "Internationale Vision",
    descEn: "Extending multi-sectoral investments across Europe and Asia with premier international standards.",
    descTr: "Avrupa ve Asya genelinde üstün standartlarla çok sektörlü yatırımları hayata geçirmek.",
    descRu: "Развитие многоотраслевых инвестиций в Европе и Азии по высшим международным стандартам.",
    descDe: "Ausbau branchenübergreifender Investitionen in Europa und Asien nach höchsten internationalen Standards.",
  },
  {
    icon: Heart,
    titleEn: "Philanthropy & Community",
    titleTr: "Sosyal Sorumluluk ve Hayırseverlik",
    titleRu: "Благотворительность и общество",
    titleDe: "Philanthropie & Gemeinschaft",
    descEn: "Dedicated contributions to educational foundations, cultural heritage, and youth empowerment.",
    descTr: "Eğitim vakıflarına, kültürel mirasa ve gençlerin gelişimine yönelik köklü sosyal katkılar.",
    descRu: "Постоянный вклад в образовательные фонды, культурное наследие и развитие молодежи.",
    descDe: "Engagierte Beiträge für Bildungsstiftungen, Kulturerbe und die Förderung junger Talente.",
  },
];

export default function OrkaLegacyPage() {
  const { locale, setLocale } = useLocale();
  const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);

  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;
  const isTr = locale === "tr";

  // Dynamic language-sensitive infographics
  const legacyLandingImg =
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LEGACY/OUR%20LEGACY%20LANDING%20PAGE%20IMAGE.jpg";
  const legacyFallbackLandingImg =
    "https://github.com/ryusoi/orkalotusmanus1/raw/main/LEGACY/OUR%20LEGACY%20LANDING%20PAGE%20IMAGE.jpg";

  const ourLegacyInfographic = isTr
    ? "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LEGACY/OUR%20LEGACY%20TURKISH.jpg"
    : "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LEGACY/OUR%20LEGACY%20LANDING%20PAGE%20IMAGE.jpg";

  const timelineInfographic =
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LEGACY/LEGACY%20TIMELINE%20ENGLISH.jpg";

  const globalPresenceInfographic = isTr
    ? "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LEGACY/GLOBAL%20PRESENCE%20TURKISH.jpg"
    : "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LEGACY/GLOBAL%20PRESENCE%20ENGLISH.jpg";

  const awardsInfographic = isTr
    ? "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LEGACY/TURGUT%20AWARDS%20TURKISH.jpg"
    : "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LEGACY/TURGUT%20AWARDS%20ENGLISH.jpg";

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      {/* 1. Fullscreen Prestigious Hero Section */}
      <section className="relative w-full min-h-[90vh] md:min-h-screen flex items-end pb-16 md:pb-24 pt-28 overflow-hidden bg-[#040f1a] select-none">
        {/* Background Image - Clean & Clear without heavy filters */}
        <div className="absolute inset-0">
          <img
            src={legacyLandingImg}
            alt="Mr. Turgut Torunoğulları & ORKA Legacy"
            className="w-full h-full object-cover"
            style={{ objectPosition: "50% 12%" }}
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== legacyFallbackLandingImg) {
                target.src = legacyFallbackLandingImg;
              }
            }}
          />
          {/* Subtle bottom-only gradient to ensure text readability while keeping the photo crisp & clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040f1a]/90 via-[#040f1a]/25 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 w-full">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white/90">Executive Legacy</span>
            </div>

            {/* Golden Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/15 backdrop-blur-md border border-[#d4af37]/50 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#f3e5ab] mb-4 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
              <Sparkles size={13} className="text-[#d4af37]" />
              <span>{t.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.08] drop-shadow-xl">
              {t.heroTitle} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#e8c883] italic font-normal drop-shadow-sm">
                {t.heroTitleItalic}
              </span>
            </h1>

            {/* Golden Thin-Framed Hero Description */}
            <div className="mt-6 p-5 sm:p-7 rounded-2xl bg-[#08182b]/80 backdrop-blur-lg border border-[#d4af37]/40 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
              <p className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed font-light">
                {t.heroDesc}
              </p>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#our-legacy"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#d4af37] hover:from-[#e5c158] hover:to-[#d4af37] text-[#051321] text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] inline-flex items-center gap-2"
              >
                <Landmark size={15} /> {t.ourLegacyTitle}
              </a>
              <a
                href="#chronology"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#d4af37]/40 text-white text-xs font-bold uppercase tracking-widest transition-all inline-flex items-center gap-2"
              >
                <Compass size={15} className="text-[#d4af37]" /> {t.chronologyTitle}
              </a>
              <a
                href="#global-presence"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#d4af37]/40 text-white text-xs font-bold uppercase tracking-widest transition-all inline-flex items-center gap-2"
              >
                <Globe2 size={15} className="text-[#d4af37]" /> {t.globalReachTitle}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Representation & Prestigious Office Dedicated Frame */}
      <section className="section bg-[var(--paper)] relative overflow-hidden border-b border-[var(--line)]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[var(--shell)] to-[var(--paper)] border-2 border-[#d4af37]/50 shadow-xl overflow-hidden">
              {/* Decorative Corner Golden Filigree Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_70%)] pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#d4af37]/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37] block">
                      {t.officeBadge}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[var(--ink)] font-medium">
                      {t.officeNoteTitle}
                    </h2>
                  </div>
                </div>

                <Link
                  href="/orka-homes"
                  className="px-4 py-2 rounded-lg bg-[#d4af37]/15 hover:bg-[#d4af37] text-[var(--ink)] hover:text-[#051321] border border-[#d4af37]/40 text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>Explore ORKA HOMES</span>
                  <ChevronRight size={14} />
                </Link>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed font-light">
                <p className="border-l-2 border-[#d4af37] pl-4 sm:pl-5 text-[var(--ink)]">
                  {t.officeNoteP1}
                </p>
                <p className="border-l-2 border-[#d4af37] pl-4 sm:pl-5">
                  {t.officeNoteP2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR LEGACY: Building Trust. Creating Value. Inspiring Generations. */}
      <section id="our-legacy" className="section bg-[var(--ocean)] text-white relative">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-2">
                  <Landmark size={15} /> {t.ourLegacyTitle}
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mt-2 leading-tight">
                  Building Trust. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#e8c883] italic font-normal">
                    Creating Value. Inspiring Generations.
                  </span>
                </h2>
              </div>

              {/* Golden Framed Description */}
              <div className="p-6 sm:p-8 rounded-2xl bg-black/30 backdrop-blur-md border border-[#d4af37]/40 shadow-xl space-y-4">
                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
                  {t.ourLegacyP1}
                </p>
              </div>

              {/* Key Milestones in Numbers */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-[#d4af37]/30 text-center">
                  <span className="font-serif text-2xl sm:text-4xl text-[#d4af37] font-light block">
                    40+
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-white/70 mt-1 block">
                    Years Excellence
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-[#d4af37]/30 text-center">
                  <span className="font-serif text-2xl sm:text-4xl text-[#d4af37] font-light block">
                    13+
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-white/70 mt-1 block">
                    Global Markets
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-[#d4af37]/30 text-center">
                  <span className="font-serif text-2xl sm:text-4xl text-[#d4af37] font-light block">
                    5★
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-white/70 mt-1 block">
                    Luxury Portfolio
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Infographic / Showcase Image */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_15px_45px_rgba(0,0,0,0.6)] bg-black/40">
                <img
                  src={ourLegacyInfographic}
                  alt="Our Legacy Infographic"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs text-[#f3e5ab] font-medium">
                    {t.ourLegacyTitle} · {t.ourLegacyMotto}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setModalImage({
                        src: ourLegacyInfographic,
                        title: t.ourLegacyTitle,
                      })
                    }
                    className="p-2 rounded-lg bg-black/60 hover:bg-[#d4af37] text-white hover:text-[#051321] border border-white/20 transition-colors"
                    title={t.viewInfographicBtn}
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. A Message from Our Chairman */}
      <section className="section bg-[var(--paper)] border-b border-[var(--line)]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Golden Framed Chairman Box */}
            <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[var(--shell)] via-[var(--paper)] to-[var(--shell)] border-2 border-[#d4af37]/50 shadow-2xl">
              {/* Quote Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-6">
                <Quote size={28} />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2">
                {t.chairmanMessageTag}
              </span>

              {/* The Quote */}
              <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[var(--ink)] font-normal leading-snug tracking-tight mb-6">
                {t.chairmanQuote}
              </blockquote>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-0.5 bg-[#d4af37]" />
                <span className="text-sm sm:text-base font-serif italic text-[var(--gold)] font-medium">
                  {t.chairmanAuthor}
                </span>
              </div>

              {/* Bio Box with Golden Thin Frame */}
              <div className="p-6 rounded-2xl bg-[var(--paper)] border border-[#d4af37]/30 shadow-xs">
                <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed font-light">
                  {t.chairmanBio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CHRONOLOGY OF EXCELLENCE (From 1958 to Today) */}
      <section id="chronology" className="section bg-[var(--shell)] border-b border-[var(--line)]">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <span className="section-label">
              <span className="section-label-line" />
              {t.chronologyTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[var(--ink)] mt-2">
              {t.chronologyTitle}
            </h2>
            <p className="text-sm sm:text-base text-[var(--gold)] font-medium mt-1.5">
              {t.chronologySubtitle}
            </p>
            <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-3 leading-relaxed">
              {t.chronologyDesc}
            </p>
          </div>

          {/* Timeline Showcase Card */}
          <div className="p-4 sm:p-8 rounded-3xl bg-[var(--paper)] border-2 border-[#d4af37]/40 shadow-xl">
            <div className="relative group rounded-2xl overflow-hidden border border-[var(--line)] bg-[#040f1a]">
              <img
                src={timelineInfographic}
                alt="Chronology of Excellence Timeline"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500 cursor-zoom-in"
                onClick={() =>
                  setModalImage({
                    src: timelineInfographic,
                    title: `${t.chronologyTag} · ${t.chronologyTitle}`,
                  })
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6 pointer-events-none">
                <span className="text-xs text-[#f3e5ab] font-medium">
                  {t.chronologySubtitle}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#d4af37] text-[#051321] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                  <Maximize2 size={13} /> {t.viewInfographicBtn}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERNATIONAL REACH / Our Global Presence */}
      <section id="global-presence" className="section bg-[var(--ocean)] text-white relative">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-2">
              <Globe2 size={15} /> {t.globalReachTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mt-2">
              {t.globalReachTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#f3e5ab] font-medium mt-1.5">
              {t.globalReachSubtitle}
            </p>
            <p className="text-xs sm:text-sm text-white/80 mt-3 leading-relaxed">
              {t.globalReachDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Infographic on the left */}
            <div className="lg:col-span-7">
              <div className="relative group rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-2xl bg-black/40">
                <img
                  src={globalPresenceInfographic}
                  alt="Global Presence Infographic"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 cursor-zoom-in"
                  onClick={() =>
                    setModalImage({
                      src: globalPresenceInfographic,
                      title: `${t.globalReachTag} · ${t.globalReachTitle}`,
                    })
                  }
                />
                <div className="p-4 bg-black/60 backdrop-blur-md flex items-center justify-between border-t border-[#d4af37]/30">
                  <span className="text-xs text-[#f3e5ab] font-medium">
                    Global Operations Infographic
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setModalImage({
                        src: globalPresenceInfographic,
                        title: `${t.globalReachTag} · ${t.globalReachTitle}`,
                      })
                    }
                    className="p-2 rounded-lg bg-[#d4af37] text-[#051321] text-xs font-bold inline-flex items-center gap-1.5 hover:bg-white transition-colors"
                  >
                    <Maximize2 size={14} /> {t.viewInfographicBtn}
                  </button>
                </div>
              </div>
            </div>

            {/* Countries List Card on the right */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-[#d4af37]/40 shadow-xl">
                <h3 className="font-serif text-xl sm:text-2xl text-[#f3e5ab] font-medium mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-[#d4af37]" />
                  {t.countriesListTitle}
                </h3>

                <div className="grid grid-cols-2 gap-2.5">
                  {COUNTRIES.map((c) => (
                    <div
                      key={c.code}
                      className="p-2.5 rounded-lg bg-black/25 border border-white/10 flex items-center gap-2.5 hover:border-[#d4af37]/60 transition-colors"
                    >
                      <span className="text-lg">{c.flag}</span>
                      <span className="text-xs font-medium text-white/90">
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/15">
                  <p className="text-[11px] text-white/70 leading-relaxed italic">
                    {t.globalReachDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HONOURS & DEDICATION / PRESTIGIOUS AWARDS */}
      <section id="awards" className="section bg-[var(--paper)] border-b border-[var(--line)]">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <span className="section-label">
              <span className="section-label-line" />
              {t.awardsTag}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[var(--ink)] mt-2">
              {t.awardsTitle}
            </h2>
            <p className="text-sm sm:text-base text-[var(--gold)] font-medium mt-1.5">
              {t.awardsSubtitle}
            </p>
            <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-3 leading-relaxed">
              {t.awardsDesc}
            </p>
          </div>

          {/* Awards Showcase Infographic */}
          <div className="p-4 sm:p-8 rounded-3xl bg-[var(--shell)] border-2 border-[#d4af37]/50 shadow-2xl">
            <div className="relative group rounded-2xl overflow-hidden border border-[#d4af37]/40 bg-[#040f1a]">
              <img
                src={awardsInfographic}
                alt="Mr. Turgut Torunoğulları Prestigious Awards"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500 cursor-zoom-in"
                onClick={() =>
                  setModalImage({
                    src: awardsInfographic,
                    title: `${t.awardsTag} · ${t.awardsTitle}`,
                  })
                }
              />
              <div className="p-4 bg-gradient-to-r from-[#040f1a] to-[#0a1f33] flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#d4af37]/30">
                <span className="text-xs text-[#f3e5ab] font-medium text-center sm:text-left">
                  {t.awardsDesc}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setModalImage({
                      src: awardsInfographic,
                      title: `${t.awardsTag} · ${t.awardsTitle}`,
                    })
                  }
                  className="px-4 py-2 rounded-lg bg-[#d4af37] text-[#051321] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 hover:bg-white transition-colors self-center sm:self-auto shadow-md"
                >
                  <Maximize2 size={14} /> {t.viewInfographicBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Core Pillars of the Torunoğulları Vision */}
      <section className="section bg-[var(--shell)] border-b border-[var(--line)]">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="section-label">
              <span className="section-label-line" />
              Strategic Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[var(--ink)] mt-2">
              {t.pillarsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, idx) => {
              const Icon = val.icon;
              const title = isTr
                ? val.titleTr
                : locale === "ru"
                ? val.titleRu
                : locale === "de"
                ? val.titleDe
                : val.titleEn;
              const desc = isTr
                ? val.descTr
                : locale === "ru"
                ? val.descRu
                : locale === "de"
                ? val.descDe
                : val.descEn;

              return (
                <div
                  key={idx}
                  className="p-6 bg-[var(--paper)] border-2 border-[#d4af37]/30 hover:border-[#d4af37] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-serif text-xl font-medium text-[var(--ink)] mb-2">
                      {title}
                    </h3>
                    <p className="text-xs text-[var(--ink-soft)] leading-relaxed font-light">
                      {desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Contact / Executive Desk */}
      <section className="section bg-[var(--ocean)] text-white py-16">
        <div className="container">
          <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-black/50 via-[#07192b]/80 to-black/50 border-2 border-[#d4af37]/60 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-lg">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                ORKA HOMES Executive Desk
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                {t.contactPrompt}
              </h3>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
              <Link
                href="/orka-homes"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#d4af37] text-[#051321] text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] inline-flex items-center gap-2"
              >
                <Building2 size={15} /> {t.contactBtn}
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <Phone size={15} /> Hotel Reception (Ext: 0)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Scale Image Lightbox Modal with Pinch-to-Zoom & Pan */}
      <ZoomableModal
        isOpen={!!modalImage}
        onClose={() => setModalImage(null)}
        title={modalImage?.title || "Orka Legacy Media"}
        subtitle="Orka Heritage Gallery"
        maxWidth="max-w-4xl"
        className="bg-[#040f1a] border-2 border-[#d4af37] text-white"
      >
        {modalImage && (
          <div className="flex items-center justify-center p-2">
            <img
              src={modalImage.src}
              alt={modalImage.title}
              className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl border border-[#d4af37]/30"
            />
          </div>
        )}
      </ZoomableModal>
    </PageShell>
  );
}
