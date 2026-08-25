import { Product, CartItem } from "./types";

const CART_KEY = "siyaram_cart";

// ── Products API Wrapper ───────────────────────────────────────────────────

export async function fetchProducts(): Promise<Product[]> {
  if (typeof window === "undefined") return [];
  try {
    const res = await fetch("/api/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product | null> {
  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Failed to create product");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateProductAPI(id: string, updates: Partial<Product>): Promise<void> {
  try {
    await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProductAPI(id: string): Promise<void> {
  try {
    await fetch(`/api/products?id=${id}`, { method: "DELETE" });
  } catch (error) {
    console.error(error);
  }
}

// ── Cart ───────────────────────────────────────────────────────
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product: Product, quantity = 1): void {
  const cart = getCart();
  const existing = cart.find((i) => i.product.id === product.id);
  if (existing) {
    existing.quantity += quantity;
    saveCart(cart);
  } else {
    saveCart([...cart, { product, quantity }]);
  }
}

export function removeFromCart(productId: string): void {
  saveCart(getCart().filter((i) => i.product.id !== productId));
}

export function updateCartQty(productId: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const cart = getCart();
  const item = cart.find((i) => i.product.id === productId);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
}

export function clearCart(): void {
  saveCart([]);
}

export function cartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
}
