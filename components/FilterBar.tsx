"use client";
import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/lib/types";

interface FilterBarProps {
  activeCategory: string;
  sortBy: string;
  maxPrice: number;
  totalCount: number;
  filteredCount: number;
  searchQuery: string;
  onCategoryChange: (cat: string) => void;
  onSortChange: (sort: string) => void;
  onMaxPriceChange: (price: number) => void;
  onClearFilters: () => void;
}

export default function FilterBar({
  activeCategory, sortBy, maxPrice, totalCount, filteredCount,
  searchQuery, onCategoryChange, onSortChange, onMaxPriceChange, onClearFilters,
}: FilterBarProps) {
  const [showPanel, setShowPanel] = useState(false);
  const hasFilters = !!activeCategory || !!searchQuery;

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Toolbar row */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: showPanel ? "14px" : "0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f2557", margin: 0 }}>
            {activeCategory || (searchQuery ? `"${searchQuery}"` : "All Products")}
          </h2>
          <span style={{ fontSize: "13px", color: "#9ca3af" }}>({filteredCount} products)</span>
          {hasFilters && (
            <button
              onClick={onClearFilters}
              style={{ fontSize: "12px", color: "#ea6c00", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}
            >
              Clear filters
            </button>
          )}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setShowPanel(!showPanel)}
            style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", padding: "8px 14px", borderRadius: "9px", border: "1px solid #e5e7eb", background: showPanel ? "#0f2557" : "#fff", color: showPanel ? "#fff" : "#374151", cursor: "pointer" }}
          >
            <Filter size={13} />
            Filters
            <ChevronDown size={13} style={{ transform: showPanel ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{ fontSize: "13px", padding: "8px 12px", borderRadius: "9px", border: "1px solid #e5e7eb", background: "#fff", outline: "none", cursor: "pointer" }}
          >
            <option value="default">Sort: Default</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>
      </div>

      {/* Filter panel */}
      {showPanel && (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", display: "grid", gap: "20px" }}>
          {/* Categories */}
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "10px" }}>Category</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <button
                onClick={() => onCategoryChange("")}
                style={{ fontSize: "12px", padding: "6px 14px", borderRadius: "20px", border: `1px solid ${!activeCategory ? "#ea6c00" : "#e5e7eb"}`, background: !activeCategory ? "#ea6c00" : "#fff", color: !activeCategory ? "#fff" : "#4b5563", cursor: "pointer", fontWeight: 500 }}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  style={{ fontSize: "12px", padding: "6px 14px", borderRadius: "20px", border: `1px solid ${activeCategory === cat ? "#ea6c00" : "#e5e7eb"}`, background: activeCategory === cat ? "#ea6c00" : "#fff", color: activeCategory === cat ? "#fff" : "#4b5563", cursor: "pointer", fontWeight: 500 }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
              Max Price: <span style={{ color: "#ea6c00" }}>₹{maxPrice.toLocaleString("en-IN")}</span>
            </p>
            <input
              type="range" min={0} max={10000} step={100} value={maxPrice}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#ea6c00" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#9ca3af", marginTop: "4px" }}>
              <span>₹0</span><span>₹10,000</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
