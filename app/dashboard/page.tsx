"use client";

import BookingCard from "@/components/shared/Booking-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OnlineBooking, OnsiteBooking } from "@/db/schema";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Bike,
  Calendar,
  CalendarDays,
  Clock,
  CreditCard,
  Filter,
  Hash,
  Loader2,
  MapPin,
  Search,
} from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  booked: "bg-blue-100 text-blue-800 border-blue-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

export default function AllBookings() {
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const allowedAdmins = [
    "kp_ec942ccb8ce64da2b14348e55c6bcef4",
    "kp_30e438237edd413782de64cd674060c8",
  ];
  const { user } = useKindeBrowserClient();

  const isAdmin = user && allowedAdmins.includes(user.id);

  const {
    data: adminOnsiteBookings,
    error: adminError,
    isPending: adminPending,
  } = useQuery<OnsiteBooking[]>({
    queryKey: ["all_onsite_booking"],
    queryFn: async () => {
      const res = await axios.get("/api/onsite-booking");
      return res.data.data;
    },
    enabled: !!isAdmin,
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 3,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });

  const {
    data: userOnlineBookings,
    error: userError,
    isPending: userPending,
  } = useQuery<OnlineBooking[]>({
    queryKey: ["user_online_booking"],
    queryFn: async () => {
      const res = await axios.get("/api/online-booking");
      return res.data.data;
    },
    enabled: !!user && !isAdmin,
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 5,
    refetchOnReconnect: true,
  });

  const {
    data: allOnlineBookings,
    error: allError,
    isPending: allPending,
  } = useQuery<OnlineBooking[]>({
    queryKey: ["all_online_booking"],
    queryFn: async () => {
      const res = await axios.get("/api/online-booking");
      return res.data.data;
    },
    enabled: !!isAdmin,
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 3,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });

  const bookings = isAdmin ? adminOnsiteBookings : userOnlineBookings;
  const isPending = isAdmin ? adminPending : userPending;
  const error = isAdmin ? adminError : userError;

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
        {isAdmin &&
          (isPending ? (
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="overflow-x-auto shadow-xl rounded-2xl border border-gray-200 ">
                  <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
                    {/* Table Header */}
                    <thead className="bg-gradient-to-r from-bgsecondary to-bgtertiary text-white w-full">
                      <tr className=" px-4 w-full">
                        <th className="px-6 py-4 font-medium w-[15%] text-base">
                          Booking Ref
                        </th>
                        <th className="px-6 py-4 font-medium w-[15%] text-base">
                          Full Name
                        </th>
                        <th className="px-6 py-4 font-medium w-[20%] text-base">
                          Email
                        </th>
                        <th className="px-6 py-4 font-medium w-[15%] text-base">
                          Phone
                        </th>
                        <th className="px-6 py-4 font-medium w-[10%] text-base">
                          Status
                        </th>
                        <th className="px-6 py-4 font-medium w-[10%] text-base">
                          Terms Accepted
                        </th>
                        <th className="px-6 py-4 font-medium w-[15%] text-base">
                          Booked On
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 w-full">
                      {filteredBookings &&
                        filteredBookings.map((booking, index) => (
                          <BookingCard booking={booking} key={index} />
                        ))}
                      {/* 
                    {filteredBookings.map((booking) => (
                      <tr className="hover:bg-blue-50 transition-colors  px-4 ">
                        <td className="px-6 py-4 font-semibold text-blue-900 w-[15%]"></td>
                        <td className="px-6 py-4 w-[15%]"></td>
                        <td className="px-6 py-4 w-[15%]"></td>
                        <td className="px-6 py-4 w-[15%]"></td>
                        <td className="px-6 py-4 w-[15%]"></td>
                        <td className="px-6 py-4 col-span-1"></td>
                        <td className="px-6 py-4 col-span-2"></td>
                      </tr>
                    ))} */}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          ))}

        {/* Online Booking Table */}

        {isAdmin && (
          <div className="pt-12 py-6">
            <h4 className="text-3xl font-bold text-transparent bg-gradient-to-br from-bgsecondary to-bgtertiary bg-clip-text">
              Online Bookings
            </h4>
          </div>
        )}

        {isAdmin &&
          (allPending ? (
            <div className="flex flex-col items-center justify-center py-20 ">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading bookings...</p>
            </div>
          ) : allOnlineBookings?.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bike className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No online bookings found!
              </h3>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="overflow-x-auto shadow-xl rounded-2xl border border-gray-200 ">
                  <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
                    {/* Table Header */}
                    <thead className="bg-gradient-to-r from-bgsecondary to-bgtertiary text-white w-full">
                      <tr className=" px-4 w-full">
                        <th className="px-6 py-4 font-medium w-[15%] text-base">
                          Booking Ref
                        </th>
                        <th className="px-6 py-4 font-medium w-[15%] text-base">
                          Booking Date
                        </th>
                        <th className="px-6 py-4 font-medium w-[20%] text-base">
                          Booking Booth
                        </th>
                        <th className="px-6 py-4 font-medium w-[15%] text-base">
                          Payment Status
                        </th>
                        <th className="px-6 py-4 font-medium w-[10%] text-base">
                          Booking Status
                        </th>
                        <th className="px-6 py-4 font-medium w-[10%] text-base">
                          Terms Accepted
                        </th>
                        <th className="px-6 py-4 font-medium w-[15%] text-base">
                          Booking time
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 w-full">
                      {/* {allOnlineBookings &&
                      allOnlineBookings.map((booking, index) => (
                        <BookingCard booking={booking} key={index} />
                      ))} */}

                      {allOnlineBookings?.map((booking, i) => (
                        <tr
                          className="hover:bg-blue-50 transition-colors  px-4 "
                          key={i}
                        >
                          <td className="px-6 py-4 font-semibold text-blue-900 w-[15%]">
                            {booking.id.slice(0, 8)}
                          </td>
                          <td className="px-6 py-4 w-[15%]">
                            {new Date(booking.booking_date).toLocaleDateString(
                              "en-US",
                              {
                                timeZone: "Asia/Dubai",
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td className="px-6 py-4 w-[15%]">
                            {booking.booking_booth} (
                            {booking.booking_location.split("-").join(" ")})
                          </td>
                          <td className="px-6 py-4 w-[15%]">
                            {booking.payment_status}
                          </td>
                          <td className="px-6 py-4 w-[15%]">
                            {booking.booking_status}
                          </td>
                          <td className="px-6 py-4 col-span-1">
                            {booking.terms_accepted === true ? "Yes" : ""}
                          </td>
                          <td className="px-6 py-4 col-span-2">
                            {booking.booking_time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          ))}

        {!isAdmin && (
          <div>
            {userOnlineBookings &&
              userOnlineBookings?.map((booking, i) => (
                <Card
                  className="my-3 w-full max-w-md md:max-w-2xl mx-auto rounded-2xl shadow-md border border-gray-200"
                  key={i}
                >
                  <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-lg sm:text-xl font-semibold">
                      Booking Ref:{" "}
                      <span className="text-blue-600">
                        {booking.id.slice(0, 8).toUpperCase()}
                      </span>
                    </CardTitle>
                    <Badge
                      variant={
                        booking.payment_status === "pending"
                          ? "outline"
                          : "default"
                      }
                      className={
                        booking.payment_status === "pending"
                          ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                          : "bg-green-100 text-green-700 border-green-300"
                      }
                    >
                      Payment {booking.payment_status}
                    </Badge>
                  </CardHeader>

                  <CardContent className="grid gap-4 text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <span className="font-medium capitalize">
                        {booking.booking_type} booking
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-gray-500" />
                      <span>
                        {new Date(booking.booking_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                            timeZone: "Asia/Dubai", // ensure UAE time
                          }
                        )}{" "}
                        at{" "}
                        <span className="font-medium">
                          {booking.booking_time}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                      <span>
                        {booking.booking_booth}, {booking.booking_location}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
