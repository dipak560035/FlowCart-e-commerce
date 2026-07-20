"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Minus, Plus, Trash2, Heart, ShoppingCart, ChevronLeft, Sparkles, Truck, Shield, CreditCard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const cartRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
    gsap.fromTo(
      cartRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const isWishlisted = (productId: number) => wishlistItems.some((item) => item.id === productId);

  const benefits = [
    { icon: Truck, title: "Free Shipping", description: "On orders over $100" },
    { icon: Shield, title: "Secure Checkout", description: "100% protected" },
    { icon: CreditCard, title: "Safe Payment", description: "SSL encrypted" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
      

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-4">
                <ShoppingCart className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">Shopping Cart</span>
              </div>
              <h1 
                ref={titleRef}
                className="text-4xl md:text-5xl font-bold"
              >
                Your{" "}
                >
              </h1>
              <p className="text-gray-400 mt-2">{cartItems.length} items in your cart</p>
            </div>
          </div>

          <div ref={cartRef}>
            {cartItems.length === 0 ? (
              <div className="text-center py-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-white/10">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                  <ShoppingCart className="h-12 w-12 text-gray-500" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">Your cart is empty</h2>
                <p className="text-gray-400 mb-8">Looks like you haven't added any items yet</p>
            
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="group bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-4 md:p-6 hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10"
                    >
                      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                        {/* Product Image */}
                        <Link href={`/products/${item.id}`} className="w-full sm:w-28 md:w-32 aspect-square flex-shrink-0 rounded-xl overflow-hidden bg-gray-800">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </Link>
                        
                        {/* Product Details */}
                        <div className="flex-1">
                          <Link href={`/products/${item.id}`} className="hover:text-blue-400 transition">
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-1">{item.name}</h3>
                          </Link>
                          <p className="text-gray-400 text-sm mb-3">{item.category}</p>
                          
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 bg-white/5 rounded-full p-1">
                              <button
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
                                  }
                                }}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center hover:scale-110"
                              >
                                <Minus className="h-4 w-4 text-gray-300" />
                              </button>
                              <span className="text-lg font-semibold text-white w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => {
                                  dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
                                }}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center hover:scale-110"
                              >
                                <Plus className="h-4 w-4 text-gray-300" />
                              </button>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => dispatch(toggleWishlist(item))}
                                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                                  isWishlisted(item.id)
                                    ? "bg-red-500/20 text-red-400"
                                    : "bg-white/10 text-gray-400 hover:text-white"
                                }`}
                              >
                                <Heart className={`h-5 w-5 ${isWishlisted(item.id) ? "fill-current" : ""}`} />
                              </button>
                              <button
                                onClick={() => dispatch(removeFromCart(item.id))}
                                className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 hover:scale-110"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="sm:text-right">
                          <p className="text-xl md:text-2xl font-bold text-white">
                            Rs.{(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              Rs.{(item.originalPrice * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 sticky top-28">
                    <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-400">
                        <span>Subtotal</span>
                        <span className="text-white">Rs.{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Shipping</span>
                        <span className="text-white">{shipping === 0 ? "Free" : `Rs.${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Estimated Tax</span>
                        <span className="text-white">Rs.{tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-white/10 pt-4 mt-4">
                        <div className="flex justify-between text-xl font-bold text-white">
                          <span>Total</span>
                          <span>Rs.{total.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Including taxes and fees</p>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group">
                   
                    </button>

                    {/* Payment Methods */}
                    <div className="mt-6 text-center">
                      <p className="text-xs text-gray-500 mb-3">Secure payment methods</p>
                      <div className="flex justify-center gap-2">
                        <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">Visa</div>
                        <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">Mastercard</div>
                        <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">PayPal</div>
                        <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">Apple Pay</div>
                      </div>
                    </div>
                  </div>

                  {/* Benefits Cards */}
                  <div className="mt-6 space-y-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
                        <benefit.icon className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-sm font-medium text-white">{benefit.title}</p>
                          <p className="text-xs text-gray-500">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}







































// "use client";

// import { useEffect, useRef } from "react";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
// import { toggleWishlist } from "@/store/slices/wishlistSlice";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Minus, Plus, Trash2, Heart, ShoppingCart, ChevronLeft, Sparkles, Truck, Shield, CreditCard } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import gsap from "gsap";

// export default function CartPage() {
//   const dispatch = useAppDispatch();
//   const { items: cartItems } = useAppSelector((state) => state.cart);
//   const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
//   const cartRef = useRef<HTMLDivElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);

//   useEffect(() => {
//     gsap.fromTo(titleRef.current,
//       { y: 40, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
//     );
//     gsap.fromTo(
//       cartRef.current,
//       { y: 30, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
//     );
//   }, []);

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const shipping = subtotal > 100 ? 0 : 9.99;
//   const tax = subtotal * 0.1;
//   const total = subtotal + shipping + tax;

//   const isWishlisted = (productId: number) => wishlistItems.some((item) => item.id === productId);

//   const benefits = [
//     { icon: Truck, title: "Free Shipping", description: "On orders over $100" },
//     { icon: Shield, title: "Secure Checkout", description: "100% protected" },
//     { icon: CreditCard, title: "Safe Payment", description: "SSL encrypted" }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
//       <Navbar />
//       <main className="pt-28 pb-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Back Button */}
//           <Link 
//             href="/products" 
//             className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 group mb-6"
//           >
//             <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
//             Continue Shopping
//           </Link>

//           {/* Header */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//             <div>
//               <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-4">
//                 <ShoppingCart className="w-4 h-4 text-blue-400" />
//                 <span className="text-sm text-gray-300">Shopping Cart</span>
//               </div>
//               <h1 
//                 ref={titleRef}
//                 className="text-4xl md:text-5xl font-bold"
//               >
//                 Your{" "}
//                 <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   Cart
//                 </span>
//               </h1>
//               <p className="text-gray-400 mt-2">{cartItems.length} items in your cart</p>
//             </div>
//           </div>

//           <div ref={cartRef}>
//             {cartItems.length === 0 ? (
//               <div className="text-center py-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-white/10">
//                 <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
//                   <ShoppingCart className="h-12 w-12 text-gray-500" />
//                 </div>
//                 <h2 className="text-2xl font-semibold text-white mb-2">Your cart is empty</h2>
//                 <p className="text-gray-400 mb-8">Looks like you haven't added any items yet</p>
//                 <Link 
//                   href="/products" 
//                   className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
//                 >
//                   <span>Start Shopping</span>
//                   <ChevronLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
//                 </Link>
//               </div>
//             ) : (
//               <div className="grid lg:grid-cols-3 gap-8">
//                 {/* Cart Items */}
//                 <div className="lg:col-span-2 space-y-4">
//                   {cartItems.map((item, index) => (
//                     <div
//                       key={item.id}
//                       className="group bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-4 md:p-6 hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10"
//                     >
//                       <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
//                         {/* Product Image */}
//                         <Link href={`/products/${item.id}`} className="w-full sm:w-28 md:w-32 aspect-square flex-shrink-0 rounded-xl overflow-hidden bg-gray-800">
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             width={128}
//                             height={128}
//                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                           />
//                         </Link>
                        
//                         {/* Product Details */}
//                         <div className="flex-1">
//                           <Link href={`/products/${item.id}`} className="hover:text-blue-400 transition">
//                             <h3 className="text-lg md:text-xl font-semibold text-white mb-1">{item.name}</h3>
//                           </Link>
//                           <p className="text-gray-400 text-sm mb-3">{item.category}</p>
                          
//                           <div className="flex flex-wrap items-center justify-between gap-4">
//                             {/* Quantity Controls */}
//                             <div className="flex items-center gap-2 bg-white/5 rounded-full p-1">
//                               <button
//                                 onClick={() => {
//                                   if (item.quantity > 1) {
//                                     dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
//                                   }
//                                 }}
//                                 className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center hover:scale-110"
//                               >
//                                 <Minus className="h-4 w-4 text-gray-300" />
//                               </button>
//                               <span className="text-lg font-semibold text-white w-8 text-center">{item.quantity}</span>
//                               <button
//                                 onClick={() => {
//                                   dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
//                                 }}
//                                 className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center hover:scale-110"
//                               >
//                                 <Plus className="h-4 w-4 text-gray-300" />
//                               </button>
//                             </div>
                            
//                             {/* Action Buttons */}
//                             <div className="flex items-center gap-2">
//                               <button
//                                 onClick={() => dispatch(toggleWishlist(item))}
//                                 className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
//                                   isWishlisted(item.id)
//                                     ? "bg-red-500/20 text-red-400"
//                                     : "bg-white/10 text-gray-400 hover:text-white"
//                                 }`}
//                               >
//                                 <Heart className={`h-5 w-5 ${isWishlisted(item.id) ? "fill-current" : ""}`} />
//                               </button>
//                               <button
//                                 onClick={() => dispatch(removeFromCart(item.id))}
//                                 className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 hover:scale-110"
//                               >
//                                 <Trash2 className="h-5 w-5" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
                        
//                         {/* Price */}
//                         <div className="sm:text-right">
//                           <p className="text-xl md:text-2xl font-bold text-white">
//                             Rs.{(item.price * item.quantity).toFixed(2)}
//                           </p>
//                           {item.originalPrice && (
//                             <p className="text-sm text-gray-500 line-through">
//                               Rs.{(item.originalPrice * item.quantity).toFixed(2)}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Order Summary */}
//                 <div className="lg:col-span-1">
//                   <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 sticky top-28">
//                     <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                    
//                     <div className="space-y-3 mb-6">
//                       <div className="flex justify-between text-gray-400">
//                         <span>Subtotal</span>
//                         <span className="text-white">Rs.{subtotal.toFixed(2)}</span>
//                       </div>
//                       <div className="flex justify-between text-gray-400">
//                         <span>Shipping</span>
//                         <span className="text-white">{shipping === 0 ? "Free" : `Rs.${shipping.toFixed(2)}`}</span>
//                       </div>
//                       <div className="flex justify-between text-gray-400">
//                         <span>Estimated Tax</span>
//                         <span className="text-white">Rs.{tax.toFixed(2)}</span>
//                       </div>
//                       <div className="border-t border-white/10 pt-4 mt-4">
//                         <div className="flex justify-between text-xl font-bold text-white">
//                           <span>Total</span>
//                           <span>Rs.{total.toFixed(2)}</span>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">Including taxes and fees</p>
//                       </div>
//                     </div>

//                     {/* Checkout Button */}
//                     <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group">
//                       <span className="flex items-center justify-center gap-2">
//                         Proceed to Checkout
//                         <ChevronLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
//                       </span>
//                     </button>

//                     {/* Payment Methods */}
//                     <div className="mt-6 text-center">
//                       <p className="text-xs text-gray-500 mb-3">Secure payment methods</p>
//                       <div className="flex justify-center gap-2">
//                         <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">Visa</div>
//                         <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">Mastercard</div>
//                         <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">PayPal</div>
//                         <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">Apple Pay</div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Benefits Cards */}
//                   <div className="mt-6 space-y-3">
//                     {benefits.map((benefit, index) => (
//                       <div key={index} className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
//                         <benefit.icon className="w-5 h-5 text-blue-400" />
//                         <div>
//                           <p className="text-sm font-medium text-white">{benefit.title}</p>
//                           <p className="text-xs text-gray-500">{benefit.description}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }
