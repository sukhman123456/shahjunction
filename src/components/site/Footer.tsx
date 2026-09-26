import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { business, directionsUrl, navLinks } from "@/lib/business";
import { RESERVATION_CONTACT } from "@/lib/reservations";
import { useBooking } from "@/context/BookingContext";
import { Logo } from "./Logo";

export function Footer() {
  const { openAdminModal } = useBooking();
  return (
    <footer className="bg-charcoal border-t border-line-dark text-on-dark relative overflow-hidden">
      {/* Subtle architectural palace silhouette watermarking in background */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 opacity-[0.03] select-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="currentColor" className="size-full">
          <path d="M50 5 L55 20 L45 20 Z M30 25 L35 35 L25 35 Z M70 25 L75 35 L65 35 Z M20 40 L80 40 L80 90 L20 90 Z" />
        </svg>
      </div>

      <div className="container-site relative z-10 grid gap-8 sm:gap-12 py-12 sm:py-16 lg:py-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
        {/* Brand & Description */}
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 sm:mt-6 max-w-sm text-xs sm:text-sm leading-relaxed text-on-dark-muted">
            Shah Junction Villa is a premier marriage palace, wedding and celebration venue located in Sahaipur, Punjab.
            Crafted for unforgettable weddings, grand receptions, and cherished family gatherings.
          </p>
          <div className="mt-5 sm:mt-6 inline-flex max-w-full flex-wrap items-center gap-2 rounded-sm border border-line-dark bg-charcoal-soft/70 px-3.5 py-1.5 text-xs text-brass">
            <span>{business.rating} ★ on Google Maps</span>
            <span className="text-on-dark-muted">({business.reviewCount} reviews)</span>
          </div>

          {/* Official Social Media Links */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={business.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-dark bg-charcoal-soft/80 px-3.5 py-1.5 text-xs text-on-dark transition-all hover:border-pink-500/60 hover:bg-gradient-to-r hover:from-purple-950/40 hover:to-pink-950/40 hover:text-white group"
            >
              <svg
                className="size-3.5 fill-none stroke-pink-400 stroke-2 group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="font-medium">{business.instagramHandle}</span>
              <ArrowUpRight className="size-3 text-on-dark-muted group-hover:text-pink-300" />
            </a>

            <a
              href={RESERVATION_CONTACT.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-dark bg-charcoal-soft/80 px-3.5 py-1.5 text-xs text-on-dark transition-all hover:border-emerald-500/60 hover:bg-emerald-950/30 hover:text-white group"
            >
              <span className="size-2 rounded-full bg-emerald-400" />
              <span className="font-medium">WhatsApp Us</span>
              <ArrowUpRight className="size-3 text-on-dark-muted group-hover:text-emerald-300" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav className="lg:col-span-3" aria-label="Footer Navigation">
          <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-brass uppercase">Navigation</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-on-dark/80 transition-colors hover:text-brass"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Location & Contact */}
        <div className="lg:col-span-3">
          <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-brass uppercase">Location</p>
          <address className="mt-5 space-y-2.5 text-sm not-italic text-on-dark/80">
            <p className="font-medium text-on-dark">{business.name}</p>
            <p>{business.address}</p>
            <p className="text-xs text-on-dark-muted">{business.locality}</p>
            <p className="font-mono text-xs text-brass-soft">{business.plusCode}</p>
            <div className="pt-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brass hover:underline"
              >
                <MapPin className="size-3.5" /> View on Google Maps <ArrowUpRight className="size-3" />
              </a>
            </div>
          </address>
        </div>

        {/* Hours & Contact */}
        <div className="lg:col-span-2">
          <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-brass uppercase">Enquiries & Bookings</p>
          <div className="mt-5 space-y-2 text-sm text-on-dark/80">
            <p className="font-medium text-on-dark">{business.openingHours}</p>
            <p className="text-xs text-on-dark-muted">Open 7 Days for Bookings & Visits</p>
          </div>
          <div className="mt-4 pt-2 space-y-2">
            <div>
              <span className="text-[10px] text-brass-light uppercase tracking-wider block font-semibold">
                Event Reservations:
              </span>
              <a
                href={RESERVATION_CONTACT.phoneTel}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brass transition-colors hover:text-white"
              >
                <Phone className="size-3.5 text-brass" /> {RESERVATION_CONTACT.phoneDisplay}
              </a>
            </div>
            <div>
              <span className="text-[10px] text-on-dark-muted uppercase tracking-wider block">
                General Enquiries:
              </span>
              <a
                href={`tel:${business.phoneTel}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-dark/80 transition-colors hover:text-brass"
              >
                <Phone className="size-3 text-brass/70" /> {business.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
            <span className="opacity-30">•</span>
            <button
              type="button"
              onClick={openAdminModal}
              title="Villa Owner Portal (Password Protected)"
              className="opacity-30 hover:opacity-100 hover:text-brass transition-all flex items-center gap-1 cursor-pointer text-[11px]"
            >
              <span>🔒</span>
              <span>Owner Admin</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <p lang="pa" className="font-gurmukhi text-sm text-brass">
              {business.namePunjabi} — {business.locality}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
