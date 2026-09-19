import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-sans text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-out select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        brass:
          "border border-brass-light/90 bg-gradient-to-r from-brass-deep via-brass to-brass-light text-charcoal font-bold shadow-[0_4px_20px_-2px_oklch(0.70_0.10_82_/_60%)] hover:scale-[1.03] hover:shadow-[0_6px_26px_-2px_oklch(0.70_0.10_82_/_80%)]",
        crystalGlass:
          "border border-brass/50 bg-white/10 text-white backdrop-blur-xl hover:scale-[1.02] hover:border-brass hover:bg-white/20 hover:text-brass-light shadow-sm",
        olive:
          "border border-brass/40 bg-gradient-to-r from-olive via-[oklch(0.42_0.085_135)] to-olive text-soft-cream shadow-[0_2px_14px_oklch(0.38_0.08_135_/_50%)] hover:scale-[1.02] hover:border-brass",
        dustyBlue:
          "bg-dusty-blue text-soft-cream hover:bg-dusty-blue-soft",
        charcoal:
          "bg-charcoal text-soft-cream hover:bg-charcoal-soft",
        softCream:
          "border border-border bg-soft-cream text-charcoal hover:bg-warm-beige shadow-card hover:scale-[1.02]",
        outlineLight:
          "border border-white/35 bg-white/10 text-white backdrop-blur-md hover:scale-[1.02] hover:border-brass hover:text-brass hover:bg-white/20",
        outlineDark:
          "border border-charcoal/30 text-charcoal hover:border-olive hover:text-olive-deep hover:bg-charcoal/5",
        outlineBrass:
          "border border-brass/60 text-brass hover:border-brass hover:bg-brass/10 hover:scale-[1.02]",
        ghostLight:
          "text-on-dark hover:text-brass",
        ghostDark:
          "text-charcoal hover:text-olive-deep",
      },
      size: {
        sm: "h-10 px-5 text-xs",
        md: "h-12 px-7 text-xs",
        lg: "h-14 px-9 text-[0.84rem]",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "brass", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & Variants) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Variants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
