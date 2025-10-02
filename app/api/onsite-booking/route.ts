import { db } from "@/db";
import { onsiteBookingTable } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (user?.id !== "kp_ec942ccb8ce64da2b14348e55c6bcef4") {
      return NextResponse.json(
        { success: false, error: "User is not authenticated" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const {
      terms_accepted,
      booking_type,
      customer_email,
      customer_name,
      customer_phone,
    } = body;

    const [res] = await db
      .insert(onsiteBookingTable)
      .values({
        adminUserId: user.id,
        customer_email,
        customer_name,
        customer_phone,
        terms_accepted,
        booking_type,
        booking_status: "booked",
      })
      .returning({
        booking_id: onsiteBookingTable.id,
      });

    return NextResponse.json({
      success: true,
      booking_id: res.booking_id,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();

    const user = await getUser();

    if (!user?.id) {
      return NextResponse.json({ error: "User is not authenticated" });
    }

    const res = await db
      .select()
      .from(onsiteBookingTable)
      .where(eq(onsiteBookingTable.adminUserId, user.id));

    return NextResponse.json({
      success: true,
      data: res,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
