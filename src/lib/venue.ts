import shahiVillaReal from "@/assets/shahi-villa-real.jpg";
import shahiDayFacade from "@/assets/shahi-day-facade.jpg";
import shahiGrandHall from "@/assets/shahi-grand-hall.jpg";
import shahiFloralTunnel from "@/assets/shahi-floral-tunnel.jpg";
import shahiFloralArch from "@/assets/shahi-floral-arch.jpg";
import shahiVipLounge from "@/assets/shahi-vip-lounge.jpg";
import shahiLawnCanopy from "@/assets/shahi-lawn-canopy.jpg";
import aboutPalaceEditorial from "@/assets/about-palace-editorial.jpg";
import palaceGate from "@/assets/palace-gate.jpg";
import shahiLiveHall from "@/assets/shahi-live-hall.jpg";
import shahiLawnBuffet from "@/assets/shahi-lawn-buffet.jpg";
import shahiParking from "@/assets/shahi-parking.jpg";
import shahiWeddingTunnel from "@/assets/shahi-wedding-tunnel.jpg";
import shahiBarCounter from "@/assets/shahi-bar-counter.jpg";
import shahiRestaurantLounge from "@/assets/shahi-restaurant-lounge.jpg";
import menuDrinks from "@/assets/menu-drinks.jpg";
import menuTandoori from "@/assets/menu-tandoori.jpg";
import menuCurries from "@/assets/menu-curries.jpg";
import menuChinese from "@/assets/menu-chinese.jpg";
import menuBreakfast from "@/assets/menu-breakfast.jpg";
import menuOmelette from "@/assets/menu-omelette.jpg";
import menuFish from "@/assets/menu-fish.jpg";
import menuSoups from "@/assets/menu-soups.jpg";
import menuChicken from "@/assets/menu-chicken.jpg";
import menuPizza from "@/assets/menu-pizza.jpg";
import menuTandooriChicken from "@/assets/menu-tandoori-chicken.jpg";
import menuRaita from "@/assets/menu-raita.jpg";
import menuChineseNonVeg from "@/assets/menu-chinese-nonveg.jpg";
import menuSweets from "@/assets/menu-sweets.jpg";
import menuBakery from "@/assets/menu-bakery.jpg";
import menuCafe from "@/assets/menu-cafe.jpg";
import menuChaatStalls from "@/assets/menu-chaat-stalls.jpg";
import menuFruitShop from "@/assets/menu-fruit-shop.jpg";
import menuSalads from "@/assets/menu-salads.jpg";
import menuHotDesserts from "@/assets/menu-hot-desserts.jpg";
import menuColdDesserts from "@/assets/menu-cold-desserts.jpg";
import menuMocktails from "@/assets/menu-mocktails.jpg";
import galleryNaan from "@/assets/gallery-naan.jpg";

export {
  shahiVillaReal,
  shahiDayFacade,
  shahiGrandHall,
  shahiFloralTunnel,
  shahiFloralArch,
  shahiVipLounge,
  shahiLawnCanopy,
  aboutPalaceEditorial,
  palaceGate,
  shahiLiveHall,
  shahiLawnBuffet,
  shahiParking,
  shahiWeddingTunnel,
  shahiBarCounter,
  shahiRestaurantLounge,
  menuDrinks,
  menuTandoori,
  menuCurries,
  menuChinese,
  menuChineseNonVeg,
  menuBreakfast,
  menuOmelette,
  menuFish,
  menuSoups,
  menuChicken,
  menuPizza,
  menuTandooriChicken,
  menuRaita,
  menuSweets,
  menuBakery,
  menuCafe,
  menuChaatStalls,
  menuFruitShop,
  menuSalads,
  menuHotDesserts,
  menuColdDesserts,
  menuMocktails,
  galleryNaan,
};

export interface VenueSpace {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  focusPosition?: string;
  features: string[];
  capacity?: string;
  ambience?: string;
}

