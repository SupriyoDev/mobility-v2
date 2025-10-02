import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  Hash,
  Bike,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { OnsiteBooking } from "@/db/schema";

export default function BookingCard({ booking }: { booking: OnsiteBooking }) {
  const statusColors = {
    booked: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  const bookingData = `Booking ID: ${booking.id}\nName: ${booking.customer_name}\nEmail: ${booking.customer_email}\nPhone: ${booking.customer_phone}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    bookingData
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30">
        {/* Header */}
        <div className="bg-gradient-to-r from-bgsecondary to-bgtertiary p-6 relative">
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bike className="w-6 h-6 text-white" />
                <h3 className="text-white text-2xl font-bold">
                  Scooter Booking
                </h3>
              </div>
              <p className="text-blue-100 text-sm">Digital Booking Card</p>
            </div>
            <Badge
              className={`${
                statusColors["booked"] ||
                "bg-gray-100 text-gray-800 border-gray-200"
              } border text-sm px-3 py-1 font-semibold`}
            >
              {booking.booking_status}
            </Badge>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 grid md:grid-cols-3 gap-6">
          {/* Left section */}
          <div className="md:col-span-2 space-y-4">
            {/* Booking Reference */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                <Hash className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Booking Reference
                </p>
                <p className="text-xl font-bold text-blue-900">
                  {booking.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Customer Details
              </h4>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="font-semibold text-gray-900">
                      {booking.customer_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900 text-sm">
                      {booking.customer_email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-900">
                      {booking.customer_phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Accepted */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-500">Terms Accepted</p>
                <p className="font-semibold text-gray-900">
                  {booking.terms_accepted ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex flex-col items-center space-y-4">
            {/* QR Code */}
            <div className="w-full bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-200 shadow-inner">
              <p className="text-center text-sm font-semibold text-gray-700 mb-4">
                Scan to Verify
              </p>
              <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
                <img
                  src={qrCodeUrl}
                  alt="Booking QR Code"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-center text-xs text-gray-500 mt-4">
                Show this QR code at pickup
              </p>
            </div>

            {/* Booking Created At */}
            <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <p className="text-xs text-gray-500">Booked On</p>
              <p className="text-sm font-semibold text-gray-900">
                {format(new Date(booking.created_at), "MMM dd, yyyy")}
              </p>
              <p className="text-xs text-gray-500">
                {format(new Date(booking.created_at), "hh:mm a")}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
