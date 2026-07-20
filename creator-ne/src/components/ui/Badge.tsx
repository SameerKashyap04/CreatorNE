"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "default" | "success" | "brand" | "warning";
  pulse?: boolean;
  className?: string;
}

const variantMap = {
  default: "border-[var(--border-default)] text-[var(--text-secondary)] bg-[var(--bg-glass)]",
  success: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  brand:
    "border-[var(--brand-500)]/40 text-purple-100 bg-[var(--brand-500)]/20 shadow-[0_0_10px_rgba(168,85,247,0.2)]",
  warning: "border-amber-500/30 text-amber-400 bg-amber-500/10",
};

export function Badge({
  children,
  icon,
  variant = "default",
  pulse = false,
  className = "",
}: BadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={[
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
        variantMap[variant],
        className
      ].filter(Boolean).join(" ")}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.span>
  );
}
