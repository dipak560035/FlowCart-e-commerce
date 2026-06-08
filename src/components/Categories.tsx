"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

async function fetchCategories() {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export function Categories() {
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
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 animate-pulse">
                <div className="text-5xl mb-4 text-transparent">🎧</div>
                <div className="h-6 bg-white/10 rounded max-w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our curated collection of premium lifestyle tech products
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories?.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition transform hover:scale-105">
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
