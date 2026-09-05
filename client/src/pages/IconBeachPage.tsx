import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Compass,
  Crown,
  Flame,
  Gift,
  GlassWater,
  Headphones,
  HeartHandshake,
  HelpCircle,
  Info,
  MapPin,
  Maximize2,
  MessageCircle,
  Music,
  Navigation,
  PartyPopper,
  Phone,
  PhoneCall,
  QrCode,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Ticket,
  Users,
  Utensils,
  Volume2,
  VolumeX,
  Waves,
  Wine,
  X,
  Zap,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/data/content";

/* -------------------------------------------------------------------------- */
/*                                IMAGE ASSETS                                */
/* -------------------------------------------------------------------------- */
const IMAGES = {
  heroVideo: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ICON%20VIDEOS/ICON%20VIDEO.mp4",
  logo: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ICON/ICON%20LOGO.jpg",
  entrance: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ICON/ICON%20ENTRANCE.jpg",
  party2: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ICON/ICON%20PARTY%202.png",
  partyPhoto: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ICON/Icon%20party%20photo.jpg",
  cocktails: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ICON/icon%20cocktails.jpg",
  cocktails2: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ICON/icon%20cocktails%202.jpg",
  terraceBeachfront: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ICON/icon%20terrace%20beachfront.jpg",
  swings: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ICON/ICON%20SWINGS%202.jpg",
  bottomParty: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ICON/MARMARIS%20ICON%20BEACH%20PARTY.jpeg",
  jaleh: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ORKA%20HOMES/Jaleh.png",
  shahab: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ORKA%20HOMES/Shahab%20suit%20half%20yellow%20tie.png",
};

/* -------------------------------------------------------------------------- */
/*                                TRANSLATIONS                                */
/* -------------------------------------------------------------------------- */
type IconTranslations = {
  breadcrumbHome: string;
  breadcrumbIcon: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubtitle: string;
  welcomeIntro: string;
  welcomeTagline: string;
  proximityBadge: string;
  proximityTitle: string;
  proximityDesc: string;
  freeSunbedsTitle: string;
  freeSunbedsDesc: string;
  freeBarTitle: string;
  freeBarDesc: string;
  dayExperienceTitle: string;
  dayExperienceSubtitle: string;
  hotelGuestPerksTitle: string;
  vipCabanasTitle: string;
  vipCabanasSubtitle: string;
  vipCabanasDesc: string;
  culinaryTitle: string;
  culinarySubtitle: string;
  culinaryDesc: string;
  culinaryHighlight: string;
  cocktailsTitle: string;
  cocktailsSubtitle: string;
  cocktailsDesc: string;
  musicTitle: string;
  musicSubtitle: string;
  dailyDj: string;
  tuesdayPartyTitle: string;
  tuesdayPartySubtitle: string;
  tuesdayPartyDesc: string;
  nightPartiesTitle: string;
  nightPartiesHours: string;
  doorsCloseWarning: string;
  reservationRequired: string;
  vipCardSectionTitle: string;
  vipCardSectionSubtitle: string;
  vipCardInstruction: string;
  officeLocationTitle: string;
  officeLocationDesc: string;
  consultantJaleh: string;
  consultantShahab: string;
  vipCardPerk1: string;
  vipCardPerk2: string;
  vipCardPerk3: string;
  collectCardCta: string;
  summaryTitle: string;
  summarySubtitle: string;
  closingQuote: string;
  bottomTagline: string;
  reserveWhatsapp: string;
  callDesk: string;
  openFullscreen: string;
  closeFullscreen: string;
  getVipCardBtn: string;
  viewMapBtn: string;
};

