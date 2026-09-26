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
} from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { GOLDEN_MENU_CATEGORIES, type GoldenMenuCategory } from "@/lib/goldenMenuData";

export function DigitalMenuModal() {
  const { isDigitalMenuOpen, closeDigitalMenu } = useBooking();
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
          <Dialog.Title className="sr-only">Digital Menu - Shah Junction Villa</Dialog.Title>

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
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-12 py-6 sm:py-8 space-y-6 sm:space-y-8 custom-scrollbar">
            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
              {/* Intro Banner */}
              <div id="digital-menu-description" className="text-center max-w-2xl mx-auto space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brass/15 border border-brass/40 text-brass-light text-[11px] font-semibold tracking-widest uppercase">
                  <Sparkles className="size-3 text-brass" />
                  <span>ROYAL BANQUET SELECTIONS · ਸ਼ਾਹੀ ਮੈਨਿਊ</span>
                </span>
                <p className="text-xs sm:text-sm text-soft-cream/70 font-sans">
                  Explore our authentic banquet and wedding culinary offerings. Recreated in full digital detail for your celebration planning.
                </p>
              </div>

              {/* 
                MAIN MENU OPTION: GOLDEN MENU
                Displayed prominently at top of the Digital Menu screen
              */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setIsGoldenMenuOpen((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsGoldenMenuOpen((prev) => !prev);
                  }
                }}
                className="group relative cursor-pointer select-none rounded-2xl sm:rounded-3xl border-2 border-brass bg-gradient-to-r from-[#211a14] via-[#1a1410] to-[#211a14] p-5 sm:p-7 shadow-[0_12px_40px_-10px_rgba(202,168,106,0.35)] transition-all duration-300 hover:border-brass-light hover:shadow-[0_16px_50px_-8px_rgba(202,168,106,0.5)]"
              >
                {/* Background Shimmer & Glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(202,168,106,0.18)_0,transparent_70%)] rounded-2xl sm:rounded-3xl" />
                <div className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brass to-transparent opacity-80" />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                    <div className="flex size-13 sm:size-15 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brass-deep via-brass to-brass-light text-charcoal shadow-md">
                      <Crown className="size-7 sm:size-8" strokeWidth={1.8} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-brass/25 border border-brass/50 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-brass-light">
                          MAIN MENU OPTION
                        </span>
                        <span className="text-xs text-brass-light/70 font-gurmukhi">
                          ਸ਼ਾਹੀ ਗੋਲਡਨ ਮੈਨਿਊ
                        </span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide text-white mt-1 group-hover:text-brass-light transition-colors">
                        GOLDEN MENU
                      </h2>
                      <p className="text-xs sm:text-sm text-soft-cream/80 font-sans mt-0.5">
                        Complete Wedding & Grand Banquet Catering Selection (20 Curated Categories)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-brass-light">
                      {isGoldenMenuOpen ? "Hide Complete Menu" : "Open Complete Menu"}
                    </span>
                    <div className="flex size-9 items-center justify-center rounded-full bg-brass/20 border border-brass/40 text-brass-light group-hover:bg-brass group-hover:text-charcoal transition-all">
                      {isGoldenMenuOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* COMPLETE GOLDEN MENU CONTENT */}
              {isGoldenMenuOpen && (
                <div className="space-y-6 sm:space-y-8 animate-in fade-in-0 slide-in-from-top-3 duration-300">
                  {/* Category Quick Navigation */}
                  <div className="sticky top-0 z-10 py-3 -mx-3 sm:-mx-6 lg:-mx-12 px-3 sm:px-6 lg:px-12 bg-[#0d0a08]/95 backdrop-blur-md border-y border-brass/20">
                    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="text-[11px] font-bold uppercase tracking-widest text-brass-light/80 flex items-center gap-1.5 shrink-0">
                        <Sparkles className="size-3 text-brass" />
                        <span>Jump to Category:</span>
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
                    {GOLDEN_MENU_CATEGORIES.map((category, idx) => (
                      <section
                        key={category.id}
                        id={`cat-${category.id}`}
                        className="rounded-2xl sm:rounded-3xl border border-brass/30 bg-[#15110d] p-5 sm:p-7 lg:p-8 shadow-card scroll-mt-28"
                      >
                        {/* Category Header */}
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

                        {/* Flat Items List (if category has direct items) */}
                        {category.items && category.items.length > 0 && (
                          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                          <div className="mt-5 space-y-5">
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
                      </section>
                    ))}
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
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
