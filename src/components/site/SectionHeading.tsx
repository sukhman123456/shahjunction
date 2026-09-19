import { cn } from "@/lib/utils";

interface Props {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({ eyebrow, title, lead, align = "left", tone = "dark", className }: Props) {
  const light = tone === "light";
  return (
    <div className={cn("max-w-2xl w-full", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow max-w-full flex-wrap", light ? "text-brass-soft" : "text-olive-deep", align === "center" && "justify-center")}>
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 font-display text-[clamp(1.75rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight break-words",
          light ? "text-on-dark" : "text-charcoal",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn("mt-3 sm:mt-4 text-sm leading-relaxed sm:text-base lg:text-lg", light ? "text-on-dark-muted" : "text-muted-foreground")}>
          {lead}
        </p>
      )}
    </div>
  );
}
