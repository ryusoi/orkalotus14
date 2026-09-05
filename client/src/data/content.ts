/*
 * Style reminder: Keep content separate from the Aegean Riviera Editorial UI.
 * Unknown operational details stay explicitly marked for confirmation.
 */

export type Locale = "en" | "tr" | "ru" | "de";
export type Localized = Record<Locale, string>;

export const locales: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "tr", label: "Turkish", native: "Türkçe" },
  { code: "ru", label: "Russian", native: "Русский" },
  { code: "de", label: "Deutsch", native: "Deutsch" },
];

export const designerCredit: Record<Locale, string> = {
  en: "Website designed by Mr. Shahab Parvin from VISION STUDIOS INC.",
  tr: "Web sitesi VISION STUDIOS INC.'den Sn. Shahab Parvin tarafından tasarlanmıştır",
  ru: "Сайт разработан г-ном Шахабом Парвином из VISION STUDIOS INC.",
  de: "Website entworfen von Herrn Shahab Parvin von VISION STUDIOS INC.",
};

export const ui = {
  en: {
    nav: ["Today", "Directory", "Dining", "Wellness", "Marmaris"],
    live: "Live today",
    explore: "Explore the hotel",
    ask: "Ask our concierge",
    booking: "Your stay",
    all: "All",
    confirmed: "Confirmed",
    pending: "Schedule to be confirmed",
  },
  tr: { nav: ["Bugün", "Rehber", "Yeme İçme", "Wellness", "Marmaris"], live: "Bugün canlı", explore: "Oteli keşfet", ask: "Concierge'e sor", booking: "Konaklamanız", all: "Tümü", confirmed: "Onaylandı", pending: "Program onay bekliyor" },
  ru: { nav: ["Сегодня", "Справочник", "Рестораны", "Wellness", "Мармарис"], live: "Сегодня", explore: "Об отеле", ask: "Спросить консьержа", booking: "Ваш отдых", all: "Все", confirmed: "Подтверждено", pending: "Расписание уточняется" },
  de: { nav: ["Heute", "Verzeichnis", "Gastronomie", "Wellness", "Marmaris"], live: "Heute live", explore: "Hotel entdecken", ask: "Concierge fragen", booking: "Ihr Aufenthalt", all: "Alle", confirmed: "Bestätigt", pending: "Termin wird bestätigt" },
} satisfies Record<Locale, { nav: string[]; live: string; explore: string; ask: string; booking: string; all: string; confirmed: string; pending: string }>;

export const hotel = {
  name: "ORKA LOTUS BEACH",
  location: "İçmeler · Marmaris · Türkiye",
  address: "İçmeler Mah. Atatürk Cad. No:56 / 48720 / Marmaris, Muğla",
  phone: "444 6 752",
  email: "info.orkalotus@orkahotels.com",
  weather: "33°",
  weatherLabel: "Clear sky · Marmaris",
  tagline: "Luxury, nature and the Aegean — in one living rhythm.",
};

export const guestMedia = {
  heroVideo: "/videos/Intro.mp4",
  heroVideoIntro: "/videos/Intro.mp4",
  heroVideoEnd: "/videos/end.mp4",
  heroAudio: "/audio/Summer%20audio.m4a",
  heroFirstFrame: "/videos/hero-first-frame.jpg",
  publishedHeroRole: "The first approved asset is used as the live guest-guide hero.",
};

export type Activity = {
  id: string;
  date: string;
  start: string;
  end: string;
  category: string;
  title: Localized;
  description: Localized;
  location: string;
  status: "confirmed" | "pending";
  booking: boolean;
  capacity?: string;
  staff: string;
  icon: string;
};

export const L = (
  en: string,
  tr: string,
  ru?: string,
  de?: string,
  _es?: string,
  _fr?: string,
  _ar?: string,
  _fa?: string
): Localized => ({
  en,
  tr: tr || en,
  ru: ru || en,
  de: de || en,
});

export const activities: Activity[] = [
  {
    id: "act-01",
    date: "2026-08-26",
    start: "07:30",
    end: "08:15",
    category: "Wellness",
    title: L("Sunrise yoga & meditation", "Gündoğumu yoga ve meditasyon", "Йога и медитация на рассвете", "Sonnenaufgangs-Yoga & Meditation"),
    description: L("Start softly with breathwork above the Aegean.", "Ege manzarasında nefes çalışmasıyla güne başlayın.", "Мягкое начало дня с дыхательными практиками над Эгейским морем.", "Sanfter Start mit Atemübungen über der Ägäis."),
    location: "Lotus Yoga Pier",
    status: "confirmed",
    booking: false,
    staff: "Wellness team",
    icon: "sun",
  },
  {
    id: "act-02",
    date: "2026-08-26",
    start: "10:30",
    end: "11:15",
    category: "Pool",
    title: L("Aqua rhythm & pool vitality", "Aqua rhythm ve havuz canlılığı", "Аква-ритм и аквааэробика", "Aqua-Rhythmus & Pool-Vitalität"),
    description: L("A light-hearted pool session with the animation team.", "Animasyon ekibiyle eğlenceli havuz aktivitesi.", "Энергичная тренировка в бассейне с командой анимации.", "Eine heitere Pool-Session mit dem Animationsteam."),
    location: "Main Pool",
    status: "confirmed",
    booking: false,
    staff: "Activities team",
    icon: "waves",
  },
  {
    id: "act-03",
    date: "2026-08-26",
    start: "12:30",
    end: "14:00",
    category: "Dining",
    title: L("Aegean lunch service", "Ege öğle servisi", "Эгейский обед", "Ägäischer Mittagsservice"),
    description: L("Seasonal produce, grilled fish and long-table ease.", "Mevsim ürünleri, ızgara balık ve keyifli bir masa.", "Сезонные продукты, рыба на гриле и средиземноморская трапеза.", "Saisonale Produkte, gegrillter Fisch und gemütliche Tafel."),
    location: "Lotus Restaurant",
    status: "confirmed",
    booking: false,
    staff: "F&B team",
    icon: "utensils",
  },
  {
    id: "act-04",
    date: "2026-08-26",
    start: "15:00",
    end: "16:00",
    category: "Water Sports",
    title: L("Water sports desk", "Su sporları masası", "Стойка водных видов спорта", "Wassersport-Schalter"),
    description: L("Ask the beach team about today’s sea conditions and equipment.", "Deniz koşulları ve ekipman için plaj ekibimize danışın.", "Узнайте у пляжной команды о состоянии моря и прокате инвентаря.", "Fragen Sie das Strandteam nach Seebedingungen und Ausrüstung."),
    location: "Beachfront",
    status: "pending",
    booking: true,
    capacity: "Capacity to be confirmed",
    staff: "Beach team",
    icon: "anchor",
  },
  {
    id: "act-05",
    date: "2026-08-26",
    start: "17:45",
    end: "18:30",
    category: "Beach",
    title: L("Sunset tea on the pier", "İskelede gün batımı çayı", "Чай на закате на пирсе", "Sonnenuntergangs-Tee am Steg"),
    description: L("A quiet pause as the bay turns gold.", "Koy altın rengine dönerken sakin bir mola.", "Спокойная пауза, пока залив окрашивается в золото.", "Eine ruhige Pause, wenn die Bucht sich gold färbt."),
    location: "Lotus Pier",
    status: "confirmed",
    booking: false,
    staff: "Guest relations",
    icon: "sunset",
  },
  {
    id: "act-06",
    date: "2026-08-26",
    start: "20:30",
    end: "22:00",
    category: "Entertainment",
    title: L("Live music under the pines", "Çamların altında canlı müzik", "Живая музыка под соснами", "Live-Musik unter den Pinien"),
    description: L("An easygoing evening set for the whole resort.", "Tüm tesis için keyifli bir akşam performansı.", "Приятный музыкальный вечер для всех гостей курорта.", "Ein entspannter Abend für das gesamte Resort."),
    location: "Garden Stage",
    status: "confirmed",
    booking: false,
    staff: "Entertainment team",
    icon: "music",
  },
  // August 30 & 31 - Rich live schedule
  {
    id: "act-30-01",
    date: "2026-08-30",
    start: "07:30",
    end: "08:15",
    category: "Wellness",
    title: L("Sunrise yoga & Aegean breathwork", "Gündoğumu yoga ve Ege nefes meditasyonu", "Йога на рассвете и дыхательные практики", "Sonnenaufgangs-Yoga & Ägäis-Atemübungen"),
    description: L("Start softly with gentle morning flows above the crystal Aegean.", "Ege'nin berrak suları üzerinde yumuşak sabah yogasıyla güne başlayın.", "Начните день с мягкой утренней йоги над кристальными водами Эгеи.", "Starten Sie sanft mit Morgen-Yoga über der kristallklaren Ägäis."),
    location: "Lotus Yoga Pier",
    status: "confirmed",
    booking: false,
    staff: "Wellness team",
    icon: "sun",
  },
  {
    id: "act-30-02",
    date: "2026-08-30",
    start: "10:30",
    end: "11:15",
    category: "Pool",
    title: L("Aqua rhythm & pool vitality", "Aqua rhythm ve havuz canlılığı", "Аква-ритм и энергия бассейна", "Aqua-Rhythmus & Pool-Vitalität"),
    description: L("Upbeat pool movement and music with our entertainment team.", "Animasyon ekibimizle neşeli havuz jimnastiği ve müzik ritimleri.", "Энергичная водная гимнастика под музыку с командой анимации.", "Schwungvolle Wassergymnastik mit unserem Entertainment-Team."),
    location: "Main Pool",
    status: "confirmed",
    booking: false,
    staff: "Activities team",
    icon: "waves",
  },
  {
    id: "act-30-03",
    date: "2026-08-30",
    start: "12:30",
    end: "14:00",
    category: "Dining",
    title: L("Aegean seafood & gourmet lunch", "Ege deniz ürünleri ve gurme öğle servisi", "Эгейские морепродукты и обед", "Ägäische Meeresfrüchte & Gourmet-Lunch"),
    description: L("Fresh catch, local herbs, and Mediterranean long-table dining.", "Taze balıklar, yerel otlar ve Akdeniz uzun masa lezzetleri.", "Свежий улов, местные травы и средиземноморские деликатесы.", "Frischer Fang, lokale Kräuter und mediterrane Gaumenfreuden."),
    location: "Lotus Restaurant",
    status: "confirmed",
    booking: false,
    staff: "F&B team",
    icon: "utensils",
  },
  {
    id: "act-30-04",
    date: "2026-08-30",
    start: "15:00",
    end: "16:00",
    category: "Water Sports",
    title: L("Water sports desk & paddleboard", "Su sporları masası ve paddleboard", "Водные виды спорта и сапбординг", "Wassersport & Paddleboarding"),
    description: L("Paddleboarding, wind conditions and equipment rental at the shoreline.", "Sahilde paddleboard, rüzgar durumu ve ekipman kiralama danışmanlığı.", "Сапбординг, аренда оборудования и консультация по ветровым условиям.", "Paddleboarding, Windbedingungen und Ausrüstungsverleih am Ufer."),
    location: "Beachfront",
    status: "pending",
    booking: true,
    capacity: "Capacity to be confirmed",
    staff: "Beach team",
    icon: "anchor",
  },
  {
    id: "act-30-05",
    date: "2026-08-30",
    start: "17:45",
    end: "18:30",
    category: "Beach",
    title: L("Golden sunset tea on the pier", "İskelede altın gün batımı çayı", "Чай на закате на пирсе", "Goldener Sonnenuntergangs-Tee am Steg"),
    description: L("Traditional tea and Turkish sweets as the bay turns to amber.", "Koy kehribar rengine dönerken geleneksel çay ve ikramlar.", "Традиционный чай и восточные сладости, когда залив окрашивается в янтарь.", "Traditioneller Tee und türkische Köstlichkeiten bei goldenem Licht."),
    location: "Lotus Pier",
    status: "confirmed",
    booking: false,
    staff: "Guest relations",
    icon: "sunset",
  },
  {
    id: "act-30-06",
    date: "2026-08-30",
    start: "20:30",
    end: "22:00",
    category: "Entertainment",
    title: L("Live music under the pines", "Çamların altında canlı müzik", "Живая музыка под соснами", "Live-Musik unter den Pinien"),
    description: L("Acoustic Mediterranean melodies and evening vocals under the starlight.", "Yıldızlar altında Akdeniz melodileri ve canlı vokal performansı.", "Средиземноморские мелодии и живой вокал под звездным небом.", "Akustische Melodien und Live-Gesang unter dem Sternenhimmel."),
    location: "Garden Stage",
    status: "confirmed",
    booking: false,
    staff: "Entertainment team",
    icon: "music",
  },
];

