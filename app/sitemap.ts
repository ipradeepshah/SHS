import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getProductsData, generateSlug } from "@/lib/server-data";
import { CATEGORY_DETAILS } from "@/lib/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const products = getProductsData();

  // Product URLs (Self-canonicalizing product pages)
  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${generateSlug(product)}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Clean Category URLs (Self-canonicalizing category landing pages)
  const categoryUrls: MetadataRoute.Sitemap = CATEGORY_DETAILS.map((cat) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Core Static URLs
  const coreUrls: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/ceo`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
  ];

  return [...coreUrls, ...categoryUrls, ...productUrls];
}
