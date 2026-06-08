"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMobileMenu, closeMobileMenu } from "@/store/slices/uiSlice";
import { ShoppingBag, Menu, X, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { isMobileMenuOpen } = useAppSelector((state) => state.ui);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            FlowCart
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`${pathname === "/" ? "text-white" : "text-gray-300"} hover:text-white transition`}>
              Home
            </Link>
            <Link href="/products" className={`${pathname.startsWith("/products") ? "text-white" : "text-gray-300"} hover:text-white transition`}>
              Products
            </Link>
            <Link href="/categories" className={`${pathname.startsWith("/categories") ? "text-white" : "text-gray-300"} hover:text-white transition`}>
              Categories
            </Link>
            <Link href="/faq" className={`${pathname === "/faq" ? "text-white" : "text-gray-300"} hover:text-white transition`}>
              FAQ
            </Link>
            <Link href="/dashboard" className={`${pathname.startsWith("/dashboard") ? "text-white" : "text-gray-300"} hover:text-white transition`}>
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/wishlist" className="relative hover:opacity-80 transition">
              <Heart className="h-6 w-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative hover:opacity-80 transition">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => dispatch(toggleMobileMenu())} className="md:hidden">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" onClick={() => dispatch(closeMobileMenu())} className="block text-gray-300 hover:text-white">
              Home
            </Link>
            <Link href="/products" onClick={() => dispatch(closeMobileMenu())} className="block text-gray-300 hover:text-white">
              Products
            </Link>
            <Link href="/categories" onClick={() => dispatch(closeMobileMenu())} className="block text-gray-300 hover:text-white">
              Categories
            </Link>
            <Link href="/faq" onClick={() => dispatch(closeMobileMenu())} className="block text-gray-300 hover:text-white">
              FAQ
            </Link>
            <Link href="/wishlist" onClick={() => dispatch(closeMobileMenu())} className="block text-gray-300 hover:text-white">
              Wishlist
            </Link>
            <Link href="/cart" onClick={() => dispatch(closeMobileMenu())} className="block text-gray-300 hover:text-white">
              Cart
            </Link>
            <Link href="/dashboard" onClick={() => dispatch(closeMobileMenu())} className="block text-gray-300 hover:text-white">
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
