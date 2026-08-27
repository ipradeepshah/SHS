export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Product } from "@/lib/types";

const dataFile = path.join(process.cwd(), "data", "products.json");

const SEED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "CPVC Ball Valve 1/2 inch",
    description: "High quality CPVC ball valve suitable for hot and cold water supply systems. Corrosion resistant and durable.",
    price: 85,
    mrp: 110,
    category: "Valves & Taps",
    brand: "Astral",
    unit: "Piece",
    stock: 150,
    image: "",
    tags: ["valve", "cpvc", "plumbing"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "UPVC Pipe 1 inch - 6 Metre",
    description: "Durable UPVC pipe for plumbing and water supply. Pressure rated, lightweight and easy to install.",
    price: 210,
    mrp: 260,
    category: "Pipes & Fittings",
    brand: "Supreme",
    unit: "Piece",
    stock: 80,
    image: "",
    tags: ["pipe", "upvc", "water supply"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Asian Paints Wood Primer",
    description: "Ready-to-use wood primer for interior and exterior wooden surfaces. Prevents moisture and provides excellent adhesion.",
    price: 320,
    mrp: 390,
    category: "Paint - Wood",
    brand: "Asian Paints",
    unit: "Litre",
    stock: 45,
    image: "",
    tags: ["paint", "wood", "primer"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Rust-O-Leum Iron Paint Black",
    description: "Anti-rust iron paint in gloss black finish. Excellent rust protection for metal gates, grills, and furniture.",
    price: 450,
    mrp: 520,
    category: "Paint - Iron",
    brand: "Rust-O-Leum",
    unit: "Litre",
    stock: 30,
    image: "",
    tags: ["paint", "iron", "anti-rust"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Stainless Steel Nut Bolt Set M10",
    description: "Pack of 50 stainless steel nut bolt sets. M10 size, hex head. Corrosion resistant for outdoor use.",
    price: 120,
    mrp: 150,
    category: "Fasteners & Screws",
    brand: "Unbrella",
    unit: "Pack",
    stock: 200,
    image: "",
    tags: ["bolt", "nut", "stainless steel"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "PVC Flexible Pipe 1/2 inch - 1 Metre",
    description: "Flexible PVC hose pipe for gardening and water connection. UV resistant and weatherproof.",
    price: 55,
    mrp: 70,
    category: "Pipes & Fittings",
    brand: "Generic",
    unit: "Metre",
    stock: 500,
    image: "",
    tags: ["pipe", "pvc", "flexible"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Bathroom Mixer Tap Chrome",
    description: "Single lever chrome finish mixer tap for washbasin. Easy to install, comes with flexible hose pipes.",
    price: 680,
    mrp: 850,
    category: "Valves & Taps",
    brand: "Jaquar",
    unit: "Piece",
    stock: 25,
    image: "",
    tags: ["tap", "mixer", "bathroom"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Combination Plier 8 inch",
    description: "Heavy duty combination plier with insulated handles. Ideal for gripping, bending and cutting wire.",
    price: 180,
    mrp: 220,
    category: "Tools",
    brand: "Stanley",
    unit: "Piece",
    stock: 60,
    image: "",
    tags: ["plier", "tool", "hand tool"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

function getProductsData(): Product[] {
  if (!fs.existsSync(dataFile)) {
    fs.mkdirSync(path.dirname(dataFile), { recursive: true });
    fs.writeFileSync(dataFile, JSON.stringify(SEED_PRODUCTS, null, 2));
    return SEED_PRODUCTS;
  }
  try {
    return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  } catch (e) {
    return SEED_PRODUCTS;
  }
}

function saveProductsData(products: Product[]) {
  fs.mkdirSync(path.dirname(dataFile), { recursive: true });
  fs.writeFileSync(dataFile, JSON.stringify(products, null, 2));
}

export async function GET() {
  return NextResponse.json(getProductsData());
}

export async function POST(req: Request) {
  const body = await req.json();
  const products = getProductsData();
  const newProduct = {
    ...body,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveProductsData(products);
  return NextResponse.json(newProduct);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const products = getProductsData();
  const idx = products.findIndex((p) => p.id === body.id);
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...body, updatedAt: new Date().toISOString() };
    saveProductsData(products);
    return NextResponse.json(products[idx]);
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  let products = getProductsData();
  products = products.filter((p) => p.id !== id);
  saveProductsData(products);
  return NextResponse.json({ success: true });
}
