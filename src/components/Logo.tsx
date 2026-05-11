import logo from "@/assets/perfy-logo.png";

type LogoSize = "sm" | "md" | "lg" | "xl";

const SIZE_MAP: Record<LogoSize, string> = {
  sm: "h-14",   // compact (scrolled header, dense UI)
  md: "h-20",   // default (footer, body)
  lg: "h-24",   // prominent (admin, section heads)
  xl: "h-32",   // hero (top of header at rest)
};

interface LogoProps {
  size?: LogoSize;
  className?: string;
  showTagline?: boolean;
}

export const Logo = ({ size = "md", className = "", showTagline = false }: LogoProps) => (
  <div className="flex items-center gap-3">
    <img
      src={logo}
      alt="Perfy"
      className={`${SIZE_MAP[size]} w-auto drop-shadow-sm transition-all ${className}`}
    />
    {showTagline && (
      <span className="hidden sm:inline text-xs text-muted-foreground tracking-wide">
        From effort to impact
      </span>
    )}
  </div>
);
