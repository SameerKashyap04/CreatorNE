"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Handshake, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Sign up as a Creator or Brand. Fill in your details, verify your identity, and get approved by our admin team.",
    color: "from-brand-500 to-[var(--accent-purple)]",
    glow: "rgba(97,118,246,0.25)",
  },
  {
    number: "02",
    icon: Search,
    title: "Discover & Filter",
    description:
      "Brands search creators using 8+ filters: state, city, category, platform, followers, language, gender, and verification.",
    color: "from-violet-500 to-fuchsia-500",
    glow: "rgba(139,92,246,0.25)",
  },
  {
    number: "03",
    icon: Handshake,
    title: "Connect & Collaborate",
    description:
      "Shortlist creators, create campaigns, and initiate collaborations directly through the platform dashboard.",
    color: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.25)",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Grow",
    description:
      "Track campaign performance, manage payments, and build long-term partnerships with authentic NE India creators.",
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.2)",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Left edge glow */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-10"
        style={{
          background: "radial-gradient(ellipse, var(--brand-600) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] text-xs font-medium text-[var(--text-secondary)] mb-6"
          >
            <span>⚙️</span> Simple 4-Step Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <span className="text-[var(--text-primary)]">How It </span>
            <span className="gradient-text">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] max-w-lg mx-auto"
          >
            From registration to collaboration — our platform makes creator discovery fast, transparent, and rewarding.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-14 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px bg-gradient-to-r from-transparent via-[var(--border-brand)] to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center gap-4 p-6 rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] transition-all duration-300 hover:border-[var(--border-brand)] group"
                style={{ background: "var(--bg-card)" }}
              >
                {/* Step number */}
                <span className="absolute top-4 right-4 text-5xl font-black opacity-5 select-none" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {step.number}
                </span>

                {/* Icon */}
                <div className="relative">
                  <div
                    className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                    style={{ background: step.glow }}
                  />
                  <div className={`relative flex h-14 w-14 items-center justify-center rounded-[var(--radius-xl)] bg-gradient-to-br ${step.color} shadow-lg`}>
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    Step {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
