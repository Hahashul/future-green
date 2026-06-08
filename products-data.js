/* ================================================================
   products-data.js — Future Green Product Catalogue Data
   ─────────────────────────────────────────────────────────────
   This file contains ALL the product data and category definitions.
   Edit this file to:
     ★ Add a product   → copy any {} block, paste with a comma, fill in details
     ★ Remove product  → delete the whole { ... } block (and its trailing comma)
     ★ Edit a product  → find its id and change any field

   FIELDS:
     id          → filename in resources/ folder (no .png), also used in URL (?id=...)
     name        → display name shown on cards and detail page
     category    → must match one of the json: values in CATS below
     tagline     → short one-line description (shown on cards)
     description → longer paragraph shown on detail page
     wattages    → array of numbers — leave [] if not applicable
     finishes    → array of colour codes from FINISH map below
     shapes      → array of shape strings
     features    → array of bullet-point strings (shown on detail page)
     warranty    → defaults to "2-year" if left as '2-year'
================================================================ */


/* ── FINISH COLOUR MAP ──────────────────────────────────────────
   Maps short codes to display colours and labels.
   ★ TO ADD A NEW FINISH: add a new line with your code.
   Format: CODE: { bg: 'hex colour', bd: 'border hex', lbl: 'Label' }
──────────────────────────────────────────────────────────────── */
const FINISH = {
  WW:  { bg: '#F5C518', bd: '#D4A000', lbl: 'Warm White'    },
  WH:  { bg: '#DFF0FF', bd: '#A8CCF0', lbl: 'Cool White'    },
  NW:  { bg: '#F5F0E4', bd: '#D8D0BC', lbl: 'Natural White' },
  R:   { bg: '#E74C3C', bd: '#C0392B', lbl: 'Red'           },
  B:   { bg: '#3B82F6', bd: '#2563EB', lbl: 'Blue'          },
  G:   { bg: '#22C55E', bd: '#16A34A', lbl: 'Green'         },
  P:   { bg: '#EC4899', bd: '#DB2777', lbl: 'Pink'          },
  IB:  { bg: '#93C5FD', bd: '#60A5FA', lbl: 'Ice Blue'      },
  YG:  { bg: '#F59E0B', bd: '#D97706', lbl: 'Golden'        },
};


/* ── CATEGORY DEFINITIONS ───────────────────────────────────────
   Controls the sidebar filter and page header text.
   ★ slug  → used in the URL: products.html?cat=slug
   ★ label → displayed in sidebar and page header
   ★ json  → array of category strings that match product.category
             (null for "All Products" means show everything)
   ★ sub   → subtitle shown in the page header when this cat is active
──────────────────────────────────────────────────────────────── */
const CATS = [
  {
    slug: 'all',
    label: 'All Products',
    json: null,
    sub: 'Browse the complete Future Green LED range — all 22 products.'
  },
  {
    slug: 'cob',
    label: 'COB Spotlights',
    json: ['COB Spotlight'],
    sub: 'Precision-adjustable COB spotlights for accent lighting and architectural features.'
  },
  {
    slug: 'panel',
    label: 'Panel Lights',
    json: ['Recessed Slim Panel', 'Surface Panel'],
    sub: 'Slim recessed and surface panels for smooth, comfortable ceiling illumination.'
  },
  {
    slug: 'downlight',
    label: 'Downlights',
    json: ['Downlight', 'Designer · Dual-Colour'],
    sub: 'Recessed and dual-colour downlights for every room and ceiling type.'
  },
  {
    slug: 'flood',
    label: 'Flood Lights',
    json: ['Outdoor · Flood'],
    sub: 'High-power outdoor floodlights for facades, yards and security installations.'
  },
  {
    slug: 'street',
    label: 'Street Lights',
    json: ['Outdoor · Street', 'Outdoor · Wall'],
    sub: 'Road-optimised street lights and outdoor wall lights for urban and campus use.'
  },
  {
    slug: 'rope',
    label: 'Rope & Strip',
    json: ['Flexible', 'Power'],
    sub: 'Flexible rope and LED strip lighting, plus the SMPS drivers to power them.'
  },
];


