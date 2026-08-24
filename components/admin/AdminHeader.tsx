"use client";
import Link from "next/link";
import { Package, ArrowLeft } from "lucide-react";
import { STORE_NAME } from "@/lib/constants";

interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header style={{ background: "#0f2557", height: "60px", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#ea6c00", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Package size={19} color="#fff" />
        </div>
        <div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "15px" }}>Admin Portal</span>
          <span style={{ color: "#93c5fd", fontSize: "12px", marginLeft: "8px" }}>{STORE_NAME}</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/" style={{ color: "#bfdbfe", fontSize: "13px", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}>
          <ArrowLeft size={14} /> View Store
        </Link>
        <button
          onClick={onLogout}
          style={{ color: "#bfdbfe", background: "none", border: "1px solid rgba(255,255,255,0.25)", padding: "5px 14px", borderRadius: "7px", cursor: "pointer", fontSize: "13px" }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
