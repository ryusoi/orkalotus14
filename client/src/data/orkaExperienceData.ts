import type { Locale } from "@/data/content";

export type TargetType = "service" | "management" | "staff";

export interface ExperienceTarget {
  id: string;
  type: TargetType;
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  department: Record<Locale, string>;
  category: string;
  icon: string;
  photoUrl: string;
  description: Record<Locale, string>;
  responsibilities?: Record<Locale, string[]>;
  initialSummary: {
    totalRatings: number;
    averageOverall: number;
    averageHospitality: number;
    averageProfessionalism: number;
    averageHelpfulness: number;
    averageCourtesy: number;
    averageQuality: number;
    recommendationPercentage: number;
  };
}

export interface RatingDimension {
  key: "overallRating" | "hospitalityRating" | "professionalismRating" | "helpfulnessRating" | "courtesyRating" | "qualityRating";
  label: Record<Locale, string>;
  description: Record<Locale, string>;
}

export const RATING_DIMENSIONS: RatingDimension[] = [
  {
    key: "overallRating",
    label: {
      en: "Overall Lotus Stars",
      tr: "Genel Lotus Yıldızları",
      ru: "Общие звезды Lotus",
      de: "Gesamte Lotus-Sterne",
    },
    description: {
      en: "How would you rate your overall five-star experience in this area?",
      tr: "Bu alandaki 5 yıldızlı genel deneyiminizi nasıl değerlendirirsiniz?",
      ru: "Как бы вы оценили общее пятизвездочное впечатление в этой зоне?",
      de: "Wie bewerten Sie Ihr gesamtes 5-Sterne-Erlebnis in diesem Bereich?",
    },
  },
  {
    key: "hospitalityRating",
    label: {
      en: "Hospitality",
      tr: "Misafirperverlik",
      ru: "Гостеприимство",
      de: "Gastfreundschaft",
    },
    description: {
      en: "How welcoming, accommodating and hospitable was the service?",
      tr: "Hizmet ne kadar sıcak, kucaklayıcı ve misafirperverdi?",
      ru: "Насколько теплым, внимательным и радушным был прием?",
      de: "Wie herzlich, aufmerksam und einladend war der Service?",
    },
  },
  {
    key: "professionalismRating",
    label: {
      en: "Professionalism",
      tr: "Profesyonellik",
      ru: "Профессионализм",
      de: "Professionalität",
    },
    description: {
      en: "How professional, knowledgeable and competent was the interaction?",
      tr: "Etkileşim ne kadar yetkin, bilgili ve profesyonel standartlardaydı?",
      ru: "Насколько компетентным и профессиональным было взаимодействие?",
      de: "Wie kompetent, fachkundig und professionell war die Betreuung?",
    },
  },
  {
    key: "helpfulnessRating",
    label: {
      en: "Helpfulness & Speed",
      tr: "Yardımseverlik ve Hız",
      ru: "Отзывчивость и оперативность",
      de: "Hilfsbereitschaft & Schnelligkeit",
    },
    description: {
      en: "How prompt and proactive was the team in assisting you?",
      tr: "Ekip ihtiyaçlarınıza yanıt verirken ne kadar çözüm odaklı ve hızlıydı?",
      ru: "Насколько быстро и охотно вам помогли в решении вопросов?",
      de: "Wie schnell und zuvorkommend wurde auf Ihre Wünsche eingegangen?",
    },
  },
  {
    key: "courtesyRating",
    label: {
      en: "Courtesy & Respect",
      tr: "Nezaket ve Saygı",
      ru: "Вежливость и уважение",
      de: "Höflichkeit & Respekt",
    },
    description: {
      en: "How respectful, polite and discreet was the hospitality?",
      tr: "Hizmet ne kadar saygılı, kibar ve incelikli bir dille sunuldu?",
      ru: "Насколько деликатным, вежливым и уважительным было отношение?",
      de: "Wie respektvoll, diskret und höflich war der Umgang?",
    },
  },
  {
    key: "qualityRating",
    label: {
      en: "Hygiene & Cleanliness",
      tr: "Hijyen ve Temizlik",
      ru: "Гигиена и чистота",
      de: "Hygiene & Sauberkeit",
    },
    description: {
      en: "How satisfied were you with the hygiene, cleanliness and immaculate freshness?",
      tr: "Hijyen, temizlik ve ferahlık standartlarından ne kadar memnun kaldınız?",
      ru: "Насколько вы удовлетворены чистотой, гигиеной и порядком?",
      de: "Wie zufrieden waren Sie mit Hygiene, Sauberkeit und Frische?",
    },
  },
];

export interface LotusDimension {
  id: "hospitality" | "professionalism" | "helpfulness" | "courtesy" | "hygiene";
  dbKey: "hospitalityRating" | "professionalismRating" | "helpfulnessRating" | "courtesyRating" | "qualityRating";
  label: Record<Locale, string>;
  description: Record<Locale, string>;
}

export const LOTUS_5_STAR_DIMENSIONS: LotusDimension[] = [
  {
    id: "hospitality",
    dbKey: "hospitalityRating",
    label: {
      en: "Hospitality",
      tr: "Misafirperverlik",
      ru: "Гостеприимство",
      de: "Gastfreundschaft",
    },
    description: {
      en: "Welcoming ambiance, warmth and genuine five-star care",
      tr: "Sıcak karşılama, içten ilgi ve 5 yıldızlı konukseverlik",
      ru: "Радушие, теплый прием и забота о гостях",
      de: "Herzlicher Empfang, Wärme und aufmerksame Betreuung",
    },
  },
  {
    id: "professionalism",
    dbKey: "professionalismRating",
    label: {
      en: "Professionalism",
      tr: "Profesyonellik",
      ru: "Профессионализм",
      de: "Professionalität",
    },
    description: {
      en: "Expert competence, attentiveness and exemplary standards",
      tr: "Uzmanlık, yetkinlik ve örnek hizmet standartları",
      ru: "Мастерство, компетентность и высокие стандарты",
      de: "Fachkompetenz, Zuverlässigkeit und vorbildliche Standards",
    },
  },
  {
    id: "helpfulness",
    dbKey: "helpfulnessRating",
    label: {
      en: "Helpfulness & Speed",
      tr: "Yardımseverlik ve Hız",
      ru: "Отзывчивость и оперативность",
      de: "Hilfsbereitschaft & Schnelligkeit",
    },
    description: {
      en: "Prompt assistance, swift solutions and proactive support",
      tr: "Hızlı çözüm, proaktif yaklaşım ve atik servis",
      ru: "Быстрое решение вопросов, отзывчивость и скорость",
      de: "Schnelle Hilfe, zügige Lösungen und proaktive Unterstützung",
    },
  },
  {
    id: "courtesy",
    dbKey: "courtesyRating",
    label: {
      en: "Courtesy & Respect",
      tr: "Nezaket ve Saygı",
      ru: "Вежливость и уважение",
      de: "Höflichkeit & Respekt",
    },
    description: {
      en: "Polite demeanor, discreet elegance and mutual respect",
      tr: "Zarafet, kibar iletişim ve saygılı tutum",
      ru: "Вежливость, деликатность и уважительное отношение",
      de: "Höflicher Umgang, Diskretion und eleganter Respekt",
    },
  },
  {
    id: "hygiene",
    dbKey: "qualityRating",
    label: {
      en: "Hygiene & Cleanliness",
      tr: "Hijyen ve Temizlik",
      ru: "Гигиена и чистота",
      de: "Hygiene & Sauberkeit",
    },
    description: {
      en: "Immaculate cleanliness, fresh order and pristine standards",
      tr: "Kusursuz hijyen, ferah düzen ve titiz temizlik standartları",
      ru: "Безупречная чистота, свежесть и санитарный порядок",
      de: "Makellose Hygiene, Frische und sorgfältige Reinheit",
    },
  },
];

export const STAR_LABELS: Record<number, Record<Locale, string>> = {
  1: {
    en: "Needs Improvement",
    tr: "Geliştirilmeli",
    ru: "Требует улучшения",
    de: "Verbesserungswürdig",
  },
  2: {
    en: "Fair",
    tr: "Makul",
    ru: "Удовлетворительно",
    de: "Mäßig",
  },
  3: {
    en: "Good",
    tr: "İyi",
    ru: "Хорошо",
    de: "Gut",
  },
  4: {
    en: "Very Good",
    tr: "Çok İyi",
    ru: "Очень хорошо",
    de: "Sehr gut",
  },
  5: {
    en: "Exceptional (5-Star)",
    tr: "Kusursuz (5 Yıldız)",
    ru: "Исключительно (5 Звезд)",
    de: "Außergewöhnlich (5-Sterne)",
  },
};

export const RECOMMENDATION_OPTIONS = [
  {
    id: "absolutely",
    label: {
      en: "Absolutely, without hesitation",
      tr: "Kesinlikle, tereddütsüz",
      ru: "Безусловно, без сомнений",
      de: "Absolut, ohne jeden Zweifel",
    },
    positive: true,
  },
  {
    id: "yes",
    label: {
      en: "Yes, definitely",
      tr: "Evet, kesinlikle",
      ru: "Да, определенно",
      de: "Ja, definitiv",
    },
    positive: true,
  },
  {
    id: "maybe",
    label: {
      en: "Maybe / Under certain conditions",
      tr: "Belki / Koşullara bağlı",
      ru: "Возможно / При определенных условиях",
      de: "Vielleicht / Unter Vorbehalt",
    },
    positive: false,
  },
  {
    id: "probably_not",
    label: {
      en: "Probably not",
      tr: "Muhtemelen hayır",
      ru: "Скорее всего нет",
      de: "Eher nicht",
    },
    positive: false,
  },
];

