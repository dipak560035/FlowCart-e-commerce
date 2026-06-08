"use client";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { subscribeToNewsletter } from "@/store/slices/uiSlice";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Newsletter() {
  const dispatch = useAppDispatch();
  const { newsletterSubscribers } = useAppSelector((state) => state.ui);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      sectionRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !newsletterSubscribers.includes(email)) {
      dispatch(subscribeToNewsletter(email));
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay Updated
        </h2>
        <p className="text-gray-400 mb-8">
          Subscribe to our newsletter for exclusive offers and product updates
        </p>
        {isSubscribed ? (
          <div className="text-green-400 text-lg font-semibold">
            Thank you for subscribing! 🎉
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-white/40"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
