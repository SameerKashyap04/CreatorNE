"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  animated?: boolean;
  delay?: number;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  glow = false,
  animated = true,
  delay = 0,
  onClick,
}: GlassCardProps) {
  const Wrapper = animated ? motion.div : "div";

  const animProps = animated
    ? {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
        ...(hover && {
          whileHover: { y: -4, scale: 1.01 },
        }),
      }
    : {};

  return (
    <Wrapper
      className={[
        "glass-card relative overflow-hidden",
        hover ? "cursor-pointer transition-all duration-300 hover:border-[var(--border-brand)] hover:bg-[var(--bg-card-hover)]" : "",
        glow ? "shadow-[0_0_40px_rgba(97,118,246,0.12)]" : "",
        className,
      ].join(" ")}
      onClick={onClick}
      {...(animProps as any)}
    >
      {/* subtle inner highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/[0.05] to-transparent" />
      {children}
    </Wrapper>
  );
}
