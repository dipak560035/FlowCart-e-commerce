"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import gsap from "gsap";

export default function PrivacyPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    At FlowCart, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We may collect the following types of information:</p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Personal identification information (name, email address, phone number, etc.)</li>
                    <li>Payment information</li>
                    <li>Shipping and billing addresses</li>
                    <li>Usage data and analytics</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We use your information to:</p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Process and fulfill your orders</li>
                    <li>Provide customer support</li>
                    <li>Improve our products and services</li>
                    <li>Send you updates and promotional offers (with your consent)</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, or use.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Sharing Your Information</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    We do not sell or share your personal information with third parties except as necessary to process your orders or comply with legal requirements.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <div className="space-y-4 text-gray-300">
                  <p>You have the right to:</p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Access your personal information</li>
                    <li>Update or correct your information</li>
                    <li>Delete your information</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
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
