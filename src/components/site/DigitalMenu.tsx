import { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  Sparkles,
  PhoneCall,
  MessageCircle,
  AlertCircle,
  Clock,
  Wine,
  Utensils,
  ChevronRight,
  Flame,
  Coffee,
  Sun,
  X,
  ArrowUp,
  ArrowRight,
  Award,
  ShieldAlert,
  Check,
} from "lucide-react";
import {
  digitalMenuItems,
  MENU_CATEGORIES,
  IMPORTANT_NOTES,
  type MenuCategoryTab,
  type DigitalMenuItem,
  type DietType,
} from "@/lib/digitalMenuData";
import { RESERVATION_CONTACT } from "@/lib/reservations";
import {
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
} from "@/lib/venue";
import { Reveal } from "./Reveal";

/* ========================================================================== */
/* CATEGORY VISUAL METADATA & FOOD PHOTOGRAPHY                                */
/* ========================================================================== */
interface CategoryVisualInfo {
  tabKey: MenuCategoryTab;
  image: string;
  punjabiTag: string;
  title: string;
  description: string;
  chefPicks: string[];
  tag: string;
}

const CATEGORY_VISUALS: Partial<Record<MenuCategoryTab, CategoryVisualInfo>> = {
  Drinks: {
    tabKey: "Drinks",
    image: menuDrinks,
    punjabiTag: "ਸ਼ਾਹੀ ਕਾਕਟੇਲ ਅਤੇ ਮੌਕਟੇਲ",
    title: "Signature Cocktails, Draught Beers & Royal Mocktails",
    description:
      "Handcrafted virgin mojitos, chilled draught beers, thick craft shakes, and exotic fruit coolers served in ice-chilled glassware at our pergola bar counter.",
    chefPicks: ["Virgin Mojito", "Shah Junction Punch", "Draught Beer On Tap", "Choco Fudge Shake"],
    tag: "Bar & Drinks",
  },
  Breakfast: {
    tabKey: "Breakfast",
    image: menuBreakfast,
    punjabiTag: "ਸ਼ਾਹੀ ਅੰਮ੍ਰਿਤਸਰੀ ਨਾਸ਼ਤਾ",
    title: "Crispy Amritsari Stuffed Kulcha & Desi Ghee Breakfast",
    description:
      "Golden crispy tandoor kulchas smothered with homemade white butter, served with spicy Amritsari chole, pickled onions, and tall frothy lassi.",
    chefPicks: ["Amritsari Aloo Kulcha", "Paneer Kulcha & Chole", "Desi Ghee Parantha", "Shahi Pista Lassi"],
    tag: "Morning Special",
  },
  Snacks: {
    tabKey: "Snacks",
    image: menuChinese,
    punjabiTag: "ਸ਼ਾਹੀ ਸਟਾਰਟਰਸ ਤੇ ਸਨੈਕਸ",
    title: "Crispy Sizzlers, Golden Pakoras & Evening Starters",
    description:
      "Crisp paneer pakoras, golden fries, crunchy bites, and sizzlers tossed fresh with authentic aromatic spices.",
    chefPicks: ["Crispy Paneer Pakora", "Cheese Corn Roll", "Aloo Tikki Chaat", "Peri Peri Fries"],
    tag: "Crispy Bites",
  },
  Veg: {
    tabKey: "Veg",
    image: menuCurries,
    punjabiTag: "ਸ਼ਾਹੀ ਸ਼ਾਕਾਹਾਰੀ ਦਸਤਰਖ਼ਾਨ",
    title: "Slow-Simmered Royal Vegetarian Handi Curries",
    description:
      "Rich 24-hour slow-cooked Dal Makhani, Paneer Lababdar, and Mughlai gravies simmered with fresh cream and cashews in hammered copper handis.",
    chefPicks: ["24-Hour Dal Makhani", "Shahi Paneer Lababdar", "Kadhai Paneer", "Malai Kofta"],
    tag: "100% Pure Veg",
  },
  "Non-Veg": {
    tabKey: "Non-Veg",
    image: menuChicken,
    punjabiTag: "ਸ਼ਾਹੀ ਬਟਰ ਚਿਕਨ ਤੇ ਨੌਨ-ਵੈੱਜ ਸਵਾਦ",
    title: "Authentic Butter Chicken, Mutton Curries & Sizzlers",
    description:
      "Tender tandoori chicken simmered in rich velvety tomato butter gravy, slow-braised mutton rogan josh, and fresh crispy fish delicacies.",
    chefPicks: ["Old Delhi Butter Chicken", "Shahi Nawan Spl. Chicken", "Mutton Rogan Josh", "Amritsari Fish Fry"],
    tag: "Shahi Chicken & Meat",
  },
  Chinese: {
    tabKey: "Chinese",
    image: menuChinese,
    punjabiTag: "ਇੰਡੋ-ਚਾਈਨੀਜ਼ ਵੌਕ ਫਲੇਵਰ",
    title: "Wok-Tossed Veg Manchurian, Golden Baby Corn & Noodles",
    description:
      "Glazed vegetable Manchurian dumplings in soy garlic gravy, crispy golden fried baby corn with chilli dip, wok-tossed Hakka noodles, and fragrant fried rice.",
    chefPicks: ["Veg Manchurian Dry/Gravy", "Golden Fried Baby Corn", "Veg Hakka Noodles", "Chilli Paneer"],
    tag: "Chinese Veg & Oriental",
  },
  Tandoori: {
    tabKey: "Tandoori",
    image: menuTandoori,
    punjabiTag: "ਲਾਈਵ ਕੋਲੇ ਦਾ ਤੰਦੂਰ",
    title: "Live Charcoal Sizzlers, Tikka Kebabs & Fresh Breads",
    description:
      "Charcoal-roasted succulent chicken malai tikka, paneer tikka sizzlers, and butter garlic naans straight from our live clay oven.",
    chefPicks: ["Shahi Murgh Malai Tikka", "Paneer Tikka Sizzler", "Amritsari Fish Tikka", "Butter Garlic Naan"],
    tag: "Clay Tandoor",
  },
  "Main Course": {
    tabKey: "Main Course",
    image: menuCurries,
    punjabiTag: "ਸ਼ਾਹੀ ਮੁੱਖ ਖਾਣਾ ਤੇ ਬਿਰਯਾਨੀ",
    title: "Handcrafted Royal Gravies, Basmati Rice & Dum Biryani",
    description:
      "A complete royal feast prepared with pure ghee, slow-cooked gravies, fragrant saffron basmati rice, and hot tandoori breads.",
    chefPicks: ["Handi Dal Makhani", "Butter Chicken", "Hyderabadi Dum Biryani", "Stuffed Chur Chur Naan"],
    tag: "Royal Feast",
  },
  Raita: {
    tabKey: "Raita",
    image: menuRaita,
    punjabiTag: "ਤਾਜ਼ਾ ਦਹੀਂ ਤੇ ਸ਼ਾਹੀ ਰਾਇਤਾ",
    title: "Chilled Farm-Fresh Curd & Spiced Raitas",
    description:
      "Thick velvety whipped curd garnished with golden crispy boondi, garden mint, roasted cumin, and fresh fruits served with roasted papad.",
    chefPicks: ["Boondi Raita", "Mint Raita", "Mix Veg Raita", "Pineapple Raita"],
    tag: "Cooling & Fresh",
  },
};

