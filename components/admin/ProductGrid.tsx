"use client";
import { Product } from "@/lib/types";
import { Trash2, Package } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductGrid({ products, onEdit, onDelete }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af" }}>
        <div style={{ fontSize: "60px", marginBottom: "14px" }}>📦</div>
        <p style={{ fontSize: "18px", fontWeight: 600 }}>No products found</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "16px" }}>
      {products.map((p) => (
        <div key={p.id} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <div style={{ height: "130px", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {p.image
              ? <img src={p.image} alt={p.name} style={{ height: "100%", width: "100%", objectFit: "contain" }} />
              : <Package size={44} color="#d1d5db" />}
          </div>
          <div style={{ padding: "14px" }}>
            <p style={{ fontWeight: 600, fontSize: "14px", color: "#111827", marginBottom: "2px" }}>{p.name}</p>
            <p style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "10px" }}>{p.category}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontWeight: 700, color: "#0f2557" }}>₹{p.price.toLocaleString("en-IN")}</span>
              <span style={{ fontSize: "12px", fontWeight: 600, color: p.stock > 0 ? "#059669" : "#dc2626" }}>
                {p.stock > 0 ? `${p.stock} left` : "Out"}
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => onEdit(p)}
                style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: "12px", fontWeight: 600, color: "#374151" }}
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(p.id)}
                style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #fecaca", background: "#fff5f5", cursor: "pointer", color: "#dc2626" }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
