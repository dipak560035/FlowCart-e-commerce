// "use client";

// import { useEffect, useRef } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Category } from "@/types";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Link from "next/link";

// async function fetchCategories() {
//   const res = await fetch("/api/categories");
//   if (!res.ok) throw new Error("Failed to fetch categories");
//   return res.json();
// }

// export function Categories() {
//   const { data: categories, isLoading } = useQuery<Category[]>({
//     queryKey: ["categories"],
//     queryFn: fetchCategories,
//   });

//   const sectionRef = useRef<HTMLDivElement>(null);
//   const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

//   useEffect(() => {
//     if (!categories) return;

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
//   }, [categories]);

//   if (isLoading) {
//     return (
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
//             Shop by Category
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {Array(6).fill(0).map((_, i) => (
//               <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 animate-pulse">
//                 <div className="text-5xl mb-4 text-transparent">🎧</div>
//                 <div className="h-6 bg-white/10 rounded max-w-24 mx-auto" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section ref={sectionRef} className="py-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
//           <p className="text-gray-400 max-w-2xl mx-auto">
//             Discover our curated collection of premium lifestyle tech products
//           </p>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//           {categories?.map((category, index) => (
//             <Link
//               key={category.id}
//               href={`/categories/${category.slug}`}
//               ref={(el) => { cardsRef.current[index] = el; }}
//               className="group"
//             >
//               <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition transform hover:scale-105">
//                 <div className="text-5xl mb-4">{category.icon}</div>
//                 <h3 className="text-lg font-semibold">{category.name}</h3>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }







// "use client";

// import { useEffect, useRef } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Category } from "@/types";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Link from "next/link";
// import Image from "next/image";

// async function fetchCategories() {
//   const res = await fetch("/api/categories");
//   if (!res.ok) throw new Error("Failed to fetch categories");
//   return res.json();
// }

// // Stunning category thumbnails
// const categoryThumbnails = {
//   electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=1000&fit=crop",
//   audio: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=1000&fit=crop",
//   wearables: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=1000&fit=crop",
//   smartphones: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=1000&fit=crop",
//   gaming: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&h=1000&fit=crop",
//   accessories: "https://images.unsplash.com/photo-1506953829328-11c3f0bdcf5e?w=800&h=1000&fit=crop",
//   cameras: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=1000&fit=crop",
//   laptops: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=1000&fit=crop",
//   default: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=1000&fit=crop"
// };

// export function Categories() {
//   const { data: categories, isLoading } = useQuery<Category[]>({
//     queryKey: ["categories"],
//     queryFn: fetchCategories,
//   });

//   const sectionRef = useRef<HTMLElement>(null);
//   const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

//   useEffect(() => {
//     if (!categories) return;

//     gsap.registerPlugin(ScrollTrigger);

//     gsap.fromTo(
//       cardsRef.current,
//       { 
//         y: 70, 
//         opacity: 0,
//         scale: 0.95
//       },
//       {
//         y: 0,
//         opacity: 1,
//         scale: 1,
//         duration: 0.9,
//         stagger: 0.1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 80%",
//           toggleActions: "play none none reverse",
//         },
//       }
//     );
//   }, [categories]);

//   if (isLoading) {
//     return (
//       <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {Array(8).fill(0).map((_, i) => (
//               <div key={i} className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-800/50 animate-pulse" />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // Calculate remaining spots for "View All" cards
//   const categoriesCount = categories?.length || 0;
//   const cardsPerRow = 4; // Desktop shows 4 cards per row
//   const remainingSpots = cardsPerRow - (categoriesCount % cardsPerRow);
//   const showViewAllCards = remainingSpots > 0 && remainingSpots !== cardsPerRow;

//   return (
//     <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-gray-950 to-black">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
//             Shop by{" "}
//             <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Category
//             </span>
//           </h2>
//           <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//             Explore our curated collections of premium products
//           </p>
//         </div>

//         {/* Categories Grid - Perfect Grid Layout */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
//           {/* Render all categories */}
//           {categories?.map((category, index) => {
//             const thumbnailKey = category.slug as keyof typeof categoryThumbnails;
//             const thumbnailUrl = categoryThumbnails[thumbnailKey] || categoryThumbnails.default;
            
//             return (
//               <Link
//                 key={category.id}
//                 href={`/categories/${category.slug}`}
//                 ref={(el) => { cardsRef.current[index] = el; }}
//                 className="group relative block"
//               >
//                 <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
//                   {/* Background Image */}
//                   <Image
//                     src={thumbnailUrl}
//                     alt={category.name}
//                     fill
//                     className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
//                     sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
//                     priority={index < 4}
//                   />

//                   {/* Overlay Gradient */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-6 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
//                     <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
//                       {category.name}
//                     </h3>
//                     <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500 group-hover:w-20" />
//                     <div className="mt-4 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
//                       <span className="text-sm text-gray-300 flex items-center gap-2">
//                         Explore Collection
//                         <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </span>
//                     </div>
//                   </div>

//                   {/* Glow Effect */}
//                   <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 transition-all duration-500 group-hover:ring-blue-500/50 group-hover:shadow-2xl group-hover:shadow-blue-500/20" />
//                 </div>
//               </Link>
//             );
//           })}

//           {/* Fill remaining spots with "View All Categories" cards */}
//           {showViewAllCards && Array(remainingSpots).fill(0).map((_, index) => (
//             <Link
//               key={`view-all-${index}`}
//               href="/categories"
//               className="group relative block"
//             >
//               <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10">
//                 {/* Animated Background */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
//                 {/* Content Center */}
//                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
//                   {/* Icon */}
//                   <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
//                     <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                     </svg>
//                   </div>
                  
//                   <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
//                     View All
//                   </h3>
                  
//                   <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4 transition-all duration-500 group-hover:w-20" />
                  
//                   <p className="text-gray-400 text-sm mb-4">
//                     {categoriesCount}+ Categories
//                   </p>
                  
//                   <div className="opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
//                     <span className="text-sm text-blue-400 flex items-center gap-2">
//                       Browse All
//                       <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                       </svg>
//                     </span>
//                   </div>
//                 </div>

//                 {/* Glow Effect */}
//                 <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 transition-all duration-500 group-hover:ring-blue-500/30" />
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Alternative: Show "View All" Button at Bottom if needed */}
//         {!showViewAllCards && categoriesCount > 4 && (
//           <div className="text-center mt-16">
//             <Link
//               href="/categories"
//               className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 group"
//             >
//               <span>View All {categoriesCount} Categories</span>
//               <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }














// "use client";

// import { useEffect, useRef } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Category } from "@/types";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Link from "next/link";
// import Image from "next/image";

// async function fetchCategories() {
//   const res = await fetch("/api/categories");
//   if (!res.ok) throw new Error("Failed to fetch categories");
//   return res.json();
// }

// // Stunning category thumbnails
// const categoryThumbnails = {
//   electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=1000&fit=crop",
//   audio: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=1000&fit=crop",
//   wearables: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=1000&fit=crop",
//   smartphones: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=1000&fit=crop",
//   gaming: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&h=1000&fit=crop",
//   accessories: "https://images.unsplash.com/photo-1506953829328-11c3f0bdcf5e?w=800&h=1000&fit=crop",
//   cameras: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=1000&fit=crop",
//   laptops: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=1000&fit=crop",
//   default: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=1000&fit=crop"
// };

// export function Categories() {
//   const { data: categories, isLoading } = useQuery<Category[]>({
//     queryKey: ["categories"],
//     queryFn: fetchCategories,
//   });

//   const sectionRef = useRef<HTMLElement>(null);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

//   useEffect(() => {
//     if (!categories) return;

//     gsap.registerPlugin(ScrollTrigger);

//     gsap.fromTo(
//       cardsRef.current,
//       { 
//         x: 50, 
//         opacity: 0,
//       },
//       {
//         x: 0,
//         opacity: 1,
//         duration: 0.8,
//         stagger: 0.1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 80%",
//           toggleActions: "play none none reverse",
//         },
//       }
//     );
//   }, [categories]);

//   if (isLoading) {
//     return (
//       <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
//             {Array(6).fill(0).map((_, i) => (
//               <div key={i} className="relative w-72 flex-shrink-0 aspect-[4/5] rounded-2xl overflow-hidden bg-gray-800/50 animate-pulse" />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-gray-950 to-black overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
//             Shop by{" "}
//             <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Category
//             </span>
//           </h2>
//           <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//             Explore our curated collections of premium products
//           </p>
//         </div>
//       </div>

//       {/* Horizontal Scroll Container */}
//       <div className="relative">
//         {/* Gradient Fades for Scroll Indication */}
//         <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
//         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />
        
//         {/* Scrollable Categories */}
//         <div 
//           ref={scrollContainerRef}
//           className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth pb-8 px-4 sm:px-6 lg:px-8"
//           style={{
//             scrollbarWidth: 'thin',
//             scrollbarColor: 'rgba(59, 130, 246, 0.5) rgba(255, 255, 255, 0.1)',
//           }}
//         >
//           {categories?.map((category, index) => {
//             const thumbnailKey = category.slug as keyof typeof categoryThumbnails;
//             const thumbnailUrl = categoryThumbnails[thumbnailKey] || categoryThumbnails.default;
            
//             return (
//               <Link
//                 key={category.id}
//                 href={`/categories/${category.slug}`}
//                 ref={(el) => { cardsRef.current[index] = el; }}
//                 className="group relative block w-72 md:w-80 flex-shrink-0"
//               >
//                 <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
//                   {/* Background Image */}
//                   <Image
//                     src={thumbnailUrl}
//                     alt={category.name}
//                     fill
//                     className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
//                     sizes="(max-width: 768px) 288px, 320px"
//                     priority={index < 3}
//                   />

//                   {/* Overlay Gradient */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

//                   {/* Content */}
//                   <div className="absolute inset-x-0 bottom-0 p-6 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
//                     <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
//                       {category.name}
//                     </h3>
                    
//                     {/* Decorative Line */}
//                     <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500 group-hover:w-20" />
                    
//                     {/* Shop Link */}
//                     <div className="mt-4 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
//                       <span className="text-sm text-gray-300 flex items-center gap-2">
//                         Explore Collection
//                         <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </span>
//                     </div>
//                   </div>

//                   {/* Glow Effect */}
//                   <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 transition-all duration-500 group-hover:ring-blue-500/50 group-hover:shadow-2xl group-hover:shadow-blue-500/20" />
//                 </div>
//               </Link>
//             );
//           })}

//           {/* View All Categories Card */}
//           <Link
//             href="/categories"
//             className="group relative block w-72 md:w-80 flex-shrink-0"
//           >
//             <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10">
//               {/* Animated Background */}
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
//               {/* Glowing Animation */}
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
//               </div>
              
//               {/* Content Center */}
//               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
//                 {/* Icon Circle */}
//                 <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
//                   <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                   </svg>
//                 </div>
                
//                 <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
//                   View All
//                 </h3>
                
//                 <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4 transition-all duration-500 group-hover:w-20" />
                
//                 <p className="text-gray-400 text-sm mb-4">
//                   {categories?.length}+ Categories
//                 </p>
                
//                 <div className="opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
//                   <span className="text-sm text-blue-400 flex items-center gap-2">
//                     Browse All
//                     <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                     </svg>
//                   </span>
//                 </div>
//               </div>

//               {/* Glow Effect */}
//               <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 transition-all duration-500 group-hover:ring-blue-500/30" />
//             </div>
//           </Link>
//         </div>

//         {/* Scroll Indicators */}
//         <div className="flex justify-center gap-2 mt-6">
//           <button 
//             onClick={() => {
//               if (scrollContainerRef.current) {
//                 scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
//               }
//             }}
//             className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center group"
//           >
//             <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <button 
//             onClick={() => {
//               if (scrollContainerRef.current) {
//                 scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
//               }
//             }}
//             className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center group"
//           >
//             <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         /* Custom scrollbar styling */
//         .overflow-x-auto::-webkit-scrollbar {
//           height: 4px;
//         }
        
//         .overflow-x-auto::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 10px;
//         }
        
//         .overflow-x-auto::-webkit-scrollbar-thumb {
//           background: rgba(59, 130, 246, 0.5);
//           border-radius: 10px;
//         }
        
//         .overflow-x-auto::-webkit-scrollbar-thumb:hover {
//           background: rgba(59, 130, 246, 0.7);
//         }
        
//         /* Hide scrollbar on mobile but keep functionality */
//         @media (max-width: 768px) {
//           .overflow-x-auto {
//             scrollbar-width: none;
//           }
//           .overflow-x-auto::-webkit-scrollbar {
//             display: none;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }




















"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

async function fetchCategories() {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

// Category thumbnails
const categoryThumbnails = {
  electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=800&fit=crop",
  audio: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
  wearables: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop",
  smartphones: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=800&fit=crop",
  gaming: "https://images.unsplash.com/photo-1592155931584-901ac15763e3?w=800&h=800&fit=crop",
  accessories: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=800&fit=crop",
  default: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=800&fit=crop"
};

export function Categories() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!categories) return;

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

    // Cards animation
    gsap.fromTo(
      cardsRef.current,
      { 
        y: 40, 
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, [categories]);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 w-56 bg-white/10 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-800/50 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show only first 4 categories
  const displayCategories = categories?.slice(0, 4);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Shop by{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our curated collection of premium products
          </p>
        </div>

        {/* Categories Grid - Large Prominent Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                  {/* Image */}
                  <Image
                    src={thumbnailUrl}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={index < 2}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                    {/* Category Name */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    
                    {/* Decorative Line */}
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500 group-hover:w-24" />
                    
                    {/* Shop Link - Appears on Hover */}
                    <div className="mt-4 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <span className="text-sm text-gray-300 flex items-center gap-2">
                        Explore Collection
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 transition-all duration-500 group-hover:ring-blue-500/50 group-hover:shadow-2xl group-hover:shadow-blue-500/20" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
          >
            <span>View All Categories</span>
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