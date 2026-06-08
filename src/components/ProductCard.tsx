"use client";

import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { openQuickView } from "@/store/slices/uiSlice";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition hover:border-white/20">
      <div className="relative aspect-square">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.onSale && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              SALE
            </div>
          )}
        </Link>
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(openQuickView(product));
            }}
            className="p-3 bg-white rounded-full text-black hover:bg-gray-200 transition"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(toggleWishlist(product));
            }}
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
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-xl font-semibold mb-2 hover:text-blue-400 transition">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">${product.price}</p>
            {product.originalPrice && (
              <p className="text-lg text-gray-500 line-through">${product.originalPrice}</p>
            )}
          </div>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
