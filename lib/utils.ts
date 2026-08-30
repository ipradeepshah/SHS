import { Product } from "./types";

export function generateSlug(product: Product): string {
  const safeName = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  return `${safeName}-${product.id}`;
}
