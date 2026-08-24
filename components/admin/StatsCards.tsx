interface Stats {
  total: number;
  inStock: number;
  outOfStock: number;
  categories: number;
}

interface StatsCardsProps {
  stats: Stats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    { label: "Total Products", value: stats.total,      color: "#0f2557", icon: "📦" },
    { label: "In Stock",       value: stats.inStock,    color: "#059669", icon: "✅" },
    { label: "Out of Stock",   value: stats.outOfStock, color: "#dc2626", icon: "❌" },
    { label: "Categories",     value: stats.categories, color: "#ea6c00", icon: "🏷️" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "14px", marginBottom: "28px" }}>
      {cards.map((card) => (
        <div key={card.label} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "18px" }}>
          <div style={{ fontSize: "26px", marginBottom: "6px" }}>{card.icon}</div>
          <div style={{ fontSize: "30px", fontWeight: 800, color: card.color, lineHeight: 1 }}>{card.value}</div>
          <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>{card.label}</div>
        </div>
      ))}
    </div>
  );
}
