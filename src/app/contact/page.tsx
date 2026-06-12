


"use client";

import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/com
  const infoRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    // Form animation
    const tl = gsap.timeline();
    tl.fromTo(
      formRef.current,
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    );

    // Info cards animation with stagger
    gsap.fromTo(
      cardsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      detail: "support@flowcart.com",
      color: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-400",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Phone,
      title: "Phone",
      detail: "+977-9805104098",
      color: "from-purple-500/20 to-purple-600/20",
      iconColor: "text-purple-400",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: MapPin,
      title: "Address",
      detail: "Kathmandu, Nepal",
      color: "from-green-500/20 to-green-600/20",
      iconColor: "text-green-400",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      detail: "Mon-Fri: 9AM-6PM NST",
      color: "from-orange-500/20 to-orange-600/20",
      iconColor: "text-orange-400",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6">
              <MessageCircle className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Get in Touch</span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Contact{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Us
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Our team is here to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div ref={formRef}>
              {isSubmitted ? (
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8 text-center animate-fade-in-up">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-500">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 text-white placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 text-white placeholder-gray-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 text-white placeholder-gray-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us what you're looking for..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 text-white placeholder-gray-500 resize-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative overflow-hidden w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div ref={infoRef}>
              <div className="space-y-5">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.title}
  























// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Mail, Phone, MapPin, Send, Sparkles, Clock, MessageCircle, CheckCircle } from "lucide-react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// export default function ContactPage() {
//   const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const formRef = useRef<HTMLDivElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const infoRef = useRef<HTMLDivElement>(null);
//   const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     // Title animation
//     gsap.fromTo(titleRef.current,
//       { y: 40, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 0.6,
//         ease: "power3.out",
//       }
//     );

//     // Form animation
//     const tl = gsap.timeline();
//     tl.fromTo(
//       formRef.current,
//       { y: 30, opacity: 0, scale: 0.95 },
//       { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
//     );

//     // Info cards animation with stagger
//     gsap.fromTo(
//       cardsRef.current,
//       { y: 30, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 0.6,
//         stagger: 0.1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: infoRef.current,
//           start: "top 80%",
//         },
//       }
//     );
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setIsSubmitted(true);
//       setTimeout(() => {
//         setIsSubmitted(false);
//         setFormData({ name: "", email: "", subject: "", message: "" });
//       }, 3000);
//     }, 1500);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const contactInfo = [
//     {
//       icon: Mail,
//       title: "Email",
//       detail: "support@flowcart.com",
//       color: "from-blue-500/20 to-blue-600/20",
//       iconColor: "text-blue-400",
//       gradient: "from-blue-500 to-blue-600"
//     },
//     {
//       icon: Phone,
//       title: "Phone",
//       detail: "+977-9805104098",
//       color: "from-purple-500/20 to-purple-600/20",
//       iconColor: "text-purple-400",
//       gradient: "from-purple-500 to-purple-600"
//     },
//     {
//       icon: MapPin,
//       title: "Address",
//       detail: "Kathmandu, Nepal",
//       color: "from-green-500/20 to-green-600/20",
//       iconColor: "text-green-400",
//       gradient: "from-green-500 to-green-600"
//     },
//     {
//       icon: Clock,
//       title: "Business Hours",
//       detail: "Mon-Fri: 9AM-6PM NST",
//       color: "from-orange-500/20 to-orange-600/20",
//       iconColor: "text-orange-400",
//       gradient: "from-orange-500 to-orange-600"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
//       <Navbar />
//       <main className="pt-28 pb-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header Section */}
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6">
//               <MessageCircle className="w-4 h-4 text-blue-400" />
//               <span className="text-sm text-gray-300">Get in Touch</span>
//             </div>
            
//             <h1 
//               ref={titleRef}
//               className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
//             >
//               Contact{" "}
//               <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Us
//               </span>
//             </h1>
            
//             <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//               Have questions? We'd love to hear from you. Our team is here to help.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
//             {/* Contact Form */}
//             <div ref={formRef}>
//               {isSubmitted ? (
//                 <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8 text-center animate-fade-in-up">
//                   <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
//                     <CheckCircle className="h-8 w-8 text-green-400" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
//                   <p className="text-gray-300">Thank you for reaching out. We'll get back to you as soon as possible.</p>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-500">
//                   <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  
//                   <div className="grid sm:grid-cols-2 gap-5 mb-5">
//                     <div>
//                       <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         placeholder="John Doe"
//                         className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 text-white placeholder-gray-500"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         placeholder="john@example.com"
//                         className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 text-white placeholder-gray-500"
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="mb-5">
//                     <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
//                     <input
//                       type="text"
//                       id="subject"
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleChange}
//                       required
//                       placeholder="How can we help?"
//                       className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 text-white placeholder-gray-500"
//                     />
//                   </div>
                  
//                   <div className="mb-6">
//                     <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">Message</label>
//                     <textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                       rows={6}
//                       placeholder="Tell us what you're looking for..."
//                       className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 text-white placeholder-gray-500 resize-none"
//                     />
//                   </div>
                  
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="relative overflow-hidden w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
//                   >
//                     <span className="relative z-10 flex items-center justify-center gap-2">
//                       {isSubmitting ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                           <span>Sending...</span>
//                         </>
//                       ) : (
//                         <>
//                           <Send className="h-5 w-5" />
//                           Send Message
//                         </>
//                       )}
//                     </span>
//                     <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   </button>
//                 </form>
//               )}
//             </div>

//             {/* Contact Information */}
//             <div ref={infoRef}>
//               <div className="space-y-5">
//                 {contactInfo.map((info, index) => (
//                   <div
//                     key={info.title}
//                     ref={(el) => { cardsRef.current[index] = el; }}
//                     className="group relative bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10"
//                   >
//                     <div className="flex items-start gap-4">
//                       <div className={`p-3 rounded-xl bg-gradient-to-br ${info.color} group-hover:scale-110 transition-transform duration-500`}>
//                         <info.icon className={`h-6 w-6 ${info.iconColor}`} />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-xl font-semibold text-white mb-1">{info.title}</h3>
//                         <p className="text-gray-400">{info.detail}</p>
//                       </div>
//                       <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                         <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${info.gradient}`} />
//                       </div>
//                     </div>
                    
//                     {/* Hover Glow Effect */}
//                     <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 transition-all duration-500 group-hover:ring-blue-500/20 pointer-events-none" />
//                   </div>
//                 ))}
//               </div>

//               {/* Support Hours Note */}
//               <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center">
//                 <p className="text-sm text-gray-400">
//                   <span className="text-white font-semibold">24/7 Support</span> available for urgent inquiries
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }
