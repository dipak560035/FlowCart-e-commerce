"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromWishlist, toggleWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heart, ShoppingCart, ChevronLeft } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const wishlistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      wishlistRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="text-gray-400 hover:text-white mb-8 inline-flex items-center gap-2 transition">
            <ChevronLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-8">Wishlist</h1>

          <div ref={wishlistRef}>
            {wishlistItems.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="h-24 w-24 mx-auto mb-6 text-gray-600" />
                <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
                <p className="text-gray-400 mb-8">Save items you love for later</p>
                <Link href="/products" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition">
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition hover:border-white/20"
                  >
                    <Link href={`/products/${item.id}`} className="relative aspect-square overflow-hidden block">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {item.onSale && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          SALE
                        </div>
                      )}
                    </Link>
                    <div className="p-6">
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                        {item.category}
                      </p>
                      <Link href={`/products/${item.id}`} className="block">
                        <h3 className="text-xl font-semibold mb-2 hover:text-blue-400 transition">{item.name}</h3>
                      </Link>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold">${item.price}</p>
                          {item.originalPrice && (
                            <p className="text-lg text-gray-500 line-through">${item.originalPrice}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => dispatch(addToCart(item))}
                          className="flex-1 bg-white text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => dispatch(toggleWishlist(item))}
                          className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
