import { useEffect } from "react";
import logoSjMonogram from "@/assets/logo-sj-monogram.png";
import logoShahJunctionText from "@/assets/logo-shah-junction-text.png";
import logoVillaText from "@/assets/logo-villa-text.png";

interface CinematicIntroProps {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Accessibility check: immediately skip if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Sequence schedule:
    // 0.0s - 0.7s: Solid black screen anticipation
    // 0.7s - 2.2s: SJ reaches full visibility & 100% scale (97% -> 100%)
    // 2.2s - 2.6s: SJ holds solo (0.4s hold)
    // 2.6s - 3.9s: SHAH JUNCTION emerges from center and expands horizontally
    // 3.9s - 4.1s: Brief pause (0.2s)
    // 4.1s - 4.8s: VILLA subtle fade + slight upward movement
    // 4.8s - 5.7s: Final complete logo lockup hold (0.9s hold)
    // 5.7s - 6.55s: Smooth cinematic fade out of black overlay -> existing homepage revealed
    // 6.6s: Fully unmount intro overlay
    const timer = setTimeout(() => {
      onComplete();
    }, 6600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <aside
      aria-label="Shah Junction Villa Minimal Logo Intro"
      className="minimal-intro-exit fixed inset-0 z-[100] flex size-full items-center justify-center overflow-hidden bg-black select-none"
    >
      {/* =====================================================================
          Central Minimal Logo Lockup
          100% Solid Deep Black Background — No gradients, no particles, no frames
          ===================================================================== */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-lg w-full">
        {/* Phase 1: SJ Monogram (Emerges smoothly from 97% to 100% scale, blur-to-sharp) */}
        <div className="relative flex items-center justify-center">
          <img
            src={logoSjMonogram}
            alt="Shah Junction Villa Monogram"
            width={441}
            height={383}
            fetchPriority="high"
            className="minimal-sj-anim w-36 sm:w-44 md:w-48 h-auto object-contain"
          />
        </div>

        {/* Phase 2: Text emerges from SJ and horizontally expands outward */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* SHAH JUNCTION Wordmark */}
          <div className="mt-3.5 sm:mt-4 flex items-center justify-center">
            <img
              src={logoShahJunctionText}
              alt="Shah Junction"
              width={674}
              height={89}
              className="minimal-shah-junction-anim w-64 sm:w-80 md:w-88 h-auto object-contain"
            />
          </div>

          {/* VILLA Wordmark (Slightly smaller, refined luxury spacing) */}
          <div className="mt-2 sm:mt-2.5 flex items-center justify-center">
            <img
              src={logoVillaText}
              alt="Villa"
              width={294}
              height={46}
              className="minimal-villa-anim w-20 sm:w-26 md:w-28 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
