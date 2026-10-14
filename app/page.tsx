import { Metadata } from "next";
import { getProductsData, generateSlug } from "@/lib/server-data";
import { SITE_URL, SITE_DESCRIPTION, SITE_KEYWORDS, STORE_NAME, STORE_ALTERNATE_NAMES } from "@/lib/constants";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: {
    absolute: `${STORE_NAME} | Birgunj, Nepal`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    title: `${STORE_NAME} | Birgunj, Nepal`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: STORE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${STORE_NAME} - Nagawa Chowk, Birgunj, Nepal`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${STORE_NAME} | Birgunj, Nepal`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export default async function HomePage() {
  const products = getProductsData();

  // Standalone Google Site Name Schema (developers.google.com/search/docs/appearance/site-names)
  const siteNameSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: STORE_NAME,
    alternateName: STORE_ALTERNATE_NAMES,
    url: `${SITE_URL}/`,
  };

  // Structured ItemList of products for Googlebot on homepage
  const homeProductsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Featured Hardware Products at ${STORE_NAME}`,
    description: "Wholesale & retail PVC pipes, bends, valves, paints, primers, and tools in Birgunj, Nepal.",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/product/${generateSlug(product)}`,
      name: product.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeProductsSchema) }}
      />
      <HomePageClient initialProducts={products} />
    </>
  );
}
