// import React, { useState, useMemo } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { format } from "date-fns";
// import {
//   Calendar as CalendarIcon,
//   MapPin,
//   Clock,
//   User,
//   Mail,
//   Phone,
//   MessageSquare,
//   Bike,
//   Loader2,
//   CheckCircle2,
//   Info,
// } from "lucide-react";
// import { motion } from "framer-motion";

// export default function BookingForm({ onSubmit, isSubmitting }) {
//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     phone: "",
//     pickup_location: "",
//     booking_date: null,
//     booking_time: "",
//     duration_hours: 4,
//     scooter_type: "standard",
//     special_requests: "",
//   });

//   const handleChange = (field: any, value: any) => {
//     setFormData((prev) => {
//       const newData = { ...prev, [field]: value };
//       // Reset booking time when date changes to avoid invalid time selection
//       if (field === "booking_date") {
//         newData.booking_time = "";
//       }
//       return newData;
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   // Generate time slots based on selected date
//   const timeSlots = useMemo(() => {
//     if (!formData.booking_date) {
//       return [];
//     }

//     const dayOfWeek = formData.booking_date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
//     const isMondayToThursday = dayOfWeek >= 1 && dayOfWeek <= 4;

//     // Monday to Thursday: 10am - 9pm
//     // Other days (Fri, Sat, Sun): 10am - 11pm
//     const endHour = isMondayToThursday ? 21 : 23; // 21 = 9pm, 23 = 11pm

//     const slots = [];
//     for (let hour = 10; hour <= endHour; hour++) {
//       const period = hour >= 12 ? "PM" : "AM";
//       const displayHour = hour > 12 ? hour - 12 : hour;
//       const formattedTime = `${displayHour
//         .toString()
//         .padStart(2, "0")}:00 ${period}`;
//       slots.push(formattedTime);
//     }

//     return slots;
//   }, [formData.booking_date]);

//   const getScheduleInfo = () => {
//     if (!formData.booking_date) return null;

//     const dayOfWeek = formData.booking_date.getDay();
//     const isMondayToThursday = dayOfWeek >= 1 && dayOfWeek <= 4;

