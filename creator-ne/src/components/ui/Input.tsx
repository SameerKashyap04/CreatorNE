import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, leftIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-[var(--text-secondary)]">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={[
              "w-full bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
              "focus:outline-none focus:border-[var(--brand-500)] focus:ring-1 focus:ring-[var(--brand-500)]",
              "transition-colors duration-200",
              leftIcon ? "pl-10" : "",
              error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "",
              className,
            ].join(" ")}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
