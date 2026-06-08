"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Lock, Eye, Database, Mail, FileText, Sparkles, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PrivacyPage() {
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

  const sections = [
    {
      icon: FileText,
      title: "Introduction",
      content: "At FlowCart, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information. We are committed to being transparent about our data practices and giving you control over your information.",
      gradient: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal identification information (name, email address, phone number, etc.)",
        "Payment information (processed securely through our payment partners)",
        "Shipping and billing addresses",
        "Usage data and analytics to improve your experience",
        "Device information and IP addresses"
      ],
      gradient: "from-purple-500/20 to-purple-600/20"
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        "Process and fulfill your orders",
        "Provide customer support and respond to inquiries",
        "Improve our products and services",
        "Send you updates and promotional offers (with your consent)",
        "Comply with legal obligations",
        "Prevent fraud and ensure security"
      ],
      gradient: "from-green-500/20 to-green-600/20"
    },
    {
      icon: Shield,
      title: "Data Protection",
      content: "We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, or use. This includes encryption, secure servers, and regular security audits. We continuously update our security practices to stay ahead of emerging threats.",
      gradient: "from-orange-500/20 to-orange-600/20"
    },
    {
      icon: Eye,
      title: "Sharing Your Information",
      content: "We do not sell your personal information. We only share your information with third parties as necessary to process your orders (e.g., shipping carriers, payment processors) or comply with legal requirements. All third-party partners are vetted for data protection compliance.",
      gradient: "from-red-500/20 to-red-600/20"
    },
    {
      icon: Mail,
      title: "Your Rights",
      content: [
        "Access your personal information",
        "Update or correct your information",
        "Request deletion of your information",
        "Opt-out of marketing communications",
        "Data portability",
        "Withdraw consent at any time"
      ],
      gradient: "from-teal-500/20 to-teal-600/20"
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
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Privacy & Security</span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Privacy{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Last updated: December 2024
            </p>
          </div>

          {/* Content Sections */}
          <div ref={contentRef} className="space-y-6">
            {sections.map((section, index) => (
              <section
                key={section.title}
                ref={(el) => { sectionsRef.current[index] = el; }}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Gradient Background */}
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
                      <ul className="space-y-3">
                        {section.content.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300">
                            <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-300 leading-relaxed">{section.content}</p>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl border border-white/10 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Questions About This Policy?</h3>
            <p className="text-gray-400 text-sm mb-4">
              If you have any questions about our Privacy Policy, please contact us.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-all duration-300 group">
              <span>Contact Privacy Team</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Last Updated Note */}
          <div className="mt-8 text-center text-xs text-gray-600">
            <p>This policy is effective as of December 1, 2024</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}