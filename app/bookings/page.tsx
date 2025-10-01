// "use client";
// import React, { useState, useEffect } from "react";
// // import { User } from '@/entities/User';
// // import { Booking } from '@/entities/Booking';
// // import { Location } from '@/entities/Location';
// // import { Link } from 'react-router-dom';
// // import { createPageUrl } from '@/utils';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Loader2,
//   Ticket,
//   MapPin,
//   Calendar,
//   Clock,
//   AlertTriangle,
// } from "lucide-react";
// import { format } from "date-fns";
// import Link from "next/link";

// const Bookings = () => {
//   // onst[(user, setUser)] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [locations, setLocations] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   // useEffect(() => {
//   //   const loadUserData = async () => {
//   //     try {
//   //       const currentUser = await User.me();
//   //       setUser(currentUser);
//   //       const userBookings = await Booking.filter(
//   //         { user_email: currentUser.email },
//   //         "-booking_date"
//   //       );
//   //       setBookings(userBookings);

//   //       const locationIds = [
//   //         ...new Set(userBookings.map((b) => b.location_id)),
//   //       ];
//   //       const locationPromises = locationIds.map((id) => Location.get(id));
//   //       const locationsData = await Promise.all(locationPromises);

//   //       const locationsMap = locationsData.reduce((acc, loc) => {
//   //         acc[loc.id] = loc;
//   //         return acc;
//   //       }, {});
//   //       setLocations(locationsMap);
//   //     } catch (error) {
//   //       console.error("Error loading user bookings:", error);
//   //       setUser(null); // Set user to null to show login prompt
//   //     }
//   //     setIsLoading(false);
//   //   };
//   //   loadUserData();
//   // }, []);

//   // const getStatusBadge = (status) => {
//   //   switch (status) {
//   //     case "confirmed":
//   //       return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
//   //     case "completed":
//   //       return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
//   //     case "cancelled":
//   //       return <Badge variant="destructive">Cancelled</Badge>;
//   //     default:
//   //       return <Badge variant="secondary">{status}</Badge>;
//   //   }
//   // };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
//         <p className="ml-4 text-gray-600">Loading your bookings...</p>
//       </div>
//     );
//   }

//   // if (!user) {
//   //   return (
//   //     <div className="text-center py-20">
//   //       <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
//   //       <h2 className="text-2xl font-bold">Please Log In</h2>
//   //       <p className="text-gray-600 mb-6">
//   //         You need to be logged in to view your bookings.
//   //       </p>
//   //       <Button onClick={() => User.login()}>Login</Button>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
//       <div className="max-w-4xl mx-auto px-4">
//         <Card>
//           <CardHeader className="bg-gray-50 border-b">
//             <CardTitle className="text-3xl font-bold flex items-center">
//               <Ticket className="w-8 h-8 mr-3 text-blue-500" />
//               My Bookings
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-0">
//             {bookings.length === 0 ? (
//               <div className="text-center py-20 px-6">
//                 <h3 className="text-xl font-semibold mb-2">
//                   No adventures booked yet!
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   It looks like you haven't booked any rides with us. Let's
//                   change that!
//                 </p>
//                 <Link href={"/locations"}>
//                   <Button>Find a Location & Book Now</Button>
//                 </Link>
//               </div>
//             ) : (
//               <ul className="divide-y divide-gray-200">
//                 {bookings.map((booking) => (
//                   <li
//                     // key={booking.id}
//                     className="p-6 hover:bg-blue-50 transition-colors"
//                   >
//                     <div className="grid md:grid-cols-3 gap-4">
//                       <div className="md:col-span-2 space-y-3">
//                         <div className="flex items-center">
//                           <MapPin className="w-5 h-5 mr-3 text-gray-500" />
//                           <h4 className="text-lg font-bold text-gray-900">
//                             {locations[booking.location_id]?.name ||
//                               "Loading..."}
//                           </h4>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <Calendar className="w-4 h-4 mr-2" />
//                           <span>
//                             {format(
//                               new Date(booking.booking_date),
//                               "EEEE, MMMM d, yyyy"
//                             )}
//                           </span>
//                         </div>
//                         <div className="flex items-center text-sm text-gray-600">
//                           <Clock className="w-4 h-4 mr-2" />
//                           <span>
//                             {booking.start_time} for {booking.duration_hours}{" "}
//                             hour(s)
//                           </span>
//                         </div>
//                       </div>
//                       <div className="flex flex-col items-start md:items-end justify-between">
//                         {/* {getStatusBadge(booking.status)} */}
//                         <p className="text-xs text-gray-500 mt-2">
//                           ID: {booking.id.substring(0, 8)}...
//                         </p>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Bookings;

import React from "react";

const Bookingpage = () => {
  return <div>Bookingpage</div>;
};

export default Bookingpage;
