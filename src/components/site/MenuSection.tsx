import { Phone, UtensilsCrossed, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";
import { business, directionsUrl } from "@/lib/business";
import { menuCategories, menuItems, type MenuCategory, type MenuItem } from "@/lib/menu";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function DietDot({ diet }: { diet?: MenuItem["diet"] }) {
  if (!diet) return null;
  const veg = diet === "veg";
  return (
    <span
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
      className={cn(
        "inline-flex size-4 items-center justify-center border",
        veg ? "border-emerald-700" : "border-amber-800",
      )}
    >
      <span className={cn("size-2 rounded-full", veg ? "bg-emerald-700" : "bg-amber-800")} />
    </span>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-sm bg-soft-cream border border-border/70 shadow-card transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-warm-beige">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <UtensilsCrossed className="size-8" strokeWidth={1.25} />
          </div>
        )}
        {item.isSignature && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-xs bg-charcoal/90 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider text-brass uppercase backdrop-blur-xs">
            <Sparkles className="size-3 text-brass" /> Signature
          </span>
        )}
      </div>

      <span className="h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-500 group-hover:scale-x-100" />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 font-display text-2xl font-semibold text-charcoal">
              <DietDot diet={item.diet} />
              {item.name}
            </h3>
            {item.punjabiName && (
              <p lang="pa" className="mt-0.5 font-gurmukhi text-sm text-olive-deep font-medium">
                {item.punjabiName}
              </p>
            )}
          </div>
          {item.price && (
            <span className="font-display text-xl font-semibold text-olive-deep whitespace-nowrap">
              {item.price}
            </span>
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </div>
    </article>
  );
}

export function MenuSection() {
  const [active, setActive] = useState<MenuCategory | "All">("All");

  const categories = ["All" as const, ...menuCategories];
  const items = active === "All" ? menuItems : menuItems.filter((m) => m.category === active);

  return (
    <section id="menu" className="bg-warm-beige-light/70 py-24 sm:py-32">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow="Tandoor & Hearth"
            title="A Celebration of Punjabi Flavours"
            lead="Handcrafted curries, clay-oven tandoori breads, royal thalis, and refreshing drinks prepared fresh every day."
            align="center"
          />
        </Reveal>

        {/* Category switcher */}
        <Reveal delay={100} className="mt-12">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
          >
            {categories.map((c) => {
              const selected = c === active;
              return (
                <button
                  key={c}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setActive(c)}
                  className={cn(
                    "h-11 shrink-0 rounded-sm border px-5 text-[0.74rem] font-semibold tracking-[0.16em] uppercase transition-all duration-300",
                    selected
                      ? "border-olive bg-olive text-soft-cream shadow-sm"
                      : "border-border bg-soft-cream/80 text-charcoal hover:border-brass hover:text-olive-deep",
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Dish grid */}
        <Reveal delay={160} className="mt-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </Reveal>

        {/* Footer actions */}
        <Reveal delay={200} className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            Have special dietary preferences or planning a family gathering? Call ahead to reserve your table.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={`tel:${business.phoneTel}`} variant="olive" size="md">
              <Phone /> Call {business.phoneDisplay}
            </ButtonLink>
            <ButtonLink
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlineDark"
              size="md"
            >
              <MapPin /> Get Directions
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
