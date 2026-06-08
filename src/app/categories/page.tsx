"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

async function fetchCategories() {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export default function CategoriesPage() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!categories) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      cardsRef.current,
      { y: 30, opacity: 0 },
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

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Categories</h1>
          <p className="text-gray-400 mb-12">
            Explore our products by category
          </p>

          <section ref={sectionRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 animate-pulse">
                    <div className="text-6xl mb-4 text-transparent">🎧</div>
                    <div className="h-8 bg-white/10 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-white/10 rounded w-full" />
                  </div>
                ))
              ) : categories ? (
                categories.map((category, index) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    ref={(el) => { cardsRef.current[index] = el; }}
                    className="group"
                  >
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition">
                      <div className="text-6xl mb-4">{category.icon}</div>
                      <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                      <p className="text-gray-400">{category.description}</p>
                    </div>
                  </Link>
                ))
              ) : null}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
