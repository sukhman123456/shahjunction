import { useState } from "react";
import {
  Sparkles,
  Info,
  ShieldCheck,
} from "lucide-react";
import { SILVER_MENU_CATEGORIES } from "@/lib/silverMenuData";
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

// Dedicated authentic food photography mapping for every one of the 20 categories
const CATEGORY_FOOD_IMAGES: Record<string, string> = {
  welcome: menuDrinks,
  breakfast: menuBreakfast,
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
  "non-veg-main-course": menuChicken,
  chapati: galleryNaan,
  "hot-desserts": menuHotDesserts,
  "cold-desserts": menuColdDesserts,
};

export function SilverMenuView() {
  const [activeCategory, setActiveCategory] = useState<string>("welcome");

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`silver-cat-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in-0 duration-300">
      {/* Category Quick Navigation (Fixed in place at top, does not scroll along) */}
      <div className="py-3 px-4 sm:px-6 rounded-2xl bg-white border-2 border-slate-300/80 shadow-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-700 flex items-center gap-1.5 shrink-0">
            <span className="text-slate-400">❖</span>
            <span>Silver Category Jump:</span>
          </div>

          {/* Mobile Dropdown (No horizontal scrollbar!) */}
          <div className="block sm:hidden w-full">
            <select
              value={activeCategory}
              onChange={(e) => scrollToCategory(e.target.value)}
              className="w-full rounded-xl bg-white border-2 border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs focus:outline-none focus:border-slate-500 cursor-pointer"
            >
              {SILVER_MENU_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id} className="text-slate-800 bg-white">
                  {cat.title} {cat.note ? `(${cat.note})` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop / Tablet Navigation Pills */}
          <div className="hidden sm:flex flex-wrap items-center gap-1.5 max-h-24 overflow-y-auto custom-scrollbar py-0.5">
            {SILVER_MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => scrollToCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white shadow-sm scale-102"
                      : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-300"
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 20 Categories Grid (White / Ivory / Light Grey with Metallic Silver theme) */}
      <div className="space-y-6 sm:space-y-8">
        {SILVER_MENU_CATEGORIES.map((category, idx) => {
          const foodImg = CATEGORY_FOOD_IMAGES[category.id];

          return (
            <section
              key={category.id}
              id={`silver-cat-${category.id}`}
              className="rounded-2xl sm:rounded-3xl border-2 border-slate-300/80 bg-white overflow-hidden shadow-[0_10px_30px_-10px_rgba(148,163,184,0.2)] scroll-mt-6 transition-all hover:border-slate-400 group"
            >
              {/* Section Start Image Banner with Clean Section Text */}
              {foodImg && (
                <div className="relative h-44 sm:h-56 md:h-64 w-full overflow-hidden border-b-2 border-slate-200 bg-slate-900">
                  <img
                    src={foodImg}
                    alt={`${category.title} catering spread at Shah Junction Villa`}
                    className="size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle Silver-Slate Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/35 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/20" />

                  {/* Top Glass Badges */}
                  <div className="absolute top-3.5 sm:top-4 inset-x-3.5 sm:inset-x-5 flex items-center justify-between pointer-events-none">
                    <span className="flex size-7 sm:size-8 items-center justify-center rounded-full bg-slate-900/75 backdrop-blur-md border border-slate-300/60 text-slate-100 text-xs font-bold shadow-md">
                      {idx + 1}
                    </span>
                    {category.note && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-300/50 text-slate-100 text-[11px] sm:text-xs font-semibold shadow-md">
                        <Info className="size-3 text-slate-300 shrink-0" />
                        <span>{category.note}</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Section Title & Clean Details */}
                  <div className="absolute bottom-3.5 sm:bottom-4 inset-x-3.5 sm:inset-x-6 text-white">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-200/20 backdrop-blur-md border border-slate-300/40 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-100 shadow-xs">
                        <Sparkles className="size-2.5 text-slate-300" />
                        <span>Silver Selection · {category.visualTag}</span>
                      </span>
                      {category.punjabiTitle && (
                        <span className="font-gurmukhi text-xs text-slate-200 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/10">
                          {category.punjabiTitle}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-md mt-1">
                      {category.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* Section Body */}
              <div className="p-4 sm:p-6 lg:p-7">
                {/* Direct Food Items List */}
                {category.items && category.items.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                    {category.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="p-3.5 rounded-xl bg-[#f8fafc] hover:bg-slate-100/90 border border-slate-200/90 transition-all shadow-xs flex flex-col justify-center"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="text-slate-500 text-xs mt-0.5 shrink-0">❖</span>
                          <div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-800 font-sans block leading-snug">
                              {item.name}
                            </span>
                            {item.details && (
                              <span className="text-[11px] text-slate-500 font-medium block mt-1 leading-tight">
                                {item.details}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Subsections (VEG., NON-VEG., INDIAN, ROASTED, CHINESE, etc.) */}
                {category.subSections && category.subSections.length > 0 && (
                  <div className="space-y-6">
                    {category.subSections.map((sub, subIdx) => (
                      <div
                        key={subIdx}
                        className="space-y-3 pt-4 first:pt-0 border-t first:border-t-0 border-slate-200"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-slate-800 flex items-center gap-2">
                            <span className="size-2 rounded-full bg-slate-500" />
                            <span>{sub.title}</span>
                          </h4>
                          {sub.note && (
                            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-300">
                              {sub.note}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                          {sub.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="p-3.5 rounded-xl bg-[#f8fafc] hover:bg-slate-100/90 border border-slate-200/90 transition-all shadow-xs flex flex-col justify-center"
                            >
                              <div className="flex items-start gap-2.5">
                                <span className="text-slate-500 text-xs mt-0.5 shrink-0">❖</span>
                                <div>
                                  <span className="text-xs sm:text-sm font-semibold text-slate-800 font-sans block leading-snug">
                                    {item.name}
                                  </span>
                                  {item.details && (
                                    <span className="text-[11px] text-slate-500 font-medium block mt-1 leading-tight">
                                      {item.details}
                                    </span>
                                  )}
                                </div>
                              </div>
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

      {/* Silver Edition Royal Footer Commitment */}
      <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-100 via-white to-slate-100 border-2 border-slate-300 text-center space-y-2.5 shadow-sm">
        <div className="flex size-10 items-center justify-center rounded-full bg-slate-200 border border-slate-300 text-slate-700 mx-auto">
          <ShieldCheck className="size-5" />
        </div>
        <h4 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Silver Edition Palace Standards
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-sans leading-relaxed">
          The Silver Menu offers a complete, elegant selection crafted with authentic ingredients, live banquet counters, and attentive royal service for your celebration.
        </p>
      </div>
    </div>
  );
}
