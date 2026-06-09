"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  RefreshCw, 
  Clock, 
  DollarSign, 
  Package, 
  Shield, 
  Mail, 
  Sparkles, 
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Truck
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ReturnsPage() {
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

  const returnFeatures = [
    {
      icon: RefreshCw,
      title: "30-Day Returns",
      description: "Easy returns within 30 days",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400"
    },
    {
      icon: DollarSign,
      title: "Full Refund",
      description: "Money-back guarantee",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400"
    },
    {
      icon: Package,
      title: "Free Returns",
      description: "On eligible items",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400"
    },
    {
      icon: Clock,
      title: "Quick Processing",
      description: "Refunds in 5-7 days",
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-400"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Request Return",
      description: "Log into your account and submit a return request with your order number",
      icon: Mail
    },
    {
      number: "02",
      title: "Pack Items",
      description: "Pack the items securely in original packaging with all tags attached",
      icon: Package
    },
    {
      number: "03",
      title: "Ship Back",
      description: "Print the return label and ship your package",
      icon: Truck
    },
    {
      number: "04",
      title: "Get Refund",
      description: "We'll process your refund within 5-7 business days",
      icon: DollarSign
    }
  ];

  const sections = [
    {
      icon: RefreshCw,
      title: "Return Policy",
      content: "We offer a 30-day return policy for all unused products in their original condition. Items must be returned with all original packaging, tags, and accessories. Returns are free for defective items or shipping errors.",
      gradient: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: Clock,
      title: "Return Window",
      content: [
        { label: "Standard Returns", time: "30 days from delivery", status: "active" },
        { label: "Holiday Returns", time: "Extended to January 15", status: "active" },
        { label: "Final Sale Items", time: "Non-returnable", status: "inactive" }
      ],
      gradient: "from-green-500/20 to-green-600/20"
    },
    {
      icon: DollarSign,
      title: "Refund Process",
      content: [
        { label: "Original payment method", time: "5-7 business days", highlight: true },
        { label: "Store credit", time: "2-3 business days", highlight: false },
        { label: "Gift card", time: "2-3 business days", highlight: false }
      ],
      gradient: "from-purple-500/20 to-purple-600/20"
    },
    {
      icon: Package,
      title: "Condition Requirements",
      content: [
        "Items must be unused and in original condition",
        "All original tags and packaging must be included",
        "Electronics must be unopened with seals intact",
        "Items must be free from damage or wear"
      ],
      gradient: "from-orange-500/20 to-orange-600/20"
    },
    {
      icon: AlertCircle,
      title: "Non-Returnable Items",
      content: [
        "Gift cards",
        "Final sale or clearance items",
        "Personalized or custom products",
        "Intimate or sanitary goods",
        "Digital downloads"
      ],
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
              <RefreshCw className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Returns & Refunds</span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Returns &{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Refunds
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Hassle-free returns and quick refunds for your peace of mind
            </p>
          </div>

          {/* Return Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {returnFeatures.map((feature, index) => (
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

          {/* Return Steps */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              How to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Return
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 hover:scale-105"
                >
                  <div className="absolute top-4 right-4 text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                    {step.number}
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
                    {Array.isArray(section.content) ? (
                      <div className="space-y-3">
                        {section.content.map((item, i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                            <div className="flex items-center gap-3">
                              {typeof item === 'object' && 'status' in item ? (
                                item.status === 'active' ? (
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-red-400" />
                                )
                              ) : (
                                <ChevronRight className="w-4 h-4 text-blue-400" />
                              )}
                              <span className="text-gray-300">
                                {typeof item === 'object' ? item.label : item}
                              </span>
                              {typeof item === 'object' && 'time' in item && (
                                <span className="text-sm text-gray-500">({item.time})</span>
                              )}
                            </div>
                            <div>
                              {typeof item === 'object' && item && 'highlight' in item && item.highlight ? (
                                <span className="text-green-400 font-semibold">Full Refund</span>
                              ) : typeof item === 'object' && item && 'status' in item && item.status === 'inactive' ? (
                                <span className="text-red-400 text-sm">Not eligible</span>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-300 leading-relaxed">{section.content}</p>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* FAQ Hint */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl border border-white/10 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Still have questions?</h3>
            <p className="text-gray-400 text-sm mb-4">
              Check our FAQ page for more information or contact our support team.
            </p>
            <div className="flex gap-3 justify-center">
              <button className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-all duration-300 group">
                <span>View FAQ</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black text-sm font-semibold hover:shadow-xl transition-all duration-300 group">
                <span>Contact Support</span>
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}