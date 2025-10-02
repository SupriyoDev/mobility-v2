import { create } from "zustand";
import { persist } from "zustand/middleware";
type Step = "terms" | "booking" | "success";

interface BookingStore {
  booking_id: string | null;
  setBookingId: (val: string) => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      booking_id: null,
      setBookingId: (value) => set({ booking_id: value }),
    }),
    {
      name: "booking-store",
    }
  )
);

interface onsiteBookStore {
  name: string | null;
  email: string | null;
  phone: string | null;

  setName: (val: string) => void;
  setEmail: (val: string) => void;
  setPhone: (val: string) => void;
}

export const useOnsiteBookStore = create<onsiteBookStore>((set) => ({
  email: null,
  name: null,
  phone: null,

  setName: (val) => set({ name: val }),
  setEmail: (val) => set({ email: val }),
  setPhone: (val) => set({ phone: val }),
}));
