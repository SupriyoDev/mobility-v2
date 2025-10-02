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
    <tr
      key={booking.id}
      className="hover:bg-blue-50 transition-colors grid-cols-12 px-4"
    >
      <td className="px-6 py-4 font-semibold text-blue-900 col-span-2">
        {booking.id.slice(0, 8).toUpperCase()}
      </td>
      <td className="px-6 py-4 col-span-2">{booking.customer_name}</td>
      <td className="px-6 py-4 col-span-2">{booking.customer_email}</td>
      <td className="px-6 py-4 col-span-2">{booking.customer_phone}</td>
      <td className="px-6 py-4 col-span-1">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            booking.booking_status === "booked"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {booking.booking_status}
        </span>
      </td>
      <td className="px-6 py-4 col-span-1">
        {booking.terms_accepted ? "✅ Yes" : "❌ No"}
      </td>
      <td className="px-6 py-4 col-span-2">
        <div className="flex flex-col">
          <span>{format(new Date(booking.created_at), "MMM dd, yyyy")}</span>
          <span className="text-xs text-gray-500">
            {new Intl.DateTimeFormat("en-US", {
              timeZone: "Asia/Dubai",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }).format(new Date(booking.created_at))}
            {/* {format(new Date(booking.created_at), "hh:mm a")} */}
          </span>
        </div>
      </td>
    </tr>
  );
}
