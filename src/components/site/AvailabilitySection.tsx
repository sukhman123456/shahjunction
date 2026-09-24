import { useState, useEffect, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Ban,
  PhoneCall,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import {
  getAllDateAvailabilityMap,
  subscribeToReservationChanges,
  RESERVATION_CONTACT,
  type DateAvailability,
} from "@/lib/reservations";
import { Reveal } from "./Reveal";

export function AvailabilitySection() {
  const { openBookingModal, openAdminModal } = useBooking();

  // Selected date state (defaults to today or tomorrow)
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDateStr, setSelectedDateStr] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().split("T")[0] || "";
  });

  // Availability map: YYYY-MM-DD -> "AVAILABLE" | "PENDING" | "BOOKED"
  const [availabilityMap, setAvailabilityMap] = useState<Record<string, DateAvailability>>({});

  // Fetch real availability map
  const refreshAvailability = () => {
    getAllDateAvailabilityMap().then(setAvailabilityMap);
  };

  useEffect(() => {
    refreshAvailability();
    const unsubscribe = subscribeToReservationChanges(refreshAvailability);
    return unsubscribe;
  }, []);

  // Calendar calculations
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday

  // Month navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };
  const goToToday = () => {
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDateStr(today.toISOString().split("T")[0] || "");
  };

  // Status of the currently selected date
  const selectedStatus: DateAvailability = availabilityMap[selectedDateStr] || "AVAILABLE";

  const isSelectedPast = useMemo(() => {
    if (!selectedDateStr) return false;
    const sel = new Date(`${selectedDateStr}T00:00:00`);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return sel < t;
  }, [selectedDateStr]);

  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDateStr) return "";
    const parts = selectedDateStr.split("-").map(Number);
    const y = parts[0] ?? 2026;
    const m = parts[1] ?? 1;
    const d = parts[2] ?? 1;
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [selectedDateStr]);

  return (
    <section
      id="reservations"
      className="relative bg-gradient-to-b from-[#0e0c0a] via-[#16120f] to-[#0c0a09] py-20 sm:py-28 lg:py-32 text-soft-cream overflow-hidden border-t border-brass/30"
    >
      {/* Glow background decorations */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brass/10 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/5 blur-[140px] rounded-full" />

      <div className="container-site relative z-10 max-w-6xl">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brass/15 border border-brass/40 text-brass-light text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
              <Sparkles className="size-3.5 text-brass" />
              <span>LIVE AVAILABILITY · ਤਾਰੀਖਾਂ ਦੀ ਉਪਲਬਧਤਾ</span>
              <Sparkles className="size-3.5 text-brass" />
            </div>

            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight text-soft-cream leading-tight">
              CHECK DATE AVAILABILITY
            </h2>

            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="h-[1.5px] w-14 bg-gradient-to-r from-transparent via-brass to-brass/40" />
              <span className="text-brass text-sm">❖</span>
              <span className="h-[1.5px] w-14 bg-gradient-to-l from-transparent via-brass to-brass/40" />
            </div>

            <p className="mt-4 text-sm sm:text-base text-soft-cream/80 leading-relaxed font-sans">
              Select your preferred wedding or celebration date to check live venue availability.
              We update our reservations in real time so you can plan with total clarity and confidence.
            </p>
          </div>
        </Reveal>

        {/* Main Calendar & Date Inspector Grid */}
        <Reveal delay={120} className="mt-12 sm:mt-16">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Month Calendar (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl border border-brass/35 bg-gradient-to-b from-[#1b1613] via-[#14100e] to-[#0d0a09] p-5 sm:p-7 shadow-2xl">
              {/* Calendar Controls */}
              <div className="flex items-center justify-between pb-5 border-b border-brass/20">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-brass/15 border border-brass/35 text-brass-light">
                    <CalendarIcon className="size-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-soft-cream">
                      {monthName}
                    </h3>
                    <span className="text-[10px] text-brass-light uppercase tracking-widest font-semibold block">
                      Venue Calendar
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={goToToday}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 text-soft-cream/80 hover:text-white border border-white/10 transition-colors"
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={prevMonth}
                    aria-label="Previous month"
                    className="size-8 rounded-lg flex items-center justify-center bg-black/40 hover:bg-brass/20 border border-brass/30 text-soft-cream transition-colors"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextMonth}
                    aria-label="Next month"
                    className="size-8 rounded-lg flex items-center justify-center bg-black/40 hover:bg-brass/20 border border-brass/30 text-soft-cream transition-colors"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Day Name Headers */}
              <div className="grid grid-cols-7 gap-1 sm:gap-1.5 pt-4 text-center">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, idx) => (
                  <div
                    key={idx}
                    className={`py-1.5 text-xs font-semibold uppercase tracking-wider ${
                      idx === 0 ? "text-amber-400/80" : "text-soft-cream/60"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Day Cells Grid */}
              <div className="grid grid-cols-7 gap-1 sm:gap-1.5 pt-2">
                {/* Empty filler cells for start of month */}
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square rounded-xl opacity-0 pointer-events-none" />
                ))}

                {/* Days of Month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                  const isSelected = selectedDateStr === dateStr;
                  const dateStatus = availabilityMap[dateStr] || "AVAILABLE";

                  const cellDate = new Date(year, month, dayNum);
                  const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                  const isToday =
                    cellDate.getDate() === today.getDate() &&
                    cellDate.getMonth() === today.getMonth() &&
                    cellDate.getFullYear() === today.getFullYear();

                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={() => setSelectedDateStr(dateStr)}
                      className={`group relative flex flex-col items-center justify-between p-1 sm:p-1.5 aspect-square rounded-xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-brass/25 border-brass text-white shadow-[0_0_15px_rgba(202,168,106,0.35)] scale-[1.04] z-10"
                          : isPast
                          ? "bg-black/20 border-white/5 text-soft-cream/35 hover:bg-black/30 hover:border-white/10"
                          : "bg-black/40 border-brass/15 text-soft-cream hover:border-brass/50 hover:bg-brass/10"
                      }`}
                    >
                      {/* Day number & Today pill */}
                      <span
                        className={`text-xs sm:text-sm font-semibold ${
                          isSelected ? "text-brass-light font-bold" : ""
                        }`}
                      >
                        {dayNum}
                      </span>

                      {/* Status indicator dot */}
                      <div className="flex items-center justify-center">
                        {dateStatus === "BOOKED" ? (
                          <span
                            title="Date Booked"
                            className="size-2 sm:size-2.5 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)]"
                          />
                        ) : dateStatus === "PENDING" ? (
                          <span
                            title="Under Review"
                            className="size-2 sm:size-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_rgba(251,191,36,0.8)]"
                          />
                        ) : !isPast ? (
                          <span
                            title="Available"
                            className="size-1.5 rounded-full bg-emerald-500/60 group-hover:bg-emerald-400"
                          />
                        ) : null}
                      </div>

                      {/* Subtle Today dot */}
                      {isToday && (
                        <span className="absolute -top-1 -right-1 size-2 rounded-full bg-brass ring-2 ring-[#1b1613]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Status Color Legend */}
              <div className="mt-6 pt-4 border-t border-brass/20 flex flex-wrap items-center justify-between gap-3 text-xs text-soft-cream/80">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-amber-400" />
                    <span>Under Review</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-rose-500" />
                    <span>Booked / Reserved</span>
                  </div>
                </div>

                <span className="text-[11px] text-soft-cream/50 italic">
                  Strictly verified records only
                </span>
              </div>
            </div>

            {/* Right Column: Selected Date Inspector Card (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl border border-brass/40 bg-gradient-to-b from-[#1e1814] via-[#16120f] to-[#0f0d0b] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Background ambient corner glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brass/10 blur-3xl rounded-full pointer-events-none" />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-brass/20">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-brass-light flex items-center gap-1.5">
                      <Sparkles className="size-3 text-brass" />
                      SELECTED CELEBRATION DATE
                    </span>

                    {/* Status Pill */}
                    {selectedStatus === "BOOKED" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/60 text-rose-300 text-xs font-bold shadow-sm">
                        <Ban className="size-3 text-rose-400" />
                        BOOKED
                      </span>
                    ) : selectedStatus === "PENDING" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/60 text-amber-300 text-xs font-bold shadow-sm">
                        <Clock className="size-3 text-amber-400 animate-pulse" />
                        UNDER REVIEW
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-bold shadow-sm">
                        <CheckCircle2 className="size-3 text-emerald-400" />
                        AVAILABLE
                      </span>
                    )}
                  </div>

                  {/* Big Formatted Date Display */}
                  <div className="mt-5">
                    <p className="font-display text-2xl sm:text-3xl font-bold text-soft-cream leading-tight">
                      {formattedSelectedDate}
                    </p>
                    <p className="text-xs text-brass-light/80 font-mono mt-1">
                      ISO: {selectedDateStr}
                    </p>
                  </div>

                  {/* Status Explanation Card */}
                  <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-brass/20">
                    {selectedStatus === "BOOKED" ? (
                      <div>
                        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                          <Lock className="size-4" />
                          <span>Date Confirmed & Reserved</span>
                        </div>
                        <p className="mt-1.5 text-xs text-soft-cream/75 leading-relaxed">
                          This date is confirmed for an event at Shahi Junction Villa. To maintain exclusivity,
                          double bookings are not accepted for confirmed dates.
                        </p>
                        <p className="mt-2 text-xs text-brass-light font-medium">
                          Tip: Please select another adjacent date or contact venue management for standby options.
                        </p>
                      </div>
                    ) : selectedStatus === "PENDING" ? (
                      <div>
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                          <Clock className="size-4" />
                          <span>Inquiry Under Review</span>
                        </div>
                        <p className="mt-1.5 text-xs text-soft-cream/75 leading-relaxed">
                          A client inquiry is currently in progress for this date. You may still submit a priority
                          standby reservation request.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                          <CheckCircle2 className="size-4" />
                          <span>No Reservations Yet — This Date is Available</span>
                        </div>
                        <p className="mt-1.5 text-xs text-soft-cream/75 leading-relaxed">
                          This date is open for full palace booking (Grand Hall, Marquee Lawns, VIP Lounge & Catering).
                          Submit your reservation now to lock in your preferred date.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Privacy Assurance */}
                  <div className="mt-4 flex items-center gap-2 text-[11px] text-soft-cream/60">
                    <ShieldCheck className="size-3.5 text-brass shrink-0" />
                    <span>Customer privacy protected: No personal data is published.</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-brass/20 space-y-3">
                  {/* Primary CTA */}
                  {selectedStatus === "BOOKED" ? (
                    <button
                      type="button"
                      onClick={() => openBookingModal()}
                      className="w-full h-12 rounded-xl bg-white/10 hover:bg-white/15 text-soft-cream font-bold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Explore Another Available Date</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isSelectedPast}
                      onClick={() => openBookingModal(selectedDateStr)}
                      className="w-full h-12 sm:h-14 rounded-xl bg-gradient-to-r from-brass-deep via-brass to-brass-light hover:to-white text-charcoal font-bold text-xs sm:text-sm uppercase tracking-[0.16em] shadow-lg hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <CalendarIcon className="size-4" />
                      <span>
                        {isSelectedPast ? "Date Cannot Be in Past" : `BOOK ${selectedDateStr} NOW`}
                      </span>
                    </button>
                  )}

                  {/* Direct Contact Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={RESERVATION_CONTACT.phoneTel}
                      className="inline-flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-black/50 hover:bg-black/70 border border-brass/30 text-brass-light hover:text-white text-xs font-bold transition-colors"
                    >
                      <PhoneCall className="size-3.5 text-brass" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href={RESERVATION_CONTACT.whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold transition-colors"
                    >
                      <MessageCircle className="size-3.5 text-emerald-400" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
