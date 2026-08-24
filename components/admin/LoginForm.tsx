"use client";
import { useState } from "react";
import Link from "next/link";
import { Package, Eye, EyeOff } from "lucide-react";
import { STORE_NAME } from "@/lib/constants";

interface LoginFormProps {
  onLogin: () => void;
}

const ADMIN_PASSWORD = "sahoo123";

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [error, setError]         = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      try { localStorage.setItem("siyaram_admin", "true"); } catch {}
      onLogin();
    } else {
      setError("Wrong password. Please try again.");
      setPassword("");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f2557", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ background: "#fff", borderRadius: "18px", padding: "44px 36px", width: "100%", maxWidth: "420px", boxShadow: "0 24px 64px rgba(0,0,0,0.35)" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "62px", height: "62px", borderRadius: "16px", background: "#ea6c00", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Package size={32} color="#fff" />
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f2557", margin: "0 0 6px" }}>Admin Login</h1>
          <p style={{ color: "#9ca3af", fontSize: "14px", margin: 0 }}>{STORE_NAME}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#374151", marginBottom: "8px" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Enter admin password"
                autoFocus
                autoComplete="current-password"
                style={{ width: "100%", boxSizing: "border-box", padding: "13px 48px 13px 16px", borderRadius: "10px", border: `2px solid ${error ? "#ef4444" : "#e5e7eb"}`, fontSize: "16px", outline: "none", color: "#111" }}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0 }}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "6px", fontWeight: 500 }}>❌ {error}</p>}
          </div>

          <button
            type="submit"
            style={{ padding: "14px", borderRadius: "10px", background: "#ea6c00", color: "#fff", border: "none", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}
          >
            Login →
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "22px" }}>
          <Link href="/" style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "none" }}>← Back to Store</Link>
        </p>
      </div>
    </div>
  );
}
