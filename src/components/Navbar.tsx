// "use client";

// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { toggleMobileMenu, closeMobileMenu } from "@/store/slices/uiSlice";
// import { ShoppingBag, Menu, X, Heart } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export function Navbar() {
//   const dispatch = useAppDispatch();
//   const pathname = usePathname();
//   const { items: cartItems } = useAppSelector((state) => state.cart);
//   const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
//   const { isMobileMenuOpen } = useAppSelector((state) => state.ui);

//   const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <Link href="/" className="text-2xl font-bold tracking-tighter">
//             FlowCart
//           </Link>

//           <div className="hidden md:flex items-center space-x-8">
//             <Link href="/" className={`${pathname === "/" ? "text-white" : "text-gray-300"} hover:text-white transition`}>
//               Home
//             </Link>
//             <Link href="/products" className={`${pathname.startsWith("/products") ? "text-white" : "text-gray-300"} hover:text-white transition`}>
//               Products
//             </Link>
//             <Link href="/categories" className={`${pathname.startsWith("/categories") ? "text-white" : "text-gray-300"} hover:text-white transition`}>
//               Categories
//             </Link>
//             <Link href="/faq" className={`${pathname === "/faq" ? "text-white" : "text-gray-300"} hover:text-white transition`}>
//               FAQ
//             </Link>
//             <Link href="/dashboard" className={`${pathname.startsWith("/dashboard") ? "text-white" : "text-gray-300"} hover:text-white transition`}>
//               Dashboard
//             </Link>
//           </div>

//           <div className="flex items-center space-x-4">
//             <Link href="/wishlist" className="relative hover:opacity-80 transition">
//               <Heart className="h-6 w-6" />
//               {wishlistItems.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {wishlistItems.length}
//                 </span>
//               )}
//             </Link>
//             <Link href="/cart" className="relative hover:opacity-80 transition">
//               <ShoppingBag className="h-6 w-6" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-blue-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
//             <button onClick={() => dispatch(toggleMobileMenu())} className="md:hidden">
//               {isMobileMenuOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-black border-t border-white/10">
//           <div className="px-4 py-4 space-y-3">
//             <Link href="/" onClick={() => dispatch(closeMobileMenu())} className="block text-gray-300 hover:text-white">
//               Home
//             </Link>
//             <Link href="/products" onClick={() => dispatch(closeMobileMenu())} className="block text-gray-300 hover:text-white">
//               Products
//             </Link>
//             <Link href="/categories" onClick={() => dispatch(closeMobileMenu())} className="block text-gray-300 hover:text-white">
//               Categories
//             </Link>
//             <Link href="/faq" onClick={() => dispatch(closeMobileMenu())} className="block text-gray-300 hover:text-white">
//               FAQ
//             </Link>
//             <Link href="/wishlist" onClick={() => dispatch(closeMobileMenu())} className="block text-gray-300 hover:text-white">
//               Wishlist
//             </Link>
//             <Link href="/cart" onClick={() => dispatch(closeMobileMenu())} className="block text-gray-300 hover:text-white">
//               Cart
//             </Link>
//             <Link href="/dashboard" onClick={() => dispatch(closeMobileMenu())} className="block text-gray-300 hover:text-white">
//               Dashboard
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

















"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMobileMenu, closeMobileMenu } from "@/store/slices/uiSlice";
import { ShoppingBag, Menu, X, Heart, Search, User, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export function Navbar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navRef = useRef<HTMLElement>(null);
  
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { isMobileMenuOpen } = useAppSelector((state) => state.ui);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate cart badge
  useEffect(() => {
    if (cartCount > 0) {
      const badge = document.querySelector(".cart-badge");
      if (badge) {
        gsap.fromTo(badge,
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.2)" }
        );
      }
    }
  }, [cartCount]);

  const navLinks = [
    { href: "/", label: "Home", match: "exact" },
    { href: "/products", label: "Products", match: "start" },
    { href: "/categories", label: "Categories", match: "start" },
    { href: "/about", label: "About", match: "start" },
    { href: "/faq", label: "FAQ", match: "exact" },
  ];

  const isActive = (href: string, match: string) => {
    if (match === "exact") return pathname === href;
    return pathname.startsWith(href);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-black/80 backdrop-blur-md border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="group relative flex items-center gap-2"
            >
              <div className="relative">
                <Sparkles className="w-6 h-6 text-blue-400 absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-2xl lg:text-3xl font-bold tracking-tighter bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                  FlowCart
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 lg:px-4 py-2 rounded-full text-sm lg:text-base font-medium transition-all duration-300 ${
                    isActive(link.href, link.match)
                      ? "text-white bg-white/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {isActive(link.href, link.match) && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-1 lg:gap-2">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </button>

              {/* User Account */}
              <Link
                href="/dashboard"
                className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
                aria-label="Account"
              >
                <User className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg animate-pulse">
                    {wishlistItems.length > 9 ? "9+" : wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                {cartCount > 0 && (
                  <span className="cart-badge absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-600 text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => dispatch(toggleMobileMenu())}
                className="md:hidden relative p-2 rounded-full hover:bg-white/10 transition-all duration-300"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Animated Underline for Desktop */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </nav>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative w-full max-w-2xl animate-fade-in-up">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-6 py-4 pr-12 bg-gray-900/90 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-400">
              Press ESC to close
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden animate-slide-in-right">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            onClick={() => dispatch(closeMobileMenu())}
          />
          <div className="relative flex flex-col h-full overflow-y-auto">
            <div className="px-6 py-8 space-y-2">
              {/* User Section */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <Link
                  href="/dashboard"
                  onClick={() => dispatch(closeMobileMenu())}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">My Account</div>
                    <div className="text-sm text-gray-500">View profile and orders</div>
                  </div>
                </Link>
              </div>

              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => dispatch(closeMobileMenu())}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    isActive(link.href, link.match)
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Divider */}
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Quick Actions */}
              <Link
                href="/wishlist"
                onClick={() => dispatch(closeMobileMenu())}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <span>Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="bg-red-500 text-xs font-bold rounded-full px-2 py-1">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                onClick={() => dispatch(closeMobileMenu())}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <span>Shopping Cart</span>
                {cartCount > 0 && (
                  <span className="bg-blue-500 text-xs font-bold rounded-full px-2 py-1">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/orders"
                onClick={() => dispatch(closeMobileMenu())}
                className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                My Orders
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}