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
  email: string;
  eventType: EventType;
  eventDate: string; // "YYYY-MM-DD"
  eventTime: string;
  guestCount: number;
  message?: string;
}

export const RESERVATION_CONTACT = {
  phoneDisplay: "+91 87280 60036",
  phoneTel: "+918728060036",
  phoneRaw: "918728060036",
  whatsAppUrl: "https://wa.me/918728060036",
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

const STORAGE_KEY = "shahi_junction_villa_reservations_v1";
const EVENT_NAME = "shahi_reservations_changed";

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

  for (const r of list) {
    if (r.status === "Cancelled") continue;
    if (r.status === "Confirmed") {
      map[r.eventDate] = "BOOKED";
    } else if (r.status === "Pending" && map[r.eventDate] !== "BOOKED") {
      map[r.eventDate] = "PENDING";
    }
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.email.trim())) {
    return { success: false, error: "Please provide a valid email address." };
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
    email: input.email.trim().toLowerCase(),
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
    const targetDate = current[index].eventDate;
    const hasAnotherConfirmed = current.some(
      (r) => r.id !== id && r.eventDate === targetDate && r.status === "Confirmed"
    );
    if (hasAnotherConfirmed) {
      throw new Error(`Another reservation is already confirmed for ${targetDate}.`);
    }
  }

  const updated: Reservation = {
    ...current[index],
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
