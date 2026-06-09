

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Sparkles, ArrowRight, Gift, Timer } from "lucide-react";

export function PromotionalBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    tl.fromTo(
      badgeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    )
      .fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        timerRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(0.8)" },
        "-=0.3"
      )
      .fromTo(
        buttonRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );
  }, []);

  // Calculate time remaining until end of sale (example: 7 days from now)
  const getTimeRemaining = () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  };

  const timeRemaining = getTimeRemaining();

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl shadow-purple-500/20">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 mb-6"
            >
              <Gift className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">Limited Time Offer</span>
            </div>

            {/* Title */}
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
            >
              Summer{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Sale
              </span>
            </h2>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl lg:text-2xl mb-6 text-white/90 max-w-2xl mx-auto"
            >
              Up to <span className="font-bold text-yellow-300">50% OFF</span> on selected premium items
            </p>

            {/* Timer */}
            <div
              ref={timerRef}
              className="inline-flex items-center gap-4 md:gap-6 bg-black/30 backdrop-blur-sm rounded-2xl px-6 md:px-8 py-4 mb-8"
            >
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium text-white/80">Ends in:</span>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{timeRemaining.days}</div>
                  <div className="text-xs text-white/60">Days</div>
                </div>
                <span className="text-2xl font-bold text-white/60">:</span>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{timeRemaining.hours}</div>
                  <div className="text-xs text-white/60">Hours</div>
                </div>
                <span className="text-2xl font-bold text-white/60">:</span>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{timeRemaining.minutes}</div>
                  <div className="text-xs text-white/60">Mins</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              ref={buttonRef}
              href="/products?sale=true"
              className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-full bg-white text-purple-600 font-bold text-base md:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
              <span>Shop Sale Now</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Small Print */}
            <p className="mt-4 text-xs text-white/50">
              *Terms and conditions apply. Offer ends in {timeRemaining.days} days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}