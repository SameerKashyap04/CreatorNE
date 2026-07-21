"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = "", hoverable, onClick }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={[
        'bg-[var(--bg-glass)] backdrop-blur-xl border border-[var(--border-default)] rounded-[var(--radius-xl)] shadow-sm p-6 relative overflow-hidden',
        hoverable ? 'cursor-pointer transition-all duration-300 hover:bg-[var(--bg-card-hover)] hover:border-[var(--brand-400)]/40 hover:-translate-y-0.5 hover:shadow-lg' : '',
        className
      ].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/[0.04] to-transparent" />
      {children}
    </motion.div>
  );
}
