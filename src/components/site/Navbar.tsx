import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useBooking } from "@/context/BookingContext";
import { business } from "@/lib/business";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "WEDDINGS", href: "#occasions" },
  { label: "RESERVATIONS", href: "#reservations" },
  { label: "GALLERY", href: "#gallery" },
  { label: "RESTAURANT & BAR", href: "#restaurant" },
  { label: "CONTACT", href: "#location" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { openBookingModal } = useBooking();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["home", "about", "occasions", "reservations", "gallery", "restaurant", "location"];
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-400 ease-out",
        scrolled
          ? "bg-charcoal/90 backdrop-blur-md py-2 sm:py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/10"
          : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-2 sm:py-3.5",
      )}
    >
      <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Left: Lotus Emblem & Brand Title */}
        <Logo tone="light" />

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8" aria-label="Main Navigation">
          {navItems.map((item) => {
            const secId = item.href.replace("#", "");
            const isActive = activeSection === secId;

            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "relative py-1 text-[0.72rem] xl:text-[0.76rem] font-medium tracking-[0.2em] uppercase transition-colors duration-300",
                  isActive
                    ? "text-brass-light font-semibold"
                    : "text-white/85 hover:text-brass-light",
                )}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-brass-light/80" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Desktop Action Button & Instagram */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow on Instagram ${business.instagramHandle}`}
            className="flex size-9 items-center justify-center rounded-full border border-white/30 text-white/90 hover:border-pink-400 hover:text-pink-400 hover:scale-105 transition-all"
            title={`Instagram: ${business.instagramHandle}`}
          >
            <svg
              className="size-4.5 fill-none stroke-current stroke-2"
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

          <button
            type="button"
            onClick={() => openBookingModal()}
            className="group relative inline-flex items-center justify-center rounded-full border border-white/45 bg-white/5 backdrop-blur-xs px-6 py-2.5 text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-white shadow-sm transition-all duration-300 hover:border-brass-light hover:bg-white/15 hover:text-brass-light hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>BOOK YOUR EVENT</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="flex lg:hidden size-10 items-center justify-center rounded-full text-white hover:text-brass-light transition-colors"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <div className="fixed inset-0 top-[68px] z-40 flex flex-col bg-charcoal/98 backdrop-blur-xl p-6 lg:hidden animate-in fade-in-0 duration-300 border-t border-white/10">
          <nav className="flex flex-col gap-5 pt-4 text-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-xl font-medium tracking-[0.2em] uppercase text-white hover:text-brass-light transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-6 border-t border-white/10 mt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openBookingModal();
                }}
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-brass-deep via-brass to-brass-light py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-charcoal shadow-lg cursor-pointer"
              >
                BOOK YOUR EVENT
              </button>
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-pink-500/40 bg-pink-950/20 py-2.5 text-xs font-bold text-pink-300 hover:text-white transition-colors"
              >
                <svg
                  className="size-4 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>Instagram: {business.instagramHandle}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
