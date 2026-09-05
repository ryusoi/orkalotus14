import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "wouter";
import {
  X,
  Send,
  Sparkles,
  Bell,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Compass,
  Utensils,
  Waves,
  Anchor,
  Heart,
  BedDouble,
  CircleUserRound,
  Stethoscope,
  Baby,
  ShoppingBag,
  MapPin,
  HelpCircle,
  Phone,
  Clock,
  Sun,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { useLiveWeather } from "@/hooks/useLiveWeather";
import { useLiveDate } from "@/hooks/useLiveDate";

export interface MessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  links?: Array<{ label: string; url: string; category?: string }>;
  suggestedQuestions?: string[];
  source?: "gemini" | "verified_knowledge" | "fallback";
}

export function cleanConciergeText(raw: string): string {
  if (!raw) return "";
  return raw
    // Strip double or single markdown asterisks (**bold** or *italic*)
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

const MANDATORY_CLOSING =
  "Your satisfaction is our goal. Experience the finest hospitality at Orka Lotus Beach Hotel.";

const BELL_ICON_PRIMARY = "/RINGBELL_2.webp";
const BELL_ICON_FALLBACK =
  "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/RINGBELL%202.webp";

// Web Audio API realistic hotel bell ring sound synthesizer
function playServiceBellChime() {
  try {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Dual chime harmonics (hotel desk bell signature: high bell tone with sparkling resonance)
    const freqs = [1760, 3520, 5280];
    const gains = [0.4, 0.2, 0.08];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(gains[idx], now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    });
  } catch {
    // Audio playback not allowed or not supported; ignore gracefully
  }
}

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasRungOnce, setHasRungOnce] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bellSrc, setBellSrc] = useState(BELL_ICON_PRIMARY);
  const [imgError, setImgError] = useState(false);

  const [location, setLocation] = useLocation();
  const { locale } = useLocale();
  const weather = useLiveWeather();
  const liveDate = useLiveDate();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Localized Welcome Message
  const welcomeText = useMemo(() => {
    switch (locale) {
      case "tr":
        return cleanConciergeText(`Orka Lotus Beach Hotel'e hoş geldiniz.\n\nBen Dijital Concierge asistanınızım. Otelimizin gastronomi lezzetleri, 650 metrelik Mavi Bayraklı plajımız, Lotus Spa, Aquapark, ORKA HOMES lüks villaları, 49 kişilik uzman otel kadromuz ve tüm konaklama hizmetleriniz hakkında size 7/24 yardımcı olmak için buradayım.\n\nBugün size nasıl yardımcı olabilirim?`);
      case "ru":
        return cleanConciergeText(`Добро пожаловать в Orka Lotus Beach Hotel!\n\nЯ Ваш персональный цифровой консьерж. Я с удовольствием помогу Вам с информацией о наших ресторанах, 650-метровом пляже с Голубым флагом, СПА-центре, аквапарке, виллах ORKA HOMES, персонале и услугах отеля 24 часа в сутки.\n\nЧем я могу помочь Вам сегодня?`);
      case "de":
        return cleanConciergeText(`Herzlich willkommen im Orka Lotus Beach Hotel!\n\nIch bin Ihr persönlicher digitaler Concierge. Ich stehe Ihnen 24 Stunden am Tag für alle Fragen zu unseren Restaurants, dem 650 m langen Privatstrand, Lotus Spa, Aquapark, ORKA HOMES Luxusvillen und allen Hotelservices zur Verfügung.\n\nWie darf ich Ihnen heute behilflich sein?`);
      default:
        return cleanConciergeText(`Welcome to Orka Lotus Beach Hotel.\n\nI am your AI Digital Concierge & Guest Assistant. I am at your service 24/7 to assist with our culinary offerings, 650-meter Blue Flag beach, Lotus Spa, Aquapark, ORKA HOMES luxury properties, our 49 executive personnel, and all guest privileges.\n\nHow may I assist you today?`);
    }
  }, [locale]);

  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "initial-welcome",
      role: "assistant",
      content: welcomeText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      links: [
        { label: "Discover Dining & Bars", url: "/restaurants-bars" },
        { label: "Explore Pools & Beach", url: "/pools-beach" },
        { label: "Explore ORKA HOMES", url: "/orka-homes" },
        { label: "Hotel Personnel (49 Roles)", url: "/management-personnel" },
      ],
      suggestedQuestions: [
        "What are the main restaurant dining hours?",
        "Tell me about ORKA HOMES luxury villas.",
        "Where can I exchange pool towels?",
        "What watersports are available at the beach?",
      ],
    },
  ]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  // Global Event Listener to open Concierge from anywhere (e.g. Home page concierge input or quick buttons)
  useEffect(() => {
    const handleExternalOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>;
      setIsOpen(true);
      if (soundEnabled && !hasRungOnce) {
        playServiceBellChime();
        setHasRungOnce(true);
      }

      if (customEvent.detail?.query) {
        // Automatically send or preload the query
        setTimeout(() => {
          handleSendMessage(customEvent.detail.query);
        }, 150);
      }
    };

    window.addEventListener("open-orka-concierge", handleExternalOpen);
    return () => {
      window.removeEventListener("open-orka-concierge", handleExternalOpen);
    };
  }, [soundEnabled, hasRungOnce]);

  // Click outside and Escape key listeners to close gracefully
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Ignore clicks inside the panel or on the trigger button
      if (
        panelRef.current?.contains(target) ||
        triggerButtonRef.current?.contains(target) ||
        target.closest("#orka-ai-concierge-trigger")
      ) {
        return;
      }

      setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggleOpen = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen((prev) => {
      const next = !prev;
      if (next && soundEnabled) {
        playServiceBellChime();
        setHasRungOnce(true);
      }
      return next;
    });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    setInputMessage("");

    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Build server request payload
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/concierge/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
          currentPage: location,
        }),
      });

      if (!res.ok) {
        throw new Error(`Concierge API returned ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg: MessageItem = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: cleanConciergeText(data.reply || "I am at your service. How else may I assist you?"),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        links: data.links || [],
        suggestedQuestions: (data.suggestedQuestions || []).map(cleanConciergeText),
        source: data.source,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (soundEnabled) {
        // Soft affirmative feedback chime
        playServiceBellChime();
      }
    } catch (error) {
      console.warn("[AIConcierge] Error reaching server, providing verified instant answer:", error);

      // Graceful fallback message
      const fallbackReply = cleanConciergeText(`Dear Guest,\n\nI am currently operating in high-priority verified mode. You may explore all our facilities directly, or contact Reception immediately at extension 0 from your room telephone.\n\n${MANDATORY_CLOSING}`);

      const fallbackMsg: MessageItem = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        links: [
          { label: "Discover Dining & Bars", url: "/restaurants-bars" },
          { label: "Explore Pools & Beach", url: "/pools-beach" },
          { label: "Contact Guest Relations", url: "/contact" },
        ],
        source: "fallback",
      };

      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        role: "assistant",
        content: cleanConciergeText(welcomeText),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        links: [
          { label: "Discover Dining & Bars", url: "/restaurants-bars" },
          { label: "Explore Pools & Beach", url: "/pools-beach" },
          { label: "Explore ORKA HOMES", url: "/orka-homes" },
          { label: "Hotel Personnel (49 Roles)", url: "/management-personnel" },
        ],
        suggestedQuestions: [
          "What are the main restaurant dining hours?",
          "Tell me about ORKA HOMES luxury villas.",
          "Where can I exchange pool towels?",
          "What watersports are available at the beach?",
        ],
      },
    ]);
  };

  // Quick Action Categories
  const quickCategories = [
    { label: "🍽 Dining & Bars", prompt: "What are the dining hours, buffet times and A'la Carte options?" },
    { label: "🏖 Beach & Pools", prompt: "Tell me about the 650m beach, swimming piers, and pools." },
    { label: "🌊 Watersports", prompt: "What watersports and boat tours are available at the beach?" },
    { label: "💆 Lotus Spa", prompt: "What services and treatments does the Lotus Spa & Hamam offer?" },
    { label: "🏨 Rooms & Suites", prompt: "What room types and swim-up suites are available?" },
    { label: "🏠 ORKA HOMES", prompt: "Tell me about ORKA HOMES luxury villas and property investments." },
    { label: "👨‍💼 Hotel Personnel", prompt: "Who are the General Manager and key management personnel?" },
    { label: "👶 Mini Club", prompt: "What activities are available for children and families?" },
    { label: "🏥 Medical & Emergency", prompt: "Where is the hotel doctor and what are the emergency numbers?" },
    { label: "📍 Marmaris Excursions", prompt: "What are the best excursions to do around Marmaris and Içmeler?" },
    { label: "🛍 Resort Boutiques", prompt: "What shops, leather, jewelry, and boutiques are inside the hotel?" },
    { label: "❓ FAQs & Policies", prompt: "What are check-in, check-out, Wi-Fi, and safe box policies?" },
  ];

  return (
    <>
      {/* 1. FLOATING LUXURY GOLDEN BELL BUTTON (ALWAYS VISIBLE ANCHOR) */}
      <aside
        aria-label="AI Concierge Quick Access"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] font-sans print:hidden select-none pointer-events-auto"
      >
        <div className="relative group">
          {/* Animated Golden Glow Ambient Rings */}
          <div
            className={`absolute -inset-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] blur-md transition duration-500 pointer-events-none ${
              isOpen ? "opacity-90 animate-pulse" : "opacity-60 group-hover:opacity-100"
            }`}
          />

          {/* Floating Bell Trigger Button with Prestigious Golden Frame */}
          <button
            ref={triggerButtonRef}
            id="orka-ai-concierge-trigger"
            type="button"
            data-no-zoom="true"
            data-concierge="true"
            onClick={handleToggleOpen}
            aria-label={isOpen ? "Close AI Concierge (Esc)" : "AI Concierge"}
            title={isOpen ? "Close AI Concierge (Esc)" : "AI Concierge"}
            className={`no-lightbox-zoom relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[3px] transition-all duration-300 ease-out focus:outline-none cursor-pointer ${
              isOpen
                ? "bg-gradient-to-b from-[#183d63] via-[#0c2844] to-[#041221] border-[#f3e5ab] ring-4 ring-[#d4af37]/60 shadow-[0_0_35px_rgba(212,175,55,0.95)] scale-105"
                : "bg-gradient-to-b from-[#113153] via-[#091f35] to-[#040f1c] border-[#d4af37] shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_24px_rgba(212,175,55,0.7)] hover:border-[#f3e5ab] hover:scale-108 active:scale-95"
            }`}
          >
            {/* Concentric Double Golden Inner Frames */}
            <div className="absolute inset-1 rounded-full border border-[#f3e5ab]/70 pointer-events-none" />
            <div className="absolute inset-2 rounded-full border border-[#d4af37]/40 pointer-events-none" />

            {/* Official Ringbell Icon with Safe Fallback */}
            {!imgError ? (
              <img
                src={bellSrc}
                data-no-zoom="true"
                onError={() => {
                  if (bellSrc !== BELL_ICON_FALLBACK) {
                    setBellSrc(BELL_ICON_FALLBACK);
                  } else {
                    setImgError(true);
                  }
                }}
                alt="Orka Lotus AI Concierge Bell"
                className="no-zoom no-lightbox-zoom pointer-events-none select-none w-11 h-11 sm:w-13 sm:h-13 object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.75)] transition-transform duration-300 group-hover:rotate-6"
              />
            ) : (
              <Bell className="w-8 h-8 sm:w-9 sm:h-9 text-[#f3e5ab] drop-shadow-[0_0_12px_rgba(212,175,55,0.9)]" />
            )}

            {/* Status Indicator Dot / Active Pill */}
            {isOpen ? (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f3e5ab] opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#d4af37] border-2 border-[#040e19] shadow-[0_0_8px_#f3e5ab]" />
              </span>
            ) : (
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#040e19]" />
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* 2. CHAT MODAL / LUXURY CONCIERGE INTERFACE (DOCKS CLEANLY ABOVE BELL) */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Orka Lotus Digital Concierge"
          data-concierge="true"
          className={`fixed right-3 sm:right-6 bottom-[88px] sm:bottom-[100px] z-[9990] flex flex-col bg-[#051322]/98 backdrop-blur-xl border border-[#d4af37]/70 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(212,175,55,0.35)] overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 ${
            isExpanded
              ? "w-[calc(100vw-24px)] sm:w-[680px] h-[calc(100svh-120px)] sm:h-[84vh] max-w-[760px]"
              : "w-[calc(100vw-24px)] sm:w-[460px] h-[calc(100svh-130px)] sm:h-[620px] max-h-[82vh]"
          }`}
        >
          {/* LUXURY GOLDEN HEADER */}
          <div className="relative px-4 sm:px-5 py-3 bg-gradient-to-r from-[#0a233d] via-[#103357] to-[#0a233d] border-b border-[#d4af37]/40 flex items-center justify-between text-white select-none">
            {/* Ambient Gold Header Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full border border-[#d4af37] bg-[#040e19] p-1 flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.5)]">
                <img
                  src={BELL_ICON_PRIMARY}
                  data-no-zoom="true"
                  alt="Orka Concierge"
                  className="no-zoom no-lightbox-zoom pointer-events-none select-none w-7 h-7 object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-serif font-bold tracking-wider text-[#f3e5ab] uppercase">
                    Orka Lotus Concierge
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#d4af37]/20 text-[#f3e5ab] border border-[#d4af37]/40">
                    AI Concierge
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-300">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online 24/7
                  </span>
                  <span className="text-gray-500">|</span>
                  <span className="flex items-center gap-1 text-[#f3e5ab]/90">
                    <Clock size={11} />
                    {liveDate.weekdayShort} {liveDate.dayNumber} {liveDate.monthShort}
                  </span>
                  {typeof weather?.temperature === "number" && (
                    <>
                      <span className="text-gray-500">|</span>
                      <span className="flex items-center gap-1 text-amber-300">
                        <Sun size={11} />
                        {weather.temperature}°C
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Header Control Actions */}
            <div className="flex items-center gap-1 text-gray-300">
              {/* Audio Bell Mute/Unmute */}
              <button
                type="button"
                onClick={() => {
                  if (!soundEnabled) playServiceBellChime();
                  setSoundEnabled(!soundEnabled);
                }}
                title={soundEnabled ? "Mute Bell Audio" : "Enable Bell Audio"}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-[#d4af37] transition"
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} className="text-gray-400" />}
              </button>

              {/* Reset Conversation */}
              <button
                type="button"
                onClick={handleReset}
                title="Reset Conversation"
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-[#d4af37] transition"
              >
                <RotateCcw size={15} />
              </button>

              {/* Expand / Minimize Window */}
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Standard view" : "Enlarge view"}
                className="hidden sm:block p-1.5 rounded-lg hover:bg-white/10 hover:text-[#d4af37] transition"
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close Concierge (Esc)"
                className="p-1.5 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* QUICK CATEGORY SHORTCUTS SCROLLER */}
          <div className="px-3 py-2 bg-[#081b30]/80 border-b border-[#d4af37]/20 overflow-x-auto scrollbar-none flex items-center gap-1.5 text-xs select-none">
            {quickCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(cat.prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#0d2745] hover:bg-[#d4af37]/20 border border-[#d4af37]/30 hover:border-[#d4af37] text-gray-200 hover:text-[#f3e5ab] transition duration-200 text-[11px] font-medium active:scale-95"
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* CONVERSATION MESSAGE LIST */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-sm text-gray-200">
            {messages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isAssistant ? "items-start" : "items-end"
                  } space-y-1`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 px-1">
                    {isAssistant ? (
                      <span className="text-[#d4af37] font-semibold flex items-center gap-1">
                        <Sparkles size={11} /> Orka Lotus Concierge
                      </span>
                    ) : (
                      <span className="text-gray-300">Guest</span>
                    )}
                    <span>• {msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[88%] sm:max-w-[85%] rounded-2xl p-3.5 shadow-md ${
                      isAssistant
                        ? "bg-[#0b223c]/90 border border-[#d4af37]/40 text-gray-100 rounded-tl-sm shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                        : "bg-gradient-to-r from-[#b38b22] to-[#d4af37] text-[#061626] font-medium rounded-tr-sm shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
                    }`}
                  >
                    {/* Render message with formatted paragraphs and bullet lists */}
                    <div className="whitespace-pre-wrap leading-relaxed break-words font-sans text-[13px] sm:text-[14px]">
                      {cleanConciergeText(msg.content).split("\n\n").map((para, pIdx) => {
                        const cleanPara = cleanConciergeText(para);
                        // Check if this paragraph is the mandatory sign-off seal
                        const isClosing = cleanPara.includes("Your satisfaction is our goal");
                        if (isClosing) {
                          return (
                            <div
                              key={pIdx}
                              className="mt-3 pt-2.5 border-t border-[#d4af37]/30 text-[12px] font-serif tracking-wide text-[#f3e5ab] italic flex items-center gap-2"
                            >
                              <span>{cleanPara}</span>
                            </div>
                          );
                        }

                        // Regular paragraph formatting
                        return (
                          <p key={pIdx} className="mb-2 last:mb-0">
                            {cleanPara}
                          </p>
                        );
                      })}
                    </div>

                    {/* Interactive Clickable Navigation Chips */}
                    {isAssistant && msg.links && msg.links.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-[#d4af37]/25">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37] mb-1.5">
                          Explore In Website:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.links.map((link, lIdx) => (
                            <button
                              key={lIdx}
                              onClick={() => {
                                setLocation(link.url);
                                setIsOpen(false);
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#051322] hover:bg-[#d4af37] text-[#f3e5ab] hover:text-[#040e19] border border-[#d4af37]/50 transition-colors text-[11px] font-semibold"
                            >
                              <span>{link.label}</span>
                              <ChevronRight size={12} />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Interactive Suggested Follow-Up Questions */}
                  {isAssistant && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="mt-1.5 pl-2 space-y-1">
                      <div className="text-[10px] text-gray-400 font-medium">Suggested questions:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedQuestions.map((sug, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSendMessage(sug)}
                            className="text-[11px] text-[#f3e5ab]/90 hover:text-white bg-[#0a1e33] hover:bg-[#13375c] border border-[#d4af37]/30 hover:border-[#d4af37] rounded-full px-2.5 py-0.5 transition duration-150 text-left"
                          >
                            + {sug}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2 text-xs text-gray-300">
                <div className="w-7 h-7 rounded-full border border-[#d4af37] bg-[#040e19] flex items-center justify-center">
                  <Sparkles size={14} className="text-[#d4af37] animate-spin" />
                </div>
                <div className="bg-[#0b223c] border border-[#d4af37]/40 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-[#f3e5ab] flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37] animate-bounce" />
                  <span
                    className="inline-block w-2 h-2 rounded-full bg-[#d4af37] animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="inline-block w-2 h-2 rounded-full bg-[#d4af37] animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                  <span className="text-xs text-gray-300 ml-1">
                    Concierge is formulating your 5★ guidance...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT BAR WITH LUXURY GOLD SHEEN */}
          <div className="p-3 bg-[#07192c] border-t border-[#d4af37]/40">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder={
                  locale === "tr"
                    ? "Restoran, plaj, ORKA HOMES, spa veya personel hakkında sorun..."
                    : locale === "ru"
                    ? "Спросите о ресторанах, пляже, ORKA HOMES, СПА или персонале..."
                    : locale === "de"
                    ? "Fragen Sie nach Restaurants, Strand, ORKA HOMES, Spa..."
                    : "Ask about dining, beach, ORKA HOMES, spa, personnel, policies..."
                }
                className="w-full bg-[#040f1a] text-gray-100 placeholder-gray-400 text-xs sm:text-sm rounded-full pl-4 pr-12 py-2.5 border border-[#d4af37]/50 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-none shadow-inner"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputMessage.trim()}
                title="Send to Concierge"
                className="absolute right-1.5 w-8 h-8 rounded-full bg-gradient-to-r from-[#c69a2b] to-[#e4c256] text-[#051322] flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition duration-200 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
              >
                <Send size={14} className="translate-x-[1px]" />
              </button>
            </div>

            {/* Footer Trust Bar */}
            <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400 px-1 select-none">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                Orka Lotus Beach Hotel Official Assistant
              </span>
              <span className="text-[#d4af37]/80">Ext: 0 for Front Desk</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
