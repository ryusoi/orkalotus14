import type { Locale } from "@/data/content";

export interface DepartmentCategory {
  id: string;
  name: Record<Locale, string>;
  icon: string;
}

export interface ManagementPersonnelRole {
  id: number;
  icon: string;
  category: string;
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  description: Record<Locale, string>;
  responsibilities?: Record<Locale, string[]>;
  standards?: Record<Locale, string[]>;
}

export interface ManagementPersonnelPageData {
  hero: {
    eyebrow: Record<Locale, string>;
    title: Record<Locale, string>;
    subtitle: Record<Locale, string>;
    description: Record<Locale, string>;
  };
  intro: {
    heading: Record<Locale, string>;
    p1: Record<Locale, string>;
    p2: Record<Locale, string>;
    p3: Record<Locale, string>;
    stats: {
      number: string;
      label: Record<Locale, string>;
    }[];
  };
  filterAllLabel: Record<Locale, string>;
  searchPlaceholder: Record<Locale, string>;
  noResults: Record<Locale, string>;
  philosophy: {
    badge: Record<Locale, string>;
    title: Record<Locale, string>;
    subtitle: Record<Locale, string>;
    lead: Record<Locale, string>;
    teamQuote: Record<Locale, string>;
    steps: { role: Record<Locale, string>; duty: Record<Locale, string> }[];
    heartText: Record<Locale, string>;
    pillarsTitle: Record<Locale, string>;
    pillars: string[];
    manifesto: Record<Locale, string[]>;
    hotelTagline: Record<Locale, string>;
  };
  categories: DepartmentCategory[];
  roles: ManagementPersonnelRole[];
}

