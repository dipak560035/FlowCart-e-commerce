// "use client";

// import { useEffect, useRef } from "react";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";
// import gsap from "gsap";
// import Link from "next/link";

// export function Hero() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const heroRef = useRef<HTMLDivElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const subtitleRef = useRef<HTMLParagraphElement>(null);
//   const buttonsRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLImageElement>(null);

//   useEffect(() => {
//     const tl = gsap.timeline();

//     tl.fromTo(
//       titleRef.current,
//       { y: 50, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
//     )
//       .fromTo(
//         subtitleRef.current,
//         { y: 30, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
//         "-=0.4"
//       )
//       .fromTo(
//         buttonsRef.current,
//         { y: 30, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
//         "-=0.3"
//       )
//       .fromTo(
//         imageRef.current,
//         { y: 50, opacity: 0, scale: 0.9 },
//         { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
//         "-=0.5"
//       );
//   }, []);

//   const handleShopNow = () => {
//     if (pathname === "/") {
//       const productsSection = document.getElementById("products");
//       productsSection?.scrollIntoView({ behavior: "smooth" });
//     } else {
//       router.push("/products");
//     }
//   };

//   return (
//     <section
//       ref={heroRef}
//       className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h1
//               ref={titleRef}
//               className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
//             >
//               Redefine Your
//               <span className="text-blue-400"> Lifestyle</span>
//             </h1>
//             <p
//               ref={subtitleRef}
//               className="text-xl text-gray-400 mb-8 max-w-lg"
//             >
//               Premium tech products designed for the modern lifestyle.
//               Experience innovation, quality, and style.
//             </p>
//             <div ref={buttonsRef} className="flex flex-wrap gap-4">
//               <button
//                 onClick={handleShopNow}
//                 className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
//               >
//                 Shop Now
//               </button>
//               <Link
//                 href="/categories"
//                 className="border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition"
//               >
//                 Shop by Category
//               </Link>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <img
//               ref={imageRef}
//               src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
//               alt="Product"
//               className="w-full max-w-md rounded-2xl shadow-2xl"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }













// "use client";

// import { useEffect, useRef, useState } from "react";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Link from "next/link";
// import { ShoppingBag, ArrowRight, Sparkles, ChevronRight } from "lucide-react";

// gsap.registerPlugin(ScrollTrigger);

// interface HeroProps {
//   onShopNow?: () => void;
// }

// export function Hero({ onShopNow }: HeroProps) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isHovered, setIsHovered] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
//   const heroRef = useRef<HTMLElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const subtitleRef = useRef<HTMLParagraphElement>(null);
//   const buttonsRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLDivElement>(null);
//   const badgeRef = useRef<HTMLDivElement>(null);
//   const statsRef = useRef<HTMLDivElement>(null);
//   const floatingElementsRef = useRef<(HTMLDivElement | null)[]>([]);

//   const heroImages = [
//     {
//       url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
//       alt: "Premium headphones",
//       gradient: "from-purple-500/20 to-pink-500/20"
//     },
//     {
//       url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
//       alt: "Smart watch",
//       gradient: "from-blue-500/20 to-cyan-500/20"
//     },
//     {
//       url: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80",
//       alt: "Wireless earbuds",
//       gradient: "from-green-500/20 to-emerald-500/20"
//     }
//   ];

//   useEffect(() => {
//     // Auto-rotate images
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
//     }, 5000);
    
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Main title animation
//       gsap.fromTo(titleRef.current,
//         { y: 100, opacity: 0, rotationX: -15 },
//         { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: "power3.out", delay: 0.2 }
//       );

//       // Badge animation
//       gsap.fromTo(badgeRef.current,
//         { y: -50, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.2)", delay: 0.3 }
//       );

//       // Subtitle animation
//       gsap.fromTo(subtitleRef.current,
//         { y: 30, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5 }
//       );

//       // Buttons animation with stagger
//       gsap.fromTo(buttonsRef.current?.children,
//         { y: 30, opacity: 0, scale: 0.9 },
//         { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(0.8)", delay: 0.7 }
//       );

//       // Image animation
//       gsap.fromTo(imageRef.current,
//         { x: 100, opacity: 0, scale: 0.8, rotationY: -15 },
//         { x: 0, opacity: 1, scale: 1, rotationY: 0, duration: 1.2, ease: "power3.out", delay: 0.4 }
//       );

