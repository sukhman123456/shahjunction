import { MapPin, Phone, Send } from "lucide-react";
import shahiVillaReal from "@/assets/shahi-villa-real.jpg";
import { business, directionsUrl } from "@/lib/business";
import { RESERVATION_CONTACT } from "@/lib/reservations";
import { useBooking } from "@/context/BookingContext";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";

export function FinalCta() {
  const { openBookingModal } = useBooking();
  return (
    <section className="relative overflow-hidden bg-charcoal py-20 sm:py-28 lg:py-36 text-on-dark">
      {/* Background real palace photography */}
      <img
        src={shahiVillaReal}
        alt="Shahi Junction Villa illuminated marriage palace in Sahaipur, Punjab"
        width={1920}
        height={1080}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover object-[center_40%] opacity-40"
      />

      {/* Regal rich gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/85 to-charcoal/60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(var(--color-brass)_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <Reveal className="container-site relative z-10 flex flex-col items-center text-center">
        <span className="eyebrow justify-center text-brass-soft">RESERVE YOUR DATE</span>

        <h2 className="mt-4 sm:mt-6 max-w-4xl font-display text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight break-words">
          YOUR CELEBRATION DESERVES <br />
          <span className="italic font-medium text-brass-light">THE RIGHT SETTING</span>
        </h2>

        <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-on-dark/85">
          Make your next celebration memorable in a space designed for beautiful moments.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3.5 w-full sm:w-auto justify-center">
          <button
            type="button"
            onClick={() => openBookingModal()}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-brass-light/90 bg-gradient-to-r from-brass-deep via-brass to-brass-light px-8 text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-charcoal shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Send className="size-4" /> BOOK YOUR EVENT
          </button>
          <a
            href={RESERVATION_CONTACT.phoneTel}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-xs px-8 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-white transition-all cursor-pointer"
          >
            <Phone className="size-4 text-brass" /> Call: {RESERVATION_CONTACT.phoneDisplay}
          </a>
          <ButtonLink
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlineLight"
            size="lg"
            className="w-full sm:w-auto text-center"
          >
            <MapPin className="size-4" /> GET DIRECTIONS
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
