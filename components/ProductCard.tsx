"use client";
import { Product } from "@/lib/types";
import { ShoppingCart, Package } from "lucide-react";
import Link from "next/link";
import { generateSlug } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;

}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <Link
      href={`/product/${generateSlug(product)}`}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col cursor-pointer group"
      style={{ textDecoration: "none" }}
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
            <Package size={48} />
            <span className="text-xs mt-1">No Image</span>
          </div>
        )}
        {discount > 0 && (
          <span
            className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full text-white"
            style={{ background: "#ea6c00" }}
          >
            {discount}% OFF
          </span>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-2 right-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-sm font-bold text-red-500">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full self-start mb-1"
          style={{ background: "#fff3e0", color: "#ea6c00" }}
        >
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight mb-1">
          {product.name}
        </h3>
        {product.brand && (
          <p className="text-xs text-gray-400 mb-2">{product.brand}</p>
        )}

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-bold" style={{ color: "#0f2557" }}>
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-gray-500">/{product.unit}</span>
            {product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.mrp}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); e.preventDefault();
              onAddToCart(product);
            }}
            disabled={product.stock === 0}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-white transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: product.stock === 0 ? "#ccc" : "#ea6c00" }}
          >
            <ShoppingCart size={15} />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}