//       // Stats animation with scroll trigger
//       gsap.fromTo(statsRef.current?.children,
//         { y: 50, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out",
//           scrollTrigger: {
//             trigger: statsRef.current,
//             start: "top 80%",
//             toggleActions: "play none none reverse"
//           }
//         }
//       );

//       // Floating elements animation
//       floatingElementsRef.current.forEach((el, index) => {
//         if (el) {
//           gsap.to(el, {
//             y: "random(-20, 20)",
//             x: "random(-20, 20)",
//             rotation: "random(-10, 10)",
//             duration: "random(3, 5)",
//             repeat: -1,
//             yoyo: true,
//             ease: "sine.inOut",
//             delay: index * 0.3
//           });
//         }
//       });

//       // Parallax effect on scroll
//       gsap.to(heroRef.current, {
//         y: 200,
//         opacity: 0,
//         scrollTrigger: {
//           trigger: heroRef.current,
//           start: "top top",
//           end: "bottom top",
//           scrub: true,
//         }
//       });
//     }, heroRef);

//     return () => ctx.revert();
//   }, []);

//   const handleShopNow = () => {
//     if (onShopNow) {
//       onShopNow();
//     } else if (pathname === "/") {
//       const productsSection = document.getElementById("products");
//       productsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
//     } else {
//       router.push("/products");
//     }
//   };

//   const stats = [
//     { value: "50K+", label: "Happy Customers", icon: "😊" },
//     { value: "500+", label: "Products", icon: "🎯" },
//     { value: "4.9", label: "Rating", icon: "⭐" },
//     { value: "24/7", label: "Support", icon: "💬" }
//   ];

//   return (
//     <section
//       ref={heroRef}
//       className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black"
//     >
//       {/* Animated Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />
        
//         {/* Animated grid pattern */}
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `linear-gradient(to right, #ffffff10 1px, transparent 1px),
//                               linear-gradient(to bottom, #ffffff10 1px, transparent 1px)`,
//             backgroundSize: '50px 50px'
//           }} />
//         </div>
        
//         {/* Animated orbs */}
//         <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
//       </div>

//       {/* Floating decorative elements */}
//       <div ref={el => floatingElementsRef.current[0] = el} className="absolute top-1/4 left-[10%] text-4xl opacity-20 pointer-events-none">
//         ✨
//       </div>
//       <div ref={el => floatingElementsRef.current[1] = el} className="absolute bottom-1/3 right-[15%] text-5xl opacity-20 pointer-events-none">
//         🚀
//       </div>
//       <div ref={el => floatingElementsRef.current[2] = el} className="absolute top-2/3 left-[20%] text-3xl opacity-20 pointer-events-none">
//         💎
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           {/* Left Content */}
//           <div className="space-y-8">
//             {/* Badge */}
//             <div
//               ref={badgeRef}
//               className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
//             >
//               <Sparkles className="w-4 h-4 text-yellow-400" />
//               <span className="text-sm text-gray-300">Summer Sale 2024</span>
//               <ChevronRight className="w-4 h-4 text-gray-400" />
//             </div>

//             {/* Title */}
//             <h1
//               ref={titleRef}
//               className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
//               style={{ perspective: "1000px" }}
//             >
//               <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
//                 Redefine Your
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Digital Lifestyle
//               </span>
//             </h1>

//             {/* Subtitle */}
//             <p
//               ref={subtitleRef}
//               className="text-xl text-gray-400 max-w-lg leading-relaxed"
//             >
//               Experience cutting-edge technology with our premium collection. 
//               Where innovation meets elegance, and performance defines perfection.
//             </p>

//             {/* CTA Buttons */}
//             <div ref={buttonsRef} className="flex flex-wrap gap-4 pt-4">
//               <button
//                 onClick={handleShopNow}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//                 className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25"
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   Shop Now
//                   <ShoppingBag className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </button>
              
//               <Link
//                 href="/categories"
//                 className="group relative overflow-hidden border border-white/30 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:border-white/50 hover:bg-white/5"
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   Explore Categories
//                   <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
//                 </span>
//               </Link>
//             </div>

//             {/* Trust Badges */}
//             <div className="flex items-center gap-6 pt-8">
//               <div className="flex -space-x-2">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div
//                     key={i}
//                     className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-900 flex items-center justify-center text-sm font-bold"
//                   >
//                     {i}
//                   </div>
//                 ))}
//               </div>
//               <div className="text-sm text-gray-400">
//                 <span className="text-white font-semibold">10,000+</span> happy customers worldwide
//               </div>
//             </div>
//           </div>

