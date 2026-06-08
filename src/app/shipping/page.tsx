"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Truck, Clock, DollarSign, MapPin, Globe, Package, Shield, Sparkles, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ShippingPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    );

    // Content animation
    gsap.fromTo(contentRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.2,
      }
    );

    // Sections animation with stagger
    gsap.fromTo(
      sectionsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const shippingFeatures = [
    {
      icon: Package,
      title: "Free Shipping",
      description: "On orders over $100",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400"
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "3-5 business days standard",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400"
    },
    {
      icon: Shield,
      title: "Order Protection",
      description: "100% secure shipping",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400"
    },
    {
      icon: Globe,
      title: "Worldwide Shipping",
      description: "Select international locations",
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-400"
    }
  ];

  const sections = [
    {
      icon: Truck,
      title: "Shipping Options",
      content: [
        { label: "Standard Shipping", time: "3-5 business days", price: "$9.99", free: true },
        { label: "Express Shipping", time: "1-2 business days", price: "$19.99", free: false },
        { label: "Overnight Shipping", time: "Next business day", price: "$39.99", free: false }
      ],
      gradient: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: DollarSign,
      title: "Shipping Costs",
      content: [
        { label: "Orders over $100", price: "Free standard shipping", highlight: true },
        { label: "Orders under $100", price: "$9.99 standard shipping", highlight: false },
        { label: "Express shipping", price: "$19.99", highlight: false },
        { label: "Overnight shipping", price: "$39.99", highlight: false }
      ],
      gradient: "from-green-500/20 to-green-600/20"
    },
    {
      icon: Clock,
      title: "Order Processing",
      description: "Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day. You will receive a confirmation email once your order has been processed.",
      gradient: "from-purple-500/20 to-purple-600/20"
    },
    {
      icon: MapPin,
      title: "Tracking Your Order",
      description: "Once your order has been shipped, you will receive an email with a tracking number and link to track your package. You can also track your order status in your account dashboard.",
      gradient: "from-orange-500/20 to-orange-600/20"
    },
    {
      icon: Globe,
      title: "International Shipping",
      description: "We currently ship to select international destinations. International shipping rates and delivery times vary by location. Please note that customs fees and import duties may apply and are the responsibility of the customer.",
      gradient: "from-red-500/20 to-red-600/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6">
              <Truck className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Shipping Information</span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Shipping{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Learn about our shipping options, costs, and delivery times
            </p>
          </div>

          {/* Shipping Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {shippingFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-4 text-center hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Content Sections */}
          <div ref={contentRef} className="space-y-6">
            {sections.map((section, index) => (
              <section
                key={section.title}
                ref={(el) => { sectionsRef.current[index] = el; }}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 rounded-xl bg-white/10 group-hover:scale-110 transition-transform duration-500">
                      <section.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-semibold text-white">
                      {section.title}
                    </h2>
                  </div>

                  {/* Content */}
                  <div className="pl-0 md:pl-10">
                    {section.content && Array.isArray(section.content) ? (
                      <div className="space-y-3">
                        {section.content.map((item, i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                            <div className="flex items-center gap-3">
                              <ChevronRight className="w-4 h-4 text-blue-400" />
                              <span className="text-gray-300">{item.label}</span>
                              {item.time && <span className="text-sm text-gray-500">({item.time})</span>}
                            </div>
                            <div>
                              {item.highlight ? (
                                <span className="text-green-400 font-semibold">{item.price}</span>
                              ) : (
                                <span className="text-gray-400">{item.price}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-300 leading-relaxed">{section.description}</p>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Important Notes Section */}
          <div className="mt-12 p-6 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 rounded-2xl border border-yellow-500/20">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-yellow-500/20">
                <Shield className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-yellow-400 mb-1">Important Notes</h3>
                <p className="text-gray-400 text-xs">
                  Delivery times are estimates and may vary due to carrier delays, holidays, or weather conditions. 
                  You will receive tracking information once your order ships.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Have questions about shipping?{" "}
              <button className="text-blue-400 hover:text-blue-300 transition">
                Contact our support team
              </button>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}