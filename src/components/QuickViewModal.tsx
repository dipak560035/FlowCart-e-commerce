"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeQuickView } from "@/store/slices/uiSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { X, Heart, ShoppingCart, Star } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";

export function QuickViewModal() {
  const dispatch = useAppDispatch();
  const { isQuickViewOpen, quickViewProduct } = useAppSelector((state) => state.ui);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isQuickViewOpen) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isQuickViewOpen]);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      y: 30,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => dispatch(closeQuickView()),
    });
  };

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const isWishlisted = wishlistItems.some((item) => item.id === quickViewProduct.id);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="bg-black border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="grid md:grid-cols-2">
            <div className="aspect-square">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
              />
            </div>

            <div className="p-8 md:p-12">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                {quickViewProduct.category}
              </p>
              <h2 className="text-3xl font-bold mb-4">{quickViewProduct.name}</h2>
              
              <div className="flex items-center gap-1 mb-6">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(quickViewProduct.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                <span className="text-gray-400 ml-2">{quickViewProduct.rating}</span>
              </div>

              <p className="text-gray-400 mb-8">{quickViewProduct.description}</p>

              <div className="flex items-center gap-3 mb-8">
                <p className="text-4xl font-bold">${quickViewProduct.price}</p>
                {quickViewProduct.originalPrice && (
                  <p className="text-2xl text-gray-500 line-through">${quickViewProduct.originalPrice}</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => dispatch(addToCart(quickViewProduct))}
                  className="flex-1 bg-white text-black py-4 rounded-full font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => dispatch(toggleWishlist(quickViewProduct))}
                  className={`p-4 rounded-full border-2 transition ${
                    isWishlisted
                      ? "border-red-500 text-red-500"
                      : "border-white/20 hover:border-white/40"
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
                <Link
                  href={`/products/${quickViewProduct.id}`}
                  onClick={handleClose}
                  className="p-4 rounded-full border-2 border-white/20 hover:border-white/40 transition"
                >
                  <X className="h-6 w-6 rotate-45" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
