"use client";

import { use, useEffect, useRef, useState } from "react";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

async function fetchProduct(id: string): Promise<Product | undefined> {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to fetch product");
  const products = await res.json();
  return products.find((p: Product) => p.id === parseInt(id));
}

async function fetchRelatedProducts(categorySlug: string, currentProductId: number): Promise<Product[]> {
  const res = await fetch(`/api/products?category=${categorySlug}`);
  if (!res.ok) throw new Error("Failed to fetch related products");
  const products = await res.json();
  return products.filter((p: Product) => p.id !== currentProductId).slice(0, 4);
}

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const dispatch = useAppDispatch();
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);

  const { data: product, isLoading } = useQuery<Product | undefined>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  const { data: relatedProducts } = useQuery<Product[]>({
    queryKey: ["relatedProducts", product?.categorySlug, product?.id],
    queryFn: () => product ? fetchRelatedProducts(product.categorySlug, product.id) : Promise.resolve([]),
    enabled: !!product,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    tl.fromTo(
      heroRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      detailsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    if (relatedRef.current) {
      gsap.fromTo(
        relatedRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: relatedRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, [product]);

  if (!isLoading && !product) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-96">
              <ProductSkeleton />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) return null;

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="text-gray-400 hover:text-white mb-8 inline-flex items-center gap-2 transition">
            <ChevronLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div ref={heroRef}>
              <div className="relative aspect-square bg-white/5 rounded-2xl overflow-hidden mb-4">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) =>
                        prev === 0 ? product.images.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) =>
                        prev === product.images.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex gap-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                      currentImageIndex === index ? "border-white" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div ref={detailsRef}>
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>

              <div className="flex items-center gap-1 mb-6">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
                <span className="text-gray-400 ml-2">{product.rating}</span>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <p className="text-4xl font-bold">${product.price}</p>
                {product.originalPrice && (
                  <p className="text-2xl text-gray-500 line-through">${product.originalPrice}</p>
                )}
              </div>

              <p className="text-gray-300 mb-8 leading-relaxed">{product.description}</p>

              {product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <span className="text-blue-400 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="flex-1 bg-white text-black py-4 rounded-full font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => dispatch(toggleWishlist(product))}
                  className={`p-4 rounded-full border-2 transition ${
                    isWishlisted
                      ? "border-red-500 text-red-500"
                      : "border-white/20 hover:border-white/40"
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
          </div>

          {relatedProducts && relatedProducts.length > 0 && (
            <section ref={relatedRef}>
              <h2 className="text-3xl font-bold mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
