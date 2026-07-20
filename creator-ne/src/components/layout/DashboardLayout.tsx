"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface DashboardLayoutProps {
  children: React.ReactNode;
  headerTitle?: string;
  headerDescription?: string;
}

export default function DashboardLayout({ children, headerTitle, headerDescription }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[var(--bg-primary)] overflow-hidden">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
      />

      <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
          <div>
            {headerTitle && <h1 className="text-2xl font-bold text-[var(--text-primary)]">{headerTitle}</h1>}
            {headerDescription && <p className="text-sm text-[var(--text-secondary)] mt-1">{headerDescription}</p>}
          </div>

          <div className="flex items-center gap-6">
            <div className="w-64 hidden md:block">
              <Input
                type="text"
                placeholder="Search..."
                leftIcon={<Search size={16} />}
                className="bg-white/5 border-transparent h-10"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 border-2 border-[var(--bg-primary)]" />
              </button>
              
              <div className="h-8 w-px bg-[var(--border-subtle)] mx-1" />
              
              <button className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[var(--brand-400)] to-[var(--accent-purple)] text-white shadow-lg">
                <User size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-[1400px] mx-auto w-full flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
