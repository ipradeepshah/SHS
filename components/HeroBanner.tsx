"use client";
import { STORE_NAME, STORE_ADDRESS } from "@/lib/constants";

interface HeroBannerProps {
  onShopPlumbing: () => void;
  onShopPaints: () => void;
}

export default function HeroBanner({ onShopPlumbing, onShopPaints }: HeroBannerProps) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #0f2557 0%, #1a3a7a 60%, #0f2557 100%)",
      padding: "44px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative circles */}
      <div style={{ position: "absolute", right: 0, top: 0, width: "280px", height: "280px", borderRadius: "50%", background: "#ea6c00", opacity: 0.07, transform: "translate(35%,-35%)" }} />
      <div style={{ position: "absolute", right: "15%", bottom: 0, width: "160px", height: "160px", borderRadius: "50%", background: "#fff", opacity: 0.04, transform: "translateY(45%)" }} />

      <div style={{
        maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1,
        display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap",
      }}>

        {/* ── Left 2/3 — text content ── */}
        <div style={{ flex: "2 1 480px", minWidth: 0 }}>
          <p style={{ color: "#fb923c", fontWeight: 600, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px" }}>
            Your Local Hardware Store · {STORE_ADDRESS}
          </p>
          <h1 style={{
            fontSize: "clamp(16px, 5vw, 42px)", fontWeight: 800, color: "#fff",
            lineHeight: 1.15, marginBottom: "14px", whiteSpace: "nowrap",
          }}>
            {STORE_NAME.split("&")[0]}
            <span style={{ color: "#ea6c00" }}>&amp; Suppliers</span>
          </h1>
          <p style={{ color: "#bfdbfe", fontSize: "16px", lineHeight: 1.7, marginBottom: "28px", maxWidth: "520px" }}>
            Plumbing essentials, pipes, valves, paints for wood &amp; iron —
            everything you need for construction &amp; maintenance.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={onShopPlumbing}
              style={{ background: "#ea6c00", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
            >
              🔧 Shop Plumbing
            </button>
            <button
              onClick={onShopPaints}
              style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.35)", padding: "12px 24px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}
            >
              🎨 Shop Paints
            </button>
          </div>
        </div>

        {/* ── Right 1/3 — store illustration ── */}
        <div style={{ flex: "1 1 240px", minWidth: "220px", display: "flex", justifyContent: "center" }}>
          <StoreIllustration />
        </div>

      </div>
    </div>
  );
}

// ── Simple storefront illustration (placeholder for /public/store-photo.jpg) ──
function StoreIllustration() {
  return (
    <div style={{
      width: "100%", maxWidth: "280px", aspectRatio: "4/3",
      borderRadius: "16px", overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.15)",
      boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
      background: "#fff",
    }}>
      <svg viewBox="0 0 280 210" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
        {/* Sky */}
        <rect width="280" height="210" fill="#fef3e2" />
        {/* Ground */}
        <rect y="170" width="280" height="40" fill="#d6d3d1" />
        {/* Store building */}
        <rect x="20" y="60" width="240" height="110" fill="#f5f0e8" stroke="#cbd5e1" strokeWidth="2" />
        {/* Roof / sign band */}
        <rect x="14" y="40" width="252" height="28" rx="4" fill="#0f2557" />
        <text x="140" y="59" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700" fill="#fff">
          SIYARAM HARDWARE &amp; SUPPLIERS
        </text>
        {/* Awning stripes */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={20 + i * 34.3} y="68" width="34.3" height="10" fill={i % 2 === 0 ? "#ea6c00" : "#fff"} />
        ))}
        {/* Shop window left */}
        <rect x="32" y="92" width="78" height="62" fill="#bae6fd" stroke="#0f2557" strokeWidth="2" />
        {/* Shelves inside window */}
        <rect x="38" y="108" width="66" height="4" fill="#0f2557" />
        <rect x="38" y="128" width="66" height="4" fill="#0f2557" />
        {/* Paint cans on shelf */}
        <rect x="42" y="98" width="10" height="10" fill="#ea6c00" />
        <rect x="56" y="98" width="10" height="10" fill="#7c3aed" />
        <rect x="70" y="98" width="10" height="10" fill="#16a34a" />
        <rect x="84" y="98" width="10" height="10" fill="#0ea5e9" />
        {/* Pipes on lower shelf */}
        <rect x="40" y="134" width="60" height="6" rx="3" fill="#9ca3af" />
        <rect x="40" y="144" width="60" height="6" rx="3" fill="#6b7280" />

        {/* Door */}
        <rect x="120" y="100" width="40" height="70" fill="#0f2557" />
        <circle cx="153" cy="135" r="2.5" fill="#ea6c00" />
        {/* Door glass panel */}
        <rect x="126" y="106" width="28" height="38" fill="#93c5fd" opacity="0.5" />

        {/* Shop window right */}
        <rect x="170" y="92" width="78" height="62" fill="#bae6fd" stroke="#0f2557" strokeWidth="2" />
        <rect x="176" y="108" width="66" height="4" fill="#0f2557" />
        {/* Tools hanging */}
        <rect x="182" y="96" width="4" height="22" fill="#374151" />
        <circle cx="184" cy="96" r="5" fill="#374151" />
        <rect x="200" y="98" width="22" height="6" rx="2" fill="#ea6c00" />
        <rect x="232" y="96" width="6" height="22" fill="#6b7280" />
        {/* Paint buckets right */}
        <rect x="178" y="128" width="14" height="14" rx="2" fill="#f59e0b" />
        <rect x="198" y="128" width="14" height="14" rx="2" fill="#dc2626" />
        <rect x="218" y="128" width="14" height="14" rx="2" fill="#0891b2" />

        {/* Step / curb */}
        <rect x="20" y="170" width="240" height="6" fill="#9ca3af" />

        {/* Small sun */}
        <circle cx="252" cy="22" r="12" fill="#fcd34d" />
      </svg>
    </div>
  );
}
