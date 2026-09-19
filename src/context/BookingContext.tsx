import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

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
