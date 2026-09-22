import { useState, useEffect } from "react";
import defaultLogoSrc from "@/assets/shah-junction-villa-logo.jpg";

let cachedTransparentDataUrl: string | null = null;
const listeners = new Set<(url: string) => void>();

function notify(url: string) {
  cachedTransparentDataUrl = url;
  listeners.forEach((fn) => fn(url));
}

export function initTransparentLogo() {
  if (typeof window === "undefined") return;

  if (cachedTransparentDataUrl) {
    return;
  }

  // Clear older session caches to ensure latest clean cutoff
  try {
    window.sessionStorage.removeItem("sj_transparent_logo_v1");
    window.sessionStorage.removeItem("sj_transparent_logo_v2");
  } catch {}

  const stored = window.sessionStorage.getItem("sj_transparent_logo_v3");
  if (stored && stored.startsWith("data:image/png")) {
    notify(stored);
    return;
  }

  const img = new Image();
  // Do NOT set crossOrigin for same-origin local assets
  img.src = defaultLogoSrc;
  img.onload = () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imgData.data;

      // Aggressive black subtraction to eliminate all dark JPEG artifacts & borders
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];
        const maxVal = Math.max(r, g, b);

        // Black background & compression noise cutoff
        if (maxVal <= 42) {
          d[i + 3] = 0; // 100% transparent
        } else if (maxVal < 90) {
          // Smooth anti-aliased gradient transition on edges
          const t = (maxVal - 42) / 48;
          d[i + 3] = Math.round(Math.pow(t, 1.4) * 255);
        } else {
          d[i + 3] = 255;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const transparentUrl = canvas.toDataURL("image/png");

      try {
        window.sessionStorage.setItem("sj_transparent_logo_v3", transparentUrl);
      } catch {}

      notify(transparentUrl);

      // Persist to server assets via dev endpoint
      fetch("/__api/save-transparent-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUrl: transparentUrl }),
      }).catch(() => {});
    } catch (e) {
      console.warn("Could not process transparent logo canvas:", e);
    }
  };
}

export function useTransparentLogo() {
  const [logoSrc, setLogoSrc] = useState<string>(cachedTransparentDataUrl || defaultLogoSrc);
  const [isTransparentReady, setIsTransparentReady] = useState<boolean>(Boolean(cachedTransparentDataUrl));

  useEffect(() => {
    const handler = (url: string) => {
      setLogoSrc(url);
      setIsTransparentReady(true);
    };

    listeners.add(handler);
    initTransparentLogo();

    return () => {
      listeners.delete(handler);
    };
  }, []);

  return { logoSrc, isTransparentReady, defaultLogoSrc };
}
