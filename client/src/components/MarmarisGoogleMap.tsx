import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  Compass,
  MapPin,
  ExternalLink,
  Navigation,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Layers,
  Sparkles,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Building,
  Anchor,
  Palmtree,
  Mountain,
  Sun,
  Eye,
  Crosshair,
} from "lucide-react";

// Orka Lotus Beach Coordinates in Marmaris Bay
const ORKA_LOTUS_COORDS = {
  lat: 36.80862,
  lng: 28.23277,
  name: "Orka Lotus Beach",
  address: "Atatürk Cd. No:56, 48755 Marmaris/Muğla, Türkiye",
};

interface NearbySpot {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  zoom: number;
  distance: string;
  icon: typeof MapPin;
  description: string;
}

const NEARBY_SPOTS: NearbySpot[] = [
  {
    id: "orka",
    name: "Orka Lotus Beach (You are here)",
    category: "Resort Beachfront",
    lat: 36.80862,
    lng: 28.23277,
    zoom: 17,
    distance: "0 m",
    icon: Sparkles,
    description: "Your 5-star beachfront haven nestled along the pine bay between Marmaris & İçmeler.",
  },
  {
    id: "icmeler-beach",
    name: "İçmeler Beach & Promenade",
    category: "Beach & Watersports",
    lat: 36.8015,
    lng: 28.2345,
    zoom: 16,
    distance: "1.1 km · 12 min walk",
    icon: Palmtree,
    description: "Golden sandy shores, seaside cafes, watersports centers, and panoramic bay views.",
  },
  {
    id: "marmaris-marina",
    name: "Marmaris Netsel Marina",
    category: "Marina & Dining",
    lat: 36.8532,
    lng: 28.2754,
    zoom: 15,
    distance: "5.8 km · 10 min drive",
    icon: Anchor,
    description: "Prestigious Mediterranean mega-yacht harbor, waterfront boutiques, and fine dining.",
  },
  {
    id: "marmaris-castle",
    name: "Marmaris Castle & Old Town",
    category: "Historical Landmark",
    lat: 36.8505,
    lng: 28.2735,
    zoom: 16,
    distance: "5.4 km · 9 min drive",
    icon: Building,
    description: "Historic 16th-century fortress built by Suleiman the Magnificent with archaeology museum.",
  },
  {
    id: "nimara-cave",
    name: "Nimara Cave (Heaven Island)",
    category: "Nature & Hiking",
    lat: 36.8145,
    lng: 28.2912,
    zoom: 14,
    distance: "12 km · Scenic drive",
    icon: Mountain,
    description: "Ancient sacred cave inhabited since 10,000 BC on the forested peninsula across the bay.",
  },
];

type MapMode = "roadmap" | "satellite" | "terrain" | "hybrid";

