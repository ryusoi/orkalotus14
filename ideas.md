# ORKA LOTUS BEACH — Design Direction

## Three stylistic approaches

### Theme Name: Aegean Riviera Editorial
**Very Brief Intro:** A sunlit, yacht-club-inspired guest experience with editorial typography, sea-glass blues, and tactile sand tones. It turns daily hotel information into a calm, premium travel ritual rather than a conventional website.
**Probability:** 0.07

### Theme Name: Midnight Marina
**Very Brief Intro:** A cinematic after-dark resort interface built around midnight navy, champagne gold, and luminous turquoise accents. The mood is intimate, polished, and ideal for evening entertainment discovery.
**Probability:** 0.03

### Theme Name: Coastal Modernist
**Very Brief Intro:** A crisp, architectural direction using sun-bleached neutrals, strong cobalt blocks, and restrained geometric forms. It makes the directory and activity tools feel exceptionally clear while keeping the resort identity visible.
**Probability:** 0.08

## Selected approach: Aegean Riviera Editorial

### Design Movement
Contemporary Mediterranean editorial design, borrowing from luxury yacht club identities, boutique travel journals, and modern wayfinding systems. The interface should feel like a beautifully printed guest folio translated into a fast, thumb-friendly digital companion.

### Core Principles
1. **Information feels like hospitality.** Every utility — schedule, map, dining, people, and requests — should read as a thoughtful invitation, not an admin panel.
2. **The horizon is the organizing line.** Use broad image bands, horizontal cards, and offset columns that echo sea, shore, and long views rather than centered SaaS grids.
3. **Luxury is restraint.** Favor generous space, crisp contrast, small uppercase labels, and precise gold details over decoration-heavy effects.
4. **Mobile first, desktop expansive.** A guest should find today’s answer in seconds on a phone, while larger screens reveal more of the resort story through split compositions.

### Color Philosophy
The light theme is anchored in a warm shell-white and pale sand so the ocean blues feel vivid without becoming corporate. Deep Aegean blue provides trust and navigation; sea-glass turquoise is reserved for live status and guest actions; antique gold signals premium moments and hotel craft. The dark theme turns that same ocean into midnight navy, using white as the primary reading surface and soft gold for headings and high-value actions. The signature brand color is **Lotus Tide #0E7680**, a blue-green that feels like sunlight moving through shallow water.

### Layout Paradigm
Use a **horizon-flow layout**: full-bleed visual moments interrupted by asymmetrical information islands. The landing page begins with a layered hero and a floating “Today at Lotus” sheet, then moves through an alternating rhythm of wide feature strips, a split schedule/calendar, and a destination ribbon. Avoid a repeated 3-up card grid; where cards are needed, use horizontal scroll rails, staggered widths, or a featured card beside compact notes.

### Signature Elements
- **Horizon rules:** Fine blue/gold rules and short vertical ticks act as recurring wayfinding markers beside section labels and timeline entries.
- **Tide chips:** Compact pill controls with a subtle turquoise indicator for live, open, or available states.
- **Lotus compass mark:** A simple four-petal/compass symbol built from overlapping arcs, used in the header, favicon, loading state, and map/directory moments.

### Interaction Philosophy
Interactions should feel like opening a well-made travel folio: quick, clear, and slightly tactile. Every control has an obvious touch target and a visible state change. Activity details expand in place; dates slide horizontally; navigation opens as a calm side sheet; save/add-to-calendar actions use concise confirmation toasts. Never hide essential guest information behind ambiguous icons alone.

### Animation
Use 180–260ms ease-out transitions for buttons, chips, tabs, drawers, and card reveals. Hero imagery should drift only slightly on scroll, while the schedule timeline enters with a gentle 40ms stagger per item. Calendar date selection should slide the date rail by 8–12px with opacity change rather than bounce. Respect `prefers-reduced-motion` by removing parallax and stagger while preserving state transitions.

### Typography System
Display: **Cormorant Garamond** for the hotel name, high-level headlines, and editorial emphasis, using regular and semibold weights. Body/UI: **DM Sans** for navigation, labels, metadata, and readable guest instructions. Use small uppercase labels with generous tracking for wayfinding; headlines use sentence case, tight leading, and italic emphasis only for location or signature phrases. Never use Inter.

### Brand Essence
**A pocket-sized Aegean host for ORKA LOTUS BEACH guests — helping international travelers move through their day with confidence, beauty, and less friction.**

Personality: **sunlit, composed, attentive**

### Brand Voice
Headlines sound confident, warm, and place-specific. CTAs are active but never pushy; microcopy reassures and clarifies. Avoid generic filler and sales-heavy language.

Example headline: “Your stay, in its natural rhythm.”

Example CTA: “See what’s on before the sun sets.”

### Wordmark & Logo
Use the existing ORKA LOTUS BEACH wordmark as a reference for brand continuity, paired with a new symbol: four rounded lotus petals arranged like a compass rose, with a small negative-space horizon cut through the center. The symbol should work independently as the mobile header mark and favicon; the full wordmark remains a typographic lockup in the hero.

### Signature Brand Color
**Lotus Tide — #0E7680**. This is the ownable blue-green used for live status, selected dates, and guest-service actions across both themes.

## Implementation reminders

- Keep guest-facing content in `client/src/data/` so hotel staff can update JSON/TS data without touching page structure.
- Use the verified content supplied by the owner; label uncertain schedules as “Schedule to be confirmed” rather than inventing operational facts.
- Support eight languages in the data model: English, Turkish, Spanish, German, Russian, French, Arabic, and Farsi. Toggle `dir="rtl"` for Arabic and Farsi.
- Start with the light theme, persist theme preference in localStorage, and expose a clear theme switcher.
- The first release is a frontend experience with content-driven placeholders for future admin, bookings, notifications, ratings, and concierge integrations.

## Style Decisions

The selected direction uses Aegean Riviera Editorial as the single source of truth: bright shell-white and ocean blue by default, midnight navy and soft gold in dark mode, editorial serif headings, DM Sans UI copy, horizon-flow composition, and a calm “travel folio” interaction language.

## Style reminders by file

- `client/src/index.css`: own the shell-white/ocean-blue/lotus-tide/gold token system, grain, horizon rules, and reduced-motion behavior.
- `client/src/App.tsx`: preserve the light-first editorial tone while wiring theme and language direction.
- `client/src/pages/Home.tsx`: compose the landing page as horizon-flow sections; never collapse it into a generic centered dashboard.
- `client/src/data/content.ts`: keep all activities, facilities, menus, destinations, staff, and translations editable and clearly marked when pending confirmation.
- `client/index.html`: load Cormorant Garamond and DM Sans; keep the title and metadata hotel-specific.
