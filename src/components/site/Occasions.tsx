import type { LucideIcon } from "lucide-react";
import { HeartHandshake, PartyPopper, Users, Sparkles, Gem, Car } from "lucide-react";
import { venueOccasions } from "@/lib/venue";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const occasionIcons: Record<string, LucideIcon> = {
  weddings: Gem,
  engagements: HeartHandshake,
  receptions: PartyPopper,
  "parking-valet": Car,
  "family-celebrations": Users,
};

export function Occasions() {
  return (
    <section id="occasions" className="bg-warm-beige-light/70 py-16 sm:py-24 lg:py-32">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow="CELEBRATIONS & GATHERINGS"
            title="LIFE'S SPECIAL OCCASIONS"
            lead="Whether honoring sacred wedding vows or celebrating family milestones, Shahi Junction Villa provides the ideal setting."
            align="center"
          />
        </Reveal>

        <div className="mt-10 sm:mt-14 lg:mt-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {venueOccasions.map((occ, idx) => {
            const Icon = occasionIcons[occ.id] || Sparkles;
            return (
              <Reveal
                key={occ.id}
                delay={idx * 80}
                className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-border bg-soft-cream shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-brass/60 hover:shadow-lift"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-warm-beige">
                    <img
                      src={occ.image}
                      alt={occ.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-75"
                      aria-hidden="true"
                    />

                    {/* Icon badge */}
                    <div className="absolute top-3 left-3 flex size-9 sm:size-10 items-center justify-center rounded-full bg-charcoal/90 text-brass border border-brass/40 backdrop-blur-md shadow-sm">
                      <Icon className="size-4 sm:size-4.5" strokeWidth={1.75} />
                    </div>

                    {/* Punjabi pill */}
                    <span
                      lang="pa"
                      className="absolute top-3 right-3 rounded-full bg-charcoal/85 px-3 py-1 font-gurmukhi text-xs text-brass-light font-semibold backdrop-blur-md border border-brass/25 shadow-xs"
                    >
                      {occ.punjabiTitle}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-charcoal transition-colors duration-300 group-hover:text-brass-deep">
                      {occ.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {occ.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                  <a
                    href="#enquiry"
                    className="inline-flex items-center gap-2 pt-3.5 border-t border-border/70 text-xs font-semibold uppercase tracking-wider text-olive-deep group-hover:text-brass-deep transition-colors w-full justify-between"
                  >
                    <span>Enquire for this event</span>
                    <span className="transition-transform group-hover:translate-x-1.5">→</span>
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
