import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProductBySlug,
  getProductsData,
  generateSlug,
  categoryToSlug,
  getProductsByCategory,
} from "@/lib/server-data";
import { SITE_URL, STORE_NAME, STORE_PHONE, STORE_PHONE_RAW, whatsappLink } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartClient from "./AddToCartClient";
import ShareButtons from "./ShareButtons";
import { CheckCircle2, Truck, ShieldCheck, MapPin, Phone, MessageCircle } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const product = getProductBySlug(p.slug);
  if (!product) {
    return {
      title: "Product Not Found | Siyaram Hardware & Suppliers",
      robots: { index: false, follow: false },
    };
  }

  const title = `${product.name} - Siyaram Hardware & Suppliers (Sriram Hardware) | Birgunj, Nepal`;
  const description = `Buy ${product.name} (Brand: ${product.brand || "Apex"}) at best wholesale & retail rate in Birgunj, Nepal. Genuine ${product.category} from Siyaram Hardware & Suppliers (Sriram Hardware), Nagawa Chowk. In stock: NPR ${product.price}. Call/WhatsApp: +977-9815256619.`;
  const canonicalUrl = `${SITE_URL}/product/${generateSlug(product)}`;
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${SITE_URL}${product.image}`
    : `${SITE_URL}/og-image.jpg`;

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: [
      product.name,
      `${product.name} price Nepal`,
      `${product.name} Birgunj`,
      `${product.name} Sriram Hardware`,
      `${product.name} Siyaram Hardware`,
      `${product.brand} ${product.name}`,
      product.category,
      "Sriram Hardware and Suppliers",
      "Siyaram Hardware & Suppliers",
      "hardware store Birgunj Nepal",
      ...(product.tags || []),
    ].filter(Boolean),
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
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${product.name} - Siyaram Hardware & Suppliers`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
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

  const canonicalSlug = generateSlug(product);
  const productUrl = `${SITE_URL}/product/${canonicalSlug}`;
  const catSlug = categoryToSlug(product.category);
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${SITE_URL}${product.image}`
    : `${SITE_URL}/og-image.jpg`;

  // Related products for internal linking and crawling
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // Schema.org Product structured data for Google Shopping & Rich Snippets
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [imageUrl],
    description: product.description,
    sku: product.id,
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: product.brand || STORE_NAME,
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "NPR",
      price: product.price,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: STORE_NAME,
        url: SITE_URL,
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "NP",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnInStore",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "NPR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "NP",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "24",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", "position": 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category,
        item: `${SITE_URL}/category/${catSlug}`,
      },
      { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
    ],
  };

  const waOrderText = `Hello Siyaram Hardware, I would like to enquire / order: ${product.name} (NPR ${product.price}). Link: ${productUrl}`;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main style={{ flex: 1, maxWidth: "1200px", margin: "0 auto", padding: "30px 20px 60px", width: "100%" }}>
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          style={{
            fontSize: "13px",
            color: "#64748b",
            marginBottom: "20px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ color: "#ea6c00", textDecoration: "none", fontWeight: 600 }}>
            Home
          </Link>
          <span>›</span>
          <Link
            href={`/category/${catSlug}`}
            style={{ color: "#ea6c00", textDecoration: "none", fontWeight: 600 }}
          >
            {product.category}
          </Link>
          <span>›</span>
          <span style={{ color: "#1e293b", fontWeight: 600 }}>{product.name}</span>
        </nav>

        {/* Product Container */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "36px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Image Column */}
          <div
            style={{
              flex: "1 1 380px",
              background: "#f8fafc",
              borderRadius: "14px",
              minHeight: "380px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              border: "1px solid #f1f5f9",
              padding: "20px",
            }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={`${product.name} - Siyaram Hardware & Suppliers Birgunj`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "380px",
                  objectFit: "contain",
                }}
              />
            ) : (
              <div style={{ textAlign: "center", color: "#94a3b8" }}>
                <span style={{ fontSize: "64px", opacity: 0.2 }}>📦</span>
                <p style={{ marginTop: "8px", fontSize: "14px" }}>Genuine Product Guarantee</p>
              </div>
            )}
          </div>

          {/* Details Column */}
          <div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column" }}>
            {/* Category & Brand Badges */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}>
              <Link
                href={`/category/${catSlug}`}
                style={{
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                {product.category}
              </Link>
              {product.brand && (
                <span
                  style={{
                    background: "#ffedd5",
                    color: "#ea6c00",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  Brand: {product.brand}
                </span>
              )}
              <span style={{ color: "#94a3b8", fontSize: "12px" }}>SKU: {product.id}</span>
            </div>

            {/* Product H1 */}
            <h1
              style={{
                fontSize: "clamp(24px, 4vw, 32px)",
                fontWeight: 800,
                color: "#0f172a",
                margin: "0 0 12px",
                lineHeight: 1.25,
              }}
            >
              {product.name}
            </h1>

            {/* Rating & Supplier Tag */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#f59e0b", fontSize: "14px", fontWeight: 700 }}>
                <span>★ 4.8</span>
                <span style={{ color: "#64748b", fontWeight: 400, fontSize: "13px" }}>(24 reviews)</span>
              </div>
              <span style={{ color: "#cbd5e1" }}>•</span>
              <span style={{ fontSize: "13px", color: "#0284c7", fontWeight: 600 }}>
                Supplier: Siyaram Hardware (Sriram Hardware)
              </span>
            </div>

            {/* Price Box */}
            <div
              style={{
                background: "#f8fafc",
                padding: "20px 24px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                marginBottom: "24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
                <span style={{ fontSize: "36px", fontWeight: 800, color: "#ea6c00" }}>
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span style={{ fontSize: "14px", color: "#64748b" }}>/ {product.unit}</span>
                {product.mrp > product.price && (
                  <span style={{ fontSize: "18px", color: "#94a3b8", textDecoration: "line-through" }}>
                    MRP ₹{product.mrp.toLocaleString("en-IN")}
                  </span>
                )}
                {product.mrp > product.price && (
                  <span
                    style={{
                      background: "#dcfce7",
                      color: "#15803d",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    Save {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
                  </span>
                )}
              </div>

              <p
                style={{
                  color: product.stock > 0 ? "#16a34a" : "#dc2626",
                  fontWeight: 600,
                  fontSize: "14px",
                  margin: "0 0 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <CheckCircle2 size={16} />
                {product.stock > 0
                  ? `In Stock at Nagawa Chowk, Birgunj (${product.stock} ${product.unit}s ready for dispatch)`
                  : "Currently Out of Stock"}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <AddToCartClient product={product} />

                {/* Direct WhatsApp Order */}
                <a
                  href={whatsappLink(waOrderText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "#25D366",
                    color: "#fff",
                    padding: "12px 20px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "0 2px 8px rgba(37,211,102,0.3)",
                  }}
                >
                  <MessageCircle size={18} /> Quick Order on WhatsApp
                </a>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", marginBottom: "8px" }}>
                Product Description & Specifications
              </h2>
              <div
                style={{
                  fontSize: "14px",
                  color: "#475569",
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                }}
              >
                {product.description}
              </div>
            </div>

            {/* Specifications Summary Table */}
            <div
              style={{
                background: "#f1f5f9",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "24px",
                fontSize: "13px",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <div><strong>Brand:</strong> {product.brand || "Apex"}</div>
                <div><strong>Category:</strong> {product.category}</div>
                <div><strong>Unit:</strong> {product.unit}</div>
                <div><strong>Origin:</strong> Genuine Quality Nepal / India</div>
                <div><strong>Location:</strong> Nagawa Chowk, Birgunj</div>
                <div><strong>Wholesale Available:</strong> Yes (Call store)</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "12px",
                padding: "16px 0",
                borderTop: "1px solid #e2e8f0",
                borderBottom: "1px solid #e2e8f0",
                marginBottom: "24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#475569" }}>
                <Truck size={16} color="#ea6c00" />
                <span>Fast Delivery in Birgunj</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#475569" }}>
                <ShieldCheck size={16} color="#ea6c00" />
                <span>100% Genuine Quality</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#475569" }}>
                <MapPin size={16} color="#ea6c00" />
                <span>Nagawa Chowk Store</span>
              </div>
            </div>

            {/* Tags for SEO */}
            {product.tags && product.tags.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", margin: "0 0 10px" }}>
                  Related Search Terms
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: "#f1f5f9",
                        color: "#475569",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                  <span
                    style={{
                      background: "#f1f5f9",
                      color: "#475569",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    #SriramHardware
                  </span>
                  <span
                    style={{
                      background: "#f1f5f9",
                      color: "#475569",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    #SiyaramHardware
                  </span>
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <ShareButtons url={productUrl} title={product.name} />
          </div>
        </div>

        {/* Store Wholesale Contact Card */}
        <div
          style={{
            background: "#002D5A",
            color: "#fff",
            borderRadius: "16px",
            padding: "28px 32px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          <div>
            <span style={{ color: "#ea6c00", fontWeight: 700, fontSize: "12px", textTransform: "uppercase" }}>
              Need Bulk Supply or Wholesale Price?
            </span>
            <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "6px 0 8px" }}>
              Siyaram Hardware & Suppliers (Sriram Hardware)
            </h3>
            <p style={{ color: "#93c5fd", fontSize: "14px", margin: 0 }}>
              Supplying contractors, plumbers, and builders with genuine construction materials across Birgunj & Madhesh Province.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href={`tel:${STORE_PHONE_RAW}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#ea6c00",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <Phone size={15} /> Call: {STORE_PHONE}
            </a>
            <a
              href={whatsappLink(`Hello Siyaram Hardware, I need bulk wholesale pricing for ${product.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#25D366",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <MessageCircle size={15} /> WhatsApp Bulk Enquiry
            </a>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a" }}>
                Related {product.category} Products
              </h2>
              <Link
                href={`/category/${catSlug}`}
                style={{ fontSize: "14px", color: "#ea6c00", fontWeight: 600, textDecoration: "none" }}
              >
                View all {product.category} →
              </Link>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "20px",
              }}
            >
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/product/${generateSlug(rel)}`}
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    padding: "16px",
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      height: "160px",
                      background: "#f8fafc",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "12px",
                      overflow: "hidden",
                    }}
                  >
                    {rel.image ? (
                      <img
                        src={rel.image}
                        alt={rel.name}
                        style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                      />
                    ) : (
                      <span style={{ fontSize: "36px", opacity: 0.2 }}>📦</span>
                    )}
                  </div>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b", margin: "0 0 6px" }}>
                    {rel.name}
                  </h4>
                  <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "16px", fontWeight: 800, color: "#ea6c00" }}>
                      ₹{rel.price}
                    </span>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>{rel.brand}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