export const venueSpaces: VenueSpace[] = [
  {
    id: "grand-banquet-hall",
    title: "The Grand Royal Banquet Hall",
    subtitle: "Indoor Luxury Ballroom & Banquet",
    description:
      "Expansive, fully air-conditioned neoclassical hall featuring soaring ceilings, multi-tier warm recessed tray lighting, classical white Roman columns, royal navy blue velvet dining chairs, and professional buffet banquet stations.",
    image: shahiGrandHall,
    focusPosition: "center 45%",
    features: ["Air-Conditioned Grand Hall", "Warm Tray Cove Lighting", "Royal Navy Velvet Seating", "Buffet Hospitality Stations"],
    capacity: "800 - 1,200 Guests",
    ambience: "Air-Conditioned Indoor Grandeur",
  },
  {
    id: "shamiana-wedding-lawns",
    title: "Royal Shamiana Wedding Lawns",
    subtitle: "Outdoor Marquee & Canopy Grounds",
    description:
      "Vast open-air celebration grounds draped with golden scalloped shamiana marquees, rich crimson patterned carpets, terracotta urns with fresh blooms, and open skies for majestic day and evening wedding ceremonies.",
    image: shahiLawnCanopy,
    focusPosition: "center 55%",
    features: ["Golden Scalloped Canopies", "Patterned Red Carpet Lawns", "Terracotta Floral Urns", "Day & Evening Open Grounds"],
    capacity: "1,500+ Outdoor Guests",
    ambience: "Golden Hour Lawns & Open Skies",
  },
  {
    id: "floral-wisteria-walkway",
    title: "Royal Floral Arch & Jaimala Gateway",
    subtitle: "Illuminated Arch & Wisteria Walkway",
    description:
      "A show-stopping ceremonial entrance featuring an illuminated multi-foil white lattice jali archway framed with fresh roses, candlelit niches, cascading wisteria blossoms, and purple silk drapes for unforgettable royal bridal and barat entries.",
    image: shahiFloralArch,
    focusPosition: "center 45%",
    features: ["Illuminated White Jali Arch", "Fresh Rose Floral Framing", "Cascading Wisteria Canopy", "Royal Barat & Bridal Entrance"],
    capacity: "Ceremonial Barat & Jaimala",
    ambience: "Illuminated Royal Jharokha Archway",
  },
  {
    id: "vip-lounge-pavilion",
    title: "The Royal VIP Lounge Pavilion",
    subtitle: "Luxury Sofas & Sangeet Stage View",
    description:
      "An exclusive VIP lounge area featuring plush magenta-rose leather seating, draped silk canopies intertwined with leafy greenery and fairy lights, and prime elevated stage visibility for close family and honored guests.",
    image: shahiVipLounge,
    focusPosition: "center 45%",
    features: ["Plush Magenta Leather Sofas", "Hanging Vines & Fairy Lights", "Stage-Facing VIP Comfort", "Sangeet & Cocktail Hospitality"],
    capacity: "150 - 250 VIP Guests",
    ambience: "Plush Leather Comfort & Stage View",
  },
];

export interface FacilityItem {
  id: string;
  name: string;
  punjabiName: string;
  description: string;
  tag: string;
  stat: string;
  category: "spaces" | "hospitality" | "dining" | "logistics";
  image: string;
  bullets: string[];
  iconName: "Castle" | "Trees" | "Armchair" | "Utensils" | "Car" | "Sparkles" | "DoorOpen" | "Crown";
}

