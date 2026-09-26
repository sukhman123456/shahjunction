import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowRight,
  Calendar,
  Sparkles,
  Heart,
  Gift,
  PartyPopper,
  Users,
  Star,
  X,
  Users2,
  Clock,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Music,
  Camera,
  UtensilsCrossed,
  Sparkle,
} from "lucide-react";
import { useState } from "react";
import { Reveal } from "./Reveal";
import { useBooking } from "@/context/BookingContext";
import { business } from "@/lib/business";
import type { EventType } from "@/lib/reservations";

// Authentic banquet hall photos from project assets
import weddingImg from "@/assets/shahi-wedding-tunnel.jpg";
import engagementImg from "@/assets/banquet-engagement-arch.jpg";
import birthdayImg from "@/assets/banquet-birthday-party.jpg";
import anniversaryImg from "@/assets/shahi-grand-hall.jpg";
import familyImg from "@/assets/banquet-celebration-hall.jpg";
import ceremonyImg from "@/assets/banquet-ceremony-stage.jpg";

interface EventHighlight {
  title: string;
  description: string;
}

interface CelebrationCard {
  id: string;
  title: string;
  punjabiTitle: string;
  tagline: string;
  punjabiTagline: string;
  description: string;
  longOverview: string;
  capacity: string;
  duration: string;
  venueSetup: string;
  highlights: EventHighlight[];
  idealFor: string[];
  image: string;
  imageAlt: string;
  badge: string;
  eventType: EventType;
  icon: typeof Sparkles;
}

