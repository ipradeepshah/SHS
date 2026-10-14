"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCart } from "@/lib/storage";
import { ShoppingCart, Search, Phone, MapPin } from "lucide-react";
import { STORE_NAME, STORE_PHONE, STORE_PHONE_RAW } from "@/lib/constants";
import { CATEGORIES } from "@/lib/types";
import { categoryToSlug } from "@/lib/utils";
import NepaliClock from "@/components/NepaliClock";

interface NavbarProps {
  cartCount?: number;
  onSearch?: (q: string) => void;
  searchValue?: string;
  activeCategory?: string;
}

export default function Navbar({
  cartCount: initialCartCount = 0,
  onSearch,
  searchValue = "",
  activeCategory = "",
}: NavbarProps) {
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
    if (onSearch) {
      onSearch(localSearch);
    } else {
      window.location.href = `/?q=${encodeURIComponent(localSearch)}`;
    }
  };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 12px rgba(0,0,0,0.25)" }}>
      {/* ── Top info announcement bar ── */}
      <div
        style={{
          background: "#FF6B00",
          padding: "6px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "12px",
          color: "#fff",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
          <a
            href={`tel:${STORE_PHONE_RAW}`}
            style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", fontWeight: 600 }}
          >
            <Phone size={12} /> {STORE_PHONE}
          </a>
          <span className="hidden md:inline-flex items-center gap-1" style={{ opacity: 0.9 }}>
            <MapPin size={12} /> Nagawa Chowk, Birgunj, Nepal
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <NepaliClock />
        </div>
      </div>

      {/* ── Main Branding & Search bar ── */}
      <div
        className="flex flex-wrap items-center justify-between gap-y-3"
        style={{ background: "#002D5A", padding: "10px 16px", gap: "16px" }}
      >
        {/* Logo and Brand Name */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <img
            src="/logo.png"
            alt={STORE_NAME}
            style={{ height: "46px", width: "auto", objectFit: "contain" }}
          />
          <div className="hidden sm:flex flex-col">
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "16px", lineHeight: 1.15 }}>
              {STORE_NAME}
            </span>
            <span style={{ color: "#FF6B00", fontSize: "11px", fontWeight: 700, letterSpacing: "0.03em" }}>
              Birgunj, Nepal
            </span>
          </div>
        </Link>

        {/* Right action: Cart */}
        <div className="flex items-center gap-3 shrink-0 sm:order-last">
          <Link
            href="/cart"
            style={{
              position: "relative",
              color: "#fff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 600,
              background: "rgba(255,255,255,0.08)",
              padding: "6px 12px",
              borderRadius: "8px",
            }}
          >
            <ShoppingCart size={20} />
            <span className="hidden md:inline">Cart</span>
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "#FF6B00",
                  color: "#fff",
                  borderRadius: "50%",
                  minWidth: "18px",
                  height: "18px",
                  fontSize: "10px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 3px",
                }}
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Search Input */}
        <form
          onSubmit={handleSearch}
          className="w-full sm:w-auto sm:flex-1 order-last sm:order-none"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "680px",
              display: "flex",
              borderRadius: "8px",
              overflow: "hidden",
              border: "2px solid #FF6B00",
              background: "#fff",
            }}
          >
            <input
              type="text"
              placeholder="Search PVC pipe, 110mm bend, CPVC valve, primer, paints, tools…"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              style={{
                flex: 1,
                padding: "9px 14px",
                fontSize: "13px",
                border: "none",
                outline: "none",
                color: "#111827",
                background: "#fff",
              }}
            />
            <button
              type="submit"
              aria-label="Search items"
              style={{
                background: "#FF6B00",
                border: "none",
                padding: "0 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#fff",
                fontWeight: 700,
                fontSize: "13px",
              }}
            >
              <Search size={16} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </form>
      </div>

      {/* ── Top Category Navigation Strip (Clean Static Categories Only) ── */}
      <nav
        aria-label="Categories"
        className="flex items-center gap-1.5 px-3 py-1.5 overflow-x-auto no-scrollbar"
        style={{
          background: "#003B73",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "12px",
            color: activeCategory === "" ? "#fff" : "#bfdbfe",
            padding: "5px 12px",
            borderRadius: "16px",
            textDecoration: "none",
            background: activeCategory === "" ? "#FF6B00" : "rgba(255,255,255,0.06)",
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          All Products
        </Link>

        {CATEGORIES.map((cat) => {
          const slug = categoryToSlug(cat);
          const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
          return (
            <Link
              key={cat}
              href={`/category/${slug}`}
              style={{
                fontSize: "12px",
                color: isActive ? "#fff" : "#bfdbfe",
                padding: "5px 12px",
                borderRadius: "16px",
                textDecoration: "none",
                background: isActive ? "#FF6B00" : "rgba(255,255,255,0.06)",
                fontWeight: 500,
                flexShrink: 0,
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.target as HTMLElement).style.background = "rgba(255,255,255,0.18)";
                  (e.target as HTMLElement).style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.target as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  (e.target as HTMLElement).style.color = "#bfdbfe";
                }
              }}
            >
              {cat}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
