import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

interface BookingContextType {
  isBookingModalOpen: boolean;
  prefilledDate: string | null;
  openBookingModal: (date?: string) => void;
  closeBookingModal: () => void;
  isAdminModalOpen: boolean;
  openAdminModal: () => void;
  closeAdminModal: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [prefilledDate, setPrefilledDate] = useState<string | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const openBookingModal = useCallback((date?: string) => {
    if (date) {
      setPrefilledDate(date);
    } else {
      setPrefilledDate(null);
    }
    setIsBookingModalOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsBookingModalOpen(false);
    setPrefilledDate(null);
  }, []);

  const openAdminModal = useCallback(() => {
    setIsAdminModalOpen(true);
  }, []);

  const closeAdminModal = useCallback(() => {
    setIsAdminModalOpen(false);
    if (typeof window !== "undefined" && window.location.hash === "#admin") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  // Check URL path, hash, or search params for admin access
  useEffect(() => {
    const checkAdminRoute = () => {
      if (typeof window === "undefined") return;
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        path === "/admin" ||
        path.startsWith("/admin/") ||
        hash === "#admin" ||
        search.includes("admin=true") ||
        search.includes("admin=1")
      ) {
        setIsAdminModalOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener("popstate", checkAdminRoute);
    window.addEventListener("hashchange", checkAdminRoute);
    return () => {
      window.removeEventListener("popstate", checkAdminRoute);
      window.removeEventListener("hashchange", checkAdminRoute);
    };
  }, []);

  // Secret Owner Shortcut: Ctrl + Shift + A to open Admin Portal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        setIsAdminModalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        isBookingModalOpen,
        prefilledDate,
        openBookingModal,
        closeBookingModal,
        isAdminModalOpen,
        openAdminModal,
        closeAdminModal,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    return {
      isBookingModalOpen: false,
      prefilledDate: null,
      openBookingModal: () => {},
      closeBookingModal: () => {},
      isAdminModalOpen: false,
      openAdminModal: () => {},
      closeAdminModal: () => {},
    };
  }
  return context;
}
