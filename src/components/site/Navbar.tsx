import { ChevronRight, Menu, MessageCircle, Phone, X, MoreVertical, UtensilsCrossed } from "lucide-react";
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

const whatsappUrl = `https://wa.me/918728060036?text=${encodeURIComponent(
  "Hello Shah Junction Villa, I would like to enquire about booking an event / checking dates."
)}`;

interface NavbarProps {
  introState?: "playing" | "finished";
}

export function Navbar({ introState = "finished" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { openBookingModal, openDigitalMenu } = useBooking();
  const isPlaying = introState === "playing";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 160);

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
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-16 lg:h-20 transition-all duration-700 ease-out",
          isPlaying
            ? "hero-anim-watermark pointer-events-none"
            : "opacity-100 translate-y-0",
          open
            ? "bg-[#13110e] border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
            : scrolled
              ? "bg-[#13110e]/95 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
              : "bg-gradient-to-b from-black/85 via-black/35 to-transparent",
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-[92rem] items-center justify-between px-3 sm:px-6 lg:px-12">
          {/* 
            Left side:
            - On Mobile: Untouched Logo + Royal Brand Title (eliminates the empty void completely!)
            - On Desktop: Logo closely paired next to HOME
          */}
          <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-8">
            <Logo tone="light" compact={scrolled} />

            {/* Mobile Brand Title: Balances the mobile header with luxury elegance */}
            <div className="flex flex-col text-left leading-tight lg:hidden">
              <span className="font-display text-[0.80rem] sm:text-[0.92rem] font-bold tracking-[0.14em] uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                SHAH JUNCTION VILLA
              </span>
              <span className="text-[0.42rem] sm:text-[0.50rem] tracking-[0.20em] uppercase font-semibold text-brass-light flex items-center gap-1 mt-0.5">
                <span className="size-1 rounded-full bg-emerald-400 animate-pulse" />
                <span>PALACE & RESORT</span>
                <span className="text-white/40 hidden sm:inline">•</span>
                <span className="text-white/70 font-serif hidden sm:inline">ਸ਼ਾਹ ਜੰਕਸ਼ਨ ਵਿਲਾ</span>
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main Navigation">
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
          </div>

          {/* Right side: Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3.5">
            <a
              href={`tel:${business.phoneTel}`}
              className="hidden 2xl:inline-flex items-center gap-1.5 rounded-full border border-brass/40 bg-black/40 backdrop-blur-xs px-3.5 py-1.5 text-[0.68rem] font-semibold tracking-wider text-brass-light hover:border-brass hover:text-white transition-all shadow-sm"
            >
              <Phone className="size-3 text-brass animate-pulse" />
              <span>{business.phoneDisplay}</span>
            </a>
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

            {/* Desktop Digital MENU Button */}
            <button
              type="button"
              onClick={() => openDigitalMenu()}
              className="group relative inline-flex items-center gap-1.5 rounded-full border border-brass/50 bg-brass/15 hover:bg-brass hover:text-charcoal backdrop-blur-xs px-4 py-2 text-[0.72rem] font-bold tracking-[0.16em] uppercase text-brass-light transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
              title="Open Digital Menu"
            >
              <UtensilsCrossed className="size-3.5 text-brass group-hover:text-charcoal transition-colors" />
              <span>MENU</span>
            </button>

            {/* Desktop Three-dot Menu Icon */}
            <button
              type="button"
              aria-label="Open digital menu"
              onClick={() => openDigitalMenu()}
              className="flex size-9 items-center justify-center rounded-full border border-white/25 hover:border-brass hover:text-brass-light text-white/80 transition-all cursor-pointer"
              title="Menu Options"
            >
              <MoreVertical className="size-4" />
            </button>

            <button
              type="button"
              onClick={() => openBookingModal()}
              className="group relative inline-flex items-center justify-center rounded-full border border-white/45 bg-white/5 backdrop-blur-xs px-6 py-2.5 text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-white shadow-sm transition-all duration-300 hover:border-brass-light hover:bg-white/15 hover:text-brass-light hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>BOOK YOUR EVENT</span>
            </button>
          </div>

          {/* 
            Right side on Mobile:
            - 1-Tap Call Button (Gold Glowing Pill)
            - 1-Tap WhatsApp Button (Emerald Badge)
            - Luxury Hamburger Menu Button
          */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {/* Quick 1-Tap Actions: ONLY show when scrolled down, completely hidden at top */}
            <div
              className={cn(
                "flex items-center gap-1.5 transition-all duration-300 ease-out overflow-hidden origin-right",
                scrolled && !open
                  ? "max-w-[48px] opacity-100 scale-100 pointer-events-auto"
                  : "max-w-0 opacity-0 scale-75 pointer-events-none"
              )}
            >
              {/* Quick 1-Tap Call */}
              <a
                href={`tel:${business.phoneTel}`}
                aria-label={`Call Venue ${business.phoneDisplay}`}
                className="flex size-8.5 items-center justify-center rounded-lg bg-gradient-to-r from-brass-deep to-brass text-charcoal shadow-sm active:scale-90 transition-transform shrink-0"
                title="Call Venue"
              >
                <Phone className="size-3.5 text-charcoal fill-charcoal" />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
              className="relative z-50 size-9 sm:size-10 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white active:scale-90 hover:bg-white/20 hover:text-brass-light hover:border-brass/40 transition-all cursor-pointer select-none flex"
            >
              {open ? <X className="size-5 text-brass-light" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 
        SIRA Mobile Navigation Drawer:
        - Full-screen luxury sheet anchored to header
        - Palace welcome badge
        - Interactive nav rows with chevrons
        - Grand Action CTA buttons
      */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 flex flex-col bg-[#13110e] lg:hidden animate-in fade-in-0 slide-in-from-top-2 duration-200 border-t border-white/10 overflow-y-auto">
          {/* Royal Palace Welcome Header Card */}
          <div className="p-4 mx-4 mt-4 rounded-2xl bg-gradient-to-br from-charcoal-soft to-charcoal border border-brass/25 shadow-lg flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[0.62rem] font-mono tracking-widest uppercase text-brass-light flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SAHAIPUR, PUNJAB</span>
              </span>
              <span className="font-display text-base font-bold text-white tracking-wide mt-0.5">
                Shah Junction Villa
              </span>
              <span className="text-[0.68rem] text-white/60">
                Marriage Palace & Celebration Resort
              </span>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 rounded-full bg-brass/15 border border-brass/40 px-2 py-0.5 text-[0.65rem] font-bold text-brass">
                ★ {business.rating}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col px-4 pt-3 pb-2" aria-label="Mobile Navigation">
            {/* Prominent MENU option right at top of menu */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openDigitalMenu();
              }}
              className="group flex items-center justify-between py-3 px-3.5 rounded-xl bg-gradient-to-r from-brass/25 via-brass/15 to-transparent border border-brass/45 hover:bg-brass/30 transition-all text-left mb-2 cursor-pointer shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-8.5 items-center justify-center rounded-lg bg-brass text-charcoal shadow-xs">
                  <UtensilsCrossed className="size-4 text-charcoal" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-base font-bold tracking-[0.16em] uppercase text-brass-light">
                      MENU
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-brass/30 text-[10px] font-bold uppercase tracking-wider text-brass-light">
                      Golden Menu
                    </span>
                  </div>
                  <span className="text-[11px] text-soft-cream/60">
                    Palace Catering & Wedding Selection
                  </span>
                </div>
              </div>
              <ChevronRight className="size-4 text-brass-light group-hover:translate-x-1 transition-transform" />
            </button>

            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between py-3 px-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors border-b border-white/5 last:border-b-0"
              >
                <span className="font-display text-base sm:text-lg font-medium tracking-[0.16em] uppercase text-white/95 group-hover:text-brass-light transition-colors">
                  {item.label}
                </span>
                <ChevronRight className="size-4 text-white/30 group-hover:text-brass-light transition-colors" />
              </a>
            ))}
          </nav>

          {/* High-Impact Actions at bottom */}
          <div className="p-4 mt-auto border-t border-white/10 bg-black/30 flex flex-col gap-2.5">
            {/* Grand Event Booking Button */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openBookingModal();
              }}
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-brass-deep via-brass to-brass-light py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-charcoal shadow-[0_4px_20px_rgba(212,175,55,0.35)] cursor-pointer active:scale-95 transition-transform"
            >
              BOOK YOUR EVENT
            </button>

            {/* Quick Contact Grid */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${business.phoneTel}`}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-brass/40 bg-brass/10 py-2.5 text-xs font-bold tracking-wider text-brass-light hover:text-white transition-colors"
              >
                <Phone className="size-3.5" />
                <span>Call Venue</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/15 py-2.5 text-xs font-bold tracking-wider text-[#25D366] hover:text-white transition-colors"
              >
                <MessageCircle className="size-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Instagram Profile */}
            <a
              href={business.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-pink-500/30 bg-pink-950/20 py-2 text-xs font-medium text-pink-300 hover:text-white transition-colors"
            >
              <svg
                className="size-3.5 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>{business.instagramHandle}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
