import { GoogleGenAI } from "@google/genai";
import { config } from "../config";
import { getLiveMarmarisDate } from "./timeService";
import { getLiveMarmarisWeather } from "./weatherService";

export interface ConciergeMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ConciergeLink {
  label: string;
  url: string;
  category?: string;
}

export interface ConciergeResponse {
  reply: string;
  detectedLanguage: string;
  intent: string;
  source: "gemini" | "verified_knowledge" | "fallback";
  confidence: "high" | "medium" | "low";
  links: ConciergeLink[];
  suggestedQuestions: string[];
}

export const MANDATORY_CLOSING = "Your satisfaction is our goal. Experience the finest hospitality at Orka Lotus Beach Hotel.";

// Structured Link Mapping Directory
export const INTERNAL_LINKS: Record<string, { label: string; url: string; keywords: string[] }> = {
  dining: {
    label: "Discover Dining & Bars",
    url: "/restaurants-bars",
    keywords: ["eat", "food", "dining", "restaurant", "breakfast", "lunch", "dinner", "snack", "bar", "cocktail", "wine", "buffet", "a'la carte", "yemek", "restoran", "kahvaltı", "akşam yemeği", "öğle yemeği", "ресторан", "завтрак", "обед", "ужин", "бар", "frühstück", "essen"],
  },
  poolsBeach: {
    label: "Explore Pools & Beach",
    url: "/pools-beach",
    keywords: ["beach", "pool", "sea", "pier", "sunbed", "towel", "aquapark", "slide", "swim", "havuz", "plaj", "deniz", "iskele", "şezlong", "havlu", "пляж", "бассейн", "море", "полотенце", "akvapark", "strand", "meer"],
  },
  watersports: {
    label: "Discover Watersports",
    url: "/watersports",
    keywords: ["watersport", "jet ski", "parasailing", "banana", "flyboard", "wakeboard", "boat", "su sporları", "tekne", "водный спорт", "джетски", "парасейлинг", "wassersport"],
  },
  spa: {
    label: "Explore Spa & Wellness",
    url: "/activities-spa",
    keywords: ["spa", "massage", "hamam", "sauna", "wellness", "fitness", "gym", "steam", "masaj", "hamam", "buhar", "спа", "массаж", "сауна", "хамам", "фитнес"],
  },
  rooms: {
    label: "Explore Rooms & Suites",
    url: "/rooms-services",
    keywords: ["room", "suite", "bed", "accommodation", "swim-up", "view", "balcony", "minibar", "safe", "housekeeping", "oda", "konaklama", "yatak", "номер", "комната", "проживание", "zimmer", "unterkunft"],
  },
  orkaHomes: {
    label: "Explore ORKA HOMES",
    url: "/orka-homes",
    keywords: ["orka homes", "real estate", "property", "villa", "apartment", "investment", "turunç", "içmeler", "satılık", "emlak", "gayrimenkul", "вилла", "недвижимость", "апартаменты", "immobilien"],
  },
  management: {
    label: "Hotel Management & Personnel",
    url: "/management-personnel",
    keywords: ["general manager", "management", "personnel", "staff", "director", "şenol and", "duty manager", "reception manager", "chef", "yönetim", "personel", "müdür", "персонал", "руководство", "директор"],
  },
  medical: {
    label: "Medical & Health Services",
    url: "/medical",
    keywords: ["doctor", "nurse", "medical", "clinic", "hospital", "health", "medicine", "emergency", "doktor", "hemşire", "sağlık", "hastane", "ilaç", "врач", "доктор", "медсестра", "аптека", "больница", "arzt"],
  },
  miniClub: {
    label: "Explore Mini Club & Kids",
    url: "/mini-club",
    keywords: ["kids", "child", "children", "mini club", "family", "baby", "çocuk", "bebek", "aile", "дети", "детский клуб", "семья", "kinder"],
  },
  shops: {
    label: "Explore Hotel Boutiques & Shops",
    url: "/shops",
    keywords: ["shop", "boutique", "jewelry", "leather", "aksoy", "market", "photographer", "mağaza", "alışveriş", "kuyumcu", "deri", "магазин", "бутик", "шопинг", "einkaufen"],
  },
  marmaris: {
    label: "Discover Marmaris & Region",
    url: "/marmaris",
    keywords: ["marmaris", "içmeler", "turunç", "excursion", "castle", "marina", "dalyan", "cleopatra", "kale", "çarşı", "мармарис", "экскурсия", "замок", "марина", "ausflug"],
  },
  hotelDirectory: {
    label: "View Hotel Directory (A-Z)",
    url: "/hotel-directory",
    keywords: ["directory", "guide", "a-z", "hours", "facility", "rules", "rehber", "fihrist", "kurallar", "справочник", "гид", "услуги", "verzeichnis"],
  },
  iconBeach: {
    label: "Discover Icon Beach Club",
    url: "/icon-beach",
    keywords: ["icon beach", "beach club", "party", "cocktail", "dj", "sunset beach"],
  },
  heritage: {
    label: "Our Heritage (Orka Legacy)",
    url: "/orka-legacy",
    keywords: ["legacy", "history", "heritage", "story", "founder", "tarihçe", "hikaye", "история", "наследие", "geschichte"],
  },
  contact: {
    label: "Contact Guest Relations & Reception",
    url: "/contact",
    keywords: ["contact", "phone", "email", "reception", "guest relations", "front desk", "iletişim", "telefon", "resepsiyon", "misafir ilişkileri", "контакты", "телефон", "ресепшн", "kontakt"],
  },
};

