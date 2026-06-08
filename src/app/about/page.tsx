"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    tl.fromTo(
      heroRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      storyRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      valuesRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const values = [
    {
      icon: "✨",
      title: "Quality",
      description: "We never compromise on quality. Every product is carefully selected to meet our high standards."
    },
    {
      icon: "🎯",
      title: "Innovation",
      description: "We're always looking for new ways to improve and bring the latest technology to our customers."
    },
    {
      icon: "💚",
      title: "Sustainability",
      description: "We're committed to reducing our environmental impact and creating a better future."
    },
    {
      icon: "🤝",
      title: "Customer First",
      description: "Our customers are at the heart of everything we do. Your satisfaction is our top priority."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section ref={heroRef} className="mb-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About FlowCart</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              We're a premium lifestyle tech brand dedicated to bringing you the best products that enhance your everyday life.
            </p>
          </section>

          <section ref={storyRef} className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-300 mb-4">
                  Founded in 2020, FlowCart started with a simple idea: to create a curated selection of premium tech products that combine style, functionality, and quality.
                </p>
                <p className="text-gray-300">
                  Today, we're proud to serve thousands of customers who trust us to deliver products that make their lives better, easier, and more enjoyable.
                </p>
              </div>
              <div className="aspect-square bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-3xl flex items-center justify-center">
                <div className="text-8xl">🚀</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div ref={valuesRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