export const venueFacilities: FacilityItem[] = [
  {
    id: "event-hall",
    name: "Climate-Controlled Grand Hall",
    punjabiName: "ਸ਼ਾਹ ਏ.ਸੀ. ਬੈਂਕੁਇਟ ਹਾਲ",
    description: "Soaring ceilings, multi-tier cove tray illumination, and classical Roman pillars accommodating up to 1,200 guests.",
    tag: "Fully Air-Conditioned",
    stat: "1,200 Guests",
    category: "spaces",
    image: shahiGrandHall,
    bullets: [
      "Multi-tier warm recessed tray lighting & crystal chandeliers",
      "High-tonnage central AC maintaining 21°C in peak summer",
      "Classical Roman Corinthian pillars & royal navy velvet seating",
    ],
    iconName: "Castle",
  },
  {
    id: "outdoor-space",
    name: "Royal Celebration Lawns",
    punjabiName: "ਵਿਸ਼ਾਲ ਸ਼ਾਹ ਲੌਨ",
    description: "Manicured green grounds for golden shamianas, open-sky dining, and starlit Anand Karaj celebrations under Punjab skies.",
    tag: "1,500+ Guest Capacity",
    stat: "1,500+ Capacity",
    category: "spaces",
    image: shahiLawnCanopy,
    bullets: [
      "Golden scalloped shamiana marquees with royal patterned red carpets",
      "Expansive manicured green lawns for day Anand Karaj & night galas",
      "Surrounded by ornamental terracotta urns and clear open skies",
    ],
    iconName: "Trees",
  },
  {
    id: "stage-area",
    name: "Floral Stage & Jaimala Setup",
    punjabiName: "ਫੁੱਲਾਂ ਦੀ ਸਟੇਜ ਤੇ ਜੈਮਾਲਾ",
    description: "Dedicated focal zones designed for royal floral stages, jaimala ceremonies, and memorable family photography.",
    tag: "Ceremonial Stage",
    stat: "Royal Stage",
    category: "spaces",
    image: shahiFloralArch,
    bullets: [
      "Multi-foil white jali arch gateway framed with fresh roses & wisteria",
      "High-CRI professional photography spotlights & cold pyro ready",
      "Elevated ceremonial stage ensuring 360° sightlines for all guests",
    ],
    iconName: "Sparkles",
  },
  {
    id: "entrance-area",
    name: "Procession & Barat Gateway",
    punjabiName: "ਸ਼ਾਹ ਬਰਾਤ ਰੂਟ ਤੇ ਗੇਟ",
    description: "Grand pillared portico and paved driveway designed for traditional barat arrivals, dhol beats, and warm greetings.",
    tag: "Royal Barat Route",
    stat: "Grand Procession",
    category: "logistics",
    image: palaceGate,
    bullets: [
      "Stately white colonnaded portico with cascading marigold steps",
      "Wide illuminated driveway accommodating horses, vintage cars & dhol",
      "Grand floral arches creating an awe-inspiring first impression",
    ],
    iconName: "DoorOpen",
  },
  {
    id: "seating",
    name: "Velvet & VIP Lounge Seating",
    punjabiName: "ਵੀ.ਆਈ.ਪੀ. ਲਗਜ਼ਰੀ ਲਾਊਂਜ",
    description: "Round banquet dining tables with golden linen, plus plush magenta leather sofas with prime stage visibility.",
    tag: "Plush Guest Comfort",
    stat: "Plush Sofas",
    category: "hospitality",
    image: shahiVipLounge,
    bullets: [
      "Magenta-rose leather sofas with draped silk fairy-light canopies",
      "Prime unobstructed elevated sightlines directly facing the stage",
      "Round banquet dining tables dressed in premium golden linens",
    ],
    iconName: "Armchair",
  },
  {
    id: "dining-area",
    name: "Dedicated Dining & Buffets",
    punjabiName: "ਸ਼ਾਹ ਬੁਫੇ ਤੇ ਲਾਈਵ ਕਾਊਂਟਰ",
    description: "Organized indoor and outdoor banquet catering zones with live tandoor and buffet counters for smooth service.",
    tag: "Banquet Hospitality",
    stat: "Multi-Cuisine",
    category: "dining",
    image: shahiLawnBuffet,
    bullets: [
      "Ornate hand-carved buffet counters with traditional scalloped umbrellas",
      "Dedicated live tandoor, chaat, and beverage staging zones",
      "Wide dedicated service pathways preventing guest congestion",
    ],
    iconName: "Utensils",
  },
  {
    id: "parking",
    name: "Spacious On-Site Parking",
    punjabiName: "ਵਿਸ਼ਾਲ ਸੁਰੱਖਿਅਤ ਪਾਰਕਿੰਗ",
    description: "Extensive secure parking grounds accommodating hundreds of guest vehicles and family coaches with ease.",
    tag: "Ample Secure Space",
    stat: "300+ Vehicles",
    category: "logistics",
    image: shahiParking,
    bullets: [
      "Designated parking marshals and valet assistance for seamless arrivals",
      "High-definition 24/7 CCTV surveillance covering the entire premises",
      "Direct paved, illuminated pedestrian routes from car to palace entrance",
    ],
    iconName: "Car",
  },
  {
    id: "suites",
    name: "Private Bridal & Family Suites",
    punjabiName: "ਪ੍ਰਾਈਵੇਟ ਬ੍ਰਾਈਡਲ ਸੂਈਟ",
    description: "Comfortable air-conditioned private rooms for bridal preparations, touch-ups, and family relaxation.",
    tag: "Private Dressing",
    stat: "AC Suites",
    category: "hospitality",
    image: aboutPalaceEditorial,
    bullets: [
      "Air-conditioned luxury bridal lounge with full-length vanity mirrors",
      "Private en-suite restroom and secure lockers for wedding jewelry",
      "Peaceful resting space for close family during hectic wedding hours",
    ],
    iconName: "Crown",
  },
];

