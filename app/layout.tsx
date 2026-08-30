import type { Metadata } from "next";
import "./globals.css";
import {
  STORE_NAME, SITE_URL, SITE_DESCRIPTION,
  SITE_KEYWORDS, STORE_ADDRESS, STORE_CITY, STORE_REGION,
  STORE_COUNTRY_CODE, STORE_PHONE_RAW,
  STORE_HOURS_SCHEMA, CEO_NAME, CEO_TITLE, CEO_DESCRIPTION,
  CEO_PERSONAL_SITE, CEO_EMAIL, CEO_ALTERNATE_NAMES,
  STORE_SOCIALS, CEO_SOCIALS, GEO_REGION_CODE, GEO_LAT, GEO_LNG,
} from "@/lib/constants";

// ── Global Metadata (Next.js SEO API) ──────────────────────────
export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  verification: { google: "PYA2d_AJfPtC-AafEyM7K9_LQiQYjLeYNb14FKg-jWU" },
  metadataBase: new URL(SITE_URL),

  title: {
    default : `${STORE_NAME} | ${STORE_CITY}, Nepal`,
    template: `%s | ${STORE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords   : SITE_KEYWORDS,
  authors    : [{ name: CEO_NAME, url: `${SITE_URL}/ceo` }],
  creator    : CEO_NAME,
  publisher  : STORE_NAME,

  openGraph: {
    type     : "website",
    locale   : "en_US",
    url      : SITE_URL,
    siteName : STORE_NAME,
    title    : `${STORE_NAME} | ${STORE_CITY}, Nepal`,
    description: SITE_DESCRIPTION,
    images: [{
      url   : `${SITE_URL}/og-image.jpg`,
      width : 1200,
      height: 630,
      alt   : `${STORE_NAME} — ${STORE_ADDRESS}`,
    }],
  },

  twitter: {
    card       : "summary_large_image",
    title      : `${STORE_NAME} | ${STORE_CITY}`,
    description: SITE_DESCRIPTION,
    images     : [`${SITE_URL}/og-image.jpg`],
  },

  robots: {
    index : true,
    follow: true,
    googleBot: {
      index              : true,
      follow             : true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet"      : -1,
    },
  },

  alternates: { canonical: SITE_URL },

  category: "hardware store",

  other: {
    "geo.region"      : GEO_REGION_CODE,
    "geo.placename"   : `${STORE_CITY}, Parsa, Nepal`,
    "geo.position"    : `${GEO_LAT};${GEO_LNG}`,
    "ICBM"            : `${GEO_LAT}, ${GEO_LNG}`,
    "business:contact_data:street_address": STORE_ADDRESS,
    "business:contact_data:locality"      : STORE_CITY,
    "business:contact_data:country_name"  : "Nepal",
    "business:contact_data:phone_number"  : STORE_PHONE_RAW,
  },
};

// ── JSON-LD Structured Data ─────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // WebSite schema with SearchAction (helps Google Sitelinks Search Box)
    {
      "@type": "WebSite",
      "@id" : `${SITE_URL}/#website`,
      "url" : SITE_URL,
      "name": STORE_NAME,
      "description": SITE_DESCRIPTION,
      "inLanguage": "en-US",
      "potentialAction": {
        "@type"      : "SearchAction",
        "target"     : { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    // LocalBusiness / HardwareStore (core for Google Knowledge Panel)
    {
      "@type"    : ["HardwareStore", "LocalBusiness"],
      "@id"      : `${SITE_URL}/#organization`,
      "name"     : STORE_NAME,
      "legalName": STORE_NAME,
      "url"      : SITE_URL,
      "logo"     : { "@type": "ImageObject", "url": `${SITE_URL}/logo.png`, "width": 512, "height": 512 },
      "image"    : `${SITE_URL}/og-image.jpg`,
      "description": SITE_DESCRIPTION,
      "telephone": `+${STORE_PHONE_RAW}`,
      "email"    : CEO_EMAIL,
      "address"  : {
        "@type"          : "PostalAddress",
        "streetAddress"  : "Nagawa Chowk",
        "addressLocality": STORE_CITY,
        "addressRegion"  : STORE_REGION,
        "addressCountry" : STORE_COUNTRY_CODE,
      },
      "geo": {
        "@type"    : "GeoCoordinates",
        "latitude" : GEO_LAT,
        "longitude": GEO_LNG,
      },
      "openingHoursSpecification": [
        {
          "@type"     : "OpeningHoursSpecification",
          "dayOfWeek" : ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          "opens"     : "08:00",
          "closes"    : "20:00",
        },
      ],
      "openingHours": STORE_HOURS_SCHEMA,
      "priceRange"  : "₹₹",
      "currenciesAccepted": "NPR, INR",
      "paymentAccepted"   : "Cash, Bank Transfer",
      "areaServed"        : [STORE_CITY, "Parsa", "Madhesh Province", "Nepal"],
      "hasMap": `https://maps.google.com/?q=Nagawa+Chowk+Birgunj+Nepal`,
      "founder": {
        "@type": "Person",
        "@id"  : `${SITE_URL}/ceo#pradeep-shah`,
        "name" : CEO_NAME,
      },
      "employee": [{
        "@type"   : "Person",
        "@id"     : `${SITE_URL}/ceo#pradeep-shah`,
        "name"    : CEO_NAME,
        "jobTitle": CEO_TITLE,
      }],
      "sameAs": [
        STORE_SOCIALS.facebook,
        STORE_SOCIALS.instagram,
        STORE_SOCIALS.crunchbase,
        STORE_SOCIALS.googleBusiness,
        `https://wa.me/${STORE_PHONE_RAW}`,
      ],
      "keywords": SITE_KEYWORDS.join(", "),
    },
    // Person schema for CEO — kept in sync with pradeepshah.com.np
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
      "url"          : CEO_PERSONAL_SITE,
      "mainEntityOfPage": CEO_PERSONAL_SITE,
      "worksFor"     : { "@id": `${SITE_URL}/#organization` },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name" : "Kurukshetra University",
        "address": { "@type": "PostalAddress", "addressCountry": "IN" },
      },
      "address"    : {
        "@type"          : "PostalAddress",
        "addressLocality": STORE_CITY,
        "addressRegion"  : STORE_REGION,
        "addressCountry" : STORE_COUNTRY_CODE,
      },
      // sameAs is CRITICAL for Google Knowledge Panel — must match personal site exactly
      "sameAs": [
        CEO_PERSONAL_SITE,
        CEO_SOCIALS.linkedin,
        CEO_SOCIALS.twitter,
        CEO_SOCIALS.instagram,
        CEO_SOCIALS.tiktok,
        CEO_SOCIALS.github,
        CEO_SOCIALS.facebook,
        `${SITE_URL}/ceo`,
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          key="schema-org-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}