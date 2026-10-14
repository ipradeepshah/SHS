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

      <main style={{ flex: 1, maxWidth: "1200px", margin: "0 auto", padding: "30px 20px 60px", width: "100%" }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px", display: "flex", gap: "8px", alignItems: "center" }}>
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
            padding: "36px 32px",
            marginBottom: "36px",
            boxShadow: "0 4px 20px rgba(0,45,90,0.15)",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.15)", padding: "4px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 600, marginBottom: "12px" }}>
            <span>{info?.icon || "📦"}</span>
            <span>Category Catalog</span>
          </div>
          <h1 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, margin: "0 0 10px" }}>
            {info?.title || `${categoryName} Supplies in Birgunj, Nepal`}
          </h1>
          <p style={{ color: "#bfdbfe", fontSize: "15px", maxWidth: "800px", lineHeight: 1.6, margin: "0 0 20px" }}>
            {info?.description || `Explore our high quality ${categoryName} supplies with genuine warranty, wholesale pricing, and direct pickup at Nagawa Chowk, Birgunj.`}
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <a
              href={whatsappLink(`Hello Siyaram Hardware, I would like to enquire about ${categoryName} supplies.`)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#25D366",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <MessageCircle size={16} /> Bulk Enquiry on WhatsApp
            </a>
            <a
              href={`tel:${STORE_PHONE_RAW}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <Phone size={15} /> Call: {STORE_PHONE}
            </a>
          </div>
        </div>

        {/* Product Grid */}
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
            Available Products ({products.length})
          </h2>
          <Link href="/" style={{ fontSize: "13px", color: "#ea6c00", textDecoration: "none", fontWeight: 600 }}>
            ← View All Categories
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {products.map((product) => {
              const slug = generateSlug(product);
              return (
                <Link
                  key={product.id}
                  href={`/product/${slug}`}
                  style={{
                    background: "#fff",
                    borderRadius: "14px",
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  <div
                    style={{
                      height: "220px",
                      background: "#f8fafc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "16px",
                      borderBottom: "1px solid #f1f5f9",
                    }}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={`${product.name} - Siyaram Hardware Birgunj`}
                        style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                      />
                    ) : (
                      <span style={{ fontSize: "48px", opacity: 0.2 }}>📦</span>
                    )}
                  </div>
                  <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "12px", color: "#ea6c00", fontWeight: 700 }}>
                        {product.brand || "Apex"}
                      </span>
                      <span style={{ fontSize: "11px", color: product.stock > 0 ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                        {product.stock > 0 ? "✓ In Stock" : "Out of Stock"}
                      </span>
                    </div>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: "0 0 8px", lineHeight: 1.3 }}>
                      {product.name}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px", flex: 1, lineClamp: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {product.description}
                    </p>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                      <div>
                        <span style={{ fontSize: "20px", fontWeight: 800, color: "#ea6c00" }}>
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <span style={{ fontSize: "12px", color: "#64748b" }}> /{product.unit}</span>
                      </div>
                      <span style={{ fontSize: "12px", color: "#1d4ed8", fontWeight: 700 }}>
                        View Details →
                      </span>
                    </div>
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
