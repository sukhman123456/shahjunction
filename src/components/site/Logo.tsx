import { cn } from "@/lib/utils";
import logoPng from "@/assets/shah-junction-villa-logo.png";

/** Golden emblem mark for location / small badge */
export function PalaceMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden flex items-center justify-center select-none",
        className
      )}
    >
      <img
        src={logoPng}
        alt="Shah Junction Crest"
        className="size-full object-contain pointer-events-none drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
      />
    </div>
  );
}

interface LogoProps {
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
  variant?: "brand" | "emblem";
  onClick?: () => void;
}

export function Logo({
  compact = false,
  className,
  variant = "brand",
  onClick,
}: LogoProps) {
  if (variant === "emblem") {
    return (
      <a
        href="#home"
        onClick={onClick}
        className={cn(
          "group inline-flex items-center transition-transform duration-300 hover:scale-105 focus-visible:outline-hidden shrink-0 select-none",
          className
        )}
        aria-label="Shah Junction Villa — Home"
      >
        <PalaceMark
          className={cn(
            compact ? "size-9 sm:size-10" : "size-11 sm:size-12"
          )}
        />
      </a>
    );
  }

  return (
    <a
      href="#home"
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center shrink-0 transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-hidden select-none py-0.5",
        className
      )}
      aria-label="Shah Junction Villa — Where Comfort Meets Luxury"
    >
      {/* 
        Clean Transparent Official Logo (Exact Graphic & Text Only, No Extra Labels)
      */}
      <img
        src={logoPng}
        alt="Shah Junction Villa — Where Comfort Meets Luxury"
        className={cn(
          "object-contain w-auto transition-all duration-300 pointer-events-none select-none",
          compact
            ? "h-11 sm:h-12 md:h-13 max-h-[52px]"
            : "h-13 sm:h-15 md:h-16 lg:h-18 max-h-[72px]",
          "drop-shadow-[0_2px_14px_rgba(212,175,55,0.45)] group-hover:drop-shadow-[0_4px_22px_rgba(212,175,55,0.85)]"
        )}
        loading="eager"
        decoding="sync"
      />
    </a>
  );
}
