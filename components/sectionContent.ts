/* ============================================================
   SHARED SECTION CONTENT
   Copy that appears in both the mobile and the desktop layout of a section
   lives here once. Layout-only details (positions, crops, colours, icon
   insets) stay in each layout's own file.
   ============================================================ */

// Hero: industries served, in grid order.
export const HERO_FEATURES = [
  "Automotive, EV, Electronics, Electrical & Semiconductor.",
  "Renewable Energy, Engineering, Electrical Vehicle.",
  "Cold Storage & Clean Rooms, Machinery & Heavy Manufacturing.",
  "Textile, Pharmaceutical, Chemical & Life Sciences.",
  "Metals, Steel, Building Materials, Packaging & Plastics, Logistics.",
  "Apparel, Leather, Food Processing, Beverage, FMCG.",
] as const;

// Hero: stats (suffix colours are layout-specific).
export const HERO_STATS = [
  { value: "300", suffix: "+", label: "Projects" },
  { value: "18", suffix: "+", label: "years Experience" },
  { value: "40,000 ", suffix: "MT", label: "Annual Production" },
  { value: "250", suffix: "+", label: "Engineering Team" },
] as const;

// Process: six-step project path.
export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Site & Project Feasibility",
    description: "Geotechnical, regulatory, and budget checks.",
  },
  {
    number: "02",
    title: "Design & Engineering",
    description: "In-house engineering, plant layout and utility planning.",
  },
  {
    number: "03",
    title: "Civil Works & PEB",
    description:
      "Disciplined sequencing of civil works, steel framing and infrastructure.",
  },
  {
    number: "04",
    title: "MEP Integration",
    description:
      "Electrical systems, piping, mechanical works and utility services.",
  },
  {
    number: "05",
    title: "Quality Validation",
    description: "Inspection, installation & compliance checks.",
  },
  {
    number: "06",
    title: "Handover & After-Sales",
    description: "Snag clearance, documentation, and support.",
  },
] as const;

// CTA: "Lead includes" ticks.
export const CTA_INCLUDES = [
  "Turnkey Execution",
  "Industrial Civil Works",
  "MEP & Utilities",
  "Tanks & Infrastructure",
] as const;

// Gallery: image descriptions, in tile order.
export const GALLERY_ALTS = [
  "Modern industrial warehouse with a louvred glass facade beside a truck yard",
  "Aerial view of a large white warehouse with loading docks",
  "Industrial warehouse with a brown and glass entrance facade",
  "Blue steel warehouse on an industrial estate",
  "Green and beige industrial warehouse with a long white roof and loading bays",
  "White and blue warehouse with loading docks and a parked truck",
] as const;
