import { Car, Clock, MapPin, PackageCheck, Star, UtensilsCrossed } from "lucide-react";
import { business, directionsUrl } from "@/lib/business";

const items = [
  {
    icon: Star,
    label: `${business.rating} ★ Google Rating`,
    sub: `${business.reviewCount} Verified Reviews`,
    href: directionsUrl,
  },
  {
    icon: UtensilsCrossed,
    label: "Dine-in Hospitality",
    sub: "Family Seating & Gatherings",
  },
  {
    icon: Car,
    label: "Drive-through",
    sub: "Convenient Highway Takeaway",
  },
  {
    icon: PackageCheck,
    label: "No-contact Delivery",
    sub: "Safe & Fresh Delivery",
  },
  {
    icon: Clock,
    label: "Open Until 11:00 PM",
    sub: "Serving Lunch & Dinner Daily",
  },
];

export function InfoStrip() {
  return (
    <section id="info" aria-label="Business overview at a glance" className="border-b border-border bg-soft-cream">
      <div className="container-site">
        <ul className="grid grid-cols-2 divide-border sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
          {items.map(({ icon: Icon, label, sub, href }) => {
            const Content = (
              <div className="flex items-center gap-3.5 py-6 lg:justify-center lg:py-7">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-warm-beige text-olive-deep border border-brass/30">
                  <Icon className="size-4" strokeWidth={1.8} />
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-base leading-tight font-semibold text-charcoal sm:text-lg">
                    {label}
                  </span>
                  <span className="text-xs tracking-wide text-muted-foreground">{sub}</span>
                </span>
              </div>
            );

            return (
              <li key={label} className="px-2">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block transition-opacity hover:opacity-85"
                  >
                    {Content}
                  </a>
                ) : (
                  Content
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
