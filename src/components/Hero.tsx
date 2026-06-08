"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Link from "next/link";

export function Hero() {
  const pathname = usePathname();
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        buttonsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        imageRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
  }, []);

  const handleShopNow = () => {
    if (pathname === "/") {
      const productsSection = document.getElementById("products");
      productsSection?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/products");
    }
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
            >
              Redefine Your
              <span className="text-blue-400"> Lifestyle</span>
            </h1>
            <p
              ref={subtitleRef}
              className="text-xl text-gray-400 mb-8 max-w-lg"
            >
              Premium tech products designed for the modern lifestyle.
              Experience innovation, quality, and style.
            </p>
            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <button
                onClick={handleShopNow}
                className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
              >
                Shop Now
              </button>
              <Link
                href="/categories"
                className="border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition"
              >
                Shop by Category
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
              alt="Product"
              className="w-full max-w-md rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
