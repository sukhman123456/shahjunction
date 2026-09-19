import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { galleryPhotos } from "@/lib/venue";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All Views");
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const filteredPhotos = activeCategory === "All Views"
    ? galleryPhotos
    : galleryPhotos.filter((p) => p.category === activeCategory);

  const categories = ["All Views", ...Array.from(new Set(galleryPhotos.map((p) => p.category)))];

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + galleryPhotos.length) % galleryPhotos.length)),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const current = index !== null ? galleryPhotos[index] : null;

  return (
    <section id="gallery" className="bg-warm-beige py-16 sm:py-24 lg:py-32">
      <div className="container-site">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="AUTHENTIC VENUE GALLERY"
            title="GLIMPSES OF SHAHI JUNCTION VILLA"
            lead="Authentic venue photography capturing our neoclassical entrance facade, climate-controlled grand banquet hall, cascading wisteria jaimala walkway, golden shamiana wedding lawns, and twilight sunset panorama."
          />
        </Reveal>

        {/* Category Filters */}
        <Reveal delay={80} className="mt-8 sm:mt-10 flex flex-wrap gap-2 sm:gap-2.5">
          {categories.map((cat) => {
            const count = cat === "All Views" ? galleryPhotos.length : galleryPhotos.filter((p) => p.category === cat).length;
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-300",
                  isSelected
                    ? "bg-charcoal text-brass-light border border-brass shadow-sm scale-105"
                    : "bg-soft-cream/80 text-charcoal/80 border border-border hover:border-brass/50 hover:bg-soft-cream",
                )}
              >
                <span>{cat}</span>
                <span className={cn("text-[0.65rem] px-1.5 py-0.2 rounded-full", isSelected ? "bg-brass/25 text-brass-light" : "bg-warm-beige text-muted-foreground")}>
                  {count}
                </span>
              </button>
            );
          })}
        </Reveal>

        {/* Editorial Grid */}
        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPhotos.map((photo) => {
            const originalIndex = galleryPhotos.findIndex((p) => p.title === photo.title);
            const isWide = photo.aspect === "landscape" && activeCategory === "All Views";
            return (
              <Reveal
                key={photo.title}
                delay={(originalIndex % 3) * 80}
                className={cn(
                  "group relative overflow-hidden rounded-sm border border-border bg-soft-cream shadow-card cursor-zoom-in hover:border-brass/50 hover:shadow-lift transition-all duration-500",
                  isWide ? "sm:col-span-2 lg:col-span-2 aspect-[16/10]" : "aspect-[3/4] sm:aspect-[4/5] sm:min-h-[22rem]",
                )}
              >
                <button
                  type="button"
                  onClick={() => setIndex(originalIndex >= 0 ? originalIndex : 0)}
                  className="relative block size-full text-left"
                  aria-label={`View photo: ${photo.title}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: photo.focusPosition || "center center" }}
                    className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-60 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  {/* Category Pill on top */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 opacity-90 sm:opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1 rounded-full bg-charcoal/85 px-3 py-1 text-[0.62rem] sm:text-[0.68rem] font-semibold tracking-wider text-brass uppercase backdrop-blur-md border border-brass/35">
                      {photo.category}
                    </span>
                  </div>

                  {/* Caption on bottom */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-6 opacity-95 sm:opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="pr-3">
                      <p className="font-display text-lg sm:text-2xl font-semibold text-white leading-tight drop-shadow-sm">
                        {photo.title}
                      </p>
                      {photo.tagline && (
                        <p className="mt-1 text-xs text-brass-soft line-clamp-1">
                          {photo.tagline}
                        </p>
                      )}
                    </div>
                    <span className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-full bg-charcoal/90 text-brass border border-brass/40 backdrop-blur-md shadow-md group-hover:scale-110 transition-transform">
                      <ZoomIn className="size-3.5 sm:size-4" />
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog.Root open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[60] bg-charcoal/95 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
          <Dialog.Content
            className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-6 lg:p-10 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
            aria-describedby={undefined}
          >
            <Dialog.Title className="sr-only">{current?.title ?? "Gallery photograph"}</Dialog.Title>
            {current && (
              <figure className="flex max-h-full max-w-5xl flex-col items-center">
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  className="max-h-[72svh] sm:max-h-[78svh] w-auto max-w-full rounded-xs object-contain shadow-lift animate-in fade-in-0 duration-300"
                />
                <figcaption className="mt-3 sm:mt-4 flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-[0.7rem] sm:text-xs tracking-[0.16em] sm:tracking-[0.2em] text-on-dark-muted uppercase text-center px-4">
                  <span className="text-brass font-semibold">{current.category}</span>
                  <span>•</span>
                  <span className="text-on-dark font-medium">{current.title}</span>
                  <span>•</span>
                  <span>
                    {(index ?? 0) + 1} / {galleryPhotos.length}
                  </span>
                </figcaption>
              </figure>
            )}

            <LightboxButton className="left-2 sm:left-6" label="Previous image" onClick={() => step(-1)}>
              <ChevronLeft className="size-5 sm:size-6" />
            </LightboxButton>
            <LightboxButton className="right-2 sm:right-6" label="Next image" onClick={() => step(1)}>
              <ChevronRight className="size-5 sm:size-6" />
            </LightboxButton>
            <Dialog.Close asChild>
              <LightboxButton className="top-3 right-3 translate-y-0 sm:top-6 sm:right-6" label="Close gallery">
                <X className="size-5 sm:size-6" />
              </LightboxButton>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

function LightboxButton({
  className,
  label,
  onClick,
  children,
  ...rest
}: {
  className?: string;
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 inline-flex size-10 sm:size-12 -translate-y-1/2 items-center justify-center rounded-full border border-on-dark/25 bg-charcoal/75 text-on-dark backdrop-blur-xs transition-colors hover:border-brass hover:text-brass active:scale-95",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
