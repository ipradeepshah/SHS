"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// ── Components ──
import Navbar        from "@/components/Navbar";
import HeroBanner    from "@/components/HeroBanner";
import CategoryGrid  from "@/components/CategoryGrid";
import FilterBar     from "@/components/FilterBar";
import ProductCard   from "@/components/ProductCard";
import ProductModal  from "@/components/ProductModal";
import Footer        from "@/components/Footer";
import Toast         from "@/components/Toast";

// ── Data / Types ──
import { Product }              from "@/lib/types";
import { fetchProducts, getCart, addToCart } from "@/lib/storage";

// ─────────────────────────────────────────────
function HomeContent() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const [products, setProducts]           = useState<Product[]>([]);
  const [cartCount, setCartCount]         = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast]                 = useState("");
  const [searchQuery, setSearchQuery]     = useState(searchParams.get("q") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "");
  const [sortBy, setSortBy]               = useState("default");
  const [maxPrice, setMaxPrice]           = useState(10000);

  // Load products & cart on mount
  useEffect(() => {
    fetchProducts().then((data) => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProducts(data);
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartCount(getCart().reduce((s, i) => s + i.quantity, 0));
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
    const matchSearch = !q
      || p.name.toLowerCase().includes(q)
      || p.description.toLowerCase().includes(q)
      || p.tags.some((t) => t.toLowerCase().includes(q))
      || p.category.toLowerCase().includes(q)
      || p.brand.toLowerCase().includes(q);
    const matchCat   = !activeCategory || p.category === activeCategory;
    const matchPrice = p.price <= maxPrice;
    return matchSearch && matchCat && matchPrice;
  });

  if (sortBy === "price_asc")  filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc") filtered.sort((a, b) => b.price - a.price);
  if (sortBy === "name")       filtered.sort((a, b) => a.name.localeCompare(b.name));

  const showHero = !searchQuery && !activeCategory;

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>

      {/* ── Navbar ── */}
      <Navbar
        cartCount={cartCount}
        onSearch={handleSearch}
        searchValue={searchQuery}
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
        {showHero && (
          <CategoryGrid onSelect={setActiveCategory} />
        )}

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

        {/* ── Product grid ── */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>📦</div>
            <p style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>No products found</p>
            <p style={{ fontSize: "14px" }}>Try a different search or category</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" }}>
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onView={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Overlays ── */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}

// ─────────────────────────────────────────────
export default function HomePage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Loading…
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
