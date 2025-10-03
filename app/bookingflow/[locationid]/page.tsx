"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserOnlineBookingStore } from "@/store/store";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  AlertTriangle,
  ArrowRight,
  CalendarIcon,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

const BookingFlowbyLocation = ({
  params,
}: {
  params: Promise<{ locationid: string }>;
}) => {
  const { locationid } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    terms_accepted,
    booking_type,
    booking_date,
    booking_time,
    booking_booth,
    payment_method,
    payment_status,

    setTermsAccepted,
    setBookingType,
    setBookingDate,
    setBookingTime,
    setBookingBooth,

    booking_id,
    setBookingId,

    setPaymentMethod,
    setPaymentStatus,
  } = useUserOnlineBookingStore(
    useShallow((state) => ({
      terms_accepted: state.terms_accepted,
      booking_type: state.booking_type,
      booking_date: state.booking_date,
      booking_time: state.booking_time,
      booking_booth: state.booking_booth,
      payment_method: state.payment_method,
      payment_status: state.payment_status,
      booking_id: state.booking_id,

      setTermsAccepted: state.setTermsAccepted,
      setBookingType: state.setBookingType,
      setBookingDate: state.setBookingDate,
      setBookingTime: state.setBookingTime,
      setBookingBooth: state.setBookingBooth,

      setPaymentMethod: state.setPaymentMethod,
      setPaymentStatus: state.setPaymentStatus,
      setBookingId: state.setBookingId,
    }))
  );

  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
  ];
  const depositAmount = 500;

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[60vh]">
  //       <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
  //     </div>
  //   );
  // }

  const handleBookingSubmit = async () => {
    setIsLoading(true);
    try {
      const data = {
        terms_accepted,
        booking_type: "online",
        booking_date: booking_date.toISOString(),
        booking_time,
        payment_method,
        booking_booth,
        booking_location: locationid,
        payment_status: "pending",
      };

      const res = await axios.post("/api/online-booking", data);

      if (res.data.data.success === false) {
        toast("Booking failed");
      }

      await queryClient.invalidateQueries({
        queryKey: ["user_online_booking"],
      });
      setBookingId(res.data.data.booking_id);

      setOpen(true);
    } catch (error: any) {
      console.log(error);
    } finally {
      setBookingTime("");
      setBookingBooth("");
      setPaymentMethod("");
      setTermsAccepted("");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <Card className="max-w-3xl mx-auto shadow-2xl border-blue-100">
        <CardHeader className="bg-gradient-to-r from-bgtertiary to-bgsecondary text-white p-6  rounded-t-xl">
          <CardTitle className="text-3xl font-bold">
            Book Your Scooter
          </CardTitle>
          {locationid && (
            <div className="flex items-center space-x-2 mt-2 opacity-90">
              <MapPin className="w-5 h-5" />
              <span>{locationid}</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left Column: Date & Time */}
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="booking-date"
                  className="text-lg font-semibold flex items-center mb-2"
                >
                  <CalendarIcon className="w-5 h-5 mr-2 text-bgsecondary" />
                  Select Date
                </Label>
                <Calendar
                  required
                  mode="single"
                  selected={booking_date}
                  onSelect={(val) => setBookingDate(val)}
                  className="rounded-md border bg-white"
                  disabled={{
                    before: new Date(),
                    after: new Date(
                      new Date().setDate(new Date().getDate() + 1)
                    ),
                  }}
                />
                <p className="text-xs text-gray-500 mt-2">
                  You can book up to 24 hours in advance.
                </p>
              </div>

              <div>
                <Label
                  htmlFor="time-slot"
                  className="text-lg font-semibold flex items-center mb-2"
                >
                  <Clock className="w-5 h-5 mr-2 text-bgsecondary" />
                  Select Time
                </Label>
                <Select
                  onValueChange={(val) => setBookingTime(val)}
                  // value={timeSlot}
                >
                  <SelectTrigger id="time-slot">
                    <SelectValue placeholder="Choose a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-2">
                  Please arrive 30 minutes before your scheduled time.{" "}
                </p>
              </div>
            </div>

            {/* Right Column: Details & Summary */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="child-age" className="text-lg font-semibold">
                  Your Age
                </Label>
                <p className="text-sm text-red-400 font-normal">
                  **You must be at least 20 years old
                </p>
              </div>
              <div>
                <Label htmlFor="booth" className="text-lg font-semibold">
                  {" "}
                  Select Booth
                </Label>
                <Select onValueChange={(val) => setBookingBooth(val)}>
                  <SelectTrigger id="booth">
                    <SelectValue placeholder="select booth" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north-parking">
                      North parking (Basement 2 - Entrance 1){" "}
                    </SelectItem>
                    <SelectItem value="central-parking">
                      Central Parking (Basement 1 - Entrance 8){" "}
                    </SelectItem>
                    <SelectItem value="ikea-parking">
                      IKEA parking (Zone 4){" "}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="payment_method"
                  className="text-lg font-semibold"
                >
                  {" "}
                  Select Payment Method
                </Label>
                <Select onValueChange={(val) => setPaymentMethod(val)}>
                  <SelectTrigger id="payment_method">
                    <SelectValue placeholder="select Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="offline">Onsite Payment</SelectItem>
                    {/* <SelectItem value="online">Online</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-bgsecondary/10 p-6 rounded-xl border border-bgsecondary/40">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Booking Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold">
                      {locationid.split("-").join(" ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deposit:</span>
                    <span className="font-semibold">{depositAmount} AED</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    **AED 500 Deposit will be blocked temporary on site and will
                    be release upon return of scooter
                  </p>
                  {/* <hr className="my-2 border-blue-200" />
                  <div className="flex justify-between text-xl font-bold text-bgtertiary">
                    <span>Total Payable:</span>
                    <span>{depositAmount} AED</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 mt-4">
            <Checkbox
              id="terms"
              onCheckedChange={(val) => setTermsAccepted(String(val))}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link
                  href={"/terms/#terms"}
                  target="_blank"
                  className="text-red-400/80 hover:underline"
                >
                  terms and conditions
                </Link>{" "}
                <Link
                  href={"/terms/#waiver"}
                  target="_blank"
                  className="text-red-400/80 hover:underline"
                >
                  & waiver
                </Link>
                .
              </label>
              <p className="text-sm text-muted-foreground">
                You must accept the terms to proceed.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 p-6 rounded-b-xl">
          <Button
            // onClick={handleBookingSubmit}
            onClick={() => handleBookingSubmit()}
            disabled={
              isLoading ||
              !terms_accepted ||
              !booking_date ||
              !booking_time ||
              !booking_booth ||
              !payment_method
            }
            className="w-full text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
          >
            {/* {payment_method === "offline" ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                Proceed to Payment <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )} */}
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              </>
            ) : (
              <>
                Reserve your scooter <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <DialogTitle className="text-xl font-bold text-green-600">
                  Booking Confirmed
                </DialogTitle>
              </div>
              <DialogDescription>
                Your booking has been successfully created. Please keep this
                reference for future use.
              </DialogDescription>
            </DialogHeader>

            {booking_id && ( // ✅ only render if bookingId exists
              <div className="grid gap-4 text-sm">
                <div>
                  <p className="font-semibold">Booking Reference</p>
                  <p className="text-blue-600 font-bold text-xl">
                    # {booking_id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
              <Button onClick={() => router.replace("/dashboard")}>
                My bookings
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BookingFlowbyLocation;
