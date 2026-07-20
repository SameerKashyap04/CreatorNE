"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, Eye, TrendingUp, Plus, ChevronRight, Activity, Calendar } from "lucide-react";
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
  { label: "Active Campaigns", value: "2", icon: <Briefcase size={20} />, trend: { value: 50, isPositive: true }, color: "brand" },
  { label: "Shortlisted Creators", value: "14", icon: <Users size={20} />, trend: { value: 12, isPositive: true }, color: "purple" },
  { label: "Profile Views", value: "342", icon: <Eye size={20} />, trend: { value: 8, isPositive: true }, color: "cyan" },
  { label: "Avg. Engagement", value: "4.8%", icon: <TrendingUp size={20} />, trend: { value: 1.2, isPositive: false }, color: "pink" },
];

const RECENT_CAMPAIGNS = [
  { id: 1, title: "Summer Trekking Gear Launch", status: "Active", budget: "₹45,000", creators: 3, color: "blue" },
  { id: 2, title: "Assam Tea Tasting Event", status: "Active", budget: "₹20,000", creators: 1, color: "emerald" },
  { id: 3, title: "Handloom Festival Promo", status: "Completed", budget: "₹60,000", creators: 5, color: "purple" },
];

export default function DashboardOverviewPage() {
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
        
        {/* Recent Campaigns */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <Activity size={16} className="text-brand-400" />
                Recent Campaigns
              </h3>
              <Link href="/brand/dashboard/campaigns" className="text-xs font-medium text-[var(--brand-400)] hover:text-[var(--brand-300)] flex items-center">
                View All <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            
            <div className="flex flex-col gap-2">
              {RECENT_CAMPAIGNS.map((campaign, idx) => {
                const colors = {
                  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20 group-hover:bg-blue-500/20",
                  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500/20",
                  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20 group-hover:bg-purple-500/20",
                }[campaign.color as "blue" | "emerald" | "purple"] || "bg-brand-500/10 text-brand-400 border-brand-500/20 group-hover:bg-brand-500/20";
                
                return (
                  <motion.div 
                    key={campaign.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between group cursor-pointer hover:bg-[var(--bg-tertiary)] -mx-2 px-2 py-2.5 rounded-lg transition-colors gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border transition-colors ${colors}`}>
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-300)] transition-colors">{campaign.title}</h4>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{campaign.creators} creators hired • {campaign.budget}</p>
                      </div>
                    </div>
                    <Badge variant={campaign.status === "Active" ? "success" : "brand"} className="shadow-sm">
                      {campaign.status}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Suggested Creators */}
        <div className="lg:col-span-1">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <Users size={16} className="text-brand-400" />
                Suggested Creators
              </h3>
            </div>
            
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((i, idx) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 group cursor-pointer hover:bg-[var(--bg-tertiary)] -mx-2 px-2 py-2.5 rounded-lg transition-colors"
                >
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Creator" className="h-9 w-9 rounded-full object-cover border border-[var(--border-subtle)] group-hover:border-[var(--brand-400)]/50 transition-colors" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-300)] transition-colors">Creator {i}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">Travel • Assam</p>
                  </div>
                  <div className="p-1.5 rounded-md bg-[var(--brand-500)]/0 group-hover:bg-[var(--brand-500)]/10 transition-colors">
                    <ChevronRight className="h-4 w-4 text-[var(--text-tertiary)] group-hover:text-[var(--brand-400)] transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/creators" className="block mt-6">
              <Button variant="secondary" size="sm" className="w-full text-xs font-semibold shadow-sm border border-[var(--border-subtle)] hover:border-[var(--brand-500)]/30 hover:bg-[var(--brand-500)]/10 hover:text-[var(--brand-300)] transition-all">
                Discover More
              </Button>
            </Link>
          </Card>
        </div>

      </div>
    </div>
  );
}
