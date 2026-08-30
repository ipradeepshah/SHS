import type { Metadata } from "next";
import Link from "next/link";
import {
  CEO_NAME, CEO_TITLE, CEO_SHORT_TITLE, CEO_BIO, CEO_DESCRIPTION,
  CEO_SOCIALS, CEO_EMAIL, CEO_PERSONAL_SITE, CEO_ALTERNATE_NAMES,
  CEO_EDUCATION, STANDARD_ERP,
  STORE_NAME, STORE_ADDRESS, STORE_CITY, STORE_REGION,
  STORE_PHONE, STORE_PHONE_RAW, STORE_COUNTRY_CODE,
  SITE_URL, whatsappLink,
} from "@/lib/constants";

// ── Page Metadata ──────────────────────────────────────────────
export const metadata: Metadata = {
  title      : `${CEO_NAME} — ${CEO_SHORT_TITLE}, ${STORE_NAME}`,
  description: CEO_DESCRIPTION,
  keywords   : [
    CEO_NAME,
    `${CEO_NAME} CEO`,
    `${CEO_NAME} Birgunj`,
    `${CEO_NAME} hardware`,
    `${CEO_NAME} Siyaram`,
    "Pradeep Shah Nepal",
    "Pradeep Shah Computer Engineer",
    "Pradeep Shah Standard ERP",
    "ipradeepshah",
    "i_pradeepshah",
    "CEO Siyaram Hardware",
    "Founder hardware store Birgunj",
    "Kurukshetra University alumni Nepal",
    "hardware entrepreneur Nepal",
  ],
  authors   : [{ name: CEO_NAME, url: CEO_PERSONAL_SITE }],
  alternates: { canonical: `${SITE_URL}/ceo` },

  openGraph: {
    type       : "profile",
    url        : `${SITE_URL}/ceo`,
    title      : `${CEO_NAME} | ${CEO_SHORT_TITLE} — ${STORE_NAME}`,
    description: CEO_DESCRIPTION,
    firstName  : "Pradeep",
    lastName   : "Shah",
    images: [{
      url   : `${CEO_PERSONAL_SITE}/pradeep-shah.jpg`,
      width : 1200,
      height: 630,
      alt   : `${CEO_NAME} — CEO of ${STORE_NAME}`,
    }],
  },

  twitter: {
    card       : "summary_large_image",
    site       : "@i_pradeepshah",
    creator    : "@i_pradeepshah",
    title      : `${CEO_NAME} | CEO, ${STORE_NAME}`,
    description: CEO_DESCRIPTION,
    images     : [`${CEO_PERSONAL_SITE}/og-image.jpg`],
  },
};

// ── Person + BreadcrumbList JSON-LD ───────────────────────────
const personSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // BreadcrumbList
    {
      "@type"          : "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home",             "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": `${CEO_NAME} — CEO`, "item": `${SITE_URL}/ceo` },
      ],
    },
    
    // ProfilePage Schema
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/ceo#profile`,
      "url": `${SITE_URL}/ceo`,
      "mainEntity": { "@id": `${SITE_URL}/ceo#pradeep-shah` },
      "name": `${CEO_NAME} | ${CEO_TITLE}`
    },
    // Person schema — key for Google Knowledge Panel. Kept identical to pradeepshah.com.np
    {
      "@type"        : "Person",
      "@id"          : `${SITE_URL}/ceo#pradeep-shah`,
      "name"         : CEO_NAME,
      "givenName"    : "Pradeep",
      "familyName"   : "Shah",
      "alternateName": CEO_ALTERNATE_NAMES,
      "jobTitle"     : CEO_TITLE,
      "description"  : CEO_DESCRIPTION,
      "email"        : CEO_EMAIL,
      "telephone"    : `+${STORE_PHONE_RAW}`,
      "url"          : CEO_PERSONAL_SITE,
      "mainEntityOfPage": CEO_PERSONAL_SITE,
      "image": {
        "@type"      : "ImageObject",
        "url"        : `${CEO_PERSONAL_SITE}/pradeep-shah.jpg`,
        "description": `${CEO_NAME} — ${CEO_TITLE}`,
      },
      "worksFor": {
        "@type"  : "Organization",
        "@id"    : `${SITE_URL}/#organization`,
        "name"   : STORE_NAME,
        "url"    : SITE_URL,
        "address": {
          "@type"          : "PostalAddress",
          "streetAddress"  : "Nagawa Chowk",
          "addressLocality": STORE_CITY,
          "addressRegion"  : STORE_REGION,
          "addressCountry" : STORE_COUNTRY_CODE,
        },
      },
      "alumniOf": {
        "@type"  : "CollegeOrUniversity",
        "name"   : CEO_EDUCATION.institution,
        "address": { "@type": "PostalAddress", "addressCountry": "IN", "addressLocality": "Kurukshetra" },
      },
      "address": {
        "@type"          : "PostalAddress",
        "addressLocality": STORE_CITY,
        "addressRegion"  : STORE_REGION,
        "addressCountry" : STORE_COUNTRY_CODE,
      },
      "nationality": { "@type": "Country", "name": "Nepal" },
      "knowsAbout": [
        "Hardware Retail", "Plumbing Supplies", "Construction Materials",
        "Computer Engineering", "ERP Software", "Business Management",
        "Supply Chain Management", "Software Development", "Digital Transformation",
      ],
      "hasOccupation": [
        {
          "@type": "Occupation",
          "name" : "Chief Executive Officer",
          "occupationLocation": { "@type": "City", "name": STORE_CITY },
          "description": `CEO of ${STORE_NAME}, a hardware and construction-materials business in ${STORE_CITY}, Nepal`,
        },
        {
          "@type": "Occupation",
          "name" : "Founder",
          "description": `Founder of ${STANDARD_ERP.name}, a business management software platform for Nepali SMEs (${STANDARD_ERP.status})`,
        },
      ],
      // sameAs is CRITICAL for Google Knowledge Panel — identical to personal site
      "sameAs": [
        CEO_PERSONAL_SITE,
        CEO_SOCIALS.linkedin,
        CEO_SOCIALS.twitter,
        CEO_SOCIALS.instagram,
        CEO_SOCIALS.tiktok,
        CEO_SOCIALS.github,
        CEO_SOCIALS.facebook,
      ],
    },
  ],
};

