"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { motion, useInView, useAnimationControls } from "framer-motion";

export default function AboutIntro({
  imageSrc = "/About.jpg",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const blobVariants = {
    hidden: { opacity: 0.2, scale: 0.8 },
    visible: {
      opacity: 0.25,
      scale: 1,
      transition: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="text-slate-100 py-16 lg:py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(8,10,12,1) 0%, rgba(20,23,26,1) 100%)",
      }}
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Subtle gradient blobs like hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-24 -top-28 w-80 h-80 rounded-full opacity-25 blur-3xl"
          style={{
            background: "linear-gradient(135deg,#071028 0%,#0b1220 100%)",
          }}
          variants={blobVariants}
        />
        <motion.div
          className="absolute -right-16 top-12 w-60 h-60 rounded-full opacity-25 blur-2xl"
          style={{
            background: "linear-gradient(135deg,#4f46e5 0%,#ec4899 100%)",
          }}
          variants={blobVariants}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
        {/* LEFT: content */}
        <motion.div variants={textVariants}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
              ℹ
            </div>
            <span className="text-indigo-300 font-medium text-sm tracking-wide">
              About Sai Kalyan Associates
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug mb-6 text-white">
            <span>Your trusted partners in </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 italic">
              Property & Documentation
            </span>
            <span> Services</span>
          </h2>

          <p className="text-slate-300 leading-relaxed mb-6">
            At{" "}
            <span className="text-white font-semibold">
              Sai Kalyan Associates
            </span>
            , we specialize in property documentation, title verification,
            drafting, and registration support. From sale deeds to NRI legal
            services, every document is prepared with accuracy, compliance, and
            confidentiality — ensuring peace of mind for every client.
          </p>

          <ul className="space-y-3 mb-8">
            {[
              "Specialized in Sale Deeds, Agreements, and Property Registration.",
              "Guidance for NRIs, Power of Attorney, and legal compliance.",
              "Transparent, reliable, and client-focused service at every stage.",
            ].map((text, idx) => (
              <motion.li
                key={idx}
                custom={idx}
                variants={listItemVariants}
                className="flex items-start gap-3"
              >
                <Check
                  className={`w-5 h-5 mt-0.5 ${
                    idx === 0 ? "text-indigo-400" : idx === 1 ? "text-pink-500" : "text-emerald-400"
                  }`}
                />
                <span>{text}</span>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg transition-transform hover:scale-[1.03]"
            style={{
              background: "linear-gradient(90deg,#4f46e5,#ec4899)",
              color: "#fff",
            }}
            variants={textVariants}
          >
            Learn More
          </motion.a>
        </motion.div>

        {/* RIGHT: image with overlay badge */}
        <motion.div
          className="relative"
          variants={imageVariants}
        >
          <div
            className="overflow-hidden rounded-2xl shadow-2xl border border-[rgba(255,255,255,0.04)] h-full"
            style={{
              background:
                "linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))",
            }}
          >
            <Image
              src={imageSrc}
              alt="Sai Kalyan Associates documentation service"
              width={700}
              height={1000}
              className="h-[500px] object-cover"
            />
          </div>

          {/* Experience badge */}
          <motion.div
            className="absolute bottom-4 left-4 rounded-lg px-4 py-2 shadow-md text-white"
            style={{
              background:
                "linear-gradient(135deg,rgba(79,70,229,0.85),rgba(236,72,153,0.85))",
              backdropFilter: "blur(8px)",
            }}
            variants={imageVariants}
          >
            <div className="text-2xl font-bold leading-none">10+</div>
            <div className="text-sm font-medium italic">
              Years of Documentation Experience
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}