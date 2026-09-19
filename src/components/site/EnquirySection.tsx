import { Calendar, CheckCircle2, MessageCircle, Phone, Send, User } from "lucide-react";
import { useState } from "react";
import { RESERVATION_CONTACT } from "@/lib/reservations";
import { business } from "@/lib/business";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function EnquirySection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "Wedding",
    preferredDate: "",
    message: "",
  });

  const getWhatsAppUrl = () => {
    const lines = [
      "✨ *New Event Enquiry — Shahi Junction Villa*",
      `👤 *Name:* ${formData.name.trim()}`,
      `📞 *Phone:* ${formData.phone.trim()}`,
      `🎉 *Event Type:* ${formData.eventType}`,
      `📅 *Preferred Date:* ${formData.preferredDate || "To be discussed"}`,
      formData.message.trim() ? `💬 *Requirements:* ${formData.message.trim()}` : "",
    ].filter(Boolean);

    const text = lines.join("\n");
    return `https://wa.me/918728060036?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    const url = getWhatsAppUrl();
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <section id="enquiry" className="bg-warm-beige-light/60 py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="container-site max-w-4xl">
        <Reveal>
          <SectionHeading
            eyebrow="DIRECT WHATSAPP & PHONE ENQUIRIES"
            title="PLAN YOUR CELEBRATION WITH US"
            lead="Connect directly with the management team at Shahi Junction Villa via WhatsApp (+91 87280 60036) to discuss dates, spaces, and celebration requirements."
            align="center"
          />
        </Reveal>

        <Reveal delay={120} className="mt-10 sm:mt-14">
          <div className="rounded-2xl border border-border bg-soft-cream p-5 sm:p-8 lg:p-12 shadow-card">
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center animate-fade-up">
                <span className="flex size-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg mb-2">
                  <MessageCircle className="size-8" />
                </span>
                <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-charcoal">
                  Thank You, {formData.name}!
                </h3>
                <p className="mt-2 max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">
                  Your event enquiry has been prepared and sent directly to our official WhatsApp:{" "}
                  <strong className="text-charcoal font-bold">{RESERVATION_CONTACT.phoneDisplay}</strong>.
                </p>

                {/* WhatsApp button fallback in case popup was blocked */}
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all duration-200"
                  >
                    <MessageCircle className="size-5" />
                    <span>Open WhatsApp Chat</span>
                  </a>

                  <a
                    href={RESERVATION_CONTACT.phoneTel}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-charcoal hover:bg-charcoal/90 text-white font-bold text-sm shadow-md transition-all duration-200"
                  >
                    <Phone className="size-4 text-brass" />
                    <span>Call Venue Team</span>
                  </a>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        eventType: "Wedding",
                        preferredDate: "",
                        message: "",
                      });
                    }}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-olive hover:underline"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">
                      Your Name <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Gurpreet Singh"
                        className="h-12 w-full rounded-xl border border-border bg-warm-beige/30 px-4 pl-11 text-sm text-charcoal placeholder:text-muted-foreground focus:border-olive focus:bg-soft-cream focus:outline-hidden focus:ring-1 focus:ring-olive transition-colors"
                      />
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">
                      Phone Number <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="h-12 w-full rounded-xl border border-border bg-warm-beige/30 px-4 pl-11 text-sm text-charcoal placeholder:text-muted-foreground focus:border-olive focus:bg-soft-cream focus:outline-hidden focus:ring-1 focus:ring-olive transition-colors"
                      />
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Event Type */}
                  <div>
                    <label htmlFor="eventType" className="block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">
                      Event Type
                    </label>
                    <select
                      id="eventType"
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="mt-2 h-12 w-full rounded-xl border border-border bg-warm-beige/30 px-4 text-sm text-charcoal focus:border-olive focus:bg-soft-cream focus:outline-hidden focus:ring-1 focus:ring-olive transition-colors"
                    >
                      <option value="Wedding">Wedding Ceremony & Reception</option>
                      <option value="Engagement">Engagement & Roka</option>
                      <option value="Sangeet">Sangeet & Jaggo Night</option>
                      <option value="Reception">Post-Wedding Reception</option>
                      <option value="Family Function">Family Anniversary / Gathering</option>
                      <option value="Birthday">Birthday Celebration</option>
                      <option value="Corporate">Corporate / Community Event</option>
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label htmlFor="preferredDate" className="block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">
                      Preferred Date
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="date"
                        id="preferredDate"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="h-12 w-full rounded-xl border border-border bg-warm-beige/30 px-4 pl-11 text-sm text-charcoal focus:border-olive focus:bg-soft-cream focus:outline-hidden focus:ring-1 focus:ring-olive transition-colors"
                      />
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">
                    Message / Estimated Guest Count
                  </label>
                  <div className="relative mt-2">
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share estimated guest count, daytime vs evening preference, or any specific setup questions..."
                      className="w-full rounded-xl border border-border bg-warm-beige/30 p-4 text-sm text-charcoal placeholder:text-muted-foreground focus:border-olive focus:bg-soft-cream focus:outline-hidden focus:ring-1 focus:ring-olive transition-colors"
                    />
                  </div>
                </div>

                {/* Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full border border-brass-light/90 bg-gradient-to-r from-brass-deep via-brass to-brass-light px-8 text-sm font-bold uppercase tracking-[0.18em] text-charcoal shadow-[0_4px_20px_-2px_oklch(0.70_0.10_82_/_60%)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_6px_26px_-2px_oklch(0.70_0.10_82_/_80%)] active:translate-y-px cursor-pointer"
                  >
                    <MessageCircle className="size-4 text-emerald-800" /> SEND ENQUIRY TO WHATSAPP
                  </button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Direct WhatsApp & Call line:{" "}
                    <a href={RESERVATION_CONTACT.whatsAppUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 hover:underline">
                      WhatsApp {RESERVATION_CONTACT.phoneDisplay}
                    </a>{" "}
                    · Or call{" "}
                    <a href={RESERVATION_CONTACT.phoneTel} className="font-semibold text-charcoal hover:underline">
                      {RESERVATION_CONTACT.phoneDisplay}
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