// All 13 primary hotel services requested
export const DEFAULT_HOTEL_SERVICES: ExperienceTarget[] = [
  {
    id: "service-reception",
    type: "service",
    category: "rooms_front",
    icon: "ConciergeBell",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/reception.png",
    title: {
      en: "Reception & Check-in",
      tr: "Resepsiyon & Giriş Hizmetleri",
      ru: "Ресепшн и регистрация заезда",
      de: "Rezeption & Check-in Service",
    },
    subtitle: {
      en: "Front Desk, Welcome & Luggage Services",
      tr: "Karşılama, Kayıt ve Bagaj Hizmetleri",
      ru: "Служба встречи, регистрация и багажный сервис",
      de: "Empfang, Anreise und Gepäckservice",
    },
    department: {
      en: "Front Office",
      tr: "Ön Büro",
      ru: "Служба приема",
      de: "Front Office",
    },
    description: {
      en: "First impressions, smooth 24/7 arrival reception, key management, luggage assistance, currency exchange and departure coordination.",
      tr: "İlk izlenim, 7/24 pürüzsüz karşılama, oda anahtarı teslimi, bagaj yardımı, döviz işlemleri ve ayrılış koordinasyonu.",
      ru: "Первое впечатление, круглосуточная встреча, выдача ключей, помощь с багажом и организация комфортного выезда.",
      de: "Erster Eindruck, 24/7 reibungsloser Empfang, Schlüsselübergabe, Gepäckservice und Abreisekoordination.",
    },
    initialSummary: {
      totalRatings: 69,
      averageOverall: 4.9,
      averageHospitality: 4.9,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.8,
      averageCourtesy: 5.0,
      averageQuality: 4.9,
      recommendationPercentage: 98,
    },
  },
  {
    id: "service-guest-relations",
    type: "service",
    category: "rooms_front",
    icon: "HeartHandshake",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/lobi2.jpg",
    title: {
      en: "Guest Relations & Concierge",
      tr: "Misafir İlişkileri & Konsiyerj",
      ru: "Служба заботы о гостях и консьерж",
      de: "Gästebetreuung & Concierge",
    },
    subtitle: {
      en: "Personal Care, Special Requests & VIP Welcome",
      tr: "Kişiye Özel İlgi, Özel Günler & VIP Hizmetleri",
      ru: "Индивидуальный подход, поздравления и VIP-сервис",
      de: "Individuelle Betreuung, Sonderwünsche & VIP-Service",
    },
    department: {
      en: "Guest Services",
      tr: "Misafir Hizmetleri",
      ru: "Сервис гостей",
      de: "Gästeservice",
    },
    description: {
      en: "Tailored guest care, anniversary and honeymoon arrangements, local recommendations, table reservations and swift resolution of inquiries.",
      tr: "Kişiye özel misafir ilgisi, balayı ve yıl dönümü organizasyonları, yerel öneriler ve tüm taleplerin anında çözümlenmesi.",
      ru: "Индивидуальная забота, координация праздников, бронирование столиков и оперативное решение любых пожеланий.",
      de: "Maßgeschneiderte Gästebetreuung, Jubiläumsarrangements, Tischreservierungen und sofortige Lösung aller Anliegen.",
    },
    initialSummary: {
      totalRatings: 54,
      averageOverall: 4.9,
      averageHospitality: 5.0,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.9,
      averageCourtesy: 5.0,
      averageQuality: 4.9,
      recommendationPercentage: 100,
    },
  },
  {
    id: "service-housekeeping",
    type: "service",
    category: "housekeeping",
    icon: "Sparkles",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/SEA-2_1200x800-800x533.jpg",
    title: {
      en: "Housekeeping & Room Care",
      tr: "Kat Hizmetleri & Oda Bakımı",
      ru: "Хаускипинг и чистота номеров",
      de: "Housekeeping & Zimmerpflege",
    },
    subtitle: {
      en: "Immaculate Cleanliness, Fresh Linen & Turndown",
      tr: "Kusursuz Hijyen, Taze Tekstil ve Akşam Bakımı",
      ru: "Безупречная чистота, свежее белье и вечерний сервис",
      de: "Makellose Reinheit, frische Wäsche & Abendservice",
    },
    department: {
      en: "Housekeeping",
      tr: "Kat Hizmetleri",
      ru: "Служба горничных",
      de: "Housekeeping",
    },
    description: {
      en: "Daily meticulous room sanitization, premium linen and towel renewal, mini-bar restocking and comfortable turndown details.",
      tr: "Günlük titiz oda temizliği, lüks havlu ve çarşaf değişimi, mini-bar yenilemesi ve özenli akşam yatak bakımı.",
      ru: "Ежедневная тщательная уборка, обновление белья и полотенец, пополнение мини-бара и подготовка номера ко сну.",
      de: "Tägliche akribische Zimmerreinigung, frische Luxuswäsche, Minibar-Service und behaglicher Turndown-Service.",
    },
    initialSummary: {
      totalRatings: 61,
      averageOverall: 4.8,
      averageHospitality: 4.7,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.8,
      averageCourtesy: 4.9,
      averageQuality: 4.9,
      recommendationPercentage: 96,
    },
  },
  {
    id: "service-main-restaurant",
    type: "service",
    category: "culinary_fb",
    icon: "UtensilsCrossed",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/restoran1.jpg",
    title: {
      en: "Main Restaurant (Pine & Lotus)",
      tr: "Ana Restoran (Pine & Lotus)",
      ru: "Главный ресторан (Pine & Lotus)",
      de: "Hauptrestaurant (Pine & Lotus)",
    },
    subtitle: {
      en: "Open Buffet Breakfast, Lunch & Dinner",
      tr: "Açık Büfe Kahvaltı, Öğle ve Akşam Yemekleri",
      ru: "Шведский стол: завтрак, обед и ужин",
      de: "Offenes Buffet: Frühstück, Mittag- und Abendessen",
    },
    department: {
      en: "Food & Beverage",
      tr: "Yiyecek & İçecek",
      ru: "Ресторанная служба",
      de: "Gastronomie",
    },
    description: {
      en: "Extensive Aegean and international buffet spreads, live cooking stations, fresh bakery, dietary selections and attentive table service.",
      tr: "Zengin Ege ve dünya mutfağı büfeleri, canlı pişirme istasyonları, taze fırın lezzetleri, diyet seçenekleri ve özenli masa servisi.",
      ru: "Богатый выбор блюд эгейской и международной кухни, станции открытой кухни, свежая выпечка и внимательный сервис.",
      de: "Umfangreiche Buffets mit ägäischer und internationaler Küche, Live-Cooking-Stationen, Bäckerei und aufmerksamer Service.",
    },
    initialSummary: {
      totalRatings: 73,
      averageOverall: 4.8,
      averageHospitality: 4.8,
      averageProfessionalism: 4.8,
      averageHelpfulness: 4.7,
      averageCourtesy: 4.9,
      averageQuality: 4.9,
      recommendationPercentage: 97,
    },
  },
  {
    id: "service-bars",
    type: "service",
    category: "culinary_fb",
    icon: "Wine",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/genel1.jpg",
    title: {
      en: "Bars & Lounges",
      tr: "Barlar ve Lounge Alanları",
      ru: "Бары и лаундж-зоны",
      de: "Bars & Lounge-Bereiche",
    },
    subtitle: {
      en: "Lobby Bar, Beach Bar, Pool Bars & Signature Drinks",
      tr: "Lobi Bar, Sahil Bar, Havuz Barları ve Özel Kokteyller",
      ru: "Лобби-бар, пляжный бар, бары у бассейнов и коктейли",
      de: "Lobbybar, Strandbar, Poolbars & Signature Cocktails",
    },
    department: {
      en: "Bars & Beverage",
      tr: "Barlar ve İçecek",
      ru: "Барная служба",
      de: "Bar & Getränke",
    },
    description: {
      en: "Ultra-all-inclusive premium beverages, handcrafted cocktails, international spirits, Turkish coffee rituals and Aegean sunset views.",
      tr: "Ultra her şey dahil premium içecekler, el yapımı kokteyller, seçkin içkiler, geleneksel Türk kahvesi ve gün batımı manzarası.",
      ru: "Премиальные напитки ультра все включено, авторские коктейли, турецкий кофе и захватывающие виды на закат.",
      de: "Ultra-All-Inclusive Premium-Getränke, handgemixte Cocktails, Spirituosen, türkischer Kaffee und Sonnenuntergangsblick.",
    },
    initialSummary: {
      totalRatings: 59,
      averageOverall: 4.9,
      averageHospitality: 5.0,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.8,
      averageCourtesy: 5.0,
      averageQuality: 4.9,
      recommendationPercentage: 98,
    },
  },
  {
    id: "service-pool",
    type: "service",
    category: "wellness_recreation",
    icon: "Waves",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/pools_800x1200.jpg",
    title: {
      en: "Pool Facilities & Aquapark",
      tr: "Havuz Tesisleri ve Aquapark",
      ru: "Бассейны и аквапарк",
      de: "Poollandschaften & Aquapark",
    },
    subtitle: {
      en: "Main Pool, Relaxation Pool, Waterslides & Kids Pools",
      tr: "Ana Havuz, Relax Havuz, Kaydıraklar ve Çocuk Havuzları",
      ru: "Главный бассейн, релакс-бассейн, водные горки и детские бассейны",
      de: "Hauptpool, Ruhepool, Wasserrutschen & Kinderbecken",
    },
    department: {
      en: "Recreation & Pool Services",
      tr: "Rekreasyon ve Havuz Hizmetleri",
      ru: "Бассейны и водный отдых",
      de: "Poolservice & Freizeit",
    },
    description: {
      en: "Crystal-clear heated and fresh water pools, energetic aquapark waterslides, peaceful adult relax pool and poolside towel kiosks.",
      tr: "Pırıl pırıl temiz havuzlar, heyecan verici su kaydırakları, huzurlu yetişkin relax havuzu ve havlu istasyonları.",
      ru: "Кристально чистые бассейны, водные горки аквапарка, тихий релакс-бассейн для взрослых и выдача полотенец.",
      de: "Kristallklare Pools, Wasserrutschen im Aquapark, erholsamer Relaxpool für Erwachsene und Handtuchservice.",
    },
    initialSummary: {
      totalRatings: 52,
      averageOverall: 4.8,
      averageHospitality: 4.8,
      averageProfessionalism: 4.8,
      averageHelpfulness: 4.8,
      averageCourtesy: 4.9,
      averageQuality: 4.9,
      recommendationPercentage: 96,
    },
  },
  {
    id: "service-beach",
    type: "service",
    category: "wellness_recreation",
    icon: "Sun",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ICON/ICON%20LOGO.jpg",
    title: {
      en: "Private Beach & Jetties",
      tr: "Özel Plaj ve İskeleler",
      ru: "Частный пляж и пирсы",
      de: "Privatstrand & Stege",
    },
    subtitle: {
      en: "650-Meter Pine-Fringed Aegean Shoreline & Cabanas",
      tr: "650 Metrelik Çam Ormanıyla Çevrili Sahil ve Pavilyonlar",
      ru: "650-метровая береговая линия в окружении сосен и кабаны",
      de: "650 Meter langer Strand von Pinien gesäumt & Cabanas",
    },
    department: {
      en: "Beach & Pier Operations",
      tr: "Plaj ve İskele Operasyonları",
      ru: "Служба пляжа и пирсов",
      de: "Strand- & Stegbetrieb",
    },
    description: {
      en: "Pristine private Aegean bay with Blue Flag waters, sun loungers, umbrella shade, sunbathing piers and beachside drink service.",
      tr: "Mavi Bayraklı berrak Ege suları, konforlu şezlonglar, güneş şemsiyeleri, güneşlenme iskeleleri ve sahil içecek servisi.",
      ru: "Чистейший залив с Голубым флагом, удобные шезлонги, зонтики, пирсы для загара и доставка напитков на пляж.",
      de: "Privatbucht mit Blauer Flagge, Liegen, Sonnenschirmen, Sonnenstegen und Getränkeservice am Meer.",
    },
    initialSummary: {
      totalRatings: 66,
      averageOverall: 4.9,
      averageHospitality: 4.9,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.8,
      averageCourtesy: 5.0,
      averageQuality: 5.0,
      recommendationPercentage: 99,
    },
  },
  {
    id: "service-entertainment",
    type: "service",
    category: "wellness_recreation",
    icon: "Music",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MARMARIS/Marmaris%20collage%202.png",
    title: {
      en: "Evening Entertainment & Shows",
      tr: "Akşam Eğlenceleri ve Gösteriler",
      ru: "Вечерние шоу и развлечения",
      de: "Abendunterhaltung & Shows",
    },
    subtitle: {
      en: "Amphitheatre Performances, Live Bands & DJ Sets",
      tr: "Amfitiyatro Sahne Sanatları, Canlı Müzik ve DJ Performansları",
      ru: "Шоу в амфитеатре, живая музыка и выступления артистов",
      de: "Amphitheater-Shows, Live-Bands und DJ-Sets",
    },
    department: {
      en: "Entertainment & Animation",
      tr: "Animasyon ve Eğlence",
      ru: "Анимация и шоу-программы",
      de: "Unterhaltung & Animation",
    },
    description: {
      en: "High-caliber acrobatics, world-class dance troupes, romantic live acoustic music by the sea and themed party nights.",
      tr: "Seçkin akrobasi gösterileri, uluslararası dans grupları, deniz kenarında canlı akustik müzik ve konsept partiler.",
      ru: "Акробатические и танцевальные постановки мирового уровня, романтическая живая музыка у моря и тематические вечера.",
      de: "Hochkarätige Akrobatik, Tanzgruppen, stimmungsvolle Live-Musik am Meer und Themenpartys.",
    },
    initialSummary: {
      totalRatings: 47,
      averageOverall: 4.8,
      averageHospitality: 4.9,
      averageProfessionalism: 4.8,
      averageHelpfulness: 4.7,
      averageCourtesy: 4.9,
      averageQuality: 4.8,
      recommendationPercentage: 95,
    },
  },
  {
    id: "service-activities",
    type: "service",
    category: "wellness_recreation",
    icon: "Activity",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/lobi2.jpg",
    title: {
      en: "Daytime Activities & Sports",
      tr: "Gündüz Aktiviteleri ve Spor",
      ru: "Дневные активности и спорт",
      de: "Tagesaktivitäten & Sport",
    },
    subtitle: {
      en: "Morning Yoga, Pilates, Beach Volley & Tournaments",
      tr: "Sabah Yogası, Pilates, Plaj Voleybolu ve Turnuvalar",
      ru: "Утренняя йога, пилатес, пляжный волейбол и турниры",
      de: "Morgen-Yoga, Pilates, Beachvolleyball & Turniere",
    },
    department: {
      en: "Sports & Animation",
      tr: "Spor ve Animasyon",
      ru: "Спорт и анимация",
      de: "Sport & Animation",
    },
    description: {
      en: "Invigorating seaside fitness classes, aqua gym, boccia, darts, tennis matches and gentle group games for active vacationers.",
      tr: "Deniz kıyısında zindelik veren fitness, su jimnastiği, plaj voleybolu, tenis maçları ve eğlenceli yarışmalar.",
      ru: "Оздоровительный фитнес у моря, аквааэробика, пляжный волейбол, теннис и увлекательные турниры.",
      de: "Fitnesskurse am Meer, Wassergymnastik, Beachvolleyball, Tennis und gesellige Turniere.",
    },
    initialSummary: {
      totalRatings: 42,
      averageOverall: 4.7,
      averageHospitality: 4.8,
      averageProfessionalism: 4.7,
      averageHelpfulness: 4.8,
      averageCourtesy: 4.8,
      averageQuality: 4.7,
      recommendationPercentage: 94,
    },
  },
  {
    id: "service-spa-wellness",
    type: "service",
    category: "wellness_recreation",
    icon: "Flower2",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LOGO/medical%20center.png",
    title: {
      en: "Lotus Spa & Wellness",
      tr: "Lotus Spa & Sağlıklı Yaşam",
      ru: "Спа-комплекс Lotus & Велнес",
      de: "Lotus Spa & Wellness",
    },
    subtitle: {
      en: "Traditional Turkish Bath, Saunas, Steam & Massages",
      tr: "Geleneksel Türk Hamamı, Saunalar, Buhar Odası ve Masajlar",
      ru: "Традиционный турецкий хаммам, сауны и массажные ритуалы",
      de: "Traditionelles türkisches Hamam, Saunen & Massagen",
    },
    department: {
      en: "Spa & Wellness",
      tr: "Spa ve Sağlık",
      ru: "Спа и велнес",
      de: "Spa & Wellness",
    },
    description: {
      en: "Authentic Ottoman hammam kese & foam rituals, Bali and Thai massage therapies, aromatics, sauna, steam room and relaxation salon.",
      tr: "Geleneksel Türk hamamında kese & köpük bakımları, Bali ve Tayland masaj terapileri, sauna ve dingin dinlenme salonu.",
      ru: "Традиционные банные ритуалы в хаммаме, балийские и тайские техники массажа, сауна и релакс-зона.",
      de: "Authentisches Hamam mit Kese- und Schaumritualen, fernöstliche Massagen, Sauna, Dampfbad und Ruhezone.",
    },
    initialSummary: {
      totalRatings: 58,
      averageOverall: 4.9,
      averageHospitality: 4.9,
      averageProfessionalism: 5.0,
      averageHelpfulness: 4.9,
      averageCourtesy: 5.0,
      averageQuality: 4.9,
      recommendationPercentage: 98,
    },
  },
  {
    id: "service-kids-facilities",
    type: "service",
    category: "wellness_recreation",
    icon: "Smile",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/mini-club-2.jpg",
    title: {
      en: "Kids Club & Family World",
      tr: "Çocuk Kulübü ve Aile Dünyası",
      ru: "Мини-клуб и детский мир",
      de: "Miniclub & Familienwelt",
    },
    subtitle: {
      en: "Safe Children Playground, Mini Disco & Creative Workshops",
      tr: "Güvenli Oyun Alanları, Mini Disko ve Yaratıcı Atölyeler",
      ru: "Безопасные игровые площадки, мини-диско и мастер-классы",
      de: "Sichere Spielbereiche, Minidisco & Kreativwerkstätten",
    },
    department: {
      en: "Mini Club & Childcare",
      tr: "Mini Kulüp ve Çocuk Hizmetleri",
      ru: "Детский клуб",
      de: "Kinderbetreuung",
    },
    description: {
      en: "Professional multilingual caretakers, shaded play gardens, fun craft workshops, face painting, treasure hunts and joyful mini disco.",
      tr: "Çok dilli uzman eğitmenler, gölgelikli oyun bahçeleri, eğitici el sanatları, yüz boyama ve her akşam neşeli mini disko.",
      ru: "Квалифицированные педагоги, тенистые игровые зоны, развивающие мастер-классы и зажигательное вечернее мини-диско.",
      de: "Mehrsprachige Pädagogen, schattige Spielbereiche, Mal- und Bastelworkshops sowie fröhliche Minidisco.",
    },
    initialSummary: {
      totalRatings: 44,
      averageOverall: 4.8,
      averageHospitality: 5.0,
      averageProfessionalism: 4.8,
      averageHelpfulness: 4.9,
      averageCourtesy: 5.0,
      averageQuality: 4.8,
      recommendationPercentage: 97,
    },
  },
  {
    id: "service-watersports",
    type: "service",
    category: "wellness_recreation",
    icon: "Compass",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/WATERSPORTS/JET%20SKI%20(2).jpg",
    title: {
      en: "Watersports Center",
      tr: "Su Sporları Merkezi",
      ru: "Центр водных видов спорта",
      de: "Wassersportzentrum",
    },
    subtitle: {
      en: "Parasailing, Jet Ski, Banana, Wakeboard & Kayaks",
      tr: "Parasailing, Jet Ski, Banana, Wakeboard ve Kano",
      ru: "Парасейлинг, гидроциклы, банан, вейкборд и каяки",
      de: "Parasailing, Jetski, Bananaboot, Wakeboard & Kajaks",
    },
    department: {
      en: "Water Sports & Bay Adventures",
      tr: "Su Sporları ve Körfez Maceraları",
      ru: "Водный спорт и приключения",
      de: "Wassersport",
    },
    description: {
      en: "Adrenaline and scenic bay adventures supervised by licensed maritime instructors, modern equipment and highest maritime safety.",
      tr: "Lisanslı denizcilik eğitmenleri eşliğinde Marmaris Körfezi'nde parasailing, jet ski turları ve su kayağı heyecanı.",
      ru: "Адреналин и морские прогулки под руководством сертифицированных инструкторов на современном оборудовании.",
      de: "Adrenalin und Bootserlebnisse unter Anleitung lizenzierter Instruktoren mit modernster Sicherheitsausrüstung.",
    },
    initialSummary: {
      totalRatings: 39,
      averageOverall: 4.9,
      averageHospitality: 4.8,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.8,
      averageCourtesy: 4.8,
      averageQuality: 4.9,
      recommendationPercentage: 97,
    },
  },
  {
    id: "service-overall-hospitality",
    type: "service",
    category: "executive",
    icon: "Award",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/genel1.jpg",
    title: {
      en: "Overall Orka Hospitality",
      tr: "Genel Orka Misafirperverliği",
      ru: "Общее гостеприимство Orka",
      de: "Gesamte Orka Gastfreundschaft",
    },
    subtitle: {
      en: "5-Star Ultra All Inclusive Aegean Experience & Harmony",
      tr: "5 Yıldızlı Ultra Her Şey Dahil Ege Ruhunun Ahengi",
      ru: "Пятизвездочный ультра все включено на Эгейском море",
      de: "Fünf-Sterne Ultra All-Inclusive Ägäis-Erlebnis",
    },
    department: {
      en: "Executive Management",
      tr: "Genel Yönetim",
      ru: "Главное руководство",
      de: "Direktion",
    },
    description: {
      en: "The unified feeling of luxury, safety, peace, genuine Turkish hospitality, seamless departmental coordination and unforgettable memories.",
      tr: "Lüksün, güvenliğin, huzurun, içten Türk konukseverliğinin ve tüm bölümlerin ahenginin oluşturduğu unutulmaz tatil hatırası.",
      ru: "Гармония роскоши, безопасности, душевного турецкого радушия и безупречной работы всех служб отеля.",
      de: "Das ganzheitliche Zusammenspiel aus Luxus, Geborgenheit, herzlicher türkischer Gastfreundschaft und Erholung.",
    },
    initialSummary: {
      totalRatings: 92,
      averageOverall: 4.9,
      averageHospitality: 5.0,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.9,
      averageCourtesy: 5.0,
      averageQuality: 4.9,
      recommendationPercentage: 99,
    },
  },
];

