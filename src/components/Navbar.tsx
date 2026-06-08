"use client";

import { useStore } from "@/store";
import { ShoppingBag, Menu, X, Heart } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const { cart, wishlist, toggleMobileMenu, isMobileMenuOpen } = useStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            FlowCart
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition">
              Home
            </Link>
            <Link href="/#products" className="text-gray-300 hover:text-white transition">
              Products
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative">
              <Heart className="h-6 w-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button className="relative">
              <ShoppingBag className="h-6 w-6" />
              {cart.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
            <button onClick={toggleMobileMenu} className="md:hidden">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block text-gray-300 hover:text-white">
              Home
            </Link>
            <Link href="/#products" className="block text-gray-300 hover:text-white">
              Products
            </Link>
            <Link href="/dashboard" className="block text-gray-300 hover:text-white">
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