//     return isMondayToThursday
//       ? "Monday - Thursday hours: 10:00 AM - 9:00 PM"
//       : "Weekend & Friday hours: 10:00 AM - 11:00 PM";
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm">
//         <CardHeader className="border-b border-gray-100 pb-6">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
//               <Bike className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
//                 Book Your Scooter
//               </CardTitle>
//               <p className="text-gray-600 mt-1">
//                 Fill in your details to complete the booking
//               </p>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Information */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                 <User className="w-5 h-5 text-blue-600" />
//                 Personal Information
//               </h3>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="full_name"
//                     className="text-gray-700 font-medium"
//                   >
//                     Full Name *
//                   </Label>
//                   <Input
//                     id="full_name"
//                     required
//                     placeholder="John Doe"
//                     value={formData.full_name}
//                     onChange={(e) => handleChange("full_name", e.target.value)}
//                     className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email" className="text-gray-700 font-medium">
//                     Email *
//                   </Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <Input
//                       id="email"
//                       type="email"
//                       required
//                       placeholder="john@example.com"
//                       value={formData.email}
//                       onChange={(e) => handleChange("email", e.target.value)}
//                       className="h-12 pl-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="phone" className="text-gray-700 font-medium">
//                     Phone Number *
//                   </Label>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <Input
//                       id="phone"
//                       type="tel"
//                       required
//                       placeholder="+1 (555) 123-4567"
//                       value={formData.phone}
//                       onChange={(e) => handleChange("phone", e.target.value)}
//                       className="h-12 pl-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="pickup_location"
//                     className="text-gray-700 font-medium"
//                   >
//                     Pickup Location *
//                   </Label>
//                   <div className="relative">
//                     <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <Input
//                       id="pickup_location"
//                       required
//                       placeholder="Downtown Station"
//                       value={formData.pickup_location}
//                       onChange={(e) =>
//                         handleChange("pickup_location", e.target.value)
//                       }
//                       className="h-12 pl-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Booking Details */}
//             <div className="space-y-4 pt-4 border-t border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                 <CalendarIcon className="w-5 h-5 text-blue-600" />
//                 Booking Details
//               </h3>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">
//                     Booking Date *
//                   </Label>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant="outline"
//                         className={`w-full h-12 justify-start text-left font-normal border-gray-300 hover:border-blue-500 ${
//                           !formData.booking_date && "text-gray-500"
//                         }`}
//                       >
//                         <CalendarIcon className="mr-2 h-5 w-5 text-gray-400" />
//                         {formData.booking_date
//                           ? format(formData.booking_date, "PPP")
//                           : "Pick a date"}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0">
//                       <Calendar
//                         mode="single"
//                         selected={formData.booking_date}
//                         onSelect={(date) => handleChange("booking_date", date)}
//                         disabled={(date) => date < new Date()}
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>
//                   {formData.booking_date && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -5 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded-lg"
//                     >
//                       <Info className="w-4 h-4" />
//                       <span>{getScheduleInfo()}</span>
//                     </motion.div>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">
//                     Pickup Time *
//                   </Label>
//                   <Select
//                     value={formData.booking_time}
//                     onValueChange={(value) =>
//                       handleChange("booking_time", value)
//                     }
//                     required
//                     disabled={!formData.booking_date}
//                   >
//                     <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500">
//                       <Clock className="w-5 h-5 text-gray-400 mr-2" />
//                       <SelectValue
//                         placeholder={
//                           formData.booking_date
//                             ? "Select time slot"
//                             : "Select date first"
//                         }
//                       />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {timeSlots.length > 0 ? (
//                         timeSlots.map((time) => (
//                           <SelectItem key={time} value={time}>
//                             {time}
//                           </SelectItem>
//                         ))
//                       ) : (
//                         <SelectItem value="none" disabled>
//                           Please select a date first
//                         </SelectItem>
//                       )}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">
//                     Scooter Type *
//                   </Label>
//                   <Select
//                     value={formData.scooter_type}
//                     onValueChange={(value) =>
//                       handleChange("scooter_type", value)
//                     }
//                     required
//                   >
//                     <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="standard">
//                         Standard Scooter - $25/hr
//                       </SelectItem>
//                       <SelectItem value="premium">
//                         Premium Scooter - $35/hr
//                       </SelectItem>
//                       <SelectItem value="electric">
//                         Electric Scooter - $40/hr
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="text-gray-700 font-medium">
//                     Duration (hours) *
//                   </Label>
//                   <Select
//                     value={String(formData.duration_hours)}
//                     onValueChange={(value) =>
//                       handleChange("duration_hours", Number(value))
//                     }
//                     required
//                   >
//                     <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="2">2 hours</SelectItem>
//                       <SelectItem value="4">4 hours</SelectItem>
//                       <SelectItem value="6">6 hours</SelectItem>
//                       <SelectItem value="8">8 hours (Full day)</SelectItem>
//                       <SelectItem value="24">24 hours</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>

//             {/* Special Requests */}
//             <div className="space-y-2 pt-4 border-t border-gray-200">
//               <Label
//                 htmlFor="special_requests"
//                 className="text-gray-700 font-medium flex items-center gap-2"
//               >
//                 <MessageSquare className="w-5 h-5 text-blue-600" />
//                 Special Requests (Optional)
//               </Label>
//               <Textarea
//                 id="special_requests"
//                 placeholder="Any special requests or additional information..."
//                 value={formData.special_requests}
//                 onChange={(e) =>
//                   handleChange("special_requests", e.target.value)
//                 }
//                 className="min-h-24 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//               />
//             </div>

//             {/* Submit Button */}
//             <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
//               <Button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                     Processing Booking...
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle2 className="w-5 h-5 mr-2" />
//                     Confirm Booking
//                   </>
//                 )}
//               </Button>
//             </motion.div>
//           </form>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }

import React from "react";

const BookingForm = () => {
  return <div>BookingForm</div>;
};

export default BookingForm;