// Management Profiles
export const DEFAULT_MANAGEMENT_PROFILES: ExperienceTarget[] = [
  {
    id: "mgr-general-manager",
    type: "management",
    category: "executive",
    icon: "Award",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/lobi2.jpg",
    title: {
      en: "General Management",
      tr: "Genel Müdürlük",
      ru: "Генеральное руководство",
      de: "Generaldirektion",
    },
    subtitle: {
      en: "Executive Leadership & Strategic Hospitality Vision",
      tr: "Üst Düzey Liderlik ve Stratejik Hizmet Vizyonu",
      ru: "Стратегическое руководство и стандарты отеля",
      de: "Operative Gesamtleitung & Qualitätsvision",
    },
    department: {
      en: "Executive Board",
      tr: "Yönetim Kurulu",
      ru: "Директорат",
      de: "Direktion",
    },
    description: {
      en: "Orchestrating 350+ hospitality professionals, guaranteeing five-star operational excellence and protecting Orka Lotus Beach's distinguished reputation.",
      tr: "350'den fazla personelin liderliği, 5 yıldızlı operasyonel mükemmelliğin sağlanması ve Orka Lotus Beach'in seçkin itibarının korunması.",
      ru: "Руководство коллективом из 350+ профессионалов, обеспечение высочайших пятизвездочных стандартов отдыха.",
      de: "Führung von über 350 Mitarbeitern, Sicherung der Fünf-Sterne-Standards und Wahrung des exklusiven Rufs.",
    },
    initialSummary: {
      totalRatings: 48,
      averageOverall: 4.9,
      averageHospitality: 5.0,
      averageProfessionalism: 5.0,
      averageHelpfulness: 4.9,
      averageCourtesy: 5.0,
      averageQuality: 5.0,
      recommendationPercentage: 99,
    },
  },
  {
    id: "mgr-operations",
    type: "management",
    category: "executive",
    icon: "Compass",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/genel1.jpg",
    title: {
      en: "Operations & Resort Management",
      tr: "Operasyon & Tesis Müdürlüğü",
      ru: "Операционное управление курортом",
      de: "Betriebsleitung & Resort-Management",
    },
    subtitle: {
      en: "Daily Cross-Departmental Coordination & Precision",
      tr: "Günlük Departmanlar Arası Ahenk ve Kusursuz Akış",
      ru: "Ежедневная синхронизация всех служб отеля",
      de: "Tägliche bereichsübergreifende Koordination",
    },
    department: {
      en: "Operations",
      tr: "Operasyon",
      ru: "Операционный отдел",
      de: "Operations",
    },
    description: {
      en: "Direct oversight of daily workflows, immediate operational responsiveness, safety compliance and harmony between departments.",
      tr: "Günlük iş akışlarının doğrudan denetimi, acil operasyonel müdahaleler, emniyet standartları ve departman uyumu.",
      ru: "Контроль всех процессов в режиме реального времени, стандарты безопасности и слаженная работа отеля.",
      de: "Direkte Steuerung der Abläufe, Notfallbereitschaft, Einhaltung von Sicherheitsstandards und Teamharmonie.",
    },
    initialSummary: {
      totalRatings: 37,
      averageOverall: 4.8,
      averageHospitality: 4.8,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.8,
      averageCourtesy: 4.9,
      averageQuality: 4.9,
      recommendationPercentage: 97,
    },
  },
  {
    id: "mgr-front-office",
    type: "management",
    category: "rooms_front",
    icon: "ConciergeBell",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/reception.png",
    title: {
      en: "Front Office Leadership",
      tr: "Ön Büro ve Resepsiyon Yönetimi",
      ru: "Руководство службой приема",
      de: "Leitung Front Office & Empfang",
    },
    subtitle: {
      en: "First Impressions, Room Allocations & Arrival Flow",
      tr: "Karşılama Zarafeti, Oda Dağıtımı ve Misafir Akışı",
      ru: "Безупречная встреча гостей и координация заселения",
      de: "Empfangsmanagement & Zimmerzuteilung",
    },
    department: {
      en: "Rooms Division",
      tr: "Konaklama Hizmetleri",
      ru: "Служба размещения",
      de: "Logisbereich",
    },
    description: {
      en: "Directing reception desk teams, VIP protocols, concierge services and fast, gracious arrivals.",
      tr: "Resepsiyon ekibinin yönetimi, VIP protokolleri, danışma masası ve hızlı, nazik giriş süreçleri.",
      ru: "Управление администраторами ресепшн, VIP-протоколами и комфортным оформлением гостей.",
      de: "Leitung des Rezeptionsteams, VIP-Protokolle, Concierge und rascher Check-in.",
    },
    initialSummary: {
      totalRatings: 45,
      averageOverall: 4.9,
      averageHospitality: 4.9,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.9,
      averageCourtesy: 5.0,
      averageQuality: 4.9,
      recommendationPercentage: 98,
    },
  },
  {
    id: "mgr-guest-relations",
    type: "management",
    category: "rooms_front",
    icon: "HeartHandshake",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/lobi2.jpg",
    title: {
      en: "Guest Relations Management",
      tr: "Misafir İlişkileri Yönetimi",
      ru: "Руководство службой Guest Relations",
      de: "Leitung Gästebetreuung (Guest Relations)",
    },
    subtitle: {
      en: "Personalized Care, Empathy & Feedback Leadership",
      tr: "Kişiselleştirilmiş İlgi, Empati ve Geri Bildirim Liderliği",
      ru: "Персональная забота, дипломатия и работа с отзывами",
      de: "Individuelle Fürsorge & Feedback-Management",
    },
    department: {
      en: "Guest Relations",
      tr: "Misafir İlişkileri",
      ru: "Служба гостей",
      de: "Gästebetreuung",
    },
    description: {
      en: "Multilingual guest diplomacy, tailored honeymoon and anniversary welcomes, personalized care and continuous feedback monitoring.",
      tr: "Çok dilli misafir diplomasisi, balayı ve yıl dönümü kutlamaları, kişiye özel ilgi ve geri bildirimlerin takibi.",
      ru: "Многоязычная коммуникация, поздравления с особыми датами, оперативное реагирование на запросы гостей.",
      de: "Mehrsprachige Diplomatie, besondere Anlässe, individuelle Wünsche und kontinuierliche Zufriedenheitsüberwachung.",
    },
    initialSummary: {
      totalRatings: 52,
      averageOverall: 4.9,
      averageHospitality: 5.0,
      averageProfessionalism: 4.9,
      averageHelpfulness: 5.0,
      averageCourtesy: 5.0,
      averageQuality: 4.9,
      recommendationPercentage: 100,
    },
  },
  {
    id: "mgr-fb-culinary",
    type: "management",
    category: "culinary_fb",
    icon: "UtensilsCrossed",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/restoran1.jpg",
    title: {
      en: "Food & Beverage and Culinary Leadership",
      tr: "Yiyecek, İçecek ve Mutfak Yönetimi",
      ru: "Руководство ресторанной службой и шеф-повара",
      de: "Gastronomie- & Küchenleitung",
    },
    subtitle: {
      en: "Gastronomic Excellence, Food Safety & Service Harmony",
      tr: "Gastronomik Zenginlik, Gıda Güvenliği ve Servis Uyumu",
      ru: "Гастрономическое разнообразие, пищевая безопасность и сервис",
      de: "Kulinarische Vielfalt & Höchste Servicestandards",
    },
    department: {
      en: "Food & Beverage",
      tr: "Yiyecek & İçecek",
      ru: "Служба питания",
      de: "Gastronomie",
    },
    description: {
      en: "Directing master culinary teams, buffet menus, five à la carte venues, hygienic standards and beverage mixology across all hotel bars.",
      tr: "Usta şeflerin koordinasyonu, büfe menüleri, beş alakart restoran, hijyen denetimleri ve tüm bar hizmetleri.",
      ru: "Контроль работы шеф-поваров, меню шведского стола и а-ля карт ресторанов, стандарты HACCP и барная карта.",
      de: "Koordination der Küchenteams, Buffets, À-la-carte-Restaurants, Barbetrieb und Qualitätskontrolle.",
    },
    initialSummary: {
      totalRatings: 57,
      averageOverall: 4.8,
      averageHospitality: 4.9,
      averageProfessionalism: 4.8,
      averageHelpfulness: 4.7,
      averageCourtesy: 4.9,
      averageQuality: 4.9,
      recommendationPercentage: 97,
    },
  },
  {
    id: "mgr-housekeeping",
    type: "management",
    category: "housekeeping",
    icon: "Sparkles",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/SEA-2_1200x800-800x533.jpg",
    title: {
      en: "Executive Housekeeping Leadership",
      tr: "Kat Hizmetleri ve Hijyen Yönetimi",
      ru: "Руководство службой гостиничного хозяйства",
      de: "Leitung Housekeeping & Hygiene",
    },
    subtitle: {
      en: "Five-Star Cleanliness Protocols & Linen Integrity",
      tr: "5 Yıldızlı Hijyen Standartları ve Tekstil Kalitesi",
      ru: "Стандарты чистоты, санитарии и свежести номеров",
      de: "Fünf-Sterne-Hygienestandards & Wäschepflege",
    },
    department: {
      en: "Housekeeping",
      tr: "Kat Hizmetleri",
      ru: "Хаускипинг",
      de: "Housekeeping",
    },
    description: {
      en: "Overseeing all 444 rooms, public lounges, terraces and linen facilities to maintain pristine seaside hygiene.",
      tr: "444 odanın tamamı, ortak alanlar, teraslar ve çamaşırhane süreçlerinin tavizsiz hijyenle yönetimi.",
      ru: "Контроль чистоты всех 444 номеров, общественных зон, террас и безупречной работы прачечной.",
      de: "Verantwortung für alle 444 Zimmer, öffentlichen Bereiche und die Wäscherei.",
    },
    initialSummary: {
      totalRatings: 41,
      averageOverall: 4.8,
      averageHospitality: 4.7,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.8,
      averageCourtesy: 4.9,
      averageQuality: 4.9,
      recommendationPercentage: 96,
    },
  },
];