const celebrationCards: CelebrationCard[] = [
  {
    id: "weddings",
    title: "Weddings",
    punjabiTitle: "ਵਿਆਹ ਸਮਾਗਮ",
    tagline: "Grandeur, Tradition & Royal Memories",
    punjabiTagline: "ਸ਼ਾਹਾਨਾ ਵਿਆਹ ਸਮਾਗਮ ਅਤੇ ਅਲੌਕਿਕ ਮਹਿਮਾਨਨਿਵਾਜ਼ੀ",
    description: "Celebrate your big day in an elegant and unforgettable setting.",
    longOverview:
      "Make your once-in-a-lifetime wedding celebration a royal masterpiece at Shah Junction Villa. From welcoming the Baraat under a shimmering floral walkway to the serene Anand Karaj or Jaimala rituals and an opulent feast, our expansive, fully air-conditioned neoclassical hall creates an atmosphere of pure splendour.",
    capacity: "Max 300 Guests",
    duration: "Full Day / Evening Booking",
    venueSetup: "Grand Indoor Banquet Hall & Lawns",
    highlights: [
      {
        title: "Grand Entrance Walkway & Floral Tunnel",
        description:
          "Cascading wisteria & floral archway with illuminated warm chandeliers for dramatic bride & groom entries.",
      },
      {
        title: "Royal Stage & Mandap Setup",
        description:
          "Spacious elevated stage with velvet tufted lounge sofas, royal backdrops, and customizable floral themes.",
      },
      {
        title: "Multi-Cuisine Banquet Buffet",
        description:
          "Multi-station live buffet counters, chaat street, traditional tandoori live kitchen, and artisanal desserts.",
      },
      {
        title: "Concert Acoustics & Dynamic Lighting",
        description:
          "State-of-the-art intelligent lighting, crystal chandeliers, multi-tier cove LEDs, and tuned sound for DJs and live music.",
      },
      {
        title: "Private Bridal Dressing Suites",
        description:
          "Climate-controlled, secure dressing suites equipped with full-length mirrors and dedicated hospitality service.",
      },
      {
        title: "300+ Vehicle Secure Parking",
        description:
          "Massive on-site parking lot with convenient entry, wide driveway, and dedicated parking attendants.",
      },
    ],
    idealFor: ["Anand Karaj Rituals", "Grand Wedding Receptions", "Jaimala Ceremony", "Sangeet & Cocktail Nights"],
    image: weddingImg,
    imageAlt: "Illuminated floral wedding entry walkway with chandeliers at Shah Junction Villa",
    badge: "Grand Weddings",
    eventType: "Wedding",
    icon: Heart,
  },
  {
    id: "roka-engagements",
    title: "Roka & Engagements",
    punjabiTitle: "ਰੋਕਾ ਅਤੇ ਕੁੜਮਾਈ",
    tagline: "Beginning of a Beautiful Forever",
    punjabiTagline: "ਰਿਸ਼ਤਿਆਂ ਦੀ ਨਵੀਂ ਸ਼ੁਰੂਆਤ ਅਤੇ ਪਰਿਵਾਰਕ ਖੁਸ਼ੀਆਂ",
    description: "Perfect spaces for beautiful beginnings and intimate family celebrations.",
    longOverview:
      "Your engagement or Roka marks the cherished union of two families. At Shah Junction Villa, we curate a warm, intimate, yet royally festive ambiance. Featuring our signature balloon ring arches, floral photo stages, and cozy lounge seating, both families can bond, exchange rings, and celebrate in supreme comfort.",
    capacity: "Max 200 Guests",
    duration: "Day / Evening Slots Available",
    venueSetup: "Banquet Hall (Lounge & Ring Stage Configuration)",
    highlights: [
      {
        title: "Signature Floral & Balloon Ring Stage",
        description:
          "Circular floral ring & pastel balloon arch designed especially for ring exchange photographs and family portraits.",
      },
      {
        title: "VIP Velvet Family Lounge",
        description:
          "Plush velvet sofa seating arrangement ensuring elders and close family enjoy the ceremony front and center.",
      },
      {
        title: "Milni & Shagun Ceremonial Space",
        description:
          "Organized ceremonial area reserved for traditional Shagun exchanges, gifts, and blessings with utmost dignity.",
      },
      {
        title: "High-Tea & Mocktail Hospitality",
        description:
          "Refreshing live welcome drinks, artisanal mocktails, and fresh tea/coffee paired with hot Punjabi savories.",
      },
      {
        title: "Crisp Audio & Cordless Microphones",
        description:
          "Dedicated audio setup for ring ceremony announcements, family blessings, and soft acoustic background melodies.",
      },
      {
        title: "Intimate Banquet Dining",
        description:
          "Thoughtfully partitioned hall layout ensuring a lively, close-knit family feel without feeling sparse.",
      },
    ],
    idealFor: ["Roka Ceremony", "Ring Exchange", "Sagai & Thaka", "Pre-Engagement Family Dinners"],
    image: engagementImg,
    imageAlt: "Banquet hall with balloon ring arch, cove ceiling, and dining setup at Shah Junction",
    badge: "Ring Ceremony",
    eventType: "Engagement",
    icon: Sparkles,
  },
  {
    id: "birthday-parties",
    title: "Birthday Parties",
    punjabiTitle: "ਜਨਮਦਿਨ ਪਾਰਟੀ",
    tagline: "Joyful Celebrations, Fun & Unstoppable Energy",
    punjabiTagline: "ਹਰ ਉਮਰ ਦੇ ਜਨਮਦਿਨ ਲਈ ਰੰਗ-ਬਿਰੰਗੇ ਜਸ਼ਨ",
    description: "Make every birthday special with a vibrant and comfortable celebration space.",
    longOverview:
      "From a baby's 1st birthday milestone to a vibrant sweet sixteen or a 50th golden jubilee, Shah Junction Villa turns birthdays into magical celebrations. We offer custom themed balloon backdrops, dynamic lighting, high-energy dance floors, and mouth-watering menus that appeal to kids, youth, and elders alike.",
    capacity: "Max 200 Guests",
    duration: "3 to 5 Hours Flexible Duration",
    venueSetup: "Banquet Party Floor (Open Dance & Dining)",
    highlights: [
      {
        title: "Customized Themed Backdrops",
        description:
          "Personalized 3D letterings, vibrant balloon arches, cartoon or glam themes, and marquee light numbers.",
      },
      {
        title: "Cake Cutting Centerpiece Stage",
        description:
          "Special illuminated table for the cake cutting moment with confetti shower and ambient spot lighting.",
      },
      {
        title: "Spacious Dance Floor & Club Sound",
        description:
          "Expansive dance area with professional sound, party bass, moving head lights, and upbeat party tracks.",
      },
      {
        title: "Kid-Friendly Live Food Counters",
        description:
          "Live pasta & pizza stations, fries, burger sliders, shakes, chocolate fountains, and ice cream sundae counters.",
      },
      {
        title: "Fun Selfie & Photo Booth Corner",
        description:
          "Interactive photo booth with customized fun props, frames, and colorful backdrops for memorable photos.",
      },
      {
        title: "Safe & Climate-Controlled Interior",
        description:
          "100% child-safe, carpeted/tiled indoor hall so kids can play safely while parents unwind comfortably.",
      },
    ],
    idealFor: ["1st Birthday Milestones", "Theme Kids Parties", "Sweet Sixteen", "50th Golden Jubilees"],
    image: birthdayImg,
    imageAlt: "Decorated birthday celebration hall with customized balloon stage at Shah Junction",
    badge: "Milestone Birthdays",
    eventType: "Birthday",
    icon: Gift,
  },
  {
    id: "anniversary-celebrations",
    title: "Anniversary Celebrations",
    punjabiTitle: "ਵਰ੍ਹੇਗੰਢ ਜਸ਼ਨ",
    tagline: "Cherishing Years of Love & Family Heritage",
    punjabiTagline: "ਪਿਆਰ ਅਤੇ ਸਾਥ ਦੇ ਸੁਨਹਿਰੀ ਵਰ੍ਹੇ ਮਨਾਓ",
    description: "Celebrate years of love with your family and loved ones.",
    longOverview:
      "Honor decades of companionship and enduring love surrounded by children, grandchildren, and dear friends. Whether it is a 25th Silver or 50th Golden Anniversary, Shah Junction Villa crafts a sophisticated, heartfelt experience filled with nostalgic slideshows, melodious tunes, and royal dining.",
    capacity: "Max 300 Guests",
    duration: "Day or Evening Celebration",
    venueSetup: "Elegantly Lit Banquet & Family Dining",
    highlights: [
      {
        title: "Memory Slideshow & AV Projection",
        description:
          "Large high-definition projection setup for screening nostalgic couple photos and emotional family video tributes.",
      },
      {
        title: "Romantic Warm Golden Ambiance",
        description:
          "Soft golden cove lighting, elegant floral table centerpieces, and warm candle-lit dining aesthetics.",
      },
      {
        title: "Royal Couple Felicitation Stage",
        description:
          "Comfortable royal couple throne seating with floral backdrop for garland exchange and family blessings.",
      },
      {
        title: "Melodious Music & Ghazal Acoustics",
        description:
          "Soothing background playlist, live ghazal or instrumental acoustic setups, and retro Punjabi folk melodies.",
      },
      {
        title: "Curated Gourmet Feast",
        description:
          "Multi-course royal feast tailored to your family's favorite Punjabi recipes, slow-cooked gravies, and traditional sweets.",
      },
      {
        title: "Elder & Senior-Friendly Comfort",
        description:
          "Zero-step accessible hall entrances, wide walking spaces, and cushioned banquet chairs for elderly family members.",
      },
    ],
    idealFor: ["25th Silver Jubilee", "50th Golden Jubilee", "Annual Milestone Anniversaries", "Couple Vow Renewals"],
    image: anniversaryImg,
    imageAlt: "Grand illuminated banquet hall with multi-tier cove lighting for anniversaries",
    badge: "Years of Togetherness",
    eventType: "Reception",
    icon: PartyPopper,
  },
  {
    id: "family-functions",
    title: "Family Functions",
    punjabiTitle: "ਪਰਿਵਾਰਕ ਮਿਲਣੀ",
    tagline: "Comfort of Home, Elegance of a Palace",
    punjabiTagline: "ਸਨੇਹੀਆਂ ਅਤੇ ਪਰਿਵਾਰ ਦੀ ਨਿੱਘੀ ਮਿਲਣੀ",
    description: "A welcoming venue for family gatherings, get-togethers and special occasions.",
    longOverview:
      "Family gatherings deserve a venue where generations can mingle comfortably without the stress of hosting at home. From retirement celebrations, NRI homecomings, baby showers (Godh Bharai), to festive get-togethers, Shah Junction Villa offers attentive hospitality where every relative feels genuinely cared for.",
    capacity: "Max 200 Guests",
    duration: "Flexible Half-Day / Full-Day Slots",
    venueSetup: "Comfortable Cluster Seating & Open Buffet",
    highlights: [
      {
        title: "Warm & Flexible Seating Layout",
        description:
          "Cluster round tables and lounge seating that encourage easy conversation and bonding across all generations.",
      },
      {
        title: "Continuous Tea & Savory Service",
        description:
          "Continuous service of fresh masala chai, cappuccino, and piping-hot appetizers from arrival to departure.",
      },
      {
        title: "Customized Traditional Family Menu",
        description:
          "Traditional authentic Punjabi home-style cooking or modern multi-cuisine dishes prepared fresh to family tastes.",
      },
      {
        title: "100% Silent Generator Power Backup",
        description:
          "Continuous power backup guaranteeing uninterrupted central air-conditioning, festive illumination, and music.",
      },
      {
        title: "Attentive Floor Staff & Service",
        description:
          "Polite, well-trained hospitality team attending to elder requests, quick beverage refills, and child dining needs.",
      },
      {
        title: "Convenient Highway Accessibility",
        description:
          "Situated conveniently on Sahaipur-Tibber road, Gurdaspur, making it effortless for out-of-town relatives to locate.",
      },
    ],
    idealFor: ["Retirement Parties", "NRI Homecomings", "Baby Showers (Godh Bharai)", "Family Reunions & Get-Togethers"],
    image: familyImg,
    imageAlt: "Festive banquet hall with hanging balloons, golden table settings, and family party setup",
    badge: "Family Get-Togethers",
    eventType: "Other",
    icon: Users,
  },
  {
    id: "small-ceremonies",
    title: "Small Ceremonies",
    punjabiTitle: "ਪਰੰਪਰਾਗਤ ਰਸਮਾਂ",
    tagline: "Sacred, Pure & Culturally Deep Ceremonies",
    punjabiTagline: "ਧਾਰਮਿਕ ਅਤੇ ਪਰੰਪਰਾਗਤ ਰਸਮਾਂ ਦੀ ਪਵਿੱਤਰਤਾ",
    description: "Ideal for intimate ceremonies, traditional functions and meaningful moments.",
    longOverview:
      "Traditional ceremonies require reverence, spotless hygiene, and peaceful sanctity. Whether you are hosting a Sri Sukhmani Sahib Paath, Kirtan Darbar, Jaggo night, Mehndi, or Mayian ceremony, Shah Junction Villa provides a tranquil, clean, and respectful environment tailored to age-old customs.",
    capacity: "Max 200 Guests",
    duration: "Morning / Afternoon / Evening Slots",
    venueSetup: "Custom Sacred Diwan or Cultural Folk Setup",
    highlights: [
      {
        title: "Sanctified Diwan & Paath Setup",
        description:
          "Elevated clean carpeted platform with rumala sahib arrangements for sacred Paath, devotional recitation, and Kirtan.",
      },
      {
        title: "Pure Vegetarian & Satvik Catering",
        description:
          "Dedicated pure-vegetarian catering with segregated, spotless preparation according to religious customs.",
      },
      {
        title: "Vibrant Jaggo & Mehndi Folk Decor",
        description:
          "Colorful Punjabi phulkari drapery, traditional lanterns, and folk props for high-energy pre-wedding rituals.",
      },
      {
        title: "Crisp Audio for Kirtan & Folk Music",
        description:
          "Sound tuned specifically for distortion-free devotional hymns, shabad kirtan, or lively folk boliyan.",
      },
      {
        title: "Separate Sanitized Changing Suites",
        description:
          "Private, safe air-conditioned rooms for bridal costume changes, mehndi application, and family preparations.",
      },
      {
        title: "Spotless Cleanliness & Respectful Staff",
        description:
          "Impeccably clean hall, sanitized washrooms, and shoe-keeping arrangements maintained with utmost care.",
      },
    ],
    idealFor: [
      "Sri Sukhmani Sahib Paath",
      "Kirtan Darbar & Satsang",
      "Jaggo & Sangeet Night",
      "Mehndi & Mayian Ceremonies",
    ],
    image: ceremonyImg,
    imageAlt: "Ceremonial stage setup with fresh floral arch and family blessings at Shah Junction",
    badge: "Intimate Rituals",
    eventType: "Other",
    icon: Star,
  },
];

