export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getProductsData, saveProductsData } from "@/lib/server-data";

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
