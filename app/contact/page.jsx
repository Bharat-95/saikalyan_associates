"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";

/**
 * ContactPage.jsx
 * - Dark themed, compact, trendy layout (matches hero theme)
 * - Framer Motion animations that trigger every time section enters view
 * - Contact form posts to /api/contact (replace with your endpoint)
 * - Uses inline fallbacks so it looks good without Tailwind build issues
 *
 * Usage: import and render <ContactPage /> on your /contact route.
 */

function SectionMotion({ children, threshold = 0.25, delay = 0 }) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, amount: threshold });

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    hp: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.phone.trim()) e.phone = "Please enter your phone.";
    if (!form.message.trim() || form.message.trim().length < 8)
      e.message = "Message must be at least 8 characters.";
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
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus({
        loading: false,
        ok: true,
        msg: "Message sent — we'll be in touch!",
      });
      setForm({ name: "", email: "", phone: "", message: "", hp: "" });
    } catch (err) {
      console.error(err);
      setStatus({
        loading: false,
        ok: false,
        msg: "Failed to send — try again later.",
      });
    }
  }

  // Small helper to set fields
  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  return (
    <main className="bg-[#050507] text-slate-100 min-h-screen">
      {/* Page container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* HERO */}
        <SectionMotion>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/6 text-xs font-semibold text-[#c7b6ff]">
              <MapPin className="w-4 h-4" /> Get in touch
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold mt-4 mb-2"
              style={{ color: "#f8fafc" }}
            >
              Contact Sai Kalyan Associates
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400">
              For document drafting, registration, NRI support or quick advice —
              reach out and we’ll respond within 24–48 hours.
            </p>
          </div>
        </SectionMotion>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Form */}
          <div className="lg:col-span-7">
            <SectionMotion delay={0.05}>
              <div
                className="p-[1px] rounded-2xl mb-6"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#4f46e5 0%,#ec4899 100%)",
                }}
              >
                <div className="bg-[#06070a] rounded-2xl p-6 md:p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Send us a message
                  </h2>
                  <p className="text-slate-400 mb-4">
                    Tell us briefly what you need and we'll call or email you
                    back.
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    <input
                      name="hp"
                      value={form.hp}
                      onChange={(e) => update("hp", e.target.value)}
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <label className="flex flex-col">
                        <span className="text-xs text-slate-300 mb-1">
                          Name
                        </span>
                        <input
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          className="px-3 py-2 rounded-lg border bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.04)] text-white"
                          aria-invalid={!!errors.name}
                          aria-describedby={
                            errors.name ? "err-name" : undefined
                          }
                        />
                        {errors.name && (
                          <span
                            id="err-name"
                            className="text-xs text-rose-400 mt-1"
                          >
                            {errors.name}
                          </span>
                        )}
                      </label>

                      <label className="flex flex-col">
                        <span className="text-xs text-slate-300 mb-1">
                          Email
                        </span>
                        <input
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className="px-3 py-2 rounded-lg border bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.04)] text-white"
                          type="email"
                          aria-invalid={!!errors.email}
                          aria-describedby={
                            errors.email ? "err-email" : undefined
                          }
                        />
                        {errors.email && (
                          <span
                            id="err-email"
                            className="text-xs text-rose-400 mt-1"
                          >
                            {errors.email}
                          </span>
                        )}
                      </label>
                    </div>

                    <div className="mt-3">
                      <label className="flex flex-col">
                        <span className="text-xs text-slate-300 mb-1">
                          Phone
                        </span>
                        <input
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          className="px-3 py-2 rounded-lg border bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.04)] text-white"
                          type="tel"
                          aria-invalid={!!errors.phone}
                          aria-describedby={
                            errors.phone ? "err-phone" : undefined
                          }
                        />
                        {errors.phone && (
                          <span
                            id="err-phone"
                            className="text-xs text-rose-400 mt-1"
                          >
                            {errors.phone}
                          </span>
                        )}
                      </label>
                    </div>

                    <div className="mt-3">
                      <label className="flex flex-col">
                        <span className="text-xs text-slate-300 mb-1">
                          Message
                        </span>
                        <textarea
                          value={form.message}
                          onChange={(e) => update("message", e.target.value)}
                          rows={5}
                          className="px-3 py-2 rounded-lg border bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.04)] text-white resize-none"
                          aria-invalid={!!errors.message}
                          aria-describedby={
                            errors.message ? "err-message" : undefined
                          }
                        />
                        {errors.message && (
                          <span
                            id="err-message"
                            className="text-xs text-rose-400 mt-1"
                          >
                            {errors.message}
                          </span>
                        )}
                      </label>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={status.loading}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold"
                        style={{
                          background: status.loading
                            ? "linear-gradient(90deg,#a78bfa,#fb7185)"
                            : "linear-gradient(90deg,#4f46e5,#ec4899)",
                          color: "#fff",
                        }}
                      >
                        {status.loading ? "Sending..." : "Send Message"}
                      </button>
                    </div>

                    <div
                      className="mt-3 min-h-[1.25rem] text-sm"
                      role="status"
                      aria-live="polite"
                    >
                      {status.ok === true && (
                        <div className="text-emerald-400">{status.msg}</div>
                      )}
                      {status.ok === false && (
                        <div className="text-rose-400">{status.msg}</div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </SectionMotion>
          </div>

          {/* RIGHT: Contact details / map */}
          <div className="lg:col-span-5 space-y-6">
            <SectionMotion delay={0.08}>
              <div
                className="p-[1px] rounded-2xl"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#4f46e5 0%,#ec4899 100%)",
                }}
              >
                <div className="bg-[#06070a] rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Contact Details
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-md bg-white/6 flex items-center justify-center text-indigo-300">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-slate-300">Call / WhatsApp</div>
                        <div className="font-semibold text-white">
                          +91 88972 03663
                        </div>
                        <div className="font-semibold text-white">
                          +91 91773 05608
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-md bg-white/6 flex items-center justify-center text-indigo-300">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-slate-300">Email</div>
                        <div className="font-semibold text-white">
                          saikalyan17171@gmail.com
                        </div>
                        <div className="font-semibold text-white">
                          saikalyanagency14@gmail.com
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-md bg-white/6 flex items-center justify-center text-indigo-300">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-slate-300">City</div>
                        <div className="font-semibold text-white">
                          Hyderabad
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-md bg-white/6 flex items-center justify-center text-indigo-300">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-slate-300">Hours</div>
                        <div className="font-semibold text-white">
                          Mon — Sat: 9:30 AM — 7:30 PM
                        </div>
                        <div className="text-slate-400 text-sm">
                          Closed on Sundays & public holidays
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social */}
                  <div className="mt-6 flex gap-3">
                    <a
                      href="https://www.instagram.com/shiva_drithi?igsh=dXdha2c0c3VvcjZn&utm_source=qr"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/6 hover:bg-white/8"
                    >
                      <Instagram className="w-4 h-4 text-pink-400" />{" "}
                      <span className="text-sm text-slate-100">Instagram</span>
                    </a>
                    <a
                      href="https://www.facebook.com/share/1GwBME8XvD/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/6 hover:bg-white/8"
                    >
                      <Facebook className="w-4 h-4 text-indigo-400" />{" "}
                      <span className="text-sm text-slate-100">Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </SectionMotion>

            {/* responsive map - put this where your map should render */}
            <div
              className="rounded-2xl overflow-hidden p-[1px]"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#6366f1 0%,#ec4899 100%)",
              }}
            >
              <div className="bg-[#0b0b0f] h-56 md:h-64 rounded-2xl border border-white/10">
                <iframe
                  title="Sai Kalyan Associates — Hyderabad location"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3833.3851610348597!2d78.6290747049091!3d17.416295263568973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDI0JzU4LjciTiA3OMKwMzcnNTMuOSJF!5e0!3m2!1sen!2sin!4v1762411968259!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen={true}
                  style={{ border: 0 }}
                />
              </div>
            </div>

            <SectionMotion delay={0.16}>
              <div className="rounded-2xl p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] text-sm">
                <strong className="text-white">Quick FAQ</strong>
                <ul className="mt-2 space-y-2 text-slate-300">
                  <li>
                    <strong>How long to prepare documents?</strong> Typically
                    1–3 business days depending on the service and verification
                    needs.
                  </li>
                  <li>
                    <strong>Do you represent at Sub-Registrar?</strong> Yes — we
                    represent clients for registration and follow-up in
                    Hyderabad.
                  </li>
                </ul>
              </div>
            </SectionMotion>
          </div>
        </div>
      </div>
    </main>
  );
}