export function CelebrationsSection() {
  const { openBookingModal } = useBooking();
  const [selectedCard, setSelectedCard] = useState<CelebrationCard | null>(null);

  // When card or "Explore Event" is clicked: open the event detail modal
  const handleOpenEventDetails = (card: CelebrationCard) => {
    setSelectedCard(card);
  };

  // When user decides to book this event from inside the details modal
  const handleProceedToBooking = (card: CelebrationCard) => {
    setSelectedCard(null);
    openBookingModal(undefined, card.eventType);
  };

  const handlePlanEventCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("reservations") || document.getElementById("enquiry");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      openBookingModal();
    }
  };

  return (
    <section
      id="celebrations"
      className="relative bg-gradient-to-b from-[#fbf8f3] via-[#f7f2ea] to-[#f4ede3] py-16 sm:py-24 lg:py-32 overflow-hidden border-b border-[#e6ddd0]"
    >
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 w-[600px] h-[350px] bg-brass/10 blur-3xl opacity-70 rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-12 right-1/4 w-[550px] h-[320px] bg-olive/10 blur-3xl opacity-60 rounded-full"
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            {/* Elegant Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brass/15 border border-brass/40 text-olive-deep text-xs font-semibold tracking-widest uppercase mb-4 shadow-xs">
              <span className="text-brass">✦</span>
              <span>CELEBRATIONS & PARTIES · ਸਮਾਗਮ ਅਤੇ ਪਾਰਟੀਆਂ</span>
              <span className="text-brass">✦</span>
            </div>

            {/* Title */}
            <h2 className="font-display text-[clamp(2.1rem,4.8vw,3.75rem)] font-bold tracking-tight text-charcoal leading-[1.12]">
              Celebrate Every Special Moment
            </h2>

            {/* Gold Floral Ornament */}
            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="h-[1.5px] w-14 bg-gradient-to-r from-transparent via-brass to-brass/40" />
              <span className="text-brass text-sm">❖</span>
              <span className="h-[1.5px] w-14 bg-gradient-to-l from-transparent via-brass to-brass/40" />
            </div>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans max-w-2xl mx-auto">
              From intimate ceremonies to grand celebrations, our venue is designed to make every occasion memorable.
            </p>
          </div>
        </Reveal>

        {/* 6 Event Category Cards Grid */}
        {/* Desktop: 3 cards/row | Tablet: 2 cards/row | Mobile: 1 card/row */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {celebrationCards.map((card, idx) => {
            const Icon = card.icon;

            return (
              <Reveal key={card.id} delay={idx * 90}>
                <article
                  onClick={() => handleOpenEventDetails(card)}
                  className="group relative flex flex-col justify-between h-full rounded-2xl sm:rounded-3xl border border-brass/35 bg-[#171310] shadow-[0_10px_30px_-8px_rgba(30,20,10,0.15)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-brass hover:shadow-[0_24px_50px_-12px_rgba(202,168,106,0.32)] cursor-pointer"
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOpenEventDetails(card);
                    }
                  }}
                  aria-label={`View details about ${card.title} celebration at Shah Junction Villa`}
                >
                  {/* Top hairline brass shimmer on hover */}
                  <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-brass to-transparent opacity-60 group-hover:opacity-100 group-hover:h-[4px] transition-all duration-300 z-20" />

                  {/* Card Media & Info */}
                  <div>
                    {/* Large High-Quality Photo Container with Smooth Zoom Effect */}
                    <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-black/60">
                      <img
                        src={card.image}
                        alt={card.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 will-change-transform"
                      />

                      {/* Dark Gradient Overlay over image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#171310] via-[#171310]/50 to-black/25 transition-opacity duration-300" />

                      {/* Top Left: Gurmukhi Punjabi Badge */}
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-brass/40 text-brass-light text-xs font-serif shadow-md">
                          <span className="size-1.5 rounded-full bg-brass animate-pulse" />
                          <span>{card.punjabiTitle}</span>
                        </span>
                      </div>

                      {/* Top Right: Category Sub-Badge */}
                      <div className="absolute top-3.5 right-3.5 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-brass/25 backdrop-blur-md border border-brass/50 text-brass-light text-[11px] font-bold tracking-wide shadow-sm">
                          {card.badge}
                        </span>
                      </div>

                      {/* Bottom Image Tag with Icon */}
                      <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-brass-light/90 flex items-center gap-1.5 drop-shadow-sm">
                          <Icon className="size-3.5 text-brass" />
                          <span>Shah Junction Special</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content: Title & Short Description */}
                    <div className="p-5 sm:p-6 lg:p-7 pt-4 flex flex-col">
                      <h3 className="font-display text-2xl sm:text-[1.65rem] font-bold text-soft-cream tracking-tight leading-snug group-hover:text-brass-light transition-colors duration-300">
                        {card.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-soft-cream/80 font-sans leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: "Explore Event" button */}
                  <div className="px-5 sm:px-6 lg:px-7 pb-5 sm:pb-6 pt-0 mt-auto">
                    <div className="pt-4 border-t border-brass/15 flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-brass-light/80 font-semibold flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-brass/70 animate-pulse" />
                        <span>{card.capacity}</span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEventDetails(card);
                        }}
                        className="group/btn inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brass/20 hover:bg-brass border border-brass/45 text-brass-light hover:text-charcoal text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
                        aria-label={`Explore details for ${card.title} at Shah Junction Villa`}
                      >
                        <span>Explore Event</span>
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Premium CTA Below Cards */}
        <Reveal delay={150}>
          <div className="relative mt-14 sm:mt-18 lg:mt-22 rounded-2xl sm:rounded-3xl border-2 border-brass/50 bg-gradient-to-br from-[#1d1712] via-[#16120e] to-[#0f0c0a] p-8 sm:p-12 lg:p-14 text-center text-soft-cream shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Background Subtle Radial Glow */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(202,168,106,0.18)_0,transparent_70%)]"
              aria-hidden="true"
            />
            {/* Background Subtle Lattice Motif */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(var(--color-brass)_1px,transparent_1px)] [background-size:24px_24px]"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brass/20 border border-brass/40 text-brass-light text-[11px] font-bold uppercase tracking-widest mb-3 shadow-xs">
                <Calendar className="size-3 text-brass" />
                <span>RESERVATIONS & BOOKINGS</span>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl sm:text-4xl lg:text-[2.75rem] font-bold text-soft-cream tracking-tight leading-tight">
                Planning Your Next Celebration?
              </h3>

              {/* Subtitle */}
              <p className="mt-2.5 sm:mt-3 text-sm sm:text-base lg:text-lg text-soft-cream/80 font-sans leading-relaxed max-w-xl">
                Let us make your special occasion truly memorable.
              </p>

              {/* Action Button: Smoothly scrolls to Contact / Booking section */}
              <div className="mt-6 sm:mt-8">
                <a
                  href="#reservations"
                  onClick={handlePlanEventCta}
                  className="group inline-flex h-12 sm:h-13 items-center justify-center gap-2.5 rounded-full border border-brass-light/90 bg-gradient-to-r from-brass-deep via-brass to-brass-light hover:to-white px-8 sm:px-10 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-charcoal shadow-[0_4px_24px_rgba(202,168,106,0.45)] hover:shadow-[0_8px_32px_rgba(202,168,106,0.7)] hover:scale-[1.03] active:translate-y-px transition-all duration-300 cursor-pointer"
                >
                  <span>Plan Your Event</span>
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* EVENT DETAILS MODAL (Opens on card or "Explore Event" click) */}
      <Dialog.Root open={!!selectedCard} onOpenChange={(open) => !open && setSelectedCard(null)}>
        <Dialog.Portal>
          {/* Backdrop with smooth blur */}
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />

          {/* Dialog Container */}
          <Dialog.Content
            className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 md:p-6 outline-none pointer-events-none"
            aria-describedby="event-detail-description"
          >
            {selectedCard && (
              <div
                className="pointer-events-auto relative w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl border border-brass/50 bg-[#16120f] text-soft-cream shadow-[0_25px_80px_-15px_rgba(0,0,0,0.8)] overflow-hidden data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Fixed Top Image Banner */}
                <div className="relative h-48 sm:h-64 w-full shrink-0 overflow-hidden bg-black/60">
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.imageAlt}
                    className="size-full object-cover object-center"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16120f] via-[#16120f]/60 to-black/30" />

                  {/* Close Button */}
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close event details"
                      className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 flex size-9 sm:size-10 items-center justify-center rounded-full bg-black/75 hover:bg-brass border border-brass/50 text-soft-cream hover:text-charcoal backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer active:scale-95"
                    >
                      <X className="size-5" />
                    </button>
                  </Dialog.Close>

                  {/* Header Content on Banner */}
                  <div className="absolute bottom-4 left-4 right-14 sm:left-7 sm:right-16 z-10">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-brass/45 text-brass-light text-xs font-serif shadow-xs">
                        <span className="size-1.5 rounded-full bg-brass animate-pulse" />
                        <span>{selectedCard.punjabiTitle}</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-brass/25 backdrop-blur-md border border-brass/50 text-brass-light text-[11px] font-bold tracking-wide">
                        {selectedCard.badge}
                      </span>
                    </div>

                    <Dialog.Title className="font-display text-2xl sm:text-4xl font-bold text-soft-cream tracking-tight drop-shadow-sm leading-tight">
                      {selectedCard.title}
                    </Dialog.Title>

                    <p className="mt-1 text-xs sm:text-sm text-brass-light/95 font-medium flex items-center gap-1.5 drop-shadow-xs">
                      <Sparkle className="size-3 text-brass shrink-0" />
                      <span>{selectedCard.tagline}</span>
                    </p>
                  </div>
                </div>

                {/* Scrollable Event Content Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 sm:space-y-7 custom-scrollbar">
                  {/* Punjabi Subtitle & Long Overview */}
                  <div>
                    <div className="inline-block text-xs font-serif tracking-wide text-brass-light/80 bg-brass/10 px-3 py-1 rounded-md border border-brass/20 mb-2.5">
                      {selectedCard.punjabiTagline}
                    </div>

                    <p
                      id="event-detail-description"
                      className="text-sm sm:text-base text-soft-cream/90 font-sans leading-relaxed"
                    >
                      {selectedCard.longOverview}
                    </p>
                  </div>

                  {/* Quick Venue Specs Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 border border-brass/25">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-brass/15 border border-brass/35 flex items-center justify-center shrink-0 text-brass">
                        <Users2 className="size-4" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-soft-cream/50">Capacity</div>
                        <div className="text-xs sm:text-sm font-semibold text-soft-cream">{selectedCard.capacity}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-brass/15 border border-brass/35 flex items-center justify-center shrink-0 text-brass">
                        <Clock className="size-4" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-soft-cream/50">Timing Slots</div>
                        <div className="text-xs sm:text-sm font-semibold text-soft-cream">{selectedCard.duration}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-brass/15 border border-brass/35 flex items-center justify-center shrink-0 text-brass">
                        <ShieldCheck className="size-4" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-soft-cream/50">Hall Setup</div>
                        <div className="text-xs sm:text-sm font-semibold text-soft-cream truncate" title={selectedCard.venueSetup}>
                          {selectedCard.venueSetup}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Highlights & Inclusions */}
                  <div>
                    <h4 className="text-xs font-bold tracking-[0.16em] uppercase text-brass mb-3.5 flex items-center gap-2">
                      <span>❖</span>
                      <span>Venue Arrangements & Inclusions</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      {selectedCard.highlights.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-brass/20 hover:border-brass/40 transition-colors"
                        >
                          <CheckCircle2 className="size-4 text-brass shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs sm:text-sm font-semibold text-soft-cream">
                              {item.title}
                            </div>
                            <div className="text-[11px] sm:text-xs text-soft-cream/70 mt-0.5 leading-snug">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Perfect For / Suggested Occasions */}
                  <div>
                    <h4 className="text-xs font-bold tracking-[0.16em] uppercase text-brass mb-2.5 flex items-center gap-2">
                      <span>✦</span>
                      <span>Recommended Rituals & Occasions</span>
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {selectedCard.idealFor.map((ritual, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brass/15 border border-brass/30 text-brass-light text-xs font-medium"
                        >
                          <span className="size-1 rounded-full bg-brass" />
                          <span>{ritual}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-4 sm:p-5 bg-black/60 border-t border-brass/25 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                  <div className="text-xs text-soft-cream/60 hidden sm:block">
                    <span>Shah Junction Villa, Sahaipur · Gurdaspur</span>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    {/* WhatsApp Inquiry Button */}
                    <a
                      href={`https://wa.me/918728060036?text=${encodeURIComponent(
                        `Hello Shah Junction Villa, I am interested in inquiring about hosting a ${selectedCard.title} event at your venue. Please share available dates and pricing details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-emerald-500/50 bg-emerald-950/40 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
                    >
                      <MessageCircle className="size-4" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Book / Check Availability Button */}
                    <button
                      type="button"
                      onClick={() => handleProceedToBooking(selectedCard)}
                      className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brass-deep via-brass to-brass-light hover:to-white text-charcoal text-xs font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(202,168,106,0.35)] hover:shadow-[0_6px_22px_rgba(202,168,106,0.55)] transition-all duration-300 cursor-pointer active:scale-95"
                    >
                      <Calendar className="size-3.5" />
                      <span>Book / Check Date</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
