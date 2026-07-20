"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-[#050008]">
      {/* Space background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `
            radial-gradient(1px 1px at 8% 85%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 22% 28%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 62%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 78% 18%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 75%, rgba(255,255,255,0.4) 0%, transparent 100%)
          `,
        }} />
      </div>
      <div className="relative mx-auto max-w-4xl">
        {/* Glowing border card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[var(--radius-2xl)] p-px overflow-hidden"
        >
          {/* Animated gradient border */}
          <div className="animated-border absolute inset-0 rounded-[var(--radius-2xl)]" />

          {/* Inner content */}
          <div
            className="relative rounded-[calc(var(--radius-2xl)-1px)] px-8 py-16 text-center flex flex-col items-center gap-8 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(17,17,34,0.98) 0%, rgba(12,12,20,0.98) 100%)",
            }}
          >
            {/* Bg blobs */}
            <div
              className="pointer-events-none absolute -top-20 left-1/4 h-64 w-64 rounded-full opacity-15"
              style={{ background: "radial-gradient(circle, var(--brand-500) 0%, transparent 70%)", filter: "blur(40px)" }}
            />
            <div
              className="pointer-events-none absolute -bottom-20 right-1/4 h-64 w-64 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, var(--accent-purple) 0%, transparent 70%)", filter: "blur(40px)" }}
            />

            {/* Badge */}
            <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-brand)] bg-[var(--brand-500)]/10">
              <Sparkles className="h-3.5 w-3.5 text-[var(--brand-400)]" />
              <span className="text-xs font-medium text-[var(--brand-400)]">Join 2,000+ Creators</span>
            </div>

            <div>
              <h2
                className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight mb-4"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                <span className="gradient-text">Ready to get</span>
                <br />
                <span className="text-[var(--text-primary)]">discovered?</span>
              </h2>
              <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
                Join CreatorNE today and connect with brands looking for authentic North East India creators just like you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary" glow icon={<ArrowRight className="h-5 w-5" />} iconPosition="right">
                Start as a Creator — Free
              </Button>
              <Button size="lg" variant="secondary">
                Hire NE Creators
              </Button>
            </div>

            <p className="text-xs text-[var(--text-muted)]">
              Free to join · Admin verified · No hidden fees
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
