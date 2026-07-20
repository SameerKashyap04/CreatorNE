"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, Users, Star, TrendingUp, Camera, Video, ArrowLeft, Mail, ExternalLink, Calendar, MessageCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";

// Mock Data 
const MOCK_CREATOR = { 
  id: 1, 
  name: "Arunav Bora", 
  handle: "@arunav.bora", 
  state: "Assam", 
  city: "Guwahati",
  category: "Travel & Adventure", 
  followers: "125K", 
  avgViews: "45K", 
  engagement: "6.2%", 
  platforms: ["instagram", "youtube"], 
  image: "https://i.pravatar.cc/300?u=1",
  bio: "Exploring the hidden gems of North East India. From the root bridges of Meghalaya to the serene monasteries of Tawang, I document culture, food, and landscapes.",
  languages: ["English", "Assamese", "Hindi"],
  brands: ["GoPro", "MakeMyTrip", "Assam Tourism", "Royal Enfield"],
  portfolio: [
    { type: "image", url: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=500&h=500&fit=crop" },
    { type: "video", url: "https://images.unsplash.com/photo-1522853243555-467471804cff?w=500&h=500&fit=crop" },
    { type: "image", url: "https://images.unsplash.com/photo-1627917711200-c9a96e38ea32?w=500&h=500&fit=crop" },
  ]
};

export default function CreatorProfilePage() {
  const { id } = useParams();
  // In a real app, we would fetch creator by ID
  const creator = MOCK_CREATOR;

  return (
    <div className="min-h-screen pb-20 mesh-bg">
      {/* Header Banner */}
      <div className="h-[300px] w-full relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/40 to-[var(--bg-primary)] z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=1920&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10" />
        
        <div className="max-w-7xl mx-auto px-4 h-full flex flex-col relative z-20">
          <div className="pt-24">
            <Link href="/creators">
              <Button variant="ghost" icon={<ArrowLeft className="h-4 w-4" />}>
                Back to Search
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-30 -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <GlassCard animated={false} hover={false} className="p-6 sticky top-24">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-32 w-32 rounded-full p-[3px] bg-gradient-to-br from-brand-400 to-[var(--accent-purple)] mb-4 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  <img src={creator.image} alt={creator.name} className="h-full w-full rounded-full object-cover border-4 border-[var(--bg-primary)]" />
                  <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-emerald-500 border-2 border-[var(--bg-primary)]" />
                </div>
                
                <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">{creator.name}</h1>
                <p className="text-[var(--text-muted)] mb-3">{creator.handle}</p>
                <Badge variant="brand" className="mb-4">{creator.category}</Badge>
                
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-6">
                  <MapPin className="h-4 w-4 text-[var(--brand-400)]" />
                  <span>{creator.city}, {creator.state}</span>
                </div>

                <div className="w-full flex gap-3 mb-6">
                  <Button variant="primary" className="flex-1" icon={<Mail className="h-4 w-4" />}>
                    Message
                  </Button>
                  <Button variant="secondary" className="flex-1" icon={<Calendar className="h-4 w-4" />}>
                    Book
                  </Button>
                </div>

                <div className="w-full h-px bg-[var(--border-subtle)] mb-6" />

                <div className="w-full flex flex-col gap-3">
                  <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider text-left mb-1">Social Links</h3>
                  {creator.platforms.includes("instagram") && (
                    <a href="#" className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--bg-glass-strong)] border border-[var(--border-subtle)] hover:border-brand-500/30 transition-colors group">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-pink-500 to-orange-400">
                        <Camera className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--brand-300)]">Instagram</span>
                      <ExternalLink className="h-3 w-3 ml-auto text-[var(--text-muted)] group-hover:text-[var(--brand-300)]" />
                    </a>
                  )}
                  {creator.platforms.includes("youtube") && (
                    <a href="#" className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--bg-glass-strong)] border border-[var(--border-subtle)] hover:border-brand-500/30 transition-colors group">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-red-600 to-red-400">
                        <Video className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--brand-300)]">YouTube</span>
                      <ExternalLink className="h-3 w-3 ml-auto text-[var(--text-muted)] group-hover:text-[var(--brand-300)]" />
                    </a>
                  )}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Stats Overview */}
            <GlassCard animated={false} hover={false} className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[var(--brand-400)]" /> Performance Stats
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--bg-glass-strong)] to-[var(--bg-glass)] border border-[var(--border-default)]">
                  <div className="flex items-center gap-2 mb-2 text-[var(--text-secondary)]">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">Total Followers</span>
                  </div>
                  <p className="text-3xl font-bold text-[var(--text-primary)]">{creator.followers}</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--bg-glass-strong)] to-[var(--bg-glass)] border border-[var(--border-default)]">
                  <div className="flex items-center gap-2 mb-2 text-[var(--text-secondary)]">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span className="text-sm font-medium">Avg Views</span>
                  </div>
                  <p className="text-3xl font-bold text-[var(--text-primary)]">{creator.avgViews}</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--bg-glass-strong)] to-[var(--bg-glass)] border border-[var(--border-default)]">
                  <div className="flex items-center gap-2 mb-2 text-[var(--text-secondary)]">
                    <MessageCircle className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-medium">Engagement</span>
                  </div>
                  <p className="text-3xl font-bold text-[var(--text-primary)]">{creator.engagement}</p>
                </div>
              </div>
            </GlassCard>

            {/* About & Brands */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard animated={false} hover={false} className="p-6">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">About Me</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {creator.bio}
                </p>
                <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {creator.languages.map(lang => (
                    <span key={lang} className="px-3 py-1 rounded-full bg-[var(--bg-glass-strong)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                      {lang}
                    </span>
                  ))}
                </div>
              </GlassCard>

              <GlassCard animated={false} hover={false} className="p-6">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Previous Collaborations</h2>
                <div className="flex flex-wrap gap-3">
                  {creator.brands.map(brand => (
                    <div key={brand} className="flex items-center justify-center p-4 h-16 w-full sm:w-[calc(50%-6px)] rounded-lg bg-[var(--bg-glass-strong)] border border-[var(--border-subtle)] hover:border-brand-500/50 transition-colors cursor-default">
                      <span className="font-medium text-[var(--text-secondary)] text-sm text-center">{brand}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Portfolio */}
            <GlassCard animated={false} hover={false} className="p-6">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">Portfolio & Recent Work</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {creator.portfolio.map((item, i) => (
                  <div key={i} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-[var(--border-subtle)]">
                    <img src={item.url} alt={`Portfolio ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      {item.type === "video" ? (
                        <Play className="h-8 w-8 text-white" fill="white" />
                      ) : (
                        <ExternalLink className="h-6 w-6 text-white" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

          </div>
        </div>
      </div>
    </div>
  );
}
