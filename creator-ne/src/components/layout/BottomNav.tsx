"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Settings,
  TrendingUp,
  CreditCard,
  MessageSquare
} from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname() || "";

  // Determine role based on the URL path
  const isBrand = pathname.startsWith("/brand") || pathname.startsWith("/dashboard");
  const isAdmin = pathname.startsWith("/admin");

  type ColorKey = "blue" | "emerald" | "purple" | "cyan" | "pink" | "amber";

  const colorStyles: Record<ColorKey, { activeText: string; dotBg: string; iconColor: string; hoverText: string }> = {
    blue: {
      activeText: "text-blue-400 font-semibold",
      dotBg: "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]",
      iconColor: "text-blue-400",
      hoverText: "hover:text-blue-400",
    },
    emerald: {
      activeText: "text-emerald-400 font-semibold",
      dotBg: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
      iconColor: "text-emerald-400",
      hoverText: "hover:text-emerald-400",
    },
    purple: {
      activeText: "text-purple-400 font-semibold",
      dotBg: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]",
      iconColor: "text-purple-400",
      hoverText: "hover:text-purple-400",
    },
    cyan: {
      activeText: "text-cyan-400 font-semibold",
      dotBg: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]",
      iconColor: "text-cyan-400",
      hoverText: "hover:text-cyan-400",
    },
    pink: {
      activeText: "text-pink-400 font-semibold",
      dotBg: "bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]",
      iconColor: "text-pink-400",
      hoverText: "hover:text-pink-400",
    },
    amber: {
      activeText: "text-amber-400 font-semibold",
      dotBg: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
      iconColor: "text-amber-400",
      hoverText: "hover:text-amber-400",
    },
  };

  let navItems: { id: string; label: string; href: string; icon: React.ReactNode; color: ColorKey }[] = [];

  if (isAdmin) {
    navItems = [
      { id: "admin-dashboard", label: "Overview", href: "/admin", icon: <LayoutDashboard size={20} />, color: "blue" },
      { id: "admin-users", label: "Users", href: "/admin/users", icon: <Users size={20} />, color: "purple" },
      { id: "admin-payments", label: "Payments", href: "/admin/payments", icon: <CreditCard size={20} />, color: "emerald" },
      { id: "admin-settings", label: "Settings", href: "/admin/settings", icon: <Settings size={20} />, color: "pink" },
    ];
  } else if (isBrand) {
    navItems = [
      { id: "brand-dashboard", label: "Dash", href: "/brand/dashboard", icon: <LayoutDashboard size={20} />, color: "blue" },
      { id: "brand-campaigns", label: "Campaigns", href: "/brand/campaigns", icon: <Briefcase size={20} />, color: "purple" },
      { id: "brand-creators", label: "Creators", href: "/brand/creators", icon: <Users size={20} />, color: "emerald" },
      { id: "brand-messages", label: "Messages", href: "/brand/messages", icon: <MessageSquare size={20} />, color: "cyan" },
    ];
  } else {
    // Default to Creator
    navItems = [
      { id: "creator-dashboard", label: "Dash", href: "/creator/dashboard", icon: <LayoutDashboard size={20} />, color: "blue" },
      { id: "creator-analytics", label: "Analytics", href: "/creator/analytics", icon: <TrendingUp size={20} />, color: "emerald" },
      { id: "creator-collaborations", label: "Collabs", href: "/creator/collaborations", icon: <Briefcase size={20} />, color: "purple" },
      { id: "creator-messages", label: "Messages", href: "/creator/messages", icon: <MessageSquare size={20} />, color: "cyan" },
    ];
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-t border-[var(--border-subtle)] pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <nav className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && item.href !== "/brand/dashboard" && item.href !== "/creator/dashboard" && pathname.startsWith(item.href));
          const cStyle = colorStyles[item.color];

          return (
            <Link key={item.id} href={item.href} className="flex-1 flex flex-col items-center justify-center gap-1">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`relative flex flex-col items-center p-1.5 rounded-lg transition-colors ${isActive ? "" : "text-[var(--text-secondary)] hover:text-white"}`}
              >
                <span className={`${isActive ? cStyle.iconColor : cStyle.hoverText}`}>
                  {item.icon}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeBottomNav"
                    className={`absolute -top-3 w-1.5 h-1.5 rounded-sm ${cStyle.dotBg}`}
                  />
                )}
              </motion.div>
              <span className={`text-[10px] ${isActive ? cStyle.activeText : "text-[var(--text-secondary)]"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