// Hotel Knowledge Base Text for Gemini System Instruction
export const HOTEL_MASTER_KNOWLEDGE = `
YOU ARE THE DIGITAL CONCIERGE OF ORKA LOTUS BEACH HOTEL.
LOCATION: Marmaris - Içmeler Coast, Pamucak Mevkii, Aegean Riviera, Muğla, Turkey.
CONCEPT: Ultra All-Inclusive (UAI) 5-Star Luxury Beach Resort, where pine forests meet turquoise waters.

KEY HOTEL VERIFIED INFORMATION:
1. BEACH & SEA:
- 650-meter pristine Blue Flag sand/pebble beach.
- 2 private luxury swimming piers with sun loungers and cabanas.
- Crystal-clear, calm Aegean sea, ideal for swimming and watersports.
- Towel Desks open daily 08:30–18:00 (free with towel card received at check-in).

2. POOLS & AQUAPARK:
- Main Outdoor Pool: Spacious pool with sunbeds and parasols (08:00–19:00).
- Relax Pool: Quiet adults-friendly pool nestled under pine trees.
- Aquapark: 5 thrilling water slides for adults and children (open 10:00–12:00 and 14:00–16:30).
- Children's Splash Pool: Shallow, shaded safe water fun.
- Indoor Heated Thalasso & Spa Pool: Inside Lotus Spa (09:00–20:00).

3. DINING & RESTAURANTS (Ultra All-Inclusive):
- Lotus Main Restaurant: Open buffet with international & Aegean themes.
  * Breakfast: 07:00 – 10:30
  * Late Breakfast: 10:30 – 11:00
  * Lunch: 12:30 – 14:00
  * Dinner: 19:00 – 21:30
  * Midnight Buffet & Soup: 00:00 – 07:00
- A'la Carte Restaurants (Reservation required via Guest Relations):
  * Turquoise Seafood & Fish: Fresh Aegean catches, mezze, seafront dining.
  * Olive Italian Restaurant: Homemade pasta, risotto, Italian classics, fine wines.
  * Asian & Sushi: Authentic Far Eastern delicacies and handcrafted sushi.
  * Steakhouse: Premium dry-aged cuts and charcoal grill meats.
- Patisserie & Snacks:
  * Lotus Patisserie: Fresh pastries, desserts, ice cream, coffee (11:00 – 18:00).
  * Pool & Beach Snack Bars: Burgers, pizzas, salads, sandwiches (12:00 – 16:00).
  * Traditional Turkish Gözleme tent: Hand-rolled flatbreads (11:00 – 16:00).

4. BARS & BEVERAGES:
- Lobby Bar: Open 24 HOURS, serving premium local and imported beverages.
- Lotus Pool Bar: 10:00 – 00:00
- Beach Bar & Pier Bar: 10:00 – 18:00
- Sunset Bar / Lounge: 18:00 – 02:00
- Vitamin Spa Bar: Fresh juices, detox smoothies, herbal teas.

5. SPA & WELLNESS (Lotus Spa):
- Open daily: 09:00 – 20:00
- Traditional Turkish Hamam (bath) and scrub (kese) rituals.
- Finnish Sauna and Eucalyptus Steam Bath.
- Massage therapies: Swedish, Balinese, Aromatherapy, Hot Stone, Deep Tissue.
- Fitness Center: Modern cardio & weight training machines (08:00 – 20:00, free).

6. WATERSPORTS & BEACH ACTIVITIES:
- Jet Ski, Parasailing, Banana Boat, Flyboard, Wakeboarding, Waterskiing, Ringo.
- Stand-Up Paddleboard (SUP) and Sea Kayak rentals.
- Certified professional instructors, strict safety equipment & lifejackets mandatory.
- Icon Beach Club: Exclusive seaside beach club with artisan cocktails, VIP cabanas, and sunset DJ sessions.

7. MINI CLUB & CHILDREN:
- Lotus Mini Club (ages 4–12): Open 10:00–12:30 and 14:30–17:00.
- Daily themed activities: treasure hunts, face painting, arts & crafts, pool games.
- Mini Disco every evening at 20:30 at the Amphitheatre.

8. ORKA HOMES:
- Real estate and luxury property division of Orka Group.
- Developing and offering luxury private villas, designer apartments, and investment residences across Turunç, Içmeler, and Marmaris.
- Dedicated ORKA HOMES consultation desk located near the main hotel pool area.

9. MANAGEMENT & PERSONNEL (49 ROLES):
- General Manager: Şenol And — leading the resort's operational excellence and 5-star standards.
- Executive AGM, Operations Manager, Rooms Division Manager, Front Office Manager, Reception Manager, Guest Relations Manager, Reservations & Revenue Managers.
- Food & Beverage Director, Executive Chef, Sous Chefs, Restaurant & Bar Managers, Stewarding.
- Executive Housekeeper, Floor Supervisors, Public Area teams.
- Chief Engineer & Maintenance specialists (available 24/7 for technical support).
- Security Manager & licensed officers (24/7 surveillance and guest safety).
- Spa Manager, Recreation Manager, Certified Lifeguards on beach and pools.
- On-site Hotel Doctor and Registered Nurse at the Medical Center.
- Night Manager & Duty Managers (present on duty 24/7).

10. GUEST POLICIES & CONVENIENCE:
- Check-in: 14:00 | Check-out: 12:00 (Late check-out subject to availability via Reception).
- Wi-Fi: High-speed complimentary wireless internet resort-wide.
- Electronic Safe: Complimentary in all rooms.
- Minibar: Daily complimentary refill of soft drinks, water, and beer.
- Room Service: 24-hour in-room dining menu available (room service charge applies).
- Currency Exchange & Cards: Reception handles major foreign currencies, Visa, Mastercard.
- Medical Clinic: On-site doctor and nurse available during working hours; 24/7 on call.
- Emergency: Reception Ext: 0 | Medical: Ext: 1112 | Turkey Emergency: 112.
- Local transport: Dolmuş (minibus) to Marmaris and Içmeler departs right outside the main hotel gate every 10-15 minutes. Water taxis operate from Içmeler/Marmaris harbour.

11. NEARBY ATTRACTIONS (MARMARIS & REGION):
- Marmaris Castle & Archaeology Museum (approx. 6 km)
- Netsel Marina with luxury yachts, shopping, and waterfront cafes
- Içmeler Bay (approx. 1.5 km walking along scenic seaside promenade)
- Turunç Village (scenic mountain/sea drive, approx. 12 km)
- Daily Boat Trips: Dalyan, Turtle Beach, Kaunos rock tombs, Cleopatra (Sedir) Island.
`;

