

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Twitter, 
  Instagram, 
  Facebook, 
  Github, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  ShoppingBag,
  Heart,
  Sparkles
} from "lucide-react";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 80;
      const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <footer className="relative bg-gradient-to-b from-gray-950 to-black border-t border-white/10">
        {/* Gradient Top Border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  FlowCart
                </h3>
              </div>
            
              <div className="flex gap-3">
            
                  <Twitter className="w-4 h-4 text-gray-400 hover:text-white transition" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-gray-400 hover:text-white transition" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-gray-400 hover:text-white transition" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  aria-label="Youtube"
                >
                  <Youtube className="w-4 h-4 text-gray-400 hover:text-white transition" />
                </a>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-lg">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    All Products
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection("products")}
                    className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    New Arrivals
                  </button>
                </li>
                <li>
                  <Link href="/categories" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/products?sort=popular" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Best Sellers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-lg">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Returns
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-lg">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info Section */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-lg">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>support@flowcart.com</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>+977-9805104098</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Kathmandu, Nepal</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
              <div className="flex gap-6 text-sm">
                <Link href="/privacy" className="text-gray-500 hover:text-white transition text-xs">
                  Privacy
                </Link>
                <Link href="/terms" className="text-gray-500 hover:text-white transition text-xs">
                  Terms
                </Link>
                <Link href="/sitemap" className="text-gray-500 hover:text-white transition text-xs">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
}









































// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { 
//   Twitter, 
//   Instagram, 
//   Facebook, 
//   Github, 
//   Youtube,
//   Mail,
//   Phone,
//   MapPin,
//   ArrowUp,
//   ShoppingBag,
//   Heart,
//   Sparkles
// } from "lucide-react";

// export function Footer() {
//   const [showScrollTop, setShowScrollTop] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 500);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const scrollToSection = (sectionId: string) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       const navbarHeight = 80;
//       const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
//       window.scrollTo({
//         top: elementPosition - navbarHeight,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <>
//       <footer className="relative bg-gradient-to-b from-gray-950 to-black border-t border-white/10">
//         {/* Gradient Top Border */}
//         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
//           {/* Main Footer Content */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
//             {/* Brand Section */}
//             <div className="lg:col-span-1">
//               <div className="flex items-center gap-2 mb-4">
//                 <Sparkles className="w-6 h-6 text-blue-400" />
//                 <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//                   FlowCart
//                 </h3>
//               </div>
//               <p className="text-gray-400 text-sm mb-4 leading-relaxed">
//                 Premium lifestyle tech brand dedicated to bringing you the best products that enhance your everyday life.
//               </p>
//               <div className="flex gap-3">
//                 <a
//                   href="https://twitter.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
//                   aria-label="Twitter"
//                 >
//                   <Twitter className="w-4 h-4 text-gray-400 hover:text-white transition" />
//                 </a>
//                 <a
//                   href="https://instagram.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
//                   aria-label="Instagram"
//                 >
//                   <Instagram className="w-4 h-4 text-gray-400 hover:text-white transition" />
//                 </a>
//                 <a
//                   href="https://facebook.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
//                   aria-label="Facebook"
//                 >
//                   <Facebook className="w-4 h-4 text-gray-400 hover:text-white transition" />
//                 </a>
//                 <a
//                   href="https://youtube.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
//                   aria-label="Youtube"
//                 >
//                   <Youtube className="w-4 h-4 text-gray-400 hover:text-white transition" />
//                 </a>
//               </div>
//             </div>

//             {/* Quick Links Section */}
//             <div>
//               <h4 className="font-semibold text-white mb-4 text-lg">Shop</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="/products" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
//                     <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
//                     All Products
//                   </Link>
//                 </li>
//                 <li>
//                   <button 
//                     onClick={() => scrollToSection("products")}
//                     className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group"
//                   >
//                     <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
//                     New Arrivals
//                   </button>
//                 </li>
//                 <li>
//                   <Link href="/categories" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
//                     <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
//                     Categories
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/products?sort=popular" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
//                     <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
//                     Best Sellers
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Support Section */}
//             <div>
//               <h4 className="font-semibold text-white mb-4 text-lg">Support</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="/faq" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
//                     <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
//                     FAQ
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
//                     <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
//                     Contact
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/shipping" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
//                     <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
//                     Shipping Info
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/returns" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
//                     <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
//                     Returns
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Company Section */}
//             <div>
//               <h4 className="font-semibold text-white mb-4 text-lg">Company</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="/about" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
//                     <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/careers" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
//                     <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
//                     Careers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
//                     <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition duration-300 text-sm flex items-center gap-2 group">
//                     <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300" />
//                     Terms of Service
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Contact Info Section */}
//             <div>
//               <h4 className="font-semibold text-white mb-4 text-lg">Contact</h4>
//               <ul className="space-y-3">
//                 <li className="flex items-center gap-3 text-gray-400 text-sm">
//                   <Mail className="w-4 h-4 text-blue-400" />
//                   <span>support@flowcart.com</span>
//                 </li>
//                 <li className="flex items-center gap-3 text-gray-400 text-sm">
//                   <Phone className="w-4 h-4 text-blue-400" />
//                   <span>+977-9805104098</span>
//                 </li>
//                 <li className="flex items-center gap-3 text-gray-400 text-sm">
//                   <MapPin className="w-4 h-4 text-blue-400" />
//                   <span>Kathmandu, Nepal</span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Bottom Bar */}
//           <div className="border-t border-white/10 pt-8">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//               <p className="text-gray-500 text-sm">
//                 © 2026 FlowCart. All rights reserved.
//               </p>
//               <div className="flex gap-6 text-sm">
//                 <Link href="/privacy" className="text-gray-500 hover:text-white transition text-xs">
//                   Privacy
//                 </Link>
//                 <Link href="/terms" className="text-gray-500 hover:text-white transition text-xs">
//                   Terms
//                 </Link>
//                 <Link href="/sitemap" className="text-gray-500 hover:text-white transition text-xs">
//                   Sitemap
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Scroll to Top Button */}
//       <button
//         onClick={scrollToTop}
//         className={`fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
//           showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
//         }`}
//         aria-label="Scroll to top"
//       >
//         <ArrowUp className="w-5 h-5" />
//       </button>
//     </>
//   );
// }
