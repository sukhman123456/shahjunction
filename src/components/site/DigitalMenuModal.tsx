import * as Dialog from "@radix-ui/react-dialog";
import { useState, useRef } from "react";
import {
  X,
  Crown,
  Sparkles,
  ChevronDown,
  ChevronUp,
  UtensilsCrossed,
  Check,
  Coffee,
  Info,
  ArrowRight,
  Flame,
  Award,
} from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { GOLDEN_MENU_CATEGORIES, type GoldenMenuCategory } from "@/lib/goldenMenuData";
import { SilverMenuView } from "./SilverMenuView";
import {
  menuDrinks,
  menuBreakfast,
  menuSoups,
  menuPizza,
  menuTandoori,
  menuChineseNonVeg,
  menuFish,
  menuChicken,
  menuCurries,
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
} from "@/lib/venue";

// Dedicated authentic food photography mapping for every Golden Menu category
const GOLDEN_CATEGORY_IMAGES: Record<string, string> = {
  welcome: menuDrinks,
  breakfast: menuBreakfast,
  "live-tawa": menuBreakfast,
  sweets: menuSweets,
  bakery: menuBakery,
  soup: menuSoups,
  "coffee-shakes": menuCafe,
  stalls: menuChaatStalls,
  children: menuPizza,
  "fruit-shop": menuFruitShop,
  "mocktail-bar": menuMocktails,
  "veg-snacks": menuTandoori,
  "non-veg-snacks": menuFish,
  salad: menuSalads,
  raita: menuRaita,
  "veg-main-course": menuCurries,
  "chinese-thai": menuChineseNonVeg,
  "live-counters": menuCurries,
  "non-veg-main-course": menuChicken,
  chapati: galleryNaan,
};

