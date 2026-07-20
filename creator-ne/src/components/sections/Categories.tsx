"use client";

import { motion } from "framer-motion";
import {
  Camera, Utensils, Plane, Shirt, Dumbbell, Music, BookOpen,
  Gamepad2, Palette, Mountain, Briefcase, TrendingUp, Laugh,
  Monitor, Film, Leaf, Coins, Globe, MoreHorizontal, Sparkles,
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Travel", icon: Plane, color: "from-sky-500 to-blue-600", count: "142" },
  { name: "Food", icon: Utensils, color: "from-orange-500 to-amber-500", count: "98" },
  { name: "Lifestyle", icon: Leaf, color: "from-emerald-500 to-teal-500", count: "215" },
  { name: "Fashion", icon: Shirt, color: "from-pink-500 to-rose-500", count: "112" },
  { name: "Beauty", icon: Sparkles, color: "from-fuchsia-400 to-pink-500", count: "75" },
  { name: "Photography", icon: Camera, color: "from-violet-500 to-purple-600", count: "76" },
  { name: "Cinematography", icon: Film, color: "from-indigo-500 to-blue-600", count: "54" },
  { name: "Tech", icon: Monitor, color: "from-cyan-500 to-sky-500", count: "63" },
  { name: "Comedy", icon: Laugh, color: "from-yellow-500 to-amber-400", count: "89" },
  { name: "Fitness", icon: Dumbbell, color: "from-red-500 to-orange-500", count: "71" },
  { name: "Music", icon: Music, color: "from-fuchsia-500 to-pink-500", count: "112" },
  { name: "Culture", icon: Globe, color: "from-teal-500 to-emerald-400", count: "134" },
  { name: "Education", icon: BookOpen, color: "from-blue-500 to-indigo-500", count: "95" },
  { name: "Finance", icon: Coins, color: "from-green-500 to-emerald-500", count: "48" },
  { name: "Gaming", icon: Gamepad2, color: "from-purple-500 to-violet-600", count: "77" },
  { name: "Art", icon: Palette, color: "from-rose-500 to-pink-500", count: "103" },
  { name: "Wildlife", icon: Leaf, color: "from-lime-500 to-green-500", count: "42" },
  { name: "Adventure", icon: Mountain, color: "from-amber-500 to-orange-600", count: "65" },
  { name: "Business", icon: Briefcase, color: "from-slate-500 to-gray-600", count: "83" },
  { name: "Others", icon: MoreHorizontal, color: "from-brand-500 to-brand-700", count: "57" },
];

function CategoryCard({
  name,
  icon: Icon,
  color,
  count,
  index,
}: {
  name: string;
  icon: React.ElementType;
  color: string;
  count: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        href={`/categories/${name.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}`}
        className="group flex flex-col items-center gap-3 p-5 rounded-[var(--radius-xl)] border border-[var(--border-subtle)] transition-all duration-300 hover:border-[var(--border-brand)] hover:bg-[var(--bg-card-hover)]"
        style={{ background: "var(--bg-card)" }}
      >
        {/* Icon with glow */}
        <div className="relative">
          <div className={`absolute -inset-2 rounded-full bg-gradient-to-br ${color} opacity-0 blur-lg group-hover:opacity-30 transition-opacity duration-300`} />
          <div className={`relative flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-gradient-to-br ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors">
            {name}
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{count} creators</p>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoriesSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-[#050008]">
      {/* Bg space & glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        {/* Stars */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `
            radial-gradient(1px 1px at 8% 28%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 25% 15%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 58% 52%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 75% 10%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 48%, rgba(255,255,255,0.8) 0%, transparent 100%)
          `,
        }} />
        {/* Glow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, var(--accent-purple) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] text-xs font-medium text-[var(--text-secondary)] mb-6"
          >
            <span>📂</span> All Content Categories
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <span className="text-[var(--text-primary)]">Browse by </span>
            <span className="gradient-text">Category</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] max-w-lg mx-auto"
          >
            From travel vloggers to food bloggers — discover creators in every niche across North
            East India.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.name} {...cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
