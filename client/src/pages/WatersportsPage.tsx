import { useState } from "react";
import { Link } from "wouter";
import {
  Anchor,
  Award,
  CheckCircle2,
  ChevronRight,
  Compass,
  Download,
  ExternalLink,
  Flame,
  Gauge,
  Heart,
  HelpCircle,
  LifeBuoy,
  MapPin,
  Maximize2,
  MessageCircle,
  Navigation,
  Percent,
  Phone,
  PhoneCall,
  Rocket,
  Shield,
  ShieldCheck,
  Ship,
  Sparkles,
  Sun,
  Tag,
  Users,
  Waves,
  Wind,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import PageShell from "@/components/PageShell";
import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/data/content";

/* -------------------------------------------------------------------------- */
/*                                IMAGE ASSETS                                */
/* -------------------------------------------------------------------------- */
const WATERSPORTS_IMAGES = {
  heroGif: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/WATERSPORTS/jetski%20gif.gif",
  captainBulent: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/WATERSPORTS/MR.%20BULENT%20THE%20CAPTAIN.png",
  adEnglish: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/WATERSPORTS/AD%20ENGLISH%20WATERSPORTS.png",
  adTurkish: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/WATERSPORTS/AD%20TURKISH%20WATERSPORTS.png",
  jetSki2: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/WATERSPORTS/JET%20SKI%20(2).jpg",
  jetSki1: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/WATERSPORTS/JET%20SKI.jpg",
  flyFish: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/WATERSPORTS/FLY%20FISH.jpg",
  banana: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/WATERSPORTS/BANANA.jpg",
  bigMable: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/WATERSPORTS/DSC_0029-400x400.jpg",
};

const CAPTAIN_PHONE = "+90 534 693 46 35";
const CAPTAIN_PHONE_CLEAN = "+905346934635";
const WHATSAPP_BOOKING_URL = "https://wa.me/905346934635?text=Hello%20Captain%20Bulent%2C%20I%20am%20a%20guest%20at%20Orka%20Lotus%20Beach%20and%20would%20like%20to%20book%20a%20watersports%20ride%21";

/* -------------------------------------------------------------------------- */
/*                               TRANSLATIONS                                 */
/* -------------------------------------------------------------------------- */
interface WatersportsTranslations {
  badge: string;
  topSuperHeadline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroDescription: string;
  bookWhatsappBtn: string;
  callCaptainBtn: string;
  captainTitle: string;
  captainSubtitle: string;
  captainBio: string;
  captainQuote: string;
  askDiscountsTitle: string;
  askDiscountsDesc: string;
  safetyTitle: string;
  safetyDesc: string;
  weatherTitle: string;
  weatherDesc: string;
  staffTitle: string;
  staffDesc: string;
  ridesTitle: string;
  ridesSubtitle: string;
  filterAll: string;
  filterHighSpeed: string;
  filterInflatables: string;
  filterAirHydro: string;
  filterPaddleEco: string;
  filterTech: string;
  galleryTitle: string;
  gallerySubtitle: string;
  flyersTitle: string;
  flyersSubtitle: string;
  bookingFormTitle: string;
  bookingFormSubtitle: string;
  fullNameLabel: string;
  roomNumberLabel: string;
  selectRideLabel: string;
  participantsLabel: string;
  messageLabel: string;
  submitBookingBtn: string;
}

const TRANSLATIONS: Record<Locale, WatersportsTranslations> = {
  en: {
    badge: "Icon Watersport Center • Orka Lotus Beach",
    topSuperHeadline: "ICON WATERSPORTS CENTRE FOR ORKA LOTUS BEACH HOTEL",
    heroHeadline: "Water Sports Adventure Awaits in Marmaris!",
    heroSubheadline: "Experience the Ultimate Aegean Sea Adrenaline & Pure Holiday Fun",
    heroDescription:
      "Get ready for unforgettable high-speed thrills, soaring flights over crystal-clear bays, and laughing out loud with your family and friends! Led by our legendary manager Mr. Bülent (known by all as 'The Captain'), the Icon Watersport Center delivers maximum safety, top-tier watercraft, and heart-pumping fun right off the Orka Lotus Beach pier.",
    bookWhatsappBtn: "Book on WhatsApp (+90 534 693 46 35)",
    callCaptainBtn: "Call Captain Bülent",
    captainTitle: "Meet Mr. Bülent — 'The Captain'",
    captainSubtitle: "Founder & Operations Director of Icon Watersports",
    captainBio:
      "Mr. Bülent, universally celebrated by guests and staff as 'The Captain', has dedicated his life to creating the most exhilarating, safe, and joy-filled watersport adventures for all Orka Lotus Beach visitors. With decades of Aegean maritime mastery, Captain Bülent and his licensed safety crew ensure every guest leaves with massive smiles, epic vacation memories, and unmatched adrenaline.",
    captainQuote:
      "\"Our mission is simple: To give you and your loved ones the most thrilling, joyful, and safest watersports experience of your lifetime in our turquoise waters! Adventure awaits!\"",
    askDiscountsTitle: "ASK FOR COMBO DISCOUNTS!",
    askDiscountsDesc: "Bundle 2 or more watersports rides together (e.g. Parasailing + Jet Ski + Banana) to unlock exclusive multi-ride group & family discounts!",
    safetyTitle: "Safety Equipment Included",
    safetyDesc: "Every ride includes high-buoyancy CE-certified life vests, impact safety gear, and complete pre-ride professional safety briefings.",
    weatherTitle: "Weather & Sea Permitting",
    weatherDesc: "All marine activities operate strictly within optimal sea and wind conditions monitored hourly by certified nautical captains.",
    staffTitle: "Highly Experienced Staff",
    staffDesc: "Operated by licensed speed boat pilots, certified hydroflight masters, and professional maritime safety rescue lifeguards.",
    ridesTitle: "Explore All 19 Watersport Attractions",
    ridesSubtitle: "From adrenaline-packed supersonic towables to relaxing paddle adventures, find your perfect sea excitement!",
    filterAll: "All Rides (19)",
    filterHighSpeed: "High Speed & Jet Skis",
    filterInflatables: "Inflatable Thrills",
    filterAirHydro: "Air & Hydro Flight",
    filterPaddleEco: "Paddle & Scenic",
    filterTech: "Luxury Sea Tech",
    galleryTitle: "Action Gallery & Live Ocean Thrills",
    gallerySubtitle: "High-adrenaline snapshots of guest excitement and watercraft on the azure Orka Lotus shoreline.",
    flyersTitle: "Official Watersports Flyers & Price Guides",
    flyersSubtitle: "View and zoom our official English and Turkish advertising posters with full ride lists.",
    bookingFormTitle: "Book Your Watersports Ride Today",
    bookingFormSubtitle: "Send a direct reservation request to Captain Bülent and receive instant priority scheduling on the beach pier.",
    fullNameLabel: "Full Name",
    roomNumberLabel: "Room / Suite Number",
    selectRideLabel: "Select Your Favorite Watersport",
    participantsLabel: "Number of Guests / Riders",
    messageLabel: "Special Requests or Preferred Time",
    submitBookingBtn: "Send WhatsApp Booking to Captain Bülent",
  },
  tr: {
    badge: "Icon Su Sporları Merkezi • Orka Lotus Beach",
    topSuperHeadline: "ORKA LOTUS BEACH HOTEL İÇİN ICON SU SPORLARI MERKEZİ",
    heroHeadline: "Marmaris'te Su Sporları Macerası Sizi Bekliyor!",
    heroSubheadline: "Ege Denizi'nin Eşsiz Adrenalinini ve Eğlencesini Doyasıya Yaşayın",
    heroDescription:
      "Turkuaz koylarda yüksek hızın, masmavi gökyüzünde süzülmenin ve sevdiklerinizle kahkaha dolu anların tadını çıkarın! 'Kaptan' olarak tanınan tecrübeli yöneticimiz Bülent Bey liderliğindeki Icon Su Sporları Merkezi; en yüksek güvenlik standartları, son model deniz araçları ve sınırsız heyecanı Orka Lotus Beach iskelesinde sizlerle buluşturuyor.",
    bookWhatsappBtn: "WhatsApp'tan Rezervasyon Yap (+90 534 693 46 35)",
    callCaptainBtn: "Kaptan Bülent'i Ara",
    captainTitle: "Bülent Bey — 'Kaptan' ile Tanışın",
    captainSubtitle: "Icon Su Sporları Kurucusu ve Operasyon Direktörü",
    captainBio:
      "Tüm misafirlerimizin ve ekibimizin 'Kaptan' olarak tanıdığı Bülent Bey, Orka Lotus Beach misafirlerine ve tüm tatilcilere unutulmaz, güvenli ve coşku dolu su sporları deneyimleri sunmaya adanmıştır. Ege sularındaki onlarca yıllık denizcilik tecrübesi ve lisanslı ekibiyle her sürüşü güvenli bir festival havasına dönüştürür.",
    captainQuote:
      "\"Misyonumuz çok net: Sizlere ve ailenize turkuaz sularımızda hayatınızın en heyecanlı, en eğlenceli ve en güvenli su sporları anılarını yaşatmak! Macera sizi çağırıyor!\"",
    askDiscountsTitle: "KOMBO İNDİRİMLERİNİ SORUNUZ!",
    askDiscountsDesc: "2 veya daha fazla su sporu aktivitesini birleştirin (Örn: Parasailing + Jet Ski + Ringo); özel aile ve grup paket indirimlerinden anında yararlanın!",
    safetyTitle: "Güvenlik Ekipmanları Dahildir",
    safetyDesc: "Tüm aktivitelerimizde CE sertifikalı can yelekleri, koruma ekipmanları ve profesyonel sürüş brifingi standart olarak sağlanır.",
    weatherTitle: "Hava ve Deniz Şartlarına Bağlıdır",
    weatherDesc: "Tüm deniz aktivitelerimiz, lisanslı kaptanlarımız tarafından anlık olarak izlenen en güvenli deniz ve rüzgar şartlarında icra edilir.",
    staffTitle: "Deneyimli ve Lisanslı Kadro",
    staffDesc: "Uluslararası lisanslı sürat teknesi kaptanları, cankurtaranlar ve profesyonel su sporları eğitmenleri eşliğinde hizmet verilmektedir.",
    ridesTitle: "19 Farklı Su Sporu Aktivitesini Keşfedin",
    ridesSubtitle: "Supersonik çekme botlarından sakin kano turlarına kadar tatilinize heyecan katacak tüm seçenekler!",
    filterAll: "Tüm Aktiviteler (19)",
    filterHighSpeed: "Yüksek Hız & Jet Ski",
    filterInflatables: "Şişme Bot Heyecanı",
    filterAirHydro: "Hava & Hidro Uçuş",
    filterPaddleEco: "Kürek & Manzara",
    filterTech: "Lüks Su Teknolojisi",
    galleryTitle: "Aksiyon Galerisi ve Canlı Deniz Heyecanı",
    gallerySubtitle: "Orka Lotus sahilinde çekilmiş yüksek adrenalinli anlar ve misafirlerimizin coşkulu kareleri.",
    flyersTitle: "Resmi Su Sporları Afişleri ve Fiyat Rehberi",
    flyersSubtitle: "Tüm aktiviteleri ve detayları içeren resmi Türkçe ve İngilizce reklam afişlerimizi yüksek çözünürlükte inceleyin.",
    bookingFormTitle: "Su Sporları Rezervasyonunuzu Hemen Yapın",
    bookingFormSubtitle: "Kaptan Bülent'e doğrudan rezervasyon talebinizi iletin ve sahilde sıra beklemeden yerinizi ayırtın.",
    fullNameLabel: "Ad Soyad",
    roomNumberLabel: "Oda / Süit Numarası",
    selectRideLabel: "İstediğiniz Su Sporu Aktivitesi",
    participantsLabel: "Kişi Sayısı",
    messageLabel: "Özel İstekler veya Tercih Edilen Saat",
    submitBookingBtn: "Kaptan Bülent'e WhatsApp Mesajı Gönder",
  },
  ru: {
    badge: "Центр водных видов спорта Icon • Orka Lotus Beach",
    topSuperHeadline: "ЦЕНТР ВОДНЫХ ВИДОВ СПОРТА ICON ДЛЯ ОТЕЛЯ ORKA LOTUS BEACH",
    heroHeadline: "Приключения на воде ждут вас в Мармарисе!",
    heroSubheadline: "Почувствуйте адреналин Эгейского моря и незабываемое веселье",
    heroDescription:
      "Приготовьтесь к захватывающим скоростям, полетам над кристально чистыми волнами и безудержному веселью с семьей и друзьями! Под руководством нашего легендарного менеджера Бюлента («Капитана») центр водных видов спорта Icon гарантирует максимальную безопасность, современное оборудование и невероятные эмоции прямо у пирса Orka Lotus Beach.",
    bookWhatsappBtn: "Забронировать в WhatsApp (+90 534 693 46 35)",
    callCaptainBtn: "Позвонить Капитану Бюленту",
    captainTitle: "Познакомьтесь с Бюлентом — «Капитаном»",
    captainSubtitle: "Основатель и операционный директор Icon Watersports",
    captainBio:
      "Г-н Бюлент, которого гости и команда с любовью зовут «Капитаном», посвятил себя созданию самых ярких, безопасных и радостных водных приключений для отдыхающих в Orka Lotus Beach. Многолетний морской опыт и сертифицированная команда превращают каждый заезд в настоящий праздник.",
    captainQuote:
      "\"Наша цель проста: подарить вам и вашей семье самые захватывающие, веселые и безопасные водные приключения в нашей лазурной бухте! Приключения начинаются!\"",
    askDiscountsTitle: "СПРАШИВАЙТЕ КОМБО-СКИДКИ!",
    askDiscountsDesc: "Объединяйте 2 или более аттракциона (например, Парасейлинг + Гидроцикл + Банан) и получайте эксклюзивные групповые и семейные скидки!",
    safetyTitle: "Безопасное снаряжение включено",
    safetyDesc: "Все аттракционы включают сертифицированные спасательные жилеты CE, защитную экипировку и инструктаж по технике безопасности.",
    weatherTitle: "В зависимости от погоды",
    weatherDesc: "Все выходы в море осуществляются строго при благоприятных погодных условиях под контролем капитанов.",
    staffTitle: "Опытная сертифицированная команда",
    staffDesc: "Вас обслуживают лицензированные шкиперы скоростных катеров, инструкторы и профессиональные спасатели.",
    ridesTitle: "Все 19 захватывающих водных аттракционов",
    ridesSubtitle: "От экстремальных надувных ватрушек до спокойных прогулок на каноэ и сапборде!",
    filterAll: "Все аттракционы (19)",
    filterHighSpeed: "Скорость и гидроциклы",
    filterInflatables: "Надувные аттракционы",
    filterAirHydro: "Полеты и гидрофлай",
    filterPaddleEco: "Весельные прогулки",
    filterTech: "Премиум водные гаджеты",
    galleryTitle: "Галерея ярких эмоций и драйва",
    gallerySubtitle: "Фотографии гостей и скоростных катеров на фоне живописных пейзажей Мармариса.",
    flyersTitle: "Официальные буклеты и афиши",
    flyersSubtitle: "Ознакомьтесь с нашими официальными рекламными плакатами на английском и турецком языках.",
    bookingFormTitle: "Забронируйте водные аттракционы сегодня",
    bookingFormSubtitle: "Отправьте заявку Капитану Бюленту и получите гарантированное время катания без очереди.",
    fullNameLabel: "Имя и Фамилия",
    roomNumberLabel: "Номер комнаты / виллы",
    selectRideLabel: "Выберите аттракцион",
    participantsLabel: "Количество участников",
    messageLabel: "Пожелания или удобное время",
    submitBookingBtn: "Отправить бронь в WhatsApp Капитану Бюленту",
  },
  de: {
    badge: "Icon Wassersportzentrum • Orka Lotus Beach",
    topSuperHeadline: "ICON WASSERSPORTZENTRUM FÜR DAS ORKA LOTUS BEACH HOTEL",
    heroHeadline: "Wassersport-Abenteuer pur in Marmaris!",
    heroSubheadline: "Erleben Sie ultimativen Adrenalinkick & Urlaubsspaß in der Ägäis",
    heroDescription:
      "Machen Sie sich bereit für atemberaubende Geschwindigkeiten, Flüge über kristallklarem Wasser und unvergessliche Glücksmomente mit Familie und Freunden! Unter der Leitung unseres geschätzten Managers Bülent («Der Kapitän») bietet das Icon Wassersportzentrum maximale Sicherheit, modernste Boote und Action direkt am Steg des Orka Lotus Beach.",
    bookWhatsappBtn: "Per WhatsApp Buchen (+90 534 693 46 35)",
    callCaptainBtn: "Kapitän Bülent Anrufen",
    captainTitle: "Herr Bülent — «Der Kapitän»",
    captainSubtitle: "Gründer & Leiter des Icon Wassersportzentrums",
    captainBio:
      "Herr Bülent, der von allen Gästen und Mitarbeitern respektvoll «Der Kapitän» genannt wird, widmet sich mit Leidenschaft erstklassigen, sicheren und mitreißenden Wassersporterlebnissen für alle Besucher des Orka Lotus Beach. Seine jahrzehntelange Erfahrung garantiert maximalen Spaß bei 100%iger Sicherheit.",
    captainQuote:
      "\"Unsere Mission ist ganz einfach: Ihnen und Ihren Liebsten das aufregendste, fröhlichste und sicherste Wassersporterlebnis Ihres Lebens in unseren türkisfarbenen Gewässern zu bieten!\"",
    askDiscountsTitle: "FRAGEN SIE NACH KOMBI-RABATTEN!",
    askDiscountsDesc: "Kombinieren Sie 2 oder mehr Fahrten (z.B. Parasailing + Jetski + Ringo) für exklusive Gruppen- und Familienvorteile!",
    safetyTitle: "Sicherheitsausrüstung Inklusive",
    safetyDesc: "Jede Fahrt beinhaltet CE-zertifizierte Schwimmwesten, Prallschutz und eine umfassende professionelle Sicherheitseinweisung.",
    weatherTitle: "Wetter- und Seegangabhängig",
    weatherDesc: "Alle maritimen Aktivitäten finden ausschließlich bei optimalen und sicheren Wetterbedingungen statt.",
    staffTitle: "Erfahrenes & Lizenziertes Personal",
    staffDesc: "Betreut von lizenzierten Motorbootkapitänen, Hydroflight-Instruktoren und Rettungsschwimmern.",
    ridesTitle: "Entdecken Sie alle 19 Wassersport-Attraktionen",
    ridesSubtitle: "Von rasanten Tube-Fahrten bis hin zu entspannten Kanutouren – pure Vielfalt auf dem Wasser!",
    filterAll: "Alle Aktivitäten (19)",
    filterHighSpeed: "High-Speed & Jetski",
    filterInflatables: "Aufblasbare Action-Rides",
    filterAirHydro: "Flug & Hydro-Action",
    filterPaddleEco: "Paddeln & Natur",
    filterTech: "High-Tech Wassersport",
    galleryTitle: "Action-Galerie & Wassersport-Impressionen",
    gallerySubtitle: "Spektakuläre Aufnahmen unserer Fahrten und glücklicher Gäste am Orka Lotus Strand.",
    flyersTitle: "Offizielle Flyer & Preisübersichten",
    flyersSubtitle: "Sehen Sie sich unsere offiziellen Plakate auf Englisch und Türkisch im Großformat an.",
    bookingFormTitle: "Jetzt Wassersport-Fahrt Buchen",
    bookingFormSubtitle: "Senden Sie Ihre Buchungsanfrage direkt an Kapitän Bülent für sofortige Reservierung.",
    fullNameLabel: "Vollständiger Name",
    roomNumberLabel: "Zimmer- / Suiten-Nummer",
    selectRideLabel: "Wassersportart Auswählen",
    participantsLabel: "Anzahl Personen",
    messageLabel: "Besondere Wünsche oder Uhrzeit",
    submitBookingBtn: "WhatsApp-Buchung an Kapitän Bülent Senden",
  },
};

/* -------------------------------------------------------------------------- */
/*                        19 WATERSPORTS ACTIVITIES ROSTER                    */
/* -------------------------------------------------------------------------- */
interface RideItem {
  id: string;
  name: string;
  category: "highspeed" | "inflatable" | "airhydro" | "paddle" | "tech";
  categoryLabel: string;
  tagline: string;
  thrillLevel: "Extreme" | "High" | "Family Fun" | "Moderate" | "Relaxing";
  capacity: string;
  speed: string;
  description: string;
  highlights: string[];
  icon: string;
  featured?: boolean;
}

const WATERSPORTS_ROSTER: RideItem[] = [
  {
    id: "speed-boat",
    name: "SPEED BOAT",
    category: "highspeed",
    categoryLabel: "High Speed Marine",
    tagline: "Supersonic Coastal Tour & Adrenaline Waves",
    thrillLevel: "Extreme",
    capacity: "Up to 8 Riders",
    speed: "55+ Knots (100 km/h)",
    description:
      "Hold on tight as our high-powered twin-engine speed boat rips across the turquoise waters of Marmaris Bay, cutting sharp turns and pulling massive spray wakes.",
    highlights: ["Twin High-Horsepower Engines", "Marmaris Coastal Panoramic Tour", "Wave Jumping & High-G Turns", "Captain-Driven"],
    icon: "Ship",
    featured: true,
  },
  {
    id: "jetski",
    name: "JETSKI",
    category: "highspeed",
    categoryLabel: "High Speed Marine",
    tagline: "Pure Yamaha & Sea-Doo Horsepower Unleashed",
    thrillLevel: "Extreme",
    capacity: "1 - 2 Riders",
    speed: "Up to 85 km/h",
    description:
      "Take command of state-of-the-art jet skis. Experience lightning-fast acceleration, agile carving, and adrenaline-pumping speed across the open sea.",
    highlights: ["Latest Yamaha WaveRunner / Sea-Doo", "Single or Tandem Rides", "Designated Open Water Safety Circuit", "Instant Throttle Rush"],
    icon: "Gauge",
    featured: true,
  },
  {
    id: "parasailing",
    name: "PARASAILING",
    category: "airhydro",
    categoryLabel: "Air & Hydro Flight",
    tagline: "Breathtaking 150m Bird's-Eye Flight Over Marmaris",
    thrillLevel: "High",
    capacity: "Single, Double & Triple",
    speed: "Smooth Aerial Cruise",
    description:
      "Soar high into the sky on a high-tech parachute winch boat. Enjoy 360-degree breathtaking panoramic views of pine-clad mountains, turquoise bays, and Orka Lotus Beach.",
    highlights: ["Smooth Hydraulic Winch Launch & Landing", "Single, Tandem or Triple Harnesses", "Optional Fun Sea-Dip Touch", "HD GoPro Video Available"],
    icon: "Wind",
    featured: true,
  },
  {
    id: "fly-fish",
    name: "FLY FISH",
    category: "inflatable",
    categoryLabel: "Inflatable Thrills",
    tagline: "Airborne Aerodynamic Wave Flight",
    thrillLevel: "Extreme",
    capacity: "2 - 6 Riders",
    speed: "High Speed Flight",
    description:
      "A thrilling aerodynamic inflatable that catches sea winds and literally lifts off the water into the air! Battle gravity as you glide meters above the waves.",
    highlights: ["True Airborne Flight Sensation", "Aerodynamic Wing Shape", "Ultimate Group Laughter & Scream", "Safety Padded Handles"],
    icon: "Rocket",
    featured: true,
  },
  {
    id: "banana",
    name: "BANANA",
    category: "inflatable",
    categoryLabel: "Inflatable Thrills",
    tagline: "The World's Favorite Group Water Rodeo",
    thrillLevel: "Family Fun",
    capacity: "4 - 10 Riders",
    speed: "Moderate to Fast",
    description:
      "The classic family and group sea ride! Bounce over ocean wakes with your friends and family as the captain pulls you through exhilarating turns.",
    highlights: ["Great for All Ages & Families", "Synchronized Lean-Into-Turn Fun", "Refreshing Warm Sea Splashes", "Group Bonding Perfection"],
    icon: "Users",
    featured: true,
  },
  {
    id: "ringo",
    name: "RINGO",
    category: "inflatable",
    categoryLabel: "Inflatable Thrills",
    tagline: "Spinning Donut Speed Mania",
    thrillLevel: "Extreme",
    capacity: "1 - 3 Riders",
    speed: "High Speed Spin",
    description:
      "Sit in our hydrodynamic donut tubes as the speed boat slingshots you across the boat's wake with high-G centrifugal spins and wild bounces.",
    highlights: ["High Centrifugal Spin Force", "Solo or Multi-Tube Battles", "Extreme Low-to-Water Speed Perspective", "Maximum Adrenaline Rush"],
    icon: "Flame",
    featured: true,
  },
  {
    id: "big-mable",
    name: "BIG MABLE",
    category: "inflatable",
    categoryLabel: "Inflatable Thrills",
    tagline: "Couch-Style High-Speed Wave Bouncer",
    thrillLevel: "High",
    capacity: "2 - 4 Riders",
    speed: "Fast & Bouncy",
    description:
      "Sit comfortably with backrests on the famous Big Mable couch tube while getting slingshotted into massive airborne wave leaps and sweeping wake crossings.",
    highlights: ["Plush Supportive Backrests", "Forward or Chariot Rear Riding Modes", "Massive Wave Slingshot Fun", "Super Stable Yet Insanely Fun"],
    icon: "Sparkles",
    featured: true,
  },
  {
    id: "airstream",
    name: "AIRSTREAM",
    category: "inflatable",
    categoryLabel: "Inflatable Thrills",
    tagline: "Low-Profile Aerodynamic Water Rocket",
    thrillLevel: "Extreme",
    capacity: "2 - 4 Riders",
    speed: "Supersonic Glide",
    description:
      "Lie down on your stomach, hold on tight, and feel what it's like to glide just centimeters above the surface of the sea as the boat accelerates to top speeds.",
    highlights: ["Prone Lying Riding Position", "Unmatched Velocity Sensation", "Aerodynamic Winglets for Smooth Air", "Ultra-Grip Neoprene Knuckle Guards"],
    icon: "Zap",
  },
  {
    id: "matrix",
    name: "MATRIX",
    category: "inflatable",
    categoryLabel: "Inflatable Thrills",
    tagline: "Multi-Rider Water Glider & S-Turns",
    thrillLevel: "High",
    capacity: "3 - 6 Riders",
    speed: "High Speed",
    description:
      "A wide-deck inflatable engineered for multi-rider thrills. Handles turbulent wakes with stability while offering thrilling whip-like turns across the water.",
    highlights: ["Wide Multi-Person Platform", "Smooth Wave Transitions", "Great for Teens and Groups", "Reinforced Tow Points"],
    icon: "Waves",
  },
  {
    id: "tornado",
    name: "TORNADO",
    category: "inflatable",
    categoryLabel: "Inflatable Thrills",
    tagline: "360-Degree Rotating Sea Carousel",
    thrillLevel: "Extreme",
    capacity: "4 - 8 Riders",
    speed: "High Speed Whirlpool",
    description:
      "A circular towable that rotates and spins around its central axis as the boat pulls it across the waves, creating a thrilling dizzying sea vortex ride.",
    highlights: ["Continuous 360-Degree Rotation", "Centrifugal G-Forces", "Group Circle Face-to-Face Setup", "Unstoppable Laughter"],
    icon: "Navigation",
  },
  {
    id: "popparazzi",
    name: "POPPARAZZI",
    category: "inflatable",
    categoryLabel: "Inflatable Thrills",
    tagline: "Multi-Position Stand, Kneel or Lie Towable",
    thrillLevel: "High",
    capacity: "2 - 3 Riders",
    speed: "Fast & Agile",
    description:
      "Unique multi-tier riding deck that allows one rider to stand like a gladiator in the back tower while others sit or kneel up front for a custom challenge.",
    highlights: ["Standing Rear Flight Deck", "Kneel or Sit Front Zone", "Customizable Riding Dynamic", "High-Tech Tow System"],
    icon: "Flame",
  },
  {
    id: "fly-board",
    name: "FLY BOARD",
    category: "airhydro",
    categoryLabel: "Air & Hydro Flight",
    tagline: "Hydro-Jet Rocket Levitation Above the Sea",
    thrillLevel: "Extreme",
    capacity: "1 Rider + Master Instructor",
    speed: "Up to 10m Flight Elevation",
    description:
      "Strap into hydro-jet boots powered by water pressure and soar like a superhero up to 10 meters above the sea. Perform spins, dolphin dives, and hover over the bay.",
    highlights: ["Certified 1-on-1 Instructor Coaching", "Intuitive Balance Learning (5-10 mins)", "Thrilling Dolphin Dives & Hovering", "Incredible Photo Opportunity"],
    icon: "Rocket",
    featured: true,
  },
  {
    id: "seabob",
    name: "SEABOB",
    category: "tech",
    categoryLabel: "Luxury Sea Tech",
    tagline: "The World's Most Powerful Underwater & Surface Jet",
    thrillLevel: "Moderate",
    capacity: "1 Rider",
    speed: "20+ km/h (Surface & Sub-surface)",
    description:
      "Glide silently across the surface or dive like a dolphin beneath crystal turquoise waters with the world's most luxurious electric hydrodynamic scooter.",
    highlights: ["Silent Emission-Free E-Jet Power", "Zero-Effort Gliding & Deep Diving", "Full Digital Dashboard Display", "VIP Luxury Experience"],
    icon: "Anchor",
    featured: true,
  },
  {
    id: "waydoo",
    name: "WAYDOO (E-FOIL)",
    category: "tech",
    categoryLabel: "Luxury Sea Tech",
    tagline: "Fly Smoothly Over the Water on Electric Hydrofoils",
    thrillLevel: "High",
    capacity: "1 Rider",
    speed: "Up to 40 km/h Hydrofoil Flight",
    description:
      "Experience the sensation of pure magic as the carbon-fiber electric hydrofoil lifts the board completely out of the water, flying silently over calm swells.",
    highlights: ["Wireless Handheld Bluetooth Throttle", "Zero Drag Silent Hydrofoil Flying", "Smooth Hover Above Choppy Waters", "Future of Watersports"],
    icon: "Zap",
  },
  {
    id: "waterski",
    name: "WATERSKI",
    category: "highspeed",
    categoryLabel: "High Speed Marine",
    tagline: "Classic Double Ski & Slalom Wave Carving",
    thrillLevel: "High",
    capacity: "1 Rider",
    speed: "30 - 45 km/h",
    description:
      "Glide effortlessly across glassy early-morning seas. Whether you are a beginner learning your first deep-water start or an experienced slalom skier carving sharp spray wakes.",
    highlights: ["Beginner Twin-Skis & Pro Mono-Skis", "Professional Coaching from Boat", "Smooth Calm Bay Waters", "Precision Speed Control"],
    icon: "Waves",
  },
  {
    id: "wake-board",
    name: "WAKE BOARD",
    category: "highspeed",
    categoryLabel: "High Speed Marine",
    tagline: "Airtime, Kickers & Wake Surface Tricks",
    thrillLevel: "Extreme",
    capacity: "1 Rider",
    speed: "32 - 40 km/h",
    description:
      "Strapped into a high-performance wakeboard, launch off the boat's dual wake for huge air jumps, 180 spins, surface 360s, and stylish wave carving.",
    highlights: ["Custom Tow Rope & Extended Boom", "High-Pop Wake Design", "Bindings for All Foot Sizes", "Instruction for Beginners Available"],
    icon: "Rocket",
  },
  {
    id: "sub-board",
    name: "SUB BOARD (SUP)",
    category: "paddle",
    categoryLabel: "Paddle & Scenic",
    tagline: "Stand-Up Paddleboarding in Crystal Coves",
    thrillLevel: "Relaxing",
    capacity: "1 - 2 Persons",
    speed: "Gentle Paddle",
    description:
      "Stand Up Paddleboarding (SUP) over transparent Aegean waters. Spot marine life, explore hidden pine coves, and enjoy a peaceful morning core fitness workout.",
    highlights: ["High-Stability All-Round Boards", "Lightweight Carbon Adjustable Paddles", "Great Cardio & Balance Fitness", "Serene Pine Forest Views"],
    icon: "Sun",
  },
  {
    id: "canoe",
    name: "CANOE",
    category: "paddle",
    categoryLabel: "Paddle & Scenic",
    tagline: "Tranquil Bay Exploration & Sea Fitness",
    thrillLevel: "Relaxing",
    capacity: "1 - 2 Persons",
    speed: "Gentle Self-Paced",
    description:
      "Paddle at your own relaxed pace along the 650m Orka Lotus coastline and surrounding natural cliffs. A wonderful, peaceful sea excursion for couples and friends.",
    highlights: ["Single & Tandem Sit-on-Top Kayaks", "Ergonomic Backrests", "Safe Sheltered Waters", "Life Jackets Included"],
    icon: "Compass",
  },
  {
    id: "pedal-boat-dolphin",
    name: "PEDAL BOAT DOLPHIN",
    category: "paddle",
    categoryLabel: "Paddle & Scenic",
    tagline: "Family Sea Cruising with Built-In Fun Slide",
    thrillLevel: "Family Fun",
    capacity: "Up to 4 Persons",
    speed: "Relaxed Pedal",
    description:
      "The all-time family favorite pedal boat featuring a fun dolphin design and integrated water slide at the back for splashing directly into the crystal sea.",
    highlights: ["Built-In Rear Splash Slide", "Comfortable 4-Person Seating", "Easy-Pedal Dual Drive System", "Perfect for Kids & Parents"],
    icon: "Heart",
  },
];

/* -------------------------------------------------------------------------- */
/*                         PHOTO GALLERY HIGHLIGHTS                           */
/* -------------------------------------------------------------------------- */
const GALLERY_ITEMS = [
  {
    title: "High Speed Jet Ski Action",
    category: "Yamaha High-Output WaveRunner",
    image: WATERSPORTS_IMAGES.jetSki1,
    desc: "Unbridled acceleration and sharp carving across Marmaris Bay.",
  },
  {
    title: "Ocean Power & Speed Rides",
    category: "Adrenaline Jet Ski Excursions",
    image: WATERSPORTS_IMAGES.jetSki2,
    desc: "High-horsepower ocean racing guided by Captain Bülent's safety team.",
  },
  {
    title: "Fly Fish Extreme Air Glide",
    category: "Airborne Wave Flight",
    image: WATERSPORTS_IMAGES.flyFish,
    desc: "Catching the ocean breeze and soaring meters above the rolling sea.",
  },
  {
    title: "Banana Boat Group Rodeo",
    category: "Family & Group Towable",
    image: WATERSPORTS_IMAGES.banana,
    desc: "Non-stop laughter and wave jumping for friends and families.",
  },
  {
    title: "Big Mable Inflatable Bouncer",
    category: "Couch-Style Slingshot Ride",
    image: WATERSPORTS_IMAGES.bigMable,
    desc: "High-G wake crossing and smooth wave bouncing with deep backrests.",
  },
];

export default function WatersportsPage() {
  const { locale, setLocale } = useLocale();
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeZoomImage, setActiveZoomImage] = useState<string | null>(null);

  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    roomNumber: "",
    selectedRide: "JETSKI",
    participants: "2 Persons",
    message: "",
  });

  const filteredRides = WATERSPORTS_ROSTER.filter((ride) => {
    if (activeCategory === "all") return true;
    return ride.category === activeCategory;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedMessage = encodeURIComponent(
      `*Watersports Booking Request - Orka Lotus Beach*\n` +
      `*Guest Name:* ${bookingForm.fullName || "Valued Guest"}\n` +
      `*Room / Suite:* ${bookingForm.roomNumber || "N/A"}\n` +
      `*Selected Activity:* ${bookingForm.selectedRide}\n` +
      `*Riders / Guests:* ${bookingForm.participants}\n` +
      `*Notes / Time:* ${bookingForm.message || "Please reserve a slot for us today!"}`
    );

    window.open(`https://wa.me/905346934635?text=${encodedMessage}`, "_blank");
    toast.success("Connecting with Captain Bülent on WhatsApp...", {
      description: "Icon Watersport Centre will confirm your session immediately.",
    });
  };

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      {/* ------------------------------------------------------------------ */}
      {/*                       HERO SECTION WITH CRISP GIF                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative min-h-[640px] flex flex-col items-center justify-center overflow-hidden bg-slate-950 text-white pt-24 pb-16">
        {/* Ambient Oceanic Glow & Deep Marine Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-sky-950/40 to-slate-950 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-600/20 via-blue-900/10 to-transparent pointer-events-none" />

        {/* Dynamic Floating Oceanic Wave & Anchor Badges */}
        <div className="relative z-10 mb-3 flex items-center justify-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 shadow-[0_0_30px_rgba(6,182,212,0.6)] border border-cyan-300/60 animate-bounce">
            <Waves className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 text-cyan-300">
            <Anchor className="w-5 h-5" />
          </div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-cyan-300/80 mb-3 font-semibold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/pools-beach" className="hover:text-white transition-colors">Pools &amp; Beach</Link>
            <span>/</span>
            <span className="text-white">Watersports</span>
          </div>

          {/* Large Super Top Headline */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-600/25 border-2 border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md mb-4 shadow-sm">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>{t.topSuperHeadline}</span>
            </span>
          </div>

          {/* Clean, Sized & Filter-Free High-Action GIF on a Loop */}
          <div className="relative mx-auto mb-6 max-w-2xl w-full rounded-2xl sm:rounded-3xl overflow-hidden border-3 border-cyan-400/70 shadow-[0_12px_45px_rgba(6,182,212,0.4)] bg-slate-900 group">
            <img
              src={WATERSPORTS_IMAGES.heroGif}
              alt="High Speed Jet Ski Action Animation"
              className="w-full h-auto max-h-[320px] sm:max-h-[400px] object-contain mx-auto block"
              referrerPolicy="no-referrer"
            />
            {/* Quick Zoom Trigger */}
            <button
              onClick={() => setActiveZoomImage(WATERSPORTS_IMAGES.heroGif)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center border border-cyan-400/40 transition-all opacity-80 hover:opacity-100 shadow-md"
              aria-label="Enlarge animation"
            >
              <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
            </button>
            <div className="absolute bottom-2 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[11px] font-semibold text-cyan-300 border border-cyan-500/30">
              Live Sea Action • Icon Watersports Pier
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-white font-medium leading-tight mb-3">
            {t.heroHeadline}
          </h1>

          <p className="text-base sm:text-xl text-cyan-100/90 font-light mb-5 leading-relaxed max-w-2xl mx-auto">
            {t.heroSubheadline}
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            {t.heroDescription}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm tracking-wide shadow-[0_4px_20px_rgba(16,185,129,0.4)] transition-all duration-200 transform hover:-translate-y-0.5 border border-emerald-300/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.bookWhatsappBtn}</span>
            </a>

            <a
              href={`tel:${CAPTAIN_PHONE_CLEAN}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm tracking-wide shadow-[0_4px_20px_rgba(2,132,199,0.35)] transition-all duration-200 transform hover:-translate-y-0.5 border border-cyan-300/30"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.callCaptainBtn} ({CAPTAIN_PHONE})</span>
            </a>
          </div>

          {/* Key Trust & Safety Badges Strip */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-blue-500/30 backdrop-blur-md">
              <ShieldCheck className="w-5 h-5 text-cyan-400 mb-1.5" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">{t.safetyTitle}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{t.safetyDesc}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-blue-500/30 backdrop-blur-md">
              <Sun className="w-5 h-5 text-amber-400 mb-1.5" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">{t.weatherTitle}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{t.weatherDesc}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-blue-500/30 backdrop-blur-md">
              <Users className="w-5 h-5 text-blue-400 mb-1.5" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">{t.staffTitle}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{t.staffDesc}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-500/20 via-slate-900/90 to-red-500/20 border-2 border-amber-400/50 backdrop-blur-md">
              <Tag className="w-5 h-5 text-amber-400 mb-1.5" />
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">{t.askDiscountsTitle}</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">{t.askDiscountsDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*               MEET MR. BULENT — 'THE CAPTAIN'                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-[var(--paper)] text-[var(--ink)] border-b border-[var(--line)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Captain Bulent Portrait Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-cyan-500/40 bg-slate-900">
                <img
                  src={WATERSPORTS_IMAGES.captainBulent}
                  alt="Mr. Bülent - The Captain of Icon Watersports"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Captain Badge Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-5 text-white">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-600 text-[11px] font-bold uppercase tracking-wider mb-1 shadow-sm">
                    <Ship className="w-3.5 h-3.5" />
                    <span>The Captain • Lead Operations</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Mr. Bülent ('The Captain')</h2>
                  <p className="text-xs text-cyan-200 mt-0.5">Icon Watersport Centre • Orka Lotus Beach</p>
                </div>

                {/* Lightbox Trigger */}
                <button
                  onClick={() => setActiveZoomImage(WATERSPORTS_IMAGES.captainBulent)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                  aria-label="Enlarge image"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Direct Booking Strip with Phone */}
              <div className="mt-5 w-full max-w-md p-4 rounded-2xl bg-blue-50 dark:bg-slate-900 border-2 border-cyan-500/30 shadow-md flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Direct Pier Line</h3>
                    <p className="text-sm font-black text-blue-900 dark:text-cyan-300">{CAPTAIN_PHONE}</p>
                  </div>
                </div>

                <a
                  href={`tel:${CAPTAIN_PHONE_CLEAN}`}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                  aria-label="Call Captain Bulent"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Captain Biography & Vision Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 text-xs font-semibold tracking-wide uppercase mb-3">
                <Compass className="w-3.5 h-3.5 text-cyan-600" />
                <span>Dedicated Marine Leadership</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--ink)] leading-tight mb-4">
                {t.captainTitle}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {t.captainBio}
              </p>

              {/* Direct Quote Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-cyan-50/60 dark:from-blue-950/40 dark:to-cyan-950/30 border-l-4 border-cyan-500 shadow-sm mb-6">
                <p className="italic text-slate-800 dark:text-cyan-100 text-sm sm:text-base leading-relaxed font-medium">
                  {t.captainQuote}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-cyan-700 dark:text-cyan-400">— Mr. Bülent, Head of Icon Watersports</span>
                  <span className="flex items-center gap-1"><LifeBuoy className="w-3.5 h-3.5 text-cyan-500" /> Safe Holiday Guaranteed</span>
                </div>
              </div>

              {/* Combo Discount Promotional Callout */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-2 border-dashed border-amber-400 text-slate-900 dark:text-amber-100 flex items-start gap-3">
                <Percent className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    {t.askDiscountsTitle}
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                    {t.askDiscountsDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*              OFFICIAL ADVERTISING POSTERS & FLYERS                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        {/* Subtle Wave Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Advertising Posters</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              {t.flyersTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
              {t.flyersSubtitle}
            </p>
          </div>

          {/* Two High-Res Promotional Posters (English & Turkish) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* English Flyer Card */}
            <div className="group relative rounded-3xl overflow-hidden bg-slate-950 border-4 border-cyan-400/60 shadow-2xl transition-all duration-300 hover:border-cyan-300">
              <div className="p-3 bg-cyan-700 text-center font-bold text-xs uppercase tracking-widest text-white">
                Official English Watersports Flyer
              </div>
              <img
                src={WATERSPORTS_IMAGES.adEnglish}
                alt="English Watersports Advertising Flyer"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActiveZoomImage(WATERSPORTS_IMAGES.adEnglish)}
                className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-xs transition-opacity"
              >
                <Maximize2 className="w-5 h-5 text-cyan-300" />
                <span>Zoom &amp; Inspect Flyer</span>
              </button>
            </div>

            {/* Turkish Flyer Card */}
            <div className="group relative rounded-3xl overflow-hidden bg-slate-950 border-4 border-blue-500/60 shadow-2xl transition-all duration-300 hover:border-blue-400">
              <div className="p-3 bg-blue-700 text-center font-bold text-xs uppercase tracking-widest text-white">
                Resmi Türkçe Su Sporları Afişi
              </div>
              <img
                src={WATERSPORTS_IMAGES.adTurkish}
                alt="Turkish Watersports Advertising Flyer"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActiveZoomImage(WATERSPORTS_IMAGES.adTurkish)}
                className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-xs transition-opacity"
              >
                <Maximize2 className="w-5 h-5 text-cyan-300" />
                <span>Afişi Büyüt ve İncele</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*              19 WATERSPORTS ATTRACTIONS DIRECTORY                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-[var(--paper)] text-[var(--ink)]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Rocket className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>Full Marine Roster</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--ink)] mb-2">
              {t.ridesTitle}
            </h2>
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t.ridesSubtitle}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { id: "all", label: t.filterAll },
              { id: "highspeed", label: t.filterHighSpeed },
              { id: "inflatable", label: t.filterInflatables },
              { id: "airhydro", label: t.filterAirHydro },
              { id: "paddle", label: t.filterPaddleEco },
              { id: "tech", label: t.filterTech },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white shadow-md scale-105 border-2 border-cyan-300"
                    : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid of 19 Watersport Rides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRides.map((ride) => (
              <div
                key={ride.id}
                className="group relative rounded-3xl p-6 bg-white dark:bg-slate-900 border-2 border-blue-500/30 hover:border-cyan-400 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between"
              >
                {/* Card Top Strip */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-cyan-300 text-[11px] font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-800">
                      {ride.categoryLabel}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-500" />
                      {ride.thrillLevel}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-black text-blue-950 dark:text-white tracking-tight mb-1">
                    {ride.name}
                  </h3>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold mb-3">
                    {ride.tagline}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {ride.description}
                  </p>

                  {/* Highlights Bullet Points */}
                  <ul className="space-y-1.5 mb-5 text-[11px] text-slate-700 dark:text-slate-300">
                    {ride.highlights.map((point, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Bottom Strip */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="text-slate-500 dark:text-slate-400">
                    <span>Capacity: </span>
                    <strong className="text-slate-800 dark:text-slate-200">{ride.capacity}</strong>
                  </div>

                  <a
                    href={`https://wa.me/905346934635?text=Hello%20Captain%20Bulent%2C%20I%20want%20to%20book%20the%20${encodeURIComponent(ride.name)}%20at%20Orka%20Lotus%20Beach%21`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Book Ride</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                       ACTION PHOTO GALLERY                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Waves className="w-3.5 h-3.5" />
              <span>{t.galleryTitle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              Pure Holiday Thrills on Marmaris Waters
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              {t.gallerySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border-3 border-blue-500/40 hover:border-cyan-400 shadow-xl transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                <div className="absolute bottom-0 inset-x-0 p-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-base font-serif font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                <button
                  onClick={() => setActiveZoomImage(item.image)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Enlarge image"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*            INTERACTIVE WHATSAPP QUICK BOOKING FORM                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 bg-[var(--paper)] text-[var(--ink)] border-t border-[var(--line)]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border-3 border-cyan-500/40 shadow-2xl relative">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Instant Booking Desk</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--ink)] mb-2">
                {t.bookingFormTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {t.bookingFormSubtitle}
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    {t.fullNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Connor"
                    value={bookingForm.fullName}
                    onChange={(e) => setBookingForm({ ...bookingForm, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    {t.roomNumberLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Room 2412"
                    value={bookingForm.roomNumber}
                    onChange={(e) => setBookingForm({ ...bookingForm, roomNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    {t.selectRideLabel}
                  </label>
                  <select
                    value={bookingForm.selectedRide}
                    onChange={(e) => setBookingForm({ ...bookingForm, selectedRide: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    {WATERSPORTS_ROSTER.map((ride) => (
                      <option key={ride.id} value={ride.name}>
                        {ride.name} ({ride.categoryLabel})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    {t.participantsLabel}
                  </label>
                  <select
                    value={bookingForm.participants}
                    onChange={(e) => setBookingForm({ ...bookingForm, participants: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="1 Person (Solo)">1 Person (Solo)</option>
                    <option value="2 Persons (Couple / Pair)">2 Persons (Couple / Pair)</option>
                    <option value="3-4 Persons (Family Group)">3-4 Persons (Family Group)</option>
                    <option value="5+ Persons (Large Group)">5+ Persons (Large Group)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  {t.messageLabel}
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. We would like to ride today around 15:30. Also interested in a Combo discount for Parasailing + Jet Ski!"
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.submitBookingBtn}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                       FULL-SIZE IMAGE LIGHTBOX                     */}
      {/* ------------------------------------------------------------------ */}
      {activeZoomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveZoomImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full rounded-2xl overflow-hidden border-2 border-cyan-400/80 shadow-2xl bg-slate-950 flex flex-col items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveZoomImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/30"
              aria-label="Close zoomed view"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeZoomImage}
              alt="Enlarged Watersport Preview"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </PageShell>
  );
}