export default function MarmarisGoogleMap() {
  const [center, setCenter] = useState<{ lat: number; lng: number }>(ORKA_LOTUS_COORDS);
  const [zoom, setZoom] = useState<number>(16);
  const [mapMode, setMapMode] = useState<MapMode>("roadmap");
  const [activeSpotId, setActiveSpotId] = useState<string>("orka");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showCompassInfo, setShowCompassInfo] = useState<boolean>(false);

  // Pan step delta (latitude & longitude) based on current zoom
  const panDelta = useMemo(() => {
    const factor = Math.pow(2, 17 - zoom);
    return {
      lat: 0.0035 * factor,
      lng: 0.0045 * factor,
    };
  }, [zoom]);

  // Pan handler for 360 degree navigation
  const pan = (direction: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW") => {
    setCenter((prev) => {
      let dLat = 0;
      let dLng = 0;

      switch (direction) {
        case "N":
          dLat = panDelta.lat;
          break;
        case "NE":
          dLat = panDelta.lat * 0.7;
          dLng = panDelta.lng * 0.7;
          break;
        case "E":
          dLng = panDelta.lng;
          break;
        case "SE":
          dLat = -panDelta.lat * 0.7;
          dLng = panDelta.lng * 0.7;
          break;
        case "S":
          dLat = -panDelta.lat;
          break;
        case "SW":
          dLat = -panDelta.lat * 0.7;
          dLng = -panDelta.lng * 0.7;
          break;
        case "W":
          dLng = -panDelta.lng;
          break;
        case "NW":
          dLat = panDelta.lat * 0.7;
          dLng = -panDelta.lng * 0.7;
          break;
      }

      return {
        lat: Number((prev.lat + dLat).toFixed(6)),
        lng: Number((prev.lng + dLng).toFixed(6)),
      };
    });

    toast(`Panned ${direction}`, {
      description: "Map viewport adjusted via 360° transparent navigator.",
      duration: 1200,
    });
  };

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(Math.max(prev + delta, 11), 19));
  };

  const resetToOrka = () => {
    setCenter(ORKA_LOTUS_COORDS);
    setZoom(17);
    setActiveSpotId("orka");
    toast("Centered on Orka Lotus Beach", {
      description: ORKA_LOTUS_COORDS.address,
    });
  };

  const selectSpot = (spot: NearbySpot) => {
    setCenter({ lat: spot.lat, lng: spot.lng });
    setZoom(spot.zoom);
    setActiveSpotId(spot.id);
    toast(spot.name, {
      description: `${spot.distance} · ${spot.category}`,
    });
  };

  // Google Maps embed URL using coordinate query and map type
  const mapTypeParam = mapMode === "satellite" ? "&t=k" : mapMode === "terrain" ? "&t=p" : mapMode === "hybrid" ? "&t=h" : "&t=m";
  const embedUrl = `https://maps.google.com/maps?q=${center.lat},${center.lng}+(${encodeURIComponent(
    activeSpotId === "orka" ? "Orka Lotus Beach Hotel" : "Marmaris Aegean Coast"
  )})&z=${zoom}${mapTypeParam}&hl=en&output=embed`;

  // Direct Google Maps Link for full external experience with reviews, street view & photos
  const directGoogleMapsUrl = `https://www.google.com/maps/place/Orka+Lotus+Beach/@36.8086205,28.2327732,17z/data=!4m9!3m8!1s0x14bfbe1fbba8c6bf:0x39a1d48c081e7492!5m2!4m1!1i2`;
  const directDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Orka Lotus Beach, Atatürk Cd. No:56, 48755 Marmaris/Muğla, Türkiye")}&destination_place_id=ChIJv8ao-x--vxQRknQeCIzUoTk`;

  return (
    <section className="section google-map-section bg-[var(--paper)] border-t border-[var(--line)]" id="map">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading-row mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="mini-label text-[#b99150] dark:text-[#d6ae69] font-bold tracking-widest uppercase text-xs">
              Live Google Maps · Marmaris & İçmeler Bay
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[var(--ink)] mt-2">
              Find your way.<br />
              <em className="text-[#b99150] font-normal">Follow the lotus line.</em>
            </h2>
            <p className="section-lede mt-3 text-[var(--ink-soft)] max-w-2xl text-sm md:text-base leading-relaxed">
              Explore the authentic Aegean coast of Marmaris, the turquoise İçmeler bay, and local landmarks directly connected with live Google Maps data, 360° navigation, and satellite views.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={directGoogleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#b99150] text-[#092939] font-bold text-xs uppercase tracking-wider hover:bg-[#c8a35f] transition-all shadow-md active:scale-95"
            >
              <ExternalLink size={14} />
              <span>Open in Google Maps</span>
            </a>
            <a
              href={directDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] font-semibold text-xs uppercase tracking-wider hover:border-[#b99150] hover:text-[#b99150] transition-all shadow-sm active:scale-95"
            >
              <Navigation size={14} />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        {/* Spot Filter Pills */}
        <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-[11px] font-bold text-[#b99150] uppercase tracking-wider whitespace-nowrap pl-1 pr-1">
            Quick Locations:
          </span>
          {NEARBY_SPOTS.map((spot) => {
            const isSelected = activeSpotId === spot.id;
            const IconComp = spot.icon;
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => selectSpot(spot)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? "bg-[#b99150] text-[#092939] shadow-sm ring-1 ring-[#b99150]"
                    : "bg-[var(--paper)] text-[var(--ink-soft)] border border-[var(--line)] hover:border-[#b99150] hover:text-[var(--ink)]"
                }`}
              >
                <IconComp size={12} className={isSelected ? "text-[#092939]" : "text-[#b99150]"} />
                <span>{spot.name.split("(")[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Real Interactive Google Map Card */}
        <div
          className={`relative rounded-2xl overflow-hidden border-2 border-[#b99150] shadow-2xl transition-all ${
            isFullscreen ? "fixed inset-4 z-50 rounded-xl bg-black" : "w-full h-[520px] md:h-[620px]"
          }`}
          style={{
            boxShadow: "0 20px 50px -10px rgba(14, 48, 64, 0.25), 0 0 0 1px rgba(185, 145, 80, 0.35)",
          }}
        >
          {/* Top Bar on Map Viewport */}
          <div className="absolute top-0 left-0 right-0 z-20 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-[#061a28]/80 backdrop-blur-md border-b border-[#b99150]/30 text-white flex items-center justify-between gap-1.5 sm:gap-3 text-xs">
            {/* Left: Orka Lotus Status */}
            <div className="flex items-center gap-1.5 overflow-hidden min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#e4bd77] animate-pulse shrink-0" />
              <div className="flex items-center gap-1 truncate">
                <span className="font-serif text-xs sm:text-sm font-bold text-[#e4bd77] tracking-wide truncate">
                  Orka Lotus Beach
                </span>
                <span className="text-white/60 text-[10px] sm:text-[11px] hidden md:inline-block">
                  · İçmeler Bay
                </span>
              </div>
            </div>

            {/* Right: Map Layers & Fullscreen */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Map Layer Switcher - Compact for mobile */}
              <div className="flex items-center bg-black/40 rounded-md sm:rounded-lg p-0.5 border border-white/10">
                {(
                  [
                    { id: "roadmap", label: "Map" },
                    { id: "satellite", label: "Satellite" },
                    { id: "terrain", label: "Terrain" },
                    { id: "hybrid", label: "Hybrid" },
                  ] as const
                ).map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => {
                      setMapMode(mode.id);
                      toast(`Map style: ${mode.label}`);
                    }}
                    className={`px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      mapMode === mode.id
                        ? "bg-[#b99150] text-[#092939]"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              {/* Fullscreen toggle */}
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-black/40 hover:bg-white/20 text-white border border-white/10 transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                aria-label="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
              </button>
            </div>
          </div>

          {/* Real Google Maps Embed Iframe */}
          <iframe
            title="Google Maps Marmaris & Orka Lotus Beach"
            src={embedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* 360-DEGREE TRANSPARENT NAVIGATION COMPASS / PAD */}
          <div className="absolute top-12 sm:top-14 left-2 sm:left-3 z-20 select-none">
            <div
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#061a28]/60 hover:bg-[#061a28]/80 backdrop-blur-md border border-[#e4bd77]/40 shadow-xl p-0.5 flex items-center justify-center transition-all group"
              style={{
                boxShadow: "0 8px 24px rgba(0,0,0,0.4), inset 0 0 12px rgba(228, 189, 119, 0.15)",
              }}
            >
              {/* Compass Cardinal Ring Markers */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#e4bd77]/25 pointer-events-none" />

              {/* North Button */}
              <button
                type="button"
                onClick={() => pan("N")}
                className="absolute top-0.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white/15 hover:bg-[#b99150] hover:text-[#092939] text-[#e4bd77] flex flex-col items-center justify-center text-[8px] font-bold transition-all shadow active:scale-90"
                title="Pan North (Towards Marmaris Castle)"
                aria-label="Pan North"
              >
                <ChevronUp size={11} strokeWidth={3} />
                <span className="text-[7px] leading-none">N</span>
              </button>

              {/* North-East Button */}
              <button
                type="button"
                onClick={() => pan("NE")}
                className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-white/10 hover:bg-[#b99150] hover:text-[#092939] text-white/80 flex items-center justify-center text-[6px] font-bold transition-all active:scale-90"
                title="Pan North-East"
                aria-label="Pan North-East"
              >
                NE
              </button>

              {/* East Button */}
              <button
                type="button"
                onClick={() => pan("E")}
                className="absolute right-0.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/15 hover:bg-[#b99150] hover:text-[#092939] text-[#e4bd77] flex items-center justify-center text-[8px] font-bold transition-all shadow active:scale-90"
                title="Pan East (Across the Bay)"
                aria-label="Pan East"
              >
                <span className="text-[7px] leading-none mr-0.5">E</span>
                <ChevronRight size={11} strokeWidth={3} />
              </button>

              {/* South-East Button */}
              <button
                type="button"
                onClick={() => pan("SE")}
                className="absolute bottom-2.5 right-2.5 w-4 h-4 rounded-full bg-white/10 hover:bg-[#b99150] hover:text-[#092939] text-white/80 flex items-center justify-center text-[6px] font-bold transition-all active:scale-90"
                title="Pan South-East"
                aria-label="Pan South-East"
              >
                SE
              </button>

              {/* South Button */}
              <button
                type="button"
                onClick={() => pan("S")}
                className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white/15 hover:bg-[#b99150] hover:text-[#092939] text-[#e4bd77] flex flex-col items-center justify-center text-[8px] font-bold transition-all shadow active:scale-90"
                title="Pan South (Towards İçmeler Center)"
                aria-label="Pan South"
              >
                <span className="text-[7px] leading-none">S</span>
                <ChevronDown size={11} strokeWidth={3} />
              </button>

              {/* South-West Button */}
              <button
                type="button"
                onClick={() => pan("SW")}
                className="absolute bottom-2.5 left-2.5 w-4 h-4 rounded-full bg-white/10 hover:bg-[#b99150] hover:text-[#092939] text-white/80 flex items-center justify-center text-[6px] font-bold transition-all active:scale-90"
                title="Pan South-West"
                aria-label="Pan South-West"
              >
                SW
              </button>

              {/* West Button */}
              <button
                type="button"
                onClick={() => pan("W")}
                className="absolute left-0.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/15 hover:bg-[#b99150] hover:text-[#092939] text-[#e4bd77] flex items-center justify-center text-[8px] font-bold transition-all shadow active:scale-90"
                title="Pan West (Into the Pine Hills)"
                aria-label="Pan West"
              >
                <ChevronLeft size={11} strokeWidth={3} />
                <span className="text-[7px] leading-none ml-0.5">W</span>
              </button>

              {/* North-West Button */}
              <button
                type="button"
                onClick={() => pan("NW")}
                className="absolute top-2.5 left-2.5 w-4 h-4 rounded-full bg-white/10 hover:bg-[#b99150] hover:text-[#092939] text-white/80 flex items-center justify-center text-[6px] font-bold transition-all active:scale-90"
                title="Pan North-West"
                aria-label="Pan North-West"
              >
                NW
              </button>

              {/* Center / Orka Lotus Reset Pin */}
              <button
                type="button"
                onClick={resetToOrka}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#b99150] hover:bg-[#e4bd77] text-[#092939] flex flex-col items-center justify-center shadow-lg transition-transform active:scale-90 z-10"
                title="Center on Orka Lotus Beach Hotel"
                aria-label="Center on Orka Lotus Beach Hotel"
              >
                <Sparkles size={11} className="text-[#092939]" />
                <span className="text-[6px] font-extrabold uppercase tracking-tight leading-none">
                  Lotus
                </span>
              </button>
            </div>

            <div className="mt-0.5 text-center">
              <span className="inline-block px-1.5 py-0.2 rounded-full bg-black/60 backdrop-blur-sm text-[8px] font-bold text-[#e4bd77] border border-white/10">
                360° Pan
              </span>
            </div>
          </div>

          {/* Minimalist Floating Zoom Controls (Bottom-Right) */}
          <div className="absolute bottom-3 right-3 z-20 flex flex-col items-end gap-1.5">
            <div className="flex flex-col rounded-lg bg-[#061a28]/75 backdrop-blur-md border border-white/15 p-0.5 shadow-xl">
              <button
                type="button"
                onClick={() => handleZoom(1)}
                className="w-7 h-7 rounded flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                title="Zoom in"
                aria-label="Zoom in"
              >
                <ZoomIn size={14} />
              </button>
              <div className="w-full h-px bg-white/10 my-0.5" />
              <button
                type="button"
                onClick={() => handleZoom(-1)}
                className="w-7 h-7 rounded flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                title="Zoom out"
                aria-label="Zoom out"
              >
                <ZoomOut size={14} />
              </button>
              <div className="w-full h-px bg-white/10 my-0.5" />
              <button
                type="button"
                onClick={resetToOrka}
                className="w-7 h-7 rounded flex items-center justify-center text-[#e4bd77] hover:bg-white/20 transition-colors"
                title="Reset to Orka Lotus Beach"
                aria-label="Reset to Orka Lotus Beach"
              >
                <RotateCcw size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Clean Info & Actions Strip Underneath the Map (Unobstructed View) */}
        <div className="mt-4 p-4 rounded-xl border border-[var(--line)] bg-[var(--paper)] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          {/* Location details */}
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#b99150]/15 text-[#b99150] flex items-center justify-center shrink-0 border border-[#b99150]/30">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif font-bold text-base md:text-lg text-[var(--ink)]">
                  Orka Lotus Beach
                </h3>
                <span className="px-2 py-0.5 rounded bg-[#b99150]/20 text-[#b99150] text-[10px] font-bold uppercase tracking-wider">
                  5★ Ultra All-Inclusive
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-0.5">
                Atatürk Cd. No:56, 48755 İçmeler, Marmaris/Muğla, Türkiye
              </p>
            </div>
          </div>

          {/* Action buttons moved underneath map */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
            <button
              type="button"
              onClick={resetToOrka}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[#b99150] hover:text-[#b99150] text-xs font-bold uppercase tracking-wider transition-all"
            >
              <Crosshair size={13} />
              <span>Focus Pin</span>
            </button>
            <a
              href={directDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[#b99150] hover:text-[#b99150] text-xs font-bold uppercase tracking-wider transition-all"
            >
              <Navigation size={13} />
              <span>Directions</span>
            </a>
            <a
              href={directGoogleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#b99150] text-[#092939] hover:bg-[#c8a35f] text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
            >
              <ExternalLink size={13} />
              <span>Full Google Maps View</span>
            </a>
          </div>
        </div>

        {/* Marmaris Key Locations Summary Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {NEARBY_SPOTS.slice(0, 3).map((spot) => {
            const IconComp = spot.icon;
            return (
              <div
                key={`summary-${spot.id}`}
                className="p-4 rounded-xl border border-[var(--line)] bg-[var(--paper)] flex items-start gap-3.5 transition-all hover:border-[#b99150]/50"
              >
                <div className="w-9 h-9 rounded-full bg-[#b99150]/15 text-[#b99150] flex items-center justify-center shrink-0">
                  <IconComp size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif font-bold text-sm text-[var(--ink)] truncate">
                      {spot.name.split("(")[0].trim()}
                    </h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#b99150] shrink-0">
                      {spot.distance}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--ink-soft)] mt-1 leading-relaxed">
                    {spot.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
