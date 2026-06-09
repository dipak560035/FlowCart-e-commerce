"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  FileText, 
  Shield, 
  Scale, 
  CreditCard, 
  Package, 
  AlertCircle,
  Sparkles,
  ChevronRight,
  CheckCircle,
  Lock,
  Users,
  ShoppingBag,
  RefreshCw
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TermsPage() {
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

  const keyPoints = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your transactions are protected",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400"
    },
    {
      icon: Scale,
      title: "Fair Policies",
      description: "Clear and transparent terms",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400"
    },
    {
      icon: Lock,
      title: "Privacy Protected",
      description: "Your data is safe with us",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400"
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Dedicated support team",
      gradient: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-400"
    }
  ];

  const sections = [
    {
      icon: FileText,
      title: "Agreement to Terms",
      content: "By accessing or using FlowCart's website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services. These terms apply to all visitors, users, and others who access our services.",
      gradient: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: ShoppingBag,
      title: "Products & Pricing",
      content: [
        { label: "Product descriptions are accurate at time of listing", status: "active" },
        { label: "Prices subject to change without notice", status: "active" },
        { label: "We reserve the right to modify or discontinue products", status: "active" },
        { label: "All sales are subject to availability", status: "active" }
      ],
      gradient: "from-green-500/20 to-green-600/20"
    },
    {
      icon: CreditCard,
      title: "Orders & Payments",
      content: [
        { label: "Order confirmation email sent upon purchase", status: "active" },
        { label: "We accept major credit cards and digital payments", status: "active" },
        { label: "Payment is processed securely through our partners", status: "active" },
        { label: "We reserve the right to cancel suspicious orders", status: "active" }
      ],
      gradient: "from-purple-500/20 to-purple-600/20"
    },
    {
      icon: Package,
      title: "Shipping & Delivery",
      content: [
        { label: "Estimated delivery times provided at checkout", status: "active" },
        { label: "Shipping delays may occur due to external factors", status: "active" },
        { label: "Risk of loss passes to customer upon delivery", status: "active" },
        { label: "International customs fees are buyer's responsibility", status: "active" }
      ],
      gradient: "from-orange-500/20 to-orange-600/20"
    },
    {
      icon: RefreshCw,
      title: "Returns & Refunds",
      content: "Please review our Return Policy for detailed information. Returns are accepted within 30 days of delivery for eligible items. Refunds will be issued to the original payment method within 5-7 business days after return processing.",
      gradient: "from-yellow-500/20 to-yellow-600/20"
    },
    {
      icon: AlertCircle,
      title: "User Responsibilities",
      content: [
        "You must be at least 18 years old to make a purchase",
        "You agree to provide accurate account information",
        "You are responsible for maintaining account security",
        "Prohibited activities include fraud or misuse of services",
        "You may not resell products without authorization"
      ],
      gradient: "from-red-500/20 to-red-600/20"
    },
    {
      icon: Shield,
      title: "Limitation of Liability",
      content: "FlowCart shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount you paid for products purchased.",
      gradient: "from-indigo-500/20 to-indigo-600/20"
    },
    {
      icon: Scale,
      title: "Governing Law",
      content: "These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising under these terms shall be resolved in the courts of San Francisco, California.",
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
              <FileText className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Legal Information</span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Terms of{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Please read these terms carefully before using our services
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Last updated: December 2024
            </p>
          </div>

          {/* Key Points Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {keyPoints.map((point, index) => (
              <div
                key={point.title}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-4 text-center hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${point.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <point.icon className={`w-5 h-5 ${point.iconColor}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{point.title}</h3>
                  <p className="text-xs text-gray-400">{point.description}</p>
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
                    {Array.isArray(section.content) ? (
                      <div className="space-y-3">
                        {section.content.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                            {typeof item === 'object' && 'status' in item ? (
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            )}
                            <span className="text-gray-300 leading-relaxed">
                              {typeof item === 'object' ? item.label : item}
                            </span>
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

          {/* Acknowledgment Section */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl border border-white/10">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-500/20">
                <CheckCircle className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Acknowledgment</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  By using FlowCart's services, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms of Service. If you do not agree with any 
                  part of these terms, please do not use our services.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Have questions about our Terms of Service?{" "}
              <button className="text-blue-400 hover:text-blue-300 transition">
                Contact our legal team
              </button>
            </p>
          </div>

          {/* Update Notice */}
          <div className="mt-6 text-center text-xs text-gray-600">
            <p>These terms are effective as of December 1, 2024</p>
            <p className="mt-1">FlowCart reserves the right to update these terms at any time.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}