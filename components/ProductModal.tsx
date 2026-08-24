"use client";
import { Product } from "@/lib/types";
import { X, ShoppingCart, Package, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/constants";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  const discount = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const waLink = whatsappLink(
    `Hi, I'm interested in *${product.name}* (₹${product.price}/${product.unit}). Please confirm availability.`
  );

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={onClose}
    >
      <div
        style={{ background: "#fff", width: "100%", maxWidth: "680px", borderRadius: "20px 20px 0 0", maxHeight: "92vh", display: "flex", flexDirection: "column", overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ background: "#0f2557", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#fff", fontWeight: 600, fontSize: "15px" }}>Product Details</span>
          <button onClick={onClose} style={{ color: "rgba(255,255,255,0.7)", background: "none", border: "none", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ overflow: "auto", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Image */}
            <div style={{ background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", minHeight: "200px" }}>
              {product.image
                ? <img src={product.image} alt={product.name} style={{ maxHeight: "220px", maxWidth: "100%", objectFit: "contain" }} />
                : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#d1d5db" }}><Package size={64} /><span style={{ fontSize: "13px", marginTop: "8px" }}>No Image</span></div>}
            </div>

            {/* Info */}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <span style={{ fontSize: "12px", fontWeight: 600, background: "#fff7ed", color: "#ea6c00", padding: "3px 12px", borderRadius: "20px", alignSelf: "flex-start" }}>
                {product.category}
              </span>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: 0 }}>{product.name}</h2>
              {product.brand && <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>Brand: <strong style={{ color: "#374151" }}>{product.brand}</strong></p>}

              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "30px", fontWeight: 800, color: "#0f2557" }}>₹{product.price.toLocaleString("en-IN")}</span>
                <span style={{ fontSize: "13px", color: "#9ca3af" }}>/ {product.unit}</span>
                {product.mrp > product.price && (
                  <>
                    <span style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "line-through" }}>₹{product.mrp}</span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#16a34a" }}>{discount}% OFF</span>
                  </>
                )}
              </div>

              <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.7, margin: 0 }}>{product.description}</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "10px 14px" }}>
                  <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 2px" }}>Unit</p>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#374151", margin: 0 }}>{product.unit}</p>
                </div>
                <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "10px 14px" }}>
                  <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 2px" }}>Stock</p>
                  <p style={{ fontSize: "14px", fontWeight: 600, margin: 0, color: product.stock > 5 ? "#16a34a" : product.stock > 0 ? "#d97706" : "#dc2626" }}>
                    {product.stock > 0 ? `${product.stock} available` : "Out of Stock"}
                  </p>
                </div>
              </div>

              {product.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {product.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: "12px", background: "#f1f5f9", color: "#64748b", padding: "3px 10px", borderRadius: "20px" }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid #f1f5f9", display: "flex", gap: "12px" }}>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "#25D366", color: "#fff", padding: "13px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}
          >
            <MessageCircle size={17} /> Order via WhatsApp
          </a>
          <button
            onClick={() => { onAddToCart(product); onClose(); }}
            disabled={product.stock === 0}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: product.stock === 0 ? "#d1d5db" : "#ea6c00", color: "#fff", border: "none", padding: "13px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", cursor: product.stock === 0 ? "not-allowed" : "pointer" }}
          >
            <ShoppingCart size={17} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
