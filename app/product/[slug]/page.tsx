import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getProductsData, generateSlug } from "@/lib/server-data";
import { SITE_URL, STORE_NAME } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartClient from "./AddToCartClient";
import ShareButtons from "./ShareButtons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const product = getProductBySlug(p.slug);
  if (!product) return { title: "Product Not Found" };

  const title = `${product.name} - Buy at ${STORE_NAME}`;
  const description = product.description.substring(0, 160);
  const url = `${SITE_URL}/product/${generateSlug(product)}`;

  return {
    title,
    description,
    keywords: product.tags,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      
      images: product.image ? [{ url: product.image, width: 800, height: 800, alt: product.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.image ? [product.image] : [],
    }
  };
}

export async function generateStaticParams() {
  const products = getProductsData();
  return products.map((product) => ({
    slug: generateSlug(product),
  }));
}

export default async function ProductPage({ params }: Props) {
  const p = await params;
  const product = getProductBySlug(p.slug);
  
  if (!product) {
    notFound();
  }

  const productUrl = `${SITE_URL}/product/${generateSlug(product)}`;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image ? [product.image] : [],
    "description": product.description,
    "sku": product.id,
    "mpn": product.id,
    "brand": {
      "@type": "Brand",
      "name": product.brand || STORE_NAME
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "NPR",
      "price": product.price,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": STORE_NAME
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": product.category, "item": `${SITE_URL}/?category=${encodeURIComponent(product.category)}` },
      { "@type": "ListItem", "position": 3, "name": product.name, "item": productUrl }
    ]
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", flexDirection: "column" }}>
      <Navbar />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main style={{ flex: 1, maxWidth: "1200px", margin: "0 auto", padding: "40px 20px", width: "100%" }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px", display: "flex", gap: "8px", alignItems: "center" }}>
          <Link href="/" style={{ color: "#ea6c00", textDecoration: "none" }}>Home</Link>
          <span>›</span>
          <Link href={`/?category=${encodeURIComponent(product.category)}`} style={{ color: "#ea6c00", textDecoration: "none" }}>{product.category}</Link>
          <span>›</span>
          <span style={{ color: "#374151", fontWeight: 500 }}>{product.name}</span>
        </div>

        <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", border: "1px solid #e5e7eb", display: "flex", flexWrap: "wrap", gap: "40px" }}>
          {/* Image */}
          <div style={{ flex: "1 1 400px", background: "#f1f5f9", borderRadius: "12px", minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {product.image ? (
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            ) : (
              <span style={{ fontSize: "64px", opacity: 0.1 }}>{product.name[0]}</span>
            )}
          </div>

          {/* Details */}
          <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column" }}>
            <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111827", margin: "0 0 16px", lineHeight: 1.2 }}>{product.name}</h1>
            
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <span style={{ background: "#ea6c00", color: "#fff", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 700 }}>
                {product.brand}
              </span>
              <span style={{ color: "#6b7280", fontSize: "14px" }}>SKU: {product.id}</span>
            </div>

            <p style={{ fontSize: "16px", color: "#4b5563", lineHeight: 1.6, margin: "0 0 32px" }}>
              {product.description}
            </p>

            <div style={{ background: "#f9fafb", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb", marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
                <span style={{ fontSize: "36px", fontWeight: 800, color: "#ea6c00" }}>₹{product.price}</span>
                {product.mrp > product.price && (
                  <span style={{ fontSize: "18px", color: "#9ca3af", textDecoration: "line-through" }}>MRP ₹{product.mrp}</span>
                )}
              </div>
              <p style={{ color: product.stock > 0 ? "#16a34a" : "#dc2626", fontWeight: 600, fontSize: "14px", margin: "0 0 16px" }}>
                {product.stock > 0 ? `✓ In Stock (${product.stock} ${product.unit}s)` : "✗ Out of Stock"}
              </p>
              
              <AddToCartClient product={product} />
            </div>

            {/* Tags for SEO */}
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", margin: "0 0 12px" }}>Tags</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {product.tags && product.tags.map(tag => (
                  <span key={tag} style={{ background: "#f1f5f9", color: "#4b5563", padding: "4px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: 500 }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share Buttons */}
            <ShareButtons url={productUrl} title={product.name} />

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
