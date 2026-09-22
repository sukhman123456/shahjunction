import { useEffect, useState, useRef, useCallback } from "react";
import fallbackLogoPng from "@/assets/shah-junction-villa-logo.png";

/**
 * Shah Junction Villa - Logo-Matched Motion Graphics Intro
 *
 * Sequence:
 * 0.0s - 0.5s: Darkness & subtle warm golden volumetric backlight behind logo location.
 * 0.5s - 1.4s: Architectural Symbol Build (Real roof contour line-draw, chimney, 4-pane window, villa facade).
 * 1.4s - 2.2s: SJ Monogram Reveal (Actual intertwined S & J emerges in metallic gold).
 * 2.2s - 2.8s: Landscape Details (Actual palm trees & cypress grove rise with golden uplighting).
 * 2.8s - 3.3s: Gold Underline Swoosh (Actual 3D ground ribbon sweeps from left to right).
 * 3.3s - 3.9s: Typography Sequence:
 *   3.30s - 3.55s: "SHAH JUNCTION"
 *   3.55s - 3.75s: "— VILLA —"
 *   3.75s - 3.95s: "WHERE COMFORT MEETS LUXURY"
 * 3.9s - 4.5s: Complete unified logo lock + ONE slow realistic metallic light sweep.
 * 4.5s - 5.4s: Smooth 900ms dissolve crossfade revealing homepage hero.
 *
 * Constraints:
 * - NO generic blueprints or random building drawings.
 * - 100% constructed from the actual uploaded logo.
 * - Replays on EVERY refresh (no localStorage/sessionStorage).
 * - Zero first-paint flash (critical CSS in <head>).
 * - Fully responsive (iPhone, Android, Tablet, Desktop).
 */
