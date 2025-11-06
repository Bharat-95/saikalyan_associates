"use client";
import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";

export default function AboutFounder({
  name = "Sai Kalyan",
  role = "Founder & Head – Registry Operations",
  description = `Sai Kalyan is the driving force behind Sai Kalyan Associates — leading the firm with over a decade of hands-on experience in property documentation, registry support, and legal coordination. His deep understanding of government procedures and client-focused mindset have made him a trusted name for seamless documentation in Hyderabad.`,
  vision = `“My goal is to ensure every client experiences a transparent, stress-free, and efficient documentation process — with complete trust and professionalism.”`,
  imageSrc = "/images/founder.jpg", // replace with founder image
}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) controls.start("visible");
    else controls.start("hidden");
  }, [isInView, controls]);

  // motion variants
  const leftSlide = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
        type: "spring",
        stiffness: 90,
      },
    },
  };

  const rightSlide = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: "easeOut",
        type: "spring",
        stiffness: 90,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-24 bg-[#050507] text-slate-100 overflow-hidden"
    >
      {/* background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 w-[30rem] h-[30rem] rounded-full blur-[120px] opacity-25 bg-gradient-to-br from-indigo-600 to-pink-500"></div>
        <div className="absolute right-[-20%] bottom-[-20%] w-[25rem] h-[25rem] rounded-full blur-[120px] opacity-20 bg-gradient-to-tl from-pink-500 to-indigo-600"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: Image with motion */}
        <motion.div
          variants={leftSlide}
          initial="hidden"
          animate={controls}
          className="relative"
        >
          <div
            className="p-[2px] rounded-2xl shadow-lg overflow-hidden"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
            }}
          >
            <div className="bg-[#0b0b0f] rounded-2xl overflow-hidden">
              <img
                src={imageSrc}
                alt={name}
                className="object-cover w-full h-[480px] rounded-2xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Right: Text with motion */}
        <motion.div
          variants={rightSlide}
          initial="hidden"
          animate={controls}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#c7b6ff]">
            Founder Profile
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-snug">
            {name}
          </h2>

          <p className="text-indigo-400 font-medium text-sm tracking-wide uppercase">
            {role}
          </p>

          <p className="text-slate-300 leading-relaxed">{description}</p>

          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-400 text-sm">
            {vision}
          </blockquote>

          <div className="flex gap-3 mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.03] transition-transform"
            >
              Contact Founder
            </Link>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
