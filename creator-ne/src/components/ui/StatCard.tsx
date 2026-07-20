"use client";

import React from "react";
import { motion } from "framer-motion";

export type StatColor = 'brand' | 'purple' | 'blue' | 'cyan' | 'pink' | 'emerald' | 'rose' | 'amber';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
  color?: StatColor;
}

const colorMap: Record<StatColor, string> = {
  brand: "bg-[#4a52ef]/15 text-[#6176f6]",
  purple: "bg-purple-500/15 text-purple-400",
  blue: "bg-blue-500/15 text-blue-400",
  cyan: "bg-cyan-500/15 text-cyan-400",
  pink: "bg-pink-500/15 text-pink-400",
  emerald: "bg-emerald-500/15 text-emerald-400",
  rose: "bg-rose-500/15 text-rose-400",
  amber: "bg-amber-500/15 text-amber-400",
};

export function StatCard({ title, value, icon, trend, delay = 0, color = 'brand' }: StatCardProps) {
  const colorClass = colorMap[color] || colorMap.brand;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.4 }}
      className="stat-card"
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`p-2 rounded-lg ${colorClass}`}>
          {icon}
        </span>
        {trend && (
          <span className={`text-xs font-medium ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-[var(--text-primary)] mb-0.5">
        {value}
      </div>
      <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
        {title}
      </div>
    </motion.div>
  );
}
