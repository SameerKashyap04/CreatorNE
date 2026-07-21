"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, UserCheck, AlertCircle, Check, X, ShieldAlert, Activity } from "lucide-react";
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
  { label: "Pending Approvals", value: "12", icon: <UserCheck size={20} />, trend: { value: 14, isPositive: true }, color: "amber" },
  { label: "Total Creators", value: "3,405", icon: <Users size={20} />, trend: { value: 5.2, isPositive: true }, color: "brand" },
  { label: "Total Brands", value: "142", icon: <Briefcase size={20} />, trend: { value: 2.1, isPositive: true }, color: "purple" },
  { label: "Active Campaigns", value: "28", icon: <AlertCircle size={20} />, trend: { value: 8, isPositive: false }, color: "cyan" },
];

const PENDING_CREATORS = [
  { id: 1, name: "Arunav Bora", category: "Travel", state: "Assam", followers: "125K" },
  { id: 2, name: "Zorini Khawlhring", category: "Fashion", state: "Mizoram", followers: "89K" },
  { id: 3, name: "David Lanu", category: "Music", state: "Nagaland", followers: "210K" },
];

export default function AdminOverviewPage() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Approvals Queue */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <ShieldAlert size={16} className="text-brand-400" />
                Pending Creator Approvals
              </h3>
              <Badge variant="warning">12 Pending</Badge>
            </div>
            
            <div className="flex flex-col gap-2">
              {PENDING_CREATORS.map((creator, idx) => (
                <motion.div 
                  key={creator.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between group cursor-pointer hover:bg-[var(--bg-tertiary)] -mx-2 px-3 py-3 sm:py-2.5 rounded-lg transition-colors gap-3 sm:gap-4 border border-[var(--border-subtle)] sm:border-transparent mb-2 sm:mb-0"
                >
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <img src={`https://i.pravatar.cc/150?u=${creator.id}`} alt={creator.name} className="h-9 w-9 rounded-full object-cover border border-[var(--border-subtle)] group-hover:border-[var(--brand-400)]/50 transition-colors" />
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-300)] transition-colors">{creator.name}</h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">{creator.category} • {creator.state} • {creator.followers} followers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-[var(--border-subtle)] sm:border-t-0">
                    <Button 
                      variant="secondary" 
                      size="sm"
                      icon={<X className="h-3.5 w-3.5" />}
                      className="h-8 !py-0 text-xs font-semibold px-3 flex-1 sm:flex-none justify-center !text-rose-400 !border !border-rose-500/30 hover:!border-rose-500/60 hover:!bg-rose-500/10 !bg-transparent rounded-lg transition-all"
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      icon={<Check className="h-3.5 w-3.5" />}
                      className="h-8 !py-0 text-xs font-semibold px-3 flex-1 sm:flex-none justify-center !text-emerald-400 !border !border-emerald-400/30 hover:!border-emerald-400/60 hover:!bg-emerald-400/10 !bg-transparent rounded-lg transition-all"
                    >
                      Approve
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-xs text-[var(--text-secondary)] hover:text-[var(--brand-300)] hover:bg-[var(--brand-500)]/10">View all pending applications</Button>
          </Card>
        </div>

        {/* System Health */}
        <div className="lg:col-span-1">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <Activity size={16} className="text-brand-400" />
                System Health
              </h3>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center justify-between py-3 border-b border-[var(--border-subtle)] group hover:bg-[var(--bg-tertiary)] -mx-2 px-2 transition-colors">
                <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">Database Connection</span>
                <Badge variant="success" className="shadow-sm border-emerald-500/20 bg-emerald-500/10 text-emerald-400">Operational</Badge>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[var(--border-subtle)] group hover:bg-[var(--bg-tertiary)] -mx-2 px-2 transition-colors">
                <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">API Latency</span>
                <span className="text-sm font-bold text-blue-400">42ms</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[var(--border-subtle)] group hover:bg-[var(--bg-tertiary)] -mx-2 px-2 transition-colors">
                <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">Active Users (15m)</span>
                <span className="text-sm font-bold text-purple-400">84</span>
              </div>
            </div>

            <div className="mt-6 pt-6">
              <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">Quick Actions</h3>
              <div className="flex flex-col gap-2">
                <Button variant="secondary" className="w-full justify-start text-xs font-medium border border-[var(--border-subtle)] hover:border-[var(--brand-500)]/30 hover:bg-[var(--brand-500)]/10 hover:text-[var(--brand-300)] transition-all">Export Creator Data (CSV)</Button>
                <Button variant="secondary" className="w-full justify-start text-xs font-medium border border-[var(--border-subtle)] hover:border-[var(--brand-500)]/30 hover:bg-[var(--brand-500)]/10 hover:text-[var(--brand-300)] transition-all">Manage Banners</Button>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
