// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { Product } from "@/types";
// import { ProductCard } from "./ProductCard";
// import { ProductSkeleton } from "./ProductSkeleton";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// async function fetchProducts() {
//   const res = await fetch("/api/products");
//   if (!res.ok) throw new Error("Failed to fetch products");
//   return res.json();
// }

// export function FeaturedProducts() {
//   const { data: products, isLoading } = useQuery<Product[]>({
//     queryKey: ["products"],
//     queryFn: fetchProducts,
//   });

//   const sectionRef = useRef<HTMLDivElement>(null);
//   const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     if (!products) return;

//     gsap.registerPlugin(ScrollTrigger);

//     gsap.fromTo(
//       cardsRef.current,
//       { y: 50, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 0.8,
//         stagger: 0.1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 80%",
//         },
//       }
//     );
//   }, [products]);

//   return (
//     <section id="products" ref={sectionRef} className="py-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
//           <p className="text-gray-400 max-w-2xl mx-auto">
//             Discover our curated collection of premium lifestyle tech products
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {isLoading ? (
//             Array(6)
//               .fill(0)
//               .map((_, i) => <ProductSkeleton key={i} />)
//           ) : products ? (
//             products.map((product, index) => (
//               <div
//                 key={product.id}
//                 ref={(el) => { cardsRef.current[index] = el; }}
//               >
//                 <ProductCard product={product} />
//               </div>
//             ))
//           ) : null}
//         </div>
//       </div>
//     </section>
//   );
// }















"use client";

import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { ProductSkeleton } from "./ProductSkeleton";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

async function fetchProducts() {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export function FeaturedProducts() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!products) return;

    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );

    // Subtitle animation
    gsap.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );

    // Cards animation with stagger
    gsap.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [products]);

  // Show only first 8 products (2 rows of 4)
  const displayProducts = products?.slice(0, 8);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 w-56 bg-white/10 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-5 w-96 bg-white/10 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Matching Categories style */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6">
            <span className="text-sm text-gray-300">✨ Premium Selection</span>
          </div>
          
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          
          <p 
            ref={subtitleRef}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Discover our curated collection of premium lifestyle tech products, 
            carefully selected for quality and innovation
          </p>
        </div>

        {/* Products Grid - 4 columns, 2 rows (8 products) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayProducts?.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => { cardsRef.current[index] = el; }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Products Button - Matching hero page style */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
          >
            <span>View All Products</span>
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}










