"use client";
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { createPageUrl } from "@/utils";
// import { User } from "@/entities/User";
// import { Booking } from "@/entities/Booking";
// import { Transaction } from "@/entities/Transaction";
// import { Location } from "@/entities/Location";
import {
  Wallet,
  Calendar,
  MapPin,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Car,
  Clock,
  CreditCard,
  User as UserIcon,
  Settings,
  History,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [locations, setLocations] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedRides: 0,
    totalSpent: 0,
    averageRating: 4.9,
  });

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load user's bookings
      const userBookings = await Booking.filter(
        { user_email: currentUser.email },
        "-created_date",
        5
      );
      setBookings(userBookings);

      // Load user's transactions
      const userTransactions = await Transaction.filter(
        { user_email: currentUser.email },
        "-created_date",
        10
      );
      setTransactions(userTransactions);

      // Load locations for booking details
      const locationIds = [...new Set(userBookings.map((b) => b.location_id))];
      const locationPromises = locationIds.map((id) => Location.get(id));
      const locationsData = await Promise.all(locationPromises);

      const locationsMap = locationsData.reduce((acc, loc) => {
        acc[loc.id] = loc;
        return acc;
      }, {});
      setLocations(locationsMap);

      // Calculate stats
      const completedBookings = userBookings.filter(
        (b) => b.status === "completed"
      );
      const totalSpent = userTransactions
        .filter((t) => t.type === "booking" && t.status === "completed")
        .reduce((sum, t) => sum + t.amount, 0);

      setStats({
        totalBookings: userBookings.length,
        completedRides: completedBookings.length,
        totalSpent: totalSpent,
        averageRating: 4.9,
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setUser(null);
    }
    setIsLoading(false);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { class: "bg-blue-100 text-blue-800", text: "Confirmed" },
      completed: { class: "bg-green-100 text-green-800", text: "Completed" },
      pending: { class: "bg-yellow-100 text-yellow-800", text: "Pending" },
      cancelled: { class: "bg-red-100 text-red-800", text: "Cancelled" },
    };
    const config = statusConfig[status] || statusConfig["pending"];
    return <Badge className={config.class}>{config.text}</Badge>;
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "deposit":
        return <ArrowDownRight className="w-4 h-4 text-green-500" />;
      case "booking":
        return <Car className="w-4 h-4 text-blue-500" />;
      case "refund":
        return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      default:
        return <CreditCard className="w-4 h-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Please Log In
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your dashboard.
          </p>
          <LoginLink>
            <Button>Login to Continue</Button>
          </LoginLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.full_name?.split(" ")[0]}! 👋
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your Kiddy Cars account today.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Link href={"/locations"}>
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <Car className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </Link>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Funds
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Wallet Balance
                  </p>
                  <p className="text-3xl font-bold">500 AED</p>
                </div>
                <Wallet className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Total Bookings
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalBookings}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Completed Rides
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.completedRides}
                  </p>
                </div>
                <Car className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Total Spent
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalSpent} AED
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  Recent Bookings
                </CardTitle>
                <Link href={"/bookings"}>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Car className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No bookings yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start your adventure by booking your first ride!
                    </p>
                    <Link href={"/locations"}>
                      <Button>Book Your First Ride</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            {/* <h4 className="font-semibold text-gray-900">
                              {locations[booking.location_id]?.name ||
                                "Loading..."}
                            </h4>
                            <div className="flex items-center text-sm text-gray-600 space-x-4">
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {format(
                                  new Date(booking.booking_date),
                                  "MMM d, yyyy"
                                )}{" "}
                                at {booking.start_time}
                              </span>
                            </div> */}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {/* {getStatusBadge(booking.status)}
                          <span className="text-sm font-semibold text-gray-900">
                            {booking.total_amount} AED
                          </span> */}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-blue-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={"/locations"}>
                  <Button className="w-full justify-start" variant="outline">
                    <Car className="w-4 h-4 mr-2" />
                    Book a Ride
                  </Button>
                </Link>
                <Button className="w-full justify-start" variant="outline">
                  <Wallet className="w-4 h-4 mr-2" />
                  Add Funds to Wallet
                </Button>
                <Link href={"/bookings"}>
                  <Button className="w-full justify-start" variant="outline">
                    <History className="w-4 h-4 mr-2" />
                    View All Bookings
                  </Button>
                </Link>
                <Button className="w-full justify-start" variant="outline">
                  <UserIcon className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="w-5 h-5 mr-2 text-blue-500" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="text-center py-4">
                    <CreditCard className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No transactions yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          {getTransactionIcon(transaction.type)}
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {transaction.description}
                            </p>
                            <p className="text-xs text-gray-600">
                              {format(
                                new Date(transaction.created_date),
                                "MMM d, HH:mm"
                              )}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-sm font-semibold ${
                            transaction.type === "deposit" ||
                            transaction.type === "refund"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "deposit" ||
                          transaction.type === "refund"
                            ? "+"
                            : "-"}
                          {transaction.amount} AED
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// import React from "react";

// const DashboardPage = () => {
//   return <div>DashboardPage</div>;
// };

// export default DashboardPage;
