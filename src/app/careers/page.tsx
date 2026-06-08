"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Clock, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const jobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    description: "Join our design team to create beautiful and intuitive user experiences for our customers."
  },
  {
    id: 2,
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $140k",
    description: "Help us build the next generation of our e-commerce platform using modern technologies."
  },
  {
    id: 3,
    title: "Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90k - $130k",
    description: "Lead our marketing efforts and help us grow our brand and reach new customers."
  },
  {
    id: 4,
    title: "Customer Support Specialist",
    department: "Customer Success",
    location: "Remote",
    type: "Part-time",
    salary: "$40k - $50k",
    description: "Provide exceptional customer service and help our customers with their needs."
  }
];

export default function CareersPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cultureRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    tl.fromTo(
      heroRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      cultureRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cultureRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      jobsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: jobsRef.current[0],
          start: "top 80%",
        },
      }
    );
  }, []);

  const culturePoints = [
    "Flexible work hours and remote work options",
    "Competitive salary and equity",
    "Health, dental, and vision insurance",
    "Professional development budget",
    "Team events and activities",
    "Open and inclusive work culture"
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section ref={heroRef} className="mb-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              We're always looking for talented people to join our team and help us build the future of lifestyle tech.
            </p>
          </section>

          <section ref={cultureRef} className="mb-20">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-12">
              <h2 className="text-3xl font-bold mb-8">Our Culture</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {culturePoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">✓</span>
                    <p className="text-gray-300">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
            <div className="space-y-6">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  ref={(el) => (jobsRef.current[index] = el)}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-semibold">{job.title}</h3>
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                          {job.department}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </div>
                      </div>
                      <p className="text-gray-300">{job.description}</p>
                    </div>
                    <button className="flex-shrink-0 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition flex items-center gap-2">
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
