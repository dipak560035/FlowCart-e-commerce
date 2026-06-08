// "use client";

// import { useEffect, useRef, useState, Suspense } from "react";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import { Product, Category } from "@/types";
// import { ProductCard } from "@/components/ProductCard";
// import { ProductSkeleton } from "@/components/ProductSkeleton";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Search, X, Filter, SortAsc, SortDesc } from "lucide-react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// async function fetchProducts(searchParams: URLSearchParams): Promise<Product[]> {
//   const params = new URLSearchParams(searchParams);
//   const res = await fetch(`/api/products?${params.toString()}`);
//   if (!res.ok) throw new Error("Failed to fetch products");
//   return res.json();
// }

// async function fetchCategories(): Promise<Category[]> {
//   const res = await fetch("/api/categories");
//   if (!res.ok) throw new Error("Failed to fetch categories");
//   return res.json();
// }

// function ProductsContent() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
//   const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
//   const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");

//   const { data: products, isLoading } = useQuery<Product[]>({
//     queryKey: ["products", searchParams.toString()],
//     queryFn: () => fetchProducts(searchParams),
//   });

//   const { data: categories } = useQuery<Category[]>({
//     queryKey: ["categories"],
//     queryFn: fetchCategories,
//   });

//   const productsRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     if (productsRef.current) {
//       gsap.fromTo(
//         productsRef.current,
//         { y: 30, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
//       );
//     }
//   }, [products]);

//   const updateURL = (newParams: Record<string, string>) => {
//     const params = new URLSearchParams(searchParams);
//     Object.entries(newParams).forEach(([key, value]) => {
//       if (value) {
//         params.set(key, value);
//       } else {
//         params.delete(key);
//       }
//     });
//     router.push(`${pathname}?${params.toString()}`);
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     updateURL({ q: value });
//   };

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     updateURL({ category: category === "all" ? "" : category });
//   };

//   const handleSortChange = (sort: string) => {
//     setSortBy(sort);
//     updateURL({ sort });
//   };

//   const clearFilters = () => {
//     setSearchQuery("");
//     setSelectedCategory("all");
//     setSortBy("newest");
//     router.push(pathname);
//   };

//   const filteredProducts = products?.filter((product) => {
//     if (!searchQuery) return true;
//     const query = searchQuery.toLowerCase();
//     return (
//       product.name.toLowerCase().includes(query) ||
//       product.description.toLowerCase().includes(query) ||
//       product.category.toLowerCase().includes(query)
//     );
//   });

//   const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
//     switch (sortBy) {
//       case "price-low":
//         return a.price - b.price;
//       case "price-high":
//         return b.price - a.price;
//       case "popular":
//         return b.rating - a.rating;
//       default:
//         return b.id - a.id;
//     }
//   });

//   return (
//     <div className="min-h-screen">
//       <Navbar />
//       <main className="pt-32 pb-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-4xl md:text-5xl font-bold mb-8">Products</h1>

//           {/* Search and Filters */}
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
//             <div className="flex flex-col lg:flex-row gap-4">
//               {/* Search */}
//               <div className="relative flex-1">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-white/40"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={() => handleSearchChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-white/10 p-1 rounded-full"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 )}
//               </div>

//               {/* Category Filter */}
//               <div className="flex gap-2 overflow-x-auto">
//                 <button
//                   onClick={() => handleCategoryChange("all")}
//                   className={`px-4 py-3 rounded-xl font-medium whitespace-nowrap transition ${
//                     selectedCategory === "all"
//                       ? "bg-white text-black"
//                       : "bg-white/10 hover:bg-white/20"
//                   }`}
//                 >
//                   All
//                 </button>
//                 {categories?.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => handleCategoryChange(category.slug)}
//                     className={`px-4 py-3 rounded-xl font-medium whitespace-nowrap transition ${
//                       selectedCategory === category.slug
//                         ? "bg-white text-black"
//                         : "bg-white/10 hover:bg-white/20"
//                     }`}
//                   >
//                     {category.name}
//                   </button>
//                 ))}
//               </div>

//               {/* Sort */}
//               <div className="relative">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => handleSortChange(e.target.value)}
//                   className="pl-4 pr-10 py-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-white/40 appearance-none"
//                 >
//                   <option value="newest">Newest</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="popular">Most Popular</option>
//                 </select>
//                 <SortAsc className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//               </div>

//               {/* Clear Filters */}
//               {(searchQuery || selectedCategory !== "all" || sortBy !== "newest") && (
//                 <button
//                   onClick={clearFilters}
//                   className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
//                 >
//                   <X className="h-4 w-4" />
//                   Clear
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Products Grid */}
//           <div ref={productsRef}>
//             {isLoading ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                 {Array(8).fill(0).map((_, i) => (
//                   <ProductSkeleton key={i} />
//                 ))}
//               </div>
//             ) : sortedProducts && sortedProducts.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                 {sortedProducts.map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-20">
//                 <p className="text-2xl font-semibold mb-2">No products found</p>
//                 <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
//                 <button
//                   onClick={clearFilters}
//                   className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default function ProductsPage() {
//   return (
//     <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
//       <ProductsContent />
//     </Suspense>
//   );
// }





















"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Product, Category } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search, X, Filter, SortAsc, SortDesc, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

async function fetchProducts(searchParams: URLSearchParams): Promise<Product[]> {
  const params = new URLSearchParams(searchParams);
  const res = await fetch(`/api/products?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

async function fetchCategories(): Promise<Category[]> {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

function ProductsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products", searchParams.toString()],
    queryFn: () => fetchProducts(searchParams),
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    );

    // Products animation when they load
    if (productsRef.current && cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, [products]);

  const updateURL = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "newest") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateURL({ q: value });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateURL({ category: category === "all" ? "" : category });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateURL({ sort });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("newest");
    router.push(pathname);
  };

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" },
  ];

  const filteredProducts = products?.filter((product) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query)
    );
  });

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "popular":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    }
  });

  const hasActiveFilters = searchQuery || selectedCategory !== "all" || sortBy !== "newest";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Our Collection</span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              All{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our complete collection of premium products
            </p>
          </div>

          {/* Search and Filters - Enhanced UI */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-12">
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-12 py-4 rounded-xl bg-black/50 border border-white/20 focus:outline-none focus:border-blue-500/50 transition-all duration-300 text-white placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    updateURL({ q: "" });
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-white/10 p-1 rounded-full transition"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Categories - Scrollable */}
              <div className="flex-1">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  <button
                    onClick={() => handleCategoryChange("all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      selectedCategory === "all"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                        : "bg-white/10 hover:bg-white/20 text-gray-300"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories?.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                        selectedCategory === category.slug
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                          : "bg-white/10 hover:bg-white/20 text-gray-300"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="pl-4 pr-10 py-2 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-blue-500/50 appearance-none text-gray-300 text-sm cursor-pointer hover:bg-white/20 transition"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-gray-900">
                      {option.label}
                    </option>
                  ))}
                </select>
                <SortDesc className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-medium transition-all duration-300"
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          {!isLoading && sortedProducts && (
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-400">
                Showing <span className="text-white font-semibold">{sortedProducts.length}</span> products
              </p>
            </div>
          )}

          {/* Products Grid */}
          <div ref={sectionRef}>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {Array(8).fill(0).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : sortedProducts && sortedProducts.length > 0 ? (
              <div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    ref={(el) => { cardsRef.current[index] = el; }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-2xl font-semibold text-white mb-2">No products found</p>
                <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}