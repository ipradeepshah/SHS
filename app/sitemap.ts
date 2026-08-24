import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url            : SITE_URL,
      lastModified   : now,
      changeFrequency: "daily",
      priority       : 1.0,
    },
    {
      url            : `${SITE_URL}/ceo`,
      lastModified   : now,
      changeFrequency: "monthly",
      priority       : 0.9,
    },
    {
      url            : `${SITE_URL}/cart`,
      lastModified   : now,
      changeFrequency: "weekly",
      priority       : 0.5,
    },
    {
      url            : `${SITE_URL}/?category=Plumbing`,
      lastModified   : now,
      changeFrequency: "weekly",
      priority       : 0.8,
    },
    {
      url            : `${SITE_URL}/?category=Pipes+%26+Fittings`,
      lastModified   : now,
      changeFrequency: "weekly",
      priority       : 0.8,
    },
    {
      url            : `${SITE_URL}/?category=Valves+%26+Taps`,
      lastModified   : now,
      changeFrequency: "weekly",
      priority       : 0.8,
    },
    {
      url            : `${SITE_URL}/?category=Paint+-+Wood`,
      lastModified   : now,
      changeFrequency: "weekly",
      priority       : 0.8,
    },
    {
      url            : `${SITE_URL}/?category=Paint+-+Iron`,
      lastModified   : now,
      changeFrequency: "weekly",
      priority       : 0.8,
    },
    {
      url            : `${SITE_URL}/?category=Tools`,
      lastModified   : now,
      changeFrequency: "weekly",
      priority       : 0.7,
    },
    {
      url            : `${SITE_URL}/?category=General+Hardware`,
      lastModified   : now,
      changeFrequency: "weekly",
      priority       : 0.7,
    },
  ];
}
