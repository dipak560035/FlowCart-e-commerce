"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import gsap from "gsap";

export default function ShippingPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={contentRef}>
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Shipping Policy</h1>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Shipping Options</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    We offer several shipping options to meet your needs:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Standard Shipping: 3-5 business days</li>
                    <li>Express Shipping: 1-2 business days</li>
                    <li>Overnight Shipping: Next business day</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Shipping Costs</h2>
                <div className="space-y-4 text-gray-300">
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Orders over $100: Free standard shipping</li>
                    <li>Orders under $100: $9.99 standard shipping</li>
                    <li>Express shipping: $19.99</li>
                    <li>Overnight shipping: $39.99</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Order Processing</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Tracking</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Once your order has been shipped, you will receive an email with a tracking number and link to track your package.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">International Shipping</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    We currently ship to select international destinations. International shipping rates and delivery times vary by location.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
