import { useState, useEffect, useId } from "react";
import {
  X,
  Calendar as CalendarIcon,
  User,
  Phone,
  Mail,
  Users,
  Clock,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Copy,
  Check,
} from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import {
  createReservation,
  checkDateAvailability,
  EVENT_TYPES,
  EVENT_TIMES,
  RESERVATION_CONTACT,
  type EventType,
  type DateAvailability,
  type Reservation,
} from "@/lib/reservations";

export function BookingModal() {
  const { isBookingModalOpen, closeBookingModal, prefilledDate } = useBooking();

  // Form state
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState<EventType>("Wedding");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState<string>(EVENT_TIMES[1]); // Default: Evening
  const [guestCount, setGuestCount] = useState<number | "">(350);
  const [message, setMessage] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availability, setAvailability] = useState<{
    status: DateAvailability;
    message: string;
    isBooked: boolean;
    isPending: boolean;
    isAvailable: boolean;
  } | null>(null);
  const [isCheckingDate, setIsCheckingDate] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Today's date in YYYY-MM-DD for min date
  const todayStr = new Date().toISOString().split("T")[0];

  // Sync prefilled date
  useEffect(() => {
    if (prefilledDate) {
      setEventDate(prefilledDate);
    }
  }, [prefilledDate]);

  // Check availability whenever date changes
  useEffect(() => {
    if (!eventDate) {
      setAvailability(null);
      return;
    }

    let isMounted = true;
    setIsCheckingDate(true);
    setErrorMessage(null);

    checkDateAvailability(eventDate)
      .then((res) => {
        if (isMounted) {
          setAvailability(res);
          setIsCheckingDate(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsCheckingDate(false);
      });

    return () => {
      isMounted = false;
    };
  }, [eventDate]);

  // Handle ESC key and body scroll lock
  useEffect(() => {
    if (!isBookingModalOpen) return;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeBookingModal();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isBookingModalOpen, closeBookingModal]);

  // Reset form when modal closes or opens
  useEffect(() => {
    if (!isBookingModalOpen) {
      setConfirmedReservation(null);
      setErrorMessage(null);
    }
  }, [isBookingModalOpen]);

  if (!isBookingModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!eventDate) {
      setErrorMessage("Please select your preferred celebration date.");
      return;
    }

    if (new Date(`${eventDate}T00:00:00`) < new Date(todayStr + "T00:00:00")) {
      setErrorMessage("Event date cannot be in the past.");
      return;
    }

    if (!guestCount || Number(guestCount) <= 0) {
      setErrorMessage("Please specify the estimated number of guests.");
      return;
    }

    if (availability?.isBooked) {
      setErrorMessage(
        "This date is already BOOKED. Double booking is not permitted. Please choose another date or contact venue management directly."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createReservation({
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        eventType,
        eventDate,
        eventTime,
        guestCount: Number(guestCount),
        message: message.trim(),
      });

      if (!res.success || !res.reservation) {
        setErrorMessage(res.error || "Failed to submit reservation. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setConfirmedReservation(res.reservation);
      setIsSubmitting(false);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in-0 duration-200"
    >
      {/* Click outside backdrop to close */}
      <div
        className="fixed inset-0"
        aria-hidden="true"
        onClick={() => {
          if (!isSubmitting) closeBookingModal();
        }}
      />

      {/* Modal Card Container */}
      <div className="relative w-full max-w-2xl my-auto rounded-2xl sm:rounded-3xl border border-brass/40 bg-gradient-to-b from-[#1c1815] via-[#14100e] to-[#0c0a09] text-soft-cream shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Top Gold Shimmer Border */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brass-deep via-brass to-brass-light" />

        {/* Modal Header */}
        <div className="relative px-5 sm:px-8 pt-6 pb-4 border-b border-brass/20 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass/15 border border-brass/35 text-brass-light text-[11px] font-semibold tracking-wider uppercase mb-1.5">
              <Sparkles className="size-3 text-brass" />
              <span>OFFICIAL RESERVATION PORTAL</span>
            </div>
            <h2
              id="booking-modal-title"
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-soft-cream"
            >
              Reserve Your Celebration Date
            </h2>
            <p className="text-xs sm:text-sm text-soft-cream/75 mt-1 font-sans">
              Planning a celebration? Reserve your date with Shahi Junction Villa.
            </p>
          </div>

          <button
            type="button"
            onClick={closeBookingModal}
            aria-label="Close reservation modal"
            className="size-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 text-soft-cream/80 hover:text-white transition-colors border border-white/10 shrink-0 ml-3"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Quick Contact Ribbon */}
        <div className="bg-[#241e1a] px-5 sm:px-8 py-2.5 border-b border-brass/15 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-soft-cream/80 font-medium">Need immediate assistance?</span>
          <div className="flex items-center gap-4">
            <a
              href={RESERVATION_CONTACT.phoneTel}
              className="inline-flex items-center gap-1.5 font-bold text-brass-light hover:text-white transition-colors"
            >
              <PhoneCall className="size-3.5 text-brass" />
              <span>Call: {RESERVATION_CONTACT.phoneDisplay}</span>
            </a>
            <span className="text-brass/40">|</span>
            <a
              href={RESERVATION_CONTACT.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="size-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Modal Body: Either Success View or Reservation Form */}
        <div className="p-5 sm:p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {confirmedReservation ? (
            /* SUCCESS CONFIRMATION VIEW */
            <div className="flex flex-col items-center text-center py-4 sm:py-6 animate-in fade-in-50 zoom-in-95 duration-300">
              <div className="size-16 sm:size-20 rounded-full bg-brass/20 border-2 border-brass flex items-center justify-center text-brass shadow-[0_0_30px_rgba(202,168,106,0.4)] mb-4">
                <CheckCircle2 className="size-9 sm:size-11" strokeWidth={2.2} />
              </div>

              <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                RESERVATION REQUEST SUBMITTED
              </span>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-soft-cream">
                Thank You, {confirmedReservation.customerName}!
              </h3>
              <p className="mt-2 max-w-md text-xs sm:text-sm text-soft-cream/80 leading-relaxed">
                Your celebration reservation request has been received by the Shahi Junction Villa team.
                Our venue coordinator will review and confirm your reservation shortly.
              </p>

              {/* Unique Reservation ID Card */}
              <div className="mt-6 w-full max-w-md p-4 sm:p-5 rounded-2xl bg-black/60 border border-brass/35 shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-brass/20">
                  <div className="text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brass-light block">
                      RESERVATION ID
                    </span>
                    <span className="font-mono text-base sm:text-lg font-bold text-brass">
                      {confirmedReservation.id}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyId(confirmedReservation.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brass/15 hover:bg-brass/25 border border-brass/40 text-brass-light text-xs font-semibold transition-colors"
                  >
                    {copiedId ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                    <span>{copiedId ? "Copied" : "Copy ID"}</span>
                  </button>
                </div>

                {/* Submitted Booking Details */}
                <div className="mt-3 grid grid-cols-2 gap-3 text-left text-xs">
                  <div>
                    <span className="text-soft-cream/50 text-[11px] block">Event Date:</span>
                    <strong className="text-soft-cream font-medium">
                      {new Date(`${confirmedReservation.eventDate}T00:00:00`).toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </strong>
                  </div>
                  <div>
                    <span className="text-soft-cream/50 text-[11px] block">Event Type:</span>
                    <strong className="text-soft-cream font-medium">{confirmedReservation.eventType}</strong>
                  </div>
                  <div>
                    <span className="text-soft-cream/50 text-[11px] block">Preferred Time:</span>
                    <strong className="text-soft-cream font-medium">{confirmedReservation.eventTime}</strong>
                  </div>
                  <div>
                    <span className="text-soft-cream/50 text-[11px] block">Guest Count:</span>
                    <strong className="text-soft-cream font-medium">
                      {confirmedReservation.guestCount} Guests
                    </strong>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-white/10">
                    <span className="text-soft-cream/50 text-[11px] block">Contact Details:</span>
                    <strong className="text-soft-cream font-medium">
                      {confirmedReservation.phone} · {confirmedReservation.email}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <a
                  href={RESERVATION_CONTACT.getWhatsAppBookingUrl(
                    confirmedReservation.id,
                    confirmedReservation.eventDate,
                    confirmedReservation.customerName
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200"
                >
                  <MessageCircle className="size-4" />
                  <span>Confirm on WhatsApp</span>
                </a>

                <a
                  href={RESERVATION_CONTACT.phoneTel}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brass hover:bg-brass-light text-charcoal font-bold text-xs sm:text-sm shadow-md transition-all duration-200"
                >
                  <Phone className="size-4" />
                  <span>Call {RESERVATION_CONTACT.phoneDisplay}</span>
                </a>
              </div>

              <button
                type="button"
                onClick={closeBookingModal}
                className="mt-4 text-xs font-semibold text-soft-cream/70 hover:text-white underline transition-colors"
              >
                Close & Return to Website
              </button>
            </div>
          ) : (
            /* RESERVATION FORM */
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in-50 duration-200">
                  <AlertCircle className="size-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Row 1: Name & Phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="res-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-brass-light mb-1.5"
                  >
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="res-name"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Balwinder Singh"
                      className="h-11 sm:h-12 w-full rounded-xl border border-brass/35 bg-black/40 px-3.5 pl-10 text-sm text-soft-cream placeholder:text-soft-cream/35 focus:border-brass focus:bg-black/60 focus:outline-hidden focus:ring-1 focus:ring-brass transition-all"
                    />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-brass-light/60" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="res-phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-brass-light mb-1.5"
                  >
                    Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="res-phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="h-11 sm:h-12 w-full rounded-xl border border-brass/35 bg-black/40 px-3.5 pl-10 text-sm text-soft-cream placeholder:text-soft-cream/35 focus:border-brass focus:bg-black/60 focus:outline-hidden focus:ring-1 focus:ring-brass transition-all"
                    />
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-brass-light/60" />
                  </div>
                </div>
              </div>

              {/* Row 2: Email & Event Type */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="res-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-brass-light mb-1.5"
                  >
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="res-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. balwinder@gmail.com"
                      className="h-11 sm:h-12 w-full rounded-xl border border-brass/35 bg-black/40 px-3.5 pl-10 text-sm text-soft-cream placeholder:text-soft-cream/35 focus:border-brass focus:bg-black/60 focus:outline-hidden focus:ring-1 focus:ring-brass transition-all"
                    />
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-brass-light/60" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="res-type"
                    className="block text-xs font-semibold uppercase tracking-wider text-brass-light mb-1.5"
                  >
                    Event Type <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="res-type"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value as EventType)}
                      className="h-11 sm:h-12 w-full rounded-xl border border-brass/35 bg-[#171310] px-3.5 text-sm text-soft-cream focus:border-brass focus:outline-hidden focus:ring-1 focus:ring-brass transition-all appearance-none cursor-pointer"
                    >
                      {EVENT_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-[#171310] text-soft-cream">
                          {type}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-brass-light text-xs">
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Event Date & Real-Time Availability */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="res-date"
                    className="block text-xs font-semibold uppercase tracking-wider text-brass-light mb-1.5"
                  >
                    Event Date <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="res-date"
                      required
                      min={todayStr}
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="h-11 sm:h-12 w-full rounded-xl border border-brass/35 bg-black/40 px-3.5 pl-10 text-sm text-soft-cream focus:border-brass focus:bg-black/60 focus:outline-hidden focus:ring-1 focus:ring-brass transition-all cursor-pointer"
                    />
                    <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-brass-light/60" />
                  </div>

                  {/* Real-time date availability badge */}
                  {eventDate && (
                    <div className="mt-2">
                      {isCheckingDate ? (
                        <div className="flex items-center gap-1.5 text-xs text-soft-cream/60">
                          <Loader2 className="size-3 animate-spin text-brass" />
                          <span>Checking availability...</span>
                        </div>
                      ) : availability?.isBooked ? (
                        <div className="p-2.5 rounded-lg bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2 animate-in fade-in-50">
                          <span className="size-2 rounded-full bg-rose-500 shrink-0" />
                          <span className="font-semibold">BOOKED:</span>
                          <span>This date is reserved. Please pick another date.</span>
                        </div>
                      ) : availability?.isPending ? (
                        <div className="p-2.5 rounded-lg bg-amber-950/70 border border-amber-500/50 text-amber-200 text-xs flex items-center gap-2 animate-in fade-in-50">
                          <span className="size-2 rounded-full bg-amber-400 shrink-0 animate-pulse" />
                          <span className="font-semibold">PENDING REVIEW:</span>
                          <span>An inquiry is under review for this date. Standby booking allowed.</span>
                        </div>
                      ) : availability?.isAvailable ? (
                        <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in-50">
                          <span className="size-2 rounded-full bg-emerald-400 shrink-0" />
                          <span className="font-semibold">AVAILABLE:</span>
                          <span>This date is currently open for booking.</span>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>

                {/* Number of Guests */}
                <div>
                  <label
                    htmlFor="res-guests"
                    className="block text-xs font-semibold uppercase tracking-wider text-brass-light mb-1.5"
                  >
                    Estimated Guests <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="res-guests"
                      required
                      min={20}
                      max={3000}
                      step={25}
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder="e.g. 400"
                      className="h-11 sm:h-12 w-full rounded-xl border border-brass/35 bg-black/40 px-3.5 pl-10 text-sm text-soft-cream placeholder:text-soft-cream/35 focus:border-brass focus:bg-black/60 focus:outline-hidden focus:ring-1 focus:ring-brass transition-all"
                    />
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-brass-light/60" />
                  </div>

                  {/* Quick guest count selector pills */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {[150, 300, 500, 800, 1200].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestCount(num)}
                        className={`px-2 py-0.5 text-[11px] rounded-md border transition-colors ${
                          guestCount === num
                            ? "bg-brass text-charcoal font-bold border-brass"
                            : "bg-white/5 text-soft-cream/70 border-white/10 hover:border-brass/40"
                        }`}
                      >
                        {num}+
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 4: Preferred Time */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brass-light mb-1.5">
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {EVENT_TIMES.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setEventTime(time)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        eventTime === time
                          ? "bg-brass/25 border-brass text-brass-light font-bold shadow-xs"
                          : "bg-black/30 border-brass/20 text-soft-cream/75 hover:border-brass/50"
                      }`}
                    >
                      <span className="block font-semibold">{time.split(" (")[0]}</span>
                      <span className="block text-[10px] text-soft-cream/60">
                        {time.includes("(") ? `(${time.split("(")[1]}` : ""}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 5: Special Requirements / Message */}
              <div>
                <label
                  htmlFor="res-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-brass-light mb-1.5"
                >
                  Special Requirements / Message
                </label>
                <div className="relative">
                  <textarea
                    id="res-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share any special preferences (indoor ballroom vs lawns, catering style, DJ, rooms, decoration)..."
                    className="w-full rounded-xl border border-brass/35 bg-black/40 p-3 text-xs sm:text-sm text-soft-cream placeholder:text-soft-cream/35 focus:border-brass focus:bg-black/60 focus:outline-hidden focus:ring-1 focus:ring-brass transition-all resize-none"
                  />
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-black/40 border border-brass/20 text-xs text-soft-cream/75">
                <ShieldCheck className="size-4 text-brass shrink-0" />
                <span>
                  No immediate payment required. Submitting secures your inquiry for priority date review.
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || availability?.isBooked}
                  className="inline-flex h-12 sm:h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brass-deep via-brass to-brass-light px-8 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-charcoal shadow-lg hover:scale-[1.01] hover:shadow-[0_8px_25px_rgba(202,168,106,0.35)] active:translate-y-px transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin text-charcoal" />
                      <span>Submitting Reservation...</span>
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="size-4 text-charcoal" />
                      <span>
                        {availability?.isBooked ? "Date Already Booked" : "Submit Reservation Request"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
