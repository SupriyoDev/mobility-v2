"use client";

import { useState } from "react";
// import { ScooterBooking } from "@/entities/ScooterBooking";
import TermsAndConditions from "@/components/shared/terms-conditions";
import { AnimatePresence, motion } from "framer-motion";
import { Bike, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { useBookingStore, useOnsiteBookStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { toast } from "sonner";

export default function OnsiteBooking() {
  const [step, setStep] = useState("terms"); // 'terms' or 'success'
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { bookingId, setBookingId } = useBookingStore(
    useShallow((state) => ({
      bookingId: state.booking_id,
      setBookingId: state.setBookingId,
    }))
  );
  const { name, email, phone } = useOnsiteBookStore(
    useShallow((state) => ({
      name: state.name,
      email: state.email,
      phone: state.phone,
    }))
  );

  const handleAcceptTerms = async () => {
    if (termsAccepted) {
      setIsSubmitting(true);
      try {
        // Create a basic booking record
        const bookingData = {
          terms_accepted: termsAccepted,
          booking_type: "onsite",
          customer_email: email,
          customer_name: name,
          customer_phone: phone,
        };

        const result = await axios.post("/api/onsite-booking", bookingData);

        if (result.data.success === true) {
          setBookingId(result.data.booking_id);
        }

        // setBookingId(result.id);
        setStep("success");
      } catch (error: any) {
        console.error("Error creating booking:", error.response.data.error);
        toast("Booking Failed!", {
          description: error.response.data.error,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-bgsecondary shadow-xl mb-6">
            <Bike className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-bgsecondary   bg-clip-text text-transparent">
            Scooter Booking
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your journey starts here. Accept our terms to complete your booking.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          className="max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-4">
            <div
              className={`flex items-center gap-2 ${
                step === "terms" ? "text-blue-600" : "text-green-600"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold border-2 ${
                  step === "terms"
                    ? "border-blue-600 bg-blue-50"
                    : "border-green-600 bg-green-50"
                }`}
              >
                {step === "terms" ? "1" : <CheckCircle2 className="w-6 h-6" />}
              </div>
              <span className="font-medium hidden sm:inline">Terms</span>
            </div>

            <div
              className={`h-0.5 w-24 md:w-48 ${
                step === "success" ? "bg-green-600" : "bg-gray-300"
              }`}
            />

            <div
              className={`flex items-center gap-2 ${
                step === "success" ? "text-green-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold border-2 ${
                  step === "success"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                {step === "success" ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  "2"
                )}
              </div>
              <span className="font-medium hidden sm:inline">Confirmed</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {step === "terms" && (
              <TermsAndConditions
                key="terms"
                onAccept={handleAcceptTerms}
                termsAccepted={termsAccepted}
                setTermsAccepted={setTermsAccepted}
                isSubmitting={isSubmitting}
              />
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-2xl mb-6">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Booking Confirmed!
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Your scooter has been successfully booked.
                </p>
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto border border-gray-100">
                  <p className="text-gray-700 mb-4">Booking Reference:</p>
                  <p className="text-2xl font-bold text-blue-600 mb-6">
                    #{bookingId}
                  </p>
                  <p className="text-gray-600">
                    Thank you for accepting our terms and conditions. Your
                    booking has been confirmed!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
