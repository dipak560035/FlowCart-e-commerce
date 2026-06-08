"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { QuickViewModal } from "@/components/QuickViewModal";
import { PromotionalBanner } from "@/components/PromotionalBanner";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { useAppSelector } from "@/store/hooks";

export default function Home() {
  const { isQuickViewOpen, quickViewProduct } = useAppSelector((state) => state.ui);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      {isQuickViewOpen && quickViewProduct && <QuickViewModal />}
      <PromotionalBanner />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
    </div>
  );
}
