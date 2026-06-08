"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unused products. Simply contact our support team to initiate a return."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery."
  },
  {
    question: "Do you offer warranty?",
    answer: "Yes, all our products come with a 1-year limited warranty covering manufacturing defects."
  },
  {
    question: "Can I track my order?",
    answer: "Absolutely! Once your order ships, you'll receive a tracking number via email."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay."
  },
  {
    question: "How do I contact customer service?",
    answer: "You can reach our customer service team via email at support@flowcart.com or through our contact form."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to select international destinations. Shipping rates and delivery times vary by location."
  },
  {
    question: "How do I cancel or modify my order?",
    answer: "You can cancel or modify your order within 24 hours of placing it. Please contact our support team for assistance."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-400">Find answers to common questions about our products and services.</p>
          </div>

          <div className="relative mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-full bg-white/5 border border-white/10 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <section ref={sectionRef}>
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  ref={(el) => { itemsRef.current[index] = el; }}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/10 transition"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-5 text-gray-400">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
              {filteredFaqs.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg">No questions found. Try a different search term.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
