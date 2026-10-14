export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp: number;
  category: string;
  brand: string;
  unit: string;
  stock: number;
  image: string; // base64 or URL
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const CATEGORIES = [
  "Plumbing",
  "Ceramic & Sanitary",
  "Pipes & Fittings",
  "Valves & Taps",
  "Paint - Wood",
  "Paint - Iron",
  "General Hardware",
  "Tools",
  "Suppliers & Wholesale",
  "Electrical",
  "Fasteners & Screws",
  "Safety Equipment",
];

export interface CategoryInfo {
  name: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
}

export const CATEGORY_DETAILS: CategoryInfo[] = [
  {
    name: "Plumbing",
    slug: "plumbing",
    title: "Plumbing Supplies & Solutions in Birgunj, Nepal",
    description: "Wholesale and retail plumbing pipes, fittings, solutions, and sanitary accessories at Siyaram Hardware & Suppliers, Nagawa Chowk, Birgunj.",
    icon: "🚿",
  },
  {
    name: "Ceramic & Sanitary",
    slug: "ceramic-sanitary",
    title: "Ceramic & Sanitaryware in Birgunj, Nepal",
    description: "High-grade ceramic wash basins, bathroom sanitaryware, and ceramic plumbing essentials at Siyaram Hardware & Suppliers, Birgunj.",
    icon: "🛁",
  },
  {
    name: "Pipes & Fittings",
    slug: "pipes-fittings",
    title: "Pipes & Fittings (PVC, CPVC, UPVC) in Birgunj, Nepal",
    description: "Heavy duty 110 mm PVC pipes, bends, CPVC pressure pipes, and pipe fittings from Apex, Supreme, Astral at Siyaram Hardware & Suppliers.",
    icon: "🔧",
  },
  {
    name: "Valves & Taps",
    slug: "valves-taps",
    title: "Valves, Taps & Bathroom Mixers in Birgunj, Nepal",
    description: "CPVC ball valves, brass taps, bibcocks, and luxury mixer taps with durable leak-proof quality at Siyaram Hardware & Suppliers.",
    icon: "🚰",
  },
  {
    name: "Paint - Wood",
    slug: "paint-wood",
    title: "Wood Paints, Primers & Polishes in Birgunj, Nepal",
    description: "Premium wood primers, enamel paints, varnishes, and timber sealants for interior and exterior furniture at Siyaram Hardware.",
    icon: "🪵",
  },
  {
    name: "Paint - Iron",
    slug: "paint-iron",
    title: "Iron Paints, Anti-Rust Coatings in Birgunj, Nepal",
    description: "Corrosion protection, black gloss enamel, red oxide primers, and metal protective coatings for gates, grills, and structural iron.",
    icon: "🛡️",
  },
  {
    name: "General Hardware",
    slug: "general-hardware",
    title: "General Hardware & Construction Store in Birgunj, Nepal",
    description: "Comprehensive hardware materials, builder hardware, locks, hinges, and construction supplies at Siyaram Hardware & Suppliers.",
    icon: "📦",
  },
  {
    name: "Tools",
    slug: "tools",
    title: "Hand Tools & Power Equipment in Birgunj, Nepal",
    description: "Pliers, wrenches, pipe cutters, hammers, and professional tool sets for plumbers, electricians, and carpenters in Birgunj.",
    icon: "🔨",
  },
  {
    name: "Suppliers & Wholesale",
    slug: "suppliers",
    title: "Wholesale Hardware Suppliers & Bulk Contractor Orders in Nepal",
    description: "B2B wholesale pricing, contractor bulk supply, project material delivery across Birgunj, Parsa, and Madhesh Province, Nepal.",
    icon: "🏗️",
  },
  {
    name: "Electrical",
    slug: "electrical",
    title: "Electrical Fittings & Supplies in Birgunj, Nepal",
    description: "Conduits, wire accessories, and durable electrical installation hardware at Siyaram Hardware & Suppliers.",
    icon: "⚡",
  },
  {
    name: "Fasteners & Screws",
    slug: "fasteners-screws",
    title: "Nut Bolts, Screws & Fasteners in Birgunj, Nepal",
    description: "Stainless steel hex bolts, self-tapping screws, anchor fasteners, and hardware brackets for construction and carpentry.",
    icon: "⚙️",
  },
];

export const UNITS = ["Piece", "Kg", "Litre", "Box", "Pair", "Set", "Metre", "Roll", "Pack"];
