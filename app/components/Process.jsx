"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimationControls } from "framer-motion";
import { CheckCircle, FileText, Users, BookOpen, ClipboardCheck } from "lucide-react";

const PROCESS_STEPS = [
  {
    id: "consultation",
    title: "Initial Consultation",
    desc: "We discuss your needs, review requirements, and outline the documentation process tailored to your property or legal goals.",
    icon: Users,
  },
  {
    id: "drafting",
    title: "Document Drafting",
    desc: "Our experts craft precise documents — from Sale Deeds to POAs — ensuring compliance and clarity in every detail.",
    icon: FileText,
  },
  {
    id: "review",
    title: "Verification & Review",
    desc: "Thorough title searches, encumbrance checks, and legal reviews are done to make your documentation risk-free.",
    icon: BookOpen,
  },
  {
    id: "registration",
    title: "Registration & Completion",
    desc: "We handle registration, mutation, and final submissions — ensuring smooth processing with zero stress.",
    icon: ClipboardCheck,
  },
];

export default function OurProcess({
  heading = "Our Process",
  sub = "A transparent, streamlined, and efficient approach — ensuring you get it right, the first time.",
}) {
  const ref = useRef(null);
  // track visibility (not "once") so it triggers on every enter
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const controls = useAnimationControls();

  // **Changed behavior:** toggle animations on enter/leave so it runs every time.
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const stepVariants = {
    hidden: (i) => ({ opacity: 0, y: 50, scale: 0.98 }),
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
    }),
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <motion.section
      ref={ref}
      className="relative text-slate-100 py-20 lg:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(8,10,12,1) 0%, rgba(20,23,26,1) 100%)",
      }}
      initial="hidden"
      animate={controls}
    >
      {/* glowing background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-32 -top-32 w-[28rem] h-[28rem] rounded-full blur-[100px] opacity-25"
          style={{
            background: "linear-gradient(135deg,#071028,#0b1220)",
          }}
        />
        <motion.div
          className="absolute -right-20 top-10 w-[20rem] h-[20rem] rounded-full blur-[90px] opacity-25"
          style={{
            background: "linear-gradient(135deg,#4f46e5,#ec4899)",
          }}
        />
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center mb-16"
        variants={headerVariants}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-pink-600 flex items-center justify-center text-white font-bold text-xs">
            🔄
          </div>
          <span className="text-indigo-300 font-medium text-sm tracking-wide">How We Work</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">{heading}</h2>
        <p className="text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed text-base sm:text-lg">{sub}</p>
      </motion.div>

      {/* process timeline grid */}
      <div className="max-w-6xl mx-auto relative">
        {/* gradient line connector */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-pink-500 to-transparent opacity-40 -translate-x-1/2" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.id}
                custom={idx}
                variants={stepVariants}
                initial="hidden"
                animate={controls}
                className={`relative group rounded-2xl p-6 sm:p-8 border border-[rgba(255,255,255,0.05)] shadow-lg transition-all duration-300 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm ${idx % 2 === 0 ? "lg:mr-12" : "lg:ml-12"}`}
              >
                {/* connector dot */}
                <div
                  className={`hidden lg:block absolute top-10 ${idx % 2 === 0 ? "right-[-16px]" : "left-[-16px]"} w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 shadow-lg`}
                ></div>

                {/* icon */}
                <div
                  className="flex-none w-14 h-14 rounded-xl flex items-center justify-center mb-5 mx-auto lg:mx-0"
                  style={{
                    background: `linear-gradient(135deg, ${idx % 3 === 0 ? "#4f46e5" : idx % 3 === 1 ? "#ec4899" : "#a78bfa"}, rgba(255,255,255,0.05))`,
                  }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* text */}
                <h3 className="text-xl font-semibold text-white mb-2">{idx + 1}. {step.title}</h3>
                <p className="text-slate-300 leading-relaxed">{step.desc}</p>

                <div className="mt-4">
                  <a href="/contact" className="text-sm text-indigo-400 hover:text-pink-400 font-medium">Learn more →</a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
