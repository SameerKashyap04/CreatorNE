"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Camera, Video, MessageCircle, Mail, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Find Creators", href: "/find-creators" },
    { label: "Categories", href: "/categories" },
    { label: "Featured Brands", href: "/brands" },
    { label: "Blog", href: "/blog" },
  ],
  "Join Us": [
    { label: "Creator Registration", href: "/register/creator" },
    { label: "Brand Registration", href: "/register/brand" },
    { label: "Login", href: "/login" },
    { label: "Dashboard", href: "/brand/dashboard" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const states = [
  "Assam", "Meghalaya", "Manipur", "Nagaland",
  "Mizoram", "Tripura", "Arunachal Pradesh", "Sikkim",
];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-subtle)] overflow-hidden">
      {/* Top glow */}
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--brand-500), var(--accent-purple), transparent)",
          opacity: 0.4,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-8">
        <div className="grid lg:grid-cols-6 gap-10 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-brand-600 to-[var(--accent-purple)] opacity-50 blur-md group-hover:opacity-80 transition-opacity duration-300" />
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-[var(--accent-purple)]">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
              <span className="text-lg font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                <span className="gradient-text">Creator</span>
                <span className="text-[var(--text-primary)]">NE</span>
              </span>
            </Link>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
              North East India&apos;s largest creator discovery and brand collaboration platform.
              Connecting authentic voices with bold brands.
            </p>

            {/* States */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
                Serving all 8 NE States
              </p>
              <div className="flex flex-wrap gap-1.5">
                {states.map((state) => (
                  <span
                    key={state}
                    className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-[var(--bg-glass)] border border-[var(--border-subtle)] text-[var(--text-muted)]"
                  >
                    {state}
                  </span>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {[
                { icon: Camera, label: "Instagram", href: "#", color: "from-pink-500 to-orange-400" },
                { icon: Video, label: "YouTube", href: "#", color: "from-red-600 to-red-400" },
                { icon: MessageCircle, label: "Twitter", href: "#", color: "from-sky-500 to-blue-400" },
              ].map(({ icon: Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.93 }}
                  aria-label={label}
                  className={`flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br ${color} shadow-md transition-shadow hover:shadow-[0_0_16px_rgba(97,118,246,0.4)]`}
                >
                  <Icon className="h-4 w-4 text-white" />
                </motion.a>
              ))}
              <motion.a
                href="mailto:hello@creatorne.in"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-glass-strong)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
              >
                <Mail className="h-4 w-4" />
              </motion.a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                {group}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border-subtle)]">
          <p className="text-xs text-[var(--text-muted)] text-center sm:text-left">
            © {new Date().getFullYear()} CreatorNE. All rights reserved. Designed by <a href="https://www.devify.co.in" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-400)] hover:text-[var(--brand-300)] hover:underline transition-colors">Devify</a>.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs text-emerald-400 font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
