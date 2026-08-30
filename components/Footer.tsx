"use client";
import Link from "next/link";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import {
  STORE_NAME, STORE_ADDRESS, STORE_PHONE,
  STORE_PHONE_RAW, STORE_HOURS, STORE_SOCIALS, whatsappLink,
} from "@/lib/constants";

export default function Footer() {
  const quickLinks = [
    { label: "Plumbing",         href: "/?category=Plumbing" },
    { label: "Pipes & Fittings", href: "/?category=Pipes+%26+Fittings" },
    { label: "Valves & Taps",    href: "/?category=Valves+%26+Taps" },
    { label: "Paint – Wood",     href: "/?category=Paint+-+Wood" },
    { label: "Paint – Iron",     href: "/?category=Paint+-+Iron" },
    { label: "Tools",            href: "/?category=Tools" },
    { label: "General Hardware", href: "/?category=General+Hardware" },
    { label: "About CEO",        href: "/ceo" },
  ];

  const socialLinks = [
    { label: "Facebook",        href: STORE_SOCIALS.facebook,       icon: "f",  bg: "#1877F2" },
    { label: "Instagram",       href: STORE_SOCIALS.instagram,      icon: "📷", bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" },
    { label: "Google Business", href: STORE_SOCIALS.googleBusiness, icon: "G",  bg: "#34A853" },
    { label: "Crunchbase",       href: STORE_SOCIALS.crunchbase,     icon: "cb", bg: "#0288D1" },
  ];

  return (
    <footer style={{ background: "#002D5A", color: "#fff", marginTop: "48px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "36px" }}>

        {/* Brand */}
        <div>
          <img src="/logo.png" alt="Siyaram Hardware Logo" style={{ height: "48px", width: "auto", objectFit: "contain", marginBottom: "16px" }} />
          <p style={{ color: "#93c5fd", fontSize: "14px", lineHeight: 1.7, marginBottom: "16px" }}>
            Your trusted hardware partner for plumbing, paints, tools and all construction needs.
          </p>
          <a
            href={whatsappLink("Hello! I need help with a product.")}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#25D366", color: "#fff", padding: "9px 18px", borderRadius: "9px", fontSize: "13px", fontWeight: 600, textDecoration: "none", marginBottom: "18px" }}
          >
            <MessageCircle size={15} /> Chat on WhatsApp
          </a>

          {/* Social icons */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: "13px", marginBottom: "10px", color: "#e2e8f0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Find Us Online
            </h4>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  title={social.label}
                  aria-label={social.label}
                  style={{
                    width: "36px", height: "36px", borderRadius: "9px",
                    background: social.bg, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    textDecoration: "none", fontSize: "15px", fontWeight: 700,
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontWeight: 700, fontSize: "15px", marginBottom: "14px", color: "#e2e8f0" }}>
            Shop by Category
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{ color: "#93c5fd", fontSize: "14px", textDecoration: "none" }}
              >
                › {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontWeight: 700, fontSize: "15px", marginBottom: "14px", color: "#e2e8f0" }}>
            Contact Us
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href={`tel:${STORE_PHONE_RAW}`} style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "#93c5fd", textDecoration: "none", fontSize: "14px" }}>
              <Phone size={15} style={{ marginTop: "2px", flexShrink: 0, color: "#FF6B00" }} />
              {STORE_PHONE}
            </a>
            <a href={STORE_SOCIALS.googleBusiness} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "#93c5fd", textDecoration: "none", fontSize: "14px" }}>
              <MapPin size={15} style={{ marginTop: "2px", flexShrink: 0, color: "#FF6B00" }} />
              {STORE_ADDRESS}
            </a>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "#93c5fd", fontSize: "14px" }}>
              <Clock size={15} style={{ marginTop: "2px", flexShrink: 0, color: "#FF6B00" }} />
              {STORE_HOURS}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <p style={{ color: "#64748b", fontSize: "12px", margin: 0 }}>
          © {new Date().getFullYear()} {STORE_NAME}. All rights reserved.
        </p>
        <Link href="/admin" style={{ color: "#475569", fontSize: "12px", textDecoration: "none" }}>
          Admin Portal
        </Link>
      </div>
    </footer>
  );
}
