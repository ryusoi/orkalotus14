import type { Locale } from "@/data/content";

export interface HomeTranslation {
  hero: {
    overline: string;
    titles: string[];
    subtitle: string;
    location: string;
    unmuteAudio: string;
    muteAudio: string;
    soundOn: string;
    soundOff: string;
  };
  weather: {
    nowInMarmaris: string;
    seaTemp: string;
    humidity: string;
    wind: string;
    liveSource: string;
    searchPlaceholder: string;
    searchButton: string;
    defaultLocation: string;
    aegeanBays: string;
    high: string;
    low: string;
    today: string;
    feelsLike: string;
    uvIndex: string;
    celsius: string;
    fahrenheit: string;
    resetMarmaris: string;
    sevenDayForecast: string;
  };
  weekSlider: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    badge: string;
    resetView: string;
    momentsBadge: string;
    openedScheduleFor: string;
    scheduledMoments: string;
  };
  calendar: {
    sectionLabel: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    prevMonth: string;
    nextMonth: string;
    weekdays: string[];
    footerHint: string;
    viewTodayBtn: string;
    displayingSchedule: string;
  };
  ribbon1: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
  };
  todaySchedule: {
    sectionLabel: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitlePrefix: string;
    subtitleSuffix: string;
    cardEyebrow: string;
    season: string;
    momentsListed: string;
    savedToYourDay: string;
    weatherNote: string;
    contactGuestRelations: string;
    scheduleToBeConfirmed: string;
    confirmed: string;
    saveToDay: string;
    removeFromDay: string;
    saved: string;
    save: string;
  };
  activitiesSection: {
    sectionLabel: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    viewAllBtn: string;
  };
  poolsSection: {
    sectionLabel: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    exploreBtn: string;
    card1Tag: string;
    card1Title: string;
    card1Desc: string;
    card2Tag: string;
    card2Title: string;
    card2Desc: string;
    card3Tag: string;
    card3Title: string;
    card3Desc: string;
  };
  diningSection: {
    sectionLabel: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    viewBtn: string;
  };
  miniClubSection: {
    sectionLabel: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    viewBtn: string;
  };
  rateYourLotusSection: {
    badge: string;
    headline: string;
    description: string;
    cta: string;
    liveRatingLabel: string;
    verifiedNote: string;
  };
  portalsSection: {
    sectionLabel: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    badge: string;
    openPortal: string;
    portals: Array<{
      href: string;
      title: string;
      desc: string;
      tag: string;
    }>;
  };
  concierge: {
    sectionLabel: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    contactBtn: string;
    panelTitle: string;
    inputPlaceholder: string;
    questions: Array<{
      q: string;
      a: string;
    }>;
  };
  ribbon2: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
  };
  modals: {
    dailySchedule: string;
    scheduledMomentsAvailable: string;
    noActivities: string;
    seaShiftNote: string;
    askGuestRelations: string;
    directions: string;
    directionsToast: string;
    pendingNote: string;
    confirmedNote: string;
    savedToYourDay: string;
    addToMyDay: string;
    close: string;
  };
}

