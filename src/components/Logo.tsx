import { Link } from "react-router-dom";
import { Brain, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  to?: string;
}

const sizes = {
  sm: { box: "h-8 w-8", icon: "h-4 w-4", text: "text-base" },
  md: { box: "h-10 w-10", icon: "h-5 w-5", text: "text-lg" },
  lg: { box: "h-12 w-12", icon: "h-6 w-6", text: "text-2xl" },
};

export const Logo = ({ className, size = "md", withText = true, to = "/" }: LogoProps) => {
  const s = sizes[size];
  const content = (
    <div className={cn("flex items-center gap-2.5 group", className)}>
      <div className={cn("relative grid place-items-center rounded-lg bg-gradient-primary glow-primary", s.box)}>
        <Brain className={cn("text-primary-foreground", s.icon)} strokeWidth={2.5} />
        <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-secondary-glow animate-pulse-glow rounded-full" />
      </div>
      {withText && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-display font-bold tracking-tight", s.text)}>
            Talent <span className="text-gradient">Nation</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">
            AI Engineering · SIWES
          </span>
        </div>
      )}
    </div>
  );
  return to ? <Link to={to} className="inline-flex">{content}</Link> : content;
};