//           {/* Right Content - Image Gallery */}
//           <div className="relative" ref={imageRef}>
//             {/* Main Image */}
//             <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20 group">
//               <div className={`absolute inset-0 bg-gradient-to-r ${heroImages[currentImageIndex].gradient} opacity-60 z-10 transition-all duration-700`} />
//               <img
//                 src={heroImages[currentImageIndex].url}
//                 alt={heroImages[currentImageIndex].alt}
//                 className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
//               />
              
//               {/* Image overlay with glass morphism */}
//               <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 z-20">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-white font-semibold text-lg">{heroImages[currentImageIndex].alt}</p>
//                     <p className="text-gray-300 text-sm">Limited edition</p>
//                   </div>
//                   <div className="flex gap-2">
//                     {heroImages.map((_, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => setCurrentImageIndex(idx)}
//                         className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                           idx === currentImageIndex ? 'w-8 bg-white' : 'bg-white/40 hover:bg-white/60'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Floating discount badge */}
//             <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-4 shadow-lg animate-bounce">
//               <div className="text-center">
//                 <div className="text-2xl font-bold">-20%</div>
//                 <div className="text-xs">Summer Sale</div>
//               </div>
//             </div>

//             {/* Floating circle decoration */}
//             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div
//           ref={statsRef}
//           className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-white/10"
//         >
//           {stats.map((stat, index) => (
//             <div key={index} className="text-center group">
//               <div className="text-3xl mb-2 transform transition-transform duration-300 group-hover:scale-110">
//                 {stat.icon}
//               </div>
//               <div className="text-2xl md:text-3xl font-bold text-white mb-1">
//                 {stat.value}
//               </div>
//               <div className="text-sm text-gray-400">{stat.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//         <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
//           <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-scroll" />
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes scroll {
//           0% { transform: translateY(0); opacity: 1; }
//           100% { transform: translateY(8px); opacity: 0; }
//         }
//         .animate-scroll {
//           animation: scroll 1.5s ease-in-out infinite;
//         }
//         .delay-1000 {
//           animation-delay: 1s;
//         }
//       `}</style>
//     </section>
//   );
// }

























"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Sparkles, ChevronRight, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onShopNow?: () => void;
}