// Selected Staff Members / Our People
export const DEFAULT_STAFF_PROFILES: ExperienceTarget[] = [
  {
    id: "staff-front-desk",
    type: "staff",
    category: "rooms_front",
    icon: "UserCheck",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/reception.png",
    title: {
      en: "Front Desk & Reception Team",
      tr: "Ön Büro & Resepsiyon Karşılama Görevlileri",
      ru: "Администраторы стойки регистрации",
      de: "Rezeptions- und Empfangsteam",
    },
    subtitle: {
      en: "Front Desk Host & Check-in Specialist",
      tr: "Karşılama Yetkilisi ve Kayıt Uzmanı",
      ru: "Специалист по встрече и размещению гостей",
      de: "Empfangsspezialist & Check-in Betreuung",
    },
    department: {
      en: "Front Office",
      tr: "Ön Büro",
      ru: "Служба приема",
      de: "Front Office",
    },
    description: {
      en: "Warm smiles at any hour of the night or day, rapid room key assignments, baggage guidance and kind responses to all hotel inquiries.",
      tr: "Günün her saatinde içten tebessüm, hızlı oda teslimi, valiz yönlendirmesi ve tüm sorulara sabırlı, nazik yanıtlar.",
      ru: "Круглосуточные приветливые улыбки, быстрая регистрация и готовность ответить на любой вопрос.",
      de: "Freundliches Lächeln zu jeder Tages- und Nachtzeit, schnelle Schlüsselübergabe und Auskunft.",
    },
    initialSummary: {
      totalRatings: 56,
      averageOverall: 4.9,
      averageHospitality: 5.0,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.9,
      averageCourtesy: 5.0,
      averageQuality: 4.9,
      recommendationPercentage: 99,
    },
  },
  {
    id: "staff-guest-relations-officer",
    type: "staff",
    category: "rooms_front",
    icon: "Heart",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/lobi2.jpg",
    title: {
      en: "Guest Relations Hostess",
      tr: "Misafir İlişkileri Temsilcisi",
      ru: "Специалист службы заботы о гостях",
      de: "Gästebetreuung & Concierge Hostess",
    },
    subtitle: {
      en: "Multilingual Guest Care & Special Celebrations",
      tr: "Çok Dilli Misafir İletişimi ve Özel Kutlamalar",
      ru: "Многоязычная забота и организация сюрпризов",
      de: "Mehrsprachige Gästebetreuung & Feierlichkeiten",
    },
    department: {
      en: "Guest Relations",
      tr: "Misafir İlişkileri",
      ru: "Guest Relations",
      de: "Gästebetreuung",
    },
    description: {
      en: "Inquiring about your stay comfort, organizing surprise birthday cakes, fruit platters, flowers and arranging private excursions.",
      tr: "Tatilinizin konforunu takip eden, doğum günü sürprizleri, meyve tabakları ve özel talepleri incelikle organize eden temsilcilerimiz.",
      ru: "Внимание к комфорту каждого гостя, поздравления с днем рождения, фруктовые корзины и помощь с экскурсиями.",
      de: "Regelmäßige Nachfrage nach Ihrem Wohlbefinden, Geburtstagsüberraschungen und Ausflugstipps.",
    },
    initialSummary: {
      totalRatings: 50,
      averageOverall: 4.9,
      averageHospitality: 5.0,
      averageProfessionalism: 4.9,
      averageHelpfulness: 5.0,
      averageCourtesy: 5.0,
      averageQuality: 5.0,
      recommendationPercentage: 100,
    },
  },
  {
    id: "staff-bartender",
    type: "service",
    category: "culinary_fb",
    icon: "UtensilsCrossed",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/restoran1.jpg",
    title: {
      en: "Food & Beverage",
      tr: "Yiyecek ve İçecek",
      ru: "Еда и напитки",
      de: "Speisen & Getränke",
    },
    subtitle: {
      en: "Culinary Excellence, Fresh Buffet & Artisan Beverage Experience",
      tr: "Seçkin Mutfak Sanatları, Taze Büfe ve İçecek Deneyimi",
      ru: "Кулинарные шедевры, свежий шведский стол и авторские напитки",
      de: "Kulinarische Vielfalt, frisches Buffet & Bar-Spezialitäten",
    },
    department: {
      en: "Food & Beverage",
      tr: "Yiyecek ve İçecek",
      ru: "Еда и напитки",
      de: "Speisen & Getränke",
    },
    description: {
      en: "Evaluate your culinary journey across Orka Lotus Beach Hotel — covering flavor richness, buffet presentation, ingredient freshness, barista & mixology beverages, and attentive dining hospitality.",
      tr: "Orka Lotus Beach Hotel mutfak deneyiminizi puanlayın — lezzet zenginliği, büfe sunumu, malzeme tazeliği, barista ve kokteyl içecekleri ile özenli restoran servisi.",
      ru: "Оцените гастрономический опыт в Orka Lotus Beach Hotel: богатство вкусов, подачу блюд, свежесть ингредиентов, мастерство напитков и безупречный сервис ресторанов.",
      de: "Bewerten Sie Ihr kulinarisches Erlebnis im Orka Lotus Beach Hotel — Geschmacksvielfalt, Buffet-Präsentation, Frische der Zutaten, erlesene Getränke und herzlichen Tischservice.",
    },
    initialSummary: {
      totalRatings: 68,
      averageOverall: 4.9,
      averageHospitality: 5.0,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.9,
      averageCourtesy: 5.0,
      averageQuality: 4.9,
      recommendationPercentage: 99,
    },
  },
  {
    id: "staff-dining-waiter",
    type: "staff",
    category: "culinary_fb",
    icon: "UtensilsCrossed",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/restoran1.jpg",
    title: {
      en: "Restaurant Service Specialist",
      tr: "Restoran Servis Uzmanı / Garson",
      ru: "Официант и специалист ресторанного сервиса",
      de: "Restaurant-Servicefachkraft",
    },
    subtitle: {
      en: "Pine Restaurant & À La Carte Fine Dining Waiter",
      tr: "Pine Restoran ve Alakart Servis Görevlisi",
      ru: "Официант ресторана Pine и а-ля карт ресторанов",
      de: "Servicemitarbeiter Pine & À-la-carte-Restaurants",
    },
    department: {
      en: "Restaurant Service",
      tr: "Restoran Servisi",
      ru: "Ресторанная служба",
      de: "Restaurantservice",
    },
    description: {
      en: "Attentive table clearing, prompt beverage refilling, dietary recommendations and graceful hospitality throughout dining hours.",
      tr: "Zamanında masa temizliği, içecek servisi, menü tavsiyeleri ve yemek boyunca zarif, kibar misafirperverlik.",
      ru: "Внимательное обслуживание столиков, оперативная подача напитков и искренняя вежливость за каждой трапезой.",
      de: "Aufmerksamer Tischservice, zügiges Nachschenken, Menüempfehlungen und zuvorkommende Höflichkeit.",
    },
    initialSummary: {
      totalRatings: 58,
      averageOverall: 4.8,
      averageHospitality: 4.9,
      averageProfessionalism: 4.8,
      averageHelpfulness: 4.8,
      averageCourtesy: 4.9,
      averageQuality: 4.8,
      recommendationPercentage: 97,
    },
  },
  {
    id: "staff-housekeeper",
    type: "staff",
    category: "housekeeping",
    icon: "Sparkles",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/SEA-2_1200x800-800x533.jpg",
    title: {
      en: "Floor Housekeeper & Room Attendant",
      tr: "Kat Hizmetleri ve Oda Temizlik Görevlisi",
      ru: "Горничная и специалист по чистоте номеров",
      de: "Etagen-Housekeeper & Zimmerpflege",
    },
    subtitle: {
      en: "Meticulous Daily Room Tidying & Care",
      tr: "Günlük Titiz Oda Hijyeni ve Özenli Bakım",
      ru: "Ежедневная забота о чистоте и уюте номера",
      de: "Tägliche gewissenhafte Zimmerreinigung",
    },
    department: {
      en: "Housekeeping",
      tr: "Kat Hizmetleri",
      ru: "Хаускипинг",
      de: "Housekeeping",
    },
    description: {
      en: "Crisp white bed arrangements, sparkling bathrooms, gentle towel swan folds and respect for guest privacy at all times.",
      tr: "Kusursuz çarşaflar, pırıl pırıl banyolar, havlu kuğu sanatları ve misafir mahremiyetine tam saygı.",
      ru: "Идеально заправленная постель, чистота в ванной комнате, фигуры из полотенец и уважение к личному пространству.",
      de: "Frische Bettwäsche, glänzende Bäder, liebevolle Handtuchfiguren und absolute Diskretion.",
    },
    initialSummary: {
      totalRatings: 51,
      averageOverall: 4.9,
      averageHospitality: 4.8,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.9,
      averageCourtesy: 5.0,
      averageQuality: 4.9,
      recommendationPercentage: 98,
    },
  },
  {
    id: "staff-animator",
    type: "staff",
    category: "wellness_recreation",
    icon: "Smile",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MARMARIS/Marmaris%20collage%202.png",
    title: {
      en: "Entertainment Host / Animator",
      tr: "Animasyon ve Eğlence Lideri",
      ru: "Аниматор и ведущий развлекательных программ",
      de: "Animations- und Unterhaltungsteam",
    },
    subtitle: {
      en: "Energizing Pool Activities, Games & Shows",
      tr: "Enerjik Havuz Oyunları, Spor ve Sahne Neşesi",
      ru: "Игры у бассейна, спортивные турниры и вечерняя сцена",
      de: "Poolspiele, Sportaktivitäten und Abendmoderation",
    },
    department: {
      en: "Entertainment",
      tr: "Animasyon",
      ru: "Анимация",
      de: "Animation",
    },
    description: {
      en: "Infectious positivity, engaging guests in friendly games without being intrusive, and creating laughter for families and couples.",
      tr: "Bulaşıcı neşe, rahatsız etmeden herkesi eğlenceye dahil eden oyunlar ve aileler için kahkaha dolu anlar.",
      ru: "Заряжающая энергия, тактичное вовлечение в игры и создание праздничной атмосферы для всех возрастов.",
      de: "Mitreißende Fröhlichkeit, unaufdringliche Animation und herzliche Urlaubsstimmung.",
    },
    initialSummary: {
      totalRatings: 46,
      averageOverall: 4.8,
      averageHospitality: 5.0,
      averageProfessionalism: 4.7,
      averageHelpfulness: 4.8,
      averageCourtesy: 4.9,
      averageQuality: 4.8,
      recommendationPercentage: 96,
    },
  },
  {
    id: "staff-spa-therapist",
    type: "staff",
    category: "wellness_recreation",
    icon: "Flower2",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LOGO/medical%20center.png",
    title: {
      en: "Spa & Hammam Specialist",
      tr: "Spa Terapisti ve Hamam Ustası",
      ru: "Спа-терапевт и мастер хаммама",
      de: "Spa-Therapeut & Hamam-Meister",
    },
    subtitle: {
      en: "Restorative Massage & Authentic Scrub Therapies",
      tr: "Yenileyici Masaj ve Geleneksel Kese-Köpük Bakımı",
      ru: "Восстанавливающий массаж и традиционные спа-ритуалы",
      de: "Entspannungsmassagen & traditionelle Hamam-Pflege",
    },
    department: {
      en: "Lotus Spa",
      tr: "Lotus Spa",
      ru: "Lotus Spa",
      de: "Lotus Spa",
    },
    description: {
      en: "Certified pressure point and aromatherapy expertise, relieving travel tension and delivering deep physical rejuvenation.",
      tr: "Sertifikalı aromaterapi ve masaj uzmanlığı, tatil yorgunluğunu dindiren ve bedeni yenileyen şifalı dokunuşlar.",
      ru: "Сертифицированные техники ароматерапии и массажа для снятия стресса и глубокой релаксации.",
      de: "Zertifizierte Massagen, Aromatherapie und vollkommene Erholung von Körper und Geist.",
    },
    initialSummary: {
      totalRatings: 42,
      averageOverall: 4.9,
      averageHospitality: 5.0,
      averageProfessionalism: 5.0,
      averageHelpfulness: 4.9,
      averageCourtesy: 5.0,
      averageQuality: 5.0,
      recommendationPercentage: 100,
    },
  },
  {
    id: "staff-beach-attendant",
    type: "staff",
    category: "wellness_recreation",
    icon: "Sun",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ICON/ICON%20LOGO.jpg",
    title: {
      en: "Beach & Pier Attendant",
      tr: "Plaj ve İskele Servis Görevlisi",
      ru: "Сотрудник пляжа и пирса",
      de: "Strand- und Stegbetreuer",
    },
    subtitle: {
      en: "Sunbed Preparation, Umbrellas & Coastline Care",
      tr: "Şezlong Düzeni, Şemsiyeler ve Sahil Temizliği",
      ru: "Подготовка шезлонгов, зонтиков и забота о чистоте пляжа",
      de: "Liegenvorbereitung, Sonnenschirme & Strandsauberkeit",
    },
    department: {
      en: "Beach Services",
      tr: "Plaj Hizmetleri",
      ru: "Пляжная служба",
      de: "Strandservice",
    },
    description: {
      en: "Setting up comfortable shade umbrellas, cleaning seaside pathways, assisting with mattresses and keeping the bay spotless.",
      tr: "Şemsiyelerin ayarlanması, sahil yürüyüş yollarının temizliği, minder desteği ve kıyının pırıl pırıl tutulması.",
      ru: "Помощь с зонтиками и матрасами, поддержание чистоты на пирсах и береговой линии.",
      de: "Aufstellen der Sonnenschirme, Pflege der Stege und aufmerksamer Service am Meeresufer.",
    },
    initialSummary: {
      totalRatings: 38,
      averageOverall: 4.8,
      averageHospitality: 4.8,
      averageProfessionalism: 4.8,
      averageHelpfulness: 4.9,
      averageCourtesy: 4.9,
      averageQuality: 4.8,
      recommendationPercentage: 97,
    },
  },
];

