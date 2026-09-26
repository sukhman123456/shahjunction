import { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Ban,
  Trash2,
  Phone,
  Mail,
  Users,
  ShieldCheck,
  Lock,
  Unlock,
  Sparkles,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  KeyRound,
  Check,
  AlertTriangle,
  LogOut,
  BookmarkCheck,
  ExternalLink,
  ArrowLeft,
  Search,
} from "lucide-react";
import {
  getReservations,
  updateReservationStatus,
  deleteReservation,
  subscribeToReservationChanges,
  getDateOverrides,
  setDateOverride,
  removeDateOverride,
  getAdminPassword,
  setAdminPassword,
  verifyAdminPassword,
  getAllDateAvailabilityMap,
  RESERVATION_CONTACT,
  type Reservation,
  type ReservationStatus,
  type DateAvailability,
  type DateOverride,
} from "@/lib/reservations";
import { business } from "@/lib/business";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Owner Admin Portal | Shah Junction Villa" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Active Tab: CALENDAR | RESERVATIONS | SETTINGS
  const [activeTab, setActiveTab] = useState<"CALENDAR" | "RESERVATIONS" | "SETTINGS">("CALENDAR");

  // Notifications
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Calendar Management State
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => new Date().toISOString().split("T")[0] || "", []);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<string>(() => todayStr);
  const [selectedStatus, setSelectedStatus] = useState<DateAvailability>("AVAILABLE");
  const [overrideNote, setOverrideNote] = useState("");
  const [overrides, setOverrides] = useState<DateOverride[]>([]);
  const [availabilityMap, setAvailabilityMap] = useState<Record<string, DateAvailability>>({});

  // Reservations State
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ReservationStatus>("ALL");

  // Settings State (Change Admin Password)
  const [currentPassVerify, setCurrentPassVerify] = useState("");
  const [newPassInput, setNewPassInput] = useState("");
  const [confirmPassInput, setConfirmPassInput] = useState("");
  const [settingsFeedback, setSettingsFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load all data
  const loadData = () => {
    getReservations().then(setReservations);
    const ovs = getDateOverrides();
    setOverrides(ovs);
    getAllDateAvailabilityMap().then(setAvailabilityMap);
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeToReservationChanges(loadData);
    return unsubscribe;
  }, []);

  // Sync selected date status & note when date changes
  useEffect(() => {
    if (!selectedDate) return;
    const currentOv = overrides.find((o) => o.date === selectedDate);
    const currentStatus = availabilityMap[selectedDate] || "AVAILABLE";
    setSelectedStatus(currentStatus);
    setOverrideNote(currentOv?.note || "");
  }, [selectedDate, overrides, availabilityMap]);

  // Handle Password Submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPassword(passwordInput)) {
      setIsAuthenticated(true);
      setPasswordError(false);
      setPasswordInput("");
    } else {
      setPasswordError(true);
    }
  };

  // Calendar Controls
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));
  const goToToday = () => {
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(todayStr);
  };

  // Save or update calendar date status
  const handleSaveDateStatus = (statusToSave?: DateAvailability) => {
    const targetStatus = statusToSave || selectedStatus;
    if (!selectedDate) return;

    if (targetStatus === "AVAILABLE" && !overrideNote.trim()) {
      removeDateOverride(selectedDate);
      setActionMessage(`ਤਾਰੀਖ਼ ${selectedDate} ਨੂੰ AVAILABLE (ਖੁੱਲ੍ਹੀ) ਕਰ ਦਿੱਤਾ ਗਿਆ ਹੈ।`);
    } else {
      setDateOverride(selectedDate, targetStatus, overrideNote);
      setActionMessage(
        `ਤਾਰੀਖ਼ ${selectedDate} ਨੂੰ ਸਫਲਤਾਪੂਰਵਕ ${targetStatus} (${
          targetStatus === "BOOKED" ? "ਲਾਕ / ਬੁੱਕ" : targetStatus === "PENDING" ? "ਹੋਲਡ" : "ਖੁੱਲ੍ਹੀ"
        }) ਕੀਤਾ ਗਿਆ!`
      );
    }

    loadData();
    setTimeout(() => setActionMessage(null), 3500);
  };

  // Remove/Unlock date override
  const handleUnlockDate = (date: string) => {
    removeDateOverride(date);
    loadData();
    setActionMessage(`ਤਾਰੀਖ਼ ${date} ਤੋਂ ਲਾਕ ਹਟਾ ਦਿੱਤਾ ਗਿਆ ਹੈ (Available ਹੋ ਗਈ)।`);
    setTimeout(() => setActionMessage(null), 3500);
  };

  // Reservations handlers
  const handleStatusChange = async (id: string, newStatus: ReservationStatus) => {
    try {
      setActionMessage(null);
      await updateReservationStatus(id, newStatus);
      loadData();
      setActionMessage(`Reservation ${id} updated to ${newStatus}.`);
      setTimeout(() => setActionMessage(null), 3000);
    } catch (err: any) {
      setActionMessage(`Error: ${err.message}`);
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const handleDeleteReservation = async (id: string) => {
    if (window.confirm(`Are you sure you want to delete reservation ${id}? This cannot be undone.`)) {
      await deleteReservation(id);
      loadData();
      setActionMessage(`Reservation ${id} deleted.`);
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  // Password change handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsFeedback(null);

    if (!verifyAdminPassword(currentPassVerify)) {
      setSettingsFeedback({ type: "error", text: "ਮੌਜੂਦਾ ਪਾਸਵਰਡ ਗਲਤ ਹੈ। (Current password is incorrect)" });
      return;
    }

    if (!newPassInput || newPassInput.trim().length < 4) {
      setSettingsFeedback({
        type: "error",
        text: "ਨਵਾਂ ਪਾਸਵਰਡ ਘੱਟੋ-ਘੱਟ 4 ਅੱਖਰਾਂ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ। (Min 4 characters)",
      });
      return;
    }

    if (newPassInput !== confirmPassInput) {
      setSettingsFeedback({
        type: "error",
        text: "ਨਵਾਂ ਪਾਸਵਰਡ ਅਤੇ ਕਨਫਰਮ ਪਾਸਵਰਡ ਮੇਲ ਨਹੀਂ ਖਾਂਦੇ। (Passwords do not match)",
      });
      return;
    }

    const success = setAdminPassword(newPassInput.trim());
    if (success) {
      setSettingsFeedback({
        type: "success",
        text: "ਪਾਸਵਰਡ ਸਫਲਤਾਪੂਰਵਕ ਬਦਲ ਦਿੱਤਾ ਗਿਆ ਹੈ! (Admin password updated successfully)",
      });
      setCurrentPassVerify("");
      setNewPassInput("");
      setConfirmPassInput("");
    } else {
      setSettingsFeedback({ type: "error", text: "ਪਾਸਵਰਡ ਅੱਪਡੇਟ ਕਰਨ ਵਿੱਚ ਗਲਤੀ ਆਈ।" });
    }
  };

  // Filtered reservations
  const filteredReservations = reservations.filter((r) => {
    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      r.id.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      (r.email ? r.email.toLowerCase().includes(q) : false) ||
      r.eventType.toLowerCase().includes(q) ||
      r.eventDate.includes(q);
    return matchesStatus && matchesQuery;
  });

  const totalCount = reservations.length;
  const pendingCount = reservations.filter((r) => r.status === "Pending").length;
  const confirmedCount = reservations.filter((r) => r.status === "Confirmed").length;
  const cancelledCount = reservations.filter((r) => r.status === "Cancelled").length;
  const bookedDatesCount = Object.values(availabilityMap).filter((s) => s === "BOOKED").length;

  return (
    <div className="min-h-screen bg-[#0d0b09] text-soft-cream flex flex-col selection:bg-brass selection:text-charcoal font-sans">
      {/* Top Gold Shimmer Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-brass-deep via-brass to-brass-light shrink-0" />

      {/* Top Navigation Bar */}
      <header className="border-b border-brass/25 bg-[#14100d]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-10 sm:size-11 rounded-xl bg-brass/20 text-brass border border-brass/40 flex items-center justify-center shadow-inner group-hover:border-brass transition-colors">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg sm:text-xl font-bold text-soft-cream tracking-tight">
                  {business.name}
                </span>
                <span className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-brass/20 border border-brass/40 text-brass-light uppercase tracking-wider font-semibold">
                  Owner Portal
                </span>
              </div>
              <p className="text-[11px] text-soft-cream/60 hidden sm:block">
                ਕੈਲੰਡਰ ਤਾਰੀਖ਼ਾਂ ਅਤੇ ਬੁਕਿੰਗਾਂ ਦਾ ਗੁਪਤ ਪ੍ਰਬੰਧਨ (Private Admin URL: /admin)
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-rose-950/60 border border-white/10 hover:border-rose-500/40 text-xs text-soft-cream/80 hover:text-rose-200 transition-colors cursor-pointer"
            >
              <LogOut className="size-3.5" />
              <span>Log Out</span>
            </button>
          )}

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brass/15 hover:bg-brass/25 border border-brass/35 text-brass-light hover:text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            <span>ਵੈੱਬਸਾਈਟ ਵੇਖੋ (Visit Website)</span>
          </Link>
        </div>
      </header>

      {/* Action Notification Banner */}
      {actionMessage && (
        <div className="bg-brass/20 border-b border-brass/40 px-6 py-2.5 text-brass-light text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 animate-in fade-in-50">
          <Sparkles className="size-4 text-brass shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        {!isAuthenticated ? (
          /* 1. SECURE OWNER PASSWORD GATE */
          <div className="my-auto py-12 flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1c1612] via-[#14100d] to-[#0c0a08] border border-brass/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <div className="size-16 sm:size-20 rounded-3xl bg-gradient-to-tr from-brass-deep/40 to-brass/20 border-2 border-brass/50 text-brass flex items-center justify-center mx-auto mb-5 shadow-[0_0_35px_rgba(202,168,106,0.25)]">
                <Lock className="size-8 sm:size-10" />
              </div>

              <span className="px-3.5 py-1 rounded-full bg-brass/15 border border-brass/35 text-brass-light text-[11px] font-bold uppercase tracking-wider mb-2 inline-block">
                PRIVATE OWNER ACCESS
              </span>

              <h1 className="font-display text-2xl sm:text-3xl font-bold text-soft-cream">
                Owner Password Required
              </h1>
              <p className="text-xs sm:text-sm text-soft-cream/70 mt-2 leading-relaxed">
                ਇਹ ਪੇਜ ਸਿਰਫ਼ ਮਹਿਲ ਦੇ ਮਾਲਕ (Owner) ਲਈ ਹੈ। ਕੈਲੰਡਰ ਤਾਰੀਖ਼ਾਂ ਨੂੰ ਲਾਕ ਜਾਂ ਖੋਲ੍ਹਣ ਲਈ ਆਪਣਾ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ।
              </p>

              <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    autoFocus
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError(false);
                    }}
                    placeholder="Enter Owner Password"
                    className="h-12 w-full text-center font-mono text-base rounded-xl border border-brass/40 bg-black/60 px-10 text-soft-cream focus:border-brass focus:outline-hidden focus:ring-1 focus:ring-brass transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-soft-cream/50 hover:text-soft-cream p-1 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>

                {passwordError && (
                  <div className="p-2.5 rounded-lg bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-center justify-center gap-1.5 animate-in fade-in-50">
                    <AlertTriangle className="size-3.5 shrink-0 text-rose-400" />
                    <span>ਗਲਤ ਪਾਸਵਰਡ ਹੈ! (Default: <strong>shah2026</strong> ਜਾਂ <strong>1234</strong>)</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-brass-deep via-brass to-brass-light hover:to-white text-charcoal font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:scale-[1.01] active:translate-y-px transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Unlock className="size-4" />
                  <span>Unlock Owner Portal</span>
                </button>
              </form>

              <div className="mt-6 p-3.5 rounded-xl bg-black/40 border border-brass/20 text-[11px] text-soft-cream/65 text-left space-y-1">
                <p>
                  🔑 <strong>ਪਾਸਵਰਡ ਸੁਝਾਅ:</strong> <strong>shah2026</strong> ਜਾਂ <strong>1234</strong>
                </p>
                <p className="text-soft-cream/50 text-[10px]">
                  ਇਹ ਲਿੰਕ ਸਿਰਫ਼ ਤੁਹਾਨੂੰ ਪਤਾ ਹੈ (URL: <strong>/admin</strong>). ਵੈੱਬਸਾਈਟ 'ਤੇ ਕਿਸੇ ਆਮ ਯੂਜ਼ਰ ਨੂੰ ਇਹ ਬਟਨ ਨਹੀਂ ਦਿਸੇਗਾ।
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* 2. AUTHENTICATED OWNER DASHBOARD */
          <div className="flex-1 flex flex-col space-y-6">
            {/* Tab Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brass/20 pb-4">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab("CALENDAR")}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "CALENDAR"
                      ? "bg-brass text-charcoal shadow-md"
                      : "bg-black/40 text-soft-cream/70 hover:text-white hover:bg-black/60 border border-brass/20"
                  }`}
                >
                  <Calendar className="size-4" />
                  <span>ਕੈਲੰਡਰ ਤਾਰੀਖ਼ਾਂ (Date Availability)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("RESERVATIONS")}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "RESERVATIONS"
                      ? "bg-brass text-charcoal shadow-md"
                      : "bg-black/40 text-soft-cream/70 hover:text-white hover:bg-black/60 border border-brass/20"
                  }`}
                >
                  <BookmarkCheck className="size-4" />
                  <span>ਗਾਹਕ ਬੁਕਿੰਗਾਂ ({totalCount})</span>
                </button>


                <button
                  type="button"
                  onClick={() => setActiveTab("SETTINGS")}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "SETTINGS"
                      ? "bg-brass text-charcoal shadow-md"
                      : "bg-black/40 text-soft-cream/70 hover:text-white hover:bg-black/60 border border-brass/20"
                  }`}
                >
                  <KeyRound className="size-4" />
                  <span>ਪਾਸਵਰਡ ਬਦਲੋ (Password)</span>
                </button>
              </div>

              {/* Status pills on top right */}
              <div className="flex items-center gap-2.5 text-xs text-soft-cream/80">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 font-medium">
                  <span className="size-2 rounded-full bg-rose-400" />
                  <span>{bookedDatesCount} Dates Locked</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 font-medium">
                  <span className="size-2 rounded-full bg-amber-400" />
                  <span>{pendingCount} Pending</span>
                </span>
              </div>
            </div>

            {/* TAB 1: CALENDAR DATE AVAILABILITY */}
            {activeTab === "CALENDAR" && (
              <div className="space-y-6">
                {/* Intro guide */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brass/15 via-black/40 to-black/60 border border-brass/35 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-lg sm:text-xl font-bold text-soft-cream flex items-center gap-2">
                      <Calendar className="size-5 text-brass" />
                      <span>ਤਾਰੀਖ਼ਾਂ ਲਾਕ ਕਰੋ ਜਾਂ ਖੋਲ੍ਹੋ (Update Calendar Availability)</span>
                    </h2>
                    <p className="text-xs text-soft-cream/75 mt-1 max-w-2xl leading-relaxed">
                      ਕਿਸੇ ਵੀ ਤਾਰੀਖ਼ 'ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਉਸਨੂੰ <strong>"BOOKED" (ਲਾਕ)</strong> ਕਰ ਦਿਓ ਤਾਂ ਜੋ ਵੈੱਬਸਾਈਟ 'ਤੇ ਉਹ ਤਾਰੀਖ਼ ਲਾਲ ਹੋ ਜਾਵੇ ਅਤੇ ਕੋਈ ਹੋਰ ਬੁੱਕ ਨਾ ਕਰ ਸਕੇ। ਜਦੋਂ ਮਰਜ਼ੀ ਚਾਹੋ ਦੁਬਾਰਾ <strong>"AVAILABLE" (ਖੋਲ੍ਹ)</strong> ਸਕਦੇ ਹੋ।
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={goToToday}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/15 text-xs text-soft-cream transition-colors cursor-pointer shrink-0"
                  >
                    ਅੱਜ ਦੀ ਤਾਰੀਖ਼ (Today)
                  </button>
                </div>

                {/* Calendar Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Calendar Grid (7 cols) */}
                  <div className="lg:col-span-7 rounded-2xl bg-black/50 border border-brass/30 p-5 shadow-lg">
                    {/* Month header */}
                    <div className="flex items-center justify-between pb-4 border-b border-brass/20">
                      <button
                        type="button"
                        onClick={prevMonth}
                        aria-label="Previous month"
                        className="size-8 rounded-lg bg-white/5 hover:bg-brass/20 text-soft-cream hover:text-brass flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                      >
                        <ChevronLeft className="size-4" />
                      </button>

                      <div className="text-center">
                        <span className="font-display text-base sm:text-lg font-bold text-soft-cream tracking-wide">
                          {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={nextMonth}
                        aria-label="Next month"
                        className="size-8 rounded-lg bg-white/5 hover:bg-brass/20 text-soft-cream hover:text-brass flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                      >
                        <ChevronRight className="size-4" />
                      </button>
                    </div>

                    {/* Day of Week Labels */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-[11px] font-bold text-brass/70 uppercase tracking-wider py-3">
                      {["ਐਤ", "ਸੋਮ", "ਮੰਗਲ", "ਬੁੱਧ", "ਵੀਰ", "ਸ਼ੁੱਕਰ", "ਸ਼ਨੀ"].map((d, idx) => (
                        <div key={idx}>{d}</div>
                      ))}
                    </div>

                    {/* Calendar Day Grid */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2">
                      {Array.from({ length: firstDayIndex }).map((_, idx) => (
                        <div key={`blank-${idx}`} className="h-11 sm:h-12 rounded-xl opacity-0 pointer-events-none" />
                      ))}

                      {daysArray.map((dayNum) => {
                        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                        const status = availabilityMap[dateStr] || "AVAILABLE";
                        const isSelected = dateStr === selectedDate;
                        const isCurrentDay = dateStr === todayStr;
                        const overrideObj = overrides.find((o) => o.date === dateStr);

                        return (
                          <button
                            key={dateStr}
                            type="button"
                            onClick={() => setSelectedDate(dateStr)}
                            className={`relative h-11 sm:h-12 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer border ${
                              isSelected
                                ? "ring-2 ring-brass ring-offset-2 ring-offset-black scale-105 z-10 font-bold"
                                : ""
                            } ${
                              status === "BOOKED"
                                ? "bg-rose-950/70 border-rose-500/60 text-rose-200 hover:bg-rose-900/80"
                                : status === "PENDING"
                                ? "bg-amber-950/70 border-amber-500/60 text-amber-200 hover:bg-amber-900/80"
                                : "bg-black/30 border-brass/20 text-soft-cream/80 hover:bg-brass/10 hover:border-brass/45"
                            }`}
                          >
                            <span className={`text-xs sm:text-sm ${isCurrentDay ? "underline underline-offset-2 font-bold text-brass-light" : ""}`}>
                              {dayNum}
                            </span>

                            <span
                              className={`size-1.5 rounded-full mt-0.5 ${
                                status === "BOOKED"
                                  ? "bg-rose-400"
                                  : status === "PENDING"
                                  ? "bg-amber-400 animate-pulse"
                                  : "bg-emerald-400/40"
                              }`}
                            />

                            {overrideObj && (
                              <span className="absolute top-0.5 right-1 size-1.5 rounded-full bg-brass" title="Owner Override Active" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Legend */}
                    <div className="mt-5 pt-3 border-t border-brass/15 flex flex-wrap items-center justify-between text-xs gap-3 text-soft-cream/70">
                      <div className="flex items-center gap-1.5">
                        <span className="size-2.5 rounded-full bg-emerald-400" />
                        <span>AVAILABLE (ਖੁੱਲ੍ਹੀ)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="size-2.5 rounded-full bg-rose-500" />
                        <span>BOOKED (ਲਾਕ / ਰਿਜ਼ਰਵ)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="size-2.5 rounded-full bg-amber-400" />
                        <span>PENDING (ਸਟੈਂਡਬਾਈ)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Control Editor (5 cols) */}
                  <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-black/70 to-black/90 border border-brass/40 p-5 sm:p-6 space-y-5 shadow-xl">
                    <div className="border-b border-brass/20 pb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brass-light block">
                        ਚੁਣੀ ਹੋਈ ਤਾਰੀਖ਼ (SELECTED DATE)
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-soft-cream mt-0.5">
                        {selectedDate
                          ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-IN", {
                              weekday: "short",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "ਕੋਈ ਤਾਰੀਖ਼ ਚੁਣੋ"}
                      </h3>
                      <span className="font-mono text-xs text-brass/80 block mt-0.5">{selectedDate}</span>
                    </div>

                    {/* Status Options */}
                    <div>
                      <label className="block text-xs font-semibold text-soft-cream/75 mb-2 uppercase tracking-wider">
                        ਮੌਜੂਦਾ ਸਥਿਤੀ (Current Status)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedStatus("BOOKED")}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 border cursor-pointer ${
                            selectedStatus === "BOOKED"
                              ? "bg-rose-600 text-white border-rose-400 shadow-md scale-102"
                              : "bg-black/50 text-rose-300/70 border-rose-950/80 hover:border-rose-500/50"
                          }`}
                        >
                          <Ban className="size-4" />
                          <span>ਬੁੱਕ (BOOKED)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedStatus("AVAILABLE")}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 border cursor-pointer ${
                            selectedStatus === "AVAILABLE"
                              ? "bg-emerald-600 text-white border-emerald-400 shadow-md scale-102"
                              : "bg-black/50 text-emerald-300/70 border-emerald-950/80 hover:border-emerald-500/50"
                          }`}
                        >
                          <CheckCircle2 className="size-4" />
                          <span>ਖੁੱਲ੍ਹੀ (AVAILABLE)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedStatus("PENDING")}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 border cursor-pointer ${
                            selectedStatus === "PENDING"
                              ? "bg-amber-600 text-white border-amber-400 shadow-md scale-102"
                              : "bg-black/50 text-amber-300/70 border-amber-950/80 hover:border-amber-500/50"
                          }`}
                        >
                          <Clock className="size-4" />
                          <span>ਹੋਲਡ (PENDING)</span>
                        </button>
                      </div>
                    </div>

                    {/* Note input */}
                    <div>
                      <label className="block text-xs font-semibold text-soft-cream/75 mb-1.5 uppercase tracking-wider">
                        ਨੋਟ / ਗਾਹਕ ਦਾ ਨਾਮ (Event Note / Reason)
                      </label>
                      <input
                        type="text"
                        value={overrideNote}
                        onChange={(e) => setOverrideNote(e.target.value)}
                        placeholder="e.g. ਜਸਵਿੰਦਰ ਸਿੰਘ ਵਿਆਹ (Marriage booked offline)"
                        className="h-11 w-full rounded-xl border border-brass/35 bg-black/60 px-3.5 text-xs sm:text-sm text-soft-cream placeholder:text-soft-cream/35 focus:border-brass focus:outline-hidden focus:ring-1 focus:ring-brass"
                      />
                      <span className="text-[10px] text-soft-cream/50 mt-1 block">
                        ਇਹ ਨੋਟ ਸਿਰਫ਼ ਤੁਹਾਡੇ ਦੇਖਣ ਲਈ ਹੈ (Private note).
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 space-y-2">
                      <button
                        type="button"
                        onClick={() => handleSaveDateStatus()}
                        className="w-full h-12 rounded-xl bg-gradient-to-r from-brass-deep via-brass to-brass-light hover:to-white text-charcoal font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:scale-[1.01] active:translate-y-px transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <BookmarkCheck className="size-4" />
                        <span>ਇਹ ਤਾਰੀਖ਼ ਅੱਪਡੇਟ ਕਰੋ (Save Date Status)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleUnlockDate(selectedDate)}
                        className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-soft-cream/70 hover:text-white text-xs transition-colors cursor-pointer border border-white/10"
                      >
                        ਲਾਕ ਹਟਾਓ (Reset to Available)
                      </button>
                    </div>
                  </div>
                </div>

                {/* OVERRIDES LIST */}
                <div className="rounded-2xl bg-black/40 border border-brass/25 p-5">
                  <div className="flex items-center justify-between pb-3 border-b border-brass/15">
                    <div className="flex items-center gap-2">
                      <BookmarkCheck className="size-4 text-brass" />
                      <h3 className="font-display text-base font-bold text-soft-cream">
                        ਮੈਨੁਅਲ ਲਾਕ ਕੀਤੀਆਂ ਤਾਰੀਖ਼ਾਂ (Active Date Locks: {overrides.length})
                      </h3>
                    </div>
                  </div>

                  {overrides.length === 0 ? (
                    <p className="text-xs text-soft-cream/60 py-4 text-center">
                      ਫਿਲਹਾਲ ਕੋਈ ਵੀ ਤਾਰੀਖ਼ ਮੈਨੁਅਲ ਲਾਕ ਨਹੀਂ ਕੀਤੀ ਗਈ। ਸਾਰੀਆਂ ਤਾਰੀਖ਼ਾਂ ਖੁੱਲ੍ਹੀਆਂ ਹਨ।
                    </p>
                  ) : (
                    <div className="divide-y divide-white/5 mt-2 max-h-60 overflow-y-auto custom-scrollbar">
                      {overrides.map((ov) => (
                        <div
                          key={ov.date}
                          className="py-2.5 flex items-center justify-between gap-4 text-xs hover:bg-white/5 px-2 rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-soft-cream">{ov.date}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                ov.status === "BOOKED"
                                  ? "bg-rose-950 text-rose-300 border border-rose-500/40"
                                  : ov.status === "PENDING"
                                  ? "bg-amber-950 text-amber-300 border border-amber-500/40"
                                  : "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                              }`}
                            >
                              {ov.status}
                            </span>
                            {ov.note && (
                              <span className="text-soft-cream/70 italic truncate max-w-xs">"{ov.note}"</span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleUnlockDate(ov.date)}
                            className="px-2.5 py-1 rounded-md bg-rose-950/50 hover:bg-rose-900 border border-rose-500/40 text-rose-200 text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            ਲਾਕ ਹਟਾਓ (Unlock)
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: CUSTOMER INQUIRIES & RESERVATIONS */}
            {activeTab === "RESERVATIONS" && (
              <div className="space-y-6">
                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-4 rounded-2xl bg-black/40 border border-brass/20">
                    <span className="text-xs text-soft-cream/60 block">ਕੁੱਲ ਬੁਕਿੰਗਾਂ (Total)</span>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-soft-cream">
                      {totalCount}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30">
                    <span className="text-xs text-amber-300 block">ਪੈਂਡਿੰਗ (Pending Review)</span>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-amber-400">
                      {pendingCount}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                    <span className="text-xs text-emerald-300 block">ਕਨਫਰਮ (Confirmed)</span>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-emerald-400">
                      {confirmedCount}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30">
                    <span className="text-xs text-rose-300 block">ਰੱਦ ਕੀਤੀਆਂ (Cancelled)</span>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-rose-400">
                      {cancelledCount}
                    </span>
                  </div>
                </div>

                {/* Search & filter */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by ID, name, phone, date..."
                      className="h-10 w-full rounded-xl border border-brass/30 bg-black/50 pl-9 pr-8 text-xs text-soft-cream placeholder:text-soft-cream/40 focus:border-brass focus:outline-hidden focus:ring-1 focus:ring-brass"
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

                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/50 border border-brass/20 text-xs overflow-x-auto">
                    {(["ALL", "Pending", "Confirmed", "Cancelled"] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
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

                {/* List */}
                {filteredReservations.length === 0 ? (
                  <div className="p-12 rounded-2xl bg-black/30 border border-brass/15 text-center">
                    <Calendar className="size-10 text-brass/40 mx-auto mb-2" />
                    <h3 className="font-display text-lg font-bold text-soft-cream">
                      {reservations.length === 0
                        ? "ਫਿਲਹਾਲ ਕੋਈ ਵੀ ਗਾਹਕ ਬੁਕਿੰਗ ਨਹੀਂ ਹੈ।"
                        : "ਕੋਈ ਮੇਲ ਖਾਂਦੀ ਬੁਕਿੰਗ ਨਹੀਂ ਮਿਲੀ।"}
                    </h3>
                    <p className="text-xs text-soft-cream/60 mt-1 max-w-sm mx-auto">
                      ਵੈੱਬਸਾਈਟ ਤੋਂ ਸਬਮਿਟ ਕੀਤੀਆਂ ਗਈਆਂ ਬੁਕਿੰਗਾਂ ਆਪਣੇ ਆਪ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੀਆਂ।
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {filteredReservations.map((r) => {
                      const cleanPhone = r.phone.replace(/[^0-9]/g, "");
                      const waDirectUrl = `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`}?text=${encodeURIComponent(`Hello ${r.customerName}, this is regarding your celebration booking inquiry (ID: ${r.id}) at Shah Junction Villa.`)}`;

                      return (
                        <div
                          key={r.id}
                          className="p-4 sm:p-5 rounded-2xl bg-black/45 border border-brass/25 hover:border-brass/50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                        >
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
                              {r.email && (
                                <a
                                  href={`mailto:${r.email}`}
                                  className="inline-flex items-center gap-1 text-soft-cream/80 hover:underline"
                                >
                                  <Mail className="size-3 text-brass" /> {r.email}
                                </a>
                              )}
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

                          {/* Action controls */}
                          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0 items-end justify-start">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <a
                                href={waDirectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                                title="Chat with Customer on WhatsApp"
                              >
                                <MessageCircle className="size-3.5 fill-white" />
                                <span>WhatsApp</span>
                              </a>

                              {r.status !== "Confirmed" && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(r.id, "Confirmed")}
                                  className="px-3 py-1.5 rounded-lg bg-brass/90 hover:bg-brass text-charcoal font-bold text-xs flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                                >
                                  <CheckCircle2 className="size-3" />
                                  <span>ਕਨਫਰਮ (Lock Date)</span>
                                </button>
                              )}

                              {r.status !== "Pending" && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(r.id, "Pending")}
                                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                                >
                                  <Clock className="size-3" />
                                  <span>Set Pending</span>
                                </button>
                              )}

                              {r.status !== "Cancelled" && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(r.id, "Cancelled")}
                                  className="px-2.5 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  <Ban className="size-3" />
                                  <span>Cancel</span>
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => handleDeleteReservation(r.id)}
                                aria-label="Delete reservation"
                                title="Delete permanently"
                                className="size-8 rounded-lg bg-white/5 hover:bg-rose-950 text-soft-cream/70 hover:text-rose-200 border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: SETTINGS (CHANGE PASSWORD) */}
            {activeTab === "SETTINGS" && (
              <div className="max-w-lg mx-auto py-6 space-y-6 w-full">
                <div className="p-6 rounded-2xl bg-black/50 border border-brass/35 space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-brass/20">
                    <div className="size-10 rounded-xl bg-brass/20 text-brass flex items-center justify-center">
                      <KeyRound className="size-5" />
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-bold text-soft-cream">
                        Owner Password ਬਦਲੋ (Change Password)
                      </h2>
                      <p className="text-xs text-soft-cream/65">
                        ਸਿਰਫ਼ ਮਹਿਲ ਦਾ ਮਾਲਕ (Owner) ਹੀ ਇਸ ਪਾਸਵਰਡ ਨੂੰ ਜਾਣਦਾ ਹੋਵੇਗਾ।
                      </p>
                    </div>
                  </div>

                  {settingsFeedback && (
                    <div
                      className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                        settingsFeedback.type === "success"
                          ? "bg-emerald-950 border border-emerald-500/40 text-emerald-200"
                          : "bg-rose-950 border border-rose-500/40 text-rose-200"
                      }`}
                    >
                      {settingsFeedback.type === "success" ? (
                        <Check className="size-4 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="size-4 text-rose-400 shrink-0" />
                      )}
                      <span>{settingsFeedback.text}</span>
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-brass-light mb-1 uppercase tracking-wider">
                        ਮੌਜੂਦਾ ਪਾਸਵਰਡ (Current Password)
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPassVerify}
                        onChange={(e) => setCurrentPassVerify(e.target.value)}
                        placeholder="Enter current password"
                        className="h-11 w-full rounded-xl border border-brass/35 bg-black/60 px-3.5 text-xs sm:text-sm text-soft-cream focus:border-brass focus:outline-hidden focus:ring-1 focus:ring-brass"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brass-light mb-1 uppercase tracking-wider">
                        ਨਵਾਂ ਪਾਸਵਰਡ (New Password)
                      </label>
                      <input
                        type="password"
                        required
                        minLength={4}
                        value={newPassInput}
                        onChange={(e) => setNewPassInput(e.target.value)}
                        placeholder="Enter new secure password (min 4 characters)"
                        className="h-11 w-full rounded-xl border border-brass/35 bg-black/60 px-3.5 text-xs sm:text-sm text-soft-cream focus:border-brass focus:outline-hidden focus:ring-1 focus:ring-brass"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brass-light mb-1 uppercase tracking-wider">
                        ਨਵਾਂ ਪਾਸਵਰਡ ਦੁਬਾਰਾ ਭਰੋ (Confirm New Password)
                      </label>
                      <input
                        type="password"
                        required
                        minLength={4}
                        value={confirmPassInput}
                        onChange={(e) => setConfirmPassInput(e.target.value)}
                        placeholder="Re-type new password"
                        className="h-11 w-full rounded-xl border border-brass/35 bg-black/60 px-3.5 text-xs sm:text-sm text-soft-cream focus:border-brass focus:outline-hidden focus:ring-1 focus:ring-brass"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full h-11 rounded-xl bg-gradient-to-r from-brass-deep via-brass to-brass-light text-charcoal font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transition-all cursor-pointer"
                      >
                        ਨਵਾਂ ਪਾਸਵਰਡ ਸੇਵ ਕਰੋ (Save New Password)
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
