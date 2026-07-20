"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";

export function CreatorCardSkeleton() {
  return (
    <GlassCard animated={false} hover={false} className="p-5 h-full flex flex-col border-[var(--border-subtle)] overflow-hidden relative">
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent z-10"
        animate={{ translateX: ["-100%", "200%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <div className="flex items-start justify-between mb-4 relative z-0">
        <div className="flex items-center gap-3 w-full">
          <div className="h-14 w-14 rounded-full bg-[var(--bg-glass-strong)] border border-[var(--border-subtle)] shrink-0" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-4 w-32 bg-[var(--bg-glass-strong)] rounded-md" />
            <div className="h-3 w-24 bg-[var(--bg-glass-strong)] rounded-md opacity-70" />
          </div>
        </div>
        <div className="h-6 w-16 bg-[var(--bg-glass-strong)] rounded-full shrink-0" />
      </div>
      
      <div className="h-3 w-20 bg-[var(--bg-glass-strong)] rounded-md mb-6 relative z-0" />

      <div className="grid grid-cols-3 gap-2 mb-6 relative z-0">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-16 rounded-lg bg-[var(--bg-glass-strong)] border border-[var(--border-subtle)]" />
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between relative z-0">
        <div className="flex gap-2">
          <div className="h-7 w-7 rounded-full bg-[var(--bg-glass-strong)]" />
          <div className="h-7 w-7 rounded-full bg-[var(--bg-glass-strong)]" />
        </div>
        <div className="h-4 w-24 bg-[var(--bg-glass-strong)] rounded-md" />
      </div>
    </GlassCard>
  );
}
