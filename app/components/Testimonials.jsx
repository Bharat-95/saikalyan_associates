"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TestimonialsCarousel({
  testimonials = [
    { name: "Rajesh Kumar", text: "Their professionalism and accuracy in property documentation saved us from a huge legal issue. Highly recommended!" },
    { name: "Priya Sharma", text: "Fast turnaround and clear communication — exactly what we needed while registering our first property." },
    { name: "Anil Reddy", text: "Exceptional clarity and support. Sai Kalyan Associates made complex documentation look easy." },
    { name: "Meena Gupta", text: "They guided us through everything — paperwork, registration and follow-up. Very reliable." },
    { name: "Vikram Patel", text: "Transparent fees and timely responses. Great team to work with." },
    { name: "Sunita Rao", text: "Extremely supportive during the entire property transfer process." },
    { name: "Karthik", text: "Prompt, professional and meticulous. Saved us time and stress." },
    { name: "Divya", text: "Clear communication and great on-ground follow-up at registrar's office." },
    { name: "Suresh", text: "Handled our NRI POA smoothly and completed registration remotely." },
    { name: "Nisha", text: "Excellent service — documents were well prepared and submitted on time." },
    { name: "Ramesh", text: "Highly recommended for anyone needing reliable document support." },
    { name: "Geeta", text: "Polite staff, precise drafting, no hidden costs." },
  ],
  intervalMs = 5000,
}) {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(3);
  const [index, setIndex] = useState(0);
  const [isTransitionEnabled, setTransitionEnabled] = useState(true);
  const timerRef = useRef(null);

  // responsive visible count
  useEffect(() => {
    function calcVisible() {
      if (window.innerWidth >= 1024) setVisible(3);
      else if (window.innerWidth >= 768) setVisible(2);
      else setVisible(1);
    }
    calcVisible();
    window.addEventListener("resize", calcVisible);
    return () => window.removeEventListener("resize", calcVisible);
  }, []);

  // Reset index when visible changes
  useEffect(() => {
    setIndex(0);
    setTransitionEnabled(false);
    containerRef.current?.offsetHeight; // force reflow
    setTimeout(() => setTransitionEnabled(true), 30);
  }, [visible]);

  // Auto-scroll interval
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIndex((prev) => prev + 1), intervalMs);
    return () => clearInterval(timerRef.current);
  }, [intervalMs]);

  // Loop handling
  useEffect(() => {
    const n = testimonials.length;
    if (index > n) {
      setTransitionEnabled(false);
      setIndex(0);
      containerRef.current?.offsetHeight;
      setTimeout(() => setTransitionEnabled(true), 20);
    }
  }, [index, testimonials.length]);

  // --- FIX: use vw so full-width track, not container width ---
  const slideWidthVw = 100 / visible;
  const rendered = [...testimonials, ...testimonials.slice(0, visible)];
  const trackWidthVw = rendered.length * slideWidthVw;
  const translateVw = index * slideWidthVw;

  return (
    <section className="relative py-14 bg-[#06070a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10 space-y-8 text-center">
        <motion.h1 className="text-4xl md:text-5xl font-extrabold text-white">
          Client Words
        </motion.h1>
        <motion.p className="max-w-2xl mx-auto text-slate-400 text-lg">
          What our clients say about Sai Kalyan Associates
        </motion.p>
      </div>

      <div className="relative overflow-hidden w-screen left-1/2 -translate-x-1/2">
        <div
          ref={containerRef}
          className="flex will-change-transform"
          style={{
            width: `${trackWidthVw}vw`,
            transform: `translateX(-${translateVw}vw)`,
            transition: isTransitionEnabled
              ? "transform 700ms cubic-bezier(.2,.9,.2,1)"
              : "none",
          }}
        >
          {rendered.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="px-3"
              style={{ width: `${slideWidthVw}vw`, flexShrink: 0 }}
            >
              <div
                className="p-[1px] rounded-2xl h-44"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                }}
              >
                <article className="h-full rounded-2xl p-6 bg-[rgba(15,15,20,0.9)] backdrop-blur-sm flex flex-col justify-between">
                  <p className="text-slate-300 italic leading-relaxed text-sm">
                    “{t.text}”
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <div className="text-white font-semibold">{t.name}</div>
                      {t.role && (
                        <div className="text-slate-400 text-xs">{t.role}</div>
                      )}
                    </div>
                    <div className="text-indigo-300 font-semibold">★</div>
                  </div>
                </article>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button
            aria-label="Previous testimonials"
            className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            onClick={() => setIndex((p) => (p > 0 ? p - 1 : testimonials.length - 1))}
          >
            ‹
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <button
            aria-label="Next testimonials"
            className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            onClick={() => setIndex((p) => p + 1)}
          >
            ›
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {testimonials.map((_, dotIdx) => {
          const active = index % testimonials.length === dotIdx;
          return (
            <button
              key={dotIdx}
              onClick={() => setIndex(dotIdx)}
              className={`w-2 h-2 rounded-full transition ${
                active ? "bg-indigo-400" : "bg-white/10"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
