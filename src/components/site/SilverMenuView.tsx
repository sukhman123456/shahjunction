import { useState, useRef } from "react";
import {
  Sparkles,
  Info,
  Coffee,
  Flame,
  Award,
  ShieldCheck,
  Check,
  UtensilsCrossed,
  Wine,
  IceCream,
  Apple,
  Cookie,
  Soup,
  Pizza,
} from "lucide-react";
import { SILVER_MENU_CATEGORIES, type SilverMenuCategory } from "@/lib/silverMenuData";
import {
  menuDrinks,
  menuBreakfast,
  menuSoups,
  menuPizza,
  menuTandoori,
  menuChinese,
  menuChineseNonVeg,
  menuFish,
  menuTandooriChicken,
  menuChicken,
  menuCurries,
  menuRaita,
} from "@/lib/venue";

// Authentic food photography mapping for categories
const CATEGORY_FOOD_IMAGES: Record<string, string> = {
  welcome: menuDrinks,
  breakfast: menuBreakfast,
  soup: menuSoups,
  "coffee-shakes": menuDrinks,
  stalls: menuChinese,
  children: menuPizza,
  "mocktail-bar": menuDrinks,
  "veg-snacks": menuTandoori,
  "non-veg-snacks": menuFish,
  raita: menuRaita,
  "veg-main-course": menuCurries,
  "chinese-thai": menuChineseNonVeg,
  "non-veg-main-course": menuChicken,
  chapati: menuBreakfast,
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
      {/* Category Quick Navigation (Sticky Silver Toolbar) */}
      <div className="sticky top-0 z-20 py-3 -mx-3 sm:-mx-6 lg:-mx-12 px-3 sm:px-6 lg:px-12 bg-[#f8fafc]/95 backdrop-blur-md border-y border-slate-300/80 shadow-xs">
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
              className="rounded-2xl sm:rounded-3xl border-2 border-slate-300/80 bg-white p-5 sm:p-7 lg:p-8 shadow-[0_10px_30px_-10px_rgba(148,163,184,0.2)] scroll-mt-28 transition-all hover:border-slate-400"
            >
              {/* Category Header with Optional Food Visual Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                <div className="flex items-center gap-3.5">
                  <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 border border-slate-400 text-slate-800 font-display text-sm font-bold shadow-xs">
                    {idx + 1}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600">
                        {category.visualTag}
                      </span>
                      {category.punjabiTitle && (
                        <span className="font-gurmukhi text-xs text-slate-500 font-medium">
                          {category.punjabiTitle}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
                      {category.title}
                    </h3>
                  </div>
                </div>

                {category.note && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 border border-slate-300 text-slate-700 text-xs font-semibold shadow-xs self-start md:self-auto">
                    <Info className="size-3.5 text-slate-500 shrink-0" />
                    <span>{category.note}</span>
                  </div>
                )}
              </div>

              {/* Food Visual Thumbnail Strip (If authentic photography is mapped) */}
              {foodImg && (
                <div className="mt-4 mb-5 relative h-28 sm:h-36 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src={foodImg}
                    alt={`${category.title} food spread at Shah Junction Villa`}
                    className="size-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-200 flex items-center gap-1.5 drop-shadow-sm">
                      <Sparkles className="size-3 text-slate-300" />
                      <span>Shah Junction Silver Selection · {category.visualTag}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Direct Food Items List */}
              {category.items && category.items.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                  {category.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-3.5 rounded-xl bg-[#f8fafc] hover:bg-slate-100/80 border border-slate-200/90 transition-all shadow-xs flex flex-col justify-center"
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
                <div className="mt-5 space-y-6">
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
                            className="p-3.5 rounded-xl bg-[#f8fafc] hover:bg-slate-100/80 border border-slate-200/90 transition-all shadow-xs flex flex-col justify-center"
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
