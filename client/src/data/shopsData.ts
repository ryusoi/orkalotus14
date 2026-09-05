import type { Locale } from "@/data/content";

/* -------------------------------------------------------------------------- */
/*                                IMAGE & VIDEO ASSETS                        */
/* -------------------------------------------------------------------------- */
export const SHOPS_ASSETS = {
  aksoyHeader:
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/AKSOY/Aksoy%20Header%20(1).jpg",
  aksoyLogo:
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/AKSOY/haXWQKoWwqtfKyGUJzNRNnAT1pVI7usp3TXikPmduXU.png",
  aksoyVideoRing:
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/AKSOY/morph-seamlessly-ring-first-frame-into%20(2).mp4",
  aksoyVideoHaute:
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/AKSOY/47701e01-ee18-4d7b-9678-83369c617dd5.mp4",
  eliteCover:
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/SHOPS/1788507904747-01a06b5f-d72c-70dc-92c4-b2582c6e1792.png",
  eliteVideo:
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/SHOPS/seamless-transition-of-start-frame-to.mp4",
  eliteImageShowcase:
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/SHOPS/elite%20eye%20iris.png",
  eliteQrCode:
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/SHOPS/qr-code.png",
  noraSalon:
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/HAIR%20SALON.png",
  azurShopGift:
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/AZUR%20gift%20shop.png",
  azurShopHandbag:
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
  azurGiftBoutique:
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/azur%20giftshop.jpeg",
  istanbulTextile:
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/istanbul%20textile.webp",
  supermarket:
    "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/supermarket.jpeg",
  photoStudio:
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
};

/* -------------------------------------------------------------------------- */
/*                                SHOP DEFINITION                             */
/* -------------------------------------------------------------------------- */
export interface ShopDetail {
  id: string;
  name: string;
  category: string;
  hours: string;
  location: string;
  image: string;
  tagline: string;
  description: string;
  highlights: string[];
  contact?: {
    phone?: string;
    phoneLabel?: string;
    phone2?: string;
    phone2Label?: string;
    whatsapp?: string;
    whatsappUrl?: string;
    whatsappLabel?: string;
    whatsapp2?: string;
    whatsapp2Url?: string;
    whatsapp2Label?: string;
    websiteUrl?: string;
    websiteLabel?: string;
    instagramUrl?: string;
    instagramLabel?: string;
  };
  extraMedia?: {
    secondImage?: string;
    secondImageCaption?: string;
    videos?: { url: string; title: string }[];
    logo?: string;
  };
  note?: string;
}

export interface ElitePhotoshootContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  tagline: string;
  managementBadge: string;
  location: string;
  hours: string;
  artistryTitle: string;
  artistryP1: string;
  artistryP2: string;
  artistsTitle: string;
  artistsP1: string;
  artistsP2: string;
  techTitle: string;
  techItems: { title: string; desc: string }[];
  servicesTitle: string;
  servicesSubtitle: string;
  servicesList: { title: string; desc: string }[];
  boutiqueTitle: string;
  boutiqueDesc: string;
  whyChooseTitle: string;
  whyChooseItems: { title: string; desc: string }[];
  quoteText: string;
  quoteAuthor: string;
  contactsTitle: string;
  contactsSubtitle: string;
  callPhone1Label: string;
  callPhone2Label: string;
  whatsapp1Label: string;
  whatsapp2Label: string;
  instagramBtnLabel: string;
  instagramQrLabel: string;
  instagramQrPrompt: string;
  videoLabel: string;
  galleryLabel: string;
}

export interface ShopsPageContent {
  breadcrumbHome: string;
  breadcrumbShops: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDesc: string;

  quickNavBadge: string;
  quickNavTitle: string;
  quickNavSubtitle: string;
  jumpToShop: string;
  viewAllLabel: string;
  openFullscreen: string;
  closeFullscreen: string;

  taxFreeTitle: string;
  taxFreeDesc: string;
  taxFreeBadge: string;

  shops: ShopDetail[];
  elitePhotoshoot: ElitePhotoshootContent;
}