const ALL_CUISINE_CARDS = [
  {
    tabKey: "Drinks" as MenuCategoryTab,
    image: menuDrinks,
    title: "Cocktails & Bar",
    punjabi: "ਕਾਕਟੇਲ ਤੇ ਡਰਿੰਕਸ",
    subtitle: "Draught beer, mojitos & shakes",
  },
  {
    tabKey: "Tandoori" as MenuCategoryTab,
    image: menuTandoori,
    title: "Clay Tandoor",
    punjabi: "ਤੰਦੂਰੀ ਸਿੱਜ਼ਲਰਸ",
    subtitle: "Smoky kebabs, tikkas & naans",
  },
  {
    tabKey: "Main Course" as MenuCategoryTab,
    image: menuCurries,
    title: "Royal Curries",
    punjabi: "ਸ਼ਾਹੀ ਗ੍ਰੇਵੀਆਂ",
    subtitle: "Dal Makhani & Butter Chicken",
  },
  {
    tabKey: "Non-Veg" as MenuCategoryTab,
    image: menuChicken,
    title: "Butter Chicken",
    punjabi: "ਸ਼ਾਹੀ ਬਟਰ ਚਿਕਨ",
    subtitle: "Tandoori chicken, gravies & meat",
  },
  {
    tabKey: "Chinese" as MenuCategoryTab,
    image: menuChinese,
    title: "Indo-Chinese",
    punjabi: "ਚਾਈਨੀਜ਼ ਵੈੱਜ ਤੇ ਸੂਪ",
    subtitle: "Veg Manchurian, Baby Corn & Noodles",
  },
  {
    tabKey: "Breakfast" as MenuCategoryTab,
    image: menuBreakfast,
    title: "Amritsari Kulcha",
    punjabi: "ਅੰਮ੍ਰਿਤਸਰੀ ਨਾਸ਼ਤਾ",
    subtitle: "Butter kulchas & chilled lassi",
  },
];

/* ========================================================================== */
/* DIET BADGE: FSSAI Authentic Luxury Styling                                */
/* ========================================================================== */
function DietBadge({ diet }: { diet: DietType }) {
  if (diet === "drink") {
    return (
      <span
        title="Beverage / Drink"
        className="inline-flex size-4 shrink-0 items-center justify-center rounded-xs border border-sky-600/70 bg-sky-50 text-[10px] text-sky-700 shadow-xs"
      >
        🍸
      </span>
    );
  }

  if (diet === "veg") {
    return (
      <span
        title="100% Pure Vegetarian"
        className="inline-flex size-4 shrink-0 items-center justify-center rounded-xs border-1.5 border-emerald-700 bg-[#f4fbf5] p-0.5 shadow-xs"
      >
        <span className="size-2 rounded-full bg-emerald-700" />
      </span>
    );
  }

  if (diet === "non-veg") {
    return (
      <span
        title="Non-Vegetarian"
        className="inline-flex size-4 shrink-0 items-center justify-center rounded-xs border-1.5 border-rose-900 bg-[#fdf4f4] p-0.5 shadow-xs"
      >
        <span className="size-2 rounded-full bg-rose-900" />
      </span>
    );
  }

  if (diet === "egg") {
    return (
      <span
        title="Contains Egg"
        className="inline-flex size-4 shrink-0 items-center justify-center rounded-xs border-1.5 border-amber-600 bg-[#fdf9f2] p-0.5 shadow-xs"
      >
        <span className="size-2 rounded-full bg-amber-600" />
      </span>
    );
  }

  if (diet === "both") {
    return (
      <span
        title="Veg / Non-Veg Options Available"
        className="inline-flex items-center gap-1 shrink-0"
      >
        <span className="inline-flex size-3.5 items-center justify-center rounded-xs border-1.5 border-emerald-700 bg-[#f4fbf5]">
          <span className="size-1.5 rounded-full bg-emerald-700" />
        </span>
        <span className="inline-flex size-3.5 items-center justify-center rounded-xs border-1.5 border-rose-900 bg-[#fdf4f4]">
          <span className="size-1.5 rounded-full bg-rose-900" />
        </span>
      </span>
    );
  }

  return null;
}

/* ========================================================================== */
/* CATEGORY ICONS & LABELS                                                    */
/* ========================================================================== */
const CATEGORY_META: Record<
  MenuCategoryTab,
  { label: string; icon: string; subtitle: string }
> = {
  All: { label: "All Dishes", icon: "✦", subtitle: "Complete 260+ Royal Menu" },
  Drinks: { label: "Drinks & Mocktails", icon: "🍸", subtitle: "Cocktails & Chilled Delights" },
  Breakfast: { label: "Shahi Breakfast", icon: "🍳", subtitle: "Fresh Morning Specials" },
  Snacks: { label: "Starters & Snacks", icon: "🍟", subtitle: "Crispy Sizzlers & Bites" },
  Veg: { label: "Shahi Veg", icon: "🥬", subtitle: "Royal Vegetarian Curries" },
  "Non-Veg": { label: "Royal Non-Veg", icon: "🍗", subtitle: "Chicken, Mutton & Fish" },
  Chinese: { label: "Indo-Chinese", icon: "🥢", subtitle: "Wok Gravies, Noodles & Rice" },
  Tandoori: { label: "Clay Tandoor", icon: "🍢", subtitle: "Live Charcoal Sizzlers & Breads" },
  "Main Course": { label: "Main Course", icon: "🍛", subtitle: "Handcrafted Gravies & Biryanis" },
  Raita: { label: "Raita & Salads", icon: "🥣", subtitle: "Cooling Curds & Papad" },
  Important: { label: "House Rules", icon: "📜", subtitle: "Dining Guidelines & Taxes" },
};

