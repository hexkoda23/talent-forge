import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  to?: string;
}

const sizes = {
  sm: { mark: "text-3xl", text: "text-sm" },
  md: { mark: "text-4xl", text: "text-base" },
  lg: { mark: "text-5xl", text: "text-xl" },
};

export const Logo = ({ className, size = "md", withText = true, to = "/" }: LogoProps) => {
  const s = sizes[size];
  const content = (
    <div className={cn("flex items-center gap-3 font-mono", className)}>
      <span className={cn("leading-none text-foreground tracking-[-0.08em]", s.mark)}>01</span>
      {withText && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-normal tracking-[0.04em]", s.text)}>Talent Nation</span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Cognitive Games
          </span>
        </div>
      )}
    </div>
  );

  return to ? <Link to={to} className="inline-flex">{content}</Link> : content;
};
