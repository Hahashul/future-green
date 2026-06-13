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
     categories  → array of one or more category names — must match the
                    json: values in CATS below (a product can appear in
                    more than one category)
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
   ★ json  → array of category strings that match values inside
             a product's `categories` array (a product can belong
             to more than one category at once)
             (null for "All Products" means show everything)
   ★ sub   → subtitle shown in the page header when this cat is active
   ★ hero  → path (relative to the site root) to the hero/banner image
             shown at the top of products.html when this category is
             active. Image files live directly in resources/ named
             cat-<slug>.jpeg (e.g. resources/cat-indoor.jpeg) — just
             drop the file in with the right name, no code changes needed.
──────────────────────────────────────────────────────────────── */
const CATS = [
  {
    slug: 'all',
    label: 'All Products',
    json: null,
    sub: 'Browse the complete Future Green LED range — all 31 products.',
    hero: 'resources/product-range-overview.png'
  },
  {
    slug: 'architectural',
    label: 'Architectural Lights',
    json: ['Architectural Lights'],
    sub: 'Elevation and façade lighting — wall washers and architectural wall lights for building exteriors.',
    hero: 'resources/cat-architectural.jpeg'
  },
  {
    slug: 'indoor',
    label: 'Indoor Lights',
    json: ['Indoor Lights'],
    sub: 'COB spotlights, slim panels, downlights, dual-colour designer lights, and strip lighting for homes and indoor spaces.',
    hero: 'resources/cat-indoor.jpeg'
  },
  {
    slug: 'landscape',
    label: 'Landscape Lights',
    json: ['Landscape Lights'],
    sub: 'Garden and landscape lighting for lawns, pathways, and outdoor décor.',
    hero: 'resources/cat-landscape.jpeg'
  },
  {
    slug: 'outdoor',
    label: 'Outdoor Lights',
    json: ['Outdoor Lights'],
    sub: 'Weatherproof outdoor LED lights — elevation wall lights, floodlights and power supplies for exteriors and security.',
    hero: 'resources/cat-outdoor.jpeg'
  },
  {
    slug: 'commercial',
    label: 'Commercial & Industrial Lights',
    json: ['Commercial & Industrial Lights'],
    sub: 'Heavy-duty flood lights, street lights, and slim panels for commercial and industrial spaces.',
    hero: 'resources/cat-commercial.jpeg'
  },
  {
    slug: 'office',
    label: 'Office Lights',
    json: ['Office Lights'],
    sub: 'Slim panels, downlights, and COB spotlights for comfortable, glare-free office illumination.',
    hero: 'resources/cat-office.jpeg'
  },
  {
    slug: 'stadium',
    label: 'Stadium Lights',
    json: ['Stadium Lights'],
    sub: 'High-power flood lights and street lights for stadiums and large outdoor venues.',
    hero: 'resources/cat-stadium.jpeg'
  },
];



