// ═══════════════════════════════════════════════════════════
//  STORE & SEO CONSTANTS
//  Edit this file to update info across the entire website
// ═══════════════════════════════════════════════════════════

// ── Store Info ──────────────────────────────────────────────
export const STORE_NAME       = "Siyaram Hardware & Suppliers";
export const STORE_ALTERNATE_NAMES = [
  "Siyaram Hardware & Suppliers",
  "Siya Ram Hardware and Suppliers",
  "Siyaram Hardware and Suppliers",
  "Siya Ram Hardware & Suppliers",
  "Siyaram Hardware",
  "Siya Ram Hardware",
  "Siyaram Hardware Birgunj",
  "Siya Ram Hardware Birgunj",
  "Siyaram Hardware and Suppliers Birgunj",
  "SHS",
];
export const STORE_TAGLINE    = "Your Trusted Hardware & Sanitary Partner in Birgunj";
export const STORE_ADDRESS    = "Nagawa Chowk, Birgunj";
export const STORE_CITY       = "Birgunj";
export const STORE_DISTRICT   = "Parsa";
export const STORE_REGION     = "Madhesh Province";
export const STORE_COUNTRY    = "Nepal";
export const STORE_COUNTRY_CODE = "NP";
export const GEO_REGION_CODE  = "NP-P2";          // Parsa district ISO code (matches CEO's personal site)
export const GEO_LAT          = "27.0104";
export const GEO_LNG          = "84.8779";        // matches pradeepshah.com.np for consistency
export const STORE_PHONE      = "+977 9815256619";
export const STORE_PHONE_RAW  = "9779815256619";  // for wa.me / tel: links
export const STORE_HOURS      = "Mon–Sat: 8am – 8pm (Open Today)";
export const STORE_HOURS_SCHEMA = "Mo-Sa 08:00-20:00";
export const STORE_EMAIL      = "siyaramhardwaresuppliers@gmail.com";

// ── CEO / Founder ────────────────────────────────────────────
export const CEO_NAME         = "Pradeep Shah";
export const CEO_FIRST_NAME   = "Pradeep";
export const CEO_LAST_NAME    = "Shah";
export const CEO_ALTERNATE_NAMES = [
  "ipradeepshah",
  "i_pradeepshah",
  "Pradeep Shah Birgunj",
  "Pradeep Shah Siya Ram Hardware",
  "Pradeep Shah Siyaram",
];
export const CEO_TITLE        = "CEO & Founder, Siyaram Hardware & Suppliers";
export const CEO_SHORT_TITLE  = "CEO & Founder";
export const CEO_EMAIL        = "ipradeepshah@gmail.com";
export const CEO_PERSONAL_SITE = "https://www.pradeepshah.com.np";

// ── Education (verified from personal site) ──────────────────
export const CEO_EDUCATION = {
  degree     : "B. Tech. in Computer Science & Engineering",
  institution: "Kurukshetra University",
  location   : "Kurukshetra, India",
};

// ── Second venture (verified from personal site) ──────────────
export const STANDARD_ERP = {
  name  : "Standard ERP",
  role  : "Founder",
  status: "In Development",
  desc  : "An integrated business management platform combining accounting, inventory, billing, and reporting — built for SMEs in Nepal.",
  url   : "https://www.pradeepshah.com.np/standard-erp",
};

// Bio aligned with pradeepshah.com.np meta description for consistency
export const CEO_BIO = "Pradeep Shah is a Computer Engineer (B. Tech, Computer Science & Engineering, Kurukshetra University, India) and the CEO & Founder of Siya Ram Hardware and Suppliers (Siyaram Hardware & Suppliers), a growing hardware and construction-materials business at Nagawa Chowk, Birgunj, Nepal, serving contractors, builders, and local businesses with plumbing supplies, pipes, valves, paints, tools, and general hardware. He is also the Founder of Standard ERP, a business management software platform in development for small and medium enterprises in Nepal.";

export const CEO_DESCRIPTION = "Pradeep Shah is a Computer Engineer from Kurukshetra University, CEO of Siya Ram Hardware and Suppliers (Siyaram Hardware & Suppliers) in Birgunj, Nepal, and Founder of Standard ERP — building next-generation business management software for SMEs.";

