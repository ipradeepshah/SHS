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
  "Pipes & Fittings",
  "Valves & Taps",
  "Paint - Wood",
  "Paint - Iron",
  "General Hardware",
  "Electrical",
  "Fasteners & Screws",
  "Tools",
  "Safety Equipment",
];

export const UNITS = ["Piece", "Kg", "Litre", "Box", "Pair", "Set", "Metre", "Roll", "Pack"];
