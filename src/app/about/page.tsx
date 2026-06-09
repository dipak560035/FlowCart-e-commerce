

"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const storyImageRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesTitleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      heroRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    // Story section animation
    gsap.fromTo(
      storyRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      storyImageRef.current,
      { x: 50, opacity: 0, scale: 0.9 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
        },
      }
    );

    // Values title animation
    gsap.fromTo(
      valuesTitleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: valuesTitleRef.current,
          start: "top 85%",
        },
      }
    );

    // Values cards animation with stagger
    gsap.fromTo(
      valuesRef.current?.children || [],
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(0.8)",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
        },
      }
    );

    // Stats animation
    gsap.fromTo(
      statsRef.current?.children || [],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  const values = [
    {
      icon: "✨",
      title: "Quality First",
      description: "We never compromise on quality. Every product is carefully selected to meet our high standards.",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: "🎯",
      title: "Innovation",
      description: "We're always looking for new ways to improve and bring the latest technology to our customers.",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: "💚",
      title: "Sustainability",
      description: "We're committed to reducing our environmental impact and creating a better future.",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: "🤝",
      title: "Customer First",
      description: "Our customers are at the heart of everything we do. Your satisfaction is our top priority.",
      gradient: "from-orange-500/20 to-red-500/20"
    }
  ];

  const stats = [
    { value: "2020", label: "Founded", icon: "🎯" },
    { value: "50K+", label: "Happy Customers", icon: "😊" },
    { value: "500+", label: "Products", icon: "📦" },
    { value: "24/7", label: "Support", icon: "💬" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Our Story</span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              About{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                FlowCart
              </span>
            </h1>
            
            <p 
              ref={heroRef}
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              We're a premium lifestyle tech brand dedicated to bringing you the best products 
              that enhance your everyday life.
            </p>
          </section>

          {/* Our Story Section */}
          <section className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div ref={storyRef}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Story
                  </span>
                </h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Founded in 2020, FlowCart started with a simple idea: to create a curated selection 
                  of premium tech products that combine style, functionality, and quality.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Today, we're proud to serve thousands of customers who trust us to deliver products 
                  that make their lives better, easier, and more enjoyable.
                </p>
                
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-900 flex items-center justify-center text-sm font-bold"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">
                    <span className="text-white font-semibold">10,000+</span> customers worldwide
                  </div>
                </div>
              </div>
              
              <div 
                ref={storyImageRef}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20"
              >
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
                  alt="Our team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-white font-semibold">Passionate Team</p>
                    <p className="text-gray-300 text-sm">Dedicated to excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Values Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 
                ref={valuesTitleRef}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              >
                Our{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Values
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div 
              ref={valuesRef}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            >
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="text-5xl md:text-6xl mb-4 transform transition-transform duration-500 group-hover:scale-110">
                      {value.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-12 border-t border-white/10">
            <div 
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            >
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center group"
                >
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl p-12 border border-white/10">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Join Our Community</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Be part of something special. Get exclusive offers, early access to new products, and more.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