export const SHOPS_DATA: Record<Locale, ShopsPageContent> = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbShops: "Shops & Boutiques",
    heroEyebrow: "Resort Shopping Arcade & Boutiques",
    heroTitle: "Boutiques, Fine Jewelry & Artisan Markets",
    heroSubtitle: "Curated Luxury, Timeless Diamonds & Aegean Elegance",
    heroDesc:
      "Explore all 7 on-site shops and boutiques inside Orka Lotus Beach Hotel. From certified diamond jewelry to authentic Turkish leather, Aegean resort fashion, and beachside essentials.",

    quickNavBadge: "ALL SHOPS AT A GLANCE",
    quickNavTitle: "Explore Resort Shops & Boutiques",
    quickNavSubtitle:
      "Click any shop below to view its full collection, location, operating hours, and direct WhatsApp contact.",
    jumpToShop: "View Boutique",
    viewAllLabel: "7 On-Site Boutiques",
    openFullscreen: "Open Fullscreen",
    closeFullscreen: "Close",

    taxFreeTitle: "Global Blue Tax-Free Shopping",
    taxFreeDesc:
      "Save up to 18% on eligible luxury purchases across participating resort boutiques. Request an official Tax-Free form with your passport at checkout.",
    taxFreeBadge: "Tax-Free Available",

    elitePhotoshoot: {
      eyebrow: "LUXURY PHOTOGRAPHY STUDIO & GIFT BOUTIQUE · -3 FLOOR (NEXT TO MAIN POOL)",
      title: "ELITE PHOTOSHOOT STUDIO",
      subtitle: "Capturing Your Soul, Framing Your Memories",
      tagline: "Where Artistry Meets Excellence · Part of the Orka Homes Family",
      managementBadge: "Directed by Visionary Brothers Hassan & Osman",
      location: "Orka Lotus Beach Hotel, -3 Floor (Next to Main Pool), Marmaris, Turkey",
      hours: "09:00 – 23:00 Daily",
      artistryTitle: "Where Artistry Meets Excellence",
      artistryP1:
        "Nestled in the serene and stylish -3 Floor area next to the Main Pool at the prestigious Orka Lotus Beach Hotel, Elite Photoshoot Studio is not just a photography service—it is an artistic experience.",
      artistryP2:
        "Managed by the visionary brothers, Hassan and Osman, Elite Photoshoot has become the premier destination for guests who wish to transform their holiday moments into timeless works of art. With an eye for detail, a passion for creativity, and a commitment to perfection, Hassan and Osman have redefined what it means to capture a memory.",
      artistsTitle: "The Artists Behind the Lens: Hassan & Osman",
      artistsP1:
        "Hassan & Osman are more than photographers; they are visual storytellers. Known for their incredible artistic flair and warm professionalism, they possess a unique ability to make every guest feel comfortable, confident, and radiant in front of the camera.",
      artistsP2:
        "Whether working with energetic children, romantic couples, or large family reunions, Hassan and Osman approach every session with patience, enthusiasm, and a personalized touch. Their reputation is built on guest satisfaction, ensuring that every individual walks away with photos they truly love and cherish.",
      techTitle: "State-of-the-Art Technology & Equipment",
      techItems: [
        {
          title: "Top-Tier Professional Cameras",
          desc: "Equipped with the latest high-resolution professional camera bodies for razor-sharp clarity and vivid color rendition.",
        },
        {
          title: "Premium Lens Collection",
          desc: "Comprehensive glass suited for delicate portraits, sweeping coastal landscapes, dynamic action shots, and low-light sunsets.",
        },
        {
          title: "Advanced Lighting & Studio Gear",
          desc: "Studio strobes, softboxes, and portable reflectors ensuring flattering lighting and moody Aegean atmospheres.",
        },
        {
          title: "Curated Resort Backdrops",
          desc: "Dedicated artistic setups and handpicked resort vistas that showcase the luxury aesthetic of Orka Lotus Beach.",
        },
      ],
      servicesTitle: "Our Tailored Photography Services",
      servicesSubtitle: "From Sunset Piers to Family Keepsakes",
      servicesList: [
        {
          title: "Luxury Portrait Sessions",
          desc: "Individual, couple, and family portraits crafted with artistic composition and flattering natural light.",
        },
        {
          title: "Lifestyle & Vacation Moments",
          desc: "Candid poolside laughter, romantic strolls on the private pier, and social media influencer content.",
        },
        {
          title: "Special Occasions & Milestones",
          desc: "Birthdays, honeymoons, anniversaries, and family celebrations captured with timeless elegance.",
        },
        {
          title: "Fine Art Photo Prints & Framed Works",
          desc: "Museum-grade canvas, custom golden framing, and high-resolution digital albums delivered directly to you.",
        },
      ],
      boutiqueTitle: "The Elite Gift Boutique",
      boutiqueDesc:
        "Located directly behind our main photography studio, the Elite Gift Boutique offers an exquisite selection of high-end jewelry, designer sunglasses, and distinctive vacation souvenirs. Curated with the same dedication to luxury and quality that defines our photography, the boutique is the perfect place to find a gift for a loved one or a timeless memento of your Orka Lotus Beach stay.",
      whyChooseTitle: "Why Choose Elite Photoshoot?",
      whyChooseItems: [
        {
          title: "Unmatched Artistry",
          desc: "Hassan and Osman's creative vision sets every portrait apart as a bespoke piece of fine art.",
        },
        {
          title: "Professional Excellence",
          desc: "Top-notch gear, mastering both optical craft and digital post-production precision.",
        },
        {
          title: "Guest-Centric Warmth",
          desc: "We prioritize your comfort, natural smile, and genuine holiday happiness above all else.",
        },
        {
          title: "Transparent & Competitive Value",
          desc: "World-class resort photography and custom framing packages at competitive rates.",
        },
        {
          title: "Convenient Central Location",
          desc: "Steps away from your sun lounger on -3 Floor right next to the Main Pool.",
        },
        {
          title: "One-Stop Luxury Experience",
          desc: "Seamlessly combine your photoshoot with boutique shopping for fine jewelry and designer eyewear.",
        },
      ],
      quoteText: "Your Moment, Our Masterpiece.",
      quoteAuthor: "Experience the Elite difference. Where every click tells a story, and every photo is a work of art.",
      contactsTitle: "Connect & Book Your Session",
      contactsSubtitle: "Direct phone, WhatsApp consultations, and Instagram portfolio",
      callPhone1Label: "Call Hassan & Osman (+90 533 034 63 48)",
      callPhone2Label: "Call Studio (+90 506 059 85 12)",
      whatsapp1Label: "WhatsApp (+90 533 034 63 48)",
      whatsapp2Label: "WhatsApp (+90 506 059 85 12)",
      instagramBtnLabel: "Follow @elite.photoshop_ on Instagram",
      instagramQrLabel: "Instagram Direct QR Code",
      instagramQrPrompt: "Scan or tap to explore our real-time client gallery and latest stories",
      videoLabel: "Cinematic Holiday Memories & High-Speed Portraiture",
      galleryLabel: "Elite Photoshoot Studio Master Showcase",
    },

    shops: [
      {
        id: "aksoy-jewelry",
        name: "Aksoy Jewelry & Diamonds",
        category: "Fine Jewelry & Diamonds",
        hours: "10:00 – 23:30",
        location: "Lobby Arcade",
        image: SHOPS_ASSETS.aksoyHeader,
        tagline: "Jewels That Belong To Your Story",
        description:
          "Handcrafted certified GIA diamond solitaires, bespoke 14K & 18K Italian and Aegean gold, and luxury horlogerie curated by founder Mr. Rashid Aksoy and gemology director Mr. Fatih Taşpınar.",
        highlights: [
          "GIA & HRD Certified Diamonds",
          "14K & 18K Fine Gold Collections",
          "Custom Bespoke Atelier & Sizing",
          "Worldwide Authenticity & Warranty",
        ],
        contact: {
          whatsapp: "+90 532 433 13 87",
          whatsappUrl: "https://wa.me/905324331387",
          whatsappLabel: "WhatsApp Mr. Rashid Aksoy",
          whatsapp2: "+90 532 749 03 07",
          whatsapp2Url: "https://wa.me/905327490307",
          whatsapp2Label: "WhatsApp Mr. Fatih Taşpınar",
          websiteUrl: "https://aksoyjewels-1.vercel.app/",
          websiteLabel: "Official Website",
        },
        extraMedia: {
          videos: [
            {
              url: SHOPS_ASSETS.aksoyVideoRing,
              title: "Diamond Solitaire Transformation",
            },
            {
              url: SHOPS_ASSETS.aksoyVideoHaute,
              title: "Haute Joaillerie Atelier",
            },
          ],
          logo: SHOPS_ASSETS.aksoyLogo,
        },
      },
      {
        id: "elite-photoshoot",
        name: "Elite Photoshoot Studio",
        category: "Luxury Photography & Boutique",
        hours: "09:00 – 23:00",
        location: "-3 Floor (Next to Main Pool)",
        image: SHOPS_ASSETS.eliteCover,
        tagline: "Capturing Your Soul, Framing Your Memories",
        description:
          "Where artistry meets excellence. Transform your holiday moments into timeless works of art managed by visionary brothers Hassan and Osman next to the Main Pool.",
        highlights: [
          "Visionary Storytellers Hassan & Osman",
          "Top-Tier Professional Cameras & Lenses",
          "Sunset Pier, Beach & Pool Sessions",
          "Curated Elite Gift Boutique On-Site",
        ],
        contact: {
          phone: "+90 533 034 63 48",
          phoneLabel: "Call (+90 533 034 63 48)",
          phone2: "+90 506 059 85 12",
          phone2Label: "Call (+90 506 059 85 12)",
          whatsapp: "+90 533 034 63 48",
          whatsappUrl: "https://wa.me/905330346348",
          whatsappLabel: "WhatsApp (+90 533 034 63 48)",
          whatsapp2: "+90 506 059 85 12",
          whatsapp2Url: "https://wa.me/905060598512",
          whatsapp2Label: "WhatsApp (+90 506 059 85 12)",
          instagramUrl: "https://www.instagram.com/elite.photoshop_",
          instagramLabel: "@elite.photoshop_",
        },
        extraMedia: {
          secondImage: SHOPS_ASSETS.eliteImageShowcase,
          secondImageCaption: "Elite Photoshoot Showcase Gallery",
          videos: [
            {
              url: SHOPS_ASSETS.eliteVideo,
              title: "Cinematic Transition & Portraiture",
            },
          ],
        },
      },
      {
        id: "nora-salon",
        name: "Nora Hair & Beauty Salon",
        category: "Hair & Beauty Spa",
        hours: "09:00 – 20:00",
        location: "-3 Floor (In Front of Spa)",
        image: SHOPS_ASSETS.noraSalon,
        tagline: "Where Luxury Meets Expertise",
        description:
          "Professional hair artistry, keratin smoothing, gel nail couture, spa pedicures, and bridal styling overseen by salon director Ms. Nurtan.",
        highlights: [
          "Precision Cuts & Keratin Therapy",
          "Gel Nail Artistry & Spa Pedicures",
          "Skin Rejuvenation & Brow Sculpting",
          "VIP Bridal & Gala Hair Packages",
        ],
        contact: {
          phone: "+90 533 197 73 83",
          phoneLabel: "Call Ms. Nurtan",
          whatsapp: "+90 533 197 73 83",
          whatsappUrl: "https://wa.me/905331977383",
          whatsappLabel: "WhatsApp Ms. Nurtan",
        },
      },
      {
        id: "azur-shop",
        name: "Azur Leather & Travel Goods",
        category: "Fine Leather & Luggage",
        hours: "09:30 – 23:00",
        location: "Main Shopping Arcade",
        image: SHOPS_ASSETS.azurShopGift,
        tagline: "Handcrafted Turkish Leather & Travel Elegance",
        description:
          "Handcrafted genuine Turkish leather bags, ultralight travel suitcases, wallets, belts, and bespoke goods managed by Mr. Murat with international shipping.",
        highlights: [
          "100% Handcrafted Genuine Turkish Leather",
          "Durable Lightweight Travel Luggage",
          "Express Worldwide Door-to-Door Shipping",
          "Exclusive In-House Hotel Guest Courtesy",
        ],
        contact: {
          phone: "+90 536 477 48 19",
          phoneLabel: "Call Mr. Murat",
          whatsapp: "+90 536 477 48 19",
          whatsappUrl: "https://wa.me/905364774819",
          whatsappLabel: "WhatsApp Mr. Murat",
        },
        extraMedia: {
          secondImage: SHOPS_ASSETS.azurShopHandbag,
          secondImageCaption: "Premium Leather Handbag Collection",
        },
      },
      {
        id: "azur-gift-boutique",
        name: "Azur Gift & Souvenir Boutique",
        category: "Gifts & Souvenirs",
        hours: "09:30 – 23:30",
        location: "Arcade Ground Floor",
        image: SHOPS_ASSETS.azurGiftBoutique,
        tagline: "Authentic Memories & Aegean Treasures",
        description:
          "Curated Turkish gifts, gourmet delight confectionery, handcrafted Aegean ceramics, protective evil-eye amulets, and organic olive oil cosmetics curated by Mr. Murat.",
        highlights: [
          "Artisan Ceramics & Nazar Keepsakes",
          "Gourmet Turkish Delight & Spices",
          "Natural Olive Oil Beauty Products",
          "Complimentary Gift Wrapping",
        ],
        contact: {
          phone: "+90 536 477 48 19",
          phoneLabel: "Call Mr. Murat",
          whatsapp: "+90 536 477 48 19",
          whatsappUrl: "https://wa.me/905364774819",
          whatsappLabel: "WhatsApp Mr. Murat",
        },
      },
      {
        id: "istanbul-textile",
        name: "Istanbul Textile & Resort Fashion",
        category: "Textiles & Resort Fashion",
        hours: "09:00 – 23:00",
        location: "Beach Walk Promenade",
        image: SHOPS_ASSETS.istanbulTextile,
        tagline: "Organic Aegean Cottons & Holiday Chic",
        description:
          "Premium 100% Turkish cotton peshtemal towels, breathable linen resort dresses, chic swimwear, beach caftans, and sun protection apparel.",
        highlights: [
          "100% Organic Turkish Cotton",
          "Aegean Linen Shirts & Dresses",
          "Designer Swimwear & Caftans",
          "Complimentary Custom Sizing",
        ],
        contact: {
          phone: "+90 536 676 17 11",
          phoneLabel: "Direct Call",
          whatsapp: "+90 536 676 17 11",
          whatsappUrl: "https://wa.me/905366761711",
          whatsappLabel: "WhatsApp Textile Team",
        },
      },
      {
        id: "supermarket",
        name: "Orka Lotus Beach Market",
        category: "Beach Supermarket & Essentials",
        hours: "08:00 – 00:00",
        location: "Bay Area (Beachfront)",
        image: SHOPS_ASSETS.supermarket,
        tagline: "Everything You Need Steps From The Waves",
        description:
          "Beachside mini-market offering chilled beverages, artisanal ice creams, UV sun lotions, snorkel masks, inflatables, snacks, and vacation essentials right on the promenade.",
        highlights: [
          "Chilled Drinks, Ice Creams & Snacks",
          "SPF Sunscreens & After-Sun Care",
          "Beach Inflatables, Rings & Snorkels",
          "Open Until Midnight Daily",
        ],
        note: "Conveniently situated right along the coastal promenade for quick grab-and-go.",
      },
    ],
  },

  tr: {
    breadcrumbHome: "Ana Sayfa",
    breadcrumbShops: "Mağazalar & Butikler",
    heroEyebrow: "Otel Alışveriş Caddesi & Butikler",
    heroTitle: "Butikler, Mücevherat & Sanat Çarşıları",
    heroSubtitle: "Seçkin Lüks, Zamansız Pırlantalar & Ege Zarafeti",
    heroDesc:
      "Orka Lotus Beach Hotel bünyesindeki 7 seçkin mağazayı keşfedin. Uluslararası sertifikalı mücevherlerden hakiki Türk derisine, Ege sahil modasından plaj ihtiyaçlarına her şey bir arada.",

    quickNavBadge: "TÜM MAĞAZALAR BİR BAKIŞTA",
    quickNavTitle: "Otel İçi Mağaza ve Butikler",
    quickNavSubtitle:
      "Koleksiyonunu, konumunu, çalışma saatlerini ve doğrudan WhatsApp iletişimini görmek için aşağıdaki mağazalardan birine tıklayın.",
    jumpToShop: "Mağazayı Gör",
    viewAllLabel: "7 Otel İçi Butik",
    openFullscreen: "Tam Ekran Aç",
    closeFullscreen: "Kapat",

    taxFreeTitle: "Global Blue Tax-Free Alışveriş Güvencesi",
    taxFreeDesc:
      "Katılımcı resort butiklerimizde yapacağınız uygun lüks alışverişlerde %18'e varan KDV iadesi avantajından yararlanın. Ödeme sırasında pasaportunuzla birlikte Tax-Free formu talep edebilirsiniz.",
    taxFreeBadge: "Tax-Free Geçerli",

    elitePhotoshoot: {
      eyebrow: "LÜKS FOTOĞRAF STÜDYOSU & HEDİYELİK BUTİK · -3 KAT (ANA HAVUZ YANI)",
      title: "ELITE PHOTOSHOOT STUDIO",
      subtitle: "Ruhunuzu Yakalayan, Anılarınızı Çerçeveleyen Sanat",
      tagline: "Sanatın Mükemmellikle Buluştuğu Yer · Orka Homes Ailesinin Bir Parçası",
      managementBadge: "Vizyoner Kardeşler Hassan ve Osman Yönetiminde",
      location: "Orka Lotus Beach Hotel, -3 Katı (Ana Havuz Yanı), Marmaris, Türkiye",
      hours: "Her Gün 09:00 – 23:00",
      artistryTitle: "Sanatın Mükemmellikle Buluştuğu Yer",
      artistryP1:
        "Prestijli Orka Lotus Beach Hotel'in huzurlu ve şık -3 katında, Ana Havuzun hemen yanı başında yer alan Elite Photoshoot Studio, yalnızca bir fotoğraf hizmeti değil; büyüleyici bir sanatsal deneyimdir.",
      artistryP2:
        "Vizyoner kardeşler Hassan ve Osman tarafından yönetilen Elite Photoshoot, tatil anılarını zamansız sanat eserlerine dönüştürmek isteyen misafirlerin vazgeçilmez durağı haline gelmiştir. Detaylara duydukları özen, yaratıcılık tutkuları ve mükemmeliyet taahhütleriyle Hassan ve Osman, bir anıyı ölümsüzleştirmenin anlamını yeniden tanımladılar.",
      artistsTitle: "Objektifin Arkasındaki Sanatçılar: Hassan & Osman",
      artistsP1:
        "Hassan & Osman birer fotoğrafçıdan çok daha fazlasıdır; onlar görsel hikaye anlatıcılarıdır. İnanılmaz sanatsal yetenekleri ve samimi profesyonellikleriyle tanınan bu iki kardeş, her misafirin kamera karşısında rahat, özgüvenli ve ışıl ışıl hissetmesini sağlar.",
      artistsP2:
        "İster neşeli çocuklarla, ister romantik çiftlerle ya da kalabalık aile gruplarıyla çalışsınlar; her çekime sabır, coşku ve kişiye özel bir yaklaşımla başlarlar. Başarıları misafir memnuniyeti üzerine kuruludur ve her konuğun ömür boyu seveceği karelerle ayrılmasını sağlarlar.",
      techTitle: "En Son Teknoloji ve Üst Segment Ekipmanlar",
      techItems: [
        {
          title: "En Üst Düzey Profesyonel Kameralar",
          desc: "Kristal netliğinde ayrıntılar ve canlı renk geçişleri sağlayan en son teknoloji yüksek çözünürlüklü gövdeler.",
        },
        {
          title: "Kapsamlı Premium Lens Koleksiyonu",
          desc: "Zarif portreler, geniş sahil manzaraları, gün batımı ışığı ve hareketli kareler için özel optikler.",
        },
        {
          title: "İleri Düzey Işıklandırma ve Stüdyo Donanımı",
          desc: "Her ortamda kusursuz aydınlatma ve büyüleyici Ege atmosferi yaratan profesyonel ışık ve reflektör sistemleri.",
        },
        {
          title: "Küratörlü Özel Arka Planlar",
          desc: "Orka Lotus Beach Hotel'in lüks estetiğini en zarif şekilde yansıtan özel dekorlar ve otel sahneleri.",
        },
      ],
      servicesTitle: "Kişiye Özel Fotoğraf Çekim Hizmetlerimiz",
      servicesSubtitle: "İskeledeki Gün Batımından Aile Hatıralarına",
      servicesList: [
        {
          title: "Lüks Portre Çekimleri",
          desc: "Karakterinizi ve doğal ışıltınızı yansıtan sanatsal bireysel, çift ve aile portreleri.",
        },
        {
          title: "Yaşam Tarzı & Tatil Kareleri",
          desc: "Havuz başında neşeli anlar, ahşap iskelede romantik yürüyüşler ve sosyal medya içerikleri.",
        },
        {
          title: "Özel Günler & Kutlamalar",
          desc: "Doğum günleri, evlilik teklifleri, yıl dönümleri ve özel aile buluşmaları.",
        },
        {
          title: "Sanat Kalitesinde Baskılar & Çerçeveler",
          desc: "Müze kalitesinde tuval baskılar, el yapımı altın çerçeveler ve anında dijital galeri teslimi.",
        },
      ],
      boutiqueTitle: "The Elite Gift Boutique",
      boutiqueDesc:
        "Ana fotoğraf stüdyomuzun hemen arkasında yer alan Elite Gift Boutique, seçkin mücevherler, tasarım güneş gözlükleri ve eşsiz tatil hediyeliklerinden oluşan özel bir koleksiyon sunar. Fotoğrafçılığımızı tanımlayan lüks ve kalite anlayışıyla hazırlanan butiğimiz, sevdiklerinize anlamlı bir hediye ya da Orka Lotus Beach tatilinizden kalıcı bir hatıra seçmek için mükemmel bir mekandır.",
      whyChooseTitle: "Neden Elite Photoshoot?",
      whyChooseItems: [
        {
          title: "Benzersiz Sanat Anlayışı",
          desc: "Hassan ve Osman'ın yaratıcı vizyonu her kareyi özel bir sanat eseri haline getirir.",
        },
        {
          title: "Profesyonel Mükemmellik",
          desc: "En üst segment teknoloji, kusursuz kompozisyon ve titiz post-prodüksiyon ustalığı.",
        },
        {
          title: "Misafir Odaklı Sıcaklık",
          desc: "Sizin rahatınız, içten tebessümünüz ve tatil mutluluğunuz her şeyin üzerindedir.",
        },
        {
          title: "Şeffaf ve Cazip Fiyatlandırma",
          desc: "Dünya standartlarında resort fotoğrafçılığı ve çerçeveleme paketlerinde cazip fiyatlar.",
        },
        {
          title: "Merkezi ve Kolay Konum",
          desc: "-3 katında, şezlongunuza sadece birkaç adım mesafede Ana Havuzun hemen yanı.",
        },
        {
          title: "Eksiksiz Tek Nokta Deneyimi",
          desc: "Fotoğraf çekiminizle birlikte şık mücevher ve tasarım güneş gözlüğü alışverişi bir arada.",
        },
      ],
      quoteText: "Sizin Anınız, Bizim Başyapıtımız.",
      quoteAuthor: "Elite farkını yaşayın. Her deklanşör bir hikaye fısıldar, her fotoğraf bir sanat eseridir.",
      contactsTitle: "İletişime Geçin & Rezervasyon Yapın",
      contactsSubtitle: "Doğrudan telefon görüşmesi, WhatsApp danışmanlığı ve Instagram galerisi",
      callPhone1Label: "Hassan & Osman'ı Ara (+90 533 034 63 48)",
      callPhone2Label: "Stüdyoyu Ara (+90 506 059 85 12)",
      whatsapp1Label: "WhatsApp (+90 533 034 63 48)",
      whatsapp2Label: "WhatsApp (+90 506 059 85 12)",
      instagramBtnLabel: "Instagram'da @elite.photoshop_ Takip Edin",
      instagramQrLabel: "Instagram Doğrudan QR Kodu",
      instagramQrPrompt: "Güncel misafir portföyümüzü ve hikayelerimizi incelemek için tarayın veya tıklayın",
      videoLabel: "Sinematik Tatil Anıları ve Sanatsal Portre Çekimleri",
      galleryLabel: "Elite Photoshoot Stüdyo Koleksiyonu",
    },

    shops: [
      {
        id: "aksoy-jewelry",
        name: "Aksoy Jewelry & Diamonds",
        category: "Mücevher & Pırlanta",
        hours: "10:00 – 23:30",
        location: "Lobi Çarşısı",
        image: SHOPS_ASSETS.aksoyHeader,
        tagline: "Hikayenize Ait Mücevherler",
        description:
          "Kurucu Sn. Rashid Aksoy ve gemoloji direktörü Sn. Fatih Taşpınar yönetiminde sertifikalı GIA tektaş pırlantalar, 14K & 18K Ege altını, özel atölye tasarımları ve ömür boyu garanti.",
        highlights: [
          "GIA & HRD Sertifikalı Pırlantalar",
          "14K & 18K Has Altın Koleksiyonları",
          "Kişiye Özel Atölye ve Boyutlandırma",
          "Uluslararası Garanti ve Sigorta",
        ],
        contact: {
          whatsapp: "+90 532 433 13 87",
          whatsappUrl: "https://wa.me/905324331387",
          whatsappLabel: "WhatsApp Sn. Rashid Aksoy",
          whatsapp2: "+90 532 749 03 07",
          whatsapp2Url: "https://wa.me/905327490307",
          whatsapp2Label: "WhatsApp Sn. Fatih Taşpınar",
          websiteUrl: "https://aksoyjewels-1.vercel.app/",
          websiteLabel: "Resmi Web Sitesi",
        },
        extraMedia: {
          videos: [
            {
              url: SHOPS_ASSETS.aksoyVideoRing,
              title: "Pırlanta Tektaş Dönüşümü",
            },
            {
              url: SHOPS_ASSETS.aksoyVideoHaute,
              title: "Haute Joaillerie Atölyesi",
            },
          ],
          logo: SHOPS_ASSETS.aksoyLogo,
        },
      },
      {
        id: "elite-photoshoot",
        name: "Elite Photoshoot Studio",
        category: "Lüks Fotoğrafçılık & Butik",
        hours: "09:00 – 23:00",
        location: "-3 Katı (Ana Havuz Yanı)",
        image: SHOPS_ASSETS.eliteCover,
        tagline: "Ruhunuzu Yakalayan, Anılarınızı Çerçeveleyen Sanat",
        description:
          "Sanatın mükemmellikle buluştuğu yer. Vizyoner kardeşler Hassan ve Osman yönetiminde ana havuz kenarında tatil anılarınızı zamansız sanat eserlerine dönüştürün.",
        highlights: [
          "Vizyoner Sanatçılar Hassan & Osman",
          "En Üst Segment Profesyonel Ekipman",
          "İskele, Plaj ve Havuz Çekimleri",
          "Stüdyo Arkasında Seçkin Butik Hediye Mağazası",
        ],
        contact: {
          phone: "+90 533 034 63 48",
          phoneLabel: "Ara (+90 533 034 63 48)",
          phone2: "+90 506 059 85 12",
          phone2Label: "Ara (+90 506 059 85 12)",
          whatsapp: "+90 533 034 63 48",
          whatsappUrl: "https://wa.me/905330346348",
          whatsappLabel: "WhatsApp (+90 533 034 63 48)",
          whatsapp2: "+90 506 059 85 12",
          whatsapp2Url: "https://wa.me/905060598512",
          whatsapp2Label: "WhatsApp (+90 506 059 85 12)",
          instagramUrl: "https://www.instagram.com/elite.photoshop_",
          instagramLabel: "@elite.photoshop_",
        },
        extraMedia: {
          secondImage: SHOPS_ASSETS.eliteImageShowcase,
          secondImageCaption: "Elite Photoshoot Özel Galeri",
          videos: [
            {
              url: SHOPS_ASSETS.eliteVideo,
              title: "Sinematik Geçiş ve Portre",
            },
          ],
        },
      },
      {
        id: "nora-salon",
        name: "Nora Hair & Beauty Salon",
        category: "Kuaför & Güzellik Spa",
        hours: "09:00 – 20:00",
        location: "-3 Katı (Spa Karşısı)",
        image: SHOPS_ASSETS.noraSalon,
        tagline: "Lüksün ve Uzmanlığın Buluştuğu Yer",
        description:
          "Salon yöneticisi Sn. Nurtan gözetiminde profesyonel saç kesimi, keratin bakımı, kalıcı oje & jel tırnak sanatı ve özel gelin hazırlık hizmetleri.",
        highlights: [
          "Hassas Saç Kesimi & Keratin Bakımı",
          "Jel Tırnak Sanatı & Spa Pedikür",
          "Cilt Bakımı & Güzellik Terapileri",
          "Gelin ve Özel Gün Tasarımları",
        ],
        contact: {
          phone: "+90 533 197 73 83",
          phoneLabel: "Sn. Nurtan'ı Ara",
          whatsapp: "+90 533 197 73 83",
          whatsappUrl: "https://wa.me/905331977383",
          whatsappLabel: "WhatsApp Sn. Nurtan",
        },
      },
      {
        id: "azur-shop",
        name: "Azur Leather & Travel Goods",
        category: "Deri Çanta & Bavul",
        hours: "09:30 – 23:00",
        location: "Ana Çarşı",
        image: SHOPS_ASSETS.azurShopGift,
        tagline: "Seçkin Türk Derisi & Seyahat Şıklığı",
        description:
          "Sn. Murat yönetiminde el yapımı birinci sınıf Türk derisi çantalar, hafif ve dayanıklı seyahat valizleri, cüzdanlar ve uluslararası hızlı kargo güvencesi.",
        highlights: [
          "Hakiki Türk Derisi Çantalar",
          "Dayanıklı Seyahat Valizleri",
          "Hızlı Uluslararası Kargo",
          "Otel Misafirlerine Özel Ayrıcalık",
        ],
        contact: {
          phone: "+90 536 477 48 19",
          phoneLabel: "Sn. Murat'ı Ara",
          whatsapp: "+90 536 477 48 19",
          whatsappUrl: "https://wa.me/905364774819",
          whatsappLabel: "WhatsApp Sn. Murat",
        },
        extraMedia: {
          secondImage: SHOPS_ASSETS.azurShopHandbag,
          secondImageCaption: "Premium Deri Çanta Koleksiyonu",
        },
      },
      {
        id: "azur-gift-boutique",
        name: "Azur Gift & Souvenir Boutique",
        category: "Hediyelik & Hatıra",
        hours: "09:30 – 23:30",
        location: "Çarşı Zemin Katı",
        image: SHOPS_ASSETS.azurGiftBoutique,
        tagline: "Otantik Anılar & Ege Hazineleri",
        description:
          "Sn. Murat tarafından hazırlanan geleneksel Türk lokumları, el yapımı İznik seramikleri, nazar boncukları, doğal zeytinyağlı sabunlar ve hediyelik eşyalar.",
        highlights: [
          "El Yapımı Seramik & Nazar Hatıraları",
          "Gurme Türk Lokumu & Ege Baharatları",
          "Doğal Zeytinyağı Kozmetikleri",
          "Ücretsiz Hediye Paketleme",
        ],
        contact: {
          phone: "+90 536 477 48 19",
          phoneLabel: "Sn. Murat'ı Ara",
          whatsapp: "+90 536 477 48 19",
          whatsappUrl: "https://wa.me/905364774819",
          whatsappLabel: "WhatsApp Sn. Murat",
        },
      },
      {
        id: "istanbul-textile",
        name: "Istanbul Textile & Resort Fashion",
        category: "Tekstil & Butik Moda",
        hours: "09:00 – 23:00",
        location: "Sahil Yürüyüş Yolu",
        image: SHOPS_ASSETS.istanbulTextile,
        tagline: "Organik Ege Pamuğu & Tatil Şıklığı",
        description:
          "%100 Türk organik pamuklu peştemal havlular, hafif Ege keten elbiseleri, şık kaftanlar, mayolar ve güneşten koruyucu aksesuarlar.",
        highlights: [
          "%100 Organik Türk Pamuğu",
          "Nefes Alan Keten Gömlek & Elbise",
          "Tasarım Kaftanlar & Plaj Giyimi",
          "Ücretsiz Özel Beden Ayarlaması",
        ],
        contact: {
          phone: "+90 536 676 17 11",
          phoneLabel: "Doğrudan Ara",
          whatsapp: "+90 536 676 17 11",
          whatsappUrl: "https://wa.me/905366761711",
          whatsappLabel: "WhatsApp Tekstil Ekibi",
        },
      },
      {
        id: "supermarket",
        name: "Orka Lotus Beach Market",
        category: "Süpermarket & Sahil İhtiyaçları",
        hours: "08:00 – 00:00",
        location: "Koy Alanı (Sahil)",
        image: SHOPS_ASSETS.supermarket,
        tagline: "Denize Birkaç Adım Mesafede Tüm İhtiyaçlar",
        description:
          "Sahil kordonunda soğuk meşrubatlar, dondurmalar, yüksek korumalı güneş kremleri, deniz simitleri ve atıştırmalıklar sunan plaj süpermarketi.",
        highlights: [
          "Soğuk İçecekler, Dondurma & Atıştırmalık",
          "SPF Güneş Koruyucu & Losyonlar",
          "Deniz Simitleri & Şnorkel Takımları",
          "Gece Yarısına Kadar Açık",
        ],
        note: "Plaj yürüyüş yolunda şezlongunuza sadece birkaç adım mesafede.",
      },
    ],
  },

  ru: {
    breadcrumbHome: "Главная",
    breadcrumbShops: "Магазины и бутики",
    heroEyebrow: "Торговый пассаж и бутики отеля",
    heroTitle: "Бутики, ювелирные изделия и маркет",
    heroSubtitle: "Изысканная роскошь, бриллианты и элегантность",
    heroDesc:
      "Откройте для себя 7 эксклюзивных магазинов в отеле Orka Lotus Beach: от сертифицированных ювелирных изделий до турецкой кожи, пляжной моды и товаров для отдыха.",

    quickNavBadge: "ВСЕ МАГАЗИНЫ ОБЗОРОМ",
    quickNavTitle: "Магазины и бутики отеля",
    quickNavSubtitle:
      "Нажмите на любой магазин ниже, чтобы посмотреть коллекцию, часы работы, локацию и связаться в WhatsApp.",
    jumpToShop: "Перейти к бутику",
    viewAllLabel: "7 бутиков в отеле",
    openFullscreen: "Во весь экран",
    closeFullscreen: "Закрыть",

    taxFreeTitle: "Покупки Tax-Free с Global Blue",
    taxFreeDesc:
      "Экономьте до 18% НДС при покупках в участвующих бутиках отеля. Запросите официальную форму Tax-Free при оплате, предъявив паспорт.",
    taxFreeBadge: "Доступен Tax-Free",

    elitePhotoshoot: {
      eyebrow: "ПРЕМИУМ ФОТОСТУДИЯ И БУТИК ПОДАРКОВ · -3 ЭТАЖ (У ГЛАВНОГО БАССЕЙНА)",
      title: "ELITE PHOTOSHOOT STUDIO",
      subtitle: "Запечатлевая душу, сохраняя воспоминания",
      tagline: "Где искусство встречается с совершенством · Часть семьи Orka Homes",
      managementBadge: "Под руководством братьев Хассана и Османа",
      location: "Отель Orka Lotus Beach, -3 этаж (рядом с главным бассейном), Мармарис, Турция",
      hours: "Ежедневно с 09:00 до 23:00",
      artistryTitle: "Где искусство встречается с совершенством",
      artistryP1:
        "Расположенная на тихом и изысканном -3 этаже отеля Orka Lotus Beach прямо у Главного бассейна, студия Elite Photoshoot — это не просто фотоуслуги, а настоящее художественное таинство.",
      artistryP2:
        "Под управлением братьев Хассана и Османа студия стала главным направлением для гостей, мечтающих превратить драгоценные моменты отдыха в вечные произведения искусства. С безупречным вниманием к деталям и страстью к творчеству они заново открывают магию семейной и романтической фотографии.",
      artistsTitle: "Мастера за объективом: Хассан и Осман",
      artistsP1:
        "Хассан и Осман — не просто фотографы, они визуальные рассказчики историй. Их природное обаяние и чуткий профессионализм позволяют каждому гостю почувствовать себя непринужденно, уверенно и неотразимо перед камерой.",
      artistsP2:
        "Будь то съемка активных детей, влюбленных пар на закате или больших семейных праздников, братья вкладывают душу и терпение в каждый кадр. Репутация студии построена на искреннем восторге гостей, возвращающихся домой с шедеврами.",
      techTitle: "Передовые технологии и профессиональное оборудование",
      techItems: [
        {
          title: "Флагманские фотокамеры высокого разрешения",
          desc: "Новейшие профессиональные полнокадровые матрицы для непревзойденной резкости и естественной цветопередачи.",
        },
        {
          title: "Премиальная линейка светосильных объективов",
          desc: "Оптика топ-класса для глубоких портретов с мягким боке, панорамных пейзажей и динамичных кадров на закате.",
        },
        {
          title: "Студийное освещение и мобильные модификаторы",
          desc: "Профессиональный импульсный и постоянный свет, создающий идеальное освещение в любых локациях отеля.",
        },
        {
          title: "Эксклюзивные живописные декорации",
          desc: "Авторские фотозоны и природные красоты курорта, подчеркивающие роскошь Orka Lotus Beach.",
        },
      ],
      servicesTitle: "Индивидуальные программы фотосъемок",
      servicesSubtitle: "От романтических пирсов до семейных альбомов",
      servicesList: [
        {
          title: "Премиальные портретные сессии",
          desc: "Индивидуальные, парные и семейные портреты с чутким позированием и кинематографичным светом.",
        },
        {
          title: "Lifestyle и моменты отдыха",
          desc: "Живые эмоциональные кадры у бассейна, на деревянных пирсах и стильный контент для соцсетей.",
        },
        {
          title: "Торжества и семейные даты",
          desc: "Дни рождения, юбилеи, предложения руки и сердца, а также медовый месяц.",
        },
        {
          title: "Музейные холсты и золоченые рамы",
          desc: "Печать архивного качества, изысканные золотые рамы и моментальная цифровая доставка в высоком разрешении.",
        },
      ],
      boutiqueTitle: "The Elite Gift Boutique",
      boutiqueDesc:
        "Прямо за нашей фотостудией расположен бутик Elite Gift Boutique, предлагающий коллекцию эксклюзивных ювелирных изделий, дизайнерских солнцезащитных очков и сувениров премиум-класса. Созданный с той же страстью к элегантности, бутик станет идеальным местом для покупки подарка близким или памятного сувенира об отдыхе в Orka Lotus Beach.",
      whyChooseTitle: "Почему выбирают Elite Photoshoot?",
      whyChooseItems: [
        {
          title: "Неповторимый авторский почерк",
          desc: "Творческое видение Хассана и Османа превращает каждую фотографию в произведение искусства.",
        },
        {
          title: "Профессиональное мастерство",
          desc: "Лучшая оптическая техника и ювелирная цифровая ретушь каждого кадра.",
        },
        {
          title: "Теплая и душевная атмосфера",
          desc: "Ваш комфорт, искренняя улыбка и радость отдыха — наш главный приоритет.",
        },
        {
          title: "Прозрачные и выгодные условия",
          desc: "Премиальный уровень сервиса и оформления картин по привлекательным курортным ценам.",
        },
        {
          title: "Удобное расположение",
          desc: "-3 этаж прямо у Главного бассейна, всего в двух шагах от вашего шезлонга.",
        },
        {
          title: "Комплексный премиум-опыт",
          desc: "Возможность совместить незабываемую фотосессию с выбором украшений и брендовой оптики.",
        },
      ],
      quoteText: "Ваш момент — наш шедевр.",
      quoteAuthor: "Почувствуйте разницу с Elite Photoshoot. Здесь каждый кадр рассказывает историю, а каждая фотография — произведение искусства.",
      contactsTitle: "Связаться и забронировать фотосессию",
      contactsSubtitle: "Прямые звонки, консультации в WhatsApp и официальный Instagram",
      callPhone1Label: "Позвонить Хассану и Осману (+90 533 034 63 48)",
      callPhone2Label: "Позвонить в студию (+90 506 059 85 12)",
      whatsapp1Label: "WhatsApp (+90 533 034 63 48)",
      whatsapp2Label: "WhatsApp (+90 506 059 85 12)",
      instagramBtnLabel: "Подписаться на @elite.photoshop_ в Instagram",
      instagramQrLabel: "Прямой QR-код Instagram",
      instagramQrPrompt: "Наведите камеру смартфона или нажмите для перехода в портфолио студии",
      videoLabel: "Кинематографичные воспоминания об отдыхе и экспресс-портреты",
      galleryLabel: "Галерея шедевров Elite Photoshoot Studio",
    },

    shops: [
      {
        id: "aksoy-jewelry",
        name: "Aksoy Jewelry & Diamonds",
        category: "Ювелирные изделия и бриллианты",
        hours: "10:00 – 23:30",
        location: "Пассаж в лобби",
        image: SHOPS_ASSETS.aksoyHeader,
        tagline: "Драгоценности вашей неповторимой истории",
        description:
          "Бриллианты с сертификатами GIA и HRD, авторское золото 14K и 18K, индивидуальный дизайн и пожизненная международная гарантия от г-на Рашида Аксоя и г-на Фатиха Ташпынара.",
        highlights: [
          "Бриллианты с сертификатами GIA и HRD",
          "Коллекции золота 14K и 18K",
          "Индивидуальный пошив и подгонка",
          "Международная гарантия и сертификат",
        ],
        contact: {
          whatsapp: "+90 532 433 13 87",
          whatsappUrl: "https://wa.me/905324331387",
          whatsappLabel: "WhatsApp г-н Рашид Аксой",
          whatsapp2: "+90 532 749 03 07",
          whatsapp2Url: "https://wa.me/905327490307",
          whatsapp2Label: "WhatsApp г-н Фатих Ташпынар",
          websiteUrl: "https://aksoyjewels-1.vercel.app/",
          websiteLabel: "Официальный сайт",
        },
        extraMedia: {
          videos: [
            {
              url: SHOPS_ASSETS.aksoyVideoRing,
              title: "Превращение бриллиантового кольца",
            },
            {
              url: SHOPS_ASSETS.aksoyVideoHaute,
              title: "Ателье Haute Joaillerie",
            },
          ],
          logo: SHOPS_ASSETS.aksoyLogo,
        },
      },
      {
        id: "elite-photoshoot",
        name: "Elite Photoshoot Studio",
        category: "Премиум фотостудия и бутик",
        hours: "09:00 – 23:00",
        location: "-3 этаж (у главного бассейна)",
        image: SHOPS_ASSETS.eliteCover,
        tagline: "Запечатлевая душу, сохраняя воспоминания",
        description:
          "Где искусство встречается с совершенством. Превратите моменты вашего отдыха в вечные произведения искусства под руководством братьев Хассана и Османа рядом с главным бассейном.",
        highlights: [
          "Мастера фотографии Хассан и Осман",
          "Профессиональные камеры и оптика топ-класса",
          "Фотосессии на закате, пирсах и у бассейна",
          "Бутик украшений и подарков при студии",
        ],
        contact: {
          phone: "+90 533 034 63 48",
          phoneLabel: "Позвонить (+90 533 034 63 48)",
          phone2: "+90 506 059 85 12",
          phone2Label: "Позвонить (+90 506 059 85 12)",
          whatsapp: "+90 533 034 63 48",
          whatsappUrl: "https://wa.me/905330346348",
          whatsappLabel: "WhatsApp (+90 533 034 63 48)",
          whatsapp2: "+90 506 059 85 12",
          whatsapp2Url: "https://wa.me/905060598512",
          whatsapp2Label: "WhatsApp (+90 506 059 85 12)",
          instagramUrl: "https://www.instagram.com/elite.photoshop_",
          instagramLabel: "@elite.photoshop_",
        },
        extraMedia: {
          secondImage: SHOPS_ASSETS.eliteImageShowcase,
          secondImageCaption: "Галерея шедевров Elite Photoshoot",
          videos: [
            {
              url: SHOPS_ASSETS.eliteVideo,
              title: "Кинематографичный переход и портрет",
            },
          ],
        },
      },
      {
        id: "nora-salon",
        name: "Nora Hair & Beauty Salon",
        category: "Салон красоты и спа",
        hours: "09:00 – 20:00",
        location: "-3 этаж (напротив Spa)",
        image: SHOPS_ASSETS.noraSalon,
        tagline: "Где роскошь встречается с мастерством",
        description:
          "Стрижки, окрашивание, кератин, гелевый маникюр, спа-педикюр и свадебные образы под руководством ведущего стилиста госпожи Нуртан.",
        highlights: [
          "Стрижки и кератиновый уход",
          "Гелевый дизайн ногтей и педикюр",
          "Уход за лицом и косметология",
          "Свадебные и праздничные образы",
        ],
        contact: {
          phone: "+90 533 197 73 83",
          phoneLabel: "Позвонить г-же Нуртан",
          whatsapp: "+90 533 197 73 83",
          whatsappUrl: "https://wa.me/905331977383",
          whatsappLabel: "WhatsApp г-жа Нуртан",
        },
      },
      {
        id: "azur-shop",
        name: "Azur Leather & Travel Goods",
        category: "Кожаные сумки и багаж",
        hours: "09:30 – 23:00",
        location: "Главный пассаж",
        image: SHOPS_ASSETS.azurShopGift,
        tagline: "Элегантная турецкая кожа и багаж",
        description:
          "Сумки ручной работы из натуральной турецкой кожи, прочные чемоданы для путешествий, кошельки и ремни под управлением г-на Мурата с быстрой доставкой по всему миру.",
        highlights: [
          "Сумки из натуральной кожи",
          "Прочные дорожные чемоданы",
          "Экспресс-доставка по миру",
          "Скидки для гостей отеля",
        ],
        contact: {
          phone: "+90 536 477 48 19",
          phoneLabel: "Позвонить г-ну Мурату",
          whatsapp: "+90 536 477 48 19",
          whatsappUrl: "https://wa.me/905364774819",
          whatsappLabel: "WhatsApp г-н Мурат",
        },
        extraMedia: {
          secondImage: SHOPS_ASSETS.azurShopHandbag,
          secondImageCaption: "Коллекция кожаных сумок",
        },
      },
      {
        id: "azur-gift-boutique",
        name: "Azur Gift & Souvenir Boutique",
        category: "Сувениры и подарки",
        hours: "09:30 – 23:30",
        location: "Нижний этаж пассажа",
        image: SHOPS_ASSETS.azurGiftBoutique,
        tagline: "Аутентичные сувениры и сокровища Эгейского моря",
        description:
          "Традиционный турецкий рахат-лукум, керамика ручной работы, обереги от сглаза, органическое оливковое мыло и изысканные подарки.",
        highlights: [
          "Авторская керамика и обереги",
          "Свежий лукум и специи",
          "Натуральная косметика с оливковым маслом",
          "Бесплатная подарочная упаковка",
        ],
        contact: {
          phone: "+90 536 477 48 19",
          phoneLabel: "Позвонить г-ну Мурату",
          whatsapp: "+90 536 477 48 19",
          whatsappUrl: "https://wa.me/905364774819",
          whatsappLabel: "WhatsApp г-н Мурат",
        },
      },
      {
        id: "istanbul-textile",
        name: "Istanbul Textile & Resort Fashion",
        category: "Текстиль и пляжная мода",
        hours: "09:00 – 23:00",
        location: "Набережная отеля",
        image: SHOPS_ASSETS.istanbulTextile,
        tagline: "Органический хлопок и курортный стиль",
        description:
          "Полотенца-пештемали из 100% органического турецкого хлопка, легкие льняные платья, кафтаны, купальники и стильные летние шляпы.",
        highlights: [
          "100% турецкий органический хлопок",
          "Легкая льняная одежда",
          "Пляжные кафтаны и купальники",
          "Бесплатная подгонка по размеру",
        ],
        contact: {
          phone: "+90 536 676 17 11",
          phoneLabel: "Позвонить",
          whatsapp: "+90 536 676 17 11",
          whatsappUrl: "https://wa.me/905366761711",
          whatsappLabel: "WhatsApp команда текстиля",
        },
      },
      {
        id: "supermarket",
        name: "Orka Lotus Beach Market",
        category: "Супермаркет у пляжа",
        hours: "08:00 – 00:00",
        location: "Пляжная зона",
        image: SHOPS_ASSETS.supermarket,
        tagline: "Все необходимое в двух шагах от моря",
        description:
          "Охлажденные напитки, мороженое, солнцезащитные кремы с высоким SPF, надувные круги, маски для снорклинга и снеки прямо у набережной.",
        highlights: [
          "Напитки, мороженое и снеки",
          "Кремы до и после загара SPF",
          "Надувные матрасы и маски",
          "Работает ежедневно до полуночи",
        ],
        note: "Удобно расположен на набережной прямо возле пляжных шезлонгов.",
      },
    ],
  },

  de: {
    breadcrumbHome: "Startseite",
    breadcrumbShops: "Geschäfte & Boutiquen",
    heroEyebrow: "Resort-Einkaufspassage & Boutiquen",
    heroTitle: "Boutiquen, Feinschmuck & Marktplatz",
    heroSubtitle: "Kuratierter Luxus, Diamanten & Ägäische Eleganz",
    heroDesc:
      "Entdecken Sie alle 7 Geschäfte im Orka Lotus Beach Hotel: Von zertifiziertem Echtschmuck über türkisches Leder und ägäische Sommermode bis hin zum Strand-Supermarkt.",

    quickNavBadge: "ALLE GESCHÄFTE AUF EINEN BLICK",
    quickNavTitle: "Resort-Boutiquen & Einkaufspassage",
    quickNavSubtitle:
      "Klicken Sie auf ein Geschäft, um Öffnungszeiten, Standort, Details und direkten WhatsApp-Kontakt zu sehen.",
    jumpToShop: "Boutique ansehen",
    viewAllLabel: "7 Boutiquen vor Ort",
    openFullscreen: "Vollbild anzeigen",
    closeFullscreen: "Schließen",

    taxFreeTitle: "Global Blue Tax-Free Einkaufen",
    taxFreeDesc:
      "Sparen Sie bis zu 18% Mehrwertsteuer bei teilnehmenden Resort-Boutiquen. Bitten Sie beim Bezahlen mit Ihrem Reisepass um das offizielle Tax-Free-Formular.",
    taxFreeBadge: "Tax-Free verfügbar",

    elitePhotoshoot: {
      eyebrow: "LUXUS-FOTOSTUDIO & GESCHENK-BOUTIQUE · -3. ETAGE (NEBEN DEM HAUPTPOOL)",
      title: "ELITE PHOTOSHOOT STUDIO",
      subtitle: "Ihre Seele erfassend, Ihre Erinnerungen einrahmend",
      tagline: "Wo Kunstfertigkeit auf Exzellenz trifft · Teil der Orka Homes Familie",
      managementBadge: "Geleitet von den visionären Brüdern Hassan & Osman",
      location: "Orka Lotus Beach Hotel, -3. Etage (neben dem Hauptpool), Marmaris, Türkei",
      hours: "Täglich von 09:00 bis 23:00 Uhr",
      artistryTitle: "Wo Kunstfertigkeit auf Exzellenz trifft",
      artistryP1:
        "Eingebettet in die ruhige und stilvolle -3. Etage neben dem Hauptpool im renommierten Orka Lotus Beach Hotel ist das Elite Photoshoot Studio weit mehr als ein Fotografieservice – es ist ein unvergessliches künstlerisches Erlebnis.",
      artistryP2:
        "Unter der Leitung der visionären Brüder Hassan und Osman hat sich Elite Photoshoot zur ersten Adresse für Gäste entwickelt, die ihre Urlaubsmomente in zeitlose Kunstwerke verwandeln möchten. Mit Liebe zum Detail und Hingabe zur Perfektion definieren sie die Urlaubsfotografie neu.",
      artistsTitle: "Die Künstler hinter der Kamera: Hassan & Osman",
      artistsP1:
        "Hassan & Osman sind mehr als Fotografen; sie sind visuelle Geschichtenerzähler. Mit künstlerischem Feingefühl und herzlicher Professionalität schaffen sie eine Wohlfühlatmosphäre, in der sich jeder Gast strahlend und selbstbewusst fühlt.",
      artistsP2:
        "Ob lebhafte Kinder, verliebte Paare oder festliche Familienzusammenkünfte – jedes Shooting wird mit Geduld, Begeisterung und persönlicher Note gestaltet. Ihre erstklassige Reputation garantiert Bilder, die man ein Leben lang liebt.",
      techTitle: "Spitzentechnologie & Modernste Ausrüstung",
      techItems: [
        {
          title: "Erstklassige Profikameras",
          desc: "Modernste hochauflösende Vollformat-Kameragehäuse für gestochen scharfe Details und brillante Farbtiefe.",
        },
        {
          title: "Exklusive Objektiv-Kollektion",
          desc: "Spezialoptiken für intime Porträts mit traumhaftem Bokeh, weite Küstenlandschaften und dynamische Sonnenuntergänge.",
        },
        {
          title: "Modernste Studiobeleuchtung",
          desc: "Professionelle Lichtformer und Reflektoren für schmeichelhaftes Licht und stimmungsvolle Ägäis-Szenen.",
        },
        {
          title: "Kuratierte Resort-Kulissen",
          desc: "Exklusive Studiosets und malerische Hotelperspektiven, die das Luxusflair von Orka Lotus Beach widerspiegeln.",
        },
      ],
      servicesTitle: "Maßgeschneiderte Fotoshooting-Angebote",
      servicesSubtitle: "Vom Steg im Sonnenuntergang bis zur edlen Familienleinwand",
      servicesList: [
        {
          title: "Exklusive Porträtsitzungen",
          desc: "Individuelle Einzel-, Paar- und Familienporträts mit natürlicher Lichtstimmung.",
        },
        {
          title: "Lifestyle & Urlaubsmomente",
          desc: "Lebendige Momente am Pool, verträumte Spaziergänge auf den Holzstegen und Social-Media-Content.",
        },
        {
          title: "Besondere Feierlichkeiten",
          desc: "Geburtstage, Flitterwochen, Heiratsanträge und besondere Jubiläen.",
        },
        {
          title: "Leinwände in Galeriequalität & Goldrahmen",
          desc: "Museumstaugliche Leinwanddrucke, handgefertigte Goldrahmen und sofortige digitale Galeriebereitstellung.",
        },
      ],
      boutiqueTitle: "The Elite Gift Boutique",
      boutiqueDesc:
        "Direkt hinter unserem Hauptfotostudio bietet die Elite Gift Boutique eine erlesene Auswahl an feinem Schmuck, Designer-Sonnenbrillen und exquisiten Urlaubsandenken. Mit derselben Hingabe zu Luxus und Qualität gestaltet, ist die Boutique der perfekte Ort für ein besonderes Geschenk oder ein zeitloses Souvenir.",
      whyChooseTitle: "Warum Elite Photoshoot?",
      whyChooseItems: [
        {
          title: "Einzigartige Kunstfertigkeit",
          desc: "Hassan & Osmans kreative Handschrift macht jedes Porträt zu einem unverwechselbaren Kunstwerk.",
        },
        {
          title: "Professionelle Exzellenz",
          desc: "Modernste Ausrüstung gepaart mit präziser optischer und digitaler Bildbearbeitung.",
        },
        {
          title: "Herzliche Gastfreundschaft",
          desc: "Ihr Wohlbefinden, ein ungezwungenes Lächeln und echtes Urlaubsglück stehen im Mittelpunkt.",
        },
        {
          title: "Faire & Transparente Preise",
          desc: "Weltklasse-Resortfotografie und Rahmenpakete zu absolut fairen Konditionen.",
        },
        {
          title: "Zentrale Bestlage",
          desc: "Auf der -3. Etage direkt am Hauptpool, nur wenige Schritte von Ihrer Sonnenliege entfernt.",
        },
        {
          title: "Rundum-Luxuserlebnis",
          desc: "Kombinieren Sie Ihr Fotoshooting mit dem Einkauf von Echtschmuck und Designer-Sonnenbrillen.",
        },
      ],
      quoteText: "Ihr Moment, unser Meisterwerk.",
      quoteAuthor: "Erleben Sie den Elite-Unterschied: Wo jeder Klick eine Geschichte erzählt und jedes Foto ein Kunstwerk ist.",
      contactsTitle: "Kontaktieren & Fotoshooting reservieren",
      contactsSubtitle: "Direkter Anruf, WhatsApp-Beratung und offizielles Instagram",
      callPhone1Label: "Hassan & Osman anrufen (+90 533 034 63 48)",
      callPhone2Label: "Studio anrufen (+90 506 059 85 12)",
      whatsapp1Label: "WhatsApp (+90 533 034 63 48)",
      whatsapp2Label: "WhatsApp (+90 506 059 85 12)",
      instagramBtnLabel: "@elite.photoshop_ auf Instagram folgen",
      instagramQrLabel: "Direkter Instagram-QR-Code",
      instagramQrPrompt: "Scannen oder tippen Sie hier, um unser Live-Kundenportfolio und Stories anzusehen",
      videoLabel: "Filmreife Urlaubserinnerungen & Hochgeschwindigkeits-Porträts",
      galleryLabel: "Elite Photoshoot Studio Meistergalerie",
    },

    shops: [
      {
        id: "aksoy-jewelry",
        name: "Aksoy Jewelry & Diamonds",
        category: "Edelschmuck & Diamanten",
        hours: "10:00 – 23:30",
        location: "Lobby-Passage",
        image: SHOPS_ASSETS.aksoyHeader,
        tagline: "Schmuckstücke für Ihre ganz persönliche Geschichte",
        description:
          "GIA-zertifizierte Diamant-Solitäre, 14K & 18K Feingold aus der Ägäis und Maßanfertigungen unter Leitung von Herrn Rashid Aksoy und Herrn Fatih Taşpınar mit weltweiter Garantie.",
        highlights: [
          "GIA & HRD zertifizierte Diamanten",
          "14K & 18K Feingold-Kollektionen",
          "Individuelles Atelier & Größenanpassung",
          "Weltweites Zertifikat & Garantie",
        ],
        contact: {
          whatsapp: "+90 532 433 13 87",
          whatsappUrl: "https://wa.me/905324331387",
          whatsappLabel: "WhatsApp Herr Rashid Aksoy",
          whatsapp2: "+90 532 749 03 07",
          whatsapp2Url: "https://wa.me/905327490307",
          whatsapp2Label: "WhatsApp Herr Fatih Taşpınar",
          websiteUrl: "https://aksoyjewels-1.vercel.app/",
          websiteLabel: "Offizielle Website",
        },
        extraMedia: {
          videos: [
            {
              url: SHOPS_ASSETS.aksoyVideoRing,
              title: "Verwandlung des Diamantrings",
            },
            {
              url: SHOPS_ASSETS.aksoyVideoHaute,
              title: "Haute Joaillerie Atelier",
            },
          ],
          logo: SHOPS_ASSETS.aksoyLogo,
        },
      },
      {
        id: "elite-photoshoot",
        name: "Elite Photoshoot Studio",
        category: "Luxus-Fotografie & Boutique",
        hours: "09:00 – 23:00",
        location: "-3. Etage (neben dem Hauptpool)",
        image: SHOPS_ASSETS.eliteCover,
        tagline: "Ihre Seele erfassend, Ihre Erinnerungen einrahmend",
        description:
          "Wo Kunstfertigkeit auf Exzellenz trifft. Verwandeln Sie Ihre Urlaubsmomente neben dem Hauptpool in zeitlose Kunstwerke unter der Leitung der Brüder Hassan und Osman.",
        highlights: [
          "Visionäre Fotografen Hassan & Osman",
          "Erstklassige professionelle Kameras & Objektive",
          "Fotoshootings am Sonnenuntergangs-Steg & Pool",
          "Kuratierte Elite-Geschenkboutique vor Ort",
        ],
        contact: {
          phone: "+90 533 034 63 48",
          phoneLabel: "Anrufen (+90 533 034 63 48)",
          phone2: "+90 506 059 85 12",
          phone2Label: "Anrufen (+90 506 059 85 12)",
          whatsapp: "+90 533 034 63 48",
          whatsappUrl: "https://wa.me/905330346348",
          whatsappLabel: "WhatsApp (+90 533 034 63 48)",
          whatsapp2: "+90 506 059 85 12",
          whatsapp2Url: "https://wa.me/905060598512",
          whatsapp2Label: "WhatsApp (+90 506 059 85 12)",
          instagramUrl: "https://www.instagram.com/elite.photoshop_",
          instagramLabel: "@elite.photoshop_",
        },
        extraMedia: {
          secondImage: SHOPS_ASSETS.eliteImageShowcase,
          secondImageCaption: "Elite Photoshoot Meistergalerie",
          videos: [
            {
              url: SHOPS_ASSETS.eliteVideo,
              title: "Cinematische Porträt-Verwandlung",
            },
          ],
        },
      },
      {
        id: "nora-salon",
        name: "Nora Hair & Beauty Salon",
        category: "Haar- & Schönheitssalon",
        hours: "09:00 – 20:00",
        location: "-3. Etage (vor dem Spa)",
        image: SHOPS_ASSETS.noraSalon,
        tagline: "Wo Luxus auf Expertise trifft",
        description:
          "Präzisions-Haarschnitte, Keratin-Behandlungen, Gel-Nageldesign, Spa-Pediküre und VIP-Brautstyling unter Leitung von Salonchefin Frau Nurtan.",
        highlights: [
          "Präzisionsschnitte & Keratin-Therapie",
          "Gel-Nagelkunst & Spa-Pediküre",
          "Hautverjüngung & Augenbrauen-Styling",
          "VIP-Braut- & Festtagspakete",
        ],
        contact: {
          phone: "+90 533 197 73 83",
          phoneLabel: "Frau Nurtan anrufen",
          whatsapp: "+90 533 197 73 83",
          whatsappUrl: "https://wa.me/905331977383",
          whatsappLabel: "WhatsApp Frau Nurtan",
        },
      },
      {
        id: "azur-shop",
        name: "Azur Leather & Travel Goods",
        category: "Feines Leder & Reisegepäck",
        hours: "09:30 – 23:00",
        location: "Haupteinkaufspassage",
        image: SHOPS_ASSETS.azurShopGift,
        tagline: "Handgefertigtes türkisches Leder & Reiseeleganz",
        description:
          "Handgefertigte Taschen aus echtem türkischem Leder, ultraleichte Reisekoffer, Geldbörsen und Gürtel unter Leitung von Herrn Murat mit weltweitem Expressversand.",
        highlights: [
          "100% handgefertigtes echtes türkisches Leder",
          "Langlebiges ultraleichtes Reisegepäck",
          "Weltweiter Expressversand bis an Ihre Haustür",
          "Exklusive Sonderkonditionen für Hotelgäste",
        ],
        contact: {
          phone: "+90 536 477 48 19",
          phoneLabel: "Herrn Murat anrufen",
          whatsapp: "+90 536 477 48 19",
          whatsappUrl: "https://wa.me/905364774819",
          whatsappLabel: "WhatsApp Herr Murat",
        },
        extraMedia: {
          secondImage: SHOPS_ASSETS.azurShopHandbag,
          secondImageCaption: "Premium Leder-Handtaschenkollektion",
        },
      },
      {
        id: "azur-gift-boutique",
        name: "Azur Gift & Souvenir Boutique",
        category: "Geschenke & Souvenirs",
        hours: "09:30 – 23:30",
        location: "Passage Erdgeschoss",
        image: SHOPS_ASSETS.azurGiftBoutique,
        tagline: "Authentische Erinnerungen & Ägäische Schätze",
        description:
          "Kuratierte türkische Spezialitäten, Gourmet-Lokum, handgefertigte Keramik, Nazar-Schutzamulette und Bio-Olivenölkosmetik von Herrn Murat.",
        highlights: [
          "Kunstvolle Keramik & Nazar-Glücksbringer",
          "Feinstes türkisches Lokum & Gewürze",
          "Natürliche Olivenöl-Pflegeprodukte",
          "Kostenlose Geschenkverpackung",
        ],
        contact: {
          phone: "+90 536 477 48 19",
          phoneLabel: "Herrn Murat anrufen",
          whatsapp: "+90 536 477 48 19",
          whatsappUrl: "https://wa.me/905364774819",
          whatsappLabel: "WhatsApp Herr Murat",
        },
      },
      {
        id: "istanbul-textile",
        name: "Istanbul Textile & Resort Fashion",
        category: "Textilien & Sommermode",
        hours: "09:00 – 23:00",
        location: "Strandpromenade",
        image: SHOPS_ASSETS.istanbulTextile,
        tagline: "Bio-Baumwolle aus der Ägäis & Urlaubsschick",
        description:
          "Peshtemal-Tücher aus 100% türkischer Bio-Baumwolle, atmungsaktive Leinenkleider, Bademode, Strandkaftane und Sonnenschutzbekleidung.",
        highlights: [
          "100% türkische Bio-Baumwolle",
          "Atmungsaktive Leinenhemden & Kleider",
          "Designer-Kaftane & Bademode",
          "Kostenlose Maßanpassung vor Ort",
        ],
        contact: {
          phone: "+90 536 676 17 11",
          phoneLabel: "Direkt anrufen",
          whatsapp: "+90 536 676 17 11",
          whatsappUrl: "https://wa.me/905366761711",
          whatsappLabel: "WhatsApp Textil-Team",
        },
      },
      {
        id: "supermarket",
        name: "Orka Lotus Beach Market",
        category: "Strand-Supermarkt & Essentials",
        hours: "08:00 – 00:00",
        location: "Buchtbereich (Strand)",
        image: SHOPS_ASSETS.supermarket,
        tagline: "Alles für Ihren Strandtag nur wenige Schritte entfernt",
        description:
          "Gekühlte Erfrischungsgetränke, Eiscreme, Sonnencremes mit hohem LSF, Schwimmreifen, Schnorchelsets und Knabbereien direkt an der Strandpromenade.",
        highlights: [
          "Gekühlte Getränke, Eiscreme & Snacks",
          "LSF Sonnenpflege & After-Sun",
          "Schwimmringe, Luftmatratzen & Schnorchel",
          "Täglich bis Mitternacht geöffnet",
        ],
        note: "Bequem an der Strandpromenade gelegen – nur wenige Schritte von Ihrer Sonnenliege entfernt.",
      },
    ],
  },
};
