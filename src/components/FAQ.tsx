
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Search, Sparkles, HelpCircle, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unused products. Simply contact our support team to initiate a return. Items must be in original packaging with all tags attached.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery. International shipping times vary by location.",
  },
  {
    question: "Do you offer warranty?",
    answer: "Yes, all our products come with a 1-year limited warranty covering manufacturing defects. Extended warranty options are available for select products.",
  },
  {
    question: "Can I track my order?",
    answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can also track your order in your account dashboard.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay.",
  },
  {
    question: "How do I contact customer service?",
    answer: "You can reach our customer service team via email at support@flowcart.com, through our contact form, or via live chat 24/7.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );

    // Subtitle animation
    gsap.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );

    // FAQ items animation
    gsap.fromTo(
      itemsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Help Center</span>
          </div>
          
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          
          <p 
            ref={subtitleRef}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Find answers to common questions about our products, shipping, and services
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-10">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 text-white placeholder-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                ✕
              </button>
            )}
          </div>
          
          {/* Search Results Count */}
          {searchQuery && (
            <div className="mt-2 text-sm text-gray-500">
              Found {filteredFaqs.length} {filteredFaqs.length === 1 ? "result" : "results"}
            </div>
          )}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="group bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {faq.question}
                </span>
                <div className={`p-1 rounded-full transition-all duration-300 ${openIndex === index ? 'bg-blue-500/20' : 'bg-white/10'}`}>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-white" />
                  )}
                </div>
              </button>
              
              {/* Answer with animation */}
              {openIndex === index && (
                <div className="px-6 pb-5 pt-2 border-t border-white/10">
                  <div className="flex gap-3">
                    <div className="w-1 h-auto bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
                    <p className="text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* No Results */}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl font-semibold text-white mb-2">No questions found</p>
              <p className="text-gray-400">Try a different search term or browse our FAQs</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-white/10">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-4">
              <MessageCircle className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Still need help?</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Can't find what you're looking for?</h3>
            <p className="text-gray-400 mb-6">Our support team is here to help you 24/7</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <span>Contact Support</span>
              <ChevronUp className="w-4 h-4 rotate-90 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}