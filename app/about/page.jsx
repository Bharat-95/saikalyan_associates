"use client";
import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import AboutFounder from "../components/Founder";

/**
 * AboutPage.jsx
 * - Uses SectionMotion wrapper for clean per-section scroll-triggered animations
 * - Layout / copy preserved from your previous version
 * - Animations retrigger whenever section scrolls into view
 */

function SectionMotion({ children, variantKey = "fadeUp", delay = 0 }) {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.25 });

  React.useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay,
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <section className="relative min-h-screen bg-[#050507] text-slate-100 overflow-hidden">
      {/* Background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 w-[40rem] h-[40rem] rounded-full blur-[120px] opacity-25 bg-gradient-to-br from-indigo-500 to-pink-500" />
        <div className="absolute -right-40 bottom-0 w-[30rem] h-[30rem] rounded-full blur-[120px] opacity-25 bg-gradient-to-tl from-pink-500 to-indigo-500" />
      </div>

      <AboutFounder />

      {/* Hero / Intro */}
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <SectionMotion>
          <div className="text-center space-y-6">
            <motion.h1
              whileInView={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="text-4xl md:text-5xl font-extrabold text-white"
            >
              Our Story
            </motion.h1>

            <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Sai Kalyan Associates was founded with a simple belief — that
              property documentation and legal processes should be transparent,
              timely, and stress-free. What started as a small document desk in
              Hyderabad has now become a trusted name in legal documentation and
              registry support.
            </p>
          </div>
        </SectionMotion>

        {/* Glassmorphic Story Block */}
        <SectionMotion delay={0.12}>
          <div className="relative mt-16 rounded-3xl p-10 md:p-16 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm border border-white/10">
            <motion.div
              className="absolute -top-10 left-6 bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-xs px-4 py-1 rounded-full font-semibold shadow-md"
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              About Sai Kalyan Associates
            </motion.div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Legal Clarity. Local Expertise.</h2>

              <p className="text-slate-300 leading-relaxed max-w-3xl">
                We specialize in document drafting, registration assistance, title
                checks, NRI property support, and advisory services — all under
                one roof. Our team ensures each document is compliant, verified,
                and registry-ready.
                <br />
                <br />
                We understand the complexities of real estate law and the anxiety
                around transactions. That’s why we created a service where
                professionalism meets personal care. Whether it’s a first-time
                homebuyer or a major property developer, our process is always
                transparent, secure, and efficient.
              </p>
            </div>
          </div>
        </SectionMotion>

        {/* Vision / Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          <SectionMotion delay={0.08}>
            <div className="p-[1px] rounded-2xl" style={{ backgroundImage: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)" }}>
              <div className="bg-[#06070a] rounded-2xl p-8 h-full flex flex-col justify-between">
                <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
                <p className="text-slate-300 leading-relaxed">
                  To simplify property documentation and legal processes across
                  India — bringing clarity, confidence, and convenience to every
                  client we serve.
                </p>
                <div className="mt-6 text-sm text-indigo-300 italic">“A seamless documentation experience, for everyone.”</div>
              </div>
            </div>
          </SectionMotion>

          <SectionMotion delay={0.14}>
            <div className="p-[1px] rounded-2xl" style={{ backgroundImage: "linear-gradient(135deg, #ec4899 0%, #6366f1 100%)" }}>
              <div className="bg-[#06070a] rounded-2xl p-8 h-full flex flex-col justify-between">
                <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
                <p className="text-slate-300 leading-relaxed">
                  To empower clients with transparent documentation, accurate
                  verification, and legal assurance — ensuring every property
                  transfer or registration happens without worry or delay.
                </p>
                <div className="mt-6 text-sm text-pink-300 italic">“We make your documents work for you.”</div>
              </div>
            </div>
          </SectionMotion>
        </div>

        {/* Values Section */}
        <SectionMotion delay={0.16}>
          <div className="mt-24">
            <motion.h2
              className="text-3xl font-bold text-center text-white mb-8"
              whileInView={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 1 }}
            >
              Our Core Values
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Integrity", desc: "We uphold honesty, fairness, and confidentiality in every client interaction." },
                { title: "Transparency", desc: "Clear communication and predictable timelines — no hidden surprises." },
                { title: "Expertise", desc: "Over a decade of combined experience in real estate documentation and registry support." },
                { title: "Efficiency", desc: "Our streamlined digital workflow saves time while ensuring full compliance." },
              ].map((v, idx) => (
                <SectionMotion key={v.title} delay={0.18 + idx * 0.05}>
                  <div className="rounded-xl bg-[rgba(255,255,255,0.02)] border border-white/10 p-6 hover:scale-[1.04] hover:bg-[rgba(255,255,255,0.05)] transition-transform">
                    <h4 className="text-lg font-semibold text-white mb-2">{v.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </SectionMotion>
              ))}
            </div>
          </div>
        </SectionMotion>

        {/* CTA */}
        <SectionMotion delay={0.2}>
          <div className="text-center mt-20">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to simplify your documentation?</h2>
            <p className="text-slate-400 mb-6">
              Connect with Sai Kalyan Associates today — professional, transparent,
              and reliable.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg transition-transform"
              style={{ background: "linear-gradient(90deg,#4f46e5,#ec4899)", color: "#fff" }}
            >
              Get In Touch
            </motion.a>
          </div>
        </SectionMotion>
      </div>
    </section>
  );
}
