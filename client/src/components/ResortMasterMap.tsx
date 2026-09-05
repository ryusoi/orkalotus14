import { useState, useMemo, useRef, useEffect } from "react";
import { toast } from "sonner";
import {
  MapPin,
  Maximize2,
  Search,
  X,
  Utensils,
  Waves,
  Sparkles,
  Building2,
  Compass,
  Check,
  Eye,
  Info,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface MasterMapItem {
  number: number;
  name: string;
  category: "dining" | "pools" | "wellness" | "blocks" | "services";
  categoryLabel: string;
  floorInfo?: string;
  subItems?: string[];
  description?: string;
}

export const MASTER_MAP_DATA: MasterMapItem[] = [
  {
    number: 1,
    name: "Main Entrance",
    category: "services",
    categoryLabel: "Services & Access",
    description: "Primary resort gate, valet, guest arrival & departure security point.",
  },
  {
    number: 2,
    name: "Aqua Park (water slides)",
    category: "pools",
    categoryLabel: "Pools & Beach",
    description: "Thrilling multislide water park for all ages with splash pools and lifeguard stations.",
  },
  {
    number: 3,
    name: "Arena Square / Amphitheater",
    category: "services",
    categoryLabel: "Entertainment",
    description: "Open-air evening shows, live music performances, dance reviews and family entertainment.",
  },
  {
    number: 4,
    name: "Relaxation Area / Sun Terrace",
    category: "pools",
    categoryLabel: "Pools & Beach",
    description: "Quiet sun deck nestled by Aegean pine trees with luxury cushioned loungers and shade.",
  },
  {
    number: 5,
    name: "Aqua Snack & Bar",
    category: "dining",
    categoryLabel: "Dining & Bars",
    description: "Casual poolside snacks, wood-fired bites, ice creams, cocktails, and chilled refreshments.",
  },
  {
    number: 6,
    name: "Beach Cabanas",
    category: "pools",
    categoryLabel: "Pools & Beach",
    description: "Private waterfront cabanas with dedicated butler service, fresh fruit platters, and Aegean views.",
  },
  {
    number: 7,
    name: "Kids Club \"Orki\"",
    category: "services",
    categoryLabel: "Family & Kids",
    description: "Supervised play zones, arts & crafts workshops, mini cinema, and daily children's activities.",
  },
  {
    number: 8,
    name: "Children's Pool",
    category: "pools",
    categoryLabel: "Pools & Beach",
    description: "Dedicated safe shallow pool equipped with mini water fun features for little ones.",
  },
  {
    number: 9,
    name: "Wading Pool / Paddling Pool",
    category: "pools",
    categoryLabel: "Pools & Beach",
    description: "Gentle shallow water area designed for toddlers and relaxing leg dips in the sun.",
  },
  {
    number: 10,
    name: "Water Sports Center",
    category: "pools",
    categoryLabel: "Recreation",
    description: "Jet ski, paddle boarding, parasailing, canoeing, boat tours and scuba diving bookings.",
  },
  {
    number: 11,
    name: "Beach Bar",
    category: "dining",
    categoryLabel: "Dining & Bars",
    description: "Barefoot seaside cocktails, iced drinks, local draft beer, and chilled sunset mocktails.",
  },
  {
    number: 12,
    name: "Hairdresser & Shop",
    category: "services",
    categoryLabel: "Services",
    description: "Professional hairstyling, beauty treatments, resort sundries, and vacation essentials.",
  },
  {
    number: 13,
    name: "Tapas Snack & Bar",
    category: "dining",
    categoryLabel: "Dining & Bars",
    description: "Mediterranean small plates, savoury afternoon snacks, sangria, and refreshing beverages.",
  },
  {
    number: 14,
    name: "SPA Center / Indoor Pool / Gym / Turkish Bath / Hair Salon / Photo Studio",
    category: "wellness",
    categoryLabel: "Spa & Wellness",
    floorInfo: "-3 Floor",
    description: "Full wellness sanctuary featuring authentic Turkish Hammam, sauna, heated indoor pool, fitness suite, hair salon, and photo studio.",
  },
  {
    number: 15,
    name: "Main Restaurant \"Pine\"",
    category: "dining",
    categoryLabel: "Dining & Bars",
    description: "Expansive buffet with open show-cooking stations, fresh Aegean seafood, and international delicacies.",
  },
  {
    number: 16,
    name: "Chinese Restaurant \"Asia\"",
    category: "dining",
    categoryLabel: "Dining & Bars",
    floorInfo: "-1 Floor",
    description: "Authentic Asian à la carte cuisine featuring dim sum, wok specialties, and Far Eastern flavors.",
  },
  {
    number: 17,
    name: "Blu Bar / Turkish Restaurant \"Turquoise\"",
    category: "dining",
    categoryLabel: "Dining & Bars",
    floorInfo: "Blu Bar (2nd floor) / Turkish Restaurant \"Turquoise\" (-1 floor)",
    description: "Panoramic cocktails at Blu Bar on the 2nd floor, and authentic Anatolian grilled delicacies at Turquoise on the -1 floor.",
  },
  {
    number: 18,
    name: "Conference Halls / Game Room / Shops",
    category: "services",
    categoryLabel: "Services & Leisure",
    floorInfo: "Game Room & Conference (-1 floor) / Shops (Lobby floor)",
    description: "Air-conditioned arcade & billiards game room, multipurpose event halls, and souvenir retail shops.",
  },
  {
    number: 19,
    name: "Patisserie / Lobby Bar / Info Desk / Tour Agent Meeting Point",
    category: "dining",
    categoryLabel: "Lobby & Services",
    floorInfo: "Patisserie & Lobby Bar (Lobby floor) / Info & Tour Point (-1 floor)",
    description: "Fresh French pastries, Turkish coffee & tea, 24/7 lobby lounge bar, guest info desks, and excursion meeting points.",
  },
  {
    number: 20,
    name: "Doctor",
    category: "wellness",
    categoryLabel: "Health & Medical",
    description: "On-site medical clinic with certified healthcare professionals available for guest peace of mind.",
  },
  {
    number: 21,
    name: "Relax Bar & Pool",
    category: "dining",
    categoryLabel: "Pools & Dining",
    description: "Serene adult-friendly swimming pool paired with a tranquil bar for peaceful lounging.",
  },
  {
    number: 22,
    name: "Italian Restaurant \"Olive Tree\"",
    category: "dining",
    categoryLabel: "Dining & Bars",
    description: "Handcrafted pasta, wood-fired pizza, fine wines, and classic Italian desserts in an olive grove ambiance.",
  },
  {
    number: 23,
    name: "Boutique / Gift Shop",
    category: "services",
    categoryLabel: "Shopping",
    description: "Curated Aegean resort wear, artisanal jewelry, handmade souvenirs, and designer beach accessories.",
  },
  {
    number: 24,
    name: "Car Parking",
    category: "services",
    categoryLabel: "Facilities",
    description: "Covered and secure parking lot for guest vehicles and rental cars near the main gate.",
  },
  {
    number: 25,
    name: "Block 1",
    category: "blocks",
    categoryLabel: "Accommodation Block",
    description: "Guest rooms and suites with lush botanical garden and mountain panoramas.",
  },
  {
    number: 26,
    name: "Block 2",
    category: "blocks",
    categoryLabel: "Accommodation Block",
    description: "Comfortable guest residences located close to core amenities and pine-fringed paths.",
  },
  {
    number: 27,
    name: "Block 3",
    category: "blocks",
    categoryLabel: "Accommodation Block",
    description: "Centrally positioned accommodations with quick access to the main restaurant and lobby terraces.",
  },
  {
    number: 28,
    name: "Block 4",
    category: "blocks",
    categoryLabel: "Accommodation Block",
    description: "Peaceful hillside rooms nestled amidst native pine trees with scenic balcony views.",
  },
  {
    number: 29,
    name: "Block 5",
    category: "blocks",
    categoryLabel: "Accommodation Block",
    description: "Spacious guest accommodations with balanced proximity to both relaxation areas and swimming pools.",
  },
  {
    number: 30,
    name: "Block 6",
    category: "blocks",
    categoryLabel: "Accommodation Block",
    description: "Elevated suites boasting broad views across the İçmeler bay and emerald coastline.",
  },
  {
    number: 31,
    name: "Block 7",
    category: "blocks",
    categoryLabel: "Accommodation Block",
    description: "Serene guest rooms located along the gentle pathways connecting to the aqua park and gardens.",
  },
  {
    number: 32,
    name: "Block 8",
    category: "blocks",
    categoryLabel: "Accommodation Block",
    description: "Tranquil rooms offering prime access to the quiet pool zones and afternoon sun terraces.",
  },
  {
    number: 33,
    name: "Block 9",
    category: "blocks",
    categoryLabel: "Accommodation Block",
    description: "Exclusive residences positioned along the upper terrace with expansive Aegean sea views.",
  },
];

const CATEGORIES = [
  { id: "dining", label: "Dining & Bars (8)", icon: Utensils },
  { id: "pools", label: "Pools & Beach (7)", icon: Waves },
  { id: "wellness", label: "Spa & Health (2)", icon: Sparkles },
  { id: "blocks", label: "Room Blocks 1–9", icon: Building2 },
  { id: "services", label: "Services & Lobby (7)", icon: Compass },
] as const;

// Primary and fallback raw URLs for the map graphic
const MAP_IMAGE_SRC = "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/IMAGES/final%20box%20clear%20color%20mask.png";
const MAP_IMAGE_FALLBACK = "https://github.com/ryusoi/orkalotusmanus1/raw/main/IMAGES/final%20box%20clear%20color%20mask.png";

interface FullscreenInteractiveMapProps {
  imageSrc: string;
  onClose: () => void;
  selectedNumber: number | null;
  onSelectNumber: (num: number) => void;
  data: MasterMapItem[];
}

function FullscreenInteractiveMap({
  imageSrc,
  onClose,
  selectedNumber,
  onSelectNumber,
  data,
}: FullscreenInteractiveMapProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    scale: 1,
    position: { x: 0, y: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    initialPinchDistance: 0,
    initialPinchScale: 1,
    initialPosition: { x: 0, y: 0 },
    lastTapTime: 0,
    lastTapPos: { x: 0, y: 0 },
  });

  useEffect(() => {
    stateRef.current.scale = scale;
    stateRef.current.position = position;
  }, [scale, position]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent background scroll and attach non-passive wheel zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = container.getBoundingClientRect();
      const cursorX = e.clientX - rect.left - rect.width / 2;
      const cursorY = e.clientY - rect.top - rect.height / 2;

      const currentScale = stateRef.current.scale;
      const factor = e.deltaY < 0 ? 1.25 : 0.8;
      const newScale = Math.min(Math.max(currentScale * factor, 1), 5);

      if (newScale === 1) {
        setScale(1);
        setPosition({ x: 0, y: 0 });
        stateRef.current.scale = 1;
        stateRef.current.position = { x: 0, y: 0 };
        return;
      }

      const ratio = (newScale - currentScale) / currentScale;
      const newX = stateRef.current.position.x - cursorX * ratio;
      const newY = stateRef.current.position.y - cursorY * ratio;

      setScale(newScale);
      setPosition({ x: newX, y: newY });
      stateRef.current.scale = newScale;
      stateRef.current.position = { x: newX, y: newY };
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Double click / Double tap toggle
  const handleZoomToggleAtPoint = (clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const clickX = clientX - rect.left - rect.width / 2;
    const clickY = clientY - rect.top - rect.height / 2;

    if (stateRef.current.scale > 1.15) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      stateRef.current.scale = 1;
      stateRef.current.position = { x: 0, y: 0 };
    } else {
      const targetScale = 2.5;
      const newX = -clickX * (targetScale - 1);
      const newY = -clickY * (targetScale - 1);
      setScale(targetScale);
      setPosition({ x: newX, y: newY });
      stateRef.current.scale = targetScale;
      stateRef.current.position = { x: newX, y: newY };
    }
  };

  // Desktop Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (stateRef.current.scale <= 1) return;
    setIsInteracting(true);
    stateRef.current.isDragging = true;
    stateRef.current.dragStart = {
      x: e.clientX - stateRef.current.position.x,
      y: e.clientY - stateRef.current.position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!stateRef.current.isDragging) return;
    const newX = e.clientX - stateRef.current.dragStart.x;
    const newY = e.clientY - stateRef.current.dragStart.y;
    setPosition({ x: newX, y: newY });
    stateRef.current.position = { x: newX, y: newY };
  };

  const handleMouseUp = () => {
    setIsInteracting(false);
    stateRef.current.isDragging = false;
  };

  // Touch Handlers for Pinch & Pan
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // 2 fingers pinch
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      stateRef.current.initialPinchDistance = dist;
      stateRef.current.initialPinchScale = stateRef.current.scale;
      stateRef.current.initialPosition = { ...stateRef.current.position };
      stateRef.current.isDragging = false;
      setIsInteracting(true);
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      const now = Date.now();
      const lastTime = stateRef.current.lastTapTime;
      const lastPos = stateRef.current.lastTapPos;
      const tapDist = Math.hypot(touch.clientX - lastPos.x, touch.clientY - lastPos.y);

      if (now - lastTime < 320 && tapDist < 35) {
        // Double tap trigger
        handleZoomToggleAtPoint(touch.clientX, touch.clientY);
        stateRef.current.lastTapTime = 0;
        return;
      }

      stateRef.current.lastTapTime = now;
      stateRef.current.lastTapPos = { x: touch.clientX, y: touch.clientY };

      if (stateRef.current.scale > 1) {
        setIsInteracting(true);
        stateRef.current.isDragging = true;
        stateRef.current.dragStart = {
          x: touch.clientX - stateRef.current.position.x,
          y: touch.clientY - stateRef.current.position.y,
        };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      if (stateRef.current.initialPinchDistance > 0) {
        const factor = dist / stateRef.current.initialPinchDistance;
        const newScale = Math.min(Math.max(stateRef.current.initialPinchScale * factor, 1), 5);
        setScale(newScale);
        stateRef.current.scale = newScale;
      }
    } else if (e.touches.length === 1 && stateRef.current.isDragging && stateRef.current.scale > 1) {
      const touch = e.touches[0];
      const newX = touch.clientX - stateRef.current.dragStart.x;
      const newY = touch.clientY - stateRef.current.dragStart.y;
      setPosition({ x: newX, y: newY });
      stateRef.current.position = { x: newX, y: newY };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      setIsInteracting(false);
      stateRef.current.isDragging = false;
      stateRef.current.initialPinchDistance = 0;
      if (stateRef.current.scale < 1.05) {
        setScale(1);
        setPosition({ x: 0, y: 0 });
        stateRef.current.scale = 1;
        stateRef.current.position = { x: 0, y: 0 };
      }
    } else if (e.touches.length === 1 && stateRef.current.scale > 1) {
      const touch = e.touches[0];
      stateRef.current.dragStart = {
        x: touch.clientX - stateRef.current.position.x,
        y: touch.clientY - stateRef.current.position.y,
      };
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#061a28]/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Header Bar - No zoom buttons */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-[#061a28] border-b border-[#b99150]/40 text-white z-20 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e4bd77] animate-pulse shrink-0" />
          <div>
            <h3 className="font-serif text-base md:text-lg font-bold text-[#e4bd77] leading-tight">
              Orka Lotus Beach · Bay Map
            </h3>
            <p className="text-[11px] text-white/70">
              Pinch with 2 fingers or double-click to zoom · Drag to explore the bay
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#b99150] text-[#061a28] hover:bg-[#e4bd77] transition-all font-bold text-xs shadow-md active:scale-95 shrink-0"
          aria-label="Close fullscreen map"
        >
          <X size={16} />
          <span>Close</span>
        </button>
      </div>

      {/* Interactive Map Viewport with Pinch & Pan */}
      <div
        ref={containerRef}
        className={`flex-1 overflow-hidden relative flex items-center justify-center p-2 md:p-6 select-none ${
          scale > 1
            ? isInteracting
              ? "cursor-grabbing"
              : "cursor-grab"
            : "cursor-zoom-in"
        }`}
        style={{ touchAction: "none" }}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => handleZoomToggleAtPoint(e.clientX, e.clientY)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div
          className="relative max-w-full max-h-full will-change-transform"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: isInteracting
              ? "none"
              : "transform 0.24s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <img
            src={imageSrc}
            alt="Orka Lotus Beach Full Masterplan Map"
            className="max-h-[72vh] md:max-h-[82vh] w-auto max-w-[95vw] object-contain rounded-lg border-2 border-[#b99150] shadow-2xl pointer-events-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Quick Location Selector Drawer */}
      <div
        className="bg-[#061a28]/95 border-t border-[#b99150]/40 p-3 overflow-x-auto z-20 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 max-w-7xl mx-auto">
          <span className="text-[11px] font-bold text-[#e4bd77] uppercase tracking-wider whitespace-nowrap pl-1">
            Quick Jump:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-thin">
            {data.map((item) => (
              <button
                key={`modal-jump-${item.number}`}
                type="button"
                onClick={() => {
                  onSelectNumber(item.number);
                  toast(`#${item.number} ${item.name}`, {
                    description: item.floorInfo || item.description,
                  });
                }}
                className={`h-7 min-w-7 px-2.5 rounded-full text-xs font-bold flex items-center gap-1 shrink-0 transition-all ${
                  selectedNumber === item.number
                    ? "bg-[#e4bd77] text-[#061a28] scale-105 shadow-md"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <span>{item.number}</span>
                <span className="hidden md:inline text-[10px] truncate max-w-[90px]">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResortMasterMap() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("dining");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const checkCategoryScroll = () => {
    const el = categoryScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
  };

  useEffect(() => {
    checkCategoryScroll();
    const el = categoryScrollRef.current;
    if (!el) return;
    const handleScroll = () => checkCategoryScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollCategory = (direction: "left" | "right") => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -170 : 170;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Filter items based on active category and search input
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return MASTER_MAP_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!query) return true;

      const numMatch = String(item.number) === query || item.number.toString().includes(query);
      const nameMatch = item.name.toLowerCase().includes(query);
      const descMatch = item.description?.toLowerCase().includes(query) ?? false;
      const floorMatch = item.floorInfo?.toLowerCase().includes(query) ?? false;
      const catMatch = item.categoryLabel.toLowerCase().includes(query);

      return numMatch || nameMatch || descMatch || floorMatch || catMatch;
    });
  }, [activeCategory, searchQuery]);

  const selectedItem = useMemo(
    () => MASTER_MAP_DATA.find((item) => item.number === selectedNumber) || null,
    [selectedNumber]
  );

  const handleSelect = (item: MasterMapItem) => {
    if (selectedNumber === item.number) {
      setSelectedNumber(null);
    } else {
      setSelectedNumber(item.number);
      toast(`Map location #${item.number}: ${item.name}`, {
        description: item.floorInfo || item.description || item.categoryLabel,
      });

      // Smooth scroll map into view if not visible on mobile
      if (mapContainerRef.current) {
        mapContainerRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };

  return (
    <section className="section master-map-section" id="resort-map">
      <div className="container">
        {/* Section Header */}
        <div className="section-heading-row mb-8">
          <div>
            <span className="mini-label text-[#b99150] dark:text-[#d6ae69] font-bold tracking-widest uppercase text-xs">
              Resort Masterplan & Directory
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[var(--ink)] mt-2">
              Explore the resort grounds.
            </h2>
            <p className="section-lede mt-3 text-[var(--ink-soft)] max-w-2xl text-sm md:text-base leading-relaxed">
              Find your room block, waterslides, seaside restaurants, Turkish hammam, and Aegean beach cabanas on the official layout plan below.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#b99150]/40 bg-[var(--paper)] text-[var(--ink)] text-xs font-semibold uppercase tracking-wider hover:border-[#b99150] hover:bg-[#b99150]/10 transition-all shadow-sm"
              onClick={() => setIsFullscreen(true)}
              aria-label="Enlarge Resort Map"
            >
              <Maximize2 size={14} className="text-[#b99150]" />
              <span>Enlarge Map</span>
            </button>
          </div>
        </div>

        {/* Master Map Display with Golden Frame */}
        <div
          ref={mapContainerRef}
          className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#092939] transition-all"
          style={{
            border: "3px solid #b99150",
            boxShadow: "0 0 0 1px rgba(185, 145, 80, 0.4), 0 25px 60px -15px rgba(14, 48, 64, 0.35)",
          }}
        >
          {/* Decorative Golden Frame Corner Ornaments */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#e4bd77] z-10 pointer-events-none" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#e4bd77] z-10 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#e4bd77] z-10 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#e4bd77] z-10 pointer-events-none" />

          {/* Top Bar on Map */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#061a28]/85 backdrop-blur-md border-b border-[#b99150]/30 text-white text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e4bd77] animate-pulse" />
              <span className="font-serif text-sm tracking-wider uppercase text-[#e4bd77] font-semibold">
                Orka Lotus Beach · Bay Map
              </span>
              <span className="hidden sm:inline-block text-white/50 text-[11px]">| 33 Key Points</span>
            </div>

            {/* Enlarge Map Button */}
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-[#b99150] hover:text-[#061a28] text-white border border-white/10 hover:border-[#b99150] text-xs font-semibold uppercase tracking-wider transition-all"
              title="Open fullscreen interactive map"
              aria-label="Open fullscreen interactive map"
            >
              <Maximize2 size={13} />
              <span>Full Screen</span>
            </button>
          </div>

          {/* Active Highlight Banner */}
          {selectedItem && (
            <div className="relative z-10 px-4 py-2.5 bg-[#b99150] text-[#061a28] flex items-center justify-between gap-3 text-xs font-medium animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="w-6 h-6 rounded-full bg-[#061a28] text-[#e4bd77] font-bold flex items-center justify-center text-xs shrink-0 shadow-inner">
                  {selectedItem.number}
                </span>
                <strong className="truncate font-semibold text-sm">
                  {selectedItem.name}
                </strong>
                {selectedItem.floorInfo && (
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-black/15 text-[10px] uppercase font-bold tracking-wider">
                    {selectedItem.floorInfo}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedNumber(null)}
                className="p-1 hover:bg-black/10 rounded-full text-[#061a28] transition-colors shrink-0"
                aria-label="Dismiss selection"
              >
                <X size={15} />
              </button>
            </div>
          )}

          {/* Map Image Viewport - Clicking opens interactive fullscreen */}
          <div
            className="relative overflow-hidden max-h-[440px] md:max-h-[640px] w-full flex items-center justify-center bg-[#092939] cursor-pointer p-1 md:p-3 group"
            onClick={() => setIsFullscreen(true)}
          >
            <img
              src={imageError ? MAP_IMAGE_FALLBACK : MAP_IMAGE_SRC}
              alt="Orka Lotus Beach Resort Illustrated Master Map"
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01] select-none rounded-lg"
              draggable={false}
              onError={() => setImageError(true)}
              loading="lazy"
            />

            {/* Tap to Enlarge overlay hint */}
            <div className="absolute bottom-3 right-3 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-[#e4bd77] border border-[#e4bd77]/40 text-[11px] font-medium tracking-wide shadow-lg group-hover:bg-[#b99150] group-hover:text-[#061a28] transition-colors">
                <Eye size={12} /> Click to zoom in full screen
              </span>
            </div>
          </div>
        </div>

        {/* Selected Location Card Banner (if selected) */}
        {selectedItem && (
          <div className="mt-6 p-4 md:p-5 rounded-xl border-2 border-[#b99150] bg-[var(--paper)] shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <span className="w-10 h-10 rounded-full bg-[#b99150] text-[#092939] font-bold text-lg flex items-center justify-center shrink-0 shadow-md">
                  {selectedItem.number}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#b99150]/15 text-[#b99150] dark:text-[#e4bd77]">
                      {selectedItem.categoryLabel}
                    </span>
                    {selectedItem.floorInfo && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-200 dark:bg-gray-800 text-[var(--ink)]">
                        {selectedItem.floorInfo}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-[var(--ink)]">
                    {selectedItem.name}
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--ink-soft)] mt-1 max-w-2xl leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  className="px-3.5 py-2 rounded-lg bg-[#b99150] text-[#092939] hover:bg-[#c8a35f] text-xs font-bold uppercase tracking-wider transition-colors shadow"
                >
                  View on Master Map
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedNumber(null)}
                  className="p-2 rounded-lg border border-[var(--line)] hover:bg-[var(--tide-soft)] text-[var(--ink-soft)] transition-colors"
                  aria-label="Close spotlight"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter Toolbar & Search Bar */}
        <div className="mt-5 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
          {/* Category Filter Chips with Smooth Sliding Toggles */}
          <div className="relative flex items-center min-w-0 max-w-full group">
            {/* Transparent Left Sliding Toggle */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 flex items-center z-10 pr-1">
                <button
                  type="button"
                  onClick={() => scrollCategory("left")}
                  style={{ width: "22px", height: "22px", minHeight: "22px", minWidth: "22px" }}
                  className="rounded-full bg-[#061a28]/85 hover:bg-[#061a28] text-[#e4bd77] backdrop-blur-md border border-[#e4bd77]/50 flex items-center justify-center shadow-sm transition-all active:scale-95 p-0"
                  aria-label="Scroll categories left"
                >
                  <ChevronLeft size={13} strokeWidth={2.5} />
                </button>
              </div>
            )}

            {/* Left Edge Gradient Fade */}
            {canScrollLeft && (
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[var(--paper)] to-transparent z-[5]" />
            )}

            {/* Scrollable Container */}
            <div
              ref={categoryScrollRef}
              className="flex items-center gap-1.5 overflow-x-auto py-1 scroll-smooth scrollbar-none max-w-full"
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                const IconComp = "icon" in cat ? cat.icon : SlidersHorizontal;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm ${
                      isActive
                        ? "bg-[#b99150] text-[#092939] ring-2 ring-[#b99150]/60 font-bold"
                        : "bg-[var(--paper)] text-[var(--ink-soft)] border border-[var(--line)] hover:border-[#b99150] hover:text-[var(--ink)]"
                    }`}
                  >
                    <IconComp size={13} className="shrink-0" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Edge Gradient Fade */}
            {canScrollRight && (
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[var(--paper)] to-transparent z-[5]" />
            )}

            {/* Transparent Right Sliding Toggle */}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 flex items-center z-10 pl-1">
                <button
                  type="button"
                  onClick={() => scrollCategory("right")}
                  style={{ width: "22px", height: "22px", minHeight: "22px", minWidth: "22px" }}
                  className="rounded-full bg-[#061a28]/85 hover:bg-[#061a28] text-[#e4bd77] backdrop-blur-md border border-[#e4bd77]/50 flex items-center justify-center shadow-sm transition-all active:scale-95 p-0"
                  aria-label="Scroll categories right"
                >
                  <ChevronRight size={13} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-52 md:w-60 shrink-0">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-soft)] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search locations..."
              className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] placeholder:text-[var(--ink-soft)]/70 focus:outline-none focus:border-[#b99150] focus:ring-1 focus:ring-[#b99150] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--ink-soft)] hover:text-[var(--ink)] p-0.5"
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Counter and Helper Note */}
        <div className="mt-4 flex items-center justify-between text-xs text-[var(--ink-soft)] px-1">
          <span className="font-semibold">
            Showing {filteredItems.length} of 33 numbered locations
          </span>
          <span className="text-[11px] hidden sm:inline-block">
            Tap any numbered circle or card to locate & highlight
          </span>
        </div>

        {/* Interactive Numbered List Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5">
          {filteredItems.map((item) => {
            const isSelected = selectedNumber === item.number;
            return (
              <button
                key={item.number}
                type="button"
                onClick={() => handleSelect(item)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 group relative ${
                  isSelected
                    ? "border-[#b99150] bg-[#b99150]/10 shadow-md ring-2 ring-[#b99150]/40 translate-y-[-2px]"
                    : "border-[var(--line)] bg-[var(--paper)] hover:border-[#b99150]/60 hover:shadow-sm hover:translate-y-[-1px]"
                }`}
              >
                {/* Circled Number Badge */}
                <div
                  className={`w-8 h-8 min-w-8 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                    isSelected
                      ? "bg-[#b99150] text-[#092939] ring-2 ring-[#e4bd77]"
                      : "border-2 border-[#b99150] bg-[#b99150]/10 text-[#b99150] dark:text-[#e4bd77] group-hover:bg-[#b99150] group-hover:text-[#092939]"
                  }`}
                >
                  {item.number}
                </div>

                {/* Content Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#b99150] dark:text-[#e4bd77]">
                      {item.categoryLabel}
                    </span>
                    {item.floorInfo && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10 text-[var(--ink-soft)] font-medium truncate">
                        {item.floorInfo}
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif font-bold text-base text-[var(--ink)] leading-snug group-hover:text-[#b99150] transition-colors">
                    {item.name}
                  </h4>
                  {item.description && (
                    <p className="text-[11px] text-[var(--ink-soft)] mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Active Indicator Icon */}
                <div className="self-center pl-1">
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-[#b99150] text-[#092939] flex items-center justify-center">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-transparent group-hover:border-[#b99150]/40 flex items-center justify-center text-[var(--ink-soft)] opacity-0 group-hover:opacity-100 transition-all">
                      <MapPin size={11} className="text-[#b99150]" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Empty state when search produces no result */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 px-4 rounded-xl border border-dashed border-[var(--line)] bg-[var(--paper)]">
            <Info size={28} className="mx-auto text-[#b99150] mb-2" />
            <h4 className="font-serif text-lg font-bold text-[var(--ink)]">
              No matching resort locations found
            </h4>
            <p className="text-xs text-[var(--ink-soft)] mt-1">
              Try searching with another keyword or number, or clear your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("dining");
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#b99150] text-[#092939] text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Interactive Map Modal with Pinch-to-Zoom & Pan */}
      {isFullscreen && (
        <FullscreenInteractiveMap
          imageSrc={imageError ? MAP_IMAGE_FALLBACK : MAP_IMAGE_SRC}
          onClose={() => setIsFullscreen(false)}
          selectedNumber={selectedNumber}
          onSelectNumber={(num) => setSelectedNumber(num)}
          data={MASTER_MAP_DATA}
        />
      )}
    </section>
  );
}
