"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

export default function HeroFancyContact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", hp: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });
  const submitRef = useRef(null);

  const prefersDark = true;

  const containerRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const leftVariant = {
    hidden: { opacity: 0, x: -18 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const rightVariant = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const blobVariant = {
    hidden: { opacity: 0 },
    visible: (dur = 9) => ({ opacity: 0.26, y: [0, -12, 0], x: [0, 6, 0], transition: { duration: dur, repeat: Infinity, ease: "easeInOut" } }),
  };

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.phone.trim()) e.phone = "Please enter your phone number.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be 10+ chars.";
    if (form.hp && form.hp.trim().length) e.hp = "Bot detected.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: false, ok: null, msg: "" });
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;
    setStatus({ loading: true, ok: null, msg: "Sending..." });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message: form.message }),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus({ loading: false, ok: true, msg: "Message sent — we'll be in touch!" });
      setForm({ name: "", email: "", phone: "", message: "", hp: "" });
      submitRef.current?.focus();
    } catch (err) {
      setStatus({ loading: false, ok: false, msg: "Failed to send — try again later." });
      console.error(err);
    }
  }

  const heroBgInline = {
    background: "linear-gradient(180deg, rgba(8,10,12,1) 0%, rgba(20,23,26,1) 100%)",
  };

  const glassStyle = () => ({ background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.04)" });

  const extraStyles = `
    .hero-blob{ position:absolute; border-radius:50%; filter: blur(42px); opacity:0.26; transform: translateZ(0); }
    @keyframes floatSlow { 0% { transform: translateY(0) translateX(0);} 50%{ transform: translateY(-12px) translateX(6px);} 100%{ transform: translateY(0) translateX(0);} }
    .service-card { transition: transform 220ms ease, box-shadow 220ms ease; }
    .service-card:hover { transform: translateY(-6px); box-shadow: 0 10px 30px rgba(16,24,40,0.35); }
  `;

  return (
    <section aria-label="Sai Kalyan hero" className="relative overflow-hidden" style={heroBgInline} ref={containerRef}>
      <style>{extraStyles}</style>

      <div aria-hidden className="pointer-events-none">
        <motion.div variants={blobVariant} custom={9} initial="hidden" animate={controls} className="hero-blob" style={{ width: 320, height: 320, left: -80, top: -120, background: "linear-gradient(135deg,#071028 0%,#0b1220 100%)" }} />
        <motion.div variants={blobVariant} custom={11} initial="hidden" animate={controls} className="hero-blob" style={{ width: 220, height: 220, right: -60, top: 40, background: "linear-gradient(135deg,#4f46e5 0%,#ec4899 100%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <motion.div variants={leftVariant} initial="hidden" animate={controls} className="space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.03)", color: "#a78bfa" }}>
              Trusted • Confidential • Fast
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold leading-tight" style={{ color: "#f8fafc" }}>
              Professional Document Writers & Registration Associates
            </h1>

            <p className="max-w-xl text-lg" style={{ color: "#cbd5e1" }}>
              Sai Kalyan Associates specialises in preparing, reviewing and submitting legal and property documentation to the appropriate registry authorities. We represent clients at Sub-Registrar Offices, ensure accuracy of paperwork, and help navigate the registration process smoothly.
            </p>

            <div className="flex gap-4 items-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href="#contact" className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold shadow-lg" style={{ background: "linear-gradient(90deg,#4f46e5,#ec4899)", color: "#fff" }}>
               <Link href='/contact'> Request a Quote</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href="/about" className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border" style={{ borderColor: "rgba(255,255,255,0.04)", color: "#e6eef8", background: "rgba(255,255,255,0.02)" }}>
                <Link href='/about'>About Us</Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5" style={{ color: "#a78bfa" }}>
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>Local Presence</div>
                  <div style={{ fontSize: 13, color: "#9ca3af" }}>Trusted in nearby registry offices</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5" style={{ color: "#fb7185" }}>
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>Transparent Fees</div>
                  <div style={{ fontSize: 13, color: "#9ca3af" }}>Clear pricing, no surprises</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5" style={{ color: "#34d399" }}>
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>Confidentiality</div>
                  <div style={{ fontSize: 13, color: "#9ca3af" }}>Private handling of documents</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div id="contact" variants={rightVariant} initial="hidden" animate={controls}>
            <motion.div whileHover={{ y: -4 }} className="rounded-2xl p-6 sm:p-8 shadow-2xl" style={{ width: "100%", ...glassStyle(), boxShadow: "0 10px 40px rgba(2,6,23,0.6)" }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold" style={{ color: "#fff" }}>Request a Quote</h3>
                  <p className="text-sm" style={{ color: "#9ca3af" }}>Quick form — we reply within 24 hours.</p>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#0f172a,#111827)" }} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                <input name="hp" value={form.hp} onChange={(e) => setForm(s => ({ ...s, hp: e.target.value }))} style={{ display: "none" }} tabIndex="-1" autoComplete="off" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex flex-col">
                    <span className="text-xs font-medium" style={{ color: "#cbd5e1" }}>Name</span>
                    <input required value={form.name} onChange={(e) => setForm(s => ({ ...s, name: e.target.value }))} className="px-3 py-2 rounded-lg border" style={{ borderColor: errors.name ? "#ef4444" : "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#e6eef8" }} />
                    {errors.name && <span className="text-xs" style={{ color: "#ef4444" }}>{errors.name}</span>}
                  </label>

                  <label className="flex flex-col">
                    <span className="text-xs font-medium" style={{ color: "#cbd5e1" }}>Email</span>
                    <input required value={form.email} onChange={(e) => setForm(s => ({ ...s, email: e.target.value }))} className="px-3 py-2 rounded-lg border" style={{ borderColor: errors.email ? "#ef4444" : "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#e6eef8" }} type="email" />
                    {errors.email && <span className="text-xs" style={{ color: "#ef4444" }}>{errors.email}</span>}
                  </label>
                </div>

                <label className="flex flex-col">
                  <span className="text-xs font-medium" style={{ color: "#cbd5e1" }}>Phone</span>
                  <input required value={form.phone} onChange={(e) => setForm(s => ({ ...s, phone: e.target.value }))} className="px-3 py-2 rounded-lg border" style={{ borderColor: errors.phone ? "#ef4444" : "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#e6eef8" }} type="tel" />
                  {errors.phone && <span className="text-xs" style={{ color: "#ef4444" }}>{errors.phone}</span>}
                </label>

                <label className="flex flex-col">
                  <span className="text-xs font-medium" style={{ color: "#cbd5e1" }}>Message</span>
                  <textarea required rows={4} value={form.message} onChange={(e) => setForm(s => ({ ...s, message: e.target.value }))} className="px-3 py-2 rounded-lg border" style={{ borderColor: errors.message ? "#ef4444" : "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#e6eef8" }} />
                  {errors.message && <span className="text-xs" style={{ color: "#ef4444" }}>{errors.message}</span>}
                </label>

                <div className="flex items-center gap-3">
                  <button ref={submitRef} type="submit" disabled={status.loading} className="px-5 py-2 rounded-full font-semibold inline-flex items-center gap-2" style={{ background: status.loading ? "linear-gradient(90deg,#a78bfa,#fb7185)" : "linear-gradient(90deg,#4f46e5,#ec4899)", color: "#fff", boxShadow: "0 8px 30px rgba(79,70,229,0.14)" }}>
                    {status.loading ? "Sending..." : "Send Enquiry"}
                  </button>

                 
                </div>

                <div role="status" aria-live="polite" className="mt-2 min-h-5">
                  {status.ok === true && <div style={{ color: "#10b981" }}>{status.msg}</div>}
                  {status.ok === false && <div style={{ color: "#ef4444" }}>{status.msg}</div>}
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
