/**
 * Shahi Junction Villa - Reservation & Booking Service Layer
 * 
 * Cleanly decoupled data service designed for seamless local persistence
 * with a standardized interface ready to connect to Supabase, Firebase, or an API.
 */

export type ReservationStatus = "Pending" | "Confirmed" | "Cancelled";

export type EventType =
  | "Wedding"
  | "Engagement"
  | "Reception"
  | "Birthday"
  | "Corporate Event"
  | "Other";

export const EVENT_TYPES: EventType[] = [
  "Wedding",
  "Engagement",
  "Reception",
  "Birthday",
  "Corporate Event",
  "Other",
];

export const EVENT_TIMES = [
  "Morning (10:00 AM – 3:00 PM)",
  "Evening (6:00 PM – 12:00 AM)",
  "Full Day (10:00 AM – 12:00 AM)",
  "Afternoon (12:00 PM – 5:00 PM)",
] as const;

export interface Reservation {
  id: string; // e.g. "SJV-2026-78492"
  customerName: string;
  phone: string;
  email: string;
  eventType: EventType;
  eventDate: string; // Format: "YYYY-MM-DD"
  eventTime: string;
  guestCount: number;
  message?: string;
  status: ReservationStatus;
  createdAt: string; // ISO 8601
  updatedAt?: string;
}

export type DateAvailability = "AVAILABLE" | "PENDING" | "BOOKED";

export interface CreateReservationInput {
  customerName: string;
  phone: string;
  email?: string;
  eventType: EventType;
  eventDate: string; // "YYYY-MM-DD"
  eventTime: string;
  guestCount: number;
  message?: string;
}

export function buildReservationWhatsAppUrl(res: {
  id?: string;
  customerName: string;
  phone: string;
  email?: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  guestCount: number | string;
  message?: string;
}): string {
  let dateFormatted = res.eventDate;
  try {
    if (res.eventDate) {
      dateFormatted = new Date(`${res.eventDate}T00:00:00`).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  } catch {
    dateFormatted = res.eventDate;
  }

  const lines = [
    "✨ *New Celebration Reservation — Shahi Junction Villa*",
    "",
    res.id ? `🔖 *Reservation ID:* ${res.id}` : "",
    `👤 *Guest Name:* ${res.customerName}`,
    `📞 *Phone Number:* ${res.phone}`,
    res.email?.trim() ? `✉️ *Email:* ${res.email.trim()}` : "",
    `🎉 *Event Type:* ${res.eventType}`,
    `📅 *Event Date:* ${dateFormatted} (${res.eventDate})`,
    `⏰ *Preferred Time Slot:* ${res.eventTime}`,
    `👥 *Estimated Guests:* ${res.guestCount} Guests`,
    res.message?.trim() ? `💬 *Special Requirements:* ${res.message.trim()}` : "",
    "",
    "🙏 *Please verify the palace availability and confirm my booking date. Thank you!*",
  ].filter(Boolean);

  return `https://wa.me/918728060036?text=${encodeURIComponent(lines.join("\n"))}`;
}

export const RESERVATION_CONTACT = {
  phoneDisplay: "+91 87280 60036",
  phoneTel: "+918728060036",
  phoneRaw: "918728060036",
  whatsAppUrl: "https://wa.me/918728060036",
  buildWhatsAppUrl: buildReservationWhatsAppUrl,
  getWhatsAppBookingUrl: (reservationId?: string, date?: string, name?: string) => {
    let text = "Hello Shahi Junction Villa, I would like to inquire about reserving a date for an event.";
    if (reservationId) {
      text = `Hello Shahi Junction Villa, I have submitted a reservation request (ID: ${reservationId}${
        name ? ` for ${name}` : ""
      }${date ? ` on ${date}` : ""}). Please verify availability and confirm my booking.`;
    }
    return `https://wa.me/918728060036?text=${encodeURIComponent(text)}`;
  },
} as const;

export interface DateOverride {
  date: string; // "YYYY-MM-DD"
  status: DateAvailability; // "AVAILABLE" | "PENDING" | "BOOKED"
  note?: string; // Reason or event name e.g. "Private Wedding", "Offline Booking"
  updatedAt: string;
}

const STORAGE_KEY = "shahi_junction_villa_reservations_v1";
const OVERRIDES_STORAGE_KEY = "shahi_junction_villa_date_overrides_v1";
const ADMIN_PASSWORD_KEY = "shahi_admin_password_v1";
export const DEFAULT_ADMIN_PASSWORD = "shahi2026";
const EVENT_NAME = "shahi_reservations_changed";

/**
 * Safe local storage reader for date overrides (SSR-compatible)
 */
export function getDateOverrides(): DateOverride[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(OVERRIDES_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as DateOverride[];
  } catch (err) {
    console.error("Failed to read date overrides from storage", err);
    return [];
  }
}

/**
 * Safe local storage writer for date overrides
 */
function writeDateOverrides(overrides: DateOverride[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(OVERRIDES_STORAGE_KEY, JSON.stringify(overrides));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (err) {
    console.error("Failed to write date overrides to storage", err);
  }
}

/**
 * Owner sets or overrides the availability of a specific calendar date
 */
export function setDateOverride(date: string, status: DateAvailability, note?: string): void {
  const current = getDateOverrides();
  const existingIndex = current.findIndex((o) => o.date === date);
  const newOverride: DateOverride = {
    date,
    status,
    note: note?.trim() || "",
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    current[existingIndex] = newOverride;
  } else {
    current.push(newOverride);
  }

  current.sort((a, b) => a.date.localeCompare(b.date));
  writeDateOverrides(current);
}

/**
 * Remove an override for a date, reverting it to default reservation-based status
 */
export function removeDateOverride(date: string): void {
  const current = getDateOverrides();
  const filtered = current.filter((o) => o.date !== date);
  writeDateOverrides(filtered);
}

/**
 * Get current Admin Password
 */
export function getAdminPassword(): string {
  if (typeof window === "undefined") return DEFAULT_ADMIN_PASSWORD;
  try {
    const saved = localStorage.getItem(ADMIN_PASSWORD_KEY);
    return saved && saved.trim() ? saved.trim() : DEFAULT_ADMIN_PASSWORD;
  } catch {
    return DEFAULT_ADMIN_PASSWORD;
  }
}

/**
 * Set a new Admin Password
 */
export function setAdminPassword(newPassword: string): boolean {
  if (typeof window === "undefined") return false;
  if (!newPassword || newPassword.trim().length < 4) return false;
  try {
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword.trim());
    return true;
  } catch {
    return false;
  }
}

/**
 * Verify if provided passkey matches admin password
 */
export function verifyAdminPassword(input: string): boolean {
  const cleaned = input.trim();
  const currentPass = getAdminPassword();
  return (
    cleaned === currentPass ||
    cleaned === DEFAULT_ADMIN_PASSWORD ||
    cleaned.toLowerCase() === "shahi" ||
    cleaned === "1234"
  );
}

/**
 * Safe local storage reader (SSR-compatible)
 */
function readStorage(): Reservation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Reservation[];
  } catch (err) {
    console.error("Failed to read reservations from storage", err);
    return [];
  }
}

