"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { addToCart } from "@/lib/storage";

export default function AddToCartClient({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);
    // Dispatch event so Navbar updates instantly
    window.dispatchEvent(new Event("cart-updated"));
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      style={{
        display: "flex", alignItems: "center", gap: "10px",
        background: added ? "#16a34a" : "#ea6c00",
        color: "#fff", padding: "16px 32px", borderRadius: "12px",
        fontWeight: 700, fontSize: "16px", border: "none", cursor: "pointer",
        transition: "background 0.2s"
      }}
    >
      <ShoppingCart size={22} />
      {added ? "Added to Cart!" : "Add to Cart"}
    </button>
  );
}