export const OVERALL_LOTUS_TARGET: ExperienceTarget = {
  id: "service-overall-hospitality",
  type: "service",
  category: "executive",
  icon: "Star",
  photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/genel1.jpg",
  title: {
    en: "Overall Lotus Experience",
    tr: "Genel Lotus Deneyimi",
    ru: "Общий опыт Orka Lotus",
    de: "Gesamtes Lotus-Erlebnis",
  },
  subtitle: {
    en: "5-Star Ultra All Inclusive Aegean Resort Harmony",
    tr: "5 Yıldızlı Ultra Her Şey Dahil Ege Ruhunun Ahengi",
    ru: "Пятизвездочный ультра все включено на Эгейском море",
    de: "Fünf-Sterne Ultra All-Inclusive Ägäis-Erlebnis",
  },
  department: {
    en: "Overall Lotus Stars",
    tr: "Genel Lotus Yıldızları",
    ru: "Общие звезды Lotus",
    de: "Gesamte Lotus-Sterne",
  },
  description: {
    en: "Evaluate your complete five-star stay at Orka Lotus Beach — hospitality, atmosphere, gastronomy, pristine bays, and departmental harmony.",
    tr: "Orka Lotus Beach'teki 5 yıldızlı konaklamanızı değerlendirin — misafirperverlik, atmosfer, gastronomi, berrak koylar ve hizmet ahengi.",
    ru: "Оцените ваш пятизвездочный отдых в Orka Lotus Beach: сервис, атмосферу, кухню, чистоту моря и гармонию всех отделов.",
    de: "Bewerten Sie Ihren gesamten 5-Sterne-Aufenthalt im Orka Lotus Beach — Gastfreundschaft, Atmosphäre, Kulinarik und Service.",
  },
  initialSummary: {
    totalRatings: 94,
    averageOverall: 4.9,
    averageHospitality: 5.0,
    averageProfessionalism: 4.9,
    averageHelpfulness: 4.9,
    averageCourtesy: 5.0,
    averageQuality: 4.9,
    recommendationPercentage: 99,
  },
};

