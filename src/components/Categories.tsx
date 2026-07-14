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
