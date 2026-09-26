import { Crown, PhoneCall, MessageCircle, ShieldCheck, HeartHandshake, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import { business } from "@/lib/business";
import { Reveal } from "./Reveal";

// --------------------------------------------------------------------------
// OWNER PHOTO CONFIGURATION
// When you have the owner's photo, set its imported path or URL below.
// If null, the elegant royal golden portrait frame is displayed!
// --------------------------------------------------------------------------
const ownerPhotoUrl: string | null = null;

export function Facilities() {
  return (
    <section
      id="owner"
      className="relative bg-gradient-to-b from-warm-beige via-[#f7f2e8] to-warm-beige py-20 sm:py-28 lg:py-32 overflow-hidden border-y border-brass/25"
    >
      {/* Invisible anchor for backward compatibility */}
      <span id="facilities" className="sr-only" />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 w-[650px] h-[350px] bg-brass/10 blur-3xl opacity-70 rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[600px] h-[350px] bg-olive/10 blur-3xl opacity-60 rounded-full" />

      <div className="container-site relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brass/15 border border-brass/40 text-olive-deep text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
              <span className="text-brass">✦</span> LEADERSHIP & VISION · ਮਾਲਕ ਦਾ ਸੁਨੇਹਾ <span className="text-brass">✦</span>
            </div>
            <h2 className="font-display text-[clamp(2.1rem,4.8vw,3.75rem)] font-bold tracking-tight text-charcoal leading-[1.12]">
              HEART OF SHAH JUNCTION VILLA
            </h2>
            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="h-[1.5px] w-14 bg-gradient-to-r from-transparent via-brass to-brass/40" />
              <span className="text-brass text-sm">❖</span>
              <span className="h-[1.5px] w-14 bg-gradient-to-l from-transparent via-brass to-brass/40" />
            </div>
            <p className="mt-4 text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
              Founded on the values of traditional Punjabi warmth, integrity, and royal hospitality, every celebration here is personally supervised with family care.
            </p>
          </div>
        </Reveal>

        {/* Main Editorial Content: 2-Column Showcase */}
        <div className="mt-14 sm:mt-18 grid gap-10 lg:gap-14 lg:grid-cols-12 items-center">
          {/* Left Column: Ornate Royal Portrait Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <Reveal className="w-full max-w-md">
              <div className="relative group">
                {/* Decorative Outer Aura */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-brass via-olive/30 to-brass opacity-60 blur-md group-hover:opacity-90 transition-opacity duration-500" />

                {/* Outer Luxury Frame */}
                <div className="relative rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-[#fbf8f2] via-soft-cream to-warm-beige border-2 border-brass/60 shadow-[0_16px_40px_-8px_rgba(40,30,20,0.18)]">
                  {/* Ornate Corner Gold Brackets */}
                  <span className="absolute top-2 left-2 text-brass text-sm">✦</span>
                  <span className="absolute top-2 right-2 text-brass text-sm">✦</span>
                  <span className="absolute bottom-2 left-2 text-brass text-sm">✦</span>
                  <span className="absolute bottom-2 right-2 text-brass text-sm">✦</span>

                  {/* Inner Photo Container */}
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-brass/40 bg-gradient-to-b from-[#1c1815] via-charcoal to-[#120f0d] flex flex-col items-center justify-between p-7 text-center shadow-inner">
                    {/* Background Regal Mandala Motif */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(202,168,106,0.15)_0,transparent_70%)] pointer-events-none" />

                    {ownerPhotoUrl ? (
                      <img
                        src={ownerPhotoUrl}
                        alt="Owner of Shah Junction Villa"
                        className="absolute inset-0 size-full object-cover object-center"
                      />
                    ) : (
                      <>
                        {/* Top Royal Monogram */}
                        <div className="relative z-10 mt-4 flex flex-col items-center">
                          <div className="flex size-18 items-center justify-center rounded-2xl bg-gradient-to-br from-brass/25 via-brass/10 to-transparent border border-brass/50 shadow-lg text-brass-light animate-pulse">
                            <Crown className="size-9" strokeWidth={1.5} />
                          </div>
                          <span className="mt-3 px-3 py-1 rounded-full bg-brass/20 border border-brass/40 text-[11px] font-bold uppercase tracking-widest text-brass-light">
                            ✦ FOUNDER & MANAGING DIRECTOR ✦
                          </span>
                        </div>

                        {/* Center Frame Placeholder Notice */}
                        <div className="relative z-10 my-auto py-6 px-4 rounded-xl bg-charcoal/60 backdrop-blur-md border border-brass/30 max-w-[280px]">
                          <p className="font-display text-xl sm:text-2xl font-bold text-soft-cream tracking-tight">
                            Portrait Frame
                          </p>
                          <p className="mt-1 font-gurmukhi text-xs text-brass-light font-semibold">
                            ਮਾਲਕ ਦੀ ਤਸਵੀਰ ਇੱਥੇ ਲੱਗੇਗੀ
                          </p>
                          <div className="mt-3 pt-2.5 border-t border-brass/20 flex items-center justify-center gap-1.5 text-[10px] text-white/70">
                            <span className="size-1.5 rounded-full bg-brass animate-ping" />
                            <span>Photo will be added here</span>
                          </div>
                        </div>

                        {/* Bottom Tagline */}
                        <div className="relative z-10 mb-2">
                          <p className="font-serif italic text-sm text-brass-light/90">
                            "Welcoming families with royal warmth"
                          </p>
                          <p className="mt-0.5 text-[11px] text-white/60 tracking-wider uppercase">
                            Shah Junction Villa · Sahaipur
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Stately Floating Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-5 py-1.5 rounded-full bg-olive text-soft-cream font-sans text-xs font-bold tracking-wide shadow-lg border border-brass/40 flex items-center gap-2">
                  <ShieldCheck className="size-3.5 text-brass-light" />
                  <span>Personal Event Supervision</span>
                </div>
              </div>

              {/* 3 Quick Stats Under Photo */}
              <div className="mt-8 grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-xl bg-soft-cream/80 border border-brass/25 shadow-xs">
                  <span className="block font-display text-xl font-bold text-charcoal">15+</span>
                  <span className="text-[11px] text-charcoal/70">Yrs Hospitality</span>
                </div>
                <div className="p-3 rounded-xl bg-soft-cream/80 border border-brass/25 shadow-xs">
                  <span className="block font-display text-xl font-bold text-olive-deep">1,000+</span>
                  <span className="text-[11px] text-charcoal/70">Weddings Hosted</span>
                </div>
                <div className="p-3 rounded-xl bg-soft-cream/80 border border-brass/25 shadow-xs">
                  <span className="block font-display text-xl font-bold text-brass-deep">100%</span>
                  <span className="text-[11px] text-charcoal/70">Family Care</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Founder's Story & Personal Commitment */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="space-y-6">
                {/* Founder Quote */}
                <div className="p-6 sm:p-7 rounded-2xl bg-soft-cream/90 border-l-4 border-l-brass border border-brass/30 shadow-card backdrop-blur-sm">
                  <p className="font-display text-xl sm:text-2xl italic leading-snug text-charcoal">
                    "ਜਦੋਂ ਕੋਈ ਪਰਿਵਾਰ ਆਪਣੇ ਬੱਚਿਆਂ ਦੇ ਵਿਆਹ ਲਈ ਸਾਡੇ ਕੋਲ ਆਉਂਦਾ ਹੈ, ਤਾਂ ਇਹ ਸਿਰਫ਼ ਬੁਕਿੰਗ ਨਹੀਂ, ਸਗੋਂ ਇੱਕ ਪਵਿੱਤਰ ਭਰੋਸਾ ਹੁੰਦਾ ਹੈ। ਅਸੀਂ ਤੁਹਾਡੇ ਮਹਿਮਾਨਾਂ ਦਾ ਸਵਾਗਤ ਆਪਣੇ ਪਰਿਵਾਰ ਵਾਂਗ ਕਰਦੇ ਹਾਂ।"
                  </p>
                  <p className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-brass-deep flex items-center gap-2">
                    <span>—</span>
                    <span>Founder & Managing Director, Shah Junction Villa</span>
                  </p>
                </div>

                {/* Editorial Story */}
                <div className="space-y-4 text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
                  <p>
                    Rising as a landmark of celebration in Sahaipur, Punjab, <strong className="text-charcoal font-semibold">Shah Junction Villa</strong> was born from a simple yet ambitious vision: to offer families in Gurdaspur and surrounding regions a wedding palace that effortlessly blends the grandeur of royal architecture with genuine, heartfelt Punjabi hospitality.
                  </p>
                  <p>
                    We believe that a dream wedding shouldn't come with stress or compromises. That is why we personally built every detail from the ground up — from our <strong className="text-charcoal font-semibold">climate-controlled grand ballroom</strong> with cove tray lighting, to vast <strong className="text-charcoal font-semibold">golden shamiana lawns</strong>, and a dedicated <strong className="text-charcoal font-semibold">2-acre secure parking area</strong> with valet marshals.
                  </p>
                </div>

                {/* 3 Core Owner Commitments */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-brass-deep mb-3.5 flex items-center gap-2">
                    <Sparkles className="size-3.5 text-brass" />
                    OUR PERSONAL PROMISE TO EVERY FAMILY
                  </h4>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="p-4 rounded-xl bg-soft-cream/80 border border-brass/25 shadow-xs">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-olive/10 text-olive mb-2.5">
                        <CheckCircle2 className="size-4.5" />
                      </div>
                      <h5 className="text-sm font-bold text-charcoal">Ground Supervision</h5>
                      <p className="mt-1 text-xs text-charcoal/70 leading-relaxed">
                        Management is personally present throughout your celebration to ensure flawless execution.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-soft-cream/80 border border-brass/25 shadow-xs">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-brass/15 text-brass-deep mb-2.5">
                        <HeartHandshake className="size-4.5" />
                      </div>
                      <h5 className="text-sm font-bold text-charcoal">Transparent Dealing</h5>
                      <p className="mt-1 text-xs text-charcoal/70 leading-relaxed">
                        Clear, honest packages with zero surprise costs, honoring Punjabi trust and brotherhood.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-soft-cream/80 border border-brass/25 shadow-xs">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-olive/10 text-olive mb-2.5">
                        <ShieldCheck className="size-4.5" />
                      </div>
                      <h5 className="text-sm font-bold text-charcoal">Zero Failure Backup</h5>
                      <p className="mt-1 text-xs text-charcoal/70 leading-relaxed">
                        Heavy silent generators, RO water stations, and dedicated marshals for complete peace of mind.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Connect & Meeting CTA */}
                <div className="pt-4 border-t border-brass/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-olive" />
                      MEET PERSONALLY OVER TEA
                    </p>
                    <p className="text-xs text-charcoal/70 mt-0.5">
                      Visit Shah Junction Villa · Sahaipur, Gurdaspur, Punjab
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <a
                      href={business.phoneTel}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-olive text-soft-cream font-semibold text-xs sm:text-sm hover:bg-olive-deep shadow-md transition-all duration-300"
                    >
                      <PhoneCall className="size-3.5" />
                      <span>{business.phoneDisplay}</span>
                    </a>

                    <a
                      href="#enquiry"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-warm-beige border border-brass/40 text-charcoal font-semibold text-xs sm:text-sm hover:bg-brass/20 transition-all duration-300"
                    >
                      <MessageCircle className="size-3.5 text-brass-deep" />
                      <span>Book A Visit</span>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
