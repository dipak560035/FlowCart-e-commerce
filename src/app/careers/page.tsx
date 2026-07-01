"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Clock, DollarSign, ArrowRight, Sparkles, Briefcase, Users, Heart, Zap } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const jobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    department: "Design",
    location: "kathmandu, Nepal",
    type: "Full-time",
    salary: "30k - 50k",
    description: "Join our design team to create beautiful and intuitive user experiences for our customers. You'll work closely with product managers and engineers to bring ideas to life.",
    featured: true
  },
  {
    id: 2,
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "100k - 140k",
    description: "Help us build the next generation of our e-commerce platform using modern technologies like React, Next.js, and TypeScript.",
    featured: false
  },
  {
    id: 3,
    title: "Marketing Manager",
    department: "Marketing",
    location: "kathmandu, Nepal",
    type: "Full-time",
    salary: "90k - 130k",
    description: "Lead our marketing efforts and help us grow our brand and reach new customers across digital channels.",
    featured: false
  },
  {
    id: 4,
    title: "Customer Support Specialist",
    department: "Customer Success",
    location: "Remote",
    type: "Part-time",
    salary: "40k - 50k",
    description: "Provide exceptional customer service and help our customers with their needs. Perfect for those who love helping others.",
    featured: false
  }
];

const culturePoints = [
  {
    icon: Zap,
    title: "Flexible Work",
    description: "Remote-first culture with flexible hours"
  },
  {
    icon: DollarSign,
    title: "Competitive Pay",
    description: "Excellent salary and equity packages"
  },
  {
    icon: Heart,
    title: "Health Benefits",
    description: "Full medical, dental, and vision coverage"
  },
  {
    icon: Sparkles,
    title: "Growth Budget",
    description: "$2,000 annual learning stipend"
  },
  {
    icon: Users,
    title: "Team Events",
    description: "Regular meetups and retreats"
  },
  
];

