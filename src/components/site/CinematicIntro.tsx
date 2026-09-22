import { useEffect, useRef, useCallback } from "react";
import logoPng from "@/assets/shah-junction-villa-logo.png";
import shahiVillaReal from "@/assets/shahi-villa-real.jpg";

interface CinematicIntroProps {
  introState: "playing" | "fading" | "finished";
  setIntroState: (state: "playing" | "fading" | "finished") => void;
}

/**
 * Shah Junction Villa — Ultra-Professional Luxury Brand Film Intro
 *
 * Sequence:
 * 1. Authentic Palace Venue Background:
 *    The marriage palace photo (shahiVillaReal) is directly rendered in the intro
 *    with 1:1 pixel-perfect alignment to the hero section underneath.
 *
 * 2. Logo Emerges in the Sky (0.25s - 1.45s):
 *    In the twilight sky above the palace roofline, the Royal Filigree SJ Monogram
 *    and Shah Junction Villa logo gracefully emerge with buttery smoothness.
 *
 * 3. Studio Metallic Light Sweep (1.6s - 2.6s):
 *    A delicate studio light sheen glides across the gold metal letterforms.
 *
 * 4. 100% Seamless 1200ms Crossfade Transition (3.0s - 4.2s):
 *    Because both layers share identical static image coordinates, the dark cinema
 *    overlay and intro dissolve with zero ghosting or blur.
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

    // After 1200ms ultra-smooth crossfade, complete intro and restore scrolling
    const t = setTimeout(() => {
      setIntroState("finished");
      document.body.style.overflow = "";
    }, 1200);
    timerRef.current.push(t);
  }, [clearTimers, setIntroState]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIntroState("finished");
      return;
    }

    // Lock scrolling while intro is active
    document.body.style.overflow = "hidden";

    // Trigger smooth crossfade into homepage at 3.0s
    const fadeTimer = setTimeout(() => {
      handleDismiss();
    }, 3000);
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

  const isFading = introState === "fading";  return (
    <div
      id="shah-cinematic-intro"
      aria-label="Shah Junction Villa Brand Film Opening"
      role="region"
      aria-hidden={isFading ? "true" : "false"}
      onClick={handleDismiss}
      onTouchEnd={handleDismiss}
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-start overflow-hidden select-none bg-[#050403] w-full h-[100dvh] min-h-[100dvh] pt-[max(env(safe-area-inset-top,0px),1.25rem)] sm:pt-8 md:pt-10 lg:pt-12 cursor-pointer touch-manipulation ${
        isFading ? "is-fading pointer-events-none" : ""
      }`}
    >
      {/* 1. Authentic Shahi Junction Villa Palace Background (1:1 Pixel-Perfect Match with Hero) */}
      <div className="absolute inset-0 size-full overflow-hidden pointer-events-none">
        <img
          src={shahiVillaReal}
          alt="Shahi Junction Villa — Grand illuminated marriage palace"
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className="size-full object-cover object-[center_40%]"
        />
      </div>

      {/* 2. Cinema Atmosphere & Luxury Dark Overlay over the authentic venue photo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 32%, rgba(8, 7, 6, 0.45) 0%, rgba(5, 4, 3, 0.68) 52%, rgba(3, 2, 2, 0.90) 100%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_160px_rgba(0,0,0,0.75)]" />

      {/* 3. Logo Layer: Positioned proudly in the sky above the palace roofline */}
      <div className="intro-logo-container relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-xl mx-auto will-change-transform transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div
          className="relative flex items-center justify-center w-[72vw] max-w-[210px] sm:max-w-[270px] md:max-w-[330px] lg:max-w-[370px] aspect-[4/3] will-change-transform"
          style={{
            animation: "intro-logo-subtle-hold 4.0s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards",
          }}
        >
          {/* Volumetric Warm Golden Ambient Backlight centered behind the logo in the sky */}
          <div
            className="absolute -inset-6 sm:-inset-10 md:-inset-14 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(212, 175, 55, 0.28) 0%, rgba(185, 135, 45, 0.12) 45%, rgba(120, 80, 20, 0.01) 70%, transparent 80%)",
              animation: "intro-bg-glow-pulse 4.5s ease-in-out infinite alternate",
            }}
          />

          {/* Main Logo Image (Gracefully emerges in the sunset sky above the illuminated marriage palace) */}
          <img
            src={logoPng}
            alt="Shah Junction Villa"
            className="relative z-10 w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_6px_20px_rgba(0,0,0,0.92)] drop-shadow-[0_0_16px_rgba(212,175,55,0.28)]"
            loading="eager"
            decoding="sync"
            style={{
              animation: "intro-logo-smooth-emerge 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both",
            }}
          />

          {/* Realistic Metallic Gold Light Sweep (1.6s - 2.6s) */}
          <div
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden mix-blend-screen"
            style={{
              maskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, black 50%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 50%, black 50%, transparent 95%)",
            }}
          >
            <div
              className="w-[45%] h-full bg-gradient-to-r from-transparent via-[#fff5d0]/50 to-transparent will-change-transform"
              style={{
                animation: "intro-metallic-glint-clean 1.0s cubic-bezier(0.16, 1, 0.3, 1) 1.6s both",
              }}
            />
          </div>
        </div>
      </div>

      {/* 4. Elegant Subtle Skip Button (Optimized for Mobile Touch) */}
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
        aria-label="Skip intro animation and view website"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[1000000] group inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full border border-white/20 bg-black/60 hover:bg-black/85 hover:border-[#dfb76c]/70 text-[9px] sm:text-[11px] font-sans font-medium tracking-[0.22em] uppercase text-white/70 hover:text-white transition-all duration-300 backdrop-blur-lg shadow-[0_4px_24px_rgba(0,0,0,0.6)] active:scale-95 cursor-pointer touch-manipulation"
        style={{
          marginBottom: "max(0px, env(safe-area-inset-bottom))",
          marginRight: "max(0px, env(safe-area-inset-right))",
          animation: "intro-skip-clean-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both",
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