function cleanConciergeText(raw: string): string {
  if (!raw) return "";
  return raw
    // Strip bold/italic markdown asterisks (**text** or *text*)
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    // Replace markdown asterisk bullet items (* bullet) with clean bullet dot (• bullet)
    .replace(/^\s*\*\s+/gm, "• ")
    // Strip any remaining asterisks
    .replace(/\*/g, "")
    // Strip markdown heading hashes (# Title -> Title)
    .replace(/^#{1,6}\s+/gm, "")
    // Strip backticks
    .replace(/`/g, "")
    // Strip blockquote markers
    .replace(/^>\s+/gm, "")
    .trim();
}

export class ConciergeService {
  private ai: GoogleGenAI | null = null;
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY || null;
    if (this.apiKey) {
      try {
        this.ai = new GoogleGenAI({
          apiKey: this.apiKey,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });
      } catch (err) {
        console.warn("[ConciergeService] Failed to initialize GoogleGenAI client:", err);
      }
    }
  }

  /**
   * Helper to detect links based on message content or question keywords
   */
  public detectLinks(text: string): ConciergeLink[] {
    const lower = text.toLowerCase();
    const matched: ConciergeLink[] = [];

    for (const [key, item] of Object.entries(INTERNAL_LINKS)) {
      const isMatch = item.keywords.some((kw) => lower.includes(kw));
      if (isMatch) {
        matched.push({
          label: item.label,
          url: item.url,
          category: key,
        });
      }
    }

    // Default top helpful links if none matched
    if (matched.length === 0) {
      matched.push(
        { label: "Discover Dining & Bars", url: "/restaurants-bars" },
        { label: "Explore Pools & Beach", url: "/pools-beach" },
        { label: "Contact Guest Relations", url: "/contact" }
      );
    }

    // Limit to 4 relevant links
    return matched.slice(0, 4);
  }

  /**
   * Generate suggested follow-up questions
   */
  public generateSuggestions(userQuestion: string, intent: string): string[] {
    const q = userQuestion.toLowerCase();

    if (q.includes("kahvalt") || q.includes("breakfast") || q.includes("завтрак") || q.includes("frühstück")) {
      return [
        "What time is dinner tonight?",
        "How can I book an A'la Carte restaurant?",
        "Where is the beach bar?",
      ];
    }
    if (q.includes("yemek") || q.includes("restaurant") || q.includes("dining") || q.includes("food")) {
      return [
        "What are the A'la Carte restaurant options?",
        "What time does the Lotus Patisserie open?",
        "Where can I get late night soup?",
      ];
    }
    if (q.includes("plaj") || q.includes("beach") || q.includes("havuz") || q.includes("pool")) {
      return [
        "Where can I exchange pool towels?",
        "What are the Aquapark opening hours?",
        "What watersports activities are available?",
      ];
    }
    if (q.includes("orka homes") || q.includes("villa") || q.includes("emlak") || q.includes("real estate")) {
      return [
        "Where is the ORKA HOMES hotel desk located?",
        "What properties are available in Turunç and Içmeler?",
        "How can I arrange a property consultation?",
      ];
    }
    if (q.includes("oda") || q.includes("room") || q.includes("check-in") || q.includes("checkout")) {
      return [
        "What time is check-out?",
        "How do I request housekeeping or fresh towels?",
        "Is room service available 24/7?",
      ];
    }
    if (q.includes("doktor") || q.includes("doctor") || q.includes("sağlık") || q.includes("medical")) {
      return [
        "Where is the on-site Medical Clinic located?",
        "How do I reach Reception immediately?",
        "What is the emergency phone number?",
      ];
    }

    return [
      "What are the daily activities today?",
      "Where is the Lotus Spa & Hamam?",
      "Tell me about ORKA HOMES luxury villas.",
      "Who is the General Manager?",
    ];
  }

  /**
   * Detect guest language roughly for verification and metadata
   */
  public detectLanguage(text: string): string {
    const t = text.toLowerCase();
    // Turkish
    if (/[çğışöü]/.test(t) || t.includes("nerede") || t.includes("saat") || t.includes("nasıl") || t.includes("lütfen") || t.includes("otel")) {
      return "tr";
    }
    // Russian
    if (/[а-яё]/.test(t)) {
      return "ru";
    }
    // German
    if (/[äöüß]/.test(t) || t.includes("wo ist") || t.includes("wann") || t.includes("danke") || t.includes("zimmer")) {
      return "de";
    }
    // Persian / Arabic
    if (/[\u0600-\u06FF]/.test(t)) {
      return "fa/ar";
    }
    // French
    if (t.includes("bonjour") || t.includes("où est") || t.includes("merci")) {
      return "fr";
    }
    return "en";
  }

  /**
   * Primary Chat Processing Method
   */
  public async chat(
    userMessage: string,
    history: ConciergeMessage[] = [],
    currentPage = "/"
  ): Promise<ConciergeResponse> {
    const liveDate = getLiveMarmarisDate();
    const formattedTime = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Istanbul",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());

    let liveWeather = { temperature: 28, condition: "Sunny", city: "Marmaris" };
    try {
      const w = await getLiveMarmarisWeather();
      liveWeather = {
        temperature: w.temperature,
        condition: w.conditionName?.en || "Sunny",
        city: w.city,
      };
    } catch {
      // fallback
    }

    const detectedLang = this.detectLanguage(userMessage);

    // 1. If Gemini API is configured, use gemini-3.8-flash
    if (this.ai) {
      try {
        const systemPrompt = `
You are the Senior AI Concierge and 5-Star Digital Guest Assistant for ORKA LOTUS BEACH HOTEL.
You communicate as a refined, knowledgeable, warm, and highly professional five-star hotel concierge.

CURRENT REAL-TIME CONTEXT:
- Local Marmaris Time: ${formattedTime} (Timezone: Europe/Istanbul)
- Date: ${liveDate.weekday}, ${liveDate.day} ${liveDate.monthName} ${liveDate.year}
- Current Weather in Marmaris: ${liveWeather.temperature}°C, ${liveWeather.condition}
- User Current Page: ${currentPage}

STRICT OPERATIONAL RULES:
1. ALWAYS answer in the EXACT SAME LANGUAGE the guest used (e.g. if asked in Turkish, respond in natural Turkish; if in Russian, respond in Russian; if in German, respond in German; if in Persian, respond in Persian; if in English, respond in English).
2. PRIORITIZE VERIFIED HOTEL FACTS from the knowledge base below.
3. NEVER HALLUCINATE: Never invent room numbers, staff names, unconfirmed prices, or unverified policies. If unknown, say so with poise and direct them to Reception or Guest Relations.
4. WEBSITE NAVIGATION: When relevant, suggest exploring the relevant hotel page using clickable markdown links such as:
   - [Explore Dining & Bars](/restaurants-bars)
   - [Explore Pools & Beach](/pools-beach)
   - [Discover Watersports](/watersports)
   - [Explore Spa & Wellness](/activities-spa)
   - [Explore Rooms & Suites](/rooms-services)
   - [Explore ORKA HOMES](/orka-homes)
   - [Hotel Management & Personnel](/management-personnel)
   - [Medical Center](/medical)
   - [Mini Club & Children](/mini-club)
   - [Hotel Boutiques & Shops](/shops)
   - [Discover Marmaris](/marmaris)
   - [Contact Reception & Guest Relations](/contact)
5. TONE: 5-Star hospitality standard — elegant, calm, warm, respectful, concise, never verbose, never robotic.
6. COMPLAINTS & EMERGENCIES: If the guest expresses a complaint or emergency, express sincere empathy, prioritize their safety/comfort, and direct them immediately to Reception (Ext: 0), Duty Manager, or Medical Clinic.
7. MANDATORY CLOSING: You MUST end EVERY response with the exact sentence on a new line:
${MANDATORY_CLOSING}
8. CRITICAL FORMATTING MANDATE: NEVER USE ASTERISKS (*) UNDER ANY CIRCUMSTANCE. Do NOT use markdown bold (no **word**), do NOT use markdown italics (no *word*), and do NOT use asterisks for bullet points (no * item). When listing points, use a clean dash (-) or bullet dot (•) followed by a space. Do not use unwanted symbols or strange characters like #, ##, ***, or backticks. Always deliver clean, pristine, beautifully phrased plain text.

OFFICIAL HOTEL KNOWLEDGE BASE:
${HOTEL_MASTER_KNOWLEDGE}
`;

        // Format conversation history for Gemini
        const contents = [
          ...history.slice(-6).map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: cleanConciergeText(msg.content) }],
          })),
          {
            role: "user",
            parts: [{ text: userMessage }],
          },
        ];

        const geminiPromise = this.ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.6,
          },
        });

        // 8 second safety timeout so guest is never left waiting
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Gemini API call timed out")), 8000)
        );

        const response = await Promise.race([geminiPromise, timeoutPromise]);

        let replyText = cleanConciergeText(response.text || "");

        // Enforce mandatory closing if omitted
        if (!replyText.includes("Your satisfaction is our goal")) {
          replyText = `${replyText.trim()}\n\n${MANDATORY_CLOSING}`;
        }
        replyText = cleanConciergeText(replyText);

        const links = this.detectLinks(userMessage + " " + replyText);
        const suggestions = this.generateSuggestions(userMessage, "general").map(cleanConciergeText);

        return {
          reply: replyText,
          detectedLanguage: detectedLang,
          intent: "general",
          source: "gemini",
          confidence: "high",
          links,
          suggestedQuestions: suggestions,
        };
      } catch (err) {
        console.error("[ConciergeService] Gemini call failed, falling back to verified knowledge engine:", err);
      }
    }

    // 2. Verified Knowledge Engine Fallback (Guarantees instant 100% uptime and 5-star accuracy)
    return this.generateVerifiedFallback(
      userMessage,
      detectedLang,
      { formattedTime, dayOfWeek: liveDate.weekday },
      { tempC: liveWeather.temperature, condition: liveWeather.condition }
    );
  }

  /**
   * Verified Knowledge Engine Fallback:
   * Generates intelligent, native multilingual replies using the verified hotel knowledge database.
   */
  private generateVerifiedFallback(
    question: string,
    lang: string,
    time: { formattedTime: string; dayOfWeek: string },
    weather: { tempC: number; condition: string }
  ): ConciergeResponse {
    const q = question.toLowerCase().trim();
    let reply = "";
    const links: ConciergeLink[] = this.detectLinks(question);
    const suggestions: string[] = this.generateSuggestions(question, "general").map(cleanConciergeText);

    // English responses
    if (lang === "tr") {
      if (q.includes("kahvalt") || q.includes("yemek") || q.includes("restoran") || q.includes("aç") || q.includes("saat")) {
        reply = `Değerli Misafirimiz,\n\nOrka Lotus Beach Hotel'de Ultra Her Şey Dahil konseptimizle gastronomi deneyimimiz 24 saat aralıksız sunulmaktadır:\n\n• Lotus Ana Restoran:\n  - Açık Büfe Kahvaltı: 07:00 – 10:30\n  - Geç Kahvaltı: 10:30 – 11:00\n  - Öğle Yemeği: 12:30 – 14:00\n  - Akşam Yemeği: 19:00 – 21:30\n  - Gece Büfesi ve Çorba: 00:00 – 07:00\n• A'la Carte Restoranlarımız: Turquoise Balık, Olive İtalyan, Asya & Sushi ve Steakhouse (Misafir İlişkileri masasından rezervasyon yaptırabilirsiniz).\n• Lobi Bar: 24 saat kesintisiz yerli ve seçkin yabancı içecek servisiyle hizmetinizdedir.`;
      } else if (q.includes("plaj") || q.includes("havuz") || q.includes("deniz") || q.includes("şezlong") || q.includes("havlu")) {
        reply = `Değerli Misafirimiz,\n\nOtelimiz 650 metre uzunluğunda Mavi Bayraklı özel kum-çakıl plajı ve 2 adet lüks güneşlenme iskelesine sahiptir.\n\n• Havuzlarımız: Geniş Ana Havuz, çam ağaçları arasında sessiz Relax Havuzu, 5 kaydıraklı Aquapark (10:00–12:00 ve 14:00–16:30) ve çocuk havuzu bulunmaktadır.\n• Plaj Havluları: Girişte teslim edilen havlu kartınızla her gün 08:30 – 18:00 saatleri arasında Havlu Noktalarından temin edebilirsiniz.`;
      } else if (q.includes("su spor") || q.includes("jet ski") || q.includes("parasailing")) {
        reply = `Değerli Misafirimiz,\n\nEge'nin berrak sularında heyecan verici su sporları aktiviteleri sunulmaktadır:\n\n• Jet Ski, Parasailing, Banana, Wakeboard, Flyboard ve Ringo turları lisanslı eğitmenlerimiz eşliğinde gerçekleştirilmektedir.\n• Tüm su sporlarında can yeleği kullanımı ve güvenlik protokolleri zorunludur.\n• Ayrıca Icon Beach Club'da özel kabanalarda kokteyllerinizi yudumlayarak gün batımı DJ performanslarının tadını çıkarabilirsiniz.`;
      } else if (q.includes("orka homes") || q.includes("villa") || q.includes("emlak") || q.includes("ev")) {
        reply = `Değerli Misafirimiz,\n\nORKA HOMES, Orka Grubu'nun seçkin gayrimenkul ve lüks konut geliştirme markasıdır.\n\n• Turunç, İçmeler ve Marmaris koylarında müstakil lüks villalar, çağdaş rezidanslar ve yüksek yatırım getirili emlak fırsatları sunulmaktadır.\n• Detaylı katalogları incelemek ve özel danışmanlık almak için otelimizin ana havuz bölgesindeki ORKA HOMES danışma ofisimizi dilediğiniz zaman ziyaret edebilirsiniz.`;
      } else if (q.includes("müdür") || q.includes("personel") || q.includes("şenol and") || q.includes("yönetim")) {
        reply = `Değerli Misafirimiz,\n\nOrka Lotus Beach Hotel Genel Müdürümüz Sayın Şenol And, 49 kişilik uzman departman liderliği ve tüm operasyon kadromuzla birlikte misafirlerimize kusursuz bir 5 yıldızlı tatil yaşatmak için 24 saat görev başındadır.\n\n• Her türlü soru ve talebiniz için Resepsiyon veya Misafir İlişkileri ekibimiz memnuniyetle yardımcı olacaktır. Gece saatlerinde ise Nöbetçi Müdürümüz (Duty Manager) kesintisiz hizmet vermektedir.`;
      } else if (q.includes("doktor") || q.includes("hemşire") || q.includes("sağlık") || q.includes("acil") || q.includes("hastane")) {
        reply = `Değerli Misafirimiz,\n\nSağlığınız ve güvenliğiniz bizim için en üst önceliktir:\n\n• Otelimizde mesai saatlerinde kayıtlı otel doktorumuz ve acil tıp hemşiremiz Sağlık Merkezinde hizmet vermektedir.\n• Acil durumlarda odanızdan 0 tuşlayarak Resepsiyona veya 1112 dahili hattan Revire derhal ulaşabilirsiniz. Gerektiğinde ambulans ve tam teşekküllü Marmaris hastaneleriyle 24 saat koordinasyon sağlanmaktadır.`;
      } else {
        reply = `Değerli Misafirimiz,\n\nOrka Lotus Beach Hotel'e hoş geldiniz. Marmaris'te şu an saat ${time.formattedTime} ve hava ${weather.tempC}°C, ${weather.condition}.\n\nSize restoranlarımız, 650 metrelik özel plajımız, Lotus Spa, Aquapark, ORKA HOMES lüks villaları veya otelimizin 49 uzman kadrosu hakkında yardımcı olmaktan onur duyarım. Hangi konuda bilgi almak istersiniz?`;
      }
    } else if (lang === "ru") {
      reply = `Уважаемый Гость,\n\nДобро пожаловать в Orka Lotus Beach Hotel! В Мармарисе сейчас ${time.formattedTime}, погода ${weather.tempC}°C, ${weather.condition}.\n\nНаш пятизвездочный курорт работает по системе «Ультра все включено»:\n• Пляж: 650-метровый песчано-галечный пляж с Голубым флагом и 2 частных пирса.\n• Рестораны: Главный ресторан Lotus (завтрак 07:00–10:30, обед 12:30–14:00, ужин 19:00–21:30, ночной буфет 00:00–07:00), а также 4 ресторана A'la Carte и Лобби-бар 24 часа.\n• СПА и Бассейны: Традиционный хаммам, аквапарк с 5 горками, релакс-бассейн среди сосен.\n• ORKA HOMES: Элитные виллы и недвижимость в Мармарисе, Турунче и Ичмелере.\n\nБуду рад предоставить Вам любую необходимую информацию!`;
    } else if (lang === "de") {
      reply = `Sehr geehrter Gast,\n\nHerzlich willkommen im Orka Lotus Beach Hotel! Die aktuelle Ortszeit in Marmaris ist ${time.formattedTime}, das Wetter beträgt ${weather.tempC}°C, ${weather.condition}.\n\nUnser 5-Sterne Ultra All-Inclusive Resort bietet Ihnen:\n• Strand: 650 m langer Blauer-Flagge Sand-/Kiesstrand mit 2 privaten Badestegen.\n• Gastronomie: Lotus Hauptrestaurant (Frühstück 07:00–10:30, Mittag 12:30–14:00, Abendessen 19:00–21:30, Mitternachtsbuffet 00:00–07:00) und 24h Lobby Bar.\n• Wellness & Spa: Traditionelles Hamam, Sauna, Aquapark mit 5 Rutschen.\n• ORKA HOMES: Exklusive Villen und Immobilien im Büro direkt am Hauptpool.\n\nWie darf ich Ihnen weiterhelfen?`;
    } else {
      // Default English
      if (q.includes("breakfast") || q.includes("dining") || q.includes("restaurant") || q.includes("food") || q.includes("eat")) {
        reply = `Dear Guest,\n\nAt Orka Lotus Beach Hotel, our Ultra All-Inclusive culinary concept is available 24 hours a day:\n\n• Lotus Main Restaurant:\n  - Breakfast Buffet: 07:00 – 10:30\n  - Late Breakfast: 10:30 – 11:00\n  - Lunch Buffet: 12:30 – 14:00\n  - Dinner Buffet: 19:00 – 21:30\n  - Midnight Soup & Buffet: 00:00 – 07:00\n• A'la Carte Dining: Turquoise Seafood, Olive Italian, Asian Sushi, and Charcoal Steakhouse (reservations can be arranged through Guest Relations).\n• Lobby Bar: Open 24 HOURS, serving premium local and imported beverages.\n• Lotus Patisserie: Fresh pastries, artisan desserts, and ice cream from 11:00 to 18:00.`;
      } else if (q.includes("beach") || q.includes("pool") || q.includes("swim") || q.includes("towel") || q.includes("aquapark")) {
        reply = `Dear Guest,\n\nOur seaside resort boasts a 650-meter pristine Blue Flag beach and 2 private wooden piers overlooking the Aegean Sea:\n\n• Pools: Main outdoor swimming pool (08:00–19:00), tranquil pine-shaded Relax Pool, Aquapark with 5 water slides (10:00–12:00 & 14:00–16:30), and shaded children's splash pool.\n• Beach Towels: Complimentary fresh beach and pool towels are available at the Towel Desks (08:30–18:00) using your towel card received at check-in.`;
      } else if (q.includes("watersport") || q.includes("jet ski") || q.includes("parasail") || q.includes("boat")) {
        reply = `Dear Guest,\n\nWe offer an exhilarating range of certified watersports right from our private beach station:\n\n• Jet Ski rentals, Parasailing, Banana Boat, Flyboard, Wakeboarding, Stand-Up Paddleboard (SUP), and Sea Kayak.\n• All activities are managed by licensed instructors with strict safety protocols and mandatory life jackets.\n• You may also enjoy the stylish atmosphere and artisan cocktails at Icon Beach Club.`;
      } else if (q.includes("orka homes") || q.includes("villa") || q.includes("property") || q.includes("real estate")) {
        reply = `Dear Guest,\n\nORKA HOMES is the prestigious luxury real estate and villa development arm of the Orka Group:\n\n• Offering bespoke private villas, contemporary apartments, and high-yield property investment opportunities across Turunç, Içmeler, and Marmaris.\n• You are warmly invited to visit our dedicated ORKA HOMES office located near the hotel's main pool area for catalogues, private viewings, and citizenship/investment guidance.`;
      } else if (q.includes("general manager") || q.includes("manager") || q.includes("staff") || q.includes("şenol and") || q.includes("personnel")) {
        reply = `Dear Guest,\n\nOrka Lotus Beach Hotel is led by our General Manager, Şenol And, alongside 49 distinguished department heads and operational personnel dedicated to ensuring your stay is flawless.\n\n• Front Office, Guest Relations, and Concierge are available around the clock at the Reception desk (Ext: 0). Outside regular office hours, our Duty Manager is on site 24/7.`;
      } else if (q.includes("doctor") || q.includes("medical") || q.includes("nurse") || q.includes("hospital") || q.includes("emergency")) {
        reply = `Dear Guest,\n\nYour health, safety, and peace of mind are our paramount concern:\n\n• An on-site registered hotel doctor and nurse operate from our Medical Center for healthcare assistance and first aid.\n• In any urgent situation, please dial 0 from your room telephone to reach Reception immediately, or dial 1112 for the Medical Clinic. We maintain 24/7 direct ambulance and hospital coordination.`;
      } else {
        reply = `Dear Guest,\n\nWelcome to Orka Lotus Beach Hotel. In Marmaris, the local time is currently ${time.formattedTime} with pleasant weather at ${weather.tempC}°C, ${weather.condition}.\n\nI am at your service to assist with our dining venues, 650m Blue Flag beach, Lotus Spa, daily recreational schedules, ORKA HOMES luxury residences, or any hotel department. How may I assist you today?`;
      }
    }

    // Always append the mandatory closing
    if (!reply.includes("Your satisfaction is our goal")) {
      reply = `${reply.trim()}\n\n${MANDATORY_CLOSING}`;
    }

    reply = cleanConciergeText(reply);

    return {
      reply,
      detectedLanguage: lang,
      intent: "general",
      source: "verified_knowledge",
      confidence: "high",
      links,
      suggestedQuestions: suggestions,
    };
  }
}

export const conciergeService = new ConciergeService();