const TRANSLATIONS: Record<Locale, IconTranslations> = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbIcon: "Icon Beach",
    heroEyebrow: "WHERE SUMMER FEELS ITS BEST",
    heroHeadline: "ICON BEACH MARMARIS",
    heroSubtitle: "☀️ GOOD FOOD. BLUE WATERS. GREAT TIMES. 🍸",
    welcomeIntro:
      "Welcome to ICON BEACH — one of Marmaris’s ultimate destinations for sun, sea, incredible food, unforgettable cocktails, live music and legendary summer nights. Located right next to ORKA LOTUS BEACH HOTEL (only 50 metres along the beachfront promenade), ICON BEACH brings everything you could want from a perfect Mediterranean summer together in one spectacular beachfront experience.",
    welcomeTagline:
      "More than a beach. More than a restaurant. ICON BEACH is where summer comes alive.",
    proximityBadge: "ONLY 50 METRES FROM HOTEL",
    proximityTitle: "Direct 50-Metre Walk From Orka Lotus Beach Hotel",
    proximityDesc:
      "Stroll right along the turquoise beach shoreline just 50 metres to reach Icon Beach. Seamless beachfront proximity makes it an effortless paradise for our resort guests.",
    freeSunbedsTitle: "FREE SUNBEDS",
    freeSunbedsDesc: "Complimentary access to sun loungers for Orka Lotus Beach Hotel guests.",
    freeBarTitle: "FREE BAR FOR ALL-INCLUSIVE GUESTS",
    freeBarDesc: "Enjoy selected complimentary drinks at Icon Beach for Orka Lotus All-Inclusive guests.",
    dayExperienceTitle: "YOUR PERFECT BEACH DAY STARTS HERE",
    dayExperienceSubtitle:
      "Sink your feet into the golden sand, relax beneath the Mediterranean sun and enjoy the crystal-clear Aegean waters.",
    hotelGuestPerksTitle: "Orka Lotus Beach Hotel Guest Privileges",
    vipCabanasTitle: "PRIVATE VIP BEACH BEDS & CABANAS",
    vipCabanasSubtitle: "Exclusive Daily or Weekly Canopy Suites with Dedicated Butler Service",
    vipCabanasDesc:
      "Hire our exclusive daily or weekly beds with canopies, complete with dedicated waiter service — perfect for couples, families, groups and anyone who wants to enjoy the beach in true VIP style.",
    culinaryTitle: "TASTE THE SUMMER",
    culinarySubtitle: "Fresh Ingredients, Refined Details & Mediterranean Passion",
    culinaryDesc:
      "At ICON BEACH, every dish is crafted with fresh ingredients, refined details and a passion for unforgettable moments. From fresh seafood and delicious Mediterranean dishes to tempting desserts and expertly crafted cocktails, our special chefs create food designed to make every visit memorable.",
    culinaryHighlight:
      "From the first bite to the last sunset, every visit is more than a meal — it’s an experience. You’ll never forget these wonderful tastes! ✨",
    cocktailsTitle: "COCKTAILS • SUNSETS • GOOD TIMES",
    cocktailsSubtitle: "Where Golden Hour Meets World-Class Mixology",
    cocktailsDesc:
      "Feel the warm Mediterranean breeze, enjoy an ice-cold handcrafted cocktail and watch the sun disappear over the beautiful Marmaris coastline. Whether you're enjoying a relaxed afternoon by the sea, dinner with friends, sunset drinks or getting ready for a night of dancing... ICON BEACH is the place to be.",
    musicTitle: "LIVE MUSIC • LIVE DJ • PARTY NIGHTS",
    musicSubtitle: "EVERY DAY = GOOD VIBES 🎧",
    dailyDj: "Keep the summer energy going with live DJ entertainment every day and selected evenings featuring live acoustic music.",
    tuesdayPartyTitle: "🔥 TUESDAY NIGHTS = PARTY NIGHT 🔥",
    tuesdayPartySubtitle: "Legendary Open-Air Beach Parties with International Beats",
    tuesdayPartyDesc:
      "Get ready for an unforgettable night of music, dancing, cocktails and electric atmosphere directly on the Mediterranean shoreline.",
    nightPartiesTitle: "🌙 NIGHT PARTIES",
    nightPartiesHours: "23:30 – 04:00",
    doorsCloseWarning: "⚠️ DOORS CLOSE AT 01:00",
    reservationRequired: "📲 RESERVATION REQUIRED via WhatsApp or Instagram before the night begins.",
    vipCardSectionTitle: "YOUR VIP DISCOUNT IS WAITING!",
    vipCardSectionSubtitle: "🎟️ GET YOUR FREE ICON BEACH VIP DISCOUNT CARD",
    vipCardInstruction:
      "Want to enjoy special VIP discounts at ICON BEACH? It’s easy! Visit the ORKA HOMES office inside ORKA LOTUS BEACH HOTEL (Ground Floor • In Front of the Main Hotel Pool) and collect your free card directly.",
    officeLocationTitle: "ORKA HOMES OFFICE (Ground Floor)",
    officeLocationDesc: "Inside ORKA LOTUS BEACH HOTEL · In Front of the Main Hotel Pool",
    consultantJaleh: "Mrs. Jaleh Gharachorloo",
    consultantShahab: "Mr. Shahab Parvin",
    vipCardPerk1: "🎟️ FREE VIP DISCOUNT CARD",
    vipCardPerk2: "💎 EXCLUSIVE SPECIAL DISCOUNTS",
    vipCardPerk3: "🏖️ ICON BEACH VIP PRIVILEGES",
    collectCardCta:
      "Collect your card before heading to the beach and make your ICON BEACH experience even better!",
    summaryTitle: "SUN. SEA. FOOD. MUSIC. PARTY.",
    summarySubtitle: "YOUR SUMMER. YOUR BEACH. YOUR ICON.",
    closingQuote:
      "Come for the beach. Stay for the food. Return for the atmosphere. Remember the nights. 🌴✨",
    bottomTagline: "Good food. Blue waters. Good times. Welcome to ICON BEACH.",
    reserveWhatsapp: "WhatsApp VIP Reservation",
    callDesk: "Call Orka Desk",
    openFullscreen: "Click to view fullscreen",
    closeFullscreen: "Click anywhere or ESC to close",
    getVipCardBtn: "Get Free VIP Card",
    viewMapBtn: "How To Get There (50m Walk)",
  },
  tr: {
    breadcrumbHome: "Ana Sayfa",
    breadcrumbIcon: "Icon Beach",
    heroEyebrow: "YAZIN EN GÜZEL HİSSETTİRDİĞİ YER",
    heroHeadline: "ICON BEACH MARMARIS",
    heroSubtitle: "☀️ İYİ YEMEK. MAVİ SULAR. HARİKA ANLAR. 🍸",
    welcomeIntro:
      "Güneş, deniz, enfes yemekler, unutulmaz kokteyller, canlı müzik ve efsanevi yaz gecelerinin Marmaris'teki bir numaralı adresi ICON BEACH'e hoş geldiniz! ORKA LOTUS BEACH HOTEL'in hemen yanı başında (sahil şeridinde yalnızca 50 metre mesafede) yer alan ICON BEACH, kusursuz bir Akdeniz yazından beklediğiniz her şeyi tek bir muhteşem sahil deneyiminde bir araya getiriyor.",
    welcomeTagline:
      "Bir plajdan daha fazlası. Bir restorandan daha fazlası. ICON BEACH yazın hayat bulduğu yerdir.",
    proximityBadge: "OTELE YALNIZCA 50 METRE",
    proximityTitle: "Orka Lotus Beach Hotel'den Sadece 50 Metrelik Yürüyüş",
    proximityDesc:
      "Orka Lotus sahil koyu boyunca sadece 50 metre yürüyerek Icon Beach'e ulaşabilirsiniz. Doğrudan sahil bağlantısı, otel misafirlerimiz için benzersiz bir konfor sunar.",
    freeSunbedsTitle: "ÜCRETSİZ ŞEZLONG",
    freeSunbedsDesc: "Orka Lotus Beach Hotel misafirlerine özel ücretsiz şezlong kullanımı.",
    freeBarTitle: "HER ŞEY DÂHİL MİSAFİRLERİNE ÜCRETSİZ BAR",
    freeBarDesc: "Orka Lotus Her Şey Dâhil misafirleri için seçili ücretsiz içecek ayrıcalığı.",
    dayExperienceTitle: "KUSURSUZ PLAJ GÜNÜNÜZ BURADA BAŞLIYOR",
    dayExperienceSubtitle:
      "Ayaklarınızı altın kumlara bırakın, Akdeniz güneşinin tadını çıkarın ve masmavi berrak suların keyfini sürün.",
    hotelGuestPerksTitle: "Orka Lotus Beach Hotel Misafir Ayrıcalıkları",
    vipCabanasTitle: "ÖZEL VIP PLAJ YATAKLARI & KABANALAR",
    vipCabanasSubtitle: "Özel Garson Hizmetli Günlük veya Haftalık Gölgelikli Süitler",
    vipCabanasDesc:
      "Çiftler, aileler ve plajın tadını gerçek bir VIP tarzında çıkarmak isteyenler için özel garson servisli gölgelikli günlük veya haftalık VIP localarımız hizmetinizdedir.",
    culinaryTitle: "YAZIN TADINA VARIN",
    culinarySubtitle: "Taze Malzemeler, Rafine Detaylar & Akdeniz Tutkusu",
    culinaryDesc:
      "ICON BEACH'te her lezzet taze malzemeler, incelikli dokunuşlar ve unutulmaz anlar yaratma tutkusuyla hazırlanır. Taze deniz ürünlerinden Akdeniz lezzetlerine, özel tatlılardan imza kokteyllere kadar usta şeflerimizin hazırladığı her tabak eşsiz bir deneyimdir.",
    culinaryHighlight:
      "İlk lokmadan son gün batımına kadar her ziyaret sadece bir yemek değil, unutulmaz bir deneyimdir. Bu harika lezzetleri hiçbir zaman unutamayacaksınız! ✨",
    cocktailsTitle: "KOKTEYLLER • GÜN BATIMI • GÜZEL ANLAR",
    cocktailsSubtitle: "Altın Saatlerin Dünya Standartlarında Miksoloji ile Buluşması",
    cocktailsDesc:
      "Ilık Akdeniz esintisini hissedin, buz gibi özel kokteylinizi yudumlayın ve güneşin Marmaris kıyılarında batışını izleyin. İster deniz kenarında keyifli bir öğleden sonra, ister arkadaşlarla akşam yemeği ya da dans dolu bir geceye hazırlık... ICON BEACH olmak istediğiniz yerdir.",
    musicTitle: "CANLI MÜZİK • CANLI DJ • PARTİ GECELERİ",
    musicSubtitle: "HER GÜN = İYİ ENERJİ 🎧",
    dailyDj: "Her gün canlı DJ performansları ve belirli akşamlarda canlı müzik dinletileriyle yaz enerjisini dorukta yaşayın.",
    tuesdayPartyTitle: "🔥 SALI GECELERİ = PARTİ GECESİ 🔥",
    tuesdayPartySubtitle: "Uluslararası Ritimlerle Efsanevi Açık Hava Sahil Partileri",
    tuesdayPartyDesc:
      "Marmaris sahilinde müzik, dans, kokteyller ve büyüleyici bir atmosferle dolu unutulmaz bir geceye hazır olun.",
    nightPartiesTitle: "🌙 GECE PARTİLERİ",
    nightPartiesHours: "23:30 – 04:00",
    doorsCloseWarning: "⚠️ KAPILAR 01:00'DE KAPANIR",
    reservationRequired: "📲 Gece başlamadan önce WhatsApp veya Instagram üzerinden REZERVASYON ZORUNLUDUR.",
    vipCardSectionTitle: "VIP İNDİRİMİNİZ SİZİ BEKLİYOR!",
    vipCardSectionSubtitle: "🎟️ ÜCRETSİZ ICON BEACH VIP İNDİRİM KARTINIZI ALIN",
    vipCardInstruction:
      "ICON BEACH'te özel VIP indirimlerinden yararlanmak çok kolay! ORKA LOTUS BEACH HOTEL içerisindeki (Zemin Kat • Ana Havuzun Karşısı) ORKA HOMES ofisini ziyaret edin ve ücretsiz kartınızı hemen teslim alın.",
    officeLocationTitle: "ORKA HOMES OFİSİ (Zemin Kat)",
    officeLocationDesc: "ORKA LOTUS BEACH HOTEL İçinde · Ana Otel Havuzunun Tam Karşısı",
    consultantJaleh: "Sn. Jaleh Gharachorloo",
    consultantShahab: "Sn. Shahab Parvin",
    vipCardPerk1: "🎟️ ÜCRETSİZ VIP İNDİRİM KARTI",
    vipCardPerk2: "💎 ÖZEL FİYAT İNDİRİMLERİ",
    vipCardPerk3: "🏖️ ICON BEACH VIP AYRICALIKLARI",
    collectCardCta:
      "Plaja gitmeden önce kartınızı alın ve ICON BEACH deneyiminizi çok daha avantajlı ve özel kılın!",
    summaryTitle: "GÜNEŞ. DENİZ. YEMEK. MÜZİK. PARTİ.",
    summarySubtitle: "SİZİN YAZINIZ. SİZİN PLAJINIZ. SİZİN ICON'UNUZ.",
    closingQuote:
      "Plaj için gelin. Lezzet için kalın. Atmosfer için geri dönün. Geceleri asla unutmayın. 🌴✨",
    bottomTagline: "İyi yemek. Mavi sular. Harika zamanlar. ICON BEACH'e hoş geldiniz.",
    reserveWhatsapp: "WhatsApp VIP Rezervasyon",
    callDesk: "Orka Masasını Ara",
    openFullscreen: "Tam ekran görüntülemek için tıklayın",
    closeFullscreen: "Kapatmak için herhangi bir yere veya ESC'ye basın",
    getVipCardBtn: "Ücretsiz VIP Kartını Al",
    viewMapBtn: "Nasıl Gidilir (50m Yürüyüş)",
  },
  ru: {
    breadcrumbHome: "Главная",
    breadcrumbIcon: "Icon Beach",
    heroEyebrow: "ГДЕ ЛЕТО ДАРИТ СВОИ ЛУЧШИЕ МОМЕНТЫ",
    heroHeadline: "ICON BEACH MARMARIS",
    heroSubtitle: "☀️ ВКУСНАЯ ЕДА. ЛАЗУРНОЕ МОРЕ. ЛУЧШИЕ ЭМОЦИИ. 🍸",
    welcomeIntro:
      "Добро пожаловать в ICON BEACH — одно из главных мест Мармариса для наслаждения солнцем, морем, великолепной кухней, авторскими коктейлями, живой музыкой и легендарными вечеринками! Расположенный прямо по соседству с ORKA LOTUS BEACH HOTEL (всего в 50 метрах по набережной), ICON BEACH объединяет все лучшее средиземноморского лета в одном месте.",
    welcomeTagline:
      "Больше чем пляж. Больше чем ресторан. ICON BEACH — место, где оживает лето.",
    proximityBadge: "ВСЕГО 50 МЕТРОВ ОТ ОТЕЛЯ",
    proximityTitle: "Всего 50 метров вдоль пляжа от Orka Lotus Beach Hotel",
    proximityDesc:
      "Пройдите буквально 50 метров вдоль морской бухты от Orka Lotus Beach, чтобы оказаться в раю Icon Beach. Максимальный комфорт для гостей отеля.",
    freeSunbedsTitle: "БЕСПЛАТНЫЕ ШЕЗЛОНГИ",
    freeSunbedsDesc: "Бесплатные шезлонги на пляже для гостей Orka Lotus Beach Hotel.",
    freeBarTitle: "БЕСПЛАТНЫЙ БАР ДЛЯ ALL-INCLUSIVE",
    freeBarDesc: "Выбранные бесплатные напитки в Icon Beach для гостей Orka Lotus на All-Inclusive.",
    dayExperienceTitle: "ВАШ ИДЕАЛЬНЫЙ ПЛЯЖНЫЙ ДЕНЬ НАЧИНАЕТСЯ ЗДЕСЬ",
    dayExperienceSubtitle:
      "Ощутите мягкий песок, расслабьтесь под средиземноморским солнцем и наслаждайтесь кристально чистым Эгейским морем.",
    hotelGuestPerksTitle: "Привилегии для гостей Orka Lotus Beach Hotel",
    vipCabanasTitle: "ПРИВАТНЫЕ VIP-ЛОЖИ И КАБАНЫ",
    vipCabanasSubtitle: "Эксклюзивные дневные и недельные шатры с персональным обслуживанием",
    vipCabanasDesc:
      "Арендуйте роскошные шатры с балдахинами и персональным официантом — идеально для пар, семей и компаний, желающих наслаждаться отдыхом в истинном VIP-стиле.",
    culinaryTitle: "ВКУС ЛЕТА",
    culinarySubtitle: "Свежие ингредиенты, изысканные детали и страсть Средиземноморья",
    culinaryDesc:
      "В ICON BEACH каждое блюдо создается из свежайших продуктов с вниманием к деталям. От свежих морепродуктов и пасты до десертов и авторских коктейлей — наши шеф-повара дарят незабываемый гастрономический праздник.",
    culinaryHighlight:
      "От первого кусочка до последнего заката каждый визит — это яркое событие. Вы никогда не забудете эти великолепные вкусы! ✨",
    cocktailsTitle: "КОКТЕЙЛИ • ЗАКАТЫ • ОТЛИЧНОЕ НАСТРОЕНИЕ",
    cocktailsSubtitle: "Где золотой час встречается с искусством миксологии",
    cocktailsDesc:
      "Почувствуйте теплый бриз, насладитесь ледяным коктейлем и наблюдайте, как солнце скрывается за горными вершинами Мармариса. Идеально для отдыха у моря, ужина с друзьями и зажигательных танцев.",
    musicTitle: "ЖИВАЯ МУЗЫКА • LIVE DJ • НОЧНЫЕ ВЕЧЕРИНКИ",
    musicSubtitle: "КАЖДЫЙ ДЕНЬ = ОТЛИЧНЫЙ ВАЙБ 🎧",
    dailyDj: "Держите летний ритм с ежедневными DJ-сетами и живыми музыкальными вечерами на закате.",
    tuesdayPartyTitle: "🔥 ВТОРНИКИ = НОЧЬ ВЕЧЕРИНОК 🔥",
    tuesdayPartySubtitle: "Легендарные пляжные вечеринки под открытым небом",
    tuesdayPartyDesc:
      "Приготовьтесь к незабываемой ночи музыки, танцев и авторских коктейлей прямо на берегу моря.",
    nightPartiesTitle: "🌙 НОЧНЫЕ ВЕЧЕРИНКИ",
    nightPartiesHours: "23:30 – 04:00",
    doorsCloseWarning: "⚠️ ВХОД ЗАКРЫВАЕТСЯ В 01:00",
    reservationRequired: "📲 БРОНИРОВАНИЕ ОБЯЗАТЕЛЬНО через WhatsApp или Instagram до начала ночи.",
    vipCardSectionTitle: "ВАША VIP-СКИДКА УЖЕ ЖДЕТ ВАС!",
    vipCardSectionSubtitle: "🎟️ ПОЛУЧИТЕ БЕСПЛАТНУЮ VIP-КАРТУ СКИДОК ICON BEACH",
    vipCardInstruction:
      "Хотите специальные VIP-скидки в ICON BEACH? Это просто! Зайдите в офис ORKA HOMES внутри отеля ORKA LOTUS BEACH (1 этаж • прямо напротив главного бассейна) и получите бесплатную карту.",
    officeLocationTitle: "ОФИС ORKA HOMES (1-й этаж)",
    officeLocationDesc: "Внутри ORKA LOTUS BEACH HOTEL · Напротив главного бассейна",
    consultantJaleh: "Г-жа Джале Гарачорлу",
    consultantShahab: "Г-н Шахаб Парвин",
    vipCardPerk1: "🎟️ БЕСПЛАТНАЯ VIP-КАРТА",
    vipCardPerk2: "💎 СПЕЦИАЛЬНЫЕ СКИДКИ",
    vipCardPerk3: "🏖️ VIP-ПРИВИЛЕГИИ В ICON BEACH",
    collectCardCta:
      "Заберите вашу карту перед походом на пляж и сделайте отдых в ICON BEACH еще ярче и выгоднее!",
    summaryTitle: "СОЛНЦЕ. МОРЕ. ЕДА. МУЗЫКА. ВЕЧЕРИНКА.",
    summarySubtitle: "ВАШЕ ЛЕТО. ВАШ ПЛЯЖ. ВАШ ICON.",
    closingQuote:
      "Приходите ради моря. Оставайтесь ради еды. Возвращайтесь ради атмосферы. Помните эти ночи. 🌴✨",
    bottomTagline: "Вкусная еда. Лазурные воды. Лучшие моменты. Добро пожаловать в ICON BEACH.",
    reserveWhatsapp: "WhatsApp VIP-бронирование",
    callDesk: "Позвонить на ресепшн Orka",
    openFullscreen: "Нажмите для полноэкранного просмотра",
    closeFullscreen: "Нажмите в любом месте или ESC для закрытия",
    getVipCardBtn: "Получить бесплатную VIP-карту",
    viewMapBtn: "Как добраться (50 метров)",
  },
  de: {
    breadcrumbHome: "Startseite",
    breadcrumbIcon: "Icon Beach",
    heroEyebrow: "WO SICH DER SOMMER AM BESTEN ANFÜHLT",
    heroHeadline: "ICON BEACH MARMARIS",
    heroSubtitle: "☀️ GUTES ESSEN. BLAUES MEER. TOLLE ZEITEN. 🍸",
    welcomeIntro:
      "Willkommen im ICON BEACH — Marmaris' ultimativem Ziel für Sonne, Meer, exzellentes Essen, unvergessliche Cocktails, Live-Musik und legendäre Sommernächte! Direkt neben dem ORKA LOTUS BEACH HOTEL gelegen (nur 50 Meter an der Strandpromenade), vereint das ICON BEACH alles, was Sie sich für einen perfekten mediterranen Sommer wünschen.",
    welcomeTagline:
      "Mehr als ein Strand. Mehr als ein Restaurant. ICON BEACH ist der Ort, an dem der Sommer lebendig wird.",
    proximityBadge: "NUR 50 METER VOM HOTEL ENTFERNT",
    proximityTitle: "Nur 50 Meter Spaziergang vom Orka Lotus Beach Hotel",
    proximityDesc:
      "Spazieren Sie einfach 50 Meter an der türkisblauen Bucht entlang und erreichen Sie direkt das Icon Beach. Höchster Komfort für unsere Hotelgäste.",
    freeSunbedsTitle: "KOSTENLOSE SONNENLIEGEN",
    freeSunbedsDesc: "Kostenlose Sonnenliegen für Gäste des Orka Lotus Beach Hotels.",
    freeBarTitle: "KOSTENLOSE BAR FÜR ALL-INCLUSIVE-GÄSTE",
    freeBarDesc: "Ausgewählte kostenfreie Getränke im Icon Beach für Orka Lotus All-Inclusive-Gäste.",
    dayExperienceTitle: "IHR PERFEKTER STRANDTAG STARTET HIER",
    dayExperienceSubtitle:
      "Spüren Sie den warmen Sand unter den Füßen, entspannen Sie unter der Mittelmeersonne und genießen Sie das kristallklare Wasser.",
    hotelGuestPerksTitle: "Privilegien für Gäste des Orka Lotus Beach Hotels",
    vipCabanasTitle: "PRIVATE VIP-STRANDBETTEN & CABANAS",
    vipCabanasSubtitle: "Exklusive Tages- oder Wochen-Baldachine mit persönlichem Kellnerservice",
    vipCabanasDesc:
      "Mieten Sie unsere exklusiven Tages- oder Wochenbetten mit Baldachin und persönlichem Service — perfekt für Paare, Familien und alle, die den Strand im VIP-Stil genießen möchten.",
    culinaryTitle: "DEN SOMMER SCHMECKEN",
    culinarySubtitle: "Frische Zutaten, raffinierte Details & mediterrane Leidenschaft",
    culinaryDesc:
      "Im ICON BEACH wird jedes Gericht mit frischen Zutaten und viel Liebe zum Detail kreiert. Von frischen Meeresfrüchten über mediterrane Klassiker bis hin zu feinen Desserts und Signature-Cocktails — unsere Küchenchefs machen jeden Besuch zu einem Fest.",
    culinaryHighlight:
      "Vom ersten Bissen bis zum Sonnenuntergang ist jeder Besuch ein echtes Erlebnis. Sie werden diese wunderbaren Aromen nie vergessen! ✨",
    cocktailsTitle: "COCKTAILS • SONNENUNTERGÄNGE • GUTE ZEITEN",
    cocktailsSubtitle: "Wo die goldene Stunde auf Weltklasse-Mixologie trifft",
    cocktailsDesc:
      "Spüren Sie die mediterrane Brise, genießen Sie einen eiskalten Cocktail und beobachten Sie, wie die Sonne über Marmaris versinkt. Perfekt für einen entspannten Nachmittag, ein Abendessen mit Freunden oder eine Partynacht.",
    musicTitle: "LIVE-MUSIK • LIVE-DJ • PARTYNÄCHTE",
    musicSubtitle: "JEDEN TAG = GUTE VIBES 🎧",
    dailyDj: "Genießen Sie jeden Tag beste Sommerenergie mit Live-DJs und ausgewählten Abenden mit Live-Musik.",
    tuesdayPartyTitle: "🔥 DIENSTAGABEND = PARTYNIGHT 🔥",
    tuesdayPartySubtitle: "Legendäre Open-Air-Strandpartys mit internationalen Beats",
    tuesdayPartyDesc:
      "Freuen Sie sich auf eine unvergessliche Nacht voller Musik, Tanz und Cocktails direkt am Strand.",
    nightPartiesTitle: "🌙 NACHTPARTYS",
    nightPartiesHours: "23:30 – 04:00",
    doorsCloseWarning: "⚠️ EINLASS SCHLIESST UM 01:00",
    reservationRequired: "📲 RESERVIERUNG ERFORDERLICH über WhatsApp oder Instagram vor Beginn der Nacht.",
    vipCardSectionTitle: "IHR VIP-RABATT WARTET AUF SIE!",
    vipCardSectionSubtitle: "🎟️ HOLEN SIE SICH IHRE KOSTENLOSE VIP-RABATTKARTE",
    vipCardInstruction:
      "Möchten Sie exklusive VIP-Rabatte im ICON BEACH genießen? Besuchen Sie einfach das ORKA HOMES Büro im ORKA LOTUS BEACH HOTEL (Erdgeschoss • direkt vor dem Hauptpool) und holen Sie sich Ihre kostenlose Karte direkt ab.",
    officeLocationTitle: "ORKA HOMES BÜRO (Erdgeschoss)",
    officeLocationDesc: "Im ORKA LOTUS BEACH HOTEL · Direkt vor dem Hauptpool",
    consultantJaleh: "Frau Jaleh Gharachorloo",
    consultantShahab: "Herr Shahab Parvin",
    vipCardPerk1: "🎟️ KOSTENLOSE VIP-RABATTKARTE",
    vipCardPerk2: "💎 EXKLUSIVE PREISVORTEILE",
    vipCardPerk3: "🏖️ ICON BEACH VIP-PRIVILEGIEN",
    collectCardCta:
      "Holen Sie sich Ihre Karte vor Ihrem Strandbesuch und machen Sie Ihr ICON BEACH Erlebnis noch lohnender!",
    summaryTitle: "SONNE. MEER. ESSEN. MUSIK. PARTY.",
    summarySubtitle: "IHR SOMMER. IHR STRAND. IHR ICON.",
    closingQuote:
      "Kommen Sie für den Strand. Bleiben Sie für das Essen. Kehren Sie zurück für die Atmosphäre. Erinnern Sie sich an die Nächte. 🌴✨",
    bottomTagline: "Gutes Essen. Blaues Meer. Tolle Zeiten. Willkommen im ICON BEACH.",
    reserveWhatsapp: "WhatsApp VIP-Reservierung",
    callDesk: "Orka Rezeption Anrufen",
    openFullscreen: "Klicken für Vollbildansicht",
    closeFullscreen: "Klicken oder ESC zum Schließen",
    getVipCardBtn: "Kostenlose VIP-Karte holen",
    viewMapBtn: "Wegbeschreibung (50m Fußweg)",
  },
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */
export default function IconBeachPage() {
  const { locale, setLocale } = useLocale();
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;

  // Video State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <PageShell currentLocale={locale} onLocaleChange={setLocale}>
      {/* ==================================================================== */}
      {/* 1. CINEMATIC FULLSCREEN HERO VIDEO WITHOUT FILTERS & UNOBSTRUCTED    */}
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

        {/* Small, Elegant Transparent Speaker Icon on Bottom Left Corner */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
          className="absolute bottom-6 left-6 z-30 p-3 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-cyan-400/60 text-cyan-300 transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {/* Play/Pause Control next to sound toggle */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="absolute bottom-6 left-20 z-30 px-3.5 py-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-cyan-400/60 text-cyan-300 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-1.5"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        {/* Floating Proximity Tag at Top Right */}
        <div className="absolute top-6 right-6 z-30 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-cyan-400/70 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center gap-2">
          <Navigation size={14} className="text-cyan-400 animate-pulse" />
          <span>{t.proximityBadge}</span>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. MAJESTIC BREADCRUMBS & INTRO TITLE (BELOW HERO VIDEO)             */}
      {/* ==================================================================== */}
      <section className="bg-[#020b14] text-white py-12 md:py-16 border-b border-cyan-500/20 relative">
        <div className="container max-w-7xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400/80 mb-6 font-semibold">
            <Link href="/" className="hover:text-cyan-300 transition-colors">
              {t.breadcrumbHome}
            </Link>
            <ChevronRight size={12} className="text-cyan-500/60" />
            <span className="text-white">{t.breadcrumbIcon}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/70 border border-cyan-400/40 px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Sparkles size={14} /> {t.heroEyebrow}
              </span>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-wide leading-tight">
                {t.heroHeadline}
              </h1>

              <p className="text-sm sm:text-lg text-cyan-300 font-semibold uppercase tracking-wider">
                {t.heroSubtitle}
              </p>

              <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
                {t.welcomeIntro}
              </p>

              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <p className="text-sm sm:text-base font-serif italic text-cyan-200">
                  “{t.welcomeTagline}”
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#vip-discount-card"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(6,182,212,0.6)] flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Ticket size={16} /> {t.getVipCardBtn}
                </a>

                <a
                  href="https://wa.me/905495274085"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                >
                  <MessageCircle size={16} /> {t.reserveWhatsapp}
                </a>

                <a
                  href="#how-to-get-there"
                  className="px-6 py-3.5 rounded-xl bg-black/60 hover:bg-black/90 text-cyan-300 font-bold text-xs uppercase tracking-wider border border-cyan-400/60 shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Navigation size={15} /> {t.viewMapBtn}
                </a>
              </div>
            </div>

            {/* Icon Beach Logo Showcase with Thin Neon Blue Frame */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div
                onClick={() =>
                  setFullscreenImage({
                    src: IMAGES.logo,
                    alt: "ICON BEACH MARMARIS Official Logo",
                    title: "ICON BEACH MARMARIS — Official Brand Emblem",
                  })
                }
                className="relative rounded-2xl overflow-hidden border border-cyan-400/70 p-2 bg-gradient-to-b from-[#06182c] to-[#020b14] shadow-[0_0_30px_rgba(6,182,212,0.3)] cursor-zoom-in group hover:border-cyan-300 transition-all"
                title={t.openFullscreen}
              >
                <img
                  src={IMAGES.logo}
                  alt="ICON BEACH MARMARIS Official Logo"
                  className="w-64 sm:w-72 h-auto object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-cyan-400 text-[10px] uppercase font-bold text-cyan-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={10} /> Fullscreen
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. PROXIMITY CARD: ONLY 50 METRES NEXT TO ORKA LOTUS BEACH           */}
      {/* ==================================================================== */}
      <section id="how-to-get-there" className="bg-[#041220] text-white py-14 border-b border-cyan-500/20">
        <div className="container max-w-7xl">
          <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#020b14] via-[#082038] to-[#020b14] border border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.25)] p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-400/50 px-3.5 py-1.5 rounded-full">
                  <MapPin size={14} className="text-cyan-400" /> {t.proximityBadge}
                </span>

                <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal leading-tight">
                  {t.proximityTitle}
                </h2>

                <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
                  {t.proximityDesc}
                </p>

                {/* Step-by-Step Directions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-black/50 border border-cyan-400/30">
                    <span className="text-xs font-bold text-cyan-300 block mb-1">
                      1. Step onto Promenade
                    </span>
                    <span className="text-xs text-white/70">
                      Exit from Orka Lotus Beach jetty onto the shoreline walkway.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/50 border border-cyan-400/30">
                    <span className="text-xs font-bold text-cyan-300 block mb-1">
                      2. Walk 50 Metres
                    </span>
                    <span className="text-xs text-white/70">
                      Follow the wooden beach bay path directly right for 1 minute.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/50 border border-cyan-400/30">
                    <span className="text-xs font-bold text-cyan-300 block mb-1">
                      3. Welcome to Icon
                    </span>
                    <span className="text-xs text-white/70">
                      Step into Icon Beach with your Free VIP Discount Card in hand!
                    </span>
                  </div>
                </div>
              </div>

              {/* Entrance Image with Thin Neon Blue Frame */}
              <div className="lg:col-span-5">
                <div
                  onClick={() =>
                    setFullscreenImage({
                      src: IMAGES.entrance,
                      alt: "ICON BEACH MARMARIS Entrance",
                      title: "ICON BEACH — Beachfront Entrance (50m from Orka Lotus)",
                    })
                  }
                  className="rounded-2xl overflow-hidden border border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35)] relative cursor-zoom-in group"
                  title={t.openFullscreen}
                >
                  <img
                    src={IMAGES.entrance}
                    alt="ICON BEACH Entrance"
                    className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 backdrop-blur-md text-[11px] font-bold uppercase text-cyan-300 border border-cyan-400/60">
                    50m From Orka Lotus Beach
                  </span>
                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-cyan-400 text-[10px] uppercase font-bold text-cyan-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={11} /> Fullscreen
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. YOUR PERFECT BEACH DAY STARTS HERE (HOTEL PRIVILEGES + CABANAS)   */}
      {/* ==================================================================== */}
      <section className="bg-[#020b14] text-white py-16 md:py-24 border-b border-cyan-500/20 relative">
        <div className="container max-w-7xl">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              <Sun size={14} /> {t.dayExperienceTitle}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
              {t.hotelGuestPerksTitle}
            </h2>
            <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-2">
              {t.dayExperienceSubtitle}
            </p>
          </div>

          {/* Perks Grid for Orka Lotus Hotel Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#061c30] to-[#020b14] border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-cyan-400 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 mb-4 shadow">
                <Sun size={24} />
              </div>
              <h3 className="font-serif text-xl font-medium text-white mb-2">
                {t.freeSunbedsTitle}
              </h3>
              <p className="text-xs text-white/75 leading-relaxed">
                {t.freeSunbedsDesc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#061c30] to-[#020b14] border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-cyan-400 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 mb-4 shadow">
                <GlassWater size={24} />
              </div>
              <h3 className="font-serif text-xl font-medium text-white mb-2">
                {t.freeBarTitle}
              </h3>
              <p className="text-xs text-white/75 leading-relaxed">
                {t.freeBarDesc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#061c30] to-[#020b14] border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-cyan-400 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 mb-4 shadow">
                <Waves size={24} />
              </div>
              <h3 className="font-serif text-xl font-medium text-white mb-2">
                Beachfront Swimming
              </h3>
              <p className="text-xs text-white/75 leading-relaxed">
                Direct access to crystal-clear Mediterranean sea waters and soft sand.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#061c30] to-[#020b14] border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-cyan-400 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 mb-4 shadow">
                <Music size={24} />
              </div>
              <h3 className="font-serif text-xl font-medium text-white mb-2">
                Live Music & Entertainment
              </h3>
              <p className="text-xs text-white/75 leading-relaxed">
                Daily DJ sets and sunset acoustic rhythms right by the beach.
              </p>
            </div>
          </div>

          {/* VIP Cabanas & Canopy Beds Showcase with Images */}
          <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#061c30] to-[#020b14] border border-cyan-400/70 shadow-[0_0_35px_rgba(6,182,212,0.25)] p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-400/50 px-3.5 py-1.5 rounded-full">
                  <Crown size={14} /> VIP LUXURY UPGRADE
                </span>

                <h3 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                  {t.vipCabanasTitle}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-cyan-300 uppercase tracking-wider">
                  {t.vipCabanasSubtitle}
                </p>

                <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-light">
                  {t.vipCabanasDesc}
                </p>

                <div className="p-4 rounded-xl bg-black/40 border border-cyan-400/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <Check size={14} className="text-cyan-400 flex-shrink-0" />
                    <span>Dedicated Private Waiter & Concierge Service</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <Check size={14} className="text-cyan-400 flex-shrink-0" />
                    <span>Daily & Weekly Canopy Bed Hire with Plush Linens</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <Check size={14} className="text-cyan-400 flex-shrink-0" />
                    <span>Bottle Service, Fresh Fruit Platters & Champagne</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://wa.me/905495274085"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.5)] inline-flex items-center gap-2"
                  >
                    <MessageCircle size={15} /> Reserve VIP Cabana
                  </a>
                </div>
              </div>

              {/* Swings & Terrace Media Grid with Thin Neon Blue Frames */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() =>
                    setFullscreenImage({
                      src: IMAGES.swings,
                      alt: "ICON BEACH Overwater Swings",
                      title: "ICON BEACH — Overwater Sunset Swings",
                    })
                  }
                  className="rounded-2xl overflow-hidden border border-cyan-400/70 shadow-[0_0_20px_rgba(6,182,212,0.3)] relative cursor-zoom-in group h-60 sm:h-72"
                  title={t.openFullscreen}
                >
                  <img
                    src={IMAGES.swings}
                    alt="ICON BEACH Swings"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
                    Beachfront Swings
                  </span>
                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-cyan-400 text-[9px] uppercase font-bold text-cyan-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={10} /> Fullscreen
                  </div>
                </div>

                <div
                  onClick={() =>
                    setFullscreenImage({
                      src: IMAGES.terraceBeachfront,
                      alt: "ICON BEACH Terrace & Lounge",
                      title: "ICON BEACH — VIP Terrace & Beachfront Day Lounge",
                    })
                  }
                  className="rounded-2xl overflow-hidden border border-cyan-400/70 shadow-[0_0_20px_rgba(6,182,212,0.3)] relative cursor-zoom-in group h-60 sm:h-72"
                  title={t.openFullscreen}
                >
                  <img
                    src={IMAGES.terraceBeachfront}
                    alt="ICON BEACH Terrace"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
                    VIP Terrace Lounge
                  </span>
                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-cyan-400 text-[9px] uppercase font-bold text-cyan-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={10} /> Fullscreen
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. TASTE THE SUMMER & SIGNATURE COCKTAILS                            */}
      {/* ==================================================================== */}
      <section className="bg-[#041220] text-white py-16 md:py-24 border-b border-cyan-500/20">
        <div className="container max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Cocktail Images Showcase with Thin Neon Blue Frames */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() =>
                  setFullscreenImage({
                    src: IMAGES.cocktails,
                    alt: "ICON BEACH Signature Cocktails",
                    title: "ICON BEACH — Artisanal Beachfront Cocktails",
                  })
                }
                className="rounded-2xl overflow-hidden border border-cyan-400/70 shadow-[0_0_25px_rgba(6,182,212,0.35)] relative cursor-zoom-in group h-72 sm:h-80"
                title={t.openFullscreen}
              >
                <img
                  src={IMAGES.cocktails}
                  alt="ICON BEACH Cocktails"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 backdrop-blur-md text-[11px] font-bold text-cyan-300 border border-cyan-400/60">
                  Signature Mixology
                </span>
                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-cyan-400 text-[10px] uppercase font-bold text-cyan-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={10} /> Fullscreen
                </div>
              </div>

              <div
                onClick={() =>
                  setFullscreenImage({
                    src: IMAGES.cocktails2,
                    alt: "ICON BEACH Sunset Cocktails",
                    title: "ICON BEACH — Handcrafted Sunset Drinks",
                  })
                }
                className="rounded-2xl overflow-hidden border border-cyan-400/70 shadow-[0_0_25px_rgba(6,182,212,0.35)] relative cursor-zoom-in group h-72 sm:h-80"
                title={t.openFullscreen}
              >
                <img
                  src={IMAGES.cocktails2}
                  alt="ICON BEACH Sunset Cocktails"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 backdrop-blur-md text-[11px] font-bold text-cyan-300 border border-cyan-400/60">
                  Mediterranean Flavours
                </span>
                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-cyan-400 text-[10px] uppercase font-bold text-cyan-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={10} /> Fullscreen
                </div>
              </div>
            </div>

            {/* Culinary & Cocktails Description */}
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-400/50 px-3.5 py-1.5 rounded-full">
                <Utensils size={14} /> {t.culinaryTitle}
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
                {t.cocktailsTitle}
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-cyan-300 uppercase tracking-wider">
                {t.culinarySubtitle}
              </p>

              <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-light">
                {t.culinaryDesc}
              </p>

              <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-light">
                {t.cocktailsDesc}
              </p>

              {/* Highlights Badge Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="p-2.5 rounded-lg bg-black/40 border border-cyan-400/30 text-xs text-white/90 flex items-center gap-2">
                  <Check size={13} className="text-cyan-400 flex-shrink-0" />
                  <span>🍤 Fresh Seafood</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-cyan-400/30 text-xs text-white/90 flex items-center gap-2">
                  <Check size={13} className="text-cyan-400 flex-shrink-0" />
                  <span>🥗 Fresh Dishes</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-cyan-400/30 text-xs text-white/90 flex items-center gap-2">
                  <Check size={13} className="text-cyan-400 flex-shrink-0" />
                  <span>🍝 Mediterranean</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-cyan-400/30 text-xs text-white/90 flex items-center gap-2">
                  <Check size={13} className="text-cyan-400 flex-shrink-0" />
                  <span>🍰 Desserts</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-cyan-400/30 text-xs text-white/90 flex items-center gap-2">
                  <Check size={13} className="text-cyan-400 flex-shrink-0" />
                  <span>🍸 Signature Cocktails</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-cyan-400/30 text-xs text-white/90 flex items-center gap-2">
                  <Check size={13} className="text-cyan-400 flex-shrink-0" />
                  <span>👨🍳 Special Chefs</span>
                </div>
              </div>

              {/* Special Tagline Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/70 to-blue-950/70 border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <p className="text-xs sm:text-sm font-serif italic text-cyan-200">
                  {t.culinaryHighlight}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. LIVE MUSIC, LIVE DJ & LEGENDARY TUESDAY PARTY NIGHTS              */}
      {/* ==================================================================== */}
      <section className="bg-[#020b14] text-white py-16 md:py-24 border-b border-cyan-500/20 relative">
        <div className="container max-w-7xl">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              <Headphones size={14} /> {t.musicTitle}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
              {t.musicSubtitle}
            </h2>
            <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-2">
              {t.dailyDj}
            </p>
          </div>

          {/* Tuesday Night Party Card with Thin Neon Blue Frame */}
          <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#041424] via-[#092644] to-[#041424] border-2 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.35)] p-6 sm:p-12 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/30 border border-red-500/60 text-red-300 text-xs font-bold uppercase tracking-wider animate-pulse">
                  <Flame size={14} /> WEEKLY HIGHLIGHT
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                  {t.tuesdayPartyTitle}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-cyan-300 uppercase tracking-wider">
                  {t.tuesdayPartySubtitle}
                </p>

                <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-light">
                  {t.tuesdayPartyDesc}
                </p>

                {/* Party Details & Hours Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-black/60 border border-cyan-400/40 space-y-1">
                    <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <Clock size={14} /> {t.nightPartiesTitle}
                    </span>
                    <span className="text-lg font-serif text-white block">
                      {t.nightPartiesHours}
                    </span>
                    <span className="text-[11px] text-amber-300 font-bold block">
                      {t.doorsCloseWarning}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-cyan-400/40 space-y-1">
                    <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <MessageCircle size={14} /> Booking Desk
                    </span>
                    <span className="text-xs text-white/80 block">
                      {t.reservationRequired}
                    </span>
                    <a
                      href="https://wa.me/905495274085"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#25D366] hover:underline block pt-1"
                    >
                      WhatsApp Direct: +90 549 527 40 85 →
                    </a>
                  </div>
                </div>
              </div>

              {/* Party Images with Thin Neon Blue Frame */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() =>
                    setFullscreenImage({
                      src: IMAGES.party2,
                      alt: "ICON BEACH Party Experience",
                      title: "ICON BEACH — Tuesday Night Party",
                    })
                  }
                  className="rounded-2xl overflow-hidden border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] relative cursor-zoom-in group h-56 sm:h-64"
                  title={t.openFullscreen}
                >
                  <img
                    src={IMAGES.party2}
                    alt="ICON BEACH Party 2"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-cyan-300 uppercase">
                    Night Party
                  </span>
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[8px] uppercase font-bold text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    Fullscreen
                  </div>
                </div>

                <div
                  onClick={() =>
                    setFullscreenImage({
                      src: IMAGES.partyPhoto,
                      alt: "ICON BEACH Live DJ",
                      title: "ICON BEACH — Live DJ & Starlit Beats",
                    })
                  }
                  className="rounded-2xl overflow-hidden border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] relative cursor-zoom-in group h-56 sm:h-64"
                  title={t.openFullscreen}
                >
                  <img
                    src={IMAGES.partyPhoto}
                    alt="ICON BEACH Live Party"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-cyan-300 uppercase">
                    Live Vibes
                  </span>
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[8px] uppercase font-bold text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    Fullscreen
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7. LARGE PROMINENT SECTION: GET YOUR FREE ICON VIP DISCOUNT CARD    */}
      {/* ==================================================================== */}
      <section
        id="vip-discount-card"
        className="bg-gradient-to-b from-[#020b14] via-[#051a2e] to-[#020b14] text-white py-16 md:py-24 border-b border-cyan-400/40 relative"
      >
        <div className="container max-w-6xl">
          {/* Main Giant VIP Discount Box with Neon Blue Frame & Glow */}
          <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#041525] to-[#020b14] border-2 border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.4)] p-8 sm:p-14 backdrop-blur-xl relative">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-950/90 border border-cyan-400/60 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-pulse">
                <Ticket size={16} /> {t.vipCardSectionTitle}
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-wide">
                {t.vipCardSectionSubtitle}
              </h2>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl mx-auto font-light">
                {t.vipCardInstruction}
              </p>
            </div>

            {/* Location Highlights */}
            <div className="max-w-2xl mx-auto mb-10">
              {/* Office Location Box */}
              <div className="p-6 sm:p-8 rounded-2xl bg-black/60 border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.2)] space-y-3 text-center sm:text-left">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-2">
                  <MapPin size={16} /> {t.officeLocationTitle}
                </span>
                <p className="text-sm sm:text-base text-white font-medium">
                  {t.officeLocationDesc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="flex items-center gap-2 text-xs text-white/90 bg-white/5 p-2.5 rounded-lg border border-cyan-400/20">
                    <Check size={14} className="text-cyan-400 flex-shrink-0" />
                    <span>{t.vipCardPerk1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/90 bg-white/5 p-2.5 rounded-lg border border-cyan-400/20">
                    <Check size={14} className="text-cyan-400 flex-shrink-0" />
                    <span>{t.vipCardPerk2}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/90 bg-white/5 p-2.5 rounded-lg border border-cyan-400/20">
                    <Check size={14} className="text-cyan-400 flex-shrink-0" />
                    <span>{t.vipCardPerk3}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Callout */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/90 via-[#041a2e] to-cyan-950/90 border border-cyan-400/60 text-center">
              <p className="text-xs sm:text-sm font-semibold text-cyan-200">
                ✨ {t.collectCardCta}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 8. SUMMARY PILLARS & EPIC BOTTOM PARTY SHOWCASE                      */}
      {/* ==================================================================== */}
      <section className="bg-[#020b14] text-white py-16 md:py-24 border-b border-cyan-500/20">
        <div className="container max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              {t.summarySubtitle}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
              {t.summaryTitle}
            </h2>
            <p className="text-sm sm:text-base font-serif italic text-cyan-300 pt-2">
              “{t.closingQuote}”
            </p>
          </div>

          {/* Pillars List */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 mb-14">
            <div className="p-4 rounded-xl bg-[#041220] border border-cyan-400/40 text-center">
              <span className="text-xs font-bold text-white block">☀️ Perfect Beach Days</span>
            </div>
            <div className="p-4 rounded-xl bg-[#041220] border border-cyan-400/40 text-center">
              <span className="text-xs font-bold text-white block">🌊 Beautiful Blue Waters</span>
            </div>
            <div className="p-4 rounded-xl bg-[#041220] border border-cyan-400/40 text-center">
              <span className="text-xs font-bold text-white block">🏖️ Beach Relaxation</span>
            </div>
            <div className="p-4 rounded-xl bg-[#041220] border border-cyan-400/40 text-center">
              <span className="text-xs font-bold text-white block">🍤 Exceptional Food</span>
            </div>
            <div className="p-4 rounded-xl bg-[#041220] border border-cyan-400/40 text-center">
              <span className="text-xs font-bold text-white block">🍸 Signature Cocktails</span>
            </div>
            <div className="p-4 rounded-xl bg-[#041220] border border-cyan-400/40 text-center">
              <span className="text-xs font-bold text-white block">👨🍳 Special Chefs</span>
            </div>
            <div className="p-4 rounded-xl bg-[#041220] border border-cyan-400/40 text-center">
              <span className="text-xs font-bold text-white block">🎶 Live Music</span>
            </div>
            <div className="p-4 rounded-xl bg-[#041220] border border-cyan-400/40 text-center">
              <span className="text-xs font-bold text-white block">🎧 Live DJ Every Day</span>
            </div>
            <div className="p-4 rounded-xl bg-[#041220] border border-cyan-400/40 text-center">
              <span className="text-xs font-bold text-white block">🔥 Tuesday Party Nights</span>
            </div>
            <div className="p-4 rounded-xl bg-[#041220] border border-cyan-400/40 text-center">
              <span className="text-xs font-bold text-white block">🌙 Night Parties to 04:00</span>
            </div>
            <div className="p-4 rounded-xl bg-[#041220] border border-cyan-400/40 text-center">
              <span className="text-xs font-bold text-white block">💎 VIP Canopies & Beds</span>
            </div>
            <div className="p-4 rounded-xl bg-[#041220] border border-cyan-400/40 text-center">
              <span className="text-xs font-bold text-white block">🍹 Free Bar & Sunbeds</span>
            </div>
          </div>

          {/* Epic Bottom Party Showcase Image with Thin Neon Blue Frame */}
          <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#06182c] to-[#020b14] border-2 border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.4)] p-6 sm:p-10">
            <div
              onClick={() =>
                setFullscreenImage({
                  src: IMAGES.bottomParty,
                  alt: "MARMARIS ICON BEACH PARTY",
                  title: "MARMARIS ICON BEACH — Ultimate Mediterranean Summer Experience",
                })
              }
              className="rounded-2xl overflow-hidden border border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.3)] relative cursor-zoom-in group mb-6"
              title={t.openFullscreen}
            >
              <img
                src={IMAGES.bottomParty}
                alt="MARMARIS ICON BEACH PARTY"
                className="w-full h-80 sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                <span className="px-3.5 py-1.5 rounded-lg bg-black/80 border border-cyan-400 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  ICON BEACH MARMARIS
                </span>
                <span className="text-xs text-white/80 italic hidden sm:inline-block">
                  {t.bottomTagline}
                </span>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-400 text-[10px] uppercase font-bold text-cyan-300 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={12} /> Fullscreen
              </div>
            </div>

            <div className="text-center pt-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
                {t.bottomTagline}
              </h3>
              <p className="text-xs sm:text-sm text-cyan-300 font-medium">
                📍 RIGHT NEXT TO ORKA LOTUS BEACH HOTEL · 50 METRES ALONG THE SHORELINE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 9. FULLSCREEN IMAGE LIGHTBOX MODAL (CLICK TO OPEN, CLICK TO CLOSE)   */}
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
              <span className="text-xs sm:text-base font-serif text-cyan-300 font-medium tracking-wide">
                {fullscreenImage.title || fullscreenImage.alt}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-white/60 uppercase tracking-widest hidden sm:inline-block">
                {t.closeFullscreen}
              </span>
              <button
                onClick={() => setFullscreenImage(null)}
                aria-label="Close fullscreen view"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-cyan-400/60 text-cyan-300 flex items-center justify-center transition-all hover:scale-110 shadow-xl"
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
              className="max-w-full max-h-[82vh] w-auto h-auto object-contain rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.5)] border border-cyan-400 hover:border-cyan-300 transition-all duration-300"
            />
          </div>

          {/* Bottom Hint */}
          <div
            onClick={() => setFullscreenImage(null)}
            className="py-2 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-cyan-400/40 text-[11px] text-cyan-300 uppercase tracking-widest">
              <Maximize2 size={12} className="text-cyan-400" />
              {t.closeFullscreen}
            </span>
          </div>
        </div>
      )}
    </PageShell>
  );
}