export const featureCards = [
  { title: "Dining", eyebrow: "Taste the coast", description: "Restaurant hours, menus and table moments — gathered in one view.", image: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/restoran1.jpg", href: "/dining", accent: "sand" },
  { title: "Wellness", eyebrow: "A softer pace", description: "Spa rituals, movement and quiet corners for your own kind of reset.", image: "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/service4.jpg", href: "/wellness", accent: "tide" },
  { title: "ICON Beach", eyebrow: "Next door, after dark", description: "Discover waterside programs, dining and weekly beach energy.", image: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/LOTUS%20BEACH%20AERIAL%20VIEW.jpg", href: "/icon-beach", accent: "navy" },
];

export const activitiesSectionCopy = {
  eyebrow: L("ACTIVITIES", "AKTİVİTELER", "ACTIVIDADES", "AKTIVITÄTEN", "АКТИВНОСТИ", "ACTIVITÉS", "الأنشطة", "فعالیت‌ها"),
  title: L("LIVE EVERY MOMENT TO THE FULLEST", "HER ANI DOLU DOLU YAŞAYIN", "VIVE CADA MOMENTO AL MÁXIMO", "JEDEN MOMENT IN VOLLEN ZÜGEN ERLEBEN", "ПРОЖИВАЙТЕ КАЖДЫЙ МОМЕНТ ПОЛНОСТЬЮ", "VIVEZ CHAQUE INSTANT PLEINEMENT", "عِش كل لحظة إلى أقصى حد", "هر لحظه را به بهترین شکل زندگی کنید"),
  description: L(
    "Live every moment to the fullest with our fun and relaxing activities that will make your holiday unforgettable. Explore all the options that await you at Lotus.",
    "Her anı dolu dolu yaşayın; tatilinizi unutulmaz kılacak eğlenceli ve dinlendirici aktivitelerimizi keşfedin. Lotus'ta sizi bekleyen tüm seçeneklere göz atın.",
    "Vive cada momento al máximo con nuestras actividades divertidas y relajantes que harán tus vacaciones inolvidables. Descubre todas las opciones que te esperan en Lotus.",
    "Erleben Sie jeden Moment in vollen Zügen mit unseren unterhaltsamen und entspannenden Aktivitäten, die Ihren Urlaub unvergesslich machen. Entdecken Sie alle Möglichkeiten, die Sie im Lotus erwarten.",
    "Проживайте каждый момент на полную с нашими весёлыми и расслабляющими занятиями, которые сделают ваш отдых незабываемым. Откройте все возможности, которые ждут вас в Lotus.",
    "Vivez chaque instant pleinement grâce à nos activités ludiques et relaxantes qui rendront vos vacances inoubliables. Découvrez toutes les expériences qui vous attendent au Lotus.",
    "عِش كل لحظة إلى أقصى حد مع أنشطتنا الممتعة والمريحة التي ستجعل عطلتك لا تُنسى. اكتشف كل الخيارات التي تنتظرك في لوتس.",
    "هر لحظه را با فعالیت‌های سرگرم‌کننده و آرامش‌بخش ما به بهترین شکل زندگی کنید؛ فعالیت‌هایی که تعطیلات شما را فراموش‌نشدنی می‌کنند. همه گزینه‌هایی را که در لوتوس منتظر شما هستند کشف کنید."
  ),
};

export const activitiesGalleryImages = [
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/Yoga-2_1200x800.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/beach_800x1200.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/aquapark_800x1200.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/venue-yatay_800x1200.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/pools_800x1200.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/watersport_799x1200.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/spa_800x1200.jpg",
];

export const spaSectionCopy = {
  eyebrow: L("SPA", "SPA", "SPA", "SPA", "SPA", "SPA", "سبا", "اسپا"),
  title: L("REST YOUR SOUL AND BODY", "RUHUNUZU VE BEDENİNİZİ DİNLENDİRİN", "DESCANSA TU CUERPO Y TU ALMA", "ENTSPANNEN SIE KÖRPER UND SEELE", "ОТДОХНИТЕ ДУШОЙ И ТЕЛОМ", "REPOSEZ VOTRE ÂME ET VOTRE CORPS", "أَرِح روحك وجسدك", "روح و بدن خود را آرام کنید"),
  description: L(
    "You're in the right place to pamper yourself with our professional spa services that will relax your mind and body at Lotus.",
    "Lotus'ta zihninizi ve bedeninizi rahatlatacak profesyonel spa hizmetleriyle kendinizi şımartmak için doğru yerdesiniz.",
    "Estás en el lugar adecuado para mimarte con nuestros servicios profesionales de spa, que relajarán tu mente y tu cuerpo en Lotus.",
    "Hier sind Sie genau richtig, um sich mit unseren professionellen Spa-Anwendungen zu verwöhnen, die Körper und Geist im Lotus entspannen.",
    "Вы в правильном месте, чтобы побаловать себя профессиональными спа-процедурами, которые расслабят ваш разум и тело в Lotus.",
    "Vous êtes au bon endroit pour vous faire plaisir avec nos services spa professionnels, qui détendront votre esprit et votre corps au Lotus.",
    "أنت في المكان المناسب لتدلّل نفسك بخدمات السبا الاحترافية التي ستريح عقلك وجسدك في لوتس.",
    "برای مراقبت از خود با خدمات حرفه‌ای اسپا که ذهن و بدن شما را در لوتوس آرام می‌کند، به جای درستی آمده‌اید."
  ),
  photosLabel: L("PHOTOS FROM OUR SPA AREA", "SPA ALANIMIZDAN KARELER", "FOTOS DE NUESTRA ZONA DE SPA", "FOTOS AUS UNSEREM SPA-BEREICH", "ФОТОГРАФИИ ИЗ НАШЕЙ SPA-ЗОНЫ", "PHOTOS DE NOTRE ESPACE SPA", "صور من منطقة السبا لدينا", "تصاویری از فضای اسپای ما"),
  services: [
    {
      title: L("Skin and Body Care", "Cilt ve Vücut Bakımı", "Cuidado de la piel y el cuerpo", "Haut- und Körperpflege", "Уход за кожей и телом", "Soins du visage et du corps", "العناية بالبشرة والجسم", "مراقبت از پوست و بدن"),
      description: L("Add shine to your beauty naturally.", "Güzelliğinize doğal bir ışıltı katın.", "Añade un brillo natural a tu belleza.", "Verleihen Sie Ihrer Schönheit natürlichen Glanz.", "Добавьте своей красоте естественное сияние.", "Révélez naturellement votre beauté.", "أضف إشراقة طبيعية إلى جمالك.", "به زیبایی خود درخششی طبیعی ببخشید."),
    },
    {
      title: L("Sauna & Steam Room", "Sauna ve Buhar Odası", "Sauna y baño de vapor", "Sauna & Dampfbad", "Сауна и парная", "Sauna et hammam", "الساونا وغرفة البخار", "سونا و اتاق بخار"),
      description: L("Purify your body with detox effect.", "Detoks etkisiyle bedeninizi arındırın.", "Purifica tu cuerpo con un efecto detox.", "Reinigen Sie Ihren Körper mit einem Detox-Effekt.", "Очищайте тело с детокс-эффектом.", "Purifiez votre corps grâce à l'effet détox.", "نقِّ جسدك مع تأثير التخلص من السموم.", "با اثر سم‌زدایی بدن خود را پاکسازی کنید."),
    },
    {
      title: L("Professional Massages", "Profesyonel Masajlar", "Masajes profesionales", "Professionelle Massagen", "Профессиональный массаж", "Massages professionnels", "جلسات تدليك احترافية", "ماساژهای حرفه‌ای"),
      description: L("Relax your soul with Far Eastern and classical techniques.", "Uzak Doğu ve klasik tekniklerle ruhunuzu dinlendirin.", "Relaja tu alma con técnicas orientales y clásicas.", "Entspannen Sie Ihre Seele mit fernöstlichen und klassischen Techniken.", "Расслабьте душу с помощью дальневосточных и классических техник.", "Détendez votre âme grâce aux techniques d'Extrême-Orient et classiques.", "أرح روحك بتقنيات الشرق الأقصى والتقنيات الكلاسيكية.", "با تکنیک‌های شرقی و کلاسیک روح خود را آرام کنید."),
    },
  ],
};

export const spaGalleryImages = [
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/spa5.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/spa3.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/spa1.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/spa5.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/spa2.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/spa4.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/facility1.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/06/Blue-Bar-5_1200x800-800x533.jpg",
];

export const restaurantBarSectionCopy = {
  eyebrow: L("RESTAURANT & BAR", "RESTORAN VE BAR", "RESTAURANTE Y BAR", "RESTAURANT & BAR", "РЕСТОРАН И БАР", "RESTAURANT & BAR", "المطعم والبار", "رستوران و بار"),
  title: L("GASTRONOMY FEAST", "GASTRONOMİ ŞÖLENİ", "FIESTA GASTRONÓMICA", "EIN FEST DER GASTRONOMIE", "ГАСТРОНОМИЧЕСКИЙ ПИР", "FESTIN GASTRONOMIQUE", "مأدبة من فنون الطهي", "جشن طعم‌ها"),
  description: L(
    "A unique culinary experience awaits you in our restaurant and bar areas, with our exquisite menus ranging from local to international cuisine, and refreshing drinks.",
    "Restoran ve bar alanlarımızda, yerel lezzetlerden dünya mutfağına uzanan seçkin menüler ve ferahlatıcı içeceklerle eşsiz bir gastronomi deneyimi sizi bekliyor.",
    "Una experiencia culinaria única te espera en nuestras zonas de restaurante y bar, con exquisitos menús que van de la cocina local a la internacional y bebidas refrescantes.",
    "In unseren Restaurant- und Barbereichen erwartet Sie ein einzigartiges kulinarisches Erlebnis mit erlesenen Menüs von lokaler bis internationaler Küche und erfrischenden Getränken.",
    "В наших ресторанах и барах вас ждёт уникальное гастрономическое путешествие с изысканными меню от местной до международной кухни и освежающими напитками.",
    "Une expérience culinaire unique vous attend dans nos restaurants et bars, avec des menus raffinés allant de la cuisine locale à la cuisine internationale et des boissons rafraîchissantes.",
    "تجربة طهي فريدة بانتظارك في مطاعمنا وباراتنا، مع قوائم شهية تتنوع بين المأكولات المحلية والعالمية ومشروبات منعشة.",
    "در بخش‌های رستوران و بار ما، با منوهای نفیس از غذاهای محلی تا بین‌المللی و نوشیدنی‌های گوارا، تجربه‌ای بی‌نظیر از آشپزی در انتظار شماست."
  ),
  restaurantsLabel: L("Our restaurants", "Restoranlarımız", "Nuestros restaurantes", "Unsere Restaurants", "Наши рестораны", "Nos restaurants", "مطاعمنا", "رستوران‌های ما"),
  barsLabel: L("Our bars", "Barlarımız", "Nuestros bares", "Unsere Bars", "Наши бары", "Nos bars", "باراتنا", "بارهای ما"),
  photosLabel: L("PHOTOS FROM OUR RESTAURANT & BAR AREAS", "RESTORAN VE BAR ALANLARIMIZDAN KARELER", "FOTOS DE NUESTRAS ZONAS DE RESTAURANTE Y BAR", "FOTOS AUS UNSEREN RESTAURANT- UND BARBEREICHEN", "ФОТОГРАФИИ ИЗ НАШИХ РЕСТОРАНОВ И БАРОВ", "PHOTOS DE NOS ESPACES RESTAURANT ET BAR", "صور من مناطق المطعم والبار لدينا", "تصاویری از فضاهای رستوران و بار ما"),
  breakfast: L("Breakfast", "Kahvaltı", "Desayuno", "Frühstück", "Завтрак", "Petit-déjeuner", "الإفطار", "صبحانه"),
  lateBreakfast: L("Late Breakfast", "Geç Kahvaltı", "Desayuno tardío", "Spätes Frühstück", "Поздний завтрак", "Petit-déjeuner tardif", "الإفطار المتأخر", "صبحانه دیرهنگام"),
  lunch: L("Lunch", "Öğle Yemeği", "Almuerzo", "Mittagessen", "Обед", "Déjeuner", "الغداء", "ناهار"),
  dinner: L("Dinner", "Akşam Yemeği", "Cena", "Abendessen", "Ужин", "Dîner", "العشاء", "شام"),
  nightSnack: L("Night Snack", "Gece Atıştırması", "Tentempié nocturno", "Nacht-Snack", "Ночной перекус", "Snack de nuit", "وجبة خفيفة ليلية", "میان‌وعده شبانه"),
  specialMenu: L("Special Menu", "Özel Menü", "Menú especial", "Spezialmenü", "Специальное меню", "Menu spécial", "قائمة خاصة", "منوی ویژه"),
  booking: L("Booking in advance", "Önceden rezervasyon", "Reserva previa", "Reservierung im Voraus", "Бронирование заранее", "Réservation à l'avance", "الحجز مسبقاً", "رزرو از قبل"),
  snackBar: L("SNACK BAR", "SNACK BAR", "SNACK BAR", "SNACK-BAR", "СНЕК-БАР", "SNACK-BAR", "بار الوجبات الخفيفة", "اسنک‌بار"),
};

export const restaurantBarGalleryImages = [
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/06/Blue-Bar-5_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/06/italian-alacarte.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/06/osmanli-alacarte.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/06/R-3_900x600-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/rest_900x600.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/06/Lotus-Lobby-Bar_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/06/La-Patisserie_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/06/Relax-Pool_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/06/Tween-Pools_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/06/R-3_900x600.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/06/cin-alacarte.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/06/Beach-Bar_1200x800-800x533.jpg",
];

export const restaurantBarVenues = {
  restaurants: [
    { name: "Pine Restaurant", details: ["07:00 – 10:00", "10:00 – 11:00", "12:30 – 14:30", "19:00 – 21:30", "23:00 – 02:00"], labels: ["breakfast", "lateBreakfast", "lunch", "dinner", "nightSnack"] as const },
    { name: "Olive Tree Italian A’La Carte", details: ["19:00 – 21:30"], labels: ["specialMenu"] as const, booking: true },
    { name: "Turquoise Turkish A’La Carte", details: ["19:00 – 21:30"], labels: ["specialMenu"] as const, booking: true },
    { name: "Chinesee Garden A’La Carte", details: ["19:00 – 21:30"], labels: ["specialMenu"] as const, booking: true },
    { name: "Tapas Snack Bar", details: ["12:00 – 17:00"], labels: ["snackBar"] as const },
    { name: "Aqua Snack Bar", details: ["12:00 – 17:00"], labels: ["snackBar"] as const },
  ],
  bars: ["Lotus Lobby Bar", "Blue Bar", "La Patisserie", "Relax Pool Bar", "Tapas Pool Bar", "Twin Pool Bar", "Aqua Bar", "Beach Bar", "Spa Vitamin Bar"],
};

export const miniClubSectionCopy = {
  eyebrow: L("MINI CLUB", "MİNİ KULÜP", "MINI CLUB", "MINI-CLUB", "МИНИ-КЛУБ", "MINI-CLUB", "النادي الصغير", "مینی کلاب"),
  title: L("SPECIAL FUN FOR CHILDREN", "ÇOCUKLAR İÇİN ÖZEL EĞLENCE", "DIVERSIÓN ESPECIAL PARA NIÑOS", "BESONDERER SPASS FÜR KINDER", "ОСОБЕННЫЕ РАЗВЛЕЧЕНИЯ ДЛЯ ДЕТЕЙ", "DES MOMENTS MAGIQUES POUR LES ENFANTS", "متعة خاصة للأطفال", "سرگرمی ویژه برای کودکان"),
  description: L(
    "Enjoy yourselves while your children have an unforgettable holiday in our fun and safe Mini Club area, specially designed for our little guests.",
    "Siz keyfinize bakarken çocuklarınız, küçük misafirlerimiz için özel olarak tasarlanan eğlenceli ve güvenli Mini Kulüp alanımızda unutulmaz bir tatil geçirsin.",
    "Disfruta mientras tus hijos viven unas vacaciones inolvidables en nuestro Mini Club divertido y seguro, diseñado especialmente para los más pequeños.",
    "Genießen Sie Ihre Zeit, während Ihre Kinder in unserem unterhaltsamen und sicheren Mini-Club, der speziell für kleine Gäste gestaltet wurde, unvergessliche Ferien erleben.",
    "Отдыхайте, пока ваши дети проводят незабываемые каникулы в нашем весёлом и безопасном Мини-клубе, созданном специально для маленьких гостей.",
    "Profitez de votre séjour pendant que vos enfants vivent des vacances inoubliables dans notre Mini-Club ludique et sécurisé, conçu pour les plus petits.",
    "استمتعوا بوقتكم بينما يقضي أطفالكم عطلة لا تُنسى في نادينا الصغير الممتع والآمن، المصمم خصيصاً لضيوفنا الصغار.",
    "از تعطیلات خود لذت ببرید و بگذارید کودکانتان در مینی‌کلاب شاد و امن ما، که مخصوص مهمانان کوچک طراحی شده، تعطیلاتی فراموش‌نشدنی داشته باشند."
  ),
  age: L("4–12 Years Old", "4–12 Yaş", "De 4 a 12 años", "4–12 Jahre", "От 4 до 12 лет", "De 4 à 12 ans", "من 4 إلى 12 عاماً", "۴ تا ۱۲ سال"),
  hours: "10:00–12:00 / 14:30–17:30",
  supervisors: L("Professional Supervisors", "Profesyonel Eğitmenler", "Supervisores profesionales", "Professionelle Betreuung", "Профессиональные инструкторы", "Encadrement professionnel", "مشرفون محترفون", "مربیان حرفه‌ای"),
  aboutTitle: L("About Mini Club", "Mini Kulüp Hakkında", "Sobre el Mini Club", "Über den Mini-Club", "О Мини-клубе", "À propos du Mini-Club", "عن النادي الصغير", "درباره مینی‌کلاب"),
  aboutDescription: L(
    "Our hotel's Mini Club is a specially designed entertainment area to make your children's holidays unforgettable. We offer both educational and fun activities, accompanied by expert instructors.",
    "Otelimizin Mini Kulübü, çocuklarınızın tatilini unutulmaz kılmak için özel olarak tasarlanmış bir eğlence alanıdır. Uzman eğitmenler eşliğinde eğitici ve eğlenceli aktiviteler sunuyoruz.",
    "El Mini Club de nuestro hotel es un espacio de entretenimiento diseñado para hacer inolvidables las vacaciones de tus hijos. Ofrecemos actividades educativas y divertidas acompañadas por instructores expertos.",
    "Der Mini-Club unseres Hotels ist ein speziell gestalteter Unterhaltungsbereich, der den Urlaub Ihrer Kinder unvergesslich macht. Mit erfahrenen Betreuern bieten wir lehrreiche und unterhaltsame Aktivitäten.",
    "Мини-клуб нашего отеля — это специально созданная зона развлечений, чтобы сделать отдых ваших детей незабываемым. Мы предлагаем познавательные и весёлые занятия под руководством опытных инструкторов.",
    "Le Mini-Club de notre hôtel est un espace de loisirs spécialement conçu pour rendre les vacances de vos enfants inoubliables. Nous proposons des activités éducatives et ludiques encadrées par des moniteurs experts.",
    "النادي الصغير في فندقنا هو منطقة ترفيهية مصممة خصيصاً لجعل عطلة أطفالكم لا تُنسى. نقدم أنشطة تعليمية وممتعة برفقة مدربين خبراء.",
    "مینی‌کلاب هتل ما فضایی تفریحی است که برای فراموش‌نشدنی کردن تعطیلات کودکان شما طراحی شده است. فعالیت‌های آموزشی و سرگرم‌کننده را با همراهی مربیان متخصص ارائه می‌دهیم."
  ),
  scheduleTitle: L("KIDS ACTIVITY SCHEDULE", "ÇOCUK AKTİVİTE PROGRAMI", "PROGRAMA DE ACTIVIDADES INFANTILES", "KINDER-AKTIVITÄTSPLAN", "РАСПИСАНИЕ ДЕТСКИХ ЗАНЯТИЙ", "PROGRAMME D'ACTIVITÉS ENFANTS", "جدول أنشطة الأطفال", "برنامه فعالیت کودکان"),
  features: [
    L("Safe and hygienic environment", "Güvenli ve hijyenik ortam", "Entorno seguro e higiénico", "Sichere und hygienische Umgebung", "Безопасная и гигиеничная среда", "Environnement sûr et hygiénique", "بيئة آمنة ونظيفة", "محیطی امن و بهداشتی"),
    L("Activities specific to age groups", "Yaş gruplarına özel aktiviteler", "Actividades por grupos de edad", "Altersgerechte Aktivitäten", "Занятия по возрастным группам", "Activités adaptées aux âges", "أنشطة مخصصة للفئات العمرية", "فعالیت‌های متناسب با گروه‌های سنی"),
    L("Creative workshops", "Yaratıcı atölyeler", "Talleres creativos", "Kreativ-Workshops", "Творческие мастер-классы", "Ateliers créatifs", "ورش إبداعية", "کارگاه‌های خلاقانه"),
    L("Educational games", "Eğitici oyunlar", "Juegos educativos", "Lernspiele", "Познавательные игры", "Jeux éducatifs", "ألعاب تعليمية", "بازی‌های آموزشی"),
  ],
};

export const miniClubGalleryImages = [
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/mini-club-2.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/mini-club-3.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/mini-club-4.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/mini-club-1.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/mini-club-2.jpg",
];

export const miniClubWeekDays: Record<Locale, string[]> = {
  en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  tr: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
  ru: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
  de: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
};

export const miniClubWeekSchedule = [
  ["10:00 – 11:00", "Drawing", "Çizim", "Dibujo", "Zeichnen", "Рисование", "Dessin", "الرسم", "نقاشی"],
  ["11:00 – 12:30", "Board Games", "Masa Oyunları", "Juegos de mesa", "Brettspiele", "Настольные игры", "Jeux de société", "ألعاب الطاولة", "بازی‌های رومیزی"],
  ["14:30 – 15:30", "Sand Painting", "Kum Boyama", "Pintura con arena", "Sandmalerei", "Рисование песком", "Peinture sur sable", "الرسم بالرمل", "نقاشی با شن"],
  ["15:30 – 17:00", "Movie Time", "Film Saati", "Hora de cine", "Filmzeit", "Время кино", "Séance cinéma", "وقت مشاهدة الأفلام", "زمان فیلم"],
  ["10:00 – 11:00", "Drawing", "Çizim", "Dibujo", "Zeichnen", "Рисование", "Dessin", "الرسم", "نقاشی"],
  ["11:00 – 12:30", "Puzzles", "Puzzle", "Puzles", "Puzzles", "Пазлы", "Puzzles", "الألغاز", "پازل"],
  ["14:30 – 15:30", "Arts and Crafts", "Sanat ve El İşi", "Arte y manualidades", "Kunst und Basteln", "Творчество и рукоделие", "Arts plastiques et loisirs créatifs", "الفنون والأشغال اليدوية", "هنر و کاردستی"],
  ["15:30 – 17:00", "T-shirt Painting", "Tişört Boyama", "Pintura de camisetas", "T-Shirt-Bemalen", "Роспись футболок", "Peinture sur t-shirts", "تزيين القمصان بالرسم", "نقاشی روی تی‌شرت"],
  ["10:00 – 11:00", "Drawing", "Çizim", "Dibujo", "Zeichnen", "Рисование", "Dessin", "الرسم", "نقاشی"],
  ["11:00 – 12:30", "Hand Crafts", "El İşi", "Trabajos manuales", "Handarbeit", "Ручные поделки", "Travaux manuels", "أشغال يدوية", "صنایع دستی"],
  ["14:30 – 15:30", "Glitter Tattoo", "Simli Dövme", "Tatuaje de purpurina", "Glitzer-Tattoo", "Блестящие татуировки", "Tatouage pailleté", "وشم لامع", "تتو اکلیلی"],
  ["15:30 – 17:00", "Movie Time", "Film Saati", "Hora de cine", "Filmzeit", "Время кино", "Séance cinéma", "وقت مشاهدة الأفلام", "زمان فیلم"],
  ["10:00 – 11:00", "Drawing", "Çizim", "Dibujo", "Zeichnen", "Рисование", "Dessin", "الرسم", "نقاشی"],
  ["11:00 – 12:30", "Play Dough", "Oyun Hamuru", "Plastilina", "Knete", "Пластилин", "Pâte à modeler", "عجينة اللعب", "خمیر بازی"],
  ["14:30 – 15:30", "Bracelet Making", "Bileklik Yapımı", "Creación de pulseras", "Armbänder basteln", "Изготовление браслетов", "Création de bracelets", "صنع الأساور", "ساخت دستبند"],
  ["15:30 – 17:00", "Have a Picnic", "Piknik Zamanı", "Picnic", "Picknick", "Пикник", "Pique-nique", "نزهة", "پیک‌نیک"],
  ["10:00 – 11:00", "Drawing", "Çizim", "Dibujo", "Zeichnen", "Рисование", "Dessin", "الرسم", "نقاشی"],
  ["11:00 – 12:30", "Card Games", "Kart Oyunları", "Juegos de cartas", "Kartenspiele", "Карточные игры", "Jeux de cartes", "ألعاب الورق", "بازی‌های کارتی"],
  ["14:30 – 15:30", "Origami", "Origami", "Origami", "Origami", "Оригами", "Origami", "الأوريغامي", "اوریگامی"],
  ["15:30 – 17:00", "Bag Painting", "Çanta Boyama", "Pintura de bolsas", "Taschen bemalen", "Роспись сумок", "Peinture sur sacs", "الرسم على الحقائب", "نقاشی روی کیف"],
  ["10:00 – 11:00", "Drawing", "Çizim", "Dibujo", "Zeichnen", "Рисование", "Dessin", "الرسم", "نقاشی"],
  ["11:00 – 12:30", "Make a Mask", "Maske Yapımı", "Hacer una máscara", "Masken basteln", "Изготовление масок", "Création de masques", "صنع الأقنعة", "ساخت ماسک"],
  ["14:30 – 15:30", "Sand Painting", "Kum Boyama", "Pintura con arena", "Sandmalerei", "Рисование песком", "Peinture sur sable", "الرسم بالرمل", "نقاشی با شن"],
  ["15:30 – 17:00", "Face Paint", "Yüz Boyama", "Pintura facial", "Gesichtsbemalung", "Аквагрим", "Maquillage artistique", "الرسم على الوجه", "نقاشی صورت"],
  ["10:00 – 11:00", "Drawing", "Çizim", "Dibujo", "Zeichnen", "Рисование", "Dessin", "الرسم", "نقاشی"],
  ["11:00 – 12:30", "Bracelet Making", "Bileklik Yapımı", "Creación de pulseras", "Armbänder basteln", "Изготовление браслетов", "Création de bracelets", "صنع الأساور", "ساخت دستبند"],
  ["14:30 – 15:30", "Glitter Tattoo", "Simli Dövme", "Tatuaje de purpurina", "Glitzer-Tattoo", "Блестящие татуировки", "Tatouage pailleté", "وشم لامع", "تتو اکلیلی"],
  ["15:30 – 17:00", "Puzzles", "Puzzle", "Puzles", "Puzzles", "Пазлы", "Puzzles", "الألغاز", "پازل"],
].map(([time, en, tr, es, de, ru, fr, ar, fa], index) => ({ dayIndex: Math.floor(index / 4), time, title: L(en, tr, es, de, ru, fr, ar, fa) }));

export const diningGalleryImages = [
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/lobi2.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/8_900x600.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/facility5.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/service4.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/cocuk1.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/JAC-3_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/lobi1.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/4_900x600.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/10_900x600.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/service2.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/SEA-2_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/oda-manzarasi.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/kaydirak2.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/facility6.jpg",
  "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LEGACY/OUR%20LEGACY%20LANDING%20PAGE%20IMAGE.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/SIDE-1_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/6_900x600.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/11_900x600-1.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/LRG-L-3_1200x800-800x533.jpg",
  "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/LOTUS%20BEACH%20AERIAL%20VIEW.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/eventbanner3.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/DJI_0897.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/restoran2.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/lobi3.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/restoran1.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/3_900x600.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/cocuk2.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/1_900x600.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/9_900x600.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/2_900x600.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/LRG-S-1_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/FAM-L-5_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/7_900x600.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/5_900x600.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/lobi2-1.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/genel1.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/FAM-S-7_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/LAND-1_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/eventbanner4.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/kaydirak1.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/eventbanner2.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/facility8.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/facility7.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/PRO-1_1200x800-800x533.jpg",
];

export const directoryItems = [
  { title: "Rooms & suites", detail: "26–40 m² · Sea and land views", icon: "bed", href: "#rooms" },
  { title: "Pools & beach", detail: "Main pool · Indoor pool · Private shoreline", icon: "waves", href: "#facilities" },
  { title: "Restaurants & bars", detail: "Opening hours and menus", icon: "utensils", href: "/dining" },
  { title: "Spa & wellness", detail: "Treatments · Fitness · Sauna", icon: "sparkle", href: "/wellness" },
  { title: "Hotel map", detail: "Find your way around the grounds", icon: "map", href: "#map" },
  { title: "Guest services", detail: "Reception · Transfers · Housekeeping", icon: "concierge", href: "#services" },
];

export const accommodationSectionCopy = {
  eyebrow: L("ACCOMMODATION", "KONAKLAMA", "ALOJAMIENTO", "UNTERKUNFT", "ПРОЖИВАНИЕ", "HÉBERGEMENT", "الإقامة", "اقامت"),
  title: L("LUXURY & PEACE", "LÜKS VE HUZUR", "LUJO Y TRANQUILIDAD", "LUXUS & RUHE", "РОСКОШЬ И ПОКОЙ", "LUXE & SÉRÉNITÉ", "الفخامة والهدوء", "لوکس و آرامش"),
  description: L(
    "You can find detailed information about our rooms, which combine comfort, peace, and elegance, here and discover the accommodation option that best suits you.",
    "Konfor, huzur ve zarafeti bir araya getiren odalarımız hakkında detaylı bilgiyi burada bulabilir, size en uygun konaklama seçeneğini keşfedebilirsiniz.",
    "Aquí encontrarás información detallada sobre nuestras habitaciones, que combinan confort, tranquilidad y elegancia, y podrás descubrir la opción que mejor se adapte a ti.",
    "Hier finden Sie ausführliche Informationen zu unseren Zimmern, die Komfort, Ruhe und Eleganz verbinden, und entdecken die Unterkunft, die am besten zu Ihnen passt.",
    "Здесь вы найдёте подробную информацию о наших номерах, сочетающих комфорт, спокойствие и элегантность, и сможете выбрать подходящий вариант проживания.",
    "Découvrez ici toutes les informations sur nos chambres, qui allient confort, calme et élégance, et trouvez l’hébergement qui vous convient le mieux.",
    "يمكنك هنا العثور على معلومات مفصلة عن غرفنا التي تجمع بين الراحة والهدوء والأناقة، واكتشاف خيار الإقامة الأنسب لك.",
    "در اینجا اطلاعات کامل اتاق‌هایی را می‌یابید که راحتی، آرامش و ظرافت را ترکیب کرده‌اند و می‌توانید مناسب‌ترین گزینه اقامت را انتخاب کنید."
  ),
  viewDetails: L("View details", "Detayları görüntüle", "Ver detalles", "Details ansehen", "Подробнее", "Voir les détails", "عرض التفاصيل", "مشاهده جزئیات"),
  roomsLabel: L("Rooms & suites", "Odalar ve süitler", "Habitaciones y suites", "Zimmer & Suiten", "Номера и люксы", "Chambres & suites", "الغرف والأجنحة", "اتاق‌ها و سوئیت‌ها"),
  photosLabel: L("PHOTOS FROM OUR ACCOMMODATION", "KONAKLAMA ALANLARIMIZDAN KARELER", "FOTOS DE NUESTRO ALOJAMIENTO", "FOTOS AUS UNSEREN UNTERKÜNFTEN", "ФОТОГРАФИИ НАШИХ НОМЕРОВ", "PHOTOS DE NOS HÉBERGEMENTS", "صور من أماكن الإقامة لدينا", "تصاویری از فضای اقامت ما"),
  guests: L("Guest", "Misafir", "Huésped", "Gast", "Гость", "Voyageur", "ضيف", "مهمان"),
  bed: L("Bed", "Yatak", "Cama", "Bett", "Кровать", "Lit", "سرير", "تخت"),
  bath: L("Bath", "Banyo", "Baño", "Bad", "Ванная", "Salle de bain", "حمام", "حمام"),
};

export const accommodationGalleryImages = [
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/FAM-S-7_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/FAM-L-5_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/SEA-2_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/icon/banyobeyaz.png",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/JAC-3_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/LRG-S-1_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/LRG-L-3_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/LAND-1_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/icon/yatakbeyaz.png",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/C-1_1200x600.jpg",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/icon/misafirbeyaz.png",
  "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/icon/metrebeyaz.png",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/SIDE-1_1200x800-800x533.jpg",
  "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/PRO-1_1200x800-800x533.jpg",
];

export const accommodationIcons = {
  bath: "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/icon/banyobeyaz.png",
  bed: "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/icon/yatakbeyaz.png",
  guests: "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/icon/misafirbeyaz.png",
  size: "https://www.orkalotusbeach.com/wp-content/themes/yktheme/assets/img/icon/metrebeyaz.png",
};

export const roomOptions = [
  { name: L("Standard Room (Economy)", "Standart Oda (Ekonomik)", "Habitación estándar (económica)", "Standardzimmer (Economy)", "Стандартный номер (эконом)", "Chambre standard (économique)", "غرفة قياسية (اقتصادية)", "اتاق استاندارد (اکونومی)"), size: "24 m²", guests: 3, beds: L("1 Double, 1 Single", "1 Çift, 1 Tek", "1 doble, 1 individual", "1 Doppelbett, 1 Einzelbett", "1 двуспальная, 1 односпальная", "1 double, 1 simple", "سرير مزدوج واحد وسرير مفرد واحد", "۱ تخت دونفره، ۱ تخت یک‌نفره"), bath: 1, image: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/LAND-1_1200x800-800x533.jpg" },
  { name: L("Standard Room (Land View)", "Standart Oda (Kara Manzaralı)", "Habitación estándar (vista al jardín)", "Standardzimmer (Landblick)", "Стандартный номер (вид на сушу)", "Chambre standard (vue sur les terres)", "غرفة قياسية (إطلالة برية)", "اتاق استاندارد (نمای زمین)"), size: "26 m²", guests: 3, beds: L("1 Double, 1 Single", "1 Çift, 1 Tek", "1 doble, 1 individual", "1 Doppelbett, 1 Einzelbett", "1 двуспальная, 1 односпальная", "1 double, 1 simple", "سرير مزدوج واحد وسرير مفرد واحد", "۱ تخت دونفره، ۱ تخت یک‌نفره"), bath: 1, image: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/LRG-S-1_1200x800-800x533.jpg" },
  { name: L("Standard Room (Side Sea View)", "Standart Oda (Yan Deniz Manzaralı)", "Habitación estándar (vista lateral al mar)", "Standardzimmer (seitlicher Meerblick)", "Стандартный номер (боковой вид на море)", "Chambre standard (vue mer latérale)", "غرفة قياسية (إطلالة جانبية على البحر)", "اتاق استاندارد (نمای جانبی دریا)"), size: "26 m²", guests: 3, beds: L("1 Double, 1 Single", "1 Çift, 1 Tek", "1 doble, 1 individual", "1 Doppelbett, 1 Einzelbett", "1 двуспальная, 1 односпальная", "1 double, 1 simple", "سرير مزدوج واحد وسرير مفرد واحد", "۱ تخت دونفره، ۱ تخت یک‌نفره"), bath: 1, image: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/SIDE-1_1200x800-800x533.jpg" },
  { name: L("Standard Room (Sea View)", "Standart Oda (Deniz Manzaralı)", "Habitación estándar (vista al mar)", "Standardzimmer (Meerblick)", "Стандартный номер (вид на море)", "Chambre standard (vue mer)", "غرفة قياسية (إطلالة بحرية)", "اتاق استاندارد (نمای دریا)"), size: "26 m²", guests: 3, beds: L("1 Double, 1 Single", "1 Çift, 1 Tek", "1 doble, 1 individual", "1 Doppelbett, 1 Einzelbett", "1 двуспальная, 1 односпальная", "1 double, 1 simple", "سرير مزدوج واحد وسرير مفرد واحد", "۱ تخت دونفره، ۱ تخت یک‌نفره"), bath: 1, image: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/SEA-2_1200x800-800x533.jpg" },
  { name: L("Large Room (Land View)", "Büyük Oda (Kara Manzaralı)", "Habitación grande (vista al jardín)", "Großes Zimmer (Landblick)", "Большой номер (вид на сушу)", "Grande chambre (vue sur les terres)", "غرفة كبيرة (إطلالة برية)", "اتاق بزرگ (نمای زمین)"), size: "30 m²", guests: 4, beds: L("1 Double, 2 Singles", "1 Çift, 2 Tek", "1 doble, 2 individuales", "1 Doppelbett, 2 Einzelbetten", "1 двуспальная, 2 односпальные", "1 double, 2 simples", "سرير مزدوج واحد وسريرين مفردين", "۱ تخت دونفره، ۲ تخت یک‌نفره"), bath: 1, image: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/LRG-L-3_1200x800-800x533.jpg" },
  { name: L("Large Room (Sea View)", "Büyük Oda (Deniz Manzaralı)", "Habitación grande (vista al mar)", "Großes Zimmer (Meerblick)", "Большой номер (вид на море)", "Grande chambre (vue mer)", "غرفة كبيرة (إطلالة بحرية)", "اتاق بزرگ (نمای دریا)"), size: "30 m²", guests: 4, beds: L("1 Double, 2 Singles", "1 Çift, 2 Tek", "1 doble, 2 individuales", "1 Doppelbett, 2 Einzelbetten", "1 двуспальная, 2 односпальные", "1 double, 2 simples", "سرير مزدوج واحد وسريرين مفردين", "۱ تخت دونفره، ۲ تخت یک‌نفره"), bath: 1, image: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/FAM-L-5_1200x800-800x533.jpg" },
  { name: L("Family Room (Land View)", "Aile Odası (Kara Manzaralı)", "Habitación familiar (vista al jardín)", "Familienzimmer (Landblick)", "Семейный номер (вид на сушу)", "Chambre familiale (vue sur les terres)", "غرفة عائلية (إطلالة برية)", "اتاق خانوادگی (نمای زمین)"), size: "36–40 m²", guests: 4, beds: L("1 Double, 2 Singles", "1 Çift, 2 Tek", "1 doble, 2 individuales", "1 Doppelbett, 2 Einzelbetten", "1 двуспальная, 2 односпальные", "1 double, 2 simples", "سرير مزدوج واحد وسريرين مفردين", "۱ تخت دونفره، ۲ تخت یک‌نفره"), bath: 1, image: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/FAM-L-5_1200x800-800x533.jpg" },
  { name: L("Family Room (Sea View)", "Aile Odası (Deniz Manzaralı)", "Habitación familiar (vista al mar)", "Familienzimmer (Meerblick)", "Семейный номер (вид на море)", "Chambre familiale (vue mer)", "غرفة عائلية (إطلالة بحرية)", "اتاق خانوادگی (نمای دریا)"), size: "36–40 m²", guests: 4, beds: L("1 Double, 2 Singles", "1 Çift, 2 Tek", "1 doble, 2 individuales", "1 Doppelbett, 2 Einzelbetten", "1 двуспальная, 2 односпальные", "1 double, 2 simples", "سرير مزدوج واحد وسريرين مفردين", "۱ تخت دونفره، ۲ تخت یک‌نفره"), bath: 1, image: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/FAM-S-7_1200x800-800x533.jpg" },
  { name: L("Superior Jacuzzi Room (Land View)", "Superior Jakuzi Oda (Kara Manzaralı)", "Habitación superior con jacuzzi (vista al jardín)", "Superior-Jacuzzi-Zimmer (Landblick)", "Номер Superior с джакузи (вид на сушу)", "Chambre supérieure avec jacuzzi (vue sur les terres)", "غرفة سوبيريور مع جاكوزي (إطلالة برية)", "اتاق سوپریور جکوزی‌دار (نمای زمین)"), size: "32 m²", guests: 3, beds: L("1 Double, 1 Sofa Bed", "1 Çift, 1 Kanepe Yatak", "1 doble, 1 sofá cama", "1 Doppelbett, 1 Schlafsofa", "1 двуспальная, 1 диван-кровать", "1 double, 1 canapé-lit", "سرير مزدوج واحد وأريكة سرير واحدة", "۱ تخت دونفره، ۱ مبل تخت‌خواب‌شو"), bath: 1, image: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/JAC-3_1200x800-800x533.jpg" },
];

export const restaurants = [
  { name: "Lotus Restaurant", type: "All-day dining", hours: "07:00–10:30 · 12:30–14:00 · 19:00–21:30", note: "Buffet service · Seasonal Aegean flavours", tag: "Open today" },
  { name: "A La Turca", type: "Turkish cuisine", hours: "19:00–21:30", note: "Reservation recommended · Dress: smart casual", tag: "Reservation" },
  { name: "Pier Bar", type: "Beachfront drinks", hours: "10:00–00:00", note: "Sea breeze, cold pours, unhurried afternoons", tag: "Open until midnight" },
];

export const staff = [
  { name: "Şenol And", title: "General Manager", initials: "ŞA", note: "Guest experience & hotel operations", contact: "Reception desk" },
  { name: "Guest Relations", title: "Your first point of contact", initials: "GR", note: "Activities, directions, special moments", contact: "Dial 0" },
  { name: "Wellness Team", title: "Spa & movement", initials: "WT", note: "Treatments, fitness, calm spaces", contact: "Lotus Spa" },
  { name: "F&B Team", title: "Dining & celebrations", initials: "FB", note: "Menus, tables and dietary requests", contact: "Pier Bar" },
];

export const destinations = [
  { name: "İçmeler Bay", category: "By the water", distance: "0.2 km", detail: "A gentle curve of beach, pine and clear shallows — just outside the hotel.", image: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/DJI_0897.jpg" },
  { name: "Marmaris Old Town", category: "Culture", distance: "8 km", detail: "Harbour walks, castle views and a little local history.", image: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/genel1.jpg" },
  { name: "Boat day", category: "Excursion", distance: "Ask concierge", detail: "A full day on the water is best planned around the weather.", image: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/3_900x600.jpg" },
];

export const mapPins = [
  { label: "Reception", x: 25, y: 70, type: "You are here" },
  { label: "Lotus Restaurant", x: 58, y: 32, type: "Dining" },
  { label: "Main Pool", x: 72, y: 66, type: "Swim" },
  { label: "Lotus Spa", x: 40, y: 24, type: "Wellness" },
  { label: "Beach & Pier", x: 82, y: 88, type: "Water" },
];

export const conciergeAnswers = [
  { q: "What can I do this evening?", a: "Live music is planned for the Garden Stage at 20:30 today. ICON Beach evening details are listed as schedule to be confirmed — our Guest Relations team can advise on the latest update." },
  { q: "Where can I have breakfast?", a: "Lotus Restaurant serves breakfast from 07:00 to 10:30. Ask the F&B team about dietary preferences or a breakfast-in-bed request." },
  { q: "How do I reach ICON Beach?", a: "ICON Beach is next to the hotel beachfront. Follow the shoreline path from the Beach & Pier pin; ask Guest Relations for the latest access and program details." },
];

export function formatDateLabel(iso: string, locale = "en-GB") {
  return new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short" }).format(new Date(`${iso}T12:00:00`));
}

export function getActivitiesForDate(date: string) {
  return activities.filter((activity) => activity.date === date);
}

export function getDailyScheduleForDate(date: string) {
  const direct = activities.filter((activity) => activity.date === date);
  if (direct.length > 0) return direct;

  // Generate complete date-mapped summer resort schedule
  const dayNum = parseInt(date.split("-")[2] || "30", 10);
  return [
    {
      id: `act-${date}-01`,
      date,
      start: "07:00",
      end: "10:30",
      category: "Dining",
      title: L("Breakfast Buffet & Fresh Bakeries", "Açık Büfe Kahvaltı ve Taze Fırın Lezzetleri", "Завтрак «шведский стол» и свежая выпечка", "Frühstücksbuffet & Frische Backwaren"),
      description: L("Artisan Aegean cheeses, freshly baked breads, honeycombs, and made-to-order omelettes.", "Ege peynirleri, sıcak fırın ürünleri, petek bal ve isteğe özel hazırlanan omletler.", "Эгейские сыры, свежая выпечка, мед в сотах и омлеты на заказ.", "Ägäische Käsesorten, frisches Gebäck, Wabenhonig und frische Omeletts."),
      location: "Lotus Main Restaurant",
      status: "confirmed" as const,
      booking: false,
      staff: "Culinary Team",
      icon: "utensils",
    },
    {
      id: `act-${date}-02`,
      date,
      start: "07:30",
      end: "08:30",
      category: "Wellness",
      title: L("Sunrise Yoga & Aegean Meditation", "Gündoğumu Yoga ve Ege Meditasyonu", "Йога и медитация на рассвете", "Sonnenaufgangs-Yoga & Meditation"),
      description: L("Start softly with gentle morning flows and breathwork above the crystal Aegean.", "Ege'nin berrak suları üzerinde sabah esnemeleri ve nefes meditasyonu ile güne başlayın.", "Мягкие утренние практики и дыхательные упражнения над Эгейским морем.", "Sanfte Dehnungen und Atemübungen über der kristallklaren Ägäis."),
      location: "Lotus Yoga Pier",
      status: "confirmed" as const,
      booking: false,
      staff: "Lotus Spa Wellness Team",
      icon: "sun",
    },
    {
      id: `act-${date}-03`,
      date,
      start: "09:00",
      end: "18:00",
      category: "Water Sports",
      title: L("Watersports Center & Jet Ski Desk", "Su Sporları Merkezi & Jet Ski Masası", "Центр водных видов спорта и гидроциклы", "Wassersportzentrum & Jet-Ski"),
      description: L("Parasailing, jet ski rentals, seabob tours, and paddleboarding on the calm bay waters.", "Sakin koy sularında parasailing, jet ski, seabob ve paddleboard aktiviteleri.", "Парасейлинг, гидроциклы, сибобы и сапбординг в спокойной бухте.", "Parasailing, Jet-Ski, Seabob-Touren und Paddleboarding in der ruhigen Bucht."),
      location: "Water Sports Beach",
      status: "confirmed" as const,
      booking: true,
      staff: "Watersports Crew",
      icon: "anchor",
    },
    {
      id: `act-${date}-04`,
      date,
      start: "10:00",
      end: "17:30",
      category: "Kids",
      title: L("Mini Club 'Orki' Creative Fun & Games", "Mini Club 'Orki' Yaratıcı Oyunlar ve Eğlence", "Детский клуб «Orki» — игры и творчество", "Mini Club 'Orki' Kreative Spiele & Spaß"),
      description: L("Face painting, arts & crafts, pool games, and treasure hunts supervised by our certified team.", "Uzman eğitmenler eşliğinde yüz boyama, el sanatları, havuz oyunları ve hazine avı.", "Аквагрим, творческие мастерские, игры в бассейне и поиски сокровищ.", "Kinderschminken, Bastelworkshops, Poolspiele und Schatzsuche mit geschultem Team."),
      location: "Kids Club 'Orki'",
      status: "confirmed" as const,
      booking: false,
      staff: "Mini Club Animation Team",
      icon: "smile",
    },
    {
      id: `act-${date}-05`,
      date,
      start: "10:30",
      end: "11:30",
      category: "Pool",
      title: L("Aqua Gym & Pool Vitality", "Aqua Gym ve Havuz Jimnastiği", "Аква-аэробика и водная гимнастика", "Wassergymnastik & Pool-Vitalität"),
      description: L("High-energy water aerobics and rhythmic exercise to invigorating summer tracks.", "Canlandırıcı yaz şarkıları eşliğinde eğlenceli ve dinamik su jimnastiği seansı.", "Энергичная водная гимнастика под бодрящую летнюю музыку.", "Dynamische Wassergymnastik zu sommerlichen Rhythmen im Hauptpool."),
      location: "Main Lagoon Pool",
      status: "confirmed" as const,
      booking: false,
      staff: "Activities Team",
      icon: "waves",
    },
    {
      id: `act-${date}-06`,
      date,
      start: "12:30",
      end: "14:30",
      category: "Dining",
      title: L("Aegean Seafood & Gourmet Lunch", "Ege Deniz Ürünleri ve Gurme Öğle Yemeği", "Обед с морепродуктами и грилем", "Ägäischer Gourmet-Mittagstisch"),
      description: L("Grilled sea bass, Mediterranean mezes, crisp Aegean salads, and wood-fired flatbreads.", "Izgara levrek, Akdeniz mezeleri, taze Ege salataları ve taş fırın pideleri.", "Сибас на гриле, средиземноморские закуски, свежие салаты и лепешки из печи.", "Gegrillter Wolfsbarsch, mediterrane Meze, knackige Salate und frische Pide."),
      location: "Lotus Main Restaurant",
      status: "confirmed" as const,
      booking: false,
      staff: "F&B Culinary Team",
      icon: "utensils",
    },
    {
      id: `act-${date}-07`,
      date,
      start: "15:00",
      end: "16:30",
      category: "Activities",
      title: L("Beach Volleyball & Water Polo", "Plaj Voleybolu ve Su Topu Turnuvası", "Пляжный волейбол и водное поло", "Strandvolleyball & Wasserball"),
      description: L("Friendly resort tournament on the golden sand court and main activity pool.", "Altın kum sahasında ve aktivite havuzunda neşeli tatil turnuvaları.", "Дружеский турнир на песчаном корте и в бассейне с аниматорами.", "Freundschaftsturnier auf dem Sandplatz und im Aktivitätspool."),
      location: "Lotus Private Beach & Pool",
      status: "confirmed" as const,
      booking: false,
      staff: "Sports Animation",
      icon: "waves",
    },
    {
      id: `act-${date}-08`,
      date,
      start: "16:00",
      end: "18:00",
      category: "Dining",
      title: L("Patisserie & Aegean Afternoon Tea", "Pastane & Geleneksel Ege Çay Saati", "Кондитерская и послеобеденный чай", "Pâtisserie & Ägäischer Nachmittagstee"),
      description: L("Freshly baked macarons, Turkish pastries, iced fruit infusions, and specialty coffees.", "Taze makaronlar, Türk tatlıları, soğuk meyve infüzyonları ve özel kahveler.", "Макаруны, турецкие сладости, фруктовые настои со льдом и кофе.", "Frische Macarons, türkische Spezialitäten, Eistee und Kaffeespezialitäten."),
      location: "Turquoise Patisserie Lounge",
      status: "confirmed" as const,
      booking: false,
      staff: "Pastry Chefs",
      icon: "utensils",
    },
    {
      id: `act-${date}-09`,
      date,
      start: "17:45",
      end: "18:45",
      category: "Beach",
      title: L("Golden Sunset Tea on the Pier", "İskelede Altın Gün Batımı Çayı", "Чай на закате на деревянном пирсе", "Goldener Sonnenuntergangstee am Steg"),
      description: L("A quiet, poetic interlude as the sun sinks behind the pine mountains of İçmeler bay.", "Güneş İçmeler koyunun çam kaplı tepeleri ardından batarken huzurlu bir mola.", "Поэтичная пауза под звуки волн, пока солнце садится за горы.", "Stimmungsvolle Pause, während die Sonne hinter den Pinienbergen versinkt."),
      location: "Lotus Wooden Pier",
      status: "confirmed" as const,
      booking: false,
      staff: "Guest Relations",
      icon: "sunset",
    },
    {
      id: `act-${date}-10`,
      date,
      start: "19:00",
      end: "21:30",
      category: "Dining",
      title: L("Mediterranean & International Dinner", "Akdeniz ve Dünya Mutfakları Akşam Yemeği", "Ужин: Средиземноморская и мировая кухня", "Mediterranes & Internationales Dinner"),
      description: L("Live cooking stations, Aegean seafood specialties, prime roasts, and an elaborate dessert display.", "Canlı pişirme istasyonları, Ege deniz ürünleri, fırın etler ve zengin tatlı büfesi.", "Кулинарные станции, морепродукты, жаркое и роскошный десертный стол.", "Live-Cooking-Stationen, Meeresfrüchte, Braten und feine Desserts."),
      location: "Lotus Main Restaurant",
      status: "confirmed" as const,
      booking: false,
      staff: "Executive Chef & F&B Team",
      icon: "utensils",
    },
    {
      id: `act-${date}-11`,
      date,
      start: "20:30",
      end: "21:15",
      category: "Kids",
      title: L("Mini Disco & Kids Award Show", "Mini Disko ve Çocuk Ödül Töreni", "Мини-диско и детские награждения", "Mini-Disco & Kinder-Show"),
      description: L("Favorite international kids songs, dancing routines, and daily activity awards on stage.", "Sahne ışıkları altında danslar, çocuk şarkıları ve günün aktivite madalyaları.", "Любимые детские танцы, песни и вручение памятных дипломов.", "Beliebte Kindertänze, Musik und Auszeichnung der Tagessieger."),
      location: "Amphitheater Arena",
      status: "confirmed" as const,
      booking: false,
      staff: "Kids Animation Team",
      icon: "sparkles",
    },
    {
      id: `act-${date}-12`,
      date,
      start: "21:30",
      end: "23:00",
      category: "Entertainment",
      title: dayNum % 2 === 0
        ? L("Live Music & Dance Show Under the Pines", "Çamların Altında Canlı Müzik ve Dans Gösterisi", "Живая музыка и танцевальное шоу под соснами", "Live-Musik & Tanzshow unter den Pinien")
        : L("Aegean Acoustic Duo & Mediterranean Strings", "Ege Akustik Canlı Müzik ve Yaylılar Gecesi", "Акустический вечер и средиземноморские струнные", "Ägäischer Akustikabend & Streicher"),
      description: L("Vocalists, Mediterranean acoustic melodies, and dazzling stage choreography under the starry sky.", "Yıldızlar altında canlı vokal, Akdeniz ezgileri ve büyüleyici dans koreografisi.", "Живой вокал, средиземноморские мотивы и хореография под звездным небом.", "Live-Gesang, mediterrane Melodien und Choreografien unter den Sternen."),
      location: "Garden Stage",
      status: "confirmed" as const,
      booking: false,
      staff: "Entertainment Team",
      icon: "music",
    },
    {
      id: `act-${date}-13`,
      date,
      start: "23:00",
      end: "02:00",
      category: "Nightlife",
      title: L("Icon Beach Lounge & DJ Sunset Beats", "Icon Beach Club & Gece DJ Performansı", "Icon Beach Club — ночные DJ-сеты", "Icon Beach Club & DJ Night Beats"),
      description: L("Craft cocktails, signature Aegean mixology, and atmospheric deep house grooves by the water.", "Deniz kenarında özel kokteyller, imza miksoloji ve büyüleyici DJ ritimleri.", "Авторские коктейли, пляжная атмосфера и deep house у кромки воды.", "Signature-Cocktails, Premium-Mixologie und Deep-House-Beats direkt am Meer."),
      location: "Icon Beach Club",
      status: "confirmed" as const,
      booking: false,
      staff: "Icon Beach Resident DJ & Mixologists",
      icon: "sunset",
    },
    {
      id: `act-${date}-14`,
      date,
      start: "00:00",
      end: "01:00",
      category: "Dining",
      title: L("Midnight Soup & Light Aegean Bistro", "Gece Çorbası ve Hafif Ege Bistro Servisi", "Ночной суп и легкий ночной буфет", "Mitternachtssuppe & Ägäis-Nachtbistro"),
      description: L("Warm comforting soups, artisan bread rolls, and light midnight snacks for late arrivals.", "Gece geç saatlerde sıcacık çorbalar, fırın ekmekleri ve hafif atıştırmalıklar.", "Горячие супы, свежий хлеб и легкие закуски для полуночников.", "Wärmende Suppen, frisches Gebäck und leichte Snacks zu später Stunde."),
      location: "Lotus Night Bistro",
      status: "confirmed" as const,
      booking: false,
      staff: "Bistro Team",
      icon: "utensils",
    },
  ];
}
