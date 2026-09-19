import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Send, Sparkles, Users, CheckCircle2 } from "lucide-react";
import { venueSpaces } from "@/lib/venue";
import { Reveal } from "./Reveal";

export function VenueShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSpace = venueSpaces[activeIdx] || venueSpaces[0];

  const nextSpace = () => setActiveIdx((prev) => (prev + 1) % venueSpaces.length);
  const prevSpace = () => setActiveIdx((prev) => (prev - 1 + venueSpaces.length) % venueSpaces.length);

  return (
    <section id="venue" className="relative overflow-hidden bg-[#090f1a] py-20 sm:py-28 lg:py-36 text-on-dark">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 size-[650px] bg-brass/10 blur-[130px] rounded-full opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(var(--color-brass)_1px,transparent_1px)] [background-size:32px_32px]"
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        {/* Editorial Section Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 text-brass-light font-semibold tracking-[0.32em] text-[0.68rem] sm:text-xs uppercase">
            <Sparkles className="size-3.5 text-brass-light" />
            <span>PALACE ARCHITECTURE & SPACES</span>
            <Sparkles className="size-3.5 text-brass-light" />
          </div>

          <h2 className="mt-3 font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[1.08]">
            DISTINCT SPACES FOR <br />
            <span className="font-script lowercase text-[#dfb76c] text-4xl sm:text-6xl lg:text-7xl font-normal tracking-normal capitalize drop-shadow-md">
              Royal Celebrations
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            Explore each signature zone of Shahi Junction Villa — from the soaring cove-lit ballroom to open-air royal shamiana marquees and enchanting jaimala walkway.
          </p>
        </Reveal>

        {/* Interactive Space Navigation Tabs */}
        <Reveal delay={80} className="mt-10 sm:mt-12 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
            {venueSpaces.map((space, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`relative inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-brass/30 via-brass/20 to-brass/10 border border-brass text-white shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-[1.03]"
                      : "text-white/60 hover:text-white hover:bg-white/[0.05] border border-transparent"
                  }`}
                >
                  <span className={`text-[0.65rem] font-mono font-bold ${isActive ? "text-brass-light" : "text-white/40"}`}>
                    0{idx + 1}
                  </span>
                  <span>{space.title.replace("The ", "")}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Featured Cinematic Showcase Card (Split-Screen) */}
        {activeSpace && (
          <Reveal delay={120} className="mt-8 sm:mt-10">
            <div className="relative grid lg:grid-cols-12 gap-0 overflow-hidden rounded-sm border border-brass/40 bg-[#0f1726]/90 shadow-[0_24px_70px_rgba(0,0,0,0.7)] backdrop-blur-md">
              {/* Left Wing: Cinematic Large Photograph */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-auto lg:col-span-7 w-full overflow-hidden bg-black/50">
                <img
                  key={activeSpace.id}
                  src={activeSpace.image}
                  alt={activeSpace.title}
                  style={{ objectPosition: activeSpace.focusPosition || "center center" }}
                  className="size-full object-cover animate-in fade-in-0 duration-700 transition-transform duration-1000 hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0f1726] via-transparent to-black/30 opacity-80"
                  aria-hidden="true"
                />

                {/* Floating Top Category Pill */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-brass/40 bg-black/85 px-3.5 py-1 text-[0.68rem] sm:text-xs font-semibold tracking-wider text-brass uppercase backdrop-blur-md shadow-md">
                  <Sparkles className="size-3 text-brass" />
                  <span>{activeSpace.subtitle}</span>
                </div>

                {/* Floating Capacity Pill */}
                {activeSpace.capacity && (
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/80 px-3.5 py-1 text-[0.7rem] sm:text-xs font-medium tracking-wide text-white/90 backdrop-blur-md shadow-md">
                    <Users className="size-3.5 text-brass-light" />
                    <span>{activeSpace.capacity}</span>
                  </div>
                )}

                {/* Next / Prev Quick Controls */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSpace}
                    aria-label="Previous space"
                    className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white/80 backdrop-blur-md transition-all duration-300 hover:border-brass hover:text-brass active:scale-95"
                  >
                    <ChevronLeft className="size-4 sm:size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSpace}
                    aria-label="Next space"
                    className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white/80 backdrop-blur-md transition-all duration-300 hover:border-brass hover:text-brass active:scale-95"
                  >
                    <ChevronRight className="size-4 sm:size-5" />
                  </button>
                </div>
              </div>

              {/* Right Wing: Luxury Editorial Content */}
              <div className="relative flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 lg:col-span-5 bg-gradient-to-b from-[#111a2c] to-[#0d1422]">
                {/* Subtle Background Watermark Number */}
                <span
                  className="pointer-events-none absolute right-4 top-2 select-none font-display text-[8rem] sm:text-[10rem] font-bold leading-none text-white/[0.02]"
                  aria-hidden="true"
                >
                  0{activeIdx + 1}
                </span>

                <div>
                  <div className="flex items-center justify-between text-xs tracking-[0.25em] text-brass-light uppercase font-semibold">
                    <span>SPACE 0{activeIdx + 1} OF 0{venueSpaces.length}</span>
                    <span className="text-white/40 font-mono">SHAHI JUNCTION</span>
                  </div>

                  <h3 className="mt-2.5 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                    {activeSpace.title}
                  </h3>

                  {activeSpace.ambience && (
                    <p className="mt-1 font-script text-lg sm:text-xl text-[#dfb76c] tracking-wide">
                      ✦ {activeSpace.ambience}
                    </p>
                  )}

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/75">
                    {activeSpace.description}
                  </p>

                  {/* Curated Feature Grid */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-t border-white/10 pt-5">
                    {activeSpace.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                        <CheckCircle2 className="size-3.5 text-brass-light shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href="#enquiry"
                    className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#a82534]/70 bg-gradient-to-r from-[#7a121f] via-[#941727] to-[#6b0f1a] px-6 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_4px_18px_rgba(100,10,20,0.55)] transition-all duration-300 hover:from-[#8f1525] hover:via-[#a81a2c] hover:scale-105 active:scale-95"
                  >
                    <Send className="size-3.5" />
                    <span>ENQUIRE FOR THIS SPACE</span>
                  </a>
                  <a
                    href="#gallery"
                    className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-xs px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 transition-all duration-300 hover:bg-white/15 hover:border-brass hover:text-brass-light"
                  >
                    <span>VIEW GALLERY</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Bottom Interactive Thumbnail Strip: All 4 Spaces At A Glance */}
        <Reveal delay={160} className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {venueSpaces.map((space, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={space.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`group relative flex flex-col text-left overflow-hidden rounded-sm border transition-all duration-300 ${
                  isSelected
                    ? "border-brass bg-[#131d2e] shadow-[0_8px_30px_rgba(212,175,55,0.2)] -translate-y-1"
                    : "border-white/10 bg-[#0d1422]/80 hover:border-white/30 hover:bg-[#111a2c]"
                }`}
              >
                {/* Active Top Gold Bar */}
                <div
                  className={`h-1 w-full transition-colors duration-300 ${
                    isSelected ? "bg-gradient-to-r from-brass via-brass-light to-brass" : "bg-transparent"
                  }`}
                />

                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  <img
                    src={space.image}
                    alt={space.title}
                    style={{ objectPosition: space.focusPosition || "center center" }}
                    className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <span className="absolute top-2 left-2 rounded-xs bg-black/75 px-2 py-0.5 font-mono text-[0.62rem] font-bold text-brass-light border border-brass/30">
                    0{idx + 1}
                  </span>
                </div>

                <div className="p-3 sm:p-4">
                  <p className="font-display text-xs sm:text-sm font-semibold text-white truncate group-hover:text-brass-light transition-colors">
                    {space.title}
                  </p>
                  <p className="mt-0.5 text-[0.65rem] sm:text-xs text-white/50 truncate">
                    {space.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
