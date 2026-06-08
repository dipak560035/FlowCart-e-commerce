"use client";

import { useEffect, useRef, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

async function fetchProducts(searchParams: URLSearchParams) {
  const queryString = searchParams.toString();
  const res = await fetch(`/api/products?${queryString}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products", searchParams.toString()],
    queryFn: () => fetchProducts(searchParams),
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!products) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      cardsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, [products]);

  const getPageTitle = () => {
    const sale = searchParams.get("sale");
    const sort = searchParams.get("sort");
    if (sale === "true") return "Sale Products";
    if (sort === "new") return "New Arrivals";
    if (sort === "popular") return "Best Sellers";
    return "All Products";
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{getPageTitle()}</h1>
          <p className="text-gray-400 mb-12">
            Discover our premium collection of lifestyle tech products
          </p>

          <section ref={sectionRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {isLoading ? (
                Array(8).fill(0).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              ) : products ? (
                products.map((product, index) => (
                  <div
                    key={product.id}
                    ref={(el) => (cardsRef.current[index] = el)}
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              ) : null}
            </div>
            {!isLoading && products?.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No products found.</p>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
