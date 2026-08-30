"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCart } from "@/lib/storage";
import { ShoppingCart, Search, Wrench, Phone } from "lucide-react";
import { STORE_NAME, STORE_PHONE, STORE_PHONE_RAW } from "@/lib/constants";
import { CATEGORIES } from "@/lib/types";
import NepaliClock from "@/components/NepaliClock";

interface NavbarProps {
  cartCount?: number;
  onSearch?: (q: string) => void;
  searchValue?: string;
}

export default function Navbar({ cartCount: initialCartCount = 0, onSearch, searchValue = "" }: NavbarProps) {
  const [cartCount, setCartCount] = useState(initialCartCount);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartCount(getCart().reduce((acc, item) => acc + item.quantity, 0));
    const handleCartUpdate = () => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartCount(getCart().reduce((acc, item) => acc + item.quantity, 0));
    };
    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, []);
  const [localSearch, setLocalSearch] = useState(searchValue);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(localSearch);
  };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>

      {/* ── Top info bar ── */}
      <div style={{ background: "#FF6B00", padding: "5px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px", color: "#fff", overflowX: "auto" }}>
        <a href={`tel:${STORE_PHONE_RAW}`} style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
          <Phone size={11} /> {STORE_PHONE}
        </a>
        <NepaliClock />
      </div>

      {/* ── Main bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-y-4" style={{ background: "#002D5A", padding: "12px 16px", gap: "16px" }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img src="/logo.png" alt="Siyaram Hardware Logo" style={{ height: "48px", width: "auto", objectFit: "contain" }} />
        </Link>

        {/* Right actions (mobile friendly order) */}
        <div className="flex items-center gap-4 shrink-0 sm:order-last">
          <Link href="/cart" style={{ position: "relative", color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px", fontSize: "14px" }}>
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: "-8px", right: "-8px", background: "#FF6B00", color: "#fff", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
            <span style={{ display: "none" }}>Cart</span>
          </Link>
        </div>

        {/* Search — full width on mobile, inline on desktop */}
        <form
          onSubmit={handleSearch}
          className="w-full sm:w-auto sm:flex-1 order-last sm:order-none"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: "720px", display: "flex", borderRadius: "10px", overflow: "hidden", border: "2px solid #FF6B00", background: "#fff" }}>
            <input
              type="text"
              placeholder="Search pipes, valves, paints, tools…"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              style={{
                flex: 1,
                padding: "11px 16px",
                fontSize: "14px",
                border: "none",
                outline: "none",
                color: "#111827",
                background: "#fff",
              }}
            />
            <button type="submit" style={{ background: "#FF6B00", border: "none", padding: "0 18px", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <Search size={17} color="#fff" />
            </button>
          </div>
        </form>

      </div>

      {/* ── Category strip ── */}
      <div className="flex flex-wrap gap-2 px-4 py-2" style={{ background: "#003B73" }}>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/?category=${encodeURIComponent(cat)}`}
            style={{ fontSize: "12px", color: "#bfdbfe", padding: "6px 12px", borderRadius: "20px", textDecoration: "none", background: "rgba(255,255,255,0.05)" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "rgba(255,255,255,0.15)"; (e.target as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.target as HTMLElement).style.color = "#bfdbfe"; }}
          >
            {cat}
          </Link>
        ))}
      </div>

    </header>
  );
}
