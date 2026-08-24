"use client";
import { useRef } from "react";
import { X, Upload, AlertCircle } from "lucide-react";
import { Product, CATEGORIES, UNITS } from "@/lib/types";

export const EMPTY_FORM = {
  name: "", description: "", price: "", mrp: "",
  category: CATEGORIES[0], brand: "", unit: UNITS[0],
  stock: "", image: "", tags: "",
};

export type ProductForm = typeof EMPTY_FORM;

interface ProductFormModalProps {
  isOpen: boolean;
  editingId: string | null;
  form: ProductForm;
  formError: string;
  onClose: () => void;
  onFormChange: (form: ProductForm) => void;
  onSubmit: (e: React.FormEvent) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductFormModal({
  isOpen, editingId, form, formError,
  onClose, onFormChange, onSubmit, onImageUpload,
}: ProductFormModalProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const field = (key: keyof ProductForm, value: string) =>
    onFormChange({ ...form, [key]: value });

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 50, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={onClose}
    >
      <div
        style={{ background: "#fff", width: "100%", maxWidth: "700px", borderRadius: "20px 20px 0 0", maxHeight: "94vh", display: "flex", flexDirection: "column", overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ background: "#0f2557", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "17px", margin: 0 }}>
            {editingId ? "✏️ Edit Product" : "➕ Add New Product"}
          </h2>
          <button onClick={onClose} style={{ color: "rgba(255,255,255,0.7)", background: "none", border: "none", cursor: "pointer", fontSize: "24px", lineHeight: 1 }}>×</button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} style={{ overflow: "auto", flex: 1, padding: "24px" }}>
          {formError && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#dc2626", marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertCircle size={15} /> {formError}
            </div>
          )}

          <div style={{ display: "grid", gap: "16px" }}>

            {/* Image */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>Product Image</label>
              <div
                onClick={() => fileRef.current?.click()}
                style={{ border: "2px dashed #d1d5db", borderRadius: "12px", padding: "24px", textAlign: "center", cursor: "pointer", background: "#fafafa" }}
              >
                {form.image ? (
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <img src={form.image} alt="preview" style={{ maxHeight: "130px", maxWidth: "100%", objectFit: "contain", borderRadius: "8px" }} />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); field("image", ""); }}
                      style={{ position: "absolute", top: "-10px", right: "-10px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", fontSize: "16px", lineHeight: "24px" }}
                    >×</button>
                  </div>
                ) : (
                  <>
                    <Upload size={30} color="#9ca3af" style={{ margin: "0 auto 8px" }} />
                    <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 4px" }}>Click to upload product image</p>
                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>JPG, PNG, WebP — max 2MB</p>
                  </>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={onImageUpload} style={{ display: "none" }} />
            </div>

            {/* Name */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Product Name *</label>
              <input value={form.name} onChange={(e) => field("name", e.target.value)} placeholder="e.g. CPVC Ball Valve 1/2 inch"
                style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }} />
            </div>

            {/* Description */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Description</label>
              <textarea value={form.description} onChange={(e) => field("description", e.target.value)} placeholder="Describe the product…" rows={3}
                style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", resize: "vertical" }} />
            </div>

            {/* Price + MRP */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Selling Price (₹) *</label>
                <input type="number" min="0" value={form.price} onChange={(e) => field("price", e.target.value)} placeholder="0"
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>MRP (₹)</label>
                <input type="number" min="0" value={form.mrp} onChange={(e) => field("mrp", e.target.value)} placeholder="0"
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }} />
              </div>
            </div>

            {/* Category + Brand */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Category</label>
                <select value={form.category} onChange={(e) => field("category", e.target.value)}
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Brand</label>
                <input value={form.brand} onChange={(e) => field("brand", e.target.value)} placeholder="e.g. Astral, Supreme"
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }} />
              </div>
            </div>

            {/* Unit + Stock */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Unit</label>
                <select value={form.unit} onChange={(e) => field("unit", e.target.value)}
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }}>
                  {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Stock Quantity *</label>
                <input type="number" min="0" value={form.stock} onChange={(e) => field("stock", e.target.value)} placeholder="0"
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }} />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                Tags <span style={{ fontWeight: 400, color: "#9ca3af" }}>(comma separated)</span>
              </label>
              <input value={form.tags} onChange={(e) => field("tags", e.target.value)} placeholder="e.g. valve, plumbing, cpvc"
                style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none" }} />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
            <button type="button" onClick={onClose}
              style={{ flex: 1, padding: "13px", borderRadius: "10px", border: "1px solid #d1d5db", background: "#fff", fontWeight: 600, fontSize: "14px", cursor: "pointer", color: "#374151" }}>
              Cancel
            </button>
            <button type="submit"
              style={{ flex: 2, padding: "13px", borderRadius: "10px", background: "#ea6c00", color: "#fff", border: "none", fontWeight: 700, fontSize: "15px", cursor: "pointer" }}>
              {editingId ? "✅ Update Product" : "✅ Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
