import { useState } from "react";
import {
  Wine,
  UtensilsCrossed,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  Flame,
  ChefHat,
  Check,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import {
  shahiBarCounter,
  shahiRestaurantLounge,
  menuDrinks,
  menuTandoori,
  menuCurries,
  menuFish,
} from "@/lib/venue";
import { business, directionsUrl } from "@/lib/business";
import { Reveal } from "./Reveal";

const realDiningSpaces = [
  {
    id: "bar-counter",
    title: "The Royal Bar Counter & Draught Beers",
    punjabiTitle: "ਸ਼ਾਹ ਬਾਰ ਕਾਊਂਟਰ",
    subtitle: "Draught Beers On Tap, Spirits & Signature Cocktails",
    image: shahiBarCounter,
    icon: Wine,
    tag: "On-Tap Dispenser Towers",
    badge: "Full Bar Service",
    description:
      "Crafted with a rustic wooden pergola canopy, illuminated neon signage, and marble service countertops. Enjoy cold draft beers poured straight from commercial dispenser towers, fine single malts, and hand-mixed cocktails in an intimate, chilled atmosphere.",
    features: [
      "Commercial draught beer dispenser towers pouring chilled brews on tap",
      "Back-lit illuminated glassware shelves with premium scotch & spirits",
      "Modern wooden pergola canopy with recessed ambient ceiling spotlights",
      "Dedicated cocktail bartender crafting signature spiced coolers & drinks",
    ],
  },
  {
    id: "restaurant-lounge",
    title: "Indoor Restaurant & Velvet Booth Dining",
    punjabiTitle: "ਫੈਮਿਲੀ ਰੈਸਟੋਰੈਂਟ ਅਤੇ ਬੂਥ",
    subtitle: "Air-Conditioned Comfort with Plush Red Velvet Seating",
    image: shahiRestaurantLounge,
    icon: UtensilsCrossed,
    tag: "Circular Cove Illumination",
    badge: "Air-Conditioned Hall",
    description:
      "Step into a comfortable, welcoming dining haven designed for families, couples, and road travelers. Featuring circular tray cove ceiling lighting, rich crimson velvet booth banquettes, and attentive table service for authentic North Indian dishes.",
    features: [
      "Plush red velvet booth seating offering privacy and cushioned comfort",
      "Signature circular tray cove ceiling with soft warm downlights",
      "Fresh clay oven tandoori kebabs, slow-simmered curries & hot rotis",
      "Attentive family hospitality suited for celebrations, birthdays & dinners",
    ],
  },
];

const menuHighlights = [
  {
    category: "Clay Tandoor & Starters",
    punjabi: "ਤੰਦੂਰੀ ਸਟਾਰਟਰਸ",
    icon: Flame,
    image: menuTandoori,
    items: [
      { name: "Shahi Murgh Malai Tikka", desc: "Tender chicken morsels in cashew cream and green cardamom marinade" },
      { name: "Amritsari Crispy Fish Tikka", desc: "Fresh fish flavored with carom seeds, ginger, and golden crust" },
      { name: "Paneer Haryali Tikka", desc: "Fresh cottage cheese infused with garden mint and tandoori glaze" },
      { name: "Crispy Dahi Ke Sholay", desc: "Melt-in-mouth yogurt patties served with tangy mint chutney" },
    ],
  },
  {
    category: "Royal Curries & Breads",
    punjabi: "ਸ਼ਾਹ ਗ੍ਰੇਵੀਆਂ ਤੇ ਨਾਨ",
    icon: ChefHat,
    image: menuCurries,
    items: [
      { name: "24-Hour Slow-Cooked Dal Makhani", desc: "Black lentils gently simmered overnight with fresh churned cream" },
      { name: "Old Delhi Butter Chicken", desc: "Tandoori chicken simmered in a velvety satin-smooth tomato sauce" },
      { name: "Paneer Lababdar", desc: "Rich Mughlai gravy with crushed cashew nuts, tomatoes, and spices" },
      { name: "Stuffed Amritsari Kulcha & Chur Chur Naan", desc: "Flaky layered tandoor bread stuffed with potato, paneer, and onion" },
    ],
  },
  {
    category: "Fresh Amritsari Fish & Seafood",
    punjabi: "ਅੰਮ੍ਰਿਤਸਰੀ ਫਿਸ਼ ਤੇ ਸੀ-ਫੂਡ",
    icon: UtensilsCrossed,
    image: menuFish,
    items: [
      { name: "Amritsari Crispy Fish Fry", desc: "Fresh fish marinated in crushed ajwain and deep fried to golden perfection" },
      { name: "Tandoori Fish Tikka Sizzler", desc: "Charcoal roasted fish chunks with lemon mint chutney and charred onion rings" },
      { name: "Fish Finger with Tartar Dip", desc: "Golden crumb-coated fish fingers served piping hot" },
      { name: "Spicy Fish Curry & Masala", desc: "Rich river fish simmered in a spiced Punjabi tomato and onion gravy" },
    ],
  },
  {
    category: "Bar & Signature Drinks",
    punjabi: "ਬਾਰ ਅਤੇ ਕਾਕਟੇਲ",
    icon: Wine,
    image: menuDrinks,
    items: [
      { name: "Chilled Draught Beer on Tap", desc: "Freshly poured draught beer towers served at sub-zero temperatures" },
      { name: "Royal Saffron Gold Elixir", desc: "Palace signature mocktail with saffron syrup and sparkling soda" },
      { name: "Smoked Punjabi Spiced Mojito", desc: "Fresh mint muddled with rock salt, roasted cumin, and lime" },
      { name: "Premium Single Malts & Scotch", desc: "Curated collection of international spirits and chilled beverages" },
    ],
  },
];

export function RestaurantSection() {
  return (
    <section
      id="restaurant"
      className="relative bg-gradient-to-b from-[#0e0c0a] via-[#16120f] to-[#0d0b09] py-20 sm:py-28 lg:py-32 text-soft-cream overflow-hidden border-y border-brass/35"
    >
      {/* Ambient glowing aura */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[950px] h-[450px] bg-gradient-to-b from-brass/15 via-olive/10 to-transparent blur-3xl opacity-60 rounded-full" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] bg-brass/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-1/3 right-0 w-[450px] h-[450px] bg-amber-600/10 blur-3xl rounded-full" />

      <div className="container-site relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brass/15 border border-brass/40 text-brass-light text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
              <Sparkles className="size-3.5 text-brass" />
              <span>AUTHENTIC DINING & BAR · ਸ਼ਾਹ ਰੈਸਟੋਰੈਂਟ ਅਤੇ ਬਾਰ</span>
              <Sparkles className="size-3.5 text-brass" />
            </div>

            <h2 className="font-display text-[clamp(2.1rem,4.8vw,3.75rem)] font-bold tracking-tight text-soft-cream leading-[1.12]">
              THE SHAH RESTAURANT & BAR
            </h2>

            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="h-[1.5px] w-14 bg-gradient-to-r from-transparent via-brass to-brass/40" />
              <span className="text-brass text-sm">❖</span>
              <span className="h-[1.5px] w-14 bg-gradient-to-l from-transparent via-brass to-brass/40" />
            </div>

            <p className="mt-4 text-base sm:text-lg text-soft-cream/80 leading-relaxed font-sans">
              Welcome to the genuine on-site restaurant and bar at Shah Junction Villa. From freshly poured draught beers at our pergola bar to plush red velvet booth dining for the family.
            </p>
          </div>
        </Reveal>

        {/* 2 Exclusive Authentic Showcase Cards (Bar Counter & Restaurant Seating) */}
        <div className="mt-14 sm:mt-18 grid gap-8 lg:gap-10 lg:grid-cols-2">
          {realDiningSpaces.map((space, idx) => {
            const Icon = space.icon;

            return (
              <Reveal key={space.id} delay={idx * 100}>
                <div className="group relative flex flex-col justify-between rounded-3xl border border-brass/35 bg-gradient-to-b from-[#1c1714] via-[#151210] to-[#0f0d0b] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 hover:border-brass hover:-translate-y-2 hover:shadow-[0_24px_50px_-10px_rgba(202,168,106,0.25)]">
                  {/* Top hairline brass shimmer on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-brass to-transparent opacity-60 group-hover:opacity-100 group-hover:h-[4px] transition-all duration-300 z-20" />

                  <div>
                    {/* Real High-Resolution Photo Container */}
                    <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-black/60">
                      <img
                        src={space.image}
                        alt={space.title}
                        className="size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151210] via-black/30 to-transparent" />

                      {/* Top Left: Gurmukhi Punjabi Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-brass/40 text-brass-light text-xs font-serif shadow-md">
                          <span className="size-1.5 rounded-full bg-brass animate-pulse" />
                          {space.punjabiTitle}
                        </span>
                      </div>

                      {/* Top Right: Status Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-brass/25 backdrop-blur-md border border-brass/50 text-brass-light text-xs font-bold shadow-sm">
                          {space.badge}
                        </span>
                      </div>

                      {/* Bottom Image Tag */}
                      <div className="absolute bottom-3 left-5 right-5 z-10">
                        <span className="text-xs font-semibold uppercase tracking-widest text-brass-light/90 flex items-center gap-1.5">
                          <span>✦</span> {space.tag}
                        </span>
                      </div>
                    </div>

                    {/* Icon Medallion */}
                    <div className="relative -mt-7 ml-6 z-20">
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brass/35 via-brass/20 to-transparent border-2 border-[#1c1714] text-brass-light shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-brass group-hover:text-charcoal">
                        <Icon className="size-6" strokeWidth={1.75} />
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 sm:p-8 pt-3">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-soft-cream tracking-tight group-hover:text-brass-light transition-colors">
                        {space.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-brass-light/85 font-serif italic mt-1">
                        {space.subtitle}
                      </p>

                      <p className="mt-3.5 text-xs sm:text-sm text-soft-cream/80 leading-relaxed font-sans">
                        {space.description}
                      </p>

                      {/* Structured Highlight Bullets */}
                      <div className="mt-5 pt-4 border-t border-brass/20">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-brass-light mb-3 flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-brass" />
                          KEY AMBIENCE & SERVICE HIGHLIGHTS
                        </h4>

                        <ul className="space-y-2.5 text-xs sm:text-[13px] text-soft-cream/80">
                          {space.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2.5 leading-snug">
                              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-brass/20 text-brass-light border border-brass/40">
                                <Check className="size-2.5" strokeWidth={3} />
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-0">
                    <div className="p-4 rounded-xl bg-black/40 border border-brass/20 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-soft-cream/75">
                        <ShieldCheck className="size-4 text-brass" />
                        <span>Genuine Shah Junction On-Site Facility</span>
                      </div>
                      <a
                        href={`tel:${business.phoneTel}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brass-light hover:text-white transition-colors"
                      >
                        <span>Reserve</span>
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Curated Culinary & Bar Menu Showcase */}
        <Reveal delay={150} className="mt-16 sm:mt-20">
          <div className="rounded-3xl border border-brass/40 bg-gradient-to-b from-[#1c1714] via-[#151210] to-[#100d0b] p-6 sm:p-10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brass/10 blur-3xl rounded-full pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-brass/25">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brass-light flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-brass animate-ping" />
                  CURATED PALACE SPECIALTIES · ਸ਼ਾਹ ਸਵਾਦ
                </p>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-soft-cream">
                  Crafted Daily In Our Royal Kitchen & Bar
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-soft-cream/75 max-w-md leading-relaxed">
                Prepared with pure desi ghee, mustard oil, freshly ground Punjabi spices, and ice-cold brews served in our air-conditioned dining lounge.
              </p>
            </div>

            {/* Menu Columns */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {menuHighlights.map((col, colIdx) => {
                const ColIcon = col.icon;
                return (
                  <div
                    key={colIdx}
                    className="p-5 sm:p-6 rounded-2xl bg-black/40 border border-brass/25 shadow-inner"
                  >
                    <div className="flex items-center gap-3 pb-4 mb-4 border-b border-brass/20">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-brass/15 text-brass-light border border-brass/35 shrink-0">
                        <ColIcon className="size-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-brass-light block">{col.punjabi}</span>
                        <h4 className="font-display text-lg font-bold text-soft-cream">{col.category}</h4>
                      </div>
                    </div>

                    {/* Food Photo Showcase */}
                    <div className="relative mb-5 h-38 w-full rounded-xl overflow-hidden border border-brass/30 shadow-md group/img">
                      <img
                        src={col.image}
                        alt={col.category}
                        className="size-full object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-brass-light font-semibold">
                        <span className="flex items-center gap-1">
                          <span className="size-1.5 rounded-full bg-brass animate-pulse" />
                          <span>Fresh To Order</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs border border-brass/40 text-soft-cream/90">
                          Royal Palace Recipe
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {col.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="group/item">
                          <h5 className="text-sm font-semibold text-soft-cream group-hover/item:text-brass-light transition-colors flex items-center justify-between">
                            <span>{item.name}</span>
                            <span className="text-brass/60 text-xs">✦</span>
                          </h5>
                          <p className="mt-1 text-xs text-soft-cream/65 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Practical Dining Info & Action Bar */}
            <div className="mt-10 pt-8 border-t border-brass/25 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-soft-cream/80">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-brass" />
                  <span>Open Daily: <strong>11:00 AM – 11:00 PM</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Wine className="size-4 text-brass" />
                  <span>Draught Beers & Bar Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-brass" />
                  <span>Sahaipur Highway, Gurdaspur</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="size-4 fill-none stroke-pink-400 stroke-2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <a
                    href={business.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brass-light hover:underline transition-colors"
                  >
                    Instagram: <strong>{business.instagramHandle}</strong>
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <a
                  href={`tel:${business.phoneTel}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brass text-charcoal font-bold text-xs sm:text-sm hover:bg-brass-light shadow-lg transition-all duration-300"
                >
                  <Phone className="size-4" />
                  <span>Reserve Table / Bar: {business.phoneDisplay}</span>
                </a>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-soft-cream border border-white/20 font-semibold text-xs sm:text-sm transition-all duration-300"
                >
                  <MapPin className="size-4" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
