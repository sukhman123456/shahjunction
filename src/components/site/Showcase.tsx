import { MapPin, Phone, Flame, Utensils } from "lucide-react";
import showcaseImg from "@/assets/showcase-tandoor.jpg";
import { business, directionsUrl } from "@/lib/business";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";

export function Showcase() {
  return (
    <section id="showcase" className="texture-dark text-on-dark" aria-labelledby="showcase-heading">
      <div className="grid lg:grid-cols-2">
        <Reveal className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[46rem]">
          <img
            src={showcaseImg}
            alt="Freshly grilled tandoori chicken tikka on a smoking cast-iron sizzler with lemon and mint dip at Shah Junction"
            width={1400}
            height={1200}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-charcoal/20 to-charcoal/80 lg:to-charcoal"
            aria-hidden="true"
          />
        </Reveal>

        <Reveal delay={120} className="flex items-center px-6 py-20 sm:px-12 lg:px-20 xl:px-24">
          <div className="max-w-xl">
            <p className="eyebrow text-brass-soft">Clay Oven Specialty</p>
            <h2 id="showcase-heading" className="mt-5 text-5xl leading-[1.02] font-semibold sm:text-6xl lg:text-7xl">
              Fired by Tradition, <br />
              <span className="italic font-medium text-brass">Served with Love</span>
            </h2>

            <p className="mt-7 text-base leading-relaxed text-on-dark-muted sm:text-lg">
              The soul of Shah Junction lives in our clay tandoor. From succulent marinated chicken and paneer tikka
              to piping-hot, crispy naan brushed with garlic butter, our tandoori offerings are prepared fresh for
              your table every single evening.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 border-y border-line-dark py-6">
              <div className="flex items-start gap-3">
                <Flame className="size-5 text-brass shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-lg font-semibold text-on-dark">High-Heat Roasting</p>
                  <p className="text-xs text-on-dark-muted">Seals in natural juices & smoky aroma</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Utensils className="size-5 text-olive-soft shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-lg font-semibold text-on-dark">Authentic Spicing</p>
                  <p className="text-xs text-on-dark-muted">Kashmiri chilies, kasuri methi & mustard</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href={`tel:${business.phoneTel}`} variant="brass" size="lg">
                <Phone /> Call to Order ({business.phoneDisplay})
              </ButtonLink>
              <ButtonLink
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlineLight"
                size="lg"
              >
                <MapPin /> Get Directions
              </ButtonLink>
            </div>
            <p className="mt-4 text-xs text-on-dark-muted">
              {business.openingHours} · Sahaipur, Punjab
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
