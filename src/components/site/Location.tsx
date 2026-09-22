import { ArrowUpRight, Clock, MapPin, Navigation, Phone, ShieldCheck } from "lucide-react";
import { business, directionsUrl } from "@/lib/business";
import { ButtonLink } from "./Button";
import { PalaceMark } from "./Logo";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Location() {
  return (
    <section id="location" className="bg-warm-beige py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="container-site grid gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Verified Location Card */}
        <Reveal className="lg:col-span-5">
          <SectionHeading
            eyebrow="DESTINATION & DIRECTIONS"
            title="FIND SHAHI JUNCTION VILLA"
            lead="Conveniently located in Sahaipur, Punjab for couples and celebratory parties arriving across the region."
          />

          <dl className="mt-6 sm:mt-8 divide-y divide-border border-y border-border bg-soft-cream/70 rounded-sm px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-[6.5rem_1fr] gap-1 sm:gap-4 py-3.5 sm:py-5">
              <dt className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground pt-0.5 sm:pt-1">
                Venue
              </dt>
              <dd className="font-display text-xl sm:text-2xl font-semibold text-charcoal">
                {business.name}
                <span className="block text-xs font-sans font-normal text-muted-foreground mt-0.5">
                  {business.legalName}
                </span>
              </dd>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[6.5rem_1fr] gap-1 sm:gap-4 py-3.5 sm:py-5">
              <dt className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground pt-0.5 sm:pt-1">
                Address
              </dt>
              <dd className="font-display text-lg sm:text-xl font-medium text-charcoal">
                {business.address}
                <span className="block text-xs font-sans text-muted-foreground mt-0.5">
                  Near Tibber, Gurdaspur District, Punjab
                </span>
              </dd>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[6.5rem_1fr] gap-1 sm:gap-4 py-3.5 sm:py-5">
              <dt className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground pt-0.5 sm:pt-1">
                Plus Code
              </dt>
              <dd className="font-mono text-sm text-olive-deep font-semibold">
                {business.plusCode}
              </dd>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[6.5rem_1fr] gap-1 sm:gap-4 py-3.5 sm:py-5">
              <dt className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground pt-0.5 sm:pt-1">
                Phone
              </dt>
              <dd>
                <a
                  href={`tel:${business.phoneTel}`}
                  className="font-display text-xl sm:text-2xl font-semibold text-charcoal transition-colors hover:text-olive-deep"
                >
                  {business.phoneDisplay}
                </a>
                <span className="block text-xs font-sans text-muted-foreground mt-0.5">
                  Event enquiries & venue visitation
                </span>
              </dd>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[6.5rem_1fr] gap-1 sm:gap-4 py-3.5 sm:py-5">
              <dt className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground pt-0.5 sm:pt-1">
                Instagram
              </dt>
              <dd>
                <a
                  href={business.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-display text-lg sm:text-xl font-medium text-charcoal hover:text-pink-700 transition-colors"
                >
                  <svg
                    className="size-4.5 fill-none stroke-pink-600 stroke-2"
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
                  <ArrowUpRight className="size-3.5 text-muted-foreground" />
                </a>
                <span className="block text-xs font-sans text-muted-foreground mt-0.5">
                  Follow for wedding highlights, decor & live banquet stories
                </span>
              </dd>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[6.5rem_1fr] gap-1 sm:gap-4 py-3.5 sm:py-5">
              <dt className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground pt-0.5 sm:pt-1">
                Hours
              </dt>
              <dd className="flex items-center gap-2 text-sm sm:text-base font-medium text-charcoal">
                <Clock className="size-4 text-olive shrink-0" />
                <span>{business.openingHours}</span>
              </dd>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[6.5rem_1fr] gap-1 sm:gap-4 py-3.5 sm:py-5">
              <dt className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground pt-0.5 sm:pt-1">
                Facilities
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {business.services.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 rounded-xs bg-warm-beige px-2.5 py-1 text-[0.7rem] sm:text-xs font-medium text-charcoal"
                  >
                    <ShieldCheck className="size-3 text-olive shrink-0" /> {s}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
            <ButtonLink
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="olive"
              size="lg"
              className="w-full sm:w-auto text-center"
            >
              <Navigation className="size-4" /> GET DIRECTIONS
            </ButtonLink>
            <ButtonLink
              href={`tel:${business.phoneTel}`}
              variant="outlineDark"
              size="lg"
              className="w-full sm:w-auto text-center"
            >
              <Phone className="size-4" /> Call Venue
            </ButtonLink>
          </div>
        </Reveal>

        {/* Live Interactive Map Box */}
        <Reveal delay={120} className="lg:col-span-7">
          <div className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-soft-cream shadow-card lg:h-full lg:min-h-[34rem]">
            <div className="relative h-64 sm:h-72 w-full flex-1 min-h-[16rem] sm:min-h-[18rem] bg-warm-beige-deep/50 overflow-hidden">
              <iframe
                title="Shah Junction Villa Location on Google Maps"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  business.plusCode,
                )}&output=embed`}
                width="100%"
                height="100%"
                className="size-full border-0 grayscale-[25%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2 rounded-sm border border-brass/40 bg-charcoal/90 px-3 py-1.5 text-xs text-on-dark shadow-lift backdrop-blur-md max-w-[calc(100%-1.5rem)] truncate">
                <span className="size-2 rounded-full bg-brass animate-pulse shrink-0" />
                <span className="font-semibold text-brass truncate">{business.name}</span>
                <span className="text-on-dark-muted hidden sm:inline">• {business.locality}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 border-t border-border bg-soft-cream p-4 sm:p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <PalaceMark className="size-10 sm:size-11 shrink-0" />
                <div>
                  <p className="font-display text-base sm:text-lg font-semibold text-charcoal">{business.name}</p>
                  <p className="text-xs text-muted-foreground">{business.plusCode}</p>
                </div>
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-2.5 sm:py-3 text-xs font-semibold tracking-wider text-soft-cream uppercase transition-all hover:bg-olive hover:text-soft-cream w-full sm:w-auto text-center"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
