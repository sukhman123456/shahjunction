import { cn } from "@/lib/utils";

/** Golden lotus & mandala-inspired emblem matching reference design */
export function PalaceMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn("size-9 sm:size-10 shrink-0 text-brass", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Central stylized lotus petal */}
      <path d="M24 6 C21 16 18 24 24 38 C30 24 27 16 24 6 Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M24 10 L24 34" strokeWidth="1" opacity="0.8" />
      
      {/* Left petal */}
      <path d="M22 20 C14 18 8 25 10 33 C14 36 19 32 22 28" fill="currentColor" fillOpacity="0.1" />
      <path d="M12 28 C16 27 19 28 21 30" strokeWidth="1" opacity="0.6" />
      
      {/* Right petal */}
      <path d="M26 20 C34 18 40 25 38 33 C34 36 29 32 26 28" fill="currentColor" fillOpacity="0.1" />
      <path d="M36 28 C32 27 29 28 27 30" strokeWidth="1" opacity="0.6" />

      {/* Decorative base curves */}
      <path d="M17 38 C21 41 27 41 31 38" strokeWidth="1.2" />
      <path d="M12 36 C8 37 6 40 8 42 C12 43 16 41 18 39" strokeWidth="1" />
      <path d="M36 36 C40 37 42 40 40 42 C36 43 32 41 30 39" strokeWidth="1" />
    </svg>
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark"; compact?: boolean }) {
  return (
    <a
      href="#home"
      className={cn(
        "group inline-flex items-center gap-2.5 sm:gap-3 transition-colors focus-visible:outline-hidden shrink-0",
        tone === "light" ? "text-on-dark" : "text-charcoal",
      )}
      aria-label="Shahi Junction Villa — Home"
    >
      <PalaceMark className="size-7 sm:size-9 lg:size-10 text-brass transition-transform duration-500 group-hover:scale-105 drop-shadow-sm" />
      <div className="flex flex-col text-left leading-tight">
        <span className="font-display text-[0.8rem] sm:text-[0.95rem] lg:text-[1.05rem] font-bold tracking-[0.16em] sm:tracking-[0.18em] uppercase text-white drop-shadow-sm">
          SHAHI JUNCTION VILLA
        </span>
        <span className="text-[0.46rem] sm:text-[0.54rem] lg:text-[0.6rem] font-medium tracking-[0.22em] sm:tracking-[0.26em] uppercase text-brass-light drop-shadow-sm">
          CELEBRATIONS BEYOND ORDINARY
        </span>
      </div>
    </a>
  );
}
