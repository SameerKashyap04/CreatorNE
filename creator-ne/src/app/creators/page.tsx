"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, MapPin, Users, Star, TrendingUp, Camera, Video, ChevronDown, Sparkles, Ghost } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { CreatorCardSkeleton } from "@/components/ui/Skeleton";

const STATES = ["All States", "Assam", "Arunachal Pradesh", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura"];
const CATEGORIES = ["All Categories", "Travel", "Food", "Fashion", "Lifestyle", "Tech", "Music", "Comedy"];

export default function FindCreatorsPage() {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (search) query.append("search", search);
        if (selectedState !== "All States") query.append("state", selectedState);
        if (selectedCategory !== "All Categories") query.append("category", selectedCategory);

        const res = await fetch(`http://localhost:4000/api/creators?${query.toString()}`);
        const data = await res.json();
        setCreators(data);
      } catch (error) {
        console.error("Failed to fetch creators", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search slightly
    const timer = setTimeout(() => {
      fetchCreators();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, selectedState, selectedCategory]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 mesh-bg">
      <div className="max-w-7xl mx-auto">
        
        {/* Header section */}
        <div className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-[var(--text-primary)] tracking-tight mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Discover <span className="gradient-text">Creators</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[var(--text-secondary)] text-lg max-w-2xl"
          >
            Search and filter through the largest database of authentic creators in North East India.
          </motion.p>
        </div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <GlassCard animated={false} hover={false} className="p-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input 
                placeholder="Search by name or handle..." 
                leftIcon={<Search className="h-4 w-4" />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative min-w-[200px]">
                <select 
                  className="w-full bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-500)] appearance-none"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  {STATES.map(s => <option key={s} value={s} className="bg-[#1a1a24] text-white">{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)] pointer-events-none" />
              </div>
              <div className="relative min-w-[200px]">
                <select 
                  className="w-full bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-500)] appearance-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#1a1a24] text-white">{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)] pointer-events-none" />
              </div>
              <Button variant="secondary" icon={<Filter className="h-4 w-4" />}>
                More Filters
              </Button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[280px]">
                <CreatorCardSkeleton />
              </div>
            ))
          ) : (
            creators.map((creator, idx) => (
              <motion.div
                key={creator.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (idx % 10) }}
              >
                <Link href={`/creators/${creator.id}`}>
                  <GlassCard hover glow className="p-5 h-full flex flex-col group cursor-pointer transition-all duration-300 border-[var(--border-default)] hover:border-brand-500/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-14 rounded-full p-[2px] bg-gradient-to-br from-brand-400 to-[var(--accent-purple)]">
                          <img src={creator.photoUrl || "https://i.pravatar.cc/150"} alt={creator.name} className="h-full w-full rounded-full object-cover border-2 border-[var(--bg-primary)]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-400 group-hover:to-brand-200 transition-all">
                            {creator.name}
                          </h3>
                          <p className="text-xs text-[var(--text-muted)]">@{creator.name.toLowerCase().replace(/\s+/g, '')}</p>
                        </div>
                      </div>
                      <Badge variant="brand">{creator.categories?.[0]?.name || "Creator"}</Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6">
                      <MapPin className="h-3.5 w-3.5 text-[var(--brand-400)]" />
                      <span>{creator.state}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className="flex flex-col items-center p-2 rounded-lg bg-[var(--bg-glass-strong)] border border-[var(--border-subtle)]">
                        <Users className="h-4 w-4 text-[var(--brand-400)] mb-1" />
                        <span className="text-sm font-semibold">{creator.followersCount >= 1000 ? `${(creator.followersCount / 1000).toFixed(1)}K` : creator.followersCount}</span>
                        <span className="text-[10px] text-[var(--text-muted)]">Followers</span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-lg bg-[var(--bg-glass-strong)] border border-[var(--border-subtle)]">
                        <Star className="h-4 w-4 text-amber-400 mb-1" />
                        <span className="text-sm font-semibold">{creator.avgViews >= 1000 ? `${(creator.avgViews / 1000).toFixed(1)}K` : creator.avgViews}</span>
                        <span className="text-[10px] text-[var(--text-muted)]">Avg Views</span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-lg bg-[var(--bg-glass-strong)] border border-[var(--border-subtle)]">
                        <TrendingUp className="h-4 w-4 text-emerald-400 mb-1" />
                        <span className="text-sm font-semibold">{creator.engagementRate}%</span>
                        <span className="text-[10px] text-[var(--text-muted)]">Eng. Rate</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                      <div className="flex gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-400">
                          <Camera className="h-3.5 w-3.5 text-white" />
                        </div>
                      </div>
                      <span className="text-xs font-medium text-[var(--brand-400)] group-hover:text-[var(--brand-300)] flex items-center gap-1 transition-colors">
                        View Profile <Sparkles className="h-3 w-3" />
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        {!loading && creators.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20 text-center flex flex-col items-center justify-center"
          >
            <div className="h-24 w-24 bg-brand-500/10 rounded-full flex items-center justify-center mb-6">
              <Ghost className="h-10 w-10 text-brand-400 opacity-60" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">No creators found</h3>
            <p className="text-[var(--text-secondary)] max-w-sm mb-6">We couldn't find any creators matching your current search and filters.</p>
            <Button variant="ghost" onClick={() => { setSearch(""); setSelectedState("All States"); setSelectedCategory("All Categories"); }}>
              Clear all filters
            </Button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
