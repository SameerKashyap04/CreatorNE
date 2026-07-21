"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, MapPin, Users, Star, TrendingUp, Zap, Camera, Video } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlobeCanvas } from "@/components/ui/GlobeCanvas";

/* ── Floating stat chip ───────────────────────── */
function StatChip({
  icon,
  label,
  value,
  className = "",
  style,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`float absolute flex items-center gap-2.5 px-4 py-3 rounded-[var(--radius-xl)] border border-[var(--border-default)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] ${className}`}
      style={{
        background: "rgba(12, 12, 20, 0.9)",
        backdropFilter: "blur(20px)",
        ...style,
      }}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-brand-600 to-[var(--accent-purple)]">
        {icon}
      </span>
      <div>
        <p className="text-xs text-slate-300">{label}</p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
}

/* ── Creator avatar stack ─────────────────────── */
const CREATOR_COLORS = [
  "from-pink-500 to-rose-400",
  "from-violet-500 to-purple-400",
  "from-blue-500 to-cyan-400",
  "from-amber-500 to-yellow-400",
  "from-emerald-500 to-teal-400",
];
const CREATOR_INITIALS = ["SK", "PM", "LR", "SB", "NK"];

function CreatorAvatarStack() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {CREATOR_INITIALS.map((init, i) => (
          <motion.div
            key={init}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.07 }}
            className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${CREATOR_COLORS[i]} text-xs font-bold text-white ring-2 ring-[var(--bg-primary)] shadow-[0_4px_12px_rgba(0,0,0,0.85)]`}
          >
            {init}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.97 }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-glass-strong)] border border-[var(--border-default)] text-xs font-semibold text-[var(--text-secondary)] ring-2 ring-[var(--bg-primary)] shadow-[0_4px_12px_rgba(0,0,0,0.85)]"
        >
          +2k
        </motion.div>
      </div>
      <div>
        <p className="text-sm font-semibold text-white" style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.95)" }}>2,000+ Creators</p>
        <p className="text-xs text-slate-300 font-medium" style={{ textShadow: "0 2px 6px rgba(0, 0, 0, 0.95)" }}>across 8 NE states</p>
      </div>
    </div>
  );
}

/* ── Main Hero ────────────────────────────────── */
export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center" style={{ background: "#050008" }}>
      {/* ── Deep space + globe background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Stars */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 8% 6%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 16% 12%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(2px 2px at 24% 4%, rgba(255,255,255,1) 0%, transparent 100%),
            radial-gradient(1px 1px at 31% 18%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 39% 9%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 47% 3%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(2px 2px at 55% 14%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 63% 7%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 71% 19%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 79% 5%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(2px 2px at 87% 11%, rgba(255,255,255,1) 0%, transparent 100%),
            radial-gradient(1px 1px at 93% 17%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 4% 28%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 13% 35%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 21% 42%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 34% 31%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 58% 38%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 66% 44%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 74% 30%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 82% 41%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 90% 36%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 97% 28%, rgba(255,255,255,0.5) 0%, transparent 100%),
            
            /* Denser secondary star layer */
            radial-gradient(1px 1px at 3% 15%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 12% 5%, rgba(255,255,255,0.75) 0%, transparent 100%),
            radial-gradient(1px 1px at 20% 25%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(2px 2px at 27% 10%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 35% 22%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 42% 16%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 50% 12%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 57% 5%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 65% 20%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 73% 8%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 81% 15%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 88% 3%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1px 1px at 95% 10%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 6% 38%, rgba(255,255,255,0.75) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 15% 45%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 25% 32%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 38% 46%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 48% 35%, rgba(255,255,255,0.9) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 54% 42%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 62% 33%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 48%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 77% 37%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 84% 45%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 93% 30%, rgba(255,255,255,0.5) 0%, transparent 100%)
          `,
        }} />

        {/* Wide atmospheric purple glow */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{
          bottom: "-10%",
          width: "1200px",
          height: "600px",
          background: "radial-gradient(ellipse at center bottom, rgba(168, 85, 247, 0.7) 0%, rgba(126, 34, 206, 0.35) 45%, transparent 75%)",
          filter: "blur(65px)",
        }} />

        {/* Animated Canvas Globe — centered, medium, bottom-clipped */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: "-41%" }}
        >
          <GlobeCanvas size={950} />
        </div>

        {/* Dark shadow under globe — fades black upward from very bottom */}
        <div className="absolute bottom-0 left-0 right-0" style={{
          height: "45%",
          background: "linear-gradient(to top, #050008 0%, #050008 15%, rgba(5,0,8,0.7) 50%, transparent 100%)",
        }} />

        {/* Side darkness — blends edges */}
        <div className="absolute inset-y-0 left-0" style={{
          width: "20%",
          background: "linear-gradient(to right, #050008 0%, transparent 100%)",
        }} />
        <div className="absolute inset-y-0 right-0" style={{
          width: "20%",
          background: "linear-gradient(to left, #050008 0%, transparent 100%)",
        }} />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* ── Left: Copy ── */}
          <div className="flex flex-col gap-8">
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Badge variant="brand" pulse icon={<Zap className="h-3.5 w-3.5" />}>
                North East India&apos;s #1 Creator Platform
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1
                className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                <span className="block text-[var(--text-primary)]">Discover</span>
                <span className="block gradient-text">Authentic</span>
                <span className="block text-[var(--text-primary)]">Creators.</span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-sm md:text-base text-slate-200 leading-relaxed max-w-lg font-light tracking-wide"
              style={{ 
                fontFamily: "Inter, system-ui, sans-serif",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)" 
              }}
            >
              Connect with verified influencers from Assam, Meghalaya, Manipur, and all 8 North
              East states. Build campaigns that resonate with real, local audiences.
            </motion.p>

            {/* Avatar stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CreatorAvatarStack />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                variant="primary"
                glow
                icon={<ArrowRight className="h-5 w-5" />}
                iconPosition="right"
              >
                Join as Creator
              </Button>
              <Button
                size="lg"
                variant="secondary"
                icon={<Play className="h-5 w-5 fill-current" />}
                iconPosition="left"
              >
                Hire Creators
              </Button>
            </motion.div>

            {/* Trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { label: "Active Creators", value: "2,000+" },
                { label: "Brands Onboard", value: "150+" },
                { label: "Campaigns Run", value: "500+" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col" style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.95)" }}>
                  <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
                  <span className="text-sm text-slate-300 font-medium">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Visual ── */}
          <div className="relative hidden lg:flex justify-center items-center">
            {/* Main card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[360px]"
            >
              {/* Glow behind card */}
              <div
                className="absolute -inset-6 rounded-[var(--radius-2xl)] opacity-30"
                style={{
                  background: "radial-gradient(ellipse, var(--brand-600) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />

              <GlassCard animated={false} hover={false} className="p-6 gap-4 flex flex-col">
                {/* Profile header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-brand-500 to-[var(--accent-purple)] opacity-60 blur-sm" />
                      <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg ring-2 ring-[var(--border-brand)]">
                        DV
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Devify</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <MapPin className="h-3 w-3 text-slate-300" />
                        <span className="text-xs text-slate-300">Guwahati, Assam</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="success">✓ Verified</Badge>
                </div>

                {/* Category tags */}
                <div className="flex flex-wrap gap-2">
                  {["Travel", "Culture", "Photography"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-100 border border-purple-500/30 shadow-[0_0_8px_rgba(168,85,247,0.15)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: <Users className="h-3.5 w-3.5" />, label: "Followers", value: "128K" },
                    { icon: <TrendingUp className="h-3.5 w-3.5" />, label: "Avg Views", value: "45K" },
                    { icon: <Star className="h-3.5 w-3.5" />, label: "Engagement", value: "6.8%" },
                  ].map(({ icon, label, value }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1 p-3 rounded-[var(--radius-lg)] bg-[var(--bg-glass)] border border-[var(--border-subtle)]"
                    >
                      <span className="text-[var(--brand-400)]">{icon}</span>
                      <span className="text-sm font-bold text-white">{value}</span>
                      <span className="text-[10px] text-slate-300">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Platforms */}
                <div className="flex items-center gap-2 pt-1 border-t border-[var(--border-subtle)]">
                  <span className="text-xs text-slate-300">Active on</span>
                  <div className="flex gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400">
                      <Camera className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-400">
                      <Video className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Button size="sm" variant="primary">Connect</Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Floating chips */}
            <StatChip
              icon={<TrendingUp className="h-4 w-4 text-white" />}
              label="Avg. Engagement"
              value="7.2%"
              className="top-0 -left-16"
            />
            <StatChip
              icon={<Users className="h-4 w-4 text-white" />}
              label="New This Week"
              value="38 Creators"
              className="bottom-8 -right-12"
              style={{ animationDelay: "1.5s" } as React.CSSProperties}
            />
            <StatChip
              icon={<Star className="h-4 w-4 text-white" />}
              label="Avg. Rating"
              value="4.9 / 5.0"
              className="-bottom-4 left-4"
              style={{ animationDelay: "0.8s" } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
    </section>
  );
}
