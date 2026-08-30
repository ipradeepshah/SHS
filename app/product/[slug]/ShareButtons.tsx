"use client";

import { useState } from "react";
import { Share2, Link as LinkIcon, MessageCircle } from "lucide-react";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy", e);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (e) {
        console.error("Error sharing", e);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #e5e7eb" }}>
      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#374151", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
        <Share2 size={16} />
        Share this product
      </h3>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {/* Native Share / Copy */}
        <button 
          onClick={handleNativeShare}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "#f3f4f6", color: "#4b5563",
            padding: "8px 16px", borderRadius: "8px",
            fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer",
            transition: "background 0.2s"
          }}
        >
          <LinkIcon size={16} />
          {copied ? "Copied!" : "Copy Link"}
        </button>

        {/* WhatsApp */}
        <a 
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "#25D366", color: "#fff", textDecoration: "none",
            padding: "8px 16px", borderRadius: "8px",
            fontSize: "14px", fontWeight: 600,
            transition: "opacity 0.2s"
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          WhatsApp
        </a>

        {/* Facebook */}
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "#1877F2", color: "#fff", textDecoration: "none",
            padding: "8px 16px", borderRadius: "8px",
            fontSize: "14px", fontWeight: 600,
            transition: "opacity 0.2s"
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          Facebook
        </a>

        {/* Twitter / X */}
        <a 
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "#000000", color: "#fff", textDecoration: "none",
            padding: "8px 16px", borderRadius: "8px",
            fontSize: "14px", fontWeight: 600,
            transition: "opacity 0.2s"
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          Twitter
        </a>
      </div>
    </div>
  );
}
