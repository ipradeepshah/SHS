import { Metadata } from "next";
import Link from "next/link";
import {
  getProductsByCategory,
  generateSlug,
  slugToCategory,
} from "@/lib/server-data";
import { CATEGORY_DETAILS } from "@/lib/types";
import { SITE_URL, STORE_PHONE, STORE_PHONE_RAW, whatsappLink } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Package, MessageCircle, Phone } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const rawCategory = slugToCategory(p.slug);
  const info = CATEGORY_DETAILS.find(
    (c) => c.slug === p.slug.toLowerCase() || c.name.toLowerCase() === rawCategory.toLowerCase()
  );

  const categoryName = info ? info.name : rawCategory;
  const title = `${categoryName} Supplies in Birgunj, Nepal | Siya Ram Hardware and Suppliers`;
  const description = info
    ? info.description
    : `Explore genuine ${categoryName} at fairprice rates in Birgunj, Nepal from Siya Ram Hardware and Suppliers (Siyaram Hardware & Suppliers), Nagawa Chowk. Call: ${STORE_PHONE}.`;
  const canonicalUrl = `${SITE_URL}/category/${p.slug.toLowerCase()}`;

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: [
      categoryName,
      `${categoryName} Birgunj`,
      `${categoryName} Nepal`,
      `${categoryName} wholesale Birgunj`,
      "Siya Ram Hardware and Suppliers",
      "Siyaram Hardware & Suppliers",
      "hardware shop near me",
      "plumber near me",
      "sanitary shop near me",
      "hose pipe fittings near me",
      "fairprice hardware Birgunj",
      "Nagawa Chowk hardware",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${categoryName} - Siyaram Hardware & Suppliers`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export async function generateStaticParams() {
  return CATEGORY_DETAILS.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const p = await params;
  const rawCategory = slugToCategory(p.slug);
  const info = CATEGORY_DETAILS.find(
    (c) => c.slug === p.slug.toLowerCase() || c.name.toLowerCase() === rawCategory.toLowerCase()
  );

  const categoryName = info ? info.name : rawCategory;
  const products = getProductsByCategory(p.slug);
  const canonicalUrl = `${SITE_URL}/category/${p.slug.toLowerCase()}`;

  // Structured Data (CollectionPage + ItemList)
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} Supplies - Siyaram Hardware & Suppliers`,
    description: info?.description || `Wholesale & retail ${categoryName} supplies in Birgunj, Nepal.`,
    url: canonicalUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((prod, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/product/${generateSlug(prod)}`,
        name: prod.name,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: categoryName, item: canonicalUrl },
    ],
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="flex-1 max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 py-4 sm:py-8 w-full">
        {/* Breadcrumb */}
        <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "16px", display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "#ea6c00", textDecoration: "none", fontWeight: 600 }}>
            Home
          </Link>
          <span>›</span>
          <span style={{ color: "#1e293b", fontWeight: 600 }}>{categoryName}</span>
        </div>

        {/* Category Header Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #002D5A 0%, #004b93 100%)",
            color: "#fff",
            borderRadius: "16px",
            padding: "24px 20px",
            marginBottom: "28px",
            boxShadow: "0 4px 20px rgba(0,45,90,0.15)",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.15)", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, marginBottom: "10px" }}>
            <span>{info?.icon || "📦"}</span>
            <span>Category Catalog</span>
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, margin: "0 0 8px" }}>
            {info?.title || `${categoryName} Supplies in Birgunj, Nepal`}
          </h1>
          <p style={{ color: "#bfdbfe", fontSize: "14px", maxWidth: "800px", lineHeight: 1.5, margin: "0 0 16px" }}>
            {info?.description || `Explore our high quality ${categoryName} supplies with genuine warranty, wholesale pricing, and direct pickup at Nagawa Chowk, Birgunj.`}
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <a
              href={whatsappLink(`Hello Siyaram Hardware, I would like to enquire about ${categoryName} supplies.`)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#25D366",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <MessageCircle size={15} /> WhatsApp Enquiry
            </a>
            <a
              href={`tel:${STORE_PHONE_RAW}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <Phone size={14} /> Call: {STORE_PHONE}
            </a>
          </div>
        </div>

        {/* Product Grid Header */}
        <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
            {categoryName} Products ({products.length})
          </h2>
          <Link href="/" style={{ fontSize: "12px", color: "#ea6c00", textDecoration: "none", fontWeight: 600 }}>
            ← All Categories
          </Link>
        </div>

        {products.length === 0 ? (
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "48px 24px",
              textAlign: "center",
              border: "1px solid #e2e8f0",
            }}
          >
            <Package size={48} color="#94a3b8" style={{ margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b", marginBottom: "8px" }}>
              More {categoryName} items arriving shortly!
            </h3>
            <p style={{ color: "#64748b", fontSize: "14px", maxWidth: "500px", margin: "0 auto 20px" }}>
              We stock a complete variety of {categoryName} at our Birgunj store. Contact us directly for immediate warehouse availability and bulk rates.
            </p>
            <a
              href={whatsappLink(`Hello, I need ${categoryName} supplies in Birgunj.`)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#ea6c00",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <MessageCircle size={16} /> Request Item on WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3.5 md:gap-4">
            {products.map((product) => {
              const slug = generateSlug(product);
              const discount =
                product.mrp > product.price
                  ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
                  : 0;

              return (
                <Link
                  key={product.id}
                  href={`/product/${slug}`}
                  className="group bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer h-full"
                  style={{ textDecoration: "none" }}
                >
                  <div>
                    {/* Image */}
                    <div className="relative w-full aspect-square bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={`${product.name} - Siyaram Hardware Birgunj`}
                          loading="lazy"
                          className="w-full h-full object-contain p-2.5 sm:p-3 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                          <Package size={36} className="sm:size-10" />
                          <span className="text-[10px] mt-1 text-slate-400">Genuine Stock</span>
                        </div>
                      )}

                      {discount > 0 && (
                        <span className="absolute top-1.5 left-1.5 text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded bg-[#FF6B00] text-white shadow-xs">
                          {discount}% OFF
                        </span>
                      )}

                      {product.stock <= 5 && product.stock > 0 && (
                        <span className="absolute top-1.5 right-1.5 text-[9px] sm:text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200 px-1.5 py-0.5 rounded-full">
                          Only {product.stock} left
                        </span>
                      )}

                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center">
                          <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-200">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-2.5 sm:p-3">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-slate-500 truncate">
                          {product.brand || "Hardware"}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold">
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>

                      <h3 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-[#ea6c00] transition-colors leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.4rem] mb-1.5">
                        {product.name}
                      </h3>

                      <div className="flex flex-wrap items-baseline gap-1.5">
                        <span className="text-sm sm:text-base font-extrabold text-[#002D5A]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] sm:text-xs text-slate-500 font-normal">
                          /{product.unit}
                        </span>
                        {product.mrp > product.price && (
                          <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                            ₹{product.mrp.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex items-center gap-1 text-[9px] sm:text-[10px] text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                        <span>Free delivery &gt; ₹50,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 sm:p-2.5 pt-0">
                    <span className="w-full flex items-center justify-center py-1.5 sm:py-2 px-2 rounded-lg text-xs sm:text-sm font-semibold text-[#002D5A] bg-blue-50 group-hover:bg-[#FF6B00] group-hover:text-white transition-all shadow-xs">
                      View Details & Order →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Other Categories Navigation */}
        <div style={{ marginTop: "48px", background: "#fff", borderRadius: "16px", padding: "28px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
            Explore Other Hardware Categories in Birgunj
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {CATEGORY_DETAILS.filter((c) => c.slug !== p.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  background: "#f1f5f9",
                  color: "#334155",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>{c.icon}</span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
