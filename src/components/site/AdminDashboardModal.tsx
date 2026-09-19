import { useState, useEffect } from "react";
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  Ban,
  Trash2,
  Calendar,
  Phone,
  Mail,
  Users,
  ShieldCheck,
  Lock,
  Unlock,
  Sparkles,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import {
  getReservations,
  updateReservationStatus,
  deleteReservation,
  subscribeToReservationChanges,
  type Reservation,
  type ReservationStatus,
} from "@/lib/reservations";

export function AdminDashboardModal() {
  const { isAdminModalOpen, closeAdminModal } = useBooking();

  // Authentication PIN state (Simple passkey for staff: default 1234)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Reservations state
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ReservationStatus>("ALL");
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchReservations = async () => {
    const list = await getReservations();
    setReservations(list);
  };

  useEffect(() => {
    if (isAdminModalOpen) {
      fetchReservations();
    }
  }, [isAdminModalOpen]);

  useEffect(() => {
    const unsubscribe = subscribeToReservationChanges(fetchReservations);
    return unsubscribe;
  }, []);

  // Handle ESC key
  useEffect(() => {
    if (!isAdminModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAdminModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isAdminModalOpen, closeAdminModal]);

  if (!isAdminModalOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234 or "shahi"
    if (pinInput.trim() === "1234" || pinInput.trim().toLowerCase() === "shahi") {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleStatusChange = async (id: string, newStatus: ReservationStatus) => {
    try {
      setActionMessage(null);
      await updateReservationStatus(id, newStatus);
      await fetchReservations();
      setActionMessage(`Reservation ${id} updated to ${newStatus}.`);
      setTimeout(() => setActionMessage(null), 3000);
    } catch (err: any) {
      setActionMessage(`Error: ${err.message}`);
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(`Are you sure you want to delete reservation ${id}? This action cannot be undone.`)) {
      await deleteReservation(id);
      await fetchReservations();
      if (selectedReservation?.id === id) setSelectedReservation(null);
      setActionMessage(`Reservation ${id} deleted.`);
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  // Filtered reservations
  const filtered = reservations.filter((r) => {
    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      r.id.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.eventType.toLowerCase().includes(q) ||
      r.eventDate.includes(q);
    return matchesStatus && matchesQuery;
  });

  const totalCount = reservations.length;
  const pendingCount = reservations.filter((r) => r.status === "Pending").length;
  const confirmedCount = reservations.filter((r) => r.status === "Confirmed").length;
  const cancelledCount = reservations.filter((r) => r.status === "Cancelled").length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in-0 duration-200"
    >
      <div className="fixed inset-0" aria-hidden="true" onClick={closeAdminModal} />

      <div className="relative w-full max-w-5xl my-auto rounded-2xl sm:rounded-3xl border border-brass/40 bg-[#14100e] text-soft-cream shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Top Hairline Shimmer */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brass-deep via-brass to-brass-light" />

        {/* Header */}
        <div className="px-5 sm:px-8 py-5 border-b border-brass/20 flex items-center justify-between bg-[#1a1410]">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-brass/20 text-brass-light border border-brass/40">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-soft-cream flex items-center gap-2">
                <span>Shahi Junction Villa</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-brass/20 border border-brass/40 text-brass-light uppercase tracking-wider font-sans font-semibold">
                  Staff Portal
                </span>
              </h2>
              <p className="text-xs text-soft-cream/60">
                Reservation & Booking Management System
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeAdminModal}
            aria-label="Close admin modal"
            className="size-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 text-soft-cream/80 hover:text-white transition-colors border border-white/10"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* PIN Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="size-16 rounded-2xl bg-brass/15 border border-brass/35 text-brass flex items-center justify-center mb-4 shadow-lg">
              <Lock className="size-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-soft-cream">
              Staff Passkey Required
            </h3>
            <p className="text-xs sm:text-sm text-soft-cream/70 max-w-sm mt-1.5">
              Enter your staff access PIN to manage reservations, confirm dates, and update calendar availability.
            </p>

            <form onSubmit={handlePinSubmit} className="mt-6 w-full max-w-xs space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  autoFocus
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (Default: 1234)"
                  className="h-12 w-full text-center tracking-[0.3em] font-mono text-lg rounded-xl border border-brass/40 bg-black/60 px-4 text-soft-cream focus:border-brass focus:outline-hidden focus:ring-1 focus:ring-brass"
                />
                {pinError && (
                  <p className="text-xs text-rose-400 mt-1.5">
                    Invalid PIN. (Staff default: 1234)
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-brass hover:bg-brass-light text-charcoal font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Unlock className="size-4" />
                <span>Unlock Management Dashboard</span>
              </button>

              <p className="text-[11px] text-soft-cream/50">
                Authorized villa coordinators & managers only.
              </p>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 custom-scrollbar">
            {/* Action Feedback Banner */}
            {actionMessage && (
              <div className="p-3 rounded-xl bg-brass/20 border border-brass/40 text-brass-light text-xs font-semibold flex items-center gap-2 animate-in fade-in-50">
                <Sparkles className="size-4 text-brass" />
                <span>{actionMessage}</span>
              </div>
            )}

            {/* Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-brass/20">
                <span className="text-xs text-soft-cream/60 block">Total Requests</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-soft-cream">
                  {totalCount}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30">
                <span className="text-xs text-amber-300 block">Pending Review</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-amber-400">
                  {pendingCount}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                <span className="text-xs text-emerald-300 block">Confirmed (Booked)</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-emerald-400">
                  {confirmedCount}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30">
                <span className="text-xs text-rose-300 block">Cancelled</span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-rose-400">
                  {cancelledCount}
                </span>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ID, name, phone, email, date..."
                  className="h-10 w-full rounded-xl border border-brass/30 bg-black/50 pl-9 pr-3 text-xs text-soft-cream placeholder:text-soft-cream/40 focus:border-brass focus:outline-hidden focus:ring-1 focus:ring-brass"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-brass/70" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-soft-cream/50 hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/50 border border-brass/20 text-xs overflow-x-auto">
                {(["ALL", "Pending", "Confirmed", "Cancelled"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      statusFilter === st
                        ? "bg-brass text-charcoal font-bold shadow-xs"
                        : "text-soft-cream/70 hover:text-white"
                    }`}
                  >
                    {st === "ALL" ? "All Requests" : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Reservation List */}
            {filtered.length === 0 ? (
              <div className="p-12 rounded-2xl bg-black/30 border border-brass/15 text-center">
                <Calendar className="size-10 text-brass/40 mx-auto mb-2" />
                <h4 className="font-display text-lg font-bold text-soft-cream">
                  {reservations.length === 0
                    ? "No reservations yet — this date is available."
                    : "No matching reservations found"}
                </h4>
                <p className="text-xs text-soft-cream/60 mt-1 max-w-sm mx-auto">
                  {reservations.length === 0
                    ? "Actual client reservations will appear here automatically when submitted from the website."
                    : "Try adjusting your search query or filter."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-brass/25 hover:border-brass/50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    {/* Left details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-brass px-2 py-0.5 rounded-md bg-brass/15 border border-brass/30">
                          {r.id}
                        </span>

                        {r.status === "Confirmed" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400">
                            <CheckCircle2 className="size-3" /> CONFIRMED (BOOKED)
                          </span>
                        ) : r.status === "Pending" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-500/50 text-amber-400">
                            <Clock className="size-3 animate-pulse" /> PENDING REVIEW
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-950 border border-rose-500/50 text-rose-400">
                            <Ban className="size-3" /> CANCELLED
                          </span>
                        )}

                        <span className="text-xs text-soft-cream/60">
                          Created: {new Date(r.createdAt).toLocaleDateString("en-IN")}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                        <strong className="text-soft-cream font-bold text-base">
                          {r.customerName}
                        </strong>
                        <a
                          href={`tel:${r.phone}`}
                          className="inline-flex items-center gap-1 text-brass-light hover:underline font-medium"
                        >
                          <Phone className="size-3 text-brass" /> {r.phone}
                        </a>
                        <a
                          href={`mailto:${r.email}`}
                          className="inline-flex items-center gap-1 text-soft-cream/80 hover:underline"
                        >
                          <Mail className="size-3 text-brass" /> {r.email}
                        </a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-soft-cream/75 pt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-3.5 text-brass" />
                          <span>
                            Date: <strong>{r.eventDate}</strong> ({r.eventTime})
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="size-3.5 text-brass" />
                          <span>
                            Guests: <strong>{r.guestCount}</strong>
                          </span>
                        </div>
                        <div className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-brass-light font-semibold">
                          {r.eventType}
                        </div>
                      </div>

                      {r.message && (
                        <p className="text-xs text-soft-cream/70 italic bg-white/5 p-2.5 rounded-lg border border-white/5">
                          "{r.message}"
                        </p>
                      )}
                    </div>

                    {/* Right action controls */}
                    <div className="flex flex-wrap lg:flex-col gap-2 shrink-0 items-end justify-start">
                      <div className="flex items-center gap-1.5">
                        {r.status !== "Confirmed" && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(r.id, "Confirmed")}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-colors"
                          >
                            <CheckCircle2 className="size-3" />
                            <span>Confirm (Lock Date)</span>
                          </button>
                        )}

                        {r.status !== "Pending" && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(r.id, "Pending")}
                            className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-colors"
                          >
                            <Clock className="size-3" />
                            <span>Set Pending</span>
                          </button>
                        )}

                        {r.status !== "Cancelled" && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(r.id, "Cancelled")}
                            className="px-3 py-1.5 rounded-lg bg-rose-800/80 hover:bg-rose-700 text-rose-100 font-semibold text-xs flex items-center gap-1 transition-colors"
                          >
                            <Ban className="size-3" />
                            <span>Cancel</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDelete(r.id)}
                          aria-label="Delete reservation"
                          title="Delete permanently"
                          className="size-8 rounded-lg bg-white/5 hover:bg-rose-900/60 text-soft-cream/70 hover:text-rose-200 border border-white/10 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
