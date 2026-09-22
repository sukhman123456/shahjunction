import { useState, useEffect } from "react";
import logoPng from "@/assets/shah-junction-villa-logo.png";

/**
 * Ensures any stale browser cache from earlier sessions is purged immediately.
 */
if (typeof window !== "undefined") {
  try {
    window.sessionStorage.removeItem("sj_transparent_logo_v1");
    window.sessionStorage.removeItem("sj_transparent_logo_v2");
    window.sessionStorage.removeItem("sj_transparent_logo_v3");
  } catch {}
}

export function initTransparentLogo() {
  // No-op: true transparent PNG is directly provided from assets
}

export function useTransparentLogo() {
  return {
    logoSrc: logoPng,
    isTransparentReady: true,
    defaultLogoSrc: logoPng,
  };
}
