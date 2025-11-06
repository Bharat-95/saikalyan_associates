"use client";
import React from "react";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#050507] text-slate-300 py-10 border-t border-white/5 overflow-hidden">
      {/* Gradient glow background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full blur-[120px] opacity-25 bg-gradient-to-br from-[#6366f1] to-[#ec4899]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 bg-gradient-to-tr from-[#ec4899] to-[#6366f1]" />
      </div>

      {/* Top border line */}
      <div
        className="absolute top-0 left-0 w-full h-[2px]"
        style={{
          backgroundImage: "linear-gradient(90deg, #6366f1 0%, #ec4899 100%)",
        }}
      ></div>

      <div className=" mx-10 px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Brand */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div
            className="p-[1.5px] rounded-lg"
            style={{
              backgroundImage:
                "linear-gradient(135deg,#6366f1 0%,#ec4899 100%)",
            }}
          >
            <div className="bg-[#0b0b0f] rounded-lg px-3 py-2 text-white font-semibold text-base">
              SK
            </div>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">
              Sai Kalyan Associates
            </h2>
            <p className="text-slate-400 text-xs">
              Legal & Property Documentation Experts in Hyderabad
            </p>
          </div>
        </div>

        {/* Contact + Social */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-3">
            <a
              href="tel:+918897203663"
              className="flex items-center gap-1 hover:text-indigo-400 transition"
            >
              <Phone className="w-4 h-4" /> +91 88972 03663
            </a>
            <span className="text-slate-500">|</span>
            <a
              href="tel:+919177305608"
              className="flex items-center gap-1 hover:text-indigo-400 transition"
            >
              <Phone className="w-4 h-4" /> +91 91773 05608
            </a>
          </div>

          <div className="hidden sm:block text-slate-500">|</div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:saikalyan17171@gmail.com"
              className="flex items-center gap-1 hover:text-pink-400 transition"
            >
              <Mail className="w-4 h-4" /> saikalyan17171@gmail.com
            </a>
          </div>
        </div>

        {/* Social */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/shiva_drithi?igsh=dXdha2c0c3VvcjZn&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-9 h-9 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.05)] border border-white/10 overflow-hidden hover:scale-105 transition"
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#6366f1 0%,#ec4899 100%)",
              }}
            />
            <Instagram className="w-4 h-4 text-white relative z-10" />
          </a>
          <a
            href="https://www.facebook.com/share/1GwBME8XvD/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-9 h-9 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.05)] border border-white/10 overflow-hidden hover:scale-105 transition"
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#ec4899 0%,#6366f1 100%)",
              }}
            />
            <Facebook className="w-4 h-4 text-white relative z-10" />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 mt-6 border-t border-white/10"></div>

      {/* Bottom credits */}
      <div className="max-w-6xl mx-auto px-6 mt-4 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-2 text-center">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-slate-300 font-medium">
            Sai Kalyan Associates
          </span>
          . All rights reserved.
        </p>
        <p>
          Designed by{" "}
          <span className="text-indigo-400 font-semibold">
            Nandak Innovations
          </span>
        </p>
      </div>
    </footer>
  );
}