/* ========================================================================== */
/* MAIN COMPONENT: DigitalMenu                                                */
/* ========================================================================== */
export function DigitalMenu() {
  const [activeTab, setActiveTab] = useState<MenuCategoryTab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState<"ALL" | "VEG" | "NON_VEG">("ALL");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Active Category Visual Information
  const activeVisual =
    activeTab !== "All" && activeTab !== "Important"
      ? CATEGORY_VISUALS[activeTab]
      : null;

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToMenuTop = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Filter items based on Category, Search Query, and Diet
  const filteredItems = useMemo(() => {
    return digitalMenuItems.filter((item) => {
      // 1. Category Tab Filter
      let matchesCategory = false;
      if (activeTab === "All") {
        matchesCategory = true;
      } else if (activeTab === "Drinks") {
        matchesCategory = item.primaryCategory === "Drinks";
      } else if (activeTab === "Breakfast") {
        matchesCategory = item.primaryCategory === "Breakfast";
      } else if (activeTab === "Snacks") {
        matchesCategory = item.primaryCategory === "Snacks";
      } else if (activeTab === "Veg") {
        matchesCategory = item.diet === "veg" || item.diet === "both";
      } else if (activeTab === "Non-Veg") {
        matchesCategory = item.diet === "non-veg" || item.diet === "egg" || item.diet === "both";
      } else if (activeTab === "Chinese") {
        matchesCategory = item.primaryCategory === "Chinese";
      } else if (activeTab === "Tandoori") {
        matchesCategory = item.primaryCategory === "Tandoori";
      } else if (activeTab === "Main Course") {
        matchesCategory = item.primaryCategory === "Main Course";
      } else if (activeTab === "Raita") {
        matchesCategory = item.primaryCategory === "Raita";
      } else if (activeTab === "Important") {
        matchesCategory = false;
      }

      if (!matchesCategory) return false;

      // 2. Diet Filter Toggle
      if (dietFilter === "VEG") {
        if (item.diet !== "veg" && item.diet !== "drink" && item.diet !== "both") return false;
      } else if (dietFilter === "NON_VEG") {
        if (item.diet !== "non-veg" && item.diet !== "egg" && item.diet !== "both") return false;
      }

      // 3. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesSubcategory = item.subcategory.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q);
        const matchesPrice = item.price.includes(q);
        return matchesName || matchesSubcategory || matchesDesc || matchesPrice;
      }

      return true;
    });
  }, [activeTab, searchQuery, dietFilter]);

  // Group filtered items by Subcategory
  const groupedItems = useMemo(() => {
    const groups: { [key: string]: DigitalMenuItem[] } = {};
    for (const item of filteredItems) {
      if (!groups[item.subcategory]) {
        groups[item.subcategory] = [];
      }
      groups[item.subcategory].push(item);
    }
    return groups;
  }, [filteredItems]);

  const subcategoryNames = Object.keys(groupedItems);

  // Generate WhatsApp Direct Order Link for any item
  const getWhatsAppDishUrl = (item: DigitalMenuItem) => {
    const text = `Hello Shahi Junction Villa, I would like to order: ${item.name} (${item.price}). Please let me know table/takeaway availability.`;
    return `https://wa.me/918728060036?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="restaurant-menu"
      ref={sectionRef}
      className="relative bg-[#f5ede0] text-[#2c221a] py-16 sm:py-28 lg:py-32 border-b-2 border-[#d9c4a8] font-sans overflow-x-hidden w-full max-w-full transition-colors duration-500"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #fcf7ef 0%, #f6eee2 45%, #efe3d0 100%)",
      }}
    >
      {/* Subtle royal vintage lace / lattice pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:radial-gradient(#8f672a_1.2px,transparent_1.2px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Warm royal ambient illumination */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-gradient-to-b from-[#dcae5f]/20 via-[#f3dfba]/15 to-transparent blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#e0bb70]/10 via-transparent to-transparent blur-2xl rounded-full" />

      <div className="container-site relative z-10 max-w-6xl w-full min-w-0 px-3 sm:px-6">
        {/* ================================================================ */}
        {/* ROYAL MENU COVER HEADER                                          */}
        {/* ================================================================ */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            {/* Gurmukhi & English Royal Crest */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#ebdcc6] border border-[#cfb895] text-[#734c16] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
              <Sparkles className="size-3.5 text-[#a87425]" />
              <span className="font-gurmukhi text-[13px] tracking-wider">
                ਸ਼ਾਹੀ ਦਸਤਰਖ਼ਾਨ · ਸ਼ਾਹੀ ਮੀਨੂ
              </span>
              <span className="text-[#a87425]">•</span>
              <span>ROYAL PALACE MENU</span>
              <Sparkles className="size-3.5 text-[#a87425]" />
            </div>

            {/* Majestic Display Title */}
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.25rem)] font-bold tracking-tight text-[#231911] uppercase leading-[1.05] drop-shadow-xs">
              SHAHI JUNCTION VILLA
            </h2>

            {/* Vintage Ornate Divider */}
            <div className="mt-2 flex items-center justify-center gap-3">
              <span className="h-[2px] w-14 bg-gradient-to-r from-transparent via-[#b58728] to-[#d6aa46]" />
              <span className="text-[#a5741b] text-base">❖</span>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[0.22em] text-[#865917] uppercase">
                RESTAURANT & BAR MENU
              </h3>
              <span className="text-[#a5741b] text-base">❖</span>
              <span className="h-[2px] w-14 bg-gradient-to-l from-transparent via-[#b58728] to-[#d6aa46]" />
            </div>

            {/* Calligraphic Script Subtitle */}
            <p className="mt-2 font-script text-2xl sm:text-3.5xl text-[#8e601d]">
              Authentic Punjabi Flavours • Clay Tandoor • Royal Feast
            </p>

            {/* Narrative Editorial Description */}
            <p className="mt-3 text-xs sm:text-sm text-[#5a483a] leading-relaxed max-w-xl mx-auto font-medium">
              Prepared fresh to order in our royal kitchen using farm-ground spices and time-honoured culinary craft. From refreshing handcrafted mocktails and clay tandoor sizzlers to slow-cooked shahi curries and fresh fish delicacies.
            </p>

            {/* Luxury Feature Ribbons */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold text-[#574332]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3e9da] border border-[#d8c3a7] shadow-2xs">
                <span>🍽️</span> 260+ Handcrafted Dishes
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3e9da] border border-[#d8c3a7] shadow-2xs">
                <span>🔥</span> Live Clay Tandoor
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3e9da] border border-[#d8c3a7] shadow-2xs">
                <span>🌿</span> Pure Veg & Fresh Cuts
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3e9da] border border-[#d8c3a7] shadow-2xs">
                <span>⏱️</span> Cooked Fresh in 20 Mins
              </span>
            </div>

            {/* Direct Order Quick Call & WhatsApp Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={RESERVATION_CONTACT.phoneTel}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#2a1f17] to-[#1c140e] hover:from-black hover:to-[#221811] text-[#f7efe2] text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all border border-[#b88c3a]/50 group"
              >
                <PhoneCall className="size-4 text-[#e0b85a] group-hover:scale-110 transition-transform" />
                <span>Call to Order: {RESERVATION_CONTACT.phoneDisplay}</span>
              </a>
              <a
                href={RESERVATION_CONTACT.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#146b3a] to-[#0f542c] hover:from-[#115e32] hover:to-[#0c4323] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all border border-emerald-400/30 group"
              >
                <MessageCircle className="size-4 group-hover:scale-110 transition-transform" />
                <span>WhatsApp Quick Order</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* ================================================================ */}
        {/* STICKY SEARCH & CATEGORY BAR (WARM CREAM GLASS)                  */}
        {/* ================================================================ */}
        <div className="mt-12 sm:mt-16 sticky top-14 sm:top-16 z-30 bg-[#f4ebdc]/95 backdrop-blur-md pt-3 pb-3 border-y-2 border-[#d5c0a2] shadow-sm transition-all">
          {/* Top Search Box & Diet Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2.5">
            {/* Search Box */}
            <div className="relative flex-1 max-w-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g. Mojito, Dal Makhni, Sizzler, Fish, Biryani)..."
                className="h-10.5 w-full rounded-xl border border-[#c7b091] bg-[#fffef9] pl-10 pr-9 text-xs sm:text-sm text-[#231a12] placeholder:text-[#8d7c6d] font-medium focus:border-[#9e701e] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#c89836]/40 shadow-xs transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#9b6f1e]" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8b7969] hover:text-black rounded-full hover:bg-[#ebdcc8]"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Diet Quick Enamel Filters */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[#6d594a] font-bold text-[11px] uppercase tracking-wider hidden md:inline">
                Diet:
              </span>
              <button
                type="button"
                onClick={() => setDietFilter("ALL")}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all text-xs cursor-pointer ${
                  dietFilter === "ALL"
                    ? "bg-[#271d15] text-[#f7efe2] shadow-xs ring-1 ring-[#b88c3a]/40"
                    : "bg-[#fffdf8] border border-[#d8c3a7] text-[#544335] hover:bg-[#ede0ce]"
                }`}
              >
                All Dishes
              </button>
              <button
                type="button"
                onClick={() => setDietFilter("VEG")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all text-xs cursor-pointer ${
                  dietFilter === "VEG"
                    ? "bg-emerald-800 text-white shadow-xs ring-1 ring-emerald-500"
                    : "bg-[#fffdf8] border border-emerald-400/60 text-emerald-900 hover:bg-emerald-50/70"
                }`}
              >
                <span className="size-2 rounded-full bg-emerald-500 ring-2 ring-white/50" />
                <span>Veg Only</span>
              </button>
              <button
                type="button"
                onClick={() => setDietFilter("NON_VEG")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all text-xs cursor-pointer ${
                  dietFilter === "NON_VEG"
                    ? "bg-rose-950 text-white shadow-xs ring-1 ring-rose-500"
                    : "bg-[#fffdf8] border border-rose-300 text-rose-950 hover:bg-rose-50/70"
                }`}
              >
                <span className="size-2 rounded-full bg-rose-600 ring-2 ring-white/50" />
                <span>Non-Veg Only</span>
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Category Tabs with Icons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1.5 no-scrollbar scroll-smooth">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeTab === cat;
              const meta = CATEGORY_META[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#b58728] via-[#e2b755] to-[#9e7019] text-[#1c1206] shadow-md ring-1 ring-[#875f14]/50 scale-[1.03]"
                      : "bg-[#fffdf8] hover:bg-white text-[#4a392b] hover:text-[#1c1206] border border-[#d6c1a5] hover:border-[#b58728] shadow-2xs"
                  }`}
                >
                  <span className="text-sm">{meta.icon}</span>
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================ */}
        {/* IMPORTANT HOUSE RULES TAB (ROYAL FRAMED CHARTER)                 */}
        {/* ================================================================ */}
        {activeTab === "Important" ? (
          <div className="mt-10 rounded-3xl border-2 border-[#cfb895] bg-gradient-to-b from-[#fffef9] via-[#fbf5eb] to-[#f4ebe0] p-6 sm:p-10 shadow-lg animate-in fade-in-50 duration-300 relative overflow-hidden">
            {/* Background filigree watermark */}
            <div className="absolute right-0 bottom-0 opacity-5 text-[#885718] select-none pointer-events-none text-9xl font-serif">
              ✦
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#dbc7ad]">
              <div className="flex items-center gap-3.5">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8d7be] to-[#cfae7d] text-[#5e3c10] border border-[#b88c3a]/50 shadow-inner shrink-0">
                  <ShieldAlert className="size-7 text-[#774c15]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8b5c19] block">
                    RESTAURANT POLICIES & GUIDELINES · ਜ਼ਰੂਰੀ ਹਦਾਇਤਾਂ
                  </span>
                  <h3 className="font-display text-2xl sm:text-3.5xl font-bold text-[#231911]">
                    Important House Rules & Dining Charter
                  </h3>
                </div>
              </div>

              <span className="px-3.5 py-1 rounded-full bg-[#eadecc] border border-[#c4ae93] text-xs font-bold text-[#684617]">
                Official Management Notice
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {IMPORTANT_NOTES.map((note, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#fffefb] border border-[#dbc6ab] shadow-xs hover:border-[#b58728] hover:shadow-md transition-all duration-300"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ebdcc7] to-[#d6bb8e] text-[#54360e] font-bold text-xs border border-[#bfa275] shadow-2xs">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-[#291f17] leading-relaxed">
                      {note}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t-2 border-[#dbc7ad] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#635041]">
              <div className="flex items-center gap-2 font-medium">
                <Clock className="size-4 text-[#9b6e1e]" />
                <span>Last order for kitchen and bar is taken strictly by 10:30 PM.</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("All")}
                className="px-5 py-2 rounded-xl bg-[#2b2018] hover:bg-black text-[#f7efe2] font-bold text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
              >
                ← Back to Full Menu
              </button>
            </div>
          </div>
        ) : (
          /* ================================================================ */
          /* MENU ITEMS DISPLAY BY SUBCATEGORY                                */
          /* ================================================================ */
          <div className="mt-10 space-y-12">
            {/* Visual Spotlight Banner for Individual Active Category */}
            {!searchQuery && activeVisual && (
              <div className="rounded-3xl border-2 border-[#cfb895] bg-gradient-to-br from-[#fffefc] via-[#fcf8f0] to-[#f6ede0] shadow-md overflow-hidden animate-in fade-in-50 duration-300">
                <div className="grid md:grid-cols-12 items-center">
                  <div className="md:col-span-5 relative h-56 sm:h-64 md:h-full min-h-[240px] overflow-hidden">
                    <img
                      src={activeVisual.image}
                      alt={activeVisual.title}
                      className="size-full object-cover object-center transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs border border-[#e0b85a]/60 text-[#e0b85a] text-xs font-bold uppercase tracking-wider shadow-sm">
                        {activeVisual.tag}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-7 p-5 sm:p-7 lg:p-8">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#885718] uppercase tracking-widest mb-1.5">
                      <span className="size-1.5 rounded-full bg-[#885718]" />
                      <span className="font-gurmukhi text-sm">{activeVisual.punjabiTag}</span>
                      <span>•</span>
                      <span>CHEF'S PALACE SPECIAL</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2.5xl font-bold text-[#231911] leading-tight">
                      {activeVisual.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#5a483a] leading-relaxed font-sans">
                      {activeVisual.description}
                    </p>

                    <div className="mt-4 pt-3.5 border-t border-[#dfcbaf]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#735128] block mb-2">
                        Signature Highlights:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeVisual.chefPicks.map((pick, pIdx) => (
                          <span
                            key={pIdx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#efe3d1] border border-[#d2bd9f] text-[11px] font-semibold text-[#3b2c20]"
                          >
                            <Sparkles className="size-2.5 text-[#885718]" />
                            <span>{pick}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <a
                        href={RESERVATION_CONTACT.whatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#146b3a] to-[#0f542c] hover:brightness-110 text-white text-xs font-bold shadow-xs transition-all"
                      >
                        <MessageCircle className="size-3.5" />
                        <span>Order from this Section</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setActiveTab("All")}
                        className="px-4 py-2 rounded-xl bg-[#fffefb] border border-[#d2bd9f] hover:bg-[#ebdcc7] text-xs font-bold text-[#5e432a] shadow-2xs transition-colors cursor-pointer"
                      >
                        View Full Menu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5-Section Visual Gallery for "All" Tab */}
            {!searchQuery && activeTab === "All" && (
              <div className="rounded-3xl border-2 border-[#cfb895] bg-[#fffefc]/80 p-5 sm:p-7 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#dfcbaf]">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#885718] block">
                      ROYAL KITCHEN & BAR SHOWCASE · ਸ਼ਾਹੀ ਵੰਨਗੀਆਂ
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#231911]">
                      Explore Our Signature Culinary Sections
                    </h3>
                  </div>
                  <span className="text-xs text-[#78614e] font-medium hidden sm:inline">
                    Click any card to jump to that category
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                  {ALL_CUISINE_CARDS.map((card) => (
                    <button
                      key={card.tabKey}
                      type="button"
                      onClick={() => setActiveTab(card.tabKey)}
                      className="group relative flex flex-col justify-end h-48 sm:h-56 rounded-2xl overflow-hidden border border-[#d6c1a5] hover:border-[#b58728] shadow-xs hover:shadow-md transition-all duration-300 text-left p-3.5 cursor-pointer hover:-translate-y-1"
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="absolute inset-0 size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />

                      <div className="relative z-10">
                        <span className="font-gurmukhi text-[11px] text-[#e0b85a] block mb-0.5">
                          {card.punjabi}
                        </span>
                        <h4 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-[#f4d17c] transition-colors leading-tight">
                          {card.title}
                        </h4>
                        <p className="text-[11px] text-[#cfbeaa] mt-0.5 line-clamp-1">
                          {card.subtitle}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-[#e0b85a] uppercase tracking-wider group-hover:underline">
                          <span>Explore</span>
                          <ArrowRight className="size-2.5" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search summary or empty state */}
            {searchQuery && (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#ebdcc9]/80 border border-[#cfba9d] text-xs font-bold text-[#564131]">
                <span>
                  Showing search results for: <span className="text-[#885718]">"{searchQuery}"</span> ({filteredItems.length} {filteredItems.length === 1 ? "dish" : "dishes"} found)
                </span>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-[#885718] hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}

            {subcategoryNames.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-3xl bg-[#fffefb]/90 border-2 border-[#d9c4a8] shadow-sm">
                <Utensils className="size-12 text-[#9f7223]/50 mx-auto mb-3" />
                <h4 className="font-display text-2xl font-bold text-[#231911]">
                  No dishes found matching your criteria
                </h4>
                <p className="text-xs sm:text-sm text-[#665445] mt-1.5 max-w-sm mx-auto">
                  Try adjusting your search terms or switch diet filters to explore our comprehensive royal feast.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setDietFilter("ALL");
                    setActiveTab("All");
                  }}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#b58728] to-[#9b6f1e] text-[#1c1206] font-bold text-xs uppercase tracking-wider shadow-sm hover:brightness-105 transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              (() => {
                const getSubcategoryPhotoCard = (title: string) => {
                  const SUBCATEGORY_PHOTO_CARDS: Record<
                    string,
                    { image: string; tag: string; punjabi: string; title: string; desc: string }
                  > = {
                    // 1. DRINKS
                    "Mocktails": {
                      image: menuDrinks,
                      tag: "Signature Mocktails",
                      punjabi: "ਸ਼ਾਹੀ ਮੌਕਟੇਲ ਤੇ ਕੂਲਰਸ",
                      title: "Handcrafted Fresh Fruit Mocktails & Coolers",
                      desc: "Crisp crushed mint virgin mojitos, Blue Lagoon, passion fruit punches, and chilled craft mocktails.",
                    },
                    "Beverages": {
                      image: menuDrinks,
                      tag: "Hot & Cold Brews",
                      punjabi: "ਗਰਮ ਤੇ ਠੰਡੇ ਪੀਣ ਵਾਲੇ ਪਦਾਰਥ",
                      title: "Palace Special Coffees & Masala Teas",
                      desc: "Fresh brewed cappuccino, aromatic kadak masala tea, Kashmiri kahwa, and rich hot chocolate.",
                    },
                    "Shakes & Cold Drinks": {
                      image: menuDrinks,
                      tag: "Creamy Shakes & Floats",
                      punjabi: "ਸ਼ਾਹੀ ਸ਼ੇਕਸ ਤੇ ਠੰਡੀਆਂ ਡਰਿੰਕਸ",
                      title: "Thick Shakes, Smoothies & Cold Drinks",
                      desc: "Velvety Oreo, Belgian chocolate, strawberry and mango thick shakes topped with cream and dry fruits.",
                    },

                    // 2. BREAKFAST
                    "Parathas with Curd": {
                      image: menuBreakfast,
                      tag: "Desi Ghee Parathas",
                      punjabi: "ਦੇਸੀ ਘਿਓ ਪਰੌਂਠੇ ਤੇ ਤਾਜ਼ਾ ਦਹੀਂ",
                      title: "Tandoori Stuffed Parathas with Farm Curd",
                      desc: "Crispy golden Aloo, Gobhi, Paneer, and Mix parathas smothered in homemade white butter and fresh spiced dahi.",
                    },
                    "Egg & Chicken Sandwich": {
                      image: menuOmelette,
                      tag: "Club Sandwiches",
                      punjabi: "ਐੱਗ ਤੇ ਚਿਕਨ ਗ੍ਰਿਲਡ ਸੈਂਡਵਿਚ",
                      title: "Loaded Egg & Chicken Grilled Sandwiches",
                      desc: "Golden toasted double-decker sandwiches layered with juicy chicken tikka, eggs, melted cheese, and herbs.",
                    },
                    "Veg Sandwich": {
                      image: menuOmelette,
                      tag: "Toasted Sandwiches",
                      punjabi: "ਤਾਜ਼ਾ ਵੈੱਜ ਗ੍ਰਿਲਡ ਸੈਂਡਵਿਚ",
                      title: "Artisan Veg & Cheese Grilled Sandwiches",
                      desc: "Crispy toasted jumbo bread stuffed with garden vegetables, spiced cottage cheese, and gooey mozzarella.",
                    },
                    "Toast & Egg": {
                      image: menuOmelette,
                      tag: "Eggs & Butter Toast",
                      punjabi: "ਮਸਾਲਾ ਆਮਲੇਟ, ਭੁਰਜੀ ਤੇ ਬਟਰ ਟੋਸਟ",
                      title: "Fluffy Masala Omelettes & Buttered Toast",
                      desc: "Farm-fresh eggs whisked with green chillies, onions, and herbs, served with golden crisp butter toast.",
                    },

                    // 3. SNACKS & SIZZLERS
                    "Soups": {
                      image: menuSoups,
                      tag: "Piping Hot Soups",
                      punjabi: "ਗਰਮਾ-ਗਰਮ ਸ਼ਾਹੀ ਸੂਪ",
                      title: "Gourmet Steaming Manchow & Shorba",
                      desc: "Rich slow-simmered broths infused with ginger, garlic, veggies, and crunchy fried golden noodles.",
                    },
                    "Continental Sizzlers": {
                      image: menuTandoori,
                      tag: "Smoking Hot Sizzlers",
                      punjabi: "ਲਾਈਵ ਕਾਂਟੀਨੈਂਟਲ ਸਿੱਜ਼ਲਰ",
                      title: "Live Steaming Continental Sizzlers",
                      desc: "Cast iron smoking sizzlers with grilled paneer, herb butter rice, crisp fries, and pepper sauce.",
                    },
                    "Continental Veg & Non-Veg": {
                      image: menuChineseNonVeg,
                      tag: "Crispy Starters & Pakoras",
                      punjabi: "ਕਰਿਸਪੀ ਪਨੀਰ ਪਕੌੜਾ ਤੇ ਫਰਾਈਜ਼",
                      title: "Golden Crisp Pakoras, Fingers & Fries",
                      desc: "Melt-in-mouth stuffed paneer pakodas, cheese corn fingers, peri peri fries, and crispy cutlets.",
                    },
                    "Veg Burger": {
                      image: menuPizza,
                      tag: "Artisan Burgers",
                      punjabi: "ਤਾਜ਼ਾ ਕਰਿਸਪੀ ਬਰਗਰ",
                      title: "Jumbo Crispy Patty Cheese Burgers",
                      desc: "Toasted sesame buns stuffed with spiced herb patties, iceberg lettuce, melted cheese, and royal dips.",
                    },
                    "Veg Pizza": {
                      image: menuPizza,
                      tag: "Stone-Baked Veg Pizza",
                      punjabi: "ਤਾਜ਼ਾ ਪਨੀਰ ਟਿੱਕਾ ਤੇ ਚੀਜ਼ ਪੀਜ਼ਾ",
                      title: "Stone-Baked Loaded Veggie & Paneer Pizza",
                      desc: "Crispy hand-stretched crust topped with rich marinara sauce, mozzarella cheese, grilled paneer tikka, and oregano.",
                    },
                    "Non-Veg Pizza": {
                      image: menuPizza,
                      tag: "Artisan Chicken Pizza",
                      punjabi: "ਚਿਕਨ ਟਿੱਕਾ ਤੇ ਬਾਰਬੀਕਿਊ ਪੀਜ਼ਾ",
                      title: "Clay Oven Chicken Tikka & Cheesy Pizza",
                      desc: "Loaded with smokey tandoori chicken chunks, sliced sausages, melted mozzarella cheese, and chilli flakes.",
                    },

                    // 4. TANDOORI
                    "Fish - Seasonal": {
                      image: menuFish,
                      tag: "Fresh Amritsari Fish",
                      punjabi: "ਅੰਮ੍ਰਿਤਸਰੀ ਫਿਸ਼ ਟਿੱਕਾ ਤੇ ਫਰਾਈ",
                      title: "Crispy Amritsari Ajwaini Fish Fry & Tikka",
                      desc: "Fresh river sole marinated in roasted ajwain, Punjabi spices, and deep fried to golden crispy perfection with mint chutney.",
                    },
                    "Tandoori Snacks - Veg": {
                      image: menuTandoori,
                      tag: "Clay Tandoor Veg",
                      punjabi: "ਤੰਦੂਰੀ ਪਨੀਰ ਟਿੱਕਾ ਤੇ ਮਸ਼ਰੂਮ",
                      title: "Charcoal Roasted Paneer Tikka & Soya Chaap",
                      desc: "Cottage cheese skewers, stuffed tandoori aloo, and juicy malai soya chaap roasted over live red coals.",
                    },
                    "Tandoori Non-Veg": {
                      image: menuTandooriChicken,
                      tag: "Live Tandoor Non-Veg",
                      punjabi: "ਕੋਲੇ 'ਤੇ ਭੁੰਨਿਆ ਤੰਦੂਰੀ ਚਿਕਨ ਤੇ ਟਿੱਕਾ",
                      title: "Clay-Oven Tandoori Chicken & Malai Tikka",
                      desc: "Succulent chicken marinated in hung curd and shahi spices, flame-roasted in our traditional clay oven.",
                    },

                    // 5. CHINESE
                    "Chinese Veg. Oriental": {
                      image: menuChinese,
                      tag: "Chinese Veg Oriental",
                      punjabi: "ਵੈੱਜ ਮੰਚੂਰੀਅਨ ਤੇ ਗੋਲਡਨ ਬੇਬੀ ਕੌਰਨ",
                      title: "Wok-Glazed Veg Manchurian & Crispy Baby Corn",
                      desc: "Steaming vegetable Manchurian in garlic soy sauce, crispy golden fried baby corn, and wok noodles.",
                    },
                    "Chinese Non-Veg": {
                      image: menuChineseNonVeg,
                      tag: "Chinese Non-Veg Specials",
                      punjabi: "ਚਿੱਲੀ ਚਿਕਨ ਤੇ ਚਿਕਨ ਲੌਲੀਪੌਪ",
                      title: "Wok-Tossed Chilli Chicken & Crispy Lollipops",
                      desc: "Tender chicken tossed with crunchy bell peppers, green chillies, garlic soya glaze, and drumsticks.",
                    },
                    "Chinese Rice": {
                      image: menuChinese,
                      tag: "Fragrant Wok Rice",
                      punjabi: "ਸ਼ਾਹੀ ਚਾਈਨੀਜ਼ ਫਰਾਈਡ ਰਾਈਸ",
                      title: "Wok-Tossed Fried Rice & Schezwan Bowls",
                      desc: "Fragrant long-grain basmati rice wok-tossed with fresh crunchy vegetables, garlic, and oriental sauces.",
                    },

                    // 6. MAIN COURSE
                    "Indian Main Course - Veg": {
                      image: menuCurries,
                      tag: "Royal Handi Curries",
                      punjabi: "ਸ਼ਾਹੀ ਦਾਲ ਮਖਣੀ ਤੇ ਪਨੀਰ ਲਬਾਬਦਾਰ",
                      title: "Slow-Cooked Dal Makhani & Handi Gravies",
                      desc: "Simmered overnight with white butter, cream, and ground spices in authentic hammered copper handis.",
                    },
                    "Indian Curry - Non-Veg": {
                      image: menuChicken,
                      tag: "Authentic Butter Chicken",
                      punjabi: "ਸ਼ਾਹੀ ਬਟਰ ਚਿਕਨ ਤੇ ਮਟਨ ਰੋਗਨ ਜੋਸ਼",
                      title: "Velvety Butter Chicken & Braised Mutton",
                      desc: "Smokey shredded tandoori chicken in rich cashew-tomato butter makhani gravy and slow-cooked mutton.",
                    },

                    // 7. RAITA
                    "Raita & Curd": {
                      image: menuRaita,
                      tag: "Chilled Spiced Raita",
                      punjabi: "ਤਾਜ਼ਾ ਦਹੀਂ ਤੇ ਸ਼ਾਹੀ ਬੂੰਦੀ ਰਾਇਤਾ",
                      title: "Chilled Farm-Fresh Spiced Raitas",
                      desc: "Velvety whipped curd with crispy golden boondi, roasted jeera, garden mint, and pomegranate pearls.",
                    },
                  };

                  // 1. Direct match
                  if (SUBCATEGORY_PHOTO_CARDS[title]) {
                    return SUBCATEGORY_PHOTO_CARDS[title];
                  }

                  // 2. Case-insensitive exact / partial match
                  const s = title.toLowerCase();
                  for (const [key, card] of Object.entries(SUBCATEGORY_PHOTO_CARDS)) {
                    if (s.includes(key.toLowerCase()) || key.toLowerCase().includes(s)) {
                      return card;
                    }
                  }

                  // 3. Fallbacks by keyword
                  if (s.includes("mocktail") || s.includes("shake") || s.includes("drink") || s.includes("beverage") || s.includes("beer")) {
                    return SUBCATEGORY_PHOTO_CARDS["Mocktails"];
                  }
                  if (s.includes("paratha") || s.includes("kulcha") || s.includes("breakfast")) {
                    return SUBCATEGORY_PHOTO_CARDS["Parathas with Curd"];
                  }
                  if (s.includes("egg") || s.includes("omelet") || s.includes("sandwich") || s.includes("toast")) {
                    return SUBCATEGORY_PHOTO_CARDS["Toast & Egg"];
                  }
                  if (s.includes("soup") || s.includes("shorba")) {
                    return SUBCATEGORY_PHOTO_CARDS["Soups"];
                  }
                  if (s.includes("pizza") || s.includes("burger")) {
                    return SUBCATEGORY_PHOTO_CARDS["Veg Pizza"];
                  }
                  if (s.includes("fish") || s.includes("machhi") || s.includes("seafood")) {
                    return SUBCATEGORY_PHOTO_CARDS["Fish - Seasonal"];
                  }
                  if (s.includes("tandoori") && (s.includes("non-veg") || s.includes("chicken") || s.includes("mutton"))) {
                    return SUBCATEGORY_PHOTO_CARDS["Tandoori Non-Veg"];
                  }
                  if (s.includes("tandoor") || s.includes("tikka") || s.includes("sizzler") || s.includes("chaap")) {
                    return SUBCATEGORY_PHOTO_CARDS["Tandoori Snacks - Veg"];
                  }
                  if (s.includes("chinese") && (s.includes("non-veg") || s.includes("chicken"))) {
                    return SUBCATEGORY_PHOTO_CARDS["Chinese Non-Veg"];
                  }
                  if (s.includes("chinese") || s.includes("oriental") || s.includes("manchurian") || s.includes("noodle") || s.includes("rice")) {
                    return SUBCATEGORY_PHOTO_CARDS["Chinese Veg. Oriental"];
                  }
                  if (s.includes("curry") && (s.includes("non-veg") || s.includes("chicken") || s.includes("mutton"))) {
                    return SUBCATEGORY_PHOTO_CARDS["Indian Curry - Non-Veg"];
                  }
                  if (s.includes("main course") || s.includes("dal") || s.includes("paneer") || s.includes("curry") || s.includes("handi")) {
                    return SUBCATEGORY_PHOTO_CARDS["Indian Main Course - Veg"];
                  }
                  if (s.includes("raita") || s.includes("curd") || s.includes("dahi") || s.includes("salad") || s.includes("papad")) {
                    return SUBCATEGORY_PHOTO_CARDS["Raita & Curd"];
                  }

                  return SUBCATEGORY_PHOTO_CARDS["Indian Main Course - Veg"];
                };

                return subcategoryNames.map((subcategoryTitle) => {
                  const items = groupedItems[subcategoryTitle];
                  const photoCard = getSubcategoryPhotoCard(subcategoryTitle);

                return (
                  <div key={subcategoryTitle} className="scroll-mt-44 w-full min-w-0">
                    {/* Royal Subcategory Divider Ribbon */}
                    <div className="relative flex items-center justify-between pb-3.5 mb-5 sm:mb-6 border-b-2 border-[#d6c1a5] gap-2">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <span className="flex size-6 sm:size-7 shrink-0 items-center justify-center rounded-full bg-[#ebdcc6] border border-[#bfa478] text-[#865917] text-xs shadow-2xs">
                          ❖
                        </span>
                        <h3 className="font-display text-lg sm:text-2.5xl font-bold text-[#241a12] tracking-tight uppercase truncate">
                          {subcategoryTitle}
                        </h3>
                      </div>
                      <span className="shrink-0 px-2.5 sm:px-3 py-1 rounded-full bg-[#eee2d0] border border-[#d2bc9e] text-[11px] sm:text-xs font-bold text-[#725227] shadow-2xs">
                        {items.length} {items.length === 1 ? "Dish" : "Dishes"}
                      </span>
                    </div>

                    {/* Luxury Dish Cards Grid - Mobile Friendly */}
                    <div className="grid gap-3 sm:gap-4 md:gap-5 md:grid-cols-2 w-full min-w-0">
                      {/* Tasteful In-Grid Food Photography Card */}
                      {photoCard && (
                        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-[#c89836]/60 bg-[#1c140e] text-[#f7efe2] shadow-md group min-h-[220px] w-full min-w-0">
                          <div className="absolute inset-0">
                            <img
                              src={photoCard.image}
                              alt={photoCard.title}
                              className="size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/35" />
                          </div>

                          <div className="relative z-10 p-3.5 sm:p-4 pb-0 flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#e0b85a]/50 text-[#e0b85a] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm truncate">
                              <Sparkles className="size-3 text-[#e0b85a] shrink-0" />
                              <span className="truncate">{photoCard.tag}</span>
                            </span>
                            <span className="shrink-0 font-gurmukhi text-[11px] sm:text-xs text-[#ebd8b7] bg-black/60 px-2.5 py-0.5 rounded-full border border-white/10">
                              {photoCard.punjabi}
                            </span>
                          </div>

                          <div className="relative z-10 p-3.5 sm:p-4 pt-6 sm:pt-8">
                            <h4 className="font-display text-base sm:text-xl font-bold text-white leading-tight drop-shadow-sm">
                              {photoCard.title}
                            </h4>
                            <p className="mt-1 text-xs text-[#e2d5c5]/90 leading-relaxed font-sans line-clamp-2">
                              {photoCard.desc}
                            </p>

                            <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs gap-2">
                              <span className="text-[10px] sm:text-[11px] text-[#e0b85a] font-semibold flex items-center gap-1 shrink-0">
                                <span className="size-1.5 rounded-full bg-[#e0b85a] animate-pulse" />
                                Fresh To Order
                              </span>
                              <a
                                href={RESERVATION_CONTACT.whatsAppUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] sm:text-[11px] shadow-sm transition-colors"
                              >
                                <MessageCircle className="size-3 shrink-0" />
                                <span>Order via WhatsApp</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="group relative flex flex-col justify-between p-3.5 sm:p-5 rounded-2xl bg-gradient-to-b from-[#fffefc] via-[#fffdf8] to-[#fbf6ec] border border-[#dcc8af] shadow-xs hover:border-[#b58728] hover:shadow-[0_8px_24px_rgba(75,55,25,0.1)] hover:-translate-y-0.5 transition-all duration-300 w-full min-w-0"
                        >
                          {/* Dish Top Row: Diet Badge, Name, Special Badge, Dotted Leader, Price */}
                          <div className="w-full min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-2 w-full min-w-0">
                              {/* Left: Indicator & Dish Name */}
                              <div className="flex items-center gap-2 font-semibold min-w-0 flex-1">
                                <DietBadge diet={item.diet} />
                                <h4 className="font-display text-[15px] sm:text-lg font-bold text-[#221811] group-hover:text-[#885718] transition-colors break-words">
                                  {item.name}
                                </h4>
                                {item.isSpecial && (
                                  <span className="shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#ebd9be] to-[#dfbe87] text-[#5e3d10] text-[9px] sm:text-[10px] font-bold tracking-wider uppercase border border-[#b8955a]">
                                    <Sparkles className="size-2.5 text-[#885718]" /> Spl
                                  </span>
                                )}
                              </div>

                              {/* Center: Dotted Leader Line (tablet/desktop) */}
                              <div className="hidden sm:block flex-1 border-b-2 border-dotted border-[#d5c3aa] mx-2 self-center opacity-70" />

                              {/* Right / Below on mobile: Price Presentation */}
                              <div className="shrink-0 self-start sm:self-auto pl-6 sm:pl-0">
                                {item.priceType === "portion" ? (
                                  <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#f4e9da] border border-[#dccebc]">
                                    <span className="text-[9px] sm:text-[10px] font-bold text-[#725e4e] uppercase">H</span>
                                    <span className="font-display text-xs sm:text-sm font-bold text-[#7a4b10]">
                                      {item.priceHalf}
                                    </span>
                                    <span className="text-[#a4917f] text-xs">/</span>
                                    <span className="text-[9px] sm:text-[10px] font-bold text-[#725e4e] uppercase">F</span>
                                    <span className="font-display text-xs sm:text-sm font-bold text-[#7a4b10]">
                                      {item.priceFull}
                                    </span>
                                  </div>
                                ) : item.priceType === "diet_dual" ? (
                                  <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#f4e9da] border border-[#dccebc]">
                                    <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800">Veg</span>
                                    <span className="font-display text-xs font-bold text-[#7a4b10]">
                                      {item.priceVeg}
                                    </span>
                                    <span className="text-[#a4917f] text-xs">/</span>
                                    <span className="text-[9px] sm:text-[10px] font-bold text-rose-900">Non-Veg</span>
                                    <span className="font-display text-xs font-bold text-[#7a4b10]">
                                      {item.priceNonVeg}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-lg bg-[#f4e9da] border border-[#dccebc] font-display text-sm sm:text-lg font-bold text-[#7a4b10]">
                                    {item.price}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Description if available (e.g. for mocktails) */}
                            {item.description && (
                              <p className="mt-1.5 sm:mt-2 text-xs sm:text-[13px] text-[#695647] leading-relaxed italic pl-6 font-sans">
                                {item.description}
                              </p>
                            )}
                          </div>

                          {/* Subtle Quick Order Link (Diners can click to WhatsApp this dish directly) */}
                          <div className="mt-3 pt-2.5 border-t border-[#ede2d3] flex items-center justify-between text-[11px] text-[#735e4d] gap-2">
                            <span className="italic opacity-80 truncate">{subcategoryTitle}</span>
                            <a
                              href={getWhatsAppDishUrl(item)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 inline-flex items-center gap-1 text-[#0f5f33] hover:text-[#0b4827] font-bold hover:underline transition-colors"
                              title={`Order ${item.name} via WhatsApp`}
                            >
                              <MessageCircle className="size-3 text-[#15803d]" />
                              <span>Quick Order</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              });
            })()
          )}

            {/* Bottom Important Notes Banner */}
            <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#f5ede0] via-[#f8f2e7] to-[#f4ebe0] border-2 border-[#cfb895] shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="size-11 rounded-2xl bg-[#ebdcc6] border border-[#bfa478] text-[#7c5017] flex items-center justify-center shrink-0 shadow-2xs">
                    <AlertCircle className="size-6" />
                  </div>
                  <div>
                    <h5 className="font-display text-lg font-bold text-[#241a12]">
                      Important Dining Notes & Kitchen Guidelines
                    </h5>
                    <p className="text-xs sm:text-sm text-[#614e40] mt-0.5 font-medium">
                      Freshly made to order within 20 mins • CGST 2.5% & SGST 2.5% extra • Beer 14.5% VAT • Last order 10:30 PM
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("Important");
                    scrollToMenuTop();
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#fffefb] border border-[#c7af90] text-xs font-bold text-[#7a4b10] hover:bg-[#ebdcc7] shadow-xs transition-colors shrink-0 cursor-pointer"
                >
                  <span>View All 6 House Rules</span>
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Scroll Back to Top of Menu Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToMenuTop}
          aria-label="Back to top of menu"
          className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 p-3 rounded-full bg-[#271d15]/90 backdrop-blur-md text-[#e8b958] border border-[#c89836]/60 shadow-lg hover:bg-black hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </section>
  );
}