export const homeTranslations: Record<Locale, HomeTranslation> = {
  en: {
    hero: {
      overline: "Marmaris · İçmeler · Aegean Riviera",
      titles: ["YOUR STAY", "YOUR DAY", "YOUR LOTUS"],
      subtitle: "Ultra All-Inclusive Luxury Resort on the Turquoise Shoreline of Marmaris.",
      location: "İÇMELER, MARMARİS",
      unmuteAudio: "Unmute ambient resort sound",
      muteAudio: "Mute sound",
      soundOn: "Sound On",
      soundOff: "Sound Off",
    },
    weather: {
      nowInMarmaris: "Now in Marmaris",
      seaTemp: "Aegean Sea",
      humidity: "Humidity",
      wind: "Aegean Wind",
      liveSource: "Google Live Meteorological Service",
      searchPlaceholder: "Enter city, resort or bay (e.g. İçmeler, Bodrum)...",
      searchButton: "GO",
      defaultLocation: "Marmaris, Turkey · Orka Lotus Beach",
      aegeanBays: "Aegean Bays",
      high: "High",
      low: "Low",
      today: "Today",
      feelsLike: "Feels like",
      uvIndex: "UV Index",
      celsius: "°C",
      fahrenheit: "°F",
      resetMarmaris: "Marmaris Beach",
      sevenDayForecast: "7-Day Aegean Outlook",
    },
    weekSlider: {
      sectionLabel: "Live schedule",
      title: "Today at Lotus.",
      subtitle: "A gentle rhythm of sea, movement, flavour and music. Tap any moment for the details.",
      badge: "Live guest schedule",
      resetView: "Reset to Today",
      momentsBadge: "moments",
      openedScheduleFor: "Opened schedule for",
      scheduledMoments: "scheduled moments available",
    },
    calendar: {
      sectionLabel: "Resort Calendar",
      titlePrefix: "Summer",
      titleHighlight: "Calendar",
      subtitle: "Click on any date to open the full daily schedule of activities, wellness classes, culinary services, and evening shows.",
      prevMonth: "Previous month",
      nextMonth: "Next month",
      weekdays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      footerHint: "Click any date to open its event frame",
      viewTodayBtn: "View Today's Popup",
      displayingSchedule: "Displaying season schedule for",
    },
    ribbon1: {
      badge: "Live Resort Flow · Aegean Waves",
      titlePrefix: "The Rhythm of",
      titleHighlight: "Your Day",
      subtitle: "Curated daily wellness, dining, and evening shows synchronized with Aegean tides.",
    },
    todaySchedule: {
      sectionLabel: "Live today",
      titlePrefix: "Your day, at a",
      titleHighlight: "glance.",
      subtitlePrefix: "Confirmed moments in today's guest schedule for",
      subtitleSuffix: "Tap any moment for full details.",
      cardEyebrow: "Your day, at a glance",
      season: "Summer Season",
      momentsListed: "Moments listed",
      savedToYourDay: "Saved to your day",
      weatherNote: "Plans can shift with the weather. We’ll always mark what needs confirming.",
      contactGuestRelations: "Contact Guest Relations",
      scheduleToBeConfirmed: "Schedule to be confirmed",
      confirmed: "Confirmed",
      saveToDay: "Save to my day",
      removeFromDay: "Remove from my day",
      saved: "Saved",
      save: "Save",
    },
    activitiesSection: {
      sectionLabel: "Wellness & Movement",
      titlePrefix: "Activities &",
      titleHighlight: "Lotus Spa",
      subtitle: "From sunrise pier yoga and water sports to Balinese therapies and Turkish hamam rituals.",
      viewAllBtn: "View All Activities & Spa",
    },
    poolsSection: {
      sectionLabel: "Turquoise Coast",
      titlePrefix: "Pools &",
      titleHighlight: "Private Beach",
      subtitle: "650m Blue Flag private shoreline, 2 wooden sunbathing piers, 5 outdoor pools, and aqua park.",
      exploreBtn: "Explore Pools & Beach",
      card1Tag: "Main Lagoon",
      card1Title: "Freeform Sun Lagoon",
      card1Desc: "Spacious central pool framed by Aegean pines and sun loungers.",
      card2Tag: "Adult Sanctuary",
      card2Title: "Relax Pool (+16)",
      card2Desc: "Peaceful, whisper-quiet poolside escape reserved for guests 16 and over.",
      card3Tag: "Blue Flag Shoreline",
      card3Title: "650m Shore & 2 Piers",
      card3Desc: "Private wooden piers extending into crystal Aegean waters with VIP cabanas.",
    },
    diningSection: {
      sectionLabel: "Aegean & World Flavours",
      titlePrefix: "Restaurants &",
      titleHighlight: "Bars",
      subtitle: "Ultra All-Inclusive dining across international buffet, à la carte seafood, Italian, and 6 bespoke lounges.",
      viewBtn: "View Menus & Bars",
    },
    miniClubSection: {
      sectionLabel: "Kids & Family Sanctuary",
      titlePrefix: "Mini Club",
      titleHighlight: "& Kids Programs",
      subtitle: "Orka Lotus Beach offers a Mini Club specifically designed for children aged 4-12, providing a safe and engaging environment for holiday activities with professional supervision.",
      viewBtn: "Open Dedicated Mini Club Page",
    },
    rateYourLotusSection: {
      badge: "5-Star Luxury Hospitality Recognition",
      headline: "RATE YOUR LOTUS",
      description: "Rate your experience, staff, hospitality, management and other areas to help us improve your experience at our five star hotel. Your satisfaction is our goal. Experience the finest hospitality at Orka Lotus Beach Hotel. 🌊✨",
      cta: "RATE YOUR EXPERIENCE NOW",
      liveRatingLabel: "Five-Star Rating System",
      verifiedNote: "Live Verified Guest Feedback & Cloud Persistence",
    },
    portalsSection: {
      sectionLabel: "Full Resort Guide",
      titlePrefix: "Explore Every",
      titleHighlight: "Sanctuary",
      subtitle: "Discover accommodations, shopping arcade, executive management, directory, reviews, and Aegean heritage.",
      badge: "16 Resort Portals",
      openPortal: "Open Portal",
      portals: [
        { href: "/activities-spa", title: "Activities & Spa", desc: "Sunrise yoga, fitness, Balinese massages & authentic Turkish bath.", tag: "Wellness & Spa" },
        { href: "/pools-beach", title: "Pools & Beach", desc: "650m Blue Flag shoreline, 2 private piers, 5 pools & aqua park.", tag: "Coastline" },
        { href: "/watersports", title: "Watersports", desc: "Icon Watersport Centre with Captain Bülent, jet skis, parasailing & high-speed rides.", tag: "Adventure" },
        { href: "/mini-club", title: "Mini Club", desc: "Kids programs, interactive games, cinema, disco & creative arts (4-12 yrs).", tag: "Kids Sanctuary" },
        { href: "/restaurants-bars", title: "Restaurants & Bars", desc: "Ultra All-Inclusive buffet, à la carte seafood, Italian, steak & 6 lounges.", tag: "Gastronomy" },
        { href: "/shops", title: "Shops & Boutiques", desc: "Haute jewelry by Mr. Rashid Aksoy & Mr. Fatih Taşpınar, fashion & resort retail.", tag: "Shopping Arcade" },
        { href: "/rooms", title: "Rooms & Services", desc: "441 luxury suites, superior sea views, family rooms & signature VIP perks.", tag: "Living" },
        { href: "/medical", title: "Medical Center", desc: "24/7 in-hotel medical care, doctor consultations & KARIA HEALTH aesthetic treatments.", tag: "Healthcare" },
        { href: "/management", title: "Management & Staff", desc: "Executive leadership, guest services, culinary masters & concierge directors.", tag: "Leadership" },
        { href: "/hotel-directory", title: "Hotel Directory", desc: "A-to-Z guest guide, operating hours, phone extensions & resort policies.", tag: "Guest Guide" },
        { href: "/rank-your-lotus", title: "⭐ RATE YOUR LOTUS", desc: "Guest satisfaction scores, hospitality rankings & verified holiday reviews.", tag: "Ratings & Awards" },
        { href: "/icon-beach", title: "Icon Beach Club", desc: "Waterfront parties, sunset DJ sets, signature mixology & private VIP cabanas.", tag: "Nightlife" },
        { href: "/orka-homes", title: "Orka Homes", desc: "Exclusive luxury villas, prime Aegean investments & property development.", tag: "Real Estate" },
        { href: "/marmaris", title: "Marmaris Guide", desc: "Marmaris Castle, yacht marina, Dalyan turtles, blue cruises & local bazaars.", tag: "Local Discovery" },
        { href: "/orka-legacy", title: "Orka Legacy", desc: "30+ years of Turkish hospitality heritage, vision, ethics & architectural milestones.", tag: "" },
        { href: "/contact", title: "Contact & Concierge", desc: "Direct WhatsApp concierge, location map, VIP airport transfers & desk contacts.", tag: "Guest Relations" },
      ],
    },
    concierge: {
      sectionLabel: "Your digital host",
      titlePrefix: "Ask for the",
      titleHighlight: "local answer.",
      subtitle: "Need a table, a transfer, a quiet corner or the quickest way to the pier? Start with a question and our concierge knowledge base will point you in the right direction.",
      contactBtn: "Contact Hotel Reception",
      panelTitle: "Concierge suggestions",
      inputPlaceholder: "Ask about your stay…",
      questions: [
        { q: "What can I do this evening?", a: "Live music is planned for the Garden Stage at 20:30 today. ICON Beach evening details are listed as schedule to be confirmed — our Guest Relations team can advise on the latest update." },
        { q: "Where can I have breakfast?", a: "Lotus Restaurant serves breakfast from 07:00 to 10:30. Ask the F&B team about dietary preferences or a breakfast-in-bed request." },
        { q: "How do I reach ICON Beach?", a: "ICON Beach is next to the hotel beachfront. Follow the shoreline path from the Beach & Pier pin; ask Guest Relations for the latest access and program details." },
      ],
    },
    ribbon2: {
      badge: "Orka Lotus Beach · Marmaris",
      titlePrefix: "Crafted Moments in the",
      titleHighlight: "Aegean Breeze",
      subtitle: "Ultra All-Inclusive Luxury Resort on the Turquoise Coast of İçmeler",
    },
    modals: {
      dailySchedule: "Summer Season · Daily Schedule",
      scheduledMomentsAvailable: "scheduled moments available",
      noActivities: "No special activities listed for this date.",
      seaShiftNote: "Plans can shift with sea and weather conditions.",
      askGuestRelations: "Ask Guest Relations",
      directions: "Directions",
      directionsToast: "Directions are ready",
      pendingNote: "This moment is marked schedule to be confirmed. Guest Relations has the latest update.",
      confirmedNote: "A confirmed moment in today’s guest schedule.",
      savedToYourDay: "Saved to your day",
      addToMyDay: "Add to my day",
      close: "Close schedule frame",
    },
  },

  tr: {
    hero: {
      overline: "Marmaris · İçmeler · Ege Rivierası",
      titles: ["KONAKLAMANIZ", "GÜNÜNÜZ", "LOTUS'UNUZ"],
      subtitle: "Marmaris'in Turkuaz Sahilinde Ultra Her Şey Dahil Lüks Tatil Köyü.",
      location: "İÇMELER, MARMARİS",
      unmuteAudio: "Ortam sesini aç",
      muteAudio: "Sesi kapat",
      soundOn: "Ses Açık",
      soundOff: "Ses Kapalı",
    },
    weather: {
      nowInMarmaris: "Şu An Marmaris",
      seaTemp: "Ege Denizi",
      humidity: "Nem Oranı",
      wind: "Ege Rüzgarı",
      liveSource: "Google Canlı Meteoroloji Servisi",
      searchPlaceholder: "Şehir, tatil beldesi veya koy girin (örn. İçmeler, Bodrum)...",
      searchButton: "ARA",
      defaultLocation: "Marmaris, Türkiye · Orka Lotus Beach",
      aegeanBays: "Ege Koyları",
      high: "En Yüksek",
      low: "En Düşük",
      today: "Bugün",
      feelsLike: "Hissedilen",
      uvIndex: "UV İndeksi",
      celsius: "°C",
      fahrenheit: "°F",
      resetMarmaris: "Marmaris Sahil",
      sevenDayForecast: "7 Günlük Ege Tahmini",
    },
    weekSlider: {
      sectionLabel: "Canlı Program",
      title: "Bugün Lotus'ta.",
      subtitle: "Deniz, hareket, lezzet ve müziğin huzurlu ritmi. Detaylar için herhangi bir etkinliğe dokunun.",
      badge: "Canlı Misafir Takvimi",
      resetView: "Bugüne Dön",
      momentsBadge: "etkinlik",
      openedScheduleFor: "Tarihli program açıldı:",
      scheduledMoments: "planlanmış etkinlik mevcut",
    },
    calendar: {
      sectionLabel: "Tesis Takvimi",
      titlePrefix: "Yaz",
      titleHighlight: "Takvimi",
      subtitle: "Aktiviteler, wellness seansları, mutfak servisleri ve akşam gösterilerinin tam günlük programını açmak için herhangi bir tarihe tıklayın.",
      prevMonth: "Önceki ay",
      nextMonth: "Sonraki ay",
      weekdays: ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"],
      footerHint: "Etkinlik detaylarını açmak için tarihe tıklayın",
      viewTodayBtn: "Bugünün Programı",
      displayingSchedule: "Sezon takvimi görüntüleniyor:",
    },
    ribbon1: {
      badge: "Canlı Tesis Akışı · Ege Dalgaları",
      titlePrefix: "Gününüzün",
      titleHighlight: "Ritmi",
      subtitle: "Ege sularının ritmiyle uyumlu günlük wellness, lezzet ve akşam gösterileri.",
    },
    todaySchedule: {
      sectionLabel: "Bugün Canlı",
      titlePrefix: "Gününüz, bir",
      titleHighlight: "bakışta.",
      subtitlePrefix: "Tarihli bugünkü onaylı misafir programı:",
      subtitleSuffix: "Detaylar için etkinliğe dokunun.",
      cardEyebrow: "Gününüz bir bakışta",
      season: "Yaz Sezonu",
      momentsListed: "Listelenen anlar",
      savedToYourDay: "Günüme eklenenler",
      weatherNote: "Planlar hava ve deniz koşullarına göre değişebilir. Onay bekleyenler ayrıca belirtilir.",
      contactGuestRelations: "Misafir İlişkileriyle İletişim",
      scheduleToBeConfirmed: "Program onay bekliyor",
      confirmed: "Onaylandı",
      saveToDay: "Günüme kaydet",
      removeFromDay: "Günüme çıkar",
      saved: "Kaydedildi",
      save: "Kaydet",
    },
    activitiesSection: {
      sectionLabel: "Wellness ve Hareket",
      titlePrefix: "Aktiviteler ve",
      titleHighlight: "Lotus Spa",
      subtitle: "Gündoğumu iskele yogasından su sporlarına, Bali masajlarından geleneksel Türk hamamı ritüellerine.",
      viewAllBtn: "Tüm Aktivite & Spa'yı Gör",
    },
    poolsSection: {
      sectionLabel: "Turkuaz Kıyı",
      titlePrefix: "Havuzlar ve",
      titleHighlight: "Özel Plaj",
      subtitle: "650m Mavi Bayraklı özel sahil, 2 ahşap güneşlenme iskelesi, 5 açık havuz ve su kaydırakları.",
      exploreBtn: "Havuz ve Plajı Keşfet",
      card1Tag: "Ana Lagün",
      card1Title: "Açık Güneş Lagünü",
      card1Desc: "Çam ağaçları ve şezlonglarla çevrili geniş merkezi yüzme havuzu.",
      card2Tag: "Yetişkin Alanı",
      card2Title: "Relax Havuzu (+16)",
      card2Desc: "16 yaş ve üzeri misafirlerimize özel huzurlu, sessiz dinlenme havuzu.",
      card3Tag: "Mavi Bayraklı Sahil",
      card3Title: "650m Sahil ve 2 İskele",
      card3Desc: "Ege'nin berrak sularına uzanan VIP localı özel ahşap iskeleler.",
    },
    diningSection: {
      sectionLabel: "Ege ve Dünya Lezzetleri",
      titlePrefix: "Restoranlar ve",
      titleHighlight: "Barlar",
      subtitle: "Uluslararası açık büfe, alakart deniz ürünleri, İtalyan mutfağı ve 6 özel lounge ile Ultra Her Şey Dahil.",
      viewBtn: "Menü ve Barları İncele",
    },
    miniClubSection: {
      sectionLabel: "Çocuk ve Aile Dünyası",
      titlePrefix: "Mini Club",
      titleHighlight: "& Çocuk Programları",
      subtitle: "Orka Lotus Beach, 4-12 yaş arası çocuklara profesyonel gözetmenler eşliğinde güvenli ve eğlenceli tatil etkinlikleri sunar.",
      viewBtn: "Mini Club Sayfasını Aç",
    },
    rateYourLotusSection: {
      badge: "5 Yıldızlı Lüks Misafirperverlik Değerlendirmesi",
      headline: "RATE YOUR LOTUS",
      description: "Beş yıldızlı otelimizdeki tatil deneyiminizi geliştirmemize yardımcı olmak için deneyiminizi, personelimizi, misafirperverliğimizi, yönetimimizi ve diğer alanları değerlendirin. Memnuniyetiniz hedefimizdir. Orka Lotus Beach Hotel'de en seçkin misafirperverliği yaşayın. 🌊✨",
      cta: "ŞİMDİ DENEYİMİNİZİ PUANLAYIN",
      liveRatingLabel: "Beş Yıldızlı Değerlendirme Sistemi",
      verifiedNote: "Canlı Onaylı Misafir Değerlendirmeleri ve Bulut Kaydı",
    },
    portalsSection: {
      sectionLabel: "Kapsamlı Tesis Rehberi",
      titlePrefix: "Her Alanı",
      titleHighlight: "Keşfedin",
      subtitle: "Konaklama, alışveriş çarşısı, yönetim kadrosu, rehber, misafir yorumları ve Ege mirası.",
      badge: "16 Tesis Portalı",
      openPortal: "Portalı Aç",
      portals: [
        { href: "/activities-spa", title: "Aktiviteler & Spa", desc: "Gündoğumu yogası, fitness, Bali masajları ve otantik Türk hamamı.", tag: "Wellness & Spa" },
        { href: "/pools-beach", title: "Havuzlar & Plaj", desc: "650m Mavi Bayraklı sahil, 2 özel iskele, 5 havuz ve su parkı.", tag: "Sahil Şeridi" },
        { href: "/watersports", title: "Su Sporları", desc: "Kaptan Bülent ile Icon Su Sporları Merkezi, jetski, parasailing & heyecan dolu sürüşler.", tag: "Macera" },
        { href: "/mini-club", title: "Mini Club", desc: "Çocuk programları, interaktif oyunlar, sinema, disko ve sanat atölyeleri (4-12 yaş).", tag: "Çocuk Dünyası" },
        { href: "/restaurants-bars", title: "Restoranlar & Barlar", desc: "Ultra Her Şey Dahil açık büfe, deniz mahsulleri, İtalyan, et & 6 lounge.", tag: "Gastronomi" },
        { href: "/shops", title: "Mağazalar & Butikler", desc: "Sn. Rashid Aksoy & Sn. Fatih Taşpınar mücevher atölyesi, moda ve tatil butikleri.", tag: "Alışveriş Çarşısı" },
        { href: "/rooms", title: "Odalar & Hizmetler", desc: "441 lüks süit, üstün deniz manzaralı aile odaları ve VIP ayrıcalıkları.", tag: "Konaklama" },
        { href: "/medical", title: "Sağlık Merkezi", desc: "7/24 otel içi tıbbi müdahale, hekim muayenesi & KARIA HEALTH medikal estetik.", tag: "Sağlık Hizmeti" },
        { href: "/management", title: "Yönetim & Kadro", desc: "Üst düzey yöneticiler, misafir ilişkileri, baş şefler ve concierge direktörleri.", tag: "Yönetim" },
        { href: "/hotel-directory", title: "Otel Rehberi", desc: "A'dan Z'ye misafir rehberi, çalışma saatleri, dahili hatlar ve otel kuralları.", tag: "Misafir Rehberi" },
        { href: "/rank-your-lotus", title: "⭐ RATE YOUR LOTUS", desc: "Misafir memnuniyet puanları, hizmet sıralamaları ve doğrulanmış yorumlar.", tag: "Ödüller & Puanlar" },
        { href: "/icon-beach", title: "Icon Beach Club", desc: "Sahil partileri, gün batımı DJ performansları, imza kokteyller & VIP localar.", tag: "Gece Hayatı" },
        { href: "/orka-homes", title: "Orka Homes", desc: "Özel lüks villalar, seçkin Ege gayrimenkul yatırımları ve proje geliştirme.", tag: "Gayrimenkul" },
        { href: "/marmaris", title: "Marmaris Rehberi", desc: "Marmaris Kalesi, yat limanı, Dalyan kaplumbağaları, mavi turlar ve yerel çarşılar.", tag: "Yerel Keşif" },
        { href: "/orka-legacy", title: "Orka Mirası", desc: "30 yılı aşkın Türk misafirperverliği, vizyon, etik değerler ve mimari başarılar.", tag: "" },
        { href: "/contact", title: "İletişim & Concierge", desc: "Doğrudan WhatsApp concierge, konum haritası, VIP havalimanı transferleri.", tag: "Misafir İlişkileri" },
      ],
    },
    concierge: {
      sectionLabel: "Dijital Rehberiniz",
      titlePrefix: "Sorunuzu",
      titleHighlight: "buradan sorun.",
      subtitle: "Masa rezervasyonu, transfer, sakin bir köşe veya iskeleye en hızlı yol? Concierge bilgi tabanımız size anında rehberlik etsin.",
      contactBtn: "Otel Resepsiyonuna Ulaşın",
      panelTitle: "Concierge önerileri",
      inputPlaceholder: "Konaklamanız hakkında sorun…",
      questions: [
        { q: "Bu akşam ne yapabilirim?", a: "Bugün 20:30'da Garden Stage'de canlı müzik planlanmıştır. ICON Beach akşam programı onay bekliyor durumundadır; Misafir İlişkileri en güncel bilgiyi verecektir." },
        { q: "Kahvaltıyı nerede alabilirim?", a: "Lotus Restoran 07:00 - 10:30 saatleri arasında açık büfe kahvaltı sunmaktadır. Özel diyet talepleri için servis ekibimize danışabilirsiniz." },
        { q: "ICON Beach'e nasıl gidebilirim?", a: "ICON Beach otelimizin hemen yanındaki koyda yer almaktadır. Plaj ve İskele yolunu sahil boyunca takip edebilirsiniz." },
      ],
    },
    ribbon2: {
      badge: "Orka Lotus Beach · Marmaris",
      titlePrefix: "Ege Esintisinde",
      titleHighlight: "Kusursuz Anlar",
      subtitle: "İçmeler'in Turkuaz Kıyısında Ultra Her Şey Dahil Lüks Tatil Köyü",
    },
    modals: {
      dailySchedule: "Yaz Sezonu · Günlük Program",
      scheduledMomentsAvailable: "planlanmış etkinlik mevcut",
      noActivities: "Bu tarih için özel etkinlik bulunmamaktadır.",
      seaShiftNote: "Planlar deniz ve hava şartlarına göre değişebilir.",
      askGuestRelations: "Misafir İlişkilerine Sor",
      directions: "Yol Tarifi",
      directionsToast: "Yol tarifi hazırlandı",
      pendingNote: "Bu etkinlik program onayı beklemektedir. Misafir İlişkileri güncel durumu iletecektir.",
      confirmedNote: "Bugünkü misafir programında onaylanmış etkinlik.",
      savedToYourDay: "Günüme kaydedildi",
      addToMyDay: "Günüme ekle",
      close: "Program penceresini kapat",
    },
  },

  ru: {
    hero: {
      overline: "Мармарис · Ичмелер · Эгейская Ривьера",
      titles: ["ВАШ ОТДЫХ", "ВАШ ДЕНЬ", "ВАШ LOTUS"],
      subtitle: "Роскошный курортный отель «Ультра всё включено» на бирюзовом побережье Мармариса.",
      location: "ИЧМЕЛЕР, МАРМАРИС",
      unmuteAudio: "Включить атмосферный звук курорта",
      muteAudio: "Выключить звук",
      soundOn: "Звук включен",
      soundOff: "Звук выключен",
    },
    weather: {
      nowInMarmaris: "Сейчас в Мармарисе",
      seaTemp: "Эгейское море",
      humidity: "Влажность",
      wind: "Эгейский ветер",
      liveSource: "Метеорологическая служба Google Live",
      searchPlaceholder: "Введите город, курорт или бухту (напр. Ичмелер, Бодрум)...",
      searchButton: "ПОИСК",
      defaultLocation: "Мармарис, Турция · Orka Lotus Beach",
      aegeanBays: "Эгейские бухты",
      high: "Макс",
      low: "Мин",
      today: "Сегодня",
      feelsLike: "Ощущается как",
      uvIndex: "УФ-индекс",
      celsius: "°C",
      fahrenheit: "°F",
      resetMarmaris: "Пляж Мармариса",
      sevenDayForecast: "Прогноз на 7 дней",
    },
    weekSlider: {
      sectionLabel: "Расписание дня",
      title: "Сегодня в Lotus.",
      subtitle: "Гармоничный ритм моря, движения, вкуса и музыки. Нажмите на событие, чтобы узнать детали.",
      badge: "Расписание гостей",
      resetView: "Вернуться к сегодня",
      momentsBadge: "событий",
      openedScheduleFor: "Открыто расписание на:",
      scheduledMoments: "запланированных событий доступно",
    },
    calendar: {
      sectionLabel: "Календарь курорта",
      titlePrefix: "Летний",
      titleHighlight: "Календарь",
      subtitle: "Нажмите на любую дату, чтобы открыть полную программу мероприятий, спа, ресторанов и вечерних шоу.",
      prevMonth: "Предыдущий месяц",
      nextMonth: "Следующий месяц",
      weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      footerHint: "Нажмите на любую дату для просмотра событий",
      viewTodayBtn: "События на сегодня",
      displayingSchedule: "Отображается расписание сезона:",
    },
    ribbon1: {
      badge: "Ритм курорта · Эгейские волны",
      titlePrefix: "Ритм вашего",
      titleHighlight: "дня",
      subtitle: "Оздоровительные практики, кулинарные изыски и вечерние шоу в гармонии с морем.",
    },
    todaySchedule: {
      sectionLabel: "Сегодня в эфире",
      titlePrefix: "Ваш день как на",
      titleHighlight: "ладони.",
      subtitlePrefix: "Подтвержденные события в сегодняшней программе на",
      subtitleSuffix: "Нажмите на любое событие для подробностей.",
      cardEyebrow: "Ваш день в деталях",
      season: "Летний сезон",
      momentsListed: "Событий в списке",
      savedToYourDay: "Сохранено на день",
      weatherNote: "Программа может меняться в зависимости от погоды. Мероприятия, требующие подтверждения, отмечены отдельно.",
      contactGuestRelations: "Служба работы с гостями",
      scheduleToBeConfirmed: "Расписание уточняется",
      confirmed: "Подтверждено",
      saveToDay: "Добавить в мой день",
      removeFromDay: "Удалить из моего дня",
      saved: "Сохранено",
      save: "Сохранить",
    },
    activitiesSection: {
      sectionLabel: "Оздоровление и спорт",
      titlePrefix: "Активити и",
      titleHighlight: "Lotus Spa",
      subtitle: "От утренней йоги на пирсе и водных видов спорта до балийского массажа и традиционного хаммама.",
      viewAllBtn: "Все активности и Спа",
    },
    poolsSection: {
      sectionLabel: "Бирюзовое побережье",
      titlePrefix: "Бассейны и",
      titleHighlight: "Частный пляж",
      subtitle: "650 м частного пляжа с Голубым флагом, 2 деревянных пирса, 5 открытых бассейнов и аквапарк.",
      exploreBtn: "Бассейны и пляж",
      card1Tag: "Главная лагуна",
      card1Title: "Солнечная лагуна",
      card1Desc: "Просторный центральный бассейн в окружении эгейских сосен и шезлонгов.",
      card2Tag: "Зона для взрослых",
      card2Title: "Релакс-бассейн (+16)",
      card2Desc: "Тихий и уединенный оазис у бассейна исключительно для гостей старше 16 лет.",
      card3Tag: "Пляж Голубой флаг",
      card3Title: "650 м берега и 2 пирса",
      card3Desc: "Частные деревянные пирсы над кристально чистой водой с VIP-кабанами.",
    },
    diningSection: {
      sectionLabel: "Вкусы Эгеи и мира",
      titlePrefix: "Рестораны и",
      titleHighlight: "Бары",
      subtitle: "Система «Ультра всё включено»: шведский стол, рыбный и итальянский а-ля карт, 6 баров и лаунджей.",
      viewBtn: "Меню и бары",
    },
    miniClubSection: {
      sectionLabel: "Семейный отдых и дети",
      titlePrefix: "Мини-клуб",
      titleHighlight: "и детские программы",
      subtitle: "Orka Lotus Beach предлагает мини-клуб для детей от 4 до 12 лет с профессиональной анимацией и безопасной атмосферой.",
      viewBtn: "Страница мини-клуба",
    },
    rateYourLotusSection: {
      badge: "5-Звездочная премиальная система оценки",
      headline: "RATE YOUR LOTUS",
      description: "Оцените ваш отдых, персонал, гостеприимство, руководство и другие направления, чтобы помочь нам сделать ваше пребывание в нашем пятизвездочном отеле еще совершеннее. Ваше удовлетворение — наша главная цель. Откройте для себя непревзойденное гостеприимство в Orka Lotus Beach Hotel. 🌊✨",
      cta: "ОЦЕНИТЬ ВПЕЧАТЛЕНИЯ СЕЙЧАС",
      liveRatingLabel: "Пятизвездочная система рейтинга",
      verifiedNote: "Проверенные отзывы гостей в реальном времени",
    },
    portalsSection: {
      sectionLabel: "Гид по курорту",
      titlePrefix: "Откройте для себя",
      titleHighlight: "каждый уголок",
      subtitle: "Номера, торговая галерея, руководство, справочник, отзывы и наследие Эгеи.",
      badge: "16 разделов курорта",
      openPortal: "Перейти в раздел",
      portals: [
        { href: "/activities-spa", title: "Активности и Спа", desc: "Йога на рассвете, фитнес, балийский массаж и турецкий хаммам.", tag: "Спа и велнес" },
        { href: "/pools-beach", title: "Бассейны и пляж", desc: "650 м пляжа Голубой флаг, 2 пирса, 5 бассейнов и аквапарк.", tag: "Побережье" },
        { href: "/watersports", title: "Водный спорт", desc: "Центр водных развлечений с Капитаном Бюлентом, гидроциклы, парасейлинг и адреналин.", tag: "Приключения" },
        { href: "/mini-club", title: "Мини-клуб", desc: "Детские программы, игры, кинотеатр, мини-диско и мастер-классы (4-12 лет).", tag: "Детский клуб" },
        { href: "/restaurants-bars", title: "Рестораны и бары", desc: "Ультра всё включено: шведский стол, морепродукты, итальянская кухня, 6 баров.", tag: "Гастрономия" },
        { href: "/shops", title: "Бутики и магазины", desc: "Ювелирный дом г-на Рашида Аксоя и г-на Фатиха Ташпынара, мода и подарки.", tag: "Торговый пассаж" },
        { href: "/rooms", title: "Номера и сервис", desc: "441 роскошный номер, люксы с видом на море, семейные номера и VIP-привилегии.", tag: "Проживание" },
        { href: "/medical", title: "Медицинский центр", desc: "Круглосуточная врачебная помощь в отеле, консультации и эстетическая медицина KARIA HEALTH.", tag: "Здоровье" },
        { href: "/management", title: "Руководство отеля", desc: "Топ-менеджмент, служба заботы о гостях, шеф-повара и консьерж-служба.", tag: "Руководство" },
        { href: "/hotel-directory", title: "Справочник отеля", desc: "Гид от А до Я, часы работы ресторанов, телефоны и правила курорта.", tag: "Гид для гостей" },
        { href: "/rank-your-lotus", title: "⭐ RATE YOUR LOTUS", desc: "Рейтинги удовлетворенности гостей, награды сервиса и проверенные отзывы.", tag: "Рейтинги и награды" },
        { href: "/icon-beach", title: "Icon Beach Club", desc: "Вечеринки у воды, закатные DJ-сеты, авторские коктейли и VIP-кабаны.", tag: "Ночная жизнь" },
        { href: "/orka-homes", title: "Orka Homes", desc: "Элитные виллы, инвестиции в недвижимость на Эгейском побережье.", tag: "Недвижимость" },
        { href: "/marmaris", title: "Гид по Мармарису", desc: "Замок Мармариса, марина, черепахи Дальяна, морские круизы и базары.", tag: "Экскурсии" },
        { href: "/orka-legacy", title: "Наследие Orka", desc: "Более 30 лет турецкого гостеприимства, этика, архитектура и ценности бренда.", tag: "" },
        { href: "/contact", title: "Контакты и консьерж", desc: "Прямой чат в WhatsApp с консьержем, карта, трансфер из аэропорта.", tag: "Служба гостей" },
      ],
    },
    concierge: {
      sectionLabel: "Ваш цифровой консьерж",
      titlePrefix: "Спросите о",
      titleHighlight: "главном.",
      subtitle: "Нужен столик, трансфер или лучший путь к пирсу? Задайте вопрос, и служба консьержа поможет вам сориентироваться.",
      contactBtn: "Связаться с ресепшн",
      panelTitle: "Советы консьержа",
      inputPlaceholder: "Спросите о вашем пребывании…",
      questions: [
        { q: "Чем заняться сегодня вечером?", a: "В 20:30 на Garden Stage запланирована живая музыка. Вечерняя программа ICON Beach уточняется — служба работы с гостями предоставит актуальную информацию." },
        { q: "Где проходит завтрак?", a: "Ресторан Lotus сервирует завтрак «шведский стол» с 07:00 до 10:30. По специальным диетическим вопросам обращайтесь к персоналу." },
        { q: "Как добраться до ICON Beach?", a: "ICON Beach находится в соседней бухте рядом с отелем. Пройдите по береговой дорожке вдоль пляжа." },
      ],
    },
    ribbon2: {
      badge: "Orka Lotus Beach · Мармарис",
      titlePrefix: "Идеальные моменты в",
      titleHighlight: "Эгейском бризе",
      subtitle: "Роскошный курортный комплекс «Ультра всё включено» на бирюзовом побережье Ичмелера",
    },
    modals: {
      dailySchedule: "Летний сезон · Расписание дня",
      scheduledMomentsAvailable: "запланированных событий доступно",
      noActivities: "На эту дату нет запланированных мероприятий.",
      seaShiftNote: "Расписание может меняться в зависимости от погодных условий.",
      askGuestRelations: "Спросить службу гостей",
      directions: "Маршрут",
      directionsToast: "Маршрут готов",
      pendingNote: "Это мероприятие ожидает подтверждения. Служба работы с гостями владеет актуальной информацией.",
      confirmedNote: "Подтвержденное событие в сегодняшней программе.",
      savedToYourDay: "Сохранено в ваш день",
      addToMyDay: "Добавить в мой день",
      close: "Закрыть окно расписания",
    },
  },

  de: {
    hero: {
      overline: "Marmaris · İçmeler · Ägäische Riviera",
      titles: ["IHR AUFENTHALT", "IHR TAG", "IHR LOTUS"],
      subtitle: "Ultra All-Inclusive Luxusresort an der türkisfarbenen Küste von Marmaris.",
      location: "İÇMELER, MARMARİS",
      unmuteAudio: "Resort-Umgebungsgeräusche aktivieren",
      muteAudio: "Ton stummschalten",
      soundOn: "Ton an",
      soundOff: "Ton aus",
    },
    weather: {
      nowInMarmaris: "Jetzt in Marmaris",
      seaTemp: "Ägäisches Meer",
      humidity: "Luftfeuchtigkeit",
      wind: "Ägäischer Wind",
      liveSource: "Google Live Wetterdienst",
      searchPlaceholder: "Stadt, Ferienort oder Bucht eingeben (z.B. İçmeler, Bodrum)...",
      searchButton: "LOS",
      defaultLocation: "Marmaris, Türkei · Orka Lotus Beach",
      aegeanBays: "Ägäische Buchten",
      high: "Max",
      low: "Min",
      today: "Heute",
      feelsLike: "Gefühlt",
      uvIndex: "UV-Index",
      celsius: "°C",
      fahrenheit: "°F",
      resetMarmaris: "Marmaris Strand",
      sevenDayForecast: "7-Tage-Ägäis-Wetter",
    },
    weekSlider: {
      sectionLabel: "Tagesprogramm",
      title: "Heute im Lotus.",
      subtitle: "Ein harmonischer Rhythmus aus Meer, Bewegung, Kulinarik und Musik. Tippen Sie auf ein Ereignis für Details.",
      badge: "Live Gästeprogramm",
      resetView: "Zurück zu Heute",
      momentsBadge: "Momente",
      openedScheduleFor: "Programm geöffnet für:",
      scheduledMoments: "geplante Momente verfügbar",
    },
    calendar: {
      sectionLabel: "Resort-Kalender",
      titlePrefix: "Sommer",
      titleHighlight: "Kalender",
      subtitle: "Klicken Sie auf ein beliebiges Datum, um das vollständige Tagesprogramm mit Aktivitäten, Wellness, Gastronomie und Abendshows zu öffnen.",
      prevMonth: "Vorheriger Monat",
      nextMonth: "Nächster Monat",
      weekdays: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
      footerHint: "Klicken Sie auf ein Datum, um Details zu sehen",
      viewTodayBtn: "Heutiges Programm",
      displayingSchedule: "Saisonplan wird angezeigt:",
    },
    ribbon1: {
      badge: "Resort-Fluss · Ägäische Wellen",
      titlePrefix: "Der Rhythmus",
      titleHighlight: "Ihres Tages",
      subtitle: "Ausgewählte tägliche Wellness, Kulinarik und Abendshows im Einklang mit der Ägäis.",
    },
    todaySchedule: {
      sectionLabel: "Heute live",
      titlePrefix: "Ihr Tag auf",
      titleHighlight: "einen Blick.",
      subtitlePrefix: "Bestätigte Momente im heutigen Gästeprogramm für",
      subtitleSuffix: "Tippen Sie auf ein Event für Details.",
      cardEyebrow: "Ihr Tag auf einen Blick",
      season: "Sommersaison",
      momentsListed: "Aufgelistete Momente",
      savedToYourDay: "Zu Ihrem Tag hinzugefügt",
      weatherNote: "Pläne können sich wetterbedingt ändern. Bestätigungspflichtige Events sind gekennzeichnet.",
      contactGuestRelations: "Gästebetreuung kontaktieren",
      scheduleToBeConfirmed: "Termin wird bestätigt",
      confirmed: "Bestätigt",
      saveToDay: "Zu meinem Tag hinzufügen",
      removeFromDay: "Aus meinem Tag entfernen",
      saved: "Gespeichert",
      save: "Speichern",
    },
    activitiesSection: {
      sectionLabel: "Wellness & Bewegung",
      titlePrefix: "Aktivitäten &",
      titleHighlight: "Lotus Spa",
      subtitle: "Von Sonnenaufgangs-Yoga am Steg und Wassersport bis zu balinesischen Massagen und türkischen Hamam-Ritualen.",
      viewAllBtn: "Alle Aktivitäten & Spa anzeigen",
    },
    poolsSection: {
      sectionLabel: "Türkisküste",
      titlePrefix: "Pools &",
      titleHighlight: "Privatstrand",
      subtitle: "650 m privater Strand mit Blauer Flagge, 2 Holzstege, 5 Außenpools und Aquapark.",
      exploreBtn: "Pools & Strand entdecken",
      card1Tag: "Hauptlagune",
      card1Title: "Freiform-Sonnenlagune",
      card1Desc: "Großzügiger zentraler Pool, umrahmt von Pinien und Sonnenliegen.",
      card2Tag: "Erwachsenenbereich",
      card2Title: "Relax-Pool (+16)",
      card2Desc: "Ruhiger Rückzugsort am Pool, exklusiv für Gäste ab 16 Jahren.",
      card3Tag: "Blaue Flagge Küste",
      card3Title: "650 m Strand & 2 Stege",
      card3Desc: "Private Holzstege im kristallklaren ägäischen Meer mit VIP-Pavillons.",
    },
    diningSection: {
      sectionLabel: "Ägäische & Weltküche",
      titlePrefix: "Restaurants &",
      titleHighlight: "Bars",
      subtitle: "Ultra All-Inclusive mit internationalem Buffet, à la carte Fisch, italienischer Küche und 6 Lounges.",
      viewBtn: "Speisekarten & Bars",
    },
    miniClubSection: {
      sectionLabel: "Kinder- & Familienparadies",
      titlePrefix: "Mini Club",
      titleHighlight: "& Kinderprogramme",
      subtitle: "Das Orka Lotus Beach bietet einen Mini Club für Kinder von 4-12 Jahren mit sicherer und betreuter Ferienunterhaltung.",
      viewBtn: "Mini Club Seite öffnen",
    },
    rateYourLotusSection: {
      badge: "5-Sterne Luxus Hospitality Auszeichnung",
      headline: "RATE YOUR LOTUS",
      description: "Bewerten Sie Ihre Erfahrungen, unser Personal, die Gastfreundschaft, das Management und weitere Bereiche, damit wir Ihr Erlebnis in unserem Fünf-Sterne-Hotel weiter verbessern können. Ihre Zufriedenheit ist unser Ziel. Erleben Sie feinste Gastfreundschaft im Orka Lotus Beach Hotel. 🌊✨",
      cta: "JETZT BEWERTUNG ABGEBEN",
      liveRatingLabel: "Fünf-Sterne-Bewertungssystem",
      verifiedNote: "Verifizierte Live-Gästebewertungen & Cloud-Speicherung",
    },
    portalsSection: {
      sectionLabel: "Vollständiger Resort-Guide",
      titlePrefix: "Entdecken Sie jeden",
      titleHighlight: "Bereich",
      subtitle: "Unterkünfte, Einkaufspassage, Management, Verzeichnis, Bewertungen und ägäisches Erbe.",
      badge: "16 Resort-Portale",
      openPortal: "Portal öffnen",
      portals: [
        { href: "/activities-spa", title: "Aktivitäten & Spa", desc: "Sonnenaufgangs-Yoga, Fitness, Balinesische Massagen & authentisches Hamam.", tag: "Wellness & Spa" },
        { href: "/pools-beach", title: "Pools & Strand", desc: "650 m Strand mit Blauer Flagge, 2 Stege, 5 Pools & Aquapark.", tag: "Küstenlinie" },
        { href: "/watersports", title: "Wassersport", desc: "Icon Wassersportzentrum mit Kapitän Bülent, Jetskis, Parasailing & High-Speed-Action.", tag: "Abenteuer" },
        { href: "/mini-club", title: "Mini Club", desc: "Kinderprogramme, interaktive Spiele, Kino, Minidisco & Kreativ-Workshops (4-12 J.).", tag: "Kinderparadies" },
        { href: "/restaurants-bars", title: "Restaurants & Bars", desc: "Ultra All-Inclusive Buffet, Meeresfrüchte, Italienisch, Steak & 6 Lounges.", tag: "Gastronomie" },
        { href: "/shops", title: "Geschäfte & Boutiquen", desc: "Haute Joaillerie von Herrn Rashid Aksoy & Herrn Fatih Taşpınar, Mode & Strandbedarf.", tag: "Einkaufspassage" },
        { href: "/rooms", title: "Zimmer & Service", desc: "441 Luxussuiten, Meerblick-Zimmer, Familienzimmer und VIP-Vorteile.", tag: "Wohnen" },
        { href: "/medical", title: "Medizinisches Zentrum", desc: "24/7 ärztliche Betreuung im Hotel, Sprechstunden & KARIA HEALTH Ästhetik-Behandlungen.", tag: "Gesundheit" },
        { href: "/management", title: "Management & Team", desc: "Direktion, Gästebetreuung, Küchenmeister und Concierge-Leitung.", tag: "Führung" },
        { href: "/hotel-directory", title: "Hotelverzeichnis", desc: "A-bis-Z Gästeführer, Öffnungszeiten, Telefon-Durchwahlen und Richtlinien.", tag: "Gästeführer" },
        { href: "/rank-your-lotus", title: "⭐ RATE YOUR LOTUS", desc: "Gästezufriedenheit, Service-Ranglisten und verifizierte Erfahrungsberichte.", tag: "Awards & Bewertungen" },
        { href: "/icon-beach", title: "Icon Beach Club", desc: "Strandpartys, Sonnenuntergangs-DJs, Signature Drinks & VIP-Cabanas.", tag: "Nachtleben" },
        { href: "/orka-homes", title: "Orka Homes", desc: "Exklusive Luxusvillen, erstklassige Immobilieninvestitionen an der Ägäis.", tag: "Immobilien" },
        { href: "/marmaris", title: "Marmaris-Reiseführer", desc: "Burg Marmaris, Yachthafen, Dalyan-Schildkröten, Blaue Reisen & Basare.", tag: "Ausflüge" },
        { href: "/orka-legacy", title: "Orka Tradition", desc: "Über 30 Jahre türkische Gastfreundschaft, Vision, Ethik und Architektur.", tag: "" },
        { href: "/contact", title: "Kontakt & Concierge", desc: "Direkter WhatsApp-Concierge, Lageplan, VIP-Flughafentransfers & Rezeption.", tag: "Gästebetreuung" },
      ],
    },
    concierge: {
      sectionLabel: "Ihr digitaler Gastgeber",
      titlePrefix: "Fragen Sie für die",
      titleHighlight: "beste Antwort.",
      subtitle: "Brauchen Sie einen Tisch, einen Transfer oder den schnellsten Weg zum Steg? Fragen Sie unseren Concierge für sofortige Orientierung.",
      contactBtn: "Hotelrezeption kontaktieren",
      panelTitle: "Concierge-Empfehlungen",
      inputPlaceholder: "Fragen Sie zu Ihrem Aufenthalt…",
      questions: [
        { q: "Was kann ich heute Abend unternehmen?", a: "Um 20:30 Uhr ist Live-Musik auf der Garden Stage geplant. Das Abendprogramm im ICON Beach wird noch bestätigt — unsere Gästebetreuung informiert Sie gerne." },
        { q: "Wo gibt es Frühstück?", a: "Das Lotus Restaurant serviert Frühstück von 07:00 bis 10:30 Uhr. Bei besonderen Ernährungswünschen steht Ihnen unser F&B-Team zur Seite." },
        { q: "Wie gelange ich zum ICON Beach?", a: "Das ICON Beach liegt in der Nachbarbucht direkt am Hotelstrand. Folgen Sie einfach dem Uferweg." },
      ],
    },
    ribbon2: {
      badge: "Orka Lotus Beach · Marmaris",
      titlePrefix: "Besondere Momente in der",
      titleHighlight: "Ägäischen Brise",
      subtitle: "Ultra All-Inclusive Luxusresort an der Türkisküste von İçmeler",
    },
    modals: {
      dailySchedule: "Sommersaison · Tagesprogramm",
      scheduledMomentsAvailable: "geplante Momente verfügbar",
      noActivities: "Keine besonderen Aktivitäten für dieses Datum eingetragen.",
      seaShiftNote: "Programme können sich wetter- und meeresbedingt ändern.",
      askGuestRelations: "Gästebetreuung fragen",
      directions: "Wegbeschreibung",
      directionsToast: "Wegbeschreibung bereit",
      pendingNote: "Dieser Termin muss noch bestätigt werden. Die Gästebetreuung hat die neuesten Informationen.",
      confirmedNote: "Ein bestätigter Moment im heutigen Gästeprogramm.",
      savedToYourDay: "Zu Ihrem Tag hinzugefügt",
      addToMyDay: "Zu meinem Tag hinzufügen",
      close: "Fenster schließen",
    },
  },
};
