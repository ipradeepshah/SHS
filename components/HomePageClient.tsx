"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// ── Components ──
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategoryGrid from "@/components/CategoryGrid";
import FilterBar from "@/components/FilterBar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";

// ── Data / Types ──
import { Product } from "@/lib/types";
import { getCart, addToCart } from "@/lib/storage";
import { ShieldCheck, Truck, Award, Phone } from "lucide-react";

interface HomePageClientProps {
  initialProducts: Product[];
}

function HomeContent({ initialProducts }: HomePageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartCount, setCartCount] = useState(0);

  const [toast, setToast] = useState("");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(10000);

  // Sync cart count on mount and updates
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartCount(getCart().reduce((s, i) => s + i.quantity, 0));
    const handleCartUpdate = () => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCartCount(getCart().reduce((s, i) => s + i.quantity, 0));
    };
    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, []);

  // Sync URL params → state
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveCategory(searchParams.get("category") || "");
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // ── Handlers ──
  function handleSearch(q: string) {
    setSearchQuery(q);
    router.push(q ? `/?q=${encodeURIComponent(q)}` : "/");
  }

  function handleAddToCart(product: Product) {
    addToCart(product);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartCount(getCart().reduce((s, i) => s + i.quantity, 0));
    setToast(`${product.name} added to cart!`);
  }

  function handleClearFilters() {
    setActiveCategory("");
    setSearchQuery("");
    router.push("/");
  }

  // ── Filter + Sort ──
  const filtered = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
      p.category.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q));
    const matchCat = !activeCategory || p.category === activeCategory;
    const matchPrice = p.price <= maxPrice;
    return matchSearch && matchCat && matchPrice;
  });

  if (sortBy === "price_asc") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc") filtered.sort((a, b) => b.price - a.price);
  if (sortBy === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

  const showHero = !searchQuery && !activeCategory;

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      {/* ── Navbar ── */}
      <Navbar
        cartCount={cartCount}
        onSearch={handleSearch}
        searchValue={searchQuery}
        activeCategory={activeCategory}
      />

      {/* ── Hero (homepage only) ── */}
      {showHero && (
        <HeroBanner
          onShopPlumbing={() => setActiveCategory("Plumbing")}
          onShopPaints={() => setActiveCategory("Paint - Wood")}
        />
      )}

      {/* ── Main content ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "28px 16px" }}>
        {/* ── Category grid (homepage only) ── */}
        {showHero && <CategoryGrid onSelect={setActiveCategory} />}

        {/* ── Filter & sort bar ── */}
        <FilterBar
          activeCategory={activeCategory}
          sortBy={sortBy}
          maxPrice={maxPrice}
          totalCount={products.length}
          filteredCount={filtered.length}
          searchQuery={searchQuery}
          onCategoryChange={setActiveCategory}
          onSortChange={setSortBy}
          onMaxPriceChange={setMaxPrice}
          onClearFilters={handleClearFilters}
        />

        {/* ── Product grid with SEO Links ── */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>📦</div>
            <p style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>No products found</p>
            <p style={{ fontSize: "14px" }}>Try a different search or category</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}

        {/* ── Trust Features Strip ── */}
        {showHero && (
          <div
            style={{
              marginTop: "56px",
              background: "#fff",
              borderRadius: "16px",
              padding: "32px 24px",
              border: "1px solid #e5e7eb",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
            }}
          >
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{ background: "#fff7ed", padding: "10px", borderRadius: "10px", color: "#ea6c00" }}>
                <Truck size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>
                  Delivery Across Birgunj
                </h4>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                  Fast local delivery to contractors, construction sites, and homes.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{ background: "#eff6ff", padding: "10px", borderRadius: "10px", color: "#1d4ed8" }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>
                  100% Genuine Brands
                </h4>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                  Authorised dealer for Apex, Supreme, Asian Paints, Jaquar, and Marcos.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{ background: "#f0fdf4", padding: "10px", borderRadius: "10px", color: "#16a34a" }}>
                <Award size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>
                  Wholesale & Retail Rates
                </h4>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                  Direct factory rates for bulk project plumbing and construction supplies.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{ background: "#faf5ff", padding: "10px", borderRadius: "10px", color: "#7c3aed" }}>
                <Phone size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>
                  Expert Guidance
                </h4>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                  Get technical advice directly from our experienced store specialists.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <Footer />

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}

export default function HomePageClient({ initialProducts }: HomePageClientProps) {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          Loading Siyaram Hardware…
        </div>
      }
    >
      <HomeContent initialProducts={initialProducts} />
    </Suspense>
  );
}
