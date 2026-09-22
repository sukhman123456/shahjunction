import shahiVillaReal from "@/assets/shahi-villa-real.jpg";
import { useBooking } from "@/context/BookingContext";
import { cn } from "@/lib/utils";

interface HeroProps {
  introState?: "playing" | "fading" | "finished";
}

export function Hero({ introState = "finished" }: HeroProps) {
  const { openBookingModal } = useBooking();
  const isIntroPlaying = introState === "playing";
  const isIntroFading = introState === "fading";

  return (
    <section
      id="home"
      className="relative flex h-[100dvh] min-h-[560px] w-full items-start justify-center overflow-hidden bg-[#0c1420] text-on-dark"
    >
      {/* 1. Authentic Shahi Junction Villa Hero Image (Single Live Source of Truth) */}
      <div className="absolute inset-0 size-full overflow-hidden pointer-events-none">
        <img
          src={shahiVillaReal}
          alt="Shahi Junction Villa — Grand illuminated marriage palace with twin domes, royal crimson marquee, chandeliers and sunset sky in Punjab"
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className="size-full object-cover object-[center_40%]"
        />
      </div>

      {/* 2. Soft Natural Contrast Overlay: Subtle top vignette for crystal clear navigation & text */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 via-black/15 to-transparent"
        aria-hidden="true"
      />

      {/* 4. Right Side Artistic Watermark (Desktop Only) */}
      <div
        className={cn(
          "hidden lg:flex absolute right-8 xl:right-12 top-[55%] xl:top-[58%] z-20 flex-col items-end text-right pointer-events-none select-none transition-opacity duration-1000 ease-out",
          isIntroPlaying && "opacity-0",
          isIntroFading && "opacity-100 duration-1200 delay-200",
        )}
        aria-hidden="true"
      >
        <p className="font-script text-xl xl:text-2xl text-[#dfb76c] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] leading-tight">
          More Than<br />
          A Venue,<br />
          A Feeling
        </p>
        <span className="h-px w-10 bg-[#dfb76c]/60 mt-1.5" />
      </div>

      {/* 5. Clean, Streamlined Sky Text Block */}
      <div
        className={cn(
          "container-site relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center px-4 sm:px-6 pt-[max(env(safe-area-inset-top,0px),4.25rem)] sm:pt-18 lg:pt-14 xl:pt-16 transition-all duration-1000 ease-out",
          isIntroPlaying && "opacity-0 pointer-events-none translate-y-3",
          isIntroFading && "opacity-100 translate-y-0 duration-1200 delay-150",
        )}
      >
        {/* Step 1: “WELCOME TO” */}
        <div className="hero-anim-welcome inline-flex items-center gap-2.5 sm:gap-3 text-brass-light">
          <span className="h-px w-6 sm:w-12 bg-brass-light/70 shadow-sm" aria-hidden="true" />
          <span className="text-[0.6rem] sm:text-xs font-semibold tracking-[0.42em] sm:tracking-[0.55em] uppercase text-brass-light drop-shadow-sm">
            WELCOME TO
          </span>
          <span className="h-px w-6 sm:w-12 bg-brass-light/70 shadow-sm" aria-hidden="true" />
        </div>

        {/* Step 2: Main Heading */}
        <h1 className="mt-1 sm:mt-1.5 hero-anim-heading font-display text-2xl sm:text-4xl lg:text-[2.65rem] xl:text-[3.15rem] font-bold uppercase tracking-[0.1em] sm:tracking-[0.14em] text-white leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] break-words">
          <span className="block sm:inline">SHAHI </span>
          <span className="block sm:inline">JUNCTION VILLA</span>
        </h1>

        {/* Step 3: Subheading in luxury calligraphy script */}
        <p className="mt-0.5 sm:mt-1 hero-anim-sub font-script text-lg sm:text-2xl lg:text-[1.85rem] text-[#dfb76c] tracking-wide leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Where Every Celebration Becomes a Memory
        </p>

        {/* Step 4: Streamlined Action Buttons */}
        <div className="mt-3 sm:mt-4 hero-anim-buttons flex items-center justify-center gap-3 sm:gap-4 w-auto">
          {/* Button 1: Deep Maroon/Crimson Pill */}
          <button
            type="button"
            onClick={() => openBookingModal()}
            className="group inline-flex h-9 sm:h-10 items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-[#a82534]/60 bg-gradient-to-r from-[#6b0f1a] via-[#851422] to-[#590a13] px-5 sm:px-7 text-[0.68rem] sm:text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_4px_18px_rgba(100,10,20,0.55)] transition-all duration-300 hover:from-[#7d121f] hover:via-[#961727] hover:to-[#6b0d18] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>BOOK YOUR EVENT</span>
            <span className="text-xs font-light transition-transform duration-300 group-hover:translate-x-1">›</span>
          </button>

          {/* Button 2: Translucent Frosted Glass Pill */}
          <a
            href="#reservations"
            className="group inline-flex h-9 sm:h-10 items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-white/60 bg-white/10 backdrop-blur-xs px-5 sm:px-7 text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md transition-all duration-300 hover:bg-white/20 hover:border-brass-light hover:text-brass-light hover:scale-105 active:scale-95"
          >
            <span>CHECK DATES</span>
            <span className="text-xs font-light transition-transform duration-300 group-hover:translate-x-1">›</span>
          </a>
        </div>
      </div>

      {/* 6. Scroll Indicator */}
      <a
        href="#about"
        aria-label="Scroll to explore Shahi Junction Villa"
        className={cn(
          "hero-anim-scroll absolute bottom-3 sm:bottom-4 inset-x-0 mx-auto w-fit z-20 flex flex-col items-center gap-0.5 text-white/80 hover:text-brass-light transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]",
          isIntroPlaying && "opacity-0 pointer-events-none",
          isIntroFading && "opacity-100 duration-1200 delay-300",
        )}
      >
        <span className="text-[0.56rem] sm:text-[0.6rem] font-medium tracking-[0.3em] uppercase">
          SCROLL TO EXPLORE
        </span>
        <svg
          className="size-3 sm:size-3.5 animate-[scroll-hint_2.2s_ease-in-out_infinite]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </section>
  );
}