export function Hero({ onShopNow }: HeroProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showOfferBanner, setShowOfferBanner] = useState(true);
  
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      alt: "Premium headphones",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop",
      alt: "Smart watch",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      url: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop",
      alt: "Wireless earbuds",
      gradient: "from-green-500/20 to-emerald-500/20"
    }
  ];

  useEffect(() => {
    // Auto-rotate images
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main title animation
      gsap.fromTo(titleRef.current,
        { y: 100, opacity: 0, rotationX: -15 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      // Badge animation
      gsap.fromTo(badgeRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.2)", delay: 0.3 }
      );

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5 }
      );

      // Buttons animation with stagger
      if (buttonsRef.current) {
        gsap.fromTo(buttonsRef.current.children,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(0.8)", delay: 0.7 }
        );
      }

      // Image animation
      gsap.fromTo(imageRef.current,
        { x: 100, opacity: 0, scale: 0.8, rotationY: -15 },
        { x: 0, opacity: 1, scale: 1, rotationY: 0, duration: 1.2, ease: "power3.out", delay: 0.4 }
      );

      // Stats animation - FIXED: Better visibility
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 85%",
        end: "bottom 60%",
        onEnter: () => {
          if (statsRef.current) {
            gsap.fromTo(statsRef.current.children,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", clearProps: "all" }
            );
          }
        },
        once: true
      });

      // Floating elements animation
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: "random(-15, 15)",
            x: "random(-15, 15)",
            rotation: "random(-5, 5)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3
          });
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleShopNow = () => {
    if (onShopNow) {
      onShopNow();
    } else if (pathname === "/") {
      const productsSection = document.getElementById("products");
      if (productsSection) {
        const navbarHeight = 80; // Adjust based on your navbar height
        const elementPosition = productsSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: "smooth"
        });
      }
    } else {
      router.push("/products");
    }
  };

  const stats = [
    { value: "50K+", label: "Happy Customers", icon: "😊", description: "Worldwide" },
    { value: "500+", label: "Premium Products", icon: "🎯", description: "Curated selection" },
    { value: "4.9", label: "Customer Rating", icon: "⭐", description: "Out of 5" },
    { value: "24/7", label: "Expert Support", icon: "💬", description: "Always here" }
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black pt-16"
    >
      {/* Close Offer Banner - Fixed position */}
      {showOfferBanner && (
        <div className="fixed top-20 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
              <button
                onClick={() => setShowOfferBanner(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10"
                aria-label="Close offer banner"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="px-6 py-3 pr-12 text-center">
                <p className="text-white text-sm sm:text-base font-medium">
                  🎉 Summer Sale is Here! Get up to <span className="font-bold">40% OFF</span> on selected items. 
                  <span className="hidden sm:inline"> Use code: <span className="font-mono font-bold">SUMMER40</span></span>
                  <button onClick={handleShopNow} className="ml-2 underline font-semibold hover:no-underline">
                    Shop Now →
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #ffffff10 1px, transparent 1px),
                              linear-gradient(to bottom, #ffffff10 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Animated orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000" />
      </div>

      {/* Floating decorative elements */}
      <div ref={(el) => { floatingElementsRef.current[0] = el; }} className="absolute top-1/4 left-[5%] text-3xl opacity-10 pointer-events-none hidden lg:block">
        ✨
      </div>
      <div ref={(el) => { floatingElementsRef.current[1] = el; }} className="absolute bottom-1/3 right-[5%] text-4xl opacity-10 pointer-events-none hidden lg:block">
        🚀
      </div>
      <div ref={(el) => { floatingElementsRef.current[2] = el; }} className="absolute top-2/3 left-[10%] text-2xl opacity-10 pointer-events-none hidden lg:block">
        💎
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 border border-white/10"
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
              <span className="text-xs md:text-sm text-gray-300">Limited Time Offer</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-tight"
              style={{ perspective: "1000px" }}
            >
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                Redefine Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Digital Lifestyle
              </span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-base md:text-lg lg:text-xl text-gray-400 max-w-lg leading-relaxed"
            >
              Experience cutting-edge technology with our premium collection. 
              Where innovation meets elegance, and performance defines perfection.
            </p>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
              <button
                onClick={handleShopNow}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop Now
                  <ShoppingBag className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <Link
                href="/categories"
                className="group relative overflow-hidden border border-white/30 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all duration-300 hover:border-white/50 hover:bg-white/5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Categories
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 md:gap-6 pt-4 md:pt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-900 flex items-center justify-center text-xs md:text-sm font-bold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className="text-xs md:text-sm text-gray-400">
                <span className="text-white font-semibold">10,000+</span> happy customers worldwide
              </div>
            </div>
          </div>

          {/* Right Content - Image Gallery - FIXED size */}
          <div className="relative mt-8 lg:mt-0" ref={imageRef}>
            {/* Main Image Container - Fixed max width */}
            <div className="relative max-w-md mx-auto lg:max-w-full">
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20 group">
                <div className={`absolute inset-0 bg-gradient-to-r ${heroImages[currentImageIndex].gradient} opacity-60 z-10 transition-all duration-700`} />
                <img
                  src={heroImages[currentImageIndex].url}
                  alt={heroImages[currentImageIndex].alt}
                  className="w-full h-auto max-h-[400px] md:max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Image overlay with glass morphism */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 z-20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold text-sm md:text-base">{heroImages[currentImageIndex].alt}</p>
                      <p className="text-gray-300 text-xs md:text-sm">Limited edition</p>
                    </div>
                    <div className="flex gap-2">
                      {heroImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`transition-all duration-300 ${
                            idx === currentImageIndex ? 'w-6 md:w-8 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
                          } rounded-full`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating discount badge - Repositioned */}
            <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 md:p-4 shadow-lg animate-bounce">
              <div className="text-center">
                <div className="text-base md:text-2xl font-bold">-40%</div>
                <div className="text-[10px] md:text-xs">Summer Sale</div>
              </div>
            </div>

            {/* Floating circle decoration */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>

        {/* Stats Section - FIXED: Better visibility and spacing */}
        <div className="mt-16 md:mt-20 pt-8 md:pt-12 border-t border-white/10">
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center group bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="text-2xl md:text-3xl mb-2 transform transition-transform duration-300 group-hover:scale-110">
                  {stat.icon}
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base font-medium text-gray-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-9 md:w-6 md:h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 md:h-3 bg-white/50 rounded-full mt-2 animate-scroll" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(8px); opacity: 0; }
        }
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}