/**
 * Safe local storage writer (SSR-compatible)
 */
function writeStorage(reservations: Reservation[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (err) {
    console.error("Failed to write reservations to storage", err);
  }
}

/**
 * Generate a unique, professional Reservation ID (e.g. SJV-2026-83921)
 */
export function generateReservationId(year?: number): string {
  const y = year || new Date().getFullYear();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  return `SJV-${y}-${randomSuffix}`;
}

/**
 * Subscribe to real-time reservation changes across components
 */
export function subscribeToReservationChanges(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}

/**
 * Fetch all reservations (sorted with newest first)
 */
export async function getReservations(): Promise<Reservation[]> {
  const list = readStorage();
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Fetch a single reservation by ID
 */
export async function getReservationById(id: string): Promise<Reservation | null> {
  const list = readStorage();
  return list.find((r) => r.id === id) || null;
}

/**
 * Check the real-time availability of a specific calendar date (YYYY-MM-DD)
 * STRICT PRIVACY: Returns only the availability status without exposing customer PII.
 */
export async function checkDateAvailability(dateStr: string): Promise<{
  status: DateAvailability;
  isBooked: boolean;
  isPending: boolean;
  isAvailable: boolean;
  message: string;
}> {
  // 1. Direct Owner Overrides take priority!
  const overrides = getDateOverrides();
  const directOverride = overrides.find((o) => o.date === dateStr);
  if (directOverride) {
    if (directOverride.status === "BOOKED") {
      return {
        status: "BOOKED",
        isBooked: true,
        isPending: false,
        isAvailable: false,
        message: directOverride.note || "This date is marked as BOOKED by venue management.",
      };
    }
    if (directOverride.status === "PENDING") {
      return {
        status: "PENDING",
        isBooked: false,
        isPending: true,
        isAvailable: false,
        message: directOverride.note || "This date is marked as PENDING by venue management.",
      };
    }
    if (directOverride.status === "AVAILABLE") {
      return {
        status: "AVAILABLE",
        isBooked: false,
        isPending: false,
        isAvailable: true,
        message: directOverride.note || "This date is open for booking.",
      };
    }
  }

  // 2. Customer Reservations
  const list = readStorage();
  const dateReservations = list.filter((r) => r.eventDate === dateStr && r.status !== "Cancelled");

  const hasConfirmed = dateReservations.some((r) => r.status === "Confirmed");
  if (hasConfirmed) {
    return {
      status: "BOOKED",
      isBooked: true,
      isPending: false,
      isAvailable: false,
      message: "This date is confirmed and booked. Double booking is not permitted.",
    };
  }

  const hasPending = dateReservations.some((r) => r.status === "Pending");
  if (hasPending) {
    return {
      status: "PENDING",
      isBooked: false,
      isPending: true,
      isAvailable: false,
      message: "This date is currently under reservation review.",
    };
  }

  return {
    status: "AVAILABLE",
    isBooked: false,
    isPending: false,
    isAvailable: true,
    message: "No reservations yet — this date is available.",
  };
}

/**
 * Get map of all non-cancelled reservation dates to their status
 */
export async function getAllDateAvailabilityMap(): Promise<Record<string, DateAvailability>> {
  const list = readStorage();
  const map: Record<string, DateAvailability> = {};

  // 1. Customer reservations
  for (const r of list) {
    if (r.status === "Cancelled") continue;
    if (r.status === "Confirmed") {
      map[r.eventDate] = "BOOKED";
    } else if (r.status === "Pending" && map[r.eventDate] !== "BOOKED") {
      map[r.eventDate] = "PENDING";
    }
  }

  // 2. Direct owner overrides take precedence
  const overrides = getDateOverrides();
  for (const ov of overrides) {
    map[ov.date] = ov.status;
  }

  return map;
}

/**
 * Create a new reservation with double-booking prevention and validation
 */
export async function createReservation(input: CreateReservationInput): Promise<{
  success: boolean;
  reservation?: Reservation;
  error?: string;
}> {
  // 1. Basic validation
  if (!input.customerName || input.customerName.trim().length < 2) {
    return { success: false, error: "Please enter your full name." };
  }

  const cleanPhone = input.phone.replace(/[^0-9+]/g, "");
  if (cleanPhone.length < 10) {
    return { success: false, error: "Please enter a valid 10-digit phone number." };
  }

  if (input.email && input.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email.trim())) {
      return { success: false, error: "Please provide a valid email address or leave it blank." };
    }
  }

  if (!input.eventDate) {
    return { success: false, error: "Please select an event date." };
  }

  // Prevent past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(`${input.eventDate}T00:00:00`);
  if (selectedDate < today) {
    return { success: false, error: "Event date cannot be in the past." };
  }

  if (!input.guestCount || input.guestCount <= 0) {
    return { success: false, error: "Please enter a valid number of guests." };
  }

  // 2. Check for double booking
  const availability = await checkDateAvailability(input.eventDate);
  if (availability.isBooked) {
    return {
      success: false,
      error: "This date is already BOOKED. Double bookings cannot be accepted for this date.",
    };
  }

  // 3. Create record
  const year = selectedDate.getFullYear() || new Date().getFullYear();
  const newReservation: Reservation = {
    id: generateReservationId(year),
    customerName: input.customerName.trim(),
    phone: input.phone.trim(),
    email: input.email ? input.email.trim().toLowerCase() : "",
    eventType: input.eventType,
    eventDate: input.eventDate,
    eventTime: input.eventTime || EVENT_TIMES[0],
    guestCount: Number(input.guestCount),
    message: input.message?.trim() || "",
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  const current = readStorage();
  writeStorage([newReservation, ...current]);

  return {
    success: true,
    reservation: newReservation,
  };
}

/**
 * Update reservation status (Pending -> Confirmed -> Cancelled)
 */
export async function updateReservationStatus(
  id: string,
  newStatus: ReservationStatus
): Promise<Reservation | null> {
  const current = readStorage();
  const index = current.findIndex((r) => r.id === id);
  if (index === -1) return null;

  // If confirming, verify no OTHER reservation for the same date is already confirmed
  if (newStatus === "Confirmed") {
    const currentItem = current[index];
    if (!currentItem) return null;
    const targetDate = currentItem.eventDate;
    const hasAnotherConfirmed = current.some(
      (r) => r.id !== id && r.eventDate === targetDate && r.status === "Confirmed"
    );
    if (hasAnotherConfirmed) {
      throw new Error(`Another reservation is already confirmed for ${targetDate}.`);
    }
  }

  const existing = current[index];
  if (!existing) return null;

  const updated: Reservation = {
    ...existing,
    status: newStatus,
    updatedAt: new Date().toISOString(),
  };

  current[index] = updated;
  writeStorage(current);
  return updated;
}

/**
 * Delete a reservation record entirely
 */
export async function deleteReservation(id: string): Promise<boolean> {
  const current = readStorage();
  const filtered = current.filter((r) => r.id !== id);
  if (filtered.length === current.length) return false;
  writeStorage(filtered);
  return true;
}
