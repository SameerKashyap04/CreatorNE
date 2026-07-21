"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sparkles, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { label: "Find Creators", href: "/creators" },
  { label: "Categories", href: "/categories" },
  {
    label: "Join",
    href: "#",
    submenu: [
      { label: "I'm a Creator", href: "/register/creator", icon: "🎥" },
      { label: "I'm a Brand", href: "/register/brand", icon: "🏢" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Hide the global navbar on dashboard and auth pages
  if (
    pathname?.startsWith("/brand/dashboard") || 
    pathname?.startsWith("/creator/dashboard") || 
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register")
  ) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className="w-full max-w-6xl flex items-center justify-between px-6 py-3 rounded-[var(--radius-2xl)]"
        style={{
          background: "rgba(5, 5, 8, 0.70)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid var(--border-default)",
          boxShadow: "0 4px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-brand-600 to-[var(--accent-purple)] opacity-50 blur-md group-hover:opacity-80 transition-opacity duration-300" />
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-[var(--accent-purple)]">
              <Compass className="h-4 w-4 text-white" />
            </div>
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <span className="gradient-text">Creator</span>
            <span className="text-[var(--text-primary)]">NE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link.submenu ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--bg-glass)] transition-all duration-200">
                  {link.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-52 rounded-[var(--radius-xl)] overflow-hidden"
                      style={{
                        background: "rgba(12, 12, 20, 0.95)",
                        border: "1px solid var(--border-default)",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                      }}
                    >
                      <div className="p-2">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-lg)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass-strong)] transition-all duration-150 group"
                          >
                            <span className="text-base">{sub.icon}</span>
                            <span className="font-medium">{sub.label}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-[var(--radius-md)] hover:bg-[var(--bg-glass)] transition-all duration-200"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
          >
            Log in
          </Link>
          <Link href="/register/creator">
            <Button size="sm" variant="primary" glow>
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)] bg-[var(--bg-glass)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.span key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }} transition={{ duration: 0.15 }}>
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }} transition={{ duration: 0.15 }}>
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+8px)] inset-x-4 rounded-[var(--radius-2xl)] p-4 flex flex-col gap-1"
            style={{
              background: "rgba(5, 5, 8, 0.95)",
              border: "1px solid var(--border-default)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            {navLinks.map((link, i) =>
              link.submenu ? (
                <div key={link.label}>
                  <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                    {link.label}
                  </p>
                  {link.submenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-lg)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass-strong)] transition-all"
                    >
                      <span>{sub.icon}</span>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-4 py-3 rounded-[var(--radius-lg)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass-strong)] transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            )}
            <div className="border-t border-[var(--border-subtle)] mt-2 pt-3 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm text-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Log in
              </Link>
              <Button variant="primary" size="md" className="w-full justify-center">
                Get Started Free
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
