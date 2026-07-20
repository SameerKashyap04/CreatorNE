"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Star, TrendingUp, Camera, Video } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const creators = [
  {
    id: 1,
    name: "Priya Mohan",
    initials: "PM",
    gradient: "from-pink-500 to-rose-400",
    location: "Shillong, Meghalaya",
    categories: ["Lifestyle", "Travel"],
    followers: "89K",
    views: "32K",
    engagement: "8.4%",
    rating: 4.9,
    verified: true,
    platforms: ["instagram", "youtube"],
  },
  {
    id: 2,
    name: "Leisan Rongmei",
    initials: "LR",
    gradient: "from-violet-500 to-purple-400",
    location: "Imphal, Manipur",
    categories: ["Culture", "Music"],
    followers: "156K",
    views: "67K",
    engagement: "6.2%",
    rating: 4.8,
    verified: true,
    platforms: ["instagram", "youtube"],
  },
  {
    id: 3,
    name: "Sanjib Bora",
    initials: "SB",
    gradient: "from-blue-500 to-cyan-400",
    location: "Guwahati, Assam",
    categories: ["Tech", "Education"],
    followers: "204K",
    views: "78K",
    engagement: "5.9%",
    rating: 4.7,
    verified: true,
    platforms: ["youtube"],
  },
];

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "instagram")
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400">
        <Camera className="h-3 w-3 text-white" />
      </span>
    );
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-400">
      <Video className="h-3 w-3 text-white" />
    </span>
  );
}

export function FeaturedCreators() {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-[#050008]">
      {/* Space & Glow Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        {/* Stars */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `
            radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 28% 45%, rgba(255,255,255,0.7) 0%, transparent 100%),
            radial-gradient(1px 1px at 45% 8%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 62% 65%, rgba(255,255,255,0.8) 0%, transparent 100%),
            radial-gradient(1px 1px at 78% 28%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 89% 52%, rgba(255,255,255,0.7) 0%, transparent 100%)
          `,
        }} />
        {/* Ambient Glows */}
        <div
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, var(--accent-pink) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, var(--brand-500) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] text-xs font-medium text-[var(--text-secondary)] mb-4"
            >
              <span>⭐</span> Hand-picked by our team
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <span className="text-[var(--text-primary)]">Featured </span>
              <span className="gradient-text">Creators</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" size="md">
              View All Creators
            </Button>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator, i) => (
            <GlassCard key={creator.id} delay={i * 0.1} hover glow className="p-6 flex flex-col gap-5">
              {/* Profile */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`absolute -inset-1 rounded-full bg-gradient-to-br ${creator.gradient} opacity-50 blur-sm`} />
                    <div
                      className={`relative h-12 w-12 rounded-full bg-gradient-to-br ${creator.gradient} flex items-center justify-center text-white font-bold text-sm ring-2 ring-[var(--border-brand)]`}
                    >
                      {creator.initials}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">{creator.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-[var(--text-muted)]" />
                      <span className="text-xs text-[var(--text-muted)]">{creator.location}</span>
                    </div>
                  </div>
                </div>
                {creator.verified && <Badge variant="success">✓ Verified</Badge>}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {creator.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--brand-500)]/10 text-[var(--brand-400)] border border-[var(--brand-500)]/20"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: <Users className="h-3 w-3" />, label: "Followers", val: creator.followers },
                  { icon: <TrendingUp className="h-3 w-3" />, label: "Avg Views", val: creator.views },
                  { icon: <Star className="h-3 w-3" />, label: "Engagement", val: creator.engagement },
                ].map(({ icon, label, val }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1 p-2.5 rounded-[var(--radius-md)] bg-[var(--bg-glass)] border border-[var(--border-subtle)]"
                  >
                    <span className="text-[var(--brand-400)]">{icon}</span>
                    <span className="text-sm font-bold text-[var(--text-primary)]">{val}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">{label}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-1.5">
                  {creator.platforms.map((p) => (
                    <PlatformIcon key={p} platform={p} />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-[var(--text-primary)]">{creator.rating}</span>
                </div>
                <Button size="sm" variant="outline">View Profile</Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
