"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toast";
import { CartItem } from "@/lib/types";
import { getCart, updateCartQty, removeFromCart, clearCart, cartTotal } from "@/lib/storage";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, MessageCircle } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showOrderForm, setShowOrderForm] = useState(false);

  const refresh = () => setCart(getCart());

  useEffect(() => { // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh(); }, []);

  const handleQty = (id: string, qty: number) => {
    updateCartQty(id, qty);
    refresh();
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    refresh();
    setToast("Item removed from cart");
  };

  const total = cartTotal(cart);
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  const buildWhatsAppMessage = () => {
    const lines = cart.map((i) => `• ${i.product.name} x${i.quantity} = ₹${(i.product.price * i.quantity).toLocaleString("en-IN")}`);
    return [
      `Hello Siyaram Hardware & Suppliers! 🛒`,
      ``,
      `*New Order Request*`,
      ``,
      ...lines,
      ``,
      `*Total: ₹${total.toLocaleString("en-IN")}*`,
      ``,
      name ? `Name: ${name}` : "",
      phone ? `Phone: ${phone}` : "",
      address ? `Address: ${address}` : "",
    ].filter((l) => l !== undefined).join("\n");
  };

  const handleWhatsApp = () => {
    const msg = buildWhatsAppMessage();
    window.open(`https://wa.me/9779815256619?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
        <Navbar cartCount={0} />
        <div style={{ maxWidth: "600px", margin: "80px auto", textAlign: "center", padding: "0 16px" }}>
          <div style={{ fontSize: "80px", marginBottom: "16px" }}>🛒</div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0f2557", marginBottom: "8px" }}>Your cart is empty</h2>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>Add some products to get started!</p>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#ea6c00", color: "#fff", padding: "12px 24px", borderRadius: "12px", fontWeight: 600, textDecoration: "none" }}>
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <Navbar cartCount={itemCount} />
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <Link href="/" style={{ color: "#ea6c00", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", fontSize: "14px" }}>
            <ArrowLeft size={16} /> Back to Shop
          </Link>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f2557" }}>Shopping Cart</h1>
          <span style={{ fontSize: "14px", color: "#9ca3af" }}>({itemCount} items)</span>
        </div>

        <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "1fr" }}>

          {/* Cart Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {cart.map((item) => (
              <div key={item.product.id} style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f1f5f9", padding: "16px", display: "flex", gap: "16px", alignItems: "center" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "10px", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.product.image ? (
                    <img src={item.product.image} alt={item.product.name} style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "10px" }} />
                  ) : (
                    <ShoppingBag size={28} color="#d1d5db" />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, color: "#111827", fontSize: "15px", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.product.name}</p>
                  <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "8px" }}>{item.product.category} · {item.product.brand}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button onClick={() => handleQty(item.product.id, item.quantity - 1)} style={{ width: "28px", height: "28px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <Minus size={13} />
                      </button>
                      <span style={{ fontWeight: 600, minWidth: "24px", textAlign: "center" }}>{item.quantity}</span>
                      <button onClick={() => handleQty(item.product.id, item.quantity + 1)} style={{ width: "28px", height: "28px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <Plus size={13} />
                      </button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontWeight: 700, color: "#0f2557", fontSize: "16px" }}>₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</span>
                      <button onClick={() => handleRemove(item.product.id)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f1f5f9", padding: "24px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f2557", marginBottom: "16px" }}>Order Summary</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
              {cart.map((i) => (
                <div key={i.product.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#6b7280" }}>
                  <span>{i.product.name} × {i.quantity}</span>
                  <span>₹{(i.product.price * i.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "18px", color: "#0f2557", marginBottom: "20px" }}>
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>

            {total < 999 && (
              <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", color: "#c2410c", marginBottom: "16px" }}>
                Add ₹{(999 - total).toLocaleString("en-IN")} more for free delivery!
              </div>
            )}

            {/* Customer info */}
            {showOrderForm && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                <input placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", outline: "none" }} />
                <input placeholder="Phone number (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", outline: "none" }} />
                <textarea placeholder="Delivery address (optional)" value={address} onChange={(e) => setAddress(e.target.value)} rows={2} style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", outline: "none", resize: "none" }} />
              </div>
            )}

            {!showOrderForm && (
              <button onClick={() => setShowOrderForm(true)} style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px dashed #e5e7eb", background: "none", cursor: "pointer", fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}>
                + Add your name & address for order
              </button>
            )}

            <button
              onClick={handleWhatsApp}
              style={{ width: "100%", padding: "14px", borderRadius: "12px", background: "#25D366", color: "#fff", border: "none", fontWeight: 700, fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            >
              <MessageCircle size={20} /> Order via WhatsApp
            </button>
            <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", marginTop: "8px" }}>
              We&apos;ll confirm your order on WhatsApp
            </p>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}
