"use client";

import { use, useEffect, useRef, Suspense } from "react";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Product, Category } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

async function fetchCategory(slug: string) {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to fetch category");
  const categories = await res.json();
  return categories.find((c: Category) => c.slug === slug);
}

async function fetchCategoryProducts(slug: string) {
  const res = await fetch(`/api/products?category=${slug}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

function CategoryContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: ["category", slug],
    queryFn: () => fetchCategory(slug),
  });

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["categoryProducts", slug],
    queryFn: () => fetchCategoryProducts(slug),
    enabled: !!category,
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

  if (!categoryLoading && !category) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/categories" className="text-gray-400 hover:text-white mb-8 inline-flex items-center gap-2 transition">
            <ChevronLeft className="h-4 w-4" />
            Back to Categories
          </Link>

          {category && (
            <>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{category.icon}</span>
                <h1 className="text-4xl md:text-5xl font-bold">{category.name}</h1>
              </div>
              <p className="text-gray-400 mb-12">{category.description}</p>
            </>
          )}

          <section ref={sectionRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {productsLoading || categoryLoading ? (
                Array(8).fill(0).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              ) : products ? (
                products.map((product, index) => (
                  <div
                    key={product.id}
                    ref={(el) => { cardsRef.current[index] = el; }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              ) : null}
            </div>
            {!productsLoading && products?.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No products found in this category.</p>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryContent params={params} />
    </Suspense>
  );
}


