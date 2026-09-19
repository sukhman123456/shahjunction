import { ArrowUpRight, CheckCircle2, MessageSquare, Star } from "lucide-react";
import { business, reviewsUrl } from "@/lib/business";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const verifiedThemes = [
  { topic: "Grand Palace Setting", detail: "Appreciated for its impressive white architecture, dome details, and expansive celebration grounds." },
  { topic: "Spacious Outdoor Lawns", detail: "Well-suited for large wedding processions, red carpet aisles, and decorative shamianas." },
  { topic: "Warm Punjabi Hospitality", detail: "Attentive management and comfortable accommodations for families and celebratory gatherings." },
  { topic: "Highway Accessibility", detail: "Conveniently located along the Gurdaspur - Tibber route in Sahaipur with ample on-site parking." },
];

export function Reviews() {
  const filled = Math.round(Number(business.rating));

  return (
    <section id="reviews" className="texture-dark py-16 text-on-dark sm:py-24 lg:py-32 border-b border-line-dark overflow-hidden">
      <div className="container-site grid gap-10 sm:gap-14 lg:grid-cols-12 lg:items-center lg:gap-20">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            eyebrow="GUEST FEEDBACK & RATINGS"
            title="WHAT OUR GUESTS SAY"
            tone="light"
          />

          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed text-on-dark-muted">
            {business.name} holds a verified <strong className="text-brass font-semibold">{business.rating} out of 5</strong> rating
            from over <strong className="text-on-dark font-semibold">{business.reviewCount} customer reviews</strong> on Google Maps.
            We invite couples, families, and organizers to read genuine guest reflections.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row">
            <ButtonLink
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="brass"
              size="lg"
              className="w-full sm:w-auto text-center"
            >
              Read Google Reviews <ArrowUpRight className="size-4" />
            </ButtonLink>
          </div>
          <p className="mt-3 text-xs text-on-dark-muted">
            Verified data directly linked to the official Google Maps business profile.
          </p>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <div className="relative rounded-sm border border-line-dark bg-charcoal-soft/80 p-5 sm:p-8 lg:p-10 shadow-lift">
            <span className="absolute -top-px left-8 h-px w-20 bg-brass" aria-hidden="true" />

            {/* Score showcase — Fully responsive */}
            <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6 border-b border-line-dark pb-6 sm:pb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-brass uppercase">
                  <CheckCircle2 className="size-4" /> Google Verified Profile
                </span>
                <div className="mt-2 flex flex-wrap items-baseline gap-2.5 sm:gap-4">
                  <span className="font-display text-[3.5rem] sm:text-[4.75rem] lg:text-[6rem] leading-none font-semibold text-on-dark">
                    {business.rating}
                  </span>
                  <div className="flex flex-col">
                    <div className="flex gap-1" aria-label={`${business.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-4 sm:size-5"
                          strokeWidth={1.5}
                          fill={i < filled ? "currentColor" : "none"}
                          style={{
                            color: i < filled ? "var(--color-brass)" : "var(--color-on-dark-muted)",
                          }}
                        />
                      ))}
                    </div>
                    <span className="mt-1 text-xs sm:text-sm text-on-dark-muted">
                      Based on {business.reviewCount} verified reviews
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-sm border border-line-dark bg-charcoal/60 px-3.5 sm:px-4 py-2 sm:py-3 text-left sm:text-right">
                <span className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider text-on-dark-muted">Venue</span>
                <p className="font-display text-base sm:text-lg font-medium text-brass-soft">Shah Junction Villa</p>
              </div>
            </div>

            {/* Genuine sentiment themes */}
            <div className="mt-6 sm:mt-8">
              <p className="flex items-center gap-2 text-[0.68rem] sm:text-[0.72rem] font-semibold tracking-[0.2em] text-brass uppercase">
                <MessageSquare className="size-3.5" /> What Guests Appreciate
              </p>
              <div className="mt-3.5 sm:mt-4 grid gap-2.5 sm:gap-3 grid-cols-1 sm:grid-cols-2">
                {verifiedThemes.map((s) => (
                  <div
                    key={s.topic}
                    className="rounded-sm border border-line-dark/70 bg-charcoal/40 p-3.5 sm:p-4 transition-colors hover:border-brass/40"
                  >
                    <p className="font-display text-sm sm:text-base font-semibold text-on-dark">
                      {s.topic}
                    </p>
                    <p className="mt-1 text-xs text-on-dark-muted leading-relaxed">
                      {s.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
