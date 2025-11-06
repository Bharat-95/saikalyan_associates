"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimationControls } from "framer-motion";

const SERVICES = [
  {
    id: "property-documentation",
    title: "Property Documentation",
    desc: "Preparation & registration of Sale Deeds, Agreements to Sale, Gift & Relinquishment deeds with full compliance.",
  },
  {
    id: "title-verification",
    title: "Title & Legal Verification",
    desc: "Comprehensive title search, encumbrance certificate checks (EC), approvals and litigation screening.",
  },
  {
    id: "registration-mutation",
    title: "Registration & Mutation",
    desc: "Assistance with registration, transfer of ownership and updating land records (mutation) with authorities.",
  },
  {
    id: "nri-services",
    title: "NRI Advisory & POA",
    desc: "POA drafting, attestation and remote registry support tailored for NRIs and overseas clients.",
  },
  {
    id: "relinquishment-gift",
    title: "Gift & Relinquishment Deeds",
    desc: "Family transfers with carefully drafted deeds to reduce future disputes and ensure smooth registration.",
  },
  {
    id: "developer-support",
    title: "Developer / Builder Legal Support",
    desc: "Drafting development agreements, MOUs, project documentation and joint-venture arrangements.",
  },
  {
    id: "document-review",
    title: "Document Review & Legal Notes",
    desc: "Fast, practical redlines and legal opinion notes to reduce risk before signing.",
  },
  {
    id: "rental-agreement",
    title: "Rental Agreements & Tenancy",
    desc: "Drafting and registration of lease/rental agreements with tenant-protecting clauses and eviction safeguards.",
  },
];

export default function ServicesPanel({
  heading = "Our Services",
  sub = "Professional document & property services — clear, reliable and fast.",
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

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.3, ease: "easeOut", type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="relative bg-[#06070a] text-slate-100"
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT large column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.h2
              className="text-4xl lg:text-5xl font-extrabold leading-tight text-white"
              variants={headingVariants}
            >
              {heading}
            </motion.h2>

            <motion.p
              className="text-slate-300 max-w-lg"
              variants={headingVariants}
            >
              {sub}
            </motion.p>

            <motion.div
              className="mt-8 grid grid-cols-2 gap-3"
              variants={statVariants}
            >
              <div className="rounded-xl p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]">
                <div className="text-xs text-slate-400">Docs processed</div>
                <div className="text-lg font-semibold text-white">1000+</div>
              </div>
              <div className="rounded-xl p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]">
                <div className="text-xs text-slate-400">Response time</div>
                <div className="text-lg font-semibold text-white">24–48h</div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SERVICES.map((s, idx) => (
                <motion.article
                  key={s.id}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  animate={controls}
                  className="group relative rounded-2xl p-6 bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)] shadow-sm hover:shadow-lg transition-shadow transform hover:-translate-y-1 focus-within:-translate-y-1"
                  tabIndex={0}
                >
                  <div className="absolute left-[-10px] top-6">
                    <span
                      className={`block w-3 h-3 rounded-sm ${
                        idx % 3 === 0 ? "bg-amber-400" : idx % 3 === 1 ? "bg-indigo-400" : "bg-pink-400"
                      }`}
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{s.desc}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <a
                      href={`/services/${s.id}`}
                      className="text-sm font-medium text-[#c7b6ff] hover:text-white"
                    >
                      Learn more →
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}