export const MANAGEMENT_PERSONNEL_DATA: ManagementPersonnelPageData = {
  hero: {
  "eyebrow": {
    "en": "ORKA LOTUS BEACH HOTEL · 5-STAR ULTRA ALL INCLUSIVE",
    "tr": "ORKA LOTUS BEACH HOTEL · 5 YILDIZLI ULTRA HER ŞEY DAHİL",
    "ru": "ORKA LOTUS BEACH HOTEL · 5 ЗВЕЗД УЛЬТРА ВСЕ ВКЛЮЧЕНО",
    "de": "ORKA LOTUS BEACH HOTEL · 5-STERNE ULTRA ALL INCLUSIVE"
  },
  "title": {
    "en": "Management & Personnel Directory",
    "tr": "Yönetim ve Personel Rehberi",
    "ru": "Руководство и реестр персонала",
    "de": "Direktion & Mitarbeiterverzeichnis"
  },
  "subtitle": {
    "en": "A Distinguished Team Dedicated to Exceptional Hospitality",
    "tr": "Kusursuz Misafirperverliğe Adanmış Seçkin Bir Ekip",
    "ru": "Выдающаяся команда, преданная совершенству сервиса",
    "de": "Ein herausragendes Team für erstklassige Gastfreundschaft"
  },
  "description": {
    "en": "At Orka Lotus Beach Hotel, every department contributes to one common purpose: delivering an exceptional standard of hospitality where comfort, professionalism, safety, elegance and genuine Turkish hospitality unite.",
    "tr": "Orka Lotus Beach Hotel'de her departman tek bir ortak amaca hizmet eder: Konfor, profesyonellik, güvenlik, zarafet ve kalpten gelen Türk misafirperverliğini bir araya getiren olağanüstü bir hizmet seviyesi sunmak.",
    "ru": "В Orka Lotus Beach Hotel каждое подразделение работает ради единой цели: предоставления сервиса высшего уровня, в котором гармонично сочетаются комфорт, профессионализм, безопасность и искреннее турецкое радушие.",
    "de": "Im Orka Lotus Beach Hotel dient jeder Bereich einem gemeinsamen Ziel: einem außergewöhnlichen Standard an Gastfreundschaft, bei dem Komfort, Professionalität, Sicherheit, Eleganz und herzliche türkische Gastlichkeit verschmelzen."
  }
},
  intro: {
  "heading": {
    "en": "The Pillars of Our Five-Star Seaside Resort",
    "tr": "Beş Yıldızlı Sahil Resortumuzun Temel Taşları",
    "ru": "Основы нашего пятизвездочного приморского курорта",
    "de": "Die Säulen unseres Fünf-Sterne-Resorts am Meer"
  },
  "p1": {
    "en": "At Orka Lotus Beach Hotel, every department contributes to one common purpose: delivering an exceptional standard of hospitality in which comfort, professionalism, safety, elegance and genuine Turkish hospitality come together.",
    "tr": "Orka Lotus Beach Hotel'de her bir departman aynı yüce hedefe adanmıştır: Konforun, yüksek profesyonelliğin, güvenliğin, estetiğin ve samimi Türk konukseverliğinin kusursuzca harmanlandığı benzersiz bir tatil tecrübesi yaşatmak.",
    "ru": "В отеле Orka Lotus Beach каждое подразделение вносит вклад в единую миссию: создание исключительной атмосферы пятизвездочного отдыха, где сливаются воедино комфорт, профессионализм, безопасность и душевное гостеприимство.",
    "de": "Im Orka Lotus Beach Hotel leistet jede Abteilung ihren Beitrag zu einem gemeinsamen Ziel: einem herausragenden Standard an Gastfreundschaft, in dem Komfort, Professionalität, Sicherheit, Eleganz und echte Herzlichkeit eins werden."
  },
  "p2": {
    "en": "As a five-star, ultra-all-inclusive seaside resort, Orka Lotus Beach operates through a highly coordinated structure of experienced management, specialized department leaders, supervisors and professionally trained guest-service personnel. The hotel's location directly beside the Aegean Sea, extensive beach facilities, accommodation, restaurants, bars, pools, room service and leisure services require close cooperation between every operational department.",
    "tr": "5 yıldızlı ultra her şey dahil bir kıyı resortu olan Orka Lotus Beach; deneyimli genel yönetim, uzman departman müdürleri, şefler ve profesyonelce eğitilmiş servis personelinden oluşan kusursuz bir organizasyon yapısıyla yönetilir. Ege Denizi'nin kıyısındaki eşsiz konumu, 650 metrelik plajı, odaları, restoranları, barları, havuzları ve aktivite alanları tüm operasyonel birimlerin yüksek koordinasyonunu gerektirir.",
    "ru": "Являясь пятизвездочным курортом формата «ультра все включено», Orka Lotus Beach функционирует благодаря слаженной структуре опытного менеджмента, руководителей профильных служб, супервайзеров и обученного персонала. Расположение прямо на берегу Эгейского моря, обширный пляж, рестораны, бары и бассейны требуют безупречной синхронизации всех служб.",
    "de": "Als Fünf-Sterne-Ultra-All-Inclusive-Resort arbeitet das Orka Lotus Beach mit einer eingespielten Führungsstruktur aus erfahrener Direktion, spezialisierten Abteilungsleitern und erstklassig geschultem Servicepersonal direkt am Ägäischen Meer."
  },
  "p3": {
    "en": "Our personnel are expected to demonstrate courtesy, discretion, efficiency, cultural awareness, professional appearance and an unwavering commitment to guest satisfaction.",
    "tr": "Personelimizin nezaket, yüksek mahremiyet ve ketumiyet, verimlilik, kültürlerarası duyarlılık, kusursuz mesleki görünüm ve misafir memnuniyetine sarsılmaz bir bağlılık sergilemesi esastır.",
    "ru": "От нашего персонала неизменно ожидаются вежливость, деликатность, эффективность, знание культурных традиций гостей, презентабельный внешний вид и абсолютная приверженность их счастью.",
    "de": "Von unseren Mitarbeitern erwarten wir Höflichkeit, Diskretion, Effizienz, interkulturelle Kompetenz, ein gepflegtes Auftreten und kompromisslose Hingabe an das Wohl unserer Gäste."
  },
  "stats": [
    {
      "number": "49",
      "label": {
        "en": "Operational Divisions & Leadership Roles",
        "tr": "Operasyonel Bölüm ve Yönetim Rolü",
        "ru": "Операционных отделов и ключевых ролей",
        "de": "Operative Bereiche & Führungspositionen"
      }
    },
    {
      "number": "350+",
      "label": {
        "en": "Trained Hospitality Professionals",
        "tr": "Eğitimli Profesyonel Otel Çalışanı",
        "ru": "Квалифицированных специалистов сервиса",
        "de": "Ausgebildete Gastgewerbe-Experten"
      }
    },
    {
      "number": "24/7",
      "label": {
        "en": "Executive & Concierge Operational Coverage",
        "tr": "Kesintisiz Yönetim ve Konsiyerj Hizmeti",
        "ru": "Круглосуточный контроль и консьерж-сервис",
        "de": "Rund-um-die-Uhr Direktionspräsenz"
      }
    },
    {
      "number": "5★",
      "label": {
        "en": "Ultra All-Inclusive Aegean Excellence",
        "tr": "Ege'de 5 Yıldızlı Ultra Her Şey Dahil Zarafet",
        "ru": "Пятизвездочный ультра все включено на Эгейском море",
        "de": "Fünf-Sterne Ultra All-Inclusive Exzellenz"
      }
    }
  ]
},
  filterAllLabel: {
  "en": "All Roles",
  "tr": "Tüm Görevler",
  "ru": "Все роли",
  "de": "Alle Rollen"
},
  searchPlaceholder: {
  "en": "Search by title, role or keywords (e.g., General Manager, Chef, Security, Medical)...",
  "tr": "Görev, unvan veya kelimeye göre arayın (örn. Genel Müdür, Şef, Güvenlik, Sağlık)...",
  "ru": "Поиск по названию или ключевым словам (напр. Шеф-повар, Безопасность, Врач)...",
  "de": "Suche nach Position oder Begriff (z. B. General Manager, Chefkoch, Sicherheit)..."
},
  noResults: {
  "en": "No positions match your search criteria. Please try another term.",
  "tr": "Arama kriterinize uygun pozisyon bulunamadı. Lütfen farklı bir terim deneyin.",
  "ru": "По вашему запросу ничего не найдено. Попробуйте другой поисковый запрос.",
  "de": "Keine Positionen entsprechen Ihren Suchkriterien. Bitte versuchen Sie einen anderen Begriff."
},
  philosophy: {
  "badge": {
    "en": "OUR GUIDING CREED",
    "tr": "REHBER İLKEMİZ",
    "ru": "НАШЕ РУКОВОДЯЩЕЕ КРЕДО",
    "de": "UNSER LEITBILD"
  },
  "title": {
    "en": "OUR SERVICE PHILOSOPHY",
    "tr": "HİZMET FELSEFEMİZ",
    "ru": "ФИЛОСОФИЯ НАШЕГО СЕРВИСА",
    "de": "UNSERE SERVICEPHILOSOPHIE"
  },
  "subtitle": {
    "en": "One Hotel. One Team. One Exceptional Guest Experience.",
    "tr": "Tek Bir Otel. Tek Bir Ekip. Benzersiz Bir Misafir Deneyimi.",
    "ru": "Один отель. Одна команда. Одно исключительное впечатление гостя.",
    "de": "Ein Hotel. Ein Team. Ein außergewöhnliches Gästeerlebnis."
  },
  "lead": {
    "en": "The strength of Orka Lotus Beach Hotel lies not only in its location, architecture, facilities or natural surroundings, but in the people who bring the hotel to life. A truly exceptional resort requires every department to work together as one professional team.",
    "tr": "Orka Lotus Beach Hotel'in gerçek gücü yalnızca eşsiz konumunda, mimarisinde, görkemli tesislerinde veya doğasında değil; otele hayat veren değerli insan kaynağındadır. Gerçekten olağanüstü bir tatil köyü, tüm departmanların tek bir profesyonel aile gibi kenetlenmesini gerektirir.",
    "ru": "Сила Orka Lotus Beach Hotel заключается не только в расположении, архитектуре и живописной природе, но прежде всего в людях, которые наполняют отель жизнью. По-настоящему выдающийся курорт требует слаженной работы каждого подразделения как единого целого.",
    "de": "Die wahre Stärke des Orka Lotus Beach Hotels liegt nicht nur in seiner Lage, Architektur und Natur, sondern in den Menschen, die das Hotel mit Leben füllen. Ein herausragendes Resort erfordert das harmonische Zusammenspiel aller Abteilungen als ein geschlossenes Team."
  },
  "teamQuote": {
    "en": "A seamless chain of excellence uniting leadership, operational standards and heartfelt care.",
    "tr": "Liderliği, operasyonel standartları ve kalpten gelen ilgiyi birleştiren kusursuz bir mükemmellik zinciri.",
    "ru": "Неразрывная цепь совершенства, объединяющая стратегию, стандарты и искреннюю заботу.",
    "de": "Eine nahtlose Kette der Exzellenz, die Führung, operative Standards und herzliche Zuwendung vereint."
  },
  "steps": [
    {
      "role": {
        "en": "The General Manager",
        "tr": "Genel Müdür",
        "ru": "Генеральный директор",
        "de": "Der General Manager"
      },
      "duty": {
        "en": "Establishes the vision and inspires supreme standards of hospitality.",
        "tr": "Vizyonu belirler ve en üst düzey misafirperverlik standartlarına ilham verir.",
        "ru": "Определяет стратегическое видение и вдохновляет на высшие стандарты гостеприимства.",
        "de": "Setzt die Vision und inspiriert zu höchsten Maßstäben der Gastlichkeit."
      }
    },
    {
      "role": {
        "en": "Department Managers",
        "tr": "Departman Müdürleri",
        "ru": "Руководители служб",
        "de": "Die Abteilungsleiter"
      },
      "duty": {
        "en": "Transform that vision into actionable operational standards.",
        "tr": "Bu vizyonu somut ve ölçülebilir operasyonel standartlara dönüştürür.",
        "ru": "Воплощают это видение в безупречные операционные стандарты.",
        "de": "Verwandeln diese Vision in greifbare operative Standards."
      }
    },
    {
      "role": {
        "en": "Supervisors & Chefs",
        "tr": "Şefler ve Denetçiler",
        "ru": "Супервайзеры и старшие смен",
        "de": "Supervisoren & Schichtleiter"
      },
      "duty": {
        "en": "Ensure those standards are meticulously maintained day and night.",
        "tr": "Standartların gece ve gündüz tavizsiz şekilde korunmasını temin eder.",
        "ru": "Гарантируют неукоснительное соблюдение стандартов день и ночь.",
        "de": "Sichern die akribische Einhaltung dieser Standards Tag und Nacht."
      }
    },
    {
      "role": {
        "en": "Front-Line Personnel",
        "tr": "Ön Hat Hizmet Personeli",
        "ru": "Сотрудники первого контакта",
        "de": "Das Servicepersonal"
      },
      "duty": {
        "en": "Turn those standards into genuine, warm human hospitality.",
        "tr": "Standartları kalpten gelen samimi bir insan dokunuşuna ve sevgiye çevirir.",
        "ru": "Превращают стандарты в живое, искреннее человеческое тепло и заботу.",
        "de": "Erweckt diese Standards zu echter, herzlicher menschlicher Wärme."
      }
    }
  ],
  "heartText": {
    "en": "Behind every room prepared to perfection, every meal served with care, every technical issue resolved promptly, every guest welcomed warmly and every request handled professionally is a dedicated member of the Orka Lotus Beach team.",
    "tr": "Kusursuzca hazırlanan her odanın, sevgiyle sunulan her lezzetin, anında çözülen her teknik detayın, içtenlikle karşılanan her konuğun ve titizlikle yanıtlanan her dileğin arkasında Orka Lotus Beach ailesinin fedakar bir üyesi vardır.",
    "ru": "За каждым безупречно убранным номером, с душой поданным блюдом, оперативно решенным вопросом и теплой улыбкой при встрече стоит преданный своему делу сотрудник Orka Lotus Beach.",
    "de": "Hinter jedem makellos vorbereiteten Zimmer, jeder mit Liebe servierten Mahlzeit, jeder schnellen Lösung und jedem warmen Lächeln steht ein engagiertes Mitglied des Orka Lotus Beach Teams."
  },
  "pillarsTitle": {
    "en": "FOUR SACRED PILLARS OF OUR HOSPITALITY",
    "tr": "MİSAFİRPERVERLİĞİMİZİN DÖRT KUTSAL TEMEL TAŞI",
    "ru": "ЧЕТЫРЕ ГЛАВНЫХ СТОЛПА НАШЕГО СЕРВИСА",
    "de": "DIE VIER SÄULEN UNSERER GASTFREUNDSCHAFT"
  },
  "pillars": [
    "PROFESSIONALISM",
    "COURTESY",
    "DISCRETION",
    "EXCELLENCE"
  ],
  "manifesto": {
    "en": [
      "Every guest deserves to feel welcomed as an honored family member.",
      "Every request deserves to be heard with sincere empathy and swift action.",
      "Every detail deserves meticulous attention, from the shoreline to the pillow.",
      "Every member of the team holds a personal responsibility to protect the prestige of the hotel.",
      "And every stay should leave the guest with the lasting feeling that they have been genuinely cared for."
    ],
    "tr": [
      "Her misafirimiz, ailemizin en değerli ve onurlandırılmış bir ferdi gibi karşılanmayı hak eder.",
      "Her talep, içten bir empati ve süratli bir çözümle dinlenmeyi hak eder.",
      "Sahilden yastık detayına kadar her ayrıntı, eksiksiz bir titizliği hak eder.",
      "Ekibimizin her bir ferdi, otelimizin asil itibarını koruma konusunda şahsi bir sorumluluk taşır.",
      "Ve yaşanan her tatil, misafirlerimizde kalpten önemsendikleri ve sevildikleri hissini baki kılmalıdır."
    ],
    "ru": [
      "Каждый гость заслуживает самого теплого приема как долгожданный и почетный член семьи.",
      "Каждая просьба заслуживает чуткого внимания и незамедлительного решения.",
      "Каждая деталь — от шезлонга у моря до подушки в номере — требует исключительного внимания.",
      "Каждый член команды несет личную ответственность за безупречную репутацию отеля.",
      "И каждый проведенный здесь день должен дарить гостю чувство неподдельной заботы и душевного тепла."
    ],
    "de": [
      "Jeder Gast verdient es, wie ein geschätztes Familienmitglied empfangen zu werden.",
      "Jedes Anliegen verdient aufmerksames Gehör und unverzügliches Handeln.",
      "Jedes Detail, vom Strand bis zum Kissen, verlangt vollkommene Sorgfalt.",
      "Jedes Teammitglied trägt persönliche Verantwortung für das Renommee des Hauses.",
      "Und jeder Aufenthalt soll dem Gast das bleibende Gefühl echter, aufrichtiger Fürsorge schenken."
    ]
  },
  "hotelTagline": {
    "en": "Where Luxury, Nature and the Sea Connect — and Where Exceptional People Create Exceptional Hospitality.",
    "tr": "Lüksün, Doğanın ve Denizin Buluştuğu Yerde — Seçkin İnsanların Yarattığı Kusursuz Misafirperverlik.",
    "ru": "Там, где соединяются роскошь, природа и море — и где выдающиеся люди создают непревзойденное гостеприимство.",
    "de": "Wo Luxus, Natur und das Meer verschmelzen – und wo außergewöhnliche Menschen außergewöhnliche Gastfreundschaft schaffen."
  }
},
  categories: [
  {
    "id": "all",
    "icon": "Sparkles",
    "name": {
      "en": "All 49 Positions",
      "tr": "Tüm 49 Görev",
      "ru": "Все 49 должностей",
      "de": "Alle 49 Positionen"
    }
  },
  {
    "id": "executive",
    "icon": "Award",
    "name": {
      "en": "Executive Leadership",
      "tr": "Üst Düzey Yönetim",
      "ru": "Высшее руководство",
      "de": "Geschäftsleitung"
    }
  },
  {
    "id": "rooms_front",
    "icon": "Hotel",
    "name": {
      "en": "Rooms & Front Office",
      "tr": "Ön Büro & Odalar",
      "ru": "Прием и размещение",
      "de": "Logis & Rezeption"
    }
  },
  {
    "id": "culinary_fb",
    "icon": "UtensilsCrossed",
    "name": {
      "en": "Culinary, F&B & Bars",
      "tr": "Mutfak, Restoran & Barlar",
      "ru": "Рестораны и кулинария",
      "de": "Gastronomie & Kulinarik"
    }
  },
  {
    "id": "housekeeping",
    "icon": "Sparkles",
    "name": {
      "en": "Housekeeping & Linen",
      "tr": "Kat Hizmetleri & Çamaşırhane",
      "ru": "Хаускипинг и чистота",
      "de": "Housekeeping & Wäsche"
    }
  },
  {
    "id": "engineering_it",
    "icon": "Wrench",
    "name": {
      "en": "Engineering & IT",
      "tr": "Teknik Servis & Bilişim",
      "ru": "Инженерия и ИТ",
      "de": "Technik & IT"
    }
  },
  {
    "id": "safety_security",
    "icon": "Shield",
    "name": {
      "en": "Security, Health & Safety",
      "tr": "Güvenlik & Sağlık",
      "ru": "Безопасность и здоровье",
      "de": "Sicherheit & Gesundheit"
    }
  },
  {
    "id": "wellness_recreation",
    "icon": "Flower2",
    "name": {
      "en": "Spa, Beach & Recreation",
      "tr": "Spa, Sahil & Animasyon",
      "ru": "Спа, пляж и досуг",
      "de": "Spa, Strand & Freizeit"
    }
  },
  {
    "id": "commercial_hr",
    "icon": "Users",
    "name": {
      "en": "HR, Finance & Commercial",
      "tr": "İK, Finans & Ticari Birimler",
      "ru": "Кадры, финансы и продажи",
      "de": "HR, Finanzen & Vertrieb"
    }
  }
],
  roles: [
  {
    "id": 1,
    "icon": "Award",
    "category": "executive",
    "title": {
      "en": "GENERAL MANAGER",
      "tr": "GENEL MÜDÜR",
      "ru": "ГЕНЕРАЛЬНЫЙ ДИРЕКТОР",
      "de": "GENERAL MANAGER"
    },
    "subtitle": {
      "en": "Chief Executive of Hotel Operations",
      "tr": "Otel Operasyonlarının En Üst Düzey Yöneticisi",
      "ru": "Главный исполнительный руководитель отельных операций",
      "de": "Leitender Direktor für Hoteloperationen"
    },
    "description": {
      "en": "The General Manager provides the overall leadership, direction and strategic vision of Orka Lotus Beach Hotel. Highly experienced in comprehensive hotel management, the General Manager carries overall responsibility for the successful operation of the property, coordinating executive leadership and ensuring that every department operates in harmony with the hotel's standards, commercial objectives and commitment to guest satisfaction. Oversees accommodation, guest services, food and beverage, housekeeping, engineering, security, human resources, finance, sales and marketing, quality management and all supporting functions while maintaining close communication with ownership and strategic stakeholders.",
      "tr": "Genel Müdür, Orka Lotus Beach Hotel'in genel liderliğini, yönetsel vizyonunu ve stratejik hedeflerini belirler. Kapsamlı otel yönetiminde üst düzey deneyime sahip olan Genel Müdür; tüm operasyonun başarısından, icra liderliğinin koordinasyonundan ve her bir departmanın otel standartları, ticari hedefler ve kusursuz misafir memnuniyeti ile tam uyum içinde çalışmasından sorumludur. Konaklama, yiyecek & içecek, kat hizmetleri, teknik servis, güvenlik, insan kaynakları, finans, satış-pazarlama ve kalite yönetimini denetler.",
      "ru": "Генеральный директор осуществляет стратегическое руководство и формирует видение Orka Lotus Beach Hotel. Обладая высочайшим опытом управления курортами мирового уровня, он несет полную ответственность за безупречную работу отеля, координирует руководство всеми подразделениями и обеспечивает соответствие высочайшим стандартам пятизвездочного сервиса. Контролирует размещение, службу питания, службу горничных, инженерные системы, безопасность, кадры, финансы и маркетинг.",
      "de": "Der General Manager leitet das Orka Lotus Beach Hotel strategisch und operativ. Mit umfassender Expertise in der Luxushotellerie trägt er die Gesamtverantwortung für den erfolgreichen Betrieb der Anlage, koordiniert alle Abteilungsleiter und stellt sicher, dass jeder Bereich im Einklang mit den Fünf-Sterne-Standards, wirtschaftlichen Zielen und höchster Gästezufriedenheit agiert."
    },
    "responsibilities": {
      "en": [
        "Overall hotel leadership and operational performance",
        "Strategic planning and implementation",
        "Financial and commercial oversight",
        "Guest satisfaction and service excellence",
        "Executive leadership and departmental coordination",
        "Staff development and professional standards",
        "Quality assurance and hotel reputation",
        "Health, safety and security oversight",
        "Compliance with applicable regulations and hotel policies",
        "Crisis and emergency leadership",
        "Continuous improvement of the guest experience"
      ],
      "tr": [
        "Genel otel liderliği ve operasyonel performans",
        "Stratejik planlama ve uygulama",
        "Finansal ve ticari denetim",
        "Misafir memnuniyeti ve hizmet mükemmelliği",
        "Yönetim kurulu liderliği ve departmanlar arası koordinasyon",
        "Personel gelişimi ve profesyonel standartlar",
        "Kalite güvencesi ve otel prestiji",
        "Sağlık, emniyet ve güvenlik denetimi",
        "Yasal mevzuat ve otel politikalarına tam uyum",
        "Kriz ve acil durum yönetimi",
        "Misafir deneyiminin sürekli geliştirilmesi"
      ],
      "ru": [
        "Общее руководство отелем и операционная эффективность",
        "Стратегическое планирование и внедрение стандартов",
        "Финансовый и коммерческий контроль",
        "Удовлетворенность гостей и превосходство сервиса",
        "Координация работы руководителей отделов",
        "Развитие персонала и соблюдение профессиональной этики",
        "Контроль качества и защита репутации бренда",
        "Обеспечение норм охраны здоровья и безопасности",
        "Соблюдение законодательных норм и регламентов",
        "Лидерство в кризисных и нештатных ситуациях",
        "Непрерывное совершенствование впечатлений гостей"
      ],
      "de": [
        "Gesamthotelführung und operative Spitzenleistung",
        "Strategische Planung und Qualitätsumsetzung",
        "Finanzielle und kommerzielle Aufsicht",
        "Gästezufriedenheit und Service-Exzellenz",
        "Führung und ressortübergreifende Koordination",
        "Personalentwicklung und Fünf-Sterne-Standards",
        "Qualitätssicherung und Renommee des Hauses",
        "Gesundheits-, Arbeits- und Sicherheitsaufsicht",
        "Einhaltung gesetzlicher Vorschriften und Richtlinien",
        "Krisenmanagement und Notfallkoordination",
        "Kontinuierliche Optimierung des Gästeerlebnisses"
      ]
    }
  },
  {
    "id": 2,
    "icon": "Briefcase",
    "category": "executive",
    "title": {
      "en": "EXECUTIVE ASSISTANT GENERAL MANAGER",
      "tr": "GENEL MÜDÜR YARDIMCISI (EAGM)",
      "ru": "ЗАМЕСТИТЕЛЬ ГЕНЕРАЛЬНОГО ДИРЕКТОРА",
      "de": "STELLVERTRETENDER GENERAL MANAGER"
    },
    "subtitle": {
      "en": "Executive Support & Operational Leadership",
      "tr": "Üst Düzey Yönetim Desteği ve Operasyonel Liderlik",
      "ru": "Операционное руководство и исполнительная поддержка",
      "de": "Operative Führung & Managementunterstützung"
    },
    "description": {
      "en": "The Executive Assistant General Manager provides senior-level operational support to the General Manager and assists in maintaining the hotel's daily performance. With extensive knowledge of resort operations, this position coordinates multiple departments, follows operational performance and ensures that management decisions are translated into effective day-to-day execution. May assume overall operational responsibility when the General Manager is unavailable.",
      "tr": "Genel Müdür Yardımcısı, Genel Müdüre üst düzey operasyonel destek sağlayarak otelin günlük performansının kusursuz işlemesine katkıda bulunur. Kapsamlı tatil köyü işletmeciliği birikimiyle birden fazla departmanı koordine eder, operasyonel performansı yakından izler ve yönetim kararlarının sahada eksiksiz uygulanmasını temin eder. Genel Müdürün bulunmadığı zamanlarda tam operasyonel sorumluluğu üstlenir.",
      "ru": "Оказывает всестороннюю поддержку Генеральному директору и обеспечивает бесперебойность ежедневных операций отеля. Координирует взаимодействие всех отделов, контролирует выполнение ключевых показателей и обеспечивает реализацию стратегических решений на практике. В отсутствие Генерального директора принимает на себя операционное руководство комплексом.",
      "de": "Bietet hochrangige Unterstützung für die Generaldirektion und überwacht die tägliche Hotelperformance. Koordiniert zentrale Abteilungen, setzt Managemententscheidungen operativ um und übernimmt in Abwesenheit des General Managers die operative Leitung des gesamten Resorts."
    }
  },
  {
    "id": 3,
    "icon": "Compass",
    "category": "executive",
    "title": {
      "en": "HOTEL / OPERATIONS MANAGER",
      "tr": "OTEL / OPERASYON MÜDÜRÜ",
      "ru": "ДИРЕКТОР ПО ОПЕРАЦИОННОЙ ДЕЯТЕЛЬНОСТИ",
      "de": "OPERATIONS MANAGER / BETRIEBSLEITER"
    },
    "subtitle": {
      "en": "Coordination of Daily Hotel Operations",
      "tr": "Günlük Otel Operasyonlarının Kusursuz Koordinasyonu",
      "ru": "Координация ежедневных операционных процессов",
      "de": "Koordination der täglichen Betriebsabläufe"
    },
    "description": {
      "en": "The Operations Manager is responsible for ensuring that the hotel's daily operation functions smoothly, efficiently and consistently. Working across departments, monitors service delivery, operational standards, staffing requirements and guest satisfaction. Particular attention is given to seamless coordination between Front Office, Housekeeping, Food & Beverage, Recreation, Engineering and Guest Relations so that guests experience one unified level of five-star service.",
      "tr": "Operasyon Müdürü, otelin günlük operasyonlarının pürüzsüz, verimli ve istikrarlı şekilde yürümesinden sorumludur. Ön Büro, Kat Hizmetleri, Yiyecek & İçecek, Eğlence, Teknik Servis ve Misafir İlişkileri arasındaki entegrasyonu sağlayarak misafirin bağımsız bölümler yerine tek ve ahenkli bir lüks hizmet deneyimi yaşamasını sağlar.",
      "ru": "Отвечает за бесперебойное, эффективное и стабильное функционирование всех служб отеля. Обеспечивает идеальную синергию между службой приема, клинингом, ресторанами, анимацией, техническим отделом и службой заботы о гостях, формируя единый премиальный стандарт обслуживания.",
      "de": "Gewährleistet einen reibungslosen, effizienten und konsistenten Betriebsablauf im gesamten Hotel. Stimmt Front Office, Housekeeping, Gastronomie, Technik und Gästebetreuung optimal aufeinander ab, sodass der Gast ein ganzheitliches Fünf-Sterne-Serviceerlebnis genießt."
    }
  },
  {
    "id": 4,
    "icon": "Hotel",
    "category": "rooms_front",
    "title": {
      "en": "ROOMS DIVISION MANAGER",
      "tr": "KONAKLAMA / ODALAR BÖLÜMÜ MÜDÜRÜ",
      "ru": "ДИРЕКТОР НОМЕРНОГО ФОНДА",
      "de": "ROOMS DIVISION MANAGER"
    },
    "subtitle": {
      "en": "Accommodation & Guest Experience Leadership",
      "tr": "Konaklama ve Misafir Deneyimi Yönetimi",
      "ru": "Руководство номерным фондом и комфортом гостей",
      "de": "Leitung Beherbergung & Gästezufriedenheit"
    },
    "description": {
      "en": "The Rooms Division Manager oversees the complete accommodation operation and coordinates the departments responsible for the guest's stay. This senior position brings together Front Office, Reception, Guest Relations, Reservations, Concierge/Guest Services and Housekeeping functions. Ensures that rooms are available, meticulously prepared, accurately assigned and delivered to five-star standards.",
      "tr": "Odalar Bölümü Müdürü, konaklama operasyonunun tamamını denetler ve misafirin konaklamasından sorumlu tüm birimleri koordine eder. Ön Büro, Resepsiyon, Misafir İlişkileri, Rezervasyon, Danışma ve Kat Hizmetlerini bir araya getirerek odaların zamanında, kusursuz hazırlanmış ve doğru tahsis edilmiş olmasını temin eder.",
      "ru": "Возглавляет весь комплекс служб, связанных с проживанием гостей. Объединяет фронт-офис, службу приема, отдел бронирования, службу заботы о гостях, консьержей и хаускипинг, гарантируя идеальную подготовку и своевременное предоставление номеров по высочайшим стандартам.",
      "de": "Leitet den gesamten Logisbereich und führt Front Office, Rezeption, Reservierung, Gästebetreuung und Housekeeping zusammen. Stellt sicher, dass alle Zimmer termingerecht, makellos vorbereitet und gemäß den höchsten Qualitätskriterien bereitgestellt werden."
    }
  },
  {
    "id": 5,
    "icon": "ConciergeBell",
    "category": "rooms_front",
    "title": {
      "en": "FRONT OFFICE MANAGER",
      "tr": "ÖN BÜRO MÜDÜRÜ",
      "ru": "РУКОВОДИТЕЛЬ СЛУЖБЫ ПРИЕМА И РАЗМЕЩЕНИЯ",
      "de": "FRONT OFFICE MANAGER"
    },
    "subtitle": {
      "en": "The First Point of Welcome",
      "tr": "Karşılamanın ve İlk İzlenimin Zarafet Merkezi",
      "ru": "Первое лицо гостеприимства и приема",
      "de": "Erste Anlaufstelle & Herzlicher Empfang"
    },
    "description": {
      "en": "The Front Office Manager leads the hotel's reception and front-office operation. As the face of the hotel from the moment a guest arrives, responsibilities include welcoming guests, check-in and check-out, room allocation, information services, account coordination, guest requests and inter-departmental communication with warmth, efficiency, discretion and professionalism.",
      "tr": "Ön Büro Müdürü, otelin karşılama ve resepsiyon operasyonlarını yönetir. Misafirin otele adım attığı andan itibaren ilk yüzü olarak karşılama, giriş-çıkış işlemleri, oda dağıtımı, danışma hizmetleri ve departmanlar arası koordinasyonu samimiyet, sürat ve yüksek zarafetle idare eder.",
      "ru": "Возглавляет службу приема и размещения. Обеспечивает теплый прием, оперативную регистрацию заезда и выезда, распределение номеров, координацию счетов и оперативное реагирование на любые запросы гостей с неизменным профессионализмом и тактом.",
      "de": "Verantwortet die gesamte Rezeption und den Front-Office-Bereich. Repräsentiert das Hotel beim ersten Kontakt und steuert Check-in, Check-out, Zimmerzuteilung sowie Gästewünsche mit höchster Professionalität, Diskretion und Herzlichkeit."
    }
  },
  {
    "id": 6,
    "icon": "UserCheck",
    "category": "rooms_front",
    "title": {
      "en": "RECEPTION MANAGER",
      "tr": "RESEPSİYON MÜDÜRÜ",
      "ru": "МЕНЕДЖЕР РЕСЕПШН",
      "de": "REZEPTIONSMANAGER"
    },
    "subtitle": {
      "en": "Elegant, Efficient & Personalized Arrival Services",
      "tr": "Zarif, Hızlı ve Kişiselleştirilmiş Karşılama Hizmetleri",
      "ru": "Элегантный, быстрый и персональный сервис прибытия",
      "de": "Eleganter, effizienter & persönlicher Check-in Service"
    },
    "description": {
      "en": "The Reception Manager is responsible for the daily supervision of the reception team and ensures that every guest is welcomed in a professional, courteous and memorable manner. Manages arrivals, departures, room keys, hotel orientation and immediate guest assistance with genuine patience and respect throughout their stay.",
      "tr": "Resepsiyon Müdürü, resepsiyon ekibinin günlük yönetiminden sorumludur ve her misafirin saygılı, nazik ve unutulmaz bir ilgiyle karşılanmasını sağlar. Giriş ve çıkışları, oda anahtarlarını, otel içi bilgilendirmeyi ve acil destek ihtiyaçlarını yönetir.",
      "ru": "Осуществляет ежедневный контроль работы администраторов службы приема. Гарантирует безупречный, вежливый и персонализированный подход к каждому гостю при регистрации заезда, выезда и решении любых текущих вопросов.",
      "de": "Leitet das operative Rezeptionsteam vor Ort. Sorgt für einen reibungslosen, zuvorkommenden Empfang, eine präzise Schlüsselübergabe und eine lückenlose Betreuung der Gäste während ihres gesamten Aufenthalts."
    }
  },
  {
    "id": 7,
    "icon": "HeartHandshake",
    "category": "rooms_front",
    "title": {
      "en": "GUEST RELATIONS MANAGER",
      "tr": "MİSAFİR İLİŞKİLERİ MÜDÜRÜ",
      "ru": "МЕНЕДЖЕР ПО РАБОТЕ С ГОСТЯМИ (GUEST RELATIONS)",
      "de": "GUEST RELATIONS MANAGER"
    },
    "subtitle": {
      "en": "Personalized Guest Care & Satisfaction",
      "tr": "Kişiye Özel İlgi, Memnuniyet ve Kalpten Misafirperverlik",
      "ru": "Персональная забота и максимальный комфорт гостей",
      "de": "Individuelle Gästebetreuung & Maximale Zufriedenheit"
    },
    "description": {
      "en": "Dedicated to creating a personalized and memorable experience for every guest. Maintains close contact with guests throughout their stay, identifying preferences, responding to requests, resolving concerns and coordinating special arrangements like anniversaries, honeymoons and VIP welcomes with multilingual diplomacy.",
      "tr": "Her misafir için özel ve unutulmaz bir tatil deneyimi yaratmaya odaklanmıştır. Konaklama boyunca misafirlerle yakın temas kurarak tercihlerini belirler, talepleri karşılar, özel gün kutlamalarını (yıl dönümü, balayı, doğum günü) organize eder ve çok dilli bir yaklaşımla ihtiyaçları önceden sezer.",
      "ru": "Посвящает себя созданию уникальных и запоминающихся впечатлений. Находится в постоянном контакте с гостями, выясняет индивидуальные предпочтения, координирует поздравления с памятными датами, оперативно решает любые вопросы с исключительным тактом и дипломатией.",
      "de": "Widmet sich der maßgeschneiderten Betreuung unserer Gäste. Identifiziert Vorlieben, koordiniert Jubiläen, Flitterwochen sowie VIP-Wünsche und löst Anliegen diskret und lösungsorientiert mit mehrsprachiger Souveränität."
    }
  },
  {
    "id": 8,
    "icon": "CalendarCheck2",
    "category": "rooms_front",
    "title": {
      "en": "RESERVATIONS MANAGER",
      "tr": "REZERVASYON MÜDÜRÜ",
      "ru": "МЕНЕДЖЕР ОТДЕЛА БРОНИРОВАНИЯ",
      "de": "RESERVIERUNGSMANAGER"
    },
    "subtitle": {
      "en": "Professional Booking & Accommodation Coordination",
      "tr": "Profesyonel Rezervasyon ve Konaklama Koordinasyonu",
      "ru": "Профессиональное бронирование и координация размещения",
      "de": "Professionelles Buchungsmanagement & Zimmerkoordination"
    },
    "description": {
      "en": "Oversees the hotel's reservation operation, ensuring that bookings are processed accurately and professionally. Responsibilities include reservation management, room availability, booking correspondence, special requests, rate information, group reservations and seamless communication with Front Office and Revenue Management.",
      "tr": "Otelin rezervasyon operasyonunu yöneterek tüm taleplerin eksiksiz ve profesyonelce işlenmesini sağlar. Oda müsaitliği, özel oda istekleri, fiyatlandırma, grup rezervasyonları ve Ön Büro ile Gelir Yönetimi arasındaki koordinasyonu yürütür.",
      "ru": "Управляет отделом бронирования, обеспечивая безукоризненную обработку индивидуальных и групповых заявок. Контролирует доступность категорий номеров, специальные пожелания гостей и согласованность тарифов с коммерческим отделом.",
      "de": "Steuert alle Buchungsvorgänge präzise und zuverlässig. Überwacht Zimmerkapazitäten, Sonderwünsche, Gruppenvorgänge und stellt sicher, dass Gästeerwartungen bereits vor der Anreise exakt an die operativen Teams weitergeleitet werden."
    }
  },
  {
    "id": 9,
    "icon": "TrendingUp",
    "category": "commercial_hr",
    "title": {
      "en": "REVENUE MANAGER",
      "tr": "GELİR YÖNETİMİ MÜDÜRÜ",
      "ru": "МЕНЕДЖЕР ПО УПРАВЛЕНИЮ ДОХОДАМИ (REVENUE MANAGER)",
      "de": "REVENUE MANAGER"
    },
    "subtitle": {
      "en": "Strategic Revenue & Occupancy Management",
      "tr": "Stratejik Gelir ve Doluluk Optimizasyonu",
      "ru": "Стратегическое управление доходами и загрузкой",
      "de": "Strategisches Ertrags- & Auslastungsmanagement"
    },
    "description": {
      "en": "Responsible for optimizing room revenue while maintaining the hotel's premium commercial positioning. Uses occupancy trends, demand patterns, market conditions and booking behavior to optimize availability and pricing strategies while protecting the property's five-star reputation.",
      "tr": "Otelin seçkin piyasa konumunu korurken oda gelirlerini ve doluluğunu optimize eder. Talep dalgalanmalarını, pazar trendlerini ve rezervasyon davranışlarını analiz ederek sürdürülebilir fiyatlandırma ve kapasite stratejileri geliştirir.",
      "ru": "Оптимизирует доходность номерного фонда и загрузку отеля. Анализируя динамику спроса, сезонность и каналы продаж, выстраивает эффективную тарифную политику при сохранении высокого статуса курорта.",
      "de": "Optimiert die Erlöse und Auslastung unter Wahrung der exklusiven Marktpositionierung des Fünf-Sterne-Resorts durch datengestützte Markt- und Nachfrageanalysen."
    }
  },
  {
    "id": 10,
    "icon": "Sparkles",
    "category": "housekeeping",
    "title": {
      "en": "EXECUTIVE HOUSEKEEPER",
      "tr": "KAT HİZMETLERİ MÜDÜRÜ (EXECUTIVE HOUSEKEEPER)",
      "ru": "РУКОВОДИТЕЛЬ СЛУЖБЫ ГОСТИНИЧНОГО ХОЗЯЙСТВА (ХАУСКИПИНГ)",
      "de": "LEITENDE HAUSDAME / EXECUTIVE HOUSEKEEPER"
    },
    "subtitle": {
      "en": "Exceptional Standards of Cleanliness & Presentation",
      "tr": "Kusursuz Hijyen, Düzen ve Estetik Standartları",
      "ru": "Безупречная чистота, порядок и презентабельность",
      "de": "Makellose Sauberkeit & Höchste Präsentationsstandards"
    },
    "description": {
      "en": "Leads one of the most vital departments in the hotel. Responsible for guest rooms, public areas, housekeeping standards, linen management and departmental organization, ensuring that every environment reflects the cleanliness, comfort and refinement expected from a five-star property.",
      "tr": "Otelin en kritik departmanlarından birine liderlik eder. Misafir odalarının, ortak kullanım alanlarının, tekstil ve çamaşırhane süreçlerinin hijyen, konfor ve lüks standartlara tam uygunluğunu titizlikle denetler.",
      "ru": "Возглавляет одну из ключевых служб отеля. Отвечает за идеальное санитарное состояние номерного фонда, общественных зон, управление текстилем и организацию работы горничных в строгом соответствии с премиальными нормами.",
      "de": "Leitet den gesamten Reinigungs- und Wäschebereich. Garantiert makellose Sauberkeit, Frische und eine stilvolle Präsentation sämtlicher Gästezimmer und öffentlicher Bereiche des Resorts."
    }
  },
  {
    "id": 11,
    "icon": "ClipboardCheck",
    "category": "housekeeping",
    "title": {
      "en": "HOUSEKEEPING SUPERVISORS",
      "tr": "KAT HİZMETLERİ ŞEFLERİ / DENETÇİLERİ",
      "ru": "СУПЕРВАЙЗЕРЫ СЛУЖБЫ ХАУСКИПИНГА",
      "de": "HOUSEKEEPING SUPERVISOREN / ETAGENINSPEKTOREN"
    },
    "subtitle": {
      "en": "Quality Control & Guestroom Standards",
      "tr": "Kalite Kontrolü ve Oda Hazırlık Denetimi",
      "ru": "Контроль качества подготовки номеров",
      "de": "Qualitätskontrolle & Zimmerabnahme"
    },
    "description": {
      "en": "Housekeeping Supervisors oversee room attendants and public-area personnel. They conduct detailed inspections, verify room readiness, monitor cleanliness standards and ensure that any identified deficiencies are corrected promptly before guest arrival.",
      "tr": "Kat şefleri, oda görevlilerini ve ortak alan personelini denetler. Detaylı oda kontrolleri yapar, temizlik standartlarını doğrular ve misafir girişinden önce tespit edilen en ufak eksikliği dahi derhal giderir.",
      "ru": "Контролируют работу горничных и персонала общественных зон. Проводят финальную проверку готовности номеров перед заселением, гарантируя соблюдение высочайших стандартов чистоты и уюта.",
      "de": "Überwachen die Zimmer- und Etagenreinigung. Führen akribische Qualitätskontrollen durch und stellen sicher, dass jedes Zimmer vor der Anreise des Gastes absolut perfekt vorbereitet ist."
    }
  },
  {
    "id": 12,
    "icon": "Bed",
    "category": "housekeeping",
    "title": {
      "en": "ROOM ATTENDANTS",
      "tr": "ODA GÖREVLİLERİ (KAT HİZMETLERİ EKİBİ)",
      "ru": "ГОРНИЧНЫЕ НОМЕРНОГО ФОНДА",
      "de": "ZIMMERMÄDCHEN & ZIMMERPFLEGE-TEAM"
    },
    "subtitle": {
      "en": "Dedicated Care Behind Every Guest Stay",
      "tr": "Her Konaklamanın Arkasındaki Özenli Emek",
      "ru": "Невидимая забота о комфорте каждого гостя",
      "de": "Hingebungsvolle Pflege für das Wohlbefinden der Gäste"
    },
    "description": {
      "en": "Responsible for the detailed preparation, servicing and presentation of guest accommodation. Their daily work includes cleaning, refreshing amenities, arranging fine linens and maintaining guest rooms with discretion, respect for privacy and meticulous attention to detail.",
      "tr": "Misafir odalarının detaylı temizliğinden, düzeninden ve konforundan sorumludur. Yüksek hijyen kuralları, misafir mahremiyetine mutlak saygı ve kusursuz detaycılıkla odaları her gün yenilerler.",
      "ru": "Осуществляют тщательную уборку, комплектацию косметическими принадлежностями и подготовку постелей. Отличаются безупречной деликатностью, уважением к личному пространству гостей и вниманием к каждой мелочи.",
      "de": "Sorgen für die tägliche Reinigung, Auffrischung und liebevolle Vorbereitung der Gästezimmer. Arbeiten diskret, respektieren die Privatsphäre und garantieren ein Gefühl vollkommener Frische."
    }
  },
  {
    "id": 13,
    "icon": "Brush",
    "category": "housekeeping",
    "title": {
      "en": "PUBLIC AREA HOUSEKEEPING TEAM",
      "tr": "GENEL ALANLAR TEMİZLİK VE BAKIM EKİBİ",
      "ru": "СЛУЖБА ЧИСТОТЫ ОБЩЕСТВЕННЫХ ЗОН",
      "de": "REINIGUNGSTEAMS FÜR ÖFFENTLICHE BEREICHE"
    },
    "subtitle": {
      "en": "Maintaining the Elegance of Every Shared Space",
      "tr": "Tüm Ortak Alanların Işıltısını ve Asaletini Korumak",
      "ru": "Поддержание сияющей чистоты холлов и галерей",
      "de": "Pflege & Eleganz aller öffentlichen Hotelbereiche"
    },
    "description": {
      "en": "Maintains the hotel's lobbies, corridors, lounges, elevators, restrooms and guest facilities around the clock. Their relentless dedication ensures that guests experience an immaculate, polished and welcoming environment throughout every corner of the property.",
      "tr": "Otelin lobilerini, koridorlarını, dinlenme salonlarını, asansörlerini ve sosyal tesislerini gün boyu pırıl pırıl tutar. Otelin her köşesinde misafirlerin zarafet ve ferahlık hissetmesini sağlar.",
      "ru": "Круглосуточно заботится о чистоте вестибюлей, холлов, коридоров и зон отдыха. Гарантирует презентабельный и сияющий вид всех общественных пространств отеля.",
      "de": "Hält Lobbys, Flure, Lounges und Freizeitanlagen rund um die Uhr in makellosem Glanz. Schafft ein repräsentatives und einladendes Ambiente in allen Gemeinschaftsbereichen."
    }
  },
  {
    "id": 14,
    "icon": "UtensilsCrossed",
    "category": "culinary_fb",
    "title": {
      "en": "FOOD & BEVERAGE MANAGER",
      "tr": "YİYECEK & İÇECEK MÜDÜRÜ (F&B DIRECTOR)",
      "ru": "ДИРЕКТОР СЛУЖБЫ ПИТАНИЯ И НАПИТКОВ (F&B MANAGER)",
      "de": "FOOD & BEVERAGE MANAGER"
    },
    "subtitle": {
      "en": "Culinary Hospitality & Dining Excellence",
      "tr": "Gastronomi Misafirperverliği ve Kusursuz Servis",
      "ru": "Гастрономическое гостеприимство и ресторанный сервис",
      "de": "Kulinarische Gastfreundschaft & Gastronomische Exzellenz"
    },
    "description": {
      "en": "Oversees the hotel's diverse restaurants, bars, banqueting and beverage operations. Orka Lotus Beach offers an expansive culinary journey across Aegean, Mediterranean and international flavors. The F&B Manager ensures food quality, service presentation, hygiene, guest satisfaction, cost management and staff training adhere to premier luxury standards.",
      "tr": "Otelin ana restoranını, alakart mekanlarını, barlarını ve servis operasyonlarını yönetir. Ege, Akdeniz ve dünya mutfaklarını kapsayan zengin gastronomi kültürünü; yüksek hijyen, zarif sunum ve güler yüzlü servis standartlarıyla buluşturur.",
      "ru": "Руководит всеми ресторанами, барами и банкетным обслуживанием отеля. Отвечает за безупречное качество блюд, изысканную подачу, соблюдение санитарных норм и высокий уровень подготовки официантов и барменов.",
      "de": "Leitet alle Restaurants, Bars und gastronomischen Outlets des Resorts. Steuert Serviceabläufe, kulinarische Qualität, Hygiene und Gästezufriedenheit auf höchstem Fünf-Sterne-Niveau."
    }
  },
  {
    "id": 15,
    "icon": "ChefHat",
    "category": "culinary_fb",
    "title": {
      "en": "EXECUTIVE CHEF",
      "tr": "BAŞ AŞÇI (EXECUTIVE CHEF)",
      "ru": "ШЕФ-ПОВАР (EXECUTIVE CHEF)",
      "de": "EXECUTIVE CHEF / KÜCHENDIREKTOR"
    },
    "subtitle": {
      "en": "Culinary Leadership & Gastronomic Standards",
      "tr": "Gastronomi Liderliği ve Mutfak Sanatları",
      "ru": "Кулинарное мастерство и гастрономические стандарты",
      "de": "Kulinarische Führung & Gourmet-Standards"
    },
    "description": {
      "en": "Provides the culinary vision and leadership of the resort. Responsible for kitchen operations, menu concept execution, ingredient sourcing, food safety, recipe consistency and kitchen brigade mentorship, ensuring that every meal served reflects a genuine celebration of flavors.",
      "tr": "Resortun mutfak vizyonuna ve gastronomik kalitesine yön verir. Menü tasarımları, yerel ve taze malzeme temini, gıda güvenliği ve usta aşçı kadrosunun koordinasyonu ile her tabağın unutulmaz bir lezzet şöleni olmasını sağlar.",
      "ru": "Творец гастрономической концепции курорта. Руководит работой шеф-поваров цехов, разработкой авторских меню, отбором фермерских продуктов и соблюдением строжайших рецептур и стандартов пищевой безопасности.",
      "de": "Verantwortet die kulinarische Gesamtkonzeption und die Küchenbrigade. Kombiniert regionale ägäische Spezialitäten mit internationaler Haute Cuisine unter Einhaltung strengster Qualitäts- und Frischekriterien."
    }
  },
  {
    "id": 16,
    "icon": "Flame",
    "category": "culinary_fb",
    "title": {
      "en": "SOUS CHEFS & CHEF DE PARTIE TEAM",
      "tr": "SOUS CHEF'LER VE KISIM ŞEFLERİ (CHEF DE PARTIE)",
      "ru": "СУ-ШЕФЫ И ШЕФ-ПОВАРА ЦЕХОВ (CHEF DE PARTIE)",
      "de": "SOUS CHEFS & CHEFS DE PARTIE"
    },
    "subtitle": {
      "en": "Precision, Consistency & Culinary Excellence",
      "tr": "Hassasiyet, Süreklilik ve Mutfak Ustalığı",
      "ru": "Точность, стабильность и мастерство приготовления",
      "de": "Präzision, Beständigkeit & Handwerkliche Perfektion"
    },
    "description": {
      "en": "Sous Chefs support the Executive Chef in daily brigade supervision. Chef de Partie and specialized culinary craftsmen oversee individual sections—from cold garde-manger and hot grills to delicate pastry and bakery—ensuring consistency, speed, hygiene and culinary flair.",
      "tr": "Sous Chef'ler operasyonun anlık yönetimini sağlarken; soğuk, sıcak, ızgara, balık ve pastane kısımlarını yöneten Chef de Partie ustaları lezzet dengesini, sunum estetiğini ve mutfak disiplinini korur.",
      "ru": "Су-шефы контролируют работу смен на кухне, а начальники цехов отвечают за идеальное приготовление блюд горячей, холодной, кондитерской и рыбной секций в соответствии с утвержденными технологическими картами.",
      "de": "Unterstützen den Executive Chef in der täglichen Zubereitung. Chefs de Partie leiten ihre Posten mit meisterhafter Präzision von der Patisserie bis zum Grill und sichern eine gleichbleibend exzellente Speisenqualität."
    }
  },
  {
    "id": 17,
    "icon": "Utensils",
    "category": "culinary_fb",
    "title": {
      "en": "RESTAURANT MANAGERS",
      "tr": "RESTORAN MÜDÜRLERİ & ŞEFLERİ",
      "ru": "МЕНЕДЖЕРЫ РЕСТОРАНОВ",
      "de": "RESTAURANTLEITER / RESTAURANT MANAGERS"
    },
    "subtitle": {
      "en": "Refined Dining Service",
      "tr": "Zarif Restoran Servisi ve Masa Zarafeti",
      "ru": "Изысканный ресторанный сервис и атмосфера",
      "de": "Gehobener Restaurantservice & Tischkultur"
    },
    "description": {
      "en": "Responsible for the professional, hospitable operation of individual dining venues. Supervise service staff, oversee table settings, coordinate seating and dietary preferences, and ensure that guests enjoy attentive, courteous and seamless hospitality throughout their dining experience.",
      "tr": "Ana restoran ve alakart mekanların kusursuz işleyişinden sorumludur. Servis personelini yönetir, masa düzenini denetler, özel diyet taleplerini takip eder ve her misafirin ayrıcalıklı bir akşam geçirmesini sağlar.",
      "ru": "Обеспечивают безупречную работу отдельных ресторанов отеля. Руководят официантами, следят за сервировкой, рассадкой гостей и созданием теплой, гостеприимной атмосферы за каждым столом.",
      "de": "Verantwortlich für die erstklassige Betreuung in den einzelnen Restaurantbereichen. Führen das Serviceteam, überwachen das Eindecken der Tische und sorgen für eine zuvorkommende Bewirtung."
    }
  },
  {
    "id": 18,
    "icon": "Wine",
    "category": "culinary_fb",
    "title": {
      "en": "BAR MANAGERS & BAR SUPERVISORS",
      "tr": "BAR MÜDÜRLERİ VE ŞEFLERİ",
      "ru": "БАР-МЕНЕДЖЕРЫ И СТАРШИЕ БАРМЕНЫ",
      "de": "BARMANAGER & BAR-SUPERVISOREN"
    },
    "subtitle": {
      "en": "Professional Beverage Hospitality",
      "tr": "Profesyonel İçecek Kültürü ve Kokteyl Sanatı",
      "ru": "Профессиональная культура напитков и миксология",
      "de": "Professionelle Barkultur & Getränkeservice"
    },
    "description": {
      "en": "Oversees beverage service across lobby lounges, pool bars, beach kiosks and sunset venues. Combines mixology expertise with speed and welcoming hospitality, ensuring recipe consistency, premium spirits presentation and pristine bar counter cleanliness.",
      "tr": "Lobi, havuz, plaj ve iskele barlarındaki içecek servislerini yönetir. Miksoloji bilgisi ve güler yüzlü yaklaşımla imza kokteyllerin, yerli/yabancı premium içeceklerin hijyenik ve standartlara uygun sunulmasını sağlar.",
      "ru": "Курируют работу баров у бассейнов, на пляже и в лобби. Следят за качеством коктейлей, подачей премиальных напитков, чистотой барных стоек и радушным обслуживанием гостей.",
      "de": "Leiten den Barbetrieb in der Lobby, an den Pools und am Strand. Steuern Mixologie, Servicegeschwindigkeit, Getränkequalität und eine stilvolle Lounge-Atmosphäre."
    }
  },
  {
    "id": 19,
    "icon": "HandHeart",
    "category": "culinary_fb",
    "title": {
      "en": "WAITING & SERVICE PERSONNEL",
      "tr": "SERVİS VE GARSON EKİBİ",
      "ru": "ОФИЦИАНТЫ И СЕРВИСНЫЙ ПЕРСОНАЛ",
      "de": "SERVICE- & BEDIENPERSONAL"
    },
    "subtitle": {
      "en": "Courteous Service with Genuine Hospitality",
      "tr": "İçten Misafirperverlik ve Saygılı Hizmet",
      "ru": "Предупредительное обслуживание и искреннее радушие",
      "de": "Zuvorkommender Service mit echter Herzlichkeit"
    },
    "description": {
      "en": "Form the frontline touchpoint of dining hospitality. Expected to deliver attentive, respectful and efficient table service while maintaining immaculate personal presentation, extensive menu knowledge and prompt anticipation of guest needs.",
      "tr": "Restoran ve barlarda misafirle birebir temas eden servis ekibidir. Menü detaylarına hakimiyet, nezaket, sürat ve misafir isteklerini anında karşılama becerisiyle Türk misafirperverliğini sahaya yansıtırlar.",
      "ru": "Непосредственные создатели комфорта за трапезой. Отличаются вежливостью, знанием состава блюд и напитков, оперативностью и искренним стремлением окружить гостя заботой.",
      "de": "Repräsentieren die gelebte Gastfreundschaft am Tisch. Zeichnen sich durch aufmerksamen Service, beste Speisenkenntnisse, ein gepflegtes Auftreten und schnelle Reaktionszeiten aus."
    }
  },
  {
    "id": 20,
    "icon": "Droplets",
    "category": "culinary_fb",
    "title": {
      "en": "STEWARDING MANAGER",
      "tr": "STEWARDING (MUTFAK HİJYENİ) MÜDÜRÜ",
      "ru": "МЕНЕДЖЕР СЛУЖБЫ СТЮАРДИНГА (ГИГИЕНА КУХНИ)",
      "de": "STEWARDING MANAGER / HYGIENELEITUNG KÜCHE"
    },
    "subtitle": {
      "en": "Hygiene, Sanitation & Back-of-House Excellence",
      "tr": "Mutfak Hijyeni, Sanitasyon ve Ekipman Güvenliği",
      "ru": "Санитария, дезинфекция и стерильность пищеблока",
      "de": "Hygiene, Spülbetrieb & Küchen-Sanitation"
    },
    "description": {
      "en": "Oversees back-of-house kitchen sanitation, high-temperature dishwashing, food-contact surface disinfection, waste management and culinary equipment maintenance, ensuring uncompromising food safety across all preparation zones.",
      "tr": "Mutfakların arka planındaki hijyenik operasyonu, endüstriyel yıkama ünitelerini, ekipman dezenfeksiyonunu ve atık yönetimini denetleyerek uluslararası gıda güvenliği standartlarını eksiksiz uygular.",
      "ru": "Отвечает за стерильную чистоту на кухне, санитарную обработку инвентаря, посудомоечные комплексы и утилизацию отходов в строгом соответствии с нормами НАССР.",
      "de": "Überwacht die Einhaltung aller Hygiene- und HACCP-Richtlinien in den Küchen, den Spülbetrieb, die Desinfektion aller Gerätschaften und die Sauberkeit der rückwärtigen Wirtschaftsbereiche."
    }
  },
  {
    "id": 21,
    "icon": "Users",
    "category": "commercial_hr",
    "title": {
      "en": "HUMAN RESOURCES MANAGER",
      "tr": "İNSAN KAYNAKLARI MÜDÜRÜ",
      "ru": "ДИРЕКТОР ПО УПРАВЛЕНИЮ ПЕРСОНАЛОМ (HR DIRECTOR)",
      "de": "HUMAN RESOURCES MANAGER / PERSONALLEITER"
    },
    "subtitle": {
      "en": "People, Culture & Professional Development",
      "tr": "İnsan Değeri, Kurum Kültürü ve Mesleki Gelişim",
      "ru": "Люди, корпоративная культура и профессиональный рост",
      "de": "Personalmanagement, Unternehmenskultur & Entwicklung"
    },
    "description": {
      "en": "Oversees the hotel's most valuable asset: its dedicated people. Responsibilities encompass talent acquisition, onboarding, employee welfare, fair working policies, performance development and fostering a collaborative, respectful five-star resort culture.",
      "tr": "Otelin en değerli kaynağı olan çalışanları yönetir. Nitelikli istihdam, oryantasyon, personel refahı, çalışma hakları ve saygılı, disiplinli, misafir odaklı bir çalışma ikliminin sürdürülmesini sağlar.",
      "ru": "Заботится о главной ценности отеля — его сотрудниках. Курирует подбор талантов, социальное обеспечение, адаптацию персонала и поддержание высоких этических норм в команде.",
      "de": "Verantwortet die Betreuung und Entwicklung unserer Mitarbeiter. Steuert Recruiting, Schulungen, Mitarbeiterwohlbefinden und sichert eine von Respekt und Spitzenleistung geprägte Hotelkultur."
    }
  },
  {
    "id": 22,
    "icon": "GraduationCap",
    "category": "commercial_hr",
    "title": {
      "en": "TRAINING & QUALITY MANAGER",
      "tr": "EĞİTİM VE KALİTE MÜDÜRÜ",
      "ru": "МЕНЕДЖЕР ПО ОБУЧЕНИЮ И КОНТРОЛЮ КАЧЕСТВА",
      "de": "TRAINING & QUALITY MANAGER"
    },
    "subtitle": {
      "en": "Continuous Improvement & Five-Star Service Standards",
      "tr": "Sürekli Gelişim ve 5 Yıldızlı Hizmet Standartları",
      "ru": "Непрерывное развитие и пятизвездочные стандарты сервиса",
      "de": "Kontinuierliche Weiterbildung & Fünf-Sterne-Qualität"
    },
    "description": {
      "en": "Develops and audits professional service standards resort-wide. Implements training modules covering luxury guest etiquette, conflict resolution, cultural awareness, emergency readiness and service excellence so every team member understands the 'why' behind premier hospitality.",
      "tr": "Tüm departmanların hizmet kalitesini ölçümler ve geliştirir. Zarafet kuralları, kriz yönetimi, yabancı diller, hijyen ve lüks servis standartları eğitimleriyle çalışanların sürekli gelişimini sağlar.",
      "ru": "Разрабатывает тренинги по высоким стандартам гостеприимства, этикету, межкультурным коммуникациям и качеству обслуживания, проводя регулярные аудиты всех служб отеля.",
      "de": "Entwickelt Schulungsprogramme für Fünf-Sterne-Service, Etikette und Gästekommunikation und führt kontinuierliche Qualitätsprüfungen in allen Abteilungen durch."
    }
  },
  {
    "id": 23,
    "icon": "Coins",
    "category": "commercial_hr",
    "title": {
      "en": "FINANCE MANAGER / FINANCIAL CONTROLLER",
      "tr": "MALİ İŞLER MÜDÜRÜ / FİNANS KONTROLÖRÜ",
      "ru": "ФИНАНСОВЫЙ ДИРЕКТОР / ФИНАНСОВЫЙ КОНТРОЛЛЕР",
      "de": "FINANCE MANAGER / FINANCIAL CONTROLLER"
    },
    "subtitle": {
      "en": "Financial Integrity & Commercial Responsibility",
      "tr": "Mali Disiplin, Şeffaflık ve Ticari Sorumluluk",
      "ru": "Финансовая стабильность и коммерческий контроль",
      "de": "Finanzielle Integrität & Wirtschaftliche Verantwortung"
    },
    "description": {
      "en": "Oversees fiscal administration, budgeting, capital controls, expenditure verification, payroll, statutory reporting and compliance, providing senior management with precise financial intelligence for sound commercial decision-making.",
      "tr": "Otelin bütçeleme, muhasebe, gelir-gider denetimi, yasal mevzuat uyumluluğu ve mali raporlama süreçlerini yöneterek işletmenin sürdürülebilir ticari gücünü korur.",
      "ru": "Управляет финансовыми потоками, составлением бюджета, аудитом расходов, бухгалтерским учетом и налоговой отчетностью, обеспечивая прозрачность и стабильность бизнеса.",
      "de": "Leitet das Finanz- und Rechnungswesen, überwacht Budgets, Kostenkontrollen und gesetzliche Bilanzen zur Sicherung der wirtschaftlichen Solidität des Unternehmens."
    }
  },
  {
    "id": 24,
    "icon": "ShoppingBag",
    "category": "commercial_hr",
    "title": {
      "en": "PURCHASING MANAGER",
      "tr": "SATIN ALMA MÜDÜRÜ",
      "ru": "МЕНЕДЖЕР ПО ЗАКУПКАМ (PURCHASING MANAGER)",
      "de": "EINKAUFSLEITER / PURCHASING MANAGER"
    },
    "subtitle": {
      "en": "Strategic Procurement & Supplier Management",
      "tr": "Stratejik Tedarik ve Seçkin Kalite Yönetimi",
      "ru": "Стратегические закупки и управление поставщиками",
      "de": "Strategischer Einkauf & Lieferantenmanagement"
    },
    "description": {
      "en": "Manages procurement of fresh foods, premium beverages, guest amenities, technical parts and operational operating supplies. Vets suppliers rigorously for quality, authenticity, sustainability and pricing controls.",
      "tr": "Taze gıda maddelerinden oda bukletlerine, teknik yedek parçalardan içeceklere kadar tüm malzeme tedarikini güvenilir, sertifikalı ve kaliteli üreticilerden en uygun şartlarla temin eder.",
      "ru": "Организует закупку качественных продуктов питания, элитного текстиля, косметики и оборудования, проверяя надежность и сертификаты всех поставщиков.",
      "de": "Verantwortet die Beschaffung von Lebensmitteln, Getränken, Hotelbedarf und technischem Material unter strenger Prüfung von Frische, Güte und Nachhaltigkeit."
    }
  },
  {
    "id": 25,
    "icon": "Boxes",
    "category": "commercial_hr",
    "title": {
      "en": "STORES / INVENTORY MANAGER",
      "tr": "DEPO VE STOK YÖNETİMİ MÜDÜRÜ",
      "ru": "ЗАВЕДУЮЩИЙ СКЛАДСКИМ КОМПЛЕКСОМ И УЧЕТОМ",
      "de": "LAGERLEITER / INVENTORY MANAGER"
    },
    "subtitle": {
      "en": "Inventory Control & Operational Supply",
      "tr": "Stok Kontrolü ve Düzenli Operasyonel İkmal",
      "ru": "Контроль складских запасов и своевременное снабжение",
      "de": "Warenwirtschaft & Lagerverwaltung"
    },
    "description": {
      "en": "Maintains meticulous inventory records and secure storage conditions for food staples, cold storage items, linens and equipment. Ensures timely distribution to departments using First-In-First-Out (FIFO) standards.",
      "tr": "Otelin ana ve soğuk hava depolarındaki ürünlerin saklama koşullarını, stok seviyelerini ve departmanlara düzenli çıkışını FIFO (ilk giren ilk çıkar) kurallarıyla eksiksiz yürütür.",
      "ru": "Контролирует складские запасы отеля, условия хранения в холодильных камерах, соблюдение сроков годности и своевременную выдачу материалов подразделениям.",
      "de": "Sichert eine lückenlose Lagerhaltung nach FIFO-Prinzipien, überwacht Kühlketten und stellt sicher, dass alle Abteilungen termingerecht mit Waren versorgt werden."
    }
  },
  {
    "id": 26,
    "icon": "Wrench",
    "category": "engineering_it",
    "title": {
      "en": "CHIEF ENGINEER",
      "tr": "TEKNİK SERVİS MÜDÜRÜ (CHIEF ENGINEER)",
      "ru": "ГЛАВНЫЙ ИНЖЕНЕР",
      "de": "CHIEF ENGINEER / TECHNISCHER LEITER"
    },
    "subtitle": {
      "en": "Technical Infrastructure & Property Reliability",
      "tr": "Teknik Altyapı, Tesis Güvenilirliği ve Enerji Yönetimi",
      "ru": "Инженерная инфраструктура и надежность курорта",
      "de": "Technische Infrastruktur & Anlagensicherheit"
    },
    "description": {
      "en": "Directs the comprehensive mechanical, electrical, plumbing, HVAC cooling, water treatment, generators and architectural maintenance of the entire resort property, guaranteeing uninterrupted safety, comfort and energy efficiency.",
      "tr": "Otelin tüm elektrik, su, klima-soğutma (HVAC), jeneratör, arıtma ve bina altyapı sistemlerinin kesintisiz, güvenli ve çevre dostu şekilde çalışmasını yönetir.",
      "ru": "Руководит всеми инженерными системами отеля: электроснабжением, водоподготовкой, кондиционированием (HVAC), генераторами и зданиями, обеспечивая их круглосуточную надежность.",
      "de": "Verantwortet die gesamte Gebäudetechnik, Klimatechnik, Strom-, Wasser- und Energieversorgung des Resorts zur Gewährleistung höchster Betriebssicherheit."
    }
  },
  {
    "id": 27,
    "icon": "Hammer",
    "category": "engineering_it",
    "title": {
      "en": "ENGINEERING & MAINTENANCE TEAM",
      "tr": "TEKNİK SERVİS VE BAKIM TEKNİSYENLERİ",
      "ru": "ТЕХНИЧЕСКАЯ СЛУЖБА И МАСТЕРА ПО РЕМОНТУ",
      "de": "TECHNIKER- & INSTANDHALTUNGSTEAM"
    },
    "subtitle": {
      "en": "Preventive Maintenance & Rapid Technical Response",
      "tr": "Önleyici Bakım ve Hızlı Teknik Müdahale",
      "ru": "Профилактическое обслуживание и оперативный ремонт",
      "de": "Präventive Wartung & Schneller Technischer Dienst"
    },
    "description": {
      "en": "A skilled cadre of electricians, mechanics, plumbers and carpenters providing 24/7 proactive maintenance and rapid resolution of any guest room or facility technical request with minimal disruption.",
      "tr": "Elektrikçi, tesisatçı, soğutmacı ve marangozlardan oluşan uzman ekip; misafir odalarındaki ve ortak alanlardaki teknik arızalara anında ve sessizce müdahale eder.",
      "ru": "Квалифицированные электрики, сантехники и механики оперативно устраняют любые технические неполадки в номерах и на территории отеля 24 часа в сутки.",
      "de": "Elektriker, Installateure und Kältetechniker stehen rund um die Uhr bereit, um Reparaturen und Wartungen in den Gästezimmern schnell und unauffällig durchzuführen."
    }
  },
  {
    "id": 28,
    "icon": "Shield",
    "category": "safety_security",
    "title": {
      "en": "SECURITY MANAGER",
      "tr": "GÜVENLİK MÜDÜRÜ",
      "ru": "НАЧАЛЬНИК СЛУЖБЫ БЕЗОПАСНОСТИ",
      "de": "SECURITY MANAGER / SICHERHEITSLEITER"
    },
    "subtitle": {
      "en": "Guest Safety, Security & Peace of Mind",
      "tr": "Misafir Güvenliği, Huzuru ve Emniyet Yönetimi",
      "ru": "Безопасность, покой и защита гостей",
      "de": "Gästesicherheit, Objektschutz & Seelenruhe"
    },
    "description": {
      "en": "Directs physical security, surveillance infrastructure, perimeter monitoring, access checkpoints, crisis protocols and liaisons with local authorities. The guiding principle is clear: guests must feel completely secure, relaxed and at ease throughout their holiday.",
      "tr": "Otelin fiziki güvenliğini, kamera sistemlerini, giriş-çıkış kontrollerini ve acil durum hazırlıklarını yönetir. Temel prensibi; misafirlerin tatilleri boyunca tam bir emniyet ve huzur içinde olmalarını sağlamaktır.",
      "ru": "Возглавляет службу безопасности отеля, видеонаблюдение, пропускной режим и пожарную безопасность. Главная цель — абсолютное спокойствие и защищенность каждого гостя.",
      "de": "Koordiniert den gesamten Objektschutz, Zutrittskontrollen, Kameraüberwachung und Notfallpläne, damit sich unsere Gäste stets rundum sicher und unbeschwert fühlen."
    }
  },
  {
    "id": 29,
    "icon": "ShieldAlert",
    "category": "safety_security",
    "title": {
      "en": "SECURITY OFFICERS",
      "tr": "GÜVENLİK GÖREVLİLERİ",
      "ru": "СОТРУДНИКИ СЛУЖБЫ ОХРАНЫ",
      "de": "SICHERHEITSKRÄFTE / SECURITY GUARDS"
    },
    "subtitle": {
      "en": "Discreet Protection & Professional Assistance",
      "tr": "Ayrık Koruma, Nezaket ve Profesyonel Nöbet",
      "ru": "Деликатная охрана и круглосуточная помощь",
      "de": "Diskreter Schutz & Professionelle Präsenz"
    },
    "description": {
      "en": "Patrol the extensive grounds, beachfront, piers and entrances with discreet professionalism. Trained in polite guest interaction, first aid, dispute de-escalation and calm emergency handling while safeguarding privacy.",
      "tr": "Sahil şeridi, iskeleler, bahçeler ve bina girişlerinde 24 saat devriye atarak huzuru sağlar. Nazik iletişim, ilk yardım ve acil durum becerileriyle misafir mahremiyetini korur.",
      "ru": "Несут круглосуточное дежурство на территории курорта, пляже и пирсах. Обучены оказанию первой помощи, тактичному разрешению ситуаций и защите личного пространства гостей.",
      "de": "Patrouillieren diskret auf dem Hotelgelände, an den Stränden und Eingängen. Geschult in Erstversorgung, Deeskalation und aufmerksamem Schutz der Privatsphäre."
    }
  },
  {
    "id": 30,
    "icon": "Flower2",
    "category": "wellness_recreation",
    "title": {
      "en": "SPA & WELLNESS MANAGER",
      "tr": "SPA VE SAĞLIKLI YAŞAM MÜDÜRÜ",
      "ru": "ДИРЕКТОР СПА И ВЕЛНЕС-ЦЕНТРА",
      "de": "SPA & WELLNESS MANAGER"
    },
    "subtitle": {
      "en": "Relaxation, Wellbeing & Personal Care",
      "tr": "Huzur, Arınma ve Bütünsel Sağlık Deneyimi",
      "ru": "Релаксация, оздоровление и индивидуальный уход",
      "de": "Entspannung, Wohlbefinden & Ganzheitliche Pflege"
    },
    "description": {
      "en": "Directs the Lotus Spa, authentic Turkish hammam, sauna suites, treatment rooms and holistic wellbeing programs. Enforces strict hygiene, tranquil ambiance and therapist mastery for a rejuvenating Aegean sanctuary experience.",
      "tr": "Lotus Spa, geleneksel Türk hamamı, sauna, masaj odaları ve bakım terapilerini yönetir. Hijyen, dinginlik ve uzman terapist kadrosuyla misafirlere yenileyici bir sağlık ve huzur ortamı sunar.",
      "ru": "Руководит спа-комплексом, хаммамом, саунами и массажными кабинетами. Создает атмосферу умиротворения и гарантирует высочайший класс терапевтических и косметических процедур.",
      "de": "Leitet den Lotus Spa, das traditionelle Hamam, Saunalandschaften und Behandlungssuiten mit hochqualifizierten Therapeuten für vollkommene Regeneration."
    }
  },
  {
    "id": 31,
    "icon": "PartyPopper",
    "category": "wellness_recreation",
    "title": {
      "en": "RECREATION & ACTIVITIES MANAGER",
      "tr": "ANİMASYON VE EĞLENCE MÜDÜRÜ",
      "ru": "ДИРЕКТОР АНИМАЦИИ И РАЗВЛЕЧЕНИЙ",
      "de": "ENTERTAINMENT & RECREATION MANAGER"
    },
    "subtitle": {
      "en": "Leisure, Entertainment & Guest Experiences",
      "tr": "Gündüz Aktiviteleri, Sahne Gösterileri ve Neşeli Anlar",
      "ru": "Досуг, вечерние шоу и спортивные программы",
      "de": "Freizeit, Abendunterhaltung & Gästeerlebnisse"
    },
    "description": {
      "en": "Curates daytime fitness, aquatic games, yoga sessions, live music performances and amphitheater evening shows suited for guests of all ages and cultural backgrounds with high energy and refined taste.",
      "tr": "Gün boyu süren spor etkinliklerini, su jimnastiğini, akşam canlı müzik dinletilerini ve amfitiyatro sahne gösterilerini her yaştan misafir için neşeli ve kaliteli bir dille koordine eder.",
      "ru": "Организует дневной спорт, аквааэробику, вечерние концертные программы и акробатические шоу в амфитеатре, создавая праздничное настроение для взрослых и детей.",
      "de": "Gestaltet das abwechslungsreiche Sport-, Fitness- und Abendunterhaltungsprogramm mit hochkarätigen Shows und Live-Musik für Gäste aller Generationen."
    }
  },
  {
    "id": 32,
    "icon": "Waves",
    "category": "wellness_recreation",
    "title": {
      "en": "POOL & BEACH OPERATIONS TEAM",
      "tr": "HAVUZ VE PLAJ OPERASYONLARI EKİBİ",
      "ru": "СЛУЖБА ОБСЛУЖИВАНИЯ БАССЕЙНОВ И ПЛЯЖА",
      "de": "POOL- & STRAND-OPERATIONSTEAM"
    },
    "subtitle": {
      "en": "Seaside Comfort & Guest Safety",
      "tr": "Sahil Konforu, Şezlong Düzeni ve Deniz Keyfi",
      "ru": "Комфорт на побережье и чистота пляжной полосы",
      "de": "Strandkomfort & Badesicherheit an der Ägäis"
    },
    "description": {
      "en": "Manages Orka Lotus Beach's prominent 650-meter sandy shoreline, wooden piers, sun cabanas and pools. Responsible for sunbed organization, beach towel service, promenade cleanliness and guest water comfort.",
      "tr": "Otelin 650 metrelik özel kum sahilini, ahşap iskelelerini ve havuz alanlarını yönetir. Şezlong düzeni, plaj havlusu değişimi ve sahil temizliğini gün boyu kusursuz tutar.",
      "ru": "Обслуживает 650-метровый песчаный пляж, пирсы и бассейны курорта. Обеспечивает расстановку шезлонгов, выдачу полотенец и идеальную чистоту прибрежной зоны.",
      "de": "Betreut den 650 Meter langen Sandstrand, die Holzstege, Cabanas und Pools. Verantwortlich für Liegenordnung, Badetuchausgabe und Sauberkeit am Meer."
    }
  },
  {
    "id": 33,
    "icon": "LifeBuoy",
    "category": "wellness_recreation",
    "title": {
      "en": "LIFEGUARDS",
      "tr": "CANKURTARANLAR (LİSANSLI EKİP)",
      "ru": "СПАСАТЕЛИ НА ВОДЕ (СЕРТИФИЦИРОВАННАЯ СЛУЖБА)",
      "de": "RETTUNGSSCHWIMMER / LIFEGUARDS"
    },
    "subtitle": {
      "en": "Vigilance, Prevention & Guest Safety",
      "tr": "Sürekli Dikkat, Önleme ve Su Güvenliği",
      "ru": "Бдительность, безопасность на воде и спасение",
      "de": "Wachsamkeit, Prävention & Wassersicherheit"
    },
    "description": {
      "en": "Internationally certified aquatic rescue professionals actively monitoring all swimming pools, water slides and the Aegean sea bay. Equipped with rapid watercraft and trained in immediate CPR and life-saving intervention.",
      "tr": "Havuzlarda, su kaydıraklarında ve deniz kıyısında sürekli gözetim yapan uluslararası sertifikalı cankurtaranlar; olası riskleri önceden engeller ve acil müdahaleye hazır bekler.",
      "ru": "Сертифицированные спасатели непрерывно дежурят у бассейнов, аквапарка и на пирсах, обеспечивая безопасность взрослых и детей при купании.",
      "de": "Zertifizierte Rettungsschwimmer überwachen aktiv alle Poolanlagen, Wasserrutschen und den Strandabschnitt für unbeschwertes und sicheres Badevergnügen."
    }
  },
  {
    "id": 34,
    "icon": "Megaphone",
    "category": "commercial_hr",
    "title": {
      "en": "SALES & MARKETING MANAGER",
      "tr": "SATIŞ VE PAZARLAMA MÜDÜRÜ",
      "ru": "ДИРЕКТОР ПО ПРОДАЖАМ И МАРКЕТИНГУ",
      "de": "SALES & MARKETING DIRECTOR"
    },
    "subtitle": {
      "en": "Brand Positioning & Business Development",
      "tr": "Marka Konumlandırması ve Küresel Pazarlama",
      "ru": "Позиционирование бренда и развитие бизнеса",
      "de": "Markenpositionierung & Internationale Vermarktung"
    },
    "description": {
      "en": "Drives domestic and international market positioning, strategic tour operator partnerships, luxury travel agency relationships, contracts, marketing campaigns and brand prestige in key global feeder markets.",
      "tr": "Otelin yurt içi ve uluslararası pazarlardaki marka değerini, tur operatörü sözleşmelerini, lüks seyahat acentesi ilişkilerini ve küresel tanıtım kampanyalarını yönetir.",
      "ru": "Управляет продвижением курорта на международном рынке, контрактами с туроператорами, сотрудничеством с ведущими агентствами и формированием имиджа бренда.",
      "de": "Steuert die internationale Vermarktung, Kooperationen mit Reiseveranstaltern, Luxusreisebüros und weltweite Werbekampagnen zur Stärkung der Hotelmarke."
    }
  },
  {
    "id": 35,
    "icon": "Handshake",
    "category": "commercial_hr",
    "title": {
      "en": "SALES EXECUTIVES & CORPORATE RELATIONS",
      "tr": "SATIŞ YÖNETİCİLERİ VE KURUMSAL İLİŞKİLER",
      "ru": "СПЕЦИАЛИСТЫ ПО ПРОДАЖАМ И КОРПОРАТИВНЫМ СВЯЗЯМ",
      "de": "SALES EXECUTIVES & CORPORATE RELATIONS"
    },
    "subtitle": {
      "en": "Professional Business Relationships",
      "tr": "Profesyonel İş Birlikleri ve Kurumsal Çözümler",
      "ru": "Деловые партнерства и корпоративное сотрудничество",
      "de": "Geschäftskundenbetreuung & Partnerschaften"
    },
    "description": {
      "en": "Maintains close operational communication with travel partners, corporate accounts, wedding planners and group coordinators, presenting the hotel's five-star capabilities with detailed hospitality knowledge.",
      "tr": "Acenteler, kurumsal firmalar, düğün ve organizasyon planlayıcıları ile yakın bağ kurarak otelin kapasitesini ve ayrıcalıklı olanaklarını en doğru şekilde aktarır.",
      "ru": "Работают с корпоративными клиентами, организаторами свадебных и групповых туров, обеспечивая профессиональную реализацию контрактных условий.",
      "de": "Pflegen den persönlichen Kontakt zu Reiseagenturen, Firmenkunden und Eventveranstaltern und präsentieren die Vorzüge des Hauses im Detail."
    }
  },
  {
    "id": 36,
    "icon": "Globe",
    "category": "commercial_hr",
    "title": {
      "en": "DIGITAL MARKETING & COMMUNICATIONS TEAM",
      "tr": "DİJİTAL PAZARLAMA VE İLETİŞİM EKİBİ",
      "ru": "ОТДЕЛ ЦИФРОВОГО МАРКЕТИНГА И КОММУНИКАЦИЙ",
      "de": "DIGITAL MARKETING & COMMUNICATIONS TEAM"
    },
    "subtitle": {
      "en": "Modern Hospitality Communication",
      "tr": "Dijital Dünyada Zarafet ve Anlık İletişim",
      "ru": "Современные цифровые коммуникации и медиа",
      "de": "Digitale Medien & Zeitgemäße Kommunikation"
    },
    "description": {
      "en": "Curates the resort's digital presence, social media storytelling, official website, multilingual press relations and digital campaign imagery, communicating the living beauty of Orka Lotus Beach globally.",
      "tr": "Otelin web sitesini, sosyal medya kanallarını, görsel arşivini ve dijital iletişimini yöneterek Orka Lotus Beach'in büyüleyici atmosferini tüm dünyaya yansıtır.",
      "ru": "Управляет цифровым присутствием курорта, социальными сетями, фото- и видеоконтентом, передавая атмосферу отдыха и красоты Эгейского моря.",
      "de": "Verantwortet den Internetauftritt, die Social-Media-Kanäle und digitale Kampagnen zur stimmungsvollen Präsentation des Resorts im Netz."
    }
  },
  {
    "id": 37,
    "icon": "Cpu",
    "category": "engineering_it",
    "title": {
      "en": "IT MANAGER",
      "tr": "BİLGİ TEKNOLOJİLERİ (IT) MÜDÜRÜ",
      "ru": "РУКОВОДИТЕЛЬ ИТ-ОТДЕЛА (IT MANAGER)",
      "de": "IT MANAGER / LEITER INFORMATIONSTECHNOLOGIE"
    },
    "subtitle": {
      "en": "Technology, Connectivity & Hotel Systems",
      "tr": "Yüksek Hızlı Bağlantı, Siber Güvenlik ve Otel Sistemleri",
      "ru": "Информационные технологии, Wi-Fi и кибербезопасность",
      "de": "IT-Systeme, Vernetzung & Hoteltechnologie"
    },
    "description": {
      "en": "Maintains the complex digital backbone: property management systems (PMS), point-of-sale terminals, high-speed fiber guest Wi-Fi coverage across all rooms and beaches, data security and system uptime.",
      "tr": "Otel yönetim yazılımlarını (PMS), restoran POS cihazlarını, sahilde ve odalarda kesintisiz yüksek hızlı Wi-Fi erişimini ve siber veri güvenliğini 24 saat çalışır durumda tutar.",
      "ru": "Обеспечивает надежную работу гостиничной системы PMS, терминалов оплаты, бесшовного скоростного Wi-Fi на всей территории курорта и безопасность данных.",
      "de": "Garantiert den stabilen Betrieb aller Hotelmanagementsysteme, Kassensysteme, flächendeckendes Highspeed-WLAN am Strand und in den Zimmern sowie Datensicherheit."
    }
  },
  {
    "id": 38,
    "icon": "Info",
    "category": "rooms_front",
    "title": {
      "en": "GUEST SERVICES / CONCIERGE TEAM",
      "tr": "DANIŞMA VE KONSİYERJ (CONCIERGE) EKİBİ",
      "ru": "СЛУЖБА КОНСЬЕРЖЕЙ И ИНФОРМАЦИИ",
      "de": "CONCIERGE & GÄSTESERVICE"
    },
    "subtitle": {
      "en": "Personalized Assistance & Local Expertise",
      "tr": "Kişiselleştirilmiş Rehberlik ve Yerel Uzmanlık",
      "ru": "Индивидуальные рекомендации и экспертиза курорта",
      "de": "Persönliche Assistenz & Lokale Geheimtipps"
    },
    "description": {
      "en": "Serves as the knowledgeable bridge between guests and the destination. Arranges private yacht charters, Marmaris historical tours, car rentals, bespoke excursions and insider recommendations with polished flair.",
      "tr": "Misafirlerin Marmaris ve çevresini keşfetmeleri için özel yat kiralama, tarihi turlar, araç temini ve en seçkin rota önerilerini kişiye özel olarak organize eder.",
      "ru": "Знакомят гостей с достопримечательностями региона, бронируют индивидуальные яхтенные прогулки, экскурсии, аренду авто и делятся лучшими локациями Мармариса.",
      "de": "Unterstützt Gäste bei exklusiven Yacht-Charterungen, Ausflügen in die Region Marmaris, Mietwagenbuchungen und individuellen Freizeitwünschen."
    }
  },
  {
    "id": 39,
    "icon": "Luggage",
    "category": "rooms_front",
    "title": {
      "en": "BELL & LUGGAGE SERVICES",
      "tr": "VALİZ VE KARŞILAMA HİZMETLERİ (BELLBOY EKİBİ)",
      "ru": "СЛУЖБА БЕЛЛБОЕВ И ДОСТАВКИ БАГАЖА",
      "de": "BELLBOYS & GEPÄCKSERVICE"
    },
    "subtitle": {
      "en": "Courteous Arrival & Departure Assistance",
      "tr": "Nezaketle Karşılama, Bagaj Emniyeti ve Uğurlama",
      "ru": "Бережная доставка багажа и встреча у входа",
      "de": "Zuvorkommender Empfang & Gepäcktransfer"
    },
    "description": {
      "en": "Provides the first and last hands-on touch of resort hospitality. Escorts arriving guests, safeguards and delivers luggage smoothly to rooms, assists with departures and coordinates buggies across the pine terraces.",
      "tr": "Misafirin otele adım attığı ilk ve ayrıldığı son andaki güler yüzlü hizmettir. Bagajları özenle taşır, odalara ulaştırır ve golf arabalarıyla teraslar arası transferi sağlar.",
      "ru": "Первыми приветствуют гостей у входа в отель. Бережно доставляют багаж в номер, помогают при выезде и осуществляют развозку на гольф-карах по территории.",
      "de": "Empfangen Gäste herzlich bei der Ankunft, tragen und verstauen Gepäck sicher und unterstützen die Fortbewegung mit Club-Cars auf dem terrassenförmigen Areal."
    }
  },
  {
    "id": 40,
    "icon": "Car",
    "category": "rooms_front",
    "title": {
      "en": "TRANSPORTATION & TRANSFER COORDINATION",
      "tr": "ULAŞIM VE TRANSFER KOORDİNASYONU",
      "ru": "СЛУЖБА ТРАНСПОРТА И ТРАНСФЕРОВ",
      "de": "TRANSFER- & FAHRDIENST-KOORDINATION"
    },
    "subtitle": {
      "en": "Comfortable & Reliable Guest Transfers",
      "tr": "Konforlu, Güvenli ve Zamanında Havalimanı Ulaşımı",
      "ru": "Комфортный и пунктуальный трансфер из аэропорта",
      "de": "Zuverlässiger & Komfortabler Flughafentransfer"
    },
    "description": {
      "en": "Coordinates VIP and private airport transfers connecting Dalaman and Bodrum airports, luxury chauffeur vehicles and on-property mobility, ensuring seamless, stress-free travel from touch-down to check-in.",
      "tr": "Dalaman ve Bodrum havalimanlarından otele VIP transferleri, özel şoförlü lüks araçları ve otel içi ulaşım saatlerini hassasiyetle koordine eder.",
      "ru": "Организует комфортные индивидуальные и VIP-трансферы из аэропортов Даламан и Бодрум, гарантируя пунктуальность и удобство в пути.",
      "de": "Koordiniert exklusive VIP-Transfers von den Flughäfen Dalaman und Bodrum sowie Fahrservices für eine entspannte und sichere An- und Abreise."
    }
  },
  {
    "id": 41,
    "icon": "PhoneCall",
    "category": "rooms_front",
    "title": {
      "en": "RESERVATION & CALL CENTER / TELEPHONE SERVICES",
      "tr": "SANTRAL VE ÇAĞRI MERKEZİ HİZMETLERİ",
      "ru": "ТЕЛЕФОННАЯ СЛУЖБА И КОЛЛ-ЦЕНТР",
      "de": "TELEFONZENTRALE & GÄSTE-KOMMUNIKATION"
    },
    "subtitle": {
      "en": "Responsive Guest Communication",
      "tr": "Hızlı, Nazik ve Çözüm Odaklı İletişim Hattı",
      "ru": "Круглосуточная телефонная поддержка гостей",
      "de": "Kompetente Telefonvermittlung & Soforthilfe"
    },
    "description": {
      "en": "Acts as the central communication nerve center for external inquiries and internal room requests. Answers inquiries swiftly in multiple languages, dispatching tasks directly to engineering, housekeeping or room service.",
      "tr": "Dışarıdan gelen çağrıları ve oda telefonlarından gelen istekleri çok dilli olarak yanıtlar; talepleri anında ilgili departmanlara yönlendirerek takip eder.",
      "ru": "Оперативно принимает внутренние и внешние телефонные звонки на разных языках, координируя выполнение запросов с хаускипингом, рум-сервисом и техниками.",
      "de": "Nimmt interne und externe Anrufe mehrsprachig entgegen und leitet Wünsche unverzüglich an die zuständigen Fachabteilungen weiter."
    }
  },
  {
    "id": 42,
    "icon": "Shirt",
    "category": "housekeeping",
    "title": {
      "en": "LAUNDRY & LINEN SERVICES",
      "tr": "ÇAMAŞIRHANE VE TEKSTİL BAKIM HİZMETLERİ",
      "ru": "ПРАЧЕЧНАЯ И СЛУЖБА УХОДА ЗА ТЕКСТИЛЕМ",
      "de": "WÄSCHEREI & TEXTILPFLEGE"
    },
    "subtitle": {
      "en": "Immaculate Standards Behind the Scenes",
      "tr": "Kusursuz Beyazlık, Hijyen ve Özel Giysi Bakımı",
      "ru": "Стерильная чистота белья и бережная стирка",
      "de": "Makellose Wäschepflege & Textilhygiene"
    },
    "description": {
      "en": "Operates advanced industrial washing, pressing, dry cleaning and linen preservation machinery. Delivers crisp, fragrant bed sheets, plush beach towels and delicate garment dry cleaning directly to guest rooms.",
      "tr": "Endüstriyel yıkama, ütüleme ve kuru temizleme üniteleriyle otel çarşaflarının, havluların ve misafir giysilerinin en üst düzey hijyen ve titizlikle hazırlanmasını sağlar.",
      "ru": "Оснащена современным прачечным и гладильным оборудованием. Обеспечивает безупречную белизну постельного белья, свежесть махровых полотенец и деликатную химчистку одежды.",
      "de": "Verarbeitet Bettwäsche, Handtücher und Gästegarderobe mit modernen Wasch- und Bügelsystemen für höchste Sauberkeit und Frische."
    }
  },
  {
    "id": 43,
    "icon": "Moon",
    "category": "executive",
    "title": {
      "en": "NIGHT MANAGER / DUTY MANAGER",
      "tr": "GECE MÜDÜRÜ (NIGHT MANAGER)",
      "ru": "НОЧНОЙ УПРАВЛЯЮЩИЙ (NIGHT MANAGER)",
      "de": "NIGHT MANAGER / NACHTDIREKTOR"
    },
    "subtitle": {
      "en": "24-Hour Operational Continuity",
      "tr": "24 Saat Kesintisiz Operasyonel Nöbet ve Güven",
      "ru": "Круглосуточный непрерывный контроль и забота",
      "de": "24-Stunden Operative Kontinuität & Nachtaufsicht"
    },
    "description": {
      "en": "Holds senior executive authority during night hours. Oversees night audit reconciliation, late arrivals, early departures, emergency readiness and silent security rounds while the resort rests.",
      "tr": "Gece saatlerinde Genel Müdür adına tam yetkiyle görev yapar. Gece muhasebesi (night audit), geç girişler, acil durum hazırlığı ve gece güvenliğini eksiksiz yönetir.",
      "ru": "Обладает полномочиями руководителя в ночное время. Контролирует ночной аудит, поздние заезды, ранние трансферы и ночную безопасность всего отеля.",
      "de": "Führt das Hotel während der Nachtstunden in voller Managementverantwortung. Überwacht den Night Audit, späte Anreisen und die Sicherheit des schlafenden Hauses."
    }
  },
  {
    "id": 44,
    "icon": "Clock",
    "category": "executive",
    "title": {
      "en": "DUTY MANAGERS",
      "tr": "NÖBETÇİ MÜDÜRLER (DUTY MANAGERS)",
      "ru": "ДЕЖУРНЫЕ УПРАВЛЯЮЩИЕ (DUTY MANAGERS)",
      "de": "DUTY MANAGERS / DIENSTHABENDE DIREKTOREN"
    },
    "subtitle": {
      "en": "Immediate Leadership & Guest Resolution",
      "tr": "Anında Karar Alma, Çözüm Odaklılık ve Saha Liderliği",
      "ru": "Оперативное решение вопросов и лидерство на местах",
      "de": "Direkte Präsenz & Sofortige Problemlösung"
    },
    "description": {
      "en": "Accessible senior management representatives active on the floor during each shift, authorized to make immediate decisions, resolve guest inquiries and cross-coordinate departments for service excellence.",
      "tr": "Vardiyaları boyunca sahada aktif olarak bulunan, misafir ihtiyaçlarını anında çözme yetkisine sahip, operasyonel ahengi koruyan üst düzey yönetim temsilcileridir.",
      "ru": "Полномочные представители дирекции на сменах, оперативно принимающие решения, лично помогающие гостям и координирующие работу всех служб отеля.",
      "de": "Präsente Managementvertreter vor Ort, die ermächtigt sind, unmittelbare Entscheidungen zu treffen und Gästewünsche ohne Zeitverlust zu erfüllen."
    }
  },
  {
    "id": 45,
    "icon": "CheckCircle2",
    "category": "safety_security",
    "title": {
      "en": "QUALITY, HYGIENE & FOOD SAFETY PERSONNEL",
      "tr": "KALİTE, HİJYEN VE GIDA GÜVENLİĞİ DENETÇİLERİ",
      "ru": "СЛУЖБА КОНТРОЛЯ КАЧЕСТВА, ГИГИЕНЫ И БЕЗОПАСНОСТИ ПИТАНИЯ",
      "de": "QUALITÄTS-, HYGIENE- & LEBENSMITTELSICHERHEITSBEAUFTRAGTE"
    },
    "subtitle": {
      "en": "Protecting the Highest Standards",
      "tr": "En Yüksek Sağlık, Hijyen ve Gıda Güvenliği Denetimi",
      "ru": "Защита строжайших норм чистоты и безопасности",
      "de": "Wahrung höchster Hygiene- & Sicherheitsnormen"
    },
    "description": {
      "en": "Certified food engineers and hygiene specialists conducting daily laboratory sample testing, temperature logging across cold storages, ISO audit verifications and strict sanitary enforcement in all kitchens.",
      "tr": "Gıda mühendisleri ve hijyen uzmanlarından oluşan kadro; günlük mikrobiyolojik numuneler alır, soğuk zincir sıcaklıklarını takip eder ve mutfak hijyenini bağımsız denetler.",
      "ru": "Сертифицированные инженеры пищевой промышленности и микробиологи ежедневно тестируют пробы блюд, контролируют температурный режим и санитарное состояние кухонь.",
      "de": "Lebensmittelingenieure und Hygienebeauftragte führen tägliche Laborproben, Temperaturkontrollen der Kühlketten und ISO-Audits in allen Küchen durch."
    }
  },
  {
    "id": 46,
    "icon": "HeartPulse",
    "category": "safety_security",
    "title": {
      "en": "HEALTH & SAFETY COORDINATION (MEDICAL & SAFETY)",
      "tr": "İŞ SAĞLIĞI, GÜVENLİĞİ VE SAĞLIK KOORDİNASYONU",
      "ru": "СЛУЖБА ОХРАНЫ ЗДОРОВЬЯ, БЕЗОПАСНОСТИ И МЕДИЦИНСКОЙ ПОМОЩИ",
      "de": "GESUNDHEITS-, ARBEITSSCHUTZ- & MEDIZINISCHE KOORDINATION"
    },
    "subtitle": {
      "en": "A Culture of Prevention & On-Site Medical Care",
      "tr": "Önleme Kültürü ve Tesis İçi Sağlık & İlk Yardım Güvencesi",
      "ru": "Культура превентивной защиты и квалифицированная медпомощь",
      "de": "Präventionskultur & Medizinische Vor-Ort-Versorgung"
    },
    "description": {
      "en": "Dedicated to accident prevention, fire safety engineering, emergency evacuation preparedness and professional on-site medical consultation in collaboration with licensed healthcare practitioners.",
      "tr": "Kaza önleme sistemlerini, yangın güvenlik donanımlarını, acil tahliye tatbikatlarını ve otel içi doktor/hemşire sağlık kabini hizmetlerini koordineli olarak yürütür.",
      "ru": "Координирует меры противопожарной безопасности, профилактику травматизма, протоколы эвакуации и работу лицензированного медицинского кабинета для гостей.",
      "de": "Verantwortet Unfallverhütung, Brandschutz, Notfallpläne und die medizinische Versorgung vor Ort in enger Zusammenarbeit mit Ärzten und Pflegekräften."
    }
  },
  {
    "id": 47,
    "icon": "FileText",
    "category": "commercial_hr",
    "title": {
      "en": "ADMINISTRATION TEAM",
      "tr": "İDARİ İŞLER VE YÖNETİM OFİSİ",
      "ru": "АДМИНИСТРАТИВНЫЙ ОТДЕЛ",
      "de": "VERWALTUNGS- & BETRIEBSTEAM"
    },
    "subtitle": {
      "en": "Professional Operational Support",
      "tr": "Profesyonel Büro Desteği ve Belge Yönetimi",
      "ru": "Документооборот и административная поддержка",
      "de": "Professionelle Administration & Betriebsunterstützung"
    },
    "description": {
      "en": "Manages statutory documentation, licensing, contract archives, inter-office correspondence and logistical paperwork required to ensure the smooth organizational functioning of a 5-star resort.",
      "tr": "Otelin resmi yazışmalarını, lisans süreçlerini, sözleşme arşivini ve departmanlar arası evrak akışını yasal mevzuata uygun şekilde yürütür.",
      "ru": "Обеспечивает правовую и нормативную поддержку, координацию договоров, лицензий и документооборота, необходимых для стабильной работы пятизвездочного отеля.",
      "de": "Gewährleistet den reibungslosen Ablauf aller bürokratischen, behördlichen und vertraglichen Vorgänge im Hintergrund des Hotelbetriebs."
    }
  },
  {
    "id": 48,
    "icon": "FileSignature",
    "category": "executive",
    "title": {
      "en": "EXECUTIVE SECRETARY / MANAGEMENT ASSISTANT",
      "tr": "YÖNETİM KURULU VE GENEL MÜDÜR ASİSTANI",
      "ru": "ПОМОЩНИК ГЕНЕРАЛЬНОГО ДИРЕКТОРА / СЕКРЕТАРИАТ",
      "de": "EXECUTIVE ASSISTANT / DIREKTIONSASSISTENZ"
    },
    "subtitle": {
      "en": "Confidential Executive Support",
      "tr": "Üst Düzey Yönetici Asistanlığı ve Güvenilir Koordinasyon",
      "ru": "Конфиденциальная поддержка высшего руководства",
      "de": "Vertrauliche Direktionsassistenz & Chefsekretariat"
    },
    "description": {
      "en": "Provides confidential, refined administrative assistance to the General Manager. Manages executive itineraries, high-level correspondence, board agendas and VIP guest protocol with utmost discretion.",
      "tr": "Genel Müdür ve icra kuruluna üst düzey asistanlık sağlar. Yönetici takvimlerini, kritik yazışmaları, kurul toplantılarını ve VIP protokol hazırlıklarını tam gizlilikle koordine eder.",
      "ru": "Оказывает персональную административную поддержку руководству отеля, организует график Генерального директора, деловую переписку и протокол приема VIP-гостей.",
      "de": "Unterstützt den General Manager bei vertraulichen Terminen, Vorstandssitzungen, offizieller Korrespondenz und dem Empfang hochrangiger Gäste."
    }
  },
  {
    "id": 49,
    "icon": "Heart",
    "category": "commercial_hr",
    "title": {
      "en": "GENERAL STAFF & SERVICE PERSONNEL",
      "tr": "GENEL PERSONEL VE HİZMET EKİPLERİ",
      "ru": "ОБЩИЙ ПЕРСОНАЛ И СЛУЖБА ЗАБОТЫ",
      "de": "GESAMTES MITARBEITER- & SERVICETEAM"
    },
    "subtitle": {
      "en": "The Heart of Everyday Hospitality",
      "tr": "Günlük Misafirperverliğin Atan Kalbi",
      "ru": "Сердце ежедневного искреннего гостеприимства",
      "de": "Das Herz der täglichen Gastfreundschaft"
    },
    "description": {
      "en": "Behind every successful five-star resort is a committed team of over 350 skilled professionals whose quiet dedication breathes life into Orka Lotus Beach every single day. From garden landscapers and kitchen porters to drivers, technicians and cleaners, every member upholds our core standards with pride.",
      "tr": "Başarılı her 5 yıldızlı tatil deneyiminin ardında, 350'den fazla özverili personelin görünmeyen emeği yatar. Bahçıvanlardan bulaşıkhaneye, şoförlerden teknisyenlere kadar her çalışanımız ortak değerlerimizi gururla temsil eder.",
      "ru": "За каждым идеальным днем отдыха стоит слаженный труд более 350 профессионалов своего дела. От садовников и подсобных рабочих до водителей и горничных — каждый сотрудник бережно хранит репутацию отеля.",
      "de": "Hinter jedem unvergesslichen Urlaubstag steht ein engagiertes Team von über 350 Fachkräften. Von den Gärtnern bis zum Servicenachwuchs trägt jeder Einzelne mit Leidenschaft zum Fünf-Sterne-Erlebnis bei."
    },
    "standards": {
      "en": [
        "Professional appearance and grooming",
        "Respectful, warm and clear communication",
        "Unfailing courtesy, patience and discretion",
        "Reliability, punctuality and accountability",
        "Cultural sensitivity and international awareness",
        "Collaborative teamwork across all departments",
        "Deep product, service and resort knowledge",
        "Meticulous attention to the smallest details",
        "Guest-focused mindset: every stay matters"
      ],
      "tr": [
        "Profesyonel ve kusursuz kişisel görünüm",
        "Saygılı, samimi ve berrak iletişim",
        "Tükenmeyen nezaket, sabır ve mahremiyete saygı",
        "Güvenilirlik, dakiklik ve sorumluluk bilinci",
        "Kültürel duyarlılık ve uluslararası misafir anlayışı",
        "Departmanlar arası uyumlu ve güçlü takım ruhu",
        "Otel tesisleri ve hizmetleri hakkında tam bilgi",
        "En küçük detaylara dahi titizlikle özen gösterme",
        "Misafir odaklı düşünce: Her konaklama bizim için özeldir"
      ],
      "ru": [
        "Безупречный внешний вид и соблюдение дресс-кода",
        "Уважительное, теплое и вежливое общение",
        "Неизменная учтивость, терпение и тактичность",
        "Надежность, пунктуальность и ответственность",
        "Межкультурная чуткость и уважение к гостям всех стран",
        "Слаженная командная работа между отделами",
        "Глубокое знание услуг, концепции и территории отеля",
        "Внимание к мельчайшим деталям сервиса",
        "Искренняя забота о впечатлениях каждого гостя"
      ],
      "de": [
        "Professionelles und gepflegtes Erscheinungsbild",
        "Respektvolle, herzliche und klare Kommunikation",
        "Höchste Zuvorkommenheit, Geduld und Diskretion",
        "Zuverlässigkeit, Pünktlichkeit und Pflichtbewusstsein",
        "Kulturelle Sensibilität und internationale Weltoffenheit",
        "Abteilungsübergreifender Teamgeist und Kollegialität",
        "Umfassende Kenntnis aller Resort-Einrichtungen und Services",
        "Akribische Liebe zum kleinsten Detail",
        "Gästeorientiertes Denken: Jeder Gast ist eine geschätzte Persönlichkeit"
      ]
    }
  }
]
};