export interface OccasionItem {
  id: string;
  title: string;
  punjabiTitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const venueOccasions: OccasionItem[] = [
  {
    id: "weddings",
    title: "Grand Weddings",
    punjabiTitle: "ਵਿਆਹ ਸਮਾਗਮ",
    description: "From joyful Anand Karaj rituals to majestic evening receptions, host your dream wedding with an illuminated floral archway and grand palace backdrop.",
    image: shahiWeddingTunnel,
    imageAlt: "Illuminated purple and gold royal floral tunnel walkway with cascading wisteria blossoms and red damask carpet at Shah Junction Villa",
  },
  {
    id: "engagements",
    title: "Engagements & Roka",
    punjabiTitle: "ਰੋਕਾ ਅਤੇ ਕੁੜਮਾਈ",
    description: "Celebrate the auspicious union of two families in our royal golden shamiana lawns or elegant air-conditioned banquet hall.",
    image: shahiLawnCanopy,
    imageAlt: "Golden scalloped shamiana canopies and red carpets on celebration lawn for engagement ceremonies",
  },
  {
    id: "receptions",
    title: "Wedding Receptions",
    punjabiTitle: "ਰਿਸੈਪਸ਼ਨ ਪਾਰਟੀ",
    description: "Host grand celebratory dinners with live orchestra, DJ dance floors, cove-lit ceilings, and royal velvet dining hospitality.",
    image: shahiGrandHall,
    imageAlt: "Indoor luxury banquet hall with royal blue velvet chairs and cove tray lighting for wedding receptions",
  },
  {
    id: "parking-valet",
    title: "Grand Arrivals & Valet Parking",
    punjabiTitle: "ਵਿਸ਼ਾਲ ਪਾਰਕਿੰਗ ਤੇ ਵਾਲੇ",
    description: "Extensive 2-acre landscaped grounds accommodating 300+ vehicles with dedicated valet drivers, paved driveways, and seamless guest arrival logistics.",
    image: shahiParking,
    imageAlt: "Spacious landscaped car parking lot filled with hundreds of guest vehicles at Shah Junction Villa in Punjab",
  },
  {
    id: "family-celebrations",
    title: "Family Milestones",
    punjabiTitle: "ਪਰਿਵਾਰਕ ਜਸ਼ਨ",
    description: "Golden jubilees, milestone birthdays, and multi-generational family reunions celebrated with utmost dignity and attentive service.",
    image: shahiDayFacade,
    imageAlt: "Daytime architectural facade of Shah Junction Villa for milestone family celebrations",
  },
];

export interface GalleryPhoto {
  src: string;
  title: string;
  category: string;
  alt: string;
  aspect: "landscape" | "portrait";
  focusPosition?: string;
  tagline?: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: shahiDayFacade,
    title: "Palace Portico & Facade Entrance",
    category: "Palace Architecture",
    alt: "Daytime facade view of Shah Junction Villa showing the grand white neoclassical colonnade, carved entrance signage, and dome finials in Punjab",
    aspect: "landscape",
    focusPosition: "center 50%",
    tagline: "Authentic Neoclassical architecture with carved Shah Junction Villa entrance",
  },
  {
    src: palaceGate,
    title: "Ceremonial Palace Entrance Gate",
    category: "Palace Architecture",
    alt: "Grand entrance portico with white Corinthian columns, hanging chandelier, and cascading marigold flower staircase at Shah Junction Villa",
    aspect: "portrait",
    focusPosition: "center 55%",
    tagline: "Regal marigold flower staircase and arched portico entrance",
  },
  {
    src: shahiGrandHall,
    title: "The Grand Royal Banquet Hall",
    category: "Indoor Ballroom",
    alt: "Opulent indoor banquet hall at Shah Junction Villa with multi-tier cove lighting, classical white pillars, floral carpet, and royal navy blue velvet dining chairs",
    aspect: "portrait",
    focusPosition: "center 50%",
    tagline: "High-ceiling air-conditioned ballroom with tray cove illumination & velvet dining",
  },
  {
    src: shahiLiveHall,
    title: "Live Banquet Celebration & Stage",
    category: "Indoor Ballroom",
    alt: "Joyful wedding celebration inside the grand banquet hall with circular tiered chandelier, seated guests, royal blue chairs, and live stage",
    aspect: "portrait",
    focusPosition: "center 50%",
    tagline: "Tiered crystal chandelier glow with dining guests & vibrant celebration stage",
  },
  {
    src: shahiFloralArch,
    title: "Royal Floral Arch & Jaimala Gateway",
    category: "Barat & Jaimala",
    alt: "Illuminated multi-foil white lattice jali arch gateway framed with fresh roses, candlelit niches, and hanging wisteria walkway at Shah Junction Villa",
    aspect: "portrait",
    focusPosition: "center 45%",
    tagline: "Illuminated white jali archway with fresh roses & golden wisteria walkway",
  },
  {
    src: shahiFloralTunnel,
    title: "Cascading Wisteria Floral Tunnel",
    category: "Barat & Jaimala",
    alt: "Magical bridal and barat arrival walkway adorned with cascading wisteria flowers, purple silk drapes, and illuminated geometric pedestals",
    aspect: "portrait",
    focusPosition: "center 50%",
    tagline: "Enchanting flower-canopy walkway for royal barat and jaimala ceremonies",
  },
  {
    src: shahiLawnCanopy,
    title: "Royal Shamiana Wedding Lawns",
    category: "Outdoor Grounds",
    alt: "Expansive outdoor wedding lawns with golden scalloped shamiana canopies, red patterned carpets, terracotta urns, and open blue Punjab skies",
    aspect: "portrait",
    focusPosition: "center 50%",
    tagline: "Spacious landscaped grounds with golden canopies & royal carpet pathways",
  },
  {
    src: shahiLawnBuffet,
    title: "Lawn Catering & Carved Buffet",
    category: "Outdoor Grounds",
    alt: "Outdoor celebration lawn catering counter with traditional wood carving, scalloped umbrella canopy, and red carpet runner under blue Punjab skies",
    aspect: "portrait",
    focusPosition: "center 50%",
    tagline: "Ornate carved banquet counters & traditional scalloped umbrella on the royal lawn",
  },
  {
    src: shahiVipLounge,
    title: "Royal VIP Lounge Pavilion",
    category: "VIP Lounge & Stage",
    alt: "Luxury VIP lounge seating at Shah Junction Villa with plush magenta leather couches, draped silk canopies, and lush hanging greenery",
    aspect: "portrait",
    focusPosition: "center 50%",
    tagline: "Plush leather sofa comfort with open-air draped canopies & fairy lights",
  },
  {
    src: shahiParking,
    title: "Vast On-Site Lawn Parking & Valet",
    category: "Palace Grounds",
    alt: "Spacious landscaped car parking lot at Shah Junction Villa filled with guest vehicles under clear blue skies with palm trees",
    aspect: "landscape",
    focusPosition: "center 50%",
    tagline: "Vast 2-acre secure lawn parking accommodating 300+ vehicles with valet marshals",
  },
  {
    src: shahiWeddingTunnel,
    title: "Purple & Gold Royal Floral Walkway",
    category: "Barat & Jaimala",
    alt: "Illuminated bridal and barat floral walkway with purple and gold draped ceiling, hanging wisteria arches, and red patterned carpet runner at Shah Junction Villa",
    aspect: "portrait",
    focusPosition: "center 50%",
    tagline: "Enchanting purple and gold wisteria canopy with chandeliers for grand wedding entries",
  },
  {
    src: shahiBarCounter,
    title: "The Royal Bar Counter & Draught Beers",
    category: "Restaurant & Bar",
    alt: "Modern bar counter with wooden pergola canopy, illuminated Kingfisher neon, draft beer dispenser towers, and back-lit cocktail glassware at Shah Junction Villa",
    aspect: "portrait",
    focusPosition: "center 50%",
    tagline: "Draft beer on tap, spirits & handcrafted cocktails under wooden pergola canopy",
  },
  {
    src: shahiRestaurantLounge,
    title: "Indoor Restaurant & Velvet Booth Dining",
    category: "Restaurant & Bar",
    alt: "Air-conditioned indoor dining hall with circular cove ceiling, warm downlights, and red velvet booth seating at Shah Junction Villa",
    aspect: "portrait",
    focusPosition: "center 50%",
    tagline: "Plush red velvet booth comfort with circular cove tray illumination for family dining",
  },
];