/* ── PRODUCT LIST ───────────────────────────────────────────────
   ★ TO ADD A PRODUCT: copy any block below, paste after the last },
     change the values, and make sure the category matches CATS above.
   ★ TO REMOVE: delete the whole { ... }, block.
──────────────────────────────────────────────────────────────── */
const PRODUCTS = [

  /* ── COB Spotlights ── */
  {
    id: 'lotus-concealed',
    name: 'Lotus Concealed',
    category: 'COB Spotlight',
    tagline: 'Adjustable COB spot that aims light exactly where you want.',
    description: 'The Lotus Concealed is an ultra-slim recessed COB spotlight with a fully adjustable head. Ideal for accent lighting in galleries, retail displays, and premium residential projects.',
    wattages: [3, 6],
    finishes: ['WH', 'WW', 'R', 'B', 'G', 'P'],
    shapes: ['Round'],
    features: ['High CRI ≥90', 'Adjustable beam direction', 'Concealed recessed installation', 'Flicker-free driver'],
    warranty: '2-year'
  },
  {
    id: 'lily-cob-downlight',
    name: 'Lily COB Downlight',
    category: 'COB Spotlight',
    tagline: 'Tiny COB downlight with a big, crisp punch.',
    description: 'A compact recessed COB downlight that delivers a sharp, focused beam from a very small aperture. Perfect for tight ceiling cuts and accent work in residential and retail spaces.',
    wattages: [2, 5],
    finishes: ['WH', 'WW', 'R', 'B', 'G', 'P'],
    shapes: ['Round'],
    features: ['Compact aperture', 'High CRI ≥90', 'Crisp focused beam', 'Multiple colour finishes'],
    warranty: '2-year'
  },
  {
    id: 'marigold-cob-spotlight',
    name: 'Marigold COB Spotlight',
    category: 'COB Spotlight',
    tagline: 'Square-trim COB spot with a tilting head.',
    description: 'The Marigold COB Spotlight features a square trim ring and a fully tilting head, giving designers the flexibility to highlight artwork, products, and architectural details with precision.',
    wattages: [3, 6],
    finishes: ['WH', 'WW', 'R', 'B', 'G', 'P'],
    shapes: ['Square'],
    features: ['Square trim ring', 'Tilting head', 'High CRI ≥90', 'Anti-glare design'],
    warranty: '2-year'
  },
  {
    id: 'bluebell-cob-spotlight',
    name: 'Bluebell COB Spotlight',
    category: 'COB Spotlight',
    tagline: 'Deep-recess COB spotlight built to throw.',
    description: 'The Bluebell is a deep-recess COB spotlight engineered for long-throw accent lighting. Its deep housing minimises glare and concentrates the beam for dramatic effect.',
    wattages: [2, 5],
    finishes: ['WH', 'WW', 'R', 'B', 'G', 'P'],
    shapes: ['Round'],
    features: ['Deep-recess housing', 'Long-throw beam', 'Minimal glare', 'High CRI ≥90'],
    warranty: '2-year'
  },

  /* ── Panel Lights ── */
  {
    id: 'iris-slim-panel',
    name: 'IRIS Slim Panel',
    category: 'Recessed Slim Panel',
    tagline: 'Frameless flush light that disappears into the ceiling.',
    description: 'The IRIS Slim Panel has a fully frameless design that blends seamlessly into any false ceiling. Ultra-thin profile, even light distribution, and easy clip-in installation.',
    wattages: [3, 8, 12, 18, 22],
    finishes: ['WW', 'WH', 'NW'],
    shapes: ['Square', 'Rectangle'],
    features: ['Frameless flush design', 'Uniform light distribution', 'Clip-in installation', 'Flicker-free'],
    warranty: '2-year'
  },
  {
    id: 'ilex-pc-slim-panel',
    name: 'ILEX PC Slim Panel',
    category: 'Recessed Slim Panel',
    tagline: 'The IRIS panel, toughened with a polycarbonate body.',
    description: 'The ILEX takes the IRIS Slim Panel design and reinforces it with a polycarbonate body for extra durability. Ideal for high-traffic areas, schools, and commercial spaces.',
    wattages: [8, 12, 18, 22],
    finishes: ['WW', 'WH', 'NW'],
    shapes: ['Square', 'Rectangle'],
    features: ['Polycarbonate body', 'Impact-resistant', 'Uniform light distribution', 'Easy installation'],
    warranty: '2-year'
  },
  {
    id: 'iris-surface-panel',
    name: 'IRIS Surface Panel',
    category: 'Surface Panel',
    tagline: 'All the panel light — none of the ceiling cutting.',
    description: 'The IRIS Surface Panel brings the clean, frameless aesthetic of the IRIS Slim Panel to surface mounting. No false ceiling required — simply fix directly to the ceiling or wall.',
    wattages: [8, 12, 18, 22],
    finishes: ['WW', 'WH', 'NW'],
    shapes: ['Square', 'Rectangle'],
    features: ['No ceiling cutting needed', 'Surface or wall mount', 'Integrated driver', 'Frameless look'],
    warranty: '2-year'
  },
  {
    id: 'ilex-surface-panel',
    name: 'ILEX Surface Panel',
    category: 'Surface Panel',
    tagline: 'Rugged PC surface light for everyday spaces.',
    description: 'A robust polycarbonate surface panel for areas where durability counts. Easy to fit, resistant to impact, and suitable for corridors, utility rooms, garages, and commercial interiors.',
    wattages: [6, 12, 18],
    finishes: ['WW', 'WH', 'NW'],
    shapes: ['Square', 'Rectangle'],
    features: ['Polycarbonate housing', 'Impact-resistant', 'Direct surface mount', 'Long 50,000 hr life'],
    warranty: '2-year'
  },

  /* ── Designer Dual-Colour (counted as Downlights in filter) ── */
  {
    id: 'couple-slim-panel',
    name: 'Couple Slim Panel',
    category: 'Designer · Dual-Colour',
    tagline: 'Two lights in one — white core, colour halo.',
    description: 'The Couple Slim Panel combines a white central light with a coloured halo ring. Switch between white-only and dual-colour modes to create dramatic, decorative ceiling effects.',
    wattages: [3, 6, 9, 12, 16],
    finishes: ['WH', 'WW', 'R', 'B', 'G', 'P'],
    shapes: ['Round'],
    features: ['Dual-colour white + halo', 'Mode switching', 'Decorative ceiling effect', 'Multiple colour options'],
    warranty: '2-year'
  },
  {
    id: 'surface-couple-duo-panel',
    name: 'Surface Couple Duo',
    category: 'Designer · Dual-Colour',
    tagline: 'The dual-colour Couple, in a surface-mount body.',
    description: 'All the visual drama of the Couple Slim Panel in a surface-mount housing. No ceiling void needed — perfect for feature rooms, hospitality, and retail environments.',
    wattages: [3, 6, 9, 12, 16],
    finishes: ['WH', 'WW', 'R', 'B', 'G', 'P'],
    shapes: ['Round'],
    features: ['Surface-mount housing', 'Dual-colour effect', 'No ceiling void needed', 'Multiple colour options'],
    warranty: '2-year'
  },
  {
    id: 'deep-junction-duo-clr',
    name: 'Deep Junction Duo CLR',
    category: 'Designer · Dual-Colour',
    tagline: 'Dual-colour deep downlight for standard junction boxes.',
    description: 'A deep recessed dual-colour downlight designed to fit standard electrical junction boxes. The deep housing hides glare while the colour halo adds a decorative touch to any room.',
    wattages: [6, 9, 12, 16],
    finishes: ['WH', 'WW', 'R', 'B', 'G', 'P'],
    shapes: ['Round'],
    features: ['Fits standard junction boxes', 'Deep anti-glare housing', 'Dual-colour effect', 'Easy retrofit'],
    warranty: '2-year'
  },

  /* ── Downlights ── */
  {
    id: 'frameless-downlight',
    name: 'Frameless Downlight',
    category: 'Downlight',
    tagline: 'Surface-mount glow with no visible frame.',
    description: 'The Frameless Downlight has a bezel-free design that creates a floating glow effect. Wide beam angle, smooth dimming, and a clean flush finish for modern interiors.',
    wattages: [10, 15, 18, 24],
    finishes: ['WW', 'WH', 'NW'],
    shapes: ['Round'],
    features: ['Frameless bezel-free design', 'Wide 120° beam', 'Dimmable', 'High CRI ≥80'],
    warranty: '2-year'
  },
  {
    id: 'tulip-deep-light',
    name: 'Tulip Deep Light',
    category: 'Downlight',
    tagline: 'Deep-set downlight that hides the glare.',
    description: 'The Tulip Deep Light uses a deep recessed housing to push the light source well inside the ceiling, eliminating glare and creating a comfortable, diffused glow for living and work spaces.',
    wattages: [3, 5, 7, 9, 12],
    finishes: ['WW', 'WH', 'NW'],
    shapes: ['Round'],
    features: ['Deep anti-glare housing', 'Comfortable diffused light', 'Easy spring-clip install', 'Dimmable'],
    warranty: '2-year'
  },

  /* ── Flood Lights ── */
  {
    id: 'dob-floodlight',
    name: 'DOB Floodlight',
    category: 'Outdoor · Flood',
    tagline: 'Driver-on-board flood that lights up the whole yard.',
    description: 'The DOB (Driver-on-Board) Floodlight integrates the driver directly into the fitting for a compact, reliable build. High-lumen output and IP65 weatherproofing for demanding outdoor use.',
    wattages: [50, 100, 150, 200],
    finishes: ['WH'],
    shapes: ['Rectangular'],
    features: ['Integrated DOB driver', 'IP65 weatherproof', 'High-lumen output', 'Die-cast aluminium housing'],
    warranty: '2-year'
  },
  {
    id: 'richline-flood-light',
    name: 'Richline Flood Light',
    category: 'Outdoor · Flood',
    tagline: 'Slim premium flood for facades and frontage.',
    description: 'The Richline is a slim, architecturally refined floodlight for building facades, landscape lighting, and entrance areas. A low-profile body and tempered glass lens give it a premium appearance.',
    wattages: [50, 100, 150, 200],
    finishes: ['WH'],
    shapes: ['Rectangular'],
    features: ['Slim profile design', 'IP65 rated', 'Tempered glass lens', 'Adjustable bracket'],
    warranty: '2-year'
  },

  /* ── Street & Wall Lights ── */
  {
    id: 'street-light',
    name: 'Street Light',
    category: 'Outdoor · Street',
    tagline: 'Roads, lanes and campuses — lit clean and bright.',
    description: 'Engineered for road-surface photometry, this street light delivers wide, uniform illumination across roads, lanes, and campus paths. Die-cast aluminium housing with high surge protection.',
    wattages: [24, 36, 50, 80, 100],
    finishes: ['WH'],
    shapes: ['Arm-mount'],
    features: ['Road-optimised optics', 'IP65 rated', 'Die-cast aluminium', 'Surge protection 10 kV'],
    warranty: '2-year'
  },
  {
    id: '4-way-ball',
    name: '4-Way Ball',
    category: 'Outdoor · Wall',
    tagline: 'Four crisp beams from one sculptural sphere.',
    description: 'A bold outdoor wall light shaped like a sphere with four directional beam outlets. Casts four crisp pools of light on walls and pathways, available in 8 colour finishes.',
    wattages: [],
    finishes: ['WW', 'WH', 'NW', 'R', 'B', 'G', 'P', 'IB'],
    shapes: ['Sphere'],
    features: ['4-directional beams', '8 colour finishes', 'IP44 rated', 'Die-cast body'],
    warranty: '2-year'
  },
  {
    id: '2-way-wall-curved',
    name: '2-Way Wall (Curved)',
    category: 'Outdoor · Wall',
    tagline: 'Up-and-down wash for walls and entryways.',
    description: 'A curved-body outdoor wall light that projects light both upward and downward, creating a warm wash effect on walls and gates. Ideal for residential entrances and hotel facades.',
    wattages: [],
    finishes: ['WW', 'WH', 'NW'],
    shapes: ['Curved'],
    features: ['Up-down light wash', 'Curved premium body', 'IP44 rated', 'Easy wall mount'],
    warranty: '2-year'
  },
  {
    id: '2-way-wall-wedge',
    name: '2-Way Wall (Wedge)',
    category: 'Outdoor · Wall',
    tagline: 'Sculpted wedge wall light with a warm up/down glow.',
    description: 'A wedge-shaped outdoor wall light with an angular, architectural silhouette. Projects a warm up-and-down glow for a sophisticated look on exterior walls, pillars, and entrances.',
    wattages: [],
    finishes: ['WW'],
    shapes: ['Wedge'],
    features: ['Wedge architectural design', 'Up-down warm glow', 'IP44 rated', 'Powder-coated finish'],
    warranty: '2-year'
  },

  /* ── Rope, Strip & Power ── */
  {
    id: 'rope-light',
    name: 'Rope Light',
    category: 'Flexible',
    tagline: 'Flexible glow that bends around anything.',
    description: 'A 360° visible LED rope light that bends in any direction. Perfect for outlining signage, architectural edges, furniture, and festive displays. Available in 8 colour options.',
    wattages: [],
    finishes: ['WW', 'WH', 'R', 'B', 'G', 'P', 'IB', 'YG'],
    shapes: ['Round rope'],
    features: ['360° visible glow', 'Bends in any direction', 'IP44 rated', 'Per-metre cutting'],
    warranty: '2-year'
  },
  {
    id: 'led-strip',
    name: 'LED Strip',
    category: 'Flexible',
    tagline: 'Hidden cove and accent lighting on a reel.',
    description: 'Professional SMD LED strip for cove lighting, under-cabinet illumination, display cases, and decorative accents. Self-adhesive backing for quick installation. Cut to length as needed.',
    wattages: [],
    finishes: ['WW', 'WH', 'NW'],
    shapes: ['Strip'],
    features: ['Self-adhesive 3M tape', 'Cut-to-length', 'IP20 / IP65 options', 'Consistent colour temperature'],
    warranty: '2-year'
  },
  {
    id: 'smps-driver',
    name: 'SMPS Driver',
    category: 'Power',
    tagline: 'Stable, protected power for your LED installs.',
    description: 'A switching-mode power supply (SMPS) for driving 12V and 24V LED strips and rope lights. Built-in short-circuit, overload, and over-voltage protection for safe, reliable operation.',
    wattages: [],
    finishes: [],
    shapes: [],
    features: ['12V / 24V DC output', 'Short-circuit protection', 'Overload protection', 'Compact metal housing'],
    warranty: '2-year'
  }

];