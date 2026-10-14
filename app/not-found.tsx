import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { STORE_NAME, STORE_PHONE, STORE_PHONE_RAW } from "@/lib/constants";
import { CATEGORY_DETAILS } from "@/lib/types";
import { AlertCircle, Home, Phone } from "lucide-react";

export const metadata = {
  title: `Page Not Found | ${STORE_NAME}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8fafc" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "800px", margin: "60px auto", padding: "0 20px", textAlign: "center" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "48px 32px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "#fff7ed",
              color: "#ea6c00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <AlertCircle size={36} />
          </div>

          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
            Product or Page Not Found
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px", lineHeight: 1.6, maxWidth: "540px", margin: "0 auto 32px" }}>
            The page or product you requested may have moved or is no longer available. Explore our store categories below or contact our Birgunj store directly.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginBottom: "36px" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#ea6c00",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              <Home size={16} /> Return to Home
            </Link>
            <a
              href={`tel:${STORE_PHONE_RAW}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#f1f5f9",
                color: "#334155",
                padding: "12px 24px",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              <Phone size={16} /> Call Store: {STORE_PHONE}
            </a>
          </div>

          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "28px", textAlign: "left" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>
              Popular Hardware Categories in Birgunj:
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {CATEGORY_DETAILS.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  style={{
                    fontSize: "12px",
                    color: "#1e293b",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    padding: "6px 12px",
                    borderRadius: "16px",
                    textDecoration: "none",
                  }}
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