// ── CEO Social Profiles (verified from pradeepshah.com.np) ────
export const CEO_SOCIALS = {
  linkedin  : "https://www.linkedin.com/in/ipradeepshah/",
  twitter   : "https://x.com/i_pradeepshah",
  instagram : "https://www.instagram.com/i_pradeepshah",
  tiktok    : "https://www.tiktok.com/@ipradeepshah",
  github    : "https://github.com/ipradeepshah",
  facebook  : "https://www.facebook.com/ipradeepshah/",
};

// ── Store Social Profiles (verified) ──────────────────────────
export const STORE_SOCIALS = {
  facebook   : "https://www.facebook.com/siyaramhardware.np",
  instagram  : "https://www.instagram.com/siyaramhardware.np/",
  crunchbase : "https://www.crunchbase.com/organization/siyaram-hardware-suppliers",
  googleBusiness: "https://share.google/y5g6VBgFwcjzaMtkh",
  whatsapp   : `https://wa.me/9779815256619`,
};

// ── Website / SEO ────────────────────────────────────────────
export const SITE_URL         = "https://www.siyaramhardware.com.np";
export const SITE_DESCRIPTION = "Siya Ram Hardware and Suppliers (Siyaram Hardware & Suppliers) at Nagawa Chowk, Birgunj, Nepal — your trusted local hardware shop & supplier for fairprice plumbing, PVC pipes, sanitaryware, hose pipe fittings, paints, tools, and general hardware. Open today 8am – 8pm. Founded by Pradeep Shah, Computer Engineer and CEO.";
export const CEO_PAGE_TITLE  = "Pradeep Shah - CEO - Siya Ram Hardware and Suppliers | Siyaram Hardware & Suppliers";

// Core Search Console & Customer Intent Queries
export const SITE_KEYWORDS    = [
  // Google Search Console Verified Top Queries (from performance report)
  "siyaram",
  "siya ram",
  "siya ram hardware",
  "siya ram hardware and suppliers",
  "plumber near me",
  "hardware shop near me",
  "hardware",
  "birgunj",
  "hose pipe fittings near me",
  "its open today",
  "sanitary shop near me",
  "suppliers",
  "fairprice",
  // Brand variations
  "Siyaram Hardware Birgunj",
  "Siya Ram Hardware Birgunj",
  "Siyaram Hardware & Suppliers",
  "Siya Ram Hardware and Suppliers - CEO",
  "Pradeep Shah - CEO - Siya Ram Hardware and Suppliers",
  "Pradeep Shah - CEO - Siyaram Hardware & Suppliers",
  "Pradeep Shah CEO",
  "Pradeep Shah Birgunj",
  "Pradeep Shah Nepal",
  "Pradeep Shah Computer Engineer",
  "ipradeepshah",
  "i_pradeepshah",
  // Local intent & Products
  "hardware store Birgunj Nepal",
  "plumbing supplies Birgunj",
  "sanitary store Birgunj",
  "ceramic sanitaryware Birgunj",
  "pipes and fittings Nepal",
  "hose pipe Birgunj",
  "valves taps Birgunj",
  "wood paint Birgunj",
  "iron paint Nepal",
  "hardware suppliers Madhesh",
  "fairprice hardware Birgunj",
  "Best hardware shop in Birgunj",
  "CPVC pipes Birgunj",
  "PVC pipes Nepal",
  "110 mm PVC pipe Birgunj",
  "110 mm PVC bend band Nepal",
  "Hardware wholesale Nepal",
  "Building materials Nepal",
  "Paints and plumbing Birgunj",
  "Standard ERP Nepal",
  "Kurukshetra University Nepal alumni",
  "construction materials Birgunj",
  "tools hardware Nepal",
  "Nagawa Chowk hardware",
  "general hardware Birgunj",
  "plumbing Nepal",
];

// ── WhatsApp Helper ──────────────────────────────────────────
export const whatsappLink = (message: string) =>
  `https://wa.me/${STORE_PHONE_RAW}?text=${encodeURIComponent(message)}`;
