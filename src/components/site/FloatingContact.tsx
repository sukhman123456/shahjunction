import { useState, useEffect } from "react";
import { RESERVATION_CONTACT } from "@/lib/reservations";
import { business } from "@/lib/business";
import { cn } from "@/lib/utils";

export function FloatingContact() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      aria-label="Quick Social & WhatsApp Contact"
      className={cn(
        "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-2.5 sm:gap-3 print:hidden select-none transition-all duration-500 ease-out",
        scrolled
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-6 scale-90 pointer-events-none"
      )}
    >
      {/* ==================================================================== */}
      {/* 1. INSTAGRAM FLOATING BUTTON                                         */}
      {/* ==================================================================== */}
      <div className="relative group flex items-center">
        <a
          href={business.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow Shahi Junction Villa on Instagram ${business.instagramHandle}`}
          className="relative flex size-11 sm:size-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-[0_4px_16px_rgba(220,39,67,0.38)] hover:shadow-[0_6px_22px_rgba(220,39,67,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 ring-2 ring-white/20 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
        >
          {/* Crisp Instagram SVG Icon */}
          <svg
            className="size-5 sm:size-5.5 fill-none stroke-white stroke-2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>

        {/* Desktop Glide-out Tooltip */}
        <a
          href={business.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-none absolute right-full mr-2.5 hidden sm:group-hover:flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#1b140f]/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl border border-white/15 animate-in fade-in-0 zoom-in-95 duration-200"
        >
          <span className="size-1.5 rounded-full bg-pink-400" />
          <span>Follow {business.instagramHandle}</span>
        </a>
      </div>

      {/* ==================================================================== */}
      {/* 2. WHATSAPP FLOATING BUTTON (PREMIUM & MODERN)                      */}
      {/* ==================================================================== */}
      <div className="relative group flex items-center">
        {/* Subtle, Classy Breathing Aura Rings (Non-intrusive) */}
        <span
          className="pointer-events-none absolute -inset-1 rounded-full bg-emerald-500/25 animate-pulse"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -inset-2 rounded-full bg-emerald-400/15 animate-ping opacity-60"
          style={{ animationDuration: "3.2s" }}
          aria-hidden="true"
        />

        {/* Main WhatsApp Button */}
        <a
          href={RESERVATION_CONTACT.whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with Shahi Junction Villa on WhatsApp: ${RESERVATION_CONTACT.phoneDisplay}`}
          className="relative flex size-12 sm:size-13 items-center justify-center rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#1ebe5d] text-white shadow-[0_4px_18px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_28px_rgba(37,211,102,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 ring-2 ring-white/30 focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
        >
          {/* Authentic High-Precision WhatsApp SVG Icon */}
          <svg
            className="size-6 sm:size-6.5 fill-white drop-shadow-xs"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.201.3-.778.979-.954 1.18-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.101-.201.05-.377-.025-.527-.075-.15-.678-1.633-.929-2.236-.244-.588-.493-.508-.678-.518-.176-.01-.377-.01-.578-.01s-.527.075-.803.377c-.276.301-1.054 1.03-1.054 2.512 0 1.482 1.079 2.913 1.23 3.114.15.2 2.123 3.242 5.143 4.547.718.31 1.279.496 1.716.635.722.23 1.379.197 1.898.12.578-.087 1.78-.728 2.031-1.431.251-.703.251-1.306.176-1.431-.075-.125-.276-.201-.577-.351z" />
            <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.821.487 3.53 1.336 5.006L2 22l5.132-1.314A9.957 9.957 0 0 0 12.004 22c5.523 0 10.004-4.48 10.004-10S17.527 2 12.004 2zm0 18.062a8.03 8.03 0 0 1-4.092-1.116l-.293-.174-3.045.78.812-2.968-.191-.304A8.04 8.04 0 0 1 3.94 12c0-4.446 3.618-8.062 8.064-8.062 4.446 0 8.063 3.616 8.063 8.062 0 4.446-3.617 8.062-8.063 8.062z" />
          </svg>

          {/* Active Online Status Badge */}
          <span className="absolute top-0.5 right-0.5 size-3 rounded-full bg-emerald-300 border-2 border-white shadow-xs" />
        </a>

        {/* Desktop Glide-out Tooltip */}
        <a
          href={RESERVATION_CONTACT.whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-none absolute right-full mr-2.5 hidden sm:group-hover:flex items-center gap-2 whitespace-nowrap rounded-full bg-[#1b140f]/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl border border-white/15 animate-in fade-in-0 zoom-in-95 duration-200"
        >
          <span className="size-2 rounded-full bg-[#25D366] animate-ping" />
          <span>Chat on WhatsApp: {RESERVATION_CONTACT.phoneDisplay}</span>
        </a>
      </div>
    </aside>
  );
}
