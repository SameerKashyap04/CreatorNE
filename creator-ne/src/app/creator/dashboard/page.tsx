"use client";

import { motion } from "framer-motion";
import { Eye, TrendingUp, Briefcase, ChevronRight, DollarSign, ArrowUpRight, CheckCircle2, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

import { StatCard, StatColor } from "@/components/ui/StatCard";

type Stat = {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend: { value: number; isPositive: boolean };
  color: StatColor;
};

const STATS: Stat[] = [
  { label: "Total Profile Views", value: "1,248", icon: <Eye size={20} />, trend: { value: 12, isPositive: true }, color: "brand" },
  { label: "Profile Ranking", value: "Top 5%", icon: <TrendingUp size={20} />, trend: { value: 2, isPositive: true }, color: "emerald" },
  { label: "Active Pitches", value: "3", icon: <Briefcase size={20} />, trend: { value: 33, isPositive: true }, color: "cyan" },
  { label: "Est. Earnings (Mo)", value: "₹45K", icon: <DollarSign size={20} />, trend: { value: 11, isPositive: true }, color: "amber" },
];

const INVITATIONS = [
  { id: 1, brand: "MakeMyTrip", campaign: "Meghalaya Monsoon Trek", budget: "₹25,000", status: "Pending Response", color: "purple" },
  { id: 2, brand: "Assam Tea Co.", campaign: "Tea Tasting Story Series", budget: "₹15,000", status: "In Discussion", color: "cyan" },
];

export default function CreatorOverviewPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <StatCard
            key={stat.label}
            title={stat.label}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            delay={idx}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Brand Invitations */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <MessageSquare size={16} className="text-brand-400" />
                Brand Invitations
              </h3>
              <Link href="/creator/dashboard/deals" className="text-xs font-medium text-[var(--brand-400)] hover:text-[var(--brand-300)] flex items-center">
                View All <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            
            <div className="flex flex-col gap-2">
              {INVITATIONS.map((invitation, idx) => {
                const colors = {
                  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20 group-hover:bg-purple-500/20",
                  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 group-hover:bg-cyan-500/20",
                }[invitation.color as "purple" | "cyan"] || "bg-brand-500/10 text-brand-400 border-brand-500/20 group-hover:bg-brand-500/20";

                const btnColors = {
                  purple: "!text-purple-400 !border !border-purple-500/30 hover:!border-purple-500/60 hover:!bg-purple-500/10",
                  cyan: "!text-cyan-400 !border !border-cyan-500/30 hover:!border-cyan-500/60 hover:!bg-cyan-500/10",
                }[invitation.color as "purple" | "cyan"] || "!text-brand-400 !border !border-brand-500/30 hover:!border-brand-500/60 hover:!bg-brand-500/10";

                return (
                  <motion.div 
                    key={invitation.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between group cursor-pointer hover:bg-[var(--bg-tertiary)] -mx-2 px-2 py-2.5 rounded-lg transition-colors gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border transition-colors ${colors}`}>
                         <Briefcase className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-300)] transition-colors">{invitation.brand}</h4>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{invitation.campaign} • {invitation.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={invitation.status === "Pending Response" ? "warning" : "brand"} className="shadow-sm">
                        {invitation.status}
                      </Badge>
                      <Button variant="secondary" size="sm" className={`h-8 !py-0 text-xs font-semibold px-3 !bg-transparent transition-all ${btnColors}`}>Review</Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Profile Completion Widget */}
        <div className="lg:col-span-1">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-400" />
                Profile Score
              </h3>
              <span className="text-brand-400 font-bold text-sm">85%</span>
            </div>
            
            <div className="h-1.5 w-full bg-[var(--bg-secondary)] rounded-full overflow-hidden mb-6 shadow-inner">
              <div className="h-full bg-gradient-to-r from-[var(--brand-500)] via-purple-500 to-pink-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(97,118,246,0.5)]" />
            </div>

            <p className="text-xs text-[var(--text-secondary)] mb-6">
              Complete your profile to rank higher in brand searches.
            </p>

            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 text-sm text-[var(--text-primary)] cursor-pointer group p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors border border-transparent hover:border-[var(--border-subtle)]">
                <div className="h-4 w-4 rounded-full bg-brand-500/20 border border-brand-500 flex items-center justify-center transition-colors">
                  <div className="h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_5px_rgba(97,118,246,0.8)]" />
                </div>
                <span className="group-hover:text-brand-300 transition-colors">Add Portfolio Video</span>
              </label>
              <label className="flex items-center gap-3 text-sm text-[var(--text-primary)] cursor-pointer group p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors border border-transparent hover:border-[var(--border-subtle)]">
                <div className="h-4 w-4 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] group-hover:border-purple-500/50 transition-colors" />
                <span className="group-hover:text-purple-400 transition-colors">Link YouTube Channel</span>
              </label>
              <label className="flex items-center gap-3 text-sm text-[var(--text-primary)] cursor-pointer group p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors border border-transparent hover:border-[var(--border-subtle)]">
                <div className="h-4 w-4 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] group-hover:border-pink-500/50 transition-colors" />
                <span className="group-hover:text-pink-400 transition-colors">Verify Contact Details</span>
              </label>
            </div>

            <Button variant="secondary" size="sm" className="w-full mt-8 text-xs font-semibold shadow-sm border border-[var(--border-subtle)] hover:border-[var(--brand-500)]/30 hover:bg-[var(--brand-500)]/10 hover:text-[var(--brand-300)] transition-all flex items-center gap-2 justify-center">
              Edit Profile <ArrowUpRight className="h-3 w-3" />
            </Button>
          </Card>
        </div>

      </div>
    </div>
  );
}
