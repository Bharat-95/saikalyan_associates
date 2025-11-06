"use client";
import React, { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Testimonials from '../components/Testimonials'

// Section animation helper component
function SectionMotion({ children, delay = 0 }) {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: "easeOut" },
    },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
}

export default function ServicesPage() {
  const SERVICES = [
    {
      title: "Property Documentation",
      desc: "From sale deeds to gift deeds — we prepare, verify, and register all legal property documents with accuracy and speed.",
    },
    {
      title: "Title & Legal Verification",
      desc: "Comprehensive title search, EC checks, approvals, and litigation screening for complete property confidence.",
    },
    {
      title: "Registration & Mutation",
      desc: "We manage the full process — drafting, appointments, submission, and mutation follow-up at local registry offices.",
    },
    {
      title: "NRI Advisory & Power of Attorney",
      desc: "End-to-end NRI property support including POA drafting, attestation, and remote registration handling.",
    },
    {
      title: "Developer & Builder Support",
      desc: "We assist real estate developers in preparing agreements, project approvals, and compliance documentation.",
    },
    {
      title: "Document Review & Legal Drafting",
      desc: "Get expert-reviewed drafts and risk-free documentation tailored for your unique requirements.",
    },
  ];

  return (
    <section className="relative bg-[#050507] text-slate-100 overflow-hidden">
      {/* Background gradients */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 w-[40rem] h-[40rem] rounded-full blur-[140px] opacity-25 bg-gradient-to-br from-indigo-600 to-pink-500"></div>
        <div className="absolute -right-40 bottom-0 w-[35rem] h-[35rem] rounded-full blur-[140px] opacity-25 bg-gradient-to-tl from-pink-500 to-indigo-500"></div>
      </div>

      {/* Hero Section */}
      <SectionMotion>
        <div className="max-w-6xl mx-auto px-6 py-24 text-center space-y-6">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-white"
            whileInView={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1 }}
          >
            Our Services
          </motion.h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            Transparent, precise, and professional documentation — from
            verification to registration.
          </p>
        </div>
      </SectionMotion>

      {/* About / Overview */}
      <SectionMotion delay={0.1}>
        <div className="max-w-5xl mx-auto px-6 py-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Making Documentation Effortless
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            At <span className="text-indigo-400 font-semibold">Sai Kalyan Associates</span>, we
            believe property documentation should be clear, compliant, and
            stress-free. Our experienced team ensures every document is verified,
            legally accurate, and ready for registration without delays.
          </p>
        </div>
      </SectionMotion>

      {/* Services Grid */}
      <SectionMotion delay={0.2}>
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 12px 30px rgba(236,72,153,0.15)",
              }}
              transition={{ type: "spring", stiffness: 120 }}
              className="p-[1px] rounded-2xl bg-gradient-to-br from-indigo-600/40 to-pink-500/40"
            >
              <div className="rounded-2xl bg-[#06070a]/95 backdrop-blur-sm p-6 h-full flex flex-col justify-between border border-white/10">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <a
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-pink-400 transition"
                >
                  Get Assistance →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        <Testimonials/>
      </SectionMotion>

      {/* Why Choose Us Section */}
      <SectionMotion delay={0.3}>
        <div className="max-w-6xl mx-auto px-6 py-20 text-center space-y-10">
          <h2 className="text-3xl font-bold text-white">
            Why Clients Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                title: "Experienced Team",
                desc: "Led by experts with 10+ years of field and registry experience.",
              },
              {
                title: "Trusted Process",
                desc: "Every document undergoes verification and quality control.",
              },
              {
                title: "Transparent Pricing",
                desc: "Clear costs with no hidden fees or unexpected add-ons.",
              },
              {
                title: "End-to-End Support",
                desc: "From initial drafting to registration and handover.",
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-[rgba(255,255,255,0.02)] border border-white/10 p-6 hover:bg-[rgba(255,255,255,0.05)] transition"
              >
                <h4 className="text-lg font-semibold text-white mb-2">
                  {v.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionMotion>

      

      {/* CTA Section */}
      <SectionMotion delay={0.4}>
        <div className="max-w-4xl mx-auto text-center px-6 py-20">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-[1px] rounded-3xl bg-gradient-to-r from-indigo-500 to-pink-500"
          >
            <div className="bg-[#06070a]/95 rounded-3xl p-10 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-3">
                Ready to Get Started?
              </h2>
              <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
                Let our documentation experts help you get your property papers
                verified, prepared, and registered smoothly.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.05] transition-transform"
              >
                Contact Us Today →
              </a>
            </div>
          </motion.div>
        </div>
        
      </SectionMotion>
    </section>
  );
}
