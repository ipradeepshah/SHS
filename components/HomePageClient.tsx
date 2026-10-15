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
import { ShieldCheck, Truck, Award, Phone, ChevronDown } from "lucide-react";

const INITIAL_VISIBLE_COUNT = 12;
const LOAD_MORE_COUNT = 12;

interface HomePageClientProps {
  initialProducts: Product[];
}

function HomeContent({ initialProducts }: HomePageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products] = useState<Product[]>(initialProducts);
  const [cartCount, setCartCount] = useState(0);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

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
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [searchParams]);

  // Reset pagination when activeCategory, searchQuery, sortBy, or maxPrice changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [activeCategory, searchQuery, sortBy, maxPrice]);

  // ── Handlers ──
  function handleSearch(q: string) {
    setSearchQuery(q);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
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
    setVisibleCount(INITIAL_VISIBLE_COUNT);
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

  // Pagination calculations (limits visible products to 12 initially, and loads in batches)
  const displayedProducts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const remainingCount = filtered.length - visibleCount;
  const progressPercent = filtered.length > 0
    ? Math.min(100, Math.round((displayedProducts.length / filtered.length) * 100))
    : 100;

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
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 py-4 sm:py-6">
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

        {/* ── Product grid (Flipkart / Amazon 2-column mobile layout) ── */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>📦</div>
            <p style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>No products found</p>
            <p style={{ fontSize: "14px" }}>Try a different search or category</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3.5 md:gap-4">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>

            {/* ── See More Items Pagination Controller ── */}
            {hasMore && (
              <div className="mt-8 mb-4 flex flex-col items-center justify-center">
                {/* Progress counter & bar */}
                <div className="text-center mb-3">
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Showing <span className="font-bold text-slate-900">{displayedProducts.length}</span> of{" "}
                    <span className="font-bold text-slate-900">{filtered.length}</span> products
                  </p>
                  <div className="w-48 sm:w-64 h-1.5 bg-slate-200 rounded-full mx-auto mt-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ea6c00] to-[#f97316] rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* See More Items button */}
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0f2557] hover:bg-[#1a3a7e] active:scale-95 text-white font-bold text-sm sm:text-base rounded-xl shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer border border-[#0f2557]"
                  aria-label="See more hardware products"
                >
                  <span>See More Items</span>
                  <span className="text-xs font-normal opacity-90 bg-white/20 px-2 py-0.5 rounded-full">
                    +{Math.min(LOAD_MORE_COUNT, remainingCount)} more
                  </span>
                  <ChevronDown size={18} />
                </button>
              </div>
            )}

            {!hasMore && filtered.length > INITIAL_VISIBLE_COUNT && (
              <div className="mt-8 mb-2 text-center py-3.5 px-4 bg-slate-100 border border-slate-200/80 rounded-xl max-w-md mx-auto">
                <p className="text-xs sm:text-sm text-slate-700 font-semibold">
                  ✓ You’ve viewed all {filtered.length} products
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  Looking for additional hardware sizes or bulk supply? Check our store details below.
                </p>
              </div>
            )}
          </>
        )}

        {/* ── Trust Features Strip ── */}
        {showHero && (
          <div
            style={{
              marginTop: "48px",
              background: "#fff",
              borderRadius: "16px",
              padding: "28px 20px",
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
                  Free Delivery Over ₹50,000
                </h4>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                  Orders above ₹50,000 get FREE delivery in Birgunj. Below ₹50,000, nominal area charges confirmed on WhatsApp.
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
