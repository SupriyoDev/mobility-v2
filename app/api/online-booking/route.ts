import { db } from "@/db";
import { OnlineBooking, onlineBookingTable } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
const allowedAdmins = [
  "kp_ec942ccb8ce64da2b14348e55c6bcef4",
  "kp_30e438237edd413782de64cd674060c8",
];
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id) {
      return NextResponse.json({
        success: false,
        error: "User is not authenticated",
      });
    }

    const {
      terms_accepted,
      booking_type,
      booking_booth,
      booking_date,
      booking_time,
      payment_method,
      booking_location,
      payment_status,
    } = body;

    const terms = terms_accepted === "true";

    const [res] = await db
      .insert(onlineBookingTable)
      .values({
        user_id: user.id,
        terms_accepted: terms,
        booking_booth,
        booking_time,
        booking_type,
        booking_date,
        payment_method,
        payment_status,
        booking_location,
        booking_status: "booked",
      })
      .returning({
        booking_id: onlineBookingTable.id,
      });

    return NextResponse.json({
      success: true,
      data: res,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id) {
      return NextResponse.json({
        success: false,
      });
    }

    let res: OnlineBooking[];

    if (allowedAdmins.includes(user?.id ?? "")) {
      res = await db.select().from(onlineBookingTable);
    } else {
      res = await db
        .select()
        .from(onlineBookingTable)
        .where(eq(onlineBookingTable.user_id, user?.id));
    }

    return NextResponse.json({
      success: true,
      data: res,
    });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
