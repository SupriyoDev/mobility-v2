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

interface UserOnlineBookingStore {
  terms_accepted: string;
  booking_type: string;
  booking_date: Date;
  booking_time: string;
  booking_booth: string;
  payment_method: string;
  payment_status: string;
  booking_location: string;

  setTermsAccepted: (val: string) => void;
  setBookingType: (val: string) => void;
  setBookingDate: (val: Date) => void;
  setBookingTime: (val: string) => void;
  setBookingBooth: (val: string) => void;
  setBookingLocation: (val: string) => void;
  setPaymentMethod: (val: string) => void;
  setPaymentStatus: (val: string) => void;
}

export const useUserOnlineBookingStore = create<UserOnlineBookingStore>(
  (set) => ({
    terms_accepted: "",
    booking_type: "",
    booking_date: new Date(),
    booking_time: "",
    booking_booth: "",
    payment_method: "",
    payment_status: "",
    booking_location: "",

    setTermsAccepted: (val) => set({ terms_accepted: val }),
    setBookingType: (val) => set({ booking_type: val }),
    setBookingDate: (val) => set({ booking_date: val }),
    setBookingTime: (val) => set({ booking_time: val }),
    setBookingBooth: (val) => set({ booking_booth: val }),
    setBookingLocation: (val) => set({ booking_location: val }),
    setPaymentMethod: (val) => set({ payment_method: val }),
    setPaymentStatus: (val) => set({ payment_status: val }),
  })
);
