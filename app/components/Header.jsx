"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true); 
  const drawerRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  useEffect(() => {
    
    try {
      const saved = localStorage.getItem("saik_theme");
      if (saved === "dark") setDark(true);
      else setDark(true); 
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
 
      localStorage.setItem("saik_theme", "dark");
      document.documentElement.classList.add("dark");
    } catch (e) {}
  }, [dark]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
      if (!open) return;
      if (e.key === "Tab") {
        const focusable =
          drawerRef.current?.querySelectorAll(
            'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
          ) || [];
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);


  useEffect(() => {
    if (open) {
      setTimeout(() => firstFocusableRef.current?.focus(), 50);
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [open]);

  const nav = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];


  const setLastRef = (el) => {
    lastFocusableRef.current = el;
  };


  const panelStyle = {
    backgroundColor: "#0b0b0f",
    color: "#e5e7eb",
    borderLeft: "1px solid rgba(229,231,235,0.04)",
  };

  const primaryText = "#e5e7eb"; 
  const mutedText = "#9ca3af";
  const accentBg = "linear-gradient(90deg,#4f46e5,#ec4899)"; 
  const subtleOverlay = "rgba(6,8,10,0.28)"; 

  return (
    <header className="relative z-40" style={{ background: "#000000" }}>
      <div className=" mx-10 px-6 py-4 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full text-white text-lg font-bold shadow-xl"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
            }}
          >
            <div className="w-full h-full rounded-2xl flex items-center justify-center">
              SK
            </div>
          </div>

          <div className="hidden sm:block">
            <p
              className="text-sm font-semibold leading-4"
              style={{ color: primaryText }}
            >
              Sai Kalyan
            </p>
            {/* subtitle uses muted dark-friendly color */}
            <p className="text-xs -mt-0.5" style={{ color: mutedText }}>
              Associates — Document Services
            </p>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* removed light hover class and replaced with dark-safe inline hover handlers */}

          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg hover:scale-105 active:scale-95 transition-transform"
            aria-expanded={open}
            aria-controls="site-drawer"
            aria-label="Open menu"
            style={{ background: "rgba(6,8,10,0.12)", color: primaryText }}
            type="button"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 backdrop-blur-sm z-40"
              style={{ background: subtleOverlay }}
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.aside
              id="site-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              ref={drawerRef}
              className="fixed right-0 top-0 h-full w-full sm:w-[460px] max-w-full z-50 shadow-2xl p-6 flex flex-col gap-6 overflow-y-auto"
              aria-label="Main menu"
              style={panelStyle}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold shadow-2xl"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                    }}
                  >
                    SK
                  </div>

                  <div>
                    <p className="font-semibold" style={{ color: primaryText }}>
                      Sai Kalyan
                    </p>
                    <p className="text-xs" style={{ color: mutedText }}>
                      Document services
                    </p>
                  </div>
                </div>

                <button
                  ref={firstFocusableRef}
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg"
                  style={{
                    color: primaryText,
                    background: "rgba(6,8,10,0.08)",
                  }}
                  type="button"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1">
                <ul className="flex flex-col gap-1">
                  {nav.map((n, i) => (
                    <li key={n.href}>
                      <Link
                        href={n.href}
                        onClick={() => setOpen(false)}
                        className="block w-full px-4 py-3 rounded-lg transition font-medium"
                        ref={i === nav.length - 1 ? setLastRef : null}
                        style={{
                          color: primaryText,
                          background: "transparent",
                        }}
                      >
                        {n.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-6 border-t pt-6"
                  style={{ borderColor: "rgba(229,231,235,0.04)" }}
                >
                  <p
                    className="text-sm font-medium mb-3"
                    style={{ color: primaryText }}
                  >
                    Get started
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/get-a-quote"
                      onClick={() => setOpen(false)}
                      className="block w-full text-center px-4 py-3 rounded-xl font-semibold hover:opacity-95"
                      style={{
                        background: accentBg,
                        color: primaryText,
                      }}
                    >
                      Request a Quote
                    </Link>
                  </div>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