export const RATE_YOUR_LOTUS_SEGMENTS: ExperienceTarget[] = [
  {
    id: "service-reception",
    type: "service",
    category: "rooms_front",
    icon: "KeyRound",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/reception.png",
    title: {
      en: "Reception",
      tr: "Resepsiyon",
      ru: "Ресепшн",
      de: "Rezeption",
    },
    subtitle: {
      en: "Front Desk, Welcome & Check-in",
      tr: "Ön Büro, Karşılama ve Giriş İşlemleri",
      ru: "Служба приема, встреча и заселение",
      de: "Empfang, Begrüßung & Check-in",
    },
    department: {
      en: "Front Office",
      tr: "Ön Büro",
      ru: "Служба приема",
      de: "Front Office",
    },
    description: {
      en: "Arrival greeting, check-in efficiency, luggage assistance, room orientation and 24/7 front desk attentiveness.",
      tr: "Otele varışta karşılama, check-in hızı, bagaj servisi, oda bilgilendirmesi ve 7/24 resepsiyon ilgisi.",
      ru: "Встреча по прибытии, оперативность заселения, доставка багажа и круглосуточная помощь ресепшн.",
      de: "Begrüßung bei Anreise, reibungsloser Check-in, Gepäckservice und 24-Stunden-Rezeptionsservice.",
    },
    initialSummary: {
      totalRatings: 69,
      averageOverall: 4.9,
      averageHospitality: 4.9,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.8,
      averageCourtesy: 5.0,
      averageQuality: 4.9,
      recommendationPercentage: 98,
    },
  },
  {
    id: "service-food-beverage",
    type: "service",
    category: "culinary_fb",
    icon: "UtensilsCrossed",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/restoran1.jpg",
    title: {
      en: "Food & Beverage",
      tr: "Yiyecek & İçecek",
      ru: "Еда и напитки",
      de: "Speisen & Getränke",
    },
    subtitle: {
      en: "Main Buffet, Specialty Cuisines & Dining",
      tr: "Açık Büfe, Gurme Restoranlar ve Sunumlar",
      ru: "Шведский стол, рестораны и кулинарные изыски",
      de: "Hauptbuffet, Spezialitätenrestaurants & Kulinarik",
    },
    department: {
      en: "Food & Beverage",
      tr: "Yiyecek ve İçecek",
      ru: "Ресторанная служба",
      de: "Gastronomie",
    },
    description: {
      en: "Rich open buffet presentations, fresh seasonal ingredients, authentic Aegean and international flavors, and attentive restaurant hospitality.",
      tr: "Zengin açık büfe sunumları, taze malzemeler, Ege ve dünya lezzetleri ile özenli restoran servis kalitesi.",
      ru: "Богатый шведский стол, свежие ингредиенты, блюда эгейской и международной кухни, внимательный сервис.",
      de: "Vielfältige Buffets, frische Zutaten, Spezialitäten der ägäischen Küche und aufmerksamer Tischservice.",
    },
    initialSummary: {
      totalRatings: 73,
      averageOverall: 4.9,
      averageHospitality: 4.9,
      averageProfessionalism: 4.8,
      averageHelpfulness: 4.8,
      averageCourtesy: 4.9,
      averageQuality: 4.9,
      recommendationPercentage: 97,
    },
  },
  {
    id: "service-bar",
    type: "service",
    category: "culinary_fb",
    icon: "Wine",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/genel1.jpg",
    title: {
      en: "Bar",
      tr: "Bar & Kokteyller",
      ru: "Бар и напитки",
      de: "Bar & Cocktails",
    },
    subtitle: {
      en: "Signature Mixology, Premium Spirits & Baristas",
      tr: "Özel Kokteyller, Seçkin İçecekler ve Kahve",
      ru: "Авторские коктейли, напитки и кофе",
      de: "Signature Cocktails, Premium-Drinks & Kaffee",
    },
    department: {
      en: "Bars & Lounges",
      tr: "Barlar ve İçecekler",
      ru: "Барная служба",
      de: "Bar & Lounge",
    },
    description: {
      en: "Handcrafted signature cocktails, top-shelf spirits, Turkish coffee rituals, prompt counter service and refreshing drinks by the bay.",
      tr: "Usta barmenlerin hazırladığı özel kokteyller, seçkin içecekler, geleneksel Türk kahvesi ve hızlı servis.",
      ru: "Фирменные коктейли от барменов, премиальные напитки, турецкий кофе и быстрое обслуживание.",
      de: "Feine Cocktails, Premium-Spirituosen, türkischer Mokka und freundlicher Barservice mit Meerblick.",
    },
    initialSummary: {
      totalRatings: 59,
      averageOverall: 4.9,
      averageHospitality: 5.0,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.8,
      averageCourtesy: 5.0,
      averageQuality: 4.9,
      recommendationPercentage: 98,
    },
  },
  {
    id: "service-beach-pier",
    type: "service",
    category: "wellness_recreation",
    icon: "Umbrella",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ICON/ICON%20LOGO.jpg",
    title: {
      en: "Beach & Pier Operations",
      tr: "Plaj & İskele Hizmetleri",
      ru: "Пляж и пирсы",
      de: "Strand- & Stegbetrieb",
    },
    subtitle: {
      en: "650m Coastline, Wooden Piers & Loungers",
      tr: "650 Metrelik Sahil, Ahşap İskeleler ve Şezlonglar",
      ru: "650 м пляжа, деревянные пирсы и шезлонги",
      de: "650 m Strand, Holzstege & Liegebereiche",
    },
    department: {
      en: "Beach & Pier Operations",
      tr: "Plaj ve İskele",
      ru: "Служба пляжа и пирсов",
      de: "Strand- & Stegbetrieb",
    },
    description: {
      en: "Pristine private Aegean bay, wooden sunbathing jetties, comfortable shade umbrellas, seaside towel service and orderly sunbeds.",
      tr: "Mavi Bayraklı özel Ege koyu, ahşap güneşlenme iskeleleri, şemsiyeler, temiz sahil düzeni ve havlu hizmeti.",
      ru: "Чистейший залив с Голубым флагом, пирсы для загара, удобные шезлонги, зонты и пляжные полотенца.",
      de: "Privater Ägäis-Strand mit Blauer Flagge, Holzstege, bequeme Liegen, Sonnenschirme und Handtuchausgabe.",
    },
    initialSummary: {
      totalRatings: 66,
      averageOverall: 4.9,
      averageHospitality: 4.9,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.8,
      averageCourtesy: 5.0,
      averageQuality: 5.0,
      recommendationPercentage: 99,
    },
  },
  {
    id: "service-spa-wellness",
    type: "service",
    category: "wellness_recreation",
    icon: "Sparkles",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LOGO/medical%20center.png",
    title: {
      en: "Spa & Wellness",
      tr: "Spa & Sağlık",
      ru: "Спа и велнес",
      de: "Spa & Wellness",
    },
    subtitle: {
      en: "Traditional Turkish Bath, Sauna & Massages",
      tr: "Geleneksel Türk Hamamı, Sauna ve Masajlar",
      ru: "Традиционный хаммам, сауна и массаж",
      de: "Traditionelles Hamam, Sauna & Massagen",
    },
    department: {
      en: "Lotus Spa & Wellness",
      tr: "Lotus Spa ve Sağlık",
      ru: "Lotus Spa & Велнес",
      de: "Lotus Spa & Wellness",
    },
    description: {
      en: "Ottoman hammam kese and foam rituals, Bali & Thai massage therapies, Finnish sauna, steam baths and tranquil relaxation lounges.",
      tr: "Geleneksel Türk hamamında kese-köpük bakımları, Bali ve Uzak Doğu masajları, sauna ve huzurlu dinlenme alanları.",
      ru: "Ритуалы хаммама, балийские и восточные массажи, сауна, хаммам и восстанавливающая релакс-зона.",
      de: "Traditionelle Hamam-Anwendungen, Kese- und Schaumrituale, Massagen, Sauna und Ruhebereiche.",
    },
    initialSummary: {
      totalRatings: 58,
      averageOverall: 4.9,
      averageHospitality: 4.9,
      averageProfessionalism: 5.0,
      averageHelpfulness: 4.9,
      averageCourtesy: 5.0,
      averageQuality: 4.9,
      recommendationPercentage: 98,
    },
  },
  {
    id: "service-pool-bar",
    type: "service",
    category: "wellness_recreation",
    icon: "Waves",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/pools_800x1200.jpg",
    title: {
      en: "Pool & Bar",
      tr: "Havuz & Havuz Barı",
      ru: "Бассейн и пул-бар",
      de: "Pool & Poolbar",
    },
    subtitle: {
      en: "Lagoon Pools, Waterslides & Poolside Refreshments",
      tr: "Lagün Havuzları, Su Kaydırakları ve İçecek Servisi",
      ru: "Бассейны-лагуны, водные горки и напитки у воды",
      de: "Lagunenpools, Wasserrutschen & Erfrischungen am Pool",
    },
    department: {
      en: "Pool Facilities & Bar",
      tr: "Havuz ve Bar Hizmetleri",
      ru: "Бассейны и пул-бар",
      de: "Pool & Poolbar",
    },
    description: {
      en: "Crystal-clear fresh water pools, thrilling aquapark slides, quiet adult relaxation pool and attentive poolside drink service.",
      tr: "Berrak havuz suları, eğlenceli su kaydırakları, sessiz dinlenme havuzu ve havuz başı içecek ikramları.",
      ru: "Чистейшая вода в бассейнах, аквапарк с горками, тихий релакс-бассейн и подача напитков прямо к шезлонгам.",
      de: "Kristallklares Wasser, Wasserrutschen, ruhiger Erwachsenenpool und zuvorkommender Barservice am Pool.",
    },
    initialSummary: {
      totalRatings: 52,
      averageOverall: 4.8,
      averageHospitality: 4.8,
      averageProfessionalism: 4.8,
      averageHelpfulness: 4.8,
      averageCourtesy: 4.9,
      averageQuality: 4.9,
      recommendationPercentage: 96,
    },
  },
  {
    id: "service-mini-club",
    type: "service",
    category: "wellness_recreation",
    icon: "Smile",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/mini-club-2.jpg",
    title: {
      en: "Mini Club & Childcare",
      tr: "Mini Kulüp & Çocuk Hizmetleri",
      ru: "Мини-клуб и забота о детях",
      de: "Miniclub & Kinderbetreuung",
    },
    subtitle: {
      en: "Kids Activities, Creative Workshops & Mini Disco",
      tr: "Çocuk Aktiviteleri, Eğitici Atölyeler ve Mini Disko",
      ru: "Детские программы, мастер-классы и мини-диско",
      de: "Kinderprogramm, Workshops & Minidisco",
    },
    department: {
      en: "Mini Club & Childcare",
      tr: "Mini Kulüp ve Çocuk Bakımı",
      ru: "Мини-клуб",
      de: "Miniclub",
    },
    description: {
      en: "Caring multilingual youth animators, shaded playgrounds, painting, treasure hunts, interactive games and evening mini disco.",
      tr: "Çok dilli uzman eğitmenler, gölgeli oyun parkı, boyama etkinlikleri, eğlenceli yarışmalar ve akşam mini diskosu.",
      ru: "Заботливые аниматоры, безопасная тенистая площадка, мастер-классы, конкурсы и вечернее мини-диско.",
      de: "Liebevolle mehrsprachige Betreuer, schattige Spielplätze, Bastelworkshops und fröhliche Minidisco.",
    },
    initialSummary: {
      totalRatings: 44,
      averageOverall: 4.8,
      averageHospitality: 5.0,
      averageProfessionalism: 4.8,
      averageHelpfulness: 4.9,
      averageCourtesy: 5.0,
      averageQuality: 4.8,
      recommendationPercentage: 97,
    },
  },
  {
    id: "service-entertainment",
    type: "service",
    category: "wellness_recreation",
    icon: "Music",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/MARMARIS/Marmaris%20collage%202.png",
    title: {
      en: "Entertainment & Animation",
      tr: "Eğlence & Animasyon",
      ru: "Развлечения и анимация",
      de: "Unterhaltung & Animation",
    },
    subtitle: {
      en: "Amphitheatre Shows, Live Music & Beach Parties",
      tr: "Amfitiyatro Gösterileri, Canlı Müzik ve Partiler",
      ru: "Вечерние шоу, живая музыка и пляжные вечеринки",
      de: "Amphitheater-Shows, Live-Bands & Partys",
    },
    department: {
      en: "Entertainment & Shows",
      tr: "Animasyon ve Gösteriler",
      ru: "Шоу-программы",
      de: "Entertainment",
    },
    description: {
      en: "World-class acrobatic performances, international dance troupes, romantic seaside live acoustic music and lively daytime sports.",
      tr: "Uluslararası dans ve akrobasi gösterileri, deniz kenarında canlı müzik dinletileri ve gündüz spor aktiviteleri.",
      ru: "Яркие акробатические и танцевальные номера, живая музыка на закате и активные дневные турниры.",
      de: "Internationale Showtänzer, Akrobatik, Live-Konzerte am Meer und abwechslungsreiches Sportprogramm.",
    },
    initialSummary: {
      totalRatings: 47,
      averageOverall: 4.8,
      averageHospitality: 4.9,
      averageProfessionalism: 4.8,
      averageHelpfulness: 4.7,
      averageCourtesy: 4.9,
      averageQuality: 4.8,
      recommendationPercentage: 95,
    },
  },
  {
    id: "service-rooms",
    type: "service",
    category: "rooms_front",
    icon: "Bed",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/SEA-2_1200x800-800x533.jpg",
    title: {
      en: "Rooms & Services",
      tr: "Odalar & Hizmetler",
      ru: "Номера и комфорт",
      de: "Zimmer & Service",
    },
    subtitle: {
      en: "Pine Forest & Sea Views, Bed Comfort & Amenities",
      tr: "Orman ve Deniz Manzarası, Yatak Rahatlığı ve Konfor",
      ru: "Виды на море и сосны, удобство кроватей и оснащение",
      de: "Meer- und Waldblick, Schlafkomfort & Ausstattung",
    },
    department: {
      en: "Rooms Division",
      tr: "Oda Hizmetleri",
      ru: "Номерной фонд",
      de: "Zimmerabteilung",
    },
    description: {
      en: "Spacious balconies with Aegean panoramas, orthopaedic beds, whisper-quiet air conditioning, minibar freshness and five-star room amenities.",
      tr: "Geniş balkonlar, ortopedik yataklar, sessiz klima performansı, taze minibar ikramları ve zengin oda donanımı.",
      ru: "Просторные балконы с панорамным видом, ортопедические кровати, тихий кондиционер и оснащение номера.",
      de: "Balkone mit Panoramablick, bequeme Betten, flüsterleise Klimaanlage, gefüllte Minibar und Annehmlichkeiten.",
    },
    initialSummary: {
      totalRatings: 64,
      averageOverall: 4.9,
      averageHospitality: 4.9,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.8,
      averageCourtesy: 4.9,
      averageQuality: 4.9,
      recommendationPercentage: 97,
    },
  },
  {
    id: "service-housekeeping",
    type: "service",
    category: "housekeeping",
    icon: "Sparkles",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/07/SEA-2_1200x800-800x533.jpg",
    title: {
      en: "Housekeeping",
      tr: "Kat Hizmetleri",
      ru: "Уборка и чистота",
      de: "Housekeeping",
    },
    subtitle: {
      en: "Daily Room Sanitization, Fresh Linens & Care",
      tr: "Günlük Oda Hijyeni, Taze Çarşaflar ve Titiz Bakım",
      ru: "Ежедневная уборка, свежее белье и чистота",
      de: "Tägliche Zimmerreinigung, frische Wäsche & Pflege",
    },
    department: {
      en: "Housekeeping",
      tr: "Kat Hizmetleri",
      ru: "Служба горничных",
      de: "Housekeeping",
    },
    description: {
      en: "Meticulous daily room sanitization, plush towel replenishment, fresh crisp linens, and attentive housekeeping care throughout your stay.",
      tr: "Her gün titizlikle yapılan oda temizliği, taze havlu ve nevresim değişimi ile kat görevlilerimizin saygılı ilgisi.",
      ru: "Тщательная ежедневная уборка, регулярная смена белья и полотенец, внимание к каждой детали номера.",
      de: "Sorgfältige tägliche Reinigung, frische Handtücher, saubere Bettwäsche und diskreter Zimmerservice.",
    },
    initialSummary: {
      totalRatings: 61,
      averageOverall: 4.8,
      averageHospitality: 4.7,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.8,
      averageCourtesy: 4.9,
      averageQuality: 4.9,
      recommendationPercentage: 96,
    },
  },
  {
    id: "service-icon-beach",
    type: "service",
    category: "wellness_recreation",
    icon: "Palmtree",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/ICON/ICON%20LOGO.jpg",
    title: {
      en: "Icon Beach",
      tr: "Icon Beach Club",
      ru: "Icon Beach Club",
      de: "Icon Beach Club",
    },
    subtitle: {
      en: "Exclusive VIP Beach Club, Loungers & Bay Vibes",
      tr: "Özel VIP Plaj Kulübü, Lüks Şezlonglar ve Özel Ritim",
      ru: "VIP-пляж, лаунж-шезлонги и музыкальная атмосфера",
      de: "Exklusiver VIP-Strandclub, Liegen & Buchtflair",
    },
    department: {
      en: "Icon Beach Club",
      tr: "Icon Beach Kulübü",
      ru: "Icon Beach",
      de: "Icon Beach",
    },
    description: {
      en: "Signature VIP cabana service, seaside mixology cocktails, curated DJ lounge sets and sophisticated Mediterranean beachfront atmosphere.",
      tr: "Özel VIP kabana hizmeti, sahil kokteylleri, seçkin DJ müzikleri ve Ege kıyısında ayrıcalıklı plaj kulübü deneyimi.",
      ru: "Премиальные VIP-кабаны, авторские коктейли у воды, диджей-сеты и стильный отдых на берегу моря.",
      de: "VIP-Pavillons, exklusive Cocktails am Meer, ausgewählte DJ-Sets und erstklassige Club-Atmosphäre.",
    },
    initialSummary: {
      totalRatings: 55,
      averageOverall: 4.9,
      averageHospitality: 5.0,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.9,
      averageCourtesy: 5.0,
      averageQuality: 5.0,
      recommendationPercentage: 99,
    },
  },
  {
    id: "service-watersports",
    type: "service",
    category: "wellness_recreation",
    icon: "Sailboat",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/WATERSPORTS/JET%20SKI%20(2).jpg",
    title: {
      en: "Watersports",
      tr: "Su Sporları",
      ru: "Водные виды спорта",
      de: "Wassersport",
    },
    subtitle: {
      en: "Parasailing, Jet Ski, Wakeboard & Bay Adventures",
      tr: "Parasailing, Jet Ski, Su Kayağı ve Körfez Turları",
      ru: "Парасейлинг, гидроциклы, вейкборд и морской драйв",
      de: "Parasailing, Jetski, Wakeboard & Wasserspaß",
    },
    department: {
      en: "Watersports Center",
      tr: "Su Sporları Merkezi",
      ru: "Водный спорт",
      de: "Wassersportzentrum",
    },
    description: {
      en: "Adrenaline-fueled bay excursions, certified maritime captains, premium watersports equipment and strict international safety standards.",
      tr: "Marmaris Körfezi'nde parasailing, jet ski turları, su kayağı heyecanı ve sertifikalı eğitmenlerle yüksek güvenlik.",
      ru: "Морские приключения, опытные инструкторы, современная техника и строгие стандарты безопасности.",
      de: "Adrenalinreiches Wassersportprogramm, lizenzierte Instruktoren und moderne Sicherheitsausrüstung.",
    },
    initialSummary: {
      totalRatings: 39,
      averageOverall: 4.9,
      averageHospitality: 4.8,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.8,
      averageCourtesy: 4.8,
      averageQuality: 4.9,
      recommendationPercentage: 97,
    },
  },
  {
    id: "service-executive-management",
    type: "service",
    category: "executive",
    icon: "Award",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/lobi2.jpg",
    title: {
      en: "Executive Management",
      tr: "Genel Yönetim",
      ru: "Руководство отеля",
      de: "Geschäftsleitung",
    },
    subtitle: {
      en: "Resort Governance & 5-Star Quality Standards",
      tr: "Otel İdaresi ve 5 Yıldızlı Kalite Güvencesi",
      ru: "Управление курортом и стандарты качества",
      de: "Hotelleitung & Fünf-Sterne-Standards",
    },
    department: {
      en: "Executive Directorate",
      tr: "Genel Müdürlük",
      ru: "Дирекция",
      de: "Direktion",
    },
    description: {
      en: "Resort leadership, staff training, quality assurance oversight, guest satisfaction commitment and operational harmony.",
      tr: "Otel yönetimi, personel eğitimi, kalite denetimleri, misafir odaklı hizmet anlayışı ve kusursuz operasyonel uyum.",
      ru: "Руководство отелем, контроль сервиса, обучение персонала и неизменные стандарты пятизвездочного отдыха.",
      de: "Gesamtleitung, Qualitätskontrolle, Personalentwicklung und Engagement für erstklassigen Gästeservice.",
    },
    initialSummary: {
      totalRatings: 78,
      averageOverall: 4.9,
      averageHospitality: 5.0,
      averageProfessionalism: 5.0,
      averageHelpfulness: 4.9,
      averageCourtesy: 5.0,
      averageQuality: 4.9,
      recommendationPercentage: 99,
    },
  },
  {
    id: "service-medical-services",
    type: "service",
    category: "executive",
    icon: "HeartPulse",
    photoUrl: "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LOGO/medical%20center.png",
    title: {
      en: "Medical Services",
      tr: "Sağlık Hizmetleri",
      ru: "Медицинская служба",
      de: "Medizinische Dienste",
    },
    subtitle: {
      en: "On-Site Doctor, Nurse & 24/7 First Aid Care",
      tr: "Otel Doktoru, Hemşire ve 7/24 İlk Yardım",
      ru: "Дежурный врач, медсестра и круглосуточная помощь",
      de: "Hotelarzt, Pflegekraft & 24/7 Erste Hilfe",
    },
    department: {
      en: "Executive Directorate",
      tr: "Genel Müdürlük",
      ru: "Дирекция",
      de: "Direktion",
    },
    description: {
      en: "Licensed resort physician, registered nursing staff, 24/7 emergency first aid, medical consultations and professional healthcare reassurance for your peace of mind.",
      tr: "Otel bünyesindeki lisanslı hekim, deneyimli hemşire kadrosu, 7/24 acil ilk yardım ve aileniz için güvenilir sağlık desteği.",
      ru: "Квалифицированный врач отеля, медперсонал, круглосуточная первая помощь и забота о здоровье гостей.",
      de: "Zugelassener Hotelarzt, Pflegepersonal, 24-Stunden-Erstversorgung und verlässliche medizinische Betreuung.",
    },
    initialSummary: {
      totalRatings: 48,
      averageOverall: 5.0,
      averageHospitality: 5.0,
      averageProfessionalism: 5.0,
      averageHelpfulness: 5.0,
      averageCourtesy: 5.0,
      averageQuality: 5.0,
      recommendationPercentage: 100,
    },
  },
  {
    id: "service-guest-relations",
    type: "service",
    category: "rooms_front",
    icon: "HeartHandshake",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/lobi2.jpg",
    title: {
      en: "Guest Relations",
      tr: "Misafir İlişkileri",
      ru: "Служба заботы о гостях",
      de: "Gästebetreuung",
    },
    subtitle: {
      en: "Personalized Care, Special Requests & VIP Welcome",
      tr: "Kişiye Özel İlgi, Özel Günler ve Talepler",
      ru: "Индивидуальный подход и исполнение пожеланий",
      de: "Individuelle Betreuung & VIP-Gästeservice",
    },
    department: {
      en: "Guest Services",
      tr: "Misafir Hizmetleri",
      ru: "Сервис гостей",
      de: "Gästeservice",
    },
    description: {
      en: "Attentive personalized guest support, special honeymoon and anniversary arrangements, dining reservations and prompt issue resolution.",
      tr: "Kişiye özel misafir ilgisi, balayı ve özel gün kutlamaları, restoran rezervasyonları ve her talebe hızlı çözüm.",
      ru: "Персональная забота о гостях, организация поздравлений, бронирование столиков и оперативная помощь 24/7.",
      de: "Persönliche Betreuung, Organisation von Jubiläen, Reservierungsservice und schnelle Unterstützung bei allen Wünschen.",
    },
    initialSummary: {
      totalRatings: 54,
      averageOverall: 4.9,
      averageHospitality: 5.0,
      averageProfessionalism: 4.9,
      averageHelpfulness: 4.9,
      averageCourtesy: 5.0,
      averageQuality: 4.9,
      recommendationPercentage: 100,
    },
  },
  {
    id: "service-shops",
    type: "service",
    category: "wellness_recreation",
    icon: "ShoppingBag",
    photoUrl: "https://www.orkalotusbeach.com/wp-content/uploads/2025/05/genel1.jpg",
    title: {
      en: "Shops",
      tr: "Mağazalar & Butikler",
      ru: "Магазины и бутики",
      de: "Geschäfte & Boutiquen",
    },
    subtitle: {
      en: "Shopping Arcade, Boutique, Jeweler & Market",
      tr: "Alışveriş Çarşısı, Butik, Mücevher ve Market",
      ru: "Торговая галерея, бутики, ювелирные изделия и маркет",
      de: "Einkaufspassage, Boutiquen, Schmuck & Minimarkt",
    },
    department: {
      en: "Shopping Arcade",
      tr: "Alışveriş Çarşısı",
      ru: "Торговая галерея",
      de: "Shopping Arcade",
    },
    description: {
      en: "Curated resort shopping, luxury jewelry, authentic Turkish souvenirs, beachwear fashion, leather goods and convenience market essentials.",
      tr: "Seçkin resort butikleri, özel mücevherat, otantik hediyelikler, plaj modası, deri ürünleri ve günlük market ihtiyaçları.",
      ru: "Курортные бутики, ювелирные изделия, сувениры, пляжная одежда, кожгалантерея и товары первой необходимости.",
      de: "Exklusive Boutiquen, Juwelier, traditionelle Souvenirs, Bademode, Lederwaren und Waren des täglichen Bedarfs.",
    },
    initialSummary: {
      totalRatings: 42,
      averageOverall: 4.8,
      averageHospitality: 4.9,
      averageProfessionalism: 4.8,
      averageHelpfulness: 4.8,
      averageCourtesy: 4.9,
      averageQuality: 4.8,
      recommendationPercentage: 97,
    },
  },
];

