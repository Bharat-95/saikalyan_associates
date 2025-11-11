"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimationControls } from "framer-motion";



const STATS = [
  { label: "Documents Processed", value: "10000+" },
  { label: "Satisfied Clients", value: "900+" },
  { label: "Years Experience", value: "10+" },
  { label: "Partnered Developers", value: "40+" },
];

const MILESTONES = [
  {
    year: "2024",
    title: "Recognized as a Leading Documentation Partner in Hyderabad",
    desc: "Sai Kalyan Associates built a strong reputation across Hyderabad for precise, transparent, and reliable documentation services.",
  },
  {
    year: "2022",
    title: "Crossed 3000+ successful registrations",
    desc: "Surpassed a major milestone in handling residential and commercial registrations with zero compliance delays.",
  },
  {
    year: "2020",
    title: "Introduced Digital Documentation Desk",
    desc: "Enabled remote drafting and e-registration support, assisting clients during the pandemic without service interruption.",
  },
  {
    year: "2018",
    title: "Recognized for Reliable Legal Support",
    desc: "Consistently rated among top document consultancy services for transparent processes and strong turnaround times.",
  },
];

export default function TrackRecord() {
  const ref = useRef(null);
  // replay animations every time it enters the viewport
  const isInView = useInView(ref, { once: false, margin: "-120px" });
  const controls = useAnimationControls();

  // counters state
  const [counters, setCounters] = useState(STATS.map(() => 0));

  // helper: parse numeric value and whether it has '+' suffix
  const parseStat = (v) => {
    const hasPlus = String(v).trim().endsWith("+");
    const num = parseInt(String(v).replace(/[^\d]/g, ""), 10) || 0;
    return { num, hasPlus };
  };

  // animate a single counter from 0 to target over duration (ms)
  const animateValue = (index, target, duration = 800) => {
    let start = null;
    const from = 0;
    const delta = target - from;

    function step(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);
      const current = Math.round(from + delta * eased);
      setCounters((prev) => {
        const next = [...prev];
        next[index] = current;
        return next;
      });
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  };

  // simple cubic easing
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  // run animations when in view; reset when out of view so it replays next time
  useEffect(() => {
    if (isInView) {
      // start section animations
      controls.start("visible");

      // animate counters with small stagger
      STATS.forEach((s, i) => {
        const { num } = parseStat(s.value);
        animateValue(i, num, 900 + i * 120);
      });
    } else {
      // reset visuals & counters so animations replay next time
      controls.start("hidden");
      setCounters(STATS.map(() => 0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  // motion variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, when: "beforeChildren" } },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" } }),
  };

  const milestoneVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" } }),
  };

  return (
    <motion.section
      ref={ref}
      className="relative bg-[#06070a] text-slate-100 overflow-hidden"
      style={{ background: "radial-gradient(circle at top left,#0b1220 0%, #06070a 80%)" }}
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 space-y-16">
        {/* Header */}
        <motion.header className="text-center space-y-4" variants={sectionVariants}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/6 text-xs font-semibold text-[#c7b6ff]">
            Proven Results
          </div>

          <motion.h1 className="text-4xl md:text-5xl font-extrabold text-white" variants={sectionVariants}>
            Our Track Record
          </motion.h1>

          <motion.p className="max-w-2xl mx-auto text-slate-400 text-lg" variants={sectionVariants}>
            Over the years, we’ve helped hundreds of clients navigate property and legal documentation with confidence and speed.
          </motion.p>
        </motion.header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s, idx) => {
            const { hasPlus } = parseStat(s.value);
            return (
              <motion.div
                key={s.label}
                className="rounded-2xl bg-gradient-to-b from-white/5 to-white/2 border border-white/10 p-6 shadow-lg"
                custom={idx}
                variants={statVariants}
              >
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
                  {counters[idx]}
                  {hasPlus && <span className="ml-1">+</span>}
                </div>
                <p className="mt-2 text-sm text-slate-400 font-medium">{s.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline / Milestones */}
        <div className="relative mt-12">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 via-white/10 to-pink-500/40 hidden md:block" />
          <div className="space-y-10 md:space-y-16">
            {MILESTONES.map((m, idx) => (
              <motion.div
                key={idx}
                className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 ? "md:flex-row-reverse" : ""}`}
                custom={idx}
                variants={milestoneVariants}
              >
                <div className="flex-1 md:text-right space-y-2">
                  <h3 className="text-lg font-semibold text-white">{m.year}</h3>
                  <h4 className="text-xl font-bold text-white/90">{m.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-md ml-auto md:ml-0">{m.desc}</p>
                </div>

                <div className="hidden md:block w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 shadow-lg shadow-pink-500/20" />

                <div className="flex-1 md:text-left space-y-2">
                  <div className="hidden md:block h-px w-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

       
      </div>
    </motion.section>
  );
}