export default function CareersPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cultureRef = useRef<HTMLDivElement>(null);
  const cultureTitleRef = useRef<HTMLHeadingElement>(null);
  const cultureCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const jobsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    ).fromTo(heroRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    // Culture title animation
    gsap.fromTo(cultureTitleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cultureRef.current,
          start: "top 85%",
        },
      }
    );

    // Culture cards animation with stagger
    gsap.fromTo(
      cultureCardsRef.current,
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(0.8)",
        scrollTrigger: {
          trigger: cultureRef.current,
          start: "top 80%",
        },
      }
    );

    // Jobs animation
    gsap.fromTo(
      jobsRef.current,
      { y: 30, opacity: 0 },
     
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section ref={heroRef} className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Join Our Team</span>
            </div>
            
           
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We're always looking for talented people to join our team and help us build 
              the future of lifestyle tech.
            </p>
          </section>

          {/* Culture Section */}
          <section ref={cultureRef} className="mb-20">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-3xl p-8 md:p-12">
              <h2 
                ref={cultureTitleRef}
                className="text-3xl md:text-4xl font-bold mb-8 text-center"
              >
                Our{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Culture
                </span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {culturePoints.map((point, index) => (
                  <div
                    key={index}
                    ref={(el) => { cultureCardsRef.current[index] = el; }}
                    className="group bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <point.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{point.title}</h3>
                    <p className="text-gray-400 text-sm">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Open Positions Section */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Open{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Positions
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Join us in shaping the future of technology
              </p>
            </div>

            <div className="space-y-6">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  ref={(el) => { jobsRef.current[index] = el; }}
                  className={`group relative bg-gradient-to-br from-gray-900 to-gray-800 border rounded-2xl p-6 md:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 ${
                    job.featured 
                      ? "border-blue-500/50 ring-1 ring-blue-500/30" 
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {job.featured && (
                    <div className="absolute -top-3 left-6">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                  
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {job.title}
                        </h3>
                        <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm">
                          {job.department}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-purple-400" />
                          <span className="text-sm">{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="h-4 w-4 text-green-400" />
                          <span className="text-sm">{job.salary}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                    
                    <button className="flex-shrink-0 group/btn relative overflow-hidden bg-white text-black px-6 md:px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                      <span className="relative z-10">Apply Now</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 relative z-10" />
                      <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 transition-all duration-500 group-hover:ring-blue-500/20 pointer-events-none" />
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-20 text-center">
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl p-10 md:p-12 border border-white/10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Don't see the right role?
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                We're always looking for talented people. Send us your resume and we'll keep you in mind.
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 group">
                <span>Send Your Resume</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
































// "use client";

// import { useEffect, useRef } from "react";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { MapPin, Clock, DollarSign, ArrowRight, Sparkles, Briefcase, Users, Heart, Zap } from "lucide-react";
// import Link from "next/link";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// const jobs = [
//   {
//     id: 1,
//     title: "Senior Product Designer",
//     department: "Design",
//     location: "kathmandu, Nepal",
//     type: "Full-time",
//     salary: "30k - 50k",
//     description: "Join our design team to create beautiful and intuitive user experiences for our customers. You'll work closely with product managers and engineers to bring ideas to life.",
//     featured: true
//   },
//   {
//     id: 2,
//     title: "Frontend Developer",
//     department: "Engineering",
//     location: "Remote",
//     type: "Full-time",
//     salary: "100k - 140k",
//     description: "Help us build the next generation of our e-commerce platform using modern technologies like React, Next.js, and TypeScript.",
//     featured: false
//   },
//   {
//     id: 3,
//     title: "Marketing Manager",
//     department: "Marketing",
//     location: "kathmandu, Nepal",
//     type: "Full-time",
//     salary: "90k - 130k",
//     description: "Lead our marketing efforts and help us grow our brand and reach new customers across digital channels.",
//     featured: false
//   },
//   {
//     id: 4,
//     title: "Customer Support Specialist",
//     department: "Customer Success",
//     location: "Remote",
//     type: "Part-time",
//     salary: "40k - 50k",
//     description: "Provide exceptional customer service and help our customers with their needs. Perfect for those who love helping others.",
//     featured: false
//   }
// ];

// const culturePoints = [
//   {
//     icon: Zap,
//     title: "Flexible Work",
//     description: "Remote-first culture with flexible hours"
//   },
//   {
//     icon: DollarSign,
//     title: "Competitive Pay",
//     description: "Excellent salary and equity packages"
//   },
//   {
//     icon: Heart,
//     title: "Health Benefits",
//     description: "Full medical, dental, and vision coverage"
//   },
//   {
//     icon: Sparkles,
//     title: "Growth Budget",
//     description: "$2,000 annual learning stipend"
//   },
//   {
//     icon: Users,
//     title: "Team Events",
//     description: "Regular meetups and retreats"
//   },
//   {
//     icon: Briefcase,
//     title: "Inclusive Culture",
//     description: "Open, diverse, and welcoming environment"
//   }
// ];

// export default function CareersPage() {
//   const heroRef = useRef<HTMLDivElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const cultureRef = useRef<HTMLDivElement>(null);
//   const cultureTitleRef = useRef<HTMLHeadingElement>(null);
//   const cultureCardsRef = useRef<(HTMLDivElement | null)[]>([]);
//   const jobsRef = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     // Hero animation
//     const tl = gsap.timeline();
//     tl.fromTo(titleRef.current,
//       { y: 40, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
//     ).fromTo(heroRef.current,
//       { y: 30, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
//       "-=0.3"
//     );

//     // Culture title animation
//     gsap.fromTo(cultureTitleRef.current,
//       { y: 40, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 0.6,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: cultureRef.current,
//           start: "top 85%",
//         },
//       }
//     );

//     // Culture cards animation with stagger
//     gsap.fromTo(
//       cultureCardsRef.current,
//       { y: 40, opacity: 0, scale: 0.95 },
//       {
//         y: 0,
//         opacity: 1,
//         scale: 1,
//         duration: 0.6,
//         stagger: 0.08,
//         ease: "back.out(0.8)",
//         scrollTrigger: {
//           trigger: cultureRef.current,
//           start: "top 80%",
//         },
//       }
//     );

//     // Jobs animation
//     gsap.fromTo(
//       jobsRef.current,
//       { y: 30, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 0.6,
//         stagger: 0.1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: jobsRef.current[0],
//           start: "top 85%",
//         },
//       }
//     );
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black">
//       <Navbar />
//       <main className="pt-28 pb-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Hero Section */}
//           <section ref={heroRef} className="mb-16 text-center">
//             <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6">
//               <Briefcase className="w-4 h-4 text-blue-400" />
//               <span className="text-sm text-gray-300">Join Our Team</span>
//             </div>
            
//             <h1 
//               ref={titleRef}
//               className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
//             >
//               Join Our{" "}
//               <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Team
//               </span>
//             </h1>
            
//             <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
//               We're always looking for talented people to join our team and help us build 
//               the future of lifestyle tech.
//             </p>
//           </section>

//           {/* Culture Section */}
//           <section ref={cultureRef} className="mb-20">
//             <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-3xl p-8 md:p-12">
//               <h2 
//                 ref={cultureTitleRef}
//                 className="text-3xl md:text-4xl font-bold mb-8 text-center"
//               >
//                 Our{" "}
//                 <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                   Culture
//                 </span>
//               </h2>
//               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {culturePoints.map((point, index) => (
//                   <div
//                     key={index}
//                     ref={(el) => { cultureCardsRef.current[index] = el; }}
//                     className="group bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
//                   >
//                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                       <point.icon className="w-6 h-6 text-blue-400" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-white mb-2">{point.title}</h3>
//                     <p className="text-gray-400 text-sm">{point.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Open Positions Section */}
//           <section>
//             <div className="text-center mb-10">
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                 Open{" "}
//                 <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   Positions
//                 </span>
//               </h2>
//               <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//                 Join us in shaping the future of technology
//               </p>
//             </div>

//             <div className="space-y-6">
//               {jobs.map((job, index) => (
//                 <div
//                   key={job.id}
//                   ref={(el) => { jobsRef.current[index] = el; }}
//                   className={`group relative bg-gradient-to-br from-gray-900 to-gray-800 border rounded-2xl p-6 md:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 ${
//                     job.featured 
//                       ? "border-blue-500/50 ring-1 ring-blue-500/30" 
//                       : "border-white/10 hover:border-white/20"
//                   }`}
//                 >
//                   {job.featured && (
//                     <div className="absolute -top-3 left-6">
//                       <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
//                         Featured
//                       </span>
//                     </div>
//                   )}
                  
//                   <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//                     <div className="flex-1">
//                       <div className="flex flex-wrap items-center gap-3 mb-2">
//                         <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
//                           {job.title}
//                         </h3>
//                         <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm">
//                           {job.department}
//                         </span>
//                       </div>
                      
//                       <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-3">
//                         <div className="flex items-center gap-1.5">
//                           <MapPin className="h-4 w-4 text-blue-400" />
//                           <span className="text-sm">{job.location}</span>
//                         </div>
//                         <div className="flex items-center gap-1.5">
//                           <Clock className="h-4 w-4 text-purple-400" />
//                           <span className="text-sm">{job.type}</span>
//                         </div>
//                         <div className="flex items-center gap-1.5">
//                           <DollarSign className="h-4 w-4 text-green-400" />
//                           <span className="text-sm">{job.salary}</span>
//                         </div>
//                       </div>
                      
//                       <p className="text-gray-400 text-sm md:text-base leading-relaxed">
//                         {job.description}
//                       </p>
//                     </div>
                    
//                     <button className="flex-shrink-0 group/btn relative overflow-hidden bg-white text-black px-6 md:px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
//                       <span className="relative z-10">Apply Now</span>
//                       <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 relative z-10" />
//                       <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
//                     </button>
//                   </div>
                  
//                   {/* Hover Glow Effect */}
//                   <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 transition-all duration-500 group-hover:ring-blue-500/20 pointer-events-none" />
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* CTA Section */}
//           <section className="mt-20 text-center">
//             <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl p-10 md:p-12 border border-white/10">
//               <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
//                 Don't see the right role?
//               </h3>
//               <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
//                 We're always looking for talented people. Send us your resume and we'll keep you in mind.
//               </p>
//               <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 group">
//                 <span>Send Your Resume</span>
//                 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//               </button>
//             </div>
//           </section>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }
