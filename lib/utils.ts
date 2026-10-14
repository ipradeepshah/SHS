import { Product } from "./types";

export function generateSlug(product: Product): string {
  const safeName = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  return `${safeName}-${product.id}`;
}

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function slugToCategory(slug: string): string {
  const map: Record<string, string> = {
    "plumbing": "Plumbing",
    "ceramic": "Ceramic & Sanitary",
    "ceramic-sanitary": "Ceramic & Sanitary",
    "pipes-fittings": "Pipes & Fittings",
    "pipes-and-fittings": "Pipes & Fittings",
    "valves-taps": "Valves & Taps",
    "valves-and-taps": "Valves & Taps",
    "paint-wood": "Paint - Wood",
    "paint-iron": "Paint - Iron",
    "general-hardware": "General Hardware",
    "tools": "Tools",
    "suppliers": "Suppliers & Wholesale",
    "suppliers-wholesale": "Suppliers & Wholesale",
    "suppliers-and-wholesale": "Suppliers & Wholesale",
    "electrical": "Electrical",
    "fasteners-screws": "Fasteners & Screws",
    "fasteners-and-screws": "Fasteners & Screws",
    "safety-equipment": "Safety Equipment",
  };
  return map[slug.toLowerCase()] || slug.replace(/-/g, " ");
}
