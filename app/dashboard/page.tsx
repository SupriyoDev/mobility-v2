"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bike, Filter, Search, Loader2, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingCard from "@/components/shared/Booking-card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { OnsiteBooking } from "@/db/schema";

export default function AllBookings() {
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const {
    data: bookings,
    error,
    isPending,
  } = useQuery<OnsiteBooking[]>({
    queryKey: ["all_onsite_booking"],
    queryFn: async () => {
      const res = await axios.get("/api/onsite-booking");
      return res.data.data;
    },
    gcTime: 1000 * 60 * 20,
    staleTime: 1000 * 60 * 20,
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });

  const filterAndSortBookings = useCallback(() => {
    const result = bookings;

    // // Filter by status
    // if (statusFilter !== "all") {
    //   result =
    //     result &&
    //     result.filter((booking) => booking.booking_status === statusFilter);
    // }

    // // Filter by search term
    // if (searchTerm) {
    //   result =
    //     result &&
    //     result.filter(
    //       (booking) =>
    //         booking.customer_name
    //           .toLowerCase()
    //           .includes(searchTerm.toLowerCase()) ||
    //         booking.customer_email
    //           .toLowerCase()
    //           .includes(searchTerm.toLowerCase()) ||
    //         booking.customer_phone.includes(searchTerm) ||
    //         booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    // }

    // Sort
    if (sortBy === "recent") {
      result &&
        result.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
    } else if (sortBy === "oldest") {
      result &&
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }

    setFilteredBookings(result as any[]);
  }, [bookings, searchTerm, statusFilter, sortBy]);

  useEffect(() => {
    filterAndSortBookings();
  }, [filterAndSortBookings]);

  // const getStatusCount = (status: string) => {
  //   if (status === "all") return bookings.length;
  //   return bookings.filter((b) => b.booking_status === status).length;
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bgsecondary to-bgtertiary flex items-center justify-center shadow-xl">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-bgtertiary to-bgsecondary bg-clip-text text-transparent">
                All Bookings
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and view all your scooter bookings
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by name, email, phone, or booking ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 h-12 border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            {/* <div className="lg:w-64">
              <Tabs
                value={statusFilter}
                onValueChange={setStatusFilter}
                className="w-full"
              >
                <TabsList className="grid grid-cols-5 h-12 bg-gray-100">
                  <TabsTrigger value="all" className="text-xs">
                    All
                    <span className="ml-1 text-xs bg-white px-1.5 rounded">
                      {getStatusCount("all")}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="booked" className="text-xs">
                    Booked
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="text-xs">
                    Pending
                  </TabsTrigger>
                  <TabsTrigger value="confirmed" className="text-xs">
                    Confirmed
                  </TabsTrigger>
                  <TabsTrigger value="cancelled" className="text-xs">
                    Cancelled
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div> */}

            {/* Sort */}
            <div className="lg:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 border-gray-300">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Bookings List */}
        {isPending ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Loading bookings...</p>
          </div>
        ) : filteredBookings && filteredBookings.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bike className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your filters or search term"
                : "Start by creating your first booking"}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {filteredBookings &&
                filteredBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <BookingCard booking={booking} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        )}

        {/* Summary Stats */}
        {!isLoading && filteredBookings.length > 0 && (
          <motion.div
            className="mt-8 text-center text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Showing {filteredBookings.length} of {bookings.length} booking
            {bookings.length !== 1 ? "s" : ""} */}
          </motion.div>
        )}
      </div>
    </div>
  );
}
