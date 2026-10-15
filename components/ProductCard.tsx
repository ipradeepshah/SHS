"use client";
import { Product } from "@/lib/types";
import { ShoppingCart, Package } from "lucide-react";
import Link from "next/link";
import { generateSlug } from "@/lib/utils";
import { FREE_DELIVERY_THRESHOLD } from "@/lib/constants";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <Link
      href={`/product/${generateSlug(product)}`}
      className="group bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer h-full"
      style={{ textDecoration: "none" }}
    >
      <div>
        {/* ── Product Image Container (Flipkart / Amazon 1:1 format) ── */}
        <div className="relative w-full aspect-square bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
          {product.image ? (
            <img
              src={product.image}
              alt={`${product.name} - Siyaram Hardware & Suppliers Birgunj`}
              loading="lazy"
              className="w-full h-full object-contain p-2.5 sm:p-3 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
              <Package size={36} className="sm:size-10" />
              <span className="text-[10px] mt-1 text-slate-400">Genuine Stock</span>
            </div>
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-1.5 left-1.5 text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded bg-[#FF6B00] text-white shadow-xs">
              {discount}% OFF
            </span>
          )}

          {/* Low Stock Warning */}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-1.5 right-1.5 text-[9px] sm:text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200 px-1.5 py-0.5 rounded-full">
              Only {product.stock} left
            </span>
          )}

          {/* Out of Stock Overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center">
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-200">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* ── Product Info ── */}
        <div className="p-2.5 sm:p-3">
          {/* Brand & Category micro-line */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-slate-500 truncate">
              {product.brand || "Hardware"}
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded truncate">
              {product.category}
            </span>
          </div>

          {/* Product Name (2-line clamp for clean grid alignment) */}
          <h3 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-[#ea6c00] transition-colors leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.4rem] mb-1.5">
            {product.name}
          </h3>

          {/* Price & Unit Block */}
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

          {/* Delivery micro-hint */}
          <div className="mt-1 flex items-center gap-1 text-[9px] sm:text-[10px] text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            <span>Free delivery &gt; ₹{(FREE_DELIVERY_THRESHOLD / 1000).toLocaleString("en-IN")}K</span>
          </div>
        </div>
      </div>

      {/* ── Action Button (Flipkart / Amazon style compact Add) ── */}
      <div className="p-2 sm:p-2.5 pt-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onAddToCart(product);
          }}
          disabled={product.stock === 0}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-2 rounded-lg text-xs sm:text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
          style={{
            background: product.stock === 0 ? "#cbd5e1" : "#FF6B00",
          }}
        >
          <ShoppingCart size={13} className="sm:size-3.5" />
          <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
        </button>
      </div>
    </Link>
  );
}