export const ALL_EXPERIENCE_TARGETS: ExperienceTarget[] = [
  OVERALL_LOTUS_TARGET,
  ...RATE_YOUR_LOTUS_SEGMENTS,
  ...DEFAULT_HOTEL_SERVICES.filter(
    (s) => !RATE_YOUR_LOTUS_SEGMENTS.some((r) => r.id === s.id) && s.id !== OVERALL_LOTUS_TARGET.id
  ),
  ...DEFAULT_MANAGEMENT_PROFILES,
  ...DEFAULT_STAFF_PROFILES,
];

// Complete multilingual UI text
export const ORKA_EXPERIENCE_TRANSLATIONS: Record<
  Locale,
  {
    badge: string;
    title: string;
    subtitle: string;
    secondaryHeading: string;
    supportingText: string;
    tabs: {
      all: string;
      services: string;
      management: string;
      staff: string;
    };
    sort: {
      highestRated: string;
      mostRated: string;
      mostRecommended: string;
      alphabetical: string;
    };
    searchPlaceholder: string;
    statBadges: {
      new: string;
      emerging: string;
      ranked: string;
      highlyRated: string;
    };
    insights: {
      title: string;
      subtitle: string;
      overallRating: string;
      totalRatings: string;
      recommendationRate: string;
      topService: string;
      mostRatedDept: string;
      topPersonnel: string;
    };
    leaderboard: {
      title: string;
      subtitle: string;
      rank: string;
      entity: string;
      category: string;
      score: string;
      reviews: string;
      recommendation: string;
      action: string;
    };
    cards: {
      rateButton: string;
      detailsButton: string;
      recommendBadge: string;
      reviewsLabel: string;
    };
    modal: {
      step1Title: string;
      step1Subtitle: string;
      step2Title: string;
      step2Subtitle: string;
      step3Title: string;
      step3Subtitle: string;
      recommendationQuestion: string;
      feedbackPrompt: string;
      characterCount: string;
      guestNamePrompt: string;
      guestNamePlaceholder: string;
      anonymousNote: string;
      nextButton: string;
      backButton: string;
      submitButton: string;
      submitting: string;
      tactileRecorded: string;
      rateLimitWarning: string;
    };
    success: {
      title: string;
      subtitle: string;
      body: string;
      rateAnother: string;
      backToRankings: string;
    };
    dimensions: {
      breakdownTitle: string;
    };
    empty: {
      noResults: string;
      clearFilters: string;
    };
    homeBanner: {
      badge: string;
      title: string;
      subtitle: string;
      cta: string;
    };
  }
