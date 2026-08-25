"use client";
import { Product } from "@/lib/types";
import { Pencil, Trash2, Package } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af" }}>
        <div style={{ fontSize: "60px", marginBottom: "14px" }}>📦</div>
        <p style={{ fontSize: "18px", fontWeight: 600, marginBottom: "6px" }}>No products found</p>
        <p style={{ fontSize: "13px" }}>Add your first product using the &quot;Add Product&quot; button above</p>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "620px" }}>
        <thead>
          <tr style={{ background: "#f9fafb" }}>
            {["", "Product", "Category", "Price", "Stock", "Actions"].map((h, i) => (
              <th key={i} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e5e7eb" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id} style={{ borderBottom: i < products.length - 1 ? "1px solid #f3f4f6" : "none" }}>
              {/* Thumbnail */}
              <td style={{ padding: "12px 16px" }}>
                <div style={{ width: "50px", height: "50px", borderRadius: "9px", background: "#f9fafb", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {p.image
                    ? <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    : <Package size={22} color="#d1d5db" />}
                </div>
              </td>
              {/* Name */}
              <td style={{ padding: "12px 16px" }}>
                <p style={{ fontWeight: 600, color: "#111827", fontSize: "14px", margin: "0 0 2px" }}>{p.name}</p>
                <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>{p.brand}</p>
              </td>
              {/* Category */}
              <td style={{ padding: "12px 16px" }}>
                <span style={{ fontSize: "12px", background: "#fff7ed", color: "#ea6c00", padding: "3px 10px", borderRadius: "20px", fontWeight: 600, whiteSpace: "nowrap" }}>
                  {p.category}
                </span>
              </td>
              {/* Price */}
              <td style={{ padding: "12px 16px" }}>
                <p style={{ fontWeight: 700, color: "#0f2557", fontSize: "15px", margin: "0 0 2px", whiteSpace: "nowrap" }}>
                  ₹{p.price.toLocaleString("en-IN")}
                </p>
                {p.mrp > p.price && (
                  <p style={{ fontSize: "11px", color: "#9ca3af", textDecoration: "line-through", margin: 0 }}>₹{p.mrp}</p>
                )}
              </td>
              {/* Stock */}
              <td style={{ padding: "12px 16px" }}>
                <span style={{ fontSize: "13px", fontWeight: 700, color: p.stock > 5 ? "#059669" : p.stock > 0 ? "#d97706" : "#dc2626" }}>
                  {p.stock > 0 ? `${p.stock} units` : "Out of stock"}
                </span>
              </td>
              {/* Actions */}
              <td style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => onEdit(p)}
                    style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#374151", fontWeight: 500 }}
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    style={{ padding: "6px 10px", borderRadius: "8px", border: "1px solid #fecaca", background: "#fff5f5", cursor: "pointer", color: "#dc2626" }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
