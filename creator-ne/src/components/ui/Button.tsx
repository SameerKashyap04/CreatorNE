"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  glow?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "relative overflow-hidden bg-gradient-to-r from-brand-600 to-[var(--accent-purple)] text-white shadow-[0_0_24px_rgba(97,118,246,0.35)] hover:shadow-[0_0_40px_rgba(97,118,246,0.5)] hover:from-brand-500 hover:to-[var(--accent-purple)]",
  secondary:
    "bg-[var(--bg-glass-strong)] border border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-brand)]",
  ghost:
    "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass)]",
  outline:
    "border border-[var(--border-brand)] text-[var(--brand-400)] hover:bg-[var(--brand-500)]/10 hover:border-brand-400",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-[var(--radius-md)] gap-1.5",
  md: "px-6 py-3 text-sm rounded-[var(--radius-lg)] gap-2",
  lg: "px-8 py-4 text-base rounded-[var(--radius-xl)] gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  iconPosition = "left",
  loading = false,
  glow = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={[
        "inline-flex items-center justify-center font-medium",
        "transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]",
        "cursor-pointer select-none",
        variantClasses[variant],
        sizeClasses[size],
        glow ? "pulse-glow" : "",
        className,
      ].join(" ")}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {/* Shimmer overlay for primary */}
      {variant === "primary" && (
        <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
      )}

      {loading ? (
        <svg
          className="animate-spin w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="shrink-0">{icon}</span>
          )}
          <span>{children}</span>
          {icon && iconPosition === "right" && (
            <span className="shrink-0">{icon}</span>
          )}
        </>
      )}
    </motion.button>
  );
}
