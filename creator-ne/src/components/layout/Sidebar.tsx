"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Settings,
  Compass,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  CreditCard,
  MessageSquare
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname() || "";

  // Determine role based on the URL path
  const isBrand = pathname.startsWith("/brand") || pathname.startsWith("/dashboard");
  const isAdmin = pathname.startsWith("/admin");
  const isCreator = pathname.startsWith("/creator");

  type ColorKey = "blue" | "emerald" | "purple" | "cyan" | "pink" | "amber";

  const colorStyles: Record<ColorKey, { activeBg: string; activeText: string; dotBg: string; iconColor: string; hoverText: string }> = {
    blue: {
      activeBg: "bg-blue-500/15 border border-blue-500/25",
      activeText: "text-blue-400 font-semibold",
      dotBg: "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]",
      iconColor: "text-blue-400",
      hoverText: "group-hover:text-blue-400",
    },
    emerald: {
      activeBg: "bg-emerald-500/15 border border-emerald-500/25",
      activeText: "text-emerald-400 font-semibold",
      dotBg: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
      iconColor: "text-emerald-400",
      hoverText: "group-hover:text-emerald-400",
    },
    purple: {
      activeBg: "bg-purple-500/15 border border-purple-500/25",
      activeText: "text-purple-400 font-semibold",
      dotBg: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]",
      iconColor: "text-purple-400",
      hoverText: "group-hover:text-purple-400",
    },
    cyan: {
      activeBg: "bg-cyan-500/15 border border-cyan-500/25",
      activeText: "text-cyan-400 font-semibold",
      dotBg: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]",
      iconColor: "text-cyan-400",
      hoverText: "group-hover:text-cyan-400",
    },
    pink: {
      activeBg: "bg-pink-500/15 border border-pink-500/25",
      activeText: "text-pink-400 font-semibold",
      dotBg: "bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]",
      iconColor: "text-pink-400",
      hoverText: "group-hover:text-pink-400",
    },
    amber: {
      activeBg: "bg-amber-500/15 border border-amber-500/25",
      activeText: "text-amber-400 font-semibold",
      dotBg: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
      iconColor: "text-amber-400",
      hoverText: "group-hover:text-amber-400",
    },
  };

  let navItems: { id: string; label: string; href: string; icon: React.ReactNode; color: ColorKey }[] = [];

  if (isAdmin) {
    navItems = [
      { id: "admin-dashboard", label: "Overview", href: "/admin", icon: <LayoutDashboard size={20} />, color: "blue" },
      { id: "admin-users", label: "Manage Users", href: "/admin/users", icon: <Users size={20} />, color: "purple" },
      { id: "admin-payments", label: "Payments", href: "/admin/payments", icon: <CreditCard size={20} />, color: "emerald" },
      { id: "admin-settings", label: "Settings", href: "/admin/settings", icon: <Settings size={20} />, color: "pink" },
    ];
  } else if (isBrand) {
    navItems = [
      { id: "brand-dashboard", label: "Dashboard", href: "/brand/dashboard", icon: <LayoutDashboard size={20} />, color: "blue" },
      { id: "brand-campaigns", label: "Campaigns", href: "/brand/campaigns", icon: <Briefcase size={20} />, color: "purple" },
      { id: "brand-creators", label: "Find Creators", href: "/brand/creators", icon: <Users size={20} />, color: "emerald" },
      { id: "brand-messages", label: "Messages", href: "/brand/messages", icon: <MessageSquare size={20} />, color: "cyan" },
      { id: "brand-settings", label: "Settings", href: "/brand/settings", icon: <Settings size={20} />, color: "pink" },
    ];
  } else {
    // Default to Creator
    navItems = [
      { id: "creator-dashboard", label: "Dashboard", href: "/creator/dashboard", icon: <LayoutDashboard size={20} />, color: "blue" },
      { id: "creator-analytics", label: "Analytics", href: "/creator/analytics", icon: <TrendingUp size={20} />, color: "emerald" },
      { id: "creator-collaborations", label: "Collaborations", href: "/creator/collaborations", icon: <Briefcase size={20} />, color: "purple" },
      { id: "creator-messages", label: "Messages", href: "/creator/messages", icon: <MessageSquare size={20} />, color: "cyan" },
      { id: "creator-settings", label: "Settings", href: "/creator/settings", icon: <Settings size={20} />, color: "pink" },
    ];
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="hidden md:flex glass-sidebar h-screen flex-col relative z-20 border-r border-[var(--border-subtle)] border-t-0 border-l-0 border-b-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-[var(--border-subtle)] h-[80px]">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-brand-600 to-[var(--accent-purple)] opacity-50 blur-md group-hover:opacity-80 transition-opacity" />
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-[var(--accent-purple)]">
              <Compass className="h-4 w-4 text-white" />
            </div>
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg font-bold tracking-tight whitespace-nowrap"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <span className="gradient-text">Creator</span>
              <span className="text-[var(--text-primary)]">NE</span>
            </motion.span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && item.href !== "/brand/dashboard" && item.href !== "/creator/dashboard" && pathname.startsWith(item.href));
          const cStyle = colorStyles[item.color];

          return (
            <Link key={item.id} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                  isActive
                    ? `${cStyle.activeBg} ${cStyle.activeText}`
                    : `text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5`
                }`}
              >
                <span className={`shrink-0 transition-colors ${isActive ? cStyle.iconColor : cStyle.hoverText}`}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-nowrap flex-1"
                  >
                    {item.label}
                  </motion.span>
                )}
                {isActive && !collapsed && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`ml-auto w-1.5 h-1.5 rounded-sm ${cStyle.dotBg}`}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-[var(--border-subtle)]">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 rounded-xl text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </motion.aside>
  );
}