export function CinematicIntro() {
  const [stage, setStage] = useState<"playing" | "fading" | "dismissed">("playing");
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = useCallback(() => {
    timerRef.current.forEach((t) => clearTimeout(t));
    timerRef.current = [];
  }, []);

  const handleDismiss = useCallback(() => {
    clearTimers();
    setStage("fading");

    // After 900ms smooth crossfade, fully unmount overlay and restore scrolling
    const t = setTimeout(() => {
      setStage("dismissed");
      document.body.style.overflow = "";
    }, 900);
    timerRef.current.push(t);
  }, [clearTimers]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const t = setTimeout(() => {
        handleDismiss();
      }, 350);
      timerRef.current.push(t);
      return;
    }

    // Lock scrolling while intro is active
    document.body.style.overflow = "hidden";

    // Trigger smooth crossfade into homepage at 4.5s
    const fadeTimer = setTimeout(() => {
      handleDismiss();
    }, 4500);
    timerRef.current.push(fadeTimer);

    return () => {
      clearTimers();
      document.body.style.overflow = "";
    };
  }, [handleDismiss, clearTimers]);

  // Ensure scroll lock is cleaned up on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (stage === "dismissed") {
    return null;
  }

  const isFading = stage === "fading";

  return (
    <div
      id="shah-cinematic-intro"
      aria-label="Shah Junction Villa Motion Graphics Opening"
      role="region"
      aria-hidden={isFading ? "true" : "false"}
      onClick={handleDismiss}
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center overflow-hidden select-none bg-[#050403] w-screen h-screen min-h-[100dvh] transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
        isFading ? "opacity-0 scale-[1.015] pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* 0.0s - 0.5s: Deep Luxury Black/Charcoal Background & Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(22, 18, 13, 0.72) 0%, rgba(10, 9, 8, 0.96) 55%, #050403 100%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_180px_rgba(0,0,0,0.96)]" />

      {/* MASTER LOGO COMPOSITION CONTAINER */}
      <div className="relative z-10 flex flex-col items-center justify-center p-4 sm:p-6 w-full max-w-2xl mx-auto">
        <div
          className="relative flex items-center justify-center w-[86vw] max-w-[340px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[560px] aspect-[1024/750]"
          style={{
            animation: "intro-camera-push 4.5s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {/* 0.0s - 4.5s: Soft warm golden volumetric backlight pulsing behind the logo */}
          <div
            className="absolute -inset-10 sm:-inset-16 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(212, 175, 55, 0.28) 0%, rgba(185, 135, 45, 0.12) 42%, rgba(120, 80, 20, 0.02) 70%, transparent 80%)",
              filter: "blur(32px)",
              animation: "intro-pulse-backlight 4.5s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          />

          {/* EXACT LOGO-MATCHED SVG COMPOSITION (1024 x 750 Coordinate Space) */}
          <svg
            viewBox="0 0 1024 750"
            className="w-full h-full object-contain pointer-events-none select-none z-10 drop-shadow-[0_0_40px_rgba(212,175,55,0.7)] drop-shadow-[0_14px_40px_rgba(0,0,0,0.95)]"
            aria-hidden="true"
          >
            <defs>
              {/* Soft gold glow for real contour lines */}
              <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* 1. Clip for Roof, Chimney, 4-Pane Window & Modern Villa Facade */}
              <clipPath id="clip-roof-villa">
                <path d="M 492 138 L 602 245 H 668 V 425 H 492 V 260 L 380 230 L 492 138 Z" />
              </clipPath>

              {/* 2. Clip for SJ Monogram */}
              <clipPath id="clip-sj">
                <rect x="250" y="140" width="255" height="325" />
              </clipPath>

              {/* 3. Clip for Landscape Details (Palm Trees & Cypress Gardens) */}
              <clipPath id="clip-landscape">
                <path d="M 215 330 H 365 V 435 H 215 Z M 560 190 H 745 V 435 H 560 Z" />
              </clipPath>

              {/* 4. Clip for Gold Underline / Swoosh Ribbon */}
              <clipPath id="clip-underline">
                <rect x="180" y="415" width="600" height="53" />
              </clipPath>

              {/* 5. Clips for Typography Lines */}
              <clipPath id="clip-shah-junction">
                <rect x="175" y="468" width="670" height="70" />
              </clipPath>

              <clipPath id="clip-villa">
                <rect x="195" y="538" width="630" height="50" />
              </clipPath>

              <clipPath id="clip-tagline">
                <rect x="205" y="588" width="610" height="47" />
              </clipPath>
            </defs>

            {/* 0.5s - 1.4s: Architectural Symbol Build (Actual roof contour line-draw + real villa structure) */}
            <g
              clipPath="url(#clip-roof-villa)"
              style={{
                animation: "intro-part-roof-villa 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both",
              }}
            >
              <image href={fallbackLogoPng} x="0" y="0" width="1024" height="750" />
            </g>

            {/* Subtle gold line-draw along the REAL roof ridge, chimney, and window contours */}
            <g
              stroke="#f8db91"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#gold-glow)"
            >
              {/* Roof Ridge Gable */}
              <path
                d="M 384 224 L 492 142 L 598 248"
                pathLength="1"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: "intro-contour-draw 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both",
                }}
              />
              {/* Chimney */}
              <path
                d="M 556 215 V 172 H 582 V 232"
                pathLength="1"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: "intro-contour-draw 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both",
                }}
              />
              {/* 4-Pane Window Frame */}
              <rect
                x="515"
                y="224"
                width="31"
                height="31"
                pathLength="1"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: "intro-contour-draw 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.75s both",
                }}
              />
              {/* 4-Pane Window Cross Bars */}
              <path
                d="M 530 224 V 255 M 515 240 H 546"
                pathLength="1"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: "intro-contour-draw 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both",
                }}
              />
            </g>

            {/* 1.4s - 2.2s: Actual SJ Monogram Reveal */}
            <g
              clipPath="url(#clip-sj)"
              style={{
                animation: "intro-part-sj-monogram 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.4s both",
              }}
            >
              <image href={fallbackLogoPng} x="0" y="0" width="1024" height="750" />
            </g>

            {/* 2.2s - 2.8s: Actual Landscape & Palm Trees Reveal */}
            <g
              clipPath="url(#clip-landscape)"
              style={{
                animation: "intro-part-landscape 0.6s cubic-bezier(0.16, 1, 0.3, 1) 2.2s both",
              }}
            >
              <image href={fallbackLogoPng} x="0" y="0" width="1024" height="750" />
            </g>

            {/* 2.8s - 3.3s: Actual Gold Underline / Swoosh Ribbon Draw (Left to Right) */}
            <g
              clipPath="url(#clip-underline)"
              style={{
                animation: "intro-part-underline-draw 0.5s cubic-bezier(0.16, 1, 0.3, 1) 2.8s both",
              }}
            >
              <image href={fallbackLogoPng} x="0" y="0" width="1024" height="750" />
            </g>

            {/* 3.30s - 3.55s: Actual "SHAH JUNCTION" Typography */}
            <g
              clipPath="url(#clip-shah-junction)"
              style={{
                animation: "intro-part-shah-junction 0.35s cubic-bezier(0.16, 1, 0.3, 1) 3.3s both",
              }}
            >
              <image href={fallbackLogoPng} x="0" y="0" width="1024" height="750" />
            </g>

            {/* 3.55s - 3.75s: Actual "— VILLA —" Typography */}
            <g
              clipPath="url(#clip-villa)"
              style={{
                animation: "intro-part-villa 0.3s cubic-bezier(0.16, 1, 0.3, 1) 3.55s both",
              }}
            >
              <image href={fallbackLogoPng} x="0" y="0" width="1024" height="750" />
            </g>

            {/* 3.75s - 3.95s: Actual "WHERE COMFORT MEETS LUXURY" Tagline */}
            <g
              clipPath="url(#clip-tagline)"
              style={{
                animation: "intro-part-tagline 0.3s cubic-bezier(0.16, 1, 0.3, 1) 3.75s both",
              }}
            >
              <image href={fallbackLogoPng} x="0" y="0" width="1024" height="750" />
            </g>

            {/* 3.9s - 4.5s: Complete Unified Master Logo Lock (Ensures 100% Seamless Visual Perfection) */}
            <image
              href={fallbackLogoPng}
              x="0"
              y="0"
              width="1024"
              height="750"
              style={{
                animation: "intro-full-logo-lock 0.25s ease 3.9s both",
              }}
            />
          </svg>

          {/* 3.9s - 4.5s: ONE Slow Realistic Metallic Gold Light Sweep Across Completed Logo */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen rounded-2xl z-20"
            style={{
              maskImage: "radial-gradient(circle at center, black 65%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(circle at center, black 65%, transparent 95%)",
            }}
          >
            <div
              className="w-[50%] h-full bg-gradient-to-r from-transparent via-[#fff5d0]/50 to-transparent"
              style={{
                animation: "intro-specular-sweep-final 1.1s cubic-bezier(0.16, 1, 0.3, 1) 3.9s both",
              }}
            />
          </div>
        </div>
      </div>

      {/* SKIP INTRO CONTROL: Discreet, elegant, respecting safe area in bottom-right */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleDismiss();
        }}
        aria-label="Skip intro animation and view website"
        className="fixed bottom-6 right-6 z-[1000000] group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/12 bg-black/45 hover:bg-black/80 hover:border-[#dfb76c]/60 text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.22em] uppercase text-white/50 hover:text-white transition-all duration-300 backdrop-blur-md focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#dfb76c] cursor-pointer"
        style={{
          marginBottom: "max(0px, env(safe-area-inset-bottom))",
          marginRight: "max(0px, env(safe-area-inset-right))",
          animation: "intro-skip-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both",
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
