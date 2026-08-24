"use client";

interface DeleteConfirmModalProps {
  productId: string | null;
  onConfirm: (id: string) => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({ productId, onConfirm, onCancel }: DeleteConfirmModalProps) {
  if (!productId) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ background: "#fff", borderRadius: "18px", padding: "32px 28px", maxWidth: "380px", width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: "52px", marginBottom: "14px" }}>🗑️</div>
        <h3 style={{ fontWeight: 800, fontSize: "20px", marginBottom: "8px", color: "#111827" }}>Delete Product?</h3>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px", lineHeight: 1.6 }}>
          This will permanently delete the product and cannot be undone.
        </p>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={onCancel}
            style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #d1d5db", background: "#fff", fontWeight: 600, cursor: "pointer", fontSize: "14px", color: "#374151" }}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(productId)}
            style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "#ef4444", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer", fontSize: "14px" }}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
