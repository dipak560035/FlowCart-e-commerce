"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Minus, Plus, Trash2, Heart, ShoppingCart, ChevronLeft } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      cartRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  const isWishlisted = (productId: number) => wishlistItems.some((item) => item.id === productId);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="text-gray-400 hover:text-white mb-8 inline-flex items-center gap-2 transition">
            <ChevronLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-8">Shopping Cart</h1>

          <div ref={cartRef}>
            {cartItems.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingCart className="h-24 w-24 mx-auto mb-6 text-gray-600" />
                <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-gray-400 mb-8">Add some products to get started</p>
                <Link href="/products" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition">
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-6"
                    >
                      <Link href={`/products/${item.id}`} className="w-full sm:w-32 aspect-square flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </Link>
                      <div className="flex-1">
                        <Link href={`/products/${item.id}`} className="hover:text-blue-400 transition">
                          <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                        </Link>
                        <p className="text-gray-400 mb-4">{item.category}</p>
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
                                }
                              }}
                              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-xl font-semibold w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => {
                                dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
                              }}
                              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => dispatch(toggleWishlist(item))}
                              className={`p-2 rounded-full border-2 transition ${
                                isWishlisted(item.id)
                                  ? "border-red-500 text-red-500"
                                  : "border-white/20 hover:border-white/40"
                              }`}
                            >
                              <Heart className={`h-5 w-5 ${isWishlisted(item.id) ? "fill-current" : ""}`} />
                            </button>
                            <button
                              onClick={() => dispatch(removeFromCart(item.id))}
                              className="p-2 rounded-full border-2 border-red-500/30 text-red-400 hover:border-red-500/50 transition"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-2xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        {item.originalPrice && (
                          <p className="text-gray-500 line-through">
                            ${(item.originalPrice * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-fit">
                  <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="border-t border-white/10 pt-4 mt-4">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-white text-black py-4 rounded-full font-semibold hover:bg-gray-200 transition">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
