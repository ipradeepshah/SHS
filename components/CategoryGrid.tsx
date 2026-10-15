"use client";
import Link from "next/link";
import { categoryToSlug } from "@/lib/utils";

interface Category {
  name: string;
  icon: string;
  color: string;
}

const FEATURED_CATEGORIES: Category[] = [
  { name: "Plumbing",          icon: "💧", color: "#0ea5e9" },
  { name: "Ceramic & Sanitary",icon: "🛁", color: "#0284c7" },
  { name: "Pipes & Fittings",  icon: "🔧", color: "#0f2557" },
  { name: "Paint - Wood",      icon: "🪵", color: "#a16207" },
  { name: "Paint - Iron",      icon: "🔩", color: "#7c3aed" },
  { name: "Valves & Taps",     icon: "🚰", color: "#0891b2" },
  { name: "Tools",             icon: "🔨", color: "#b45309" },
  { name: "Suppliers & Wholesale", icon: "🏗️", color: "#ea6c00" },
  { name: "Fasteners & Screws",icon: "⚙️", color: "#15803d" },
  { name: "General Hardware",  icon: "📦", color: "#6b7280" },
];

interface CategoryGridProps {
  onSelect?: (category: string) => void;
}

export default function CategoryGrid({ onSelect }: CategoryGridProps) {
  return (
    <div style={{ marginBottom: "36px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f2557", margin: 0 }}>
          Shop by Category
        </h2>
        <span style={{ fontSize: "12px", color: "#ea6c00", fontWeight: 600 }}>
          Explore All Categories →
        </span>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2 sm:gap-3">
        {FEATURED_CATEGORIES.map((cat) => {
          const href = `/category/${categoryToSlug(cat.name)}`;
          return (
            <Link
              key={cat.name}
              href={href}
              onClick={(e) => {
                if (onSelect) {
                  // If onSelect is handled and user doesn't middle click or ctrl click
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    onSelect(cat.name);
                  }
                }
              }}
              className="flex flex-col items-center gap-1.5 p-2 sm:p-2.5 bg-white rounded-xl border border-slate-100 hover:border-slate-300 hover:shadow-xs transition-all duration-150 cursor-pointer text-center group"
              style={{ textDecoration: "none" }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl group-hover:scale-105 transition-transform"
                style={{ background: cat.color + "18" }}
              >
                {cat.icon}
              </div>
              <span className="text-[10px] sm:text-xs text-slate-700 font-semibold leading-tight line-clamp-2">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
