import { ArrowUpRight, CheckCircle2, Send, Sparkles, DoorOpen } from "lucide-react";
import { palaceGate } from "@/lib/venue";
import { business } from "@/lib/business";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="bg-warm-beige py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="container-site grid items-center gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Editorial Image Composition */}
        <Reveal className="relative lg:col-span-6">
          <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-sm border-2 border-brass/40 bg-soft-cream p-2 sm:p-2.5 shadow-lift group">
            <img
              src={palaceGate}
              alt="Grand ceremonial entrance gate of Shahi Junction Villa with neoclassical white columns, arched portico, hanging lantern, and cascading marigold flower staircase in Sahaipur, Punjab"
              width={1200}
              height={1500}
              loading="lazy"
              decoding="async"
              className="size-full rounded-xs object-cover object-[center_55%] transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
            />
            {/* Subtle luxury inner corner border */}
            <div className="pointer-events-none absolute inset-4 border border-brass/30 rounded-xs" />

            {/* Top Authenticity Badge */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-brass/40 bg-charcoal/90 px-3 py-1 text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-wider text-brass uppercase backdrop-blur-md shadow-md">
              <DoorOpen className="size-3.5 text-brass" />
              <span>Grand Palace Entrance</span>
            </div>
          </div>

          {/* Floating Heritage Plaque */}
          <div className="absolute -bottom-4 right-2 hidden max-w-[19rem] rounded-sm border border-brass/50 bg-charcoal p-5 text-on-dark shadow-lift sm:block sm:-bottom-6 sm:right-4 lg:-right-4 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-[0.68rem] tracking-[0.22em] text-brass uppercase font-semibold">
              <Sparkles className="size-3 text-brass" />
              <span>Marriage Palace & Resort</span>
            </div>
            <p lang="pa" className="mt-1.5 font-gurmukhi text-2xl sm:text-3xl font-semibold text-brass-soft">
              {business.namePunjabi}
            </p>
            <p className="mt-1 text-xs tracking-wider text-on-dark-muted">
              {business.locality} · Gurdaspur Road
            </p>
          </div>
        </Reveal>

        {/* Narrative */}
        <Reveal className="lg:col-span-6" delay={120}>
          <SectionHeading
            eyebrow="THE ROYAL EXPERIENCE"
            title="MADE FOR MOMENTS THAT MATTER"
          />

          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground">
            <p>
              Rising majestically against the open skies of Sahaipur, Punjab,{" "}
              <strong className="font-semibold text-charcoal">{business.name}</strong> stands as a landmark
              destination for grand Punjabi weddings, milestone family gatherings, and unforgettable celebrations.
            </p>
            <p>
              Distinguished by its stately neoclassical white facade, signature illuminated twin domes, and arched entrance portico,
              the palace encompasses expansive celebration lawns adorned with royal golden shamiana canopies, a climate-controlled
              grand banquet hall with cove lighting, and an enchanting wisteria floral walkway for Barat and Jaimala arrivals.
            </p>
            <p>
              Whether hosting a royal sunset Anand Karaj, an energetic Sangeet & Jaggo night, or a grand reception banquet, our dedicated team
              delivers genuine Punjabi warmth and seamless event execution to make your special day truly royal.
            </p>
          </div>

          {/* Key highlights list */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-sm text-charcoal font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-brass shrink-0" />
              <span>Grand Portico & Twin Domes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-brass shrink-0" />
              <span>Air-Conditioned Banquet Hall</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-brass shrink-0" />
              <span>Royal Shamiana Wedding Lawns</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-brass shrink-0" />
              <span>Cascading Floral Wisteria Tunnel</span>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-3.5 border-t border-border pt-6 sm:pt-8">
            <ButtonLink
              href="#enquiry"
              variant="brass"
              size="lg"
              className="w-full sm:w-auto text-center"
            >
              <Send className="size-4" /> ENQUIRE NOW
            </ButtonLink>
            <ButtonLink
              href="#venue"
              variant="outlineDark"
              size="lg"
              className="w-full sm:w-auto text-center"
            >
              Explore Spaces <ArrowUpRight className="size-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
