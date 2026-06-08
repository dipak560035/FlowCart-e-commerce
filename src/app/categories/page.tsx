

"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

async function fetchCategories() {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

// Category thumbnails - larger images for better quality
const categoryThumbnails = {
  electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop",
  audio: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
  wearables: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=600&fit=crop",
  smartphones: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=600&fit=crop",
  gaming: "https://images.unsplash.com/photo-1592155931584-901ac15763e3?w=800&h=600&fit=crop",
  accessories: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop",
  default: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop"
};

export default function CategoriesPage() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!categories) return;

    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
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

    // Cards animation
    gsap.fromTo(
      cardsRef.current,
      { 
        y: 30, 
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, [categories]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
        <Navbar />
        <main className="pt-28 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="h-10 w-56 bg-white/10 rounded-lg mx-auto mb-3 animate-pulse" />
              <div className="h-5 w-80 bg-white/10 rounded-lg mx-auto animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-800/50 animate-pulse" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show only first 6 categories
  const displayCategories = categories?.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          {/* <div className="text-center mb-12">
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold mb-3"
            >
              Shop by{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Category
              </span>
            </h1>
            <p className="text-gray-400 text-base">
              Explore our premium collections
            </p>
          </div> */}
             <div className="text-center mb-16">
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5"
            >
              Browse All{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Categories
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore our complete collection of premium categories
            </p>
          </div>

          {/* Categories Grid - 3 columns, 2 rows with larger boxes */}
          <section ref={sectionRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {displayCategories?.map((category, index) => {
                const thumbnailKey = category.slug as keyof typeof categoryThumbnails;
                const thumbnailUrl = categoryThumbnails[thumbnailKey] || categoryThumbnails.default;
                
                return (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    ref={(el) => { cardsRef.current[index] = el; }}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl shadow-black/40">
                      {/* Background Image */}
                      <Image
                        src={thumbnailUrl}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 3}
                      />

                      {/* Gradient Overlay - Stronger for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                      {/* Content - Larger padding for better spacing */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        {/* Category Name - Larger text */}
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                          {category.name}
                        </h2>
                        
                        {/* Decorative Line - Thicker and longer */}
                        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300 group-hover:w-24" />
                        
                        {/* Shop Link - Appears on Hover */}
                        <div className="mt-4 opacity-0 transform translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                          <span className="text-sm text-blue-400 flex items-center gap-2 font-medium">
                            Explore Collection
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* View More Button - Larger */}
          <div className="text-center mt-12">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <span>View All Categories</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Stats Section - Larger numbers */}
          {displayCategories && displayCategories.length > 0 && (
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{displayCategories.length}+</div>
                  <div className="text-sm text-gray-500">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">2,500+</div>
                  <div className="text-sm text-gray-500">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-sm text-gray-500">Brands</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-gray-500">Support</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

















// "use client";

// import { useEffect, useRef } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Category } from "@/types";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import Link from "next/link";
// import Image from "next/image";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// async function fetchCategories() {
//   const res = await fetch("/api/categories");
//   if (!res.ok) throw new Error("Failed to fetch categories");
//   return res.json();
// }

// // Category thumbnails matching hero page style
// const categoryThumbnails = {
//   electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=1000&fit=crop",
//   audio: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=1000&fit=crop",
//   wearables: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=1000&fit=crop",
//   smartphones: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=1000&fit=crop",
//   gaming: "https://images.unsplash.com/photo-1592155931584-901ac15763e3?w=800&h=1000&fit=crop",
//   accessories: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=1000&fit=crop",
//   cameras: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=1000&fit=crop",
//   laptops: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=1000&fit=crop",
//   default: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=1000&fit=crop"
// };

// export default function CategoriesPage() {
//   const { data: categories, isLoading } = useQuery<Category[]>({
//     queryKey: ["categories"],
//     queryFn: fetchCategories,
//   });

//   const sectionRef = useRef<HTMLDivElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

//   useEffect(() => {
//     if (!categories) return;

//     gsap.registerPlugin(ScrollTrigger);

//     // Title animation
//     gsap.fromTo(titleRef.current,
//       { y: 40, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 85%",
//         },
//       }
//     );

//     // Cards animation
//     gsap.fromTo(
//       cardsRef.current,
//       { 
//         y: 50, 
//         opacity: 0,
//         scale: 0.95
//       },
//       {
//         y: 0,
//         opacity: 1,
//         scale: 1,
//         duration: 0.8,
//         stagger: 0.1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 80%",
//         },
//       }
//     );
//   }, [categories]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
//         <Navbar />
//         <main className="pt-32 pb-20">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-12">
//               <div className="h-12 w-64 bg-white/10 rounded-lg mx-auto mb-4 animate-pulse" />
//               <div className="h-6 w-96 bg-white/10 rounded-lg mx-auto animate-pulse" />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//               {Array(6).fill(0).map((_, i) => (
//                 <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-800/50 animate-pulse" />
//               ))}
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
//       <Navbar />
//       <main className="pt-32 pb-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header Section */}
//           <div className="text-center mb-16">
//             <h1 
//               ref={titleRef}
//               className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
//             >
//               Browse All{" "}
//               <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Categories
//               </span>
//             </h1>
//             <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//               Explore our complete collection of premium categories
//             </p>
//           </div>

//           {/* Categories Grid */}
//           <section ref={sectionRef}>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//               {categories?.map((category, index) => {
//                 const thumbnailKey = category.slug as keyof typeof categoryThumbnails;
//                 const thumbnailUrl = categoryThumbnails[thumbnailKey] || categoryThumbnails.default;
                
//                 return (
//                   <Link
//                     key={category.id}
//                     href={`/categories/${category.slug}`}
//                     ref={(el) => { cardsRef.current[index] = el; }}
//                     className="group block"
//                   >
//                     <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
//                       {/* Background Image */}
//                       <Image
//                         src={thumbnailUrl}
//                         alt={category.name}
//                         fill
//                         className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
//                         sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                         priority={index < 3}
//                       />

//                       {/* Gradient Overlay */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

//                       {/* Content */}
//                       <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
//                         {/* Category Name */}
//                         <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                           {category.name}
//                         </h2>
                        
//                         {/* Decorative Line */}
//                         <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500 group-hover:w-24 mb-3" />
                        
//                         {/* Description */}
//                         {category.description && (
//                           <p className="text-gray-300 text-sm md:text-base mb-4 line-clamp-2">
//                             {category.description}
//                           </p>
//                         )}
                        
//                         {/* Shop Link */}
//                         <div className="opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
//                           <span className="text-sm md:text-base text-blue-400 flex items-center gap-2 font-medium">
//                             Explore Collection
//                             <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                             </svg>
//                           </span>
//                         </div>
//                       </div>

//                       {/* Product Count Badge */}
//                       <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-300">
//                         {Math.floor(Math.random() * 200) + 50}+ Products
//                       </div>

//                       {/* Glow Effect on Hover */}
//                       <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 transition-all duration-500 group-hover:ring-blue-500/30 group-hover:shadow-2xl group-hover:shadow-blue-500/10" />
//                     </div>
//                   </Link>
//                 );
//               })}
//             </div>
//           </section>

//           {/* Stats Section */}
//           {categories && categories.length > 0 && (
//             <div className="mt-20 pt-12 border-t border-white/10">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-white mb-1">{categories.length}+</div>
//                   <div className="text-sm text-gray-500">Categories</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-white mb-1">2,500+</div>
//                   <div className="text-sm text-gray-500">Products</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-white mb-1">500+</div>
//                   <div className="text-sm text-gray-500">Brands</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-white mb-1">24/7</div>
//                   <div className="text-sm text-gray-500">Support</div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }