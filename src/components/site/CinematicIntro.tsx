import { useEffect, useRef, useCallback } from "react";
import logoPng from "@/assets/shah-junction-villa-logo.png";
import shahiVillaReal from "@/assets/shahi-villa-real.jpg";

interface CinematicIntroProps {
  introState: "playing" | "fading" | "finished";
  setIntroState: (state: "playing" | "fading" | "finished") => void;
}

/**
 * Shah Junction Villa — Cinematic Camera-Zoom-Out Intro
 *
 * Sequence:
 * 1. Starting Frame — Extreme close-up of upper architectural villa dome & sky (no building text visible, no UI).
 * 2. Cinematic Camera Pull-Back / Zoom-Out — Camera glides backwards, progressively revealing the full villa.
 * 3. Perfect Final Frame — Camera comes to rest at the exact full-screen composition of the homepage.
 * 4. Logo Reveal — Existing SJ logo appears in center with soft opacity + blur-to-sharp.
 * 5. Text Reveal — SHAH JUNCTION / VILLA, followed by WHERE COMFORT MEETS LUXURY.
 * 6. Final Hold — Complete branding holds for ~1.2s to appreciate.
 * 7. Enter Homepage — Smooth cinematic crossfade into live homepage.
 */
export function CinematicIntro({ introState, setIntroState }: CinematicIntroProps) {
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = useCallback(() => {
    timerRef.current.forEach((t) => clearTimeout(t));
    timerRef.current = [];
  }, []);

  const handleDismiss = useCallback(() => {
    clearTimers();
    setIntroState("fading");

    // Smooth cinematic crossfade into homepage
    const t = setTimeout(() => {
      setIntroState("finished");
      document.body.style.overflow = "";
    }, 850);
    timerRef.current.push(t);
  }, [clearTimers, setIntroState]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIntroState("finished");
      return;
    }

    // Lock scrolling while intro is active
    document.body.style.overflow = "hidden";

    // Auto-transition into homepage at 6.7s (finishes around 7.55s)
    const fadeTimer = setTimeout(() => {
      handleDismiss();
    }, 6700);
    timerRef.current.push(fadeTimer);

    return () => {
      clearTimers();
      document.body.style.overflow = "";
    };
  }, [handleDismiss, clearTimers, setIntroState]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (introState === "finished") {
    return null;
  }

  const isFading = introState === "fading";

  return (
    <div
      id="shah-cinematic-intro"
      aria-label="Shah Junction Villa Cinematic Opening"
      role="region"
      aria-hidden={isFading ? "true" : "false"}
      onClick={handleDismiss}
      onTouchEnd={handleDismiss}
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center overflow-hidden select-none bg-black w-full h-[100dvh] min-h-[100dvh] cursor-pointer touch-manipulation transition-opacity duration-850 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isFading ? "is-fading pointer-events-none" : ""
      }`}
    >
      {/* Steps 1, 2, 3: Full-Screen Existing Villa Image with Camera Pull-Back / Zoom-Out */}
      <div className="absolute inset-0 size-full overflow-hidden pointer-events-none">
        <img
          src={shahiVillaReal}
          alt="Shah Junction Villa — Illuminated marriage palace"
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className="size-full object-cover object-[center_40%] will-change-transform intro-camera-pullback"
        />
      </div>

      {/* Contrast Overlay: Subtle during pull-back, soft luxury vignette when branding appears */}
      <div
        className="absolute inset-0 pointer-events-none intro-camera-overlay"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 45%, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.52) 65%, rgba(0, 0, 0, 0.75) 100%)",
        }}
      />

      {/* Subtle Warm Luxury-Gold Ambient Highlight (centered behind branding) */}
      <div
        className="absolute w-[360px] sm:w-[480px] md:w-[560px] aspect-square rounded-full pointer-events-none intro-ambient-highlight"
        style={{
          background:
            "radial-gradient(circle at center, rgba(212, 175, 55, 0.16) 0%, rgba(185, 135, 45, 0.05) 50%, transparent 75%)",
        }}
      />

      {/* Steps 4, 5, 6: Centered branding reveal AFTER camera pull-back settles */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-2xl mx-auto pointer-events-none">
        {/* Step 4: Existing SJ Logo (Soft opacity + blur-to-sharp transition, no box/card) */}
        <div className="intro-logo-reveal relative flex items-center justify-center overflow-hidden h-[120px] sm:h-[150px] md:h-[180px] w-[180px] sm:w-[220px] md:w-[260px] will-change-transform">
          <img
            src={logoPng}
            alt="Shah Junction Villa Logo"
            className="w-full h-full object-contain object-top select-none pointer-events-none"
            loading="eager"
            decoding="sync"
          />
        </div>

        {/* Step 5: Typography revealed underneath (SHAH JUNCTION / VILLA / WHERE COMFORT MEETS LUXURY) */}
        <div className="intro-typography-reveal flex flex-col items-center text-center mt-3 sm:mt-4 md:mt-5 will-change-transform">
          <h1 className="font-display font-normal text-xl sm:text-2xl md:text-3xl lg:text-[2.35rem] tracking-[0.24em] sm:tracking-[0.30em] uppercase text-[#f7edd8] leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            <span className="block">SHAH JUNCTION</span>
            <span className="block font-light text-[#dfb76c] tracking-[0.38em] sm:tracking-[0.44em] mt-0.5 sm:mt-1 text-lg sm:text-xl md:text-2xl lg:text-[2.0rem]">
              VILLA
            </span>
          </h1>
          <p className="mt-2 sm:mt-2.5 text-[0.62rem] sm:text-xs md:text-[0.78rem] font-sans font-medium tracking-[0.38em] sm:tracking-[0.46em] uppercase text-[#dfb76c]/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            WHERE COMFORT MEETS LUXURY
          </p>
        </div>
      </div>

      {/* Discreet Apple-Style Frosted Glass Skip Button (Appears only after camera pull-back) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleDismiss();
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          handleDismiss();
        }}
        aria-label="Skip intro animation"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[1000000] group inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full border border-white/18 bg-black/50 hover:bg-black/80 hover:border-[#dfb76c]/70 text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.22em] uppercase text-white/60 hover:text-white transition-all duration-300 backdrop-blur-md active:scale-95 cursor-pointer touch-manipulation"
        style={{
          marginBottom: "max(0px, env(safe-area-inset-bottom))",
          marginRight: "max(0px, env(safe-area-inset-right))",
          animation: "intro-skip-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 3.8s both",
        }}
      >
        <span>Skip Intro</span>
        <span className="text-[#dfb76c] text-xs transition-transform duration-300 group-hover:translate-x-0.5">
          &rsaquo;
        </span>
      </button>
    </div>
  );
}