> = {
  en: {
    badge: "ORKA LOTUS BEACH · 5-STAR HOSPITALITY AWARDS",
    title: "⭐ RATE YOUR LOTUS",
    subtitle: "Guest Experience & Hospitality Rankings",
    secondaryHeading: "Your Experience. Our Commitment to Excellence.",
    supportingText:
      "Your experience matters to us. Share your feedback and help us recognize the people and services that make every stay at ORKA LOTUS BEACH HOTEL memorable.",
    tabs: {
      all: "All Rankings",
      services: "Hotel Services (13)",
      management: "Management & Leadership",
      staff: "Our People (Hospitality Staff)",
    },
    sort: {
      highestRated: "Highest Rated",
      mostRated: "Most Evaluated",
      mostRecommended: "Most Recommended",
      alphabetical: "Alphabetical",
    },
    searchPlaceholder:
      "Search our services, management and people (e.g., Reception, Restaurant, Beach, Mixologist)...",
    statBadges: {
      new: "New",
      emerging: "Emerging",
      ranked: "Ranked",
      highlyRated: "Highly Rated",
    },
    insights: {
      title: "EXECUTIVE HOSPITALITY INSIGHTS",
      subtitle: "Live verified guest satisfaction metrics across the resort",
      overallRating: "Overall Hotel Satisfaction",
      totalRatings: "Verified Guest Evaluations",
      recommendationRate: "Guest Recommendation Rate",
      topService: "Top Ranked Service",
      mostRatedDept: "Most Evaluated Department",
      topPersonnel: "Top Hospitality Recognition",
    },
    leaderboard: {
      title: "ORKA EXCELLENCE LEADERBOARD",
      subtitle: "Honoring our most acclaimed guest services and hospitality professionals",
      rank: "Rank",
      entity: "Service / Professional",
      category: "Department",
      score: "Verified Score",
      reviews: "Evaluations",
      recommendation: "Would Recommend",
      action: "Rate Experience",
    },
    cards: {
      rateButton: "⭐ Rate This",
      detailsButton: "View Performance",
      recommendBadge: "recommend",
      reviewsLabel: "evaluations",
    },
    modal: {
      step1Title: "Performance Evaluation",
      step1Subtitle: "Select 1 to 5 stars across our core hospitality dimensions",
      step2Title: "Guest Recommendation",
      step2Subtitle: "Would you recommend this service to another ORKA LOTUS BEACH HOTEL guest?",
      step3Title: "Written Feedback & Recognition",
      step3Subtitle: "Share a few words about your stay (optional)",
      recommendationQuestion: "Would you recommend this service to another ORKA LOTUS BEACH HOTEL guest?",
      feedbackPrompt: "Share a few words about your experience (optional):",
      characterCount: "characters remaining",
      guestNamePrompt: "Your Name or Nickname (optional):",
      guestNamePlaceholder: "e.g., Family Anderson or Verified Guest",
      anonymousNote: "Your privacy is protected. Private room numbers or emails are never collected or published.",
      nextButton: "Continue",
      backButton: "Back",
      submitButton: "Submit Verified Evaluation",
      submitting: "Recording your rating securely...",
      tactileRecorded: "Thank you — your rating has been recorded for this step.",
      rateLimitWarning: "You have already submitted an evaluation for this service recently. Thank you!",
    },
    success: {
      title: "THANK YOU",
      subtitle: "Your Experience Matters",
      body: "Thank you for taking a moment to share your experience with ORKA LOTUS BEACH HOTEL. Your feedback helps us recognize our dedicated team and continuously pursue the highest standards of hospitality.",
      rateAnother: "⭐ Rate Another Experience",
      backToRankings: "Explore Leaderboard",
    },
    dimensions: {
      breakdownTitle: "Hospitality Dimension Breakdown",
    },
    empty: {
      noResults: "No experiences or team members match your search criteria.",
      clearFilters: "Clear search filters",
    },
    homeBanner: {
      badge: "GUEST RECOGNITION AWARDS",
      title: "⭐ RATE YOUR LOTUS",
      subtitle: "Recognize the service, hospitality and people who made your Aegean stay unforgettable.",
      cta: "Rate Your Experience",
    },
  },
  tr: {
    badge: "ORKA LOTUS BEACH · 5 YILDIZLI MİSAFİRPERVERLİK ÖDÜLLERİ",
    title: "⭐ RATE YOUR LOTUS",
    subtitle: "Misafir Deneyimi ve Hizmet Sıralamaları",
    secondaryHeading: "Sizin Deneyiminiz. Bizim Mükemmellik Sözümüz.",
    supportingText:
      "Deneyiminiz bizim için çok kıymetli. Geri bildirimlerinizi paylaşarak ORKA LOTUS BEACH HOTEL'deki her tatili unutulmaz kılan çalışanlarımızı ve servislerimizi onurlandırmamıza yardımcı olun.",
    tabs: {
      all: "Tüm Sıralamalar",
      services: "Otel Hizmetleri (13)",
      management: "Yönetim & Liderlik",
      staff: "Bizim İnsanlarımız (Personel)",
    },
    sort: {
      highestRated: "En Yüksek Puanlı",
      mostRated: "En Çok Değerlendirilen",
      mostRecommended: "En Çok Tavsiye Edilen",
      alphabetical: "Alfabetik",
    },
    searchPlaceholder:
      "Hizmetlerimizi, yöneticilerimizi ve ekibimizi arayın (örn. Resepsiyon, Restoran, Plaj, Barmen)...",
    statBadges: {
      new: "Yeni",
      emerging: "Yükselen",
      ranked: "Sıralamada",
      highlyRated: "Seçkin Puanlı",
    },
    insights: {
      title: "YÖNETİMSEL MİSAFİRPERVERLİK VERİLERİ",
      subtitle: "Tesis genelinde doğrulanmış anlık misafir memnuniyeti göstergeleri",
      overallRating: "Genel Otel Memnuniyeti",
      totalRatings: "Doğrulanmış Misafir Değerlendirmesi",
      recommendationRate: "Misafir Tavsiye Oranı",
      topService: "En Beğenilen Hizmet",
      mostRatedDept: "En Çok Değerlendirilen Birim",
      topPersonnel: "En Yüksek Personel Takdiri",
    },
    leaderboard: {
      title: "ORKA MÜKEMMELLİK LİDER TABLOSU",
      subtitle: "En çok takdir toplayan otel hizmetlerimizi ve değerli ekip üyelerimizi gururla sergiliyoruz",
      rank: "Sıra",
      entity: "Hizmet / Personel",
      category: "Bölüm",
      score: "Onaylı Puan",
      reviews: "Değerlendirme",
      recommendation: "Tavsiye Oranı",
      action: "Değerlendir",
    },
    cards: {
      rateButton: "⭐ Puan Ver",
      detailsButton: "Performansı Gör",
      recommendBadge: "tavsiye",
      reviewsLabel: "değerlendirme",
    },
    modal: {
      step1Title: "Hizmet Değerlendirmesi",
      step1Subtitle: "Temel misafirperverlik boyutlarımızda 1 ile 5 yıldız arasında puan verin",
      step2Title: "Misafir Tavsiyesi",
      step2Subtitle: "Bu hizmeti bir başka ORKA LOTUS BEACH HOTEL misafirine tavsiye eder misiniz?",
      step3Title: "Yazılı Görüş & Teşekkür",
      step3Subtitle: "Deneyiminiz hakkında birkaç cümle paylaşın (isteğe bağlı)",
      recommendationQuestion: "Bu hizmeti bir başka ORKA LOTUS BEACH HOTEL misafirine tavsiye eder misiniz?",
      feedbackPrompt: "Deneyiminizle ilgili birkaç kelime paylaşın (isteğe bağlı):",
      characterCount: "karakter kaldı",
      guestNamePrompt: "Adınız veya Takma Adınız (isteğe bağlı):",
      guestNamePlaceholder: "örn. Yılmaz Ailesi veya Misafir",
      anonymousNote: "Gizliliğiniz güvence altındadır. Oda numarası veya e-posta gibi özel bilgiler asla yayınlanmaz.",
      nextButton: "Devam Et",
      backButton: "Geri",
      submitButton: "Değerlendirmeyi Gönder",
      submitting: "Puanınız güvenle kaydediliyor...",
      tactileRecorded: "Teşekkürler — bu adım için puanınız kaydedildi.",
      rateLimitWarning: "Bu hizmet için yakın zamanda zaten bir değerlendirme gönderdiniz. Teşekkür ederiz!",
    },
    success: {
      title: "TEŞEKKÜR EDERİZ",
      subtitle: "Deneyiminiz Bizim İçin Değerli",
      body: "ORKA LOTUS BEACH HOTEL deneyiminizi paylaşmaya vakit ayırdığınız için yürekten teşekkür ederiz. Görüşleriniz, özverili ekibimizi ödüllendirmemize ve kusursuz misafirperverlik standartlarımızı daha da yukarı taşımamıza yardımcı olmaktadır.",
      rateAnother: "⭐ Başka Bir Hizmeti Puanla",
      backToRankings: "Sıralamaları İncele",
    },
    dimensions: {
      breakdownTitle: "Hizmet Boyutları Performans Dağılımı",
    },
    empty: {
      noResults: "Arama kriterinize uygun hizmet veya ekip üyesi bulunamadı.",
      clearFilters: "Arama filtresini temizle",
    },
    homeBanner: {
      badge: "MİSAFİR MEMNUNİYETİ VE ÖDÜLLER",
      title: "⭐ RATE YOUR LOTUS",
      subtitle: "Ege tatilinizi unutulmaz kılan hizmetleri ve fedakar çalışanlarımızı ödüllendirin.",
      cta: "Deneyiminizi Puanlayın",
    },
  },
  ru: {
    badge: "ORKA LOTUS BEACH · НАГРАДЫ ЗА ГОСТЕПРИИМСТВО 5 ЗВЕЗД",
    title: "⭐ RATE YOUR LOTUS",
    subtitle: "Рейтинги сервиса и впечатлений гостей",
    secondaryHeading: "Ваш отдых. Наше стремление к совершенству.",
    supportingText:
      "Ваше мнение бесценно для нас. Поделитесь своими впечатлениями и помогите отметить сотрудников и службы, благодаря которым отдых в ORKA LOTUS BEACH HOTEL становится незабываемым.",
    tabs: {
      all: "Все рейтинги",
      services: "Услуги отеля (13)",
      management: "Менеджмент и руководство",
      staff: "Наша команда (Персонал)",
    },
    sort: {
      highestRated: "Наивысший рейтинг",
      mostRated: "Больше всего оценок",
      mostRecommended: "Чаще рекомендуют",
      alphabetical: "По алфавиту",
    },
    searchPlaceholder:
      "Поиск услуг, менеджмента или сотрудников (напр. Ресепшн, Ресторан, Пляж, Бармен)...",
    statBadges: {
      new: "Новый",
      emerging: "Набирающий отзывы",
      ranked: "В рейтинге",
      highlyRated: "Высшая оценка",
    },
    insights: {
      title: "АНАЛИТИКА ГОСТЕПРИИМСТВА",
      subtitle: "Актуальные проверенные показатели удовлетворенности гостей курорта",
      overallRating: "Общая удовлетворенность отелем",
      totalRatings: "Проверенных оценок гостей",
      recommendationRate: "Уровень рекомендаций",
      topService: "Самая популярная служба",
      mostRatedDept: "Лидер по количеству отзывов",
      topPersonnel: "Лучший сотрудник сервиса",
    },
    leaderboard: {
      title: "ТАБЛИЦА ЛИДЕРОВ ORKA EXCELLENCE",
      subtitle: "Чествование самых высоко оцененных служб и сотрудников отеля",
      rank: "Место",
      entity: "Служба / Сотрудник",
      category: "Отдел",
      score: "Рейтинг",
      reviews: "Оценок",
      recommendation: "Рекомендуют",
      action: "Оценить",
    },
    cards: {
      rateButton: "⭐ Оценить",
      detailsButton: "Показатели",
      recommendBadge: "рекомендуют",
      reviewsLabel: "оценок",
    },
    modal: {
      step1Title: "Оценка качества обслуживания",
      step1Subtitle: "Выберите от 1 до 5 звезд по ключевым параметрам сервиса",
      step2Title: "Рекомендация гостя",
      step2Subtitle: "Порекомендуете ли вы эту услугу другим гостям ORKA LOTUS BEACH HOTEL?",
      step3Title: "Отзыв и благодарность",
      step3Subtitle: "Поделитесь парой теплых слов о вашем опыте (необязательно)",
      recommendationQuestion: "Порекомендуете ли вы эту услугу другим гостям ORKA LOTUS BEACH HOTEL?",
      feedbackPrompt: "Напишите пару слов о вашем впечатлении (необязательно):",
      characterCount: "символов осталось",
      guestNamePrompt: "Ваше имя или псевдоним (необязательно):",
      guestNamePlaceholder: "напр., Семья Ивановых или Гость отеля",
      anonymousNote: "Ваша конфиденциальность защищена. Номера комнат и контакты никогда не публикуются.",
      nextButton: "Продолжить",
      backButton: "Назад",
      submitButton: "Отправить оценку",
      submitting: "Безопасное сохранение вашей оценки...",
      tactileRecorded: "Спасибо — ваша оценка для этого шага зафиксирована.",
      rateLimitWarning: "Вы недавно уже отправляли оценку этой услуги. Спасибо!",
    },
    success: {
      title: "СПАСИБО",
      subtitle: "Ваш отзыв имеет значение",
      body: "Искренне благодарим вас за то, что вы уделили время оценке отдыха в ORKA LOTUS BEACH HOTEL. Ваши отзывы вдохновляют нашу команду и помогают нам поддерживать высочайшие стандарты пятизвездочного сервиса.",
      rateAnother: "⭐ Оценить другую службу",
      backToRankings: "К таблице лидеров",
    },
    dimensions: {
      breakdownTitle: "Детализация показателей сервиса",
    },
    empty: {
      noResults: "По вашему запросу услуг или сотрудников не найдено.",
      clearFilters: "Сбросить фильтры",
    },
    homeBanner: {
      badge: "ОЦЕНКА ГОСТЕПРИИМСТВА",
      title: "⭐ RATE YOUR LOTUS",
      subtitle: "Отметьте безупречный сервис и сотрудников, сделавших ваш отдых в Мармарисе незабываемым.",
      cta: "Оценить впечатления",
    },
  },
  de: {
    badge: "ORKA LOTUS BEACH · 5-STERNE HOSPITALITY AWARDS",
    title: "⭐ RATE YOUR LOTUS",
    subtitle: "Gästezufriedenheit & Hotel-Ranglisten",
    secondaryHeading: "Ihr Erlebnis. Unser Versprechen für Exzellenz.",
    supportingText:
      "Ihre Erfahrung ist uns wichtig. Teilen Sie Ihr Feedback und helfen Sie uns, die Menschen und Services auszuzeichnen, die jeden Aufenthalt im ORKA LOTUS BEACH HOTEL unvergesslich machen.",
    tabs: {
      all: "Alle Ranglisten",
      services: "Hotelangebote (13)",
      management: "Direktion & Führung",
      staff: "Unser Team (Mitarbeiter)",
    },
    sort: {
      highestRated: "Beste Bewertung",
      mostRated: "Meiste Bewertungen",
      mostRecommended: "Meistempfohlen",
      alphabetical: "Alphabetisch",
    },
    searchPlaceholder:
      "Suchen Sie nach Services, Führungskräften oder Mitarbeitern (z. B. Rezeption, Restaurant, Strand, Barkeeper)...",
    statBadges: {
      new: "Neu",
      emerging: "Aufstrebend",
      ranked: "Gelistet",
      highlyRated: "Hervorragend",
    },
    insights: {
      title: "DIREKTIONS-EINBLICKE ZUR GÄSTEZUFRIEDENHEIT",
      subtitle: "Echtzeit-Kennzahlen zur Gästezufriedenheit im gesamten Resort",
      overallRating: "Gesamtzufriedenheit Hotel",
      totalRatings: "Verifizierte Gästebewertungen",
      recommendationRate: "Weiterempfehlungsquote",
      topService: "Bester Servicebereich",
      mostRatedDept: "Meistbewertete Abteilung",
      topPersonnel: "Mitarbeiter-Spitzenbewertung",
    },
    leaderboard: {
      title: "ORKA EXZELLENZ-RANGLISTE",
      subtitle: "Auszeichnung unserer bestbewerteten Dienstleistungen und herzlichen Mitarbeiter",
      rank: "Rang",
      entity: "Service / Mitarbeiter",
      category: "Bereich",
      score: "Geprüfte Note",
      reviews: "Bewertungen",
      recommendation: "Empfehlung",
      action: "Bewerten",
    },
    cards: {
      rateButton: "⭐ Jetzt bewerten",
      detailsButton: "Details ansehen",
      recommendBadge: "empfehlen",
      reviewsLabel: "Bewertungen",
    },
    modal: {
      step1Title: "Leistungsbewertung",
      step1Subtitle: "Wählen Sie 1 bis 5 Sterne in unseren zentralen Servicedimensionen",
      step2Title: "Gäste-Empfehlung",
      step2Subtitle: "Würden Sie diesen Service einem anderen Gast des ORKA LOTUS BEACH HOTELS empfehlen?",
      step3Title: "Schriftliches Feedback & Lob",
      step3Subtitle: "Teilen Sie ein paar persönliche Worte zu Ihrem Aufenthalt (optional)",
      recommendationQuestion: "Würden Sie diesen Service einem anderen Gast des ORKA LOTUS BEACH HOTELS empfehlen?",
      feedbackPrompt: "Teilen Sie ein paar Zeilen über Ihre Erfahrung (optional):",
      characterCount: "Zeichen übrig",
      guestNamePrompt: "Ihr Name oder Pseudonym (optional):",
      guestNamePlaceholder: "z. B. Familie Weber oder Verifizierter Gast",
      anonymousNote: "Ihre Privatsphäre ist geschützt. Zimmernummern oder E-Mails werden weder erfasst noch veröffentlicht.",
      nextButton: "Weiter",
      backButton: "Zurück",
      submitButton: "Bewertung absenden",
      submitting: "Ihre Bewertung wird sicher übermittelt...",
      tactileRecorded: "Vielen Dank – Ihre Auswahl für diesen Schritt wurde erfasst.",
      rateLimitWarning: "Sie haben diesen Service kürzlich bereits bewertet. Vielen Dank!",
    },
    success: {
      title: "HERZLICHEN DANK",
      subtitle: "Ihre Meinung zählt",
      body: "Vielen Dank, dass Sie sich einen Moment Zeit genommen haben, um Ihre Eindrücke im ORKA LOTUS BEACH HOTEL zu teilen. Ihr Feedback würdigt unser engagiertes Team und motiviert uns zu täglich gelebter Fünf-Sterne-Gastfreundschaft.",
      rateAnother: "⭐ Weiteren Service bewerten",
      backToRankings: "Zur Rangliste",
    },
    dimensions: {
      breakdownTitle: "Detaillierte Qualitätsdimensionen",
    },
    empty: {
      noResults: "Keine Services oder Mitarbeiter entsprechen Ihren Suchkriterien.",
      clearFilters: "Filter zurücksetzen",
    },
    homeBanner: {
      badge: "GÄSTE-ANERKENNUNG & AWARDS",
      title: "⭐ RATE YOUR LOTUS",
      subtitle: "Würdigen Sie den Service und die herzlichen Menschen, die Ihren Ägäis-Urlaub besonders machen.",
      cta: "Jetzt Erlebnis bewerten",
    },
  },
};
