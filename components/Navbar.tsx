"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Search, Menu, X, Wrench, Phone } from "lucide-react";
import { STORE_NAME, STORE_PHONE, STORE_PHONE_RAW } from "@/lib/constants";
import { CATEGORIES } from "@/lib/types";
import NepaliClock from "@/components/NepaliClock";

interface NavbarProps {
  cartCount?: number;
  onSearch?: (q: string) => void;
  searchValue?: string;
}

export default function Navbar({ cartCount = 0, onSearch, searchValue = "" }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchValue);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(localSearch);
  };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>

      {/* ── Top info bar ── */}
      <div style={{ background: "#ea6c00", padding: "5px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px", color: "#fff", overflowX: "auto" }}>
        <a href={`tel:${STORE_PHONE_RAW}`} style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
          <Phone size={11} /> {STORE_PHONE}
        </a>
        <NepaliClock />
      </div>

      {/* ── Main bar ── */}
      <div style={{ background: "#0f2557", padding: "12px 16px", display: "flex", alignItems: "center", gap: "16px" }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: "#ea6c00", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Wrench size={20} color="#fff" />
          </div>
          <div style={{ display: "none" }} className="sm-show">
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px", lineHeight: 1.2 }}>Siyaram Hardware</div>
            <div style={{ color: "#fb923c", fontSize: "11px" }}>& Suppliers</div>
          </div>
        </Link>

        {/* Search — centered & wide */}
        <form
          onSubmit={handleSearch}
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: "720px", display: "flex", borderRadius: "10px", overflow: "hidden", border: "2px solid #ea6c00", background: "#fff" }}>
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
            <button type="submit" style={{ background: "#ea6c00", border: "none", padding: "0 18px", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <Search size={17} color="#fff" />
            </button>
          </div>
        </form>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
          <Link href="/cart" style={{ position: "relative", color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px", fontSize: "14px" }}>
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: "-8px", right: "-8px", background: "#ea6c00", color: "#fff", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
            <span style={{ display: "none" }}>Cart</span>
          </Link>
          <Link href="/ceo" style={{ color: "#fb923c", fontSize: "12px", padding: "5px 0", textDecoration: "none", fontWeight: 600 }}>
            CEO
          </Link>
          <Link href="/admin" style={{ color: "#bfdbfe", fontSize: "12px", border: "1px solid rgba(255,255,255,0.25)", padding: "5px 12px", borderRadius: "6px", textDecoration: "none" }}>
            Admin
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 0 }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Category strip ── */}
      <div style={{ background: "#112266", padding: "6px 16px", display: "flex", gap: "4px", overflowX: "auto" }}>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/?category=${encodeURIComponent(cat)}`}
            style={{ whiteSpace: "nowrap", fontSize: "12px", color: "#bfdbfe", padding: "4px 12px", borderRadius: "20px", textDecoration: "none" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "rgba(255,255,255,0.12)"; (e.target as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.color = "#bfdbfe"; }}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div style={{ background: "#0f2557", padding: "12px 20px 20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {CATEGORIES.map((cat) => (
              <Link key={cat} href={`/?category=${encodeURIComponent(cat)}`} style={{ color: "#bfdbfe", fontSize: "14px", textDecoration: "none", padding: "6px 0" }} onClick={() => setMenuOpen(false)}>
                {cat}
              </Link>
            ))}
            <Link href="/admin" style={{ color: "#fb923c", fontSize: "14px", textDecoration: "none", padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "6px" }} onClick={() => setMenuOpen(false)}>
              Admin Portal →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
