"use client";

import { Product } from "@/types";
import { useStore } from "@/store";
import { Heart, Eye, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, openQuickView, wishlist } = useStore();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition hover:border-white/20">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => openQuickView(product)}
            className="p-3 bg-white rounded-full text-black hover:bg-gray-200 transition"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-3 rounded-full transition ${
              isWishlisted ? "bg-red-500 text-white" : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
          {product.category}
        </p>
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
