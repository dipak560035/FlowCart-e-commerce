"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Product, Category } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search, X, Filter, SortAsc, SortDesc } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products", searchParams.toString()],
    queryFn: () => fetchProducts(searchParams),
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (productsRef.current) {
      gsap.fromTo(
        productsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [products]);

  const updateURL = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
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

  const filteredProducts = products?.filter((product) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "popular":
        return b.rating - a.rating;
      default:
        return b.id - a.id;
    }
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Products</h1>

          {/* Search and Filters */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-white/40"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-white/10 p-1 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`px-4 py-3 rounded-xl font-medium whitespace-nowrap transition ${
                    selectedCategory === "all"
                      ? "bg-white text-black"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  All
                </button>
                {categories?.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`px-4 py-3 rounded-xl font-medium whitespace-nowrap transition ${
                      selectedCategory === category.slug
                        ? "bg-white text-black"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="pl-4 pr-10 py-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-white/40 appearance-none"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
                <SortAsc className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory !== "all" || sortBy !== "newest") && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div ref={productsRef}>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array(8).fill(0).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : sortedProducts && sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-2xl font-semibold mb-2">No products found</p>
                <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={clearFilters}
                  className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition"
                >
                  Clear Filters
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
