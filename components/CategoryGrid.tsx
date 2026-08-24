"use client";

interface Category {
  name: string;
  icon: string;
  color: string;
}

const FEATURED_CATEGORIES: Category[] = [
  { name: "Plumbing",          icon: "💧", color: "#0ea5e9" },
  { name: "Pipes & Fittings",  icon: "🔧", color: "#0f2557" },
  { name: "Paint - Wood",      icon: "🪵", color: "#a16207" },
  { name: "Paint - Iron",      icon: "🔩", color: "#7c3aed" },
  { name: "Valves & Taps",     icon: "🚰", color: "#0891b2" },
  { name: "Tools",             icon: "🔨", color: "#b45309" },
  { name: "Fasteners & Screws",icon: "⚙️", color: "#15803d" },
  { name: "General Hardware",  icon: "📦", color: "#6b7280" },
];

interface CategoryGridProps {
  onSelect: (category: string) => void;
}

export default function CategoryGrid({ onSelect }: CategoryGridProps) {
  return (
    <div style={{ marginBottom: "36px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f2557", marginBottom: "16px" }}>
        Shop by Category
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "12px" }}>
        {FEATURED_CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelect(cat.name)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
              padding: "14px 8px", background: "#fff", borderRadius: "14px",
              border: "1px solid #f1f5f9", cursor: "pointer",
              transition: "box-shadow 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.transform = "none";
            }}
          >
            <div style={{
              width: "52px", height: "52px", borderRadius: "50%",
              background: cat.color + "18",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "26px",
            }}>
              {cat.icon}
            </div>
            <span style={{ fontSize: "11px", color: "#4b5563", textAlign: "center", fontWeight: 500, lineHeight: 1.3 }}>
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