/* ── PRODUCT LIST ───────────────────────────────────────────────
   ★ TO ADD A PRODUCT: copy any block below, paste after the last },
     change the values, and make sure each entry in `categories`
     matches a json: value in CATS above.
   ★ TO REMOVE: delete the whole { ... }, block.
──────────────────────────────────────────────────────────────── */
const PRODUCTS = [

  {
    id: 'iris_slim_panel',
    name: 'IRIS Slim Panel',
    categories: ['Indoor Lights', 'Commercial & Industrial Lights', 'Office Lights'],
    tagline: 'Frameless flush light that disappears into the ceiling.',
    description: 'An ultra-slim recessed panel that sits perfectly flush for a clean, modern ceiling. Spreads soft, even, glare-free light across living rooms, kitchens and offices.',
    wattages: [3, 8, 12, 15, 22],
    finishes: ['WW', 'WH', 'NW'],
    shapes: ['Round', 'Square'],
    features: [
      'Wafer-thin profile fits shallow false ceilings',
      '3-in-1 colour switch (warm / natural / cool) on select models',
      'Uniform glow with no visible hot spots'
    ],
    warranty: '2-year'
  },

  {
    id: 'ilex_pc_slim_panel',
    name: 'ILEX PC Slim Panel',
    categories: ['Indoor Lights', 'Commercial & Industrial Lights', 'Office Lights'],
    tagline: 'The Iris panel, toughened with a polycarbonate body.',
    description: 'Same flush, even glow as the Iris — built into a sturdy polycarbonate housing and diffuser that resists yellowing and stays bright for years.',
    wattages: [8, 12, 15, 22],
    finishes: ['WW', 'WH', 'NW'],
    shapes: ['Round', 'Square'],
    features: [
      'Durable PC body and diffuser, ideal for humid rooms',
      'Smooth, uniform light with a wide spread',
      '3-in-1 colour option on select models'
    ],
    warranty: '2-year'
  },

  {
    id: 'iris_surface_panel',
    name: 'IRIS Surface Panel',
    categories: ['Indoor Lights', 'Office Lights'],
    tagline: 'All the panel light — none of the ceiling cutting.',
    description: 'Mounts straight onto a solid ceiling, so it is perfect for concrete, rented homes and retrofits where recessing simply is not an option.',
    wattages: [8, 15, 22],
    finishes: ['WW', 'WH', 'NW'],
    shapes: ['Round', 'Square'],
    features: [
      'No cutout needed — fixes to any flat ceiling',
      '3-in-1 colour switch on select models',
      'Slim surface body with even, comfortable output'
    ],
    warranty: '2-year'
  },

  {
    id: 'ilex_surface_panel',
    name: 'ILEX Surface Panel',
    categories: ['Indoor Lights', 'Office Lights'],
    tagline: 'Rugged PC surface light for everyday spaces.',
    description: 'A domed polycarbonate surface light that throws a soft, wide glow — a dependable choice for corridors, balconies, stairwells and utility areas.',
    wattages: [6, 12, 18],
    finishes: ['WW', 'WH', 'NW'],
    shapes: ['Round', 'Square'],
    features: [
      'Tough polycarbonate build',
      'Soft, wide-angle diffusion',
      'Quick surface installation, no recess'
    ],
    warranty: '2-year'
  },

  {
    id: 'couple_slim_panel',
    name: 'Couple Slim Panel',
    categories: ['Indoor Lights'],
    tagline: 'Two lights in one — white core, colour halo.',
    description: 'A recessed panel with an independent coloured outer ring. Run the white centre alone for everyday light, or add the colour halo for mood and celebration.',
    wattages: [3, 4, 6, 12],
    finishes: ['WH', 'WW', 'R', 'B', 'G', 'P'],
    shapes: ['Round', 'Square'],
    features: [
      'White centre + coloured rim, switched independently',
      'Six halo finishes for instant ambience',
      'Perfect for festivals, bedrooms and lounges'
    ],
    warranty: '2-year'
  },

  {
    id: 'surface_couple_duo_panel',
    name: 'Surface Couple Duo Panel',
    categories: ['Indoor Lights'],
    tagline: 'The dual-colour Couple, in a surface-mount body.',
    description: 'White centre plus a coloured halo in a surface fixture — decorative accent lighting for solid ceilings, with no cavity or cutting required.',
    wattages: [3, 4, 6, 12],
    finishes: ['WH', 'WW', 'R', 'B', 'G', 'P'],
    shapes: ['Round', 'Square'],
    features: [
      'White + coloured ring, controlled separately',
      'Six halo colours to set any mood',
      'Surface fit — mounts on any flat ceiling'
    ],
    warranty: '2-year'
  },

  {
    id: 'tulip_deep_junction_duo',
    name: 'Tulip Deep Junction Duo',
    categories: ['Indoor Lights'],
    tagline: 'Dual-colour deep downlight for standard junction boxes.',
    description: 'A deep-set anti-glare downlight with a white core and coloured ring, sized to drop straight into a standard junction box opening.',
    wattages: [7, 12],
    finishes: ['WH', 'WW', 'R', 'B', 'G', 'P'],
    shapes: ['Round'],
    features: [
      'Fits standard junction-box cut-outs',
      'White + colour ring for daily and accent use',
      'Deep design softens glare for relaxed rooms'
    ],
    warranty: '2-year'
  },

  {
    id: 'frameless_downlight',
    name: 'Frameless Downlight',
    categories: ['Indoor Lights', 'Office Lights'],
    tagline: 'Surface-mount glow with no visible frame.',
    description: 'A clean, borderless surface light for ceilings without a cavity — minimal trim, maximum spread, and a seamless modern finish.',
    wattages: [10, 15, 24],
    finishes: ['WW', 'WH', 'NW'],
    shapes: ['Round', 'Square'],
    features: [
      'No false ceiling needed',
      'Borderless edge for a flush, modern look',
      'Wide, even spread from a low-profile body'
    ],
    warranty: '2-year'
  },

  {
    id: 'tulip_deep_light',
    name: 'Tulip Deep Light',
    categories: ['Indoor Lights', 'Office Lights'],
    tagline: 'Deep-set downlight that hides the glare.',
    description: 'The LED sits deep inside the housing, so you see the light, not the source — soft, comfortable pools of light for bedrooms and dining areas.',
    wattages: [3, 7, 12],
    finishes: ['WW', 'WH', 'NW'],
    shapes: ['Round'],
    features: [
      'Deep recess design cuts direct glare',
      'Flicker-free, eye-friendly output',
      'Compact cut-out with easy spring-clip fit'
    ],
    warranty: '2-year'
  },

  {
    id: 'lotus_concealed',
    name: 'Lotus Concealed',
    categories: ['Indoor Lights', 'Office Lights'],
    tagline: 'Adjustable COB spot that aims light exactly where you want.',
    description: 'A tiltable concealed COB spotlight for highlighting art, niches and architectural features — a crisp, focused beam behind a clean recessed trim.',
    wattages: [3, 5, 6],
    finishes: ['WH', 'WW', 'R', 'B', 'G', 'P'],
    shapes: ['Round'],
    features: [
      'Rotatable / tiltable head to aim the beam',
      'Sharp COB beam for accent and highlight',
      'Concealed trim sits flush in the ceiling'
    ],
    warranty: '2-year'
  },

  {
    id: 'lily_cob_downlight',
    name: 'Lily COB Downlight',
    categories: ['Indoor Lights', 'Office Lights'],
    tagline: 'Tiny COB downlight with a big, crisp punch.',
    description: 'A compact fixed COB downlight for tight spaces — wardrobes, display shelves and accent rows where a small, bright point of light does the job.',
    wattages: [3],
    finishes: ['WH', 'WW', 'R', 'B', 'G', 'P'],
    shapes: ['Round'],
    features: [
      'Small footprint, strong focused output',
      'Ideal for shelves, display and task accents',
      'Cool-running, low-wattage COB'
    ],
    warranty: '2-year'
  },

  {
    id: 'marigold_cob_spotlight',
    name: 'Marigold COB Spotlight',
    categories: ['Indoor Lights', 'Office Lights'],
    tagline: 'Square-trim COB spot with a tilting head.',
    description: 'A square recessed COB spotlight that tilts to direct a clean beam — a sharp, architectural look for modern interiors and retail.',
    wattages: [5],
    finishes: ['WH', 'WW', 'R', 'B', 'G', 'P'],
    shapes: ['Round', 'Square'],
    features: [
      'Square trim with adjustable tilt head',
      'Focused COB beam for accents and tasks',
      'Anti-glare reflector for comfortable light'
    ],
    warranty: '2-year'
  },

  {
    id: 'bluebell_cob_spotlight',
    name: 'Bluebell COB Spotlight',
    categories: ['Indoor Lights', 'Office Lights'],
    tagline: 'Deep-recess COB spotlight built to throw.',
    description: 'A larger tiltable COB spotlight with a finned heatsink for sustained brightness — strong, directional light for high ceilings, showrooms and retail.',
    wattages: [9, 12, 16, 30, 50],
    finishes: ['WH', 'WW', 'R', 'B', 'G', 'P'],
    shapes: ['Round'],
    features: [
      'Tilting head with deep anti-glare housing',
      'Finned heatsink for cool, stable performance',
      'Punchy directional beam for tall spaces'
    ],
    warranty: '2-year'
  },

  {
    id: 'dob_floodlight',
    name: 'DOB Floodlight',
    categories: ['Commercial & Industrial Lights', 'Stadium Lights'],
    tagline: 'Driver-on-board flood that lights up the whole yard.',
    description: 'A floodlight for facades, parking, signage and security — wide, powerful white light in a slim die-cast body that shrugs off the weather.',
    wattages: [50, 100, 150, 200],
    finishes: ['WH', 'WW'],
    shapes: [],
    features: [
      'DOB design means fewer failure points',
      'Weather-resistant for outdoor mounting',
      '50-200W coverage for large open areas'
    ],
    warranty: '2-year'
  },

  {
    id: 'orchid_floodlight',
    name: 'Orchid Floodlight',
    categories: ['Commercial & Industrial Lights', 'Stadium Lights'],
    tagline: 'Slim premium flood for facades and frontage.',
    description: 'A refined slim-profile floodlight for building fronts, hoardings and gardens — a clean, broad white wash with a low-glare face.',
    wattages: [50, 100, 150, 200],
    finishes: ['WH', 'WW'],
    shapes: [],
    features: [
      'Slim, low-profile die-cast housing',
      'Broad, even outdoor coverage',
      'Adjustable mounting bracket'
    ],
    warranty: '2-year'
  },

  {
    id: 'street_light',
    name: 'Street Light',
    categories: ['Commercial & Industrial Lights', 'Stadium Lights'],
    tagline: 'Roads, lanes and campuses — lit clean and bright.',
    description: 'An efficient LED street light for roads, society lanes, parking and industrial yards, with a wide throw and a sturdy outdoor build.',
    wattages: [24, 36, 50, 100],
    finishes: ['WH'],
    shapes: [],
    features: [
      'Wide road-optimised beam pattern',
      'Tough, weather-ready housing',
      '24-100W for side lanes to main roads'
    ],
    warranty: '2-year'
  },

  {
    id: '4way_ball',
    name: '4-Way Ball',
    categories: ['Outdoor Lights'],
    tagline: 'Four crisp beams from one sculptural sphere.',
    description: 'A spherical outdoor wall light that throws four directional beams — dramatic accents for facades, pillars, gates and boundary walls.',
    wattages: [],
    finishes: ['WW', 'WH', 'R', 'B', 'G', 'P', 'IB', 'YG'],
    shapes: [],
    features: [
      'Four-direction beam pattern',
      'Weather-ready for exterior walls',
      'Warm / white plus decorative colour options'
    ],
    warranty: '2-year'
  },

  {
    id: '2way_wall_curved',
    name: '2-Way Wall (Curved)',
    categories: ['Architectural Lights', 'Outdoor Lights'],
    tagline: 'Up-and-down wash for walls and entryways.',
    description: 'A compact up/down outdoor wall light casting twin beams for a modern architectural wash on gates, porches and columns.',
    wattages: [],
    finishes: ['WW', 'WH', 'NW'],
    shapes: [],
    features: [
      'Two-direction up / down beams',
      'Weather-ready exterior build',
      'Clean, minimal modern form'
    ],
    warranty: '2-year'
  },

  {
    id: '2way_wall_wedge',
    name: '2-Way Wall (Wedge)',
    categories: ['Architectural Lights', 'Outdoor Lights'],
    tagline: 'Sculpted wedge wall light with a warm up/down glow.',
    description: 'A faceted wedge-form wall light that casts a warm beam up and down — a designer accent for entrances, balconies and feature walls.',
    wattages: [],
    finishes: ['WW'],
    shapes: [],
    features: [
      'Twin up / down beam in a faceted body',
      'Warm-white glow for inviting entrances',
      'Weather-ready outdoor housing'
    ],
    warranty: '2-year'
  },

  {
    id: 'rope_light',
    name: 'Rope Light',
    categories: ['Indoor Lights'],
    tagline: 'Flexible glow that bends around anything.',
    description: 'Weather-friendly LED rope light for outlines, railings, festivals and facades — cut to length and run it along any curve.',
    wattages: [],
    finishes: ['WW', 'WH', 'R', 'B', 'G', 'P', 'IB', 'YG'],
    shapes: [],
    features: [
      'Bends around edges, railings and signage',
      'Eight finishes, from warm white to RGB tones',
      'Long runs with a low power draw'
    ],
    warranty: '2-year'
  },

  {
    id: 'led_strip',
    name: 'LED Strip',
    categories: ['Indoor Lights'],
    tagline: 'Hidden cove and accent lighting on a reel.',
    description: 'Self-adhesive LED strip for coves, under-cabinets, mirrors and shelves — tuck it out of sight and let the glow do the work.',
    wattages: [],
    finishes: ['WW', 'WH', 'NW'],
    shapes: [],
    features: [
      'Self-adhesive and cut-to-length',
      'Even line of light for coves and edges',
      'Pairs with the Future Green SMPS driver'
    ],
    warranty: '2-year'
  },

  {
    id: 'smps_driver',
    name: 'SMPS Driver',
    categories: ['Outdoor Lights'],
    tagline: 'Stable, protected power for your LED installs.',
    description: 'A switch-mode power supply delivering clean, regulated DC for strips, modules and signage — with built-in short-circuit and overload protection.',
    wattages: [],
    finishes: [],
    shapes: [],
    features: [
      'Regulated, stable output for long LED life',
      'Short-circuit, overload & over-voltage protection',
      'From 2A to 33A for small to large loads'
    ],
    warranty: '2-year'
  },

  {
    id: 'dahlia_cob_spotlight',
    name: 'Dahlia COB Spotlight',
    categories: ['Indoor Lights', 'Office Lights'],
    tagline: 'Jewel-finish reflector, deep anti-glare glow.',
    description: 'Flagship premium COB spotlight with a jewel-finish reflector and deep anti-glare cup, crafted for homes, retail & hospitality.',
    wattages: [7, 12, 18],
    finishes: ['WW', 'NW', 'WH', '3-in-1'],
    shapes: ['Round'],
    features: [
      'Rose-gold or gun-black mirror reflector',
      'Die-cast body + finned heatsink, ~50,000 hrs'
    ],
    warranty: '2-year'
  },

  {
    id: 'calla_deep_downlight',
    name: 'Calla Deep Downlight',
    categories: ['Indoor Lights', 'Office Lights'],
    tagline: 'Sleek deep downlight that hides the glare.',
    description: 'A flagship premium deep downlight crafted for homes, retail & hospitality with a deep anti-glare cup that tucks the LED out of sight.',
    wattages: [7, 12, 18],
    finishes: ['WW', 'NW', 'WH', '3-in-1'],
    shapes: ['Round'],
    features: [
      'Deep anti-glare cup tucks the LED out of sight',
      'Matte black or white die-cast body'
    ],
    warranty: '2-year'
  },

  {
    id: 'aster_track_spotlight',
    name: 'Aster Track Spotlight',
    categories: ['Indoor Lights', 'Commercial & Industrial Lights', 'Office Lights'],
    tagline: 'Adjustable surface spotlight for walls & tracks.',
    description: 'A premium adjustable surface spotlight for walls and tracks, crafted for homes, retail & hospitality with high-CRI COB output.',
    wattages: [9, 16, 30, 50],
    finishes: ['WW', 'NW', 'WH'],
    shapes: [],
    features: [
      'High-CRI COB with anti-glare reflector',
      'Adjustable head — surface or track mount'
    ],
    warranty: '2-year'
  },

  {
    id: 'magnolia_wall_light',
    name: 'Magnolia Wall Light',
    categories: ['Architectural Lights', 'Outdoor Lights'],
    tagline: 'Up-and-down glow with a warm gold interior.',
    description: 'Flagship premium wall light with twin up/down beams and a matte black body with warm gold interior, crafted for homes, retail & hospitality.',
    wattages: [6],
    finishes: ['WW'],
    shapes: [],
    features: [
      'Twin up / down beams for a refined wall wash',
      'Matte black body with warm gold interior'
    ],
    warranty: '2-year'
  },

  {
    id: 'camellia_surface_spot',
    name: 'Camellia Surface Spot',
    categories: ['Indoor Lights', 'Office Lights'],
    tagline: 'Surface cylinder spot with a jewel reflector.',
    description: 'A premium surface cylinder spot with a mirror-finish jewel reflector, crafted for homes, retail & hospitality.',
    wattages: [7, 12, 18],
    finishes: ['WH', 'WW', 'NW', '3-in-1'],
    shapes: [],
    features: [
      'Mirror-finish reflector in a clean cylinder',
      'Crisp COB beam for accent and highlight'
    ],
    warranty: '2-year'
  },

  {
    id: 'gazania_solar_street_light',
    name: 'Gazania Solar Street Light',
    categories: ['Outdoor Lights', 'Landscape Lights'],
    tagline: 'All-in-one solar street light — smart & bright.',
    description: 'A self-contained solar street light with panel, LiFePO4 battery and LED in one body. No wiring, no power bill — auto-on at dusk, with remote.',
    wattages: [5, 10, 15, 20],
    finishes: ['Cool White'],
    shapes: [],
    features: [
      '100% solar — zero electricity bill, no wiring',
      'Motion sensor + remote, smart dusk-dawn modes',
      'IP65 weatherproof, LiFePO4 long-life battery'
    ],
    warranty: '2-year'
  },

  {
    id: 'sunflower_high_bay',
    name: 'Sunflower High Bay',
    categories: ['Commercial & Industrial Lights', 'Stadium Lights'],
    tagline: 'Round high-power light for tall industrial spaces.',
    description: 'A powerful UFO-style high bay with a finned die-cast body and an adjustable bracket — bright, even light for warehouses, factories, workshops and large halls.',
    wattages: [100, 150, 200],
    finishes: ['WH', 'NW'],
    shapes: [],
    features: [
      'Finned die-cast body for cool, stable running',
      'Adjustable bracket aims the beam where it\'s needed',
      'High-output 100-200W for high-ceiling spaces'
    ],
    warranty: '2-year'
  },

  {
    id: 'daisy_garden_spike',
    name: 'Daisy Garden Spike',
    categories: ['Landscape Lights', 'Outdoor Lights'],
    tagline: 'Spike-mount spotlight to light up gardens.',
    description: 'A weatherproof spike spotlight that pushes straight into soil — uplight plants, trees and pathways, in warm white or four vivid accent colours.',
    wattages: [7, 9, 12],
    finishes: ['WW', 'G', 'R', 'P', 'B'],
    shapes: [],
    features: [
      'Ground spike — no drilling or fixing',
      'Adjustable head aims the beam',
      'Warm white plus green, red, pink & blue'
    ],
    warranty: '2-year'
  },

  {
    id: 'track_rail',
    name: 'Track Rail',
    categories: ['Indoor Lights', 'Commercial & Industrial Lights', 'Office Lights'],
    tagline: 'Surface track for LED track spotlights.',
    description: 'The mounting rail that powers and positions track spotlights — run one length or join sections for a continuous, ceiling-mounted lighting line.',
    wattages: [],
    finishes: ['White', 'Black'],
    shapes: [],
    features: [
      'Surface-mounted single-circuit track',
      'Pairs with the Aster Track Spotlight',
      'Join 1 m and 2 m sections for any layout'
    ],
    warranty: '2-year'
  }

];