export function DigitalMenuModal() {
  const { isDigitalMenuOpen, closeDigitalMenu } = useBooking();
  const [activeMenuTab, setActiveMenuTab] = useState<"golden" | "silver">("golden");
  const [isGoldenMenuOpen, setIsGoldenMenuOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("welcome");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`cat-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Dialog.Root open={isDigitalMenuOpen} onOpenChange={(open) => !open && closeDigitalMenu()}>
      <Dialog.Portal>
        {/* Backdrop overlay */}
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />

        {/* Modal Container */}
        <Dialog.Content
          className="fixed inset-0 z-[80] flex flex-col bg-[#0d0a08] text-soft-cream outline-none overflow-hidden"
          aria-describedby="digital-menu-description"
        >
          <Dialog.Title className="sr-only">Digital Catering Menus - Shah Junction Villa</Dialog.Title>

          {/* Top Sticky Header */}
          <div className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-brass/25 bg-[#14100c]/95 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brass/30 via-brass/10 to-transparent border border-brass/45 text-brass-light shadow-sm">
                <UtensilsCrossed className="size-4.5 sm:size-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display text-base sm:text-xl font-bold tracking-wide text-white">
                    DIGITAL MENU
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-brass/20 border border-brass/40 text-[10px] font-bold uppercase tracking-wider text-brass-light">
                    Palace Catering
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs text-soft-cream/60 font-sans">
                  Shah Junction Villa · Sahaipur, Gurdaspur
                </span>
              </div>
            </div>

            {/* Close Button */}
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close digital menu"
                className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-white/10 hover:bg-brass hover:text-charcoal border border-white/20 text-soft-cream transition-all duration-300 cursor-pointer active:scale-95 shadow-md"
              >
                <X className="size-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Main Scrollable Body */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-12 py-6 sm:py-8 space-y-6 sm:space-y-8 custom-scrollbar"
          >
            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
              {/* Intro Banner */}
              <div id="digital-menu-description" className="text-center max-w-2xl mx-auto space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brass/15 border border-brass/40 text-brass-light text-[11px] font-semibold tracking-widest uppercase">
                  <Sparkles className="size-3 text-brass" />
                  <span>ROYAL BANQUET SELECTIONS · ਸ਼ਾਹ ਮੈਨਿਊ</span>
                </span>
                <p className="text-xs sm:text-sm text-soft-cream/70 font-sans">
                  Choose between our signature banquet packages below. Digitally presented in complete detail for your wedding and celebration planning.
                </p>
              </div>

              {/* 
                DUAL MENU OPTIONS:
                1. GOLDEN MENU (Royal Gold Edition)
                2. SILVER MENU (Royal Silver Edition)
              */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* 1. GOLDEN MENU CARD */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setActiveMenuTab("golden");
                    setIsGoldenMenuOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveMenuTab("golden");
                      setIsGoldenMenuOpen(true);
                    }
                  }}
                  className={`group relative cursor-pointer select-none rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 ${
                    activeMenuTab === "golden"
                      ? "border-2 border-brass bg-gradient-to-br from-[#241c15] via-[#1a1410] to-[#211a14] shadow-[0_12px_40px_-10px_rgba(202,168,106,0.45)] ring-2 ring-brass/30"
                      : "border border-brass/30 bg-[#16120e]/80 hover:border-brass/70 hover:bg-[#1a1511]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brass-deep via-brass to-brass-light text-charcoal shadow-md">
                      <Crown className="size-6 sm:size-7" strokeWidth={1.8} />
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
                        activeMenuTab === "golden"
                          ? "bg-brass text-charcoal border-brass"
                          : "bg-brass/20 text-brass-light border-brass/40"
                      }`}
                    >
                      {activeMenuTab === "golden" ? "ACTIVE SELECTION" : "SELECT GOLD"}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-brass-light/70 font-gurmukhi">ਸ਼ਾਹ ਗੋਲਡਨ ਮੈਨਿਊ</span>
                      <span className="text-[10px] text-brass">• 20 Categories</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wide text-white mt-1 group-hover:text-brass-light transition-colors">
                      GOLDEN MENU
                    </h2>
                    <p className="text-xs sm:text-sm text-soft-cream/70 font-sans mt-1 leading-relaxed">
                      Grand Wedding & Royal Banquet Catering Selection with deep charcoal & gold palace ambiance.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-brass/20 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brass-light">
                    <span>{activeMenuTab === "golden" ? "Viewing Gold Edition" : "Switch to Golden Menu"}</span>
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 2. SILVER MENU CARD */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveMenuTab("silver")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveMenuTab("silver");
                    }
                  }}
                  className={`group relative cursor-pointer select-none rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 ${
                    activeMenuTab === "silver"
                      ? "border-2 border-slate-300 bg-gradient-to-br from-[#2a303c] via-[#1e232d] to-[#151921] shadow-[0_12px_40px_-10px_rgba(203,213,225,0.35)] ring-2 ring-slate-400/50"
                      : "border border-slate-600/50 bg-[#161a22]/80 hover:border-slate-400 hover:bg-[#1a202a]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-400 text-slate-900 shadow-md">
                      <Sparkles className="size-6 sm:size-7 text-slate-800" strokeWidth={1.8} />
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
                        activeMenuTab === "silver"
                          ? "bg-slate-200 text-slate-900 border-white"
                          : "bg-slate-700/50 text-slate-300 border-slate-500/40"
                      }`}
                    >
                      {activeMenuTab === "silver" ? "ACTIVE SELECTION" : "SELECT SILVER"}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-300 font-gurmukhi">ਸ਼ਾਹ ਸਿਲਵਰ ਮੈਨਿਊ</span>
                      <span className="text-[10px] text-slate-400">• 20 Categories</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wide text-white mt-1 group-hover:text-slate-200 transition-colors">
                      SILVER MENU
                    </h2>
                    <p className="text-xs sm:text-sm text-soft-cream/70 font-sans mt-1 leading-relaxed">
                      Platinum & Chrome Edition with crisp white backdrop, authentic food visuals, and curated festive dishes.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-500/30 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
                    <span>{activeMenuTab === "silver" ? "Viewing Silver Edition" : "Switch to Silver Menu"}</span>
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* QUICK MENU EDITION SWITCHER PILL */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <div className="inline-flex p-1.5 rounded-full bg-[#181310] border border-white/10 shadow-inner">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenuTab("golden");
                      setIsGoldenMenuOpen(true);
                    }}
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      activeMenuTab === "golden"
                        ? "bg-gradient-to-r from-brass-deep to-brass text-charcoal shadow-md"
                        : "text-soft-cream/70 hover:text-white"
                    }`}
                  >
                    <Crown className="size-3.5" />
                    <span>GOLDEN MENU</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveMenuTab("silver")}
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                      activeMenuTab === "silver"
                        ? "bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 text-slate-900 shadow-md font-extrabold"
                        : "text-soft-cream/70 hover:text-white"
                    }`}
                  >
                    <Sparkles className="size-3.5" />
                    <span>SILVER MENU</span>
                  </button>
                </div>
              </div>

              {/* ============================================================== */}
              {/* TAB 1: GOLDEN MENU CONTENT (PRESERVED EXACTLY AS CREATED)     */}
              {/* ============================================================== */}
              {activeMenuTab === "golden" && (
                <div className="space-y-6 sm:space-y-8 animate-in fade-in-0 slide-in-from-top-3 duration-300">
                  {/* Category Quick Navigation (Fixed in place at top, does not scroll along) */}
                  <div className="py-3 px-4 sm:px-6 rounded-2xl bg-[#140f0c] border border-brass/30 shadow-xs">
                    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="text-[11px] font-bold uppercase tracking-widest text-brass-light/80 flex items-center gap-1.5 shrink-0">
                        <Sparkles className="size-3 text-brass" />
                        <span>Golden Category Jump:</span>
                      </div>

                      {/* Mobile Dropdown (Prevents horizontal overflow on small screens) */}
                      <div className="block sm:hidden w-full">
                        <select
                          value={activeCategory}
                          onChange={(e) => scrollToCategory(e.target.value)}
                          className="w-full rounded-xl bg-[#1a1410] border border-brass/40 px-3.5 py-2 text-xs font-semibold text-soft-cream focus:outline-none focus:border-brass cursor-pointer"
                        >
                          {GOLDEN_MENU_CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id} className="bg-[#1a1410] text-soft-cream">
                              {cat.title} {cat.note ? `(${cat.note})` : ""}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Desktop / Tablet Navigation Pills */}
                      <div className="hidden sm:flex flex-wrap items-center gap-1.5 max-h-24 overflow-y-auto custom-scrollbar py-0.5">
                        {GOLDEN_MENU_CATEGORIES.map((cat) => {
                          const isActive = activeCategory === cat.id;
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => scrollToCategory(cat.id)}
                              className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                                isActive
                                  ? "bg-brass text-charcoal shadow-sm"
                                  : "bg-white/5 hover:bg-brass/20 text-soft-cream/80 hover:text-white border border-brass/20"
                              }`}
                            >
                              {cat.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Complete 20 Categories Grid / Sections */}
                  <div className="space-y-6 sm:space-y-8">
                    {GOLDEN_MENU_CATEGORIES.map((category, idx) => {
                      const foodImg = GOLDEN_CATEGORY_IMAGES[category.id];

                      return (
                        <section
                          key={category.id}
                          id={`cat-${category.id}`}
                          className="rounded-2xl sm:rounded-3xl border border-brass/30 bg-[#15110d] overflow-hidden shadow-card scroll-mt-6 transition-all hover:border-brass/60 group"
                        >
                          {/* Section Start Image Banner with Clean Section Text */}
                          {foodImg && (
                            <div className="relative h-44 sm:h-56 md:h-64 w-full overflow-hidden border-b border-brass/25 bg-black">
                              <img
                                src={foodImg}
                                alt={`${category.title} royal banquet spread at Shah Junction Villa`}
                                className="size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                loading="lazy"
                              />
                              {/* Cinematic Golden Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#15110d] via-[#15110d]/40 to-transparent" />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

                              {/* Top Glass Badges */}
                              <div className="absolute top-3.5 sm:top-4 inset-x-3.5 sm:inset-x-5 flex items-center justify-between pointer-events-none">
                                <span className="flex size-7 sm:size-8 items-center justify-center rounded-full bg-black/65 backdrop-blur-md border border-brass/50 text-brass text-xs font-bold shadow-md">
                                  {idx + 1}
                                </span>
                                {category.note && (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-brass/40 text-brass-light text-[11px] sm:text-xs font-semibold shadow-md">
                                    <Info className="size-3 text-brass shrink-0" />
                                    <span>{category.note}</span>
                                  </span>
                                )}
                              </div>

                              {/* Bottom Section Title & Clean Details */}
                              <div className="absolute bottom-3.5 sm:bottom-4 inset-x-3.5 sm:inset-x-6 text-white">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brass/25 backdrop-blur-md border border-brass/45 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brass-light shadow-xs">
                                    <Sparkles className="size-2.5 text-brass" />
                                    <span>Royal Golden Selection</span>
                                  </span>
                                  {category.punjabiTitle && (
                                    <span className="font-gurmukhi text-xs text-brass-light/80 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-brass/20">
                                      {category.punjabiTitle}
                                    </span>
                                  )}
                                </div>
                                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-wide text-white drop-shadow-md mt-1">
                                  {category.title}
                                </h3>
                              </div>
                            </div>
                          )}

                          {/* Section Body */}
                          <div className="p-4 sm:p-6 lg:p-7">
                            {/* Fallback Header if no image */}
                            {!foodImg && (
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-brass/20">
                                <div className="flex items-center gap-3">
                                  <span className="flex size-7 sm:size-8 items-center justify-center rounded-full bg-brass/15 border border-brass/40 text-brass text-xs font-bold">
                                    {idx + 1}
                                  </span>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h3 className="font-display text-xl sm:text-2xl font-bold tracking-wide text-white">
                                        {category.title}
                                      </h3>
                                      {category.punjabiTitle && (
                                        <span className="font-gurmukhi text-xs text-brass-light/70 hidden sm:inline">
                                          {category.punjabiTitle}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {category.note && (
                                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brass/15 border border-brass/35 text-brass-light text-xs font-semibold self-start sm:self-auto">
                                    <Info className="size-3 text-brass shrink-0" />
                                    <span>{category.note}</span>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Flat Items List (if category has direct items) */}
                            {category.items && category.items.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {category.items.map((item, itemIdx) => (
                                  <div
                                    key={itemIdx}
                                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-brass/15 hover:border-brass/40 transition-colors"
                                  >
                                    <span className="text-brass text-xs">✦</span>
                                    <span className="text-xs sm:text-sm text-soft-cream/90 font-medium font-sans">
                                      {item}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Subsections (for categories like Breakfast Veg/Non-Veg, Snacks Indian/Roasted/Chinese, etc.) */}
                            {category.subSections && category.subSections.length > 0 && (
                              <div className="space-y-5">
                                {category.subSections.map((sub, subIdx) => (
                                  <div key={subIdx} className="space-y-3 pt-3 first:pt-0 border-t first:border-t-0 border-brass/15">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-brass flex items-center gap-2">
                                        <span className="size-1.5 rounded-full bg-brass" />
                                        <span>{sub.title}</span>
                                      </h4>
                                      {sub.note && (
                                        <span className="text-[11px] font-semibold text-brass-light/80 bg-brass/10 px-2.5 py-0.5 rounded-full border border-brass/25">
                                          {sub.note}
                                        </span>
                                      )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                      {sub.items.map((item, itemIdx) => (
                                        <div
                                          key={itemIdx}
                                          className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-brass/15 hover:border-brass/40 transition-colors"
                                        >
                                          <span className="text-brass text-xs">✦</span>
                                          <span className="text-xs sm:text-sm text-soft-cream/90 font-medium font-sans">
                                            {item}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </section>
                      );
                    })}
                  </div>

                  {/* Bottom Note & Quality Assurance */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-brass/15 via-brass/10 to-transparent border border-brass/35 text-center space-y-2">
                    <Crown className="size-6 text-brass mx-auto" />
                    <h4 className="font-display text-lg sm:text-xl font-bold text-white tracking-wide">
                      Crafted With Authentic Royal Care
                    </h4>
                    <p className="text-xs sm:text-sm text-soft-cream/80 max-w-xl mx-auto font-sans leading-relaxed">
                      Every dish is prepared using pure ingredients, authentic Punjabi spices, and flawless palace hygiene for your memorable celebration at Shah Junction Villa.
                    </p>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* TAB 2: SILVER MENU CONTENT (SILVER/CHROME/WHITE EDITION)       */}
              {/* ============================================================== */}
              {activeMenuTab === "silver" && <SilverMenuView />}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
