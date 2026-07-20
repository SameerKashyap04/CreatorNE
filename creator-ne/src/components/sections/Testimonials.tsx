"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Marketing Manager",
    company: "Assam Tea Co.",
    initials: "RK",
    gradient: "from-emerald-500 to-teal-400",
    text: "CreatorNE helped us find authentic local creators who genuinely understood our brand values. Our campaign engagement was 3x higher than previous influencer campaigns.",
    rating: 5,
  },
  {
    name: "Ananya Das",
    role: "Travel Creator",
    company: "@ananyadiscoversnе",
    initials: "AD",
    gradient: "from-sky-500 to-blue-500",
    text: "As a creator from Meghalaya, it was nearly impossible to connect with brands. CreatorNE changed everything — I've had 4 brand deals in just 2 months!",
    rating: 5,
  },
  {
    name: "Bittu Sharma",
    role: "Founder",
    company: "NE Startup Hub",
    initials: "BS",
    gradient: "from-violet-500 to-purple-400",
    text: "The verification system builds real trust. We can filter by state, language, and category — things no other platform offers for NE India creators.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div
        className="pointer-events-none absolute right-0 top-1/4 w-80 h-80 opacity-10"
        style={{
          background: "radial-gradient(ellipse, var(--accent-purple) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] text-xs font-medium text-[var(--text-secondary)] mb-6"
          >
            <span>💬</span> Real stories from real users
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <span className="text-[var(--text-primary)]">What People </span>
            <span className="gradient-text">Are Saying</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <GlassCard key={t.name} delay={i * 0.12} hover className="p-6 flex flex-col gap-5">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="absolute -top-1 -left-1 h-8 w-8 text-[var(--brand-500)]/20" />
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed pl-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-[var(--border-subtle)]">
                <div className="relative">
                  <div className={`absolute -inset-0.5 rounded-full bg-gradient-to-br ${t.gradient} opacity-50 blur-sm`} />
                  <div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-white text-xs font-bold`}
                  >
                    {t.initials}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