// ── Styles ──────────────────────────────────────────────────────
const S = {
  page       : { background: "#f9fafb", minHeight: "100vh" } as React.CSSProperties,
  container  : { maxWidth: "960px", margin: "0 auto", padding: "0 20px 60px" } as React.CSSProperties,
  card       : { background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "28px" } as React.CSSProperties,
  sectionHead: { fontSize: "18px", fontWeight: 700, color: "#0f2557", marginBottom: "16px", paddingBottom: "10px", borderBottom: "2px solid #fff7ed" } as React.CSSProperties,
  tag        : { background: "#fff7ed", color: "#ea6c00", fontSize: "12px", fontWeight: 600, padding: "5px 14px", borderRadius: "20px" } as React.CSSProperties,
  socialBtn  : { padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" } as React.CSSProperties,
};

// ── CEO Page ──────────────────────────────────────────────────
export default function CEOPage() {
  const expertise = [
    { icon: "💻", title: "Computer Engineering",  desc: "B. Tech in Computer Science & Engineering from Kurukshetra University — systems architecture, software development, and database design." },
    { icon: "🏢", title: "CEO Leadership",        desc: "Executive leadership at Siyaram Hardware & Suppliers — strategy, operations, team management, and business modernization in Birgunj." },
    { icon: "📊", title: "ERP & Business Systems",desc: "Founder-level expertise designing Standard ERP — an integrated business management platform for SMEs in Nepal." },
    { icon: "🔧", title: "Hardware & Plumbing",   desc: "Deep expertise in plumbing supplies, pipes, fittings, valves, taps, paints and general hardware." },
    { icon: "🔗", title: "Supply Chain",          desc: "Procurement, vendor management, logistics and distribution of construction materials and hardware in Nepal." },
    { icon: "🚀", title: "Product Strategy",      desc: "End-to-end product thinking — from identifying SME pain points to building software that solves real operational problems." },
  ];

  const timeline = [
    { tag: "Education", title: "B.E. Computer Engineering",            desc: `Completed a ${CEO_EDUCATION.degree} at ${CEO_EDUCATION.institution}, ${CEO_EDUCATION.location} — building expertise in software development, algorithms, databases and systems design.` },
    { tag: "Career",    title: `CEO — ${STORE_NAME}`,                   desc: `Took leadership of ${STORE_NAME} in ${STORE_CITY}, Parsa, Nepal — driving growth, modernizing operations, and building a reputation for quality and reliability in the hardware and construction materials sector.` },
    { tag: "Founding",  title: `Founded ${STANDARD_ERP.name}`,          desc: `${STANDARD_ERP.desc} (${STANDARD_ERP.status}).` },
    { tag: "Vision",    title: "Building the Future",                   desc: `Continuing to grow ${STORE_NAME} while developing ${STANDARD_ERP.name} to empower small and medium businesses across Nepal with modern, accessible technology.` },
  ];

  return (
    <main style={S.page} itemScope itemType="https://schema.org/Person">

      {/* ── JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* ── Top bar ── */}
      <div style={{ background: "#ea6c00", padding: "8px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px", color: "#fff" }}>
        <Link href="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}>
          ← {STORE_NAME}
        </Link>
        <span>📞 {STORE_PHONE}</span>
      </div>

      {/* ── Hero Section ── */}
      <div style={{ background: "linear-gradient(135deg, #0f2557 0%, #1a3a8f 50%, #0f2557 100%)", padding: "60px 20px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "-80px", top: "-80px",  width: "320px", height: "320px", borderRadius: "50%", background: "#ea6c00", opacity: 0.06 }} />
        <div style={{ position: "absolute", left: "-60px",  bottom: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "#fff", opacity: 0.04 }} />

        <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", alignItems: "center", gap: "40px", flexWrap: "wrap", position: "relative", zIndex: 1 }}>

          {/* Avatar */}
          <div style={{ flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              itemProp="image"
              src="/pradeep-shah.jpg"
  alt="Pradeep Shah — CEO of Siyaram Hardware & Suppliers"
  style={{
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center top",
    border: "4px solid rgba(255,255,255,0.2)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  }}
/>
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: "260px" }}>
            <p itemProp="jobTitle" style={{ color: "#fb923c", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>
              CEO · Founder · Computer Engineer
            </p>
            <h1 itemProp="name" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: "#fff", margin: "0 0 6px", lineHeight: 1.1 }}>
              {CEO_NAME}
            </h1>
            <p style={{ color: "#93c5fd", fontSize: "16px", margin: "0 0 20px" }} itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
              <span itemProp="name">{STORE_NAME}</span> · {STORE_ADDRESS}
            </p>

            {/* Social links — verified profiles */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <a href={CEO_PERSONAL_SITE} itemProp="sameAs" target="_blank" rel="noopener noreferrer me"
                style={{ ...S.socialBtn, background: "#ea6c00", color: "#fff" }}>
                🌐 Personal Website
              </a>
              <a href={CEO_SOCIALS.linkedin} itemProp="sameAs" target="_blank" rel="noopener noreferrer me"
                style={{ ...S.socialBtn, background: "#0A66C2", color: "#fff" }}>
                in LinkedIn
              </a>
              <a href={CEO_SOCIALS.twitter} itemProp="sameAs" target="_blank" rel="noopener noreferrer me"
                style={{ ...S.socialBtn, background: "#000", color: "#fff" }}>
                𝕏 Twitter
              </a>
              <a href={CEO_SOCIALS.instagram} itemProp="sameAs" target="_blank" rel="noopener noreferrer me"
                style={{ ...S.socialBtn, background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", color: "#fff" }}>
                📸 Instagram
              </a>
              <a href={CEO_SOCIALS.facebook} itemProp="sameAs" target="_blank" rel="noopener noreferrer me"
                style={{ ...S.socialBtn, background: "#1877F2", color: "#fff" }}>
                f Facebook
              </a>
              <a href={CEO_SOCIALS.tiktok} itemProp="sameAs" target="_blank" rel="noopener noreferrer me"
                style={{ ...S.socialBtn, background: "#000", color: "#fff" }}>
                🎵 TikTok
              </a>
              <a href={CEO_SOCIALS.github} itemProp="sameAs" target="_blank" rel="noopener noreferrer me"
                style={{ ...S.socialBtn, background: "#24292e", color: "#fff" }}>
                💻 GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f1f5f9", padding: "12px 20px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", fontSize: "13px", color: "#6b7280", display: "flex", alignItems: "center", gap: "8px" }}>
          <Link href="/" style={{ color: "#ea6c00", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <span style={{ color: "#374151", fontWeight: 500 }}>{CEO_NAME} — CEO</span>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={S.container}>
        <div style={{ paddingTop: "36px", display: "grid", gap: "24px" }}>

          {/* About */}
          <article style={S.card}>
            <meta itemProp="name"     content={CEO_NAME} />
            <meta itemProp="jobTitle" content={CEO_TITLE} />
            <meta itemProp="url"      content={CEO_PERSONAL_SITE} />
            <meta itemProp="email"    content={CEO_EMAIL} />
            <meta itemProp="worksFor" content={STORE_NAME} />
            <h2 style={S.sectionHead}>About {CEO_NAME}</h2>
            <p style={{ color: "#374151", fontSize: "16px", lineHeight: 1.8, margin: "0 0 16px" }} itemProp="description">
              {CEO_BIO}
            </p>
            <p style={{ color: "#4b5563", fontSize: "15px", lineHeight: 1.8, margin: 0 }}>
              Returning to {STORE_CITY}, Nepal after his engineering studies, Pradeep took the helm of{" "}
              <strong>{STORE_NAME}</strong>, focusing on combining operational excellence with modern
              technology. His engineering background gives him a unique edge — he doesn&apos;t just identify
              business problems, he architects solutions to solve them. Read his full story on his{" "}
              <a href={`${CEO_PERSONAL_SITE}/about`} target="_blank" rel="noopener noreferrer" style={{ color: "#ea6c00", fontWeight: 600 }}>
                personal website
              </a>.
            </p>
          </article>

          {/* Quick Info Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            {[
              { label: "Full Name",   value: CEO_NAME,                              icon: "👤" },
              { label: "Role",        value: CEO_SHORT_TITLE,                       icon: "💼" },
              { label: "Education",   value: CEO_EDUCATION.institution,             icon: "🎓" },
              { label: "Company",     value: STORE_NAME,                            icon: "🏪" },
              { label: "Also Founder",value: STANDARD_ERP.name,                     icon: "⚙️" },
              { label: "Location",    value: `${STORE_CITY}, Nepal`,                icon: "📍" },
              { label: "Phone",       value: STORE_PHONE,                           icon: "📞" },
              { label: "Email",       value: CEO_EMAIL,                             icon: "✉️" },
            ].map((item) => (
              <div key={item.label} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "18px" }}>
                <div style={{ fontSize: "22px", marginBottom: "6px" }}>{item.icon}</div>
                <p style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>{item.label}</p>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#0f2557", margin: 0, wordBreak: "break-word" }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Ventures */}
          <section style={S.card}>
            <h2 style={S.sectionHead}>Ventures Built</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>

              {/* Siyaram Hardware */}
              <div style={{ background: "#f9fafb", borderRadius: "12px", border: "1px solid #f1f5f9", padding: "20px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#16a34a", background: "#dcfce7", padding: "3px 10px", borderRadius: "20px" }}>✦ Active</span>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f2557", margin: "10px 0 6px" }}>{STORE_NAME}</h3>
                <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, margin: "0 0 12px" }}>
                  A growing hardware and supply business in {STORE_CITY}, Nepal — specializing in construction
                  materials, hardware tools, plumbing supplies, and industrial products for contractors and builders.
                </p>
                <Link href="/" style={{ color: "#ea6c00", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
                  Visit Store →
                </Link>
              </div>

              {/* Standard ERP */}
              <div style={{ background: "#f9fafb", borderRadius: "12px", border: "1px solid #f1f5f9", padding: "20px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#d97706", background: "#fef3c7", padding: "3px 10px", borderRadius: "20px" }}>⚡ {STANDARD_ERP.status}</span>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f2557", margin: "10px 0 6px" }}>{STANDARD_ERP.name}</h3>
                <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, margin: "0 0 12px" }}>
                  {STANDARD_ERP.desc}
                </p>
                <a href={STANDARD_ERP.url} target="_blank" rel="noopener noreferrer" style={{ color: "#ea6c00", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
                  Learn More →
                </a>
              </div>
            </div>
          </section>

          {/* Areas of Expertise */}
          <section style={S.card}>
            <h2 style={S.sectionHead}>Skills &amp; Expertise</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>
              {expertise.map((item) => (
                <div key={item.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "14px", background: "#f9fafb", borderRadius: "10px", border: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: "28px", flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, color: "#0f2557", fontSize: "14px", margin: "0 0 4px" }}>{item.title}</p>
                    <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section style={S.card}>
            <h2 style={S.sectionHead}>Journey</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {timeline.map((m, i) => (
                <div key={m.tag} style={{ display: "flex", gap: "20px", position: "relative" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: "76px", height: "32px", borderRadius: "16px", background: "#ea6c00", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "11px", fontWeight: 700, textAlign: "center", flexShrink: 0, zIndex: 1 }}>
                      {m.tag}
                    </div>
                    {i < timeline.length - 1 && (
                      <div style={{ width: "2px", flex: 1, background: "#e5e7eb", minHeight: "24px" }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < timeline.length - 1 ? "24px" : "0", flex: 1 }}>
                    <h3 style={{ fontWeight: 700, color: "#111827", fontSize: "15px", margin: "4px 0 6px" }}>{m.title}</h3>
                    <p style={{ fontSize: "14px", color: "#6b7280", margin: 0, lineHeight: 1.7 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Company Section */}
          <section style={{ ...S.card, background: "linear-gradient(135deg, #0f2557, #1a3a8f)", border: "none" }}>
            <h2 style={{ ...S.sectionHead, color: "#fff", borderBottomColor: "rgba(255,255,255,0.1)" }}>
              About {STORE_NAME}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
              {[
                { label: "Business",  value: STORE_NAME },
                { label: "Location",  value: STORE_ADDRESS },
                { label: "Phone",     value: STORE_PHONE },
                { label: "Hours",     value: "Mon–Sat 8am–8pm" },
              ].map((item) => (
                <div key={item.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: "10px", padding: "14px" }}>
                  <p style={{ fontSize: "11px", color: "#93c5fd", fontWeight: 600, textTransform: "uppercase", margin: "0 0 4px" }}>{item.label}</p>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff", margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
            <p style={{ color: "#bfdbfe", fontSize: "14px", lineHeight: 1.8, margin: "0 0 20px" }}>
              Siyaram Hardware &amp; Suppliers is a full-service hardware retail store at Nagawa Chowk, Birgunj, Nepal,
              specialising in plumbing supplies, UPVC/CPVC pipes and fittings, ball valves, taps, mixer fittings,
              wood primers and paints, anti-rust iron paints, hand tools, fasteners, screws, and general hardware.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/" style={{ background: "#ea6c00", color: "#fff", padding: "10px 22px", borderRadius: "9px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                Visit Our Store →
              </Link>
              <a href={whatsappLink("Hello! I visited your website. I need hardware products.")} target="_blank" rel="noopener noreferrer"
                style={{ background: "#25D366", color: "#fff", padding: "10px 22px", borderRadius: "9px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                💬 Order on WhatsApp
              </a>
            </div>
          </section>

          {/* SEO Tags */}
          <section style={S.card}>
            <h2 style={S.sectionHead}>Topics</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {[
                "Pradeep Shah", "Pradeep Shah CEO", "Pradeep Shah Birgunj",
                "Pradeep Shah Computer Engineer", "Pradeep Shah Standard ERP",
                "ipradeepshah", "i_pradeepshah",
                "CEO Siyaram Hardware", "Hardware Store Birgunj",
                "Kurukshetra University Nepal", "ERP Software Nepal",
                "Plumbing Birgunj", "Building Materials Nepal",
                "Nagawa Chowk Birgunj", "Madhesh Hardware",
              ].map((kw) => (
                <span key={kw} style={S.tag}>{kw}</span>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section style={{ background: "#fff7ed", border: "2px solid #fed7aa", borderRadius: "16px", padding: "28px", textAlign: "center" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f2557", marginBottom: "8px" }}>
              Get in Touch with {CEO_NAME}
            </h2>
            <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "20px" }}>
              For business enquiries, bulk orders, or partnerships — reach out directly.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`tel:${STORE_PHONE_RAW}`}
                style={{ background: "#0f2557", color: "#fff", padding: "12px 24px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                📞 Call {STORE_PHONE}
              </a>
              <a href={whatsappLink(`Hello ${CEO_NAME}, I would like to connect with you regarding ${STORE_NAME}.`)} target="_blank" rel="noopener noreferrer"
                style={{ background: "#25D366", color: "#fff", padding: "12px 24px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                💬 WhatsApp
              </a>
              <a href={`mailto:${CEO_EMAIL}`}
                style={{ background: "#6b7280", color: "#fff", padding: "12px 24px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                ✉️ Email
              </a>
              <a href={CEO_SOCIALS.linkedin} target="_blank" rel="noopener noreferrer me"
                style={{ background: "#0A66C2", color: "#fff", padding: "12px 24px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                in LinkedIn
              </a>
            </div>
          </section>

        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ background: "#0f2557", color: "#bfdbfe", textAlign: "center", padding: "20px", fontSize: "13px" }}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} {STORE_NAME} · Founded by <strong style={{ color: "#fb923c" }}>{CEO_NAME}</strong> · {STORE_ADDRESS}
        </p>
        <p style={{ margin: "6px 0 0" }}>
          <Link href="/" style={{ color: "#93c5fd", textDecoration: "none" }}>Home</Link>
          &nbsp;·&nbsp;
          <a href={CEO_PERSONAL_SITE} target="_blank" rel="noopener noreferrer" style={{ color: "#93c5fd", textDecoration: "none" }}>Pradeep&apos;s Personal Site</a>
          &nbsp;·&nbsp;
          <a href={`tel:${STORE_PHONE_RAW}`} style={{ color: "#93c5fd", textDecoration: "none" }}>{STORE_PHONE}</a>
        </p>
      </div>
    </main>
  );
}
