// ═══════════════════════════════════════════════════════════
//  STORE & SEO CONSTANTS
//  Edit this file to update info across the entire website
// ═══════════════════════════════════════════════════════════

// ── Store Info ──────────────────────────────────────────────
export const STORE_NAME       = "Siyaram Hardware & Suppliers";
export const STORE_TAGLINE    = "Your Trusted Hardware Partner in Birgunj";
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
export const STORE_HOURS      = "Mon–Sat: 8am – 8pm";
export const STORE_HOURS_SCHEMA = "Mo-Sa 08:00-20:00";
export const STORE_EMAIL      = "ipradeepshah@gmail.com";

// ── CEO / Founder ────────────────────────────────────────────
export const CEO_NAME         = "Pradeep Shah";
export const CEO_FIRST_NAME   = "Pradeep";
export const CEO_LAST_NAME    = "Shah";
export const CEO_ALTERNATE_NAMES = ["ipradeepshah", "i_pradeepshah", "Pradeep Shah Birgunj", "Pradeep Shah Siyaram"];
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
export const CEO_BIO = "Pradeep Shah is a Computer Engineer (B. Tech, Computer Science & Engineering, Kurukshetra University, India) and the CEO & Founder of Siyaram Hardware & Suppliers, a growing hardware and construction-materials business at Nagawa Chowk, Birgunj, Nepal, serving contractors, builders, and local businesses with plumbing supplies, pipes, valves, paints, tools, and general hardware. He is also the Founder of Standard ERP, a business management software platform in development for small and medium enterprises in Nepal.";

export const CEO_DESCRIPTION = "Pradeep Shah is a Computer Engineer from Kurukshetra University, CEO of Siyaram Hardware & Suppliers in Birgunj, Nepal, and Founder of Standard ERP — building next-generation business management software for SMEs.";

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
export const SITE_URL         = "https://siyaramhardware.com";   // ← update when you get a domain
export const SITE_DESCRIPTION = "Siyaram Hardware & Suppliers at Nagawa Chowk, Birgunj, Nepal — your trusted source for plumbing, pipes, valves, wood & iron paints, tools and general hardware. Founded and led by Pradeep Shah, Computer Engineer and CEO.";
export const SITE_KEYWORDS    = [
  "Siyaram Hardware Birgunj",
  "hardware store Birgunj Nepal",
  "plumbing supplies Birgunj",
  "pipes and fittings Nepal",
  "valves taps Birgunj",
  "wood paint Birgunj",
  "iron paint Nepal",
  "hardware suppliers Madhesh",
  "Pradeep Shah",
  "Pradeep Shah Nepal",
  "Pradeep Shah CEO",
  "Pradeep Shah Birgunj",
  "Pradeep Shah Siyaram Hardware",
  "ipradeepshah",
  "i_pradeepshah",
  "Standard ERP Nepal",
  "Computer Engineer Nepal",
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
