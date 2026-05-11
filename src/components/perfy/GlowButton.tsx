import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export const GlowButton = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", className, children, ...rest }, ref) => {
    const base =
      "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300";
    const styles =
      variant === "primary"
        ? "bg-gradient-to-r from-[hsl(var(--perfy-electric))] to-[hsl(var(--perfy-cyan))] text-black hover:scale-[1.03] animate-perfy-glow"
        : "bg-white/5 text-[hsl(var(--perfy-silver))] border border-white/15 hover:border-[hsl(var(--perfy-cyan))]/60 hover:text-white";
    return (
      <button ref={ref} className={cn(base, styles, className)} {...rest}>
        {children}
      </button>
    );
  }
);
GlowButton.displayName = "GlowButton";
